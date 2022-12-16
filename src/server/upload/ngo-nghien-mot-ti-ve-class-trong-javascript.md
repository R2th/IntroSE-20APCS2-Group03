# Ngó nghiên một tí về class trong Javascript

Class, một khái niệm mà có thể bạn đã gặp nhiều trong các ngôn ngữ như `Java`, `C#` hay cũng có thể là `PHP`, một thứ không thể thiếu trong lập trình OOP và được nhiều người sử dụng. Và dĩ nhiên, `Javascript` biết điều đó vì thế nên trong `Javascript` chúng ta cũng sẽ có class và hôm nay chúng ta sẽ tìm hiểu xem class trong `Javascript` là như thế nào.

## Định nghĩa 
Rõ ràng trước khi xài thì chúng ta cần phải biết nó là cái gì trước cái đã, nguyên bản định nghĩa trên [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) *"Classes are in fact " special function " , and just as you can define function expressions and function declarations, the class syntax has two components: class expressions and class declarations."*

Tạm dịch ra sẽ là  *"Class trong Javascript thật sự ra là một "hàm đặc biệt" và bạn có thể định nghĩa class giống như bạn định nghĩa function theo hai kiểu function expressions và function declarations . Theo đó khi định nghĩa class chúng ta cũng có hai cách đó là class expressions và class declarations"*.  

Như định nghĩa ở trên cũng cho ta thấy được rằng khái niệm cũng chả giúp chúng ta hiểu về class ở đây hơn là bao mà chúng ta nên tiến vào thực hành luôn đi, đó mới là cách dễ hiểu nhất ._. 

## Lưu ý
Nhưng trước khi đi vào thực hành thì chúng ta sẽ nhắc lại **function expressions** và **function declarations** là gì cho các bạn nào chưa biết là gì (còn biết rồi thì cũng phải đọc, tại mình lỡ ghi rồi ._.). Nếu chúng ta định nghĩa function như thế này trong Javascript thì nó sẽ được gọi là **function delcarations**
```
function greeting () {
    console.log('Hello world')
}
```
Đây là cách định nghĩa function cơ bản mà có lẽ khi vừa học Javascript ở phần function chúng ta đã được biết đến. Vậy còn **function expressions** là như thế nào? Nó đây

```
const greeting = function () {
    console.log('Hello world')
}
```

Sau khi lên **ES6** thì chúng ta có thể viết "sang hơn" hơn như thế này (gọi là **Arrow function**)

```
const greeting = () => {
    console.log('Hello world')
}
```

Thêm một lưu ý nữa, mình sẽ không dịch các tên tiếng anh ra tiếng việt để bảo toàn nghĩa nhé và hơn hết là mình cũng không biết dịch ra như nào cho hay :no_mouth:

## Định nghĩa class như thế nào?
Cho một ví dụ gì đó gần gũi để có thể hình dung vấn đề nào, giả sử bây giờ chúng ta đang làm một ứng dụng quản lý dự án nhé, thì đương nhiên class đầu tiên chúng ta cần đó là  **Project** đúng không nào. Vậy làm sao khai báo class **Project** đó ra mà xài đây?
### Class declarations
Đây là cách thứ nhất, tương tự như cách định nghĩa **function declarations** ở trên, ta có thể  định nghĩa class **Project** của  ta theo cách này để xài như sau:
```
class Project {
    // Một tí code ở đây
}
```
Đây cũng là cách hay được sử dụng nhất. Và khi ta muốn tạo một instance thì vẫn như các ngôn ngữ khác:
```
    const project = new Project()
```
Thế là đã có  class **Project** theo yêu cầu rồi nhé.
### Class expressions 
Tuy nhiên, có lẽ Javascript không thích nhàm chán như vậy nên đã bonus cho chúng ta thêm một cách nữa để khai báo class **Project** của chúng ta, **class expressions**:
```
const Project = class {
    // Một tí code nữa cũng ở đây
}
```

Nhưng, bên trong cách này lại có một kiểu ghi nữa (lắm trò nhiều chuyện ghê không), giả sử ta gán vào biến tên **Project** nhưng lại muốn tên của class phải là **MyProject** cơ, thế thì làm như sau:
```
const Project = class MyProject {
    // Một tí code nữa cũng ở đây
}
```

Có vẻ khác đúng không, khi định nghĩa class theo kiểu **expressions** như thế này, chúng ta **có thể đặt tên cho class** (ví dụ dưới) hoặc **có thể không** (ví dụ trên) đều được. Và chúng ta có thể xem tên class là tên gì  bằng cách `console.log(ClassName.name)`. Có một số lưu ý về tên của class:

* Với **class declarations** thì tên của class cũng chính là cái tên sau chữ **class**. Với ví dụ của class declarations ở trên thì khi chúng ta `console.log(Project.name)` ra, ta sẽ được kết quả là `Project`
 
* Với **class expressions** thì chúng ta sẽ có hai trường hợp nếu chúng ta không đặt tên thì tên của class sẽ được lấy với tên của biến mà ta đã gán vào. Với ví dụ đầu ở **class expressions** nếu ta `console.log(Project.name)` thì kết quả chúng ta thu được sẽ là `Project`. Tuy nhiên với ví dụ thứ hai thì vì ta đã đặt tên cho class của chúng ta (sau chữ **class**) cho nên `console.log(Project.name)` kết quả thu được sẽ là `MyProject`


Khi tạo instance thì chúng ta sẽ `new` biến mà chúng ta gán class vào nhé (kể cả chúng ta có đặt tên cho class thì vẫn sử dụng biến chúng ta gán vào nha)
```
    const project = new Project()
```

### Lưu ý nhẹ
Đối với class thì sẽ không có khái niệm [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) như function, cho nên chúng ta bắt buộc phải định nghĩa class của chúng ta trước rồi sau đó mới có thể sử dụng.
```
// 1. Nên
class Project {
    // code ở đây
}

const project = new Project()
```

```
// 2. Không nên
const project = new Project()

class Project {
    // code ở đây
}

```

Nếu chúng ta làm theo cách 2 chúng ta sẽ ăn ngay vào mặt lỗi `ReferenceError` (*You have been warned :imp:*)

## Bên trong class có gì?
### Constructor
Dĩ nhiên rồi, đây là class mà đúng không. Vậy tạo constructor cho class Project nào, nếu trong `Java` bạn sẽ làm như này đúng không
```
public class Project {
	public Project () {
    	// rồi viết vô đây cái gì đó
   }
}
```

Nhưng trong `Javascript` chúng ta sẽ được tặng hẳn 1 hàm riêng đó là `constructor()` luôn. Thế nên, class Project của chúng ta sẽ được viết như sau:
```
class Project {
	constructor () {
   		// viết vô cái gì đó 
   }
}
```
Nhớ là một class chỉ có 1 `constructor()` thôi nhé, viết hai cái `constructor()` là ăn lỗi `SyntaxError` đấy  (*You have been warned :imp:*). Constructor sẽ là phương thức được chạy đầu tiên khi ta khởi tạo một instance của class.

Và nếu chúng ta muốn class Project của chúng ta có vài **property** ví dụ như *name, description* thì chúng ta sẽ bỏ nó vào `constructor` và các property của chúng ta sẽ được load bởi `constructor` trước tiên cho các phương thức khác sử dụng.
```
class Project {
	constructor (name, description) {
   		this.name = name
  		this.description = description
   }
}
```
Dĩ nhiên ta vẫn có thể viết như thế này
```
class Project {
	// Khai báo các property trước tiên rồi vào constructor load data cho các property đó
	name
    description
	constructor (name, description) {
   		this.name = name
  		this.description = description
   }
}
```
Và khi gọi ra sẽ là 
```
const project = new Project('Big Project', 'This is a sample project')
```
### Các method của class
Rồi, bây giờ nếu chúng ta muốn class Project in ra màn hình console thông tin của project thì sẽ làm thế nào, viết một phương thức làm chuyện đó thôi: 
```
class Project {
	constructor (name, description) {
   		this.name = name
  		this.description = description
   }

	printInfo () {
    	// Để gọi các property của class ta sẽ dùng this.tênCủaPropertyĐó
   		// this ở đây là chỉ class chứa phương thức này
    	console.log(`project  name ${this.name} has description ${this.description}`)
   		// cách viết ở trên là template string cho bạn nào chưa biết <3 
   	}
}
```

Và xài thôi
```
const project = new Project('Big Project', 'This is a sample project')
project.printInfo()
// kết quả sẽ là: project name Big Project has description This is a sample project
```

Thêm một lưu ý nhỏ rằng, nếu đã ở bên trong class thì code của chúng ta sẽ ở trong [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), cho nên chúng ta cần viết code "đàng hoàn", không có sử dụng biến trước rồi khai báo sau nha :laughing:
### Getter & Setter
Quen thuộc đúng không nào, ở đây chúng ta sẽ sử dụng hai từ khóa đó là `get` và `set`, áp dụng thử vào class Project của chúng ta xem:
```
class Project {
	constructor (name, description) {
   		this.name = name
  		this.description = description
   }
  get projectName() {
		return this.name
  }
  set projectName(name) {
 		this.name = name
  }

  get projectDescription() {
		return this.description
  }
  set projectDescription(description) {
 		this.description = description
  }
}
```

Và nếu chúng ta đã định nghĩa các hàm get set cho class Project của chúng ta, thì chúg ta có thể làm như sau:
```
console.log(project.projectName)
console.log(project.projectDescription)
```
Chúng ta sẽ truy cập vào hàm getter với cách ghi như trên, bây giờ hàm getter của chúng ta **không được xem là một function nữa** cho nên nếu ta viết theo kiểu `console.log(project.projectName())` **là sai**.

```
project.projectName = 'Another name of project'
project.projectDescription = 'This is a another long description for project'
```
Đối với hàm setter thì chỉ cần viết như phía trên thì nó sẽ tự động vào hàm setter của chúng ta đã define ở trên. Chúng ta cũng **không thể viết** là `project.projectName('Another name of project')` được  vì hàm setter này **cũng không được coi là một function**.

Và một lưu ý nhỏ nữa là tên hàm setter và getter của chúng ta phải **giống nhau** nếu không chúng ta sẽ bị **warning** ở hàm setter là Property '*setterMethodName' implicitly has type 'any', because its set accessor lacks a parameter type annotation*' (warning này khi mình code trên text editor là VSCode)

### Static method
Như bao ngôn ngữ xịn xò khác, `Javascript` cũng có static method :sunglasses:. Cách sử dụng rất đơn giản, khai báo nè:
```
class Project {
	.....
	// một mớ code ở trên
    static sayHello () {
  		console.log('This is a console inside a static method')
    }
    
}
```

Và khi gọi **static method** thì chúng ta phải dùng **class** để gọi chứ **không dùng instance** nếu không là ăn lỗi `TypeError` đấy (*You have been warned :imp:*).
```
// project là instance còn Project là Class

// 1. Đúng
Project.sayHello()

// 2. Sai
project.sayHello()
```

## Kế thừa với `extends`
**Inheritance** là một nguyên lý quan trọng của OOP đúng không nào, vậy nên đương nhiên `javascript` sẽ có hỗ trợ nó. Giả sử bây giờ chúng ta lại muốn có một class nữa là **SecretProject**, class này sẽ kế thừa class **Project**  của chúng ta và có thêm một field nữa là *password*, thì sẽ viết như nào? Nó đây:
```
class SecretProject extends Project {
	constructor (name, description, password) {
		super(name, description)
		this.password = password
	}
}
```
 Và chúng ta đã có một class mới kế thừa tất cả class **Project** cũ. Tuy nhiên chúng ta cần lưu ý rằng nếu trong class con của chúng ta có `constructor` thì **phải gọi hàm** `super()` trước khi chúng ta sử dụng từ khóa `this` (đó là điều bắt buộc, nếu bạn không làm thì compiler nó cũng bắt bạn làm thôi :sunglasses:).
 
 Ngoài ra chúng ta cũng có thể làm như sau (extends từ một function base-class)
 ```
 function WeirdProject (name, description) {
    this.name = name
    this.description = description
}


class SecretProject extends WeirdProject {
	constructor (name, description, password) {
		super(name, description)
		this.password = password
	}
}
 ```
Nhưng thôi, đừng làm vậy ráng xài cách ở trên kia đi.

Bây giờ chúng ta đã có các property và method của class cha rồi nhưng chúng ta lại muốn thay đổi phương thức `printInfo` cũ là sẽ in luôn thông tin của password ra cho chúng ta (cái này là làm demo thôi, đừng chửi mình vụ security nhé :laughing:) thì chúng ta sẽ:
```
class SecretProject extends Project {
	....
	// bỏ qua mớ code trên kia đi
	printInfo () {
		super.printInfo()
		console.log('And the password of this project is: ', this.password)
	}
	
}
```
Chúng ta đã override lại được phương thức `printInfo` của class **Project** trong class **SecretProject**. Tuy nhiên chúng ta cần lưu ý là

*	Bạn nên gọi phương thức ở lớp cha bằng cách `super.tênPhươngThức()` thay vì `this.tênPhươngThức()` khi ở trong class con.
*	Khi bạn muốn override lại một phương thức ở lớp cha và **muốn chạy lại phương thức đó bên trong phương thức mới của lớp con** thì phải gọi phương thức ở lớp cha bằng `super` nếu gọi bằng `this` bạn sẽ dính loop vô hạn vì đó là gọi đệ quy (trong trường hợp bạn không set điều kiện dừng, nhưng ai lại có chủ đích set điều kiện dừng trong ngữ cảnh này đúng không => loop vô hạn :sunglasses:)


Ok đó là sương sương về class trong `Javascript` nhé, nếu bạn muốn tìm hiểu kĩ hơn thì
* Search google thêm
* Xem chi tiết ở link mà mình tham khảo tại [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)


Hi, 20-12-2019