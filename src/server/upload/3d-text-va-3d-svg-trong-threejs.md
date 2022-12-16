Trong các bài trước, chúng ta đã tìm hiểu cách tạo các đối tượng 3D có dạng hình khối. Vậy thế còn các đối tượng có dạng văn bản thì sao? Chúng ta không thể (hoặc rất khó) tạo từng ký tự văn bản bằng các hình khối cơ bản được. Với các đối tượng đó, Three.js sẽ xử lý từ dạng 2D với các API gần giống như SVG hoặc DOM canvas, sau đó cho nó NỔI LÊN (extrude) để chuyển thành dạng 3D. Ví dụ, nếu chúng ta extrude một hình tròn, chúng ta sẽ được một hình trụ; nếu chúng ta extrude một mặt phẳng, chúng ta sẽ được một hình hộp. Chúng ta có thể áp dụng kỹ thuật này cho các dạng 2D như văn bản, SVG, hoặc [Shape](https://threejs.org/docs/index.html?q=Shape#api/en/extras/core/Shape) bất kỳ.

### Định dạng Typeface font

Typeface font là một đối tượng JSON trong đó có thuộc tính `glyphs` là một mảng các ký tự. Với mỗi ký tự, chúng ta lại có thuộc tính `o` là cách vẽ cho ký tự đó. Đó chính là các chỉ thị tương tự như của SVG (`m` là move to, `l` là line to, `z` là kết thúc đường về điểm bắt đầu,...). Với các chỉ thị này, chúng ta có thể render các ký tự dưới dạng 2D.

![Typeface format](https://static.lockex1987.com/learn-threejs/images/typeface-format.png)

Three.js cung cấp sẵn một số file font mẫu ở thư mục `examples/fonts` như gentilis, helvetiker, optimer, droid sans, droid serif,...:

```
examples/
└── fonts
    ├── droid
    │   ├── droid_sans_bold.typeface.json
    │   ├── droid_sans_mono_regular.typeface.json
    │   ├── droid_sans_regular.typeface.json
    │   ├── droid_serif_bold.typeface.json
    │   ├── droid_serif_regular.typeface.json
    │   ├── NOTICE
    │   └── README.txt
    ├── open-sans
    │   ├── open-sans.css
    │   ├── open-sans-v15-cyrillic-ext_greek_greek-ext_cyrillic_latin_latin-ext_vietnamese-regular.woff
    │   └── open-sans-v15-cyrillic-ext_greek_greek-ext_cyrillic_latin_latin-ext_vietnamese-regular.woff2
    ├── tabler-icons
    │   ├── fonts
    │   │   ├── tabler-icons.eot
    │   │   ├── tabler-icons.svg
    │   │   ├── tabler-icons.ttf
    │   │   ├── tabler-icons.woff
    │   │   └── tabler-icons.woff2
    │   └── tabler-icons.min.css
    ├── ttf
    │   ├── kenpixel.ttf
    │   └── README.md
    ├── gentilis_bold.typeface.json
    ├── gentilis_regular.typeface.json
    ├── helvetiker_bold.typeface.json
    ├── helvetiker_regular.typeface.json
    ├── optimer_bold.typeface.json
    ├── optimer_regular.typeface.json
    ├── LICENSE
    └── README.md
```

Các font mẫu đó có thể không đáp ứng được nhu cầu thẩm mỹ của chúng ta, một số font cũng không hỗ trợ tiếng Việt. Khi đó, chúng ta có thể convert một file font bất kỳ ở định dạng phổ biến là TTF sang định dạng Typeface bằng công cụ online sau:

[gero3.github.io/facetype.js](https://gero3.github.io/facetype.js/)

Chúng ta chỉ cần truy cập trang web này, chọn file TTF của mình, nhấn nút Convert, trang web sẽ export file `facetype.json` về cho chúng ta.

![Typeface convert online](https://static.lockex1987.com/learn-threejs/images/typeface-convert-online.png)

### FontLoader

Sau khi đã có file font rồi, chúng ta cần nạp nó vào ứng dụng. Chúng ta sẽ sử dụng class [FontLoader](https://threejs.org/docs/?q=Font#examples/en/loaders/FontLoader) để tải một file font ở định dạng Typeface.

Chúng ta import class FontLoader từ file ở thư mục `examples`:

```javascript
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
```

Sau đó, chúng ta khởi tạo một đối tượng:

```javascript
const fontLoader = new FontLoader();
```

Class FontLoader có hai phương thức quan trọng là `load()` và `parse()`.

Phương thức `load(url: String, onLoad: Function, onProgress: Function, onError: Function): undefined` sẽ bắt đầu tải file font. Các tham số như sau:

- `url`: Đường dẫn tới file Typeface font.
- `onLoad`: Hàm gọi khi đã tải xong. Hàm có tham số là đối tượng Font đã tải. Đối tượng Font là một mảng các [Shape](https://threejs.org/docs/#api/en/extras/core/Shape) đại diện cho từng ký tự.
- `onProgress`: Hàm gọi trong tiến trình tải. Tham số là một đối tượng XMLHttpRequest, trong đó có chứa các thuộc tính `total` và `loaded` là các dung lượng đo bằng byte.
- `onError`: Hàm gọi khi có lỗi.

Ví dụ:

```javascript
fontLoader.load(
	// URL
	'fonts/gentilis_bold.typeface.json',

	// onLoad callback
	font => {
		// Làm gì đó với đối tượng font đã được tải xong
		console.log(font);
	},

	// onProgress callback
	xhr => {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	},

	// onError callback
	err => {
		console.log('Đã có lỗi xảy ra');
	}
);
```

Phương thức `parse(json: Object): Font` để chuyển đối tượng JavaScript sẵn có thành đối tượng Font.

Phương thức `load()` ở trên đang được sử dụng dạng callback. Nếu muốn chúng ta có thể chuyển việc tải file font sang dạng async await với Promise bằng cách thêm hàm sau:

```javascript
/**
 * Promisify font loading.
 */
function loadFontAsync(url) {
    const fontLoader = new FontLoader();
    return new Promise((resolve, reject) => {
        fontLoader.load(url, resolve, undefined, reject);
    });
}
```

### TextGeometry

Để tạo một đối tượng văn bản mà có thể thêm vào cảnh 3D, chúng ta cũng vẫn cần tạo một Mesh. Mesh sẽ được tạo từ Material và Geometry. Chúng ta có thể sử dụng bất cứ Material nào như MeshBasicMaterial, MeshStandardMaterial,... Với Geometry là đối tượng văn bản, chúng ta cần sử dụng [TextTGeometry](https://threejs.org/docs/?q=TextGeometry#examples/en/geometries/TextGeometry).

Chúng ta import class TextGeometry từ file ở thư mục `examples`:

```javascript
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
```

Class TextGeometry sẽ sinh đoạn văn bản thành một đối tượng Geometry duy nhất. Chúng ta khởi tạo như sau:

```javascript
// Văn bản cần hiển thị
const text = 'Hello Three.js!';

// Các tham số tùy chọn
const parameters = {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5
};

const textGeometry = new TextGeometry(text, parameters);
```

Các thuộc tính mà chúng ta có thể truyền vào ở tham số `parameters` là:

- `font`: Đối tượng Font. Có thể được tải bằng phương thức FontLoader.load() mà chúng ta đã nói ở phần trước.
- `size`: Float. Kích thước của văn bản.
- `height`: Float. Độ dày mà văn bản nổi lên.
- `curveSegments`: Integer. Số các điểm trên các đường cong.
- `bevelEnabled`: Boolean. Có sử dụng cạnh xiên ở mép không.
- `bevelThickness`: Float. Độ sâu của cạnh xiên.
- `bevelSize`: Float. Khoảng cách từ outline của văn bản đến cạnh xiên.
- `bevelOffset`: Float. Từ vị trí nào của outline của văn bản mà cạnh xiên bắt đầu.
- `bevelSegments`: Integer. Số segment của cạnh xiên.

Cạnh xiên là cạnh nằm giữa mặt phẳng 2D ban đầu và mặt phẳng nổi lên. Nó là cạnh mà mũi tên chỉ ở hình minh họa sau:

![Bevel](https://static.lockex1987.com/learn-threejs/images/bevel.jpg)

Văn bản có thể dài ngắn khác nhau, có thể trên một hoặc nhiều dòng. Chúng ta có thể sử dụng phương thức `textGeometry.center()` để căn giữa văn bản về tọa độ (0, 0, 0).

Tiếp theo, chúng ta sẽ tạo Material, Mesh và thêm đối tượng vào cảnh như bình thường:

```javascript
const textMaterial1 = new MeshStandardMaterial({
    color: 0x156289,
    emissive: 0x072534,
    roughness: 0
});
const textMaterial2 = new MeshStandardMaterial({
    color: 0xffc107,
    emissive: 0x444444,
    roughness: 0
});
const textMesh = new Mesh(textGeometry, textMaterial1);
scene.add(textMesh);
```

Chúng ta có thể thiết lập một Material cho toàn bộ Mesh, hoặc thiết lập riêng cho mặt và cho cạnh như nhau:

```javascript
const textMesh = new Mesh(textGeometry, [
    textMaterial1, // front
    textMaterial2 // side
]);
```

[Ví dụ 3D Text](https://static.lockex1987.com/learn-threejs/chapter-06/06-01-text.html)

![3D Text](https://static.lockex1987.com/learn-threejs/screenshots/06-01-text.png)

### TTFLoader

Chúng ta có thể convert file TTF sang file Typeface bằng công cụ online, sau đó sử dụng file Typeface; hoặc chúng ta có thể sử dụng file TTF trực tiếp bằng TTFLoader.

```javascript
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

const url = '....ttf';
const onLoaded = ttf => {
    const font = new Font(ttf);
};
const ttfLoader = new TTFLoader();
ttfLoader.load(url, onLoaded);
```

Ở đoạn code trên, chúng ta import class TTFLoader từ file ở thư mục `examples`, khởi tạo đối tượng TTFLoader, sau đó gọi phương thức `load()`. Khi load xong, chúng ta sẽ có đối tượng TTF mà chúng ta có thể chuyển về đối tượng Font bằng cách gọi `new Font(ttf)`. Sau đó, chúng ta có thể tạo TextGeometry, Material, Mesh,... và xử lý tiếp như bình thường.

### SVG

Chúng ta đã tìm hiểu việc xử lý văn bản bằng cách sử dụng TextGeometry. Class TextGeometry được extend từ class [ExtrudeGeometry](https://threejs.org/docs/index.html#api/en/geometries/ExtrudeGeometry). Đây là class chung để chúng ta tạo ra các đối tượng 3D từ các hình 2D. Chúng ta sẽ cùng sử dụng class này để tạo các đối tượng 3D từ các file ảnh định dạng SVG (logo Batman và bản đồ Việt Nam).

![Batman logo](https://static.lockex1987.com/learn-threejs/images/batman_logo.svg)

![Vietnamese map](https://static.lockex1987.com/learn-threejs/images/vietnamese_map.svg)

Mục đích của chúng ta sẽ là làm thế nào đó từ file SVG chuyển về một đối tượng Geometry. Ở một số hướng dẫn trên mạng có thể khuyên nên sử dụng thư viện [d3-threeD](https://github.com/asutherland/d3-threeD). Tuy nhiên, thư viện này đã từ lâu không được maintain. Chúng ta sẽ sử dụng class [SVGLoader](https://threejs.org/docs/index.html?q=SVG#examples/en/loaders/SVGLoader) được Three.js cung cấp luôn.

Chúng ta import class, tạo đối tượng, load file SVG như sau:

```javascript
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

const svgLoader = new SVGLoader();
svgLoader.load(svgUrl, svg => {
    // Làm gì đó với đối tượng svg này
});
```

Chúng ta có thể duyệt qua các path của đối tượng svg thông qua thuộc tính `paths`. Từ mỗi path, chúng ta lại tạo ra một mảng các Shape bằng phương thức tĩnh `SVGLoader.createShapes()`. Từ mỗi Shape chúng ta sẽ tạo một ExtrudeGeometry. Cuối cùng, chúng ta kết hợp tất cả các ExtrudeGeometry vào làm một bằng hàm tiện ích `mergeBufferGeometries()` từ BufferGeometryUtils.

```javascript
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const arr = [];
svg.paths.forEach(path => {
    const shapes = SVGLoader.createShapes(path);
    shapes.forEach(shape => {
        const options = {
            depth: 2,
            bevelThickness: 2,
            bevelSize: 0.5,
            bevelSegments: 3,
            bevelEnabled: true,
            curveSegments: 12,
            steps: 1
        };
        const piece = new ExtrudeGeometry(shape, options);
        arr.push(piece);
    });
});
const geometry = mergeBufferGeometries(arr, true);
```

Vậy là chúng ta đã có một đối tượng Geometry. Chúng ta có thể cần chỉnh lại kích thước (scale), góc quay cho phù hợp với cảnh. Chúng ta cũng sẽ gọi phương thức `geometry.center()` để căn giữa đối tượng.

[Ví dụ 3D SVG](https://static.lockex1987.com/learn-threejs/chapter-06/06-02-svg.html)

![3D SVG logo](https://static.lockex1987.com/learn-threejs/screenshots/06-02-svg-logo.png)

![3D SVG map](https://static.lockex1987.com/learn-threejs/screenshots/06-02-svg-map.png)