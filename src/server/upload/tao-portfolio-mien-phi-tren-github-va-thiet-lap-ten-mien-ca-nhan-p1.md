# Giới thiệu

Chào các bạn, đối với các bạn sinh viên chuẩn bị đi thực tập hay mới ra trường thì có một cái Portfolio online, sẽ hỗ trợ được các bạn kha khá trong việc gây ấn tượng với nhà tuyển dụng.
Trong bài viết này mình sẽ hướng dẫn các bạn từ a-z cách tạo một trang Portfolio cho riêng mình vô cùng đơn giản và miễn phí trên Github với **Github Pages** và cách thiết lập **tên miền cá nhân**  của bạn về cái Portfolio này. 
Bài viết này dành cho các bạn đã biết về Github và biết các kiến thức cơ bản tạo 1 trang web bằng HTML, CSS 

#  Portfolio là cái gì?
Portfolio là nơi tổng hợp các dự án mà bạn đã từng tham gia thực hiện. Qua Portfolio các nhà tuyển dụng có thể đánh giá được năng lực, kỹ năng và kinh nghiệm của bạn trong quá trình học tập và làm việc. 
Đối với CV thì việc đơn giản, ngắn gọn, súc tích là rất quan trọng nhưng với Portfolio thì bạn có thể đưa rất nhiều nội dung vào đó như hình ảnh, video, ... và trang trí bắt mắt nhầm mục đích gây ấn tượng hơn với nhà tuyển dụng sau khi đã xem qua CV. 

#  I. Tạo project trên Github

### 1. Tạo project 
Bạn vào github.com/new tạo một repository và đặt tên theo đúng cú pháp như sau: **<account_name>.github.io**
Ví dụ: tên tài khoản của mình là **tangtaifpt** thì tên của repository sẽ là **tangtaifpt.github.io** và nhớ là để chế độ public.

![Create repos](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/create-repos.png?raw=true)

### 2. Cài đặt Github Pages 
Sau khi tạo xong Project
Các bạn vào phần **Setting**, lướt xuống dưới và chọn phần **Pages**
![Create repos](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/go-page-page.png?raw=true)

### 3. Chọn theme (optional)
Kế tiếp ở đây sẽ cho phép bạn chon Theme, **bước này không làm cũng được**. Theme là template có sẵn của Github giúp bạn tạo nhanh 1 cái Portfolio. Cái template này sẽ được thêm vào Repository của bạn dưới dạng 1 file `index.md` (định dạng markdown).

*Chúng ta hoàn toàn có thể custom lại ra một trang web lung linh long lanh lấp lánh chứ không phải chỉ bó buộc trong phạm vi của 1 file markdown* 

![Create repos](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/choose-a-theme.png?raw=true)

Bấm Choose a theme 

![Create repos](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/scroll-down-to-save-theme.png?raw=true)

Bây giờ thì chọn 1 theme, ở đây mình chọn cái Cayman, sau đó bấm Select theme.

Sau khi chọn Theme sẽ hiện ra 1 giao diện với phần code của file `index.md` của github cho phép bạn chỉnh sửa nó cho phù hợp với thông tin của bản thân.

![Create repos](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/save-theme.png?raw=true)

Lướt xuống dưới và bấm Commit changes để lưu lại.

Lúc này bạn đã có thể gõ trên thanh địa chỉ trình duyệt **http://<user_name>.github.io** và sẽ thấy ngay được kết quả. Giả sử trường hợp của mình là http://tangtaifpt.github.io

![Create repos](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/current-result.png?raw=true)

# II. Custom project
Để tạo trang Web cho riêng mình thì việc đơn giản là các bạn thêm vào Repository  1 file `index.html`. Mặc định khi Github Page thấy file `index.html` này thì nó sẽ tự động hiển thị lên khi ta truy cập vào tên miền **user_name.github.io**. Và file `index.html` cũng được ví như là Home Page của các bạn vậy, và hoàn toàn có thể direct sang các file html khác. 
*Ở phần này đòi hỏi các bạn đã có biết kiến thức về Git cũng như Github để tiến hành clone và push lên Remote repository*

### 1. Clone project
Có nhiều cách để clone 1 project từ trên github về nhưng thông qua terminal, git bash hay các IDE.

### 2. Tiến hành tạo các file html, css
Như đã nói ở trên thì file `index.html` là bắt buộc phải có. Ở đây mình sẽ ví dụ đơn giản bằng 2 file html và 1 file css. 

*Điều quan trọng là bạn cũng cần xóa luôn 2 cái file template cũ là `index.md` và file `_config.yml` chứa template mà bạn đã chọn ban đầu (nếu có). Chỉ để mỗi `index.html` và các file có liên quan mà thôi.*

Cấu trúc project của mình lúc này sẽ trông như sau: 

![Project-structure](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/project-structure.png?raw=true)

**File `index.html`**
![Index page](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/index-page.png?raw=true)

**File `hello_world.html`**
![Index page](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/helloword-page.png?raw=true)

**File ``style.css``**
![Index page](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/style-css.png?raw=true)
Đơn giản là để biến các thẻ `<h1>` thành màu đỏ mà thôi.

Lúc này mình sẽ tiến hành add và commit, push các file đã thêm vào repository lên Github. Khi các bạn push lên Github thì nó sẽ tự động cập nhật trên trang .github.io của các bạn nhưng thường sẽ mất 1 khoản thời gian ngắn.

Sau khi push mình truy cập lại vào trang tangtaifpt.github.io, kết quả ta thấy:
![Index page](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/index-demo.png?raw=true)
Nội dung của file `index.html` đã được hiển thị và apply style của `style.css`. Bây giờ mình sẽ bấm vào ***Link Go to Hello World page*** để điều hướng sang file `hello_world.html`
![Index page](https://github.com/TangTaiFPT/tangtaifpt.github.io/blob/main/image/hello-world-demo.png?raw=true)

Bạn đừng trách mình sao làm nó hơi xấu tại vì đây là phần demo của mình để cho các bạn biết các bạn hoàn toàn có thể tạo ra các website tùy ý và đưa lên Github Pages để hiển thị và hoàn toàn miễn phí.

Bài viết cũng tương đối dài nên mình sẽ kết thúc tại đây, ở [Phần 2](https://viblo.asia/p/tao-portfolio-mien-phi-tren-github-va-thiet-lap-ten-mien-ca-nhan-p2-maGK7BAA5j2) mình sẽ hướng dẫn các bạn tạo tên miền và trỏ về trang Portfolio của mình. Tức là thay vì các bạn để `username.github.io` thì có thể đổi thành các tên miền khác như `tangtai-port.com`, `minhluan.net` gì đấy chẳng hạn. Điều này giúp Portfolio trong cũng đỡ "free" hơn. 

[Phần 2. Hướng dẫn thiết lập tên miền](https://viblo.asia/p/tao-portfolio-mien-phi-tren-github-va-thiet-lap-ten-mien-ca-nhan-p2-maGK7BAA5j2)

Ok, cám ơn các bạn đã đọc. Luôn cố gắng học hỏi và nâng tầm bản thân các bạn nhé!