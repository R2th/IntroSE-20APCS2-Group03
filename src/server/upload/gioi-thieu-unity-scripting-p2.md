Ở phần 1 mình đã giới thiệu về cách tạo 1 object hình cầu đại diện cho Player - nó có thể di chuyển xung quanh Arena, [link phần 1](https://viblo.asia/p/gioi-thieu-unity-scripting-p1-aWj539oGZ6m)

Ở phần này chúng ta sẽ code camera di chuyển theo Player và tạo ra các kẻ thù là các khối Cube có thể đuổi theo Player.

## Creating the Camera Script

Trong thư mục **Scripts**, tạo một file mới có tên **CameraRig** và đính kèm nó vào **Main Camera**. 

Cụ thể là ta làm các bước sau:

Với thư mục **Scripts** được chọn, click vào nút **Create** trong **Project Browser**, sau đó chọn **C# Script**. Đặt tên cho script mới là **CameraRig**. 

Cuối cùng, drag và drop nó vào **Main Camera object** như vậy:

![](https://images.viblo.asia/d7c32f97-6263-447c-a6a9-66dd7a0c538d.gif)

Bây giờ hãy tạo các biến sau trong class **CameraRig** mới được tạo, ngay tại phía trên method **Start ()**:

```
public float moveSpeed;
public GameObject target;

private Transform rigTransform;
```

Như bạn có thể đoán, **moveSpeed** là tốc độ mà camera sẽ theo dõi mục tiêu - có thể là bất kỳ game Object nào trong scene.

Bên trong Start (), thêm dòng sau:

```
rigTransform = this.transform.parent;
```

Đoạn code này lấy được tham chiếu đến transform parent của Camera trong scene hierarchy. Mỗi object trong scene đều có **Transform** - nó là component chứa các thuộc tính position, rotation và scale của object.

![](https://images.viblo.asia/a595c41a-4fd8-46e6-ba9c-1982e7da7331.png)

Trong cùng file script, thêm method bên dưới:

```
void FixedUpdate () {
  if(target == null){
    return;
  }

  rigTransform.position = Vector3.Lerp(rigTransform.position, target.transform.position, Time.deltaTime * moveSpeed);
}
```

Code chuyển động **CameraRig** đơn giản hơn một chút so với code trong **PlayerMovement**. Điều này là do bạn không cần Rigidbody.

Chỉ cần nội suy giữa các vị trí của RigTransform và target là đủ.

**Vector3.Lerp ()** lấy hai điểm trong không gian và 1 số float trong phạm vi [0, 1], trả về một điểm nằm trên đoạn thẳng nối hai điểm. Điểm bên trái là 0 và điểm bên phải là 1. Truyền từ 0,5 đến Lerp () sẽ trả về một điểm chính xác giữa cả hai điểm cuối...

Điều này di chuyển **rigTransform** gần hơn đến vị trí target với một chút nới lỏng. Nói tóm lại - camera sẽ theo dõi player.

Quay trở lại Unity. Đảm bảo **Main Camerah** vẫn được selected trong cửa sổ **Hierarchy**. Trong Inspector, đặt **Move Speed** di chuyển thành **8** và **Target** là **Player**:

![](https://images.viblo.asia/ae52a451-2a6e-42b2-8eb3-321b70d5d096.gif)

Run game và di chuyển xung quanh scene; bạn sẽ thấy camera sẽ theo sát mục tiêu.

![](https://images.viblo.asia/f3f98b90-b1b0-4640-bd12-a82de7b65414.gif)

## Creating an Enemy

Một game bắn súng không có kẻ thù sẽ hơi nhàm chán. :] Tạo khối cube là kẻ thù bằng cách nhấp vào **GameObject \ 3D Object \ Cube** từ menu trên cùng. Đổi tên Cube của bạn thành **Enemy** và thêm component **Rigidbody** vào nó.

Trong Inspector, trước tiên, đặt **Transform** của Cube là **(0, 0.5,4)**. Trong component **Rigidbody**, hãy chọn checkbox **Y** trong  phần **Freeze Position** category.

![](https://images.viblo.asia/5d90b643-688f-41e0-b9ab-0ed6c08d32b2.png)

Bây giờ để làm cho enemy của bạn di chuyển xung quanh. Tạo một script có tên là **Enemy** trong thư mục **Scripts**. 

Tiếp theo, thêm các biến public sau trong class này:

```
public float moveSpeed;
public int health;
public int damage;
public Transform targetTransform;
```

MoveSpeed là tốc độ di chuyển của Enemy.

Health và damage giúp xác định khi nào kẻ thù sẽ chết và damage của chúng sẽ làm tổn thương Player như thế nào. 

Cuối cùng, targetTransform tham chiếu đến transform của Player.

Trong Project Browser, chọn thư mục **Player** và tạo script mới có tên **Player**; script này sẽ phản ứng với các vụ va chạm và theo dõi tình trạng của máu của Player. 

Bấm đúp vào file script để chỉnh sửa nó.

Thêm biến public health để lưu trữ máu cho Player:

```
public int health = 3;
```

Điều này cung cấp một giá trị mặc định cho health, nhưng nó cũng có thể được chỉnh sửa trong Inspector.

Để xử lý va chạm, thêm các phương pháp sau:

```
void collidedWithEnemy(Enemy enemy) {
  // Enemy attack code
  if(health <= 0) {
    // Todo 
  }
}

void OnCollisionEnter (Collision col) {
    Enemy enemy = col.collider.gameObject.GetComponent<Enemy>();
    collidedWithEnemy(enemy);
}
```

**OnCollisionEnter()** kích hoạt khi hai rigidbodie va chạm chạm vào nhau. Đối số **Collision** chứa thông tin về những thứ như điểm tiếp xúc và vận tốc tác động. Trong trường hợp này, bạn chỉ quan tâm đến Enemy component của đối tượng va chạm, vì vậy bạn có thể gọi collidedWithEnemy () và thực hiện logic tấn công - bạn sẽ thêm vào tiếp theo.

Quay trở lại **Enemy.cs** và thêm các phương thức sau:

```
void FixedUpdate () {
  if(targetTransform != null) {
    this.transform.position = Vector3.MoveTowards(this.transform.position, targetTransform.transform.position, Time.deltaTime * moveSpeed);
  }
}

public void TakeDamage(int damage) {
  health -= damage;
  if(health <= 0) {
    Destroy(this.gameObject);
  }
}

public void Attack(Player player) {
  player.health -= this.damage;
  Destroy(this.gameObject);
}
```

Bạn đã quen thuộc với **FixedUpdate ()**, điểm khác biệt nhỏ là bạn đang sử dụng **MoveTowards ()** thay vì **Lerp ().** Điều này là do Kẻ thù nên di chuyển với cùng tốc độ mọi lúc.

Khi kẻ địch bị trúng đạn, TakeDamage () được gọi; khi kẻ thù đạt 0 điểm, nó sẽ tự hủy.

Attack () cũng tương tự - nó áp dụng sát thương cho Player và sau đó nó sẽ tự hủy diệt.

Quay trở lại **Player.cs** và trong **collidedWithEnemy ()**, thay thế **comment Enemy attack code** bằng cách sau:

```
enemy.Attack(this);
```

Player sẽ nhận damage và enemy sẽ tự hủy trong quá trình này.

Chuyển về Unity. Đính kèm **Enemy script** vào **Enemy object** và trong Inspector, đặt các giá trị sau vào Enemy:

**Move Speed: 5**

**Health: 2**

**Damage: 1**

**Target Transform: Player**

![](https://images.viblo.asia/eebaf7a0-b752-4203-828a-bc8c2d84a8a6.gif)

Trong trò chơi, một Enemy va chạm với Player tạo thành một cuộc tấn công của enemy.

Cuối cùng, đính kèm **Player** script vào **Player** vào Hierarchy.

Run game và chú ý console:
![](https://images.viblo.asia/768116c0-a114-48c0-a5dd-ea119b8c9fbd.gif)

Khi enemy tiếp cận Player, nó sẽ thực hiện đòn tấn công thành công và giảm health xuống  2. Tuy nhiên, có một **NullReferenceException** được ném trong bảng điều khiển, chỉ vào tập lệnh Người chơi:

![](https://images.viblo.asia/ddf8383b-181f-455c-8232-cf80b4a0350d.png)

Nguyên nhân vì Player có thể va chạm không chỉ với enemy mà còn các phần khác, chẳng hạn như Arena. Các  game object này không có Enemy script và do đó GetComponent () trả về null.

Mở Player.cs. Trong OnCollisionEnter (), hãy bọc collidedWithEnemy () trong câu lệnh if:

```
if(enemy) {
  collidedWithEnemy(enemy);
}
```

Nó đã hoạt động tốt :]]

Ở phần tiếp theo mình sẽ viết về cách dùng Prefabs để tái sử dụng các object Enemy, và code làm cho Player có thể bắn súng được.

Bài viết này được dịch lại từ [link này](https://www.raywenderlich.com/980-introduction-to-unity-scripting)