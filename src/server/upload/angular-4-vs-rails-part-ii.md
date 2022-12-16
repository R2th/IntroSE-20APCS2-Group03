Tiếp nối phần một của bài viết [**Angular 4 vs Rails**](https://viblo.asia/p/angular-4-vs-rails-3P0lPyV85ox). Hôm nay mình xin phép tiếp tục chia sẻ với mọi người những vấn đề mà team mình gặp phải khi thực hiện nghiên cứu base với Angular 4 và Rails (trước khi bị bỏ và quay về với ERB thuần :sweat_smile:).

## Angular routes

Vấn đề về router ở đây là gì. Là chúng ta đang sử dụng song song giữa router của Rails và Angular. Mặc định, khi bạn dùng một mình Angular thì bạn có thể sử dụng router bình thường kiểu có dạng http://localhost:4200/login (sẽ gọi đến LoginComponent - hoặc đại loại thế), nhưng khi dùng song song với cả Rails, nếu chúng ta dùng dấu `/login` này trình duyệt sẽ hiểu là chúng ta đang gọi lên server, và sẽ thực hiện gọi router `/login` của Rails. Dẫn đến lỗi. Vậy chúng ta phải xử lý như thế nào? Vâng, chúng ta sẽ cài đặt cho Angular dùng hash router (khi có dấu # đằng trước một đường dẫn mà chúng ta gọi, trình duyệt sẽ hiểu đó là đi đến một anchor nội tại trong trang chứ không phải là một đường dẫn request lên server. Nghe có vẻ khó hiểu nhỉ :confused:, các bạn có thể đọc thêm [**tại đây**](https://www.rapidtables.com/web/html/link/html-anchor-link.html) để hiểu thêm (do mình không biết phải mô tả như thế nào cả :sweat:)! Hay chúng ta cùng thực nghiệm luôn nhỉ? OK, giờ vào cấu hình Angular router với cài đặt mặc định mà không sử dụng hash xem sao nhé.

Chúng ta sử dụng luôn `RegisterComponent` ở phần trước để test nhé. Đầu tiên, tạo một file chứa các routes ở đường dẫn `angular/src/app/app.routings.ts`

```typescript
import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core/src/metadata/ng_module";
import { RegisterComponent } from "./components/register/register.component";

export const AppRoutes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  }
];
export const AppRoutings: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
```

Tiếp, chúng ta update lại file `angular/src/app/app.module.ts`

```typescript
// ...
import { RouterModule } from "@angular/router";
import { AppRoutings } from "./app.routings";
// ...

@NgModule({
    // ...
    imports: [
        // ...
        AppRoutings
    ]
    // ...
});
```

Tiếp, update lại file `angular/src/app.component.html` với việc xóa `<app-register></app-register>` và thêm:

```html
<a routerLink="/register">{{ "index.register" | translate }}</a>

<router-outlet></router-outlet>
```

Cuối cùng, chúng ta cùng test nhé. Lần đầu, chúng ta không dùng song song với Rails là chạy lệnh `bundle exec rake dev:start` mà chạy thông qua Angular với lệnh:

```
cd angular/ && ng serve -dop false -aot true
```

Sau khi đợi Angular build xong, chúng ta mở trang http://localhost:4200/register xem kết quả. Sau khi xong, giờ chúng ta thử giữa việc dùng song song giữa Rails và Angular với lệnh `bundle exec rak dev:start` và mở http://localhost:3000/register xem sao nhé :smiley:!

Vậy, chúng ta sẽ sử dụng hash trong Angular router để giải quyết vấn đề này. Nó sẽ có link dạng: http://localhost:3000/#/register. Chúng ta chỉ cần thêm một cài đặt là `useHash` vào `angular/src/app/app.routings.ts` để chia riêng rẽ router local và router server:

```typescript
export const AppRoutings: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {
  useHash: true
});
```

Bây giờ bạn có thể chạy lại lệnh: `bundle exec rake dev:start` để xem kết quả nhé :D!

Bây giờ chúng ta sang phần tiếp theo là dynamic layout nhé!

## Dynamic layout

Vấn đề dynamic layout ở đây là gì. Nghĩa là trang của chúng ta có nhiều hơn một layout chung như: layout cho admin, layout cho user, layout trang contact, layout trang login, ...! Ở đây, chúng ta chỉ xét trường hợp hai layout là trang register và layout cho trang chủ chứa link đến trang register nhé. Đầu tiên, chúng ta thêm bằng tay thư mục `_layout` ở `angular/src/app` để chứa layout cho trang sau khi đã login. Tiếp, chúng ta tạo các component cơ bản của một layout. Đầu tiên là header:

```
cd angular/ && ng g component ./_layout/site-header -is true --spec false
```

Rồi thêm một HTML đơn giản vào file `angular/src/app/_layout/site-header/site-header.component.html`:

```html
<h1>Angular 4 vs Rails</h1>
```

Tiếp theo là footer:

```
cd angular/ && ng g component ./_layout/site-footer -is true --spec false
```

Và thêm nội dung sau vào `angular/src/app/_layout/site-footer/site-footer.component.html`:

```html
<div>
  <p>
    Copyright &copy;2018. All rights reserved
  </p>
</div>
```

Tiếp, chúng ta tạo một layout để chứa hai component header và footer ở trên:

```
cd angular/ && ng g component ./_layout/site-layout -is true --spec false
```

Và thêm HTML sau vào `angular/src/app/_layout/site-layout/site-layout.component.html`:

```html
<app-site-header></app-site-header>
<router-outlet></router-outlet>
<app-site-footer></app-site-footer>
```

Tiếp, chúng ta tạo một component sẽ chứa link tới trang register (component mà chúng ta đã tạo ở phần I) với layout khác biệt

```
cd angular/ && ng g component ./components/dashboard -is true --spec false
```

Nội dung của file `angular/src/app/components/dashboard/dashboard.component.html`:

```html
<div>
  <a routerLink="/register">{{ "index.register" | translate }}</a>
</div>
<div>
  <p>Home component</p>
</div>
```

Sau khi xong, chúng ta thực hiện update lại routes tại file `angular/src/app/app.routings.ts` với nội dung sau:

```typescript
// ...
import { SiteLayoutComponent } from "./_layout/site-layout/site-layout.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: SiteLayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
        pathMatch: "full"
      }
    ]
  },
  {
    path: "register",
    component: RegisterComponent
  }
];
```

Cuối cùng, chúng ta update lại file `angular/src/app/app.component.html` với nội dung chỉ duy nhất một thẻ `router-outlet`:

```html
<router-outlet></router-outlet>
```

OK, bây giờ bạn có thể chạy lại `bundle exec rake dev:start` và truy cập vào http://localhost:3000 rồi click vào **Register** để test. Problem resolved :satisfied:!

Bây giờ chúng ta sang phần cuối, đó là tương tác với Rails API.

## Interactive with Rails API

Để làm ví dụ này, chúng ta sẽ quay lại bên Rails nhé. Tạo một migration đơn giản và seed dữ liệu cho nó để test. Đầu tiên tạo migration trước:

```
rails g model post --migration
```

Nội dung file migration:

```ruby
class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :description
      t.string :author
      t.text :content
      t.timestamps
    end
  end
end
```

Tiếp theo, thêm gem `faker` vào `Gemfile` và tạo seed dữ liệu. Nội dung file seed như sau:

```ruby
(1..10).each do |idx|
  f = Faker::Lorem

  Post.create(title: f.sentence, description: f.sentence(20), content: f.paragraph(rand(20..40)),
    author: Faker::Name.name)
end
```

Sau khi xong, chúng ta thực hiện migrate và seed dữ liệu:

```
 bundle exec rake db:migrate
 bundle exec rake db:seed
```

Xong phần data và model, chúng ta sang phần controller. Tạo controller trả tất bài viết:

```
rails g controller api/v1/posts
```

Nội dung file `posts_controller.rb` đơn giản như sau:

```ruby
class Api::V1::PostsController < ApplicationController
  def index
    render json: Post.all
  end
end
```

Cuối cùng là router. Chúng ta update lại file `config/routes.rb`:

```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts
    end
  end
end
```

Vậy là xong phần phía Rails. Giờ chúng ta quay lại phần Angular nhé. Chúng ta sẽ dùng luôn `DashboardComponent` để hiển thị danh sách post mà chúng ta sẽ lấy từ Rails API cho đỡ mất công. Và phần này sẽ dùng đến `HttpClientModule` để sinh request. Do chúng ta đã khai báo và sử dụng nó ở phần I18n rồi nên không cần phải thực hiện cấu hình gì nữa. Chúng ta bắt tay vào thực hiện get dữ liệu luôn. Đầu tiên là mở file `angular/src/app/components/dashboard/dashboard.component.ts` và update lại nội dung sau:

```typescript
// ...
import { HttpClient } from "@angular/common/http";

export class DashboardComponent implements OnInit {
  posts: any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get("/api/v1/posts")
      .subscribe(res => { this.posts = res })
  }

}
```

Tiếp, chúng ta mở file `angular/src/app/components/dashboard/dashboard.component.html` và thực hiện show dữ liệu:

```html
<div>
  <table border="1" width="100%">
    <thead>
      <tr>
        <th>{{ "dashboard.id" | translate }}</th>
        <th>{{ "dashboard.title" | translate }}</th>
        <th>{{ "dashboard.description" | translate }}</th>
        <th>{{ "dashboard.author" | translate }}</th>
        <th>{{ "dashboard.content" | translate }}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let post of posts">
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.description }}</td>
        <td>{{ post.author }}</td>
        <td>{{ post.content }}</td>
      </tr>
    </tbody>
  </table>
</div>
```

Vậy là xong. Bây giờ bạn có thể truy cập vào http://localhost:3000/ để xem kết quả :smiley:!

# Lời kết

Đến đây là kết thúc bài viết chia sẻ về việc kết hợp giữa Rails và Angular 4 mà bọn mình đã nghiên cứu trong thời gian khá ngắn. Hiện vẫn còn khá nhiều vấn đề khác nhưng bọn mình chưa kịp động tới đã phải dừng lại. Hy vọng rảnh mình sẽ tìm hiểu thêm như áp dụng một HTML template (như AdminLTE chả hạn) vào ứng dụng. Hoặc là việc login với Devise Token Auth (mình đang đọc bài viết [**này**](https://medium.com/@avatsaev/angular-2-and-ruby-on-rails-user-authentication-fde230ddaed8) nhưng chưa kịp thử). Hẹn gặp lại mọi người sau (ở chủ đề này - nếu có thể :sweat_smile:). See you :wave:!

Source code: https://github.com/namnv609/angular4-with-rails-5

> Original post: https://namnv609.cf/posts/angular-4-with-rails-part-ii.html