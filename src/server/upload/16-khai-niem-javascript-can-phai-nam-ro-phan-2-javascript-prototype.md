### Lời mở đầu

Prototype (nguyên mẫu) là khái niệm cơ bản mà các lập trình viên Javascript đều phải hiểu, và để tiếp tục series **16 khái niệm Javascript cần phải nắm rõ**, bài viết này sẽ giải thích 1 cách cụ thể về Prototype trong Javascript.

Để có thể hiểu về Prototype trong Javascript, các bạn cần hiểu được Object trong Javascript. Nếu bạn chưa quen với các đối tượng, hãy tham khảo bài viết số trước của mình ở link [này](https://viblo.asia/p/16-khai-niem-javascript-can-phai-nam-ro-phan-1-javacsript-object-gGJ59jR9KX2).

-----
# Có hai khái niệm tương quan về nguyên mẫu trong Javascript
1. Đầu tiên, mọi hàm trong Javascript đều có một thuộc tính nguyên mẫu (thuộc tính này mặc định sẽ là rỗng). Thuộc tính này được sử dụng chủ yếu cho kế thừa: bạn thêm vào các phương thức và thuộc tính cho thuộc tính nguyên mẫu của hàm để các phương thức và thuộc tính đó có thể gọi và truy cập trên các instance của hàm đó. Dưới đây là 1 ví dụ đơn giản về tính kế thừa với thuộc tính nguyên mẫu:
```js
function PrintStuff (myDocuments) {
    this.documents = myDocuments;
}

// Chúng ta thêm phwowgn thức print() vào thuộc tính nguyên mẫu của PrintStuff và từ đó các thực thể có thể kế thừa nó:
PrintStuff.prototype.print = function() {
    console.log(this.documents);
}

// Tạo một thực thể mới với PrintStuff(), cho phép thực thể này kế thừa các thuộc tính và phương thức của PrintStuff
var newObj = new PrintStuff('I am a new Object and I can print.");

// newObj kế thừa tất cả các phương thức và thuộc tính, bao gồm cả phương thức print và có thể gọi trực tiếp mặc dù chúng ta chưa từng khai báo phương thức print() cho đối tượng này
newObj.print(); //I am a new Object and I can print.
```
2. Khái niệm thứ hai về nguyên mẫu trong Javascript là thuộc tính nguyên mẫu. Chúng ta có thể hiểu thuộc tính nguyên mẫu này như một đặc tính của đối tượng, đặc tính này cho chúng ta biết "cha mẹ" của đối tượng. Nói một cách đơn giản hơn, thuộc tính nguyên mẫu của đối tượng trỏ đến "cha mẹ" của nó - đối tượng mà nó thừa hưởng các thuộc tính. Thuộc tính nguyên mẫu thường còn được gọi là đối tượng nguyên mẫu, và nó được thiết lập tự động khi bạn khởi tạo một đối tượng mới. Để giải thích điều này, mỗi đối tượng kế thừa các thuộc tính từ một đối tượng khác, và đối tượng khác đó chính là thuộc tính nguyên mẫu (cha mẹ) của nó. Trong ví dụ bên trên, thuộc tính nguyên mẫu của ```newObj``` chính là ```PrintStuff.prototype```

# Hàm khởi tạo
Trước khi tiếp tục, hãy nói qua về hàm khởi tạo. Hàm khởi tạo là 1 phương thức dùng để khởi tạo đối tượng. Ví dụ:
```js
funciton Account() {
    //code
}
// Chúng ta sử dụng hàm khởi tạo Account để tạo 1 object userAccount
var userAccount = new Account();
```
Tất cả các đối tượng kế thừa từ đối tượng khác còn kế thừa cả thuộc tính ```constructor```. Thuộc tính này trỏ tới hàm khởi tạo của đối tượng
```js
// Hàm khởi tạo trong ví dụ dưới đây là Object()
var myObj = new Object();

// Kiểm tra hàm khởi tạo của myObj:
console.log(myobj.constructor); // Object()

// Ví dụ tiếp theo: hàm khởi tạo là Account()
var userAccount = new account();

// Kiểm tra hàm khởi tạo của userAccount:
console.log(userAccount.constructor); // Account()
```

# Thuộc tính nguyên mẫu của đối tượng được khởi tạo bằng new Object() hoặc {}
Tất cả các đối tượng được khởi tạo với object literals và với hàm khởi tạo Object() thì đều kế thừa từ Object.prototype. Object.prototype bản thân nó không kế thừa bất cứ phương thức hoặc thuộc tính nào từ đối tượng khác.
```js
// Đối tượng userAccount kế thừa từ Object, do đó thuộc tính nguyên mẫu của nó là Object.prototype.
var userAccount = new Object();

// Dưới đây là việc khởi tạo sử dụng object literal. Đối tượng này cũng kế thừa từ Object, do đó thuộc tính nguyên mẫu của nó cũng là Object.prototype
var userAccount = {name: "Mike"}
```

# Thuộc tính nguyên mẫu của đối tượng được khởi tạo bằng hàm khởi tạo
Đối tượng được khởi tạo bàng từ khóa mới hoặc bất cứ hàm khởi tạo nào ngoài Object(), sẽ có nguyên mẫu từ hàm khởi tạo.

Ví dụ:
```js
function Account() {
    //code
}
var userAccount = new Account() // userAccount được khởi tạo từ hàm Account(), do đó thuộc tính nguyên mẫu của nó là Account.prototype
```

Tương tự, nếu ta có 1 mảng được khởi tạo với cú pháp ```myArray = new Array()```, nó sẽ có nguyên mẫu và kế thừa các thuộc tính từ Array.prototype

# Tại sao nguyên mẫu lại quan trọng và khi nào thì sử dụng nguyên mẫu
Có 2 cách quan trọng mà nguyên mẫu được sử dụng trong việc phát triển phần mềm với Javascript:

### 1. Kế thừa dựa trên nguyên mẫu
Nguyên mẫu quan trọng khi lập trình với Javascript bởi Javascipt không có kiểu kế thừa cổ điển dựa trên các lớp như với hầu hết các ngôn ngữ hướng đối tượng khác, và bởi lẽ đó, tất cả các kế thừa trong Javacript được thực hiện thông qua thuộc tính nguyên mẫu. Javascript có một cơ chế thừa kế dựa trên nguyên mẫu. Tính kế thừa là một mô hình lập trình mà các đối tượng (hoặc các lớp trong một số ngôn ngữ) có thể kế thừa các thuộc tính và phương thức từ các đối tượng (hoặc lớp) khác. Trong Javascript, bạn thực hiện kế thừa với thuộc tính Prototype.

Chúng ta có thể hiểu hơn về tính kế thừa của Javascript thông qua ví dụ sau:
```js
function Plant () {
    this.country = "Mexico";
    this.isOrganic = true;
}

// Thêm vào phương thức showNameAndColor cho nguyên mẫu của Plant
Plant.prototype.showNameAndColor =  function() {
    console.log('I am a ' + this.name + ' and my color is ' + this.color);
}

// Tương tự, thêm vào phương thức amIOrganic
Plant.prototype.amIOrganic = function() {
    if (this.isOrganic)
        console.log(' I am organic, baby!');
}

function Fruit (fruitName, fruitColor) {
    this.name = fruitName;
    this.color = fruitColor;
}

// Thiết lập nguyên mẫu của Fruit là hàm khởi tạo Plant, từ đó có thể kế thừa các phương thức và thuộc tính của Plant.prototype.
Fruit.prototype = new Plant();

// Tạo đối tượng aBanana từ hàm khởi tạo Fruit
var aBanana = new Fruit('Banana', 'Yellow');

// aBanana có thể sử dụng thuộc tính name từ Fruit.prototype
console.log(aBanana.name); //Banana

// Sử dụng hàm showNameAndColor từ nguyên mẫu của Fruit - Plant.prototype. Có thể thấy, object aBanana kế thừa cả từ Fruit() và Plant()
console.log(aBanana.showNameAndColor()); // I am a banana and my color is yellow.
```

Bất kỳ đối tượng nào sử dụng hàm tạo Fruit() sẽ kế thừa tất cả các thuộc tính và phương thức của Fruit.prototype và tất cả các thuộc tính và phương thức từ nguyên mẫu của Fruit, là Plant.prototype. Đây là cách thức chính mà tính kế thừa được thự thi trong Javascript.

### 2. Truy cập thuộc tính trên đối tượng

Prototype cũng rát quan trọng để truy cập các thuộc tính và phương thức của các đối tượng. Thuộc tính prototype (hoặc đối tượng nguyên mẫu) của bất kì đối tượng nào là đối tượng "cha" mà các thuộc tính kế thừa ban đầu được định nghĩa. Điều này tương tự như cách bạn kế thừa tên họ từ cha mình. Nếu chúng ta muốn tìm hiểu xem họ của bạn bắt nguồn từ đâu, trước tiên chúng ta sẽ kiểm tra liệu bạn có tự tạo ra nó hay không, nếu không, tìm đên cha mẹ nguyên mẫu của bạn để xem bạn có kế thừa từ họ không. Nếu nó không được định nghĩa bởi họ, việc tìm kiếm tiếp tục với cha mẹ của họ. 

Tương tự, nếu bạn muốn truy cập thuộc tính của đối tượng, tìm kiếm thuộc tính bắt đầu trực tiếp trên đối tượng. Nếu không thể tìm thấy thuộc tính ở đó, khi đó nó sẽ tìm thuộc tính trên đối tượng nguyên mẫu - đối tượng mà nó kế thừa thuộc tính đó. Nếu thuộc tính không được tìm thấy trên nguyên mẫu của đối tượng, việc tìm kiếm tiếp tục chuyển sang nguyên mẫu của đối tượng nguyên mẫu. Việc tìm kiếm này tiếp tục cho đến khi không còn đối tượng nào. Đây chính là chuỗi nguyên mẫu: chuối từ nguyên mẫu của đối tượng cho tới nguyên mẫu của nguyên mẫu và cứ thế. Và Javscript sử dụng chuỗi nguyên mãu để tìm kiếm phương thức và thuộc tính cho đối tượng. Nếu thuộc tính không tồn tại trên bất kì đối tượng nguyên mẫu nào trên chuỗi nguyên mẫu, thì thuộc tính đó không tồn tại và sẽ trả về ```undefined```

Ví dụ sau đây sẽ trình bày 1 cách dễ hiểu về chuỗi nguyên mẫu:
```js
var myFriends = {name: 'Pete'};

// Để tìm thấy thuộc tính name, sẽ bắt đầu tìm kiếm trên đối tượng myFriends và ngay lập tức sẽ tìm thấy giá trị, vì chúng ta định nghĩa thuộc tính này trên đối tượng myFriend.
console.log(myFriends.name);

// Trong ví dụ này, chúng ta sẽ tìm phương thức toStrong(), và cũng bắt đầu từ đối tượng myFriend. Nhưng bởi chúng ta chưa từng định nghĩa phương thức này trên myFriend nên trình biên dịch sẽ tiếp tục tìm kiếm trên nguyên mẫu của nó.

// Và vì tất cả các đối tượng được tạo với cú pháp {} đều kế thừa từ Object.prototype, phương thức toString() sẽ được tìm thấy trên Object.prototype
myFriends.toString ();
```

# Object.prototype được kế thừa bởi tất cả các đối tượng

Tất cả các đối tượng trong Javascript kế thừa thuộc tính và phương thức từ Object.prototype. Các thuộc tính và phương thức kế thừa này bao gồm hàm khởi tạo, ```hasOwnProperty()```, ```isPrototypeOf()```, ```propertyIsEnumerable()```, ```toLocaleString()``` và ```valueOf()```. 

Dưới đây là 1 ví dụ khác về chuỗi prototype:
```js
function People () {
this.superstar = "Michael Jackson";
}

// Định nghĩa thuộc tính "athlete" trên nguyên mẫu People để "athlete" có thể được truy cập bởi tất cả các đối tượng khởi tạo bởi People().
People.prototype.athlete = "Tiger Woods";

var famousPerson = new People ();
famousPerson.superstar = "Steve Jobs";

// Việc tìm kiếm thuộc tính superstar sẽ tìm kiếm trên đối tượng famousPerson đầu tiên. Và vì chúng ta định nghĩa nó ở đó. Bởi vì chúng ta đã ghi đè thuộc tính superstar lên chính đối tượng famousePerson, trình biên dịch sẽ dừng việc tìm kiếm trong chuỗi prototype.
console.log (famousPerson.superstar); // Steve Jobs

// Dưới đây sẽ hiển thị thuộc tính từ nguyên mẫu famousePerson (People.prototype), do thuộc tính athlete chưa được định nghĩa trên đối tượng famousPerson
console.log (famousPerson.athlete); // Tiger Woods

// Trong ví dụ này, trình biên dịch sẽ tiến hành tìm kiếm trong chuỗi prototype để tìm phương thức toString() trên Object.prototype, tương tự như ví dụ chúng ta đã thực hiện trước đó với đối tượng Fruit.
console.log(famousPerson.toString()); // [object Object]
```


-----
Trên đây là những gì tối thiểu nhất mà bạn cần nắm được về Prototype trong Javascript. Hẹn gặp lại các bạn ở bài viết tiếp theo trong series **16 khái niệm Javascript cần phải nắm rõ**

Bài viết được tham khảo từ *http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language/*