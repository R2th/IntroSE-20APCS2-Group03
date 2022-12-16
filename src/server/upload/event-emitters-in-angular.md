Khi bạn bắt đầu học Angular, một trong những điều đầu tiên bạn học là cách giao tiếp giữa các components con và components cha.

Luồng dữ liệu đưa vào component của bạn thông qua property bindings, và luồng dữ liệu ra khỏi component của bạn là thông qua event bindings.

Nếu bạn muốn component của mình thông báo cho cha của nó biết về điều gì đó, bạn có thể sử dụng `Output decorator` với `EventEmitter` để tạo một sự kiện tùy chỉnh. Ta có ví dụ như sau:
```
@Component({
  selector: 'add-todo',
  template: `<input type="text" placeholder="Add todo.." [formControl]="control">
             <button (click)="add.next(control.value)">Add</button>
`,
})
export class AddTodoComponent {
  control : FormControl = new FormControl("");
  @Output() add = new EventEmitter();
}
```

Chúng ta có thể sử dụng Output decorator để gắn nhãn thuộc tính của chúng ta `add` như một sự kiện mà một component có thể kích hoạt để gửi dữ liệu đến cha của nó.

Và ở component cha có thể lắng nghe một sự kiện như sau:
```
<add-todo (add)="addTodo($event)"></add-todo>
```

Angular sẽ đăng ký sự kiện `add` và gọi phương thức `addTodo()` với dữ liệu khi component kích hoạt phương thức `next()`.

## Vậy EventEmitter là gì?
Nếu bạn nhìn vào đoạn mã dưới đây, bạn sẽ thấy điều gì đó thú vị:
```
export declare class EventEmitter<T> extends Subject<T> {
    __isAsync: boolean;
    constructor(isAsync?: boolean);
    emit(value?: T): void;
    subscribe(generatorOrNext?: any, error?: any, complete?: any): any;
}
```

Ta có thể thấy `EventEmitter` thực chất là một `Subject`.

Điều đầu tiên bạn có thể thấy từ đoạn mã trên là bạn có thể chuyển một giá trị boolean tới EventEmitter để xác định xem nên gửi các sự kiện theo cách đồng bộ hay không đồng bộ (Mặc định là đồng bộ).

### Bạn có sức mạnh của Rx
Bởi vì `EventEmitters` là `Subject`, chúng ta có thể sử dụng tất cả các tính năng Rx. Ví dụ, chúng tôi muốn phát ra một sự kiện chỉ khi chúng tôi có một giá trị.

```
@Output() add = new EventEmitter().filter(v => !!v);
```
Đến đây bạn đã thấy được sức mạnh của nó chưa.

Nhưng điều đó là chưa đủ. Chúng ta cũng có thể sử dụng bất kỳ `Subject` nào mà mình muốn. Hãy thử sử dụng `BehaviorSubject`:
```
@Output() add = new BehaviorSubject("Awesome").filter(v => !!v);
```

![](https://images.viblo.asia/474d7131-b7c1-47a8-b813-ac268112b546.gif)

### EventEmitters !== DOM events
Không giống như DOM events,  Các sự kiện tùy chỉnh của Angular không phải là [event bubbling](https://www.mattlunn.me.uk/blog/2012/05/what-does-event-bubbling-mean/). Nó có nghĩa là gì nếu bạn định nghĩa một cái gì đó như thế này:
```
export class TodoComponent {
  @Output() toggle = new EventEmitter<any>();
}

export class TodosComponent {}

export class TodosPageComponent {}
```

Bạn chỉ có thể nghe sự kiện toggle `TodoComponent` ở component cha của nó.
![](https://images.viblo.asia/5771b002-4a23-4173-849e-e586ad890b90.png)

Đoạn mã sau đây sẽ làm việc:
```
// todos.component
<app-todo [todo]="todo"
          *ngFor="let todo of todos.data"
          (toggle)="toggleTodo($event)">
</app-todo>
```

Và đoạn mã sau đây thì không:
```
// todos-page.component
<app-todos (toggle)="toggle($event)"></app-todos>
```
### Và giải pháp là
1. Tiếp tục giữ việc chuyển sự kiện lên cây
```
export class TodoComponent {
  @Output() toggle = new EventEmitter<any>();
}

export class TodosComponent {
  @Output() toggle = new EventEmitter<any>();
}

export class TodosPageComponent {
  toggle($event) {}
}
```

Trong ví dụ này, điều đó ổn, nhưng có thể gây khó chịu nếu bạn có các components lồng nhau

2. Sử dụng[ native DOM events](https://davidwalsh.name/customevent)

Bạn có thể tạo native DOM events như sau:
```
@Component({
  selector: 'app-todo',
  template: `
     <p (click)="toggleTodo(todo)">
      {{todo.title}}
     </p>
   `
})
export class TodoComponent {
  @Input() todo;
  constructor(private el: ElementRef) {}

  toggleTodo(todo) {
    this.el.nativeElement
      .dispatchEvent(new CustomEvent('toggle-todo', {
        detail: todo,
        bubbles: true
      }));
  }
}
```

Sự kiện tùy chỉnh được gửi đi bằng cách gọi phương thức `DispatchEven()`. Chúng ta có thể chuyển dữ liệu cho sự kiện của mình bằng thuộc tính `detail`.
```
// todos-page.component
<app-todos [todos]="todos$ | async"
           (toggle-todo)="toggle($event)"></app-todos>
```

![](https://images.viblo.asia/dde2d93b-339e-4570-984d-7ee7acf15fce.gif)

Event bubbling sẽ hoạt động ở đây, nhưng vấn đề với cách tiếp cận này là chúng ta đã bỏ lỡ cơ hội có thể thực thi cả trong môi trường không có DOM như native mobile, native desktop, web worker or server side rendering.

3. Shared Service
```
@Injectable()
export class TodosService {
  private _toggle = new Subject();
  toggle$ = this._toggle.asObservable();

  toggle(todo) {
    this._toggle.next(todo);
  }
}

export class TodoComponent {
  constructor(private todosService: TodosService) {}
  
  toggle(todo) {
    this.todosService.toggle(todo);
  }
}

export class TodosPageComponent {
  constructor(private todosService: TodosService) {
    todosService.toggle$.subscribe(..);
  }
}
```

Chúng ta có thể sử dụng `TodoService` như 1 message bus. Bạn có thể tìm hiểu thêm về cách tiếp cận này từ[ tài liệu](https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service).

Bởi vì EventEmitters là những observables, chúng ta có thể làm một số điều điên rồ với chúng. Giả sử bạn có một button component và bạn cần biết khi người dùng kết thúc nhấn tất cả x nút và sau đó nhận giá trị mới nhất từ nó.

```
@Component({
  selector: 'my-button',
  template: `<button (click)="click()">Click</button>`
})
export class MyButtonComponent {
  @Output() clicked = new EventEmitter();

  click() {
    this.clicked.next(Math.random());
  }
}

@Component({
  template: `<my-button></my-button>
             <my-button></my-button>
             <my-button></my-button>`
})
export class AppComponent {
  @ViewChildren(MyButtonComponent) buttons;
  btns$;
  ngAfterViewInit() {
    const outputs = this.buttons.map(button => button.clicked);
    this.btns$ = Observable.combineLatest(...outputs).subscribe(...)
  }
}
```![](https://images.viblo.asia/c3fe8cbf-51ac-408e-acd1-b6148303a438.gif)

### Tài liệu tham khảo
https://netbasal.com/event-emitters-in-angular-13e84ee8d28c