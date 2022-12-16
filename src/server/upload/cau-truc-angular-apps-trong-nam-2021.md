![](https://images.viblo.asia/d4bf5d46-a58c-4c15-98c1-bb810340e1e6.jpeg)
Photo by Kaleidico on Unsplash


Có nhiều cách để cấu trúc một ứng dụng Angular app. Đây là cách của mình hay làm cho các ứng dụng để chúng linh hoạt hơn, dễ scale hơn và có kích thước khởi tạo bundle nhỏ hơn.

Gồm các phần sau:
![](https://images.viblo.asia/5c25371e-154d-46cc-b350-986e6493b405.png)

**Core**: Những thứ hoàn toàn cần thiết để ứng dụng bắt đầu.
**Features**: Business logic. Chứa các modules, components, services, và các thành phần khác liên quan.
**Shared**:  Các Components dùng chung
**Pages**: Routed components với các modules lazy loaded.

**Core**
Thư mục Core là nơi bạn đặt các singleton services, injection tokens, constants, app configurations, pipes, interceptors, guards, auth service, utils, v.v. sẽ được sử dụng trên toàn ứng dụng. Nếu có thêm thứ gì đó được mô tả cụ thể cho chính ứng dụng, hoặc về triển khai, CI / CD, API và Developer - rất có thể, nó cũng sẽ thuộc về Core.
![](https://images.viblo.asia/09ca5620-3bd9-4a00-83a9-aa24e237abee.png)


**Features**
Các tính năng về business sẽ nằm trong thư mục này. Tạo một module cho mỗi tính năng. Module đó có thể chứa các components, directives, pipes, services, interfaces, enums, utils, v.v. Ý tưởng là giữ cho mọi thứ liên quan với nhau. Vì vậy, một module riêng lẻ không nên được xác định trong phạm vi toàn cục hoặc bên trong Core.
![](https://images.viblo.asia/3094ee0b-a543-4476-90f0-c68b338f525a.png)



Các components được đặt tiền tố theo tên module, ví dụ: nếu tên module là `SpeakersModule`, các thành phần sẽ được đặt tên là `SpeakerAbcComponent`, `SpeakerXyzComponent`, v.v.
**Sắp xếp các Component liên quan nhau trong một cấu trúc thư mục rõ ràng**. Ví dụ, nếu SpeakerListComponent là cha và SpeakerListItemComponent là con, thì không tạo module speaker-list-item bên trong thư mục  speaker-list. Việc đặt tên có tiền tố phải rõ ràng để chỉ ra mối quan hệ liên quan. Ý tưởng này là để có thể xem nhanh những thành phần nào nằm bên trong module.
Các modules về tính năng có thể import các tính năng khác và từ các shared modules.


**Shared**

Giả sử coi các shared modules là một thư viện nho nhỏ cho các components về UI. Thì chúng không nên được đặc tả dành riêng cho một tính năng riêng lẻ về business. Rất là sai lầm khi có thể lấy tất cả các component, thả vào một dự án angular khác và hy vọng chúng chạy được (với điều kiện các gói phụ thuộc được đáp ứng đầy đủ). Có thể bạn đã biết đến các module wrapping UI được cung cấp bởi các thư viện khác như Material, ng-zorro-antd, ngx-bootstrap, v.v. , đây là một phương pháp hay. Nó bảo vệ bạn khỏi những thay đổi về API và cho phép bạn thay thế thư viện bên dưới nếu cần thiết. Các module trong shared module nếu được wrapping thì sẽ tốt hơn.

**Không tạo một  SharedModule quá lớn**, thay vào đó là chi tiết hóa từng tính năng nhỏ lẻ thành module riêng. Cho phép import chéo các shared module, nhưng hãy cố gắng giảm thiểu tốt nhất có thể để tránh xung đột xảy ra. Để có được hiệu suất tốt từ một thư viện nhỏ, bạn thậm chí có thể đặt tiền tố cho thư mục & module bằng tiền tố tùy chỉnh của ứng dụng angular của bạn.


**Pages**

Thư mục về các trang là phần thú vị nhất của cấu trúc này. Chúng giống như một cái bồn to, nơi chứa các module về tính năng nhưng không có gì xuất hiện trên giao diện (tức là không có thành viên nào được gọi). Trong các module này, bạn không khai báo bất kỳ thành phần nào ngoài các trang.

![](https://images.viblo.asia/1abf0e48-90bf-4853-87b6-4d89d1712c56.png)


Page controllers không có logic nghiệp vụ nào hết. Chúng chỉ đơn thuần là nơi hiển thị và sắp xếp các thành phần từ các module từ tính năng nghiệp vụ. Giả sử - trang chủ. Nó sẽ chứa tiêu đề, section, chủ đề, nhận xét, liên hệ, v.v. - tất cả đều đến từ các module tính năng tương ứng!

```

@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        ArticlesModule,
        CommentsModule,
        ContactModule,
        HeadersModule,
        HomePageRoutingModule,
    ],
})
export class HomePageModule {}
```


Ví dụ về home-page.component.ts như sau:
```

<!-- Component from HeaderModule -->
<app-header-default></app-header-default>
<main class="container">
    <app-hero-content></app-hero-content>
    <!-- Component from ArticleModule -->
    <app-article-list></app-article-list> 
    <!-- Component from CommentModule -->
    <app-comment-list-latest></app-comment-list-latest>
    <!-- Component from ContactModule -->
    <app-contact-form></app-contact-form>
</main>
<!-- Component from FooterModule -->
<app-footer-default></app-footer-default>
```

Chúng có thể được gọi từ các service của các trang khác để combine data và chuyển state cho trang. **Bạn nên cung cấp service này như vậy cho các component và tránh KHÔNG đặt trong root**. Nếu không, trạng thái có thể vẫn tồn tại ngay cả sau khi bạn điều hướng khỏi trang vì component của trang sẽ bị hủy chứ không phải là service của  trang.
```

// home-page.service.ts
@Injectable()
export class HomePageService {}

// home-page.component.ts
@Component({
    ...
    providers: [HomePageService]
}
export class HomePageComponent {
    constructor(private homePageService: HomePageService){}
}
```


Điều quan trọng nhất của page modules là mỗi module được "lazy loađe" để cải thiện hiệu suất và nhẹ hơn.

`Every page module is lazy-loaded!`


Pro-tip: If you define a single page component per module, then you can claim a further reduction in the initial bundle size. This practice also organizes all routes in a single source (namely AppRoutingModule) which is easier to manage. Then, your app-routing.module.ts file may look like this:

Mẹo: Nếu bạn mô tả một page component riêng lẻ  trên một module, thì bạn có thể giảm thêm kích thước gói bundle. Phương pháp này cũng giúp tổ chức tốt tất cả các routes trong một source duy nhất (cụ thể là AppRoutingModule), dễ quản lý hơn. Sau đó, tệp app-routing.module.ts của bạn có thể trông giống như sau:
```


const appRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule),
    },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: 'products/:id',  // <-------- NOTE 1. Child route
        loadChildren: () =>
            import('./pages/product-details-page/product-details-page.module').then((m) => m.ProductDetailsPageModule),
    },
    {
        path: 'products',     // <--------- NOTE 2. Parent route
        loadChildren: () =>
            import('./pages/product-list-page/product-list-page.module').then((m) => m.ProductListPageModule),
    },
    {
        path: 'checkout/pay',
        loadChildren: () =>
            import('./pages/checkout-payment-page/checkout-payment-page.module').then((m) => m.CheckoutPaymentPageModule),
    },
    {
        path: 'checkout',
        loadChildren: () => import('./pages/checkout-page/checkout-page.module').then((m) => m.CheckoutPageModule),
    },
    {
        path: '**',
        loadChildren: () => import('./pages/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule),
    },
]
```

Lưu ý 1 & 2: Vì khai báo route được parse từ trên xuống dưới, hãy đảm bảo khai báo đường dẫn con trước đường dẫn parent. Điều này sẽ đảm bảo việc "lazy-loaded" được tìm nạp chính xác. Ngược lại, nếu bạn khai báo parent route trước, thì việc truy cập vào bất kỳ child route nào cũng sẽ tải đoạn module của parent route một cách không cần thiết. Bạn có thể thấy sự khác biệt trong DevTools. Đây là thử nghiệm khi đặt parent route trước (Hình-5.1) VS child route trước (Hình-5.2) và truy cập `http://mysite.com/products/1`.
![](https://images.viblo.asia/1f9fec33-70e0-46e6-b401-13dc3fc3cba8.png)
Hình 5.1


![](https://images.viblo.asia/f46a7653-d0e1-49c9-8ec9-64695f5631db.png)
Hình 5.2

**Kết luận **
Nếu bạn cấu trúc Angular app theo cách này, nó sẽ tốt hơn. Xem ảnh tổng hợp:—
![](https://images.viblo.asia/41c1f2b9-c6d7-4dfb-8cce-0cac4cb00f8b.png)
Hình 6: Cấu trúc các module và các thư mục


Xem ví dụ : [touhidrahman/structure-ng-app-2021](https://github.com/touhidrahman/structure-ng-app-2021)
Bonus

Thêm directory paths vào file tsconfig.json để import paths vào ứng dụng của bạn nhanh và rõ ràng hơn:

```

// tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@core/*": ["src/app/core/*"],
            "@features/*": ["src/app/features/*"],
            "@shared/*": ["src/app/shared/*"],
            "@environment/*": ["src/environments/*"]
        },
        "outDir": "./dist/out-tsc",
    ...
}
```


Và cách dùng sẽ là:  `import { Nice } from '@features/nice instead of import { Ugly } from './../../path/to/ugly .`
Thanks for reading!

Nguồn: https://javascript.plainenglish.io/how-to-structure-angular-apps-in-2021-a0bdd481ad0d