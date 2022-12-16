Chúng ta đều biết hiện nay, lập trình viên đang dần có xu hướng chuyển dần từ Server-side Rendering sang Client-side Rendering. Vậy trong bài viết này mình cùng nhau tìm hiểu về sự khác nhau giữa hai cơ chế này, ưu nhược điểm của chúng để có thể dễ dàng lựa chọn khi sử dụng nhé!

# 1. Server-side Rendering
Server-side rendering là cơ chế đã được sử dụng từ rất lâu. Gọi nó là server-side rendering là vì phần lớn logic sẽ được xử lý ở server:
* Khi người dùng vào một trang web, trình duyệt sẽ gửi GET request tới web server
* Web server sẽ nhận request, đọc dữ liệu từ database.
* Web server sẽ render HTML, trả về cho browser để hiển thị cho người dùng

![](https://images.viblo.asia/2996ce77-7caf-469e-9dc0-3aba32d2df71.png)

Một số tính chất của cơ chế server side rendering:
* Logic từ đơn giản (validation, đọc dữ liệu) cho đến phức tạp (phân quyền, thanh toán) đều nằm ở phía server
* Logic để routing – chuyển trang nằm ở server
* Logic để render – hiển thị trang web cũng nằm ở server nốt

### Ưu điểm của Server-side Rendering
- Initial load nhanh, dễ otpimize, vì toàn bộ dữ liệu đã được xử lý ở server. Client chỉ việc hiển thị.
- Các web framework từ xưa đến nay đều hỗ trợ cơ chế này
- Dễ hiểu và dễ code hơn. Developer chỉ cần code 1 project web là được, không cần phải tách ra front-end và back-end
- Chạy được trên phần lớn mọi trình duyệt, kể cả disable JavaScript vẫn chạy tốt

### Nhược điểm:
- Mỗi lần người dùng chuyển trang là site phải load lại nhiều lần, gây khó chịu
- Nặng server vì server phải xử lý nhiều logic và dữ liệu. Có thể sử dụng caching để giảm tải.
- Tốn băng thông vì server phải gửi nhiều dữ liệu thừa và trùng  (HTML, header, footer). Có thể sử dụng CDN để giảm tải.
- Tương tác không tốt như Client Side rendering vì trang phải refresh, load lại nhiều lần.
# 2. Client-side Rendering
Bắt đầu từ những năm 2010, với phát triển của javascript và ajax, cơ chế client-side rendering bắt đầu được sử dụng
Developer bắt đầu build ứng dụng dưới dạng SPA – Single Page Application. Ứng dụng nằm trong 1 page duy nhất nên được gọi là Single Page Application.

Client Side Rendering tức là việc render HTML, CSS sẽ được thực hiện ở client (Tức JavaScript ở trình duyệt)

![](https://images.viblo.asia/affdc8fe-1fd7-446f-be62-a8b364bbb465.jpg)


- Những logic đơn giản (validation, đọc dữ liệu, sorting, filtering) nằm ở client side
- Logic để routing (chuyển trang), render (hiển thị) dữ liệu thì hầu hết nằm ở client side, đương nhiên vẫn có một số ứng dụng routing vẫn do server quản lý
- Logic phức tạp (thanh toán, phân quyền) hoặc cần xử lý nhiều (data processing, report) vẫn nằm ở server side.

### Ưu điểm của Client-side Rendering
- Page chỉ cần load một lần duy nhất. Khi user chuyển trang hoặc thêm dữ liệu, JavaScript sẽ lấy và gửi dữ liệu từ server qua AJAX. User có thể thấy dữ liệu mới mà không cần chuyển trang.
- Chuyển logic sang client nên giảm tải được một phần cho server.
- Giảm được băng thông do chỉ cần lấy JSON và dữ liệu cần thiết, thay vì phải lấy toàn bộ trang
- Với các ứng dụng cần tương tác nhiều, SPA hoạt động mượt mà hơn vì code chạy trên browser, không cần load đi loại lại nhiều

### Nhược điểm
- Initial load sẽ chậm hơn nếu không biết optimize. Lý do là broser phải tải toàn bộ JavaScript về (khá nặng), parse và chạy JS, gọi API để lấy dữ liệu từ server (chậm), sau đó render dữ liệu
- Đòi hỏi project phải chia làm 2 phần riêng là back-end (REST api) và front-end nên khó code hơn
- Không chạy được nếu JavaScript bị disable, hoặc ở các trình duyệt cũ không nhận JavaScript ES6 (Có thể dùng transpiler và polyfill nhưng sẽ làm tăng kích cỡ file js)
- Nếu client sử dụng mobile, device yếu thì khi load sẽ bị chậm
# 3. Các website sử dụng Client-Side Rendering
Vì Client-side rendering rất phù hợp cho những ứng dụng cần tương tác nhiều, hầu hết web của các công ty công nghệ, công ty startup đều đùng cơ chế này:

- Facebook (React)
- Instagram (React)
- Paypal (React + Angular)
- v...v...
# 4. Kết luận
Trong bài viết này, mình đã giới thiệu sơ về 2 cơ chế client-side rendering và server-side rending. Mình cũng chia sẻ về những ưu nhược điểm của 2 cơ chế này.

Bản thân các thư viện client-side rendering như React, VueJS cũng đều hỗ trợ server rendering (React có react-dom/server, VueJS có Nuxt).Nếu có hứng thú, các bạn có thể tự tìm hiểu thêm nhé!

## Tài liệu tham khảo:
- https://kipalog.com/posts/Single-Page-Applications--Server-Side-Rendering--Client-Side-Rendering-and-so-on
- https://text.relipasoft.com/2017/04/rendering-client-side-so-voi-server-side/
- https://www.toptal.com/front-end/client-side-vs-server-side-pre-rendering