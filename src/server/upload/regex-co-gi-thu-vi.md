## Mở đầu 
Trong  các dự án, vấn đề xác thực thông tin người dùng luôn luôn là cần thiết. Có rất cách để xác thực thông tin, nhưng đơn giản nhất có lẽ vẫn là sử dụng Regex. Trong bài viết này mình sẽ giới thiệu đến các bạn các kiến thức cơ bản về regex và một số pattern hay được sử dụng.


### 1. Regex là gì
Regex viết đầy đủ là Regular Expression (dịch ra tiếng Việt là biểu thức chính quy) là một đoạn các ký tự đặc biệt dùng để so khớp các chuỗi hoặc 1 tập chuỗi. Nó thực sự hữu dụng trong nhiều trường hợp như trích xuất thông tin từ 1 đoạn text (code, file, log, excel file, doc, ....)
![](https://images.viblo.asia/d2572c96-3025-4121-a7a0-41840a626ec7.png)
### 2. Các cú pháp pattern trong Regex
```regex
^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}
```
Chắc các bạn không ít thì nhiều cũng từng gặp đoạn mã dài cả cây số  tương tự như trên mà không hiểu nó có ý nghĩa là gì? Vậy thì cùng mình tìm hiểu một số ký tự đặc biệt hay dùng trong regex để biết nó có ý nghĩa gì :3.

Trước khi giới thiệu các ký tự đặc biệt, mình chia sẻ 1 tool để test các regex là  https://regex101.com/

`\`

Một dấu gạch chéo ngược sẽ biến 1 ký tự thường liền kề phía sau thành một ký tự đặc biệt. Ví dụ nếu 'w' không có dấu gạch chéo ngược này sẽ được khớp với các ký tự `w` in thường. Nhưng khi có thêm dấu gạch chéo ở trước, `\w` thì nó sẽ trở thành ký tự đặc biệt.  
Chi tiết các ký tự đặc biệt dạng này, bạn có thể xem thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes).

Đừng quên `\` cũng là ký tự có thể được so khớp, nên có thể dùng `\\`  để so khớp ký tự này.

`^`

Khớp với các ký tự đứng đầu của một chuỗi. 

Ví dụ, `/^A/` sẽ không khớp được với `an Apple` vì `A` lúc này không đứng đầu chuỗi, nhưng nó sẽ  khớp với `Apple` vì `A` đứng đầu chuỗi.

`$`

So khớp các ký tự ở cuối chuỗi.

Ví dụ, `/g$/` sẽ khớp với `Huấn Hoa Hồng` vì có ký tự `g` ở cuối, còn không khớp với `Khá Bảnh` vì không có ký tự `g` ở cuối.

`{n}`

Ký tự đứng trước phải xuất hiện n lần. n phải là 1 số nguyên.  

Ví dụ, `/a{2}/` không khớp với `soma` nhưng lại khớp với `somaa` 

`{n, m}`

Ký tự đứng trước phải xuất hiện từ  n đến m lần. n,m phải là 1 số nguyên.  Nếu m bị bỏ qua, nó tương đương như ∞.

Ví dụ, `/a{2,5}/` không khớp với `somaaaaaa` nhưng lại khớp với `somaaa` 

`*`

Cho phép ký tự trước nó lặp lại 0 hoặc nhiều lần. Tương đương với cách viết {0,}
Ví dụ, `/ha*/` không khớp với `hihi` nhưng lại khớp với `haha`

`+`

Cho phép kí tự trước nó lặp lại 1 lần hoặc nhiều lần. Tương đương với cách viết {1,}.

Ví dụ, `/a+/` khớp với `a` trong `soma` và cx khớp với a trong `somaaa`

`?` 

Cho phép kí tự trước nó lặp lại 0 lần hoặc 1 lần duy nhất. Tương đương với cách viết {0,1}.

Ví dụ, `/lo?/` khớp với `lo` trong `viblo` và nhưng không khớp với `lo` trong `alolo` 

`.` 

Dấu `.` khớp với bất kì kí tự đơn nào ngoại trừ kí tự xuống dòng.

Ví dụ, `/.a/` sẽ không khớp với với `alo`, nhưng lại khớp với `ba`, `ma` 

`[a-z]` 

Loại mẫu này để so khớp với 1 ký tự bất kỳ trong dấu ngoặc vuông.

Dấu `-` biểu thị là từ a đến z, bạn cũng có thể sử dụng [abcd] thay vì [a-d]

Có thể dùng dấu `^` ở trước để biểu thị phủ định 

Ví dụ, [^abc] thì ký tự so khớp sẽ không bao gồm a,b,c