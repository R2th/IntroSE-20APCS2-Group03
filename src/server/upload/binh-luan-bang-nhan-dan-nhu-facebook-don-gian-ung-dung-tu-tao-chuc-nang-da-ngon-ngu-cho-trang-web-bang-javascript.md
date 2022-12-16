Nghe tiêu đề có vẻ không liên quan lắm nhỉ? Nhưng 2 chủ đề này mình dùng cùng một phương pháp để xây dựng nên mình viết cho mọi người thấy ứng dụng và có thể áp dụng thành các tính năng hay ho khác nhé
# Bình luận bằng nhãn dán - facebook và chatwork
## Hình dung
Bạn có dùng facebook chứ? Nếu có thì chắc bạn cũng biết chức năng bình luận bằng nhãn dán - ảnh gif là một tính năng khá thú vị được facebook xây dựng.

![](https://images.viblo.asia/f8288b5c-ba5d-404a-b09d-502144d05ddf.png)

Nếu bạn dùng cả chatwork, chắc cũng đã từng dùng nhãn dán của chat++ hoặc đã thấy nhãn dán của chat++, chỉ cần gõ từ khóa của nhãn dán là hiển thị được sticker rồi

![](https://images.viblo.asia/7285d1de-c073-4b49-a4d1-0000e3d44966.png)

Bạn cũng có thể tự xây dựng tính năng bình luận như vậy, bài viết này mình sẽ giúp các bạn làm tính năng bình luận với nhãn dán đơn giản.
## Bắt đầu với form bình luận nào
Trên chatwork chỉ cần gõ đúng key là có thể hiển thị nhãn dán, mình cũng sẽ xây dựng với key tương tự chatwork, tức là chỉ cần gõ (dog) vào ô bình luận là sẽ hiển thị nhãn dán con chó.
Trước tiên cần một cái form đơn giản để nhập key đã
```html
<form action="result.php" method="post">
    Your message: <input type="text" name="mess"><br>
    Icon: <input type="text" name="icon"><br>
    <input type="submit">
</form>
```
Về phần xử lý form, tùy theo ngôn ngữ các bạn dùng xây dựng trang web để xử lý, ở đây mình sử dụng ngôn ngữ php nên đặt action tới file xử lý tên là `result.php`

Form này hết sức đơn giản rồi, chỉ có 1 dòng để nhập key cho icon và mình thêm một dòng cho bạn nhắn nhủ với icon thôi.

Vì mình thích đẹp nên cho tí bootstrap vào form cho đẹp, còn bạn muốn trông nó ra sao là tùy bạn thôi :)
```html
<form action="result.php" method="post">
    <div class="form-group">
        <label for="mess">Your message:</label>
        <input type="text" class="form-control" id="email" name="mess">
    </div>
    <div class="form-group">
        <label for="icon">Icon:</label>
        <input type="text" class="form-control" id="pwd" name="icon">
    </div>
    <button type="submit" class="btn btn-default">Submit</button>
</form>
```
Kết quả ta được cái form trông thế này

![](https://images.viblo.asia/c2929951-2c2d-46fd-8747-d08d4746b985.png)

Xong bước đơn giản nhất rồi. Bây giờ đến lượt kho nhãn dán nào.
Ở đây chúng ta sẽ dùng cách lưu các icon với 1 đường dẫn tới ảnh sử dụng cho icon đó. Như vậy mỗi lần dùng icon sẽ là gọi tới 1 hình ảnh trong kho, chứ không phải mỗi lần lại upload một ảnh mới lên rất rườm rà.

Để sử dụng icon, bạn làm như trên chatwork: gõ key vào ô icon:
![](https://images.viblo.asia/19fcf8e5-5a90-4283-afd5-87c1c4e9b6ab.png)

Mình sẽ lưu đám icon của mình dưới dạng 1 file Json, đặt tên nó là icon.json luôn.
Vậy bây giờ lưu icon như thế nào đây?
## Bây giờ tạo kho nhãn dán nhé
Các bạn biết qua về file Json chắc cũng biết cách lưu của Json rồi đấy, file lưu dưới dạng `{ key1: value1, key2: value2 }`

Chúng ta sẽ lưu key của icon và đường dẫn tới ảnh dùng cho icon, cụ thể file `icon.json` của mình trông như sau: 
```json
{
	"(cuoilon)": "https://i.pinimg.com/736x/62/49/b8/6249b86941e4034c985aeb9c205fad47.jpg",
	"(thoaimai)": "http://123emoji.com/wp-content/uploads/2016/08/3985702110256541732.png",
	"(camon)": "http://123emoji.com/wp-content/uploads/2016/08/3985702110433208381.png",
	"(dangngu)": "http://123emoji.com/wp-content/uploads/2016/08/3985702110379875053.png",
	"(danghoc)": "http://123emoji.com/wp-content/uploads/2016/08/3985702127053206719.png",
	"(sayruou)": "http://123emoji.com/wp-content/uploads/2016/08/3985702110276541730.png"
}
```
Mình sử dụng link ảnh tìm được trên mạng luôn, còn các bạn có thể thay đường dẫn ki bằng đường dẫn tới folder và file hình ảnh của các bạn nhé.

## Cuối cùng là phải xử lý đọc ra nhãn dán
Thế là xong kho icon. Giờ đến phần xử lý form để in ra icon nhé.
Ở file `result.php` (hay file xử lý form của các bạn), trước hết cần đọc cái kho nhãn dán kia đã.

Bạn cần có hàm đọc file, function sẽ như sau:
```javascript
<script type="text/javascript">
    var icon; //Tạo biến lưu nội dung file json được đọc
    //Tạo hàm đọc file
    function readTextFile(file) 
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    icon = JSON.parse(allText); //đọc dữ liệu json của file và lưu vào biến icon
                }
            }
        }
        rawFile.send(null);
    }

    //Chọn file để đọc nào
    readTextFile('icon/icon.json'); //mình để thư mục icon ngang hàng với các file php, các bạn tùy vào vị trí của file json để lấy đường dẫn cho đúng nhé
</script>
```
Bây giờ bạn đã lấy được nội dung kho nhãn dán rồi, bạn cần nhận dữ liệu là key nhãn dãn được gửi tới nữa. Với ngôn ngữ PHP, bạn có thể lấy thông tin như sau:
```php
Your message is
<?php echo $message; ?><br>
Your icon: <br>
<p id="icon"><?php echo $_POST['icon']; ?></p>
<img id="myIcon" src=""></div>
```

Hiện tại bạn chỉ in ra được lời nhắn và key của icon thôi, vẫn chưa hiển thị được icon, sao vậy?

![](https://images.viblo.asia/2af4da57-580c-48eb-a496-bb003a915711.png)

Thẻ ảnh kia bạn vẫn chưa gán URL cho nó, nên làm gì có ảnh mà hiển thị!!

Thế thì đi tìm URL để gán vào ảnh thôi. Ở trên bạn đã có file Json lưu đường dẫn của ảnh tương ứng với key rồi, form cũng đã gửi key tới, bây giờ bạn chỉ cần tìm value (đường dẫn) của key được gửi tới rồi gán vào `src` của thẻ `img` thôi.

Ở trên kia đã có biến icon lưu toàn bộ nội dung kho nhãn dán rồi, vậy thì để truy cập tới value của key, chỉ cần truy cập `icon[tên_key]` là sẽ lấy được đường dẫn, sau đó gán vào thẻ `img` thôi :)
```php
$('#myIcon').attr('src', icon[key]);
```

Key đương nhiên là được lấy từ input `icon` của form gửi sang rồi, lấy vào bằng javascript thôi, thêm dòng này lên trước để lấy key nhé:
```javascript
var key = $('#icon').text();
```
Kết quả là được file `result.php` như thế này:
```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <title></title>
    <script type="text/javascript">
        var icon;
        function readTextFile(file)
        {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        icon = JSON.parse(allText);
                    }
                }
            }
            rawFile.send(null);
        }
        readTextFile('icon/icon.json');
    </script>
</head>
<body>
    Your message is
    <?php echo $message; ?><br>
    Your icon: <br>
    <p id="icon"><?php echo $_POST['icon']; ?></p>
    <img id="myIcon" src=""></div>
    <script type="text/javascript">
        var key = $('#icon').text();
        $('#myIcon').attr('src', icon[key]);
    </script>
</body>
</html>
```

Và kết quả nhận được khi submit form ban đầu sẽ thế này đây:
![](https://images.viblo.asia/d36df230-a68c-43c3-bcbc-fbb53c079a62.png)

Giờ thì bạn có thể làm nhiều bộ icon rồi nhé. Làm thành các bộ icon khác nhau thì chỉ cần tốn thêm chút sức để chọn file đọc thôi là được rồi.
# Thế còn phần đa ngôn ngữ trong tiêu đề bài viết?
## Chia sẻ
Trong quá trình mình làm các project web, mình cảm thấy khá khó chịu khi phải tải về quá nhiều thư viện, ví dụ như khi sweetalert, slick slider, ... vì tải về kèm là 1 đống file với nội dung lớn để thực hiện các chức năng mà hầu hết là không dùng nhưng cần có. Mình cảm thấy nó làm nặng nề cho cái project của mình (mình cảm thấy thế thôi :) ). Không biết các bạn có như vậy không?

Có một dự án, mình muốn nó đổi được ngôn ngữ cho nhiều người có thể đọc, nhưng mà mình lại gặp vấn đề với jquery i18n (https://github.com/wikimedia/jquery.i18n) đó là phải tải các file js của jquery i18n về, việc này nhỏ thôi nhưng mà mình lại hơi khó chịu. Đã vậy khi mình sử dụng file json lưu key - value của ngôn ngữ, file này lớn nên toàn được tải chậm hơn chỗ in ra các key, thành ra chưa kịp lấy value của key thì nó chỉ in key ra thôi, chưa kịp dịch (do bất đồng bộ) @@.

Bí quá mình mới làm theo cách như trên kia, chọn ngôn ngữ nào thì đọc file json của ngôn ngữ đó, và lấy value của key tương ứng. Việc đọc file sẽ hoàn thành xong trước khi lấy key nên đương nhiên là sẽ lấy được value để in ra rồi. Cũng nhờ thế mình xóa được đống file js của jquery i18n kia đi, nhìn cây thư mục gọn gàng hơn.

Có thể mình viết không được tường minh lắm về phần chia sẻ này, mọi người thông cảm nhé, vì không tận tay thử thì khó tả để hình dung lắm. Nếu mọi người gặp vấn đề về i18n như mình thì sẽ hiểu thôi (mình gặp vấn đề này đây: https://stackoverflow.com/questions/23954471/how-can-i-get-wikimedias-jquery-i18n-plugin-to-work-with-external-files) :), đến lúc đó đọc bài này chắc sẽ hiểu :)

Hết bài rồi, bài viết về chức năng vui thôi, ứng dụng thành vui đến mức nào là nhờ vào các bạn, have fun with this :)