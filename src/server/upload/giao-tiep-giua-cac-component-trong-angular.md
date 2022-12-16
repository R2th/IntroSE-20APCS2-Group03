Khi làm việc với **Angular**, chắc hẳn chúng ta đều tự đặt câu hỏi rằng: *"Các component trong Angular hoạt động như thế nào?"* hay *"Làm thế nào để truyền dữ liệu từ component này sang component khác?"*. Chia sẻ dữ liệu là một cách để các components giao tiếp với nhau trong **Angular**. Trong bài viết này mình sẽ chia sẻ cho các bạn về các cách đó.

![](https://images.viblo.asia/95cbb07f-ebdf-4545-889e-bbf3e06b997c.png)

## Parent to Child: Chia sẻ dữ liệu thông qua Input()
Đây có lẽ là cách truyền dữ liệu phổ biến và dễ nhất. Chúng ta chỉ cần dùng decorator **@Input()** để có thể truyền dữ liệu từ component cha sang component con.
```javascript:parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [childMessage]="parentMessage"></app-child>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  parentMessage: string = 'message from parent';

  constructor() { }
}
```

```javascript:child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    Say {{ message }}
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() childMessage: string;

  constructor() { }
}
```


## Child to Parent: Chia sẻ dữ liệu thông qua ViewChild
**ViewChild** cho phép một component con có thể inject vào một component cha, cho nó quyền truy cập vào các thuộc tính và phương thức mà component con có. Tuy nhiên, muốn truy cập vào các thuộc tính và phương thức này chúng ta phải implement **AfterViewInit** vào trong component cha như một **lifecycle hook** để nhận dữ liệu từ component con.

```javascript:parent.component.ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  template: `
    Message: {{ message }}
    <app-child></app-child>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) child;
  message: string;

  constructor() { }

  ngAfterViewInit() {
    this.message = this.child.message;
  }
}
```

```javascript:child.component.ts
import { Component} from '@angular/core';

@Component({
  selector: 'app-child',
  template: ``,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  message: string = 'Hola Mundo!';

  constructor() { }
}
```

## Child to Parent: Chia sẻ dữ liệu thông qua Output() và EventEmitter
Ở trên chúng ta đã dùng decorator **@Input()** như một cách để truyền dữ liệu từ component cha sang component con. Tương tự như vậy, nếu muốn truyền ngược lại (từ con sang cha) thì chúng ta sẽ sử dụng decorator **Output()**. Tuy nhiên, nó cần đi kèm với một đối tượng được gọi là **EventEmitter**. Cách này thường được dùng trong các trường hợp bạn đang đứng ở component cha và muốn bắt một sự kiện nào đó từ component con. Ví dụ như bắt sự kiện click một button ở component con và cập nhật lại content ở component cha.

```javascript:parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    Message: {{message}}
    <app-child (messageEvent)="receiveMessage($event)"></app-child>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  message: string;

  constructor() { }

  receiveMessage($event) {
    this.message = $event;
  }
}
```

```javascript:child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
      <button (click)="sendMessage()">Send Message</button>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  message: string = 'Hola Mundo!';
  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage() {
    this.messageEvent.emit(this.message);
  }
}
```

## Unrelated Components: Chia sẻ dữ liệu thông qua Service
Đôi khi việc chia sẻ dữ liệu giữa các component không liên quan tới nhau sẽ trở nên khó khăn hơn. Như các component có mối quan hệ sibling hay grandchildren, ... Lúc này chúng ta sẽ phải dùng service để đồng bộ dữ liệu giữa các component. Cách này đòi hỏi bạn phải có chút kiến thức về **RxJS** vì chúng ta sẽ cần dùng tới **RxJS Subject** hoặc **RxJS BehaviorSubject**. Tuy nhiên, chúng ta nên dùng **RxJS BehaviorSubject** thay vì **RxJS Subject** vì một số lý do:
* Nó luôn luôn trả về một giá trị
* Nó có phương thức ***getValue()*** giúp chúng ta có thể lấy ra được giá trị mới nhất
* Nó đảm bảo rằng component sẽ luôn nhận giá trị mới nhất

Trong **DataService** chúng ta khai báo một thuộc tính **BehaviorSubject** để chứa giá trị hiện tại của message. Tiếp đến, chúng ta định nghĩa một biến **currentMessage** để xử lý data stream như một **observable**. Biến này sẽ được sử dụng trong các component để lấy ra giá trị hiện tại của message. Cuối cùng, chúng ta tạo một function để xử lý sự thay đổi của message.

Sau đó, các component sẽ inject **DataService** này và tiến hành lấy ra giá trị message đã được đồng bộ, đồng thời chúng ta cũng có thể thay đổi message bằng cách gọi tới function **changeMessage()** mà ta đã định nghĩa trong service. Và tất nhiên, một khi chúng ta gọi tới function **changeMessage()**, thì message sẽ được cập nhật ở tất cả các component đã được inject **DataService**.

```javascript:data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private messageSource = new BehaviorSubject('Default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
```

```javascript:parent.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-parent',
  template: `
    {{message}}
  `,
  styleUrls: ['./sibling.component.css']
})
export class ParentComponent implements OnInit {
  message:string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }
}
```

```javascript:sibling.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sibling',
  template: `
    {{message}}
    <button (click)="newMessage()">New Message</button>
  `,
  styleUrls: ['./sibling.component.css']
})
export class SiblingComponent implements OnInit {
  message: string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  newMessage() {
    this.data.changeMessage('Hello from Sibling');
  }
}
```

-----
***Tài liệu tham khảo:** https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/*