![](https://images.viblo.asia/454a5876-1d6e-4504-8436-6c53bc2391ac.gif)

Trong bài trước mình có từng viết bài về [cách tìm kiếm với google](https://viblo.asia/p/cach-tim-kiem-voi-google-Ljy5VzpG5ra) (Thực ra nó phải là [Google Dork](https://en.wikipedia.org/wiki/Google_hacking) hay Google hacking, mình cố tình viết khác tên cho nó đỡ nổ). Với kỹ thuật này mình có thể tìm kiếm thông tin nhạy cảm của website, hay bug, vân vân và mây mây.

Để thực hành nó, mình có đi tìm xem có khách hàng nào của shopee để lộ mật khẩu trên google không? Mình dùng ngay từ khóa tìm kiếm dưới đây.

```
site:shopee.vn password txt
```
![](https://images.viblo.asia/a915e80e-fb7d-4a6a-a6fa-1310a269f391.png)

Như trên hình, ta thấy rằng chỉ có 43 kết quả tương ứng với từ khóa mà ta đã tìm. Đây là một con số rất ít phải không? Nhưng tìm mãi không thấy được thông tin đăng nhập vào shopee đâu. Rất chán! :cold_sweat:

Sau nhiều hồi sử dụng não để tìm kiếm mà vẫn không có kết quả mong muốn. Mình liền sử dụng trang tìm kiếm khác và mình nhớ có đọc bài của anh **[vigov5](https://viblo.asia/search?q=vigov5)** có nói về việc [tìm thông tin nhạy cảm trên **github**](https://github.com/Plazmaz/leaky-repo). Mình liền tìm theo các từ khóa có trong đó, và mình nghĩ thêm các từ khóa khác để phù hợp với mục đích cá nhân của mình. Và kết quả có được như hình dưới.

![](https://images.viblo.asia/d4b0a18f-64fa-4019-86a9-99d31851c33a.png)

Tiếp tục vào từng link xem có gì không. Và có thông tin đăng nhập vào một trang gì đó.

![](https://images.viblo.asia/8c05045b-f8af-487a-b601-0dfecb1da91b.png)

Ôi thật là dễ dàng! Nhưng đời đâu có như mơ, theo link trên thì đã không đăng nhập vào được :joy:.

Vậy là mình lại tiếp tục thay đổi từ khóa tìm kiếm. Và đến lần này thì ông trời đã không phụ người có công.

![](https://images.viblo.asia/a733f0ea-69cf-49f5-9c5c-d1797f29e969.png)

Sau một hồi recon thì mình có được thông tin đăng nhập vào cPanel của một ai đó và thông tin đăng nhập vào trang mua tên miền của một ai đó nữa.

Sau khi đăng nhập vào cPanel
![](https://images.viblo.asia/ff35012a-42ac-41b5-aa77-d2622d5659bb.png)

Sau khi đăng nhập vào trang mua bán tên miền.
![](https://images.viblo.asia/700bcc87-05c8-4afd-b6a2-8e5efa2a73cc.png)

Qua đây chúng ta thấy rằng việc để lộ thông tin rất nguy hiểm. Vì vậy, cần phải bảo mật thông tin tốt hơn, không nên lưu thông tin cá nhân mà lại để public.