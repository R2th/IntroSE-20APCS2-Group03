QA/Tester không chỉ đơn giản là đi tìm bug, mà là người có cái nhìn tổng quát nhất về sản phẩm. Tuy nhiên với những người mới bắt đầu tiếp cận với công việc này thì cách tiếp cận một dự án mới vẫn là vấn đề mà họ quan tâm. Hôm nay mình sẽ chia sẻ về cách tiếp cận 1 dự án mới đối với những người QA/Tester mới như thế nào?<br><br>
![](https://images.viblo.asia/53275ef8-2e0e-44f1-ad77-3a4d93ede348.jpg)<br>

## 1. Tìm hiểu vai trò của các thành viên trong đội dự án
Đầu tiên khi vào dự án thì ta phải tìm hiểu xem vai trò của cá thành viên trong đội dự án thế nào. Tùy thuộc vào công ty bạn đang áp dụng theo mô hình phát triển phần mềm nào thì 1 team dự án các thành viên sẽ có các vai khác nhau. Thường ở Việt Nam đang áp dụng 1 phần mô hình Agile/Scrum vào phát triển phần mềm nên sẽ thường có các vai trò:<br>
* Product Owner (PO):Là người đại diện của khách hàng đưa ra những yêu cầu của sản phẩm, hiểu rõ nhất về sản phẩm và cũng là người tiếp nhận đầu ra, đánh giá kết quả của dự án. Trong một số trường hợp, Product Owner cũng chính là khách hàng của sản phẩm. Điều này thường xảy ra với các ứng dụng nội bộ. Khi đó, các tính năng của sản phẩm sẽ được định hình trực tiếp bởi Product Owner. Product Owner là người am hiểu những nhu cầu cấp thiết của sản phẩm, từ đó đưa ra các yêu cầu về tính năng mà sản phẩm phải có.
* Project Leader: Là người điều hành, lãnh đạo và quản lý team.
* Team phát triển: là những người trực tiếp tham gia sản xuất phần mềm: bao gồm cả dev, QA, BA,...<br>

***Tại sao chúng ta cần phải tìm hiểu vai trò của các thành viên trong đội dự án?<br>***
Khi mới bắt đầu vào dự án thì chắc chắn mình sẽ có các câu hỏi liên quan đến sản phẩm phần mềm mình đang làm và để hỏi được đúng người thì việc tìm hiểu vai trò của các thành viên trong đội dự án là rất quan trọng. <br>
## 2. Tìm hiểu các tài liệu 
### 2.1. Q&A file và cách đặt câu hỏi<br>
Khi bắt đầu 1 dự án thì khách hàng sẽ gửi cho chúng ta 1 tài liệu tổng quan về sản phẩm mà họ mong muốn nhận được giúp cho team phát triển hiểu rõ hơn về những yêu cầu của họ. Thông thường thì 1 Tester chỉ cần tìm hiểu tài liệu Requirement để thực hiện viết test case. Tuy nhiên trong quá trình tìm hiểu tài liệu thì có gì khó khăn hay khó hiểu thì mình sẽ trao đổi với các thành viên trong đội dự án hoặc có thể đặt câu hỏi trực tiếp cho khách hàng (PO).<br>
Nhưng câu hỏi đặt ra là: đặt câu hỏi ở đâu, thế nào? <br>
Trong mỗi 1 dự án sẽ có 1 folder lưu lại các tài liệu liên quan đến dự án đó. Tài liệu để ghi lại các câu hỏi của bạn đó là Q&A file (Question & Answer). <br>
* Nếu bạn được tham gia vào 1 dự án ngay từ khi mới bắt đầu thì có thể chưa có Q&A file thì hãy tạo 1 file Q&A và đặt câu hỏi trên đó.
* Nếu bạn được tham gia và 1 dự án đã được bắt đầu trước đó thì hãy tìm file Q&A trong folder của dự án và đọc các câu hỏi của các thành viên để hiểu hơn về dự án và đảm bảo rằng khi bạn đưa lên 1 câu hỏi thì không bị trùng.

***Nên đặt câu hỏi thế nào?<br>***
Khi Q&A ta không nên đặt các câu hỏi như như thế nào, là gì,... (Chức năng này hoạt động như thế nào?) mà ta nên đặt câu hỏi theo 2 dạng: Yes/No question hay câu hỏi lựa chọn<br>
Các mẫu câu hỏi nên sử dụng: <br>
a. Yes/No question
1. Should we...?
2. I have a question below regarding function A,... Could you please confirm?
3. From my point of view, ... Do you agree?
4. I think that ..., Could you please share me your through?

b. Multiple choice question <br>
* I have below case with 2 expected behavior:<br>
Expected result 1:....<br>
Expected result 2: ....<br>
Could you please share me you expected result. If you have better option, please let me know.<br>

Đặt những dạng câu hỏi như vậy sẽ giúp tiết kiệm được thời gian trả lời của khách hàng mà vẫn đảm bảo là bạn đã tìm hiểu về hệ thống và có những ý hiểu riêng về hệ thống.<br>
### 2.2. Các tài liệu khác của dự án<br>
Mỗi công ty sẽ dùng các tool quản lý bug  khác nhau nhưng tựu chung lại thì các tool đó đều quản lý các bug mà Tester log lên hay các task mà dev cần thực hiện. Chũng ta sẽ vào tool đó xem task nào mà dev đã thực hiện xong và thao tác thử trên hệ thống xem hệ thống hoạt động thế nào. Đó cũng là cách nhanh nhất mà ta có thể hiểu về hệ thống tuy nhiên không được tuyệt đối tin tưởng vào hệ thống vì có thể dev code sai so với yêu cầu vì vậy vừa thao tác bạn vừa phải đối chiếu với requirement.<br>
Ngoài ra nếu dự án của bạn tham gia đã có Tester/QA tham gia từ trước thì hãy vào folder của dự án tìm đọc bộ test case hay test check list đã được tạo và cũng thao tác trên hệ thống để hiểu hơn về hệ thống. Khi dự án đã có QA/Tester  tham gia từ trước rồi thì bạn hãy hỏi trực tiếp bạn QA/Tester đó về hệ thống sẽ làm cho bạn nhanh hiểu và hiểu hệ thống 1 cách trực quan hơn.<br><br>
## 3. Cách làm việc với các thành viên trong đội dự án
Với 1 QA/Tester mới bắt đầu làm quen với công việc này thì chắc hẳn vấn đề làm sao để giao tiếp tốt với mọi người trong team, trao đổi thế nào để mọi người dễ hiểu vấn đề mà mình muốn nói là vấn đề rất được quan tâm. <br>
* Đầu tiên khi vào dự án thì mình nên  giao tiếp với mọi người 1 cách cởi mở tạo cảm giác gần gũi có thể là bắt chuyện trước với mọi người có thể là vấn đề ngoài công việc để cho mọi người có thể hiểu hơn về mình giúp tạo cảm tình với các bạn trong team. ***Hiểu nhau sẽ làm việc dễ hơn.<br>***
* QA/Tester khi trao đổi vấn đề  nên nhẹ nhàng.<br>
* Khi bạn có 1 vấn đề ví dụ khi chạy dự án bạn phát hiện ra 1 điều gì đó bất thường bạn raise trên box của đội dự án mà mọi người vẫn không hiểu bạn nói gì thì bạn có thể quay lại gif hay chụp lại bức ảnh đó để làm bằng chứng đó cũng là cách giúp mọi ngời hiể vấn đề hơn. Hay cách khác bạn có thể ra trực tiếp chỗ dev ngồi để trao đổi về vấn đề đó. Tuy nhiên thì không phải lúc nào chúng ta cũng làm việc cùng 1 team ngồi cùng 1 văn phòng mà ta có thể làm việc với mọi người ở các văn phòng khác nhau thì đồi hỏi kỹ năng trình bày vấn bằng text của bạn rất quan trọng. Tuy nhiên khi mà đội dự án của bạn ở xa mà không hiểu vấn đề bạn raise lên trên box thì sao? Bạn có thể xinn phép Leader của bạn và book 1 phòng để meeting remote trình bày vấn đề đó cho mọi người. Cách đó cũng sẽ giúp mọi người dễ hiểu và hiểu nhanh hơn.


### Tài liệu tham khảo:
https://vntesters.com/kien-thuc-kiem-thu-phan-mem-cho-nguoi-moi-bat-dau/<br><br>
Bài viết mang tính chất chia sẻ những kinh nghiệm mà mình đã tích lũy được sau thời gian đi làm. Rất mong nó sẽ có ích với các bạn lần đầu mới tiếp cận với 1 dự án:kissing_heart: