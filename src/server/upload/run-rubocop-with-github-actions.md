![](https://images.viblo.asia/e9d7085a-b571-4b88-ab9a-d1bb65f8a3d2.png)

## Introduction
**GitHub Action** là một tool khá hữu ích của GitHub, nó cho phép chúng ta viết các tác vụ (actions) và kết hợp các tác vụ đó lại với nhau để tạo ra một workflow theo ý muốn. Workflow là các tiến trình tự động mà chúng ta có thể thiết lập trong repository của mình để build, test, publish package, release, hoặc deploy dự nào trên Github.

Trong phần này chúng ta sẽ chỉ tập trung vào cách sử dụng actions để chạy [Rubocop](https://viblo.asia/p/rubocop-ZnbRlDjKR2Xo), với sự hỗ trợ của [Rubocop Linter Action](https://github.com/andrewmcodes/rubocop-linter-action) và [GitHub Checks API](https://developer.github.com/changes/2018-05-07-new-checks-api-public-beta/) để hiển thị các kết quả của action ngay trên PR.

## Implement
Trước tiên, chúng ta cần tạo một Rails app:
```
rails new devto-rubocop-linter-action-demo
cd devto-rubocop-linter-action-demo/
```
Sau đó là tạo workflow files:
```
mkdir -p .github/workflows
touch .github/workflows/rubocop.yml
```
Tiếp theo chúng ta sẽ thêm các config để chạy Rubocop Linter Action:
```
# .github/workflows/rubocop.yml

name: Rubocop

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Rubocop Linter Action
      uses: andrewmcodes/rubocop-linter-action@v3.0.0.rc2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
GitHub hiểu action name của chúng ta là `Rubocop`, và ta muốn chạy nó trong môi trường ubuntu version mới nhất bất cứ lúc nào có action PUSH đến repo của chúng ta.

Với các `step` ở trên, trước tiên chúng ta dùng `actions/checkout@v2` để checkout từ repo, sau đó chạy rubocop linter action có version là 3.0.0.rc2

Cuối cùng là khai báo biến env github token để xác thực cho các GitHub Actions, chi tiết các bạn có thể tham khảo thêm tại [đây](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token).

Bây giờ chúng ta sẽ khởi tạo repo và thực hiện push các actions lên repo mới:
```
git add .
git commit -m "first commit"
git remote add origin git@github.com:tuannm-0896/demo_rubocop.git
git push -u origin master
```
Tại giao diện GitHub, mở tab actions, ta sẽ thấy actions rubocop đang được khởi tạo:
![](https://images.viblo.asia/d4207326-21b4-4db3-a4ae-3ff03e182a2f.PNG)
Sau một vài giây, sẽ có thông báo run succeed, đi sâu chi tiết vào commit vừa tạo, chúng ta sẽ thấy 2 action nhỏ bên trái lần lượt là *build* và *Rubocop Action*
![](https://images.viblo.asia/81ca12d1-a973-4da4-90fe-948c96cab989.PNG)
Ở tab *Build*, ta sẽ thấy được các build logs của action, còn ở tab *Rubopcop Action*, ta sẽ thấy kết quả chi tiết sau khi chạy rubocop, hiện đang fail rất nhiều:
![](https://images.viblo.asia/4102bef9-90ea-4dfd-bb00-9f7fd23deaab.PNG)
### Advanced Configuration
Điều thú vị của Actions chính là việc có thể config workflow một cách tùy thích theo ý muốn. Giờ chúng ta sẽ thêm một số option khác cho action, đầu tiên, tạo Rubocop config:
```
touch .rubocop.yml
```
Sau đó add thêm 2 extensions là `rubocop-performance` và `rubocop-rails`
```
# .rubocop.yml

require:
  - rubocop-performance
  - rubocop-rails
```
Tiếp theo ta sẽ tạo config file cho actions:
```
mkdir -p .github/config
touch .github/config/rubocop_linter_action.yml
```
Đây sẽ là file để chúng ta có thể add thêm các config option cho actions:
```
# .github/config/rubocop_linter_action.yml

rubocop_extensions:
  - 'rubocop-rails'
  - 'rubocop-performance': '1.5.1'
```
Sau đó checkout sang branch khác, sau đó tiến hành commit và push:
```
git add .
git commit -m "add rubocop and rubocop-linter-action config files"
git push origin advanced-rubocop-action-config
```
Tại giao diện GitHub, mở PR vừa push lên, ta sẽ thấy thông báo rubocop failing check:
![](https://images.viblo.asia/ebe61d4b-6a06-42fe-bfc6-f0644f04d623.PNG)
Mở tab *Check*, ta sẽ thấy xuất hiện thêm các lỗi mới do các plugins vừa được thêm vào phát hiện ra:
![](https://images.viblo.asia/abdb43cd-c3dc-4f2c-a400-6c0fd0f41202.PNG)
Chi tiết hơn, chúng ta mở tab *Files Changed* để thấy cụ thể line bị lỗi của những file thay đổi của commit, và bên dưới là các lỗi của các file khác trong hệ thống:
![](https://images.viblo.asia/25b7e38e-f8de-45e4-9fec-13ad763c4b50.PNG)
## Summary
Bài viết nhằm giới thiệu về **GitHub Actions** - một tool khá hữu ích của GitHub - và ứng dụng nó với **Rubocop Linter Action**. Bài viết còn nhiều hạn chế, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn: https://dev.to/andrewmcodes/run-rubocop-with-github-actions-4adp