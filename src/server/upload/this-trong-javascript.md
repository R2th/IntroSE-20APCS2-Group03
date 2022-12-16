Đây không phải một chủ đề xa lạ gì trong lập trình hướng đối tượng, tuy nhiên việc có thể sử dụng mượt mà `this` không phải là việc dễ dàng với những bạn bắt đầu làm việc với *javascript*. Vì vậy hôm nay mình quyết định chọn chủ đề này vừa để ôn lại kiến thức vừa giúp các bạn mới có thể hiểu kỹ hơn.

Nhớ lại một chút nhé, dưới đây là đoạn code cơ bản trong lập trình hướng đối tượng java:
```java
class User {
    String username;
    
    public void setName(String name) {
        username = name;
    }

    public String getName(){
        return this.username;
    }
}

User user = new User();
String name = user.getName();

```
Khi code được biên dịch thì ở function `getName()` con trỏ `this` lúc này được đại diện cho đối tượng `User` và `this.username` chính là việc chỉ định thuộc tính `username` của class `User`.

Ở java việc hoạt động của `this` khá tường minh như vậy, tuy nhiên trong javascript thì câu chuyện đã trở nên magic hơn rất nhiều.

Về cơ bản, cách gọi của `this` trong javascript không khác gì với java, ví dụ:
````javascript
var name = {
    firstName: 'Tuan',
    lastName: 'Nguyen',
    fullName: function () {
        console.log(this.firstName + ' ' + this.lastName);
        ​// Hoặc có thể viết
        console.log(name.firstName + ' ' + name.lastName);
    }
}

name.fullName(); // Tuan Nguyen
````

Tuy nhiên, điều mình cần chú ý ở bài viết này đó là **CONTEXT** hay *ngữ cảnh*, trong javascript mỗi đoạn code được thực hiện trong một *ngữ cảnh* nhất định và thực hiện một cách tuần tự, Và trong mỗi *ngữ cảnh* đó sẽ có một `this` đại diện. Vì vậy khi *ngữ cảnh* thay đổi thì `this` sẽ cần được đánh giá lại. 

Có 3 loại ngữ cảnh chính:

# Global:
Đây là *ngữ cảnh* đầu tiên thực thi chương trình, ở đây mình nói riêng với trình duyệt đó sẽ là đối tượng `window`. Ví dụ:
```javascript
var firstName = 'Tuan', lastName = 'Nguyen';
// 2 biến này nằm trong đối tượng window

function showFullName()
{
  console.log(this.firstName + ' '+ this.lastName);
}

window.showFullName(); // Tuan Nguyen this trỏ tới đối tượng window
showName(); // Tuan Nguyen  Đối tượng gọi hàm showName vẫn là object window

```

# Function: 


#### **Ngữ cảnh toàn cục:**

Ở *ngữ cảnh* này, `this` sẽ tham chiếu tới đối tượng toàn cục. Ví dụ:
```javascript
function globalMethod() {
    console.log(this); // đối tượng toàn cục - global object
}

globalMethod();

var obj = {
    method: function() {
        return (function() {
            console.log(this); // đối tượng toàn cục
        });
    }
};

obj.method();
```



#### **Thông qua đối tượng:**

Ở đây, `this` sẽ tham chiếu tới đối tượng tương ứng chứa hàm. Ví dụ:
```javascript
var obj = {
    method: function() {
        console.log(this);
    }
};

obj.method();    // this sẽ tương ứng với đối tượng obj

// Gắn method cho đối tượng khác
var anotherObj = {
    name: "new Obj"
};
anotherObj.method = obj.method;

anotherObj.method(); // this sẽ tương ứng với đối tượng anotherObj

```
Tuy nhiên nếu truyền vào như một `callback` cho một hàm khác thì sao? Giả sử:

```javascript
var obj = {
    method: function() {
        console.log(this);
    }
};
$('#button').click(obj.method);
```
Lúc này thì surprise :v `this` đã tham chiếu đến button chứ không phải là `obj` nữa. 
Vậy làm sao để `this` có thể tham chiếu đến đối tượng trong trường hợp này? 

Javascript cho chúng ta cách giải quyết đó là đưa *ngữ cảnh*  của `this` vào đối tượng bằng hàm `bind()`, nó sẽ giúp chúng ta xác định được *ngữ cảnh* cho `this`. 
```javascript
// Dùng bind
$('#button').click(obj.method.bind(obj)); //this ở đây vẫn là object obj

// Hoặc có thể dùng anonymous function
$('#button').click(function(){ obj.method() });

```

#### Thông qua một biến:
```javascript
var name = "Tuan";
var user = {
    name: "Tuan Nguyen",
    getName: function () {
        return this.name; // this sẽ tương ứng với đối tượng user
    }
};

user.getName(); // Tuan Nguyen

var getUserName = user.getName; // Tuy nhiên ở đây gán cho biến global
getUserName(); // Tuan
```

Như ở ví dụ trên, để có thể lấy đúng giá trị của `name` trong đối tượng `user` chúng ta có thể viết lại như sau:
```javascript
var name = "Tuan";
var user = {
    name: "Tuan Nguyen",
    getName: function () {
        return this.name; // this sẽ tương ứng với đối tượng user
    }
};

var getUserName = user.getName.bind(user); // Tuy nhiên ở đây gán cho biến global
getUserName(); // Tuan Nguyen
```

----
Vừa rồi là một số ví dụ về các trường hợp của `this` trong javascript và cách giải quyết vấn đề bằng `bind()`, ngoài ra các bạn có thể tìm hiểu thêm `call()` và `apply()`  để có thể sử dụng `this` linh hoạt hơn.

# Kết luận
Đã có khá nhiều bài viết về con trỏ `this` trong javascript tuy nhiên mình vẫn quyết định viết và tổng hợp lại vì đây là kiến thức quan trọng để có thể xử lý tình huống trơn tru và giải quyết vấn đề tốt hơn khi làm việc. Mong các bạn có thể tìm thấy phần mình cần ở đây. 

Cám ơn đã theo dõi! (bow)

Nguồn tham khảo:

http://es5.github.io/#x10.4.3


http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/

https://dominhhai.github.io/vi/2015/03/js-what-is-this/