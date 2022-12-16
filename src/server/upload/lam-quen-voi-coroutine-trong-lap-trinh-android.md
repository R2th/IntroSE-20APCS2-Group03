Xử lý bất đồng bộ là một kỹ thuật mà lập trình viên mobile nào cũng cần phải biết. Việc xử lý bất đồng bộ giúp ứng dụng của chúng ta không bị Block UI khi thực hiện tác vụ nặng cần nhiều thời gian.

Hiện nay, với lập trình Android chúng ta có AsyncTask, Rx,... giúp chúng ta xử lý bất đồng bộ một cách rất tốt. Với AsyncTask, nó rất dễ sử dụng nhưng hiện nay đã bị deprecated bởi Google, Rx là một thư viện khá đồ sộ hơi khó tiếp cận với người mời. Vì vậy hôm nay mình sẽ nói về Coroutine, một cách xử lý bất đồng bộ mới mà Google khuyên dùng.
# 1. Lập trình bất đồng bộ
Nói ở trên khá nhiều về xử lý bất đồng bộ, vậy lập trình bất đồng bộ là gì?

Hiểu đơn giản thì chúng ta sẽ tạo ra một luồng khác để thực thi công việc tốn nhiều thời gian. Nếu như công việc này chạy ở Main Thread thì sẽ khiến ứng dụng của chúng ta bị đơ và sau khi tác vụ đó hoàn thành thì mới có thể sử dụng tiếp được. Điều này khiến trải nghiệm người dùng không tốt, mất performance của ứng dụng. Các bạn có thể nhìn hình minh họa ở dưới so sánh có xử lý bất đồng bộ và không xử lý bất đồng bộ
![](https://images.viblo.asia/808ff174-bb6b-4609-9986-6738a2c65098.png)
# 2. Giới thiệu về Coroutine
Ở trên mình có giới thiệu đến Coroutine, vậy Coroutine là gì?
* Coroutine được Google cho ra mắt vào phiên bản 1.3 của Kotlin
* Coroutine giúp bạn xử lý bất đồng bộ với code đơn giản
* Khoảng 50% nhà phát triển chuyên nghiệp sử dụng coroutines đã báo cáo rằng năng suất làm việc tăng lên
## Các tính năng nổi bật của Coroutine
* **Coroutine rất nhẹ:** bạn có thể chạy nhiều coroutines trên cùng một thread 
* **Ít rò rỉ bộ nhớ**
* **Có thể hủy khi đang chạy**
* **Tích hợp nhiều trong thư viện Jetpack**
## Các thành phần để tạo nên một Coroutine
Để tạo ra một Coroutine thì chúng ta sẽ cần 4 thành phần chính. Các bạn hãy nhìn hình bên dưới
![](https://images.viblo.asia/e8526a00-5148-4e3d-99b8-0f6f765228fc.png)
Bây giờ mình sẽ giải thích từng thành phần của Coroutine
1. **CoroutineScope:** Dùng để quản lý các Coroutine, bạn có thể chạy nhiều Coroutine trong một CoroutineScope
2. **CoroutineContext:** Đấy là nơi để bạn định nghĩa cấu hình Coroutine. Dưới đây là một số thuộc tính bạn có thể thêm cho Coroutine của mình
![](https://images.viblo.asia/aeb01e1f-0e1b-4c6a-8504-a4ea0f40e04d.png)
* **Dispatchers:** Các bạn sẽ chọn luồng để chạy dựa vào thuộc tính này, có một số thuộc tính cơ bản của Dispatchers như sau:

    -Dispatchers.Default : Background Thread (tối ưu CPU, sắp xếp list, parse json,...)
    
    -Dispatchers.IO : Background Thread (đọc/ghi file, kết nối internet)
    
    -Dispatchers.Main	: Main Thread (cập nhật giao diện cho ứng dụng)
* **Job:** Quản lý vòng đời của 1 Coroutine. các bạn của thế sử dụng toán tử plus(+) bằng cách Coroutine context + job. Các bạn nên nhớ Job = Coroutine để tiện xử lý các vấn đề về sau. Dưới đây là một số method của Job
![](https://images.viblo.asia/1fe9e7d4-ec0b-49ce-bde3-e58ab9361c23.png)
3. **CoroutineBuilder:** Gồm **launch** và **async** tùy vào kiểu trả về mà các bạn mong muốn để có thể chọn là 1 trong 2 kiểu này
* **launch** sẽ trả về 1 Job
* **async** sẽ trả về Deferred<T> và các bạn có thể nhận giá trị bằng hàm await()
4. **Coroutine body:** Các bạn sẽ gọi các hàm suspend ở đây, còn hàm suspend là gì thì mình sẽ nói ở bên dưới :)
    
Oke :) vậy là đã xong các thành phần để tạo nên 1 Coroutine bây giờ mình sẽ nói đến một cái không thể thiếu đó chính là **suspend function**
    
Hiểu đơn giản thì **suspend function** sẽ được khởi tạo ở Main Thread và có thể chạy được trên một Thread khác. Nó khác với một function bình thường ở chỗ có thể ngưng lại và không chạy ở Main nữa mà chuyển sang một Thread khác để chạy cụ thể ở đây là một Coroutine.
    
Mình có ví dụ về 2 function này cho các bạn dễ hiểu nhé:
    
Function bình thường:
![](https://images.viblo.asia/78c32ab9-5c1e-4cb5-9aa0-719e063bb658.png)
    
Suspend function:
![](https://images.viblo.asia/df2a9497-be28-4778-be6a-8dd8945597fe.png)
    
*Lưu ý:* **Một suspend funtion chỉ có thể được gọi từ một suspend function khác hoặc từ một CoroutineScope**
    
##  Xử lý ngoại lệ trong Coroutine
Có nhiều cách thể xử lý ngoại lệ trong Coroutine, trong bài viết này mình sẽ hướng dẫn cho các bạn các mình hay sử dụng mà mình cảm thấy nó dễ và nhanh nhất.
    
Coroutine có cung cấp một đối tượng xử lý ngoại lệ là : **CoroutineExceptionHandler**
    
Chúng ta sẽ sử dụng như sau: 
![](https://images.viblo.asia/4a8383cf-9fec-4516-9d0f-df8b8e65ad5d.png)

Chú ý khi xử lý ngoại lệ trong Coroutine chúng ta còn phải dựa vào CoroutineBuilder cụ thể như sau:
    
* Chạy Coroutine bằng **launch** nếu gặp lỗi sẽ throw exception
* Chạy Coroutine bằng **Async** sẽ chỉ thow khi gọi hàm await()
# 3. Demo
Để bài viết không bị nhàm chán vì quá nhiều lý thuyết, mình sẽ demo một đoạn code trong project mình đã làm và có sử dụng Coroutine giúp các bạn hiểu hơn nhé :D

Cụ thể mình sẽ hướng dẫn các bạn lấy một list các Game rồi hiển thị lên RecyclerView nhé
1.  Mình sẽ tạo hàm getGamesByGenre ở lớp ApiService (mình sử dụng Retrofit):
```
@GET(ApiConfig.BASE_GAME)
suspend fun getGamesByGenre(
    @Query(ApiConfig.BASE_GENRE) genre: String,
    @Query(ApiConfig.BASE_PARENT_PLATFORM) platform: String
): GameResponse
```
2.  Lớp GameRemoteDataSource sẽ gọi đến ApiService như sau:
```
override suspend fun getPopularGames(platform: String) =
        apiService.getPopularGames(platform)
```
3. Lớp Repository gọi đến GameRemoteDataSource
```
override suspend fun getPopularGames(platform: String) =
        remote.getPopularGames(platform)
```
4. Tiếp theo là ViewModel gọi đến Repository
```
fun getGamesByGenre(genre: String, platform: String) {
        viewModelScope.launch(Dispatchers.IO + exceptionHandler) {
            val gamesByGenreFromApi = gameRepo.getGamesByGenre(genre, platform)
            _gamesByGenre.postValue(gamesByGenreFromApi.results)
        }
    }
```
5. Cuối cùng là từ Fragment gọi đến getGamesByGenre ở ViewModel (ở đây mình sử dụng Spinner để chọn Genre trước khi get data) 
```
binding?.spinnerGenre?.onItemSelectedListener =
            object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(
                    parent: AdapterView<*>?,
                    view: View?,
                    position: Int,
                    id: Long
                ) {
                    (parent?.getItemAtPosition(position) as Genre).let {
                        viewModel.getGamesByGenre(it.id.toString(), ApiConfig.BASE_PC)
                    }
                }

                override fun onNothingSelected(parent: AdapterView<*>?) {
                }
            }
    }
```
Vậy là xong, mình đã sử dụng DataBinding để bind trực tiếp list game vừa get được lên View, cùng chạy app và kiểm tra kết quả nhé :)
    
![](https://images.viblo.asia/0880a1d1-ef93-43a1-9375-6461f4f28363.png)

Ngon rồi :) Coroutine đã chạy đúng
    
Vừa rồi mình đã hướng dẫn cơ bản về Coroutine, tất nhiên đây chỉ là một phần nhỏ của nó, các bạn có thể tìm hiểu thêm trên docs của Google cũng như nhiều nguồn tài liệu khác.
    
Hy vọng các bạn có thể áp dụng được Coroutine vào dự án sau khi đọc bài viết của mình.