Phiên bản Angular 11.0.0 được phát hành vào tháng 11 năm 2020. Bản phát hành chính Angular 11 cung cấp các bản cập nhật trên toàn bộ nền tảng, bao gồm CLI và các components. Sau đây ta sẽ tìm hiểu trong phiên bản này Google sẽ mang lại những gì mới mẻ nào.

Trước hết, để update version nên Angular 11, bạn có thể thực thiện theo follow sau:

Để kiểm tra phiên bản đã cài đặt của angular, hãy chạy lệnh `ng version`.
```
Angular CLI: 10.0.8
Node: 12.18.3
OS: win32 x64

Angular:
...
Ivy Workspace:

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.1000.8
@angular-devkit/core         10.0.8
@angular-devkit/schematics   10.0.8
@schematics/angular          10.0.8
@schematics/update           0.1000.8
rxjs                         6.5.5
```

Và cập nhật phiên bản Angular CLI của bạn, chạy lệnh sau:
```
npm install -g @angular/cli@latest
```
Lúc này bạn có thể check lại phiên bản hiện tại của bạn đã update lên version 11:
```
>ng version

Angular CLI: 11.0.2
Node: 14.15.1
OS: win32 x64

Angular: 11.0.2
... animations, cli, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1100.2
@angular-devkit/build-angular   0.1100.2
@angular-devkit/core            11.0.2
@angular-devkit/schematics      11.0.2
@schematics/angular             11.0.2
@schematics/update              0.1100.2
rxjs                            6.6.3
typescript                      4.0.5
```
## Router
Trên phiên bản 11,  vấn đề khi sử dụng RouteReuseStrategy method với các child routes ở các phiên bản Angular trước đó đã được giải quyết.
## Pipe
Angular 11 đã sửa lỗi nhập cho date and number pipe, trước đó nó được sử dụng để lấy bất kỳ kiểu nào làm đầu vào. Trong DatePipe, nó sẽ làm tròn phần mili giây của phần mili giây gần nhất được cung cấp, khi đó **async pipe** sẽ không trả về giá trị null làm giá trị cho đầu vào không được xác định.
## Webpack 5 support
Trong Angular 11, bạn có thể sử dụng webpack 5. Để sử dụng webpack5 trong dự án của bạn, hãy thêm đoạn mã sau vào tệp package.json của bạn. Trong phiên bản webpack5 này, sẽ giúp bạn đạt được small bundle và thời gian build nhanh hơn.

```
"resolutions": {
    "webpack": "5.4.0"
}
```

Để sử dụng webpack5, bạn sẽ cần sử dụng yarn để tiến hành test điều này vì npm không hỗ trợ thuộc tính này.
## Browser support
Hỗ trợ cho IE 9, IE 10 và IE mobile bị loại bỏ trong Angular 11, chúng không được chấp nhận trong bản phát hành Angular 10. Angular chỉ hỗ trợ phiên bản IE 11.
## Typescript version
Angular 11 chỉ hỗ trợ cho Typecript 4.0 để tăng tốc build và bỏ hỗ trợ cho Typecript 3.9.

```
"devDependencies": {
    "@angular-devkit/build-angular": "~0.1100.2",
    "@angular/cli": "~11.0.2",
    "@angular/compiler-cli": "~11.0.1",
    "@types/jasmine": "~3.6.0",
    "@types/node": "^12.11.1",
    "codelyzer": "^6.0.0",
    "jasmine-core": "~3.6.0",
    "jasmine-spec-reporter": "~5.0.0",
    "karma": "~5.1.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.0.3",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "^1.5.0",
    "protractor": "~7.0.0",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~4.0.2"
  }
```
## Formatted Build Output
Angular 11 mang đến các bản cập nhật đầu ra CLI mới để tạo logs và report dễ hiểu hơn. Mô tả đầu ra của bản build sẽ được hiển thị như bên dưới.

```
>ng build --prod

? Browser application bundle generation complete.
? Copying assets complete.
? Index html generation complete.

Initial Chunk Files               | Names         |      Size
main.67369a137e02816722b6.js   | main          	| 213.08 kB
polyfills.bf99d438b005d57b2b31.js | polyfills		|  36.00 kB
runtime.359d5ee4682f20e936e9.js | runtime       	|   1.45 kB
styles.09e2c710755c8867a460.css  | styles        	|   0 bytes

                                  | Initial Total | 250.53 kB

Build at: 2020-12-01T04:45:59.463Z - Hash: d633afb7245175d2bf60 - Time: 34869ms
```
## Support lazy loading
Angular 11 hỗ trợ lazy load với các outlets được đặt tên. Phiên bản trước đó của các outlets có tên luôn hỗ trợ các components.

```
{
      path: '',
      outlet: 'home',
      loadChildren: ()=>import('./home/home.module').then(m=>m.HomeModule)
  }
```
## HMR support
Trong Angular 11, đã cập nhật CLI để cho phép bật tính năng Hot Module Replacement (HMR) khi khởi động ứng dụng. HMR cho phép thay thế các mô-đun mà không cần làm mới trình duyệt. Để bắt đầu với HMR, hãy chạy lệnh sau.

```
ng serve --hmr
```
Sau khi chạy lệnh này, màn hình console sẽ hiển thị thông báo xác nhận rằng mô-đun HMR đã được bật.

```
>ng serve --hmr
NOTICE: Hot Module Replacement (HMR) is enabled for the dev server.
See https://webpack.js.org/guides/hot-module-replacement for information on working with HMR for Webpack.
? Browser application bundle generation complete.

Initial Chunk Files   | Names         |      Size
vendor.js          | vendor      |   2.66 MB
polyfills.js          | polyfills	  | 484.95 kB
styles.css, styles.js 	| styles          | 350.57 kB
main.js            | main          |  60.88 kB
runtime.js         | runtime        |  33.44 kB

                      | Initial Total |   3.57 MB

Build at: 2020-12-01T07:20:29.835Z - Hash: 4c8934a81ed952e948e6 - Time: 9147ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


? Compiled successfully.
```
## Generator for Resolvers
Trong Angular 11, bạn có thể tạo một giải pháp bảo vệ bằng CLI và lệnh sau:

```
ng g resolver resolvername
```

Bạn có thể tạo trình phân giải trong dự án của mình bằng lệnh này:

```
ng g resolver DemoResolver
```

Sau khi chạy lệnh này, nó sẽ sinh ra hai file gồm DemoResolver.resolver.ts và DemoResolver.resolver.spec.ts

```
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoResolverResolver implements Resolve {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable {
    return of(true);
  }
}
```
## i18n tokens
Trong Angular 11, bạn có thể trích xuất  i18n tokens từ các packages. Bạn có thể sử dụng lệnh sau với thư viện

```
ng xi18n --ivy
```
## Inline Font
Trong Angular 11, phông chữ có thể được chuyển đổi thành inline trong index.html. Bạn có thể đặt cờ trong angular.json của mình trong tùy chọn build. Theo mặc định, tính năng này được bật trong cấu hình production.
```
"configurations": {          
   "optimization": true,
}
```

Bạn có thể tắt tính năng tối ưu hóa để thay đổi cờ bằng lệnh sau.

```
"configurations": {           
"optimization": {
        "fonts": false
     },
}
```
OR
```
"configurations": {           
"optimization": {
        "fonts": {
            "inline": false
         }
     },
}
```

Khi bạn chạy `ng serve`, Angular tải xuống các phông chữ nội tuyến được sử dụng hoặc liên kết với dự án của bạn, cung cấp thời gian tải nhanh hơn
## Service Worker Improvements
Chúng tôi có thể sử dụng service worker để tạo một yêu cầu mạng cho yêu cầu điều hướng và cho phép bạn định cấu hình một NavigationReuestStrategy mới. Thiếu nội dung trong bộ nhớ cache và máy chủ, khi đó trạng thái mới của service worker là UnrecoverableStateError sẽ xuất hiện.
## Faster Builds
Angular sử dụng TypeScript 4.0 và thậm chí còn nhanh hơn với các quy trình như cập nhật ngcc. Angular 11 hiện nhanh hơn tới bốn lần so với các phiên bản trước đó.

## Tài liệu tham khảo
https://www.ifourtechnolab.com/blog/what-s-new-in-angular-11
https://angular.io/guide/updating-to-version-11