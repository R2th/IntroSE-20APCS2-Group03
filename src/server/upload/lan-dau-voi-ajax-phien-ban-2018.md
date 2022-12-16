**Ajax** là viết tắt của cụm từ 「Asynchronous JavaScript + XML」có thể nói một cách đơn giản là sử dụng XML với Javascript để tiến hành việc gửi bất đồng bộ đến server.
Sử dụng Ajax sẽ không cần redirect màn hình mà vẫn có thể cập nhật thông tin HTML vì thể mà có thể làm giảm tải cho server mà tăng tương tác với người sử dụng. 

Có thể tổng hợp một cách đơn giản như sau:
* không cần redirect page mà vẫn có thể viết lại nội dung 
* có thể sử lý song song những request khác và giao tiếp với server

Ngoài ra, sử dụng Ajax bằng jQuery thì rất nhẹ vì thế mà lần này sẽ sử dụng jQuery và server local là MAMP 
Môi trường
```
jquery:3.1.1
MAMP:4.1.1
```
Sample ：login authentication (POST)
Chúng ta sẽ build một form bằng html và gửi nội dung bằng Ajax đến PHP, sau đó kết quả trả về hiển thị trên html. 　
Bình thường khi click vào button send ở form thì sẽ di chuyển page nhưng lần này để kiểm tra thao tác của Ajax nên sẽ sử dụng button Ajax

Code
```
index.html

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <form id="form_1" method="post" accept-charset="utf-8" return false>
        <p>Name <input type="text" name = "userid" id ="userid"> </p>
        <p>Password <input type="text" name = "passward" id="passward"> </p>
    </form>

    <button id="ajax">ajax</button>
    <div class="result"></div>

    <script type="text/javascript">

        $(function(){
            // Ajax button click
            $('#ajax').on('click',function(){
                $.ajax({
                    url:'./request.php',
                    type:'POST',
                    data:{
                        'userid':$('#userid').val(),
                        'passward':$('#passward').val()
                    }
                })
                // khi request Ajax thành công 
                .done( (data) => {
                    $('.result').html(data);
                    console.log(data);
                })
                // khi request Ajax thất bại
                .fail( (data) => {
                    $('.result').html(data);
                    console.log(data);
                })
                // khi request Ajax thất bai hoặc thành công
                .always( (data) => {

                });
            });
        });

    </script>
</body>
</html>
```

```
request.php

<?php
    header('Content-type: text/plain; charset= UTF-8');
    if(isset($_POST['userid']) && isset($_POST['passward'])){
        $id = $_POST['userid'];
        $pas = $_POST['passward'];
        $str = "AJAX REQUEST SUCCESS\nuserid:".$id."\npassward:".$pas."\n";
        $result = nl2br($str);
        echo $result;
    }else{
        echo 'FAIL TO AJAX REQUEST';
    }
?>
```

## Kết Quả
![](https://images.viblo.asia/5e0504a4-9f07-4b34-a075-12ee90a2e164.png)

## Giải Thích 
**Tổng quan**
Luồng hoạt động sẽ là
nhập thông tin vào form và gửi đi → phát sinh event button của jquery → khởi động xử lý ajax → request url, type, data đã được chỉ định → nhận phản hồi data → xử lý data phản hồi → trả về màn hình
có thể tham khảo chi tiết hơn về setting Ajax ở bài viết ở [đây](http://www.koikikukan.com/archives/2012/10/02-005555.php) (viết năm 2014)

**Xử lý kết quả**
Lúc trước thì có phân chia thành 2 cách viếc success, error cho mỗi trường hợp thành công và thất bại của Ajax nhưng bây giờ sử dụng interface Promist thì sẽ chia thành done, fail
Ngoài ra thì trường hợp dù thất bại hay thành công thì cũng sử dụng hàm always
　
done:xử lý khi thành công
always:fail khởi động bao gồm cả xử lý thất bại
fail: xử lý khi thất bại

**Response Data**
Ở ví dụ trên thì xử lý với data userid, passward của form trong tham số data tuy nhiên sử dụng tên khác cũng không vấn đề gì 

Ở bài tiếp theo sẽ tìm hiểu thử về Fastly,ServiceWorker