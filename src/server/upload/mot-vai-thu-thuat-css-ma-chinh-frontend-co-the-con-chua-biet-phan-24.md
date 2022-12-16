![](https://images.viblo.asia/bcddcc69-0678-4de4-a8cb-fee1c0149bf2.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 24 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Bạn có biết System Font Stack?

Với sự phát triển của Web Fonts ngày nay, website của bạn luôn dễ dàng sở hữu được những kiểu chữ đẹp và bất cứ user nào sử dụng cũng đều có được cùng kiểu chữ đó, dù cho người dùng đang sử dụng bất kỳ hệ điều hành nào đi chăng nữa.

Bạn có thể sử dụng các kỹ thuật phổ biến như `@font-face` hay là `Google Fonts API`. 

Tuy nhiên, cách sử dụng font như trên cũng mang đến vài nhược điểm như:

1. Không phải đối tượng người dùng nào cũng thích font chữ mà bạn đang sử dụng, chắc chắn sẽ có người khen, kẻ chê.
2. Fonts được coi là 1 thứ resource điển hình của nặng/lớn, so với những resource khác đang được load trên website của bạn.

Nếu chúng ta sử dụng font có sẵn trên máy của người dùng, thì sẽ loại bỏ được bước fetch resource về, thời gian tải trang sẽ nhanh hơn rất nhiều.

Và `System Font Stack` xuất hiện, nó sẽ khắc phục được các nhược điểm trên giúp bạn! 

`Github`, `Bootstrap`, `Wordpress` là những website lớn đang sử dụng phương pháp tiếp cận font như trên.

![](https://images.viblo.asia/04229823-48d4-4e4e-8802-e76c062cf98f.PNG)

![](https://images.viblo.asia/5865bb5d-dfd1-4454-b475-0ac4e3014951.PNG)

![](https://images.viblo.asia/2919f2e5-95b9-4d58-b2c1-db856049049f.PNG)

Bạn sẽ thấy đa số dòng code `font-family` đều có những điểm chung như này:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
```

Với đoạn code trên, website của bạn trên từng hệ điều hành (HĐH) khác nhau, sẽ có `font-family` khác nhau.

- `-apple-system, BlinkMacSystemFont:` đây là font dành cho HĐH MacOS và ứng với từng phiên bản nó sẽ có tên font khác nhau. Ví dụ như version `El Capitan` thì System Font là `San Francisco`, version `Yosemite` thì System Font là `Helvetica Neue`.
- `"Segoe UI"`: đây là font dành cho HĐH Windows, Windows Phone.
- `Oxygen-Sans, Ubuntu`: là font dành cho HĐH Linux.
- `Roboto`: là font dành cho HĐH Android.

[Xem thêm mô tả HĐH và Browsers tương ứng với tên font được gọi](https://gist.github.com/nagelflorian/9dba284f8348358d9c0d8979aa296671)

> Vấn đề bây giờ là bạn thương lượng với ông Designer và bác khách hàng nữa thôi !!!

#### Đọc hiểu thêm

- https://css-tricks.com/snippets/css/system-font-stack/
- https://github.com/necolas/normalize.css/issues/665
- https://bitsofco.de/the-new-system-font-stack/

### 2. `line-height` phải dùng `unitless`

Đây là vấn đề mình mắc phải trong suốt thời gian dài làm việc với CSS, đó là sử dụng thuộc tính `line-height` với value dạng `px`.

> Lí do mình làm vậy là vì để đúng với Design nhất có thể !!!

Các công cụ hỗ trợ developer `Inspect` Design như `Figma`, `Invision`, `Zeplin` đều cho output code CSS có `line-height: ..px`. Rồi bạn đem nó vào trong code CSS của mình, cứ mỗi dòng text bạn đều liên tục khai báo `font-size` + `line-height` đi kèm. Đây thực sự là một việc khá dư thừa và không cần thiết.

Bạn có 1 tiêu đề khai báo `font-size: 24px`, `line-height: 48px`. Tức ở đây `line-height` gấp đôi giá trị của `font-size`.

Khi làm responsive cho màn hình < 768px, bạn chỉnh lại `font-size: 18px` và `line-height: 36px`. Bạn không làm sai, nhưng bạn đang làm 1 việc không cần thiết.

Thay vì bạn phải viết:

```css
.text {
    font-size: 24px;
    line-height: 48px;
    
    @media (max-width: 768px) {
        font-size: 18px;
        line-height: 36px;
    }
}
```

Chỉ cần viết lại như này:

```css
.text {
    font-size: 24px;
    line-height: 2;
    
    @media (max-width: 768px) {
        font-size: 18px;
    }
}
```

Khi sử dụng `line-height: 2`, trình duyệt sẽ tự động hiểu `line-height` có giá trị bằng gấp đôi  `font-size` hiện tại.

Tránh lặp lại việc xử lý như trên, bạn đã bỏ đi được 1 mớ thuộc tính `line-height` thừa rồi chứ???

Nếu bạn đang sử dụng **Bootstrap** thì hãy để ý khai báo `line-height: 1.5` ở thẻ `body`

![](https://images.viblo.asia/fb31a9eb-a14a-4723-be63-3863528ef035.PNG)

Hay là xem **Twitter** đang dùng `line-height` như thế nào?

![](https://images.viblo.asia/2f3382bc-3dea-4bca-a4c5-14f65fb8142b.PNG)

Bạn thấy rồi đó..họ đã sử dụng `unitless` hết rồi.

Tóm lại cách sử dụng `line-height` tốt nhất sẽ là:

1. Khai báo `line-height` sử dụng `unitless` ở thẻ `body`. Các thẻ ở trong thừa kế được `line-height` mà không nhất thiết phải khai báo thêm.
2. Nếu trường hợp cần phải set lại `line-height` cho thành phần cụ thể bên trong thì vẫn ưu tiên sử dụng `unitless`.
3. Nếu lấy `line-height` ở design ra bằng đơn vị `px` thì convert nó ra `unitless` bằng cách `line-height/font-size`.
4. Nếu đang dùng SASS thì tiện ích hơn nữa, bạn có thể sử dụng phép tính trực tiếp trong code SASS `line-height: (32px/16px)` -> CSS: `line-height: 2`.

#### Đọc hiểu thêm

- https://allthingssmitty.com/2017/01/30/nope-nope-nope-line-height-is-unitless/
- https://css-tricks.com/almanac/properties/l/line-height/
- https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/

### 3. Thêm `linter` bắt lỗi thẻ `<a />` không hợp lệ

Ở [tip số 1 của phần 20](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-20-4dbZN1WnKYM#_1-highlight-nhung-the-img--thieu-thuoc-tinh-alt-0) mình đã có 1 chia sẻ về cách **Highlight những thẻ <img /> thiếu thuộc tính alt**. Nay tiếp tục bổ sung cho bộ **linter** là đi kiểm tra những thẻ `<a />` mà:

- Thiếu thuộc tính `href`
- Thuộc tính `href=""`
- Hoặc là thuộc tính `href="#"`

Tất cả đều phải được nổi bật lên trên trang và dev chúng ta phải chú ý để fix nó sớm nhất có thể.

{@codepen: https://codepen.io/tinhh/pen/xxZqqRM}

```scss
a {
   &[href=""],
   &[href="#"],
   &[href^="javascript:"],
   &:not([href]) {
      outline: 2px dotted red;
   }
}
```

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!