Google đã công bố hỗ trợ chính thức cho Kotlin tại Google I/O vào tháng 5 năm 2017. Kotlin là một ngôn ngữ lập trình tuyệt vời, được thiết kế một cách thông minh, vững chắc, làm cho việc phát triển Android nhanh hơn và thú vị hơn.

Hãy cùng xem xét sự ngắn gọn của Kotlin trong trường hợp phổ biến đó là khi ta tạo ra các class và làm việc với nó.

# Kotlin data class
### Kotlin data class vs Java POJOs
Chúng ta cùng xem xét các **data class** của Kotlin và  mức độ ngắn gọn của chúng so với POJOs (Plain Old Java Objects) .

Trước tiên, hãy  xem một POJO đơn giản đại diện cho một Người(Person) có 4 thuộc tính (name, age, email và phone):
```java
public final class Person{

    private final String name;
    private final int age;
    private final String email;
    private final long phone;

    public PersonJava(String name, int age, String email, long phone) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getEmail() {
        return email;
    }

    public long getPhone() {
        return phone;
    }
}
```
Bình thường, chúng ta có khai báo tên class nằm ở trên cùng, theo sau là tất cả các trường, sau đó là constructor và cuối cùng là các phương thức getters. 30 dòng mã,  rất nhiều, phải không? Và đối tượng này mới chỉ có 4 thuộc tính, hãy tưởng tượng một đối tượng lớn hơn 15 20 thuộc tính chẳng hạn thì class này sẽ rất dài đúng không nào.

Nhưng đó chưa phải là tất cả, trong nhiều trường hợp bạn còn phải implement các phương thức như toString(), hashCode() hay equals() như duới đây:
```java
@Override
public String toString() {
    return "PersonJava{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", email='" + email + '\'' +
            ", phone=" + phone +
            '}';
}

@Override
public boolean equals(Object o) {
    if (this == o) {
        return true;
    }
    if (o == null || getClass() != o.getClass()) {
        return false;
    }

    PersonJava that = (PersonJava) o;

    if (age != that.age) {
        return false;
    }
    if (phone != that.phone) {
        return false;
    }
    if (name != null ? !name.equals(that.name) : that.name != null) {
        return false;
    }
    return email != null ? email.equals(that.email) : that.email == null;
}

@Override
public int hashCode() {
    int result = name != null ? name.hashCode() : 0;
    result = 31 * result + age;
    result = 31 * result + (email != null ? email.hashCode() : 0);
    result = 31 * result + (int) (phone ^ (phone >>> 32));
    return result;

```
Lại thêm 41 dòng nữa, tổng cộng là 75, hơi nhiều cho một đối tượng đơn giản phải không.

**Vậy**, bạn nghĩ cần bao nhiêu dòng code để tạo được một đối tượng như ở trên với Kotlin?  - **Câu trả lời là 1 dòng duy nhất!**
```kotlin
data class Person(val name: String, val age: Int, val email: String, val phone: Long)

```

Trong data class Kotlin, chúng ta không cần phải khai báo các thuộc tính riêng biệt hoặc thực hiện bất kỳ getters và setters nào và thậm chí cả thực hiện toString(), equals() hoặc hashCode() vì mọi thứ được xử lý tự động bởi ngôn ngữ. 
Vì vậy, 1 dòng code Kotlin thực hiện chính xác giống như 75 dòng code Java cho POJOs ở trên.

### Default and named arguments
Những gì chúng ta thấy ở trên thật tuyệt vời phải không nào? Nhưng đó không phải tất cả đâu:
```kotlin
data class Person(val name: String = "default name", val age: Int = 30, 
                  val email: String = "dummy email", val phone: Long = 1234567890)
```
Đoạn code ở trên giống với data class Person ở phần trước, nhưng thêm vào đó là các **giá trị mặc định** cho mỗi thuộc tính của Person.
Làm thế nào để chúng ta tận dụng lợi ích của nó? Hãy cùng xem ví dụ dưới đây:
```kotlin

val person1 :Person = Person("name", 25, "email@gmail.com", 555544448)

val person2 :Person = Person()

val person3 :Person = Person("name", 25)

val person4 :Person = Person(name = "name", phone = 9876543210)
```
* **person1**: đơn giản là tạo một instance của Person và truyền giá trị cho tất cả thuộc tính.
* **person2**: nhưng nếu các giá trị mặc định là chính xác những gì chúng ta muốn thì chúng ta chỉ cần tạo instance của Person mà không cần truyền bất cứ đối số nào.
* **person3**: nếu chúng ta chỉ quan tâm đến name, age và muốn giữ nguyên giá trị mặc định của email và phone. Vậy chỉ cần truyền vào constructor 2 gái trị name và age. Bởi vì chúng ta chỉ quan tâm đến 2 thuộc tính đầu tiên nên chúng ta có thể khởi tạo như vậy, nhưng nếu muốn thay đổi name và phone còn giữ lại age và email thì sao?
* **person4**: đây là nơi chúng ta sử dụng **named  arguments**. Chúng ta chỉ cần sử dụng tên cho các đối số mà chúng ta truyền vào. Vậy là ta có thể truyền vào những gì chúng ta muốn và bỏ qua những thuộc tính không muốn thay đổi so với giá trị mặc định. Và thứ tự không quan trọng bây giờ bạn có thể dễ dàng thêm email làm đối số đầu tiên và nó sẽ hoạt động hoàn hảo khi Kotlin lấy tên của các đối số và gán các giá trị tương ứng.

### Immutability
Kotlin data class mặc định là **final** và không thể khai báo với từ khóa **open**.  Nhưng điều đó không đúng với các thuộc tính của
nó. Chúng ta có thể sử dụng từ khóa **var** thay vì **val** để chúng có thể mutable, nhưng đó không phải điều mà chúng ta nên làm.

Vậy cần làm gì nếu chúng ta muốn một phiên bản của một đối tượng khác chỉ với một vài thay đổi? -  **copy** - Kotlin said

 **Copy**
 
 Sao chép các instance củadata class trong Kotlin cũng rất dễ dàng. 
 
 Nếu chúng ta muốn nhanh chóng có được một bản sao chính xác của person1 hay person1 với age=30 hay person4 với email của họ thay vì email mặc định:

```kotlin
val person1Copy = person1.copy()

val person1With30 = person1.copy(age = 30)

val person4WithEmail = person4.copy(email = "person4@gmail.com")
```

Siêu đơn giản.
Một lần nữa với sự trợ giúp của **named arguments** ta 
có thể dễ dàng tạo các bản sao của bất kỳ đối tượng nào, và code rất đơn giản để tự giải thích, phải không?
### Inheritance
Kotlin data class mặc định là final và không thể khai báo với từ khóa open, vì vậy nó không thể được kế thừa như  trong Java hay các Kotlin class bình thường khác. Vậy làm sao để chia sẻ thuộc tính và hành vi giữa 2 lớp có cùng bản chất? Câu trả lời là sử dụng **interface**:
```kotlin

interface Person {
    val name: String
    val age: Int
    val email: String

    fun hasResponsibilities() : Boolean
}

data class Adult(override val name: String, override val age: Int, override val email: String) : Person {
    val isMarried: Boolean = false
    val hasKids: Boolean = false
    override fun hasResponsibilities(): Boolean = true
}

data class Child(override val name: String, override val age: Int, override val email: String = "") : Person {
    override fun hasResponsibilities(): Boolean = false
}
```

Sự khác biệt ở đây là trong khi Java inteface không thể có các thuộc tính bởi vì chúng mặc định là hằng số, nhưng trong Kotlin interface ta có thể có các thuộc tính và bạn sẽ nhận được Compilation error nếu bạn không override các thuộc tính này ở  constructor hoặc có các  phương thức getter cho chúng ở class mà implement interface.

Như bạn có thể thấy ở trên, interface Person có các thuộc tính name, age và email và phương thức hasResponsibilities(). Ta có thể dễ dàng tạo ra các data class là Adult và Child implement Person và override các thuộc tính trong constructor. Các lớp này cũng có các thuộc tính riêng hoặc các giá trị mặc định cho các thuộc tính...

# Parcelable in Kotlin - Parcelize
Trường hợp sử dụng cơ bản nhất để sử dụng Parcelable là khi chúng ta cần chuyển một đối tượng từ Activity này sang Activity khác. Trong khi truyền các kiểu nguyên thủy là rất dễ dàng thì khi chúng ta truyền qua các đối tượng, chúng ta cần phải làm gì đó với chúng:
```kotlin
class ActivityA : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val intent = Intent(this, ActivityB::class.java)
        val person = Person("name", 32, "email@email.com", 1234)

        intent.putExtra("A_STRING", "some string")
        intent.putExtra("A_NUMBER", 1234)
        intent.putExtra("AN_OBJECT", person) // compilation error

        startActivity(intent)
    }
}
```
Nếu chúng ta xem xét rằng đối tượng Person mà chúng ta sử dụng giống như Person trong phần trước của bài viết, chúng ta sẽ gặp lỗi biên dịch vì chúng ta không thể truyền đối tượng Person :
![](https://images.viblo.asia/314ae5c7-a856-43e6-9cbc-f6124d2c5d89.png)
Đối tượng của chúng ta không thuộc bất cứ kiểu nào như ở trên, vì vậy chúng ta phải làm gì đó:
* **Implement Serializable**: hy vọng rằng bạn không làm điều này nữa :) , mặc dù có hiệu quả và tương đối đơn giản để thực hiện, nhưng hiệu suất khá tệ vì nó dựa trên [reflection](https://www.geeksforgeeks.org/reflection-in-java/).
*  **Json String**: bạn cũng có thể truyền các đối tượng dưới dạng String. Cách này cũng khá đơn giản để thực hiện,  nếu bạn đã sử thư viện Gson trong project. Nhưng đây cũng không phải lựa chọn tốt nhất.
*  **Implement Parcelable**: rõ ràng đây là câu trả lời tốt nhất cho chúng ta. Nó được khuyến khích sử dụng trong [tài liệu chính thức ](https://developer.android.com/guide/components/activities/parcelables-and-bundles)của google.

> ***Chú ý:*** Bạn có thể tham khảo sự khác nhau giữa Parcelable và Serializable tạ [đây](https://stackoverflow.com/questions/3323074/android-difference-between-parcelable-and-serializable).
> 

Và Parcelable là lựa chọn tốt nhất cho chúng ta lúc này. Nhưng nó lại genarate ra rất nhiều code  và chúng ta phải cập nhật nó mỗi lần thay đổi gì đó liên quan đến thuộc tính của đối tượng. Trong Java nếu bạn sử dụng các thư viện như [AutoValue](https://github.com/google/auto/blob/master/value/userguide/index.md)   bạn có thể tránh được điều đó. Vậy còn Kotlin thì sao?
### Cách thông thường

Chúng ta cho lớp Person implement Parcelable interface và nhờ Android Studio genarate ra code cần thiết, đây là những gì chúng ta nhận được:
```kotlin
data class Person(val name: String, val age: Int, val email: String, val phone: Long) : Parcelable {
    constructor(parcel: Parcel) : this(
        parcel.readString(),
        parcel.readInt(),
        parcel.readString(),
        parcel.readLong())

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(name)
        parcel.writeInt(age)
        parcel.writeString(email)
        parcel.writeLong(phone)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<Person> {
        override fun createFromParcel(parcel: Parcel): Person {
            return Person(parcel)
        }

        override fun newArray(size: Int): Array<Person?> {
            return arrayOfNulls(size)
        }
    }
}
```
Như đã đề cập ở trên, ta có thể thấy khá nhiều code đã được genarate. Android Studio đã làm thay chúng ta việc này nhưng vẫn phải cập nhật nó khi cần thiết. Từ 1 dòng code duy nhất bây giờ đã tăng lên thành 28 cho một đối tượng chỉ có 4 thuộc tính.

### Parcelize
[**Parcelize**](https://github.com/Kotlin/KEEP/blob/master/proposals/extensions/android-parcelable.md) được JetBrains  giới thiệu  trong phiên bản Kotlin 1.1.4, vậy nó là gì?
> A compiler extension can generate serialization/deserialization logic for all properties in a primary constructor of a class marked with a special annotation
> 
Một trình triển khai Parcelable tự động. Khai báo các thuộc tính được serialized  trong  constructor và các phương thức writeToParcel()  createFromParcel() sẽ được tạo tự động bằng cách sử dụng Anotation @[Parcelize](https://github.com/Kotlin/KEEP/blob/master/proposals/extensions/android-parcelable.md).

Đây là một tính năng thử nghiệm tại thời điểm này, vì vậy chúng ta cần thêm đoạn sau vào file build.gradle(Module:app):
```java
androidExtensions {
 experimental = true
}
```

Với data class Person:
```kotlin
@Parcelize
data class PersonParcelize(val name: String, val age: Int, val email: String, val phone: Long) : Parcelable
```

Awesome đúng không nào? Không còn những đoạn code được tự động genarate nữa, class trở nên ngắn gọn, từ 28 dòng giờ đây chỉ còn 2 dòng . Tất cả code được dùng để implement Parcelable được tạo bởi Annotation Processor, chúng ta không cần quan tâm tới nó nữa :).

Một lần nữa, Kotlin thực hiện một công việc tuyệt vời giúp chúng ta thoát khỏi genarated code không cần thiết.



----


### Tài liệu tham khảo
Bài viết được dịch từ : 

https://proandroiddev.com/parcelable-in-kotlin-here-comes-parcelize-b998d5a5fcac

https://proandroiddev.com/kotlin-data-classes-enough-boilerplate-c4647e475485