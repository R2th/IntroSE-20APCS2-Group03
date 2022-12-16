Chắc hẳn trong chúng ta ai cũng đã từng nghe nhạc bằng trình nghe nhạc mặc định của Windows là Windows Media Player (WMP) rồi nhỉ? Và có ai đã từng bỏ hàng giờ ra chỉ để ngồi nhìn cái Visualization của nó không? Còn mình, những lúc chán nản hay căng thẳng, mình thường ngồi nhìn nó để... không làm gì cả :D! Hay đơn giản là đôi lúc thử nhìn xem nó có biểu diễn theo đúng nhịp nhạc hay không.

Ngày trước, mình cũng hay sưu tầm các Visualizations cho WMP và thấy những người viết ra cái này thực sự là bá đạo. Và mình cũng đã thử tìm hiểu để tự tạo riêng cho mình một cái visualization nhưng không thành (có thể do khác biệt ngôn ngữ - mình học làm web). Cho đến gần đây, khi các trình duyệt hiện đại như Google Chrome, Firefox, ... đã hỗ trợ AudioContext API thì niềm đam mê với visualization lại trỗi dậy. Mình thường đi tìm và sưu tầm các visualizations dành cho web. Và cũng thử tìm hiểu xem nó được viết như thế nào. Nên nay mình sẽ chia sẻ với mọi người cách viết một visualizations đơn giản bằng JavaScript và HTML nhé.

Kiến thức trong bài viết này là do mình lượm lặt trên mạng, tổng hợp lại và viết lại theo sự hiểu biết của mình để làm sao cho mọi người có cái nhìn cơ bản nhất về việc tạo ra một visualizations. Bắt đầu nhé.

# Lấy dữ liệu

Việc đầu tiên, chúng ta cần lấy dữ liệu (là tần số) để thực hiện tạo visualize bằng cách sử dụng [**Web Audio API**](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). Và đặc biệt, là chúng ta cần một thứ được gọi là [**AnalyserNode**](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode). AnalyserNode sẽ cung cấp dữ liệu về tần số của audio theo thời gian thực cho chúng ta. Và chúng ta sẽ sử dụng dữ liệu đó để thực hiện tạo visualize.

Và bước khởi đầu, chúng ta cần một thẻ `<input type="file">` để lựa chọn file audio, thẻ `<audio>` ([**HTML5 Audio**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)) để thực hiện tải và phân tích file và thẻ `<canvas>` để biểu diễn data mà chúng ta nhận được khi phân tích.

```HTML
<p><input type="file" id="input-file" accept="audio/*" /></p>
<p><audio id="audio" controls="controls" style="width: 100%"></p>
<canvas id="canvas" style="width: 100%; height: 200px"></canvas>
```

Giờ chúng ta thực hiện lấy và phân tích tần số của file thông qua AnalyserNode (mình sẽ làm việc với DOM bằng JS thuần thay vì dùng jQuery).

```JavaScript
// Bắt đầu thực hiện khi DOM được load hoàn thành
window.onload = function() {
  // Lấy file, audio và canvas element
  var fileElm = document.querySelector("#input-file");
  var audioElm = document.querySelector("#audio");
  var canvasElm = document.querySelector("canvas");
  canvasElm.width = window.innerWidth;
  canvasElm.height = window.innerHeight;
      
  // Thực hiện xử lý khi một file audio được chọn
  fileElm.onchange = function() {
    // Gắn đường source cho audio element với file đầu tiên trong danh sách các file đã chọn
    // File object thường là 1 array do input type file có thể chấp nhận thuộc tính multiple
    // để chúng ta có thể chọn nhiều hơn một file. URL.createObjectURL sẽ giúp chúng ta tạo ra một
    // DOMString chứa URL đại diện cho Object được đưa vào. Bạn có thể xem chi tiết tại: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    audioElm.src = URL.createObjectURL(this.files[0]);
    
    // Tiếp theo, tải file và thực hiện play file đã được chọn
    audioElm.load();
    audioElm.play();
    
    // Tiếp, khởi tạo AudioContext
    var audioContext = new AudioContext();
    // Khởi tạo AudioContext source
    var audioContextSrc = audioContext.createMediaElementSource(audio);
    // Khởi tạo Analyser
    var audioAnalyser = audioContext.createAnalyser();
    // Khởi tạo 2D canvas
    canvasContext = canvasElm.getContext("2d");
    
    // Kết nối AudioContext source với Analyser
    audioContextSrc.connect(audioAnalyser);
    // Kết nối Analyser với AudioDestinationNode
    audioAnalyser.connect(audioContext.destination);
    
    // Gán FFT size là 256 cho Analyser
    // Các bạn có thể xem thêm tại: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    audioAnalyser.fftSize = 256;
    
    // Lấy dữ liệu tần số từ Analyser
    // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount
    var analyserFrequencyLength = audioAnalyser.frequencyBinCount;
    
    // Khởi tạo một mảng số nguyên dương 8-bit có số lượng phần tử bằng analyserFrequencyLength
    var frequencyDataArray = new Uint8Array(analyserFrequencyLength);
    
    // Lấy width và height của canvas
    var canvasWith = canvasElm.width;
    var canvasHeight = canvasElm.height;
    
    // Tính toán barWidth và barHeight
    var barWidth = (canvasWith / analyserFrequencyLength) * 2.5;
    var barHeight;
    var barIndex = 0;
    
    function renderFrame() {
      // Thông báo với trình duyệt rằng chúng ta đang chuẩn bị thực hiện một animation với method là như này. Hãy chuẩn bị đi =)
      // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
      window.requestAnimationFrame(renderFrame);
      
      // Reset lại barIndex trở về 0
      barIndex = 0;
      
      // Điền dữ liệu tần số vào mảng
      audioAnalyser.getByteFrequencyData(frequencyDataArray);
      
      // Vẽ một hình chữ nhật với nền màu đen
      canvasContext.fillStyle = "#000";
      canvasContext.fillRect(0, 0, canvasWith, canvasHeight);
      
      // Chạy lần lượt từ 0 đến hết dữ liệu tần số của Analyser
      for (var i = 0; i < analyserFrequencyLength; i++) {
        barHeight = frequencyDataArray[i];
        // Tạo màu cho thanh bar
        var rgbRed = barHeight + (25 * (i / analyserFrequencyLength));
        var rgbGreen = 250 * (i / analyserFrequencyLength);
        var rgbBlue = 50;
        
        // Điền màu và vẽ bar
        canvasContext.fillStyle = "rgb("+ rgbRed +", "+ rgbGreen +", "+ rgbBlue +")";
        canvasContext.fillRect(barIndex, (canvasHeight - barHeight), barWidth, barHeight);

        barIndex += (barWidth + 1);
      }
    }
    // Gọi method để render vào canvas
    renderFrame();
  }
}
```

{@embed:https://codepen.io/namnv609/pen/LaLobR}

Đến đây là kết thúc rồi. Bạn có thể chọn một bài hát và thử kết quả xem sao :D! Bài viết này chỉ là giới thiệu để mọi người có cái nhìn cơ bản về cách tạo visualize đơn giản cho audio bằng HTML và JavaScript. Bạn có thể thực hiện nhiều thứ hay ho hơn khi kết hợp với Three.JS nếu muốn. Hẹn gặp lại mọi người trong các bài viết tiếp theo :wave:!

> Original post: https://namnv609.cf/posts/simple-audio-visualizations-with-javascript-html.html