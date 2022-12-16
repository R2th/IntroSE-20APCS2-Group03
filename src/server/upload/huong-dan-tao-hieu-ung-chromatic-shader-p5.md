Tiếp tục với seri học shader qua các ví dụ.

Ở phần này mình sẽ hướng dẫn các bạn làm hiệu ứng chromatic.

Đây là input:
![](https://images.viblo.asia/4f08fcbb-4052-447f-aa81-076457223628.png)
chỉ là một bức hình chữ GLITCH mà thôi.

Đây là output:
![](https://images.viblo.asia/1a840778-eb04-4f3d-86ea-bef304f4f8ca.gif)


Giống với mấy lần trước, chúng ta sẽ khở đầu bằng các đoạn code sau để hiện thị bức ảnh lên màn hình:

file .vsh:
```
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;

varying vec4 cc_FragColor;
varying vec2 cc_FragTexCoord1;

void main(){
    gl_Position = CC_PMatrix * a_position;
    cc_FragColor = clamp(a_color, 0.0, 1.0);
    cc_FragTexCoord1 = a_texCoord;
}
```

file .fsh:

```
varying vec4 cc_FragColor;
varying vec2 cc_FragTexCoord1;

uniform vec4 u_ColorFlash;

void main(){
    vec2 texCoord = cc_FragTexCoord1;    
    gl_FragColor = texture2D(CC_Texture0, texCoord);
}
```

đoạn code apply shader vào trong một sprite:
```
    void HelloWorld::applyShader() {
    auto vertFilename = std::string("shaders/SimplestShader.vsh");
    auto fragFilename = std::string("shaders/SimplestShader.fsh");
    
    auto glprogram = GLProgram::createWithFilenames(vertFilename, fragFilename);
    _exampleSprite->setGLProgram(glprogram);
}
```

OK, với các ý ở trên thì khi build, chúng ta sẽ được output là như thế này:

![](https://images.viblo.asia/d311707e-2cd6-4ae3-b65f-f7ce3a83b2f3.png)

Tất nhiên là để làm hiệu ứng này thì chúng ta sẽ có 2 việc chính cần làm:
1) Bẽ ảnh theo hình sóng
2) Tách 3 màu red, green, blue theo các hướng các nhau.


Việc bẽ ảnh theo hình sóng thì dĩ nhiên các bạn có thể nghĩ tới là dùng func sin, cos
kiểu kiểu như thế này:

```
varying vec4 cc_FragColor;
varying vec2 cc_FragTexCoord1;

uniform vec4 u_ColorFlash;

void main(){
    vec2 texCoord = cc_FragTexCoord1;
    float time = CC_Time[1];
    texCoord.x += 0.01 * sin(100.0 * (texCoord.y + time));
    
    gl_FragColor = texture2D(CC_Texture0, texCoord);
}
```

build thì ta sẽ được như thế này:

![](https://images.viblo.asia/92e45c98-fa51-4d74-b6b7-930972a3b090.gif)

Ở trên mình chỉ là vd thôi, chứ nếu dùng như vậy thì sóng bị bẽ cong đều đều theo trục y, hình tấm ảnh không được hay lắm, nên nếu theo hướng sử dung hàm thì phải chỉnh được một cái func ưng ý chứ không dùng `texCoord.x += 0.01 * sin(100.0 * (texCoord.y + time));`,  

Nhưng hôm nay mình sẽ chỉnh cho các bạn một hướng tiếp cận khác, hay được sử dụng trong lập trình shader, để bẽ cong các điểm ảnh thì chúng ta sẽ dùng như tấm ảnh chỉ có màu trắng, xám, đen.

![](https://images.viblo.asia/b47e1524-57fa-41d8-87f5-f263d8599b04.jpg)

như các bạn thấy tấm hình trên có vẻ chỉ có 2 màu là trắng và đen. Khi chúng ta đọc từng điểm ảnh trong tấm ảnh này thì màu trắng sẽ là 1, màu đen sẽ là 0, các màu hơi xám xám sẽ ở giữa 0 -> 1, nói chung cứ nhớ là càng trắng thì càng lớn, càng gần số 1 (vd như 0.8, 0.9, 0.99), càng xám, càng đen thì gần số 0.


```
varying vec4 cc_FragColor;
varying vec2 cc_FragTexCoord1;

uniform float disAmt;
uniform float dispSize;

uniform sampler2D u_NoiseTexture;

void main() {
    vec4 disp = texture2D(u_NoiseTexture, cc_FragTexCoord1 * dispSize);
    vec2 newUV = cc_FragTexCoord1 + disp.xy * disAmt;
    gl_FragColor = texture2D(CC_Texture0, newUV);
}
```

Chúng ta tạo một vài biến "u_NoiseTexture" là để tham chiếu tới bức ảnh "nhiễu" ở trên, còn "disAmt" và  "dispSize" sẽ là các tham số mình thay đổi để chỉnh độ biến dạng của bức ảnh.

Ý tưởng sử dụng bức ảnh "nhiễu" cũng đơn giản, đầu tiên chúng ta sẽ đọc giá trị của bức ảnh nhiễu tại vị trí "UV", tất nhiên là sẽ nhận được giá trị từ 0 -> 1. Sau đó ta sẽ biến dạng toạ độ UV cũ thành UV mới bằng:

Toạ độ mới = toạ độ cũ + "hệ số tinh chỉnh (disAmt)" * giá trị nhiễu (giá trị được đọc từ  ảnh nhiễu ra)
```
vec2 newUV = cc_FragTexCoord1 + disp.xy * disAmt;
```

Chú ý là disp có các param rbg đều như nhau hết (vd 0.99, 0.99, 0.99 hoặc 0.8, 0.8, 0.8 - do format bức ảnh là dạng trắng đen, nếu rbg nó luôn giống nhau).

Dứoi đây là đoạn code truyển param vào shader trong cocos2d-x, nếu các bạn lập trình bằng engine khác thì ko phải quan tâm.

```
void HelloWorld::applyShader() {
    auto vertFilename = std::string("shaders/SimplestShader.vsh");
    auto fragFilename = std::string("shaders/SimplestShader.fsh");

    auto glprogram = GLProgram::createWithFilenames(vertFilename, fragFilename);
    GLProgramState* glprogramstate = GLProgramState::getOrCreateWithGLProgram(glprogram);

    auto textureCache = Director::getInstance()->getTextureCache();
    textureCache->addImage("noise_glitch.jpg");
    auto noiseTexture = textureCache->getTextureForKey("noise_glitch.jpg");
    glprogramstate->setUniformTexture("u_NoiseTexture", noiseTexture);
    
    glprogramstate->setUniformFloat("disAmt", 0.005);
    glprogramstate->setUniformFloat("dispSize", 1.2);
    _exampleSprite->setGLProgram(glprogram);
}
```


![](https://images.viblo.asia/40df9b8a-ad59-4c68-b188-6cdd3efccbc0.png)

OK, chúng ta sẽ được bức ảnh bị biến dạng kiểu như trên.

Bây giờ chúng ta đến bước tiếp theo: Tách 3 màu rbg ra, Cái này đơn giản nên không giải thích gì nhiều.

```
varying vec4 cc_FragColor;
varying vec2 cc_FragTexCoord1;

uniform float disAmt;
uniform float abberationAmtX;
uniform float abberationAmtY;
uniform float dispSize;

uniform sampler2D u_NoiseTexture;

void main() {
    vec4 disp = texture2D(u_NoiseTexture, cc_FragTexCoord1 * dispSize);
    vec2 newUV = cc_FragTexCoord1 + disp.xy * disAmt;

    gl_FragColor.r = texture2D(CC_Texture0, newUV - vec2(abberationAmtX, abberationAmtY)).r;
    gl_FragColor.g = texture2D(CC_Texture0, newUV).g;
    gl_FragColor.b = texture2D(CC_Texture0, newUV + vec2(abberationAmtX, abberationAmtY)).b;
    gl_FragColor.a = texture2D(CC_Texture0, newUV).a;
}

```

Ở đây mình thêm 2 tham số uniform: abberationAmtX và abberationAmtY, để tách màu theo 2 hướng X, Y.

Cách tách ở trên cũng là ngẫu nhiên thôi, các bạn có thể tách theo bất cứ cách nào mà các bạn thích.

Dưới đây là dòng code gán param vào file shader, đã được update thêm.

```
void HelloWorld::applyShader() {
    auto vertFilename = std::string("shaders/SimplestShader.vsh");
    auto fragFilename = std::string("shaders/SimplestShader.fsh");

    auto glprogram = GLProgram::createWithFilenames(vertFilename, fragFilename);
    GLProgramState* glprogramstate = GLProgramState::getOrCreateWithGLProgram(glprogram);

    auto textureCache = Director::getInstance()->getTextureCache();
    textureCache->addImage("noise_glitch.jpg");
    auto noiseTexture = textureCache->getTextureForKey("noise_glitch.jpg");
    glprogramstate->setUniformTexture("u_NoiseTexture", noiseTexture);
    
    glprogramstate->setUniformFloat("disAmt", 0.005);
    glprogramstate->setUniformFloat("dispSize", 1.2);
    glprogramstate->setUniformFloat("abberationAmtX", 0.01);
    glprogramstate->setUniformFloat("abberationAmtY", 0.03);
    
    _exampleSprite->setGLProgram(glprogram);
}
```

![](https://images.viblo.asia/5ace5f25-49af-49af-924b-0be3857c747b.png)

OK, Vậy khung sường đã làm xong rôi, còn lại việc như thay đổi các param trên theo thời gian thực để được hiệu ứng chromatic, thì các bạn thực hiện theo engine mà các bạn hay sử dụng. Phần còn lại không liên quan tới shader nên mình không cần hướng dẫn, đây là mẫu mình làm thử, có vẻ xấu, mình ko ứng ý nhưng thôi kệ :))).

![](https://images.viblo.asia/1a840778-eb04-4f3d-86ea-bef304f4f8ca.gif)

Gửi thêm cho các bạn 1 tấm ảnh nhiễu khác:

![](https://images.viblo.asia/366f3117-53fe-42f0-a473-18c9148a4db3.png)

OK, bài tập về nhà là hãy sử dụng thêm ảnh ở trên để trang trí cho hiệu ứng chromatic

Mình chưa có code vd mẫu để chụp cho các bạn tham khảo.
Các bạn tham khảo tạm hình này để hiểu ý tưởng dùng ảnh ở trên như thế nào:

![](https://images.viblo.asia/0e0c3f2b-4261-40a2-933b-8a51ae3d95ed.png)

Người đọc:

Hết rồi? 

Viết dài vậy thì ra cũng chỉ dùng có dăm ba đoạn code? cứ chỉnh một tí lại copy cả file dáng vào?

Nguyên một bài dài vậy mà chỉ hướng dẫn có mỗi cái hiệu ứng đơn giản???

Ông đang câu chương với chúng tôi đấy à !!??

Ta: Đúng vậy, ta chính là đang câu chương đấy! lol... :v

Sẵn đây thông báo luốn, những bài sau mình không viết vd bằng cocos2d-x nữa, Bây giờ người người Unity, nhà nhà Unity nên mình cũng ngấp ngoé rồi cho nên lần sau mình sẽ viết các vd về shader trên Godot :v. Đa tạ các vị bằng hữu ghé thăm :)).