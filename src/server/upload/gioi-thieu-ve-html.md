HTML là ngôn ngữ dùng để mô tả một trang web.
HTML viết tắt của từ Hyper Text Markup Language.
HTML không phải là ngôn ngữ lập trình, html là ngôn ngữ đánh dấu (markup language), ngôn ngữ đánh dấu là một nhóm các thẻ đánh dấu (các tag), HTML sử dụng các thẻ này để mô tả trang web.
Sự sắp xếp chiều dọc của thẻ block trong HTML
Khi sử dụng các thẻ block, trình duyệt sẽ sắp xếp các thẻ theo chiều dọc, mỗi thẻ sẽ chiếm vùng không gian nằm ngang từ trên xuống theo thứ tự sắp xếp trong trang HTML/XHTML, thẻ nào code trước sẽ nằm trên, các thẻ code sau sẽ nằm bên dưới.

Xem ví dụ sau đây để thấy được trình duyệt sắp xếp các thẻ theo chiều ngang như thế nào:

HTML viết
<h1>Tiêu đề 01</h1>

<ul>
<li><a href="#">Link 01</a></li>
<li><a href="#">Link 02</a></li>
<li><a href="#">Link 03</a></li>
<li><a href="#">Link 04</a></li>
<li><a href="#">Link 05</a></li>
</ul>

<div>Nội dung chính</div>

<div>Nội dung phụ</div>

<div>
<p>Tên công ty</p>
<p>Địa chỉ</p>
</div>

Hiển thị trình duyệt:
cấc trúc thẻ layout

Phân tích vị trí của các thẻ:
cấc trúc thẻ layout

Ta thấy các thẻ block đều chiếm vùng không gian nằm ngang, chúng ta có thể sắp xếp lại vị trí của các thẻ block bằng cách sử dụng các thuộc tính css.

Sự sắp xếp chiều ngang của thẻ inline trong HTML
Khi sử dụng các thẻ inline, trình duyệt sẽ sắp xếp các thẻ liền kề nhau theo chiều ngang, thẻ nào code trước xuất hiện trước, thẻ nào code sau xuất hiện sau.

Xem ví dụ sau đây để thấy được trình duyệt sắp xếp các thẻ inline như thế nào:

HTML viết
<a href="#">Thẻ a</a>
<span>thẻ span</span>
<em>thẻ em</em>
<strong>thẻ strong</strong>

Hiển thị trình duyệt:
cấc trúc thẻ inline
Máy sấy bát
Tới đây chắc các bạn đã hiểu nhiệm vụ của HTML/XHTML dùng để làm gì, đối với các thẻ block trình duyệt sẽ sắp xếp nó theo chiều dọc, đối với các thẻ inline trình duyệt sẽ sắp xếp theo chiều ngang, nếu muốn hiểu rõ hơn các bạn có thể tham khảo thêm các vùng không gian HTML

Nhiệm vụ của trình duyệt (Firefox, Internet Explorer, Safari, Opera, Chrome,...) là đọc văn bản HTML và hiển thị chúng như chúng ta thấy, tuy nhiên các trình duyệt không hiển thị các thẻ HTML (các tag), nhưng lại sử dụng các thẻ để giải thích nội dung cho trang web.