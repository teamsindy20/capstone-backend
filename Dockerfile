FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /server

## 의존성 패키지 설치
COPY package.json yarn.lock ./
RUN yarn install
RUN rm -f yarn.lock

# 빌드 결과물 복사
COPY dist dist

EXPOSE 4000

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]
