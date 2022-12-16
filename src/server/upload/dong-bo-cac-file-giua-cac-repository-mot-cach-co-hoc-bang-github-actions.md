(Dịch lại bài viết trên Qiita:

GitHub Actionsを使ってリポジトリ間でファイルを機械的に同期する
https://qiita.com/a_jike/items/9d454bf1efad0370ae03)


Thường xảy ra trường hợp ứng dụng có file giống với resource hiện có ở phía server.
Nếu làm thủ công, thì mỗi lần đều cần sao chép resource file mới nhất từ ​​repository ở phía server sang repository ở phía ứng dụng, và mình thường hay lãng quên thao tác này cho nên đây là nguồn gốc của các sự cố.

Vì vậy, tôi đã thử sử dụng GitHub Actions để monitor directory cụ thể trong repository phía server. Và khi nó được cập nhật, tôi nhận được thông báo trong repository phía ứng dụng, lúc đó tôi sẽ thực hiện replace nhóm file và tạo pull request. 

(Có vẻ cho đến bước merge thì đều có thể thực hiện tự động, nhưng nếu cắt bước xác nhận đi thì cũng khá là sợ, cho nên cần pull request)

Để biết cú pháp, hãy check link sau: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions

# Chuẩn bị workflow phía server

Add workflow mới ở mục New workflow thuộc tab Actions của Repository.
Không dùng template cho nên hãy select :「set up a workflow yourself」
![スクリーンショット 2021-05-18 11.49.11.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/4001d1f6-7a49-a528-ac89-d48b1ee81130.png)
Default thì có thể tạo được YAML như thế này:
![スクリーンショット 2021-05-18 11.49.24.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/17c855c8-e025-4f43-a707-2fea22f07029.png)

Nhưng do nó khác với những gì tôi muốn làm, nên tôi xin được viết lại như bên dưới.
Giải thích được comment thẳng vào trong code luôn.

Nếu bạn tự ý add thêm vào rồi bị team nổi giận thì hãy add `Local Repository/.github/workflows/hogehoge.yml`  vào rồi thực hiện pull request là OK.

```Yaml
# Tên được hiển thị ở action page của repository
name: Dispatch assets files updated
on:
  # monitor push vào Assets (trở xuống) của nhánh master
  push:
    branches:
      - master
    paths:
      - Assets/*
jobs:
  # JOB ID（Bất kỳ thứ gì bắt đầu bằng ký tự chữ cái hoặc _ và bao gồm các ký tự chữ và số và -, _ đều được）
  dispatch-directory-changes:
    strategy:
      matrix:
        # Có thể define sẵn setting của các JOB. Tại đây, define sẵn danh sách repository sẽ nhận thông báo.
        repo: ['<Owner name>/<tên repository phía app>']
    name: Do dispatch-directory-changes
    # Type của máy chạy job
    runs-on: ubuntu-latest
    steps:
      # Sử dụng `peter-evans/repository-dispatch` để nhận thông báo bằng `repository_dispatch` trong repository phía app
      - name: Do repository-dispatch
        uses: peter-evans/repository-dispatch@v1
        with:
          # Set token cho Private Repository
          token: ${{ secrets.<GitHub secret key name> }}
          # Chỉ định repository đối tượng noti đã được define sẵn
          repository: ${{ matrix.repo }}
          # Event type để sẵn là: `directory-changes` 
          event-type: directory-changes
```

`repository_dispatch` có đặc thù là nó có thể thực thi nhiều workflow và tạo các event và event type tùy chỉnh (customize).

Có một công cụ tương tự, `workflow_dispatch`, có thể thực thi một single workflow cụ thể, có thể chỉ định branch và tag.

Để biết thêm thông tin, hãy xem link sau: https://docs.github.com/en/actions/reference/events-that-trigger-workflows#

Hoạt động của nó là:
Những thay đổi của Assets trở xuống được push vào nhánh master <- đây chính là trigger.
=> Sẽ thực hiện event `directory-changes` đối với repository đã chỉ định ở matrix.repo

# Chuẩn bị workflow cho cả phía app

Add workflow mới giống như bên server.
![スクリーンショット 2021-05-18 11.39.33.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/f73a3c91-7db6-3d19-2c09-f254ffc69f96.png)
![スクリーンショット 2021-05-18 11.39.57.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/95d97922-67d2-7198-48b4-d9fa6300de67.png)

Nội dung yml được viết lại như sau
Giải thích được coment thẳng vào trong code

```Yaml
# Tên được hiển thị ở action page của repository
name: Copy Assets from <tên repository phía server>
on:
  # Hook the event-type `directory-changes` specified in yml on the server side with repository_dispatch
  repository_dispatch:
    types: [directory-changes]
jobs:
  directory-changes:
    name: Copy Assets
    runs-on: ubuntu-latest
    steps:
      # clone repository phía app
      - name: Clone
        uses: actions/checkout@v2
      # clone repository phía server
      - name: Clone <tên repository phía server>
        uses: actions/checkout@v2
        with:
          repository: <owner name>/<tên repository phía server>
          path: <tên repository phía server>
          token: ${{ secrets.<GitHub secret key name> }}
      # Copy the files under the server-side repository / Assets to the application-side repository / Assets
      - name: Copy assets files
        run: cp <tên repository phía server>/Assets/* Assets
      # Delete the cloned server-side repository because it has been copied
      - name: Clean <tên repository phía server>
        run: rm -rf <tên repository phía server>
      # Tạo pull request
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v3
        with:
          token: ${{ secrets.<GitHub secret key name> }}
          commit-message: 'Update Assets'
          branch: feature/asset-files-changes
          base: master
          # Add a time stamp at the end so that it does not have the same branch name
          branch-suffix: timestamp
          delete-branch: true
          # Chỉ định reviewer
          reviewers: <username or groupname, v.v..>
```

Trong ví dụ, để truy cập private repository, access token cá nhân được đăng ký vào mục Secrets trong Setting của từng Reposity phía server/phía app. Không thể sử dụng các keyname bắt đầu bằng "GITHUB_", nên cần suy nghĩ một cách hợp lý.

Access token permission thì nếu có repo là OK.
![スクリーンショット 2021-05-18 14.09.05.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/6df1bfdd-83b5-298c-02fe-1c7279856b08.png)

Check link sau để biết thêm chi tiết
https://github.com/peter-evans/create-pull-request

# Execute
Xác minh xem hoge.html có được đặt trong directory "Assets" ở phía server không, và pull request có được tạo thành công ở phía ứng dụng vào lúc nội dung được thay đổi không.

1. Trên repository phía server, edit Assets/hoge.html rồi commit & push. Nhìn tab Actions ở Repository là biết nó bắt đầu chạy rồi.
![スクリーンショット 2021-05-18 17.22.24.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/d9d18851-ee7e-6853-3d77-4ff0cb87307d.png)
2. Có vẻ đã chạy xong trong vài giây mà không hề có lỗi.
![スクリーンショット 2021-05-18 17.22.53.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/a31bd462-4f3d-acac-b54c-e6fea65f7839.png)
3. Check Actions phía ứng dụng, thì quá trình này cũng xong sau vài giây. 
![スクリーンショット 2021-05-18 17.23.06.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/5b42dfcc-fa80-f001-222a-7e9f57e36388.png)
4. Pull request phía app đã được tạo.
![スクリーンショット 2021-05-18 17.23.29.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/af6ab0eb-b648-d977-9830-98c1d7a1fd2b.png)
5. Nội dung thay đổi của hoge.html cũng chính xác.
![スクリーンショット 2021-05-18 17.23.50.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/156085/a2d99eb4-f243-aaf1-2f3b-cb04ac2ff12a.png)

Tuyệt vời! (ơ mây zình gút chóp luôn!!)



Hết.