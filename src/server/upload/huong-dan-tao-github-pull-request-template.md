Trong bài viết này mình sẽ hướng dẫn các bạn cách tạo template cho pull request trên GitHub.
![](https://images.viblo.asia/c32cfe4e-e9ce-43f8-abbd-75d4f7de999f.png)
Với pull request template, mỗi khi bạn tạo pull đến branch mặc định trên GitHub thì trong phần body sẽ được tự động fill bởi nội dung template mà bạn mô tả từ trước. Điều này sẽ giúp tiết kiệm thời gian typing cũng như đảm bảo việc giao tiếp giữa người tạo pull và người review rõ ràng, tiện lợi hơn.

## Tạo một pull request template
Để tạo một pull request template bạn có thể tạo file template bằng một trong các hình thức sau:
* Tạo file **pull_request_template.md** ở thư mục gốc của project.
* Tạo thư mục **docs** ở thư mục gốc của project và tạo file template **pull_request_template.md** trong thư mục **docs** đó.
* Tạo thư mục ẩn **.github** ở thư mục gốc của project và tạo file template **pull_request_template.md** trong thư mục **.github** đó.

Nội dung của file template được mô tả bằng syntax của markdown.

Ví dụ **pullrequesttemplate.md**
```
### Task URL

### Affected areas

### Screenshots

```

Bạn có thể tham khảo thêm về syntax của markdown [tại đây](https://www.markdownguide.org/)

## Tạo nhiều pull request template
Với trường hợp repo của bạn cần nhiều hơn một pull request template thì sao? Cách làm tương tự như trên. Bạn cũng có thể tạo template trong thư mục docs hoặc thư mục .github.

* Tạo thư mục **docs** ở thư mục gốc của project và tạo thư mục con trong đó có tên **PULL_REQUEST_TEMPLATE/**. Bên trong thư mục con này bạn thêm các file template bạn muốn ví dụ **templateA.md**, **templateB.md**.
* Tạo thư mục ẩn **.github** ở thư mục gốc của project và tạo thư mục con trong đó **PULL_REQUEST_TEMPLATE/**. Bên trong thư mục con này bạn thêm các file template bạn muốn ví dụ **templateA.md**, **templateB.md**.

Tuy vậy hiện tại để có thể sử dụng nhiều template cùng lúc, ta sẽ gặp một chút phiền hà. Ví dụ khi bạn tạo pull request bạn sẽ được chuyển đến trang để điền các thông tin liên quan đến pull request. Tại trang này, GitHub hiện chưa có chức năng để bạn chọn template cần dùng mà bạn phải điền tay query parameter có dạng là **template=<ten_template.md>** trên URL của trang đó. Ví dụ để tự động fill phần pull request body với **templateA.md** bạn sẽ sửa URL như sau: **https://url_cua_pull_request?template=templateA.md**. Nhìn chung vẫn hơi bất tiện.

Trên đây mình đã giới thiệu về pull request template của Github cũng như cách tạo. Khá đơn giản phải không nào :). Hi vọng có thể giúp các bạn ứng dụng vào project của mình để việc tạo pull request được tiện lợi hơn.

## Tham khảo
[Creating a pull request template for your repository](https://help.github.com/articles/creating-a-pull-request-template-for-your-repository/)

[About automation for issues and pull requests with query parameters](https://help.github.com/articles/about-automation-for-issues-and-pull-requests-with-query-parameters/)