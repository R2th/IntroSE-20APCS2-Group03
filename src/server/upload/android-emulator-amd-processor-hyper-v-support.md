Nguồn bài viết : https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html

Kể từ phiên bản cải tiến lớn của Android Emulator hai năm trước, chúng tôi đã tập trung vào việc cung cấp trình giả lập nhanh và nhiều tính năng để giúp bạn xây dựng những ứng dụng tuyệt vời. Hiện nay, Android Emulator là thiết bị hàng đầu được deployed khi sử dụng Android Studio - nhiều hơn gấp 2 lần so với các thiết bị Android vật lý. Chúng tôi đã được nghe rằng Android Emulator đã đi được một chặng đường dài, nhưng chúng tôi vẫn chưa hoàn thành.

Làm cho Android Emulator nhanh hơn là một trong những ưu tiên hàng đầu của Android Studio team. Trong vài lần phát hành gần đây, chúng tôi đã đưa ra quick boot & emulator snapshots để emulator có thể nhanh chóng bắt đầu và tiếp tục các phiên giả lập trong vòng chưa đầy 2 giây. Cho đến nay, chương trình giả lập của chúng tôi hầu hết đã hoạt động trên các máy tính macOS và Linux. Nhưng đối với người dùng Microsoft Windows hoặc nền tảng Microsoft® Hyper-V ™, hardware accelerated của chúng tôi cho Android Emulator mới chỉ hoạt động với các máy tính có sử dụng bộ xử lý Intel®. Hỗ trợ cho bộ xử lý AMD® và Microsoft Hyper-V hypervisor là hai yêu cầu lâu dài của cộng đồng nhà phát triển Android mà chúng tôi sẽ giải quyết với bản cập nhật Android Emulator mới này.

Hiện nay, bạn có thể tải xuống bản Android Emulator mới nhất, được thiết lập để chạy Android Emulator (AVD) x86 trên các máy tính sử dụng bộ xử lý AMD. Bản cập nhật này giúp Android Emulator dễ dàng tiếp cận hơn với nhóm các nhà phát triển ứng dụng Android trước đây bị giới hạn khi sử dụng emulator, nhưng giờ đây có thể có sử dụng hardware accelerated. Hơn nữa, đối với những người sử dụng Hyper-V , Android Emulator giờ đây có thể cùng tồn tại với các ứng dụng khác cũng được hỗ trợ bởi Hyper-V khác trên Windows 10.

Cảm ơn Microsoft Windows Hypervisor (WHPX) API và các đóng góp nguồn mở gần đây của Microsoft, nhiều nhà phát triển ứng dụng Android giờ đây có thể tận dụng tất cả các cải tiến tốc độ và tính năng trong  Android Emulator.

![](https://4.bp.blogspot.com/--JDGMpc-dhE/W0OUetzsGyI/AAAAAAAAFmQ/IVVQjR5YF_UQEhrmq21chrm9sGuvk-GCQCLcBGAs/s1600/amd_android_emulator.png)
*Android Emulator running on Windows 10 with AMD Processor Screenshot Configuration: Asus ROG Strix GL 702ZC, Processor: AMD® Ryzen™ 7 1700 Processor, Chipset: AMD 5350, Graphics: AMD® Radeon™ RX580*

Công nghệ này được bắt đầu hỗ trợ trong bản Android Emulator v27.3.8 canary, và hôm nay chúng tôi sẽ triển khai việc hỗ trợ bộ xử lý AMD & Hyper-V trên stable channel để có thêm phản hồi. Bên cạnh bản cập nhật này, chúng tôi đã thêm các cải tiến tốc độ trong việc loading emulator snapshot cho những nhà phát triển sử dụng Intel® Hardware Accelerated Execution Manager (HAXM).

### How to use
**Linux**

Nếu bạn sử dụng Linux để phát triển ứng dụng android, Android Emulator sẽ tiếp tục sử dụng Kernel-based Virtual Machine (KVM) hypervisor cho cả Intel và AMD để tăng tóc máy ảo. Bản cập nhật v27.3.8 sẽ cung cấp cho bạn thêm tính năng mới của snapshots UI cùng với việc cải thiện performance, reliability và resource usage.

**macOS**

Đối với OS X v10.10 Yosemite và cao hơn, Android Emulator sử dụng  Hypervisor.Framework được tích hợp sẵn làm mặc định, và sẽ sử dụng Intel Hardware Accelerated Execution Manager (HAXM) nếu Hypervisor.Framework không sử dụng được (giống như khi chạy trên OS X v10.9 trở về trước). Khi bạn cập nhật lên phiên bản mới nhất của Android Emulator trên macOS, bạn cũng sẽ được sử dụng tính năng snapshots UI mới cùng với những cải tiến về performance, reliability.

![](https://2.bp.blogspot.com/-7fZ2nbr_fgY/W0OK2Mz3ZlI/AAAAAAAAFlw/nemB5vEYm9wzrR2sr0p8d59n3zRM2GXzACLcBGAs/s1600/android_emulator_snapshots_featureimage3.png)
*<div align="center">Android Emulator - Snapshots Extended Controls</div>*

**Microsoft Windows**

Trên các máy tính sử dụng Intel x86-based,  Android Emulator sẽ tiếp tục sử dụng Intel HAXM theo mặc định. 

Nếu bạn sử dụng AMD processor cho máy tính, bạn cần thực hiện các bước setup như dưới đây: 
- AMD Processor - Đề nghị: AMD® Ryzen™ processors
- Android Studio 3.2 Beta or higher
- Android Emulator v27.3.8+ 
- x86 Android Virtual Device (AVD) 
- Windows 10 with April 2018 Update
- Enable tính năng  Windows Features: "Windows Hypervisor Platform"

![](https://1.bp.blogspot.com/-CShJeNFvtjI/W0OTc_54R9I/AAAAAAAAFmE/U9NzRjIywhQXq-YW58DZIzN0l59fr1lEQCLcBGAs/s1600/windows10_hypervisor_Setting.png)
*<div align="center">Windows Hypervisor Platform setting in Windows 10</div>*

Nếu bạn muốn sử dụng Hyper-V cùng với Android Emulator trên Intel processor-based, bạn cũng sẽ cần thực hiện các bước giống bên trên nhưng cần thêm những yêu cầu bên dưới: 

- Enable tính Windows Features: "Hyper-V" - Chỉ hỗ trợ trên Windows 10 Professional/Education/Enterprise
- Intel Processor : Intel® Core™ processor cần có tính năng Virtualization Technology (VT-x), Extended Page Tables (EPT), và Unrestricted Guest (UG) . Thêm nữa là VT-x  cần được enable ở trong BIOS.

Tóm lại, đối với Window sử dụng Intel-based processor. Android Emulator sẽ tiếp tục sử dụng Intel HAXM được khuyến nghị. Đối với AMD processor, và những người sử dụng Hyper-V hypervisors, đây sẽ là một bước tiến thú vị để bắt đầu sử dụng Android Emulator.

### Next Steps & Feedback
Hãy download bản Android Emulator từ Android Studio 3.2 Beta SDK Manager để cải thiện hiệu suất trên tất cả các nền tảng được hỗ trợ. Chúng tôi sẽ tiếp tục nghiên cứu để cải tiến hiệu năng trên từng nền tảng và chúng tôi mong muốn sẽ nhận được những phản hồi hay những yêu cầu của các bạn.
Nếu bạn tìm thấy bug hay một vấn đề nào đó, hãy liên hệ với chúng tôi :  Android Studio development team, trên Google+ của chúng tôi hoặc trên Twitter.