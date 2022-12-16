Introducation
---
"Mẫu thiết kế là một giải pháp lặp lại chung cho một vấn đề thường xảy ra trong thiết kế phần mềm. Nó là một mô tả hoặc khuôn mẫu cho cách giải quyết vấn đề có thể được sử dụng trong nhiều tình huống khác nhau.”

***Nguồn gốc***

"Nó đã được phát triển thông qua các thử nghiệm vá lỗi của các kĩ sư phần mềm có kinh nghiệm."

"Design patters trở nên phổ biến sau khi cuốn sách *Design Patterns: Elements of Reusable Object-Oriented Software* (Design Patterns: Các yếu tố của phần mềm hướng đối tượng) được xuất bản vào năm 1994 bởi Erich Gamma, John Vlissides, Ralph Johnson và Richard Helm (còn được gọi là Gang of Four hoặc GoF)"

***Sử dụng như thế nào?***

"Những mẫu thiết kế có thể là trợ thủ đắc lực khi chúng ta sử dụng chúng một cách chính xác. Tuy nhiên, khi sử dụng không đúng thì lợi bất cập hại. Việc cấp thiết là làm thế nào chúng ta sử dụng chúng một cách chính xác."

"Khi bạn học một công nghệ mới, rất tốt để thử áp dụng nó ngay. Tuy nhiên, quan niệm “tìm cơ hội dù là nhỏ nhất để đưa mẫu thiết kế vào code” có vẻ là một ý tồi đối với tôi."

"Làm sao để tôi biết khi nào là tốt nhất để sử dụng mẫu thiết kế? Chúng ta sẽ thấy ở bên dưới, việc đánh giá khả năng những thay đổi trong các phần khác nhau của mã nguồn và hiểu mục đích của mẫu thiết kế mà chúng ta đang sử dụng là quan trọng để đưa ra quyết định thích hợp."

"Tôi đã đi đến kết luận này bằng việc xem xét 3 điều sau. Ta hãy điểm qua chúng."

***3 điều mà tác giả đã đề cập chính là:***

*1.Nếu bạn biết và áp dụng các nguyên tắc thiết kế hướng đối tượng, những mẫu thiết kế sẽ đến một cách tự nhiên.*

Nguồn của ví dụ: [https://vieclamit.careerbuilder.vn/advices/khong-nen-de-am-anh-voi-mau-thiet-ke-design-pattern.35A4EA0F.html](https://vieclamit.careerbuilder.vn/advices/khong-nen-de-am-anh-voi-mau-thiet-ke-design-pattern.35A4EA0F.html)

Chúng ta hãy xem xét một ví dụ. Giả sử chúng ta đang làm một ứng dụng nhỏ về việc xuất một bản nhạc lên màn hình. Bây giờ, để tinh giản hóa vấn đề, chúng ta chỉ cần vẽ nốt trắng và nốt đen.
Trong số các lớp khác nhau của hệ thống, chúng ta có lớp sau:

![](https://images.viblo.asia/f1859f33-0fd1-4492-9ab6-4c2894215ec6.png)

Như bạn thấy, rõ rang có một sự trùng lặp ở đây. Chỉ có khác biệt là tham số truyền vào của hàm drawNoteHead.

Sau khi xem xét, có lẽ bạn đi đến kết luận để loại bỏ sự trùng lặp ta sẽ làm như sau:

1- Tạo một phương thức chung drawNote và phần thân hàm được sao chép từ một trong hai hàm đã có trên.

2 – Tham số truyền vào của phương thức drawNoteHead sẽ được lấy bằng một phương thức mới. Và, mã nguồn của phương thức mới này có thể được viết bởi những lớp con, vì vậy lớp cha vẫn giữ được lôgic căn bản và các lớp con vẫn giữ được những khác biệt.

3 – Thay thế tất cả những phương thức gọi đến drawHalfNote và drawQuaterNote bằng phương thức drawNote của lớp con riêng biệt.

Được rồi, hãy bắt tay vô nào:

![](https://images.viblo.asia/3d80a4e7-1fb9-4999-bf50-1ea30511957a.png)

Có thể có giải pháp khác, nhưng chúng ta đã đạt được điều chúng ta muốn: loại bỏ sự trùng lặp của mã nguồn.

Đoán xem nào.

Bạn vừa áp dụng mẫu thiết kế Template đấy.

Chỉ như vậy thôi. Chẳng cần phải suy nghĩ. Đó là điểm hay của các nguyên tắc thiết kế hướng đối tượng.

Bạn có thể không biết tất cả mẫu thiết kế, nhưng chừng nào mà bạn hiểu rõ những nguyên tắc thiết kế hướng đối tượng, bạn chẳng cần phải biết hết làm gì.

Tất nhiên, nếu bạn đã hiểu rõ mẫu thiết kế Template, bạn có thể thấy nó ngay lập tức. Bạn sẽ nói “nó thì hoàn hảo để áp dụng mẫu thiết kế Template”. Cách đúng để áp dụng các mẫu thiết kế là: khi bạn thấy rõ, chúng phù hợp và chúng làm cho công việc của bạn dễ dàng hơn.

Điều này dẫn tôi đến quan điểm thứ hai.

*2.Bạn có thể không cần nó*

Đôi khi chúng ta nhìn vào một đoạn mã, chúng ta rùng mình trước sự xấu xí của nó, và chúng ta nhận thấy ngay lập tức cần áp dụng mẫu thiết kế để làm cho nó tốt hơn. Nhưng chuyện gì sẽ xảy ra khi nó đang làm việc tốt và bạn không cần thay đổi nó?

Một ví dụ, chúng ta quay trở lại với chương trình xuất bản nhạc lên màn hình, nhưng với một kịch bản hơi khác. Tưởng tượng rằng chúng ta muốn tạo một lớp cho từng loại khóa nhạc. Ứng dụng của chúng ta sẽ hỗ trợ tất cả các khóa nhạc dựa trên 3 khóa chính: khóa C, khóa F và khóa G.

Chúng ta có một hàm trả về đúng khóa nhạc mà chúng ta muốn. Nó trông như sau:

![](https://images.viblo.asia/ab67d7c2-d777-4ef5-b6aa-5d8e00569b88.png)

Nó là một mã nguồn xấu xí. Có lẽ bạn muốn cải tiến(refactor) nó, phải không? Có lẽ bạn đang nghĩ đến việc áp dụng mô hình Factory Method, vâng, nó sẽ phù hợp và chắn chắn sẽ làm cho code của bạn sạch hơn.

Nhưng nếu tôi nói với bạn rằng mã nguồn này sẽ chẳng bao giờ thay đổi?

Tôi không phải là một nhạc sĩ, nên có thể tôi sai, nhưng dường như không thực tế khi nghĩ rằng sẽ có những nốt mới được phát minh trong tương lai. Vậy nếu không có nốt nào được thêm vào thì thật sự không cần thiết phải thay đổi mã nguồn trên. Dù cho mã nguồn đó có xấu xí như thế nào đi nửa nhưng nếu nó hoạt động tốt thì bạn không cần thay đổi nó, việc tái cấu trúc mã nguồn (với một mẫu thiết kế hoặc bất kì kỹ thuật nào) sẽ tốn một chi phí không cần thiết.

Việc này dẫn dắt tôi đến quan điểm thứ ba.

*3.Chi phí cho việc áp dụng mẫu thiết kế*

Trong ví dụ đầu tiên, cấu trúc này bao gồm một lớp trừu tượng được kế thừa bởi hai lớp con. Hơn nữa, để mã nguồn cũ sử dụng được những lớp mới này, bạn cũng cần thực hiện một vài thay đổi không liên quan trực tiếp đến bản thân mẫu thiết kế.

Bài học được rút ra là: nếu bạn đang nghĩ về việc áp dụng một mẫu thiết kế, hãy cân nhắc đến chi phí thực hiện và những lợi ích tiềm năng. Việc chỉ làm cho có sẽ làm cho mã nguồn của bạn phức tạp hơn.

***Làm thế nào tôi có thể biết khi nào là tốt nhất để sử dụng một mẫu thiết kế?***

Đó là câu hỏi triệu đô la. Nó phụ thuộc vào 2 điều: mã nguồn sẽ thay đổi như thế nào trong tương lai và mục đích của mẫu thiết kế.

Trong ví dụ đầu tiên, áp dụng mẫu thiết kế hoàn toàn là cần thiết. Bởi vì, chúng ta không chỉ xuất bản nhạc mà chỉ với nốt trắng và nốt đen, phải không? Vì khi thêm một số nốt nữa sẽ làm cho vấn đề trùng lặp càng tệ hơn, khi đó cần một mô hình để tránh điều đó.

Ở ví dụ hai, nó hoàn toàn trái ngược. Vì chúng ta có thể bảo đảm 100% rằng không có khóa nhạc hoặc nốt nhạc nào được thêm vào, đoạn code không cần thiết phải thay đổi và vì vậy, không cần thiết phải áp dụng mẫu thiết kế.

***Chú ý:***

"Cần phân biệt khái niệm này với Template là triển khai cụ thể tương ứng với từng lại ngôn ngữ hoặc từng loại trường hợp trong khi Design pattern là thiết kế mang tính tổng quát."

***Ở một tài liệu khác, chỉ ra rằng mục đích của design patterns là:***

- Đem lại sự hiệu quả (Giải thích: Các mẫu thiết kế có thể tăng tốc quá trình phát triển bằng cách cung cấp các mô hình phát triển đã được thử nghiệm, đã được chứng minh)
- Đơn giản hóa mã nguồn và còn giải quyết những bug ẩn chứa nguy cơ (Giải thích: Thiết kế phần mềm hiệu quả đòi hỏi phải xem xét các vấn đề có thể không hiển thị cho đến sau này trong quá trình thực hiện. Sử dụng lại các mẫu thiết kế giúp ngăn ngừa các vấn đề nhỏ có thể gây ra vấn đề lớn và cải thiện khả năng đọc mã cho các lập trình viên và kiến trúc sư quen thuộc với các mẫu)
- Cung cấp giải pháp chung (Giải thích: Thông thường, mọi người chỉ hiểu làm thế nào để áp dụng các kỹ thuật thiết kế phần mềm nhất định cho các vấn đề nhất định. Những kỹ thuật này rất khó áp dụng cho một loạt các vấn đề. Các mẫu thiết kế cung cấp các giải pháp chung, được ghi lại theo định dạng không yêu cầu các chi tiết cụ thể gắn liền với một vấn đề cụ thể)
- Thuật ngữ cho một giải pháp hiệu quả và có tiếng trong cộng đồng developer, song song đó thì nó cũng được tân tiến theo tg làm cho chúng mạnh mẽ hơn (Giải thích: Ngoài ra thì các mẫu cho phép các nhà phát triển giao tiếp bằng cách sử dụng các tên nổi tiếng, được hiểu rõ cho các tương tác phần mềm. Các mẫu thiết kế phổ biến có thể được cải thiện theo thời gian, làm cho chúng mạnh mẽ hơn các thiết kế đặc biệt.)”


***Design pattern chia ra làm 3 loại chính: Creational patterns, Structural patterns, Behavioral patterns***

1. [Creational Design Patterns](https://viblo.asia/p/creational-patterns-QpmlegmkKrd) bao gồm nhóm các patterns dùng cho các cơ chế tạo ra các đối tượng hiệu quả, làm tăng sự linh hoạt và tái sử dụng mã hiện có. Trong bài này mình sẽ giới thiệu các bạn 3 parterns thuộc nhóm Creational: Singleton, Builder, Prototype
2. [Structural patterns](https://viblo.asia/p/structural-design-patterns-63vKjVqNK2R) bao gồm nhóm các patterns dùng để xây dựng hệ thống phân cấp class đơn giản và hiệu quả và mối quan hệ giữa các class khác nhau.
3. [Behavioral patterns](https://viblo.asia/p/behavioral-design-patterns-LzD5dXkY5jY) bao gồm nhóm các patterns dùng để phân bố các hành vi có hiệu quả và sẽ tăng tính linh hoạt trong việc thực hiện giao tiếp này.

***Sách nên đọc***

"Khi thực hiện những loại quyết định như thế này, tôi nhớ đến 2 quyển sách:

– *Head First Design Patterns*: nếu bạn chưa bao giờ nghe nói đến các mẫu thiết kế trước đó, hoặc bạn chỉ mới bắt đầu tìm hiểu thì quyển sách này là thực sự cần thiết. Nó giải thích những mẫu thiết kế được sử dụng thường xuyên nhất theo một cách rất trực quan và dễ hiểu.

– *Design Patterns: Elements of Reusable Object-Oriented Software*: đây là một cuốn sách kinh điển mà bạn cần phải đọc. Nó được viết như bảng tổng hợp các mẫu thiết kế phổ biến nhất, được tổ chức thành 3 mục chính: khởi tạo, khởi dựng và hành vi.

Thật không may, lại có thêm một vấn đề khác mà chúng ta phải đối mặt đó là: việc nhận ra và áp dụng các mô hình trong các dự án.

Khi bạn viết code mới từ đầu, khá dễ dàng để nhận ra sự cần thiết phải có mẫu thiết kế. Tuy nhiên, việc áp dụng mẫu thiết kế cho code cũ thì khó khăn hơn.

Cần phải chắc chắn là bạn đã hiểu toàn bộ mã nguồn làm việc như thế nào trước khi đụng vào nó. Việc này có thể là dễ dàng hoặc là đau thương, phụ thuộc vào độ phức tạp của code.

Thật may cho chúng ta, có một quyển sách khác có thể giúp về vấn đề này: *Refactoring to Patterns*. Cuốn sách này chỉ cho bạn cách thực sự tích hợp mẫu thiết kế vào mã nguồn đã có sẵn.

Những quyển sách trên, cùng với nhiều quyển khác, đều nằm trong danh sách, sách về lập trình của John mà tôi khuyên bạn nên đọc."

***Kết luận:***
"Các mẫu thiết kế không phải là “Chén thánh” của lập trình. Trong thực tế tôi không nghĩ một điều như vậy tồn tại.
Chúng đơn giản chỉ là cơ chế làm cho code của chúng ta rõ ràng hơn và dễ dàng hơn để hiểu và bảo trì…khi áp dụng đúng."

Tham chiếu:

* [https://vieclamit.careerbuilder.vn/advices/khong-nen-de-am-anh-voi-mau-thiet-ke-design-pattern.35A4EA0F.html](https://vieclamit.careerbuilder.vn/advices/khong-nen-de-am-anh-voi-mau-thiet-ke-design-pattern.35A4EA0F.html)