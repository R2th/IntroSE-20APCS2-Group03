Chào cả nhà, nối tiếp bài viết từ phần một mình đã trình bày qua một số đặc tính mới của HTML5.1 rồi, và bây giờ tỏng bài viết phần 2 này mình xin trình bày nốt các đặc tính mới còn lại để hoàn thiện 2 phần của chủ đề "Những điểm mới của HTML 5.1" mà mình đã tìm hiểu này nhé:

## Lồng thẻ header và footer
HTML5.1 cho phép lồng thẻ header và footer trong thẻ header và footer khác
Nhưng 2 thẻ header/footer lồng nhau không được là cha con trực tiếp của nhau và chúng cùng được bọc bởi 1 thẻ có ngữ nghĩa (section, article, aside)
So với HTML5: HTML5 không cho phép lồng thẻ header/footer vào thẻ header/footer khác
Ví dụ:
```
section
  //- thẻ header cha được bọc bởi 1 thẻ section
  header
    article 
      //- thẻ header con được bọc bới 1 thẻ article
      header
```

## Sử dụng width=0 với ảnh
Trình duyệt hỗ trợ: chrome, firefox, safari, edge, IE
Cho phép thêm thuộc tính width="0" vào ảnh, dùng khi bạn không muốn ảnh được hiển thị
So với HTML5: HTML5 không hỗ trợ thuộc tính width="0"
Ví dụ:
- File Pug
```
// thẻ img với ảnh
img(src="http://static.tvtropes.org/pmwiki/pub/images/tokyo_ghoul_5787.jpg", alt="")

// thẻ img thêm thuộc tính width="0"
img(src="http://static.tvtropes.org/pmwiki/pub/images/tokyo_ghoul_5787.jpg", width="0", alt="")
```
- File SCSS
```
img {
  height: 200px;
}
```

## Phân tách ngữ cảnh trình duyệt để tránh lừa đảo
Sử dụng những link truyền thống có thể khiến trang web dễ bị tấn công lừa đảo
HTML5.1 đưa ra thuộc tính rel="noopener" dùng để phân chia ngữ cảnh trình duyệt, từ đó bảo vệ trang web tốt hơn.
Khi không sử dụng thuộc tính rel="noopener" cho những link có target="blank" thì trang mới mở ra có thể điều khiển trang web cũ thông qua object window.opener 
Điều này có thể bị khai thác bởi những kẻ lừa đảo, bằng cách họ chuyển hướng trang web hiện tại thành một trang web mới có nội dung giống hoàn toàn, và bổ xung thêm vài chức năng để người dùng nhập thông tin cá nhân.
So với HTML5: thuộc tính được thêm mới, bảo vệ trang web tốt hơn
Ví dụ:
```
<a href="other.html" target="_blank">Click vào link này</a>
```
Trang other.html (liên kết dưới thẻ a) được thêm 1 dòng code sau:
- File JS
```
if (window.opener) {
  opener.location = 'luadao.html';
}
```
Chúng ta có thể thấy đoạn code ở trên sử dụng object window.opener để chuyển hướng được trang web ban đầu
Để phòng tránh trường hợp trên, HTML5.1 đưa thêm một thuộc tính rel="noopener" vào thẻ a, link. Điều này sẽ khiến cho window.opener = null ở trang web mới.
```
<a href="#!" rel="noopener"> Click on this link </a> 
```

## Tạo một thẻ option rỗng
Trình duyệt hỗ trợ: chrome, firefox, edge, IE
Option là thẻ con của các thẻ select, optgroup, datalist
HTML5.1 cho phép tạo một option rỗng
Ví dụ:
- File Pug
```
select
  option
  option value 1
  option value 2
  option value 3
```
- File SCSS
```
select {
  width: 250px;
  height: 40px;
}
```

## Sử dụng thẻ figcaption linh hoạt hơn
Trình duyệt hỗ trợ: tất cả trình duyệt
Thẻ figcation thường được đặt trong thẻ figure và chứa tiêu đề, tên, chú thích của một hình ảnh, bản đồ, tranh ảnh
Từ HTML5.1 thì thẻ figcaption có thể nằm ở bất cứ đâu trong thẻ figure
So với HTML5: HTML5 yêu cầu thẻ figcaption phải là first child hoặc last child của thẻ figure 
Ví dụ: Nếu muốn sử dụng nhiều thẻ figcaption đi với nhiều ảnh, ta phải đưa mỗi cặp của chúng vào 1 thẻ figure khác nhau Nhưng với HTML5.1 ta chỉ cần 1 thẻ figure cho tất cả.
Ví dụ:
- File Pug
```
//- HTML5
figure
  figure
    img
    figcaption
  figure
    img
    figcation

//- HTML5.1
figure
  img(src="http://vnreview.vn/image/11/06/81/1106810.jpg?t=1400131660645", alt="")
  figcaption This is an image
  img(src="http://vnreview.vn/image/11/06/81/1106810.jpg?t=1400131660645", alt="")
  figcaption This is another image
```
- File SCSS
```
figure {
  margin-bottom: 20px;
}
figcation {
  font-size: 20px
}
img {
  width: 100%;
}
```

## Sắp xếp các thẻ thead, tfoot
Trình duyệt hỗ trợ: tất cả trình duyệt
HTML5.1 xắp xếp lại các thể thead, tfoot cho đúng với thực tế
Tức là thẻ thead phải được đưa lên đầu, còn thẻ tfoot được đưa xuống cuối bảng
So với HTML5: HTML5 không tự xắp xếp các thẻ thead, tfoot, tbody
Ví dụ:
- File Pug
```
table 
  tfoot
    tr
      td thẻ tfoot
  tbody
    tr
      td thẻ tbody
  thead
    tr
      td thẻ thead
//- ta có thể thấy trình duyệt tự xắp xếp cho thẻ thead lên đầu và thẻ tfoot xuống dưới cùng của bảng (table)
```
- File SCSS
```
td {
  font-size: 20px;
  line-height: 30px;
}
```

## Thêm tính năng oncopy, oncut, onpast
Trình duyệt hỗ trợ: chrome, firefox, safari
HTML5.1 bổ xung các tính năng bắt sự kiện oncopy, oncut, onpaste
So với HTML5: Tính năng được thêm mới.
Ví dụ:
- File Pug
```
//- ví dụ oncopy
input(type="text", value="Copy this text", oncopy="alert('bạn vừa copy')")
//- ví dụ oncut 
input(type="text", value="Cut this text", oncut="alert('bạn vừa cut')")
//- ví dụ onpaste
input(type="text", placeholder="Paste in this field", onpaste="alert('bạn vừa paste')")
```
- File SCSS
```
input {
  width: 100%;
  height: 40px;
  margin-bottom: 15px;
  font-size: 20px;
  padding: 0 20px;
}
```

Vậy là mình đã trình bày xong phần 2 , nó cũng là phần cuối kế thúc hai phần của chủ đề về HTML5.1 mà mfinh muốn chia sẻ với các bạn. Cảm ơn đã theo dõi và ủng hộ mình nhé! Xin chào và hẹn gặp lại.