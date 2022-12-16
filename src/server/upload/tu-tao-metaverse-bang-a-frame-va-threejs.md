> Như tiêu đề - Đây là một tutorial tạo metaverse

### Overview
* Mình sử dụng a-frame - một  web framework để tạo các ứng dụng VR.
* Docs offical của a-frame thì đọc ở đây: https://aframe.io/docs/1.3.0/introduction/ 
* Tổng quan thì docs của a-frame hơi ít. Nhưng hên là a-frame build on top of three.js nên anh em đọc bên three.js apply sang cũng được 
* Kết quả sau tutorial part 1 này:

![Alt Text](https://media.giphy.com/media/dpGYT6eUS8b58XLahs/giphy.gif)

### Tạo file 
Đầu tiên tạo một file Html
```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.1.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
    </a-scene>
  </body>
</html>
```
Explain:
* Chúng ta thêm cặp  `<script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>` để import aframe 
* Trong body - thêm cặp <a-scene></a-scene> <-- code của mình sẽ nằm trong cặp này

### Thêm model
* Lên sketchfab mua 1 model - ở đây mình lấy tạm model https://sketchfab.com/3d-models/simplepoly-city-low-poly-assets-d1e9d4d0f7054c8ba36eb1a4fc41aca0 
* Tạo một thư mục assets ở root - paste đống model vừa tải về vào
* Cấu trúc thư mục trông sẽ như thế này
* ![image.png](https://images.viblo.asia/1a687d6b-0abb-4088-9fb3-75928c2a14d0.png)
* Để load model chúng ta thêm <a-gltf-model src="path/to/model.gltf"></a-gltf-model>
* Nhưng thông thường để quản lý các model dễ hơn thì mình sẽ cho đường dẫn các model vào giữa cặp <a-assets></a-assets> sau đó gọi ra để sử  dụng 
Example:
```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.1.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-assets>
         <a-asset-item id="city" src="./assets/city.gltf"></a-asset-item>
      </a-assets>
      <a-gltf-model src="#city"></a-gltf-model>
    </a-scene>
  </body>
</html>
```
Bây giờ nó sẽ trông như thế này

![image.png](https://images.viblo.asia/e357815e-2a27-4bb3-8877-e8b66eeceb59.png)
### Transform model

```sql
<a-scene>
  <a-box color="red" rotation="0 45 45" scale="2 2 2"></a-box>
</a-scene>
```
* Để xoay: rotation ="x y z"
* Để scale: scale= "x y z"

### Thêm background cảnh môi trường xung quanh
* Để thêm background các bạn thêm cặp a-sky - param của nó thì có thể là màu sắc (color="#HEX") hoặc ảnh, video,...

```sql
<a-scene>
  <a-sky src="./assets/cloud.jpg"></a-sky>
</a-scene>
```

![image.png](https://images.viblo.asia/58ad9f67-2413-4263-8dab-a2a1662802b5.png)

### Thêm mặt đất
* Để thêm mặt đất dùng cặp a-plane
```sql
<a-plane rotation="-90 0 0"></a-plane>
```

### Chỉnh camera để góc nhìn ngang tầm mắt người
* Trong trường hợp mình không config camera thì aframe sẽ tự lấy config a-camera mặc định của nó - để config thì thêm cặp <a-camera></a-camera> là được
* Code bây giờ sẽ như sau
```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.1.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-assets>
         <a-asset-item id="city" src="./assets/scene.gltf"></a-asset-item>
      </a-assets>
      <a-gltf-model src="#city"></a-gltf-model>

      <a-plane rotation="-90 0 0"></a-plane>
      <a-sky src="./assets/cloud.jpg"></a-sky>
      <a-camera position="0 0.2 0"></a-camera>
    </a-scene>
  </body>
</html>
```

![image.png](https://images.viblo.asia/8ab307e9-ada7-4f30-892b-952025273b58.png)

### Deploy bằng github pages
![image.png](https://images.viblo.asia/b06419bf-d86b-41ec-bc5f-c49f7d2de1e3.png)

Vào setting -> pages -> deploy from branch -> main -> save

Thành quả tạm thời: https://cuongpo.github.io/metaverse-tutorial/ 

> Hôm nay tạm đến đây đã - tôi phải về rửa bát đây - Bye các ông

### Upcoming features:
* Collide
* Multiplayer
* Chat