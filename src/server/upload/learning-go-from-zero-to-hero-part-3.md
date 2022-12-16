# Packages

Các đoạn code được viết trong Go được định nghĩa trong các packages. Package **main** là nơi chương trình Go chạy đầu tiên. Có rất nhiều những package được định nghĩa sẵn trong Go. Hẳn các bạn cũng còn nhớ một package mà chúng ta đã dùng rất nhiều trong các ví dụ trước, đó là package **fmt**

## Installing a package

```golang
go get <package-url-github>
// ví dụ
go get github.com/satory/go.uuid
```

Tất cả những packages mà chúng đã đã từng cài đặt sẽ được lưu trong đường dẫn **GOPATH** mà chúng ta đã thiết lập ở [Path 1](https://viblo.asia/p/learning-go-from-zero-to-hero-part-1-63vKjQVN52R)

## Creating a custom package

Hãy bắt đầu bằng việc tạo một folder với tên là *custom_package*

```commandline
> mkdir custom_package
> cd custom_package
```

Để tạo một package, trước hết chúng ta cần tạo một folder với tên của package mà chúng ta muốn tạo. Giả sử như chúng ta muốn tạo một package với tên là *person*. Hãy tạo một folder có tên là *person* bên trong folder *custom_package*

```commandline
> mkdir person
> cd person
```

Bây giờ, tạo một file với tên *person.go* bên trong folder *person* với nội dung như sau:

```golang
package person
func Description (name string) string {
  return "The person name is: " + name
}

func secretName (name string) string {
  return "Do not share"
}
```

Chúng ta cần phải cài đặt package này bằng dòng lệnh sau:

```commandline
go install
```

Bây giờ, hay quay lại folder *custom_package* và tạo một file *main.go* với nội dung như sau:

```golang
package main
import(
  "custom_package/person"
  "fmt"
)

func main() {
  p := person.Description("Milap")
  fmt.Println(p) // => The person name is: Milap
}
```

Khi chúng ta đã import package person, chúng ta có thể sử dụng func *Description* được định nghĩa trong package đó. Tuy nhiên chúng ta lại không thể sử dụng func *secretName* vì tất cả những func có tên không bắt đầu bằng chữ in hoa thì đều là những *private function* trong Go.

## Packages Documentation

Trong Go, chúng ta có sẵn một công cụ giúp tạo Document cho package. Chạy dòng lệnh sau để tạo document cho package *person*:

```commandline
> godoc person Description
```

Câu lệnh trên sẽ tạo document cho function *Description* bên trong package *person*. Để xem được document, chúng ta hãy chạy câu lệnh sau:

```commandline
> godoc -http=":8080"
```

Sau khi chạy đoạn lệnh trên, truy cập vào link http://localhost:8080/pkg/ và chúng ta sẽ thấy nội dung document mà chúng ta vừa tạo.

## Some built-in package in Go

Một vài những package phổ biến có sẵn trong Go:

**fmt**

Package này dùng để thực thi những function Input/Output (I/O). Chúng ta đã từng sử dụng nó trước đây để hiển thị kết quả ra màn hình.

**json** 

Một trong những package hữu dụng khác đó là package **json**. Nó là một package giúp chúng ta xử lý các đối tượng json trong ứng dụng Go. Hãy xem các ví dụ dưới đây trong việc sử dụng package **json** để encode/decode một đối tượng json:

Encode:

```golang
package main

import (
  "fmt"
  "encoding/json"
)

func main(){
  mapA := map[string]int{"apple": 5, "lettuce": 7}
  mapB, _ := json.Marshal(mapA)
  fmt.Println(string(mapB))
}
```

Decode

```golang
package main

import (
  "fmt"
  "encoding/json"
)

type response struct {
  PageNumber int `json:"page"`
  Fruits []string `json:"fruits"`
}

func main(){
  str := `{"page": 1, "fruits": ["apple", "peach"]}`
  res := response{}
  json.Unmarshal([]byte(str), &res)
  fmt.Println(res.PageNumber)
}
//=> 1
```

# Error Handling

Lỗi là những thứ không mong đợi trong một chương trình. Hãy giả sử chúng ta đang tạo một API để kết nối với một dịch vụ bên ngoài. API này có thể trả về kết quả hoặc cũng có thể trả về lỗi. Hãy cùng xem ví dụ dưới đây:

```golang
resp, err := http.Get("http://example.com/")
```

Đây là một đoạn câu lệnh dùng để gọi một API, nó sẽ trả về cho chúng ta một là kết quả, hai là lỗi. Việc của chúng ta là xử lý kết quả trả về hoặc xử lý lỗi trong trường hợp API trả về cho chúng ta lỗi:

```golang
package main

import (
  "fmt"
  "net/http"
)

func main(){
  resp, err := http.Get("http://example.com/")
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(resp)
}
```

## Returning custom error from a function

Khi chúng ta tự định nghĩa ra những function, một số trường hợp function đó sẽ trả về lỗi. Những lỗi này cần được trả về cùng với đối tượng **errors**:

```golang

func Increment(n int) (int, error) {
  if n < 0 {
    // return error object
    return nil, errors.New("math: cannot process negative number")
  }
  return (n + 1), nil
}
func main() {
  num := 5
 
  if inc, err := Increment(num); err != nil {
    fmt.Printf("Failed Number: %v, error message: %v", num, err)
  }else {
    fmt.Printf("Incremented Number: %v", inc)
  }
}
```

Đa phần những package có sẵn trong Go, hoặc kể cả những package bên ngoài mà chúng ta hay dùng, tất cả những package đó đề có những cơ chế riêng để xử lý lỗi. Những lỗi này gần như không bao giờ được bỏ qua. Chúng luôn luôn được xử lý một cách cẩn thận tại nơi mà chúng ta gọi đến những chức năng đó, như là cách mà chúng đã làm ở đoạn code trên

# Panic

**Panic** là một đối tượng nào đó không được xử lý hoặc bất ngờ gặp phải khi chúng ta thực thi một chương trình. Trong Go, **panic** không phải là cách để chúng ta xử lý những lỗi có trong chương trình, thay vào đó chúng ta nên sử dụng đối tượng errors. Khi có một **panic**, chương trình sẽ bị dừng đột ngột. Thứ mà được thực thi sau khi có một **panic** xảy ra đó là **defer**

# Defer

**Defer** là một thứ gì đó mà luôn luôn được thực thi ở cuối một function.

```golang
//Go
package main

import "fmt"

func main() {
    f()
    fmt.Println("Returned normally from f.")
}

func f() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered in f", r)
        }
    }()
    fmt.Println("Calling g.")
    g(0)
    fmt.Println("Returned normally from g.")
}

func g(i int) {
    if i > 3 {
        fmt.Println("Panicking!")
        panic(fmt.Sprintf("%v", i))
    }
    defer fmt.Println("Defer in g", i)
    fmt.Println("Printing in g", i)
    g(i + 1)
}
```

Đến đây là kết thúc loại bài viết về Golang, cảm ơn các bạn đã theo dõi

**Bài viết gốc:** [Learning Go - from zero to hero](https://medium.freecodecamp.org/learning-go-from-zero-to-hero-d2a3223b3d86)