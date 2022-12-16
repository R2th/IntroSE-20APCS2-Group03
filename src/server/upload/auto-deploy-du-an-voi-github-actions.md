Đối với developer chúng ta thì việc làm việc với Github là việc hàng ngày, thường xuyên phải làm việc với nó. Đa số chúng ta chỉ quan tâm đến các chức năng chính của Github như Pull Requests, Issues, hay là code nhưng ít khi chúng ta để ý đến các chức năng khác của Github. Trong bài viết hôm nay thì mình giới thiệu đến các bạn chức năng Actions của Github và sử dụng nó đến deploy dự án lên Github Pages. Vậy Github Actions là gì? Sử dụng nó như thế nào? Chúng ta cùng nhau tìm hiểu nào :D

![](https://images.viblo.asia/d2359817-5d94-4aa3-b847-8ec46d8bf0dc.png)

## Github Actions là gì?
- Github Actions cho phép chúng ta tạo `workflows` vòng đời phát triển phần mềm cho dự án trực tiếp trên Github repository của chúng ta
- Github Actions giúp chúng ta tự động hóa quy trình phát triển phần mềm tại nơi chúng ta lưu trữ code và kết hợp với pull request và issues. Chúng ta có thể viết các tác vụ riêng lẻ, được gọi là các actions và kết hợp các actions đó lại với nhau để tạo ra một `workflow` theo ý của chúng ta. Workflow là các tiến trình tự động mà bạn có thể thiết lập trong repository của mình để build, test, publish package, release, hoặc deploy dự nào trên Github
- Với Github Actions chúng ta có thể tích hợp continuous integration (CI) và continuous deployment (CD) trực tiếp trên repository của mình
## Sử dụng Github Actions deploy dự án lên Github Pages
Trong bài viết này sử dụng `Github Actions` để tạo một `workflow` để deploy một trang web tĩnh lên `Github Pages` mỗi khi nhánh `master` có thay đổi code. 
<br>
Workflow của dự án sẽ được lưu trong folder `.github/workflows/`
<br>
Chúng ta tạo một file .yml trong folder workflow ( ví dụ: github-pages.yml ) hoặc vào repository trên github vào tab Actions vào vào bấm vào `Set up workflow yourself`, với nội dung file như sau:
```
name: CI

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Run a one-line script
      run: echo Hello, world!
    - name: Run a multi-line script
      run: |
        echo Add other actions to build,
        echo test, and deploy your project.

```
Trong bài viết này mình deploy dự án ReactJs lên github pages, chúng ta sửa lại file `github-pages.yml`như sau:
```
name: Deploy react app to GitHub Pages

on:
  push:
    branches:
      - master
jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v1

    - name: Build
      run: |
        npm install
        npm run-script build
    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@releases/v3
      with:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BASE_BRANCH: master
        BRANCH: gh-pages
        FOLDER: build
```
Một `workflow` được tạo thành từ một hoặc nhiều `job`. `Jobs` chạy song song theo mặc định. Để chạy các `job` một cách tuần tự, bạn có thể xác định các dependencies vào các job khác bằng cách `jobs.<job_id>.needs keyword.` Mỗi `job` chạy trong một phiên bản mới của môi trường ảo được chỉ định bởi `runs-on`.
<br>
Ở đây chúng ta sử dụng `ubuntu-latest` <br>
Ở trong phần `steps`:
```
 - name: Build
      run: |
        npm install
        npm run-script build
```
Phần này mình để tập lệnh để compile code trước khi deploy, nếu với các dự án không cần compile code thì có thể bỏ qua phần này
```
with:
  ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
  BASE_BRANCH: master # The branch the action should deploy from.
  BRANCH: gh-pages # The branch the action should deploy to.
  FOLDER: build # The folder the action should deploy.
```
Tất cả các tùy chọn này là các biến môi trường sẽ được sử dụng để deploy lên github pages hoạt động.
- `ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}`: là mã thông báo truy cập được sử dụng để ủy quyền cho hành động làm việc với `repository` của bạn. Chúng ta vào [Profile Settings / Developer settings](https://github.com/settings/tokens) để tạo một Personal access tokens, sau đó vào `Settings` và chọn `Secrets` và thêm mới với tên là `ACCESS_TOKEN`.
- BASE_BRANCH: là nhánh mà chúng ta sử dụng để deploy dự án, ở đây mình chọn là nhánh `master`
- BRANCH: là nhánh mà chúng ta muốn deploy tới, ở đây là `gh-pages`. Và chúng ta không phải tạo nhánh `gh-pages` trước, vì hành động này tạo cho chúng ta nhánh đó nếu nhánh đó chưa tồn tại.
- FOLDER: là thư mực mà chúng ta dùng để deploy. Ở đây là `build` vì mình đang deploy ứng dụng `ReactJs` để deploy thì khi compile code sẽ tạo ra một thư mục là `build` chứa code sau khi compile của dự án.
## Custom domain name
Nếu bạn đang sử dụng `custom domain name`, bạn sẽ cần thêm trước một tệp `CNAME` ở root của nhánh `gh-pages` với tên miền của bạn trong đó.
<br>
Với ứng dụng `ReactJs` chúng ta có thể `custom domain name` bằng cách vào file `package.json` thêm vào dòng sau:
```
"homepage": "https://yourusername.github.io/repository-name",
```

Sau khi hoàn tất các bước trên chúng ta có thể đẩy các thay đổi trong code của mình lên repository mà xem các hoạt động ở trong `tab Actions` 
<br>
![](https://images.viblo.asia/5cb6a311-5bfc-4d22-ad10-421b5e285abe.png)

## Kết luận
Trong bài viết này mình đã giới thiệu với các bạn về `Github Actions` và sử dụng nó để auto deploy một dự án ReactJs lên `gihub pages`. Cảm ơn các bạn đã theo dõi bài viết của mình. :busts_in_silhouette: <3