Nếu bạn là một php developer thì chắc chắn bạn cũng xa lạ gì với thuậ ngữ CSS (Cascading Style Sheets). Css là một trong những thành phần quan trọng cấu tạo lên trang web của bạn. Một vài công dụng cơ bản của CSS có thể được liệt kê ra như sau

- CSS+ HTML + Javascript tạo lên một ứng dụng website tuyệt với cho chúng ta.
- CSS giúp các thẻ html hiển thị màu sắc sặc sỡ hơn, định dạng lại html, khung, các media
- CSS giúp chúng ta tiết kiệm rất nhiều công sức trong việc xây dựng giao diện, chỉ một đoạn mã nhỏ nó sẽ làm cho ứng dụng của chúng ta lung linh, chuyên nghiệp.
- CSS sẽ được lưu cùng chung với thẻ html hoặc sẽ lưu ra một file riêng giúp chúng ta quản lý, Maintaince đơn giản hơn.

Trong bài viết này, tôi xin giới thiệu cho bạn đọc, những người mới tìm hiểu đến CSS, một số mẹo hay giúp bạn học tập và làm việc với CSS đơn giản hơn.

**1. Sử dụng reset.css**

Khi trang web bắt đầu rendering Css style, thì mỗi trình duyệt như Chorome, FireFox, ... sẽ có những cách khác nhau để xử lý chúng. _reset.css_ sẽ reset tất cả những style căn bản, vì thế bạn có thể làm việc với stylesheet trắng thực sự. Dưới đây là một số reset.css framework phổ biến. 
[Yahoo reset CSS](https://yuilibrary.com/yui/docs/cssreset/), [Eric Meyer’s CSS Reset](http://meyerweb.com/eric/thoughts/2007/05/01/reset-reloaded/)

**2. Sử dụng Shorthand CSS**

Shorthand Css cung cấp cho bạn cách ngắn hơn để viết CSS, và quan trọng hơn tất cả là nó giúp code ngắn gon và dễ hiểu. Thay vì bạn code css kiểu như

```
.header {
      background-color: #fff;
      background-image: url(image.gif);
      background-repeat: no-repeat;
      background-position: top left; 
 }
```
thì hãy sử dụng:

```
.header {
      background: #fff url(image.gif) no-repeat top left
}
```

Xem thêm tại [Css Shorthand](http://www.sitepoint.com/article/introduction-css-shorthand/)

**3. Hiểu rõ về _class_ và __id**

Hai cách selector này thường gây nhầm lẫn cho người mới bắt đấu. Trong CSS, class được đại diện bới dấu '.' còn id được đại diện bới dấu '#'. Trên mỗi trang web id là duy nhất, không được lặp lại. Trái ngược với điều đó, class có thể tái xử dung nhiều lần.
Xem thêm tại [Class and Id Selector](http://www.htmldog.com/guides/css/intermediate/classid/)

Sử dụng Id cho các phần tử chỉ được sử dụng một lần, chẳng hạn như đầu trang và cuối trang của bạn.

Sử dụng class cho các phần tử xuất hiện nhiều lần trên một trang, nhưng cần phải tạo được kiểu khác so với thuộc tính cơ bản của HTML.

Chú ý răng, khi bản cần phải chỉnh sửa một site mà không phải do bạn code ra. Hãy thận trong khi sửa tên id hoặc là tên class của một phần tử, vì rất có thể id hay class đó còn được gọi trong js. Lời khuyên tốt nhất cho bạn là add thêm id hoặc class mới, không lên đụng vào những code đã có sẵn.

**4. Sức mạnh của <li>**
    
Khi bạn làm việc với danh sách các phần tử, thì điều đầu tiên nghĩ đến là hãy dùng thẻ <li> trong html.

Cách sử dụng như sau:

```
<ul>
         <li>ol - ordered list</li>
         <li>ul - unordered list</li>
         <li>dir - directory list</li>
         <li>menu - menu list</li>
</ul>
```

**5. Quên table đi, hãy dùng div**

Một trong những lợi ích của CSS là có thể sử dụng div để đạt được tính linh hoạt về kiểu dáng. div không giống như table, trong table nội dung bị bó hẹp trong các thẻ td. Vì thế, các bạn nên sử dụng div thay cho table để dễ dàng custom theo ý muốn.

Về cơ bản, cả 2 thẻ đều sử dụng với chung một mục đích là bao nhiều khối, nhưng cách sắp xếp các khối ấy khác nhau:

- table: Sắp xếp dễ dàng và ít lỗi, vì bản thân nó đã là một bảng nhưng lại bất tiện với những cấu trúc phức tạp.

- div: Sắp xếp phức tạp hơn, dễ bị lỗi hơn nếu không cố định kích thước nhưng trái lại là linh động hơn trong việc trình bày.

Khác nhau lơn nhất và dễ nhận thấy nhất đó là số lượng code. Khi dùng thẻ div thì dù cấu trúc lớn hay nhỏ thì cũng chỉ khác nhau thuộc tính width - height, còn với table, table càng lớn thì càng tốn nhiều code, phải định dạng từng <td>, <tr> nếu mỗi ô có style khác nhau.

**6. Css Debug tool** 

Với bất kỳ trình duyệt nào, bạn cũng có thể debug css ngay trên chính trình duyệt đó. Bằng cách sử dụng công cụ  Inspect mặc định của trình duyệt. Khi cửa sổ debug hiện ra, bạn có thể tùy chỉnh thêm sửa xóa thuộc tính css của một phần tử bất kỳ. 

Màn hình debug tool như sau:

![](https://images.viblo.asia/eb76de63-f71f-4d86-a5d1-30814f46b7fc.png)

**7. Avoid Superfluous Selectors**

Đôi khi khai báo css của bạn có thể được đơn giản hóa hơn rất nhiều, Xem ví dụ sau:

```
ul li { ... }

ol li { ... }

table tr td { ... }
```

Thay vì sử dụng cách này thì hãy khai báo như sau:

```
li { ... }

td { ... }
```

Lý do ở đây là: thẻ li chỉ có thể được sử dụng duy nhất trong thẻ <ul> hoặc thẻ <ol>. còn thẻ <td> thì cũng chỉ được sử dụng trong thẻ <tr>. Do đó khi định nghĩa css cho thẻ li và td, chúng ta không cần thiết phải khai bảo ul và tr
    
**8. Tìm hiểu về !important**

Nếu bạn định nghĩa một thuộc tính css kèm theo !important. Thì giá trị css đó sẽ được xác nhận, bất kể trước đó bạn có khai báo bao nhiêu thuộc tính cho nó đi nữa. 

```
.page { background-color:blue !important; background-color:red;}
```

Trong ví dụ trên, chúng ta đều khai báo background-color là blue và red. Nhưng trên giao diện sẽ hiển thì màu là blue, vì thuộc tính blue được gắn thêm !important, nên nó sẽ ghi đè lên thuộc tính red.

**9. Replace Text with Image**

Thay vì sử dụng text _title_ trong thẻ h1 thì hãy sử dụng image như sau:

h1 {
text-indent:-9999px;
background:url("title.jpg") no-repeat;
width:100px;
height:50px;
}

**10.  Hiểu rõ CSS Positioning**

Position trong css cũng vô cùng quan trọng, vì vậy hãy nắm rõ về position. Tham khảo trong bài viết [Css position](http://www.barelyfitz.com/screencast/html-training/css/positioning/)

**11. CSS @import vs <link>**

Có 2 cách để gọi một file css là @import và link. Sự khác nhau cơ bản giữ @import và link có thể được hiểu như sau:

- <link>: Là một phương pháp đầu tiền để đửa một file css vào trong trang web của bạn. Được thêm vào header của html như sau:

```
<link href="styles.css" rel="stylesheet">
```

- @import : Cho phép bạn import 1 file css này vào file css khác. điều này khác với kiểu <link>. Nếu bạn đưa import vào đầu trang html.

```
<style type="text/css">@import url("styles.css");</style>
```