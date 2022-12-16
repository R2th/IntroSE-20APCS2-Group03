![](https://images.viblo.asia/d637e6b7-eaf7-4dcd-8a50-a23905cd1d97.jpg)

>  các bạn chắc là đã làm việc với LiveData trong android rồi đúng không , bài viết này mình sẽ không nói sâu về LiveData  hay là Flow  ( Mình sẽ nói sâu hơn vấn đề này ở phần tới ) , ở đây mình chỉ nói về lợi ích của StateFlow  và tại sao chúng ta nên chuyển từ sử dụng **LiveData** sang **StateFlow** 
<br/>
  <br/>
## I. Tại sao lại không nên sử dụng LiveData  ? 
<br/>
 
Thỉnh thoảng chúng ta có thể sử dụng bị sai ở một vài chỗ  nên có 2 vấn đề lớn hay mắc phải ở đây :
*  > Có thể sử dụng ở mọi nơi  ví dụ như ở tầng repository 
*  > Nó không có sự phân biệt giữa hai hàm setValue() và postValue()

<br/>
  
**vấn đề đầu thứ nhất :** có thể gây ảnh hưởng lớn đến hiệu suất của ứng dụng ( mình sẽ đi sâu về vấn đề này ở phần sau và cách khắc phục khi dùng Flow)

**vấn đề thứ hai :**  điều này có thể gây ra ảnh hưởng lớn khi tải dữ liệu lên UI 
<br/>
  <br/>
  

 --------------------- **Giờ ta cùng nhau vào vấn đề chính thôi nào  :yum::yum:** ----------------------------------
 <br/>
  
 ## II. StateFlow là gì ? 
 <br/>
  
  Theo như anh Kotlin thông báo thì :
  <br/>
  <br/>
  
   > ***StateFlow*** là một luồng có thể quan sát của chủ sở hữu trạng thái phát ra các cập nhật trạng thái hiện tại và mới cho các bộ thu của nó. Giá trị trạng thái hiện tại cũng có thể được đọc thông qua thuộc tính của nó ***value***. Để cập nhật trạng thái và gửi nó đến luồng, hãy gán một giá trị mới cho thuộc tính ***value*** của ***MutableStateFlow*** class.
 
 <br/>
  <br/>
  
 **Chốt lại :** Chúng ta tạm hiểu nôm na là **StateFlow** là thứ có thể giúp chúng ta nhận biết được dữ liệu giống như **LiveData** có thể biết được dữ liệu đang ở trạng thái nào và kiểm tra nó . Dữ liệu cũng giống như **LiveData** sẽ được truy cập thông qua thuộc tính ***value***. Lúc trước chúng ta có class **MutableLiveData** để thực hiện **LiveData** thì giờ ta lại có **MutableStateFlow** thực hiện **StateFlow** , *hình như có sự nhái nhè nhẹ ở đây (chọc chút thôi để giống nhau cho mọi người dễ dùng :stuck_out_tongue_winking_eye:)*
 
 Nhìn một hồi thấy nó giống **LiveData** dễ sợ nhưng có chút khác biệt nhỏ ở đây , các bạn để ý kỹ xem nhé : 
 
 
 ```kotlin
 public interface StateFlow<out T> : SharedFlow<T>
 ```
 
 <br/>
  
Theo như dòng code trên thì nó lại là con của **SharedFlow**  mà thằng này là mở rộng từ thằng **Flow** của **Coroutines**, nên nó có thể có sự kết hợp nhẹ nhẹ với **Coroutines** để cho anh em quẩy tung bành rồi kkk. (Nếu rảnh mình sẽ viết 1 bài **StateFlow** kết hợp **Coroutines** )

* -- Có vẻ đến đây các bạn cũng biết chút khái niệm về **StateFlow** rồi, sau đây mình sẽ nói qua việc chuyển đổi từ **LiveData** sang **StateFlow** nhé 
## III. LiveData to StateFlow
<br/>  

**Chúng ta có 1 bản dựng với LiveData như sau**:

* **PostsFragment**: hiển thị danh sách các bài đăng 
<br/>
* **PostViewModel**: tương tác giữa fragment và repository
<br/>
<br/>

### PostFragment.kt:
 ```kotlin
viewModel.observeState().observe(requireActivity(), Observer {
    renderState(it)
})
private fun renderState(state: PostsState) {
//cật nhật view khi có trạng thái mới 
}
```

<br/>
<br/>

### PostsViewModel.kt:
<br/>

```kotlin
private val state = MutableLiveData<PostsState>()
fun initialize() {
 state.value = PostsState()
  ...
}
fun observeState(): LiveData<PostsState> {
   return state
}
private fun fetchPosts() {
    CoroutineScope(Dispatchers.IO)).launch {
        val posts = repository.getPosts()
        viewModelScope.launch { (1)
            emitNewState(
                getState().copy(
                 loading = false,
                 posts = posts
                )
            )
        }
    }
}
@MainThread
private fun emitNewState(newState: PostsState) {
    state.value = newState
}
private fun getState() = state.value ?: PostsState()
```
<br/>

**(1)** vì khi **setValue** cho **LiveData** ta bắt buộc phải chạy trên **MainThread** chỗ nay ta phải đổi lại *scope* của **Coroutines**

Theo như dòng code trên thì nó lại là con của SharedFlow mà thằng này là mở rộng từ thằng Flow của Coroutines, nên nó có thể có sự kết hợp nhẹ nhẹ với Coroutines để cho anh em quẩy tung bành rồi kkk. (Nếu rảnh mình sẽ viết 1 bài StateFlow kết hợp Coroutines )

-- Có vẻ đến đây các bạn cũng biết chút khái niệm về StateFlow rồi, sau đây mình sẽ nói qua việc chuyển đổi từ LiveData sang StateFlow nhé

### Chuyển sang StateFlow
<br/>

**Cùng với mình chuyển đổi sang StateFlow nhé :**
<br/>

**B1**. "Sự mở đầu muôn thuở " thêm thư viện **coroutine** vào **gradle** : 
<br/>

### app.gradle:
```kotlin
dependencies{
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:${last_version}'
}
```
<br/>
B2: Fix một chút code ở View thôi nào "*PostsFragment.kt*" :

### PostsFragment.kt:

```kotlin
lifecycleScope.launchWhenResumed { (1)
    viewModel.observeState().collect { (2)
        renderState(it)
    }
}
```

 **(1)** : Ở đây chúng ta sẽ sử dụng **launching** của **coroutine** để bọc lại cái phạm vi hoạt động của **StateFlow** và chắc chắn rằng nó sẽ hoạt động khi view nó đang ở trạng thái **RESUMED**
 <br/>
 
 **(2)** :  Chúng ta sẽ quan sát **StateFlow** bằng **collecting** của **flow** bên trong **main thread**
 
 <br/>
 
### PostsViewModel.kt
 <br/>

```kotlin
private val state = MutableStateFlow(PostsState()) (1)
fun initialize() {
  (2)
  ...
}
fun observeState(): StateFlow<PostsState> { (3)
    return state
}
private fun fetchPosts() {
    CoroutineScope(Dispatchers.IO).launch {
        val posts = repository.getPosts()

        val newState = getState().copy(
                loading = false,
                posts = posts
        )
        emitNewState(newState) (4)
    }
}
private fun emitNewState(newState: PostsState) {
    state.value = newState (5)
}
private fun getState() = state.value (6)
```

**(1)** Chúng ta sẽ phải khởi tạo một trạng thái ban đầu khi khởi tạo 1 **StateFlow**
 <br/>

**(2)** Vì chúng ta đã khởi tạo ở 1 nên chỗ này sẽ không cần nữa 
 <br/>

**(3)** Ở đây thay vì chúng ta trả về 1 **LiveData** thì giờ trả về là 1 **StateFlow**
 <br/>
 
**(4)** Điều đơn giản nhất ở đây hơn nữa là : ở trong **coroutines scope** ta có thể cập nhật trạng thái mới ở bất cứ đâu nên sẽ dễ dàng hơn và ít lỗi hơn khi code .
 <br/>

**(5)** Lúc trước **LiveData** đoạn này ta phải cần đổi sang **Main Thread** mới cập nhật được nhưng **StateFlow** thì không cần làm như vậy đơn giản hơn nhiều. 
 <br/>

**(6)** Trái ngược với **LiveData** giá trị của **StateFlow** không thể null , nên chúng ta đỡ phải check null .

Vậy là đã xong  nhanh chóng phải không nào, chúng ta chỉ cần : 
>
>* đặt cho nó 1 **scope croutines** hoạt động và gắn liền với vòng đời của **view**
>* xử lý data trả về thay vì **obsever** thì dùng **collect** của **flow**
>* đổi một chút kiểu dữ liệu trả về tại **ViewModel** là xong 

<br/>

## IV. Tổng kết : 
 Qua đây riêng cá  nhân mình thì thấy nó rất hữu ích và clean code hơn so với **LiveData** nhưng trong khi sử dụng nó phải cẩn thận với **scope** của nó vì có thể gây ra những lỗi bất cẩn có thể là ***crash app***. 
 <br/>

 
**Bằng cách sử dụng StateFlow mình đã thấy lợi ích như này** :
*  không cần để ý đến việc nó đang gửi trạng thái  trên **thread** nào  nên sẽ an toàn cho **thread** 
*  nó nằm bên trong **coroutines** nên dễ dàng kết hợp **coroutines**, đặc biệt có thể sử dụng cho ***coroutines multiplatform***
*  không cần check null như là** LiveData**
*  nếu đang sử dụng **coroutines** hoặc **flow** trong dự án thì việc chuyển đổi này rất dễ dàng và kết hợp khá ăn ý với **coroutines** 
<br/>
<br/>

**Có một vài vấn đề cần chú ý khi sử dụng StateFlow :**
 * **StateFlow**  khá là hay nhưng mình nghĩ chỉ nên sử dụng trong việc cập nhật trạng thái dữ liệu vì mục đích thiết kế nó là "đại diện cho các trạng thái "
 * **StateFlow** chỉ gửi giá trị được gửi gần nhất sẽ được thu thập lại , nếu trường hợp  dữ liệu mới trùng dữ liệu cũ sẽ không được phát ra ( nó kiểm tra thông qua hàm **Any**.**equals()**
 * Khi sử dụng **StateFlow** thì cần phải để tâm mình đang thu thập luồng khi nào và trong luồng nào . Có ví dụ đơn giản : nếu đang sử dụng với **launch()** thay vì sử dụng **launchWhenResumed()** có nghĩa là bạn có thể cập nhật lại dữ liệu được khi **view** đã bị hủy , chính vì thế nên mình khuyên nên đi kèm theo **viewLifecycleScope** để có thể kiểm soát nó một cách tốt hơn .
 <br/>
<br/>
<br/>



 Cảm ơn các bạn đã đọc , vì một cộng động Andoird lớn mạnh hơn mong các bạn có thể cho mình xin review cũng như những bổ sung để mình cải thiện bài viết sau !


Có thể tham khảo thêm từ nguồn sau : https://medium.com/swlh/migrating-from-livedata-to-stateflow-4f28d6889a04