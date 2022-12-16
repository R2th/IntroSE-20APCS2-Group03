Xin chào tất cả các bạn, bài viết này mình xin chia sẻ một chút kiến thức mình tìm hiểu được về Router trong Angular, mong mọi người theo dõi.

### 1) Router trong Angular

- Angular Router là module được tích hợp sâu vào Angular, giúp bạn dễ dàng tạo các route cho ứng dụng.
- Thực hiện nhiệm vụ chính là chuyển trang, thay đổi một số thành phần mà không cần phải tải lại trang.

**1.1) Sử dụng Router trong Angular**

- Để sử dụng Router trong Angular ta cần :

    - Tại `index.html` ta cần thêm `<base href="/">`
    - Cần có một khu vực khai báo directive: `<router-outlet></router-outlet>` nơi này là phần các nội dung cần thay đổi
    - Cần phải import `RouterModule, Routes` từ `@angular/router`
- Khai báo router root cho ứng dụng : RouterModule.forRoot(array_routes : Routes)
- Phần tử trong array_routes sẽ là một object bao gồm tối thiểu :

    - **path** : Khai báo đường dẫn đến một component. VD: 'index', 'home' ...

        - Nếu khai báo **path** : `'**'` thì nếu không tìm thấy router thì sẽ load ra component tương ứng mà mình định nghĩa cho **path** này
      
    - **component** : Khai báo component

***Ví dụ***

- Mình sẽ tạo ra một project mới và đồng thời sẽ tạo ra hai component có tên là **HomeComponent**, **AboutComponent**

Đầu tiên ta vào file sau để tạo header và phần body (Phần này là phần các component được gọi ra tương ứng với router của nó)

**File app.component.html**

```html
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-ex1-collapse"
            >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="/index">Home</a></li> <!-- Gọi đến HomeComponent -->
                <li><a href="/about">About</a></li>  <!-- Gọi đến AboutComponent -->
            </ul>
        </div><!-- /.navbar-collapse -->
    </div>
</nav>

<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title"></h3>
                </div>
                <div class="panel-body">
                    <!-- Phần này là phần các component được gọi ra tương ứng với router của nó -->
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    </div>
</div>
```

Tiếp theo ta vào file **app.module.ts** khai báo và định nghĩa phần router cho project

**File app.module.ts**

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRouter : Routes = [
    {
        path : 'index',
        component: HomeComponent
    },
    {
        path : 'about',
        component: AboutComponent
    },
    {
        // khi một router nào được gọi mà không có trong phần appRouter thì NotFoundComponent được gọi ra
        path : '**',  
        component: NotFoundComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(appRouter)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

```
Giả sử bạn muốn tự động chuyển trang khi vào một router nào đó thì ta có thể khai báo như sau :
- path : 'tên_router'
- redirectTo: '/tên_router_khác'
- pathMatch: 'full' => cho router biết làm thế nào để khớp một URL đến cường dẫn của router. sẽ xảy ra lỗi nếu không khai báo

**FIle app.module.ts**

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRouter : Routes = [
    {
        // khi đường dẫn là '' thì nó sẽ được tự động gọi đến đường dẫn là '/index'
        path : '',
        redirectTo : '/index',
        pathMatch : 'full'
    },
    {
        path : 'index',
        component: HomeComponent
    },
    {
        path : 'about',
        component: AboutComponent
    },
    {
        path : '**',
        component: NotFoundComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(appRouter)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

```

Ở trên thì mình đang dùng `href="/index"` nên là khi mà click vào đó thì trang sẽ bị tải lại, để khác phục điều đó ta sẽ :
- sử dụng `[routerLink]="[/tên_router', params]"` Vd : `[routerLink]="[/home', 1]"` => '/home/1

**Ví dụ**

ta vào file **app.component.html** thay `href="/index` bằng `[routerLink]="['/index']"` xem sao

**File app.component.html**

```html
........
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a [routerLink]="['/index']">Home</a></li>
                <li><a [routerLink]="['/about']">About</a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div>
</nav>
........
```

Nếu bạn muốn thêm class **active** (hoặc thêm class_name khác) nếu router hiện tại trùng với router khai báo:

    -  `routerLinkActive='active'` (có thể thay thế active bằng một tên khác hoặc sử dụng nhiều class cùng một lúc 'active active1 active2')
    
**File  app.component.html**

```html
........
 <div class="collapse navbar-collapse navbar-ex1-collapse">
        <ul class="nav navbar-nav">
            <li routerLinkActive="active">
                <a [routerLink]="['/index']">Home</a>
            </li>
            <li routerLinkActive="active">
                <a [routerLink]="['/about']">About</a>
            </li>
        </ul>
</div>
........
```

**1.2) Chuyển trang bằng even binding**
Giả sử giờ mình sẽ không gọi trực tiếp đường dẫn ở các thẻ mà mình sẽ gọi nó thông qua một sự kiện nào đó

- Cần import Router từ `@angular/router`
- Sử dụng **navigate** : `.navigate(['tên_router', param])`
- hoặc sử dụng ** navigateByUrl('tên_router')**

**Ví dụ**

Ở file **app.component.html** mình tạo ra thêm hai button và cho nó có sự kiện click

**File app.component.html**

```html
........

<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title"></h3>
                </div>
                <div class="panel-body">
                    <!-- Phần này là phần các component được gọi ra tương ứng với router của nó -->
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    </div>
</div>

<button type="button" class="btn btn-primary" (click)="navigate('index')">Home</button>
<button type="button" class="btn btn-success" (click)="navigate('about')">About</button>
```

**File app.component.ts**

```js
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Router';

    constructor(
        public routerService : Router
    ) {}

    navigate(url : string) {
        // this.routerService.navigate([url]);
        this.routerService.navigateByUrl(url);
    }
}
```


**1.3) lấy tham số trên router**
- Để lấy được tham số trên router ta sử dụng ActivateRoute từ `@angular/router`
- Cú pháp: `.snapshot.params['tên_param_khai_báo_trong_router']` Ví dụ: '/home/:id' => 'id'

**Ví dụ**
ở file **app.module.ts** mình khai báo thêm một router

**File app.module.ts**

```js
........
const appRouter : Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'products/:id', // khai báo router này để lấy id từ trên router
        component: ProductDetailComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
........
```

Ở file **product-detail.component.html** mình sẽ hiển thị id mà mình lấy được

```html
<h1>Param {{ id ? id : ''}}</h1>
```

Ở file **product-detail.component.ts** mình sẽ lấy id từ trên router sau đó mình sẽ truyền qua cho **product-detail.component.html** để hiển thị lên

```js
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    public id : number = 0;

    constructor(
        public activatedRoute : ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
    }
}

```

**Kết luận**

Trên đây là một chút kiến thức mà mình tìm hiểu được về Router trong Angular. Cảm ơn mọi người đã theo dõi bài viết của mình.

**Nguồn tham khảo**

- https://angular.io/api/router