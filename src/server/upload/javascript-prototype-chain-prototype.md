Xin chào mọi người, hôm nay chúng ta sẽ tìm hiểu về prototype trong javascript, một khái niệm rất quan trọng trong Javascipt. Cùng với đó sẽ là cơ chế tạo object, kết thừa và cách object trong javascript tìm method với prototype.
Trước khi đi sâu vào khái niệm này hãy cùng xem ngắn gọn các cách tạo object trong javascript <br>
# 1. Các cách tạo object
### Tạo bằng cách trực tiếp
``` javascript
    var person = {
        firstName: "Nguyen Van",
        lastName: "A",
        age: 30,
        fullName: function(){
            return this.firstName + " " + this.lastName		
        }
    }
```
### Tạo với từ khóa 'new'
``` javascript
    var person = new Object() // Tạo một object trống
    // Thêm các thuộc tính, method sau
    person.firstName = 'Nguyen Van';
    person.lastName = 'A';
    person.age = 30;
    person.fullName = function() {
        return person.firstName + " " + person.lastName;
    }
```
### Tạo bằng constructor
``` javascript
    function Human(firstName, lastName) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.fullName = function() {
            return this.firstName + " " + this.lastName;
        }
    }

    var person1 = new Human("Nguyen Van", "A");

    console.log(person1)
```
Cách cách khởi tạo trên có vẻ rất quen thuộc với ta rồi, đặc biệt là cách thứ 3 bằng constructor. Nhưng hãy xem vấn đề trong cách khởi tạo này <br>
Khi khởi tạo 2 object như bên dưới đây <br>
``` javascript
    var person1 = new Human("Nguyen Van", "A");
    var person2 = new Human("Nguyen Van", "B");
```
javascript engine sẽ tạo ra 2 bản copy của constructor function cho mỗi person1, person2 <br>
![](https://images.viblo.asia/6884e0e0-71c5-4ca4-8d54-0852f9708754.png) <br>
Khi này, mỗi khi object được tạo ra bằng constructor function sẽ có được bản copy của thuộc tính, methods, 2 instance khác nhau sẽ có 2 instances function fullName với nhiệm vụ giống nhau, điều này sẽ gây lãng phí bộ nhớ, ta sẽ giải quyết vấn đề này trong các mục tiếp theo. <br>
# 2. Prototype
Có thể hiểu protoype nôm na là khuôn hoặc là cha của một object. Trong JavaScript, trừ undefined, toàn bộ các kiểu còn lại đều là object. Các kiểu string, số, boolean lần lượt là object dạng String, Number, Boolean. Mảng là object dạng Array, hàm là object dạng Function. Prototype của mỗi object chính là cha của nó, cha của String là String.prototype, cha của Number là Number.prototype, của Array là Array.prototype. <br>
Khi một function được tạo trong Javascript, thì một thuộc tính `prototype` sẽ được add vào function, thuộc tính này là một object (gọi là prototype object) có `constructor` property là mặc định, `constructor` property sẽ chỏ ngược lại đến function nơi mà có thuộc tính `prototype` như hình vẽ dưới đây <br>
![](https://images.viblo.asia/e77d2478-49c6-4ade-acd3-63679282bb78.png) <br>
Như hình vẽ trên, `Human` construtor sẽ có một thuộc tính là `prototype` nó trỏ đến `prototype` object, prototype object này sẽ có một thuộc tính là `constructor` trỏ ngược lại đến `Human`. Khi console.log person1 và Human.prototype ta có kết quả như sau <br>
![](https://images.viblo.asia/e43fadfa-7df6-45c6-ac55-8267e7da8038.png)
Có thể thấy như hình vẽ ở phía trên, `prototype` của một function là một object với 2 thuộc tính <br>
1. `constructor` property nó trỏ đến `Human` function
2. `__proto__` property: ta sẽ xem xét thuộc tính này chi tiết ở mục sau
## Khi tạo một object dùng constructor
Khi một objec được tạo trong javascript, javascript engine sẽ thêm một thuộc tính `__proto__` vào object vừa đuợc tạo ra. Thuộc tính này sẽ trỏ đến `prototype` object của constructor function như hình vẽ bên dưới đây <br>
![](https://images.viblo.asia/e4fed36e-1cae-4622-95cd-dde6081e8b4a.png) <br>
Hay chúng ta có thể check điều kiện như sau sẽ cho ra kết quả true
``` javascript
    var person1 = new Human("Nguyen Van", "A");
    person1.__proto__ === Human.prototype // sẽ cho ra kết quả true
```
Nó chỉ ra rằng person1 có thuộc tính `__proto__` và `Human.prototype` trỏ đến cùng một object <br>
Hãy cùng tạo ra một object mới `person2` với `Human` constructor function
``` javascript
    var person2 = new Human("Nguyen Van", "B");
    Human.prototype === person2.__proto__ // cho kết quả true
    person1.__proto__ === person2.__proto__ // cho kết quả true
    Human.prototype.contructor === Human // true
```
Dựa vào kết quả trên có thể thấy thuộc tính `__proto__` của `person1, person2` trỏ đến cùng `prototype` object của `Human` <br>
![](https://images.viblo.asia/49439ceb-f5a2-41cf-83d2-baf266573b18.png) <br>
## prototype object
Như ta đã thấy prototype là một object, do đó ta có thể thêm thuộc tính, method vào object này, khi đó tất cả các object được tạo ra bởi constructor function có thể sử dụng các thuộc tính và method này <br>
``` javascript
    // dùng với dấu .
    Human.prototype.nickname = "AAA";
    console.log(Human.prototype.nickname) //Output: AAA

    // dùng với dấu []
    Human.prototype["age"] = 26;
    console.log(Human.prototype["age"]); //Output: 26
```
Khi đó các object được khởi tạo `person1, person2` như ở trên sẽ có thuộc tính mới này vì chúng có `__proto__` trỏ đến `prototype` của `Human` <br>
![](https://images.viblo.asia/8dd5ee17-8c74-481b-ac85-ec982501af18.png) <br>
Khi ta console.log(person1) sẽ cho kết quả như hình dưới đây <br>
![](https://images.viblo.asia/50631587-dafa-4a92-b79f-ad12995f3df4.png) <br>
Có thể thấy `person1` có thuộc tính `__proto__` trỏ đến `prototype` của Human và nó đã chứa 2 thuộc tính `age, nickname` mà ta vừa thêm cho `prototype` của Human <br>
Về cơ chế tìm kiếm các thuộc tính này, javascript engine sẽ làm như sau: <br>
Khi ta truy cập một thuộc tính hay method của một object, javascript engine sẽ tìm kiếm chúng trong chính object đó trước, nếu chúng tồn tại trong object sẽ được gọi ra, nếu không thì sẽ tiếp tục tìm kiếm thuộc tính hoặc method trong object `prototype` là object có tên là `__proto__` như ta đã thấy ở trên, nếu được tìm thấy ở đây thì chúng sẽ được gọi ra, nếu không javascript engine sẽ tiếp tục tìm đến `prototype` object của object `__proto__` bởi vì object `__proto__` này sẽ trỏ đến một object prototype khác, cứ tiếp tục như thế cho đến object prototype cuối cùng là object nếu không tìm thấy thuộc tính sẽ trả về là `undefined`, còn nếu không thấy method sẽ bắn ra lỗi. <br>
Ta có thể kiểm tra một số câu lệnh sau đế kiểm chứng <br>
``` javascript
    person1.__proto__ === Human.prototype  // true
    person1.__proto__.__proto__ === Object.prototype // true
```
Console.log cụ thể `person1` hơn sẽ có kết quả như sau <br>
![](https://images.viblo.asia/ddfc5fec-36a3-49dd-9f2a-252b5e3a6fcb.png) <br>
Có thể thấy `__proto__` của `person1` có thể một thuộc tính `__proto__` nữa và nó trỏ đến prototype của object, đó cũng là lý do vì sao `person1` cũng có thể gọi các hàm có trong đó như `toString()`, `valueOf()` ...
# 3. Vấn đề gặp phải với prototype
Vì `prototype` object share giữa các object sử dụng constructor function, do đó các thuộc tính, method được share giữa tất cả các object với nhau. Khi một object thay đổi một thuộc tính có kiểu là primitive (integer, string, ...) thì các thuộc tính khác sẽ không bị ảnh hưởng. ví dụ như sau <br>
``` javascript
    console.log(person1.nickname); //Output: AAA
    console.log(person2.nickname); //Output: AAA

    person1.name = "BBB"

    console.log(perosn1.nickname); //Output: BBB
    console.log(person2.nickname); //Output: AAA
```
Vì kiểu thuộc tính là string nên khi thay đổi bởi `person1` thì `person2` sẽ không bị ảnh hưởng. Tuy nhiên, trường hợp kiểu thuộc tính là reference type như array, object... thì các object khác sẽ bị ảnh hưởng theo. Cùng xem xét ví dụ sau <br>
``` javascript
    // Tạo một constructor function trống
    function Person(){
    }
    // Thêm các thuộc tính và method
    Person.prototype.name = "Name1" ;
    Person.prototype.age = 26;
    Person.prototype.friends = ['friend1', 'friend2'], // kiểu là array
    Person.prototype.sayName = function(){
        console.log(this.name);
    }

    // Tạo ra 2 object
    var person1= new Person();
    var person2 = new Person();

    // Thêm một friend mới bằng person1
    person1.friends.push("friend3");

    console.log(person1.friends);// Output: "friend1, friend2, friend3"
    console.log(person2.friends);// Output: "friend1, friend3, friend3" // object person2 cũng bị ảnh hưởng theo
```
### Kết hợp constructor và prototype
Để giải quyết vấn đề ở trên ta sẽ kết hợp cả 2 constructor và prototype
1. Vấn đề với constructor: mỗi object sẽ có instance các function
2. Vấn đề với prototype: thay đổi một thuộc tính reference sẽ ảnh hưởng các object còn lại <br>

Ta sẽ code lại như sau <br>
``` javascript
    // Định nghĩa thuộc tính friends dùng chung trong constructor
    function Human(name, age){
        this.name = name,
        this.age = age,
        this.friends = ["friend1", "friend2"]
    }
    // Định nghĩa các property, method khác dùng chung bằng prototype
    Human.prototype.sayName = function(){
        console.log(this.name);
    }
    // Tạo 2 object mới
    var person1 = new Human("Nguyen Van A", 31);
    var person2 = new Human("Nguyen Van B", 40);

    // check xem person1, person2 trỏ cùng vào instance của sayName function
    console.log(person1.sayName === person2.sayName) // true

    // thay đổi friends của person1
    person1.friends.push("friend3");

    console.log(person1.friends) // Output: "friend1, friend2, friend3"
    console.log(person2.friends) //Output: "friend1, friend2", list friend của person2 không bị ảnh hưởng theo
```
Như vậy, bài viết đã tìm hiểu về prototype trong javascript, hi vọng bài viết giúp ích cho mọi người. See you!
# Reference
https://dev.to/varundey/prototype-proto-and-prototypal-inheritance-in-javascript-2inl <br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain <br>
https://medium.com/better-programming/prototypes-in-javascript-5bba2990e04b <br>
https://toidicodedao.com/2016/02/02/series-javascript-sida-po-ro-to-tai-prototype-la-cai-gi/