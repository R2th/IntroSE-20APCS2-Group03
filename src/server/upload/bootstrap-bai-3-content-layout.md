Trong bài viết này thì chúng ta sẽ cùng xem tổng quan về 2 hạng mục `Content` nội dung và `Layout` dàn trang trong tài liệu của Bootstrap. Trước hết thì chúng ta sẽ nói về `Content` bởi vì hiển thị các nội dung chi tiết là công việc quan trọng thứ 2 sau thiết lập các thành phần chính như thanh điều hướng hay slide ảnh. Rồi sau đó chúng ta mới có chất liệu để thực hiện dàn trang và canh chỉnh vị trí tạo ra bố cục hoàn chỉnh của một trang web.

## Hạng mục Content

![](https://images.viblo.asia/2fb162f0-c23f-4d48-a298-6e99c333bbdf.png)

Hạng mục Content cung cấp các class tiện ích giúp tùy chỉnh phong cách hiển thị cho các
kiểu nội dung phổ biến có mặt trong trang một trang web. Dễ thấy nhất là hạng mục
`Typography` dành cho các nội dung văn bản và `Images` dành cho các nội dung ảnh.

Mặc dù Bootstrap có thiết lập sẵn phong cách hiển thị cho các thẻ nội dung phổ biến như các thẻ tiêu đề `h1-h6`, các thẻ văn bản `p`, v.v... Tuy nhiên thường thì chúng ta sẽ muốn tùy biến kích thước chữ linh động hơn theo thiết kế của từng trang web. Do đó Bootstrap cung cấp thêm các class tiện ích để đáp ứng cho tác vụ tùy chỉnh này. Ví dụ như bộ class `display` với 6 cấp độ tùy chọn có thể giúp chúng ta điều chỉnh cỡ chữ của bất kỳ cấp tiêu đề nào theo ý muốn.

Hãy thử kiến trúc phần tiếp theo của giao diện trang chủ với một tiêu đề chính, một câu mô tả ngắn, và một nút nhấn.

```header.html
<!-- Header - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<header class="py-7 text-center text-white bg-trees">
   <div class="container-fluid">
      <p class="lead fw-normal">"Learn to code with the wisest master !"</p>
      <h1 class="display-1">T R E E S</h1>
      <a class="btn btn-primary btn-lg px-5 py-3 rounded-0 mt-3" href="#">START NOW</a>
   </div><!-- .container -->
</header>
```

Ở đây chúng ta sử dụng `.display-1` để tăng kích thước chữ cho tiêu đề và `.lead` để tăng kích thước chữ cho văn bản mô tả ngắn. Các class tiện ích còn lại hầu hết đều có sẵn trong `Utilities`. Ở phần này chúng ta cần thêm một khoảng `padding` khá lớn ở phía trên và dưới nội dung chính để tạo ra một vùng đủ rộng để thể hiện hình nền. Cấp `padding` theo phương dọc lớn nhất của Boostrap là `py-5` dường như không đáp ứng được yêu cầu nên mình đã định nghĩa thêm `.py-7`.

Hình nền của khối được thiết lập qua `.bg-trees` để tiện sử dụng lại ở thành phần nào đó khác nếu cần thiết.

```override.css
/* ... */

.bg-trees {
  background-image: url(https://s19.postimg.cc/bd31cyn6r/road.jpg);
  background-size: cover;
  background-position: center;
}

.py-7 {
  padding-top: 150px;
  padding-bottom: 150px;
}
```

##  Hạng mục Layout

![](https://images.viblo.asia/d8217db1-9153-4b32-b191-5e2e55513cbb.png)

Tác vụ dàn trang được Bootstrap định nghĩa gói gọn trong 2 bước:

- Tạo container chính để hiển thị nội dung tập trung giữa trang hoặc trải rộng toàn trang.
- Sử dụng lưới 12 cột để dàn bố cục cho các hàng nội dung.

Gần như bất kỳ thành phần nào của trang web cũng đều có một phần tử `.container` đóng bao trò bao quanh nội dung chính để cung cấp `padding` cơ bản giúp cho các nội dung không được hiển thị sát gần viền màn hình. Nhiều thiết kế web cũng cố gắng tạo ra vùng nội dung tập trung với chiều rộng không quá lớn để người đọc dễ theo dõi nội dung khi đọc xuống dòng. Do đó Bootstrap có cung cấp các `breakpoint` cho `.container` để chúng ta thực hiện tác vụ này.

Kế đến là các nội dung trong trang web của chúng ta thường được hiển thị theo các hàng
ngang. Do đó Bootstrap có định nghĩa `.row` để tạo hàng hiển thị với các phần tử con `.col-n` với tổng của `n` của mỗi hàng là `12` cột. Trong trường hợp chúng ta không chỉ định `n` thì Bootstrap sẽ tự chia đều số cột cho số phần tử con của hàng `.row`.

Phương thức này đủ linh động để giúp chúng ta thực hiện dàn trang cho hầu hết các thiết kế web. Ví dụ mà chúng ta có ở đây cũng chính là phần tiếp theo của giao diện trang chủ mà chúng ta đang xây dựng với 1 hàng nội dung gồm 3 cột cho phần `We speak_` và 3 hàng nội dung với 2 cột cho phần `People say_`.

```featured.html
<!-- Featured - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<section class="py-5">
   <div class="container-fluid px-4">
      <h2 class="display-4 text-center">We speak _</h2>

      <div class="row my-4">
         <div class="col-md py-3">
            <section class="py-5 text-center bg-light">
               <h3 class="h2">HTML</h3>
               <p class="lead">A simplified version of English</p>
               <a class="btn btn-primary rounded-0" href="#">Learn more</a>
            </section>
         </div><!-- .col -->

         <div class="col-md py-3">
            <section class="py-5 text-center bg-light">
               <h3 class="h2">CSS</h3>
               <p class="lead">Another version of English</p>
               <a class="btn btn-primary rounded-0" href="#">Learn more</a>
            </section>
         </div><!-- .col -->

         <div class="col-md py-3">
            <section class="py-5 text-center bg-light">
               <h3 class="h2">JavaScript</h3>
               <p class="lead">The next version of English</p>
               <a class="btn btn-primary rounded-0" href="#">Learn more</a>
            </section>
         </div><!-- .col -->
      </div><!-- .row -->
   </div><!-- .container -->
</section>
```

```feedback.html
<!-- Feedback - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<section class="py-5 bg-light">
   <footer class="container">
      <h2 class="display-4 text-center">People say _</h2>

      <div class="row justify-content-around mt-5 mb-3">
         <div class="col-md-5">
            <blockquote class="blockquote p-3 font-italic bg-white">
               <p>Nature can teach better than we do.</p>
               <footer class="blockquote-footer">W3club (w3schools?)</footer>
            </blockquote>
         </div><!-- .col -->

         <div class="col-md-5">
            <blockquote class="blockquote p-3 font-italic bg-white">
               <p>Nature is not another university. It's life.</p>
               <footer class="blockquote-footer">Albert English (Einstein?)</footer>
            </blockquote>
         </div><!-- .col -->

         <div class="col-md-5">
            <blockquote class="blockquote p-3 font-italic bg-white">
               <p>Everything we teach can be found in nature.</p>
               <footer class="blockquote-footer">Mozqito DevOps Network (Mozilla?)</footer>
            </blockquote>
         </div><!-- .col -->

         <div class="col-md-5">
            <blockquote class="blockquote p-3 font-italic bg-white">
               <p>Amazing teaching! They don't even use words.</p>
               <footer class="blockquote-footer">Isaac New York (Newton?)</footer>
            </blockquote>
         </div><!-- .col -->

         <div class="col-md-5">
            <blockquote class="blockquote p-3 font-italic bg-white">
               <p>Ada, what do you think?</p>
               <footer class="blockquote-footer">Nicola Tester (Testla?)</footer>
            </blockquote>
         </div><!-- .col -->

         <div class="col-md-5">
            <blockquote class="blockquote p-3 font-italic bg-white">
               <p>Like others said: "Nature is the best!"</p>
               <footer class="blockquote-footer">Ada Lovely</footer>
            </blockquote>
         </div><!-- .col -->
      </div><!-- .row -->
   </footer>
</section>
```

Ở phần `We speak_` bạn để ý thấy chúng ta có 3 phần tử con của hàng `.row` không cần chỉ định số cột chiều rộng và Bootstrap đã tự động chia đều 12 cột độ rộng cho 3 cột nội dung. Nếu như chúng ta sử dụng `.col-md-4` thay cho `.col-md` thì kết quả hiển thị thu được vẫn sẽ tương tự.

Ở phần tiếp theo `People say_` chúng ta chỉ định `.col-md-5` cho mỗi cột nội dung và còn dư 2 cột độ rộng. Lúc này class `.justify-content-around` được sử dụng để sử dụng 2 cột độ rộng còn lại chia đều làm `padding` xung quanh 2 cột nội dung. Các phần tử con 3, 4, 5, 6 của `.row` tự động được xuống dòng vì tối đa trong lưới 12 cột chỉ có thể hiển thị được tối đa 2 cột `.col-md-5`.

Trong `override.css` chúng ta có thể ghi đè `.bg-light` để có màu nền chính xác như mong muốn.

```override.css
/* ... */

.bg-light {
  background-color: WhiteSmoke !important;
}
```

Như vậy là giao diện trang chủ của chúng ta cũng đã gần hoàn chỉnh rồi. Mình tin là tới đây thì bạn đã có đủ tự tin để hoàn thành 2 phần còn lại là `And you_` và phần chân trang web. Bạn có thể lưu lại code đầy đủ ở dưới đây để tham khảo và hoàn thiện dần trang chủ của bạn.

```homepage.html
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

         <div class="navbar-collapse collapse" id="navbarSupportedContent">
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

      <!-- Header - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <header class="py-7 text-center text-white bg-trees">
         <div class="container-fluid">
            <p class="lead fw-normal">"Learn to code with the wisest master !"</p>
            <h1 class="display-1">T R E E S</h1>
            <a class="btn btn-primary btn-lg px-5 py-3 rounded-0 mt-3" href="#">START NOW</a>
         </div><!-- .container -->
      </header>

      <!-- Featured - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <section class="py-5">
         <div class="container-fluid px-4">
            <h2 class="display-4 text-center">We speak _</h2>

            <div class="row my-4">
               <div class="col-md py-3">
                  <section class="py-5 text-center bg-light">
                     <h3 class="h2">HTML</h3>
                     <p class="lead">A simplified version of English</p>
                     <a class="btn btn-primary rounded-0" href="#">Learn more</a>
                  </section>
               </div><!-- .col -->

               <div class="col-md py-3">
                  <section class="py-5 text-center bg-light">
                     <h3 class="h2">CSS</h3>
                     <p class="lead">Another version of English</p>
                     <a class="btn btn-primary rounded-0" href="#">Learn more</a>
                  </section>
               </div><!-- .col -->

               <div class="col-md py-3">
                  <section class="py-5 text-center bg-light">
                     <h3 class="h2">JavaScript</h3>
                     <p class="lead">The next version of English</p>
                     <a class="btn btn-primary rounded-0" href="#">Learn more</a>
                  </section>
               </div><!-- .col -->
            </div><!-- .row -->
         </div><!-- .container -->
      </section>

      <!-- Feedback - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <section class="py-5 bg-light">
         <footer class="container">
            <h2 class="display-4 text-center">People say _</h2>

            <div class="row justify-content-around mt-5 mb-3">
               <div class="col-md-5">
                  <blockquote class="blockquote p-3 font-italic bg-white">
                     <p>Nature can teach better than we do.</p>
                     <footer class="blockquote-footer">W3club (w3schools?)</footer>
                  </blockquote>
               </div><!-- .col -->

               <div class="col-md-5">
                  <blockquote class="blockquote p-3 font-italic bg-white">
                     <p>Nature is not another university. It's life.</p>
                     <footer class="blockquote-footer">Albert English (Einstein?)</footer>
                  </blockquote>
               </div><!-- .col -->

               <div class="col-md-5">
                  <blockquote class="blockquote p-3 font-italic bg-white">
                     <p>Everything we teach can be found in nature.</p>
                     <footer class="blockquote-footer">Mozqito DevOps Network (Mozilla?)</footer>
                  </blockquote>
               </div><!-- .col -->

               <div class="col-md-5">
                  <blockquote class="blockquote p-3 font-italic bg-white">
                     <p>Amazing teaching! They don't even use words.</p>
                     <footer class="blockquote-footer">Isaac New York (Newton?)</footer>
                  </blockquote>
               </div><!-- .col -->

               <div class="col-md-5">
                  <blockquote class="blockquote p-3 font-italic bg-white">
                     <p>Ada, what do you think?</p>
                     <footer class="blockquote-footer">Nicola Tester (Testla?)</footer>
                  </blockquote>
               </div><!-- .col -->

               <div class="col-md-5">
                  <blockquote class="blockquote p-3 font-italic bg-white">
                     <p>Like others said: "Nature is the best!"</p>
                     <footer class="blockquote-footer">Ada Lovely</footer>
                  </blockquote>
               </div><!-- .col -->
            </div><!-- .row -->
         </footer>
      </section>

      <!-- Subscription - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <section class="py-5">
         <div class="container">
            <h2 class="display-4 text-center">And you _</h2>

            <div class="row justify-content-around mt-5 mb-3">
               <div class="col-md-6">
                  <form class="p-3 p-md-5 bg-light border border-5">
                     <div class="lead text-center">
                        Join 86,400 others in learning how to code.<br>
                        Receive divine messages from the wisest masters.
                     </div><!-- .lead -->
                     <div class="input-group mt-4">
                        <input type="text" class="form-control rounded-0"
                               placeholder="Enter your email address"
                               aria-label="Enter your email address"
                        ><!-- input -->
                        <span class="input-group-btn">
                           <button class="btn btn-secondary rounded-0" type="submit">Subscribe</button>
                        </span>
                     </div><!-- .input-group -->
                  </form>
               </div><!-- .col -->
            </div><!-- .row -->
         </div><!-- .container -->
      </section>

      <!-- Footer - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
      <footer class="py-6 bg-dark text-white text-center">
         &copy;2022 Made with
         <span class="text-primary">&hearts;</span>
         by Semi Art
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
   </body>
</html>
```

```override.css
body {
  /* preserve navbar */
  padding-top: 62px;
}

.bg-dark {
  background-color: Black !important;
}

.bg-light {
  background-color: WhiteSmoke !important;
}

.bg-trees {
  background-image: url(https://s19.postimg.cc/bd31cyn6r/road.jpg);
  background-size: cover;
  background-position: center;
}

.py-7 {
  padding-top: 150px;
  padding-bottom: 150px;
}

@media (min-width: 992px) {
   .border-lg-0 {
      border: none !important;
   }
}
```

Như vậy là chúng ta đã thực hiện phương thức áp dụng Bootstrap đơn giản nhất để xây dựng một giao diện trang chủ đơn giản. Tuy nhiên thì để có thể sử dụng Bootstrap ở cấp độ tối ưu và xây dựng các các trang web có thiết kế phong phú hơn sẽ yêu cầu chúng ta học thêm JavaScript. Đây là 1 trong 3 ngôn ngữ bắt buộc cần phải biết đối với bất kỳ ai muốn học lập trình web.

Nếu như HTML cho phép chúng ta cấu trúc nội dung của trang web, CSS cho phép chúng ta thiết lập phong cách hiển thị của các nội dung, thì JavaScript ở khía cạnh khác lại cho phép chúng ta viết kịch bản đáp ứng cho các thành phần kiến trúc để tương tác với người dùng. Hay nói một cách khác, với HTML và CSS thì chúng ta có thể vẽ ra một giao diện người dùng, giao diện web hay giao diện phần mềm thì cũng chỉ là tên gọi khác nhau mà thôi, còn với JavaScript thì chúng ta có thể lập trình cách hoạt động của giao diện mà chúng ta đã vẽ ra trước đó.

Và tới đây thì mình hy vọng rằng bạn sẽ tiếp tục tham gia cùng với mình trong hành trình tự học thêm JavaScript nữa. Hẹn gặp lại bạn trong bài viết đầu tiên về JavaScript của `Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên`.

[[JavaScript] Bài 1 - JavaScript Là Cái Gì?](https://viblo.asia/p/1VgZvAxMKAw)