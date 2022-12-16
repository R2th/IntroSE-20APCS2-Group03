Việc đầu tiền để bắt đầu một dự án với một ngôn ngữ ngoài thư viện thứ ba sẵn có và package management đó là làm sao cho chúng có thể làm việc với nhau. Trong bài viết này sẽ giới thiệu về go module ecosystem.

### Package manager là gì?
Một package manager là một tool để tự động xử lý build code, tải, cập nhật và xóa các dependencies của project theo một cách phù hợp. Nó có thể xác định version cụ thể của package đã được cài trong project sau đó cài đặt hoặc cập nhật package thường từ một remote host.
Package manager đã dùng từ rất lâu, đưa vào sử dụng đầu tiên trong hệ điều hành sau đó trong môi trường lập trình. Có sự khác biệt giữa package manager cho system-level và language-level trong đó cũng có sự lấn lên nhau rất đáng kể về cách làm việc.

Trong ngữ cảnh ngôn ngữ một package manager làm dễ dàng để làm việc với thư viện first-party và third-party bằng giúp chúng ta xác định và tải project dependencies và xác định các version, khoảng version có thể, cho phép cập nhật dependencies mà không cần lo về gây lỗi. Một số package manager có thể hỗ trợ lock file để đảm bảo khi tái tạo trong bật kỳ môi trường.

Cho đến này package manager là một việc quan trọng giúp quyết định để tiếp cận một ngôn ngữ lập trình mới, Vd: Ruby có Ruby Gems, Node.js có npm,... `$ gem install dotenv`

Trong năm 2018, Go team đã giới thiệu [Go modules](https://github.com/golang/go/wiki/Modules) với mục đích bổ sung khoảng cách trong ecosystem. Tính năng này chưa set mặc định trong Go 1.11, để bật cần phải set $GO111MODULE là on trong biến môi trường. Cho đến thời điểm viết bài này Go 1.14 đã bật mặc định.

Phần tiếp theo này sẽ đi qua cách làm việc của Go modules để giúp các bạn hiểu biết nhanh hơn thay vì mất nhiều thời gian thử và gặp lỗi.

### GOPATH
Trước khi đến Go modules, project cần tạo trong `$GOPATH` là một biến môi trường chỉ thư mục làm viẹc của Go. Thự mục làm việc này là nơi Go quan lý các file, dependencies và binaries đã cài. `GOPATH` được giả định mặc định nằm ở `$HOME/go` trong Unix system và `%USERPROFILE%\go` trong Windows.

Cơ chế sử dụng của `$GOPATH` không linh hoạt và gây nhầm lẫn cho người mới bắt đầu học Go để cài đặt môi trường development và hiểu về compiler quan lý dependencies cho một project. Ngoài ra, versioning packages không hỗ trợ chính thức trong ngôn ngữ(Giống như Gemfile cho một Ruby project).

Từ Go v1.13, cơ chế của `$GOPATH` được cải tiến, trong khi third-party dependencies mặc định vẫn nằm trong GOPATH, cho phép tạo project bất kỳ thư mục khác trong filesystem, đóng gói(vendoring) và package versioning được hỗ trợ với `go` tool.

### Go Modules
Khởi tạo một project sử dụng các modules với command dưới đây ở thư mục root của project
```rust
$ go mod init <module name>
```

Tên của module là import path, cho phép import nội bộ để giải quyết trong module. Đây là cách các project khác sẽ import các modules của bạn(thường là URL của repo chứa code).
Giá sử tên project là `example` và để dùng module trong project có thể dùng command sau:
```markdown
$ go mod init github.com/hotsun/example
go: creating new go.mod: module github.com/hotsun/example
```
Command trên sẽ tạo một file `go.mod` trong thư mục root project, trong đó sẽ có import path cho project và thông tin version của Go(tương tự Gemfile đối với Go).

```markdown
$ cat go.mod
module github.com/hotsun/example

go 1.14
```

### Cài đặt dependencies
Lý do chính Go modules được giới thiệu để làm cho việc quản lý dependency dễ dàng hơn. Thêm dependency trong project có thể dùng `go get`

`$ go get github.com/joho/godotenv`

Để cụ thể branch:
`$ go get github.com/joho/godotenv@master`

Hoặ cụ thể version:

`$ go get github.com/joho/godotenv@v1.2.0`

thậm chí commit:

`$ go get github.com/joho/godotenv@d6ee687`

Hãy xem lại `go.mod`:
```markdown
$ cat go.mod
module github.com/hotsun/example

go 1.14

require github.com/joho/godotenv v1.3.0 // indirect
```

`// indirect` comment chỉ rằng package này chưa được dùng trong project hoặc khi package sử dụng là một package không trực tiếp(là dependency của dependency khác).

Chúng ta có thể impỏt và dùng package `godotenv` mới cài bằng cụ thể nó trong import path và dùng các exported methods.

```go
// main.go
package main

import (
    "github.com/joho/godotenv"
)

func main() {
    godotenv.Load()
}
```
Chạy `go mod tidy` trong terminal để update file `go.mod`. Command này sẽ xóa các dependencies không dùng trong project và thêm mới khi chưa có.
Trước khi release và mỗi commit nên chạy `go mod tidy` để chắc chắc module file clean và chính xác. File này xử lý tất cả thông tin yêu cầu cần thiết khi tái tạo.
Tại thời điểm này sẽ có một file `go.sum` trong root project, nó không phải lock file(Gemfile.lock) nhưng bảo trì cho mục đích chứa cryptographic hashes của nội dùng cụ thể version mà module trong project dựa vào mà không thay đổi như mong muốn, malicious, rủi rò, hoặc lý do khác.

```scala:scala
$ cat go.sum
github.com/joho/godotenv v1.3.0 h1:Zjp+RcGpHhGlrMbJzXTrZZPrWj+1vfm90La1wgB6Bhc=
github.com/joho/godotenv v1.3.0/go.mod h1:7hK45KPybAkOC6peb+G5yklZfMxEjkZhHbwpqxOKXbg=
```
Tất cả modules đã tải về được cached nội bộ trong thư mục mặc định `$GOPATH/pkg/mod`. Nếu chúng ta import vào trong project mà không tải nó sẽ dùng `go get`, tag version cuối cùng của module cùng cấp sẽ chọn package để cài vào tự động và thêm trong `go.mod` file khi chạy `go build` hoặc `go test` trước khi project được compiled.

Hãy xem khi thêm dependency mới [color](https://github.com/gookit/color) package vào  project 

```go
package main

import (
    "github.com/joho/godotenv"
    "gopkg.in/gookit/color.v1"
)

func main() {
    godotenv.Load()
    color.Red.Println("Red color")
}
```
Chạy `go build` sẽ đêm package và thêm nó vào trong `go.mod` file
```
go build
go: finding module for package gopkg.in/gookit/color.v1
go: downloading gopkg.in/gookit/color.v1 v1.1.6
go: found gopkg.in/gookit/color.v1 in gopkg.in/gookit/color.v1 v1.1.6

~/Programming/go/example 12s
❯ cat go.mod
module github.com/hotsun/example

go 1.14

require (
	github.com/joho/godotenv v1.3.0
	gopkg.in/gookit/color.v1 v1.1.6
)
```

### Cập nhật các dependencies
Go modules sử dụng hệ thống [Semantic Versioning](https://semver.org/) (Semver) để versioning trong đó có ba phần: major, minor và patch. Một package trong version 1.2.3 có 1 là major version, 2 là minor version và 3 là patch version.

### Minor hoặc patch version
`go get -u` hoặc `go get -u=patch` dùng để cập nhật một package sang minor latest hoặc patch version tương ứng nhưng không thể làm cách này cho cập nhật major version. Vì cập nhật của major version có semantics khác cho việc phát hành và bảo trì.

### Major version
Quy ước cho việc chọn code vào các modules Go là sử dụng một đường dẫn module khác nhau cho mỗi major version mới. Bắt đầu từ v2, đường dẫn phải kết thúc trong phiên bản chính. Vd: nếu developer của `godotenv` thay đổi phát hành major version, đường dẫn module sẽ đổi sang `[github.com/joho/godotenv/v2](http://github.com/joho/godotenv/v2)` để cho các bạn có thể cập nhật nó. Với đường dẫn module `github.com/joho/godotenv` vẫn chỉ đến package v1.

Hãy xem ví dụ sau, build một CLI app sử dụng v1 của [cli package](https://github.com/urfave/cli/)

```go
package main

import (
  "os"
  "github.com/urfave/cli"
)

func main() {
  (&cli.App{}).Run(os.Args)
}

```

```markdown
$ go build
go: finding module for package github.com/urfave/cli
go: downloading github.com/urfave/cli v1.22.4
go: found github.com/urfave/cli in github.com/urfave/cli v1.22.4
go: downloading github.com/cpuguy83/go-md2man/v2 v2.0.0-20190314233015-f79a8a8ca69d
go: downloading github.com/russross/blackfriday/v2 v2.0.1
go: downloading github.com/shurcooL/sanitized_anchor_name v1.0.0

$ go mod tidy
go: downloading github.com/pmezard/go-difflib v1.0.0

$ cat go.mod
module github.com/hotsun/example

go 1.14

require github.com/urfave/cli v1.22.4
```

Bây giờ muốn update sang package v2, việc cần làm là thay thế đường dẫn v1 sang v2. Bạn nên đọc tài liệu tham khảo của package đang cần cập nhật, vậy các thay đổi khác cần sửa vào code sẽ được mô tả.

```go
package main

import (
  "os"
  "github.com/urfave/cli/v2"
)

func main() {
  (&cli.App{}).Run(os.Args)
}
```
Chạy `go build` một lần nữa sẽ thêm package v2 vào đường dẫn import với v1:
```
$ go build
go: finding module for package github.com/urfave/cli/v2
go: downloading github.com/urfave/cli/v2 v2.2.0
go: found github.com/urfave/cli/v2 in github.com/urfave/cli/v2 v2.2.0

$ cat go.mod
module github.com/hotsun/example

go 1.14

require (
	github.com/urfave/cli v1.22.4
	github.com/urfave/cli/v2 v2.2.0
)
```

Khi cập nhật thành công có thể chạy `go mod tidy` để bỏ v1 dependency không được dùng nữa từ file `go.mod`. Với quy ứơc này cho phép sử dụng đường dẫn module khác nhau cho major version được biết là [semantic import versions](https://research.swtch.com/vgo-import), tận dụng việc này để dùng đồng thời nhiều version của một package khi thực hiện giá tăng chuyển đổi trong codebase lớn.

### Xóa các dependencies
Chỉ cần xóa tất cả package trỏ đến trong project sẽ xóa một depenency từ project và chạy `go mod tidy` để dọn dẹp `go.mod` file. Nhớ rằng nội dung cryptographic hash của một gói vẫn còn trong `go.sum` sau khi package xóa.

### Đóng gói dependencies
Như đã nêu trên tất cả dependencies cho một project được đặt mặc định ở trong thư mục `$GOPATH/pkg/mod`. Đóng gói là copy tất cả các third-party package mà project sử dụng và đặt nó trong một thư mục `vendor` trong project. Đây là một cách để đảm bảo sự ổn định của việc build production mà không phụ thuộc vào các services bên ngoài.

Các lợi ích của việc đóng gói:
- Cho phép dùng git diff để xem các thay đổi khi cập nhật dependency và lịch sử thay đổi sẽ bảo trì trong git repo.
- Nếu một package tự dưng mất từ interent, thoát được vấn đề :v 

Đây là cách đóng gói trong Go:
```markdown
$ go mod tidy
$ go mod vendor
```

Với command thứ 2 nó sẽ tạo một thư mục `vendor` trong root và tất cả dependencies cần thiết sẽ được copy và thư mục này nên cho vào trong git version control.

### Kết luận
Trong bài viết đã nêu lên các khái niệm cơ bản đối với Go modules và những bước đầu tiên tiếp cận với Golang.
Cảm ơn các bạn đã đọc!

#### Tham khảo
- [Go pkg](https://golang.org/pkg/)
- [Go wiki](https://github.com/golang/go/wiki)
- [godotenv](https://github.com/joho/godotenv)
- [cli](github.com/urfave/cli)