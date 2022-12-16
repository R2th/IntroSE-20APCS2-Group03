1.View là gì ?

* View là một hình chữ nhật, có toạ độ và kích thước
* Toạ độ & kích thước của View được gọi là frame
* Có thể nhận các sự kiện từ người dùng tác động vào
* Có sự phân cấp
    1.  Một view thì có nằm trong supper view (view cha) của nó
    1.  Một view có nhiều subview (view con)
* Khởi tạo một view thì có nhiều cách, cơ bản thì:
    1. Code chay
    1. Vẽ
    1. Kéo thả giao diện

Kết luận 

> View là một instance của class UIView (hoặc class con của nó) dùng để quản lý một vùng hình chữ nhật có toạ độ và kích thước trên màn hình của app. View có nhiệm vụ hiển thị nội dung, quản lý các sự kiện chạm của người dùng và quản lý layout của các subviews.

Thuộc tính cơ bản của View

* @property frame
* @property bounds
* @property center
* @property transform
* @property alpha
* @property backgroundColor
* @property contentStretch

Frame & Bounds
* Kiểu dữ liệu
1. Đều là CGRect
CGPoint : origin –> toạ độ
CGSize : size –> kích thước

1. CGPoint:
CGFloat x
CGFloat y
1. CGSize:
CGFloat width
CGFloat height
* Tính chất
1. Định nghĩa một vùng chữ nhật có toạ độ và kích thức
1. Read-only
* Sự khác nhau
1. Frame là đối với hệ toạ độ của superview chứa nó
1. Bounds là đối với hệ toạ độ riêng của nó

Tạo giao diện bằng code 
* Có nhiều cách tạo 1 view và bắt đầu bằng cách đầu tiên là code chay.
* Ta có quy trình 4 bước cho việc tạo bất cứ 1 view nào (áp dụng rất nhiều về sau)
Khởi tạo đối tượng => Xét thuộc tính =>> Frame =>> Add-Subview

Tham khảo đoạn code chay sau đây:
![](https://images.viblo.asia/17821ebd-6aec-4bfa-b5cc-79356f17938c.png)

Phân tích : 
* Tạo đối tượng UIImageView
* Xét thuộc tính image bằng 1 bức ảnh có tên là no_avatar
* Xác định frame và xét frame cho imageview
* addSubview vào wiew của ViewController (đó là màn hình của bạn)

Bắt sự kiện của View bằng code

* Một trong các sự kiện thì cơ bản nhất và đầu tiên là sự kiện của người dùng
* Một số loại sub-class của UIView đã cài đặt sẵn để có thể bắt được các sự kiện này. ví dụ:
UIButton
UISwitch
UISlider
…
* Để bắt được sự kiện này thì có 3 điểm quan trọng
1. target: chỉ ra view nào bắt được sự kiện
1. selector: function thực thi khi sự kiện được bắt
1. state: trạng thái hay kiểu cử chỉ của người dùng thao tác lên view
Xem đoạn code sau : 
![](https://images.viblo.asia/fd8c2fe3-273d-4424-bf9a-6e7683c0cefc.png)

IBOutlet & IBAction
* Việc code tay sẽ rất tốn thời gian với các ứng dụng có giao diện phức tạp.
* Tiêu chí của Apple ngay từ lúc đưa ra iOS & Xcode là chủ trương kéo thả giao diện
* Các file giao diện sẽ có đuôi là *.xib
* Nếu dùng storyboard thì sẽ là *.storyboard
* Chúng thực chất là các file xml
* Các thành phần giao diện sẽ được load từ xml thành các đối tượng cụ thể.

2.Custom View 
* Custom View là tạo ra các UI Control mới, để cho giao diện ứng dụng theo đúng với thiết kế giao diện của ứng dụng iOS.
* Các thiết kế giao diện thường sẽ phức tạp và không sử dụng các UI Control cơ bản.

2.1.Các mức cho custom

* Kế thừa:
1. Tạo Sub-class
1. Tuỳ chỉnh giao diện
* Kết hợp:
1. Sử dụng các UI Control cơ bản để tạo thành giao diện phức tạp
1. Tuỳ biến các thuộc tính

2.2.Các công việc chính trong custom view

Tạo giao diện: Xem sơ đồ sau về các con đường tạo giao diện cho 1 custom view
![](https://images.viblo.asia/9aa4050c-1c51-42e9-972e-97a1116ec3eb.png)


Việc quan trọng đầu tiên của bạn sẽ làm

> Tạo sub-class từ class UIView để tạo class mới cho custom view của bạn


* Phương pháp tạo thì theo 2 trường phái chính:
    * Code chay
        * Add Subview: Cách tạo giao diện từ việc sử dụng các UI Control đơn giản kết hợp thành UI Controll phức tạp
        * Draw: vẽ, dùng cho việc tạo giao diện theo phương pháp vẽ và thao tác với canvas
  * Kéo thả
    * LoadNibName: load 1 file *.xib chứa giao diện của Custom View, sau đó ép kiểu về thành kiểu class của Custom View
    
*   Code chay giao diện    
Phần này mình sẽ viết chi tiết phần sau ....
* Kéo thả giao diện
    * Khó khăn khi code chay
        * Việc code chay thì rất thú vị nhưng cũng rất tốn công sức.
        * Bạn không thể hình dung ra giao diện của mình như thế nào trong lúc code
        * Thay đổi vị trí các control sẽ gặp khó khăn
        
Giải pháp:

> Sử dụng phương pháp LoadNibName để load 1 file giao diện (*.xib) và ép kiểu của nó về với kiểu class của custom và sử dụng như bình thường.

* NibName là gì?
    * Là tên gọi của các file giao diện *.xib
    * Format chính là xml
    * 1 Custom có thể có nhiều file *.xib khác nhau
    * 1 cái tên Nib có thể cho nhiều file *.xib khác nhau
Các bước thực hiện như sau:
    * Bước 1: Tạo sub-class
    * Bước 2: Tạo file *.xib với tên là tên của sub-class
    * Bước 3: tiến hành kéo thả giao diện, tạo outlet & action
    * Bước 4: loadNibName và addSubView
    
Quản lý sự kiện

![](https://images.viblo.asia/6adf3021-bfd4-4680-abda-181568b7eebd.png)
* Đây là sơ đồ các kiểu bắt sự kiện của người dùng tác động lên Custom View
* Cần lưu ý điểm sau
    * Sự kiện mà Custom view bắt được thì sẽ được xử lý ở đối tượng custom view
    * Chúng không thuộc ViewController nên ViewController không thể xử lý được các sự kiện này
    * Muốn truyền sự kiện về ViewController thì sử dụng phương pháp an toán nhất là protocol

Tiếp theo sẽ  là việc truyền sự kiện và dữ liệu về ViewController sẽ được viết vào phần tiếp theo  ....
Bài viết có tham khảo 1 số nguồn trên viblo, tác giả "chuotfx" , medium...