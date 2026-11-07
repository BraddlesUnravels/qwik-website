import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const controller = "src/lib/media-autoplay.ts";
const player = "src/components/ui/media-player.tsx";
const targets = [controller, player];
const original = Object.fromEntries(
  targets.map((file) => [file, readFileSync(resolve(root, file), "utf8")]),
);
const fingerprint = () =>
  Object.fromEntries(
    targets.map((file) => [
      file,
      createHash("sha256")
        .update(readFileSync(resolve(root, file)))
        .digest("hex"),
    ]),
  );
const before = fingerprint();
const output = resolve(
  root,
  process.env.MEDIA_MUTATION_REPORT || "test-results/media-mutations.json",
);
const isolated = mkdtempSync(join(tmpdir(), "media-regression-mutants-"));
const tests = [
  "test/lib/media-autoplay.test.ts",
  "test/lib/media-playback-rate.test.ts",
  "test/components/ui/media-player.test.tsx",
];
const mutations = [
  [
    "wrong current speed",
    controller,
    "if (video.playbackRate !== 2) video.playbackRate = 2;",
    "if (video.playbackRate !== 2) video.playbackRate = 1;",
  ],
  [
    "wrong default speed",
    controller,
    "if (video.defaultPlaybackRate !== 2) video.defaultPlaybackRate = 2;",
    "if (video.defaultPlaybackRate !== 2) video.defaultPlaybackRate = 1;",
  ],
  [
    "missing connection speed",
    controller,
    "  enforceMediaPlaybackRate(video);\n\n  const enforceRate",
    "  // removed by mutation\n\n  const enforceRate",
  ],
  [
    "wrong visibility threshold",
    controller,
    "entry.intersectionRatio >= 0.25",
    "entry.intersectionRatio >= 0.5",
  ],
  [
    "viewer pause overridden",
    controller,
    "    !userControlled &&",
    "    true &&",
  ],
  ["hidden page allowed", controller, "    !document.hidden &&", "    true &&"],
  [
    "reduced motion ignored",
    controller,
    "    !motion.matches &&",
    "    true &&",
  ],
  [
    "save data ignored",
    controller,
    "    !connection?.saveData &&",
    "    true &&",
  ],
  [
    "internal pause treated as viewer pause",
    controller,
    "      internalPauses++;",
    "      // removed by mutation",
  ],
  [
    "rejected autoplay retries forever",
    controller,
    "        userControlled = true;",
    "        userControlled = false;",
  ],
  [
    "missing autoplay mute",
    controller,
    "    video.muted = true;\n    enforceRate();",
    "    enforceRate();",
  ],
  [
    "missing observer cleanup",
    controller,
    "    observer.disconnect();",
    "    // removed by mutation",
  ],
  // ["missing play event enforcement", player, "    onPlay$={enforceRate$}", ""],
  // [
  //   "missing ratechange enforcement",
  //   player,
  //   "    onRateChange$={enforceRate$}",
  //   "",
  // ],
];
// mutations.push([
//   "asynchronous handler instead of sync$",
//   player,
//   "const enforceRate$ = sync$(",
//   "const enforceRate$ = $(",
// ]);
const results = [];

function run(label) {
  const reportFile = resolve(isolated, "vitest-result.json");
  rmSync(reportFile, { force: true });
  const child = spawnSync(
    process.execPath,
    [
      resolve(root, "node_modules/vitest/vitest.mjs"),
      "run",
      ...tests,
      "--reporter=json",
      "--outputFile=" + reportFile,
    ],
    {
      cwd: isolated,
      encoding: "utf8",
      timeout: 30000,
      env: { ...process.env, NO_COLOR: "1" },
    },
  );
  assert.ok(
    !child.error,
    label + ": test process failed or timed out: " + child.error,
  );
  assert.ok(
    existsSync(reportFile),
    label + ": no Vitest result; this is a harness error, not a killed mutant",
  );
  const report = JSON.parse(readFileSync(reportFile, "utf8"));
  assert.ok(report.numTotalTests > 0, label + ": no tests executed");
  assert.equal(
    report.numRuntimeErrorTestSuites || 0,
    0,
    label + ": module/setup error is not a valid mutation result",
  );
  return { child, report };
}

try {
  // Mutants live in a disposable copy. The application being reviewed, served,
  // or built is never edited while proving that the suite catches regressions.
  cpSync(resolve(root, "src"), resolve(isolated, "src"), {
    recursive: true,
    filter: (path) => path !== resolve(root, "src/media"),
  });
  symlinkSync(
    resolve(root, "src/media"),
    resolve(isolated, "src/media"),
    "dir",
  );
  cpSync(resolve(root, "test"), resolve(isolated, "test"), { recursive: true });
  for (const file of ["package.json", "tsconfig.json", "vite.config.ts"])
    cpSync(resolve(root, file), resolve(isolated, file));
  symlinkSync(
    resolve(root, "node_modules"),
    resolve(isolated, "node_modules"),
    "dir",
  );
  const baseline = run("baseline");
  assert.equal(
    baseline.child.status,
    0,
    "The unmodified source must pass before mutation testing",
  );
  console.log(
    "Baseline: " + baseline.report.numPassedTests + " focused tests passed",
  );
  for (const [name, file, find, replacement] of mutations) {
    for (const target of targets)
      writeFileSync(resolve(isolated, target), original[target]);
    const content = original[file];
    assert.equal(
      content.split(find).length - 1,
      1,
      name + ": expected exactly one mutation site",
    );
    writeFileSync(resolve(isolated, file), content.replace(find, replacement));
    const { child, report } = run(name);
    const failed = report.testResults
      .flatMap((suite) => suite.assertionResults || [])
      .filter((test) => test.status === "failed")
      .map((test) => test.fullName);
    const killed = child.status !== 0 && report.numFailedTests > 0;
    results.push({
      name,
      status: killed ? "killed" : "survived",
      failedTests: failed,
    });
    console.log((killed ? "KILLED " : "SURVIVED ") + name);
  }
  assert.ok(
    results.every((result) => result.status === "killed"),
    "At least one deliberate regression survived",
  );
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  assert.deepEqual(
    fingerprint(),
    before,
    "Mutation testing must leave the real runtime files unchanged",
  );
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(
    output,
    JSON.stringify({ source: before, isolated: true, results }, null, 2),
  );
  rmSync(isolated, { recursive: true, force: true });
}
