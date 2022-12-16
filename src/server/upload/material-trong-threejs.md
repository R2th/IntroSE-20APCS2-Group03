### Giới thiệu chung

Trong Three.js, Material xác định màu của một điểm trên đối tượng (Mesh). Material quyết định đối tượng trông như thế nào: trong suốt, wireframe, sáng bóng, thô ráp, giống kim loại,... Chúng ta sẽ lần lượt tìm hiểu từng loại Material từ đơn giản đến phức tạp.

| Tên                  | Mô tả                                                        |
| -------------------- | ------------------------------------------------------------ |
| MeshBasicMaterial    | Đây là Material cơ bản để tạo cho đối tượng một màu sắc đơn giản hoặc hiển thị wireframe. Material này không bị ảnh hưởng bởi ánh sáng. |
| MeshDeptMaterial     | Sử dụng khoảng cách từ Camera đến đối tượng để quyết định màu sắc. Càng gần thì màu trắng, càng xa thì màu đen. Sự thay đổi giữa màu trắng và màu đen dựa vào các giá trị khoảng cách near và far của Camera. |
| MeshNormalMaterial   | Material đơn giản quyết định màu sắc của một mặt dựa vào normal vector (vector pháp tuyến) của nó. Không bị ảnh hưởng bởi ánh sáng. |
| MeshLambertMaterial  | Material này có sử dụng ánh sáng và tạo ra đối tượng trông mờ, không sáng bóng. Chỉ tính toán ánh sáng ở các đỉnh. |
| MeshPhongMaterial    | Material này cũng sử dụng ánh sáng và có thể tạo các đối tượng sáng bóng. Tính toán ánh sáng ở tất cả pixel. Hỗ trợ specular highlight. |
| MeshToonMaterial     | Một mở rộng của MeshPhongMaterial để làm các đối tượng trông giống như cartoon (hoạt hình). |
| MeshStandardMaterial | Material này sử dụng physically based rendering. Một model vật ký được sử dụng để quyết định cách ánh sáng tương tác với các bề mặt. Điều này cho phép bạn tạo các đối tượng chính xác và chân thật hơn. |
| MeshPhysicalMaterial | Một mở rộng của MeshStandardMaterial cho phép nhiều điểu chỉnh hơn về reflection. |

Chúng ta sẽ không tìm hiểu các Material sau:

- MeshMatcapMaterial
- PointsMaterial
- SpriteMaterial
- LineBasicMaterial
- LineDashMaterial
- ShadowMaterial
- ShaderMaterial
- RawShaderMaterial

Chúng ta cũng chưa tìm hiểu Texture (thuộc tính `map`, `bumpMap`, `envMaps`, `alphaMap`, `matcap`, `displacementMap`, `aoMap`,...). Chúng ta sẽ có chương về Texture riêng.

Có hai cách để thiết lập các thuộc tính cho Material. Cách đầu tiên ở thời điểm khởi tạo, ví dụ:

```javascript
const material = new MeshPhongMaterial({
    color: 0xFF0000, // màu đỏ (cũng có thể sử dụng xâu màu CSS ở đây)
    flatShading: true
});
```

Cách khác là sau khi khởi tạo:

```javascript
const material = new MeshPhongMaterial();
material.color.setHSL(0, 1, 0.5); // màu đỏ
material.flatShading = true;
```

Chú ý rằng kiểu `Color` trong Three.js có nhiều cách để thiết lập:

```javascript
material.color.set(0x00FFFF); // giống như kiểu CSS #RRGGBB
material.color.set(cssString); // bất kỳ xâu màu CSS nào, ví dụ 'purple',
                               // '#F32',
                               // 'rgb(255, 127, 64)'
                               // 'hsl(180, 50%, 25%)'
material.color.set(someColor); // tham số là đối tượng Color khác
material.color.setHSL(h, s, l); // trong đó h, s, l từ 0 đến 1
material.color.setRGB(r, b, b); // trong đó r, g, b từ 0 đến 1
```

Các Material cùng chia sẻ các thuộc tính được định nghĩa ở base class THREE.Material. Các thuộc tính chung hay dùng nhất là `side`, `needsUpdate`, `transparent`, `opacity`,... Ngoài ra, một số Material cũng có các thuộc tính giống nhau như `color`, `flatShading`, `wireframe`,...

Thuộc tính `color` chỉ định màu sắc của Material.

Thuộc tính `flatShading` chỉ định đối tượng trông giống các khối hay trông mượt. Giá trị mặc định là `false`.

![flatShading](https://static.lockex1987.com/learn-threejs/images/material-flatShading.png)

Nếu thiết lập thuộc tính `wireframe` bằng true thì đối tượng chỉ được render dưới dạng khung với các đường thẳng nối các đỉnh.

Thuộc tính `side` chỉ định các mặt của tam giác được hiển thị. Mặc định là THREE.FrontSide. Các giá trị khác là THREE.BackSide và THREE.DoubleSide. Hầu hết các đối tượng 3D được vẽ thường là các vật đặc nên back side - các mặt ở bên trong vật thường không cần phải vẽ. Lý do thông thưởng để thiết lập thuộc tính side là cho các mặt phẳng mà có thể nhìn thấy cả back side.

![side](https://static.lockex1987.com/learn-threejs/images/material-side.png)

Bạn cần thiết lập thuộc tính `needsUpdate` bằng `true` khi bạn thay đổi cấu hình `flatShading`, thay đổi cấu hình `transparent`, hoặc thêm / loại bỏ Texture.

Để tạo các đối tượng không phải phải đục mà có độ trong suốt nào đó, chúng ta cần thiết lập thuộc tính `opacity` từ 0 đến 1 và đồng thời thiết lập thuộc tính `transparent` bằng `true`.

### MeshBasicMaterial

MeshBasicMaterial là một Material rất đơn giản, không phụ thuộc vào ánh sáng. Các đối tượng với Material này sẽ trông đơn sắc, các vị trí đều có màu giống nhau.

![Basic vs Lambert vs Phong](https://static.lockex1987.com/learn-threejs/images/material-basic-lambert-phong.png)

MeshBasicMaterial (cùng các Material khác như Normal, Phong, Toon, Standard, Physical,...) có đều có thuộc tính `color` và `wireframe`. Bạn có thể chỉ định `color` bằng màu sắc bằng muốn, chỉ định `wireframe` bằng `true` để nhìn thấy khung của đối tượng (rất tốt để debug). Ví dụ:

```javascript
const material = new MeshBasicMaterial({
    color: 0x7777ff,
    wireframe: false
});
```

[Ví dụ MeshBasicMaterial](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#MeshBasicMaterial)

![material-basic](https://static.lockex1987.com/learn-threejs/images/material-basic.png)

### MeshDeptMaterial

Với Material này, cách các đối tượng trông không được định nghĩa bởi ánh sáng hay một thuộc tính nào đó của Material; nó được định nghĩa bằng khoảng cách của đối tượng tới Camera. Điểm ở gần Camera sẽ có màu trắng, còn điểm ở xa Camera sẽ có màu đen. Trông cảnh sẽ như có hiệu ứng fading.

MeshDeptMaterial không có nhiều các thuộc tính để chúng ta điều chỉnh cách một đối tượng được render. Tuy nhiên, chúng ta có thể điều chỉnh hiệu ứng fading nhanh hay chậm bằng các khoảng cách `near` và `far` của Camera. Khi tìm hiểu về Camera ở chương trước, chúng ta đã biết hai khoảng cách này thiết lập không gian nhìn thấy của Camera.

Khoảng cách giữa `near` và `far` định nghĩa độ sáng và tần suất các đối tượng fade out. Nếu khoảng cách là rất lớn, các đối tượng chỉ fade out một chút khi di chuyển ra xa Camera. Khi khoảng cách là nhỏ, việc fade out sẽ rõ ràng hơn.

Tạo MeshDeptMaterial rất dễ và không yêu cầu tham số nào:

```javascript
const material = new MeshDeptMaterial();
```

[Ví dụ MeshDepthMaterial](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#MeshDepthMaterial)

![Depth](https://static.lockex1987.com/learn-threejs/images/material-depth.png)

MeshDepthMaterial không có thuộc tính để thiết lập màu sắc của đối tượng. Tuy nhiên, bạn có thể kết hợp các Material để tạo hiệu ứng mới (blend). Đoạn code sau chỉ cách chúng ta kết hợp các Material:

```javascript
const depthMaterial = new THREE.MeshDepthMaterial();
const basicMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    blending: THREE.MultiplyBlending
});
const materials = [
    basicMaterial,
    depthMaterial
];

// Tham khảo THREE.SceneUtils.createMultiMaterialObject
const mesh = new THREE.Group();
materials.forEach(material => {
    mesh.add(new THREE.Mesh(geometry, material));
});
```

[Ví dụ Combine](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#Combine)

![Combine](https://static.lockex1987.com/learn-threejs/images/material-combine.png)

### MeshNormalMaterial

Chúng ta hãy thiết lập thuộc tính `flatShading` bằng `true` để dễ hình dung:

Với MeshNormalMaterial, mỗi mặt (pixel) của đối tượng được render với màu sắc hơi khác nhau. Mặc dù đối tượng có xoay, các màu sắc có vẻ vẫn gần như giữ nguyên vị trí. Điều này là do màu của mỗi mặt (pixel) dựa vào vector pháp tuyến của mặt đó. Vector pháp tuyến là vector vuông góc với mặt và hướng ra ngoài. Chúng ta có trục x là màu đỏ, trục y là màu lục, trục z là màu lam. Do đó các mặt hướng về phải sẽ có màu hồng, hướng về trái sẽ có màu aqua, hướng lên trên sẽ có màu lục nhẹ, hướng xuống dưới sẽ có màu tím, hướng về màn hình sẽ có màu lavender.

Sử dụng MeshNormalMaterial rất đơn giản:

```javascript
const material = new MeshNormalMaterial();
```

[Ví dụ MeshNormalMaterial](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#MeshNormalMaterial)

![Normal](https://static.lockex1987.com/learn-threejs/images/material-normal.png)

### MeshLambertMaterial

MeshLambertMaterial có thể được sử dụng để tạo các bề mặt mờ, không sáng bóng như gỗ, đá.

Với MeshLambertMaterial, chúng ta sẽ cần thêm ánh sáng vào trong cảnh. Nếu không, đối tượng sẽ chỉ có màu đen. Chúng ta sẽ tìm hiểu kỹ về ánh sáng (Light) ở chương sau. Còn hiện tại, chúng ta hãy sử dụng đoạn code sau để thêm ánh sáng:

```javascript
function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0x000000);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 0);
    pointLight1.position.set(0, 200, 0);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 0);
    pointLight2.position.set(100, 200, 100);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1, 0);
    pointLight3.position.set(-100, -200, -100);
    scene.add(pointLight3);
    
    /*
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(-1, 2, 4);
    scene.add(directionalLight);
    */

    return [
        ambientLight,
        pointLight1,
        pointLight2,
        pointLight3
    ];
}
```

MeshLambertMaterial cũng có các thuộc tính như `flatShading`, `wireframe` mà chúng ta đã tìm hiểu trước đó, do đó chúng ta sẽ không đi vào chi tiết các thuộc tính này nữa. Chúng ta sẽ tập trung vào hai thuộc tính quan trọng của MeshLambertMaterial là:

- `color`: Màu sắc của Material.
- `emissive`: Màu mà Material phát ra. Nó không thực sự đóng vai trò như một nguồn sáng mà là màu không bị ảnh hưởng bởi ánh sáng khác. Giá trị mặc định là màu đen.

Tạo một MeshLambertMaterial cùng một màu như sau:

```javascript
const material = new MeshLambertMaterial({
    color: '#7833aa'
});
```

[Ví dụ MeshLambertMaterial](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#MeshLambertMaterial)

![Lambert](https://static.lockex1987.com/learn-threejs/images/material-lambert.png)

### MeshPhongMaterial

Với MeshPhongMaterial, chúng ta có thể tạo các bề mặt sáng bóng như nhựa hoặc kim loại. MeshPhongMaterial cũng có các thuộc tính `color`, `emissive` như MeshLambertMaterial; ngoài ra còn có các thuộc tính `specular` và `shininess`.

Thuộc tính `specular` chỉ định màu sắc của specular highlight. Nếu bạn thiết lập `specular` cùng màu với `color`, bạn sẽ được kết quả trông giống như kim loại. Nếu bạn thiết lập `specular` màu xám, kết quả sẽ trông giống nhựa.

Thuộc tính `shininess` của MeshPhongMaterial quyết định độ sáng bóng của specular highlight (thanh kiếm, đồ nhựa, đồ sứ,...). Giá trị mặc định là 30.

![shininess](https://static.lockex1987.com/learn-threejs/images/material-shininess.png)

Thiết lập thuộc tính `emissive` bằng một màu nào đó trên MeshLambertMaterial hoặc MeshPhongMaterial và thiết lập thuộc tính `color` bằng màu đen (và thiết lập thuộc tính `shininess` của MeshPhongMaterial bằng 0) sẽ cho ra kết quả giống như MeshBasicMaterial.

![Basic giống Lambert giống Phong](https://static.lockex1987.com/learn-threejs/images/material-basic-lambert-phong-same.png)

Tại sao chúng ta có cả MeshBasicMaterial và MeshLambertMaterial trong khi MeshPhongMaterial có thể làm cùng một việc cho cả ba? Lý do là các Material phức tạp cần nhiều sức mạnh GPU để vẽ. Trên các thiết bị có GPU chậm như điện thoại bạn có thể muốn giảm tải cho GPU bằng cách sử dụng Material ít phức tạp hơn. Nếu bạn không cần các tính năng thêm thì hãy sử dụng Material đơn giản nhất. Nếu bạn không cần Light và specular highlight thì hãy sử dụng MeshBasicMaterial.

[Ví dụ MeshPhongMaterial](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#MeshPhongMaterial)

![Phong](https://static.lockex1987.com/learn-threejs/images/material-phong.png)

### MeshToonMaterial

MeshToonMaterial tương tự như MeshPhongMaterial với một khác biệt lớn. Thay vì shading mượt sử dụng gradient map, MeshToonMaterial mặc định sử dụng gradient map mà 70% độ sáng cho 70% đầu tiên và 100% sau đó. Kết quả là hai tông màu khác nhau giống như cartoon.

[Ví dụ MeshToonMaterial](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#MeshToonMaterial)

![Toon](https://static.lockex1987.com/learn-threejs/images/material-toon.png)

### MeshStandardMaterial

MeshStandardMaterial và MeshPhysicalMaterial sử dụng Physically Based Rendering (PBR). Các Material trước sử dụng toán học đơn giản để làm các Material trông giống 3D nhưng chúng không thực sự xảy ra như vậy trong thế giới thực. PBR sử dụng toán học phức tạp hơn nhiều để gần với cái thực sự xảy ra trong thế giới thực.

Sự khác nhau lớn nhất giữa MeshPhongMaterial và MeshStandardMaterial là các tham số khác nhau. MeshPhongMaterial sử dụng thuộc tính `shininess` (sáng bóng) còn MeshStandardMaterial sử dụng hai thuộc tính `roughness` (thô ráp) và `metalness` (tính kim loại).

Ở mức cơ bản, `roughness` là đối nghịch với `shininess`. Cái gì đó mà có `roughness` cao, như một quả bóng chày thì không có relection. Cái gì đó mà có `roughness` thấp, không sần sùi thô ráp, như một quả bóng bi da, thì rất sáng bóng. Thuộc tính này quyết định cách ánh sáng chạm vào bề mặt được khuyếch tán như thế nào. Giá trị của `roughness` từ 0 đến 1. Giá trị mặc định là 0.5, giá trị 0 thì relection như gương, và giá trị 1 thì khuyếch tán toàn bộ ánh sáng.

Thuộc tính còn lại, `metalness`, chỉ định Material giống kim loại bao nhiêu. Kim loại cư xử khác với không phải kim loại. Giá trị của `metalness` từ 0 cho không kim loại và 1 cho kim loại. Giá trị mặc định là 0.5.

Hình sau thể hiện `roughness` từ 0 đến 1 (từ trái sang phải) và `metalness` từ 0 đến 1 (từ trên xuống dưới).

![roughness và metalness](https://static.lockex1987.com/learn-threejs/images/material-roughness-metalness.png)

[Ví dụ MeshStandardMaterial](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#MeshStandardMaterial)

![Standard](https://static.lockex1987.com/learn-threejs/images/material-standard.png)

### MeshPhysicalMaterial

MeshPhysicalMaterial giống như MeshStandardMaterial nhưng nó thêm thuộc tính `clearcoat` có giá trị từ 0 đến 1 để chỉ định clearcoat gloss layer và thuộc tính `clearCoatRoughness` chỉ định độ thô ráp của gloss layer. Với Material này, chúng ta có nhiều điều khiển hơn về reflection.

Hình sau thể hiện cùng `roughness` và `metalness` như hình trước cùng với cấu hình `clearcoat` và `clearCoatRoughness`.

![roughness và metalness và clearcoat](https://static.lockex1987.com/learn-threejs/images/material-roughness-metalness-clearcoat.png)

[Ví dụ MeshPhysicalMaterial](https://static.lockex1987.com/learn-threejs/chapter-03/03-01-material-browser.html#MeshPhysicalMaterial)

![Physical](https://static.lockex1987.com/learn-threejs/images/material-physical.png)

### Nhiều Material cho một Mesh

Cho đến lúc này, chúng ta chỉ sử dụng một Material cho một Mesh. Chúng ta có thể định nghĩa một Material nào đó cho từng mặt của một Geometry. Ví dụ, nếu chúng ta có một hình lập phương gồm 12 mặt, chúng ta có thể thiết lập các Material khác nhau (màu khác nhau) với từng side. Bạn có thể làm như sau:

```javascript
// Danh sách màu sắc
const colors = [
    0x009e60,
    0x0051ba,
    0xffd500,
    0xff5800,
    0xC41E3A,
    0xffffff
];

// Danh sách các Material
const cubeMaterials = colors.map(color => (new THREE.MeshBasicMaterial({ color: color })));

const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterials);
```

Khi khởi tạo Mesh, thay vì truyền vào một đối tượng Material, chúng ta sẽ truyền vào một mảng các Material.

Bạn có thể chú ý là chúng ta chỉ tạo 6 Material, trong khi hình lập phương có 12 mặt. Đó là do Three.js tự động phân bổ các Material với các mặt tương ứng.

[Ví dụ 03.02 - Multiple Materials](https://static.lockex1987.com/learn-threejs/chapter-03/03-02-multiple-materials.html)

![Multiple Materials](https://static.lockex1987.com/learn-threejs/screenshots/03-02-multiple-materials.png)

### Kết luận

Các Material xử lý nhanh và chậm khác nhau: MeshBasicMaterial < MeshLambertMaterial < MeshPhongMaterial < MeshStandardMaterial < MeshPhysicalMaterial. Các Material xử lý chậm có thể tạo các cảnh trông giống thật, chân thực hơn nhưng bạn có thể cần thiết kế code của bạn sử dụng các Material nhanh hơn trên các thiết bị yếu.

Quyết định giá trị cho các thuộc tính của Material rất khó. Giải pháp tốt đó là sử dụng dat.GUI để điều chỉnh các thuộc tính và quan sát luôn kết quả.