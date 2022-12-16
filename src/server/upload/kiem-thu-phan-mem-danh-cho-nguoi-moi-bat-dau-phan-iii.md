Trong phần II, chúng ta đã tìm hiểu kỹ về Bug, chi phí cho việc phát sinh Bug và các khái niệm liên quan đến đảm bảo chất lượng, kiểm soát chất lượng và kiểm thử phần mềm.
Phần III này, chúng ta sẽ tìm hiểu về đặc trưng của các loại kiểm thử, sự khác nhau giữa các loại kiểm thử và cách kết hợp các loại kiểm thử trong kiểm thử phần mềm như thế nào cho phù hợp

# I. Các loại kiểm thử
Có 2 loại kiểm thử cơ bản đó là Kiểm thử tĩnh và kiểm thử động.

![](https://images.viblo.asia/962c3fee-5f28-453f-8b71-0a6e35688f12.png)

## 1. Kiểm thử tĩnh - Static testing 

* Gọi là kiểm thử tĩnh vì trong giai đoạn này, việc kiểm thử không tiến hành trên code đã được thực thi. Nó chủ yếu tập trung vào tài liệu yêu cầu và tài liệu thiết kế để tìm lỗi.
* Mục tiêu chính của nó là cải thiện chất lượng sản phẩm phần mềm bằng cách tìm ra lỗi trong giai đoạn đầu của chu kỳ phát triển. 
* Đây cũng được gọi là kỹ thuật Không thực hiện hoặc thử nghiệm xác minh.
* Kiểm thử tĩnh bao gồm đánh giá thủ công hoặc tự động của các tài liệu. Đánh giá này được thực hiện trong giai đoạn thử nghiệm ban đầu để bắt lỗi Khiếm khuyết sớm trong STLC (Software Testing Life Cycle - Vòng đời kiểm thử phần mềm). 
* Nó kiểm tra các tài liệu làm việc và cung cấp ý kiến đánh giá để cải thiện chất lượng sản phẩm trước khi bắt tay vào coding

Ví dụ về tài liệu làm việc:
    * Thông số kỹ thuật yêu cầu
    * Thiết kế văn bản
    * Mã nguồn
    * Kế hoạch kiểm tra
    * Các trường hợp thử nghiệm
    * Kiểm tra tập lệnh
    * Tài liệu trợ giúp hoặc hướng dẫn người dùng
    * Nội dung trang web

### Các kỹ thuật Thử nghiệm tĩnh bao gồm

![](https://images.viblo.asia/16cefc44-aefd-4bb8-848f-6b1ba81a5c52.jpg)

1. Inspection - Kiểm tra : 
    * Ở đây mục đích chính là tìm ra các khiếm khuyết. 
    * Việc kiểm tra được thực hiện bởi người kiểm duyệt. 
    * Đây là loại đánh giá thông thường có một danh sách kiểm tra được chuẩn bị để kiểm tra xem tài lài liệu công việc hoàn thành tới đâu.

2. Walk-through - Hướng dẫn: 
    * Trong loại kỹ thuật này, Leader mở một cuộc họp để giải thích sản phẩm. 
    * Những người tham gia có thể đặt ra những câu hỏi nếu chưa hiểu và ghi chú lại, phục vụ cho việc hoàn thành công việc.

3. Technical reviews - Nhận xét kỹ thuật: 
    * Trong loại kiểm tra này, kiểm tra về kỹ thuật sẽ được kiểm tra 1 vòng. 
    * Việc này tiến hành để kiểm tra xem code được thực hiện theo đúng các thông số kỹ thuật và tiêu chuẩn hay không. 
    * Nói chung các kế hoạch kiểm tra, chiến lược kiểm thử và các tập lệnh kiểm tra được xem xét ở đây.

4. Informal reviews - Nhận xét không chính thức: 
    * Kỹ thuật kiểm tra tĩnh trong đó tài liệu được xem xét, nhận xét một cách không chính thức
    * Đưa ra các ý kiến không chính thức.

5. Static code Review - Đánh giá mã tĩnh: 
    * Đây là đánh giá có hệ thống về mã nguồn phần mềm mà không cần thực thi mã. 
    * Nó kiểm tra cú pháp của mã, tiêu chuẩn mã hóa, tối ưu hóa mã, v.v ... 
    * Điều này cũng được gọi là kiểm tra hộp trắng. 
    * Đánh giá này có thể được thực hiện tại bất kỳ thời điểm nào trong quá trình phát triển.

## 2. Kiểm thử động - Dynamic testing

* Kiểm thử động được thực hiện khi code đang ở chế độ thực thi.
* Kiểm thử động được thực hiện trong môi trường thực thi chạy chương trình ứng dụng.
* Khi code được thực thi, thì đầu vào được truyền một giá trị, kết quả hoặc đầu ra của việc thực hiện được so sánh với kết quả dự kiến ban đầu đã đưa ra.
* Với việc này chúng ta có thể quan sát được các hành vi chức năng của phần mềm, giám sát hệ thống bộ nhớ, thời gian phản hồi của CPU, hiệu suất của hệ thống.
* Kiểm thử động còn được gọi là thử nghiệm xác nhận (Validation testing) để đánh giá sản phẩm. 
* Kiểm thử động gồm hai loại: Kiểm thử chức năng và Kiểm thử phi chức năng.

### Các loại kỹ thuật Thử nghiệm động

![](https://images.viblo.asia/1b0b48df-a3cd-49f0-9148-bb1cbf3c126a.png)

1. Unit Testing - Kiểm thử đơn vị:
*  Thử nghiệm từng mô-đun của các developer .. 
*  Với kỹ thuật này, sẽ phù hợp cho kiểm tra source code Integration Testing: Kiểm tra việc thực hiện lien kết giữa các mô-đun khác nhau, phù hợp với việc của tester 

2. System Testing - Kiểm thử hệ thống: 
* Thử nghiệm thực hiện trên toàn bộ hệ thống. 
* Với thử nghiệm này, hệ thống được thực hiện liên kết xuyên suốt tất cả các chức năng, kiểm tra sự hoạt động thông suốt, chính xác 

3. Acceptance Testing - Kiểm thử chấp nhận: 
* Thử nghiệm được thực hiện từ quan điểm của người dùng cuối. 
* Với thử nghiệm này, thì ứng dụng đã được đưa tới người sử dụng

# III. Sự khác nhau giữa kiểm thử tĩnh và kiểm thử động

![](https://images.viblo.asia/a4254186-af63-4659-af3e-fc9338702b77.png)



| Static Testing | Dynamic Testing | 
| -------- | -------- | 
| 1. Static testing chính là kiểm thử hộp trắng (white box testing ) được thực hiện ở giai đoạn đầu của chu kỳ phát triển. Việc này hiệu quả hơn so với dung dynamic testing     | 1. Dynamic testing được thực hiện ở giai đoạn sau của vòng đời phát triển.     | 
| 2. Trong thời gian ngắn hơn, thì Statis testing có nhiều phạm vi xác nhận hơn so với Dynamic testing	     | 2. Dynamic testing có phạm vi xác nhận ít hơn vì nó chỉ bao gồm các khu vực giới hạn của code     |
| 3. Nó được thực hiện trước khi triển khai code	     | 3. Nó được thực hiện sau khi triển khai code     |
| 4. Nó được thực hiện trong Bước Xác minh	     | 4. Nó được thực hiện trong Giai đoạn Xác nhận     |
| 5. Loại thử nghiệm này được thực hiện mà không thực hiện code.	     | 5. Loại thực hiện này được thực hiện với việc thực thi code.     |
| 6. Static testing đưa ra đánh giá của code cũng như tài liệu.	     | 6. Dynamic testing cho biết giới hạn của hệ thống phần mềm.     |
| 7. Trong kỹ thuật Static testing một danh sách nội dung kiểm tra được chuẩn bị cho quá trình kiểm tra	     | 7. Trong kỹ thuật Dynamic testing, các trường hợp thử nghiệm được thực thi.     |
| 8. Các phương pháp Static testing bao gồm Walkthroughs, code review.	     | 8. Dynamic testing bao gồm việc kiểm tra chức năng và phi chức năng     |

Nguồn: Sách Software Testing: An ISTQB-BCS Certified Tester Foundation guide, xuất bản lần thứ 4

Nhóm tác giả: Brian Hambling, Peter Morgan, Angelina Samaroo, Geoff Thompson, Peter Williams