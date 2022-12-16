![](https://images.viblo.asia/16ae69dc-20f9-4bc0-ad79-73c24d104833.png)

Khi phát hiện sản phẩm đã phát hành có lỗi thì đó thật sự là một vấn đề khá nghiêm trọng, nó ảnh hưởng đến kinh doanh của khách hàng, ảnh hưởng đến chất lượng của đội sản xuất.
Vậy làm sao để không để lọt lỗi đến người dùng cuối. Ở bài viết này tôi sẽ giới thiệu quy trình làm việc cho phép khi sản phẩm thêm một tính năng mới thì tính năng này không tạo ra lỗi, một quy trình kết hợp các chức năng tự động với kỷ luật nhóm.

Lỗi có thể xảy ra mọi lúc, lỗi có thể được tìm thấy khi sản phẩm còn trong  giai đoạn phát triển hoặc phải đến khi phát hành sản phẩm thì lỗi mới được tìm thấy.
Nhưng khi ngăn chặn và tìm ra lỗi trong khi đang phát triển sẽ giúp giảm chi phí sửa lỗi. Theo nghiên cứu của IBM, việc sửa một lỗi trong sản phẩm có thể tốn gấp 5 lần so với việc phát hiện ra nó trong môi trường phát triển (trong quá trình thiết kế, phát triển cục bộ, hoặc giai đoạn thử nghiệm).

Một trong những tình huống xảy ra khi sản phẩm có lỗi:
* Một khách hàng tìm thấy lỗi và thông báo cho bên dịch vụ khách hàng.
* Các lỗi được ghi lại bởi đội ngũ sản xuất.
* Nhà phát triển nhận được mô tả về lỗi, mở thông số kỹ thuật và dành thời gian đọc nó.
* Nhà phát triển sau đó sẽ dành thời gian để tái hiện lỗi.
* Sau đó, nhà phát triển phải tìm hiểu cách sửa lỗi và thực hiện sửa lỗi.
* Tiếp theo, bản sửa chữa phải trải qua các bài kiểm tra.
* Bản sửa lỗi sau đó được xây dựng và triển khai trong các môi trường khác nhau.
* Cuối cùng, bản sửa lỗi trải qua quá trình kiểm tra của đội ngũ QA.

### Làm thế nào để ngăn chặn lỗi trên sản phẩm phát hành

Để bắt lỗi và sửa lỗi ở giai đoạn hiệu quả nhất về chi phí và thời gian, chúng ta thực hiện theo các bước sau, tuân thủ một số nguyên tắc cốt lõi:

![](https://images.viblo.asia/f1edbf89-3498-46ac-8a24-05eefbc4b3c1.png)

**Giai đoạn 1 - Môi trường phát triển**

**Bước 1**: Thiết kế tốt. Giữ cho vấn đề đơn giản

Tạo thiết kế trước khi lập trình: cố gắng phân chia các vấn đề khó khăn thành các phần / bước / mô-đun nhỏ hơn mà bạn có thể giải quyết từng cái một, nghĩ về các đối tượng được xác định rõ. Chia sẻ kế hoạch với đội  tại các cuộc họp đánh giá thiết kế. Thiết kế tốt là chìa khóa để giảm lỗi và cải thiện chất lượng mã.

**Bước 2**: Bắt đầu lập trình

Mã phải dễ đọc và đơn giản. Nguyên tắc thiết kế và mô hình phát triển sẽ là những yếu tố không thể thiếu để giúp bạn lập trình tốt hơn. 
Unit test là một phần của quá trình phát triển. Chúng ta sử dụng chúng để kiểm tra các đơn vị mã riêng lẻ và đảm bảo rằng đơn vị đó là chính xác về mặt logic.
Các bài Unit test được viết và thực hiện bởi các nhà phát triển, sử dụng JUnit làm khung thử nghiệm.

**Bước 3**: Sử dụng các công cụ phân tích mã 

Để giúp đảm bảo và duy trì chất lượng mã , chúng ta sử dụng một số công cụ phân tích mã tự động như:

* FindBugs - Một công cụ phân tích mã tĩnh phát hiện các lỗi có thể có trong các chương trình Java, giúp chúng tôi cải thiện tính chính xác của mã.
* Checkstyle - Checkstyle là một công cụ phát triển để giúp các lập trình viên viết mã Java tuân thủ một tiêu chuẩn mã hóa. Nó tự động hóa quá trình kiểm tra mã Java.

**Bước 4**: Thực hiện kiểm tra mã 

Chúng ta đều biết rằng bước đánh giá mã là rất quan trọng.
Tất cả các mã được đưa vào ReviewBoard và các nhà phát triển có thể xem lại mã.
Đối với các nhóm quan trọng hơn, chúng ta có một bản dựng để đảm bảo mọi dòng mã đã vượt qua đánh giá - trong trường hợp đánh giá chưa được thực hiện, bản dựng sẽ cảnh báo cho nhóm rằng có một thay đổi chưa được xem xét.
Cần đảm bảo rằng mọi thay đổi trong mã phải được kiểm tra, đánh giá.

**Bước 5**: CI

Đây là nơi tất cả các mã đang được tích hợp. Chúng ta sử dụng TeamCity để thực thi các tiêu chuẩn và tính chính xác của mã bằng cách chạy thử nghiệm Unit test, xác thực FindBugs và các loại chính sách khác.

**Giai đoạn 2 - Môi trường thử nghiệm**

**Bước 1**: Thử nghiệm tích hợp

Kiểm thử tích hợp cũng được thực hiện bởi các nhà phát triển, nhưng thay vì kiểm tra các thành phần riêng lẻ, nó nhằm mục đích kiểm tra các thành phần. Một hệ thống bao gồm nhiều thành phần riêng biệt như mã, cơ sở dữ liệu, máy chủ web...
Kiểm tra tích hợp có thể phát hiện các vấn đề giữa các thành phần, truy cập mạng, sự cố cơ sở dữ liệu...

**Bước 2**: Thử nghiệm chức năng

Các trường hợp thử nghiệm được viết dựa trên đặc điểm kỹ thuật và kết quả thực tế được so sánh với kết quả dự kiến. Chúng ta chạy thử nghiệm chức năng bằng cách sử dụng Selenium và Protractor để kiểm tra giao diện người dùng và Junit để kiểm tra API.

**Giai đoạn 3 - Môi trường Staging**

Môi trường này thường được gọi là môi trường tiền sản phẩm, khu vực thử nghiệm hệ thống hoặc đơn giản là khu vực tổ chức. Mục đích của nó là cung cấp một môi trường mô phỏng môi trường sản phẩm thực tế càng sát càng tốt để có thể kiểm tra ứng dụng của mình kết hợp với các ứng dụng khác.


**Giai đoạn 4 - Môi trường sản phẩm **

**Bước 1**: Deploy sản phẩm

Deploy là một quá trình đưa mã vào các thiết bị. Nếu một số lỗi xảy ra trong quá trình triển khai, hệ thống sẽ tạm dừng triển khai, ngăn phiên bản có vấn đề tiếp cận với tất cả các máy và cho phép chúng ta quay lại để sửa lỗi nhanh chóng.

**Bước 2**: Kết hợp các cờ tính năng

Tất cả các thành phần mới được phát hành với các cờ tính năng, về cơ bản để kiểm soát toàn bộ vòng đời của các tính năng. Cờ tính năng cho phép quản lý các thành phần và ngăn chặn rủi ro.

**Bước 3**: Phát hành sản phẩm

Có hai cách để phát hành sản phẩm.
Cách thứ nhất là thử nghiệm các tính năng mới trên một nhóm nhỏ người dùng trước khi phát hành cho mọi người. Cách thứ 2 là mở tính năng ban đầu cho 10% khách hàng, sau đó 30%, sau đó 50%, và sau đó 100%.
Cả hai phương pháp đều cho phép chúng ta giám sát và theo dõi các kịch bản có vấn đề trong hệ thống của mình.

**Bước 4**: Theo dõi và cảnh báo

Đặt thông báo cũng là một phần trong công việc của nhà phát triển, và trách nhiệm của anh là điều chỉnh để kích hoạt cảnh báo PagerDuty.
PagerDuty là một dịch vụ gọi điện, nhắn tin và email tự động, giúp thông báo giữa các bên có trách nhiệm để đảm bảo các vấn đề được giải quyết bởi đúng người vào đúng thời điểm.


Trên đây là toàn bộ quy trình phát triển chặt chẽ để tìm ra lỗi, nhưng còn một vấn đề mà nhiều dự án sẽ gặp phải đó là sửa lỗi lại gây ra lỗi.
Giai đoạn cuối dự án mà lỗi vẫn nhiều, sửa lỗi này gây ra nhiều lỗi khác. Làm thế nào để đảm bảo giao sản phẩm cho khách hàng mà không có lỗi bị phát sinh?
Có nhiều người sẽ trả lời là phải kiểm tra lại hết 1 lượt trước khi phát hành. Thực sự đó chưa bao giờ là giải pháp.

Ngay cả những dự án áp dụng quy trình nghiêm ngặt cũng không thể đảm bảo là không có lỗi phát sinh. Nhưng rõ ràng chúng ta không thể kiểm tra đi kiểm tra lại lại toàn bộ hệ thống để yên tâm về chất lượng được, làm như vậy sẽ bị tăng thời gian và chi phí lên rất nhiều. 

Nguyên nhân của vấn đề gây ra lỗi phát sinh thường do kinh nghiệm của nhà phát triển, sửa không cẩn thận, chỉ sửa một nơi xảy ra lỗi mà không kiểm tra phạm vi ảnh hưởng.
Giải pháp là cần phân tích phạm vi ảnh hưởng khi sửa lỗi và liệt kê tất cả vùng ảnh hưởng. Người kiểm thử kiểm tra lại lỗi và toàn bộ những ảnh hưởng xung quanh.
Vậy chúng ta cần thường xuyên áp dụng quy trình phân tích lỗi và phạm vi ảnh hưởng để đảm bảo được các trường hợp xảy ra , hạn chế rò rỉ lỗi khi giao sản phẩm cho khách hàng .

Nguồn tham khảo: https://www.outbrain.com/techblog/2017/11/keep-bugs-out-of-production/