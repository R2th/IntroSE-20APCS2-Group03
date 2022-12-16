## Giới thiệu

UIWidgets là một gói plugin dành cho Unity Editor, giúp các nhà phát triển tạo, debug và triển khai các Ứng dụng đa nền tảng, hiệu quả bằng Unity Engine.

UIWidgets chủ yếu bắt nguồn từ Flutter. Tuy nhiên, tận dụng lợi thế của Unity Engine mạnh mẽ, nó cung cấp cho các nhà phát triển nhiều tính năng mới để cải thiện đáng kể Ứng dụng của họ cũng như phát triển quy trình làm việc.

Là phiên bản mới nhất, UIWidgets 2.0 nhằm mục đích tối ưu hóa hiệu suất tổng thể của gói. Cụ thể, mức tăng hiệu suất khoảng 10% được quan sát thấy trên các thiết bị di động như iPhone 6 sau khi nâng cấp lên UIWidgets 2.0.

### Hiệu năng

Sử dụng các phiên bản Unity mới nhất thì Ứng dụng UIWidgets có thể chạy rất nhanh và giữ > 60fps trong hầu hết thời gian.

### Đa nền tảng

Ứng dụng UIWidgets có thể được triển khai trực tiếp trên tất cả các loại nền tảng bao gồm PC và thiết bị di động, giống như bất kỳ dự án Unity nào khác.

### Hỗ trợ đa phương tiện

Ngoại trừ giao diện người dùng 2D cơ bản, các nhà phát triển cũng có thể đưa Mô hình 3D, âm thanh, hệ thống hạt vào Ứng dụng UIWidgets của họ.

### Thân thiện với nhà phát triển

Ứng dụng UIWidgets có thể được gỡ lỗi trực tiếp trong Unity Editor bằng nhiều công cụ nâng cao như Cấu hình CPU / GPU, Cấu hình FPS.

## Yêu cầu

### Unity

Các phiên bản Unity tương thích cho mỗi bản phát hành UIWidgets được liệt kê bên dưới. Bạn có thể tải xuống Unity mới nhất trên https://unity.cn/releases.

| UIWidgets version | Unity 2019 LTS | Unity 2020 LTS |
| ----------- | ----------- | ----------- |
| 1.5.4 and below | 2019.4.10f1 and above | N\A |
| 2.0.1 | 2019.4.26f1c1 | N\A |
| 2.0.2 and above | 2019.4.26f1c1 and above | N\A |

### UIWidgets Package

Truy cập kho lưu trữ Github của chúng tôi https://github.com/Unity-Technologies/com.unity.uiwidgets để tải xuống gói UIWidgets mới nhất.

Di chuyển thư mục gói đã tải xuống vào thư mục Gói của dự án Unity của bạn.

Nói chung, bạn có thể thực hiện nó bằng ứng dụng bảng điều khiển (hoặc thiết bị đầu cuối) chỉ bằng một số lệnh như sau:

```
 cd <YourPackagePath>
 git clone https://github.com/Unity-Technologies/com.unity.uiwidgets.git com.unity.uiwidgets
```

Trong quản lý package của Unity, chọn thêm tệp cục bộ. chọn package.json trong /com.unity.uiwidgets

### Môi trường thực thi

Hiện tại UIWidgets chỉ hỗ trợ MacOS (Metal), iOS (Metal), Android (Armv7, OpenGLes) và Windows (Direct3D11). Sẽ có nhiều thiết bị hơn được hỗ trợ trong tương lai.

## Bắt đầu

### Tổng quát

Trong hướng dẫn này, chúng tôi sẽ tạo một Ứng dụng UIWidgets rất đơn giản để bắt đầu. Ứng dụng này chỉ chứa một label và một button. Label sẽ hiển thị số lần nhấp vào button.

Trước hết, hãy mở hoặc tạo một Dự án Unity và mở nó bằng Unity Editor.

### Scene Build

Ứng dụng UIWidgets thường được xây dựng dựa trên Unity UI Canvas. Vui lòng làm theo các bước để tạo UI Canvas trong Unity.

* Create a new Scene by "File -> New Scene";
* Create a UI Canvas in the scene by "GameObject -> UI -> Canvas";
* Add a Panel (i.e., Panel 1) to the UI Canvas by right click on the Canvas and select "UI -> Panel". Then remove the Image Component from the Panel.

### Tạo Widget

Ứng dụng UIWidgets được viết bằng C# Scripts. Vui lòng làm theo các bước để tạo một Ứng dụng và chạy nó trong Unity Editor.

1. Tạo Tập lệnh C # mới có tên "UIWidgetsExample.cs" và dán các mã sau vào đó.
```
using System.Collections.Generic;
 using uiwidgets;
 using Unity.UIWidgets.cupertino;
 using Unity.UIWidgets.engine;
 using Unity.UIWidgets.ui;
 using Unity.UIWidgets.widgets;
 using Text = Unity.UIWidgets.widgets.Text;
 using ui_ = Unity.UIWidgets.widgets.ui_;
 using TextStyle = Unity.UIWidgets.painting.TextStyle;

 namespace UIWidgetsSample
 {
     public class CountDemo : UIWidgetsPanel
     {
         protected void OnEnable()
         {
             // if you want to use your own font or font icons.
                 // AddFont("Material Icons", new List<string> {"MaterialIcons-Regular.ttf"}, new List<int> {0});
             base.OnEnable();
         }

         protected override void main()
         {
             ui_.runApp(new MyApp());
         }

         class MyApp : StatelessWidget
         {
             public override Widget build(BuildContext context)
             {
                 return new CupertinoApp(
                     home: new CounterApp()
                 );
             }
         }
     }

     internal class CounterApp : StatefulWidget
     {
         public override State createState()
         {
             return new CountDemoState();
         }
     }

     internal class CountDemoState : State<CounterApp>
     {
         private int count = 0;

         public override Widget build(BuildContext context)
         {
             return new Container(
                 color: Color.fromARGB(255, 255, 0, 0),
                 child: new Column(children: new List<Widget>()
                     {
                         new Text($"count: {count}", style: new TextStyle(color: Color.fromARGB(255, 0 ,0 ,255))),
                         new CupertinoButton(
                             onPressed: () =>
                             {
                                 setState(() =>
                                 {
                                     count++;
                                 });
                             },
                             child: new Container(
                                 color: Color.fromARGB(255,0 , 255, 0),
                                 width: 100,
                                 height: 40
                             )
                         ),
                     }
                 )
             );
         }
     }
 }
```

2. Lưu tập lệnh này và đính kèm nó vào Panel 1 làm thành phần của nó.
3. Nhấn nút "Play" để khởi động Ứng dụng trong Unity Editor.

### Debug ứng dụng UIWidgets

Trong Editor, bạn có thể chuyển đổi chế độ debug/release bằng cách “UIWidgets-> EnableDebug”.

![](https://images.viblo.asia/a5527dac-7f7b-4b7f-aeee-c99d67c93ca9.png)

Trong Player, bản dựng debug/development sẽ bật chế độ debug. Bản release sẽ tự động tắt chế độ debug.

### Phân tích hiệu suất

Các ứng dụng UIWidgets có thể được debug trực tiếp trong trình chỉnh sửa Unity bằng cách sử dụng các công cụ nâng cao khác nhau, chẳng hạn như phân tích CPU / GPU, phân tích FPS, v.v.

![](https://images.viblo.asia/5b74c7c1-80b9-44ce-9c2b-03f0b87fc586.png)

### Build App

Cuối cùng, Ứng dụng UIWidgets có thể được xây dựng thành các gói cho bất kỳ nền tảng cụ thể nào bằng các bước sau.

1. Mở Bảng cài đặt bản dựng bằng cách "File -> Build Settings..."
2. Chọn một nền tảng mục tiêu và nhấp vào "Build". Sau đó, Unity Editor sẽ tự động tập hợp tất cả các tài nguyên có liên quan và tạo gói Ứng dụng cuối cùng.

![](https://images.viblo.asia/a2f96039-1d5e-4463-8291-5153256e19cf.png)

Các resource có thể tham khoả thêm về UIWidgets:
* UIWidgetsSamples: https://github.com/Unity-Technologies/com.unity.uiwidgets
* awesome-UIWidgets: https://github.com/liangxiegame/awesome-uiwidgets