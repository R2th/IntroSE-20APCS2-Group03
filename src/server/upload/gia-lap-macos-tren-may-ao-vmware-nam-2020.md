Yêu cầu cài đặt:
* **Windows 10 64 bit để có thể dùng hết công suất của RAM**
* **RAM: Từ 8GB đến 32GB**
* **Ổ cứng: SSD**
* **Vmware: Trên Windows 10 64 bit nên dùng phiên bản 15. Còn nhỏ hơn phiên bản 15 cài không được trên Windows 10 64 bit**

![](https://images.viblo.asia/10509143-5d7c-4e37-83d5-67a1cfa76ad2.png)

Mục đích cài đặt để lập trình IOS chứ không dùng để trải nghiệm công nghệ

Theo như trang [Apple Developer](https://developer.apple.com/ios/submit/) cho hay: "Bắt đầu từ tháng 4 năm 2021, tất cả các ứng dụng iOS và iPadOS được đăng lên AppStore bắt buộc phải được lập trình trong Xcode 12 và IOS 14 SDK". 

Khi cài đặt thì vui lòng [tải bộ cài đặt giả lập MAC OS X trong VMWare](https://drive.google.com/drive/folders/1V7mD59uEFjofBx9BqxI1wwjHWbw41a3b?usp=sharing) có chứa **macOS Catalina 10.15.6** là bản mới cài được Xcode 12 và IOS 14 SDK (Các phiên bản Xcode phụ thuộc vào phiên bản của hệ điều hành Mac OS X) hoặc tải Mac OS X 11 Big Sur mới nhất được thông báo tại hội thảo [WWDC](https://en.m.wikipedia.org/wiki/Apple_Worldwide_Developers_Conference) vào ngày 22/06/2020 và phát hành ngày 12/11/2020 [tại đây](http://www.mediafire.com/file/dbfod9u5q9ii9nd/macOS_Big_Sur_11.0.1_%252820B29%2529.iso/file). Và lập trình IOS, thì nên theo dõi trang hướng dẫn chính thống của [Apple dành cho developer](https://developer.apple.com/) để cập nhật những thay đổi mới nhất từ **Apple**.

Sau khi tải [bộ cài đặt MAC OS X 10.15 trong VMWare ](https://drive.google.com/drive/folders/1V7mD59uEFjofBx9BqxI1wwjHWbw41a3b?usp=sharing) thì thực hiện theo từng bước để cài đặt:

# BƯỚC 1: Cài đặt VMWare WorkStation
Nếu đã có VMWare rồi thì có thể bỏ qua bước này. Còn chưa có thì tiến hành cài đặt phần mềm. 

Sau khi cài đặt xong, tiến hành nhập key và vui lòng tắt phần mềm VMWare WorkStation rồi mới mở khóa chức năng giả lập MacOS
# BƯỚC 2: Mở khóa chức năng giả lập MacOS
Trước tiên cần đóng tất các các cửa sổ máy ảo.

Sau khi giải nén file **Unlock for VMware** xong thì tìm file **win-install.cmd** và chạy bằng quyền admin để tiến hành cài đặt.

![](https://images.viblo.asia/52e13c08-42cf-4e09-a7cc-48fda46ea422.png)

Sau khi màn hình CMD trên biến mất cũng có nghĩa là đã cài đặt xong rồi đấy.

# Bước 3: Cài đặt giả lập MacOS
Chú ý: Dung lượng ổ cứng lúc này nên từ 40GB đến 150GB để dành chuyên dụng cho một việc là lập trình IOS tốt ở hiện tại và tương lai. 

Mở VMWare lên và cài đặt thôi.

Trên cửa sổ VMWare, chọn tạo mới một máy ảo "Create a new Virtual Machine".

Sau đó chọn như hình.

![](https://images.viblo.asia/d0f8ce72-e5a0-4e29-a5ed-634af110c5b3.PNG)

![](https://images.viblo.asia/17b0d8f9-9b1d-470f-b078-4f38791d9203.PNG)

![](https://images.viblo.asia/18795282-7944-44d2-88cb-5d73f8facb2b.png)

Chọn mount file ISO sau, vì mình cần chỉnh sửa một chút xíu ở đoạn cuối.

![](https://images.viblo.asia/3b7c036e-aafe-4446-a2f1-b6398049de07.PNG)

Chọn macOS 10.15 nhé. Chữ Apple Mac OS X xuất hiện là thành quả của việc Unlock ở **bước 2**.

![](https://images.viblo.asia/23fb9a58-19c7-4a5c-8e6b-36212687b073.PNG)

Tiến hành đặt tên và lựa chọn vị trí đặt máy ảo.

![](https://images.viblo.asia/df6c3f05-315f-4c01-b6c4-4d4b4b1f3a9d.png)

![](https://images.viblo.asia/4132ed51-03f2-4cc6-83a5-5463fc1684c4.png)

Chú ý: Ở bước này, nên chia sẻ phần cứng cho máy ảo từ 50-75% máy thật để có trải nghiệm tốt nhất.

![](https://images.viblo.asia/01bfbef0-3a07-4725-9623-26a0d3699ebf.png)

![](https://images.viblo.asia/fe35eedd-02d6-45c9-9e59-313391334e60.png)

![](https://images.viblo.asia/3ba6b2fc-a8ae-40da-a445-12a8ede0dbe3.png)

![](https://images.viblo.asia/d333f076-c3a2-457d-9c0e-219ea48cb612.PNG)

Đến đây chọn Customize Hardware và chọn ISO vào phần CD

![](https://images.viblo.asia/068b88bc-0b98-44c3-9c23-07575f5daaaf.PNG)

Kiểm tra máy tính thuộc dòng chip Intel hay AMD để thêm nội dung vào file **.vmx**

![](https://images.viblo.asia/4b786feb-4d70-4318-9ea6-93a6c112b7ed.png)

Nếu máy tính thuộc dòng chip AMD như hình trên thì đến thư mục cài máy ảo đã chọn ban đầu, tìm file có đuôi **.vmx** mở bằng notepad và thêm đoạn code dưới đây vào dòng cuối cùng:

```
smc.version = "0"
cpuid.0.eax = "0000:0000:0000:0000:0000:0000:0000:1011"
cpuid.0.ebx = "0111:0101:0110:1110:0110:0101:0100:0111"
cpuid.0.ecx = "0110:1100:0110:0101:0111:0100:0110:1110"
cpuid.0.edx = "0100:1001:0110:0101:0110:1110:0110:1001"
cpuid.1.eax = "0000:0000:0000:0001:0000:0110:0111:0001"
cpuid.1.ebx = "0000:0010:0000:0001:0000:1000:0000:0000"
cpuid.1.ecx = "1000:0010:1001:1000:0010:0010:0000:0011"
cpuid.1.edx = "0000:1111:1010:1011:1111:1011:1111:1111"
featureCompat.enable = "FALSE"
```

Sau đó, Lưu lại và tắt notepad.

Nếu máy tính thuộc dòng chip Intel như hình dưới:

![](https://images.viblo.asia/7e2a254f-fbe3-42d9-b3d7-897b81f1a752.png)

Đến thư mục cài máy ảo đã chọn ban đầu, tìm file có đuôi .vmx mở bằng notepad và thêm đoạn code dưới đây vào dòng cuối cùng:

`smc.version = "0"`

Sau đó, Lưu lại và tắt notepad.

Lưu ý: Bước thêm nội dung vào file **.vmx** là rất quan trọng. Nếu không bổ sung nội dung phù hợp vào file **.vmx** thì hệ điều hành OS X 10.?? sẽ bị đứng trong quá trình cài đặt trong máy ảo VMWare.

Quay lại **VMWare** và tiến hành **Power On** máy ảo lên để cài đặt.

![](https://images.viblo.asia/367d81ab-07c4-4010-8eaf-71913730499d.PNG)


Quay lại **VMWare** và tiến hành **Power On** máy ảo lên để cài đặt.

![](https://images.viblo.asia/c0889777-e56e-40db-a064-1f0a07348dbf.PNG)

Công đoạn này đòi hỏi sự kiên nhẫn vô cùng. Hơi lâu đấy

Lúc này, khoan cài đặt vội, không là tắt máy mở lại từ đầu và tốn thêm thời gian cho sự hấp tấp.

![](https://images.viblo.asia/cbabf726-856f-4a7f-83fb-99769826eee5.png)

Sử dụng "Tiện ích ổ đĩa" để tiến hành phân vùng ổ cứng cho Mac.

![](https://images.viblo.asia/4f5556b8-52cd-4908-8b73-0a06cd47abf8.png)

Có một ổ cứng tầm mấy chục GB chưa được khởi tạo, hãy dứt khoát bấm nút "xóa".

![](https://images.viblo.asia/241f3b36-2a3c-4663-806c-96e27e8ab27c.png)

Đặt lại tên và bấm xóa.

![](https://images.viblo.asia/a53cd9b8-24cd-4d4d-bff2-3f4d49c80bd5.png)

Thế là phân vùng xong rồi. Sau đó, tắt "Tiện ích ổ đĩa" và tiến hành cài đặt.

Chọn **Cài đặt Mac OS**

Chỉ việc bấm "next", "đồng ý với điều khoản",... và chọn phân vùng cài đặt.

![](https://images.viblo.asia/5d094533-db1f-46ee-a9d5-f26f7645a27f.png)

Sau đó, chờ cài đặt.

![](https://images.viblo.asia/e674d5f1-e876-46d5-8f43-d3afa557008f.png)

Sau khi MacOS được cài đặt xong, tiến hành chọn layout bàn phím, thiết lập **ID Apple** sau đó là thiết lập mật khẩu cho máy.

![](https://images.viblo.asia/6b1b0e53-4543-43bf-bf80-08d656a927a7.PNG)


Đến đây là đã có thể sử dụng **MacOs** rồi. Tuy nhiên nó vẫn còn khuyết điểm ở chỗ là chưa thể mở rộng màn hình được. Và vì thế, trải nghiệm sẽ không hoàn hảo. Qua bước kế tiếp nào.

# BƯỚC 4: Thiết lập chức năng toàn màn hình cho Mac với VMTool

Tạm thời **Power Off** máy ảo, click chuột phải vào máy ảo ở danh sách bên trái, chọn **Setting**.

![](https://images.viblo.asia/15dea363-fdfe-4344-ba4c-e16325f7fdef.PNG)

Đưa file ISO của **VM Tool (New)** vừa tải vào và ấn OK. Mở máy ảo và tiếp tục cài đặt.

![](https://images.viblo.asia/8414a290-8b5d-4dab-8015-7436b8b33c26.png)

Chọn **Install VMWare Tools**, và tiếp tục nhấn next, bấm mật khẩu của **Apple ID** cho tiến trình cài đặt.

![](https://images.viblo.asia/ae1f4700-9509-4e22-b87e-f0a0cb516437.png)

Sau khi có thông báo về bảo mật, chọn **Mở tùy chọn bảo mật** và ấn **Cho phép**

![](https://images.viblo.asia/e2fe90da-a910-40bb-b8dc-a681b1e7f147.png)

![](https://images.viblo.asia/942a7b6a-200e-402b-b134-c9617ecac07a.png)


Sau khi hoàn thành cài đặt, tiến hành khởi động lại máy ảo bằng cách ấn vào nút "khởi động lại" trên thông báo.

Một lần nữa, lại tiếp tục "cho phép" lần nữa, sau thao tác này, chọn **Install VMTool** và thực sự cài đặt (các thao tác vẫn như cũ tuy nhiên lần này sẽ lâu hơn một chút).

Cài đặt xong rồi thì có thể mở toàn màn hình trên thanh công cụ của **VMWare**.

![](https://images.viblo.asia/caecf6b7-c5a9-42ea-b58a-9362e9b57b16.png)