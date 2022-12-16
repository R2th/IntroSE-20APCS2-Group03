# Tổng quan
Như chúng ta đã biết, Scrum là một framework đơn giản nhưng đủ để phân phối một sản phẩm phức tạp. Nhưng Scrum không phải chén thánh, không phải là một giải pháp phù hợp cho tất cả, thay vào đó Scrum cung cấp các phương thức mà qua nó các nhóm có thể tự tổ chức (self-organize) để giải quyết một vấn đề phức tạp thông qua phương pháp thực nghiệm. Sự đơn giản là sức mạnh lớn nhất của nó nhưng cũng là nguồn gốc của nhiều cách hiểu sai xung quanh việc thực hành Scrum. Trong bài viết này mình sẽ giải quyết một trong những hiểu lầm phổ biến nhất "Có phải sản phẩm chỉ release vào cuối Sprint ở trong Scrum ???"

![](https://images.viblo.asia/fd3b56fc-ee43-4e62-a2f6-2d4fbb287223.jpg)

# Trong Scrum, việc release chỉ được thực hiện khi kết thúc Sprint
Chúng ta có thể được nghe một số tuyên bố như *"Scrum không linh hoạt vì chỉ có thể release khi Sprint hoàn thành"* hoặc *"DevOps hoặc Kanban phù hợp hơn với chúng tôi vì cho phép chúng tôi release nhanh hơn"*. Dù bằng cách nào đó, cốt lõi của hiểu lầm trên là Scrum chỉ cho phép các nhóm phát triển release sản phẩm khi kết thúc Sprint, điều này làm giảm tốc độ và tính linh hoạt nếu trong trường hợp các nhóm này có khả năng làm việc nhanh hơn.

# Làm rõ quan điểm
Hiểu nhầm này là ví dụ cho lối suy nghĩ "đặt framework quan trọng hơn mục tiêu" và cả sự hiểu sai về bản chất của framework - ở đây là Scrum. Mục đích của Scrum là phát triển sản phẩm và giải quyết các vấn đề phức tạp bằng cách sử dụng quy trình thực nghiệm (empirical) thúc đẩy việc phản hồi một cách nhanh chóng. Trong các vòng lặp ngắn, chúng ta sử dụng các phản hồi (cả từ trong nội bộ nhóm phát triển cũng như từ bên ngoài) để làm rõ các vấn đề sản phẩm gặp phải và tìm ra các giải pháp tốt nhất cho nó. Bằng cách như vậy, chúng ta tránh được việc phát hiện sai vấn đề và đưa ra giải pháp tồi. Với mục tiêu đó, có đúng là Scrum chỉ yêu cầu nhóm phát triển release sản phẩm khi kết thúc Sprint ???

Chúng ta cùng quay lại xem mục đích của Sprint là gì ? Đó là cung cấp cho nhóm phát triển đủ thời gian để chuyển đổi một số hạng mục trong Product Backlog thành một phần gia tăng (*Increment - là phần thêm vào của tất cả những Increment trước đó, được kiểm định kỹ càng, đảm bảo tất cả Increment tích hợp tốt. Để cung cấp được giá trị, Increment phải sử dụng được.*). Định nghĩa hoàn thành của phần gia tăng phụ thuộc vào mỗi nhóm và những người liên quan phải hiểu rõ. Đối với một số nhóm phát triển, phần gia tăng hoàn thành khi code được merge vào repo. Với một số nhóm khác đó là phần gia tăng đã được triển khai trên một số môi trường như develop, staging ...

> ***Việc hoàn thành của một phần gia tăng được xác định bằng khoảng thời gian cần thiết để cung cấp nó đến tay người dùng cuối***

![](https://images.viblo.asia/3275f357-e3b2-46c6-bcb6-d0b022fe7028.png)


Vậy xét cho cùng, phần gia tăng chỉ thực sự có giá trị khi chúng nằm trong tay người dùng cuối.

Như vậy, Sprint đại diện cho một ranh giới tối thiểu để đưa ra phần gia tăng hoàn chỉnh. Và không có một cản trở gì ở trong Scrum ngăn cản các nhóm release các phần gia tăng đó trong suốt Sprint miễn là Product Owner đồng ý. Scrum thực sự khuyến khích các nhóm mở rộng mức độ hoàn chỉnh của phần tăng trưởng. Điều này tối ưu hóa giá trị của quy trình thực nghiệm vốn là nền tảng của Scrum.

# Nguồn gốc của sự hiểu nhầm
* Nguồn gốc đầu tiên là sự hiểu nhầm về những gì tạo nên một phần gia tăng (Increment). Scrum Guide chỉ đơn giản giải thích nó là tổng của các phần gia tăng trước đó và những hạng mục Product Backlog đã hoàn thành trong Sprint. Phần gia tăng có thể là một tập hợp các tính năng mới sẽ được triển khai vào cuối Sprint. Nhưng nó không nhất thiết phải như vậy. Phần gia tăng cũng có thể là tổng các chức năng đã được phát hành trong Sprint.

* Nguồn gốc thứ hai nằm ở việc sử dụng các thuật ngữ như "Phần gia tăng sản phẩm có thể thay thế được" - Potentially releasable product increment hoặc "Phần gia tăng sản phẩm có thể chuyển gia được" - Potentially shippable product increment cũng củng cố quan điểm các phần tăng thêm chỉ có khả năng được release vào cuối Sprint

* Nguồn gốc thứ ba xuất hiện gần đây hơn với sự so sánh giữa Scrum và DevOps. Người ta cho rằng DevOps vượt trội hơn Scrum vì nó cho phép các nhóm release sản phẩn của mình nhanh hơn. DevOps không có khái niệm về Sprint vì vậy sản phẩm có thể release bất cứ khi nào nhóm phát triển cho rằng đã sẵn sàng

Thực tế thì Scrum và DevOps như là những người bạn thận có nhiều điểm chung. Cả hai đều cố gắng thực hiện một quy trình thực nghiệm với chu kỳ phản hồi càng ngắn càng tốt. Trong khi Scrum tập trung vào các quy trình cần thiết để xây dựng những gì các bên liên quan cần, DevOps thì hỗ trợ các kỹ thuật để giúp giải quyết các phương pháp thực hành dễ dàng hơn. Scrum là la bàn và điểm đến còn DevOps là công cụ ví dụ như chiếc ủng chắc chắn. Chúng thực sự là hai mặt của một đồng xu

# Sprint Review
![](https://images.viblo.asia/bd55942d-65e4-49db-a514-228e65cfbe80.png)


Vậy Sprint Review sẽ ra sao nếu mọi thứ đã được release ở trong Sprint ? 
Nếu buổi Sprint Review của bạn chỉ tập trung vào demo sản phẩm thì đúng là sẽ trở nên vô nghĩa. Nhưng việc demo sản phẩm chỉ là một phần mục đích trong buổi Sprint Review. Mục đích đầy đủ của sự kiện này là kiểm tra những gì đã được thực hiện ở trong Sprint và quyết định những việc tiếp theo cần làm để tối ưu hóa được giá trị.

> ***Mức độ hoàn thành của một phần gia tăng càng được nâng cao thì phản hồi thu thập được càng hữu ích***

Nếu nhóm đã release các phần gia tăng của mình ở trong Sprint thì Sprint Review trở thành cơ hội tuyệt vời để kiểm tra những phần hồi từ người dùng thực tế - người dùng cuối - và điều chỉnh dựa trên những phản hồi đó => Giá trị của buổi Sprint Review tăng lên.

# Lời khuyên
* Với vai trò là một Scrum Master, hãy huấn luyện cho nhóm của bạn liên tục mở rộng và nâng cao giá trị của Definition of Done (DoD).
* Nghiên cứu, tìm hiểu về DevOps và các phương pháp liên quan như auto testing, infrastructure, virtualization, CI, CD, ... Các công cụ đó sẽ giúp cho team có thể release sản phẩm nhanh, ổn định và chất lượng hơn
* Hãy sử dụng Sprint Review cho mục đích thu thập feedback về phần gia tăng của sản phẩm đã được release, thúc đẩy sự hợp tác giữa các bên liên quan.
* Tăng tính minh bạch trong việc phản ánh khối lượng công việc cần phải hoàn thành đối với nhóm cũng như cả tổ chức qua đó nhận ra và thay đổi các quy trình giúp tăng sự hiểu quả trong công việc

# Tổng kết
Trong bài viết này tôi muốn chỉ ra rằng Scrum thực sự khuyến khích các nhóm cải thiện quy trình, cơ sở hạ tầng để thực hiện release sản phẩm trong suốt thời gian của một Sprint. Điều này tối đa hóa quy trình thực nghiệm mà Scrum dựa vào cũng như chất lượng của sản phẩm. Qua đó cũng đưa ra một số lời khuyên để giúp các bạn dễ dàng áp dụng nó vào nhóm Scrum của mình hơn. 

Nguồn : https://www.scrum.org/resources/blog/myth-3-scrum-releases-are-done-only-end-sprint