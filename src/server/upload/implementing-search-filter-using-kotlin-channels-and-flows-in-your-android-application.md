## Introduction
Việc biết về Retrofit, Room, và Coroutine là cần thiết cho hướng dẫn này.

<div align="center"><img src="https://images.viblo.asia/ca7c4c9c-0078-4d4c-9aac-526b902e8d00.jpeg" /></div><br />

Phần 1 của hướng dẫn này các bạn có thể tìm thấy ở [đây](https://proandroiddev.com/what-the-flows-build-an-android-app-using-flows-and-live-data-using-mvvm-architecture-4d3ab807b4dd). (Không bắt buộc nếu bạn biết Flows hoạt động như thế nào).

Trong hướng dẫn này, chúng ta sẽ thêm vào search bar cho ứng dụng Android của mình, cái sẽ truy vấn tất cả giống chó trong cơ sở dữ liệu và cập nhật flow(luồng) dựa trên dữ liệu truy vấn sử dụng channels([Mã nguồn ở đây](https://github.com/Shivamdhuria/flows_guide/tree/implementing_search_in_database)).

<div align="center"><img src="https://images.viblo.asia/7d94d123-788d-4c33-bea6-e3d244e69bae.jpeg" /></div><br />

## Current Architecture
Quá trình nhấn vào **Load More** button, chúng ta thực hiện một **[One Shot Request](https://proandroiddev.com/what-the-flows-build-an-android-app-using-flows-and-live-data-using-mvvm-architecture-4d3ab807b4dd)** nhằm lấy một giống cho sử dụng retrofit cái chúng ta sau đó sẽ lưu lại Database sử dụng Room.

Điều này tạo ra một quá trình phát ra(emission) của flow từ database chứa danh sách các loài chó cái sau đó chúng ta **combine**(kết hợp) với một flow khác, chuyển đổi thành Live Data và rồi lắng nghe livedata từ view. Bạn có thể đọc thêm ở [đây](https://proandroiddev.com/what-the-flows-build-an-android-app-using-flows-and-live-data-using-mvvm-architecture-4d3ab807b4dd).

<div align="center"><img src="https://images.viblo.asia/97a265cf-fca7-4999-846d-6f9339d4d8b6.png" /></div><br />

**Note**: Chúng ta sử dụng database như là một Single Source of Truth.

## Implement Search
Trong hướng dẫn này chúng ta sẽ triển khai một search bar, cái sẽ lọc ra các loại chó dựa trên dữ liệu truy vấn được. Trong View hoặc Activity, truyền dữ liệu truy vấn được vào **viewModel.setSearchQuery(it)**.

```
   search.setOnQueryTextListener(object : SearchView.OnQueryTextListener, androidx.appcompat.widget.SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                return true
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                newText?.let { 
                  //Pass Search Query to this function in viewmodel
                  viewModel.setSearchQuery(it) 
                }
                return true
            }
        }
       )
 viewModel.dogListLiveData.observe(this, Observer {
            adapter.submitList(it)
        })
```

## Introducing Channels

Channels là một phần của thư viện Coroutine. Hình dung các channels như một đường ống.
Bạn có thể gửi dữ liệu từ một đầu và rồi nhận dữ liệu từ một đầu khác. Chúng rất giống với Non Blocking Queues và cũng có thể được sử dụng nhằm giao tiếp giữa các coroutines bởi vì chúng hỗ trợ các suspending functions cho quá trình gửi đi cũng như nhận về dữ liệu.

Quá trình triển khai của chúng ta sẽ chỉ yêu cầu một trường hợp sử dụng rất đơn giản của Channels bởi vì chúng ta sẽ không sử dụng bất cứ suspending functions nào cho mục đích này.

Chúng ta sẽ sử dụng một **ConflatedBroadcastChannel** bỏi vì ở đây sẽ chỉ phát ra hầu hết các thành phần được gửi đi gần đây tới tất cả các subscribers.

```
private val searchChanel = ConflatedBroadcastChannel<String>()
//We will use a ConflatedBroadcastChannel as this will only broadcast 
//the most recent sent element to all the subscribers

fun setSearchQuery(search: String) {
//We use .offer() to send the element to all the subscribers.
        searchChanel.offer(search)
    }

//Observe this live Data from view and submit the list in adapter.
 val dogListLiveData = searchChanel.asFlow() //asFlow() converts received elements from broadcast channels into a flow.
        .flatMapLatest { search ->
            //We use flatMapLatest as we don't want flows of flows and 
            //we only want to query the latest searched string.
            mainActivityRepository.getSearchedDogs(search)
        }
        .catch { throwable ->
            _snackbar.value = throwable.message
        }.asLiveData()
```

## Combining and Transforming Flows.
Trong **MainActivityRepository.kt**, kết hợp flow được phát ra bởi database với một flow khác và thực hiện quá trình chuyển hoá dữ liệu trên nó trong **Dispatcher.Default** thread.

```
    fun getSearchedDogs(search: String): Flow<List<Dog>> {
        return dogDao.getSearchedDogs(search) //Get searched dogs from Room Database
            //Combine the result with another flow
            .combine(topBreedsFlow) { dogs, topDogs ->
                dogs.applyToDog(topDogs)
            }
            .flowOn(Dispatchers.Default)
            //Return the latest values
            .conflate()
    }
```

Trong **DogDao.kt** interface.

```
 @Query("SELECT * FROM dog WHERE breed LIKE '%' || :search || '%'")
    fun getSearchedDogs(search: String?): Flow<List<Dog>>

  @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun save(dog: Dog)
```

## And you're done
Bạn đã triển khai một search bar trong một ứng dụng cái sử dụng channels nhằm giao tiếp downstream với database và phát ra một flow sau quá trình lọc kết quả truy vấn.

<div align="center"><img src="https://miro.medium.com/max/283/1*anMn0JVBLngzf1v3Ag7ssg.gif" /></div><br />

## Source
https://proandroiddev.com/implementing-search-filter-using-kotlin-channels-and-flows-in-your-android-application-df7c96e58b19

**[Github repository](https://github.com/Shivamdhuria/flows_guide/tree/implementing_search_in_database)**.

## Reference

**[What the Flows: Build an Android app using Flows, Live Data, and MVVM architecture](https://shivamdhuria.medium.com/what-the-flows-build-an-android-app-using-flows-and-live-data-using-mvvm-architecture-4d3ab807b4dd)**.

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))