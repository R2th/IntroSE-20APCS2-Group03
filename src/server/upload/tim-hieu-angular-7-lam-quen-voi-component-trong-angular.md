## Working With Arrays
Ở bài trước [Những thành phần cơ bản](https://viblo.asia/p/tim-hieu-angular-7-tao-nhung-thanh-phan-co-ban-va-chay-thu-project-gAm5y4gVldb) chúng ta đã thử tạo ra một `UserItemComponent`  mới, để nói "Hello" tới một user. Nếu giờ chúng ta muốn nói "Hello" tới một list user's name thì phải làm thế nào? Trong Angular, chúng ta có thể lặp một list các đối tượng trong template bằng cách dùng cú pháp `*ngFor`. Ý tưởng ở đây là chúng ta sẽ lặp cùng một kiểu cho một tập hợp các object. <br>
> Nếu bạn đã làm việc với AngularJS 1.X trước đó, thì có thể bạn đã sử dụng `ng-repeat`directive. `NgFor` cũng hoạt động tương tự như vậy.
> 

Giờ thì chúng ta sẽ tạo ra một component mới để render ra một list các user.  <br>
```
$ ng generate component user-list

CREATE src/app/user-list/user-list.component.css (0 bytes)
CREATE src/app/user-list/user-list.component.html (28 bytes)
CREATE src/app/user-list/user-list.component.spec.ts (643 bytes)
CREATE src/app/user-list/user-list.component.ts (280 bytes)
UPDATE src/app/app.module.ts (598 bytes)
```

Giờ chúng ta sẽ thay thế thẻ  `<app-user-item>` bằng thẻ `<app-user-list> ` trong file` app.component.html`

**src/app/app.component.html**
```
<h1>
  {{title}}
  <app-hello-world></app-hello-world>
  <app-user-list></app-user-list>
</h1>
```
Cũng giống như cách chúng ta đã thêm property `name` cho `UserItemComponent`, giờ chúng ta sẽ thêm property `names` cho `UserListComponent`. <br>
Tuy nhiên, thay vì chỉ lưu trữ một string duy nhất, chúng ta sẽ lưu trữ kiểu của property này là một mảng các string. Một mảng được ký hiệu bởi ký tự []  , và code cụ thể sẽ trông như thế này: <br>

**src/app/user-list/user-list.component.ts**
```
export class UserListComponent implements OnInit {
  names: string[];
  constructor() {
    this.names = ['Ari', 'Carlos', 'Felipe', 'Nate'];
  }

  ngOnInit() {
  }
}
```
Thay đổi đầu tiên là chỉ ra một `string[]` property mới trong `UserListComponent` class của chúng ta. Cú pháp này có nghĩa là names là được định kiểu là một mảng của các `strings`. Một cách viết khác đó là `Array<string>` <br>
Chúng ta đã thay đổi `constructor` để set  value cho `this.names` thành` ['Ari', 'Carlos', 'Felipe', 'Nate'].`
<br>Bây giờ chúng ta có thể update template để render ra một list các name. Để làm được điều này chúng ta sẽ dùng `*ngFor`như sau:
* Lặp qua một list các item
* Generte một thẻ mới cho mỗi item.

Template mới của chúng ta sẽ trông như thế này: 

**src/app/user-list/user-list.component.html**
```
> <ul>
>   <li *ngFor="let name of names">Hello {{name}}</li>
</ul>
```
Chúng ta đã cập nhật template với một `ul` và một `il` với một attribute là `*ngFor="let name of names"`. Lúc đầu, ký tự `*` và cú pháp `let` có vẻ hơi khó hiểu, vậy thì chúng ta hãy cùng tìm hiểu nó: <br>
Cú pháp`  *ngFor` nói rắng chúng ta muốn sử dụng NgFor directive trên `attribute` này. Bạn có thể nghĩ `NgFor` giống như một vòng lặp `for.` Ý tưởng ở đây là chúng ta sẽ tạo ra một DOM element mới cho mỗi item trong collection.
<br> Trong câu lệnh` "let name of names"`. Thì `names` là một array đã được chỉ ra trong `UserListComponent` trước đó. Và `let name` được gọi là một `reference`. Khi chúng ta viết ` "let name of names"` có nghĩ là chúng ta sẽ lặp qua từng phần tử trong `names` và hiển thị mỗi biến local gọi là name. <br>
`NgFor` directive sẽ render ra một thẻ `li` cho mỗi elemt được tìm thấy trong array `names`. Và khai báo một local variable `name` để giữ giá trị của item hiện tại được lặp qua. Và variable này sẽ được thay thế trong đoạn  `Hello {{ name }} `. <br>
> Chúng ta không nhất thiết phải đặt tên biến là `name`. Chúng ta có thể viết như sau: <br>
> ```
> <li *ngFor="let foobar of names">Hello {{ foobar }}</li>
> ```
> 
> Ngược lại, nếu chúng ta viết như thế này thì điều gì sẽ xảy ra?
> ```
> <li *ngFor="let name of foobar">Hello {{ name }}</li>
> ```
> Câu trả lời là sẽ xuất hiện lỗi bởi vì `foobar` không phải là một property tồn tại trong component của chúng ta.
> 

Khi reload lại browser, chúng ta sẽ có một thẻ `li` cho mỗi string trong array.
![](https://images.viblo.asia/9a1f7bce-383e-40ba-aa61-df1aff9b8fb5.png)

## Using the User Item Component
Bạn có nhớ là trước đó chúng ta đã cùng nhau tạo `UserItemComponent` không? <br>
Thay vì render ra mỗi `name` trong `UserListComponent` chúng ta nên sử dụng UserItemComponent như là child component (Component con) - nghĩa là, thay vì render một cách trực tiếp text `Hello` và name, chúng ta nên để `UserItemComponent` chỉ định template ( và chức năng) cho mỗi item trong list. <br>
Để làm được điều này, chúng ta cần làm 3 điều: <br>

* Configure `UserListComponent` để render ra `UserItemComponent` (Trong template).
* Configure `UserItemComponent` để chấp nhận `name` variable như một `input`.
* Configure `UserListComponent` template để truyền `name` cho `UserItemComponent`
 
 <br>Nào, chúng ta hãy cũng nhau thực hiện từng bước một!
### Rendering the *UserItemComponent*
`UserItemComponent` có chỉ định selector `app-user-item` - Nào, hãy thử add tag đó vào template: <br>

**src/app/user-list/user-list.component.html**
```
<ul>
  <li *ngFor="let name of names">
    <app-user-item></app-user-item>
  </li>
</ul>
```
Chú ý rằng tôi đã hoán đổi text  `Hello` và name thành thẻ` app-user-item`. Giờ thỉ reload lại browser, để xem chúng ta thấy gì:
![](https://images.viblo.asia/3a383eca-d423-4024-bca4-51ae2d402aed.png)
Nó lặp đi lặp lại, tuy nhiên có điều gì đó sai sai ở đây. Với mỗi `name` đều hiển thị là "Felipe"! Chúng ta cần một cách để truyền data vào trong `child component`. <br>
Thật may mắn, Angular cung cấp một cách để làm điều này, đó là: `@Input` decorator.

### Accepting Inputs
Hãy nhớ rằng ở `UserItemComponent`, chúng ta đã set` this.name = 'Felipe'` trong constructor. Bây giờ chúng ta cần thay đổi một chút ở component này để nó chấp nhận một value cho property name. <br>
Và đây là những gì chúng ta cần thay đổi: <br>

**src/app/user-item/user-item.component.ts**
```
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() name: string // <-- added Input annotation
  constructor() {
    // removed setting name
  }

  ngOnInit() {
  }
}
```
Chú ý rằng, tôi đã thay đổi `name` property để có thêm `@Input` decorator. Chúng ta sẽ nói nhiều hơn về `Inputs` (và cả `Outputs`) trong chapter tiếp theo, tuy nhiên giờ chúng ta cứ biết rằng cú pháp này cho phép chúng ta truyền một value từ  `parent template` (template cha).<br>
Để sử dụng `Input` chúng ta phải add nó vào list hằng số trong `import`. <br>
Cuối cùng, chúng ta sẽ không set giá trị mặc định cho biến `name`, nên sẽ xóa phần set đó trong `constructor`.
Vậy là giờ chúng ta đã có một `name Input`. Để sử dụng nó thì chúng ta phải làm thế nào?
### Passing an Input value
Để truyền một value tới một component chúng ta dùng dấu ngoặc vuông [] ở trong template, cụ thể như sau: <br>

**src/app/user-list/user-list.component.html**
```
<ul>
  <li *ngFor="let name of names">
    <app-user-item [name]="name"></app-user-item>
  </li>
</ul>
```
Chú ý rằng, tôi ở thẻ `app-user-item`, tôi đã thêm một attribute mới, đó là : `[name]="name"`. Trong Angular khi chúng ta add thêm một attribute ở trong ngoặc như là `[foo]` - nghĩa là, chúng ta muốn nói rằng, hãy truyền một value tới `Input` có tên `foo` trong component. <br>
Còn trong trường hợp này, lưu ý rằng, `name` ở phía bên phải là đến từ câu lệnh `let name...` trong ngFor. Nếu chúng ta viết thành như thế này: <br>
```
<li *ngFor="let individualUserName of names">
<app-user-item [name]="individualUserName"></app-user-item>
</li>
```
 Phần `[name]` là chỉ định Input ở trong `UserItemComponent`. Chú ý rằng, ở đây chúng ta không truyền chuỗi ký tự "individualUserName" và chúng ta đang truyền vào giá trị của `individualUserName` - Đó là giá trị của mỗi phần tử trong `names` array. <br>
 Chúng ta sẽ nói nhiều hơn về Inputs và Outputs trong chương tiếp theo. Hiện tại, điều chúng ta đã làm đó là: <br>
1.  Lặp các phần tử trong `names`
2.  Tạo một `UserItemComponent` mới cho mỗi phần tử trong `names`
3.  Truyền vào một giá trị của `name Input` có trong `UserItemComponent`

Và giờ list names của chúng ta đã được hiển thị.
![](https://images.viblo.asia/2fbbd224-f8d8-4800-bbbe-a3153524945e.png)
Xin chúc mừng! chúng ta đã cùng nhau xây dựng một ứng dụng Angular đầu tiên với các components! <br>
Tất nhiên, ứng dụng này khá đơn giản, và tôi muốn chúng ta cùng nhau xây dựng một ứng dụng nhiều chức năng hơn nữa, ví dụ như ứng dụng voting, có khả năng tương tác với người dùng ... Tuy nhiên trước khi bắt đầu xây dựng app mới, chúng ta sẽ cùng nhau tìm hiểu về Bootstrapping trong Angular.
## Bootstrapping Crash Course
Mỗi app đều có một `main entry point`. <br>
Ứng dụng này được xây dựng bằng Angular CLI (nó được xây dựng trên một công cụ có tên là Webpack). Chúng ta chạy ứng dụng này bằng cách gọi lệnh:<br>
`ng serve`
<br> `ng` sẽ tìm entry point cho ứng dụng của chúng ta trong file `angular.json` . Nào, hãy cũng tìm hiểu cách `ng` tìm kiếm các component mà chúng ta vừa tạo. <br>
Ở mức high level nó sẽ trông như thế này: <br>
* `angular.json` sẽ chỉ định một "main" file, trong trường hợp này là `main.ts`
* `main.ts` là entry-point của app của chúng ta, và nó sẽ `bootstraps` ứng dụng của chúng ta. 
* Quá trình bootstrap sẽ khởi động Angular module. 
* Chúng ta dùng `AppModule` để bootstrap ứng dụng. `AppModule` được chỉ định trong `src/app/app.module.ts`
* `AppModule` sẽ chỉ định `component` nào sẽ được dùng như top-level component. Trong trường hợp thì đó là `AppComponent`
* `AppComponent` có các thẻ `<app-user-list>` trong template, và nó render ra list user.

HIện tại, điều mà tôi muốn focus vào đó là Angular module system: `NgModule`. <br>
Angular có một khái niệm mạnh mẽ về các `modules`. Khi bạn khởi động một Angular app, bạn sẽ không khởi động trực tiếp một component, thay vào đó bạn sẽ tạo ra một `NgModule`, cái đó sẽ chỉ tới component mà bạn muốn load. <br>
Hãy xem đoạn code dưới đây: <br>

**src/app/app.module.ts**
```
@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    UserItemComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Điều đầu tiên chúng ta thấy là một `@NgModule` decorator. Giống như tất cả các decorator khác, đoạn code này `@NgModule( ... )` sẽ add một metadata vào class ngay sau đó (trong trường hợp này là `AppModule`). <br>
`@NgModule` decorator có 4 keys: declarations, imports, providers, và bootstrap
### declarations
`declarations` chỉ ra các component được định nghĩa trong module này. <br>
Và đây là một ý tưởng quan trọng trong Angular: **"Bạn phải khai báo các components trong NgModule trước khi bạn có thể sử dụng chúng trong các template của mình."** <br>
Bạn có thể nghĩ `NgModule` giống như một "package" và `declarations` sẽ nêu rõ các components nào thuộc sở hữu bởi module này. <br>
Bạn có thể nhận thấy rằng khi chúng ta sử dụng `ng generate`, tool sẽ tự động add các components vào `declarations` list. Ý tưởng ở đây là bất cứ khi nào chúng ta tạo ra một component mới, `ng` tool đều giả sử rằng chúng ta muốn nó thuộc về `NgModule` hiện tại. 
### imports
imports sẽ mô tả những `dependencies` (thành phần phụ thuộc ) mà module này có. Chúng ta đang tạo ra một browser app, do đó chúng ta sẽ import `BrowserModule`. Nếu Module của bạn phụ thuộc vào các Module khác, bạn liệt kê chúng ở đây.

> **Điểm khác nhau giữa `import` và `imports`** <br>
> Có thể bạn đang đặt câu hỏi đó là, sự khác nhau giữa việc import class ở đầu file và imports ở trong module đúng k?<br>
> Câu trả lời ngắn gọn là bạn sẽ đặt cái gì đó vào `NgModule’s imports` nếu bạn sẽ sử dụng nó trong các template hay cùng với `dependency injection`. Chúng ta sẽ nói về `dependency injection` ở các phần sau.
> 

### providers
`providers` được sử dụng cho dependency injection. Do đó, để làm một service sẵn sàng được inject vào app của chúng ta, thì chúng ta sẽ thêm ở đây. 
### bootstrap
`bootstrap` sẽ nói với Angular rằng, khi module này được sử dụng để bootstrap một app, thì cần load `AppComponent` trước tiên.






<br><br><br>			
*Hết. Mời các bạn tham khảo tiếp ở các bài viết lần tới*			
			
*Nguồn:  https://www.ng-book.com/2/*