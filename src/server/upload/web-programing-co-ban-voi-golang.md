![](https://images.viblo.asia/ef7b94f8-984b-4693-bff3-34e75577ae85.png)

Go (hay còn gọi là Golang) là một ngôn ngữ đang khá mới và hot trong cộng đồng lập trình viên tại Việt Nam. Với performance cao (chạy nhanh hơn Node.JS, PHP, Ruby, ... và chỉ chậm hơn C/C++ một chút) cộng với cú pháp đơn giản, sáng sủa, Golang giúp các lập trình viên có thể xây dựng các hệ thống backend hiệu năng cao dễ dàng hơn. Nghe đâu, một trung tâm dạy lập trình có tiếng ở Hà Nội đã chuyển đổi phần backend của toàn bộ trang web từ Node.JS sang Golang. Hôm nay, chúng ta cùng đi tìm hiểu cơ bản về cách viết server với Golang.

## 1. Kiến trúc

Lập trình web server với Golang thuần, chúng ta sẽ sử dụng package [net/http](https://golang.org/pkg/net/http/) để tạo server (listen port, xử lý request, tạo response...). Ai đã lập trình Node.JS thì thấy nó có sự tương đồng với cách chúng ta sử dụng module [http](https://nodejs.org/api/http.html) bên Node.JS vậy.

Thư viện  [net/http](https://golang.org/pkg/net/http/) cung cấp cho chúng ta một luồng sử lý dữ liệu như hình dưới đây.

![](https://images.viblo.asia/4e3a8bdd-75a3-4443-a7c7-8792366c374c.png)

Request từ client đến server ban đầu sẽ phải đi qua một thành phần gọi là **Multiplexer**  (tạm dịch là bộ ghép kênh). Bộ ghép kênh sẽ phân tích request (tùy vào url hay là method) và chuyển đến cho **Handler** thích hợp để xử lý tiếp. Các **Handler** sẽ là các hàm gọi **Database**, xử lý logic request tùy theo yêu cầu và trả lại dữ liệu cho **Template** để hiển thị ra (Template engine như trong Node.JS là ejs hay jade ...). Cuối cùng **Multiplexer** sẽ trả lại response cho client.

![](https://images.viblo.asia/cdec7eaf-8a35-4ca3-b4f2-f85816cb628a.png)

## 2. Hello world

```go
// hello.go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, you've requested: %s\n", r.URL.Path)
    })

    http.ListenAndServe(":3000", nil)
}
```

- 2 dòng đầu tiên với những bạn đã học Golang sẽ chẳng xa lạ gì. Đó là việc include package main và import 2 thư viện là fmt và net/http.
- Hàm `HandleFunc` của thư viện `net/http` nhận vào 2 đối số là đường dẫn request đến và một function chứa 2 tham số. `w http.ResponseWriter` là nơi mà bạn có thể chỉnh sửa response khi trả về client, `r *http.Request` chứa các thông tin của request mà client gửi lên server. Đoạn code này nhìn khá tương đồng với bên Express JS. 
```js
app.get('/', func (req, res) { 
    res.send('Hello World!')
});
```
- Dòng cuối truyền 2 tham số với hàm `ListenAndServe` để mở port, nơi client có thể request tới server. Tham số đầu tiên là port muốn mở, tham số thứ 2  nếu là `nil` thì server sẽ sử dụng **Multiplexer** mặc định trong `net/http`. Nếu bạn muốn sử dụng **Multiplexer**  của bên thứ 3 thì có thể tham khảo [gorilla/mux](https://github.com/gorilla/mux) hoặc [http/router](https://github.com/julienschmidt/httprouter).

### Chạy file

```bash
go run hello.go
```

Mở trình duyệt và truy cập vào địa chỉ http://localhost:3000

![](https://images.viblo.asia/de135878-a066-457e-b1bb-73f5bff92234.png)

## 3. Sử dụng Multiplexer của bên thứ 3

Như đã đề cập ở phần trước, chúng ta có thể sử dụng **Multiplexer**  của bên thứ 3 cho server Golang thay vì **Multiplexer**  mặc định trong thư viện `net/http`. **Multiplexer** mặc định có thể có thiếu hoặc hạn chế ở một số điểm so với bên thứ 3. Ví dụ sự phức tạp để lấy được các request params trên các url.

### Grollia/mux

Instal package `grollia/mux` :

```bash
go get -u github.com/gorilla/mux
```

```go
package main

import (
    "fmt"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()

    r.HandleFunc("/books/{title}/page/{page}", func(w http.ResponseWriter, r *http.Request) {
        vars := mux.Vars(r)
        title := vars["title"]
        page := vars["page"]

        fmt.Fprintf(w, "You've requested the book: %s on page %s\n", title, page)
    })

    http.ListenAndServe(":3000", r)
}
```

- Dòng đầu của hàm main là tạo một instance multiplexer `gorilla/mux`, hàm HandleFunc để xử lý request cũng sẽ gọi qua multiplexer mới thay vì `http` như dùng multiplexer mặc định
- Tham số thứ 2 của hàm `ListenAndServe` cũng truyền vào `r` thay vì `nil` như phần trên.

### http/router

Instal package `http/router` :

```bash
go get -u github.com/julienschmidt/httprouter
```

```go
package main

import (
    "fmt"
    "net/http"
    "github.com/julienschmidt/httprouter"
)

func main() {
	router := httprouter.New()
	
    router.GET("/", func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		fmt.Fprint(w, "Welcome!\n")
	})

    router.GET("/hello/:name", func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		fmt.Fprintf(w, "hello, %s!\n", ps.ByName("name"))
	})

    http.ListenAndServe(":8080", router)
}
```

- Hơi khác một chút so với 2 multiplexer ở trên. `http/router` xử lý các các request theo các hàm ứng với tên gọi các http method (rất giống với express js). Tham số truyền vào trong callback function cũng là 3 tham số chứ không còn là 2 với dạng. Các lấy params từ request ra cũng khá là "ngọt".
```go
func(http.ResponseWriter, *http.Request, Params)
```

Chi tiết hơn về các hàm như POST, PUT, DELETE, ... các bạn có thể tham khảo tại [đây](https://godoc.org/github.com/julienschmidt/httprouter#Handle)

## 4. Thao tác với cơ sở dữ liệu

Chúng ta sẽ demo nho nhỏ về việc Golang thao tác với hệ quản trị cơ sở dữ liệu **MongoDB**.

Trước tiên, cần cài đặt package mongodb

```bash
go get go.mongodb.org/mongo-driver
```

### Kết nối với mongodb
```go
// database.go
package main

import (
    "context"
	"fmt"
	"log"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
    username string
    password string
}

func main() {
  
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017/demo")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
    	log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
    	log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
}
```

Cơ bản việc kết nối đến cơ sở dữ liệu với Golang cũng không khác các ngôn ngữ khác là bao, chúng ta đều cần truyền `MONGO_URI` vào và sử dụng hàm connect trong thư viện mongo để connect đến database cần tương tác. Đoạn code trên ta có model `User` gồm 2 trường `username` và `password` thể hiện cấu trúc dữ liệu sẽ được lưu vào `collection`.

 Chạy `go run database.go` và kết quả sẽ hiện ra nếu connect thành công

![](https://images.viblo.asia/91722438-23e6-419e-800c-7b76f5702266.png)

### Thao tác 1 chút với dữ liệu

```go
// insert.go
package main

import (
    "context"
	"fmt"
	"log"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
    username string
    password string
}

func main() {
  
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017/demo")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
    	log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
    	log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("demo").Collection("users")


    user := User{"conglt", "sdajah1kj2h3hu23h"}

	insertResult, err := collection.InsertOne(context.TODO(), user)
	
	if err != nil {
        log.Fatal(err)
	}
	
    fmt.Println("Inserted a Single Document: ", insertResult.InsertedID)
}
```

- Sau khi đã kết nối thành công đến mongodb, chúng ta sẽ chỉ định `database` và `collection` sẽ tương tác trực tiếp với câu lệnh. Nếu `database` và `collection` chưa tồn tại thì mongo sẽ tạo mới cho chúng ta.
```go
collection := client.Database("demo").Collection("users")
 ```
 - 2 dòng tiếp theo sẽ gọi tạo 1 instance của struct User và sau đó gọi hàm `InsertOne` trong thư viện mongo để thêm mới bản ghi vào `collection`.

Thư viện `mongo` cung cấp rất nhiều hàm tương tác với cơ sở dữ liệu như thêm, sửa, xóa, ... Chi tiết về cách sử dụng cũng như prototype của các hàm các bạn có thể xem chi tiết ở [GoDoc](https://godoc.org/go.mongodb.org/mongo-driver/mongo).

![](https://images.viblo.asia/3829b375-e489-4abd-9309-d421591cbe0c.png)

![](https://images.viblo.asia/446afc5b-15f8-477c-acb2-eeebf9782537.png)

## Tài liệu tham khảo

- [Go Web Programing](https://www.manning.com/books/go-web-programming)
- [Go Web By Examples](https://gowebexamples.com/)
- [net/http](https://golang.org/pkg/net/http/#HandleFunc)