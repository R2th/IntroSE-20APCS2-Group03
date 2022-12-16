Xin chào mọi người, nay mình sẽ giới thiệu chia sẻ những kiến thức cơ bản dễ hiểu dễ tiếp cận nhất của ngôn ngữ lập trình golang. Có thể sẽ là 1 series golang căn bản và golang web.  
về lý do chọn golang và ưu nhược điểm các bạn có thể tham khảo [tại đây](https://viblo.asia/p/nhung-ly-do-de-chon-golang-la-ngon-ngu-lap-trinh-tiep-theo-ban-nen-tim-hieu-3Q75wqrDZWb) <br>
Nào cũng bắt tay vào chinh phục ngôn ngữ con cưng của google thôi.
# Cài đặt
Mình sẽ hướng dẫn cài đặt trên ubuntu
1.  trước hết cần cập nhật ubuntu
```
$ sudo apt-get update
$ sudo apt-get -y upgrade
```
2. Tải xuống bản nén Go language <br>
`$ wget https://dl.google.com/go/go1.12.7.linux-amd64.tar.gz`
3. Giải nén và đặt nó vào thư mục usr/local
```
$ sudo tar -xvf go1.12.7.linux-amd64.tar.gz
$ sudo mv go /usr/local
```
4. Thiết lập biến môi trường  Go
Bây giờ bạn cần thiết lập các biến môi trường ngôn ngữ Go. Thông thường, bạn cần đặt 3 biến môi trường là GOROOT, GOPATH và PATH. GOROOT là vị trí nơi gói Go được cài đặt trên hệ thống của bạn.<br>
GOROOT là vị trí  Go package được cài đặt trên hệ thống của bạn .<br>
`$ export GOROOT=/usr/local/go`
GOPATH là vị trí của thư mục project. Ví dụ thư mục project của tôi là ~ /projects / Proj1.<br>
`$ export GOPATH=$HOME/Projects/Proj1`
 biến PATH để truy cập toàn hệ thống<br>
`$ export PATH=$GOPATH/bin:$GOROOT/bin:$PATH`
5. Chạy thử
Bây giờ, chúng ta có thể kiểm tra xem Go đã được cài hoàn chỉnh hay chưa, bằng cách gõ lệnh sau vào Terminal:<br>
`$ go version`
<br>
Nếu Go được cài đặt đầy đủ thì nội dung output sẽ giống thế này:
![](https://images.viblo.asia/69cb1bb0-d453-4bb1-b1f2-9f69faa102b9.png)
# Viết chương trình đầu tiên hello word
Cài đặt xong rồi thì bắt tay vào code chương trình đầu tiên thôi. Chương trình mà khi học ngôn ngữ mới nào cxung viết Hello word

Chúng ta tạo một file mới, tên là hello.go trong project và gõ đoạn chương trình sau.

```
package main

import "fmt"

func main() {
    fmt.Printf("Hello World!")
}
```
Vậy là xong rồi, chương trình rất đơn giản dễ hiểu phải không nào.<br>
Bây giờ hãy compile và chạy chương trình với lệnh:<br>
`$ go run hello.go` <br>
hoặc có thể biên dịch ra file thực thi<br>
```
$ go build
$ ./hello
```
Output sẽ là:<br>
`Hello World!`
<br>
Vậy là đã viết thành công chương trình đầu tiên sử dụng ngôn ngữ golang rồi đó.
# kết bài
Qua bài này chúng ta đã cài đặt và viết thành công chưng trình đầu tiên, hãy cùng theo dõi những bài tiếp theo để cùng mình tìm hiểu nhưng điều thú vị của ngôn ngữ này nhé. Si iu ờ gên..