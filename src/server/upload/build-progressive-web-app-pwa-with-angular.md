Trong bài viết này, chúng ta sẽ sử dụng phiên bản gần đây nhất của Angular (Angular 9) để xây dựng  một ứng dụng Progressive Web Application (PWA) đơn giản.  Ứng dụng sẽ lấy ra thông tin người dùng và hiển thị dưới dạng bảng, có phân trang.
![](https://images.viblo.asia/9b9fb8c8-d1e7-4527-9cfa-13608eda6224.png)


# PWA là gì ?
PWA (viết tắt của Progressive Web Apps) là một thuật ngữ để biểu thị cho phương pháp tiến bộ phát triển phần mềm. PWA sử dụng
khả năng của một website hiện đại để cung cấp 1 trải nghiệm như là 1 ứng dụng gốc đến với người dùng 

PWA có nhiều tính năng nổi bật như hỗ trợ ứng dụng web chạy ngoại tuyến và giúp ứng dụng web trông như một ứng dụng gốc bằng cách sử dụng service worker, dễ dàng tiếp cận với người dùng bằng chức năng thêm vào màn hình chính của Web App Manifest, Push Notification…Nhiều framework đã tích hợp với PWA như Angular, React, Polymer, Ember...


# Cấu hình và cài đặt Angular
Tại bước này, chúng ta sẽ cấu hình Angular project cho demo của chúng ta.
Đầu tiên, hãy bắt đầu với việc cài đặt bản Angular CLI mới nhất nhé.

```
npm install -g @angular/cli@latest
```
Giờ thì bắt đầu cài ứng dụng Angular
```
ng new angular-pwa
```
Truy cập vào folder chứa ứng dụng vừa tạo

```
cd angular-pwa
```
# Thêm thư viện Angular Material
Việc thêm thư viện Material vào Angular thực sự rất dễ dàng, bạn có thể hoàn thành nó chỉ bằng một lệnh sau: 


```
ng add @angular/material
```
Thêm theme trong `src/styles.css`

```
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```



Thông thường, chúng ta sẽ import các compoent của angular material trong AppModule. Nhưng ở đây sẽ có một chút thay đổi, chúng ta sẽ tạo một file module riêng cho các component material và import chúng vào đó. Sau đó import file này vào file AppModule chính.

Việc này sẽ giúp việc quản lý các material component trở nên chặt chẽ, có tổ chức hơn. Chúng ta sẽ hiển thị dữ liệu người dùng vào bảng của angular material.
Tạo file `app/material.module.ts`  và thêm đoạn code sau:
```js

import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule
    ],
    exports: [
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule
    ]
})

export class MaterialModule { }
```
Tiếp theo, import `MaterialModule`  vào  file `app.module.ts ` như dưới đây

```js
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

/* angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
```
# Xây dựng REST API sử dụng HttpClient
Ở bước này, chúng ta sẽ tạo angular service để fetch dữ liệu từ remote server sử dụng REST API
Để sử dụng HTTP request, bạn cần import và đăng ký HttpClientModule service trong app.module.ts file.

```js
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
   ]
})
```

Giờ là bước generate service. Với Angular, bạn chỉ cần chạy lệnh ở dưới là service sẽ tự động được tạo: 

```
ng g service rest-api
```
Tiếp theo, chúng ta sẽ viết logic để lấy dữ liệu người dùng bằng cách sử dụng  JSONPlaceholderAPI
Mở file `app/rest-api.service.ts` và thêm nội dung như sau:
```js

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: string;
  name: string;
  email: string;
  website: string;
}

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  api: string = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api)
  }
}
```
Đoạn code trên sẽ giúp chúng ta lấy user data bằng cách sử dụng `HttpClient` service như một `Observable` từ phương thức `getUsers()`.
Tiếp theo, thêm phần service vào  file `app/app.component.ts`  như bên dưới.
```js

import { Component, ViewChild } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface TableElement {
  id: string;
  name: string;
  email: string;
  website: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  Data: TableElement[];
  col: string[] = ['id', 'name', 'email', 'website'];
  dataSource = new MatTableDataSource<TableElement>(this.Data);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private restApiService: RestApiService) {
    this.restApiService.getUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<TableElement>(res);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

}
```
Vậy là chúng ta đã hoàn thành việc import RestApiService trong AppComponent để fetch dữ liệu user. Giờ là bước hiển thị chúng ta màn hình.

Tại đây, chúng ta sẽ dựng UI của app sử dụng angular material table.  Mở file `app.component.html `để tạo layout gồm có navbar và bảng với phân trang.
```html

<mat-toolbar color="accent" class="header">
  <span>Angular PWA Example</span>
</mat-toolbar>

<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> ID. </th>
    <td mat-cell *matCellDef="let element"> {{element.id}} </td>
  </ng-container>

  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>

  <ng-container matColumnDef="email">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>
    <td mat-cell *matCellDef="let element"> {{element.email}} </td>
  </ng-container>

  <ng-container matColumnDef="website">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Website </th>
    <td mat-cell *matCellDef="let element"> {{element.website}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="col"></tr>
  <tr mat-row *matRowDef="let row; columns: col;"></tr>
</table>

<mat-paginator [pageSizeOptions]="[7, 14, 28]" showFirstLastButtons></mat-paginator>
```
# Thêm PWA vào Angular
Rất dễ dàng để chuyển đổi một ứng dụng angular có sẵn thành Progressive Web App (PWA). Lệnh “ng add angular pwa” sẽ hiện thực hoá việc này

```
ng add @angular/pwa
```
Dòng lệnh ở trên sẽ tự động thêm các file PWA và tính năng vào ứng dụng Angular
* File manifest.webmanifest
* ngsw-config.json service worker
* Các icons với đa dạng kích thước trong thư mục assets/icons

File “index.html” sẽ được thêm các thẻ meta và thuộc tính theme color như dưới đây
```

  <link rel="manifest" href="manifest.webmanifest">
  <meta name="theme-color" content="#1976d2">
```

# Service Workers trong Angular


Service Worker là một tập lệnh hoạt động ở chế độ nền và phù hợp với hầu hết các trình duyệt hiện đại.

Service Worker  làm việc với HTTPS và hoạt động tương tự như Web Workers thực hiện nhưng cũng có một số bất lợi. Progressive Web Application coi service workers là công nghệ cốt lõi. Nó cho phép tích hợp nền tảng sâu, như hỗ trợ ngoại tuyến, đồng bộ hóa nền, bộ nhớ đệm phong phú và thông báo (push notifications).

Lệnh “ng add angular pwa”  được chạy đã tạo ra tệp `ngsw-config.json`. Nó chỉ chịu trách nhiệm service workers. 
Đồng thời, service workers cũng đã được tự động thêm vào file `app.module.ts`.

// app.module.ts
```js

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [...],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [...],
  bootstrap: [...],
  schemas: [...]
})

export class AppModule { }
```
Còn đây là file ngsw-config.json.

// ngsw-config.json

```
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    }, {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)"
        ]
      }
    }
  ]
}
```

Lệnh “ng add angular pwa” cũng tự động đăng ký service-worker vào trong package.json file:

// package.json

```
{
  "dependencies": {
    ...
    "@angular/service-worker": "~8.2.14"
    ...
  }
}
```
# Cấu hình Production với http-server
Cài đặt http-server global từ  NPM

```
sudo npm install -g http-server
```
> http-server rất đơn giản, cấu hình dễ dàng, thường dùng để testing, phát triển ở local hoặc mục đích nghiên cứu.
> 
> – http-server

Để build ứng dụng cho môi trường production, chạy lệnh sau

```
ng build --prod
```
Sau khi chạy lệnh, bản sẽ có bản build trong folder dist/angular-pwa. Tiếp theo, chúng ta sẽ chạy ứng dụng angular PWA sử dụng http-server

Vào trong thư mục prod build

```
cd dist/angular-pwa
```
Để chạy lên bản build, thực hiện dòng lệnh sau:

```
http-server -o
```
Lệnh trên sẽ mở angular app theo đường dẫn http://127.0.0.1:8080 và lúc này bạn đã một app build hoàn chỉnh rồi đó.


# Kiểm tra PWA App với Lighthouse
Chúng ta sẽ verify ứng dụng PWA bằng cách sử dụng Lighthouse extension trên Google Chrome.
Đầu tiên, mở app trên Chrome bằng cách truy cập vào đường dẫn: http://127.0.0.1:8080

Cài đặt light house extension từ [chrome web store](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en)

Tiếp theo, mở browser console bằng cách sử dụng Ctrl + Shift + I, hoặc mở DevTools, vào tab Audits. Lúc này bạn sẽ thấy kết quả của việc config ứng dụng với PWA
![](https://images.viblo.asia/94df7f00-8849-4b34-82a3-50401ce54687.png)

# Tổng kết
Cuối cùng, chúng ta cũng đã hoàn thành việc tạo 1 ứng dụng Angular 9 PWA. Tổng kết lại thì bài viết đã nhắc đến một số vấn đề sau:
* Làm thế nào để chuyển đổi ứng dụng angular có sẵn thành PWA?
* Làm thế nào để thêm các tính năng PWA vào ứng dụng Angular?
* Cách hoạt động với Service Workers?
* Cách để kiểm tra PWA app với Google’s Lighthouse extension?

Bạn có thể download bản demo tại [đây](https://github.com/trangnt58/angular-pwa).

Cảm ơn các bạn đã theo dõi bài viết. Hy vọng nó sẽ giúp ích cho các bạn.

Nguồn: https://www.positronx.io/build-progressive-web-app-pwa-with-angular/