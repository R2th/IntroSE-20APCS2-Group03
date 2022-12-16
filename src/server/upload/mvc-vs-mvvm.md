Fred Brooks một nhà khoa máy tính từng đoạt giải thưởng Turing đã từng nói rằng: "Không có sự phát triển duy nhất, về công nghệ hoặc kỹ thuật quản lý, mà chính nó hứa hẹn sẽ cải thiện ngay cả một bậc độ lớn gấp mười lần trong vòng một thập kỷ về năng suất, về độ tin cậy, tính đơn giản".

Một ứng dụng web cũng có thể được tạo ra bằng nhiều cách khác nhau. Mỗi cách đều có những ưu nhược điểm riêng. Hôm nay chúng ta sẽ nói về 2 kiến trúc ứng dụng Web rất phổ biến là MVC mà MVVM.

Các mẫu thiết kế website thay đổi nhiều như cách website tự thay đổi. Hãy nhìn vào Facebook. Nhìn bề ngoài, Facebook phải là một trong những trang web phức tạp nhất mà mọi người sử dụng một cách thường xuyên. Ngay khi người dùng truy cập vào trang chủ của họ, trang web sẽ loại bỏ ít nhất nửa tá yêu cầu dữ liệu để lấp đầy một trang với vô số thành phần. Mỗi một trong số các thành phần này được thiết kế để hiển thị không đồng bộ, do đó, khi load một thành phần bị fail sẽ không ảnh hưởng đến các thành phần còn lại của trang. Bây giờ so sánh với một trang web như Google. Một trong những điểm thu hút lớn nhất của Google là trang web chính của họ có một trong những giao diện người dùng đơn giản nổi tiếng nhất trên tất cả các trang web. Nhưng bên dưới, google.com là một trong những ứng dụng web phức tạp nhất mà mọi người có thể nghĩ tới. Mỗi khi người dùng nhập một ký tự vào thanh tìm kiếm của mình, Google sẽ gõ vào một tập hợp các cụm từ được tìm kiếm trước đó để tạo ra các câu trả lời tự động được ước tính là phù hợp nhất với người dùng.

Giờ đây, người ta có thể dễ dàng tưởng tượng ra rằng logic mà cần thiết để chạy một ứng dụng như Facebook sẽ rất khác so với logic cần thiết để chạy một ứng dụng như Google. 
Về cốt lõi, bất kỳ chức năng nào của trang web chỉ đơn giản là một cách mà giao diện người dùng hoặc chế độ xem có thể tiếp cận mô hình thích hợp để truy xuất dữ liệu. Trong mọi trường hợp, sẽ luôn có một mô hình(Model) và sẽ luôn có một cái nhìn(View). Điều thực sự thay đổi là cách thức mà các mô hình và khung nhìn được kết nối.

Trong thế giới phát triển web, có hai cách chính trong đó View của một trang web điều khiển Model của một trang web và đó là với một Controller hoặc với ViewModel. Và như bạn thấy, mỗi phương thức giao tiếp đều có điểm mạnh và điểm yếu riêng.
## **MVC: Model-View-Controller**

Đó có thể là cách tiêu chuẩn nhất trong đó Model được kết nối với View của ứng dụng là thông qua một giao diện gọi là Controller. Trong mẫu MVC, Controller hoạt động như một công cụ thao tác trực tiếp dữ liệu trong model đã cho.

![](https://images.viblo.asia/5e0040c8-44e1-4666-94be-ffd456453904.png)
Ngày nay, frontend và backend của các trang web được thiết lập để tách rời hoàn toàn giữa cái này và cái kia. Giao diện người dùng của các trang web đã trở nên quá phức tạp đối với thành phần View của mẫu MVC được lưu trữ trong cùng một tệp với các mô hình dữ liệu của nó. Frontend và backend chỉ được kết nối thông qua các yêu cầu get / post và chuỗi JSON được tổ chức thông qua các Controller và router.
![](https://images.viblo.asia/04d64224-4961-40f9-8425-598624a94990.png)
.

Điều này được thực hiện trong chế độ xem bằng cách tìm các yêu cầu đạt các route cụ thể trên API được gắn với các hành động của Controller.

![](https://images.viblo.asia/16e7f8d7-98d2-4c70-8752-1e49944f9516.png)
Mỗi Controller được thiết kế để vừa nhận dữ liệu vừa gửi lại thông tin phù hợp dựa trên dữ liệu nhận được.

Mô hình MVC được thiết kế đặc biệt theo cách mà View và Model không cần biết bất cứ điều gì về nhau. Do đó, mẫu MVC cho phép các nhà phát triển làm việc đồng thời trên các thành phần khác nhau của ứng dụng web mà không ảnh hưởng đến nhau.

Tuy nhiên, mẫu thiết kế MVC có nhiều nhược điểm. Đối với một, việc sử dụng các Controller để thao tác các mô hình dữ liệu tạo ra sự lộn xộn trong phần backend.  Tiêu chuẩn cho mỗi Model trong cơ sở dữ liệu để có bộ điều khiển riêng, vì vậy khi một ứng dụng có quy mô lớn hơn nhiều và phát triển thành một hoạt động với nhiều Model liên quan, số lượng Controller được sử dụng phải tăng lên cùng một lúc. Điều này cùng với việc giới thiệu tự nhiên các lớp trừu tượng mới do hầu hết các framework tạo ra, một codebase trở nên rất khó điều hướng.

Ít nhất một số lỗi này có thể được xử lý thông qua việc sử dụng ViewModels.

## **MVVM: Model-View-ViewModel**

Sự phổ biến của định dạng MVC có thể do bởi thực tế là nó rất dễ hiểu so với các mẫu thiết kế khác. Theo cách nghĩ tự nhiên, cách đơn giản nhất để kết nối một Model và View rời rạc là tạo một Controller cho phép View thao tác với mô hình dữ liệu. Tuy nhiên, cách tiếp cận gián tiếp này cho phép View giao tiếp với phần backend không lý tưởng cho mọi ứng dụng. Cụ thể, phương thức Controller không hoạt động tốt với các Single Page Applicaton.

Một phương pháp phổ biến khác để kết nối View với Model là thông qua một thứ không sáng tạo được gọi là ViewModel. Không giống như phương thức của Controller, phương thức ViewModel phụ thuộc rất nhiều vào giao diện của ứng dụng.
![](https://images.viblo.asia/d4cfaa98-6d7d-4cc9-ad93-d001fc1c3bf4.png)


Không giống như phương thức MVC, ViewModel không phải là một Controller. Thay vào đó hoạt động như một chất kết dính liên kết dữ liệu giữa View và Model. Trong khi định dạng MVC được thiết kế đặc biệt để tạo ra sự tách biệt mối quan tâm(separation of concerns) giữa Model vàView, định dạng MVVM với ràng buộc dữ liệu được thiết kế riêng để cho phép View và Model giao tiếp trực tiếp với nhau.

Đây là lý do tại sao các Single Page Application hoạt động rất tốt với ViewModels. Nó rất đơn giản và cho phép View giao tiếp trực tiếp với backend. Do đó, các Single Page Application MVVM có thể di chuyển nhanh chóng và trôi chảy và lưu thông tin vào cơ sở dữ liệu liên tục (Google Docs sẽ là một ví dụ hoàn hảo).

Tuy nhiên, định dạng MVVM cũng có các nhược điểm riêng. Vì nó phụ thuộc vào liên kết dữ liệu, ViewModel tiêu thụ một lượng bộ nhớ đáng kể so với các đối tác điều khiển của nó. Bản thân người tạo ra mẫu MVVM, John Gossman, nói rằng chi phí để thực hiện MVVM là quá mức cần thiết cho các hoạt động UI đơn giản (Gossman). Các ứng dụng lớn hơn sử dụng phương pháp ViewModel thường xuyên trở nên cực kỳ khó chạy. Vì lý do này, mẫu thiết kế MVVM được sử dụng chủ yếu cho các ứng dụng trang / chức năng đơn trên web.

Trong bài viết này, mình đã trình bày những phần cơ bản nhất của 2 môn hình ứng dụng web phổ biến. Mong các bạn đóng góp và bổ sung để hoàn thiện bài viết.

## Nguồn
https://hackernoon.com/mvc-vs-mvvm-how-a-website-communicates-with-its-data-models-18553877bf7d