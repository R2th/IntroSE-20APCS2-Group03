## Mixin là gì?
dưới đây là một số định nghĩa khác nhau về mixin
```
Mixin is a way properties are added to objects without using inheritance — Darren Jones

Mixins provide an alternate way of composing your application that isn’t explicitly covered in books on design patterns. — Steve Fenton

Mixins are a form of object composition, where component features get mixed into a composite object so that properties of each mixin become properties of the composite object. — Eric Elliot
```
Chúng ta thấy rằng mixin trộn các thuộc tính của các object khác nhau vào một object.

Hãy xem xét một ví dụ cụ thể của mixins:
```
const mydetails = {}
const  firstname = { firstname: "Nnamdi" }
const surname = { surname: "Chidume" }
const occupation = { occupation: "Software Developer" }
const nationality = { nationality: "Nigerian" }
log(mydetails)
Object.assign(mydetails,surname, firstname, occupation, nationality);
log(mydetails)
```
Kết quả là:
```
{
}
{ 
    firstname: "Nnamdi", 
    surname: "Chidume", 
    occupation: "Software Developer", 
    nationality: "Nigerian" 
}
```
Đầu tiên ta khởi tạo mydetails là một object rỗng. Nhưng sau đó nó có tất cả các thuộc tính của các object phía dưới.

Đó là tất cả những gì về mixin: Kết hợp các thuộc tính của các đối tượng khác nhau thành một đối tượng.

Không có gì đặc biệt với việc sử dụng một phương thức cũ `Object.assign` để kết hợp các object thành object `mydetails`.

`Object.assign` được sử dụng để sao chép giá trị của các thuộc tính từ một hay nhiều object vào object mong muốn.

`Object.assign` cung cấp một cách cơ bản trong Javascript để mixins các thuộc tính giữa các object (object không có class)
```
Object.assign(target, ...sources);
```
Tham số đầu tiên là object đích và tiếp theo là tất cả các object mixin với object đích.

Quay trở lại với ví dụ. `mydetail` được truyền vào với vai trò là object đích và surname, firstname, occupation, nationality là các object nguồn mà các thuộc tính của chúng được sao chép vào object đích.

Lưu ý rằng:
* Object.assign chỉ dùng với các object động (không có class)
* Object.assing sao chép các thuộc tính
## Tự cài đặt Object.assign
Bây giờ hãy tự cài đặt một phiên bản của `Object.assign` để hiểu các thành phần của thuộc tính trong object hoạt động như thế nào.
```
Object.prototype.assign = function assign(dest, ...src) {
}
```
Chúng ta kiểm tra tham số đích là một object:
```
Object.prototype.assign = function assign(dest, ...src) {
    if(typeof dest == 'object') {
    }
}
```
Ta lặp qua mảng src và kiểm tra object hiện tại trong mảng là một object. Nếu đúng, ta lặp qua tất cả các thuộc tính và sao chép từng thuộc tính vào object đích.
```
Object.prototype.assign = function assign(dest, ...src) {
    if(typeof dest == 'object') {
        for(let s of src) {
            if(typeof s == 'object'){
                for(prp of Object.keys(s)){
                    dest[prp] = s[prp]
                }
            }
        }
    }
}
```
Vậy là ta đã tự cài đặt được `Object.assign` của mình.
## Mixing Class
Mixing cũng có thể áp dụng với class trong Javascript.

Đầu tiên tạo một class:
```
class Car {}
```
Để Car có các chức năng của nó, chúng ta phải cho nó các thuộc tính và phương thức:
```
class Wheel {
    drive() {
        //...
    }
}
class Tyre {
    brake() {
        //...
    }
}
class Steering{
    steer(x, y) {
        //...
    }
}
class Wiper {
    wipe(speed) {
        //...
    }
}
class Engine {
    start() {
        //...
    }
}
```
Ta có các class với các phương thức tương ứng: `Wheel` drives, `Tyre` brakes, `Steering-wheel` steers, `Wiper` wipes và `Engine` starts.

Ta có thể trộn tất cả các class trên vào class Car. Sử dụng `Object.assign` sẽ không hoạt động trong trường hợp này.
```
Object.assign(Car, Engine, ...)
new Car().start()
```
Kết quả là:
```
new Car().start()
    ^
TypeError: (intermediate value).start is not a function
    at Object.<anonymous> 
    at Module._compile
    ...
```
Hay:
```
let engine = Engine();
car = Object.assign(car, engine, ...);
car.start()
```
Sẽ cho kết quả:
```
car.start()
    ^
TypeError: car.start is not a function
    at Object.<anonymous> 
```
Chúng ta cần viết 1 hàm để áp dụng mixin cho class.
```
function classMixin(cls, ...src) {
    for (let _cl of src) {
        for (var key of Object.getOwnPropertyNames(_cl.prototype)) {
            cls.prototype[key] = _cl.prototype[key]
        }
    }
}
```
Chúng ta sử dụng `Object.getOwnPropertyNames` để lấy tên các thuộc tính được định nghĩa trong class. Ở đây, ta truyền tham số vào `Object.getOwnPropertyNames` là `_cl.prototype` chứ không phải `_cl`. Vì sao vậy?

Trong Javascript, định nghĩa của class đơn giản là một hàm. Một hàm có thể sử dụng như một hàm hoặc cũng có thể như một class.

```
function test() {
    log('constructor')
}
new test() // constructor
test() // constructor
```
Javascript có tính mở rộng cao. Các thuộc tính có thể được lưu trữ trong một hàm. `prototype` được sử dụng để định nghĩa các các thuộc tính nếu một hàm được sử dụng như một object. Nếu không có `prototype`, các thuộc tính trở thành tĩnh và không thể sử dụng với các object là function.

Một class như sau:
```
class Example {
    static iex() {}
    ex() {}
}
```
có thể chuyển đổi thành:
```
function Example() {}
Example.prototype.ex = function() {}
Example.iex = function() {}
```
test class Example:
```
log(Example.prototype.ex) //[Function: ex]
log(Example.prototype.iex) // undefined
log(Example.iex) // [Function: iex]
log(Example.ex) // undefined
```
Bây giờ chúng ta đã hiểu vì sao cần sử dụng prototype.
## Mixin và kế thừa
Mixin có thể sử dụng sự kế thừa. Xem xét ví dụ sau:
```
class Engine {
    sayBaseEngine() {
        return `BaseEngine`
    }
}
class ToyotaEngine extends Engine {
    sayEngine() {
        return `From Toyota: ${super.sayBaseEngine()}`
    }
}
```
Sau đó ta tạo một class Toyota:
```
class Toyota extends Car {}
```
Nếu sử dụng classMixin định nghĩa ở trên:
```
classMixin(Toyota, Brake, Drive, ToyotaEngine);
```
Ta sẽ có kết quả:
```
From Toyota: BaseEngine
```
`ToyotaEngine` là một lớp con của `Engine` nhưng thông qua mixin chúng ta có thể gọi `sayBaseEngine` của class cha của nó từ class Toyota mặc dù `Toyota` không phải là một class con của `Engine`
## Mixin và các mối quan hệ trong OOP
Nhìn vào hành vi của `mixin`, chúng ta thấy rằng nó là một loại kế thừa tốt hơn kế thừa class. Trong hầu hết các ngôn ngữ OOP, chúng ta không thể kế thừa nhiều hơn một class nhưng có thể cài đặt nhiều interface.

Mixin ở đây là sự đa kế thừa các thuộc tính và phương thức bởi các mixin object.

Mixin khác với kế thừa ở chỗ bạn không cần một chuỗi kế thừa dài để có được các thuộc tính và phương thức mong muốn. Việc quyết định sử dụng mixin hay kế thừa class cần dựa vào mối quan hệ giữa các class.

Mối quan hệ giữa các class có thể là `is-a`, `has-a`, `can-do` và `uses-a`.

`is-a` được sử dụng khi một class là class con của một class khác. Các class con của một class có thể kế thừa tất cả các thuộc tính và phương thức của lớp cha và có thể ghi đè chúng.

`has-a`, `uses-a` và `can-do` là giống nhau. Chúng kết hợp các hành vi từ các nguồn khác nhau. Chúng ta có thể nói Midfielder uses-a Jersey hay ArmBand and can-do FlyingKicks. Không phải tất cả Player can-do FlyingKicks và không phải tất cả Midfielder hay Player can-do FlyingKicks nhưng vẫn là Player.

Mixin thuộc loại mối quan hệ thành phần. Vì nó thêm hành vi từ các class vào một class, chúng ta không thể mixin Player vào Midfielder nhưng có thể mixin FlyingKick, Jersey và ArmBand vào một Player hay Midfielder.

## Mixin có hữu dụng không
Như chúng ta đã thấy, mixin rất hữu ích khi kết hợp các hành vi mà không cần kế thừa tất cả tính năng của các class.

Với mixin, các hành vi có thể được sử dụng lại và một lượng lớn hành vi có thể được thêm một lúc thay vì một hành vi tại một thời điểm.
## Kết luận
Bài viết đã trình bày tất cả những gì về mixin và làm thế nào đế sử dụng chúng một cách hiệu quả. 
## Tham khảo
[https://blog.bitsrc.io/understanding-mixins-in-javascript-de5d3e02b466](https://blog.bitsrc.io/understanding-mixins-in-javascript-de5d3e02b466)