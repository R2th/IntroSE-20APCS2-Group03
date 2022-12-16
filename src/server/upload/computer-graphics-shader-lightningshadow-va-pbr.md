# Intro

Hello mọi người. Chủ đề lần này mình muốn giới thiệu là về ánh sáng và PBR. Đây là một chủ đề không mới và đối với game dev thì các Engine đình đám hiện nay (Unity, Unreal Engine hay kể cả Godot) đều đã có rất nhiều hỗ trợ, hầu hết mọi người chỉ cần import resource vào và chạy. Hết!! Tuy nhiên với phương châm thích hardcore và cũng để hiểu sâu hơn cách mà GPU xử lý đồ hoạ của máy tính, mình quyết định góp nhặt mọi thứ Google cung cấp về chủ đề này và tổng hợp lại, để cả bạn và mình có thể tự mình cài đặt lại cách tô màu siêu thực này.

Thật ra bài này cũng không đi quá sâu vào cài đặt, tuy nhiên phải có demo xịn xò thì bài mới thuyết phục nên thời gian chuẩn bị khá là lâu. Nhìn tấm ảnh so sánh này thì chắc bạn cũng biết sức mạnh khi nắm trong tay các nguyên lý cơ bản và hiểu cách CG hoạt động.
![Comparison between With/Without CG](https://images.viblo.asia/e825e553-c762-4b92-8075-a6a500d767e6.png)

Và đây là kết quả demo bằng Cocos ***2d*** x-JS.   ~~Nhấn mạnh và in đậm~~ Có nguồn sáng di chuyển trong không gian và được render realtime.

{@embed: https://www.youtube.com/watch?v=CXNOla1Dsuc}
# Computer Graphic
Computer Graphic hay quen thuộc hơn là CG (trong các phim bom tấn các bạn thường nghe đến khái niệm CGI đấy, cũng là nó) chính là một lĩnh vực mà theo Wikipedia là "một nhánh của khoa học máy tính liên quan đến việc tạo ra hình ảnh với sự trợ giúp của máy tính". Hay nôm na là cách vẽ một vật thể, một hình ảnh bất kỳ lên màn hình máy tính. 

Do máy tính chỉ xử lý được thông tin được lưu trữ dưới dạng số là chính, CG chính là chìa khoá giải mã để chuyển chúng thành đủ các hình dạng từ 2D đến 3D, từ hoạt hình nhắng nhít đến chân thực. Đối với dev game, đồ hoạ, giao diện đối với người dùng quyết định phần lớn mức độ thành công của game đó không thua kém gameplay. Nhìn vào 2 screenshot game dưới đây, ở năm 2020, chắc chúng ta cũng biết đa phần người chơi sẽ chọn game nào. (Mình chọn Wolfeinstein vì hoài cổ và máy yếu :disappointed_relieved: - ví dụ tệ vãi, but you got the idea).

![Wolfenstein](https://images.viblo.asia/511a886e-8413-4d53-bc1a-ba6e359b8152.png)
*Wolfenstein - tựa game bắn súng góc nhìn thứ nhất huyền thoại, tuy nhiên đồ hoạ này gần như không còn chỗ đứng trong năm 2020 nữa*

![Call Of Duty - Warzone](https://images.viblo.asia/c8f4e15e-934e-4bbb-8e1a-f9e2d654e28c.png)
*Call Of Duty*

Phải nói là sự thành công của game không chỉ phụ thuộc vào đồ hoạ, có rất nhiều các game hot và trendy gần đây (Among Us, Jump King...) không cần một đồ hoạ quá siêu thực để thu hút người chơi. Nhưng đối với một số thể loại game (nhất là game bắn súng), việc sử dụng tối đa khả năng của phần cứng để tạo ra một cảnh game vừa chân thực lại vừa không làm mất quá nhiều hiệu năng lại là một yếu tố đặc biệt quan trọng. Và nhất là trong khi card đồ hoạ mỗi năm lại ra một phiên bản mạnh mẽ hơn nhiều lần, chắc chắn NVIDIA sẽ rất vui khi chúng ta tạo ra được những con game có đồ hoạ thật hơn (và nặng hơn) cho người dùng :)) 

# Shader
## Giới thiệu shader
Lan man chưa dài lắm nhưng có lẽ cũng đủ rồi, giờ đối với một dev game và không phải artist, có cách nào để tăng chất lượng hiển thị của một đối tượng trong game hay không? Câu trả lời là Có nhé, giải phải đó chính là Shader, là một chương trình để bạn can thiệp vào quá trình máy tính xử lý thông tin của hình ảnh/vật thể trước khi nó được vẽ lên màn hình.

Ví dụ để dễ hiểu hơn nhé. Bạn có một vật thể 3D là cây súng ở hình minh hoạ đầu bài. Một vật thể 3D đơn thuần là tập hợp các đỉnh được nối lại với nhau và được "úp"/phủ một lớp màu sắc lên. Bạn sẽ ném cho máy tính tập hợp các điểm đấy, bao gồm vị trí của chúng trong không gian và toạ độ để phủ lớp màu sắc kia lên nó (nghĩa là điểm A trong không gian sẽ được tô màu bằng pixel nào của lớp phủ). Hầu hết mọi engine kể cả cổ xưa nhất đều hỗ trợ cái này, chỉ việc nhập một file dữ liệu chưa tập hợp điểm đó và file phủ (hay còn gọi là texture), bạn sẽ có hình ảnh cây súng trong không gian.
![](https://images.viblo.asia/3ccc1c6b-31fd-4766-a427-3858083b6ed3.png)

Shader là một đoạn chương trình bao gồm các chỉ thị cho card đồ hoạ thực hiện thêm các phép tính vào giữa quá trình đấy. Ngắn gọn là bạn có thể thêm mắm dặm muối vào quá trình card đồ hoạ vẽ các dữ liệu về đỉnh của đa giác để kết quả cuối cùng giống với tưởng tượng. Thay vì phủ texture lên các đỉnh một cách đơn thuần, khi dùng shader bạn có thể thêm vào đó các tính toán dựa vào vị trí nguồn sáng, vị trí mắt người chơi/camera, chất liệu vật thể, v.v.

## GLSL
Cả DirectX và OpenGL đều có hỗ trợ shader. Việc so sánh giữa 2 renderer không nằm trong phạm vi bài viết, và bởi vì cocos2dx hỗ trợ OpenGL nên chúng ta sẽ tìm hiểu sâu hơn về nó ở đây. Shader của OpenGL được viết bằng một ngôn ngữ có cú pháp khá giống C, được gọi là OpenGL Shader Language (GLSL). Nó sẽ có một chút khác biệt giữa các phiên bản và giữa OpenGL với OpenGL-ES do GL-ES chủ yếu dành cho các thiết bị di động. 

Cấu trúc shader viết theo GLSL cũng tương tự một chương trình C, nó cũng có hàm `main()`, một số tham số đầu vào, một số là tham số đầu ra. Chúng ta sẽ tìm hiểu kĩ hơn về chúng ở mục tiếp theo. Hình dưới đây là cấu trúc của một shader đơn giản. 

![](https://images.viblo.asia/1bb3de96-5081-4754-8e65-fadf10cc2551.png)

## Vertex Shader & Fragment/Pixel Shader
Quá trình xử lý (hay còn gọi là pipeline) của một renderer - cụ thể là OpenGL - trải qua khá nhiều giai đoạn. Nhưng tựu chung có thể nhìn một cách khái quát như sau. 

![OpenGL](https://images.viblo.asia/25036811-be39-4a50-8c3a-1d4a15901436.png)
Đầu tiên tập hợp thông tin các đỉnh đa giác sẽ được đưa vào một buffer. Buffer này sẽ được tiền xử lý, gán nhãn (đỉnh này có màu gì, nằm ở đâu, mặt phẳng có vector pháp tuyến gì, v.v.). 

Sau đó, nó được truyền cho **Vertex Shader** để thực hiện Rasterize. Nôm na là chuyển toạ độ trong không gian ba chiều của thế giới game thành không gian hai chiều trên màn hình của bạn. Tại sao ư? Vì thông tin được lưu trữ trong file model 3D là toạ độ các đỉnh trong không gian *so với vật thể đó*. Khi bạn đưa vật thể vào trong một không gian khác, các đỉnh này cần phải trải qua một số phép biến hình (tịnh tiến hoặc xoay) để có được toạ độ thật của chúng. 

Chưa hết, khi chiếu lên màn hình hai chiều, camera lại thực hiện một phép chiếu và chúng ta phải thực hiện thêm một phép biến hình nữa. Nghe có vẻ phức tạp, tuy nhiên, chúng ta cần truyền cho nó một ma trận để thực hiện phép biến hình (transform) và đem nhân nó với toạ độ đỉnh là xong. Ma trận này thường được gọi là **MVP Matrix** (Model-View-Projection).
![OpenGL Pipeline](https://images.viblo.asia/2f014bfe-224a-4a88-9ad9-d6264b4e7f8e.png)

Đến đây chúng ta đã chuyển các đỉnh về toạ độ hai chiều, bước tiếp theo khó khăn hơn và cũng chiếm nhiều tài nguyên GPU hơn chính là tô màu cho nó. Bước này sẽ do **Pixel Shader** hay **Fragment Shader** thực hiện. Dựa vào thông tin của đỉnh và texture được đính kèm, chúng ta có thể thực hiện một phép chiếu/tra cứu/mapping để quyết định xem pixel hiện tại tô màu gì. Nếu muốn tìm hiểu kỹ hơn các bạn có thể tìm thấy rất nhiều hướng dẫn về cú pháp cũng như API của GLSL. 

### Tại sao cần phải học cách sử dụng Shader?
Vừa rối rắm khó hiểu, vừa có cả toán học với ma trận, vector các thứ, tại sao chúng ta phải học về shader trong khi các engine hiện nay đã quá tân tiến và xịn xò? Lần đầu học về ngôn ngữ này mình từng đặt câu hỏi như vậy. Và đến nay mình cũng chưa có câu trả lời thật sự thuyết phục đâu. Nhưng mình có thể liệt kê ra một số lý do sau đây:
* Shader là lớp chỉ thị gần với phần cứng nhất (chỉ cao hơn driver) mà dev có thể dễ hiểu và học được
* Shader tận dụng phần cứng rất tốt, do đó với cùng thao tác vẽ, sử dụng shader (một cách hợp lý) sẽ cho performance cao hơn rất nhiều so với việc gọi hàm của engine.
* Một số engine (như cocos2dx) không hỗ trợ 3d quá tốt. Sử dụng shader giúp bạn có thể tự custom một phiên bản có chất lượng cao hơn mà không cần lo đến việc đổi engine (gần như bất khả thi khi project đã lớn)

Và cuối cùng, khi sử dụng shader, chúng ta có thể tự mình cài đặt và tinh chỉnh ánh sáng/bóng tối được vẽ lên theo ý mình.
# Lighting & Shadow
Các vật thể xung quanh chúng ta có muôn hình vạn trạng, đủ loại màu sắc. Trong thực tế, chúng ta đã quá quen với việc có ánh sáng thì vật sẽ nổi bật màu hơn, hay vật kim loại sẽ phản chiếu ánh sáng tốt hơn vật bằng nhựa. Do đó, để hình ảnh trong game trở nên thật hơn, "đáng tin" hơn, chúng cũng cần các đặc tính giống vậy: chính là ánh sáng và bóng tối.

![](https://images.viblo.asia/c8ec0965-dd0b-4c4c-9da7-2f44655b9fec.jpg)
*Hình ảnh chỉ có 2 màu trắng đen nhưng chúng ta vẫn cảm nhận được vị trí, góc cạnh và hình khối khuôn mặt của cô gái*

Game 2D có thể hai yếu tố được giải quyết thông qua hoạ sĩ vẽ nhân vật do góc camera thường ít khi di chuyển. Tuy nhiên, trong game 3D, nơi nhân vật và cảnh có thể có rất nhiều vị trí và góc độ quan sát khác nhau, việc đổ bóng và tạo khối cho các đối tượng đấy cần phải được xử lý bằng các dòng code. 

Ngoài ra, giữa việc tô màu một vật dựa vào ánh sáng xung quanh (và tính cả việc nó phản chiếu môi trường - ví dụ một tấm kính) và việc đổ bóng của nó lên môi trường, trớ trêu thay việc đổ bóng lại là thứ nặng nề và khó thực hiện hơn. Bản thân mình cũng chưa thật sự tìm hiểu kĩ về phương pháp đổ bóng giữa môi trường nhiều nguồn sáng, do đó xin phép không đề cập đến trong bài viết này. Chúng ta hãy tìm hiểu đến phương pháp tô màu - thứ dễ hơn :D

# PBR
Và đây là món chính của chúng ta trong bài này. PBR là viết tắt của Physically Based Rendering. Và như cái tên của nó gợi ý, PBR là phương pháp tô màu một vật thể dựa trên đặc tính vật lý của nó, tuân thủ các nguyên tắc vật lý về đặc tính của ánh sáng cũng như bảo toàn năng lượng (ghê chưa). Bởi vì sử dụng khá nhiều lý thuyết vật lý như vậy, nên hình ảnh, màu sắc tạo bởi PBR rất chân thật so với phương pháp truyền thống (điển hình là Blinn-Phong).

![Comparison](https://images.viblo.asia/ab29e341-98c3-4328-92bb-0dd4b3cc237c.jpg)
*Hãy để ý đến các vết xước, phần phản chiếu của các mảng kim loại, nhựa trên thân khẩu súng. Source: marmoset.co*

PBR được giới thiệu cách đây khá lâu, khoảng những năm 2010 bởi các ông lớn như Disney, Epic Game. Hướng đến việc tạo ra một mô hình ánh sáng chân thực nhất. 

Khác với các tham số khá mơ hồ và trừu tượng của mô hình cũ như:
* Specular Reflection (tạm dịch: độ phản chiếu - bóng)
* Diffuse Reflection (Độ phản chiếu khuếch tán)
* Ambient Reflection (độ phản chiếu ánh sáng môi trường)
* Shininess (độ bóng). 

PBR sử dụng các tham số chính thực tế hơn rất nhiều: 
* Metalness (tính kim loại)
* Roughness (độ nhám bề mặt). 

Từ đó việc sử dụng cho cả hoạ sĩ và dev trở nên dễ dàng hơn (nhưng cài đặt thì không dễ tí nào với cả đống lý thuyết vật lý kia đâu :laughing:). PBR thường được sử dụng cùng với IBL (Image Based Lighting) để tạo ra một môi trường ánh sáng giả lập gần thực tế nhất.

![PBR Result](https://images.viblo.asia/6f17a7c5-014f-4d9d-bf83-d9f11ae32bad.png)

*Các quả cầu với độ nhám tăng dần (trái sang phải) và tính kim loại giảm dần (trên xuống dưới). Source: learnopengl.com*

Để nói về lý thuyết phía sau và luồng xử lý để tạo ra một engine đổ bóng PBR có lẽ phải mất rất nhiều chữ và công thức nữa, và bản thân mình cũng không đảm bảo khả năng diễn đạt tốt bằng các paper của các nghiên cứu nổi tiếng (sẽ dẫn link).

Bài sau mình sẽ chia sẻ source code và từng bước cài đặt (kèm với giải thích lý thuyết của các paper dưới đây trong khả năng của mình) để các bạn có thể chạy một demo bằng Cocos2dx-JS gần giống với cái ở đầu bài. Hy vọng cảm giác tự tay làm ra một sản phẩm đổ bóng siêu thực như này sẽ khiến một vài bạn cảm thấy thích thú.

* [Moving Frostbite to PBR](https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf) - Lý thuyết cặn kẽ gần như mọi vấn đề của PBR, phân tích và so sánh các thuật toán, mô hình xấp xỉ trong thực tế
* [Real Shading in Unreal Engine 4](https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf) - Ngắn gọn và súc tích hơn, nhưng thiếu chi tiết về cách giải quyết nguồn sáng (area light source)
* [PBR Theory and Implement for OpenGL](https://learnopengl.com/PBR/Theory) - Có đầy đủ hướng dẫn và code mẫu, tuy nhiên không giải quyết nguồn sáng area light source