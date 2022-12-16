**NgModules** là cấu trúc cơ bản đầu tiên bạn gặp khi làm việc với bất kỳ ứng dụng bằng Angular nào, nhưng nó cũng tương đối tinh vi và phức tạp, vì những scope của nó.

Ở  trang [document của Angular](https://angular.io/guide/ngmodule-faq) đã nhiều câu hỏi thường gặp về **NgModules**, nhưng nó vẫn còn khá lộn xộn để mọi người nắm được trong khi tìm hiểu, sinh viên hay những người mới thường bối rối, vì vậy mình quyết định tổng hợp nó trong bài đăng này cho mọi người.

## Vậy tại sao lại là NgModules
Khi chúng ta sử dụng Angular CLI thì nó được sinh ra tự động, nhưng điều đầu tiên bạn phải làm trong Angular là tải một NgModule gốc:
```
platformBrowserDynamic().bootstrapModule(AppModule);
```
Mục đích của NgModule là khai báo từng thứ bạn tạo trong Angular và nhóm chúng lại với nhau (như các package Java hoặc namespace PHP / C #).

Có hai loại cấu trúc chính:
1. **declarations**: Dành cho những thứ bạn sử dụng trong các teamplates của mình: chủ yếu là các components (~views: các lớp hiển thị dữ liệu), bên cạnh đó cũng có các directives  và pipes.
2. **provides**: Dành cho các services(~ models: các class nhận và xử lý dữ liệu).

```
import { NgModule } from '@angular/core';

import { SomeComponent } from './some.component';
import { SomeDirective } from './some.directive';
import { SomePipe } from './some.pipe';
import { SomeService } from './shared/some.service';

@NgModule({
  declarations: [SomeComponent, SomeDirective, SomePipe],
  providers: [SomeService]
})
export class SomeModule {}
```

*Chú ý*: Từ Angular 6, services không cần phải được đăng ký trong 1 module nữa. Việc sử dụng các `providers` trên trong một NgModule hiện bị giới hạn để ghi đè các `services` hiện có.

## NgModule và scopes / visibility
Sự nhầm lẫn bắt đầu với các components và servicers không có cùng scope/visibility.
* **declarations**: components are in local scope (private visibility).
* **providers**: services are (generally) in global scope (public visibility).

Điều này có nghĩa là các `component` mà bạn khai báo chỉ có thể sử dụng được trong `module` hiện tại. Nếu bạn cần sử dụng chúng bên ngoài, trong các modules khác, bạn sẽ phải export chúng:
```

import { NgModule } from '@angular/core';

import { SomeComponent } from './some.component';
import { SomeDirective } from './some.directive';
import { SomePipe } from './some.pipe';

@NgModule({
  declarations: [SomeComponent, SomeDirective, SomePipe],
  exports: [SomeComponent, SomeDirective, SomePipe]
})
export class SomeModule {}
```
Ngược lại, các **services** bạn cung cấp thường sẽ có sẵn/khả dụng ở bất cứ đâu trong ứng dụng của bạn, trong tất cả các **module**.

## Khi nào nên import một NgModule?
Sự khác biệt về scope giữa các component và service là một điểm quan trọng cần biết, nhưng hiện tại nó vẫn còn ổn. Mọi thứ trở nên lộn xộn bởi vì, tất nhiên, như trong bất kỳ khuôn khổ và ứng dụng nào, bạn sẽ ổn nếu được chỉ có một module, nhưng khi số lượng module tăng lên nhiều thì sẽ không ổn chút nào. Bản thân Angular được chia thành các module khác nhau (core, common, http, ...).

Vì vậy, một điều chính khác mà bạn cần phải làm trong một **module Angular** là import các **NgModules** khác mà bạn cần và để sử dụng.

Ví dụ:
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FeatureModule } from '../feature/feature.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, FeatureModule]
})
export class SomeModule {}
```

Vấn đề là bạn cần phải biết lý do tại sao bạn lại cần phải nhập những module khác:
* Có phải là để sử dụng các component (hoặc những thứ khác liên quan đến **template**, như **directives** và **pipe**)? 
* Hoặc là sử dụng services?

Tại sao? Bởi vì sự khác biệt về phạm vi giữa các components và services:
* Nếu module được import cho các component, bạn sẽ cần import module vào từng module cần chúng.
* Nếu module được import cho các services, bạn sẽ chỉ cần nhập module một lần, trong module ứng dụng đầu tiên.

Nếu bạn không hiểu điều này, bạn sẽ có lỗi trên các components không khả dụng, vì bạn đã quên nhập lại module của chúng. Hoặc nếu bạn nhập một module cho các service nhiều lần, nó có thể dẫn đến lỗi trong các tình huống nâng cao như lazy load.

## Khi nào cần import main Angular modules?
Sau đây là một kiến thức hữu ích về các module Angular được yêu cầu, để biết bạn cần import chúng bao nhiêu lần. Đây là một bản tóm tắt vô cùng hữu ích.
### Các **module** để nhập mỗi khi bạn cần chúng:
* **CommonModule**: Tất cả những điều cơ bản của template: `bindings, ngIf, ngFor…..` Ngoại trừ trong module ứng dụng đầu tiên vì nó đã sẵn sàng ở trong **BrowserModule**.
* **FormsModule / ReactiveFormsModule.**
* **MatXModule** và 1 số **UI modules.**
* Bất kỳ module nào cung cấp cho bạn **components, directives or pipes.**

### Những module chỉ nhập một lần:
* **HttpClientModule**
* **BrowserAnimationsModule** và **NoopAnimationsModule**
* bất kỳ module nào khác chỉ cung cấp **service** cho bạn

Đó là lý do tại sao với Angular CLI, **CommonModule** được import tự động khi bạn tạo một **module** mới

## NgModules hỗn hợp
Nó có thể trở nên rắc rối hơn: làm thế nào để quản lý các **module** với các **component** và **service** cùng một lúc?

Bạn có thể biết một trong số chúng: **RouterModule**. Nó cung cấp cho bạn một component(`<router-outlet>`) và một directive (`routerLink`), mà còn có services (**ActivatedRoute** để nhận thông số URL, **Router** để điều hướng).
    
May mắn thay, sự lộn xộn đó sẽ được quản lý bởi chính module. Các tệp định tuyến được tạo tự động bởi Angular CLI, nhưng bạn có thể nhận thấy có một sự khác biệt tinh tế giữa định tuyến của module ứng dụng đầu tiên của bạn và định tuyến của các mô hình con.

Với AppModule, nó là:
```
RouterModule.forRoot(routes)
```

Còn với submodules, nó là:
```
RouterModule.forChild(routes)
```

Tại sao? Vì lần đầu tiên trong module ứng dụng, `forRoot()` sẽ cung cấp cho các component bộ định tuyến và cung cấp dịch vụ bộ định tuyến. Nhưng những lần tiếp theo trong các **submodules**, `forChild` sẽ chỉ cung cấp cho các thành phần bộ định tuyến (và không cung cấp lại các services, điều này sẽ rất tệ).

## Lazy-loaded modules
Trong Angular nếu bạn muốn sử dụng** lazy-load** 1 module, ta có thể thực hiện dễ dàng với Angular CLI.
```
const routes: Routes = [
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
];
```
Vì nó sẽ là một gói và mô-đun khác nhau, sẽ chỉ được load theo yêu cầu theo mặc định, nên nó không được load trong vi toàn cầu ứng dụng của bạn.

Đối với các component, nó không thay đổi bất cứ điều gì: bạn cần import lại **CommonModule** và các module thành phần khác, giống như trong bất kỳ **submodule** nào.
 
Đối với service, có một sự khác biệt:
 
* Bạn vẫn có quyền truy cập vào các service đã được cung cấp trong ứng dụng (như **httpClient** và các service của riêng bạn).
* Nhưng các service được cung cấp trong mô-đun** lazy-load** của bạn sẽ chỉ khả dụng trong module được **lazy-load** này, không phải ở mọi nơi trong ứng dụng của bạn.

    
Như vậy bây giờ bạn đã biết mọi thứ về các module Angular, bạn có thể hỏi: tại sao điều này lại gây rối loạn. Nó có thể khó khăn cho người mới bắt đầu, nhưng có một lý do sau đây:
* **Services** là các lớp ES6: chúng được import/export, do đó trong namspace của chúng sẽ không có nguy cơ xung đột nhau! Và singletons thường là những gì bạn muốn.
*  **Component** tạo ra các thành phần tức các thẻ HTML mới, nếu chúng là khả dụng trong toàn app, việc hai thư viện tạo các components có cùng tên sẽ tạo ra xung đột cho ứng dụng.

### Tài liệu tham khảo:
https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407
https://angular.io/guide/ngmodule-faq