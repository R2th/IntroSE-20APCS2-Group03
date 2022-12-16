# Mở đầu 
Chào mọi người, chúng ta đều biết rằng Javascript là một trong các ngôn ngữ được sử dụng rộng rãi nhất hiện nay, thậm chí mọi người còn nói rằng Javascript đang ăn cả thế giới, Javascript xuất hiện trong hầu hết các dự án từ Front-end đến Back-end. Làm việc với Javascript khá nhiều nhưng có khi nào các bạn tự hỏi nó hoạt động như thế nào chưa và cách mà ngôn ngữ này được thực thi  trong môi trường Browser, cùng tìm hiểu trong bài viết hôm nay nhé.

# Javascript parsers và engines

Như chúng ta đã biết, Javascript luôn được thực thi trong các môi trường Browser như Google Chrome, Safari, Firefox, ...ngoài ra nó còn được chạy trong môi trường Node.js, tuy nhiên bài viết này sẽ chỉ tập trung vào các browser. 

Khi chúng ta viết code Javascript và chạy đoạn code đó, một `javascript engine` sẽ nhận đoạn mã đó mà thực thi nó, trong trường hợp bạn chưa biết thì `javascript engine` là một chương trình để thực thi code được viết bằng Javascript, một số `javascript engine` nổi tiếng như Google's V8 Engine, SpiderMonkey, JavascriptCore,... Các Engine này sẽ nhận vào code được viết bằng Javascript và sẽ phân tích từng dòng một, nếu có lỗi về syntax, nó sẽ ném ra lỗi và chương trình dừng hoạt động, nếu đoạn code đó đã được sửa hết lỗi Engine sẽ chuyển các đoạn mã đó thành mã máy để máy tính có thể hiểu và thực thi chúng. Các Engine khác nhau sẽ có chút khác biệt về cách hoạt động, nhưng nó đều có vai trò giống nhau là môi trường thực thi các đoạn mã được viết bằng Javascript.

![](https://images.viblo.asia/1f8adfff-9469-4816-b288-d98df6238275.png)

# Execution context và Execution stack

Vậy là chúng ta đã biết các đoạn code Javascript được chạy trong một môi trường (ở đây là Browser) và các môi trường đó còn được gọi là các `Execution context` (EC), để dễ hình dung, hãy tưởng tượng  `Execution context` như một container chứa code của chúng ta như các biến, function. Mặc định, các đoạn code không nằm trong bất kỳ một function nào đều nằm trong `Global Execution context` (GEC) và được gán trực tiếp với `global object`, và  `global object` trong môi trường Browser chính là `window` object ! 

```
var helloBuddy;
helloBuddy === window.helloBuddy
// true
```

Khi đã xác định được EC, giờ hãy cùng đi đến phần thú vị khác đó là `Execution stack`, đó là một cấu trúc dữ liệu nơi mà một EC mới được đẩy lên trên GEC nếu có một function nào đó được thực thi, và cứ tiếp tục như vậy, nếu trong function đó lại có môt function khác cần thực thi, thì function "con" đó sẽ tạo ra một  EC mới ở trên EC trước đó, như hình dưới đây:

![](https://images.viblo.asia/abd258e5-35d1-4996-a26d-fae0c328d7ba.png)

Khi các Engine gặp biến a và function one(), nó sẽ được chưa trong GEC vì nó không nằm trong bất kỳ một function nào,  khi thực thi function one(), nó tạo một EC nằm trên GEC, tiếp tục, trng function one() có 2 biến là b và c, cả 2 biến này đều nằm trong `one() execution context` , đến dòng thực thi function two() nó sẽ lại sinh ra một EC khác nằm trên  `one() execution context` . và sau khi đã thực hiện xong, các EC của one() và two() sẽ mất đi và chỉ còn lại GEC.

# Creation phases, Execution phases và Hoisting

Ở phần trên chúng ta đã tìm hiểu khi nào các EC được tạo và bây giờ chúng ta sẽ tìm hiểu về cách mà nó được tạo ra, một EC có thể xem như một object và object đó bao gồm 3 thuộc tính:
* Variable Object (VO)
* Scope Chain
* từ khóa "this"

###  Variable Object (VO)

Ta đã biết Khi một function được gọi bên trong một fuction khác, một EC mới được tạo ra, quá trình này gồm 2 phần gọi là `Creation phase` và `Execution phase`. Tất cả các thuộc tính như VO, Scope Chain và từ khóa "this" được hình thành ở phần `Creation`, sau đó đến phần `Execution` là lúc mà các đoạn code sẽ được thực thi.

Khi code được thực thi, mỗi khi ta khai báo một function, một thuộc tính sẽ được tạo ra trong VO và thuộc tính này sẽ trỏ đến function đó, nghĩa là các function sẽ được lưu giữ trong các VO trước khi đoạn code trong function đó được thực hiện hay nói cách khác ta có thể sử dụng function đó trước khi chúng ta thực sự khai báo. Nhưng khi ta khai báo một biến, một thuộc tính sẽ được tạo ra trong VO và thuộc tính này sẽ có giá trị là `undefined`, trong Javascript 2 quá trình này gọi là *Hoisting*.

```
// khai báo function
sayHello("Nguyen Van A");  // Hello Nguyen Van A
function sayHello(friend) {
    console.log("Hello " + friend);
}

// Khai báo biến
console.log(year);  //undefined
const year = 2019;
```

###  Scope Chain

Scope là phạm vi mà một biến có thể được truy cập tới, trong mỗi function có một Scope của riêng nó, nơi mà các biến được khai báo

```
var a = 'apple'
one()
function one() {
     var b = 'ball'
     two()
     function two() {
         var c = 'cat'
        console.log(a + b + c)
     }
}
```

Đoạn code trên sẽ in ra kết quả là appleballcat vì hàm two() có thể truy cập tới các biến được khai báo bên ngoài nó, như vậy scope của hàm two() bao gồm các biến của chính nó và các biến được lưu trữ trong VO của one() và Global VO, sơ đồ dưới đây sẽ giúp bạn dễ hình dung hơn: 

![](https://images.viblo.asia/570813c3-3016-4626-8e40-c414a75f43a8.png)

###  Từ khóa "this"

Mỗi một EC mới được tạo ra đều có một biến "this", trong một **Regular function call** biến "this" được trỏ tới GEC, là `window` object trong browser. Biến "this" chỉ thực sự trỏ tới một object khi nó nằm trong một **Method call**  của object đó. Ta xét ví dụ sau đây: 

```
//  Regular function call
sayHello();  //  Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
function sayHello() {
    console.log(this);
}

// Method call
const car = {
    name: 'Coupe',
    model: 2018,
    information: function() {
        console.log(this);
    }
}
car.information(); // {name: "Coupe", model: 2018, information: ƒ}
```

Như các bạn thấy ở  **Method call** *this* trỏ tới object *car*  còn  **Regular function call** thì không mặc dù nó nằm trong function gọi nó.

# Tổng kết

Đến đây hy vọng bạn hiểu được cách mà javascript hoạt động trong browser và hiểu hơn cách mà mỗi dòng code của chúng ta được thực hiện.
Cám ơn các bạn đã theo dõi bài viết của mình :grinning:

*Tham Khảo*
https://medium.com/@sharangohar/how-javascript-works-behind-the-scenes-fb65b81d6e1c