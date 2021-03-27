# 2021-1 Capstone Back-End (Node.js)

## 실행 방법

### 개발 환경

- macOS 11.2
- Git 2.31
- Docker 20.10
- Docker Compose 1.28
- Visual Studio Code 1.54

### 프로젝트 다운로드

```bash
> git clone https://github.com/capstone-2021-1/capstone-backend-node.git
> cd capstone-frontend
> git checkout (브랜치 이름)
> code .
```

프로젝트를 다운로드 받고 해당 폴더로 이동해서 적절한 브랜치로 이동합니다.

그리고 VSCode를 실행하면 오른쪽 아래에 '권장 확장 프로그램 설치' 알림이 뜹니다. 프로젝트에서 권장하는 확장 프로그램(ESLint, Prettier 등)을 모두 설치해줍니다.

- 만약 이미 프로젝트를 다운로드 받았다면 다른 사람의 변경 사항을 반영하기 위해 `git fetch, git pull` 도 실행해줍니다.

### 환경 변수 설정

루트 폴더에 `.env` 파일을 생성하고 거기에 프로젝트에 필요한 환경 변수를 설정합니다.

### 개발 모드

```shell
> docker-compose --file docker-compose.dev.yml up --detach --build --force-recreate
```

로컬 컴퓨터에서 작업한 결과가 자동으로 Docker에 있는 GraphQL 서버에 반영됩다.

`Dockerfile.dev` 나 `docker-compose.dev.yml` 파일을 수정했을 경우엔 위 명령어를 다시 실행해야 합니다.

### 프로덕션 모드

```shell
> yarn build
> docker-compose up --detach --build --force-recreate
```

배포 서버 환경이랑 동일한 Docker 환경을 생성합니다.

### Heroku 배포

```shell

```

### 브라우저 실행

```
http://localhost:4000
```

브라우저에서 아래 주소로 접속하면 개발 중인 사이트를 볼 수 있습니다.
