Khi bạn nghĩ về Internet trong tưởng tượng tất cả đều là các trang web nhìn thật đẹp. Chúng được thiết kế dành cho tương tác giữa con người và máy tính để người dùng có thể hiểu được nội dung. Nếu xem về phía tương tác giữa máy với nhau (ứng dụng với nhau) nó không có tác dụng bởi vì một máy không cần nhìn đẹp mà cần các phản hồi có cấu trúc như XML, JSON, CSV, vv.. và đó là web service được hình thành. Trong bài viết này sẽ trình bay về RESTful web APIs, ORM và demo tạo ứng dụng web api sử dụng ORM trong Golang.

## RESTful Web APIs

Bản chất của kiến trúc REST tạo bởi một client và một server. REST API cho tạo điều kiện linh hoạt các hệ thống kết nối và gửi/nhận dữ liệu theo một cách trực tiếp. Bên server nhận bản tin đến và trả lời trong khi client tạo kết nối nhận bản tin gửi lại từ server.

RESTful client là một HTTP client và RESTful server là HTTP server. Mỗi và tất cả việc gọi REST API có một mối quan hệ giữa một HTTP verb và URL. Dữ liệu hoặc business logic trong database của một ứng dụng có thể được xác định bởi một API endpoint trong REST.

## Object-realtional mapping - ORM

Trong phần mềm máy tính là một kỹ thuật lập trình để biến đổi dữ liệu giữ các hệ thống không tương thích trong các cơ sở dữ liệu quan hệ và các ngôn ngữ lập trình hướng đối tượng. Mục đích để một cơ sở dữ liệu đối tượng ảo có thể sử dụng từ bên trong ngôn ngữ lập trình.

## GORM

Dự trên khái niệm của ORM thì GORM là một thư viện ORM dành cho Golang để các nhà phát triển dễ dàng làm việc trong việc lập trình.
Các tính năng GORM gồm có
- Đầy đủ tính năng của ORM 
- Associations (Has One, Has Many, Belongs To, Many To Many, Polymorphism, Single-table inheritance)
- Hooks (Before/After Create/Save/Update/Delete/Find)
- Eager loading with Preload, Joins
- Transactions, Nested Transactions, Save Point, RollbackTo to Saved Point
- Context, Prepared Statment Mode, DryRun Mode
- Batch Insert, FindInBatches, Find/Create with Map, CRUD with SQL Expr and Context Valuer
- SQL Builder, Upsert, Locking, Optimizer/Index/Comment Hints, Named Argument, SubQuery
- Composite Primary Key, Indexes, Constraints
- Auto Migrations
- Logger
- Extendable, flexible plugin API: Database Resolver (Multiple Databases, Read/Write Splitting) / Prometheus…
- Every feature comes with tests

## Ứng dụng

Trước tiền để khởi tạo một ứng dụng trong Golang bạn cần tham khảo các phần sau
- [Download and install Go](https://golang.org/doc/install)
- [How to Write Go Code](https://golang.org/doc/code.html#Command)
- [Golang package management and module systems](https://viblo.asia/p/golang-package-management-and-module-systems-Eb85onP0l2G)
- [Echo](https://echo.labstack.com/) Go web framework

#### Cấu trúc trong thư mục project
Tạo một thư mục và `cd <PROJECT>`
```
├── bin
│   └── app
├── cmd
│   └── server
│       └── main.go
├── db
│   └── adapter.go
├── docker-compose.yml
├── go.mod
├── go.sum
├── handler
│   ├── server.go
│   ├── subject.go
├── models
│   ├── subject.go
.env
```

Để dễ dàng bắt đầu cần một số package sau
```
go mod init github.com/todo_app/server
go get -u github.com/labstack/echo/v4 v4.1.16
go get -u github.com/go-kit/kit v0.10.0
go get -u github.com/jinzhu/gorm v1.9.16
```

Sau khi đã có package tiện hơn nữa sẽ dùng docker image đã build sẵn
```
# docker-compose.yml

version: "3.5"
services:
  app:
    image: kimhuorlim/golang:1.14.4-alpine3.12
    command: watch
    volumes:
      - .:/app
      - go-mod:/go/pkg/mod
      - build-cache:/root/.cache/go-build
      - ~/.ssh/id_rsa:/root/.ssh/id_rsa
    container_name: gorm_server
    ports:
      - 8080:8080
    stdin_open: true
    tty: true
    env_file:
      - .env
  mysql:
    image: mysql:5.7
    container_name: gorm_db
    environment:
      MYSQL_DATABASE: gorm_todo
      MYSQL_USER: root
      MYSQL_PASSWORD: password
      MYSQL_ROOT_PASSWORD: password
    restart: always
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"
    env_file:
      - .env
volumes:
  go-mod:
  build-cache:
  mysql_data:
```

Tiếp đến là start một ứng dụng web trong Golang

```
#cmd/server/main.go

package main

import (
	"flag"
	"net/http"
	"os"
	"time"
	"github.com/todo_app/server/handler"
	"github.com/go-kit/kit/log"
)

var (
	fs = flag.NewFlagSet("todo_app", flag.ExitOnError)
	httpAddr = fs.String("http-addr", ":8080", "HTTP server address")
)

func main() {
	logger := log.NewJSONLogger(os.Stdout)
	logger = log.WithPrefix(logger, "ts", log.DefaultTimestamp)

	if err := fs.Parse(os.Args[1:]); err != nil {
		logger.Log("binding", "flag", "err", err)
		os.Exit(1)
	}

	server := &http.Server {
		Handler: handler.NewHandler(),
		Addr: *httpAddr,
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	logger.Log("http", "server", "addr", *httpAddr)

	if err := server.ListenAndServe(); err != nil {
		logger.Log("http", "server", "err", err)
		os.Exit(1)
	}
}
```

```
# handler/server.go

package handler

import (
	echo "github.com/labstack/echo/v4"
	"net/http"
)

func NewHandler() http.Handler {
	e := echo.New()
    return e
}
```

Khi start ứng dụng sẽ có trang như sau
![](https://images.viblo.asia/bac3fbe5-e954-448b-9d9a-549e90234836.png)

### Kết nối DB

Với GORM hỗ trợ các database sau MySQL, PostgreSQL, SQlite, SQL Server,  trong bài viết này sẽ làm việc với MySQL.
Chi tiết về config kết nối hãy tham khảo thêm [connecting_to_the_database](https://gorm.io/docs/connecting_to_the_database.html).

```
#cmd/server/main.go

var (
...
	dbConfig = fs.String("mysql", os.Getenv("GORM_DIALECT"), "mysql db connection")
)

func main() {
...
	logger.Log("mysql", *dbConfig)

	db, err := db.Connect()

	if err != nil {
		logger.Log("mysql", "err", err)
		os.Exit(1)
	}
	defer db.Close()

	server := &http.Server {
		Handler: handler.NewHandler(db),
		Addr: *httpAddr,
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
...
```

```
# handler/server.go
...
type Server struct {
	db *gorm.DB
}

func NewHandler(db *gorm.DB) http.Handler {
	e := echo.New()
	s := &Server{db: db}
    ...
}
```

```
# db/adapter.go
package db

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"os"
)

var (
	dbDSN = "root:password@tcp(gorm_db)/gorm_todo?charset=utf8mb4&parseTime=True&loc=Local"
)

func Connect() (db *gorm.DB, err error) {
	db, err = gorm.Open("mysql", os.Getenv("GORM_DIALECT"))
	return db, err
}
```

Các bạn có thể tìm hiểu thêm về việc quản lý migration ở bài viết này [Command line with grift in Go](https://viblo.asia/p/command-line-with-grift-in-go-ORNZq14rZ0n)

Ở đây mình chạy bằng manual để tạo schema trong mysql với cmd sau
```
# mysql -uroot -ppassword
mysql> create database gorm_todo;
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| gorm_todo          |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

Khi restart lại hãy xem log sau có nghĩa là đã kết nối được đến DB.
```
gorm_db | 2020-09-18T15:24:58.784158Z 0 [Note] Event Scheduler: Loaded 0 events
gorm_db | 2020-09-18T15:24:58.785910Z 0 [Note] mysqld: ready for connections.
gorm_server | {"mysql":"root:password@tcp(gorm_db)/gorm_todo?charset=utf8mb4&parseTime=True&loc=Local","ts":"2020-09-18T15:24:59.948351675Z"}
gorm_server | {"addr":":8080","http":"server","ts":"2020-09-18T15:24:59.963873306Z"}
```

### Tạo API endpoints

Các API endpoint gồm có
- Get all subjects `GET` `/subjects`
- Create subject `POST` `/subjects`
- Get subject `GET` `/subjects/:id`
- Update subject `PUT` `/subjects/:id`
- Delete subject `DELETE` `/subjects/:id`

Để map đến bảng `subjects` trong mysql cần tạo một struct `Subject`
```
# models/subject.go
package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Subject struct {
	gorm.Model
	Title string 			`json:"title"`
	DueAt time.Time			`json:"due_at"`
}
```

Migrate object `Subject` với mysql

```
func main() {
    ...
    defer db.Close()
	db.AutoMigrate(&models.Subject{})
    ...
}
```

Tiếp đến trong `handler/server.go` cần khai báo những endpoint trên.
```
    ...
    s := &Server{db: db}
	e.GET("/subjects", s.getAllSubjects)
	e.POST("/subjects", s.createSubject)
	e.GET("/subjects/:id", s.getSubject)
	e.PUT("/subjects/:id", s.updateSubject)
	e.DELETE("/subjects/:id", s.deleteSubject)
    ...
```

Define những logic cho mỗi endpoint

```
# handler/subject.go
package handler

import (
	"github.com/jinzhu/gorm"
	"github.com/todo_app/server/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func (s Server) getAllSubjects(c echo.Context) (err error) {
	subjects := []models.Subject{}
	s.db.Find(&subjects)
	return c.JSONPretty(http.StatusOK, &subjects, "  ")
}

func (s Server) createSubject(c echo.Context) (err error) {
	subject := new(models.Subject)
	if err = c.Bind(subject); err != nil {
		return
	}

	s.db.Create(&subject)

	return c.JSONPretty(http.StatusOK, subject, "  ")
}

func (s Server) getSubject(c echo.Context) (err error) {
	subject, err := getSubjectOr404(s.db, c.Param("id"))
	if subject == nil {
		return
	}
	return c.JSONPretty(http.StatusOK, &subject, "  ")
}

func (s Server) updateSubject(c echo.Context) (err error) {
	subject, err := getSubjectOr404(s.db, c.Param("id"))
	if subject == nil {
		return
	}

	if err = c.Bind(subject); err != nil {
		return
	}

	if err = s.db.Model(&subject).Updates(&subject).Error; err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSONPretty(http.StatusOK, &subject, "  ")
}

func (s Server) deleteSubject(c echo.Context) (err error) {
	id := c.Param("id")
	subject, err := getSubjectOr404(s.db, id)

	if subject == nil {
		return
	}

	if err = s.db.Delete(&models.Subject{}, id).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusNoContent, nil)
}

func getSubjectOr404(db *gorm.DB, id string) (*models.Subject, *echo.HTTPError) {
	s := &models.Subject{}
	if err := db.First(&s, id).Error; err != nil {
		return nil, echo.NewHTTPError(http.StatusNotFound, err.Error())
	}
	return s, nil
}
```

### Demo
##### Create subject

![](https://images.viblo.asia/4c81c641-6eb2-4573-a058-3dcf893390af.png)
![](https://images.viblo.asia/715b08d6-439b-4bec-9368-c369b69b25fb.png)

#### Get subject
- Khi gọi API với id không tồn tại

![](https://images.viblo.asia/37e218dc-ed15-427f-a441-87cf701280d6.png)

- Khi gọi API với id tồn tại trong DB

![](https://images.viblo.asia/9d943e31-d5e3-4f65-a3a5-1dc561395801.png)

#### Get all subjects

![](https://images.viblo.asia/7ca2284c-390c-4d84-be68-68a59fe2d059.png)
![](https://images.viblo.asia/35688899-7ca2-44d0-a5d7-e53eaafd4f8b.png)

#### Update subject
- Khi gọi API với id không tồn tại

![](https://images.viblo.asia/47b174a8-3a0d-4bef-9897-e9bbc2b6384f.png)

- Khi gọi API với id tồn tại trong DB

![](https://images.viblo.asia/28eef664-f342-49d7-b2fb-9a1d8cd3154e.png)
![](https://images.viblo.asia/83fe8099-9aa9-41d7-9b00-b4c80ec82057.png)

#### Delete subject
- Khi gọi API với id không tồn tại

![](https://images.viblo.asia/80cf247b-3fea-449d-8014-3874c9aa7c73.png)

- Khi gọi API với id tồn tại trong DB

![](https://images.viblo.asia/48e6ad5b-6aa9-49e9-a3d5-bc53b5ff15cf.png)
![](https://images.viblo.asia/ca5c8758-5f25-458e-b15e-e1bdbf320527.png)

#### Kết luận
Trong bài viết đã trình bày về khái niệm cơ bản và một ứng dụng web API nhỏ với Golang và hy vọng có hữu ích cho bạn đọc.

Cảm ơn bạn đã đọc bài viết!

## Tài liệu tham khảo

- https://medium.com/@wkrzywiec/rest-restful-web-service-api-soap-whats-the-difference-4f101953d0bd
- https://en.wikipedia.org/wiki/Representational_state_transfer
- https://en.wikipedia.org/wiki/Object-relational_mapping
- https://gorm.io/docs/index.html
- https://echo.labstack.com/guide