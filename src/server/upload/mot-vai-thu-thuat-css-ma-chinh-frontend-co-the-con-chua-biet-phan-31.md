![](https://images.viblo.asia/06d49b00-b954-4190-8f84-7f9226a8369b.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 31 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1.  `:is()` selector, xem có gì thú vị không?

Giới thiệu với mọi người 1 selector mới, có tên là `:is`, hãy xem nó làm được gì cho code CSS của bạn nhé!

BẠN ĐANG VIẾT KIỂU NÀY

```css
.footer .title, .footer p {
    color: green;
}
```

HÃY THỬ ĐỔI SANG KIỂU NÀY

```css
.footer :is(.title, p) {
    color: green;
}
```

Đơn giản là mình sẽ thấy **code ít đi hơn 1 tí** và cũng trông nó **cool ngầu, xịn xịn hơn 1 tí ^^**.

Đây cũng là một trong những CSS selector thuộc [`CSS Selector Level 4`](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-21-djeZ1ooJ5Wz#_3-css-selector-khong-phan-biet-chu-hoa-chu-thuong-2) đó mọi người hỉ.

> Khi dạo chơi trong thế giới của CSS, đôi khi bạn bắt gặp những keywords là `:any`, `:matches`. Thì đây đều là **những cái tên cũ** của `:is` hiện tại đó nhé.

Viết đến đây, mình chợt nhớ ra cách hoạt động của `:is` trông giống như viết **nesting** trong [`Sass`](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-11-ByEZky9W5Q0#_2-dung-viet-css-trong-css-nua-1) vậy. Thử viết lại đoạn code trên với cú pháp Sass, chúng ta cũng sẽ có kết quả output tương tự...

```scss
.footer {
    .title, p {
        color: green;
    }
}
```

Nhưng không hẳn là **nesting** của Sass với `:is` trong CSS giống nhau hoàn toàn đâu nhé!

Sự khác nhau đó là **độ ưu tiên**.

Vẫn code ví dụ ở trên, mình đổi màu cho `.title` thành `red`

{@codepen: https://codepen.io/tinhh/pen/OJWJpVy}

**Kết quả OK, đúng như bạn nghĩ**

Đổi code 1 chút, đổi màu cho `p` thành `red` xem sao?

{@codepen: https://codepen.io/tinhh/pen/vYgYxWE}

**Kết quả là không đổi thành màu đỏ được!?!**

Lý do được giải thích như thế này:
- Trong selector `:is` có chứa `.title` và như bạn hiểu thì `class` sẽ có độ ưu tiên cao hơn là `tag`.
- Hay nói cách khác là: `class` thì đè `class` được, chứ `tag` không đè `class` được :smiley: 
- Quay lại đoạn code trên, thử bỏ đi `.title` trong selector `:is`. Thì lúc này `p` sẽ có màu đỏ cho mà xem.

> Browser Support
> 
> Vẫn là anh bạn IE (hình như sắp die) của chúng ta không chịu chơi với ai thôi.
>
> https://caniuse.com/?search=%3Ais 

#### Đọc hiểu thêm

- https://twitter.com/argyleink/status/1192562385489260544
- https://www.youtube.com/watch?v=McC4QkCvbaY&ab_channel=KevinPowell
- https://developer.mozilla.org/en-US/docs/Web/CSS/:is
- https://css-tricks.com/almanac/selectors/i/is/


### 2. Bạn có biết selector `:lang()` chưa?

Giả sử trang web của bạn có `lang` mặc định là `EN` (tiếng anh), trong đó có 1 vài đoạn văn bằng tiếng việt và bạn muốn highlight nó.

```html
<div class="box" lang="en">
    <p>This paragraph is written in English</p>
    <div class="inner" lang="vi">
        <p>Và đây là tiếng việt</p>
    </div>
</div>
```

Nhìn code bên trên bạn nghĩ dễ dàng để style nó.

```css
[lang="en"] p {
    background-color: red;
}
[lang="vi"] p {
    background-color: yellow;
}
```

Đoạn CSS này style đúng với ý bạn mong muốn rồi đó, nhưng thử đổi thứ tự gọi CSS lại đi.

```css
[lang="vi"] p {
    background-color: yellow;
}
[lang="en"] p {
    background-color: red;
}
```

Sẽ không đúng mong đợi của bạn phải không? Bởi vì lúc này `[lang]` được coi như các kiểu selector `[attribute]` khác như `class`, `id`.

Nhưng hay ho hơn ở đây, là CSS cung cấp cho chúng ta 1 selector `:lang`, nó không hề bị ảnh hưởng bởi thứ tự style CSS như trên. Vì selector được phát triển đặc biệt để đáp ứng trong những tình huống như thế này.

```css
p:lang(vi) {
    background-color: yellow;
}
p:lang(en) {
    background-color: red;
}
```

{@codepen: https://codepen.io/tinhh/pen/RwKwqPM}

Hi vọng trong dự án của bạn sẽ gặp thực tế tình huống trên và áp dụng thử `:lang` vào xem nhé!

#### Đọc hiểu thêm

- https://bitsofco.de/use-the-lang-pseudo-class-over-the-lang-attribute-for-language-specific-styles/
- https://tympanus.net/codrops/css_reference/lang/
- https://css-tricks.com/almanac/selectors/l/lang/
- https://developer.mozilla.org/en-US/docs/Web/CSS/:lang


### 3. FirefoxDevTools cũng toàn hàng xịn đấy

[Ở phần 30 mình có đề cập 1 số tính năng hay của Chrome DevTools](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-30-eW65GmAxZDO#_3-mot-so-tinh-nang-moi-cua-chrome-devtools-2), nhưng là 1 dev Frontend, mình nghĩ các bạn cũng nên thử trải nghiệm, sử dụng các DevTools của trình duyệt khác, đặc biệt là Firefox. 

> Mình còn nhớ hồi năm 2012, lúc mình mới học làm web, thì có công cụ gọi là Firebug (con gián) là một trong Add-ons rất nổi tiếng của Firefox lúc đấy. Nó dùng để debug giống Chrome DevTools mà nhiều dev Frontend đang sử dụng ngày nay.

Firefox giờ cũng có DevTools tích hợp trong trình duyệt, với độ mạnh mẽ trong các tính năng giúp developer debug không kém gì Chrome cả.

Đặc biệt là Firefox còn có thêm phiên bản `Firefox Developer Edition`, nghe tên thì bạn cũng hiểu hàng rồi đó, 1 phiên bản đặc biệt dành riêng cho các developer.

**#1: Bậc thầy về lưới CSS (CSS Grid)**

Chắc hẳn các bạn hồi mới học CSS Grid, đều được các trang tutorials bảo nên sử dụng Firefox làm công cụ debug nhỉ? Vì nó có giao diện debug cực kỳ trực quan, bạn không cần phải tưởng tượng quá nhiều việc các thuộc tính hoạt động ra sao, Firefox sẽ giúp bạn trực quan hoá nó rất chi tiết. (Nhìn vào dễ hiểu lắm luôn á)

![alt](https://www.mozilla.org/media/img/firefox/developer/hero-screenshot.baf6dd693658.png)

**#2: Làm mờ đi các khai báo CSS mà không có tác dụng trên trang**

Mình đã test thử với đoạn code này

```css
position: static;
top: 0;
left: 0;
```

Thì lập tức `top: 0` và `left: 0` bị gray tối lại để cảnh báo cho bạn biết là nó không cần thiết nữa. Khi bạn di chuột qua icon info, bạn sẽ nhìn thấy một thông báo hữu ích về lý do tại sao CSS lại không hoạt động, bao gồm một gợi ý về cách khắc phục sự cố.

![](https://images.viblo.asia/0d0a757b-db65-4ddd-81e1-cb1bda51540a.png)

Ngoài ra còn nhiều tính năng hay ho khác, bạn khám phá thêm [ở đây](https://www.mozilla.org/en-US/firefox/developer/) nhé. (Có khi ghiền rồi chuyển hẳn sang dùng Firefox DevTools luôn đó) 

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!