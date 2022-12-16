## 1. Hỗ trợ Desktop ảo

- Ở Windows 10 có 1 tính năng khá là hữu ích đó là có thể tạo được 1 hoặc nhiều desktop ảo. 
- Cách tạo desktop ảo: dùng tổ hợp phím tắt **Windows + Tab**  => 
(1) **nhấn và giữ** cửa sổ cần di chuyển sao đó kéo sang Desktop ảo khác có sẵn.  
(2) Kéo cửa sổ cần di chuyển vào  **+ New Desktop** để thêm vào Desktop ảo mới. 

![](https://images.viblo.asia/ecf89190-7da8-4f07-aacf-89c092b205d1.png)

## 2. Ghim ứng dụng vào Menu Start/Tastbar 

-  Các bước để ghim ứng dụm vào Menu Start/Tastbar:

**Bước 1:** tìm ứng dụng mà bạn muốn ghim vào danh sách hoặc tìm kiếm nó bằng cách nhập tên ứng dụng vào hộp tìm kiếm (Type heare to search)
Nếu thực hiện bước tìm kiếm thì ngay phía dưới tên ứng dụng sẽ là 1 list các thao tác có thể thực hiện. Bạn có thể Ghim hoặc bỏ Ghim từ đây.

![](https://images.viblo.asia/eae8561f-7646-4648-8eb5-4f1c3d959a01.png)

**Bước 2:** Nhấn và giữ (hoặc bấm chuột phải) ứng dụng, rồi chọn Ghim để Bắt đầu (Pin to Start/Pin to taskbar) 

![](https://images.viblo.asia/d4637a83-68a4-4009-8f2a-2736397abd0f.png)

**Bước 3:** Để hủy ghim một ứng dụng, chọn Bỏ ghim khỏi Bắt đầu (Unpin from Start/Unpin from taskbar)

![](https://images.viblo.asia/7e976b9f-ed8b-4e8c-b5e4-24b6ab461045.png)

## 3. Tùy chỉnh Menu Start

![](https://images.viblo.asia/d616c8e4-3f60-40a4-83ee-571805cf7233.png)

- Bạn có thể thực hiện tùy chỉnh Live Tiles (Các ô vuông) bằng các tùy chỉnh như:

Gỡ ra khởi Menu Start (Unpin From Start) 
Thêm vào Taskbar (Pin to Taskbar)
=> đã đề cập ở mục **2. Ghim ứng dụng vào Menu Start/Tastbar **

Thay đổi kích thước (Resize)

Gở bỏ ứng dụng (Uninstall)

## 4. Lên lịch tự động bật tắt Dark Mode trên Windows 10

- Dark Mode (chế độ ban đêm), là 1 chế độ đưa giao diện người dùng từ nền sáng sang nền tối để giúp bảo vệ mắt người dùng khi về đêm. 
- Khác với chế độ ánh sáng đêm – Light Night là chỉ tác động tới màu sắc, giúp làm dịu mắt người dùng khi đêm về. Dark Mode chuyển hẳn giao diện sang nền tối mà không tác động tới độ sáng của màn hình

### a. Thiết lập tự động bật chế độ Dark Mode

**Bước 1:** nhấn tổ hợp phím **Windows + S** hoặc **Windows + Q** => sau đó nhập từ khóa **Task Scheduler** =>  nhấp vào **Run as administrator** để chạy chương trình.

![](https://images.viblo.asia/0b722885-5ddf-4914-bb9f-91bd232148af.png)

**Bước 2:** ở giao diện cửa sổ mới hiện lên, nhấn chọn **Create Basic Task** .

![](https://images.viblo.asia/fdd8ac69-86f1-4ec4-aa0f-2437f51d1364.png)

**Bước 3:** đặt tên liên quan cho Task trong ô **Name** => sau đó nhấn **Next** . Example:  Name = Turn on Dark Mode auto (như hình).

![](https://images.viblo.asia/a984db40-80bc-4252-b381-37f6c5cc5521.png)

**Bước 4:** trong cửa sổ mới,có thể lập lịch bật **Dark Mode** hằng ngày =>  sau khi setting ngày xong thì nhấn **Next**.

![](https://images.viblo.asia/d122b424-7c47-479f-9e97-3c0f04f3fb81.png)

**Bước 5:** ở giao diện tiếp theo,  có thể thiết lập ngày và giờ tự động bật **Dark Mode** => nhấn **Next** để tiếp tục.

![](https://images.viblo.asia/e1d42ccc-d629-43e9-80a5-74179b98474f.png)

**Bước 6:** nhấp chọn **Start a program** => sau đó nhấn **Next** .

![](https://images.viblo.asia/c5391f77-0880-4a78-a79e-116b43bf7f03.png)

**Bước 7:** Trong giao diện tiếp theo

![](https://images.viblo.asia/0b12833b-3d7c-4b38-b651-413e8c216783.png)

Ở ô **Program/script** sẽ input:

`reg.exe`

Ở ô **Add arguments (optional)** sẽ input: 

`add HKCUSOFTWAREMicrosoftWindowsCurrentVersionThemesPersonalize /v AppsUseLightTheme /t REG_DWORD /d 0 /f`

=> nhấn **Next** để tiếp tục.

**Bước 8:** kiểm tra lại thông tin setting và nhấn **Finish** để hoàn tất cài đặt.

![](https://images.viblo.asia/92ae8945-b7ee-4b11-833b-9ab462a9888a.png)

### b. Thiết lập tự động tắt chế độ Dark Mode

**Bước 1:** các bạn làm theo trình tự từ **bước 1** đến **bước 6** giống như phần **a. Thiết lập tự động bật chế độ Dark Mode**. Tuy nhiên phần đặt tên các bạn đặt khác cho dễ phân biệt và dễ quản lý. Ví dụ: **Name** = **Turn OFF Dark Mode auto** 

**Bước 2:** Trong giao diện Program:

Ở ô **Program/Script** sẽ input: 

`reg.exe`

Ở ô **Add arguments (optional)** sẽ input: 

`add HKCUSOFTWAREMicrosoftWindowsCurrentVersionThemesPersonalize /v AppsUseLightTheme /t REG_DWORD /d 1 /f`

### c. Xóa thiết lập tự động bật/tắt chế độ Dark Mode

- Trong trường hợp các bạn muốn tắt, hoặc xóa thiết lập này thì các bạn mở **Task Scheduler** lên và nhấn vào **Task Scheduler Libary** => sau đó nhấn chuột phải vào task => nhấn **Disable** để hủy hoặc **Delete** để xóa.

![](https://images.viblo.asia/49bf6afe-408e-4068-a58e-86cb2d293a3e.png)

## 6.  Light Night – Tính năng bảo vệ mắt vào ban đêm
 
- Night light Win 10 cho phép ngưởi dùng điều khiển ánh sáng màn hình cho phù hợp nhất.
- Ánh sáng của Night Light có tác dụng làm dịu mắt, chống mỏi mắt và bảo vệ mắt khi làm việc với máy tính trong điều kiện thiếu sáng, hay ban đêm.

### a. Cách kích hoạt tính năng Night Light

**Bước 1:** ở màn hình **Desktop** nhấn chuột phải chọn **Display Settings**.

![](https://images.viblo.asia/a1eaf4f9-bc11-4935-ab55-386116287953.png)

**Bước 2:** Trong cửa sổ Settings, chuyển trạng thái OFF => ON ở phần Night Light và các bạn sẽ nhận thấy màn hình sẽ chuyển sang màu ngả vàng để giúp làm dịu mắt hơn.

![](https://images.viblo.asia/ecefb44b-91a0-408c-8ab4-214aa5f63501.png)

### b. Thiết lập tự động bật chế độ Night light

**Bước 1:** ở màn hình **Desktop** nhấn chuột phải chọn **Display Settings**.

**Bước 2:** Trong cửa sổ Settings, chọn** Night light settings**

![](https://images.viblo.asia/c279ff06-895f-4c5d-bcef-dce7fc6161b5.png)

- Tại đây các bạn có thể tùy chỉnh lại ánh sáng đêm cho phù hợp, bằng cách điều chỉnh thanh trượt trong phần **Strength**

## 7. Một số cách tắt máy tính Windows 10

- Shutdown Win 10 mặc định
- Tắt máy tính bằng lệnh với Run
Mở cửa sổ lệnh Run bằng tổ hợp phím **Windows + R** => nhập vào lệnh **shutdown /s** => nhấn OK hoặc Enter => sau đó máy tính sẽ được tắt ngay lập tức 

![](https://images.viblo.asia/9895ecf1-8591-42bb-bb3a-c59f8ec0f99a.png)

- Hẹn giờ tắt máy bằng lệnh Run
Mở cửa sổ lệnh Run bằng tổ hợp phím **Windows + R** => nhập vào lệnh **shutdown -s -t 60** => nhấn OK hoặc Enter 
Lứ ý: 60 = time bạn muốn setting tắt máy