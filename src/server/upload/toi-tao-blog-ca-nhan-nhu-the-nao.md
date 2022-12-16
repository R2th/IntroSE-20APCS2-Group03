Phải nói như nào nhỉ...
Dạo này có gặp tình trạng lại những **công nghệ**, **kỹ thuật**, **cách debugger**,... mình tìm hiểu, đã làm trong những dự án trước hoặc từng sử dụng ở đâu rồi nhưng chợt sang dự án mới cần dùng đến thì không nhớ là mình đã từng xử lý như thế nào, lục lọi trong chat log, drive, đủ các chỗ nhưng **WELL...** không thấy...!!
Mình đã suy nghĩ mất mấy đêm để tìm ra cách để lưu vết nó lại **VÀ** tình cờ mình có đọc được 1 bài viết của đứa bạn học cùng giới thiệu về  `Hexo` thế là mình tự nghĩ
> ***"TĐN mình không làm cái blog nhỉ, học được gì mình note hết lên đây vừa chia sẻ được cho ai đó vào đọc vừa giúp mình lưu lại được nhưng thứ cần thiết có thể sẽ giúp ích cho mình sau này."***

Và thế là `NN-Blog` ra đời. :D :D

**Thì nội dung của bài viết này mình sẽ chia sẻ cách mà mình đã xây dựng `NN-Blog` sử dụng `Hexo Framework` như thế nào??**

# Thì Hexo là cái gì???

`Hexo` là một blog framework mạnh mẽ, nó tạo static web một cách đơn giản và nhanh chóng hoàn toàn bằng `NodeJS`. Bạn có thể viết bài bằng `Markdown` hoặc các markup languages khác.

# Để bắt tay vào thì chúng ta cần chuẩn bị

**1. NodeJS**

Hiện tại phiên bản NodeJS mình đang dùng là `v12.18.3`.
Mình khuyên là các bạn nên cài NodeJS `>= 12.0`

```bash
nn@ngoann:~/ngoann_blog$ node -v
v12.18.3
```

**2. Tài khoản `github`**

Cái này thì thôi mình không hướng dẫn các bạn đăng ký, các bạn lên trang chủ https://github.com tìm hiểu nhé.

# Tiến hành cài đặt

## Cài đặt Hexo

Vì **Hexo** cung cấp `command-line` nên ở đây mình sẽ thêm flag `-g` để có thể sử dụng mà `cli` **Hexo** cung cấp ở mức `global` (hiểu nôm na là dùng ở chỗ nào trên máy cũng được)

```bash
$ npm install hexo-cli -g
```

Khi cài xong để tạo project mới bạn chỉ cần chạy lệnh

```bash
$ hexo init ngoann_blog
```

Sau đó cài `dependencies` cho project

```bash
$ cd ngoann_blog
$ npm install
```

Xong xuôi rồi thì bật server lên thôi

```bash
$ hexo server
```

Và đây là kết quả khi vào địa chỉ http://localhost:4000

![Hexo demo](https://ngoann.github.io/assets/Hexo.png "Hexo demo")

## Thay theme cho Blog

Như trên đó là theme mặc định của `Hexo` nhưng các bạn có thể thay đổi theme khác vì `Hexo` có 1 ngân hàng theme (**khoảng hơn 300 thì phải**) nên anh em thoải mái mà lựa chọn..

Đây link em nó đây: https://hexo.io/themes/

Theme của `NN-Blog` mình đang dùng là [Anatole-Core](https://github.com/mrcore/hexo-theme-Anatole-Core).

Khi chọn được theme ưng con mắt rồi thì các bạn thực hiện như sau

***(Tùy vào mỗi theme sẽ có cách cài đặt khác, bạn nên vào trang github theme đó đọc hướng dẫn nhé)***

```bash
$ cd ngoann_blog
$ git clone https://github.com/mrcore/hexo-theme-Anatole-Core.git themes/anatole-core
$ npm install hexo-renderer-pug --save
```

Tiếp theo là mở file `_config.yml` rồi sửa `theme: anatole-core` để  nhận theme mới vừa tải về.

OK, restart server nào.

```bash
$ hexo server
```

Thôi phần kết quả này mình không chụp ảnh nữa... các bạn tự tận hưởng nhé.

## Tạo bài viết như thế nào?

Ở trên `documentation` của `Hexo` hướng dẫn như thế này?

```bash
$ hexo new [layout] <title>
```

* **title**: Cái này thì không nói nhá, nó chính là tiêu đề của bài viết
* **layout**: Có 3 loại layout là `post`, `page`, `draft`

Mình ví dụ luôn nhá, mình sẽ tạo 1 bài viết có tiêu đề là **"NN-Blog được xây dựng như thế nào?"** thì lệnh tạo sẽ là:

```bash
nn@ngoann:~/ngoann_blog$ hexo new post "NN-Blog được xây dựng như thế nào?"
INFO  Validating config
INFO  Created: ~/ngoann_blog/source/_posts/NN-Blog-duoc-xay-dung-nhu-the-nao.md
```

Đấy, khi chạy xong nó sẽ tự tạo ra file `N-Blog-duoc-xay-dung-nhu-the-nao.md` có nội dung là:

```yml
---
title: NN-Blog được xây dựng như thế nào?
date: 2020-09-16 21:10:32
tags:
---
```

Dưới dấu `---` thứ 2 là phần nội dung và sẽ sử dụng cú pháp của Markdown (https://www.markdownguide.org/basic-syntax/)

Để mình ví dụ nhá

```yml
---
title: NN-Blog được xây dựng như thế nào?
date: 2020-09-16 21:10:32
tags:
---

# Mở đầu chào nhau cái nhỉ

Chào mừng bạn đã đến với `NN-Blog`
```

Và đây là kết quả:

![Screenshot from 2020-09-16 22-58-36 demo](https://ngoann.github.io/assets/Screenshot_from_2020-09-16_22-58-36.png)

Thì đó, nom na là như vậy, bạn hãy vào địa chỉ [này](https://www.markdownguide.org/basic-syntax/) để biết thêm về `Markdown` nhá.

## Deploy lên github

Đầu tiên bạn tạo 1 repo trên github theo định dạng `<username-github>.github.io`
Ví dụ: github username của mình là `ngoann` thì mình sẽ tạo repo có tên là `ngoann.github.io`

Sau đó mở file `_config.yml` lên và sửa thành như sau

```yml
deploy:
    type: git
    repo: https://github.com/ngoann/ngoann.github.io.git
```

Thì để deploy được lên github thì bạn phải cài thêm plugin `hexo-deployer-git` nữa:

```
$ npm install hexo-deployer-git -save
```

Khi cài xong chạy tiến hành `build` và `deploy` lên github thôi

```bash
$ hexo generate
$ hexo deploy
```

Trong quá trình deploy sẽ có hỏi thông tin github, bạn cứ nhập bình thường là được.

Tèn ten và đây là kết quả: http://ngoann.github.io/