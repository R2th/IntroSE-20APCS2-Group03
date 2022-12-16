Bài viết này mình sẽ chia sẽ với các bạn 10 tính năng hữu ích của angularjs mà có thể bạn chưa biết

## Title
Nếu bạn cần thay đổi `title` cho web pages của bạn, thì bạn có thể sử dụng `Title service` bên trong component `@angular/platform-browser`

```js
import { Title } from "@angular/platform-browser"
@Component({
    ...
})
export class LoginComponent implements OnInit {
    constructor(private title: Title) {}
    ngOnInit() {
        title.setTitle("Login")
    }
}
```

Trình duyệt của bạn sẽ đổi tiêu đề của trang thành `Login`

## Meta

Thay đổi nội dung của các thẻ meta, tương tự với thẻ title thì chúng ta cũng dễ dàng thay đổi nội dung của  các thẻ meta, nó sẽ giúp cho website của chúng ta thân thiện hơn với các `search engine`

```js
import { Meta } from "@angular/platform-browser"
@Component({
    ...
})
export class BlogComponent implements OnInit {
    constructor(private meta: Meta) {}
    ngOnInit() {
        meta.updateTag({name: "title", content: ""})
        meta.updateTag({name: "description", content: "Lorem ipsum dolor"})
        meta.updateTag({name: "image", content: "./assets/blog-image.jpg"})
        meta.updateTag({name: "site", content: "My Site"})
    }
}
```

## Location

Nếu bạn cần `back` lại trang trước đó, hay lấy URL hiện tại của browser thì có thể sử dụng `service localtion` trong `CommonModule`

```js
import { Location } from "@angular/common"
@Component({
    ...
})
export class AppComponent {
    constructor(private location: Location) {}
    navigateTo(url) {
        this.location.go(url)
    }
    goBack() {
        location.back()
    }
    goForward() {
        location.forward()
    }
}
```

## Document

Đôi khi chúng ta cần lấy các thẻ html trong 1 DOM ra để thao tác với các DOM, angular cung cấp cho chúng ta một function `getElementById` để có thể lấy DOM ra để thao tác với chúng

```js
@Component({
})
export class CanvasElement {
    constructor(@Inject(DOCUMENT) _doc: Document) {}
    renderCanvas() {
        this._doc.getElementById("canvas")
    }
}
```

## Attribute decorator

`Attribute decorator` cho phép chúng ta pass một `static string` mà không làm ảnh hưởng đến hiệu năng  của ứng dụng, với `Attribute decorator` thì angular sẽ không cần kiểm tra sự thay đổi của biến static này nữa, bạn cũng không thể thay đổi biến này trong tương lai.

```js
@Component({
    ...
})
export class BlogComponent {
    constructor(@Attribute("type") private type: string ) {}
}
```

## HttpInterceptor

Đây là một tính năng khá mạnh mẽ của angular, nó cho phép bạn chặn một `HttpRequest` và xử lý chúng, giả sử bạn bạn code fontend mà chưa có api backend bạn có thể dùng chúng để fake backend data.

Nó thường được sử dụng trong: Authentication, Caching, Fake backend, URL transformation, Modifying headers

Giả sử bạn cần mock backend:

```js
@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        ...
    }
}
```

sau đó trong module bạn import class mock này vào

```js
@NgModule({
    ...
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockBackendInterceptor,
            multi: true
        }
    ]
    ...
})
export class AppModule {}
```

Khi bạn có 1 http request đến server nó sẽ chạy vào class  MockBackendInterceptor của bạn ở trên, bạn có thể return bất kỳ một chuối data nào trong đó cũng được.

## AppInitializer

Đôi khi chúng ta muốn một đoạn code được chạy khi ứng dụng Angular khởi động, có thể tải một số cài đặt, bộ nhớ cache, cấu hình hoặc thực hiện một số đăng ký gì đó. `AppInitialzer` sẽ giúp giải quyết điều đó. APP_INITIALIZER sẽ được thực thi khi ứng dụng angular được khởi tạo

Đầu tiên khai báo một function mà bạn muốn nó khỏi chạy đầu tiền:
```js
function runSettingsOnInit() {
    ...
}
```

sau đó gọi function đó trong module chính của bạn:

```js
@NgModule({
    providers: [
        { provide: APP_INITIALIZER, useFactory: runSettingsOnInit }
    ]
})
```

Khi component chính này được khởi tạo, nó sẽ chạy vào function `runSettingsOnInit` của bạn ở bên trên

## Bootstrap Listener

Cũng giống với AppInitializer, angular cung cấp cho chúng ta thêm 1 fucntion có thể lắng nghe `1 component` được khởi tạo (bootstrapped). Mỗi khi component khởi chạy thì nó sẽ callback đến 1 function mà bạn chỉ định

```js
@NgModule({
    {
        provide: APP_BOOTSTRAP_LISTENER, multi: true, 
        useExisting: runOnBootstrap
    }
    ...
})
export class AppModule {}
```

Mỗi khi compenent này được boot thì function `runOnBootstrap` sẽ được gọi

## NgPlural

Phần này giúp bạn hiển thị message đúng ngữ pháp số ít hay số nhiều trong tiếng anh. một số website sẽ đặt (s) ở trong hoặc like:

```js
1 component(s) removed
3 component(s) removed
```

NgPlural sẽ giúp bạn xác định component là số ít hay nhiều


```js
<p [ngPlural]="components">
    <ng-template ngPluralCase="=1">1 component removed</ng-template>    
    <ng-template ngPluralCase=">1">{{components}} components removed </ng-template>    
</p>
```

cũng gần giống như bạn check if :), nó chỉ giúp bạn `switch expression` , phần này sẽ hiển thị thành

```js
// nếu có 1 component
1 component removed
// nếu có 5 components
5 components removed
```

## Tham khảo

- https://blog.bitsrc.io/10-useful-angular-features-youve-probably-never-used-e9e33f5c35a7