Trong bài viết này thì chúng ta sẽ cùng tìm hiểu tổng quan về các mục `Components`, `Forms`, `Utilities`, và `Helpers` trong tài liệu của Bootstrap.

## Components & Forms

Phiên bản Bootstrap mà chúng ta đang sử dụng hiện tại là Bootstrap v5. Trước đây, trong phiên bản tiền nhiệm Bootstrap v4, các thành phần dùng để xây dựng các biểu mẫu nhập liệu cũng được các nhà phát triển Bootstrap đặt trong hạng mục `Components` thay vì xếp trong một hạng mục `Forms` riêng biệt như hiện tại. Thực tế thì chúng ta vẫn có thể khoanh vùng cả 2 hạng mục này và ghi nhớ rằng ở đây chúng ta sẽ tìm thấy tài liệu về các thành phần kiến trúc, hay các thành phần chính để kiến tạo nên một trang web.

Hãy thử tìm code ví dụ của thanh điều hướng chính trong tài liệu của Bootstrap. Cái này thì rõ ràng là một thành phần phổ biến và thường thấy rồi. Nó có thể chứa một ô tìm kiếm được xây dựng bởi `<form>` nhưng bản thân thanh điều hướng thì có lẽ là một thành phần kiến trúc lớn hơn và khả năng là sẽ được đặt trong hạng mục `Components`. Kết quả phù hợp mà mình tìm thấy là một mục con của `Components` có tên là `Navbar` (cách viết gọn của `navigation bar`).

![Bootstrap Navbar](https://images.viblo.asia/6a7434dc-0d5f-4a05-b762-593b28e9c0c5.png)

Khi click chuột để mở mục con `Navbar` thì chúng ta có  một bài viết rất dài với nhiều phần và một thanh điều hướng nữa ở phía bên phải của bài viết để chúng ta có thể di chuyển nhanh tới các chỉ mục. Code ví dụ và kết quả minh họa có thể được tìm thấy ngay trong chỉ mục `Supported content`. Đúng là thứ mà chúng ta đang tìm kiếm rồi.

![code ví dụ Navbar](https://images.viblo.asia/f890d31a-1ac5-4c6d-83d6-4367715c46e9.png)

Bạn có thể copy code ví dụ về để dùng thử ngay cho một văn bản HTML mới. Tuy nhiên thì
mình chắc chắn là mọi thứ sẽ hoạt động như Bootstrap đã nói trong tài liệu thôi. Và tới đây thì chúng ta có thể bắt đầu xây dựng luôn giao diện trang chủ `responsive` mà chúng ta đã dự kiến ở cuối bài viết trước. Khởi đầu luôn với thanh điều hướng nhé.

## Xây dựng thanh điều hướng

Trước hết thì chúng ta sẽ cùng xem lại kết quả dự kiến và tạm thời chỉ quan tâm tới thanh điều hướng.

`Xem trên máy tính`
![](https://images.viblo.asia/37755982-91f6-4e3f-8261-7ac1116c8fdf.png)

`Xem trên điện thoại`
![](https://images.viblo.asia/69c326f1-270b-4b5f-8896-9f65dada9630.png)

Tới đây thì chúng ta có thể gạch đầu dòng một vài điểm chính mà chúng ta cần thực hiện
để xây dựng thanh điều hướng này:

- Thanh điều hướng của chúng ta có 4 thành phần chính: `logo`, 2 khối liên kết, 1 nút nhấn để cho người dùng điện thoại/máy tính bảng có thể mở/đóng danh sách các liên kết.
- Ở đây chúng ta không cần tới ô tìm kiếm hay danh sách liên kết dạng sổ xuống cho người
dùng máy tính và có thể lược bỏ từ code ví dụ.
- Thanh điều hướng của chúng ta sử dụng tone màu tối, khác với tone mặc định trong code ví dụ của Bootstrap.
- Logo cũng sử dụng màu nền đặc biệt so với các liên kết còn lại và chắc chắn là cần thực hiện điều chỉnh từ code ví dụ.

Sau khi gạch đầu dòng phân tích xong những nội dung chính thì chúng ta có code HTML trông có dạng như thế này:

```navbar.html
<!doctype html>
<html lang="en" dir="ltr">
   <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

      <title>Homepage - Bootstrap It !</title>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <link rel="stylesheet" href="override.css">
   </head>
   <body>
      <!-- Navigation Bar - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top p-0">
         <a class="navbar-brand bg-primary px-4 py-3" href="#">
            N A T U R E
         </a>

         <button class="navbar-toggler px-4 py-3 border-0" type="button"
                 data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                 aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            +
         </button>

         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav border-top border-lg-0">
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">Html</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">Css</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3 active" aria-current="page" href="#">Bootstrap</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">JavaScript</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">jQuery</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">Jekyll</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">Sample</a>
               </li>
            </ul>

            <ul class="navbar-nav ms-auto me-0 me-lg-3 border-top border-lg-0">
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">Github</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">YouTube</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link px-4 px-lg-2 py-3" href="#">Facebook</a>
               </li>
            </ul>
         </div><!-- .navbar-collapse -->
      </nav>
       
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
   </body>
</html>
```

Trước hết thì bạn tạm thời đừng quan tâm tới các class `padding` với tên có dạng `p-n` hay `px-n`, `py-n`. Các class `margin` như `m-n` hay `mx-n`, `my-n` cũng vậy. Đây là các class hỗ trợ để canh chỉnh kích thước cho các phần tử và hoàn thiện thiết kế chi tiết. Tổng quan thì chúng ta cần quan tâm đầu tiên tới kiến trúc chính với container `<nav>` và các thành phần con là:

- 1 `logo` có tên class chủ đạo là `.navbar-brand` (thương hiệu)
- 1 nút nhấn cho điện thoại có tên class chủ đạo là `.navbar-toggler` (công tắc)
- 1 container có tên class chủ đạo là `.navbar-collapse` (thu gọn) chứa 2 khối links `.navbar-nav`

```navbar.html
<nav class="navbar">
   <a class="navbar-brand">N A T U R E</a>
    <button class"navbar-toggler">+</button>
    <div class="navbar-collapse">
        <ul class="navbar-nav">Các hạng mục viết</ul>
        <ul class="navbar-nav">Các mạng xã hội</ul>
    </div>
</nav>
```

Các chi tiết như các thuộc tính bổ trợ để các chức năng có thể hoạt động được ngay thì
bạn có thể `copy/paste` ít một từ code ví dụ sang để chạy thử code và phỏng đoán. Lưu ý đáng nói nhất ở đây là `breakpoint` khi thanh điều hướng thay đổi phong cách hiển thị để đáp ứng với các thiết bị khác nhau. Bootstrap sử dụng một [hệ thống `breakpoint`](https://getbootstrap.com/docs/5.0/layout/breakpoints/) được triển khai bằng cách gắn từ khóa vào tên của các class. Các từ khóa mô tả các `breakpoint` là:

- `xxl` extra extra large - cho màn hình kích thước rất rất lớn với `min-width: 1400px`
- `xl` extra large - cho màn hình kích thước rất lớn với `min-width: 1200px`
- `lg` large - cho màn hình kích thước lớn với `min-width: 992px`
- `md` medium - cho màn hình kích thước trung bình với `min-width: 768px`
- `sm` small - cho màn hình kích thước nhỏ với `min-width: 576px`
- không gắn từ khóa - cho màn hình kích thước rất nhỏ dưới mức `min-width: 576px` của `sm`

Ở đây mình chỉ sử dụng một điểm `breakpoint` là `lg` cho container chính với `.navbar-expand-lg`, giống với code ví dụ trong tài liệu Bootstrap. Tức là nếu như mặc định với thiết bị màn hình cỡ trung bình trở xuống là thanh điều hướng sẽ hiển thị với danh sách liên kết `.navbar-collapse`  được `.collapse` thu gọn lại. Nhưng nếu thiết bị đang sử dụng là màn hình cỡ lớn trở lên thì sẽ  được `.navbar-expand-lg` mở rộng ra thành dạng hiển thị các liên kết theo hàng ngang.

Các class hỗ trợ còn lại thì chúng ta sẽ nói tới ngay ở trong phần tiếp theo.

## Utilities & Helpers

Hai hạng mục `Utilities` và `Helpers` trước kia cũng được Bootstrap gộp làm 1 và chỉ gọi là `Utilities` thôi, để tập trung các class phụ họa, cung cấp các tiện ích hỗ trợ để hoàn thiện các thành phần kiến trúc chính. Đáng kể đến là các class `padding` và `margin` để điều chỉnh kích thước cho các phần tử và canh chỉnh vị trí dàn lại bố cục bên trong một thành phần kiến trúc. Bên cạnh đó là các class hỗ trợ thiết lập màu sắc, kích thước font chữ, đường viền...

Bây giờ thử tìm kiếm phần tài liệu về các class `padding` và `margin` thì sau khi ngó qua danh sách mở rộng của `Helpers` mình chỉ thấy có 1 từ khóa duy nhất có cảm giác là có liên quan. Đó là `Position`, tuy nhiên thì khi mở xem thì ở đây chỉ đề cập tới việc hỗ trợ gắn cố định một thành phần nào đó trên `viewport`. Tiếp tục tìm trong `Utilities` thì may mắn là nhìn thấy có từ khóa `Sizing` và `Spacing`. Và cái `Spacing` chính là thứ mà chúng ta cần tới.

![](https://images.viblo.asia/c81a6c5a-81b2-4060-b717-5aaabcb37c4b.png)

Các class `padding` và `margin` có quy tắc đặt tên giống nhau với chữ cái đầu tiên của tên thuộc tính và được mở rộng với phương hướng áp dụng: `x` ngang, `y` dọc, `s` start đầu, `e` end cuối, và mức độ áp dụng `-n` với 5 cấp độ `n` được định nghĩa sẵn và `auto`. Ví dụ `me-auto` có nghĩa là thêm `margin` ở cuối phần tử (bên phải) với giá trị `auto` hay có thể hiểu chính xác là `margin-right: auto;`. Hay `px-4` là thêm `padding` theo phương ngang ở mức 4, tức là thêm `margin-left` và `margin-right`.

Các class hỗ trợ cũng có thể gắn `breakpoint` bằng cách chèn các từ khóa vào giữa. Ví dụ như `px-lg-2` sẽ chỉ có hiệu lực đối với các thiết bị màn hình lớn. Tới đây thì mình tin chắc chắn rằng bạn đã có thể đoán được hết ý nghĩa những tên class mà mình đã sử dụng trong code ban đầu rồi. Chỉ còn 1 chút thao tác nữa đó là định nghĩa thêm vào class hỗ trợ theo phong cách đặt tên của Bootstrap để thực hiện những tùy chỉnh không được Bootstrap hỗ trợ. Ví dụ như tự định nghĩa `.border-lg-0` để bỏ hiển thị viền cho các thiết bị màn hình lớn.

```override.css
body {
  /* preserve navbar */
  padding-top: 62px;
}

.bg-dark {
  background-color: Black !important;
}

@media (min-width: 992px) {
   .border-lg-0 {
      border: none !important;
   }
}
```

Như vậy là chúng ta đã hoàn thành xong công việc xây dựng thanh điều hướng `responsive`
cho giao diện trang chủ dự kiến với khoảng hơn chục dòng CSS tự viết. Trong bài viết tiếp theo, chúng ta sẽ nói về 2 hạng mục `Content` và `Layout`, và tiếp tục xây dựng những phần còn lại giao diện trang chủ dự kiến.

[[Bootstrap] Bài 3 - Content & Layout](https://viblo.asia/p/aWj53xXGK6m)