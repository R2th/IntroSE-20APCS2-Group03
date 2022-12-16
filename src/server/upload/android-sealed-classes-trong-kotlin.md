# I. Giới thiệu
Sealed Classes trong Kotlin là một khái niệm mới mà không có trong Java. Sealed Classes là một phần mở rộng của các class ENUM truyền thống.

> A sealed class allows you to represent constrained hierarchies in which an object can only be of one of the given types.

Điều này có nghĩa là, chúng ta có một class với một số lượng cụ thể các subclass. Những gì chúng ta có cuối cùng cũng giống như một Enum. Điều khác biệt là trong enum chúng ta chỉ có một object cho mỗi class, trong khi với sealed classes chúng ta có thể có một số objects của cùng một class. Sự khác biệt này giúp cho phép các objects từ một sealed class sẽ giữ state.

# II. Khai báo Sealed classes
Một sealed classes có thể có nhiều subclasses, nhưng tất cả chúng phải được khai báo trong cùng một file với chính sealed classes đó. Ví dụ:

```
sealed class NetworkStatus {

    data class Loading(var loading: Boolean) : NetworkStatus()

    data class CustomSignal(var signal: String) : NetworkStatus()

    data class Failure(val e: Throwable) : NetworkStatus()

    companion object {

        fun loading(isLoading: Boolean): NetworkStatus = Loading(isLoading)

        fun customstatus(signal: String): NetworkStatus = CustomSignal(signal)

        fun failure(e: Throwable): NetworkStatus = Failure(e)
    }
    
}
```

Đoạn code trên dùng giao tiếp từ view model đến fragment 
- Loading: Để biết khi nào bắt đầu và kết thúc call Api để hiển thị hoặc ẩn progress
- CustomSignal: Sử dụng để gửi như Message hoặc code
- Failure: Sử dụng để bắn ra lỗi

# III. Sử dụng sealed classes
Bây giờ chúng ta đã biết cách tạo sealed classes, đã đến lúc sử dụng nó. Như tôi đã đề cập, tôi đã sử dụng sealed classes ở trên để giao tiếp từ view model đến fragment

Để hiểu biết chi tiết về cách sử dụng sealed classes cần hiểu 2 điều:

- Data đươc cập nhật ở đâu và như thế nào
- Data được sử dụng ở đâu và như thế nào

## 1. Data đươc cập nhật ở đâu và như thế nào?
   
 Trong trường hợp này tôi đã update sealed classes livedata trong viewmodel trước và sau khi gọi api, như sau:
 
 ```
 private val livadataNetworkStatus = MutableLiveData<NetworkStatus>()
    fun getReviewsData(){
      
        try {

            val call: Call<ReviewRespose>? = dependencyInstances.apiService?.getReviews(hashMap_daata)
            call?.enqueue(object : Callback< ReviewRespose> {
                override fun onFailure(call: Call< ReviewRespose>, t: Throwable) {
                
                    val errorCaseData : ErrorCaseData = ErrorCaseData()
                    errorCaseData.errorCode = 404
                    errorCaseData.message = t.message
                    errorCaseData.retry = true
                    errorCaseData.type = "Non Server"
                    livadataLoading.postValue(NetworkStatus.customStatusDetailed(errorCaseData))
                    
                }

                override fun onResponse(call: Call< ReviewRespose>, response: Response< ReviewRespose>) {
                    val it = response.body()
                    it?.let { 
                        if (it.Error == null) {
                            
                            livadataLoading.postValue(NetworkStatus.loading(false))
                            
                        } else {
                        
                            livadataLoading.postValue(NetworkStatus.customstatus(NetworkStatus.Error))
                            
                        }
                    }
                }
            })
        } catch (e: Exception) {
            e.printStackTrace()
            livadataLoading.postValue(NetworkStatus.loading(false))
        }

    }
 ```
 
## 2. Data được sử dụng ở đâu và như thế nào?

Bây giờ cần xem làm sao để sử dụng dữ liệu trong viewmodel:

```

private fun setNetworkObserver() {
        viewModel?.getNetworkStatus()?.observe(this, Observer {
            activity?.let { act ->
                when (it) {
                    is NetworkStatus.Loading -> {
                        if (it.loading) {
                            showLoading()
                        } else {
                            hideLoading()
                        }
                    }

                    is NetworkStatus.CustomSignalDetailed -> {
                        hideLoading()
                        showErrorDialog(it.signal.message ?: getString(R.string.some_thing_wrong))
                    }

                    is NetworkStatus.CustomSignal -> {
                        hideLoading()
                        setUpErrorView()
                    }

                }
            }
        })
    }
```

# IV. Tổng kết
Trên đây là bài viết giới thiệu về Sealed classes trong Kotlin. 

Thank you for reading.

ref: [medium](https://medium.com/@sgkantamani/sealed-classes-in-kotlin-e48e072daca8)