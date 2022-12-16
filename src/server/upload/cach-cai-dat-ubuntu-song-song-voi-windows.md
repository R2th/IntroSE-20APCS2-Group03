Hướng dẫn cài song song Ubuntu trên Windows
Trước khi cài Ubuntu, bạn cần chuẩn bị USB dung lượng 2GB trở lên và cắm vào máy tính. Sau đó tải fie .ISO cài đặt Ubuntu theo link dưới đây.

https://www.ubuntu.com/download/desktop
Tải tiếp phần mềm Universal USB Installer theo link dưới đây.

Tải phần mềm Universal USB Installer
Trong quá trình cài đặt hãy tắt toàn bộ các chương trình diệt virus trên máy tính.

Bước 1:

Đầu tiên bạn hãy khởi động phần mềm USB Installer trên máy tính, nhấn vào nút I Agree để đồng ý các điều khoản cài đặt.

Cài USB Installer

Bước 2:

Trong giao diện mới hiện ra, phần Step 1 chọn Ubuntu, Step 2 nhấn vào Browse để tìm tới thư mục chứa file .iso cài Ubuntu đã tải về trước đó. Step 3 chọn tên USB đang sử dụng, tích chọn vào We will format...

Nhấn tiếp vào nút Create để phần mềm tiến hành boot USB.

Chọn thiết bị USB

Bước 3:

Khi quá trình Boot USB hoàn thành nhấn Close để đóng giao diện phần mềm USB Installer.

Quá trình boot

Bước 4:

Tiếp đến chúng ta tiến hành phân vùng Ubuntu trên máy tính. Click chuột phải vào My Computer hoặc This PC rồi chọn Manage.

Nhấn chọn Manage

Chuyển sang giao diện mới click vào mục Disk Management để hiển thị danh sách các ổ đĩa cũng như những thông tin của ổ đĩa. Tại đây tìm ổ đĩa còn trống để cài Ubuntu khoảng 15GB nhé.

Chọn ổ đĩa tạo phân vùng

Click chuột phải vào ổ đĩa chọn rồi nhấn Shrink Volume… để tạo phân vùng trống dùng để cài Ubuntu.

Nhấn chọn Shrink Volume

Bước 5:

Xuất hiện giao diện mới. Tại phần Enter the amount of space to Shrink in MB, nhập dung lượng phân vùng cài Ubuntu. Dung lượng khoảng 20GB là ổn. Còn nếu ổ đĩa còn thừa nhiều dung lượng thì bạn chọn nhiều lên càng tốt. Nhấn vào Shrink.

Nhập dung lượng phân vùng

Kết quả phân vùng ổ đĩa sẽ được phân vùng trống với dung lượng đã nhập.

Thông tin dung lượng phân vùng

Bước 6:

Cắm USB đã boot vào máy tính rồi nhấn các phím tắt truy cập Boot Options. Các phím tắt sẽ tùy theo từng hãng khác nhau. Bạn đọc tham khảo các phím tắt truy cập vào giao diện BIOS dưới đây.

Hướng dẫn vào BIOS trên các dòng máy tính khác nhau
Trong giao diện chọn thiết bị boot nhấn USB Storage Device để chọn thiết bị USB.

Nhấn chọn thiết bị

Xuất hiện giao diện mới chọn Install Ubuntu để cài đặt Ubuntu trên Windows.

Nhấn chọn Install

Bước 7:

Lụa chọn ngôn ngữ rồi nhấn tiếp Contiune.

Lựa chọn ngôn ngữ

Ở giao diện mới này, người dùng sẽ có tùy chọn Download updates while installing để cập nhật Ubuntu trong quá trình cài đặt này và Install this third-party software cài thêm phần mêm bên thứ 3. Nhấn chọn vào tùy chọn 2 và nhấn Continue để tiếp tục.

Cài phần mềm thứ 3

Bước 8:

Trong giao diện Installation type, người dùng sẽ có tùy chọn Install Ubuntu alongside Windows 8 để cài Windows nhưng không tách biệt, hoặc Replace Windows 8 with Ubuntu để thay thế hoàn toàn Windows 8, xóa toàn bộ những dữ liệu trên Windows.

Để cài song song và tách biệt hoàn toàn với Windows thì nhấn chọn vào Something else và nhấn Continue.

Chọn kiểu cài song song và tách biệt

Bước 9:

Ở giao diện tiếp theo sẽ thấy phân vùng trống ổ đĩa mà người dùng đã tạo trước đó, nhấn vào phân vùng rồi nhấn vào dấu cộng.

Chọn phân vùng cài Ubuntu

Bước 10:

Xuất hiện giao diện Create partition để tạo phân vùng Swap cho Ubuntu hỗ trợ RAM. Để có thể sử dụng thì bạn nên chọn dung lượng phân vùng Swap gấp đôi dung lượng RAM.

Phần Type for the New partition bạn chọn Logical, phần Localtion for the new partition bạn chọn Beginning of this space và phần Use as chọn Swap area sau đó nhấn OK.

Tạo phân vùng Swap

Bước 11:

Kết quả sẽ có được phân vùng swap mới tạo, nhấn chọn vào phân vùng trống và nhấn tiếp vào dấu cộng.

Phân vùng trống 

Cũng xuất hiện giao diện phân vùng. Mục Size giữ nguyên, phần Type for the new partition chọn Primary, phần Location for the new partition chọn Beginning of this space, phần Use as chọn Ext4 journaling File sytem và phần Mount point chọn / sau đó click OK.

Tạo tiếp phân vùng

Bước 12:

Phân vùng mới vừa tạo có Type là ext4, click vào đó rồi chọn Install now.

Thiết lập phân vùng 

Bước 13:

Nhấn chọn vào địa điểm vị trí hiện tại rồi nhấn vào Continue để tiếp tục.

Chọn vị trí hiện tại

Bước 14:

Chọn ngôn ngữ bàn phím là tiếng Anh và cũng nhấn Continue để tiếp tục.

Chọn ngôn ngữ bàn phím

Bước 15:

Nhập các thông tin cá nhân cơ bản được yêu cầu ở giao diện mới này và nhấn Continue.

Nhập tên người dùng

Bước 16:

Quá trình cài đặt Ubuntu sẽ tự động diễn ra. Khi quá trình này hoàn thành người dùng sẽ nhận được thông báo khởi động lại máy tính. Nhấn Restart now để khởi động lại.

Nhấn restart 

Lưu ý, khi cài đặt xong và mỗi lần khởi động lại máy tính thì mặc định Ubuntu sẽ hiển thị lên trước. Để vào Windows thì nhanh chóng chọn Windows 8 (loader) hoặc những hệ điều hành Windows khác.

Chọn hệ điều hành