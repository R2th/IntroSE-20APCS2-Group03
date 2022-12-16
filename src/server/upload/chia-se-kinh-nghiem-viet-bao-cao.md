1. Tại sao dev phải viết báo cáo hiệu quả?
> 1a. Thế nào là report hiệu quả?

Hãy cùng xem qua câu chuyện cười sau:
Lão nhà giàu nọ có anh đầy tớ tính rất bộp chộp, thấy gì nói ấy, gặp đâu nói đó, chẳng có đầu có đuôi gì cả. Lão mới gọi anh ta bảo:
- Mày ăn nói chẳng có đầu có đuôi gì cả, người ta cười cả tao lẫn mày. Từ rày nói cái gì thì phải nói cho có đầu có đuôi nghe không?

Anh đầy tớ vâng vâng dạ dạ.
Một hôm lão mặc quần áo sắp sửa đi chơi, đang ngồi hút thuốc thì thấy anh đầy tớ đứng chắp tay trịnh trọng nói:
- Thưa ông, con tằm nó nhả tơ, người ta đem tơ đi bán cho người Tầu, người Tầu đem dệt thành the rồi bán sang ta. 
Ông đi mua the về may thành áo. Hôm nay ông mặc áo, ông hút thuốc. Tàn thuốc nó rơi vào áo ông, và áo ông đang cháy…
Lão giật mình nhìn xuống thì áo đã cháy to bằng bàn tay rồi.
![](https://images.viblo.asia/d03f048d-4482-4804-920f-f22b14b710e8.jpg)

Qua câu chuyện trên, ta thấy mong muốn của nhân vật ông chủ:
- Anh đầy tớ phải báo cáo đầy đủ về sự việc cần nói.

Tuy nhiên, do hiểu sai về "đầy đủ" mà anh đầy tớ  đã report một cách dư thừa thông tin, dẫn đến ông chủ có action chậm trễ với mức độ khẩn cấp của sự cố. 

Vậy thì suy ra, báo cáo hiệu quả là:

1. Cung cấp đầy đủ thông tin mà người nhận báo cáo cần biết.
2. Nêu lên các khía cạnh khác của vấn đề mà trước đó chưa được phát hiện ra (nếu có)
3. Đề ra các phương án giải quyết, các ưu-khuyết điểm của mỗi phương án để người nhận báo cáo cân nhắc.

Trong trường hợp anh đầy tớ, anh chỉ cần bảo ông chủ:
_ Áo ông cháy kìa, cởi ra ngay!

Sau đó thì dập lửa trên chiếc áo của ông ta. Ông chủ không hề có nhu cầu biết tại sao áo cháy tại thời điểm đó.

> 1b. Một report hiệu quả sẽ đem lại lợi ích gì cho dev và tập thể?  
Lợi ích 1. Cho Dev:
+ Giảm bớt thời gian giải trình cho khách hàng/ BrSE/ cấp trên
+ Cải thiện vị thế của bản thân dev và cải thiện cả kĩ năng ăn nói, trình bày trong cuộc sống hằng ngày
![](https://images.viblo.asia/9b41803b-d3c3-4e2c-b192-fbc4fe979e4a.png)

Lợi ích  2. Cho tập thể

+ Report hiệu quả giúp team hiểu vấn đề và đưa ra action hợp lý nhanh hơn.
+ Giảm bớt stress không cần thiết trong quá trình giao tiếp
+ Tăng hiệu quả làm việc, cải thiện hình ảnh team trong mắt cấp trên/ khách hàng

3. Làm thế nào viết báo cáo hiệu quả hơn?
> 3a. Xác định đối tượng report 

Đôi khi dev sẽ report với team leader, người có kiến thức chuyên ngành. Nhưng đôi khi, Dev sẽ phải giải thích cho những người không rành kĩ thuật như Comtor mới vào nghề hay khách hàng không rành IT.
Với những đối tượng khác nhau, thì cách dùng từ, chọn lọc thông tin cũng khác nhau. Tránh rập khuôn mà dẫn đến sự khó chịu cho người đọc.
Vì dụ: Dev quen báo cáo vắn tắt cho team leader và team leader vẫn OK. Nhưng cùng cách viết báo cáo đó, nếu viết vắn tắt cho comtor mới vào nghề, sẽ khiến bạn Comtor đó bối rối và phải hỏi lại nhiều.

> 3b. Chọn lọc thông tin

+ Với mỗi sự việc sẽ luôn có 5 W (Who, When, Why, How, What)
+ Xác định rõ người đọc muốn biết cái gì?
VD: Sếp muốn biết incident gì đang xảy ra và tại sao thì ta sẽ viết What và Why trước. 
+ Khi muốn người đọc trả lời câu hỏi, thì cần có đủ thông tin 
VD: Nếu muốn đề xuất  phương án cải thiện cho 1  chức năng, thì cần nêu những phương pháp mà bạn có thể nghĩ đến cùng với Ưu/Khuyết điểm để khách hàng/ cấp trên có thể  lựa chọn
![](https://images.viblo.asia/d3b4d6c8-a4b0-485c-928e-e31b4cfdee98.jpeg)

> 3c. Xác định cấu trúc report

Trong 1 số trường hợp, khi report dùng để trả  lời một câu hỏi cụ thể thì phải trả lời câu hỏi trước rồi mới mở rộng nội dung report.

VD: 
Sếp hỏi: Đã điều tra được nguyên nhân bug chưa?
Dev report:
_ Em ĐÃ điều tra được nguyên nhân report. Em xin trình bày như sau:
A. Nguyên nhân trực tiếp 
B Nguyên nhân gián tiếp 
C Giải pháp 

Để report dễ hiểu, thì các bạn nên sử dụng cấu trúc chia thành nhiều đầu mục, tách biệt rõ ràng giữa các mục.
Mục quan trọng/ được hỏi đến thì sẽ ở đầu. Ví dụ:

A. Nội dung incident (WHAT)
+ Chức năng A bị lỗi 

B. Nguyên nhân (WHY)
+ File của chức năng A bị mất
+ Sau khi điều tra thì thấy là do vận hành GIT sai nên mất file.

C. Cách giải quyết (HOW)
+ Release lại PR có chứa file 
+ Phổ biến lại GIT flow cho team member

* Các bạn nên linh hoạt trong việc cân nhắc sử dụng hình ảnh screenshot/ GIF/ VIDEO để minh họa rõ ràng cho điều muốn nói thay vì viết quá dài.*

> 3d. Lựa chọn từ ngữ, cú pháp

_ Dùng câu đơn để diễn tả gãy gọn ý muốn nói:
Thay vì: Do A làm B dẫn đến C mà chúng ta có hiện tượng D và giải pháp là E.
Thì viết là: Hiện tượng D gây ra do C. C là do A làm B. Giải pháp: E

_ Khi báo cáo tiến độ thì tránh nói chung chung như "gần xong", "hình như trễ task" mà nên có số liệu cụ thể. 


> 3e. Đọc lại và chỉnh sửa report 
![](https://images.viblo.asia/69a9e841-5f00-49b3-977c-403ef25e6199.jpeg)

_ Check lỗi chính tả.
_ Đọc với tâm thế của 1 người chưa nắm rõ tình hình để xem xét tính dễ hiểu của báo cáo.
_ Nếu là report tiếng nước ngoài thì dùng Google Translate để kiểm tra độ chính xác.
_ Chỉnh sửa về măt mĩ quan nếu cần.

Trên đây là những kinh nghiệm của mình, hi vọng có thể giúp các Dev đỡ cực nhọc trong khâu báo cáo nhé.