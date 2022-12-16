![](https://images.viblo.asia/a0c02036-23e7-4c10-9d7b-840fa5ccac6d.jpg)

Việc có một kiến trúc nền tảng mạnh mẽ là vô cùng quan trọng đối với một ứng dụng để có khả năng mở rộng cũng như đáp ứng mong muốn của người dùng. Giả sử tôi nhận được một task mới yêu cầu thay thế API đã có với một cấu trúc API khác vừa được cập nhật và tối ưu lại. Để có thể tích hợp những thay đổi này, tôi buộc phải viết lại toàn bộ ứng dụng.

Tại sao lại như vậy ? Bởi vì code của tôi đã bị gắn chết với mô hình dữ liệu phản hồi đó rồi. Lúc này, tôi không muốn lại tạo ra một lỗi chồng lên lỗi như vậy nữa. Để có thể giải quyết vấn đề này, Clean Architecture đã xuất hiện như một vị cứu tinh.  Đúng là có hơi mệt khi bắt đầu nhưng nó có thể là lựa chọn khả dĩ nhất cho những ứng dụng lớn với nhiều tính năng và việc tiếp cận SOLID. Hãy cùng thử với một vài câu hỏi cho mỗi khía cạnh của kiến trúc và gạch đầu dòng từng chút cho dễ hình dung nhé.

Kiến trúc này được đề xuất vào năm 2012 bởi Robert C. Martin (Uncle Bob) trong clean code blog.

## **Vì sao tiếp cận rõ ràng hơn ?**
1. Việc tách bạch code trong các tầng khác nhau với các trách nhiệm được phân công riêng sẽ giúp dễ dàng sửa đổi hơn.
2. Mức độ trừu tượng cao.
3. Không bị ràng buộc giữa các code.
4. Dễ dàng trong việc kiểm thử

> "Code sạch lúc nào nhìn cũng như thể được viết bởi một người có tâm." — Michael Feathers

## **Các tầng là những gì ?**

![](https://images.viblo.asia/2a7063ef-68cc-439a-a0b0-f6a4d68ddae5.png)

**Tầng Domain**: Sẽ thực thi các business logic độc lập khỏi bất kỳ tầng nào khác và chỉ là một gói kotlin thuần chứ không có các phụ thuộc riêng của Android.

**Tầng Data**: Sẽ phân chia dữ liệu được yêu cầu cho ứng dụng tới tầng Domain bằng cách triển khai giao diện (interface) được bày ra bởi tầng Domain.

**Tầng Presentation**: Sẽ chứa cả tầng Domain và tầng Data và có các phụ thuộc riêng của Android để xử lý logic giao diện.

## **Tầng Domain là gì ?**

Nó sẽ là tầng chung nhất trong cả ba tầng. Nó sẽ kết nối tầng Presentation tới tầng Data. Đây là tầng nơi mà các business logic của ứng dụng sẽ được thực thi.

![](https://images.viblo.asia/6984708a-f683-4af5-999f-4639b8a595e8.png)

### **Các Use Case**

Use cases (các ca sử dụng) là nơi thực thi các logic của ứng dụng. Mỗi tên sẽ mô tả một chức năng đối với từng ca sử dụng riêng biệt. Với độ chi tiết cao hơn đối với việc tạo ca sử dụng, nó có thể được tái sử dụng thường xuyên hơn.

```Kotlin
class GetNewsUseCase(
    private val transformer: FlowableRxTransformer<NewsSourcesEntity>,
    private val repositories: NewsRepository
): BaseFlowableUseCase<NewsSourcesEntity>(transformer) {

    override fun createFlowable(data: Map<String, Any>?): Flowable<NewsSourcesEntity> {
        return repositories.getNews()
    }

    fun getNews(): Flowable<NewsSourcesEntity>{
        val data = HashMap<String, String>()
        return single(data)
    }
}
```

Ca sử dụng này trả về một Flowable có thể được sửa đổi dựa trên observer được yêu cầu. Nó có 2 tham số. Tham số thứ nhất là transformers hay ObservableTransformer quản lý thread nào sẽ thực hiện logic còn tham số thứ hai là repository - là interface cho tầng data. Nếu bất kỳ data nào được truyền vào tầng data thì HashMap có thể được sử dụng.

### **Các Repository**

Nó chỉ định các chức năng được yêu cầu bởi các ca sử dụng được thực hiện bởi tầng Data.

## **Tầng Data là gì ?**

Tầng này chịu trách nhiệm cung cấp dữ liệu được yêu cầu bởi ứng dụng. Tầng data phải được thiết kế dữ liệu như vậy để nó có thể được tái sử dụng lại bởi bất kỳ ứng dụng nào mà không cần sửa đổi trong logic của presentation.

![](https://images.viblo.asia/056e25e5-bbe0-4fe5-984a-551a58f35311.png) 

API cung cấp việc triển khai kết nối mạng remote. Bất kỳ thư viện kết nối mạng nào đều có thể tích vào vào đây chẳng hạn như retrofit, volley... Tương tự như vậy, DB cung cấp triển khai cơ sở dữ liệu local.

```Kotlin
class NewsRepositoryImpl(
    private val remote: NewsRemoteImpl,
    private val cache: NewsCacheImpl
) : NewsRepository {

    override fun getLocalNews() = cache.getNews()

    override fun getRemoteNews() = remote.getNews()

    override fun getNews(): Flowable<NewsSourcesEntity> {
        val updateNewsFlowable = remote.getNews()
        return cache.getNews()
                .mergeWith(updateNewsFlowable.doOnNext{
                    remoteNews -> cache.saveArticles(remoteNews)
                })
    }
}
```
Trong Repository, chúng ta có một triển khai của local, remote hoặc bất kỳ trình cung cấp dữ liệu nào và trên class NewRepositoryImpl triển khai interface được bày ra bởi tầng domain. Nó thực hiện như một điểm truy cập đơn tới tầng data.

## **Tầng Presentation là gì ?**

Tầng Presentation cung cấp triển khai giao diện của ứng dụng. Đây là tầng dumb - chỉ thực hiện lệnh mà không có logic trong đó. Tầng này bên trong thực hiện kiến trúc như MVC, MVP, MVVM, MVI, v.v ... Đây là tầng mà mọi thứ được kết nối.

![](https://images.viblo.asia/d1a07d70-7ea8-4703-be30-8efdd737c259.png)

Package DI cung cấp injection cho tất cả các phụ thuộc khi bắt đầu một ứng dụng như liên quan đến mạng, view model, các ca sử dụng... DI trong Android có thể được thực hiện bằng Dagger, Kodein, Koin hoặc chỉ bằng cách sử dụng mẫu thiết kế định vị dịch vụ. Nó chỉ phụ thuộc vào ứng dụng như đối với ứng dụng phức tạp DI có thể khá hữu ích. Tôi chọn Koin chỉ vì nó dễ hiểu và dễ thực hiện hơn Dagger.

## **Tại sao sử dụng các ViewModel ?**

Theo như tài liệu android về ViewModel:
> Store and manage UI-related data in a lifecycle conscious way. It allows data to survive configuration changes such as screen rotations.
```Kotlin
class NewsViewModel(
    private val getNewsUseCase: GetNewsUseCase,
    private val mapper: Mapper<NewsSourcesEntity, NewsSources>
) : BaseViewModel() {

    companion object {
        private val TAG = "viewmodel"
    }

    var mNews = MutableLiveData<Data<NewsSources>>()

    fun fetchNews() {
        val disposable = getNewsUseCase.getNews()
                .flatMap { mapper.Flowable(it) }
                .subscribe({ response ->
                    Log.d(TAG, "On Next Called")
                    mNews.value = Data(responseType = Status.SUCCESSFUL, data = response)
                }, { error ->
                    Log.d(TAG, "On Error Called")
                    mNews.value = Data(responseType = Status.ERROR, error = Error(error.message))
                }, {
                    Log.d(TAG, "On Complete Called")
                })

        addDisposable(disposable)
    }

    fun getNewsLiveData() = mNews
}
```

Vậy là, ViewModel giữ lại dữ liệu về thay đổi cấu hình. Trong MVP, Presenter đã liên kết trực tiếp vào View qua interface nên gây khó khăn cho việc test nhưng trong ViewModel, không có interface vì các thành phần nhận biết được kiến trúc. Base View Model đang sử dụng CompositeDisposable cho việc thêm tất cả các observable và loại bỏ tất cả chúng trên onCleared trong lifecycle.

```Kotlin
data class Data<RequestData>(
    var responseType: Status,
    var data: RequestData? = null,
    var error: Error? = null
)

enum class Status { SUCCESSFUL, ERROR, LOADING }
```
Một class data wrapper được sử dụng trên LiveData như một helper class để giúp view biết được trạng thái của request, ví dụ như nếu nó đã được start chưa, có thành công không hoặc bất kỳ trạng thái liên quan nào khác về data.

## **Tất cả các tầng được kết nối với nhau ra sao ?**

Mỗi tầng đều có các thực thể (entities) riêng dành riêng cho package đó. Mapper được sử dụng để chuyển đổi thực thể của tầng này sang thực thể của tầng khác. Chúng ta có các thực thể khác nhau cho mỗi tầng để tầng đó trở nên hoàn toàn độc lập và chỉ có dữ liệu cần thiết được chuyển sang tầng tiếp theo.

## **Luồng ứng dụng**
![](https://images.viblo.asia/8a1221dd-ac66-46ec-b48a-b559f293a2f2.png)

Source: https://proandroiddev.com/kotlin-clean-architecture-1ad42fcd97fa

Repo: https://github.com/rakshit444/news-sample-app