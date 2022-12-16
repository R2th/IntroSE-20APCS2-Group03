# I. QTP là gì?

### 1. Giới thiệu sơ lược về QTP

![](https://images.viblo.asia/6c6af898-3a50-4646-8067-988ef5ef0c31.jpg)

HP Quick Test Professional viết tắt là QTP, là một phần mềm hỗ trợ Kiểm tra tự động hóa cho các ứng dụng phần mềm. 
QTP đi kèm với một giao diện người dùng có thể được coi là một môi trường phát triển tích hợp (IDE) cho bản thân bài kiểm tra. IDE có các tính năng khác nhau giúp người thử nghiệm phát triển một kịch bản toàn diện để xác thực thành công mục đích của thử nghiệm. 
Trong bày này, chúng ta sẽ đi tìm hiểu các kiến thức cơ bản về QTP cụ thể như sau:
* Nó sử dụng VB Script làm ngôn ngữ kịch bản của nó. (Một ngôn ngữ kịch bản là một ngôn ngữ được diễn giải trong thời gian chạy)
* QTP chỉ chạy trong môi trường windows.
* Phiên bản hiện tại của QTP là 11.0 (Phiên bản mới nhất Unified Functional Testing - UFT 11.5)
* Các công nghệ mà nó hỗ trợ là Web, Java.Net, SAP, Oracle, Siebel, PeopleSoft, Dịch vụ Web và nhiều ngôn ngữ chính. Mặc dù một số phiên bản cũ hơn không hỗ trợ tất cả các công nghệ được liệt kê.

### 2.  Các thành phần quan trọng QTP

**a)     Action**

*    Giống như thủ tục hay hàm trong các ngôn ngữ lập trình khác, Action ghi lại các bước thực hiện kiểm thử và nó có thể được sử dụng lại nhiều lần. Trong một test script có thể có nhiều action.
   
**b)     DataTable**

*    Nơi lưu trữ dữ liệu phục vụ cho kiểm thử. Một test script sẽ có một DataTable được dùng chung cho tất cả các Action. Bên cạnh đó mỗi Action cũng có một DataTable riêng cho mình.
   
**c)     Object Repository (OR)**

*    Cấu trúc theo dạng cây, mô tả các đối tượng trong phần mềm được kiểm tra. Đây được xem là cầu nối để test script tương tác với phần mềm được kiểm tra.
*    Khi ra lệnh cho QTP ghi lại thao tác người dùng lên phần mềm thì trong OR sẽ tự động phát sinh thành phần đại diện cho những đối tượng trên phần mềm vừa được thao tác.
*    OR có thể tổ chức thành 2 loại, một loại dùng chung trong nhiều test script, loại khác dùng theo từng nhóm Action.
       
**d)     Checkpoint**

*    Có thể hiều là nơi kiểm tra trong test script, khi chạy nó sẽ thực hiện so sánh kết quả thực tế khi kiểm tra phần mềm với kết quả mong đợi. Sau khi tiến hành so sanhs QTO sẽ tự động ghi lại kết quả vào Test Results.

### 3. QTP là việc như thế nào?

Phương pháp kiểm thử cơ bản vẫn là **record** và **playback** . 
Ý nghĩa thực sự của điều này là gì? 
- Trước tiên, hãy nói về ‘Record’. Khi một thử nghiệm khởi chạy QTP và thực hiện một loạt các hoạt động trên AUT (Ứng dụng được kiểm tra) QTP tạo ra các dòng mã tương ứng với từng hoạt động được thực hiện. 
- Đây sẽ là kịch bản thử nghiệm cơ bản. 
- Chuyển sang ‘Playback’. 
- Khi tập lệnh thử nghiệm được tạo chạy, nó thực hiện các hoạt động chính xác giống nhau trên AUT, do đó phát lại chuỗi các bước đã được ghi lại.

Ví dụ: Khi khởi chạy QTP và cố gắng truy cập vào trang đăng nhập của một chương trình email dựa trên web, bạn nhập ID đăng nhập, Mật khẩu và nhấn nút OK. Những hành động này được ghi lại trong dòng mã VBScript tương đương của chúng trong IDE QTP. 
Khi lưu tập lệnh thử nghiệm này và phát lại, QTP sẽ nhập cùng một ID đăng nhập, Mật khẩu mà bạn đã nhập trước đó và nhấp vào nút OK.

* Đây chính là kỹ thuật tạo thử nghiệm cơ bản, việc record và playback không phải lúc nào cũng đủ cho một kịch bản thử nghiệm mạnh mẽ. Người thử nghiệm sẽ phải sử dụng các tính năng khác trong IDE cùng với một chút kỹ năng lập trình của mình để đạt được kết quả cần thiết.

* Có nhiều khía cạnh kỹ thuật khác nhau được cân nhắc trước khi **record** và **playback**, như trạng thái của AUT, đồng bộ hóa, các tùy chọn menu chính xác, mã chính xác mà QTP tạo ra. Những điều này sẽ được sáng tỏ sau khi các khái niệm cơ bản của QTP được hiểu chính xác và cặn kẽ

* QTP xác định các đối tượng khác nhau trong AUT theo tên hoặc ID trình xử lý hoặc bất kỳ thuộc tính / thuộc tính duy nhất khác mà đối tượng sở hữu. Trong giai đoạn record, nó nắm bắt tất cả các thuộc tính này và trong khi phát lại, nó thực hiện các thao tác mong muốn như nhấp chuột, kiểm tra hộp kiểm, v.v... trên các đối tượng này.

### 4. Bạn cần những gì để bắt đầu làm việc với QTP?

* License QTP hợp lệ hoặc bạn có phiên bản dùng thử trên máy tính của mình.

* Tải xuống và cài đặt QTP: Đây là liên kết để tải xuống phiên bản dùng thử QTP: https://www.guru99.com/download-qtp.html

QTP GUI:

Khi một test case được ghi lại hoặc tạo ra nó có thể được xem trong một trong hai khung nhìn này:

**a) Chế độ xem keyword:**
* Chế độ xem này là một biểu diễn dạng bảng của tất cả các đối tượng và các hành động được thực hiện trên chúng. 
* Mỗi hàng trong bảng là một bước thực hiện trên AUT và có thể được sửa đổi. 
* Một số cột phổ biến nhất được hiển thị là mục, hoạt động, giá trị và tài liệu.
* 
**b) Chế độ xem expert:** 
 Như tên cho biết, chế độ xem này dành cho những người dùng kỹ thuật hơn, những người muốn tinh chỉnh mã nguồn theo yêu cầu của họ.

Cả hai chế độ xem đều có sẵn đồng thời để người dùng có thể chuyển đổi giữa các chế độ xem bất cứ lúc nào trong quá trình tạo hoặc sửa đổi thử nghiệm.

Chúng ta sẽ bắt đầu với một ví dụ cụ thể như sau:
Bước # 1)*
- Khởi chạy QTP. 
- Điều đầu tiên xuất hiện là trình quản lý Add-in. 
- Nó hiển thị tất cả các add-in có sẵn và người dùng có thể kiểm tra hoặc bỏ chọn những cái cần thiết. 
- Hoạt động-X, Web và Visual Basic có sẵn theo mặc định. (Tính năng này có thể được tắt nếu cần).

![](https://images.viblo.asia/f48718c8-7842-45b0-b085-7d84dda4fbb8.png)

*Bước # 2)*
Khi bấm OK trong trang bắt đầu QTP của Trình quản lý Bổ trợ sẽ xuất hiện.

![](https://images.viblo.asia/34058053-308d-4325-b650-6aad45c616c0.png)

*Bước # 3)* 
Khi chọn tùy chọn “Record” (phím F3), màn hình ‘Record and Run settings’ xuất hiện với các tab ‘Web’ và ‘Ứng dụng Windows’. 
Nhấp OK mà không thay đổi bất kỳ cài đặt nào.

![](https://images.viblo.asia/a17bb812-9d41-4fdb-896b-f66da00e0f84.png)

*Bước 4)*
Trong ví dụ này, khởi chạy ứng dụng ‘Flight’ từ các mẫu đi kèm với QTP. Nhập ‘Agent Name’ và ‘Password’ trong màn hình Đăng nhập. Bây giờ, hãy kiểm tra mã nó tạo ra.

Sau đây là chế độ xem Keyword. Như bạn có thể thấy, các hành động ở dạng một bảng với các cột: Item, Operation, Value và Documentation. 
Mục tương ứng với đối tượng trong AUT mà chúng ta đã thực hiện một hành động, thao tác là chính hành động, giá trị là một dữ liệu mà chúng ta đặt đối tượng cụ thể và tài liệu ít nhiều giống như mô tả.

![](https://images.viblo.asia/c42dcdce-6ddc-49a6-8a8c-f22037216bdb.png)

Chế độ xem Keyword tương ứng với cùng một thử nghiệm như sau. Như bạn thấy, khung nhìn này chứa mã nguồn cho tất cả các hành động được thực hiện.

![](https://images.viblo.asia/edef8c45-00fc-4307-922d-6466d49f8b41.png)

*Bước # 5)*
Code có thể được điều khiển từ một trong các khung nhìn này.

**Phần kết luận:**
Dưới đây là  tất cả những nội dung chính đã thảo luận trong bài viết này:

* QTP là một phần mềm hỗ trợ kiểm tra chức năng và hồi quy tự động của các ứng dụng phần mềm. Phiên bản hiện tại chỉ chạy trong môi trường windows. 
* Phương pháp cơ bản để tạo thử nghiệm là Record và Playback, mặc dù không phải lúc nào cũng đủ.
* Các add-in mặc định là Active X, Web và Visual Basic. Một thử nghiệm có thể được ghi lại trên một ứng dụng Web hoặc Windows; các chi tiết cụ thể sẽ được cung cấp trong cửa sổ cài đặt record và run. 
* GUI cung cấp hai khung nhìn, Keyword và Expert, trong đó:
- Chế độ xem từ khóa là một dạng bảng hiển thị các chi tiết như tên của đối tượng, giá trị của nó và hoạt động được thực hiện vv. 
- Chế độ xem chuyên gia hiển thị các hành động đã thực hiện trên AUT ở dạng mã nguồn.
* Các hoạt động bổ sung được thực hiện trên các đối tượng thử nghiệm có thể được thêm hoặc xóa hoặc từ chế độ xem Từ khóa hoặc theo chương trình từ chế độ xem Chuyên gia.

Bài tiếp theo sẽ đi tìm hiểu sâu hơn về hai chế độ xem Keyword và Expert

Nguồn:
https://www.softwaretestinghelp.com
http://learntesting123.blogspot.com