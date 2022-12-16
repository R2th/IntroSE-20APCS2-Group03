Là một lập trình viên chắc chắn chúng ta không còn xa lạ với từ khóa **this** nữa, nhưng vẫn còn một số chưa hiểu rõ về nó.Trong bài viết này mình sẽ giúp các bạn hiểu rõ hơn về từ khóa **this** trong Javascript
## 1.Khái niệm

-**This** là một từ khóa đề cập đến đối tượng mà nó thuộc về

## 2.Các đặc tính của this

### 1.Trong một phương thức, **this**(của phương thức đó) tham chiếu tới đối tượng truy cập phương thức(đối tượng đứng trước dấu **chấm** )
Chúng ta cùng xem trong ví dụ này:
```
// Đầu tiên hãy cùng tạo một đối tượng
const Laptop = {
  name: 'Dell',
  battery: 7200,
  runCode: function () {
    console.log(this.name)
  }
}
Laptop.runCode()
```
Mở console trên trình duyệt và chúng ta sẽ thấy in ra "Dell".
Vậy nghĩa là gì, từ khóa this ở ví dụ trên sẽ tham chiếu đến đối tượng Laptop, hay nói cách khác this ở đây chính là đối tượng Laptop.
Ở một ví dụ khác
```
// Chúng ta khai báo một hàm tạo(hàm tạo là hàm dùng để khởi tạo đối tượng)
function Laptop(name, battery) {
  this.name = name
  this.battery = battery
  this.runCode = function () {
    console.log(this.name)
  }
}
// Hãy cùng tạo ra một đối tượng
const Dell=new Laptop("Dell",7200)
Dell.runCode();
// --> "Dell"

// Đối tượng thứ 2
const Hp450G1=new Laptop("Hp450G1",6000)
Hp450G1.runCode();
// --> "Hp450G1"
```

Trong ví dụ trên, thuộc tính runCode ở đối tượng thứ nhất là một hàm được gọi sau dấu ".", nên có thể hiểu là hàm runCode ở đây thuộc về đối tượng Dell, từ đó có thể suy ra this.name="Dell".

Tương tự ở đối tượng thứ hai, hàm runCode được gọi sau dấu chấm `Hp450G1.runCode();` nên suy ra `this.name` sẽ bằng `"Hp450G1"`.

Chúng ta cùng đến một ví dụ khác

```
// Chúng ta khởi tạo một đối tượng Laptop với một đối tượng con là child,
// trong đối tượng child lại có thuộc tính methodChild
const Laptop = {
  name: 'Dell',
  battery: 7200,
  runCode: function () {
    console.log(this.name)
  },
  child: {
    methodChild: function () {
      console.log(this)
    }
  }
}
// Bây giờ, muốn gọi tới phương thức methodChild chúng ta sẽ làm như sau
Laptop.child.methodChild()
// Ở đây chúng ta sẽ nhận được log là gì ạ, hãy cùng suy nghĩ một chút,
trong methodChild chúng ta thực hiện console.log(this)
// Hãy cùng để ý trước dấu chấm đến methodChild là đối tượng child nên hàm 
console.log(this) ở bên trong methodChild sẽ in ra chính đối tượng child
```


Ở ví dụ tiếp theo chúng ta sẽ tạo một đối tượng trong DOM


```

<button id="button">Button</button>

```
Và gán đối thượng button chúng ta vừa tạo ra vào một biến

```
const button = document.getElementById('button')
button.onclick = function () {
  console.log(this)
}
```

Kết quả khi chúng ta bấm vào button trên giao diện sẽ nhận được log như sau:
```

<button id="button">Button</button>
->> chính là cái button mà chúng ta vừa click vào
```

Ở ví dụ trên chúng ta gọi hàm console.log(this) ở bên trong hàm onclick , hãy để ý đối tượng trước dấu chấm là gì, cũng chính là cái button chúng ta vừa click.

Đến đây chúng ta có thể kết luận, khi một hàm được gọi sau dấu chấm, thì this ở bên trong hàm đó sẽ tham chiếu tới đối tượng đứng trước dấu chấm.

### 2.Khi đứng ngoài phương thức, this sẽ tham chiếu tới đối tượng global

Chúng ta có ví dụ :

```
function myFunc (){
  console.log(this);
}
myFunc()
```

Như chúng ta đã biết, trong một trang web thì đối tượng cao nhất là thằng window,
ở ví dụ trên hàm myFunc không thuộc một đối tượng nào, nên nghiễm nhiên nó thuộc về đối tượng window, và hàm `console.log(this);` ở trên sẽ in ra chính đối tượng window.

Có một lưu ý là trong strict mode sẽ có sự khác biệt, chúng ta cùng theo dõi ví dụ sau:

```
'use strict'
function myFunc() {
  console.log(this)
}
myFunc()
```

Hàm `console.log(this)` trong ví dụ trên sẽ in ra undefined, vì đơn giản là trong chế độ strict sẽ nghiêm ngặt hơn và không cho phép dùng từ khóa this trong một phương thức mà không nằm trong một đối tượng nào.

Vậy nếu bây giờ chúng ta vẫn muốn từ khóa this trỏ đến window thì làm thế nào ạ, chúng ta sẽ gọi hàm chứa nó bằng object window như ví dụ sau:

```
'use strict'
function myFunc() {
  console.log(this)
}
window.myFunc()
```

Để hiểu tại sao thì chúng ta cùng quay về đặc tính thứ nhất 

`Trong một phương thức, this (của phương thức đó) tham chiếu tới đối tượng truy cập phương thức(đối tượng đứng trước dấu chấm )`
 
 Trong ví dụ trên window là đối tượng ***chấm*** đến hàm myFunc nên this ở bên trong hàm myFunc chính là window.

## 3.Lưu ý

### 1.This trong hàm tạo là đại diện cho đối tượng được tạo

Hãy cùng quay về ví dụ vừa được đề cập ở **mục 2.1** trên đây:

```
function Laptop(name, battery) {
  this.name = name
  this.battery = battery
  this.runCode = function () {
    console.log(this.name)
  }
}
```

```
// Hãy cùng tạo ra đối tượng thứ nhất
const Dell=new Laptop("Dell",7200)
Dell.runCode();
// -->in ra "Dell"
```

```
// Đối tượng thứ 2
const Hp450G1=new Laptop("Hp450G1",6000)
Hp450G1.runCode();
// -->in ra "Hp450G1"
```

Hãy nhìn vào hàm tạo của chúng ta (Hàm Laptop), từ khóa this ở bên trong hàm(`this.name = name`) không tham chiếu đến hàm Laptop hay một đối tượng nào nằm bên ngoài nó, mà chính là đại diện cho đối tượng được tạo ra từ nó.

Ở ví dụ trên đây khi đối tượng thứ nhất được tạo thì từ khóa this trong hàm Laptop sẽ tham chiếu tới đối tượng thứ nhất(Dell)

### 2.This trong một hàm là undefined khi ở strict mode



### 3.Arrow function không có Context

Có thể bạn chưa biết thì mọi function khi được tạo ra đều có ngữ cảnh (Context) riêng của nó ngoại trừ arrow function.Vì không có Context nên từ khóa this trong arrow function sẽ trỏ ra đến context gần nhất, hãy xem ví dụ sau để hiểu rõ hơn nhé :

```
const Car = {
  name: 'Honda',
  weight: 1200,
  run: function () {
    const getRoad = () => {
      console.log(this)
    }
    getRoad()
  }
}
Car.run()
// --> in ra đối tượng Car
```

Trong ví dụ trên hàm getRoad là một arrow function nằm bên trong một function khác,nó sẽ mượn Context gần nó nhất nên từ khóa this bên trong hàm này sẽ trỏ đến object Car.

Hãy đặt arrow function vào strict mode xem sao nhé:

```
'use strict'
const func = () => {
  console.log(this)
}
func()
```

Kết quả in ra sẽ là đối tượng window, vì arrow function không có Context và tham chiếu đến đối tượng gần nhất chứa nó(window)

### 4 .function bên trong một function

Hãy cùng đến một ví dụ phức tạp hơn một chút

```
const Car = {
  name: 'Vinfast',
  weight: 2000,
  run: function () {
    console.log(this)
    function getRoad() {
      console.log(this)
    }
    getRoad()
  }
}
Car.run()
```

Ở ví dụ trên, từ khóa this bên trong hàm run sẽ trỏ đến đối tượng Car, vậy thì từ khóa this bên trong hàm getRoad sẽ trỏ đến đâu?

Cùng phân tích một chút, mỗi hàm được tạo ra sẽ có context riêng của nó, và context của hàm getRoad không thuộc đối tượng nào, và không có đối tượng nào có thể truy cập được đến hàm này, vậy nên nó sẽ dùng luôn context là window,từ đó có thể suy ra từ khóa this bên trong hàm getRoad sẽ là window. 

### 5.Các phương thức  bind(), call() , apply() sẽ tham chiếu this tới đối tượng khác.

Phần này khá dài, các bạn có thể tham khảo [tại đây](https://viblo.asia/p/bind-apply-and-call-trong-javascript-DzVGpoMDvnW)

Xin chào tạm biệt các bạn.Chúc các bạn thành công trên con đường lập trình viên của mình.