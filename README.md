## Using docker-compose to build up your docker images

1. Run the following command to build up your MERN stack images

```bash
docker-compose build
```

## Using docker-compose to run up your containers

1. Run the following command to run up your MERN containers

```bash
docker-compose up
```


2. Open [http://localhost:8080](http://localhost:8080) and take a look around MERN Stack sample project.

3. Open [http://localhost:8081](http://localhost:8081) and take a look around MongoExpress.


## Testing

1. Run the following command to install dependent modules
```bash
npm install
```

2. Run the test files in `tests/unit/`
```bash
    $ cd client/
    $ npm run test:unit [--file /tests/unit/<filename>]
```
