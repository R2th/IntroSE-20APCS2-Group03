Bạn có thể gặp một tình huống trong khi phát triển một ứng dụng mà bạn muốn **retry** một request nhất định khi một Exception xảy ra mà không có sự can thiệp của người dùng.

Một ví dụ thực dụng sẽ là trường hợp của IO Exception. Hãy xem xét trường hợp sử dụng này. Tuy nhiên, bạn muốn tìm nạp danh sách dogs từ server, bạn nhận được một IOException do sự cố mạng.

Bây giờ bạn có thể kích hoạt một request khác ngay lập tức hoặc đợi một lúc nào đó (**backoff**) và retry. Trong bài viết này, chúng ta sẽ khám phá phương pháp **backoff**.

# Thiết lập ViewModel
`getDogImages() `là một hàm throw IOException một cách ngẫu nhiên, mocking một network response. Trong một ứng dụng thực tế, nó sẽ trigger 1 network request.

```Kotlin
    private fun getDogImages(): Flow<ResultWrapper> {
        return flow {
            emit(ResultWrapper.Loading(true))
            delay(3000)
            val randomNumber = (0..5).random()
            emit(ResultWrapper.Loading(false))
            if (randomNumber < 3) {
                throw IOException()
            }
            emit(ResultWrapper.Success(getList()))
        }
    }

    private fun getList(): List<String> {
        val list = listOf<String>(
            "https://images.dog.ceo/breeds/retriever-curly/n02099429_935.jpg",
           ....
            "https://images.dog.ceo/breeds/pekinese/n02086079_952.jpg"
        )
        return list
    }
```

Bây giờ đây là nơi điều kỳ diệu xảy ra. Chúng ta sử dụng một toán tử đặc biệt được gọi là **.retryWhen** có hai tham số `cause` và `attempt`.  `cause` là throwable (trả về từ flow getDogImages()) và `attempt` là số lần thử.

Bây giờ bất cứ khi nào `getDogImages() `ném một ngoại lệ, Chúng ta sẽ kiểm tra xem Ngoại lệ có phải là `IOException` hay không và kiểm tra xem số lần thử có nhỏ hơn `3` hay không.

Nếu cả hai điều kiện đều được thỏa mãn, Chúng tôi phát ra một **ResultWrapper.NetworkError (..)** để thông báo cho UI về Error và backoff một time delay là 2000 * (attemp + 1) mili giây. Với mỗi lần thử mới, chúng ta lùi lại nhiều thời gian hơn lần trước khi thử lại.

Nếu hàm `getDogImages ()` ném Ngoại lệ ba lần, Chúng ta ngừng thử lại và phát ra `ResultWrapper.NetworkError(“Đã hết hạn thử nghiệm!”, Null)`, theo sau là `return@ retryWhen false.`

Đảm bảo rằng bạn thêm một khối `catch {}` để xử lý các Ngoại lệ ở trên

```Kotlin
val dogImagesFlow = getDogImages().flowOn(Dispatchers.IO)
        .retryWhen { cause, attempt ->
            if (cause is IOException && attempt < 3) {
                val delay = 2000 * (attempt + 1)
                emit(
                    ResultWrapper.NetworkError(
                        "Attempt No ${attempt + 1} Failed.Retrying again in time ${delay / 1000} sec...",
                        delay.toInt()
                    )
                )
                delay(delay)
                return@retryWhen true
            } else {
                emit(ResultWrapper.NetworkError("Retries Expired!", null))
                return@retryWhen false
            }
        }.catch {
            //catch Exception
        }
```

### Setting up the View

Bây giờ trong View, collect flow ở trên một UI cập nhật cho phù hợp.

```Kotlin
lifecycleScope.launch {
            viewModel.dogImagesFlow.collect {
                when (it) {
                    is ResultWrapper.NetworkError -> {
                        errorText.append("${it.errorMessage} \n")
                       ...
                    }
                    is ResultWrapper.Success<*> -> {
                     ...
                        showLoading(false)
                        adapter.submitList(it.value as? List<String>)
                    }
                    is ResultWrapper.Loading -> {
                       ...
                        showLoading(it.isLoading)
                    }
                }
            }
        }
```

# And That’s It ✅
Bạn đã triển khai thành công Back Off Strategy với việc retry bằng cách sử dụng các flows. Bạn có thể ngoại suy ý tưởng này cho bất kỳ Exception nào khác mà bạn muốn retry một request mà không có sự can thiệp của người dùng một cách thông minh.