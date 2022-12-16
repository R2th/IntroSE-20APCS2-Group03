# Cách tạo Project, Test Suite, Test Case trong SoapUI
SOAP là viết tắt của Simple Object Access Protocol. Dưới đây là các thuộc tính của Giao thức SOAP.
-	Nó là một giao thức dựa trên XML để giao tiếp giữa hai hệ thống khác nhau.
-	Nó là một nền tảng và ngôn ngữ độc lập. Do đó, một hệ thống được phát triển bằng Java có thể giao tiếp với một hệ thống được phát triển trong.NET.
-	Yêu cầu / phản hồi SOAP được chuyển qua HTTP.
<br>
### Nội dung bài học
-	SOAP Message FORMAT
-	Tạo một Project
-	Tạo Test Suite
-	Tạo Test Case
-	Test Step Insert
-	Hiểu Soap Response & Log Panels
-	Sending Request Manually & Reading Response
### Learn the SOAP Message FORMAT                                                                                                                    
SOAP message là một tài liệu XML thông thường chứa các phần tử. Message có thể là tin nhắn yêu cầu hoặc tin nhắn phản hồi.     

 ![](https://images.viblo.asia/17192a70-e0f4-4aba-940b-814a1ac54655.png)
 
### Create a Project                               							                             
Step 1: Tùy thuộc vào dự án, chúng ta cần nhập giao thức SOAP / REST. Chúng ta sẽ tạo một Dự án SOAP mới.

 ![](https://images.viblo.asia/83a167cd-733e-461e-b497-204507a95463.png)
 
Step 2: Chúng ta sẽ sử dụng yêu cầu SOAP : http://www.dneonline.com/calculator.asmx?wsdl   						                      
1. Nhập Project Name 									                                                                    
2. Nhập đường dẫn của WSDL request. Trong trường hợp này nhập http://www.dneonline.com/calculator.asmx?wsdl							                       
3. Nhấn OK    			

![](https://images.viblo.asia/e9ba2b83-378e-4026-b86e-2a95487d6760.png)		

**Chú ý:	**												                       
- Tạo yêu cầu mẫu cho tất cả các hoạt động? Nó tạo ra một yêu cầu mẫu cho tất cả các hoạt động có sẵn trong WSDL. Ngay sau khi bạn nhập địa chỉ WSDL, tùy chọn này sẽ tự động được chọn. Chúng ta có thể bỏ chọn.
- Tạo test suite cho WSDL đã nhập: Tạo test suite trong dự án cho WSDL đã nhập.
- Đường dẫn tương đối: Nó cho phép người dùng lưu tất cả các tệp liên quan đến tệp dự án.      
Step 3: Khi tạo dự án SOAP với WSDL nói trên, chúng ta sẽ thấy có hai hoạt động sẽ được nhập vào dự án.     

 ![](https://images.viblo.asia/a4ec905b-a3e5-4fe0-b62c-2b7fc64e5292.png)

Step 4: Mở rộng request đầu tiên và nhấp chuột phải vào 'Add'. Sau đó nhấp vào 'New request'.

 ![](https://images.viblo.asia/8325295c-b329-4e6a-b230-53f998852d9c.png)
 
Sau đó nhấn 'OK' sẽ hiển thị yêu cầu SOAP ở định dạng XML         

 ![](https://images.viblo.asia/e68b20ee-f2be-48f5-b1a8-738622ec86f4.png)
 
1.  Nhập ‘intA’ và ‘intB’										                       
2.  Nhấn nút Submit											                       
3.  XML phản hồi sẽ được hiển thị khung bên phải.    

 ![](https://images.viblo.asia/635e9858-e1f4-4299-9a02-e38716cd39e6.png)
 
Bạn có thể thắc mắc tại sao lại tạo các Trường hợp Kiểm thử? Khi bạn có thể kiểm tra trực tiếp Webservice tại đây…
Bạn có thể gửi yêu cầu cho một thao tác. Còn những người khác thì sao? Bạn có thể thực hiện bao nhiêu kết hợp đầu vào cho Bổ sung bằng thao tác này? Bạn phải chỉnh sửa yêu cầu cho mỗi và mọi kết hợp.
Ví dụ: Nếu bạn muốn thêm từ 4 và 4 thay vì 5 và 5… Bạn cần chỉnh sửa lại thao tác. Vì vậy, người ta phải tạo một bộ / trường hợp thử nghiệm để có tất cả các kịch bản có thể được thử nghiệm mà không cần phải trực tiếp chỉnh sửa hoạt động.
### Creating Test Suite
Step 1: Trong dự án, tester có thể tạo một bộ thử nghiệm bằng cách nhấp chuột phải vào thư mục gốc của dự án.

 ![](https://images.viblo.asia/d0a8c901-07e7-47eb-8c09-1ef90f69545b.png)
 
Step 2: Nhập tên của bộ thử nghiệm và nhấn OK.

 ![](https://images.viblo.asia/9730580f-495a-4103-9951-f612725fd1ae.png)
 
Step 3: Bộ thử nghiệm đã tạo được hiển thị ngăn điều hướng như hình dưới đây.

 ![](https://images.viblo.asia/18fa6dbe-8b60-4ff0-b4f2-d8061b5a7cd3.png)
 
Step 4: Cửa sổ Bộ thử nghiệm mở ra trong Ngăn bên phải. Như chúng tôi vừa tạo KHÔNG có trường hợp thử nghiệm nào. Do đó tất cả các tùy chọn đều bị vô hiệu hóa.

 ![](https://images.viblo.asia/ab04eede-48ca-4c88-a6be-74e69baa6fd9.png)
 
### Create Test Case
Step 1: Trong một bộ thử nghiệm, chúng tôi có thể tạo nhiều thử nghiệm bằng cách nhấp chuột phải vào 'bộ thử nghiệm' và chọn 'TestCase Mới'.

 ![](https://images.viblo.asia/910ea969-9022-4d37-a60d-afc5d2362732.png)
 
Step 2: Chỉ định tên của Test Case và nhấp vào 'OK'.

 ![](https://images.viblo.asia/a796aeec-b39e-42b4-90a0-25c096e85014.png)
 
Step 3: Trường hợp thử nghiệm đã tạo không có bước nào như hình dưới đây.

 ![](https://images.viblo.asia/25b52ddc-2f35-4d6a-8376-87ece252c3dd.png)
 
Lưu ý: Chúng ta có thể thấy rằng trường hợp thử nghiệm được thêm vào với không có bước thử nghiệm nào cho tất cả các loại thử nghiệm có sẵn. Khi thêm các bước kiểm tra, các số trong ngoặc sẽ tự động thay đổi.

Bước kiểm tra chức năng sẽ chuyển thành 'Các bước kiểm tra' trong khi bước kiểm tra hiệu suất sẽ chuyển sang 'Kiểm tra tải' và bước kiểm tra bảo mật sẽ chuyển sang 'Kiểm tra bảo mật'.
Step 4: Chúng ta có thể chèn nhiều bước kiểm tra khác nhau bằng cách nhấp chuột phải vào các bước kiểm tra và chọn một bước kiểm tra thích hợp như hình bên dưới. Vì vậy, nếu bạn đang kiểm tra một Dịch vụ Web REST, bạn sẽ chọn Yêu cầu Kiểm tra REST.

 ![](https://images.viblo.asia/99d30070-0784-4f2a-b66e-463d1ec4660d.png)
 
### Test Step Insert
Bây giờ chúng ta hãy thêm một bước kiểm tra để xác thực yêu cầu SOAP đã nhập.
Step 1: Thêm một bước mới 'Yêu cầu SOAP' như hình dưới đây.

 ![](https://images.viblo.asia/7096d60f-8d70-4d3b-ac14-9d584021bf04.png)
 
Step 2: Nhập tên bước và nhấp OK.

 ![](https://images.viblo.asia/18ff1b9c-3189-4c74-85d3-ea0af1046b86.png)
 
Step 3: Khi nhấp vào 'OK', một hộp thoại bật lên để chọn thao tác để gọi. Tất cả các hoạt động được liệt kê và người dùng có thể chọn hoạt động mà họ muốn gọi.
-	Có rất nhiều thao tác sẽ được liệt kê. Các hoạt động giống nhau ngoại trừ phiên bản SOAP được sử dụng.
CalculatorSoap - sử dụng SOAP phiên bản 1.1 trong khi, CalculatorSoap12 - sử dụng SOAP phiên bản 1.2

-	Phiên bản không quan trọng đối với chúng tôi trong bối cảnh này. Do đó, bạn có thể chọn một trong những lựa chọn của bạn.
-	
 ![](https://images.viblo.asia/91448e4f-5335-4675-97a6-cbbb82be10d1.png)
 
Sau khi chọn thao tác, hãy nhấp vào 'Ok'

 ![](https://images.viblo.asia/36af26a7-b644-4787-abd9-032de16aa8ab.png)
 
Step 4: Trong khi thêm trường hợp thử nghiệm, chúng ta có thể thêm các xác nhận tiêu chuẩn. Các xác nhận còn được gọi là điểm kiểm tra / điểm xác nhận mà chúng tôi sẽ giải quyết chi tiết trong hướng dẫn tiếp theo.
Chúng tôi có thể thêm các điểm kiểm tra / xác nhận sau trong khi tạo trường hợp thử nghiệm. Hãy để chúng tôi tạo một trường hợp thử nghiệm với tùy chọn có nghĩa là tạo bước thử nghiệm KHÔNG có bất kỳ điểm xác thực nào dưới đây

 ![](https://images.viblo.asia/f211b2e3-5f09-41b9-ae3f-b4284c211439.png)
 
1.	Xác minh xem thông báo phản hồi có phải là SOAP hay không khi thực hiện kiểm tra.
2.	Xác minh xem giản đồ phản hồi có hợp lệ không.
3.	Xác minh xem phản hồi SOAP có chứa FAULT không.
Step 5: Khi tạo trường hợp thử nghiệm, XML yêu cầu được hiển thị bên dưới. Cấu trúc của XML được giải thích trong ảnh chụp nhanh bên dưới.

 ![](https://images.viblo.asia/fa645438-efcb-441d-a12d-c988ec689b7b.png)
 
Step 6: Số bước kiểm tra hiện được tăng lên một vì chúng tôi vừa thêm một bước kiểm tra. Tương tự, khi thêm bước kiểm tra tải và bảo mật, số tương ứng sẽ được tự động tăng lên dựa trên số bước được thêm vào.

 ![](https://images.viblo.asia/58efddda-7298-4fb8-8a48-30eb36792f74.png)
 
### Send Request Manually & Reading Response
Step 1: Chúng ta muốn cộng hai Số nguyên.
intA - 5
intB - 5
Tiếp theo, 
1. Nhập các đầu vào thay cho dấu chấm hỏi sẽ được gửi dưới dạng XML request.                       
2. Sau khi nhập các giá trị đó vào các thẻ XML tương ứng, click nút 'submit request' để kiểm tra phản hồi.

  ![](https://images.viblo.asia/ab28d406-e718-4100-afd5-4bfca9c6f945.png)
  
  Step 2: Khi gửi một yêu cầu, yêu cầu dịch vụ web sẽ được máy chủ web xử lý và gửi lại phản hồi như hình dưới đây. Bằng cách đọc phản hồi, chúng ta có thể kết luận 5 cộng 5 là 10.
  
  ![](https://images.viblo.asia/50f48c32-1c80-42c6-a275-247d91995268.png)
  
### Understanding the Soap Response & Log Panels
Như đã giải thích ở phần đầu, các thông điệp SOAP được truyền qua giao thức HTTP. Chúng ta hãy xem xét các thông báo RAW. Điều này sẽ giúp chúng ta tìm hiểu cách yêu cầu và phản hồi SOAP được chuyển bằng HTTP.
Step 1: Click Tab 'RAW' trong Cửa sổ SOAP-UI request.
1. Request được tải lên máy chủ web. Do đó, phương thức POST của Http được sử dụng.             
2. SOAP request được chuyển trong phần nội dung của bản tin Http.

  ![](https://images.viblo.asia/8d5ad9f6-2fc6-43cf-87f7-6994fb895a06.png)
  
Step 2: Bây giờ click Tab 'RAW' trong Cửa sổ SOAP-UI Respóne để hiểu cách phản hồi được gửi qua HTTP.
1. Sau khi xử lý yêu cầu, mã phản hồi Http (200) được hiển thị có nghĩa là đã thành công. Máy chủ web đã xử lý thành công.                                                                                                            
2. SOAP response được gửi trở lại client như một phần của nội dung thông báo HTTP.      
 
    ![](https://images.viblo.asia/b7e89246-168d-446b-a009-aee90386f399.png)
    
Bảng dưới đây mô tả mã HTTP response nhận được từ máy chủ web.

| HTTP code | Description | 
| -------- | -------- | -------- |
| 1xx     | Informational- Điều này có nghĩa là một yêu cầu đã nhận được và tiếp tục quá trình.    |
| 2xx    | Success- Hành động đã được nhận, hiểu và chấp nhận thành công.   |
| 3xx     |Redirection- Điều này có nghĩa là phải thực hiện thêm hành động để hoàn thành yêu cầu.    |
| 4xx   | Client Error- Điều này có nghĩa là yêu cầu chứa cú pháp sai hoặc không thể thực hiện được |
| 5xx    | Server Error- Máy chủ không thực hiện được yêu cầu hợp lệ   |
<br>
Step 3: Hãy để chúng tôi hiểu các thông tin khác được hiển thị trong cửa sổ trường hợp thử nghiệm.

![](https://images.viblo.asia/b81b8a0d-2de4-4abb-b0b5-627dff403ee2.png)

1.	Đại diện KHÔNG tiêu đề trong yêu cầu đang được gửi
2.	Trình bày KHÔNG có tệp đính kèm trong yêu cầu được gửi đến máy chủ web.
3.	Đại diện cho 10 thông tin tiêu đề và các thông tin tương tự được hiển thị khi nhấp vào nó.
4.	Thể hiện rằng không có tệp đính kèm nào từ thư phản hồi.
### Logs Pane
Ngăn nhật ký có thông tin đầy đủ liên quan đến giao dịch giữa máy khách và máy chủ. Người dùng sẽ có thể nhìn thấy các tab của ngăn Nhật ký như hình dưới đây. Chúng ta sẽ thảo luận về các ngăn nhật ký được sử dụng phổ biến nhất khi làm việc với SOAP-UI.

 ![](https://images.viblo.asia/72118b02-581b-4c95-bff8-cddde7844fe8.png)

Nhật ký SoapUI - Hiển thị thông tin phản hồi từ máy chủ web. Thông tin tương tự được lưu trữ trong tệp soapui.log của thư mục cài đặt SOAP-UI trong thư mục 'bin'.

 ![](https://images.viblo.asia/83311e91-767b-4c5a-9a8d-3daa6794b5f6.png)

HTTP Log - Hiển thị tất cả quá trình truyền gói HTTP. Tất cả thông tin trong 'RAW' được hiển thị trong nhật ký HTTP.

 ![](https://images.viblo.asia/7b403d48-2d22-4050-b647-db408126882d.png)

Nhật ký lỗi - Nhật ký lỗi hiển thị tất cả các lỗi mà chúng tôi đã gặp phải trong toàn bộ phiên dự án. Thông tin tương tự có sẵn trong 'soapui-error.log' có trong thư mục 'bin' của vị trí cài đặt SOAP UI.
Nhật ký bộ nhớ - Tab này giám sát mức tiêu thụ bộ nhớ và hiển thị nó dưới dạng biểu đồ như hình dưới đây. Nó thực sự hữu ích khi có một hoạt động đòi hỏi nhiều bộ nhớ được thực hiện.

 ![](https://images.viblo.asia/9b1b1716-1825-42b4-9011-f895ce462335.png)

Tài liệu tham khảo: https://www.guru99.com/soapui-tutorial-project-testsuite-testcase.html