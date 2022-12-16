Chào các bạn, hôm nay mình sẽ hướng dẫn các bạn dùng ajax và php để tạo hosting lưu trữ ảnh đơn giản và trả về API để nhận kết quả từ Front End nhé.
## 1. Đầu tiên, các bạn tạo 1 form HTML, lưu ý có thuộc tính enctype="multipart/form-data" để có thể upload file nhé.
>    <form method="POST" enctype="multipart/form-data"><br>
>      <input type="file" name="img" id="img" ><br>
>      <button class="submit">OK</button><br>
>    </form>
## 2.  Sau đó, các bạn dùng jquery để bắt sự kiện click của button
>        $("button").click(function (e) {
>                    //code here
>         });
## 3.   Tiếp theo, các bạn cần lấy được file mà user upload lên thông qua jquery và upload bằng ajax
>         let img = $(".img");
>             var form = new FormData();
>             form.append("image", img[0].files[0]);
>             //Post to server
>             $.ajax({
>                 type: "POST",
>                 url: "https://đỉa chỉ serverPHP",
>                 processData: false,
>                 mimeType: "multipart/form-data",
>                 contentType: false,
>                 data: form,
>                 success: function (response) {
>                     console.log(response);
>                     let result = JSON.parse(response);
>                     console.log(result);
>                 },
>                 error: function (e) {
>                     console.log(e);
>                 }
>             });
## 4. Vậy là xong phần frontend post file lên server. Đoạn code hoàn chỉnh của chúng ta như sau:
>     <form method="POST" enctype="multipart/form-data">
>           <input type="file" name="img" id="img" >
>            <button class="submit">OK</button>
>         </form>
>     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
>     <script>
>         $("button").click(function (e) {
>             // console.log(window.location.href);
>             let img = $(".img");
>             var form = new FormData();
>             form.append("image", img[0].files[0]);
>             //Post to server
>             $.ajax({
>                 type: "POST",
>                 url: "https://đỉa chỉ serverPHP",
>                 processData: false,
>                 mimeType: "multipart/form-data",
>                 contentType: false,
>                 data: form,
>                 success: function (response) {
>                     console.log(response);
>                     let result = JSON.parse(response);
>                     console.log(result);
>                 },
>                 error: function (e) {
>                     console.log(e);
>                 }
>             });
>         });
>     </script>
## 5. Đến phần PHP
    Đơn giản bản chỉ cân tham khảo đoạn code dưới đây:
>             <?php
>                   header('Access-Control-Allow-Origin: *');
>                   if(isset($_FILES['image'])) {
>                         $name = str_replace(' ', '-', $_FILES["image"]["name"]);
>                         $bannerpath="uploads/".$name;
>                         $flag = move_uploaded_file($_FILES["image"]["tmp_name"],$bannerpath);
>                         if($flag) {
>                           $domain =  (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
>                           $resultImg = $domain. "/uploads/". $name;
>                           $size = $_FILES["image"]["size"];
>                           $result->resultImg = $domain. "uploads/". $name;
>                           $result->size = $size / 1024;
>                           $result->name = $name;
>                           echo json_encode($result);
>                         }
>                         return $flag;
>                     }
>                 ?>
## 6. cuối cùng bạn xem console của trình duyệt để xem api trả về nhé
![](https://images.viblo.asia/2cd82933-1f2d-4871-b72f-737bb4e58389.png)

Demo tham khảo: https://repl.it/repls/JitteryKindlyUnit <br>
Chúc các bạn thành công, nếu bài viết có chỗ nào không hiểu, hay muốn góp ý cho mình thì nhờ các bạn comment bên dưới để cho mình biết nhé, mình xin cảm ơn!