Trước khi vào bài viết của mình thì mình có 2 tình huống sau: <br>
**Tình huống 1**: Khi đi phỏng vấn Backend php, java,... hay bất kì ngôn ngữ nào họ sẽ hỏi bạn tùm lum những khái niệm hay keyword ví dụ như trong php (laravel): <br>
Em hãy cho biết hoạt động của Service Container, Service Providers , Dependency Injection, ... Ôi choáng ngập sao lạ thế nhỉ lại còn tiếng anh nữa chả biết nó là cái gì :) 
Thực ra mình nghĩ các bạn có thể hoặc đă làm nó hàng ngày nhưng không để ý đến khái niệm hay nhận dạng nó và nó được gọi là cái gì đúng k? . <br>
**Tình huống 2**: Khi làm bất kì dự án nào hay ngôn ngữ đi kèm với framework nào cũng vậy nếu như ta không nắm chắc kiến thức cơ bản thì sẽ dẫn đến đọc code người khác rất khó hiểu hoặc tìm hiểu lên level cao hơn cũng vô cùng khó khăn đặc biệt nguy hiểm hơn là không kiểm soát được các dòng code mà chính chúng ta viết ra dẫn đến  bug phát sinh nhiều và khó kiểm soát.<br>

Cả 2 tình huống trên chính bản thân mình cũng đã từng gặp phải và mình cũng quyết tâm đi tìm hiểu kĩ hơn về chúng. Và hôm nay mình xin chia sẻ với mọi người những khái niệm cần phải nắm được trong javascript mà mình đã tìm hiểu được. <br>
Bắt đầu nào!

### 1.Higher order function
Higher order function hay còn gọi tắt là HOF và nó được  định nghĩa cũng như 1 hàm bình thường nhưng chỉ khác là có khả năng truyền tham số vào hàm  là một hàm khác và có khả nằng return về hàm hoặc nhiều hàm dạng nested functions (kiểu như hàm lồng hàm). <br>
Ví dụ: 
```js
function Cha() {
  return function(){
    console.log('Con')
  }
}
// gọi hàm 
Cha()();
```
Các bạn có thể vào link đây để test trực quan hơn: <br>
https://jsbin.com/zasasovifu/edit?js,console
### 2.Closure và stateful
Closure (dịch tức là bao đóng) hiểu đơn giản là nó cũng là 1 dạng của **Higher order function**  và đặc biệt hơn ở chỗ là function con có thể truy cập tới trạng thái của function cha. Hơi khó hiểu nhỉ cùng xem ví dụ sau: <br>
```js
function Cha() {
  let stateful = 1;
  return function(){
    stateful++;
    console.log('Stateful:' + stateful)
  }
}
// gọi hàm 
Cha()();
```
Như các bạn thấy ở trên khi ta gọi hàm Cha thì nó sẽ return cho chúng ta về 1 hàm và thực thi hàm bên dưới  lại sử dụng biến  **stateful**  của hàm cha bình thường thì sẽ báo lỗi ngày vì **stateful**  làm gì được định nghĩa đâu. Nhưng khi ta viết theo kiểu Closure thì các hàm con sẽ có thể sử dụng được biến của các hàm cha
tức **stateful** của hàm cha sẽ được cộng 1 lên và in ra sẽ là 2.Điều đó khiến cho javascript vi diệu với thú vị hơn rất nhiều. <br>
Các bạn có thể vào link đây để test trực quan hơn:<br>
https://jsbin.com/dihetoyata/edit?js,console <br>

Ứng dụng: <br>
Qua khái niệm đầu ở trên họ thường dùng chúng ứng dụng vào làm tính năng search<br> 
Bình thường: Chúng ta sẽ có 1 ô input và search dữ liệu khi chúng ta gõ dẫn đến mỗi khi ta gõ là sẽ thực hiện call api lên server  (điều đó là k cần thiết có lúc gõ liên tục nhiều liền 1 lúc dẫn đến server phải xử lý nhiều request cùng lúc )
Để tối ưu hơn người ta sẽ sử dụng 2 thuật ngữ sau: **debounce** và **throttle**. <br>
**Debounce** các bạn có thể hiểu nôm na là như có 1 cái thang máy sẽ tự động đóng cửa sau 5s nếu mà có người vào thì thang máy sẽ reset và đếm lại bao giờ không có ai vào thì sau 5s nó sẽ đóng.

```js
function debounce(func, wait) {
     var timeout;
     return function() {
          var context = this, args = arguments;
          var executeFunction = function() {
               func.apply(context, args);
          };
        clearTimeout(timeout);
        timeout = setTimeout(executeFunction, wait);
     };
};
```
Các bạn có thể đọc code trên khi ta viết javascript thuần thì thấy họ đang viết hàm debounce theo kiểu Higher order function  và Closure 
tức biến **timeout** sẽ được truy cập và xử lý bởi các hàm con. <br>
**Throttle** các bạn có thể hiểu nôm na là như có 1 cái thang máy sẽ tự động đóng cửa sau 5s dù người có đi vào hay không thì cứ 5s là nó sẽ đóng tức là nó sẽ không reset lại như **Debounce**. Bạn có thể xem qua đoạn code thuần dưới đây: 
```js

function throttle(func, time) {
  var wait = false;
  
  return function() {
    if (!wait) {
      func.call();
      wait = true;
      
      setTimeout(function() {
        wait = false;
      }, time);
    }
  }

```

Oke . Ở bài này mình không đi sâu về ứng dụng nhiều nên **Debounce** và **Throttle** để hiểu kĩ và rõ về nó hơn thì bạn có thể  vào link sau: <br>
 https://anonystick.com/blog-developer/debounce-vs-throttle-javascript-202005261421546#t-2 . 
<br>Mình chỉ cho các bạn thấy là nó sử dụng các khái niệm nào thôi vì  khi ta chưa nắm rõ 2 khái niệm trên thì đọc vào core của chúng thật là khó hiểu. 
<br>Và 2 cái ứng dụng này chúng ta cũng chả cần viết lại đâu vì giờ có nhiều thư viện hỗ trợ luôn và chúng ta chỉ cần hiểu bản chất và xài thui. :) . Tuyệt vời phải không nào.

### 3.Contructor function  và Factory function
Như trong Javascript muốn khởi tạo 1 object (đối tượng)  ta thường dùng class và thực hiện với từ khóa new như sau: 
 
```js
class Home {
    // Tạo các thuộc tính (property)
    constructor(name, type) {
        this.name = name;
        this.type = type
    }
     // Thêm các phương thức (method)
    getName() {
        console.log(`${this.name}`)
    }
}

let myHome = new Home('Van', 'Nha nghi');
myHome.getName() // Van
```
 
 Ngoài cách trên ra chúng ta còn có thể xây dựng 1 đối tượng bằng cách sử dụng **Contructor function** như sau: 
 ```js
function Home (name, type) {
     this.name = name;
     this.type = type
}
// Thêm vào các phương thức (method)
Home.prototype.getName = function () {
    console.log(`${this.name}`)
}

// Khởi tạo 1 instance object
let myHome = new Home('Van', 'Nha nghi');

myHome.getName() // Van
```
 
Bình thường ta hay viết tên hàm là chữ thường nhưng  đối với **Contructor function**   họ khuyên nên là viết chữ cái đầu tiên ở dạng chữ hoa 

Ngoài **Contructor function** ta còn có thêm cách xây dụng đối tượng sử dụng **Factory Function** như sau: 

 ```js
function Home () {
     let name = 'Van';
     return {
         name: 'van',
         type: 'Nha Nghi',
         getName() {
             console.log(name);
         }
     }
}

let myHome = Home();

myHome.getName() // Van
```
Nhìn vào cách trên ta thấy **Factory Function** là một hàm bất kì nào đó và không phải class đặc biệt nó không cần sử dụng từ khóa new mà nó chỉ đơn thuần là 1 hàm và trả về 1 object mà thôi và k sử dụng từ khóa **this**. Điều thú vị là **Factory Function** có thể tạo ra thuộc tính private vốn js không hỗ trợ . Tại sao mình lại nói vậy thử xem ví dụ sau: 
```js
function Home () {
     let a = 'Van';
      return {
         name: a,
         type: 'Nha Nghi',
         getName() {
             console.log(name);
         }
     }
}

let myHome = Home();

console.log(myHome.a); // undefined
console.log(myHome.name); // Van
    
```
Ở ví dụ trên mình không thể truy cập trực tiếp vào biến a  mà mình muốn lấy được biến a thì mình phải gán nó vào object return về bạn có thể xem chi tiết hơn ở đây:<br >
https://jsbin.com/kaderinaji/edit?js,console (đối với các method cũng tương tự)

**Tóm lại:** <br>
Chúng ta nên hiểu là hai thằng này  (Contructor function  và Factory function) đều là hàm và cách dùng hàm theo những khả năng mà nó hỗ trợ.

Trong **factory function** mà mình dùng từ khóa new thì rõ ràng mình không thể truyền vào trong tham số đó được, vì trong hàm **factory function**mình khai báo, mình không dùng this.thamso = thamso để hứng lấy tham số. Ngoài ra, trong **factory function** thì mình có các hàm lồng, nếu dùng new thì nó sẽ không gọi được giống như khi mình dùng **constructor function** mình khai báo phương thức cho nó bằng cách dùng prototype.

Thực tế thì **constructor function** là phương thức để tạo object giống như class trong các ngôn ngữ thuần oop, còn **factory function** là một cách để tạo các thuộc tính private, vốn không được js hỗ trợ.Ngoài ra nên coi factory function là một dạng design pattern (chính là module pattern).<br> 
Đặc biệt viết **factory function** sẽ bảo mật và gọn hơn class rất nhiều. <br>
Tùy vào trường hợp mà mình lựa chọn cái nào nhé các bạn. <br>

Bài viết cũng tương đối dài rồi . Hẹn gặp lại các bạn ở phần sau với những khái niệm thú vị hơn trong javascript.