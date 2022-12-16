Khi tôi đọc  tài liệu về làm việc với DOM trong Angular tôi tìm thấy một hoặc vài trong số các đối tượng sau: ElementRef, TemplateRef, ViewContainerRef. Mặc dù một số trong số chúng được giới thiệu trong doc của angular hoặc trong các bài viết trên mạng, nhưng tôi vẫn chưa tìm thấy mô tả một cách tổng thể về mô hình và các ví dụ về cách chúng hoạt động cùng nhau. Bài viết này tôi sẽ trình bày điều này.

Nếu bạn đã biết đến angular.js, bạn biết rằng nó đã được thực hiện để khá dễ dàng để thao tác các DOM. Bạn có thể truy vấn bất kỳ nút nào trong các template , thêm hoặc xóa các nút con, sửa đổi các kiểu vv Tuy nhiên, cách tiếp cận này có một thiếu sót lớn - nó bị ràng buộc chặt chẽ với nền tảng trình duyệt.

Phiên bản Angular mới chạy trên các nền tảng khác nhau  trong trình duyệt, trên nền tảng di động hoặc trên một web worker. Vì vậy, cần một lớp abtract để đứng giữa API và các giao diện của framework. Trong Angular, những lớp trừu tượng này bao gồm các thành phần: `ElementRef`, `TemplateRef`, `ViewRef`, `ComponentRef` và `ViewContainerRef`. Trong bài này chúng ta sẽ xem xét từng thành phần cụ thể và cho biết cách chúng có thể được sử dụng để thao tác DOM.

1. **@ViewChild**

Trước khi chúng ta khám phá thành phần  DOM, chúng ta hãy hiểu cách truy cập các thành phần bên trong một component hoặc directive class. Angular cung cấp cơ chế được gọi là truy vấn DOM. Nó có trong phương thức của @ViewChild và @ViewChildren . Chúng hoạt động giống nhau, chỉ có @ViewChild  trả về một đối tượng, trong khi @ViewChildren trả về nhiều đối tượng như là một QueryList. Trong bài viết này trong ví dụ tôi sẽ sử dụng chủ yếu là decorator ViewChild và sẽ không sử dụng @ biểu tượng trước khi nó.

Thông thường, các decorator làm việc theo cặp với các biến reference template. Một biến reference template chỉ đơn giản là một tham chiếu có tên cho một phần tử DOM trong một template. Bạn có thể xem nó như một cái gì đó tương tự như thuộc tính id của một phần tử html. Bạn đánh dấu một phần tử DOM với reference template và sau đó truy vấn nó bên trong một lớp bằng cách sử dụng decorate ViewChild. Dưới đây là ví dụ cơ bản:

```
@Component({
    selector: 'sample',
    template: `
        <span #tref>I am span</span>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("tref", {read: ElementRef}) tref: ElementRef;

    ngAfterViewInit(): void {
        // outputs `I am span`
        console.log(this.tref.nativeElement.textContent);
    }
}
```

Cú pháp cơ bản decorator ViewChild là như sau:

```
@ViewChild([reference from template], {read: [reference type]});
```

Trong ví dụ này bạn có thể thấy rằng tôi đã chỉ định `tref` như là một reference template tên trong html và nhận được ElementRef liên kết với phần tử này. Thông số thứ hai được đọc không phải lúc nào cũng cần thiết vì Angular có thể suy diễn kiểu tham chiếu theo loại phần tử DOM. Ví dụ, nếu đó là một phần tử html đơn giản như span, Angular sẽ trả về ElementRef. Nếu đó là một template, nó trả về TemplateRef. Một số tham chiếu, như ViewContainerRef không thể suy luận và phải được yêu cầu cụ thể trong tham số đọc. Còn ViewRef không thể được trả lại từ DOM và phải được xây dựng bằng tay.

Được rồi, bây giờ chúng ta biết làm thế nào để truy vấn các tham chiếu, chúng ta hãy bắt đầu khám phá chúng.

2. **ElementRef**

Đây là `view` cơ bản nhất. Nếu bạn quan sát cấu trúc lớp, bạn sẽ thấy rằng nó chỉ giữ nguyên các phần tử cơ bản liên kết với nó. Nó rất hữu ích cho việc truy cập vào phần tử DOM nguyên bản như chúng ta có thể thấy ở đây:

```
// outputs `I am span`
console.log(this.tref.nativeElement.textContent);
```

Tuy nhiên, sử dụng như vậy sẽ làm `nản lòng`  đội Angular. Không chỉ nó gây ra nguy cơ về bảo mật mà nó còn tạo ra sự kết hợp  giữa ứng dụng của bạn và các lớp khác không chặt chẽ khiến cho việc chạy ứng dụng trên nhiều nền tảng rất khó khăn. Tôi tin rằng nó không phải là truy cập native  làm phá vỡ cấu trúc, mà là việc sử dụng DOM cụ thể như textContent.

ElementRef có thể được trả về cho bất kỳ phần tử DOM nào sử dụng decorate ViewChild. Nhưng vì tất cả các thành phần được lưu trữ bên trong một phần tử DOM tùy chỉnh và tất cả các directive được áp dụng cho các phần tử DOM, các lớp thành phần và directive có thể có được một cá thể của ElementRef liên kết với phần tử lưu trữ của chúng thông qua cơ chế DI:

```
@Component({
    selector: 'sample',
    ...
export class SampleComponent{
    constructor(private hostElement: ElementRef) {
        //outputs <sample>...</sample>
        console.log(this.hostElement.nativeElement.outerHTML);
    }
```

Vì vậy, mặc dù một thành phần có thể truy cập vào phần tử lưu trữ thông qua DI, decorate ViewChild được sử dụng thường xuyên nhất để lấy tham chiếu đến một phần tử DOM trong view của chúng. Và đó là câu đối phó với các directive - họ không có quan điểm và họ thường làm việc trực tiếp với yếu tố mà họ gắn liền.

3. **TemplateRef**

Khái niệm về template đã  quen thuộc với hầu hết các nhà phát triển web. Đó là một nhóm các phần tử DOM được sử dụng lại trong chế độ xem trên toàn bộ ứng dụng. Trước khi thẻ mẫu HTML5 giới thiệu bản tiêu chuẩn, hầu hết các template được đưa đến trình duyệt được bao bọc trong thẻ script với một số biến thể của thuộc tính type:

```
<script id="tpl" type="text/template">
  <span>I am span in template</span>
</script>
```

Cách tiếp cận này chắc chắn có nhiều nhược điểm như ngữ nghĩa và sự cần thiết phải tự tạo các mô hình DOM. Với thẻ template trình duyệt sẽ phân tách html và tạo ra cây DOM nhưng không hiển thị nó. Sau đó, nó có thể được truy cập thông qua thuộc tính `content`:

```
<script>
    let tpl = document.querySelector('#tpl');
    let container = document.querySelector('.insert-after-me');
    insertAfter(container, tpl.content);
</script>
<div class="insert-after-me"></div>
<ng-template id="tpl">
    <span>I am span in template</span>
</ng-template>
```

Angular bao gồm cách tiếp cận này và thực hiện lớp TemplateRef để làm việc với một template. Đây là cách nó có thể được sử dụng:

```
@Component({
    selector: 'sample',
    template: `
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("tpl") tpl: TemplateRef<any>;

    ngAfterViewInit() {
        let elementRef = this.tpl.elementRef;
        // outputs `template bindings={}`
        console.log(elementRef.nativeElement.textContent);
    }
}
```

Khung này loại bỏ template khỏi DOM và chèn một nhận xét vào vị trí của nó. Đây là cách nó được hiển thị như sau:

```
<sample>
    <!--template bindings={}-->
</sample>
```

Bản thân lớp TemplateRef là một lớp đơn giản. Nó giữ một tham chiếu đến phần tử máy chủ lưu trữ của nó trong thuộc tính elementRef và có một phương pháp createEmbeddedView. Tuy nhiên, phương pháp này rất hữu ích vì nó cho phép chúng ta tạo ra một view và trả về một tham chiếu cho nó như ViewRef.

4. **ViewRef**

Lớp này thể hiện một Angular view. Trong Angular một View là một khối xây dựng cơ bản của UI ứng dụng. Nó là nhóm nhỏ nhất của các yếu tố được tạo ra và bị destroy cùng nhau. Triết lý Angular khuyến khích các nhà phát triển xem giao diện người dùng như là một thành phần của Chế độ xem, chứ không phải là một cây các thẻ html độc lập.

Angular hỗ trợ hai loại chế độ xem:

* Embedded Views được liên kết với một template
* Host Views được liên kết với một Component

5. **Creating embedded view**

Một template đơn giản chỉ giữ một kế hoạch chi tiết cho một `view`. Một `view` có thể được khởi tạo từ template bằng cách sử dụng phương pháp createEmbeddedView nói trên như sau:

```
ngAfterViewInit() {
    let view = this.tpl.createEmbeddedView(null);
}
```

6. **Creating host view**

Sự linh động về `view` là cần thiết , nên cần có một component đa dạng về cách thể hiện. Một đối tượng để tạo sự linh động đó là ComponentFactoryResolver:

```
constructor(private injector: Injector,
            private r: ComponentFactoryResolver) {
    let factory = this.r.resolveComponentFactory(ColorComponent);
    let componentRef = factory.create(injector);
    let view = componentRef.hostView;
}
```

Trong Angular, mỗi thành phần được ràng buộc với một đối tượng injector, vì vậy chúng ta đang truyền injector hiện để khởi tạo đối tượng. Ngoài ra, đừng quên rằng các đối tượng được khởi tạo dynamically phải được thêm vào `EntryComponents` của module hoặc đối tượng cha.

Vì vậy, chúng tôi đã thấy cách cả lượt xem được nhúng và máy chủ lưu trữ có thể được tạo ra. Khi một view được tạo ra, nó có thể được chèn vào DOM sử dụng ViewContainer. Phần tiếp theo khám phá tính năng của nó.

7. **ViewContainerRef**

Đối tượng hiển thị tập hợp các `view`. Điều đầu tiên cần đề cập đến ở đây là bất kỳ phần tử DOM nào cũng có thể được sử dụng làm vùng chứa các `view`. Điều thú vị là Angular không chèn `view` vào bên trong phần tử, nhưng nối chúng sau khi phần tử ViewContainer mà nó nằm trong. Điều này tương tự như cách các thành phần chèn bộ định tuyến của router-outlet.

Thông thường, một ứng cử viên tốt để đánh dấu một nơi mà một ViewContainer nên được tạo ra là thành phần ng-container. Nó được hiển thị như là một comment và vì vậy nó không đưa các phần tử html dự phòng vào DOM. Dưới đây là ví dụ về việc tạo một ViewContainer tại địa điểm cụ thể trong một template:

```
@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container #vc></ng-container>
        <span>I am last span</span>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;

    ngAfterViewInit(): void {
        // outputs `template bindings={}`
        console.log(this.vc.element.nativeElement.textContent);
    }
}
```

Cũng như các thành phần DOM khác, ViewContainer bị ràng buộc vào một phần tử DOM cụ thể được truy cập thông qua thuộc tính phần tử. Trong ví dụ về nó ràng buộc với phần tử `ng-container` được hiển thị dưới dạng chú thích, và vì vậy đầu ra là template bindings = {}.

8. **Manipulating views**

ViewContainer cung cấp một API thuận tiện cho thao tác các view:

```
class ViewContainerRef {
    ...
    clear() : void
    insert(viewRef: ViewRef, index?: number) : ViewRef
    get(index: number) : ViewRef
    indexOf(viewRef: ViewRef) : number
    detach(index?: number) : ViewRef
    move(viewRef: ViewRef, currentIndex: number) : ViewRef
}
```

Chúng ta đã thấy trước cách hai loại chế độ xem có thể được tạo theo cách thủ công từ một mẫu và một thành phần. Một khi chúng ta có một cái nhìn, chúng ta có thể chèn nó vào một DOM bằng cách sử dụng phương pháp chèn. Vì vậy, dưới đây là ví dụ về việc tạo một view được nhúng từ một template và chèn nó vào một vị trí đặc biệt được đánh dấu bằng phần tử ng-container:

```
@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container #vc></ng-container>
        <span>I am last span</span>
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent implements AfterViewInit {
    @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
    @ViewChild("tpl") tpl: TemplateRef<any>;

    ngAfterViewInit() {
        let view = this.tpl.createEmbeddedView(null);
        this.vc.insert(view);
    }
}
```

Với cách thực hiện này, html kết quả sẽ như sau:

```
<sample>
    <span>I am first span</span>
    <!--template bindings={}-->
    <span>I am span in template</span>

    <span>I am last span</span>
    <!--template bindings={}-->
</sample>
```

Để loại bỏ một `view` chúng ta có thể sử dụng phương pháp tách. Tất cả các phương pháp đều tham chiếu đến element bằng index , sau đó có thể di chuyển hoặc xóa nó đi.

9. **Creating Views**

ViewContainer cũng cung cấp API để tạo chế độ xem một cách tự động:

```
class ViewContainerRef {
    element: ElementRef
    length: number

    createComponent(componentFactory...): ComponentRef<C>
    createEmbeddedView(templateRef...): EmbeddedViewRef<C>
    ...
}
```

Đây chỉ đơn giản là tiện ích đóng gói thuận tiện cho những gì chúng ta đã thực hiện bằng tay ở trên. Chúng tạo ra một `view` từ một templatehoặc một thành phần và chèn nó vào vị trí xác định.

10. **ngTemplateOutlet**

Nó đánh dấu một phần tử DOM như một ViewContainer và chèn một `view` nhúng được tạo bởi một template trong đó mà không cần phải làm điều này một cách rõ ràng trong lớp thành phần. Điều này có nghĩa là: ví dụ ở trên nơi chúng ta tạo ra chế độ xem và chèn nó vào thành phần `#vc` DOM có thể được viết lại như sau:

```
@Component({
    selector: 'sample',
    template: `
        <span>I am first span</span>
        <ng-container [ngTemplateOutlet]="tpl"></ng-container>
        <span>I am last span</span>
        <ng-template #tpl>
            <span>I am span in template</span>
        </ng-template>
    `
})
export class SampleComponent {}
```

Như bạn thấy, chúng ta không sử dụng mã hiển thị  trong lớp thành phần. Rất tiện dụng.

11. **ngComponentOutlet**

Nó tương tự như ngTemplateOutlet với sự khác biệt mà nó tạo ra một view host (instantiates một thành phần) chứ không phải là một view được nhúng. Và bạn có thể sử dụng nó như thế này:

```
<ng-container *ngComponentOutlet="ColorComponent"></ng-container>
```

Trên đây là bài tìm hiểu của mình về các kỹ thuật thao tác DOM trong Angular, mong nhận nhân sự góp ý của mọi người.:)