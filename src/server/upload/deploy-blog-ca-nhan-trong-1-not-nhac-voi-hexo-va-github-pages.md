### 1. Mở đầu 
Dạo gần đây trong thời kì tránh `Cô Vy` được làm remote ở nhà. Ngoài giờ làm việc mình có kha khá thời gian do không chả phải đi đâu chỉ ru rú ở nhà cả ngày :v. Rảnh rỗi sinh nông nổi, mình tự dưng có hứng thú với việc viết blog nên quyết định tự tạo cho mình một blog cá nhân để có thể chia sẻ những kiến thức cũng như những thứ thuộc về bản thân mình. 

Tiêu chí  của mình khi tạo blog là sự nhanh chóng, đơn giản nhưng vẫn có thể đáp ứng được nhu cầu cơ bản của bản thân nên mình quyết định sử dụng Hexo và Github Pages cho việc triển khai blog của mình. Hôm nay mình xin chia sẻ cách mình đã xây dựng 1 blog cá nhân chỉ trong vài nốt nhạc rất phù hợp với anh em Dev tụi mình với chi phí phải chăng hoặc thậm chí là free từ A-Z. :)

Để có một trang blog chúng ta cần chuẩn bị:
- Mã nguồn (mình sử dụng Hexo)
- Repo github để chạy Github Page.
- Một domain (nếu muốn nó xịn xò hơn)

Giới thiệu 1 chút về các công cụ mình sử dụng:

#### Hexo
Hexo là một blog framework, Hexo giúp chúng ta tạo một blog bằng cách generate static files một cách nhanh chóng, gọn nhẹ từ những bài viết được viết bằng MarkDown. Một điểm mạnh của Hexo là nó hỗ trợ  deploy trong 1 dòng lệnh. Lý do mình lựa chọn Hexo bởi vì sự đơn giản, tiện lợi của nó cũng như nó cung cấp đầy đủ những chức năng mà mình cần ở một blog.

#### Github Pages
Github và dịch vụ Github Pages chắc đã không còn quá xa lạ với anh em Dev. Nếu như Github là một một dịch vụ lưu trữ mà nguồn mà người người, nhà nhà sử dụng thì Github Pages là một `web hosting service` được cung cấp bởi GitHub giúp ta lưu trữ các website của dự án, website cá nhân trên chính Github. Một ưu điểm lớn của Github Pages là nó free với các public repo (nếu bạn sử dụng với private repo thì tốn khoảng 7$/tháng => Khá là chát :v) tuy nhiên như vậy đã là quá đủ để mình sử dụng cho blog cá nhân của bản thân mình (đơn giản vì mình public mà ;))

#### Domain
Domain bạn có thể thuê ở các trang web cho thuê domian như [GoDaddy](https://vn.godaddy.com/), [NameSilo](https://www.namesilo.com/), ... hoặc bạn có thể kiếm domain free tại [Freenom](https://freenom.com/). Còn nếu không thì bạn có thể sử dụng luôn domain mặc định `.github.io` mà Github Pages cung cấp.

### 2. Triển khai
#### Mã nguồn
Đầu tiên chúng ta cài đặt `hexo-cli` thông qua lệnh
```bash
$ npm install hexo-cli -g
```

Tiếp theo thực hiện khởi tạo  và kéo các dependencies cần thiết về:

```bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```

Hexo sẽ tự động tạo ra cho chúng ta cấu trúc thư mục dạng:
```scala
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

Trong đó file `_config.yml` là nơi chúng ta định nghĩa các setup cài đặt cho blog của chúng ta. Các bạn có thể tham khảo tại [đây](https://hexo.io/docs/configuration). 

Thư mục `source` là nơi lưu trữ các bài viết của chúng ta, để viết bài các bạn có thể tham khảo tại [đây](https://hexo.io/docs/writing). 

Thư mục `themes` là nơi thiết lập themes cho blog. Hexo cung cấp 1 kho themes tương đối đa dạng cho bạn lựa chọn tại [đây](https://hexo.io/themes/). Ngoài ra bạn hoàn toàn có thể tự viết themes cho cá nhân mình (Chi tiết tham khảo tại [đây](https://hexo.io/docs/themes)).

Cơ bản nó khá đơn giản nên mình không đi sâu vào việc phải làm từng bước ra sao, các bạn có thể tham khảo những nội dung chính mình đã đề cập phía trên, ngoài ra các bạn có thể tìm hiểu thêm các phần khác trong documentation của [Hexo](https://hexo.io/docs/themes).

#### Deploy
Các bạn tạo một repository trên github có tên `<user_name>.github.io`. Nếu đã có repo sẵn các bạn hãy đổi tên như trên trong Repo > Setting.

![](https://images.viblo.asia/eac4c27f-c235-44f9-a01e-1b78bed8d621.png)

Khi đó Github Pages mặc định sẽ public website của bạn tại domain `<user_name>.github.io` và thực hiện đọc file `index.html` từ nhánh `master`.

![](https://images.viblo.asia/03307635-e9a7-4c2f-9aae-8907f3c6a003.png)

Nếu các bạn không đặt tên như trên, trang web của bạn sẽ được public tại domain `<user_name>.github.io/<repo_name>`.

Trong source code bạn config file `_config.yml` như sau:

![](https://images.viblo.asia/ff7ed735-2ea3-48e1-bf72-3ec652d963c4.png)

Nếu bạn để tên repository khác thì sẽ web của bạn sẽ được public tại subdirectory => Các bạn config theo phần comment ở trong hình.

Để deploy đơn giản nhất các bạn hãy cài plugin `hexo-deployer-git` bằng lệnh:

```bash
npm install hexo-deployer-git --save
```

Trong `_config.yml` thêm config sau:
```python
deploy:
  type: git
  repo: <repository url> # https://github.com/vuphong95663/vuphong95663.github.io
  branch: [branch]
  message: [message]
```

Như vậy mỗi khi các bạn viết bài viết mới các bạn chỉ cần chạy lệnh:

```bash
$ hexo deploy
```

Hexo sẽ tự dịch code của bạn, generate ra các static files và đẩy lên nhánh master của bạn. Để tránh hiện tượng bị cache nội dung các bạn nên chạy 3 lệnh sau thay vì chỉ 1 lệnh khi deploy. Các bạn có thể viết script trong `package.json` để sử dụng tiện lợi hơn:

```bash
$ hexo clean
$ hexo generate
$ hexo deploy
```

Như vậy là các bạn đã có 1 trang blog được public thông qua domain của Github Pages. Nhưng nếu các bạn muốn custom bằng domain đã có sẵn của mình thì sao?

#### Custom domain
Để custom domain tất nhiên trước hết các bạn phải có domain rồi. Đăng ký ở đây thì mình đã đề cập phía trên. Việc cần làm là các bạn vào trang đã đăng ký domain và config A record trỏ tới địa chỉ IP được cung cấp bới [Github](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site):
```rust
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Ở đây mình sử dụng GoDaddy nên mình config như sau:

![](https://images.viblo.asia/6711978e-187d-44cd-b684-a68b20a0e5ba.png)

Tiếp theo các bạn trở lại trang Repo > Settings, kéo xuống Github Pages và nhập domain của bạn vào ô `Custom domain` rồi sau đó save lại và tận hưởng thành quả :).

![](https://images.viblo.asia/679313ad-d5d8-4991-be64-59a205b66614.png)

Khoan đã chưa hết đâu :v. Có một vấn đề là khi bạn nhập domain vào ô `custom domain` trong Settings, Github sẽ tự động tạo ra một file `CNAME` trong thư mục `root` của nhánh `master`. Với cách deploy của mình ở trên khi bạn thực hiện deploy nó sẽ ghi đè và làm mất file CNAME của bạn => Bạn cần tạo file `CNAME` mặc định từ khi generate. Để làm được điều đó các bạn hãy tạo file `CNAME` trong thư mục `source` của Hexo và điền domain của bạn vào. Như vậy khi thực hiện generate file `CNAME` cũng sẽ được generate theo. Giờ thì tận hưởng thành quả và chăm chỉ viết bài thôi ;).

**Thêm:** Để mở rộng chức năng của blog các bạn có thể sử dụng thêm các plugin tại  [Hexo Plugin](https://hexo.io/plugins/) hoặc tự viết thêm, custom blog của mình.

### 3. Kết + 1 phút quảng cáo
Trong bài viết này mình đã chia sẻ cách mình tạo blog cá nhân của bản thân mình chỉ trong vài nốt nhạc. Hy vọng bài viết sẽ có ích với các bạn. Trong thời gian tới mình sẽ tiếp tục cho ra những bài viết trên [codecungtoi.com](https://codecungtoi.com/)  hy vọng nhận được sự quan tâm của các bạn.<3