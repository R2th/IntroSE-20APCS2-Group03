### I. Giới thiệu
- Mình viết bài thường tìm xem viblo đã có chưa, nếu có mình sẽ không viết nữa, nhưng trong series này để các bạn có một cái nhìn tổng quan thì mình sẽ lại viết một bài về authenticate jwt với golang.
- Bài này mình sẽ giới thiệu cho bạn cái base mình tự build cũng ngon lắm à nha :)
### II. Triển khai
Trươc tiên mình sẽ gioi thiệu về cấu trúc folder để cho bạn dễ hình dung trước và mình sẽ trình bày lần lượt từ a->z.
![](https://images.viblo.asia/af9c60bf-168b-49fa-9c08-3c4ede2e3735.png)

Trông kha giống laravel đúng không? :)
* Trước tiên là mình sẽ tạo một helper để custom response
```
package helper

import "strings"

type Response struct {
    Status  bool        `json:"status"`
    Message string      `json:"message"`
    Errors  interface{} `json:"errors"`
    Data    interface{} `json:"data"`
}

type EmptyObj struct{}

func BuildResponse(status bool, message string, data interface{}) Response {
    res := Response{
        Status:  status,
        Message: message,
        Errors:  nil,
        Data:    data,
    }
    return res
}

func BuildErrorResponse(message string, err string, data interface{}) Response {
    splittedError := strings.Split(err, "\n")
    res := Response{
        Status:  false,
        Message: message,
        Errors:  splittedError,
        Data:    data,
    }
    return res
}

```
* Như mọi người đã biết thì mình sẽ run lệnh `go run index.go` để start server vậy xem trong file này chứa gì nhé (mình sử dụng framework [gin](https://github.com/gin-gonic/gin) để thực hiện series này nhé)
```
package main

import (
    "golang_api/routes"
    "gorm.io/gorm"
    "golang_api/config"
)

var (
    db             *gorm.DB                  = config.SetupDatabaseConnection()
)

func main() {
    defer config.CloseDatabaseConnection(db)
    router := routes.InitRouter()
    router.Run()
}

```
Như code thì bạn thấy file này sẽ để gọi router và connect database, 
* Setup database trong config
```
package config

import (
    "fmt"
    "os"

    "github.com/joho/godotenv"
    "golang_api/app/model"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func SetupDatabaseConnection() *gorm.DB {
    errEnv := godotenv.Load()
    if errEnv != nil {
        panic("Failed to load env file")
    }

    dbUser := os.Getenv("DB_USER")
    dbPass := os.Getenv("DB_PASS")
    dbHost := os.Getenv("DB_HOST")
    dbName := os.Getenv("DB_NAME")

    dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?charset=utf8&parseTime=True&loc=Local", dbUser, dbPass, dbHost, dbName)
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("Failed to create a connection to database")
    }
    db.AutoMigrate(&model.Book{}, &model.User{})
    return db
}

func CloseDatabaseConnection(db *gorm.DB) {
    dbSQL, err := db.DB()
    if err != nil {
        panic("Failed to close connection from database")
    }
    dbSQL.Close()
}

```
* Trong folder `routes` bạn tạo thêm một file `index.go` nhé
```
package routes

import (
    "golang_api/app/http/controller"
    "golang_api/app/http/middleware"
    "golang_api/app/service"
    "golang_api/app/repository"
    "github.com/gin-gonic/gin"
    "golang_api/config"
    "gorm.io/gorm"
)

var (
    db             *gorm.DB                  = config.SetupDatabaseConnection()
    userRepository repository.UserRepository = repository.NewUserRepository(db)
    jwtService     service.JWTService        = service.NewJWTService()
    authService    service.AuthService       = service.NewAuthService(userRepository)
    authController controller.AuthController = controller.NewAuthController(authService, jwtService)
)

func InitRouter() *gin.Engine {
    routes := gin.Default()

    authRoutes := routes.Group("api/auth")
    {
        authRoutes.POST("/register", authController.Register)
    }

    return routes
}

```
Ở đây mình tạo ra 2 api đó là `login`, `register` để giành cho việc authenticate. tiếp tục xem `authController sẽ xử lý gì nhé`. Như khởi tạo bạn có thể tháy mình đã sử dụng cả `service`, `repository`... cho nên cùng xem lần lượt các instance này làm gi tiếp nhé
```
package controller

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "golang_api/app/http/request"
    "golang_api/app/model"
    "golang_api/helper"
    "golang_api/app/service"
)

type AuthController interface {
    Register(ctx *gin.Context)
}

type authController struct {
    authService service.AuthService
    jwtService  service.JWTServic
}

func NewAuthController(authService service.AuthService, jwtService service.JWTService) AuthController {
    return &authController{
        authService: authService,
        jwtService:  jwtService,
    }
}

func (c *authController) Register(ctx *gin.Context) {
    var registerRequest request.RegisterRequest
    errRequest := ctx.ShouldBind(&registerRequest)
    if errRequest != nil {
        response := helper.BuildErrorResponse("Failed to process request", errRequest.Error(), helper.EmptyObj{})
        ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
        return
    }
}
```
Như trong `routes` mình đã import thì ở trong controller này mình đã gọi `server`, `repository` vào để sử dụng.
Trước tiên là thực hiện function `Register`, việc đầu tiên là chúng ta phải validate, và mình có tạo một file validate sương sương
```
package request
type RegisterRequest struct {
    Name     string `json:"name" form:"name" binding:"required"`
    Email    string `json:"email" form:"email" binding:"required,email" `
    Password string `json:"password" form:"password" binding:"required"`
}
```
Tiếp theo sau khi pass validate thì vào bước xử lý nhé, ở đây mình có check duplicate mail sau đó thì sẽ tạo tài khoản
```
...
if !c.authService.IsDuplicateEmail(registerRequest.Email) {
    response := helper.BuildErrorResponse("Failed to process request", "Duplicate email", helper.EmptyObj{})
    ctx.JSON(http.StatusConflict, response)
} else {
        createdUser := c.authService.CreateUser(regist erRequest)
    token := c.jwtService.GenerateToken(strconv.FormatUint(createdUser.ID, 10))
    createdUser.Token = token
    response := helper.BuildResponse(true, "OK!", createdUser)
    ctx.JSON(http.StatusCreated, response)
}
```
Hàm để check duplicate mail
```
authService.go
func (service *authService) IsDuplicateEmail(email string) bool {
    res := service.userRepository.IsDuplicateEmail(email)
    return !(res.Error == nil)
}
```
```
userRepository.go
func (db *userConnection) IsDuplicateEmail(email string) (tx *gorm.DB) {
    var user model.User
    return db.connection.Where("email = ?", email).Take(&user)
}
```
Bây gio tiến hành test nhé với cổng mặc định là 8080
Đây là trường hợp không pass validate
![](https://images.viblo.asia/6fbc8d07-b65e-47f2-aa40-3845aa66529e.png)
Và đây là trường hợp pass validate
![](https://images.viblo.asia/0ca99d9a-6600-4540-a6b8-6a569abc5f03.png)
### III. Kết thúc
Do mình viết cũng khá chi tiết cả về code và cả về cấu trúc folder dự án nên cũng tương đối dài, cho nên mình sẽ gianh phần login và crud cho bài viết lần sau.