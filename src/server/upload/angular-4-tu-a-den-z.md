![](https://images.viblo.asia/e434d79a-c0c7-4d76-8f67-15e2cada21f2.png)

Bài viết này tôi sẽ giải thích rõ từng thành phần cấu tạo và cách code Angular 4. Chúng ta sẽ đi lần lượt từ dễ đến khó về các khái niệm trong Angular 4, giúp bạn có cái nhìn tổng quan về cách code chuẩn nhất một hệ thống sử dụng Angular. 

Phiên bản mới nhất của Angular bây giờ là bản 6, tuy nhiên, phiên bản chính thức được sử dụng rất tốt bởi nhiều doanh nghiệp Enterprise, công ty lớn (ứng dụng nhiều người dùng, ứng dụng dành cho doanh nghiệp) và được Google hỗ trợ trọn đời (code sau 5 10 năm nữa cũng k cần chỉnh sửa gì dù công nghệ web có thay đổi ra sao đi nữa). Đó chính là phiên bản Angular 4. Do đó chúng ta hãy lấy bản này làm chuẩn. Còn bản 5, bản 6 thật ra đang là phiên bản thử nghiệm cho cộng đồng để tăng perfomance, thêm nhiều cách code hay ho hơn, nhưng cũng tiềm ẩn nhiều bugs hơn nếu xử lý code không tốt.

Nếu bạn chưa biết gì hoặc mới học code Angular, bạn vẫn có thể sử dụng bài viết này để tham khảo và học hỏi cách code. Hãy upvote, share bạn bè, và clip (bookmark) bài này nếu bạn thấy hữu ích nhé!

![](https://images.viblo.asia/eb4f516b-1df9-4d2e-ad7b-f5725a156ede.jpg)

# 1. Components
Components là một khối code trong app Angular. Nó là sự kết hợp của bộ template html (bộ khung html) và nhúng kèm code TypeScript (hoặc Javascript). Các components là độc lập với nhau và độc lập với hệ thống. Nó có thể được cài vào hoặc tháo ra khỏi hệ thống dễ dàng. Một component có thể hiểu như một control trên màn hình hiển thị, gồm giao diện html và code logic xử lý sự kiện đi kèm control đó. Một component cũng có thể to lớn như là cả 1 màn hình chứa nhiều control hoặc một nhóm nhiều màn hình. Tức là là một component cũng có thể chứa và gọi được nhiều component khác nối vào. Như vậy Angular 4 rất linh hoạt trong việc chia nhỏ code ra các component.

Trong Angular 4 chúng ta khai báo một Component với cấu trúc như sau:

```javascript
import { Component } from '@angular/core';
@Component({
  selector: 'hello-ng-world',
  template: `<h1>Hello Angular world</h1>`
})
export class HelloWorld { 
}
```
Như chúng ta thấy từ khóa @Component sẽ giúp định nghĩa ra một bộ khung html cho nó. Và bên dưới là một class HelloWorld dùng để viết code logic. Trong định nghĩa bộ khung html, chúng ta có một số thuộc tính cần chú ý sau đây:

* **selector** : Là tên được đặt để gọi một component trong code html. Ở ví dụ vừa rồi, từ khóa `hello-ng-world` được đặt tên cho component này. Khi cần gọi component này ra ở màn hình html cha, ta sẽ gọi bằng html tag `<hello-ng-world></hello-ng-world>`. Gọi như vậy thì component con sẽ được render ra component cha.

* **template** : Là tự định nghĩa khung html cho component dạng string ở trong file này luôn. Ví dụ ở trên chỉ định nghĩa một thẻ `html h1` đơn giản. Cách này chỉ dùng cho component đơn giản.

* **templateUrl** : Là đường dẫn url tới file html bên ngoài để load file đó vào làm khung html cho component này. Đây là cách code hay được dùng vì cho phép tách riêng khung html ra khỏi code logic, người làm design sẽ sửa file html riêng, độc lập với người làm code.

* **styles** : Là viết style css luôn vào file component này. Cách này chỉ dùng cho component đơn giản.

* **styleUrls** : Là đường dẫn url đến file style css độc lập cho component này. Cách này khuyên dùng vì file css nên để dành riêng cho người designer đụng vào.

# 2. Bind dữ liệu

Angular có cách code Binding (kết nối giữa html và data) dữ liệu theo kiểu **2 chiều**, nghĩa là **html input** thay đổi thì **biến javascript** sẽ ngay lập tức nhận được giá trị trả về và ngược lại, giá trị trong js thay đổi thì ngay lập tức màn hình html thay đổi theo. Chúng ta không cần đi nhặt nhạnh từng giá trị của các ô input như thời dùng **jQuery** nữa. Để bind một **chuỗi** ra ngoài màn hình **html** thì rất đơn giản sử dụng 2 dấu ngoặc nhọn **`{{TenBien}}`**
Ví dụ chúng ta có một Component đơn giản như sau:
```javascript
import { Component } from '@angular/core';
@Component({
  selector: 'hello-ng-world',
  template: `<h1>Hello {{title}} world</h1>` //Hiển thị biến javascript ra html. Chú ý đoạn này sử dụng dấu ` thay vì dấu ', ví lúc này chúng ta nhúng cả code Angular vào string.
})
export class HelloWorld { 
    title = 'Angular 4'; //Đặt một biến giá trị javascript;
}
```

Đó là hiển thị chuỗi string. Nhưng nếu muốn hiển thị giá trị đã có ra một ô input text, thì phải viết 2 dấu ngoặc vuông `[]` như sau:
```html:html
<input type="text" [value]="title">
```

Chú ý một chút, trong ví dụ này thì **`value`** là một từ khóa html chứ không phải tên biến, `title` mới là tên biến dùng để truyền vào cho `[value]` nhưng chúng ta không đóng khung `title` mà đóng khung `value`. Điều này cho phép chúng ta linh hoạt để gán giá trị cho bất cứ thuộc tính html nào cũng được.

```markdown:html
<input type="text" [placeholder]="title" > <!-- Ở đây thì biến title được nhét vào thuộc tính placeholder -->
```
> **Câu hỏi nhỏ**: Liệu có thể viết lẫn lộn `<input type="text" [placeholder]="{{title}}" >` được hay không?

# 3. Xử lý sự kiện
Để gắn một sự kiện của một control html với một hàm javascript, trong Angular 4 chúng ta viết như sau:
```markdown:js
<button (click)="updateTime()">Update Time</button>
```

Khi chúng ta viết (click) tức là muốn bind sự kiện click chuột của người dùng ở control này và gọi hàm updateTime() tương ứng trong code của Component này ra xử lý.

### 3.1 Xử lý thao tác của người dùng

Sự kiện thì có nhiều loại. Nếu sự kiện click thì đơn giản là khi nhấn xong chúng ta mới xử lý hành động. Nhưng có một số loại sự kiện cần **xử lý data ngay trong lúc người dùng đang thao tác**. Ví dụ người dùng gõ phím trên input text, người dùng chọn một option trong dropdownList, giá trị đang được chọn phải phản ánh ngay sang một control khác chẳng hạn.

Lúc này chúng ta cần dùng đến biến **events**. Đoạn code ví dụ sau đây, ngay khi người dùng gõ phím vào textbox, giá trị của textbox sẽ được lưu lại vào một biến `label`:

```sql:html
<!-- sự kiện change (người dùng thay đổi giá trị) sẽ được bind với hàm updateValue() -->
<input type="text" (change)="updateValue($event)">
```
```javascript:js
  updateValue(event: Event){
    // event.target.value sẽ nhận được giá trị truyền về từ textbox.
    // Sau đó vứt giá trị đó sang cho biến label.
    this.label = event.target.value;
  }
```

### 3.2 Xử lý thao tác của người dùng (ngon hơn cách 3.1)

Cách viết code ở ví dụ 3.1 hoàn toàn chạy ngon và không ai bắt bẻ gì. Nhưng vấn đề là biến **events** nó chứa rất nhiều function/component con bên trong (nó chứa toàn bộ các hàm xử lý hàng trăm loại event khác nhau của một component, một control). Do đó sẽ là không khôn ngoan khi gửi và nhận cả một cục to như vậy đưa sang javascript trong khi cái chúng ta cần chỉ là giá trị đang được nhập của textbox.

Hãy viết lại đoạn code vừa rồi như sau:

```markdown:html
<input type="text" #label1 (change)="updateValue(label1.value)">
```
```cpp:js
updateValue(value: any){
// chỉ cần nhặt giá trị text được truyền về nhét vào biến label là xong
this.label = value;
}
```
Như chúng ta thấy, hàm updateValue() lúc này nhận truyền vào là một biến `#label1` (biến này được gọi mỹ miều là `template reference variable`) và `label1.value` sẽ chứa giá trị được bind với textbox hiện tại.

Cách viết này rất được khuyên dùng. Các bạn lười quá thì viết kiểu 3.1 cũng được nhưng nếu biết chính xác cái sự kiện mình cần là gì thì nên viết theo 3.2.
### 3.3 Xử lý sự kiện binding 2 chiều

Ban nãy, tôi đã bảo các bạn là viết như thế này là binding 2 chiều:
```html:js
<input type="text" [value]="title">
```
Nhưng tôi lừa các bạn đấy, viết như thế này là chỉ bind một chiều, nghĩa là chỉ show được giá trị ra thôi chứ không lấy được giá trị từ html tự động bỏ vào biến title. Ví dụ viết như sau thì giá trị của `h1` sẽ không thay đổi gì khi ta gõ vào ô input
```html:html
<h1> {{title}} </h1>
<input type="text" [value]="title">
```

Từ phiên bản Angular 2 trở lên thì anh ***Google*** đã quyết định là **không nên cái gì cũng bind 2 chiều**. 

![](https://images.viblo.asia/adc99469-4a41-41fb-b39f-2e7b3680a778.gif)

Đó là vì bind 2 chiều sẽ làm khổ html. Nó sẽ phải render liên tục khi người dùng gõ vào ô input.

`Nhưng trong trường hợp chúng tôi cần phải bind 2 chiều thì làm thế nào?`

Rất đơn giản, lúc này chúng ta sẽ viết theo kiểu kẹp chuối.

Viết theo cú pháp bên dưới đây sẽ giúp bạn bind được 2 chiều, khi gõ vào ô input thì giá trị của `h1` sẽ thay đổi tương ứng:

```html:html
<h1> {{title}} </h1>
<input type="text" [(ngModel)]="title" name="title">
```
Từ khóa `ngModel` lúc này không phải là thuộc tính html nữa mà nó là từ khóa của Angular 4. Khi viết `[(ngModel)]` chúng ta sẽ gắn chặt giá trị của input html với biến `title`. Dẫn đến người dùng gõ vào ô này thì biến js `title` thay đổi theo => ô h1 hiện giá trị tương ứng của `title`. Cách viết `[()]` được gọi là `Banana in a box` hay nôm na là `kẹp chuối`.

![](https://images.viblo.asia/3b26c064-e186-4992-af26-0304aeda8ec0.jpg)

![](https://images.viblo.asia/87b814d1-6dcb-4c2f-8d48-b18292bcfedf.jpg)

# 4. Sử dụng ngModel và form fields
Từ khóa `ngModel` như ta thấy bên trên, có thể dùng để bind 2 chiều. Hiện đại hơn, biến này còn chứa cả các class CSS được gắn với biến model thể hiện tính hợp lệ của data đang được nhập vào form control.

```markdown:html
<input type="text" [(ngModel)]="vm.fname" name="firstName" required /> {{fname.className}} <br />
<input type="text" [(ngModel)]="vm.lname" name="lastName" /> {{lname.className}}
```

Biến vm trong component chứa 2 thuộc tính là fname và lname. Chúng ta bind nó ra 2 input html để nhập giá trị cho nó. Tuy nhiên cần validate giá trị nhập vào. Nên ta kiểm tra bằng cách gọi {{fname.className}} để xem class của input textbox hiện tại đang là cái gì.

Chú ý, khi sử dụng ngModel trong một form html. Bắt buộc phải có attribute `name`. Nếu không có thì sẽ bị báo lỗi như sau:

*If ngModel is used within a form tag, either the name attribute must be set or the form control must be defined as 'standalone' in ngModelOptions.*

Chúng ta sẽ có các class tự động sinh ra ở input type="text" như sau:

* **ng-untouched** - Class CSS này nghĩa là page đã load xong và input chưa được đụng đũa vào.
* **ng-touched** - Người dùng đã sờ vào control, ví dụ dí chuột hoặc nhấn chuột vào nó.
* **ng-pristine** - Class này nghĩa là input có giá trị được bind sẵn vào nhưng chưa bị sửa đổi
* **ng-dirty** - Giá trị bên trong đã bị sửa đổi, người dùng đã chọc ngoáy vào
* **ng-valid** - Người dùng nhập giá trị hợp lệ
* **ng-invalid** - Người dùng nhập giá trị dữ liệu không hợp lệ. Ví dụ bỏ trống một input required

Các class sẽ tự động sinh ra và gắn vào input mỗi khi có sự thay đổi dữ liệu trên form. Và nhiệm vụ của bạn là định nghĩa css style tương ứng với các thay đổi đó. Ví dụ:

```css
.ng-invalid{
    background: orange;
}
```

Sau khi áp dụng style thì sẽ như sau:

![](https://images.viblo.asia/255e56e5-a5cf-4c28-aad5-2febd3fc89c2.png)

# 5. ngModule
Module là một khái niệm rộng nhất của Angular. Một module có thể bao gồm chứa các components, directives, pipes, v.v. 

Module có thể được biên dịch (compile) dưới dạng ahead-of-time (AoT). Nghĩa là biên dịch ra mã thực thi để hiện ra luôn trên trình duyệt không cần vẽ vời gì từ đầu. Hãy tưởng tượng component có html và js viết riêng, khi load trang thì 2 thứ này mới nhào nặn chung để hiển thị html+data lên màn hình. AoT là thứ html+data đã nhào sẵn.

Module cũng có thể gọi module con và bắt tay được với các module khác.

Ví dụ về module chúng ta có thể bắt gặp ngay ở trong app.module.ts

```javascript:js
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyAppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ MyAppComponent ],
  bootstrap:    [ MyAppComponent ]
})
export class MyAppModule { }
```

Như vậy thì bản thân một app Angular chính là một module khổng lồ, trong đó cài cắm nhiều module con.

Các thuộc tính của module được định nghĩa như sau:

* **imports**: Định nghĩa sự phụ thuộc (Dependency) của module này, module phụ thuộc sẽ được load trước rồi module này mới load.
* **declarations**: Định nghĩa tất cả các component sẽ được dùng trong module này. Nếu chưa định nghĩa thì các component trong module sẽ không thể gọi nhau vì không tìm thấy nhao.
* **bootstrap**: Mỗi ứng dụng Angular đều cần một module gốc, module này sẽ có một component gốc chứa layout gốc sẽ được render ra ở file index.html.

# 6. Services
Một service là một đoạn code trong ứng dụng Angular mà phục vụ cho tác vụ gì đó, xử lý code logic gì đó. Ví dụ handle (xử lý) data gửi nhận từ/đến một API, hoặc cung cấp hàm authenticate...

Tất nhiên là service thì chỉ có code không hề có giao diện.

Để tạo ra một service thì chúng ta cần  import và mô tả một class với từ khóa `@injectable` lấy từ `@angular/core` module.

Ta hãy lấy một ví dụ:

```javascript:js
import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  constructor() { }

  getTime(){
    return `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`;
  }

}
```

Sau khi định nghĩa class TimeService là `@Injectable()` thì chúng ta sẽ gọi được service này ở nhiều chỗ component khác trong ứng dụng.

### 6.1 Dependency Injection (DI)

Khi một class muốn được gọi (được tiêm vào, inject vào) một component cần gọi hàm bên trong nó, chúng ta cần dùng đến Dependency Injection. Và rất đơn giản chỉ cần gọi ở hàm khởi tạo (constructor) của component là sẽ tiêm được service vào để dùng nó bên trong component đó.

```javascript:js
import { Component } from '@angular/core';
import { TimeService } from './time.service';
@Component({
  selector: 'app-root',
  providers: [TimeService],
  template: `<div>Date: {{timeValue}}</div>,
})
export class SampleComponent {
  timeValue: string;
  constructor(private time: TimeService){
   this.timeValue = this.time.getTime(); //Gọi biến time từ 
  }
}
```

### 6.2 Viết service dưới dạng dùng chung

Nếu chúng ta dùng service ở nhiều nơi cùng lúc và không muốn khai báo nhiều lần, component nào cũng phải tiêm nó vào. Thì lúc này có thể khai báo service ở phần `providers` của module hoặc component luôn.

```swift:js
@NgModule({
  declarations: [
    AppComponent,
    SampleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# 7. Directives
Directives có thể hiểu như là các đoạn mã typescript (hoặc javascript) kèm theo cả html và khi gọi thì gọi như là html luôn, ví dụ:

```html:html
<div *ngIf="title"> <!-- Chỗ này là gọi directive ngIf để kiểm tra điều kiện if ngay ở html -->
  Time: {{title}}
</div>
```

Từ Angular 2 trở đi, directives được chia làm các loại sau đây:

1. **Components**: Không có nghi ngờ gì khi gọi component là directive cũng được, vì rõ ràng là component cho phép định nghĩa `selector` và gọi ra như một thẻ html tag (`<component-name></component-name>`)
2. **Structural directives**: Là directive cấu trúc, dùng để vẽ html, hiển thị data lên giao diện html. Ví dụ **ngFor, ngIf**
3. **Attribute directives**: Thêm các thuộc tính động cho element html, ví dụ **ngStyle**

### 7.1 Ng-if… else

Đây là một **Structural directives**, có tác dụng kiểm tra điều kiện ngay ở html. Ví dụ:
```html:html
<div *ngIf="title; else noTitle">
  Time: {{title}}
</div>
<ng-template #noTitle> Click on the button to see time. </ng-template>
```

Code ở trên, khi biến title có giá trị, thì chuỗi `Time: [value]` được show ra. Và cục `#noTitle template` bị ẩn đi, ngược lại thì điều kiện else được chạy và `#noTitle` được hiện ra.

Như ta thấy dùng cái directive `ngIf else` này rất tiện lợi khi có thể ẩn hiện html dễ dàng.

### 7.2 Ng-Template
Đây cũng là một **Structural directives**. Nó giúp gom cục html cần ẩn hiện.

```html:html
<div *ngIf="isTrue; then tmplWhenTrue else tmplWhenFalse"></div>
<ng-template #tmplWhenTrue >I show-up when isTrue is true. </ng-template>
<ng-template #tmplWhenFalse > I show-up when isTrue is false </ng-template>
```

Chú ý là đoạn code vừa rồi dùng `ngIf..then..else`. Cách viết này đầy đủ hơn của 7.1

### 7.3 Ng-Container

Tương tự như `Ng-Template` dùng để gom html. Nhưng điểm mạnh của `Ng-Container` là thẻ directive này không render ra tag `<ng-container>` html như là `<ng-template>` mà tag sẽ được ẩn đi, giúp cho layout css không bị vỡ nếu bạn gom html (Không sợ bị nhảy từ div cha sang div con, cấu trúc html k hề thay đổi khi gom vào tag `<ng-container></ng-container>`)

Hãy xem ví dụ sau đây:

```html:html
Welcome <div *ngIf="title">to <i>the</i> {{title}} world.</div>
```
Sẽ được render ra như sau:

![](https://images.viblo.asia/c6a10c0d-ae56-4c8c-b171-8898bef069e6.png)

Khi soi html chúng ta sẽ thấy:
![](https://images.viblo.asia/481c8ad1-6ee4-4f03-9db4-79d8e6d1fc4b.png)

Tự dưng dòng div có `ngIf` nó lại chèn một cái thuộc tính `_ngcontent-c0`, dẫn đến dòng đó bị xuống dòng, làm sai layout design.

Bây giờ hãy viết lại như sau:

```markdown:html
Welcome <ng-container *ngIf="title">to <i>the</i> {{title}} world.</ng-container>
```

Kết quả sẽ nuột nà ngay:

![](https://images.viblo.asia/01c0a049-d7dc-4136-b5a5-bf0caa2763ca.png)

Đó là vì html đã được dọn gọn gàng:
![](https://images.viblo.asia/7cec8e16-9c11-48e9-87ee-4b0107dd852f.png)

### 7.4 NgSwitch and NgSwitchCase

Chúng ta hoàn toàn có thể sử dụng câu lệnh điều kiện **switch case** trong Angular y như **switch case** trong Javascript vậy.

Cách viết như sau:

```html:js
<div [ngSwitch]="isMetric">
  <div *ngSwitchCase="true">Degree Celsius</div>
  <div *ngSwitchCase="false">Fahrenheit</div>
</div>
```

Trong trường hợp muốn dùng **switch case default** (nếu toàn bộ case k thỏa màn thì vào default) thì chúng ta viết như sau:

```html:js
<div [ngSwitch]="isMetric">
  <div *ngSwitchCase="true">Degree Celsius</div>
  <div *ngSwitchDefault>Fahrenheit</div>
</div>
```

### 7.5 Hàm Input

Một directive hoàn toàn có thể nhận giá trị truyền vào để hiển thị hoặc tính toán.

Hãy xem một ví dụ sau đây. Giả sử chúng ta khai báo một `component Login` như bình thường. Nhưng có thêm một biến `showRegister` định nghĩa với từ khóa `@Input()`
```java:js
Import Input()
import { Component, OnInit, Input } from '@angular/core';
///...các đoạn code khác
@Input() showRegister: boolean;
```
Chúng ta định nghĩa template html của component như sau:
```markdown:html
<div>
  <input type="text" placeholder="User Id" />
  <input type="password" placeholder="Password" />  
  <span *ngIf="showRegister"><button>Register</button></span> <!-- showRegister = true thì mới hiện ra nút này -->
  <button>Go</button>
</div>
```

Khi gọi render ra component login thì truyền cái biến Input cho nó như sau:
```html:html
<login showRegister="true"></login>
```

Nếu bạn muốn giá trị của biến `showRegister` là được lấy động từ một biến khác, thì vẫn có thể viết như sau nhé:
```sql:html
<login [showRegister]="isRegisterVisible"></login>
```

Trong đó `isRegisterVisible` là biến true hoặc false tùy tình hình.

**`Thế nếu tôi muốn viết `showRegister` là `show-register` cho đúng chuẩn html css thì sao?`**

vẫn được nhé, hãy viết như sau ở khai báo @Input()
```erlang:js
@Input("should-show-register") showRegister: boolean;
```
```sql:html
<login should-show-register="true"></login>
```

### 7.6 Hàm Output

Một directive nhận giá trị về để hiển thị được. Vậy có thể nào bên trong directive trả giá trị ngược trở lại được không? Được luôn.

Lúc này chúng ta sẽ cần dùng đến EventEmitter (lấy giá trị trả về từ sự kiện người dùng thao tác). Ví dụ khi người dùng nhập xong id và password của một directive. Chúng ta muốn nhận được giá trị đã nhập ở một directive gọi directive login chứ không chỉ xử lý id và pass bên trong directive login. 

Lúc này cần import thư viện EventEmitter trước:

```sql:js
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
```
Sau đó khai báo một `@Output` đầu ra và biến này có kiểu là EventEmitter. Chú ý lúc này là đang viết trong directive con.
```cpp:js
@Output() onLogin: EventEmitter<{userId: string, password: string}>;

constructor() {
    this.onLogin = new EventEmitter(); //Khởi tạo một EventEmitter mới và gắn cho biến onLogin.
}
```
Ở html của directive con thì xử lý sự kiện click bình thường
```javascript:html
<button (click)="loginClicked(userId.value, password.value)">Go</button>
```
Và ở code logic thì bắn giá trị nhận được từ input gửi sang cho thằng `EventEmitter onLogin` đang chờ chực sẵn.
```javascript:js
loginClicked(userId, password){
    this.onLogin.next({userId, password});
}
```

Giờ thì sang viết ở `directive cha` gọi `directive <login>`, chúng ta sẽ dùng `EventEmitter onLogin` và gán nó cho hàm `loginHandlerAtParrent` để directive cha toàn quyền xử lý.
```html
<login (onLogin)="loginHandlerAtParrent($event)"></login>
```
Trong code directive cha, giờ thì sự kiện nhận được từ directive con sẽ chứa Object truyền sang (là id và pass nhập từ directive con)
```cpp:js
loginHandlerAtParrent(event){
    console.log(event); // Output: Object {userId: "sampleUser", password: "samplePassword"}
  }
```

Như vậy là chúng ta đã biết cách để bắn giá trị từ `directive con` sang `directive cha` rồi nhé

![](https://images.viblo.asia/1060a3af-d8e3-461c-a441-eb13a82302fd.gif)

# 8. Phát hiện thay đổi trong Angular
Để binding được 2 chiều thì rõ ràng Angular phải có cơ chế để phát hiện sự thay đổi, cho dù là từ html hay là biến js thay đổi giá trị, đều phải quét lần lượt các component thì mới biết được cái gì thay đổi.

Angular dùng cơ chế là quét từ trên xuống dưới (top-down), tức là từ component cha rồi đến component con được lần lượt kiểm tra.

**`Làm thể nào mà Angular quét được các sự thay đổi này?`**

![](https://images.viblo.asia/ac802a22-428a-4cf5-aba9-307e3adf3f59.gif)

Rất đơn giản, mỗi một component trong Angular đều có một class đi kèm với nó để so sánh. Khi có sự thay đổi value của từng biến trong component (do người dùng nghịch vào các events), lúc này giá trị ban đầu của component được lưu trước đó sẽ lấy ra so sánh. Nếu model có sự thay đổi, hiển nhiên là Angular lập tức gọi html làm việc, render ra giá trị mới trên DOM tức khắc.

Đấy là cách lưu giá trị và so sánh cho các kiểu dữ liệu giá trị như là string, bool, int...Còn nếu dữ liệu là kiểu class phức tạp mà người dùng tự định nghĩa ra. Thì lúc này cơ chế so sánh lưu giá trị sẽ dùng 1 trong 2 cách sau:

**Shallow Comparison (So sánh nông):** Tức là một trong số các thuộc tính của biến này (biến này là một class to) thay đổi thì cả biến đó vẫn không được nhận xét là đã thay đổi và không cập nhật giá trị. Tại sao lại so sánh khập khiễng như thế này? Cái này sẽ giúp ích trong trường hợp chúng ta dùng class dạng immutable (dùng biến như là hằng số). Rõ ràng cần phải tạo một biến mới để chứa giá trị thay đổi chứ bản thân giá trị đó k được phép thay đổi => update làm gì cho mất công.

**Deep Comparison (So sánh sâu):** Đi lần lượt từng thuộc tính của biến và so sánh giá trị đã bị thay đổi. Dĩ nhiên là toàn bộ giá trị của class phải được lưu lại trước đó để so sánh. Khi một trong số thuộc tính bị thay đổi, toàn bộ biến đó coi như bị thay đổi và toàn bộ html cần thay đổi theo.

# 9. Transclusion (trao đổi giữa directive) trong Angular
Ở mục 7 chúng ta đã biết về việc một Directive có thể nhận đầu vào và cả xuất ra đầu ra. Nhưng chúng ta chỉ có thể nhập và xuất directive ở thuộc tính html của tag gọi directive. Ví dụ `ngIf, ngFor, ng-template...`

Nếu bây giờ chúng ta lại muốn viết vào giữa tag gọi directive thì sao? ví dụ viết vào giữa begin và end tag?

Trong Angular bản 1.X thì có một khái niệm là Transclusion (trao đổi giá trị giữa các directive). Lên Angular 4 thì vẫn hỗ trợ. Lúc này ta có thể viết như sau:

```html:html
<blue>sample text</blue>
```

Sau khi định nghĩa ra `component <blue>` như bên trên, ta muốn lấy ra ruột của nó là chữ `sample text` và in ra chỗ khác thì sử dụng một `<ng-content>` để in ra như sau:

```html:html
<div class="blue">
  <ng-content></ng-content>
</div>
```

Chỗ này hơi khó hiểu một chút vì không có lời gọi directive (component) <blue> gì ở html cả, mà thật ra là gọi ngầm bên dưới code ts. `Component cha` đã inject và gọi `component blue` rồi, và để lấy được ruột của blue ra thì dùng tag `<ng-content>` là sẽ lấy đc ra, và chèn `ng-content` vào chỗ nào cần chèn nữa là xong.

Rõ ràng là việc lấy được ruột html của directive cực kỳ hữu ích khi mà chúng ta có thể chứa html của `html css modal bootstrap` trong đó chẳng hạn và chỉ cần khai báo 1 lần dùng ở nhiều nơi.

# 10. Sử dụng observables ở ngay html

Chúng ta biết là Observables là luồng dữ liệu được gửi nhận từ api. Observables sẽ chứa data json từ server gửi tới nhưng nó không phải là data json thuần. Nếu đưa luồng data này cho html thì nó sẽ không hiểu được để render ra màn hình. Tuy nhiên với từ khóa pipe async chúng ta có thể in ra trực tiếp như sau:

```html:html
<div *ngIf="asyncData | async; else loading; let title">
  Title: {{title}}
</div>
<ng-template #loading> Loading... </ng-template>
```

Lúc này biến `Observables asyncData` được gọi kèm từ khóa `async`, data bên trong nó sẽ được in ra html.

Nếu chúng ta có một mảng ở dạng Observables thì cũng hoàn toàn có thể in ra trực tiếp bằng **async** sử dụng `ngFor`

```javascript:html
<!-- Giả sử mảng colors là Observables và colors = ["red", "blue", "green", "yellow", "violet"]; -->

<ul *ngFor="let color of colors | async">
  <li>{{color}}</li>
</ul>
```
# 11. Không cho nhập giá trị Null
TypeScript 4 hỗ trợ việc check giá trị Null hoặc Undefined và không cho phép gán 2 loại giá trị này cho một biến đã được khai báo kiểu cụ thể. Ví dụ:

```objectivec:js
var firstName: string, lastName: string ;
firstName = null; //sẽ báo lỗi, vì null không thể nào gắn được cho string.
lastName = undefined; //sẽ báo lỗi, vì undefined không thể nào gắn được cho string.
```

Một biến cũng hoàn toàn có thể được khai báo là một trong 2 kiểu dữ liệu, như ví dụ dưới đây:

```shell:js
var firstName: string | null, lastName: string | undefined ;
firstName = null;  //Chạy OK
lastName = undefined; //Chạy OK
```

Mặc định không nói gì thì Typescript sẽ bật strictNullCheck là true. Do đó nếu muốn string có thể chứa cả giá trị null, chúng ta có thể tắt nó đi bằng cách sửa ở file  `tsconfig.json`

![](https://images.viblo.asia/2f59e70a-34b2-4fec-9569-508bf168892c.png)

# 12. Gọi đến HTTP API và nhận về luồng Observables

Để gọi được api từ server, Angular đã trang bị sẵn cho bạn bộ service http nằm ở thư viện `@angular/http`. Chúng ta chỉ việc inject (đưa vào) constructor của component để bắt đầu sử dụng. Sau đó viết code gọi api như sau:

```scala:js
this.http    
      .get("https://dinosaur-facts.firebaseio.com/dinosaurs.json")
```
Hàm `get()` sẽ trả về cho bạn một luồng dữ liệu dạng observable. Nó sẽ giúp code của bạn chạy nhanh và không bị đơ vì phải đợi request đến server. Cách code của observable cũng rất linh hoạt giúp cho phép bạn thao tác với dữ liệu ngay khi vừa nhận được. Ví dụ ta xử lý như sau:

```rust
this.http     
      .get("http://localhost:3000/dino")
      .map((response) => response.json())
```

Chú ý là chỗ này chúng ta sử dụng đến hàm `map` của rxjs nên phải import nó vào rồi mới bắt đầu dùng được nhé:

```java:js
import 'rxjs';
import 'rxjs/add/operator/map';
```

Dùng hàm map thì chúng ta vẫn chưa lấy được data json thực sự, cần phải dùng hàm subcribe để đọc ra cái data đã được map.

```rust:js
this.http
  .get("https://dinosaur-facts.firebaseio.com/dinosaurs.json")
  .map((response) => response.json())
  .subscribe((data) => console.log(data), // success
    (error) => console.error(error), // failure
    () => console.info("done")); // done
```

**`Nếu chúng ta không muốn dùng hàm subcribe phiền phức như trên thì sao?`**

May thay cho bạn, là vẫn có một cách viết cho người lười. đó là dùng đến hàm pipe `async`

Ví dụ đây:
```markdown:js
dino: Observable<any>; //Tạo ta một biến dạng luồng dữ liệu, biến này dĩ nhiên sẽ chứa được cả một luồng dữ liệu observable từ http request.

 this.dino = this.http // Gán nguyên một cục observable trả về từ http get cho biến dino
      .get("https://dinosaur-facts.firebaseio.com/dinosaurs.json")
      .map((response) => response.json());
```
Và để hiển thị biến `dino` ra thì ở html chúng ta viết như sau:
```html:html
<div>{{ dino | async }}</div> <!-- Dùng pipe async để in ra giá trị trong biến dino -->
```

`Nếu giả sử biến dino là một object phức tạp thì in ra như thế nào?`

Chúng ta có thể dùng dấu chấm để gọi cho các thuộc tính con của nó.
```javascript:html
<div>{{ (dino |async)?.bruhathkayosaurus.appeared }}</div>
```

Chú ý một chút chỗ này: `(dino |async)?` cách viết này sẽ đảm bảo là dino có giá trị khác null thì mới gọi thuộc tính con của nó ra. Cách viết này rất hay sẽ giúp tránh được null reference exception và rất ngắn gọn.

# 13. Nhưng tôi yêu cách code kiểu Promises, tôi ghét Observables

![](https://images.viblo.asia/1d8224f0-1038-4cbf-912b-709881226698.gif)

Trong Angular, mặc định thì **rxjs** được dùng để xử lý data trả về từ **http request**. Nhưng nếu chúng ta thích trả về Promises cho dễ thao tác hơn. Thì **rxjs** hoàn toàn đáp ứng được. Chúng ta sẽ có hàm `toPromises`.
```css:js
import 'rxjs/add/operator/toPromise';
```
Cách sử dụng như sau:

```rust:js
getData(): Promise<any>{
  return this.http
  .get("https://dinosaur-facts.firebaseio.com/dinosaurs.json")
  .map((response) => response.json())
  .toPromise();
}
```

Lúc này để lấy được data ra từ cục Promises thì cần dùng đến hàm callback. 

```javascript:js
this.getData()
  .then((data) =>  this.dino = data) //gán data json nhận dược cho biến dino
  .catch((error) => console.error(error));
```

Và ở html không cần dùng async gì lằng nhằng cứ bắn ra giá trị thôi nào:

```html:html
<div *ngIf="dino">
    <div>Bruhathkayosaurus appeared {{ dino.bruhathkayosaurus.appeared }} years ago</div>
</div>
```

> **Hỏi ngu chút:** `dino.bruhathkayosaurus.appeared` nếu biến **dino** mà null thì chỗ này ngỏm à?
> 
> **=> Đừng lo, đã có Fugaka diệt trừ giun, hãy viết là `dino?.bruhathkayosaurus.appeared` nhé bro. Thêm dấu ? vào**

> **Hỏi ngu chút nữa:** Thế thì có thể viết như thế này không? `dino?.bruhathkayosaurus?.appeared`
> 
> ***=> Hãy thử và cảm nhận***
# 14. Router

![](https://images.viblo.asia/bc323550-8a3d-4b5b-a1cf-9eaf77437713.gif)

Khi sử dụng Router, chúng ta sẽ có thể dựng nên một trang web SPA (Single Page Application). Khi viết một route template, các components sẽ được map tương ứng với các URL cố định. Và khi click vào link, url sẽ load component mà không cần load lại cả trang. Dẫn đến hiệu ứng là trang web chạy trong 1 tab và các màn hình được load động. Cách hoạt động này khác với MPA (Multiple Page Application) thường thì mỗi màn hình sẽ có url tương ứng và phải bật một tab riêng trên trình duyệt.

Router cũng có cache, tức là component đã load một lần thì sẽ được load lại không cần tải toàn bộ về từ server nữa.

Để bắt đầu sử dụng Router thì khi tạo project bằng Angular CLI, chúng ta chạy dòng lệnh sau đây:

```cs
ng new sample-application --routing
```

Còn nếu project của bạn đã có sẵn và chưa áp dụng Router, hãy chạy đoạn lệnh sau để thêm Routing vào application của bạn:

```markdown
ng g module my-router-module --routing
```

### 14.1 Router Outlet

Mỗi một Router sẽ có một URL để load component. Và để biết được là component sẽ render ra chỗ nào thì chúng ta viết đoạn code sau vào khung html cần chèn:

```ruby:html
<router-outlet></router-outlet>
```

### 14.2 Cài đặt Route cho ứng dụng Angular

Để cài đặt toàn bộ Router cho một ứng dụng Angular thì chúng ta cần tạo ra một đối tượng JSON chứa các thuộc tính như sau:

* **path**: Đường dẫn URL của component hiện tại.
* **component**: Ứng với đường dẫn bên trên thì load component nào.
* **redirectTo**: Chuyển hướng đến URL này nếu URL ở path không trùng. Ví dụ, khi người dùng gõ URL linh tinh, chúng ta muốn chuyển hướng và load trang Home hoặc trang báo lỗi 404 thì cần ghi rõ URL trang Home hoặc 404 vào `redirectTo`.
* **pathMatch**: Cài đặt xem chế độ kiểm tra url là như thế nào. khi giá trị là `full` thì nghĩa là toàn bộ url từ đầu đến cuối sẽ phải chính xác như trong bộ JSON Router. Còn khi giá trị là `prefix` thì chuỗi đầu tiên của url (dấu sược đầu tiên) sẽ được kiểm tra. Mặc định nếu không nói gì thì `prefix` sẽ được chọn.

Hãy xem đoạn code ví dụ về Router bên dưới:

```javascript:js
const routes: Routes = [
  {
    path: 'home',
    component: Sample1Component,
  },
  {
    path: 'second2',
    component: Sample2Component
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
```
### 14.3 Child Routes

Khi chúng ta muốn một trang có các trang con bên trong nó. Ví dụ trang Grid data sẽ chứa trang Thêm, Sửa, Xóa tương ứng. Lúc này chúng ta viết thêm thuộc tính `child` cho Route cha. `child` là một object JSON giống object Route cha.

Cách viết như sau:
```swift:js
const routes: Routes = [
  {
    path: 'home', //Đây sẽ là route cha (url cha), truy cập vào url này sẽ là http://example.com/home/
    component: Sample1Component,
    children: [ //Route home có thêm route con (url con)
      {
        path: 'second', //Truy cập vào url này sẽ là http://example.com/home/second/
        component: Sample2Component
      }
    ]
  }, ...// Các Route khác  
```

`Vậy làm thế nào để component con được hiển thị lên ở 
component cha?`

```html:html
<div>
  sample-1 works! <!-- Đây chính là html của Sample1Component --> 
  <router-outlet></router-outlet> <!-- Sample2Component sẽ được render ở chỗ này của component cha --> 
</div>
```

Như vậy là các component nếu dùng Route để định nghĩa lồng nhau thì chúng ta sẽ dùng lại biến `<router-outlet></router-outlet>` để render con của nó.

### 14.4 Params

Data hoàn toàn có thể được truyền từ màn hình này sang màn hình kia bằng cách vứt giá trị vào trong url để gọi (hay còn gọi là cách gọi hàm bằng truyền params URL).

Các bước để làm được việc này như sau:

1. **Định nghĩa giá trị cần lấy trong định nghĩa route**: Ví dụ bên dưới sẽ cho ta thấy cách định nghĩa param cần lấy trong url
```json
{        
    path: details/:id, //từ khóa :id ở đây thể hiện là có một biến id sẽ được đón nhận ở Component Details
    component: DetailsComponent
}
```

2. **Đọc data từ URL truyền tới**: Chúng ta cần dùng đến biến ***ActivedRoute*** của bộ ***@angular/router***

```markdown:js
// inject activatedRoute
constructor(private activeRoute: ActivatedRoute) { }

// Đọc ra giá trị từ url hiện tại, Route lúc này sẽ trả về một luồng dữ liệu observable nên chúng ta phải subcribe để lấy ra được data bên trong nó.
this.activeRoute
      .params
      .subscribe((data) => console.log(data[id])); //Lấy ra được cục data truyền về từ url, biến id có thể đặt tên tùy thích.
```
# Kết bài

Bài này là một bài dịch. Link bài gốc ở đây: https://www.dotnetcurry.com/angular/1385/angular-4-cheat-sheet

Hi vọng các bạn sẽ share thật nhiều đến bạn bè của mình và lưu bài này lại để tham khảo về sau. Hẹn gặp lại các bạn trong các bài sắp tới !!!

![](https://images.viblo.asia/9f095902-0488-4836-a598-d9c8dfd3366a.gif)