Trước khi đi đến nội dung chính của bài viết, mình muốn giới thiệu sơ qua cho các bạn về Amazon S3. Amazon S3 viết tắt của cụm từ Amazon Simple Storage Service: Là dịch vụ đám mây lưu trữ do đó bạn có thể tải lên các tệp, các tài liệu, các dữ liệu tải về của người dùng hoặc các bản sao lưu.
Với rất nhiều lợi ích như là khả năng mở rộng, đáng tin cậy và với mức chi phí thấp nhất cho việc lưu trữ. Nếu bạn hay làm việc với server cần thao tác với các file dữ liệu nhiều thì Amazon S3 hẳn không còn quá xa lạ.

Trong quá trình làm việc với S3 nói riêng và với các file dữ liệu trên server nói chung, ắt hẳn không ít lần bạn cần phải thức hiện một số thao tác lên file sau một khoảng thời gian nhất định (ví dụ như xóa những file được tạo từ 1-2 tháng trước chẳng hạn). Khi đó thông thường chúng ta sẽ phải viết một function để kiểm tra thời gian tạo file rồi xóa những file thỏa mãn yêu cầu, hơn nữa chũng ta còn phải setup để function này chạy lặp lại sau 1 khoảng thời gian cố định (1 giờ 1 lần chẳng hạn). Việc này đôi khi lại tạo thêm gánh nặng cho server trong trường hợp mà số lượng file cần kiểm tra quá lớn.

Rất may Amazon S3 cung cấp cho chúng ta một chức năng rất thú vị đó là "Lifecycle", đúng như tên gọi, chức năng này của Amazon S3 cho phép chúng ta đính nghĩa xem chúng ta muốn làm gì trong suốt một vòng đời của object nằm trên server S3 như lưu chúng vào một địa chỉ khác, truy cập vào chúng hay xóa chúng sau một khoảng thời gian nhất định.
Bạn có thể định nghĩa một vòng đời cho các object thuộc tâp con của một objects lớn hơn trong bucket bằng việc nhận diện chúng bằng những chuỗi ký tự chung trong tên.

Để tạo ra một vòng đời cho object trên S# chúng ta cần thực hiện các bước sau:

**1.** Đăng nhập vào trình quản lý AWS và mở phần setting của Amazon S3 tại địa chỉ sau: https://console.aws.amazon.com/s3/.

**2.** Trong danh sách **bucket**, lựa chọn tên của **bucket** mà bạn muốn tạo ra một lifecycle.
![](https://images.viblo.asia/9942b751-d5df-4270-9e21-6836f2876d55.png)

**3.** Chọn mục **Management** sau đó chọn **Add lifecycle rule**
![](https://images.viblo.asia/5f44b7dc-2b72-470d-b324-dc11bc96773b.png)

**4.** Tiếp theo bạn hãy điền tên của luật cho lifecycle mà bạn đang muốn xây dựng. Lưu ý là tên này không được trùng với tên của **bucket**. Sau đó hãy đặt luật theo hướng dẫn sau:
*  Để áp dụng luật cho toàn bộ những object có chung một chuỗi ký tự bắt đầu, bạn hãy gõ chuỗi ký tự mà bạn muốn hoặc bạn cũng có thể chọn ra từ một danh sách mà Amazon S3 gợi ý sau đó nhấn **Enter**. 
*  Để áp dụng luật cho những object có chung 1 hoặc nhiều tags, bạn hãy gõ những tags mà bạn mong muốn vào sau đó hãy lựa chọn nhưng tags được đưa ra và nhấn **Enter** để hoàn thành. Lặp lại các bước trên cho tag khác.
![](https://images.viblo.asia/603ea758-5bc1-4733-a18e-e87a669c3fc0.png)

**5.** Bạn có thể cấu hình luật cho Lifecycle bằng cách xác định luật cho từng object thuộc các lớp lưu trũ khác nhau như Standard-IA, One Zone-IA, và Amazon Glacier.
Bạn có thể xách định luật cho phiên bản hiện tại, phiên bản trước đó nữa hoặc cho cả 2. Việc này cho phép bạn giữ được nhiều phiên bản của một object trên bucket.
a. Chọn **Curent version** để định nghĩa cho phiên bản hiện tại của object.
    Chọn **Previous version** để định nghĩa cho phiên bản trước của object.
![](https://images.viblo.asia/bb60d1d4-3c23-4c86-8075-680b06f78cfc.png)

b. Chọn **Add transitions** và lựa chọn một trong những đầu mục sau:
* **Transition to Standard-IA after** và nhập số ngày sau khi tạo của object mà bạn muốn sự chuyển đổi được thực thi.
* **Transition to One Zone-IA after** và nhập số ngày sau khi tạo của object mà bạn muốn sự chuyển đổi được thực thi.
* **Transition to Amazon Glacier after** và nhập số ngày sau khi tạo của object mà bạn muốn sự chuyển đổi được thực thi.
Lưu ý rằng khi Amazon S3 lưu trữ các objects trong Amazon Glacier. Thì đây là những đối tượng Amazon S3, và bạn chỉ có thể truy cập chúng bằng cách sử dụng giao diện điều khiển Amazon S3 hoặc API Amazon S3. Bạn không thể truy cập các đối tượng được lưu trữ thông qua bảng điều khiển Amazon Glacier hoặc API Amazon Glacier.
![](https://images.viblo.asia/fe6507e6-1dac-47b4-8078-3fb1a4d55de9.png)

**6.** Khi bạn đã hàn thành việc cài đặt **Transtion** hãy nhấn **Next**
![](https://images.viblo.asia/69848518-400a-46fa-bd46-4cb031dffc98.png)

**7.** Ở đây mình lựa chọn cả **Current version** và **Previous version**

**8.** Lựa chọn **Expire current version of object** sau đó nhập số ngày tồn tại của object trên Amazon S3 (ví dụ nhập 30 nếu bạn muốn xóa file sau khi file được tạo 30 ngày). Nếu bạn lựa chọn phần này thì bạn không thể chọn tùy chọn để xóa những đánh dấu xóa đã hết hạn.

**9.** Chọn **Permanently delete previous versions** và nhập số ngày sau khi object trờ thành phiên bản trước để xóa vĩnh viễn object.

**10.** Mình cũng đề nghị bạn nên luôn luôn sử dụng tùy chọn **Clean up incomplete multipart uploads**. Ví dụ: nhập 7 cho số ngày sau ngày bắt đầu tải lên một object gồm nhiều phần mà bạn muốn kết thúc và xóa mọi phần tải lên mà chưa được hoàn thành.

**11.** Chọn **Next**

![](https://images.viblo.asia/ac76eeeb-07c8-4484-9665-f8b716baa969.png)

**12.** Chọn **Previous** nếu bạn muốn xem lại những phần đã được cài đặt ở các bước trước, nếu mọi thứ đều hoàn hảo, hãy chọn **Save** để lưu lại.

**13.** Nếu Luật bạn tạo ra không có lỗi gì, nó sẽ được hiển thị trong trang **Lifecycle** như sau:

![](https://images.viblo.asia/129d8707-1602-41ef-a1d3-497f88fa50b4.png)

Như vậy là các bước để cài đặt một Lifecycle cho một object trong bucket của Amazon S3 đã hoàn thiện, hy vọng các bạn sẽ có trải nghiệm tốt nhất đối với server lưu trữ file Amazon S3.
Nguồn: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-lifecycle.html