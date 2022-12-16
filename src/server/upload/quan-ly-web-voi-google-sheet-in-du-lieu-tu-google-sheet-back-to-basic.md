Tiếp theo series quản lý web với google sheet, 2 bài trước mình đã hướng dẫn các bạn thu thập thông tin vào google sheet, giờ bài này mình sẽ hướng dẫn các bạn in dữ liệu từ google sheet ra như in từ database ra nhé :D

2 bài trước mình đều hướng dẫn các bạn xử lý không dùng ngôn ngữ backend nào, hoàn toàn hướng dẫn sử dụng script, nhờ đó mà không cần nhiều kiến thức ngôn ngữ backend vẫn có thể làm được. Bài này mình cũng có 1 cách chỉ sử dụng js, không dùng ngôn ngữ backend. Tuy nhiên nhược điểm của cách này là lộ hết code, và lộ cả link google sheet của bạn nữa (sohai). Vậy nên mình khuyến khích mọi người sử dụng cách 2: sử dụng ngôn ngữ backend, xử lý đọc dữ liệu hết trước khi in ra web cho người dùng đọc, tại đây mình sử dụng ngôn ngữ đơn giản - PHP với những hàm đơn giản thôi, và không sử dụng đến google API vì nó khá phức tạp.
# Chuẩn bị
Tất nhiên là cần phải chuẩn bị dữ liệu trên google sheet để có cái mà in ra rồi :v.

Để dễ dàng và đơn giản nhất, các bạn nên coi 1 file google sheet làm DB của 1 web, mỗi sheet lưu nội dung của 1 "bảng" trong DB đó. Tất nhiên có thể chia ra nhiều file google khác nhau cũng được, nhưng như vậy mất công chúng ta tìm kiếm và mở nhiều file thôi :)

Với mỗi sheet, mình quy định như sau: mỗi cột chính là 1 Field - trường dữ liệu, mỗi hàng là 1 bản ghi. Lấy ví dụ bảng News của mình như sau nhé:
![](https://images.viblo.asia/c2f7838a-6bf8-429c-a201-020c323cc989.PNG)

Giờ khi có các "bảng" dữ liệu rồi, các bạn lưu ý các thông tin sau nhé:
* URL sheet => lấy ra google sheet code. Bạn cần phải lấy mã của google sheet, hướng dẫn như sau: Link google sheet của bạn sẽ có dạng như thế này: `https://docs.google.com/spreadsheets/d/1DjUVVsMdYsajrMRmR-3YPaQ7akiRvK1njJIAPf5EOXI/edit#gid=1150305447`
thì bạn sẽ trích xuất google sheet code như sau:

![](https://images.viblo.asia/725e83e2-d35b-4800-a6e7-e1b1b65e9c82.png)

* Page number: Để lấy thông tin đúng bảng, thì ngoài google sheet code ở trên, phải lưu ý lấy đúng số thứ tự sheet nhé. Số thứ tự sẽ đếm từ 1, VD như sheet `News` của mình thì page number sẽ là 2

* Cuối cùng, các bạn lưu ý thứ tự các cột - Field đúng với thứ tự bạn mong muốn nhé
# Sử dụng JS
## Xử lý URL lấy dữ liệu
Để có thể truy cập dữ liệu trong google sheet bằng web của bạn, tất nhiên là phải public cho phép xem trước. Để public được, bạn vào `File -> Publish to the web` như dưới đây:
![](https://images.viblo.asia/a7f77a47-480e-470f-a449-0c2098b69f4c.png)

Sau đó chọn public `Public to the Web` các sheet bạn muốn (lưu ý trang nào muốn lấy dữ liệu phải được public rồi đã), hoặc cả google sheet đó luôn :D.
![](https://images.viblo.asia/96e39f5f-01ac-451f-87c5-cd59fbba00a8.png)

, khi đó đường link public RSS URL sẽ trông như sau:
```
https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values
```

Tuy nhiên để thuận tiện cho việc đọc dữ liệu dễ dàng, thì dạng JSON sẽ giúp cho việc phân tách dữ liệu các hàng / các cột thuận tiện hơn, vậy nên URL để lấy dữ liệu cần có chút thay đổi để trở thành public JSON URL như sau:
```
https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json-in-script
```

> Bạn có thể test xem dữ liệu in ra JSON ra sao rồi bằng cách vào đường dẫn xem thử và thêm Json formater cho dễ nhìn nhé
Do tính chất bất đồng bộ của JS, vậy nên việc đọc dữ liệu từ google sheet kia có thể mất chút thời gian. Để đảm bảo cho sau khi đọc được hết dữ liệu từ file google sheet của bạn rồi bạn mới tiến hành xử lý dữ liệu, thì hãy thêm 1 function `callback` sẽ chạy hàm xử lý dữ liệu `doData` vào URL nữa nhé:
```
https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json-in-script&callback=doData
```
Vậy là đã có link sử dụng để đọc dữ liệu từ google sheet trả về Json để xử lý rồi, việc tiếp theo sẽ là xử lý đám dữ liệu này hiển thị ra cho đúng cách và đúng chỗ nhé.
## Chuẩn bị chỗ chèn dữ liệu (Xử lý html tại vị trí sẽ chèn dữ liệu)
Trong file HTML của mình, mình sẽ đặt 1 `<div id="data"></div>` và dữ liệu sau khi xử lý sẽ insert vào trong div này nhé:
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json-in-script&callback=doData"></script>
</head>
<body>
    <h1>Lấy dữ liệu từ google sheet</h1>
    <table>
        <tbody id="data"></tbody>
    </table>
</body>
</html>
```
## Xử lý dữ liệu để in ra

Giờ tất nhiên là công việc phức tạp nhất: xử lý dữ liệu in ra sao cho đúng ý muốn của bạn. Mình sẽ khởi tạo 1 biến để lưu dữ liệu từ google sheet, sau đó sử dụng hàm `doData` để 'nhét' dữ liệu mình cần vào nhé:
```javascript
var spData = null;
function doData(json) {
    spData = json.feed.entry;
    //nếu cần kiểm tra thì thử console.log phát xem dữ liệu đang có dạng như nào nhé
    console.log(spData);
}
```

Vì sao lại là `json.feed.entry`? Để biết vì sao thì bạn thử truy cập URL lấy dữ liệu và xem thử hàm `doData` trả lại dữ liệu JSON như nào nhé: `https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json-in-script&callback=doData`
![](https://images.viblo.asia/6584ebbe-a518-4023-87e9-7b421f474925.png)

Như các bạn thấy và click thử vào các đối tượng dữ liệu kia, thì nội dung của "bảng" mà chúng ta cần nằm trong `doData->feed->entry`. Ở kia mỗi item trong entry chính là thông tin của 1 ô dữ liệu.

Việc tiếp theo là xử lý dữ liệu để in ra. Tất nhiên là với dữ liệu JSON kia đã đọc được rồi thì các bạn cũng có thể tự nghĩ cách xử lý cho phù hợp, ở đây mình hướng dẫn đơn giản làm ví dụ vừa in dữ liệu vừa in HTML cho đẹp nhé:

Sử dụng 1 hàm `readData()` để xử lý. Hàm này sẽ được gọi đến sau khi toàn bộ trang web và dữ liệu đã được xử lý hết, như vậy bảo đảm đã có các thành phần khác, đọc dữ liệu cũng đã xong, đã có dữ liệu và chỉ việc 'mổ xẻ' nó thôi:
```javascript
function readData() {
    var data = spData;
    var strData = ''; //biến này chứa đoạn mã html sẽ in ra
    //Xử lý code ở đây (xem nội dung phần dưới)
    $('#data').after(strData); //in đám html lưu trong strData vào trong div có id là data
}
$(document).ready(function() {
    readData();
});
```
Giờ bắt đầu phân tích này: Như đã nói ở trên, mỗi 1 item trong `json.feed.entry` chỉ là 1 ô dữ liệu thôi, vậy làm thế nào để lọc ra mỗi hàng, ứng với mỗi bản ghi? Sau đó lặp lại để xử lý html y hệt với bản ghi tiếp theo? Nếu mở các item ra, sẽ thấy nội dung của ô được lưu trong `gs$cell`:

![](https://images.viblo.asia/19937fe4-4bbb-4f0a-9acc-25e6cf970e5c.png)

Trong này có 3 item cần chú ý:
* row: hàng số 2 - bản ghi thứ 2 trong "Bảng"
* col: cột số 2 - Trường ở vị trí thứ 2 theo thứ tự trong "Bảng" (như đã lưu ý từ đầu, chú ý đúng thứ tự nhé)
* $t: nội dung bên trong ô

Vậy là giờ cần phân tích từng item trong `entry` kia, xét hàng và cột của nó để biết nội dung nó đang chứa là cái gì. Thực tế bạn chủ yếu chỉ cần chú ý vào số cột, vì dữ liệu được đọc theo thứ tự từ trái sang đến ô dữ liệu cuối, sau đó lại lộn xuống hàng thứ 2 và tiếp tục như vậy. Vậy thì cứ xử lý tới cột cuối cùng thì coi như đã xong 1 bản ghi, xử lý tiếp theo sẽ là dữ liệu của bản ghi tiếp theo rồi :D. Tất nhiên điều này có nghĩa là bạn phải nắm được cột 1 chứa gì, cột 2 chứa gì, cột cuối cùng là cột số bao nhiêu, như vậy xử lý mới chính xác được. Hơi "hard code" tí nhưng mà các bạn có thể làm nó "logic" hơn, nhưng sẽ dài hơn và ở đây mình hướng dẫn đơn giản thôi nhé.

Giờ phân tích từng ô dữ liệu (ứng với từng `gs$cell`), như trong dữ liệu mẫu của mình thì hàng đầu tiên là tên trường - mình sẽ để là `<th>`, hoặc các bạn bỏ qua, tùy ý. Và tổng cộng mình có 4 trường dữ liệu tất cả. Như vật mình sẽ tách ra xử lý hàng đầu tiên riêng, và xử lý các hàng tiếp theo sẽ giống nhau (cùng là bản ghi dữ liệu), đồng thời tổng cộng xử lý là 4 cột trường dữ liệu để in ra.
```javascript
for (var r = 0; r < data.length; r++) {
    var cell = data[r]["gs$cell"]; //gán nội dung cần lấy - gs$cell vào biến để xử lý
    if (r >= 0 && r < 4) { // từ ô đầu tiên tới số thứ 4 xử lý riêng vì là hàng lưu tên trường dữ liệu, nếu không thích có thể bỏ qua việc ghi tên cột lên hàng 1, hoặc bỏ qua xử lý đoạn này. 
        if (cell["col"] == "1") { //cột đầu tiên mình lưu ID
            strData += '<tr class="row">';
            strData += '<th class="col-md-1"><b>' + cell["$t"] + '</b></th>'; //nội dung nằm trong gs$cell->$t
        } else if (cell["col"] == "2") { //cột thứ 2 mình lưu title
            strData += '<th class="col-md-1"><b>' + cell["$t"] + '</b></th>';
        } else if (cell["col"] == "3") {  //cột thứ3 mình lưu link ảnh, với th thì vẫn in bình thường, nhưng xuống tới dưới sẽ in thành hình ảnh nhé
            strData += '<th class="col-md-1"><b>' + cell["$t"] + '</b></th>';
        } else if (cell["col"] == "4") { //cột cuối lưu mô tả ngắn cho bài
            strData += '<th class="col-md-2"><b>' + cell["$t"] + '</b></th>';
            strData += '</tr>';
        }
    } else { //xử lý các bản ghi dữ liệu bình thường
        if (cell["col"] == "1") {
            strData += '<tr class="row">';
            strData += '<td class="col-md-1">' + cell["$t"] + '</td>';
        } else if (cell["col"] == "2") {
            strData += '<td class="col-md-1">' + cell["$t"] + '</td>';
        } else if (cell["col"] == "3") {
            strData += '<td class="col-md-1"><img width="100%" src="' + cell["$t"] + '"></td>';
        } else if (cell["col"] == "4") {
            strData += '<td class="col-md-2">' + cell["$t"] + '</td>';
            strData += '</tr>';
        }
    }
}
```

Chạy thử sẽ thấy kết quả như dưới đây nhé:
![](https://images.viblo.asia/68f79e8c-28db-47c4-b7e3-031874ce95cd.png)

Dưới đây là toàn bộ code demo cho các bạn thử, nhớ thay link google sheet của các bạn vào nhé:
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript">
        var spData = null;

        function doData(json) {
            spData = json.feed.entry;
        }
        function readData() {
            var data = spData;
            var strData = '';
            // consolr.log
            for (var r = 0; r < data.length; r++) {
                var cell = data[r]["gs$cell"];
                if (r >= 0 && r < 4) {
                    if (cell["col"] == "1") {
                        strData += '<tr class="row">';
                        strData += '<th class="col-md-1"><b>' + cell["$t"] + '</b></th>';
                    } else if (cell["col"] == "2") {
                        strData += '<th class="col-md-1"><b>' + cell["$t"] + '</b></th>';
                    } else if (cell["col"] == "3") {
                        strData += '<th class="col-md-1"><b>' + cell["$t"] + '</b></th>';
                    } else if (cell["col"] == "4") {
                        strData += '<th class="col-md-2"><b>' + cell["$t"] + '</b></th>';
                        strData += '</tr>';
                    }
                } else {
                    if (cell["col"] == "1") {
                        strData += '<tr class="row">';
                        strData += '<td class="col-md-1">' + cell["$t"] + '</td>';
                    } else if (cell["col"] == "2") {
                        strData += '<td class="col-md-1">' + cell["$t"] + '</td>';
                    } else if (cell["col"] == "3") {
                        strData += '<td class="col-md-1"><img width="100%" src="' + cell["$t"] + '"></td>';
                    } else if (cell["col"] == "4") {
                        strData += '<td class="col-md-2">' + cell["$t"] + '</td>';
                        strData += '</tr>';
                    }
                }
            }
            $("#data").after(strData);
        }
        $(document).ready(function() {
            readData();
        });
        
    </script>
    <script src="https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json-in-script&callback=doData"></script>
</head>
<body>
<table style="width: 80%">
    <tbody id="data">
        <!-- Content Here -->
    </tbody>
</table>
</body>
</html>
```
# Sử dụng PHP
Như đã nói từ đầu, sử dụng js như đoạn code trên mặc dù đơn giản, "ăn liền" nhưng chỉ cần Inspect code lên cái là lộ luôn cái file google sheet của bạn rồi (capcuu). Chính vì vậy mình khuyến khích các bạn sử dụng thêm 1 ngôn ngữ backend, mình sử dụng PHP, để xử lý hết dữ liệu rồi mới in ra màn hình. Cách làm thì cũng đơn giản :)

## Lại là xử lý URL
Tương tự như trên, chúng ta cũng xử lý dữ liệu dạng json nhé, URL để sử dụng cũng na ná như trên kia thôi, khác tí tẹo :D
```
https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json
```
Tất nhiên là vào thử link thấy dữ liệu cũng như trên, tức là thông tin cần lấy ở `feed->entry->gs$cell`
## Về HTML
Lợi thế của PHP chính là tính linh động (hay cũng là sự "trông xấu" của PHP :D ), vì vậy bạn cứ chỗ nào muốn in dữ liệu thì viết mã PHP để in vào đó, xong xuôi lại đóng thẻ PHP viết tiếp HTML là được, không cần lằng nhằng vẽ cột, chèn vào vị trí như trên.

## Lấy dữ liệu ra và "mổ xẻ thêm mắm muối"
```php
<?php
    $url = 'http://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/values?alt=json';
    $file = file_get_contents($url); //lấy dữ liệu từ URL trên
    $json = json_decode($file); //Đọc dữ liệu dạng JSON
    $rows = $json->{'feed'}->{'entry'}; //Lấy nội dung cần thiết trong entry
?>
```
Giờ đã có 1 tập dữ liệu của từng ô như bên trên rồi. Tiếp theo lại là phân tích các tập dữ liệu này, tùy thuộc vào ô đó thuộc cột bao nhiêu để lấy được dữ liệu tương ứng viết vào đúng chỗ.

```php
$i = 1; //Hàng đầu tiên
foreach ($rows as $row) {
    if ($i == 1) { //nếu là hàng đầu tiên thì xử lý nó thành th, hoặc bỏ qua, như phía trên
        switch ($row->{'gs$cell'}->{'col'}) {
            case '1': //cột 1 là cột mở hàng tr
            ?>
            <tr class="row">
                <th class="col-md-1"><b> <?php echo $row->{'gs$cell'}->{'$t'} ?></b></th>
            <?php
            break;
            case '4': //cột 4 là cột kết thúc hàng tr
        ?>
            <th class="col-md-2"><b> <?php echo $row->{'gs$cell'}->{'$t'} ?></b></th>
        </tr> 
        <?php
            default: //với các cột khác là nhân của tr - tức th bình thường ?>
                <th class="col-md-1"><b> <?php echo $row->{'gs$cell'}->{'$t'} ?></b></th> <?php
        }
    } else {
        switch ($row->{'gs$cell'}->{'col'}) {
            case '1': //cột 1 là cột mở hàng tr
            ?>
            <tr class="row">
                <td class="col-md-1"><?php echo $row->{'gs$cell'}->{'$t'} ?></td>
            <?php
            break;
            case '4': //cột 4 là cột kết thúc hàng tr
            ?>
                <td class="col-md-2"><?php echo $row->{'gs$cell'}->{'$t'} ?></td>
            </tr> 
        <?php
            break;
            default: //với các cột khác là nhân của tr - tức th bình thường ?>
                <td class="col-md-1"><?php echo $row->{'gs$cell'}->{'$t'} ?></td> <?php
        }
    }
}//end foreach
```

> Ồ, vậy đoạn code trên chạy in đúng như mong muốn, bởi vì các cột đã được xếp đúng thứ tự muốn in. Nhưng nhỡ các cột chưa đúng thứ tự in ra, VD in cột 3 trước khi in cột 4, hoặc muốn in cột 3 vài lần thì sao?

### Extra: Xử lý gom dữ liệu thành các đối tượng bản ghi

Để xử lý trường hợp in không đúng thứ tự, in nhiều lần 1 giá trị trong cột, hay xử lý chuyên nghiệp hơn với các bản ghi, thì suy luận đơn giản là gom hết các dữ liệu mỗi hàng thành 1 mảng con, và đẩy vào 1 mảng 2 chiều thôi
```php
$i = 0; //Khởi tạo phần tử thứ 0 của mảng
foreach ($rows as $row) { //Với mỗi nội dung ô trong item của entry 
    if ($row->{'gs$cell'}->{'col'} == '1') { //nếu là cột đầu tiên - tức trường đầu tiên của 1 bản ghi
        $new[$i] = []; //Khởi tạo phần tử thứ i là 1 mảng rỗng
        array_push($new[$i], $row->{'gs$cell'}->{'$t'}); //đẩy nội dung $t vào thành phần tử đầu tiên của mảng $new[$i]
    } elseif ($row->{'gs$cell'}->{'col'} == '4') { //cột cuối cùng của mình là cột 4, nên nếu phân tích tới cột cuối thì sẽ cộng cho i thêm 1, để chuyển sang đẩy dữ liệu vào item chứa nội dung bản ghi tiếp theo
        array_push($new[$i], $row->{'gs$cell'}->{'$t'});
        $i++;
    } else { //còn nếu ko phải cột đầu, cũng chả phải cột cuối thì cứ tuần tự nhét nội dung 'field' - trường vào mảng chứa nội dung bản ghi đang được ghi lại
        array_push($new[$i], $row->{'gs$cell'}->{'$t'});
    }
}
```
Như trên là ta đã có mảng đa chiều `$new` chứa tất cả các bản ghi rồi:
```php
$new[0] => như của mình chứa nội dung tiêu đề cho các cột - tức tên 'Field'
$new[1] => Chứa bản ghi - nội dung dòng dữ liệu đầu tiên (của mình là hàng 2 đấy =)))
$new[3] => Chứa bản ghi - nội dung dòng dữ liệu đầu tiên (của mình là hàng 3 đấy =)))
...
Và 
$new[1][0] => chứa id của bản ghi 1
$new[1][1] => chứa title của bản ghi 1
$new[1][2] => chứa link ảnh minh họa cho bản ghi 1
...
```
Đã gom hàng xong. Giờ chạy vòng lặp foreach `$new` để xử lý là được:
```php
foreach ($new as $item) {
    echo $item[0]; //=> in ra ID này, chèn html gì tùy mọi người nhé, mình lười viết rồi
    //xử lý chèn html gì đấy
    echo $item[4]; // in ra cái mô tả ngắn
    //xử lý chèn html gì đấy
    echo $item[2]; // in ra cái ảnh minh họa cho đẹp
    //xử lý chèn html gì đấy
    echo $item[0]; //lại in ra id lần nữa này, chắc là để lấy id làm link dẫn sang bài viết chi tiết =))
... //đừng có gõ 3 chấm vào code ko lỗi nhé
}
```
Đấy cũng có khó đâu, đỡ 'lộ hàng' hơn JS kia nhé, mỗi tội là phải cài thêm môi trường backend chứ ko 'ăn ngay' như JS được thôi. Lười mà không sợ lộ file google sheet thì dùng JS cũng được nhé :D

# Kết
Series này của mình đã hướng dẫn cách 'Lười' - sử dụng google spread sheet làm DB, và sử dụng JS (có thể kết hợp với ngôn ngữ backend đơn giản - không framework hay hàm phức tạp) để các bạn đỡ mất công cài môi trường cho SQL hay cho framework backend. Tất nhiên cách quản lý và xây dựng web này có nhiều nhược điểm:
* Chỉ dùng được cho web site nội dung đơn giản, thu thập dữ liệu dạng đơn giản từ web, chủ yếu là lấy dữ liệu để in ra như mong muốn
* Yêu cầu chặt chẽ trong google sheet: đúng thứ tự sheet, đúng thứ tự cột, đúng - đủ dữ liệu ứng với các cột (tất cả các bản ghi đều ghi đến đúng cột số mà bạn quy định là cuối, bản ghi nào mà ghi thêm là tất cả đằng sau sẽ lệch dữ liệu hết) => cần tuân thủ rule, ko thể tùy tiện thay đổi thứ tự hay thêm cột mới - dẫn đến thay đổi cả code.
* Dễ lộ DB của bạn: do phải public dữ liệu để web có thể lấy được nên file của bạn sẽ dễ bị lộ. Có thể hạn chế bằng cách khóa các sheet, chỉ public cho xem 1 số sheet thôi. Và tất nhiên là không nên lưu trữ dữ liệu cần bảo mật vào đây nhé.
* Chỗ code trên chưa bao gồm 1 ít phòng chống injection nào cả, vì vậy để tăng tính bảo mật các bạn chú ý xử lý thêm dữ liệu nội dung cả khi thu thập lẫn khi in ra nhé, tất nhiên là được 1 vài lớp cơ bản thôi, không thể hoàn hảo như Framework được.
* Không nên sử dụng nếu lượng dữ liệu cho web quá lớn

Mặc dù có nhiều nhược điểm, nhưng google sheet thì Free; UI, UX  thì dễ dùng cho người quản lý content; và nó còn lưu lại lịch sử chỉnh sửa, đề phòng lỡ tay xóa linh tinh rồi không biết làm sao để revert :D; và dạng JSON kia thì dễ xử lý nữa; nên mình thấy chủ đề quản lý web bằng google sheet vẫn khá là hay ho để tìm hiểu. Hy vọng series này có thể giúp những người 'ít biết code' có thể xây dựng website đơn giản cho riêng mình :D