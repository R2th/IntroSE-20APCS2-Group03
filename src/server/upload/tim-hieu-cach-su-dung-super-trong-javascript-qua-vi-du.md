Concepts về Object-oriented chắc hẳn đã không còn xa lạ gì đối với một lập trình viên rồi. Tuy vậy chắc chắn rằng không ít trong số chúng ta cũng chả hiểu nó có tác dụng như thế nào trong việc code nữa :D. Không dài dòng nhiều, bài viết hôm nay chúng ta cùng tranh luận về sử dụng super() để triển khai "kế thừa" trong JavaScript OOP nhé. 

## Super() _ Để làm gì ?
Sử dụng super() trong JavaScript có ý nghĩa gì ? Về cơ bản, trong một child class (class con), bạn sử dụng `super()` để gọi ra constructor của parent class (class cha) của nó và sử dụng `super.<methodName>` để  gọi tới các methods trong class cha của nó. Trước khi tìm hiểu về bài viết này, bạn cần có chút hiểu biết các khái niệm về constructors, child class và parent class trong JavaScript. Nếu chưa, hãy tìm hiểu qua về chúng [ở đây](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS) nhé!

### 1. "Kế thừa" class cha
Super() không phải chỉ mỗi JavaScript mới có — rất nhiều ngôn ngữ lập trình khác như Java hay Python cũng có khái niệm này. Chúng ta sử dụng super() để tạo ra một "liên kết" (reference) từ class con tới class cha. Tuy nhiên trong JavaScript, không sử dụng khái niệm thừa kế class (class inheritance) như trong Java hay Python, mà mở rộng thành khái niệm prototypal inheritance ( về cơ bản cũng giống như class inheritance thôi :D)

Hãy cùng tìm hiểu chút về chúng thông qua một vài ví dụ nhé ! 

```js
class Fish {
  constructor(habitat, length) {
    this.habitat = habitat
    this.length = length
  }
  
  renderProperties(element) {
    element.innerHTML = JSON.stringify(this)
  }
}

class Trout extends Fish {
  constructor(habitat, length, variety) {
    super(habitat, length)
    this.variety = variety
  }
  
   renderPropertiesWithSuper(element) {
    element.className="green" 
    super.renderProperties(element);
  }
}
```

Ở ví dụ này chúng ta có 2 class là Fish và Trout. Tất cả fish sẽ có thông tin về 2 thuộc tính là habitat và length, và 2 thuộc tính này thuộc về Fish Class. Trout Class cũng có một thuộc tính là variety, và đồng thời cũng được extend (hiểu là thừa kế cho dễ nhé ) các thuộc tính của Fish (gồm habitat và length)  (vì Trout cũng là một loại cá mà :D)

Constructor của Fish class định nghĩa 2 thuộc tính là habitat và length, còn Constructor của Trout Class định nghĩa thuộc tính variety. Vậy tại sao ta phải gọi super() trong constructor của trout class vậy ? Nếu chúng ta thử xóa dòng đó đi sẽ gặp lỗi không thể gán giá trị cho this.variety ! Vì sao vậy ?

Đó là vì trong 1 dòng của code định nghĩa Class Trout ở trên, chúng ta đã báo với JavaScript rằng ta muốn Trout là 1 class con của Fish thông qua việc sử dụng keyword extends. Điều đó có nghĩa rằng this context của Trout Class sẽ bao gồm các thuộc tính và methods được định nghĩa trong Fish Class (habitat, length,...) và cộng thêm các thuộc tính và methods được định nghĩa cho chính nó (variety, ...). Nhờ việc sử dụng super() mà JavaScript có thể biết được Fish Class mà Trout Class muốn extend là gì, và vì vậy this context cho Trout Class mới có thể được tạo, chứa mọi thứ được "kế thừa" từ Fish Class và những thứ được định nghĩa cho chính nó.

Còn đối với Fish Class, nó không cần tới việc gọi super() vì class cha của nó là JavaScript Object — hiển nhiên JavaScript biết nó là gì, nên không cần tới super() nữa. 

![](https://images.viblo.asia/e46a39e1-1a58-4e19-8879-df8e185fcfe3.png)


Nhờ việc sử dụng câu lệnh super(habitat,length) mà 2 thuộc tính được tạo ra trong this context của Trout. Tuy nhiên chúng ta vẫn có một cách khác để làm điều này. Chúng ta không cần phải gọi super() cùng với việc liệt kê những parameters có trong Fish. Mục đích sử dụng của super() không phải để gán cho Trout những giá trị Fish tạo ra, mà là để đảm bảo JavaScript có thể hiểu được thứ mà Trout muốn kế thừa là gì ? Vì vậy ta cũng có thể viết như sau : 
```js
class trout extends fish {
  constructor(habitat, length, variety) {
    super()
    this.habitat = habitat
    this.length = length
    this.variety = variety
  }
}
```

Cách viết này không cần chỉ rõ thuộc tính nào được định nghĩa trong Fish, thuộc tính nào được định nghĩa trong Trout, những vẫn có kết quả giống như ví dụ trước. Điều khác nhau duy nhất đó là việc gọi super() mà không truyền parameters vào thì 2 thuộc tính habitat và length có trong Trout Class sẽ không có giá trị nào được gán giá trị nào khi chúng được khởi tạo. Chúng sẽ mang giá trị undefined cho tới khi được gán một giá trị mới. 

```js
class trout extends fish {
  constructor(habitat, length, variety) {
    super() // this = {habitat: undefined, length: undefined}
    this.habitat = habitat
    this.length = length
    this.variety = variety
    // this = {habitat: habitat, length: length, variety: variety}
  }
}
```

### 2. Gọi method từ class cha
Chúng ta cũng có thể sử dụng super() bên ngoài Constructor để gọi tới methods của class cha. 

```js
class fish {
  renderProperties(el) {
    el.innerHTML = JSON.stringify(this)
  }
}

class trout extends fish {
renderPropertiesWithSuper(el) {
  el.className="green" 
  super.renderProperties(el);
}
```

Ở đây ta định nghĩa method renderProperties để hiển thị những thuộc tính của 1 class vào HTML element là el mà ta truyền vào. Class Trout cũng có một method làm điều tương tự như vậy, nhưng trước đó thêm một chút là sẽ thay đổi class name của el trước khi hiển thị. VÌ vậy sử dụng super() sẽ cực kì hữu dụng trong trường hợp này. Vì method của Trout có 1 phần chức năng giống như Fish, nên ta chỉ cần gọi lại method đó từ Fish là xong! Đó là lí do ta sử dụng super.renderProperties() ở đây.  

Lưu ý rằng việc chọn tên của method ở đây cũng rất quan trọng. Ở đây ta đặt tên method cho Trout Class là renderPropertiesWithSuper() vì chúng ta muốn vẫn có thể gọi trout.renderProperties() được. Nếu bạn chày cối, vẫn muốn đặt tên trong Trout Class là renderProperties() ? Hiển nhiên nó vẫn hợp lệ, nhưng lúc này chúng ta không thể gọi cả 2 hàm đó trực tiếp Trout được nữa - tức là gọi trout.renderProperties() sẽ chỉ gọi ra function được định nghĩa trong Trout mà thôi =)))))

## Kết luận
Bài viết của mình đến đây thôi. Đây không phải là một vấn đề quá khó, tuy nhiên bạn sẽ bắt gặp super() rất nhiều khi code JavaScript (ví dụ khi học OOP, hay React Basic,...) nên hiểu tìm hiểu kĩ một chút về nó cũng không phải là thừa đúng không =))). Bài viết này khá là khó cho mình dịch để dễ hiểu , vì vậy nếu có sai sót chỗ nào mọi người hãy comment bên dưới nhé :D 
## References
https://css-tricks.com/what-is-super-in-javascript/