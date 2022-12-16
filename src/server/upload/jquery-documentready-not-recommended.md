Chắc hẳn với các bạn dev lâu năm thì $(document).ready() không xa lạ gì. Mình sẽ không nói thêm. 

Tuy nhiên, cách viết này tiềm ẩn 1 số bug 

Nói ngắn gọn thì : 

* $(document).ready() không còn được khuyến khích sử dụng. 
* Nếu đặt code jquery ở <script> cuối <body> thì không cần sử dụng $(document).ready() nữa. 
    
**1.Tại sao không khuyến khích cách viết này ? **
    
jQuery cung cấp 1 số cách để attach 1 function sẽ chạy khi DOM ready. Tất cả các cách viết sau là tương đương nhau : 
    
```
$(handler)
$(document).ready(handler)
$("document").ready(handler)
$("img").ready(handler)
$().ready(handler)
```
    
Trong jQuery 3.0 thì chỉ có cách viết thứ nhất được recommend, tất cả các cách viết còn lại vẫn hoạt động nhưng bị deprecate.

Cách viết : 

*  Không tốt : 
 
```
$(document).ready(function() {
    ....
});
```

*   Tốt : 
    
```
$(function() {
    
 });
```

**2.Tại sao không cần thiết sử dụng :**
    
Ở phần <script> cuối <body>, các phần tử DOM nằm trên <script> đã được load xong và có thể access được từ jQuery.
Do vậy, không cần sử dụng $(document).ready() 

Mình hay có thói quen là để code trong $(document).ready(). Và có 1 vài lần 1 số hàm không hoạt động, nếu để ngoài $(document).ready() thì hoạt động. Chỗ này mình chưa rõ nguyên do, nhưng hỏi các bác veteran coder (ベテラン) trong công ty thì các bác cũng không sử dụng hàm này do tiềm ẩn lỗi chưa rõ nguyên nhân.