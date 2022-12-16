![](https://images.viblo.asia/9bc55c5a-8f49-47d7-991a-b4f92fd80400.jpg)

Ở [bài trước](https://viblo.asia/p/web-programing-co-ban-voi-golang-jvElarBD5kw), chúng ta đã cùng tìm hiểu một số kiến thức căn bản để lập trình web với Golang. Trong phần 2 này, chúng ta sẽ cùng tìm hiểu cách viết chức năng đăng ký, đăng nhập, authentication với json web token với Golang và cơ sở dữ liệu MongoDB. Toàn bộ mã nguồn của bài viết này các bạn có thể tham khảo tại [đây](https://github.com/conglt10/web-golang)

## 1. Khởi tạo thư mục

```bash
mkdir web-golang
cd web-golang
mkdir server
cd server
go mod init github.com/conglt10/web-golang
```

Câu lệnh `go mod init [tên-module]` sẽ tạo ra một file là `go.mod`, file này giúp quản lý các package của ứng dụng. Nó tương tự như việc thực hiện `npm init` bên Javascript và file `go.mod` tương tự như file `package.json`

## 2. Cấu trúc thư mục

Cấu trúc thư mục sẽ được tổ chức như sau

![](https://images.viblo.asia/2e8b7b5c-8554-414e-93d1-7285efb21383.png)

- File `main.go` là file chúng ta thiết lập thông số kỹ thuật chung cho server, khi chạy ứng dụng thì sẽ chạy file này.
- File `go.mod` quản lý cách package (như đã giới thiệu ở trên ).
- `.env` lưu các biến môi trường của ứng dụng
-`auth` chứa file xử lý json web token 
-  `database` chứa các file có nhiệm vụ thao tác với MongoDB (connect cơ sở dữ liệu ).
-  `models` định nghĩa là cấu trúc dữ liệu sẽ được lưu vào collection.
-  `routes` chứa các hàm xử lý request ứng với từng route
-  `tests` chứa các file unit test
-  `utils` chứa một số hàm xử lý cần dùng (parse JSON, ...)

![](https://images.viblo.asia/0327ff2c-3423-4741-b741-37c0210200d7.png)

## 3. Coding Login and Register

### `main.go`

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/julienschmidt/httprouter"
    "github.com/joho/godotenv"
	"github.com/conglt10/web-golang/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error getting env, %v", err)
	}
	
	router := httprouter.New()
	
	router.POST("/auth/login", routes.Login)
	router.POST("/auth/register", routes.Register)

	fmt.Println("Listening to port 8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
```

- Dòng đầu tiên trong thân hàm `main` sử dụng thư viện [godotenv](github.com/joho/godotenv) để  ứng dụng có thể trích xuất các biến môi trường.
- Phần sau chỉ đơn giản là kiểm tra lỗi.
- Ứng dụng của chúng ta sẽ sử dụng `Multiplexer` [http/router](github.com/julienschmidt/httprouter) thay vì `Multiplexer` mặc định trong thư viện `net/http`.
- 2 dòng tiếp theo defined 2 route dùng để đăng nhập, đăng ký. Hàm xử lý của các route tương ứng là `Login` và `Register` trong package `auth` (folder routes)
- Server sẽ listen ở port 8000

### `models/User.go`: Định nghĩa cấu trúc dữ liệu trong db

```go
package models

import (
	"html"
	"strings"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	username string 
	email string	
	password string	
}


func Hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func Santize(data string) string{
	data = html.EscapeString(strings.TrimSpace(data))
	return data
}
```

- struct `User` cơ bản gồm 3 trường `username`, `email` và `password`
- hàm `Hash` truyền vào password dạng string, sau đó đưa vào hàm `GenerateFromPassword` của thư viện brcypt để băm. Dưới đây là prototyped của hàm `GenerateFromPassword`.
```go
func GenerateFromPassword(password []byte, cost int) ([]byte, error)
```
- hàm `CheckPasswordHash` để so sánh mật khẩu do người dùng submit có trúng khớp với mật khẩu dạng băm ở trong cơ sở dữ liệu hay không ?
```go
func CompareHashAndPassword(hashedPassword, password []byte) error
```
- hàm `Santize` dùng để loại bỏ các dấu cách thừa, encode các ký tự đặc biệt của dữ liệu (tránh phần nào các lỗ hổng injection) trước khi lưu vào db .

### `database/connect.go` : Kết nối đến cơ sở dữ liệu

```go
package db

import (
	"log"
	"context"
	"os"
	"go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectUsers() *mongo.Collection {
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
    	log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
    	log.Fatal(err)
	}

	collection := client.Database("golang").Collection("users")
	return collection
}
```

Như trong bài trước, chúng ta kết nối với mongoDB ngay trong hàm main và thực hiện truy vấn. Tuy nhiên, với cách viết chia module như thế này thì sẽ không phù hợp vì các hàm ở `package` khác sẽ không sử dụng được đối tượng `collection` được trả về khi kết nối thành công. Lẽ đó, chúng ta sẽ viết hàm connect đến DB ở 1 package riêng và các hàm có thể gọi đến bất cứ lúc nào để thực hiện.


### `utils/json.go`

```go
package res

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func JSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(data)

	if err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}
}

func ERROR(w http.ResponseWriter, statusCode int, err error) {
	if err != nil {
		JSON(w, statusCode, struct {
			Error string `json:"error"`
		}{
			Error: err.Error(),
		})
		return
	}
	JSON(w, http.StatusBadRequest, nil)
}
```

Vì chúng ta đang viết server bằng `Golang` thuần nên khi return `response` cho client cần thực thao tác set status code cho `header`, chuyển data sang dạng `json`. Để đơn giản hóa vấn đề thì chúng ta sẽ viết hàm, đặt tên package là `res`. Như vậy lúc return response sẽ là `res.JSON` (trông hao hao Express.JS :grin: )

### `routes/auth.go`: Đăng ký tài khoản

```go
package auth

import (
    "fmt"
    "net/http"
    "context"
    "github.com/conglt10/web-golang/models"
    "github.com/conglt10/web-golang/auth"
    "github.com/conglt10/web-golang/utils"
    "github.com/conglt10/web-golang/database"
    "github.com/julienschmidt/httprouter"
    "github.com/asaskevich/govalidator"
    "go.mongodb.org/mongo-driver/bson"
)
```

Ban đầu, chúng ta import một loạt package như trên. Ngoài các package local thì còn một số package của bên thứ 3 khác.
- `govalidator`: Giúp validate dữ liệu nhận được từ client.
- `bson`: Do dữ liệu trong MongoDB được lưu dưới dạng `bson` nên cần định dạng dữ liệu trước khi truy vấn.

```go
func Register(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    username := r.PostFormValue("username")
    email := r.PostFormValue("email")
    password := r.PostFormValue("password")

    if govalidator.IsNull(username) || govalidator.IsNull(email) || govalidator.IsNull(password) {
        res.JSON(w, 400, "Data can not empty")
        return
    }

    if !govalidator.IsEmail(email) {
        res.JSON(w, 400, "Email is invalid")
        return
    }

    username = models.Santize(username)
    email = models.Santize(email)
    password = models.Santize(password)

    collection := db.ConnectUsers()
    var result bson.M
    errFindUsername := collection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&result)
    errFindEmail := collection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&result)

    if errFindUsername == nil || errFindEmail == nil {
        res.JSON(w, 409, "User does exists")
        return
    }

    password, err := models.Hash(password)

    if err != nil {
        res.JSON(w, 500, "Register has failed")
        return
    }

    newUser := bson.M{"username": username, "email": email, "password": password}

    _, errs := collection.InsertOne(context.TODO(), newUser)

    if errs != nil {
        res.JSON(w, 500, "Register has failed")
        return
    }

    res.JSON(w, 201, "Register Succesfully")
}
```

- Hàm `Register` truyền vào 3 đối số theo đúng prototype đã được quy định của [http/router](https://godoc.org/github.com/julienschmidt/httprouter#Handle). Trong route này chúng ta không cần dùng params nên để dấu `_` ở trước để bỏ qua.

```go
type Handle func(http.ResponseWriter, *http.Request, Params)
```

- Hơn 10 dòng đầu của hàm làm công việc trích xuất dữ liệu gửi từ client lên và validate bằng [govalidator](https://github.com/asaskevich/govalidator), nếu data gửi lên không hợp lệ thì trả về lỗi `400`. Sau đó là làm sạch dữ liệu với hàm `Santize`.
-  `collection := db.Connect()`: Connect đến collection `users`
-  Tiếp theo cần check xem `username` và `email` đã tồn tại trong hệ thống chưa, nếu đã tồn tại thì trả về lỗi cho client. `bson.M` là kiểu dữ liệu bson dạng `map` (key-value). Chi tiết hơn các bạn có thể tham khảo [bson go doc](https://godoc.org/go.mongodb.org/mongo-driver/bson)
-  Trước khi lưu user vào db thì password cần được băm với hàm `Hash` trong `package models`


**Chạy app lên**
Cái hay của golang thì khi bạn `go run main.go` thì nó sẽ tự động cài các package đã được import luôn. Như bên Node.JS thì cần chạy `npm install` trước khi chạy app.

![](https://images.viblo.asia/f74541d6-d2f5-44b9-ba5c-249c8bba6565.png)

**Test bằng PostMan**

- Đăng ký thành công
![](https://images.viblo.asia/eb3fdb07-92b6-4e0b-a3c0-5d9b09dcd097.png)

Check trong database xem đã có bản ghi chưa ?

![](https://images.viblo.asia/7ab02e80-b4cb-4022-b045-84031662826c.png)

- Đăng ký thất bại do trùng thông tin (trả về status 409)

![](https://images.viblo.asia/3b9bab30-6170-4496-8a28-40980a4933a0.png)

- Đăng ký thất bại do thiếu hoặc sai thông tin (trả về status 400)

![](https://images.viblo.asia/6ac831e0-94a6-47be-b7bf-cee69047b62c.png)

![](https://images.viblo.asia/8bc15c21-0437-44f1-bf73-8e71cf992e5e.png)


### `auth/jwt.go`: Tạo jsonwebtoken

Với chức năng đăng nhập, chúng ta sẽ sử dụng json web token, khi người dùng đăng nhập thành công, server sẽ trả về 1 token, client sẽ lưu token lại (vào localStorage chẳng hạn ) và gửi lên server cho những lần request sau nhằm định danh người dùng mà không cần phải đăng nhập lại.


```go
package jwt

import (
	"os"
	"time"
	jwt "github.com/dgrijalva/jwt-go"
)

func Create(username string) (string, error) {
	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Hour * 12).Unix() //Token hết hạn sau 12 giờ
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("SECRET_JWT")))
}
```

Chúng ta sẽ dùng thư viện [jwt-go](https://godoc.org/github.com/dgrijalva/jwt-go) để tạo json web token, token sẽ được mã hóa theo secret key lưu ở `.env`.

### `routes/auth.go`: Đăng nhập

```go
func Login(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    username := r.PostFormValue("username")
    password := r.PostFormValue("password")

    if govalidator.IsNull(username) || govalidator.IsNull(password) {
        res.JSON(w, 400, "Data can not empty")
        return
    }

    username = models.Santize(username)
    password = models.Santize(password)

    collection := db.ConnectUsers()

    var result bson.M
    err := collection.FindOne(context.TODO(), bson.M{"username": username}).Decode(&result)

    
    if err != nil {
        res.JSON(w, 400, "Username or Password incorrect")
        return
    }

    // convert interface to string
    hashedPassword := fmt.Sprintf("%v", result["password"])

    err = models.CheckPasswordHash(hashedPassword, password)

    if err != nil {
        res.JSON(w, 401, "Username or Password incorrect")
        return
    }

    token, errCreate := jwt.Create(username)

    if errCreate != nil {
        res.JSON(w, 500, "Internal Server Error")
        return
    }

    res.JSON(w, 200, token)
}
```

- Phần lấy data từ form request và validate cũng tương tự như ở hàm `Register` chúng ta đã tìm hiểu ở trên.
- Phần truy vấn cơ cở dữ liệu (FindOne) thì có khác thêm hàm `Decode` ở phía sau. Hàm `Decode` sẽ chuyển dữ liệu query về sang dạng map, giúp việc lấy giá trị băm của password ở phía sau dễ dàng hơn. Ví dụ biến result sau khi FindOne xong sẽ có dạng như thế này.
```go
map[_id:ObjectID("5e7c1f2c0964025facbc0111") email:conglt@gmail.com password:$2a$14$/Ay/2.SOzBESe/0ZvqH.mOKv0n3B9CmvnBiH8uNlWG9HeY7pyQtbK username:conglt]
```
- Tiếp theo là gọi hàm `CheckPasswordHash` để xem password gửi từ client khi băm ra có giống với password được lưu trong db không ?
- Cuối cùng là gọi hàm `jwt.Create` để tạo token, chúng ta cũng không quên việc kiểm tra lỗi có thể xảy ra.

**Test với Postman**
- Đăng nhập thành công
![](https://images.viblo.asia/768892f3-9003-4d1f-9dc5-e013d5f5603b.png)

- Sai mật khẩu
![](https://images.viblo.asia/33ed6e6b-da64-42ff-90c3-253f953a9c66.png)

- Username không tồn tại trong db
![](https://images.viblo.asia/bcc1b92a-187b-466c-85b4-66bedeb6e958.png)


## Tài liệu tham khảo
- [Go-JWT-Postgres-Mysql-Restful-API](https://github.com/victorsteven/Go-JWT-Postgres-Mysql-Restful-API)
- [httprouter](https://godoc.org/github.com/julienschmidt/httprouter)
- [jwt-go](https://godoc.org/github.com/dgrijalva/jwt-go)
- [mongo](https://godoc.org/go.mongodb.org/mongo-driver/mongo)