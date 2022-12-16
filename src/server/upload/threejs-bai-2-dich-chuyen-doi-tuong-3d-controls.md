Tiếp theo phần làm quen với ThreeJS, bài này sẽ là làm quen với 1 vài controls (điều khiển) trong ThreeJS nhé. Tiếp tục từ PJ lần trước: 

{@embed: https://codepen.io/bunnypi04/pen/xxVOmyy}

Để mở đầu cho bài viết, mời các bạn ghé qua xem demo lấy động lực: https://threejs.tothemoon-min.com/

Dưới đây là source cơ bản cho bài viết này:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Three JS</title>
    <script type="text/javascript" src="js/three.js"></script>
</head>
<body>
    <script type="text/javascript">
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // create the shape
        var geometry = new THREE.SphereGeometry(1, 8, 5); // size of box

        //create material, color or image
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} ); //wireframe false will not show wireframe
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 3;

        //game login
        var update = function() {
        };

        // draw scene
        var render = function() {
            renderer.render(scene, camera);
        };

        //run gameloop (update, render, repeat)
        var GameLoop = function() {
            requestAnimationFrame(GameLoop);
            update();
            render();
        };

        GameLoop();
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

# Responsive canvas

![](https://images.viblo.asia/92d62a14-80be-4f86-89a4-e4c36b0402f3.gif)

Nếu mọi người thử responsive cho window của chúng ta, chẳng hạn thu nhỏ Chrome lại rồi kéo dãn thu nhỏ các chiều của trình duyệt, thì bạn sẽ thấy là Object của chúng ta như kiểu bị 'position: fixed' trên màn hình vậy, ko hề thu phóng hay đổi vị trí. Giờ Refresh lại, thấy object lại về đúng ở giữa rồi :D. CHú ý 1 chút thì sẽ nhận ra là cái nền màu đen (là màu xanh ở trong codepen cho đẹp :D) bị giữ nguyên kích thước của lúc load ra, tức là canvas khi bạn load page đã được tính toán kích cỡ rồi, không thay đổi khi bạn responsive màn hình. Kéo theo đó là mọi thứ trong canvas (cụ thể là cái hình Sphere) sẽ cố định theo canvas này. Lý do thì là vì đoạn code này:

```javascript
renderer.setSize(window.innerWidth, window.innerHeight);
```
Tức là khi render đã xác định kích cỡ Canvas rồi.


Trong trường hợp bạn thích thế thì chả sao cả, nhưng nếu mà muốn nó responsive, mình sẽ hướng dẫn :D.

Đầu tiên tất nhiên là phải bắt được sự kiện responsive màn hình, ở đây sẽ sử dụng `eventListener`
```javascript
window.addEventListener('resize', function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
```
Giải thích: Chúng ta bắt sự kiện thay đổi của web app, mỗi khi có sự thay đổi, sẽ set lại màn hình như khi bắt đầu render: chiều rộng chiều dài và tỉ lệ perspective camera. Lúc này hàm `camera.updateProjectionMatrix` sẽ thực hiện công viện update kích cỡ canvas cho bạn.
# Sử dụng con trỏ (chuột) để xoay
![](https://images.viblo.asia/cccfd3ce-395e-465f-8c68-ef6ce8cb2be4.gif)

Hình ảnh gif chất lượng ko cao nên có thể bạn thấy ko được rõ lắm, nhưng chắc cũng thấy mờ mờ: mình sử dụng chuột click vào khối 3D của mình và kéo qua lại, khối ấy được xoay qua lại theo con chuột. Nhìn tưởng phức tạp thế thôi chứ ThreeJs có sẵn hỗ trợ rồi: 1 dòng code + 1 dòng khai báo thư viện :D

Để trải nghiệm trước khi làm, các bạn vào đây nhé: https://threejs.org/examples/?q=control#misc_controls_orbit

Để sử dụng được tool, trước tiên là cần import tool vào đã:
 - Nếu bạn đã tải souce ThreeJS về máy, hãy vào theo directory sau: `three.js-master/examples/js/controls/OrbitControls.js`  và copy file này vào folder PJ của bạn
 - Nếu chỉ muốn dùng link cdn thôi, thì import link này nhé: https://threejs.org/examples/js/controls/OrbitControls.js

Và nhớ insert link đường dẫn tới file OrbitControls vào header của Project nhé.

Giờ là 1 dòng code duy nhất:
```javascript
controls = new THREE.OrbitControls(camera, renderer.domElement);
```

Giờ hãy refresh lại và thử thành quả nhé :)
https://codepen.io/bunnypi04/pen/VwaVzow

{@embed: https://codepen.io/bunnypi04/pen/VwaVzow}

Thoạt qua bạn sẽ nghĩ là chúng ta đang di chuyển khối hình, nhưng thử dùng chuột phải và di chuyển mà xem, có gì đó sai sai =)). Trên thực tế, chúng ta đang di chuyển là cái **center point** của không gian 3D, hay là chúng ra đang xoay cả vũ trụ canvas :D

# Drag - Di chuyển đối tượng
https://threejs.org/examples/?q=controls#misc_controls_drag

Tiếp theo OrbitControls là 1 `Control` khác, đó là `DragControls`. Như cái tên của nó, bạn có thể drag, drop các item trong phạm vi canvas. Và tất nhiên là chúng ta có tool =))

Việc trước hết tất nhiên là cài tool: vẫn như trên, khai báo đường dẫn tới file `DragControls.js`: https://threejs.org/examples/js/controls/DragControls.js Hoặc copy từ thư mục Example trong source Three.js

Việc thứ 2 thì lại là 1 dòng code:
```javascript
controls = new THREE.DragControls([cube], camera, renderer.domElement );
```
Ở đây khác với Orbit, bạn phải truyền thêm đối tượng vào nữa. Những đối tượng nào có thể move thì sẽ bỏ vào 1 mảng, và insert mảng vào trong `controls` để sử dụng drag. Và thành quả là đây:
https://codepen.io/bunnypi04/pen/KKzbPmo?editors=0010
{@embed: https://codepen.io/bunnypi04/pen/KKzbPmo?editors=0010}

# Pointer Lock control - di chuyển trong không gian 3D
Mở đầu lại bằng 1 ví dụ cho hứng thú: https://threejs.org/examples/?q=controls#misc_controls_pointerlock

Với Control pointer lock này, việc tạo sẽ phức tạp hơn '1 dòng code' ở trên. Trước tiên thì link thư viện là https://threejs.org/examples/js/controls/PointerLockControls.js để mọi người import.

Giải thích 1 chút, ở đây mình sẽ làm 1 việc đấy là khi bạn click vào canvas, thì màn hình sẽ lock tâm là vị trí con chuột của bạn. Giống như kiểu các tranh 360 độ trên face book ấy. Muốn thoát ra khỏi trạng thái lock thì chỉ cần bấm Esc.

Đầu tiên thì khai báo controls 1 dòng như mọi lần: 
```javascript
controls = new THREE.PointerLockControls(camera, renderer.domElement);
```

Để có thể lock camera, cần 1 cú click, vì vậy cần define vùng click để kích hoạt sự kiện này. Ở đây mình chọn luôn thẻ Body, đặt id là 'body' luôn:

```javascript
var instructions = document.getElementById( 'body' );
```

Cuối cùng là lắng nghe sự kiện click để lock camera:
```javascript
instructions.addEventListener( 'click', function () {
    controls.lock();
}, false );
```

Giờ thì bạn có thể test lock camera rồi :D

Demo của mình đây, nhớ là bấm Esc để thoát lock camera nhé: 
https://codepen.io/bunnypi04/pen/LYNMYYR
{@embed: https://codepen.io/bunnypi04/pen/LYNMYYR}

# Trackball - xoay không gian
Với Orbit control, nếu bạn test vài lượt sẽ nhận ra là khả năng di chuyển bị giới hạn trong 1 khoảng nhất định. Để có thể di chuyển camera quanh vật thể 1 cách đầy đủ nhất, phải sử dụng tới trackball
https://threejs.org/examples/?q=controls#misc_controls_trackball

Để khai báo thư viện, thì sẽ sử dụng thư viện Trackball ConTrols: https://threejs.org/examples/js/controls/TrackballControls.js

Việc khai báo thì gần như giống với ở trên, chỉ cần truyền 2 params là camera và render dom Element là được:
```javascript
controls = new THREE.TrackballControls(camera, renderer.domElement);
```

Giờ thì lằng nhằng hơn ở trên 1 tẹo là cần thêm update controls để có thể move nữa, hãy thêm vào function update nhé:
```javascript
controls.update();
```

Vậy là hiểu thêm được 1 controls nữa:
https://codepen.io/bunnypi04/pen/QWNzjaR?editors=0010
{@embed: https://codepen.io/bunnypi04/pen/QWNzjaR?editors=0010}
# Kết
Bài tiếp theo mình sẽ bắt đầu "trang trí" cho các khối hình, mọi người hãy chờ xem nhé :D