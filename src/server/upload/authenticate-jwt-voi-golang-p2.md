Tiếp nối [phần 1](https://viblo.asia/p/authenticate-jwt-voi-golang-p1-63vKj1Ld52R), phần này mình sẽ trình bày tiếp các function như login và get/post thông tin user đang đăng nhập.
### I. Login
Trong file `routes/index.go` bạn thêm đoạn này để mapping routes với `AuthController` nhé.
```
...
authRoutes := routes.Group("api/auth")
    {
        authRoutes.POST("/login", authController.Login)
    }
...
```

Sau khi đã thêm routes `login` thì bạn hãy thêm hàm xử lý vào authcontroller nhé
```
func (c *authController) Login(ctx *gin.Context) {
    var loginRequest request.LoginRequest
    errRequest := ctx.ShouldBind(&loginRequest)
    if errRequest != nil {
        response := helper.BuildErrorResponse("Failed to process request", errRequest.Error(), helper.EmptyObj{})
        ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
        return
    }
    authResult := c.authService.VerifyCredential(loginRequest.Email, loginRequest.Password)
    if v, ok := authResult.(model.User); ok {
        generatedToken := c.jwtService.GenerateToken(strconv.FormatUint(v.ID, 10))
        v.Token = generatedToken
        response := helper.BuildResponse(true, "OK!", v)
        ctx.JSON(http.StatusOK, response)
        return
    }
    response := helper.BuildErrorResponse("Please check again your credential", "Invalid Credential", helper.EmptyObj{})
    ctx.AbortWithStatusJSON(http.StatusUnauthorized, response)
}
``` 
luồng xử lý về cơ bản vẫn là check request, sau đó sẽ kiểm tra đăng nhập nếu đúng thì trả về token, nếu sai sẽ trả ra lỗi `401`, mình sẽ xem qua hàm generate token nhé còn phần check đăng nhập thì chỉ đơn gỉan là so sành trong database thôi. Mình sử dụng [jwt-go](https://github.com/dgrijalva/jwt-go)
```

func (j *jwtService) GenerateToken(UserID string) string {
    claims := &jwtCustomClaim{
        UserID,
        jwt.StandardClaims{
            ExpiresAt: time.Now().AddDate(1, 0, 0).Unix(),
            Issuer:    j.issuer,
            IssuedAt:  time.Now().Unix(),
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    t, err := token.SignedString([]byte(j.secretKey))
    if err != nil {
        panic(err)
    }
    return t
}
```
Check valiate trước nhé
![](https://images.viblo.asia/6c6ac8ac-91d3-4daa-93bf-def30c692d3f.png)
Nếu nhập sai response sẽ trả về message la `Invalid Credential`
![](https://images.viblo.asia/e424a113-7e4b-42b3-9bcd-2e9e053f9867.png)
Và cuối cùng là case nhập đúng, đương nhiên bình thường sẽ có nhiều case hơn như, chưa active email bla bla các thứ, nhưng trong khuôn khổ về gioi thiệu các chức năng cơ bản thì mình làm các case thế này thôi.
![](https://images.viblo.asia/3d86945b-7289-480c-9973-5f94abde81e3.png)
Sau khi login xong thì theo lẽ thường sẽ lưu token nhận được vào cookie, localstorage... và sau đó mang token này đi muôn nơi, và phần tiếp theo sẽ là viết middleware check authenticate để sử dụng được các api bắt buộc phải authenticate trước nhé.
### II. Authenticated
Trong folder `app/http` bạn tạo môt  một folder middleware có chứa file `jwt.auth-.go`
```
package middleware

import (
    "log"
    "net/http"

    "github.com/dgrijalva/jwt-go"
    "github.com/gin-gonic/gin"
    "golang_api/helper"
    "golang_api/app/service"
)

func AuthorizeJWT(jwtService service.JWTService) gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            response := helper.BuildErrorResponse("Failed to process request", "No token found", nil)
            c.AbortWithStatusJSON(http.StatusBadRequest, response)
            return
        }
        token, err := jwtService.ValidateToken(authHeader)
        if token.Valid {
            claims := token.Claims.(jwt.MapClaims)
            log.Println("Claim[user_id]: ", claims["user_id"])
            log.Println("Claim[issuer] :", claims["issuer"])
        } else {
            log.Println(err)
            response := helper.BuildErrorResponse("Token is not valid", err.Error(), nil)
            c.AbortWithStatusJSON(http.StatusUnauthorized, response)
        }
    }
}
```
`jwtService.Validate` đoạn náy sẽ check tính đúng đắn của token gửi lên bằng cách parse chuỗi token để kiểm tra
```
func (j *jwtService) ValidateToken(token string) (*jwt.Token, error) {
    return jwt.Parse(token, func(t_ *jwt.Token) (interface{}, error) {
        if _, ok := t_.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("Unexpected signing method %v", t_.Header["alg"])
        }
        return []byte(j.secretKey), nil
    })
}
```
Nếu đúng sẽ cho request đến api, nếu sai hoặc không truyền lên đương nhiên sẽ báo lỗi, bây gio mình sẽ thêm phần `routes` của user vào nhé.
```
 var (
     ...
      userRepository repository.UserRepository = repository.NewUserRepository(db)
      userService    service.UserService       = service.NewUserService(userRepository)
      userController controller.UserController = controller.NewUserController(userService, jwtService)
     ...
 )
 func InitRouter() *gin.Engine {
     ...
     userRoutes := routes.Group("api/user", middleware.AuthorizeJWT(jwtService))
    {
        userRoutes.GET("/profile", userController.Profile)
        userRoutes.PUT("/profile", userController.Update)
    }
 }
```
Mình sẽ thêm 2 routes để get và cập nhật lại thông tin user như trên. Dưới đây là hàm xử lý để get user
```
// Controller
func (c *userController) Profile(context *gin.Context) {
    authHeader := context.GetHeader("Authorization")
    token, err := c.jwtService.ValidateToken(authHeader)
    if err != nil {
        panic(err.Error())
    }
    claims := token.Claims.(jwt.MapClaims)
    id := fmt.Sprintf("%v", claims["user_id"])
    user := c.userService.Profile(id)
    res := helper.BuildResponse(true, "OK", user)
    context.JSON(http.StatusOK, res)
}
```
Sau khi đã pass qua middleware check authenticate thì bạn sẽ vào được controller, ở trong chuỗi token gửi lên từ client sẽ có key `user_id` sau khi parse qua jwt (được mapping với table `users`). Từ `user_id` mình có thể lấy được thông tin user đang đăng nhập.
![](https://images.viblo.asia/31340cd2-26b6-47f3-9ad0-cd5558e77771.png)
Sau khi đăng nhập thành công bạn sẽ xử dụng token để connect api (api có yêu cầu authenticate) với key là `Authorization`, trong phần lớn trường hợp thì value có thêm `Bearer "token"`, nhưng package này không cần điền thêm `Bearer `
### III. Kết thúc
Về cơ bản mọi thứ connect api chỉ đơn giản là vậy, ở phần sau mình sẽ hướng dẫn connect đến các ứng dụng bên thứ 3 như `Office 365`, `G-suite`, `Zoom`... và bài sau sẽ là về office365 nhé, như là tạo calendar, add thêm meeting vào calendar (sử dụng skype).