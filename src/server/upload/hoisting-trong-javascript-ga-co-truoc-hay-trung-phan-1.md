## Con gà và quả trứng
### Vấn đề
Nhầm lẫn phỗ biến nhất của lập trình viên đến từ các ngôn ngữ khác khi bắt đầu với Javascript đó là:
>  Code javascript được execute từng dòng một, từ trên xuống dưới.

Ồ, không phải chứ, điều nay nó rõ như một cộng một bằng hai mà? 
Tuy nhiên, hãy cùng xem ví dụ sau:
```
foo = 4
var foo
console.log( foo )
```
"Chả cần phải suy nghĩ nhiều, nó sẽ in ra *undefined*, vì biến foo đã bị khai báo lại ở dòng code thứ hai". 

Nếu bạn nghĩ vậy, thì ôi, sai quá rồi, đáp án là 4!

........

Thêm một ví dụ nữa:
```
console.log( foo )
var foo = 4
```
"Là 4! Không ai bị nhầm đến hai lần cả".

Ồ không, thực chất là *underfined*  đó.

"Gì cơ chứ !!????"
### Góc nhìn từ compiler
Khi Javascript compiler nhìn thấy ..
```
var foo = 4
```
.. nó có nghĩa là 
```
var foo
foo = 4
```
"Ờ thì ?"

Khai báo biến luôn được ưu tiên chạy trước. Còn bước nhồi giá trị, khi viết nó ở đâu, khi chạy nó vẫn ở đó.

Như vậy, ví dụ thứ nhất dưới con mắt của compiler sẽ như vầy ..
```
var foo

foo = 4
console.log( foo )  // 4
```
Và ví dụ sau đó sẽ như nầy ..
```
var foo

console.log( foo )  // undefined
foo = 4
```
### Chốt
Như vậy, quả trứng (declaration - hay khai báo) được sinh ra trước con gà (assignment - nói một cách không chuyên đó là đút giá trị vào biến).

Javascript compiler luôn tách và chạy declaration trước và điều này sẽ gây ra nhiều khó chịu mỗi khi debug nếu bạn không thực sự hiểu cách vận hành của Javascript.

Hành vi này của Javascript được gọi là __Hoisting__, dịch ra là cẩu lên, cẩu hết, cẩu tất mọi khai báo lên đầu.

Ớ vậy thì điều này cũng đúng với function chứ? Chúng ta sẽ cùng tìm hiểu ở phần 2 ..  *còn tiếp..*