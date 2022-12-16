Nếu bạn chỉ mới bắt đầu làm quen với `JavaScript`, có thể bạn đã nghe nhiều tới thuật ngữ `hoisting`. Vậy Hoisting là gì? Nó hoạt động như thế nào? Hoisting hàm (`function`) và biến (`variable`) khác nhau ra sao? Chúng ta cùng tìm hiểu nhé ;)
## Hoisting là gì?
`Hoisting` là hành động mặc định của JavaScript. Khi JavaScript biên dịch mã code, tất cả các khai báo biến sử dụng từ khóa `var` đều được nâng lên trên cùng của phạm vi  `scope` `hàm`/`local` của chúng nếu nó được khai báo bên trong một hàm; hoặc lên trên phạm vi `toàn cục` nếu được khai báo bên ngoài hàm, bất kể nơi thực hiện khai báo thực tế ở đâu. <br><br>
Nói đơn giản là, một biến có thể được khai báo sau khi được sử dụng.<br>
Các khai báo hàm cũng được nâng lên, nhưng chúng đi lên trên cùng, vì vậy sẽ ở trên tất cả các khai báo biến.
## Hoisting hoạt động như thế nào?
Xét ví dụ: 
```javascript
console.log(myName);
var myName = ‘Thom’;
```
Bạn nghĩ `console.log` sẽ xuất ra cái gì?
1. ***Uncaught ReferenceError: myName is not defined***
1. ***Thom***
1. ***undefined***

Câu trả lời chính xác là 3.
![](https://images.viblo.asia/ac134f6e-fc9e-4b4c-950e-858b8eaccf92.png)

Như chúng ta đã nói trước đó, các biến được chuyển lên đầu `scope` của chúng khi `JS` biên dịch `runtime` (trừ khi sử dụng `NodeJS` - ở mức rất cơ bản có nghĩa là trang web đang tải). Tuy nhiên, một điều quan trọng cần lưu ý là: điều duy nhất được di chuyển lên trên cùng là khai báo biến, chứ không phải giá trị thực được gán cho biến.<br><br>
Cùng làm rõ hơn, giả sử chúng ta có một đoạn code và có `var myName = 'Thom';` ở `dòng 32`. 
Khi JS được biên dịch, `var myName;` sẽ được chuyển lên đầu phạm vi của nó, trong khi `myName = 'Thom';` sẽ ở lại `dòng 32` (hoặc có thể là `dòng 33` nếu `var myName;` được nâng lên trên `dòng 1`).<br> <br>
Với ý nghĩ đó, hãy nhìn vào cùng một đoạn mã từ trước, nhưng hãy xem cách trình biên dịch JavaScript output khi chạy:

![](https://images.viblo.asia/5ebc44f3-f3d4-4cbc-9969-a087c44ce245.png)

Đây là lý do tại sao `console.log` có output là `undefined`, vì nó nhận ra rằng biến `myName` tồn tại, nhưng `myName` chưa được gán giá trị cho đến dòng thứ ba.<br><br>
Chúng ta cũng đã đề cập qua trước rằng: các hàm cũng được `hoisted`, nhưng lên trên cùng - phía trên nơi khai báo biến được nâng lên.<br><br>
Xem ví dụ sau:
```javascript
function hello() {
  console.log('Hello ' + name);
};
hello();
var name = 'Ha';
```
Lệnh gọi hàm `hello()` sẽ vẫn trả về `undefined`.

![](https://images.viblo.asia/8aac5020-7430-4161-81e7-7e18072ac0f9.png)

Thực tế trình thông dịch `JavaScript` sẽ biên dịch thành các phần sau trong khi chạy:
```javascript
function hello() {
  console.log('Hello ' + name);
};
var name;
hello();
name = 'Ha';
```
Vì vậy, tại thời điểm hàm được gọi, nó biết rằng có một biến được gọi là `name`, nhưng biến đó chưa được gán giá trị. <br><br>
`Hoisting` là lý do tại sao đôi khi bạn sẽ bắt gặp các đoạn mã có các biến được khai báo ở trên cùng, và sau đó được gán giá trị ở dưới. Đoạn mã này chỉ đơn giản là cố gắng làm gần giống với cách trình thông dịch sẽ biên dịch nó để giúp `giảm thiểu` bất kỳ lỗi nào có thể xảy ra.
## Kết luận
1. `Hoisting` là hành động `chuyển` phần khai báo biến hoặc hàm lên trên (top).
2. Thứ `được di chuyển` lên trên cùng là phần khai báo, chứ không phải phần giá trị thực được gán.
3. Phần khai báo `hàm` được đưa lên trên cùng, trên cả phần khai báo `biến`.