# I. Giới thiệu# 
### 1. VR & AR là gì? ###

AR (Augmented Reality – Thực tế tăng cường) và VR (Virtual Reality – Thực tế ảo) là hai khái niệm đang thực sự thay đổi thế giới theo đúng nghĩa đen.

Hai khái niệm này hoàn toàn khác nhau về bản chất nhưng đôi khi nó cũng bổ xung cho nhau. AR có thể tạo ra VR và VR cũng có thể tạo ngược lại AR. Hai công nghệ này phát triển rất nhanh, khởi đầu là những thiết bị phần cứng nổi tiếng trong lĩnh vực VR như Oculus Rift, AR thì khởi đầu với ứng dụng game nổi tiếng Pokémon Go từng làm sốt thế giới đến mức phải bị cấm

VR - Thực tế ảo là một định nghĩa về những ứng dụng có khả năng đưa chúng ta vào một thế giới khác và mọi thứ trong thế giới đó hoàn toàn ảo. Khi bước vào thế giới ảo được tạo ra từ ứng dụng VR, chúng ta sẽ không còn thấy những gì ở thế giới thực nữa, tất nhiên chúng ta vẫn đang đứng trong thế giới thực.

AR - Nếu Thực tế ảo (VR) tập trung người trải nghiệm vào một thế giới ảo khác hoàn toàn để mang lại những điều khác lạ từ mọi nơi trên và ngoài hành tinh thì Thực tế tăng cường (AR) lại kết hợp cả thế giới thật và thế giới ảo lại làm một. AR biến thế giới thật trở nên tốt hơn nhờ tăng cường thêm những vật thể ảo. (Pokemon Go chắc chắn là 1 ví dụ dễ hình dung nhất ;) ).

Vậy AR & VR có thể làm được những gì?? Đây là 1 số ý tưởng mình có nghĩ tới :) :

   - Lựa chọn màu sơn cho ngôi nhà của mình chỉ bằng 1 vài kéo thả và 1 chiếc camera.
   - Hay lựa chọn đồ nội thất phù hợp với vị trí nhà trước khi thật sự đi mua.
   - Cũng có thể sử dụng để mặc thử những bộ quần áo bạn thích ...
   
   
 ### 2. Viro Media là gì???###
 Ở đây trong bài viết này mình sẽ buil app với Viro media, vậy nó là gì ???
 
 Viro Media gồm có viroReact và viroCore, là nền tảng để phát triển ứng dụng AR và VR. viroReact được sử dụng với React Native. viroCore được sử dụng với Unity.
 
 https://viromedia.com/
 
 # II. Xây dựng 1 App kết hợp React Native với Viro Media
 
 ### 1. Chuẩn bị
 - Các bạn tải App Viro Media trên App Store(iOS) hoặc Play Store(Android) nhá, đây là 1 App của Viro Media chuyên thực hiện cho việc test app thông qua 1 địa chỉ ngrok. Ngrok là gì bạn có thể tham khảo qua bài viết này nhá: https://medium.com/12bit/c%C3%B4ng-khai-localhost-l%C3%AAn-internet-b%E1%BA%B1ng-ngrok-c0677b6387f0
 - React Native Cli
 - React viro Cli
 - Và 1 chút kiến thức về React/React Native
 
 ### 2. Xây dựng
 Đầu tiên ta cần init 1 App, các bạn làm theo mình nhá:
 
 - `react-viro init MyNewProject`

sau đó các bạn cd vào project của mình và chạy:

- `yarn install & react-native link`
- Sau đó là start nó lên thôi : `yarn start`
- Khi các bạn start thành công sẽ xuất hiện 1 ngrok các bạn copy đoạn mã đó và mở App Viro Media như mình có đề cập phía trên và tìm đến phần `Enter Testbed` các bạn chọn nó và nhập mã ngrok vào nhá.

![](https://images.viblo.asia/b64ae4d8-185a-458a-b5cd-0126a2220136.jpg)

   
   Sau khi đã xong các bạn cần phải đăng ký 1 api cho app của bạn, các bạn vào đây đăng ký nhá: https://viromedia.com/signup
    
   
   Sau khi đã đăng ký xong mã sẽ được chuyển vào email của bạn các bạn mở mail lên và copy đoạn mã đó và tìm đến file App.js và paste nó vào nhá.
![](https://images.viblo.asia/95e256a4-5d1e-49c0-befa-803290a144d9.png)

Chúc các bạn chạy được thành công, nếu vướng chỗ nào thì cứ comment nhá :D mình sẽ support khi nào chạy được thì thôi
    
   Bạn cũng có thể clone app của mình trên github về và chạy thử, ở đây mình có cho chạy video trên VR và Animation, PlankSelector trên AR, các bạn clone về tham khảo nhá!!!
    
   https://github.com/longnk1301/viroEx