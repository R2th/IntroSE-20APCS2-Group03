Tiếp tục se ri học shader qua các vd. 

Hôm nay mình sẽ hướng dẫn các bạn code hiệu ứng gió lung lay ngọn cỏ.

Cụ thể là:

Đây là **Input**, một bức ảnh cỏ thông thường:

![](https://images.viblo.asia/ba506cb4-00ce-4cb3-82f2-ee57ee929956.png)

Đây là **output**, bức ảnh cỏ này đung đưa theo ngọn gió :v :

![](https://images.viblo.asia/e357a61c-6814-46b0-ae76-417627e99ebc.gif)

Vd này mình chạy trên **Cocos2d-x**, nhưng các bạn có thể viết lại nó trên các engine khác mà các bạn quen sử dụng như Unity, Godot...

OK, Các vd trước mình chỉ code trong fragment, bây giờ sẽ tạo hiệu ứng này bằng cách xử dụng hàm vertex. Còn nếu chỉ tạo hiệu ứng này trong hàm fragment sẽ coi như là 1 bài tập về nhìn.

Đây là các đoạn code ban đầu. Chúng đơn giản chỉ show mỗi bức ảnh cỏ lên màn hình thôi.

Trong file .vsh:
```
attribute vec4 a_position;
attribute vec2 a_texCoord;

varying vec2 cc_FragTexCoord1;

void main()
{
    gl_Position = CC_PMatrix * a_position;
    cc_FragTexCoord1 = a_texCoord;
}
```

Trong file .fsh:
```
varying vec2 cc_FragTexCoord1;

void main()
{
    // Read the sprite's texture's color for the current pixel.
    gl_FragColor = texture2D(CC_Texture0, cc_FragTexCoord1);
}
```

code func chạy shader trong file HelloWorldScene.cpp:

```
    void HelloWorld::applyShader() {
    auto vertFilename = std::string("shaders/SimplestShader.vsh");
    auto fragFilename = std::string("shaders/SimplestShader.fsh");
    
    auto glprogram = GLProgram::createWithFilenames(vertFilename, fragFilename);
    _exampleSprite->setGLProgram(glprogram);
}
```

Tại thời điểm này. Nếu các bạn chạy lên thì mỗi bức ảnh cỏ trên screen:
![](https://images.viblo.asia/38cfb125-b9e9-48ef-ba5e-b00c468fa5da.png)

Để cho dễ debug, và hiểu đc các đỉnh biến đổi như thế nào thì mình sẽ vẽ một cái khung màu đen xung quanh bức ảnh cỏ:

Thay đổi file .fsh thanh như sau:

```
varying vec2 cc_FragTexCoord1;

void main()
{
    // Read the sprite's texture's color for the current pixel.
    vec4 textureColor = texture2D(CC_Texture0, cc_FragTexCoord1);
    
    if (cc_FragTexCoord1.x <= 0.01 || cc_FragTexCoord1.x >= 0.99 || cc_FragTexCoord1.y <= 0.01 || cc_FragTexCoord1.y >= 0.99) {
        gl_FragColor = vec4(vec3(0.0), 1.0);
    } else {
        gl_FragColor = textureColor;
    }
}
```

**Giải thích**: 
Chú ý là **cc_FragTexCoord1** là vec2 đại điện 2 chiệu ngang và dọc, có range là 0->1.

Vd như cc_FragTexCoord1.x có nghĩa là toạ độ theo chiều ngang của bức ảnh. 0 là ở bên trái, 1 là ở mép bên phải, 1/2 là ở ngay giữa màn hình.

Tương tự thì cc_FragTexCoord1.y là toạ độ theo chiều dọc, 0 là ở mép trên cùng, 1 là ở mép dứoi cùng.

Đoạn này chỉ đơn thuận là mình đang muốn vẽ 1 hình chữ nhật có cạnh là 1% chiều dài bức ảnh (do độ dài là từ 0 -> 1 nên 0.01 tức là 1% nha các bạn) với màu đen: vec4(vec3(0.0), 1.0) (Cái này thì tuỳ, vì mình đang để background màu trắng nên sẽ vẽ khung màu đen. Nếu các bạn có background đen thì có thể vẽ màu trắng.)

**Build and run**:

![](https://images.viblo.asia/16c702a2-7efd-482b-80c8-3a0977008ce3.png)

Ý tưởng để code ngọn cỏ đung đưa đung đưa là mình sẽ dịch chuyển đỉnh của phần trên bức ảnh, còn phần dưới phải giữ nguyên vị trí.

Bắt đầu suy nghĩ thêm 1 tí. Đun đưa đun đưa khiến cho mình suy nghĩ tới 1 cái gì đó lặp đi lặp lại -> sử dụng hàm toàn hoàn (vd như Sin Hoặc Cos).

À, như vậy là chúng ta sẽ thử nghiệm như sau: Nếu toạ độ đỉnh là ở cạnh trên (tương ứng với giá trị uv.y = 0.0) thì mình sẽ dịch chuyển cái cạnh này đung đưa bằng hàm Sin (cos cũng như nhau thôi). Còn nếu cạnh ở mép dưới, tức là uv.y = 1 thì chúng ta sẽ ko biến đổi đỉnh.

Với ý tưởng như vậy, chúng ta hãy chỉnh file.vsh thành như sau:

```
attribute vec4 a_position;
attribute vec2 a_texCoord;

varying vec2 cc_FragTexCoord1;

float getWind(vec2 uv, float timer)
{
    float strength = 20.0;
    float wind = (sin(timer * 5.0) * strength * (1.0 - uv.y));
    return wind;
}

void main()
{
    gl_Position = CC_PMatrix * a_position;
    gl_Position.x += getWind(a_texCoord, CC_Time[1]);
    cc_FragTexCoord1 = a_texCoord;
}
```

Chú ý biến (1.0 - uv.y)): tại vị trí mép bên dưới (uv = 1) thì cái này trả về 0 nên wind = 0.

Còn khi ở mép trên thì uv.y = 0 nên (1.0 - uv.y)) = 1 => wind = 1 giá trị nào đó ...

**Build** 1 phát xem thử nó chạy thế nào: 

![](https://images.viblo.asia/187c03bd-69eb-4e57-b571-cef223aa99c6.gif)

*Uhmmmmm*!, đúng như dự kiến, ngọn cỏ chúng ta đã bắt đầu đun đưa đun đưa, mặc dù nó chưa thật sự tốt, bởi vì 2 cạnh trái và phải đung đưa giống nhau quá, nhìn nó đun đưa quá đều làm cho có cảm giác khôn tốt lắm. (Đoạn code trên sin(timer * 5.0) là vì mình muốn nó đung đưa nhanh nhanh một tí thôi chứ ko có gì nha...)

OK. Vậy vấn đề bây giờ là mình sẽ tìm cách làm cho 2 cạnh chuyển động đun đưa đun đưa không đều nhau => Tức là giá trị của hàm wind() tại 2 góc ở trên bức ảnh sẽ trả ra giá trị khác nhau. Giá trị của 2 góc ở trên chúng ta có thể khai thác thông qua biến uv.xy.

Với ý tưởng trên chúng ta sẽ chỉnh hàm wind thành như sau:

```
float getWind(vec2 uv, float timer)
{
    float strength = 20.0;
    float time = timer + uv.x * uv.y;
    float wind = (sin(timer * 5.0) * strength * (1.0 - uv.y));
    return wind;
}
```

**Chú ý**: dòng float time = timer + uv.x * uv.y; chỉ là mình thay đổi biến timer cũ thành biến time mới sao cho biến này có phụ thuộc vào 2 góc ở trên (tức phụ thuộc vào biến uv).Các bạn có thể tuỳ ý sáng tạo.
Vd như float time = timer + uv.x + uv.y; cũng thu được kết quả tương ứng :)), Chỉ cần biến mới phụ thuộc vào giá trị của biến uv là đc :D. Đó là một trong các ý tưởng tiếp cận vì mục đich sau cùng chúng ta muốn là giá trị wind tại 2 góc trên là khác nhau - vd như nếu các bạn ko thích dùng biến uv thì có thể dùng biến position.xy của vertex để làm cho giá trị của wind ở 2 góc trên khác nhau cũng đc...

**Build** và run thử để xem kết quả như thế nào:

![](https://images.viblo.asia/28a274dc-e2f8-4d13-98ab-16b9b67f85d1.gif)

Vậy là xong rồi, Bây giờ mình sẽ chia các tham số cũ như strength, time... thành 1 vài param nhỏ hơn để chúng ta có thể tương tác trên các param này để tạo ra các hiệu ứng gió khác nhau với các loại ảnh cỏ khác nhau.

Các bạn có thể tham khảo, Mình làm biếng tạo biến uniform vể dùng cho việc tinh chỉnh bên ngoài trong hướng dẫn này nên mình sẽ tách nhỏ mẫu cho các bạn tham khảo thôi. Khi nào các bạn dùng vào project thì tự xử lí thêm vậy :v :

Đây là đoạn code cho các bạn tham khảo file .vsh:

```
attribute vec4 a_position;
attribute vec2 a_texCoord;

varying vec2 cc_FragTexCoord1;

float getWind(vec2 vertex, vec2 uv, float timer)
{
    
    float speed = 1.0;
    float minStrength = 0.1;
    float maxStrength = 0.4;
    float strengthScale = 100.0;
    float interval = 3.5;
    float detail = 4.0;
    
    float time = timer * speed + vertex.x * vertex.y;
    float diff = pow(maxStrength - minStrength, 2.0);
    float strength = clamp(minStrength + diff + sin(time / interval) * diff, minStrength, maxStrength) * strengthScale;
    float wind = (sin(time) + cos(time * detail)) * strength * (1.0 - uv.y);
    return wind;
}

void main()
{
    gl_Position = CC_PMatrix * a_position;
    gl_Position.x += getWind(a_position.xy, a_texCoord, CC_Time[1]);
    cc_FragTexCoord1 = a_texCoord;
}
```

Ok, Ở đây mình chỉ làm mẫu với bức ảnh cỏ thôi, tuy nhiên với những loại ảnh như cái cây thì cần phải bổ sung thêm 1 tí nữa.

Cơ bản là chúng ta thêm 1 biến để đảm bảo chỉ rung phần là cây còn phần thân cây thì phải đứng yên đúng ko :)).

![](https://images.viblo.asia/abc8b0fa-17e0-4575-83e8-e1411fed183e.gif)

Nó ko phức tạp, chỉ thêm 1 biến là chỉnh thêm 1 tí nên mình sẽ để lại cho nó như là bài tập.

Ở phần tiếp theo mình sẽ hướng dẫn các bạo tạo hiệu ứng chromatic:
https://viblo.asia/p/shader-p5-huong-dan-tao-hieu-ung-chromatic-maGK73AxKj2