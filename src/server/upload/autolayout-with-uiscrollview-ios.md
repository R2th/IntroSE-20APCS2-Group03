Kéo UIScrollView vào view trong ViewController Scene.

![](https://images.viblo.asia/1b9fafe3-d14c-45c9-a444-39613f7b459e.png)

Contraint UIScrollView như sau:

![](https://images.viblo.asia/99281a0f-64db-45cb-aaaf-c3d65a150b14.png)

Ta được kết quả sau:

![](https://images.viblo.asia/dbad74c2-27f8-4dda-a4cd-f7b81af1059d.png)

Kéo thả 1 View vào trong UIScrollView sau đó contraint View với UIScrollView sau đó contraint:

![](https://images.viblo.asia/f24da437-9420-4de5-a183-d486b6fca1c7.png)
![](https://images.viblo.asia/d74f773a-553c-4456-be3f-0895ed4bd6ae.png)

Kết quả:

![](https://images.viblo.asia/1610c76d-7ac8-4ee8-9098-926fe74df387.png)

Contraint UIScrollView này chủ yếu sử dụng trong màn hình Login App.

 Đối với height dài cố định, ví dụ như sau.

 ![](https://images.viblo.asia/cfca3d01-1636-48dd-b12b-da0b1863041c.gif)
 
 để xử lý bài toán này xóa Height contraint của view trong UIScrollView:
 
 ![](https://images.viblo.asia/cf7c8317-4baa-466c-80e2-e56ad4514f8c.png)
 
 Sẽ có lỗi do thiếu height contraint, kéo 1 Vertical Stack View thả vào trong view:
 
 ![](https://images.viblo.asia/435245d7-6ca8-42e2-91df-dcd1dd3f37bd.png)
 ![](https://images.viblo.asia/197cfa17-098b-43e1-9679-eb839932bc6e.png)
 
 kéo 3 View vào trong Vertical StackView, cài đặt backgroundColor và contraint width = 300, height = 300.
 
 ![](https://images.viblo.asia/319d09d7-1250-427b-bc2a-8e88d888a331.png)
 ![](https://images.viblo.asia/2f212eb0-37e6-46ac-bd15-014c78a37fbb.png)
 
 mỗi view cách nhau 50(setup Vertical Stack View)
 
 ![](https://images.viblo.asia/bb0e65b6-fa07-4c8b-a216-50a850f0e048.png)
 
 Sau khi Contraint xong sẽ không còn 1 thông báo lỗi nào nữa.
 ![](https://images.viblo.asia/dc3b7bd2-bea1-41c6-8072-21b3e899adf8.png)
 
 Các bài toán khác như contraint UIScrollView theo chiều ngang tương tự như trên.

Bài AutoLayout với UIScrollView phục vụ cho phần Login App bài sau của mình, cám ơn đã đọc bài viết.

-----