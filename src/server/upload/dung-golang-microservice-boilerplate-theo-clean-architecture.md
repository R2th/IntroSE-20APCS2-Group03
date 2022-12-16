## Chuyện về việc học

Như các bạn đã biết, mình trước giờ chủ yếu code **đột NÉT**, nhưng lại có thêm vài mối tình ngoài em nó, chẳng hạn PHP, Nodejs... Rồi tình cờ mình nghe tới Golang. Xuất thế vào Obama đệ nhất nguyên niên (2009), là con út của gia tộc Google. Golang sở hữu nhiều thiên tư kinh hãi thế tục. Chẳng hạn như performance nhanh đến thần sầu, memory footprint chấp Nodejs 3 lần, quản lý bất đồng bộ xuất sắc với Goroutine, bên cạnh đó Go cũng rất dễ học và rất dễ tiếp cận.

Một ngày đẹp trời nọ mình học xong 1 course cơ bản về Go trên udemy, rồi cũng nghiên cứu cách để áp dụng vào thực tế, dựng luôn 1 app sử dụng em nó, tuy nhiên mình vẫn luôn đau đầu với việc suy nghĩ nên áp dụng cấu trúc nào để dễ bề code, maintain, tránh việc bị kẻ maintain chửi như làng Vũ Đại. Dĩ nhiên mình không thể bê tư duy MVC cũng như nhiều thứ từ dotNET qua Go được.

![udemy-golang-certificate.jpg](https://images.viblo.asia/8a6dc4b7-db30-47a5-bbfa-4e9eefdc8665.jpg)

Mình không nghĩ sẽ áp dụng cấu trúc MVC như trong bài viết [Tạo REST API với Nodejs và Typescript](https://viblo.asia/p/tao-rest-api-tren-nodejs-voi-express-va-prisma-su-dung-typescript-naQZRPnj5vx), vì Golang thường thường sẽ có thể phải áp dụng cả gRPC để giao tiếp giữa các service với nhau, rồi REST để giao tiếp với client, nếu áp gRPC song song REST, vậy mình sẽ sắp xếp cấu trúc Controller như thế nào ? Để business logic ở tầng nào mới được ?

## Clean Architecture

Gần đây mình có bật trạng thái open to work trên Linkedin, và mình cũng có mong muốn là công việc mới sẽ được dùng Go. Thế là thầy của mình có comment rằng nếu làm Go thì em nghiên cứu clean architecture nhé, nó sinh ra là dành cho Go.
Okay, thế mình bắt tay vào nghiên cứu clean architect luôn mà tạm thời gác lại những mặt hàng Hexagonal Architecture, Onion Architecture...

#### Sơ bộ về Clean architecture

Clean architecture là 1 triết lý (philosophy) trong thiết kế phần mềm được Robert C. Martin phát minh và đăng tải trên blog của ổng, blog [Uncle Bob](http://cleancoder.com/products). Ông có viết luôn 1 cuốn sách về Clean Architecture, tuy nhiên trong bài viết này chỉ giới hạn những thứ mình tìm hiểu được trong thời gian vừa qua, còn cả 1 bầu trời kiến thức về em nó nữa mà cần chúng ta tìm hiểu tiếp.

Clean architecture được phát triển từ clean code, mà clean code lại follow **SOLID** principles, chắc hẳn các bạn đã nghe qua:

- **S**ingle responsibility principle
- **O**pen/closed principle
- **L**iskov substitution principle
- **I**nterface segregation principle
- **D**ependency inversion principle

Clean architect:
![Clean Architecture Diagram](https://images.viblo.asia/e0efec15-9d2c-4ec5-a0ab-0f42c3167b8a.jpg)

Dựa vào hình trên chúng ta có thể thấy mô hình này được chia làm 4 layer chính (không bắt buộc chỉ có 4):

- Entities layer
- Use cases layer
- Interface Adapters layer
- Frameworks & Drivers layers

Theo thứ tự từ trong ra ngoài, tầng càng ở phía trong thì càng ít thay đổi và không bị phụ thuộc vào layer phía ngoài và ngược lại. Các layer bên ngoài dễ sửa đổi hơn và sẽ phụ thuộc vào các layer bên trong.

## Triển khai clean architect với Golang

Bắt đầu triển khai 1 microsevice dùng để tạo các Todo item cho người dùng, hỗ trợ xác thực bằng JWT token.

Sử dụng các công nghệ sau:

- Echo framework
- Postgresql + GORM
- Testify cho unit testing
- Logrus để log, UUID...
- Docker để build và support integration tests

Project structure:

![folder structure clean arch](https://images.viblo.asia/638f00e0-491c-46c2-89a0-17ec72ae7ed3.png)

Ở đây các tầng như Entities, Usecases, Interface Adapter đều phụ thuộc vào domain chính là Entities, nên mình chia ra thành các module theo Entity là Auth và Todos, nằm trong folder internal.

Thêm vào đó, những component như Usecase, Handler, Repository không tạo mỗi struct, mà nên implement theo Interface (D trong SOLID).

### Entities Layer

internal/auth/models/user.go:

```go
package models

import "golang.org/x/crypto/bcrypt"

type User struct {
	Id       string `gorm:"primary_key"`
	Username string
	Password string
	Limit    int
}

func (u *User) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *User) ComparePassword(password string) bool {
	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password)); err != nil {
		return false
	}
	return true
}

```

internal/todos/models/todo.go:

```go
package models

import "time"

type Todo struct {
	Id        string `gorm:"primary_key"`
	Content   string
	CreatedAt time.Time
	CreatedBy string
	User      User `gorm:"foreignKey:CreatedBy"`
}

```

Tầng entity chứa các enterprise logic nhất và ít thay đổi nhất, chẳng hạn như logic mã hoá password trong model user.

### Usecases layer

auth/usecase.go

```go
package auth

import (
	"context"
	"kienmatu/go-todos/internal/models"
)

type UseCase interface {
	SignUp(ctx context.Context, username, password string, limit int) (*models.User, error)
	SignIn(ctx context.Context, username, password string) (string, error)
	ParseToken(ctx context.Context, accessToken string) (string, error)
}

```

Implement trong internal/auth/usecase/usecase.go:

```go
package usecase

import (
	"context"
	"fmt"
	"strings"
	"time"

	"kienmatu/go-todos/internal/auth"
	"kienmatu/go-todos/internal/models"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

type AuthClaims struct {
	jwt.StandardClaims
	Username string `json:"username"`
	UserId   string `json:"userId"`
}

type authUseCase struct {
	userRepo       auth.UserRepository
	hashSalt       string
	signingKey     []byte
	expireDuration time.Duration
}

func NewAuthUseCase(
	userRepo auth.UserRepository,
	hashSalt string,
	signingKey []byte,
	tokenTTL int64) auth.UseCase {
	return &authUseCase{
		userRepo:       userRepo,
		hashSalt:       hashSalt,
		signingKey:     signingKey,
		expireDuration: time.Second * time.Duration(tokenTTL),
	}
}

func (a *authUseCase) SignUp(ctx context.Context, username, password string, limit int) (*models.User, error) {
	fmtusername := strings.ToLower(username)
	euser, _ := a.userRepo.GetUserByUsername(ctx, fmtusername)

	if euser != nil {
		return nil, auth.ErrUserExisted
	}
	user := &models.User{
		Id:       uuid.New().String(),
		Username: fmtusername,
		Password: password,
		Limit:    limit,
	}
	user.HashPassword()
	err := a.userRepo.CreateUser(ctx, user)
	if err != nil {
		return nil, err
	}
	return a.userRepo.GetUserByUsername(ctx, username)
}

func (a *authUseCase) SignIn(ctx context.Context, username, password string) (string, error) {
	user, _ := a.userRepo.GetUserByUsername(ctx, username)
	if user == nil {
		return "", auth.ErrUserNotFound
	}

	if !user.ComparePassword(password) {
		return "", auth.ErrWrongPassword
	}

	claims := AuthClaims{
		Username: user.Username,
		UserId:   user.Id,
		StandardClaims: jwt.StandardClaims{
			IssuedAt:  time.Now().Unix(),
			Issuer:    "go-todos",
			ExpiresAt: time.Now().Add(a.expireDuration).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(a.signingKey)
}

func (a *authUseCase) ParseToken(ctx context.Context, accessToken string) (string, error) {
	token, err := jwt.ParseWithClaims(accessToken, &AuthClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return a.signingKey, nil
	})

	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(*AuthClaims); ok && token.Valid {
		return claims.UserId, nil
	}

	return "", auth.ErrInvalidAccessToken
}

```

Ở đây ta thấy được lợi thế của Dependency Inversion trong SOLID. Chúng ta có thể implement 1 usecase khác, sử dụng repository khác tuy nhiên vẫn implement usecase interface và không thay đổi logic chính của app.

- **<span style="color:#ffc107">Note</span>**:
  Khi mình chuyển từ ngôn ngữ khác qua Go, mình đã tìm hiểu về naming convention standard làm sao cho không bị conflict giữa interface và struct, mình có thử theo cách thêm prefix I vào trước interface như C#, tuy nhiên trong Go làm như vậy hơi lạ lạ, khi chúng ta muốn gọi Interface thì phải gõ chữ I, và editor sẽ suggest hàng tá interface. Nên mình áp dụng 1 cách khác, tên của Interface và struct implement nó sẽ trùng nhau, tuy nhiên struct đó sẽ không được export ra ngoài (Non-Capitalized).
  - Old way:
    - `type IUseCase interface`
    - `type UseCase struct`
  - New way:
    - `type UseCase interface`
    - `type useCase struct`

### Interface Adapters layer

Như diagram phía trên, app của chúng ta sẽ có handler tương tự như controller để expose api.

cmd/api/main.go:

```go
package main

import (
	"log"

	"kienmatu/go-todos/config"
	"kienmatu/go-todos/db"
	"kienmatu/go-todos/internal/server"

	"github.com/sirupsen/logrus"
)

func main() {

	log.Println("Starting api server")
	// Initialize config
	cfg := config.NewConfig()
	db := db.GetPostgresInstance(cfg, true)
	s := server.NewServer(cfg, db, logrus.New(), nil)
	if err := s.Run(); err != nil {
		log.Fatal(err)
	}

}
```

config/config.go:

```go
package main

import (
	"log"

	"kienmatu/go-todos/config"
	"kienmatu/go-todos/db"
	"kienmatu/go-todos/internal/server"

	"github.com/sirupsen/logrus"
)

func main() {

	log.Println("Starting api server")
	// Initialize config
	cfg := config.NewConfig()
	db := db.GetPostgresInstance(cfg, true)
	s := server.NewServer(cfg, db, logrus.New(), nil)
	if err := s.Run(); err != nil {
		log.Fatal(err)
	}

}

```

Ngoài ra thì tầng này còn có phức tạp hơn: `handler`, `middleware` (bao gồm middleware cho từng module, middle dùng chung cho tất cả...) và `presenter`.

**Handler** nằm trong folder `delivery/http` chịu trách nhiệm xử lý HTTP request sử dụng Usecase để xử lý logic business. Okay quay trở lại vấn đề ban đầu, bây giờ nếu mình muốn sử dụng thêm gRPC để giao tiếp giữa các service, mình chỉ cần thêm component vào `delivery/grpc`

**Presenter** Ở đây sẽ chịu trách nhiệm cho việc dữ liệu được hiển thị ra ngoài từ response của handler, chẳng hạn như response của việc login/register sẽ không thể nào show ra password được, do đó ở `presenter` của module `auth`:

```go
package presenter

type SignUpInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Limit    int    `json:"limit"`
}

type SignUpResponse struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Limit    int    `json:"limit"`
}

```

### Frameworks & DBs Layer

Theo bác Bob quý mến, thì layer này chính là layer ngoài cùng, và mọi chi tiết của app đều nằm tại đây:
Chúng ta có interface Repository và struct repository sử dụng em nó.

Ví dụ như UserRepository:

```go
package auth

import (
	"context"
	"kienmatu/go-todos/internal/models"
)

const CtxUserKey = "userId"

type UserRepository interface {
	CreateUser(ctx context.Context, user *models.User) error
	GetUserByUsername(ctx context.Context, username string) (*models.User, error)
	GetUserById(ctx context.Context, userId string) (*models.User, error)
}
```

Về phần framework, chúng ta sử dụng echo framework, là 1 framework được sử dụng phổ biến trong cộng đồng Go. Có 1 vài component được chia ra để dễ bề quản lý hơn như `middleware manager`, `routes`, `server`, `handler` (handler này để gom các handler và route lại cho server)...

Trong server:

```go
package server

import (
	"context"
	"kienmatu/go-todos/config"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type Server struct {
	echo   *echo.Echo
	cfg    *config.Configuration
	db     *gorm.DB
	logger *logrus.Logger
	ready  chan bool
}

func NewServer(cfg *config.Configuration, db *gorm.DB, logger *logrus.Logger, ready chan bool) *Server {
	return &Server{echo: echo.New(), cfg: cfg, db: db, logger: logger, ready: ready}
}

func (s *Server) Run() error {
	server := &http.Server{
		Addr:         ":" + s.cfg.Port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	go func() {
		s.logger.Logf(logrus.InfoLevel, "Server is listening on PORT: %s", s.cfg.Port)
		if err := s.echo.StartServer(server); err != nil {
			s.logger.Fatalln("Error starting Server: ", err)
		}
	}()

	if err := s.MapHandlers(s.echo); err != nil {
		return err
	}

	if s.ready != nil {
		s.ready <- true
	}

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	<-quit

	ctx, shutdown := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdown()

	s.logger.Fatalln("Server Exited Properly")
	return s.echo.Server.Shutdown(ctx)
}

```

## Tổng kết

Các bạn có thể vào repo của mình [Golang todo clean architecture](https://github.com/kienmatu/togo) và đọc readme để xem hướng dẫn chạy thử và xem.

Yeah mục đích cuối cùng của việc áp dụng các design principle cũng là hỗ trợ việc code và maintain thuận lợi hơn, các bạn có thể custom lại cho phù hợp nhất với dự án. Cấu trúc này hoàn toàn có thể áp dụng sang cho các ngôn ngữ lập trình và framework khác chứ không bị gói gọn trong Go.

Code của mình được tham khảo dựa trên [repo này](https://github.com/AleksK1NG/Go-Clean-Architecture-REST-API), đa tạ tác giả ❤️❤️

Bài viết gốc [ở đây (devgiangho.github.io)](https://devgiangho.github.io/dung-golang-microservice-boilerplate-theo-clean-architecture)