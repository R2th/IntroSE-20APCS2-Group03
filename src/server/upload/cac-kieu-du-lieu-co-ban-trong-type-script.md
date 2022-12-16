## Các kiểu dữ liệu cơ bản trong TS
TS cung cấp rất nhiều kiểu dữ liệu cho JavaScript(JS). Hiện tại thì JS cũng đã có cũng cấp một số kiểu dữ liệu rồi nhưng TS còn cung cấp nhiều hơn thế nữa ngoài ra TS còn có thể để bạn tạo ra kiểu dữ liệu cho riêng
Để đơn giản chúng ta sẽ bắt đầu với các kiểu dữ liệu cơ bản nhất nhé
### Number
Cũng như là JS thì TS cũng sẽ có kiểu có kiểu dữ liệu number nhưng khác với những ngôn ngữ khác khi kiểu dữ liệu number sẽ được chia nhỏ ra thành các kiểu như Integer, Float hoặc là double thì JS không có những kiểu đó và TS cũng vậy
### String 
Chúng ta có thể khai báo string bằng cách sử dụng các cặp dấu, "", '' và \`\` JS sử dụng string thế nào thì TS cũng như vậy
### Boolean
 Nó sẽ trả về true hoặc flase nó khá là quan trọng trong lập trình nhất là với các câu lệnh như if. Ở trong JS bạn cũng có thể biết về "truthy" và "falsy" tức là một số kiểu dữ liệu khi ép kiểu về bollean thì cho ra giá trị true hoặc flase nhưng trong TS thì không cần vì nó không cung cấp bạn chỉ quan tâm 2 giá trị là true và flase thôi
 ## Cách sử dụng
 Để hiểu rõ hơn về cách sử dụng các kiểu dữ liệu ở trong TS chúng ta sẽ cùng tìm hiểu qua ví dụ sau:
 Bài toán của chúng ta sẽ là: In ra tổng của 2 số 
 Rất đơn giản phải không nào. Chúng ta sẽ có thể làm như thế này trong file TS
 ```
 function add(n1, n2) {
  return n1 + n2;
}

const n1 = 5;
const n2 = 2.8;

const result = add(n1, n2);

console.log(result);
```
Sẽ cho ra kết quả như thế này
![](https://images.viblo.asia/7822a351-c0c5-4719-b9fc-c64333742279.png)
Quá đúng phải không nào nhưng nếu chỉ cần thay đổi một chút chẳng hạn như đổi 5 thành '5'
```
function add(n1, n2) {
  return n1 + n2;
}

const n1 = '5';
const n2 = 2.8;

const result = add(n1, n2);

console.log(result);
```
Kết qủa chúng ta nhận được sẽ là 
![](https://images.viblo.asia/4ef5cdac-636c-4ffc-bbbd-eac76104d734.png)
Đây là kết quả của việc tự động chuyển đổi kiểu dữ liệu của JS khiến cho thay vì cộng 2 số lại với nhau thì JS sẽ thực thi việc nối chuỗi và đây là kết quả mà chúng ta không hề mong muốn. bạn có thể gặp những lỗi này ở JS rất nhiều có thể do input người dùng nhập vào và chúng ta quên đổi nó thành kiểu number, hoặc do chúng ta làm việc nhóm và code của người khác ảnh hưởng đến bạn. Chúng ta có thể hạn chế những nhầm lẫn như thế này một cách rất dễ dàng bằng cách khai báo kiểu dữ liệu cho các parameter, để khi complite sang JS thì sẽ nhận được những cảnh báo để sửa lại code giống như những ngôn ngữ khác. 
```
function add(n1: number, n2: number) {
  return n1 + n2;
}

const n1 = '5';
const n2 = 2.8;

const result = add(n1, n2);

console.log(result);
```

Khi mà chúng ta chạy đoạn code ở trên sẽ nhận được một thông báo như sau 
```
app.ts:8:20 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

8 const result = add(n1, n2)
                     ~~


Found 1 error.
```
Chỉ cần như vậy thôi chúng ta sẽ biết phải thay đổi các input vào như thế nào cho hợp lý
Như vậy chúng ta có thể rút ra là với cú pháp của TS chỉ giúp chúng ta phát hiện các lỗi về kiểu dữ liệu từ đó chúng ta sẽ chủ động kiểm tra các giá trị đầu vào.
### Khai báo kiểu dữ liệu
Kiểu dữ liệu của biến trong TS sẽ được gán ngay khi chúng ta tạo biến và chúng ta sẽ nhận một thông báo nếu thay đổi kiểu dữ liệu giữa chừng bằng cách ghi đè lên nó
```
let number1: number;
number1 = 5;
```
Chúng ta có thể dùng cách này để khai báo kiểu dữ liệu nhưng kiểu này sẽ hơi bị dài dòng ngắn gọn hơn thì chỉ cần viết 
```
let number1 = 5;
```
Chỉ cần như vậy thôi thì TS Compiler sẽ tự động hiểu đó là kiểu dữ liệu number 
![](https://images.viblo.asia/b405481c-d024-459c-9455-042b736cf856.png)
Và nếu chúng ta cố gắng ghi đè lên biến number1 bằng một kiểu giá trị khác thì sẽ có một thông báo xuất hiện như này:
![](https://images.viblo.asia/11c79add-3aa4-44d5-b38d-924e4aeae82a.png)
Và khi compile tất nhiên sẽ báo lỗi và không thể compile được
Đây chính là nhiệm vụ cốt lõi của TS kiểm tra kiểu dữ liệu xem có trùng với kiểu dữ liệu được khai báo hay không, nếu không nó sẽ thông báo cho chúng ta.
Ngoài các kiểu dữ liệu này ra thì chúng ta còn rất nhiều kiểu dữ liệu nữa ở trong TS như Object, Array, Tuples, Enums, Any. Mọi người hãy chờ những phần sau để cùng mình tìm hiểu những kiểu dữ liệu này nhé 
## Tài liệu tham khảo
https://www.youtube.com/watch?v=BwuLxPH8IDs&t=1208s