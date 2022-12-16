> **Phần 9 - Installation and Uninstallation Testing**

Bạn đã từng thực hiện kiểm thử cài đặt phần mềm chưa? Nó là một phần khá thú vị trong vòng đời kiểm thử phần mềm.
Do cài đặt là sự tương tác đầu tiên mà người dùng có với ứng dụng. Quá trình trơn tru, không gặp vấn đề ngắt ngang sẽ tạo được cảm giác hài lòng và lấy được đánh giá tốt của khách hàng.

Nếu quá trình cài đặt của bạn thành công trên hệ thống mới thì sẽ tạo được ấn tượng tốt cho khách hàng và nếu thất bại thì mọi thứ hoàn toàn ngược lại. Nếu quá trình cài đặt không thành công thì ứng dụng của chúng ta sẽ không hoạt động được trên hệ thống đó, không chỉ vậy mà còn có thể khiến hệ thống của người dùng bị hỏng trong một số trường hợp bị ảnh hưởng nghiêm trọng.

Trong trường hợp trên sẽ để lại ấn tượng không tốt cho người dùng vì chúng ta đã kiểm thử cài đặt không đầy đủ. Chúng ta cần làm gì để có ấn tượng tốt đầu tiên với người dùng? Cần phải có kiểm thử cài đặt trên các máy khác nhau có cấu hình khác nhau mặc dù việc này đòi hỏi rất nhiều thời gian, thậm chí chỉ để thực hiện một trường hợp thử nghiệm duy nhất. Bài này sẽ đưa ra một vài quan điểm khi thực hiện Kiểm thử cài đặt cũng như gỡ bỏ cài đặt.

![](https://images.viblo.asia/716d1ce2-111d-4527-9613-8dc168ab5b48.gif)

##  Installation Testing là gì?

Hầu hết các hệ thống phần mềm đều có các quy trình cài đặt cần thiết trước khi chúng có thể được sử dụng cho mục đích chính của chúng. Kiểm thử các thủ tục này để đảm bảo rằng một hệ thống phần mềm được cài đặt và có thể được sử dụng được gọi là kiểm thử cài đặt (Installation Testing). Nó được thực hiện trong giai đoạn kiểm thử cuối cùng trước khi người dùng cuối có tương tác đầu tiên với sản phẩm.

Có rất nhiều sự kiện có thể ảnh hưởng đến việc cài đặt phần mềm và thử nghiệm cài đặt để kiểm tra một số hoạt động và sự kiện liên quan, như một số ví dụ dưới đây:
* Người dùng phải chọn nhiều tùy chọn khác nhau.
* Các tệp và thư viện phụ thuộc phải được bố trí ở đâu hay được tải lên từ đâu.
* Các tệp nào được thêm hay được thay đổi.
* Cấu hình phần cứng hợp lệ phải đáp ứng được như yêu cầu.
* Các phần mềm (có thể cần) để kết nối với các hệ thống phần mềm khác.

 Kiểm thử cài đặt được thực hiện để xác minh xem phần mềm đã được cài đặt thành công với tất cả các thành phần cần thiết trên các nền tảng khác nhau và ứng dụng hoạt động như mong đợi? Ở đây sự khác biệt về nền tảng có thể là hệ điều hành, cấu hình thiết bị như RAM, tốc độ CPU, ... 
 Điều này rất quan trọng vì cài đặt sẽ là tương tác người dùng đầu tiên với người dùng cuối.
 
 Các công ty luôn luôn được khuyến khích khởi chạy các phiên bản Beta chỉ để đảm bảo có sự chuyển đổi mượt mà hơn khi chuyển sang phát hành sản phẩm chính thức.

### Một số quan điểm khi thực hiện Kiểm thử cài đặt
*  Đầu tiên và quan trọng nhất, sản phẩm cần được kiểm tra cho bất kỳ phiên bản nào khác đã có sẵn trên máy mục tiêu. Nếu có một phiên bản của ứng dụng được cài đặt trên máy, trình cài đặt có nhận ra được không?
*  Kiểm tra phiên bản cho cùng một sản phẩm, đảm bảo phiên bản cũ hơn không được cài đặt trên phiên bản mới hơn.
*  Xác minh các điều kiện tiên quyết cần thiết để cài đặt phần mềm ứng dụng nếu có.
*  Xác minh để cài đặt phần mềm phụ thuộc (nếu có) trong khi cài đặt.
*  Hỗ trợ các nền tảng và cấu hình khác nhau cần thiết?
*  Trong trường hợp hệ điều hành Windows, trình cài đặt sẽ cung cấp đường dẫn thư mục cài đặt mặc định "C:\Program Files" (tương tự cũng sẽ có đường dẫn mặc định trên máy Mac)
*  Ứng dụng phải được xác minh để cài đặt theo đường dẫn thư mục mặc định chính xác, đồng thời người dùng cũng có thể chỉ định chọn một đường dẫn khác.
*  Kiểm tra xem sản phẩm có hỗ trợ cài đặt qua mạng không. 
*  Hướng dẫn về quy trình cài đặt phải được hiển thị chính xác.
*  Trình cài đặt nên cung cấp thêm tùy chọn Xóa/ Remove hoặc Sửa chữa/ Repair.
*  Kiểm tra cài đặt trên cấu hình máy không tương thích, chẳng hạn như cấu hình có ít bộ nhớ / RAM / HDD.
*  Trình cài đặt có thể tính dung lượng bộ nhớ cần thiết không? Gói cài đặt cần phải có xử lý riêng của nó cho trường hợp trên máy mục tiêu không đủ dung lượng bộ nhớ.
*  Phá vỡ quá trình cài đặt giữa chừng, bất kỳ lúc nào trước khi nó được hoàn thành. Điều này là để kiểm tra xem hệ thống có trở về trạng thái ban đầu của nó mà không bị cản trở hay không.
*  Kiểm tra cài đặt phần mềm khi không có đặc quyền của tài khoản quản trị. Ví dụ: đăng nhập với tư cách khách.

### Các loại cài đặt
* ***Manual installation:*** là một trường hợp khi cài đặt phần mềm được thực hiện mà không cần sự trợ giúp của trình cài đặt hoặc đòi hỏi sự tham gia của người dùng.
* ***Automatic installation:*** là khi cài đặt mà không yêu cầu bất kỳ hành động nào của người dùng ngoại trừ việc khởi động nó (nhập mật khẩu, chấp nhận thỏa thuận cấp phép, ...) 
* ***Self-installation:*** là một quá trình hoàn toàn tự động không yêu cầu khởi động ban đầu của quá trình cài đặt.
* ***Silent installation:*** các thông báo và cửa sổ khác không được hiển thị lên trong khi cài đặt phần mềm loại này.
* ***Remote installation***: là loại cài đặt mà điều khiển bởi máy tính từ xa được kết nối qua mạng LAN hoặc cáp nối tiếp.

### Thử nghiệm cài đặt lặp lại (repeated installation)
Trong quá trình cài đặt lặp lại, thường có các đề xuất: xóa, cập nhật, khôi phục, sửa đổi phần mềm đã cài đặt .

**Uninstall (Remove)** - Gỡ cài đặt - xóa chương trình
* Kiểm tra xem tất cả các thành phần, mà chương trình đã tạo vào hệ thống khi cài đặt (tệp tin, bản ghi trong Registry, liên kết thư viện, ...) sẽ bị xóa sau khi gỡ cài đặt.
* Kiểm tra xem dữ liệu được tạo trong khi làm việc với ứng dụng đã được lưu hay chưa.
* Kiểm tra xem các thông báo/ cảnh báo có xuất hiện khi cố gỡ cài đặt ứng dụng đang chạy hay không.

**Repair** - Sửa chữa - khôi phục ứng dụng nếu nó bị hỏng.
* Xóa một số dữ liệu từ thư mục cài đặt và bản ghi trong Registry. Sau khi hoàn tất thì phải đảm bảo tất cả dữ liệu phải được khôi phục.

**Modify** -  Sửa đổi - thay đổi các tùy chọn cài đặt sau khi kết thúc.
* Chỉ cài đặt một phần của các tùy chọn có sẵn trong lần cài đặt đầu tiên và trong khi sử dụng thì dùng chức năng Sửa đổi để thêm những phần còn lại.

**Update** - Cập nhật - cập nhật phiên bản chương trình.
* Kiểm tra phiên bản hiện có sau khi sử dụng chức năng Cập nhật.
* Đảm bảo rằng sau khi cài đặt các bản cập nhật, tất cả các đối tượng đã tạo trước đó vẫn hoạt động chính xác.
* Chương trình cần phải được kiểm tra tính chính xác sau khi hủy bỏ quá trình cập nhật.
 
##   Uninstallation Testing là gì?

Gỡ cài đặt là quá trình xóa ứng dụng hoặc phần mềm khỏi các thiết bị điện tử như máy tính cá nhân, máy tính xách tay, điện thoại thông minh, điện thoại di động, ... Gỡ cài đặt giúp xóa các ứng dụng hoặc chương trình không hoạt động hoặc hoạt động bình thường, đã lỗi thời hoặc không được sử dụng nữa. Việc gỡ cài đặt một phần mềm cũng có thể giúp đỡ trong trường hợp chúng ta cần thêm dung lượng bộ nhớ cho một phần mềm khác. Tuy nhiên, gỡ cài đặt nếu được thực hiện không đúng cách có thể dẫn đến các vấn đề về hiệu suất và các vấn đề đối với thiết bị điện tử.

Kiểm thử gỡ cài đặt được thực hiện để xác minh xem tất cả các thành phần của ứng dụng được xóa trong quá trình này hay không? đúng cách hay chưa? Việc gỡ cài đặt thành công nên đảm bảo rằng tất cả cấu trúc thư mục và mọi dữ liệu được tạo trong quá trình hoạt động sẽ bị xóa mà không cần bất kỳ thao tác thủ công nào khác. Sau khi gỡ cài đặt, hệ thống vẫn phải ổn định và hoạt động tốt .

### Một số quan điểm khi thực hiện Kiểm thử gỡ cài đặt

* Tất cả các thư mục và tệp tin được tạo bởi trình cài đặt sẽ bị xóa khỏi bộ nhớ. Nếu bạn sao chép tệp vào thư mục cài đặt sản phẩm phần mềm và tệp đó không có kết nối với sản phẩm phần mềm, thì tệp đó và thư mục sẽ không bị xóa.
* Khi gỡ cài đặt, tất cả các bản ghi trong Registry, các thư viện DLL trong thư mục WINDOWS/ SYSTEM, các biểu tượng/ icon, ... sẽ bị xóa khỏi hệ thống.
* Tất cả tệp/ dữ liệu được tạo ra trong quá trình sử dụng sản phẩm sẽ không bị xóa.
* Nếu các phần mở rộng hay phần mềm khác bị thay đổi khi cài đặt phần mềm này, thì sau khi gỡ bỏ phần mềm này các thay đổi trước đó sẽ được khôi phục lại.
* Nếu phần mềm đang chạy, thì trong quá trình xóa, người dùng sẽ được thông báo rằng ứng dụng đang chạy và nhận tùy chọn để dừng hoặc tiếp tục việc gỡ bỏ.

## Một vài Test case cơ bản cho kiểm thử cài đặt/ gỡ bỏ ứng dụng trên điện thoại
| STT  | Kiểm thử cài đặt ứng dụng | Kiểm thử gỡ bỏ ứng dụng  |
| -------- | -------- | -------- |
|   1  | Xác minh rằng ứng dụng có thể được tìm kiếm và cài đặt trên Play Store/ App Store hoặc tập tin cài đặt đúng cách.   |  Xác minh rằng ứng dụng có thể được gỡ cài đặt thành công mà không phát sinh bất kỳ lỗi nào.  | 
|   2  | Xác minh rằng ứng dụng có thể được cài đặt thành công mà không phát sinh bất kỳ lỗi nào.     |  Điều hướng đến nơi bạn sẽ thấy biểu tượng ứng dụng để xác minh rằng biểu tượng ứng dụng không còn hiển thị trên thiết bị nữa sau khi gỡ bỏ thành công.  |
|   3  | Xác minh rằng biểu tượng ứng dụng có thể được tạo vào thanh menu và trên màn hình Home sau khi cài đặt.     |  Sau khi gỡ cài đặt thành công, các tệp và thư mục có liên quan có thể xóa khỏi ROM  điện thoại.  |
|   4  | Xác minh rằng trong khi cài đặt, phiên bản được hiển thị cho người dùng, phải khớp với phiên bản mà người dùng đã chọn ban đầu.     |      |
|   5  | Xác minh sau khi cài đặt thành công, các tệp và thư mục liên quan được tạo vào trong ROM điện thoại.     |      |


###
**Những phần trước cùng chủ đề "Make a Different in Software Testing Basics":**

>* Phần 1 - **[Functional Testing and Non-Functional Testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-1-djeZ1awQZWz)**
>* Phần 2 - **[Re-testing and Regression testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-2-1Je5EMg15nL)**
>* Phần 3 - **[Boundary value analysis and Equivalence partitioning](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-3-4P856XvRZY3)**
>* Phần 4 - **[Verification and Validation](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-4-oOVlYdXvZ8W)**
>* Phần 5 - **[Test Case and Test Scenario](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-5-6J3Zg2xEKmB)**
>* Phần 6 - **[Quality Assurance and Quality Control](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-6-oOVlY12yl8W)**
>* Phần 7 - **[User Story and Requirement](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-7-6J3ZgJyRKmB)**
>* Phần 8 - **[Unit, Integration and Functional Testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-8-63vKjaBA52R)**