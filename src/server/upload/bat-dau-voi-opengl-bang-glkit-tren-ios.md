# GLKit khởi đầu với OpenGL ES trên iOS

Nếu bạn từng có hứng thú về lập trình đồ hoạ, chắc bạn đã nghe đến OpenGL. Nó cung cấp những rất manh để sử lý đồ hoạ cả phần mềm và tương tác phần cứng. Do đó Apple đã tạo ra 1 framework tên là GLKit để giúp các lập trình viên sử dụng OpenGL 1 cách dễ dàng hơn, bạn có thể tập trung vào việc vẽ ko cần quan tâm quá nhiều đến việc thiết lập project. Trong bài viết này tôi sẽ trình bày 1 hướng dẫn đơn giản về GLKit trên iOS<br/>
GLKit cung cấp cho bạn các tính năng trong 4 phần:<br/>
*	Views và View Controllers: tạo code sẵn để bạn chó thể khởi tạo OpenGL ES trong project
*	Hiệu ứng: Cung cấp những hiệu ứng thông thường như: Shading, lighting, reflection, skybox...
*	Thuật toán: Cung cấp những Helpers giúp tính toán khi vẽ như vector, sinh ma trận...
*	Texture loading: Giúp việc load ảnh thành texture để sử dụng dễ dàng hơn

### Bắt đầu
Để bắt đầu chúng ta sẽ tạo 1 app đơn giản chỉ là hiển thị 1 hình vuông trên màn hình và rotate nó. Đầu tiên hãy tạo 1 project đơn giản vd tên: `GLKitExample`, sử dụng Swift làm ngôn ngữ.

### Làm quen với GLKView và GLKViewController
Đầu tiên hãy import GLKit và kế thừa ViewController bở GLKViewController
<br/>![](https://images.viblo.asia/6944e598-f8ab-41e0-baeb-2bbedddb43e3.png)<br/>
Sau đó khởi tạo GLKViewController trên storyboard bằng cách kéo 1 đối tượng vào thay đổi custom class bằng ViewController
<br/>![](https://images.viblo.asia/73dac818-e6df-4655-812d-8a34c102100d.png)<br/>
Ở phần Attributes inspector, click vào GLKView chúng ta có thể thấy 1 số settings cho màu sắc, độ sâu, stencil, multisampling. Bạn có thể thay đổi chúng ở những yêu cầu cao hơn, nhưng ở đây chúng ta chỉ cần 1 ví dụ đơn giản nên sử dụng setting mặc định là đủ.<br/>
OpenGL context có 1 bộ đệm để lưu những màu được hiển thị trên màn hình. Bạn có thể dùng tuỳ biến Color Format để thay đổi chuẩn màu của mỗi pixel trong bộ đệm.<br/>
Giá trị mặc định là `GLKViewDrawableColorFormatRGBA8888`, nghĩa là với 8 bit được sử dụng cho mỗi thành phần màu trong bộ đệm. Nó là tối ưu để hiển thị dải màu rộng nhất để làm việc giúp cho việc hiển thị đạt chất lượng cao hơn.
View controller của bạn đã được cài đặt với GLKView để vẽ OpenGL và nó cũng được cung cấp các delegate để cập nhật việc vẽ.<br/>
Chúng ta sẽ add thêm đoạn code tiếp theo:
<br/>![](https://images.viblo.asia/b2284124-e3da-4340-b528-ecfb8b1ebad8.png)<br/>
Đây là những gì xảy ra ở đoạn code trên:<br/>
1.	Để làm bất kỳ việc gì với OpenGL, bạn cần tạo 1 EAGLContext
Context quản lý tất cả những thông tin và iOS cần để vẽ với OpenGL. Giống như với Core Graphics thì chúng ta cũng cần context vậy. Khi khởi tạo chúng ta cần truyền vào version của API mà bạn muốn sử dụng ở đây là OpenGL ES 3.0.
2.	Dòng code thứ 2 để làm việc render context được chạy trên thread hiện tại
OpenGL context ko nên được chia sẻ bởi các thread, bởi vậy bạn sẽ phải chắc chắn là bạn kết nối với context từ thread mà mà call method `setupGL()`
3.	Đoạn code thứ 3 : set context cho glkview của bạn
4.	Đoạn code thứ 4: set delegate để cập nhật logic và trạng thái
Tiếp gọi hàm `setupGL` trong `viewDidLoad()`. Ở đây ta có thể thấy thread mà chúng ta gọi là ở `main thread`
Cho ViewController của bạn thực thi delegate.<br/>
Tiếp theo chúng ta tạo 1 function:
<br/>![](https://images.viblo.asia/da7a5003-feaf-4f9f-925b-c54e22b27ac4.png)<br/>

Đoạn code này sẽ vẽ nội dung trong mỗi frame. Chúng ta cùng phân tích: <br/>
1.	Gọi `glClearColor` để chỉ ra giá trị RGB và alpha sử dụng để làm sạch màn hình, trong ví dụ này là màu xám
2.	Gọi `glClear` để thực tế gọi thực thi hàm clear.
Chạy app chúng ta sẽ hiện thị màn hình với màu sắc thay đổi:
<br/>![](https://images.viblo.asia/0e9edd6f-d779-4065-baeb-da3bf96deaaf.png)<br/>
### Tạo dữ liệu đỉnh của 1 hình vuông đơn giản
Để tạo 1 hình vuông, chúng ta cần xác định được các đỉnh, đơn giản là các điểm chúng ta vẽ nối lại thành hình mình cần
Chúng ta sẽ cài đặt như sau:
<br/>![](https://images.viblo.asia/69a17e1d-12da-4e35-934a-58495c3e76f4.png)<br/>
Chỉ có thể dựng hình tam giác bằng cách sử dụng OpenGL. Tuy nhiên, bạn có thể tạo một hình vuông với hai hình tam giác như bạn có thể thấy trong hình trên: Một hình tam giác có đỉnh (0, 1, 2) và một hình tam giác có đỉnh (2, 3, 0).
<br/>
Một trong những điều khá ngon của OpenGL ES là bạn có thể giữ dữ liệu đỉnh của bạn được tổ chức theo ý bạn. Trong project này, bạn sẽ sử dụng 1 struct Swift để lưu trữ thông tin vị trí và màu sắc của đỉnh và sau đó là một loạt các đỉnh cho mỗi điểm mà bạn sẽ sử dụng để vẽ.<br/>
Tạo file `Vertex.swift` với nội dung như sau:
<br/>![](https://images.viblo.asia/2aa49d3a-01ee-447f-bd94-3a0a6de4ed80.png)<br/>
Tiếp đến bạn sử dụng struct này để tạo một mảng các đỉnh để vẽ. Sau đó, bạn tạo một mảng các giá trị GLubyte, mảng này xác định thứ tự để vẽ mỗi một trong ba đỉnh tạo nên một hình tam giác:
<br/>![](https://images.viblo.asia/d2ca758f-0ce3-4603-bd79-3080cb14ad5e.png)<br/>

Cách tốt nhất để truyền data cho OpenGL là qua Vertex Buffer Objects. Có 3 loại:
*	Vertex Buffer Object (VBO): Theo dõi dữ liệu trên mỗi đỉnh, giống như dữ liệu bạn có trong mảng Vertices
*	Element Buffer Object (EBO): Theo dõi các chỉ số xác định tam giác, giống như các chỉ mục bạn đã lưu trữ trong mảng Indices
*	Vertex Array Object (VAO): Đối tượng này có thể đươc giữ data giống như đối tượng vertex buffer. Bất kỳ lời gọi thuộc tính đỉnh nào mà bạn thực hiện - sau khi liên kết một vertex array object - sẽ được lưu trữ bên trong nó. Điều này có nghĩa là bạn chỉ phải thực hiện lời gọi để định cấu hình con trỏ thuộc tính đỉnh một lần và sau đó - bất cứ khi nào bạn muốn vẽ một đối tượng - bạn chỉ cần liên kết với VAO tương ứng. Điều này tạo điều kiện tăng tốc độ vẽ dữ liệu đỉnh khác nhau với các cấu hình khác nhau.
Ở phía trên cùng của `ViewController.swift`, thêm phần extension Array sau đây để giúp nhận được kích thước, tính theo byte, của các mảng Vertices và Indices:
<br/>![](https://images.viblo.asia/58135f57-5da6-406b-92b5-3b9fc9b6772b.png)<br/>
Tiếp theo them các biến sau:
<br/>![](https://images.viblo.asia/9841897e-e429-4960-a026-a277ad4bd426.png)<br/>
Đây là các biến cho đối tượng buffer element, vertex buffer và vertex array object. Tất cả đều thuộc loại GLuint.
### Cài đặt các bộ đệm
Đầu tiên cần khởi taọ 1 số biến helpers trong hàm `setupGL()`
<br/>![](https://images.viblo.asia/69878448-b5e2-496e-9aeb-7ececf05be4a.png)<br/>
* 1, 2: 2 biến đầu tiền thể hiện cách đọc màu và vị trí của từ cấu trúc dữ liệu. Ở đây chúng ta dùng ` GLKVertexAttrib`
* 3: Ở đây, bạn tận dụng lợi thế của MemoryLayout để có được stride, đó là kích thước, tính theo byte, của một struct Vertex khi trong một mảng.
* 4: Để có được bộ nhớ các biến tương ứng với một màu đỉnh, bạn sử dụng MemoryLayout một lần nữa ngoại trừ lần này bạn xác định rằng bạn muốn stride của một GLfloat nhân ba. Điều này tương ứng với các biến x, y và z trong struct Vertex.
* 5: Cuối cùng, bạn cần chuyển đổi offset thành kiểu được yêu cầu: UnsafeRawPointer.
### Tạo bộ đệm VAO
Đơn giản với 2 dòng code:
<br/>![](https://images.viblo.asia/078b28be-a54d-4d04-b5f4-ea7be3909612.png)<br/>
Dòng đầu tiên yêu cầu OpenGL tạo một VAO. Phương thức này cần hai tham số: Đầu tiên là số lượng VAO để tạo - trong trường hợp này là 1 - trong khi thứ hai mong đợi một con trỏ tới một GLuint trong đó nó sẽ lưu trữ ID của đối tượng được tạo ra.<br/>
Trong dòng thứ hai, bạn đang nói OpenGL để ràng buộc VAO mà bạn tạo ra và được lưu trữ trong biến `vao` và bất kỳ lời gọi sắp tới để cấu hình con trỏ thuộc tính đỉnh nên được lưu trữ trong VAO này. OpenGL sẽ sử dụng VAO cho đến khi bạn hủy liên kết hoặc liên kết một cái khác trước khi thực hiện lệnh gọi vẽ.

### Tạo bộ đệm VBO
Chúng ta tiếp tục với đoạn code sau:
<br/>![](https://images.viblo.asia/0719bc7e-f547-42e3-933f-1bd37948fb7f.png)<br/>
Giống như với VAO, đầu tiên tạo một VBO và lưu trữ mã định danh của nó trong biến `vbo`.
Sau khi đã tạo VBO, bây giờ bạn đã liên kết với nó bằng cách gọi glBindBuffer. `GL_ARRAY_BUFFER` được sử dụng để xác định rằng bạn đang ràng buộc một bộ đệm các đỉnh.<br/>
Cuộc gọi đến glBufferData là nơi bạn đang chuyển tất cả thông tin đỉnh của mình sang OpenGL. Có bốn tham số mà phương thức này mong đợi:
1. Cho biết bộ đệm đang truyền dữ liệu.
2. Chỉ định kích thước, tính bằng byte, của dữ liệu. Trong trường hợp này, sử dụng phương thức helper `size()` trên Array mà bạn đã viết trước đó.
3. Dữ liệu thực tế sử dụng.
4. Cho OpenGL biết cách bạn muốn GPU quản lý dữ liệu. Trong trường hợp này, bạn sử dụng `GL_STATIC_DRAW` vì dữ liệu bạn đang chuyển đến card đồ họa sẽ hiếm khi thay đổi. Điều này cho phép OpenGL tối ưu hóa cho kịch bản hiện tại.
<br/>
Bây giờ bạn đã chuyển dữ liệu màu sắc và vị trí cho tất cả các đỉnh của bạn tới GPU. Nhưng bạn vẫn cần cho OpenGL biết cách diễn giải dữ liệu đó khi bạn yêu cầu nó vẽ tất cả trên màn hình. Để làm điều đó, hãy thêm mã này vào cuối `setupGL()`:
<br/>![](https://images.viblo.asia/c232f000-2791-450a-8304-b666839c9963.png)<br/>
Gọi `glEnableVertexAttribArray` gọi bật thuộc tính là vị trí. `glVertexAttribPointer` cần 6 biến truyền vào. Đây là ý nghĩa:
1. Tên của thuộc tính
2. Bao nhiêu giá trị thể hiện cho mỗi đỉnh
3. Kiểu của mỗi giá trị
4. Có cần chuẩn hoá dữ liệu không? Mặc định là false
5. size của stride
6. Offset của dữ liệu về vị trí
Tạo VBO đã xong, chúng ta sang phần tiếp tạo bộ đệm EBO
### Tạo bộ đệm EBO
Add đoạn code còn lại để tạo:
<br/>![](https://images.viblo.asia/533bb2e2-6c86-4be7-9522-3139c560f280.png)<br/>
Bây giờ thì bạn đã khá quen thuộc với đoạn code này, vẫn là khởi tạo, tạo bộ đệm, liên kết dữ liêụ... Ba dòng code cuối cùng đã là huỷ liên kết dữ liệu, bởi lúc này mọi thứ đã được cài đặt xong. Sau 1 quá trình bây giờ bạn có thể build lại project của mình, tôi hy vọng là nó compile thành công :D
### Bây giờ là quá trình dọn dẹp
Bạn viết hàm dọn dẹp và đặt trong `deinit` của ViewController:
<br/>![](https://images.viblo.asia/b864ca70-aa6b-4395-82c5-9cb1e59be9c3.png)<br/>
Đoạn code trên đơn giản là dọn dẹp huỷ những thành phần data không dùng nữa khi `ViewController` bị huỷ
### Giới thiệu 1 chút về hiệu ứng: GLKBaseEffect
Đầu tiên cần giới thiệu qua về Shaders. OpenGL hiện đại sử dụng những gì được gọi là pipeline programing giúp các nhà phát triển có toàn quyền kiểm soát cách mỗi pixel được hiển thị. Điều này mang lại cho bạn sự linh hoạt tuyệt vời và cho phép một số cảnh và hiệu ứng tuyệt đẹp được hiển thị. Tuy nhiên có nhiều công việc cho developer cần phải làm. Shaders được viết bằng GLSL (OpenGL Shading Language) và cần được biên dịch trước khi chúng có thể được sử dụng.
`GLKBaseEffect` chính là cách GLKit giải cứu các bạn khỏi phải viết Shaders, bạn có thể tạo ra hiệu ứng khá dễ dàng chỉ bằng 1 vài dòng code:<br/>
Đầu tiên chúng ta cần hởi tạo 1 hiệu ứng, và sau đó là trình bày cách vẽ:
<br/>![](https://images.viblo.asia/3d1e9c18-65a2-4e07-8fb9-1a60e69158f5.png)<br/>

### Thiết lập phần hình học
Một ma trận chiếu là cách bạn cho GPU biết cách render hình học 3D trên mặt phẳng 2D. Hãy suy nghĩ về nó như vẽ một loạt các dòng ra từ mắt của bạn thông qua mỗi điểm ảnh trong màn hình của bạn. Điểm ảnh được vẽ vào màn hình được xác định bởi bất kỳ đối tượng 3D phía trước.<br/>
GLKit có một số chức năng tiện dụng để thiết lập ma trận chiếu. Ví dụ có thể chỉ định trường xem dọc theo trục y, tỷ lệ cỡ ảnh và mặt phẳng gần và xa.
Add đoạn code sau vào hàm `glkViewControllerUpdate(_:):`
<br/>![](https://images.viblo.asia/ac8978fb-2b6b-487c-b426-9a83ef956712.png)<br/>
Đoạn code trên thực hiện:
1. tính aspect ratio của GLKView
2. Sử dụng một hàm trợ giúp được xây dựng sẵn trong thư viện toán GLKit để tạo ra một ma trận phối cảnh; tất cả những gì bạn phải làm là chuyển các tham số được thảo luận ở trên.
3. Đặt ma trận chiếu trên thuộc tính biến đổi của hiệu ứng.
Chúng ta cần thiết lập thêm một thuộc tính về hiệu ứng: `modelViewMatrix`. Đây là biến đổi được áp dụng cho bất kỳ hình học nào mà hiệu ứng hiển thị.
<br/>![](https://images.viblo.asia/d67bf949-e05b-4035-978c-e3d36b433daa.png)<br/>
Đừng quên add thêm biến toàn cục `rotation`
<br/><br/>
Build và chạy app lần cuối bạn sẽ nhận được kết quả:
<br/>![](https://images.viblo.asia/2c487e00-52f4-4e36-9a41-db467e46b0ea.png)<br/>
Thật tuyệt với phải không nào. Thế là chúng ta đã hoàn thành 1 app cơ bản nhất sử dụng GLKit để vẽ 1 hình vuông xoay bằng OpenGL. Hãy cùng đón chờ các bài viết khác thú vị hơn nhé ^^<br/>
Nguồn tham khảo: Raywenderlich: https://www.raywenderlich.com/192063/glkit-tutorial-for-ios-getting-started-with-opengl-es