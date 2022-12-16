Trong quá trình code giao diện, có một trường hợp mà chúng ta thường hay gặp là đoạn văn bản quá dài, hoặc quá ngắn. Đôi khi, nếu chúng ta xử lý không tốt, chỉ thêm 1 chữ thôi, cũng đã đủ để vỡ layout rồi. Trong bài viết này, mình sẽ hướng dẫn các bạn các kỹ thuật để xử lý với những đoạn văn bản như vậy.

Hãy bắt đầu với 1 ví dụ cho dễ hiểu nhé, giả sử chúng ta có 1 thanh navigation như này

![](https://images.viblo.asia/1460bcf0-e5c0-4b45-ab23-8cfbb71813cf.png)

Độ dài tên có thể khác nhau, đặc biệt là khi bạn làm việc với 1 trang web đa ngôn ngữ. Trong ví dụ trên, tên đã bị chuyển thành 2 dòng khi nó dài hơn. Dưới đây là 1 số câu hỏi:

* Chúng ta có nên cắt ngắn bớt text đi ko?
* Chúng ta có nên để nó thành nhiều dòng ko? Nếu có thì tối đa bao nhiêu dòng là phù hợp?

Có một trường hợp tệ hơn, là khi 1 từ quá dài, nó sẽ tràn ra ngoài khung của nó

![](https://images.viblo.asia/89e23d04-9ec8-4200-86d0-9aa8170debe0.png)

May mắn là trong trường hợp này, CSS có những thuộc tính được sinh ra chỉ để giải quyết vấn đề này. Thêm vào đó, không chỉ với nội dung dài, nội dung ngắn cũng có thể phá vỡ giao diện, hoặc ít nhất khiến nó trông không được đẹp, như ví dụ sau

![](https://images.viblo.asia/aa1b4a4d-b0f0-42f3-8451-5313ba02a9e7.png)

Button với text ''Ok" rất nhỏ. Nó không phải vấn đề nghiệm trọng, chỉ là nó làm cái nút nhìn khá là xấu, không bắt mắt. Vậy mình nên làm gì, có nên đặt 1 cái min-width cho button này? Nó sẽ đảm bảo một độ rộng an toàn, bất kể nội dung. 

Nói chung là dù quá ngắn hay quá dài, thì cái gì quá cũng gây ra vấn đề, và việc của ta là giải quyết nó.

## Nội dung dài
Đây là các cách xử lý với nội dung dài
### Overflow wrap
Thuộc tính `overflow-wrap` dùng để thiết lập việc ngắt dòng nếu 1 từ vượt ra ngoài khung bao ngoài nó
```
.card {
  overflow-wrap: break-word;
}
```
![](https://images.viblo.asia/d1cd0a32-e381-49e0-9371-6099e7916374.png)
### Hyphens
Đây là thuộc tính giúp thêm gạch ngang nối một từ dài bị ngắt xuống dòng trong 1 đoạn văn. Ví dụ như này
```
.element {
  hyphens: auto;
}
```
![](https://images.viblo.asia/e4b1b73e-c9d2-4534-9350-12cf9a71df22.png)

Tuy nhiên bởi vì nó là tự động, nên nó sẽ ngắt bất cứ chỗ nào bị thừa ra, kể cả nó chỉ là 1 từ ngắn có thể chuyển sang dòng tiếp theo

![](https://images.viblo.asia/ebc701ee-b656-4e97-94b4-a2f275fc92a1.png)
### Text truncate
Cái này chắc khá quen thuộc với mọi người, nó sẽ giúp cắt bớt nội dung bị thừa, thay bằng dấu ... biểu hiện nội dung này thực tế còn dài hơn

![](https://images.viblo.asia/becd319c-da6b-499d-bca8-8911477a077e.png)

Trong CSS không có sẵn 1 thuộc tính truncate, mà ta sẽ kết hợp các thuộc tính CSS
```
.element {
  white-space: nowrap; => không xuống dòng
  overflow: hidden; => ẩn nội dung bị thừa
  text-overflow: ellipsis; => thêm dấu ... đằng sau
}
```
### Truncate nhiều dòng
Đây là 1 phiên bản nâng cấp hơn của cái trên, giải thích hơi khó, mọi người xem ảnh là hiểu ngay nhé

![](https://images.viblo.asia/3e62b51a-2898-4443-a255-b4fd683a8662.png)

Để sử dụng được cái này, ta bắt buộc phải thêm `display: -webkit-box`, thuộc tính `-webkit-line-clamp` sẽ quyết định số dòng tối đa được hiển thị. Tuy nhiên, cách làm này có 1 nhược điểm là không thể sử dụng `padding`, nó sẽ dẫn đến việc hiển thị 1 phần của dòng tiếp theo như này

![](https://images.viblo.asia/f033457f-1d56-4348-b3c4-859d217ab8e9.png)

### Scroll
Đôi khi, việc ngắt dòng hay gạch nối sẽ không phù hợp, ví dụ như khi hiển thị 1 đoạn code, sẽ rất khó đọc nếu xuống dòng. Trong trường hợp này, việc scroll ngang sẽ đem lại trải nghiệm tốt hơn.

![](https://images.viblo.asia/5f64b372-7052-4528-96c4-0d9a11ddb3c9.png)
```
.code {
  overflow-x: auto;
}
```
## Nội dung ngắn
Có thể cái này bạn không hay gặp lắm, nhưng nó là một cái khá quan trọng khi thiết kế và xây dựng UI.
### Set độ rộng tối thiểu
Chúng ta sẽ quay lại ví dụ đầu tiêu, đơn giản chỉ cần thêm `min-width`, chúng ta sẽ không cần lo lắng về việc button quá nhỏ nữa
![](https://images.viblo.asia/b68c1a8b-d437-4ea1-9917-4c262f8c6d3e.png)

Giờ sau khi biết được vấn đề và giải pháp, chúng ta sẽ đi vào một số trường hợp cụ thể hay gặp.
## Các trường hợp hay gặp và cách xử lý
### Profile card
Đây là 1 ví dụ khá phổ biến, chúng ta khó mà dự đoán được độ dài của 1 cái tên. Vậy nên làm thế nào?

![](https://images.viblo.asia/7b34f97c-d0fd-48b6-9685-224f3d488c07.png)
```
/* Solution 1 */
.card__title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

/* Solution 2 */
.card__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```
Chúng ta có thể cắt ngắn tên hiển thị trong 1 dòng, hoặc hiển thị 2 dòng rồi mới cắt ngắn.
### Các mục trong navigation
Khi làm 1 trang web đa ngôn ngữ, độ dài của text có thể thay đổi, ví dụ như sau

![](https://images.viblo.asia/835bf84b-56af-4157-94fb-f31e08282501.png)

Chữ About trong phiên bản tiếng anh nhìn to hơn. Trong phiên bản RTL, text này khá là nhỏ, gây khó khăn cho người dùng khi muốn click vào nó. Trong trường hợp này, cách tốt nhất là ta set độ rộng tối thiểu cho các mục trong navigation
```
.nav__item {
  min-width: 50px;
}
```
![](https://images.viblo.asia/03b4bf0b-9d4e-45c0-b851-8436572e971f.png)
### Nội dung bài viết
Trong một đoạn văn dài thì việc có 1 vài từ dài hay link khá phổ biến.

![](https://images.viblo.asia/8bca4169-d5aa-405d-a71e-6cb6760efdba.png)

Trong hình trên, có 1 từ dài quá khung của nó, gây ra hiện tượng scroll ngang. Như vừa trình bày ở trên, bạn có thể xử lý nó đơn giản bằng `text-overflow` hoặc `hyphens`.
```
.article-content p {
  overflow-wrap: break-word;
}
```
### Giỏ hàng
Tên sản phẩm có thể chỉ là 1 từ hoặc nhiều dòng, trong ví dụ bên dưới, tên sản phẩm dài dẫn đến quá gần với nút xóa

![](https://images.viblo.asia/e248fcd8-4e02-4898-86a5-e1a6cd4f42fa.png)

Trong trường hợp này thì ta có thể thêm margin hoặc padding giữa tên và nút xóa
```
.product__name {
  margin-right: 1rem;
}
```
Hoặc có thể thêm 1 cái `max-width` cho tên, sau đó xử lý vs phần text thừa ra (xuống dòng hoặc ẩn bớt đi).
### Flexbox và nội dung dài
Có 1 vài trường hợp sử dụng flexbox với nội dung dài cũng có thể gây vỡ layout, như ví dụ sau

![](https://images.viblo.asia/1661a962-d7d2-46a3-b77a-7d021151e50f.png)
```
<div class="user">
  <div class="user__meta">
    <h3 class="user__name">Ahmad Shadeed</h3>
  </div>
  <button class="btn">Follow</button>
</div>
```
```
.user {
  display: flex;
  align-items: flex-start;
}

.user__name {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
```
Tuy nhiên, khi text quá dài, nó sẽ tràn ra thế này

![](https://images.viblo.asia/d6492803-9323-4777-997f-b5ce80dd5212.png)

Lý do là vì flex-item sẽ không thu nhỏ lại dưới nội dung tối thiểu của nó, để xử lý cái này, chúng ta sẽ thêm `min-width: 0` cho flex-item
```
.user__meta {
  /* other styles */
  min-width: 0;
}
```
![](https://images.viblo.asia/7f31d72c-557b-4bf6-b376-3a8bca763417.png)

Cụ thể hơn, bạn có thể đọc thêm [bài viết này](https://ishadeed.com/article/min-max-css/#setting-min-width-to-zero-with-flexbox).


Nguồn tham khảo: https://ishadeed.com/article/css-short-long-content/