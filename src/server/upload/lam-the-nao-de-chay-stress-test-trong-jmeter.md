Refer: https://www.blazemeter.com/blog/how-perform-stress-test-jmeter

Hãy nghĩ về kịch bản sau đây: Một hệ thống hiển thị kết quả bài kiểm tra của học sinh đã được kiểm tra bằng nhiều bài test chức năng tự động. Kết quả kiểm tra hiệu suất cũng đầy hứa hẹn. Hệ thống đã sẵn sàng để deploy lên production. Tuy nhiên, khi kết quả thi được công bố trên hệ thống, server bị chậm lại và ngừng hoạt động.

Vậy chuyện gì đã xảy ra??? 
Khi kết quả thi được công bố, tất cả các sinh viên muốn kiểm tra kết quả càng sớm càng tốt. Họ thực hiện truy cập vào hệ thống đồng thời do vậy server không thể xử lý  hết các Requests . Đầu tiên, nó bị làm chậm bởi cơ sở dữ liệu. Sau đó, server không xử lý tầng giữa với dữ liệu và phần mềm không được chuẩn bị cho tình huống này và kết quả là nó ngừng chạy.

Vậy Tester khi thực hiện test Performance đã bị miss những gì? Đó chính là Stress Testing. Ngoài việc test số lượng người dùng dự kiến, Stress Testing sẽ test hành vi của hệ thống dưới mức độ tải nặng, cũng như kiểm tra xem nó phục hồi như thế nào khi quay trở lại sử dụng bình thường. Stress Testing  có thể được thực hiện dễ dàng với các công cụ kiểm tra nguồn mở như JMeter.

**Chọn một kịch bản thử nghiệm**

Ứng dụng ví dụ chúng tôi sẽ sử dụng để thử nghiệm trong bài viết này là một công cụ quản lý dự án đang được phát triển. Hiện tại nó có một số tính năng cơ bản:

- Đăng nhập

- Tạo một dự án và liên kết một kho lưu trữ Github với nó

- Tạo các Issue trong dự án 

Bước đầu tiên của Stress Test là xác định các kịch bản chính. Chọn các kịch bản dựa trên giá trị doanh nghiệp  (tầm quan trọng của chúng đối với thành công của dự án ) và sở thích của người dùng (nơi người dùng dành phần lớn thời gian của họ).

Trong thử nghiệm này, chúng tôi sẽ kiểm tra thời gian phản hồi cho trang đăng nhập của trang web và trang chi tiết dự án.

Thời gian phản hồi rất quan trọng vì thời gian tải là một yếu tố góp phần chính vào việc từ bỏ page. Với sự gia tăng của tốc độ kết nối internet, sự kiên nhẫn của người dùng trung bình đang đi xuống. Nếu một trang web, thời gian tải nhiều hơn 4 giây, khoảng 25% người dùng sẽ rời đi.

Chúng tôi đã chọn chức năng đăng nhập, cung cấp quyền truy cập vào cơ sở dữ liệu, vì đây là một phần quan trọng của mọi hệ thống.

 Chúng tôi đã chọn trang chi tiết dự án vì trong hệ thống được thử nghiệm, nó đọc dữ liệu từ nhiều bảng và chúng tôi hy vọng người dùng sẽ dành phần lớn thời gian của họ trên trang đó. Do đó, chúng tôi muốn chắc chắn rằng trang đó sẽ được tải trong thời gian hợp lý ngay cả khi sử dụng quá mức.
 
 ![](https://images.viblo.asia/b10a2058-6c99-439c-8fc3-5d0b01ae394b.png)
 
 ![](https://images.viblo.asia/9c843f08-9e5f-44fe-8be4-1b7513abb05c.png)

Bây giờ, chúng tôi đã xác định được các mục tiêu thử nghiệm của mình, hãy cùng xem đặc trưng của các thử nghiệm : 
Trường hợp kiểm tra 1 - Login gồm có :

- Chuyển đến trang đăng nhập

- Nhập thông tin người dùng

- Nhấn nút Đăng nhập

- Đợi phản hồi Đăng nhập

Trường hợp thử nghiệm 2 - Các bước kiểm tra page "Chi tiết dự án" :

- Chuyển đến trang đăng nhập

- Nhập thông tin người dùng

- Nhấn nút Đăng nhập

- Tải trang Bảng điều khiển

- Click vào một dự án hiện có


**Tạo và recording kịch bản test**

Sau khi quyết định các case thử nghiệm, chúng ta có thể tiếp tục với việc tạo các kịch bản thử nghiệm. Cách nhanh nhất để tạo tập lệnh kiểm tra JMeter là Recording . Bạn có thể sử dụng trình ghi JMeter hoặc BlazeMeter Chrome Extension, miễn phí tại cửa hàng Chrome và thân thiện hơn với người dùng vì bạn không phải thiết lập proxy để sử dụng proxy, như khi sử dụng Recording trong JMeter.

 Thông qua Chrome của bạn, hãy bắt đầu ghi và mô phỏng kịch bản người dùng mà bạn quyết định kiểm tra. Khi hoàn tất, dừng ghi âm.
 
 ![](https://images.viblo.asia/0148553b-24c8-4419-80c2-c7fd789a3293.png)

Xuất tệp ra jmx và mở nó trong JMeter, nơi bạn có thể chỉnh sửa và định cấu hình các tham số của nó.

**Configuring  Thread Group**

Mỗi thử nghiệm có các cấu hình riêng, như csrf tokens ,response assertions và timers  nhưng sự giống nhau giữa tất cả các Stress Testing là kiểm tra hiệu năng của hệ thống đối với số lượng lớn người dùng. Tùy vào mục tiêu bussiness của bạn để xác định số lượng người dùng bạn đang thử nghiệm.

Trong trường hợp này, chúng tôi muốn nhấn mạnh test với 1.000 users.

Để làm điều đó, bạn cần cấu hình Thread Group. Các cấu hình quan trọng nhất của Thread Group  là số lượng Threads , Ramp-up time và loop count . Số lượng Threads set cho số lượng người dùng mô phỏng, Ramp-up time set cho thời gian để JMeter bắt đầu thực hiện tất cả các Threads  và loop count  là số lần kịch bản kiểm tra sẽ được lặp lại.

![](https://images.viblo.asia/4437590c-0981-4d9a-871e-17795e02c37b.png)

Kết quả cho chúng ta thấy rằng thời gian xử lý yêu cầu cho page  đăng nhập : 68 mili giây và đối với page chi tiết dự án : 1539 mili giây.
Do đó, chúng ta có thể kết luận rằng rất nhiều tài nguyên được sử dụng trong quá trình tải trang dự án.

![](https://images.viblo.asia/611ae05a-f252-4e2f-a54a-e1b6d7832e03.png)

Bây giờ, chúng ta có thể bắt đầu tăng số lượng Threads đang thử nghiệm. Chúng ta chuyển sang 10 Threads , 0 ramp-up và 1 vòng lặp. Vì chúng ta vẫn đang kiểm tra một số lượng nhỏ các Threads nên có thể sử dụng JMeter trong chế độ GUI và xem thử nghiệm thông qua trình listener

![](https://images.viblo.asia/bd2a6872-345d-4c12-8543-b9a9e5028fd9.png)

Chúng ta có thể thấy hệ thống đã có thể xử lý đúng tất cả các yêu cầu

![](https://images.viblo.asia/80809959-9ce4-4e1e-9287-20e2483984ac.png)

Vì vậy, bây giờ chúng ta sẽ tăng số lượng users lên 100 (10% mục tiêu). Tham số duy nhất trong tập lệnh mà chúng ta cần thay đổi là Số lượng Threads và chúng ta có thể chạy lại script. Đừng quên xóa listener giữa các lần chạy thử trong case bạn đang sử dụng.

 Sau đó, tăng tải lên 50% mục tiêu, trong case chúng ta là tăng thành 500 users. Dựa trên kết quả, chúng ta có thể tiếp tục tăng tải (nếu thử nghiệm thành công) hoặc giảm  (nếu có lỗi). Trong trường hợp chúng ta cần phải giảm xuống, chúng ta nên tìm hiểu có bao nhiêu users phá vỡ hệ thống, để có thể quyết định cách khắc phục các tắc nghẽn.

Nếu kết quả toàn màu xanh cho thử nghiệm 500 Threads, hãy tăng số Threads cho mục tiêu 1000 users. Để có kết quả chính xác hơn, chúng tôi khuyên bạn nên chuyển bài kiểm tra sang nhóm Stepping Thread Group , bạn có thể thêm từ Trình quản lý bổ trợ JMeter.

Stepping Thread Group  cho phép bạn định cấu hình bao nhiêu Threads để bắt đầu, bao nhiêu nên được thêm theo thời gian để đạt đến mức tối đa, ramp-down là bao lâu. Do khả năng ramp-down của nó mà  Stepping Thread Group hoàn hảo để kiểm tra phục hồi hệ thống.

![](https://images.viblo.asia/0a2b1c6e-78df-466c-a859-8afbeb633054.png)

Thử nghiệm này bắt đầu với 500 Threads mà chúng tôi biết server có thể xử lý. Sau đó, chúng tôi đã cấu hình JMeter để tăng 100 Threads cứ sau 30 giây. Bằng cách này, nếu có một vấn đề trước khi đạt được mục tiêu của chúng tôi, chúng tôi có thể tìm ra nó ở đâu và nó là gì. Chúng tôi đã cấu hình 1.000 Threads để chạy trong 2 phút (120 giây). Để xem hệ thống phục hồi tốt như thế nào, có một khoảng thời gian xuống dốc - cứ sau 10 giây, 50 threads sẽ được dừng lại.

 Có giới hạn về số lượng Threads  có thể chạy trên một máy trong quá trình kiểm tra căng thẳng. Nhưng có một số cách đơn giản để tăng con số này. Cố gắng chạy JMeter trong chế độ Non-Guide, đây là điều bắt buộc trong trường hợp số lượng lớn các Threads. Chúng ta cũng nên tránh listener trong kế hoạch kiểm tra để tối ưu hóa hơn nữa quá trình chạy thử. Nếu những điều chỉnh đơn giản này là không đủ, hãy phân phối số lượng Threads giữa nhiều máy. Kết quả có thể được tạo ra sau khi thử nghiệm được thực hiện. Tất nhiên, bạn cũng có thể sử dụng CA BlazeMeter, một loại JMeter trên cloud.

 JMeter sẽ cung cấp cho chúng ta KPI như :  Response times, throughput và tỉ lệ lỗi (error)  . Ngoài ra, chúng tôi khuyên bạn nên theo dõi hiệu suất server . Sử dụng CPU, sử dụng bộ nhớ, đầu vào / đầu ra và nhật ký cơ sở dữ liệu là các tham số hữu ích để xác định các tắc nghẽn hệ thống.

Streess Testing là một cách quan trọng để đảm bảo hệ thống của bạn không có lỗi trước khi triển khai. Để tìm hiểu thêm về kiểm tra tải, hãy xem hội thảo trên web miễn phí về việc bắt đầu với JMeter sau 60 phút hoặc xem bản demo CA BlazeMeter.