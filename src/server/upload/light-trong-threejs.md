Ở thế giới thật, các tia sáng có thể chiếu thẳng trực tiếp vào đối tượng, hoặc có thể va chạm vào các bề mặt khác nhau và phản xạ hoặc khuếch tán trước khi chạm vào đối tượng. Tuy nhiên, các máy tính hiện nay không thể có đủ sức mạnh để mô phỏng toàn bộ việc này ở real-time. Các model, thuật toán chỉ có thể mô phỏng gần giống nhất, chấp nhận được trong từng trường hợp cụ thể.

Three.js có các kiểu Light (nguồn sáng) sau:

- AmbientLight
- HemisphereLight
- DirectionalLight
- PointLight
- SpotLight
- RectAreaLight

Các kiểu Light khác nhau sẽ tạo ra các hiệu ứng khác nhau.

![Light types](https://static.lockex1987.com/learn-threejs/images/light-types.png)

Chúng ta sẽ tạo một cảnh gồm một hình lập phương, một hình cầu, và một mặt phẳng. Chúng ta chỉ sử dụng các kiến thức đã học ở các bài trước để xây dựng cảnh. Các đối tượng đều sử dụng MeshStandardMaterial. Chúng ta chưa động gì đến Light. Cảnh của chúng ta sẽ hiển thị ra như sau:

![No Light](https://static.lockex1987.com/learn-threejs/images/light-none.png)

Chúng ta có thể thấy các đối tượng chỉ là các khối màu đen, mặc dù chúng ta đã truyền thuộc tính `color` cho MeshStandardMaterial.

### AmbientLight

Đây là nguồn sáng cơ bản. Màu sắc của nó được áp dụng toàn cục, kết hợp với màu của đối tượng. Với nguồn sáng này, các tia sáng sẽ không có hướng, không tạo bóng. Mọi đối tượng đều bị tác động bởi nguồn sáng này như nhau, bất chấp vị trí, hình dáng của đối tượng. Bạn sẽ thường không chỉ sử dụng mỗi một AmbientLight mà sẽ kết hợp với nó với loại khác như SpotLight, DirectionalLight,...

AmbientLight có hai thuộc tính quan trọng là:

- `color`: màu sắc của nguồn sáng.
- `intensity`: cường độ sáng.

Hai thuộc tính trên là hai thuộc tính của base class Light. Tất cả các loại nguồn sáng khác cũng đều có hai thuộc tính này. Mặt khác, class Light lại extend từ class Object3D nên tất cả nguồn sáng đều có các thuộc tính như `position`, `visible`,... Chúng ta cần thêm các nguồn sáng vào cảnh một cách tường minh: `scene.add(light)`. Chúng ta không cần phải chỉ định vị trí của AmbientLight.

```javascript
const color = 0xd2d2d2;
const intensity = 1;
const ambientLight = new AmbientLight(color, intensity);
```

[Ví dụ  Ambient Light](https://static.lockex1987.com/learn-threejs/chapter-05/05-01-lights.html#Ambient)

![Ambient Light](https://static.lockex1987.com/learn-threejs/images/light-ambient.png)

Wow, giờ chúng ta đã có thể hình thấy các đối tượng trong cảnh. Tuy nhiên, màu của các đối tượng trông flat, không có cảm giác về độ sâu, không được chân thực.

### HemisphereLight

Đây là nguồn sáng đặc biệt và có thể được sử dụng để tạo các ngoại cảnh trông tự nhiên hơn bằng cách mô phỏng ánh sáng mạnh từ bầu trời và ánh sáng phản xạ nhẹ hơn từ mặt đất. Màu của một điểm trên đối tượng sẽ được nhân với màu từ bầu trời nếu vector pháp tuyến tại điểm đó hướng lên trên; màu sẽ được nhân với màu từ mặt đất nếu vector pháp tuyến hướng xuống dưới.

HemisphereLight cũng có các thuộc tính `color`, `intensity` như AmbientLight, ngoài ra còn có:

- `groundColor`: màu sắc chiếu từ dưới lên (màu từ mặt đất).

Thuộc tính `color` là màu sắc chiếu từ phía trên xuống (màu từ bầu trời).

```javascript
const skyColor = 0xf0e424;
const groundColor = 0xd41384;
const intensity = 0.6;
const hemisphereLight = new HemisphereLight(skyColor, groundColor, intensity);
```

[Ví dụ Hemisphere Light](https://static.lockex1987.com/learn-threejs/chapter-05/05-01-lights.html#Hemisphere)

![Hemisphere Light Sky](https://static.lockex1987.com/learn-threejs/images/light-hemisphere-sky.png)

![Hemisphere Light Ground](https://static.lockex1987.com/learn-threejs/images/light-hemisphere-ground.png)

Cũng như AmbientLight, màu sắc của các đối tượng với HemisphereLight trông flat.

### DirectionalLight

Đây là nguồn sáng mà các tia sáng chiếu song song theo một chiều, ví dụ như ánh sáng mặt trời. Sự khác nhau lớn nhất giữa DirectionalLight và SpotLight hay PointLight là tia sáng sẽ không bị giảm cường độ nếu khoảng cách từ nguồn sáng và đối tượng là xa. Toàn bộ không gian được DirectionalLight chiếu với cùng một cường độ.

DirectionalLight có các thuộc tính:

- `castShadow`: có tạo bóng hay không.
- `target`: đích của tia sáng.

Hướng của các tia sáng sẽ đi từ `directionalLight.position` đến `directionalLight.target.position`. Chú ý chúng ta phải thêm cả `directionalLight` và `directionalLight.target` vào cảnh.

```javascript
const color = 0xeeeeee;
const directionalLight = new DirectionalLight(color);
directionalLight.intensity = 1.5;
directionalLight.castShadow = true;
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);

scene.add(directionalLight);
scene.add(directionalLight.target);
```

Three.js có nhiều các đối tượng Helper mà chúng ta có thể thêm vào cảnh để hỗ trợ hiển thị các phần nhìn được, giúp chúng ta rõ hình dung hơn. Trong trường hợp này, chúng ta có thể sử dụng DirectionalLightHelper để vẽ một mặt phẳng để biểu diễn nguồn sáng và một đường thẳng từ nguồn sáng tới đích. Chúng ta chỉ cần truyền nguồn sáng cho Helper và thêm Helper vào cảnh:

```javascript
const directionalLightHelper = new DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);
```

Chúng ta cũng cần gọi `directionalLightHelper.update()` ở trong vòng lặp animation.

[Ví dụ Directional Light](https://static.lockex1987.com/learn-threejs/chapter-05/05-01-lights.html#Directional)

![Directional Light](https://static.lockex1987.com/learn-threejs/images/light-directional.png)

### PointLight

Đây là nguồn sáng mà các tia sáng tỏa ra tất cả các hướng từ một điểm trong không gian, ví dụ bóng đèn tròn.

PointLight có một số các thuộc tính quan trọng sau:

- `castShadow`: có tạo bóng không.
- `position`: vị trí nguồn sáng.
- `distance`: khoảng cách chiếu sáng. Nếu bằng 0 thì các tia sáng sẽ chiếu vô hạn. Nếu `distance` lớn hơn 0 thì các tia sáng sẽ chiếu với cường độ mạnh nhất ở nguồn và giảm dần đến khoảng cách `distance`.

Chúng ta sẽ không cần thuộc tính `target` nữa vì các tia sáng tỏa ra tất cả các hướng.

```javascript
const color = 0xeeeeee;
const intensity = 1;
const pointLight = new PointLight(color, intensity);
pointLight.castShadow = true;
pointLight.position.set(0, 3, 0);
pointLight.distance = 100;
```

Chúng ta có thể thêm PointLightHelper vào cảnh.

[Ví dụ Point Light](https://static.lockex1987.com/learn-threejs/chapter-05/05-01-lights.html#Point)

![Point Light](https://static.lockex1987.com/learn-threejs/images/light-point.png)

### SpotLight

Đây là nguồn sáng mà có hiệu ứng hình nó như đèn chụp hoặc đèn pin. Vùng được chiếu sáng có dạng hình nón. Thực tế có hai hình nón. Một hình nón trong và hình nón ngoài. Giữa hình nón trong và hình nón ngoài ánh sáng sẽ giảm dần cường độ từ mạnh nhất đến 0.

SpotLight có thuộc tính `position` để chỉ vị trí của nguồn sáng như PointLight. SpotLight cũng có thuộc tính `target` để chỉ định hướng của các tia sáng như DirectionalLight (hướng của tia sáng ở trung tâm hình nón). SpotLight cũng có Helper tương ứng là SpotLightHelper.

Ngoài ra, SpotLight có các thuộc tính sau mà bạn có thể điều chỉnh:

- `castShadow`: có tạo bóng không.
- `angle`: góc tỏa sáng, đo bằng radian, mặc định là Math.PI / 3. Đây là góc của hình nón ngoài.
- `penumbra`: tỷ lệ phần trăm sai khác của hình nón trong so với hình nón ngoài. Khi `penumbra` bằng 0 (0 = không khác nhau) thì hình nón trong cùng kích thước hình nón ngoài. Khi `penumbra` bằng 1 thì ánh sáng bắt đầu nhạt dần từ tâm đến hình nón ngoài. Khi `penumbra` bằng 0.5 thì ánh sáng bắt đầu nhạt từ 50% giữa tâm và hình nón ngoài. Chú ý khi `penumbra` bằng 0 thì vùng được chiếu sáng có cạnh rất sắc nét còn khi chúng ta điều chỉnh `penumbra` lên 1 thì cạnh bị blur đi.
- `distance`: khoảng cách chiếu sáng.

````javascript
const spotLight = new SpotLight(0xeeeeee);
spotLight.position.set(0, 5, 0);
spotLight.target = this.ground;
spotLight.distance = 10; // 0 là vô hạn
spotLight.angle = Math.PI * 0.1;
spotLight.castShadow = true;
spotLight.penumbra = 0.4;
````

[Ví dụ Spot Light](https://static.lockex1987.com/learn-threejs/chapter-05/05-01-lights.html#Spot)

![Spot Light](https://static.lockex1987.com/learn-threejs/images/light-spot.png)

### RectAreaLight

Với nguồn sáng này, thay vì một điểm trong không gian, bạn có thể chỉ định một vùng hình chữ nhật phát sáng, ví dụ khung cửa sổ, đèn trần huỳnh quang.

Để sử dụng RectAreaLight, chúng ta cần tải thêm dữ liệu tùy chọn của Three.js, không phải trong thư viện core. RectAreaLightHelper cũng không ở trong thư viện core như DirectionalLightHelper, SpotLightHelper, PointLightHelper mà phải tải ở file trong thư mục examples:

```javascript
import { RectAreaLightUniformsLib } from '/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from '/examples/jsm/helpers/RectAreaLightHelper.js';
```

Khi khởi tạo cảnh, chúng ta cũng cần gọi `RectAreaLightUniformsLib.init()`. Nếu bạn không gọi, nguồn sáng vẫn hoạt động nhưng nó sẽ trông không chân thực lắm. Do đó hãy nhớ tải thêm dữ liệu.

RectAreaLight có các thuộc tính sau:

- `width`: độ rộng hình chữ nhật.
- `height`: độ cao hình chữ nhật.
- `position`: vị trí nguồn sáng.

Không giống như DirectionalLight và SpotLight, RectAreaLight không sử dụng thuộc tính `target`. Nó sử dụng góc xoay để chỉ định hướng các tia sáng, bạn có thể điều chỉnh bằng thuộc tính `rotation` hoặc phương thức `lookAt()`.

RectAreaLightHelper phải là con của đối tượng RectAreaLight, không phải con của đối tượng Scene như các Helper khác.

```javascript
const color = 0xff00ff;
const intensity = 10;
const width = 2;
const height = 5;
const rectAreaLight = new RectAreaLight(color, intensity, width, height);
rectAreaLight.position.set(0, 2.5, -2);
rectAreaLight.lookAt(0, 0, 0);
```

[Ví dụ Rect Area Light](https://static.lockex1987.com/learn-threejs/chapter-05/05-01-lights.html#RectArea)

![Rect Area Light](https://static.lockex1987.com/learn-threejs/images/light-rect-area.png)

### Tổng kết

| Light            | Helper                                           | Có tạo bóng không | Hướng tia sáng                                               |
| ---------------- | ------------------------------------------------ | ----------------- | ------------------------------------------------------------ |
| AmbientLight     |                                                  |                   | Vô hướng, tác động đều, toàn cục                             |
| HemisphereLight  | HemisphereLightHelper                            |                   | Theo hai hướng: từ trên xuống và từ dưới lên<br />Mặt hướng lên trên chịu tác động của màu bầu trời<br />Mặt hướng xuống dưới chịu tác động của màu mặt đất |
| DirectionalLight | DirectionalLightHelper                           | Có                | Hướng từ position đến target.position                        |
| SpotLight        | SpotLightHelper                                  | Có                | Hướng từ position đến target.position                        |
| PointLight       | PointLightHelper                                 | Có                | Tỏa ra tất cả các hướng                                      |
| RectAreaLight    | RectAreaLightHelper<br />(phải load từ examples) |                   | Dùng góc xoay                                                |