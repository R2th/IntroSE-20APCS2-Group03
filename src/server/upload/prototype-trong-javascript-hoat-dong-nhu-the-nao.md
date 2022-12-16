## **OOP trong Javascript**

Javascript là một ngôn ngữ dựa trên nguyên mẫu (**prototype-based language**), nó có nghĩa rằng thuộc tính và phương thức của object có thể được chia sẻ thông qua các đối tượng tổng quát (**generalized objects**) có khả năng mở rộng.

Trong số các ngôn ngữ hướng đối tượng phổ biến như Java, Python, PHP, Javascript khá là đặc biệt, nó **không có class,** vậy các tính chất của **oop** trên javascript được thể hiện như thế nào?.

![](https://images.viblo.asia/226f7450-524c-46cb-91fc-73e62cf97e8f.jpg)

Trong bài viết này, ta sẽ tìm hiểu cách thức làm việc của **prototype** (được hiểu như là kế thừa (**inheritance**) ở javascript).

## **Prototype là gì?**

**Prototype** là cơ chế mà các object trong javascript kế thừa các tính năng từ một object khác.

![](https://images.viblo.asia/969b4e23-16a2-4e30-b198-78e3baea3fc1.png)

 Mỗi một object trong javascript đều có một thuộc tính nội bộ (**internal property**) gọi là `[[Prototype]].`

Chúng ta có thể chứng minh điều này bằng cách tạo ra một object mới.

`let a = {};`

Đây là cách đơn giản nhất để khởi tạo một object, hoặc một cách khác là khởi tạo object với **constructor**.

`let x = new Object().`

Dấu ngoặc kép nói lên rằng thuộc tính này không thể truy cập trực tiếp ở code của chúng ta. Để thực hiện việc truy cập, ta sử dụng phương thức `getPrototypeOf()`

`Object.getPrototypeOf(x);`

Output ở đây là:

`{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, …}`

## **Thêm thuộc tính prototype cho các đối tượng**

Chúng ta sẽ cùng tìm hiểu sâu hơn với ví dụ sau đây:
```
function Human(firstName, lastName) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.fullName = function()  {
        return this.firstName + " " + this.lastName;
    }
}
```

Hãy khởi tạo 2 object person1 và persion2, sử dụng **human constructor** như sau:

```
var person1 = new Human("Kien", "Nguyen");
var person2 = new Human("Khai", "Nguyen");
```

Đầu tiên, khi hàm Human được khởi tạo, javascript sẽ thêm thuộc tính prototype vào hàm. Nói cho dễ hiểu là thằng **human** sẽ gửi cho constructor 1 cái yêu cầu, nó nói là **constructor** mày hãy cho tao cái thể hiện đi, constructor hì hục làm việc và trả lại cho nó một cái thể hiện (**instance**).

![](https://images.viblo.asia/3bc7d0d9-5873-465b-b998-98da786fbae2.png)

Khi ta khởi tạo thêm `object human1` bằng hàm **constructor**:

![](https://images.viblo.asia/b52de4c5-12ac-4ffa-81c8-3cf22218548a.png)
 
Lúc đối tượng này khởi tạo cũng là lúc `javascript engines `thêm thuộc tính __proto__ (cũng được gọi là dunder proto) vào đối tượng. Chính dunter proto này sẽ trỏ tới prototype object của hàm constructor.

## **Javascript engines tìm kiếm prototype property như thế nào?**

Ta cùng xem xét ví dụ sau đây:

```
// Tạo một hàm constructor function rỗng 
function Person(){
}

// Thêm thuộc tính name, age cho prototype property của hàm Person constructor 
Person.prototype.name = "Kien" ;
Person.prototype.age = 24;
Person.prototype.sayName = function(){
	console.log(this.name);
}

// Khởi tạo object sử dụng hàm khởi tạo của Person
var person1 = new Person();

// Truy cập tới thuộc tính name sử dụng đối tượng person
console.log(person1.name) // Output" Kien
```

Khi chúng ta cố gắng truy cập thuộc tính của một đối tượng (ở đây là person1.name),  việc đầu tiên `javascript engines` làm là sẽ cố gắng tìm thuộc tính chúng ta cần trên đối tượng, nếu thuộc tính ** tồn tại** trên đối tượng, như thế thì quá đơn giản, chúng ta chỉ việc xuất ra kết quả.

![](https://images.viblo.asia/afb42c10-258b-43c4-a6a2-ba8d2310b18c.png)

**Nếu không,** lúc này nó sẽ kiểm tra thuộc tính ở đối tượng nguyên mẫu (**prototype object**) hoặc đối tượng mà nó kế thừa. Trường hợp tệ nhất, đến cuối cùng vẫn không tìm được thuộc tính -> kết quả trả về sẽ là **undefined**.

Đối với ví dụ trên, khi person1.name được gọi, **javascript engines** sẽ kiểm tra property này có tồn tại trên đối tượng **person** hay không?. Không may thay, trường hợp này thuộc tính name không tồn tại trên đối tượng person, nên nó sẽ tiếp tục tìm kiếm trên dunder proto hoặc trên prototype của đối tượng person. Rất may thuộc tính name tồn tại trên prototype của đối tượng person, nên nó sẽ cho kết quả là Kien

![](https://images.viblo.asia/b216f9ba-859d-49fe-9fff-31b62cafe668.png)

 Qua hai ví dụ nhỏ này, mong các bạn có một chút hình dùng về cách thức hoạt động của **prototype trong javascript.**
 
 Vì đây là bài viết đầu tiên của mình nên nếu có thiếu sót gì, mong được các bạn góp ý bằng cách comment ở cuối bài viết.
 
 Để đọc thêm nhiều bài viết hay khác, có thể truy cập blog của mình ([kieblog.vn](https://kieblog.vn))
 
 **Thanks and happy coding =)))**