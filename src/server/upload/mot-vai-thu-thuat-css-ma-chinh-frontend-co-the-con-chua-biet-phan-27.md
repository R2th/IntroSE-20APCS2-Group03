![](https://images.viblo.asia/d46fb1a6-cb73-4282-a918-7ca467e343ff.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 27 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. CSS custom select sử dụng `pointer-events`

Ở những bài viết đầu tiên của loạt series này, mình cũng đã đề cập 1 vài thứ có thể làm được với thuộc tính `pointer-events`

- [Use Pointer Events to Control Mouse Events](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-2-1VgZvwQMlAw#_4-use-pointer-events-to-control-mouse-events-3)
- [Những thứ hay ho bạn có thể làm với `pointer-events`](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-3-E375z04dZGW#_3-nhung-thu-hay-ho-ban-co-the-lam-voi-pointer-events-2)

Nay tiếp tục mình khám phá thêm một cách áp dụng nữa của nó. Đó là **custom select**.

Để mà style lại CSS cho `<select />`, `<option />` chắc hẳn mỗi bạn sẽ có nhiều cách để làm:

1. [Sử dụng `.custom-select` của Bootstrap 4](https://getbootstrap.com/docs/4.5/components/forms/#select-menu)
2. Học theo cách làm của Bootstrap 4, thay đổi dấu mũi tên (arrow) trong select bằng `background-image`
3. Nhưng để style được cả thẻ `option` thì bạn cần phải dùng đến JS. Bạn cần generate ra 1 cấu trúc HTML (có thể bằng các thẻ div để dễ style) tương ứng với các option của select đó. Ở cách làm này thì bạn có thể sử dụng 1 đoạn snippet JS để xử lý (cộng đồng share nhau khá nhiều cách làm)
4. Vẫn sử dụng JS nhưng lần này là tìm đến các libraries/plugins phổ biến như **Select2**, **Chosen**, **Selectize** hoặc bạn nào code React thì biết tới **React Select**. Điểm đặc biệt ở các libraries/plugins là cung cấp nhiều tính năng hơn nữa như là Search trong Select, Group theo Categories...

Hôm nay cách làm của mình là hướng tới như kiểu số 1 ở trên. Tuy nhiên, mình lại không muốn sử dụng `background-image` bởi vì các lý do sau:

- Nếu bạn đang sử dụng những bộ **font icons** như `FontAwesome`, muốn dùng icon arrow cho Select đó, thì lại gặp chút ít khó khăn vì không trực tiếp sử dụng`<i class="fa fa-arrow" />` được
- Hay là bạn muốn vẽ arrow bằng CSS, không muốn dùng image

Vậy thì cấu trúc HTML của mình sẽ có dạng như sau:

```html
<div class="custom-select">
  <select>
    <option value="1">Your name 1</option>
    <option value="2">Your name 2</option>
    <option value="3">Your name 3</option>
  </select>
</div>
```

Mục đích là để tạo 1 wrapper, có thuộc tính quan trọng như `relative`, để tiếp đó mình sử dụng `:before`, `:after` hoặc là thêm 1 thẻ div ở bên trong để tạo ra **dấu mũi tên** theo ý muốn và `absolute` nó.

CSS mình sẽ có những **thuộc tính chính** là:

```scss
.custom-select {
   position: relative;
   
   &:after {
      content: '';
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 12px solid red;
   }
}

select {
   appearance: none;
}
```

Kết quả có được lúc này
{@codepen: https://codepen.io/tinhh/pen/BaKvzZO}

> Nhưng bạn thử click lên icon mũi tên mà xem, nó đang không work như ý muốn, selectbox không mở được dropdown. Là bởi vì khi click ở đó, sự kiện mouse đang interact với `:after`, mà không hề trigger được tới thẻ `select`.

Vậy để resolved được tình huống trên, bạn cần đến `pointer-events`. Code CSS bạn cần thêm là:

```scss
.custom-select {
   ...
   
   &:after {
      ...
      pointer-events: none; // <- Thứ kì diệu mình muốn đề cập là ở đây
   }
}
```

Hãy xem kết quả cuối cùng có được nào!!!

{@codepen: https://codepen.io/tinhh/pen/YzqdxaB}

> Idea ở đây sẽ là **disable** đi sự kiện mouse interact với `:after`, hình dung rằng khi bỏ qua việc này thì lúc mà bạn click vào icon mũi tên đó, nó sẽ ăn vào element bên trong đó và chính là `select` sẽ được trigger.

#### Đọc hiểu thêm

- https://stackoverflow.com/a/13968900/4485780 (Solution #3)
- https://youtu.be/bB14uo0Tu5A?t=521 (Phút thứ 8:45)

### 2. Flexbox với `margin: auto`

[Ở tip #1 của phần 5](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-5-jvElaWGmKkw#_1-css-canh-giua-1-thanh-phan-theo-chieu-ngang-va-doc-voi-code-ngan-nhat-0) mình có viết 1 số cách **CSS canh giữa 1 thành phần theo chiều ngang và dọc với code ngắn nhất**. Ở bài đấy, chúng ta đã tìm ra CON ĐƯỜNG NGẮN NHẤT là sử dụng đoạn code này:

```css
.container {
    display: grid;
    place-items: center;
}
```

Tuy nhiên, `place-items` là thuộc tính không được hỗ trợ  trên **IE** (https://caniuse.com/?search=place-items).

Chính vì vậy mà `margin: auto` sẽ là 1 giải pháp bạn cần quan tâm, nếu như dự án của bạn support cả **IE**

```css
.wrapper {
   display: flex;
}

.your-item {
   margin: auto;
}
```

{@codepen: https://codepen.io/tinhh/pen/NWNeaPd}

[Ở 1 bài chia sẻ cũ](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-4-1Je5ExVwlnL#_1-flexbox-voi-margin-left-auto-0), cũng với thuộc tính `margin` kết hợp với `flexbox` bạn có thêm được 1 cách khác để làm layout với CSS.

#### Đọc hiểu thêm

- https://css-tricks.com/the-peculiar-magic-of-flexbox-and-auto-margins/

### 3. Cẩn thận với cách dùng Modal kiểu này trong Bootstrap

Như mọi lần bạn vẫn gọi Modal trong Bootstrap đúng kiểu đó,  nhưng tại sao bây giờ lại bị lỗi???

TRƯỚC ĐÂY BẠN HAY VIẾT:

{@codepen: https://codepen.io/tinhh/pen/poyqWdV}

BÂY GIỜ BẠN VẪN VIẾT (chỉ có khác là thêm CSS `position: relative` và `z-index: 1` cho **thẻ wrapper** mà thôi)

{@codepen: https://codepen.io/tinhh/pen/VwaqMXv}

Đấy, chính đoạn CSS bạn thêm vào gây ra lỗi đấy :smiley: 

Trong document của Bootstrap của mô tả rất kỹ càng, trước khi sử dụng bạn cần lưu ý 1 vài thứ, trong đó có 1 ý như thế này:

> Modals use position: fixed, which can sometimes be a bit particular about its rendering. Whenever possible, place your modal HTML in a top-level position to avoid potential interference from other elements. You’ll likely run into issues when nesting a .modal within another fixed element.

Vậy là hiểu rồi nha, với trường hợp mà để đảm bảo Modal work đúng nhất, không bị bất kỳ thẻ div bọc ngoài nào can thiệp về `position`. Thì bạn cần move khối HTML của Modal ra ngoài `top-level` (nghĩa là con trực tiếp của thẻ `body`)

Quay lại cái demo bị fail lúc nãy và fix lại thôi

{@codepen: https://codepen.io/tinhh/pen/NWNeazX}

> Trong các JS Framework như React, cũng có khái niệm gọi là `Portal` giúp bạn move khối HTML đang bị lồng nhiều cấp bên trong ra ngoài `top-level` để một phần là tránh lỗi tương tự như trên đấy!

#### Đọc hiểu thêm

- https://weblog.west-wind.com/posts/2016/sep/14/bootstrap-modal-dialog-showing-under-modal-background

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!