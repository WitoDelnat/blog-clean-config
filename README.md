# Blog: Clean configuration in NodeJs

Read the blog at https://www.witodelnat.eu/blog/2021/clean-config.

## Try it yourself

1. Start database

```
docker run --rm --detach \
  --name demo \
  -e POSTGRES_DB=demo \
  -e POSTGRES_USER=usr \
  -e POSTGRES_PASSWORD=p4ssw0rd \
  -p 5432:5432 \
  postgres:12.1
```

2. Install dependencies

```bash
yarn install
```

3. Start server

```bash
yarn start
```

4. Validate HTTP responses

```bash
curl http://localhost:8080/hello
curl http://localhost:8080/now
```
