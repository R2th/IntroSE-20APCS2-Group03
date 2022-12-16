# Marshalling JSON
Marshalling cho phép chúng ta convert từ Go object sang JSON strings.
## Ví dụ 1 
Chúng ta hãy bắt đầu với 1 ví du đơn giản nhé. Ở đây tôi có 1 struct ***User*** define ở Go code
```
type User struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

// an instance of our User struct
user := User{Id: "ID001", Name: "LanKa", Password: "123465"}
```
Để convert instance của struct ***User*** sang JSON chúng ta sử dụng  go package **encoding/json**
hàm **json.Marshal()** return về mảng kiểu byte và lỗi ( ***[]byte*** , ***err***)
```markdown
byteArray, err := json.Marshal(user)
if err != nil {
    fmt.Println(err)
}

fmt.Println(string(byteArray))
```
## Ví dụ 2 - Nested Structs
Ở ví dụ 1 chúng ta đã có kiến thức cơ bản để convert từ object sang JSON. Ở ví dụ này chúng ta hãy bắt đầu với 1 ví dụ phức tạp hơn với struct lồng nhau
```
type User struct {
	Name   string `json:"name"`
	Type   string `json:"type"`
	Age    int    `json:"Age"`
	Social Social `json:"social"`
}

type Social struct {
	Facebook string `json:"facebook"`
	Twitter  string `json:"twitter"`
}

social := Social{Facebook: "https://facebook.com", Twitter: "https://twitter.com"}
user := User{Name: "LanKa", Type: "Author", Age: 25, Social: social}
```

Bây giờ chúng ta đã định nghĩa 1 struct lồng nhau (struct ***User***  bao gồm struct ***Social*** )
 tương tự ví dụ 1 ta convert như trên
```markdown
byteArray, err := json.Marshal(user)
if err != nil {
    fmt.Println(err)
}

fmt.Println(string(byteArray))
```
Bây giờ ta chạy chương trình lên ta sẽ có output như trên :

```javascript
$ go run main.go
{"name":"LanKa","type":"Author","Age":25,"social":{"facebook":"https://facebook.com","twitter":"https://twitter.com"}}
```

### Toàn bộ source code
```
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	Name   string `json:"name"`
	Type   string `json:"type"`
	Age    int    `json:"Age"`
	Social Social `json:"social"`
}

type Social struct {
	Facebook string `json:"facebook"`
	Twitter  string `json:"twitter"`
}

func main() {
	// an instance of our User struct
	social := Social{Facebook: "https://facebook.com", Twitter: "https://twitter.com"}
	user := User{Name: "LanKa", Type: "Author", Age: 25, Social: social}
	byteArray, err := json.Marshal(user)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(byteArray))

}
```

### Pretty Printing
Nếu chúng ta muốn output in ra dễ dọc hơn chúng ta có thể sử dụng hàm **json.MarshalIndent()**  thay vì 
 **json.Marshal()**. Giá trị đầu vào của **MarshalIndent** chứa prefix(tiền tố) và indent(thụt lề)

 ```
social := Social{Facebook: "https://facebook.com", Twitter: "https://twitter.com"}
user := User{Name: "LanKa", Type: "Author", Age: 25, Social: social}

byteArray, err := json.MarshalIndent(user, "", "  ")
if err != nil {
    fmt.Println(err)
}
fmt.Println(string(byteArray))
 ```
 Kết quả trả về như trên 
 ```css
 {
     "name": "LanKa",
     "type": "Author",
     "Age": 25,
     "social": {
          "facebook": "https://facebook.com",
          "twitter": "https://twitter.com"
     }
}
```
# Unmarshalling JSON
Bây giờ chúng ta sẽ lấy ra object Go từ JSON strings. Chúng ta có struct  ***Book*** như trên
```
type Book struct {
	Title  string `json:"title"`
	Author string `json:"author"`
}
```
Ứng với cặp key/value ở JSON string, chúng ta định nghĩa các trường trong struct nối đến key name. Với mỗi trường chúng ta thêm  **tags**  **`'json:"KEY"'`** .Các thẻ này ở đó để cho biết key JSON nào khớp với giá trị trường trong struct nào. 

Bây giờ chúng tôi đã xác định struct, chúng ta có thể tiếp tục với tác vụ giải nén chuỗi JSON của chúng tôi thành một struct bằng cách sử dụng hàm Unmarshal: 

```go
jsonString := `{"title":"Learning JSON in Golang","author":"Lanka"}`
var book Book
err := json.Unmarshal([]byte(jsonString), &book)
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", book)
```
input func **`json.Unmarshal()`** là **`[]byte`** nên chúng ta phải cast từ string sang []byte.Chúng ta cũng tham chiếu struct cần giải nén JSON string đến **`&book`**

Dưới đây là kết quả:

```shell
$ go run main.go
{Title:Learning JSON in Golang Author:Lanka}
```
Trên đây là ví dụ đơn giản về **Unmarshalling JSON** với các struct phức tạp hơn chúng ta cũng có thể làm tương tự.

# Unstructured Data
Đôi khi chúng ta phải làm việc với dữ liệu không có câu trúc. Trong trường hợp này, chúng ta có thể sử dụng cách thay thế bằng **`map[string]interface{}`** là kiểu trả về của biển được giải nén
```go
jsonString := `{"title":"Learning JSON in Golang","author":"Lanka"}`
var book map[string]interface{}
err := json.Unmarshal([]byte(jsonString), &book)
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", book)
```
 Dưới đây là kết quả trả về :

 ```
$ go run main.go
map[author:Lanka title:Learning JSON in Golang]
 ```

 Đây có thể là một mẹo hữu ích nếu bạn đang gặp khó khăn, tuy nhiên, nếu bạn biết cấu trúc JSON của mình thì bạn nên xác định các struct một cách rõ ràng. 
#  Tổng kết
Hy vọng rằng hướng dẫn nhỏ này của tôi có thể giúp ích cho bạn ^^