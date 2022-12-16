Ở phần này mình sẽ tiếp tục đưa ra một vài công thức để làm hiệu ứng cho image bằng shader. Các bạn có thể đọc phần 1 tại đây: https://viblo.asia/p/huong-dan-su-dung-shader-trong-cocos2d-x-p1-Qbq5Q0XJlD8

## E04: Grayscale

Đây là một vài vd đơn giản khác:

Full Code file .vsh:

```
attribute vec4 a_position;
attribute vec2 a_texCoord;

varying vec2 cc_FragTexCoord1;
varying vec2 cc_FragTexCoord2;

void main()
{
    gl_Position = CC_PMatrix * a_position;
    cc_FragTexCoord1 = a_texCoord;
}

```

Full code file .fsh:

```
varying vec2 cc_FragTexCoord1;

void main(){
    gl_FragColor = texture2D(CC_Texture0, cc_FragTexCoord1);
    
    float gray = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b)/3.0;
    gl_FragColor.rgb = vec3(gray);
}

```

Các thuột tính và loại biến mình có giải thích ở phần 1 rồi, các bạn có thể quay lại bài trước của mình để tham khảo.

Vd này đơn thuần chỉ giới thiệu thêm công thức trộn màu mà thôi :D:

```
Cách chuyển RGB thành màu xám đó là chúng ta sẽ tìm công thức sao cho các giá trị R=G=B

Công thức dễ nhớ nhất là ta lấy trung bình cộng cả 3 màu:

R' = G' = B' = (R+G+B) / 3 = 0.333R + 0.333G + 0.333B

 ra đây là hai công thức khác, nó sẽ thêm trọng số vào các màu R/G/B.
 
R' = G' = B' = 0.2126R + 0.7152G + 0.0722B

Hoặc

R' = G' = B'  = 0.299R + 0.587G + 0.114B

Vd:
Màu RBG chúng ta nhận được là (30,128,255)
R' = G' = B' = (R+G+B) / 3 = (30+128+255) / 3 = 138

Sử dụng công thức trung bình cộng chúng ta sẽ được màu xám tương ứng là: (138,138,138)
```

![](https://images.viblo.asia/4aea15f0-5abb-48a7-bbe9-ebcb59eb0ad7.png)

## E05: Chromatic
 
 Hiệu ứng CHROMATIC ABERRATIONS - (QUANG SAI) là gì? 
 
 Quang sai hay chính xác hơn là sắc sai - Chromatic Aberration trên ống kính là hiện tượng ánh sáng trắng sau khi đi qua thấu kính bị sai lệch biến thành 1 chùm sáng với phân bố từ đỏ đến tím.
 
  Nếu đọc định nghĩa xong mà các bạn méo hiểu thì thì okay thôi, vì mình cũng vậy =))).
  Theo cảm nhận của mình thì hiệu ứng này là méo màu, mình hay thấy mấy cái hiệu ứng này trong mấy cái game kinh dị ấy :v: 
  
  ![](https://images.viblo.asia/a2e04b76-6abe-42f0-ab9a-cdd8752a4335.gif)
 
Full Code file .vsh:
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

Full code file .fsh:

```
varying vec2 cc_FragTexCoord1;

void main(){
    float t = CC_Time[0];
    vec2 uv = cc_FragTexCoord1;
    float wave = 0.1;
    
    // Sample the same texture several times at different locations.
    vec4 r = texture2D(CC_Texture0, uv + vec2(wave*sin(1.0*t + uv.y*5.0), 0.0));
    vec4 g = texture2D(CC_Texture0, uv + vec2(wave*sin(1.3*t + uv.y*5.0), 0.0));
    vec4 b = texture2D(CC_Texture0, uv + vec2(wave*sin(1.6*t + uv.y*5.0), 0.0));
    
    // Combine the channels, average the alpha values.
    gl_FragColor = vec4(r.r, g.g, b.b, (r.a + b.a + g.a)/3.0);
}
```

Ở đây mình sẽ thực hiện 2 bước.

**B1**: mình sẽ tạo ra một bức ảnh biến dạng từ bức ảnh cũ (có thể dựa vào *sin*, *cos*, hoặc chỉnh *offset* bức ảnh đều ok). 

Lưu ý, nếu các bạn chưa hình dung bức ảnh méo mó bằng công thức trên như thế nào thì các bạn có thể chỉnh lại code như sau: `texture2D(CC_Texture0, uv + vec2(wave*sin(1.0*t + uv.y*5.0), 0.0)); ---->> texture2D(CC_Texture0, vec2(wave*sin(1.0*t + uv.y*5.0), 0.0));`

**B2**: Mình trộn màu bức ảnh gốc và bức ảnh méo mó.

**B3**: Ta-ra, chúng ta đã có được hiệu ứng Chromatic, T__T.

Vd mình đưa ở đây chỉ là cơ bản nên không được như hình ở trên, để làm được như ở trên mình cần thêm 1 NoiseTexture nữa.

Mình sẽ hướng dẫn các bạn xử dụng thêm các Texture để làm ra nhiều hiệu ứng khác sau, hiện tại thì mình chỉ đang đi các phần trộn cơ bản nhất trong bài viết này.

![](https://images.viblo.asia/fcbf2e8a-20d8-43c6-bbb0-f9cb11f15d64.png)


### Exercises

Thử nghiệm thêm nhiều cách biến dạng khác.

Thử kết hợp nhiều công thức trộn màu khác.

## E06: Shadow

Lưu ý là bạn không thể đổ bóng ra bên ngoài của sprite nên hãy chắc chắn là nó có đủ vùng trống trong bức ảnh cho bất kì hiệu ứng nào mà bạn muốn thêm nhé lên nhé.

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


```
varying vec2 cc_FragTexCoord1;

vec4 composite(vec4 over, vec4 under){
    return over + (1.0 - over.a)*under;
}

void main(){
    vec4 textureColor = texture2D(CC_Texture0, cc_FragTexCoord1);
    
    // Offset of the shadow in texture coordinates.
    vec2 shadowOffset = vec2(-0.03, -0.03);
    float shadowMask = texture2D(CC_Texture0, cc_FragTexCoord1 + shadowOffset).a;
    
    const float shadowOpacity = 0.5;
    vec4 shadowColor = vec4(vec3(0.0), shadowMask*shadowOpacity);
    
    gl_FragColor = composite(textureColor, shadowColor);
}
```

ở đây biến **shadowOffset** dùng để chỉnh độ lệch của bóng, các bạn có thể thử thay đổi giá trị của biến này để test thử nhé. Bây giờ mình sẽ nói ý tưởng chính hiệu ứng này. Các bạn để ý func sau:

```
vec4 composite(vec4 over, vec4 under){
    return over + (1.0 - over.a)*under;
}
```

ở đây mình sẽ nhận 2 param là 2 màu: **over** là màu của bức ảnh truyền vào và **under** là màu của bóng truyền vào.

+ Nếu bức ảnh tại vị trí này có màu (tức là alpha = 1) thì nó sẽ sẽ trả về màu của bức ảnh hiện tại.

+ Nếu bức ảnh này tại vị trí này không có màu tức over = (0, 0, 0, 0) thì nó sẽ trả ra màu của bóng (ở đây là under).

Okay, như vậy mình sẽ tóm tắt ý tưởng của func này như sau:

**B1**) chúng ta sẽ dựa vào alpha của bức ảnh và dựa vào shadowOffset để tạo ra 1 lớp bóng.

**B2**) chúng ta sẽ xét: nếu vị trí này của bức ảnh là có màu thì sẽ trả về màu. 

Nếu vị trí này ko có màu (alpha = 0) và vùng này nằm trong vùng đổ bóng thì trả về bóng. 

Nếu ko nằm trong cả 2 thì trả về không màu. (tại vì over và under đều là 0 màu nên biểu thức `over + (1.0 - over.a)*under` cũng trả về 0 màu).

![](https://images.viblo.asia/606e1a5c-5b9b-42d8-bc8f-a8bc5a1c4890.png)

### Exercises:

Hãy thử vẽ một lớp màu thay vì bóng bên dưới.

Mình xin tạm dừng phần này ở đây,, chúng ta sẽ quay lại với hiệu ứng khác ở phần tiếp