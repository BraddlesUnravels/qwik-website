# syntax=docker/dockerfile:1

# Build stage
FROM oven/bun:1.3.12-slim AS build

WORKDIR /app

COPY package.json bun.lock ./

RUN HUSKY=0 bun install --frozen-lockfile

COPY . .

# App compile only. Lint/types/tests remain CI concerns (see .github/workflows).
RUN bun run build.docker

# Production stage
FROM oven/bun:1.3.12-slim AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=build --chown=bun:bun /app/package.json ./
COPY --from=build --chown=bun:bun /app/bun.lock ./
COPY --from=build --chown=bun:bun /app/dist ./dist
COPY --from=build --chown=bun:bun /app/server ./server

# Install only production dependencies
RUN HUSKY=0 bun install --frozen-lockfile --production --ignore-scripts

USER bun

EXPOSE 3000

CMD ["bun", "run", "serve"]
