-----

# Giới thiệu
Xin chào mọi người ! Hôm nay mình xin chia sẻ về ES6 trong thời gian tìm hiểu về nó mình cảm thấy thích thú về những thay đổi hay ho của ES6 =)) . Khả năng văn vẻ  của mình đọc có lủng củng  =)) nên có gì còn thiếu sót mong mọi người thông cảm và góp ý giúp mình nhaaa . Thôi đi vào vấn đề nhỉ hihi :D.
# Es6 là gì ? 
ECMAScript 2015 hay còn được gọi là ES6 là một đặc tả ngôn ngữ kịch bản được tiêu chuẩn hóa bởi ECMAScript International . Nó được sử dụng bởi các ứng dụng phái **client-side**  . Các ngôn ngữ như JavaScript, Jscript và ActionScript được điều chỉnh bởi thông số kỹ thuật này. Hướng dẫn này giới thiệu cho bạn về triển khai ES6 trong JavaScript . 

# Những yêu cầu tối thiểu để ta có thể bắt đầu với Es6 
Trước tiên bạn cần có kiến thức cơ bản về **javascript** Và có **trình duyệt** xịn xò với phiên bản mới nhất nha .

# Các tính năng nổi bật làm chúng ta đam mê của ES6
## 1. Block Scope
Là phạm vi chứa tất cả những đoạn code nằm bên trong cặp thẻ {}. Ví dụ dưới đây mình sẽ chỉ cho mọi người biết các khi dùng **var** và **let** sao cho tối ưu .
```js
var a = 10;
var b = 20;
if ( a < b) {
	var abc = a;
	a = b;
	b = abc;
} 
console.log("a :" + a);
console.log("b :" + b);
console.log("abc :" + abc);

~~ kết quả trả về là : a :20 ,b: 10, abc = 10  ~~

```
sau đây khi chúng ta thay **var** ở trong **if** thành **let** thì kết quả trả về câu lệnh **console.log("abc :" + abc);** 
sẽ báo lỗi =)) không tin bạn thử paste vào console trên brower chạy luôn :D ;

như ở trên mình nói kết quả của câu  **console.log("abc" + abc);**  báo lỗi là vì **let** chỉ tồn tại trong 1 block ra khỏi là nó không thể sử dụng được nữa . còn **var** thì chiếm tốn tài nguyên nên chúng ta nên cân nhắn trong trường hợp nào nên sử dụng var or let cho hợp lý và tối ưu nhất .

## 2. Arrow Functions

 Arrow function chắc chắn là một trong những tính năng phổ biến hơn của ES6 chúng ta sẽ đi vào ví dụ cụ thể để dễ hiểu hơn khi sử dụng dấu => trong **Arrow function** .
so sánh 1 chút về hàm được viết ở ES5 và ES6
hàm đươc viết ở ES5
> function timesTwo(params) {  return params * 2}<br>
> timesTwo(4);<br>
> // 8
<br>

Và bây giờ ở ES6 ta cảm thấy dễ chịu hơn khi đọc dòng code khai báo một hàm với một tham số và sử dụng dấu => <br>
> var timesTwo = params => params * 2 <br>
> timesTwo(4); <br>
> // 8
 
*rất ngắn gọn phải không nào các bạn có thể tham khảo thêm **Arrow Functions** nhiều hơn ở [link](https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/) này nha* .

## 3. Extended Parameter Handling
**Default Parameter Values** là giá trị tham số mặc định khi truyền giá trị vào các hàm . Ở ES5 đã cung cấp sẵn cho chúng ta, tuy nhiên người ta cảm thấy cách tạo giá trị mặc định trong ES5 vẫn không hay ho nên họ đã bổ sung một cách khác mới hơn và đơn giản hơn rất nhiều trong ES6.

Ví dụ với ES5 ta sử dụng || để  set mặc định như sau : 

```js
function addNewStudent (name, age, class, address)  {
   return  {
        name = name || 'Quang Anh',
        age = age || '18 tủi',
        class = class || 'Human',
        address = address || 'HN'
   }
}
```

Còn ở ES6 ta có thể truyền giá trị trên parameter như sau : 

```js
function addNewStudent (name = 'Quang Anh', age = '18 tủi', class = 'Human', address)  {
   return  {
        name,
        age,
        class,
        address
   }
}
```

## 4. Template String
Trước đây js không có **string.fomat** do đó cộng chuỗi bằng tay rất mệt . giờ chúng ta có **Template String** , không cần mất công cộng chuỗi nữa code rõ ràng hơn rất nhiều khi sử dụng 2 dấu `` 

```js
var name = "Quang Anh", food = "Thịt chó" ;
console.log(`Xin chao ${name}, bạn có thích ăn ${food} không ?`) ;
```
*rất gì và này nọ phải không nào  (ahaha)*.

## 5. Multi-line Strings

Với ES5 khi muốn xuống dòng phải sử dụng  syntax "\n\t" mỗi lần cộng chuỗi xuống dòng để code dễ nhìn thì chúng ta đau mắt lắm phải không .

```js
var bemo = 'làm sao để tăng cân, \n\t'
                    + 'làm sao để có bo đỳ 6 múi, \n\t'
                    + 'à hí ! không biết '
``` 

Còn với ES6 thì nó phải gọi là đơn giản dễ chơi và đam mê hơn nè ! 
```js
var bemo = `làm sao để tăng cân,
            làm sao để có bo đỳ 6 múi,
            à hí ! không biết`
```

## 6.  Promise 
Promise  được đưa vào Javascript từ ES6 . Là một kĩ năng nâng cao để xử lý việc bất đồng bộ hiệu quả hơn . Trước đay kết qủa của một tác vụ đồng bộ và bất đồng bộ sẽ trả về kiểu dữ liệu hoặc một Callback Function . Thực hiện một callback function thì sẽ dễ sảy ra lỗi Callback Hell.nghĩa là gọi call back khá nhiều lần và lồng nhau dẫn đến không kiểm soát được chương trình và không đủ bộ nhớ để hoạt động . Vì vậy một package được đưa vào ES6 để giải quyết vấn đề này . 
    Promise sinh ra để xử lý kết quả một hành động cụ thể kết quả của mỗi hành động sẽ là thành công hoặc thất bại và Promise sẽ giúp chúng ta trả lời câu hỏi `Nếu thành công thì làm gì ?` và `Nếu thất bại thì làm gì ?` . Cả 2 hành động này ta gọi cụ thể là 1 hành động gọi lại **( Callback action )** . 
Chúng ta cùng đi vào ví dụ cụ thể nhé =)) dài dòng quá rồi ! 

> Ví dụ : khi load 1 hình ảnh có sự kiện ready() ta sẽ áp dụng sự kiện này để đổi hình ảnh default nếu như ảnh đó không tồn tại .  

```js
$('img').ready().then(function() {
  // loaded
}, function() {
  // failed
  $(this).attr('src', 'avatarDefault.png');
});
```
 
>  Và nếu ta áp dụng Promise trong Es6 thì nó sẽ đơn giản hơn nhiều nè 
 
```js
Promise.all(['img']).then(function (){
  // all loaded
},function(img){
  $('img').attr('src', 'avatarDefault.png');
});
```


###### Để trả lời cho câu hỏi làm thế nào để để quả lý tốt kết quả của một hành động bất đồng bộ (Async) ? Chúng ta cùng đi tìm hiểu tiếp về Promise nhé ! 

Khi một Promise được khởi tạo thì nó có một trong ba trạng thái sau:
> * Fulfilled: hành động xử lý xong và thành công
> * Rejected: hành động xử lý xong và thất bại
> * Pending: hành động đang chờ xử lý hoặc bị từ chối

<br>
Trong đó hai trạng thái Reject và Fulfilled ta gọi là Settled, tức là đã xử lý xong.

Để tạo 1 promise ta sẽ có cú pháp sau đây :

```js
 var = promise = new Promise(callback);
``` 
 
 Trong đó callback là một function có hai tham số truyền vào như sau:
 
```js
 var promise = new Promise(function(resolve, reject){
     
  });
```

>
>  Trong đó : 
> * resolve là một hàm callback  xử lý cho hành động thành công 
> * reject là một hàm callback xử lý cho một hành động thất bại
>

###### Thenable trong Promise
Thenable nó là một phương thức ghi nhận kết quả của trạng thái **Thành công**  hoặc **Thất bại** mà ta khai báo ở resolve và reject . Nó có 2 tham số truyền vào là 2 callback function Xử lý cho 2 nhiệm vụ thành công và thất bại =)) sẽ đi vào ngay ví dụ dưới đây nhé bạn : 

```js
var promise = new Promise(function (resolve, reject) {
        resolve('Success');
        //OR
        reject('Error');
});

promise.then(function() {
    function(success) {
        //Success
    },
    function(error) {
        //Error
    }
});
```

Demo console trả về kết quả luôn cho bạn thấy :

```js
var promise = new Promise(function(resolve, reject){
    resolve('Success!');
});
 
promise.then(
    function(success){
        console.log(success);
    }
);
```

Với đoạn code này chạy lên bạn sẽ nhận giá trị là Success !

![](https://images.viblo.asia/55c499f9-79e6-4d35-8f37-62de6f60570e.png)

Bây giờ ta thử với một đoạn Reject.

```js
var promise = new Promise(function(resolve, reject){
    reject('Error!');
});
 
 
promise.then(
    function(success){
        console.log(success);
    },
    function(error){
        console.log(error);
    }
);
```

Chạy đoạn code này lên sẽ nhận giá trị là Error!.

![](https://images.viblo.asia/b172d990-6aa5-4ab0-b88e-10120ecd2a9c.png)

vậy hai hàm trong **then** chỉ xảy ra một trong hai trường hợp nhưu ta sử dụng truyền vào param là resolve , reject . Nếu ta khai báo cả hai thì nó chỉ nhận giá trị đầu tiên thôi . 

ví dụ luôn nhé : 

```js
var promise = new Promise(function(resolve, reject){
    reject('Error!');
    resolve('Success!');
});
 
 
promise.then(
    function(success){
        console.log(success);
    },
    function(error){
        console.log(error);
    }
);
```

Kết quả trả về là các bạn biết rồi đúng không =))) ? 

![](https://images.viblo.asia/74b7b10d-faa6-4bf6-939f-bafe0c22152a.png)


##### Catch trong Promise

Hàm then() có hai 2 tham số callback là success và error nhưng bạn cũng có thể sử dụng hàm **catch** để bắt lỗi :

` 
promise.then().catch();
`


##### Ví dụ 

```js
var promise = new Promise(function(resolve, reject){
    reject('Error!');
});
 
 
promise.then(function(message) {
        console.log(message);
    }).catch(function(message) {
        console.log(message);
    });
        
```

Run sẽ có kết quà là Error!

![](https://images.viblo.asia/02e23260-e2a3-43d2-9e1e-30343147e591.png)

> Promise là một gói dùng để quản lý kết quả trả về của một hành động Asycn (bất đồng bộ) và nó vừa được bổ sung vào ngôn ngữ Javascript từ version ES6. Việc nắm vững Promise không hề đơn giản và không phải ai cũng hiểu rõ các bạn có thể tự tìm hiểu thêm nữa về nó nhé ! 
>

## 7. Kết thúc 
Cảm ơn mọi người đã lắng nghe về bài viết của mình ! Mong rằng bài viết sẽ giúp cho các bạn phần nào hiểu thêm về ES6 .