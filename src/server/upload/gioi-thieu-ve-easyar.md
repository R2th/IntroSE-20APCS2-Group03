![](https://images.viblo.asia/e0547e56-49db-4d0b-8a38-d1d97adbfa9c.gif)

Chào các bạn, hôm nay mình xin giới thiệu với các bạn một công cụ làm game AR rất thú vị, đó chính là EasyAR.

Chắc hẳn với những bạn từng game AR thì đều đã từng nghe tới Vuforia rồi đúng không nào? Nhưng vốn mọi thứ đều không thể hoàn hảo, vì vậy khi công cụ A được sinh ra thì tất sẽ có 1 công cụ B cũng được sinh ra để khắc phục những vấn đề tồn đọng trong công cụ A.

Và EasyAR được sinh ra để làm 1 số thứ mà với Vuforia bạn sẽ rất khó để có thể làm được. Vậy chúng ta hãy cùng thử tạo ra 1 project AR sử dụng EasyAR để thử xem nó có gì khác so với 1 project sử dụng Vuforia ko nhé ;)

- Bước 1: Download EasyAR SDK:

    Link: https://www.easyar.com/view/download.html
    
    note: Các bạn chọn bản EasyAR SDK 2.2.0 Basic for Unity3D (unitypackage) nhé! bản pro để dành cho bạn nào trả tiền đó!
    
    ![](https://images.viblo.asia/ea0531eb-8307-4118-96db-3ec430c99b82.JPG)
    
- Bước 2: Import EasyAR SDK vào dự án:

    ![](https://images.viblo.asia/26606acd-a510-4855-90e0-f15224f90b81.JPG)
    
    ![](https://images.viblo.asia/f683a7ed-1fc2-4aef-92bd-e1415320c648.JPG)
    
    ![](https://images.viblo.asia/94905411-e48f-4b13-8dce-5725e5e1828b.JPG)
    
    
- Bước 3: Đắng ký 1 tài khoản lập trình viên để lấy được License Key:

    Link: https://www.easyar.com/view/signUp.html
    
    ![](https://images.viblo.asia/23da1eae-73f3-45c3-b5bf-cdc5d7969bdc.JPG)

- Bước 4: Add SDK License Key:

    Link: https://www.easyar.com/view/developCenter.html#license
    
    ![](https://images.viblo.asia/dea1dccf-8b00-4ebf-a21a-6ae5e85686c1.JPG)
    
    ![](https://images.viblo.asia/b84f42c1-e531-4287-a52a-d49ef6741aea.JPG)
    
    * Type:
        Các bạn chọn EasyAR SDK Basic: Free and no watermark nhé! vì chúng ta dùng đồ free mà :p
    * Application Details:
        App Name: Tên game của bạn.
        Bundle ID (IOS): com.company.gamename
        PackageName (Android): com.company.gamename        
    
- Bước 5: Copy License Key sau khi đã tạo thành công:
    
    ![](https://images.viblo.asia/004f9ef8-2765-46dc-bf2e-03db5481cb8a.JPG)
    
- Bước 6: Setup bên trong dự án:

    Kéo EasyAR_Startup vào trong Hierarchy và paste License Key vào
    
    ![](https://images.viblo.asia/6ee91e08-1437-470b-8a21-ecfbb13afff9.JPG)
        
- Bước 7: Tạo ImageTarget:
    
    ![](https://images.viblo.asia/30d1cfee-e828-4798-b5c6-77982ff482bb.JPG)
    
    * Các bạn tạo 1 GameObject đặt tên là ImageTarget
    * Add component ImageTargetBehaviour
    * Điền Path và Name file ảnh của chúng ta (nếu đặt ở thu mục đầu tiên của StreamingAssets thì chỉ cần điền tên vào cả 2)
    * Storage thì chọn là Assets
    * Size x:10 y:15 (phụ thuộc vào tỉ lệ ảnh target)

- Bước 8: Đưa object bạn muốn hiển thị vào trong ImageTarget
    
    * Ở đây mình sẽ tạo 1 khối hộp 1 vuông có màu trắng
    
    ![](https://images.viblo.asia/88b8cd4c-d2ea-4ff9-a00a-9d0d157c66a3.JPG)

- Bước 9: Tạo material và thêm ảnh image target vào dự án: (tùy chọn)

    ![](https://images.viblo.asia/27eb05bb-ec62-4537-be48-825e1ad4dc98.JPG)
    
- Bước 10: Player Settings trước khi build:
    
    ![](https://images.viblo.asia/0915c1b7-9af7-46b6-ba01-492f5689b229.JPG)
    
- Bước 11: Việc cuối cùng là các bạn chỉ việc cài game vừa build ra vào thiết bị, hướng camera về phía hình target là chúng ta sẽ thấy thành quả rồi! ^_^

Như các bạn cũng có thể thấy EasyAR không hề cần tới việc định nghĩa ảnh đối tượng qua trang web như của vuforia, hay đúng hơn là nó sẽ tự làm vậy trong chính app của mình. và hơn nữa, nó còn không đính kèm watermark với bản free! quá tuyệt vời đúng không nào?

Hi vọng qua bài này, các bạn sẽ có thể dễ dàng hơn trong việc thực hiện những dự án AR của mình ^_^