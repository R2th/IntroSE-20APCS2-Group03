Trong một ứng dụng Angular,  thành phần được hướng theo component.

Có nhiều cách để chia sẻ dữ liệu, giao tiếp giữa các component trong ứng dụng, bài viết này mình sẽ tập trung vào 3 cách đơn giản sau:

1. View child
2. Event Emitter
3. Data service BehaviourSubject

Bắt đầu thôi!

### View child thông qua @Input

Trong ba cách thì sử dụng @Input là cách đơn giản nhất về cách khai báo cũng như sử dụng.

Để để chia sẻ biến hoặc giá trị nào đó từ component cha với component con bên trong, chúng ta có thể sử dụng @Input:

Ở children component: 
Khởi tạo:
```typescript
// children.component.ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-children',
  template: '
  <p>
  Children component
</p>

<span>Message from parent component: {{childMessage}}</span>
  ',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {
	@Input() childMessage: string;

  constructor() { }

  ngOnInit() {
  }
}
```

Thông qua biến @Input childMessage, parent component có thể truyền attribute vào children component.

Ở parent component chỉ việc khai báo:

```typescript
// parent.component.ts
parentMessage: string = "Message from parent";
```

Ở template.html:
```html
	<app-children [childMessage]="parentMessage"></app-children>
```

Vậy là ParentComponent đã có thể truyền attribute tới ChildrenComponent thông qua @Input.

### EventEmitter

Cách thứ 2 là thông qua biến @Output sử dụng EventEmitter:

Event emitter được thiết kế để báo cho component cha khi component con có sự thay đổi.

Thông qua biến @Output, EventEmitter sẽ bắn một value nào đó ra ngoài, và component cha sẽ bắt được value này.

- Ở component con:

```html
<button class="btn btn-primary" (click)="voted()">Click to vote</button>
```

```typescript
  // ...
  @Output() voteSize = new EventEmitter();
  counter: number = 0;

 // ...
 
  voted() {
    this.counter ++;
    this.voteSize.emit(this.counter);
    // Hàm vote sẽ tăng counter lên 1, đồng thời thông qua EventEmitter bắn value counter này ra component cha
  }
  // ...
```

- Ở component cha:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: '
  		<app-children (voteSize)="voteCount($event)"></app-children>
        <h1>Total vote from children: {{vote}}</h1>
',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {

  vote: number = 0;

  constructor() { }

  ngOnInit() {
  }

  voteCount(value) {
    this.vote = value;
  }
}
```

### Data service BehaviourSubject

Data service sử dụng BehaviourSubject (rxjs).

Rxjs hỗ trợ observes (consuming interface) và observables (push interface) (có bài viết đọc khá dễ hiểu, các bạn có thể tham khảo thêm [ở đây](https://viblo.asia/p/rxjs-nhap-mon-oaKYMN1zR83E)).

Ở ví dụ sau mình sử dụng cả 2 interface trên của BehaviourSubject, thông qua hàm ```asObservable()```

```shell
ng generate service services/data
```
File data.service.ts:
```typescript
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();
  // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource

  constructor() { }
 
  // method này để change source message 
  changeMessage(message) {
    this.messageSource.next(message);
  }
}
```

Bây giờ để chia sẻ data giữa các component, chúng ta cần import DataService:

```typescript
import { DataService } from '../services/data.service';
```

Gọi hàm changeMessage để push data:
```typescript
  createMessage(message) {
    this.data.changeMessage(message);
  }
```

Và subcribe vào currentMessage để get data:

```typescript
this.data.currentMessage.subscribe(message => this.message = message);
```

Các bạn có thể clone source code demo các example này tại đây: https://github.com/at-uytran/share-data-example

Như vậy mình vừa trình bày về 3 cách để giao tiếp giữa các component với nhau trong angular.

Hy vọng bài viết có thể giúp ích cho những ai còn thắc mắc hay đang tìm hiểu về cách giao tiếp giữa các component trong angular.

Cảm ơn vì đã ghé đọc bài viết, nếu các bạn có thắc mắc hay góp ý gì hãy để lại comment nhé.