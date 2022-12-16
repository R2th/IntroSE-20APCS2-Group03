### Giới thiệu
Xin chào các bạn, hôm nay mình sẽ giới thiệu tới các bạn một bài toán khác mình đã gặp trong dự án. Đó là xử lý include dữ liệu từ file HTML vào nội dung trang web bằng javascript. Hãy cùng mình phân tích yêu cầu nhé.

### Yêu cầu
Khách hàng có xây dựng nhiều modules(mỗi module tương tự 1 trang web dịch vụ của KH) khác nhau và các modules này đều đang chạy đồng thời, tuy nhiên phần header/footer thì tất cả các modules đều giống nhau.
Vì thế phần header/footer này KH muốn tách ra thành 2 files riêng để tiện cho việc chỉnh sửa sau này (Khi có yêu cầu chỉnh sửa HTML/CSS/JS của header/footer thì chỉ cần sửa ở trong 2 files này thì tất cả các modules đều được cập nhât). Để đảm bảo CSS/JS của header/footer thì KH đã chọn giải pháp là viết CSS/JS internal.

### Thực hiện
Với yêu cầu như trên thì mình sẽ xử lý như sau:
* Viết mã HTML, đánh dấu vị trí để include header và footer
* Viết mã JS để lấy dữ liệu từ file HTML của header/footer được chỉ định để chèn và vị trí đã đánh dấu
Cùng xem phần code mình đã thực hiện nhé

### HTML
Mình đánh dấu vị trí header/footer như code phía dưới, và có truyền thêm `class` là `include-html` và attribute `data-file` là đường dẫn của file HTML mà mình cần include.
```
<!DOCTYPE html>
<html>
<head>
...
    <title>My website</title>
...
</head>
<body>

<div class="header-section include-html" data-file="myfolder/header.html"></div>
<div class="main-content">
    ...
    // content here
    ...
</div>
<div class="footer-section include-html" data-file="myfolder/footer.html"></div>
</body>
</html>

```

### Javascript
Mình sẽ thêm javascript internal trong file HTML ở trên và có chú thích ở trong các đoạn code
```javascript
<script>
  function includeHTML() {
    var i, elem, file, xhttp; // Khởi tạo các biến

    // Lấy tất cả các thẻ có class là include-html (Như ở trên mình định nghĩa 2 thẻ để include header/footer)
    var includeFiles = document.getElementsByClassName('include-html');
    
    // Duyệt vòng lặp từ mảng phần tử ở trên
    for (i = 0; i < container.length; i++) {
      elem = includeFiles[i]; // Gán biến elem bằng thẻ đang được duyệt
      file = elem.getAttribute("data-file"); // Gán biến file là attribute của thẻ đang được duyệt

      if (file) { // Kiểm tra nếu tồn tại attribute này thì thực hiện tiếp
        xhttp = new XMLHttpRequest(); // Khởi tạo request
        xhttp.onreadystatechange = function() {
          // Lắng nghe event khi request kết thúc
          if (this.readyState == 4) {
            // Nếu status là 200 (thành công) thì set nội dung của file vào thẻ đang được duyệt
            if (this.status == 200) {elem.innerHTML = this.responseText;}

            // Nếu status 404 (lỗi) thì hiển thị nội dung lỗi không thấy component
            if (this.status == 404) {elem.innerHTML = "Component not found.";}

            // Sau khi duyệt xong thẻ này thì xoá class include-html 
            elem.classList.remove("include-html");

            // Gọi lại function includeHTML để duyệt tất cả các thẻ có class include-html còn lại
            includeHTML();
          }
        }
        // Tạo và gửi request
        xhttp.open("GET", file, true);
        xhttp.send();
        return; // Thoát function
      }
    }
  };
  includeHTML();
</script>
```

### Kết luận
Trên đây là bài toán mình đã gặp và cách xử lý, cảm ơn các bạn đã theo dõi bài viết này. Hi vọng nó là 1 case study để các bạn tham khảo :).


### Nguồn tham khảo
[w3school](https://www.w3schools.com/howto/howto_html_include.asp)