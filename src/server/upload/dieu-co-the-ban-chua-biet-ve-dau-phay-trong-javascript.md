## Dấu , thực ra cũng là 1 toán tử
Khi sử dụng như 1 toán tử, dấu "," sẽ tính toán cả 2 toán hạng của nó (từ trái qua phải) rồi trả về kết quả giá trị của toán hạng thứ 2.
Ví dụ:
```javascript
var a = (7, 5);
a; //5
 
var x, y, z
x = (y=1, z=4);
x; //4
y; //1
z; //4
```

### Ủa.. Tại sao phải sử dụng ngoặc tròn vậy?
Chính là bởi vì thứ tự ưu tiên của các toán tử. Một câu lệnh javascript có thể chứa nhiều toán tử khác nhau. Như câu lệnh sau có đến 3 toán tử (`*`, `+` và `,`):
```javascript
return 5 * 2 + 3,  22;
```
Thử tự ưu tiên của các toán tử sẽ quyết định xem trong một câu lệnh, toán tử nào sẽ được thực hiện trước. Có một danh sách đầy đủ thứ tự ưu tiên của các toán tử được liệt kê ra [ở đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence). Thật chẳng may, toán tử phẩy `,` lại có thứ tự ưu tiên thấp nhất đối với bất kì toán tử nào. Cùng phân tích xem điều này được áp dụng như thế nào với câu lệnh trên nhé:
```javascript
// câu lệnh gốc
return 5 * 2 + 3,  22;
// thực hiện toán tử *
return 10 + 3,  22;
// thực hiện toán tử +
return 13, 22;
// thực hiện toán tử ,
return 22;
```
Bây giờ, hãy sử dụng kiến thức đó để xem điều gì sẽ xảy ra nếu như ta không sử dụng dấu ngoặc đơn ở ví dụ gán biến ở trên nhé:
```javascript
// câu lệnh gốc
var a = 7, 5;
// thực hiện toán tử =
var a, 5; // bây giờ a có giá trị là 7
// => cuối cùng là báo lỗi: SyntaxError: missing variable name 
```
Bằng cách gói vế phải của biểu thức trong dấu ngoặc tròn, chúng ta tạo ra một nhóm - mà có tính ưu tiên cao nhất. Điều này đảm bảo rằng toán tử dấu phẩy `,` được thực hiện trước:
```javascript
// câu lệnh gốc
var a = (7, 5);
// thực hiện toán tử ,
var a = 5;
```
Trong thực tế, việc có thứ tự ưu tiên thấp nhất thực sự lại làm cho toán tử dấu phẩy `,` khá mạnh. Nó có thể nói rằng: "cứ tiếp tục đi và nhìn tất cả những toán tử nhỏ bé kia trước đi, sau đó hãy xem tôi đến và thu nhặt kết quả nhé".

### Một số câu lệnh chứa nhiều dấu phẩy thì nó hoạt động như thế nào?
Quy tắc trên vẫn được áp dụng. Mỗi toán tử dấu phẩy `,` trong câu lệnh được xử lý theo thứ tự từ trái sang phải:
```javascript
var a = (1, 2, 3, 4);
a; //4
```
Câu lệnh trên tương đương với:
```javascript
var a = (((1, 2), 3), 4);
a; //4
```

## Dấu phẩy được sử dụng trong các loại dữ liệu literal và trong khai báo thì sao?
Thực chất thì chúng chỉ là các dấu phân cách bằng dấu phẩy chứ không phải là toán tử dấu phẩy. Mục đích của dấu phân cách bằng dấu phẩy là phân định các phần tử trong danh sách.
Ví dụ:
```javascript
// đặt 4 phần tử cho mảng
var arr = [1, 2, 3, 4];
 
// tạo 1 object với 2 properties
var obj = {
  a: 22,
  f: function() {return this.a*this.a}
}
 
// định nghĩa 3 biến khác nhau
var a = 1, b = 2, c = 3;
 
// gọi một hàm mà truyền vào 2 đối số
Math.max(4, 7);
```

## Tại sao lại sử dụng toán tử dấu phẩy?
Vì chúng cho phép bạn thực hiện nhiều hơn một biểu thức ở chỗ mà JavaScript chỉ mong đợi một biểu thức thôi. Các toán tử dấu phẩy `,` hiếm khi là cần thiết nhưng thường hữu ích và đôi khi hết sức "sang chảnh":
```javascript
var r = [], n = 0, a = 0, b = 1, next;
 
function nextFibonacci() {
    next = a + b;
    return b = (a = b, next); // <===
}
 
while(n++ < 10) {
    r.push(nextFibonacci());
}
 
r; //[1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
```
```javascript
function getRandomPrime() {
    while(n = Math.round(Math.random()*1000000000), !isPrime(n)); // <===
    return n;
}
 
var isPrime = function(n) {
    d = Math.ceil(Math.sqrt(n));
    while(n%(d--) && d);
    return !d;
}
 
getRandomPrime(); //425593109
getRandomPrime(); //268274719
```
## Có phải toán tử dấu phẩy thực thất chỉ là dấu chấm phẩy nguỵ trang không?
Không phải đâu nhé, đừng nhầm lẫn.
Dấu chấm phẩy thì dùng để ngăn cách cách câu lệnh, còn toán tử dấu phẩy lại ngăn cách các biểu thức trong cùng câu lệnh.

## Sao không chỉ dùng toán tử && để thực hiện nhiều biểu thức liên tiếp nhau?
Thực ra thì toán tử dấu phẩy `,` lại là anh em họ gần của toán tử && và toán tử || đấy. Tất cả ba toán tử đó đều sẽ trả về giá trị của biểu thức cuối cùng mà chúng đánh giá. Tuy nhiên có sự khác biệt rất đơn giản:
```javascript
// (gọi LHE là biểu thức bên trái, RHE là biểu thức bên phải nhé)
LHE && RHE
1. Toán tử && luôn đánh giá biểu thức bên trái LHE
2. Nếu LHE trả về true nó mới đánh giá tiếp RHE

LHE || RHE
1. Toán tử || luôn đánh giá biểu thức bên trái LHE
2. Nếu LHE trả về false nó mới đánh giá tiếp RHE

LHE, RHE
1. Toán tử , luôn đánh giá biểu thức bên trái LHE
2. Toán tử , cũng luôn đánh giá biểu thức bên phải RHE
```
Vậy nên, hãy sử dụng toán tử dấu phẩy khi bạn muốn cả hai biểu thức luôn được đánh giá.
## Thêm một vài ví dụ
Được rồi, ở trên, mình có nói rằng toán tử dấu phẩy cho phép bạn chỉ định nhiều biểu thức ở nơi mà JavaScript chỉ mong đợi một. Điều này có lẽ hữu ích nhất trong giới hạn của vòng lặp `for`:

### vòng lặp for
Đây là phiên bản thay thế của bộ sinh mã Fibonacci, cũng sử dụng toán tử dấu phẩy:
```javascript
for (
    var i=2, r=[0,1];
    i<15;
    r.push(r[i-1] + r[i-2]), i++ // <===
); 
 
r //"0,1,1,2,3,5,8,13,21,34,55,89,144,233,377"
```
Thêm một ví dụ khác, hãy xem xét một tiện ích giúp một người bán hàng chọn các hóa đơn và tiền xu mà dựng nên giao dịch của một khách hàng. Đây là phiên bản cơ bản. Mình sẽ sử dụng toán tử dấu phẩy để chia đôi câu lệnh thứ hai của vòng lặp `for`. Điều này cho phép tăng dần bộ đếm tiền tệ trước khi xem xét biểu thức giới hạn:
```javascript
function toCurrency(total, values) {    
    total *= 100;     
    for(        
        var i=0,counts=[];
        counts[i]=total/values[i], total=total%values[i]; // <===
        i++
     );     
     return counts.map(Math.floor); 
} 
 
toCurrency(32.47, [500, 100, 25, 10, 5, 1]); //[6, 2, 1, 2, 0, 2]
```
Còn đây là tiện ích tương tự với định dạng được thêm vào để thân thiện với người dùng:
```javascript
function toCurrency(total, values, sym) {
    total *= 100;     
    //do the calc     
    for(
        var i=0,counts=[];
        counts[i]=total/values[i], total=total%values[i]; // <===
        i++
    );     
   //format
   var results = counts.map(function(s,i) {
       return s>=1 && [Math.floor(s), "x", (sym || '$') + (values[i]/100).toFixed(2)].join(' ');
    });
    return results.filter(Boolean).join(', ');
}
 
toCurrency(19.77, [500,100,25,10,5,1]);
//"3 x $5.00, 4 x $1.00, 3 x $0.25, 2 x $0.01"
toCurrency(19.77, [500,100,50,20,10,5,1], '£');
//"3 x £5.00, 4 x £1.00, 1 x £0.50, 1 x £0.20, 1 x £0.05, 2 x £0.01"
toCurrency(19.77, [500,100,50,20,10,5,2,1], '€');
//"3 x €5.00, 4 x €1.00, 1 x €0.50, 1 x €0.20, 1 x €0.05, 1 x €0.02"
```
Hàm sau đây sử dụng toán tử dấu phẩy để tăng và giảm đồng thời hai bộ đếm trong vòng lặp `for`. Mục đích của bộ đếm được sử dụng để hiển thị đường cong trong console:
```javascript
function renderCurve() {
  for(var a = 1, b = 10; a*b; a++, b--) // <===
    console.log(new Array(a*b).join('*'));
}
 
renderCurve();
/*
*********
*****************
***********************
***************************
*****************************
*****************************
***************************
***********************
*****************
*********
*/
```
### vòng lặp while
Bạn có thể sử dụng toán tử dấu phẩy để tạo phiên bản ngắn gọn của vòng lặp `do-while`. Trong ví dụ sau, thực hiện tìm kiếm 1 node cha có tagName trùng với 1 giá trị nào đó. Một lần nữa mình sẽ sử dụng dấu phẩy để thực hiện một hành động trước khi kiểm tra biểu thức giới hạn:
```javascript
function firstAncestor(el, tagName) {
  while(el = el.parentNode, el && (el.tagName != tagName.toUpperCase())); // <===
  return el;
}
 
//element in http://ecma262-5.com/ELS5_HTML.htm
var a = $('Section_15.1.1.2'); 
 
firstAncestor(a, 'div'); //<div class="page">
```
### Toán tử điều kiện 3 ngôi
Toán tử điều kiện 3 ngôi chỉ cho phép có một câu lệnh trong mỗi thành phần của nó. Theo nguyên tắc chung, nếu bạn cần sử dụng các câu lệnh khác, bạn nên cân nhắc sử dụng `if else`. Tuy nhiên, đôi khi có thể dễ đọc hơn khi toán tử dấu phẩy được sử dụng để kết hợp các biểu thức ngắn gọn trong một câu lệnh 3 ngôi:
```javascript
//player loses
lives ? (lives--, go()) : (gameOver(), exit()); // <===
````
### Gọi eval gián tiếp
`eval` thường được gọi trong ngữ cảnh chứa của chúng (tức là giá trị `this` trong đoạn code được đánh giá sẽ giống như giá trị `this` của đoạn code quanh nó). Đây chính là vấn đề vì không có gì đảm bảo rằng các lần gọi `eval` lặp lại sẽ bắt nguồn trong cùng một ngữ cảnh. Chúng ta có thể sử dụng toán tử dấu phẩy `,` để thực hiện một lời gọi gián tiếp đến `eval`, điều này sẽ buộc nó thực thi trong bối cảnh toàn cục (global context):
```javascript
var a = {};
 
// thử gọi eval trong ngữ cảnh của object a
(function() {
    eval("this.alert('If you can read this I must be global!')");
}).call(a);
// Báo lỗi: TypeError: this.alert is not a function
 
// ép eval chạy với global context
(function() {
    (0,eval)("this.alert('If you can read this I must be global!')"); // <===
}).call(a);
// Hiện cảnh báo: 'If you can read this I must be global!'
```
## Kết luận
Bạn hoàn toàn có thể code JavaScript một cách hoàn hảo mà không cần sử dụng đến toán tử dấu phẩy `,`. Cũng giống như một từ vựng mở rộng làm cho chúng ta có một bài thuyết trình tốt hơn, vậy nên, tiếp cận một cách toàn diện đến các tính năng ngôn ngữ sẽ làm cho chúng ta lập trình tốt hơn. Càng có nhiều kỹ thuật, chúng ta có nhiều khả năng viết code gọn nhẹ hơn và dễ đọc hơn.
Hy vọng bài viết này mang lại được cho bạn chút kiến thức nào đó. Cảm ơn vì đã quan tâm đến bài viết!

Nguồn: https://javascriptweblog.wordpress.com/2011/04/04/the-javascript-comma-operator/