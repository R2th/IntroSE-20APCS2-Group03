## Introduction

Data Binding ngày càng phổ biến hơn trong quá trình phát triển các ứng dụng Android bởi vì nó được gia tăng lợi ích bởi kiến trúc MVVM. Nó cho phép bạn bind các thành phần UI trong layouts của mình với các nguồn dữ liệu trong ứng dụng sử dụng một cấu trúc định nghĩa sẵn hơn là việc lập trình. Tự động thông báo về các thay đổi dữ liệu cho UI và nhận lại những thay đổi thuộc tính của nó có phải tuyệt vời hơn không? Do đó hãy xem xét làm thế nào chúng ta có thể bind vào LiveData với one- và two-way binding.

## Why binding to LiveData?

Lợi ích của việc sử dụng các thành phần lifecycle aware như là LiveData bao gồm:
1. **Không có crashes gây ra bởi các Activities dừng hoạt động**. Nếu vòng đời của các đối tượng observers kết thúc như là khi một activity được đẩy vào trong back stach thì nó sẽ không nhận bất cứ sự kiện nào của LiveData.
2. **Thích hợp cho các thay đổi cấu hình(Configuration changes)**. Nếu một activity hoặc fragment bị khởi tạo lại vì một thay đổi cấu hình(ví dụ xoay thiết bị), nó ngay lập tức nhận được dữ liệu tồn tại ở trạng thái cuối cùng.
3. **Không Memory leaks**. Không cần phải sắp xếp các subscriptions bằng tay. Các observers tự thu dọn chính nó khhi mà vòng đời liên quan tới nó bị hủy.

## LiveData VS ObservableFields.

Không giống như những đối tượng cái mà triển khai Observable - như là observeale fields, Các đối tượng LiveData biết về vòng đời của các observers đã đăng kí các sự kiện thay đổi dữ liệu. Cả LiveData và ObservableFields đều lắng nghe các thay đổi, tuy nhiên lợi ích của việc sử dụng LiveData so với cái còn lại được chỉ ra như sau:
1. **Không cần quá trình xử lý vòng đời bằng tay**. Các thành phần UI chỉ lắng nghe dữ liệu liên quan và không dừng hoặc làm mới quá trình lắng nghe. LiveData tự động quản lý tất cả điều này bởi vì nó theo dõi các thay đổi trạng thái vòng đời của đối tượng observer liên quan trong suốt quá trình theo dõi đó.
2. **Có thêm nhiều tính năng với [Transformations](https://developer.android.com/reference/android/arch/lifecycle/Transformations) và [MediatorLiveData](https://developer.android.com/reference/android/arch/lifecycle/MediatorLiveData)**. Quá trình sử dụng LiveData sẽ cho bạn nhiều lợi ích từ sức mạnh của Transformations cũng như thêm nhiều nguồn vào MediatorLiveData. Do đó nếu bạn có 5 EditText views trong layout của mình, bạn không cần lắng nghe cả 5 cái từ Activity hay Fragment của mình. Bạn có thể theo dõi chỉ một MediatorLiveData cái sẽ tiết kiệm cho bạn rất nhiều dòng code và các logic phức tạp.
3. **Quá trình chia sẻ tài nguyên**. Quá trình tạo các đối tượng kế thừa LiveData sẽ cho phép bạn kết nối với hệ thống dịch vụ chỉ một lần, rồi bất cứ observer nào cần tài nguyên cũng có thể chỉ cần theo dõi đối tượng đó.

## Starting using LiveData with Data Binding.

Để sử dụng một đối tượng LiveData cho lớp binding của bạn, bạn cần chỉ rõ lifecycle owner nhằm định nghĩa phạm vị cho đối tượng LiveData. Ví dụ bên dưới trình bày cách làm thế nào để thiết lập Activity như là một lifecycle owner sau khi lớp binding được khởi tạo:
```
// Inflate view and obtain an instance of the binding class.
val binding: MainBinding = DataBindingUtil.setContentView(this, R.layout.main)
// Specify the current activity as the lifecycle owner.
binding.setLifecycleOwner(this)
```

Như vậy giờ đây bạn có thể sử dụng các đối tượng LiveData trong file layout(main.xml) như bên dưới và gí trị của **commentText** sẽ được thiết lập trong thuộc tính text:
```
<android.support.design.widget.TextInputEditText
    android:text="@{viewModel.commentText}" />
```

Trong một vài trường hợp một cảnh báo "... is a boxed field but needs to be un-boxed to excute..." có thể xuất khiện khi sử dụng LiveData trong DataBinding. Điều này chỉ ra rằng loại giá trị của LiveData được sử dụng có thể null. Để loại bỏ cảnh báo này nó khuyến nghị chúng ta sử dụng một kiểu nguyên thủy(ObserableIn thay cho MutableLiveData&lt;Integer&gt;) hoặc sử dụng **safeUnbox** như bên dưới:
```
android:text="@{safeUnbox(viewModel.commentText)}"
```

## Implementing Two-Way Binding.

Two-way binding trở nên tiện dụng trong các trường hợp khi giá trị LiveData được kì vọng được cập nhật từ phía UI. Khi nó được truy cập trong code, chúng ta cần nhận được các giá trị đã được cập nhật từ phía view. Để làm được điều đó chúng ta sẽ thêm **"="** vào trước dấu ngoặc nhọn của biểu thức binding:
```
<android.support.design.widget.TextInputEditText
    android:text="@={viewModel.commentText}" />
```

Giờ đây, mỗi khi user gõ vào một đoạn text mới từ phía view trên màn hình, đối tượng LiveData sẽ được cập nhật và khi truy cập tới giá trị của nó chúng ta sẽ nhận được giá trị được cập nhật cuối cùng.

### Creating a custom Binding Adapter.

Xa hơn nữa, hãy nghĩ về trường hợp thông thường nhất, Hình dung chúng ta sẽ thiết lập tab hiện tại cho một ViewPager thông qua data binding bằng cách sử dụng đối tượng LiveData. Để làm điều đó, chúng ta sẽ tạo một thuộc tính tùy biến **currentTab** cho ViewPager với sự trợ giúp của BindingAdapter:
```
companion object {
   @BindingAdapter("currentTab")
   @JvmStatic 
   fun setNewTab(pager: ViewPager, newTab: MutableLiveData<Int>) {
       newTab.value?.let {
          //don't forget to break possible infinite loops!
          if (pager.currentItem != itemLiveData.value) {       
              pager.setCurrentItem(newTab.value, true)
          }
       }
   }
}
```

Như vậy, giờ đây chúng ta có thể thêm vào thuộc tính mới cho file layout và thiết lập item hiện tại cho ViewPager qua giá trị của đối tượng LiveData:
```
<android.support.v4.view.ViewPager
    app:currentTab="@{viewModel.pagerCurrentTab}"/>
```

Khi giá trị mới được thiết lập cho đối tượng **pagerCurrentTab**, mã nguồn trong thân của BindingAdapter sẽ được thực thi.

### Using Two-Way Binding With Custom Attribute.

Bây giờ, khi quá trình cập nhật giá trị của đối được LiveData được tạo, ViewPager được scroll tới một vị trí mới. Đó là ngoại lệ đúng trong trường hợp thực tế, người dùng cũng tương tác với UI và thay đổi vị trí của ViewPager nhưng đối tượng LiveData vẫn giữ giá trị cũ. Chúng ta muốn thông báo các thay đổi của thuộc tính này để mà thực hiện một vài logic dựa trên nó hoặc chỉ kiểm tra xem giá trị hiện tại. Điều này có thể đạt được bằng cách triển khai **two-way binding**.

Chúng ta sẽ phải thay đổi file layout giống như bên dưới:
```
<android.support.v4.view.ViewPager
    app:currentTab="@={viewModel.pagerCurrentTab}"/>
```

Một sự thay đổi khác sẽ là quá tình tạo thêm một InverseBindingAdapter vào trong BindingAdapter chúng ta đã có. Tại thời điểm này, data binding biết các gì được thực hiện khi dữ liệu thay đổi(nó gọi phương thực được đánh dấu **@BindingAdapter**) và cái gì được gọi khi thuộc tính của view thay đổi(Nó gọi **InverseBindingListener**). Như vậy giờ đây nếu người dùng swipe ViewPager tabs, đối tượng LiveData sẽ được cập nhật với một giá trị mới. Tuy nhiên, để nó biết khi nào và làm sao thuộc tính tahy đổi chúng ta phải đưa vào một event tùy biến. Việc đặt tên các sự kiện mặc định cho thuộc tính sẽ bắt đầu với tiền tố **"AttrChanged"**. Trong trường hợp của chúng ta ní là **currentTabAttrChanged**.
```
companion object {
   @BindingAdapter("currentTab")
   @JvmStatic 
   fun setTab(pager: ViewPager, itemLiveData: MutableLiveData<Int>){
       itemLiveData.value?.let { 
          //don't forget to break possible infinite loops!
          if (pager.currentItem != itemLiveData.value) {      
              pager.setCurrentItem(itemLiveData.value, true)
          }
       }
   }
    @InverseBindingAdapter(attribute = "currentTab", event =                     "currentTabAttrChanged")
    @JvmStatic
    fun getTab(pager: ViewPager) = pager.currentItem
}
```


### A Word of Warning.

Cẩn thận đừng để bị rơi vào vòng lặp vô hạn của việc sử dụng two-way databinding. Khi người dùng thay đổi một thuộc tính, phương thức được đánh dấu **@InverseBindingAdapter** được gọi. Điều này, theo thứ tự, có thể gọi phương thức được đánh dấu **@BindingAdapter**, cái sẽ gây ra một lời gọi khác nhằm tới phương thức được đánh dâu **@InverseBindingAdapter**, và cứ thế....

Vì lý do này, nó là quan trọng nhằm thoát khỏi vòng lặp bằng cách so sánh giá trị cũ và mới trong phương thức được đánh dấu **@BindingAdapter**.

### Some Final Thoughts.

Vòng đời của các thành phần Android là rất phức tạp và có thể được dẫn tới sự cực nhọc khi quản lý bằng tay bởi quá trình giữ cho UI được cập nhật cùng với dữ liệu tài nguyên, do đó việc giới thiệu LiveData là một bước tiến lớn trong việc quản lý vòng đời. Quá trình thêm vào data binding cho project có thể làm cho mã nguồn trở nên ngắn gọn hơn cũng như phản ứng với những thay đổi của dữ liệu tài nguyên có thể được lan truyền một cách tự động tới UI bất chập sự thay đổi cấu hình hoặc trạng thái vòng đời. Tuy nhiên, quá trình sử dụng data binding của bạn không nên bị giới hạn bởi chỉ thiết lập một dữ liệu thuộc tính của model tới text fields. Data Binding với LiveData sử dụng one- hay two-way binding sẽ cho phép bạn tận dụng tối đa mô hình Observer và Lifecycle Aware.

## Source
https://proandroiddev.com/advanced-data-binding-binding-to-livedata-one-and-two-way-binding-dae1cd68530f
## Reference
https://developer.android.com/topic/libraries/data-binding/two-way