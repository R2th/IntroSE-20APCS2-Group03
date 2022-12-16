# Models
Realm Models được định nghĩa giống như class Swift và properties như bình thường chúng ta hay tạo model để làm theo tác lưu giữ dữ liệu trên Ram. Còn với Realms thì còn chúng ta có thể thao tác lưu dữ liệu vào DataSource luôn.
Để tạo được Model cho Realm, Model của chúng ta chỉ cần kế thừa từ class **Object** của Realm là được. Bạn có thể khai báo thêm hàm, hoặc implement các protocol và sử dụng nó tương tự như các object khác như bình thường. Khuyết điểm duy nhất của **Object** là chỉ được sử dụng trên **Thread** mà đã tạo ra nó.
Cho phép **Relationship** (quan hệ) và **nested** (lồng) **Data** bằng cách sử dụng properties của Type Object mong muốn hoặc sử dụng **Realm List** cho danh sách của object. 
```
import RealmSwift

// Dog model
class Dog: Object {
    @objc dynamic var name = ""
    @objc dynamic var owner: Person? // Properties can be optional
}

// Person model
class Person: Object {
    @objc dynamic var name = ""
    @objc dynamic var birthdate = Date(timeIntervalSince1970: 1)
    let dogs = List<Dog>()
}
```
**Realm** sẽ phân tích tất cả **models** được định nghĩ trong **project** khi chạy app, **Realm** sẽ kiểm tra các **Models** có hợp lệ không, ngay cả các **Models** đó chẳng bao giờ được sử dụng trong code của bạn đi chăng nửa.

## Supported property types
Realm support các kiểu dự liệu căn bản: **Bool**, **Int**, **Int8**, **Int16**, **Int32**, **Int64**, **Double**, **Float**, **String**, **Date** và **Data**. Chỉ riêng CGFloat thì Realm không support vì nó là **Core Graphics Float** (kiểu dự liệu dành riêng cho hỗ trợ hiển thị).
Kiểu **String**, **Date** và **Data** thì có thể Optional (Có thể Nil). Nếu **Object** muốn lưu các thuộc tính số là Optional thì sủ dụng lớp **RealmOptional**

## Required properties
Kiểu **String**, **Date** và **Data** là các kiểu dự liệu được phép khai báo Optional hoặc Required (không Nil). Nếu muốn khai báo Optional cho các biến số thì chúng ta sử dụng lớp **RealmOptional**:
```
class Person: Object {
    // Optional string property, defaulting to nil
    @objc dynamic var name: String? = nil

    // Optional int property, defaulting to nil
    // RealmOptional properties should always be declared with `let`,
    // as assigning to them directly will not work as desired
    let age = RealmOptional<Int>()
}

let realm = try! Realm()
try! realm.write() {
    var person = realm.create(Person.self, value: ["Jane", 27])
    // Reading from or modifying a `RealmOptional` is done via the `value` property
    person.age.value = 28
}
```
**RealmOptional** hỗ trợ các kiểu số như **Int, Float, Double, Bool,** và các sized của **Int (Int8, Int16, Int32, Int64)**

## Primary keys
Override lại hàm ***Object.primaryKey()*** để set khóa chính là gì. Định nghĩa khóa chính để định danh duy nhất mỗi record của dữ liệu trong database. Xem thêm info phải [đây](https://viblo.asia/p/khac-biet-giua-khoa-chinh-va-khoa-ngoai-trong-sql-924lJMdWZPM).
```
class Person: Object {
    @objc dynamic var id = 0
    @objc dynamic var name = ""

    override static func primaryKey() -> String? {
        return "id"
    }
}
```

## Indexing properties
Để đánh Index dựa theo Properties nào thì chúng lại override hàm  ***Object.indexedProperties()***. Khi Override hàm này thì khi thực hiện việc Write() sẽ lâu hơn bình thường nhưng khi truy vấn dữ liệu thì sẽ nhanh hơn hẳn. Xem thêm info tại [đây](https://viblo.asia/p/tim-hieu-ve-database-index-3wjAM7VgRmWe)
```
class Book: Object {
    @objc dynamic var price = 0
    @objc dynamic var title = ""

    override static func indexedProperties() -> [String] {
        return ["title"]
    }
}
```

Realm hỗ trợ đánh Index theo **String, integer, Boolean và Date.**

## Ignoring properties
Nếu trường hợp nào đó mà bạn ko lưu thuộc tính nào của Object mà có khai báo thì chỉ cần override lại hàm này ***Object.ignoredProperties()***.
```
class Person: Object {
    @objc dynamic var tmpID = 0
    var name: String { // read-only properties are automatically ignored
        return "\(firstName) \(lastName)"
    }
    @objc dynamic var firstName = ""
    @objc dynamic var lastName = ""

    override static func ignoredProperties() -> [String] {
        return ["tmpID"]
    }
}
```

## Property attributes
Realm model properties bắt buộc phải khai báo **@objc dynamic var** để có thể truy cập vào underlying Database. Nếu trên Swift 4 thì chỉ cần khai báo **dynamic var** là đủ.
Có ba ngoại lệ là: **LinkingObjects**, **List** và **RealmOptional**. Chúng là các **properties** không thể khai báo **Dynamic**, và luôn khai báo là **let**.

## Property cheatsheet
Bảng cách khai báo Request và Optional của từng loại kiểu biến.
![](https://images.viblo.asia/25c5bc1f-d727-47d3-a6ca-97fc21656e2b.png)

# **Working with Realm objects**
## Auto-updating objects
Object luông được tự động lưu vào database, bạn sẽ không cần refresh object. Chỉnh sửa thuộc tính thì ngay lập tức object sẽ được cập nhập vào Database và thay đổi ngay trên các object đã được lấy ra trước đó.
```
let myDog = Dog()
myDog.name = "Fido"
myDog.age = 1

try! realm.write {
    realm.add(myDog)
}

let myPuppy = realm.objects(Dog.self).filter("age == 1").first
try! realm.write {
    myPuppy!.age = 2
}

print("age of my dog: \(myDog.age)") // => 2
```
Việc này không chỉ giúp Realm nhanh và hiểu quả, nó còn làm cho code đơn giản và linh hoạt hơn. Nếu UI code được hiển thị dựa trên Realm Object, thì bạn không cần phải refresh lại UI, trước khi Redraw.

## Model inheritance
Realms cho phép model có thể kế từ các model khác, cho phép người dùng có thể sử dụng lại code trước đó.
```
// Base Model
class Animal: Object {
    @objc dynamic var age = 0
}

// Models composed with Animal
class Duck: Object {
    @objc dynamic var animal: Animal? = nil
    @objc dynamic var name = ""
}
class Frog: Object {
    @objc dynamic var animal: Animal? = nil
    @objc dynamic var dateProp = Date()
}

// Usage
let duck = Duck(value: [ "animal": [ "age": 3 ], "name": "Gustav" ])
```

## Collections
**Realms** cho phép một vài cách để nhóm các object lại được gọi là **“Realm collections”:**
1. **Result**: nhận giá trị sau từ Queries
2. **List**: Class chuyện nhận một tập hợp các mối quan hệ, (RelationShips) trong model.
3. **LinkingObjects**: class đại điện truy vấn ngược Relationship trong model.
4. **RealmCollection**: Là protocol được định nghĩa để thõa mãn các thuộc tính của Realm Collection.

## Copying objects between Realms
Để copy object từ Realms thì đơn giản chỉ cần truyền object vào hàm ***Realm().create(:value:update:)***. Đơn giản như ***realm.create(MyObjectSubclass.self, value: originalObjectInstance)***. Hãy nhớ là Realm chỉ được thao tác với object trên Thread mà đã tạo ra nó.

## Relationships
Bạn có thể liên kết hai Object vào nhau. Relationship rất đơn giản trong Realms mà không tốn quá nhiều về bộ nhớ và dung lượng. 
Liên kết Object bằng cách sử dụng Object hoặc List. List thì tương tự như Array .
Bây giờ chúng ta tạo class Dog:
```
class Dog: Object {
    @objc dynamic var name = ""
}
```
### Many-to-one
Để cài đặt many-to-one or one-to-one relationship, để model có properties là kiểu của Object kia:
```
class Dog: Object {
    // ... other property declarations
    @objc dynamic var owner: Person? // to-one relationships must be optional
}
```
Bạn có thể gán như thế này:
```
let jim = Person()
let rex = Dog()
rex.owner = jim
```
Khi sử dụng thuộc tính của Object, bạn có thể truy vấn lồng giống như **rex.owner?.address.country.**

### Many-to-many
Bạn có thể tạo mối quan hệ gồm nhiều object, và chúng ta sử dụng **List**. **List** chưa các **Object** khác hoặc các biến nguyên thủy,  nhưng chúng chỉ chứa duy nhất một loại kiểu biến, không như **Array** có thể chưa nhiều loại kiểu biến.
Ta có lớp Person
```
class Person: Object {
    // ... other property declarations
    let dogs = List<Dog>()
}
```
Bạn có thể truy cập và gán thuộc tính list như bình thường:
```
let someDogs = realm.objects(Dog.self).filter("name contains 'Fido'")
jim.dogs.append(objectsIn: someDogs)
jim.dogs.append(rex)
```
Bây giờ thì Person có thể có rất nhiều Dog.

### Inverse relationships
Vậy vấn đề ở trên ta thấy là khi gán Dog cho Person thì thuộc tính Owner của Dog vẫn là nil, nhưng rõ ràng Dog thuộc Person mà Owner lại nil được.
Vậy ta giải quyết vấn đề này bằng cách
```
class Dog: Object {
    @objc dynamic var name = ""
    @objc dynamic var age = 0
    let owners = LinkingObjects(fromType: Person.self, property: "dogs")
}
```
Tạo mối liên kết 2 chiều. để có link được thuộc tính Dogs của Person và thuộc tính Owner của Dog.
Như vậy bây giờ chúng ta chỉ cần tạo biến Dog mà chưa cần điền Owner. gán biến dog cho Person.Dog thì tự động biến Owner cũng được cập nhập và ngược lại gán biến Persion cho Dog.Owner thì tự động biến Dogs sẽ được thêm object Dog vào.