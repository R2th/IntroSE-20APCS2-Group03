>*Một ngày đẹp trời, mình bắt đầu nổi hứng muốn tạo một trang blog cho riêng mình để lưu lại những cái mình đã trải nghiệm và đang tìm hiểu. Tập trung chính vào công nghệ và tiếng anh. Mình lượn lờ trên mạng và xem cách tạo trang web cá nhân cũng như dùng cái gì để giải quyết vấn đề đó, nào là Wordpress, Hexo, Jekyll, Hugo,… Và sau một vài chục phút tìm hiểu thì mình quyết định chọn Hugo để đồng hành cùng mình. Tại sao chỉ từ A đến X, vì mình muốn để Z cho bạn tự trải nghiệm*

## Tại sao chọn Hugo?
Hugo là một nền tảng giúp bạn xây dựng một trang web tĩnh tích hợp sẵn với github được viết bằng ngôn ngữ `Golang` (con ruột của Google) và sử dụng `markdown` (file .md) để viết bài. Link dành cho bạn nào chưa biết về `markdown` [tại đây](https://quantrimang.com/cu-phap-markdown-can-ban-163963). Vậy tại sao mình lại sử dụng Hugo để tạo blog?

&ensp;**Ưu điểm**: 
* Tốc độ build trang web nhanh <br>
* Không có cơ sở dữ liệu, plugin không yêu cầu bất cứ quyền nào, không lo ngại về bảo mật.
* Không có quá nhiều thứ phải tìm hiểu để bắt đầu. 

&ensp;**Nhược điểm**: 
* Chắc là bạn phải biết chút ít về lập trình thì sẽ dễ dàng hơn.

Nào, bây giờ vào vấn đề chính, cùng tạo ra một trang web cho chính mình để khoe với bạn bè nào.
## 1.	Cài đặt Hugo trên Window
Vì mình đang dùng Window nên mình sẽ hướng dẫn cài đặt ở trên Window thôi nhé.

Link tải: [Hugo -> chọn phiên bản Windows-64bit](https://github.com/gohugoio/hugo/releases)

Tải về -> giải nén vào thư mục bất kỳ.

Vào Control Panel -> System and Security -> System -> Advanced system settings -> Tab “Advanced” và cài đặt như hình.

![](https://images.viblo.asia/4df58b3b-bbbb-40f5-a871-d9c7aaa74f07.png)

Mở `cmd` và gõ lệnh `hugo version`. Nếu hiển thị dòng “Hugo Static Site Generator…” thì có nghĩa là bạn đã cài Hugo thành công. 
Okeee, vậy là đã xong bước đầu tiên trong hành trình tạo blog cá nhân, tiếp theo chúng ta sẽ …..

## 2.	Tạo thư mục mà bạn lưu source code dưới local.

Chọn một thư mục bất kì và gọi `cmd`. Ở đây mình sẽ tạo thư mục `QuanBlog` ở ổ đĩa F bằng cách vào ổ F, gọi cmd và sử dụng lệnh `hugo new site QuanBlog`. Tận hưởng thành quả…tadaaa.

![](https://images.viblo.asia/6dd84da0-a703-44a8-9977-f7ca7c0bd787.png)

## 3.	Chọn theme cho blog của bạn.
Hugo cung cấp một kho theme cho bạn tha hồ lựa chọn ở [https://themes.gohugo.io/.](https://themes.gohugo.io/.)

Ở bài viết này, mình sẽ sử dụng theme **`Hello Friend NG`** để làm theme chính cho blog. Yia, tải về và cấu hình thoai.

*	Chọn theme và clone về thư mục blog hoặc tải file zip về sau đó giải nén và copy vào thư mục `themes` của bạn.

Mở `cmd` và clone: `git clone https://github.com/rhazdon/hugo-theme-hello-friend-ng.git themes/hello-friend-ng`

Sau đó bạn vào thư mục `exampleSite` của theme mà bạn vừa tải về, copy và ghì đè toàn bộ những gì có trong đó ra ngoài thư mục chính của bạn (Bao gồm thư mục content, resources và file config.toml).

Mở `cmd` lên và gõ lệnh `hugo server`, vào trình duyệt và gõ `localhost:1313`. Tadaaa…Các bạn sẽ được kết quả như này.

![](https://images.viblo.asia/12aa07a2-a68b-418a-a08a-0aa94c0b8ce4.png)

## 4.	Thử viết một bài chào sân chơi mới nào.

Vào editor yêu thích của bạn để gõ vài dòng code nhé. Mình thì mình sử dụng `Visual Studio Code` để thực hiện nhiệm vụ này :D

Các bạn sẽ thấy trong thư mục `content` có mục `posts` và các file như thế này. Xóa những bài viết mặc định của theme này và sẽ tạo bài viết mới nhé.

![](https://images.viblo.asia/a8f68120-c631-4479-98a7-b4345db764c6.png)

Bật `terminal`, gõ `hugo new posts/hello.md`. Trong đó `posts` là thư mục `posts`, `hello.md` là file để viết bài. Các bạn cấu hình lại như sau.

![](https://images.viblo.asia/40a370c5-1447-48a2-8a7d-e81b82a1db12.png)

Quay lại trình duyệt và check thử xem như nào…

![](https://images.viblo.asia/52d66cc4-db7b-4401-8b5f-f0d61b759eb9.png)

Ok rồi nè, tiếp theo….

## 5.	Deploy lên gihub để gửi link sang khoe với bạn bè hay bạn bồ nào.

Trước tiên vào `github` tạo một cái `repository` để chứa `source code` và đặt tên theo cấu trúc như này để làm tên miền cho trang blog của mình luôn.
`<username>.github.io`

Còn nếu đặt một tên khác, ví dụ như đặt repository là Myblog thì sau này muốn vào trang Blog của bạn, bạn phải gõ `<username>.github.io/Myblog`.

Chọn `Public` để được được kích hoạt Github Pages nhé. Tích vào ô `Initialize this repository`… Sau đó `Create repository thôi`.

![](https://images.viblo.asia/353197e0-bb50-4f04-b082-0c52b30323b5.png)

Ok, bước tiếp theo mình sẽ kết nối giữa `repository` trên `git` và `repository` dưới `local` của mình (là thư mục QuanBlog), mục đích là để nó nhận ra là cùng chung một nhà với nhau, để lát `push` được `source code` dưới `local` lên. Mình sẽ chỉ đẩy code ở thư mục `public` lên (thư mục này `generate source code` của mình ra `html` để hiển thị lên web). Nếu các bạn không thấy thư mục này thì vào thư mục chính gọi `cmd` và nhập lệnh `hugo` nhé. Sau đó vào thư mục `public` và `remote repo` trên git về.

* git init <br>
* git remote add origin https://github.com/hongquanhak/hongquanhak.github.io.git

Commit và push code lên github thôi nào.

* git add .
* git commit -m “first commit”
* git push -u origin master (git push -f orgin master)

![](https://images.viblo.asia/a758d173-f882-4d44-9242-7ccfde870cb9.png)

Vào kiểm tra trong `repository` thấy như này là bạn đã push code thành công rồi đấy. Tiếp theo vào `Settings`, ở trong mục `Options`, kéo xuống phía dưới mục `GitHub Pages` và bạn sẽ thấy như ảnh dưới đây, nghĩa là bạn đã có thể sử dụng trang web rồi.

![](https://images.viblo.asia/a8acd04d-8ddc-4660-9cbe-a2c4a9b49b3d.png)

Tèn tén, háo hức quá, vào kiểm tra trang web của mình nào.

![](https://images.viblo.asia/0659a12b-b3ab-4a5b-9c8f-2a9beea03d42.png)

Nhưng mà, ối, tại sao nó lại ra như thế này, huhu. Đừng quá lo lắng, chúng ta sẽ giải quyết nhanh thôi mà. Hãy quay lại source code của bạn, vào file `config.toml` (ở folder chính chứ không phải trong folder theme nhé). Sửa dòng `baseURL = “https://hongquanhak.github.io/”`. Nghĩa là trỏ tới trang web của bạn. 

Sau đó bật terminal lên nhập lệnh `hugo` để nó `generate` sang thư mục `public`. Cuối cùng vào thư mục `public` và `git add .` -> `git commit -m “gì gì đó”`  ->` git push origin master`

![](https://images.viblo.asia/040caff7-6e3f-4380-a94a-dbef7b2187b3.png)

Đợi tầm 10s để github cập nhật lại trạng thái và cuối cùng, chần chừ gì nữa mà không bật trang web của mình và tận hưởng thành quả…

![](https://images.viblo.asia/080644d4-0565-4f0c-839e-037d5ed0a0ac.png)

Okey, vậy là xong rồi đó, muốn chỉnh sửa thêm thì các bạn vào file `config.toml` để sửa theo ý muốn của mình và có thể tìm hiểu thêm về `golang` để vọc vạch nhiều trò hơn trên trang blog nhé. Chúc các bạn có một trang blog thật hịn <3

P/s: À mà nữa, nên tạo thêm một cái repository trên github và để ở chế độ `Private` xong rồi push toàn bộ source code của mình lên đấy để lỡ sau này có mất file thì còn `clone` trên git về và tái sử dụng được nhé.