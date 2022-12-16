![image.png](https://images.viblo.asia/2ac6fe46-0110-4737-a655-704ba1db598e.png)

Nếu các bạn là người mới, chỉ tò mò về Golang và muốn thử nghiệm một vài dòng lệnh cơ bản thì Golang đã có sẵn một công cụ online tại [đây](https://go.dev/tour/welcome/1).

Tuy nhiên việc lập trình Golang trên máy tính cá nhân thì sẽ yêu cầu một vài thiết lập. Mọi thứ cũng đơn giản thôi và ta cùng bắt đầu nhé.

## 1. Cài đặt Golang Compiler
Vì Golang là ngôn ngữ lập trình phải được biên dịch (compile) thành mã máy để thực thi. Vì thế việc cài đặt compiler cho nó là bắt buộc. Gói cài đặt này còn bao gồm cả SDK, các thư viện gốc, các câu lệnh cần thiết để thiết lập môi trường lập trình Golang.

Để cài đặt Golang thì các bạn cần truy cập vào: https://go.dev/dl/ và chọn gói cài đặt tương thích với hệ điều hành máy tính của các bạn. Ví dụ mình đang dùng máy Mac nên sẽ chọn gói install cho MacOS.

Tại thời điểm bài viết này thì Golang đang có version 1.18.2. Mình khuyến khích các bạn cũng nên dùng từ version 1.18 trở lên vì có rất nhiều thay đổi và cải tiến. Một trong số đó là Generics mà mình đã có một bài viết ngay bên dưới:

https://200lab.io/blog/generics-trong-golang/

## 2. Lựa chọn và cài đặt text editor cho Golang
Để lập trình Golang, các bạn có thể sử dụng bất kỳ một editor (trình soạn thảo văn bản) mà các bạn yêu thích. Chúng có thể là Sublime Text, Vim, Visual Studio Code, GoLand,...

Bản thân mình thực sự yêu thích [GoLand](https://www.jetbrains.com/go/) vì nó thực sự rất mạnh và hỗ trợ được hầu hết các tác vụ để phát triển các service Golang. Đổi lại thì GoLand khá nặng và có phí duy trì: 199$/năm. Các bạn nếu còn email sinh viên thì có thể sử dụng miễn phí editor này nhé.

Một lựa chọn editor phổ biến hơn đó là Visual Studio Code, hoàn toàn miễn phí và gọn nhẹ. Mình sẽ hướng dẫn các bạn dùng Visual Studio Code để code Golang:

1. Tải và cài đặt Visual Studio Code tại: https://code.visualstudio.com/Download
2. . Khởi động Visual Studio Code và chuyển đến tab Extension.
3. Tìm kiếm extension "Go" và chọn extension "Go" có dấu stick xanh "Go Team at Google". Sau đó bấm cài đặt extension này và khởi động lại editor.
4. Extension Go sẽ yêu cầu thêm một số tools bổ sung, các bạn hãy chọn cho phép cài đặt chúng khi có popup hỏi nhé.

![image.png](https://images.viblo.asia/3cc7e42d-a80b-43e9-983c-8e79731ef94a.png)

## 3. Viết chương trình Golang đầu tiên với Visual Studio Code
1. Tạo một thư mục để chứa source code Golang. VD: first-golang-app
2. . Khởi động Visual Studio Code và Open Folder bạn tạo ở bước 1.
3. Tạo file mới trong folder này và đặt tên là "main.go"
4. Copy và paste đoạn code dưới đây vào file main.go

```
package main

import "fmt"

func main() {
	fmt.Println("Hello world")
}
```

![image.png](https://images.viblo.asia/0a22b00d-d930-4068-8bd1-9833a1709b27.png)

Khả năng ở bước này các bạn sẽ bắt gặp một popup yêu cầu thêm một số tools bổ sung, các bạn hãy chọn cho phép cài đặt chúng nhé.

Bởi vì chúng ta đang sử dụng Go v1.18.x nên việc tạo file Go Modules là bắt buộc. File này sẽ có tên là "go.mod" trong thư mục chứa code. Để tạo file này sẽ có 2 cách:

Dùng Terminal của chính Visual Studio Code, gõ lệnh go mod init first-app
Hoặc chỉ đơn giản là tạo file mới với nội dung như dưới đây:

![image.png](https://images.viblo.asia/6e6ad054-25fd-474f-9734-b757519b8d14.png)

Trong đó first-app chỉ là tên tự đặt, các bạn có thể dùng tên khác nhé.

## 4. Chạy thử chương trình Golang đầu tiên với Visual Studio Code
Có 2 cách để build và run code Golang: sử dụng công cụ Run của editor hoặc thông qua câu lệnh (Terminal).

### Build và Run code Golang ngay trong Visual Studio Code:
Trong Visual Studio Code các bạn chuyển đến tab Run & Debug.
Bấm nút Run để editor tiến hành complie và chạy chương trình.

![image.png](https://images.viblo.asia/4ecaaf8a-fca5-4a8c-881f-e458f4f9a3de.png)

### Run code Golang bằng câu lệnh Go Run
1. Sử dụng terminal (console) trong máy tính và chuyển con trỏ đường dẫn đến thư mục chứa code Golang.
2. . Nhập lệnh `go run main.go`

![image.png](https://images.viblo.asia/a0a3013f-91a4-4a2b-ac57-9db2f9ccc4db.png)

Với cách này thực tế là lệnh Go cũng làm 2 bước: compile và run. Các bạn đừng hiểu nhầm là Go đang run code như script nha.

### Compile code Golang ra file thực thi bằng câu lệnh Go Build
1. Sử dụng terminal (console) trong máy tính và chuyển con trỏ đường dẫn đến thư mục chứa code Golang.
2. . Nhập lệnh go build -o app để compile code Golang thành file thực thi tên "app". Thực ra "-o app" là không bắt buộc, vì muốn chỉ định tên file nên mình thêm vào.
3. Chạy file với lệnh ./app (hoặc double click vào file)

![image.png](https://images.viblo.asia/0a298c55-9ae4-412b-b4ec-5a469beeed5e.png)

Hy vọng qua bài viết này các bạn đã có thể sử dụng được Visual Studio Code để lập trình Golang nhé.

Trong bài viết sau mình sẽ hướng dẫn các bạn xây dựng một REST API Golang cơ bản cho một ứng dụng quản lý TODO List:

https://200lab.io/blog/lap-trinh-rest-api-todo-list-voi-golang/

Xem bài viết gốc tại: https://200lab.io/blog/huong-dan-setup-moi-truong-lap-trinh-golang/