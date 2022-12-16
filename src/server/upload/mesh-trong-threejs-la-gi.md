##### Chào các bạn lại là mình đây :D. Mình đang chìm đắm trong thế giới của `Three.js`, nó khiến mình cảm thấy thật thú vị và có rất rất nhiều thứ cực kì hay ho để khám phá vậy nên hôm nay chúng ta cùng tìm hiểu một thành phần cực kì quan trọng trong `Three.js` đó là `Mesh` nhé :wink:
# 1. Chuẩn bị
#### Yêu cầu:
- Môi trường mình sẽ sử dụng
  - Window 10
  - Node v12.14.0
  - Yarn v1.22.4
  - VSCode v1.47.2

#### Mục đích:
- Hiểu `Mesh` là gì

# 2. Tiến hành
## `Mesh` trong `Three.js` là gì ?
Về định nghĩa chỉ đơn giản như sau
> Trong thế giới Three.js, yếu tố hình ảnh cơ bản nhất trong một scene là Mesh. Đây là một vật thể 3D được tạo từ các đa giác tam giác, nó được xây dựng bằng hai đối tượng khác là
>
>  `Geometry` xác định hình dạng của vật thể
>
>  `Material` xác định bề ngoài của vật thể (color, emissive, etc.)

Tiếp đến ta cùng tìm hiểu `Geometry, Material` cụ thể là nó như thế nào ?

## Geometry
Trong `three.js` bạn có thể sử dụng một số dạng `geometry` có sẵn hoặc có thể `import` từ 1 file.

Lần lượt đi qua một vài hình dạng 3D đơn giản

1. `Box`

```js
const geometry = new THREE.BoxGeometry( 20, 20, 20 );
```

![](https://images.viblo.asia/29ef97a0-7880-4084-8df8-9d88e24c2387.PNG)

2. `Sphere`

```js
const geometry = new THREE.SphereGeometry( 20, 64, 64 );
```

![](https://images.viblo.asia/339c4786-bd2f-4497-beed-546e7a8c2c31.PNG)

3. Một hình dạng phức tạp hơn `TorusKnot` được tích hợp sẵn trong `Three.js`

```js
const geometry = new THREE.TorusKnotGeometry(10, 1.3, 500, 6, 6, 20);
```

![](https://images.viblo.asia/1ddd407d-79a4-45d9-9cd7-39cf1c29b4bc.PNG)

Ngoài ra còn có rất nhiều dạng hình học 3D khác bạn có thể tham khảo thêm ở [trang chủ](https://threejs.org/docs/index.html) mục `Geometries`

## Material
Trong khi `Geometry` xác định hình dạng của vật thể 3D thì `Material` xác định tất cả những thứ còn lại của vật thể đó.
Cũng tương tự `Geometry` thì `Material` cũng được tích hợp sẵn rất nhiều loại khác nhau trong `Three.js`

Cùng điểm qua một số loại thường được sử dụng

1. `MeshBasicMaterial`

Hữu dụng khi muốn vật thể dưới dạng `wireframe`

```js
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0xdaa520,
})
```

![](https://images.viblo.asia/c82674a5-a789-488f-8e16-66cc544758c8.PNG)

2. `MeshLambertMaterial`

Hữu dụng khi muốn vật thể hiển thị với hiệu suất cao nhưng độ chính xác thấp

```js
const material = new THREE.MeshLambertMaterial({
  color: 0xdaa520,
  emissive: 0x111111,
})
```

![](https://images.viblo.asia/f94ad1a1-8788-442b-96cd-f18b3969458a.PNG)

3. `MeshPhongMaterial`

Hữu dụng khi muốn vật thể hiển thị với hiệu suất và độ chính xác trung bình

```js
const material = new THREE.MeshPhongMaterial({
  color: 0xdaa520,
  emissive: 0x000000,
  specular: 0xbcbcbc,
})
```

![](https://images.viblo.asia/adefb122-140e-4b83-8cab-f4b1bb4d11ad.PNG)

4. `MeshStandardMaterial`

Hữu dụng khi muốn vật thể hiển thị với hiệu suất thấp nhưng độ chính xác cao

```js
    const material = new THREE.MeshStandardMaterial({
      color: 0xfcc742,
      emissive: 0x111111,
      specular: 0xffffff,
      metalness: 1,
      roughness: 0.55,
    })
```

![](https://images.viblo.asia/1ea79942-b7d2-40d9-a3ff-10d2d22858b1.PNG)

Ngoài ra còn có rất nhiều dạng `material` khác bạn có thể tham khảo thêm ở [trang chủ](https://threejs.org/docs/index.html) mục `Materials`

# 3. Kết luận
Các bạn có thấy thú vị không ? riêng mình thì chắc chắn đây sẽ là một sự lựa chọn tuyệt vời để làm những thứ hay ho hơn nữa trong tương lai gần.

Hi vòng qua một vài ví dụ cực kì cơ bản để chúng ta có thể hình dung sơ qua được `Mesh` là gì và xa hơn là `Three.js` làm được những gì. 

Cảm ơn đã đọc bài viết này :clap:

[repo here](https://github.com/daint2git/viblo.asia/tree/master/threejs-1)