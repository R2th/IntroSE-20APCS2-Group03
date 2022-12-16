# Các kỹ thuật xử lý vấn đề về chữ trong CSS mà bạn nên biết
Mình có đọc được bài viết hay của [Evondev](https://evondev.com/van-de-ve-chu-trong-css/) về Css text nên quyết định chia sẽ đến mọi người bài viết này :)

Khi các bạn làm việc với CSS đặc biệt là làm những giao diện liên quan đến nội dung như những đoạn chữ ngắn hay dài. Đôi khi trong thiết kế chỉ hiển thị vài ba chữ làm giao diện trở nên rất đẹp, tuy nhiên khi chúng ta đưa vào dự án, nội dung có thể thay đổi dài hơn hoặc ngắn đi làm cho giao diện chúng ta gặp nhiều vấn đề không mong muốn.

Vì thế trong bài viết này mình sẽ đi vào các vấn đề đó kèm theo là các kỹ thuật để xử lý chúng một cách hiệu quả để kết quả chúng ta làm ra luôn được kết quả tốt nhất nhé. Bắt đầu thôi nào.
## Vấn đề
Trước khi đi sâu vào kỹ thuật để xử lý các vấn đề về nội dung liên quan tới chữ, thì mình sẽ trình bày một vài vấn đề trước cho các bạn dễ hình dung, như ở dưới hình này chúng ta có một vertical menu(menu hiển thị theo chiều dọc)

![](https://images.viblo.asia/25a9d91f-e049-4ac1-afd9-919ebe691c0f.png)

Như các bạn thấy là nếu bên trái là theo thiết kế rất chi là đẹp, tuy nhiên nếu nội dung dài ra thì sẽ bị xấu đi một chút. Thì lúc này chúng ta cần đặt ra những câu hỏi như là

* Chúng ta có nên sử dụng kỹ thuật cắt chữ để hiển thị trên một hàng hay không ?
* Hay là chúng ta cứ để nó hiển thị thành nhiều hàng ? Nếu có thì hiển thị tối đa bao nhiêu hàng là được hay là thích bao nhiêu hàng cũng được.

Đó là trường hợp có nhiều chữ hơn là chúng ta muốn nhưng nếu nội dung là một chữ nhưng kéo dài thì sao? Mặc định thì chắc chắn nó sẽ tràn ra ngoài Container bao ngoài như này

![](https://images.viblo.asia/aac98de4-8ebb-4de9-8bd8-1245d86fc802.png)

Là một Frontend Developer thì chúng ta phải biết cách để giải quyết những vấn đề thế này. Và tất nhiên là trong CSS sẽ có những thuộc tính CSS mà có thể giúp chúng ta xử lý chúng. Như ở trên là mình nói những nội dung dài làm bể layout, tuy nhiên nội dung ngắn cũng có thể luôn nhé nhưng sẽ khác một chút, có thể các bạn thắc mắc là nội dung ngắn sao mà gây ảnh hưởng tới giao diện được chứ, cùng xem giao diện ở dưới đây nha

![](https://images.viblo.asia/9ab74341-49a0-419a-ba63-d2f506104364.png)

Như hai Button ở trên khi nội dung dài bên trái thì giao diện rất là đẹp, nhưng bên phải khi nội dung chỉ có chữ Ok thì nhìn UI nó kỳ kỳ không ổn chút nào cả. Vậy làm sao để giải quyết vấn đề này, có thể sử dụng thuộc tính `min-width` cho Button được không nhỉ ?

Như bạn vừa mới đọc xong phần vấn đề thì sẽ thấy là không chỉ có những nội dung dài mới làm giao diện bị ảnh hưởng mà những nội dung ngắn cũng sẽ gây ảnh hưởng. Cho nên với việc sử dụng các kỹ thuật trong CSS thì ít nhất chúng ta có thể giảm thiểu được các vấn đề liên quan đến nội dung này. Tiếp tục tìm hiểu thôi nào.

## Nội dung dài
### Overflow Wrap

Thuộc tính `overflow-wrap` này sẽ giúp cho chúng ta xử lý khi nội dung chữ bị tràn ra ngoài khi nó quá dài(ví dụ: aaaaaaaaaaaaaaaaaaaa), các bạn xem hình dưới đây sẽ rõ

```css
.card {
  overflow-wrap: break-word;
}
```

![](https://images.viblo.asia/f0752825-d2fa-41a0-b3f6-186dec01ee65.png)

### Hyphens
Một thuộc tính CSS hay ho khác đó chính là `hyphens`, thuộc tính này sẽ thêm vào dấu **–** khi chữ dài không vừa với Container bao ngoài, việc thêm dấu **–** vào tuỳ thuộc vào trình duyệt quyết định là thêm vào khúc nào nên chúng ta sẽ không kiểm soát được nhé.

```css
.element {
  hyphens: auto;
}
```
![](https://images.viblo.asia/6c0a9e9d-f821-4f94-bb7f-40bd0041428b.png)

### Text Truncation

Nghe cụm từ này thì các bạn có thể hiểu là những thuộc tính CSS nó sẽ cắt chữ sau đó là thêm dấu 3 chấm vào phía sau nha. Coi hình phát là hiểu ngay

![](https://images.viblo.asia/9c3b330c-7dab-4bf3-a101-3ae834cb8b6f.png)

Để làm được kết quả như trên thì không có một thuộc tính nào làm ra được cả mà là bao gồm nhiều thuộc tính CSS kết hợp lại với nhau

```css
.element {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Multiple Line Text Truncation

Như ở trên là khi chúng ta muốn hiển thị chữ một dòng rồi kết hợp dấu 3 chấm, nhưng trường hợp chúng ta muốn hiển thị nhiều dòng rồi mới có dấu 3 chấm phía sau thì làm sao ? Thì lúc này chúng ta nên sử dụng thuộc tính `line-clamp` trong CSS để xử lý vấn đề này như sau

```css
.element {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

Để kỹ thuật này hoạt động tốt thì bắt buộc phải sử dụng `display: -webkit-box`, và thuộc tính `-webkit-line-clamp` sẽ điền vào giá trị là số dòng mà các bạn muốn hiển thị rồi mới có dấu 3 chấm.

![](https://images.viblo.asia/4ff6d224-0c29-4ee6-bcdc-e543a9b45eaa.png)

Tuy nhiên kỹ thuật này sẽ gặp một vấn đề đó là nếu các bạn sử dụng kèm thuộc tính `padding` thì nó sẽ hiển thị ra kết quả không như mong muốn.

![](https://images.viblo.asia/22fcac51-f8dc-42c6-a5f2-f720f30a20fa.png)

Cho nên để khắc phục các bạn nên áp dụng kỹ thuật này cho những thẻ mà không có `padding`. Mình ví dụ các bạn có HTML như sau

```html:html
<h2>This is long content</h2>
```

Nếu thẻ **h2** có `padding` và áp dụng kỹ thuật cắt chữ nhiều hàng ở trên thì sẽ bị lỗi đúng không ? Cho nên lúc này để có thể áp dụng được tốt thì trong thẻ **h2** các bạn thêm một thẻ khác bọc lại đoạn chữ đó, như thẻ **span** chẳng hạn rồi áp dụng kỹ thuật trên cho thẻ **span** là ngon lành.

```html:html
<h2><span>This is long content</span></h2>
```

### Horizontal Scrolling

Đôi khi không phải lúc nào cắt chữ hay thêm dấu **hyphens(-)** cho nội dung là cách tốt nhất. Ví dụ nếu các bạn đọc các bài viết ở blog mình và có các đoạn code mình chia sẻ trong một khung hiển thị, thì nếu mình áp dụng các kỹ thuật trên thì sẽ rất kỳ vì code mà rớt dòng từ chữ hay ký tự thì sẽ không hiểu là viết cái gì.

Ở vấn đề này thì cách tốt nhất là không áp dụng các kỹ thuật mà chúng ta vừa nói đến ở trên mà chỉ đơn giản là cho phép người dùng scroll ngang là được với thuộc tính `overflow-x: auto` như này

![](https://images.viblo.asia/0fc2cb8e-ee82-45d2-bb3f-907de656ce4d.png)

## Nội dung ngắn
Vấn đề nội dung dài chúng ta đã tìm hiểu và áp dụng các kỹ thuật CSS vào rồi. Ở mục này chúng ta sẽ tìm hiểu các vấn đề liên quan tới nội dung ngắn nha.

### Thiết lập độ rộng tối thiểu
Giờ thì quay lại vấn đề mà mình đã đề cập ở đầu bài. Làm sao để có thể xử lý vấn đề này cho Button để giao diện của chúng ta trông ổn hơn khi nội dung Button quá ngắn
![](https://images.viblo.asia/0c466102-e788-40be-b072-99422dfd3c03.png)

Cách đơn giản nhất là sử dụng thuộc tính min-width cho Button là xong. Lúc này thì giao diện của chúng ta sẽ ổn hơn rất nhiều.

![](https://images.viblo.asia/04d1f379-514e-42ca-bcfc-771d4710b3d0.png)

## Các ví dụ thực tế
### Profile Card
Như giao diện thông tin cá nhân dưới đây thì sẽ nảy sinh nhiều vấn đề, giả sử trong thiết kế chỉ có một hàng nhưng ra ngoài nội dung dài quá thì sao ? Chúng ta nên dùng **single line truncate** hay **multiple lines truncate**, cái này tuỳ thuộc vào yêu cầu của sếp hay khách hàng nha keke.

![](https://images.viblo.asia/a7f152c2-4aec-43e3-b0c4-c5c97a93b0a3.png)

```css
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

Chúng ta có giải pháp rồi, chỉ áp dụng vào thôi, nếu họ cần một dòng thì áp dụng giải pháp 1, còn nhiều dòng thì áp dụng giải pháp 2. Thế thôi!

### Article Content
Khi chúng ta làm việc với nội dung mà hiển thị ở trên điện thoại, và trong nội dung đó có thẻ **a**(link) với nội dung cực dài, tất nhiên là giao diện chúng ta sẽ bị ảnh hưởng thôi.

![](https://images.viblo.asia/e7e45a9f-1dd7-4209-a9f8-c83c36224201.png)

Để giải quyết vấn đề này thì chúng ta có thể áp dụng một trong hai cách chúng ta đã nói đó chính là ov`erflow-wrap h`oặc `hyphens`

```css
.article-content p {
  overflow-wrap: break-word;
}
```

### Shopping Cart
Khi các bạn làm việc với giỏ hàng, trong giỏ hàng có thông tin sản phẩm với giao diện gồm có hình ảnh, tên sản phẩm và nút xoá, nếu các bạn không chú ý thì lỡ tên sản phẩm quá dài thì sẽ dính vào nút xoá như này

![](https://images.viblo.asia/3bde334c-2e67-4d32-add8-1d4d373648bd.png)

Để khắc phục nó cách đơn giản là dùng `padding-right` hay `margin-righrt` là xong xuôi

```css
.product__name {
  margin-right: 1rem;
}
```

### Flexbox And Long Content
Đây là một vấn đề rất hay gặp khi chúng ta làm việc với flexbox khi chúng ta có nội dung nằm trên một hàng nhưng nội dung một bên quá dài làm ảnh hưởng phần tử bên kia như này

![](https://images.viblo.asia/f876ce4d-91f8-4498-acaf-d03737a5d91a.png)

```html:html
<div class="user">
  <div class="user__meta">
    <h3 class="user__name">Ahmad Shadeed</h3>
  </div>
  <button class="btn">Follow</button>
</div>
```

```css
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

Chúng ta có thể áp dụng các kỹ thuật đã bàn tới nhưng nó lại không hoạt động, nội dung vẫn bị dài ra và làm ảnh hưởng tới giao diện

![](https://images.viblo.asia/411013ea-b687-4d1b-a6e7-08ec26468b5f.png)

Lý do chính là khi chúng ta làm việc với flexbox thì flex item sẽ không shrink(co lại) dưới độ rộng tối thiểu của nội dung. Để giải quyết nó thì chúng ta sẽ áp dụng `min-width: 0` cho thằng bao ngoài **username** là **usermeta** là ngon lành

```css
.user__meta {
  /* other styles */
  min-width: 0;
}
```
![](https://images.viblo.asia/4416d66e-f4d4-41c8-99e9-ccdcaa7f4dbd.png)

Các bạn có thể thắc mắc là tại sao` min-width: 0` lại hoạt động khi sử dụng cho flex item trong flexbox, mình xin giải thích cho các bạn luôn nha.

Giá trị mặc định của thuộc tính `min-width` là `auto`, có thể hiểu là được tính là `0`. Khi một phần tử là flex item(phần tử nằm trong phần tử có sử dụng flexbox), thì giá trị của `min-width` lúc này không được tính là 0 nữa. Mà độ rộng tối thiểu của flex item lúc này bằng độ rộng của nội dung của nó, tức là nó dài bao nhiêu thì `min-width` lúc này sẽ bấy nhiêu luôn. Các bạn xem ví dụ này

![](https://images.viblo.asia/1594cb88-4508-448b-87f0-e3f15fdda151.png)

Lúc này các bạn sẽ thấy là tên người dùng(class ví dụ là **c-personname**) rất là dài cho nên sẽ làm cho nội dung bị tràn và xuất hiện scroll ngang cho nên lúc này mình áp dụng các kỹ thuật đã học vào để cắt chữ lại cho giao diện ổn hơn như sau

```css
.c-person__name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
Nhưng mà do đây là flex item cho nên nó sẽ không hoạt động, vì thế chúng ta phải dùng thêm thuộc tính `min-width` để giải quyết nó
```css
.c-person__name {
  /*Other styles*/
  min-width: 0;
}
```
Tada! Chúng ta sẽ có kết quả đẹp như mong muốn

![](https://images.viblo.asia/0811676c-15ea-4844-8224-7ff6f16d6aef.png)

## Lời Kết
Mình hi vọng với bài viết này sẽ giúp các bạn nâng cao kiến thức hơn, biết thêm nhiều kỹ thuật mới hơn để có thể xử lý nhiều vấn đề về giao diện mà liên quan tới nội dung nhé.

[`Nguồn: Evondev`](https://evondev.com/van-de-ve-chu-trong-css)