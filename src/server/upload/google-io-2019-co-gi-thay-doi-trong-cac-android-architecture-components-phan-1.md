*Google I/O 2019 đã diễn ra được 2 tháng tính tới thời điểm bài viết này, tuy nhiên chưa có nhiều bàn luận trong cộng đồng lập trình Android Việt về những thay đổi mới được giới thiệu trong sự kiện, đặc biệt là những thay đổi của Android Architecture Components. Hi vọng bài viết của mình sẽ cung cấp thông tin hữu ích giúp anh em Android dev chuẩn bị trước khi Google update thêm nhiều cải tiến mới.*

Bài viết tham khảo từ 2 nguồn:

(1) https://medium.com/simform-engineering/whats-new-in-android-architecture-components-google-i-o-19-97baf0fd7c3b

(2) https://events.google.com/io/schedule/events/2bba93eb-22c2-403f-9086-b84d52b01e9a

# 1. Kotlin là ưu tiên hàng đầu
Google I/O 2019 đã khẳng định với cộng đồng lập trình Android ưu tiên số một của họ trong thời gian tới là phát triển cho Kotlin, có nghĩa rằng sẽ có rất nhiều tính năng mới và API mới dành riêng cho Kotlin. Anh em viết Java có lẽ sẽ có chút cạnh lòng, tuy nhiên cũng nên cân nhắc tới việc chuyển sang Kotlin càng sớm càng tốt.
# 2. Data Binding
## 2.1. Tăng tốc build
Google khẳng định tốc độ build của Data Binding đã tăng lên 20%. Ngoài ra, kể từ Android Studio 3.5, chúng ta có thể thêm option sau vào gradle để sử dụng bộ xử lí Data Binding thử nghiệm của Google (khả năng cao là nó sẽ giúp tốc độ build nhanh hơn nữa)

`android.databinding.incremental = true`

## 2.2. Sinh class Binding trong thời gian thực
Anh em mỗi khi thay đổi trong file layout vẫn thường phải build lại project để phía data binding trong logic code "ăn" được những thay đổi ấy. Điều này cực kì khó chịu vì nhiều lúc phải đợi từ 30s tới vài phút mới build xong, mà nếu không build thì code đỏ lòm do binding chưa "ăn". 

Trong những phiên bản tiếp theo của Android Studio, Google đã khắc phục điều này. Class Binding sẽ được cập nhật ngay tại thời điểm chúng ta chỉnh sửa file layout, code "ăn" ngay và có cả gợi ý đầy đủ luôn

![](https://images.viblo.asia/064b23b1-dae0-4d7b-96bd-f3a9ea75795f.gif)

## 2.3. Hỗ trợ Refactor
Bên cạnh nỗi khó chịu bên trên, anh em còn gặp vấn đề khó nhai hơn đó là mỗi lần refactor code, ví dụ thay đổi tên hàm, thì phía layout không update theo thay đổi mới, khiến anh em phải ngồi mò từng nơi sử dụng hàm đó trong layout để sửa. "Nỗi đau" này giờ không còn nữa (ơn giời Google ít nhất họ cũng nghe chúng ta!)

![](https://images.viblo.asia/a41f3379-f59c-4e20-9a14-0b622fc5efdb.gif)

## 2.4. Thông báo lỗi rõ ràng hơn
Hiện nay lỗi compile trong Data Binding thường khiến anh em ức chế vì hầu như nó chỉ báo chung chung, anh em rất khó đọc trực tiếp được lỗi ở đâu mà thường phải mò mẫm phán đoán rất tổn thọ và mất thời gian. Các kỹ sư ở Google có lẽ cũng nhận ra điều ấy và họ đã thực sự xoa dịu chúng ta bằng cách thông báo lỗi rõ ràng như dưới đây. Quả là tin không thể vui hơn nữa phải không!

![](https://images.viblo.asia/127f4536-f7a9-4beb-8829-20afdb93b77d.png)

# 2. Truy cập vào view bằng View Binding (đừng nhầm với Data Binding nhé)
Chúng ta đã biết để lấy ra các thành phần view trong layout từ phía logic code, hiện nay có những cách với những ưu nhược điểm được liệt kê trong bảng sau:

![](https://images.viblo.asia/4de045d8-3f5e-403c-954f-ce8a13fc4386.png)

Để ý dòng cuối cùng chính là phương pháp "bí ẩn" mới được giới thiệu trong Google I/O 2019 giúp xử lí cả 3 vấn đề trên. Họ gọi nó là View Binding để phân biệt với Data Binding.

Vậy View Binding khác gì với Data Binding?

Cái tên nói lên tất cả, Data Binding là chúng ta "bind" (đưa) dữ liệu vào view. Còn View Binding là chúng ta chỉ cung cấp 1 cách truy cập vào thành phần trên view thôi. Vì vậy View Binding được xếp chung bảng với những phương pháp trên.

Ví dụ trước đây ta truy cập thành phần bên trong view bằng findViewById như thế này:

![](https://images.viblo.asia/24df7491-ce0e-49e5-836a-0960cff9b91f.png)

Điểm khác biệt của View Binding so với những người anh em khác đó là nó vừa ngắn gọn, vừa giảm thời gian build, vừa kiểm tra ngay trong **compile time**. Tức là nếu view mà nó trỏ tới không tồn tại trong layout thì sẽ không thể compile được. Kiểu như 3 trong 1 luôn nhỉ?

Sử dụng View Binding đơn giản hơn Data Binding. Chúng ta không cần đưa thẻ `<layout>` bao quanh view (vì chúng ta không đưa biến nào vào layout mà), chỉ cần gọi hàm `inflate()` của class binding của chính layout đó để tạo ra biến binding là được.

![](https://images.viblo.asia/f29d5897-741a-46d9-9425-a0bf0e4a4198.png)

Tuy nhiên, Google chưa cho biết làm thế nào để kích hoạt tính năng View Binding. Chúng ta chỉ biết rằng có thể nó sẽ giống như enable Data Binding, tức là chỉ cần thêm 1 dòng code trong gradle là được.
# 3. ViewModel và SavedState
Đầu tiên, mọi người thường nghĩ tới việc sử dụng SavedState và ViewModel như sau
1. Ta có thông tin gì đó
2. Ta lưu vào SavedState hoặc ViewModel
3. Xảy ra configuration change (ví dụ xoay màn hình)
4. Ta lấy thông tin đã lưu từ SavedState hoặc ViewModel

Cách nghĩ này khiến nhiều người tưởng SavedState và ViewModel có vai trò giống nhau. Nhưng thực ra không phải, **chúng không giống nhau**.

**SavedState:**
* Có thể sống bên ngoài process của app, đồng nghĩa với việc có thể sống khi app bị kill bởi hệ thống

**ViewModel:**
* Chỉ sống trong process của app
* Có thể sống khi configuration change xảy ra (vì process của app vẫn sống), nhưng sẽ chết khi app bị kill bởi hệ thống

Như vậy, từ đặc tính tự nhiên khác nhau này, SavedState và ViewModel được sử dụng cho những mục đích khác nhau

**SavedState** để lưu những thông tin cần phải phục hồi trong trường hợp app bị kill để đảm bảo UX liên tục cho user:
* Liên quan đến UI: selections, trạng thái scroll
* Trạng thái navigation

**ViewModel** để lưu những thông tin trong app mà user không muốn bị reset khi configuration change xảy ra:
* Những request tới network, DB
* Những object lưu dữ liệu cần thiết cho app

Vì vậy, để đảm bảo trải nghiệm cho user, Google khuyến khích chúng ta dùng kết hợp cả SavedState và ViewModel.

Tuy nhiên, trước đây nếu có dữ liệu cần phải lưu ở cả ViewModel và SavedState, ví dụ như userId, chúng ta sẽ phải viết code khá dài dòng như sau:

![](https://images.viblo.asia/6a76a9d6-90b7-404b-acfd-e91327cc5031.png)

Trong Google I/O 2019, họ đã giới thiệu một đối tượng mới gọi là `SavedStateHandle` giúp sử dụng SavedState với ViewModel ngắn gọn hơn rất nhiều

![](https://images.viblo.asia/6485871a-29c9-4a3d-8857-07cc2657a23c.png)

`SavedStateHandle` cho phép ta truy cập vào SavedState ngay từ bên trong ViewModel. Nó tương tự như một **map**, chúng ta có thể **get** và **put** dữ liệu vào đó để lưu trong SavedState

![](https://images.viblo.asia/d48c4666-a00d-4e93-a19f-92dba503ea08.png)

Ta cũng có thể get dữ liệu ra dưới dạng MutableLiveData

![](https://images.viblo.asia/9b9486bb-4d70-4665-b347-055f2af6f4ac.png)

Tuy nhiên, anh em cần chú ý rằng SavedStateHandle cũng chỉ chứa SavedState chứ không có gì cao siêu cả. Nó vẫn có đầy đủ các điểm yếu của SavedState, như là không nên lưu các đối tượng phức tạp hoặc có kích thước lớn. Nếu muốn lưu những dữ liệu kiểu đó, anh em hãy dùng DB.
# 4. Cải tiến Kotlin code cho một số component
Phần này khá hay ho, anh em nên áp dụng luôn để code sạch đẹp hơn

## 4.1. LiveData Observers
Trước đây:

![](https://images.viblo.asia/0a486036-808c-4248-a8a7-3254db0798ea.png)

Mới:

![](https://images.viblo.asia/70348196-3935-4ff9-b706-90279ccad52a.png)

Cực kì ngắn gọn luôn! Cá nhân mình thích sự rút gọn này nhất

## 4.2. LiveData Transformations
Thay vì gọi các phương thức **map**, **switchMap** từ class Transformations, bây giờ anh em có thể gọi trực tiếp từ object kiểu LiveData vì Google đã chuyển các phương thức này thành extension của LiveData

![](https://images.viblo.asia/70348196-3935-4ff9-b706-90279ccad52a.png)

## 4.3. Khởi tạo ViewModel
Nếu không dùng Dagger hoặc Koin để inject ViewModel, anh em thường khởi tạo ViewModel như sau:

![](https://images.viblo.asia/250cda41-b086-4f0b-8fd8-e06d131f525c.png)

Nay chỉ cần như thế này thôi:

![](https://images.viblo.asia/29c7059e-0121-499b-8aa1-a5450b211ae0.png)

Bài viết đã dài nên mình sẽ tiếp tục trong phần sau, link sẽ cập nhật sau cho anh em