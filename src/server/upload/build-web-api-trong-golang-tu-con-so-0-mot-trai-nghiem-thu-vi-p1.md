## Mở đầu

![](https://images.viblo.asia/c7d228ad-a700-466d-934d-457027771883.png)

Chào các bạn :D hôm nay là ngày cuối tuần, thời tiết khá đẹp trời cũng là lúc mình ngồi tổng hợp lại các kiến thức của bản thân tuần vừa rồi và viết lên đây để chia sẻ và tiếp nhận ý kiến của mọi người.
Bài viết này mình sẽ note lại cách mà mình tiếp cận và xây dựng 1 ứng dụng web API trong Golang. 

<b>Lưu ý :</b>  Là bài viết này dành cho những ai đã nắm được qua syntax của Golang và nắm được cách serve go web rồi nha, vì nó là 1 cái gì đó khá mơ hồ mình không biết các ngôn ngữ khác khi chuyển qua Go thế nào nhưng bản thân mình là 1 PHP dev 3 đời code Laravel, lúc chuyển qua học syntax của Go cũng khá là "đau mắt" và "đau não" =)))

Ok, bài toán của chúng ta là dựng 1 Crud API server dùng golang, trong bài viết này mình sử dụng 1 model làm example tên là <b>Adward</b> model này sẽ dùng để lưu trữ các thông tin về top reports trong nội bộ hàng tháng nó sẽ có các property như Author, Link, Time, Rank. Cơ bản là như vậy thôi vì mình cũng mới tiếp cận với Go nên cũng chưa cần phức tạp quá về bussiness làm gì. Còn giờ thì chúng ta bắt đầu vào nội dung chính nhé

## Structure folder

Câu chuyện sẽ có gì đáng nói khi chúng ta chỉ cần 1 file main.go và sau khi học xong syntax của nó chúng ta sẽ thực hành ngay trên đó. Hmm..m nhưng mà bây giờ mình muốn dựng hẳn nó thành 1 web api thì sao nhỉ ? Lúc mình dev dùng Laravel PHP thì nó đã tạo sẵn `structure folder` cho mình rồi, việc của mình chỉ cần làm quen nó và nhảy vào code thôi. :joy:

Với Go thì sao, lại trở về với cái cảnh tự mình dựng lên 1 structure folder mình cũng lên mạng nghiên cứu một hồi thì phát hiện ra structure thằng Go khá đa dạng, cũng đúng vì Go Lang nó là một ngôn ngữ khá là tùy biến thế rồi mình quyết định dựng nó như cách mà Laravel đã làm :D 

Kết quả là được như sau 

```sh
├── controllers
│   └── adward-controller.go
├── models
│   └── adward.go
├── routes
│   └── api.go
├── server.go
├── services
│   └── adward-service.go
├── storage
│   └── logs
│       └── logs.json
└── util
    ├── env.go
├── go.mod
├── go.sum
├── LICENSE
├── README.md
```

Vì cái bài toán của mình cũng không phải to tát gì nên mình cũng chỉ dựng gọn gọn như vậy, đọc qua thì cũng khá dễ hiểu chắc mình không cần giải thích thêm nhỉ :D, theo mình biết thì khi với các hệ thống to đoành thì mọi người suggest sử dụng structure như này : https://github.com/golang-standards/project-layout 
Biết đâu đấy trong tương lai quá trình mình refactor thì mình cũng sẽ lái sang layout đấy thì sao :laughing:

## Models

Trong Go Lang theo mình được biết không có class, nên trường hợp này mình đã dựng model Adward dưới dạng là 1 structure trông nó sẽ kiểu như

```go
// models/adward.go
package models

type Adward struct {
	Author string `json:"author"`
	Rank   int    `json:"rank"`
	Link   string `json:"link"`
	Time   string `json:"time"`
}
```

Ok và như vậy một struct Adward đã được định nghĩa, đáng nói là các bạn có để ý tới cái này không:
```go
`json:"xxxxx"`
```
Làm việc với JSON để nó map với cái struct này trong Go cũng khá phức tạp, 
ở trên có thể các bạn cũng thấy các property trong struct Adward của mình đang <b>Viết hoa</b> thể hiện rằng nó là một <b>public</b> property
và khi viết thường thì sẽ là <b>Private</b> property. Điều này khá ảnh hưởng tới JSON parsing. Do vậy mình cần sử dụng 1 khái niệm đó là
<b>Struct Tags</b> để mình định nghĩa là thằng Property này sẽ map sang thằng property nào trong JSON ( nó không chỉ có nhiệm vụ map sang thôi đâu nhé, xử lý JSON trong go còn có vài cái khác thú vị hơn đó mình sẽ đề cập vào các bài viết sau nha :D )

## Services

Việc dựng models đã xong, giờ chúng ta tới services, có 1 điều các bạn cần chú ý trong cái bài của mình lần này đó là mình đang không sử dụng DB (MySQL hay Mongodb ) gì đó nha, mình sẽ lợi dụng con trỏ trong Go Lang để test cái API này của mình trước khi mình từng bước tích hợp DB vào =)))

```go
// services/adward-service.go
package services

import (
	"github.com/AvengersCodeLovers/report-adwards/models"
)

type AdwardService interface {
	Save(models.Adward) models.Adward
	All() []models.Adward
}

type adwardService struct {
	adwards []models.Adward
}

func New() AdwardService {
	return &adwardService{}
}

func (service *adwardService) Save(adward models.Adward) models.Adward {
	service.adwards = append(service.adwards, adward)

	return adward
}

func (service *adwardService) All() []models.Adward {
	if service.adwards != nil {
		return service.adwards
	}

	return make([]models.Adward, 0)
}
```

À tiện mình show luôn cái file `go.mod` của con này
```go
module github.com/AvengersCodeLovers/report-adwards

go 1.16

require (
	github.com/gin-gonic/gin v1.7.1 // indirect
	github.com/google/uuid v1.2.0 // indirect
	github.com/joho/godotenv v1.3.0 // indirect
	github.com/pborman/uuid v1.2.1 // indirect
	github.com/sirupsen/logrus v1.8.1 // indirect
	golang.org/x/sys v0.0.0-20210503173754-0981d6026fa6 // indirect
)
```
Ở đây con app của mình có tên module là `github.com/AvengersCodeLovers/report-adwards` 
nên khi mình import các pkg trong project thì mình chỉ cần import `moduleName/pkgName`

Ex: `github.com/AvengersCodeLovers/report-adwards/models`

Quay trở lại với cái AdwardService nhé
thì mình sẽ cần dựng lên 1 cái interface AdwardService và có define ra  2 method liên quan tới service này là
- <b>All()</b> : Method này có kiểu trả về là 1 slice Adward
- <b>Save(models.Adward)</b> : Method này nhận đầu vào là 1 Adward và trả về 1 Adward

Ở phần này mình sẽ chỉ demo qua 2 method là GET với POST thôi nhé
Ok và sau đó là mình define struct Adward Service lúc này nó sẽ tự implement theo cái tên 'AdwardService' Interface
Logic bên trong cũng không có gì phức tạp đúng không mọi người, đáng chú ý chỉ là method <b>New</b> mình đang return về con trỏ thể hiện của AdwardService như mình đã nói ở trên.

## Controllers

Model với Service đã xong giờ mình sẽ dựng controller nha, với Controller sẽ mang đúng nghĩa là điều hướng và trong cái app này mình đang dùng thằng https://github.com/gin-gonic/gin Framework của GO và dùng http router của nó

```go
// controllers/adward-controller.go
package controllers

import (
	"net/http"

	"github.com/AvengersCodeLovers/report-adwards/models"
	"github.com/AvengersCodeLovers/report-adwards/services"
	"github.com/gin-gonic/gin"
)

type AdwardController interface {
	Index(ctx *gin.Context)
	Store(ctx *gin.Context)
}

type controller struct {
	service services.AdwardService
}

func New(service services.AdwardService) AdwardController {
	return &controller{
		service: service,
	}
}

func (c *controller) Index(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, c.service.All())
}

func (c *controller) Store(ctx *gin.Context) {
	var adward models.Adward
	ctx.ShouldBindJSON(&adward)
	c.service.Save(adward)
	ctx.JSON(http.StatusCreated, adward)
}
```

Cơ bản trong AdwardController cũng sẽ định nghĩa ra Interface gồm 2 method là <b>Index</b> và <b>Store</b> đều nhận input là context request từ <b>Routes</b>
Và lúc khởi tạo thằng AdwardController thì mình cũng có 1 đầu vào là AdwardService
```go
func New(service services.AdwardService) AdwardController {
	return &controller{
		service: service,
	}
}
```

Với function <b>Store</b> thì chúng ta cần Bind body JSON vào struct Adward với đoạn
```go
ctx.ShouldBindJSON(&adward)
```

Các bạn lưu ý là dùng <b>&</b> để biến adward của chúng ta nhận giá trị nhé
Save xong thì chúng ta response về JSON với response là adward vừa tạo

## Routes
Ok tới bước này thì chúng ta cũng hoàn thiện sơ bộ rồi, Models Services Controllers giờ dựng Routes lên là sẽ có ngay 1 Web API thôi

```go
// routes/api.go
package routes

import (
	"github.com/gin-gonic/gin"
	controllers "github.com/AvengersCodeLovers/report-adwards/controllers"
	services "github.com/AvengersCodeLovers/report-adwards/services"
)

var (
	adwardService    services.AdwardService       = services.New()
	adwardController controllers.AdwardController = controllers.New(adwardService)
)

func SetupRouter() *gin.Engine {
	routes := gin.Default()
	v1 := routes.Group("/api/v1")
	{
		v1.GET("adward", adwardController.All)
		v1.POST("adward", adwardController.Save)
		v1.GET("/healthcheck", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{
				"message": "OK",
			})
		})
	}

	return routes
}
```

Ở đây mình viết 1 Public function là <b>SetupRouter</b> sau đó ra ngoài main mình sẽ gọi, Ở phiên bản thô sơ các bạn cũng có thể thấy
file routes không quá phức tạp và đây là kết quả khi chúng ta test thử 

POST : /api/v1/adward ( ở đây mình post 2 lần lên nhé ) 
![image](https://user-images.githubusercontent.com/55786352/117409914-f1d2fe00-af3b-11eb-954a-6cc651f0599b.png)

![image](https://user-images.githubusercontent.com/55786352/117410018-1202bd00-af3c-11eb-905d-2cb51458d6d2.png)

Chúng ta cùng thử GET xem sao
GET : /api/v1/adward
![image](https://user-images.githubusercontent.com/55786352/117410135-39598a00-af3c-11eb-9f1e-d08c237506a8.png)

Và chúng ta cũng đã thấy cái slice Adwards của mình đang có 2 phần tử ở đây, đó là bởi vì nó đang được save vào cùng 1 vùng nhớ khi mình sử dụng con trỏ xuyên suốt quá trình running app ( đương nhiên down và up lại thì cũng mất, với các bài tiếp theo mình sẽ refactor và ném cái DB vào con này :D ) 

Quên mất hãy xem file <b>server.go</b> của chúng ta có gì

```go
package main

import (
	routes "github.com/AvengersCodeLovers/report-adwards/routes"
)

func main() {
	server := routes.SetupRouter()

	server.Run(":8888")
}
```

Run thử command
```sh
go run .
```
Và test thử như trên xem sao nhé :D

## Load environment như thế nào?

Trong Go mình có tìm hiểu được 1 package khá hay đó là
github.com/joho/godotenv và mình đã dùng nó để tiến hành load các biến env ở trong các file .env

Mình dựng 1 thư mục <b>util</b> và chứa file <b>env.go</b>

```go
// util/env.go
package util

import (
	"os"

	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
)

func GetEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value != "" {
		return value
	}

	return defaultValue
}

func LoadEnvVars() {
	env := GetEnv("APP_ENV", "debug")

	filename := ".env." + env

	if _, err := os.Stat(filename); os.IsNotExist(err) {
		filename = ".env"
	}

	err := godotenv.Load(filename)
	if err != nil {
		log.Warn(".env file not loaded")
	}
}
```

Với concept load config ở bên Laravel thì mình viết ra 2 function
- <b>GetEnv(key, defaultValue)</b> : Nhận vào là key environment và giá trị mặc định nếu không tìm thấy và trả về giá trị của key
- <b>LoadEnvVars()</b> : Ở đây các bạn có thể thấy là mình đang load các biến env theo môi trường dựa vào key APP_ENV và filename .env.[environment]

Giờ file <b>server.go</b> của chúng ta có gì
```go
package main

import (
	"github.com/AvengersCodeLovers/report-adwards/util"

	routes "github.com/AvengersCodeLovers/report-adwards/routes"
)

func main() {
	util.LoadEnvVars()
	server := routes.SetupRouter()

	server.Run(":" + util.GetEnv("APP_PORT", "8888"))
}
```

## Lời kết
Và mình đã giới thiệu xong các mục mà mình muốn chia sẻ ở trong P1 cũng như các luồng hoạt động của ứng dụng, vào P2 chắc mình sẽ đề cập tới việc đặt Middleware cũng như các cách mà chúng ta có thể ghi logs sao cho "chuyên nghiệp" :laughing::laughing::laughing: 
2 phần đó trên repo mình cũng đã code xong rồi các bạn có thể tìm hiểu source tại đây : https://github.com/AvengersCodeLovers/report-adwards ( branch develop ) 

Mình cũng chỉ mới tìm hiểu Go Lang thôi nên trong quá trình bài viết của mình về series này có chỗ nào mình đang hiểu sai các bạn có thể để lại góp ý tại post này :D