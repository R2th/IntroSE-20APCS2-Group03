# Giới thiệu
Ở các bài trước, thì dựa vào các model có sẵn trên three.js mình đã có thể có các hình khối cơ bản như là: khối cầu, khối nón,... Tuy nhiên những hình này làm sao thỏa mãn được nhu cầu tạo dựng app 3D của chúng ta được :D. Vì vậy bài tiếp theo này sẽ hướng dẫn cách để có những model 'cool ngầu' hơn, VD như này chẳng hạn

![](https://images.viblo.asia/ff260d07-1384-4512-90be-e431c9b09c8c.png)

Trước khi vào bài đọc, hãy xem qua thành quả của buổi hôm nay trước nhé:
https://threejs.tothemoon-min.com/modelLoading/

Ngoài ra, như thường lệ, muốn biết ThreeJS có những VD nào, cứ vào examples của trang chủ threejs và search xem minh họa thôi nhé: https://threejs.org/examples/?q=loader

# Loader có những gì?
ThreeJS thường sử dụng 2 dạng model để load:: Json model, và GL Transmission Format `.glTF`. Ngoài ra thì có 1 số loại khác nữa, nhưng bài này sẽ nhắc đến 2 loại này thôi nhé.

Tất nhiên là với 1 người mới tìm hiểu, và mới biết tech chứ ko biết build model 3D thì khó mà tự tạo cho mình 1 model theo ý được. Vậy nên trong bài này sẽ hướng dẫn các bạn sử dụng nhưng model có sẵn trước nhé.

## Các định dạng tệp 3D
Định dạng tệp 3D được sử dụng để lưu trữ thông tin về các mô hình 3D, có 8 loại định dạng tệp 3D phổ biến nhất được sử dụng hiện nay: STL, OBJ, FBX, COLLADA, 3DS, IGES; STEP và VRML / X3D

Mục đích cơ bản của định dạng tệp 3D là lưu trữ thông tin về các mô hình 3D dưới dạng văn bản thuần hoặc dữ liệu nhị phân. Cụ thể, họ mã hóa hình học , ngoại hình , cảnh và hoạt hình của mô hình 3D .

Hình dạng của một mô hình mô tả hình dạng của nó. Theo ngoại hình, tức là Material, color, texture,... , vv Cảnh của mô hình 3D bao gồm Light, shadow và các vật thể ngoại vi. Cuối cùng, hình ảnh động xác định cách mô hình 3D di chuyển.

Tuy nhiên, hiện tại có quá nhiều định dạng tệp 3D, đôi khi phần mềm mà bạn muốn sử dụng chỉ hỗ trợ 1 loại định dạng của riêng họ, VD như AutoCAD sẽ yêu cầu định dạng DWG chẳng hạn. Giờ bạn muốn chia sẻ model của bạn cho 1 người bạn, nhưng bạn của bạn ko dùng AutoCAD, mà dùng Blender, chỉ hoạt động với tệp BLEND, thế là việc chia sẻ trở nên khó khăn rồi :(. 

Để giải quyết vấn đề chia sẻ, các định dạng trung tính hoặc nguồn mở được phát minh làm trung gian chuyển đổi giữa các định dạng độc quyền, vì vậy các định dạng trung tính này trở nên phổ biến nhất hiện tại. 2 định dạng trung tính nổi tiếng nhất là STL (đuôi .STL) và COLLADA (đuôi .DAE)

Với các file này, có thể dễ dàng tìm được công cụ online để chuyển đổi sang các định dạng mong muốn sử dụng. Vì vậy, khi đi tìm các model 3D mà không tìm thấy định dạng mong muốn, thì 90% sẽ có định dạng Collada (.dae) rồi sử dụng tool convert về định dạng mong muốn nhé

## Thư viện
Để tìm 1 vài model có sẵn, các bạn có thể lên trên https://clara.io/library để tìm 1 vài model free đẹp đẹp nhé. Sau khi chọn được model ưng ý, thì chọn định dạng xuất file model ra để tải về là được.

Ngoài ra thì trên [Sketchfab.com](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount) có rất nhiều model đẹp hơn clara.io, tuy nhiên là không phải cái nào cũng tải về được, các bạn có thể sử dụng để tham khảo thêm nhé.

Để load các models vào app, cần có file `ObjectLoader.js` . Trong folder source ThreeJS đã tải về từ trang chủ, các bạn vào đây copy thư viện ra để dùng nhé: `three.js-master/src/loaders/ObjectLoader.js`

## Json loader
Đây là dạng Loader khá là dễ hiểu, dễ sử dụng. Về cơ bản, đây là 1 file json mà thôi. File json này sẽ chứa các thông tin các hình khối, ghép lại cấu tạo nên 1 Model hoàn chỉnh, bao gồm: material, textures, images, objects, geometries,...

### Chú ý quan trọng

Clara.io là 1 nguồn đa dạng các model 3D, tuy nhiên với đa số các model Json được lấy từ đây thì không còn được các phiên bản ThreeJS mới hiện tại hỗ trợ load nữa. Theo như mình hiểu thì hình như là do thay đổi format cho json thì phải. Dưới đây sẽ là hướng dẫn load json file cơ bản. Tuy nhiên các file Json bạn lấy về có dùng được không thì còn tùy (lol). Mình sẽ bonus 1 nguồn source để bạn sử dụng thay thế nếu muốn load các model json phổ biến trên clara.io nhé.

À, đừng quên chạy môi trường để đề phòng trường hợp không load được nhé (mình có giải thích trong bài trước rồi đó):
```
php -S 127.0.1.1:1000
```

### Load model
Để lấy 1 vài ví dụ về json sử dụng được, trong folder ThreeJS mà bạn tải về từ trang chủ, vào folder: `examples/models/json/` bạn sẽ thấy 1 vài model json mẫu. 

![](https://images.viblo.asia/461f3ec4-250f-4fe4-a5ee-5f706ec4a083.png)

Mình sẽ copy cái `teapot` để làm mẫu nhé. Thường thì với các Json model tải về trên các nguồn, sẽ có file json (tất nhiên) đi kèm với vài texture - lớp 'da' của model. Nếu có thì hãy copy hết nhé. Tạo 1 folder `models` trong Project, và paste hết đám đó vào:

```
threejs
|--images
|--js
    |--three.js
    |--ObjectLoader.js
    |--OrbitControls.js
    |--JSONLoader.js (only include in old threejs version, removed in current threejs version)
|--models
    |--teapot-claraio.json
|--index.html
```
Giờ, start với 1 file html gồm các item cơ bản cho app threejs nhé: bao gồm scene, camera, renderer, controls, update function,... Các bạn có thể xem file cơ bản tại đây nhé: https://codepen.io/bunnypi04/pen/xxVOmyy

Hãy xóa object thừa đi nhé

Khai báo thư viện:
```html
    <script type="text/javascript" src="js/three.js"></script>
    <script type="text/javascript" src="js/OrbitControls.js"></script>
    <script type="text/javascript" src="js/ObjectLoader.js"></script>
```

Sau khi có tất cả mọi thứ base rồi, giờ tới phần models nào. Trước tiên, đương nhiên là khai báo Loader: 

```js
var loader = new THREE.ObjectLoader( );

// Tiếp theo là load model vào:
loader.load(
    //model here
    'models/teapot-claraio.json',

    function(object) {
        scene.add(object);
    }
);

//để có thể tương tác với model, mình thêm 1 cái OrbitControls nữa:
controls = new THREE.OrbitControls(camera, renderer.domElement);
```
Giờ thì có thể refresh lại, và xem nhé: 

![](https://images.viblo.asia/15b17fae-d8de-44b5-84c4-682496a4bbfd.gif)

Đen thui :D. Để nhìn cho rõ hơn thì thêm 1 ít ánh sáng vào nhé:

```js
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);
```
Giờ thì có cái ấm trà (không hiểu sao lại là) màu hường rồi.
![](https://images.viblo.asia/9b05d898-a2f9-4d57-9bc1-4f09dfe54b6d.png)

### Load các model trên clara.io
Như đã nói, việc load json model đã bị hạn chế rất nhiều từ các bản cập nhật mới, nên nếu áp dụng cách trên với nhiều json file sẽ không load ra được cái gì cả. Để vẫn có thể sử dụng được các file json này, chúng ta cần thay đổi source `three.js` và các control, loader bằng version cũ hơn. Cụ thể ở đây là các version cũ, thì sẽ sử dụng `JSONLoader` để load json file, nhưng version mới thì file này đã 'bay màu', và ThreeJS khuyến khích sử dụng định dạng `.glTF` hơn, mà cách build mình sẽ nói tiếp ở phần sau nhé.

Nếu muốn sử dụng các bạn hãy thay folder JS ở trên bằng folder này của mình nhé: https://github.com/BunnyPi04/threeJS/tree/master/modelLoading
 
 Và thành quả như đã xem đầu bài: https://threejs.tothemoon-min.com/modelLoading/

Trong VD này, mình sử dụng json model tải từ đây: https://clara.io/view/1a03ac6b-d6b5-4c2d-9f1a-c80068311396#

![](https://images.viblo.asia/657ab174-88d7-42d6-bb4c-d432c7f37192.png)

## glTF Loader
### Về glTF
**glTF (GL Transmission Format)** là định dạng file dành cho mô hình và hoạt cảnh 3D, theo chuẩn JSON. Những người sáng lập đã miêu tả nó như thể “JPEG of 3D”.

**glTF** được kỳ vọng trở thành công cụ chuyển đổi trung gian hiệu quả, tối giản dung lượng mô hình 3D, giảm tải cho các ứng dụng sử dụng đang dùng WebGL  & APIs.

Và đây cũng là định dạng mà ThreeJS highly recommend ở các phiên bản hiện tại:
> Where possible, we recommend using glTF (GL Transmission Format).
Both .GLB and .GLTF versions of the format are well supported.
Because glTF is focused on runtime asset delivery, it is compact to transmit and fast to load.
Features include meshes, materials, textures, skins, skeletons, morph targets, animations, lights, and cameras. 

### Tải về
Với định dạng này thì trên sketchfab.com có sẵn để tải về, các bạn tìm 1 model có thể download free như dưới đây

![](https://images.viblo.asia/e87b7619-39d3-4c29-a521-2d2ad3934664.png)

rồi chọn tải về định dạng glTF nhé

![](https://images.viblo.asia/7a25cd99-6fa8-49a4-8be3-1988da729ad1.png)

Sau khi tải về, tương tự với Json, copy các 'nguyên liệu' vào thư mục 'Models' nhé.
### Run
Với glTFLoader, ta sẽ sử dụng loader tương ứng trong folder `three.js-master/src/loaders/glTFLoader.js`, và copy vào folder PJ nhé:
```html
    <script type="text/javascript" src="js/three.js"></script>
    <script type="text/javascript" src="js/OrbitControls.js"></script>
    <script type="text/javascript" src="js/glTFLoader.js"></script>
```

Để load model lên, thì cũng tương tự như khi load json, có khác 1 tẹo thôi nhé:

```js
var loader = new THREE.GLTFLoader();
loader.load(
    //model here
    'models/scene.gltf',
    (gltf) => {
        const root = gltf.scene;
        scene.add(root);
    }
);

//và thêm ít ánh sáng về bản
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(5, 50, 10);
scene.add(light);
```

Giờ có thể chạy PJ lên xem được rồi:

![](https://images.viblo.asia/f96a704b-e9c7-4b6d-8e41-22503399f6e3.png)

### Error!!!!
Đến bước này có thể sẽ có vài bạn chạy ra màn hình đen thui, ko thấy cái gì cả. F12 lên thì báo lỗi như này:

![](https://images.viblo.asia/de76b26d-e1dc-44cf-be86-c509d139100c.png)

Điều này là do version glTFLoader. Có 1 cách fix đơn giản, đấy là đổi dòng khai báo như sau:

```html
<script src="https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/loaders/GLTFLoader.js"></script>
</head>
```

Về nguyên nhân và cập nhật loader mới, mình chưa có thời gian ngâm cứu nên chưa thể có giải thích cho các bạn được, lý do chủ yếu thì là do cập nhật của ThreeJS dẫn đến sử thay đổi về cách sử dụng các loader. Mình hướng dẫn các bạn cách đơn giản nhất để sử dụng model loader với ít code nhất có thể thôi :D.

Đây là source mình sử dụng load với glTF: https://threejs.tothemoon-min.com/glTFLoader.html
# Kết
Trên đây là những hướng dẫn đơn giản nhất, ít code, sử dụng ít não nhất cho các bạn bắt đầu tìm hiểu ThreeJS muốn load Model. Hy vọng là sẽ giúp được các bạn starter tìm hiểu ThreeJS nhé :D

Toàn bộ source code của mình ở đây nhé: https://github.com/BunnyPi04/threeJS