Với Developer, việc sử dụng các công cụ để tăng tốc quá trình code là điều tất yếu, mỗi người đều lựa chọn cho riêng mình một công cụ nào đó với vấn đề của riêng mình. Với Web Developer thì công cụ nằm trên chính trình duyệt mà họ sử dụng. Dưới đây là một số thủ thuật với DevTool của GoogleChrome có thể giúp bạn tiết kiệm được thời gian nếu sử dụng hợp lý.

# 1.`Drag` and `Drop` các Element
Tại bảng điều khiển Elements, chúng ta có thể kéo thả bất kỳ thẻ HTML nào và thay đổi vị trí của chúng trên trang. 

![](https://cdn-images-1.medium.com/max/1600/1*Ua9Z12CO8LYWcx5L2zpQAw.gif)
# 2. Liên kết Element đang chọn đến Console
Trước tiên bạn chọn phần tử cần liên kết tại bảng điều khiển Element, sau đó dưới cửa số Console bạn nhập `let element = $0`, đây là tính năng của Chrome (bạn đừng nhầm của Jquery), thế là bạn có thể dùng biến `element` để điều khiển phần tử này bằng JavaScript rồi.
Còn nếu trang của bạn dùng Jquery thì tham chiếu thế này `let jqueryElement = $($0)`

![](https://cdn-images-1.medium.com/max/1600/1*Ua9Z12CO8LYWcx5L2zpQAw.gif)

# 3 Copy vào ClipBoard
Bạn có một biến có giá trị và muốn copy vào ClipBoard để paste ở bất kỳ đâu, hay kể cả `object`, `element`... 
Hãy thử `let test = 'Text Copy'; copy(test)` và giờ bạn `ctrl + v` ở bất kì đâu bạn muốn xem thế nào, tương tự bạn có thể lấy Element như cách ở trên vào copy nó vào ClipBoard để sử dụng.
# 4. Sử dụng giá trị cuối cùng của Console
Đơn giản là bạn dùng `$_` để sử dụng trong các biếu thức mà bạn cần giá trị của phần tính toán ngay ở trên.

![](https://cdn-images-1.medium.com/max/1600/0*zxJYnGdu8QUPGSiW.gif)
# 5. Lưu những sửa đổi CSS vào file.
Khi dùng DevTool thì ta có thể thay đổi CSS trực tiếp trên trình duyệt. Khi bạn thay đổi rất nhiều CSS, bạn có muốn copy từng những thay đổi đó vào file CSS ko? Với mình thì có giải pháp mình hay làm là mình cứ thay đổi CSS trên trình duyệt, sau đó mình sẽ lưu file này và ghi đè vào file gốc. Để là điều này thì sau khi thay đổi CSS, bạn làm theo huớng dẫn dưới ảnh này.

![](https://cdn-images-1.medium.com/max/1600/1*7Q-CbjzcXYR20dbtmyMbJw.gif)

# 6. Chụp lại một Element
Thông thường ta sẽ dùng thêm các công cụ bên ngoài để chụp lại cả màn hình hoặc những khu vực mà ta cần, tuy nhiên việc căn chỉnh khu vực có thể không chính xác kích thước. DevTool hỗ trợ ta cả việc chụp lại màn hình và đặc biệt là chụp theo Element mà ta muốn chụp.
Để làm điều này thì tại DevTool, bạn chọn Element cần chụp lại và nhấn `ctr+shift+p` (với Mac `cmd-shift-p`) và nhập `Capture node screenshot`.

![](https://cdn-images-1.medium.com/max/1600/0*CjWhHTmoZbCeMXSw.gif)
 # 7. Tìm một Element sử dụng CSS selectors
 Tại DevTool bạn nhấn `ctrl + f` và box tìm kiếm Element được bật lên. Bạn nhập bất kỳ kí tự nào giống trong source code, hoặc có thể truy vấn theo CSS selector
 
 ![](https://cdn-images-1.medium.com/max/1600/0*ipqpirAGqDRlEbes.gif)