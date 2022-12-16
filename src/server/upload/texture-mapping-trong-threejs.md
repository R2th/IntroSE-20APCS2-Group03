### Giới thiệu

Texture mapping là phương pháp để mô tả thông tin chi tiết của một bề mặt như màu sắc, sự gồ ghề, sự trong suốt, sự sáng bóng, sự phản chiếu,... Texture mapping sử dụng một ảnh để lưu trữ các thông tin ở dạng một mảng hai chiều, sau đó ánh xạ lên bề mặt của đối tượng, thông qua tiến trình gọi là UV mapping.

UV mapping mà tiến trình chiếu một ảnh 2D lên bề mặt 3D. UV không phải là từ viết tắt. Hai chữ cái U và V biểu thị hai trục của ảnh 2D. Các chữ cái X, Y, Z đã được sử dụng để biểu thị các trục của bề mặt 3D. UV mapping sẽ chỉ định từng điểm trên ảnh 2D ứng với điểm tương ứng trên bề mặt 3D, (u, v) ⟶ (x, y, z).

![UV mapping](https://static.lockex1987.com/learn-threejs/images/uv_mapping.svg)

Trong bài này, chúng ta sẽ tìm hiểu các chủ đề sau:

- Tải một Texture và áp dụng màu sắc của nó với một Material (color map)
- Sử dụng bump map, normal map, displacement map để mô phỏng sự gồ ghề của bề mặt
- Sử dụng alpha map để tạo sự trong suốt một phần (không phải toàn bộ) của đối tượng
- Sử dụng emissive map để mô phỏng hiệu ứng phát sáng
- Thiết lập background cho cảnh
- Sử dụng environment map để tạo sự phản chiếu xung quanh trên bề mặt đối tượng
- Sử dụng roughness map, metalness map, specular map để thiết lập các phần sáng bóng
- Sử dụng ambient occlusion map, light map để tạo bóng
- Tìm hiểu gradient map của MeshToonMaterial
- Tìm hiểu Matcap của MeshMatcapMaterial

### Color map

Chúng ta hãy bắt đầu với ví dụ cơ bản nhất đó là định nghĩa màu sắc của đối tượng từ Texture thông qua color map. Color map còn được gọi là albedo map hoặc diffuse map.

Các đối tượng của chúng ta từ trước đến nay chỉ có một màu sắc. Tất cả các điểm trên đối tượng đều có cùng màu đó. Tuy nhiên, trên thực tế các đối tượng thường có màu sắc khác nhau ở các vị trí khác nhau, có các hoa văn phức tạp. Để làm được điều đó, chúng ta sẽ sử dụng một ảnh làm Texture, gán thuộc tính cho Material (vì Material quyết định vật sẽ trông như thế nào).

Để mở đầu, chúng ta sẽ thiết lập một cảnh đơn giản bao gồm một hình cầu ở giữa. Chúng ta cũng thêm vào đó ánh sáng. Cảnh của chúng ta trông như sau:

![07.00 - Start](https://static.lockex1987.com/learn-threejs/screenshots/07-00-start.png)

Chúng ta hãy so sánh cảnh trên với một hình cầu trong thế giới thực như một quả bóng, hoặc một viên bi, hoặc quả địa cầu (từ bất kỳ vật liệu gì ngoại trừ từ nhựa và bề mặt phẳng), chúng ta sẽ thấy ngay rằng hình cầu của chúng ta không chân thực. Các đối tượng trong thế giới thật thường bị xước, bị vỡ, hoặc bị bẩn, và thay đổi từ điểm này đến điểm tiếp theo. Tuy nhiên, Material áp dụng cho hình cầu của chúng ta chỉ bao gồm một màu bao phủ toàn bộ bề mặt.

Các đối tượng Material có nhiều thuộc tính ngoài thuộc tính color. Trong trường hợp đơn giản nhất, chúng ta sẽ lấy một ảnh và kéo nó bao phủ bề mặt của một đối tượng 3D. Màu sắc của đối tượng sẽ giống màu của ảnh. Chúng ta gọi các ảnh được sử dụng theo cách này là các Texture. Chúng ta có thể sử dụng Texture để thể hiện các thuộc tính như màu sắc, sự gồ ghề, sự trong suốt,...

Về cách lập trình trong Three.js, chúng ta sử dụng một ảnh, load nó bằng [TextureLoader](https://threejs.org/docs/index.html?q=Texture#api/en/loaders/TextureLoader), kết quả trả về sẽ là một đối tượng [Texture](https://threejs.org/docs/index.html?q=Texture#api/en/textures/Texture). Sau đó chúng ta gán đối tượng Texture này làm một thuộc tính của Material. Thuộc tính của Material để định nghĩa màu sắc với Texture là `map` (không phải `colorMap`, có lẽ do đây là trường hợp hay sử dụng nhất nên để là `map` cho ngắn gọn).

```javascript
const textureLoader = new TextureLoader();
const texture = textureLoader.load('đường dẫn ảnh');
const material = new MeshStandardMaterial({
    map: texture
});
```

Ở đoạn code trên, chúng ta sử dụng luôn đối tượng Texture ngay sau khi gọi phương thức `load()`. Tuy nhiên, ảnh có thể không được tải về luôn mà có độ trễ, có thể là vài trăm milli giây hoặc hơn nếu ảnh có dung lượng lớn. Chúng ta có thể nhìn thấy đối tượng mà chưa được áp dụng Texture trong một khoảng thời gian ngắn. Nếu muốn, chúng ta có thể chờ cho ảnh tải về xong bằng cách gọi theo kiểu callback như sau:

```javascript
const textureLoader = new TextureLoader();
textureLoader.load(
    'đường dẫn ảnh',
    
    // onLoad callback
    texture => {
        const material = new MeshStandardMaterial({
            map: texture
        });
    }
);
```

Luồng code của chúng ta với các loại map khác như bump map, normal map, displacement map,... cũng giống như trên. Chúng ta chỉ thay tên của thuộc tính Material tương ứng, thay vì `map` sẽ là `bumpMap`, `normalMap`, `displacementMap`,...

Bạn có thể sử dụng các định dạng ảnh thông dụng như PNG, JPG, GIF, BMP. Để cho kết quả tốt nhất, kích thước ảnh nên là số mũ của 2 (ví dụ 256x256, 512x512, 1024x1024). Nếu kích thước của ảnh không phải số mũ của 2, Three.js sẽ scale ảnh về giá trị số mũ của 2 gần nhất.

Giả sử chúng ta sử dụng Texure sau:

![Block color](https://static.lockex1987.com/learn-threejs/textures/blocks/blocks_color.jpg)

Áp dụng cho ví dụ của chúng ta sẽ cho ra kết quả như sau:

[Ví dụ 07.01 - Color map](https://static.lockex1987.com/learn-threejs/chapter-07/07-01-color-map.html)

![Ví dụ 07.01 - Color map](https://static.lockex1987.com/learn-threejs/screenshots/07-01-color-map.png)

### Bump map

Bump map được sử dụng để mô phỏng sự gồ ghề, lồi lõm của một bề mặt. Bump map sử dụng các độ cao khác nhau. Bump map thường được lưu ở một ảnh đen trắng, màu đen là điểm có độ cao nhỏ nhất, màu trắng là điểm có độ cao lớn nhất. Height map cũng được gọi là bump map, trừ khi được nói rõ.

![Bump map](https://static.lockex1987.com/learn-threejs/images/bump_map.png)

Ở hình trên, chúng ta có một hình cầu ở bên trái, một bump map ở giữa, và kết quả khi áp dụng bump map ở bên phải. Bump map thay đổi cách bề mặt phản ứng lại ánh sáng mà không thay đổi kích thước hay hình dạng của bề mặt.

Để tạo sự gồ ghề, ngoài bump map, bạn có thể dùng normal map hoặc displacement map. Tuy nhiên, bạn nên chỉ dùng một cái thôi.

Thuộc tính của Material để gán Texture là `bumpMap`. Ngoài ra, chúng ta cũng có thuộc tính `bumpScale` để chỉ định tỷ lệ độ cao là lớn hay nhỏ.

Chúng ta sẽ sử dụng Texure sau với bump map:

![Block bump](https://static.lockex1987.com/learn-threejs/textures/blocks/blocks_bump.jpg)

Kết quả như sau:

[Ví dụ 07.02 - Bump map](https://static.lockex1987.com/learn-threejs/chapter-07/07-02-bump-map.html)

![Ví dụ 07.02 - Bump map](https://static.lockex1987.com/learn-threejs/screenshots/07-02-bump-map.png)

### Normal map

Normal map là biến thể của bump map. Normal map sử dụng vector pháp tuyến ở từng điểm, các thông số màu RGB tương ứng với các tọa độ XYZ. Bump map chỉ sử dụng một thông số (chiều cao), còn normal map sử dụng ba thông số nên sẽ chi tiết hơn.

Thuộc tính của Material để gán Texture là `normalMap`. Ngoài ra, chúng ta cũng có thuộc tính `normalScale` mà chúng ta có thể thiết lập tỷ lệ theo trục X và Y, ví dụ `material.normalScale.set(1, 1)`. Cách tiếp cận tốt nhất là để hai tỷ lệ theo trục X và Y này bằng nhau.

Vấn đề với normal map là ảnh của nó không dễ để tạo. Bạn cần các công cụ chuyên dụng như Blender hoặc Photoshop.

Với normal map hoặc bump map, chúng ta không thay đổi hình dạng của đối tượng; tất cả các đỉnh vẫn ở nguyên vị trí. Các map này chỉ sử dụng ánh sáng để tạo độ sâu và độ chi tiết giả.

Chúng ta sẽ sử dụng Texure sau với normal map:

![Block normal](https://static.lockex1987.com/learn-threejs/textures/blocks/blocks_normal.jpg)

Kết quả như sau:

[Ví dụ 07.03 - Normal map](https://static.lockex1987.com/learn-threejs/chapter-07/07-03-normal-map.html)

![Ví dụ 07.03 - Normal map](https://static.lockex1987.com/learn-threejs/screenshots/07-03-normal-map.png)

### Displacement map

Dispacement map khác với bump map (và normal map) ở chỗ với bump map, hình dạng (Geometry) của đối tượng không bị chỉnh sửa còn với displacement map, hình dạng bị chỉnh sửa như nó bị thay thế. Do đó displacement map cũng tốn hiệu năng hơn.

![Displacement map vs bump map](https://static.lockex1987.com/learn-threejs/images/displacement_map_vs_bump_map.png)

Ở hình trên, hình cầu bên trái sử dụng bump map còn hình cầu bên phải sử dụng displacement map. Chúng ta có thể nhìn vào đối tượng hoặc bóng của nó để thấy hình dạng của hình cầu bên trái không thay đổi còn hình dạng của hình cầu bên phải thực sự thay đổi.

Thuộc tính của Material để gán Texture là `displacementMap`. Ngoài ra, chúng ta cũng có thuộc tính `displacementScale` là tỷ lệ thay thế. Chú ý, sử dụng displacement map chỉ có kết quả tốt khi đối tượng của chúng ta chứa nhiều đỉnh. 

Chúng ta sẽ sử dụng các Texure sau với color map và displacement map:

![Sands color](https://static.lockex1987.com/learn-threejs/textures/sands/sands_color.jpg)

![Sands displacement](https://static.lockex1987.com/learn-threejs/textures/sands/sands_displacement.png)

Kết quả như sau:

[Ví dụ 07.04 - Displacement map](https://static.lockex1987.com/learn-threejs/chapter-07/07-04-displacement-map.html)

![Ví dụ 07.04 - Displacement map](https://static.lockex1987.com/learn-threejs/screenshots/07-04-displacement-map.png)

### Alpha map

Alpha map là cách chúng ta điều chỉnh độ trong suốt của bề mặt. Nếu giá trị của map là màu đen, phần đó của đối tượng sẽ trong suốt hoàn toàn, và nếu giá trị là màu trắng, phần đó sẽ đục hoàn toàn.

Thuộc tính của Material để gán Texture là `alphaMap`. Ngoài ra, chúng ta phải thiết lập thuộc tính `transparent` bằng `true`. Chúng ta cũng thiết lập thuộc tính `side` là `DoubleSide` để có thể nhìn được mặt trong của hình.

Chúng ta sẽ sử dụng Texure sau với alpha map:

![Partial transparency](https://static.lockex1987.com/learn-threejs/textures/alpha_map.png)

Để chỉnh lại kích thước của Texture nhỏ hơn khi bao phủ bề mặt, chúng ta có thể làm như sau:

```javascript
alphaTexture.wrapS = RepeatWrapping;
alphaTexture.wrapT = RepeatWrapping;
alphaTexture.repeat.set(8, 8);
```

Kết quả như sau:

[Ví dụ 07.05 - Alpha map](https://static.lockex1987.com/learn-threejs/chapter-07/07-05-alpha-map.html)

![Ví dụ 07.05 - Alpha map](https://static.lockex1987.com/learn-threejs/screenshots/07-05-alpha-map.png)

### Emissive map

Emissive map có thể được sử dụng để làm các phần nào đó của đối tượng phát sáng, tương tự như cách thuộc tính `emissive` làm với toàn bộ đối tượng.

Thuộc tính của Material để gán Texture là `emissiveMap`. Đồng thời, chúng ta cũng phải thiết lập thuộc tính `emissive` là màu gì đó khác màu đen để nó kết hợp với emissive map. Hai giá trị màu này sẽ được nhân với nhau để ra kết quả hiển thị cuối cùng.

Chúng ta sẽ sử dụng Texure sau với emissive map:

![Lava emissive](https://static.lockex1987.com/learn-threejs/textures/lava/lava_emissive.png)

Kết quả như sau:

[Ví dụ 07.06 - Emissive map](https://static.lockex1987.com/learn-threejs/chapter-07/07-06-emissive-map.html)

![Ví dụ 07.06 - Emissive map](https://static.lockex1987.com/learn-threejs/screenshots/07-06-emissive-map.png)

### Thiết lập background

Trước khi tìm hiểu tiếp về các loại texture mapping, chúng ta hãy cùng tìm hiểu về cách thiết lập background trong Three.js. Chúng ta sẽ sử dụng background trong các ví dụ sau này.

Trong các ví dụ trước, chúng ta thiết lập background của cảnh là một màu gì đó bằng cách:

```javascript
scene.background = new Color(0xFFFFFF);
```

Hoặc:

```javascript
renderer.setClearColor(new Color(0xFFFFFF));
```

#### Thiết lập background bằng CSS

Chúng ta có thể thêm một background tĩnh đơn giản bằng CSS. Chúng ta cần thiết lập thuộc tính `background` cho đối tượng canvas là một ảnh:

```css
canvas {
    background: url(../images/daikanyama.jpg) no-repeat center center;
    background-size: cover;
}
```

Chúng ta không được thiết lập `backgound` cho Scene hay `setClearColor()` cho Renderer nữa. Chúng ta cũng cần thiết lập Renderer có sử dụng `alpha` để những chỗ mà chúng ta không vẽ gì vào cảnh sẽ là trong suốt. Chúng ta cần thiết lập ở ngay lúc khởi tạo, không sửa được sau này.

```javascript
const renderer = new WebGLRenderer({
    canvas,
    alpha: true
});
```

Vậy là chúng ta đã có một background bằng ảnh.

[Ví dụ 07.07 - Background CSS](https://static.lockex1987.com/learn-threejs/chapter-07/07-07-background-css.html)

![Ví dụ 07.07 - Background CSS](https://static.lockex1987.com/learn-threejs/screenshots/07-07-background-css.png)

#### Thiết lập background của Scene

Nếu chúng ta muốn background cũng có thể bị ảnh hưởng bởi các hiệu ứng post-processing, chúng ta cần vẽ background bằng Three.js. Để làm được điều này, chúng ta đơn giản chỉ cần tải một Texture và gán nó cho `background` của Scene.

```javascript
const textureLoader = new TextureLoader();
const backgroundTexture = textureLoader.load('../images/daikanyama.jpg');
scene.background = backgroundTexture;
```

[Ví dụ 07.08 - Background Scene](https://static.lockex1987.com/learn-threejs/chapter-07/07-08-background-scene.html)

Kết quả không khác gì so với thiết lập bằng CSS lắm. Tuy nhiên, nếu bây giờ chúng ta sử dụng một hiệu ứng post-processing nào đó thì background cũng bị ảnh hưởng luôn.

#### Skybox với hình lập phương đơn giản

Background tĩnh không phải cái mà chúng ta thường muốn trong một cảnh 3D. Thay vào đó, chúng ta thường muốn cái gì đó kiểu như *skybox*, một khối hộp với bầu trời được vẽ trong đó. Chúng ta để Camera ở trong khối hộp và trông như có một bầu trời ở backgound.

Cách thông dụng nhất để thực thi một skybox đó là tạo một hình lập phương, thiết lập Texture cho nó, và vẽ nó từ bên trong. Ở mỗi cạnh của hình lập phương chúng ta để một Texture. Đánh dấu thuộc tính `side` là `BackSide` để vẽ bên trong chứ không phải bên ngoài hình lập phương.

```javascript
const textureLoader = new TextureLoader();

const orders = [
    'pos-x', // right - phải
    'neg-x', // left - trái
    'pos-y', // top - trên
    'neg-y', // bottom - dưới
    'pos-z', // front - trước
    'neg-z' // back - sau
];

const materials = orders.map(fileName => new MeshStandardMaterial({
    map: textureLoader.load('../textures/cube/computer_history_museum/' + fileName + '.jpg'),
    side: BackSide
}));

const geometry = new BoxGeometry(5, 5, 5);
const mesh = new Mesh(geometry, materials);
scene.add(mesh);
```

Chú ý chúng ta cần liệt kê đúng thứ tự các ảnh:

- phải - pos-x
- trái - neg-x
- trên - pos-y
- dưới - neg-y
- trước - pos-z
- sau - neg-z

![Cube map](https://static.lockex1987.com/learn-threejs/images/cube_map.png)

Chúng ta sẽ sử dụng 6 ảnh tương ứng với 6 mặt:

![pos-x](https://static.lockex1987.com/learn-threejs/textures/cube/computer_history_museum/pos-x.jpg)

![neg-x](https://static.lockex1987.com/learn-threejs/textures/cube/computer_history_museum/neg-x.jpg)

![pos-y](https://static.lockex1987.com/learn-threejs/textures/cube/computer_history_museum/pos-y.jpg)

![neg-y](https://static.lockex1987.com/learn-threejs/textures/cube/computer_history_museum/neg-y.jpg)

![pos-z](https://static.lockex1987.com/learn-threejs/textures/cube/computer_history_museum/pos-z.jpg)

![neg-z](https://static.lockex1987.com/learn-threejs/textures/cube/computer_history_museum/neg-z.jpg)

[Ví dụ 07.09 - Skybox simple cube](https://static.lockex1987.com/learn-threejs/chapter-07/07-09-skybox-simple-cube.html)

![Ví dụ 07.09 - Skybox simple cube](https://static.lockex1987.com/learn-threejs/screenshots/07-09-skybox-simple-cube.png)

Với cách này, chúng ta có thể zoom ra ngoài hình lập phương. Ngoài ra, chỗ tiếp nối giữa các cạnh của hình lập phương sẽ là một đường thẳng mà chúng ta có thể phát hiện bằng mắt nên không chân thực lắm.

#### Skybox với CubeTextureLoader

Giải pháp khác để tạo skybox là sử dụng một [CubeTexture](https://threejs.org/docs/index.html?q=Cube#api/en/textures/CubeTexture). Một CubeTexture là một dạng Texture đặc biệt mà có 6 mặt, tương ứng các mặt của hình lập phương. Chúng ta cũng sử dụng 6 ảnh ở ví dụ trước và tải chúng bằng [CubeTextureLoader](https://threejs.org/docs/index.html?q=Cube#api/en/loaders/CubeTextureLoader), sau đó gán cho `background` của Scene.

```javascript
const orders = [
    'pos-x', // right - phải
    'neg-x', // left - trái
    'pos-y', // top - trên
    'neg-y', // bottom - dưới
    'pos-z', // front - trước
    'neg-z' // back - sau
];

const images = orders.map(fileName => {
    return '../textures/cube/computer_history_museum/' + fileName + '.jpg';
});

const cubeTextureLoader = new CubeTextureLoader();
const cubeMap = cubeTextureLoader.load(images);
this.scene.background = cubeMap;
```

[Ví dụ 07.10 - Skybox CubeTexture](https://static.lockex1987.com/learn-threejs/chapter-07/07-10-skybox-cube-texture.html)

Khi chúng ta zoom thì background giữ nguyên. Ngoài ra, Three.js sẽ nối các ảnh với nhau một cách liền mạch.

#### Skybox với ảnh panorama

Cách cuối cùng để tạo skybox mà chúng ta sẽ tìm hiểu là sử dụng một Equirectangular map. Đây chính là cách giống như phép chiếu từ bản đồ dạng phẳng lên quả địa cầu. Chúng ta sẽ sử dụng một ảnh panorama 360 độ, ví dụ ảnh sau:

![panorama](https://static.lockex1987.com/learn-threejs/images/tears_of_steel_bridge_2k.jpg)

Đầu tiên, chúng ta sẽ load ảnh như một Texture, sau đó, ở hàm callback (chúng ta cần chờ ảnh load xong), chúng ta tạo một đối tượng WebGLCubeRenderTarget và gọi phương thức `fromEquirectangularTexture()` để sinh ra một CubeTexture từ Texture đó. Chúng ta truyền kích thước cubemap khi khởi tạo WebGLCubeRenderTarget, có thể truyền giá trị bằng chiều cao của ảnh.

```javascript
const textureLoader = new TextureLoader();
const url = '../images/tears_of_steel_bridge_2k.jpg';
const onLoaded = texture => {
    const rt = new WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(this.renderer, texture);
    this.scene.background = rt.texture;
};
textureLoader.load(url, onLoaded);
```

[Ví dụ 07.11 - Skybox Panorama](https://static.lockex1987.com/learn-threejs/chapter-07/07-11-skybox-panorama.html)

### Enviroment map

#### Static

Việc tính toán sự phản chiếu môi trường xung quanh rất tốn CPU, và thường yêu cầu cách tiếp cận ray tracer. Nếu chúng ta muốn có phản chiếu môi trường ở Three.js, chúng ta vẫn có thể làm được, bằng cách giả nó. Chúng ta sẽ tạo một Texture của môi trường.

Environment map là kỹ thuật ánh sáng dựa vào ảnh hiệu quả để mô phỏng sự phản chiếu bề mặt bằng các Texture đã tính toán trước. Texture lưu ảnh của không gian xung quanh đối tượng. Enviroment map cũng còn được gọi là reflection map.

Chúng ta thực hiện các bước sau:

- Chúng ta cũng khởi tạo một CubeTexture như khi tạo skybox
- Thiết lập skybox (môi trường xung quanh)
- Áp dụng cùng CubeTexture kia một lần nữa cho đối tượng của chúng ta (thuộc tính `envMap` của Material)

Bên cạnh sự phản chiếu (reflection), Three.js cũng cho phép sử dụng một CubeTexture cho sự khúc xạ (refraction). Sự phản chiếu như chúng ta nhìn vào gương, còn sự khúc xạ như chúng ta nhìn vào kính (nhìn xuyên qua). Để có hiệu ứng này, chúng ta chỉ cần thiết lập `cubeMap.mapping` là CubeReflectionMapping (mặc định) hoặc CubeRefrationMapping.

Chú ý: Để có hiệu ứng khúc xạ, chúng ta phải sử dụng MeshPhongMaterial. MeshStandardMaterial không hỗ trợ khúc xạ.

[Ví dụ 07.12 - Environment map static](https://static.lockex1987.com/learn-threejs/chapter-07/07-12-environment-map-static.html)

![Ví dụ 07.12 - Environment map static](https://static.lockex1987.com/learn-threejs/screenshots/07-12-environment-map-static.png)

#### Dynamic

Ở ví dụ trên, chúng ta sử dụng một environment map tĩnh cho các đối tượng. Nói cách khác, chúng ta chỉ có thể thấy phản chiếu của môi trường mà không thấy phản chiếu của các đối tượng khác. Để có thể nhìn được, chúng ta cần sử dụng thêm một Camera là [CubeCamera](https://threejs.org/docs/index.html?q=cube#api/en/cameras/CubeCamera).

```javascript
const cubeRenderTarget = new WebGLCubeRenderTarget(
    128,
    {
        generateMipmaps: true,
        minFilter: LinearMipmapLinearFilter
    }
);
const cubeCamera = new CubeCamera(0.1, 100, cubeRenderTarget);
```

Chúng ta sẽ sử dụng CubeCamera này để chụp lại cảnh với tất cả các đối tượng và sử dụng nó cho CubeTexture. Hai tham số đầu tiên là các khoảng cách near và far của Camera. Chúng ta cũng cần chắc chắn vị trí của CubeCamera này bằng vị trí của đối tượng.

```javascript
cubeMesh.add(cubeCamera);
cubeCamera.position.copy(cubeMesh.position);
```

Để áp dụng những cái CubeCamera nhìn thấy cho đối tượng, chúng ta làm như sau:

```javascript
cubeMaterial.envMap = cubeCamera.texture;
```

Trong vòng lặp animation, chúng ta xử lý như sau:

```javascript
cubeMesh.visible = false;
cubeCamera.updatep(renderer, scene);
cubeMesh.visible = true;
```

Đầu tiên, chúng ta ẩn đối tượng cubeMesh đi, vì chúng ta chỉ muốn nhìn sự phản chiếu của đối tượng sphereMesh lên trên đối tượng cubeMesh. Tiếp theo, chúng ta render cảnh với cubeCamera bằng phương thức `update()`. Sau đó, chúng ta hiện lại đối tượng cubeMesh và render cảnh như bình thường.

[Ví dụ 07.13 - Environment map dynamic](https://static.lockex1987.com/learn-threejs/chapter-07/07-13-environment-map-dynamic.html)

![Ví dụ 07.13 - Environment map dynamic](https://static.lockex1987.com/learn-threejs/screenshots/07-13-environment-map-dynamic.png)

### Roughness map và metalness map

Bằng các thuộc tính `roughness` hoặc `metalness` của MeshStandardMaterial, chúng ta có thể thiết lập độ giống kim loại, cũng như độ thô ráp, để làm cho đối tượng trông giống bằng kim loại, gỗ, nhựa, có sáng bóng hay không. Ngoài hai thuộc tính trên, chúng ta cũng có thể sử dụng Texture. Giả sử chúng ta có một đối tượng thô ráp nhưng lại muốn một phần nào đó của đối tượng đó sáng bóng, hoặc phần nào đó trông xước hoặc thô ráp hơn, chúng ta có thể thiết lập thuộc tính `roughnessMap` và `metalnessMap`. Khi bạn sử dụng các map đó, giá trị của Texture ở phần chỉ định sẽ được nhân với giá trị của `roughness` hoặc `metalness`, quyết định pixel chỉ định được vẽ như thế nào.

Chúng ta cũng sử dụng environment map để hiển thị phản chiếu của môi trường xung quanh trên đối tượng, để ví dụ được minh họa rõ nét hơn. Một đối tượng với metalness cao sẽ phản chiếu nhiều hơn. Một đối tượng với roughness cao sẽ khuếch tán sự phản chiếu nhiều hơn.

Chúng ta sẽ sử dụng Texture sau với cả roughness map và metalness map:

![Roughness and metalness map](https://static.lockex1987.com/learn-threejs/textures/roughness_map.jpg)

Kết quả như sau:

[Ví dụ 07.14 - Roughness map](https://static.lockex1987.com/learn-threejs/chapter-07/07-14-roughness-map.html)

![Ví dụ 07.14 - Roughness map](https://static.lockex1987.com/learn-threejs/screenshots/07-14-roughness-map.png)

[Ví dụ 07.15 - Metalness map](https://static.lockex1987.com/learn-threejs/chapter-07/07-15-metalness-map.html)

![Ví dụ 07.15 - Metalness map](https://static.lockex1987.com/learn-threejs/screenshots/07-15-metalness-map.png)

### Specular map

Specular map cho phép mức độ phản chiếu (mức độ tạo specular highlight) khác nhau ở các vị trí trên bề mặt. Với specular map, chúng ta có thể định nghĩa phần nào của đối tượng sẽ sáng bóng, phần nào của đối tượng sẽ thô ráp (tương tự như `roughnessMap` và `metalnessMap` mà chúng ta vừa tìm hiểu). Thuộc tính của Material để gán Texture là `specularMap`. Chúng ta phải sử dụng với MeshPhongMaterial, vì MeshStandardMaterial không có thuộc tính này.

Chúng ta sẽ vẽ một quả địa cầu và sử dụng specular map để làm các phần là đại dương sẽ sáng bóng hơn các phần là đất liền. Chúng ta sẽ sử dụng Texure sau với specular map:

![Earth specular](https://static.lockex1987.com/learn-threejs/textures/earth/earth_specular.png)

Các vị trí màu đen nghĩa là độ sáng bóng bằng 0, và màu trắng nghĩa là độ sáng bóng 100%.

Kết quả như sau:

[Ví dụ 07.16 - Specular map](https://static.lockex1987.com/learn-threejs/chapter-07/07-16-specular-map.html)

![Ví dụ 07.16 - Specular map](https://static.lockex1987.com/learn-threejs/screenshots/07-16-specular-map.png)

### Ambient occlusion map

Việc tạo bóng bằng cách mô phỏng tia sáng từ nguồn sáng đến đối tượng là một tiến trình tính toán tốn nhiều hiệu năng mà phải lặp đi lặp lại trong vòng lặp render. Nếu nguồn sáng hoặc đối tượng của chúng ta di chuyển thì việc tính toán này là cần thiết. Tuy nhiên, nếu nguồn sáng và đối tượng là tĩnh, sẽ tốt hơn rất nhiều nếu chúng ta tính toán việc tạo bóng một lần và tái sử dụng nó. Để làm được điều này, Three.js cung cấp hai map khác nhau: ambient occlusion map và light map.

Ambient occlusion là một kỹ thuật để quyết định một phần của đối tượng sẽ lộ ra dưới Ambient Light bao nhiêu. Thuộc tính của Material để gán Texture là `aoMap`. Ngoài ra, chúng ta cũng có thuộc tính `aoMapIntensity` để thiết lập mức độ áp dụng ambient occlusion map.

Chú ý, để ambient occlusion (và light) map hoạt động, chúng ta phải chỉnh đối tượng Geometry như sau:

```javascript
geometry.attributes.uv2 = geometry.attributes.uv;
```

Chúng ta sẽ sử dụng Texure sau với ambient occlusion map:

![Blocks ambient occlusion](https://static.lockex1987.com/learn-threejs/textures/blocks/blocks_ambient_occlusion.jpg)

Kết quả như sau:

[Ví dụ 07.17 - Ambient occlusion map](https://static.lockex1987.com/learn-threejs/chapter-07/07-17-ambient-occlusion-map.html)

![Ví dụ 07.17 - Ambient occlusion map](https://static.lockex1987.com/learn-threejs/screenshots/07-17-ambient-occlusion-map.png)

Với ambient occlusion map, dù chỉ sử dụng Ambient Light nhưng đối tượng của chúng ta vẫn có bóng, tạo cảm giác về độ sâu 3D.

### Light map

Để tạo bóng giả, chúng ta cũng có thể sử dụng light map. Light map còn được gọi là shadow map. Thường thì ambient occlusion gán cho đối tượng, còn light map gán cho nền. Thuộc tính của Material để gán Texture là `lightMap`.

Chúng ta sẽ sử dụng Texure sau với light map:

![Light map](https://static.lockex1987.com/learn-threejs/textures/light_map.png)

Kết quả như sau:

[Ví dụ 07.18 - Light map](https://static.lockex1987.com/learn-threejs/chapter-07/07-18-light-map.html)

![Ví dụ 07.18 - Light map](https://static.lockex1987.com/learn-threejs/screenshots/07-18-light-map.png)

### Gradient map

Ở chương về Material trong Three.js, chúng ta đã tìm hiểu về [MeshToonMaterial](https://threejs.org/docs/index.html?q=MeshToon#api/en/materials/MeshToonMaterial). MeshToonMaterial mặc định sử dụng hai tông màu: một cho khoảng không gian từ 0% đến 70%, một cho từ 70% đến 100%. Để thay đổi các tông màu này, chúng ta có thể sử dụng gradient map. Thuộc tính là `gradientMap`, và chỉ áp dụng với MeshToonMaterial.

Chúng ta có thể sử dụng các Texture có kích thước 3x1 hoặc 5x1, mỗi pixel có một màu khác nhau sau với gradient map để tạo ba hoặc năm tông màu khác nhau thay vì chỉ hai.

Kết quả như sau:

[Ví dụ 07.19 - Gradient map](https://static.lockex1987.com/learn-threejs/chapter-07/07-19-gradient-map.html)

![Ví dụ 07.19 - Gradient map](https://static.lockex1987.com/learn-threejs/screenshots/07-19-gradient-map.png)

### Matcap

[MeshMatcapMaterial](https://threejs.org/docs/index.html?q=MeshMatcap#api/en/materials/MeshMatcapMaterial) được định nghĩa bằng một Matcap (Material Capture, hoặc Lit Sphere) Texture, nghĩa là Texture mà đã encode sẵn màu sắc và shading. MeshMatcapMaterial không phản ứng lại với ánh sáng do file ảnh Matcap đã encode sẵn ánh sáng được tính toán trước (baked lighting). Chúng ta không cần thêm các nguồn sáng vào cảnh khi sử dụng MeshMatcapMaterial, tuy nhiên đối tượng không bị trông đơn sắc mà khá là chân thật, trông như các đối tượng làm từ chất liệu sứ.

Chúng ta chỉ cần load một Texture và gán cho thuộc tính là `matcap` của MeshMatcapMaterial.

Chúng ta có thể lấy các Matcap Texture ở địa chỉ sau:

[https://github.com/nidorx/matcaps](https://github.com/nidorx/matcaps)

Một Matcap Texture có dạng hình tròn kiểu như sau:

![Matcap](https://static.lockex1987.com/learn-threejs/textures/matcaps/porcelain_white.jpg)

[Ví dụ 07.20 - Matcap](https://static.lockex1987.com/learn-threejs/chapter-07/07-20-matcap.html)

![Ví dụ 07.20 - Matcap](https://static.lockex1987.com/learn-threejs/screenshots/07-20-matcap.png)

### Kết luận

Các Texture thường được tạo từ các file ảnh. Tuy nhiên, bạn hãy đừng coi nó là các file ảnh để chúng ta nhìn bình thường, mà hãy coi nó là cấu trúc dữ liệu để phục vụ mục đích nào đó. Chúng ta không đơn giản là phủ ảnh đó lên bề mặt của đối tượng, mà dùng nó để tính toán màu sắc, độ cao, độ thô ráp,... của từng điểm trên bề mặt. Mỗi điểm của ảnh sẽ quyết định giá trị của một điểm tương ứng trên đối tượng. Với `map` sẽ là màu sắc của điểm, với `bumpMap` sẽ là độ cao của điểm, với `roughnessMap` sẽ là độ thô ráp của điểm đó,... Các giá trị sẽ được áp dụng cho từng điểm, thay cho toàn bộ đối tượng.

Về code, cách làm của các Texture mapping đều giống nhau. Đó là tạo đối tượng TextureLoader, gọi phương thức `load()` để trả về đối tượng Texture, rồi gán cho một thuộc tính của Material. Quan trọng chúng ta phải có các Texture đúng, đẹp.

Bạn có thể tải Texture từ các trang web sau:

- [Poly Haven](https://polyhaven.com) (free, không cần đăng ký)
- [Free PBR Materials](https://freepbr.com)
- [Ambient CG](https://ambientcg.com/)
- [3D TEXTURES](https://3dtextures.me/)
- [Poliigon](https://www.poliigon.com/)