- Trong bài này, chúng tôi muốn chia sẻ với bạn một số mẹo hữu ích , những chú ý khi làm css và các phương pháp hay nhất được giới thiệu bởi cộng đồng CSS. Một số phù hợp hơn cho người mới bắt đầu, và một số cho người lâu năm, nhưng chúng tôi hy vọng mọi người sẽ tìm thấy một thủ thuật tuyệt vời mà mình không biết.


## Cẩn Thận Với Margin Collapse

- Không giống như hầu hết các thuộc tính khác, các vertical margins collapse khi  gặp nhau. Điều này có nghĩa là margin bottom của một phần tử chạm vào margin top của phần tử khác, chỉ lấy phần lớn hơn của hai phần tử trên. Dưới đây là một ví dụ đơn giản:


```HTML
<div class="square red"></div>
<div class="square blue"></div>
```

```CSS
.square {
    width: 80px;
    height: 80px;
}

.red {
    background-color: #F44336;
    margin-bottom: 40px;
}

.blue {
    background-color: #2196F3;
    margin-top: 30px;
}
```

- và ta được kết quả như hình ảnh bên dưới:

![](https://images.viblo.asia/8bdd6f00-45a6-4af8-b466-2e741fd72956.png)

- Thay vì 70px giữa hình vuông màu đỏ và màu xanh, chúng ta chỉ có 40px, margin của hình vuông màu xanh dương không được xem xét. Có nhiều cách để giải quyết vấn đề này, nhưng tốt hơn là chỉ cần làm việc với nó là sử dụng margin theo một hướng, tốt nhất là margin-bottom.


## Sử dụng Flexbox cho Layout

- Flexbox tồn tại bởi lí do :  Float và inline-block là những công cụ style cho văn bản không phải cho web. Mặt khác, Flexbox được thiết kế đặc biệt để giúp dễ dàng bố cục layout một cách chính xác nhất

- Tập hợp các thuộc tính đi kèm với flexbox cung cấp cho các web dev rất nhiều tính linh hoạt và một khi bạn quen với chúng, việc reponsive layout thật dễ dàng như ăn một miếng bánh. Trình duyệt hỗ trợ flexbox gần như hoàn hảo, vì vậy không có bất cứ điều gì ngăn cản bạn dùng flexbox 

```
.container {
    display: flex;
    /* Don't forget to add prefixes for Safari */
    display: -webkit-flex;
}
```

## Sử dụng CSS Reset

- Mặc dù tình hình đã được cải thiện đáng kể qua nhiều năm, vẫn còn nhiều biến thể trong cách các trình duyệt khác nhau hoạt động. Cách tốt nhất để giải quyết vấn đề này là áp dụng đặt lại CSS đặt giá trị mặc định chung cho tất cả các element, cho phép bạn bắt đầu làm việc trên một style sheet sạch sẽ mang lại kết quả tương tự ở mọi nơi, mọi trình duyệt 

- Có những thư viện như [normalize.css](http://necolas.github.io/normalize.css/), [minireset](https://jgthms.com/minireset.css/) và [ress](https://github.com/filipelinhares/ress) thực hiện điều này rất tốt.  Nó điều chỉnh tất cả những mâu thuẫn trong trình duyệt . Nếu bạn không muốn sử dụng thư viện, bạn có thể tự mình đặt lại CSS cơ bản bằng các kiểu sau:

```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

Điều này có vẻ hơi khó khăn, nhưng vô hiệu hóa margin và paddings thực sự làm cho việc đặt ra các element dễ dàng hơn nhiều vì không có khoảng cách mặc định giữa chúng. **box-sizing: border-box ;**  thuộc tính này là một mặc định tốt, mà chúng ta sẽ nói về nhiều hơn trong mẹo tiếp theo của tôi.


## Border-box cho tất cả

- Hầu hết người mới bắt đầu không biết về thuộc tính **box-sizing** nhưng thực sự nó khá quan trọng. Cách tốt nhất để hiểu những gì về nó làm là nhìn vào 2 giá trị của nó dưới đây:

  - **Content-box (default)** - Khi chúng ta đặt width / height cho một element đó chỉ là kích thước cho nội dung của nó. Bao gồm tất cả các padding và border. Ví dụ. <div> có width là 100px và padding 10px, element của chúng ta sẽ chiếm 120px (100 + 2 * 10).
  
  - **Border-box** - Padding và border được bao gồm trong width / height. <Div> có width: 100px; và box-sizing: border-box; sẽ có width là 100px bất kể padding hoặc border có giá trị nào đi nữa.

- Việc đặt border-box cho tất cả các element giúp việc style cho mọi thứ trở nên dễ dàng hơn nhiều.



## Border cho table

- Table trong html hầu như không thể reponsive và rất khó khăn để style . Ví dụ: nếu bạn muốn thêm các border vào bảng và các ô của nó , có thể bạn sẽ kết thúc với hình ảnh dưới đây 

![](https://images.viblo.asia/5b941802-68ff-49fd-a783-518bcd2f20d8.png)

```
<table>
  <thead>
    <tr>
      <th >Title</th>
      <th >Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://tutorialzine.com/2016/07/take-a-selfie-with-js/" target="_blank">Take a Selfie With JavaScript</a></td>
      <td>A quick tutorial that covers a pure-JavaScript way to take photos directly in the browser using various native APIs and interesting JS techniques.</td>
    </tr>
    <tr>
      <td><a href="https://tutorialzine.com/2016/08/20-awesome-php-libraries-for-summer-2016/" target="_blank">20 Awesome PHP Libraries</a></td>
      <td>A handcrafted collection of 20 open-source libraries containing some of the most useful and top-quality PHP resources.</td>
    </tr>
  </tbody>
</table>
```
```
table {
    width: 600px;
    border: 1px solid #505050;
    margin-bottom: 15px;
    color:#505050;
}

td{
    border: 1px solid #505050;
    padding: 10px;
}
```

- Như bạn có thể thấy, có khá nhiều border lặp lại ở khắp mọi nơi và nó không có vẻ tốt. Đây là cách nhanh chóng, không có hack để xóa tất cả các border: chỉ cần thêm **border-collapse: collapse;** vào table như đoạn code dưới đây


```
table {
    width: 600px;
    border: 1px solid #505050;
    margin-bottom: 15px;
    color: #505050;
    border-collapse: collapse;   // line add  border-collapse: collapse;
}

td{
    border: 1px solid #505050;
    padding: 10px;
}
```
và chúng ta được hình ảnh  

![](https://images.viblo.asia/7edf55d0-86e3-4ec4-a986-c8acc8241e14.png)

Và với cách này sẽ tốt hơn nhiều so với  cách bên trên đúng không?



##  Viết comment sao cho tốt trong css

- CSS có thể không phải là ngôn ngữ lập trình nhưng code của nó vẫn cần phải được ghi lại. Một số comment đơn giản là tất cả những gì bạn cần tổ chức style sheet và làm cho nó dễ tiếp cận hơn tới đồng nghiệp của bạn hoặc bản thân bạn ở tương lai. Khi xem lại code bạn và đồng nghiệp của bạn biết nó ở đâu và nó dùng để làm gì?

-  Đối với các phần lớn hơn của CSS chẳng hạn như component chính hoặc media-queries , hãy sử dụng comment được cách điệu và để lại một vài dòng như sau:

```
/*---------------
    #Header
---------------*/
header { }

header nav { }

/*---------------
    #Slideshow
---------------*/
.slideshow { }
```

- Những phần chi tiết và các component it quan trọng, hãy comment bằng 1 dòng như sau:

```
/*   Footer Buttons   */
.footer button { }

.footer button:hover { }

```

Ngoài ra, hãy nhớ rằng CSS không có 1 dòng  **// comment** , vì vậy khi comment một điều gì đó, bạn vẫn cần chú ý sử dụng cú pháp **/ / syntax.**

```
/*  Do  */
p {
    padding: 15px;
    /*border: 1px solid #222;*/
}

/*  Don't  */
p {
    padding: 15px;
    // border: 1px solid #222;  
}
```



## Mọi người đều thích sử dụng kebab-case

- Tên class và id phải được viết bằng dấu nối (-) khi chúng chứa nhiều hơn một từ. CSS không phân biệt chữ hoa chữ thường nên camelCase không phải là một lựa chọn tốt. Một thời gian dài trước đây, dấu gạch dưới (_) được sử dụng nhưng không được hỗ trợ mà dấu gạch ngang (-) được đặt là quy ước mặc định.

```
/*  Do     */
.footer-column-left { }

/*  Don't  */
.footerColumnLeft { }

.footer_column_left { }

```

Khi nói đến đặt tên, bạn cũng có thể xem xét [BEM](https://en.bem.info/). Bạn có thể đọc thêm về nó trong bài viết [CSS-Tricks](https://css-tricks.com/bem-101/) tuyệt vời này. Và [bài này](https://viblo.asia/p/tim-hieu-ve-bem-trong-15-phut-924lJOk65PM) 



## Kết luận

- Bài này mình chỉ chia sẻ 1 chút về những mẹo hay và  những chú ý khi chúng ta làm css. Sẽ còn rất nhiều mẹo hay và những chú ý mình sẽ chia sẻ ở bài viết tiếp theo.