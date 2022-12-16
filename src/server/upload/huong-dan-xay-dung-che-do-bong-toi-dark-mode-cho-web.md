Dark mode đúng như cái tên của nó, để dùng vào buổi tối, thay những màu sáng thành màu tối để đỡ ảnh hưởng đến mắt, nâng cao trải nghiệm người dùng. Đây là 1 trend được dùng nhiều trong thời gian gần đây. Chẳng hạn như Apple đã thêm nó vào hệ điều hành IOS và MacOS của mình. Window và Google cũng đã làm như vậy.

![](https://images.viblo.asia/4d552858-7796-48e8-b3fc-40f0dc6fca9b.png)
## Chuyển giữa 2 chế độ
Bạn đã có chế độ Light mode và muốn tạo thêm chế độ Dark mode? Vậy thì cần có 1 cái gì đó mà thông thường sẽ là 1 button để chuyển giữa 2 chế độ. Có nhiều cách để làm điều đó, trong bài viết này mình sẽ hướng dẫn các bạn 4 cách:
* Sử dụng class cho thẻ body
* Tách biệt file CSS
* Sử dụng CSS custom properties
* Sử dụng Server-side script

### Sử dụng class cho thẻ body
Cách này là thay đổi class cho thẻ body, để áp dụng cho tất cả CSS ở bên trong luôn.
```
<body class="dark-theme || light-theme">
```
Ví dụ chúng ta có 1 đoạn HTML thế này
```
<body>
  <button class="btn-toggle">Toggle Dark Mode</button>
  <h1>Hey there! This is just a title</h1>
  <p>I am just a boring text, existing here solely for the purpose of this demo</p>
  <p>And I am just another one like the one above me, because two is better than having only one</p>
  <a href="#">I am a link, don't click me!</a>
</body>
```
Ý tưởng của phương pháp này là style như bình thường và gọi nó là kiểu mặc định, ví dụ set light-mode là chế độ mặc định, ngoài ra, tạo thêm 1 tập hợp các style cho chế độ còn lại (trong trường hợp này là dark-mode) để trong class mà ta set cho thẻ body.
```
body {
  color: #222;
  background: #fff;
}
a {
  color: #0033cc;
}

/* Dark Mode styles */
body.dark-theme {
  color: #eee;
  background: #121212;
}
body.dark-theme a {
  color: #809fff;
}
```
Sau đó dùng thêm JS để chuyển giữa 2 chế độ
```
const btn = document.querySelector('.btn-toggle');

// Lắng nghe sự kiện click vào button
btn.addEventListener('click', function() {
  // Thêm hoặc xóa class dark-theme ở body
  document.body.classList.toggle('dark-theme');  
})
```
Vậy là xong, đơn giản nhỉ! :grin:

**[DEMO](https://codepen.io/adhuham/pen/dyodgPj)**
### Tách biệt CSS
Thay vì giữ tất cả CSS trong cùng 1 file, chúng ta có thể tách ra 2 file cho 2 chế độ. Ví dụ chế độ light-mode có file light-theme.scss
```
/* light-theme.css */
body {
  color: #222;
  background: #fff;
}
a {
  color: #0033cc;
}
```
Và tương tự chúng ta có dark-mode trong dark-theme.css
```
/* dark-theme.css */
body {
  color: #eee;
  background: #121212;
}
body a {
  color: #809fff;
}
```
Giờ hãy liên kết kiểu mặc định vào file HTML, ví dụ là light-mode
```
<!DOCTYPE html>
<html lang="en">
    <head>
          <!-- Light theme stylesheet -->
          <link href="light-theme.css" rel="stylesheet" id="theme-link">
    </head>
</html>
```
Ta sử dụng ID `#theme-link` để chuyển giữa 2 chế độ trong JS
```
const btn = document.querySelector(".btn-toggle");
const theme = document.querySelector("#theme-link");

// Lắng nghe sự kiện click vào button
btn.addEventListener("click", function() {
  // Nếu URL đang là "ligh-theme.css"
  if (theme.getAttribute("href") == "light-theme.css") {
    // thì chuyển nó sang "dark-theme.css"
    theme.href = "dark-theme.css";
  } else {
    // và ngược lại
    theme.href = "light-theme.css";
  }
});
```
**[DEMO](https://codepen.io/adhuham/project/full/AqjdGV)**
### Sử dụng CSS custom properties
Chúng ta có thể tận dụng sức mạnh của custom properties trong CSS để tạo chế độ dark-mode. Nó giúp chúng ta tránh phải viết cả bộ style cho từng chế độ, việc thay đổi style cũng dễ và nhanh hơn. Trong file HTML chúng ta vẫn sẽ chuyển class giống như cách đầu tiên. 

Còn trong file CSS, hãy xác định các giá trị của chế độ light-mode bằng custom properties
```
body {
  --text-color: #222;
  --bkg-color: #fff;
  --anchor-color: #0033cc;
}
```
Giờ đến các giá trị của chế độ dark-mode
```
body.dark-theme {
  --text-color: #eee;
  --bkg-color: #121212;
  --anchor-color: #809fff;
}
```
Cuối cùng sử dụng các giá trị mà chúng ta vừa tạo
```
body {
  color: var(--text-color);
  background: var(--bkg-color);
}
a {
  color: var(--anchor-color);
}
```
Chúng ta cũng có thể set tất cả các giá trị cho chế độ mặc định trong `:root {}` và các thuộc tính cho chế độ dark-mode trong `:root.dark-mode {}`.
### Sử dụng Server-side script
Nếu chúng ta đang làm việc với một ngôn ngữ Serer-side, ví dụ như PHP, thì chúng ta có thể sử dụng nó thay vì JS. 
```
<?php
$themeClass = '';
if (isset($_GET['theme']) && $_GET['theme'] == 'dark') {
  $themeClass = 'dark-theme';
}
$themeToggle = ($themeClass == 'dark-theme') ? 'light' : 'dark';
?>
<!DOCTYPE html>
<html lang="en">
<body class="<?php echo $themeClass; ?>">
  <a href="?theme=<?php echo $themeToggle; ?>">Toggle Dark Mode</a>
</body>
</html>
```
Chúng ta có thể sử dụng GET hoặc POST để lấy chế độ người dùng lựa chọn apply class cho body mỗi lần tải lại trang. Cũng có thể hoán đổi file CSS giống như trong cách thứ 2.
```
<?php
$themeStyleSheet = 'light-theme.css';
if (isset($_GET['theme']) && $_GET['theme'] == 'dark') {
  $themeStyleSheet = 'dark-theme.css';
}
$themeToggle = ($themeStyleSheet == 'dark-theme.css') ? 'light' : 'dark';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="<?php echo $themeStyleSheet; ?>" rel="stylesheet">
</head>
<body>
  <a href="?theme=<?php echo $themeToggle; ?>">Toggle Dark Mode</a>
</body>
</html>
```
Phương pháp này có một nhược điểm là trang cần được reload mỗi khi chuyển chế độ, nhưng nó sẽ duy trì được chế độ người dùng đã chọn sau mỗi lần tải lại trang.

**Vậy chúng ta nên chọn phương pháp nào?**

Nên sử dụng phương pháp nào phụ thuộc vào yêu cầu dự án của bạn, nếu bạn đang làm một dự án lớn, bạn có thể sử dụng các thuộc tính của CSS để xử lý một lượng code lớn. Tuy nhiên nếu dự án bạn cần hỗ trợ các trình duyệt cũ, thì bạn sẽ phải tiếp cận theo cách khác. Hơn nữa, không nhất định chỉ có thể sử dụng 1 phương pháp, bạn có thể kết hợp nhiều phương pháp, hoặc những cách khác ngoài 4 cách trên.
## Ghi nhớ lựa chọn của người dùng
Vậy là chúng ta đã xử lý được việc chuyển chế độ, thế nhỡ người dùng reload lại trang, hoặc chuyển sang trang khác thì thế nào? Để tránh cho web lại chuyển về chế độ default như một trò đùa, chúng ta cần lưu lại lựa chọn của người dùng. Để làm được điều đó, chúng ta có thể sử dụng localStorage hoặc cookie.
### Dùng localStorage
Chúng ta sẽ viết 1 đoạn script để lưu chế độ người dùng đã chọn vào localStorage, và ngược lại khi trang được reload, đoạn script này sẽ lấy sự lựa chọn từ localStorage và áp dụng nó. 
```
const btn = document.querySelector(".btn-toggle");
const currentTheme = localStorage.getItem("theme");

// nếu chế độ được lưu trong localStorage là "dark"
if (currentTheme == "dark") {
  // thì sẽ dùng .dark-theme class
  document.body.classList.add("dark-theme");
}

btn.addEventListener("click", function() {
  // Toggle class .dark-theme mỗi lần click
  document.body.classList.toggle("dark-theme");
  
  let theme = "light";
  // Nếu body chứa class .dark-theme
  if (document.body.classList.contains("dark-theme")) {
    // thì gán biến theme thành dark
    theme = "dark";
  }
  // lưu lựa chọn vào localStorage
  localStorage.setItem("theme", theme);
});
```
### Sử dụng Cookies với PHP
Với cách này, thay vì lưu chế độ vào localStorage, chúng ta sẽ tạo một cookie từ JS và lưu ở đó, tất nhiên, cách này chỉ khả thi khi làm việc với server-side language.
```
// Đoạn đầu khá giống cách phía trên
const btn = document.querySelector(".btn-toggle");

btn.addEventListener("click", function() {
  document.body.classList.toggle("dark-theme");
  
  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  // Lưu lựa chọn vào cookie
  document.cookie = "theme=" + theme;
});
```
Giờ chúng ta có thể kiểm tra sự tồn tại của cookie đó và load chủ đề thích hợp bằng cách áp dụng class cho thẻ body.
```
<?php
$themeClass = '';
if (!empty($_COOKIE['theme']) && $_COOKIE['theme'] == 'dark') {
  $themeClass = 'dark-theme';
}
?>
 
<!DOCTYPE html>
<html lang="en">
<body class="<?php echo $themeClass; ?>">
</body>
</html>
```
Còn nếu bạn sử dụng cách tách biệt CSS
```
<?php
$themeStyleSheet = 'light-theme.css';
if (!empty($_COOKIE['theme']) && $_COOKIE['theme'] == 'dark') {
  $themeStyleSheet = 'dark-theme.css';
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="<?php echo $themeStyleSheet; ?>" rel="stylesheet" id="theme-link">
</head>
<!-- etc. -->
```
## Dark mode design
Giờ bạn đã biết cách chuyển giữa 2 chế độ cũng như cách lưu lại lựa chọn của người dùng, chúng ta sẽ đến 1 phần cũng khá quan trọng, đấy là nên thiết kế chế độ Dark mode thế nào, hay cụ thể hơn là từ Light mode sang Dark mode nên thay đổi những gì. 

Tất nhiên, cơ bản nhất mà ai cũng nghĩ tới là thay màu sáng bằng màu tối, tuy nhiên, có một số yếu tố UI sẽ giúp cải thiện trải nghiệm người dùng tốt hơn.
### Dark mode image
Giảm độ sáng và độ tương phản của hình ảnh một chút sẽ trông dễ chịu hơn trên nền tối. Hình ảnh siêu sáng trên nền siêu tối có thể khiến người dùng chói mắt, làm mờ hình ảnh sẽ giúp cải thiện điều đó.
![](https://images.viblo.asia/05f1c20e-60f4-4319-ab29-0f68ab0d6e02.png)

Chúng ta sẽ sử dụng CSS `filter()` để làm điều này
```
/* Apply the filter directly on the body tag */
body.dark-theme img {
  filter: brightness(.8) contrast(1.2);
}
 
/* Or apply it via media query */
@media (prefers-color-scheme: dark) {
  img {
    filter: brightness(.8) contrast(1.2);
  }
}
```
### Dark mode shadow
Đối với shadow, nếu chúng ta chỉ đơn giản đảo ngược dark shadow thành light shadow, thì nhìn sẽ kiểu shadow sáng trên nền tối, khá là kì

![](https://images.viblo.asia/e595c826-826f-4f55-a3be-8b8f7ea6435a.png)

Thay vì thế ta có thể sử dụng opacity để tạo cảm giác về chiều sâu, làm nổi bật chủ thể thay cho shadow. Với các lớp càng sát background thì opacity càng cao, và ngược lại (áp dụng cho background color thôi nhé, đừng giảm opacity cả element :joy: )

![](https://images.viblo.asia/e018b260-dea5-41ad-8cd5-3ecd4c3f0d74.png)
### Dark mode Typography
Tương tự với hình ảnh, font chữ cũng cần cân đối độ tương phản, font quá dày tạo cảm giác bị chói trong khi font quá mảnh lại làm người dùng khó đọc, mỏi mắt khi cứ phải nhìn sát vào màn hình. 
Với cái này, bạn có thể tham khảo thêm trong [bài viết này](https://css-tricks.com/dark-mode-and-variable-fonts/).
### Dark mode Color
Chữ trắng tinh trên nền đen tuyền sẽ gây chói mắt vì độ tương phản quá lớn. Mẹo ở đây là chúng ta nên sử dụng các màu "gần đen" hoặc "gần trắng" thôi. Với background thì có thể dùng màu `#121212`.

![](https://images.viblo.asia/ef1d6563-c047-4ae2-be65-56e9d10e5613.png)

Nguồn: https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web