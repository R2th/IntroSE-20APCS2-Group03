##### Chào các bạn lại là mình đây :D. Hôm nay chúng ta cùng tìm hiểu về một chủ đề theo mình nghĩ là tương đối mới và thú vị đó là sự kết hợp giữa ứng dùng React với Aframe. Mình cùng bắt đầu :100:

# 1. Chuẩn bị
#### Yêu cầu:
- Môi trường mình sẽ sử dụng
  - MacOs Catalina v10.15.3
  - Node v12.17.0
  - Yarn v1.22.4
  - VSCode v1.45.1

#### Mục đích:
- Có cái nhìn cơ bản về Aframe
- Kết hợp React với Aframe

#### Những phần bỏ qua:
-  Trong quá trình chúng ta thực hiện thì mình sẽ lượt bớt (không giải thích những thuật ngữ và các lệnh cơ bản).

# 2. Tiến hành
## Aframe là gì ?
Là một `web framework` để xây dựng trải nghiêm thực tế ảo (VR). Gồm hệ thống các `component` và `primitive element` (dùng polyfill để tuỳ chỉnh các element vì vậy ta có thể sử dụng cùng một cách như HTML tag).
[Chi tiết](https://aframe.io/docs/1.0.0/introduction/#what-is-a-frame)

Phần mình chú trọng trong bài viết này là demo để hiểu hơn nên phần lý thuyết các bạn có thể tìm hiểu nhiều hơn ở [trang chủ](https://aframe.io/) nhé.
## Xây dựng bộ cấu trúc project để demo
#### 1. Cấu hình react app
Phần này các bạn có thể tham khảo trong repo nhé.

#### 2. Sử dụng aframe
Cài đặt
```bash
yarn add aframe
```

Thêm nó vào file `app.jsx` để có thể sử dụng các component và primitive element nhé
```js
import 'aframe'
```

#### 3. Sử dụng https
Ở đây mình sẽ dùng `webpack-dev-server`, vì vậy để sử dụng `https` thì chỉ cần bật flag `https`

```bash
devServer: {
 https: true,
}
```

hoặc thêm vào lệnh chạy
```bash
yarn webpack-dev-server --https
```

## Demo
#### 1. Cơ bản 

```jsx
const Example = () => {
  return (
    <a-scene>
      <a-box position="0 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  )
}
```

`a-scene` đại diện cho một `scene`  sử dụng như một root element bao bọc tất cả các thực thể khác.
`a-box, a-plane, a-sky` các bạn có thể đọc thêm nhé

component `position` nhận tham số với thứ tự lần lượt là `x y z` tương ứng trong hệ trục toạ độ không gian 3D

component `rotation` nhận tham số với thứ tự lần lượt là `x y z` và được tính bằng độ dùng để xoay thực thể theo phương tương ứng

Note: các attribute được gọi là component trong aframe

Kết quả
![Demo](https://images.viblo.asia/a6494b7a-397a-4bf2-9411-88674315a059.png)

Thử thay đổi các thông số để thấy sự khác biệt

#### 2. Các thực thể lồng nhau

```jsx
const Example = () => {
  return (
    <a-scene>
      <a-box position="0 0.5 -3" rotation="0 45 0" color="#4CC3D9">
        <a-cylinder position="0 0.5 0" radius="0.5" height="2" color="#FFC65D" shadow></a-cylinder>
      </a-box>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  )
}
```

Cho thực thể `cylinder` bên trong `box`

Kết quả
![Demo](https://images.viblo.asia/aee80755-6917-4a4b-a613-5dd081e3a3ae.png)

#### 3. Hiện thị một file dạng 3D

Ở đây mình sẽ chuẩn bị sẵn 1 folder file chứa file 3D và các file liên quan với nó dưới thư mục `public/models`

```jsx
const Example = () => {
  return (
    <a-scene>
      <a-entity
        gltf-model="url(/models/dragonite/scene.gltf)"
        position="0 0 -10"
        scale="0.02 0.02 0.02"
      ></a-entity>
    </a-scene>
  )
}
```

Note: Trong `Aframe` thì mọi element đều được xây dựng dựa trên `a-entity`

Kết quả
![](https://images.viblo.asia/c2368bb9-0fa1-4479-99cc-a18d854f972f.png)


Điều chỉnh cho thực thể nghiên 1 tí bằng cách dùng component `rotation`

```jsx
const Example = () => {
  return (
    <a-scene>
      <a-entity
        gltf-model="url(/models/dragonite/scene.gltf)"
        position="0 0 -10"
        scale="0.02 0.02 0.02"
        rotation="0 45 0"
      ></a-entity>
    </a-scene>
  )
}
```

Kết quả
![](https://images.viblo.asia/8e398aae-67ee-4e56-b6bc-a44f1e76ca1a.png)

#### 4. Tương tác với thực thể

Ngoài ra chúng ta cũng cần hiểu là các thực thể được gắn trên DOM và ta có thể thay đổi các thuộc tính của nó nhưng về bản chất là tương tác với `canvas` (gắn liền bên trong `a-scene` và được cập nhật một cách tự động)

Để có thể thao tác với các entity ta cần đăng kí các `component` đến `Aframe` thông qua static method `registerComponent`

Ngoài ra sẽ sử dụng 2 thực thể `camera` và `cursor` để giả lập việc chúng ta đang nhắm vào thực thể đó

```jsx
const Example = () => {
  React.useLayoutEffect(() => {
    AFRAME.registerComponent('event-click', {
      init() {
        this.el.addEventListener('click', () => {
          alert('clicked')
        })
      },
    })
  }, [])

  return (
    <a-scene>
      <a-entity
        gltf-model="url(/models/dragonite/scene.gltf)"
        position="3 0 -10"
        scale="0.02 0.02 0.02"
        event-click
      ></a-entity>
      <a-camera>
        <a-cursor></a-cursor>
      </a-camera>
    </a-scene>
  )
}
```

Kết quả
![](https://images.viblo.asia/340ed3b8-85dd-48ce-9846-1aa20e3a15c5.png)

# 3. Kết luận
Hi vọng qua bài viết này sẽ giúp các bạn có cái nhìn cơ bản về sự kết hợp thú vị này và phần nào đó giúp chúng ta hình dùng sẽ làm được gì với chúng.

Vì đây chỉ là một vài ví dụ cơ bản cực kì nhỏ của thể giới `Aframe` nên chúng ta còn rất nhiều điều phải tìm hiểu.

Cảm ơn đã đọc bài viết này :clap:

[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/react-aframe)