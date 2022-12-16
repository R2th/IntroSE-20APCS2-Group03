Hôm nay chúng ta sẽ xem cách sử dụng Retrofit để gọi một API nhiều lần và cancel tất cả các lời gọi trước đó khi thực hiện một cuộc gọi mới. Ngoài ra, chúng ta sẽ thấy cách sử dụng coroutines với Retrofit.

> Use-Case: Khi implement chức năng tìm kiếm trong App - chúng ta request API mỗi khi user nhập nội dung nào đó trong EditText (Cố gắng để việc tìm kiếm được thực hiện trong thời gian thực) và hủy tất cả các lệnh gọi API trước đó.

Đầu tiên, chúng ta cần thêm phụ thuộc `Retrofit` và `Coroutines` vào tệp Gradle. Thêm các dòng này vào `build.gradle` ở App-level:
```
// Retrofit
implementation 'com.squareup.retrofit2:retrofit:2.6.1'
implementation 'com.squareup.retrofit2:converter-gson:2.6.1'
implementation 'com.squareup.okhttp3:logging-interceptor:4.1.1'

// Kotlin Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.3'
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.3'
```

Bây giờ tạo một interface cho retrofit có tên là ApiService.
```
interface ApiService {
    companion object {
        val BASE_URL: String = "https://demo.dataverse.org/api/"
    }

    @GET("search")
    suspend fun getResult(
            @Query("q") query: String?): Response<SearchResultModel?>
}
```

Chúng ta sử dụng API demo từ `https://demo.dataverse.org`, đây là dịch vụ API demo miễn phí chúng ta sử dụng để thử nghiệm. Nó sẽ cung cấp kết quả tìm kiếm theo truy vấn của người dùng.

Chúng ta sử dụng `suspend` function của Kotlin thay vì function thông thường vì chúng ta sẽ sử dụng coroutines để quản lý API.

Bây giờ tạo một `data class` cho API này có tên `SearchResultModel`.
```
data class SearchResultModel(
    val `data`: Data?,
    val status: String?
) {
    data class Data(
        val count_in_response: Int?,
        val items: List<Item?>?,
        val q: String?,
        val spelling_alternatives: SpellingAlternatives?,
        val start: Int?,
        val total_count: Int?
    ) {
        data class Item(
            val checksum: Checksum?,
            val dataset_citation: String?,
            val dataset_id: String?,
            val dataset_name: String?,
            val dataset_persistent_id: String?,
            val file_content_type: String?,
            val file_id: String?,
            val file_type: String?,
            val md5: String?,
            val name: String?,
            val published_at: String?,
            val size_in_bytes: Int?,
            val type: String?,
            val url: String?
        ) {
            data class Checksum(
                val type: String?,
                val value: String?
            )
        }

        class SpellingAlternatives(
        )
    }
}
```

Bây giờ, tạo ra một file `object` nhà cung cấp API có tên `ApiProvider`, đối tượng này sẽ được sử dụng để tạo một retrofit instance:
```
object ApiProvider {
    private val retrofit = Retrofit.Builder()
        .baseUrl(ApiService.BASE_URL)
        .client(getHttpClient())
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    private fun getHttpClient(): OkHttpClient {
        val logging = HttpLoggingInterceptor()
        logging.level = HttpLoggingInterceptor.Level.BODY

        val httpClient = OkHttpClient.Builder()
        httpClient.addInterceptor(logging)
        return httpClient.build()
    }

    fun <S> createService(serviceClass: Class<S>?): S {
        return retrofit.create(serviceClass)
    }
}
```

Ở đây chúng ta đang tạo OkHttp client để log request và response API và thiết lập Retrofit. Biến `retrofit`, được sử dụng để get một instance của Retrofit client.

Chúng ta sẽ sử dụng các repository classes/object để xử lý dữ liệu.

Vì vậy, chúng ta tạo một object là `DataRepository`:
```
object DataRepository {
    var apiService: ApiService? = null
    var searchResultsLiveData: MutableLiveData<GenericDataModel<SearchResultModel>?> = MutableLiveData()

    init {
        apiService =
            ApiProvider.createService(
                ApiService::class.java
            )
    }

    suspend fun getSearchResults(searchQuery: String?) {
        searchResultsLiveData.postValue(null)
        val result = apiService?.getResult(searchQuery)
        val genericDataModel =
            GenericDataModel(
                result?.isSuccessful,
                result?.body(),
                result?.message()
            )
        searchResultsLiveData.postValue(genericDataModel)
    }
}
```

Ở đây, trước tiên chúng ta đã tạo một instance của APIService trong khối `init`, để khởi tạo `retrofit` bất cứ khi nào `DataRepository` được khởi tạo.

> Lưu ý: Vì chúng ta đang sử dụng một object thay vì class nên chỉ một instance duy nhất sẽ được tạo và chia sẻ trên ứng dụng.

Bây giờ chúng ta sẽ tạo một generic `data class`, đây sẽ là wrapper class để nhận tất cả các responses từ các lệnh gọi API. Chúng ta sử dụng wrapper class với `LiveData` để có thể notify cho các views bất cứ khi nào có dữ liệu từ API.

Tạo một `data class` có tên `GenericDataModel`.
```
data class GenericDataModel<T>(val isSuccess: Boolean?, val data: T?, val message: String?)
```

Ngoài ra, lưu ý rằng chúng ta đang khai báo kiểu dữ liệu genetic `T` để có thể tái sử dụng class này cho tất cả các kiểu Responses.

Bây giờ đây là phần cuối cùng gọi API trong thực tế. Trong Activity, tạo một function có tên `startSearching` truyền vào parameter kiểu `String`. Phương thức này sẽ được gọi mỗi lần khi người dùng gõ bất cứ thứ gì để tìm kiếm:
```
private fun startSearching(searchQuery: String?) {
}
```

Bây giờ chúng ta sẽ tạo một `Coroutine` trong function `startSearching`, nó sẽ gọi API và thực hiện phần còn lại của quá trình xử lý trong một background thread, cuối cùng nó sẽ gửi kết quả trở lại trong Main thread.
```
private fun startSearching(searchQuery: String?) {
    CoroutineScope(Dispatchers.IO).launch {
        DataRepository.getSearchResults(searchQuery)
        withContext(Dispatchers.Main) {
        }
    }
}
```

Trong phương thức trên, có thể thấy rằng chúng ta đã cung cấp `Dispatchers.IO` cho coroutine scope, có nghĩa là mọi thứ bên trong sẽ được gọi trong background thread. Ngoài ra, hàm `withContext(Dispatchers.Main)` này bên trong Coroutine sẽ chạy bất cứ thứ gì bên trong nó trở lại main thread.

Bây giờ, hãy lấy một instance của coroutine và tạo một biến global để lưu trữ instance đó. Điều này được thực hiện để tránh tạo ra nhiều coroutines cho mỗi lời gọi và hủy yêu cầu trước đó trước khi thực hiện tìm kiếm mới. Tạo một biến global kiểu `Job` và trả về một instance của coroutine cho biến này trong phương thức `startSearching`.
```
private var apiJob: Job? = null
```

Bây giờ ở đây tất cả điều quan trọng xảy ra, chúng ta không cần quản lý bất cứ điều gì ở đây. Chúng ta không phải chờ đợi response từ API, không cần phải sử dụng bất kỳ callbacks nào. Tất cả điều này được quản lý bởi chính retrofit vì chúng hỗ trợ các coroutines với các `suspend` functions.
```
private fun startSearching(searchQuery: String?) {
        apiJob = CoroutineScope(Dispatchers.IO).launch {
            DataRepository.getSearchResults(searchQuery)

            withContext(Dispatchers.Main) {
                DataRepository.searchResultsLiveData.observe(
                    this@MainActivity,
                    Observer { genericDataModel: GenericDataModel<SearchResultModel>? ->
                        run {
                            if (genericDataModel?.isSuccess == true) {
                                val data = genericDataModel.data
                                if (data?.status.equals("OK", true)) {
                                    resultTextView?.text = data.toString()
                                    resultTextView?.visibility = View.VISIBLE
                                    progressLoading?.visibility = View.GONE
                                }
                            } else {
                                resultTextView?.text = "No data"
                                resultTextView?.visibility = View.VISIBLE
                                progressLoading?.visibility = View.GONE
                            }
                        }
                    })
            }
        }
    }
```

Bây giờ, hãy thêm `TextWatcher` vào `EditText` để lắng nghe tất cả các sự kiện bất cứ khi nào người dùng bắt đầu nhập để có thể bắt đầu các lệnh gọi API cho Search Query. Ngoài ra, chúng ta có thể tạo một `extension` function cho việc này.
```
searchEditText?.addTextChangedListener(object: TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                resultTextView?.visibility = View.GONE
                progressLoading?.visibility = View.VISIBLE
                apiJob?.cancel()

                startSearching(s.toString())
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
            }
        })
```

Lưu ý rằng bên trong `afterTextChanged`, chúng ta đã hủy `CoroutineJob` trước đó để nó tự động hủy các lệnh gọi API trước đó. Sau đó gọi phương thức `startSearching` để lời gọi API mới sẽ được thực hiện.

Đây là cách chúng ta có thể quản lý hủy các cuộc gọi API trước đó khi thực hiện cuộc gọi mới để chỉ nhận được kết quả cho chính cuộc gọi API mới nhất và sau cùng.

Ref: https://proandroiddev.com/retrofit-cancelling-multiple-api-calls-4dc6b7dc0bbd