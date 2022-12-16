*Chào các bạn, sau một thời gian dài bận bịu với các dự án sử dụng các công nghệ cũ, hoặc các công nghệ do khách hàng chọn lựa từ trước, mình bỗng nhiên ngỡ ngàng khi nghe phong phanh dự án mới sẽ làm theo kiến trúc Microservices. Dù cũng có tương đối kinh nghiệm làm việc nhưng thời điểm đó mình cũng chưa hình dung ra Microservices là cái quái gì?, chúng ta cần phải xây dựng ứng dụng như thế nào?, ... Bắt tay vào tìm hiểu, và điều đầu tiên mình nhận ra rằng -> làm mãi với những công nghệ từ thập kỉ trước không thể làm bản thân tiến bộ được (Note: dự án mình làm gần đây nhất sử dụng các công nghệ java từ những năm 2004 @@), công nghệ đã và đang thay đổi hàng ngày, nếu cứ bảo thủ và không chịu cập nhật thì chúng ta chỉ bước những bước lùi mà thôi.*

Lan man quá, quay lại chủ đề chính nhé :D

## Vậy Microservices là gì nhỉ?

Thực tế có nhiều định nghĩa khác nhau đối với Microservices nhưng hiểu theo cách đơn giản thì, microservice là một kiếu kiến trúc phần mềm. Các module trong phần mềm này được chia thành các service rất nhỏ (microservice). Mỗi service sẽ được đặt trên một server riêng -> dễ dàng để nâng cấp và scale ứng dụng.

## Monolith Application là gì?

Bạn đã bao giờ từng làm việc trong những dự án có đặc điểm như sau chưa?
* Release vài tháng 1 lần
* Có các đặc điểm và chức năng bao phủ phạm vi rộng
* Team size lớn
* Việc debug trở thành thử thách lớn
* Khó khăn để ứng dụng các công nghệ mới

Đó chính là những đặc điểm của Monolith Application

> Các ứng dụng Monolith thường rất lớn - thường sẽ có size hơn 100.000 dòng code. Trong một số trường hợp thậm chí có hơn một triệu dòng code.

Khi xây dựng phần mềm theo kiến trúc monolith (một khối). Toàn bộ các module (view, business, database, report) đều được gom chung vào một project lớn. Khi deploy, chúng ta sẽ quăng khối code này lên server và config để nó chạy.

Kiến trúc này hoạt động khá ngon vì nó đơn giản, dễ code. Tuy nhiên, khi phần mềm trở nên lớn và phức tạp thì nó lại dần bộc lộ nhược điểm. Do các module đóng với nhau thành một bánh, khi muốn nâng cấp một module, ta phải deploy lại toàn bộ code (người dùng cuối sẽ không sử dụng được toàn bộ các chức năng của hệ thống khi deploy); khi muốn phục vụ nhiều người dùng, ta phải nâng cấp server...

Các thử thách đối với Monolith Application
* Scalability
* Ứng dụng các công nghệ mới
* Ứng dụng automation test
* Áp dụng quy trình làm việc - Agile?
* Thích ứng với thực tiễn phát triển hiện đại
* ...

## Kiến trúc Microservices

Khác biệt với kiến trúc Monolith, hay vì gom tất cả module thành một khối (monolith), ta tách các module thành những service siêu nhỏ. Mỗi service sẽ được đặt trên một server riêng (Có thể dùng server cloud như AWS hoặc Azure), giao tiếp với nhau thông qua mạng (Gửi nhận message qua giao thức HTTP hoặc sử dụng MessageQueue)...

### Và một phần mềm xây dựng theo kiến trúc Microservices trông sẽ như nào?

> Hình dưới đây sẽ minh họa cho việc phần mềm được xây dựng theo kiến trúc Monolith, một ứng dụng sẽ chứa tất cả các thành phần

![](https://images.viblo.asia/38c6cbd2-f7a6-4ccb-8375-1f99ec401c43.png)

> Còn hình dưới sẽ minh họa việc ứng dụng ở trên khi được xây dựng theo kiến trúc Microservices

![](https://images.viblo.asia/77613fcb-3b84-4de7-a463-d10a85eee9db.png)

> Kiến trúc Microservice bao gồm một số thành phần nhỏ, được thiết kế tốt và tương tác qua các message.

![](https://images.viblo.asia/6f527e33-51eb-4482-afe0-78f6bfbdf0d6.png)

### Các ưu điểm của Kiến trúc Microservices

Hiện nay, các ứng dụng thường rất lớn và liên tục được update ví dụ như facebook, linkin,... . Với kiến trúc monolith, việc gom toàn bộ ứng dụng vào một khối làm việc nâng cấp trở nên khó khăn và mất thời gian. Để giải quyết vấn đề đó, các ứng dụng lớn cần thiết được tách ra thành các service nhỏ. Mỗi service quản lý một cơ sở dữ liệu riêng, nằm trên một server riêng, tách biệt hoàn toàn với nhau. Các ưu điểm như sau:

* Điều quan trọng nhất là rất dễ nâng cấp và scale up, scale down. Giả sử bạn làm một trang web liên quan tới vận tải, kho bãi. Khi số lượng xe hay hàng hóa tăng lên, chỉ việc nâng cấp server cho service liên quan đến nghiệp vụ kho vận(ngược lại, có thể giảm server nếu cần thiết). Với cloud computing, việc nâng cấp server vô cùng dễ dàng chỉ với vài cú click chuột. Điều này rất khó thực hiện với monolith.
* Do tách biệt nên nếu một service bị lỗi, toàn bộ hệ thống vẫn hoạt động bình thường. Với monolith, một module bị lỗi có thể sẽ kéo sập toàn bộ hệ thống.
* Các service nằm tách biệt nhau, chúng có thể được sử dụng các ngôn ngữ lập trình riêng, database riêng. VD service xử lý ảnh có thể viết bằng C++, service tổng hợp data có thể viết bằng Python.
* Có thể áp dụng được các quy trình tự động hóa, như build, deploy, monitoring,...
* Khi chia nhỏ các service, team size sẽ giảm và mọi người sẽ làm việc hiệu quả hơn
* ...

### Tuy nhiên không phải là không có nhược điểm

* Các module giao tiếp qua mạng nên có thể tốc độ không cao bằng monolith. Ngoài ra, mỗi module phải tự giải quyết các vấn đề về bảo mật, transaction, lỗi kết nối, quản lý log files.
* Việc đảm bảo tính đồng nhất trong dữ liệu sẽ trở nên phức tạp hơn
* Sử dụng nhiều service nên việc theo dõi, quản lý các service này sẽ phức tạp hơn
* Cần một đội ngũ thật ngon để thiết kế và triển khai bao gồm software architect xịn

> Việc xây dựng phần mềm theo kiến trúc nào hoàn toàn phụ thuộc vào phạm vi bài toán mà ứng dụng đó đặt ra, hiện tại thì theo đánh giá của mình Monolith phù hợp với các ứng dụng cỡ vừa và nhỏ, còn Microservices sẽ phù hợp với những ứng dụng lớn => chúng ta cần cân nhắc cẩn thận khi sử dụng để tránh trường hợp mang dao mổ trâu đi thịt gà =)). Qua bài viết hy vọng sẽ chia sẻ được phần nào kiến thức tổng hợp mình đã tìm hiểu. Thanks!