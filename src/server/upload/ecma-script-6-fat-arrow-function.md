> Bài này mình giới thiệu về hàm mũi tên - arrow function trong ECMA Script 6, phiên bản kế tiếp của Javascript hay ECMAScript 5 (ES5).


-----


Trước khi đi vào vấn đề chính mình xin luộc lại một số khái niệm cơ bản về function trong Javascrip.
## Context và this
Bạn đã dùng biến **this** trong một số trường hợp nào đó mà có thể là vẫn chưa hiểu **this** thực sự là cái gì.<br>
Thật ra là tên biến **this** gây nhầm lẫn cho rất nhiều người, nhất là những người quen thuộc với các ngôn ngữ thuần hướng đối tượng như Java. Sau đây là một số nhầm lẫn phổ biến
### TH1: this tham chiếu đến bản thân hàm
```
function theF() {
    this.count++;
}

theF.count = 0;
console.log(theF.count);

for(var i = 0; i<5; i++) {
    console.log(i);
    theF(); // increase theF.count, sure
}

console.log('And now count is', theF.count); // 0 ???
```
Muốn tham chiếu đến bản thân hàm, hãy dùng tên hàm. Trong ví dụ trên, thay **this.count** bằng **theF.count** bạn sẽ nhận được điều mình muốn.
### TH2: this là scope
```
function foo() {
    var a = 2;
    return bar;

    function bar() {
        console.log( 'a is', this.a );
    }
}

var baz = foo();
baz();
// a is undefined
```
Đồng ý là scope của foo có biến a và a = 2. Như đã nói ở trên baz là closure và được truy cập đến scope của foo, tức là this theo ý bạn. Tuy nhiên lại chẳng có this.a nào cả :P :P :P
### Vậy this là?
Chúng ta có một khái niệm nữa, ngữ cảnh - context. Một hàm js có thể được định nghĩa ở một chỗ và thực thi ở chỗ khác. Nếu bây giờ bạn mở console lên và định nghĩa một hàm và thực thi thì hàm đó có ngữ cảnh là toàn cục, hay global, hay window. Tuy nhiên nếu bây giờ bạn định nghĩa hàm là phương thức của một đối tượng thì ngữ cảnh của hàm chính là đối tượng đó. Ví dụ:
```
function b() {
    console.log(this === window);
}

var a = {
    method: function() {
        console.log(this === a);
    }
}

a.method();
b();
// true
// true
```
Đã rõ ràng hơn chút nào chưa nhỉ? Bây giờ thêm một ví dụ nữa là ta hoàn toàn có thể chỉ định ngữ cảnh của hàm được gọi, thậm chí một hàm định nghĩa trong đối tượng này nhưng có thể được gọi với ngữ cảnh là đối tượng khác.
```
function sayMyName() {
    console.log(this.name);
}

var me = {
    name: 'mahpah',

    write: function() {
        console.log(this.name + ' so handsome');
    }
};

var you = {
    name: 'Anonymous'
};

sayMyName.call(me);
// mahpah

sayMyName.call(you);
// Anonymous

me.write();
// mahpah is so handsome

me.write.call(you);
// Anonymous is so handsome

var youWrite = me.write.bind(you);
youWrite();
// Anonymous is so handsome
```
Bind cũng giống như call, chỉ định ngữ cảnh gọi hàm, nhưng thay vì thực hiện hàm, nó trả lại một hàm khác và bạn có thể thực thi sau đó.<br>
Tiếp theo, `new` làm gì? Đơn giản `new` tạo ra một ngữ cảnh mới và thực thi hàm với ngữ cảnh mới đó.<br>
***Tóm lại, hàm trong Js không phải là một đối tượng mà ngữ cảnh thực thi hàm mới là đối tượng***
## ES6 arrow function
Để dễ hình dung, cú pháp arrow function như sau
```
(a, b) => a + b;

(a, b) => {
    return a + b;
}

typeof (x) => x+1
// function
```
Vậy, arrow function cũng là một hàm thôi có gì đâu, vẽ ra làm gì cho phức tạp. Xin hãy xem ví dụ sau:
```
obj = {
    a : 1,

    delayLog: function() {
        var that = this;
        setTimeout(function(){
            console.log(that.a);
        }, 1000);
    }
}
```
Hãy cho tôi biết điều gì xảy ra nếu không gán ***that*** = ***this*** và log luôn ***this.a***. Bạn thấy là ngữ cảnh của hàm vô danh tức thủ tục con trong **setTimeout** bị chuyển thành **global** đúng không. Tuy nhiên, hãy viết lại đẹp hơn chút thế này.
```
obj = {
    a : 1,

    delayLog: function() {
        setTimeout(function(){
            console.log(this.a);
        }.bind(this), 1000);
    }
}
```
Đẹp hơn nhiều nhỉ, nhưng vẫn có thể đẹp hơn :smiley:
```
obj = {
    a : 1;

    delayLog: function() {
        setTimeout(() => {
            console.log(this.a);
        }, 1000);
    }
}
```
Vậy arrow function chỉ đơn giản là một thủ tục con được gán sẵn ngữ cảnh là ngữ cảnh của bố nó :grinning::grinning:
## Một số đặc điểm của arrow function
* Luôn luôn được gán sẵn ngữ cảnh.
* Không được sử dụng là constructor, tức không thể new được, bởi arrow function đã có ngữ cảnh sẵn, bạn không thể tạo một ngữ cảnh mới và gán cho nó được.
* Có thể có tên, nhưng chỉ có thể truy cập trong bản thân hàm.
```
var add = named(a, b) => a + b;

console.log(named); 
// ReferenceError: named is not defined
```
## Nguồn tham khảo
https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/