Chào buổi tối các anh chị em. 

*Lại một tuần bận rộn nữa vừa trôi qua, vẫn kịch bản cũ, KH dí, các xếp dí, anh em dí. 
Ngày nào cũng phải một lon bò húc để duy trì sức chiến đấu. Bắt đầu cảm thấy căng dần đều hơn rồi.*


Hôm nay deadline, ngồi đọc lại bài report của các anh em trong group, thấy anh em nghiên cứu được bao nhiêu chủ đề hay, rất nhiều cái nên ứng dụng không những  vào dự án thực tế mà còn trong nhiều các lĩnh vực khác (xử lý vấn đề, quản lý con người, kinh nghiệm phỏng vấn).

Quay lại nhìn lại mình, cũng hơi thất vọng một tí. Phải thừa nhận là cùng với vòng xoay của dự án, hàng ngày cứ trôi qua rất nhanh chóng. Về phần dự án thì tạm ổn, nhưng về khía cạnh bổ sung kiến thức cho bản thân mình thì thật sự là chưa đạt được mục tiêu và kì vọng như ban đầu.

Thấy tốc độ di chuyển của mình bắt đầu hơi chậm rồi,  muốn nghiên cứu thêm cái gì, học hỏi thêm cái gì mới mà mãi cũng chưa thể thực hiện được. (buondandeu).

Lại lang thang lên mạng tìm tutorials và làm theo như mọi lần. Tiếp tục series

**Lập trình MacOS cho người mới bắt đầu**

Hôm nay chúng ta lại tiếp tục đi tiếp phần đang dang dở hôm trước.

Trong phần này chúng ta sẽ tiếp tục tìm hiểu cách tạo UI, cụ thể hơn đó chính là thanh menu, một phần không thể thiếu trong những app của macOS. Trong menu sẽ tồn tại những tuỳ chỉnh cần thiết cho app để người dùng sử dụng thuận tiện hơn, dễ dàng hơn, tiện ích hơn.

# Menu

Trong "**Main.storyboard**" , bấm vào thanh menu hoặc "**Application Scene**" để chọn. App sẽ tự động tạo ra những tuỳ chỉnh menu sẵn có, tuy nhiên hầu như chúng đều không được sử dụng ở trong app của chúng ta. Cách dễ nhất để tìm hiểu các menu là dùng "**Document Outline**". Bấm vào hình tam giác để hiện phần "View" của menu và chi tiết bên trong của nó.

![](https://images.viblo.asia/2b45c72f-f140-42ba-ae23-1ba798c8f9c5.png)

Cấu trúc của thanh menu là một tập các menu lồng vào bên trong và các item của menu. Chuyển sang "**Identity Inspector**" trong bảng "**Utilities**" để bạn có thể thấy được mỗi đầu vào trong danh sách là gì cũng như khi bạn bấm vào nó. "**Main Menu**" là một instance của class "**NSMenu**". Nó chứa một chuỗi các "**NSMenuItems**:" và "**View**" chính là một phần trong nó.

Mục "**View**" chứa những menu con cũng là các "**NSMenu**" và bản thân chúng chứa một chuỗi các "**NSMenuItems**". Ví dụ là mục "**Separator**" là một đặc tả của "**NSMenuItem**".

Điều đầu tiên chúng ta cần làm chính là bỏ đi những menu không cần thiết ở trong app của mình. Để làm được điều đó, chọn "File" trong "Document Outline" và ấn "Delete" để bỏ nó đi. Nếu bạn chọn nó trong "Visual Editor" và xoá, bạn sẽ chỉ xoá đi những menu ở bên trong mục "File", vì vậy sẽ xuất hiện những khoảng trắng ở trong thanh menu. Nếu điều này xảy ra, chọn khoảng trắng đó và ấn "Delete" để xoá nó đi.

Tiếp tục xoá menu cho đến khi chỉ còn lại 3 mục "**EggTimer**", "**Window**" và "**Help**".

![](https://images.viblo.asia/5c3f3b9f-6749-4483-92b8-c5ae68daec80.png)https://images.viblo.asia/5c3f3b9f-6749-4483-92b8-c5ae68daec80.png

Bây giờ bạn hãy thêm một mục menu mới với chức năng giống như 3 button ở phần trước. Tìm "menu" trong "**Object Library**". Kéo một "Menu Item" vào giữa "**EggTimer**" và "**Window**". Nó sẽ hiện một ô màu xanh, vì nó chưa có một menu với tiêu đề.

Bây giờ hãy kéo một "Menu" vào trong ô màu xanh. Nếu bạn thấy việc cho vào ô màu xanh khó thì bạn hãy kéo nó vào trong "Document Outline" và đặt nó ngay dưới "Item". Menu mới tạo vẫn chưa có tiêu đề những nó đã có sẵn 3 mục con.

![](https://images.viblo.asia/b001e73f-8da2-4b6a-84e7-b1411ed28cf6.png)

Với menu đã được chọn (không phải "Item" nhé), chuyển sang mục "**Attributes Inspector**" và chuyển tiêu đề thành "**Timer**". Chọn "Item 1", chuyển tên nó thành "**Start**" bằng việc double click hoặc sửa nó trong "Attributes Inspector".

Ấn vào "**Key Equivalent**" trong "**Attributes Inspector**" và ấn tổ hợp "Command-S" để gấn cho nó phím tắt. 
*Thông thường thì "Command-S" có nghĩa là Save, nhưng vì ta đã xoá đi menu "File" cho nên nó sẽ không gây lỗi gì. Làm tương tự như bước trên để tạo ra mục "Stop" với phím tắt "Command-X" và "Reset" với "Command-R".*

![](https://images.viblo.asia/17697cbc-e108-425c-ac3b-7d699961a0eb.png)

Bạn có thể thấy 3 button ở trên thanh menu trong "Visual Editor". Chuyển sang "Identity Inspector", bấm vào từng cái một để xem nó được nối vào "**Applications**", "**First Responder**" và "**AppDelegate**". "**First Responder**" thường là thành phần trên cùng của view controller , nó nhận sự kiện click của các button trong menu.

Chọn option vào "**ViewController.swift**" và thêm đoạn code sau:

![](https://images.viblo.asia/e78a7bc7-8715-4aad-9964-119ed11f41cd.png)

Kéo thả chuột từ Start và trong ô màu da cam chính là tượng trưng cho "**First Responder**". Một pop-up sẽ được đưa lên và hiện ra một danh sách để lựa chọn. Kéo đến "**startTimerMenuItemSelected**". (có thể gõ sta để ra gợi ý)

![](https://images.viblo.asia/c30f6d0f-9e77-479a-9a64-c35769bb05a2.png)

Kết nối 
- Button "**Stop**" với "**stopTimerMenuItemSelected**" 
- Button "**Reset**" với "**resetTimerMenuItemSelected**". 

Tuy nhiên 3 button này sẽ không được kích hoạt cùng một thời điểm, và chúng phải notify điều đó cho người dùng. Điều này sẽ không thể được giải quyết ở trong "**ViewController**" vì chúng luôn luôn là "**First Responder**", nên những menu này sẽ được điều khiển ở trong "**AppDelegate**".

Mở "**Main.storyboard**" , Chọn option vào "**AppDelegate.swift**" trong "**Project Navigator**". Kéo thả chuột từ menu "**Start**" vào trong "**AppDelegate**" và gán cho nó tên là "**startTimerMenuItem**".

Làm tương tự với "**stopTimerMenuItem**" và "**resetTimerMenuItem**".

![](https://images.viblo.asia/fcdfdc5c-5510-41cd-ae2d-949dc275249c.png)

Việc kích hoạt hoặc ẩn nút trên menu đó sẽ được giới thiệu trong phần 3. (Hi vọng viết tiếp)

# Cửa sổ Preferences

![](https://images.viblo.asia/eb54b105-491c-4112-87af-33c5dd70b53a.png)

Cửa sổ chính cho app của chúng ta đã hoàn thiện rồi, nhưng chúng ta vẫn cần một cửa sổ "**Preferences**" để người dùng có thể tuỳ chọn cho việc họ muốn luộc chín trứng trong bao lâu. 

Cửa sổ "**Preferences**" sẽ hiện ra hoàn toàn độc lập với cửa sổ của controller, bởi vì cửa sổ "**Preferences**" sẽ có kích cỡ hoàn toàn khác và kích cỡ này sẽ không được thay đổi. 

Chúng ta có thể tạo ra nhiều view controller được hiển thị bởi cùng window controller, những chúng sẽ cùng chia sẻ một tuỳ chỉnh với window controller đó.

Mở "**Main.storyboard**", đóng "**Assistant Editor**" nếu như nó đang mở, tìm "window" trong "**Object Library**". Kéo một "**Window Controller**" mới vào trong "**Visual Editor**". 

Nó sẽ tạo một "**View Controller**" để hiện thị nội dung của nó. Hãy sắp xếp lại các cửa sổ sao cho dễ nhìn tuy nhiên nó nên ở gần thanh menu.

Mở menu "**EggTimer**" và kéo thả từ "**Preferences**..." đến một "**window controller**" mới. Chọn "Show" từ popup được hiển thị. Nó sẽ tạo ra một đường dẫn từ "**Preferences**..." đến menu trong "**EggTimer**", 
--> window controller này sẽ hiển thị view controller mới.

![](https://images.viblo.asia/3cda0c66-4bc4-4518-a1cb-4a49c552e02d.png)

Bây giờ hãy tạo một view controller mới cho cửa sổ **Preferences**.

![](https://images.viblo.asia/eb45495c-ff8f-4ce0-9739-a0a4b793cefd.png)

Đặt tên nó là "**PrefsViewController**" kế thừa từ "**NSViewController**". 

Chú ý: Đừng quên bỏ check tạo file xib nhé.

![](https://images.viblo.asia/8edd8ae3-e4d8-4367-8dfc-f1eda3e62ecf.png)

Quay lại "**Main.storyboard**", chọn view controller mới tạo và chuyển class của nó thành "**PrefsViewController**" trong "**Identity Inspector**".

![](https://images.viblo.asia/685de10f-fb61-47f1-a214-ba7787ef0b40.png)

Chọn "**Window**" trong cửa sổ "**Preferences**" . Không đặt "autosave name" cho nó, bỏ check "**Minimize**" và "**Resize**" để kích cỡ cửa sổ luôn luôn cố định.

![](https://images.viblo.asia/f3880e24-9c87-4f84-a53d-3b9ca93bfff6.png)

Vào trong "**Size Inspector**" và chỉnh chiều rộng là 416 và chiều cao là 214 cho "**Content Size**". Bên dưới "**Initial Position**", chọn "**Center Horizontally**" và "**Center Vertically**".

![](https://images.viblo.asia/e3666905-7328-4218-b5ee-8785e974a0fc.png)

"**PrefsViewController**" sẽ hiển thị một popup để chọn một khoảng thời gian cố định và một thanh trượt để tuỳ chỉnh thời gian. 

Nó sẽ có 2 label và 2 button là "*Cancel*" và "*OK*". Label này sẽ được thay đổi liên tục tuỳ theo khoảng thời gian đã chọn.

![](https://images.viblo.asia/6bb9076f-0ee7-414d-b883-385c438712d4.png)

Hãy tạo những control với thứ tự như sau :

* Label : đặt title là "Preset Egg Timings:"
* Pop Up Button
* Label : đặt title là "Custom Egg Timing:"
* Label : đặt title là "6 minutes"
* Horizontal Slider
* Push Button : đặt tiêu đề là "Cancel"
* Push Button : đặt tiêu đề là "OK"

Vì kích thước cửa sổ này là không đổi nên, việc auto-layout là không cần thiết, bạn chỉ cần căn chỉnh vị trí các control sao cho đúng hình vẽ trên là được. Double-click và "Pop Up Button" và đặt tiêu đề chúng như sau:

* For runny soft-boiled eggs (barely set whites): 3 minutes
* For slightly runny soft-boiled eggs: 4 minutes
* For custardy yet firm soft-boiled eggs: 6 minutes

Kéo thêm 2 "Menu Item" nữa trong "Object Library" , một "Separator Menu Item" và một "Menu Item". Đặt tiêu đề của chúng như sau:

* For firm yet still creamy hard-boiled eggs: 10 minutes
* For very firm hard-boiled eggs: 15 minutes
* Custom

![](https://images.viblo.asia/3114d4ba-4ca2-4edc-8f20-b677f849d2c3.png)

Phía trên là khoảng thời gian cho từng giai đoạn trứng chín khác nhau để người dùng tự lựa chọn. Đặt lựa chọn mặc định của "Pop Up Button" là mục 6 phút. Chúng ta sẽ sử dụng một chút mẹo ở đây để việc chọn mục trong "Pop Up Button" dễ dàng hơn. Chúng ta sẽ đặt số của tag cho mỗi mục trong "Pop Up Button" trùng với số phút của nó. Đặc biệt với mục "Custom", hãy để tag của nó bằng 0

![](https://images.viblo.asia/f88e2823-77a2-4173-96ed-558da39036ba.png)

Bây giờ hãy chọn "**Slider**" và trong "**Atrributes Inspector**" đặt "Tick marks" bằng 25, "Minimum Value" bằng 1, "Maximum Value" bằng 25, "Current Value" bằng 6 và check vào "On stop on tick marks". Khi tick marks được hiện ra, bạn sẽ dịch chuyển slider xuống một vài pixel . Vô hiệu hoá slider bằng cách bỏ check "Enabled". Nó sẽ chỉ được sử dụng khi "Custom" được chọn.

![](https://images.viblo.asia/a2232194-1f82-47e1-8d99-80e3a3f5bf6b.png)

# Kết nối các đối tượng của Preferences

Chọn option vào "PrefsViewController.swift" trong "Project Navigator" và giấu thanh kế bên đi nếu bạn cần thêm khoảng trống. 

Hãy tạo những Outlet sau trong View Controller:

* Popup: presetsPopup
* Slider: customSlider
* Label: customTextField

Và những action sau :

* Popup: popupValueChanged
* Slider: sliderValueChanged
* Cancel button: cancelButtonClicked
* OK button: okButtonClicked

Code của bạn sẽ trông như thế này

![](https://images.viblo.asia/baea30ea-66e3-4fc9-905d-f967ea3fa12f.png)

Và kiểm tra kết quả:

![](https://images.viblo.asia/8c3872c9-b60b-4b6b-899f-0691eeb2785a.png)

Đến đây là chúng ta đã xong hoàn chỉnh phần tạo giao diện cho app, ở phần sau chúng ta sẽ đưa code logic vào để cho app hoạt động theo ý mình. 

Nguồn: https://www.raywenderlich.com/151746/macos-development-beginners-part-2