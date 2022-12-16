Để tạo ra các mô hình 3D phức tạp, sẽ rất khó nếu chúng ta làm việc đó thủ công bằng cách kết hợp các Geometry cơ bản mà Three.js cung cấp. Thay vào đó, chúng ta nên tạo các mô hình này bằng các phần mềm chuyên dụng như Blender, Maya,... Sau đó, chúng ta sẽ load mô hình (model) vào trong cảnh của chúng ta rồi hiển thị.

### Các định dạng file và các Loader

Có rất nhiều các định dạng file để lưu thông tin 3D model. Tuy nhiên, trong những năm gần đây, một định dạng file nổi lên như là chuẩn đó là glTF (GL Transmission Format). Định dạng này có ưu điểm là mã nguồn mở, được thiết kế tối ưu để hiển thị chứ không phải để chỉnh sửa, dung lượng nhẹ, tải nhanh, có đầy đủ các tính năng như Material, Animation. Ngoài ra, một số các định dạng khác cũng phổ biến như OBJ,  FBX,...

Định dạng glTF lại có thể ở hai dạng:

- Dạng file JSON chuẩn `.gltf` không nén và có thể đi kèm thêm với các file `.bin`
- Dạng file binary `.glb` chứa tất cả dữ liệu trong chỉ một file

Tùy các định dạng file model, chúng ta sẽ có các Loader tương ứng. Ví dụ với định dạng glTF, OBJ sẽ có GLTFLoader, OBJLoader. Chúng ta sử dụng các Loader này tương tự cách chúng ta sử dụng các Loader khác đã tìm hiểu ở các bài trước như FontLoader, TTFLoader, SVGLoader, TextureLoader,...

### Load model tĩnh

Đầu tiên, chúng ta cần một model mẫu. Có rất nhiều các model miễn phí mà bạn có thể sử dụng trên Internet như:

[glTF-Sample-Models/2.0 at master · KhronosGroup/glTF-Sample-Models](https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0)

[Sketchfab](https://sketchfab.com/search?type=models)

[Mixamo](https://www.mixamo.com/#/)

[3D Models for Free - Free3D.com](https://free3d.com/)

[Poly Pizza: Free 3D models for everyone](https://poly.pizza/)

Chúng ta nên sử dụng các model dạng low poly để có thể hiển thị nhẹ nhàng trên cả các thiết bị yếu.

Chúng ta sẽ sử dụng model flamingo (chim hồng hạc) từ trang chủ của Three.js. Model này cũng có Animation để có thể sử dụng ở phần tiếp theo.

[https://threejs.org/examples/models/gltf/Flamingo.glb](https://threejs.org/examples/models/gltf/Flamingo.glb)

Đầu tiên, chúng ta cũng tạo một cảnh 3D đơn giản với Scene, Camera, Renderer, AmbientLight, PointLight, OrbitControls. Chúng ta cũng tạo một vòng lặp render đơn giản.

Tiếp theo, chúng ta import class GLTFLoader từ file trong thư mục `examples`,  khởi tạo một đối tượng Loader, sau đó gọi phương thức `loadAsync()`. Kết quả trả về sẽ là một đối tượng `gltf`. Bây giờ chúng ta hãy thử in đối tượng này ra thôi xem nó bao gồm những gì. Sau đó, chúng ta bắt đầu vòng lặp render.

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class ThreejsExample {
    async loadModel() {
        const url = 'https://threejs.org/examples/models/gltf/Flamingo.glb';
        const gltfLoader = new GLTFLoader();
        const gltf = await gltfLoader.loadAsync(url);
        console.log(gltf);
        requestAnimationFrame(this.render.bind(this));
    }
}
```

Kết quả in ra của đối tượng `gltf` ở Console có dạng như sau:

```
{
  animations: [AnimationClip],
  asset: {version: '2.0', generator: 'THREE.GLTFExporter'},
  cameras: [],
  parser: GLTFParser {json: {…}, extensions: {…}, plugins: {…}, options: {…}, cache: {…}, …},
  scene: Group {uuid: '7ED632DD-C02F-429A-84D7-DDA5A7D396EB', name: 'AuxScene', type: 'Group', parent: null, children: Array(0), …},
  scenes: [Group],
  userData: {}
}
```

Trong đó:

- `gltf.animations` là một mảng các AnimationClip, chứa các hoạt họa của model
- `gltf.asset` chứa các metadata
- `gltf.cameras` là một mảng các Camera
- `gltf.parser` chứa các thông tin kỹ thuật về GLTFParser
- `gltf.scene` là một đối tượng Group chứa các Mesh
- `gltf.scenes` là một mảng các Group (định dạng glTF hỗ trợ nhiều cảnh trong một file)
- `gltf.userData` có thể chứa các thông tin thêm

Hai thuộc tính mà chúng ta cần lưu ý, hay sử dụng là `scene` và  `animations`.

Thuộc tính `scene` là một đối tượng Group. Để lấy ra chỉ model chim hồng hạc thôi, chúng ta có thể làm như sau:

```javascript
const mesh = gltf.scene;
// const mesh = gltf.scene.children[0];
```

Tùy model cụ thể, chúng ta có thể lấy bằng `gltf.scene` hoặc `gltf.scene.children[0]` hoặc một node khác trên scenegraph. Hãy tìm hiểu nội dung log ở Console để lấy ra chính xác.

Tiếp theo, chúng ta có thể phải chỉnh lại `scale` (nếu model trông quá lớn hoặc quá bé), `position`, `rotation` cho phù hợp với cảnh của chúng ta. Cuối cùng, thêm Mesh vào trong Scene.

```javascript
const scale = 0.005;
mesh.scale.multiplyScalar(scale);
this.scene.add(mesh);
```

Chú ý: Khi Mesh được thêm vào Scene của chúng ta thì đồng thời nó sẽ bị loại bỏ khỏi `gltf.scene`. Do đó nó có thể không hiển thị ở `gltf.scene` nữa khi bạn sử dụng `console.log()`.

[Ví dụ Model Loader](https://static.lockex1987.com/learn-threejs/chapter-08/08-01-model-loader.html)

![Ví dụ 08.01 - Model Loader](https://static.lockex1987.com/learn-threejs/screenshots/08-01-model-loader.png)

### Lỗi hiển thị model trên mobile

Lần đầu tiên khi tôi chạy ví dụ trên máy tính thì kết quả hiển thị bình thường, tuy nhiên trên mobile (điện thoại Android Oppo của tôi) thì không hiển thị ra gì. Log lỗi trên mobile như sau:

```
THREE.WebGLProgram: Shader Error 0 - VALIDATE_STATUS false

Program Info Log:
VERTEX


WebGL: INVALID_OPERATION: useProgram: program not valid
WebGL: INVALID_OPERATION: drawElements: no valid shader program in use
```

Lỗi này chỉ trên một số model (ví dụ model Flamingo.glb), không phải tất cả. Một số model khác vẫn chạy được. Lỗi này bị cả ở ví dụ trên trang chủ của Three.js.

[three.js webgl - lights - hemisphere light](https://threejs.org/examples/webgl_lights_hemisphere.html)

Để khắc phục lỗi trên mobile này, tạm thời chúng ta sẽ không sử dụng version 0.137.5 nữa mà quay lại dùng version cũ hơn là 0.132.2. Version mới nhất ở thời điểm viết bài này là 0.138.3 cũng không chạy được.

### Chỉnh kích thước và căn giữa model

Trong nhiều trường hợp, khi download một model ở trên mạng và hiển thị ở cảnh của chúng ta, model sẽ bị quá lớn hoặc quá bé, và không hiển thị ở giữa màn hình. Chúng ta có thể chỉnh kích thước cho phù hợp và căn giữa một cách tự động bằng đoạn code sau:

```javascript
resizeAndCenter(mesh) {
    const box = new Box3().setFromObject(mesh);
    const size = box.getSize(new Vector3());
    const maxSize = Math.max(size.x, size.y, size.z);
    const desizedSize = 1.5;
    mesh.scale.multiplyScalar(desizedSize / maxSize);

    box.setFromObject(mesh);
    const center = box.getCenter(new Vector3());
    mesh.position.sub(center);
}
```

### Load model có animation

Một số model thường có thể đi kèm với Animation. Để có thể làm cho model chuyển động với Animation, chúng ta cần:

- Tạo một [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer) với Mesh
- Lấy ra một đối tượng [AnimationClip](https://threejs.org/docs/#api/en/animation/AnimationClip) từ mảng `gltf.animations`
- Tạo một [AnimationAction](https://threejs.org/docs/#api/en/animation/AnimationAction) từ AnimationMixer và AnimationClip
- Bắt đầu cho chuyển động với phương thức `play()` của AnimationAction
- Trong vòng lặp render, cần gọi phương thức `update()` của AnimationMixer. Chúng ta cần truyền tham số là một khoảng thời gian delta. Chúng ta có thể lấy khoảng thời gian này từ một [Clock](https://threejs.org/docs/index.html?q=Clock#api/en/core/Clock).

```javascript
setupAnimation(mesh, gltf) {
    this.clock = new Clock();

    this.mixer = new AnimationMixer(mesh);
    const clip = gltf.animations[0];
    const action = this.mixer.clipAction(clip);
    action.play();
}

render() {
    // ...

    if (this.mixer) {
        const delta = this.clock.getDelta();
        this.mixer.update(delta);
    }
    
    // ...
}
```

Chúng ta đã đi đến cuối hành trình tìm hiểu cơ bản về Three.js. Hy vọng kiến thức trong các bài viết giúp bạn có cái nhìn tổng quan, sơ lược về Three.js, là nền tảng để bạn có thể tiếp tục tìm hiểu sâu hơn nữa về Three.js, khám phá các kỹ thuật nâng cao mới, tạo ra các cảnh 3D chân thực, ấn tượng.

Nội dung của tất cả các chương được tôi tổng hợp lại dưới một quyển ebook nhỏ định dạng EPUB, bạn có thể download ở địa chỉ sau:

[Học Three.js cơ bản.epub](https://static.lockex1987.com/learn-threejs/hoc_three.js_co_ban.epub)