Chào các bạn, nếu các bạn chưa biết tới **GitLab** thì có thể tham khảo bài viết [Tìm hiểu về Gitlab](https://viblo.asia/p/tim-hieu-kien-truc-gitlab-BAQ3vVbZvbOr) của tác giả **Le Thi Ngoc Anh** trên Viblo.

Cũng giống như Github, GitLab là nơi giúp bạn có thể lưu trữ mã nguồn của mình free và private. Tuy nhiên, bạn có thể mua các gói dịch vụ khác phù hợp hơn với nhu cầu của bạn.

## Tổng quan
Bài viết hôm nay sẽ hướng dẫn **Step by step** thực hiện implement GitLab CI/CD để tự động build, test và deploy ứng dụng Node.js lên server thông qua SSH khi bạn push code lên GitLab. Trong khôn khổ nội dung, mình thực hiện trên:
- Ubuntu 16.04 cả server và local của mình.
- GitLab CI/CD - GitLab Runner 10, tất nhiên source code lưu trên GitLab luôn.
- Google Cloud VPS: Mình rất thích thằng này, tuy nhiên giá hơi đắt. Giá bây giờ là $32/month cho một VPS Singapore v1CPU - 10 GB SSD disk - Ubuntu 16.04. Bạn được tặng $300 lần đầu sử dụng, có thể tham khảo bài viết [Vọc VPS với $$300 miễn phí từ Google](https://viblo.asia/p/voc-vps-voi-300-mien-phi-tu-google-V3m5Wz1ylO7) của mình.

## Pipeline, Job và Stage
Khi bạn push code lên GitLab, nếu bạn có GitLab CI/CD thì GitLab sẽ sinh ra 1 `pipeline` là tập hợp một nhóm các `jobs` (công việc) cần phân chia thực hiện theo các giai đoạn - `Stage`. Các Jobs thì sẽ được GitLab thực hiện lần lượt theo từng Stage.

VD:
Khi push code lên Gitlab, chúng ta cần thực hiện test code rồi deploy nếu mọi thứ ổn. Chúng ta có có thể define ra 2 stage là: `Test` và `Deploy`. Các jobs trong stage Test cần được thực hiện trước, nếu có lỗi, test is failed thì sẽ không chạy stage Deploy.

## Các bước thực hiện
- Tạo một Node.js app đơn giản.
- Trên local, tạo một SSH Key để phục vụ cho việc deploy.
    - Add SSH private key vào GitLab CI/CD.
    - Add SSH public key vào danh sách được phép mở kết nối ssh tới server. Để ta có thể thực hiện connect tới server qua SSH.
    - Test thử dưới local, đảm bảo có thể connect tới server bằng SSH key này.
- Config GitLab CI/CD qua file: `.gitlab-ci.yml` gồm 2 stage:
    - Test stage
    - Deploy stage

## Tạo một Node.js app đơn giản
Chúng ta sử dụng `express` luôn ha.
``` bash
npm init
npm install express --save
```

Tạo file `index.js`:
``` javascript
var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res)  => res.send('Hello world!'))

app.listen(3000, () => console.log('Node.js app listening on port 3000!'))
```

## Tạo SSH key
Sử dụng luôn `ssh-keygen` theo hướng dẫn của Github nha:
- Mở terminal
``` bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Nó sẽ tạo mới một SSH key, sử dụng email được cung cấp. Tạo ra cặp public/private rsa.

- Trả lời thêm một số câu hỏi:
 ``` bash
# Nơi lưu ssh key, các bạn nhập luôn tên file theo mình: gitlab
Enter a file in which to save the key (/home/you/.ssh/id_rsa): [Press enter]

# Passphrase, các bạn để trống nha:
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
```

Hai file `gitlab` và `gitlab.pub` được tạo ra. Trong đó `gitlab.pub` là public key, còn `gitlab` là private key.

### Thêm SSH public key cho Server
Copy toàn bộ nội dung của public key `gitlab.pub` để thêm vào server.
- Với Google Cloud server, bạn vào edit instance của bạn, kéo xuống dưới, có chỗ dán public key cho bạn như hình:

![](https://images.viblo.asia/730440a8-10f8-4cc3-94c4-9dc30af06f50.png)

- Với server khác, cũng có cách tương tự để add ssh key hoặc bạn tự add public key vào server thủ công bằng cách dán public key vào cuối file `~/.ssh/authorized_keys`.

### Thêm SSH private key cho GitLab CI/CD
- Copy toàn bộ nội dung trong file private key: `gitlab` hồi nãy.
- Vào trong respository của trên GitLab chọn: **Settings > CI/CD**: Trong trang mới, chọn **Secret variables** để tạo biến lưu private key với tên biến là `SSH_PRIVATE_KEY` như trong hình.

![](https://images.viblo.asia/2d4043ac-2277-4e22-805c-67e843f94d80.png)

### Make sure SSH key có thể hoạt động
Dưới local bạn thử tạo connect ssh tới server dùng ssh key `gitlab`.
``` bash
ssh -i /path/to/private_key/gitlab -o StrictHostKeyChecking=no <username>@<hostname>
```

## Cấu hình GitLab CI/CD
- Do là Node.js app nên mình build ci/cd với docker image: `node:latest`.
- Define hai stage là `test` và `deploy`
- Tạo một job cho stage `test`, thực hiện build thử app, test eslint, code convention, unit test...
- Tạo một job cho stage `deploy` thực hiện deploy code lên server nếu stage `test` không bị fail.

Nội dung file như `.gitlab-ci.yml` như sau:

``` yaml
image: node:latest

stages:
  - test
  - deploy

test:
  stage: test
  environment:
    name: testing
  script:
    - yarn install
    - yarn lint
    - yarn build

deploy-production:
  stage: deploy
  environment:
    name: deploying
    url: https://example.com
  only:
    - develop
  before_script:
    # Run ssh-agent in background:
    - eval "$(ssh-agent -s)"
    # Add SSH Key:
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null
    - ssh-add -l
    # Install pm2:
    - npm i -g pm2
  script:
    - pm2 -v
    - pm2 deploy ecosystem.config.json production
```

**Lưu ý:**
- File config này theo cú pháp `yml` các bạn có thể đọc thêm về loại file này [ở đây: Official YAML 1.2 Documentation](http://yaml.org/spec/1.2/spec.html).
- Mỗi job `test`, `deploy-production` được thực hiện lần lượt theo từng stage được khai báo trong `stages`.
- Mỗi job, cần có `script` - chứa mảng các câu lệnh được thực hiện cho job đó, `stage` chỉ ra Stage mà job đó sẽ được thực hiện.

## PM2 - thực hiện ssh tới server và deploy
Các bạn tạo file config PM2 như sau:
```javascript
{
  "apps": [
    {
      "name": "web-app",
      "script": "server/index.js",
      "cwd": "/deploy/demo/web-app/current",
      "error_file": "/deploy/demo/web-app/logs/web.err.log",
      "out_file": "/deploy/demo/web-app/logs/web.out.log",
      "watch": false,
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "development"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "deploy",
      "host": [
        "example.com" // Hostname or Server IP Address
      ],
      "ref": "origin/develop",
      "repo": "git@gitlab.com:web-app/web-app.git",
      "path": "/deploy/demo/web-app",
      "post-setup": "yarn install; yarn build; pm2 start ecosystem.config.json --env production",
      "post-deploy": "yarn install; yarn build; pm2 restart ecosystem.config.json --env production",
      "ssh_options": [
        "StrictHostKeyChecking=no",
        "PasswordAuthentication=no"
      ]
    }
  }
}
```
Trong config có đoạn `post-deploy`, là danh sách các command sẽ được thực hiện trên server sau khi đã kết nối ssh. Tương ứng với thực hiện danh sách câu lệnh sau trên server:
- yarn install
- yarn build
- pm2 restart ecosystem.config.json --env production


Để hiểu thêm về PM2 bạn có thể đọc thêm bài viết [Tổng quan về PM2](https://viblo.asia/p/tong-quan-ve-pm2-3P0lPkkmZox) của mình, đồng thời đọc hiểu thêm về ý nghĩa của các pm2 config [tại đây](http://pm2.keymetrics.io/docs/usage/application-declaration).

## Tạo commit push thử
Danh sách `pipeline` trên GitLab sẽ hiển thị như ảnh dưới, toàn bộ stage xanh tức là toàn bộ đều success, x đỏ là stage đó chứa job bị failed:
![](https://images.viblo.asia/373b3bc2-f45f-4280-ab2a-dcdca629738c.png)

Bạn muốn xem chi tiết các script được thực hiện như nào, click vào các icon ở mục `stages` để chọn. Lúc này, log sẽ hiển thị realtime ra cho bạn xem chi tiết:

``` bash
# Câu lệnh thực hiện deploy lên server thông qua PM2:
$ pm2 deploy ecosystem.config.json production

                        -------------

__/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
 _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
  _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
   _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
    _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
     _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
      _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
       _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
        _\///______________\///______________\///__\///////////////__

.......................................................
Hash: d7f86780fb27fcb4b0ed
Version: webpack 3.12.0
Time: 3239ms
             Asset    Size  Chunks             Chunk Names
server-bundle.json  358 kB          [emitted]  
2018-05-27T09:11:17.702Z nuxt:build Building done
Done in 31.77s.
[PM2] Applying action restartProcessId on app [web-app](ids: 0)
[PM2] [web-app](0) ✓
┌──────────┬────┬─────────┬───────┬────────┬─────────┬────────┬─────┬───────────┬───────────────┬──────────┐
│ App name │ id │ mode    │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user          │ watching │
├──────────┼────┼─────────┼───────┼────────┼─────────┼────────┼─────┼───────────┼───────────────┼──────────┤
│ web-app  │ 0  │ cluster │ 10688 │ online │ 1       │ 0s     │ 74% │ 29.1 MB   │ deploy │ disabled │
└──────────┴────┴─────────┴───────┴────────┴─────────┴────────┴─────┴───────────┴───────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
  ○ hook test
  ○ successfully deployed origin/develop
--> Success
Job succeeded
```

*****Update*****
Oops!!! Mình xin phép bổ sung thêm một chút. Nếu các bạn làm theo hướng dẫn bên trên mà sau khi thực hiện deploy bị lỗi:
```bash
"..../web-app/source": No such file or directory
Fetch failed
```

Đừng lo, lỗi trên nguyên nhân là do mình thiếu một bước setup pm2, dẫn tới thiếu thư mục. Các bạn thực hiện setup cho pm2 trước khi deploy nhé! Bằng cách chạy lệnh:
```bash
pm2 deploy production setup
```
Sau khi setup, pm2 sẽ tự động tạo ra một cấu trúc thư mục "Capistrano-like structure":
```bash
project_root
├── current -> releases/20150301100000 # this is a symlink to the current release
└── source
    ├── ...code here
```

Hit a thank to **Khoa**!

## Tổng kết
Như vậy mình đã hoàn thành bài viết hướng dẫn implement GitLab CI/CD, auto deploy lên server qua SSH với PM2.

## Tài liêu tham khảo:
- [Express "Hello world" example](https://expressjs.com/en/starter/hello-world.html)
- [Generating a new ssh key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Official YAML 1.2 Documentation](http://yaml.org/spec/1.2/spec.html)
- [PM2 - Process File documentation](http://pm2.keymetrics.io/docs/usage/application-declaration/)

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***