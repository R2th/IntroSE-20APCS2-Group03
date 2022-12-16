Nếu bạn có riêng 1 server linux. Bạn có thể up site của mình trên đó. Tuy nhiên nếu chỉ dùng để chạy 1 site nào đó thì thật lãng phí. Với mình có rất nhiều thứ hay ho mình có thể sử dụng nó. Chẳng hạn như bạn có thể dùng server để làm một proxy hoặc sử dụng làm vpn, hoặc sử dụng ip server để ẩn danh truy cập 1 vài nơi nào đó. Những lúc rảnh rỗi có thể viết vài script nho nhỏ để tạo thành 1 vài service đơn giản. Hôm nay mình sẽ hướng dẫn sử dụng server để bắt nó chạy 1 công việc nào đó và lặp đi lặp lại hằng ngày.

## Đăng ký 1 server online

Ngày nay chi phí để thuê 1 server rất rẻ có rất nhiều các cloud cho bạn thuê với chi phí chỉ 5$ /tháng cho 1 con server đủ dùng bạn có thể tham khảo 1 vài nơi cung cấp nổi tiếng như
* [https://www.digitalocean.com/](https://www.digitalocean.com)
* [https://www.linode.com/](https://www.linode.com)
*  [https://aws.amazon.com/ec2](https://aws.amazon.com/ec2)
*   ...

Khi đã có sẵn 1 server riêng rồi hãy cài OS và những thứ cần thiết lên trên đó.  Mình thích `golang` mình sẽ cài lên đó phiên bản `go` mới nhất tại thời điểm này bạn có thể tham khảo tại [https://golang.org/doc/install](https://golang.org/doc/install)
```sh
$ tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
```

Trên server của mình đã cài sẵn ubuntu và `go`. Nhiệm vụ bây giờ là sẽ viết 1 script nào đó và đặt trên đó bắt server phải chạy job đó mỗi ngày.

## Chương trình
Một vài chương trình đơn giản nhất bạn có thể làm đó là tạo ứng dụng nhắc nhở. Công việc này được lặp đi lặp lại qua từng ngày giả sử bạn đặt lịch báo thức 8h sáng dịch vụ bắn notification về cho bạn nhắc bạn đến giờ đi làm. Chiều 6h bắn notification nhắc bạn tập thể dục cứ đều đặn như vậy qua từng ngày.

Mình sẽ hướng dẫn làm 1 ứng dụng kiểu như thế chỉ đơn giản vỏn vẹn với vài dòng code.
Kênh thông báo mình sẽ sử dụng `slack` vì webhook của slack rất hay.

Mở IDE của bạn lên và code ngắn gọn vài dòng.

```go
func sendToSlack(content string) (err error) {
	client := &http.Client{}
        //  Url Tới webhook lấy từ Incoming WebHooks
	url := "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
	var jsonStr = []byte(`{"text":"` + content + `"}`)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	req.Header.Add("Content-Type", "application/json")

	_, responseErr := client.Do(req)

	return responseErr
}
```

Với method trên bạn đã có 1 phương thức trong đó giá trị truyền vào là thông điệp bạn muốn bắn notification
hệ thống sẽ check giờ và kiểm tra tới giờ đó hay chưa sẽ tự động gửi

hàm main chính của mình sẽ như sau

```go
func main() {
	sendToSlack("Have a nice day! I want to alarm ...")
}
```
Test thử ứng dụng bằng cách bật terminal lên và run thử

```sh
go run main.go
```
Nếu bạn thấy 1 con bot chat gửi thông điệp đó tới kênh `slack` của bạn tức là chương trình đã chạy thành công!

## Cài đặt lên server
Trước khi cài đặt hãy build ứng dụng ra
```sh
go build
```
vậy là bạn có ngay 1 chương trình nho nhỏ dành riêng cho mình, việc còn lại là ném nó lên server và cấu hình `crontab`

Với server `ubuntu` bạn chỉ cần chèn lệnh

```sh
crontab -e
```
việc làm này sẽ mở 1 crontab cá nhân với config tuỳ chỉnh của  bạn
cú pháp như sau

```sh
minute hour day-of-month month day-of-week command
# * * * * * Các thông số trên là tương ứng với các *
```

Giả sử file main vừa build ra của mình đặt trên server nằm ở thư mục `/var/www/app` và mình muốn nó chạy hàng ngày lúc 07:30
mình sẽ config như sau

```sh
30 07 * * * cd /var/www/app && ./main
```

## Kết luận
Trên đây chỉ là 1 ứng dụng nho nhỏ và cơ bản với linux mình cũng ko có nhiều thời gian để viết chi tiết các tham số đưa vào config được. Với `golang` các bạn có thể tận dụng nó để viết mọi chương trình ứng dụng rất nhỏ gọn và nhẹ nhàng. Cám ơn các bạn đã đọc bài viết của mình.