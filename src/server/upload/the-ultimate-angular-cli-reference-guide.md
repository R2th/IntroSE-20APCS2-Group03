Trong bài viết này chúng ta cùng nhau tìm hiểu Angular CLI là gì? Nó giúp ích gì cho dự án của bạn? Nếu bạn đã sử dụng Angular CLI rồi thì bài viết này cũng giúp cho bạn hiểu hơn về cách hoạt động của chúng.
Không nhất thiết phải sử dụng Angular CLI để phát triển ứng dụng. Nhưng mình nghĩ rằng những tính năng mà Angular CLI mang lại sẽ giúp tiết kiệm cũng như cải thiện rất nhiều thời gian phát triển ứng dụng.
## Some History
Vào ngày 15 tháng 9 năm 2016 thì phiên bản đầu tiên của Angular đã được phát hành.
AngularJS 1.x bị giới hạn trong một framework, nhưng sau đó thì Angular đã phát triển thành một platform vô cùng tham vọng, cho phép chúng ta phát triển các ứng dụng nhanh chóng và có thể mở rộng trên rất nhiều nền tảng web khác nhau.
Với sự chuyển đổi sang platform, Angular cũng đã cho thấy sự quan trọng của mình. Tuy nhiên, việc setup và config không phải lúc nào cũng là một điều dễ dàng. Để đảm bảo các Angular developer có thể focus vào việc xây dựng các ứng dụng trơn tru thì Angular đã nỗ lực rất nhiều. Sự nỗ lực của họ mang lại đó là sự tích hợp chặt chẽ Angular với các IDE và bộ tool đó là Angular CLI.
- Ngày 24 tháng 3 năm 2017: Angular CLI v1.0 đã được phát hành, nếu bạn muốn tìm tòi về phiên bản đầu tiên này thì có thể tham khảo tại [đây](https://github.com/angular/angular-cli/wiki/stories-1.0-update).
- Ngày 3 tháng 2 năm 2017: lệnh `ng deploy`  đã bị xóa khỏi core của Angular CLI ([chi tiết](https://github.com/angular/angular-cli/pull/4385)).
- Ngày 27 tháng 1 năm 2017: tên AngularJS được đặt cho các bản phát hành 1.x và tên Angular cho các phiên bản từ  2+ trở đi ([chi tiết](http://blog.angularjs.org/2017/01/branding-guidelines-for-angular-and.html)). 
## What Is Angular CLI?
Angular CLI là một giao diện dòng lệnh (CLI) được sử dụng để tự động hóa quy trình develop của bạn. Angular CLI cho phép bạn:
- Tạo một ứng dụng Angular mới.
- Chạy development server và hỗ trợ LiveReload giúp chúng ta có thể xem trước ứng dụng trong quá trình develop.
- Thêm các tính năng cho ứng dụng Angular hiện tại.
- Chạy unit tests cho ứng dụng.
- Chạy test End-to-End cho ứng dụng.
- Build ứng dụng từ development cho tới production.
## Prerequisites
Để có thể sử dụng Angular CLI, chúng ta cần cài đặt Node.js 6.9.0 và npm 3.0.0 trở lên.
Để kiểm tra version hiện tại của Node.js và npm chúng ta sử dụng các lệnh dưới đây:
```
$ node -v # => displays your Node.js version
$ npm -v # => displays your npm version
```
Khi bạn đã cài đặt Node.js thành công, chúng ta có thể sử dụng `npm`  để cài đặt `TypeScript` :
```
$ npm install -g typescript@2.2.0
```
Mặc dù `TypeScript` không phải là điều kiện cần, nhưng Angular khuyến khích các developer sử dụng chúng để có thể làm việc với Angular thoải mái nhất.
Khi chúng ta cài đặt thành công Node.js và TypeScript, chúng ta đã có thể cài đặt Angular CLI.
## Installing Angular CLI
Để cài đặt Angular CLI chúng ta chạy lệnh bên dưới:
```
$ npm install -g @angular/cli
```
Để kiểm tra đã cài đặt thành công chưa chúng ta kiểm tra version đã cài đặt:
```
$ ng version
```
Nó sẽ hiện thị version mà bạn đã cài đặt:
```
Angular CLI: 7.3.9
Node: 11.12.0
OS: linux x64
```
Việc cài đặt Angular CLI đã hoàn thành bây giờ chúng ta sẽ tạo một ứng dụng mới.
## Creating a New Angular Application
Có hai cách để tạo một ứng dụng mới bằng Angular CLI:
- `ng init`: tạo một ứng dụng mới trong folder hiện tại
- `ng new`: tạo một folder mới và chạy `ng init` bên trong folder đó.
<br>
Nếu như bạn chưa tạo folder thì hãy sử dụng `ng new` nhé!
```
$ ng new my-app
```
Sau khi chạy câu lệnh trên thì điều gì đã xảy ra:
- Một thư mục mới `my-app` được tạo.
- Tất cả các source và file được đặt dựa trên tên app mà bạn vừa tạo.
- `npm` và `TypeScript` đã được cài đặt và config.
- Trình chạy unit test `Karma` và `End-to-End` cũng đã được config.
- Các files environment với setting default cũng đã được tạo.
Tại thời điểm này khi bạn tạo Angular app thành công với tên `my-app` bạn sẽ có một cây thư mục như sau:
```
.
├── README.md
├── e2e
│   ├── app.e2e-spec.ts
│   ├── app.po.ts
│   └── tsconfig.e2e.json
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
└── tslint.json
```
## Running Your Application
Để có thể xem trước app của bạn chúng ta hãy navigate đến thư mục `my-app`:
```
$ cd my-app
```
và chạy server:
```
$ ng serve
```
Development server sẽ được build trên port 4200:
```
** NG Live Development Server is running on http://localhost:4200 **
Hash: 09fb2ad840c1472e5885
Time: 6230ms
chunk    {0} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 158 kB {4} [initial] [rendered]
chunk    {1} main.bundle.js, main.bundle.js.map (main) 3.62 kB {3} [initial] [rendered]
chunk    {2} styles.bundle.js, styles.bundle.js.map (styles) 9.77 kB {4} [initial] [rendered]
chunk    {3} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.37 MB [initial] [rendered]
chunk    {4} inline.bundle.js, inline.bundle.js.map (inline) 0 bytes [entry] [rendered]
webpack: Compiled successfully.
```
Bây giờ hãy mở trình duyệt và navigate tới url `http://localhost:4200/` để xem app của chúng ta hoạt động.
![](https://images.viblo.asia/16b51494-928b-42b7-a318-db785fb26d24.png)<br>
Vậy để có thể preview trước app Angular CLI đã làm gì:
1. Angular CLI sẽ load config từ `.angular-cli.json`.
2. Angular CLI sẽ chạy Webpack để build JavaScript và CSS.
3. Angular CLI sẽ khởi động máy chủ development Webpack để xem trước kết quả.<br>

Nếu trong source code có bất kì thay đổi gì thì tiến trình này sẽ được thực hiện lại từ bước số 2 và thông báo tới trình duyệt để làm mới kết quả hiển thị. `Ctrl + C` để dừng quá trình này lại.
## Adding Features to Your Angular Application
Chúng ta sử dụng lệnh `ng generate` để thêm các thành phần, tính năng cho ứng dụng của mình:
- `ng generate class my-new-class`: thêm một class mới.
- `ng generate component my-new-component`: thêm một component mới.
- `ng generate directive my-new-directive`: thêm một directive mới.
- `ng generate enum my-new-enum`: thêm enum.
- `ng generate module my-new-module`: thêm một module mới.
- `ng generate pipe my-new-pipe`: thêm một pipe mới.
- `ng generate service my-new-service`: thêm một service mới.

Các lệnh generate đều có alias thứ tự các lệnh lần lượt như bên dưới:
- `ng g cl my-new-class`: thêm một class mới.
- `ng g c my-new-component`: thêm một component mới.
- `ng g d my-new-directive`: thêm một directive mới.
- `ng g e my-new-enum`: thêm enum.
- `ng g m my-new-module`: thêm một module mới.
- `ng g p my-new-pipe`: thêm một pipe mới.
- `ng g s my-new-service`: thêm một service mới.


Mỗi lệnh khác nhau thực hiện một nhiệm vụ khác nhau và cung cấp các tùy chọn và tham số khác nhau.<br>
Bây giờ chúng ta cùng lần lượt tìm hiểu các lệnh generate bên trên nhé!
## Adding a new class
Chúng ta sẽ thêm một class mới `UserPorfile`:
```
$ ng generate class user-profile
installing component
  create src/app/user-profile.ts
```
Angular CLI sẽ tự động điều chỉnh tên file và tên class, vì vậy các lệnh sau sẽ cho các tên class tương tự:
```
$ ng generate class user-profile
$ ng generate class userProfile
$ ng generate class UserProfile
```
Như các bạn thấy ở trên lệnh này sẽ tạo ra một file `src/app/user-profile.ts` export class `UserProfile`.
#### Available options
- `--spec`: boolean, mặc định là `false`, sẽ tạo ra một file specs để thực hiện unit test.

#### Examples
```
# Generate class 'UserProfile'
$ ng generate class user-profile

# Generate class 'UserProfile' with unit test
$ ng generate class user-profile --spec
```
## Adding a new component
Chúng ta sẽ tiến hành thêm một component mới `app-site-header`:
```
$ ng generate component site-header
installing component
  create src/app/site-header/site-header.component.css
  create src/app/site-header/site-header.component.html
  create src/app/site-header/site-header.component.spec.ts
  create src/app/site-header/site-header.component.ts
  update src/app/app.module.ts
```
Angular CLI sẽ tự động điều chỉnh tên file, tên component cho bạn, do đó các lệnh sau sẽ tạo ra component tương tự:
```
$ ng generate component site-header
$ ng generate component siteHeader
$ ng generate component SiteHeader
```
Sau khi chạy lệnh generate thì các bạn sẽ thấy danh sách các file được tạo ra ngay trên màn hình CLI:
- Folder `src/app/site-header` được tạo ra. Trong folder này, bốn tệp được tạo ra:
1. File CSS.
1. File HTML.
1. File `TypeScript` với component `SiteHeaderComponent` và một selector `app-site-header`. 
1. Một file spec phục vụ cho việc unit test.
- `SiteHeaderComponent` được thêm vào `@NgModule` trong file `src/app/app.module.ts`.

#### Available options
- `--flat`: boolean, default là `false`, sẽ tạo các file trong `src/app` thay vì trong `src/app/site-header`.
- `--inline-template`: boolean, default là `false`, sử dụng kiểu inline template thay vì một file HTML riêng.
- `--inline-style`: boolean, default là `false`, sử dụng kiểu inline CSS thay vì file CSS riêng.
- `--prefix`: boolean, default là `true`, sử dụng các tiền tố được chỉ định trong file `.angular-cli.json` cho component selector.
- `--spec`: boolean, default là `true`, tạo file spec để viết unit test.
#### Examples:
```
# Generate component 'site-header'
$ ng generate component site-header

# Generate component 'site-header' with inline template and inline styles
$ ng generate component site-header --inline-template --inline-style
```
## Adding a new directive
Chúng ta sẽ thêm một directive với selector là `appAdminLink`:
```
$ ng generate directive admin-link
installing directive
  create src/app/admin-link.directive.spec.ts
  create src/app/admin-link.directive.ts
  update src/app/app.module.ts
```
Angular CLI sẽ tự động setting tên file và selector phù hợp, do đó các lệnh bên dươi sẽ cho cùng một kết quả:
```
$ ng generate directive admin-link
$ ng generate directive adminLink
$ ng generate directive AdminLink
```
Lệnh trên sẽ tạo và update các file:
- File `src/app/admin-link.directive.ts` được tạo và export một directive có tên `AdminLinkDirective` và một selector`appAdminLink`.
- File `src/app/admin-link.directive.spec.ts` được tạo phục vụ cho việc viết unit test.
- `AdminLinkDirective` được thêm vào declaration `NgModule` trong `src/app/app.module.ts`.

#### Available options
- `--flat`: boolean, default là `false`, sẽ tạo các file trong `src/app` thay vì trong `src/app/admin-link`.
- `--prefix`: boolean, default là `true`, sử dụng các tiền tố được chỉ định trong file `.angular-cli.json` cho component selector.
- `--spec`: boolean, default là `true`, tạo file spec để viết unit test.

#### Examples:
```
# Generate directive 'adminLink'
$ ng generate directive admin-link

# Generate directive 'adminLink' without unit test
$ ng generate directive admin-link --spec=false
```
## Adding a new enum
Để thêm enum có tên `Direction` thì chúng ta có lệnh sau:
```
$ ng generate enum direction
installing enum
  create src/app/direction.enum.ts
```
Kết quả tương tự cho câu lệnh `ng generate enum Direction`. Lệnh trên sẽ tạo ra file `src/app/direction.enum.ts` export một enum có tên `Direction`.
## Adding a new module
Để thêm một module mới chúng ta có câu lệnh sau:
```
$ ng generate module admin
installing module
  create src/app/admin/admin.module.ts
```
Lệnh trên sẽ tạo ra một folder `src/app/admin` và một module `AdminModule` được tạo ra bên trong file `src/app/admin/admin.module.ts`.
Chúng ta có thể thấy `AdminModule` không được tự động thêm vào `AppModule` trong `src/app/app.module.ts`. Và việc import này tùy thuộc vào nơi bạn cần sử dụng tới module này.
Để có thể import một module này trong một module khác chúng ta chỉ cần thêm vào `@NgModule` của module cần thêm vào.
```
import { AdminModule } from './admin/admin.module';

@NgModule({
  // ...
  imports: [
    AdminModule
  ]
})
export class AppModule { }
```
#### Available options
- `--routing`: boolean, mặc định là `false`, tạo một module `AdminRoutingModule` module này sẽ có chức năng định tuyến và chúng sẽ được import vào module chúng ta mới tạo.
- `--spec`: boolean, mặc định là `false`, phục vụ cho việc viết unit test.

#### Examples:
```
# Add module 'admin'
$ ng generate module admin

# Add module 'admin' with additional module containing routing information
$ ng generate module admin --routing
```
## Adding a new pipe
Một pipe trong Angular tương đương với một filter trong AngularJS 1.x và pipe cho phép bạn chuyển đổi một giá trị và hiển thị trong template.
Để thêm một pipe có tên `convertToEuro` chúng ta có lệnh sau:
```
$ ng generate pipe convert-to-euro
installing pipe
  create src/app/convert-to-euro.pipe.spec.ts
  create src/app/convert-to-euro.pipe.ts
  update src/app/app.module.ts
```
Các lệnh bên dưới cho kết quả tương tự:
```
$ ng generate pipe convert-to-euro
$ ng generate pipe convertToEuro
$ ng generate pipe ConvertToEuro
```
Câu lệnh trên sẽ tạo và update các file sau:
- Tạo ra file `src/app/convert-to-euro.pipe.ts` export class `ConvertToEuroPipe`.
- Tạo ra file `src/app/convert-to-euro.pipe.spec.ts` phục vụ việc viết unit test.
- `ConvertToEuroPipe` được thêm vào declaration trong `@NgModule`  trong `src/app/app.module.ts`.

#### Available options
- `--flat`: boolean, default là `false`, sẽ tạo các file trong `src/app` thay vì trong folder khác.
- `--spec`: boolean, default là `true`, tạo file spec để viết unit test.
#### Examples:
```
# Generate pipe 'convertToEuro' with spec and in /src/app directory
$ ng generate pipe convert-to-euro

# Generate pipe 'convertToEuro' without spec and in /src/app/convert-to-euro directory
$ ng generate pipe convert-to-euro --spec=false --flat=false
```
## Adding a new service
Để thêm một service dependency injection có tên `BackendApiService`, chúng ta thực hiện câu lệnh dưới đây:
```
$ ng generate service backend-api
installing service
  create src/app/backend-api.service.spec.ts
  create src/app/backend-api.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```
Các câu lệnh bên dưới cho kết quả tương tự:
```
$ ng generate service backend-api
$ ng generate service backendApi
$ ng generate service BackendApi
```
Sau khi chạy lệnh trên chúng ta sẽ nhìn thấy những sự thay đổi sau:
- File `src/app/backend-api.service.ts` được tạo ra export service có tên `BackendApiService`.
- File `src/app/backend-api.service.spec.ts` được tạo ra để viết unit test.

Chúng ta có thể thấy một warring được đưa ra đó là service được tạo ra nhưng chưa được provide ở module hay component nào. Tùy thuộc vào mục đích của service mà chúng ta provide vào nơi cần thiết nhé.
```
import { BackendApiService } from './backend-api.service';

@NgModule({
  // ...
  providers: [BackendApiService],
  bootstrap: [AppComponent]
})
```
#### Available options
- `--flat`: boolean, default là `false`, sẽ tạo các file trong `src/app` thay vì trong `src/app/backend-api`.
- `--spec`: boolean, default là `true`, tạo file spec để viết unit test.
#### Examples:
```
# Generate service with DI token 'BackendApiService' in /src/app directory
$ ng generate service backend-api

# Generate service with DI token 'BackendApiService' in /src/app/backend-api directory
$ ng generate service backend-api --flat=false
```
## Special note
Angular CLI không chỉ generate code một cách đơn thuần mà nó sẽ phân tích cấu trúc code, ứng dụng của bạn. Ví dụ, khi thêm một component mới bằng cách sử dụng `ng generate component`, Angular CLI sẽ tìm module gần nhất trong cây module của ứng dụng và tích hợp các feature trong module đó. Vì vậy, nếu bạn có một ứng dụng nhiều module khác nhau thì Angular CLI sẽ tự động tích hợp feature mới trong module một cách chính xác, tùy thuộc vào folder nơi bạn chạy lệnh từ đó.
## Running Your Unit Tests
Angular CLI sẽ auto config trình testting Karma cho ứng dụng của bạn khi tạo ứng dụng.<br>
Khi thêm một tính năng vào ứng dụng, bạn có thể sử dụng option `--spec` để chỉ định tạo một filie `.spec.ts` tương ứng cho tính năng mới của bạn.
Các tệp Spec được tạo trong cùng folfer tương ứng. Điều này cho phép bạn dễ dàng xác định vị trí của chúng khi làm việc trên một tính năng.
Khi chạy unit test cho toàn bộ ứng dụng thì Angular sẽ tìm đến toàn bộ các file `.spec.ts` trong `src` và excute chúng.
Để chạy unit test chúng ta thực hiện câu lệnh sau:
```
$ ng test
```
Chúng ta có thể thấy tiến trình và kết quả trên màn hình command lines:
```
$ ng test
[karma]: No captured browser, open http://localhost:9876/
[karma]: Karma v1.4.1 server started at http://0.0.0.0:9876/
[launcher]: Launching browser Chrome with unlimited concurrency
[launcher]: Starting browser Chrome
[Chrome 57.0.2987 (Mac OS X 10.12.0)]: Connected on socket 4OBzlsVyIPZyE1AYAAAA with id 41455596
Chrome 57.0.2987 (Mac OS X 10.12.0): Executed 3 of 3 SUCCESS (0.132 secs / 0.121 secs)
```
Trình duyệt cũng sẽ auto được mở để thực hiện quá trình auto testting.<br>
![](https://images.viblo.asia/ef5a9d50-0139-475a-b4df-946229b5986f.png)
<br>
Việc thực hiện testing sẽ được thực hiện như thế nào:
1. Angular CLI sẽ tải `.angular-cli.json`.
1. Angular CLI chạy Karma với cấu hình được chỉ định trong `.angular-cli.json`. Mặc định `karma.conf.js` sẽ nằm trong thư mục gốc của ứng dụng.
1. Karma mở trình duyệt được cấu hình. Trình duyệt mặc định là Google Chrome.
1. Karma sẽ hướng dẫn Chrome chạy `src/test.ts` bằng testing framework, mặc định là `Jasmine framework` . File `src/test.ts` được tạo tự động khi ứng dụng được tạo ra, được cấu hình sẵn và chạy tất cả các tệp `.spec.ts` của bạn trong `src`.
1. Karma báo cáo kết quả của việc chạy unit test trên trình duyệt và màn hình command lines.
1. Karma sẽ follow thư mục `src` nếu có bất kì sự thay đổi nào thì trình test sẽ được thực thi lại từ bước 4 và 5.

Để kết thúc tiến trình test chúng ta sử dụng `Ctrl + C`. Để có thể tìm hiểu kĩ hơn bạn có thể tham khảo tại [đây](https://angular.io/guide/testing).
## Running Your End-to-end (E2E) Tests
Angular CLI auto config Protractor cho bạn khi ứng dụng của bạn được tạo.<br>
Để chạy test E2E thì bạn chạy câu lệnh sau: `$ ng e2e`. Chúng ta có thể theo dõi màn hình command lines:
```
** NG Live Development Server is running on http://localhost:49152 **
Hash: e570d23ac26086496e1d
Time: 6087ms
chunk    {0} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 158 kB {4} [initial] [rendered]
chunk    {1} main.bundle.js, main.bundle.js.map (main) 3.62 kB {3} [initial] [rendered]
chunk    {2} styles.bundle.js, styles.bundle.js.map (styles) 9.77 kB {4} [initial] [rendered]
chunk    {3} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.37 MB [initial] [rendered]
chunk    {4} inline.bundle.js, inline.bundle.js.map (inline) 0 bytes [entry] [rendered]
webpack: Compiled successfully.
I/file_manager - creating folder /Users/jvandemo/Projects/test/my-app/node_modules/protractor/node_modules/webdriver-manager/selenium
I/downloader - curl -o /Users/jvandemo/Projects/test/my-app/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.29.zip https://chromedriver.storage.googleapis.com/2.29/chromedriver_mac64.zip
I/update - chromedriver: unzipping chromedriver_2.29.zip
I/update - chromedriver: setting permissions to 0755 for /Users/jvandemo/Projects/test/my-app/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.29
I/launcher - Running 1 instances of WebDriver
I/direct - Using ChromeDriver directly...
Spec started

  my-app App
    ✓ should display message saying app works

Executed 1 of 1 spec SUCCESS in 0.523 sec.
I/launcher - 0 instance(s) of WebDriver still running
I/launcher - chrome #01 passed
```
Trình duyệt theo đó cũng được khởi chạy:
![](https://images.viblo.asia/16b51494-928b-42b7-a318-db785fb26d24.png)
<br>
Các công việc mà Angular CLI thực hiện trong quá trình chạy test E2E:
1. Angular CLI sẽ tải `.angular-cli.json`.
1. Angular CLI chạy Protractor với cấu hình được chỉ định trong `.angular-cli.json`, mặc định là `protractor.conf.js` nằm trong folder gốc của ứng dụng.
1. Protractor mở trình duyệt được cấu hình. Trình duyệt mặc định là Google Chrome.
1. Protractor sẽ hướng Chrome chạy tất cả các tệp spec và dừng lại khi thực thi xong file `.e2e-spec.ts`.
1. Protractor báo cáo kết quả của quá trình chạy e2e trên màn hình command lines.
1. Quá trình sẽ tự đông exit sau bước số 5.

Nếu bạn muốn tìm hiểu thêm về E2E bạn có thể xem hướng dẫn tại [đây](https://angular.io/guide/testing) và document về Protractor tại [đây](http://www.protractortest.org/#/).
## Summary
Angular CLI là giao diện dòng lệnh (CLI) giúp tự động hóa việc develop.
Trong bài viết này mình đã giới thiệu tới các bạn:
1. Tạo một ứng dụng Angular mới.
1. Chạy server development với hỗ trợ LiveReload để xem trước ứng dụng trong quá trình phát triển.
1. Têm các feature cho ứng dụng Angular .
1. Chạy unit test.
1. Chạy test E2E.

Để tìm hiểu thêm về Angular CLI bạn có thể truy cập [website](https://cli.angular.io/) hay [GitHub](https://github.com/angular/angular-cli) nhé.