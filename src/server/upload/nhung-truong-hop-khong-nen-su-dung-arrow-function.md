# Giới thiệu ES6
```
ES6 là chữ viết tắt của ECMAScript 6, đây được coi là một tập hợp các kỹ thuật nâng cao của Javascript và là phiên bản mới nhất của chuẩn ECMAScript.
```
*  ECMAScript do hiệp hội các nhà sản xuất máy tính Châu Âu đề xuất làm tiêu chuẩn của ngôn ngữ Javascript. 

*  Bạn cứ nghĩ xem hiện nay có khá nhiều trình duyệt Browser ra đời và nếu mỗi Browser lại có cách chạy Javascript khác nhau thì các trang web không thể hoạt động trên tất cả các trình duyệt đó được, vì vậy cần có một chuẩn chung để bắt buộc các browser phải phát triển dựa theo chuẩn đó.

* ES6 mang tới rất nhiều các tính năng mới như là ```Block Scoped``` , ```Destructuring Assignments``` , ```Default Parameters``` , ```Arrow Function``` , ```Template String``` ... Hiện nay tất cả các framework javascript nổi tiếng như NodeJS, Angular, React đề sử dụng ES6 nên để làm việc tốt với các framework đó bạn cũng nên làm quen với ES6.

# Giới thiệu Arrow Function

Trong số các tính năng mới mà ES6 mang đến thì ```Arrow Function``` là một tính năng mà mình thấy rất hay. Nó đem lại cho chúng ta 2 lợi ích rõ rệt so với cách viết function cũ của javascript:
1. Cú pháp ngắn gọn hơn.
2.  Khắc phục nhược điểm với this trong closure function.


```Javascript
// Ví dụ ta muốn in ra một mảng với các số là bình phương của các số trong mảng cho trước :

const numbers = [1, 3, 5, 7];

// function thường
console.log(numbers.map(function(num) {return num * num}));

// arrow function
console.log(numbers.map(num => num * num));
```

Trông cũng ngắn hơn đáng kể đúng ko nào :)))

# Khi nào không sử dụng được arrow function

Arrow function có vẻ hay hơn function truyền thống nhưng không phải lúc nào chúng ta cũng có thể sử dụng được nó. Cụ thể là trong những trường hợp nào:


#### 1. Khi định nghĩa function của 1 object

```Javascript
const viblo = {  
  array: [1,  2,  3],
  sum: () => {
    console.log(this === window); 
    // => true
    return this.array.reduce((result, item) => result + item);
  }
};
console.log(this === window); // => true  
// Throws "TypeError: Cannot read property 'reduce' of undefined"
viblo.sum();
```
Ở trên thì method ```sum``` của object ```viblo``` được định nghĩa theo kiểu arrow function nhưng khi chạy thì bị lỗi vì ```this.array``` là undefined. Tại sao lại thế, bởi ở đây ```this``` được hiểu là window, ```arrow function``` đã bind ngữ cảnh của window vào method ```sum``` nên khi chạy ```this.array``` sẽ tương đương ```window.array``` => ```undefined```.

Giải pháp ở đây là sử dụng ```function expression```  hoặc là ```shorthand syntax``` (cú pháp es6). Trong trường hợp này thì ```this``` được quyết định bởi nơi gọi hàm, chứ không phải bởi ngữ cảnh bao quanh nó. Bởi vì ```sum``` là function thường nên ```this``` gọi ```viblo.sum()``` chính là ```viblo``` object, ```this.array``` chính là ```viblo.array```.

#### 2. Callback function với ngữ cảnh động

- Trong javascript thì ```this``` là một tính năng rất mạnh mẽ. Nó cho phép thay đổi ngữ cảnh theo cách function đc gọi. Thường thì ngữ cảnh là đối tượng mà gọi hàm, nó làm cho code trở nên tự nhiên hơn như kiểu là hành động gì đó sẽ xả ra với đối tượng này. Tuy nhiên thì ```arrow function``` lại bind ngữ cảnh tĩnh khi khai báo và không thể làm nó động được. Nó là mặt khác của vấn đề khi mà ```lexical this``` là không cần thiết.

Việc gán 1 event listener cho 1 phần tử của DOM là rất thường gặp khi lập trình phía client. 1 hàm được trigger khi 1 event xảy ra thì ```this``` chính là đối tượng xảy ra event đó.

Ví dụ sau đây sử dụng arrow function cho hàm xử lý như vậy:

```Javascript
var button = document.getElementById('myButton');  
button.addEventListener('click', () => {  
  console.log(this === window); // => true
  this.innerHTML = 'Clicked button';
});
```

```this``` chính là ```window``` ở trong một arrow function được định nghĩa trong ngữ cảnh toàn cục. Khi một sự kiện click xảy ra, browser cố gắng khởi tạo hàm xử lý với ngữ cảnh của button, nhưng arrow function không thay đổi cái ngữ cảnh đc định nghĩa trước của nó. Và ```this.innerHTML``` chính là ```window.innerHTML``` và hàm thì dĩ nhiên là chạy ko đúng.

Trường hợp này bạn sẽ phải sử dụng cú pháp khai báo function bình thường như sau:

```Javascript
var button = document.getElementById('myButton');  
button.addEventListener('click', function() {  
  console.log(this === button); // => true
  this.innerHTML = 'Clicked button';
});
```

Giờ khi bạn click thì đoạn text trong button sẽ được chuyển thành ```Clicked button```

#### 3. Gọi hàm constructor

```this``` ở trong việc gọi hàm constructor là một object mới được tạo. Khi thực thi dòng lệnh ```new MyFunction()``` thì ngữ cảnh của constructor ```MyFunction``` là 1 object mới.

```Javascript
this instanceof MyFunction === true
```

* Hãy chú ý rằng arrow function không thể được sử dụng như 1 hàm khởi tạo. Javascript ngăn chặn thực hiện việc đó bằng việc ném ra 1 exception.

* Dù sao thì ```this``` được hiểu là ngữ cảnh hiện tại chứ không phải là của object vừa được tạo ra.

* Nói cách khác thì việc khởi tạo sử dụng hàm constructor của arrow function là tối nghĩa.

Xem điều gì xảy ra nếu ta cố sử dụng nó:
```Javascript
var Message = (text) => {  
  this.text = text;
};
// Throws "TypeError: Message is not a constructor"
var helloMessage = new Message('Hello World!'); 
```

Thực thi dòng lệnh 
```
new Message('Hello World');
```
trong đó ```Message``` là 1 arrow function thì Javascript sẽ ném ra ```TypeError``` là Message không thể được sử dụng như một constructor.

Hãy xem việc ES6 ném ra lỗi như vậy là một thói quen tốt. Trái ngược với "fail silently" của các phiên bản javascript trước.

Ví dụ trên được fix sử dụng function expression, là một cách đúng để khởi tạo hàm constructor

```Javascript
var Message = function(text) {  
  this.text = text;
};
var helloMessage = new Message('Hello World!');  
console.log(helloMessage.text); // => 'Hello World!' 
```


#### 4. Cú pháp quá ngắn

* Arrow function có một đặc tính hay của việc loại bỏ đi các ngoặc đơn chứa tham số, hay là các ngoặc nhọn chứa các block code, hoặc là câu lệnh ```return``` nếu body của function chỉ có một lệnh.

* Điều này đã giúp cho việc viết hàm trở nên ngắn hơn.

* Thế nhưng ở trong lập trình thực tế, code được đọc bở rất nhiều lập trình viên, thế nên cách viết ngắn nhất không phải lúc nào cũng là phù hợp để các đồng nghiệp dễ dàng hiểu được tất cả.

* Ở một số mức độ nào đó thì việc thu gọn các hàm lại làm cho các hàm trở nên khó đọc hơn, cho nên đừng quá lạm dụng chúng. Hãy xem ví dụ sau:

```Javascript
let multiply = (a, b) => b === undefined ? b => a * b : a * b;  
let double = multiply(2);  
double(3);      // => 6  
multiply(2, 3); // => 6  
```

* Hàm ```multiply``` trả về kết quả phép nhân của hai số hoặc là 1 cái closure gắn với tham số đầu tiên cho các phép nhân sau.

* Hàm trên nhìn rất đẹp và ngắn gọn nhưng thoạt nhìn sẽ rất là khó hiểu là chúng có nghĩa gì

* Để làm nó dễ đọc hơn thì có thể sử dụng lại ngoặc nhọn và lệnh ```return``` từ arrow function hoặc sử dụng khai báo hàm như bình thường

```Javascript
function multiply(a, b) {  
  if (b === undefined) {
    return function(b) {
      return a * b;
    }
  }
  return a * b;
}
let double = multiply(2);  
double(3);      // => 6  
multiply(2, 3); // => 6 
```

Việc cân bằng giữa viết hàm ngắn và viết hàm tường minh cho các hàm Javascript của bạn là một điều rất cần thiết và nên làm.

# Kết luận
* Không còn nghi ngờ gì về việc arrow function là một tính năng mới tuyệt vời của ES6. Khi sử dụng đúng lúc nó sẽ đem lại sự đơn giản cho những hàm mà trước đây bạn phải sử dụng ```.bind()```. Nó làm cho code của bạn trở nên sạch sẽ hơn.

* Nhưng cái gì cũng có hai mặt của nó. Bạn không thể lúc nào cũng sử dụng arrow function, ví dụ như khi yêu cầu sử dụng ```dynamic context```: định nghĩa hàm, khởi tạo các object sử dụng ```constructor```, lây đôi tượng cần nhắm đến từ ```this``` khi xử lý sự kiện