Cách đây thời gian không lâu Iphone XR, XS, XS MAX đã được Apple giới thiệu đến người dùng trên toàn thế giới. Trước đó có thể kể tới 
Iphone X. Nhắc đến những chiếc smart phone này mọi người đều nghĩ ngay đến những chiếc tai thỏ. 
Đó là một sự thay đổi lớn trong thế giới di động truyền thống từ trước đây, chính vì thế đối với các Dev việc cần tùy chỉnh giao diện cho 
phù hợp với các dòng điện thoại là rất cần thiết. Bài viết này sẽ đưa ra cách giải quyết vấn đề đó.
![](https://images.viblo.asia/2e71c9f3-f788-4185-b966-b8bba32e5e9b.png)

## Vấn đề 1: Thành phần giao diện sử dụng sai dưới thanh trạng thái
![](https://images.viblo.asia/90a653f5-3329-4aea-91dd-dd316c67339b.png)

Bức ảnh trên thể hiện được vấn đề chung về vấn đề của giao diện khi chạy app trên các dòng iphone có tai thỏ.
Bạn hãy chú ý vào "Label -A". Lý do ở đây là do chúng ta đã bỏ qua chiều cao của thanh trạng thái và cài đặt rằng buộc giữa Label-A.Top và Superview.Top
![](https://images.viblo.asia/2b03a4b7-8703-48c3-9760-72fd5f382838.png)

Kể từ khi các dòng iphone mới ra đời, status bar của nó khác đi so với các dòng trước đó dẫn tới Label-A bị sử dụng sai như hình.
Để giải quyết vấn đề này, chúng ta cần sử dụng "Safe Area Layout Guides" đã được giới thiệu trong XCode 9.
Trước hết, cần phải enable "Safe Area Layout Guides"
![](https://images.viblo.asia/51348703-4236-4aa2-a9f2-b65de4d45c66.png)

Việc tiếp theo là chúng ta cần cập nhật lại constraint Top của Label-A, bắng cách tạo quan hệ giữa Label-A.Top và SafeArea.Top
![](https://images.viblo.asia/0be014d0-3b24-4284-acd2-ae202245e906.png)

Bạn hãy thử chạy lại app trên IphoneX và thấy điều kì diệu. 

Từ đó chúng ta có thể điểu chỉnh tương tự đối với Label-B bằng cách sửa constraint Label-B.Bottom thành quan hệ giữa Label-B.Bottom và SafeArear.Bottom
Sau đây chính là kết quả thu được :
![](https://images.viblo.asia/a4106fa2-82c8-48c1-ac20-70e5dfb26c2f.png)

## Vấn đề 2:  Các thành phần giao diện không hiển thị đều trên màn hình Iphone tai thỏ
![](https://images.viblo.asia/59c7aa37-2694-4ddd-b3c4-072ed07f349a.png)

Theo hướng dẫn từ Apple, cả backgroud image và UItableView ( hoặc UIScrollView) cần phải mở rộng ra cạnh và lấp đầy toàn bộ màn hình các thiết bị tai thỏ

Vấn đề ở trên hoàn toàn ngược so với vấn đề 1 đã được bàn luận. Lấy backgroud image làm ví dụ, khoảng cách ở phía trên màn hình là do constraint mà chúng ta đặt 
giữa ImageView.Top và TopLayoutGuide.Bottom
![](https://images.viblo.asia/173e25e6-74d7-422e-9d8f-1b5614976558.png)

Để làm cho imageView chiếm toàn bộ màn hình, chúng ta cần có một constraint trên và đưới giữa imageView và superView. Do đó những gì cần thay đổi là TopLayoutGuide.Bottom thành SuperView.Top
và BottomLayoutGuide.Top thanh SuperView.Bottom, và chắc chắn rằng giá trị constraint là 0

![](https://images.viblo.asia/50793a8f-9e82-4bdc-aa69-e566f9f7812b.png)

Chúng ta có thể áp dụng cách đó đối với UITableView. Và đây là kết quả thu được :
ImageView:
![](https://images.viblo.asia/6168297b-9284-4390-9180-dcdd2e5b913a.png)

UItableView:
![](https://images.viblo.asia/88e2f623-5512-43a8-87b3-3a5f819a1e71.png)

## Kết luận
Sau các cách giải quyết này chúng ta cần lưu ý các điểm sau :
1. Đặt constraint giữa thành phần UI và safe area layout khi bạn cần các thành phần đó nằm trong safe area
2. Đặt constarint giữa thành phần UI và superView khi bạn cần các thành phần đó mở rộng ra cạnh của màn hình

Bài viết đến đây là kết thúc, Cảm ơn bạn đã dành thời gian để đọc, :D 

## Tài liệu tham khảo 
https://medium.com/@kahseng.lee123/how-to-solve-the-most-common-interface-problems-when-adapting-apps-ui-for-iphone-x-44c0f3c80d84