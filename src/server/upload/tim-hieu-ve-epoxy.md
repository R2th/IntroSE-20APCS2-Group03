Epoxy là một thư viện Android để xây dựng các màn hình phức tạp trong RecyclerView. Nó tóm tắt bản soạn sẵn của các item types, item ids, spanc counts và hơn thế nữa, để đơn giản hóa việc xây dựng màn hình với nhiều loại view type. Ngoài ra, Epoxy bổ sung hỗ trợ lưu view state và tự động thay đổi các  items. Epoxy đã giải quyết việc này bằng việc sử dụng Code Genaration (Annotation Processor) để tạo ra builder class và kotlin extention function. 

Các nhà phát triển đã tạo ra Epoxy tại Airbnb để đơn giản hóa quy trình làm việc với RecyclerViews và bổ sung chức năng còn thiếu mà họ cần. Giờ đây, ta có thể sử dụng Epoxy cho hầu hết các màn hình chính trong ứng dụng của mình và nó đã cải thiện trải nghiệm của chúng ta

Giả sử chúng ta có những màn hình này bên dưới, bây giờ hãy tưởng tượng bạn sẽ đạt được nó như thế nào với  RecyclerView Adapter và ViewHolder truyền thống

![](https://miro.medium.com/max/700/1*Dv7ajLhRz8F3oBz6yHrDyQ@2x.png)

Ta sẽ bắt đầu bằng cách tạo RecyclerView Adapter và sau đó là một số ViewHolders. Sau đó, chúng ta sẽ phải sử dụng RecyclerView lồng nhau để tạo carousel ngang. Theo ý kiến của tôi, khá khó để làm việc với RecyclerView lồng nhau vì chúng tôi phải liên kết RecycledPool theo cách thủ công để tăng hiệu suất và cuối cùng bạn có thể sử dụng nhiều data class và sealed classes. Binding adapter bên trong ViewHolder không phải là điều thú vị!

## Setting 

Vì Epoxy sử dụng code generation, ta phải thêm một plugin Gradle cho Kotlin KAPT .

```kotlin
plugins {
    id 'com.android.application'
    id 'kotlin-android'
+   id 'kotlin-kapt'
}

android {
+   kapt {
+       correctErrorTypes = true
+   }
}
```

Giờ hãy thêm dependecy vào build gradle 

```kotlin
dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation "com.google.android.material:material:$material_component_version"
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'

+   implementation "com.airbnb.android:epoxy:$epoxy_version"
+   kapt "com.airbnb.android:epoxy-processor:$epoxy_version"
}
```

## Thinking in Epoxy

Khi chúng ta sử dụng Epoxy, chúng ta có thể coi mọi góc nhìn như một thành phần riêng lẻ và được gọi là EpoxyModel . Một EpoxyModel có thể được sử dụng bên trong bất kỳ EpoxyController nào . Controller là nơi ta kết hợp các mô hình với nhau. Nó tương tự như RecyclerView.Adapter <T>.

![](![image.png](https://images.viblo.asia/1345e81c-cad6-4039-a066-36a293dd2da3.png))
    
Đây là cách nó trông giống như bên trong EpoxyController.
Một trong những điều tốt nhất mà Epoxy cung cấp là chúng ta được phép viết phương thức for-loop và if-else bên trong buildModels. Logic mà chúng ta viết phản ánh những gì chúng ta sẽ nhận được.
    
 ![](https://miro.medium.com/max/700/1*kJRGeOK0IYmfP2yh4NfNPw@2x.png)
    
## Reusability
ViewHolder là độc lập, nhưng bất cứ khi nào bạn muốn sử dụng ViewHolder bên trong bất kỳ khi nào, bạn sẽ phải tự mình đăng ký nó theo cách thủ công bên trong các adapter đó. Đây là những gì Epoxy đã giải quyết bằng cách cô lập tất cả các thành phần đó thành từng và riêng lẻ. Vì vậy, mọi mô hình trong Epoxy là độc lập nên nó có thể được sử dụng trong mọi adapter. Ví dụ, một chỉ báo tải đơn giản có thể được sử dụng trong toàn bộ ứng dụng.
## Epoxy Models
Epoxy Model là một thành phần riêng lẻ mà chúng ta có thể sử dụng bên trong bất kỳ Adapter nào. Nó khá giống với RecyclerView ViewHolder, tuy nhiên, nó cung cấp một số tính năng nâng cao để hoạt động như khoảng cách hiển thị của view type và hơn thế nữa. Có hai cách tiếp cận để tạo Epoxy model.
    
Cách phổ biến nhất là sử dụng tạo một abstract và chú thích nó bằng @EpoxyModelClass(..) để cho phép nó tạo ra class thực thi cho chúng ta. Các class được tạo sẽ có hậu tố là _ ( dấu gạch dưới ). Ví dụ, chúng ta có một cuộc gọi abstarct CardModel vì vậy class được tạo là CardModel_. Một điều cần lưu ý là nếu bạn đang sử dụng Kotlin, nó sẽ tạo ra các chức năng mở rộng DSL mà bạn có thể dễ dàng sử dụng bên trong bất kỳ adapter nào.
    
Phương pháp thứ hai là tạo một class extends EpoxyModelvà ghi đè tất cả các phương thức trừu tượng đó. Cách tiếp cận này có thể khó khăn vì chúng tôi phải thực hiện các phương pháp như getDefaultLayout()và createNewHolder()thủ công.
    
```kotlin
class MyCardModel: EpoxyModelWithHolder<CardModel.CardHolder>() {
    override fun getDefaultLayout(): Int {
        return R.layout.component_card
    }
    
    override fun createNewHolder(parent: ViewParent): CardModel.CardHolder {
        return CardModel.CardHolder()
    }
}
```
    
## Create an EpoxyHolder
    
Về cơ bản nó giống với RecyclerView ViewHolder nhưng cái này dành cho Epoxy.
```kotlin
class CardHolder : EpoxyHolder() {
      lateinit var binding: ComponentCardBinding
          private set
      override fun bindView(itemView: View) {
          binding = ComponentCardBinding.bind(itemView)
      }
  }
```
Phương thức `bindView(itemView: View)` được gọi khi bố cục đã được inflated lần đầu tiên. Phương thức sẽ được gọi một lần, vì vậy chúng ta có thể sử dụng như findViewById(...)để tạo một tham chiếu đến view type của chúng ta, hoặc trong ví dụ này, tôi đã ràng buộc ViewBinding bên trong phương thức đó.
    
## Create a Model from EpoxyHolder
Bắt đầu bằng cách tạo một lớp trừu tượng được chú thích bằng @EpoxyModelClass(layout = R.layout.<layout_name>)cũng được mở rộng vớiEpoxyModelWithHolder<YourHolder>()
    
```kotlin
@EpoxyModelClass(layout = R.layout.component_card)
abstract class CardModel : EpoxyModelWithHolder<CardModel.CardHolder>() {

    @field:EpoxyAttribute
    open var title: CharSequence? = null

    @field:EpoxyAttribute
    open var subtitle: CharSequence? = null

    @field:EpoxyAttribute
    open var imageUrl: String? = null

    @field:EpoxyAttribute(EpoxyAttribute.Option.DoNotHash)
    open var itemClickListener: View.OnClickListener? = null
    
    // Bind our data to view
    override fun bind(holder: CardHolder) {
        holder.binding.apply {
            materialTextViewTitle.text = title
            materialTextViewSubtitle.text = subtitle
            Glide.with(imageView)
                .load(imageUrl)
                .placeholder(R.drawable.placeholder)
                .fitCenter().centerCrop()
                .into(imageView)
            root.setOnClickListener(itemClickListener)
        }
    }

    // Unbind listeners or cancel requests etc.
    override fun unbind(holder: CardHolder) {
        holder.binding.root.setOnClickListener(null)
    }

    class CardHolder : EpoxyHolder() {
        lateinit var binding: ComponentCardBinding
            private set

        override fun bindView(itemView: View) {
            binding = ComponentCardBinding.bind(itemView)
        }
    }
}
```
    
## Props
Props là bất kỳ loại đối tượng nào mà   đã gửi đến các model và những giá trị đó sẽ có sẵn bên trong các model đó. Chúng ta sử dụng @EpoxyAttributeAnnotation để cho biết đó có phải là prop field hay không. Ta cũng có thể sử dụng các thuộc tính đó cho Callback & Listeakers , tuy nhiên phải thêm một tùy chọn cho DoNotHash bên trong đối số của chú thích để Epoxy không băm sai các giá trị.
    
## Lifecycle Methods
Có hai phương pháp quan trọng bên trong EpoxyModels : bind()vàunbind()
* `bind()`: liên kết dữ liệu hoặc trình nghe mà chúng tôi nhận được từ Props tới Holder.
* `unbind()`: hủy bỏ hoặc loại bỏ các tài liệu tham khảo không sử dụng sau khi chủ sở hữu bị phá hủy. Ta có thể sử dụng nó để hủy cancel Image Requests or Dereference Listeners.
    
## Epoxy Controllers
Thành phần controller cho RecyclerView . Model chỉ có thể được sử dụng bên trong controller, vì vậy hãy bắt đầu xây dựng một controller cho các model của ta.
    
`EpoxyAsyncUtil.getAsyncBackgroundHandler()` được sử dụng để nói với Epoxy rằng ta muốn bất kỳ quá trình xây dựng và khác biệt nào được thực hiện trong một background thread thay vì UI thread. Nó cải thiện đáng kể hiệu suất hiển thị của ứng dụng của chúng ta
    
```kotlin
class MenuController : EpoxyController(
    EpoxyAsyncUtil.getAsyncBackgroundHandler(),
    EpoxyAsyncUtil.getAsyncBackgroundHandler()
) {
  override fun buildModels() {
    // TODO: This is where we declare our models.
  }
}
```
    
Sau đó, chỉ đặt các model DSL đã tạo của mình bên trong `buildModel() `phương pháp phù hợp. Chúng ta có thể sử dụng Loop, If-Else bên trong method này.
    
```kotlin
class MenuController : EpoxyController(
    EpoxyAsyncUtil.getAsyncBackgroundHandler(),
    EpoxyAsyncUtil.getAsyncBackgroundHandler()
) {

    private var _currentResult: ResultOf<List<ProductCategory>>? = null

    override fun buildModels() {
        val result = _currentResult

        if (result == null) {
            loaderModelView { id("loader") }
            return
        }

        result.onFailure {
            failureModelView {
                id("failure")
            }
        }

        result.onSuccess(::buildProducts)
    }


    private fun buildProducts(menus: List<ProductCategory>?) {
        if (menus == null) return
        for (item in menus) {

            if (item.children != null) {
                buildProducts(item.children)
            }

            if (item.products == null || item.products.isEmpty()) continue

            largeOverline {
                id(item.id!!)
                value(item.name)
            }

            for (product in item.products.take(3)) {
                card {
                    id(product.productNumber!!)
                    title(product.name)
                    subtitle(product.formCode)
                    imageUrl(product.imageUrlOrNull)
                }
            }

            if (item.products.size > 3) {
                wideButton {
                    id("show-more-${item.id}")
                    text("Show All")
                }
            }
        }
    }

    fun submit(result: ResultOf<List<ProductCategory>>) {
        _currentResult = result
        requestModelBuild()
    }
}
```
    
## Notify Data Changes
    
- Trong Adapter RecyclerView thông thường, sử dụng `notifyDataSetChanged()` hoặc `notifyItemChanged()` để yêu cầu adapter làm các view type và dữ liệu. Tuy nhiên, trong Epoxy, chúng ta chỉ cần gọi `requestModelBuilds() `và Epoxy sẽ có giá trị khác và update của những gì đã thay đổi. Điều này giúp tiết kiệm rất nhiều thời gian!
    
## Diffs
    
Epoxy cung cấp một cách dễ dàng để làm việc với DiffUtil để có được hiệu suất tốt. Epoxy yêu cầu mọi model phải có ID duy nhất của riêng nó để có thể theo dõi item nào là item  nào và item nào đã thay đổi.
    
## Attach Controller to RecyclerView
    
```kotlin
val controller = MenuController()
binding.recyclerView.adapter = controller.adapter
```

## Attach Controller to EpoxyRecyclerView

Epoxy cũng cung cấp cho chúng ta một lớp extends RecyclerView, có một số phương thức hữu ích như `setController()` và `setControllerAndBuildModels()`
    
``` kotlin
val controller = MenuController()
binding.epoxyRecyclerView.setController(controller)
...
// observe data from a ViewModel
viewModel.items.observe(viewLifecycleOwner) { items -> 
   controller.submit(items)
}
```
    
`setControllerAndBuildModels()` là một method để config controller để xây dựng model
```kotlin
val controller = MenuController()
binding.epoxyRecyclerView.setControllerAndBuildModels(controller)
```
    
Ref : https://proandroiddev.com/epoxy-build-declarative-reusable-ui-components-3d10d2b09cb6