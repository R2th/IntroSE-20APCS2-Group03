Angular framework luôn đi kèm với một số tính năng được tích hợp sẵn và rất hữu ích để xử lý việc authentication cho ứng dụng của bạn. Chẳng hạn như [HttpInterceptor interface](https://angular.io/api/common/http/HttpInterceptor), route guard. Trong bài viết này, mình sẽ giới thiệu cho các bạn về Angular’s route guards cũng như làm thế nào để sử dụng chúng để xác thực cho một ứng dụng Angular.
# Route guards là gì?
Angular's route guards là các interface có thể cho bộ định tuyến biết liệu nó có cho phép điều hướng đến một route được yêu cầu hay không. Nó đưa ra quyết định này bằng cách tìm kiếm một giá trị trả về true hoặc false từ một lớp được implement từ `guard interface`.

Có 5 loại guards khác nhau và mỗi loại được gọi theo một trình tự cụ thể. Hành vi của bộ định tuyến được điều chỉnh khác nhau tùy thuộc vào guard nào được sử dụng. Các loại đó là:
* CanActivate
* CanActivateChild
* CanDeactivate
* CanLoad
* Resolve

Các bạn có thể xem chi tiết hơn ở đây: [Angular docs](https://angular.io/guide/router#milestone-5-route-guards)

# Quyết định định tuyến dựa trên thời gian hết hạn của token
Nếu bạn sử dụng **JSON Web Token (JWT)** để đảm bảo ứng dụng của bạn (và tôi khuyên bạn nên làm), một cách để đưa ra quyết định về việc có cho truy cập vào một route hay không là kiểm tra thời gian hết hạn của token. Nó giống như việc bạn sử dụng JWT để cho phép người dùng của bạn truy cập vào các tài nguyên được bảo vệ bên phía backend. Khi token hết hạn, đây là dấu hiệu cho thấy người dùng đang không được xác thực và không được phép truy cập.

Tạo một phương thức trong `authentication service` của bạn để kiểm tra xem người dùng có được xác thực hay không. Một lần nữa xác thực dựa trên trạng thái của JWT là vấn đề liệu JWT đã hết hạn hay chưa. Và lớp **JwtHelperService** ở trong **angular2-jwt** có thể được sử dụng cho việc này.

Ta cài đặt như sau:

```
npm install --save @auth0/angular-jwt
```

Sử dụng angular-jwt ở trong AuthService của bạn:
```
// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
```

*### Chú ý rằng trong ví dụ này ra lưu trữ JWT ở trong local storage*

Tạo một service mà implement route guard. Bạn có thể gọi nó là bất cứ điều gì mà bạn thích, chẳng hạn như `auth-guard.service`:
```
// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
```

Service này sử dụng `AuthService` và `Router`, và có một method là `canActivate`. Method này là cần thiết khi implement `CanActivate interface`.

Method canActivate trả về một giá trị boolean cho biết có cho phép điều hướng đến một route nào đó hay không. Nếu user không được xác thực, họ sẽ được định tuyến đến một route khác, trong trường hợp này ta sẽ bắt họ phải login lại.

Bây giờ guard có thể được áp dụng cho bất kỳ route nào mà bạn muốn.
```
// src/app/app.routes.ts
import { Routes, CanActivate } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '' }
];
```

route `/profile` có một giá trị cấu hình được bổ sung là `canActivate`. `AuthGuard` sẽ được chạy bất cứ khi nào mà người dùng muốn truy cập vào route này. Nếu người dùng được xác thực, họ sẽ vào được route này, ngược lại họ sẽ bị chuyển hướng đến route `/login`.
*### Chú ý rằng guard canActive vẫn cho phép component cho route này được active(chỉ không điều hướng đến). Nếu bạn muốn ngăn chặn active hoàn toàn, bạn có thể sử dụng canLoad.*

# Kiểm tra cho quyền của User
Ví dụ trên hoạt động tốt cho kịch bản khá đơn giản, nếu người dụng được xác thực, hãy để họ qua. Nhưng trên thực tế cho rất nhiều trường hợp, nơi chúng tôi sẽ muốn tinh tế hơn cho các quyết định định tuyến này.

Ví dụ nếu bạn muốn chỉ cho một số user nhất định truy cập với vai trò được đính kèm trong thông tin của họ. Để xử lý trường hợp này, chúng ta có thể sửa đổi guard để tìm kiếm vai trò của user đó ở trong `payload` của user's JWT.

Để đọc được JWT, ta sẽ sử dụng `jwt-decode`.
```
npm install --save jwt-decode
```

Vì sẽ có lúc chúng tôi muốn sử dụng cả `AuthGuard` bắt tất cả và một guard dựa trên vai trò chi tiết hơn, ta sẽ tạo ra một service mới để chúng tôi có thể xử lý cả hai trường hợp.

Tạo một guard service là `RoleGuardService`:

```
// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
```
Ở trong guard này, ta sử dụng `ActivatedRouteSnapshot` để cung cấp cho ta quyền truy cập vào các thuộc tính dữ liệu cho một route nhất định. Thuộc tính dữ liệu này hữu ích vì chúng ta có thể truyền một đối tượng có một số thuộc tính tùy chỉnh từ nó đến cấu hình tuyến đường của chúng ta. Sau đó, chúng ta có thể nhận dữ liệu tùy chỉnh đó trong guard để giúp đưa ra quyết định định tuyến.

Trong trường hợp này, chúng tôi đang tìm kiếm một vai trò mà chúng tôi mong muốn người dùng sẽ có nếu họ được phép truy cập vào route. Tiếp theo, chúng tôi sẽ giải mã mã JWT để lấy payload của nó. Nếu người dùng không được xác thực hoặc nếu họ không có vai trò mong mốn ở trong payload  của token, chúng tôi sẽ hủy điều hướng và điều hướng họ sang login. Ngược lại, user sẽ được truy cập vào route.

Bây giờ chúng tôi có thể sử dụng `RoleGuardService` này cho bất kỳ route nào của chúng tôi. Ví dụ, chúng tôi có thể muốn bảo vệ route `/admin`:

```
// src/app/app.routes.ts
import { Routes, CanActivate } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
import { 
  RoleGuardService as RoleGuard 
} from './auth/role-guard.service';
export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'admin'
    } 
  },
  { path: '**', redirectTo: '' }
];
```

Đối với route `/admin`, chúng tôi vẫn sử dụng `canActivate` để kiểm soát điều hướng, nhưng lần này chúng tôi sẽ chuyển một đối tượng trên thuộc tính dữ liệu có khóa `expectedRole`  đó mà chúng tôi đã thấy trong `RoleGuardService`.
*### Chú ý trong kịch bản này giả định rằng bạn đang sử dụng một yêu cầu vai trò tùy chỉnh ở trong JWT*

# Đây có phải một cách dễ dàng để hack
Nếu bạn giống như hầu hết các nhà phát triển, thì bạn có thể nhìn vào điều này và nghĩ rằng người dùng có thể dễ dàng hack đường đến route đường được bảo vệ. Rốt cuộc, bất kỳ người dùng thông thái nào cũng có thể tìm thấy JWT của họ trong local storage, truy cập jwt.io, đưa mã thông báo và thay đổi payload của nó. Ví dụ, họ có thể thay đổi `exp` để kéo dài thời gian sử dụng của token, hay thay đổi role của user. Đây là tất cả những gì người dùng thực sự có thể làm điều này và sau đó vượt qua guards. Tuy nhiên, điểm quan trọng cần nhớ là mọi thay đổi mà người dùng thực hiện đối với payload của token sẽ làm mất hiệu lực chữ ký trong JWT. Chữ ký mã thông báo JWT được tính bằng cách bao gồm payload, do đó, bất kỳ sửa đổi nào đối với nó sẽ làm mất toàn bộ. Đây là một tin tốt vì nó có nghĩa là người dùng sẽ không thể truy cập tài nguyên được bảo vệ của bạn với nó.

Bất kỳ dữ liệu nhạy cảm nào mà bạn không muốn truy cập trái phép đều phải được giữ lại phía máy chủ của bạn. Nếu người dùng không được quản lý đi đến một route mà họ không được phép, thì dù sao thì nó cũng không quan trọng lắm vì họ sẽ không thể thấy bất kỳ data nào mà route cung cấp.

# Kết thúc
Hy vọng rằng bạn đã có thể thấy những lợi ích của việc sử dụng các bộ bảo vệ định tuyến Angular, để giúp bảo vệ quyền truy cập vào các route phía khách hàng. Hãy nhớ rằng không có gì trên máy khách có thể thực sự được bảo vệ. Bất kỳ code, dữ liệu hoặc tài sản nào khác được gửi đến trình duyệt của người dùng đều có thể truy cập được. Biết được điều này, hãy chắc chắn luôn bảo vệ dữ liệu nhạy cảm ở trên server của bạn.
Thank you!

## Tài liệu tham khảo
https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3