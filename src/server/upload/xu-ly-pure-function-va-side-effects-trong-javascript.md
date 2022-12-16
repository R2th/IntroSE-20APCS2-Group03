# Pure Function là gì?
Có bao nhiêu bạn đang đọc bài viết này của mình thực sự hiểu rõ về thuật ngữ ***Pure function***.
* *Pure function*: là nguyên tắc trong functional programing, được định nghĩa là 1 hàm có đầu ra chỉ được xác định bởi tham số truyền vào của chúng, nếu tham số truyền vào giống nhau thì hàm sẽ trả về các kết quả giống nhau và đặc biệt nó không làm thay đổi dữ liệu bên ngoài phạm vi của nó.
Để hiểu rõ hơn thì sẽ đưa ra ví dụ cực đơn giản:
```javascript
function increase(n) {
    return n + 1;
}
```
Hàm `increase()` không bị phụ thuộc vào biến bên ngoài nếu bạn nó chạy hàm này 100 hay thậm trí 1 triệu lần với tham số n giống nhau thì nó vẫn đưa ra các kết quả hoàn toàn giống nhau (truyền vào 1 thì trả về luôn luôn là 2).
# Side Effects
Side Effects xẩy ra khi ta tác động thứ gì đó vào bên trong hàm khiến cho bên ngoài hàm cũng bị tác động vào ngược lại (trừ khi hàm gọi tới là *pure function*)
Một vài kiểu side effects là chúng ta thường gặp:
* Thay đổi giá trị hay thuộc tính của một hay nhiều biến global.
* Hiển thi dữ liệu ra màn hình.
* Viết hoặc tạo một file.
* Tạo HTTP request.
* Lưu dữ liệu về database.
* Gọi một function có side effects.
* Thay đổi DOM.
* Gọi hàm `Math.random()`.
* ...
## Kết luận
Vậy thì bất kể những hành động gì gây ra sự thay đổi về trạng thái hay tính chất số lượng đều được gọi là `side effects`.
# Đi sâu hơn về Pure Function trong Javascript
Cùng đi sâu vào tìm hiểu:
```javascript
let exampleNumber = 1337;
let number = new Object();
function setNumber(number) {
    number.example = exampleNumber;
}
```
Đây là một ví dụ rất điển hình cho hàm không thuần khiết bởi nó có những yếu tố sau:
* Nó đã làm thay đổi trạng thái của object `number` được truyền vào như 1 tham số.
* Hàm đã thực hiện việc đặt giá trị `number.example` thành giá trị của mội biến ngoài hàm.
## Sử dụng Pure Function sẽ dễ dàng kiểm soát hơn
Chúng ta nên chắc chắn rằng việc hàm đó có thực sự gây ảnh hưởng gì đến trạng thái của chương trình hay không. Sử dụng *Pure function* để hạn chế việc thay đối của trạng thái không cục bộ.
```javascript
     const reversed = arr.reverse();
     const joined = reversed.join();
     window.joined = joined;
 }
```
Bây giờ hãy gọi hàm này:
```javascript
let figureArray = ['Naruto', 'Sasuke', 'Sakura'];
reverseAndJoin(figureArray);
```
Và kết quả khi chúng ta gọi hàm thì `figureArray` đã bị thay đổi. Việc này là ảnh hưởng đến chương trình nếu trong chương trình của chúng ta có một hàm khác cũng sử dụng đến `figureArray` nó đã gây ra việc lỗi chương trình chạy không mong muốn.
Việc tái cấu trúc của một biến là không gây ra việc thay đổi trạng thái của một biến đã truyền vào thì ta nên sử dụng return để trả về kết quả khi gọi hàm đó:
```javascript
function reverseAndJoin(arr) {
     const reversed = arr.reverse();
     return reversed.join();
 }
 let figureArray = ['Naruto', 'Sasuke', 'Sakura'];
 let reversedArray = reverseAndJoin(figureArray);
```
Đều này là vô cùng dễ hiểu khi hàm *Pure function* này đã không hàm thay đổi trạng thái của `figureArray` . Việc tối nhất chúng ta có thể làm đó là giữ nguyên quy ước của các trạng thái trong chương trình.
## Tận dụng tốt hơn trong các kĩ thuật lập trình bổ sung (additional functional programming technique)
Bằng cách sử dụng các *Pure function*, việc tái sử dụng lại là vô cùng hữu hiệu. Chương trình chạy tốt khi người xây dựng hàm và sử hàm hiểu đúng chức năng vào công dụng của nó, trong nhiều trường hợp ta còn có thể tái sử dụng ở các chương trình khác với chức năng bổ sung tương tự.
## Pure function nó thể được lưu trong bộ nhớ
Việc truyền vào cùng một tham số với cùng giá trì thuộc tính việc gọi hàm nhiều lần có thể dược lưu trữ lại bộ nhớ đệm và khi ta gọi hàm thì hàm sẽ return lại giá trị trong bộ nhớ đệm đó.
```javascript
function factorialNumber(n) {
    //Việc tính toán n*(n-1)*(n-2)*(n-3)* ... *3*2*1;
    return valueCaculated;
}
```
Việc tính toán giai thừa là rất đơn giản, chương trình đầu tiên chúng ta gọi `factorialNumber(50)` máy tính sẽ thực hiện phép tính hộ chúng ta.
Oh nhưng lần thứ 2 khi ta thực hiện phép tính `factorialNumber(51)` . Máy tính một lần nữa thực hiện tính toán, nhưng nhận thấy rằng chúng ta đã lặp lại một số bước có thể tránh được. 
```javascript
factorialNumber(51) = factorialNumber(50) * 51
```
Nhưng function lại được viết để chạy như này😁
```javascript
factorialNumber(51) = 51*50*49*48* ... *3*2*1;
```
Mình sẽ không đi sâu về phần này, đây chỉ là một ví dụ cơ bản để chúng ta hiểu được thêm về *Pure function* . Để hiểu rõ hơn về sử dụng cache trong *Pure function* mình sẽ để bài viết tìm hiểu rõ ở cuối bài viết này.
## Các Pure Function có thể chạy được song song
Như ta được biết thì môi trường Javascript là một luồng và không đồng bộ. Tuy nhiên với *Pure function* ta có thể chạy trên luồng song song mà không làm ảnh hưởng đến chương trình.
# Tuy nhiên
Không phải mọi chức năng chúng ta cũng dùng đến *Pure function* . Nếu không có side effects làm sao ta có thể thao tác với DOM, cập nhật database, gọi HTTP request... Điểm mấu chốt chính là việc chúng ta tổ chức code trong chương trình sao cho hợp lí.
# Tổng kết
Trong bài viết này mình đã đi sơ lược nhưng cũng khá chi tiết để hiểu được Pure function lợi ích của việc sử dụng và sử dụng khi nào.
Việc hiểu rõ về *Pure function* giúp chúng ra khá nhiều và tối ưu hóa tốt trong tổ chức code Javascript.
## Tham khảo thêm:
[https://github.com/getify/Functional-Light-JS]([https://github.com/getify/Functional-Light-JS)
[https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/](https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/)
<br>
[https://blog.bitsrc.io/understanding-javascript-mutation-and-pure-functions-7231cc2180d3](https://blog.bitsrc.io/understanding-javascript-mutation-and-pure-functions-7231cc2180d3)