Từ khi framework Angular ra đời, nó được biết đến với việc tạo các Single Page App, cập nhật các URL trên thanh địa chỉ sẽ làm cho website của bạn dễ dàng sử dụng hơn. Bằng cách thêm các routes vào trong ứng dụng của bạn, người dùng có thể:
* Refresh trang mà không làm mất dữ liệu người dùng đã nhập ở trang hiện tại của bạn
* Lưu dấu trang cho một tính năng hoặc một phần dữ liệu cụ thể
* Chia sẻ liên kết trang web của bạn với những người khác

# 1. Angular's RoutingModule
RoutingModule là một module được đặt tại `@angular/router` cung cấp cho ứng dụng Angluar của chúng ta khả năng điều hướng và hiển thị nội dung phù hợp với địa chỉ URL. Với các ứng dụng web thông thường, việc điều hướng theo URL thường sẽ do phía server đảm nhiệm. 
Ngoài ra, các pakage routing cung cấp cho chúng ta rất nhiều chức năng khác, các chức năng này là gì, thì mình sẽ có 1 bài viết cụ thể về nó.
# 2. RoutingModule Requirements
Để cho RoutingModule hoạt động, chúng ta cần phải làm những việc sau:

**2.1 Import Dependancies**

Về cơ bản muốn sử dụng được routing, chúng ta cần phải import RoutingModule and Routes từ `@angular/router` vào trong module của bạn

```
import { RouterModule, Routes } from ‘@angular/router’
```

**2.2 Define Routes**

Để thiết lập tên url trong ứng dụng, thì routes phải định nghĩa nó. Các routes này sẽ kết nối với các tên url này từ component mà RouterModule muốn load, ví dụ:
```
const appRoutes: Routes = [
    { path: ‘’, component: HomeComponent }
    { path: ‘companies’, component: CompaniesComponent },
    { path: ‘users’, component: UsersComponent }
]
```
Như bạn thấy ở trên khi thiết lập path để trống, nó sẽ điều hướng đến HomeComponent. Ví dụ, khi bạn mới tạo 1 ứng dụng Angular, lần chạy đầu tiên nó sẽ nhận `AppComponent` là component chính và chạy template đã được cài đặt trong component này. Tuy nhiên ở ví dụ trên, khi vào trang index, nó sẽ nhảy vào `HomeComponent` và chạy template đã thiết lập ở trong HomeComponent.
Còn đối với path 'Companies' và 'Users', nó sẽ có path tương ứng là `/companies` và `/users`, khi vào path này nó sẽ chạy vào component tương ứng của nó.

**2.3 Linking Routes to our Application**

Để RoutingModule có thể hiểu được các routes bạn đã thiết lập ở trên, chúng ta cần phải cung cấp method `forRoot()`. Để kết nối RoutingModule với ứng dụng của bạn. chúng ta sẽ add RoutingModule vào trong `imports` của app's module:

```
@NgModule({
imports: [
   RouterModule.forRoot(appRoutes)
],
...
)}
```

**2.4 Displaying a Routed Component**

Với các bước trên, AngularRouter sẽ biết chính xác component mà bạn muốn hiển thị, tuy nhiên sẽ không biết nó sẽ hiển thị ở đâu, vì vậy trên view của component đó, bạn cần sửa như sau:
```
<app-header></app-header>
<div class=”container”>
    <div class=”row”>
        <!-- <default-feature></default-feature> DELETE THIS -->
        <router-outlet></router-outlet>        <!-- ADD THIS -->
    </div>
</div>
```

# 3. Basic Implementation
Ở phần 2, các bạn sẽ biết cách sử dụng routes cho dự án của mình, tuy nhiên, không biết chính xác khi đặt toàn bộ các thứ lại sẽ như thế nào, thì mình sẽ đi vào chi tiết bằng ví dụ dưới đây

**app.module.ts**
```
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { CompaniesComponent } from './artists/artists.component';
import { UsersComponent } from './albums/albums.component';
const appRoutes: Routes = [
    { path: ‘’, component: HomeComponent }
    { path: ‘companies’, component: CompaniesComponent },
    { path: ‘users’, component: UsersComponent }
]
@NgModule({
    declarations: [
        AppComponent,
        CompaniesComponent,
        UsersComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

**app.component.html**

```
<app-header></app-header>
<div class=”container”>
    <div class=”row”>
        <!-- <default-feature></default-feature> DELETE THIS -->
        <router-outlet></router-outlet>        <!-- ADD THIS -->
    </div>
</div>
```

Tại thời điểm này, URL sẽ load các component tương ứng của chúng

```
http://localhost:4200/
http://localhost:4200/companies
http://localhost:4200/users
```

# 4. Load Route Programmatically
Sẽ là 1 khởi đầu tốt nếu người dùng biết cách routes cho ứng dụng của mình, tuy nhiên sẽ có một số cách khác cũng khá phổ biến để điều hướng đó là sử dụng `links`, `menus` và `buttons`.

**4.1 Templates**

Như các bạn đã biết, mình có thể dễ dàng thêm các route bằng thẻ href trong html, tuy nhiên mình sẽ phải rất cẩn thận khi sử dụng theo phương pháp này. Các thẻ href sẽ khiến trang web bị reload và làm chậm ứng dụng. Ngoài ra việc reload cũng sẽ xóa mất một số thứ mà người dùng đã lựa chọn trên trang, khiến người sử dụng trang web thấy khó chịu và tốn thời gian sử dụng.

Để thay thế cho điều đó, RoutingModule cung cấp thuộc tính được gọi là `routerLink`. `routerLink` này có chức năng tương tự như `href` nhưng nó sẽ giao tiếp trực tiếp với RouterModule thay vì reload lại trang.

```
<a routerLink="companies">Companies</a>
```

**4.2 TypeScript**

Có một cách cũng khá phổ biến khác là điều hướng người dùng đến 1 trang khác sau khi 1 action được thực thi thành công, chẳng hạn như cập nhật thành công dữ liệu. Trong trường hợp này, việc điều hướng sẽ được kích hoatk trong TypeScript code của chúng ta thay thế cho việc dùng ở phần 4.1

Để thực hiện được việc này, chúng ta cần inject router service vào trong hàm khởi tạo của component và sử dụng `navigate()` chuyển url dưới dạng tham số

```
export class HomeComponent {
    constructor(private router: Router) { }
    onSelected(){
        //Do Something
        router.navigate(['companies']);
    }
}
```
Lưu ý các tham số này phải là dạng array. Và đặc biệt khi sử dụng cách này sẽ dễ dàng sử dụng nesting sub routes

Trên là một số hiểu biết của mình về Routing trong angular. Để hiểu rõ hơn bạn có thể truy cập vào nguồn https://angular.io/guide/router để biết thêm chi tiết nhé