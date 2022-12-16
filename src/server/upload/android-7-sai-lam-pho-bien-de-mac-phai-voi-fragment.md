Fragment là 1 thành phần không thể thiếu và cực kỳ quan trọng đối với developer trong lâp trình Android, một sự hiểu biết vững chắc về cách Fragment hoạt động là điều cần thiết khi làm việc với Android Development. Tuy nhiên, Fragment vẫn là một chủ đề phức tạp và người ta thường có thể bỏ sót một thứ gì đó.
Lỗi mắc phải khi làm việc trong Fragment đôi khi rất khó để gỡ lỗi (debug), vì nó không phải lúc nào cũng có thể tái hiện (replicable) do sự kiện vòng đời (lifecycle) phức tạp của nó.
Tuy nhiên, một số vấn đề đó có thể dễ dàng được ngăn chặn trong quá trình coding review. 

Hãy cùng tham khảo 1 số lỗi hay mắc phải dưới đây nhé:

## 1. Create a new Fragment without checking savedStateInstance
Trong Activity (hoặc Fragment), nếu chúng ta có Fragment làm view mặc định, thì chúng ta có thể tạo nó trong onCreate như bên dưới.
```swift:kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    supportFragmentManager.beginTransaction()
        .replace(R.id.container, NewFragment())
        .commit()
}
```

**Why this is not good:**
Sẽ có một vấn đề với đoạn mã trên. Khi activity của bạn bị hủy(killed) và được hệ thống khôi phục, một Fragment mới trùng lặp sẽ được tạo, tức là Fragment đã được khôi phục và một Fragment mới được tạo.

**The correct way:**
Chúng ta nên luôn nhớ bọc nó trong saveInstanceState == null.
```swift:kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    if (savedInstanceState == null) {           
        supportFragmentManager.beginTransaction()
            .replace(R.id.container, NewFragment())
            .commit()
    }
}
```
Điều này sẽ ngăn một Fragment mới được tạo và transacted nếu Fragment hiện có được khôi phục(restored).
Nếu bạn muốn tránh khôi phục, dưới đây là một số[ thủ thuật](https://medium.com/mobile-app-development-publication/manually-override-fragments-auto-restoration-b95bc3f2b89d) (mặc dù không được khuyến nghị cho ứng dụng chuyên nghiệp)

## 2. Create Fragment Owned Object during onCreateView
Đôi khi chúng ta có những object mà dữ liệu tồn tại (lives) trong suốt thời gian tồn tại của Fragment. Chúng ta nghĩ rằng chúng ta có thể tạo nó trong onCreateView, vì điều này sẽ được gọi một lần khi Fragment được tạo hoặc khi Fragment được khôi phục từ trạng thái bị killed.
```markdown:kotlin
private var presenter: MyPresenter? = null
override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?): View? {
    presenter = MyPresenter()
    return inflater.inflate(R.layout.frag_layout, container, false)
}
```

**Why this is not good:**
Tuy nhiên, có một vấn đề với điều này. Nếu fragment này đang được thay thế bằng một fragment khác trong container, thì đoạn đó không bị kill. Object data trong Fragment vẫn còn đó, tức là data của fragment vẫn còn, fragment chỉ bị *destroyView* mà thôi.
Khi fragment được khôi phục (tức là phân đoạn khác bị bật ra), thì *onCreateView* sẽ được gọi lại. Do đó, đối tượng dữ liệu (ví dụ: presenter) sẽ được khởi tạo lại. Và tất cả dữ liệu của bạn được lưu trữ trong đó sẽ được reset.
![](https://images.viblo.asia/647b13c0-58ed-4487-98b7-60f1fc997dc3.png)

**The not so correct way:**
1 Cách làm để giải quyết vấn đề trên nhưng chưa thực sự tốt đó là check null trước khi khởi tạo object
```markdown:kotlin
private var presenter: MyPresenter? = null
override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?): View? {
    if (presenter != null) presenter = MyPresenter()
    return inflater.inflate(R.layout.frag_layout, container, false)
}
```

**The correct way:**
Cách làm đúng nhất đó là khởi tạo object data trong phương thức onCreate()
```swift:kotlin
private var presenter: MyPresenter? = null
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    presenter = MyPresenter()
}
```

Với cách này, đối tượng dữ liệu (object data) sẽ chỉ được tạo một lần sau mỗi lần tạo fragment. 

## 3. Perform state restoration during onCreateView
Chúng ta có thể hiểu rằng trong phương thức onCreateView cung cấp *savedInstanceState*
```swift:kotlin
override fun onCreateView(
    inflater: LayoutInflater, 
    container: ViewGroup?, 
    savedInstanceState: Bundle?): View? {
    if (savedInstanceState != null) {
        // Restore your stuff here
    }
    // ... some codes creating view ...
}
```

Vì vậy, chúng ta nghĩ rằng có thể khôi phục trạng thái của chúng ta ở phương thức này??

**Why this is not good:**
Nhưng điều này có thể gây ra một vấn đề kỳ lạ, trong đó dữ liệu của bạn trong một số fragment (fragment hiển thị không phải trên cùng) trong ngăn xếp bị thiếu nếu:
- bạn có nhiều hơn một fragment trong ngăn xếp (sử dụng API replace fragment thay vì add)
- bạn làm cho ứng dụng của mình xuống background và Restore nó hai lần trở lên
- fragment của bạn bị phá hủy (ví dụ: bởi hệ thống) và được khôi phục

Bạn có thể xem blog dưới đây để biết chi tiết của [vấn đề](https://medium.com/mobile-app-development-publication/bug-that-will-only-surface-when-you-background-your-app-twice-42865a7d0e47)

**The better way**
Cũng giống như mục 2 ở trên, thay vào đó chúng ta nên khôi phục trạng thái trong *onCreate()*
```javascript:kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    if (savedInstanceState != null) {
        // Restore your stuff here
    }
}
```

Điều này gần như chắc chắn rằng trạng thái Fragment của bạn luôn được khôi phục, bất kể view của bạn có được tạo hay không (tức là các fragment đang trong ngăn xếp không được hiển thị, cũng sẽ khôi phục dữ liệu của nó)

## 4. Keep reference to Fragment in Activity
Đôi khi vì lý do nào đó, trong activity của chúng ta (hoặc fragment cha), chúng ta muốn truy cập vào fragment nào đó. Do đó, một cách dễ dàng nhất đó là giữ một tham chiếu đến fragment như bên dưới:
```swift:kotlin
private var myFragment: MyFragment? = null
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    if (savedInstanceState == null) {  
        myFragment = NewFragment()
        supportFragmentManager.beginTransaction()
            .replace(R.id.container, myFragment)
            .commit()
    }
}
private fun anotherFunction() {
    myFragemnt?.doSomething() 
}
```

**Why this is not good**
Fragment có vòng đời của nó. Nó bị giết và khôi phục lại bởi hệ thống. Điều này có nghĩa là fragment cha được tham chiếu không còn nữa.

Nếu chúng ta giữ tham chiếu đến fragment trong activity của mình, chúng ta sẽ cần đảm bảo rằng liên tục cập nhật tham chiếu đến fragment phù hợp và điều này có thể khó khăn nếu bỏ qua.

**The better way**
Sử dụng get fragment thông qua TAG
```swift:kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    if (savedInstanceState == null) {            
        supportFragmentManager.beginTransaction()
            .replace(R.id.container, NewFragment(), FragmentTag)
            .commit()
    }
}
private fun anotherFunction() {
    (supportFragmentManager.findFragmentByTag(FragmentTag) as? 
        NewFragment)?.doSomething()
}
```

Thay vào đó, khi bạn cần truy cập đến 1 fragment nào đó, bạn luôn có thể tìm thấy nó từ  transaction.
Mặc dù đây là một cách khả thi, chúng ta vẫn nên giảm thiểu giao tiếp như vậy giữa fragment và activity (hoặc fragment cha).

## 5. Access the View during onSavedStateInstance of Fragment
Ví dụ dưới đây, chúng ta muốn truy cập một số thông tin của view để lấy thông tin được lưu khi phân đoạn bị hệ thống giết chết:
```swift:kotlin
override fun onSaveInstanceState(outState: Bundle) {            
     super.onSaveInstanceState(outState)
     binding?.myView?.let {
         // doSomething with the data, maybe to save it?
     }
}
```

**Why this is not good**
Hãy thử xem kịch bản dưới đây:
- Nếu fragment không bị giết mà được thay thế bằng một fragment khác, onViewDestroy () của  fragment được gọi (và chúng ta thường đặt ràng buộc = null ở đó).
- onSavedStateInstance không được gọi vì fragment vẫn còn đó. Nhưng view của fragment không còn ở đó nữa.
- Sau đó, trong trường hợp các fragment bị giết bởi hệ thống vào thời điểm đó thì onSaveInstanceState được gọi. Nhưng vì quyền truy cập vào ràng buộc là null, và bất cứ điều gì được dự định thực hiện bởi mã đó sẽ không được thực thi.

**The correct way**
Bất kỳ thứ gì bạn muốn truy cập từ view, nên được thực hiện trước onSavedStateInstance và lưu trữ ở một nơi khác. Tốt hơn là tất cả những điều này được thực hiện trong presenter  hoặc View Model

## 6. Prefer Add Fragment API by default instead of Replace
Để transact một fragment, chúng ta có thể dùng replace và add. Đôi khi chúng ta chỉ tự hỏi chúng ta nên sử dụng cái nào. Có lẽ chúng ta nên sử dụng add vì nó có vẻ hợp lý hơn khi làm như vậy.
```python:kotlin
supportFragmentManager.beginTransaction()
    .add(R.id.container, myFragment)
    .commit()
```

Lợi ích của việc sử dụng add, sẽ đảm bảo chế độ xem của phần dưới cùng trong stack không bị phá hủy và không bao giờ cần phải được tạo lại khi phần trên cùng của stack được pop ra. Dưới đây là một số tình huống mà nó hữu ích.
- khi fragment tiếp theo được thêm vào trên một fragment, cả hai vẫn hiển thị và xếp chồng lên nhau. Nếu bạn có 1 view nửa trong suốt ở phần trên cùng, bạn có thể nhìn thấy phần dưới cùng.
- khi fragment được thêm dưới cùng của bạn là thứ mất nhiều thời gian để load (ví dụ: load webview), bạn muốn tránh nó được tải lại khi fragment trên cùng xuất hiện, khi đó bạn muốn *add* fragment trên cùng thay vì *replace*.

**Why this is not good**
Hai trường hợp được cung cấp ở trên là những trường hợp hiếm. Vì vậy, *add* nên được hạn chế vì có những bất lợi của nó.
- Sử dụng *add* sẽ giữ cho các view của fragment dưới cùng cũng được hiển thị và chiếm nhiều bộ nhớ hơn một cách không cần thiết.
- Việc có nhiều hơn một fragment trong ngăn xếp được *add* vào và hiển thị có thể gây ra sự cố khôi phục trạng thái tại thời điểm khi tất cả chúng được khôi phục cùng nhau. Dưới đây là trường hợp [2 fragment được tải cùng nhau](https://medium.com/mobile-app-development-publication/the-crazy-android-fragment-bug-ive-investigated-252bdcf1ded0) và sử dụng, gây ra sự cố phức tạp và khó hiểu.

**Cách làm ưa thích**
Sử dụng *replace* thay vì *add*, ngay cả đối với fragment đầu tiên được commit. Đối với fragment đầu tiên, cả *replace* và *add* không có sự khác biệt, có thể chỉ sử dụng *replace* để làm cho nó trở thành một cách làm mặc định và phổ biến.

## 7. Use Simple Class Name as TAG for Fragment
Đôi khi chúng ta muốn gắn tag fragment để truy xuất fragment sau này. Chúng ta có thể gắn tag nó đơn giản bằng cách sử dụng simple classname, vì nó rất tiện lợi.
Ví dụ:
```java
supportFragmentManager.beginTransaction()
    .replace(
        R.id.container, 
        fragment, 
        fragment.javaClass.simpleName)
    .commit()
```

**Why this is not good**
Trong Android, chúng ta sẽ làm xáo trộn tên lớp bằng Proguard hoặc DexGuard. Và trong quá trình này, simple classname sẽ bị obfuscate có thể xung đột với các tên lớp khác ([Tham khảo](https://medium.com/mobile-app-development-publication/the-danger-of-using-class-getsimplename-as-tag-for-fragment-5cdf3a35bfe2)), Thực tế nó rất hiếm để xảy ra, nhưng khi nó xảy ra, nó có thể khiến bạn nhổ tóc vì ko biết tại sao đấy =)).

**Cách làm ưa thích**
Thay vào đó, hãy cân nhắc sử dụng một hằng số hoặc canonicalName làm tag. Điều này sẽ đảm bảo tốt hơn và nó sẽ là duy nhất.
```java
supportFragmentManager.beginTransaction()
    .replace(
        R.id.container, 
        fragment, 
        fragment.javaClass.canonicalName)
    .commit()
```

Bài viết đến đây là hết, hy vọng sẽ giúp ích cho các bạn trong qá trình phát triển ứng dụng! Thanks

Tài liệu tham khảo:
https://medium.com/mobile-app-development-publication/7-common-mistakes-easily-made-with-android-fragment-6fc85c44e783