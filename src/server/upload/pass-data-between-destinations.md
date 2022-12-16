#  Mở đầu
- `Navigation` cho phép bạn truyền data khi điều hướng tới 1 điểm đến nào đó, Ví dụ : Bạn từ màn Intro sang màng Detail, thì bạn phải cần truyền tham số để màn Detail dùng nó để gọi api chính xác nó có thể là ID, hoặc tham số nào khác. Nhưng mình khuyên các bạn nên truyền ít dữ liệu, mặt dù các bạn cũng có thể truyền 1 object, class sang. Nếu việc truyền data giữa các màn khi sử dụng trở nên khó khăn, bạn nên nghĩ đến việc sử dụng `viewmodel`, `bundleOf`.
 
 ## Define destination arguments
 - Để truyền data giữa các fragment với nhau, trước tiên hãy xác định tham số của bạn là gì và nó thuộc loại kiểu dữ liệu nào, hãy làm theo các bước dưới đây:
1.  Ở Navigation editor, click `destination` bấm vào fragment nhận data.
2.  Ở `Attributest` panel, click `Add(+)`
3.  Trong cửa sổ `Add Argument Link` xuất hiện, hãy đặt tên cho tham số bạn muốn truyền, kiểu dữ liệu và, click nếu nó có thể null, và cả giá trị mặc định nếu cần thiết.
4.  Click `Add`. Lưu ý rằng tham số bây giờ xuất hiện trong file ngay tại file navigation.xml của bạn, hãy kiểm tra nó nhé.
5.  Tiếp theo, click action tương ứng để tới được fragment chứa argment bạn vừa tạo. 
6.  Hãy kiểm tra lại 1 lần nữa tại file `navigation` của bạn đã có đủ thông số kiểu giữ liệu, dữ liệu default chưa nhé, nếu không thì hãy clean project hoặc rebuild project nếu có nó sẽ tồn tại dưới dạng mẫu dưới đây:
```kotlin
 <fragment android:id="@+id/myFragment" >
     <argument
         android:name="myArg"
         app:argType="integer"
         android:defaultValue="0" />
 </fragment>
 ```
###  Supported argument types
- Dưới đây là các kiểu dữ liệu bạn có thể truyền giữa các fragment: 
![image.png](https://images.viblo.asia/bc341563-73dc-4a04-b1d7-0ee9f8ad9121.png)
*Note : Hãy sử dụng tối đa những type có sẵn trong image nếu bạn muốn truyền kiểu khác nó sẽ xảy ra các `exception`.
- Nếu một số argment có hổ trợ giá trị `null`, bạn có thể khai báo và đặt giá trị `android: defaultValue = "@ null"` . Nếu bạn gặp phải các trường hợp kiểu dữ liệu ngoài và không thể control bằng Parcelables và Serializables thì hãy cân nhắc sử dụng `viewModel` hoặc Sql nhé.
## Use Safe Args to pass data with type safety
- `Navigation Components` có plugin có tên là `Safe Args` tức là tạo ra các lớp đối tượng và tạo đợn giản để điều hướng an toàn kiểu và quyền truy cập vào bất kì đối số liên kết liên quan nào. `Safe Args` được khuyến khích để điều hướng và truyền data. Vì nó đảm bảo an toàn cho `variable`
- Trong 1 số trường hợp, ví dụ: Nếu bạn không sử dụng Gradle, ban không thể sử dụng plugin `Safe Args`. Trong trường hợp này bạn có thể sử dụng Bundle để gói dự liệu và truyền trực tiếp.
- Hãy thêm vào project của bạn bao gồm `classpath` trong tệp `build.gradle` :
```kotlin
buildscript {
    repositories {
        google()
    }
    dependencies {
        def nav_version = "2.3.5"
        classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version"
    }
}
```
- Bạn cũng phải đặt thêm `plugin` với Java
`apply plugin: "androidx.navigation.safeargs"`
- Và với Kotlin
`apply plugin: "androidx.navigation.safeargs.kotlin"`
- Bây giờ hãy kiểm tra bạn đã có `android.useAndroidX=true` trong file `gradle.properties ` của mình khi duy chuyển sang AndroidX hay chưa nhé, nếu chưa hãy move.
- Sau khi Sync project. Hãy tìm hiểu các hàm bạn sẽ sử dụng dưới đây:
* Một class sẽ được tạo ra nhầm mục đích hổ trợ việc truyền data của bạn, Ví dụ nó sẽ tạo ra 1 class tên như thế này `SpecifyAmountFragment`, thì nó sẽ tạo ra 1 class có tên như sau `SpecifyAmountFragmentDirections.` lớp này có phương thức và mỗi action xác định trong đích đầu.
* Đổi với mỗi action được sử dụng để truyền argument, một class bên trong nó được tạo dựa tren action đó. Ví dụ, nếu action đó có tên là `confirmAction`, thì class có tên là `ConfirmationAction`. Nếu action đó bạn chứa các argument mà không có `defaultValue`, thì bạn sử dụng class action được liên kết để đặt giá trị của các argment.
* Một class được tạo cho đích mà bạn muốn truyền argument. Tên của lớp này là tên class nhận và có thêm từ `Args`. Ví dụ ConfirmationFragment -> ConfirmationFragmentArgs. Sử dụng phương thức fromBundle() của class này để get argument.
- Đây là 1 ví dụ cho bạn thấy cách sử dụng các phương thức này get argument và điều gướng.
```kotlin
override fun onClick(v: View) {
   val amountTv: EditText = view!!.findViewById(R.id.editTextAmount)
   val amount = amountTv.text.toString().toInt()
   val action = SpecifyAmountFragmentDirections.confirmationAction(amount)
   v.findNavController().navigate(action)
}
```
- Trong class điểm nhận của bạn, hãy sử dụng phương thức `getArguments`() để lấy từ gói dữ liệu đã được chuyển.
```kotlin
val args: ConfirmationFragmentArgs by navArgs()

override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    val tv: TextView = view.findViewById(R.id.textViewAmount)
    val amount = args.amount
    tv.text = amount.toString()
}
```
## Pass data between destinations with Bundle objects
- Nếu bạn không sử dụng gradle, bạn vẫn có thể chuyển data bằng Bundle.
```kotlin
val bundle = bundleOf("amount" to amount)
view.findNavController().navigate(R.id.confirmationAction, bundle)
```
- Ở điểm nhận của bạn hãy sử dụng phương thức getArguments() để truy xuất gói data và sử dụng data nó trả về:
```kotlin
val tv = view.findViewById<TextView>(R.id.textViewAmount)
tv.text = arguments?.getString("amount")
```
## Kết luận
- Chúc các bạn có thể tìm ra cách giải quyết của mình
- Các bạn hãy apply ngay cho project của mình để thấy sự hiểu quả nhé, vẫn còn cách truyền argument khác các bạn có thể tham khảo tại: https://developer.android.com/guide/navigation/navigation-pass-data#Safe-args  :kissing: