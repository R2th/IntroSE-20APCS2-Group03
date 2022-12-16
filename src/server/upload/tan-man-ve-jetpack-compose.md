# Phần I : Phát triển giao diện người dùng trong Android
Giao diện người dùng (UI) là hiện thân của ứng dụng dành cho thiết bị di động. Bạn có thể nói rằng đó là mối quan hệ ngày càng phát triển giữa người dùng và hệ thống mà họ tương tác.
Khi bạn nhìn vào bức tranh toàn cảnh, có thể dễ dàng hiểu tại sao thiết kế giao diện người dùng lại quan trọng như vậy: Đó là lý do khiến các sản phẩm thất bại hoặc thành công.
Trong bài viết này, mình sẽ tìm hiểu về các khái niệm thiết kế của bộ công cụ giao diện người dùng Android hiện có.

## Bộ công cụ giao diện người dùng Android

![image.png](https://images.viblo.asia/b3a47c64-e025-4d09-a34d-13f6c0380e26.png)

Kiến trúc của bộ giao diện người dùng trong Android hiện có như trên. Và chúng ta dùng Activity, Fragment để set nội dung của view.
Dưới đây là ví dụ về các layout xml sau khi đượck khởi tạo
![image.png](https://images.viblo.asia/8a1bff55-38f4-4f80-a0fc-59c68f1ee880.png)

Giả sử màn hình có Activity và Fragment bên trong nó. Để tạo màn hình đó, cần các tệp sau: MyActivity.kt, my_activity.xml, MyFragment.kt, my_fragment.xml,  attrs.xml và styles.xml.
Đối với một màn hình đơn giản như vậy, bạn phải viết quá nhiều mã. Như vậy bộ công cụ giao diện người dùng Android hiện tại hoạt động rất kém. 
Các ứng dụng thường có hàng chục, nếu không phải hàng trăm, mỗi tính năng có bố cục XML, attrs, styles, mã Kotlin hoặc Java.
Việc sắp xếp danh sách các file đó trong resource đã là một vấn đề không hề đơn giản.

## Giới thiệu Jetpack Compose
Jetpack Compose là bộ công cụ hiện đại để xây dựng giao diện người dùng Android. Jetpack Compose đơn giản hóa và tăng tốc phát triển giao diện người dùng trên Android, và dễ trong việc bảo trì.
Dưới đây là module khi ta sử dụng layout xml. Khi ViewModel và bố cục  phát triển, chúng trở nên rất khó bảo trì. 
Việc dùng file xml làm tách biệt sự liên hệ giữa UI và file logic. 
![image.png](https://images.viblo.asia/cb5b97a5-0f23-44f6-b5e0-252ae6ddbe47.png)
Có thể thấy việc khác nhau bởi ngôn ngữ có thể làm tách biệt logic và UI (xml vs Kotlin). Với Jetpack Compose sự tách biệt đó sẽ biến mất. 
![image.png](https://images.viblo.asia/21c7db63-ed6b-408a-a6ec-4d50c1781b82.png)

Chúng ta có thể dễ dàng đọc hiểu và bảo trì code với kiến trúc này 
![image.png](https://images.viblo.asia/c9d5e12d-194c-4aa4-9c6d-e9472a5ba240.png)

## Tư duy khai báo
Bạn đã đọc về cách thiết kế của bộ công cụ giao diện người dùng Android gốc ở trên. Dù bạn sử dụng kiến trúc nào, bạn sẽ thấy mình đang viết mã mô tả  giao diện người dùng của bạn thay đổi theo thời gian.
Trong Jetpack Compose, bạn sẽ phải thay đổi cách nghĩ về giao diện người dùng theo cách lập trình khai báo. Lập trình khai báo là một mô hình lập trình trong đó bạn không tập trung vào việc mô tả cách một chương trình sẽ hoạt động,
mà là những gì chương trình sẽ đạt được. 
Ví dụ:  sẽ hiển thị một Nút ẩn, thay vì ẩn một Nút. 
Tức là với bố cục XML bạn thường khai báo một nút, và trong Activity bạn sẽ kiểm tra để ẩn hay hiện nó. Với Jetpack Compose thì bạn có thể add thêm 1 nút nếu cần.
## Jetpack Compose’s tech stack
![image.png](https://images.viblo.asia/6c4427aa-b4a2-4ed9-8b11-f63d839b84f0.png)

## Kết luận 
Jetpack Compose là tương lai mà các lập trình viên Android cần thiết để xây dựng UI cho ứng dụng của mình một cách nhanh chóng và trực quan hơn. 
Không những thế nó còn loại bỏ được những khó khăn trong việc kiến trúc một ứng dụng Android.