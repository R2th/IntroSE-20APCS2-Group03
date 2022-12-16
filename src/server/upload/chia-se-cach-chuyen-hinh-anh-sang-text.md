Hello các bạn, hôm nay mình lang thang và tìm được một đoạn code chuyển hình ảnh của bạn thành các đoạn text. Chỉ với HTML, CSS, Javascript chúng ta đã có thể tự làm cho mình một avatar thật độc lạ.

###### Let's go! 
Đầu tiên các bạn cần thêm đoạn code HTML, CSS để có tạo một ``input file`` và một ``button`` đơn giản nhé, về Css các bạn có thể tự custom theo ý mình, ở đây mình làm đơn giản thui
```html
<h4>Create Char Picture</h4>
<input type="file" id="file" accept="imgage/*" />
<button type="button" onclick="showImage()">Create</button><br />
<img src="" style="width: 100px;" />
<pre id="show"></pre>
```
Chúng ta có một ``input`` file để có thể import file image mà bạn muốn chuyển sang text, ``button`` "Create" để action chuyển đổi text, và nơi chúng ta sẽ thấy được kết quả là ``<pre />``
Tạo một file ``index.js`` và paste đoạn code sau nhé (nhớ là import file ``index.js`` vào file HTML vừa tạo trên nhé)
```js
cont show = document.getElementById("show"),
    img = document.getElementsByTagName("img")[0],
    canvas = document.createElement("canvas");
    function showImage() {
    const file = document.getElementById("file").files[0],
      ctx = canvas.getContext("2d"),
      url = URL.createObjectURL(file);
    if (!file) {
      alert("Vui lòng chọn tệp tin");
    }
    img.src = url;
    img.onload = function () {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      show.innerText = toChars(ctx, canvas.width, canvas.height, 200);
    };
 }
```
Đoạn code trên dùng ``canvas`` để vẽ ra một image đồng thời chuyển chúng sang text từ file imgae chúng ta import từ máy tính của bạn.

Và "linh hồn" của thuật toán này là chuyển đổi sang text => hàm ``toChars``
```js
const map = getCharsMap();
 function toChars(context, width, height, rowChar) {
        const pixels = [];
        let output = "";
        const imageData = context.getImageData(0, 0, width, height);
        const rowChars = width < rowChar ? width : rowChar;
        const char_h = width / rowChars;
        const char_w = char_h;
        const rows = height / char_h;
        const cols = rowChars;
        getBlockGray = function (x, y, w, h) {
          let sumGray = 0;
          let pixels = 0;
          for (let row = 0; row < w; row++) {
            for (let col = 0; col < h; col++) {
              const cx = x + col,
                cy = y + row,
                index = (cy * imageData.width + cx) * 4,
                data = imageData.data,
                R = data[index],
                G = data[index + 1],
                B = data[index + 2],
                gray = ~~(R * 0.3 + G * 0.59 + B * 0.11);
              sumGray += gray;
            }
          }
          pixels = w * h;
          return ~~(sumGray / pixels);
        };
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const pos_x = ~~(c * char_h),
              pos_y = ~~(r * char_h),
              avg = getBlockGray(pos_x, pos_y, ~~char_w, ~~char_h),
              ch = map[avg];
            output += ch;
          }
          output += "\r\n";
        }
        return output;
      }
      function getCharsMap() {
        const chars = ["@", "w", "#", "$", "k", "d", "t", "j", "i", ".", " "];
        const step = 25,
          map = {};
        for (let i = 0; i < 256; i++) {
          const index = ~~(i / 25);
          map[i] = chars[index];
        }
        return map;
      }
```
Nhìn hơi choáng đúng không mọi người, :joy::joy: . Không sao việc của chúng ta là paste vào thui.(À, các bạn có thể đổi size của text bằng việc thay đổi ``rowChar`` ở function trên nka)
Và cuối cúng đây là thành quả:

![](https://images.viblo.asia/d04a230d-1773-42c9-b936-491c72211ec8.PNG)

Nhìn ngầu không mọi người :stuck_out_tongue_winking_eye:. 

Trên đây là chia sẻ cách chuyển hình ảnh sang text mà mình tìm được, hi vọng các bạn có thể làm được và có những phút giây giải trí với bài này nhé. Cảm ơn mọi người.