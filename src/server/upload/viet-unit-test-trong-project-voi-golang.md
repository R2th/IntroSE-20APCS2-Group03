![](https://images.viblo.asia/21419ef4-ffe8-4d04-8f12-2974a61690df.png)

Ở các phần trước, chúng ta đã hoàn thành các chức năng cơ bản của 1 webserver golang như Login, Register, CRUD. Mục đích bài viết nhằm giới thiệu một cách cơ bản cách triển khai, viết unit test với Golang. Cách viết các testcase phức tạp, đòi hỏi nhiều công phu hơn sẽ chưa được giới thiệu trong bài viết này. Mong là sẽ sớm được giới thiệu với các bạn trong một bài viết không xa.

## 1. Giới thiệu

Go cung cấp 2 thư viện tiêu chuẩn dùng để viết test:
- [testing](https://godoc.org/testing): Cung cấp các chức năng kiểm thử tự động cơ bản
- [httptest](https://godoc.org/net/http/httptest): Cung cấp các chức năng để kiểm thử http

Ngoài ra còn khá nhiều thư viện, framework test do bên thứ 3 phát triển như [gocheck](https://github.com/go-check/check), [ginkgo](https://github.com/onsi/ginkgo), v.v

Các file test khi dùng package `testing` có phần đuôi ở tên là `_test.go`. Ví dụ ta có file `hello.go` thì file test sẽ tên là `hello_test.go` Thêm nữa, tên hàm test sẽ có dạng

```go
// Xxx không được bắt đầu bằng chữ thường
func TestXxx(*testing.T)
```

Hàm Test truyền vào 1 tham số kiểu con trỏ kiểu `T` của thư viện testing. kiểu `T` chứa các phương thức hỗ trợ việc quản lý trạng thái của testcase cũng như hỗ trợ việc format logs in ra của testcase thông qua các phương thức `Error`, `Errorf`, `Fail`, `Log`, v.v. Chi tiết tất cả phương thức của kiểu `T` và cách sử dụng các bạn có thể xem chi tiết ở [đây](https://godoc.org/testing#T).
```go
type T struct {
	common
	isParallel bool
	context    *testContext // For running tests and subtests.
}
```


## 2. Viết testcase với thư viện testing

Chúng ta có ví dụ đơn giản như sau:

```go
// hello.go
package main

import "fmt"

func hello(name string) string {
	if name == "" {
		return fmt.Sprintf("What is your name ?")
	} else {
		return fmt.Sprintf("Hello %s", name)
	}
}
```

```go
// hello_test.go
package main

import "testing"

func TestHello(t *testing.T) {
	emptyNameResult := hello("")

	if emptyNameResult != "What is your name ?" {
		t.Errorf("Output expect What is your name ? instead of %v", emptyNameResult)
	}

	result := hello("Gopher")

	if result != "Hello Gopher" {
		t.Errorf("Output expect Hello Gopher instead of %v", result)
	}
}
```

- Hàm `hello` thực hiện chức năng cơ bản là trả về `Hello` + `tham số name` truyền vào. Nếu `name` rỗng thì trả về chuỗi `What is your name ?`.
- Hàm `TestHello` kiểm tra 2 khả năng đầu ra của hàm `hello`. Nếu giá trị trả về khác với đầu ra kỳ vọng thì test sẽ failed.
- Phương thức `t.Errorf` cũng như `t.Error` có chức năng đánh dấu các test `failed` nếu đầu ra không đúng kỳ vọng. Sau khi thực thi xong, code trong hàm `TestHello` vẫn tiếp tục được thực thi.  `t.Errorf` khác `t.Error` giống như `fmt.Printlnf` khác `fmt.Println`.

Chúng ta chạy thử test, test case pass vì giá trị trả về khớp với kỳ vọng.

![](https://images.viblo.asia/1aa35e89-6095-4b69-9e0a-b3a2b0190b9c.png)

Chúng ta thử sửa hàm `hello` một chút và giữ nguyên hàm `TestHello`

```go
func hello(name string) string {
	if name == "" {
		return fmt.Sprintf("You do not have name !")
	} else {
		return fmt.Sprintf("Hello %s", name)
	}
}
```

**Run test case:** 

![](https://images.viblo.asia/d2905698-2e79-4729-bfa3-9f664f53ffd7.png)

Output thực tế là `You do not have name !` thay vì `What is your name ?` như kỳ vọng.

**Kiểm tra test coverage**

![](https://images.viblo.asia/ce169a60-b96c-4a59-8482-f2f15e502b79.png)

coverage 100%, tuyệt vời :sunglasses:

## 3. Viết testcase với thư viện httptest

```go
// server.go
package main

import (
	"fmt"
	_ "encoding/json"
	"net/http"
)

func welcome(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, "Welcome to our website")
	return
}

func main() {
	http.HandleFunc("/", welcome)
	
	http.ListenAndServe(":3000", nil)
}
```

```go
// server_test.go
package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestWelcome(t *testing.T) {
	mux := http.NewServeMux()
	mux.HandleFunc("/", welcome)

	writer := httptest.NewRecorder()
	request, _ := http.NewRequest("GET", "/", nil)
	mux.ServeHTTP(writer, request)

	if writer.Code != 200 {
		t.Errorf("Response code is %v", writer.Code)
	}
}
```

- Hàm `Welcome` đơn giản thực hiện trả về `client` thông điệp `Welcome to our website` khi người dùng truy cập vào `http//localhost:3000`.
- Hàm `TestWelcome` sẽ cần tạo một webserver riêng (với multiplexer mặc định của thư viện net/http). Kết quả status code trả về được kiểm tra, nếu khác `200` thì test sẽ failed.

![](https://images.viblo.asia/252a1003-bc9a-4d6b-8ce2-21666e9ca494.png)

## 3. Viết testcase bằng thư viện của bên thứ 3

Các thư viện được hỗ trợ chính thức bởi Go Team như `testing` hay `httptesting` đơn giản, dễ học, dễ dùng. Tuy nhiên, với các ứng dụng trung bình đến lớn, lượng testcase cần viết nhiều hay sử dụng các phương pháp viết test tối tân hơn như [double test](https://en.wikipedia.org/wiki/Test_double) thì chúng lại cho thấy sự hạn chế nhất định. Đó là lúc cần đến những công cụ mạnh mẽ hơn từ bên thứ 3.

### Gocheck

**Cài đặt**:

```bash
go get -u gopkg.in/check.v1
```

```go
// person_test.go

package demo_test

import (
    "testing"
    . "gopkg.in/check.v1"
)

// Hook up gocheck into the "go test" runner.
func Test(t *testing.T) { TestingT(t) }

type Person struct{
	name string
	age uint64
	country string
}

func (p *Person) IsAdult() bool {
	if p.age < 18 {
		return false
	}

	return true
}

func (p *Person) IsVietNamese() bool {
	if p.country == "VietNam" || p.country == "VN" {
		return true
	}

	return false
}


var _ = Suite(&Person{})

func (s *Person) TestIsAdult(c *C) {
	conglt := Person{"conglt", 20, "VietNam"}
    c.Assert(conglt.IsAdult(), Equals, true)
}

func (s *Person) TestIsVietNamese(c *C) {
	conglt := Person{"conglt", 20, "DaiViet"}
    c.Assert(conglt.IsVietNamese(), Equals, false)
}
```

```go
func Suite(suite interface{}) interface{}
```

- Hàm `Suite` có nhiệm vụ đăng ký đối tượng cần kiểm thử, ở đoạn code trên ngụ ý rằng ta cần kiểm thử các phương thức của struct `Person`. Bất kỳ phương thức nào bắt đầu bằng tiền tố **Test** sẽ được coi là phương thức kiểm thử.
- Hàm `func TestingT(testingT *testing.T)` sẽ có nhiệm vụ chạy các testcase ứng với đối tượng được đăng ký trong hàm `Suite`.
- Giả sử ta tạo mới một struct là `Personal` và thay thế câu lệnh `var _ = Suite(&Person{})` bằng `var _ = Suite(&Personal{})`

Chạy go test lên:

![](https://images.viblo.asia/7302899d-dd0b-4a62-bb93-aa62e7543f96.png)

Như chúng ta thấy, không có testcase nào được chạy do chúng ta chẳng viết bất cứ hàm nào để test `Personal` cả. Đổi lại như cũ và chạy `go test`, ta sẽ có 2 testcase của `Person` như sau.

![](https://images.viblo.asia/7b15b509-3044-4f59-80a2-a1a2fef5d010.png)

![](https://images.viblo.asia/2ac34238-7f1b-40dd-9555-67f881252726.png)



### Ginkgo

Ginkgo là một framework hỗ trợ việc kiểm thử trong Go. So với **Gocheck**, **Ginkgo** mạnh mẽ, cũng như hỗ trợ nhiều tính năng hơn. Nếu các bạn đã từng viết test cho Javascript thì hẳn sẽ thấy quen thuộc khi làm quen với Ginkgo.

**Cài đặt**:

```bash
go get github.com/onsi/ginkgo/ginkgo
go get github.com/onsi/gomega/...
```

Đi kèm với **Ginko**, chúng ta cài đặt thêm [Gomega](http://onsi.github.io/gomega/#getting-gomega) là một matcher/assertion library, tương tự như thư viện [Chai](https://www.chaijs.com/) bên Javascript. Nó giúp kiểm tra các giá trị trả về có đúng với kỳ vọng hay không ?

**Demo**

Ở ví dụ này chúng ta định nghĩa `struct` **Book** gồm có 3 thông tin và method `CategoryByLength` để phân loại sách theo số trang. Lớn hơn bằng 300 trang thì thuộc dạng `NOVEL`, bé hơn 300 trang thì trả về `SHORT STORY`. 

```bash
mkdir ginkgo
cd ginkgo
go mod int github.com/conglt10/test-ginkgo # Tên package bạn có thể đặt tên bất kỳ
```

```go
// book.go
package book

type Book struct {
	Title string
	Author string
 	Pages uint64
}

func (b *Book) CategoryByLength() string {
	if (b.Pages >= 300) {
		return "NOVEL"
	} else {
		return "SHORT STORY"
	}
}
```

```go
// book_test.go

package book_test

import (
	. "github.com/conglt10/test-ginkgo"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Book", func() {
    var (
        longBook  Book
        shortBook Book
    )

    BeforeEach(func() {
        longBook = Book{
            Title:  "Les Miserables",
            Author: "Victor Hugo",
            Pages:  1488,
        }

        shortBook = Book{
            Title:  "Fox In Socks",
            Author: "Dr. Seuss",
            Pages:  24,
        }
    })

    Describe("Categorizing book length", func() {
        Context("With more than 300 pages", func() {
            It("should be a novel", func() {
                Expect(longBook.CategoryByLength()).To(Equal("NOVEL"))
            })
        })

        Context("With fewer than 300 pages", func() {
            It("should be a short story", func() {
                Expect(shortBook.CategoryByLength()).To(Equal("SHORT STORY"))
            })
        })
    })
})
```

- File `book_test.go` ta viết test để test method `CategoryByLength`
- Ta fake 2 biến dữ liệu đại dại cho 2 loại sách
- Khi gọi phương thức `CategoryByLength` với biến `longBook`, ta dùng các hàm của thư viện [Gomega](http://onsi.github.io/gomega/#getting-gomega) để kiểm tra giá trị trả về có như mong đợi là `NOVEL` hay không ? Tương tự với biến `shortBook`.

Chạy test thôi :laughing:

![](https://images.viblo.asia/9dad2e74-e710-4a94-aef9-2eb0e7eecd90.png)


## Tài liệu tham khảo

https://www.manning.com/books/go-web-programming

https://medium.com/rungo/unit-testing-made-easy-in-go-25077669318

https://onsi.github.io/ginkgo/

http://onsi.github.io/gomega