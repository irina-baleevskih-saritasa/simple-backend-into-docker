# simple-backend-into-docker

1. Run via docker container:
  ```
  docker build -t <image-name> .
  ```

  ```
  docker run -dp 8000:8000 -v "$(pwd):/app" -v /app/node_modules <image-name>
  ```

2. Run via docker compose:
  ```
  docker compose up -d
  ```
