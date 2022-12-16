[link](https://viblo.asia/p/gioi-thieu-unity-scripting-p2-maGK7kXbKj2) phần trước ,Trong phần này mình sẽ hướng dẫn các bạn code phần bắn đạn. Đã đến lúc phải ra tay cho Player có thể chiến đấu :D.

## Working with Prefabs

Nhấp vào nút **Create** trong Hierarchy và chọn **3D Object / Capsule**. Đặt tên là **Projectile** và đặt cho nó các giá trị biến đổi sau:

1.**Position**: (0, 0, 0)

2.**Rotation**: (90, 0, 0)

3.**Scale**: (0.075, 0.246, 0.075)

![](https://images.viblo.asia/44f3851b-75dd-4935-9ff9-0cb8ed5a7b40.png)

Mỗi lần Player bắn, nó sẽ bắn một instance của *Projectile*. Để thực hiện điều này, bạn cần tạo Prefab. Prefabs thực chất là Game Object được lưu trữ lại để tái sử dụng. Các Game Object được nhân bản từ một prefab sẽ giống nhau hoàn toàn, ngoại trừ thành phần Transform để phân biệt và quản lý được tốt hơn. *Để tạo ra một prefab, ta đơn giản chỉ cần kéo một Game Object vào cửa sổ Project.*


Tạo một thư mục mới trong **Assets**, đặt tên là **Prefabs**. Bây giờ kéo Projectile object vào thư mục này. Thế là xong: bạn có Prefab!

![](https://images.viblo.asia/3826b86b-3a02-4400-aa0b-7bdcd542637a.gif)

Prefab của bạn sẽ cần một chút script. Tạo một file mới bên trong thư mục **Scripts** có tên **Projectile**:

```
public float speed;
public int damage;

Vector3 shootDirection;
```

Giống như bất kỳ đối tượng chuyển động nào cho đến nay trong hướng dẫn này, cái này cũng sẽ có các biến speed và damage, vì nó là một phần của logic object. Vectơ ShootDirection xác định hướng nó sẽ đi.

Đặt vector đó hoạt động bằng cách thực hiện các phương thức sau trong lớp:

```
// 1
void FixedUpdate () {
  this.transform.Translate(shootDirection * speed, Space.World);
}

// 2
public void FireProjectile(Ray shootRay) {
  this.shootDirection = shootRay.direction;
  this.transform.position = shootRay.origin;
}

// 3
void OnCollisionEnter (Collision col) {
  Enemy enemy = col.collider.gameObject.GetComponent<Enemy>();
  if(enemy) {
    enemy.TakeDamage(damage);
  }
  Destroy(this.gameObject);
}

```

Đây là những gì đang diễn ra trong đoạn code trên:

1. *Projectile* di chuyển khác với mọi thứ khác trong trò chơi này. Nó không có mục tiêu, hoặc một số lực tác động lên nó theo thời gian; thay vào đó, nó di chuyển theo hướng xác định trước cho toàn bộ vòng đời của nó.

2.Tại đây bạn đặt vị trí bắt đầu và hướng của Prefab. Đối số Ray này có vẻ khá bí ẩn, nhưng bạn sẽ sớm tìm hiểu cách tính toán.

3.Nếu một viên đạn va chạm với kẻ thù, nó sẽ gọi TakeDamage () và tự hủy.

Trong Hierarchy, đính kèm **Projectile** script vào **Projectile GameObject**. Set **Speed** thành **0,2** và **Damage** thành **1**, sau đó nhấp vào nút **Apply** nằm gần phía trên của vùng Inspector. Điều này sẽ thực hiện những thay đổi bạn vừa thực hiện cho tất cả các instance của prefab này.

![](https://images.viblo.asia/4caee0ab-dfae-4a8d-bc67-6b01559bceeb.png)

**Remove** object **Projectile** khỏi Hierachy - vì bây giờ bạn không cần nó nữa.

## Firing Projectiles## 

Bây giờ bạn có một prefab có thể di chuyển và gây sát thương, bạn đã sẵn sàng để bắt đầu bắn.

Trong **Player folder**, tạo một file mới có tên **PlayerShooting** và gắng nó vào **Player** trong scene. Trong lớp, khai báo các biến sau:

```
public Projectile projectilePrefab;
public LayerMask mask;

```

Biến đầu tiên sẽ chứa tham chiếu đến Prefab Projectile mà bạn đã tạo trước đó. Mỗi khi Người chơi của bạn bắn một viên đạn, bạn sẽ tạo một instance từ Prefab này. Biến *mask* được sử dụng để filter GameObjects.

Có những lúc trong trò chơi của bạn khi bạn cần biết tồn tại va chạm theo một hướng cụ thể hay không. Để làm điều này, Unity có thể truyền một tia vô hình từ một điểm nhất định sang một hướng bạn mà chỉ định. Bạn có thể sẽ gặp rất nhiều GameObject giao tia với nhau, vì vậy sử dụng mask cho phép bạn lọc bất kỳ object không mong muốn nào.

Raycast cực kỳ hữu ích và có thể được sử dụng cho nhiều mục đích khác nhau. Chúng thường được sử dụng để kiểm tra xem một người chơi khác có bị trúng đạn hay không, nhưng bạn cũng có thể sử dụng chúng để kiểm tra xem có hình học nào bên dưới con trỏ chuột không. Để tìm hiểu thêm về Raycasts, hãy xem video đào tạo trực tiếp Unity này trên trang [Unity](https://unity3d.com/learn/tutorials/topics/physics/raycasting).

Hình ảnh dưới đây cho thấy một tia đúc từ khối lập phương đến hình nón. trong quá trình đi thì nó đã đi xuyên qua bứa ảnh và hình cầu (vì nó nằm trên 1 layer khác với layer đc filter của tia ray nên nó sẽ bỏ qua), cuối cùng nó sẽ dừng ở hình nón, (ở đây giả sử hình nón là object có cùng layer trong tia ray).
![](https://images.viblo.asia/52738ba5-2e4b-40a6-b1f5-0aefbec31be5.png)

Thêm phương thức sau vào **PlayerShooting.cs**:

```
void shoot(RaycastHit hit){
  // 1
  var projectile = Instantiate(projectilePrefab).GetComponent<Projectile>();
  // 2
  var pointAboveFloor = hit.point + new Vector3(0, this.transform.position.y, 0);

  // 3
  var direction = pointAboveFloor - transform.position;

  // 4
  var shootRay = new Ray(this.transform.position, direction);
  Debug.DrawRay(shootRay.origin, shootRay.direction * 100.1f, Color.green, 2);

  // 5
  Physics.IgnoreCollision(GetComponent<Collider>(), projectile.GetComponent<Collider>());

  // 6
  projectile.FireProjectile(shootRay);
}

```

Đây là những gì đoạn mã trên làm:

1.Khởi tạo một projectile Prefab và lấy thành phần *Projectile* của nó.

2.Điểm này luôn trông giống như (x, 0,5, z). X và Z là tọa độ trên sàn nơi tia chiếu từ vị trí nhấp chuột chạm vào. Tính toán này rất quan trọng, vì đạn phải song song với sàn.

3.Tính hướng từ GameObject của Player đến pointAboveFloor.

4.Tạo ra một tia mới mô tả quỹ đạo projectile theo gốc và hướng của nó.

5.Dòng này cho biết động cơ vật lý của Unity bỏ qua các va chạm giữa Player collider và Projectile collider. Nếu không OnCollisionEnter() trong Projectile script sẽ được gọi trước khi nó có cơ hội bay đi. (do viên đạn va chạm với chính người chơi)

6.Cuối cùng, nó thiết lập quỹ đạo cho đạn.

Lưu ý: Sử dụng Debug.DrawRay () khi truyền tia là vô giá vì nó có thể giúp bạn hình dung được tia trông như thế nào và những gì nó chiếu vào.

Thêm các phương thức sau để cho phép người chơi thực sự bóp cò:

```
// 1
void raycastOnMouseClick () {
  RaycastHit hit;
  Ray rayToFloor = Camera.main.ScreenPointToRay(Input.mousePosition);
  Debug.DrawRay(rayToFloor.origin, rayToFloor.direction * 100.1f, Color.red, 2);

  if(Physics.Raycast(rayToFloor, out hit, 100.0f, mask, QueryTriggerInteraction.Collide)) {
    shoot(hit);
  }
}

// 2
void Update () {
  bool mouseButtonDown = Input.GetMouseButtonDown(0);
  if(mouseButtonDown) {
    raycastOnMouseClick();  
  }
}
```

Lần lượt giải thích từng comment được đánh số:

1.Phương pháp này chiếu một tia từ camera đến điểm mà chuột nhấp vào. Sau đó, nó kiểm tra xem liệu tia này giao với một đối tượng trò chơi với LayerMask đã cho.

2.Trên mỗi bản cập nhật, tập lệnh sẽ kiểm tra nhấn nút chuột trái. Nếu nó tìm thấy một, nó gọi *raycastOnMouseClick ()*.

Quay trở lại Unity và thiết lập các biến sau trong Inspector:

**Projectile Prefab**: tham chiếu Projectile từ thư mục prefab
**Mask**: Floor

![](https://images.viblo.asia/fc3b1e13-6e0b-42f2-ae90-20bf1d17e771.gif)

**Lưu ý**: Unity đi kèm với một số lượng hạn chế các layer được xác định trước mà bạn có thể tạo mask.
Bạn có thể tự tạo bằng cách nhấp vào menu thả xuống Lớp của GameObject và chọn Thêm Lớp:
![](https://images.viblo.asia/422b7038-ee7f-4596-816d-0ad0ff8fe8d1.png)

Để gán một lớp cho GameObject, hãy chọn nó từ dropdown Layer:

![](https://images.viblo.asia/fb887d54-69a5-4147-b69e-6f9d43dd3b18.png)

Để biết thêm thông tin về các layer, hãy xem tài liệu Layer của [Unity](https://docs.unity3d.com/Manual/Layers.html).

Run project và bắn theo ý muốn! Các viên đạn được bắn theo hướng mong muốn, nhưng có gì đó hơi sai sai, phải không?

![](https://images.viblo.asia/84c02bd9-a4ab-461b-94b7-5a87f784baa5.gif)

Sẽ tốt hơn nhiều nếu các viên đạn đang chỉ theo hướng di chuyển. Để khắc phục điều này, hãy mở tập lệnh **Projectile.cs** và thêm phương thức sau:

```
void rotateInShootDirection() {
  Vector3 newRotation = Vector3.RotateTowards(transform.forward, shootDirection, 0.01f, 0.0f);
  transform.rotation = Quaternion.LookRotation(newRotation);
}

```

**Lưu ý**: *RotateTowards* rất giống với *MoveTowards*, nhưng nó coi vectơ là chỉ đường thay vì vị trí. Ngoài ra, bạn không cần thay đổi xoay theo thời gian nên sử dụng một bước gần bằng 0 sẽ đủ. Các phép quay chuyển đổi trong Unity được thể hiện bằng cách sử dụng **quaternion**, nằm ngoài phạm vi của hướng dẫn này. Tất cả những gì bạn cần biết cho hướng dẫn này là chúng có lợi thế hơn các vectơ khi thực hiện các phép tính liên quan đến phép quay trong 3D.

Quan tâm đến việc tìm hiểu thêm về quaternion và tại sao chúng hữu ích? Kiểm tra bài viết tuyệt vời này: [How I learned to Stop Worrying and Love Quaternions](http://developerblog.myo.com/quaternions/)

Ở cuối *FireProjectile ()*, hãy thêm một cuộc gọi để *rotateInShootDirection()*. *FireProjectile ()* bây giờ trông giống như sau:

```
public void FireProjectile(Ray shootRay) {
  this.shootDirection = shootRay.direction;
  this.transform.position = shootRay.origin;
  rotateInShootDirection();
}

```

Run trò chơi một lần nữa và bắn theo một vài hướng khác nhau; lần này các viên đạn sẽ chỉ theo hướng chúng được bắn:

![](https://images.viblo.asia/6d36160e-8da2-4692-84ff-1fc1ab92d81d.gif)

Xóa các đoạn code Debug.DrawRay vì bạn sẽ không cần chúng nữa.
Bài viết được dịch lại từ [link](https://www.raywenderlich.com/980-introduction-to-unity-scripting)