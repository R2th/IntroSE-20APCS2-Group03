ECMAScript 2015 (ES6) được thêm cú pháp class (class syntax), vì vậy chúng ta sẽ có 2 mẫu để tạo một đối tượng (Object). Để so sánh hai cách chúng ta sẽ tạo một (TodoModel) như một class và một bằng factory function. 

**TodoModel như một Class**

```
class TodoModel {
    constructor(){
        this.todos = [];
        this.lastChange = null;
    }
    
    addToPrivateList(){
        console.log("addToPrivateList"); 
    }
    add() { console.log("add"); }
    reload(){}
}
```

**TodoModel như một Factory Function**

```
function TodoModel(){
    var todos = [];
    var lastChange = null;
        
    function addToPrivateList(){
        console.log("addToPrivateList"); 
    }
    function add() { console.log("add"); }
    function reload(){}
    
    return Object.freeze({
        add,
        reload
    });
}
```

### Tính Đóng Gói
Điều đầu tiên chúng ta lưu ý là tất cả thuộc tính, trường, hàm của đối tượng **Class** là **public**

```
var todoModel = new TodoModel();
console.log(todoModel.todos);     //[]
console.log(todoModel.lastChange) //null
todoModel.addToPrivateList();     //addToPrivateList
```

Việc thiếu tính đóng gói có thể tạo ra các vấn đề về bảo mật. Lấy ví dụ của một đối tượng toàn cục (Global) mà có thể được chỉnh sửa trực tiếp từ màn hình  Developer Console (như console tab của chrome).
Khi sử dụng factory function, chỉ những hàm được công khai còn mọi thứ đều được bao đóng.

```
var todoModel = TodoModel();
console.log(todoModel.todos);     //undefined
console.log(todoModel.lastChange) //undefined
todoModel.addToPrivateList();     //taskModel.addToPrivateList
                                    is not a function
```

### this

Vấn đề this mất context dường như tồn tại ở đây khi sử dụng class. Cho ví dụ, mất this context trong các hàm lồng nhau (nested functions). Nó không chỉ gây khó chịu trong lúc code mà còn có thể ẩn chứa các lỗi (bugs) sau này.

```
class TodoModel {
    constructor(){
        this.todos = [];
    }
    
    reload(){ 
        setTimeout(function log() { 
           console.log(this.todos);    //undefined
        }, 0);
    }
}
todoModel.reload();                   //undefined
```
hoặc this mất context khi các phương thức được sử dụng như hàm callback, như trên DOM event.
Ở đây không có vấn đề khi sử dụng một factory function, vì nó không sử dụng this.

```
function TodoModel(){
    var todos = [];
        
    function reload(){ 
        setTimeout(function log() { 
           console.log(todos);        //[]
       }, 0);
    }
}
todoModel.reload();                   //[]
$("#btn").click(todoModel.reload);    //[]
```

### this và hàm arrow (arrow function) 
Arrow Function giả quyết một phần vấn đề mất this context trong classs nhưng bên cạnh đó nó tạo một vấn đề mới :
* this không tồn tại xuyên suốt trong các hàm lồng nhau.
* this mất context khi các phương thức được sử dụng như callback
* arrow function tạo các anonymous functions. (các anonymous function luôn được tạo mới mỗi lần gọi, nó làm giảm performance)

Chỉnh sửa TodoModel sử dụng arrow funtion. Cần lưu ý là việc xử lý lại bằng các arrow function có thể làm chúng ta mất vài thông tin quan trọng để đọc, như là tên của function. Như ví dụ sau :

```
setTimeout(function renderTodosForReview() { 
      /* code */ 
}, 0);
//versus using an anonymous function
setTimeout(() => { 
      /* code */ 
}, 0);
```

### Tính bất biến (Immutable)
Một Object được tạo, chúng ta mong đợi nó không được thay đổi. Chúng ta có thể dễ dàng thực hiện nó bằng một phương thức Public để thực hiện vài điều khi chúng ta cần tạo một Class.
```
todoModel.reload = function() { console.log("a new reload"); }
todoModel.reload();            //a new reload
```
Vấn đề này cũng có thể được giải quyết bằng cách gọi Object.freeze(TodoModel.prototype)  sau khi khai báo một class.
Một Object được tạo bởi factory function là Immutable. Lưu ý cần sử dụng Object.freeze() khi ta trả về Object chứa chỉ những phương thức được public. Dữ liệu riêng tư (private) của Object có thể được chỉnh sửa nhưng chỉ thông qua những phương thức Public

### new
từ khóa new nên được sử dụng khi tạo Object bằng Class
new không bắt buộc cần khi tạo Object với Factory Function nhưng nếu được thêm vào thì sẽ dễ hiểu hơn, hoặc bạn có thể bỏ qua nó, không vấn đề gì.

`var todoModel= new TodoModel();`

Sử dụng new với một Factory Function sẽ trả về một Object được tạo bởi function

### Thành phần trên kế thừa

Classes support both inheritance and composition.

Below is an example of inheritance where SpecialService class inherits from Service class:

Class hỗ trợ cả kế thừa và thành phần (inheritance và composition)
Ví dụ bên dưới là của kế thừa, một class kế thừa từ một class khác:
```
class Service {
  doSomething(){ console.log("doSomething"); }
}
class SpecialService extends Service {
  doSomethingElse(){ console.log("doSomethingElse"); }  
}
var specialService = new SpecialService();
specialService.doSomething();
specialService.doSomethingElse();
```
Ở đây là một ví dụ khác nơi mà một class sử dụng lại một trường của lớp khác bằng cách sử dụng composition:
```
class Service {
  doSomething(){ console.log("doSomething"); }
}
class SpecialService{
  constructor(args){
    this.service = args.service;
  }
  doSomething() { this.service.doSomething(); } 
  
  doSomethingElse(){ console.log("doSomethingElse"); }
}
var specialService = new SpecialService({
   service : new Service()
});
specialService.doSomething();
specialService.doSomethingElse();
```
Factory Function hướng tới sử dụng thành phần trên kế thừa. Lấy một ví dụ như bên dưới :
```
function Service() {
  function doSomething(){ console.log("doSomething"); }
  return Object.freeze({
    doSomething
  });
}
function SpecialService(args){
  var service = args.service;
  function doSomethingElse(){ console.log("doSomethingElse"); }
  return Object.freeze({
    doSomething : service.doSomething,
    doSomethingElse
  });
}
var specialService = SpecialService({
   service : Service()
});
specialService.doSomething();
specialService.doSomethingElse();
```

### Bộ nhớ 
Class thì tốt hơn cho bộ nhớ vì chúng được xây dựng trên prototype. Tất cả các hàm đều được tạo chỉ một lần trong prototype của Object và được chia sẻ giữa các thể hiện (instances)
Vấn đề tốn bộ nhớ cần được lưu ý khi sử dụng các factory function khi ta tạo quá nhiều thể hiện của một Object 

Ở đây là giá trị bộ nhớ tương đối khi sử dụng Factory Function

The memory cost (in Chrome)
| Instances|10 methods  | 20 methods |
| -------- | -------- | -------- |
| 10        | 0          |  0         |
| 100       | 0.1Mb      |  0.1Mb     |
| 1000      | 0.7Mb      |  1.4Mb     |
| 10000     | 7.3Mb      | 14.2Mb     |


### Đối tượng và cấu trúc dữ liệu (Objects vs Data Structures)
Trước khi phân tích chi phí bộ nhớ ta nên phân biệt giữa 2 loại đối tượng.
* OOP Object
* Data Object
> OOP Object : Thay đổi dựa trên hành vi và ẩn đi data
> 
> Data Object: Truy xuất dữ liệu và không có gây một hành vi nào. 
> 
> — Robert Martin “Clean Code”


I’ll take a look again at the TodoModel example and explain these two kinds of objects.
Ta xem lại một lần nữa với ví dụ TodoModel và giải thích hai dạng của đối tượng.
```
function TodoModel(){
    var todos = [];
           
    function add() { }
    function reload(){ }
       
    return Object.freeze({
        add,
        reload
    });
}
```

* TodoModel chịu trách nhiệm lưu trữ và quản lý một danh sách các todo. TodoModel là OOP Object, chúng cung cấp hành vi và ẩn đi dữ liệu. Ở đây chỉ có một thể hiện của nó trong ứng dụng, không tốn thêm chi phí bộ nhớ khi sử dụng bằng Factory Function.
* Đối tượng todo biểu diễn một cấu trúc dữ liệu. Ở đây sẽ có nhiều object như vậy, nhưng chúng chỉ thuần là đối tượng của JavaScript. Chúng ta không cần  quan tâm việc giữ các hàm riêng tư của nó , thay vào đó chúng ta thực sự bày ra dữ liệu và phương thức của chúng. Vì vậy tất cả những đối tượng này được xây dựng trên prototype và chúng sẽ tiết kiệm được chi phí bộ nhớ. Chúng ta có thể tạo chúng như một Object đơn giản hoặc dùng Object.create()

### Thành phần giao diện (UI Components)
Trong ứng dụng, ở đây có hàng trăm hoặc hàng ngàn thể hiện của một thành phần giao diện. Đây là một tình huống mà ta cần trao đổi giữa tính bao đóng và sử dụng bộ nhớ.
Các thành phần giao diện sẽ được xây dựng trên các thành phần có sẵn của một framework. Ví dụ, các objects được xử dụng trong Vue hoặc class trong react. Mỗi thành phần của chúng đều được Public nhưng chúng sẽ được lợi từ việc tiết kiệm bộ nhớ bởi sử dụng hệ thống prototype.

### Kết luận
Điểm mạnh của sử dụng class là sự quen thuộc cho mọi người khi nó dựa trên class quen thuộc, nó cũng có một cú pháp rõ ràng trên hệ thống prototype. Tuy nhiên, nó có vấn đề về bảo mật và việc sử dụng this, và nó cũng gây ra các lỗi vì mất context. 
The strong points of class are its familiarity for people coming from a class-based background and its nicer syntax over the prototype system. However, its security problems and the usage of this, a continuous source of losing context bugs, makes it a second option. As an exception, classes will be used if required by the component’s framework, as in the case of React.

Factory function is not only the better option for creating secured, encapsulated, and flexible OOP Objects but also opens the door for a new, unique to JavaScript, programming paradigm.

Factory Function thì tốt cho việc tạo các Object cần bảo mật, bao đóng và linh động, nó còn giúp ta tạo ra các unique Object giúp cho việc tạo Immutable Object được dễ dàng.

Nguồn: https://medium.freecodecamp.org/class-vs-factory-function-exploring-the-way-forward-73258b6a8d15