Croppie là một thư viện javascript dùng để crop ảnh. Croppie có hỗ trợ thay đổi kích thước ảnh, phong to, thu nhỏ ảnh, set dạng của ảnh thành hình vuông hoặc hình tròn...
### Cách sử dụng
* Download source code [coppie.js](https://github.com/Foliotek/Croppie/releases)
* import croppie.css và croppie.js
```
<link rel="stylesheet" href="croppie.css" />
<script src="croppie.js"></script>
```
* cách gọi method croppie
```
var c = new Croppie(document.getElementById('item'), opts);
c.method(args);
```
hoặc nếu không cần đối tượng có thể gọi
```
$('#item').croppie(opts);
$('#item').croppie(method, args);
```

Ví dụ:

`<div id="resizer-demo"></div>`

```
var el = document.getElementById('resizer-demo');
var resize = new Croppie(el, {
    viewport: { width: 100, height: 100 },
    boundary: { width: 300, height: 300, type: 'circle },
    showZoomer: true,
    mouseWheelZoom: 'ctrl'
});
resize.bind({
    url: 'image.png',
});
```
![](https://images.viblo.asia/aa5efc41-3039-4270-abf0-eaf680a05e9f.png)

**Các opts thường dùng của croppie**

| Opts |  |
| -------- | -------- |
| boundary     | Kích thước khung bên ngoài vd: `boundary: { width: 300, height: 300 }`    |
| enableResize     | Cho phép thay đổi kích thước viewport default: false     |
| enableZoom     | Cho phép phong to và thu nhỏ ảnh. Default: false     |
| mouseWheelZoom     | Scroll chuột để phong to và thu nhỏ ảnh. Default: true     |
| showZoomer     | Hiển thị phong to và thu nhỏ slider. Default: false     |
| viewport     | Khung bên trong của croppie. Khung hiển thị ảnh được crop. Default `{ width: 100, height: 100, type: 'square' }`. Có 2 loại viewport: `'square'` và 'circle'     |


**Các link tài liệu để tìm hiểu sâu hơn về coppie.js**
* https://www.npmjs.com/package/croppie
* https://github.com/foliotek/croppie
* https://cdnjs.com/libraries/croppie
* https://foliotek.github.io/Croppie/