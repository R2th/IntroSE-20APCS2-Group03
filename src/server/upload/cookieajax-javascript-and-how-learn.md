# Cookie là gì ? tầm quan trọng của Cookie ?
 kể đến Cookie thì theo mình có lẽ liên quan tới doremon một xúy nếu ai có tuổi thơ thì chắc đọc biệt đội doremon nhỉ , nó cái con robot ronadinho ấy @@ , nó hay quên đúng không ?? , ok thì để có thể làm cho sever có thể ghi nhớ các dataBase của chúng ta thì phải làm sao ? chúng ta phải dùng Cookie nhé !!  ok 
 ![alt](http://daniellfeijo.com/wp-content/uploads/2015/09/201509080032-825x384.png)
 ### 1.Cookie
 - Cookie không phải là một ngôn ngữ lập trình nhé nó đc lưu trữ ở trong những tệp nhỏ trong computer của user
-  Khi một máy chủ web đã gửi một trang web đến một trình duyệt, kết nối sẽ bị tắt và máy chủ sẽ quên mọi thứ về người dùng.
##### Cookie được phát minh để giải quyết vấn đề "cách ghi nhớ thông tin về người dùng":

- Khi người dùng truy cập trang web, tên của anh ấy có thể được lưu trữ trong cookie.
- Lần tới khi người dùng truy cập trang, cookie "ghi nhớ" tên của anh ấy.
Cookie được lưu trong các cặp tên-giá trị như:
```javascript
userName= "Chun";
```
- khi một trình duyệt yêu cầu máy chủ web thì các Cookie thuộc trang web đó đc đưa vào để xử lý ,bằng cách này máy chủ có thể luư đc database bằng cookie 
- ok nãy giờ cũng vòng vo hơi nhiều chắc hóng lắm nhỉ ok , chúng ta đến với phần form nhé !! 
### 2.Form Cookie 
##### a, làm sao để create một cookie đây ??
- để create đc nó chúng ta cần biết đến DOM trong JS đúng không ? vậy DOM là cái mẹ gì ??
- JavaScript là một ngôn ngữ giúp ta liên kết giữa các thẻ HTML để tạo nên những điều ảo diệu đến tột cùng , nó như là cơ mặt của chúng ta zậy ok !! nhưng để liên kết những cái thẻ html và những dòng code JS hack não thì phải làm như thế nào ? chúng ta sẽ phải thông qua cơ chế **DOM** nó là viết tắt của từ **D**ocument  **O**bject **M**odel dịch tạm nó là mô hình đối tượng trong html =)) đây nó phân bậc cha mẹ như này đấy 
![alt](https://www.w3schools.com/Js/pic_htmltree.gif)
- thẻ cao nhất là thẻ html, tiếp theo là phân nhánh body và head. Bên trong head thì có những thẻ như style, title, ... và bên trong body thì là vô số các thẻ HTML khác. 
 ##### Với mô hình đối tượng, JavaScript nhận được tất cả sức mạnh cần thiết để tạo HTML động:

- JavaScript có thể thay đổi tất cả các phần tử HTML trong trang
- JavaScript có thể thay đổi tất cả các thuộc tính HTML trong trang
- JavaScript có thể thay đổi tất cả các kiểu CSS trong trang
- JavaScript có thể xóa các phần tử và thuộc tính HTML hiện có
- JavaScript có thể thêm các thành phần và thuộc tính HTML mới
- JavaScript có thể phản ứng với tất cả các sự kiện HTML hiện có trong trang
- JavaScript có thể tạo các sự kiện HTML mới trong trang

ok bầy giờ chúng ta đến với Cookie thì cách khai báo cookie thì cũng đơn giản lắm nó như này 
 ```javascript
 document.cookie = document.cookie = "username=John Doe";
 ```
 - chúng ta có thể thêm ngày và giờ để cookie kết thúc như sau : 
 
 ```javascript
 document.cookie = document.cookie = "username=John Doe;expires=Thu, 18 Dec 2013 12:00:00 UTC";
 ```
 khi chúng ta có một cookie rồi nếu bạn khai báo thêm một cái cookie nữa thì nó sẽ không chèn váo cái cũ đâu mà nó sẽ chèn vào cái mới đó ,
 ##### b,Function cookie
 - cùng nhau đến với một số function cần thiết khi dùng cookie nhé các bạn ok chúng ta cùng nhau đến với hàm set trước nhé !! hàm set function có 3 tham số là username,valueName,Date nhé ok đầu tiên chúng ta phải khai báo một biến có kiểu là new Date nhé ! sau đó chúng ta dùng hàm set time để lấy thời gian theo ngày nhé vì đc tính bằng mili giây nên chúng ta cần *1000*24*60*60 để lấy từ mili giây => ngày nhé sau đó chúng ta sẽ gắn một biến bằng "day=" + biến đate.toUTC  nhé !!! sau đó thì mọi việc trở nên đơn giản hơn vì chỉ cần dòng code document.cookie = username + "=" + valueName + biến date thôi chúng ta + ";path=/" ok 
##### chúng ta đến với hàm getCookie nhé!!  đầu tiên để get chúng ta cần các bước sau : 
 Lấy cookiename làm tham số (cname).

- Tạo một biến (name) với văn bản để tìm kiếm (cname + "=").

- Giải mã chuỗi cookie, để xử lý các cookie với các ký tự đặc biệt, ví dụ: '$'

- Chia document.cookie trên dấu chấm phẩy thành một mảng gọi là ca (ca = decodedCookie.split (';')).

- Lặp qua mảng ca (i = 0; i <ca.length; i ++) và đọc từng giá trị c = ca [i]).

- Nếu cookie được tìm thấy (c.indexOf (tên) == 0), trả về giá trị của cookie (c.substring (name.length, c.length).

- Nếu không tìm thấy cookie, hãy trả lại "".
```javascript
 function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
 ``` 
 - đây là code của nó  đầu tiên các bạn nhớ set name nhá sau đó tạo mảng bằng cách dùng split để rách Stirng ra các mảng nhé sau đó duyệt hết tất cả phần tử , sau đó chúng ta khai báo một biến là tất cả phần tử của nó và dùng charAt để kiểm tra, ok sau khi kiểm tra chúng ta gắn c= c .subString tức là nó cho phép chúng ta truy cập các phần tử từ 1 => nhé ó như này vd nhé **chun**, **chun**.subString(1)=> String = **un** nhé ok sau đó chúng ta dùng hàm indexOf để kiểm tra xem cái name có nằm ở đầu không và return thôi ok đến đây thôi !! phần 2 mình sẽ nói tiếp nhé !!!! đăng bận coi world cup nên không rảnh lắm ahihi =) hãy clip nếu thấy hay nhé !!