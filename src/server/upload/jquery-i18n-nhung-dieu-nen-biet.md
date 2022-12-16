Một website đa ngôn ngữ, có nhiều cách làm, nhưng hôm nay mình xin giới thiệu một plugin jquery [i18n](https://github.com/wikimedia/jquery.i18n) hỗ trợ cho việc phát triển đa ngôn ngữ cho website cũng như app của bạn 

Dự án triển khai `jQuery i18n` xong thì mình xin chia sẽ một số kinh nghiệm mình đúc kết được

1.  Plugin dễ dùng, dễ cài đặt   
Để cài đặt nếu dự án website sử dụng html, css bình thường thì chúng ta chỉ việc add 2 cụ này vào file footer là ok 
```
1. https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.7/jquery.i18n.min.js
2. https://cdnjs.cloudflare.com/ajax/libs/jquery.i18n/1.0.7/jquery.i18n.messagestore.min.js
```


2.  Các feature khá hữu ích nhỏ và có võ 

Bạn hình dung chúng ta thường hay có một số tham số động trong text, làm thế nào chúng ta truyền các tham số động đó vào đoạn text

Với jquery i18n việc đó dễ như ăn kẹo, jquery i18n cung cấp cho tao hẳn một feature gọi là `Message format`

Ví dụ ta có đoạn text là `Chào Cường`, chúng ta hình dung ra được vấn đề ở đây là gì không ạ

chúng ta `chào` một ai đó, thì một ai đó là cái động có thể truyền ngoài vào, vậy thì `jquery i18n` chúng ta làm thế nào?

Thật đơn giản `Placeholders` sẽ xử lí rất gọn gàng. Chúng ta chỉ cần khai báo cấu trúc như sau 

```
var message = "Chào, $1";
$.i18n(message, 'Cường'); ==> đầu ra sẽ là  Chào Cường
```

Rất hữu ích phải không :D

Hay trong tiếng anh hay có kiểu số ít số nhiều khác bỏi chữ `s` thì cụ này cũng cho ta cách xử lí rất hay  gọi là `Plurals`

```
var message = "Found $1 {{PLURAL:$1|result|results}}";
$.i18n(message, 1); // This gives "Found 1 result"
$.i18n(message, 4); // This gives "Found 4 results"
```

Cũng rất hay phải không nào :D

Ngoài ra còn xử lí cho `Gender` cũng rất hữu ích với cách khai báo đơn giản sau 

```
var message = "$1 changed {{GENDER:$2|his|her}} profile picture";
$.i18n(message, 'Alice', 'female' ); // This gives "Alice changed her profile picture"
$.i18n(message, 'Bob', 'male' ); // This gives "Bob changed his profile picture"
```

3.  Lưu ý quả load file translation `.json` từ server 
Load file translation từ server,  mình rất nhiều time để fixbug cho cụ này.

Vấn đề là gì, mình cùng phân tích vấn đề sau nhé

khi mình khai báo khởi tạo `i18n`
```
$.i18n({
  locale: document.documentElement.lang,
})
.load({
  'en': '/i18n/message/message_en.json',
  'jp': '/i18n/message/message_jp.json'
})
```

Nhìn thì không thấy sai nhưng mình đã gặp 1 qủa đắng là trên local test không vấn đề gì cho đến khi deploye lên server toàn bộ translation của mình không cái nào hiển thị được :(, đắng quá phải không.

Lúc đó mình mới mò tìm document của nó thì phát hiện có một chi tiết rất quan trọng là 
> The library should expose an API to load an object containing key-value pair of messages. Example: $.i18n.load(data). This will return a jQuery.Promise.
> 
Tức là sao nhỉ =)), cụ ấy xử lý bất đồng bộ và return ra 1 promise, ơi zời ạ. Thế nên trên local nó load nhanh không bị trễ nên phát nào ăn luôn phát đó. Lên server phát là dính ngay đòn đau. 

Lại đi lục tung cái google lên để fix, cuối cùng chia khoá cửa nó là đây 

```
$.i18n({
  locale: document.documentElement.lang,
})
.load({
  'en': '/i18n/message/message_en.json',
  'jp': '/i18n/message/message_jp.json'
})
.done( ()=>{
 // doing something here 
})
```

Muốn gọi cái kiểu `$.i18n(message, 1);` thì làm ơn vứt cụ ấy vào trong `done` nhé, để đảm bảo load xong file translation từ server xong xuôi sau đó mới dùng thế nào thì dùng nhá các cụ 

À còn một tip hay mình gặp trong dự án, mọi người có nhìn thấy dòng code này không ạ 

`document.documentElement.lang`

Đừng tưởng nó đơn giản nhá, cái này sẽ lấy giá trị lang trong file html bạn khỏi tạo ví dụ sau 

```
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
```

Mình đã gặp phải case là `$.i18n.locale is empty`  sau đó mình check ông lang trong file  `HTML` là không truyền vào. Nên giá trị của ông  `$.i18n.locale is empty` là đúng rồi.

4.  Kết luận

Với những kinh nghiệm mình rút ra được khi làm việc với cụ `jQuery i18n` hi vọng các bạn khi làm việc với cụ ấy sẽ thêm phần tự tin, tránh những lỗi mình đã nêu ở trên. Để dự án hoạt động trơn tru hơn.