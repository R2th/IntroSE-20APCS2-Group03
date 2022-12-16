### Mở đầu
Trong Javascript thì function được coi là first-class objects, điều này có nghĩa function cũng là một loại Object nên ta có thể sử dụng nó giống như các object bình thường khác. Chúng ta có thể lưu trữ function trong một biến, truyền tham số là một function, return một function (closure function). Tất cả đều rất hay phải không các bạn, tuy nhiên nhưng trong phạm vi bài này chỉ đề cập đến cách truyền tham số là một function, hay còn gọi là callback function.
### 1.Callback function là gì?<br>
Callback function có thể được hiểu nôm na là một function A được truyền vào một function B thông qua danh sách các tham số của B. Lúc này tại hàm B sẽ gọi đến hàm A để thực hiện một chức năng nào đó mà A đang nắm giữ. Javascript là một ngôn ngữ lập trình hướng sự kiện và bất đồng bộ nên callback function đóng vai trò rất quan trọng, bạn sẽ truyền một callback function vào các sự kiện và xử lý bất đồng bộ đó. <br>
Sau đây là một ví dụ về callback trong javascript:
```js
document.addEventListener("click", function() {
    console.log('this is a callback function');
});
```

Việc sử dụng callback function phải hết sức cẩn thận, bạn phải tuân thủ đúng nguyên tắc mà hàm đó đưa ra, có hàm sẽ truyền thêm tham số cho hàm callback và có hàm thì không. Sau đây là một ví dụ về hàm forEach, hàm này sẽ có tác dụng lặp một mảng và có hai tham số callback function. Mỗi vòng lặp sẽ truyền hai tham số vào hàm cakback function, tham số thứ nhất đó là giá trị của phần tử đang lặp, tham số thứ hai đó là vị trí (index) của phần tử đó. <br>
```js
// Mảng            
var keywords = [1, 2, 3, 4, 5];

// Lặp qua từng phần tử và xử lý trong hàm callback
keywords.forEach(function (value, index){
    console.log(index ". " + value);
});
```
Ok bây giờ chắc hẳn bạn đã biết callback function là gì rồi phải không nào, nếu vậy thì ta qua phần 2 tìm hiểu cách hoạt động của nó nhé. <br>
### 2. Cách Callback Function hoạt động
Một hàm hỗ trợ callback function thì chắc chắn trong code xử lý của nó sẽ có gọi đến để thực thi hàm callback đó, nhưng vấn đề nó gọi tại vị trí nào trong hàm là điều chúng ta không hề biết, trừ khi chúng ta tự viết nó. Như ở phần callback là gì mình có đưa ra một số ví dụ về truyền tham số cho callback function, các tham số này sẽ phụ thuộc vào hàm cha (hàm xử lý chính), nếu hàm cha cho phép bạn truyền 3 tham số thì bạn chỉ được truyền 3 tham số, nếu bạn truyền nhiều hơn thì cũng không có tác dụng gì.
Để dễ hiểu hơn mời bạn xem ví dụ dưới đây:
```js
function upperCaseName(name) {
    return name.toUpperCase();
}

function showName(param, callbackFunction) {
    alert('Xin Chao ' + callbackFunction(param));
}

showName('Nam', upperCaseName);
```
### 3. Nguyên tắc khi thực hiện callback function
**3.1 Phải chắc chắn tham số truyền vào là một function** <br>
Điều này rất quan trọng bởi nếu bạn không kiểm tra giá trị mà người dùng truyền vào là một `function` thì bạn không thể thực thi được, đây là sự khác biệt giữa một lập trình viên non kinh nghiệm và nhiều kinh nghiệm. Xem ví dụ dưới đây để hiểu về cách kiểm tra
```js
function createPassword(callback) {
    if (typeof callback !== 'function'){
        alert('Bạn phải truyền vào là một function');
        return false;
    }
    // do something
}
```
Thông qua ví dụ này ta thấy để kiểm tra một biến có phải là function hay không thì ta sử dụng  `typeof`, nếu `typeof` có giá trị là "function" thì đó là một `function`. <br>
**3.2 Cẩn thận với this khi hàm callback nằm trong object** <br>
Hàm được xây dựng trong Object là hàm được định nghĩa thông qua key của object và giá trị của key là một hàm. <br>
Ví dụ:
```js
var person = {
    name: 'Nam'
    setName : function (name) {
        this.name = name;
    }
}
```
Theo đúng nguyên tắc thì hàm `callback` là một hàm đơn phương nên khi bạn sử dụng từ khóa this trong hàm thì nó sẽ hiểu this lúc này chính là đối tượng **Window Object**, vì vậy cho dù bạn định nghĩa hàm `callback` nằm trong một `object` thì không thể truy cập đến dữ liệu của `object` thông qua từ khóa **this**. <br>
Bạn hãy xem code ví dụ ở dưới để dễ hiểu hơn:
```js
var person = {
    name: 'Nam',
    setName : function (name) {
        // giá trị này sẽ không có tác dụng với key name trong object này
        // nếu như ta sử dụng nó là một callback function
        this.name = name;
    }
}

// Hàm có tham số callback
function test(callback) {
    callback('Nguyen Van Nam');
}

// Gọi đến hàm và truyền hàm callback vào
test(person.setName);

// Kết quả là 'Nam', tức là hàm callback setName đã ko tác động
// gì tới thuộc tính name
console.log(person.name);

// kết quả Nguyen Van Nam, tức đối tượng window đã tự tạo ra một key name 
// và giá trị của nó chính là giá trị ta đã sét trong hàm setName
// => this chính là window object
console.log(window.name);
```
**3.3 Khắc phục this khi hàm callback nằm trong object** <br>
Ở phần trên mình đã đưa ra lưu ý khi sử dụng this trong hàm callback thì this sẽ trỏ tới đối tượng **window** chứ không phải đối tượng chứa hàm `callback`, vậy có cách nào khắc phục tình trạng này không? Có đấy, chúng ta sẽ sử dụng phương thức apply của hàm `callback`. Cú pháp như sau:
```js
// Trước đây
callback(var1, var2, ...);
 
// Bây giờ
callback.apply(callbackObject, [var1, var2, ... ]);
```
Dưới đây là đoạn code khắc phục lỗi ví dụ phía trên:
```js
var person = {
    name: 'Nam',
    setName : function (name) {
        // giá trị này sẽ không có tác dụng với key name trong object này
        // nếu như ta sử dụng nó là một callback function
        this.name = name;
    }
}

// Hàm có tham số callback
function test(callback, callbackObject) {
    callback.apply(callbackObject, ['Nguyen Van Nam']);
}

// Gọi đến hàm và truyền hàm callback vào
test(person.setName, person);

//Kết quả: Nguyen Van Nam
console.log(person.name);
```
### 4. Tham khảo
[https://viblo.asia/p/callback-function-trong-javascript-bWrZn1QQKxw](https://viblo.asia/p/callback-function-trong-javascript-bWrZn1QQKxw) <br>
[https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)