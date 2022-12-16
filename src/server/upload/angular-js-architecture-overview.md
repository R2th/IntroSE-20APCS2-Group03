Chào các bạn, hôm nay chúng ta sẽ cùng nhau đọc sơ lược qua phần Architecture của trang angular.io nhé.

Link: https://angular.io/guide/architecture

Mình chỉ tóm gọn những ý chính thấy cần thiết thôi. Bắt đầu nào:
# Modules
- Angular cấu thành bởi module và có một module gốc được gọi là NgModules.
- Mỗi Angular app đều có ít nhất một NgModule class, được gọi là root module đó, thông thường được đặt tên là AppModule.
- Những app nhỏ thường sẽ có chỉ một module là AppModule thôi, những app mà có nhiều module hơn thì mỗi module sẽ có từng nhiệm vụ riêng.
- NgModule là một class với `@NgModule` decorator.
- **Decorator là gì?** Là những functions có thể thay đổi class trong Javascript, tóm lại là có thể dựa trên decorator cụ thể mà Angular có thể biết được thằng này là Component hay là Module, ...
- **NgModule gồm những properties sau:**
>1. `declarations` : Những phần view class thuộc về module này. Angular có 3 loại view: `components`, `directives` và `pipes`
>  
>  2. `exports` : Là "đệ tử" của `declarations`, nếu những thành phần được khai báo trong `exports` sẽ được *sử dụng hoặc không (tuỳ ý)* trong những modules khác.
>  
> 3.  `imports` : Những module cần thiết cho module hiện tại thì được bỏ tại đây.
>  
>  4. `providers` : Những `services` được tạo ra trong sẽ bỏ tại đây và nó sẽ được sử dụng trong toàn bộ thành phần của app. VD: HeroService, MessagesService
>  
> 5.  `bootstrap` : View chính của app chúng ta đấy, mọi thứ hiển thị lên màn hình trong Angular app đều phụ thuộc vào thằng nằm trong mục này. Lưu ý **chỉ có  root module mới có thể thiết lập** property này.

- Cách để Angular chạy AppModule như là root module nằm trong phần config của file `main.ts`.
## NgModules vs JS modules

* Trong JS, mỗi file là một module và tất cả object được định nghĩa bên trong file sẽ thuộc module đó. Module đó được public với các module khác hay không phụ thuộc vào từ khoá `export`.
* Mỗi thư viện thuộc Angular đều có tên bắt đầu với `@angular`
* Cài chúng bằng `npm`
* Ta import NgModule từ thư viện Angular bằng
```
import { BrowserModule }  from '@angular/platform-browser';
```
* Đến đây chúng ta đang sử dụng JS module và NgModule cùng với nhau rồi.  Khá là  bối rối khi phân biệt NgModule với JS module hè.
# Components
- Một component quản lý các thành phần thuộc về *view*
# Templates
- Template trong Angular là tập hợp code HTML thường và các cú pháp riêng của Angular nữa.
# Metadata
- Một component đơn thuần chỉ là một class cho đến khi bạn nói cho Angular biết class đó là Component bằng cách thêm `metadata` vào trong class đó. VD:
```
@Component({
  selector:    'app-hero-list',
  templateUrl: './hero-list.component.html',
  providers:  [ HeroService ]
})
export class HeroListComponent implements OnInit {
/* . . . */
}
```
- Decorator `@Component` sẽ định nghĩa class thành Component.
- **Những cấu hình bên trong `@Component` gồm:**
> 1. `selector` : Ở đây viết gì thì khi gọi trong view của root module sẽ như nấy.
> 2. `templateUrl`: View liên quan đến Component hiện tại.
> 3. `styleUrls`: CSS liên quan đến nó.
> 4. `providers` : Tương tự với root module thì đây là nơi định nghĩa các `services` được sử dụng cho module này.
> 

* Ngoài metadata `@Component` phổ biến thì cũng còn những metadata khác như `@Injectable` để định nghĩa `service`, `@Input`, `@Output`, ...

# Data binding
* Nếu không sử dụng framework thì việc truyền - nhận dữ liệu khi tương tác với view sẽ  được viết bằng tay -> Dài lắm :v
* Angular hỗ trợ những việc đó với `data-binding`
* Xem hình dưới sẽ thấy ngay:

![](https://images.viblo.asia/2782604e-6147-436f-8d96-abb160064579.png)

# Directives
* Directive là một class với decorator `@Directive`. 
* Một Component là một `directive-với-template`.
* Decorator `@Component` thực chất là `@Directive` cộng với phần template vào.
* **Vậy tại sao lại tách riêng 2 cái này ra?** - Vì component có chức năng quá đặc biệt và là một thành phần chính của Angular nên họ cho tách biệt 2 cái này ra.
* Có hai loại directive là: `structural` và `attribute`.
* `structural` directive sẽ thay đổi layout bằng cách thêm, sửa, xoá hoặc đặt điều kiện hiển thị cho DOM elements. `*ngFor` và `*ngIf` là một ví dụ:
```
<li *ngFor="let hero of heroes"></li>
<app-hero-detail *ngIf="selectedHero"></app-hero-detail>
```
* `attribute` directive sẽ quyết định hành vi của một elements. Chẳng hạn như `ngModel` trong two-way binding:
```
<input [(ngModel)]="hero.name">
```
* Có thể tự do viết directive cho riêng mình.
# Services
* Là nơi chứa bất cứ thứ gì mà app bạn cần. Như dữ liệu, hàm, ...
* Component là một "khách hàng quen mặt" của services đó.
*  **Không có bất cứ tiêu chuẩn** gì của Angular để quy định service hết
*  **Vì sao phải có service?** Vì component phải gọn gàng, nhẹ, nên không thể lấy data từ server rồi validate, v...v được. Do đó chuyển mấy nhiệm vụ này về cho service làm.
# Dependency injection
* Dependency injection đơn giản là tạo ra biến private trong constructor của từng Component khi chạy. Cách này để xác định service nào cần thiết cho từng component khi chạy thôi.
* Trong ví dụ dưới sẽ thấy thằng HeroListComponent chỉ cần HeroService thôi.
```
constructor(private service: HeroService) { }
```

* Khi tạo component thì đầu tiên nó sẽ hỏi `injector` rằng services nào mà nó cần dùng.
* `Injector` là một cái thùng chứa các `services` đã được tạo ra từ trước. Trường hợp nếu component yêu cầu service không nằm trong injector thì injector sẽ thêm service đó vào rồi trả về cho Angular. Sau khi toàn bộ service của toàn bộ component được nằm trong thùng thì Angular mới có thể gọi constructor được. Trên đây là quy trình hoạt động của `Dependency Injection`.
* **Nếu injector không biết service cần là gì thì sao?** Thì nó báo lỗi nếu bạn chưa thêm service đó vào trong mục `providers` thôi :v:
* Lưu ý rằng property `providers` trong AppModule sẽ làm cho tất cả component biết đến service đang nằm trong `providers`.
* Nếu bạn đặt service vào bên trong `providers` của Component thì mỗi lần tạo mới Component đó bạn cũng sẽ tạo mới một `service`.

Đến đây là hết, còn mục `Wrap up` thì không cần thiết lắm. Cảm ơn các bạn đã theo dõi!