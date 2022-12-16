Trong bài viết này, mình sẽ gửi đến mọi người 1 tính năng vô cùng hữu ích trong Angular mà chúng ta rất hay dùng, đó là **properties binding**. Vậy nó là gì?

P/s: Bài viết được tham khảo từ [nguồn](https://www.telerik.com/blogs/understanding-angular-property-binding-and-interpolation).

Việc hiểu các loại **data binding** trong **Angular** là bước quan trọng để xây dựng nên 1 ứng dụng  Angular. Khi xây dựng, bạn sẽ thường xuyên gặp bộ đôi chuyên trị việc hiển thị data trong view là  **Properties binding** và **Interpolation -** hỗ trợ chuyển dữ liệu từ **component ra view**.

**Data binding** là 1 kĩ thuật quan trọng và mạnh mẽ trong khía cạnh phát triển ứng dụng. Nó hỗ trợ tương tác giữa component và view riêng của nó. Giúp ứng dụng của chúng ta trở nên linh hoạt hơn.

Thôi lý thuyết dài dòng vậy là đủ. Vô phần chính luôn, trong Angular có 4 dạng chính data binding:

1. **Event binding**
2. **Two-way data binding**
3. **Interpolation**
4. **Property binding**

Đầu tiên là **Event binding**: dạng này sẽ **kích hoạt event** từ **view sang component**. View sẽ gửi dữ liệu từ 1 event, chẳng hạn khi ta click vào button để cập nhật giá trị trong component. Nó sẽ **ngược** so với **property binding** - từ **component sang view**.
<br>Các bạn xem chi tiết ở ví dụ sau:
```html
// component.html

    <p>My name is {{name}}</p>
    <button (click)="updateName()">Update button</button>
```

```ts
// component.ts

    @Component({
      templateUrl: 'component.html',
      selector: 'app-component',
    })
    export class Component {
      name = 'Peter';

      updateName() {
        this.name = 'John';
      }
    }
```

Kế tiếp, chúng ta sẽ tìm hiểu về **Two-way data binding**: với dạng binding này thì luồng dữ liệu sẽ **đi 2 chiều** từ component sang view và ngược lại. Component và view sẽ được đồng bộ tức thì khi có thay đổi từ 1 trong 2 phía. Dạng này thường dùng trong form để cập nhật giá trị khi người dùng nhập vào.

**Interpolation**<br>
Dạng này sẽ được nói tới trong phần này. Trong kĩ thuật này, **biến đại diện trong component** được đặt giữa cặp dấu **{{ }} (curly brace)**  của view. Angular sẽ tìm đến **biến** trùng với **text trong view** chúng ta và **thay thế cái text này bằng giá trị mà đang gán tới biến**. Các biến dạng số, chuỗi đều có đặt vào giữa cặp {{ }}.
```html
   //component.html
    
    <p>{{ name }}</p> 
```

```ts
    // component.ts
    
    @Component({
      templateUrl: 'component.html',
      selector: 'app-component',
    })
    export class Component {
      name = 'Peter';
    }
```

**Property binding**
Cơ chế binding này giúp bạn thiết lập các thuộc tính cho element trong view. Cập nhật giá trị của 1 thuộc tính trong view và binding nó đến 1 element. **Cú pháp:** **[]**. Sau đây là một ví dụ về thiết lập thuộc tính disabled qua property binding cho 1 button:
```html
// component.html
    
    <button [disabled]="buttonDisabled"></button>
```

```ts
    // component.ts
    @Component({
      templateUrl: 'component.html',
      selector: 'app-component',
    })
    export class Component {
      buttonDisabled = true;
    }

```
Bài viết sau, chúng ta sẽ tìm hiểu chi tiết hơn về **String Interpolation** cũng như các ví dụ về **Property binding** hoặc thêm khảo thêm tại [đây](https://www.telerik.com/blogs/understanding-angular-property-binding-and-interpolation).