Tiếp Phần 2: [link](https://viblo.asia/p/huong-dan-su-dung-shader-trong-cocos2d-x-p2-RQqKLQA4Z7z)

## E07: Color Flash

Shader mặc định của Cocos2D cho phép bạn tô màu (tint) một sprite, nhưng có những thứ khác bạn có thể muốn làm với màu. Một điều mà bạn thường thấy trong các trò chơi 2D cũ là làm cho đèn flash sprite có màu đồng nhất. Đây là một hiệu ứng rất dễ thực hiện trong shader.

![](https://images.viblo.asia/95e4b5cd-d713-431f-8a50-6a9f20ec22ba.jpg)

Thỉnh thoảng bạn sẽ làm cho các đối tươngj khác nhau sẽ trộn các màu khác nhau. Vd khi nhân vật chúng ta điều khiển trong game khi bị đánh thì sẽ nhấp nháy màu trắng, còn khi bị tấn công bời đòn chí mạng thì nhấp nháy màu đỏ. Nói chung là chúng ta cần 1 cách nào đó để có thể thiết lập một biến thiết lập màu từ bên ngoài. Chúng ta sẽ sử dụng biến uniform để làm điều này.

**file .vsh:**

```
attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;

varying vec4 cc_FragColor;
varying vec2 cc_FragTexCoord1;

void main()
{
    gl_Position = CC_PMatrix * a_position;
    cc_FragColor = clamp(a_color, 0.0, 1.0);
    cc_FragTexCoord1 = a_texCoord;
}
```

**file .fsh: **

```
varying vec4 cc_FragColor;
varying vec2 cc_FragTexCoord1;

uniform vec4 u_ColorFlash;

void main(){
    vec4 color = texture2D(CC_Texture0, cc_FragTexCoord1);
    
    color.rgb = mix(color.rgb, u_ColorFlash.rgb*color.a, u_ColorFlash.a);
    
    gl_FragColor = cc_FragColor*color;
}
```


### Giải thích:

Keyword **uniform** trên **u_FlashColor** cho GLSL biết rằng biến được đặt từ program của bạn. Giải thích chi tiết được viết ở phần dưới.

Hàm **mix()** của GLSL thực hiện chạy hỗn hợp alpha. Công thúc hàm mình như sau: `x×(1−a)+y×a` trong đó x,y là vector, còn a thường man giá trị từ 0 -> 1. Nếu bọn còn nhớ toán lớp 10 thì đây đơn giản chỉ là công thức của đoạn thẳng thôi. Khi a = 1 thì nó trả ra y, khi a = 0 thì nó trả ra x, khi a = 0.5 thì nó trả ra (x+y)/2 ....

Các bạn có thể thử trộn các màu theo một công thức nào đó theo ý thích của các bạn.

![](https://images.viblo.asia/0bb5718f-9187-4057-b6c0-ec16fc841bde.png)

Đây là code để set được biến uniform từ program vào shader để test được như hình trên:

```
void HelloWorld::applyShader() {
    auto vertFilename = std::string("shaders/SimplestShader.vsh");
    auto fragFilename = std::string("shaders/SimplestShader.fsh");
    
    auto glprogram = GLProgram::createWithFilenames(vertFilename, fragFilename);
    GLProgramState* glprogramstate = GLProgramState::getOrCreateWithGLProgram(glprogram);
    glprogramstate->setUniformVec4("u_ColorFlash", Vec4(1.0f, 1.0f, 0.0f, 0.5f));
    _exampleSprite->setGLProgram(glprogram);
}
```

Mình chỉ đơn giản chọn màu trộn là màu vàng với alpha 50% để test thôi.

### Uniform Variables:

Uniform variable là những biến mà bạn có thể đặt từ code C++ của mình. Chúng là "đồng nhất" vì giá trị sẽ giống nhau cho mọi pixel trong một sprite. Bạn có thể sử dụng chúng để chuyển colỏ, position, offset, texture và matrice sang bộ shader.

Bạn đã thực sự sử dụng một số biến uniform rồi. Nhiều biến shader dựng sẵn của Cocos2D là uniform rồi, vd: **cc_MainTexture** và **cc_Time** đều là biến uniform. 

### Bài tập:

Hãy trộn các màu khác nhau với alpha khác nhau.

Hãy thử các công thức trộn màu khác nhau.

## Ex8 Outline:

![](https://images.viblo.asia/dca93aaf-d822-40f6-ac82-d5f88c8960ae.png)

Outline thường dùng trong lúc ngừoi chơi chọn vật phẩm, hay chọn nhân vật gì đó...

Phần này thì mình Code lại theo hướng mà mình hiểu thôi, chứ code của tác giả mình không chạy đươc, lol. Chắc do nó quá lâu rồi, mà thằng Cocos2d-x này, ta nói search trên google ít tài liệu vãi ra, gần như chả có gì luôn ấy. Dạo này mình đang tìm hiểu bên Godot rồi. Thấy code dăm ba cái shader này dễ hơn bên này nhiều. Bên này gần như phải code mọi thứ, debug thì rối tung rối mù, cộng đồng thì ... thôi chả thèm than vãn nữa, lol... 

Mình thì thích code game với C++ nhưng tác giả của engine này đối xử với nó như con ghẻ vậy, mới tải về chưa làm cái vẹo gì hết, build app thì bị lỗi, phải đi vào trong thư viện bên trong fix lỗi mới build đc, lol... Thôi, bình tĩnh nào tôi ơi, đùng có chửi nữa, báo cáo nốt cho xong nào.

![](https://images.viblo.asia/1b71d15a-81c9-43b3-9ecc-59e11f76bec9.png)


**full code file .vsh**

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

full code file **.fsh**:

```
varying vec4 cc_FragColor;
varying vec2 cc_FragTexCoord1;

uniform vec4 u_OutlineColor;
uniform float u_OutlineWidth;

vec4 composite(vec4 over, vec4 under){
    return over + (1.0 - over.a)*under;
}

void main(){
    float width = u_OutlineWidth;
    float outlineAlpha = 0.0;

    outlineAlpha += texture2D(CC_Texture0, cc_FragTexCoord1 + vec2(width, 0.0)).a;
    outlineAlpha += texture2D(CC_Texture0, cc_FragTexCoord1 + vec2(-width, 0.0)).a;
    outlineAlpha += texture2D(CC_Texture0, cc_FragTexCoord1 + vec2(0.0, width)).a;
    outlineAlpha += texture2D(CC_Texture0, cc_FragTexCoord1 + vec2(0.0, -width)).a;
    
    outlineAlpha += texture2D(CC_Texture0, cc_FragTexCoord1 + vec2(width, width)).a;
    outlineAlpha += texture2D(CC_Texture0, cc_FragTexCoord1 + vec2(-width, width)).a;
    outlineAlpha += texture2D(CC_Texture0, cc_FragTexCoord1 + vec2(width, -width)).a;
    outlineAlpha += texture2D(CC_Texture0, cc_FragTexCoord1 + vec2(-width, -width)).a;
    
    vec4 outlineColor = u_OutlineColor * outlineAlpha;
    vec4 textureColor = texture2D(CC_Texture0, cc_FragTexCoord1);
    gl_FragColor = composite(textureColor, outlineColor);
}
```

code trong program của mình: 

```
void HelloWorld::applyShader() {
    auto vertFilename = std::string("shaders/SimplestShader.vsh");
    auto fragFilename = std::string("shaders/SimplestShader.fsh");
    
    auto glprogram = GLProgram::createWithFilenames(vertFilename, fragFilename);
    GLProgramState* glprogramstate = GLProgramState::getOrCreateWithGLProgram(glprogram);
    float width = 5.0f / _exampleSprite->getContentSize().width;
    
    Vec4 outlineColor = Vec4(1.0f, 0.0f, 0.0f, 1.0f);
    
    glprogramstate->setUniformFloat("u_OutlineWidth", width);
    glprogramstate->setUniformVec4("u_OutlineColor", outlineColor);
    _exampleSprite->setGLProgram(glprogram);
}
```

### Giải thích:

Nói chung ý tưởng của cái này nói chúng khá đơn giản, đó là mình sẽ vẽ sprite ban đầu theo 8 hướng khác nhau bên dứoi sprite gốc.

Lưu ý là do trong shader chuẩn hoá toạ độ nên chúng ta muốn vẽ outline dày 5 pixel thì cần đưa nó về 5 pixel thì tầm bao nhiều phần trăm của cái ảnh:

```
float width = 5.0f / _exampleSprite->getContentSize().width;
```

Sau đó mình truyền màu outline là màu đỏ để test thử.

Bên dứoi là code nguyên gốc của tác giả dành cho những ai quan tâm:

file **.fsh**

```
const int SAMPLES = 6;
varying vec2 v_OutlineSamples[SAMPLES];

vec4 composite(vec4 over, vec4 under){
  return over + (1.0 - over.a)*under;
}

void main(){
  // Use the coordinates from the v_OutlineSamples[] array.
  float outlineAlpha = 0.0;
  for(int i=0; i<SAMPLES; i++){
    float alpha = texture2D(cc_MainTexture, v_OutlineSamples[i]).a;
    
    // Blend the alpha with our other samples.
    outlineAlpha = outlineAlpha + (1.0 - outlineAlpha)*alpha;
  }
  
  // Let's repurpose cc_FragColor for the outline color.
    vec4 outlineColor = cc_FragColor*outlineAlpha;
  vec4 textureColor = texture2D(cc_MainTexture, cc_FragTexCoord1);
  gl_FragColor = composite(textureColor, outlineColor);
}
```

file **.vsh**

```
uniform vec2 u_MainTextureSize;
uniform float u_OutlineWidth;

const int SAMPLES = 6;
varying vec2 v_OutlineSamples[SAMPLES];

void main(){
  gl_Position = cc_Position;
  cc_FragColor = clamp(cc_Color, 0.0, 1.0);
  cc_FragTexCoord1 = cc_TexCoord1;
  
  vec2 outlineSize = u_OutlineWidth/u_MainTextureSize;
  for(int i=0; i<SAMPLES; i++){
    float angle = 2.0*3.14159*float(i)/float(SAMPLES);
    v_OutlineSamples[i] = cc_TexCoord1 + outlineSize*vec2(cos(angle), sin(angle));
  }
}
```

Ý tưởng của tác giả là cũng vẽ thêm layout bên dưới theo các hướng khác nhau, trong code trên dùng SAMPLES = 6 nên sẽ vẽ theo 6 hướng khác nhau của hình lục giác đều.
Có đều khác ở chỗ tác giả thay đổi các đỉnh trong vertex shader. còn mình thì tự xử nó trong fragment shader. Nắm ý tưởng là đc, còn quá trình ko quan trọng lắm. Khi nào bị bóp quả hiệu suất rồi tính chuyện cải tiến sau.

Phần code tác giả thì mình chưa làm nó hoạt động được. Mà mình cũng ko quá mặn mà với code của tác giả vì mình không có code cocos2d-x nên chỉ quan tâm ý tưởng là chính thôi =)).

**Bàn luận lung tung 1 tí:**

Có thể các bạn sẽ nghĩ sao chúng ta không tạo một bức ảnh giống bức ảnh ban đầu, sau đó cho nó thành một màu, vd như màu đỏ, phóng to nó lên một tí rồi để nó ở sau ảnh gốc thì chúng ta cũng được outline rồi ????

Đa phần là phương pháp trên sẽ bị sai nếu anchor của image không phải là center. Mà cho dù là center thì cũng sẽ có trường hợp bị sai. vd như trong các label hiển thị damage trong game:

![](https://images.viblo.asia/f1655b35-dca9-4dcd-9371-458526d3a3ec.jpeg)

Nếu chung ta tạo ra 2 label, 1 label cho chữ màu trắng và 1 label cho chữ màu đen rồi đặt chúng lên nhau cũng khó để thu được hiệu ứng outline như ý muốn, đầu tiên là khó control độ dày của outline, thứ 2 khó đảm bảo được phần màu đen thành outline của màu trắng.

Nói chung sử dụng shader là một trong những phương pháp làm hiệu ứng outline ok nhất mà mình biết. Còn mầy cái trick gì khác thì  chỉ dùng được trong một số trường hợp nhất định thôi, rất khó chạy trơn tru trong nhiều tình huống.

Phần này mình xin dừng ở 2 vd trên thôi nhé. Chứ mình debug thằng vd8 mất nhiều time quá =)))).

Lần sau mình có hứng thì code shader cho thằng cocos2d-x này tiếp cho seri nó đẹp đội hinh, còn không thì chuyển qua viết shader trên godot cho nhanh vậy :v. Nói chúng là code mấy cái shader thì hiều ý tưởng là chính. :D

Phần tiếp theo mình sẽ hướng dẫn các bạn code hiệu ứng gió đung đưa ngọn cỏ link: https://viblo.asia/p/tao-hieu-ung-gio-dung-dua-ngon-co-shader-p4-XL6lA2wg5ek