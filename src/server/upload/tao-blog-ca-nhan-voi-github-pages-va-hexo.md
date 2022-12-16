![](https://images.viblo.asia/1c95f9e3-e1cb-44f3-aa7f-6b138953d54e.jpg)
Mình luôn muốn có một blog cá nhân để chia sẻ những kiến thức, kinh nghiệm lập trình, những câu chuyện buồn, vui trong cuộc sống - công việc hay đơn giản là nơi thể hiện những thứ thuộc về "bản thân" thông qua các bài viết hoặc các dòng chia sẻ ... nhưng bản thân là 1 mobile 'dev' các kiến thức về web còn hạn chế nên việc tạo  ra một blog cá nhân "thuần tuý" không hề dễ dàng, may mắn là sau một hồi tìm hiểu thì mình cũng đã làm được một blog cá nhân khá là cơ bản với **Hexo** và **Github Pages**. Các bạn có thể ghé qua tại đây: [https://pdn1905.github.io](https://pdn1905.github.io/) =))).

**Github Pages** và **Hexo**   là gì ?

* **Github Pages** là dịch vụ lưu trữ static web trực tiếp thông qua **Github**.
* **Hexo** là một trình tạo static web một cách đơn giản và nhanh chóng hoàn toàn bằng  **NodeJS**.

Hiểu đơn giản là **Hexo** sẽ là thằng chịu trách nhiệm xuất blog chạy trên NodeJS ra thành static web,  thằng static web này có thể push lên **Github Pages** để chạy trên host.

### Install Hexo
Như đã đề cập ở trên thì **Hexo** chạy trên NodeJS nên đầu tiên các bạn vào đây [NodeJS](https://nodejs.org/en/) để cài node version mới nhất nhé.

Sau khi cài đặt xong node thì cài **Hexo** bằng lệnh sau:

`$ npm install -g hexo-cli`

Tiếp theo thì ta tạo một local blog:

`$ hexo init myBlog` 

và install node module

`$ cd myBlog`

`$ npm install`

Run:

`hexo server`

truy cập vào [http://localhost:4000](http://localhost:4000/) và xem kết quả
![](https://images.viblo.asia/13173a99-7dee-4808-ac54-fd64853d802f.png)

### Github Pages

Việc tạo **Github Pages** khá đơn giản, trước tiên bạn phải có một tại khoản **Github**, tại **Github** tạo mới một repo với name theo định dạng **<github-username>.github.io** , vì username account github của mình là **pdn1905** nên mình sẽ toạ một repo với name là **pdn1905.github.io**
![](https://images.viblo.asia/ad33d758-d251-4355-9ae6-77f0ae2e9bec.png)

###  Deploy lên Github Pages

Khi đã tạo thành công Github Pages việc tiếp theo của chúng ta là sinh ra static web và deploy lên Github Pages để host. Khi đã deploy thì địa chỉ truy cập vào blog của bạn sẽ là: **<github-username>.github.io** .

Việc sinh ra static web và deploy trở nên khá đơn giản với **Hexo**:

* Tại folder blog ở local, **Hexo** tạo cho chúng ta một file config là **_config.yml**, mở file đó lên và cấu hình deploy lên Github Pages như sau:

**Note**: thay username thành username của các bạn.

```
deploy:
    type: git
    repo: https://github.com/pdn1905/pdn1905.github.io.git
```

* Install package **hexo-deployer-git** :

`$ npm install hexo-deployer-git -save`
* Tiến hành deploy:

`$ hexo deploy`


Lúc này thì **Hexo** sẽ sinh ra static web và push code lên repo trên github mà chúng ta tạo ở trên. Truy cập vào **<github-username>.github.io**  để xem kết quả.

![](https://images.viblo.asia/0d61b2ba-af48-4bec-b610-19fd4dbc21cc.png)

Để biết thêm việc tạo các bài post thì mọi người truy cập và làm theo tại đây nhé [https://hexo.io/docs/](https://hexo.io/docs/) . Docs viết rất kĩ rồi nên mọi việc trở nên khá dễ dàng.

### Themes
Các bước trên đã giúp chúng ta tạo ra một blog cơ bản. Để blog được bắt mắt và thu hút người đọc hơn thì chúng ta nên sử dụng các bộ Themes có sẵn của Hexo tại đây [https://hexo.io/themes/index.html](https://hexo.io/themes/index.html).

![](https://images.viblo.asia/a23937ac-e51f-410d-b1d2-5910828038e5.png)

Có rất nhiều themes, các bạn có thể chọn bộ thêm tuỳ thích phù hợp với nội dung trang blog của bạn. Trong ví dụ này mình chọn theme **Again** . Truy cập vào github của theme và làm theo hướng dẫn: 

**Note**: Các bạn nhớ đổi lại tên theme trong file **_config.yml** , và cd vào folder theme để **install các node module** nhé.
![](https://images.viblo.asia/938cdb10-37c8-4fb4-99ab-21f789e08f69.png)

Sau đó run lại server:

`hexo server`

Truy cập vào  [http://localhost:4000](http://localhost:4000/):

![](https://images.viblo.asia/82cf51a7-c5fe-4552-a5e6-dafaf0b2fad5.png)

Để deploy theme mới thêm vào thì run 2 lệnh sau:

```
$ hexo generate
$ hexo deploy
```

Truy cập vào blog của bạn - **<github-username>.github.io** và tân hưởng nhé =))).

### Tổng Kết

Quá dễ dàng để tạo ra một blog cá nhân miễn phí đối với những dev mobile như mình phải không. Hi vọng bài viết sẽ có ích với mọi người.