FROM node:20 AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .
RUN pnpm run build

FROM node:20 AS production

RUN npm install -g serve

COPY --from=build /app/dist /app/build

CMD ["serve", "-s", "/app/build", "-l", "3000"]

EXPOSE 3000
