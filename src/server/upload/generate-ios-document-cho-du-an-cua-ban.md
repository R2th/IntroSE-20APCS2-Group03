Bạn có muốn dự án iOS của bạn có một tài liệu như thế này không?

![](https://images.viblo.asia/de94234a-93c6-4094-a82f-b4990ee368e7.png)
<div align="center">Tài liệu được tạo ra bằng Jazzy
</div>
<br/>

Đối với một lập trình viên, bạn phải chịu trách nhiệm với mã code của bạn. Vì vậy các lập trình viên sẽ thường đặc tả lại các đoạn code. Và Jazzy sẽ giúp lập trình viên, tạo ra bộ tài liệu hữu ích này.
# Jazzy là gì?

![](https://images.viblo.asia/78294793-6b88-41f0-ab3b-7befe30046a3.jpg)

[Jazzy](https://github.com/realm/jazzy) là một ứng dụng dòng lệnh có thể tạo tài liệu cho Swift và Object-C. Ứng dụng này sẽ giúp lập trình viên tạo ra tài liệu một cách nhanh chóng. Và người lập trình viên có thể chia sẻ tài liệu này cho bất kì ai. Thậm chí bạn có thể deploy lên website của bạn.

Tuy nhiên để được tài liệu chuẩn, bạn cần viết các mã lệnh theo đúng chuẩn của Apple. Bạn có thể tham khảo một số nguồn dưới đây:

> https://ericasadun.com/2015/06/14/swift-header-documentation-in-xcode-7/
> 
> https://nshipster.com/swift-documentation/

## Cài đặt Jazzy

Cài đặt Xcode Command Line Tools

`xcode-select —-install`

Cài đặt Jazzy

`[sudo] gem install jazzy`

Kiểm tra phiên bản

`jazzy --version`

## Tạo tài liệu

Đây là dự án của mình.
![](https://images.viblo.asia/04954cb1-e399-421b-9bf2-162aaeff7e95.png)

Để bắt đầu, hãy mở terminal và cd đến folder đó.

`jazzy --min-acl internal --no-hide-documentation-coverage --theme fullwidth --output ./docs -x CODE_SIGNING_ALLOWED=NO`

Và đây là kết quả
![](https://images.viblo.asia/81f419e7-7893-4362-8c93-a3d38d61dbc9.png)

Giờ mở folder dự án bạn sẽ thấy folder docs.
![](https://images.viblo.asia/b4ad7523-ea02-4049-90e7-4a6e6a17ec37.png)

### 1. --min-acl internal
Thuộc tính min-acl để kiểm soát cấp độ truy cập được tạo ra trong tài liệu. Vì vậy các hàm hay biến được set là public, sẽ được tạo ra trong tài liệu, còn Private thì không tạo ra. Nếu bạn vẫn muốn tạo tài liệu bao gồm mọi thứ, thì sửa internal thành private.
![](https://images.viblo.asia/ed55f184-9c4b-4317-af03-e7450dd6aa83.png)

### 2. --no-hide-documentation-coverage
Số phần trăm tài liệu được cover.
![](https://images.viblo.asia/20890479-1836-4f2e-8922-f5c7e9bfca22.png)

### 3. --theme fullwidth
Tuỳ biến giao diện của tài liệu
![](https://images.viblo.asia/83bc2682-e0cb-4e30-a09d-193ae0e68712.png)

### 4. --output ./docs
Đường dẫn để chứa tài liệu sau khi được tạo ra.


## Tạo Makefile để dễ dàng tạo tài liệu
Thay vì mọi lần bạn đều phải gõ lại dòng lệnh `jazzy --min-acl internal --no-hide-documentation-coverage --theme fullwidth --output ./docs -x CODE_SIGNING_ALLOWED=NO` để tạo tài liệu. Thì giờ bạn đơn giản là sử dụng bất kì text editor để tạo môt file mới và đặt tên là Makefile. Sau đó copy đoạn code như sau:
```
documentation:
    @jazzy \
        --min-acl internal \
        --no-hide-documentation-coverage \
        --theme fullwidth \
        --output ./docs \
        -x CODE_SIGNING_ALLOWED=NO
    @rm -rf ./build
```

Bây giờ bạn chỉ cần mở terminal

```make documentation```

Bạn hãy làm thử xem, việc tạo document chưa bao giờ dễ dàng như vậy. Chúc bạn thành công.

**Nguồn: **
* https://medium.com/@jonathan2457/generate-host-your-ios-documentation-39e21b382ce8