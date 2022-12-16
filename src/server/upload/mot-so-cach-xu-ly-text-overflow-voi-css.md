Xin chào các bạn ! Tiếp tục với loạt bài thủ thuật hay xoay quanh CSS, hôm nay mình sẽ chia sẻ bài viết với chủ đề "Làm thế nào để xử lý được text-overflow".
![](https://images.viblo.asia/7080d152-cc57-4925-93dd-83d889ee3a56.png)

Đây là vấn đề được các bạn QA rất hay sử dụng để test giao diện. Ví dụ họ thường có một format kiểu 1001 chữ A **dính liền nhau**, nhập một đoạn văn bản cực dài cho tiêu đề hoặc bất cứ phần tử nào đó có thể hiển thị text. Và đương  nhiên trong quá trình code Front-End (FE) nếu bạn không cover được các trường hợp thực tế có thể xảy ra đó chắc chắn QA sẽ log bug và tặng cho bạn 1 ticket nho nhỏ :laughing:

Dưới đây mình sẽ liệt kê ra một vài rule CSS có thể áp dụng để giải quyết vấn đề trên

### 1. Sử dụng bộ ba nguyên tử `white-space`,  `overflow`, `text-overflow`

Bộ 3 này support hầu như tất cả trình duyệt nên ta có thể hoàn toàn yên tâm sử dụng

** Với Block-element

Đơn giản với các phần tử block bạn chỉ cần thêm các rule sau

```css
element {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; /* text-overflow: clip; */
}
```

Trong đó với: 
* `text-overflow: clip;` đoạn văn bản overflow sẽ bị ẩn đi,
* `text-overflow: ellipsis;` phần bị ẩn đi sẽ được thay thế bằng dấu '3 chấm'
* ngoài ra bạn còn có thể chỉ định chuỗi thay thế ví dụ `text-overflow: "----";` tuy nhiên nó chỉ support cho Firefox

Và đương nhiên với block-element bạn chỉ có thể quan sát được sự thay đổi khi nội dung container chứa nó không đủ (ví dụ như co cửa sổ trình duyệt xuống tối đa hoặc set width cho phần tử)

** Với Inline-block-element

Trong nhiều trường hợp bạn muốn cắt chuỗi nhưng chỉ muốn phần tử hiển thị ở dạng inline-block (ví dụ thẻ `<a>` nếu để `display: block` khi hover ra ngoài text vẫn có `cursor: pointer;` nhìn rất không hợp lý) và để cắt chuỗi cho nó ngoài combo bộ 3 kể trên bạn cần phải thêm các thuộc tính sau

```css
element {
  display: inline-block;
  max-width: 100%;
  
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; /* text-overflow: clip; */
}
```

### 2. Kết hợp `-webkit-line-clamp` với `overflow`

Với `line-clamp` bạn có thể chỉ định được **số dòng muốn hiển thị**, phần nội dung vượt quá sẽ bị ẩn đi và thay thế bởi dấu 3 chấm. Cách sử dụng như sau

```css
element {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
}
```
Đây là một thuộc tính mới rất hay nhưng rất tiếc chỉ support các trình duyệt nhân webkit, bạn có thể xem xét yêu cầu của người dùng để sử dụng cho hợp lý

### 3. Sử dụng word-break

Ngoài 2 cách ẩn nội dung tràn trên thì ta còn có thể sử dụng `word-break` để xuống dòng văn bản. Trong đó hai giá trị hay sử dụng nhất gồm

* `word-break: break-all;` - 'To prevent overflow, word may be broken at **any character**'
* `word-break: break-word;` - 'To prevent overflow, word may be broken at **arbitrary points**'

### Kết luận

Trên đây là một vài cách xử lý text-overflow với css thuần tuy rất nhỏ nhưng sẽ giúp bạn cover được rất nhiều khi bị QA test văn bản. Nếu bạn còn cách nào hay hơn đừng ngần ngại chia sẻ cho cộng đồng FE nhé.

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. 

Xin cảm ơn và hẹn gặp lại ở các bài viết sau !