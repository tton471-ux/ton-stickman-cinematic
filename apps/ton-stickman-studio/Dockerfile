FROM node:22-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg git ca-certificates python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY . /app

# Materialize the exact upstream skill source pinned by this repository's submodule.
RUN git init /tmp/upstream \
    && git -C /tmp/upstream remote add origin https://github.com/kaomei/stickman-video-director.git \
    && git -C /tmp/upstream fetch --depth 1 origin 9431d3707bde52ba8eb17f31886b0892c763eeba \
    && git -C /tmp/upstream checkout --detach FETCH_HEAD \
    && for folder in assets references examples; do \
         if [ -d "/tmp/upstream/$folder" ]; then \
           rm -rf "/app/skills/ton-stickman-cinematic/vendor/upstream/$folder"; \
           cp -a "/tmp/upstream/$folder" "/app/skills/ton-stickman-cinematic/vendor/upstream/$folder"; \
         fi; \
       done \
    && npm ci --prefix /app/skills/ton-stickman-cinematic/vendor/upstream --omit=dev \
    && rm -rf /tmp/upstream

ENV TON_STUDIO_HOST=0.0.0.0
ENV TON_RUNTIME_ROOT=/app/skills/ton-stickman-cinematic/vendor/upstream
ENV TON_PROJECTS_DIR=/var/data/TonStickmanProjects
WORKDIR /app/apps/ton-stickman-studio

EXPOSE 4177
CMD ["node","server.mjs"]
