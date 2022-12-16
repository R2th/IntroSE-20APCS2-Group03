Trong quá trình sử dụng máy tính thì việc khởi động lại hay tắt máy đã quá quen thuộc với chúng ta. Với các máy tính hệ điều hành linux thì mình cũng thường xuyên khởi động lại hay tắt máy tính bằng cách dùng chuột click vào nút nguồn rồi chọn tắt máy hay khởi động lại, ngoài cách này ra thì chúng ta cũng có thể dùng công phu nhất dương chỉ hay có thể hiểu là bấm nút nguồn của máy :v cách này không khuyến khích sử dụng. Nếu bạn làm việc trên một máy chủ không có GUI hoặc bạn đang sử dụng SSH session cho máy tính từ xa, dòng lệnh là tùy chọn duy nhất để chúng ta làm việc đó. Và hôm nay mình viết bài này để giới thiệu với các bạn cách khởi động lại hoặc tắt máy bằng dòng lệnh trên `Linux`

## Các lệnh có thể sử dụng
- shutdown
- reboot
- halt
- poweroff
<br>
Tất cả các lệnh này có thể thực hiện tắt máy, khởi động lại và tạm dừng hệ thống.
## Sử dụng Shutdown
Tắt hoặc khởi động lại hệ thống nhiều người dùng thì bạn phải lên kế hoạch trước. Bạn cần phải quyết định khi nào bạn sẽ tiến hành tắt máy hoặc khởi động lại và cảnh báo cho những người dùng khác trong hệ thống, việc tắt máy sẽ thực hiện và khi nào. Nếu là máy tính cá nhân của bạn và bạn là người duy nhất sử dụng nó, thì mọi thứ sẽ dễ dàng hơn nhiều :D.
<br>
Để chạy bất kỳ lệnh nào trong số các lệnh trên, bạn phải thuộc `nhóm sudo`. Đó là, bạn phải có quyền `superuser` và có thể sử dụng lệnh `sudo`. Nếu lệnh bạn đã ban hành sẽ có hiệu lực ngay lập tức và sẽ không ảnh hưởng đến những người dùng đã đăng nhập khác, bạn sẽ không cần sử dụng `sudo`. Nếu bạn sử dụng một trong những lệnh trên và lệnh bị từ chối, hãy thử lại với `sudo`.
<br>
Theo mặc định, lệnh shutdown đảm bảo rằng tất cả các quy trình được dừng lại, tất cả các hệ thống tệp được đồng bộ hóa và tất cả hoạt động của CPU đã ngừng. Đây là trạng thái `halt` (tạm dừng). Sau đó, nó sẽ gửi một thông điệp đến phần cứng để cắt điện. Tất nhiên, đây là trạng thái `shutdown` hoặc `Poweroff`.
<br>
Thông thường, để `shutdown` chúng ta truyền vào các tham số, như thời gian và một tin nhắn cảnh bảo cho người dùng đã đăng nhập để tắt máy. 
<br>
ví dụ: Đặt lịch trình tắt máy trong vòng 10 phút kể từ bây giờ, và một tin nhắn cảnh báo "Shutting down in 10 minutes!"
```
shutdown +10 Shutting down in 10 minutes!
```
Kết quả ở trên màn hình sẽ như thế này:
![](https://images.viblo.asia/2fce0f55-7926-4fb3-85f2-52c1f316f06b.png)
Để hủy lịch trình `shutdown` này chúng ta sử dụng lệnh:
```
shutdown -c
```
Nếu bạn không cung cấp chuỗi thời gian, việc tắt máy sẽ được lên kế hoạch trong một phút kể từ bây giờ. Lưu ý: bạn không thể cung cấp một thông báo cho người dùng đã đăng nhập của bạn nếu bạn không chỉ định một chuỗi thời gian. 
<br>
Bạn có thể sử dụng lệnh:
```
shutdown
```
Kết quả trên màn hình sẽ như sau:
![](https://images.viblo.asia/78d2e228-00c2-4b71-9712-cce7ec711397.png)
Nếu thời gian một phút quá lâu để bạn có thể chờ =)) thì bạn có thể sử dụng lệnh sau để thực hiện việc `shutdown` ngay lập tức:
```
shutdown now
```
Chuỗi thời gian có thể cài đặt như là 22:00. Nó phải tuân theo định dạng HH: MM và phải ở trong đồng hồ 24 giờ
```
shutdown 22:00 Shutdown tonight at 22:00
```
Chúng ta biết hành động `shutdown` mặc định làm cho máy tính chuyển sang trạng thái dừng và sau đó chuyển sang trạng thái tắt nguồn. Chúng ta có thể ghi đè hành vi này bằng cách chuyển các tùy chọn dòng lệnh khác cho nó.
- Tùy chọn -H (tạm dừng) sẽ đưa máy tính của bạn xuống trạng thái tạm dừng nhưng sẽ không yêu cầu phần cứng tắt nguồn. 
- Tùy chọn -P (poweroff) là hành động mặc định. Máy tính được đưa xuống trạng thái dừng và sau đó tắt nguồn. 
- Tùy chọn -r (khởi động lại) sẽ đưa máy tính của bạn xuống trạng thái tạm dừng và sau đó khởi động lại nó. 
- Tùy chọn -h (tạm dừng và poweroff) giống như -P. Nếu bạn sử dụng -h và -H cùng nhau, tùy chọn -H được ưu tiên. 
- Tùy chọn -c (hủy) sẽ hủy mọi tắt máy theo lịch trình, tạm dừng hoặc khởi động lại.
sau đây, mình có một ví dụ về việc đặt lịch trình khởi động lại máy tính:
```
shutdown -r 07:45 System rebooting at 07:45
```
## Các lệnh reboot, halt và poweroff
Nếu bạn muốn khởi động lại ngay bây giờ, hãy sử dụng `reboot`. Nếu bạn muốn tắt nguồn ngay bây giờ, hãy sử dụng poweroff và nếu bạn muốn tạm dừng hệ thống ngay bây giờ, hãy sử dụng `halt`.
<br>
Khởi động lại máy tính (reboot), chắc nhiều anh em quá quen thuộc với lệnh này =)) chúng ta sử dụng lệnh:
```
reboot
```
Tạm dừng:
```
halt
```
Tắt nguồn:
```
poweroff
```
Các lệnh này có hiệu lực ngay lập tức. Nếu bất kỳ lệnh nào trong số này bị từ chối, hãy đặt trước chúng bằng `sudo`.
## Lệnh nào phù hợp nhất
Trong môi trường nhiều người dùng, sử dụng `shutdown` để thực hiện các hành động cho phép chúng ta dễ dàng kiểm soát hơn. Việc đặt thời gian, lên lịch trình và thông báo tới các người dùng khác về lịch trình sẽ thể hiện được giá trị của lệnh `shutdown` :v. Còn đối với máy tính một người sử dụng thì `reboot` và `poweroff` sẽ đáp ứng nhu cầu của chúng ta
## Lời kết
Qua bài viết này mình đã giới thiệu với các bạn tắt máy hoặc khởi động lại máy tính của mình bằng dòng lệnh. Bạn có thể lên lịch trình trước hay thực hiện luôn việc đó qua các lệnh trên. Cảm ơn các bạn đã theo dõi bài viết của mình <3