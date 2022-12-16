Trong bài này, chúng ta sẽ cùng tìm hiểu về các thành phần như Scene, Camera, Renderer, Mesh, Geometry. Trước đó, chúng ta cũng tìm hiểu về hệ tọa độ trong Three.js.

### Hệ tọa độ

![Coordinate](https://static.lockex1987.com/learn-threejs/images/coordinate_system_screen.svg)

Các đối tượng trong cảnh của Three.js nằm trong một không gian 3D gồm có ba trục:

- Trục X: từ trái sang phải
- Trục Y: từ dưới lên trên
- Trục Z: từ xa về gần màn hình

Chúng ta có thể sử dụng AxesHelper để hiện thị ba trục tọa độ trên cảnh của mình. Code như sau:

```javascript
const axesHelper = new AxesHelper(5);
scene.add(axesHelper);
```

Cảnh của chúng ta sẽ xuất hiện ba đường kẻ thể hiện các trục. Trục X có màu đỏ, trục Y có màu xanh lá cây, trục Z có màu xanh da trời. Tham số khởi tạo là kích thước (độ dài) của các đường kẻ.

### Scene

Ở các ví dụ trước, chúng ta đã biết để tạo một cảnh 3D trong Three.js cần các thành phần cơ bản sau:

- Scene
- Camera
- Renderer
- Mesh (là kết hợp của Geometry và Material)

Scene giống như một không gian 3D mà trong đó bạn có thể đặt các đối tượng như Mesh và Light. Scene là một cấu trúc mà đôi khi còn được gọi là scene graph. Một scene graph là một cấu trúc mà giữ tất cả các thông tin cần thiết của cảnh. Trong Three.js, điều đó có nghĩa là Scene chứa tất cả các đối tượng, nguồn sáng, và các đối tượng khác cần thiết để render. Như cái tên ám chỉ, scene graph không chỉ là một mảng các đối tượng; nó bao gồm một tập các node dạng cây. Ví dụ chúng ta có cây sau:

![Scene graph](https://static.lockex1987.com/learn-threejs/images/scene_graph.svg)

Các node của cây có thể là Group:

![Scene tree](https://static.lockex1987.com/learn-threejs/images/scene_tree.svg)

Mỗi đối tượng bạn có thể thêm vào Scene, và chính cả Scene, extend từ một base class là Object3D. Một đối tượng Object3D có thể có các đối tượng con riêng của nó.

Phân hệ các class là:

```
Object3D
├── Scene
├── Camera
│    └── PerspectiveCamera
├── Mesh
├── Group
└── Light
    ├── AmbientLight
    ├── DirectionalLight
    ├── SpotLight
    ├── PointLight
    └── HemisphereLight
```

Chúng ta tạo một đối tượng Scene mới như sau:

```javascript
const scene = new Scene();
```

Scene chính nó thì không có nhiều các thuộc tính và phương thức. Tuy nhiên, chúng ta có thể sử dụng một số các thuộc tính và phương thức của base class Object3D sau:

- `castShadow` (Boolean): có đổ bóng không. Mặc định là `false`.
- `children` (Array): mảng các đối tượng con.
- `position` (Vector3): vị trí của đối tượng. Mặc định là (0, 0, 0).
- `rotation` (Euler): các góc quay local của đối tượng, bằng đơn vị radian.
- `add`(Object3D,...): thêm đối tượng nào đó thành con của đối tượng hiện tại.
- `remove`(Object3D,...): loại bỏ đối tượng con nào đó khỏi đối tượng hiện tại.
- `lookAt`(Vector3): xoay đối tượng để đối mặt với một điểm trong không gian.
- `traverse`(Function): thực hiện hàm callback trên đối tượng hiện tại và tất cả con cháu.

Chúng ta hãy khám phá các tính năng của một Scene bằng cách nhìn vào một ví dụ. Trong thư mục source code cho chương này (`chapter-02`), bạn có thể tìm thấy file ví dụ `02-01-scene.html`. Khi bạn mở ví dụ này trên trình duyệt, cảnh sẽ trông tương tự như sau:

![02-01](https://static.lockex1987.com/learn-threejs/screenshots/02-01.png)

Nhìn vào code JS của ví dụ này (`02-01.js`), bạn có thể thấy chúng ta sử dụng các phương thức `this.scene.add()` để thêm mặt phẳng, thêm AxesHelper, thêm các hình lập phương. Chúng ta cũng sử dụng phương thức `this.scene.remove()` để loại bỏ các hình lập phương. Ngoài ra, chúng ta cũng sử dụng thuộc tính `this.scene.children` để lấy ra danh sách các hình lập phương và phương thức `this.scene.traverse()` để duyệt qua các hình lập phương.

Ở bảng điều khiển bên gốc trên phải, bạn có thể nhấn nút "addCube" để thêm một hình lập phương vào cảnh. Kích thước, vị trí của hình lập phương mới sẽ được thiết lập ngẫu nhiên. Bạn cũng có thể nhấn nút "removeCube" để loại bỏ hình lập phương cuối cùng thêm vào. Mục "Số đối tượng" (numberOfObjects) hiển thị số đối tượng hiện tại trong cảnh (bao gồm cả mặt phẳng, AxesHelper, các hình lập phương). Bạn có thể thấy khi mới mở ví dụ, chúng ta đã có sẵn 3 đối tượng. Đó là: một mặt phẳng, một AxesHelper, một hình lập phương.

[Ví dụ 02.01 - Scene](https://static.lockex1987.com/learn-threejs/chapter-02/02-01-scene.html)

Scene có thuộc tính `fog` để thêm hiệu ứng sương mù vào cảnh. Tuy nhiên, để có thể xem được hiệu ứng, chúng ta không được sử dụng MeshNormalMaterial hoặc MeshBasicMaterial. Có thể sử dụng các Material như MeshLambertMaterial, MeshPhongMaterial. Vậy hãy để hiệu ứng này ở các bài sau.

### Camera

Trong Three.js, chúng ta có hai loại Camera là OrthographicCamera và PerspectiveCamera. Tuy nhiên, chúng ta sẽ chỉ tập trung vào PerspectiveCamera vì nó giống thế giới thực nhất. Một PerspectiveCamera sẽ mô phỏng hành động của một camera quay phim trong đời thực. Đối tượng càng xa Camera thì trông càng bé. Vị trí của camera và hướng của nó sẽ quyết định phần nào của khung cảnh được render trên màn hình. Khi khởi tạo một camera mới, bạn cần truyền vào:

- `fov`: field of view (FOV) - góc nhìn theo chiều dọc. Góc càng rộng thì chúng ta càng nhìn được nhiều hơn, các đối tượng càng nhỏ đi. Con người thường có FOV bằng 180 độ, trong khi một số loài chim có thể có FOV bằng 360 độ. Tuy nhiên, màn hình máy tính không chiếm toàn bộ tầm nhìn của chúng ta, do đó chúng ta nên chọn một giá trị nhỏ hơn, nên để từ 45 đến 90. Giá trị tốt là 45.
- `aspect`: tỷ lệ chiều ngang / chiều dọc của vùng mà chúng ta render đầu ra của cảnh. Tỷ lệ này quyết định sự khác nhau giữa FOV theo chiều ngang và FOV theo chiều dọc. Để hình ảnh không bị biến dạng, hãy để giá trị này bằng tỷ lệ chiều ngang / chiều dọc của canvas.
- `near`: mặt phẳng gần. Nếu đối tượng cách Camera nhỏ hơn `near` thì sẽ không nhìn thấy. Nên để 0.1.
- `far`: mặt phẳng xa. Nếu đối tượng cách Camera lớn hơn `far` thì sẽ không nhìn thấy. Nên để 1000. Nếu để quá cao, trong một số trường hợp có thể ảnh hưởng đến hiệu năng, hoặc xảy ra hiện tượng z-fighting.

Bốn giá trị trên chỉ định không gian 3D giống như hình kim tự tháp cụt mà có thể được chụp lại bởi camera của bạn. Các đối tượng ở giữa `near` và `far`, trong khoảng `fov` (ngang và dọc) sẽ được hiển thị.

![Camera frustum](https://static.lockex1987.com/learn-threejs/images/frustum.svg)

Bạn có thể sử dụng phương thức `Vector3.distanceTo(v: Vector3)` để tính khoảng cách giữa hai điểm, ví dụ `postion` của Camera và `position` của một đối tượng nào đó.

Bình thường, Camera sẽ nhìn hướng về trung tâm, điểm gốc tọa độ (0, 0, 0). Bạn có thể thay đổi vị trí Camera nhìn về, ví dụ:

```javascript
camera.lookAt(new Vector3(x, y, z));
```

Nếu chúng ta mở ví dụ và tick chọn mục "rotateCamera", bạn có thể thấy cảnh của chúng ta được xoay vòng tròn. Bản thân cảnh không thực sự đang di chuyển. Chính là Camera của chúng ta xoay vòng tròn và luôn luôn nhìn vào điểm trung tâm (0, 0, 0). Code để chúng ta di chuyển Camera như sau:

```javascript
camera.tick = ms => {
    // Tính góc xoay theo thời gian
    // Xoay một vòng hết 16 giây
    const seconds = ms / 1000;
    const angle = seconds * Math.PI / 8;

    // Sử dụng các hàm sin và cos để di chuyển vòng tròn
    camera.position.x = 30 * Math.sin(angle);
    camera.position.z = 30 * Math.cos(angle);

    // Luôn nhìn vào điểm trung tâm
    camera.lookAt(this.scene.position);
};
```

Trên giao diện của [Ví dụ 02.01 - Scene](https://static.lockex1987.com/learn-threejs/chapter-02/02-01-scene.html), bạn có thể điều chỉnh vị trí của Camera và tham số FOV của Camera.

### Renderer

Trong Three.js, chúng ta có các Renderer sau: WebGLRenderer, WebGL1Renderer, CSS2DRenderer, CSS3DRenderer, SVGRenderer. Tuy nhiên, chúng ta gần như chỉ sử dụng WebGLRenderer để tận dụng sức mạnh của WebGL.

Chúng ta khởi tạo một đối tượng Renderer mới như sau:

```javascript
const renderer = new WebGLRenderer(parameters);
```

Tham số `parameters` là một đối tượng với các thuộc tính định nghĩa các hành vi của Renderer. Trong đó có hai thuộc tính cấu hình quan trọng là `canvas` và `antialias`.

Thuộc tính cấu hình `canvas` chỉ định phần tử DOM canvas trong trang để vẽ đầu ra. Nó tương ứng với thuộc tính `domElement` của đối tượng Renderer. Nếu bạn không truyền ở đây, một phần tử canvas mới sẽ được tạo.

Thuộc tính cấu hình `antialias` chỉ định có thực hiện xử lý antialiasing hay không. Mặc định là `false`. Nếu để `antialias` bằng `true` thì các đường thẳng sẽ sắc nét hơn, không bị trông giống bậc thang hoặc răng cưa.

![Antialias](https://static.lockex1987.com/learn-threejs/images/render_antialias.svg)

Trong các ví dụ trước, chúng ta hay sử dụng các phương thức sau của đối tượng Renderer: `setClearColor()`, `setSize()`, `render()`.

Phương thức `setClearColor(color: Color, alpha: Float)` chỉ định màu để xóa (cũng là màu nền) và độ trong suốt. Chúng ta cần truyền vào tham số là một đối tượng Color của Three.js. Ví dụ:

```javascript
renderer.setClearColor(new Color(0x000000));
```

Phương thức `setSize(width: Integer, height: Integer, updateStyle: Boolean)` chỉ định độ phân giải của phần tử canvas. Chúng ta nên để độ phân giải này bằng kích thước hiển thị của canvas nhân với pixel ratio của thiết bị. Thiết lập `updateStyle` bằng `false` sẽ ngăn việc thiết lập style cho phần tử canvas.

```javascript
const pixelRatio = window.devicePixelRatio;
const width = canvas.clientWidth * pixelRatio;
const height = canvas.clientHeight * pixelRatio;
renderer.setSize(width, height, false);
```

Phương thức `render(scene: Object3D, camera: Camera)` sẽ render đối tượng Scene hoặc đối tượng có kiểu dữ liệu khác sử dụng Camera.

```javascript
this.renderer.render(this.scene, this.camera);
```

### Mesh

Đối tượng Mesh là kết hợp của Geometry và Material. Geometry thì tương tự như khung xương, còn Material thì tương tự như lớp da.

Ví dụ để thêm một hình lập phương vào cảnh, chúng ta làm như sau:

```javascript
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({
    color: 0xffff00
});
const mesh = new Mesh(geometry, material);
scene.add(mesh);
```

Class Mesh extend từ class Object3D nên kế thừa tất cả các thuộc tính, phương thức của Object3D như `position`, `rotation`,...

### Geometry

Geometry là một tập các điểm, cũng được gọi là các đỉnh, và các mặt kết nối các điểm đó với nhau. Lấy hình lập phương làm ví dụ:

- Một hình lập phương có 8 góc. Mỗi góc có thể định nghĩa bằng tọa độ x, y, z. Do đó hình lập phương có 8 đỉnh.
- Một hình lập phương có 6 cạnh. Trong Three.js, một mặt luôn bao gồm 3 đỉnh để tạo thành một hình tam giác. Mỗi cạnh của hình lập phương sẽ bao gồm hai tam giác (hai mặt).

Three.js có một tập nhiều các Geometry sẵn có mà bạn có thể sử dụng. Bạn chỉ việc thêm Material và tạo Mesh nữa là xong. Bạn không cần tự mình định nghĩa tất cả các đỉnh cũng như các mặt. Ví dụ để tạo một hình lập phương, bạn chỉ cần định nghĩa chiều rộng, chiều cao, và chiều sâu.

Danh sách các Geometry mà Three.js cung cấp là (có thể bạn chỉ cần sử dụng một số Geometry trong danh sách này thôi):

- BoxGeometry: hình hộp, ví dụ tòa nhà, bức tường
- SphereGeometry: hình cầu, ví dụ quả bóng, trái đất
- PlaneGeometry: mặt phẳng
- CylinderGeometry: hình trụ
- TorusGeometry: hình vòng, ví dụ bánh xe, bánh donut
- TorusKnotGeometry: hình vòng có nút thắt
- LatheGeometry: hình khuôn tiện tạo bởi xoay các điểm theo một trục nào đó, ví dụ lọ hoa, ly rượu, cái cốc
- OctahedronGeometry: hình 8 mặt
- DodecahedronGeometry: hình 12 mặt
- IcosahedronGeometry: hình 20 mặt
- ExtrudeGeometry: hình nổi lên từ một hình 2D
- TextGeometry: chữ 3D được sinh từ một typeface
- TubeGeometry: hình vòng tròn dọc theo một đường, ví dụ ống nước
- ...

![Geometry basics](https://static.lockex1987.com/learn-threejs/images/geometries_basic.svg)

![Geometry exotic](https://static.lockex1987.com/learn-threejs/images/geometries_exotic.svg)

![Geometry specialized](https://static.lockex1987.com/learn-threejs/images/geometries_specialized.svg)

Các Geometry trên đều có phiên bản Buffer tương ứng, ví dụ với BoxGeometry chúng ta sẽ có BoxBufferGeometry. Các phiên bản Buffer mới hơn và được xử lý nhanh hơn so với phiên bản không Buffer. Dữ liệu của chúng được lưu trong các mảng một chiều. Bạn nên luôn luôn sử dụng phiên bản Buffer của từng Geometry. Phiên bản không Buffer được giữ lại chỉ để tương thích ngược với các phiên bản Three.js cũ.

Bạn có thể xem trực quan các Geometry qua hai ví dụ sau:

[Ví dụ 02.02 - Geometry Browser](https://static.lockex1987.com/learn-threejs/chapter-02/02-02-geometry-browser.html)

![02-02](https://static.lockex1987.com/learn-threejs/screenshots/02-02.png)

[Ví dụ 02.03 - Primitives](https://static.lockex1987.com/learn-threejs/chapter-02/02-03-primitives.html)

![02-03](https://static.lockex1987.com/learn-threejs/screenshots/02-03.png)

Chúng ta sẽ không đi sâu vào từng Geometry ở đây. Bạn có thể tham khảo từng cái qua ví dụ và ở Documentation của Three.js.