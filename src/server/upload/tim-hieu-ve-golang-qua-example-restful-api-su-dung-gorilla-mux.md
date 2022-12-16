## 1. Giới thiệu
Xin chào các bạn, trong thời gian gần đây, mình mới tìm hiểu & học thêm về ngôn ngữ Golang, hôm nay mình xin chia sẻ một số kiến thức về ngôn ngữ này, và trong phần sau bài viết này mình cũng sẽ giới thiệu một ví dụ RESTful API đơn giản trong Golang sử dụng Gorilla Mux.<br>
## 2. Golang
### Tổng quan
Go được phát triển vào năm 2007 bởi Robert Griesemer, Rob Pike và Ken Thompson tại Google nhưng ra mắt vào năm 2009 như một ngôn ngữ lập trình mã nguồn mở.<br>
Go là một ngôn ngữ lập trình mới do Google thiết kế và phát triển. Nó được kỳ vọng sẽ giúp ngành công nghiệp phần mềm khai thác nền tảng đa lõi của bộ vi xử lý và hoạt động đa nhiệm tốt hơn. <br>
Về mặt cá nhân mình, thì mình đã từng làm về Java, khi chuyển qua Go thì mình thấy do Go còn mới hơn Java, nên cộng đồng phát triển và các thư viện hỗ trợ không nhiều như Java, mà sẽ phải tự code & custom lại khá nhiều. Tuy nhiên mình cảm thấy khi compile & run của Go nhanh hơn hẳn so với Java.<br>
Tài liệu về Go, mô tả Go là “một ngôn ngữ biên dịch nhanh, static type, compiled language (ngôn ngữ biên dịch), nhưng lại giống như một dynamic, interpreted language (ngôn ngữ thông dịch)”. Ngay cả khi một chương trình Go lớn, cũng sẽ được biên dịch chỉ trong vòng vài giây. <br>
### Học Golang
Trong quá trình học Golang, mình folow theo [A Tour of Go](https://tour.golang.org). Đây là tài liệu chính thức của Golang cho những người mới bắt đầu, mình suggest các bạn khi học Golang thì nên folow theo tutorial này. Trong tutorial này chúng ta sẽ được tìm hiểu về cấu trúc, cú pháp, các tính năng đặc trưng trong Go như con trỏ, struct, slice, interface, goroutine, ... Những kiến thức này được giới thiệu khá đầy đủ thông qua các example trong tutorial đó.<br>
Bản thân khi folow theo tutorial này thì mình thường code lại các ví dụ ở mỗi bài, điều này giúp nhanh chóng quen dần với cú pháp, và việc code lại cũng như 1 lần ghi nhớ về các bài học đó. Mỗi tutorial cũng sẽ có các exercise để vận dụng các kiến thức đó. Tuy nhiên có một số bài cũng khá khoai và đôi khi khó hiểu đề bài, nếu nghĩ không ra các bạn có thể tham khảo bằng việc search các bài giải trên Goolge sau đó đọc hiểu và code lại.<br>
### Gorilla Mux
[Gorilla Mux](https://github.com/gorilla/mux) là mội gói thư viện giúp ta có thể implent một router & dispatcher thực hiện các request đến với trình xử lý tương ứng của chúng.<br>
Để tìm hiểu kỹ hơn về cách sử dụng thư viện này, sẽ được giới thiệu kỹ hơn ở phần ví dụ sau.
### Go modules
Có 1 câu hỏi đặt ra, trong Go làm cách nào để quản lý các dependency? Khi phát triển một ứng dụng, việc quản lý các dependency là rất quan trọng, vậy trong Go làm như thế nào?<br>
Trong Go, các dependency được quản ký trong `$GOPATH/src`, bạn có thể xem GOPATH của mình được config ở đâu bằng cách gõ lệnh `go env GOPATH`.<br>
Kể từ trước phiên bản `Go 1.11` thì khi 1 project muốn có thể sử dụng được các dependency thì buộc lòng project đó phải được setting thêm trong GOPATH, từ đây project của bạn mới có thể đọc và sử dụng các dependency khác trong GOPATH.<br>
Tuy nhiên, sau phiên bản trên thì Go cũng giới thiệu một cách để quản lý các dependency mới, đó chính là [Go Modules](https://blog.golang.org/using-go-modules). Với việc sử dụng Go Modules sẽ cho phép sử dụng các modules khi thư mục hiện tại hoặc bất kỳ thư mục nào có file `go.mod`, miễn là thư mục nằm ngoài `$GOPATH/src`. (Bên trong `$GOPATH/src`, để tương thích, lệnh go vẫn chạy ở chế độ GOPATH cũ, ngay cả khi tìm thấy go.mod) Bắt đầu từ Go 1.13, chế độ modules sẽ là mặc định cho mọi sự phát triển.<br>
Bạn có thể khởi tạo Go modules cho ứng dụng của mình bằng lệnh sau:<br>
```
go mod init <tên module của bạn>
```
Khi ứng dụng của bạn được khởi tạo bằng Go modules, Go sẽ cho phép ứng dụng của bạn có thể truy cập và sử dụng các dependency khác có trong `$GOPATH`. <br>
Note: Nếu trong GOPATH của bạn không có các package mà bạn cần sử dụng, bạn có thể get về bằng cách sử dụng lệnh sau:<br>
```
go get <pacakge name>
```
## 3. Tạo RESTful API sử dụng Gorilla Mux
Bây giờ, chúng ta sẽ cùng tìm hiểu thêm về Go & Gorilla Mux thông qua một example REST API đơn giản như sau:<br>
Ứng dụng quản lý TODO gồm các API:
- Trả về danh sách các TODO
- Get thông tin TODO by ID
- Tạo mới TODO
- Sửa nội dung của TODO
- Xóa TODO
### Cấu trúc thư mục
Dưới đây là cấu trúc thư mục của example:
```
.
├── cmd/
|   └── main.go
├── pkg/
|   ├── data
|   |   └── data.go
|   ├── dto
|   |   └── todo.go
|   └── handler
|       └── todo_handler.go
├── go.mod
└── go.sum
```
Mình không biết cách tổ chức trên đã chuẩn chưa. Nhưng khi tìm hiểu về cấu trúc folder thường gặp của 1 dự án Golang thì mình tìm được project [này](https://github.com/golang-standards/project-layout) trên github nói về cách tổ chức layout của 1 project Golang phổ biến. Đây là một bố cục cơ bản cho các dự án ứng dụng Go. Nó không phải là một tiêu chuẩn chính thức được xác định bởi nhóm phát triển Go;ang team. Tuy nhiên, nó là một tập hợp các mẫu bố cục dự án Go đã phát triển và một sổ mẫu mới nổi phổ biến. Nó cũng có một số cải tiến nhỏ cùng với một số thư mục hỗ trợ phổ biến cho bất kỳ ứng dụng nào đủ lớn trong thế giới thực.<br>
Tiếp theo, mình sẽ đi vào chi tiêts và giải thích từng file một<br>
### go.mod & go.sum
Đây là 2 file mà Go modules khởi tạo cho ứng dụng của bạn. Ở đây, mình đặt tên cho moudle của mình là `learn-golang` nên mình sẽ sử dụng lệnh sau để khởi tạo Go modules cho ứng dụng:<br>
```
go mod init learn-golang
```
### todo.go
File `todo.go` chứa đổi tượng TODO mà ứng dụng của mình sẽ làm việc:<br>
```go
package dto

type Todo struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Content string `json:"content"`
}
```
Ở trong ví dụ này, mình sẽ làm việc với đối tượng TODO gồm các thuộc tính ID, Name, Content. Chúng ta sẽ khai báo kiểu struct như trên đi kèm với kiểu dữ liệu và định dạng field name JSON trả về cho object.<br>
### data.go
File `data.go` là file quản lý các data của đối tượng TODO trong project. Do project example này mình không đề cập đến vấn đề kết nối database nên mình sẽ khở tạo ra list TODO ban đầu & quản lý thông qua file `data.go` này<br>
```go
package data

import "learn-golang/pkg/dto"

var Todos []dto.Todo

func init() {
	Todos = []dto.Todo{
		{ID: 1, Name: "Monday", Content: "Learn Maths"},
		{ID: 2, Name: "Tuesday", Content: "Learn Literature"},
		{ID: 3, Name: "Wednesday", Content: "Learn Physics"},
		{ID: 4, Name: "Thursday", Content: "Learn Chemistry"},
		{ID: 5, Name: "Friday", Content: "Learn English"},
	}
}
```
Do ta đã config project bằng Go module với tên `learn-golang` nên có file này có thể dễ dàng sử dụng Todo dto ở trên bằng cách sử dụng lệnh import:<br>`import "learn-golang/pkg/dto"`<br>
`func init()`: đây là 1 hàm khởi tạo các giá trị ban đầu khi project được start, trong ví dụ này là khởi tạo 1 list Todo gồm 5 phần tử.<br>
### main.go
Đây là file chính để start project. 
```go
package main

import (
	"github.com/gorilla/mux"
	"learn-golang/pkg/handler"
	"log"
	"net/http"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/todo", handler.GetAllTodo).Methods(http.MethodGet)
	r.HandleFunc("/api/todo/{id}", handler.GetTodoById).Methods(http.MethodGet)
	r.HandleFunc("/api/todo", handler.CreateTodo).Methods(http.MethodPost)
	r.HandleFunc("/api/todo/{id}", handler.UpdateTodo).Methods(http.MethodPut)
	r.HandleFunc("/api/todo/{id}", handler.DeleteTodo).Methods(http.MethodDelete)

	log.Fatal(http.ListenAndServe(":8080", r))
}
```
Bằng việc import package `github.com/gorilla/mux`, từ đây chúng ta có thể sử dụng được gorilla/mux cho project. <br>
Khởi tạo router bằng lệnh: `mux.NewRouter()`<br>
Tiếp theo là việc khai báo các API: get all Todo, get Todo by id, create, update & delete Todo. Cân lưu ý param thứ 2 của method `HandleFunc` truyền vào 1 kiểu function, chi tiết định nghĩa function sẽ được đề cập trong phần sau trong file `todo_handler.go`. <br>
Cuối cùng chúng ta có thể start server để router listen bằng cách sử dụng lệnh sau của package `net/http`: `http.ListenAndServe(":8080", r)`. Param thứ nhất chỉ định project sẽ start server listen trên port 8080, và param thứ 2 là router đã được định nghĩa ở trên.<br>
### todo_handler.go
Như đã nói ở trên, đây là file xử lý các logic của các handle function sẽ được truyền vào các router:<br>
```go
package handler

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"learn-golang/pkg/data"
	"learn-golang/pkg/dto"
	"net/http"
	"strconv"
)

func GetAllTodo(writer http.ResponseWriter, request *http.Request) {
	responseWithJson(writer, http.StatusOK, data.Todos)
}

func GetTodoById(writer http.ResponseWriter, request *http.Request) {...}

func CreateTodo(writer http.ResponseWriter, request *http.Request) {...}

func UpdateTodo(writer http.ResponseWriter, request *http.Request) {...}

func DeleteTodo(writer http.ResponseWriter, request *http.Request) {...}

func responseWithJson(writer http.ResponseWriter, status int, object interface{}) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	json.NewEncoder(writer).Encode(object)
}

func generateId(todos []dto.Todo) int {
	var maxId int
	for _, todo := range todos {
		if todo.ID > maxId {
			maxId = todo.ID
		}
	}

	return maxId + 1
}
```
Chúng ta đã implement func `GetAllTodo`. Trong file này có định nghĩa 2 func là `responseWithJson` & `generateId`. Func `responseWithJson` là 1 method common chứa các thiết lập để `http.ResponseWriter` có thể thay đổi và trả về response theo ý muốn. `generateId` là 1 method tự động tính toán ra ID khi create 1 Todo mới (sẽ sử dụng trong hàm `CreateTodo`)<br>
Bây giờ chúng ta sẽ cùng đi vào chi tiết các func chính cho các API khác:<br>
#### GetTodoById
```go
func GetTodoById(writer http.ResponseWriter, request *http.Request) {
	params := mux.Vars(request)
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		responseWithJson(writer, http.StatusBadRequest, map[string]string{"message": "Invalid todo id"})
		return
	}

	for _, todo := range data.Todos {
		if todo.ID == id {
			responseWithJson(writer, http.StatusOK, todo)
			return
		}
	}

	responseWithJson(writer, http.StatusNotFound, map[string]string{"message": "Todo not found"})
}
```
#### CreateTodo
```go
func CreateTodo(writer http.ResponseWriter, request *http.Request) {
	var newTodo dto.Todo
	if err := json.NewDecoder(request.Body).Decode(&newTodo); err != nil {
		responseWithJson(writer, http.StatusBadRequest, map[string]string{"message": "Invalid body"})
		return
	}

	newTodo.ID = generateId(data.Todos)
	data.Todos = append(data.Todos, newTodo)

	responseWithJson(writer, http.StatusCreated, newTodo)
}
```
#### UpdateTodo
```go
func UpdateTodo(writer http.ResponseWriter, request *http.Request) {
	params := mux.Vars(request)
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		responseWithJson(writer, http.StatusBadRequest, map[string]string{"message": "Invalid todo id"})
		return
	}

	var updateTodo dto.Todo
	if err := json.NewDecoder(request.Body).Decode(&updateTodo); err != nil {
		responseWithJson(writer, http.StatusBadRequest, map[string]string{"message": "Invalid body"})
		return
	}
	updateTodo.ID = id

	for i, todo := range data.Todos {
		if todo.ID == id {
			data.Todos[i] = updateTodo
			responseWithJson(writer, http.StatusOK, updateTodo)
			return
		}
	}

	responseWithJson(writer, http.StatusNotFound, map[string]string{"message": "Todo not found"})
}
```
#### DeleteTodo
```go
func DeleteTodo(writer http.ResponseWriter, request *http.Request) {
	params := mux.Vars(request)
	id, err := strconv.Atoi(params["id"])

	if err != nil {
		responseWithJson(writer, http.StatusBadRequest, map[string]string{"message": "Invalid todo id"})
		return
	}

	for i, todo := range data.Todos {
		if todo.ID == id {
			data.Todos = append(data.Todos[:i], data.Todos[i+1:]...)
			responseWithJson(writer, http.StatusOK, map[string]string{"message": "Todo was deleted"})
			return
		}
	}

	responseWithJson(writer, http.StatusNotFound, map[string]string{"message": "Todo not found"})
}
```
## 3. Testing API
Bây giờ chúng ta sẽ cùng test thử các API bằng Postman. Đầu tiên start project bằng lệnh sau:<br>
 ```
 go run cmd/main.go
 ```
#### API Get all Todo & API Get Todo by ID
![Test API Get all Todo & API Get Todo by ID](https://images.viblo.asia/5a2def41-15c5-4e45-82d1-738639b77ac9.gif)
#### API Create Todo
![Test API Create Todo](https://images.viblo.asia/ce6e43ac-923e-405b-866d-8be2e5287034.gif)
#### API Update Todo
![Test API Update Todo](https://images.viblo.asia/426c3591-5fd1-4ca6-9ef9-ec86dfeaadc9.gif)
#### API Delete Todo
![](https://images.viblo.asia/ce127cf2-382c-4252-94cf-13d84cf212e0.gif)
## 4. Kết luận
Qua bài biết trên mình đã giới thiệu một chút về ngôn ngữ Golang, cách quá trình mình tìm hiểu ngôn ngữ này và 1 demo nhỏ sử dụng Golang với Gorilla Mux để tạo ra 1 project API đơn giản. Hy vọng bài viết trên sẽ giúp ích cho các bạn trong học tập và công việc, cảm ơn các bạn đã chú ý theo dõi.