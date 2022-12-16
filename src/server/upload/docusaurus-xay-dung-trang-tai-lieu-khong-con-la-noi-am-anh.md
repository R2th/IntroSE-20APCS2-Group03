Xin chào mọi người, đối với việc phát triển phần mềm đa phần việc viết tài liệu có thể là một rắc rối, khó khăn và là một công việc nhàm chán đôi khi khá mất thời gian. Vậy nên làm thế nào để ta có được một tài liệu mô tả về các chức năng, cách tích hợp một cách nhanh chóng và dễ sử dụng là điều rất khó khăn cho mỗi người.

Đó là lý do chúng ta sẽ tìm hiểu về Docusaurus trong bài này.

## 1: Docusaurus là gì?
Docusaurus là một dự án mã nguồn mở cho phép bạn viết tài liệu dưới dạng Markdown và hỗ trợ rất nhiều sự linh hoạt để có thể tùy chỉnh và tạo các trang web tài liệu trực quan một cách nhanh chóng!

Docusaurus được xây dựng bởi Facebook nên chắc chắn là lựa chọn tuyệt với nếu bạn có kinh nghiệm với React thì việc tùy chỉnh nó cực kì dễ dàng và thuận lợi cho bạn, nếu bạn không biết React cũng không sao vì mục tiêu là chúng ta chỉ tập trung vào content hoàn toàn được việc bởi Markdown

Ngoài ra bạn cũng có thể sử dụng Docusaurus để xây dựng trang web cá nhân, sản phẩm, blog, trang đích tiếp thị, v.v nhưng ở đây mình chỉ tập trung vào việc tạo trang tài liệu tĩnh với Docusaurus.

## 2: Các bước cài đặt
### Install
Việc cài đặt docusaurus cực kì đơn giản với 1 câu lệnh duy nhất: `npx @docusaurus/init@latest init my-website classic`

3 thành phần đầu là **npx**, **@docusaurus/init@latest**  và **init** hẳn là các bạn đã đoán ra tác dụng là câu lệnh npx, repo, và lệnh khởi tạo rồi nên chúng ta quan tâm 2 thành phần còn lại là tên project **my-website** và loại template mà bạn sử dụng là **classic**.

Nếu bạn không chỉ định loại template trong câu lệnh thì trong quá trình cài đặt bạn sẽ được hỏi là chọn loại template nào. Hiện tại có sẵn 3 loại template cho bạn lựa chọn là *classic*, *bootstrap* và *facebook*.

Sau khi chạy lệnh thành công các bạn sẽ nhận được kết quả như dưới đây
![](https://images.viblo.asia/cca0ba15-07b5-4a76-964d-194bd9877f12.png)

### Run project
Các bạn có thể thấy 2 lệnh tiếp theo cần để run project là truy cập vào thư mục dự án: `cd my-website` và sau đó run project bằng lệnh `yarn start` hoặc bạn cũng có thể chạy bằng lệnh `npx docusaurus start`. Sau khi chạy thành công bạn mở đường dẫn `http://localhost:3000`  và đây là kết quả

![](https://images.viblo.asia/12edf677-ceef-496d-bebd-c598329b59de.png)

### Cấu trúc thư mục dự án
```shell
my-website
├── blog
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── build/
├── docs
│   ├── tutorial-basics
│   │   └── some .md files
│   ├── tutorial-extras
│   │   └── some .md files
│   └── intro.md
├── src
│   ├── components
│   │   ├── HomepageFeatures.js
│   │   └── HomepageFeatures.module
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       ├── index.js
│       └── markdown-page.md
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── README.md
├── sidebars.js
└── yarn.lock
```
#### Các thành phần 
**mình đã loại bỏ bớt một số thành phần mà bạn có thể ít quan tâm**

`/blog/` - Thư mục chưa các file markdown cho blog của bạn, bạn hoàn toàn có thể xóa nó đi khi bạn không xây dựng một blog. Bạn có thể tham khảo cách cài đặt thêm cho blog tại [đây](https://docusaurus.io/docs/blog)

`/docs/` - Nơi chứa toàn bộ Markdown files cho tài liệu của bạn.

`build` - Đây là nơi chứa source code của bạn sau khi build, bạn có thể deploy thẳng folder này lên github page hoặc netlify....etc (xem hướng dẫn deploy netlify bên dưới)

`/src/` - Các loại phải mà không phải dành cho mục đích tạo tài liệu của bạn, ví dụ như page hoặc một React component nào đó mà bạn viết. 

`/src/pages` -  Các file trong thư mục này sẽ được chuyển  thành 1 page. chi tiết hơn bạn có thể xem ở [đây](https://docusaurus.io/docs/creating-pages)

`/static/` - thư mục các tài nguyên tĩnh của bạn, ví dụ như hình ảnh.

`/sidebar.js` - được dùng để chỉ định thứ tự các trang tài liệu của bạn trên sidebar

Hiện tại chúng ta tập chung vào thư mục `docs/` nơi chứa các files tài liệu mà chúng ta sẽ viết, các thành phần khác sẽ được hướng dẫn ở bài viết khác hoặc bạn có thể tự tìm hiểu thêm.

#### Các thành phần trong 1 file Markdown của bạn
File tài liệu Markdown của bạn có một số thành phần thông tin quan trọng được đặt trên cùng của file gọi là  [Front Matter](https://jekyllrb.com/docs/front-matter/)

Ví dụ:
chúng được  bắt đầu bằng `---` và cũng kết thúc bằng `---`

```markdown
---
title: Hello
sidebar_label: "Xin chào"
sidebar_position: 1
slug: /my-custom-url
---

# Trang tài liệu đầu tiên

Đây là trang tài liệu đầu tiên của tôi

```

`title`:  Title của tab trên trình duyệt

`sidebar_label`: tên hiển thị tài liệu của bạn trên sidebar

`sidebar_position`: vị trí trang tài liệu của bạn bên sidebar ( xem ví dụ dưới khi mình đặt giá trị là 1 và đổi giá trị của intro thành 4 bạn sẽ có được kết quả là trang tài liệu bạn vừa tạo có vị trí ở left sidebar là trên cùng)

`slug`: link url mong muốn của bạn

![](https://images.viblo.asia/83b5272d-d2b8-444c-b300-bbe53bfe625d.png)

## 3: Các bước deploy và chạy thử trên netlify
### Yêu cầu:
+ Bạn đã có tài khoản github, tạo đã tạo repository, init và add remote vào project `my-website` (lưu ý: repository phải để public)

### Chạy thử trên netlify

Sau khi login netlify các bạn click button **New site from Git**, sau đó chọn **gihub** hoặc nơi nào đó mà bạn dùng để quản lý source (Gitlab, Bitbucket).

**Lưu ý:** bạn cần cho phép Authorize để netlify có thể thấy các repository trên git của bạn.

Sau khi chọn repository để deploy của bạn, bạn sẽ nhìn thấy các thông tin giống như bên dưới 
![](https://images.viblo.asia/62fde169-5fbb-4f0c-a6e2-287d937358d8.png)

Bạn sẽ tùy chỉnh các cài đặt cho đúng như: **branch** sẽ build, **lệnh build** và **thư mục source code** sau khi build.

Các bạn hoàn toàn có thể thay đổi câu lệnh build, tên thư mục source được build ra, với điều kiện trong source code của bạn đã setting cho phép điều đó.

Kết quả sau khi netlify deploy thành công:
![](https://images.viblo.asia/149167b7-e4f6-4645-b6c1-0f5f309d63a6.png)

Truy cập đường dẫn vừa được tạo ra https://ecstatic-hawking-a7945e.netlify.app/  (đây là kết quả sau khi deploy của mình) và bạn có thể tận hưởng thành quả của bạn.

## Notes
- Trên thực tế mình đã được khách hàng yêu cầu viết tài liệu hướng dẫn sử dụng các chức năng, giải thích phần code đã tích hợp, hướng dẫn setup các thành phần liên quan ... nên việc sử dụng excel sẽ khá tốn công sức khi bạn phải căn chỉnh hình ảnh, text, các đoạn source code hướng dẫn nên mình đã lựa chọn docusaurus vì việc xây dựng rất nhanh chóng và hiệu năng rất tốt, các bạn có thể tự trải nghiệm thêm.
- Docusaurus cũng có thêm rất nhiều tính năng khác như: multiple language, theme, plugin, presets, responsive bạn có thể tự trải nghiệm thêm hoặc chờ bài viết mới của mình về những tính năng này
- Docusaurus là opensource nên bạn có thể thoải mái đóng góp ý tưởng [tại đây](https://github.com/facebook/docusaurus) hoặc đóng góp bản dịch tiếng việt [tại đây](https://crowdin.com/project/docusaurus-v2)
- Trang chủ docusaurus: https://docusaurus.io/

Hy vọng bài viết giúp các bạn có thêm một cách để tạo các tài liệu cho các dự án sau này của bạn.

Thank for your time (☞ﾟヮﾟ)☞