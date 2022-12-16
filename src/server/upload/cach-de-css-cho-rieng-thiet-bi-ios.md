# Lời nói đầu
Đã bao giờ bạn gặp những lỗi CSS chỉ xuất hiện trên Iphone mà trên các thiết bị khác lại không bị gì chưa? Mình thì rồi đó, trong lúc loay hoay để xử lý thì tình cờ mình tìm ra cách dùng CSS thôi cũng xử lý riêng được, chúng ta cùng tìm hiểu xem cách ấy như thế nào nhé ( ngoài cách sử dụng CSS ra thì chúng ta có thể sử dụng Javascript để phát hiện thiết bị IOS nữa. )
![](https://images.viblo.asia/cbed1feb-70af-415d-bb39-7261e65fd705.jpg)
# Thuộc tính CSS
``` CSS
@supports (-webkit-overflow-scrolling: touch) {
  /* CSS specific to iOS devices */ 
}

@supports not (-webkit-overflow-scrolling: touch) {
  /* CSS for other than iOS devices */ 
}
```
phía trên là đoạn CSS để viết cho 2 trường hợp thiết bị IOS và thiết bị khác IOS
mình sẽ giải thích đoạn css ấy như sau:
Đoạn css -webkit-overflow-scrolling: touch nó sẽ chỉ hoạt động trên safari mobile
còn thằng @supports nó sẽ nhận diện những thiết bị nào hỗ trợ đoạn css -webkit-overflow-scrolling: touch hoặc không (@supports not)
từ đấy ta có thể css cho các thiết bị ios
![](https://images.viblo.asia/730b1a3a-b334-46ed-b738-eda0bc26cd8a.jpg)
# Hỗ trợ trình duyệt 
Hiện tại thuốc tính @supports vẫn còn hạn chế trong việc hỗ trợ các trình duyệt nên chúng ta cần cân nhắc khi sử dung, chi tiết về việc hỗ trợ của các trình duyệt chúng ta có thể xem ở bảng bên dưới
![](https://images.viblo.asia/8d553d82-da10-4aaa-866e-cb38e981ad46.gif)
# Nguồn:
Bài viết được tham khảo từ nguồn: https://stackoverflow.com/questions/30102792/css-media-query-to-target-only-ios-devices