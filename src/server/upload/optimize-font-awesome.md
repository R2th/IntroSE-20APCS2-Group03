Các biểu tượng là một phần không thể thiếu của thiết kế web. Đã qua rồi những ngày mà các biểu tượng một file hình ảnh. Hiện giờ các biểu tượng được sử dụng phần lớn là svg và font family vì nhiều ích lợi mà nó mang đến. Một trong những font icon phổ biến nhất là Font Awesome.
Một trang web đơn giản sử dụng ít nhất từ 4 đến 5 biểu tượng. Nếu chúng ta cần thêm các biểu tượng nút chia sẻ, số lượng sẽ tăng lên, có thể là 10 biểu tượng. Vậy tại sao chúng ta vẫn lựa chọn font awesome như là một thư viện icon khổng lồ như vậy chỉ cho 10 biểu tượng? Bởi vì việc thêm hoặc xóa hoặc thay đổi một biểu tượng rất dễ dàng trong font awesome. Nếu bạn đã từng sử dụng các biểu tượng  bằng cách sử dụng các trang sprite css với một ảnh png, bạn sẽ thấy việc thêm sửa xoá 1 icon từ 1 cái ảnh png chứa toàn bộ icons trong đó sẽ mệt mỏi đến thế nào.

Font awesome khiến cho việc thiết kế cũng như phát triển web trở nên dễ dàng hơn rất nhiều. Việc thêm các biểu tượng cũng đơn giản như thêm thẻ <h1>. Thay đổi kích thước được thực hiện thông qua các thuộc tính, sizing, transform, scalte, rotate ... Nhưng ngoài những biểu tượng mà ta cần, thì phần còn lại đều không được sử dụng. Chúng được load cùng với những cái chúng ta cần.

### Why should we optimize font awesome?
Font awesome sử dụng một lượng lớn css và bao gồm rất nhiều các icons khác nhau, nếu ta chỉ cần 10 icons, vậy tao lại phải load hết hết hàng trăm icons, hàng trăm dòng css file ko cần thiết. Và càng nặng thì performance, speed của website càng giảm sút theo. Chính vì vậy chúng ta nên giảm thiểu tối đa dung lượng của font awesome, giảm còn khoảng 10-15% trong ví dụ chỉ cần 10 icons thôi.

### How can we optimize font awesome?
Có 2 cách để làm việc này:
* The hard way (generating a custom font on your own)
* The easy way (using a generator)

**The Hard Way**
- download font awesome về và sử dụng locally. -> `<link rel="stylesheet" href="/font-awesome/css/font-awesome.css">`
- xoá các files không cần thiết, giữ lại folder font, css, trong folder font chỉ giữ lại woff, vì định dạng này dành cho web.
![](https://images.viblo.asia/97ff5a77-a076-4f08-bfa9-2e59308d38d5.png)
- chỉnh sửa font file
 - download app from http://fontforge.github.io/en-US/ , open font file của chung ta (fontawesome-webfont.woff). Bây h chúng ta sẽ xoá bỏ các icons không cần thiết, và save lại.
 ![](https://images.viblo.asia/5659bb43-1a40-4085-9f90-4d0f6fcb2b1e.jpg)
 --> file font đã nhỏ hơn, tiếp theo bạn vào file css tìm đến các class icon cần dùng, gom lại 1 chỗ, còn lại xoá hết. Giờ hãy chạy thử với font file và css mới ta vừa tạo.
 Cách này thì mất thời gian.
** The Easy Way**
IconMoo sẽ giúp bạn làm việc này.
- Đăng nhập vào https://icomoon.io/app/ và chọn Add icon từ library…. Tìm Fontawesome và nhấp vào Add. Bạn sẽ được chuyển hướng đến một cửa sổ lựa chọn.
![](https://images.viblo.asia/04682afa-7eb8-4559-9d1f-6534937428fd.png)
- Select Icons Trong màn hình này, chọn tất cả các biểu tượng bạn muốn bằng cách nhấp vào chúng. Khi bạn đã hoàn tất, hãy nhấp vào **Generate Font** ở dưới cùng.
- Download the font: IcoMoon sẽ hiển thị các biểu tượng được chọn và cung cấp cho bạn tùy chọn tải xuống các biểu tượng này dưới dạng font file. File zip sẽ chứa tất cả các tệp cần thiết như svg, eot, woff, v.v., cùng với file css.
![](https://images.viblo.asia/180d4e47-0514-48e8-887b-d43d97021dd5.png)
- oke, bây h chúng ta chỉ việc gọi file css vào trang web và trải nghiệm.

Nguồn tham khảo: https://blog.webjeda.com/optimize-fontawesome/