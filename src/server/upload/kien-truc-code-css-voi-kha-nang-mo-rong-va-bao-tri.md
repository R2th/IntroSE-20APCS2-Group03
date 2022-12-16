**Làm sao để có thể code CSS có khả năng mở rộng và bảo trì? Nó là câu hỏi cho mọi front-end developer. ITCSS đã có câu trả lời cho vấn đề này.**

Khi bắt đầu làm [ymeetme](https://m.ymeet.me/) (và sau đó là cả app bằng react native của nó nữa). Tôi đã tìm một CSS architecture mà sẽ cho cho phép tôi dễ dàng phát triển và bảo trì project.

Sau khi xem qua [CSS Modules ](https://www.sitepoint.com/understanding-css-modules-methodology/) và ITCSS của [ Harry Roberts’s ](https://csswizardry.com/) tôi đã ngay lâp tức yêu thích sự đơn giản và cách tiếp cận thực tế của ITCSS.

# ITCSS là gì?

ITCSS là viết tắt của `Inverted Triangle` CSS và nó giúp bạn sắp xếp css project của bạn theo cách tốt hơn (không phải lúc nào cũng dễ xử lý) các đặc trưng của CSS như **global namespace, cascade and selectors specificity.**

ITCSS có thể được sử dụng với các bộ tiền sử lý (css preprocessors) hoặc không có chúng và tương thích với các phương pháp như **BEM, SMACSS hoặc OOCSS**.

Một trong những nguyên tắc chính của ITCSS là nó phân tách CSS codebase của bạn thành các phần nhỏ (gọi là các lớp), có hình dạng là một tam giác ngược:

![Inverted Triangle](https://images.viblo.asia/a78dfa1f-7bd0-4844-b971-fd70ab14ef1b.png)

Các lớp ở trên được hiểu như sau:

* **Setting** - Được sử dụng với các bộ tiền sử lí và chứa font, định nghĩa các color, ...
* **Tools** - Chứa mixins và functions để có thể tái sử dụng ở nhiều nơi. Và quan trọng là không có bất kì css nào được xuất ra ở lớp này và lớp trên.
* **Generic** - Đặt lại hoặc chuẩn hoá styles, định nghĩa box-sizing,... Đây là lớp đầu tiên tạo ra CSS thực tế.
* **Elements** - style cho các element của HTLM (như h1, span, image, a, ...). Chúng đi kèm với default style của trình duyệt nên chúng ta có thể định nghĩa lại chúng ở lớp này.
* **Objects** - class-based selector để định nghĩa undecorated design patterns. Ví dụ như media object từ OOCSS.
* **Components** - Chỉ định đến từng component UI cụ thể. Đây là nơi chúng ta dành phần lớn thời gian để làm việc và các component UI của tôi thường bao gồm cả Object và Component.
* **Utilities** Tiện ích và helper classes với khả năng ghi đè bất cứ gì trước đó trong mô hình tam giác của chúng ta.

Mô hình tam giác cũng cho thấy style được đại diện bới các selector được sắp xếp trong kết quả cuối cùng khi ra CSS được ưu tiên như thế nào. Nó sẽ đi từ style chung tới cụ thể, từ low-specifycity tới specific (nhưng ko quá specific, IDS là không được phép) và từ far reaching tới local.

![Inverted Triangle](https://images.viblo.asia/68d63958-13be-4913-a9f3-e408f8dd8963.png)

Tổ chức CSS như vậy sẽ tránh được Specificity Wars và nó được đại diện bởi [a healthy specificity graph.](https://jonassebastianohlsson.com/specificity-graph/).

Cảm ơn các bạn đã đọc và hi vọng bài viết có ích.