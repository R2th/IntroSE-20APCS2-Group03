Xin chào mọi người, bài viết này ta sẽ tìm hiểu về 3 hàm khá quan trọng khi làm việc với javascript đó là bind(), call() và apply(). Khi học Javascript mình đã rất thắc mắc sự khác biệt và khi nào nên sử dụng hàm call() và hàm apply(), Javacript không dư thừa đến mức tạo ra hai hàm có công dụng y chang nhau. Hãy cùng tìm hiểu về sự khác biệt của chúng.
# I. Hàm bind()
Bind là một hàm nằm trong Function.prototype, do đó chỉ có function mới có khả năng gọi nó.  Bind được dùng để xác định tham số this cho một function. Hãy cùng xem ví dụ khá phổ biến dưới đây.<br>
``` javascript
    var person = {
      firstName: 'Hoang',
      lastName: 'Pham',
      showName: function() {
        console.log(this.firstName + ' ' + this.lastName);
      }
    };

    //showName truyền vào như callback, ở đây this chính là button
    $('button').click(person.showName); 
```
Trong quá trình làm việc với Jquery nếu không để ý sẽ dễ gặp bugs vì nghĩ **this** ở đây sẽ trỏ đến person nhưng thực tế là nó lại trỏ đến **button** do đó sẽ dẫn đến kết quả không mong muốn. Để fix lỗi trên ta sẽ sử dụng hàm bind() <br>
``` javascript
    // Dùng bind để xác định giá trị this
    $('button').click(person.showName.bind(person)); //this ở đây vẫn là object person
```
### Hàm bind() cho phép mượn method
``` javascript
   var user = {
        data    :[
            {name:"T. Woods", age:37},
            {name:"P. Mickelson", age:43}
        ],
        showData:function (event) {
            var randomNum = ((Math.random () * 2 | 0) + 1) - 1;
            console.log (this.data[randomNum].name + " " + this.data[randomNum].age);
        }
  }
  var cars = {
    data:[
        {name:"Honda Accord", age:14},
        {name:"Tesla Model S", age:2}
    ]
  }
  
// Ta có thể  cho phép cars mượn hàm showData () từ object user
cars.showData = user.showData.bind (cars);
cars.showData (); // Honda Accord 14
```
Với 2 công dụng phổ biến trên, hàm bind() được sử dụng khá linh hoạt, cho phép ta có thể dễ dàng "gắn" this vào một object và không cần phải lo lắng là this sẽ trỏ đến một object khác mỗi khi gọi. 
# II. Hàm Call() và Apply()
Đây là 2 hàm khá phổ biến hay được sử dụng trong JavaScript. Hai hàm này nằm trong prototype của Function (Function.prototype), do đó chỉ function mới có thể gọi. Chúng có chung một chức năng lại: Gọi 1 function, xác định tham số this, truyền các tham số còn lại vào. <br>
Điểm khác nhau là apply() truyền vào một array chứa toàn bộ các tham số, còn call() truyền lần lượt từng tham số. Hãy cùng tìm hiểu thông qua các ví dụ dưới đây để hiểu rõ hơn về công dụng của 2 hàm này. <br>
###  Set this sử dụng call và apply
Giống như việc sử dụng bind(),  chúng ta cũng có thể set được this bằng cách sử dụng apply() và call() với tham số đầu tiên trong 2 hàm này sẽ xác định object mà ta muốn set this trỏ đến khi gọi hàm. Hãy cùng xem ví dụ dưới đây <br>
``` javascript
    // khai báo một biến toàn cục
    var avgScore = "global avgScore";
    
    // hàm tính trung bình của một mảng các điểm truyền vào
    function avg (arrayOfScores) {
        //Thêm điểm số vào mảng và trả về tổng điểm
        var sumOfScores = arrayOfScores.reduce (function (prev, cur, index, array) {
            return prev + cur;
        });

        // Sử dụng "this" ở đây sẽ trỏ đến global object thay vì trỏ đến object mà ta mong muốn, 
        // ta sẽ sử dụng apply và call để thực hiện hành động này
        this.avgScore = sumOfScores / arrayOfScores.length;
    }

    var gameController = {
        scores  :[20, 34, 55, 46, 77],
        avgScore:null
    }

    // Nếu ta chạy function tính điểm trung bình trên thì this sẽ trỏ đến global object (window) do đó dẫn đến kết quả không mong muốn
    avg (gameController.scores);
    console.log (window.avgScore); // 46.4
    console.log (gameController.avgScore); // null

    // reset biến global avgScore
    avgScore = "global avgScore";

    // Để set this trỏ đến objct gameController, ta sẽ gọi hàm call()
    avg.call (gameController, gameController.scores);
    
    console.log (window.avgScore); //global avgScore
    // Lúc này this đã trỏ đúng đến object mong muốn do đó sẽ cho ra kết quả đúng
    console.log (gameController.avgScore); // 46.4
```
### Sử dụng Call hoặc Apply để set this trong callback function
2 hàm call() và apply() có thể sử dụng trong các hàm callback function
``` javascript
    // Định nghĩ một object với các thuộc tính và hàm
    // Sau đó ta sẽ truyền hàm như một callback function vào một hàm khác
    var clientData = {
        id: 094545,
        fullName: "Not Set",
        // setUserName is a method on the clientData object
        setUserName: function (firstName, lastName)  {
        // this refers to the fullName property in this object
        this.fullName = firstName + " " + lastName;
        }
    }
```

``` javascript
    function getUserInput (firstName, lastName, callback, callbackObj) {
        // Sử dụng apply để set "this" vào object callbackObj, tham số đầu tiên là object muốn set this trỏ vào, tham số thứ 2 là một mảng các tham số của hàm.
        callback.apply (callbackObj, [firstName, lastName]);
    }
```
## Mượn hàm sử dụng apply và call
Cách sử dụng phổ biến nhất của apply và call đó là mượn hàm trong javascript. Ta sẽ thực hiện việc mượn function giống như cách thưc hiện với bind.
### Mượn methods của Array
Hãy cùng xem xét ví dụ sau <br>
``` javascript
    var anArrayLikeObj = {
        0:"Martin", 1:78, 2:67, 3:["Letta", "Marieta", "Pauline"], length:4
    };
```
Tiếp theo nếu ta muốn mượn các hàm của Array ta sẽ thực hiện như sau <br>
``` javascript
    var newArray = Array.prototype.slice.call (anArrayLikeObj, 0);

    console.log (newArray); // ["Martin", 78, 67, Array[3]]

   // Search chữ "Martin" trong array sử dụng hàm call
    console.log (Array.prototype.indexOf.call (anArrayLikeObj, "Martin") === -1 ? false : true); // true

    // Sử dụng Array method không sử dụng call() hoặc apply()
    console.log (anArrayLikeObj.indexOf ("Martin") === -1 ? false : true); // Error: Object không có hàm 'indexOf'

    // Sử dụng call để dùng hàm reverse
    console.log (Array.prototype.reverse.call (anArrayLikeObj));
    // {0: Array[3], 1: 67, 2: 78, 3: "Martin", length: 4}

    // Ta cũng có thể sử dụng hàm pop bằng cách sử dụng hàm call():
    console.log (Array.prototype.pop.call (anArrayLikeObj));
    console.log (anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, length: 3}

    // Và push
    console.log (Array.prototype.push.call (anArrayLikeObj, "Jackie"));
    console.log (anArrayLikeObj); // {0: Array[3], 1: 67, 2: 78, 3: "Jackie", length: 4}
```
### Mượn hàm từ object khác
Ta cũng có thể mượn hàm từ object giống như cách thực hiện với ví dụ trên như hàm bind trên, hãy cùng xem ví dụ sau  <br>
``` javascript
    var gameController = {
        scores  :[20, 34, 55, 46, 77],
        avgScore:null,
        players :[
            {name:"Tommy", playerID:987, age:23},
            {name:"Pau", playerID:87, age:33}
        ]
    }

    var appController = {
        scores  :[900, 845, 809, 950],
        avgScore:null,
        avg     :function () {

            var sumOfScores = this.scores.reduce (function (prev, cur, index, array) {
                return prev + cur;
            });

            this.avgScore = sumOfScores / this.scores.length;
        }
    }

    // Ta sử dụng hàm apply() như sau
    appController.avg.apply (gameController);
    console.log (gameController.avgScore); // 46.4

    // appController.avgScore vẫn nhận giá trị null mà không được updated, chỉ có gameController.avgScore được update
    console.log (appController.avgScore); // null
```
### Mở rộng chức năng của hàm sử dụng call và apply
``` javascript
    var obj = {
        method: function() {
          console.log("This is method of obj");
        }
    }
    // Sử dụng call để thêm log vào trước và sau hàm
    var obj = {
        method: function() {
          console.log("This is method of obj");
        }
    }
    
    var oldFunction = obj.method;
    obj.method = function() {
        console.log("before function");
        oldFunction.apply(this.arguments);
        console.log("after function");
    }
    
    obj.method();
    // before function
    // This is method of obj
    // after function
```

Trên đây là cách cách sử dụng phổ biến của 2 hàm apply và call, 2 hàm này còn các công dụng khác nhưng ở đây mình sẽ chỉ tìm hiểu cách hay sử dụng nhất.

# III. Kết luận
Như vậy bài viết đã giúp tìm hiểu về 3 hàm rất quan trọng trong javascript - bind, call và apply. Cách sử dụng của chúng trong các trường hợp khác nhau. Hi vọng bài viết giúp ích cho mọi người, nếu có gì góp ý hay thảo luận xin hãy để lại bình luận phía dưới. (See you) 😄