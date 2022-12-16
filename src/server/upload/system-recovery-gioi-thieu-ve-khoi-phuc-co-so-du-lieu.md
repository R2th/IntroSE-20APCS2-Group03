Như trong [phần trước](https://viblo.asia/p/system-recovery-mot-so-mo-hinh-phuc-hoi-he-thong-1VgZvpoR5Aw), chúng ta sử dụng thuật ngữ quản lý dữ liệu thay vì quản lý tài nguyên chung chung. Loại quản lý dữ liệu phổ biến nhất là một hệ thống cơ sở dữ liệu. Tuy nhiên, các nguyên tắc áp dụng cho bất kỳ trình quản lý tài nguyên giao dịch nào, chẳng hạn như trình quản lý hàng đợi và các hệ thống tệp giao dịch.

Để phục hồi từ thất bại, trình quản lý dữ liệu cần phải nhanh chóng trả lại cơ sở dữ liệu của mình tới một trạng thái bao gồm kết quả của tất cả các giao dịch hoàn thành trước khi thất bại và không có kết quả của các giao dịch bị hủy bỏ khi thất bại hoặc hoạt động tại thời điểm thất bại. Hầu hết các trình quản lý dữ liệu đều thực hiện công việc phục hồi này rất tuyệt vời. Các lập trình viên ứng dụng không cần quan tâm đến tất cả quá trình này.

Các cơ chế được sử dụng để phục hồi từ những thất bại này có thể có tác động đáng kể đến hiệu suất. Tuy nhiên, nếu một trình quản lý dữ liệu sử dụng phương pháp tiếp cận phục hồi có hiệu suất giao dịch trung bình, thì cũng không quá mà nhiều người lập trình ứng dụng có thể làm gì về nó. Điều này khá khác so với khóa, nơi người lập trình ứng dụng và thiết kế cơ sở dữ liệu có thể có một ảnh hưởng lớn hơn. Theo quan điểm đó, sự thiếu kiểm soát mà một người lập trình ứng dụng về tình hình, không có yêu cầu cao rằng người đó cần có một sự hiểu biết sâu sắc về cách quản lý phục hồi dữ liệu.

![](https://images.viblo.asia/91c06af3-4c32-4fee-ae83-f5da6efb1ec5.PNG)
Tuy nhiên, có một số cách, mặc dù không nhiều, cơ sở dữ liệu và quản trị viên hệ thống có thể làm việc cùng nhau để cải thiện hiệu suất, khả năng chịu lỗi, và hiệu suất phục hồi. Ví dụ: họ có thể cải thiện khả năng chịu lỗi của một hệ thống bằng cách thay đổi cấu trúc của các bản ghi, các thiết bị đĩa, và tương tự. Để giải thích về hiệu suất và các lỗi liên quan đến tính chịu lỗi của việc áp dụng thiết kế hệ thống, nó giúp bạn hiểu được rất nhiều các khái niệm chính đằng sau các thuật toán phục hồi cơ sở dữ liệu.

### 1 Types of Failure – Các loại thất bại

Nhiều thất bại là do giao dịch được lập trình không đúng và lỗi nhập dữ liệu không chính xác các tham số cho các giao dịch. Thật không may, những thất bại này làm giảm giả định rằng việc thực hiện của một giao dịch giữ được tính nhất quán của cơ sở dữ liệu ("C" trong ACID). Chúng có thể được giải quyết bằng cách sử dụng công nghệ, kỹ thuật lập trình để kiểm tra các giao dịch, bằng cách xác nhận đầu vào trước khi cho nó vào giao dịch, và bởi các cơ chế toàn vẹn về ngữ nghĩa được tích hợp trong trình quản lý dữ liệu. Tuy nhiên, bản chất của chúng nằm ngoài phạm vi của các vấn đề mà cơ chế phục hồi giao dịch có thể tự động xử lý. Vì vậy, chúng ta sẽ giả định rằng các giao dịch thực sự bảo toàn thống nhất cơ sở dữ liệu.

Có ba loại thất bại quan trọng nhất đối với hệ thống TP: các giao dịch thất bại, lỗi hệ thống, và các lỗi phương tiện truyền thông. Sự thất bại giao dịch xảy ra khi một giao dịch bị hủy. Một lỗi hệ thống xảy ra khi các nội dung lưu trữ bị mất, bị hỏng, cụ thể là trong bộ nhớ chính. Ví dụ, điều này có thể xảy ra với bộ nhớ chính khi đột ngột mất điện. Nó cũng xảy ra khi hệ điều hành gặp lỗi. Mặc dù một sự thất bại của hệ điều hành có thể không làm hỏng toàn bộ bộ nhớ chính, thường rất khó để xác định các bộ phận thực sự bị hỏng do sự cố. Vì vậy, trong trường hợp tồi tệ nhất sẽ phải khởi động lại hệ thống. Với khả năng thất bại của hệ thống, bản thân cơ sở dữ liệu phải được lưu trữ trên một môi trường lưu trữ ổn định, chẳng hạn như đĩa. (Tất nhiên, các cân nhắc khác, chẳng hạn như kích thước dữ liệu cũng có thể buộc chúng ta lưu trữ cơ sở dữ liệu về phương tiện lưu trữ ổn định). Một phương tiện truyền thông thất bại xảy ra khi bất kỳ phần nào của bộ nhớ ổn định bị phá hủy. Ví dụ, điều này xảy ra nếu một số sector của một đĩa bị hư hỏng.
![](https://images.viblo.asia/81c9719c-92f4-45a5-a1c8-d414f0efe4b1.PNG)

Trong phần này chúng ta giả sử rằng mỗi giao dịch truy cập và cập nhật dữ liệu tại một trình quản lý dữ liệu. Điều này cho phép chúng ta tập trung chú ý vào các chiến lược khôi phục cho một trình quản lý dữ liệu đơn lẻ. Trong các phần tiếp theo chúng ta sẽ xem xét các vấn đề bổ sung phát sinh khi một giao dịch có thể cập nhật dữ liệu tại nhiều hơn một trình quản lý dữ liệu.

### 2 Recovery Strategies - Chiến lược phục hồi

Chiến lược chính để phục hồi khá đơn giản:
* Lỗi giao dịch: Nếu một giao dịch bị hủy, trình quản lý dữ liệu khôi phục các giá trị trước đó của tất cả các mục dữ liệu mà giao dịch đã viết.
* Sự cố hệ thống: Để phục hồi từ thất bại, trình quản lý dữ liệu hủy bỏ bất kỳ giao dịch đang hoạt động (chưa hoàn thành) vào thời điểm xảy ra sự cố và đảm bảo rằng từng giao dịch đã hoàn thành trước khi thất bại thực sự được cập nhật trong cơ sở dữ liệu.
* Sự thất bại của phương tiện truyền thông: Chiến lược phục hồi gần giống như đối với các lỗi hệ thống, vì mục đích là để trả lại cơ sở dữ liệu về trạng thái mà nó chứa kết quả của tất cả các giao dịch đã hoàn thành và không giao dịch bị hủy bỏ.

Thật dễ dàng để thấy tại sao phục hồi hệ thống và phương tiện truyền thông rất giống nhau. Mỗi cơ chế khôi phục đều xem xét một số một phần của bộ nhớ không đáng tin cậy: bộ nhớ chính, trong trường hợp hỏng hệ thống; một phần của bộ lưu trữ ổn định trong trường hợp các phương tiện truyền thông thất bại. Để tránh sự mất mát dữ liệu trong kho lưu trữ không đáng tin cậy, cơ chế phục hồi duy trì một bản sao của dữ liệu, có thể trong một kho lưu trữ khác. Bản sao dự phòng này được giữ ở một bộ lưu trữ mà nó cho là đáng tin cậy: môi trường lưu trữ ổn định, hoặc một phần khác của môi trường lưu trữ ổn định (chẳng hạn như đĩa thứ hai hoặc băng) trong trường hợp lỗi hệ thống; trong trường hợp phương tiện truyền thông thất bại. Tất nhiên, các đặc tính lưu trữ vật lý khác nhau trong hai trường hợp có thể yêu cầu sử dụng các chiến lược khác nhau. Nhưng các nguyên tắc là như nhau.
![](https://images.viblo.asia/123a6cf0-ca08-41ea-a3b6-e006bc266c90.gif)


Các kỹ thuật phổ biến nhất để phục hồi hệ thống và phương tiện truyền thông khi thất bại là ghi nhật ký. Nhật ký là thứ hai, bản sao dự phòng của dữ liệu được sử dụng để đối phó với thất bại. Để hiểu cách nhật ký được sử dụng, tại sao nó hoạt động và ảnh hưởng của nó như thế nào đến hiệu suất, chúng ta cần phải bắt đầu với một mô hình đơn giản hóa của các bộ phận quản lý dữ liệu, vì vậy chúng ta có một mô hình để thảo luận làm rõ các vấn đề. 



-----
Phần tiếp theo ta sẽ nói về Mô hình hệ thống

-----
Tài liệu dịch và tham khảo - The book: 09_Philip A. Bernstein, Eric Newcomer. Principles of Transaction Processing (2nd edition). Morgan Kaufmann, 2009 - Chapter 7: System Recovery