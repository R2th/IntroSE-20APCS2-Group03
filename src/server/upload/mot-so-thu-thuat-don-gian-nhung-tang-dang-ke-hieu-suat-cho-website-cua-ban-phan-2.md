Chúng ta cùng đến với một vài mẹo vặt nhỏ tiếp theo để tăng hiệu suất cho website của bạn

# I, Đối với HTML
> Luôn luôn tải CSS sớm nhất có thể, tải JS muộn nhất có thể

Bạn thử nghĩ xem mình có thói quen nhét toàn bộ các thẻ `<link>` và thẻ `<script>` trên `<head>` không ?
    
Rất rất nhiều website mà mình biết thường hay code như thế này, và điều này làm ảnh hưởng rất lớn tới hiệu năng của website.

```html
<head>
    .....
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
	<link rel="stylesheet" type="text/css" href="css/owl.transitions.css"/>
	<link rel="stylesheet" type="text/css" href="css/owl.carousel.css"/>
	<link rel="stylesheet" type="text/css" href="css/animate.css"/>
	<link rel="stylesheet" type="text/css" href="css/main.css"/>


 	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/ajaxchimp.js"></script>

 	<script type="text/javascript" src="js/owl.carousel.min.js"></script>
	<script type="text/javascript" src="js/wow.js"></script>
	<script type="text/javascript" src="js/parallax.js"></script>
	<script type="text/javascript" src="js/nicescroll.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/scrollTo.js"></script>
</head>
```

Đối với các thẻ <link>, việc các bạn để trên <head> là điều bắt buộc, nhưng đối với thể `<script>` thì không ! Việc để thẻ `<script>` ở trên `<head>` sẽ dẫn tới vấn đề [Render-Blocking Resources](https://developers.google.com/web/tools/lighthouse/audits/blocking-resources). Đây là một vấn đề không nhỏ ảnh hưởng tới hiệu năng của Website.
    
Vì sao lại như vậy ? Khi đọc 1 file HTML, browser sẽ đọc lần lượt từng dòng, đến dòng có thẻ `<link>` nó sẽ download file CSS được link ở đó, tương tự với thẻ `<script>`, file JS (nếu có) được đính kèm theo thẻ sẽ được tải xuống.
    
Tuy nhiên, đối với file JS, nó sẽ được thực thi ngay lập tức (mình sẽ đề cập cách để thẻ `<script>` trên `<head>` mà vẫn tránh được việc thực thi JS ngay lập tức ở sau). Điều này dẫn đến việc người dùng sẽ phải đợi browser tải các file JS về, thực thi toàn bộ code JS rồi mới tiếp tục đọc đến các dòng HTML sau và hiển thị cho người dùng => Tốc độ hiển thị trang web cho người dùng rất chậm.
    
# II, Đối với CSS:

## 1, Chỉ viết, thêm những gì cần thiết:

Ok, điều này rất dễ hiểu đúng không nào ? Tuy nhiên thì không phải ai cũng làm được đâu nhé !

Cuộc chiến CSS là một điều không hề đơn giản. Đôi khi bạn của ta chỉnh sửa chỗ này, ta lại vô tình ghi đè lên và thấy nó không hoạt động, vậy là ta sẽ đi spam 1 loạt chuỗi `!important`, rồi cũng chẳng tìm chỗ code ông bạn kia viết mà thảo luận để xóa đi. Vậy là nó vô tình gây nên code thừa, nhưng người dùng thì vẫn phải tải nó về => Giảm hiệu suất.

Và còn đó những dòng import thư viện 1 cách không kiểm soát, cứ add tạm Bootstrap vào đã rồi làm gì làm sau, hay như một vài animation đơn giản có thể tự làm với CSS3, ta lại đi kiếm 1 cái thư viện cỡ bự nhét vào. Điều này làm trang web của chúng ta bị chậm đi một cách đáng kể.

## 2, Above-the-fold loading:

Cái này khó hiểu hơn 1 chút này, đầu tiên khi load 1 trang web, những gì user nhìn thấy đầu tiên mà chưa cần scroll xuống dưới, đó được gọi là Above-the-fold (ATF). Khi tải một trang web, ta mong muốn user được nhìn thấy ATF thật nhanh chóng với đầy đủ CSS, nhưng phần còn lại của trang web thì không cần thiết phải ngay lập tức giống như ATF.

Vậy nên, để tăng tốc độ tải cho ATF, ta hãy cắt bớt CSS dành cho phần nằm ngoài ATF lại phía sau, ưu tiên tải CSS cho ATF trước. 

Để làm được điều này thì đầu tiên hãy thay đổi thứ tự các file được sắp xếp theo thẻ <link> và có thể dùng JS để tải CSS cho những phần nằm ngoài ATF, ví dụ như đoạn code sau:

```javascript
const loadStyleSheet = src => {
    if(document.createStyleSheet) {
        document.createStyleSheet(src)
    } else {
        const stylesheet = document.createElement('link');
        stylesheet.href = src;
        stylesheet.type = 'text/css';
        stylesheet.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    }
}

window.onload = () => {
    loadStyleSheet('./style.css');
}
```

## 3, Sử dụng media attribute:

Bạn có bao giờ băn khoăn về việc có những file CSS mình chỉ cần sử dụng với màn hình cỡ lớn, còn với màn hình nhỏ như mobile thì không cần mà không biết loại bỏ như thế nào không ?

Đây là một giải pháp siêu đơn giản dành cho bạn - sử dụng media attribute. Và đặc biệt hơn, media attribute này không chỉ sử dụng cho CSS, bạn có thể thêm nó vào rất nhiều tag khác trên HTML, nó sẽ lọc xem với màn hình như thế nào thì hiển thị nội dung này (nó có thể check loại màn hình, kích cỡ, độ phân giải, khả năng hiển thị màu,...). Đây là một attribute rất tuyệt trong HTML

```html
<link rel="stylesheet" type="text/css" href="print.css" media="print and (resolution:300dpi)">
<area shape="rect" coords="0,0,82,126" alt="Sun" href="sun.htm" media="screen and (min-color-index:256)">
```

## 4, Less specificity:

Đây là một điều rất khó làm khi trong team có cuộc chiến CSS. Tuy nhiên nếu kiểm soát tốt và làm được điều này, website của bạn sẽ ổn hơn rất nhiều.

Hãy thử xem lại code của mình có những đoạn như thế này không nhé:

```css
#slider .caption .hero .app_store_btn .play_icon .android_icon {
    margin: 0;
}
```

Đối với những layout phức tạp, việc chỉ rõ tag nào mà CSS ta viết cần can thiệp vào trở nên rất khó khăn. Tuy nhiên hãy hạn chế tối đa việc bắt browser tìm qua quá nhiều tag con, hãy đặt class, id sao cho phù hợp để ta chỉ cần viết kiểu như này:

```css
.android_icon {
    margin: 0;
}
```

hoặc ít ra

```css
.play_icon .android_icon {
    margin: 0;
}
```

Chỉ vậy thôi, đừng để browser phải tìm lần lượt lần lượt các tag con, như thế mất rất nhiều thời gian để nó render ra nội dung cho user.

# III, Lời kết:
Trong bài viết này mình mới đề cập đến HTML và CSS, bài viết sau mình muốn dành riêng cho JS bởi vì JS có rất nhiều vấn đề nhỏ cần nói về hiệu suất.

-----
## Tài liệu tham khảo:

1. https://developers.google.com/web/tools/lighthouse/
2. https://www.w3schools.com/tags/att_media.asp