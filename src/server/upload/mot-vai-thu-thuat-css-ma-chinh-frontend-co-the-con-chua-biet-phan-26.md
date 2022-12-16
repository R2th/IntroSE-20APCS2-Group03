![](https://images.viblo.asia/c4724cfc-6c1a-48a7-93c0-71f6800ec64b.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 26 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. `gap` dành cho những ai yêu Flexbox

Sở dĩ mình không còn sài `float` bởi vì nó đã quá cồng kềnh khi phải dùng tới `clear`, để điều khiển layout theo ý muốn tương đối là khó và phải viết nhiều code hơn. 

`CSS Grid` thì hẳn là hàng xịn rồi, nó là vũ khí siêu mạnh để trừng trị các loại layout khó, tiếc là dự án mình chưa có nhiều layout khó để lấy nó ra dùng.

Trong khi đó, `flexbox` vẫn là cú pháp mình quen thuộc, dễ sài, xử lý layout linh động, hiện tại quá đủ với mình rồi (vì mình toàn làm DỰ ÁN NHỎ không à!)

> Trong những phần trước, mình cũng có chia sẻ cho các bạn vài tip khi làm việc với `flexbox` (mình phải đi lục hết [25 phần trong series](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8) để tìm lại đó)
> - [Flexbox với margin-left: auto](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-4-1Je5ExVwlnL#_1-flexbox-voi-margin-left-auto-0)
> - [Dùng display: flex thì icon bị móp méo khi text dài](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-5-jvElaWGmKkw#_3-dung-display-flex-thi-icon-bi-mop-meo-khi-text-dai-2)
> - [Là một trick hay đến từ Flexbox](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-21-djeZ1ooJ5Wz#_1-la-mot-trick-hay-den-tu-flexbox-0)
> - [Giờ thì là một pha bị lỗi do Flexbox =))](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-21-djeZ1ooJ5Wz#_2-gio-thi-la-mot-pha-bi-loi-do-flexbox--1)

Vậy thì các bạn đang sài `flexbox` như mình, đã từng bao giờ gặp khó khăn trong việc tạo khoảng cách giữa các cột chưa? Hay là đã từng dòm ngó qua thuộc tính `gap` trong `CSS Grid` chưa nè?

> Trong Bootstrap, khái niệm `gap` chính là [gutters](https://getbootstrap.com/docs/4.0/layout/grid/#columns-and-gutters).

Đây là 2 cách mình làm hiện tại (khi chưa biết đến thuộc tính `gap`).

**Cách 1: Sử dụng `margin` -trái/-phải và `padding` trái/phải (mình học cách làm layout của Bootstrap)**

```pug
.grid <- có code CSS như `.row` của Bootstrap
    .col <- có code CSS như `.col-(md|sm|lg|xl)` của Bootstrap
        .item
    .col
        .item
    .col
        .item
```

{@codepen: https://codepen.io/tinhh/pen/mdPROxd}

> Cách này mình dùng khá là nhiều, mặc dù phải viết HTML lồng thêm 1 cấp nữa.

**Cách 2: Dùng `justify-content: space-between`**

*Đoạn code ví dụ này mình chia layout có 4 cột, khoảng cách giữa các cột là 20px*

```pug
.grid <- mình khai báo `display: flex`, `justify-content: space-between`, `flex-wrap: wrap`
    .item <- set `width: calc( (100% - (20px*3)) / 4 )`
    .item <- set tương tự cho các item dưới...
    .item
    .item
    .item
    .item
```

{@codepen: https://codepen.io/tinhh/pen/VwaPPqP}

> Có 1 số trường hợp ở hàng cuối, item bị giãn ra 2 bên, bởi cũng do thuộc tính `justify-content: space-between` gây ra (thử resize màn hình nhỏ lại để xem kết quả).

![](https://images.viblo.asia/1ba146b7-e7ac-4b15-a4e4-f5a10d543470.PNG)

**CÁCH HAY NHẤT: Sử dụng `gap`**

{@codepen: https://codepen.io/tinhh/pen/PoNWWMR}

Cách này đem lại khá nhiều lợi ích:

1. Code HTML ít nhất, giống như cách thứ 2.
2. Tạo khoảng cách giữa các dòng bằng chính thuộc tính `gap` mà không cần phải dùng đến `margin-bottom` hay `margin-top`. Với 2 cách trên, layout đang bị thừa `margin-bottom` ở hàng dưới, điều này cũng 1 phần gây ảnh hưởng đến cách tính toán layout của bạn.
3. Tạo khoảng cách giữa các cột mà không bị lỗi gây ra bởi `justify-content: space-between`.

> Nhưng cũng hãy cẩn thận 1 chút, vì `Safari` và `IE` lại chưa support thuộc tính này :cry: 

#### Đọc hiểu thêm

- https://twitter.com/argyleink/status/1254794309263491072
- https://caniuse.com/#search=gap
- https://developer.mozilla.org/en-US/docs/Web/CSS/gap

### 2. `font-family` được phép bỏ qua quote

Theo bạn thì 2 cách viết dưới đây, cái nào là hợp lệ?

```css
body {
    font-family: Anonymous Pro, sans-serif;
}
```

```css
body {
    font-family: "Anonymous Pro", sans-serif;
}
```

Bạn hãy thử bỏ cặp dấu nháy ở chỗ khai báo `font-family` trong dự án hiện tại của bạn đi mà xem!

CẢ 2 CÁCH VIẾT TRÊN ĐỀU HỢP LỆ.

Nhưng trong các trường hợp tên font đặc biệt như tên font chứa số hoặc các ký tự đặc biệt, thì buộc phải đặt dấu `\` để escape hoặc quote lại.

Ví dụ KHÔNG HỢP LỆ

```css
body {
    font-family: Baloo Tamma 2, sans-serif;
}
```

Ví dụ HỢP LỆ

```css
body {
    font-family: Baloo Tamma\ 2, sans-serif;
}
```

Các trường hợp KHÔNG HỢP LỆ hay HỢP LỆ, có vẻ như đang rối cho các developer nhận biết. Cho nên để  **"chắc cú"** thì khuyên bạn quote lại hết cho tên font có khoảng cách ở giữa :smile:

Bạn đã từng bị trường hợp như thế này chưa: Khi mà không thấy tên font được nhận đúng ngoài trình duyệt, vào code xem lại thì thấy tên font không có quote, cứ tưởng là bắt đúng lỗi rồi, thử bỏ thêm quote vào...ai dè !?! cũng không nhằm nhò gì =)). Mình đã từng như vậy :smile:

Hiểu được cái này, bạn sẽ không bị "TƯỞNG" nữa!

> Hãy thử tool này https://mothereff.in/font-family . Bạn điền tên font vào trong đó, nó sẽ liệt kê ra 2 cách viết có quote và không quote trông như thế nào.

#### Đọc hiểu thêm

- https://mathiasbynens.be/notes/unquoted-font-family

### 3. Animation PRO hơn với `cubic-bezier()` 

Các hiệu ứng trong `transition` của CSS3 không chỉ có `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`. Trong khi các hiệu ứng kia gọi là tiêu chuẩn, thì `cubic-bezier` được coi như là những kiểu phá cách, đem lại những hiệu ứng đặc biệt, cuốn hút cho trang web của bạn.

*Check qua ví dụ bên dưới, hover qua box xem kỹ bạn sẽ thấy được sự khác nhau giữa 2 hiệu ứng*

NORMAL - Sử dụng `ease`

{@codepen: https://codepen.io/tinhh/pen/RwaKjpR}

CUSTOMIZE - Sử dụng `cubic-bezier`

{@codepen: https://codepen.io/tinhh/pen/ZEWLaem}

> Hiệu ứng transition vẫn có những giới hạn của nó, vì nó chỉ cho phép bạn thay đổi 4 điểm trên đường chạy của hiệu ứng. Muốn tạo ra hiệu ứng đặc biệt hơn nữa, bạn buộc phải sử dụng tới `@keyframes` của thuộc tính `animation`.

Có khá nhiều tool online ngoài kia support điều chỉnh hiệu ứng và generate ra mã code `cubic-bezier` dễ dàng như:

- https://easings.net/
- https://matthewlein.com/tools/ceaser
- https://cubic-bezier.com/#.17,.67,.83,.67

Đôi khi chỉ cần tinh tế 1 chút, đưa vào những kiểu hiệu ứng của`cubic-bezier` cho các `transition` khi hover, trang web của bạn sẽ trở nên nổi bật hơn (có khi còn được khách hàng khen nữa chứ ^^).

#### Đọc hiểu thêm

- http://roblaplaca.com/blog/2011/03/11/understanding-css-cubic-bezier/

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!