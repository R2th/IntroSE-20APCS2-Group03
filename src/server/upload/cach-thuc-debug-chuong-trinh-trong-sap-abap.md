Tác giả: [QuynhBC](https://www.facebook.com/bui.congquynh)

Xin chào các bạn. 

***Tiếp nối bài viết đầu tiên giới thiệu sơ qua về SAP thì ở bài viết tiếp theo này mình sẽ giới thiệu cho các bạn về cách thức Debug trong các chương trình SAP ABAP.***

Nếu các bạn đã biết hoặc ở trình độ cao hơn xin comment và nêu thêm vài phương pháp khác. Mình xin cảm ơn

Bài viết 05.

## **1: Khái niệm về Debug**

 Debug là một thuật ngữ, được liên kết trực tiếp với lập trình. Đây là một thuật ngữ chung được sử dụng bởi tất cả các lập trình viên, bất kể ngôn ngữ và nền tảng. Debug như tên cho thấy, được sử dụng để gỡ lỗi chương trình. Nói cách khác, đó là chuyển động chậm, thực hiện từng bước của chương trình, để người ta có thể tìm thấy chặt chẽ, cách chương trình / phần mềm đang hoạt động.
 
 Debug  thường được sử dụng để sửa lỗi trong chương trình.  Debug trong SAP luôn được sử dụng để hiểu đúng các logic hay bước của chính chương trình.
 
##  2: Traditional Debugging
 
 Nó có thể được hiểu là kiểu Debug mù ( theo cách hiểu của mình ). Chúng ta sẽ Debug từ lúc bắt đầu chương trình tới khi chúng ta tìm được lỗi chương trình theo cách mà chúng ta cho răng nó lỗi tại vị trí đó.
 
Debugi trong SAP có thể được khởi động bằng cách gõ ‘**/ h**’ vào các trường lệnh trước khi thực thi chương trình. Thông thường tất cả các chương trình Báo cáo đều có màn hình lựa chọn. Hầu hết mã chương trình được thực thi sau khi màn hình lựa chọn được hiển thị, vì vậy việc gỡ lỗi có thể được bắt đầu một cách an toàn sau khi màn hình lựa chọn được hiển thị. Nếu bắt buộc phải gỡ lỗi phần mã được thực thi ngay cả trước màn hình lựa chọn, thì bạn không nên bắt đầu gỡ lỗi bằng phương pháp này. Phương pháp này không phù hợp với màn hình Báo cáo không có lựa chọn. Để gỡ lỗi các nhóm mô-đun SAP, nên sử dụng phương pháp này, nếu nó được yêu cầu gỡ lỗi chương trình sau khi màn hình đầu tiên được hiển thị.
![](https://images.viblo.asia/2838678b-4ed0-4ae1-a578-fe15678b9c21.png)
![image.png](https://images.viblo.asia/242af1f6-8e64-4641-a2f0-2124cf0f508c.png)

Tiếp theo chương trình sẽ tự động chạy vào dòng đầu tiên của chương trình mà bạn cần Debug.
![](https://images.viblo.asia/4ccc1332-335b-4152-b983-3cc5ed898b7e.png)


Tại màn hình Debug chúng ta bắt đâu đi sâu vào cách thức Debug.

Các loại thực thi trong Debug.
![image.png](https://images.viblo.asia/4580742b-3526-4a9f-b40a-a3d5fba7ee13.png)

Giá trị hiện tại của biến có thể được truy xuất bằng cách nhấp đúp vào biến. Giá trị và biến được hiển thị ở phần dưới cùng của cửa sổ gỡ lỗi. Có thể thay đổi giá trị của biến để kiểm tra một kịch bản cụ thể. Điều này được kiểm soát bởi ủy quyền. Rất nguy hiểm nếu có quyền truy cập này trong Hệ thống sản xuất. Để thay đổi giá trị của biến, hãy nhập giá trị mới so với biến trong cửa sổ bên dưới và nhấn biểu tượng thay đổi hiển thị một giá trị trên mỗi bản ghi. Không thể thay đổi giá trị của một số biến như tham số nhập của một hàm, v.v. Để xem nội dung của bảng nội bộ, hãy chuyển đến tab bảng trên cửa sổ Gỡ lỗi và nhấp đúp vào bảng nội bộ. Nó hiển thị nội dung của bảng Internal. Nếu ai đó biết tên của bảng / Biến nội bộ, nó có thể được viết trực tiếp ở dưới cùng của cửa sổ. Khi nhấn enter, các giá trị được hiển thị.
![image.png](https://images.viblo.asia/b5b96234-5add-4c9a-a1a0-d94dd50dc40e.png)
![image.png](https://images.viblo.asia/9c31a0df-20c3-429b-b966-2d1d6e99cbd9.png)

## 3: Programmed Break-Points:

*  BREAK-POINT*

chương trình sẽ dừng lại tại điểm ngắt ( Break-point ) được thiết lập nhưng đúng logic mà chương trình đi vào.
![image.png](https://images.viblo.asia/beb8c785-136a-41c6-a164-fdc8d2ef8ad7.png)

* BREAK USERNAME


Trong kỹ thuật này, điểm ngắt chỉ có hiệu quả đối với người dùng <UNAME>. Tất cả những người dùng khác sẽ tiếp tục thực hiện chương trình theo cách bình thường. Cần lưu ý rằng có nhiều khả năng các điểm ngắt này được nhúng vào chương trình ngay cả sau khi giải pháp và chương trình được chuyển đến Hệ thống sản xuất có Điểm ngắt. Vì vậy cần đặc biệt lưu ý để loại bỏ các điểm đứt gãy này.
 
    VD: BREAK QUYNHBC.
![image.png](https://images.viblo.asia/ce25257e-fffd-496b-8631-c8f4c6b800e8.png)
    
## 4: WATCHPOINT.
Watchpoint  là một điểm ngắt có điều kiện chỉ được xác định trong Trình gỡ lỗi ABAP trong một phiên gỡ lỗi đang chạy. 
 
Nó là một trong những tiện ích thời gian chạy được cung cấp để dừng và gỡ lỗi các chương trình ABAP.  
    
Khi gỡ lỗi mã ABAP, bạn có thể sử dụng các điểm theo dõi để theo dõi giá trị của các biến ABAP riêng lẻ.  
    
Trình gỡ lỗi ABAP dừng ngay sau khi giá trị của biến được theo dõi thay đổi.  
    
Watchpoint  giúp các nhà phát triển ABAP giám sát nội dung của các biến được chỉ định và sự thay đổi giá trị của chúng trong quá trình xử lý thời gian chạy.
    
Các tính năng của Watchpoint như sau:

* Các điểm giám sát có thể được tạo khi đang bật Trình gỡ lỗi ABAP và tự động bị xóa khi phiên gỡ lỗi đó kết thúc.
* Các điều kiện logic có thể được chỉ định cho các điểm theo dõi. Một điểm giám sát được cung cấp một toán tử quan hệ và trường so sánh để chỉ định các điều kiện ngắt.
* Giống như Breakpoint, các điểm theo dõi có thể bị xóa nếu cần.
* Khi đạt đến điểm theo dõi, nó sẽ được hiển thị trên câu lệnh của chương trình và một cảnh báo tương ứng sẽ được đưa ra.
    
  Cách thức để tạo một Watchpoint.
![image.png](https://images.viblo.asia/1e15ebc6-7bf3-4db1-9033-2ed0a158fbbd.png)
  ![image.png](https://images.viblo.asia/fa65b94a-4666-4e95-9706-2cd6667b6d23.png)
    
 Như các bạn thấy tại Internal table LT_DATA có 21 dòng diễu liệu mà không có điều kiện để xét mỗi khi loop table với tưng dòng dữ liệu.
    
 Giả sử LT_DATA có hơn 1000 dòng dữ liệu mà chúng ta chỉ muốn check dữ liệu tại dòng 142 mà bỏ qua 141 dòng đầu tiên thì ta sẽ nghĩ ngay tới WatchPoint. 
    
 Dưới đây cách mà các bạn dùng WatchPoint. Mình sẽ lấy dữ liệu dòng 14 với CONNID = 0002.
  
    Nhấn vào WatchPoint trên thành công cụ và điền các giá trị tương ứng.
 ![image.png](https://images.viblo.asia/4f5d4647-7bdc-4166-a481-a439d877ca10.png)
  ![image.png](https://images.viblo.asia/6d89de5f-500a-4571-8d75-5b3e2f3fbeac.png)
    
    Nhấn F8 
    
 ![image.png](https://images.viblo.asia/38c2e2d0-9b69-4c12-8b2b-6d62103f1b79.png)
    
 Chương trình Debug đi thằng vào vị trị mà bạn gắn WatchPoint tiết kiệm rất nhiều thời gian 
    
***~~  Note: ~~***
    
    
*  WatchPoint chỉ nên được sử dụng với các WorkArea đã được khai báo từ trước.     
* Với các WA mà được khai báo trên cùng một dòng lệnh ( declare in line ) thì WatchPoint không hoạt động.
*  WatchPoint vẫn hoạt động với các FieldSymbol song khó được tạo ra và ít khi được sử dụng. Tham khảo bài viết [tại đây](https://blogs.sap.com/2013/03/08/how-to-create-a-watchpoint-for-a-field-symbol-in-the-abap-debugger/)
    
    
 Trên đây là một vài ý kiến của mình về cách Debug trong một chương trình SAP ABAP. Nếu có ý kiến đong góp xin Comment ở phía dưới hoặc gửi tin nhắn tới cho mình để mình học hỏi thêm và bổ sung bài viết. 
    
  
  Xin cảm ơn và hẹn gặp lại bài viết tiếp theo.