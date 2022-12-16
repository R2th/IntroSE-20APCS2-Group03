# Hàm xử lý ngày tháng (Date) trong Javascript
* Bài trước chúng ta đã tìm hiểu đối tượng Date trong Javascript rồi thì trong bài này mình sẽ nói đến một số hàm xử lý liên quan đến đối tượng Date này. Bài này khá quan trọng khi bạn viết các ứng dụng có liên quan đến ngày giờ, ví dụ ứng dụng hiển thị đồng hồ, hiển thị thời gian count down trong các chương trình deal giảm giá.

Chúng ta chia làm hai nhóm hàm chính đó là nhóm Date Get và nhóm Date Set.

**Table of Content**
* 1. Các hàm nhóm Date Get trong Javascript
* 2. Các nhàm nhóm Date Set trong Javascript
* 3. Tạo đồng hồ online bằng Javascript
    * Hàm checkTime()
    * Hàm startTime()
4. Lời kết

## 1. Các hàm nhóm Date Get trong Javascript

Trong Javascript tổng cộng có 10 hàm thiết lập thời gian thông dụng:
****
* getDate() lấy ngày (1 - 31)
* getDay() lấy ngày trong tuần (0-6)
* getFullYear() lấy năm đầy đủ (YYYY)
* getYear() lấy năm 2 số cuối (YY)
* getHours() lấy số giờ (0 - 23)
* getMiliSeconds() lấy số mili giây (0 - 999)
* getMinutes() lấy số phút (0 - 59)
* getMonth() lấy tháng (0 - 11)
* getSeconds() lấy số giây (0 - 59)
* getTime() thời gian đã được convert sang dạng miliseconds.**

Cách sử dụng các hàm trên khá đơn giản, vì nó là các phương thức của đối tượng Date nên bạn chỉ việc gọi ra và dùng.


```
// Đối tượng thời gian hiện tại
var d = new Date();
 
d.getDate();
d.getDay();
d.getFullYear();
d.getYear();
d.getHours();
d.getMilliseconds();
d.getMinutes();
d.getMonth();
d.getSeconds();
d.getTime();
```

**Lưu ý**: với hàm lấy ngày trong tuần getDay() bạn phải cộng lên một thì mới có kết quả chính xác vì nó tính từ 0.

## 2. Các nhàm nhóm Date Set trong Javascript


Tương ứng với mỗi hàm Date Get thì sẽ có một hàm Date Set (trừ hàm getDay()).

* setDate() thiết lập ngày (1 - 31)
* setFullYear() thiết lập năm đầy đủ (YYYY)
* setYear() thiết lậpnăm 2 số cuối (YY)
* setHours() thiết lập số giờ (0 - 23)
* setMiliSeconds() thiết lập số mili giây (0 - 999)
* setMinutes() thiết lập số phút (0 - 59)
* setMonth() thiết lập tháng (0 - 11)
* setSeconds() thiết lập số giây (0 - 59)
* setTime() thiết lập thời gian đã được convert sang dạng miliseconds.


**Lưu ý:**

* Vì đây là hàm set nên bạn phải truyền tham số vào.
* Các hàm có ảnh hưởng lẫn nhau nhé các bạn, ví dụ bạn thiết lập ngày giờ không đúng thì nó sẽ lấy ngày giờ mặc định.
* Nếu bạn dùng hàm setTime() để thiết lập thì nó ảnh hưởng tới tất cả các giá trị còn lại bởi vì setTime() là hàm thiết lập thời gian đầy đủ đã chuyển sang dạng miniseconds.

```
// Đối tượng thời gian hiện tại
var d = new Date();
 
d.setDate(20);
d.setFullYear(2011);
d.setHours(2);
d.setMilliseconds(2);
d.setMinutes(3);
d.setMonth(4);
d.setSeconds(5);
```


# 3. Tạo đồng hồ online bằng Javascript

Để các bạn hiểu rõ hơn về ứng dụng của các hàm trong đối tượng Date thì mình sẽ làm một ví dụ hiển thị đồng hồ online, đây là đồng hồ được lấy từ giờ của hệ thống máy tính Client.


Trước tiên bạn cần DEMO để dễ hình dung hơn, sau khi xem xong thì ta tiến hành làm nhé.



Bạn tạo một file index.html với nội dung như sau:

```
<!DOCTYPE html>
<html>
    <head>
        <script>
          // Hàm khởi tạo đồng hồ
          function startTime()
          {
               
          }
           
          // Hàm này có tác dụng chuyển những số bé hơn 10 thành dạng 01, 02, 03, ...
          function checkTime(i)
          {
               
          }
        </script>
    </head>
    <body onload="startTime()">
 
        <div id="timer"></div>
 
    </body>
</html>
```

**Trong đó có:**

* Một thẻ div#result dùng để hiển thị đồng hồ
* Thẻ body có sự kiện onload="startTime()"  dùng để chạy đồng hồ khi website được load lên.
* Có hàm startTime() dùng để tạo đồng hồ và hàm checkTime() dùng chuyển đổi định dạng những con số sang dạng 01, 02, 03, ...

**Hàm checkTime()**

```
// Hàm này có tác dụng chuyển những số bé hơn 10 thành dạng 01, 02, 03, ...
function checkTime(i) 
{
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
```

**Hàm startTime()**

```
// Hàm khởi tạo đồng hồ
function startTime() 
{
    // Lấy Object ngày hiện tại
    var today = new Date();
 
    // Giờ, phút, giây hiện tại
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
 
    // Chuyển đổi sang dạng 01, 02, 03
    m = checkTime(m);
    s = checkTime(s);
 
    // Ghi ra trình duyệt
    document.getElementById('timer').innerHTML = h + ":" + m + ":" + s;
 
    // Dùng hàm setTimeout để thiết lập gọi lại 0.5 giây / lần
    var t = setTimeout(function() {
        startTime();
    }, 500);
}
```

* Với cách làm này thì chỉ lấy được thời gian của hệ thống Client, còn nếu bạn muốn lấy thời gian từ Server thì phải thông qua PHP, đồng thời dùng hàm setTimeout() để tăng giờ, phút, giây lên chứ không phải lấy trực tiếp như thế này.

## 4. Lời kết

* Ngoài các hàm trên thì vẫn còn rất nhiều hàm khác nhưng mình không liệt kê ra hết được, vì vậy bạn có thể tham khảo thêm [Tại đây](https://www.w3schools.com/jsref/jsref_tojson.asp)
* Để sử dụng rành các hàm này thì bạn phải làm một vài ví dụ nữa nhưng vì đây là serie viết về lý thuyết nên mình sẽ không đưa ra thêm