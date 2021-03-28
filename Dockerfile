FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /server

## 외부 패키지 설치
COPY package.json yarn.lock ./
RUN yarn install

# TypeScript 빌드
COPY src src
COPY tsconfig.json tsconfig.json
RUN yarn add typescript copyfiles
RUN yarn build

# 필요 없는 파일 삭제
RUN yarn remove typescript copyfiles
RUN rm -f yarn.lock
RUN rm -rf src
RUN rm -f tsconfig.json

EXPOSE 4000

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]
