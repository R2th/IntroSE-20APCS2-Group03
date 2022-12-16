Three.js có một số Camera Controls mà bạn có thể sử dụng để điều khiển Camera di chuyển bên trong cảnh. Các Controls này không nằm trong file thư viện core của Three.js ở thư mục `build` mà được để trong các file trong thư mục `examples/jsm/controls`. File thư viện core của Three.js tập trung vào render thôi.

Chúng ta sẽ tìm hiểu OrbitControls và TrackballControls. Bản thân tôi thấy hai cái đó là đã đáp ứng đủ nhu cầu. Còn một số khác như FirstPersonControls, FlyControls, DragControls, PointerLockControls,... khi sử dụng tôi thấy khá là chóng mặt, khó điều khiển.

Khi sử dụng các Controls này, bạn không cần thiết lập `position` của Camera cũng như gọi phương thức `lookAt()` bằng tay nữa. Bạn có thể rotate, pan và xem cảnh từ tất cả các góc độ. Bạn có thể zoom in để kiểm tra một chi tiết nhỏ nào đó, hoặc zoom out để xem tổng quan của cảnh.

### Load thư viện

Chúng ta không thể sử dụng class THREE.OrbitControls từ core (không có class đó). Chúng ta sẽ load class OrbitControls từ file trong thư mục `examples` theo kiểu module như sau:

```javascript
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
```

Bạn có thể load từ CDN từ địa chỉ:

[https://unpkg.com/three@0.137.5/examples/jsm/controls/OrbitControls.js](https://unpkg.com/three@0.137.5/examples/jsm/controls/OrbitControls.js)

Lần đầu tiên làm như vậy, bạn có thể bị lỗi JS như sau:

```
Uncaught TypeError: Failed to resolve module specifier "three". Relative references must start with either "/", "./", or "../".
```

Đó là do ở đầu file `OrbitControls.js` có đoạn import thư viện core như sau:

```javascript
import {
    EventDispatcher,
    MOUSE,
    Quaternion,
    Vector2,
    Vector3
} from 'three';
```

Ở vị trí bên trong của file đó, trình duyệt sẽ không hiểu 'three' là gì, ở đâu nên sẽ có lỗi trên.

Chúng ta có thể download file về local và sửa lại câu lệnh import như sau:

```javascript
import {
    EventDispatcher,
    MOUSE,
    Quaternion,
    Vector2,
    Vector3
} from 'https://unpkg.com/three@0.137.5/build/three.module.js';
```

Sau đó, chúng ta sẽ import class OrbitControls từ file local chứ không phải file từ CDN nữa.

Có cách khác hiện đại hơn để khắc phục lỗi trên là sử dụng importmap. Đây là cách mà chúng ta sẽ sử dụng.

Ở file HTML, chúng ta khai báo thẻ script như sau:

```html
<script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.137.5/build/three.module.js"
        }
    }
</script>
```

Khi đó, ở trong file OrbitControls.js ở CDN, khi import từ 'three', trình duyệt sẽ hiểu đó là từ https://unpkg.com/three@0.137.5/build/three.module.js và sẽ không lỗi nữa.

Bạn có thể tìm hiểu thêm về importmap ở các link sau:

[How to Dynamically Import JavaScript with Import Maps | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-dynamically-import-javascript-with-import-maps)

[Using ES modules in browsers with import-maps - LogRocket Blog](https://blog.logrocket.com/es-modules-in-browsers-with-import-maps/)

[Import maps | Can I use...](https://caniuse.com/import-maps)

Ở phiên bản 127, file trên CDN vẫn load kiểu tương đối như sau:

[https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js](https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js)

```javascript
import {
	EventDispatcher,
	MOUSE,
	Quaternion,
	Spherical,
	TOUCH,
	Vector2,
	Vector3
} from '../../../build/three.module.js';
```

Nếu bạn sử dụng phiên bản từ 127 trở về thì cứ import bình thường, không cần sử dụng importmap. Từ phiên bản 128 trở đi, file trên CDN bắt đầu sửa lại kiểu `import { ... } from 'three'`. Khi đó hãy sử dụng importmap.

### OrbitControls

OribtControls là một cách tốt để rotate và pan một đối tượng ở giữa của cảnh. Để sử dụng nó, chúng ta cần load thư viện đúng, sau đó khởi tạo như sau:

```javascript
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.autoRotate = false;
```

Hàm khởi tạo có hai tham số. Ở tham số thứ nhất chúng ta truyền đối tượng Camera của Three.js. Ở tham số thứ hai, chúng ta truyền phần tử DOM canvas trong trang. Chúng ta có thể lấy phần tử này thông qua `renderer.domElement`.

Bạn có thể điều khiển Camera như sau:

- Giữ chuột trái và di chuyển: rotate (xoay) Camera xung quanh tâm của cảnh
- Giữ chuột giữa và di chuyển, hoặc scroll chuột giữa: zoom
- Giữ chuột phải và di chuyển: pan

[Ví dụ 04.01 - Orbit Controls](https://static.lockex1987.com/learn-threejs/chapter-04/04-01-orbit-controls.html)

![04.01 - Orbit Controls](https://static.lockex1987.com/learn-threejs/screenshots/04-01-orbit-controls.png)

[Orbit Controls | Documentation](https://threejs.org/docs/#examples/en/controls/OrbitControls)

#### Quán tính

Khi người dùng dừng thao tác với cảnh, Camera sẽ dừng đột ngột. Các đối tượng trong thế giới thật có quán tính và không bao giờ dừng đột ngột như vậy. Để cho việc điều khiển chân thực hơn, chúng ta có thể thiết lập thuộc tính `enableDamping` của đối tượng Controls bằng `true`. Khi đó, việc điều khiển sẽ chầm chậm lại và kết thúc sau một vài frame. Tuy nhiên, chúng ta sẽ phải gọi `orbitControls.update()` trong vòng lặp animation nếu bạn để `enableDamping` (hoặc `autoRotate`) bằng `true`.

#### Render khi yêu cầu

Ở một số cảnh tĩnh, chúng ta không nhất thiết phải sử dụng vòng lặp animation, vì nó có thể gây tốn hiệu năng, tốn pin trên các thiết bị di động. Ở một số trường hợp, chúng ta nên chọn giải pháp chỉ render lại cảnh khi yêu cầu thay vì render lại cảnh ở mỗi frame sử dụng vòng lặp animation.

Ứng dụng của chúng ta giờ đã có thêm OrbitControls. Mỗi khi người dùng tương tác với cảnh, Camera sẽ được di chuyển đến vị trí mới và chúng ta sẽ cần render lại cảnh, nếu không, chúng ta sẽ thấy Camera đứng im. Nếu chúng ta sử dụng vòng lặp animation thì đây không phải là vấn đề. Tuy nhiên, nếu chúng ta không sử dụng mà chỉ render khi yêu cầu, chúng ta có thể lắng nghe sự kiện change của OrbitControls. Sự kiện này được fire bất cứ khi nào người dùng tương tác di chuyển Camera. Code như sau:

```javascript
orbitControls.addEventListener('change', () => {
    renderer.render(scene, camera);
});
```

### TrackballControls

Chúng ta tạo TrackballControls với tham số Camera và canvas giống OrbitControls như sau:

```javascript
this.trackballControls = new TrackballControls(this.camera, this.renderer.domElement);
this.trackballControls.rotateSpeed = 1;
this.trackballControls.zoomSpeed = 1;
this.trackballControls.panSpeed = 1;
```

Bạn có thể điều khiển Camera như sau:

- Giữ chuột trái và di chuyển: rotate (xoay)
- Giữ chuột giữa và di chuyển, hoặc scroll chuột giữa: zoom
- Giữ chuột phải và di chuyển: pan

Có một số các thuộc tính mà bạn có thể điều chỉnh cho TrackballControls như `rotateSpeed`, `zoomSpeed`, `panSpeed`, `noZoom`,...

Với TrackballControls, bạn không thể sử dụng kỹ thuật render khi yêu cầu mà phải sử dụng vòng lặp animation. Bạn cũng luôn cần gọi phương thức `trackballControls.update()` trong vòng lặp.

Khi trình duyệt (thẻ canvas) bị resize, bạn cũng nên gọi phương thức `trackballControls.handleResize()`.

[Ví dụ 04.02 - Trackball Controls](https://static.lockex1987.com/learn-threejs/chapter-04/04-02-trackball-controls.html)

[Trackball Controls | Documentation](https://threejs.org/docs/#examples/en/controls/TrackballControls)