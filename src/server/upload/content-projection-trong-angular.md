Trong bài viết này mình xin phép chia sẻ đôi chút về `Content Projection` trong `Angular`.

`Content projection` cho phép bạn có thế chèn một ảnh của DOM trong `component` của bạn. Nói đơn giản thì, bạn nếu bạn muốn chèn các phần tử HTML hoặc các `component` vào một `component`, để thực hiện việc này thì bạn cần sử dụng đến `content projection`.  Trong Angular thì bạn có thể sử sụng `< ng-content></ng-content>`.
 Chúng ta có một component **GreetComponent** sau
 
 ```typescript
 import { Component } from '@angular/core';
@Component({
    selector: 'greet',
    template: `{{message}}`
})
export class GreetComponent {
    message: string = "Hello There !"
}
```
Bây giờ nếu chúng ta muốn sử dụng **GreetComponent** trong một `component` khác và in ra một thông điệp chòa mừng thì chúng ta sẽ sử dụng **@Input** . Theo các này thì một **GreetComponent** được sửa đổi giống như sau:

```typescript

import { Component, Input } from '@angular/core';
@Component({
    selector: 'greet',
    template: `{{message}}`
})
export class GreetComponent {
    @Input() message: string;
}
```

**@Input** có thể giúp chúng ta truyền vào một chuỗi đơn giản dễ dàng, nhưng với các loại dữ liệu khác thì sao?? Ví dụ:
1. Inner HTML
2. HTML Elements
3. Styled HTML
4. Another Component, etc.

Khi này chúng ta hãy nghĩ ngay đến `<ng-content></ng-content>` và ta có đoạn code sửa đổi như sau:
```typescript

import { Component, Input } from '@angular/core';
@Component({
    selector: 'greet',
    template: `
    <div class="container">
        <ng-content></ng-content>
    </div>
    `
})
export class GreetComponent {
}
```
Bây giờ chúng ta hãy tham chiếu **GreetComponent** ở **AppComponent** nhé:

```typescript

import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    template: `
    <div>
        <greet>
            <h3>Say Hi!</h3>
        </greet>
    </div>
    `
})
export class AppComponent {
}
```

Content Projection trong Angular còn khác nhiều phần nữa nhưng trong bài viết này mình mới nói đến **@Input** và `<ng-content></ng-content>` thôi. Hẹn các bạn tại bài viết tiếp theo.