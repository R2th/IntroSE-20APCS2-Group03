Các bài trước trong series mình đã hướng dẫn mọi người tạo vài hình khối có sẵn rồi, hôm nay sẽ nâng cao hơn, ghép các khối cơ bản thành hình nhé.

![](https://images.viblo.asia/5ef9c897-136e-4136-ad4a-7e842d71371b.gif)

Để có thể xếp hình được, sẽ cần khá nhiều kiến thức trong các bài trước, trong bài này mình sẽ cố gắng trình bày thêm 1 lần ở các khái niệm, để kể cả những người chưa hiểu lắm các bài trước của mình cũng có thể hiểu được bài này nhé. Tuy vậy bài sẽ hơi dài :D

# Khởi tạo PJ ThreeJS

Trước khi bắt tay vào tạo hình, thì mình nên có 1 file ThreeJS cơ bản đã. Các thành phần cơ bản mà mình nói tới là:
 - Thư viện ThreeJS (đương nhiên =)))
 - Scene
 - Camera
 - Renderer

Khởi tạo các thành phần trên đại loại sẽ như sau:
```html:html
<!DOCTYPE html>
<html>
<head>
    <title>Car</title>
    <script type="text/javascript" src="js/three.js"></script>
</head>
<body id="body">

    <script type="text/javascript">
        // khởi tạo scene
        var scene = new THREE.Scene();

        // Khởi tạo camera
        const aspectRatio = window.innerWidth / window.innerHeight;
        const cameraWidth = 150;
        const cameraHeight = cameraWidth / aspectRatio;

        const camera = new THREE.OrthographicCamera(
          cameraWidth / -2, // left
          cameraWidth / 2, // right
          cameraHeight / 2, // top
          cameraHeight / -2, // bottom
          0, // near plane
          1000 // far plane
        );
        camera.position.set(200, 200, 200);
        camera.lookAt(0, 10, 0);

        // Vị trí 1 => lát thêm code vào đây nhé

        // Tạo renderer
        var renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera);

        document.body.appendChild(renderer.domElement);

       // Vị trí 2 => lát thêm code vào đây nhé

    </script>
</body>
<style type="text/css">
    body {
        margin: 0;
    }
    canvas {
        width: 100%;
        height: 100%;
    }
</style>
</html>
```

À thì nhìn đoạn code trên copy về thì chắc các bạn cũng chưa nhớ lắm dòng nào để làm gì, mấy cái số hình dung như nào, nên là bắt đầu ôn lại nhé. Tương ứng với từng phần hãy đối chiếu trên code nhé

### Scene

Scene là không gian chứa \mọi thứ hiển thị cho chúng ta: các 3d object muốn hiển thị, và ánh sáng - Light.

Vậy là tiếp theo đây, sau khi tạo bất cứ thứ gì, mà bạn muốn có hiển thị nó, thì nhớ add vào scene nhé :D

```javascript:js
 var scene = new THREE.Scene();

 // create item here

 scene.add(item); // to display
```

### Camera
Nhìn lại đoạn code này
```rust:js
// Khởi tạo camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;
```

**AspectRatio** là tỉ lệ khung hình, VD như hình vuông là 1:1, hoặc tỉ lệ màn hình trình chiếu slide có 2 loại mặc định là 3:4 và 16:9. Ở đây là tỉ lệ khung hiển thị không gian 3D. Do vậy, có thể tính bằng `window.innerWidth / window.innerHeight`

Có 2 loại camera thường được sử dụng là **Orthographic Camera** và **Perspective Camera**. 

**Perspective Camera** sẽ cho cảm nhận về độ xa gần của vật thể: Gần thì lớn, ra xa dần vật sẽ nhỏ hơn, đôi khi làm biến dạng vật thể (VD đầu to đuôi nhỏ)

![](https://images.viblo.asia/49b945c5-c3a1-442d-bb45-b0b66de62262.jpg)

```go:js
var camera = new.PerspectiveCamera(
    20, // verticle angle of view
    aspectRatio,
    60, // near plane
    100, // far plane
)
```

Còn **Orthographic Camera** thì vật sẽ có kích thước như nhau dù ở xa hay gần. Trong bài này mình dùng **Orthographic Camera**

![](https://images.viblo.asia/68b84b3e-e642-43e4-b927-b6f65825fd21.png)

```c:js
const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left (= -75)
  cameraWidth / 2, // right (= 75)
  cameraHeight / 2, // top (= 75)
  cameraHeight / -2, // bottom (= -75)
  0, // near plane
  1000 // far plane
);
```

Cuối cùng, set vị trí camera nữa là được. Với đoạn code trên của mình, thì có thể mô tả như thế này:
```css:js
camera.position.set(200, 200, 200);
camera.lookAt(0, 10, 0);
```
![](https://images.viblo.asia/b17f91e8-01fa-4937-8c75-0fe099593bf3.jpg)

### Thêm tí ánh sáng về bản
Ở trên là các thành phần cơ bản rồi, nhưng để hiển thị được đẹp hơn cho bài này, thí thêm tí ánh sáng nhìn cho rõ và đẹp nữa. Ở đây mình add vào `Vị trí 1` nhé:

```objectivec:js
// set up light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(200, 500, 300);
scene.add(dirLight);
```

Ôn lại tí khái niệm về ánh sáng này:

![](https://images.viblo.asia/809da756-1ee8-45a0-a6f4-23ece7cbcbaa.png)

Như trên hình thì việc sử dụng **Ambient light** thì ánh sáng chiếu mọi mặt sẽ có độ sáng như nhau, như vậy trông không 'thật' lắm. Nhưng với Directional light, giống như bóng của vật dưới ánh mặt trời, thì ở mặt dưới cùng sẽ không nhận được ánh sáng chiều vào, đen thui nếu xoay xuống mặt dưới :D

Vì vậy, mình kết hợp 2 loại này, để có thể xoay mặt nào cũng nhìn thấy màu sắc - hình ảnh vật thể, và trông cũng thật hơn nữa.

Như có thể thấy, có 2 params truyền vào Light: Mã màu của ánh sáng và cường độ sáng. 

Mã màu thì khỏi cần giải thích nhiều, còn cường độ sáng thì sẽ nằm trong khoảng 0 và 1; 0 là không có tí ánh sáng nào, 1 là ánh sáng mạnh nhất (chói lóa)

Với **Directional Light**, cần phải chỉ định vị trí nguồn sáng nữa. Vị trí nguồn sáng sẽ quyết định các tia sáng chiếu ra không gian như thế nào, ở vị trí càng xa thì càng nhiều tia sáng song song tới vật thể. **Ambient Light** thì ánh sáng đến từ mọi phía nên không cần đến.

### Renderer

Việc cuối cùng, là thể hiện những gì trong không gian 3 chiều bằng 1 hình ảnh 2 chiều lên màn hình của chúng ta, tất nhiên tham số truyền vào là những gì mà mình đã cho vào không gian: camera và scene (mọi item đều có scene.add() rồi nhé); và phải set kích thước của 'tấm ảnh' này nữa, mình set bằng màn hình hiện tại luôn cho to dễ nhìn:

```markdown:js
// Tạo renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera);

// cuối cùng là render cái ảnh đó vào HTML của chúng ta:
document.body.appendChild(renderer.domElement);
```

# Tạo đối tượng
Về cơ bản, như đã nói ở đầu bài, thì chúng ta sẽ ghép các hình khối cơ bản vào với nhau thành 1 vật thể. Mình sẽ chọn ô tô nhé (thực ra tại mình tham khảo tutorial tạo ô tô :D)

```javascript:js
function Car() {
    const car = new THREE.Group();
    // chuẩn bị code tiếp ở đây

    return car;
}
```

Bởi vì mình sẽ tạo 1 tập object ghép thành cái xe, nên sẽ cần khởi tạo 1 `THREE.Group` để chứa các thành phần của cái xe nhé.

Để có thể nhìn thấy từng thành phần xe hiện lên màn hình, thì nhớ add cái xe vào scene nhé:

```sql:js
var rollRoyce = Car();
scene.add(rollRoyce);
```

## Bánh xe

Xây nhà xây từ móng, làm cái bánh xe trước. Về lý thuyết thì xe có 4 bánh, 2 bánh trước, 2 bánh sau. Nhưng mà ở đây đằng nào bạn cũng nhìn mỗi từ trên xuống thôi, nên sẽ tối giản hình ảnh bằng 2 khối: khối bánh trước và khối bánh sau. Vì là tối giản nên mình dùng khối hộp chữ nhật thay vì hình trụ tròn luôn cho dễ tạo hình.

![](https://images.viblo.asia/7274bae0-fe96-4da7-8d05-e6b7e83e6f02.png)

```javascript:js
function Car() {
  const car = new THREE.Group();
  var backWheel = new THREE.Mesh(
   // tạo 1 khối hộp kích cỡ (12, 33, 12)
    new THREE.BoxBufferGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({color: 0x333333}) // chọn màu
  );

  backWheel.position.y = 6;
  backWheel.position.x = -18;
  // đừng quên add bánh xe vào xe nhé
  car.add(backWheel);

  // tương tự với FrontWheel
  var frontWheel = new THREE.Mesh(
    new THREE.BoxBufferGeometry(12, 33, 12),
    new THREE.MeshLambertMaterial({color: 0x333333,}),
  );

  frontWheel.position.y = 6;
  frontWheel.position.x = 18;
  car.add(frontWheel);
}
```

Chép đoạn code xong, và thấy hiển thị như trên hình trên, để ý 1 chút bạn sẽ thấy có vài vấn đề:
 - Hình dạng khối hộp hình như... sai sai...
 - Vị trí khối bánh xe không được visualize lắm

Ở vấn đề đầu tiên, tại sao mình chọn x = 12, y = 12, z = 33 thì đáng lẽ phải dựng đứng lên chứ sao lại nằm ngang? Do khi bạn sử dụng function `camera.lookAt()`, thì muốn chỉnh hướng camera cho đúng, phải sử dụng thêm hàm `camera.up.set(vector3)` vào cùng với `camera.lookAt` nhé:
```css:js
camera.up.set(0, 0, 1);
```

Function này sẽ lấy vector3 mà bạn chỉ định kia làm hướng của trục Z, khi đấy bạn sẽ thấy nó thẳng đứng như expect nhé :D. 

Tiếp theo là về vấn đề vị trí của khối bánh xe, nếu là 1 chất điểm, thì việc xác định vị trí là vô cùng dễ dàng. Nhưng đây là cả 1 khối khá to, thì vị trí của nó sẽ được xác định bằng vị trí tâm O của khối:

![](https://images.viblo.asia/a70ffc8c-354a-4d73-a59b-d1a3e2effd9d.jpg)

Từ đây, thì có thể bắt đầu tính toán vị trí cho các khối để đặt đúng chỗ 
## Thân xe
Sau khi có 2 bánh xe như kia rồi, thì thêm thân xe, cũng là 1 khối chữ nhật, nhưng vị trí sẽ cao hơn bánh xe 1 chút:

```java:js
var main = new THREE.Mesh(
  new THREE.BoxBufferGeometry(60, 30, 15),
  new THREE.MeshLambertMaterial({color: 0xa52523}),
);
main.position.z = 6;
main.position.y = 6;
car.add(main);
```

![](https://images.viblo.asia/abc86379-99af-4ead-8410-eb20f50240b9.png)

Ở phần này, do tương tự như trên nên chỉ khó 1 chút ở chỗ đặt thân xe ở đâu thì đúng? Bạn nào giỏi hình học thì tính được ngay, bạn nào không giỏi thì... mò cũng đc :D

Đến đây sẽ thấy có thêm 1 vấn đề kỳ lạ nữa, đấy là trục x và trục y đổi chỗ cho nhau. Do hàm `camera.up.set()` chỉ giúp xác định được trục z thôi, mà trục x làm thế nào để về cho đúng thì mình chưa biết, nên tạm bỏ qua :D

## 'Nóc nhà' - Thùng xe
Tương tự như trên, dễ dàng có thể tạo được 1 cái thùng xe nữa rồi nhé:

![](https://images.viblo.asia/d1f16d3f-4ce2-4b9c-b8de-df88142a7c4a.png)

```java:js
var cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 30, 12),
    new THREE.MeshLambertMaterial({color: 0xa52523,}),
);
cabin.position.y = 6;
cabin.position.z = 20;
car.add(cabin);
```

Thế là hoàn thiện xe rồi đấy :D

# Kết
Nếu có gì chưa làm được, hãy tham khảo code pen của mình nhé: https://codepen.io/bunnypi04/pen/RwoXgmW

Bài viết có sự tham khảo từ Hunor Marton Borbely :D