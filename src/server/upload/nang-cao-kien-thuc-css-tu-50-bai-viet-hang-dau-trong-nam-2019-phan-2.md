## Giới thiệu
Trong phần đầu của bài viết chúng ta đã cũng nhau khám phá 13 bài viết đầu tiên trong series [Nâng cao kiến thức CSS từ 50 bài viết hàng đầu](https://viblo.asia/p/nang-cao-kien-thuc-css-tu-50-bai-viet-hang-dau-trong-nam-2019-phan-1-OeVKBd6MlkW). Trong bài viết hôm nay chúng ta cùng nhau tìm hiểu tiếp nhé. Nếu bạn nào chưa xem phần đầu của series có thể xem tại

[Nâng cao kiến thức CSS từ 50 bài viết hàng đầu trong năm 2019 (Phần 1)](https://viblo.asia/p/nang-cao-kien-thuc-css-tu-50-bai-viet-hang-dau-trong-nam-2019-phan-1-OeVKBd6MlkW)
## CSS Animation
1. [Css-animation-101](https://github.com/cssanimation/css-animation-101?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Tìm hiểu các tạo animation bằng CSS

![](https://images.viblo.asia/aa822417-7753-4370-9620-e87270222842.png)

2. [Tạo chuyển động sử dụng CSS4 thuần túy](https://codepen.io/miocene/pen/WJRXVg?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

{@embed: https://codepen.io/miocene/pen/WJRXVg?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more}

## CSS Performance
1. [Hiệu suất CSS và mạng](https://csswizardry.com/2018/11/css-and-network-performance/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)


![](https://images.viblo.asia/702d3219-fc66-4bb4-8ac1-905f4bbbe758.png)

2. [CSS at Scale](https://engineering.linkedin.com/blog/2018/04/css-at-scale--linkedins-new-open-source-projects-take-on-stylesh?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Dự án mã nguồn mở của LinkedIn's giúp tăng hiệu suất của Stylesheet.

![](https://images.viblo.asia/046e1bd7-ee5e-42a6-be2c-80a6d1b48ad4.png)

## Debugging

1. [Trick To Debug CSS](https://www.freecodecamp.org/news/heres-my-favorite-weird-trick-to-debug-css-88529aa5a6a3/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

![](https://images.viblo.asia/8130ffbe-e450-4813-b584-0fd83a4a432a.png)

## CSS Object Model
1. [Guide to the CSS Object Model](https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Tìm hiểu về CSS Object Model

![](https://images.viblo.asia/ee09a852-35ec-4cf2-83ef-35410bd7b0d7.png)

##  Architecture
1. [SMACSS: Scalable and Modular Architecture for CSS](https://www.toptal.com/css/smacss-scalable-modular-architecture-css?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

![](https://images.viblo.asia/3c9379ab-f9de-4056-97bb-0a34c2039ed9.png)

Khi chúng ta làm việc trên các dự án lớn hoặc với các team, chúng ta thường thấy rằng mã của chúng ta lộn xộn, khó đọc và khó mở rộng. Vì vậy, những gì nhiều người đã làm là họ đã tạo ra các kiến trúc CSS để giúp CSS trở nên dễ đọc hơn. SMACSS tức là kiến trúc có thể mở rộng và module cho CSS, nhằm mục đích thực hiện điều đó.

Mỗi cấu trúc dự án SMACSS sử dụng 5 phần:
1. Base
2. Layout
3. Modules
4. State
5. Theme

**Base**

Base xác định những phần tử chung nhất trên trang. Nếu bạn sử dụng reset CSS, điều này đảm bảo rằng style giống nhau trên các trình duyệt mặc dù có sự khác biệt giữa các mặc định CSS cơ bản. Trong base style, bạn chỉ nên bao gồm các bộ chọn phần tử hoặc những class selectore, không bao gồm ID selector.

```
html {
    margin: 0;
    font-family: sans-serif;
}

a {
    color: #000;
}

button {
    color: #ababab;
    border: 1px solid #f2f2f2;
}
```

Vì vậy, nó nên bao gồm kích thước sizes, margins, colors, borders và bất kỳ giá trị mặc định nào khác mà bạn dự định sử dụng trên trang web của mình. Tôi đặc biệt khuyên bạn nên tránh sử dụng `!important`

**Layout**

Layout sẽ chia trang thành các phần chính không phải là các phần như menu hoặc có thể là accordion, là các phân chia cấp cao nhất:
header, sidebar, content/main, and footer.

![](https://images.viblo.asia/cc6c0c3e-adf2-436f-aa74-8fde1f7bbd9d.png)

Dưới đây là một ví dụ:

```
#header {  
    background: #fcfcfc;
}

#header .l-right {
    float: right;
}

#header .l-align-center {
    text-align: center;
}
```

**Module**
Các module SMACSS là các đoạn code nhỏ hơn có thể tái sử dụng trên trang và chúng là một phần của một bố cục. Đây là những phần của CSS mà chúng ta lưu trữ trong một thư mục riêng biệt, vì chúng ta sẽ sử dụng nhiều trên một trang.

![](https://images.viblo.asia/4fafe0b1-e0a8-4b4a-a479-e6dba6d10c65.png)

Xét ví dụ sau:

```
.article {
    background: #f32;
}

.article--title {
    font-size: 16px;
}

.article--text {
    font-size: 12px;
}
```

**State**

Trạng thái xác định trong SMACSS là cách mô tả các modlue của chúng ta trông như thế nào trong các tình huống khác nhau. Vì vậy, phần này thực sự dành cho tính tương tác: Chúng tôi muốn hành vi khác nhau nếu một yếu tố được coi là bị ẩn, mở rộng hoặc sửa đổi.

```
<header id="header">
    <ul class="nav">
        <li class="nav--item is-selected">Contact</li>
        <li class="nav--item">About</li>
    </ul>
</header>
```

```
.nav--item.is-selected {
    color: #fff;
}
```

Ở ví dụ trên chúng ta sử dụng `.nav--item.is-selected` để style các phần tử có trạng thái là được chọn.

**Theme**

Điều này là rõ ràng nhất, vì nó được sử dụng để chứa các quy tắc của primary colors, shapes, borders, shadows,... Chủ yếu là những yếu tố lặp lại trên toàn bộ trang web. Chúng ta không muốn định nghĩa lại chúng mỗi khi chúng ta tạo ra chúng. Thay vào đó, chúng ta định nghĩa một `class` duy nhất mà chúng ta chỉ thêm vào sau này cho một phần tử mặc định.

```
.button-large {
    width: 60px;
    height: 60px;
}
```

```
<button class="button-large">Like</button>
```

2. [Combining the Powers of SEM and BIO for Improving CSS](https://css-tricks.com/combining-the-powers-of-sem-and-bio-for-improving-css/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more).

![](https://images.viblo.asia/c60d7583-cae2-4e14-966b-e08aa54f77c4.png)

3. [Creating the "Perfect" CSS System](https://medium.com/gusto-design/creating-the-perfect-css-system-fa38f5bcdd9e)

![](https://images.viblo.asia/0d7e0b2d-3cc8-450e-8e17-a1ba936fb9c7.jpg)

4. [BEM For Beginners](https://www.smashingmagazine.com/2018/06/bem-for-beginners/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

![](https://images.viblo.asia/6c413faf-5728-43ba-beb1-5f3e312b57fd.png)


## Kết luận
Như vậy trong phần 2 bài viết này mình đã giới thiệu với các bạn các bài viết hàng đầu hướng dẫn các kỹ thuật liên quan đến CSS. Hẹn gặp lại các bạn ở phần tiếp theo nhé. 

**Bài viết tham khảo**: https://medium.mybridge.co/learn-css-from-top-50-articles-for-the-past-year-v-2019-4570d9da53c