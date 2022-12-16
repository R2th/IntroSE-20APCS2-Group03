Xin chào các bạn :grinning:! Trước đến nay, nói xử lý ảnh chắc hẳn các bạn sẽ nghĩ nó thường được Frontend đảm nhận để phục vụ cho việc hiển thị bên phía giao diện. Đúng thế! Frontend sẽ cung cấp cho bạn một thẻ có tên  <canvas> . Nó sẽ giúp bạn có thể vẽ vời, xử lý ảnh và tạo ra những hoạt họa sinh động. Tuy nhiên, đến bài biết này chắc hẳn bạn đang muốn tìm hiểu về việc thực hiện những tác vụ đó phía Backend đúng không nào :grin: Về phía Backend, NPM cũng sẽ cung cấp cho bạn một thư viện có tên `canvas` với cách xử lý khá tương đồng với thẻ <canvas> phía Fronend.  `canvas` sử dụng thư viện đồ họa mã nguồn mở Cairo 2D cho phép bạn tạo ảnh với nhiều định dạng đa dạng khác nhau như JPG, JPEG hay PNG.
# Cài đặt
Để cài đặt thư viện canvas từ [npm](https://www.npmjs.com/package/canvas) ta sử dụng câu lệnh như sau:
```
npm install canvas
# or
yarn add canvas
```
Sau khi thực hiện cài đặt xong thư viện, ta bắt đầu khởi tạo một Canvas Instance bằng hàm **createCanvas()** - tại đây cho phép chúng ta nhập thông số lần lượt là : 
* width (required) : chiều rộng canvas
* height (required) :chiều dài canvas
* type (optional) : Kiểu đối tượng khởi tạo, có thể là pdf, svg hoặc image(default)

Sau khi chúng ta tạo được một instance với một kích cỡ dài-rộng cố định, ta có thể coi như đó là một mặt phẳng vẽ mà chúng ta sẽ thao tác cùng. Trên mặt phẳng đó, ta có thể định nghĩa lên một hoặc nhiều các **context** - đóng vai trò như một bối cảnh nhỏ trong mặt phẳng, cung cấp các phương thức để thực hiện các thao tác, hình thành lên các phần tử của bản vẽ. Canvas Instance sau khi được khởi tạo hoàn toàn trống. Do đó, để thực hiện hiển thị, ta bắt buộc phải tạo một bối cảnh bằng phương thức **getContext("2d")** của Canvas instance và sử dụng các thuộc tính của **context** vẽ lên chúng.

# Thuộc tính cơ bản trong Context 
Sau đây, mình sẽ giới thiệu một số thuộc tính cơ bản của context, chủ yếu hỗ trợ cho việc khởi tạo và thao tác với văn bản:
1.  **fillStyle**: là một thuộc tính cho phép bạn định nghĩa [màu nền](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value), [độ dốc](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient) hay [kiểu mẫu](https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern) được sử dụng trong hình vẽ. Chú yếu, mọi người sử dụng nó vì mục đích đổ màu nền là nhiều hơn cả.


2. **fillRect**: là một thuộc tính giúp bạn vẽ một hình chữ nhật - cái mà sẽ được "tô vẽ" bới **fillStyle** đã được định nghĩa trước đó.

Đối với hàm `fillRect(x, y, width, height)`: (x,y) sẽ là tọa độ của hình chữ nhật nằm trên mặt phẳng canvas, tính từ góc trên bên trái. Trong khi đó (width, height) sẽ là độ rộng và chiều dài của hình chữ nhật bạn mong muốn được tạo: Với giá trị dương, chiều rộng sẽ bắt đầu từ trái qua phải - chiều dài sẽ bắt đầu từ trên xuống dưới và ngược lại. Các bạn có thể hình dung bằng hình vẽ dưới đây:
    
 ![image.png](https://images.viblo.asia/9e06a01a-999e-4ac4-afb9-bbad9c32591a.png)
 

3. **font**: là một thuộc tính định nghĩa kiểu văn bản hiển thị trong canvas dưới dạng string tương tự như chuỗi được sử dụng trong [CSS](https://www.w3schools.com/cssref/pr_font_font.asp):
```
font: "font-style font-variant font-weight font-size/line-height font-family|caption|icon|menu|message-box|small-caption|status-bar|initial|inherit"
```
Ngoài việc sử dụng những phông chữ mặc định như: Times New Roman, Arial, Helvetica,.. Bạn cũng có thể tự chèn một phông chữ bất kỳ vào hình ảnh của mình bằng việc sử dụng hàm **registerFont()** của canvas:
```
registerFont(path , {family: fontName});
```
Theo đó path sẽ là đường dẫn tới file font chữ mà bạn muốn chèn ( có thể ở định dạng otf, ttf,...) và fontName sẽ là tên font chữ bạn có thể tùy ý định nghĩa để sử dụng trong script.

4. **textAlign**: là một thuộc tính quy định vị trí của văn bản:
```
context.textAlign = "left" || "right" || "center" || "start" || "end";
```
Ở đây, ngoài các vị trí như left, right hay center đã quá quen thuộc thì còn xuất hiện thêm hai giá trị start và end sẽ liên quan đến hướng của văn bản:
- start: vị trí bắt đầu văn bản - sẽ tương tự như left nếu hướng văn bản chạy từ trái qua phải và ngược lại
- end: vị trí kết thúc văn bản - sẽ tương tự như right nếu hướng văn bản chạy từ trái qua phải và ngược lại

Hiện tại, chúng ta chủ yếu sử dụng các LTR (left-to-right) Browser nên có thể coi như mặc định start  ~ left, end ~ right.

Ở đây chúng ta có một định nghĩa về "hướng". Hướng của văn băn trong canvas được định nghĩa bởi tham số sau:
```
ctx.direction = "ltr" || "rtl" || "inherit";
```
Trong đó:
* ltr: theo hướng trái qua phải
* rtl: theo hướng phải qua trái
*  inherit (default): là hướng kế thừa từ văn bản gốc 

5. **fillText**: là một thuộc tính định nghĩa tọa độ và vị trí  văn bản hiển thị:
```
 fillText(text: string, x: number, y: number, maxWidth?: number)
```
Trong đó :
* text: nội dung văn bản hiển thị
* (x,y): tọa độ của văn bản trên hình vẽ
* maxWidth: độ rộng tối đa mà văn bản có thể hiển thị

# Áp dụng các thuộc tính trong JS
Nãy giờ, mình nói khá nhiều về lý thuyết của các thuộc tính. Bây giờ mình sẽ tự tạo một ví dụ nhỏ về việc mình kết hợp các thuộc tính trên để các bạn dễ hình dung hơn nhé:

Đầu tiên, mình sẽ "trải" một mặt phẳng xám có diện tích 300x300 để bắt đầu việc xử lý:
```
import { createCanvas } from "canvas";
import * as fs from "fs";

export const initCanvas = () => {
  const canvas = createCanvas(300, 300); // create Canvas Instance
  const context = canvas.getContext("2d"); // create context

  context.fillStyle = "#f4f4f5";
  context.fillRect(0, 0, 300, 300);
  const imageBuffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./canvas.png`, imageBuffer);
  return;
};

```

Sau đó, mình tìm thấy một phông chữ Tharon khá thú vị nên tải chúng về và đặt và thư mục static. Sau đó, sử dụng đoạn code sau để viết chữ lên mặt phẳng Canvas:
```
import { createCanvas, registerFont } from "canvas";
import * as fs from "fs";

export const initCanvas = () => {
  const canvas = createCanvas(300, 300);
  const context = canvas.getContext("2d");
  registerFont(`./static/fonts/Tharon.otf`, {
    family: "Tharon",
  });

  context.fillStyle = "#f4f4f5";
  context.fillRect(0, 0, 300, 300);

  context.font = "50px Tharon";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("Center", canvas.width / 2, canvas.height / 2);

  const imageBuffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./canvas.png`, imageBuffer);
  return;
};

```
Và đây là kết quả ban đầu mình nhận được 
![](https://images.viblo.asia/4a402e20-f8f5-43be-a59a-d81b73a8b91c.png)

Một ví dụ khác về việc hiển thị các vị trí khác nhau của văn bản theo từng giá trị thuộc tính **textAlign** :grinning:
```
import { createCanvas, registerFont } from "canvas";
import * as fs from "fs";

export const initCanvas = () => {
  const canvas = createCanvas(300, 300);
  const context = canvas.getContext("2d");
  registerFont(`./static/fonts/Tharon.otf`, {
    family: "Tharon",
  });

  context.fillStyle = "#f4f4f5";
  context.fillRect(0, 0, 300, 300);

  context.font = "50px Tharon";
  context.fillStyle = "black";

  // Tạo ra một đường thẳng chia đôi mặt phẳng
  context.beginPath();
  context.moveTo(canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, canvas.height);
  context.stroke();

  // căn giữa
  context.textAlign = "center";
  context.fillText("Center", canvas.width / 2, 50);
  // căn trái
  context.textAlign = "left";
  context.fillText("Left", canvas.width / 2, 100);
  // căn phải
  context.textAlign = "right";
  context.fillText("Right", canvas.width / 2, 150);

  //start
  context.textAlign = "start";
  context.fillText("Start", canvas.width / 2, 200);

  //end
  context.textAlign = "end";
  context.fillText("End", canvas.width / 2, 250);

  const imageBuffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./canvas.png`, imageBuffer);
  return;
};
```
Và đây là kết quả:
![](https://images.viblo.asia/80986e42-6158-4b47-880a-4f7e1f8ef508.png)

Ở đây, mình có vẽ thêm 1 đường phân chia để các bạn có thể quan sát dễ dàng nhất vị trí tương quan của các văn bản. Mình sẽ nói rõ hơn về việc vẽ các hình họa ở bài viết sau nhé :wink:

# Kết luận
Trên đây là những kiến thức ban đầu giúp các bạn tiếp cận với Canvas Node Module =)) Mình sẽ cùng các bạn tìm hiểu thêm những điều thú vị về Canvas ở các bài viết sau nhé. Hẹn gặp lạ!!! :raised_hand_with_fingers_splayed:

# Tài liệu tham khảo
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial