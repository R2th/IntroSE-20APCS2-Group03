- Ở [bài trước](https://viblo.asia/p/nhung-meo-hay-va-nhung-chu-y-khi-chung-ta-lam-css-RnB5p00r5PG) mình đã giới thiệu một số mẹo hay và những chú ý khi chúng ta làm css bài này mình tiếp tục giới thiệu thêm một số mẹo hay và những chú ý

## Đừng lặp lại

- Điểm đáng giá của CSS là hầu hết các thuộc tính của nó đều kế thừa từ các element cấp trên trong DOM. Lấy ví dụ với thuộc tính font, nó hầu như luôn được thừa kế từ cha, chúng ta không phải thiết lập lại giá trị của font cho từng phần tử trên trang web.

Để thiết lập font mặc định cho toàn bộ trang web, chúng ta chỉ cần đơn giản thêm style font cho thẻ <html> hoặc thẻ <body>, toàn bộ các element con bên trong sẽ được thừa kế thiết lập này:
```css
body {
    font: normal 16px/1.4 sans-serif;
}
```


Để thay đổi font của bất kỳ element nào, chúng ta chỉ cần thiết lập lại font cho element đó, các element khác sẽ vẫn sử dụng font mặc định. Vì vậy, việc chúng ta cần lưu ý ở đây là sử dụng thừa kế nhiều nhất có thể, tránh việc thiết lập các style một cách lặp lại cho các element


## Sử dụng transform()

- Khi tạo animation cho các element, chúng ta không nên trực tiếp sửa các thông số width, height, hoặc các giá trị left, top, bottom, right. Thay vào đó, chúng ta nên sử dụng **transform()** để thực hiện animation, bởi vì sử dụng **transform()** sẽ mang đến các chuyển động mượt mà hơn, và code của chúng ta cũng dễ đọc hơn. 

Xét ví dụ sau đây:

```css
     .ball {
        left: 50px;
        transition: 0.4s ease-out;
    }

    /* Animation bằng cách set giá trị cho left */
    .ball.slide-out {
        left: 500px;
    }

    /* Animation bằng cách sử dụng transform */
    .ball.slide-out {
        transform: translateX(450px);
    }
```


Trong ví dụ trên, trường hợp chúng ta trực tiếp thiết lập giá trị cho thông số **left**, chúng ta phải nhìn lại thông số **left** ban đầu, tính toán để suy ra animation của element. Còn khi chúng ta sử dụng **transform**, chỉ cần nhìn vào **translateX(450px)** là chúng ta biết animation sẽ như thế nào

**Transform()** tương thích với hầu hết các browser phổ biến hiện nay, và được sử dụng một cách tự do.

## Đừng tự mình làm tất cả, hãy sử dụng framework

- Cộng đồng dev css là rất lớn với số lượng thư viện khổng lồ và liên tục cập nhật thêm framework mới. Chúng ta có rất nhiều framework CSS để lựa chọn, từ các framework để làm những công việc nhỏ nhỏ, đến những framework toàn diện để xây dựng cả một hệ thống, phần lớn các framework này đều là open source.

- Vì vậy, mỗi khi các bạn gặp phải một vấn đề nào đó với CSS, thì thay vì ngồi suy nghĩ để viết ra các đoạn code giải quyết vấn đề, các bạn nên kiểm tra xem các vấn đề đó đã có giải pháp chưa. [GitHub](https://github.com/) và [CodePen](https://codepen.io/) là 2 trong số các địa chỉ bạn có thể truy cập để tìm ra cách giải quyết cho vấn đề nào đó của bạn.

## Giữ cho các Selector có mức độ thấp

-  Không phải mọi selector trong CSS đều như nhau. Khi các lập trình viên làm quen với CSS, họ thường nghĩ rằng các selector sẽ luôn ghi đè mọi thứ bên trên nó. Tuy nhiên, điều này không hoàn toàn đúng. Chúng ta thử xét ví dụ sau:

```html
<a href='#' id='blue-btn' class="active">Active Button </a>
```

```css
a{
    color: #fff;
    padding: 15px;
}

a#blue-btn {
    background-color: blue;
}

a.active {
    background-color: red;
}
```

kết quả được như hình ảnh sau:
![](https://images.viblo.asia/3bdb8191-a043-4c2d-a484-3a2872ebbc1d.png)

- Trong ví dụ trên, class selector mặc dù được khai báo sau, nhưng kết quả vẫn cho ra button với màu xanh chứ không phải màu đỏ, bởi vì id selector có tính ưu tiên cao hơn. Quy tắc như sau:

**ID (#id) > Class (.class) > Type (header)**

Selector càng phân cấp nhiều thì tính ưu tiên càng cao. Ví dụ *a#button.active* thì xếp hạng cao hơn *a#button* . Sử dụng các selector có tính ưu tiên càng cao thì khả năng ghi đè thuộc tính của selector càng lớn và ưu tiên nhất là khi chúng ta sử dụng **!important.** Tôi sẽ giới thiệu ở chú ý tiếp theo

## Đừng sử dụng !important

-  Đừng bao giờ sử dụng !important trong CSS. Các bạn có thể sửa lỗi một cách nhanh chóng bằng !important, tuy nhiên nó sẽ gây ra nhiều hậu quả trong tương lai. Thay vì sử dụng !important, hãy tìm hiểu vì sao selector của các bạn không hoạt động như mong muốn và tìm cách thay đổi để nó hoạt động như các bạn muốn.

Trường hợp duy nhất các bạn có thể sử dụng !important là khi các bạn muốn ghi đè inline style trong file html, mà thật ra inline style cũng là 1 trong những cách tồi mà chúng ta nên tránh

##  Sử dụng text-transform thiết lập các ký tự chữ hoa, thường cho văn bản

-  Trong html, khi bạn muốn nhấn mạnh tầm quan trọng của một từ, các bạn sẽ viết hoa chữ đó lên để nhấn mạnh chữ đó trong file html. Ví dụ: 

```html
<h3>Employees MUST wear a helmet!</h3>

```
-  Tuy nhiên, trong trường hợp các bạn muốn viết hoa toàn bộ của tất cả các chữ, chúng ta nên viết chữ thường trong file html, và gắn style **text-transform** trong CSS. ví dụ :

```html
<div class="movie-poster">Star Wars: The Force Awakens</div>
```

```css
.movie-poster {
    text-transform: uppercase;
}
```
- Tương tự khi bạn muốn chữ thường và chữ hoa đầu mỗi từ thì sử dụng một số giá trị của thuộc tính [text-transform](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform)

## Sử dụng images trong background

-  Khi thêm hình ảnh vào thiết kế của bạn, đặc biệt nếu nó đáp ứng được reponsive,  thì hãy sử dụng thẻ <div> với thuộc tính **background**  trong css thay vì sử dụng element <img> trong html

- Điều này có vẻ như không có tác dụng gì nhiều, nhưng nó thực sự làm cho việc style hình ảnh trở nên dễ dàng hơn, giữ kích thước và tỷ lệ khung hình ban đầu của chúng, nhờ vào **background-size**, **background-position** và các thuộc tính khác. Xem ví dụ dưới đây

```html
<section>
    <p>Img element</p>
    <img src="images/bicycle.jpg" alt="bicycle">
</section>

<section>
    <p>Div with background image</p>
    <div></div>
</section>
```

```css
img {
    width: 300px;
    height: 200px;
}

div {
    width: 300px;
    height: 200px;
    background: url('images/bicycle.jpg');
    background-position: center center;
    background-size: cover;
}

section{
    float: left;
    margin: 15px;
}
```

và kết quả chúng ta thu được như hình ảnh dưới đây: 
![](https://images.viblo.asia/c5a5d7a7-071a-4e00-8d05-052792135e26.png)

- Một nhược điểm của kỹ thuật này là khả năng truy cập web của trang của bạn sẽ bị ảnh hưởng nhẹ, vì hình ảnh sẽ không được thu thập dữ liệu chính xác bởi trình đọc màn hình và công cụ tìm kiếm. Vấn đề này có thể được giải quyết bởi đối tượng tuyệt vời **object-fit** nhưng nó chưa hỗ trợ được trên toàn bộ các trình duyệt.
    
###    Đừng style inline css trên html

 -  Không nên sử dụng style inline trong html, vì nhiều lý do. Những lý do bao gồm khả năng duy trì, tái sử dụng và khả năng mở rộng. Vì mỗi tag HTML cần được styles độc lập. Quản lý website sẽ rất khó nếu bạn chỉ sử dụng inline CSS

    
    ```HTML
    <h1 style="text-align: center">Welcome</h1>
    ```