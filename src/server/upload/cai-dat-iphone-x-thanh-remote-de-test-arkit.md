Cháo các bạn!

Trên Iphone X, có 1 thứ thật sự rất rất mạnh mà hiện tại không nhiều điện thoại trên thế giới có được tính năng này, đó chính là Truedepth, một trong những thành phần của công nghệ FaceID trên những chiếc Iphone thế hệ mới!

Truedepth là công nghệ giúp chúng ta có thể có được dữ liệu chi tiết khuôn mặt phía trước camera, từ đây ta có thể mô phỏng lại khuôn mặt đó trong không gian 3D, và làm nhiều thứ hay ho khác nữa.

Với facebook messager, instagram, ... nhiều app khác, họ đã có thể dùng công nghệ ML để tận dụng camera thông thường nhưng vẫn mô phỏng được khuôn mặt của người sử dụng khi đứng trước camera.

Nhưng khi bạn được trải nghiệm Truedepth, bạn sẽ thấy thật sự choáng ngợp với những gì nó có thể làm được!

Chúng ta hãy cùng xem demo phía dưới của Unity nhé!

[![](https://images.viblo.asia/dc9c8b77-a75e-46cd-9e53-e1382ad4db7f.JPG)](https://blogs.unity3d.com/wp-content/uploads/2018/08/Windup_10.webm)

Sau khi xem video, hẳn bạn cũng rất hứng thú với công nghệ nó mang lại đúng ko nào!

Trong bài viết này, mình sẽ hướng dẫn các bạn setup chiếc iphone X trở thành 1 camera remote, để có thể thử trải nghiệm 1 demo do chính Unity làm, từ đó chúng ta có thể bước đầu tiếp cận và thử nghiệm những mô hình tận dụng công nghệ này nhé!

Bước 1: Nguyên liệu.

Các bạn hãy download tất cả những thứ phía dưới nhé:
- ARKit-Plugin : https://bitbucket.org/Unity-Technologies/unity-arkit-plugin/get/53b3d3b059f2.zip
- Facial AR Remote: https://github.com/Unity-Technologies/facial-ar-remote/archive/master.zip
- Unity 2018: https://unity3d.com/get-unity/download/archive?_ga=2.169541410.2033141889.1553135377-1029688294.1551344841

Bước 2: Tạo dự án.

- Sau khi đã cài đặt xong Unity 2018 các bạn giải nén 2 file zip bên trên.
- Sau đó các bạn Open project từ thư mục vừa được giải nén từ file ARKit-Plugin bên trên.

![](https://images.viblo.asia/2258fe14-e227-4499-a729-6ea74c0f1c5c.png)

- Đồng ý nâng cấp dự án từ Unity 2017 lên Unity 2018.

![](https://images.viblo.asia/0c065006-523f-4626-93f5-9de37d30c2ca.png)

![](https://images.viblo.asia/511d5f03-9f6a-4139-8628-fe7e7548fc31.png)

Bước 3: Đưa Facial AR Remote và dự án.

- Các bạn copy dữ liệu từ thư mục giải nén được trong file zip thứ 2 file trên.

![](https://images.viblo.asia/1830e737-08c5-410d-b5c0-b14909633a93.png)

- Paste nó vào thư mục Asset của dự án vừa tạo.

![](https://images.viblo.asia/7631749b-b17b-4328-aded-68e538f1a7f0.png)

![](https://images.viblo.asia/e77d9082-c72e-487a-9b47-418577bb4a0e.png)

- Chuyển qua Unity đợi quá trình import dữ liệu diễn ra.

![](https://images.viblo.asia/daf370a7-9314-4e9d-a33c-61a528c48448.png)


Bước 4: Thêm TextMesh Pro.

Vì trong phần remote client có sử dụng vì vậy chúng ta cần thêm nó vào dự án.
- Các bạn mở scene Client lên.
- Sẽ hiện ra yêu cầu import TMP Essentials.

![](https://images.viblo.asia/e4a2c699-926d-48d6-a122-26888005c3e5.png)

- Tiếp tục là Import TMP Examples & Extras

![](https://images.viblo.asia/9bb805b6-30a8-4efa-974f-8aaf1e6ff6ba.png)

Bước 5: Chuyển đổi platform qua IOS (vì chúng ta đang build cho Iphone X mà)

- Các bạn ấn vào menu File -> Build Settings...

![](https://images.viblo.asia/d203a992-7172-4e53-9b54-64faeb0d3c20.png)

- Chọn IOS ở phần Platform -> nhấn nút Switch Platform và đợi quá trình chuyển đổi diễn ra.

![](https://images.viblo.asia/4acc2340-a4c4-47dd-b463-a77a033fa2c8.png)


Bước 6: Cài đặt dự án.

- Sau quá trình chuyển đổi các bạn ấn vào Player Settings...
- Ở phần Other Settings các bạn chọn như trong hình.

![](https://images.viblo.asia/3a1db04f-67d2-43d7-bf84-edd25f7ff80a.png)

- Bật ARKit Uses Facetracking trong file UnityARKitPlugin > Resources > UnityARKitPlugIn > ARKitSettings.

![](https://images.viblo.asia/27eaec41-7b3e-43ae-8e81-5bfcbc852caa.png)

- Thêm Scene Client vào phần Scene In Build của Build Settings mà chúng ta mở ra bên trên.

![](https://images.viblo.asia/8a9cd87c-1d7d-4e7b-b728-a11a6697693e.png)

Bước 7: Build ra Iphone X.

- Trên Unity các bạn ấn nút Build trên phần Build Settings.
- Chọn thư mục lưu dự án sau khi Build.
- Sau đó các bạn mở dự án XCode vừa được build ra.

![](https://images.viblo.asia/ab744b9b-bd9f-47af-b689-d8748a117a36.png)

- Đổi Bundle Identifier (vì mặc định của nó đã được Unity sử dụng rồi :p)
- Chọn Team trong phần Signing.

![](https://images.viblo.asia/4c8d6297-ae30-42fb-97c7-8851978875bb.png)

- Cắm Iphone X vào Macbook, và ấn Play.

![](https://images.viblo.asia/b32d6115-4a43-4040-ab86-fdbe5e432d20.png)

Bước 8: Nếu bạn không thể chạy ứng dụng trên Iphone của mình, thì hãy thử làm theo các bước sau.

![](https://images.viblo.asia/4dc80f7f-1ca8-4ae5-bc1a-4053f5b23c7b.png)

Các bạn làm theo các bước trên ảnh nhé!

![](https://images.viblo.asia/6cd70695-f562-4a0e-90d4-6ff43a493ae1.png)

![](https://images.viblo.asia/76913e47-fa29-4cfe-bcaa-5ab9a4b5ce41.png)

![](https://images.viblo.asia/03976c3d-d743-4345-ac8e-ef343828d4d2.png)

![](https://images.viblo.asia/1b58bab9-328c-4bea-8a83-0693211f5d4a.png)

![](https://images.viblo.asia/a8cf9f89-565b-4560-b0f3-8a25185d8f85.png)

Bước 9: Mở sample của Unity ra để thử nghiệm xem đã thành công hay chưa.

- Các bạn mở Scene trong thư mục Examples -> Scenes -> SlothBlendShapes
- Các bạn mở Object sloth_head_blendshapes trên Hierachy, ấn vào Sloth_Head2 -> Ấn Mesh -> chọn Sloth_Head2
- Ở phần material của nó, các bạn kéo các ảnh (bên trong thư mục Textures của SlothCharacter) như sau: 
+ sloth_all_1001_Normal vào Normal Map.
+ sloth_all_1001_AlbedoTransparency vào 
+ sloth_all_1001_MetallicSmoothness vào Metallic.
- Ấn play trên Unity, sau đó xem ở phần Console IP của máy tính hiện tại.

Bước 10: Kết nối Iphone X và Unity.

- Các bạn mở app vừa cài đặt phía trên trên Iphone X.
- Giữ nguyên port, điền ip vừa hiện ra trên Console của Unity vào app.
- Ấn nút connect.

![](https://images.viblo.asia/3175e8ca-09c6-4dc5-93b0-9ea4345a42f9.png)

- Và tận hưởng thành quả thôi nào (dance)

Thật sự là lúc làm bàn đầu mình khá là mò mẫm, tại Unity nó tách 2 cái thành 2 nơi lưu trữ khác nhau, rồi lại còn lỗi khi import vào Unity, nhưng sau đó thì mọi chuyện ổn hơn!

Và mình rất vui khi thấy cái con trên màn hình Unity kia nó có những hành động trên khuôn mặt rất giống mình =)))

Chúc các bạn sẽ có những trải nghiệm thú vị và bước đầu làm quen với ARKit nhé ;)