# Giới thiệu
Xin chào mọi người, hôm nay mình xin giới thiệu cách xây dựng một ứng dụng web đơn giản back-end sử dụng Gin là framework của Golang và front-end sử dụng VueJS
# Giới thiệu Golang
Go hay còn gọi là Golang là một ngôn ngữ lập trình được thiết kế dựa trên tư duy lập trình hệ thống. Go được phát triển bởi Robert Griesemer, Rob Pike và Ken Thompson tại Google vào năm 2007. Điểm mạnh của Go là bộ thu gom rác và hỗ trợ lập trình đồng thời (tương tự như đa luồng – multithreading). Go là một ngôn ngữ biên dịch như C/C++, Java, Pascal… Go được giới thiệu vào năm 2009 và được sử dụng hầu hết trong các sản phẩm của Google.
# Giới thiệu về Gin
Gin là một framework web được viết bởi Go (Golang). Gin cung cấp các API đơn gian để có thể tạo ra một back-end server mạnh mẽ với hiệu suất cao. So với Martini (một framework cũ trước đó) thì Gin đem lại hiệu hơn tới 40 lần. Trong phần sau mình sẽ giới thiệu chi tiết cách để tạo back-end server với Gin
# Giới thiệu VueJS
là một progressive framework dùng để xây dựng giao diện người dùng ( UI ). Không giống các monolithic framework. Core của Vue chỉ tập trung vào lớp view mà và nó rất dễ để làm quen hay tích hợp với các thư viện hoặc các project có sẵn.Hơn nữa, Vue lại chứa đựng một sức mạnh rất lớn trong việc xây dựng Single-Page Applications khi được kết hợp với công cụ build và các thư viện/component được xây dựng bởi cộng đồng.
# Coding
## Setup project
Ta tạo mới project có cấu trúc thư mục như sau:
```
*. app
  ** source
    *** app.js
 **index.html
*cmd
    **main.go
*collector
    **collector.go
*server
    **server.go
```
Thư mục app chứa các file xử lý phía front end,  thư mục collector giúp thu thập data,  thư mục cmd chứa file main và các config để run server,  thư mục server chứa những gì liên quan đến việc run server.
##  Server Gin
Trong file main.go chúng ta import các thư viện mặc định của go và `"github.com/Gin/interate-with-vue/server"` là một package được tạo trong `/src/github.com/Gin/interate-with-vue/server` để xử lý các API.
Trong function main chúng ta khởi tạo một instance server là NewServer() trong package.

```
package main

import (
  "log"

  "github.com/Gin/interate-with-vue/server"
)

func main() {
  log.SetFlags(log.LstdFlags | log.Lshortfile)

  server := server.NewServer()
  server.Run()
}
```
Tại hàm Run() của biến server, ta thực hiện 3 việc
 -  Trỏ đến thử mục chưa các file front-end
 -  Định nghĩa ra các API router bằng gin.Engine.
 -  Sửa dụng function Run() của gin.Engine để server listen tại cổng mà ta mong muốn (trong ứng dụng này tôi chọn cổng 8001)
Dưới đây là mô tả của package server.
```
// /src/github.com/Gin/interate-with-vue/server
package server

import (
  "time"
  "net/http"

  "github.com/Gin/interate-with-vue/collector"
  "github.com/gin-gonic/gin"
  "github.com/gin-contrib/cors"
  "github.com/gin-contrib/static"
)

type Server struct {
  r         *gin.Engine
  collector *collector.Collector
}

func NewServer() *Server {
  r := gin.Default()

  corsConfig := cors.DefaultConfig()
  corsConfig.AllowAllOrigins = true
  corsConfig.MaxAge = 5 * time.Minute

  r.Use(cors.New(corsConfig))
  return &Server{
    r:         r,
    collector: collector.NewCollector(),
  }
}
func (self *Server) GetData(c *gin.Context) {
  data, err := self.collector.GetData()
  if err != nil {
    c.JSON(
      http.StatusOK,
      gin.H{
        "success": false,
        "reason": "error query data",
      },
    )
    return
  }
  c.JSON(
    http.StatusOK,
    gin.H{
      "success": true,
      "data": data,
    },
  )
}

func (self *Server) Run() {
  self.r.Use(static.Serve("/", static.LocalFile("/home/nguyen.thi.tu.anh/go/src/github.com/Gin/interate-with-vue/app", true)))

  api := self.r.Group("/api")
  api.GET("/data", self.GetData)

  self.r.Run(":8001")
}
```
Đầu tiên ta sẽ tạo một cấu trúc dữ liệu Server với các trường r và collector. Trong đó r là một con trỏ có kiểu  `*gin.Engine`. Engine là một thể hiện của Gin, engine cho phép ta tạo những api router. Collector cũng là một con trỏ kiểu collect để thực hiện việc get dữ liệu từ API qua http.
Tiếp theo là hàm khởi tạo cho Server, hàm NewServer() tại hàm này ta truyền các biến vào các trường với kiểu tương ứng với cấu trúc dữ liệu ta đã định nghĩa ở trên.

Trong code trên ta đã định nghĩa ra một API vơi url là localhost:8001/api/data với function xử lý tương ứng là GetData().
Function GetData() sẽ gọi đến function GetData() trong package collector, function này trả về hai giá trị: data, err.:
data, err := self.collector.GetData()

Tới đây ta sẽ sử dụng Context để trả về json cho client, Context là một trong những phần quan trọng nhất của Gin, nó cho phép ta truyền biến giữa middleware, quản lý luồng, kiểm duyệt JSON của một request và đồng thời cũng có thể phản hồi JSON cho phía client. Và trong đoạn code trên ta dùng function JSON() để trả JSON cho phía client. (1)

Nếu có lỗi (err != nil) thì json trả về sẽ có success: false, còn nếu không có lỗi thì success: true cùng với đó là data.

Đây là kết quả khi build và chạy project
![](https://images.viblo.asia/8d359725-760b-4050-ab40-f6d0b0afd706.png)
## front-end VueJS
Đầu tiên để sử dụng được vue.js thì chúng ta cần phải nhúng core của nó vào bằng 2 cách sau:
CDN
```
<script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.min.js"></script>
```
Dẫn file local
Chúng ta download vue.js và nhúng vào file index.html
```
<script src="source/vue.js"></script>
```
Dưới đây là code của file app.js
```
// path: /app/source/app.js
(function(Vue) {
  "use strict";

  Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo }}</li>'
  })

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      todos: ['We', 'make', 'it', 'awesome'],
      apiData: 0,
    },
    created: function() {
      console.log("this: ", this.$http)
      this.$http.get('/api/data').then(
        function(res) {
          if (res.data.success) {
            this.apiData = res.data.data ? res.data.data : 100
          }
        })
    },
    methods: {
      upcaseData: function (index) {
        alert(this.todos[index].toUpperCase())
      }
    }
  })
})(Vue);
```
Trong file app.js sẽ dùng vuejs xử lý. Ở đây ta tạo ra một component mới, component có chức năng tương tự như component trong angular 2, như trong đoạn code trên ta tạo ra một thẻ mới là todo-item.
Function new Vue có thể coi như một controller, sử dụng cho 1 scope nhất định được quy định bởi trường el, el có thể là một thẻ, id, class,...
data: chính là các trường dữ liệu của instance Vue này
Created: đây là scope để khơỉ tạo những dữ liệu đầu tiên trong khi page được load.
Methods: là scope chứa các function mà ta định nghĩa ra với các mục đích nhất định
Tại created, ta có thể thấy Vuejs sẽ lấy dữ liệu từ server về thông qua method get, như mô tả trong hình, và dữ liệu sẽ được gán vào biến apiData.
dữ liệu trả về từ server có dạng: ![](https://images.viblo.asia/d5820942-0995-468d-b095-40ee61981c75.png)
Cuối cùng ở ngoài view index.html, việc bind data cũng giống như angular 2

Mô tả chi tiết các lấy dữ liệu từ server trong ví dụ:
Như trong đoạn code trên thì ta có thể thấy tại scope Created ta đã thưc hiện 1 request HTTP với method là GET đên đường dẫn /api/data
this.$http.get('/api/data')
và nó tương đường với việc gọi đến đường dẫn localhost:8001/api/data mà việc xử lý và kết quả trả về của server đã được mô tả ở phần (1).
```
// path: /app/index.html

<!DOCTYPE html>
<html>
<head>
  <title>Vuejs App</title>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.24/vue.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue-resource/0.7.0/vue-resource.min.js"></script>
</head>
<body>
  <div id="app">
    <div>
      {{ message }}

    </div>
    <ul>
      <todo-item v-for="(index, todo) in todos" v-bind:todo="todo"
        v-on:click="upcaseData(index)">{{ todo }}
      </todo-item>
    </ul>
    <div> Du lieu tu server: {{ apiData }}</div>
  </div>
  <script src="source/app.js"></script>
  <!-- <script src="source/vue.js"></script> -->
</body>
</html>
```
Kết quả hiển thị giao diện

![](https://images.viblo.asia/8b43a7ae-9e5e-4154-ab01-92af12d6e26a.png)

Cảm ơn các bạn đã xem. Mọi người có thể xem toàn bộ code ở https://github.com/tuanhnt1712/interate-with-vue
Nguồn tham khảo:
https://golang.org/#
https://vuejs.org/