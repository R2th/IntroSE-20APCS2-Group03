![](https://images.viblo.asia/9db6a97b-29cf-4e51-941d-9acceb2a6a1c.png)

Một phần quan trọng của việc thiết kế cơ sở dữ liệu là chia dữ liệu thành các bảng có liên quan và kéo dữ liệu lại với nhau theo những cách có ý nghĩa.

Với cơ sở dữ liệu Room 2.2, chúng ta sẽ được hỗ trỡ tất cả các mối quan hệ có thể có giữa các bảng : một-một, một-nhiều và nhiều-nhiều, với một annotation: @Relation.

## Quan hệ một-một

![](https://images.viblo.asia/1af91467-4b1a-4382-97dd-d99da3a6702d.png)


Một ví dụ dễ hiểu trong trường hợp này như sau : một người có thể sở hữu một con chó và một con chó chỉ có một người chủ. 
Đây là mối quan hệ một-một.

Để thể hiện mối quan hệ này trong cơ sở dữ liệu, chúng ta tạo 2 bảng : **Dog** và **Owner**, trong đó bảng **Dog** có tham chiếu tới **owner id**, bảng Owner có tham chiếu tới **dog id**.

Trong Room, chúng ta tạo 2 model như sau :

```
@Entity
data class Dog(
    @PrimaryKey val dogId: Long,
    val dogOwnerId: Long,
    val name: String,
    val cuteness: Int,
    val barkVolume: Int,
    val breed: String
)
@Entity
data class Owner(@PrimaryKey val ownerId: Long, val name: String)
```

Để hiển thị tất cả các con chó và chủ của chúng trên màn hình, chúng ta tạo một lớp DogAndOwner như sau :

```
data class DogAndOwner(
    val owner: Owner,
    val dog: Dog
)
```

Để truy vấn sử dụng SQLite, chúng ta cần làm 2 việc :
1. Chạy 2 truy vấn : một là lấy tất cả các người chủ, hai là lấy tất cả các con chó dựa trên owner ids.
2. Xử lý object mapping.

```
SELECT * FROM Owner
SELECT * FROM Dog
    WHERE dogOwnerId IN (ownerId1, ownerId2, …)
```

Để truy vấn List<DogAndOwner> sử dụng Room, chúng ta ko cần thực hiện 2 việc trên, thay vào đó, chúng ta chỉ cần sử dụng annotation **@Relation**
    
Trong ví dụ này, khi Dog có thông tin của owner, chúng ta thêm annotation @Relation vào biến Dog, chỉ định rằng cột **ownerId** tương ứng với **dogOwnerId** :

```
data class DogAndOwner(
    @Embedded val owner: Owner,
    @Relation(
         parentColumn = "ownerId",
         entityColumn = "dogOwnerId"
    )
    val dog: Dog
)
```
    
Lớp truy vấn DAO sẽ như sau :
    
```
@Transaction
@Query("SELECT * FROM Owner")
fun getDogsAndOwners(): List<DogAndOwner>
```
    
## Quan hệ một-nhiều
    
![](https://images.viblo.asia/3560c899-3747-43d3-b70c-51ba73da50ff.png)

Trở lại ví dụ đã được nhắc đến, lúc này chúng ta có mỗi quan hệ một-nhiều giữa Dog và Owner. 
Các model của cơ sở dữ liệu chúng ta định nghĩa trước đó không thay đổi.
    
Lúc này, để hiển thị danh sách các người chủ với những con chó, chúng ta cần tạo một lớp mới như sau :
    
```
data class OwnerWithDogs(
    val owner: Owner,
    val dogs: List<Dog>
)
```
    
Để tránh chạy 2 truy vấn riêng biệt, chúng ta có thể định nghĩa một mối quan hệ một-nhiều giữa Dog và Owner, bằng annotation @Relation của List<Dog> :
    
```
data class OwnerWithDogs(
     @Embedded val owner: Owner,
     @Relation(
          parentColumn = "ownerId",
          entityColumn = "dogOwnerId"
     )
     val dogs: List<Dog>
)
```
    
Lớp DAO sẽ như sau :
    
```
@Transaction
@Query("SELECT * FROM Owner")
fun getDogsAndOwners(): List<OwnerWithDogs>
```
    
## Quan hệ nhiều-nhiều
    
![](https://images.viblo.asia/c3c25fb2-e4e0-4154-af13-74867ff8714e.png)

Bây giờ, chúng ta hãy xem xét trường hợp một người chủ có thể sở hữu nhiều con chó, và một con chó có thể có nhiều người chủ.
Để thể hiện mối quan hệ này, bảng Dog và bảng Owner chúng ta định nghĩa trước đó là ko đủ.
    
Một con chó có thể có nhiều người chủ, chúng ta cần có nhiều dog id, tương ứng với các owner id khác nhau.
Vì dogId là khóa chính trong bảng Dog, chúng ta ko thể insert nhiều dogs với cùng một id.
    
Để giải quyết vấn đề này, chúng ta cần tạo một bảng kết hợp ( còn được gọi là bảng tham chiếu chéo) giữ các cặp (dogId, ownId) :
    
```
@Entity(primaryKeys = ["dogId", "ownerId"])
data class DogOwnerCrossRef(
    val dogId: Long,
    val ownerId: Long
)
```
    
 Nếu chúng ta muốn lấy tất cả các owners và dogs : List<OwnerWithDogs>, chỉ sử dụng SQLite truy vấn, chúng ta cần viết 2 truy vấn : 
 một lấy tất cả các owners và một join vào 2 bảng Dog và DogOwnerCrossRef :
   
```
SELECT * FROM Owner
    
SELECT
     Dog.dogId AS dogId,
     Dog.dogOwnerId AS dogOwnerId,
     Dog.name AS name,
     _junction.ownerId
FROM
     DogOwnerCrossRef AS _junction
INNER JOIN Dog ON (_junction.dogId = Dog.dogId)
WHERE _junction.ownerId IN (ownerId1, ownerId2, …)
```
    
Để thực hiện việc này trong Room, chúng ta cần update lớp OwnerWithDogs và nói cho Room rằng để lấy dữ liệu Dog, nó cần sử dụng bảng liên kết DogOwnerCrossRef :
    
```
data class OwnerWithDogs(
    @Embedded val owner: Owner,
    @Relation(
         parentColumn = "ownerId",
         entityColumn = "dogId",
         associateBy = Junction(DogOwnerCrossRef::class)
    )
    val dogs: List<Dog>
)
```
    
Trong lớp DAO, chúng ta cần select từ Owners và trả veè đúng class :
    
    
```
@Transaction
@Query("SELECT * FROM Owner")
fun getOwnersWithDogs(): List<OwnerWithDogs>
```