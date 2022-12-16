Với sự ra đời của CSS Grid giúp chúng ta xây dựng layout đơn giản hơn rất nhiều so với float, flex. Với những layout phức tạp chỉ cần Grid là mọi việc sẽ trở nên vô cùng đơn giản hơn bao giờ hết. Hiện tại Grid chỉ đưa ra bản thử nghiệm nên sẽ còn rất nhiều hạn chế trên các version của trình duyệt. Hiện tại trình duyệt **FireFox** đang làm rất tốt trong việc hiển thị layout trong quá trình debug. Thì với bài viết này mình sẽ giới thiệu 10 layout sử dụng CSS Grid để xây dựng những layout có độ phức tạp khá cao. Qua những ví dụ này các bạn sẽ thấy được sức mạnh thật sự của Grid :D

## 1. Auto Hexagonal CSS Grid Layout
![](https://images.viblo.asia/71634f07-c25e-40ef-9a53-ec29869ad0e1.jpg)

Với layout Hexagonal (giống hình tổ ong), đây là một ví dụ khá đặc trưng của grid, chưa có sự xuất hiện của Gird đây là layout ác mộng đối với Front-end, Với Grid chúng ta thực hiện những mà quá khứ không làm được, xây dựng chúng nó vô cùng đơn giản chưa đến 150 dòng code. Layout được thực hiện bởi ([@Kseso](https://codepen.io/Kseso)) Cool :D
###
{@codepen: https://codepen.io/Kseso/pen/xqNdmO/}
###
***

## 2. Responsive Periodic Table with CSS Grids
![](https://images.viblo.asia/fc1278fd-07ad-4226-8582-7b90486cbf63.jpg)

Dựng lên một bảng tuần hoàn các nguyên tố hóa học không thể đơn giản hơn với Grid. Chỉ với vài dòng code chưa đến 150 line đã có được một bảng tuần hoàn. Tạo sao không? Layout được dựng bởi ([Dudley Storey](https://codepen.io/dudleystorey)) cũng đã phản ánh được phần nào những khó khăn mà các deginer khác gấp phải :)
###
{@codepen: https://codepen.io/dudleystorey/pen/rmWMXY/}
###
***

## 3. CSS Grid Layout with @support flexbox fallback
![](https://images.viblo.asia/b2612d82-fb94-49ae-a07d-660c7b032a20.jpg)

Với thuộc tính [@support](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) giúp chúng ta kiểm tra trình duyệt có hỗ trợ grid hay không, để cấu hình phù hợp nhất. Ví dụ
```
// Nếu trình duyệt hỗ trợ grid
@supports (display: grid) {
  div {
    display: grid;
  }
}

// Nếu trình duyệt không hỗ trợ grid
@supports not (display: grid) {
  div {
    float: right;
  }
}
```
Với ví dụ về  `@support` kết hợp với grid thì giúp ứng dụng web thích ứng với mọi trình duyệt cũng như là các version cũ. Đây là layout khá phổ  biến và thông dụng nên sẽ rất hữu ích (y). Layout được thực hiện bởi ([Gustaf Holm](https://codepen.io/primalivet))
###
{@codepen: https://codepen.io/primalivet/pen/ryjKmV/}
###
***
## 4. Wim Crouwel’s Calendar (CSS Grid)
![](https://images.viblo.asia/7afc57c4-ebb7-421b-806a-2bff4877351a.jpg)

Wim Crouwel được biết đến là một **Dutch graphic designer** nổi tiếng trong việc sử dụng layout grid đầu những năm 1960. Những thiết kế của ông vẫn còn rất nhiều giá trị cho đến ngày nay, và truyền cảm hứng mạnh mẽ cho các designer khác. Đặt biệt thiết kế nỗi tiếng của ông là Calendar giờ đây đã được [Chris Droom](https://codepen.io/droom) thực hiện hóa trên website bằng grid :D
###
{@codepen: https://codepen.io/droom/pen/KmwxGj/}
###
***
## 5. CSS Grid Layout Module – Responsive Magazine Layout
![](https://images.viblo.asia/3e43f4e0-c877-4238-b979-1480cb071c6a.png)

Layout Magazine thì không cần phải nói về mức độ phổ biến của nó nữa. Trong thế giới web, sử dụng layout này khá nhiều, độ phức tạp cũng tương đối. Thì đây là ví dụ của [Heather Buchel](https://codepen.io/hbuchel) đã làm khá tốt trong việc thiết lập layout về Magazine
###
{@codepen: https://codepen.io/hbuchel/pen/qOxGzW/}
###
***
## 6. CSS Grid Layout – Blog Post Template
![](https://images.viblo.asia/8daa7741-0a0a-4211-b17f-4be0f35ec4e9.jpg)

Về layout Magazine thì phổ biến khá cao, nhưng layout Blog thì độ phổ biến của nó thì không hề thua kém. Với grid dựng layout cho những trang blog khá nhanh với vài dòng code ít ỏi :D. Ví dụ này được thực hiện bởi [Stacy](https://codepen.io/stacy) giúp các bạn hình dung rõ hơn
###
{@codepen: https://codepen.io/stacy/pen/NpbBKG/}
###
***
## 7. CSS Grid Poster
![](https://images.viblo.asia/c120a44c-4abf-40da-8402-c67be8ef9253.png)

Việc kết hợp grid với CSS3 animations sẽ tạo ra layout phức tạp với animation uyển chuyển giúp người dùng trải nghiệm website vô cùng thú vị. Qua ví dụ dựng layout poster của [jakob-e](https://codepen.io/jakob-e) chúng ta sẽ thấy sức mạnh thật sự của grid đáng sợ thế nào trong việc khẳng định là layout này chỉ có grid mới lại được tạo nên đặc trưng khá riêng.
###
{@codepen: https://codepen.io/jakob-e/pen/yOapOm/}
###
***
## 8. GRID PILE: Stacking CSS Grids for Impossible Layouts
![](https://images.viblo.asia/0bab2aef-391e-4125-adbf-6aa4a95707c8.jpg)

Layout PILE mang đến cho chúng ta một cảm giác **Holy Grail**, với phong cách 2 column trái phải bằng nhau với không clearfixes. `The future is now!` =)). Layout pile được [Morten Rand-Hendriksen](https://codepen.io/mor10) dựng nên layout không thể chê nào đâu được
###
{@codepen: https://codepen.io/mor10/pen/rzGqzr/}
###
***
## 9. CSS Grid Layout and Comics (as Explained by Barry the Cat)
![](https://images.viblo.asia/3c674c11-510f-4c42-9319-79d5e8b84d45.png)

Một phong cách truyện tranh được tái hiện trên grid. Bạn thấy sao :D. Với Grid thì mọi chuyện trở nên đơn giản hơn bao giờ hết. [Envato Tuts+](https://codepen.io/tutsplus) đã tái hiện nên câu chuyện tranh đầy thú vị. `Mind officially blown` =))
###
{@codepen: https://codepen.io/tutsplus/pen/pNgZpj/}
###
***
## 10. React & CSS Grid Image Gallery
![](https://images.viblo.asia/542bdf9d-081f-4041-8537-26251928dd6c.jpg)

Xây dựng layout photo gallery thú vị với sự kết hợp giữa react và grid tạo nên những layout ưu việt, nhìn rất cool đã được tái hiện bởi [Tobi Weinstock](https://codepen.io/tvweinstock)
###
{@codepen: https://codepen.io/tvweinstock/pen/wegZEW/}
###
***

## Wrap up
Một trong những thách thức lớn nhất của web developer là thực hiện những đoạn code sáng tạo để mang đến điều tốt đẹp nhất dành cho end-user. Có những ý tưởng sáng tạo mà designer thiết kế ra lại không tái hiện được trên trình duyệt. CSS Grid sinh ra để giải quyết những gánh nặng đó. CSS Grid giúp những biến những ý tưởng không thể thực hiện thành hiện thật mặc dù CSS Grid còn nhiều hạn chế. Mặc dù CSS Grid chỉ mới ra version thử nghiệm thôi mà đã tạo ra mindset khá lớn cho các developer đặc biệt trong dùng layout. CSS Grid rất đáng để trải nghiệm còn bạn thì sao ? Hãy comment những trải nghiệm thú vụ khi sử dụng Grid nhé :D

Tài liệu tham khảo
1. https://codepen.io/Kseso
2. https://codepen.io/dudleystorey
3. https://codepen.io/primalivet
4. https://codepen.io/droom
5. https://codepen.io/hbuchel
6. https://codepen.io/stacy
7. https://codepen.io/jakob-e
8. https://codepen.io/mor10
9. https://codepen.io/tutsplus
10. https://codepen.io/tvweinstock
11. https://developer.mozilla.org/en-US/docs/Web/CSS/@supports