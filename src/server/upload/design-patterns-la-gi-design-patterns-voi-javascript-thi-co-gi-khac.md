# Design Patterns
Chắc hẳn mọi người đang đọc bài viết này cũng đã từng ngồi trên ghế của các trường đại học, cao đẳng hoặc thông qua việc tìm tòi cũng đều đã nghe qua design patterns vậy design partterns là j và nó có ích gì trong quá trình phát triển phần mềm ? 

## Pattern và design patterns là gì ?

Pattern là một mẫu thiết kế của các sự kiện hoặc đối tượng định, nó có thể là một mẫu hoặc mô hình mà dựa vào nó có thể giúp sử dụng để giải quyết vấn đề.
Trong phát triển phần mềm, một pattern là một giải pháp cho một vấn đề phổ biến. Một pattern không nhất thiết là một giải pháp mà sẵn có thể copy và paste một cách thông thường mà là một sự trừu tượng, một khuôn mẫu để giải quyết các loại vấn đề.

Việc xác định được các pattern là điều quan trọng bởi vì:
- Chúng giúp viết code tốt hơn thông qua nhưng người cũ đã đã gặp phải. Ví dụ chúng ta sẽ không phải phát minh lại bánh xe bởi vị trong thực tế chúng ta cũng đã thấy được tác dụng của nó.
- Hỗ trợ một mức độ trừu tượng dễ dình dung từ đó có thể tập chung cho giải quyết vấn đề phức tạp hơn mà không phải lo đến các chi tiết mức thấp vì các patterns đã giải quyết vấn đề đó.
- Không chỉ vậy chúng còn giúp cải thiện trong việc kết hợp giữa các dev và các nhóm. Đơn giản nếu giữa các dev làm việc với nhau nắm được kỹ thuật hoặc cách tiếp cận sẽ giúp dễ dàng hơn trong việc phát triển bảo trì sau này. 
Thông thường để có mức độ khái quát nhất trong nâng cao trình độ phát triển phần mềm chúng ta nên tìm hiểu từ: Design patterns, Coding patterns, Antipatterns. 

Design patterns là những mẫu được định nghĩa ban đầu bởi cuốn sách "Gang Gang of Four" (được đặt tên theo tên của bốn tác giả), được xuất bản lần đầu vào năm 1994 với tiêu đề "Design Patterns: Elements of Reusable Object-Oriented Software".  Và một số design pattern chắc bạn cũng đã nghe qua như singleton, factory, decorator, observer, ... 

Thông thường khi nhắc đến Design Patterns người ta hay nghĩ đến những ngôn ngữ hỗ trợ mạnh về static-class nhưng có bao giờ bạn nghĩ đến design patterns cho javascripts một ngôn ngữ dựa trên untyped dynamic prototype ?

Coding patterns thực sự thú vị hơn nhiều. Nó là các mẫu dành riêng cho JavaScript liên quan đến các tính năng độc đáo của ngôn ngữ, chẳng hạn như việc sử dụng các hàm khác nhau.

Antipatterns nhìn qua thì có một chút âm thanh tiêu cực hoặc thậm chí gây khó chịu trên tên quả nó. Một Antipatterns không giống như một lỗi của ngôn ngữ hay một lỗi khi coding. Nó chỉ là một cách tiếp cận phổ biến nhưng lại gây ra nhiều vấn đề hơn là nó giải quyết được.

Nhưng trong bài viết này mình chỉ tập chung vào Design patterns cho bạn cái nhìn khái quát  nhất.

## Singleton
Ý tưởng của mẫu singleton là chỉ có một thể hiện của một lớp. Điều này có nghĩa là khi lần thứ hai bạn sử dụng cùng một lớp để tạo một đối tượng mới, bạn sẽ nhận được cùng một đối tượng đã được tạo lần đầu tiên.
Và singleton thì áp dụng cho JavaScript như thế nào?
Trong JavaScript không có class, chỉ có các objects. Khi bạn tạo một đối tượng mới, thực sự không có đối tượng giống như vậy và đối tượng khi được tạo thực chất đã là một singleton. 
```javascript
var obj = {
 myprop: 'my value'
};
```

Trong JavaScript, các đối tượng không bao giờ bằng nhau trừ khi chúng là cùng một đối tượng, vì vậy ngay cả khi bạn tạo một đối tượng giống hệt nhau với các thuộc tính nhưng nó sẽ không cùng với đối tượng đầu tiên.
```javascript
var obj2 = {
 myprop: 'my value'
};
obj === obj2; // false
obj == obj2; // false
```
Vì vậy, bạn có thể nói rằng mỗi khi bạn tạo một đối tượng bằng cách sử dụng đối tượng, bạn thực sự tạo ra một singleton mà không phải sử dụng một cú pháp nào.

### Using new
JavaScript không có class, vì vậy định nghĩa nguyên văn cho singleton không mang nhiều ý nghĩa về mặt kỹ thuật. Nhưng JavaScript có cú pháp new để tạo các đối tượng bằng các constructor functions và đôi khi bạn có thể muốn triển khai singleton bằng cú pháp này.
Ý tưởng là khi bạn sử dụng new để tạo một số đối tượng sử dụng cùng một constructor, bạn sẽ chỉ nhận được các con trỏ mới cho cùng một đối tượng.
```javascript
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true
```
Trong ví dụ này, uni chỉ được tạo lần đầu tiên khi hàm tạo được gọi. Lần thứ hai (và lần thứ ba, thứ tư, v.v.) cùng một đối tượng uni được trả về. Đây là lý do tại sao uni === uni2, vì về cơ bản chúng là hai tham chiếu trỏ đến cùng một đối tượng. Và làm thế nào làm được điều này trong JavaScript?

Bạn cần xây dựng Universe constructor, đối tượng này được lưu lại khi nó được tạo ra và sau đó trả lại lần thứ hai cho khi constructor được gọi. Có một số giải pháp để thực hiện: 
- Bạn có thể sử dụng một biến toàn cục để lưu trữ thể hiện
- Bạn có thể lưu trữ trong một thuộc tính tĩnh trong hàm constructor. Functions trong JavaScript là các đối tượng, vì vậy chúng có thể có các thuộc tính. Chẳng hạn như Universe.instance và lưu trữ đối tượng ở đó. Đây là một giải pháp tốt, gọn gàng với nhược điểm duy nhất là thuộc tính thì có thể truy cập công khai bởi mã bên ngoài của bạn có thể thay đổi nó.
- Bạn có thể wrap các thể hiện trong một closure. Điều này giữ cho các thể hiện đủ private và không thể truy cập bên ngoài hàm constructor.

### Instance in a Static Property

```javascript
function Universe() {
    // do we have an existing instance?
    if (typeof Universe.instance === "object") {
        return Universe.instance;
    }
    // proceed as normal
    this.start_time = 0;
    this.bang = "Big";
    // cache
    Universe.instance = this;
    // implicit return:
    // return this;
}
// testing
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true
```
Như bạn thấy, đây là một giải pháp đơn giản với nhược điểm duy nhất là instance bị public. Nó không chắc rằng các mã khác sẽ thay đổi nó do nhầm lẫn 

### Instance in a Closure

Một cách khác để thực hiện singleton giống như class là sử dụng một closure để bảo vệ single instance. Bạn có thể thực hiện điều này bằng cách sử dụng private static member.
```javascript
function Universe() {
    // the cached instance
    var instance = this;
    // proceed as normal
    this.start_time = 0;
    this.bang = "Big";
    // rewrite the constructor
    Universe = function () {
        return instance;
    };
}
// testing
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true
```
Hàm tạo ban đầu được gọi lần đầu tiên và nó trả về giá trị this như bình thường. Sau đó, lần thứ hai, lần thứ ba, v.v. Hàm tạo được viết lại có quyền truy cập vào biến thể hiện thông qua closure và chỉ cần trả về nó. Hạn chế là hàm bị viết lại (trong trường hợp này là hàm constructor của Universe()) sẽ mất bất kỳ thuộc tính nào được thêm vào giữa thời điểm khởi tạo ban đầu và khởi tạo lại.
```javascript
// adding to the prototype
Universe.prototype.nothing = true;
var uni = new Universe();
// again adding to the prototype
// after the initial object is created
Universe.prototype.everything = true;
var uni2 = new Universe();

// only the original prototype was
// linked to the objects
uni.nothing; // true
uni2.nothing; // true
uni.everything; // undefined
uni2.everything; // undefined
// that sounds right:
uni.constructor.name; // "Universe"
// but that's odd:
uni.constructor === Universe; // false
```
Nếu mục đích là trỏ đến constructor nguyên mẫu ban đầu thì chỉ cần chỉnh sửa lại một chút:
```javascript
function Universe() {
    // the cached instance
    var instance;
    // rewrite the constructor
    Universe = function Universe() {
        return instance;
    };
    // carry over the prototype properties
    Universe.prototype = this;
    // the instance
    instance = new Universe();
    // reset the constructor pointer
    instance.constructor = Universe;
    // all the functionality
    instance.start_time = 0;
    instance.bang = "Big";
    return instance;
}
```


## Factory
Mục đích của factory là tạo ra các đối tượng. Nó thường được triển khai trong một class hoặc một method tĩnh của một class, có các mục đích sau:
- Thực hiện các thao toán tử lặp lại khi thiết lập các đối tượng tương tự .
- Cung cấp một cách để tạo các đối tượng mà không cần biết chính xác loại (class) cụ thể thông qua factory.

Điểm thứ hai là quan trọng hơn trong các ngôn ngữ static class, là việc không cần thiết để tạo các thể hiện của các lớp. Trong JavaScript, phần triển khai này khá dễ dàng.

Các đối tượng được tạo bởi factory method (hoặc class) là do thiết kế kế thừa từ cùng một đối tượng cha. Chúng là các lớp con cụ thể thực hiện chức năng chuyên biệt. Đôi khi cha chúng là cùng một lớp có chứa phương thức factory.
Thông qua ví dụ dưới đây sẽ giúp bạn phần nào hiểu được về factory : 
- Một constructor CarMaker.
- Một static method của CarMaker được gọi là Factory(), tạo ra các đối tượng car. 
- Các constructors chuyên dụng CarMaker.Compact, CarMaker.SUV và CarMaker.Convertible được kế thừa từ CarMaker. Tất cả chúng sẽ được định nghĩa là thuộc tính tĩnh của lớp cha để có thể tìm lại khi cần.

Chúng ta sẽ có :
```javascript
var corolla = CarMaker.factory('Compact');
var solstice = CarMaker.factory('Convertible');
var cherokee = CarMaker.factory('SUV');
corolla.drive(); // "Vroom, I have 4 doors"
solstice.drive(); // "Vroom, I have 2 doors"
cherokee.drive(); // "Vroom, I have 17 doors"
```
Có lẽ `var corolla = CarMaker.factory ('Compact')` sẽ là dễ nhận biết nhất trong mô hình factory. Bạn có một phương thức nhận tham số đầu vào là string và trả về một object với từng kiểu loại của đối tượng mà không phải dùng đến new constructors chúng thực chất chỉ là một hàm tạo các đối tượng dựa trên một loại được xác định bởi một chuỗi truyền vào.

```javascript
// parent constructor
function CarMaker() { }
// a method of the parent
CarMaker.prototype.drive = function () {
    return "Vroom, I have " + this.doors + " doors";
};
// the static factory method
CarMaker.factory = function (type) {
    var constr = type,
        newcar;
    // error if the constructor doesn't exist
    if (typeof CarMaker[constr] !== "function") {
        throw {
            name: "Error",
            message: constr + " doesn't exist"
        };
    }
    // at this point the constructor is known to exist
    // let's have it inherit the parent but only once
    if (typeof CarMaker[constr].prototype.drive !== "function") {
        CarMaker[constr].prototype = new CarMaker();
    }
    // create a new instance
    newcar = new CarMaker[constr]();
    // optionally call some methods and then return...
    return newcar;
};
// define specific car makers
CarMaker.Compact = function () {
    this.doors = 4;
};
CarMaker.Convertible = function () {
    this.doors = 2;
};
CarMaker.SUV = function () {
    this.doors = 24;
};
```
Không có gì khó khăn trong việc thực hiện mô hình factory. Tất cả những gì bạn cần làm là tìm kiếm hàm tạo để tạo một đối tượng theo từng loại yêu cầu. Trong trường hợp này, một quy ước đặt tên đơn giản đã được sử dụng để ánh xạ các loại đối tượng đến các hàm tạo tạo chúng.

## Interator

Trong mẫu iterator, bạn có một đối tượng chứa một số loại dữ liệu tổng hợp. Dữ liệu này có thể được lưu trữ nội bộ trong một cấu trúc phức tạp và bạn muốn cung cấp quyền truy cập dễ dàng vào từng thành phần dựa trên cấu trúc đó. Người dùng không cần phải biết cách bạn cấu trúc dữ liệu của mình. Tất cả những gì họ muốn là lấy được với các yếu tố riêng lẻ.

Trong mẫu iterator, đối tượng của bạn cần cung cấp phương thức next(). Việc gọi next() theo thứ tự phải trả về phần tử liên tiếp tiếp theo, trong đó nó sẽ tùy thuộc vào bạn để quyết định ý nghĩa của tiếp theo là gì trong cấu trúc dữ liệu cụ thể của bạn.

Giả sử rằng đối tượng của bạn được gọi là agg, bạn có thể truy cập từng phần tử dữ liệu bằng cách gọi next () trong một vòng lặp như sau:
```javascript
var element;
while (element = agg.next()) {
    // do something with the element ...
    console.log(element);
}
```
Trong mẫu pattern, đối tượng tổng hợp cũng thường cung cấp phương thức xác định xem họ đã đạt đến cuối dữ liệu chưa đó là hasNext()
```javascript
while (agg.hasNext()) {
    // do something with the next element...
    console.log(agg.next());
}
```

Bây giờ chúng ta có các trường hợp sử dụng, hãy  xem cách triển khai một đối tượng tổng hợp như vậy. Khi thực hiện mẫu interator, việc quan trọng là lưu trữ dữ liệu và con trỏ (chỉ mục) đến phần tử có sẵn tiếp theo:

```javascript
var agg = (function () {
    var index = 0,
        data = [1, 2, 3, 4, 5],
        length = data.length;
    return {
        next: function () {
            var element;
            if (!this.hasNext()) {
                return null;
            }
            element = data[index];
            index = index + 2;
            return element;
        },
        hasNext: function () {
            return index < length;
        }
    };
}());
```

Để cung cấp bổ sung hỗ trợ cho truy cập data bạn cũng có thể thêm method dạng như: 
- **rewind()** : Reset lại con trỏ về vị trí ban đầu.
- **current()**: Trả lại giá trị hiện tại của con trỏ đang đặt đến.

```javascript
var agg = (function () {
    // [snip...]
    return {
        // [snip...]
        rewind: function () {
            index = 0;
        },
        current: function () {
            return data[index];
        }
    };
}());
```

## Strategy

Mẫu strategy cho phép bạn chọn các thuật toán trong khi runtime. Các code của bạn có thể hoạt động với cùng một interface nhưng được lựa chọn từ một số thuật toán có sẵn để xử lý tác vụ cụ thể của chúng. Một ví dụ về việc sử dụng mẫu strategy sẽ giải quyết vấn đề xác thực form. Bạn có thể tạo một đối tượng validator bằng phương thức validate(). Phương thức này sẽ xác thực với from và trả về cùng kết quả hoặc trả về lỗi không thể validate.
Nhưng tùy thuộc vào loại form cụ thể và dữ liệu sẽ được xác thực, validator của bạn có thể chọn nhiều loại khác nhau để kiểm tra và lựa chọn thuật toán thích hợp nhất để thực hiện
Giả định rằng bạn có một đoạn dữ liệu và bạn muốn xác minh xem nó có hợp lệ hay không :

```javascript
var data = {
     first_name: "Super",
     last_name: "Man",
     age: "unknown",
     username: "o_O"
};
```
Để validator biết strategy tốt nhất để sử dụng trong ví dụ cụ thể này là gì, bạn cần định cấu hình trình xác thực trước và đặt quy tắc về những gì bạn cho là hợp lệ và có thể chấp nhận.
```javascript
validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};
```

Bây giờ, đối tượng validator được cấu hình để xử lý dữ liệu của bạn, gọi phương thức validate() và in bất kỳ lỗi xác thực lên console:
```javascript
validator.validate(data);
if (validator.hasErrors()) {
    console.log(validator.messages.join("\n"));
}
```
Bây giờ hãy xem đoạn code thực thi validator:
```javascript
// checks for non-empty values
validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== "";
    },
    instructions: "the value cannot be empty"
};
// checks if a value is a number
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value);
    },
    instructions: "the value can only be a valid number, e.g. 1, 3.14 or 2010"
};
// checks if the value contains only letters and numbers
validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-9]/i.test(value);
    },
    instructions: "the value can only contain characters and numbers, no special symbols"
};
```
Và cuối cùng là phần chính của đối tượng validtor :
```javascript
var validator = {
    // all available checks
    types: {},
    // error messages in the current
    // validation session
    messages: [],
    // current validation config
    // name: validation type
    config: {},
    // the interface method
    // `data` is key => value pairs
    validate: function (data) {
        var i, msg, type, checker, result_ok;
        // reset all messages
        this.messages = [];
        for (i in data) {
            if (data.hasOwnProperty(i)) {
                type = this.config[i];
                checker = this.types[type];
                if (!type) {
                    continue; // no need to validate
                }
                if (!checker) { // uh-oh
                    throw {
                        name: "ValidationError",
                        message: "No handler to validate type " + type
                    };
                }
                result_ok = checker.validate(data[i]);
                if (!result_ok) {
                    msg = "Invalid value for *" + i + "*, " + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },
    // helper
    hasErrors: function () {
        return this.messages.length !== 0;
    }
}
```
Như bạn có thể thấy, đối tượng validator nhận là generic và có thể thực hiện cho tất cả các trường hợp sử dụng validation. Nếu bạn muốn thêm một số trình validate khác chỉ cần xác định thêm cấu hình chạy và validate() method.

## Mediator
Một ứng dụng to hay nhỏ đều được tạo thành từ các đối tượng riêng biệt. Tất cả những đối tượng này không ít thì nhiều đều phải tương tác với nhau mà vẫn đảm bảo đến việc bảo trì và thay đổi theo mong muốn về sau mà không làm ảnh hưởng đến phần còn lại của ứng dung. Khi ứng dụng phát triển bạn thêm nhiều đối tượng hơn vào. Sau đó, trong quá trình tái cấu trúc, các đối tượng được loại bỏ và sắp xếp lại. Khi các đối tượng phụ thuộc quá nhiều về nhau thông qua các giao tiếp trực tiếp điều này dẫn đến các liên kết chặt không mong muốn. Khi các đối tượng được kết hợp chặt, nó không dễ thay đổi một đối tượng mà không tránh khỏi ảnh hưởng đến nhiều đối tượng khác, trường hợp này gây ảnh hưởng đến việc estimate thực thi các task về sau.
Mẫu mediator làm giảm bớt tình trạng này thông qua chuyển đổi về các liên kết yếu giúp cải thiện khả năng bảo trì.

![](https://images.viblo.asia/c0076e3c-0c8a-44c0-a1de-7891a28df06f.png)
<div align="center">
    <b> Hình 1. Mô hình các thành phần tham gia mô hình Mediator.</b>
</div>

Để có thể hiểu hơn chúng ta hãy bắt đầu với một ví dụ về việc sử dụng mô hình mediator. Ứng dụng này sẽ là một trò chơi trong đó hai người chơi được dành  30s để xem ai sẽ nhấn nút nhiều lần hơn người kia. Player 1 thi đấu bằng cách nhấn 1 và Player 2 nhấn 0 . Một bảng điểm được cập nhật với điểm số hiện tại.
Các thành phần đối tượng tham gia sẽ là:
- Player 1
- Player 2
- Scoreboard
- Mediator
Mediator giải biết về tất cả các đối tượng khác. Nó giao tiếp với thiết bị đầu vào, xử lý các sự kiện nhấn phím, xác định người chơi nào có lượt và thông báo. Player là chỉ cập nhật điểm số của chính mình và thông báo cho mediator điểm mà đã thực hiện. Mediator  cập nhật với bảng điểm và cập nhật lại trên giao diện trực quan. Khác với Mediator, trong các đối tượng không biết bất cứ điều gì về bất kỳ đối tượng khác. Điều đó sẽ dễ dàng nếu muốn thêm 1 nguời mới vào và thực hiện cập nhật điểm cho ngườii mới.
![](https://images.viblo.asia/27570760-6463-4543-acac-bb39d463556c.png)
<div align="center">
    <b> Hình 2. Mô hình các thành phần tham gia game ấn phím.</b>
</div>

Các đối tượng player được tạo bằng hàm tạo Player() với các thuộc tính điểm và tên. Method play() sẽ tăng điểm và thông báo đến mediator
```javascript
function Player(name) {
    this.points = 0;
    this.name = name;
}
Player.prototype.play = function () {
    this.points += 1;
    mediator.played();
};
```

Đối tượng scoreboard có một phương thức update(), được gọi bởi mediator sau mỗi lượt người chơi. Bảng xếp hạng không biết về bất kỳ người chơi nào và không lưu trữ điểm; Nó chỉ hiển thị số điểm được đưa ra bởi mediator:

```javascript
var scoreboard = {
    // HTML element to be updated
    element: document.getElementById('results'),
    // update the score display
    update: function (score) {
        var i, msg = '';
        for (i in score) {
            if (score.hasOwnProperty(i)) {
                msg += '<p><strong>' + i + '<\/strong>: ';
                msg += score[i];
                msg += '<\/p>';
            }
        }
        this.element.innerHTML = msg;
    }
};
```
Cuối cùng là đối tượng mediator, nó khởi tạo trò chơi, tạo các đối tượng player bằng phương thức setup() và theo dõi player thông qua các thuộc tính. Phương thức played() được gọi bởi mỗi người chơi sau mỗi lượt. Phương thức cuối cùng keypress(), xử lý các sự kiện bàn phím, xác định người chơi nào có lượt và thông báo cho player:

```javascript
var mediator = {
    // all the players
    players: {},
    // initialization
    setup: function () {
        var players = this.players;
        players.home = new Player('Home');
        players.guest = new Player('Guest');
    },
    // someone plays, update the score
    played: function () {
        var players = this.players,
            score = {
                Home: players.home.points,
                Guest: players.guest.points
            };
        scoreboard.update(score);
    },
    // handle user interactions
    keypress: function (e) {
        e = e || window.event; // IE
        if (e.which === 49) { // key "1"
            mediator.players.home.play();
            return;
        }
        if (e.which === 48) { // key "0"
            mediator.players.guest.play();
            return;
        }
    }
};
```
Và điều cuối cùng là thiết lập và kết thúc trò chơi:
```javascript
// go!
mediator.setup();
window.onkeypress = mediator.keypress;
// game over in 30 seconds
setTimeout(function () {
    window.onkeypress = null;
    alert('Game over!');
}, 30000);
```

## Observer
Mẫu observer được sử dụng rộng rãi trong lập trình client-slide trong JavaScript. Tất cả các sự kiện trình duyệt (di chuột, nhấn phím, v.v.) có thể được coi là một ví dụ về pattern này. Một tên khác cho nó cũng là các custom sự kiện, có nghĩa là các sự kiện mà bạn tạo với chủ định. Một tên khác là subscriber / publisher pattern.

Mục đích đằng sau mô hình này là loại bỏ các liên kết mạnh giữa các đối tượng. Thay vì một đối tượng gọi phương thức của đối tượng khác đối tượng sẽ đăng ký vào một hoạt động cụ thể nào đó và nhận được các sự kiện. Subscriber cũng được gọi là observer, trong khi đối tượng observed được gọi là publisher hoặc subject. Khi publisher thông báo một sự kiện tất cả những subscribers sẽ nhận được tin nhắn dưới dạng đối tượng sự kiện.
Để hiểu cách thực hiện mô hình này, Cùng xem sét Ví dụ cụ thể giả xử rằng bạn có một publisher sẽ cho ra các tờ báo hằng ngày và hằng tháng một subscriber sẽ nhận được thông báo bất cứ khi nào có thông báo xảy ra. Đối tượng paper cần phải có một subscribers là một mảng lưu trữ tất cả các subscribers. Hành động đăng ký chỉ đơn thuần là thêm vào mảng này. Khi một sự kiện xảy ra, paper được gửi đến danh sách những người đăng ký và thông báo cho họ. Thông báo có nghĩa là gọi một phương thức của đối tượng subscriber. Do đó khi đăng ký subscriber cung cấp một trong các phương thức của mình cho phương subscribe của paper. Paper cũng có thể hủy đăng ký bằng unsubscribe(), có nghĩa là xóa khỏi mảng subscribers. Phương thức cuối cùng của paper cũng là phương thức quan trọng nhất publish() sẽ gửi thông báo đến danh sách tất cả subscribers.

**subscribers**
Một mảng
**subscribe()**
Thêm vào mảng subscribers 
**unsubscribe()**
Xóa khỏi mảng subscribers 
**publish()**
duyệt mảng subscribers và gọi phương thức đã đăng ký.

Tất cả ba phương pháp đều cần một tham số type, bởi vì publisher có thể kích hoạt một số sự kiện publish cả magazine và newspaper và người đăng ký có thể chọn đăng ký một trong chúng.

Ở đây, một triển khai ví dụ về chức năng của publisher, định nghĩa tất cả các thành viên bắt buộc   phương thức trợ giúp visitSubscribers():
```javascript
var publisher = {
    subscribers: {
        any: [] // event type: subscribers
    },
    subscribe: function (fn, type) {
        type = type || 'any';
        if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(fn);
    },
    unsubscribe: function (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function (publication, type) {
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type) {
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;
        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                subscribers[i](arg);
            } else {
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};
```

Và ở đây, một chức năng lấy một đối tượng và biến nó thành một publisher bằng cách copying các phương thức publisher:

```javascript
function makePublisher(o) {
    var i;
    for (i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
            o[i] = publisher[i];
        }
    }
    o.subscribers = { any: [] };
}
```
Bây giờ hãy để cho người thực hiện đối tượng paper. Tất cả những gì nó có thể làm là publish hằng ngày và hàng tháng:
```javascript
var paper = {
    daily: function () {
        this.publish("big news today");
    },
    monthly: function () {
        this.publish("interesting analysis", "monthly");
    }
};
```
Bây giờ chúng ta đã có một subscriber, và dối tưởng joe với 2 methods:
```javascript
var joe = {
    drinkCoffee: function (paper) {
        console.log('Just read ' + paper);
    },
    sundayPreNap: function (monthly) {
        console.log('About to fall asleep reading this ' + monthly);
    }
};
```
Bây giờ joe sẽ đăng ký vào paper:
```javascript
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');
```

Bây giờ để xem kết quả dùng paper để kích hoạt một số sự kiện

```javascript
paper.daily();
paper.daily();
paper.daily();
paper.monthly();
```

Kết quả:
```javascript
Just read big news today
Just read big news today
Just read big news today
About to fall asleep reading this interesting analysis
```

Phần hay ở đây là đối tượng paper không hard code joe và joe không hardcode paper cũng không cần có đối tượng mediator. Các đối tượng tham gia liên kết yếu và không cần sửa nhiều, chúng ta có thể thêm nhiều subscribers vào paper; Joe cũng có thể hủy đăng ký bất cứ lúc nào.

## Tổng kết

Qua bài viết mình đã giới thiệu qua về pattern là gì ?, Design Patterns là gì ? Design Patterns trong javascript một ngôn ngữ untyped dynamic prototype thì có gì thú vị. Cuối cùng mình cũng đã giới thiệu cách implement về một số patterns khá hay trong javascript.