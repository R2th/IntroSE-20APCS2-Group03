### Introduction

Độ ổn định và khả năng thích ứng khi có phiên bản iOS mới và thiết bị mới vẫn luôn là điểm mạnh của iOS. Bởi vậy ứng dụng cũ luôn có thể hoạt động chính xác trên các thiết bị mới hơn và các phiên bản iOS. Bài viết này mình sẽ giới thiệu với các bạn về sự tương tính và hoạt động của iPhoneX trên các ứng dụng cũ và cập nhật

**Chúng ta cùng tìm hiểu nhé!**

### iPhone X

iPhoneX nhìn ngoài khác khá nhiều so với các chiếc iPhone khác nhưng chúng ta sẽ quan tâm tới các sự thay đổi ảnh hưởng tới việc xây dựng ứng dụng chạy trên iPhoneX như sau:

- Nó là một thiết bị 3x: 1 point là một hình vuông kích thước 3x3 pixel trên màn hình.
- Độ phân giải màn hình: 375×812 points (1125×2436 pixels)
- Tỷ lệ màn hình là 9:19.5 khác với iPhone 6 / 6s / 7/8(tỷ lệ 9:16) và iPhone 3.5in là 2:3
- Thanh trạng thái được chia làm hai bên do có camera phía trước, tai nghe và các cảm biến khác.

Chính vì vậy iPhoneX hiển thị ứng dụng còn phụ thuộc và phiên bản của Xcode và ứng dụng đã được tạo. Chúng ta cùng xem ứng dụng hiển thị trên iPhoneX sẽ khác nhau thế nào khi build từ Xcode và iOS thông qua các trường hợp dưới đây

#### Xcode 8 / iOS 10 and Earlier

Các ứng dụng xây dựng bằng Xcode 8 trở về trước(iOS10 trở xuống) vì không biết sự tồn tại của thanh điều hướng và kích thước của màn hình iPhoneX nên sẽ hiển thị như dưới đây. Tuy nhiên nếu ảnh có kích thước 3x thì vẫn hiển thị đúng:

Đầu tiên là app hiển thị trên iPhone 6/6s/7/8:

![](https://images.viblo.asia/8b25af88-55f2-49ba-a0fb-d12b2f271c79.png)

Ở chế độ ngang(Lanscape) thanh trạng thái được ẩn đi theo mặc định và thanh navigationbar được giảm chiều cao:

![](https://images.viblo.asia/0fe12ab8-c57f-4de9-a46c-bd64f2a3f680.png)

Sau đây là hiển thị trên iPhoneX build từ Xcode 8 / iOS 10:

![](https://images.viblo.asia/ffd481b8-f677-4796-9ab7-2e0ad27cc9d0.png)

Như bạn thấy thì nhìn ứng dụng hiển thị khá giống màn hình 4.7. Đây là khả năng tương thích ngược của Apple. Dưới đây là ảnh ở chế độ Lanscape:

![](https://images.viblo.asia/468d7c77-ad45-46f3-ab72-9888029cfa94.png)


#### Xcode 9 / iOS 11

Khi được buld từ Xcode9 thì bạn thấy rõ được ứng dụng đã hiển thị chuẩn của màn hình iPhoneX: 

![](https://images.viblo.asia/bc3a7fe7-e026-4ad4-a5cc-9e1fae51e255.png)

Và ở chế độ Lanscape thì sẽ hiển thị như dưới đây:

![](https://images.viblo.asia/fff808e2-1e01-4cc8-b5c7-8aa67fa469ad.png)

### Conclusion

Có thể nói việc ra mắt iPhoneX khiến cho nhiều người khá lo ngại về tỷ lệ màn hình mới, thiết bị mới cùng sự tương thích của ứng dụng cũ với phiên bản iOS mới này. Tuy nhiên việc thích ứng với ứng dụng cũ được vẫn là thế mạnh của Apple, bắt đầu từ Xcode9 và iOS11 trở đi, các lập trình viên sẽ có thể thiết kế tối ưu nhất cho iPhoneX.

Cám ơn bạn đã dành thời gian cho bài viết này!

##### _Nguồn:_
[https://medium.com/@hacknicity/how-ios-apps-adapt-to-the-iphone-x-screen-size-a00bd109bbb9)