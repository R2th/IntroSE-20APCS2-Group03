![](https://images.viblo.asia/300x250/21e7e057-d70c-479d-9c04-c9ea65195909.jpg)

Một câu hỏi phổ biến thường được hỏi bởi những người mới chuyển sang sử dụng Linux :
> “Tại sao Linux không cần phần mềm diệt virus?”

Không có gì ngạc nhiên khi mọi người tự hỏi câu hỏi này. Hầu hết mọt người trước đây đều là người dùng Windows, mà Windows được biết đến là một hệ điều hành không tốt để tự mình chống lại virus ( dù bây giờ Window 10 đã tốt hơn trước nhiều rồi :stuck_out_tongue_closed_eyes: ). Do đó người dùng thường cần tự cài cài đặt Antivirus.

Thế còn Linux tại sao nó không cần ? Vì nó bảo vệ quá tốt nên không thể có virus ?

Ồ không =)), Linux không hoàn toàn chống được toàn bộ Virus. Tuy nhiên, so với Windows, con số so sánh có lẽ là 1: 100 hoặc thậm chí là 1000. Hoặc thậm chí hơn, đến mức người ta chả bao giờ cần xử lý virus. 

Tất nhiên điều đó không có nghĩa là Linux hoàn toàn an toàn trước các mối đe dọa Virus. Android cũng dựa trên Linux và số lượng phần mềm độc hại hiện có là đủ lớn. Một số máy chủ dựa trên Linux cũng sử dụng các chương trình chống Virus để tăng cường bảo vệ. Phần mềm chống Virus không hoàn toàn vô dụng trên Linux.

Nhưng trong môi trường máy tính để bàn (máy tính xách tay hoặc PC), ta có thể không cần trình Antivirus, vì những lý do sau đây:

# Rất ít Virus trên Linux tồn tại
![](https://images.viblo.asia/bce265bc-a317-4fb7-8dc0-37f1cc71d99d.png)

Một hacker không có khả năng dành thời gian phát triển phần mềm độc hại cho một hệ điều hành chỉ chiếm hai hoặc ba phần trăm thị trường máy tính để bàn. Tốt hơn hết là họ nên làm virus trên hệ điều hành chiếm phần lớn người dùng: Windows.

Hầu hết phần mềm độc hại tấn công những người không hiểu biết về kỹ thuật. Sẽ dễ dàng hơn để lừa ai đó không biết chuyện gì đang xảy ra khi nhấp vào một liên kết đáng ngờ hoặc mở một tệp ZIP sơ sài. Hầu hết người dùng Linux đều có hiểu biết cơ bản về cách máy tính của họ hoạt động. Tin tặc sẽ có thể dễ dàng hơn trong việc lừa một người dùng Windows thông thường.

Tất cả điều này liên quan chỉ đến máy tính để bàn. Máy chủ là một câu chuyện khác. Linux là mục tiêu lớn nhất của các hệ thống máy chủ vì nó chiếm phần lớn thị trường. Hầu hết các doanh nghiệp lớn và các trang web lớn đều chạy trên hệ thống Linux. Nếu một máy chủ Linux không có đủ bảo mật, nó có thể gặp sự cố nghiêm trọng.

# Phân quyền người dùng
![](https://images.viblo.asia/400x200/566c7e27-769c-416f-84b9-62aaf7fa538f.jpg)

Hầu hết vi rút đến từ internet. Chúng cũng có thể đến từ các phương tiện lưu trữ, cụ thể là ổ USB. Ta thực sự cần hết sức cẩn thận khi cắm ổ USB flash của mình vào một Laptop / PC khác, đặc biệt là PC công cộng. PC công cộng là ổ virus.

Cách thức hoạt động của virus thực sự rất dễ hiểu. Nó hoạt động bằng cách cài đặt và chạy chính nó trên máy tính của bạn. Miễn là hệ điều hành của bạn có phân quyền user tốt, thì không có virus nào có thể tự chạy được. Một hệ điều hành có phân quyền tốt thường chỉ cho phép người dùng có cấp độ cao nhất (superuser) chạy và cài đặt các chương trình mới. Thông thường, bạn sẽ được yêu cầu nhập mật khẩu superuser để đăng nhập với tư cách là superuser.

Linux là một hệ điều hành có mức phân quyền rất tốt. Không phải tất cả người dùng đều có đặc quyền truy cập các tệp liên quan đến hệ thống. Chỉ superuser (root), người có đặc quyền truy cập vào tất cả các tệp trong hệ thống. Nếu không có root, ta sẽ không thể chạy và cài đặt các chương trình mới trên Linux. Đó là lý do tại sao các chương trình virus không thể tự chạy được.

Windows đã thực sự cố gắng khắc phục sự cố này bằng cách áp dụng UAC (User Account Control) kể từ Windows Vista. Tuy nhiên, vẫn còn một số lỗ hổng cần sửa chữa. Nếu bạn chạy một chương trình có khả năng gây hại cho máy tính của mình, Windows sẽ chỉ hiển thị một hộp thoại với cặp nút Yes và No. Nếu bạn nhấn nút Yes thì chương trình sẽ chạy. Bạn thậm chí sẽ không được yêu cầu nhập bất kỳ mật khẩu nào!

# Phương pháp khi cài đặt một ứng dụng mới
![](https://images.viblo.asia/400x400/802a9397-f2e3-4cac-a7d0-2ede2fbe2542.png)

Một lỗ hổng lớn khác trên Windows thường được những kẻ tạo virus lợi dụng là phương pháp cài đặt. Hầu hết người dùng Windows vẫn dựa vào các tệp nhị phân (với phần mở rộng là .EXE) để cài đặt các ứng dụng. Có rất nhiều ứng dụng miễn phí cho Windows có sẵn trên internet. Đáng buồn là không phải tất cả các ứng dụng miễn phí đều đủ an toàn để cài đặt. Một số có thể chứa phần mềm gián điệp, phần mềm tống tiền và các loại phần mềm độc hại khác.

Linux có một khái niệm khác trong việc cung cấp các ứng dụng. Tất cả các bản phân phối Linux đều đi kèm với trình quản lý gói  ( Package Managers ) cũng như kho phần mềm ( Software Repository ). Trình quản lý gói là một công cụ để cài đặt các ứng dụng mới trên Linux. Ngoài ra, một trình quản lý gói cũng có thể được sử dụng để cập nhật các ứng dụng cũng như gỡ bỏ chúng. Một số ví dụ về trình quản lý gói là Synaptic, apt, Ubuntu Software Center, v.v. Tóm lại, không phải tất cả người dùng đều có đặc quyền chạy trình quản lý gói. Họ sẽ được yêu cầu nhập mật khẩu gốc để chạy nó.

Nếu bạn đang cài đặt một ứng dụng mới trên Linux bằng trình quản lý gói nhất định, trình quản lý gói bạn đang sử dụng sẽ tải xuống các tệp cần thiết từ kho phần mềm. Kho lưu trữ phần mềm ( Software Repository hay thường được gọi tắt là “repo” ) là vị trí lưu trữ mà từ đó các gói phần mềm ( Software Packages ) có thể được truy xuất và cài đặt.

Microsoft đã thực sự đưa ra khái niệm tương tự dưới dạng Microsoft Store. Tuy nhiên, không phải tất cả các nhà cung cấp phần mềm đều sẵn sàng đưa sản phẩm của họ lên đó. Bên cạnh đó, không dễ để thay đổi thói quen của người dùng vốn tự mình cài đặt từ bên ngoài.

# Phần kết luận
Mặc dù ta không cần cài đặt phần mềm chống virus trên Linux, nhưng điều đó không có nghĩa là ta không cần phải làm gì để giữ an toàn cho hệ thống Linux của mình. Để giữ an toàn cho hệ thống Linux, hãy nhớ cập nhật thường xuyên phần mềm đã cài đặt, đặc biệt là những phần mềm bạn sử dụng thường xuyên nhất. Phiên bản mới nhất của phần mềm thường đi kèm với các bản sửa lỗi bên ngoài các tính năng mới.

# Tham khảo
* https://medium.com/@sunawang/technical-reasons-why-linux-doesnt-need-antivirus-b5ef6aeb131b
* https://www.lifewire.com/why-linux-doesn-t-usually-need-an-antivirus-4628342
* https://www.howtogeek.com/135392/htg-explains-why-you-dont-need-an-antivirus-on-linux-and-when-you-do/