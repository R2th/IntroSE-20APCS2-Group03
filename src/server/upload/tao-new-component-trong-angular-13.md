Trong bài viết này, mình sẽ chia sẻ cách tạo một new component trong ứng dụng angular 13. Chúng ta sẽ sử dụng command ng để tạo component nhé.<br>
Khi bạn tạo một component  bằng việc sử dụng command angular cli , chúng sẽ tạo một new folder với 4 files và chúng sẽ đăng ký tên component đó trong file moduler.ts.<br>

**Create New App:**<br>
Nếu bạn chưa tạo ứng dụng thì hãy tạo ứng dụng angular bằng command sau:
```
ng new first-app
```

**Create New Component:**<br>
Bạn sử dụng command bên dưới để tạo một new component:<br>
```
ng g c favorite
```

Sau khi chạy command, component được tạo như ảnh: <br>
![](https://images.viblo.asia/3b9bb187-fe61-4548-afb4-e8f1a86edf56.png)

Bây giờ bạn có thể thay đổi nội dung các files trong component favorite:<br><br>
**app/favorite/favorite.component.html**<br>
Bạn có thể  viết code html<br>
```
<h1>This is simple creating component Example</h1>
   
<p>favorite works!</p>
```

**app/favorite/favorite.component.css**<br>
Bạn có thể  viết code css<br>
```
p{ color:red }
```

**app/favorite/favorite.component.ts**<br>
Bạn có thể  viết code logic<br>
```Javascript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

```

Sau khi component được tạo, bạn sẽ thấy FavoriteComponent được tự động thêm vào phần **declarations** trong file app.module.ts <br>
```Javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
  declarations: [
    AppComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Bây giờ bạn có thể sử dụng FavoriteComponent ở bất kỳ đâu, mình sẽ thêm FavoriteComponent vào app.component.html để test nhé:<br><br>
**app/app.component.html**<br>
```
<app-favorite></app-favorite>
```

**Chạy ứng dụng angular:**<br>
Sau khi hoàn thành chỉnh sửa, bạn phải chạy command sau để chạy ứng dụng nhé:<br>
```
ng serve
```
Mở link sau trên trình duyệt:<br>
```
http://localhost:4200
```
Bạn sẽ thấy màn hình hiển thị như bên dưới:<br>
![](https://images.viblo.asia/21f53a47-4b76-45b6-871d-45102ec178c4.png)

Ngoài ra, bạn cũng có thể tạo new component bên trong một số thư mục. Ví dụ:<br>
```
ng g c admin/users
```
![](https://images.viblo.asia/3ca4690e-832c-4ebe-9195-482e97c559c8.png)