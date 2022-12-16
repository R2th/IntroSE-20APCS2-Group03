TestComplete là một giao diện người dùng cũng như một công cụ tự động hóa chức năng.Trong bài viết đầu tiên của chúng tôi, chúng tôi đã tạo các dự án Desktop và Web đơn giản, ghi lại thử nghiệm của chúng tôi, phát lại và quan sát kết quả thông qua Visual Analyzer.
Chúng tôi đã mở rộng chức năng này cho cả Ứng dụng trên Máy tính để bàn và Ứng dụng dựa trên web. Trong hướng dẫn này, chúng tôi sẽ đề cập đến Kiểm tra điều khiển dữ liệu bằng công cụ TestComeplete.<br>
![](https://images.viblo.asia/2d5d3074-1f61-49e4-b5e3-bb17eecff169.jpg)<br>
# Giới thiệu<br>
Tập lệnh thử nghiệm tự động, cho dù được ghi lại hay lập trình, thực hiện một tập hợp các hành động trên ứng dụng để kiểm tra. Trong thực tế, chúng ta thường phải chạy thử nghiệm tương tự trên các bộ dữ liệu đầu vào khác nhau.<br>
Ví dụ, để kiểm tra một biểu mẫu, chúng ta có thể sử dụng một tập dữ liệu đầu vào nào đó. Tuy nhiên, để làm cho bài kiểm tra này toàn diện, bạn có thể sẽ phải lập kế hoạch để chạy nó trên các giá trị đầu vào khác nhau. Vì vậy, cách tiếp cận chung để thử nghiệm một chức năng có nhiều giá trị dữ liệu là những gì chúng tôi gọi là Kiểm tra theo hướng dữ liệu.<br>
Phương pháp phổ biến để thử nghiệm là nhập dữ liệu từ một tệp và sau đó sử dụng nó trong thử nghiệm của chúng tôi, thay vì sử dụng các giá trị được mã hóa cứng. Kiểm tra theo hướng dữ liệu là một cách tuyệt vời để tiết kiệm thời gian và công sức. Nó cũng cải thiện phạm vi kiểm tra bằng cách tăng ROI trên Tự động hóa Kiểm tra.<br>
## **Thử nghiệm được thực hiện như thế nào trong Kiểm tra tự động hóa?**<br>
*Các bước thử nghiệm được liệt kê như sau:*<br>
1) Tạo một kịch bản thử nghiệm xung quanh một giao dịch / chức năng nhất định. Xác định những người cần xác thực qua nhiều tập hợp dữ liệu.
2) Trước tiên, kiểm tra thử nghiệm của bạn để xem nó có hoạt động với các giá trị / hằng số được mã hóa cứng của một tập dữ liệu hay không.
3) Tìm ra nguồn đầu vào tốt nhất là gì. Nó có thể là một Excel hoặc kết nối với cơ sở dữ liệu, v.v.
4) Điền nguồn dữ liệu của bạn. Nếu nó là một bảng excel, tạo dữ liệu của bạn. Nếu nó là một cơ sở dữ liệu, hãy tìm truy vấn khai thác dữ liệu chính xác mà bạn cần.
5) Thiết lập kết nối giữa nguồn dữ liệu và tập lệnh tự động hóa.
6) Trước tiên hãy chạy một hoặc hai lần lặp để gỡ lỗi và xác thực.<br>(Lưu ý rằng đối với mỗi lần lặp lại, ứng dụng mà bạn đang thử nghiệm phải có cùng điểm bắt đầu và điểm kết thúc.<br>
Ví dụ: Nếu bạn đang thử nghiệm một hoạt động đăng nhập với nhiều thông tin xác thực, hãy đảm bảo rằng sau khi nhập bộ thông tin đăng nhập đầu tiên, bạn sẽ trả lại ứng dụng trở lại trang đăng nhập, vì vậy tập hợp thông tin đăng nhập thứ hai có thể đi vào.)
7) Lặp lại trên tập dữ liệu đầy đủ của bạn.
8) Thực hiện các cải tiến bao gồm các bước xử lý ngoại lệ.
Ví dụ: Hãy để mã biết phải làm gì nếu thất bại xuất hiện. Nếu hàng 10 thông tin xác thực đăng nhập thất bại, hãy viết các bước trên những gì bạn muốn nó làm.<br>
- Bạn có muốn viết thông báo lỗi trong nhật ký và chuyển sang hàng thứ 11 không?<br>
- Bạn có muốn tập lệnh bị hủy không?<br>
- Bạn có muốn nó chờ đợi một số mục nhập thủ công, chẳng hạn như nhấp chuột hoặc cảnh báo OK<br>
## **Triển khai kiểm tra theo hướng dữ liệu thông qua TestComplete**
1) Click on File | New | New Project. <br>
2) Chỉ định tên và vị trí cho dự án. Hãy đặt tên cho nó là Tìm hiểu dữ liệu được điều khiển. Click on Next button.<br>
![](https://images.viblo.asia/5310ddae-f9ba-4ae8-8c2a-e1c3addb688b.jpg)<br>
3) Bây giờ chúng ta cần xác định loại ứng dụng. Trong trường hợp là một ứng dụng dựa trên máy tính để bàn hãy chọn ứng dụng Windows và click Next<br>
4) Nhấp vào nút Thêm và điều hướng đến vị trí để thêm ứng dụng vào dự án. Chúng tôi sẽ nhập một ứng dụng mẫu được cung cấp bởi SmarBear.<br>
*Bạn có thể tìm thấy ứng dụng tại vị trí sau*<br>
Eg: C:\Users\Public\Documents\TestComplete 12 Samples\Desktop\Orders\C#\bin\Release\Orders.exe<br>
5) Tiếp theo, trên trang này của trình hướng dẫn, bạn có thể bật / tắt Trình kiểm tra trực quan. Click Next.<br>
6) Trên trang cuối cùng của trình hướng dẫn, chọn ngôn ngữ kịch bản lệnh VBScript và click on Finish. Dự án đã sẵn sàng để chúng tôi triển khai thử nghiệm theo hướng dữ liệu.<br>
##  **Kiểm tra bản ghi với một lần lặp lại**<br>
 Chúng ta sẽ bắt đầu bằng cách tạo kịch bản cho một lần lặp của ứng dụng mẫu của chúng ta. Mục tiêu của thử nghiệm của chúng tôi là tạo một đơn đặt hàng với ứng dụng mẫu và lặp lại nó với các giá trị đầu vào khác nhau.<br>
*Làm theo các bước để ghi lại thử nghiệm:*<br>
1) Vào mục Test | Record | Record Keyword Điều này sẽ khởi chạy ứng dụng trên đó thử nghiệm sẽ được thực hiện.<br>
(Lưu ý: Nhấp vào bất kỳ hình ảnh nào để mở rộng)<br>
![](https://images.viblo.asia/286ccaa8-f8c3-47c1-a48b-483b43251cd7.jpg)
2)  Chế độ ghi sẽ bắt đầu và thanh công cụ ghi được hiển thị. Nhấp vào biểu tượng (as shown)  để chèn nhận xét.<br>
![](https://images.viblo.asia/a9406ee5-55b0-40a1-b0b1-584d6c3c306e.jpg)
3) Bây giờ, hộp thoại Add comment sẽ xuất hiện, trong hộp thoại nhập “Recording starting”. Click Add.<br>
![](https://images.viblo.asia/89f4b740-c010-44ec-9fab-66e9192e23a5.jpg)
4) Select Orders | New Order item từ menu của ứng dụng được khởi chạy. Điều này sẽ mở ra form<br>
![](https://images.viblo.asia/fbc710c5-e896-46c9-9d5e-b083dc25d918.jpg)
5) Add comment “Enter details of the order”.
6) Bạn có thể nhập bất kỳ giá trị nào bạn chọn trong các trường nhập.<br>
Ví dụ: bạn có thể sử dụng các giá trị sau<br>
![](https://images.viblo.asia/10b764d8-c23c-4aac-a85a-cfc2519c98da.png)
7) Click OK button.<br>
8) Add comment “Details of the order filled successfully”.<br>
9) Đóng ứng dụng bằng cách nhấp vào nút đóng trên thanh tiêu đề của ứng dụng.<br>
10) Click No on the pop-up dialog box.<br>
![](https://images.viblo.asia/18823a83-f5fa-4f78-a53f-81362ed03569.jpg)<br>
11) Click Stop, để dừng recording.<br>
12) Khi TestComplete đã sẵn sàng với TestScript, hãy nhấp vào nút Play để đảm bảo quá trình ghi được thực thi thành công.<br>
## **Tạo lưu trữ dữ liệu**
Để thực hiện kiểm tra theo hướng dữ liệu, chúng tôi yêu cầu tập dữ liệu. Chúng tôi có thể lưu trữ dữ liệu của chúng tôi trong bảng cơ sở dữ liệu, excel  <br>
Trong hướng dẫn này, chúng tôi đang sử dụng bảng excel để lưu trữ dữ liệu của chúng tôi và sử dụng cùng một dữ liệu cho thử nghiệm của chúng tôi.<br>
Làm theo các bước dưới đây để tạo dữ liệu<br>
- Mở Excel và tạo các cột khác nhau cho các trường nhập khác nhau. Điền dữ liệu vào các giá trị đầu vào này sẽ hoạt động như dữ liệu cho thử nghiệm. Kiểm tra hình ảnh dưới đây.<br>
 ![](https://images.viblo.asia/5439d9a1-a53f-4022-9eb9-9673ef441303.jpg)<br>
*Cách khác, bạn có thể dữ liệu mẫu do TestComplete cung cấp.*<br>
- Bạn có thể tìm dữ liệu  tại vị trí sau:<br>
 Eg: \Users\Public\Documents\TestComplete 12 Samples\Common\Data-Driven Testing\TestBook.xlsx<br>
## Sửa đổi kiểm tra để sử dụng nó cho nhiều tập dữ liệu.
Khi chúng tôi đã sẵn sàng với dữ liệu, chúng tôi cần phải sửa đổi thử nghiệm của mình để dữ liệu từ Excel có thể được nhập và sử dụng trong thử nghiệm của chúng tôi.<br>
1) Xác định vị trí comment (Nhập chi tiết của order), nhấp vào nó và nhấn SHIFT và nhấp vào bình luận (Chi tiết về đơn đặt hàng đã điền thành công). Điều này sẽ chọn tất cả các từ khóa nằm giữa hai bình luận này.<br>
Về mặt logic, chúng ta cần chọn các từ khóa để điền vào các trường cho các giá trị đầu vào khác nhau, hoặc quá trình mà chúng ta cần lặp lại nhiều lần.<br>
2) Nhấp chuột phải vào các từ khóa đã chọn. Nhấp vào Tạo vòng lặp dữ liệu. Thao tác này sẽ mở hướng dẫn tạo dữ liệu.<br>
![](https://images.viblo.asia/05864d89-c08e-4c01-8ede-0d8c9bac4e0f.jpg)
3) Trên trang đầu tiên của trình hướng dẫn, chúng tôi có thể chỉ định liệu có cần một bảng DB mới hay sử dụng bảng dữ liệu hiện có. Trong trường hợp của chúng tôi, chúng tôi đang sử dụng một bảng DB mới. Click Next.<br>
![](https://images.viblo.asia/c0f832fd-98b9-49eb-bc13-760d45265db0.jpg)
4) Trên trang tiếp theo của trình hướng dẫn, chúng tôi có các tùy chọn để chọn loại nguồn cho bảng dữ liệu của chúng tôi. Vì chúng ta đang sử dụng bảng excel như một nguồn dữ liệu, hãy chọn trang tính Excel.<br>
![](https://images.viblo.asia/187ef2c5-a0f3-40fd-9ee5-ce94053586c8.jpg)
5) Select Excel worksheet and Click Next.<br>
6) Trên trang tiếp theo của trình hướng dẫn, chúng ta cần xác định vị trí của tệp excel.<br>
Lưu ý: Bạn có thể sử dụng mẫu “TestBook.xlsx” do TestComplete cung cấp tại vị trí sau<br>
Eg: C:\Users\Public\Documents\TestComplete 12 Samples\Common\Data-Driven Testing\TestBook.xlsx<br>
![](https://images.viblo.asia/af61c4f2-9158-4f0a-a4e0-ec0f233f1957.jpg)
7) Click Next. Trên trang tiếp theo, tất cả các trang tính trong excel sẽ được hiển thị. Chọn trang tính có chứa dữ liệu. Vì sổ làm việc Excel mẫu chỉ chứa một trang tính, hãy chọn nó và bấm Tiếp theo.<br>
![](https://images.viblo.asia/881c6e94-4b23-46fd-b712-dbb2fde65e3b.jpg)
8) Trên trang này, chúng ta có thể chọn phạm vi của các hàng sẽ được sử dụng để thử nghiệm. Để nguyên các giá trị mặc định và nhấn Next.<br>
![](https://images.viblo.asia/78a2fac7-aff8-42e4-854c-3a42b5760c8b.jpg)
9) Bây giờ chúng ta phải chọn tham số trường đầu vào và nhấp vào [Sử dụng giá trị mã hóa cứng].
![](https://images.viblo.asia/cd30ce52-ae8e-43df-8fb3-c0dc0f85998f.jpg)
10) Chọn tên của cột tương ứng với trường cần được tham số hóa.<br>
11) Tham số đầu vào có tên trùng với tên cột trong excel được chọn tự động.<br>
12) Khi chúng tôi đã chọn các cột cho các giá trị đầu vào. Click on Finish button.<br>
Bây giờ chúng tôi đã sửa đổi thử nghiệm của chúng tôi cho các giá trị đầu vào khác nhau và triển khai thử nghiệm dựa trên dữ liệu bằng TestComplete.<br>
## **Thực hiện kiểm tra**
Bây giờ chúng ta hãy thực hiện thử nghiệm. Nhấn vào nút Play. Điều này sẽ khởi chạy thử nghiệm của chúng tôi. Như bạn có thể thấy ứng dụng thử nghiệm được khởi chạy và thử nghiệm của chúng tôi được thực hiện cho mỗi tập dữ liệu.<br>
Khi thử nghiệm đã được thực hiện, chúng ta có thể tìm thấy kết quả kiểm tra trong Test Log.<br>
## **Phần kết luận**
Ngoài việc tự động hóa các bài kiểm tra đơn vị và chức năng, TestComplete cung cấp Kiểm tra truyền dữ liệu giúp cải thiện đáng kể phạm vi kiểm tra. Mặc dù thử nghiệm theo định hướng dữ liệu không hoàn toàn đạt được thông qua TestComplete, nhưng GUI đơn giản làm cho nó rất dễ tiếp cận và dễ dàng cho người thử nghiệm.<br>
Nguồn dịch:https://www.softwaretestinghelp.com/testcomplete-tutorial-2/