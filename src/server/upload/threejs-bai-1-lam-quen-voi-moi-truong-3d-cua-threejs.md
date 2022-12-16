![](https://images.viblo.asia/fe270541-f5e1-4889-b5f1-1d0f2c66c49a.gif)

# Giới thiệu về ThreeJS
Trước khi đi vào tìm hiểu xem tạo 3D với ThreeJS như thế nào, trước tiên nên xem xét vài khái niệm cơ bản tạo nên ThreeJS đã nhé:
## WebGL
### Hình ảnh Raster
Trong bài [Vẽ với SVG](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-4-ve-bang-svg-Qpmlea0Nlrd#_gioi-thieu-svg-1), mình đã giới thiệu về hình ảnh vector rồi, và nếu đã đọc hoặc biết về hình ảnh vector, mọi người sẽ biết về lợi thế rất lớn của hình ảnh vector: khả năng zoom vô tận mà ko làm mờ ảnh. Giờ mình sẽ đem đến thêm 1 khái niệm: Hình ảnh Raster.

Nhiều người có thể nhầm lẫn giữa 2 hình ảnh này, nhưng thực tế là có chút khác nhau:

 - Hình ảnh raster được tạo ra bởi các điểm ảnh, mỗi màu khác nhau, sắp xếp để hiển thị một hình ảnh.
 -  Hình ảnh vector sử dụng các điểm rời rạc,các đường và các vùng tương ứng vs các đối tượng rời rạc thông qua tên hoặc mã số quy định. Sự khác biệt chính là các pixel hình ảnh raster không giữ lại được diện mạo khi kích thước tăng lên - khi bạn phóng to một bức ảnh lên, nó sẽ trở nên mờ vì lý do này. Hình ảnh Vector giữ lại hình dạng bất kể kích thước, vì các công thức toán học chỉ ra cách hiển thị hình ảnh.
 
 Lần đầu đọc tới đây mình cũng hơi confused, nhưng dễ hiểu là như này: hình ảnh vector là đường nối các điểm không có kích thước, ko chiếm diện tích, tạo nên 1 hình dạng, giống như trò nối các điểm thành hình vậy. Còn hình ảnh raster là các pixel màu xếp cùng nhau tạo nên hình ảnh có màu sắc (giống tivi màn hình lồi ngày xưa này)
 
 ![](https://images.viblo.asia/88fcfe03-acc8-4b1c-bc92-7c42d1a481c7.png)

**Ưu nhược điểm của raster và Vector**

 Hình ảnh Raster có thể hiển thị vô số màu sắc trong một hình ảnh duy nhất và cho phép chỉnh sửa màu sắc nhiều hơn vector. Chúng có thể hiển thị sắc nét các điểm ảnh ở độ phân giải.

Hình ảnh vector có thể mở rộng, để cùng một hình ảnh có thể được thiết kế một lần và thay đổi kích cỡ bất kỳ cho bất kỳ ứng dụng kích thước nào - từ thẻ kinh doanh sang bảng quảng cáo.
 
Hình ảnh Raster không thể phóng lớn mà không bị mất chất lượng. Hình ảnh vector không thể hiển thị chất lượng tự nhiên của ảnh. Hình ảnh Raster thường là tệp lớn, trong khi các hình ảnh vector tương đối nhẹ. Hình ảnh Raster được sử dụng trong web và in.

### WebGL là gì?
WebGL (Web Graphics Library) đôi khi được hiểu đơn giản là 1 3D API. Thực tế thì WebGL là 1 rasterization engine (tạo các hình ảnh Raster). Nó sẽ vẽ các điểm, đường và tam giác theo code mà bạn viết. Vì vậy, làm việc với WebGL tức là bạn đưa code để WebGL sử dụng các điểm, đường và tam giác (tại sao lại tam giác thì bởi vì 1 tam giác định nghĩa được 1 mặt phẳng nhé :D) tạo nên những gì bạn muốn. WebGL là công cụ tạo 3D graphics ở low-level cho web, dựa trên OpenGL ES. WebGL là 1 plugins miễn phí tạo hình ảnh 3D trên browser cho web.

## Canvas
Canvas là 1 phần tử của HTML5 sẽ được sử dụng làm trình kết xuất đồ họa cho ThreeJS. Các bạn có thể xem thêm về Canvas tại bài này: 
https://viblo.asia/p/gioi-thieu-html5-canvas-PjxMeV6gG4YL

## ThreeJS
ThreeJS là thư viện JS sử dụng WebGl để vẽ 3D. Tức là WebGL sẽ build hình ảnh 3D dựa theo code ThreeJS của bạn để vẽ các điểm, đường và tam giác. ThreeJS giúp chúng ta tạo nên các hình ảnh 3D trên brower chỉ bằng JS mà không cần phải tại platform, application nào để người dùng có thể trải nghiệm hình ảnh 3D.

Để biết những gì ThreeJS có thể làm được, hãy nghía qua trang chủ của ThreeJS xem các Project nhé: https://threejs.org/

Còn với cái hình Miku 3D ở đầu bài ấy, đó là 1 Project của master nào ý, không phải của mình, mình chưa đạt tới trình độ đó nên chưa hướng dẫn các bạn làm cái đó được đâu :D
https://threejs.org/examples/#webgl_loader_mmd
# Tìm hiểu
## Cấu trúc để build 3D three.js app

![](https://images.viblo.asia/1a5ca103-05c9-4be9-b283-8155e16a1c47.png)

Mọi app được xây dựng bằng ThreeJS (và hầu hết các real-time 3d app) sẽ có các thành phần chính như sau:
 - `Scene`: Component này sẽ chứa mọi thứ, giống như là 'vũ trụ thu nhỏ' vậy, là nơi mà các 3D object tồn tại
 - `Camera`: Giống như là camera trong thế giới thực, bạn sẽ sử dụng nó để xem 'scene' (kiểu máy chiếu ấy)
 - `Canvas`: Phần tử HTML canvas, cái này giống như 1 bức tranh (hay cái màn chiếu) trống, và threejs sẽ vẽ vời lên đây.
 - `Renderer`: 1 thứ 'máy móc' với input là `camera` và `scene` và output là vẽ những hình ảnh hiển thị trên `canvas`

=> Hiểu đơn giản như này: camera của điện thoại chính là `camera`, bạn chụp ảnh thì chỉ có thể chụp được trong tầm nhìn của camera (xa thì bị mờ), vì vậy camera chính là thứ quyết định bạn có thể xem được cảnh - `scence` gì. Lúc này điện thoại đóng vai trò là `renderer` lấy ra các cảnh - `scene` được camera ghi lại và chiếu lên màn hình điện thoại - `canvas` cho chúng ta nhìn. 

Trong hình trên còn có `Mesh` chưa được nhắc tới. Tất cả những thứ `scene`, `camera`, `canvas`, và `renderer` đều không phải là thứ ta nhìn thấy trên màn hình điện thoại (Canvas là nơi chứa - tức màn hình điện thoại, không phải là hình ảnh trên màn hình). Những object hình ảnh trên màn hình chính là `Mesh`. `Mesh` thường được mô tả như lưới. Lưới càng dày càng chính xác.

![](https://images.viblo.asia/a879a93c-56c1-4dae-be4b-ee2099c1462b.jpg)

1 đối tượng `mesh` là vỏ chứa hình **geometry** và chất liệu **material** của đối tượng và định nghĩa ra vị trí đối tượng trong không gian 3 chiều. `Geometry` là thứ định nghĩa tạo nên hình dạng cho đối tượng, còn `Material` cho hiệu ứng bề mặt của đối tượng trông sẽ như thế nào.
# Xây dựng đối tượng đầu tiên
Code xem trước: https://codepen.io/bunnypi04/pen/xxVOmyy
{@embed: https://codepen.io/bunnypi04/pen/xxVOmyy}

Như đã nói ở mục Tìm hiểu/Cấu trúc để build 3D phía trên, cần có 3 thứ chính: Renderer, Camera, và Scene. Cú pháp tạo như sau:
```javascript
        var scene = new THREE.Scene();
		var renderer = new THREE.WebGLRenderer();
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
```
## Camera
OK, 2 dòng đầu thì có vẻ đơn giản là cú pháp ThreeJS bình thường. Tuy nhiên đến cái `camera` thì có vài tham số chưa biết là cái gì đây. Như cái tên: `PerspectiveCamera` thì bạn sẽ hiểu ngay là camera cần được khởi tạo **perspective** như các bài CSS 3D trước mình đã nhắc tới. Chính xác thì cấu trúc như sau:
```
PerspectiveCamera(fov : Number, aspect : Number, near : Number, far : Number)
```

- `fov`: (field of view) tham số này định nghĩa góc có thể nhìn được, tức là camera có thể nhìn được bao nhiêu sẽ dựa vào tham số này, có đơn vị đo góc là `deg`, range là 1 tới 179 deg. Nó cũng định nghĩa ra kích cỡ độ lớn của vật thể khi ở xa so với vật thể khi ở gần camera.

![](https://images.viblo.asia/ae0c1bdd-e5ef-46dc-be8e-9199c78e1c06.jpg)

- `aspect`: Tham số chỉ ra tỉ lệ của camera (kiểu như kích cỡ của video phim chuẩn là tỉ lệ 16:9 ấy). Ở đây mình dùng chính tỉ lệ của màn hình web hiện tại làm tỉ lệ nên nó là: `window.innerWidth / window.innerHeight`
 - `far` và `near`: Tham số tương tự như `perepective` trong css, chỉ ra giới hạn xa gần của camera. `Far` là điểm cực xa của camera (default là 2000), `near` là điểm cực gần của camera (default là 0.1), tất nhiên là `far` luôn phải lớn hơn `near`
 
 Thực tế trong ThreeJS có 2 loại camera: 
  - PerspectiveCamera
  - OrthographicCamera
 
 Cái phức tạp hơn là **PerspectiveCamera** sẽ cho hình ảnh khá 'thật' hơn, và mình đã giải thích như trên nên về **OrthographicCamera** các bạn có thể hiểu đơn giản theo hình sau:
 
 ![](https://images.viblo.asia/68b84b3e-e642-43e4-b927-b6f65825fd21.png)
 
##  Renderer
Ngay sau khi khai báo `renderer`, cần thêm 1 bước mới hoàn thành khởi tạo renderer:
```
renderer.setSize(window.innerWidth, window.innerHeight);
```
Bước này sẽ tạo 1 `canvas` để chứa các object của chúng ta với kích thước như mình set là bằng luôn kích cỡ màn hình web.

Trong project mẫu của mình, phần body của html như sau:

![](https://images.viblo.asia/2e79946e-ac40-4642-b615-2e7100098ebb.gif)

Như các bạn thấy, là... chả có gì cả :D. Vậy thì làm thế nào các phần tử phía trên cùng canvas chưa nó kia được insert vào?

Trả lời là lệnh quen thuộc: `document.body.appendChild()`. ThreeJS `renderer` sẽ được inject vào thông qua lệnh: `renderer.domElement`

```javascript
document.body.appendChild(renderer.domElement);
```
## Hình dung canvas vừa tạo
Lúc này, mở project của các bạn lên trình duyệt, sẽ thu được: 1 màn đen thui trống không =)). Bởi vì bạn chưa có cho object nào vào cả nên lúc này chỉ thấy 1 màn canvas dài rộng bằng màn hình web màu đen thôi. Đây chính là không gian chưa object sẽ tạo. Giờ làm vài step nho nhỏ: f12 web của bạn lên, resize màn hình web nhỏ lại, VD như chọn responsive màn ipad chẳng hạn. Reload lại trang. Giờ responsive kéo rộng kích cỡ màn hình ra, bạn sẽ thấy là phần chênh sau khi kéo ra là 1 khoảng trắng. Khoảng màu đen chính là kích cỡ canvas của mình đã render ra với kích cỡ bằng chiều dài + rộng của màn hình web ban đầu, tuy nhiên khi chúng ta resize lại màn hình thì ko có cái gì được render lại cả, vì vậy nên nó vẫn giữ nguyên kích cỡ như vậy, phần còn lại màu trắng là phần dư `<body>` của html. 

## Thêm object đầu tiên
ThreeJS có rất nhiều object mẫu để bạn thử dùng mà chỉ việc copy - paste code mẫu vào dòng tiếp theo đoạn code trên thôi. Vào đây: https://threejs.org/docs/#api/en/core/Geometry và nhìn sang menu bên trái, kéo xuống khu vực **Geometry** và sẽ có 1 đám Geometry được viết sẵn chỉ cần dùng thôi :D. Ở đây mình chọn **[SphereGeometry](https://threejs.org/docs/#api/en/geometries/SphereGeometry)** làm mẫu.
```javascript
var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
```

Như đã nói ở trên, để thể hiện các vật thể trong `scence`, cần có  các `mesh`, mesh thì bao gồm geometry và material.
Trước khi add mesh vào scene, cần 2 khởi tạo thằng geometry và material nữa:

```javascript
var geometry = new THREE.SphereGeometry( 5, 32, 32 );
```

Dòng này khai báo loại Geometry mà bạn định insert. 3 tham số bên trong chính là kích thước của object 3D này. Tùy hình dạng của Geometry sẽ có nhiều tham số khác nhau, các bạn hãy đọc mô tả trên ThreeJS.

```javascript
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
```
Ở đây sử dụng luôn basic material của ThreeJS, bên trong là mảng các tham số style cho lớp material bề mặt này, như ở đây là đường viền màu #ffff00 dưới dạng 0x - tức là dạng hexa. Trong ví dụ có 1 tham số hơi lạ được thêm vào: 
```javascript
var material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
//wireframe false will not show wireframe
```

Wireframe ở đây là 'khung' hay đường lưới mesh của vật thể. Đặt giá trị `true` sẽ bỏ qua material bề mặt và show cho ta thấy mesh trông như nào.

Bước cuối là tạo mesh từ geometry và material vừa có được rồi insert vào scene để có thể thấy trên canvas html thôi
```javascript
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
```
## Sử dụng renderer để render ra mọi thứ đã tạo

Để có thể hiển thị được mọi thứ, cần phải sử dụng renderer để render từ input là scene và camera ra canvas html:

```javascript
renderer.render(scene, camera);
```

## Camera position

Đến bước này, mặc dù đã có các nguyên liệu chính cần thiết, tuy nhiên là geometry của bạn hiển thị 1 cách rất kỳ lạ, ko nhìn được toàn bộ vật thể. 
Để hiển thị mọi thứ cần thêm 1 thứ, là **camera position**. 

Mặc định thì mọi thứ mà chúng ta tạo sẽ được đặt tâm tại điểm (0, 0, 0) trong hệ tọa độ 3D. Camera cũng vậy, hiện tại nó đang đặt ở vị trí (0, 0, 0) nên nếu muốn nhìn toàn bộ hình geometry vừa tạo, cần di chuyển camera ra xa vật thể. 

Có thể set camera position theo 2 cách:
```javascript
//cách 1: set tất cả 2 tọa độ cùng lúc:
camera.position.set( 0, 0, 10 );

//cách 2: set lẻ tọa độ trong TH có tọa độ nào vẫn giữ nguyên tại vị trí default thì có thể bỏ qua:
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;
```
## Thành quả

Giờ thì bạn đã có thể nhìn thấy vật thể của mình theo 1 cách gần như là cơ bản nhất trên màn hình web rồi :D. Mình có thêm vài thứ để cho hình sinh động hơn, các bạn có thể thêm bớt các phần tử để quan sát các giải thích từng bước phía trên của mình nhé:
https://codepen.io/bunnypi04/pen/xxVOmyy

{@embed: https://codepen.io/bunnypi04/pen/xxVOmyy}
# Kết
Bài đầu tiên chỉ tới đây thôi, hãy chờ các bài tiếp theo của mình để nâng tầm các project với ThreeJS nhé. Hy vọng rằng nó giúp được nhiều bạn trong việc tìm hiểu thư viện tuyệt vời này :D