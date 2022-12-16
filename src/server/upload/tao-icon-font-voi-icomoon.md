Font Awesome là một trong những thư viện icon font chẳng còn xa lạ với các developer. Với phiên bản 5.* hiện nay, Font Awesome hỗ trợ > 1400 icon font miễn phí. Tuy nhiên, liệu rằng bạn có sử dụng hết hơn 1400 font trong dự án của mình??? Thậm chí bản chỉ muốn dùng khoảng 10 - 15 font. Vậy việc tải toàn bộ style của Font Awesome thực sự chưa tối ưu. Sau khi tìm hiểu một vài phương pháp thì IcoMoon là lựa chọn mà mình cho là tối ưu và hiệu quả nhất để giải quyết vấn đề trên. Nào mình cùng tìm hiểu nhé ^.^ !<br>
## 1. Giới thiệu về IcoMoon<br>
Như các bạn đã biết, Icon fonts chỉ đơn giản là fonts. Tuy nhiên, thay vì bao gồm kí tự hay chữ số, chúng bao gồm các biểu tượng và glyphs. Bạn có thể định dạng cho chúng giống hệt như text thông thường. Vậy IcoMoon là một trong những ứng dụng để biến đổi các image-icon mà bạn muốn sử dụng thành các icon fonts. Ngoài ra nó còn cho phép bạn: <br>
*  Tải và tìm kiếm 600+ IcoMoon icons
*  Upload các file .svg hoặc font của riêng bạn.
*  Chỉnh sửa icon trực tiếp trên trình duyệt
*  ...<br><br>

Nào hãy bắt đầu ngay với IcoMoon nào: https://icomoon.io/
## 2. Làm việc với IcoMoon<br>
**Bước 1:** Bạn cần có một list các image-icon muốn chuyển đổi ở dạng .svg<br>

![](https://images.viblo.asia/1feff9a5-c856-4989-b2e0-98a9f764a06b.png)

**Bước 2:** Truy cập vào trang chủ https://icomoon.io/ và upload image-icon<br>

![](https://images.viblo.asia/4296a748-435c-48bc-8ce8-3d7c85414edd.png)
<br>

![](https://images.viblo.asia/a215b91f-31af-4eb1-b68f-7bc6149e8aee.png)<br>

**Bước 3:** Chọn các icon mà bạn muốn generate font:<br>

![](https://images.viblo.asia/ddce3318-8b97-4550-9437-22babe6bb8c7.png)

**Bước 4:** Tải về và sử dụng thôi nào<br>

![](https://images.viblo.asia/8683e675-250c-4ff3-ba61-1d5775c58e22.png)<br>

![](https://images.viblo.asia/cc766c26-be7f-4d2c-9b17-b77395da8ea0.png)

Khi bạn tải về sẽ cần chú ý tới 2 phần quan trọng:<br>
* fonts: thư mục chứa font.
* style.css: tệp khai báo và cài đặt cho các font sử dụng.<br>

Khi sử dụng bạn cần copy thư mục fonts và style.css vào project của mình, và cấu hình file html như bình thường:<br>

![](https://images.viblo.asia/6d8444ef-b82d-42af-a275-dd691e10e6ff.png)

## Kết luận:
Trên đây là cách tối ưu Icon Fonts với IcoMoon mà bạn có thể tham khảo. Với cách này, thay vì phải tải trên 50KB Font Awesome thì bạn chỉ phải mất vài KB dành cho icon fonts. Chúc các bạn sử dụng thành công. Thân ái và hẹn gặp lại!