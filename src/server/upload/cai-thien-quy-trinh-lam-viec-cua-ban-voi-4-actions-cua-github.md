Dưới đây là 4 hữu ích mà GitHub giúp cải thiện quy trình làm việc của bạn.

![](https://images.viblo.asia/b5c876bc-633a-4fa3-bc17-7ab996a0e994.jpg)

Nếu code của bạn được lưu trữ trên Github, bạn có thể tận dụng lợi ích của các tác vụ mà Github mang lại. Thay vì chạy tất cả các tests và linters bằng tay, chúng ta có thể tận dụng các actions của Github cho các tác vụ này.

Không mang lại bất kỳ khó khăn nào, dưới đây là 4 actions với Github giúp bạn tiết kiệm thời gian và cải thiện quy trình làm việc của bạn. Nếu bạn chưa hiểu rõ actions của Github là gì và cách sử dụng chúng như thế nào, các bạn hãy tại [đây](https://medium.com/better-programming/github-actions-the-what-why-and-how-3868d5a86292) trước khi tiếp tục với bài viết ngày hôm nay của mình nhé.

## 1. Kiểm tra trang Web của bạn với Google Chrome’s Lighthouse Test

Hành động này tích hợp hữu ích *Lighthouse Audit* củà Google cho các trang web, cụ thể là kiểm tra hiệu suất, khả năng truy cập, best practices, SEO và PWAs ([Progressive Web Application](https://developers.google.com/web/progressive-web-apps)).

![](https://images.viblo.asia/e409ef5d-40e7-40e4-95ce-714136eb0f6f.png)

Ngay bây giờ, hành động sẽ in năm điểm số (trong vòng 100) cho output và tải lên các phiên bản HTML và JSON của báo cáo dưới dạng các bằng chứng.

Trong lần release tiếp theo, actions này sẽ cho phép bạn chỉ định ngưỡng cho từng kiểm tra và tùy chọn không thực hiện bước này nếu chúng không được đáp ứng.

![](https://images.viblo.asia/aa2c15ce-76ac-46c6-803b-2519ca4a63ee.png)

### Sử dụng

Quy trình công việc sau đây thực hiện kiểm tra Lighthouse trên jarv.is , hiển thị năm điểm số trong đầu ra của từng bước và tải lên kết quả dưới 2 dạng .html và .json giống như các bằng chứng để tải xuống (như được hiển thị ở trên).

Tập tin *workflow.yml*:

```
name: Audit live site
on: push
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
    - name: Audit live URL
      uses: jakejarvis/lighthouse-action@master
      with:
        url: 'https://jarv.is/'
    - name: Upload results as an artifact
      uses: actions/upload-artifact@master
      with:
        name: report
        path: './report'
```

Lighthouse thực sự hữu ích khi bạn xây dựng PWAs.  Project được lấy cảm hứng từ [GoogleChromeLabs/lighthousebot](https://github.com/GoogleChromeLabs/lighthousebot).

## 2. Chạy các lệnh SSH với GitHub Actions

Hành động này sẽ chạy đối số được cung cấp dưới dạng một lệnh trên $HOST của bạn thông qua SSH. Nó thực sự hữu ích nếu bạn muốn chạy các command trên server private của mình sau mỗi lần commit hoặc push.

![](https://images.viblo.asia/041f1577-900b-485f-814d-c5ef22163e18.png)

### Sử dụng

Để sử dụng hữu ích này, chỉ cần thêm các dòng sau vào` .github/main.workflow`

```
action "Run deploy script" {
  uses = "maddox/actions/ssh@master"
  args = "/opt/deploy/run"
  secrets = [
    "PRIVATE_KEY",
    "HOST",
    "USER"
  ]

```

### Các yêu cầu về đối số

Đối số bạn sẽ sử dụng là lệnh sẽ được chạy trên máy chủ của bạn thông qua SSH.

### Ví dụ

*   `args = "/opt/deploy/run"`
*   `args = "touch ~/.reload"`

### Yêu cầu về bảo mật

Bạn cần phải cung cấp một số thông tin bảo mật để sử dụng actions: 

* `PRIVATE_KEY`: SSH private key của bạn.
* `HOST`:  Máy chủ lưu trữ hành động sẽ SSH để chạy lệnh. Ví dụ, *your.site.com.*
* `USER`: Người dùng lệnh SSH sẽ xác thực như với private key.

Các bạn có thể xem chi tiết tại[ Github repository](https://github.com/maddox/actions/tree/master/ssh).

## 3. Phát hiện rò rỉ các key bí mật — gitleaks-action

Git kiểm tra cam kết bí mật với [gitleaks](https://github.com/zricethezav/gitleaks)

![](https://images.viblo.asia/c31112e1-fd02-460b-83ba-e85031e77d11.png)

### Sử dụng

```
workflow "gitleaks my commits" {
  on = "push"
  resolves = ["gitleaks"]
}
action "gitleaks" {
  uses = "eshork/gitleaks-action@master"
}
```

Sự tín nhiệm từ [zricethezav/gitleaks](https://github.com/zricethezav/gitleaks) cho các bit phức tạp.

## 4. GitHub Action chạy ESLint

![](https://images.viblo.asia/7e5a4b23-5551-4510-b2a1-682ae2588576.png)

Hành động này thực thi trình giả lập ESLint trên các tệp JavaScript được chỉ định mà không cần bất kỳ bước actions/build hoặc Docker nào trước đó.

Bạn phải có ESLint chạy local để actions được thực thi. Nó sẽ sử dụng các quy tắc giống như bạn làm tại local. Bạn có thể tìm thêm thông tin tại [in the ESLint getting started guide](https://eslint.org/docs/user-guide/getting-started#installation-and-usage).

### Sử dụng

Dưới đây là một ví dụ để làm cho nó hoạt động:

```
workflow "New workflow" {
  on = "push"
  resolves = ["ESLint"]
}
action "ESLint" {
  uses = "stefanoeb/eslint-action@master"
}
```

Theo mặc định, nó sẽ chạy ESLint thông qua tất cả các tệp trong dự án. Nhưng bạn cũng có thể chỉ định một loạt các tệp trên các đối số, giống như ESLint:

```
workflow "New workflow" {
  on = "push"
  resolves = ["ESLint"]
}
action "ESLint" {
  uses = "stefanoeb/eslint-action@master"
  args = "index.js src/**.js"
}
```

Nếu không ̀ cần bất kỳ bước cài đặt trước khi cài đặt các mô-đun, actions sẽ thực hiện `yarn install` or `npm install` tự động.

## Conclusion

Mình hy vọng các bạn đã học được điều gì mới mẻ từ bài viết của mình. Nếu có bất kỳ Github Actions nào bạn biết, hãy chia sẻ để tận dụng tối đa được những hữu ích mà Github mang lại nhé. 

**Nguồn tài liệu**: [Improve Your Workflow With These 4 GitHub Actions](https://medium.com/better-programming/improve-your-workflow-with-these-4-github-actions-7b2fbd29f752)