# Giới thiệu
![](https://images.viblo.asia/b5b15674-cb5c-42d9-b9a7-7aab8b21c814.png)
* Chào các bạn! Đến với bài viết này hẳn là các bạn đã và đang sử dụng [ROOM database](https://developer.android.com/topic/libraries/architecture/room), một component không thể thiếu với một Android developer hiện nay.  ROOM gần như làm một local database chính thức cho các app Android ở hiện tại. 
* Và khi nhắc đến database, chúng ta không thể không nghĩ đến những quan hệ (relations) của nó. Một trong những phần quan trọng khi thiết kế Database là chia dữ liệu thành các bảng(tables) có liên quan với nhau theo những cách có ý nghĩa. Hiện tại ROOM đang ở v2.2.3, nó đã hỗ trợ chúng ta implement những relations một cách ổn định, đó là Một-Một, Một-Nhiều, Nhiều-Nhiều, với annotation `@Relation` .

# Thân bài
## Quan hệ Một-một
![](https://images.viblo.asia/c6a8009a-e05e-4c9a-9125-7b78e3a46371.png)

* Cùng nói về một "thế giới buồn", nơi mà một người chỉ có thể nuôi một chú chó, và chó thì chỉ có một chủ. Đây là mối quan hệ Một-một. Bây giờ chúng ta sẽ chia dữ liệu và tạo quan hệ ràng buộc như sau. Tạo một table là Dog và một table khác là Owner. Trong đó, table Dog có tham chiếu đến id của Owner hoặc Owner có tham chiếu đến Dog. Với ROOM, chúng ta có 2 Entity như sau:

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
* Trong trường hợp chúng ta muốn hiển thị list tất cả Dog và Owner của nó trong một màn hình. Để làm được điều này, chúng ta cần tạo một table DogAndOnwer data class:

```
data class DogAndOwner(
    val owner: Owner,
    val dog: Dog
)
```
* Bước tiếp theo với SQLite, chúng ta phải cần: 
    1.  Thực hiện 2 query: một cho get tất cả các Owners, và một cho get tất cả các Dogs dựa trên những Id có được từ query trước đó.
    2.  Sau đó, phải handle mapping các object đó:

```
SELECT * FROM Owner
SELECT * FROM Dog
    WHERE dogOwnerId IN (ownerId1, ownerId2, …)
```

* Khá là dài dòng phải không nào. Trong khi đó ở ROOM , chúng ta không cần phải thực hiện 2 query và phải xử lý mapping, thay vào đó chỉ cần thêm `@Relation` annotation.
* Trong ví dụ này, khi mà table `Dog` đã có thông tin owner của nó, chúng ta sẽ thêm `@Relation` annotation vào dog variable để xác định rằng column trên parent (Owner entity) tương ứng với dogId đó.

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
Và bây giờ, chỉ cần một query đơn giản ở [DAO](https://developer.android.com/reference/android/arch/persistence/room/Dao) :

```
@Transaction
@Query("SELECT * FROM Owner")
fun getDogsAndOwners(): List<DogAndOwner>
```

**Note**:  Vì ROOM chạy 2 queru một cách ngầm định nên hãy thêm `@Transaction` để đảm bảo rằng điều này sảy ra một cách chính xác.

## Quan hệ Một-nhiều:

![](https://images.viblo.asia/5abe0451-c404-4925-beeb-1bbac8b33630.png)

* Ở một Thế giới tươi sáng hơn, một người `Owner` có thể có nhiều `Dog`. Và lúc này, ta gọi nó là quan hệ Một-nhiều. Schema tổ chức data của chúng ta không bị thay đổi - vẫn có 2 bảng như lúc nãy là `Owner` table và `Dog` table.
* Mở rộng hơn bài toán lúc nãy, chúng ta cần get list tất cả các Owner và những những con `Dog`s của mỗi người. Để làm được điều này trước tiên phải sửa lại data class mà chúng ta cần lấy một chút:

```
data class OwnerWithDogs(
    val owner: Owner,
    val dogs: List<Dog>
)
```

* Tương tự như trường hợp Một-một, để tránh phải query tuần tự 2 lần, chúng ta có thể define mỗi quan hệ Một-nhiều giữa `Owner` và `Dog` bằng cách thêm annotation `@Retention` trước `dogs` như sau:

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

Và DAO chỉ cần thêm 1 query tương tự như trên:
```
@Transaction
@Query("SELECT * FROM Owner")
fun getDogsAndOwners(): List<OwnerWithDogs>
```

##  Quan hệ Nhiều-nhiều:
![](https://images.viblo.asia/4ba9b19f-2e65-4632-8997-c4b7303f3837.png)
* Cuối cùng, ở một thế giới "perfect", nơi mà một người Owner có thể có nhiều con Dogs, và một con Dogs có thể có nhiều Owner. Thế giới này có vẻ hoàn hảo với mọi người hơn, nhưng developer thì không =(( . Hẳn các bạn còn nhớ lúc học database hồi nhỏ, muốn tổ chức được data có mối quan hệ Nhiều - nhiều thì chúng ta cần thêm một bảng phụ. Trường hợp này, khi Dogs có nhiều Owners chúng ta cần phải có nhiều entry cho cùng một dogOwnerId của Dogs, ứng với các ownerId khác nhau. Vì dogIId là khóa chính trong `Dog`, chúng ta không thể insert nhiều Dogs với chung id. Để khắc phục điều này chúng ta sẽ tạo ra table kết hợp (bảng phụ tham chiếu chéo) giữa các cặp (dogId,ownerId):

```
@Entity(primaryKeys = ["dogId", "ownerId"])
data class DogOwnerCrossRef(
    val dogId: Long,
    val ownerId: Long
)
```
* Quay lại bài toán lúc nãy, chúng ta muốn lấy list của các Owners và dogs : List<OwnerWithDogs>. Nếu sử dụng SQLite query, chúng ta phải cần có 2 query để làm ddief này: một query để get tất cả các Owners và một để một để dùng trong phép JOIN với các bảng ghi có được từ query1.

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
* Còn với ROOM thì sao, chúng ta sẽ cần update lại table `OwnerWithDogs`  và thông báo cho ROOM rằng để get được Dogs, nó cần sử dụng bảng phụ `DogOwnerCrossRef`. Chung ta tạo tham chiếu với table này bằng cách sử dụng một Junction:

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
*  Và thực hiện query ở DAO: 
```
@Transaction
@Query("SELECT * FROM Owner")
fun getOwnersWithDogs(): List<OwnerWithDogs>
```
    
 So với dùng nhiều query như SQLite, việc apply ROOM sẽ tránh cho chúng ta phải tự apply các kết quả trả về từ query1 vào query2 thủ công, hạn chế được bug.
## Bonus
* Khi sử dụng annotation `@Relation` , ROOM sẽ infer những thực thể để sử dụng từ các column được thêm annotation. Ví dụ như khi chúng ta muốn thêm annotation cho một `Dog` hoặc một `List<Dog>` với `@Relation`, điều này sẽ chỉ cho ROOM biết cột nào mà nó cần thực hiện truy vấn.
* Cụ thể như sau, chúng ta muốn get một object bất kỳ như là `Pup`, đây không phải là entity nhưng nó chứa một vài field có ở trong Entity `Dog`,  chúng ta có thể chỉ định data trả về thông qua Pup này:

```
data class Pup(
     val name: String,
     val cuteness: Int = 11
)
data class OwnerWithPups(
     @Embedded val owner: Owner,
     @Relation(
          parentColumn = "ownerId",
          entity = Dog::class,
          entityColumn = "dogOwnerId"
     )
     val dogs: List<Pup>
)
```
=>  Có thể nói `Pup` như là một class trung gian, định nghĩa những gì chúng ta cần lấy từ `Dog`.
* Còn trường hợp chúng ta chỉ lấy một field cụ thể trong table `Dog`  thì sao? Chỉ cần thông báo cho ROOM biết những column chúng ta cần bằng cách xác định chúng trong các property truyền vào `@Relation`. Ví dụ, chúng ta muốn chỉ muốn lấy tên của tất cả dogs trong `OwnerWithDogs` data class thì chúng ta sẽ cần một `List<String> `và định nghĩa list đó từ field `"name"` như sau:

```
data class OwnerWithDogs(
     @Embedded val owner: Owner,
     @Relation(
           parentColumn = "ownerId",
           entity = Dog::class,
           entityColumn = "dogOwnerId",
           projection = ["name"]
     )
     val dogNames: List<String>
)
```
Còn nếu chúng ta muốn tạo mối quan hệ chặt chẽ hơn giữa `dogOwnerId`  và `ownerId`, phụ thuôc vào các quan hệ mà mình đã tạo, có thể sử dụng một khóa ngoài `ForeignKey`
để tạo ràng buộc giữa các field. 
#   Kết luận
* Trong bài viết này, chúng ta đã được tìm hiểu về cách implement các mối quan hệ trong ROOM database. 
* Hi vọng là bài viết có thể giúp ích cho bạn. Nếu có gì không ổn hãy để lại comment nhé. Good bye!
## Tham khảo :
*  https://developer.android.com/training/data-storage/room/index.html
*  https://medium.com/androiddevelopers/database-relations-with-room-544ab95e4542