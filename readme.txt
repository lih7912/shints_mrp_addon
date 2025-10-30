**

**
prisma help
  Set up a new Prisma project
  $ prisma init

  Generate artifacts (e.g. Prisma Client)
  $ prisma generate

  Browse your data
  $ prisma studio

  Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
  $ prisma migrate dev
  
  Pull the schema from an existing database, updating the Prisma schema
  $ prisma db pull

  Push the Prisma schema state to the database
  $ prisma db push

**
2. setup 
  1)  npm install 
  2)  prisma generate
      => prisma/ 디렉토리에 schema.prisma 을 기준으로 prima_client 생성
  3)  graphql 셋팅 
      => dblib : 전체 database에 대한 typedefs, mutations, queries 생성
                 src/schema.ts에서 통합함
                 (shints_service_tool/work_tool/make_service/make_dblib 에서 생성)
      => dblib2 : 특정 table에 대한 업부별 graphql 작성
  4)  src 설명
      => server.js : apollo server 및 express 서버 셋팅
      => schema.js : dblib 및 dblib2의 graphql 정보를 생성
      => db.ts : prisma client 생성 및 연결 
  5)  prisma 설명  
      => schema.prisma : 전체 데이타베이스 table구조 정의
      => .env: 데이터베이스 연결정보 셋팅

