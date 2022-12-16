Trong quá trình làm việc chắc hẳn ai cũng có lúc gặp incident, hay nói cách khác dự án nào cũng có incident.

Vấn đề là bạn đối mặt với incident như thế nào? Cách giải quyết ra làm sao?  Và đã học được gì từ những incident đó?

## Đầu tiên, phải thật bình tĩnh. Giữ một cái đầu lạnh và một tinh thần thép
Một số bạn khi bị khách nặng lời hoặc bị complain làm việc không tốt thì bị trùng tâm lý (tâm lý đi xuống).

Các bạn bắt đầu lo lắng trong từng việc mình làm và nặng hơn có những bạn muốn rời khỏi dự án vì cảm thấy khách hàng không hiểu được giá trị của bản thân.

Khi gặp phải tình huống này điều quan trọng nhất là phải giữ cái đầu lạnh.

Bị khách hàng nặng lời? Đó là việc như cơm bữa và nên làm quen dần với nó.

Khi khách hàng nặng lời hãy suy nghĩ xem đó là lỗi của bản thân hay khách hàng đã hiểu lầm?
Hãy nhìn lại vấn đề một cách kỹ lưỡng hơn. Nếu như là lỗi của bản thân hãy giải thích cho khách hiểu vì sao mình lại làm như vậy và xin lỗi một cách chân thành.

Khách hàng cũng là con người. Họ sẽ không trách những người biết nhìn nhận sai lâm của bản thân và biết cách xin lỗi (đương nhiên là bạn đừng lặp lại lỗi đó lần nữa)

Nếu như đó không phải lỗi của bản thân. Đầu tiên, đừng phản ứng kiểu "đấy không phải là lỗi của tôi". 
Khách hàng là thượng đế, không phải là bạn bè cùng vai vế của bạn. Điều bạn cần làm là giải thích cho khách hàng hiểu sự việc, và từ đó nói lên việc bản thân bạn không làm sai.

Khách hàng đủ thông minh để hiểu và đánh giá sự việc khi đã hiểu tường tận nó.


## Giải quyết vấn đề như thế nào?
Trước tiên, bạn phải đánh giá được mức độ nghiêm trọng và tầm ảnh hưởng của incident.
Nếu chỉ là incident đơn giản và bạn đủ khả năng giải quyết nó thì cứ giải quyết theo cách êm xuôi nhất.

Nếu vấn đề nghiêm trọng, ảnh hưởng đến hình ảnh công ty. Bạn phải chữ cháy cho nó, sau đó tìm cách giải quyết triệt để.
Và nhớ, nhất định phải báo cáo vấn đề này với sếp của bạn.

Sếp của bạn phài nắm được dự án đã xảy ra sự việc như thế, và công ty khách hàng đang có ấn tượng như thế nào.

Đừng ngại cho sếp biết incident. Một trong những yêu cầu của kỹ năng Horensho đó là bạn phải biết báo cáo đúng thời điểm, báo cáo sớm nhất có thể.

Thông thường khi đã báo cáo cho sếp thì sé có một cuộc họp để làm rõ vấn đề.

Tại cuộc họp này bạn phải làm rõ được những thông tin sau:

- Overview vấn đề cho mọi người hiểu
- Nguyên nhân là gì?
- Cách giải quyết

Để làm rõ những thông tin này, trong cuộc họp mọi người phải đặt ra câu hỏi Why?
Tại sai vấn đề lại xảy ray. Tại sao lại hình thành được điều kiện, tình huống đó.

Khi trả lời được cho những câu hỏi đó bạn có câu trả lời cho giải pháp của vấn đề.

**Một ví dụ cơ bản:**

Bạn deploy source code nhưng nó không chạy

Why 1: Vì sao code không chạy ? -> Vì bị thiếu code

Why 2: Vì sao lại thiếu code? -> Do ở môi trường dev comment tạm logic ấy đi để test, sau đó quên comment out đoạn code 

Why 3: Vì sao lại quên comment out? -> Vì sự việc xảy ra nhiều ngày trước nên quên mất

Why 4: Vì sao có release guide mà vẫn quên? -> Vì nội dung ấy không có trong release guide

Why 5: Vì sao lại không có trong release guide -> Vì leader không nắm được mức độ ảnh hưởng và nghĩ nó không quan trọng

Why 6: Vì sao leader không nắm được mức độ ảnh hưởng -> Vì member báo cáo không đầy đủ

Why 7: Vì sao member báo cáo không đầy đủ  -> Vì nghĩ test xong sẽ comment out ngay nên chủ quan

Như vậy từ những câu hỏi Why này, ta đưa ra giải pháp Member phải lập tức báo cáo lại với leader trước khi thực hiện một việc gì đó ảnh hưởng đến hệ thống, đẻ leader đưa vào release guide và kiểm tra khi tiến hành release.


## Bạn có rút ra được những bài học từ những incident?
Nếu bạn không rút ra được bài học cho bản thân sau những incident thì nghĩa là bạn đứng yên tại chỗ.
Bạn vẫn sẽ lặp lại incident đó vào một lần khác sơ suất.

Những incident sẽ cho bạn kinh nghiệm quý giá, để ở những dự án sau bạn có những biện pháp ngay từ đầu ngăn chặn incident xảy ra.
Chứ không phải để incident xảy ra mới đi giải quyết nó.

Ngoài ra, đừng chờ đến khi incident xảy ra với bản thân mới rút ra một bài học gì đó. 

Hãy học ngay từ những incident của người khác

Khi bạn nghe thấy thông tin dự án nhà người ta có incident . Phản ứng đầu tiên của bạn là gì?

Tự nghĩ "May quá dự án mình không bị".

Hay là bạn sẽ tìm hiểu xem dự án nhà người ta đã gặp incident gì. Họ chịu tổn thất như thế nào. Vì sao lại bị incident đó.

Cách người ta giải quyết vấn đề như thế nào? Nếu là bản thân mính sẽ quyết như thế nào


## Kết
Dù bạn có gặp incident như thế nào đi nữa, hãy cố gắng bình tĩnh. Đừng để những cảm giác negative tác động đến bản thân.

Hãy cùng với team của bạn, với sếp của bạn giải quyết nó.

Bạn không một mình đối mặt với nó