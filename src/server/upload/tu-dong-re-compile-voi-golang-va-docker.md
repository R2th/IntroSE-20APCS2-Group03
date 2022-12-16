Nếu bạn từng làm việc với Node có lẽ bạn sẽ khá quen thuộc với các công cụ như nodemon,
giúp tự động re-run mỗi khi bạn thay đổi file.
Ở bài viết này tôi muốn chia sẻ cách tôi setup golang trên local development để có thể
tự động re-compile mỗi khi thay đổi file.

Bài viết này mình sẽ sử dụng go module của golang version 1.11 thay vì dùng dep, 

Các công sự sử dụng trong bài viết:

* golang 1.11 (sử dụng go module)
* [CompileDaemon](https://github.com/githubnemo/CompileDaemon)
* docker và docker-compose

**Tạo http server đơn giản.**
```
$ mkdir ~/goapi && cd ~/goapi
$ go mod init goapi
$ cat <<EOF > main.go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.handleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("hello world"))
    })
    http.ListenAndServe(":3000", nil)
}
EOF
```

**Tạo Dockerfile**
```
$ cd ~/api
$ touch Dockerfile
```

**Dockerfile**
```
FROM golang:1.11.0-alpine

RUN apk add git
WORKDIR /app
COPY . .

ENV CGO_ENABLED=0

RUN go get github.com/githubnemo/CompileDaemon

ENTRYPOINT CompileDaemon -build="go build" -command="./goapi"
```

**docker-compose.yml**
```
version: '3'

services:
  api:
    build: .
    volumes:
      - .:/app
    ports:
      - '3000:3000'
```

Mặc định CompileDeamon chỉ watch các file `.go`, để watch các file khác, bạn có thể thêm flag `-include`.
Ví dụ: `-include=*.*` sẽ watch tất cả các file trong project.
Bạn cũng có thể exclude các file trong project với flag `-exclude`.

Bước cuối cùng là run docker-compose
```
$ docker-compose up
```

Bạn có thể thêm flag `-d`, tuy nhiên khi chạy container với auto re-compile, tôi thường bỏ option -d
để có thể thấy được thay đổi trên terminal.

Bây giờ bạn có thể thay đổi nội dung file, và refresh browser để thấy sự thay đổi.

**Một số lưu ý:**  
Tôi đã thử qua 1 số file-watcher như [realize](https://github.com/oxequa/realize), [go-watcher](https://github.com/canthefason/go-watcher) hay [watcher](https://github.com/radovskyb/watcher)
cá nhân tôi thích sử dụng CompileDeamon hơn cả. 
Nếu bạn sử dụng [realize](https://github.com/oxequa/realize) thì cần chú ý [realize](https://github.com/oxequa/realize) version mới nhất tại thời điểm viết bài chưa support go module.
Bạn phải disable go module `GO111MODULE=off`.