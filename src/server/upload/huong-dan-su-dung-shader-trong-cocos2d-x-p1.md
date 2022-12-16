Hôm nay mình sẽ hướng dẫn các bạn sử dụng shader vào project Cocos2d-x của các bạn

## Vd1: Simplest Shader

![](https://images.viblo.asia/bb436530-7c5d-4ced-b5d8-1c2455576753.png)

Có một số loại shader OpenGL khác nhau nhưng trong Cocos2D bạn sẽ chỉ cần xử lý hai loại là vertex shader và fragment shader. Hay nhất là fragment shader hoặc "pixel shader" [^ 1]. Đây chỉ là một chương trình nhỏ mà GPU chạy mỗi lần cho mỗi pixel mà sprite bao phủ trên màn hình. Mỗi CCShader cần cả vertex shader và fragment shader. Cocos2D đã có trình tạo vertex shader mặc định được tích hợp sẵn, vì vậy bạn thường không cần phải viết lại.

[^ 1]: "fragment" là gì? fragment được coi là một pixel trong OpenGL. Pixel cuối cùng được hiển thị trên màn hình có thể là một vài fragment được trộn với nhau. Khi thực hiện kết xuất 3D, một fragment có thể bị che lấp bởi một fragment khác được hiển thị sau đó hoặc một fragment có thể bị xóa đi vì nó nằm sau fragment hiện tại đã được hiển thị.

### Loading Shaders:

 Trước khi đi vào phần code shader, bạn cần phải nắm được làm cách nào để load được chúng. Trong Cocos2D-x có thể làm điều này một cách dễ dàng và mọi thứ trong hướng dẫn này đều đang giả định rằng bạn đang dùng bản 3.17 hoặc mới hơn.  Xem đoạn code dưới đây để nhận biết cách load và sử dụng shader cho sprite của bạn.

```
void HelloWorld::applyShader() {
    auto vertFilename = std::string("shaders/SimplestShader.vsh");
    auto fragFilename = std::string("shaders/SimplestShader.fsh");
    
    auto glprogram = GLProgram::createWithFilenames(vertFilename, fragFilename);
    _exampleSprite->setGLProgram(glprogram);
}
```

Đầu tiên chúng ta các *path* tới các file shader. Sau đó các bạn có thể tạo chương trình chạy GL bằng **GLProgram::createWithFilenames**.
Và cuối cùng là chúng ta apply chương trình GL này vào một sprite nào đó.

### Dive In:

Đây là một đoạn code đơn giản,nó thực hiện tô màu đỏ lên toàn bộ sprite.

Nội dung file **SimplestShader.fsh**:

```
// Like a C program, every shader needs at least a main funcntion.
void main(){
    // Set the output color to red.
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

Nội dung file **SimplestShader.vsh**:

```
attribute vec4 a_position;

void main()
{
    gl_Position = CC_PMatrix * a_position;
}
```

Shader cho Cocos2D được viết bằng ngôn ngữ *GLSL* được của **OpenGL**. Bạn có thể cảm thấy quen thuộc vì nó khá giống C.

Mỗi *GLSL* fragment shader cần 2 thứ:

1) Nó cần có một hàm **main()** để gọi mỗi lần run shader.

2) Nó cần gán màu cho biến **gl_FragColor**.

Open GL sử dụng vertor để lưu màu sắc và vị trí. Để cho ra một màu thì bạn chỉ cần cung cấp nó 4 giá trị của red, green, blue và alpha. Bạn có thể khởi tạo GLSL băng một vài cách dưới đây:

```
// You can create a vector using the vec4 constructor:
gl_FragColor = vec4(redValue, greenValue, blueValue, alphaValue);

// You can set color components individually:
gl_FragColor.r = redValue;
gl_FragColor.g = greenValue;
gl_FragColor.b = blueValue;
gl_FragColor.a = alphaValue;

// Vectors can also be treated like arrays:
gl_FragColor[0] = redValue;
gl_FragColor[1] = greenValue;
gl_FragColor[2] = blueValue;
gl_FragColor[3] = alphaValue;
```

## Vd2: Sprite Color

![](https://images.viblo.asia/0e958447-dbbd-4f9b-96b8-2bad3fd78913.png)

Ví dụ 1 đã dạy chúng ta cách sử dụng shader để vẽ màu đỏ vào sprite. 

Ví dụ tiếp theo này là shader mặc định của Cocos2D và nó chịu trách nhiệm cho hầu hết các kết xuất hình ảnh trong các game Cocos2D (tức là đầu vào thế nào thì đầu ra nó ý chang vậy, vd như đầu vào là một nhân vật game thì nó sẽ vẽ nhân vật game đó lên trên màn hình mà ko có bất cứ thay đổi nào khác).

```
void main(){
  // Read the sprite's texture's color for the current pixel.
  vec4 textureColor = texture2D(CC_Texture0, cc_FragTexCoord1);
  
  // Tint the texture color by the sprite's color.
  gl_FragColor = cc_FragColor*textureColor;
}
```

### Sampling Textures:

Các bạn cứ suy nghĩ đơn giản nhưng là lúc chúng ta vẽ tranh vậy lên mặt phẳng vậy. Chúng ta cần biết tại toạ độ này thì chúng ta cần vẽ gì:

![](https://images.viblo.asia/77385ce8-06fc-4379-b4e4-311d55c6aaa1.png)

Tôi chưa kiếm ra một bức ảnh ưng ý để diễn tả lại ý nghĩa câu trên. Ở hình trên thì nó đã vẽ 1 vùng toạ độ texture này vào vùng toạ độ khác rồi. Còn ở các vd của chúng ta đi qua thì chỉ mới vẽ từng điểm ảnh lên các toạ độ thôi. Thôi thì các bạn chịu khó tưởng tượng đi nhé, lol :v .

Hãy chia nhỏ dòng đầu tiên:

**texture2D()** là một hàm được tạo sẵn trong GLSL dùng để lấy mẫu texture tại một vị trí cố định. Nó có input là Texture và toạ độ nào đó.

**CC_Texture0** là một biến tạo sẵn trong Cocos2D để lấy được texture của sprite hiện tại được render.

**cc_FragTexCoord1** là một biến được tạo sẵn trong Cocos2D. Nó là một toạ độ texture mà bạn dùng trong a fragment shader này để có thể vẽ chính xác sprite.

Kết hợp tất cả lại, *texture2D(ccMainTexture, ccFragTexCoord1)* lấy một màu từ texture của sprite tại toạ độ **cc_FragTexCoord1**.

Mình nói thêm một tí cho các bạn chưa hình dung được cách hoạt động của nó:

vd như bức ảnh sprite của các bạn là 32x32 render lên một vùng là 64x64 chẳng hạn (dĩ nhiên output của bạn sẽ là bức ảnh to gấp 2 bức ảnh ban đầu).

Như vậy để output ra bức ảnh 64x64 pixel thì chúng ta cần "tô màu" lên từng pixel trong 64x64.

Tại vị trí (0,0), (1,0), (0,1), (1,1) của bức ảnh 64x64 thì sẽ lấy ra màu của bức ảnh 32x32 tại vùng (0,0) (tại vì ouput chúng ta là bức ảnh to gấp đôi nên 1 pixel tại vùng ảnh cũ, có thể tô lên 4 điểm ảnh tại vùng ảnh mới).

Tại vị trí (2,0), (2,1), (3,0), (3,1) của bức ảnh 64x64 thì sẽ lấy ra màu của bức ảnh 32x32 tại vùng (1,0) 

Ở đây mình chỉ nêu lên cho các bạn tưởng tượng cách hoạt động thôi, thực tế thì toạ độ đã được chuẩn hoá về đoạn 0 -1 mất rồi, Và quá trình này là chạy song song chứ ko duyệt qua từng pixel. Nói chung các bạn cứ mường tượng cách nó hoạt động trước, chi tiết bên trong thế nào thì từ từ sẽ rõ hơn.

### Color Math:

Sprites trong Cocos2D có màu trộn màu. Vd như khi màu sắc trở nên tối hơn thì sprite cũng tối hơn. Khi màu càng đỏ thì sprite càng đỏ. Khi màu sắc trong suốt hơn thì sprite cũng vậy.

Vì vậy, làm thế nào để bạn thực hiện trộn màu trong một shader?. Tất cả bạn cần làm là nhân hai màu với nhau. Ở đây có 2 cách mà bạn có thể thực hiện.

```
// You can do it the long way: // 1
gl_FragColor.r = cc_FragColor.r*textureColor.r;
gl_FragColor.g = cc_FragColor.g*textureColor.g;
gl_FragColor.b = cc_FragColor.b*textureColor.b;
gl_FragColor.a = cc_FragColor.a*textureColor.a;

// Or use a vector multiply to do the same thing:
gl_FragColor = cc_FragColor*textureColor; // 2
```

Lưu ý: **cc_FragColor** là biến được tạo sẵn trong Cocos2D, nó cung cấp màu mặc định của sprite tại vùng toạ độ này (cc_FragTexCoord1).
Đoạn code thứ 2 là nhân 2 vecto với nhau, cách nó hoạt động giống như trong đoạn 1. Có đều nó gọn hơn. Nếu chung ta ko cần xử lí riêng biệt cho từng kênh màu red, blue, green, alpha mà chỉ đơn thuần nhân tương ứng từng toạ độ thì nên dùng 2 để code được gọn gàn hơn.

Full code của file.vsh:

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

Lưu ý là có một vài biến có thể sử dụng liền mà không cần khai báo, vd như:

```
/*
Predefined shader uniforms that you can use
"uniform mat4 CC_PMatrix;\n"
"uniform mat4 CC_MVMatrix;\n"
"uniform mat4 CC_MVPMatrix;\n"
"uniform vec4 CC_Time;\n"
"uniform vec4 CC_SinTime;\n"
"uniform vec4 CC_CosTime;\n"
"uniform vec4 CC_Random01;\n"
"uniform sampler2D CC_Texture0;\n"
"uniform sampler2D CC_Texture1;\n"
"uniform sampler2D CC_Texture2;\n"
"uniform sampler2D CC_Texture3;\n"
"uniform float CC_alpha_value;\n"
*/
```

Còn có một vài biến chúng ta khai báo, tuy nhiên các biến này sẽ tự gán bởi cocos2d:

```
*/
// Attributes you must define, but are set by cocos2d
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;
*/
```

Biến **varying**: Các bạn cứ nghĩ đơn giản là biến này sẽ được truyền từ phần của vertex shader sang cho fragment shader (lưu ý là vertex shader sẽ được chương trình chạy trước rồi mới tới fragment shader chạy nhé - cái này thì các bạn có thể tưởng tượng như sau: để vẽ 1 bức tranh nào đó thì đầu tiên ta cần hình chữ nhật => cung cấp toạ độ 4 góc của hình chữ nhật và bức tranh cần vẽ trước => sau đó máy tính với kiểm tra trong hình chữ nhật đó phủ lên bao nhiên pixel trên màn hình rồi sẽ gọi tương ứng tới fragment shader để vẽ lên từng pixel trên đó.)

Biến **varying** giúp mình nội suy các tham số truyền vào tại fragment shader: 

Mình lấy ví dụ như thế này: toạ độ đỉnh A(0,0), toạ độ đỉnh B(1,0), C(0, 1) và giả sử từ A tới B có độ dài 10 pixel thì các pixel trên cạnh AB (10 pixel) trong phần fragment sẽ lần lược được nội suy như thế này (0, 0), (0.1, 0), (0.2, 0) ... (0.9, 0), (1, 0), rồi mình sẽ dùng những toạ độ này để lấy màu sắc tương ứng trên bức ảnh để vẽ vào các pixel nằm trên cạnh AB

![](https://images.viblo.asia/890a66c7-ab5c-4c14-ab5e-dd9f470ef4ef.png)


Ý nghĩa của file .vsh trên mình tóm tắt như thế này: 

Ban đầu khi khởi tạo các đỉnh của thì mình sẽ nhận được các toạ độ của đỉnh (a_position), toạ độ texture tương ứng với đỉnh này (a_texCoord), màu cần ở vị trí này (a_texCoord).
Tiếp theo ta cần gửi toạ độ texture tại vị trí này cho fragment để nó có đủ thông tin để vẽ được lên bức tranh.

Full code của file.fsh:

```
varying vec2 cc_FragTexCoord1;

void main()
{
    // Read the sprite's texture's color for the current pixel.
    vec4 textureColor = texture2D(CC_Texture0, cc_FragTexCoord1);
    
    // Tint the texture color by the sprite's color.
    gl_FragColor = textureColor;
}
```

Tóm tắt ý nghĩa file trên:

Chúng ta nhận được toạ độ texture (cc_FragTexCoord1) được nội suy từ vertex shader, Chúng ta sẽ dùng toạ độ này để láy màu sắc tương ứng với vị trí này từ Texture thông qua hàm texture2D và biến CC_Texture0. Cuối cùng, chúng ta sẽ gán màu này vào fragment này qua biến gl_FragColor.

Ở trên là mình giải thích về các bước để vẽ một bức ảnh bằng shader, Bây giờ các bạn có thể thử nghiệm lí thuyết trộn màu như mình giới thiệu ở đầu phần này rồi:
Cái này như một bài tập cho các bạn vọc vạch cho vui nhé:

Gợi ý:  bạn có thể lấy textureColor nhân chia các kiểu con đà điểu trước khi gán nó cho gl_FragColor là được :]].

### Exercises:
Thay đổi shader để làm sáng sprite bằng màu của nó.

## Vd3: Sprite Distort
![](https://images.viblo.asia/a17b6757-6c94-46ca-9068-3fe70c2f4d3f.png)

Ví dụ 2 cho bạn thấy làm thế nào để vẽ một texture trong shader, nhưng điều đó vẫn thực sự cơ bản. Bây giờ chúng ta hãy thử một cái gì đó thú vị hơn mà bạn chỉ có thể làm với một shader. Điều gì xảy ra nếu chúng ta thay đổi tọa độ texture được tính toán trước khi truy cập vào texture?

full Code phần .vsh:
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

Full code phần .fsh:

```
varying vec2 cc_FragTexCoord1;

void main()
{
    vec2 texCoord = cc_FragTexCoord1;
    
    float time = CC_Time[1];
    texCoord.x += 0.1 * sin(10.0 * texCoord.y + time);
    
    gl_FragColor = texture2D(CC_Texture0, texCoord);
}

```

 Cho đến thời điểm này, chúng ta chỉ sử dụng cho các vectơ thành phần cho màu sắc có 4 thành phần (r,g,b,a). Bạn có thể tạo vectơ với 2 hợc 3 thành phần. Vd như **ccFragTexCoord1** là tọa độ x / y, vì vậy chúng ta cần lưu nó trong biến vec2.

Biến **cc_Time** là biến hợp sẵn của Cocos2D. Đây là một vectơ 4 thành phần lưu trữ các giá trị liên quan đến thời gian.

Một cách khác để truy cập các vectơ. Bạn có thể sử dụng xyzw hoặc stpq hoặc mảng thay vì rgba.

Các hàm GLSL dựng sẵn khác [link](http://www.khronos.org/opengles/sdk/docs/reference_cards/OpenGL-ES-2_0-Reference-card.pdf).

Vì vậy, bây giờ thay vì đọc tọa độ texture trực tiếp như Cocos2D thì hãy sử dụng phép toán sin để làm biến dạng texture.

Điều quan trọng cần ghi nhớ là một fragment shader không thể thay đổi pixel mà sprite sẽ vẽ vào (ý là bức ảnh texture của sprite, chúng ta không thay đổi được giá trị input của nó). 

Nó chỉ có thể thay đổi những pixel mà nó vẽ ra (giống như khi các bạn trộn màu với nhau vậy, ví dụ như input tại toạ độ đó là màu trắng, các bạn không thể thay đổi màu input của nó như các bạn có thể trộn màu trắng thành màu nâu chẳng hạn, và ouput của các bạn tại toạ độ này là màu nâu).

### Texture Coordinates:

Điều quan trọng cần biết là toạ độ texture được chuẩn hóa và không tính bằng pixel (Chuẩn hoá tức là đưa hết các chiều dài và rộng của nó về đoạn 0->1, vd như bức ảnh texture của bạn là 32x64 pixel các bạn muốn lấy ra màu sắc tại vùng trung tâm của nó thì ko thể nhập toạ độ là 16x32 được, vì nó đã chuẩn hoá 32 và 64 thành 0 tới 1 hết rồi, tức là chúng ta sẽ dùng (0.5, 0.5) để lấy được màu tại vùng trung tâm texture).

 Chú ý là (0, 0) là phía dưới bên trái của texture và (1, 1) là phía trên bên phải. Nếu bạn muốn áp dụng các biến dạng cho texture của sprite, bạn cần lưu ý kích thước và tỷ lệ khung hình của texture. 

### Exercises:
Hãy thử biến dạng texture của bạn theo nhiều cách khác nhau.

Ở các phần tiếp theo mình sẽ tiếp tục hướng dẫn các bạn tạo ra một vài hiệu ứng hay ho bằng cách sử dụng shader.

P2: https://viblo.asia/p/huong-dan-su-dung-shader-trong-cocos2d-x-p2-RQqKLQA4Z7z