## Lời tựa
Bài viết này là phần 2 của series về box model của mình. Bạn có thể theo dõi tất cả các phần tại đây:  

Phần 1: [CSS Box Model - Cơ bản dành cho người mới bắt đầu](https://phucluong.com/css-box-model-co-ban-danh-cho-nguoi-moi-bat-dau/)  
Phần 2: [CSS Box Model và box-sizing: border-box là gì vậy?](https://phucluong.com/css-box-model-box-sizing-border-box-la-gi-vay/)  
Phần 3: [CSS Box Model - Các cách hiển thị element với thuộc tính display](https://phucluong.com/css-box-model-display-block-inline/)

Các bạn theo dõi các bài blog cá nhân của mình tại đây nhé: [https://phucluong.com/](https://phucluong.com/)

## Lý do mình chọn viết về CSS Box Model
Trong thế giới của CSS hay web layout nói chung, có rất nhiều thứ cơ bản mà một lập trình viên giao diện cần nắm vững. Nhưng mình chọn Box Model để giới thiệu đầu tiên vì nó rất cơ bản nhưng lại vô cùng quan trọng trong việc layout. Mình từng thấy các bạn junior khác chỉ layout kiểu đối phó (thử sai), viết css theo bản năng hoặc kinh nghiệm cá nhân, miễn sao kết quả giống design hoặc chạy được là được.

Việc này có rất nhiều tác hại:

* Các bạn sẽ tự hình thành các kinh nghiệm sai và sử dụng nhiều lần về sau.
* Sẽ có những bug layout tiềm ẩn và chỉ đợi 1 viên gạch bị vỡ, cả layout sẽ vỡ; bạn sẽ loay hoay không biết nên fix từ đâu hoặc chỉ cố gắng tìm cách lấp vá layout.
* Code của bạn sẽ rất khó maintain sau này, đặc biệt là khi có người mới vào.
* Code của bạn sẽ bị audit (nếu có) và được đánh giá kém nếu có một bên thứ 3 nhìn vào.
* Kiến thức không vững cũng rất dễ bị vặn vẹo trong các buổi phỏng vấn.

Trong các bài tiếp theo, mình sẽ viết về những chủ đề cơ bản và cũng rất quan trọng khác của CSS như Inheritance, Cascade, Specificity, BFC, Flexbox, Grid…

## Bài viết này dành cho ai?
Bạn hãy tưởng tượng mình đang tham gia một buổi phỏng vấn và được hỏi câu “Box model trong CSS là gì?”. Nếu bạn cảm giác không tự tin trả lời câu hỏi này, hoặc chỉ trả lời kiểu cụt ngủn “nó nói về padding, margin, border của mấy cái element trên trang web”, thì bài viết này là dành cho bạn.

Mình mặc định bạn đã có chút kiến thức cơ bản về CSS nên sẽ không giải thích chi tiết những phần ngoài phạm vi bài viết.

## CSS Box Model là gì?
Có một điều bạn luôn phải nhớ là bất kì element nào trên trang web đều là một khối hình chữ nhật, kể cả các hình tròn, hình oval, hay các đoạn text dài ngắn khác nhau:

![Tất cả element trên trang web đều là các khối hình chữ nhật.](https://images.viblo.asia/398e2198-0e86-48cb-985d-cb6aea230738.png)

Vậy để giúp browser biết được một element rộng/cao bao nhiêu để render cho chính xác và đúng ý của developer, box model là thứ mà browser dựa vào để tính toán. Nói lý thuyết hơn, box model trong CSS chỉ đơn giản là một tập các quy tắc và công thức cộng trừ để giúp browser xác định được chiều rộng, cao (và một số thứ khác) của một element.

## Các thành phần của Box Model
Như mình chia sẻ ở trên, bất kì element nào cũng là một khối hình chữ nhật, và nó bao gồm 4 thành phần: content, padding, border, và margin (tốt nhất là không nên Việt hóa những từ này 😃 ). Mỗi thành phần đều có một đường biên bên ngoài tương ứng: content edge, padding edge, border edge, margin edge.

![Các thành phần của Box Model](https://images.viblo.asia/4192fc75-db46-405e-a8aa-67d9c5ba2e2a.png)

* **content**: là vùng chứa nội dung của một element, với chiều rộng/cao được xác định qua thuộc tính width và height. Vùng này thường chứa text, hình ảnh, video…
* **padding**: cho biết độ rộng của vùng padding bao quanh vùng content
* **border**: cho biết độ rộng (và style) của border bao quanh vùng padding
* **margin**: cho biết độ rộng của vùng margin bao quanh vùng border

Là một developer, bạn có thể dễ dàng xem được các thuộc tính này của các element rất trực quan thông qua DevTools của browser.

![Box model được minh họa trực quan trên dev tools của trình duyệt](https://images.viblo.asia/2cd0b140-066c-4daa-b2c0-83c92098d21b.png)


#### Công thức tính đơn giản mặc định:

* **Chiều rộng** của một element = chiều rộng content `width` + `padding` trái + `padding` phải + `border` trái + `border` phải
* **Chiều cao** của một element = chiều cao content `height` + `padding` trên + `padding` dưới + `border` trên + `border` dưới

#### Các thuộc tính css tương ứng:

* **Chiều rộng/cao của content**: `width`, `height`
* **Padding**: `padding`, `padding-left`, `padding-right`, `padding-top`, `padding-bottom`
* **Border**: `border`, `border-left`, `border-right`, `border-top`, `border-bottom`

``` css
.element {
  width: 80px;
  height: 100px;
  padding: 30px 20px 40px;
  margin: 30px auto;
  border: 1px solid black;
}
```

![Các thuộc tính cơ bản của box model](https://images.viblo.asia/864f2f6e-68b1-4f1e-aa5a-a8590e3f6b15.png)

Có thể bạn để ý mình không liệt kê `margin` trong công thức. Mặc dù `margin` là một phần của box model và đi kèm với element, nhưng nó không được tính vào chiều rộng/cao của element.

Có bạn từng hỏi mình `margin` và `padding` khác nhau thế nào. Mình sẽ có một bài viết phân biệt chi tiết sau, nhưng nói đơn giản thì `margin` là vùng ở bên ngoài border, còn `padding` là vùng bên trong border, và khi nào dùng `margin`/`padding` cũng là một điều căn bản mà các bạn developer cần nắm vững (bạn có thể google để biết thêm về sự khác nhau giữa chúng).

## Tất cả chỉ là quá khứ, hãy cùng quay về hiện tại:
#### Vấn đề từng gây khó chịu 1:
Khi layout một trang web, chắc chắn sẽ có những lúc bạn tăng giảm `padding` của một element, hay thêm border cho nó đẹp hơn (theo thiết kế mới của designer chẳng hạn). Vấn đề phát sinh là khi bạn thực hiện các thay đổi trên, tổng chiều rộng của element sẽ thay đổi và làm cả layout bị xê dịch vì những thay đổi đó.

Ví dụ cho dễ hiểu:

Element (chiều rộng) = 200px (content) + 40px (padding) = 240px
Khi bạn tăng `padding` lên 60px, chiều rộng của element sẽ tăng lên 260px, và sẽ đẩy những thứ xung quanh làm thay đổi layout. Để sửa lỗi này, bạn phải giảm chiều rộng của content còn 180px, để đảm bảo tổng chiều rộng vẫn là 240px. Giá như content nó tự co giãn để đảm bảo tổng chiều rộng không đổi thì tốt biết mấy.

Khi bạn thay đổi padding, nó sẽ làm thay đổi layout như hình bên dưới:
![Thay đổi padding làm thay đổi layout tổng](https://images.viblo.asia/93bc3035-0bef-4bff-af79-3ddcbf5fd1c3.gif)

Khi bạn thay đổi border, nó cũng sẽ làm thay đổi layout như hình bên dưới:
![Thêm border làm thay đổi layout tổng](https://images.viblo.asia/ae884251-1762-4954-98dc-5033e854e5b4.gif)

#### Vấn đề từng gây khó chịu 2:
Một lỗi layout thường gặp khác là chiều rộng của element con bị tràn ra khỏi cha

``` css
.parent {
  width: 300px;
  height: 300px;
  padding: 20px;
  border: 2px solid greenyellow;
}

.child {
  width: 300px;
  height: 200px;
  padding: 30px;
  color: #ffffff;
  background-color: steelblue;
}
```

![Lỗi layout thường gặp khi element con tràn ra khỏi cha](https://images.viblo.asia/e4ee2a81-6f2b-4b84-be9f-49b34de357c0.png)


#### Giải pháp hiện tại
Box model được nâng cấp (rất lâu rồi) với thuộc tính `box-sizing`, 2 value chính là: `content-box` và `border-box`

* `content-box`: tất cả element đều được gán mặc định là `content-box`, và cũng là những gì mình phân tích ở trên. Lưu ý lại, thuộc tính `width` và `height` là để định nghĩa chiều rộng/cao của phần content mà thôi nhé.
* `border-box`: thuộc tính `width` và `height` sẽ tự động bao gồm luôn content, padding và border, còn chiều rộng của content sẽ tự động co giãn tương ứng nếu chúng ta thay đổi padding và border, đảm bảo kích thước của cả element sẽ không thay đổi, đồng nghĩa với việc layout tổng sẽ không thay đổi.

Và khi `box-sizing` ra đời, “rất hiếm” developer nào (quan điểm cá nhân) muốn quay lại quá khứ và sử dụng `box-sizing` với value là `content-box` nữa trừ những trường hợp đặc biệt của project (Cho mình biết nếu bạn có trường hợp nào cần dùng `content-box` nhé)

#### Công thức tính theo `box-sizing: border-box`:

* Chiều rộng của một element = `width` = chiều rộng content (auto) + `padding` trái + `padding` phải + `border` trái + `border` phải
* Chiều cao của một element = `height` = chiều cao content (auto) + `padding` trên + `padding` dưới + `border` trên + `border` dưới

![box-sizing: border-box giải quyết các vấn đề về layout rất tốt](https://images.viblo.asia/5bb3574e-09b0-47cd-8563-ed193936be92.gif)

Trang web có cả nghìn element, liệu việc thêm thuộc tính `box-sizing` vào từng element có khả thi?

Tất nhiên là chúng ta sẽ không phải thêm thủ công vào từng element, với sự giúp đỡ của Universal selector `*`, chúng ta chỉ cần một dòng CSS đơn giản:
``` css
* {
  box-sizing: border-box;
}

/* Hoặc cẩn thận hơn */
*, *::before, *::after {
  box-sizing: border-box;
}
```

Với đoạn code trên, tất cả element sẽ được canh chỉnh theo `border-box`, và đương nhiên bạn vẫn có thể dễ dàng override cho từng element cụ thể mà bạn muốn.
``` css
.content-element {
  box-sizing: content-box;
}
```

#### Lưu ý
Để không làm bài viết phức tạp hơn, mình cố gắng trình bày những trường hợp đơn giản và điển hình nhất và bỏ qua một số chi tiết khác. Ví dụ: Chiều rộng/cao của element còn bị ảnh hưởng bởi nhiều yếu tố khác như `min-width`, `max-width`, `min-height`, `max-height`, các hiệu ứng của flexbox...

## Lời kết
Cảm ơn bạn vì đã đọc đến tận cuối bài. Hi vọng bài viết đã bổ sung thêm phần nào kiến thức về CSS Box model cho bạn.

Box model là nội dung khá cơ bản và được sử dụng hầu như mỗi ngày của bất kì frontend developer nào. Vì thế nếu bạn chưa nắm vững nó thì hãy dành thời gian tìm hiểu thêm nhé. Nếu bạn có phản hồi hay góp ý gì cho bài viết thì hãy để lại comment bên dưới nhé.

Các bạn hãy nghiên cứu tiếp phần cuối cùng của serie này nhé:  
Phần 3: [CSS Box Model - Các cách hiển thị element với thuộc tính display](https://phucluong.com/css-box-model-display-block-inline/)