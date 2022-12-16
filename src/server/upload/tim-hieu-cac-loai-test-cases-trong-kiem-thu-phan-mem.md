![](https://images.viblo.asia/a732f2ec-954c-40e5-bad2-341fd6912736.png)

Trong kiểm thử phần mềm, có nhiều phương pháp hoặc kiểu kiếm thử khác nhau để đảm bảo chất lượng tốt nhất cho một sản phẩm, và gần như chúng ta không thể kiểm tra hết tất cả mọi thứ nhưng chắc chắn chúng ta có thể đến gần hơn bằng cách thu hẹp và lựa chọn các trường hợp kiểm tra cụ thể. Để xác định được loại kiểm thử nào phù hợp với mục đích nào, chúng ta cần xem xét nhiều loại kiểm thử khác nhau, từ đó lọc ra những trường hợp kiểm thử (Test cases) phù hợp nhất để tạo được sản phẩm chất lượng cao nhất.

Dưới đây là các Trường hợp kiểm thử (Test cases):

1. Functionality Test Cases (Các trường hợp kiểm thử chức năng)
2. User Interface Test Cases (Các trường hợp kiểm thử giao diện người dùng)
3. Performance Test Cases (Các trường hợp kiểm thử hiệu năng)
4. Integration Test Cases (Các trường hợp kiểm thử tích hợp)
5. Usability Test Cases (Các trường hợp kiểm thử khả năng sử dụng)
6. Database Test Cases (Các trường hợp kiểm thử Cơ sở dữ liệu)
7. Security Test Cases (Các trường hợp kiểm thử Bảo mật)
8. User Acceptance Test Cases (Các trường hợp kiểm thử khả năng chấp nhận của người dùng)**


##  **1. Functionality Test Cases (Các trường hợp kiểm thử chức năng)**

![](https://images.viblo.asia/279eb203-fa72-4ad7-be84-777dc953fd8f.png)


Đây là những Trường hợp kiểm thử xác định sự thành công hay thất bại của các chức năng mà phần mềm dự kiến sẽ thực hiện. 
Những trường hợp này thuộc loại kiểm thử hộp đen (Black-box testing), cho phép việc kiểm thử mà không cần truy cập vào cấu trúc bên trong của phần mềm đang được kiểm tra. 
Chúng có thể được viết và chạy ngay khi người phát triển tạo ra một chức năng đầu tiên và sẵn sàng cho việc kiểm thử. 
Những trường hợp kiểm thử chức năng sẽ được lặp lại khi có những cập nhập được thêm vào.

*Ví dụ:*
+ *Xác nhận người dùng có thể tạo tài khoản thành công.*


##  **2. User Interface Test Cases (Các trường hợp kiểm thử giao diện người dùng)**

![](https://images.viblo.asia/5d4c6db0-964f-4676-8fe8-1b5ad2413298.png)

Các trường hợp kiểm thử giao diện người dùng được sử dụng để xác minh rằng các phần cụ thể của sản phẩm được hiển thị và hoạt động giống với thiết kế. 
Các trường hợp kiểm tra này có thể được sử dụng để xác định sự không nhất quán về mặt thẩm mỹ, lỗi ngữ pháp và chính tả, các liên kết (hyperlinks) và bất kỳ yếu tố nào khác mà người dùng tương tác hoặc nhìn thấy.

Những trường hợp kiểm thử giao diện người dùng thường được viết bởi nhóm thử nghiệm (QA/Tester) nhưng nhóm thiết kế (Design/FrontEnd) có thể tham gia vì họ rất quen thuộc với giao diện người dùng. Việc kiểm thử giao diện người dùng trong kiểm thử phần mềm thường thúc đẩy việc kiểm thử trình duyệt chéo. Các trình duyệt có xu hướng hiển thị mọi thứ khác nhau và các trường hợp kiểm tra giao diện người dùng giúp đảm bảo ứng của bạn hoạt động nhất quán trên nhiều trình duyệt. 

Các trường hợp kiểm thử giao diện sẽ được chạy sau khi giai đoạn phát triển hoàn tất (có thể hoàn tất ở từng màn hình hoặc chức năng) và giao diện người dùng được kết nối với cơ sở dữ liệu.

*Ví dụ:*
+ *Xác nhận màu sắc của các buttons có đúng như thiết kế.*
+ *Xác nhận UI không bị vỡ, chồng đè khi mở một trang web trên các trình duyệt khác nhau, trên các kích thước màn hình khác nhau*.


##  **3. Performance Test Cases (Các trường hợp kiểm thử hiệu năng)**

![](https://images.viblo.asia/905fdb2f-c5f4-4668-8c48-70742d10d3ca.jpeg)

Các trường hợp kiểm thử hiệu năng giúp kiểm tra thời gian phản hồi và hiệu quả tổng thế của một ứng dụng. Đó là, sau khi thực hiện một hành động, phải mất bao lâu để hệ thống phản hồi. 
Nhóm thử nghiệm (QA/Tester) sẽ thực hiện viết các trường hợp này và thường được thử nghiệm tự động hóa. Với một hệ thống lớn có thể thực hiện hàng trăm hoặc hàng ngàn bài thử nghiệm hiệu suất, do vậy tự động hóa các thử nghiệm này và chạy chúng thường xuyên giúp làm rõ (phơi bày) các tình huống mà ứng dụng không hoạt động ở mức mong đợi.

Các trường hợp kiểm thử hiệu năng làm rõ cách ứng dụng sẽ hoạt động như thế nào trong thực tế. Những trường hợp này có thể được viết khi nhóm thử nghiệm (QA/Tester) đã nhận được yêu cầu về hiệu suất từ nhóm sản phẩm. Tuy nhiên nhiều trường hợp kiểm thử hiệu suất được xác định bằng (manual) mà không có yêu cầu cụ thể.

*Ví dụ:*
+ *Mất bao lâu để hệ thống xác thực người dùng và tải trang tiếp theo*
+ *Khi số lượng người dùng đăng nhập lớn, thì ứng dụng có hoạt động ổn định không*


##  **4. Integration Test Cases (Các trường hợp kiểm thử tích hợp)**

![](https://images.viblo.asia/f11fbc7a-5f0b-4516-9a24-3c6c48004935.png)


Các trường hợp kiểm thử tích hợp giúp kiểm tra sự tương tác hoạt động giữa các modules khác nhau, đảm bảo các giao diện giữa các các modules khác nhau hoạt động đúng.
Nhóm thử nghiệm (QA/Tester) sẽ cần xác định module nào hoạt động riêng lẽ, các module nào sẽ hoạt động cùng nhau, tác động lên nhau để đưa ra quyết định viết các trường hợp thử nghiệm tích hợp cho khu vực thích hợp. 

*Ví dụ:*
+ *Kiểm tra sự liên kết giữa trang Setting và trang Hiển thị, từ việc Setting nó có xuất hiện đúng tại trang Hiển thị.*


##  **5. Usability Test Cases (Các trường hợp kiểm thử khả năng sử dụng)**

![](https://images.viblo.asia/2ac26e81-962f-40ee-8d81-20c9eb85821a.jpg)


Các trường hợp kiểm thử khả năng sử dụng là những trường hợp phi chức năng (Non-functional), giúp xác định cách người dùng tiếp cận và sử dụng sản phẩm một cách tự nhiên. Việc thực hiện các trường hợp kiểm thử này nên là những người chưa từng biết về ứng dụng, hoặc người kiểm thử (QA/Tester) sẽ thực hiện sử dụng ứng dụng với vai trò là một người dùng mới thực thụ để hiệu quả kiểm thử.
Việc kiểm thử khả năng sử dụng nên được thực hiện trước khi kiểm tra chấp nhận người dùng (User Acceptance Test).

*Ví dụ:* 
+ *Với một người dùng mới, ứng dụng có dễ sử dụng, thao tác không?*
+ *Người dùng có thể thêm nhiều mặt hàng liên tục vào giỏ hàng của họ không? Trải nghiệm đó được thực hiện nhanh và dễ không?*


##  **6. Database Test Cases (Các trường hợp kiểm thử Cơ sở dữ liệu)**

![](https://images.viblo.asia/433e469a-2039-4294-a7fb-9594809156cf.jpg)


Để viết các trường hợp kiểm thử Cơ sở dữ liệu, bạn cần có hiểu biết sâu về toàn bộ ứng dụng, các bảng cơ sở dữ liệu và các thủ tục được lưu trữ. 
Nhóm thử nghiệm sẽ sử dụng các truy vấn SQL để phát triển các trường hợp kiểm thử dữ liệu.
Kiểm tra cơ sở dữ liệu được sử dụng để xác minh nhà phát triển đã viết mã theo cách lưu trữ và xử lý dữ liệu một cách nhất quán, an toàn.

*Ví dụ: Khi người dùng tạo và gửi hồ sơ của họ, những điều sau đây cần được kiểm tra liên quan đến cơ sở dữ liệu:*
+ *Có phải ứng dụng lưu trữ dữ liệu mà người dùng đã nhập vào cơ sở dữ liệu?*
+ *Có bất kỳ dữ liệu nào bị mất trong quá trình lưu trữ?*
+ *Dữ liệu sai không nên được lưu trữ.*


##  **7. Security Test Cases (Các trường hợp kiểm thử Bảo mật)**

![](https://images.viblo.asia/fc3cefb8-6149-4750-a50f-c1e91dfbe612.png)

Các trường hợp kiểm thử Bảo mật giúp đảm bảo ứng dụng hạn chế được các hành động và quyền bất cứ khi nào cần thiết, bảo vệ các dữ liệu bí mật.
Xác thực và mã hóa thường là trọng tâm chính trong các trường hợp kiểm thử Bảo mật. 

*Ví dụ:*
+ *Nếu người dùng đạt X số lần đăng nhập thất bại, tài khoản có bị khóa không?*
+ *Nếu nhập User và Password giống nhau thì có được phép không?*


##  **8. User Acceptance Test Cases (Các trường hợp kiểm thử khả năng chấp nhận của người dùng)**

![](https://images.viblo.asia/d43a403c-35ff-499b-89da-1871d035ffbf.jpg)


Các trường hợp kiểm tra chấp nhận của người dùng thường rộng và bao gồm tất cả các khu vực của ứng dụng. 
Mục đích của các trường hợp kiểm thử này không phải là tìm lỗi mà để xác minh ứng dụng được người dùng chấp nhận. 
Các trường hợp kiểm thử chấp nhận được sử bởi người dùng cuối hoặc khách hàng và được được viết bởi nhóm thử nghiệm hoặc người quản lý sản phẩm. Đây cũng là giai đoạn kiểm thử quan trọng vì đây là bước cuối cùng trước khi đưa sản phẩm đến với người dùng.

*Ví dụ: Với ứng dụng quản lý ảnh cho một studio:*
+ *Khách hàng (người dùng sản phẩm) có thể tải ảnh lên và quản lý ảnh theo cách phù hợp với nhu cầu kinh doanh của họ không?* 


Các nguồn tham khảo:
1. https://blog.testlodge.com/types-of-test-cases-in-software-testing/
2. https://tfortesting.wordpress.com/2012/10/08/test-cases-for-security-testing/
3. https://www.oodlestechnologies.com/blogs/How-to-Write-Test-Case-for-Performance-Testing
4. https://www.myloadtest.com/how-to-write-a-performance-test-case/
5. https://www.softwaretestinghelp.com/database-testing-practical-tips-and-insight-on-how-to-test-database/