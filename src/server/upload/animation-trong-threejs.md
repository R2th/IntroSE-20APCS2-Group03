Nếu chúng ta muốn animate cảnh, chúng ta cần render cảnh nhiều lần theo một tần suất nào đó. Các trình duyệt hiện đại có một giải pháp cho vấn đề, đó là hàm `requestAnimationFrame`. Tần suất gọi hàm sẽ phụ thuộc vào trình duyệt, thường là 60 lần trong một giây. Ở trong phương thức `render` của chúng ta, chúng ta cần gọi hàm `requestAnimationFrame` với tham số chính là phương thức `render`. Ngoài ra, chúng ta sẽ định nghĩa thêm phương thức `update` để cập nhật lại các đối tượng trong cảnh. Vòng lặp của chúng ta như sau:

```javascript
update() {
    // Cập nhật lại các đối tượng ở đây
}

render() {
    this.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
}
```

Chúng ta cũng không cần render luôn lại cảnh khi resize trình duyệt nữa, vì đằng nào cảnh sẽ sớm được render lại. Hãy bỏ câu lệnh gọi `this.render()` trong phương thức `handleResize`.

Chúng ta hãy định nghĩa thêm phương thức `tick` khi tạo hình lập phương. Trong phương thức này, chúng ta sẽ tăng các góc xoay của hình lập phương. Việc định nghĩa luôn lúc này sẽ giúp cho việc quản lý code của chúng ta tốt hơn khi cảnh có nhiều đối tượng. Trong phương thức `update`, chúng ta chỉ cần gọi `this.cube.tick()`.

```javascript
createCube() {
    // ...
    cube.tick = () => {
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;
    };
    // ...
}

update() {
    this.cube.tick();
}
```

Toàn bộ code đầy đủ là (`chapter-01/js/01-07.js`):

```javascript
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Color,
    BoxGeometry,
    MeshNormalMaterial,
    Mesh
} from 'https://unpkg.com/three@0.137.5/build/three.module.js';


class ThreejsExample {
    constructor(canvas) {
        this.scene = this.createScene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer(canvas);
        this.cube = this.createCube();
        this.scene.add(this.cube);
        this.render();
        this.handleResize();
    }

    createScene() {
        const scene = new Scene();
        return scene;
    }

    createCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        const camera = new PerspectiveCamera(45, aspect, 0.1, 1000);
        camera.position.set(-30, 40, 30);
        camera.lookAt(this.scene.position);
        return camera;
    }

    createRenderer(canvas) {
        const renderer = new WebGLRenderer({
            canvas,
            antialias: true
        });
        renderer.setClearColor(new Color(0x000000));
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio;
        const height = canvas.clientHeight * pixelRatio;
        renderer.setSize(width, height, false);
        return renderer;
    }

    createCube() {
        const cubeGeometry = new BoxGeometry(6, 6, 6);
        const cubeMaterial = new MeshNormalMaterial();
        const cube = new Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(-4, 3, 0);
        cube.tick = () => {
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.02;
            cube.rotation.z += 0.02;
        };
        return cube;
    }

    update() {
        this.cube.tick();
    }

    render() {
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.onResize();
        });
    }

    onResize() {
        const canvas = this.renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio;
        const height = canvas.clientHeight * pixelRatio;
        const aspect = width / height;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
    }
}


window.addEventListener('load', () => {
    new ThreejsExample(document.querySelector('#webglOutput'));
});
```

[Ví dụ 01.07 - Animation](https://static.lockex1987.com/learn-threejs/chapter-01/01-07-animation.html)

Hình lập phương của chúng ta đã xoay. Trong nhiều trường hợp, việc tạo animation như vậy là đã thỏa mãn yêu cầu: chúng ta cập nhật lại đối tượng một chút ở mỗi lần render. Tuy nhiên, giả sử chúng ta có yêu cầu là xoay hình lập phương một vòng mỗi 2 giây thì sao? Với code như trên thì chúng ta không thể đảm bảo việc đó. Chúng ta không thể đảm bảo được tần suất phương thức `render` được gọi, việc này phụ thuộc trình duyệt. Ở các thiết bị mà có framerate lớn, phương thức render sẽ được gọi nhiều lần hơn, hình lập phương sẽ quay nhanh hơn.

Để xử lý yêu cầu trên, chúng ta có thể tính góc quay của hình lập phương theo khoảng thời gian từ khi trang web được tải chứ không tăng ở mỗi lần gọi. Hàm `requestAnimationFrame` có một tham số chính là số milli giây từ khi trang web được tải. Chúng ta sẽ sử dụng luôn tham số này. Giả sử tham số có tên là `ms`. Khi đó công thức góc quay của hình lập phương sẽ là:

```
ms * Math.PI / 1000
```

Giải thích công thức:

- Chúng ta chia 1000 để chuyển về giây
- Math.PI chính là một nửa vòng tròn. Mỗi giây chúng ta xoay được nửa vòng, vậy 2 giây sẽ quay được một vòng.

Chúng ta sẽ sửa lại code như sau:

```javascript
createCube() {
    // ...
    cube.tick = (ms) => {
        cube.rotation.y = ms * Math.PI / 1000;
    };
    // ...
}

update(ms) {
    this.cube.tick(ms);
}

render(ms = 0) {
    this.update(ms);
    // ...
}
```

[Ví dụ 01.08 - Animation theo khoảng thời gian đã trôi qua](https://static.lockex1987.com/learn-threejs/chapter-01/01-08-animation-by-elapsed-time.html)