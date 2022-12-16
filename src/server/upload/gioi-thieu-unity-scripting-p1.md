Trong tutorial này, bạn sẽ học được cách sử dụng căn bản scripting trong Unity để tạo một game bắn súng trong đấu trường bằng cách sử dụng các vật thể cơ bản trong Unity
ảnh demo:
![](https://images.viblo.asia/dcb02cd7-1e6a-455e-8614-80ec20a7d4c9.gif)

Phần lớn sức mạnh của Unity nằm ở scripting language phong phú **C#**. Bạn có thể sử dụng nó để xử lý input của user, thao tác với các object trong scene, detect collisions, spawn các GameObject mới và truyền các tia định hướng xung quanh cảnh để giúp xử lý logic trò chơi của bạn. Nghe có vẻ đáng sợ, nhưng Unity trưng ra các API được ghi chép tốt giúp các tác vụ này trở nên dễ dàng - ngay cả đối với các nhà phát triển mới làm quen!

Trong hướng dẫn này, bạn sẽ tạo ra một game bắn súng từ trên xuống sử dụng Unity scripting để xử lý việc sinh ra kẻ thù, điều khiển người chơi, bắn đạn và các khía cạnh quan trọng khác của trò chơi.

**Lưu ý**: Hướng dẫn này giả định rằng bạn đã có một số kinh nghiệm với C # hoặc các ngôn ngữ lập trình tương tự và hiểu biết về giao diện và quy trình làm việc của Unity. Nếu bạn cần làm mới, hãy xem hướng dẫn chi tiết về [Hướng dẫn về Unity](http://www.raywenderlich.com/110263/unity-tutorial-getting-started-part-1).

Hướng dẫn này được viết cho Unity 5.3 trở lên. Bạn có thể tải xuống phiên bản mới nhất của Unity tại [đây](http://unity3d.com/get-unity/download).
Mặc dù Unity cũng hỗ trợ UnityScript và Boo, C# là ngôn ngữ lập trình mà hầu hết các nhà phát triển có xu hướng sử dụng và với lý do chính đáng. C # được sử dụng bởi hàng triệu nhà phát triển trên toàn cầu để phát triển ứng dụng, web và trò chơi và có rất nhiều thông tin và hướng dẫn để giúp bạn giải quyết.

## Getting Started
Tải xuống dự án [BlockBuster](https://koenig-media.raywenderlich.com/uploads/2016/03/BlockBuster.zip), giải nén nó và mở folder đã tạo trong Unity.

![](https://images.viblo.asia/19e36daa-c43e-41e2-980d-206f650a4ddf.png)

Hãy nhìn xung quanh trong **Scene View**. Có một đấu trường nhỏ sẽ là chiến trường cho trò chơi, camera và ánh sáng. Nếu bố cục của bạn khác với trong ảnh, hãy chọn menu và drop down trên cùng bên phải và thay đổi thành **2 by 3**.

![](https://images.viblo.asia/a9217384-b79d-41e3-b65b-c71fab980763.png)

Những gì một trò chơi mà không có một anh hùng? Nhiệm vụ đầu tiên của bạn là tạo GameObject để đại diện cho player trong scene.

## Creating the Player
Trong Hierarchy, nhấp vào nút **Create** và chọn **Sphere** từ phần **3D**. Đặt Sphere tại **(X: 0, Y: 0,5, Z: 0)** và đặt tên là **Player**:

![](https://images.viblo.asia/32e2bb64-ec65-4e05-896b-e80929b2a000.gif)

Unity sử dụng một hệ thống **entity-component** để xây dựng GameObjects. Điều này có nghĩa là tất cả các GameObject là các thùng chứa cho các component có thể được đính kèm để cung cấp cho nó hành vi và thuộc tính của nó. Dưới đây là một vài ví dụ về các thành phần mà Unity đã tích hợp sẵn:

**Tranform**: Mỗi GameObject đều có component này. Nó giữ position, rotation và scale của GameObject.

**Box Collider**: Máy va chạm có hình khối có thể được sử dụng để detect collisions.

**Mesh Filter**: mesh data được sử dụng để hiển thị mô hình 3D.

![](https://images.viblo.asia/b8f37096-fecb-4647-bd1d-f60f743ab0f9.png)

**Player** GameObject sẽ cần phản ứng với các va chạm với các vật thể khác trong scene.

Để thực hiện điều này, chọn **Player** trong cửa sổ Hierarchy và nhấp vào nút **Add Component** trong Inspector window. Select **Physics > Rigidbody** trong menu bật lên, điều này sẽ thêm một Rigidbody component vào Player Object.

Điều chỉnh các giá trị Rigidody như thế này: **Drag** thành **1**, **Angular Drag** thành **0** và chọn **Y** checkbox trong **Freeze Position**.

![](https://images.viblo.asia/40020c2f-5f83-4f59-9750-b45bd04a6752.png)

Điều này sẽ đảm bảo **Player** không thể di chuyển lên - xuống và không có thêm giảm xóc khi xoay.

## Creating the Player Movement Script

Bây giờ Player đã sẵn sàng, đã đến lúc để tạo script sẽ lấy đầu vào từ bàn phím và di chuyển Player đi xung quanh.

Trong Project window, nhấp vào nút **Create** và chọn **Folder**. Đặt tên cho folder mới là **Scripts** và tạo subfolder trong đó có tên **Player**.
Trong thư folder **Player**, nhấp vào nút **Create** button và chọn **C# Script**. Đặt tên cho script mới là **PlayerMovement**. 
Trình tự trông như thế này:

![](https://images.viblo.asia/75698170-516e-4809-8fcd-b101cac31f33.gif)

**Note**: Sử dụng các folder như thế này giúp dễ dàng sắp xếp mọi thứ theo vai trò của chúng và giảm sự lộn xộn. Bạn sẽ tạo ra một số script cho Player để sử dụng sao cho có ý nghĩa khi cung cấp cho nó thư mục riêng.

Bấm đúp vào file **PlayerMovement.cs**, điều này sẽ mở trình soạn thảo code của bạn. Unity đi kèm với MonoDevelop được cài đặt sẵn trên tất cả các máy và người dùng Windows thì có thể chọn cài đặt Visual Studio và sử dụng thay thế khi họ chạy trình cài đặt.
Hướng dẫn này sử dụng MonoDevelop nhưng người dùng Visual Studio sẽ có thể làm theo mà không gặp vấn đề gì.

![](https://images.viblo.asia/66b438e4-0b57-4a41-9c01-0da435736de7.png)

Đây là lớp mặc định Unity tạo cho các script mới. Nó có kế thừa từ lớp MonoBehaviour, đảm bảo script này sẽ chạy trong vòng lặp trò chơi và có chức năng bổ sung để phản ứng với các sự kiện nhất định. Nếu bạn đến từ thế giới iOS, đối tượng này tương đương với UIViewController. Unity gọi một số phương thức theo thứ tự được xác định trước khi script đang chạy. Dưới đây là một vài trong số những method phổ biến nhất:

**Start**(): Phương thức này sẽ được gọi một lần ngay trước khi script được gọi trong hàm Update đầu tiên.
**Update**(): Trong khi trò chơi đang chạy và script được bật, phương thức này sẽ được kích hoạt mỗi frame.
**OnDestroy** (): Phương thức này được gọi ngay trước khi GameObject đoạn script này được đính kèm để bị hủy.
**OnCollisionEnter** (): Khi có script collider hoặc rigidbody được gắn vào để chạm vào collider hoặc rigidbody khác, phương thức này sẽ được gọi.
Để biết danh sách đầy đủ các sự kiện, hãy xem [tài liệu của Unity, trên MonoBehaviours](http://docs.unity3d.com/ScriptReference/MonoBehaviour.html).

Thêm hai dòng này phía trên phương thức **Start** ():
```
public float acceleration;
public float maxSpeed;
```

Nó tương tự như thế này:

![](https://images.viblo.asia/873c8a7f-79b7-407b-a732-70a50aae9324.png)

Đây là các khai báo biến public, có nghĩa là các biến này sẽ hiển thị trong Inspector và có thể được điều chỉnh mà không cần phải qua lại giữa script và editor.
khả năng tăng tốc, mô tả tốc độ của trò chơi tăng theo thời gian, maxSpeed là để giới hạn tốc độ của Player.

Ngay bên dưới, khai báo các biến sau:
```
private Rigidbody rigidBody;
private KeyCode[] inputKeys;
private Vector3[] directionsForKeys;

```

Các biến Private không thể được đặt thông qua Inspector, nó có trách nhiệm với các nhà phát triển. Để khởi tạo chúng vào thời điểm thích hợp.
**rigidBody** sẽ giữ một tham chiếu đến thành phần **Rigidbody** mà gắn liền với GameObject của Player.
**inputKeys** là một loạt các mã khóa sẽ được sử dụng để phát hiện input.
**directionForKeys** giữ một mảng các biến **Vector3**, sẽ chứa dữ liệu định hướng.

Thay thế phương thức **Start** () bằng cách sau:
```
void Start () {
  inputKeys = new KeyCode[] { KeyCode.W, KeyCode.A, KeyCode.S, KeyCode.D };
  directionsForKeys = new Vector3[] { Vector3.forward, Vector3.left, Vector3.back, Vector3.right };
  rigidBody = GetComponent<Rigidbody>();
}
```

Đoạn code này liên kết các hướng tương ứng cho từng khóa, ví dụ: nhấn W để di chuyển đối tượng về phía trước. Dòng cuối cùng có được một tham chiếu đến thành phần **Rigidbody** để sử dụng sau.

Để thực sự di chuyển Trình phát, bạn sẽ phải xử lý đầu vào từ bàn phím.

Đổi tên **Update** () thành **FixedUpdate** () và thêm mã sau đây:
```
// 1
void FixedUpdate () {
  for (int i = 0; i < inputKeys.Length; i++){
    var key = inputKeys[i];

    // 2
    if(Input.GetKey(key)) {
      // 3
      Vector3 movement = directionsForKeys[i] * acceleration * Time.deltaTime;
    }
  }
}
```

Có một vài điều quan trọng đang diễn ra ở đây:

1.**FixedUpdate** () là tốc độ khung hình độc lập và nên được sử dụng khi làm việc với Rigidbody. Thay vì chạy nhanh nhất có thể, phương pháp này sẽ được bắn ở một khoảng thời gian không đổi.

2. Vòng lặp này kiểm tra xem có phím nào được nhấn không.

3. Nhận hướng cho phím được nhấn, nhân nó với gia tốc và số giây cần để hoàn thành khung cuối cùng. Điều này tạo ra một vectơ chỉ phương (tốc độ trên các trục X, Y và Z) mà bạn sẽ sử dụng để di chuyển đối tượng Người chơi.

Nếu bạn chưa quen với lập trình game, bạn có thể tự hỏi tại sao bạn phải nhân với **Time.deltaTime**. Mặc dù trò chơi đang chạy tốc độ khung hình (hoặc khung hình mỗi giây) sẽ khác nhau tùy thuộc vào phần cứng và mức độ xử lí, điều này có thể khiến mọi thứ xảy ra quá nhanh trên các máy mạnh mẽ và quá chậm trên các máy yếu hơn có thể gây ra hành vi không mong muốn. Nguyên tắc chung là khi bạn thực hiện một hành động mỗi khung (cố định), bạn cần nhân với **Time.deltaTime**.

Thêm phương thức sau bên dưới **FixedUpdate** ():
```
void movePlayer(Vector3 movement) {
  if(rigidBody.velocity.magnitude * acceleration > maxSpeed) {
    rigidBody.AddForce(movement * -1);
  } else {
    rigidBody.AddForce(movement);
  }
}
```

Phương pháp trên áp dụng lực cho ridigbody khiến nó di chuyển. Nếu tốc độ hiện tại vượt quá **maxSpeed**, lực sẽ đi theo hướng ngược lại để làm chậm player và hạn chế hiệu quả tốc độ tối đa.

Trong **FixedUpdate** (), trước dấu ngoặc kép của câu lệnh if, hãy thêm dòng sau :
```
movePlayer(movement);
```

![](https://images.viblo.asia/2e001f23-7765-420e-9952-1092f0eae7e9.png)

Perfect! Save script này và quay lại Unity editor. Trong cửa sổ Project, kéo tập lệnh **PlayerMovement** vào **Player** bên trong Hierarchy.
Việc thêm script vào GameObject sẽ tạo ra một instance của component, có nghĩa là tất cả code sẽ được thực thi cho GameObject mà bạn đã đính kèm.
Sử dụng **Inspector** để đặt **Acceleration** thành **625** và **Max Speed** thành **4375**:

![](https://images.viblo.asia/06e7488e-4fc0-4f99-81cb-68aac0942114.gif)

Run scene và di chuyển Player xung quanh bằng các phím WASD:

![](https://images.viblo.asia/f67bb300-98a0-43f9-b9ad-4d24d1c17510.gif)

Đó là một kết quả khá tốt cho chỉ một vài dòng code! :]

Tuy nhiên, có một vấn đề rõ ràng - người chơi có thể nhanh chóng rời khỏi camera, điều này gây khó khăn một chút để chống lại kẻ xấu.

Ở phần tiếp theo mình sẽ hướng dẫn các bạn chỉnh camera đi theo Player