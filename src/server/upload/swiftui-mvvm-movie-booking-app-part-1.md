Đây là phần 1 của loạt bài  Xây dựng ứng dụng đặt vé xem phim.Trong bài này, tôi sẽ tạo màn hình chính hiển thị bộ sưu tập bộ sưu tập Xem phim.
### 1.Models
   Tạo model 

![](https://images.viblo.asia/efa1e898-9590-44dc-8c66-de2bfdc145e1.png)

![](https://images.viblo.asia/db6a6855-85d6-4d18-8b09-bd6dd678ac88.png)

![](https://images.viblo.asia/a5d7ec5e-2dd6-4e89-aa2c-cd6f5393ed56.png)

![](https://images.viblo.asia/d7dd5f4a-0d69-40e9-9fa0-1465709e9cd2.png)

Những điều cần lưu ý:
1.	Tạo struct “MovieBundle”  để decode dữ liệu.
2.	Sau đó tạo một protocol “Movie” ,bạn sẽ thấy lí do tại sao trong phần 2 của loạt bài này.

### ViewModel
Tạo ViewModel
![](https://images.viblo.asia/b0d6190c-224e-4cb2-b4fc-a36a1dcc223c.png)

![](https://images.viblo.asia/7ac103a1-7944-4834-b7fe-43013e08de86.png)

Dưới đây là một bản tóm tắt ngắn gọn của đoạn code trên:

1.Chúng tôi tạo enum HomeSection sẽ được sử dụng làm khóa để lấy các phần cụ thể từ mô hình.
 
 2.Sau đó, trong ViewModel, chúng tôi đọc tệp chứa dữ liệu, giải mã nó và đặt thuộc tính được xuất bản để thông báo cho các khung nhìn quan tâm để chúng có thể tải lại và phản ánh trạng thái hiện tại của mô hình.
###  UIViewRepresentable



Chúng ta sẽ sử dụng UIKit’s UICollectionView  và UICollectionViewCompositionalLayout.
    Tạo file với tên *MovieCollectionView.swift.*
    
   ![](https://images.viblo.asia/933e7fe7-1783-4629-8ab6-47a6a9cbcd69.png)

  
  Thêm code này bên trong struct  đó:
  !![](https://images.viblo.asia/f132bd0e-b0c6-4f32-aecd-6042fc1ad998.png)
  
  Phương thức đầu tiên là nơi chúng ta sẽ khởi tạo bất kỳ chế độ xem nào chúng ta muốn sử dụng trong SwiftUI, trong trường hợp này, đó là một `UICollectionView`. Hãy coi phương thức `makeUIView` là` init (frame: CGRect)` trong UIKit UIView bình thường.
 
 
 Chế độ xem thứ hai là nơi bạn thường cập nhật chế độ xem mà bạn muốn sử dụng trong SwiftUI.Có 2 phương thức khác, phương thức đầu tiên là `makeCoordinator ()` mà chúng ta sẽ tìm hiểu thêm trong thời gian ngắn và cái cuối cùng được gọi là `dismantleUIView(uiView: Self.UIViewType, coordinator: Self.Coordinator)` dùng để sử dụng khi chế độ xem này sắp bị killed  và muốn dọn sạch các tài nguyên để tránh bị leaks memory, v.v.v
###  Coordinator

Điều phối viên sẽ là lớp sẽ phối hợp, sự tương tác giữa SwiftUI với bất kỳ UIView nào chúng ta đang sử dụng. Đây là lớp sẽ xử lý tất cả các data source và delegate.

Thêm lớp sau trong cùng một cấu trúc, bên dưới `updateUIView`:
 
 ![](https://images.viblo.asia/de83b865-f5d7-4eea-8892-f2d633ec1432.png)
 
 Chúng ta cũng giữ một tham chiếu đến cấu trúc cha là `MovieCollectionView`
 
 Trong cùng class thêm phương thức sau:
 
 ![](https://images.viblo.asia/6ef0ad36-5b67-4beb-8e59-b273fd90aede.png)

Chúng tôi trả lại FlowLayout tiêu chuẩn ngay bây giờ, nhưng chúng tôi sẽ thay đổi với UICollectionViewCompositableLayout sau này.

Bây giờ hãy thêm phương thức sau vào MovieCollectionView.swift phía trên lớp điều phối viên:

![](https://images.viblo.asia/facfd08a-69d1-436a-b3b3-6476c3b5a819.png)

Đây là phương pháp thứ tư từ giao thức UIViewRepftimeable. Công việc duy nhất của nó là khởi tạo một thể hiện Điều phối viên mới mà chúng ta sẽ sử dụng ngay.

Sau khi bạn thực hiện điều đó, hãy thêm vào phần sau trong phương thức`makeUIView`:

![](https://images.viblo.asia/d223fba2-35bf-492e-a2d6-db5b177fc91e.png)

Một số điều cần lưu ý trong đoạn code trên:
1. Chúng tôi truy xuất điều phối viên từ bối cảnh lần lượt cho phép chúng tôi truy cập vào mọi thứ trong lớp điều phối viên.
2. Chúng tôi đặt dữ liệu và ủy quyền cho điều phối viên vì điều phối viên tuân thủ theo 2 giao thức đó.

Trước khi tiếp tục, chúng ta cần tạo các ô UICollectionView cho mỗi phần.(Còn tiếp)