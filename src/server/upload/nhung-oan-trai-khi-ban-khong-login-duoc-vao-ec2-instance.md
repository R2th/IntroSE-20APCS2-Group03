Nếu từng dùng ec2 instance. Tôi cá là đa số các bạn đã không ít hơn 1 lần gặp lỗi không thể login vào instance của chính mình. Sau đây là những vấn đề mình đã từng gặp cùng cách xử lý. Hy vọng nó có thể tiết kiệm cho anh em 1 ít chút thời gian để fix những lỗi trên trời rơi xuống này.

## Permission sai cho file key
Đây là lỗi mình hay gặp nhất đặc biệt là khi login  bởi vì hầu hết mọi người sau khi download về quên mất set permission cho file key và cứ thể login. Lỗi này sẽ tạo ra thông báo to đẹp và rõ ràng `WARNING: UNPROTECTED PRIVATE KEY FILE!` và không cho phép bạn login. Vì thế việc xử lý nó cũng khá đơn giản. Các bạn chỉ cần dùng lệnh chmod đổi permission file là có thể login được. Permission chuẩn cho file key mình recommend nên là 400, tuy nhiên thì nếu các bạn để 600 hay 700 cũng đều không sao. Các permission nào khác sẽ gây lỗi.

![](https://images.viblo.asia/826521e7-3c48-4cc1-8740-b3835196f176.png)
## Không ở đúng thư mục chứa file key
Nhiều bạn có lẽ sẽ phì cười khi đọc đến đây, nhưng thật sự nó nhiều lần làm mình mất khá thời gian. Lỗi này xảy ra hầu hết vì các bạn đãng trí quên mất cd về thư mục chưa file key và copy nguyên câu lệnh connect từ aws console. Tuy vậy nhưng thông báo lỗi của câu lệnh này lại gây dễ hiểu nhầm cho người dùng hơn lỗi phía trên vì nó kết thúc bằng thông báo `Permission denied (publickey).` Nên nhiều khi gặp lỗi này người dùng thường tưởng rằng mình set permission sai cho key, nên sẽ dễ gây vào hoảng loạn mode sau khi chạy lệnh chmod mà không hiệu quả :))). Hãy bình tĩnh và `cd` về thư mục chứa key thôi nào.

![](https://images.viblo.asia/96b76f4f-bde6-4273-acd1-a8683b4acd58.jpg)
##  Khác instance nhưng cùng ip (do elastic ip)
So với các lỗi khác, lỗi này dễ đặt người dùng vào “hoảng loạn” mode nhất vì thông báo có phần hơi nguy hiểm của nó. Thử nhìn qua xem nhé.

![](https://images.viblo.asia/9b66ed19-1adb-44f7-bd96-6f12d0739c7b.jpg)
Dòng chữ
```
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
```
này có thể làm bạn hoảng sợ  đôi chút, nhưng đừng lo, cách giải quyết vấn đề này hết sức đơn giản. Trước đó thì bạn phải chắc chắn là bạn có dùng elastic ip và đã sử dụng 1 elastic ip này để gán cho nhiều hơn 1 ec2 instance, và bạn đã từng ssh vào những instance này trước đây. Nếu bạn không chắc thì có khả năng cao là đúng như thông báo lỗi. Server (hoặc đường truyền) của bạn  đang bị tấn công kiểu man-in-the-middle. Các bạn chỉ cần mở file `known_hosts` ra và delete dòng bị confict (như trên hình là dòng 23) đi là lại có thể truy cập vào server của mình bình thường
## Login sai user. (ec2-user, centos)
Lý do này cũng thuộc loại khá củ chuối khi bạn quên mất default user cho instance của bạn. Ví dụ như bạn dùng username `ec2-user`để login vào một AMI Centos chẳng hạn. Và bạn lưu ý thì mặc định các AMI đều disable ssh bằng tài khoản root. Nếu bạn ssh bằng root thì sẽ có thông báo báo rằng bạn phải login bằng tài khoản khác thay vì root.

![](https://images.viblo.asia/2f00f77b-d52f-44c1-ab4d-b26537940c9a.jpg)
đây là lỗi mà khi bạn dùng `ec2-user` để login vào một instance chạy 
centos
![](https://images.viblo.asia/df8249cc-8390-4875-9cbd-4383e6729234.jpg)
##  Security Group
Đây cũng là một trong những thứ bạn nên kiểm tra đầu tiên khi không login được vào instance của mình. Triệu chứng của việc không ssh được do Security Group là terminal sẽ không báo lỗi gì cả mà chỉ báo timeout và không connect được vào instance.
![](https://images.viblo.asia/2e80583b-4932-47f7-a5b9-2a216bbf8f28.jpg)
## VPC thiết lập sai. 
Lỗi này cùng chung triệu chứng với lỗi thiết lập Security Group, là console sẽ báo timed out, ngoài ra không có thông báo gì khác. Nếu đã kiểm tra Security Group mà không thấy có gì bất thường, thì nguyên nhân có thể là do setting của VPC. Các bạn làm theo các bước sau.
1. Login vào tài khoản AWS của bạn và mở https://console.aws.amazon.com/vpc/
2. Ở thanh menu phía bên trái các bạn chọn Route Table và chọn VPC hiện đang dùng cho Instance của bạn.
![](https://images.viblo.asia/519645ed-0a35-4377-864a-86e569b9daa1.jpg)3. Ở tab Routes ở phía nửa dưới của màn hình. Hãy xem thử là route mặc định có trỏ đến Internet Gateway (IGW) nào không và trạng thái của Route đó phải là active. Route mặc định thường là route có Destination là (0.0.0.0/0). 
4. Nếu không có hãy tạo IGW mới của bạn và trỏ địa chỉ 0.0.0.0/0 đến IGW mới đó
5. Lưu lại bảng Route Table vừa edit.
## Cảm ơn
Cảm ơn các bạn đã đọc hết bài viết, hy vọng bài viết có thể giúp được bạn troubleshoot vấn đề gặp phải khi login vào EC2