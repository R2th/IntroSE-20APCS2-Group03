![](https://images.viblo.asia/dfce220c-7443-42e8-be18-f4880f820b51.png)


Single-page application frameworks và các thư viện có sẵn có thể là một điều may mắn cho các lập trình viên nhưng lại là một điều khó khăn khi tìm cách triển khai theo dõi và phân tích chúng.

Nếu bạn đã từng làm việc với Google Analytics, bạn sẽ gặp phải các global site tag hoặc gtag.js. Google yêu cầu bạn thêm mã nguồn này vào item đầu tiên của thẻ <head> trong trang web bạn muốn theo dõi.
 
Nhưng khi bạn chỉ có một trang, như các ứng dụng một trang được tích hợp sẵn trong khuôn khổ như Angular đang có, thì giải pháp sao chép và dán sẽ không hoạt động theo cách bạn cần.

**Cách hoạt động của Angular**
    
Angular là một single-page application framework, có nghĩa là trình duyệt của bạn về mặt kỹ thuật chỉ tải một trang. Khi một trang 'thay đổi', DOM chỉ đang cập nhật một phần của trang như được chỉ định bởi  framework’s JavaScript code.

Các components là những thứ tạo nên các bộ phận của hình ghép trực quan. Mặc dù bạn có thể đang điều hướng khỏi một chế độ xem cụ thể và liên kết trong thanh địa chỉ tự động thay đổi để phù hợp, bạn vẫn đang ở trên cùng một trang gốc.
 
Điều này là do trình duyệt không làm mới trang của bạn và không có trang mới nào được tải. Nó vẫn là cùng một trang - chỉ là một chế độ xem khác và việc triển khai cơ bản của thẻ Analytics của Google không biết điều này.
    
**It Starts With the Copy-Paste gtag.js Code**
    
Có hai phiên bản theo dõi thông qua Google Analytics - `ga` và `gtag`. `ga` là phiên bản cũ hơn và bị mất giá trị hơn, thay vào đó, Google đang thúc đẩy triển khai `gtag.js`.
Để bắt đầu, bạn cần vào bảng điều khiển Google Analytics của mình và tìm mã copy-paste. Bạn sẽ cần sao chép mã này, đặt nó vào thẻ `<head>` như được đề xuất, thêm dấu trừ '-' `gtag ('config', 'xx-xxxxx-xxx');`
Đoạn mã nhỏ này chỉ đơn giản là làm cho thư viện `gtag.js` có sẵn cho ứng dụng của bạn. `gtag ('config', 'xx-xxxxx-xxx');` chính là hàm thực thi phần xem trang của trang web của bạn.

Hàm `gtag()` là hàm mà chúng ta sẽ xử lý đối với bất kỳ thứ gì liên quan đến Google Analytics.  
    
    ![image.png](https://images.viblo.asia/eff0e2dd-0da1-49a2-bf4f-2997d0f22bfc.png)
    Hình ảnh ví dụ của Google Analytics.
    
    **Router Events chính là điều quan trong cốt lõi của ứng dụng Angular**
    
Angular có một số phương pháp xử lý sự kiện có thể được sử dụng để truy cập thông tin nhất định. Đối với Google Analytics, điều chúng ta quan tâm là URL mà người dùng đã điều hướng đến.

Để trích xuất thông tin này, chúng ta có thể sử dụng phương thức `navigationEnd` để truy cập thuộc tính có tên `urlAfterRedirects`. Thuộc tính này chứa `/` phần của URL định tuyến của bạn.
Vì vậy, đối với một URL trông giống như sau `http://localhost:4200 /shop`, nó sẽ cung cấp `/shop` làm giá trị.
    
Để sử dụng `navigationEnd`, bạn sẽ cần import nó và đăng ký sự kiện để gọi gtag() khi có điều gì đó xảy ra. Bạn cũng sẽ cần cấp cho component Angular của mình quyền truy cập vào gtag bằng cách khai báo nó là một Function.

Vì mục đích hiệu quả của code, bạn có thể đặt tất cả những thứ này trong tệp app.component.ts vì đây là tệp đầu tiên được gọi và tải ở cấp cao nhất của mọi thứ cuối cùng sau đó.
    
Tóm lại, code của bạn sẽ trông giống như sau:
    
```
    ...
import{Router, NavigationEnd} from '@angular/router';
...
declare let gtag: Function;
...
export class AppComponent {
  constructor(public router: Router){   
      this.router.events.subscribe(event => {
         if(event instanceof NavigationEnd){
             gtag('config', 'xx-xxxxx-xx', 
                   {
                     'page_path': event.urlAfterRedirects
                   }
                  );
          }
       }
    )}
}
```
Có những thông số khác mà bạn có thể sử dụng để làm phong phú thêm việc theo dõi của mình. Để có danh sách các tham số mới nhất, bạn có thể xem chúng trên trang tài liệu về lượt xem trang theo dõi [Google Analytics](https://developers.google.com/analytics/devguides/collection/gtagjs/pages).
    
**Event Tracking**

Event Tracking thêm một lớp dữ liệu khác vào thống kê Analytics của bạn. Tuy nhiên, việc triển khai nó ít đơn giản hơn so với lượt xem trang và sẽ cần một chút can thiệp để đưa dữ liệu phù hợp vào nền tảng miễn phí của Google.

Để giữ mọi thứ gắn kết và giảm số lượng mã trùng lặp trên ứng dụng chúng ta sẽ tạo một dịch vụ Angular và sử dụng nó trong các components.
Để làm điều này, bạn có thể sử dụng CLI để tạo một `service` cho bạn và sau đó thêm nó vào tệp `app.module.ts` của bạn như là một `providers`.
Để tạo một `service` mới bằng CLI:
 ```
   ng generate s GoogleAnalytics
```
File `app.module.ts`:
    
   ```
 ...
import {GoogleAnalyticsService} from './google-analytics.service';
...
@NgModule({
...
   providers: [GoogleAnalyticsService],
});
...
```
    
Bên trong file service mới tạo của bạn, bạn sẽ tạo một hàm public `eventEmitter` về cơ bản sẽ chạy `gtag` khi nó được gọi và đảm bảo rằng định dạng của bạn là chính xác và theo cách mà `gtag` yêu cầu.

Bạn cũng sẽ cần khai báo `gtag` dưới dạng Function để hiển thị dịch vụ của bạn với thư viện bên ngoài.

Mã dịch vụ của bạn cuối cùng sẽ trông giống như sau:
   ```

...
   public eventEmitter( 
       eventName: string, 
       eventCategory: string, 
       eventAction: string, 
       eventLabel: string = null,  
       eventValue: number = null ){ 
            gtag('event', eventName, { 
                    eventCategory: eventCategory, 
                    eventLabel: eventLabel, 
                    eventAction: eventAction, 
                    eventValue: eventValue
                  })
       }
}
```

    
    Để sử dụng `service` này, bạn sẽ cần `import` nó vào `component` của mình và chạy nó, khi có điều gì đó xảy ra - chẳng hạn như sự kiện nhấp vào nút - rồi chuyển các giá trị bạn muốn theo dõi vào `eventEmitter` để chạy.

Vì vậy, trong code HTML của bạn, bạn có thể có một cái gì đó như thế này:
    
    `<button (click) = "SendAddToCartEvent ()"> Thêm vào giỏ hàng </button>`

Sau đó, trong `component` nơi bạn sẽ xử lý `SendAddToCartEvent()`, bạn có thể gọi `eventEmitter`. Xin lưu ý rằng bạn sẽ cần import `service` mà bạn đã tạo vào `component` của mình để nó hoạt động.
    
    Code  `component` của bạn sẽ trông giống như sau:
    
   
  ```
  ...
import{GoogleAnalyticsService} from './google-analytics.service';
...
export class ShopComponent implements OnInit {
...  
   SendAddToCartEvent(){ 
     this
     .googleAnalyticsService
     .eventEmitter("add_to_cart", "shop", "cart", "click", 10);
   } 
...
}
```

    
    Bạn có thể tạo các sự kiện và danh mục sự kiện của riêng mình. Tuy nhiên, Google có một danh sách những cái được xác định trước sẵn sàng để bạn sử dụng. Bạn có thể tìm thấy danh sách [đầy đủ ở đây](https://developers.google.com/analytics/devguides/collection/gtagjs/events).
    
    **Kết**
    
Tôi đã tạo một kho lưu trữ [GitHub](https://github.com/dottedsquirrel/AngularGoogleAnalytics) được liên kết để bạn tham khảo. Nó chứa mã Angular rõ ràng để bạn có thể thấy tất cả chúng khớp với nhau như thế nào trong một dự án đang hoạt động. Hãy thoải mái sử dụng repo theo cách bạn muốn.

Việc triển khai theo dõi Analytics không khó một khi bạn hiểu cách hoạt động của `gtag.js` và Angular `routing`. Việc triển khai nó trên một trang đơn và ứng dụng web tiến bộ có thể là một chút bí ẩn đối với một số người nhưng hy vọng rằng điều bí ẩn đó giờ đây đã bớt khó khăn hơn.
    
    Nguồn: https://www.dottedsquirrel.com/google-analytics-angular/