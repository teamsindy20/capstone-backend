FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /server

## 외부 패키지 설치
COPY package.json yarn.lock ./
RUN yarn install --production=false

# Transpile TypeScript into JavaScript
COPY src src
COPY tsconfig.json ./
RUN yarn build

# 필요 없는 파일 삭제
RUN rm -rf node_modules src tsconfig.json
RUN yarn install

EXPOSE 4000

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]
