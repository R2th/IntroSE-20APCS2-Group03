![image.png](https://images.viblo.asia/145a9e6c-df47-4eb8-9422-800537c43013.png)

Image lazy loading làm giảm tải hình ảnh hiện tại khi chưa cần hiển thị trong chế độ xem. Hình ảnh như sẽ chỉ được tải khi người dùng cuộn đến hình ảnh cần hiển thị. Sử dụng kỹ thuật này, ta có thể đạt được hiệu suất và thời gian tải tốt hơn.

Ngày nay, các trình duyệt hiện đại đã thêm hỗ trợ cho lazy loading images và ta có thể sử dụng nó bằng cách thêm một thuộc tính đơn giản vào phần tử `image`:

`<img src="src.png" alt="Angular" loading="lazy"> `

Thuộc tính `loading` hỗ trợ ba tùy chọn - **auto, eager, and lazy**. Với tùy chọn **lazy** sẽ trì hoãn việc tải tài nguyên cho đến khi đạt đến một khoảng cách tính toán từ khung nhìn.

![image.png](https://images.viblo.asia/3cf40438-b86a-4a51-9276-58754cd5bf24.png)


Hãy cùng tạo một directive để thêm thuộc tính này một cách liền mạch nếu trình duyệt hỗ trợ nó:

```
import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: 'img' })
export class LazyImgDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
}
```

Đầu tiên ta  kiểm tra xem trình duyệt có hỗ trợ tính năng này hay không. Nếu có, ta thêm thuộc tính **loading**; Nếu không, ta để mặc định.

![image.png](https://images.viblo.asia/1df09e9d-a4e1-47f0-803b-e78d887e726f.png)

![image.png](https://images.viblo.asia/b3644894-a37f-4f4f-b9c8-14f9189e5dc0.png)

Ta có thể thêm một bước nữa khi trình duyệt không hỗ trợ là gọi callback `IntersectionObserver` ( không hỗ trợ IE)

```
import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: 'img' })
export class LazyImgDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    } else {
      // fallback to IntersectionObserver
    }
  }
}
```
🚀 Trong trường hợp bạn bỏ lỡ nó
Dưới đây là một số dự án mã nguồn mở của tôi:
Akita: Quản lý nhà nước được thiết kế riêng cho các ứng dụng JS
Spectator: Một công cụ mạnh mẽ để đơn giản hóa các bài kiểm tra góc độ của bạn
Transloco: Thư viện quốc tế hóa Angular
Trình quản lý biểu mẫu: Nền tảng để quản lý biểu mẫu thích hợp trong Angular
Cashew: Một thư viện linh hoạt và đơn giản lưu trữ các yêu cầu HTTP
Error Tailor - Lỗi biểu mẫu liền mạch cho các ứng dụng Angular
Và nhiều thứ khác nữa!

🚀 Tham khảo: 
Một số open source projects:
* [Akita](https://github.com/datorama/akita): State Management Tailored-Made for JS Applications
* [Spectator](https://github.com/ngneat/spectator): A Powerful Tool to Simplify Your Angular Tests
* [Transloco](https://github.com/ngneat/transloco/): The Internationalization library Angular
* [Forms Manager](https://github.com/ngneat/forms-manager): The Foundation for Proper Form Management in Angular
* [Cashew](https://github.com/ngneat/cashew): A flexible and straightforward library that caches HTTP requests
* [Error Tailor](https://github.com/ngneat/error-tailor) — Seamless form errors for Angular applications

Follow me on Medium or Twitter to read more about Angular, Akita and JS!

nguồn: https://netbasal.com/lazy-load-images-in-angular-with-two-lines-of-code-beb13cd5a1c4