# I. Mở đầu
* Đã bao giờ bạn làm việc với JitPack? Bạn có biết mục đích và lợi ích của nó? Thông qua bài viết này, mình sẽ giúp các bạn trả lời một phần nào các câu hỏi đó. Nội dung bài viết được tham khảo bài gốc tại [đây](https://solidgeargroup.com/jitpack-public-repositories-android)
* Là một lập trình viên Android, chúng ta sẽ phải thường xuyên bổ sung các dependency vào project của mình. Những dependency này thường được public trên các package repository như Maven-Central hay JCenter, nhưng bằng cách nào để chúng ta có thể lấy các thư viện không được public trên Git repository? JitPack có thể làm điều đó! JitPack có thể build các Git project và cung cấp các thể hiện (dạng jar hay aar) để chúng ta sử dụng. Chỉ duy nhất một yêu cầu được đặt ra là nếu thư viện đó không được public sẵn trên JitPack thì nó phải có ít nhất 1 bản release trên Git repository (Github, BitBucket, GitLab ...)
* Trong dự án của tôi gần đây, một yêu cầu được đặt ra là kết nối với một OwnCloud thông qua thư viện Android để truy xuất tới tài nguyên hệ thống. OwnCloud tương thích cực kỳ tốt với thư viện nhưng thư viện này lại không được public ở bất kỳ package repository nào. Theo lẽ thông thường, tôi sẽ phải tải mã nguồn của thư viện về và đính kèm vào dự án, điều này khá rối rắm vào không được chuyên nghiệp cho lắm. Sau thời gian tìm tòi, tôi tìm ra JitPack và vấn đề của tôi được giải quyết gọn gàng.
# II. Nội dung 
### 1. Chúng ta sử dụng JitPack như thế nào?
* Với JitPack, chúng ta chỉ cần làm 2 bước:
1. Đầu tiên, chúng ta thêm Jitpack maven repository vào danh sách repository trong file gradle gốc.
```
allprojects {
    repositories {
        jcenter()
        maven { url "https://jitpack.io" }
    }
}
```
2. Sau đó, chúng ta thêm thông tin dependency với cú pháp như sau:
```
compile "${GROUP}:${ARTIFACT}:${VERSION}"
```
* Trong đó:
- GROUP là domain của Git host với repo của user:
    + Github: com.github.<username>
    + GitLab: com.gitlab.<username>
    + BitBucket: org.bitbucket.<username>
- ARTIFACT bao gồm tên repository.
- VERSION là tên release, commit hash hoặc branch name ứng với SNAPSHOT.
### 2. Ví dụ
**Lấy thư viện OwnCloud ra làm mẫu, tôi sẽ khai báo một vài cái tên chuẩn dựa theo cú pháp:**
- Một bản realese xác định:
`compile 'com.github.owncloud:android-library:oc-android-library-0.9.15'`
- Một bản commit được định nghĩa bởi mã hash
`compile 'com.github.owncloud:android-library:b2034e1be22e429e53defadcd22ca6259fd7af50'`
- Một branch riêng biệt:
`compile 'com.github.owncloud:android-library:develop-SNAPSHOT'`
### 3. Một vài vấn đề hay gặp phải
**Tôi đặt version number nhưng không thành công...**
* Nên nhớ rằng chúng ta phải có version name chứ không phải là version number. Ví dụ, khi chúng ta muốn thêm thư viện Glide với Maven Central, nó sẽ là:
`compile 'com.github.bumptech.glide:glide:3.7.0'`
nhưng với JitPack lại là:
`compile 'com.github.bumptech:glide:v3.7.0'`
=> “v3.7.0” là tên của bản release chứ không phải là “3.7.0”, bạn có thể tham khảo trên folder [Github releases](https://github.com/bumptech/glide/releases)

**Version name chuẩn nhưng vẫn không thành công...**
* Bạn có thể vào trang chủ của [JitPack](https://jitpack.io/) và tham khảo thêm thông tin hướng dẫn sử dụng cũng như nhận được hỗ trợ từ cộng đồng.
# II. Kết
* Hy vọng với bài viết này, các bạn có thể hiểu biết hơn về JitPack cũng như biết cách ứng dụng nó vào dự án thực tế. Hẹn gặp lại các bạn trong bài viết sau!