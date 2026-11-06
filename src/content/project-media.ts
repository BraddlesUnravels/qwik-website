import type { ProjectSlug, ProjectMedia } from "./types";
import reimbursementDesktop from "~/media/autodash/clips/autodash-reimbursement-desktop.mp4?url&no-inline";
import reimbursementDesktopPoster from "~/media/autodash/clips/autodash-reimbursement-desktop.jpg?url&no-inline";
import reimbursementMobile from "~/media/autodash/clips/autodash-reimbursement-mobile.mp4?url&no-inline";
import reimbursementMobilePoster from "~/media/autodash/clips/autodash-reimbursement-mobile.jpg?url&no-inline";
import leaseDesktop from "~/media/autodash/clips/autodash-lease-balance-comparision-desktop.mp4?url&no-inline";
import leaseDesktopPoster from "~/media/autodash/clips/autodash-lease-balance-comparision-desktop.jpg?url&no-inline";
import leaseMobile from "~/media/autodash/clips/autodash-lease-balance-comparision-mobile.mp4?url&no-inline";
import leaseMobilePoster from "~/media/autodash/clips/autodash-lease-balance-comparison-mobile.jpg?url&no-inline";
import signInMfaDesktop from "~/media/mfa/autodash-sign-in-desktop.mp4?url&no-inline";
import signInMfaDesktopPoster from "~/media/mfa/autodash-sign-in-desktop.jpg?url&no-inline";
import signInMfaMobile from "~/media/mfa/autodash-sign-in-mobile.mp4?url&no-inline";
import signInMfaMobilePoster from "~/media/mfa/autodash-sign-in-mobile.jpg?url&no-inline";
import stepupMfaDesktop from "~/media/mfa/step-up-delete-phone-desktop.mp4?url&no-inline";
import stepupMfaDesktopPoster from "~/media/mfa/step-up-delete-phone-desktop.jpg?url&no-inline";
import stepupMfaMobile from "~/media/mfa/step-up-delete-phone-mobile.mp4?url&no-inline";
import stepupMfaMobilePoster from "~/media/mfa/step-up-delete-phone-mobile.jpg?url&no-inline";
import studentCreateWithAdminCheck from "~/media/access-control-demo/clips/aca-student-create-admin-checks.mp4?url&no-inline";
import studentCreateWithAdminCheckPoster from "~/media/access-control-demo/clips/aca-student-create-admin-checks.jpg?url&no-inline";
import recordOwnershipDesktop from "~/media/access-control-demo/clips/access-ownership-desktop.mp4?url&no-inline";
import recordOwnershipDesktopPoster from "~/media/access-control-demo/clips/access-ownership-desktop.jpg?url&no-inline";
import studentCreateMobile from "~/media/access-control-demo/clips/aca-student-create-consult-mobile.mp4?url&no-inline";
import studentCreateMobilePoster from "~/media/access-control-demo/clips/aca-student-create-consult-mobile.jpg?url&no-inline";
import leadFullWorkflow from "~/media/torque/clips/torque-lead-full-workflow.mp4?url&no-inline";
import leadFullWorkflowPoster from "~/media/torque/clips/torque-lead-full-workflow.jpg?url&no-inline";
import createRecordLink from "~/media/torque/clips/torque-create-link-pke.mp4?url&no-inline";
import createRecordLinkPoster from "~/media/torque/clips/torque-create-enquiry-workflow.jpg?url&no-inline";
import linkRecordPurchaseEnq from "~/media/torque/clips/torque-link-pke-n-model.mp4?url&no-inline";
import linkRecordPurchaseEnqPoster from "~/media/torque/clips/torque-link-pke-n-model.jpg?url&no-inline";
import changeLinkedModel from "~/media/torque/clips/torque-change-model-workflow.mp4?url&no-inline";
import changeLinkedModelPoster from "~/media/torque/clips/torque-change-model-workflow.jpg?url&no-inline";
import fullFuelCardWorkflow from "~/media/torque/clips/fuel-card-full-workflow.mp4?url&no-inline";
import fullFuelCardWorkflowPoster from "~/media/torque/clips/fuel-card-full-workflow.jpg?url&no-inline";
import fullRecostingWorkflow from "~/media/torque/clips/recosting-full-workflow.mp4?url&no-inline";
import fullRecostingWorkflowPoster from "~/media/torque/clips/recosting-full-workflow.jpg?url&no-inline";

export const projectVideos = {
  "autodash-reimbursement-desktop": {
    id: "autodash-reimbursement-desktop",
    title: "Fill and submit a reimbursement",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 66.8,
    caption:
      "Choose a vehicle and account, enter the claim, attach receipts and inspect the submitted reimbursement. Synthetic demo data.",
    src: reimbursementDesktop,
    poster: reimbursementDesktopPoster,
  },
  "autodash-reimbursement-mobile": {
    id: "autodash-reimbursement-mobile",
    title: "Fill and submit a reimbursement",
    label: "Mobile",
    width: 780,
    height: 1736,
    seconds: 48.8,
    caption:
      "Complete the reimbursement form and upload receipts on mobile. Synthetic demo data.",
    src: reimbursementMobile,
    poster: reimbursementMobilePoster,
  },
  "autodash-lease-workflow-desktop": {
    id: "autodash-lease-workflow-desktop",
    title: "Choose leases and inspect balances",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 49.8,
    caption:
      "Compare lease balances and budget categories. This recording demonstrates the interface, not calculation speed.",
    src: leaseDesktop,
    poster: leaseDesktopPoster,
    autoPlay: true,
    loop: true,
  },
  "autodash-lease-workflow-mobile": {
    id: "autodash-lease-workflow-mobile",
    title: "Choose leases and inspect balances",
    label: "Mobile",
    width: 780,
    height: 1736,
    seconds: 49.8,
    caption:
      "Inspect the lease balance and budget breakdown on mobile. Synthetic demo data.",
    src: leaseMobile,
    poster: leaseMobilePoster,
    autoPlay: true,
    loop: true,
  },
  "autodash-sign-in-desktop": {
    id: "autodash-sign-in-desktop",
    title: "Sign in and complete MFA",
    label: "Desktop",
    width: 1440,
    height: 1064,
    seconds: 19.0,
    caption:
      "Enter credentials and complete the MFA challenge. This demonstrates sign-in, not the underlying password-hash migration.",
    src: signInMfaDesktop,
    poster: signInMfaDesktopPoster,
  },
  "autodash-sign-in-mobile": {
    id: "autodash-sign-in-mobile",
    title: "Sign in and complete MFA",
    label: "Mobile",
    width: 390,
    height: 892,
    seconds: 16.3,
    caption:
      "Follow the mobile sign-in and MFA flow. This recording does not demonstrate password-hash migration.",
    src: signInMfaMobile,
    poster: signInMfaMobilePoster,
  },
  "step-up-delete-phone-desktop": {
    id: "step-up-delete-phone-desktop",
    title: "Verify and remove a phone number",
    label: "Desktop",
    width: 1440,
    height: 1064,
    seconds: 18.3,
    caption:
      "Request a phone-number deletion, complete verification and inspect the updated profile. Synthetic demo data.",
    src: stepupMfaDesktop,
    poster: stepupMfaDesktopPoster,
  },
  "step-up-delete-phone-mobile": {
    id: "step-up-delete-phone-mobile",
    title: "Verify and remove a phone number",
    label: "Mobile",
    width: 390,
    height: 892,
    seconds: 16.6,
    caption:
      "Complete the verification challenge before removing a phone number on mobile. Synthetic demo data.",
    src: stepupMfaMobile,
    poster: stepupMfaMobilePoster,
  },
  "access-consultation-lifecycle": {
    id: "access-consultation-lifecycle",
    title: "Create, reschedule and review a consultation",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 30.9,
    caption:
      "Create a consultation, change its date, mark it complete and switch to the administrator to review it. This recording uses automated field entry.",
    src: studentCreateWithAdminCheck,
    poster: studentCreateWithAdminCheckPoster,
  },
  "access-ownership-desktop": {
    id: "access-ownership-desktop",
    title: "Compare student and administrator workspaces",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 38.5,
    caption:
      "Create a consultation, switch students and inspect the administrator view. UI visibility alone does not prove API or database enforcement.",
    src: recordOwnershipDesktop,
    poster: recordOwnershipDesktopPoster,
  },
  "access-consultation-mobile": {
    id: "access-consultation-mobile",
    title: "Fill and create a consultation",
    label: "Mobile",
    width: 780,
    height: 1736,
    seconds: 22.6,
    caption:
      "Enter a name, reason and date, then inspect the new consultation in the mobile list.",
    src: studentCreateMobile,
    poster: studentCreateMobilePoster,
  },
  "torque-lead-full-workflow": {
    id: "torque-lead-full-workflow",
    title: "Fill the complete Torque lead and quote form",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 91.6,
    caption:
      "Follow the recorded lead details, vehicle searches, quote inputs, assignment and saved lead at normal speed.",
    src: leadFullWorkflow,
    poster: leadFullWorkflowPoster,
  },
  "torque-create-enquiry-workflow": {
    id: "torque-create-enquiry-workflow",
    title: "Create an enquiry from an existing lead",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 17.2,
    caption:
      "Create a purchase enquiry from an existing populated lead and inspect the linked result.",
    src: createRecordLink,
    poster: createRecordLinkPoster,
  },
  "torque-link-enquiry-model-workflow": {
    id: "torque-link-enquiry-model-workflow",
    title: "Link an enquiry and select its quoted model",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 36.6,
    caption:
      "Search for an enquiry, link it to a lead and select the quoted model.",
    src: linkRecordPurchaseEnq,
    poster: linkRecordPurchaseEnqPoster,
  },
  "torque-change-model-workflow": {
    id: "torque-change-model-workflow",
    title: "Change the linked model on an existing lead",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 22.8,
    caption:
      "Follow the model selection and resulting change on an existing lead.",
    src: changeLinkedModel,
    poster: changeLinkedModelPoster,
  },
  "fuel-card-full-workflow": {
    id: "fuel-card-full-workflow",
    title: "Complete the fuel-card workflow",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 98.2,
    caption:
      "Follow the recorded fuel-card form and resulting workflow in Torque CRM at normal speed.",
    src: fullFuelCardWorkflow,
    poster: fullFuelCardWorkflowPoster,
  },
  "recosting-full-workflow": {
    id: "recosting-full-workflow",
    title: "Follow the recosting workflow",
    label: "Desktop",
    width: 1920,
    height: 1144,
    seconds: 94.6,
    caption:
      "Follow the recorded recosting form and resulting workflow in Torque CRM at normal speed.",
    src: fullRecostingWorkflow,
    poster: fullRecostingWorkflowPoster,
  },
} satisfies Record<string, ProjectMedia>;

// Every catalog slug must have an entry. Empty arrays mean no matching recording.
export const projectMedia = {
  autodash: [
    projectVideos["autodash-reimbursement-desktop"],
    projectVideos["autodash-reimbursement-mobile"],
  ],
  "access-control-demo": [
    projectVideos["access-consultation-lifecycle"],
    projectVideos["access-ownership-desktop"],
    projectVideos["access-consultation-mobile"],
  ],
  "azure-iac": [],
  "azure-access-and-secrets": [],
  "lease-balance-calculation": [
    projectVideos["autodash-lease-workflow-desktop"],
    projectVideos["autodash-lease-workflow-mobile"],
  ],
  "site-rebuild": [],
  "tqe-legacy-integration": [
    projectVideos["torque-lead-full-workflow"],
    projectVideos["torque-create-enquiry-workflow"],
    projectVideos["torque-link-enquiry-model-workflow"],
    projectVideos["torque-change-model-workflow"],
    projectVideos["fuel-card-full-workflow"],
    projectVideos["recosting-full-workflow"],
  ],
  "autodash-migration": [
    projectVideos["autodash-sign-in-desktop"],
    projectVideos["autodash-sign-in-mobile"],
  ],
  "step-up-authentication": [
    projectVideos["step-up-delete-phone-desktop"],
    projectVideos["step-up-delete-phone-mobile"],
  ],
  "ransomware-recovery": [],
} satisfies Record<ProjectSlug, ProjectMedia[]>;
