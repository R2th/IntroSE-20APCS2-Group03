* Kiểm thử phần mềm là một hoạt động thiết yếu trong vòng đời phát triển và bảo trì phần mềm. Nó thường được sử dụng để cải thiện chất lượng phần mềm.

* Test coverage ( Kiểm thử độ bao phủ ) hiểu nôm na là chúng ta đang kiểm thử cái gì và đã kiểm thử được bao nhiêu rồi? Phạm vi kiểm thử giúp giám sát chất lượng kiểm thử và hỗ trợ người kiểm tra tạo các kiểm thử bao gồm các vùng bị thiếu hoặc không được xác thực.

![image.png](https://images.viblo.asia/64e86061-86d1-4f3f-bd16-686585f16a03.png)

Hầu hết các team tính toán độ bao phủ dựa trên các yêu cầu chức năng. Tuy nhiên, nếu các nhóm thử nghiệm phi chức năng đang kiểm tra về hiệu suất, bảo mật, kiểm tra khả năng sử dụng, v.v., thì họ sẽ phải theo dõi các yêu cầu của mình bằng mọi cách để thực hiện thông qua việc phân tích kiểm thử độ bao phủ.

1. Test coverage and code coverage 2 khái niệm này thường bị nhầm lẫn với nhau. Mặc dù nguyên tắc cơ bản là giống nhau, chúng là hai thứ khác nhau Code coverage nhắc đến việc cần phải thực hiện unit test để đảm bảo tất cả các vùng mã code đều được rà soát ít nhất một lần và được thực hiện bởi các developer. Test coverage thì kiểm thử mọi requirements ít nhất một lần để tránh bị bỏ sót, và được thực hiện bởi nhóm QA.

Lấy 1 ví dụ khi có 10 requirements và có 100 testcases được tạo ra thì 100 cases này nhắm đến tất cả 10 yêu cầu trên và không bỏ sót bất kỳ yêu cầu nào thì được gọi là phạm vi test đầy đủ ở cấp độ thiết kế. Nhưng nếu chỉ có 80 cases được thực thi nhằm mục tiêu thử nghiệm 6 yêu cầu thì 4 requirement ko được bao phủ dù 80% cases đã được test --> Số liệu thống kê độ bao phủ ở mức độ thực thi.

Thông thường kiểm tra mức độ bao phủ của việc kiểm thử thường được áp dụng khi có bản build cuối cùng , thời điểm này sẽ chỉ ra được kết quả của việc kiểm thử cho các yêu cầu được đưa ra từ trước có được bao phủ tối đa nhất hay không

2. Ý nghĩa của kiểm thử độ bao phủ

Kiểm thử độ bao phủ có thể có ý nghĩa khác nhau trong các hoàn cảnh khác nhau, chúng ta hãy khám phá từng hoàn cảnh một nhé:

Khi phạm vi kiểm thử đang được đo lường về mặt sản phẩm, phần chính cần được tập trung là: lĩnh lực sản phẩm nào bạn đã test và chưa test

vd1: Nếu chúng ta cần thử nghiệm sản phẩm là con dao của hãng Cameron thì ngoài việc tập trung kiểm thử xem việc cắt rau/trái cây của nó có tốt không thì còn những khía cạnh khác cần quan tâm đó là việc người dùng con dao đó có cảm thấy thoải mái khi sử dụng sản phẩm hay không nữa.

vd2: Nếu notepad là một ứng dụng, bạn đang kiểm tra các tính năng có liên quan là điều bắt buộc.Nhưng các khía cạnh khác cần được quan tâm là - ứng dụng phản hồi đúng trong khi sử dụng các ứng dụng khác đồng thời, ứng dụng không gặp sự cố khi người dùng cố làm điều gì đó bất thường , người dùng được cung cấp thông báo cảnh báo / lỗi thích hợp, người dùng có thể hiểu và sử dụng ứng dụng dễ dàng, nội dung trợ giúp có sẵn khi được yêu cầu.

3. Bao phủ độ rủi ro, bạn đã kiểm tra độ rủi ro chưa?

Bao phủ độ rủi ro là một khía cạnh khác để có phạm vi kiểm tra đầy đủ. Bạn không thể nói sản phẩm của bạn đã được thử nghiệm hoàn hảo cho đến khi bạn đã kiểm tra các rủi ro liên quan. Phạm vi của các rủi ro liên quan là một yếu tố quan trọng trong phạm vi thử nghiệm tổng thể.

Lấy ví dụ Trong khi thử nghiệm một trang web thương mại điện tử, người kiểm tra đã xem xét mọi yếu tố hiệu quả nhưng không xem xét rủi ro về số lượng người dùng lớn truy cập trang web đồng thời và vào ngày Super OFFER. Điều này quả là một sai sót đáng tiếc và rất dễ xảy ra ngoài thực tế.

4. Bao phủ yêu cầu của khách hàng

Nếu một sản phẩm hoặc ứng dụng được phát triển rất tốt nhưng nếu nó không phù hợp với yêu cầu của khách hàng thì cũng coi như bỏ đi. Độ bao phủ yêu cầu trong khi thử nghiệm là rất quan trọng

Ví dụ Khi kiểm tra một ứng dụng chat, người kiểm tra đã quan tâm đến tất cả các điểm quan trọng như nhiều người dùng trò chuyện trong một nhóm, hai người dùng trò chuyện độc lập, tất cả các loại biểu tượng cảm xúc có sẵn, cập nhật được gửi cho người dùng ngay lập tức, v.v. nhưng quên xem xét tài liệu yêu cầu, rõ ràng đã đề cập rằng khi hai người dùng trò chuyện độc lập, nên bật tùy chọn cuộc gọi video. Vậy là việc test độ bao phủ yêu cầu của sản phẩm là chưa cao.

5. Làm sao để áp dụng phương pháp Test độ bao phủ thích hợp?

Kiểm tra xem đội ngũ nhân lực được assign và quy trình test xem mọi việc có được kiểm thử theo cách hiệu quả hơn không

Có thể áp dụng bảng như dưới đây:


| Loại thử nghiệm| Tổng số trường hợp	 | Các trường hợp thực hiện	 |   Trạng thái  |
| -------- | -------- | -------- | -------- |
|Chức năng   | 100    | 80   | 50 pass, 30 fail
|Khả năng tương thích   | 100    | 50   |45 pass, 5 fail
|Khả năng sử dụng  | 100    | 100   |98  pass, 2 fail
|Hồi quy  | 100    | 100  | 99 pass, 1 fail



6.  Làm thế nào để đảm bảo mọi thứ đều được kiểm thử một cách đầy đủ nhất.

* Mỗi người kiểm thử đều cần nhận thức được các yêu cầu và phương pháp kiểm tra
* QA được thông báo về kế hoạch cho lần release sau khác với phiên bản trước như nào để bạn có thể xác định các yêu cầu quan trọng chính xác hơn và tập trung vào phạm vi bao phủ tối đa nhất cho sản phẩm
* Có thể sử dụng automation test
* Sử dụng các công cụ quản lý kiểm tra để luôn luôn biết mình có lack mất phần requirement nào không
* Phân công công việc hợp lý: phân công QA tốt nhất của bạn tới các task quan trọng và để tester mới free test nhiều hơn để có góc nhìn mới mẻ
* Chuẩn bị một bản checklist kiểm tra cho tất cả các task lớn nhỏ
* Tương tác nhiều hơn với các nhóm Dev / Scrum / BA của bạn để hiểu rõ hơn về yêu cầu của sản phẩm
* Theo dõi tất cả các khâu build bản mới và quá trình fix bug
* Xác định hầu hết các vấn đề ảnh hưởng trong bản dựng ban đầu (khi có thể) để những vấn đề sau có thể hoạt động để ổn định hơn và tiếp cận các khu vực bị chặn bởi các vấn đề trước đó. 

7. Các lĩnh vực và phương pháp quan trọng để thử nghiệm hiệu quả

* Resource jumbling: Các QA trong team có thể test chéo việc của nhau, việc này rất hiệu quả trong việc tránh bỏ sót yêu cầu hoặc những lỗi nghiêm trọng.
* Phạm vi tương thích: Đảm bảo bạn biết và bao gồm các trình duyệt và nền tảng khác nhau để kiểm tra ứng dụng của bạn.
* Biết thời gian release trước khi bắt đầu giai đoạn thử nghiệm giúp lập kế hoạch hiệu quả nhất
* Giao tiếp: Giữ mối quan hệ tối và thông suốt với đội phát triển và các team khác ở các chu kỳ build bản mới để có thể update được yêu cầu mới nhất.

Tóm lại Kiểm tra mức độ bao phủ có nhiều điều cần được xem xét. Không phải lúc nào kiểm thử nhiều thì sẽ cho kết quả tốt hơn. Thực tế khi bạn test nhiều mà không có chiến lược hay kế hoạch cụ thể, rõ ràng thì sẽ rất mất thời gian, đến thời gian release rồi vẫn chưa hoàn thành xong công việc, như vậy độ bao phủ yêu cầu tất nhiên sẽ không thể cao được. Với cách tiếp cận có cấu trúc hơn hướng tới 100% yêu cầu được kiểm thử với phương pháp testing hiệu quả bạn sẽ có được sản phẩm với chất lượng cao.

Bài viết được dịch và tham khảo từ link gốc https://www.softwaretestinghelp.com/test-coverage/