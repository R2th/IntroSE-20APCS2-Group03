# Bắt đầu với EC2
Hôm nay, tiếp tục với series bài nhập môn AWS chúng ta sẽ bắt đầu từ dịch vụ cơ bản nhất của AWS-EC2.
Mình đã nói qua khái niệm của EC2 ở bài viết này. Những ai không rõ có xem lại ở đây. Tuy nhiên cách học nhanh nhất là thực hành. Bắt đầu xắn tay áo lên thôi nào.

## Prerequisite
1. Tài khoản AWS đã kích hoạt.
2. Máy tính chạy hệ điều hành Mac, Linux hoặc Windows. có Trình duyệt web bất kỳ. (Mình dùng Chrome)
3. Đã thiết lập Billing Alarm (Optional, check cách thực hiện tại đây)
4. Kiến thức cơ bản về máy tính.


## Tạo  Instance EC2 bằng AWS Management Console
1. Login và truy cập vào địa chỉ https://console.AWS.amazon.com/console/home. Bấm chọn `Services` trong menu xổ xuống chọn `EC2` nằm trong `Compute Category`.
2. Ở `EC2 Dashboard` chọn `Launch Instance` 
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.00.58.png)

3.  Amazon Machine Image (AMI).
Hiểu đơn giản AMI chính là những phiên bản OS sẽ được Amazon cài lên instance của các bạn. AMI có các lựa chọn sau.
- [ ] Quick Start 
Gồm các lựa chọn AMI phổ biến để giúp bạn có thể bắt đầu một cách nhanh chóng. Để chắc chắn là bạn không ra khỏi gói sử dụng miễn phí của AWS. Chọn Free tier only ở phía side bar bên trái.
- [ ] AWS Marketplace - là những bản AMI được chính Amazon hoặc những nhà phát triển lớn cung cấp. Phần lớn các trường hợp thì bạn sẽ lựa chọn AMI từ đây. AMI được cung cấp ở đây tồn tại dưới dạng cả trả phí và miễn phí. Nhất là những AMI Widows Server.
- [ ] Community - là những AMI đến từ bất kỳ ai và chất lượng cũng không thể kiểm soát được. Nếu bạn có ý định dùng những AMI này thì hãy đọc kỹ review của các người dùng trước nhé.
- [ ]  My AMIs - chính là những AMI được chính bạn tạo ra để sử dụng cho mục đích riêng. Chúng ta sẽ tìm hiểu về AMI và cách tạo ở những bài viết sau.

    Ở đây mình chọn Ubuntu.![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.01.10.png)

4. Instance Type
Instance Type chính cấu hình của Server. Amazon cung cấp vô số các lựa chọn từ những Instance nano với  521MB RAM - CPU đơn nhân cho tới các Instance 16xlarge với CPU 128 Core - 1952GB RAM. Các bạn nên cân nhắc để lựa chọn đúng với nhu cầu. Với  nhu cầu tìm hiểu khoa học của chúng ta. thì Instance t2.micro là đủ hơn nữa nó còn nằm trong Free Tier. 
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.01.17.png)

5. Configuration Detail
Để giải thích kỹ từng lựa chọn này thì sẽ tốn 1 bài viết với thời lượng kha kha nữa nên các bạn để mặc định hết cho mình. Chúng ta sẽ tìm hiểu kỹ ở một bài khác.
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.02.03.png)
6. Add Storage
Đây chính là dung lượng ổ cứng của VPS mặc định là 8GB. Nếu bạn thấy có cảm giác bức bối thì có thể điều chỉnh thêm. 
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.02.10.png)
7. Add Tag
Tag chỉ là một công cụ để bạn quản lý các tài nguyên AWS chứ không hề có ảnh hưởng nào khác đến cấu hình hay cách làm việc của VPS. Ít nhất thì nên có ít nhất 1 tag `Name`  để các bạn không nhầm lẫn giữa các instance
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.03.26.png)
8. Security Group (SG)
Đây là một công cụ Firewall rất dễ sử dụng mà AWS cung cấp. SG cho phép giới hạn những port 
Setting như hình dưới cho phép người dùng từ bất cứ đâu. SSH vào Instance cũng như tạo requets HTTP và HTTPS từ ngoài vào Instance. Bạn hoàn toàn có thể giới hạn chỉ traffic từ  những IP được chỉ định mới được phép đi vào VPS.
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.07.32.png)
9. Review Instance Launch
Bước này chỉ là review lại các thông tin đã nhập vào. Nếu bạn đã làm chuẩn hết các bước ở phía trên thì hãy bỏ qua bước này cũng được. 

![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.24.40.png)
10. Create Key Pair
AWS sẽ yêu cầu user tạo key để login vào VPS.  
- [ ] Chọn  Create a new key pair. 
- [ ] Nhập tên file key mà bạn muốn vào ô Key pair name.
- [ ] Bấm vào Download Key Pair browser sẽ download file key về.
- [ ] Bấm Launch Instance.
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-06-13%20at%2019.24.49.png)
11. Xem instance vừa tạo 
Sau khi tạo instance, bấm vào nút View Instance để xem Instance bạn vừa tạo. 
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-07-24%20at%2020.37.13.png)

## Login vào Server 
### Login bằng Linux, Mac OSX.
1. Mở Terminal. 
2. Dùng lệnh cd để chuyển đến thư mục chứa file Key pair đã download
3. Chạy lênh `chmod 400 ‘tên key file’`
4. Quay lại AWS Management Console 
- [ ] Click chuột phải vào Instance bạn vừa tạo bấm Connect.
- [ ]  Copy câu lệnh Example trong popup hiện lên.
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-07-24%20at%2020.31.40.png)
3. Quay lại Terminal paster câu lệnh vừa copy vào đó.
(Nếu bạn login lần đầu thì có thể Terminal sẽ xuất hiện câu hỏi như trên, Type yes và bấm Enter)
![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-07-24%20at%2020.43.01.png)


### Login bằng Windows.
Bài về login bằng windows mời các bạn xem ở đây.

## Stop, Restart và Terminate Instance
### Stop
Mỗi khi cảm thấy không cần dùng đến 1 Instance trong một thời gian ( ít nhất là hơn 1 tiếng) thì bạn nên stop instance đó lại. Lúc này thì AWS vẫn sẽ tính tiền cho dung lượng lưu trữ cho instance đó (vì dữ liệu vẫn được lưu lại chứ không mất đi) nhưng phần chi phí để chạy instace sẽ không bị tính tiền nữa. Để stop một instance đang chạy bạn vào mục EC2 từ Menu Services của AWS console -> Instances -> chuột phải vào instance đang chạy -> Instance State -> Stop. 

![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-08-05%20at%2014.16.24.png)
### Restart
Một điều bạn nên chú ý khi dùng EC2 đó là khi bạn muốn restart một instance vì bất cứ lý do gì (cài đặt phần mềm vvv). Thì mình khuyên nên restart bằng AWS console thay vì chạy trực tiếp lệnh `sudo reboot now`. Thực hiện lệnh `sudo reboot ` có thể sẽ gây ra lỗi không truy cập được vào instance.
Cách thực hiện thì restart cũng tương tự như  stop ở trên.
### Terminate
Nếu cảm thấy instance không còn cần thiết nữa thì bạn hoàn toàn có thể xóa hẳn nó đi bằng Terminate. Sau khi thực hiện Terminate một instance, không có cách nào để undo thao tác này cả. Vì vậy hay uốn tay 7 lần trước khi thực hiện nhé, nhất là với các instance quan trọng. 
P/S: đối với các instance quan trọng mà bạn không muốn lỡ tay terminated đi thì các bạn nên bật tùy chọn `Termination Protection` lên như sau.

![](&&&SFLOCALFILEPATH&&&Screen%20Shot%202017-08-05%20at%2015.34.33.png)
Sau khi bạn terminate instance thì instance đó sẽ nó sẽ không biến mất luôn ở trong AWS console mà sẽ hiện trạng thái terminated. Sau đó khoảng vài tiếng thì instance sẽ biến mất hoàn toàn khỏi AWS console.

## Cảm ơn các bạn đã theo dõi bài viết hẹn các bạn ở những bài tiếp theo trong series.