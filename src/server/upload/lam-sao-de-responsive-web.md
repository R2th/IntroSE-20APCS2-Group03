## Responsive là gì ?
***
**Responsive** là cách bạn xây dựng trang web có thể hiển thị thích ứng trên mọi loại thiết bị với kích thước khung hình khác nhau. Với cách này trải nghiệm người dùng sẽ được cải thiện.

Chẳng hạn bạn thiết kế trang web hiển thị tốt trên màn hình desktop (1200px) thì khi ở điện thoại (480px) sẽ không hiện thị hết nội dung. Có thể bạn cho rằng chỉ cần chuyển 1200px thành phần trăm (%) là được rồi. 

Điều này cũng đúng nhưng khi xem ở màn hình nhỏ ta phải phóng to lên khá là bất tiện. Do đó ta sẽ muốn thay đổi chút xíu cách mà trang web hiện thị khi ở màn nhỏ hơn.

Responsive hoạt động bằng cách viết riêng đoạn CSS dùng để hiển thị trên các màn tương ứng.

Đâu đó bạn đọc sẽ có 2 cách để tối ưu việc hiện thị là Responsive và Adaptive.

## Phân biệt Responsive và Adaptive
***
Đầu tiên ta đến với **Adaptive** đây là cách bạn sẽ **viết 1 giao diện dành riêng cho từng khung hình** (1 file riêng biệt), cho từng thiết bị tương ứng. Ví dụ khung 1200px, khung 480px.

Còn **Responsive** được hiểu là cách bạn **viết tổng quan nhất trên 1 giao diện** (cùng 1 file). Responsive có thể cập nhật hiện thị liên tục theo chiều rộng và chiều dài.

Tại sao lại có 2 định nghĩa này ? 

Với cách viết **Adaptive** việc bảo trì hay phát triển tiếp giao diện cho trang web sẽ rất phức tạp. Khi đó mỗi lần cập nhật bạn phải thực hiện thay đổi trên **cả 2 giao diện hoặc nhiều hơn**.

Hiện tại, kỹ thuật phổ biến là **Responsive** đáp ứng tốt cho việc hiện thị và việc bảo trị, chỉnh sửa sẽ dễ dàng hơn.

## Áp dụng Responsive cho trang web
***
Để áp dụng Responsive ta cần thực hiện 2 thao tác.

1.  Khai báo meta viewport
2.  Viết CSS cho từng loại thiết bị.

### Bước 1: Khai báo meta viewport
Đầu tiên bạn hãy khai báo thẻ này vào `<head>` trong file HTML
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
`meta viewport` nghĩa là thiết lập cho trình duyệt hiển thị tương ứng với kích thước màn hình.  Ở ví dụ trên bạn đã thiết lập trình duyệt hiển thị với kích thước của màn hình thiết bị tương ứng `width=device-width` và không phóng to màn hình `initial-scale=1`. Khuyến khích sử dụng.

Ví dụ giữa việc dùng và không dùng `meta viewport`
![](https://images.viblo.asia/5458b7ef-832e-4ee3-8271-0d7ca86d4381.png)
    
### Bước 2: Viết CSS cho từng loại thiết bị
Đến đây bạn bắt đầu viết những dòng CSS cho việc Responsive, thường thì ta viết cho chiều rộng của thiết bị tương ứng và được tính trên đơn vị px.

Để viết CSS tương ứng cho chiều rộng của trình duyệt, chúng ta sẽ sử dụng `@media`

```css
body {
    background-color: #000;
    color: #fff;
}

@media (max-width: 767.98px) {
    body {
        color: yellow;
    }
}
```
Đoạn code trên web sẽ hiển thị background màu đen chữ trắng, nhưng từ màn hình từ 767.98px trở xuống chữ sẽ có chữ màu vàng.
    
Với đoạn `@media (max-width: 767.98px)` là ta đang đặt breakpoint tại vị trí màn hình có chiều rộng là 767.98px và CSS sẽ được áp dụng cho tất cả màn hình có chiều rộng nhỏ hơn hoặc bằng 767.98px.

Ta có thể áp dụng riêng cho 1 khoảng màn hình nhất định bằng cách dùng `and`
    
```css
@media (min-width: 320px) and (max-width: 767.98px) {
    body {
        color: yellow;
    }
}
```
> Một vài thư viện grid system
> - Bootstrap: https://getbootstrap.com/docs/4.3/layout/grid/
> - Foundation: https://foundation.zurb.com/sites/docs/v/5.5.3/components/grid.html
> - 960: https://960.gs/
    
## Responsive với Boostrap 4
***
Responsive với boostrap khá dễ dàng với grid layout mà boostrap hỗ trợ. Với hệ thống lưới 12 cột có thể đáp ứng được rất nhiều layout hiện có với việc sử dụng `col-*` kết hợp breakpoint có trong boostrap (sm, md, lg, xl).
    
Sử dụng SCSS hay SASS viết css thì chắc cũng không còn lạ lẫm gì. Bạn có thể tìm hiểu qua [SASS](https://sass-lang.com/), hoặc bài sau mình sẽ chia sẽ về SASS.
    
Ta có thể sửa lại đoạn code vừa nãy với sự hỗ trợ của Boostrap và SCSS.    

```scss
body {
    background-color: #000;
    color: #fff;
    
    @include media-breakpoint-down(sm) {
        color: yellow;
    }
}
```
    
Và còn nhiều cách sử dụng khác bạn có thể tham khảo tại [Bootstrap](https://getbootstrap.com/docs/4.3/layout/overview/)
    
## Làm sao để kiểm tra Responsive
***
Cách đơn giản nhất bạn có thể dùng để kiểm tra là sử dụng **Chrome Developer Tools** bằng cách nhấn **F12** hoặc chuột phải lên màn hình bấm **Inspect** bạn sẽ thấy.
![](https://images.viblo.asia/c713da5a-e522-4554-81df-bfa79d88b640.png)
    
Từ đây bạn có thể resize để kiểm tra từng loại màn hình mà mình muốn hoặc bạn có thể test trên các thiết bị mà tool hỗ trợ bằng cách bấm `Ctrl+Shift+M`
![](https://images.viblo.asia/7d0308af-a9a5-4506-a2b3-488a8538d8d3.png)
    
[Resizer](http://lab.maltewassermann.com/viewport-resizer/) cũng là công cụ hỗ trợ Responsive rất tốt
    
![](https://images.viblo.asia/4b506a46-0c83-49ba-ae85-bf8e8aff6320.jpeg)
    
## Mobile-First
***

![](https://images.viblo.asia/36dcb8a6-e641-450a-8d8a-a710fdab8113.png)
    
Khi làm giao diện bạn cũng nên biết qua khái niệm [Mobile-First](https://medium.com/@Vincentxia77/what-is-mobile-first-design-why-its-important-how-to-make-it-7d3cf2e29d00).
    
Mobile-First là gì ? Thay vì bạn viết giao diện cho màn hình desktop trước rồi mới responsive lại cho màn hình mobile (từ màn hình lớn sang màn hình nhỏ). Thì bây giờ bạn viết giao diện cho màn hình mobile trước và dùng kèm với `min-width` trong media query.
    
Tại sao lại là Mobile-First ?
- Tối ưu cho mobile hơn, khi dùng trên mobile trình duyệt sẽ đọc vào đoạn code dành cho mobile đầu tiên tránh việc phải đọc hết cả file bao gồm css dành cho tablet và desktop.
- Tập trung làm giao diện mobile vì hiện tại nhu cầu dùng điện thoại đang tăng.
- Viết CSS từ mobile phát triển lên sẽ dễ dàng tận dụng code đã sử dụng.
- Tránh các lỗi hiển thị trên điện thoại do việc tùy biến từ CSS ở desktop.
    
## Lời kết
Trong bài này mình đã nói qua về khái niệm Responsive và cách ứng dụng boostrap trong việc Responsive. Giờ bạn có thể thực hành để hiểu nó rõ hơn nhé !
    
Nguồn mình thao khảo.
<br>
https://thachpham.com/web-development/html-css/lam-giao-dien-respoonsive.html
<br>
https://codetot.net/responsive-web-design/