# Giới thiệu
Physically-Based Rendering hay PBR là một tập hợp các phương thức/thủ thuật để các vật thể 3D render từ máy tính thật hơn nhờ việc áp dụng các quy tắc vật lý tương tự như ở thế giới thực. Nhờ PBR mà ngày nay chúng ta có thể thấy được các kĩ xảo trong game nhìn không khác là bao so với thực tế. Bài trước của mình có một đoạn so sánh giữa PBR với thuật toán tô màu cổ điển (Blinn-Phong) về các ưu nhược điểm, giờ thì bắt tay vào tìm hiểu cách PBR hoạt động thôi!

![](https://images.viblo.asia/06978360-b3e5-488c-abda-585c93ce0fa1.png)

Các chất liệu + *bề mặt* khác nhau được áp dụng lên cùng một khối cầu

Ai chỉ quan tâm đến code shader và mã nguồn project có thể đọc đến phần kế cuối mình sẽ tổng hợp lại toàn bộ.
# Lý thuyết
Toàn bộ lý thuyết về PBR một cách dễ hiểu nhất (bằng tiếng Anh) có thể được xem qua bài thuyết trình này: https://www.youtube.com/watch?v=j-A0mwsJRmk của Naty Hoffman. Kèm theo slide và note chi tiết: [Slide](https://blog.selfshadow.com/publications/s2013-shading-course/hoffman/s2013_pbs_physics_math_slides.pdf) [Note](https://blog.selfshadow.com/publications/s2013-shading-course/hoffman/s2013_pbs_physics_math_notes.pdf)

Bạn nào muốn xem giải thích của mình thì tiếp tục đọc nhé. Warning: Physics & Math incoming. Các hình ảnh dưới đây hầu hết đều lấy nguồn từ slide của Hoffman.

## Microfacet
Tất cả các cài đặt và tính toán của PBR được dựa trên lý thuyết về các mặt siêu nhỏ (microfacet) trên bề mặt của một vật bất kì. Hãy xem xét bề mặt một vật ở cấp độ siêu nhỏ, chúng ta xem bề mặt này "nhẵn" hoặc "nhám" dựa trên việc các microfacet được sắp xếp như thế nào. Các microfacet này giống như là một bề mặt con của bề mặt ban đầu, và xử xử "gần như" một tấm gương. Chúng ta đều biết gương sẽ phản chiếu ánh sáng nó nhận được thành một tia phản xạ với góc phản xạ bằng góc tới (Vật lý 7). Khi bề mặt nhám, các mặt gương hướng theo các góc hỗn loạn sẽ khiến ánh sáng bị khuếch tán rất mạnh, nếu có phản chiếu thì hình ảnh tạo bởi bề mặt này rất mờ. Ngược lại với bề mặt nhẵn, ánh sáng gần như được phản xạ theo cùng một hướng do đó ta thấy nó "bóng" hơn (do ánh sáng tập trung "bay" vào mắt được nhiều hơn).
![](https://images.viblo.asia/e9443709-0821-445c-82d1-8b49c4b3e4e9.png)

## Kim loại và non-kim loại 
Tất nhiên không phải mọi bề mặt đều phản xạ tất cả ánh sáng chiếu vào nó. Chúng ta không thể trông đợi một miếng nhựa phản chiếu ánh sáng bằng với một tấm kính được. Và sử dụng định lý **bảo toàn năng lượng**, nhất định phần năng lượng mất đi đó phải trở thành một dạng gì đó. Đó chính là phần ánh sáng không được phản xạ và được bề mặt vật hấp thụ. Phần đó sẽ thay đổi tuỳ theo tính chất bề mặt! 

![](https://images.viblo.asia/37b0dd55-3406-4fde-bd5b-fd9a3c31450f.png)

Bởi ánh sáng nhìn thấy thực chất là một loại sóng điện từ, do đó đối với kim loại, cấu trúc phân tử của chúng khiến chúng hấp thụ toàn bộ phần ánh sáng này. Khác với kim loại, các bề mặt không phải kim loại sẽ hấp thụ một phần của ánh sáng đó, tích năng lượng và trả nó ra (Vì sao? Vì ~~nó không phải kim loại~~ các phân tử của chúng thường đã bão hoà điện tích, do đó nó không còn muốn giữ thêm nhiều năng lượng nữa). Đó là lý do khi ta chiếu ánh sáng vào một mảnh nhựa, phần không được chiếu sáng trực tiếp vẫn sáng nhẹ lên.

![](https://images.viblo.asia/8ad5dc18-e98d-4a21-b735-5d653dfcc13f.png)

Dựa vào đó, ta có thể thấy phần ánh sáng diffuse (khuếch tán), giúp ta thấy được màu sắc bề mặt và phần specular (bóng), giúp ta thấy màu sắc nguồn sáng là hai phần bổ trợ cho nhau. Nghĩa là tổng năng lượng ánh sáng ban đầu sẽ được phân tách thành 2 thành phần chính này.
```cpp
kS = calculateSpecularFraction(...); // Tính tỉ lệ ánh sáng phản xạ
kD = 1 - kS; // Tính tỉ lệ phần ánh sáng bị hấp thụ
```

## Halfway vector + Thành phần sáng phản xạ
Lại một khái niệm nữa mình không biết dịch thành tiếng Việt như thế nào. Chúng ta hãy nhìn lại hình bề mặt sau đây, chỉ xét với vector chỉ hướng nhìn của ta (camera) là $v$ và vector ánh sáng từ nguồn sáng là $l$, trong số rất rất nhiều microfacet hướng về đủ góc, chỉ những microfacet có vector pháp tuyến là $h$ (màu đỏ) mới đóng góp ánh sáng phản xạ vào vật ta thấy. Nghĩa là ánh sáng có phản chiếu ở các microfacet khác, tuy nhiên ta chỉ xét đến những microfacet giúp ta nhìn thấy ánh sáng trên bề mặt mà thôi. 

![](https://images.viblo.asia/4ef2b5de-ba62-4e31-8e4d-14ceced575e2.png)

Vector h này gọi là halfway vector. Nó được tính bằng `(l+v)/length(l+v)`. Kết hợp cùng với tham số `roughness`, ta có thể tuỳ ý biến thiên bề mặt vật thể theo cách mình muốn. Bằng cách sử dụng công thức BRDF (bidirectional reflective distribution function - một hàm tính ra mức độ phản chiếu ánh sáng trên bề mặt), chúng ta có thể ước lượng gần chính xác ánh sáng phản xạ từ vật thể khi nó nhận ánh sáng chiếu vào. Hàm đó được định nghĩa như sau:
$$ f(l,v) = \frac{F(l,h)G(l,v,h)D(h)}{4(n \cdot l)(n \cdot v)} $$
Hơi đáng sợ nhỉ? Chúng ta hãy mổ xẻ nó ra từng phần để hiểu rõ nó hơn.

### Phản xạ Fresnel
$$ f(l,v) = \frac{\boxed {F(l,h)} G(l,v,h)D(h)}{4(n \cdot l)(n \cdot v)} $$
Lượng ánh sáng phản chiếu bởi bề mặt vật thể sẽ thay đổi khi góc tạo bởi tia nhìn và vector pháp tuyến tại bề mặt thay đổi. Tại $90\degree$, bề mặt vật thể sẽ phản chiếu 100% ánh sáng chiếu vào nó. Chúng ta có thể nhìn thấy phần phản xạ này qua hình minh hoạ bên dưới:

![](https://images.viblo.asia/f5932b77-8333-4d46-bbcb-263af62cd8bf.jpg)

Chúng ta dễ thấy phần rìa của quả cầu (dù bóng hay nhám) sáng nhất do ở đó góc tạo bởi tia nhìn và pháp tuyến bề mặt là tối đa. Tuỳ vào chất liệu mà lượng ánh sáng được phản chiếu cũng khác nhau, nhưng nó sẽ đạt cực tiểu khi góc nhỏ và đạt tối đa khi góc = $90\degree$. Có nhiều cách để ước lượng thành phần phản xạ này, nhưng công thức của Schlick phổ biến bởi vì tính chính xác và tiết kiệm tài nguyên (tính toán của GPU) của nó. Theo đó thành phần này được tính như sau
$$
F(l, n) = {F}_{o} + (1 - {F}_{o} )(1 - (l \cdot n))^{5}
$$

$n$ ở đây chính là vector halfway mà chúng ta đề cập ở trên.
${F}_{o}$ là đại lượng đặc trưng cho chất liệu bề mặt. Với kim loại thì giá trị thực của đại lượng này khá cao, đại lượng này giảm khi tính phi-kim loại tăng dần.

### Bề mặt vật thể

$$ f(l,v) = \frac{F(l,h) \boxed {G(l,v,h)} D(h)}{4(n \cdot l)(n \cdot v)} $$
Đây là thành phần $G$ trong công thức BRDF. Cho ta biết xác suất tại điểm ta đang xét liệu bề mặt microfacet có bị một khối nào đó che khuất hay không. Hàm này nhận tham số là `roughness` của chất liệu. Kết hợp hai ước lượng GGX và Schlick-Beckman, ta có một hàm ước lượng thành phần này như sau:
$$
G(n, v, k) = \frac{n \cdot v}{(n \cdot v)(1 - k) + k}
$$

Với k là một đại lượng tính từ `roughness` của vật liệu. Tuỳ vào lúc ta tính phản chiếu ánh sáng trực tiếp (từ nguồn sáng) hay từ môi trường (IBL - image based lightning - tính toán ánh sáng từ một "ảnh 360 độ" từ môi trường cho trước) mà k có thể tính khác nhau

$$
{k}_{direct} = \frac{{(\alpha + 1)}^{2}}{8}
$$
$$
{k}_{IBL} = \frac{{\alpha}^{2}}{2}
$$

Trong đó $\alpha$ sẽ được quy đổi trực tiếp từ `roughness`.

![](https://learnopengl.com/img/pbr/geometry_shadowing.png)

### Hàm phân phối

$$ f(l,v) = \frac{F(l,h)G(l,v,h) \boxed {D(h)}}{4(n \cdot l)(n \cdot v)} $$
Thành phần $D$ (distribution) của BRDF. Chúng ta sẽ giả lập một bề mặt gồ ghề hay nhẵn bóng bằng hàm này. Với giá trị `roughness` cao, bề mặt sẽ có rất nhiều microfacet hướng đi ngẫu nhiên, khiến ánh sáng bị phân tán và "tối hơn". Ngược lại, đối với bề mặt nhẵn, các microfacet gần nhau sẽ tập trung hướng về cùng một hướng do đó khi đặt ở đúng góc độ, ta sẽ có một hình ảnh phản chiếu sắc nét (và nhỏ) của nguồn sáng. 

![](https://learnopengl.com/img/pbr/ndf.png)

Do đây là một hàm phân phối được tạo ra để mô hình hoá thực tế, nên ta có thể tuỳ ý chọn một hàm để thay đổi đặc tính của "đốm sáng phản xạ". Ở đây mình sẽ dùng hàm phân phối Trowbridge-Reitz GGX. Hàm đó được cài đặt như sau:

```cpp
float DistributionGGX(vec3 N, vec3 H, float a)
{
    float a2     = a*a;
    float NdotH  = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;
	
    float nom    = a2;
    float denom  = (NdotH2 * (a2 - 1.0) + 1.0);
    denom        = PI * denom * denom;
	
    return nom / denom;
}
```

### Mẫu số
Bản chất của giá trị $(n \cdot l)(n \cdot v)$ ở mẫu số của hàm BRDF chính là Geometry (tính chất bề mặt) của vật thể. Tuy nhiên nó không phải của các mặt microfacet mà là của cả khối vật thể. Để dễ hình dung, hãy nghĩ đến một quả bóng đặt trước một nguồn sáng. Phần quả bóng hướng về phía nguồn sáng (có pháp tuyến cùng phương ngược chiều với hướng tia sáng) sẽ sáng nhất, các vị trí hướng về phía khác nguồn sáng sẽ nhận ít ánh sáng hơn, do đó sẽ tối hơn. 

![](https://math.hws.edu/graphicsbook/c7/light-equation.png)

Khi chuẩn hoá vector $n$ và $l$, $n \cdot l$ chính là cos góc tới ánh sáng, góc tới càng nhỏ thì ánh sáng càng "trực diện".


## Thành phần sáng khuếch tán
Phía trên đã trình bày cách tính thành phần phản xạ (specular). Phần ánh sáng khuếch tán - cho thấy màu sắc thực của vật thể - đơn giản hơn. Quay lại một chút, chúng ta đã phân tích ánh sáng khi tiếp xúc với bề mặt của vật thể sẽ được chia thành 2 thành phần, khi sử dụng định luật bảo toàn năng lượng, chúng ta biết rằng tổng năng lượng 2 thành phần này không được vượt quá năng lượng của nguồn sáng ban đầu.
```cpp
kS = calculateSpecularFraction(...); // Tính tỉ lệ ánh sáng phản xạ
kD = 1 - kS; // Tính tỉ lệ phần ánh sáng bị hấp thụ
```

![](https://images.viblo.asia/fa30209f-78b8-48f9-ac2d-96d442f15be0.png)

Thành phần diffuse sẽ được tính theo công thức

$$
L_d = k_d * \frac{c}{\pi}
$$

Trong đó c là màu của vật thể và kD là tỉ lệ của thành phần diffuse.

Khi có giá trị của cả 2 thành phần, việc chúng ta cần làm là cộng chúng lại với nhau để có được màu sắc cuối cùng.

# Cài đặt
## Chuẩn bị
* Model 3D: Khẩu súng lục được thiết kế kèm với material map (bao gồm các tham số ta đã nói phía trên - roughness, metallic...) cùng với normal map và ambient occlusion map (cho biết vùng nào trên khẩu súng nhận được nhiều ánh sáng nhất)

* Môi trường: Một cubemap chi tiết môi trường xung quanh và một cubemap để tính toán ánh sáng khuếch tán từ môi trường. Bạn có thể tìm các ảnh HDR chất lượng cao dễ dàng trên internet để dùng thử, và dùng một tool có sẵn như [sIBLEdit](http://www.hdrlabs.com/sibl/sibl-edit.html) để tạo ra cubemap thứ 2.

![](https://images.viblo.asia/3a435a2f-17da-48a1-9fca-6fa339d4aff7.png)

* Một LUT (Look-up texture) đã tính toán sẵn cho hàm BRDF để giảm thiểu tính toán cho GPU.

![](https://learnopengl.com/img/pbr/ibl_brdf_lut.png)

* Lòng kiên trì debug :)

* Các bạn có thể lấy resource mình đóng gói sẵn ở link github: https://github.com/Colb98/Test3D/tree/master/res

## Vertex shader
Cái này gần như tương tự nhau cho mọi shader. Ở vertex shader chúng ta sẽ đọc các thông tin về đỉnh của model. Bao gồm:
* Vị trí trong không gian (Model Space)
* Toạ độ màu lấy từ texture (Texture Coordinate)
* 3 vector Normal, Tangent và Bitangent để tính được vector pháp tuyến

```cpp
// File pbr.vert
attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec3 a_tangent;
attribute vec3 a_binormal;
attribute vec2 a_texCoord;

varying vec3 v_normal;
varying vec2 v_uv;
varying vec4 v_world_position;
varying vec3 v_tangent;
varying vec3 v_binormal;

void main(){
    gl_Position = CC_MVPMatrix * a_position;

    v_world_position = CC_MVMatrix * a_position;
    v_normal = normalize(CC_NormalMatrix * a_normal);
    v_uv = a_texCoord;
    v_uv.y = (1.0 - v_uv.y);

    v_tangent = normalize(CC_NormalMatrix * a_tangent);
    v_binormal = normalize(CC_NormalMatrix * a_binormal);
}
```

* `gl_Position` là vị trí mà cocos sẽ vẽ đỉnh đó lên màn hình, do đó chúng ta cần chuyển từ ModelSpace -> WorldSpace (View Space) -> PresentationSpace bằng cách nhân với ma trận MVP Matrix (được cocos cung cấp sẵn)
* Còn lại các varying chúng ta sẽ truyền chúng sang fragment shader để tính toán.

## Fragment shader
Phần tính toán nhiều nhất. Trước tiên chúng ta cần khai báo một số biến đầu vào để chuẩn bị cho quá trình tính toán.

```cpp
// File pbr.frag
// Khai báo độ chính xác của kiểu float. Nếu cần sử dụng cho mobile thì chỗ này bắt buộc phải có. Do GL_ES trên mobile chỉ xử lý cho đến độ chính xác là mediump cho kiểu float
// Nếu sử dụng cho PC thì dùng highp để chất lượng hình ảnh cao hơn (do sử dụng số chính xác hơn)
#ifdef GL_ES
precision mediump float;
#endif

// Các varying truyền từ vertex shader
varying vec3 v_normal;
varying vec2 v_uv;
varying vec4 v_world_position;
varying vec3 v_tangent;
varying vec3 v_binormal;

// u_color là uniform của cocos
uniform vec4 u_color;
// Vị trí camera
uniform vec3 u_cam_pos;

// 5 point lights
// Vị trí các nguồn sáng
uniform vec3 u_point_light[6];

// Các texture mô tả bề mặt của vật thể
uniform sampler2D u_albedo_map;
uniform sampler2D u_ao_map; 
uniform sampler2D u_metallic_map; 
uniform sampler2D u_roughness_map; 
uniform sampler2D u_normal_map; // Tuỳ thuộc vào material
uniform sampler2D u_opacity_map; // Tuỳ thuộc vào material. Đôi khi có một số material cần cái này, có thể bỏ đi
uniform sampler2D u_brdf; 

// cubemap để tính phản xạ môi trường cho các vật thể bóng bẩy
uniform samplerCube u_hdr_map_0;
// cubemap để tính ánh sáng khuếch tán từ môi trường
uniform samplerCube u_env_map;

const float PI = 3.14159265359;
```

Bắt tay vào chuẩn bị các giá trị được cung cấp sẵn để tính toán, chúng ta sử dụng hàm texture2D để đọc dữ liệu từ texture và chuẩn hoá vài giá trị varying:

```cpp
void main(){
    float metallic = texture2D(u_metallic_map, v_uv).r;
    vec3 normal = calcNormal();
    float roughness = texture2D(u_roughness_map, v_uv).r;
    float ao = texture2D(u_ao_map, v_uv).r;
    vec3 albedo = texture2D(u_albedo_map, v_uv).rgb;
    albedo = pow(albedo, vec3(2.2));
    //...
}

// Tính vector normal (nếu model có hỗ trợ)
vec3 calcNormal(){
    vec3 normal = texture2D(u_normal_map, v_uv).rgb;
    normal = normal * 2.0 - 1.0;
    normal = normal.r * v_tangent + normal.g * v_binormal + normal.b * v_normal;
    return normal;
}
```

Chúng ta dùng câu lệnh `pow(albedo, vec3(2.2));` để tăng khoảng màu của albedo lên. Thao tác này còn gọi là **gamma expansion**, ở bước cuối chúng ta sẽ thực hiện thêm một thao tác **gamma compression** để nén màu trở lại khoảng (0.0, 1.0).

Tiếp tục tính toán các giá trị tại điểm:

```cpp
    vec3 world_pos = v_world_position.xyz;
    vec3 N = normal;
    vec3 V = normalize(u_cam_pos - world_pos);
    vec3 r = reflect(-V, N);

    float NdotV = max(dot(N, V), 0.0001);

    vec3 F0 = vec3(0.04);
    F0 = mix(F0, albedo, metallic);
    vec3 Lo = vec3(0.0);
```

Ở đây chúng ta tính toán sẵn các vector vị trí, vector tia nhìn `V`, vector phản xạ `r`. `F0` là vector để tính thành phần fresnel đã đề cập phía trên, nếu hoàn toàn là phi-kim loại sẽ mang giá trị 0.04, ngược lại sẽ mang màu sắc của vật thể (albedo). Lo là tổng giá trị ánh sáng tại điểm đang xét, khởi tạo bằng 0.

Tiếp theo chúng ta sẽ tính giá trị Lo này đối với từng nguồn sáng

```cpp
    // POINT LIGHTS
    // Loop từ 1 - 2
    for(int i=1;i<3;i++){
        // Vị trí của nguồn sáng trong WorldSpace
        vec3 light = u_point_light[i];
        
        // Vector L = (nguồn sáng) - (vị trí điểm)
        vec3 L = normalize(light - world_pos);
        
        // Vector Halfway = V + L (V và L đều đã chuẩn hoá)
        vec3 H = normalize(V + L);
        
        // Khoảng cách đến nguồn sáng, chia 100.0 là để scale đơn vị tính trong shader với thực tế. Ví dụ đối với mình 1 unit = 1cm => 100 unit = 1m do đó cần chia 100.0
        // Có thể thay đổi để tăng ảnh hưởng của nguồn sáng với vật
        float dist = length(light - world_pos)/100.0; 
        float attenuation = 1.0/(dist*dist); // Sự hao hụt năng lượng ánh sáng được xấp xỉ bằng cách lấy nghịch đảo bình phương khoảng cách = Càng xa càng mờ/tối
        vec3 radiance = vec3(1.0,1.0,1.0) * attenuation;

        float NdotL = max(dot(N, L), 0.0); // Cosine góc tới của ánh sáng với pháp tuyến tại điểm

        float NDF  = DistributionGGX(N, H, roughness); // Hàm phân phối
        float G = GeometrySmith(NdotV, NdotL, roughness); // Thành phần geometry bề mặt của vật
        vec3 F  = FresnelSchlick(max(dot(H, V), 0.0), F0); // Phản xạ Fresnel

        // Tỉ lệ giữa Diffuse và Specular (kS + kD = 1.0)
        vec3 kS = F;
        vec3 kD = vec3(1.0) - kS;
        kD *= 1.0 - metallic;

        // Phản xạ Specular = (NDF * G * F) / (4.0 * NdotV * NdotL)
        vec3 num = NDF * G * F;
        float denom = 4.0 * NdotV * NdotL;
        vec3 specular = num / max(denom, 0.0001);
       
        // Ánh sáng cuối cùng = Specular + Diffuse 
        // Diffuse = Tỉ lệ diffuse * màu vật thể / PI
        Lo += (kD * albedo / PI + specular) * radiance * NdotL;
    }
```
Mình sử dụng nguồn sáng từ 1-2 do đó lặp vòng for 2 lần. Giá trị ánh sáng sẽ được cộng vào ở cuối vòng lặp cho mỗi nguồn, nghĩa là điểm càng nhận được ánh sáng từ nhiều nguồn thì càng sáng hơn (hợp lý phết).

Các hàm được sử dụng ở đoạn code trên: 

```cpp
vec3 FresnelSchlick(float cosTheta, vec3 F0){
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

float DistributionGGX(vec3 N, vec3 H, float roughness){
    float a = roughness * roughness;
    float a2 = a*a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;

    float num = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return num/denom;
}

float GeometrySchlickGGX(float NdotV, float roughness){
    float r = (roughness + 1.0);
    float k = (r*r)/8.0;
    float num = NdotV;
    float denom = NdotV * (1.0-k) + k;
    return num/denom;
}

float GeometrySmith(float NdotV, float NdotL, float roughness){
    float ggx2 = GeometrySchlickGGX(NdotV, roughness);
    float ggx1 = GeometrySchlickGGX(NdotL, roughness);

    return ggx1 * ggx2;
}
```

Các tính toán này đã được đề cập phía trên nên mình sẽ không giải thích lại nữa nhá. Giờ chúng ta sẽ xử phần phản xạ môi trường xung quanh.

```cpp
    vec3 F = FresnelSchlickRoughness(NdotV, F0, roughness);
    vec3 kS = F;
    vec3 kD = 1.0 - kS;
    kD *= 1.0 - metallic;

    vec3 irradiance = textureCube(u_env_map, N).rgb; // Ánh sáng khuếch tán từ môi trường
    vec3 diffuse =  irradiance * albedo; // thành phần Diffuse 
```

Chúng ta cũng tính kS và KD như ở trên. Nhưng tính F chúng ta cần xét tới tính "nhám" của vật thể, tinh chỉnh hàm FresnelSchlick 1 tí.

```cpp
vec3 FresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness){
    // return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(1.0 - cosTheta, 5.0);
}
```

Thành phần Specular sẽ được tính như sau.

```cpp
    const float MAX_LOD = 3.0;
    vec3 prefilteredColor = textureCubeLod(r, roughness * MAX_LOD).rgb;
    vec2 brdf = texture2D(u_brdf, vec2(NdotV, roughness)).rg;
    vec3 specular = prefilteredColor * (F * brdf.x + brdf.y);
```

Với `LOD` là độ chi tiết của texture khi chúng ta "phản chiếu" nó lên bề mặt. Chúng ta sẽ tận dụng cubemap "mờ" để tạo ra các mức chi tiết khác nhau. Đoạn này đúng ra chúng ta phải sử dụng các mipmap level khác nhau của texture cubemap. Tuy nhiên phiên bản OpenGL được sử dụng bởi cocos2dx không hỗ trợ hàm `texture(sampler, vector, mipLevel)` nên mình phải sử dụng một cách cồng kềnh hơn. Kết quả đạt được với các scene mình test thử khá tốt, và performance không quá tệ. 

```cpp
vec4 textureCubeLod(vec3 uvw, float lod){
    if(lod < 1.0){
        return textureCube(u_hdr_map_0, uvw);
    }
    else if(lod < 2.0){
        return mix(textureCube(u_hdr_map_0, uvw), textureCube(u_env_map, uvw), vec4(fract(lod)));
    }
    else{
        return textureCube(u_env_map, uvw);
    }
}
```

Hàm sẽ nội suy giá trị giữa 2 cubemap để tạo ra các hình ảnh với độ mờ khác nhau tuỳ theo `lod`.

Sau khi tính toán xong thành phần diffuse và specular, việc cuối cùng cần làm là cộng chúng lại và kết hợp với ánh sáng từ nguồn sáng (`Lo`) ta đã có.
```cpp
    // ...
    vec3 ambient = (kD * diffuse + specular)* ao;
    vec3 color = ambient + Lo;
   
   // Gamma Compression để nén màu ảnh về khoảng (0,1);
    color = color/(color + vec3(1.0));
    color = pow(color, vec3(1.0/2.2));

    gl_FragColor = vec4(color, 1.0) * u_color;
```

## Cocos2dx
Vì mục đích chính là cài đặt shader để tô màu, phần này mình sẽ chỉ cài đặt các bước tối thiểu để thêm một đối tượng 3D và sử dụng shader lên nó. Các bước râu rìa (cài đặt camera, điều khiển) sẽ không được đề cập, tuy nhiên có thể dễ dàng tìm thấy rất nhiều hướng dẫn trên mạng cho cocos. Bạn nào gặp khó khăn gì lúc cài đặt có thể liên hệ với mình.

```cpp
initSphere: function(){
        // Đặt tên hơi ngu do lúc đầu mình chỉ định vẽ 1 quả cầu thôi :)
        let sphere = new jsb.Sprite3D(res.gun);
        sphere.setRotation3D(cc.math.vec3(-90, 0, 0));
        sphere.setPosition3D(cc.math.vec3(14, 125, 0));
        this.addChild(sphere);
        this._sphere = sphere;
},
```

Khởi tạo một đối tượng Sprite3D và cho vào trong scene. Không có gì đặc biệt. Vị trí và góc xoay là tuỳ ý, à và nhớ setup camera để nhìn thấy được nhé. Setup camera có ở phần cuối bài viết [trước](https://viblo.asia/p/cocos2dx-js-khoi-tao-project-cocos2dx-de-chay-tren-windows-va-android-dev-3d-game-the-hard-way-bWrZnmRnKxw) của mình.

Sau đó chúng ta tạo ra một đối tượng lưu state của shader và áp nó lên Sprite3D.

```cpp
    initShader: function(){
        // Đường dẫn tới shader
        const shader = new cc.GLProgram("res/shader/pbr.vert", "res/shader/pbr.frag");
        shader.retain();

        const state = cc.GLProgramState.create(shader);
        this._sphere.setGLProgramState(state);
        this._state = state;
        this._program = shader;
        
        // Các texture truyền vào
        state.setUniformTexture("u_brdf", cc.textureCache.addImage(res.brdf_lut));
        state.setUniformTexture("u_albedo_map", cc.textureCache.addImage(res.gun_albedo));
        state.setUniformTexture("u_metallic_map", cc.textureCache.addImage(res.gun_metallic));
        state.setUniformTexture("u_ao_map", cc.textureCache.addImage(res.gun_ao));
        state.setUniformTexture("u_roughness_map", cc.textureCache.addImage(res.gun_roughness));
        state.setUniformTexture("u_normal_map", cc.textureCache.addImage(res.gun_normal));


        let pPointLights = [0,0,0, 0,0,-50, 0,100,50];
        pPointLights = new Float32Array(pPointLights);

        var program = shader.getProgram();
        var loc = gl.getUniformLocation(program, "u_point_light");
        gl.uniform3fv(loc, 3, pPointLights);
        
        // Cubemap ánh sáng khuếch tán
        const path = "res/cubemaps/icelake_env/";
        const env_map = jsb.TextureCube.create(path + "px.png", path + "nx.png", path + "py.png", path + "ny.png", path + "pz.png", path + "nz.png");
        env_map.setTexParameters(gl.LINEAR, gl.LINEAR, gl.MIRRORED_REPEAT, gl.MIRRORED_REPEAT);
        state.setUniformTexture("u_env_map", env_map);

        // Các texture cube không được retain khi truyền vào shader, nên cần có một skybox ảo để giữ nó. Chúng ta sẽ không cho hiển thị skybox này (vì nó mờ)
        let dummyskybox = jsb.Skybox.create();
        dummyskybox.setTexture(env_map);
        this.addChild(dummyskybox);
        dummyskybox.setVisible(false);
        
        // Cubemap chi tiết
       const path_hdr = "res/cubemaps/icelake_hdr_1/";
       const hdr_map = jsb.TextureCube.create(path_hdr + "px.png", path_hdr + "nx.png", path_hdr + "py.png", path_hdr + "ny.png", path_hdr + "pz.png", path_hdr + "nz.png");
       hdr_map.setTexParameters(gl.LINEAR, gl.LINEAR, gl.MIRRORED_REPEAT, gl.MIRRORED_REPEAT);
       state.setUniformTexture("u_hdr_map_0", hdr_map);

      // Hiển thị để nhìn mọi thứ sinh động hơn (là một cái nền đen thui) 
       let dummyskybox = jsb.Skybox.create();
       dummyskybox.setTexture(hdr_map);
       this.addChild(dummyskybox);
    },
```

Sau đó nhớ setup thêm cả hàm truyền vị trí camera khi thay đổi góc quay nữa nhé. Các bạn hãy tìm cách để gọi hàm này mỗi khi camera thay đổi góc máy, vị trí.
```cpp 
    onCameraChange: function(position){
        if(this._state)
            this._state.setUniformVec3("u_cam_pos", position);
    },
```

## Thành phẩm
{@embed: https://www.youtube.com/watch?v=CXNOla1Dsuc}

Các bạn có thể tải demo trên về để build chạy thử tại github của mình: https://github.com/Colb98/Test3D

Nếu bạn đã đọc đến phần này của bài viết, cảm ơn rất nhiều :D

# Nguồn tham khảo
* Bài viết chi tiết dễ hiểu bằng tiếng Anh về các phương trình toán học: https://learnopengl.com/PBR/Theory
* Slide kinh điển về PBR của Hoffman: https://blog.selfshadow.com/publications/s2013-shading-course/hoffman/s2013_pbs_physics_math_notes.pdf
* Slide và Paper của EpicGame về PBR: https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
* Blog về một Engine tự build theo nguyên lý PBR của Alex Tardif: http://alextardif.com/eden.html. Blog này có chi tiết vài cách implement về nguồn sáng có diện tích (Bài trên chỉ nói về nguồn sáng điểm), rất hữu ích và dễ làm theo.
* Nguồn lấy resource môi trường: http://www.hdrlabs.com/ 
* Model PBR: https://www.cgtrader.com/free-3d-models/military/gun/schofield-3-co2-bb