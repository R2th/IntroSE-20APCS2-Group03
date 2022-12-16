Trong bài viết này, tôi sẽ chia sẻ kinh nghiệm về việc lấy dữ liệu từ một URL trong ứng dụng Angular và các mẹo để tăng hiệu suất cho một trang web.


Thông thường chúng ta thường thấy hai loại URL trong ứng dụng Angular:
1. URL pattern `/heroes/:limit`. Ví dụ:` /heroes/20`
2. URL pattern `/heroes`. Ví dụ:` /heroes?limit=20`


Angular cung cấp các kỹ thuật khác nhau cho các cấu trúc URL này để lấy các thông tin cần thiết cho việc gọi API để tải dữ liệu cho trang hoặc thực hiện các hành động nhất định.
Ta sử dụng `route.snapshot.paramMap.get` khi điều hướng đến một trang khác.

Đầu tiên tôi muốn thảo luận về snapshot và paramMap là gì.

`Snapshot` là một hình ảnh tĩnh về thông tin router ngay sau khi component được tạo.

`ParamMap` là một tập các route parameter được trích xuất từ `URL`

Đây là một ví dụ về `routing module` của Angular. Bạn có thể xem ví dụ [**ở đây**](https://angular.io/tutorial/toh-pt5#extract-the-id-route-parameter):
```
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
```


Ví dụ này hiển thị trang danh sách `heroes`, khi nhấp vào tên hero sau đó sẽ điều hướng đến trang `hero detail`.


Tôi sẽ lấy được ID của hero từ URL và chuyển nó vào hero service để lấy dữ liệu từ máy chủ bằng dòng mã này:
![](https://images.viblo.asia/7910e565-7939-4d97-9140-b2f55b765f86.png)

Đây là cách chính thức để truy xuất dữ liệu từ URL. Bạn có thể đọc thêm tại đây trên trang chủ của Angular.
## Sử dụng Subscription cho URL thay đổi
`Subscription` là gì? Nó là là một đối tượng đại diện cho một tài nguyên dùng một lần, thường là việc thực thi một `Observable`.


Có một tình huống khi người dùng có thể nhấp vào một hero liên quan hoặc một đề nghị hero mới trên trang `hero detail`. Nó cũng chuyển hướng đến một trang hero detail nhưng với thông tin của hero khác nhau.

Bây giờ có vấn đề với `route.snapshot.paramMap.get`. Nó không hoạt động nữa:
![](https://images.viblo.asia/2812d738-a0f8-46bd-a986-155eef047179.gif)

`Snapshot`  là sự kiện chỉ được kích hoạt 1 lần sau khi component được tạo. Vì vậy, trên trang `hero detail`, nếu chúng tôi nhấp vào bất kỳ `hero` nào trong khu vực đề xuất, nó sẽ không hoạt động nữa vì `component` sẽ không được tải lại và ID của hero được lưu trữ dưới dạng giá trị cũ.

Có giải pháp thay thế nào không? Có. Sử dụng Subscription là một cách tuyệt vời để nhận biết khi tham số của URL thay đổi trong router hiện tại. Điều đó có nghĩa là có một liên kết hoặc nút mà chúng ta có thể điều hướng đến cùng một URL với các tham số khác nhau như ví dụ ở trên.
![](https://images.viblo.asia/8c1a70ec-e640-4b6d-adfc-7637341fcfc1.png)
Sau đó ta có thể thấy sự khác biệt:
![](https://images.viblo.asia/04f1c4cb-48ce-4a2e-9007-98d2f510858e.gif)

## Xử lý unsubscribe bởi RxJS
Sử dụng `Subscription` là một cách tuyệt vời để cập nhật giá trị ID của `hero` trong tham số URL. Tuy nhiên, Subscription có một phương thức quan trọng, unsubscribe, không có đối số và chỉ xử lý tài nguyên do `Subscription` nắm giữ:

**A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.**

Điều này có nghĩa là nó unsubscribe `Subscription` cuối cùng, điều mà rất quan trọng cho `Subscription` tiếp theo khi người dùng nhấp vào` hero suggestion`.

Vì lý do đó, tôi đã sử dụng switchMap với Subscriptionvì những ưu điểm của nó so với các toán tử khác. Nó sẽ chuyển sang một `observable`  mới và hủy bỏ observable trước đó.

Và đây là đoạn mã mới của hàm getHero:

![](https://images.viblo.asia/fc5d6e95-9a1e-4ae8-afa5-f4b9554e7910.png)

Khi hero là một `observable` thì trong template ta nên thêm một pipe không đồng bộ để làm việc với observable.

![](https://images.viblo.asia/ac374bab-156c-4427-af32-39c784680b43.png)

Và lợi ích ở đây là gì?

Trên trang `hero detail`, một yêu cầu HTTP được gọi bên trong `Subscription`. Trong khi yêu cầu HTTP tham số thay đổi. Điều đó có nghĩa là `subscription` mới sẽ được tạo với yêu cầu HTTP mới. 

Ở đây `switchMap` giúp ta hủy `Subscription` và `request` cuối cùng, sau đó tạo một request mới. Ở đó, hiệu suất sẽ được cải thiện.


Dưới đây là màn test hiệu năng:

Kịch bản:
![](https://images.viblo.asia/4ab61c97-3d4d-4289-80bf-c7ccebde49a6.gif)

* Subscription không sử dụng switchMap:
![](https://images.viblo.asia/51caddbf-95ab-4a86-b682-ba9e02dd80db.png)

* Và  Subscription sử dụng switchMap:
 ![](https://images.viblo.asia/ad9040bd-99cc-4759-a7a8-1d4c2fe461fe.png)


Sau một vài lần nhấp vào UI, thời gian để chạy tập lệnh với switchMap ít hơn là không sử dụng switchMap.

## Lấy giá trị với queryParamMap

`queryParamMap` giống như `paramMap`. Sự khác biệt ở đây là sử dụng nó để xử lý một URL như `/heroes?limit=5`.

Các tham số này không được khai báo tại `routing` của ứng dụng Angular.

Bây giờ ta sửa lại method `getHeroes`:
![](https://images.viblo.asia/1baf4f1b-91eb-4d5e-9e6b-2bbc026c0586.png)

Trang heroes  bây giờ sẽ hiển thị số lượng hero theo tham số giới hạn từ URL, chẳng hạn: `/heroes?limit=5`

## Tổng kết

Bài viết này đã phác thảo một số kỹ thuật để lấy tham số từ URL. Nó phụ thuộc vào từng trường hợp. Sử dụng `route.snapshot.paramMap.get` khi đi từ trang này sang trang khác hoặc `Subscription` với `switchMap` nếu tham số có thể thay đổi trong cùng một route.

Đôi khi tham số không được xác định tại routing, vì vậy ta sử dụng `queryParamMap` thay vì `paramMap`

Tài liệu tham khảo: 

https://angular.io/

https://levelup.gitconnected.com/all-you-need-to-know-about-angular-parameters-309828b30826