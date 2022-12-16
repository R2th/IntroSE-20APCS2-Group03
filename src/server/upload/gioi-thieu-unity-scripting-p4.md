## Generating More Bad Guys

Chỉ có một loại Enemy thì thật nhàm chán. Nhưng bây giờ bạn đã biết về Prefabs, bạn có thể sinh ra nhiều loại enemy mà bạn muốn! :]

Bạn có thể chọn ngẫu nhiên heath, speed và vị trí của từng enemy.

Tạo một empty game object -GameObject\Create Empty. Đặt tên là **EnemyProducer** và thêm **Box Collider** component. Đặt các giá trị trong Inspector như sau:

**1.Position**: (0, 0, 0)

**2.Box Collider**:
 **Is Trigger**: true
 **Center**: (0, 0.5, 0)
 **Size**: (29, 1, 29)
    
   ![](https://images.viblo.asia/b281f349-65c4-438f-af93-cdb0b561cb15.png)
    
collider mà bạn đính kèm xác định một không gian 3D cụ thể bên trong Arena. Để thấy điều này, hãy chọn GameObject của **Enemy Producer** trong Hierarchy và xem bên trong chế độ Scene view:
![](https://images.viblo.asia/5eb6b125-a5fc-4afa-a486-bac943c45061.png)
Các đường màu xanh lá cây đai diện cho collider.

Bạn sắp viết một script chọn một vị trí ngẫu nhiên trong không gian này dọc theo trục X và Z và tạo enemy.

Tạo một tập lệnh mới có tên **EnemyProducer** và đính kèm nó vào GameObject của **EnemyProducer**. Trong class mới được thiết lập, thêm các thành phần sau:

```
public bool shouldSpawn;
public Enemy[] enemyPrefabs;
public float[] moveSpeedRange;
public int[] healthRange;

private Bounds spawnArea;
private GameObject player;
```

Biến đầu tiên dùng để check sự cho phép spawn hay không. Script sẽ chọn một prefab kẻ thù ngẫu nhiên từ *enemyPrefabs* và khởi tạo nó. Hai array tiếp theo sẽ chỉ định min và max của speed và health. Khu vực spawn là hộp màu xanh lá cây mà bạn đã thấy trong Scene view. Cuối cùng, bạn sẽ cần một tham chiếu tới Player và dùng nó làm mục tiêu di chuyển cho các enemy.

Trong script, xác định các phương thức sau:
```
public void SpawnEnemies(bool shouldSpawn) {
  if(shouldSpawn) {
    player = GameObject.FindGameObjectWithTag("Player");
  }
  this.shouldSpawn = shouldSpawn;
}

void Start () {
  spawnArea = this.GetComponent<BoxCollider>().bounds;
  SpawnEnemies(shouldSpawn);
  InvokeRepeating("spawnEnemy", 0.5f, 1.0f);
}

```

SpawnEnemies() lấy tham chiếu tới một game object với tag *Player* và xác định xem enemy có nên sinh ra hay không.

Start () khởi tạo spawn area và lên lịch cho việc gọi phương thức "spawnEnemy" mỗi khoảng 0,5 giây sau khi trò chơi bắt đầu. 

Player game object chưa được gắn thẻ - bạn sẽ làm điều đó ngay bây giờ. Chọn đối tượng Player từ Hierarchy và sau đó trong Inspector tab, chọn **Player** từ dropdown menu của **Tag**:
![](https://images.viblo.asia/5af76c53-156c-4c89-add7-1d4bb398e697.png)

Bây giờ, bạn cần viết code spawn cho các enemy riêng lẻ.

Mở script Enemy và thêm method bên dưới:

```
public void Initialize(Transform target, float moveSpeed, int health) {
  this.targetTransform = target;
  this.moveSpeed = moveSpeed;
  this.health = health;
}

```

Điều này chỉ đơn giản là hoạt động như một setter để tạo object. Tiếp theo: code để spawn những enemy. Open **EnemyProducer.cs** và thêm các phương thức sau:

```
Vector3 randomSpawnPosition() {
  float x = Random.Range(spawnArea.min.x, spawnArea.max.x);
  float z = Random.Range(spawnArea.min.z, spawnArea.max.z);
  float y = 0.5f;

  return new Vector3(x, y, z);
}

void spawnEnemy() {
  if(shouldSpawn == false || player == null) {
    return;
  }

  int index = Random.Range(0, enemyPrefabs.Length);
  var newEnemy = Instantiate(enemyPrefabs[index], randomSpawnPosition(), Quaternion.identity) as Enemy;
  newEnemy.Initialize(player.transform, 
      Random.Range(moveSpeedRange[0], moveSpeedRange[1]), 
      Random.Range(healthRange[0], healthRange[1]));
}

```

Tất cả những gì **spawnEnemy ()** làm là chọn một prefab kẻ thù ngẫu nhiên, khởi tạo nó ở một vị trí ngẫu nhiên.

Enemy Producter.cs gần như đã sẵn sàng để sử dụng!

Quay trở lại Unity. Tạo một **Enemy prefab** bằng cách kéo đối tượng **Enemy** từ Hierarchy vào thư mục **Prefabs**. Remove enemy khỏi scene. Tiếp theo, thiết lập các biến công khai của script Enemy Producer như sau:

1.**Should Spawn**: True


2.**Enemy Prefabs**:
        **Size**: 1
        **Element** 0: Reference the enemy prefab
        
        
3.**Move Speed Range**:
        **Size**: 2
        **Element 0**: 3
        **Element 1**: 8
        
        
4.**Health Range**:
        **Size**: 2
        **Element 0**: 2
        **Element 1**: 6
        
 ![](https://images.viblo.asia/c497a254-cb89-4dcc-a508-9627f1090052.gif)
 
 Run trò chơi và kiểm tra xem nó.
 
 ![](https://images.viblo.asia/fbe30d30-cbf8-4dc4-ab6b-a1c502257981.gif)
 
 Được rồi, những hình khối đó trông không đáng sợ lắm. Thời gian để gia vị mọi thứ lên.

Tạo một 3D **Cylinder** và **Capsule** trong Scene. Đặt tên chúng lần lượt là Enemy2 và Enemy3. Giống như bạn đã làm trước đó với kẻ thù đầu tiên, hãy thêm một thành phần **Rigidbody** và **script Enemy** cho cả hai. Chọn **Enemy2** và thay đổi cấu hình của nó trong Inspector như sau:

1.**Scale**: (0, 0.5, 0)

2.**Rigidbody**:
        Use Gravity: False
        Freeze Position: Y
        Freeze Rotation: X, Y, Z
        
3.**Enemy Component**:
        Move Speed: 5
        Health: 2
        Damage: 1
        Target Transform: None
        
Bây giờ làm tương tự cho **Enemy3**, nhưng đặt **Scale** của nó thành **0,7**:

![](https://images.viblo.asia/f98e9f5f-1f38-4754-afb8-f3d776cc6a7d.png)

Tiếp theo, biến chúng thành Prefabs, giống như bạn đã làm với Enemy ban đầu và tham chiếu tất cả chúng trong Enemy Producer. Các giá trị trong Inspector sẽ trông như thế này:

Enemy Prefabs:
        Size: 3
        Element 0: Enemy
        Element 1: Enemy2
        Element 2: Enemy3
        
   ![](https://images.viblo.asia/8005ef9b-e14b-4210-a4cd-09f3e4c779da.png)

## Implementing the Game Controller

Bây giờ bạn đã có bắn súng, di chuyển và kẻ thù, bạn sẽ triển khai bộ điều khiển trò chơi. Nó sẽ khởi động lại trò chơi sau khi Player "chết". Nhưng trước tiên, bạn sẽ phải tạo một cơ chế để thông báo cho biết Người chơi đã có health về 0.

Mở Player script và thêm phần sau vào phần khai báo lớp:

```
using System;
```

Bên trong lớp thêm public event mới sau đây:

```
public event Action<Player> onPlayerDeath;
```

Một **event** là một tính năng ngôn ngữ C # cho phép bạn phát các thay đổi trong các object cho bất kỳ listener. Để tìm hiểu cách sử dụng các event, hãy xem [chương trình đào tạo trực tiếp về các sự kiện](https://unity3d.com/learn/tutorials/topics/scripting/events) .

Chỉnh sửa **collidedWithEnemy()** để trông giống như code dưới đây:

```
void collidedWithEnemy(Enemy enemy) {
  enemy.Attack(this);
  if(health <= 0) {
    if(onPlayerDeath != null) {
      onPlayerDeath(this);
    }
  }
}

```

Các event cung cấp một cách gọn gàng cho các đối tượng báo hiệu sự thay đổi trạng thái giữa chúng. Một bộ game controller sẽ rất quan tâm đến event được khai báo ở trên. Trong thư mục Script, tạo một tập lệnh mới có tên **GameController**. Bấm đúp vào file để chỉnh sửa file và thêm vào các biến sau:

```
public EnemyProducer enemyProducer;
public GameObject playerPrefab;

```

Script sẽ cần phải có một số quyền kiểm soát đối với việc tạo enemy, vì nó không có ý nghĩa để sinh ra enemy một khi Player đã chết. Ngoài ra, khởi động lại trò chơi có nghĩa là bạn sẽ phải tạo lại Player, điều đó có nghĩa là ... đúng vậy, nó sẽ trở thành Prefab.

Thêm các method sau:

```
void Start () {
  var player = GameObject.FindGameObjectWithTag("Player").GetComponent<Player>();
  player.onPlayerDeath += onPlayerDeath;
}

void onPlayerDeath(Player player) {
  enemyProducer.SpawnEnemies(false);
  Destroy(player.gameObject);

  Invoke("restartGame", 3);
}

```

Trong Start (), script nhận được tham chiếu đến script Player và subscribe cho event bạn đã tạo trước đó. Khi health bằng 0 thì onPlayerDeath () sẽ được gọi, ngừng tạo kẻ thù, xóa Player object khỏi scene và gọi method restartGame () sau 3 giây.

Cuối cùng, thêm việc thực hiện hành động restart lại trò chơi:
```
void restartGame() {
  var enemies = GameObject.FindGameObjectsWithTag("Enemy");
  foreach (var enemy in enemies)
  {
    Destroy(enemy);
  }

  var playerObject = Instantiate(playerPrefab, new Vector3(0, 0.5f, 0), Quaternion.identity) as GameObject;
  var cameraRig = Camera.main.GetComponent<CameraRig>();
  cameraRig.target = playerObject;
  enemyProducer.SpawnEnemies(true);
  playerObject.GetComponent<Player>().onPlayerDeath += onPlayerDeath;
}

```

Bạn tiêu diệt tất cả kẻ thù trong scene và tạo một Player object mới. Sau đó, bạn chỉ định lại mục tiêu của camera trong trường hợp này, tiếp tục tạo ra enemy và subscribe Game Controller cho event player chết.

Bây giờ hãy quay lại Unity, mở thư mục Prefabs và thay đổi **tag** của tất cả các prefab Enemy thành *Enemy*. Tiếp theo, làm cho Player object vào Prefab bằng cách kéo nó vào thư mục **Prefabs**. Tạo một empty game object, đặt tên là GameController và đính kèm script bạn vừa tạo. 

**Game Controller**:

**Enemy Producer**: Enemy Producer tham chiếu từ  Hierarchy.

**Player Prefab**: tham chiếu nó từ Prefabs folder.

  Khởi động lại trò chơi để xem game controller đang hoạt động.
  
  Thế là xong! Xin chúc mừng! :]
  
  link bài [gốc](https://www.raywenderlich.com/980-introduction-to-unity-scripting)