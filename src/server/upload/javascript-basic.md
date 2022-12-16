*Javascript là một ngôn ngữ cực kì đa năng, với Javascript bạn có thể làm được backend với nodejs, làm được frontend với các framework Reactjs, Vuejs,... làm được mobile app với React Native, làm được các web game với sự mãnh mẽ về tính real-time của javascript, thậm chí là framework Tensorflow trong Deep Learning cũng hỗ trợ ngôn ngữ lập trình Javascript, trong bài viết này mình sẽ điểm qua 12 ý chính về Javascript vừa để ôn tập cũng như nếu có quên thì mọi người có thể ngó qua để xem lại nha.*

***Xem thêm*** : [***Các điểm nhấn trong cú pháp của ES6***](https://www.tailieubkhn.com/2022/05/cac-diem-nhan-trong-cu-phap-es6.html)

### "Hello World!" trong Javascript
In ra dòng hello world trong js : 
```javascript
console.log("Hello World!");
```

### Biến và kiểu dữ liệu 
- Javascript khai báo biến với từ khóa *var*
    ```javascript
    var myNumber = 3; // number
    var myString = "string"; // string
    var myBoolean = false;	// boolean
    ```
    - Trong Javascript, number có thể là số thực hoặc số nguyên.

- Có 2 kiểu dữ liệu nâng cao trong Javascript là mảng (***array***) và đối tượng (***Object***)
    ```javascript
    var myArray = [];
    var myObject = {};
    ```

+ Có 2 giá trị đặc biệt là ***undefined*** và ***null***
    ```javascript
    var newVariable;
    console.log(newVarialbe); // undefined
    var emptyVariable = null;
    console.log(emptyVariable) // null
    ```   

### Mảng 
- Mảng trong Javascript có chức năng như một *list*, *stack* hoặc *queue*
- Khai báo mảng bằng 2 cách : 
    - Cách 1 :  `var myArray = [1,2,3];` (như được đề cập ở mục trước)
    - Cách 2 : `var theSameArray = new Array(1,2,3);`

- Truy cập tới các phần tử trong mảng sử dụng ***operator*** "[]"
- Các phần tử trong mảng có thể là bất cứ kiểu nào như *string*, *number* hoặc *Object*
    ```javascript
    var myArray = ["string",10,{}];
    ```
    
### Thao tác với mảng
- ***push*** và ***pop*** : dùng để trèn giá trị vào cuối cùng của mảng, giống với 2 chức năng của ngăn xếp
    ```javascript
    var myStack = [];
    myStack.push(1);
    myStack.push(2);
    myStack.push(3);
    console.log(myStack); // 1,2,3

    console.log(myStack.pop()); // 3 : Xóa đi phần tử cuối trong mảng và trả về giá trị phần tử vừa lấy ra.
    console.log(myStack); // 1,2
    ```
	
- ***shift*** và ***unshift*** : giống với ***push*** và ***pop***, tuy nhiên *shift* và *unshift* dùng để thêm và xóa phần tử ở đâu của mảng. Sử dụng ***push*** (thêm vào cuối mảng) và ***shift*** (xóa đi đầu mảng) như 2 thuộc tính của một hàng đợi (***queue***)
    ```javascript
    var myQueue = [];
    myQueue.push(1);
    myStack.push(2);
    myStack.push(3);
    console.log(myQueue.shift()); // 1
    console.log(myQueue.shift()); // 2
    console.log(myQueue.shift()); // 3

    var myArray = [1,2,3];
    myArray.unshift(0);
    console.log(myArray); // 0,1,2,3
    ```
	     
- ***splice***: xóa phần tử trong mảng, phương thức `splice(a,b)` xóa trong mảng từ phần tử thứ a xóa đi b phần tử
    ```javascript
    var myArray = [0,1,2,3,4,5];
    var Splice = myArray.splice(3,1);
    console.log(Splice) // 3
    console.log(myArray) // 0,1,2,4,5
    ```

### Operators
- Toán tử cộng (`+`) 
    - Cộng 2 số number : `1 + 2 = 3, ...`
    - Cộng 2 chuỗi : `"hello" + "world" = "helloworld"`
    - Nếu cộng 2 giá trị có kiểu khác nhau ( *number* và *string*) thì js sẽ chuyển tất cả về string sau đó cộng như 2 chuỗi bình thường.
    ( do giá trị nguyên thủy của Javascript là string, vì vậy khi cộng 2 giá trị không cùng kiểu sẽ được chuyển về string trước khi cộng): `1 + "1" = "11"`

- Toán tử toán học: trừ, nhân, chia lần lượt sử dụng các kí hiệu `-, *, /`
-  Các toán tử nâng cao
    - Chia lấy phần dư : `5 % 3 = 1`
    - Ngoài ra : `number = number / 2 ~ number /= 2`, tương tự với các toán tử khác `+, -, *, /, %`
    
- Javascript cung cấp thư viện Math có các hàm toán học như : 
    - `Math.abs()` : lấy trị tuyệt đối
    - `Math.exp : e^x`
    - `Math.pow(x,y) : x^y`
    - `Math.random()` : lấy ngẫu nhiên,
    - ... 

### Câu lệnh điều kiện
- Câu lệnh `if`: giống với `If` trong các ngôn ngữ lập trình khác
- Câu lệnh `Switch`: giống với`Switch` trong các ngôn ngữ lập trình khác

### Câu lệnh lặp 
- Lặp với`for` : 
    ```javascript
    var i;
    for (i = 0; i < 3; i = i + 1)
    {
        console.log(i);
    }
    ```

- Lặp trong một mảng: 
    ```javascript
    var myArray = ["A", "B", "C"];
    for (var i = 0; i < myArray.length; i++)
    {
        console.log("Index " + i + " is " + myArray[i]);
    }
    ```

- Lặp với `while` : 
    ```javascript
    var i = 99;
    while (i > 0)
    {
        console.log(i + " bottles of beer on the wall");
        i -= 1;
    }
    ```

### Objects
- Giống với `map` trong các ngôn ngữ lập trình khác
    ```javascript
    var obj = {}; // khai báo 1 object rỗng
    var person = {
        firstName : "trannguyen",
        lastName : "han"
    }

    person.age = 21;
    person["salary"] = 3500;
    ```

- Duyệt object với `iteration` : 
    ```javascript
    for (var attri in person)
    {
        if (person.hasOwnProperty(attri))
        {
            console.log(person[attri])
        }
    }
    ```
	Kết quả thu được : 
    ```bash
    trannguyen
    han
    21
    3500
    ```
    
### Functions
```javascript
function greet(name)
{
    return "Hello " + name + "!";
}

console.log(greet("trannguyenhan"));      // prints out Hello trannguyenhan!
```

### Pop-up Boxes
`confirm("Hi!");`

`prompt("trannguyenhan hello!");`

`alert("Hello");`

### Callback
Một tính chất quan trọng của lập trình không đồng bộ : 
```javascript
var callback = function() {
    console.log("Done!");
}

setTimeout(callback, 5000);

// hoặc :

setTimeout(function() {
    console.log("Done!");
}, 5000);
```

### Arrow Functions
Arrow function là một tính năng mới của ES6, giúp viết code ngắn gọn hơn: 
```javascript
hello = name => {
    console.log('hello ', name)
}
```

Tìm hiểu thêm về Arrow functions bạn có thể xem thêm tại: [https://viblo.asia/p/su-khac-biet-giua-arrow-function-va-function-trong-javascript-07LKXpw2KV4](https://viblo.asia/p/su-khac-biet-giua-arrow-function-va-function-trong-javascript-07LKXpw2KV4)

Tham khảo: [https://learn-js.org/](https://learn-js.org/)