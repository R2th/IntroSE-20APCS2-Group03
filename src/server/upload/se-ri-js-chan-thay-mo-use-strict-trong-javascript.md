```js
'use strict';

function addWithDoubleValue(a, b) {
  var doubleA = a * 2;
  var doubleB = a * 2;
  return doubleA + doubleB;
}

console.log(doubleA);
```

Khi tham khảo code của người khác, ta sẽ hay bắt gặp cụm từ ```"use strict;"``` như đoạn code trên. Vậy ```"use strict;"``` là gì và **tại sao cần dùng** nó?

Được rồi, ta cần biết khi khai báo cụm trên, js  chạy ở chế độ ```strict mode```. Trong chế độ này, bạn sẽ không thể dùng các **biến chưa định danh (undeclared)**. 

Tất cả các trình duyệt hiện đại đều hỗ trợ phần này, ngoại trừ  Internet Explorer 9  và các bản thấp hơn.

### Khai báo:
Để sử dụng ta cần khai báo ```"use strict";``` ở đầu file js hoặc trước 1 funtion.

**Ví dụ**
```js
"use strict";
x = 3.14; //Dẫn tới lỗi bởi vì biến chưa được khai báo
```
**Ví dụ khác:**
```js
"use strict";
myFunction();

function myFunction() {
  y = 3.14;   // This will also cause an error because y is not declared
}
```

Khi khai báo bên trong 1 function, nó được coi như local scope (chỉ ảnh hưởng các biến bên trong hàm). Ví dụ:
```js
x = 3.14;       // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14;   // This will cause an error
}
```

### Tại sao cần dùng strict mode?
Khi dùng mode này code js của bạn sẽ được đảm bảo hơn về mặt logic code

Trên đây, mình đã gửi tới các bạn khái quát về **use strict**, ngoài ra bạn có thể tham khảo thêm một số trường hợp khác tại [w3schools](https://www.w3schools.com/js/js_strict.asp).