Javascript là một trong những ngôn ngữ phổ biến nhất trong thế giới lập trình, ngôn ngữ không thể thiếu trong lập trình web thậm chí với JS chúng ta có thể code server hay cả mobile. Với Javascript chúng ta có thể tạo từ một alert đơn giản trên trình duyệt cho đến việc dùng nó điều khiển một con robot(sử dụng Nodebot & Nodruino).

Nếu các bạn đã từng gặp những hoàn cảnh trớ trêu khi code JS thì đừng nản chí, bởi vì nó là một mớ hỗn độn mà (facepalm).

![](https://images.viblo.asia/a29f0ab2-8759-4fb9-afd8-55e12ab92cce.png)

Và hãy thông cảm cho JS bởi nó đã được sinh ra trong một hoàn cảnh trớ trêu như thế  này:

![](https://images.viblo.asia/a6d2c89a-4b56-41fd-9cc4-2eda512b5ed2.png)

Trong phạm vi bài viết này, Mình sẽ chia sẻ một bộ các thủ thuật về Javascript và các mẫu ví dụ mà ai trong chúng ta khi đụng đến Javascript đều nên biết và áp dụng một lần.

Lưu ý rằng các đoạn code ví dụ trong bài viết này đã được thử nghiệm trong phiên bản Google Chrome 30 trở lên, sử dụng Javascript V8 engine(V8 3.20.17.15)

### 1. Đừng quên từ khóa var khi khởi tạo biến lần đầu tiên
Bởi nếu không khai báo kèm từ khóa var thì việc gán giá trị cho biến đó sẽ tạo ra một biến global.

### 2. Sử dụng ```===``` thay vì dùng ```==```
Toán tử == (hoặc !=) sẽ tự động gán kiểu nếu cần. Trong khi đó, toán tử === (hoặc !==) sẽ không tự động thực hiện bất kỳ chuyển đổi nào. Nó thực hiện so sánh bởi cả giá trị và kiểu của dữ liệu.
Cùng xem ví dụ sau:
```javascript
[10] === 10    // false
[10]  == 10    // true
'10' == 10     // true
'10' === 10    // false
 [] == 0     // true
 [] === 0     // false
 '' == false   // => true nhưng true == "a" => false
 '' === false // false 
````

### 3. undefined, null, 0, false, NaN, ''(chuỗi rỗng) tất cả đều là falsy values

Trong Javascript chúng ta có thể phân biệt 2 kiểu giá trị đó là falsy value và truthy value, falsy value là các giá trị khi ép kiểu về boolean sẽ trả về false, còn truthy thì ngược lại.
Cách đơn giản để ép kiểu về boolean là dùng ```!!```, nếu value đó là falsy thì trả về  false, còn truthy thì ngược lại.
### 4. Sử dụng dấu ```;``` để kết thúc câu lệnh.
Sử dụng dấu ```;``` cuối mỗi dòng lệnh là một điều cần làm, bạn sẽ không bị cảnh báo gì khi bạn không dùng nó, tuy vậy thì nó sẽ được thêm bởi các trình soạn thảo nếu bạn cài thêm tiện ích cho Javascript. Nếu muốn tìm hiểu thêm vì sao, bạn có thể tham khảo tại link sau: http://davidwalsh.name/javascript-semicolons

### 5. Khởi tạo constructor cho đối tượng.

```javascript
function Person(firstName, lastName){
    this.firstName =  firstName;
    this.lastName = lastName;        
}  

var Saad = new Person("Saad", "Mousliki");
```


### 6. Cẩn thận mỗi khi sử dụng ```typeof```, ```instanceof``` và ```constructor```
- ```typeof```: là một toán tử Javascript được sử dụng để trả về một chuỗi là tên kiểu nguyên thủy của một biến, đừng quên là typeof(null) sẽ trả về đối tượng, và đối với phần lớn các kiểu đối tượng khác (Array, Date, ...) cũng sẽ trả về là "object".
- ```constructor```: là thuộc tính của prototype bên trong, nó cũng có thể bị ghi đè.
- ```instanceof```: là một toán tử Javascript khác, nó kiểm tra tất cả prototypes, trả về true nếu hàm tạo nó được tìm thấy và trả về false nếu không tìm được.

Cùng xem ví dụ sau:
```javascript
var arr = ["a", "b", "c"];
typeof arr;   // "object" 
arr instanceof Array; // true
arr.constructor();  //[]
```
### 7. Tạo một Self-calling Function (Một hàm gọi chính nó).
Hàm này cũng được gọi là Self-Invoked Anonymous Function hay Immediately Invoked Function Expression (IIFE).
Nó là một hàm thực hiện tự động khi bạn tạo nó:

```javascript
(function(){
    // code mà bạn muốn chạy tự động
})();
// Ví dụ:
(function(a,b){
    var result = a+b;
    return result;
})(10,20)
```
### 8. Lấy giá trị ngẫu nhiên từ một mảng

```javascript
var items = [12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' , 2145 , 119];

var  randomItem = items[Math.floor(Math.random() * items.length)];
```


### 9. Lấy một số ngẫu nhiên từ một dải số cho trước

```javascript
var x = Math.floor(Math.random() * (max - min + 1)) + min;

```
### 10. Tạo một mảng bởi các số từ 0 đến max

```javascript
var numbersArray = [] , max = 100;

for( var i=1; numbersArray.push(i++) < max;);  // numbersArray = [1,2,3 ... 100] 

```
### 11. Tạo một bộ ngẫu nhiên các ký tự chữ và số

```javascript
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);
}
generateRandomAlphaNum(9)
// => "3rjzsgpmq"

```
### 12. Trộn một mảng các số

```javascript
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
numbers = numbers.sort(function(){ return Math.random() - 0.5});
/* mảng đã được trộn, kết quả: [120, 5, 228, -215, 400, 458, -85411, 122205]  */
```

Có thể bạn chưa biết hàm sort trong JS có thể sắp xếp theo 2 chiều - ASC hay DESC.
- ASC:
```javascript
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
numbers.sort(function(a, b){return a-b});
// [-85411, -215, 5, 120, 228, 400, 458, 122205]
```

- DESC: 
```javascript
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
numbers.sort(function(a, b){return b-a});
// [122205, 458, 400, 228, 120, 5, -215, -85411]
```
Còn trường hợp bạn muốn random thì lựa chọn đơn giản đó là dùng hàm ```Math.random()```(hàm trả về  random một số trong khoảng 0->1) và trừ đi 0.5 để có thể trả về  số  âm hay dương, vì thế mảng được sort cũng sẽ random.
Có một lựa chọn thay thế tốt hơn là triển khai sắp xếp ngẫu nhiên theo mã(ví dụ: mã Fish-Yates), hơn là dùng hàm sắp xếp gốc bởi Javascript. Bạn có thể xem thêm thảo luận [ở đây](https://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling/962890#962890) hoặc [bài viết này](https://bost.ocks.org/mike/shuffle/).

### 13. Chèn một mảng vào mảng khác

```javascript
var array1 = [12 , "foo" , {name: "Foo"} , -2458];

var array2 = ["Bar" , 555 , 100];
Array.prototype.push.apply(array1, array2);
/* array1 trở thành  [12 , "foo" , {name: "Foo"} , -2458 , "Bar" , 555 , 100] */

```



### 14. Chuyển đổi một tham số thành một mảng

```javascript
var argArray = Array.prototype.slice.call(arguments);
```
vi dụ:
```javascript
var a = [1,2,3];
var argArray = Array.prototype.slice.call(a, 1);
console.log(argArray);
// [2,3]
```


### 15. Xác định một tham số truyền vào là một số?
```javascript
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
```

### 16. Xác định một đối số truyền vào là một mảng

```javascript
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

Lưu ý rằng nếu hàm toString() đã bị override, chúng ta không thể trả về đúng kết quả nếu dùng hàm này.

Hoặc dùng:

```javascript
Array.isArray(obj); // đây là một phương thức mới của Array
```

Bạn cũng có thể dùng ```instanceof``` nếu bạn không làm việc với nhiều ngữ cảnh. Truy nhiên nếu bạn làm việc với nhiều ngữ cảnh khác nhau, bạn sẽ nhận được kết quả sai.
Cùng xem ví dụ sau:

```javascript
var myFrame = document.createElement('iframe');
document.body.appendChild(myFrame);

var myArray = window.frames[window.frames.length-1].Array;
var arr = new myArray(a,b,10); // [a,b,10]  

// instanceof sẽ trả về sai kết quả, myArray đã mất đi hàm tạo
// hàm tạo đã không được chia sẻ giữa các ngữ cảnh khác nhau
arr instanceof Array; // false

```

### 17. Lấy các giá trị nhỏ nhất hay lớn nhất trong một mảng các số

```javascript
var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
var maxInNumbers = Math.max.apply(Math, numbers); 
var minInNumbers = Math.min.apply(Math, numbers);

```

### 18. Làm rỗng một mảng

```javascript
var myArray = [12 , 222 , 1000 ];  
myArray.length = 0; // myArray bây giờ tương đương với [].
```

### 19. Đừng sử dụng delete để xóa một thành phần khỏi mảng

Hãy sử dụng ```splice``` thay vì ```delete``` để xóa một item khỏi mảng. Sử dụng ```delete``` sẽ thay thế item bằng ```undefined```/```empty``` thay vì xóa nó khỏi mảng.
Thay vì dùng:

```javascript
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ]; 
items.length; // return 11 
delete items[3]; // return true 
items.length; // return 11 
/* items <=> [12, 548, "a", empty, 5478, "foo", 8852, empty, "Doe", 2154, 119]   */

```
Hãy dùng:
```javascript
var items = [12, 548 ,'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' ,2154 , 119 ]; 
items.length; // return 11 
items.splice(3,1) ; 
items.length; // return 10 
/* items <=> [12, 548, "a", 5478, "foo", 8852, empty, "Doe", 2154, 119]   */

```

Hàm ```delete``` nên được dùng để xóa một thuộc tính của một đối tượng.

### 20. Cắt bớt mảng sử dụng length
Cũng như ví dụ trước, làm rỗng mảng, chúng ta cũng có thể dùng ```length``` để xén bớt một mảng.

```javascript
var myArray = [12 , 222 , 1000 , 124 , 98 , 10 ];  
myArray.length = 4; // myArray <=> [12 , 222 , 1000 , 124].
```

Trường hợp bạn sử dụng length với giá trị lớn hơn độ dài mảng này thì các item ```undefined``` sẽ được thêm vào.
***Độ dài của mảng trong Javascript không phải là một thuộc tính chỉ đọc.***

### 21. Sử dụng AND/OR cho biểu thức điều kiện.

```javascript
var foo = 10;  
foo == 10 && doSomething(); // nếu foo == 10 thực hiện hàm Something(); 
foo == 5 || doSomething(); // nếu (foo != 5) thì doSomething();

```

Logic OR cũng nên được sử dụng để đặt giá trị mặc định cho tham số truyền vào của hàm.


```javascript
function doSomething(arg1){ 
    arg1 = arg1 || 10; // arg1 sẽ nhận giá trị 10 nếu nó chưa được khai gán trước đó.
}
```
### 22. Sử dụng phương thức ```map()``` cho vòng lặp của một mảng

```javascript
var squares = [1,2,3,4].map(function (val) {  
    return val * val;  
}); 
// squares <=> [1, 4, 9, 16] 
```

### 23. Làm tròn số

```javascript
var num = 2.443242342;
num = num.toFixed(4);  // num nhận giá trị mới: "2.4432"

```
Lưu ý rằng hàm toFixed() trả về một chuỗi string, không phải là một số. Bạn cần parse nó nếu muốn nhận giá trị mới là một số.

### 24. Vấn đề dấu chấm động

```javascript
0.1 + 0.2 === 0.3 // is false 
9007199254740992 + 1 // tương đương 9007199254740992  
9007199254740992 + 2 // tương đương 9007199254740994
```

Tại sao lại ```0.1 + 0.2 === 0.3 // => false```? 0.1 + 0.2 bằng 0.30000000000000004. Những gì bạn cần biết là tất cả các bộ số trong Javascript là các số thực dấu chấm động được biểu diễn theo bộ nhị phân 64 bit, chuẩn IEEE 754. Bạn có thể tìm hiểu thêm ở [link](http://www.2ality.com/2012/04/number-encoding.html) 

Bạn có thể dùng ```toFixed()``` và ```toPrecision()``` để giải quyết vấn đề  trên.


### 25. Kiểm tra thuộc tính của một đối tượng khi sử dụng vòng lặp for-in

Đoạn mã sau sẽ hữu ích khi bạn muốn tránh lặp qua các thuộc tính từ prototype của đối tượng.


```javascript
for (var name in object) {  
    if (object.hasOwnProperty(name)) { 
        // do something with name                    
    }  
}

```

### 26. Toán tử comma(dấu ```,```)

Trong Javascript, toán tử comma cũng tương tự trong C++, nó dùng gộp các phép toán lại với nhau, theo thứ tự phân cách bởi dấu ```,```

```javascript
var a = 0; 
var b = ( a++, a + 99 ); 
console.log(a);  // 1 
console.log(b);  // 100
```


### 27. Lưu các biến cần tính toán hay cần truy vấn

Trong khi sử dụng Jquery selector, chúng ta nên tạo biến lưu các thành phần DOM.

```javascript
var navright = document.querySelector('#right'); 
var navleft = document.querySelector('#left'); 
var navup = document.querySelector('#up'); 
var navdown = document.querySelector('#down');
```

### 28. Hãy xác định cụ thể tham số nào đó trước khi cho nó vào hàm ```isFinite()```

Hãy xem ví dụ sau để xem các giá trị trả vể của hàm ```isFinite()``` nhé:


```javascript
isFinite(0/0) ; // false 
isFinite("foo"); // false 
isFinite("10"); // true 
isFinite(10);   // true 
isFinite(undefined);  // false 
isFinite();   // false 
isFinite(null);  // true  !!! 
```

### 29. Không sử dụng chỉ số âm cho arrays

```javascript
var numbersArray = [1,2,3,4,5]; 
var from = numbersArray.indexOf("foo") ;  // from = -1 
numbersArray.splice(from,2);    // [5]
```

Hãy chắc chắn rằng tham số truyền vào hàm ```splice()``` không phải là số âm.

### 30. Serialization và deserialization (với dữ liệu dạng JSON)


```javascript
var person = {name :'Saad', age : 26, department : {ID : 15, name : "R&D"} }; 
var stringFromPerson = JSON.stringify(person); 
/* stringFromPerson tương đương "{"name":"Saad","age":26,"department":{"ID":15,"name":"R&D"}}"   */ 
var personFromString = JSON.parse(stringFromPerson);  
/* personFromString bây giờ tương đương person  */
```

### 31. Tránh sử dụng eval() hay hàm tạo của Function nhiều

Việc dùng  hàm tạo hay hàm eval() sẽ tiêu tốn nhiều tài nguyên bởi mỗi lần gọi nó là mỗi lần các công cụ biên dịch phải chuyển đổi mã nguồn thành mã thực thi.

```javascript
var func1 = new Function(functionCode);
var func2 = eval(functionCode);

```



### 32. Tránh sử dụng ```with()```

Sử dụng ```with()``` sẽ chèn thêm biến toàn cục, vì thế nếu có một biến cùng tên có thể gây nhầm lẫn và bị ghi đè.

### 33. Không nên sử dụng for-in cho mảng
Thay vì sử dụng:
```javascript
var sum = 0;  
for (var i in arrayNumbers) {  
    sum += arrayNumbers[i];  
}
```

Thì cách tốt hơn là:
```javascript
var sum = 0;  
for (var i = 0, len = arrayNumbers.length; i < len; i++) {  
    sum += arrayNumbers[i];  
}

```

```i``` và ```len``` sẽ được khởi tạo một lần bởi vì nó nằm trong câu lệnh đầu tiên của vòng lặp for

```for (var i = 0; i < arrayNumbers.length; i++)```

Tại sao? Bởi độ dài của arrayNumbers được tính toán lại mỗi khi vòng lặp lặp lại.
Lưu ý: Việc tính toán lại độ dài trong mỗi lần lặp đã được cập nhật trong các Javascript engine mới nhất.

### 34. Truyền function vào setTimeout(), setInterval() thay vì truyền chuỗi string vào

Nếu bạn truyền một chuỗi string vào, chuỗi này được xác định với cách tương tự như hàm ```eval()```, là cách chậm hơn.
Thay vì dùng chuỗi: 
```javascript
setInterval('doSomethingPeriodically()', 1000);  
setTimeout('doSomethingAfterFiveSeconds()', 5000);
```
Hãy viết trực tiếp vào

```javascript
setInterval(doSomethingPeriodically, 1000);  
setTimeout(doSomethingAfterFiveSeconds, 5000);
```

### 35. Sử dụng switch-case thay vì dùng if-else

Sử dụng switch-case sẽ nhanh hơn khi có nhiều hơn 2 trường hợp so sánh, và code dễ nhìn hơn. Và cũng nên tránh sử dụng nó nếu bạn có nhiều hơn 10 cases.


### 36. Sử dụng switch-case với dải số
Bạn có thể sử dụng switch-case với dải số.

```javascript
function getCategory(age) {  
    var category = "";  
    switch (true) {  
        case isNaN(age):  
            category = "Sai gía trị rồi :)";  
            break;  
        case (age >= 50):  
            category = "Lớn tuổi";  
            break;  
        case (age <= 20):  
            category = "Thiếu niên";  
            break;  
        default:  
            category = "Bất tử!";  
            break;  
    };  
    return category;  
}  
getCategory(5);  // "Thiếu niên"
```

### 37. Tạo một đối tượng mà prototype của nó là một đối tượng
Chúng ta có thể tạo một đối tượng mà prototype của nó là những kiểu cung cấp như sau:

```javascript
function clone(object) {  
    function OneShotConstructor(){}; 
    OneShotConstructor.prototype= object;  
    return new OneShotConstructor(); 
} 
clone(Array).prototype ;  // []
```

### 38. Hàm escaper HTML

```javascript
function escapeHTML(text) {  
    var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", '"': "&quot;"};                      
    return text.replace(/[<>&"]/g, function(character) {  
        return replacements[character];  
    }); 
}
```


Hàm này có thể dùng trong trường hợp người dùng thêm code html vào trang web:
```javascript
escapeHTML('<div class="abc"></div>')
```
Kết quả trả về sẽ là
```javascript
"&lt;div class=&quot;abc&quot;&gt;&lt;/div&gt;"
```



### 39. Tránh việc dùng try-catch trong vòng lặp

Try-catch tạo thêm một biến mới trong phạm vi hiện tại tại thời gian chạy, mỗi khi mệnh đề try-catch được thực thi, ngoại lệ đã bắt được gán cho một biến.

Thay vì sử dụng:

```javascript
var object = ['foo', 'bar'], i;  
for (i = 0, len = object.length; i <len; i++) {  
    try {  
        // code here 
    }  
    catch (e) {   
        // handle exception  
    } 
}
```
Hãy dùng:
```javscript
var object = ['foo', 'bar'], i;  
try { 
    for (i = 0, len = object.length; i <len; i++) {  
        // code here 
    } 
} 
catch (e) {   
    // handle exception  
} 

```
### 40. Hãy đặt thời gian timeout cho việc chạyAjax(XMLHttpRequest)

Giả sử một ajax call tiêu tốn nhiều thời gian vì có vấn đề về mạng hay vấn đề nào đó. Khi đó bạn nên hủy bỏ gọi ajax bằng hàm ```setTimeout()```

```javascript
var xhr = new XMLHttpRequest (); 
var url = ''
xhr.onreadystatechange = function () {  
    if (this.readyState == 4) {  
        clearTimeout(timeout);  
        // xử lý trả về
    }  
}  
var timeout = setTimeout( function () {  
    xhr.abort(); // gọi hàm báo lỗi  
}, 60*1000 /* timeout after a minute */ ); 
xhr.open('GET', url, true);  

xhr.send();
```

Bạn nên tránh hoàn toàn các hàm ajax đồng bộ.

### 41. Xử lý trường hợp Websocket hết thời gian

Bình thường khi kết nối Websocket đã được xác nhận, server sẽ đặt một thời gian hết hạn kết nối cho kết nối đó trong khoảng 30s nếu nó không hoạt động. Firewall của server cũng  sẽ đặt thời gian timeout sau một quãng thời gian không hoạt động.

Để thay đổi thời gian timeout của server, trong trường hợp bạn không có tương tác gì, sau một thời gian hãy gửi thêm message trống lên server.

Để làm được điều này, thêm 2 hàm sau vào trong code của bạn: một để giữ kết nối, một để hủy kết nối vừa gửi. Nếu sử dụng trick này, bạn có thể kiểm soát thời gian timeout.

- Thêm ```timerId```...


```javascript
var timerID = 0; 
function keepAlive() { 
    var timeout = 15000;  
    if (webSocket.readyState == webSocket.OPEN) {  
        webSocket.send('');  
    }  
    timerId = setTimeout(keepAlive, timeout);  
}  
function cancelKeepAlive() {  
    if (timerId) {  
        cancelTimeout(timerId);  
    }  
}
```


Hàm ```keepAlive()``` cần được thêm vào cuối của hàm ```onOpen()``` của kết nối websocket, và chèn hàm ```cancelKeepAlive()``` vào cuối cùng của hàm ```onClose()```.

### 42. Hãy luôn nhớ rằng toán tử nguyên thủy của Javascript có thể nhanh hơn việc gọi hàm.

Hãy sử dụng [VanillaJS](http://vanilla-js.com/)

Ví dụ: 
Thay vì dùng: 

```javascript
// Tìm min 2 số a, b
var min = Math.min(a,b); 
// Thêm biến vào mảng
A.push(v);
```

Hãy dùng:

```javascript
var min = a < b ? a : b;
A[A.length] = v;
```

### 43. Hãy code chuẩn convention hơn. Minify nó khi deploy
Hãy sử dụng JSLint và minifier nó(ví dụ JSMin...) trước khi chạy code trên môi trường production.
Hãy tập code chuẩn convention, tuân theo một convention code nào đó, có thể bây giờ bạn cảm thấy khó chịu khi phải tuân thủ convention nhưng một ngày nào đó việc xem lại mình đã code gì hay debug trên nó cũng trở nên dễ chịu hơn.
Code được minify sẽ giảm bớt dung lượng và trở nên nhẹ hơn.


Bài viết được tổng hợp lại từ https://modernweb.com/45-useful-javascript-tips-tricks-and-best-practices/ - Tác giả: [Saad Mousliki](https://modernweb.com/author/saad-mousliki) tại trang web (http://modernweb.com)