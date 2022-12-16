Data binding là một trong nhưng khái niệm quan trọng nhất trong JS Framework.
Ràng buộc (binding) dữ   liêu là phản ánh logic hoặc biến của một đối tượng trên view của ứng dụng. Bất cứ khi nào có sự thay đổi thì view cũng phải cập nhật các DOM với các giá trị mới . Angular framwork có nhưng các ràng buộc dữ liệu mạnh mẽ như.
1. CD (Change Detection)
2. DI (Dependency Injection)
3. Modular System

 Nhưng ràng buộc dữ liệu vẫn còn là một super feature. trong bài này chúng ta sẽ cùng tìm hiểu cơ chế họat động của ràng buộc dữ liệu trong Angular
 
 **Template Expression {{}}**
     Đây là cách ràng buộc dữ liệu một chiều với các thuộc tính của component với template của thành component này. Vì vậy khi thuộc tính trong component thay đổi , template được cập nhật nhưng giá trị mới. Đây là ràng buộc một chiều, thuộc tính của model sẽ chỉ được cập nhật từ phía model và biến đại diện cho model được cập nhật cả trên view. Luông dữ liệu từ model đến view hoặc view đến model.
     
     
```
@Component({
    template: `
        <div>
            <h2>
                {{message}}
            </h2>
        </div>
    `
})
export class AppComponent {
    message = "My Message"
}
 ```
 
 Model(AppComponent) có thuộc tính *message* với value *My Message*. Chúng ta có thể  tham chiếu đến thuộc tính này bằng cách   :
 
 
 `
     const appC = new AppComponent();
     logs(appc.name) // My Message
 `
 Cách đánh dấu  component cần hiển thị với giá trị của thuộc tính `{{message}}`. Về bản chất thì khi sự dung `{{}}` để Angular biết là muốn hiển thị giá trị của biến message trên view.
 Vì vậy, trong AppComponent khi template được hiển thị thì {{message}} thay thế `My Message`.
  ```
  <div>
            <h2>
                {{message}}
            </h2>
        </div>
|
v
<div>
            <h2>
                My Message
            </h2>
        </div>
 ```
 
 Nếu chúng ta thay đổi message thuộc tính trong component như bên dưới 
 
 ```
     @Component({
    template: `
        <div>
            <h2>
                {{message}}
            </h2>
        </div>
    `
})
export class AppComponent {
    message = "My Message"
    cosntructor() {
        setInterval(()=>this.message = Date.now(), 1000)
    }
}
 ```
 Sau khoảng một phút thì giá trị của message sẽ được gán lại với giá trị là thời gian hiện tại. Đây cũng là nguyên nhân mà template trong DOM sẽ cập nhật lại giá trị .
 Đôi khi thì nó là các biểu thức toán học phức tạp hơn có thể như :
 - Call method {{method()}}
 - Biểu thức {{}}
 - Toán học  {{2+3}}
 - Biểu thức điều kiện 
 - Cộng chuỗi , nối chuỗi  {{'string a' + 'string b'}}

**Property Binding `[]`**

 Đây là cách ràng buộc dữ liệu một chiều với dữ liệu của Model với ràng buộc target .
Ràng buộc đến target có thể là thuộc tính của element, thuộc tính component, thuộc tính của directive.
 Ở giữa `[]` là tên thuộc tính của model được liên ràng buộcvới element.
 
 ***Element Binding***
 
 ```
 @Component({
    template: `
        <div>
            <img [src]="imageURL" />
        </div>
    `
})
export class AppComponent {
    imageURL = "./images/k.png"
    constructor() {
        setInterval(()=>this.imageURL = './images/p.png', 1000)
    }
}
```

Thuộc tính `src` của tag `img` ràng buộc với `imageURL` thuộc tính của class AppComponent. 
Nếu  `imageURL` thay đổi trong AppComponent  class thì thuộc tính `src` trong element cũng sẽ được thay đổi theo. Khi render trông nó sẽ như bên dưới .

```
<div>
            <img [src]="imageURL" />
        </div>
|
v
<div>
            <img src="./images/p.png" />
        </div>
```

Sau khoảng 1 phút `imageURL` được thay đổi khi call hàm `setInterval(...)`

```
<div>
  <img [src]="imageURL" />
</div>
|
v
<div>
  <img src="./images/k.png" />
</div>
```

Vậy nên khi sử dụng `[]` trên thuộc tính của element chúng  sẽ nói cho Angular rằng nên lấy giá trị của thuộc tính model truyền cho nó.

**Component Binding**

```
@Component({
    template: `
        <child [data]="dataSource"></child>    
    `
})
export class Parent {
    dataSource = 'My Source'
    constructor() {
        setInterval(()=> this.dataSource = "My S" + Date.now(),1000)
    }
}
@Component({
    selector: 'child',
    template: `
     <h2>{{data}}</h2>
    `
})
export class Child {
    @Input data
}
```
childcomponent được hiện thị trên  component cha .  Component cha sử dụng `[]` để ràng buộc `data`  thuộc tính của childcomponent với `dataSource`. Khi `dataSource` thay đổi thì thuộc tính của childcomponent `data` cũng được cập nhật giá trị. Trong Angular sử dụng  decorator @input để biết thuộc tính nào được export ra bên ngoài class.

**Event Binding ()**

Chúng ta đã biết truyền dữ liệu từ cha sang con . Bây giờ chúng ta sẽ xem làm thế nào để truyền từ con sang cha.
    Trong DOM , các element có thể raise lên event và chúng ta ràng buộc  từng sự kiện  với một trình sử lý event, một chức năng được chạy khi event được phát ra.
    
   ```
    <button onclick="runHandler">Click Me</button>
<script>
    function runHandler($event) {
        console.log(`'Click Me' button clicked`)
    }
</script>
```

Chúng ta có một button `Click Me`và   `onclick` đính kèm. khi click button này thì function . Cũng giống vậy , trong Angular chúng ta cũng attached event vào elemnt của component trong template. Điều này sử dung  bằng cách sử dụng `()`.

```

@Component({
    template: `
        <div>
            <button (click)="clickHandler()">Click Me</button>
            <input (change)="changeHandler()" placeholder="Enter your name" />
        </div>
    `
})
export class AppComponent {
    clickHandler() {
        // ...
    }
    changeHandler() {
        // ...
    }
}
```
Ở trên thì khi `Click Me`  được đính kèm click event và event handler `clickHandler`. Khi click button thì method `clickHandler` trong Appcomponent mới chạy
Tương tự, input có đính kèm . Được kich hoạt khi có sự thay đổi giá trong ô input hoặc giá trị mới. Khi sự kiện được thay đổi được kích hoạt , phương thức `changeHandler` được chạy
Trong Angular evnet binding:
``` (event name) = "event handler expression" ```

Tên event năm trong `()`  và năm trong danh sách HTML DOM.
Trong Angular component có thể tạo và customs events.
```
<child (deposit)="depositMoulah()"></child>
```

element component con  Angular không phải element HTMl. Chúng ta đính kèm event sử dụng `()` và truyền cho  `deposit`.  `deposit`  không là một event element HTML. Đây là cách custom event tạo bởi Angular.
Angular sử dụng khải niệm của `EventEmitter` để tạo và phát ra event.

Component ràng buộc  với khai báo một biến sự kiện với output decorator và đặt nó bằng với một EventEuctor mới. Ví dụ này của EventEuctor được sử dụng để phát ra các sự kiện.

Component cha tạo function để nhận message và thiết lập bằng thuộc tính của con.

```

@Component({
    template: `
        <child (deposit)="depositMoulah"></child>    
    `
})
export class Parent {
    depositMoulah() {
        // ...
    }
}
@Component({
    selector: 'child',
    template: `
     <h2>Child Component</h2>
    `
})
export class Child {
    @Output deposit = new EventEmitter()
    constructor() {
        setInterval(()=>this.deposit.emit(),1000)
    }
}

```

Khi component con , gọi method  `.emit()` trong EventEmitter class. Phuowng thức deposutMoulahtrong component cha sẽ được gọi . Output decorator  nói cho Angular răng thuộc tính `name` được sử dụng gọi ràng buộc sự kiện trên component con  class khi component phát ra sự kiện từ component cha.

Chúng ta có thể truyền data từ con sang cha sử dụng concept `()`.

```
@Component({
    template: `
        Data recieved: {{data}}
        <child (deposit)="depositMoulah"></child>    
    `
})
export class Parent {
    data = null;
    depositMoulah($event) {
        this.data = $event.value
        // ...
    }
}
@Component({
    selector: 'child',
    template: `
        <h2>Child Component</h2>
    `
})
export class Child {
    @Output deposit = new EventEmitter()
    constructor() {
        setInterval(()=>this.deposit.emit('data from Child' + Date.now()),1000)
    }    
}

```

Cùng với `.emit()` phương thức trong EventEmitter có thể truyền data/message  chúng ta muốn liên  lạc với cha . Sau đó cha sẽ nhận được message trong $event object.

**Banana in the Box [ () ]**
Đây là một cách gọi cách hợp nhất binding và event để đạt được sức manh của việc e two-way binding .

```
[property binding]
                       ------->  [(two-way binding)]
(event binding)
```

Với việc giao tiếp 2 chiều từ Model đến view hay từ view đến Model
Bạn có thể thay đổi dữ liệu Mô hình từ Chế độ xem và cũng từ Mô hình và cả hai sẽ phản ánh các thay đổi.
Với cả ràng buộc thuộc tính và ràng buộc sự kiện, chúng ta có thể đạt được ràng buộc hai chiều. Hãy để chi tiết với một ví dụ:
```
@Component({
    template: `
        Data recieved: {{parentMessage}}
        <child (messageChange)="sendMessage" [message]="parentMessage"="amount"></child>    
    `
})
export class Parent {
    parentMessage = null;
    constructor() {
        setInterval(()=>{
            this.parentMessage = 'data from Child' + Date.now()
            }, 1000)
    }
    sendMessage($event) {
        this.parentMessage = $event.value
        // ...
    }
}
@Component({
    selector: 'child',
    template: `
        <h2>Child Component</h2>
        <h3>{{message}}</h3>
    `
})
export class Child {
    @Output messageChange = new EventEmitter()
    @Input message: any
    constructor() {
        setInterval(() => {
            this.message = 'data from Child' + Date.now()
            this.messageChange.emit(this.message)
            }, 1000)
    }
}
```

Compnent cha và con có thể thiết lập thay đổi thuộc tính message trong  component con. Trong component cha thuộc tính message được ràng buộc  parentProperty. Sau đo compentncon sẽ phát ra một một sự kiện messageChange event. Sau component con sẽ phát ra event  messageChange , component cha ràng buộc với nó cập nhật giá trị của nó với giá trị thuộc tính message đươc gửi bới component con. Ban có thể thấy giao tiếp 2 chiều , thuộc tính message trong component con được cập nhật từ component cha và component con.

Thay vì để có  two-way binding mà phải viết nhiều biểu thức mẫu, Trong Angular thì chỉ cần `[()]`

```
<child (messageChange)="sendMessage" [message]="parentMessage"="amount"></child>
```
may be angular: 

```
<child [(message)]="message"></child>
```

Mẹo ở đây là nếu tên ràng buộc thuộc tính là event, thì binding sự kiện phải là eventChange. Tên event  phải giống với ràng buộc  thuộc tính nhưng được gắn với Change. Điều này là để Angular phát hiện ra rằng bạn đang thực hiện thao tác hai chiều.

```
@Component({
    template: `
        Data recieved: {{parentMessage}}
        <child [(message)]="parentMessage"></child>    
    `
})
export class Parent {
    parentMessage = null;
    constructor() {
        setInterval(()=>{
            this.parentMessage = 'data from Child' + Date.now()
            }, 1000)
    }
}
@Component({
    selector: 'child',
    template: `
        <h2>Child Component</h2>
        <h3>{{message}}</h3>
    `
})
export class Child {
    @Output messageChange = new EventEmitter()
    @Input message: any
    constructor() {
        setInterval(() => {
            this.message = 'data from Child' + Date.now()
            this.messageChange.emit(this.message)
            }, 1000)
    }
}
```
Bạn có thể thấy nó đơn giản và gọn gàng hơn :

cách phổ biến nhất chỉ thị sử dụng cách này là ngModel:
[(ngModel)]. Chúng ta sẽ thấy nó làm tương tự như trên bằng cách sử dụng hậu tố Thay đổi trong tên ràng buộc sự kiện của nó.

```


@Directive({
  selector: '[ngModel]:not([formControlName]):not([formControl])',
  providers: [formControlBinding],
  exportAs: 'ngModel'
})
export class NgModel extends NgControl implements OnChanges,
    OnDestroy {
  @Input('ngModel') model: any;
  @Output('ngModelChange') update = new EventEmitter();
}

```

Bạn thấy nó, tên ràng buộc thuộc tính là ngModel và tên ràng buộc sự kiện là ngModelChange, Change được gắn với nó. Vì vậy, bây giờ chúng ta có thể sử dụng ngModel kèm theo Banana-in-the-Box.

```
@Component({
    template:`
        {{propName}}
        <input [(ngModel)]="propName" />
    `
})
export class App {
    propName = ''
    constructor() {
        setInterval(()=> this.propName = Date.now(), 1000)
    }
}
```

*Tóm lại*

Trong bài đăng này, chúng tôi đã xem xét ràng buộc dữ liệu trong Angular. Chúng tôi đã thấy cách ràng buộc một chiều bằng biểu thức mẫu {{}} và ràng buộc thuộc tính [] hoạt động. Sau đó, chúng tôi đã thấy chỉ có hai tác phẩm ràng buộc bằng cách sử dụng khái niệm chuối trong hộp [()].
Ràng buộc dữ liệu trong Angular không quá phức tạp, rất dễ hiểu và với sự hiểu biết củng cố sự tự tin của bạn khi sử dụngràng buộcdữ liệu trong dự án Angular tiếp theo của bạn.
Nếu bạn có bất kỳ câu hỏi nào, vui lòng bình luận bên dưới và hỏi tôi bất cứ điều gì- Tôi thích nói chuyện 🍻 Cảm ơn !!!

Link tham khảo

https://blog.bitsrc.io/data-binding-in-angular-cbc433481cec