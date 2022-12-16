# Giới thiệu:
 - Livedata là một component mạnh mẽ đã được google chính thức giới thiệu trong Android Architecture [Components](https://developer.android.com/topic/libraries/architecture). Những ai đã từng sử dụng component này đều nhận ra sự hữu dụng của nó trong việc notify đến các view khi data thay đổi và tuyệt vời hơn là có thể nhận biết vòng đời của các bên quan sát nó để đảm bảo rằng chỉ gọi update khi chúng còn hoạt động. Là một phần gần như không thể thiếu trong một dự án.
 - Hôm nay mình xin được giới thiệu đến một component nhỏ trong LiveData có giúp chúng ta giải quyết những vấn đề khó một cách đơn giản. Đó là :  `MediatorLiveData`.

## Đặt vấn đề: 
Ở một màn hình, chúng ta có một [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel) nó chứa một LiveData<List<Book>> là list những book được lấy từ [Room](https://developer.android.com/topic/libraries/architecture/room). Và những view của chúng ta sẽ lắng nghe live data này để update UI cho nó. Đơn giản, và hoạt động ngon.
    
```
class BooksViewModel(bookDao: BookDao) : ViewModel() {

    // to make things simpler here, let's skip the repository layer
    val books = bookDao.books()
}
```
![](https://images.viblo.asia/74b5bec5-7fc6-4440-8a98-38883fc89f5f.png)
    
- Và bây giờ, màn hình này cho phép người sử dụng thay đổi thử tự của list sách.
    
![](https://images.viblo.asia/3372fc7c-4d3f-4060-9c61-61fc1571b9a5.png)
    
- Làm thế nào để chúng ta làm điều này. Hiện tại thì view trong màn hình này chỉ lắng nghe 1  LiveData, và dữ liệu mà LiveData đó chứa thì được lấy từ Room vì thế nên chúng ta không thể kiểm soát và thay đổi nó trực tiếp. 
Vậy làm thế nào mà chúng ta có thể làm cho cùng LiveData emit ra list book theo thứ tự khác nhau? Nên nhớ rằng chúng ta cần phải đảm bảo rằng dữ liệu hiển thị của view này vẫn được lấy từ Room.

## Giải quyết vấn đề: 
    
- Và cách đầu tiên mà ai cũng biết (:v) là update từ phần gốc là sửa dữ liệu ở Room theo ý mình và sau đó Room sẽ emit book list đến livedata, view lúc này đang lắng nghe và sẽ update. 
- Vậy vấn đề là gì? nếu chúng ta **không muốn** thay đổi code ở dưới Room và dữ lại tính toàn vẹn dữ liệu. Và đây là lúc sử dụng **MediatorLiveData**.
>    MediatorLiveData : LiveData subclass which may observe other LiveData objects and react on OnChanged events from them.
    
- Mình tạm dịch: MediatorLiveData: là Subclass của Live data, nó có thể lắng nghe sự kiện onChanged của các liveData khác.
- Và như vậy, với MediatorLiveData, chúng ta có thể lắng nghe list book từ Room database và cũng có thể update dữ liệu của nó mà không cần thay đổi dưới Room như sau:
    
```

class BooksViewModel(bookDao: BookDao) : ViewModel() {

    // the LiveData from Room won't be exposed to the view...
    private val dbBooks = bookDao.books()

    // ...because this is what we'll want to expose
    val books = MediatorLiveData<List<Book>>()

    private var currentOrder = ASCENDING

    init {
        // here our MediatorLiveData is basically a proxy to dbBooks
        books.addSource(dbBooks) { result: List<Book>? ->
            result?.let { books.value = sortBooks(it, currentOrder) }
        }
    }

    fun rearrangeBooks(order: BooksOrder) = dbBooks.value?.let {
        // and here we can set the value we want
        books.value = sortBooks(it, order)
    }.also { currentOrder = order }
}
```
- Và bây giờ,  view trong màn hình trên có thể tiếp tục lắng nghe từ một luồng data, và bất cứ khi nào chúng ta gọi viewModel.rearrangeBooks (), cùng một luồng sẽ phát ra một danh sách mới với thứ tự mới.
- Thông thường,mình sẽ tiếp cận MediatorLiveData dưới dạng một LiveData để API của nó không bị rò rỉ cho chế độ xem - và mình đã không làm nó ở đây để giữ cho ví dụ đơn giản và dễ hiểu.
- Và trong trường hợp này chúng ta có thể có 2 LiveData khác nhau từ BookDao và sử dụng MediatorLive để trung gian hóa chúng, đây là một cách code khác:
    
```
class BooksViewModel(bookDao: BookDao) : ViewModel() {

    private val booksAscending = bookDao.booksAscending()
    private val booksDescending = bookDao.booksDescending()

    val books = MediatorLiveData<List<Book>>()

    private var currentOrder = ASCENDING    

    init {
        books.addSource(booksAscending) { result ->
            if (currentOrder == ASCENDING) {
                result?.let { books.value = it }
            }
        }
        books.addSource(booksDescending) { result ->
            if (currentOrder == DESCENDING) { 
                result?.let { books.value = it }
            }
        } 
    }

    fun rearrangeBooks(order: BooksOrder) = when (order) {
       ASCENDING -> booksAscending.value?.let { books.value = it }
       DESCENDING -> booksDescending.value?.let { books.value = it }
    }.also { currentOrder = order }
}
```
--> Ta có thể thấy `MediatorLiveData` lúc này có thể lắng nghe event từ 2 `LiveData` khác. Điều này sẽ làm cho `MediatorLiveData`     trông giống như một "người trung gian hòa giải"(mediator) hơn.  
* Và đây chỉ là cách áp dụng đơn giản để có thể cứu cánh cho một case khó. Ví dụ như khi chúng ta muốn lắng nghe những exception,data từ nhiều luồng khác nhau... trong khi chúng ta đang ở ViewModel và không có `LifecycleOwner` xung quanh, hoặc là kết hợp nhiều `LiveData` lại làm một cho tiện. Cho những trường hợp như vậy, `MediatorLiveData`  chính xác là thứ chúng ta cần tìm kiếm.
    
#  Lời kết:
- Bài viết này mình đã giới thiệu đến các bạn một cách tận dụng thêm sức mạnh của `LiveData`. Api này còn có nhiều tính năng thú vị ở hiện tại và trong tương lai. Chúng ta sẽ tiếp tục tìm hiểu nó ở các bài viết sau nhé.
- Hi vọng bài viết có ích với các bạn. Good luck!
## Tham khảo: 
- MediatorLiveData: https://developer.android.com/reference/android/arch/lifecycle/MediatorLiveData
- MediatorLiveData to the Rescue: https://proandroiddev.com/mediatorlivedata-to-the-rescue-5d27645b9bc3