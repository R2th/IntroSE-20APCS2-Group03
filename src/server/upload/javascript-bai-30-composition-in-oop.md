Sau khi tìm hiểu về các đặc trưng `Inheritence`, `Encapsulation`, `Polymorphism`, `Abstraction`, và cách thức để biểu hiện trong code `JavaScript` khi tham chiếu từ `Java`; Có một vài tính năng mà mình cảm thấy rất cần thiết để tìm kiếm một cách thức phù hợp để biểu thị. Đó là:

**Thứ nhất**, tính năng đóng gói `Encapsulation` vay mượn một phần từ nhãn `protected`, giúp giới hạn khả năng truy xuất tới các yếu tố chỉ khả dụng trong dòng kế thừa. Giải pháp được tham khảo từ [JavaScript.info](https://javascript.info/private-protected-properties-methods) bị lệ thuộc khá nhiều vào quy ước logic tự tạo. Tức là về mặt kĩ thuật thì các yếu tố được đặt tên với ký hiệu `_` ở phía trước vẫn là `public` và người viết code sẽ phải tự giới hạn việc viết lệnh truy xuất tới các yếu tố đó.

**Thứ hai**, Khả năng tạo bề mặt tham chiếu bằng `interface` tới một `object` tương thích và ẩn đi tất cả mọi yếu tố khác không liên quan tới `interface` đó. Cái này trong `OOP` người ta gọi là `blackbox`, khi code sử dụng một `object` không biết chi tiết tới đối tượng mà nó đang tương tác. Giải pháp mà mình tìm thấy trước đó chỉ có thể giúp sử dụng `interface` như một công cụ thiết kế trừu tượng, để tạo ràng buộc cho giai đoạn viết code triển khai logic chi tiết.

Hm... chắc chắn là phải có một cách thức khác để biểu thị những logic hoạt động như thế này. Ý tưởng chung chung là một ví dụ trong môi trường `Java`, nơi mà hình thức Đa Kế Thừa `Multi-Inheritance` không được hỗ trợ ở cấp độ cú pháp của ngôn ngữ, người ta đã mô phỏng lại bằng cách tạo ra một kiến trúc code được gọi là Tổ Hợp Các Đối Tượng `Object Composition`.

![image.png](https://images.viblo.asia/eab51fd6-f87e-450a-807c-0d58007296b7.png)

Tức là thay vì việc copy các yếu tố có mặt trong các `Trait` vào `class` sử dụng thì người ta sẽ gắn mỗi `Trait` vào một thuộc tính trong `class` đó. Và khi thực hiện truy xuất tới một thành phần có trong `Trait` đó thì cú pháp sẽ là `object.trait.method()`. Hơi rườm rà, nhưng điều quan trọng là tính năng cần thiết đã xuất hiện.

Vậy chúng ta hãy thử làm một vài ví dụ để xem `Object Composition` có thể cải thiện được những gì mà các công cụ `OOP` trong `JavaScript` chưa hỗ trợ về mặt kĩ thuật.

## Protected State

Do `JavaScript` không có logic đóng gói ở cấp độ thư mục, vì vậy nên khi vay mượn logic hoạt động của nhãn `protected` từ `Java`, điều mà chúng ta muốn là: có thể định nghĩa các thuộc tính `property` không mở như `public`, nhưng cũng không đóng kín trong phạm vi của `class` đó như `#private`, mà có thể khả dụng trong cả phạm vi của các `class` kế thừa.

Như vậy, đầu tiên để các `property` không mở giống như `public` thì chúng ta sẽ định nghĩa tất cả đều là `#private`.

```main.js
class Person {
   #name = "Somebody"
   #age = 1001
   
   do () { console.log ("Just a method") }
} //. Person


// - main - - - - - - - - -

var wukong = new Person()
console.log (wukong.#name)
// - error: #name is private
```

Tuy nhiên bây giờ chúng ta cũng lại muốn các `class` kế thừa `Person` cũng có thể truy xuất trực tiếp tới các thuộc tính này. Tức là cần hỗ trợ thao tác `extends` có thể mang các thuộc tính này từ `class Person` sang các `class` kế thừa.

Nếu vậy, lúc này chúng ta lại cần các thuộc tính này được mở `public` khi thực hiện thao tác kế thừa. Và điều này chỉ khả thi nếu như chúng ta tách các thuộc tính ra một `class` khác.

![image.png](https://images.viblo.asia/c89947ab-3b23-4415-96a6-6119452c5506.png)

Ở đây mình tạm sử dụng từ `Entity` (thực thể) để đặt tên cho các `class` đại diện, có thêm các phương thức `method` mô tả khả năng hành động, tương tác, mô phỏng thực thể người; Còn từ `Record` (bản ghi) được sử dụng để đặt tên cho `class` dữ liệu, mô tả một bản ghi trong `database`.

Xét trên giao diện sử dụng các `class Entity`, thì các `#state` là `private` nên có thể giới hạn khả năng truy xuất từ code định nghĩa bên ngoài dòng kế thừa. Còn ở các `class Record` thì các trường dữ liệu `name`, `age`, v.v... đều là `public` nên có thể được kế thừa bởi các `class Record` khác.

Như vậy trong trường hợp `PersonRecord` có chứa nhiều thuộc tính trạng thái thì chúng ta sẽ có thể được hỗ trợ bởi thao tác `extends` và không phải định nghĩa lại khi cần tạo ra một `class` kế thừa `PersonEntity`.

```main.js
const Person = { /* namespace */ }
const VNese = { /* namespace */ }


Person.Record = class {
   name = "Someone"
   age = 1001
} //...Record

Person.Entity = class {
   #state = new Person.Record ()
   
   do () {
      console.log ("Just a method.")
   }
} //...Entity


VNese.Record = class extends Person.Record {
   jobs = ["crafter", "teacher"]
} //..Record

VNese.Entity = class extends Person.Entity {
   #state = new VNese.Record ()
   
   intro () {
      console.log (this.#state.name)
      console.log (this.#state.age)
      console.log (this.#state.jobs)
   }
} //..Entity


// - main - - - - - - - - -

wukong = new VNese.Entity ()
wukong.intro ()   // Ok

console.log (wukong.#name)   // Error
```

```CMD|Terminal.io
node main.js

Someone
1001
[ 'crafter', 'teacher' ]

/home/semiart/Documents/draft-code/main.js:38
wukong.#name ()
      ^

SyntaxError: Private field '#name' must be declared in an enclosing class
```

Như vậy là chúng ta đã có `#name` khả dụng đối với code được định nghĩa bên trong `class` kế thừa và được ẩn khỏi code định nghĩa bên ngoài. Cách thức xử lý `protected state` đối với `abstract class` cũng hoàn toàn tương tự nên chúng ta không cần thiết phải thêm code ví dụ nữa.

Về vấn đề đóng gói các phương thức `method` thì thực sự không hẳn cần thiết, bởi trên thực tế thì những `method` cần ẩn đi ở dạng `private` hay `protected` đều là một dạng `sub-program` hỗ trợ cho các `method` để mở ở dạng `public`. Và như vậy chúng ta đều có thể chuyển thành các `sub-program` định nghĩa bên ngoài không gian của các `class`, sau đó thì từ các `method` chính sẽ có thể truyền các tham số cần thiết vào các `sub-program` hỗ trợ.

## Blackbox Referencing

Trước hết hãy cùng xem xét lại tính năng này trong `Java` mà chúng ta đã biết qua ví dụ của bài viết trước. Giả sử chúng ta đang có một `class Person` triển khai `implements` các giao diện `Crafter` và `Teacher`. Một thao tác tham chiếu qua `interface Crafter` sẽ không thể sử dụng các phương thức không được khai báo trong `interface` đó.

```Crafter.java
interface Crafter {
   void work ();
   void rest ();
}
```

```Teacher.java
interface Teacher {
   void intro ();
   void teach ();
}
```

```Main.java
Person someone = new Person ();

Teacher asteacher = someone ();
asteacher.teach ();   // Ok

Crafter ascrafter = someone;
ascrafter.teach ();   // Error
```

Tính năng này được thể hiện trong `Java` nhờ các tên định danh đều được định kiểu rõ ràng và trình biên dịch sẽ có thể thực hiện logic tìm tới định nghĩa của `interface` đang sử dụng. Tuy nhiên đối với một ngôn ngữ kiểu động `dynamic-typing` như `JavaScript` thì chúng ta cần tự tìm giải pháp. Vẫn sẽ là `Object Composition`. Và đây là phép tham chiếu qua một `interface` trong `JavaScript`:

```referencing.js
var someone = new Person.Entity ()

var { asteacher } = someone
asteach.intro ()
asteach.teach ()     // Ok

var { ascrafter } = someone
ascrafter.teach ()   // Error
```

Điều đó có nghĩa là mỗi `interface` sẽ cần triển khai bằng một `trait` tương ứng và gắn vào một thuộc tính của `class Entity` sử dụng `trait` đó.

```main.js
const Person = { /* Entity */ }
const Teacher = { /* Trait */ }


Person.Record = class {
   name = "Someone"
   age = 1001
   
   constructor (name, age, knowledge) {
      this.name = name
      this.age = age
   }
} //...Record

Person.Entity = class {
   #state = null
   asteacher = null
   ascrafter = null
   
   constructor (name, age, knowledge) {
      this.#state = { /* empty */ }
      // - uses Traits
      this.asteacher = new Teacher.Trait (this.#state, knowledge)
      this.ascrafter = new Object () // Crafter.Trait
      // - override Properties in Traits
      Object.assign (this.#state, new Person.Record (name, age))
   }
} //...Entity


Teacher.Record = class {
   knowledge = 1001
   
   constructor (knowledge) {
      this.knowledge = knowledge
   }
} //....Record

Teacher.Trait = class {
   #state = null
   
   constructor (superstate, knowledge) {
      this.#state = superstate
      var record = new Teacher.Record (knowledge)
      Object.assign (this.#state, record)
   }
   
   intro () {
      console.log ("As a teacher..")
      console.log ("Name: " + this.#state.name)
      console.log ("Age: " + this.#state.age)
   }
   
   teach () {
      console.log ("Knowledge: " + this.#state.knowledge)
   }
} //....Trait


// - main - - - - - - - - -

wukong = new Person.Entity ("Wukong", 500, 72)

var { asteacher } = wukong
asteacher.intro ()   // Ok
asteacher.teach ()   // Ok

var { ascrafter } = wukong
ascrafter.teach ()   // Error
```

Ở đây có một chút lưu ý nhỏ trong code ví dụ của `trait`, thông thường thì các `trait` sẽ được định nghĩa kèm theo đầy đủ các thuộc tính `property` cần sử dụng cho các phương thức `method` có mặt trong `trait` đó. Tuy nhiên, để làm rõ logic tham chiếu tới `superstate` nên mình đã không định nghĩa `name` và `age` trong `trait Teacher.Record`.

Ở vị trí `ascrafter = new Crafter.Trait()` sử dụng một `new Object()` rỗng thay thế để tượng trưng; Vì chúng ta chỉ đang thử tham chiếu tới phương thức `teach()` không có trong dự định thiết kế `Crafter.Trait`.

```CMD|Terminal.io
node main.js

As a teacher..
Name: Wukong
Age: 500
Age: 72
Knowledge: 1001

/home/semiart/Documents/draft-code/main.js:69
ascrafter.teach ()
          ^

TypeError: ascrafter.teach is not a function
```

Oh.. và với cách thức thực hiện như thế này, nếu muốn một `property` nào trong `wukong.#state` có thể được mở ra cho code bên ngoài sử dụng thì chúng ta có thể tạo thêm một `trait` có tên dạng như `asaccess` giữ tham chiếu tới `#superstate`.

Sau đó `asaccess` sẽ có thể cung cấp ra bên ngoài các phương thức mở `public` và `return #state.property` muốn để mở. Như vậy, chúng ta vẫn có thể quyết định các `property` sẽ có thể được truy xuất ở cấp độ `public` hoặc `protected` nếu mong muốn.

## Tổng kết

Như vậy là với thiết kế `class Entity` bao gồm một `object #state` duy nhất và các `object trait` giữ tham chiếu tới `superstate = entity.#state`. Chúng ta đã có thể thực sự vay mượn được logic hoạt động của các `protected property` và giới hạn tham chiếu qua `interface` của một ngôn ngữ định kiểu tĩnh như `Java`.

Ngoài các khái niệm liên quan đã giới thiệu thì `OOP` còn một hạng mục phổ biến nữa được gọi là `Design Patterns`. Nếu như bạn có thời gian để tìm hiểu thêm về chủ đề này thì ở đây mình có một Series lược dịch từ `Tutorialspoint.com`:

[[Design Patterns] Một Số Dạng Thức Triển Khai Trong OOP](https://viblo.asia/s/24lJDzzaKPM)

  Và một Series mà mình theo dõi, được dịch chi tiết từ `Refactoring.guru`:
  
[Design Patterns - Ren](https://viblo.asia/s/68Z00n2NZkG)

Đây cũng là bài viết cuối cùng trong chuỗi bài viết giới thiệu về các mô hình lập trình của Sub-Series này. Và cũng là bài viết cuối cùng được hoàn thành của Series Tự Học Lập Trình Web Thật Tự Nhiên.