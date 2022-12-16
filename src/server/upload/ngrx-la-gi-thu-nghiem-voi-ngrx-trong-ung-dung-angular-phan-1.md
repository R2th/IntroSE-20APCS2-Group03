# 1.Giới Thiệu
NgRx là 1 framework được xây dựng để phát triển "Reactive Applications" trong 1 ứng dụng Angular.Về cơ bản NgRx cung cấp cho chúng ta các tác vụ như state management,isolation of side effects,entity collection management ...Với NgRx chúng ta có thể xây dựng 1 Angular app với khả năng duy trì và mở rộng rất cao.

# 2. Ưu và Nhược Điểm
### Ưu điểm
* **single source of truth** - tất cả các State của ứng dụng sẽ được lưu ở 1 "Object tree" duy nhất.Vì vậy việc chia sẻ State giữa các Component trở lên rất dễ dàng.
* **testability** - hầu hết mọi thứ trong NgRx đều sử dụng Pure Function nên việc test cũng là rất dễ dàng .
* **scaleable** với NgRx việc "scale" ứng dụng sẽ trở nên đơn giản hơn bởi vì cấu trúc trong Ngrx là rất rõ ràng.

### Nhược điểm
* Thời gian phát triển lâu
* Cần nắm vững kiển thức về RxJs - Observable
# 3.Cách Hoạt Động
NgRx bao gồm 4 thành phần chính :
1.     Store - nơi chứa các State.
2.     Action - thể hiện các hành động ,thao tác khi muốn thay đổi State
3.     Reducer - thực việc chuyển đổi State từ trạng thái này sang trạng thái khác.
4.     Selector - thể hiện vùng chọn của các State được lưu trữ trong Store

Đó là 4 thành phần chính của NgRx và còn thêm nhiều các khái niệm khác như Effects,Adapter... mình sẽ nói ở các bài
tiếp theo.Bây giờ cùng tìm hiểu xem cách hoạt động của NgRx như thế nào nhé !

### Diagram :
### ![](https://images.viblo.asia/e5abb237-424e-4387-b344-1e482115b545.png)

Giả sử điểm bắt đầu là Components và kết thúc là Store và từ Component chúng ta muốn lấy ra State trong Store thì các bước hoạt động 
của nó sẽ như sau :
1. Từ Component chúng ta tương tác với Reducer thông qua Action
2. Từ Action, Reducer sẽ làm 1 công việc tương ứng với Action đó
3. Từ Reducer, State sẽ được đẩy vào Store
5. Từ Store, Component muốn lấy ra State  thông qua Selector

Tư tưởng chính của việc sử dụng NgRx sẽ là có 1 Store chứa dữ liệu và Store này là duy nhất.Tất cả Component,Service trong ứng dụng sẽ 
dùng chung dữ liệu đó !
# 4.Cài Đặt
  Cài đặt thông quan Npm  
  
```
  $ npm install @ngrx/store --save
```
Sau đó chúng ta cập nhật lại app.module.ts như sau:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Chúng ta đã tiền hành cài đặt xong,rất đơn giản đúng không ? .Ở bài viết này mình sẽ chỉ dừng lại ở việc giới thiệu và cài đặt NgRx.Ở các bài viết tiếp theo mình sẽ làm các ví dụ để các bạn dễ hiểu hơn.