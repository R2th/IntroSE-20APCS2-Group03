**Built-in directives**  *listen to and modify  the behavior and layout HTML* 

### Built-in attribute directives

**Attribute directives** *lắng nghe sửa đổi  hành vi* của các **element**, **attributes**, **property** và thành phần khác của HTML. Bạn thường áp dụng chúng cho các element như thể chúng là attribute  HTML.

Có rất nhiều NgModule như RouteModule và FormModule xác định các directvie của riêng chúng. Các directives phổ biến nhất như sau:

 + **NgClass**-Thêm và xóa tập hợp các class CSS.
 + **NgStyles**-Thêm và xóa  tập hợp các HTML styles.
 + **NgModel**-Thêm two-way binding vào element của HTML.

I. **NgClass**

Bạn có thể thêm hoặc xóa  tên class CSS khỏi thuộc tính lớp của một phần tử có binding class.
+ Để binding một class, băt đầu là tiền tố **class** theo sau là dấu chấm (.) (ex: [class.foo]="hasFoo"). Angular sẽ thêm class khi biểu thức liên kết là true ngược  xóa class khi biểu thức liên kết là false .
+ Để binding buộc nhiều **class** thì sử dung cú pháp dạng [class]="classExpr". Biểu thức có thể một chuội tên lớp được phân tách bằng dấu cách  hoặc nó có thể định dạng **object** với tên lớp là **key** và **value** là giá trị boolean

example:
```
     <some-element [class]="'first second'">...</some-element>
     <p [class]=""></p>
```
```
     <some-element [class]="['first', 'second']">...</some-element>
 ```
 ```
     <some-element [class]="{'first': true, 'second': true, 'third': false}">...</some-element>
 ```
 ```
     <some-element [class]="stringExp|arrayExp|objExp">...</some-element>
 ```
 ```
     <some-element [class]="{'class1 class2 class3' : true}">...</some-element>
 ```
 Như các bạn có thể thấy **ngClass** hộ trợ chúng ta với classExpression có thể:
 + **String** - các lớp css được liệt kê trong chuỗi được ngăn cách bới dấu cách 
 + **Array** - các lớp css được liệt kê là các phần tử của mảng 
 + **Object** - **key** sẽ là tên lớp, **value** là giá trị **boolean** hoặc biểu thức return kết qủa dạng  **true/false**

Chỉ thị **NgClass** có thể sử dụng thay thế cho binding class trưc tiếp ([class] ). Tuy nhiên, việc sử dụng cú pháp binding class ở trên mà  không có **NgClass** được ưu tiên hơn vì do những  cải tiến về binding class trong Angular. **NgClass** không còn được cung cấp gía trị đáng kể nữa và cuối cùng có thể sẽ bị xóa trong tương lại.

--> chúng ta có thể sử dung [class] thay cho [ngClass]. 



II. **NgStyle**

+ Để binding **style**,  bắt đầu với tiền tố **style** theo sau là dấu chấm (.) và đế tến thuộc tính của style (example: [style.width="10px"]). Thuộc tính sẽ được set giá trị với biểu thưc được liên kết thương là một chuỗi.

> Chú ý là *style property*:  tên thuộc tính  có thể viết **dash-case** hoặc **camelCase**. Ví dụ **font-size**hoặc **fontSize** đều được.
+ Nếu có nhiều hơn một style mà bạn muốn thì bạn có thể viết như sau [style]="styleExpr". Biểu thức đính kém với [style] liên kết thương là danh sách kiểu như "width: 100px; height: 100px;".
+ Một chỉ thị thuộc tính được update  style cho phần tử HTML . Set một hoặc nhiều thuộc tính style, được chỉ định  dưới dạng các cặp key-value được phân tách  bằng dấu hai chấm. Ở đây thì key là tên style cùng với đó hậu tố (như 'top.px' , 'font-size.em').
 + Cú pháp kèm theo unit [style.font-size.px] = "size"(ex:  [style.width.px]="10")

styleExpr format có thể :

| Type | Value |
| -------- | -------- |
| String    | "width: 100%; height: 100%"|
 |Array|['width', '100%']|
|Object|{[key: string]: string | undefined | null}


```
 <some-element [style]="{'font-style': styleExp}">...</some-element>
 
 <p [style]="{'color': 'red', 'font-size': '20px'}">2.1 Muti-style Binding format Array string</p>
  
```
```
<some-element [style.color]="'color'">...</some-element>

<p [style.color]="'red'">1.1 Single style Binding</p>
```
 ```
 <some-element [style]="{'max-width.px': widthExp}">...</some-element>
 
 <p [style.font-size.px]="20">1.2 Single style Binding with unit</p>
 ```
 ```
 <some-element [style]="objExp">...</some-element>
 
 <ul *ngFor="let hero of heroes" [style]="{'color': hero.name === 'superman' ? 'red' : 'bule'}">
   <li>{{hero.name}} - {{hero.skill}}</li>
 </ul>
```

III. **Styling Precedence**
Trong thực tế thì việc một phần tử HTML có một hoặc nhiều hơn một class hoặc style ở đây list class hay list styles được binding. Khi có nhiều binding trên cùng class name hoặc style property, angular sẻ dụng một tập hợp quy tắc  ưu tiên để giải quyết xung đột này để biết class nào hay style nào được sử dụng cho phần tử HTML.

*Styling precedence (highest to lowest)*:

1.Template bindings:
```
Property binding: <div [class.foo]="hasFoo"></div> or <div [style.color]="color">

Map binding: <div [class]="classExpr"> or <div [style]="styleExpr">

Static value: <div class="foo"> or <div style="color: blue"> 
```

2.Directive host bindings:
```
 Property binding: host: {'[class.foo]': 'hasFoo'} or host: {'[style.color]': 'color'}
 
 Map binding: {'[class]': 'classExpr'} or host: {'[style]': 'styleExpr'}
 
 Static value : host: {'class': 'foo'} or host: {'style': 'color: blue'}
 ```
 
3.Component host bindings:
```
  Property binding:  host: {'[class.foo]': 'hasFoo'} or host: {'[style.color]': 'color'}
  
  Map binding: host: {'[class]': 'classExpr'} or host: {'[style]': 'styleExpr'}
  
  Static value:  host: {'class': 'foo'} or host: {'style': 'color: blue'}
  ```

Các bạn có thể tham khảo demo tại đây :

https://stackblitz.com/edit/angular-ivy-eau8f4?file=src%2Fapp%2Fapp.component.ts

Link tham khảo :

https://angular.io/guide/attribute-binding

https://angular.io/api/core/HostBinding