Javascript là một ngôn ngữ mạnh. được sử dụng rất phổ biến hiện nay và đang không ngừng được nâng cấp, cải tiến hơn , việc hiểu rõ về nó là điều rất cần thiết với lập trình viên. 
Tuy nhiên javascript với gây khá nhiều hiểu lầm với nhiều lập trình viên quen với class trong OOP(giống Java hay C++) khi sử dụng prototype-base.

Mỗi object trong Javascript có một private properties linked tới 1 object khác được gọi là **prototype**.  Prototype object có các properties của riêng mình và lại link đến object khác, cho đến khi linked tới null(null không có prototype).

Gần như tất cả các object đều là instance của Object (nằm trên top của prototype chain).


Mình muốn giới thiệu với các bạn về prototype trong Javascript



# Prototype chain
Prototype là một object, mọi object đều có prototype. Mọi object đều có thuộc tính __proto__
Đây là property có reference đến another object khác.
Như hình vẽ ta có object **obj** có 1 property là prop 1,  obj.__proto__ sẽ trỏ về 1 object nằm trên chuỗi prototype chain của obj, và tương tự như vậy obj.__proto__.__proto__ sẽ trả về một object khác.
Điều đáng nói ở đây là JS engine tự động searching trên prototype chain của object để call property phù hợp cho chúng ta.

VD:
obj.prop3  thì JS engine sẽ searching trên protype chain và call obj.__proto__.__proto__.prop3

Object khác nhau có thể share prototype với nhau qua prototype chain. Nếu ta có 1 object khác (obj2 ), nó có thể trỏ về cùng obj.__proto__  . Nên nếu gọi **obj2.prop2 **thì sẽ trả về  cùng property với **obj.prop2**

Chúng ta thử demo xem nhé.
```
var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function(){
        return this.firstname + '' + this.lastname;
    }
}
# 
var john = {
    firstname: 'John',
    lastname: 'Due'
}

// don't do this ever !! demo purpuse
john.__proto__ = person;
console.log(john.getFullName());
console.log(john.firstname);

var jane = {
    firstname: 'Jane'
}
jane.__proto__ = person;
console.log(jane.getFullName());


```

Kết quả in ra console sẽ là 

//JohnDue

//John

//JaneDefault


# __proto__ là prototype của object, vậy .prototype là gì ?

Function trong favascjript là 1 special object. 

> **Tất cả các function trong javascript đều có property prototype**

prototype property của function gần như không bao giờ được sử dụng trừ khi ta khởi tạo object mới bằng function consturctor, prototype property sẽ được new operater sử dụng như sau
```
function a(){console.log(1)}
var a = new A();
```
**prototype** name có thể khiến cho chúng ta cảm thấy như ta đang access prototype của 1 object, nhưng không. 
> __proto__ mới là prototype của object
> 
>  **a.prototype không phải prototype của function a mà sẽ là prototype của any object được khởi tạo bởi function constuctor**

OK, cùng xem ví dụ nhé
![](https://images.viblo.asia/a16b692b-71e1-4492-a742-d7b1ec439d44.png)
```
john.getFullName() // "John Doe"
```
Nếu giờ ta add thêm 1 function khác vào prototype sau khi đã tạo object john
```
Person.prototype.getFormalFullName = function(){
    return this.lastname + ',' + this.firstname;
}
console.log(john.getFormalFullName)
```
console hiển thị ra //Doe , John

# Properties shadowing
```
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten
const x = Object.create(me)
x.a = 1 

```
Thử inspect x nhé

![](https://images.viblo.asia/50ff37b1-386c-44ac-8dc7-5e4d64e1f842.png)

x có properties a = 1, và có prototype (isHuman: true, name: "Matthew") inherit từ me, giá trị của isHuman đã được thay đổi do ta đã thay đổi isHuman của **me** (shadowing)

# Ý nghĩa của prototype
Javascript object inheritance dựa trên prototype-base. Từ các phiên bản ES5 trở về trước, không có khái niệm class, vậy nên việc thừa kế trong javascript dựa trên prototype.


Trên đây là những cái nhìn mình cho là trực quan nhất về prototype trong javascript, mong các bạn đóng góp ý kiến ! Hi vọng các bạn có thể hiểu rõ hơn về prototype và inheritance trong Javascript. Thank !

# Tham khảo
https://medium.com/piecesofcode/javascript-objects-property-shadowing-66159b143b2
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain