# ---- Base Node ----
FROM node:16-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ---- Development ----
FROM base AS development
ENV NODE_ENV=development
COPY . .
CMD ["yarn", "start:dev"]

# ---- Production ----
FROM base AS production
ENV NODE_ENV=production
COPY . .
RUN yarn build
CMD ["yarn", "start:prod"]