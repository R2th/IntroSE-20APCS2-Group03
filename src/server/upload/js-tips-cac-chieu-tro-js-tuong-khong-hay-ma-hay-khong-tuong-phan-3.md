Xin chào các bạn,

Đến hẹn lại lên, mình trở lại và tiếp tục với phần 3 của series JSTips. Nếu các bạn thắc mắc hai phần trước của mình thế nào thì mình xin trích link nhanh để các bạn có hứng thú thì ghé qua upvote cho mình nhé:

[[JS tips series] Các "chiêu trò" JS tưởng không hay mà hay không tưởng](https://viblo.asia/s/cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-DVK2jDyjKLj)

<br>
Trong bài viết lần này, chúng ta hãy cùng nhau điểm qua những thứ <em>"rất cơ bản"</em> trong JS để chúng ta có cái nhìn tổng quát hơn và "kiểm soát" JS một cách tốt hơn nhé. Let's go!

![](https://images.viblo.asia/9b9dcf70-b680-4aed-aa06-039c72e24305.png)


<h2>1. Return giá trị với toán tử <em>new</em></h2>

Vấn đề <em>"rất cơ bản"</em> đầu tiên mà mình muốn đề cập tới trong bài viết lần này đó chính là từ khóa <b>new</b> quen thuộc. Từ khóa <em>new</em> trong JS là một toán tử mà, trong đúng ngữ cảnh của nó, sẽ trả lại một instance của object. Hãy nhìn vào hàm khởi tạo trong ví dụ sau:

```javascript
function Thing() {
  this.one = 1;
  this.two = 2;
}

var myThing = new Thing();

myThing.one // 1
myThing.two // 2
```

Như chúng ta đã biết, từ khóa <b><em>this</em></b> sẽ tham chiếu tới object mới mà chúng ta tạo bằng toán tử <b><em>new</em></b>. Nếu như ```Thing()``` được gọi tới mà không dùng toán tử <b><em>new</em></b> thì <b>không có object nào được tạo</b> và khi ấy ```this``` sẽ trỏ tới object toàn cục (global object), chính là ```window```. Điều đó có nghĩa là:
1. Bạn vừa có 2 biến toàn cục (global variables) tên là ```one``` và ```two```.
2. ```myThing``` sẽ là ```undefined``` vì hàm ```Thing()``` không trả về giá trị nào cả.

<br>

Bây giờ chúng ta sẽ xét tới một ví dụ khác, có lẽ là sẽ hấp dẫn hơn hơn đôi chút khi mà ta thêm một dòng code so với ví dụ trên:
```javascript
function Thing() {
  this.one = 1;
  this.two = 2;

  return 5;
}

var myThing = new Thing();
```

Bây giờ thì ```myThing``` sẽ có giá trị thế nào? Liệu nó có phải là một object hay không? ```Thing()``` đang trả về 5 nên là ```myThing()``` sẽ là 5?

Câu trả lời là nó là một object với 2 thuộc tính ```one``` và ```two``` nhé, không có giá trị 5 nào đâu! Check lại là biết liền ấy mà:
```javascript
console.log(myThing);
//Thing{one: 1, two: 2}
```

Ô, vậy thì số 5 mà mình return ở hàm nó đi đâu mất rồi, rõ ràng là mình có return lại giá trị ấy mà, phải không, tại sao lại không thấy nó? Mọi thứ sẽ được làm sáng tỏ khi chúng ta sửa đi ví dụ của chúng ta một chút nhé:
```javascript
function Thing() {
  this.one = 1;
  this.two = 2;

  return {
    three: 3,
    four: 4
  };
}

var myThing = new Thing();
console.log(myThing);
// Object {three: 3, four: 4}
```

Thế đấy các bạn ạ! 

Khi ta gọi một ```function``` với từ khóa ```new```, mà trong ```function``` ta có set các thuộc tính của nó sử dụng từ khóa ```this``` và return một giá trị kiểu nguyên thủy (primitives values), thì giá trị ấy sẽ không được trả về mà thay vào đó phương thức sẽ trả về ```this``` instance của function ấy.

Ngược lại, khi ta gọi một ```function``` với từ khóa ```new```, mà trong thân của nó ta return lại một giá trị không phải kiểu nguyên thủy (non-primitives), có thể là một ```object```, một ```array```, hoặc một ```function```, thì khi ấy JS sẽ trả về chính xác giá trị mà ta return chứ không phải ```this``` instance.

<h2>2. Làm thế nào để continue hoặc break ra khỏi vòng lặp <em>forEach</em></h2>

Lại là một vấn đề cũng <em>"rất là cơ bản"</em> đúng không nào! Và chẳng khó khăn gì khi có ai đó hỏi chúng ta rằng làm thế nào để thoát ra khỏi vòng ```for-i``` thông thường, đó chính là dùng ..... xem code luôn này:
```javascript
const a = [0, 1, 2, 3, 4];
for (var i = 0; i < a.length; i++) {
  if (a[i] === 2) {
    break; // stop the loop
  }
  console.log(a[i]);
}
//> 0, 1
```

Chúng ta không thể nào xài từ khóa ```break``` với vòng lặp ```forEach``` như cách trên được. Trong trường hợp này, chúng ta chỉ có thể sử dụng từ khóa ```return```, đây là cách làm tương tự với việc sử dụng ```continue``` trong vòng lặp thông thường:
```javascript
[0, 1, 2, 3, 4].forEach(function(val, i) {
  if (val === 2) {
    // how do we stop?
    return true;
  }
  console.log(val); // your code
});
//> 0, 1, 3, 4
```

Nhưng với ```.some()``` thì lại khác đấy. Chúng ta có thể thực hiện hành động ```break``` ra khỏi ```some()``` với câu lệnh ```return```. 
```javascript
[0, 1, 2, 3, 4].some(function(val, i) {
  if (val === 2) {
    return true;
  }
  console.log(val); // your code
});
//> 0, 1
```
Vi ```some()``` là một phương thức của Array prototype, nó sẽ kiểm tra nếu như các element trong mảng thỏa mãn điều kiện mà ta triển khai ở trong thân hàm. Nếu như có bất cứ giá trị nào return là ```true``` thì nó sẽ dừng chạy ngay lập tức. Và đương nhiên là nếu ta return ```false``` thì ```some()``` vẫn chạy như thường.

Chúng ta có thể làm tương tự đối với hàm ```every()``` nhưng lưu ý rằng với ```every()``` chúng ta phải return ```false``` đồng nghĩa với việc ```break```.

<h2>3. Khai báo rất <em>cơ bản</em> mà không hề <em>đơn giản</em></h2>

Khai báo thì ai mà chẳng biết đúng không nào, hãy xem luôn ví dụ nhé:
```javascript
var y, x = y = 1 //== var x; var y; x = y = 1
console.log('--> 1:', `x = ${x}, y = ${y}`)

// Will print
//--> 1: x = 1, y = 1
```

Dễ quá phải không? Nhưng mà đoạn code sau đây thì chưa chắc nhé:
```javascript
var y, x = y = 1 //== var x; var y; x = y = 1
console.log('--> 1:', `x = ${x}, y = ${y}`)

// Will print
//--> 1: x = 1, y = 1

(() => { 
  var x = y = 2 // == var x; x = y = 2;
  console.log('2.0:', `x = ${x}, y = ${y}`)
})()
console.log('--> 2.1:', `x = ${x}, y = ${y}`)

// Will print
//2.0: x = 2, y = 2
//--> 2.1: x = 1, y = 2
```
Như các bạn đã thấy thì biến ```y``` (global) ở ```2.1```  bị thay đổi. Thế còn đoạn code sau đây thì sao:
```javascript
var y, x = y = 1 //== var x; var y; x = y = 1
console.log('--> 1:', `x = ${x}, y = ${y}`)

// Will print
//--> 1: x = 1, y = 1

(() => { 
  var x = y = 2 // == var x; x = y = 2;
  console.log('2.0:', `x = ${x}, y = ${y}`)
})()
console.log('--> 2.1:', `x = ${x}, y = ${y}`)

// Will print
//2.0: x = 2, y = 2
//--> 2.1: x = 1, y = 2

(() => { 
  var x, y = 3 // == var x; var y = 3;
  console.log('3.0:', `x = ${x}, y = ${y}`)
})()
console.log('--> 3.1:', `x = ${x}, y = ${y}`)

// Will print
//3.0: x = undefined, y = 3
//--> 3.1: x = 1, y = 2
```
Lần này thì ```x``` và ```y``` so với ví dụ lần thứ 2 chẳng thay đổi gì cả. Hãy thử lần nữa nhưng khai báo cả ```x``` và ```y``` trong function nhé:
```javascript
var y, x = y = 1 //== var x; var y; x = y = 1
console.log('--> 1:', `x = ${x}, y = ${y}`)

// Will print
//--> 1: x = 1, y = 1

(() => { 
  var x = y = 2 // == var x; x = y = 2;
  console.log('2.0:', `x = ${x}, y = ${y}`)
})()
console.log('--> 2.1:', `x = ${x}, y = ${y}`)

// Will print
//2.0: x = 2, y = 2
//--> 2.1: x = 1, y = 2

(() => { 
  var x, y = 3 // == var x; var y = 3;
  console.log('3.0:', `x = ${x}, y = ${y}`)
})()
console.log('--> 3.1:', `x = ${x}, y = ${y}`)

// Will print
//3.0: x = undefined, y = 3
//--> 3.1: x = 1, y = 2

(() => { 
  var y, x = y = 4 // == var x; var y; x = y = 4
  console.log('4.0:', `x = ${x}, y = ${y}`)
})()
console.log('--> 4.1:', `x = ${x}, y = ${y}`)

// Will print
//4.0: x = 4, y = 4
//--> 4.1: x = 1, y = 2
```

Và ```x```, ```y``` global vẫn không bị thay đổi (so với ví dụ lần thứ 2), nó chỉ thay đổi trong hàm mà chúng ta viết thôi (local). Còn nếu muốn thay đổi biến global thì chúng ta cần làm bên ngoài hàm:
```javascript
x = 5 // == x = 5
console.log('--> 5:', `x = ${x}, y = ${y}`)

// Will print
//--> 5: x = 5, y = 2
```

<h2>4. Điểm khác biệt giữa <em>null</em> và <em>undefined</em></h2>

Kết bài với một vấn đề cũng hết sức <em>"cơ bản"</em>: "Em hãy nêu cho anh những điểm khác biệt giữa ```null``` và ```undefined```?"

Đi phỏng vấn JS thì 96,69% .sẽ có câu này ở mức basic phải không nào? Và bạn có chắc là bạn liệt kê hết những điểm khác biệt giữa chúng? Hay là bạn có <em>"đánh rơi nhịp nào"</em> để làm mất điểm trong mắt người hỏi không? Hãy cùng mình điểm qua một lượt lại nhé:

* ```undefined``` có nghĩa là một biến chưa được khai báo, hoặc là được khai báo rồi mà chưa được khởi tạo (gán giá trị), ```null``` là một giá trị mang ý nghĩa là "no value".
* JS sẽ set các biến chưa được khởi tạo với một giá trị mặc định là ```undefined```. JS không bao giờ set giá trị của biến về ```null```, việc này được các dev JS như chúng ta làm để chỉ ra rằng biến ấy đã được định nghĩa giá trị (not undefined) nhưng nó không mang giá trị nào cả (no value).
* Sự xuất hiện của ```undefined``` trong object JSON sẽ là không hợp lệ, còn ```null``` thì có.
* ```typeof undefined``` sẽ là ```undefined```, còng ```typeof null``` sẽ là ```object```. [Tại sao lại thế?](https://2ality.com/2013/10/typeof-null.html)
* Cả ```null``` và ```undefined``` đều là kiểu dữ liệu nguyên thủy (primitives), đều ```falsy``` nhưng:
```javascript
null == undefined // true

null === undefined // false
```

Vậy nên hãy chú ý với ```==``` và ```===``` khi sử dụng so sánh nhé!
Còn gì nữa không nhỉ? Nếu còn mà mình bỏ sót thì các bạn comment bên dưới để mình và mọi người cùng học hỏi nhé!

<h2>Kết luận</h2>

Mình cá là bài này sẽ khá nhàm chán với một số bạn, vì mình chỉ nhắc lại một số kiến thức rất là cơ bản về JS. Nhưng mình vẫn hi vọng rằng nó có thể giúp ích cho nhiều bạn chưa biết tới các vấn đề này. 

Cảm ơn các bạn đã kiên nhẫn đọc hết bài của mình!


***Reference***: [jstips.co](https://www.jstips.co)