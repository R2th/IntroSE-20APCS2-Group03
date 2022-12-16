## Giới thiệu
Chào các bạn tới với series về Golang, ở trong series này chúng ta sẽ tìm hiểu cơ bản về Golang thông qua các ví dụ. Sau đó ta sẽ tìm hiểu về Go cho Web Programming thông qua việc xây dựng một REST API đơn giản. Các bài ở trong series này mình tham khảo từ ba cuốn sách sau: Go In Action, Learning Go, Go Web Programming.

Ở bài đầu tiên thì chúng ta sẽ xem qua Golang là gì và cách cài đặt Golang ở môi trường local.

![image.png](https://images.viblo.asia/55921b5f-974c-4adc-86b0-06e8f1c69fe2.png)

## Golang
Go là một compiled programming language được thiết kế bởi Google, syntax của Go khá giống C.

Go được sinh ra để giải quyết một vấn đề mà một software developers hay gặp phải là khi ta phát triển một ứng dụng ta thường phải chọn giữa việc phát triển một ứng dụng nhanh hoặc performance cao.

Các ngôn ngữ như C hoặc C++ cung cấp performance rất tốt nhưng việc code lại khá phức tạp và lâu. Trong khi các ngôn ngữ khác như PHP, Ruby và Python thì ngược lại, chúng giúp ta phát triển ứng dụng rất nhanh nhưng performance thì lại không tốt bằng C và C++. **Còn đối với Go  thì nó chính là một sự kết hợp giữa performance cao và phát triển ứng dụng nhanh.**

Go có bộ compiler rất nhanh, khi ta xài Go thì việc build ra execute binary file sẽ tốn rất ít thời gian, giúp việc deploy của ta nhanh hơn khi so sánh với nodejs hoặc java. Ngoài ra file execute của Golang rất nhẹ, giảm size của ứng dụng khi ta deploy, đặc biệt khi ta xài với Docker thì size container image của Golang sẽ nhẹ hơn rất nhiều so với nodejs.

Ngoài ra Go còn có hỗ trợ concurrency và garbage collector.

## Go concurrency
Một trong những điều khó nhất đối với programmer là viết một ứng dụng mà có thể sử dụng tối đa resources của hệ thống mà ứng dụng đang chạy trên, cụ thể là sức mạnh của CPU. Các máy tính hiện nay một CPU đều có nhiều hơn một core, nhưng không phải ngôn ngữ nào cũng hỗ trợ ta sử dụng hết tài nguyên của CPU một cách hiệu quả được, ví dụ như là nodejs chỉ có thể xài 1 core của CPU, cho dù hiện tại nodejs có hỗ trợ cluster mode thì cũng là dạng master worker process chứ không phải thuần concurrency như Go.

Một trong những đặc tính nổi bật nhất của Go là concurrency, Go hỗ trợ concurrency rất tốt. Go support tính năng concurrency thông qua Channels và Goroutines, chúng ta sẽ nói về nó ở các bài sau.

![image.png](https://images.viblo.asia/f5ee5062-f9af-404b-b4d5-1d95ce7a4cfc.png)

## Garbage collector
Memory management là một vấn đề rất đau đầu đối với programmer, quản lý memory không tốt sẽ dẫn tới việc ứng dụng của ta bị crash hoặc tràn bộ nhớ (leak memory), thậm chí có thể dẫn tới crash hệ thống mà ứng dụng đang chạy trên đó.

Go có hỗ trợ garbage collector mà sẽ giúp ta quản lý memory một cách hiệu quả nhất, tránh việc ứng dụng của ta bị leak memory.

![image.png](https://images.viblo.asia/3102acd0-a0d4-48bf-b92b-8ac4e503f14e.png)

## Install Golang
Tiếp theo ta sẽ tiến hành cài đặt Golang lên máy local của ta để bắt đầu code nào 😁. Nếu các bạn xài Window thì đơn giản chỉ cần truy cập trang này https://go.dev/dl/ và tải file cài đặt xuống và bấm cài thôi. Còn nếu bạn xài Mac thì còn dễ hơn nữa, các bạn gõ câu này.

```
brew install go
```

Còn đối với môi trường linux, ta cài như sau.

### Linux
1. Tải source code.

```
wget https://go.dev/dl/go1.18.1.linux-amd64.tar.gz
```

2. Extract file.

```
tar -C /usr/local -xzf go1.18.1.linux-amd64.tar.gz
```

3. Gán vào $PATH.

```
echo 'export PATH=$PATH:/usr/local/go/bin' >> $HOME/.profile
source $HOME/.profile
```

4. Kiểm tra xem ta cài thành công chưa.

```
go version
```

## Go module
Đối với các version trước của Go, khi ta muốn code với một project mà có nhiều folder con thì ta phải tạo workspace ở trong thư mục của $GOPATH. Còn tại thời điểm mình viết bài này thì việc code Go đã đơn giản hơn nhiều, ta có thể tạo folder ở đâu cũng được và sử dụng câu lệnh `go mod init` để tạo module. Ta sẽ tìm hiểu kĩ hơn về module ở các bài sau.

Thì nói lý thuyết nhiều rồi, tiếp theo ta sẽ làm ví dụ hello world trong Golang nào.

## Hello World
Tạo một file tên là `main.go` với đoạn code như sau.

```main.go
package main

import "fmt"

func main() {
	fmt.Println("Hello world")
}
```

Để chạy Go code ta dùng câu lệnh go run.

```
$ go run main.go

Hello world
```

Để đem file này chạy ở nhiều nơi khác nhau, ta cần phải build nó ra execute binary file. Ta build Go file như sau.

```
GOOS=linux go build -o hello
```

Sau đó ta chạy file build như sau.

```
$ ./hello

Hello world
```

## Golint
Khi ta code với một team thì việc thống nhất format và style guidelines cũng rất quan trọng, golint là công cụ giúp ta làm việc đó một cách dễ dàng hơn. Việc cài golint cũng rất đơn giản, ta chỉ cần chạy câu lệnh sau.

```
go install golang.org/x/lint/golint@latest
```

Sau đó, để format code ta chạy như sau.

```
golint .
```

Các bạn xem ở link https://github.com/golangci/golangci-lint#configfile  này để biết rõ hơn về các config rule.

## Kết luận
Vậy là ta đã tìm hiểu xong cơ bản về Go 😁. Go là một ngôn ngữ rất hữu dụng trong việc viết nên một ứng dụng với performance cao và thời gian dev cũng khá nhanh, vì nó có hỗ trợ cho ta rất nhiều thư viện và công cụ có sẵn. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java, Go). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java, Go). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.