Buồn quá mọi người ạ, bài trước publish rồi mà Viblo bị dính quả bug to quá nên bài viết từ 18-05 đến 20-05 của mọi tài khoản đều bị mất hết rồi. Lại phải cụm cụi viết lại đây ạ. Thôi ta hãy vào nội dung bài học để vượt qua nỗi buồn này vậy :sob::sob::sob:

Khám phá cách làm cho code Android của bạn clean hơn và dễ hiểu hơn với các design patterns phổ biến khi lập trình Android.

Bài viết này sẽ giới thiệu các `Design Patterns và App Architectures` phổ biến nhất mà bạn có thể sử dụng trong khi phát triển ứng dụng. Hiểu đơn giản thì `Design patterns` là giải pháp có thể tái sử dụng cho các vấn đề phần mềm thông thường. Còn `App Architecture` cung cấp giải pháp cho các vấn đề về luồng dữ liệu hoặc khả năng mở rộng của ứng dụng.

Đây không phải là danh sách đầy đủ về `Design Patterns và App Architectures` hay một bài viết học thuật sâu xa. Thay vào đó, bài viết này đóng vai trò là "tài liệu tham khảo thực hành" và là điểm khởi đầu để bạn có thể học hỏi thêm. MÌnh sẽ cố liên hệ chúng với những thứ mà bạn có thể thấy ở trong Android. Thôi nói phét vậy là đủ rồi bắt đầu ngay thôi nào 

![](https://santiagoaragonhome.files.wordpress.com/2019/10/captura-de-pantalla-2019-10-21-a-las-17.58.25.png?w=499)

# Getting Started 
Tất nhiên đầu tiên chúng ta nên biết qua khái niệm Design Pattern là cái quần què gì. Vâng search google và bạn sẽ thấy cả tá định nghĩa khác nhau. Nhưng nói một cách đơn giản, design pattern là các mẫu thiết kế có sẵn, dùng để giải quyết một vấn đề nào đó. Áp dụng mẫu thiết kế này sẽ làm code dễ bảo trì và dễ mở rộng hơn. Khái niệm thì nhiều ông khác nhau mỗi ông một ý này nọ nhưng ông nào thì cũng chia ra là ba loại này mà thôi : 

* **Creational patterns**: Cách bạn tạo ra objects (create)
* **Structural patterns**: Cách bạn bố cục objects (compose)
* **Behavioral patterns**: Cách bạn điều phối các tương tác của objects (coordinate)

Các design patterns thường xử lý các đối tượng. Chúng trình bày một giải pháp cho một vấn đề đang tái diễn mà một đối tượng hiển thị và giúp loại bỏ các vấn đề thiết kế cụ thể. Nói cách khác, chúng đại diện cho những thách thức đã từng xảy ra quá nhiều lần trong quá khứ mà những develoer đã phải đối mặt. Rồi họ nghĩ ra các phương pháp ngăn cản bạn đi " phát minh lại bánh xe " bằng cách chỉ cho bạn những cách đã được chứng minh để giải quyết những vấn đề đó.

Trong các phần tiếp theo, mình sẽ cover các pattern này theo từng danh mục và xem cách chúng áp dụng cho Android:

**Creational Patterns**

* Builder
* Dependency Injection
* Singleton
* Factory

**Structural Patterns**
* Adapter
* Facade
* Decorator
* Composite

**Behavioral Patterns**

* Command
* Observer
* Strategy
* State
# Creational Patterns
"Khi tôi cần một đối tượng đặc biệt phức tạp, làm cách nào để lấy một instance của nó? "

Tất nhiên bạn hy vọng câu trả lời không phải là "Chỉ cần sao chép và dán cùng một đoạn code mỗi khi bạn cần một instance của object đó". Thay vào đó, các `Creational Pattern` làm cho việc tạo đối tượng trở nên đơn giản và có thể lặp lại.
## Builder
Bạn rủ crush đi ăn bánh ở 1 nhà hàng nọ, nhà hàng kêu bạn lựa chọn chiếc sandwich của riêng mình: bạn chọn bánh mì, nguyên liệu và gia vị mà bạn muốn trên bánh mì lấy từ menu. Mặc dù menu hướng dẫn bạn tạo ra chiếc bánh sandwich của riêng mình, nhưng bạn chỉ điền vào biểu mẫu và giao nó cho quầy. Bạn không xây dựng bánh sandwich, chỉ tùy chỉnh và tiêu thụ nó.

Tương tự như vậy, mẫu Builder đơn giản hóa việc tạo các đối tượng, như cắt bánh mì và xếp dưa chuột. Như vậy, cùng một quá trình xây dựng có thể tạo ra các đối tượng của cùng một lớp với các thuộc tính khác nhau.

Trong Android, một ví dụ về mẫu Builder là AlertDialog.Builder:
```kotlin
AlertDialog.Builder(this)
  .setTitle("Metaphorical Sandwich Dialog")
  .setMessage("Metaphorical mesage to please use the spicy mustard.")
  .setNegativeButton("No thanks") { dialogInterface, i ->
    // "No thanks" action
  }
  .setPositiveButton("OK") { dialogInterface, i ->
    // "OK" action
  }
  .show()
```

Trình tạo này tiến hành từng bước và chỉ cho phép bạn chỉ định các phần của AlertDialog mà bạn cần chỉ định. Hãy xem document của [AlertDialog.Builder](https://developer.android.com/reference/android/app/AlertDialog.Builder.html). Bạn sẽ thấy có khá nhiều lệnh để lựa chọn khi xây dựng AlertDialog của mình.

Đoạn code ở trên tạo ra cảnh báo sau:
![](https://koenig-media.raywenderlich.com/uploads/2021/02/Screen-Shot-2021-02-02-at-22.24.24-e1612308752161.png)

Một tập hợp các lựa chọn khác nhau sẽ dẫn đến một chiếc bánh sandwich hoàn toàn khác.
## Dependency Injection
`Dependency Injection` giống như khi chuyển vào một căn hộ được trang bị nội thất. Mọi thứ bạn cần đều đã có. Bạn không cần phải đợi công ty nội thất giao đồ đạc mà đã có sẵn thứ mình cần rồi.

![](https://toidicodedao.files.wordpress.com/2015/09/ioc-and-mapper-in-c-1-638.jpg?w=638&h=372&crop=1)
Theo thuật ngữ hàn lâm thì Dependency Injection có nghĩa là bạn cung cấp bất kỳ đối tượng bắt buộc nào để khởi tạo đối tượng mới. Đối tượng mới này không cần phải tự xây dựng hoặc tùy chỉnh các đối tượng khác. 

Trong Android, bạn có thể thấy mình cần truy cập cùng một đối tượng phức tạp từ nhiều điểm khác nhau trong ứng dụng của mình, chẳng hạn như network client , image loader hoặc `SharedPreferences` để lưu trữ cục bộ. Bạn có thể **inject** đối tượng này vào các activities và fragments của mình và truy cập chúng ngay lập tức.

Hiện tại, có ba thư viện chính để dependency injection: [Dagger 2](https://developer.android.com/training/dependency-injection/dagger-basics), [Dagger Hilt](https://developer.android.com/training/dependency-injection/hilt-android) và [Koin](https://insert-koin.io). Hãy xem một ví dụ với Dagger. Trong đó, bạn chú thích một lớp bằng `@Module` và dùng  `@Provides` để tạo ra instance của hàm trả về:
```kotlin
@Module
class AppModule(private val app: Application) {
  @Provides
  @Singleton
  fun provideApplication(): Application = app

  @Provides
  @Singleton
  fun provideSharedPreferences(app: Application): SharedPreferences {
    return app.getSharedPreferences("prefs", Context.MODE_PRIVATE)
  }
}
```

Mô-đun trên tạo và cấu hình tất cả các đối tượng được yêu cầu. Bạn có thể tạo nhiều mô-đun được phân tách theo chức năng.

Sau đó, bạn tạo `Component` interface để liệt kê các mô-đun của bạn và các lớp bạn sẽ inject vào:

```kotlin
@Singleton
@Component(modules = [AppModule::class])
interface AppComponent {
  fun inject(activity: MainActivity)
  // ...
}
```
Các component liên kết với nhau nơi các dependencies xuất hiện : các mô-đun và nơi chúng sẽ đến: các điểm inject .

Cuối cùng, bạn sử dụng anotation @Inject để yêu cầu dependency  bất cứ nơi nào bạn cần, cùng với lateinit để khởi tạo thuộc tính non-nullable sau khi bạn tạo đối tượng chứa:
```kotlin
@Inject lateinit var sharedPreferences: SharedPreferences
```
Ví dụ: bạn có thể sử dụng điều này trong MainActivity của mình và sau đó sử dụng bộ nhớ cục bộ, mà Activity không cần biết đối tượng SharedPreferences ra đời như thế nào.

Phải thừa nhận rằng đây là một tổng quan được đơn giản hóa, nhưng bạn có thể đọc tài liệu [Dagger](http://google.github.io/dagger/) để biết thêm chi tiết triển khai. Bạn cũng có thể nhấp vào các liên kết ở trên trong các thư viện được đề cập để có các hướng dẫn chuyên sâu cho từng chủ đề nhé chứ mình cũng không thể nói chi tiết hết được.
## Singleton
Mẫu Singleton chỉ định rằng chỉ một single instance của một class nên tồn tại với global access point. Mô hình này hoạt động tốt khi mô hình hóa các đối tượng trong thế giới thực chỉ với một instance. Ví dụ: nếu bạn có một object tạo kết nối mạng hoặc cơ sở dữ liệu, việc có nhiều hơn một instance của dự án có thể gây ra sự cố và kết hợp dữ liệu. Đó là lý do tại sao trong một số trường hợp, bạn muốn hạn chế việc tạo nhiều instance. 

Từ khóa `object`trong Kotlin khai báo một singleton mà không cần chỉ định một static instance như trong các ngôn ngữ khác
```kotlin
object ExampleSingleton {
  fun exampleMethod() {
    // ...
  }
}
```


Khi bạn cần truy cập các thành viên của đối tượng singleton, bạn thực hiện như sau:
```kotlin
ExampleSingleton.exampleMethod()
```

Bên cạnh đó , `INSTANCE` static field hỗ trợ đối tượng Kotlin. Vì vậy, nếu bạn cần sử dụng một đối tượng Kotlin từ mã Java, bạn sửa đổi lệnh gọi như sau:
```java
ExampleSingleton.INSTANCE.exampleMethod();
```

Bằng cách sử dụng từ khóa `object`, bạn sẽ biết mình đang sử dụng cùng một instance của lớp đó trong toàn bộ ứng dụng của mình.

Cách thứ hai là bạn có thể sử dụng `companion object` để tạo ra singleton

```kotlin
class AQIRepository private constructor(
    val remote: AQIDataSource
) : AQIDataSource {

    companion object {
        private var instance: AQIRepository? = null
        fun getInstance(remote: AQIDataSource) =
            instance ?: AQIRepository(remote).also { instance = it }
    }
}
```

Singleton có lẽ là mô hình dễ hiểu nhất ban đầu nhưng có thể dễ bị lạm dụng và lạm dụng một cách nguy hiểm. Vì nó có thể truy cập được từ nhiều đối tượng, singleton có thể trải qua các tác dụng phụ không mong muốn mà lại khó theo dõi, đó chính là điều mà bạn không muốn trong tương lai phải đối mặt. Điều quan trọng là phải hiểu rõ mẫu, nhưng các mẫu thiết kế khác có thể an toàn hơn và dễ bảo trì hơn.
## Factory
Cái tên đã nói lên , Factory xử lý tất cả logic sáng tạo của đối tượng. Trong mẫu này, một lớp Factory sẽ kiểm soát đối tượng nào cần khởi tạo. Factory pattern có ích khi xử lý nhiều đối tượng thông thường. Bạn có thể sử dụng nó ở những nơi bạn không muốn chỉ định một lớp cụ thể.
![](https://miro.medium.com/max/1284/0*EHfPcBw2BRhHoXzA.jpg)
Hãy xem đoạn mã dưới đây để hiểu rõ hơn:
```kotlin
// 1
interface HostingPackageInterface {
  fun getServices(): List<String>
}

// 2
enum class HostingPackageType {
  STANDARD,
  PREMIUM
}

// 3
class StandardHostingPackage : HostingPackageInterface {
  override fun getServices(): List<String> {
    return ...
  }
}

// 4
class PremiumHostingPackage : HostingPackageInterface {
  override fun getServices(): List<String> {
    return ...
  }
}

// 5
object HostingPackageFactory {
  // 6
  fun getHostingFrom(type: HostingPackageType): HostingPackageInterface {
    return when (type) {
      HostingPackageType.STANDARD -> {
        StandardHostingPackage()
      }
      HostingPackageType.PREMIUM -> {
        PremiumHostingPackage()
      }
    }
  }
}
```

Cùng phân tích đoạn code kia nào
1. Đây là base interface cho tất cả các gói dịch vụ lưu trữ.
2. Enum này chỉ định tất cả các loại gói lưu trữ.
3. `StandardHostingPackage` tuân theo interface và triển khai phương thức cần thiết để liệt kê tất cả các dịch vụ.
4. `PremiumHostingPackage` tuân theo interface và triển khai phương thức cần thiết để liệt kê tất cả các dịch vụ.
5. `HostingPackageFactory` là một lớp singleton có helper method.
6. `GetHostingFrom` bên trong `HostingPackageFactory` chịu trách nhiệm tạo tất cả các đối tượng.

Bạn có thể sử dụng nó như thế này:
```kotlin
val standardPackage = HostingPackageFactory.getHostingFrom(HostingPackageType.STANDARD)
```
Nó giúp giữ tất cả việc tạo đối tượng trong một lớp. Nếu được sử dụng không thích hợp, một lớp Factory có thể bị cồng kềnh do quá nhiều đối tượng. Việc kiểm tra cũng có thể trở nên khó khăn vì bản thân lớp factory chịu trách nhiệm cho tất cả các đối tượng
# Structural Patterns
“Khi tôi mở rộng một lớp ,làm thế nào để tôi sẽ nhớ nó đang làm gì và nó được kết hợp với nhau như thế nào?” 

Trong tương lai, bạn chắc chắn sẽ đánh giá cao các Structural Patterns mà bạn đã sử dụng để tổ chức các lớp và đối tượng của mình thành những cách sắp xếp quen thuộc thực hiện các tác vụ điển hình. Adapter và Facade là hai mẫu thường thấy trong Android.
## Adapter
![](https://www.ivaylopavlov.com/wp-content/uploads/2018/04/old-soft-dev.jpg)
Một cảnh nổi tiếng trong bộ phim Apollo 13 có cảnh một đội kỹ sư được giao nhiệm vụ lắp một cái chốt hình vuông vào một cái lỗ tròn. Nói một cách ẩn dụ, đây là vai trò của một Adpater. Một ví dụ đời thường hơn chính là những củ sạc điện thoại hay máy tính của các bạn. Nguồn điền 220V sẽ được biến đổi để phù hợp với điện áp của thiết bị . Chứ cắm trực tiếp thì nổ banh nóc nhà mất. Theo thuật ngữ phần mềm, mẫu này cho phép hai lớp không tương thích hoạt động cùng nhau bằng cách chuyển đổi giao diện của một lớp thành giao diện mà khách hàng mong đợi.

Trong Android thì tất nhiên là Adapter của Recycleview, ListView,.. rồi 

Item trong recycler view của bạn có thể thiên biến vạn hóa đủ loại hình hài, mà adapter của Android thì chỉ không thể biết trước là bạn sẽ draw view như thế nào cả. Điều cần làm giờ là bạn phải tận dụng cái đủ và biến đổi nó. Nhớ là cái mới sẽ kế thừa cái cũ. 

Trong trường hợp này, bạn có thể sử dụng một lớp con của RecyclerView.Adapter và triển khai các phương thức bắt buộc để làm cho mọi thứ hoạt động:
```kotlin
class TribbleAdapter(private val tribbles: List<Tribble>) : RecyclerView.Adapter<TribbleViewHolder>() {
  override fun onCreateViewHolder(viewGroup: ViewGroup, i: Int): TribbleViewHolder {
    val inflater = LayoutInflater.from(viewGroup.context)
    val view = inflater.inflate(R.layout.row_tribble, viewGroup, false)
    return TribbleViewHolder(view)
  }

  override fun onBindViewHolder(viewHolder: TribbleViewHolder, itemIndex: Int) {
    viewHolder.bind(tribbles[itemIndex])
  }

  override fun getItemCount() = tribbles.size
}
```

RecyclerView không biết Tribble là gì. Thay vào đó, công việc của Adapter là xử lý dữ liệu và gửi lệnh`bind` đến đúng `ViewHolder`
## Facade
Mẫu Facade cung cấp giao diện cấp cao hơn giúp một tập hợp các giao diện khác dễ sử dụng hơn. Sơ đồ sau minh họa ý tưởng này chi tiết hơn:
![](https://koenig-media.raywenderlich.com/uploads/2021/02/facade.png)
Nếu Activity của bạn cần một list book , thì Activity có thể yêu cầu một đối tượng duy nhất cho danh sách đó mà không cần hiểu hoạt động bên trong của local storage, bộ nhớ cache và API client. Ngoài việc giữ cho code Activity và Fragment của bạn rõ ràng và ngắn gọn, điều này cho phép tương lai thực hiện bất kỳ thay đổi bắt buộc nào đối với việc triển khai API mà không ảnh hưởng đến Activity.

[Square’s Retrofit](https://square.github.io/retrofit/)  là một thư viện giúp bạn triển khai mẫu Facade ( Đừng nói là bạn không biết thư viện này nhé). Bạn tạo một interface để cung cấp dữ liệu API như sau:
```kotlin
interface BooksApi {
  @GET("books")
  fun listBooks(): Call<List<Book>>
}
```

Client chỉ cần gọi listBooks () để nhận danh sách các đối tượng Book trong callback mà không cần quan tâm đằng sau nó làm gì . Nó rất clean.

Điều này cho phép bạn thực hiện tất cả các loại tùy chỉnh bên dưới mà không ảnh hưởng đến client . Ví dụ: bạn có thể chỉ định một trình giải mã JSON tùy chỉnh ( GsonConverterFactory, RxJavaConverter)  mà Activity không có manh mối về nó cả :
```kotlin 
val retrofit = Retrofit.Builder()
  .baseUrl("http://www.myexampleurl.com")
  .addConverterFactory(GsonConverterFactory.create())
  .build()

val api = retrofit.create<BooksApi>(BooksApi::class.java)
```

Với Retrofit, bạn có thể tùy chỉnh thêm các hoạt động với `Interceptor` và `OkHttpClient` để kiểm soát bộ nhớ đệm và logging behavior mà client không biết điều gì đang xảy ra.

Mỗi đối tượng càng biết ít về những gì đang diễn ra đằng sau nó, thì tương lai càng dễ dàng quản lý các thay đổi trong ứng dụng.

## Decorator
Mẫu Decorator tự động gắn các trách nhiệm bổ sung vào một đối tượng để mở rộng chức năng của nó trong thời gian chạy. 

Nó cho phép người dùng thêm chức năng mới vào đối tượng hiện tại mà không muốn ảnh hưởng đến các đối tượng khác. Kiểu thiết kế này có cấu trúc hoạt động như một lớp bao bọc (wrap) cho lớp hiện có. Mỗi khi cần thêm tính năng mới, đối tượng hiện có được wrap trong một đối tượng mới (decorator class). 

Hãy xem ví dụ dưới đây: Nó tương tự như bạn đặt trà sữa mà thêm topping thì tính tiền sẽ khác nhau đó.
```kotlin 
//1
interface MilkTea {
  fun getIngredient(): String
}

//2
class BaseMilkTea : MilkTea {
  override fun getIngredient(): String {
    return "Black Tea, Milk & Ice"
  }
}

//3
open class MilkTeaDecorator(protected var milkTea: MilkTea) : MilkTea {
  override fun getIngredient(): String {
    return milkTea.getIngredient()
  }
}

//4
class Pearl(milkTea: MilkTea) : MilkTeaDecorator(milkTea) {
  override fun getIngredient(): String {
    return milkTea.getIngredient() + ", Pearl"
  }
}

//5
class Pudding(milkTea: MilkTea) : MilkTeaDecorator(milkTea) {
  override fun getIngredient(): String {
    return milkTea.getIngredient() + ", Pudding"
  }
}
```
Phân tích qua đoạn code trên:

1. `MilkTea` interface giúp ta biết các thành phần của nó ( ingredients)
2. Mọi món `milkTea` đều cần ban đầu có trà sữa và đá . Trong code như bạn thấy là  là `Black Tea, Milk & Ice`, do đó ta có `BaseMilkTea`.
3. Một `MilkTeaDecorator` giúp thêm nhiều topping hơn vào `BaseMilkTea`.
4.  `Pearl` kế thừa từ `MilkTeaDecorator`. Nếu như bạn muốn thêm trân châu
5. `Pudding` kế thừa từ `MilkTeaDecorator`. Nếu như bạn muốn thêm pudding.

Bằng cách sử dụng lớp MilkTeaDecorator, bạn có thể mở rộng milkTea của mình một cách dễ dàng mà không cần phải thay đổi BaseMilkTea. Bạn cũng có thể xóa hoặc thêm bất kì thư gì vào milkTea trong thời gian chạy. Đây là cách bạn sử dụng nó:

```kotlin
val puddingMilkTea = Pudding(Pearl(BaseMilkTea()))
print(puddingMilkTea.getIngredient()) // Black Tea, Milk & Ice, Pearl, Pudding
val pearl = Pearl(BaseMilkTea())
print(pearl.getIngredient()) // Black Tea, Milk & Ice, Pearl
```
Vâng chắc mấy ông dev **Now** cũng code vậy cũng nên nhỉ =)). Giờ bạn đã có cốc trà sữa của mình rồi. 

Mlem Mlem ![](https://file.hstatic.net/1000135323/file/tra_sua_ngon_0e87236e4d7442fb826c502798ec6f7e_1024x1024.jpg)
# Composite
Chúng ta sử dụng mẫu Composite khi muốn biểu diễn một cấu trúc dạng cây (tree-like) bao gồm các đối tượng đồng nhất. Một mẫu Composite có thể có hai loại đối tượng: composite và leaf. Một composite object có thể có các đối tượng khác, trong khi một đối tượng lá là đối tượng cuối cùng. Nó tương tự như phân loại file trong máy tính của chúng ta vậy 

![](https://gpcoder.com/wp-content/uploads/2017/12/folder-stucture.png)

Hãy xem đoạn mã sau để hiểu rõ hơn:
```kotlin
//1
interface FileComponent {
  fun getName(): String
}

//2
class PNG(private val name: String) : FileComponent {
  override fun getName(): String {
    return name +".png"
  }
}
//2
class PDF(private val name: String) : FileComponent {
  override fun getName(): String {
    return name +".pdf"
  }
}

//3
class Folder(private val name: String) : FileComponent {
  private val files = arrayListOf<FileComponent>()

  override fun getName(): String {
    return name + ", " + files.map { it.getName() }.joinToString(", ")
  }

  fun addFile(member: FileComponent) {
    files.add(member)
  }
}
```
Trong đoạn mã trên, ta có:

1. `Component`, một `Entity` giao diện trongComposite pattern.
1. Một `PNG` class hay `PDF` class triển khai một Entity. Đó là một `Leaf`.
1. `Folder` cũng triển khai một Entity interface . Đó là `Composite`.

Về mặt logic và kỹ thuật, Folder có thể thêm PNG hay PDF vào. Đây là cách bạn sử dụng nó:
```kotlin
val composite = Folder("Disk D ")
val donwnloadComposite = Folder("Download")
val image = PNG("hotgirl")
val docunemnt = PDF("hotboy")
donwnloadComposite.addFile(image)
donwnloadComposite.addFile(docunemnt)
composite.addEmployee(donwnloadComposite)
print(composite.getName()) // Disk D , Download, hotgirl.png, hotboy.pdf
```
Vậy là chúng ta đã tìm hiểu được một phần hai chặng đường của series lần này rồi đấy. Bài viết không đi quá sâu phân tích các design pattern mà chủ yếu cố liên hệ nó với những code Android hàng ngày của mọi người. Nó được dịch từ bài viết của tác giả [Aaqib Hussain và Matt Luedk](https://www.raywenderlich.com/18409174-common-design-patterns-and-app-architectures-for-android#toc-anchor-003)

Hy vọng mọi người thấy hứng thú

Phần về `Behavioral patterns` và `App Architectures` sẽ nằm ở bài số 2 vẫn đang trong quá trình hoàn thiện, mọi người chờ thêm chút thời gian nhé:

Thấy design pattern có ngần ý loại mà đòi học 1 phát hết luôn  : THAM LAM

Thấy design pattern như vậy mà chỉ học có một vài loại : NGU DỐT

Học qua hết rồi mà muốn không thực hành nhưng vẫn còn kiến thức  : CÒN CÁI NỊT, CÒN ĐÚNG CÁI NỊT THÔI.

![](https://media.tinmoi.vn/resize_636x590/upload/thanhdat/2021/05/08/con-cai-nit-la-gi-ma-di-dau-cung-thay-dan-mang-binh-luan-1620456231-7.jpg)

Vậy nên mọi người hãy nghiền ngẫm bài 1 trong thời gian chờ bài số 2 nhé
Cảm ơn sự quan tâm của mọi người !!!