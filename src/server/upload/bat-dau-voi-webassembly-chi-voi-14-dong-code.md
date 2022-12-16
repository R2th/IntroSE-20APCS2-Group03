# Giới thiệu
Nếu bạn vẫn chưa hề nghe nói đến WebAssembly, thì đây là một công nghệ rất mới tuy chưa phổ biến nhưng đang nhận được sự quan tâm lớn trong thiết kế Web. WebAssembly chỉ đơn giản là một dạng tệp nhị phân cấp thấp cho nền tảng Web, tương tự tệp nhị phân .exe trên Windows chẳng hạn. Bạn *không trực tiếp viết ra mã WebAssembly*. Thay vào đó, bạn viết code bằng các ngôn ngữ bậc cao như C, C++ hay Rust, sau đó biên dịch nó sang WebAssembly để chạy nó trên trình duyệt.

WebAssembly là một công nghệ mở, hoạt động đa nền tảng và chạy với hiệu suất *gần-như-bản-địa*. Mặc dù là ngôn ngữ bậc thấp, nó lại cực kỳ an toàn vì hoàn toàn chạy trong môi trường cách ly (sandbox) trong trình duyệt Web, tương tự với JavaScript. Tuy nhiên phải nhớ rằng, WebAssembly không được tạo ra để thay thể JavaScript.

Vì là một công nghệ rất mới, các hướng dẫn về WebAssembly có phần khá phức tạp và có vẻ đáng sợ. Bài viết này sẽ giúp bạn tạo một dự án cực đơn giản sử dụng WebAssembly, đồng thời bỏ qua những chi tiết rườm rà nhất có thể.

# Tổng quan
Hiện tại, để sử dụng WebAssembly trong một trang Web, bạn cần thực hiện qua những bước sau đây:
1. Viết chương trình, các hàm, các tính năng bạn muốn bằng một trong 3 ngôn ngữ C, C++, hoặc Rust.
2. Biên dịch nó thành dạng WebAssembly (có đuôi .wasm).
3. Đưa file .wasm đó vào project Web của bạn.
4. Sử dụng vài dòng mã JavaScript đơn giản để khởi tạo và sử dụng file WebAssembly đó.

Ở bài viết này, mình sẽ hướng dẫn các bạn sử dụng công cụ online (WasmExplorer) để biên dịch mã C++ sang WebAssembly, bạn hoàn toàn không cần cài bất cứ công cụ nào khác vào máy tính cả!

Nếu bạn không biết C/C++ thì cũng đừng quá lo, mình sẽ cung cấp sẵn một đoạn mã C vô cùng đơn giản, chỉ có một hàm cộng hai số a và b. Sau khi đã hoàn tất, bạn có thể gọi hàm này như thể nó là một hàm được viết trong JavaScript!
# Tiến hành
## Bắt đầu viết code C nào
Hàm cộng hai số a và b của mình với C++ như sau:
```C
int add(int a, int b) {
  return a + b;
}
```

Quá dễ nhỉ? Nên nhớ rằng bạn chưa cần phải tải hay cài đặt bất kỳ công cụ nào khi thực hiện hướng dẫn này!

## Biên dịch đoạn mã
Như đã nói ở trên, chúng ta sẽ biên dịch qua một công cụ online, tên là WasmExplorer. Hãy truy cập vào địa chỉ dưới đây:

https://mbebenita.github.io/WasmExplorer/

Nhớ chọn ngôn ngữ biên dịch là C99. Sau đó bạn dán đoạn code C phía trên vào khung bên trái và nhấn COMPILE như hình dưới đây:

![WasmExplorer](https://images.viblo.asia/0920195f-fa8e-4ffb-b3d3-6f5821806ca8.png)

Sau khi nhấn vào nút biên dịch, bạn có thể sẽ để ý đến dữ liệu tại khung ở giữa. Đây là dạng mã WASM dưới dạng đọc được, hay còn gọi là WAT (WebAssembly Text Format). Phía bên phải là mã Assembly kết quả cho Firefox.

Giờ hãy để ý một chút đến đoạn mã WAT. Với mỗi hàm bạn viết bằng ngôn ngữ C (như trong ví dụ trên là hàm *add*), sau khi biên dịch xong, những hàm đó sẽ đều thuộc về một thứ có tên *export*. Bây giờ bạn có thể tạm hiểu, *export* là một nơi giúp bạn sử dụng và tương tác được các hàm đã viết với ngôn ngữ C qua JavaScript. Nhìn qua đoạn mã WAT, bạn sẽ thấy hai dòng export như sau:

```
(export "memory" (memory $0))
(export "add" (func $add))
```

Điều đó có nghĩa *memory* và *add* là hai hàm mà ta có thể sử dụng được từ chương trình WebAssembly. *add* chính là hàm mà chúng ta đã tạo, và hiện tại bạn chưa cần quan tâm đến *memory*.

Tiếp theo, hãy tải file *.wasm* về bằng cách ấn vào nút Download phía trên khung ở giữa (có nền màu tím).

## Khởi tạo trang Web
### Tạo thư mục
Tạo thư mục và các file như biểu đồ dưới đây:
```
wasm-example
|--index.html
|--script.js
|--add.wasm
```

### Thêm file *add.wasm* vào thư mục
Bạn chỉ cần đổi tên file *.wasm* đã tải được ở bước trên và thêm vào thư mục dự án.

### Mã HTML
Mã HTML dưới đây chỉ có nhiệm vụ đơn giản là nhúng file JavaScript. Nội dung của file *index.html* như sau:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>WebAssembly Example</title>
  <script src="script.js"></script>
</head>
<body>
</body>
</html>
```

### Khởi tạo với JavaScript
Hiện tại, để sử dụng các hàm viết trong WebAssembly, bạn phải thực hiện một số bước với JavaScript. Có 3 bước chính:
1. Tải dữ liệu file .wasm và lưu ở dạng *array buffer*.
2. Biên dịch dữ liệu trên thành các WebAssembly module.
3. Khởi tạo ra một *instance* chứa các module đó để sử dụng.

Đoạn mã giúp thực hiện các bước trên:
```javascript
var add;

const loadWebAssembly = fileName => fetch(fileName)
  .then(response => response.arrayBuffer())
  .then(bits => WebAssembly.compile(bits))
  .then(module => {
    return new WebAssembly.Instance(module)
  });

loadWebAssembly("add.wasm")
  .then(instance => {
    add = instance.exports.add;
    console.log('Ready!');
  });
```

Hàm `loadWebAssembly()` giúp thực hiện những bước ở trên: tải file *.wasm*, biên dịch nó và trả về kết quả là một *instance* chứa các module. Ở đoạn mã JavaScript trên, mình gọi hàm `loadWebAssembly` với file *add.wasm*, sau gán hàm *add* vào một biến toàn cục để tiện cho việc sử dụng.

Từ bây giờ, bất cứ khi nào gọi hàm *add*, ví dụ khi nhập `add(2, 3)` trên console chẳng hạn, bạn sẽ nhận được kết quả tương ứng:

![Khởi tạo WebAssembly module từ JavaScript](https://images.viblo.asia/ff7d7b26-5e5a-44ce-bafa-bdbe2ea68d00.png)

## Thậm chí còn ngắn hơn và tối ưu hơn nữa?!
Với hàm `WebAssembly.complieStreaming()`, đoạn code trên còn có thể rút gọn thành như sau:
```javascript
var add;

WebAssembly.compileStreaming(fetch("https://tranxuanthang.github.io/wasm-example/add.wasm"))
  .then(module => WebAssembly.instantiate(module))
  .then(instance => {
    add = instance.exports.add;
    console.log('Ready!');
  });
```

Bằng cách sử dụng  `WebAssembly.complieStreaming()`, các trình duyệt sẽ ngay lập tức thực hiện biên dịch ngay khi file WebAssembly của bạn còn đang download! Lưu ý rằng, đây còn là hàm thử nghiệm, và tại thời điểm viết bài, nhiều trình duyệt còn chưa được hỗ trợ.
## Ví dụ hoàn chỉnh
Ví dụ dưới đây đã được bổ sung thêm giao diện người dùng, sử dụng hàm *add* để cộng hai số từ khung nhập.

https://tranxuanthang.github.io/wasm-example/

{@embed: https://jsfiddle.net/tranxuanthang/fu05chj1/6/embed/js,html,result/dark/}

# Tham khảo
[Get started with WebAssembly — using only 14 lines of JavaScript](https://medium.freecodecamp.org/get-started-with-webassembly-using-only-14-lines-of-javascript-b37b6aaca1e4)
[Loading WebAssembly modules efficiently](https://developers.google.com/web/updates/2018/04/loading-wasm)