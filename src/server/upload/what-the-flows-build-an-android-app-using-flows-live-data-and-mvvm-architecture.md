## Introduction
Biết về Retrofit, Room, và Coroutines alf cần thiết cho hướng dẫn này.

<div align="center"><img src="https://images.viblo.asia/ca7c4c9c-0078-4d4c-9aac-526b902e8d00.jpeg" /></div><br />

Trong hướng dẫn này, chúng ta sẽ xây dụng một ứng dụng lấy về dữ liệu giống chó từ **[DogAPI](https://dog.ceo/dog-api/)** sử dụng Retrofit và rồi lưu nó lại data base sử dụng Room. Chúng ta sau đó sẽ sử dụng Flows nhằm hiển thị danh sách chó từ database.

## The first things: What are flows and when do you use one?
***Một Flow là cold asynchronous data stream cái phát ra giá trị một cách tuần tự và kết thúc nó một cách bình thường hoặc với một exception***.

Điều này cơ bản có nghĩa là bạn nên sử dụng Flows khi có một luồng dữ liệu cần được phát ra. Điều này là khá giống với RxJava nếu bạn đã quen thuộc nó từ trước đó.

Một câu hỏi khác cái có thể được nêu ra ở thời điểm này đó là luông dữ liệu này là cái gì?

Hiện tại, các requests(Cái bạn đã tạo ra từ lớp repository) thuộc hai loại chính - One shot hoặc Streams. Để giải thích điều này, tôi sẽ sử dụng ví dụ tương tự như của Google.

Hãy nghĩ về một Tweet. Hiện tại bản thân tweet đó là một One Shot Request. Bạn chỉ cần lấy nó duy nhất một lần và thế là xong. Bạn có thể dễ dàng sử dụng các suspending functions. Tuy nhiên số lượng likes, retweets, và comments là một stream data. Bạn sẽ cần làm mới chúng trong một vòng lặp(mỗi 30 giây) nhằm cập nhật lại các giá trị. Điều này là tình huống hoàn hoả để chúng ta sử dụng Flows.

## Why not just use Live Data instead?
Điều này không có gì sai nếu sử dụng Live Data. Trong tầng repository, bạn luôn có thể thực hiện điều này:

```
livedata {
 while(true){
   emit(service.getLikes())
   delay(10000)
 }
}
```

Tuy nhiên flows là dễ dàng để sử dụng hơn nhiều và được xây dựng chỉ yếu để phục vụ mục đích này. Ở trên cùng các flows cũng có chứa các phương thức cái tạo cho nó một sức mạnh nhằm chuyển đổi, kết hợp các flows và nhiều hơn thế nữa. Chúng ta chỉ sử dụng một chút ít sức mạnh của nó trong một phần mã nguồn rất nhỏ.

## Start Building

Một khi nhấn vào **Load More** button trong MainActivity, chúng ta sẽ tạo ra một network request nhằm lấy về một giống chó sử dụng Dog API. Nếu request này thành công, chúng ta sẽ lưu nó lại cơ sở dữ liệu. Đây là một One Shot Request.

Trong MainAcitivityAPI file, viết vào function này.

```
@GET("breeds/image/random")
suspend fun getRandomDogBreed(): ApiResponse<String>
```

=> ApiResponse là một wrapper class cái chúng ta cần sử dụng cho Response từ [DogAPI](https://dog.ceo/dog-api/documentation/), kiểm tra thêm ở [đây](https://github.com/Shivamdhuria/flows_guide/blob/master/app/src/main/java/com/example/flows/main/data/ApiResponse.kt)).

Giờ đây, trong **MainActivityRepository.kt**, thêm vào function này:

```
 suspend fun fetchAndUpdate(): ResultWrapper {
        val wrappedResult = safeApiCall(Dispatchers.IO) { api.getRandomDogBreed() }
        when (wrappedResult) {
            is ResultWrapper.Success<*> -> {
                val dogResponse = wrappedResult.value as ApiResponse<String>
                val breedImageUrl = dogResponse.message
                val dog = extractBreedName(breedImageUrl)?.let { Dog(it, breedImageUrl) }
                dog?.run {
                    dogDao.save(this)
                }
            }
        }
        return wrappedResult
    }
```

**[safeApiCall](https://github.com/Shivamdhuria/flows_guide/blob/master/app/src/main/java/com/example/flows/extensions/Network.kt)** là một extension function được tạo ra nhằm xử lý HTTP Exceptions từ API và gói lại kết quả vào trong một **ResultWrapper**. Nếu API request này thành công, chúng ta lưu nó vào trong cơ sở dữ liệu và rồi trả về **wrapped result** ở thời điểm kết thúc.

```
dog?.run { dogDao.save(this) }
```

Ở đây, **dogDao** là một interface với một suspend function **save**:

```
@Dao
interface DogDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun save(dog: Dog)
}
```

Giờ đây chúng ta cần gọi function trên trong ViewModel:

```
private val _triggerFetchDogLiveData = MutableLiveData<Int>() 

 fun fetchDogs() {
        _triggerFetchDogLiveData.value = atomicInteger.incrementAndGet()
    }

val fetchedLiveData = _triggerFetchDogLiveData.switchMap {
        liveData {
            emit(mainActivityRepository.fetchAndUpdate())
        }
    }
```

Và giờ từ **MainActivity.kt**, thiết lập một **OnClick Listener** cái gây ra một request và cũng như lắng nghe các kết quả từ **fetcheLiveData**. Nếu bạn chú ý cẩn thận rằng ở đây chỉ sử dụng nhằm hiển thị ra **status** của request(Loading, No internet Connection) và không có dữ liệu lấy được.

```
loadMore.setOnClickListener {
            viewModel.fetchDogs()
        }

viewModel.fetchedLiveData.observe(this, Observer {
            when (it) {
                is ResultWrapper.Loading -> { showLoading(it.isLoading)}
                is ResultWrapper.NetworkError -> showToast("No internet")
            }
        })
```

## Setting up Flows

Trong **DogDao.kt** interface định nghĩa function này:

```
@Query("SELECT * FROM dog")
fun loadAllDogsFlow(): Flow<List<Dog>>
```

Room 2.2 đã được phát hành hỗ trợ flows. Phương thức ở bên trên sẽ trả về một flow về danh sách các con chó. Khi **Load More** button được nhấn trong view, một con chó mới được thêm vào database và bởi vì danh sách các con chó trong database là động(stream), một flow là một lựa chọn hoàn hảo trong trường hợp này.

***Nói một cách khác chúng ta cần sử dụng flow trong trường hợp này bởi vì danh sách các con chó trong database sẽ tiếp tục được cập nhật***.

GIờ đây gọi phương thức này trong **MainActivityRepository.kt**:

```
val dogListFlow = dogDao.loadAllDogsFlow()
```

Trong file **MainViewModel.kt**, chúng ta cần chuyển đổi flow thành Live Data cái chúng ta sẽ lắng nghe ở phía views:

```
val dogListLiveData = mainActivityRepository.dogListFlow.asLiveData()
```

**asLiveData()** là một extension function cái thu thập flow và phát nó ra như là một Live Data.

Và đây, cuối cùng trong MainAcitivity.kt, lắng nghe Live Data bên trên:

```
viewModel.dogListLiveData.observe(this, Observer {
            adapter.submitList(it)
        })
```

Bởi vì hướng dẫn này nhằm mục đích tìm hiểu về flows, nên mã nguồn cho adapters hoặc layouts sẽ không được thêm vào. Bạn có thể tìm thấy toàn bộ mã nguồn trên [github repository](https://github.com/Shivamdhuria/flows_guide).

Tại thời điểm này bạn đã có một ứng dụng cái hiển thị dữ liệu từ databse(Cái là Single Source of Truth) sử dụng flows cái có thể được update bởi quá trình thực thi một one shot request bằng cách nhấn vào **Load More** button bên trong view.

<div align="center"><img src="https://miro.medium.com/max/700/1*tx7-wYcysAGi8JYszFoVwQ.gif" /></div><br />

## Combining Flows

Giờ đây, bên trong **RemoteDataSource.kt** hãy thiết lập một flow khác cái phát ra một danh sách đầu tiên(thực tế là ngẫu nhiên) của 20 con chó sau mỗi 2 giây(Trong thế giới thực, ngữ cảnh này có thể đúng với một network request):

```
fun topDogsFlow() = flow {
        while (true) {
          //Mock a network request that returns a list of dog breeds.
            val list = getDogs().map { it.capitalize() }.shuffled().subList(0, 20)
            emit(list)
            delay(2000)
        }
    }

    private fun getDogs() = listOf<String>(
        "affenpinscher", "african","airedale","akita", "appenzeller","australian", "kelpie",.......
       .... "komondor", "kuvasz", "labrador","mix", "newfoundland","otterhound","papillon",
        "pekinese")
```

Ở đây, trong **MainActivityRepository.kt**, kết hợp flow bên trên với flow lấy danh sách các con chó trong data base sử dụng phương thức **combine**:

```
//Get top Dogs flow    
private val topBreedsFlow = dogsRDS.topDogsFlow()

val dogListFlow = dogDao.loadAllDogsFlow()
//combining the most recently emitted values by each flow.
            .combine(topBreedsFlow) { dogs, topDogs ->
             logCoroutine("inside combine function", coroutineContext)
            //Output: Thread for inside combine function is: DefaultDispatcher-worker-4and the context is [ScopeCoroutine{Active}@7815849, DefaultDispatcher]
              dogs.applyTopDogsToDatabaseList(topDogs)
            }
            .flowOn(Dispatchers.Default)
            .conflate()

     private fun List<Dog>.applyTopDogsToDatabaseList(topDogs: List<String>): List<Dog> {
        return this.map {        
            val isTopDog = topDogs.contains(it.breed.capitalize())
            Dog(it.breed, it.imageUrl, isTopDog)
        }
    }
```

* **combine() {}** trả về một flow của các giá trị được sinh ra với phương thức transform bởi quá trình kết hợp tất cả các giá trị được phát ra hiện tại bởi mỗi flow.
* Trong khi **flowOn(context: CoroutineContext)** thay đổi context nơi mà flow được thực thi và chỉ ảnh hưởng tới các chức năng trước đó cái không có context của riêng nó. Điều này cơ bản có nghĩa là extension function **applyTopDogsToDataBaseList** chạy trong luồng **Dispatcher.Default** bởi vì chúng ta đã sử dụng **.flowOn(Dispatcher.Default)**.
* **.conflate()** đảm bảo rằng bộ phát không bao giờ bị treo ngay cả khi bộ thu bị chậm, nhưng bộ thu luôn lấy được tất cả các giá trị đã được phát ra.

## And That's it.
Bạn đã xây dựng được một ứng dụng lấy về danh sách các loài chó sử dụng một one shot request, lưu nó lại cơ sở dữ liệu và rồi hiển thị danh sách trong data base sử dụng flows, kết hợp nó với một flow khác cái phát ra sau mỗi 2 giây và rồi hiển thị trong danh sách loài cho ở MainAcitivty.

The Top Dogs(Cái được giữ sự thay đổi sau mỗi 2 giây) được hiển thị lại bởi một pink background trong gif bên dưới.

<div align="center"><img src="https://miro.medium.com/max/700/1*bDfKXdDeir_8e3m9WlNyPw.gif" /></div><br />

## Source
https://shivamdhuria.medium.com/what-the-flows-build-an-android-app-using-flows-and-live-data-using-mvvm-architecture-4d3ab807b4dd

## Reference
**[Implementing Search Filter using Kotlin Channels and Flows in your Android Application](https://viblo.asia/p/implementing-search-filter-using-kotlin-channels-and-flows-in-your-android-application-Qpmlebz75rd)**.

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))