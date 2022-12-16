![](https://images.viblo.asia/2e834ac8-1316-4d57-b0a8-785c9b7d4af6.gif)

Bài này là một bài mỳ ăn liền về Machine Learning, giúp bạn thử vọc vạch xem nó có gì hay ho, có gì thú vị và sức mạnh của nó có thực sự kinh hồn như các bài viết khác vẫn hay nói không.
# Machine Learning và Artificial Intelligent là một à?
Trước hết xin nói rõ đây là 2 khái niệm hoàn toàn khác nhau và hay bị nhầm lẫn, AI (Trí tuệ nhân tạo) rộng hơn ML (Machine Learning). Hãy em biểu đồ sau đây và bạn sẽ rõ.

![](https://images.viblo.asia/c8e4b1c8-a688-4586-ad73-cb038944ef2e.jpg)

Machine Learning  (Máy Học, hay còn gọi là Mạng Neural Tự Học) chỉ là một nhánh của Trí tuệ nhân tạo (AI) và nó cũng là một thuật toán phổ biến nhất. Gọi nó là `thuật toán` cũng không sai, vì nó sử dụng `TOÁN HỌC`, chính xác hơn là `Xác xuất thống kê` và cả `Hồi quy tuyến tính` để phỏng đoán **đầu ra** của một tập dữ liệu **đầu vào**.

Hãy xem qua ví dụ mô tả cách hoạt động của Machine Learning trực quan sau đây:


![](https://images.viblo.asia/72900b8d-e094-4e29-8755-7ae521e5f255.gif)

Marchine Learning rất đơn giản, bao gồm 3 thành phần chính sau đây:

1. **Tập dữ liệu đầu vào** dùng để `TRAINING - HUẤN LUYỆN` mạng Neural nhằm chỉ ra với đầu vào như này thì đầu ra phải như này.
2. **Một mạng lưới Neural nhiều lớp**, chứa đựng các thuật toán đặc biệt giúp mạng Neuron này có thể `HỌC HỎI` từ tập dữ liệu training, sau đó đưa cho nó **1 dữ liệu** không có trong **tập Training**, nó sẽ chọn lựa và thu gọn data, để cuối cùng ta sẽ thu được một con số % (trong khoảng từ 0.0 đến 1.0), thể hiện độ chính xác của phán đoán.
3. **Tập dữ liệu Testing**, chính là các dữ liệu chưa có đầu ra cần đưa vào sàng lọc trong hệ thống mạng Neural xem nó có ra kết quả đúng với thực tế không.

> Ví dụ bên trên ta thấy những bức ảnh chó và mèo đã được tổng hợp và đánh nhãn cụ thể, được đưa vào mạng Neural để nó học. Sau đó ta đưa cho nó một ảnh bất kỳ, nó sẽ phán đoán là ảnh chó hay mèo, thể hiện bằng con số % như hình dưới đây.

![](https://images.viblo.asia/6c655257-518b-452d-b927-3801bc0e9aaf.gif)


# Thế thì Machine Learning có gì ghê gớm?
Như vậy thì ta thấy Machine Learning chỉ có thể làm việc được nếu có tập đầu vào và yêu cầu đầu ra cụ thể, các bài toán về nhận diện ảnh, nhận dạng chữ viết, nhận dạng màu sắc chính là thế mạnh của machine learning. Chúng ta hãy thử làm vài ví dụ để xem Machine Learning có ứng dụng cụ thể như thế nào nhé.

Mình lại tiếp tục sử dụng Javascript để làm ví dụ, và Javasript thì có vô vàn thư viện hỗ trợ mạng Neural Network. Cụ thể thì mình sẽ dùng https://github.com/BrainJS/brain.js

## Sử dụng Machine Learning tự động nhận diện màu sắc:

Nếu làm web bạn sẽ gặp tình huống Background màu tối thì chữ phải màu sáng mới nổi, hoặc ngược lại. Thường thì bạn sẽ phải chọn một bảng màu cố định cho web và ứng với mỗi màu nền bạn cho màu chữ trắng hoặc đen tương ứng.

![](https://images.viblo.asia/d54bf402-33de-400e-9a72-694a8294e5f9.png)


Nhưng nếu trang web mà người dùng tự chọn màu thì thế nào? Chịu chứ còn làm sao, đành cho chữ cố định một màu, vì làm sao Javascript nhận diện được người dùng chọn màu nào là tối, màu nào là sáng.

Lúc này đây Machine Learning có thể có đất diễn. Hãy thử làm một `hệ thống tự động nhận diện màu sắc` xem sao.

> **Yêu cầu đặt ra:**
> 
>  Người dùng được cho một bảng màu chọn tùy ý RGB.
>  
>  Mình phải viết hàm Javascript để tự động nhận diện được màu đó tên là màu gì.
>  
>  Nó là màu tối hay màu sáng.
>  
>  Sau đó hiển thị chữ đen hoặc trắng lên nền màu đó cho đẹp.

Trước hết ta sẽ cần tải brain.js từ CDN về bằng link:
```js
  <!--Sử dụng brain.js để dùng thuật toán Machine Learning -->
  <script src='https://unpkg.com/brain.js@1.1.2/browser.min.js'></script>
```
Sau đó ta bắt đầu tạo được mạng Neural chứa các lớp để đào tạo nó `học nhận diện màu đậm nhạt` từ mảng màu cố định.

```js
/*----- Tạo ra mạng Neural thứ nhất. Dùng để đào tạo nhận diện độ đậm nhạt của màu ----*/
const ColorDarknetwork = new brain.NeuralNetwork()
/*------Bắt đầu Training mạng này với tập đầu vào bên dưới ---*/
ColorDarknetwork.train([
  { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },  //Đây là một phần tử dùng để huấn luyện, gồm đầu vào và đầu ra.
  { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
  { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
  { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
  { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
  { input: {r: 1, g: 0.99, b: 0}, output: { light: 1 } },
  { input: {r: 1, g: 0.42, b: 0.52}, output: { dark: 1 } },
  ])
```
Như vậy là `ColorDarknetwork` sẽ mất một thời gian để ngấm hết đống này. Cứ để nó học, ta đi tạo tiếp một mạng Neural thứ hai, dùng để đào tạo nhận dạng `tên của màu đang chọn`

```js
/*----- Tạo ra mạng Neural thứ hai. Dùng để đào tạo nhận diện tên của màu ----*/
    const ColorNameNetwork = new brain.NeuralNetwork();
    /*------Bắt đầu Training mạng này với tập đầu vào bên dưới ---*/
          ColorNameNetwork.train([
          { input: { r: 1, g: 0.13333333333333333, b: 0.10588235294117647 }, output: { red: 1 } },
          { input: { r: 1, g: 0.35294117647058826, b: 0.1450980392156863 }, output: { red: 1 } },
          { input: { r: 1, g: 0.5058823529411764, b: 0.4470588235294118 }, output: { red: 1 } },
          { input: { r: 1, g: 0.6470588235294118, b: 0.615686274509804 }, output: { red: 1 } },
          { input: { r: 0.7568627450980392, g: 0.1411764705882353, b: 0.13725490196078433 }, output: { red: 1 } },
          { input: { r: 0.7568627450980392, g: 0.1411764705882353, b: 0.2901960784313726 }, output: { red: 1 } },
          { input: { r: 0.7568627450980392, g: 0.34509803921568627, b: 0.4196078431372549 }, output: { red: 1 } },
          { input: { r: 0.788235294117647, g: 0, b: 0.21568627450980393 }, output: { red: 1 } },
          { input: { r: 1, g: 0.36470588235294116, b: 0.06666666666666667 }, output: { red: 1 } },
          { input: { r: 1, g: 0.2549019607843137, b: 0.42745098039215684 }, output: { pink: 1 } },
          { input: { r: 1, g: 0.26666666666666666, b: 0.6392156862745098 }, output: { pink: 1 } },
          { input: { r: 1, g: 0.10196078431372549, b: 0.7686274509803922 }, output: { pink: 1 } },
          { input: { r: 1, g: 0.011764705882352941, b: 0.7607843137254902 }, output: { pink: 1 } },
          { input: { r: 1, g: 0.18823529411764706, b: 0.6901960784313725 }, output: { pink: 1 } },
          { input: { r: 1, g: 0.4196078431372549, b: 0.7333333333333333 }, output: { pink: 1 } },
          { input: { r: 0.9333333333333333, g: 0.2823529411764706, b: 1 }, output: { purple: 1 } },
          { input: { r: 0.7607843137254902, g: 0.07058823529411765, b: 1 }, output: { purple: 1 } },
          { input: { r: 0.8509803921568627, g: 0.5176470588235295, b: 1 }, output: { purple: 1 } },
          { input: { r: 0.9411764705882353, g: 0.7764705882352941, b: 1 }, output: { purple: 1 } },
          { input: { r: 0.5137254901960784, g: 0.2549019607843137, b: 1 }, output: { purple: 1 } },
          { input: { r: 0.47058823529411764, g: 0.4392156862745098, b: 1 }, output: { purple: 1 } },
          { input: { r: 0.5529411764705883, g: 0.5058823529411764, b: 1 }, output: { purple: 1 } },
          { input: { r: 0.2901960784313726, g: 0.22745098039215686, b: 1 }, output: { blue: 1 } },
          { input: { r: 0.5254901960784314, g: 0.5647058823529412, b: 1 }, output: { blue: 1 } },
          { input: { r: 0.2784313725490196, g: 0.3568627450980392, b: 1 }, output: { blue: 1 } },
          { input: { r: 0.0196078431372549, g: 0.12549019607843137, b: 1 }, output: { blue: 1 } },
          { input: { r: 0.07058823529411765, g: 0.592156862745098, b: 1 }, output: { blue: 1 } },
          { input: { r: 0.2980392156862745, g: 0.9254901960784314, b: 1 }, output: { blue: 1 } },
          { input: { r: 0.5215686274509804, g: 1, b: 0.9294117647058824 }, output: { blue: 1 } },
          { input: { r: 0.596078431372549, g: 1, b: 0.7529411764705882 }, output: { green: 1 } },
          { input: { r: 0.37254901960784315, g: 1, b: 0.43137254901960786 }, output: { green: 1 } },
          { input: { r: 0.07450980392156863, g: 1, b: 0.34901960784313724 }, output: { green: 1 } },
          { input: { r: 0.1568627450980392, g: 1, b: 0.07450980392156863 }, output: { green: 1 } },
          { input: { r: 0.6509803921568628, g: 1, b: 0.396078431372549 }, output: { green: 1 } },
          { input: { r: 0.788235294117647, g: 1, b: 0.6235294117647059 }, output: { green: 1 } },
          { input: { r: 0.8274509803921568, g: 1, b: 0.08627450980392157 }, output: { green: 1 } },
          { input: { r: 0.7607843137254902, g: 1, b: 0.11764705882352941 }, output: { green: 1 } },
          { input: { r: 0.12549019607843137, g: 1, b: 0.5529411764705883 }, output: { green: 1 } },
          { input: { r: 0.9176470588235294, g: 1, b: 0.3411764705882353 }, output: { yellow: 1 } },
          { input: { r: 1, g: 0.7803921568627451, b: 0.3411764705882353 }, output: { yellow: 1 } },
          { input: { r: 0.8941176470588236, g: 1, b: 0 }, output: { yellow: 1 } },
          { input: { r: 1, g: 0.9254901960784314, b: 0.027450980392156862}, output: { yellow: 1 } },
          { input: { r: 1, g: 0.9686274509803922, b: 0.4980392156862745 }, output: { yellow: 1 } },
          { input: { r: 1, g: 0.8509803921568627, b: 0.38823529411764707 }, output: { yellow: 1 } },
          { input: { r: 1, g: 0.6313725490196078, b: 0 }, output: { orange: 1 } },
          { input: { r: 1, g: 0.5647058823529412, b: 0.2901960784313726 }, output: { orange: 1 } },
          { input: { r: 1, g: 0.7529411764705882, b: 0.5843137254901961 }, output: { orange: 1 } },
          { input: { r: 1, g: 0.4627450980392157, b: 0.08235294117647059 }, output: { orange: 1 } },
          { input: { r: 1, g: 0.42745098039215684, b: 0 }, output: { orange: 1 } },
          { input: { r: 0.6274509803921569, g: 0.3137254901960784, b: 0.050980392156862744 }, output: { brown: 1 } },
          { input: { r: 0.6274509803921569, g: 0.39215686274509803, b: 0 }, output: { brown: 1 } },
          { input: { r: 0.6274509803921569, g: 0.4980392156862745, b: 0.28627450980392155 }, output: { brown: 1 } },
          { input: { r: 0.6274509803921569, g: 0.5411764705882353, b: 0.23921568627450981 }, output: { brown: 1 } },
          { input: { r: 0.8588235294117647, g: 0.6431372549019608, b: 0.3254901960784314 }, output: { brown: 1 } },
          { input: { r: 0.6274509803921569, g: 0.5647058823529412, b: 0.4588235294117647 }, output: { brown: 1 } }
        ])
```

Như các bạn thấy, mình đã đưa mảng đầu vào gồm khá nhiều ví dụ cụ thể để cho `ColorNameNetwork` nó học cho chính xác tên của màu, đỡ bị nhầm lẫn.


Chúng ta cũng để ý là các giá trị JSON `r: 0.6274509803921569, g: 0.5647058823529412, b: 0.4588235294117647` đây đều là các con số. Vì mạng Neural lúc này sử dụng thuật toán `Thống Kê` để trả về một con số %, nên nó chỉ nhận dữ liệu là dạng số, không thể nhận chữ.

> Ví dụ mạng Neural trong Machine Learning dùng nhận dạng hình ảnh thì nó phải biến Pixel của bức ảnh training thành con số dạng 0,1 thì nó mới **hiểu** được bức ảnh. Nó sẽ phân biệt được các bức ảnh khác nhau.

Vì khi ta chọn màu ta thường chọn mã Hex ví dụ `#ff9650`. Do đó ta cần một hàm chuyển đổi mã HEX sang mã RGB.

```js
/*----Hàm dùng để chuyển đổi từ mã màu Hex sang mã màu RGB----*/
    function getRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
        g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
        b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
      } : null;
    }
```

Rồi sau khi đã cho 2 mạng Neural khác nhau cùng chạy để học hỏi, giờ là lúc ta truyền một mã màu `rgb` vào cho nó nhận diện.

```js
const resultA = brain.likely(rgb, ColorDarknetwork)
```

Result A sẽ là string chứa kết quả phỏng đoán dựa vào tập dữ liệu training.

Thêm ít mắm muối và chạy thử thôi nào:  [LINK DEMO](https://chungminhtu.github.io/MachineLearningDemo/ColorDetection/)

> Kết quả

![](https://images.viblo.asia/7e2cd1ee-d8be-4680-b165-162b47091207.gif)


##  Sử dụng Machine Learning nhận dạng chữ viết tay

Để nhận dạng chữ viết tay, ta vẫn tiếp tục sử dụng brain.js. Nhưng để vẽ được lên trình duyệt ta cần dùng HTML5. Ví dụ này được lấy từ github.

Hãy xem thử  (Đợi một lúc mới hiện ra trang web vì nó đang training 1 mảng text data.json nặng tới 11MB) [LINK_DEMO 2](http://linux.ria.ua/mnist_brain/nnTest.html)

> Kết quả


![](https://images.viblo.asia/82d5638a-30fb-4248-b571-f287e212df8e.gif)


Ta thấy sau khi vẽ ảnh dường như được làm mờ pixel. Đó là để chuyển đổi Pixel thành con số. Tập dữ liệu để training cho Neural cũng là mảng json chứa bộ số chuẩn để làm mẫu. Kết quả cho ta thấy gần như 99% chương trình nhận diện đúng được con số viết tay.

# Kết luận

Như vậy là chúng ta đã áp dụng thành công Machine Learning ngay trên web. Sau khi dùng brain.js đào tạo chỉ với một lượng nhỏ dữ liệu mẫu, ta đã có thể chọn hoàn toàn ngẫu nhiên vô hạn màu để Neural phán đoán. Một số trường hợp mạng Neural sẽ đoán sai như các bạn chạy sẽ thấy, đó chính là sự không hoàn hảo của Machine Learning.

Bài này được lấy ý tưởng từ video sau đây: https://www.youtube.com/watch?v=9Hz3P1VgLz4

Anh Will cũng có 1 video nữa, sử dụng brain.js để làm một hệ thống `Recommendation system`:  https://www.youtube.com/watch?v=lvzekeBQsSo