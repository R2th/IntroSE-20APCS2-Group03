Xin chào anh em Viblo, hôm nay tôi xin chia sẻ tới anh em một trang khá thú vị giúp anh em có thể tạo Status Page nhanh tới mức độ chóng cả mặt mà lại không mất đồng nào.

## Status Page là gì?

Status Page là một trang tổng hợp các trạng thái sống/tèo của các service trong một hệ thống cũng như là phương tiện thông cáo chính thức về các Incident đã/đang xảy ra tới người dùng. Bạn có thể bắt gặp nó trong hầu hết các dịch vụ về Infra as service hiện nay như:
- Cloudflare: https://cloudflarestatus.com
- Linode: https://status.linode.com
- Viblo: https://status.viblo.asia

Bạn có thể sử dụng các dịch vụ trả phí để có status page, thí dụ như:
- Updown: https://updown.io
- Statuspage - Atlassian: https://www.atlassian.com/software/statuspage
- Status.io: https://status.io
- vvv...

Hoặc cũng có thể dùng các opensource để dựng status page như:
- Cachet: https://cachethq.io/ (dùng framework Laravel)
- Grafana + Prometheus: https://grafana.com
- vvv...

Với các opensource trên, chúng ta có code và có thể tự deploy nhưng điều này yêu cầu bạn có các kỹ năng về quản lý hosting/server để có thể hoàn thành việc setup. Tuy nhiên, trong bài này tôi sẽ giới thiệu tới mọi người công cụ tự động hết mọi thứ và bạn chả mất đồng nào. :open_mouth: :D

## Upptime

[Upptime](https://upptime.js.org/) là một open-source tạo status page mà tôi đánh giá rất cao vì nó làm *"mỳ ăn liền"* tới mức bạn chả phải làm thêm gì nữa cả, ngoài vài dòng config.

Bạn không cần phải chuẩn bị server hay hosting gì cả bởi lẽ nó hoạt động dựa trên Github, mô hình hoạt động sẽ như sau:
- Sử dụng GitHub Actions để monitor uptime của dịch vụ (dạng như cronjob vậy)
- Sử dụng Github Issues để tạo Incident report
- Sử dụng GitHub Pages làm website

Mọi thao tác như monitor uptime, tạo Incident, update nội dung lên Github Pages đều được thực hiện tự động qua Github Workflow. Thí dụ cứ mỗi 5 phút (mặc định) thì Upptime sẽ truy cập vào các websites được chỉ định để kiểm tra xem nó sống hay chết và commit lại vào Github repo. Sau một khoảng thời gian (có thể config) sẽ build lại trang Github Pages.

Chính vì vậy nên nếu bạn config nó update thường xuyên thì sẽ nhanh đạt tới quota của Github rồi nếu quá quota của Github thì bạn sẽ phải trả phí cho Github. Đây là điều duy nhất chúng ta phải lưu ý.

## Tạo status page miễn phí

### Tạo repo

Để tạo status page miễn phí bạn thực hiện các bước như sau:
1. Truy cập repo [upptime/upptime](https://github.com/upptime/upptime)
2. Nhấn nút **Use this template**
3. Nhập tên repo và tích chọn **Include all branches**
4. Nhấn nút **Create repository from template** để hoàn tất việc tạo repo

### Sửa config upptimerc.yml

Thay đổi lại config mặc định:
- Thiết lập website bạn cần monitor
- Sửa lại nội dung mẫu sẽ dùng để tạo trang Status Page
- Thay đổi tần suất monitor (nếu muốn)

Dưới đây là config mẫu của tôi dùng cho trang https://status.webee.asia mà bạn có thể tham khảo:
- Mục `sites` để config các trang cần monitor
- Mục `status-website.name` ứng với title của website
- Mục `status-website.introTitle` ứng với title của phần giới thiệu website. Syntax Markdown.
- Mục `status-website.introMessage` ứng với mô tả của phần giới thiệu trên website. Syntax Markdown.
- Mục `navbar` tương tứng với phần Navigation trên header của website.

```yaml:upptimerc.yml
# Change these first
owner: kimyvgy # Your GitHub organization or username, where this repository lives
repo: webee-status # The name of this repository

sites:
  - name: Devto Clone
    url: https://devto.webee.asia

status-website:
  # Add your custom domain name, or remove the `cname` line if you don't have a domain
  # Uncomment the `baseUrl` line if you don't have a custom domain and add your repo name there
  cname: status.webee.asia
  # baseUrl: /your-repo-name
  logoUrl: https://raw.githubusercontent.com/upptime/upptime.js.org/master/static/img/icon.svg
  name: Webee Status
  introTitle: "**Webee System Status**"
  introMessage: This is the system status for the Webee service.
  navbar:
    - title: Status
      href: /
    - title: Github
      href: https://github.com/$OWNER/$REPO

# Upptime also supports notifications, assigning issues, and more
# See https://upptime.js.org/docs/configuration
```


Tham khảo thêm các config khác tại: https://upptime.js.org/docs/configuration để tùy biến sâu hơn về tần suất monitor, tần suất build lại website.

### Cập nhật Personal Access Token

Sau khi bạn đã chuẩn bị xong phần config cho Status Page, để nó bắt đầu hoạt động bạn cần tạo Personal Access Token (scope: Repo và Workflow) cho tài khoản Github rồi điền nó vào Repository Secret với tên secret là `GH_PAT`.

**Tạo Personal Access Token:**
1. Nhấn vào ảnh đại diện trên góc trên bên phải của Github rồi chọn *"Settings"*
2. Ở sidebar bên trái, chọn "Developer settings"
3. Ở sidebar bên trái, nhấn vào "Personal access tokens"
4. Nhấn vào "Generate new token"
5. Chọn scope là "repo" và "workflow"
6. Nhấn "Generate token" và copy token đấy

**Tạo repository secret:**
1. Trong repo, bạn chọn tab "Settings"
2. Ở cột bên trái, nhấn vào tab "Secrets"
3. Nhấn nút "New repository secret"
4. Nhập tên biến secret là `GH_PAT`
5. Dán token vừa tạo ở bên trên vào trường "Value"
6. Đảm bảo rằng trường value bạn nhập không bị thừa bất kỳ khoảng trẳng nào ở đầu và cuối 
7. Lưu lại bằng cách nhấn nút "Add secret"

Bây giờ bạn chỉ cần push source code lên repo là Github Actions sẽ tự động chạy và deploy website Status Page cho bạn. 

## Tổng kết

Trên đây là config của tôi để thành việc setup xong trang status page trong vòng 1 phút. Nói là 1 phút vì tôi đã biết các configuration và dễ dàng sửa chứ trước đó tôi cũng mất hàng giờ để đọc doc cũng như là tìm hiểu cách để nó hoạt động. :D

Bây giờ, hãy kiểm tra repo và đảm bảo tài khoản Github của bạn đã subscribe repo, để khi bot check thấy website của bạn bị down thì bạn sẽ nhận được alert về mail. Hãy cài thêm ứng dụng Github trên điện thoại để khi có alert về downtime thì bạn cũng có thể nhanh chóng nắm bắt.

![status.webee.asia_.png](https://images.viblo.asia/89029919-c929-4bcb-bd74-20e632ac7560.png)

<p align="center">Live page: <a href="https://status.webee.asia" target="_blank">https://status.webee.asia</a></p>

Hãy upvote và follow tôi để nhận thông báo khi có các bài viết mới nha! Cảm ơn các bạn đã theo dõi!

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***