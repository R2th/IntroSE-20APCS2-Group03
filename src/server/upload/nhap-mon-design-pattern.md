# Mở đầu
Như mọi người đã biết, chúng ta từ lúc bắt đầu tập code cho đến mãi về sau chia làm rất nhiều level.
Đại khái có thể kể đến là: Junior (Junior Developer), Dev (Developer) và Senior (Senior Developer).
Để đạt tới level Senior, bất kì Dev nào cũng cần phải tường tận vài Design Pattern(DP) cơ bản để phòng thân.
Bài viết này mình muốn chia sẻ với các bạn một số mẫu Design Pattern để cùng nhau tiến thêm trên con đường coder.<br> 
Nhiều người khi đạt tới level Senior cứ ngỡ rằng mình đã đạt đến level tối cao của code mà không biết rằng 
"Thiên ngoại hữu thiên, nhân ngoại hữu nhân". Phía trên level Senior còn có vô số cao thủ đạt tới những cảnh giới 
khác như Manager (Project Manager) hoặc Professor (Software Architect). Những kẻ này hiếm thấy như phượng mao lân giác,
mang một thân skill và lương cao ngất ngưỡng. Chém gió vu vơ thế thôi, giờ mình sẽ vào việc chính nhé.
# Design Pattern là gì?
Nói một cách đơn giản, design pattern là **các mẫu thiết kế có sẵn, dùng để giải quyết một vấn đề**. 
Áp dụng mẫu thiết kế này sẽ làm code **dễ bảo trì, mở rộng hơn**. Nói văn hoa, design pattern là 
**tinh hoa** trong code học, đã được các bậc tiền bối đúc kết, truyền lưu từ đời này qua đời khác.
Design pattern là thiết kế dựa trên code, nó nằm ở một trình độ cao hơn CODE, do đó coder của bất kì trường
phái nào (C#, Java, Python) cũng có thể áp dụng vào được.<br>
![](https://images.viblo.asia/0dcc1d14-348a-43e0-8e8a-bd0682879ac7.png)<br>
Tuy nhiên không phải trường hợp nào ta cũng nên dùng Design Pattern. Học Design Pattern là để nâng cao trình độ, 
để giải quyết vấn đề, không phải đế lấy ra lòe thiên hạ. Nhiều người học nghệ chưa tinh, ngựa non háu đá, 
nhét design pattern vào dự án một cách vô tội vạ, nhẹ thì khiến code trở nên rối rắm, khó kiểm soát, 
nặng thì có thể phát sinh các vấn đề nguy hiểm như bug chẳng hạn.
Các bạn hãy nhìn kẻ thân tàn ma dại phía dưới mà làm gương.<br>
![](https://images.viblo.asia/260b5bfc-bd2c-450d-8f7b-0f0feab57286.jpg)<br>
# Nhập môn Design Pattern
Có khá nhiều kiểu Design Pattern lưu lạc trên internet, song ta có thể tạm phân loại làm 3 loại:<br>
* **Khởi tạo (Creational Design Pattern)**: Liên quan đến việc khởi tạo object.<br> VD: Factory, Object Pool, Abstract Factory, Builder.
* **Cấu tạo (Structure Design Pattern)**: Liên quan đến kết cấu, liên hệ giữa các object.<br> VD: Adapter, Bridge, Decorator, Proxy, Composite, Facede.
* **Hành vi (Behavioral Design Pattern)**: Liên quan tới hành vi của các object.<br> VD: Iterator, Mementor, Strategy, Template Method, Visitor.<br>
Khi muốn học một Design Pattern mới hãy tập trung vào 3 phần: <br>
* **Vấn đề**: Vấn đề mà Design Pattern đó giải quyết.
* **Sơ đồ**: Sơ đồ UML mô tả design pattern.
* **Ví dụ**: Code minh họa.<br>
# Lời kết
Xin nhắc lại một lần nữa: Design Pattern được tạo ra **để giải quyết vấn đề, chứ không phải để phức tạp hóa nó**.
Các bậc cao nhân có câu: nước có thể dâng thuyền, cũng có thể lật thuyền. Design Pattern có thể giải quyết vấn đề, 
cũng có thể làm nó rắc rối phức tạp hơn.<br>
Coder dùng Design Pattern cũng chia làm ba level. Junior thì nhìn đâu cũng thấy pattern, chỉ lo áp dụng,
nhét rất nhiều pattern vào mà không quan tâm đến thiết kế. Code một thời gian, đến level Dev, sẽ học được
rằng khi nào cần dùng pattern, khi nào không. Đến level Senior, chỉ dùng pattern khi đã rõ lợi hại của nó, biết lấy
sự đơn giản hài hòa của design tổng thể làm trọng.<br>
Đây là bài viết đầu tiên của mình nên nếu có gì sai sót trong khâu thiết kế hay là kiến thức thì cũng mong các bạn thông cảm nhé.<br>
Bài viết có tham khảo tại: [Link](https://kipalog.com/posts/Nhap-mon-Design-Pattern--Phong-cach-kiem-hiep).<br>
Trong thời gian tới mình sẽ viết thêm một số Design Pattern cơ bản, hy vọng đến lúc đó không phải ăn thêm gạch.<br>
Chúc các bạn vui vẻ.