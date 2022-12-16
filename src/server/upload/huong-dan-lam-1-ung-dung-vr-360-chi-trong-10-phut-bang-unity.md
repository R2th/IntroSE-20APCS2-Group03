**VR (Virtual reality - thực tế ảo)** là tương lai phát triển của nền công nghệ nhân loại nói chung và ngành công nghiệp game nói riêng.<br>
Trong những năm trở lại đây, ngày càng có nhiều game áp dụng công nghệ VR được ra mắt các game thủ với độ hoàn thiện ngày càng cao.
Nắm bắt xu hướng đó, các engine làm game lớn cũng đã đưa ra những hỗ trợ để người dùng có thể tạo ra những game VR của riêng mình một cách dễ dàng, và **Unity3D** cũng không phải ngoại lệ.

Trong bài viết này, tôi sẽ giới thiệu cho các bạn về cách tạo ra một ứng dụng (Android) để xem video 360 bằng công nghệ VR trên Unity chỉ trong vòng 10 phút. Và điều tuyệt vời nhất là bạn sẽ gần như không phải cần phải động đến code :wink: 

## **Đầu tiên, hãy nói về những thứ bạn cần:**
1.  📱 **Một chiếc điện thoại Android** với con quay hồi chuyển để cảm biến chuyển động của đầu, sử dụng hệ điều hành KitKat (4.4) hoặc mới hơn. 

2. 👓 **Một bộ headset** Google Cardboard (hoặc xịn hơn nếu bạn có điều kiện).

3. 🎮 **Unity3D** phiên bản 5.6 hoặc lớn hơn.

4. 📦 **GoogleVR SDK dành cho Unity** mà các bạn có thể download ở [đây](https://developers.google.com/vr/unity/download).

5. 📹 **Một video 360**, có thể tự quay bằng camera 360 hoặc đơn giản là download online.

## **Tạo ra ứng dụng này thế nào?**
### 
Không giống như những video bình thường có dạng hình chữ nhật, video 360 có dạng cầu. Vì vậy đầu tiên chúng ta cần phải tạo một màn hình hình cầu để chiếu video của chúng ta lên. Người xem sẽ được đặt ở vị trí trong khối cầu này và có thể xem video từ bất kỳ hướng nào.

### Bước 1: Tạo một khối cầu 🌐
### 
Trước tiên, hãy tạo một project Unity mới nếu bạn đang bắt đầu từ đầu (hoặc Scene mới nếu bạn muốn tích hợp trình phát video 360 vào project hiện có). Một Scene giống như một cấp độ của trò chơi và 1 project thì như một trò chơi đầy đủ vậy

Sau đó, thêm một ojbect Sphere vào trong trong Scence, đặt ở nó ở tâm (Position = 0, 0, 0), với bán kính 50 (Scale = 50, 50, 50). Vị trí Camera cũng nên được đặt thành 0, 0, 0. Camera là mắt người chơi / người xem, vì vậy bạn sẽ muốn nó ở trung tâm của Sphere. Đặt nó ở nơi khác sẽ làm cho video bị méo.

![](https://images.viblo.asia/993f015d-277a-475a-9df5-99938d92ec05.png)

Khi Camera được đặt bên trong Sphere, bạn sẽ không thấy Sphere trong Scene nữa. Đừng lo lắng, có nguyên nhân cho điều đó! Thật ra hầu hết các game engine không, theo mặc định, hiển thị phần bên trong của các đối tượng 3D. Điều này là do chúng ta hiếm khi cần nhìn thấy chúng, vì thế sẽ rất lãng phí tài nguyên để hiển thị chúng. Chúng ta sẽ sửa nó ở phần sau.

![](https://images.viblo.asia/d8a646bd-e10e-43b0-bdf3-bae7b0f32a29.png)

### Bước 2: Lật ngược đường pháp tuyến của khối cầu 🔄
### 
Chúng ta cần muốn nhìn được bên trong của khối cầu, vậy chúng ta cần phải lộn ngược nó từ trong ra ngoài.

Trong Unity, hình cầu không thực sự là hình cầu, chúng là những đa giác được tạo ra với hàng ngàn mặt nhỏ xíu. Các mặt bên ngoài của có thể được nhìn thấy, nhưng các mặt bên trong thì không. Vì lý do đó, chúng ta sẽ sử dụng một chút code để lật ngược chúng nhanh như cách người yêu cũ của bạn trở mặt vậy :relieved:.

Chúng ta sẽ sử dụng một thứ gọi là Shader, để áp dụng cho Material của Sphere. Material kiểm soát ngoại hình của các Object trong Unity. Và Shader là các script nhỏ tính toán màu của từng pixel được hiển thị, dựa trên ánh sáng và thông tin được lấy từ Material của chúng.

Trước tiên, chúng ta tạo ra một Material mới cho Sphere của mình, rồi thêm một Shader và gán cho Material đó.
![](https://images.viblo.asia/8f436008-4063-47bc-9b17-6c57d9b2b5a8.png)

Chúng ta sẽ cần chỉnh sửa code của Shader này một chút. Đây là phần khá khó khăn vì Shader của Unity được viết bằng một ngôn ngữ đặc biệt gọi là ShaderLab. Nhưng đừng lo, tôi đã giúp các bạn phần việc khó khăn này rồi. Tất cả những gì các bạn cần làm là copy đoạn code dưới đây rồi double click vào Shader của chúng ta để paste nó vào, đơn giản quá phải không nào :wink:.

```
Shader "Flipping Normals" {
    Properties {
        _MainTex ("Base (RGB)", 2D) = "white" {}
    }
    SubShader {

        Tags { "RenderType" = "Opaque" }

        Cull Off

        CGPROGRAM

        #pragma surface surf Lambert vertex:vert
        sampler2D _MainTex;

        struct Input {
            float2 uv_MainTex;
            float4 color : COLOR;
        };

        void vert(inout appdata_full v) {
            v.normal.xyz = v.normal * -1;
        }

        void surf (Input IN, inout SurfaceOutput o) {
             fixed3 result = tex2D(_MainTex, IN.uv_MainTex);
             o.Albedo = result.rgb;
             o.Alpha = 1;
        }

        ENDCG

    }

      Fallback "Diffuse"
}
```

Shader này sẽ lộn ngược từng pixel của Sphere từ trong ra ngoài, vì vậy giờ Sphere của chúng ta có dạng giống như một quả bóng lớn được nhìn từ trong ra. Bước tiếp theo là biến quả bóng này thành một màn chiếu video, và nhớ là phải áp dụng Shader này cho Material của Sphere đấy nhé.

![](https://images.viblo.asia/b1412178-054c-44dd-9d88-bfae1146f59e.png)

### Bước 3: Chiếu video 360 vào trong Sphere 📽
### 
Import video 360 bạn đã download vào trong project, sau đó kéo nó và thả vào Sphere của chúng ta. Và trong một nốt nhạc, Sphere đã có thêm một thành phần Video player còn video thì đã sẵn sàng để chạy.
![](https://images.viblo.asia/70171bee-218c-48fc-b29a-b989b5bc02c6.png)

Bạn có thể thêm những cài đặt khác vào video như là loop, hoặc thậm chí streaming nó.

### Bước 4: Cài đặt Google Cardboard 📦
### 
Ở bước này, chúng ta sẽ làm cho ứng dụng của mình màu mè một chút khi xem nó trên một headset VR, ví dụ như Google Cardboard. Chúng ta sẽ tạo ra một dạng view lập thể với hiệu ứng mắt cá (mỗi bên mắt sẽ thấy một cảnh khác nhau) sử dụng GoogleVR SDK.

Đầu tiên, hãy thêm GoogleVR SDK vào project của chúng ta giống như với một unity package bình thường, sau đó chúng ta sẽ chơi đùa với phần setting cho android một chút.

Kiểm tra ở File > Build Settings của bạn xem platform chúng ta build đã phải là Android chưa. Nếu chưa thì  hãy dùng Switch Platform để chuyển sang Android, quá trình này có thể mất một vài phút.

Bước tiếp theo là bấm vào Player Settings và thực hiện những thay đổi sau:

1. Mở mục XR Settings, check vào check box Virtual Reality Supported. Rồi dùng nút + để chọn Cardboard.
2. Nhập tên package vào trường Bundle Identifier (ví dụ như com.yourdomain.demo360).
3. Mở dropdown chọn Minimum API Level và chọn Android 4.4 ‘Kit Kat’ (API level 19).

![](https://images.viblo.asia/2e10abf3-3119-48aa-acc3-689868f59a03.png)

Cuối cùng chỉ cần vào thư mục GoogleVR\Prefabs và kéo prefab GvrEditorEmulator vào Scene của mình là ứng dụng của bạn đã sẵn sàng để chạy.

### Bước 5: Build và chạy app📲
### 
Các bạn có thể chạy ứng dụng trong emulator của Unity để test trước rồi build ra máy sau.
![](https://images.viblo.asia/90d6871f-7557-4cf9-87a0-a868aee3dd43.png)

Cách build thì cũng giống như với mọi app khác build trên Unity nên tôi sẽ bỏ qua phần này và đến thẳng với...

## Lời kết 
Ứng dụng được giới thiệu trong bài viết này chỉ là một ứng dụng rất đơn giản, nhưng tôi hy vọng nó đã có thể giúp các bạn tiếp cận gần hơn một chút với công nghệ VR và cách xử lý nó trong môi trường Unity. Unity là một công cụ rất mạnh, có thể hỗ trợ bạn tạo ra những game hay ứng dụng phức tạp hơn ứng dụng được giới thiệu ở bài viết rất nhiều. Bạn có thể tạo ra một môi trường 3D hoàn toàn và cho phép người chơi di chuyển trong đó, hoặc thêm những hiệu ứng thật ngầu vào video 3D của bạn bằng hiệu ứng Particles effect của Unity... Có vô số các khả năng, và giới hạn duy nhất chính là trí tưởng tượng của các bạn :thumbsup: