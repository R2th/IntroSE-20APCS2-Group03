Trong bài viết này tôi sẽ giới thiệu tới bạn về JavaScript Switch case và cách sử dụng nó trong một vài ví dụ thực tế.

Bài viết này sẽ giải thích rõ hơn bằng những ví dụ thực tế giúp các bạn có thể hiểu sâu hơn về switch case.

# Một vài thứ bạn cần có:
* Kiến thức cơ bản về JavaScript
* Code editor
* Web Brower
* Não là thứ quan trọng nhất :)))

Câu lệnh **switch** có thể dùng để thay thế  nhiều lệnh **if** trong JS
Nó cho nhiều cách mô tả hơn để so sánh một giá trị với nhiều biến thể khác.

# Cú pháp của Switch
Câu lệnh **switch** có một hoặc nhiều **case** và một tùy chọn default case.

```JavaScript

switch(x) {
  case 'value1':  // if (x === 'value1')
    //code here
    [break]

  case 'value2':  // if (x === 'value2')
    //code here
    [break]

  default:
    //code here
    [break]
}
```

*Giá trị của **x** sẽ được so sánh tới giá trị từ **case** đầu tiên (dó là **value1**)sau đó tới **case** thứ hai (**value2**) và cứ như vậy cho đến hết.
*Nếu tìm thấy giá trị bằng **x**, **switch** sẽ thi hành code bắt đầu từ **case** tương ứng cho tới **break** gần nhât (hoặc cho tới khi kết thúc switch)
*Nếu không có trường hợp nào phù hợp thì code trong **default** sẽ được thi hành (nếu nó tồn tại :)))

# Một vài ví dụ thực tế
##  Simple Play & Pause Switch

Câu lệnh **switch** có thể được sử dụng cho nhiều nhánh (mỗi case là một nhánh) dựa trên số hoặc chuỗi:

```JavaScript
switch (movie) {
  case 'play':
    playMovie();
    break;
  case 'pause':
    pauseMovie();
    break;
  default:
    doNothing();
}
```

Nếu bạn không thêm câu lệnh **break**, việc thi hành code sẽ  **fall through** tới nhánh tiếp theo. Nếu bạn không muốn gặp lỗi này, bạn có thể làm như ở dưới:

```JavaScript
switch (movie) {
  case 'play': // fallthrough
  case 'pause':
    pauseMovie();
    break;
  default:
    doNothing();
}
```

Mệnh đề mặc định là tùy chọn. Bạn có thể dùng biểu thức trong cả **switch** và **case** nếu bạn muốn. Chúng dùng toán từ ***===*** để so sánh:

```JavaScript
switch (3 + 7) {
  case 5 + 5:
    correct();
    break;
  default:
    neverhappens();
}
```

### bonus

Vì switch đơn gian so sánh đầu vào với các case bằng toán tử === nên chúng ta có thể làm kiểu này:


```JavaScript
switch (true) {
  case x >== 5 + 5:
    correct();
    break;
  default:
    neverhappens();
}
```

với dạng này sẽ giúp chúng ta đa dạng được phép so sánh

##  Simple Maths Calc Switch

```JavaScript
let average = 2 + 6;

switch (average) {
  case 4:
    alert( 'Too small' );
    break;
  case 8:
    alert( 'Exactly!' );
    break;
  case 10:
    alert( 'Too large' );
    break;
  default:
    alert( "Incorrect values!" );
}
```

Ở trên, **switch** bắt đầu so sánh **average** từ **case** đầu tiên với giá trị là **4** và nó không phù hợp.
Tiếp đến giá trị **8**. Giá trị này phù hợp. Vì vậy, code ở đây được thi hành từ **case 8** cho tới **break** gần nhất.
Nếu không có **break** thì code sẽ được tiếp tục thi hành cho tới **case** tiếp theo mà không cần kiểm tra lại.
Dưới đây là một ví dụ mà không có **break**:

```JavaScript
let average = 2 + 6;

switch (average) {
  case 4:
    alert( 'Too small' );
  case 8:
    alert( 'Exactly!' );
  case 10:
    alert( 'Too big' );
  default:
    alert( "Incorrect values!" );
}
```

Trong ví dụ trên, chúng ta sẽ thấy 3 **alerts** được thi hành tuần tự :

```JavaScript
alert( 'Exactly!' );
alert( 'Too big' );
alert( "Incorrect values!" );
```

## getDay() method switch case

Phương thức **getDay()** trả lại các ngày trong tuần là một số trong các số từ 0 đến 6.
Sunday=0, Monday=1, Tuesday=2 , Wednesday=3, Thursday=4, Friday=5, Saturday=6
Ví dụ dưới đây sử dụng số  ngày trong tuần để tính toán và trả ra tên ngày trong tuần:

```JavaScript
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
     day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}
The result of day will be th
```

Kết quả sẽ là ngày hiện tại theo định dạng ngày.
PS: Điều này có thể thay đổi theo ngày bạn đọc bài viết này
Tôi viết bài này vào thứ ba ngày 13/06/2019, nên kết quả trả về là:

```JavaScript
Thursday
```

## The default Keyword

**default keyword** xác định code chạy nếu không có **case** nào phù hợp, giống như câu lệnh dưới đây:

```JavaScript
switch (new Date().getDay()) {
  case 6:
    text = "Today is Saturday";
    break; 
  case 0:
    text = "Today is Sunday";
    break; 
  default: 
    text = "Its not weekend yet!";
}
```

Kết quả trả về sẽ là:

```JavaScript
Its not weekend yet!
```

**default case** không cần phải là **case** cuối cùng trong khối **switch**

```JavaScript
switch (new Date().getDay()) {
  default: 
    text = "Its not weekend yet!";
    break;
  case 6:
    text = "Today is Saturday";
    break; 
  case 0:
    text = "Today is Sunday";
}
```

Nếu **default** không phải là **case** cuối cũng trong khối **switch**, bạn cần nhớ kết thúc **default** với một **breackk**

# Kết luận
Có rất nhiều ví dụ thực tế về **switch**, bạn có thể truy cập vào google.com và tìm kiếm một cách nhanh chóng để có thêm nhiều ví dụ khác.

[Bài tham khảo](https://www.freecodecamp.org/news/introduction-to-javascript-switch-cases/)