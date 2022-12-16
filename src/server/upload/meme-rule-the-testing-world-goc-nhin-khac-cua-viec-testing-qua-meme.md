Khi đời sống không thể tách khỏi sự hài hước, hãy học hỏi theo cách hài hước.

Sau đây là một góc nhìn khác về một số sự thật thú vị trong ngành lập trình thông qua góc nhìn mới lạ.


## 1. Tech debt ở mọi nơi và nó đang lớn dần

![](https://images.viblo.asia/b4e38a11-36f7-49eb-a68f-91559899cfcb.JPG)

Dự án tôi đang làm vì mục đích release sớm sản phẩm cho end-user trải nghiệm và feedback mà - khối lượng công việc được đưa vào một cách dồn dập và deadline thì đập vào một cách vô lý. Dần dà mọi người lại ưu tiên việc đưa ra thị trường nhanh nên cắt giảm bớt các giai đoạn trong quá trình phát triển - điển hình nhất là việc Testing.

Việc này luôn dẫn tới các hệ lụy về Techdebt cho dự án của chính mình. Các khiếm khuyết mà bạn bỏ lại từ sprint này sang sprint khác sẽ biến thành một mớ hỗn độn mỗi khi có chỉnh sửa code. Nhìn hình thôi bạn cũng biết ngay sự nghiêm trọng mà bug bạn đã sổng qua từng giai đoạn chứ.

## 2. Bạn trì trệ càng lâu, cái giá phải trả càng cao

![](https://images.viblo.asia/754edfc0-ae13-4fdb-9c4b-8305969c6d62.JPG)

Giống như việc vay một khoản vay lớn, sau này bạn sẽ phải trả với lãi suất ngày càng cao, việc xử lý khoản nợ kỹ thuật của bạn sẽ tốn nhiều thời gian và ngân sách hơn khi bạn quyết định giải quyết nó sau này. Khi giải quyết vấn đề vào kề cận ngày bàn giao sản phẩm, việc giải quyết triệt để là việc rất khó để xử lý. 

Ví dụ bị một lỗi logic đơn thuần, ngay từ khi clear Spec chúng ta đã có thể triệt tiêu được nó bằng nhiều cách mà không tốn quá nhiều cost (effort and money), nhưng nếu bạn lọt qua lỗi đó thì sau khi code, sau khi release sản phẩm, cái giá phải trả cho nó là quá đắt (ảnh hưởng tới uy tín, chất lượng công việc của team, ảnh hưởng tới danh tiếng khách hàng).

## 3. Automation, thư giãn và đợi chờ

![](https://images.viblo.asia/61f78ba2-4125-4b63-9a23-36490fc3b6f4.jpg)


Mặc dù kiểm thử thủ công - manual được chứng minh là mang lại hiệu quả tuyệt vời ngay từ đầu, nhưng bạn càng tiến xa hơn trong quá trình phát triển ứng dụng của mình, bạn càng phải kiểm tra nhiều chức năng hơn khi đó, thực sự kiểm thử thủ công tốn kém hơn. 

Tự động hóa kiểm thử không chỉ giúp bạn giảm thiểu chi phí trong mục tiêu dài hạn mà còn tăng hiệu quả tổng thể. Với các thuật toán và công cụ được cung cấp, nhóm QA/Tester của bạn dành ít thời gian hơn để xác thực các tính năng mới được phát triển cũng như nhận được phản hồi nhanh hơn, độ chính xác được cải thiện, thông tin chi tiết tốt hơn và phạm vi kiểm tra cao hơn cho dự án. 

## 4. Quầy bar của bạn có toilet không?

> Trong một quán bar, 
> 
> QA gọi sản phẩm: Gọi 0 bia, gọi 99999 bia, gọi -1 bia, gọi html bia, gọi 1 con thằn lằn, gọi một phần cơm....
> 
> 
> Khách hàng đầu tiên của sản phẩm: Cho hỏi quán bar của anh có toilet không?
> 
> QA: !@#$%@


Kiểm thử sự chấp nhận người dùng (UAT) là một bước quan trọng để triển khai và khởi chạy dự án cho bất kỳ giải pháp phần mềm nào. Đây là một trong những quy trình QA mà bạn chắc chắn không muốn bỏ qua. Nếu không có UAT thích hợp, bạn sẽ có nguy cơ thất bại trong việc đạt được sự chấp nhận của người dùng, vì bạn không thể thực sự chắc chắn rằng chức năng trong ứng dụng của bạn đáp ứng đầy đủ mong đợi của người dùng cuối. Bạn có thể đã mở một quán bar siêu chất lượng với bia hảo hạng, nhưng nếu như bạn quên toilet thì sao?

## 5: Bug sai, làm gì có chuyện đó!

![](https://images.viblo.asia/fd99ab14-fd94-4d81-b688-bea5e563c647.JPG)

Báo cáo lỗi không hợp lệ gây ra chi phí đáng chú ý trong quá trình phát triển phần mềm. Có thể có nhiều điều dẫn đến chúng từ sự hiểu lầm về các yêu cầu và chức năng cho đến các yếu tố bên ngoài như các vấn đề môi trường và công cụ. Để giải quyết tất cả các lỗi của bạn mà không phát sinh chi phí không cần thiết, bạn cần thiết lập thông tin liên lạc minh bạch và kịp thời giữa nhà phát triển và kỹ sư QA. Để tránh hiểu lầm và tối ưu hóa thời gian được sử dụng để báo cáo và gỡ lỗi, hãy thường xuyên xem xét các yêu cầu và đảm bảo rằng bạn kiểm tra trong môi trường dành cho mục đích.

Khi một bug report "không đúng" xảy ra, những chi phí để giải quyết vấn đề đó là khá đáng kể. Có rất nhiều điều kiện có thể dẫn tới kết quả bug sai: từ hiểu sai yêu cầu chức năng, các vấn đề về internet, môi trường không ổn định, công cụ quá yếu. Để những lỗi nhỏ nhặt đó không xảy ra gay phát sinh chi phí không cần thiết, bạn nên tập trung liên lạc kịp thời và minh bạch, giữa team phát triển và các QA. Để tránh hiểm lầm, tối ưu hóa thời gian, tránh xảy ra các trường hợp bị lỗi, xử lý quá chậm. Và điều cuối, đừng quên test trong môi trường develop nhé :100:

## 6. Cái gì thế này, tôi không quen nó

![](https://images.viblo.asia/a050e032-40a8-492f-88c5-b7430b65cfd6.JPG)

Tài liệu là một phần quan trọng trong sự thành công của dự án phát triển ứng dụng của bạn. 

Nếu tài liệu kiểm thử mà bạn duy trì trong dự án có cấu trúc không tốt, hoặc phần base không rõ ràng, thì sau này khi tái sử dụng bạn sẽ tốn rất nhiều thời gian để chỉnh sửa và tối ưu nó. Ngay từ khi bắt đầu, hãy áp dụng quy chuẩn một cách hợp lý nhất, việc đặt cấu trúc hợp lý, tên rõ ràng.. đã là phần nào chuẩn hóa tài liệu của bạn rồi.

-----

Follow [Software Testing Board](https://twitter.com/stesting_memes?s=20) để biết nhiều meme hơn về Testing nhé.

-----

Source: https://testfort.com/blog/software-testing-qa-learning

https://twitter.com/stesting_memes?s=20