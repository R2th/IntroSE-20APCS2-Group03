### What are structural directives?
Trong Angular có 3 loại directive :
 1. Component - directive cùng với template
 2. Structural directives - thay đổi  DOM layout by thêm và xóa DOM element.
 3. Attribute directives - thay đổi giao diện hoặc hành vi của một element, component, hoặc another directive.
 
- Các **structural directives**  chịu trách nhiệm vè layout HTML. Chúng định định hình hoặc định hình lại cấu trúc của DOM, thường bằng cách xóa hoặc thêm hay thao tác với element.
- Cũng như other directives, bạn có thể áp dụng **structural directives** với **host element**.  Sau đó thì chúng thực hiện bất cứ điều gì nó phải làm với **host element** và con cháu của nó.
- Ở đây tôi có nhắc đến **host element**  tôi sẽ nói qua để mọi người hiểu 
 Để biến  một component thành một thứ gì đó hiển thị được trong DOM, bạn phải liên kết component với một elementDOM thì được gọi là **host element**, nó có thể listen event, update properties,  có thể  gọi các method trên đó.
 
 Đối với **Directive** . Nó là một element mà directive được attach vào. vi dụ h1 là host element 
```
<h1 my-directive>
<my-comp></my-comp>
```
Đối với Component , nó là selector của component 
```
selector: 'my-comp'
template: '
<h1> some heading </h1>
.....

<my-comp></my-comp>  <!-- my-comp is the host element of h1 -->
```

Bạn sẽ thấy có 3 directive hay dùng **ngIf**, **ngFor**, **ngSwitch**...

```
    <div *ngIf="dev" class="name">{{dev.name}}</div>
```
```
    <ul>
        <li *ngFor="let dev of devs">{{dev.name}}</li>
   </ul>
```
```
<div [ngSwitch]="dev?.status">
  <app-fixbug-dev    *ngSwitchCase="'fixbug'"    [dev]="dev"></app-fixbug-dev>
  <aapp-development-dev      *ngSwitchCase="'development'"      [dev]="dev"></app-development-dev>
  <app-free-dev *ngSwitchCase="'free'" [dev]="dev"></app-free-dev>
  <app-unknown-dev  *ngSwitchDefault           [dev]="dev"></app-unknown-dev>
</div>
```

Ở đây tôi sẽ không nói đến cách sử dụng chúng vì nó không khó lắm đâu. mà tôi sẽ tập trung giải thích chúng hoạt động ra sao.

Chúng ta đang nói về directive trong bài này có nghĩa là chúng ta đang nói về **ngIf** và **NgIf**.  **NgIf** thì đang tham chiếu đến directive *class* còn **ngIf** thì tham chiếu đến tên  attribute của directive.

*Directive class* thì đề cập tới  properties của nó và những gì mà nó thực hiện. *attribute name* khi mà nói về cách áp dụng chúng nên một element HTML template.

Như ở trên đâu bài viết tôi có liệt kê ra 3 loại directive trong Angular thì  một trong số đó là  ***attribute directive***   thay đổi giao diện hoặc hành vi của một element, component, hoặc another directive. Nó có thể được áp dụng nhiều ***attribute directive***  trên một host element.

Đối với  **structural directives** thì chỉ có thể áp dụng trên một host element. Chúng ta đâu thể vừa sử dụng **ngIf** , **ngFor** hoặc **ngSwitch** cho một host element được phải không. Vâng tất nhiên là Angular chả cho phép bạn làm điều đó đâu.
Nếu bạn thử cho cùng *ngIf, *ngFor vào cùng element
```
    <ul *ngFor="let item of lists" *ngIf="heroes.length">
      <button (click)="addTocart(item.hero)" class='btn btn-primary btn-sm' > +</button></li>
    </ul>
    
    ERROR in Template parse errors:
Can't have multiple template bindings on one element. Use only one attribute prefixed with * 
```
Lý do là:

*Structural directive như ngFor có  thể thực hiện những việc phức tạp của host element and child element.  Nên sẽ rất khó để tìm ra directive nào được áp dụng trước hoặc sau  hay hủy bỏ tác dụng của nhau.
Khi có hai chỉ thị thì chúng ta lịa không thể quyết định cái nào ưu tiên hơn.*
### Cách mà directive hoạt động như thế nào ?

1. Chúng ta sẽ timg hiểu thông qua *ngIf

```
<div *ngIf="dev">
    <h2>dev name details</h2>
</div>

<div *ngIf="!dev">
    <h2>QA name details</h2>
</div>
```
![](https://images.viblo.asia/2671caf6-7057-4278-beb1-97aeb02a6c7c.png)

Thực tế như chúng ta thấy thì nó không sử dụng CSS để hide đi mà nó thêm và xóa chúng khỏi DOM

Khi điều kiện sai thì nó sẽ xóa host element  khỏi DOM. Tách nó khỏi DOM event, tách khỏi component khi nó phát hiện sự thay đổi và destroy nó. Các component và DOM nodes có thể được thu thập rác và  giải phóng bộ nhớ.

2. Liệu xóa chúng khỏi DOM có tốt hơn khi mà hide đi không ?

Sự khác biệt giữa việc ẩn và xóa không có ý nghĩa nhiều nếu đó là đoạn text đơn giản. Nó chỉ thực sự khác biệt khi mà component sử dụng nhiều tài nguyên. 

Nếu khi ẩn đi một component nhé thì hành vi của nó vẫn hoạt động , vẫn được  attach vào DOM, tiếp tục listen event. Angular vẫn có thể theo dõi sự thay đổi có thể ảnh hưởng đến data binding. Như vậy dù component bị ẩn đi thì nó vẫn tiếp tục hoạt động.

Chúng ta có thể thấy mặt đươc như :
- Việc hiển thị lại nhanh chóng, trạng thái trước đó của component được giữa nguyên và luôn săn sàng hiển thị. Component không khởi tạo lại đây là một hoạt động có thể tốn kém.

### Bên trong  `*ngFor` có gì ?


 ```
 <div *ngFor="let dev of devs; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{dev.name}}
</div>

<ng-template ngFor let-dev [ngForOf]="devs" let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <div [class.odd]="odd">({{i}}) {{dev.name}}</div>
</ng-template>
 ```
 
 -  Directive `ngForOf` thương được sử dụng ở dạng shorthand `*ngFor`. Như ví dụ này thì template sẽ được hiển thị cho mỗi vòng lặp là nội dung của một element có chưa directive.

`<li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>`

### Local variables
`NgForOf` cho phép alias các biến local được export :

- `$implicit:  T`: Giá trị của phần tử hiện tại trong danh sách lặp
- `index: number`: index  của lần lặp hiện tại
- `count: number`: Số lượng phần tử trong danh sách 
- `first: boolean`: True: Nếu là phần tử đầu tiên trong danh sách
- `last:boolean`: True: Nếu là phần tử cuối cùng trong danh sách
- `even: true`: Nếu đây phần tử ở index chẵn
- `odd: true`: Nếu đây phần tử ở index lẻ


Chúng ta có thể truy xuât các biến trong `*ngFor` được export có 2 kiểu như sau:

```
c1
<li *ngFor="let user of users; index as i; first as isFirst">
   {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
</li>
c2
 <div *ngFor="let dev of devs; let i=index; let odd=odd; trackBy: trackById" [class.odd]="odd">
  ({{i}}) {{dev.name}}
</div>
```

### Change  propagation

- Khi content của vong lặp thay đổi `ngForOf` thực hiện các thay đổi tương ứng với DOM:
 1. Khi một item được thêm vào, một instance mới của template được thêm vào DOM
 2. Khi một item được xóa , instance template cảu nó sẽ bị xóa khỏi DOM.
 3. khi các item được sắp xếp lại các template tương ứng với chúng sẽ được sắp xếp lại trong DOM.

Trong `*ngFor` có config giúp cải thiện hiệu năng của nó là tùy chình thuật toán tracking default, nó cung cấp chho chúng ta `trackBy` với `ngForOf`. `trackby` cung cấp với 2 tham số đầu vào `index` và `item`. Angular sẽ `tracking` giá trị thay đổi theo hàm trả về.

###  `*ngIf` ?
- Đây là một structural directive để hiển thị phần view (template) theo một điều kiện 
-  Đây là  structural directive được sử dung phổ biến nhất và mặc đinh template else là blank
-  Dạng shorthand của nó `*ngIf="condition"`, thường được sử dụng để cung cấp như một thuộc tính của element neo cho template được insert. Angular cũng mở rộng điều này thành một cú pháp rõ rang hơn, trong đó  element neo được chưa trong template 

shorthand syntax:

```
    <div *ngIf="condition">Content to render when condition is true.</div>
  ```

Simple form with expanded syntax:

```
    <ng-template [ngIf]="condition"><div>Content to render when condition istrue.</div></ng-template>
```

Form with an "else" block:
```
    <div *ngIf="condition; else elseBlock">Content to render when condition is true.</div>
    <ng-template #elseBlock>Content to render when condition is false.</ng-template>
```

### Inside NgSwitch directives
Đây là cú pháp 
```
<container-element [ngSwitch]="switch_expression">
   <some-element *ngSwitchCase="match_expression_1">...</some-element>
...
   <some-element *ngSwitchDefault>...</some-element>
</container-element>
```
- Giá trị của biểu thức được assign cho [NgSwitch] nếu có thì được hiển thị 
- Bản thân [NgSwitch] không phải là một structural directive . Nó  chỉ là một attributes directive  kiểm soát hành vi của hai directive chuyển đổi khác. Đó chính là nguyên nhân tại sao chung ta viết là [NgSwitch] chứ không phải *ngSwitch
- NgSwitchCase and NgSwitchDefault là structural directive. Bạn sẽ attach chúng vào phần tử thì trông nó sẽ như vậy 
(`<some-element *ngSwitchDefault>...</some-element>`)
Một `NgSwitchCase` show host element khi mà giá trị của nó khớp với giá trị switch.  `NgSwitchDefault` sẽ hiển thị khi các case anh em nó không có khớp giá trị . Các bạn thấy nó cũng gần như mấy switch bên ngôn ngữ khác  à.

```
Trên đây là nhưng gì tôi đã tìm hiểu được về structural directive  nhưng cái cần nắm :

1.  Cơ chế hoạt động của nó là xóa khỏi DOM
2.  cú pháp của directive
3. element mà bạn áp dụng directive thì được gọi là host element.
```
Nguồn tham khảo :



https://angular.io/guide/structural-directives


https://angular.io/guide