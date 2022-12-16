<div align="center">
    
# Lời mở đầu
    
</div>

- Giống như bao nhiều film bom tấn thì bài viết này sẽ bắt đầu với một chút flashback về cái hồi  ~2005, hồi ấy tôi đang học cấp 2 và internet trở nên phổ biến thì tôi cũng bắt đầu biết tập tọe "lướt web". Và có vẻ "trending" hồi đấy là "web động" (hồi đấy tôi nghĩ vậy) với những hình ảnh hoa rơi, tuyết rơi tràn ngập trang web để thu hút người dùng (ít nhất là nó có tác dụng với tôi). 
- Và sau hơn chục năm, "có ăn có học" đàng hoàng thì giờ tôi đã biết [phân biệt thế nào là web động và web tĩnh](https://viblo.asia/p/xay-dung-co-so-du-lieu-m68Z08O9ZkG). Nhưng kỉ niệm lại ùa về và tôi bắt đầu tìm hiểu xem làm thế nào để có thể làm được mấy cái hiệu ứng rơi rơi như kia và đáp án tôi nhận được là **HTML5 Canvas**.

<div align="center">
    
# Nội dung
    
</div>

<div align="center">
    
## HTML5 Canvas là gì?
    
</div>

![](https://images.viblo.asia/99fa9b1c-9522-4ab7-95f5-e8e922ce9368.png)

- Chắc hẳn là một người làm web đã không còn xa lạ gì với ngôn ngữ HTML (**ngôn ngữ** chứ không phải **ngôn ngữ lập trình** nhé) với những thẻ `<div>, <p>, <span>, ...` nữa rồi. Và từ phiên bản HTML5 chúng ta đã có thêm một thẻ mới cực kỳ thú vị là `Canvas`. Thẻ này sẽ thông qua những API mà HTML5 cung cấp, sử dụng javascript để vẽ ra với các đối tượng bên trong canvas như:
    - Hình ảnh (tĩnh hoặc động)
    - Các sơ đồ đơn giản
    - Biểu đồ và đồ thị
- Nếu bạn còn lăn tăn không biết Canvas có được hỗ trợ và chạy được trên các trình duyệt phổ biến hiện any hay không thì có thể check qua tại địa chỉ https://caniuse.com/canvas.

![](https://images.viblo.asia/f7a423d2-812f-4cc8-a626-a2a84323b5e0.jpg)

- Như các bạn có thể thấy thì 
    - Hầu hết các trình duyệt với các phiên bản mới đều hỗ trợ tốt cho `Canvas` (màu xanh lá), 
    - Các **phiên bản cũ** của **Firefox**, **Safari**, **Android Browser** và **toàn bộ** các phiên bản của **Opera Mini** thì hỗ trợ một phần (tức là sẽ có chức năng có thể hoạt động nhưng chức năng khác lại không)
    - Duy nhất chỉ có IE phiên bản 6-8 là không hỗ trợ nhưng chắc các bạn cũng không cần quan tâm đâu vì Microsoft cũng đã tuyên bố sẽ khai tử IE rồi. 

<div align="center">
    
## Sử dụng Canvas như thế nào
    
</div>

- Cũng giống như những thẻ HTML khác thì bạn sẽ cần khai báo thẻ `Canvas` trên trang web của bạn:

    ```html
    <canvas id="canvasId" width="xxx" height="yyy"> <!-- có thể sử dụng style="" như các thẻ HTML bình thường khác-->
    <!-- giống như thẻ <img>/<video> ... có 1 fallback content khi gặp lỗi không thể hiện thị được, 
    thì bạn cũng có thể đặt fallback content bên trong thẻ canvas  như thế này nếu như trình duyệt web không hỗ trợ.
    cái này chỉ để đề phòng thôi vì như bạn thấy ở trên, hầu hết các trình duyệt đều hỗ trợ `Canvas` hết rồi
    -->
    </canvas>
    ```

- Tiếp theo, phần cốt lõi của `Canvas` chính là phần xử lý javascript:
    ```javascript
    <script type="text/javascript">
        var canvas = document.getElementById('canvasId'), //tìm kiếm thẻ canvas thông qua Id
        ctx = canvas.getContext(contextType, contextAttributes); //hàm canvas.getContext() sẽ được nói rõ hơn ở phía dưới.
    </script>
    ```
    
- Như bạn có thể thấy thì hàm `getContext` bao gồm 2 thành phần:
    - `contextType`: là 1 trong 4 giá trị sau:
        - `2d`: tạo ra các hình ảnh 2D (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
        - `webgl`: tạo ra các hình ảnh 2D hoặc 3D, chỉ phù hợp với các trình duyệt hỗ trợ [**WebGL**](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) phiên bản 1.
        - `webgl2`: tương tự như cái trên nhưng yêu cầu trình duyệt phải hỗ trợ [**WebGL**](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) phiên bản 2.
        - `bitmaprenderer`: cung cấp một **[ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap)** để thay thế nội dung của canvas.
    - `contextAttributes`: là các thuộc tính tương ứng với mỗi loại `contentType`, ví dụ:
        - `2d`: `alpha`, `desynchronized`
        - `WebGL`: `alpha`, `desynchronized`, `depth`, ...

    => trong phạm vi bài viết này thì chúng ta sẽ làm việc với `contextType` là `2d` nhé, và chúng ta sẽ làm việc với một lưới tọa độ xOy như hình bên dưới, nó không giống với hệ tọa độ mà chúng ta vẫn thường dùng vì gốc tọa độ nằm ở góc trên bên trái 
    
![](https://images.viblo.asia/946cde4a-5a87-4b9e-ad8d-4865fab63841.png)

- Và tất nhiên rồi, thức toán học 12 năm phổ thông + mấy năm đại học sẽ có đất dụng võ ở đây. Bắt đầu với một số hàm cơ bản nào:
    - Để vẽ hình:
        - `fillStyle`: chọn màu để tô (có thể dùng mã màu rgb() hoặc dùng tên màu đều được nhé)
        - `fillRect(x, y, width, height)`: vẽ hình chữ nhật. 
        - `moveTo(x,y)`: di chuyển bút (vị trí bắt đầu vẽ) đến tọa độ (x,y)
        - `lineTo()`: vẽ 1 đường thẳng từ vị trí đặt bút hiện tại đến tọa độ (x,y)
        - `arc(x,y,radius, startAngle, endAngle, counterclockwise)`: vẽ một vòng cung với tâm là (x,y), bán kính là `radius`, góc bắt đầu, góc kết thúc và chiều vẽ là người chiều kim đồng hồ hay không (true/false)
        - `beginPath()`: bắt đầu vẽ
        - `closePath()`: kết thúc vẽ ()
        - `stroke()`: hiển thị đường đã vẽ với màu mặc định là màu đen (**Không tô màu phần bên trong hình**)
        - `fill()`: cũng là để vẽ nhưng dùng fill thì sẽ tô hết cả vùng được vẽ
    - Để viết chữ:
        - `font`: khai báo font chữ
        - `strokeText(text, x, y)`: viết chữ bắt đầu từ tọa độ (x,y)  (**không tô màu chữ**)
        - `fillText(text, x, y)`: viết chữ bắt đầu từ tọa độ (x,y) 
    - Để vẽ hình:
        - `drawImage(img, x, y)`: vẽ hình bắt đầu từ tọa độ (x,y)
        
- Nào, bây giờ hãy thử dùng những hàm được liệt kê ở trên để vẽ một cái gì đấy đơn giản nhé, chắc dễ nhất là vẽ quốc kỳ:
    - Quốc kỳ Ý này (nó chỉ gồm 3 hình chữ nhật đứng cạnh nhau thôi)
{@embed: https://codepen.io/thaivm-1377/pen/yLMpLZm}

    - Nêu muốn luyện tập thêm cho quen tay, các bạn có thể tự thử thách bản thân với những quốc kỳ khác phức tạp hơn, ví dụ như là cờ Mỹ chẳng hạn (nghĩ cảnh vẽ 50 ngôi sao đã nản rồi :D :D :D).
    
- Đó là những thao tác vẽ vời cực kỳ đơn giản với canvas, sau khi đã thành thạo rồi và muốn thử làm cái gì đấy "người lớn" hơn thì có thể xem 3 bài viết mình liệt kê ở phần tổng kết để biết `Canvas` có thể làm được nhiều thứ như thế nào nhé!

<div align="center">
    
# Tổng kết
    
</div>

- Sau bài viết này, hy vọng rằng các bạn đã có thêm một công cụ hữu dụng để áp dụng vào cho trang web của bạn trông sinh động hơn nhé.
- Tất nhiên những điều mình liệt kê ở trên chỉ là những thứ cơ bản nhất, khi đã quen với những thao tác cơ bản kia rồi thì bạn có thể thử với những "bài tập nâng cao hơn" như:
    - [Hiệu ứng rơi rơi như thế này](https://viblo.asia/p/huong-dan-lam-hieu-ung-hoa-roi-tuyet-roi-la-roi-nguoi-doi-oOVlYjpa58W) 
    - [Mấy cái chấm bay bay nối với nhau như thế này ](https://viblo.asia/p/huong-dan-lam-may-cai-cham-bay-bay-va-co-day-noi-no-voi-nhau-va-noi-voi-chuot-bang-canvas-1VgZvDz75Aw).
    - [Làm game "đơn giản" như thế này](https://viblo.asia/p/beezaro-lam-html-canvas-game-bang-create-js-AQ3vVk3ZRbOr)

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- 
- Viblo: https://viblo.asia/tags/canvas
- Canvas API docs: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial