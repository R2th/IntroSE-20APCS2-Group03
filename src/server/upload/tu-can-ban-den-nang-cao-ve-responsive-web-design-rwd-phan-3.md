Xin chào các bạn, như đã nói hôm nay mình xin giới thiệu phần 3 của series bài viết từ căn bản đến nâng cao về Responsive Web Design (RWD). Trong series này mình sẽ đi từ căn bản nhất đến chi tiết nhất về RWD cho những bạn chưa từng biết gì về RWD có thể dễ dàng tiếp cận, tìm hiểu cũng như áp dụng một cách chính xác và khoa học nhất RWD trong công việc của một FrontEnd Developer. Ở bài viết thứ 3 này, mình sẽ nói về Media Queries và cách thức để thực hiện responsive cho trang web dựa trên cấu trúc của Grid-View mà chúng ta đã xây dựng.

*Lưu ý: Series bài viết này dành cho những ai không chuyên về FrontEnd hoặc là những ai mới bắt đầu làm về FrontEnd, những FrontEnd Dev kinh nghiệm lâu năm có thể bỏ qua.*

## Media Queries
### Media Queries là gì?
Media Queries là một kỹ thuật CSS được giới thiệu trong CSS3. 
Ta sử dụng cú pháp `@media` để bao gồm một khối các thuộc tính CSS chỉ khi một điều kiện nhất định là đúng. Nói một cách đơn giản là ta sẽ định nghĩa CSS riêng cho một nhóm các thiết bị có kích thước giống nhau.

> **Ví dụ**
> 
> Nếu kích thước của màn hình (cửa sổ trình duyệt) là 600px hoặc nhỏ hơn, màu nền sẽ là blue:
```
@media only screen and (max-width: 600px) {
    body {
        background-color: blue;
    }
}
```

### Thêm Breakpoint
Trước đó, trong series này chúng ta đã tạo một trang web với các hàng và cột và cũng đã có responsive. Tuy nhiên, trên các màn hình nhỏ thì lại chưa đáp ứng tốt cho người dùng.

Media Queries có thể giúp ta làm điều đó. Chúng ta có thể thêm các breakpoint, trong đó mỗi thành phần nhất định của trang web sẽ hiển thị khác nhau ở từng breakpoint khác nhau.

> **Ví dụ**
> 
> Sử dụng media query để định nghĩa breakpoint cho thiết bị có kích thước nhỏ hơn 768px:

**CSS code**
```
/* For desktop: */
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}

@media only screen and (max-width: 768px) {
    /* For mobile phones: */
    [class*="col-"] {
        width: 100%;
    }
}
```
*Ở đoạn code trên ta đã thêm vào cuối một đoạn CSS Media Query để định nghĩa khi kích thước màn hình (cửa sổ trình duyệt) nhỏ hơn 768px, mỗi cột luôn có chiều rộng là100%. Điều này có nghĩa là một khi gặp màn hình có kích thước <768px thì các thành phần HTML trong trang web chứa các class trên sẽ tự động full 100% màn hình để hiển thị tốt hơn nội dung cho người dùng.*


### Luôn luôn thiết kế Mobile First
Mobile First có nghĩa là thiết kế cho điện thoại di động trước khi thiết kế cho máy tính để bàn hoặc bất kỳ thiết bị nào khác (Điều này sẽ làm cho trang web hiển thị nhanh hơn trên các thiết bị nhỏ hơn).

Điều này có nghĩa là chúng ta phải thực hiện một số thay đổi trong code CSS.

Thay vì thay đổi layout trang web theo kiểu khi chiều rộng nhỏ hơn 768px, chúng ta nên thay đổi thiết kế khi chiều rộng lớn hơn 768px. Điều này sẽ làm cho thiết kế của chúng ta là Mobile First.

>**CSS code**
```
/* For mobile phones: */
[class*="col-"] {
    width: 100%;
}
@media only screen and (min-width: 768px) {
    /* For desktop: */
    .col-1 {width: 8.33%;}
    .col-2 {width: 16.66%;}
    .col-3 {width: 25%;}
    .col-4 {width: 33.33%;}
    .col-5 {width: 41.66%;}
    .col-6 {width: 50%;}
    .col-7 {width: 58.33%;}
    .col-8 {width: 66.66%;}
    .col-9 {width: 75%;}
    .col-10 {width: 83.33%;}
    .col-11 {width: 91.66%;}
    .col-12 {width: 100%;}
}
```

### Thêm các Breakpoint khác
Bạn có thể thêm nhiều breakpoint theo như ý của bạn. Chúng ta sẽ chèn một breakpoint giữa máy tính bảng và điện thoại di động.
Ta làm điều đó bằng cách thêm một Media Query khác (600px) và tập hợp các class mới cho các thiết bị có kích thước lớn hơn 600px (nhưng nhỏ hơn 768px):

> **CSS code**
> 
> *Lưu ý: hai nhóm class của breakpoint gần như giống nhau, sự khác biệt duy nhất là tên class (col- và col-s-):*
```
/* For mobile phones: */
[class*="col-"] {
    width: 100%;
}
@media only screen and (min-width: 600px) {
    /* For tablets: */
    .col-s-1 {width: 8.33%;}
    .col-s-2 {width: 16.66%;}
    .col-s-3 {width: 25%;}
    .col-s-4 {width: 33.33%;}
    .col-s-5 {width: 41.66%;}
    .col-s-6 {width: 50%;}
    .col-s-7 {width: 58.33%;}
    .col-s-8 {width: 66.66%;}
    .col-s-9 {width: 75%;}
    .col-s-10 {width: 83.33%;}
    .col-s-11 {width: 91.66%;}
    .col-s-12 {width: 100%;}
}
@media only screen and (min-width: 768px) {
    /* For desktop: */
    .col-1 {width: 8.33%;}
    .col-2 {width: 16.66%;}
    .col-3 {width: 25%;}
    .col-4 {width: 33.33%;}
    .col-5 {width: 41.66%;}
    .col-6 {width: 50%;}
    .col-7 {width: 58.33%;}
    .col-8 {width: 66.66%;}
    .col-9 {width: 75%;}
    .col-10 {width: 83.33%;}
    .col-11 {width: 91.66%;}
    .col-12 {width: 100%;}
}
```
Đoạn CSS trên trông có vẻ hơi thừa thải vì ta có hai nhóm có các class gần giống nhau. Nhưng hãy để ý rằng chúng ta đang định nghĩa cho mỗi breakpoint có các class riêng biệt, chúng sẽ thật sự rất hữu ích nếu ta sử dụng 1 cách linh hoạt. Xem ví dụ dưới đây để thấy rõ hơn.

> **HTML code**
```
<div class="row">
  <div class="col-3 col-s-3">...</div>
  <div class="col-6 col-s-9">...</div>
  <div class="col-3 col-s-12">...</div>
</div>
```
Ở đoạn HTML trên ta thấy:
**Với desktop:** Phần thứ nhất và phần thứ 3 của trang web sẽ có độ rộng là 3 cột (tương ứng class `col-3`) cho mỗi phần, phần còn lại ở giữa sẽ là 6 cột (tương ứng class `col-6`), điều này đương nhiên là phù hợp với desktop.

**Với tablets:** Ở đây, ta sẽ thấy sự hữu ích của breakpoint. Khi ở thiết bị có chiều rộng nhỏ hơn 768px nhưng lớn hơn 600px, phần thứ nhất vẫn là 3 cột (tương ứng class `col-s-3`), tuy nhiên ta sẽ để phần thứ 2 là 9 cột (tương ứng class `col-s-9`) và phần thứ 3 của trang web là 12 cột (tương ứng class `col-s-12`). Vì màn hình tablets đã không còn lớn như desktop nữa, nên việc bố trí các khu vực trên trang web sẽ phải thay đổi để phù hợp với kích thước cũng như đáp ứng cho người dùng. 

Các bạn có thể xem kết quả ở [đây](https://www.w3schools.com/css/tryit.asp?filename=tryresponsive_col-s) để thấy rõ hơn.
> *Lưu ý: Điều chỉnh  kích thước độ rộng của trình duyệt để thấy sự thay đổi.*

### Các breakpoint thông dụng hiện nay
Có rất nhiều màn hình và thiết bị với chiều cao và chiều rộng khác nhau nên khó có thể tạo ra một breakpoint chính xác cho mỗi thiết bị. Tuy nhiên, đơn giản nhất thì sẽ có các breakpoint thông dụng sau đây:

>**CSS code**
```
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {...} 

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {...} 

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {...} 

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {...} 

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {...}
```

### Một số ví dụ về sử dụng Media Queries
Một cách sử dụng phổ biến của các Media Queries là ẩn các phần tử trên các kích thước màn hình khác nhau. Ví dụ điển hình là ẩn các banner quảng cáo trên các thiết bị tablet, mobile chẳng hạn. Vì các banner này sẽ chiếm 1 phần lớn trang web mà trên mobile thì rất cần không gian trống để hiển thị nội dung.

>**CSS code**
```
/* If the screen size is 600px wide or less, hide the element */
@media only screen and (max-width: 600px) {
  div.example {
    display: none;
  }
}
```

Hoặc có thể thay đổi kích thước font chữ trên trang web tương ứng với từng kích thước màn hình khác nhau chẳng hạn.

>**CSS code**

```
/* If the screen size is 601px or more, set the font-size of <div> to 80px */
@media only screen and (min-width: 601px) {
  div.example {
    font-size: 80px;
  }
}

/* If the screen size is 600px or less, set the font-size of <div> to 30px */
@media only screen and (max-width: 600px) {
  div.example {
    font-size: 30px;
  }
}
```

Và còn rất nhiều cách áp dụng Media Queries khi làm responsive nữa, tùy thuộc vào yêu cầu của từng trang web mà ta sẽ áp dụng cho phù hợp.

## Tổng kết
Như vậy là mình đã cùng các bạn tìm hiểu từ căn bản đến nâng cao về Responsive Web Design, tìm hiểu về RWD là gì, các định nghĩa xung quanh về RWD. Hy vọng là có thể giúp các bạn hiểu được RWD hoạt động như thế nào và cách thức áp dụng nó vào 1 trang web sao cho hợp lý, khoa học nhất. Mình xin kết thúc series bài viết này ở đây. Xin cảm ơn các bạn đã quan tâm theo dõi. Xin chào và hẹn gặp lại ở những bài viết kế tiếp.