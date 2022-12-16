# 1 Directives là gì?
Directives là một đối tượng giúp chúng ta dễ dàng thay đổi một đối tượng khác và cách áp dụng rất đơn giản và linh hoạt. Directives có thể hiểu như là các đoạn mã typescript (hoặc javascript) kèm theo cả HTML và khi gọi thì gọi như là HTML luôn. Ví dụ:
```html
<!-- Chỗ này là gọi directive *ngIf để kiểm tra điều kiện if ngay ở html -->
<div *ngIf="time">
  Time: {{ time }}
</div>
```
# 2. Phân loại directives
Từ Angular 2 trở đi, directives được chia làm các loại sau đây:
1. **Components directives**: Không có nghi ngờ gì khi gọi component là directive cũng được, vì rõ ràng là component cho phép định nghĩa selector và gọi ra như một thẻ html tag (**<component-name></component-name>**)
2. **Structural directives**: Là directive cấu trúc, dùng để vẽ html, hiển thị data lên giao diện html, và thay đổi cấu trúc DOM bằng việc thêm bớt các phần tử trong DOM. Các structural directive thường có dấu '**\***' ở trước của directive. Ví dụ **\*ngFor**, **\*ngIf**
3. **Attribute directives**: Thay đổi giao diện, tương tác của các đối tượng hoặc thay đổi directive khác hoặc thêm các thuộc tính động cho element html. ví dụ **\*ngStyle**
# 3. Components directives
Components directives được sử dụng rất phổ biến , bạn có xem tại đây [Components directives](https://angular.io/start). Sau đây, mình sẽ trình bày ngắn gọn về directives này.

Components là một khối code trong app Angular. Nó là sự kết hợp của bộ template html (bộ khung html) và nhúng kèm code TypeScript (hoặc Javascript). Các components là độc lập với nhau và độc lập với hệ thống. Nó có thể được cài vào hoặc tháo ra khỏi hệ thống dễ dàng. Một component có thể hiểu như một control trên màn hình hiển thị, gồm giao diện html và code logic xử lý sự kiện đi kèm control đó. Một component cũng có thể to lớn như là cả 1 màn hình chứa nhiều control hoặc một nhóm nhiều màn hình. Tức là là một component cũng có thể chứa và gọi được nhiều component khác nối vào. Như vậy Angular rất linh hoạt trong việc chia nhỏ code ra các component.

Trong Angular chúng ta khai báo một Component với cấu trúc như sau:
```ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-hello-world',
  template: `<h1>Hello Angular world</h1>`
})
export class HelloWorld { 
}
```
Như chúng ta thấy từ khóa @Component sẽ giúp định nghĩa ra một bộ khung html cho nó. Và bên dưới là một class HelloWorld dùng để viết code logic. Trong định nghĩa bộ khung html, chúng ta có một số thuộc tính cần chú ý sau đây:
* **selector** : Là tên được đặt để gọi một component trong code html. Ở ví dụ vừa rồi, từ khóa **app-hello-world** được đặt tên cho component này. Khi cần gọi component này ra ở màn hình html cha, ta sẽ gọi bằng html tag **<app-hello-world></app-hello-world>**. Gọi như vậy thì component con sẽ được render ra component cha.
* **template** : Là tự định nghĩa khung html cho component dạng string ở trong file này luôn. Ví dụ ở trên chỉ định nghĩa một thẻ html h1 đơn giản. Cách này chỉ dùng cho component đơn giản.
* **templateUrl** : Là đường dẫn url tới file html bên ngoài để load file đó vào làm khung html cho component này. Đây là cách code hay được dùng vì cho phép tách riêng khung html ra khỏi code logic, người làm design sẽ sửa file html riêng, độc lập với người làm code.
* **styles** : Là viết style css luôn vào file component này. Cách này chỉ dùng cho component đơn giản.
* **styleUrls** : Là đường dẫn url đến file style css độc lập cho component này. Cách này khuyên dùng vì file css nên để dành riêng cho người designer đụng vào.
# 4. Structural directives
Sau đây, mình sẽ trình bày một vài structural directives cơ bản và thông dụng. Ngoài ra bạn có thể tham khảo và xem chi tiết tại đây [Stuctural directives](https://angular.io/guide/structural-directives)

## 4.1 Ng-if… else
Có tác dụng kiểm tra điều kiện ngay ở html. Ví dụ:
```html
<div *ngIf="time; else noTime">
  Time: {{time}}
</div>
<ng-template #noTime> No time. </ng-template>
```
Code ở trên, khi biến time có giá trị, thì chuỗi Time: [value] được show ra. Và cục #noTime template bị ẩn đi, ngược lại thì điều kiện else được chạy và #noTime được hiện ra.

Như ta thấy dùng cái directive ngIf else này rất tiện lợi khi có thể ẩn hiện html dễ dàng.
## 4.2 Ng-Template
Nó giúp gom cục html cần ẩn hiện.
```html
<div *ngIf="isTrue; then tmplWhenTrue else tmplWhenFalse"></div>
<ng-template #tmplWhenTrue >I show-up when isTrue is true. </ng-template>
<ng-template #tmplWhenFalse > I show-up when isTrue is false </ng-template>
```
Cách viết này đầy đủ hơn của 4.1 Ng-if… else
## 4.3 Ng-Container
Tương tự như **Ng-Template** dùng để gom html. Nhưng điểm mạnh của **Ng-Container** là thẻ directive này không render ra tag **<ng-container\>** html như là **<ng-template\>** mà tag sẽ được ẩn đi, giúp cho layout css không bị vỡ nếu bạn gom html (Không sợ bị nhảy từ div cha sang div con, cấu trúc html không hề thay đổi khi gom vào tag  **<ng-container></ng-container>**)

Xét ví dụ sau:

```html
Welcome <div *ngIf="title">to <i>the</i> {{title}} world.</div>
```
Sẽ được render ra như sau:

![](https://images.viblo.asia/01e013fa-2936-4ace-8b5c-bde8a502b33c.png)

Khi soi html chúng ta sẽ thấy:

![](https://images.viblo.asia/8c96f0ec-a122-4288-b5e6-537d3fefa3f3.png)

Tự dưng dòng div có ngIf nó lại chèn một cái thuộc tính \_ngcontent-c0, dẫn đến dòng đó bị xuống dòng, làm sai layout design.

Bây giờ hãy viết lại như sau:
```html
Welcome <ng-container *ngIf="title">to <i>the</i> {{title}} world.</ng-container>
```
Kết quả sẽ thật đẹp ngay:

![](https://images.viblo.asia/fdd341e2-a545-47f4-9548-f2e027d28286.png)

Đó là vì html đã được dọn gọn gàng:

![](https://images.viblo.asia/42435ccd-5905-4e32-9b09-c25a30d5b4d0.png)

## 4.4 NgSwitch and NgSwitchCase
Chúng ta hoàn toàn có thể sử dụng câu lệnh điều kiện switch case trong Angular y như switch case trong Javascript vậy.
```html
<div [ngSwitch]="isMetric">
  <div *ngSwitchCase="true">Degree Celsius</div>
  <div *ngSwitchCase="false">Fahrenheit</div>
  <div *ngSwitchDefault>Default </div>
</div>
```

**\*ngSwitchDefault** Trong trường hợp muốn dùng switch case default (nếu toàn bộ case k thỏa màn thì vào default).
# 5. Attribute directive
Được dùng như một thuộc tính của đối tượng, cho nên khi build thì directive và các thuộc tính thông thường khác được build cùng một lúc dẫn đến dự thay đổi của directive là đồng thời khi render đối tượng đó.

## 5.1 Xây dựng một attributes directive đơn giản.
Implement cho directive. Chúng ta có thể sử dụng CLI command để tạo ra đối tượng directive.
```
ng generate directive highlight
```

CLI sẽ tạo ra file src/app/highlight.directive.ts và khai báo nó trong AppModule Cấu trúc của file src/app/highlight.directive.ts
```ts
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor() { }
}
```
Một attribute directive cần requires decorate class đối tượng Directive của angular bằng các dùng @Directive trước class. Ví dụ ở trên đây là HighlightDirective mục đích sẽ làm thay đổi màu background của đối tượng khi người dùng hover qua nó.

Import định danh Directive để sử dụng nó decorate cho đối tượng trong angular. Gọi @Directive trước class HighlightDirective là để sư dụng decorate, khi sử dùng chúng ta cần khai báo tên selector để sử dụng như một thuộc tính, [appHighlight] dấu ([]) là cách mà angular hiểu nó là một thuộc tính, Khi biên dịch mà thấy phần tử nào có thuộc tính có tên là appHighlight sẽ được áp dụng thay đổi bởi directive. (Sau khi sử dụng @Directive, đừng quên export class HighlightDirective để có thể import và sử dụng.)

Bây giờ chúng ta hãy implement cho cho HighlightDirective để làm thay đổi màu background:
```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```
ElementRef là Class trong thư viện của angular. Chúng ta dùng ElementRef trong hàm construct để inject nó tham chiếu đến các phần tử DOM trong component hiện tại. Sau đó chi cần gọi thuộc tính ElementRef để lấy về đối tượng DOM để thay đổi style background sang mày vàng.
## 5.2 Áp dụng attribute directive
Để dùng HighlightDirective, ta thêm thẻ như sau:
```html
<p appHighlight>Highlight me!</p>
```
## 5.3 Tương tác directive với người dùng
Hiện tại appHighlight chỉ set màu cố dịnh cho background, chưa hề có sự linh hoạt và tương tác nào. Chúng ta sẽ implement nó để thay đổi màu cho các sự kiện chuột và người dùng hành động. Trước tiên cần import HostListener.
```ts
import { Directive, ElementRef, HostListener } from '@angular/core';
```
Tiếp theo là thêm hàm xử lý khi sự kiện xảy ra bằng cách dử dụng Decorator HostListener.
```ts
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}

@HostListener('mouseleave') onMouseLeave() {
  this.highlight(null);
}

private highlight(color: string) {
  this.el.nativeElement.style.backgroundColor = color;
}
```
@HostListener decorator sẽ theo dõi và bắt các sự kiện của phần tử trong DOM mà có dử dụng directive appHighlight Hàm highlight sẽ thay đổi background color theo màu được truyền vào tham số, nên trong các hàm xử lý chỉ cần gọi tới highlight với tham số là màu cần hiển thị. Chạy và kiểm tra kêt quả nhé.
## 5.4 Truyền dữ liệu vào directive thông qua Input
Hiện tại các màu cho các sự kiện vẫn là cố định, sử dụng ở đâu thì các màu vẫn vậy . Để tạo nên tính linh hoạt cho directive chúng ta sẽ truyền các màu vào cho nó. Đầu tiên cần import Input:
```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
```
Sử dụng decorator cho biến highlightColor.
```ts
@Input() highlightColor: string;
```
Sử dụng kết hợp appHighlight và input binding cho đối tượng.
```html
<p appHighlight highlightColor="yellow">Highlighted in yellow</p>
<p appHighlight [highlightColor]="'orange'">Highlighted in orange</p>
```
Đó là cách sử dụng ban đầu, nhưng directive đã được cải thiện để rút ngắn code và thuận tiện hơn bằng cách sử dụng director như một thuộc tính (đây là lý do vì sao selector của nó có dấu [])
```html
<p [appHighlight]="color">Highlight me!</p>
```
Thuộc tính [appHighlight] là sự kết hợp của highlighting directive và set àu cho biến appHighlight Chúng ta cũng có thể đổi tên cho biến nếu không muốn đặt tên biến là appHighlight theo selector
```ts
@Input('appHighlight') highlightColor: string;
```
Chúng ta cũng hoàn toàn có thể kết hợp cách trên với input binding thông thường.
```html
<p [appHighlight]="color" defaultColor="violet">
  Highlight me too!
</p>
```
```ts
@Input() defaultColor: string;
```
Angular sẽ tự hiểu bạn binding defaultColor cho HighlightDirective vì bạn đã khai báo decorator Input cho nó. binding thêm một defaultColor thông qua input để làm màu mặc định. trong hàm xử lý cho sự kiện chuột thay đổi như sau:
```ts
@HostListener('mouseenter') onMouseEnter() {
  this.highlight(this.highlightColor || this.defaultColor || 'red');
}
```
## 5.5 Hoàn thiện ứng dụng đơn giả này.
Update file app.component.html:
```html
<h1>My First Attribute Directive</h1>

<h4>Pick a highlight color</h4>
<div>
  <input type="radio" name="colors" (click)="color='lightgreen'">Green
  <input type="radio" name="colors" (click)="color='yellow'">Yellow
  <input type="radio" name="colors" (click)="color='cyan'">Cyan
</div>
<p [appHighlight]="color">Highlight me!</p
```
File src/app/app.component.ts:
```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  color: string;

  constructor(private el: ElementRef) { }

  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```
# Kết luận
Bài tìm hiểu về **Directives** của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn trong quá trình tìm hiểu cũng như đang làm về **Angular**. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn
# Tài liệu tham khảo
https://angular.io/start

https://angular.io/guide/structural-directives

https://angular.io/guide/attribute-directives