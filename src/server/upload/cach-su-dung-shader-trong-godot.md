# I) Giới thiệu:
Mình đã có 1 seri nhỏ hướng dẫn mọi người cách dùng shader trong cocos2d-x rồi, nhưng vì mình ko dùng cocos nữa mà chuyển qua Godot nên mình sẽ remake lại các bài này bên godot. 

Có lẽ là mình nên bắt đầu với 1 bài hướng dẫn về cách sự dụng Godot thì phù hợp hơn, vì hiện tại trên viblo mình chưa thấy có bài hướng dẫn dùng nó, nhưng thôi được rồi mình sẽ trở lại với các seri cách sử dụng sau vậy, bây giờ mình sẽ viết các dùng shader trong Godot trước ....

## 1) Godot là gì?

Godot là một engine đa nền tảng để lập trình game (web, desktop, mobile, console), tương tự như Unity, Unreal, Cocos, GameMake.... Ưu điểm của godot là nhỏ gọn (chỉ tầm 30mb) và nó hoàn toàn miễn phí, có thể chạy trên các máy tình đời cũ. Nếu mục tiêu của bạn chỉ lập trình game đơn giản (đặc biệt với các game 2D) thì godot là một sự lựa chọn rất tốt bởi nó rất dễ học, cú pháp giống với python (có hỗ trợ code bằng C# và C++ nữa), cộng đồng khá lớn, cập nhập thường xuyên và còn dễ tiếp cận hơn cả Unity rất nhiều. 

Các bạn có thể vào trang chủ để tải về (https://godotengine.org)

## 2) Shader là gì?

Shader là một chương trình được chạy trên GPU để tương tác với đối tượng trong game sau đó hiển thị chúng trên màn hình.

Các bạn có thể đọc shader bên Cocos2d-x nếu quan tâm: https://viblo.asia/s/huong-dan-lap-trinh-shader-can-ban-b85og8Mj52G

# II) Khởi tạo project để test shader:

Sau khi tải về và mở lên các bạn sẽ thấy giao diện như thế này:

![](https://images.viblo.asia/1cb6719f-90b4-4dc5-aef6-c3e5e4e8d91a.png)

Chọn **new project**

![](https://images.viblo.asia/beaaa8b2-ef12-40e5-9a2c-4a3a67431677.png)

Điền tên và bấm "**Create Folder**" -> bấm tiếp **Create and Edit**

Sẽ vào được màn hình của dự án:

![](https://images.viblo.asia/c761c1b3-5dba-40db-9bef-9f3408dee8e8.png)

Trong này hoàn toàn chưa có gì cả, các bạn bấm nút 2DScene để tạo một 2D Node:

![](https://images.viblo.asia/7ef3ce0b-789c-473a-a0a9-d237730b6355.png)

Bấm vào Dấu **+** ở trên và chọn **Sprite**, đây là kết quả:

![](https://images.viblo.asia/a001ef8d-f802-4b98-afb7-fa0e153ac4b5.png)

Sprite trong này nó là một object có thể giúp chúng ta hiển thị 1 bức ảnh của 1 character, 1 item, 1 object nào đó ...

OK, bây giờ chọn Sprite và trong **Inspector** (bên phải bức ảnh), ngay tại phần **Texture**, chọn **Load**:

![](https://images.viblo.asia/839ae831-2b53-49c2-b8be-8b0847df404e.png)

Ưhmmm, hiện tại ko có gì hết, chúng ta chọn 1 icon mặc định của godot tạm vậy.

![](https://images.viblo.asia/53590530-b8af-4c45-a167-f1c841229270.png)

Bấm im chuột, kéo Sprite ra giữa màn hình cho dễ nhìn.

![](https://images.viblo.asia/8e0bc33a-ab68-47ba-9ddf-a620ab773ebc.png)

**Save As Scene** này lại, đặt tên bất kì bạn muốn, vì chúng ta chỉ dùng để test nên ko quá quan trong mấy chi tiết này. Sau khi save xong, các bạn click vào nút **Play** ở góc trên bên phải để chạy thử. Nếu thành công thì sẽ ra như sau:

![](https://images.viblo.asia/a06fefbe-8cc3-4173-ac30-94a2df88ec0a.png)


# III) Cách dùng shader trong Godot:
## 1) Tạo một shader mới:

Trong Godot, để tạo shader, bạn phải tạo ShaderMaterial và gán tài nguyên Shader mới cho nó.

![](https://images.viblo.asia/0e2db674-8438-4267-96cd-279aaa2a489e.png)

![](https://images.viblo.asia/65998287-a7e1-4515-a9e9-4b6874500be0.png)

![](https://images.viblo.asia/fd339cb3-1011-456e-9eb2-fd29d6684c9e.png)


## 2) Shader code đầu tiên với 1 màu:

```
shader_type canvas_item;

void fragment(){
  COLOR = vec4(0.4, 0.6, 0.9, 1.0);
}
```

**Giải thích:**

Trong Godot, tất cả các shader bắt đầu bằng một dòng chỉ định loại shader. Nó sử dụng định dạng sau:
```
shader_type canvas_item;
```

Bởi vì chúng ta đang viết 1 CanvasItem shader, chúng tôi chỉ định canvas_item trong dòng đầu tiên. Tất cả code của chúng tôi sẽ nằm bên dòng này.

Nói chung ý nghĩa của dòng này là nói cho Godot biết các biến và function tích hợp sẵn để phục vụ cho các dòng code bên dưới.

Có 3 loại func mà chúng ta có thể overrride trong shader là: vertex, fragment và light. Vì bài này là bài hướng dẫn cách dùng shader nên mình sẽ ko đi vào chi tiết, chúng ta sẽ trở lại 2 loại vertex và light vào lúc khác.

Tiếp tục:

```
void fragment(){
  COLOR = vec4(0.4, 0.6, 0.9, 1.0);
}
```

func fragment sẽ được chạy qua mọi pixel để xác định màu cuối cùng cho sprite là gì. Nói chung chức năng của hàm này là gán màu sắc cho từng pixel.
Ở vd trên chúng ta gán màu vec4(0.4, 0.6, 0.9, 1.0) (tức là red: 0.4, blue: 0.6, green: 0.9, alpha: 1) cho tất cả các vị trí của sprite nên các bạn thấy output của nó là:

![](https://images.viblo.asia/eacd7e4c-fd60-429a-ae6d-bb12c242fd12.png)

Bây giờ chúng ta sẽ tới phần phức tạp hơn:

Có nhiều đầu vào cho func fragment mà bạn có thể sử dụng để tính COLOR cuối cùng của pixel, và UV là một trong số đó.... Ủa, Uv là gì? bắt đầu loạn loạn rồi...

Có thể các bạn đang gặp khó khắn và không hiểu dòng trên gì, cũng chưa hiểu cơ chế làm việc kiểu gì - đặc biệt là các bạn chưa từng code shader, không sao, mình sẽ đi từ một vd thực tế như thế này:

Quên hết mọi lí thuyết đi, và suy nghĩ vấn đề bên dưới đây:

Vd như mình muốn vẽ 1 bức ảnh 32x32 pixel lên màn hình. Bây giờ mình cần có 1 func như thế nào để có thể giúp cũng ta làm đc điều này????

Như 1 cách tự nhiên, có phải là func đó sẽ tương tự như thế này ko: 
func Tô_màu(toạ_độ) -> color

như bức ảnh 32x32 pixel thì chúng ta sẽ call func này lần lược qua từng ô pixel và trả về màu sắc của pixel đó:

Tô_màu(toạ độ: (1, 1)) -> màu đỏ (vd trả về màu đỏ ngẫu nhiên thôi, các bạn ko cần để ý chi tiết... Ở đây là mình đang giả sử tại pixel thứ (1, 1) mình vẽ màu đỏ lên)...

Tô_màu(toạ độ: (2, 1)) -> màu xanh

...

Tô_màu(toạ độ: (31, 1)) -> màu xanh

Tô_màu(toạ độ: (32, 1) -> màu xanh

Tô_màu(toạ độ: (1, 2)) -> màu đỏ 

Tô_màu(toạ độ: (2, 2)) -> màu xanh 

....

Tô_màu(toạ độ: (32, 32)) -> màu đen

nói chung để vẽ 1 bức ảnh thì chúng ta cần vẽ từng màu của bức ảnh đó lên từng toạ độ pixel tương ứng.

....

Quay lại bài này:

func fragment làm nhiệm vụ giống với này giờ mình viết, tuy nhiên chúng ta không cần truyền param vào, mà sẽ có 1 biến được dựng sẵn trong Shader, giúp chúng ta lấy được toạ độ.

Có 1 chút khác biệt so với vd trên là biến UV không trả về toạ độ xy (32, 32) nhưng ở vd trên mà nó sẽ trảrả về toạ độ đã được chuẩn hoá (tức đưa hết về đoạn 0 -> 1, từ trái -> phải và từ trên -> dưới). 

Vd toạ độ (0, 0) của xy tương toạ độ (0, 0) của UV.

toạ độ (32, 32) của xy tương đương với (1, 1) của UV.

toạ độ (16, 16) của xy tương đương với (0.5, 0.5) của UV (Mình đang giả sử bức ảnh là 32x32 nha).

![](https://images.viblo.asia/390af327-19c2-445a-88e1-a7590086bd3d.png)

Hãy xem thử với vd dưới đây:

```
void fragment() {
  COLOR = vec4(UV, 0.0, 1.0);
}
```

![](https://images.viblo.asia/78f30dca-472b-45ec-93d7-f61b41161d40.png)

Các bạn thử suy nghĩ xem tại sao khi mình return vec4(UV, 0.0, 1.0); thì nó lại ra 1 dãi màu gradient như thế này???

......

OK, mình giải thích luôn cho các bạn mới tiếp xúc với shader.

ở góc trên bên trái thì toạ độ UV = (0, 0)

nên Color = vec4(UV, 0.0, 1.0) = vec4(0, 0, 0, 1) -> Cái này là màu đen chứ gì nữa :v. (rbg = 0 là màu đen).

Ở góc trên bên phải thì toạ đọ UV = (1, 0)

vậy thì Color = vec4(UV, 0.0, 1.0) = vec4(1, 0, 0, 1) -> gía trị red = 1, g = blue = 0 -> màu đỏ.

Như các bạn thấy thì từ góc trên bên trái qua phải, chúng ta sẽ thấy từ màu đen dần dần qua màu đỏ.

là vì giá trị u của toạ độ UV tăng dần từ 0 -> 1 lên tức là các pixel ở giữa sẽ mang các giá trị red tăng dần lên qua từng pixel 0 (đen) -> 0.1-> 0.2 .... -> 0.9 -> 1 (red). 

Ở góc trái bên dưới là màu xanh bởi vì UV = (0, 1)

Color = vec4(UV, 0.0, 1.0) = vec4(0, 1, 0, 1), red = 0, green = 1, blue = 0, alpha = 1 -> màu xanh.

Cứ như vậy... các bạn mình tổng thể và thử tự lí giải cho các màu sắc ở các vùng khác tại sao lại có màu như vậy...

OK Bây giờ, chúng ta đi tới phần cuối của bài này, đó là vẽ 1 tấm ảnh lên screen bằng cách dùng shader

## 3) Sử dụng Texture trong Shader :

Bây giờ chúng ta sẽ sử dụng fragment để vẽ 1 image lên màn hình:

Như vậy, làm sao để vẽ 1 bức ảnh lên màn hình ?? 

Chúng ta cứ duyệt qua từng pixel và vẽ y xì xì lên, tại pixel này tấm ảnh là màu xanh thì chúng ta vẽ màu xanh, tại vị trí này màu đỏ chúng ta vẽ đỏ, tại vị trí kia màu đen thì chúng ta vẽ lên màu đen. Kết thúc qua trình này thì chúng ta sẽ được bức ảnh. Ý tưởng là vậy...

```
void fragment(){
  COLOR = texture(TEXTURE, UV); //read from texture
}
```

![](https://images.viblo.asia/9badf7bf-2763-4aa2-ab48-b1900ee65681.png)

**giải thích:**

Ở đây có 1 biến được dựng sẵn trong Shader godot là TEXTURE, nó lưu image (hình người máy mà chúng ta set up ban đầu).
`texture(TEXTURE, UV)` ý nghĩa đoạn code là chúng ta lấy màu sắc của bức ảnh trong Texture tại vị trí UV. 

Và như vậy ý nghĩa của đoạn code này là ` COLOR = texture(TEXTURE, UV); //read from texture
}`:

Chúng ta duyệt qua từng pixel của bức ảnh vẽ và vẽ ý xì xì màu sắc tương ứng nó lên màn hình. Kết qủa là chúng ta được bức ảnh.

Mình kết thúc bài này ở đây, Có thể sắp tới mình sẽ viết tutorial vè Godot 1 vài bài, hoặc cũng có thể đi qua các phần code shader trong godot luôn :v...