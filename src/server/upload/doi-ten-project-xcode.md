## Nội dung chính
Bài viết sẽ chia sẻ các bước để có thể đổi tên một project Xcode một cách đơn giản mà hiệu quả.
## Mục tiêu
Đổi tên project từ **UIPageControllerWithAnimation** thành **UITests**.

## Tiến hành
### Đổi tên project
Thanh navigation có phần tên project. Click vào tên project cũ và thay bằng tên mới. Sau khi đã đổi tên mới ấn enter.
![Inspector change name](https://images.viblo.asia/06a3d9ce-bd19-4a30-a0c1-ffdff9d6ac44.png)

Sau đó, một bẳng thông báo sẽ xuất hiện, cho phép bạn thay đổi tên một loạt các tập tin.
![](https://images.viblo.asia/732e00ac-9df5-4375-bfc6-0fbe2f2bb0cc.png)
Click Rename.

### Đổi tên folder trong project
Thư mục chính có thể click vào và thay đổi giống như bước đổi tên project.
![Inspector change name](https://images.viblo.asia/06a3d9ce-bd19-4a30-a0c1-ffdff9d6ac44.png)

Tương tự với thư mục của phần Test và UITest(nếu có)
![](https://images.viblo.asia/52aadfa7-37c2-456a-aaaf-1bc1865cb1fb.png)


### Đổi tên các class test(cả Unit Test và UITest)
Các class cần đổi tên không đáng kể, các lớp được đổi tên như hình
![](https://images.viblo.asia/6742982e-cdab-4c57-b035-0a1e02c166af.png)

### Đổi tên project scheme

Chọn Scheme → chọn Manage Schemes…
![](https://images.viblo.asia/8ec8283a-8e68-4258-9494-a7178ba405f8.png)

Nháy đúp chuột vào scheme muốn đổi tên
![](https://images.viblo.asia/d7c24f4b-ed02-4155-9f58-475f8ef88eac.png)

### Đổi thông tin project trong plist
Có thể đổi tên đường dẫn tệp Info.plist bằng cách tìm trong tab *build setting*  của *project target*
![](https://images.viblo.asia/1259602f-af10-4685-8d80-9276e2213bf1.png)

### Đổi thông tin project identifier
Trong phần plist có **Project Bundle Identifier**. Có thể thực hiện thay đổi từ đây
![](https://images.viblo.asia/681f8c11-2561-480f-a741-4b4883ca9b93.png)

### Thay đổi bất kì module nào đã chọn trong Storyboard
Nếu ứng dụng được build chỉ có màn hình đen thì có thể lỗi do phần này. Hãy tìm và đổi tên các module cũ trong Storyboard
![](https://images.viblo.asia/338c8550-af56-4dd2-aa7a-a9e0cdf1bd48.png)

### Thay đổi phần import trong Unit tests và UITest
Testable imports![](https://images.viblo.asia/04a34c65-d76d-471f-a077-ed3f7438a324.png)

### Clean project
Từ mục Product → chọn Clean Build Folder
![](https://images.viblo.asia/8dcc52ef-c924-420d-a667-47d1dd25faea.png)

### Phần pod(nếu có)
Đổi tên phần target và thực hiện **pod install**(có thể xóa file Podlock)
```
target 'ProductName' do
    pods
end
```