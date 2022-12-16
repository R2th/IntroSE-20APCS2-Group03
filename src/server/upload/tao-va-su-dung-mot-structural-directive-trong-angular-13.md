**Structural directives** có nhiệm vụ thay đổi bố cục DOM bằng cách thêm và xóa các phần tử DOM .<br>
DOM trong Javascript là viết tắt của chữ **Document Object Model**, dịch tạm ra là mô hình các đối tượng trong tài liệu HTML.<br>
Thông qua mô hình DOM ta có thể truy xuất đến các thẻ HTML một cách dễ dàng.(Các bạn có thể tìm hiểu thêm về DOM trên mạng nhé) .<br>
Angular đã cung cấp một tập hợp các **structural directives** được tích hợp sẵn (chẳng hạn như **NgIf**, **NgForOf**, **NgSwitch** và những thứ khác) thường được sử dụng trong tất cả các dự án Angular.<br>
Khi các **structural directives** được áp dụng, chúng thường được bắt đầu bằng dấu hoa thị, * , chẳng hạn như * ngIf.<br>

### Creating a structural directive
Phần này chúng ta sẽ tạo một **UnlessDirective**,  directive này có nhiệm vụ hiển thị hoặc ẩn một đoạn văn bản dựa vào giá trị của thuộc tính **condition** trong  **AppComponent**.<br>
**UnlessDirective** thì hoạt động ngược lại với **NgIf** và các giá trị của thuộc tính **condition** có thể được đặt thành **true** hoặc **false**. **UnlessDirective** sẽ hiển thị nội dung khi **condition** là **false**.
1. Đầu tiên chúng ta sử dụng command bên dưới để tạo một structural directive với tên là **unless** <br>
```Javascript
ng generate directive unless
```
2.Tiếp tục import **Input**, **TemplateRef**, và **ViewContainerRef**.<br>
**src/app/unless.directive.ts** <br>
```Javascript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
}
```

3.Chèn **TemplateRef** và **ViewContainerRef** trong hàm tạo chỉ thị dưới dạng các biến private.<br>
**src/app/unless.directive.ts**<br>
```Javascript
constructor(
  private templateRef: TemplateRef<any>,
  private viewContainer: ViewContainerRef) { }
```
TemplateRef giúp bạn truy cập nội dung <ng-template> và ViewContainerRef truy cập vùng chứa chế độ xem.<br>

4.Thêm thuộc tính appUnless @Input () bằng một setter.<br>
**src/app/unless.directive.ts**
```Javascript
@Input() set appUnless(condition: boolean) {
  if (!condition && !this.hasView) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  } else if (condition && this.hasView) {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
```
Angular đặt thuộc tính **appUnless** bất cứ khi nào giá trị của điều kiện thay đổi.<br>
    - Nếu **condition** là false và Angular chưa tạo chế độ xem trước đó, bộ thiết lập viewContainer sẽ tạo chế độ xem nhúng(createEmbeddedView ) từ template<br>
    - Nếu **condition** là true và chế độ xem hiện đang được hiển thị, bộ thiết lập sẽ xóa vùng chứa, loại bỏ chế độ xem<br>

Cập nhật code đầy đủ như sau:<br>
**src/app/unless.directive.ts**<br>
```Javascript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```
**Testing the directive**

1.Cập nhật code file **src/app/app.component.ts**<br>
Thêm một **condition**  được đặt thành false trong AppComponent.<br>
```Javascript
condition = false;
```
2.Cập nhật template để sử dụng directive. Ở đây,  appUnless nằm trên hai thẻ \<p\> có giá trị **condition**  đối lập, một **true** và một **false**.<br>
**src/app/app.component.html**<br>
```Javascript
<p *appUnless="condition" class="unless a">
  (A) This paragraph is displayed because the condition is false.
</p>

<p *appUnless="!condition" class="unless b">
  (B) Although the condition is true,
  this paragraph is displayed because appUnless is set to false.
</p>
```
Dấu * ở trước  **appUnless**  để thể hiện **appUnless** như một structural directive<br>
Khi **condition**  false, đoạn trên cùng (A) xuất hiện và đoạn (B) dưới cùng biến mất.<br>
Khi **condition**  là true, đoạn trên cùng (A) biến mất và đoạn (B) dưới cùng xuất hiện.<br>
    
Bài chia sẻ đến đấy là kết thúc, hy vọng bài viết hữu ích cho bạn!