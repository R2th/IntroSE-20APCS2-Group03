# Context 
Có một cuốn sách lập trình mà chúng ta phần lớn đã từng đọc qua, dù nhiều dù ít, mang lại giá trị không hề nhỏ đến cách mỗi lập trình viên viết ra các đoạn code của riêng mình - **Clean Code**. Chủ nhân của nó - thường được biết đến với cái tên **Uncle Bob** - có vẻ như rất thích thú trong các khái niệm *Clean* - sạch sẽ và rõ ràng, cũng phát biểu ra một trong những khái niệm ảnh hưởng đến việc define Architecture của một dự án phần mềm, nó được gọi là **Clean Architecture**. Khái niệm này không mới, nó đã được công bố khá lâu, dễ dàng tìm thấy bài viết của tác giả trên blog https://8thlight.com từ năm **2012**. Tuy nhiên, nó mới thực sự là trending trong vài năm trở lại đây bởi những ưu điểm vượt trội trong các dự án phần mềm, đặc biệt là các dự án enterprise, support rất nhiều platform, device khác nhau. Hôm nay tôi sẽ cùng các bạn tìm hiểu về khái niệm **Clean Architecture** và làm cách nào để build một Android Architecture theo tư tưởng **Clean Architecture** kết hợp với *Google Architecture Component*

# What is Clean Architecture?
Tôi sẽ không bàn về khái niệm quá sâu, vì nó không giúp ích được gì cho chúng ta. Đơn giản, Clean Architecture là tư tưởng để xây dựng một kiến trúc dự án sạch, đảm bảo hầu hết các đặc tính của một dự án phần mềm cần có - *Clean*, *Maintainable*, *Tesable*, *Extendable*, *Framework independent* và dựa trên tư tưởng khác biệt với những cách define truyền thống. 

**Clean Architecture** còn được gọi là **Onion Architecture** bởi hình dáng củ hành của nó, tuân thủ đặc biệt một số nguyên tắc đặc biệt

![](https://cdn-images-1.medium.com/max/719/1*ZNT5apOxDzGrTKUJQAIcvg.png)

Dễ dàng nhận thấy các layer trong mô hình này

* ***Entities*** : Enterprise Business Logic 
* ***Use Cases*** : Application Business Logic
* ***Controllers- Presenters - Gateways*** : Interface Adapters
* ***DB - Devices - Web - UI - External Interface*** : Frameworks & Drivers


### 1. Enties 
Entities là most inner layer, chứa toàn bộ những *Enterprise Business Logic* của một ứng dụng mà khi nhìn vào, ta có thể dễ dàng nhận thấy ứng dụng này sẽ làm gì, có chức năng gì dựa trên những mường tượng trong đầu. Giả sử khi nhìn vào các model class (thường là data class hay *POJO* trong java), ta sẽ mường tượng được ứng dụng này làm gì. Nếu ta nhìn vào các model classes như `Block`, `Transaction`, `Asset`, ... ta dễ dàng hiểu nó là một ứng dụng làm *Block Chain*, và những entities này sẽ không phụ thuộc vào các layer khác, độc lập hoàn toàn và tái sử dụng cao. 

### 2. Use Cases
Còn được gọi là *Application Business Logic* layer, là outer layer của Entities, nơi ta define business logic của ứng dụng. Nó là high level layer của Entities và có các dependency chính là các Entities đó. Giả sử bạn làm một ứng dụng Block Chain explorer, với các Entities tương ứng với ví dụ ở trên thì Use Cases layer này sẽ là nơi khai báo các use cases cụ thể trong ứng dụng này ví dụ như fetch các block mới nhất được thêm vào, retrieve detail cuả một block cụ thể, ... và dĩ nhiên, với các ứng dụng khác nhau thì các use cases này sẽ khác nhau, tuy nhiên nên nhớ rằng Entities có thể được tái sử dụng trong những trường hợp này

### 3. Controller - Presenter - Gateways
Một outer layer của Use Cases, còn được gọi là *Interface Adapter* layer. Tương tự nó là high level layer của Use Case layer và dĩ nhiên take Use Cases lẫn Entitise là dependencies. Có một điểm chú ý rằng, Entities là low level layer của Interface Adapter layer và việc bạn inject trực tiếp nó vào layer này không có gì sai cả, tuy nhiên đó là việc làm không nên, tôi sẽ giải thích kỹ hơn ở phần sau. Interface Adapter layer là layer điều khiển và giao tiếp với Business logic của ứng dụng, ở đây không xử lý business logic, chỉ control nó và present kết quả lên UI.

### 4. DB - Devices - Web - UI - External Interface 
Là *Frameworks & Drivers* layer, lớp ngoài cùng trong mô hình này, là implementation cụ thể và specific nhất trong kiến trúc. Ở đây, chúng ta sẽ define những gì liên quan đến môi trường, liên quan đến platform. 

Các layer này giao tiếp với nhau thông qua môt quy tắc gọi là **Dependency Rule**. 

![](https://five.agency/wp-content/uploads/2016/11/Graph-3.png)

1. Các layer càng vào trong thì càng *abstract*, càng ra bên ngoài thì càng *concrete*. Các inner layer thường là những layer common nhất và độc lập nhất, các outer layer thì phụ thuộc hơn. Tư tưởng của việc này rất rõ ràng, giúp cho việc mở rộng hay thay đổi cực kỳ hiệu quả mà không phải phụ thuộc quá nhiều, giảm thiểu rủi ro đến mức tối đa.  
2. Các outer layer là high level layer, có các dependencies là các inner layer gần kề.
3. Các outer layer có thể nhìn thấy các inner layers nhưng ngược lại thì không được phép.


##### Mô hình three-tier truyền thống

![](https://five.agency/wp-content/uploads/2016/11/Graph-5.png)

Rõ ràng nhận thấy, core business logic trong mô hình này chính là **Data Layer** trong khi đó core business trong Clean Architecture là **Entities**. Tất cả các dependencies trong three-tier sẽ đến database, trong Clean Architecture các dependecies sẽ đi đến Business Layer. Đó là điểm khác biệt. 

Business layer không nên biết gì về database vì database cần flexible và sẵn sàng cho sự thay đổi, do đó mô hình three-tier rõ ràng bộc lộ điểm yếu. Clean Architecture giải quyết được vấn đề này.

# Communication between layers

###### Tiếp theo, làm sao định nghĩa sự tương tác, giao tiếp giữa các layer? 

Follow theo tư tưởng của kiến trúc, chúng ta sẽ define một ứng dụng với phần core business logic là trung tâm của ứng dụng, abstract hết mức có thể. Các layer khác bao quanh, là những implementation của core business layer. Bài toán đặt ra là bằng cách nào chúng ta có thể request nhận dữ liệu ở *Business Logic Layer* và lấy kết quả từ nó? Hình bên dưới mô tả flow dữ liệu.

![](https://five.agency/wp-content/uploads/2017/06/graf_1_b.png)

Mỗi Use Cases - Business Logic Layer - sẽ expose **Input/Output** port. Presenter giao tiếp với Use Cases thông qua một Input port, pass request value thông qua Input Port này. Use Cases sẽ xử lý và trả về kết quả thông qua Output Port. 

Ta nhận thấy, Presenter connect với Use Case Input Port bằng mũi tên đen, trong UML nó nghĩa là giữ một reference của Input port đó và connect với Use Case Output port bằng một mũi tên trắng, nghĩa là implementation hay là một thể hiện của nó. Bản thân Use Case sẽ giữ reference của Output Port và là implementation của Input port, nói cách khác bản thân Use Case chính là Input Port. 

# How to build an Android Application follow by Clean Architecture
Tôi đã trình bày về tư tưởng của Clean Architecture, và bây giờ là lúc ứng dụng vào xây dựng một Android Application. 

![](http://wahibhaq.github.io/img/blog/posts/summary-thoughts-clean-architecture-mvp/clean-architecture-ring-diagram.png)

##### 1. Domain 
Core business của ứng dụng, là most inner layer. Ở đây chúng ta sẽ define các model class, các use cases, các repository hay framework component ở dạng abstraction. Layer này độc lập với framework, độc lập với device, platform, do đó nó sẽ là một module java library.
##### 2. Data
Outer layer của Domain layer. Ở đây sẽ define các implementation của repository, cung cấp cách thức giao tiếp với database hay web server. Ta sẽ define nó dưới dạng một module android library.
##### 3. Presentation (UI, Device)
Tầng trình diễn data hay implementation của các framework component. Là tầng ứng dụng nên sẽ là một application.

# Implementation

### 1. Domain

##### Entities

```java
public class Block implements Entity {

    private long number;

    private String hash;

    private String createdAt;

    // Getter and Setter
}
```

##### Use Cases

Tạo abstract class UseCase 

```java
public abstract class UseCase<I extends UseCase.Input, O> {

    private CompositeDisposable compositeDisposable = new CompositeDisposable();

    protected abstract O buildDataStream(I input);

    void subscribe(Disposable disposable) {
        compositeDisposable.add(disposable);
    }

    public void dispose() {
        compositeDisposable.clear();
    }

    public static abstract class Input {
    }

    public static class EmptyInput extends Input {

        private EmptyInput(){}

        public static EmptyInput instance(){
            return new EmptyInput();
        }
    }
}
```

**Note**: UseCase sẽ chứa các nested class chính là các Input port, các class này open và cho phép thừa kế để tạo các Input port tương ứng cho từng use case khác nhau. UseCase hold reference của các output port thông qua biến compositeDisposable.

Tạo 1 số abstraction, là thể hiện của UseCase combine với RxJava 2

```java
public abstract class MaybeUseCase<I extends UseCase.Input, O> extends UseCase<I, Maybe<O>> {

    public void execute(@NonNull I input, @NonNull Observer<O> output) {
        subscribe(buildDataStream(input).doOnSubscribe(output.onSubscribe())
                .subscribe(output.onSuccess(), output.onError(), output.onComplete()));
    }
}
```

```java
public abstract class CompletableUseCase<I extends UseCase.Input> extends UseCase<I, Completable> {

    public void execute(@NonNull I input, @NonNull final Observer<?> output) {
        subscribe(buildDataStream(input).doOnSubscribe(output.onSubscribe())
                .subscribe(output.onComplete(), output.onError()));
    }
}
```

**Note**: Các class use case được define dưới dạng abstract class và tương ứng với từng loại stream data trong **RxJava 2** và expose method nhận vào params chính là Input port và Output port của use cases.

Tạo các business logic use case

```java
public class GetTransactionsUseCase
        extends MaybeUseCase<UseCase.EmptyInput, CompositeTransactions> {

    private TransactionRepository transactionRepo;
    private Long blockNumber;
    private Long blockHeight;

    @Inject
    public GetTransactionsUseCase(TransactionRepository transactionRepo) {
        this.transactionRepo = transactionRepo;
    }

    public GetTransactionsUseCase next() {
        --blockNumber;
        return this;
    }

    public GetTransactionsUseCase refresh() {
        blockHeight = null;
        blockNumber = null;
        return this;
    }

    public GetTransactionsUseCase fetchLatest() {
        blockHeight = null;
        return this;
    }

    @Override
    protected Maybe<CompositeTransactions> buildDataStream(EmptyInput input) {
        return blockHeight == null ? fetchLatestTransactions()
                : blockNumber == null ? fetchLatestTransactions() : getTransactions();
    }

    private Maybe<CompositeTransactions> fetchLatestTransactions() {
        return transactionRepo.getBlockHeight().flatMapMaybe(height -> {
            if (blockNumber == null && height != 0) blockNumber = height;
            if (Objects.equals(blockHeight, height)) return Maybe.empty();
            blockHeight = height;
            return transactionRepo.getTransactions(height);
        });
    }

    private Maybe<CompositeTransactions> getTransactions() {
        return transactionRepo.getTransactions(blockNumber);
    }
}
```

**Note** : Khi define các business use case, method `buildDataStream` - nơi implement core business của use case tương ứng - sẽ được protected. Mục đích của việc làm này là tránh việc combine nhiều stream từ các use case khác nhau, đặc biệt là khi sử dụng RxJava, điều đó đi ngược lại tư tưởng của Clean Architecture. 

##### Observer

```java
public abstract class Observer<T> {

    private final Consumer<T> ON_SUCCESS = this::onSuccess;

    private final Consumer<? super Throwable> ON_ERROR = this::onError;

    private final Consumer<?> ON_SUBSCRIBE = o -> onSubscribed();

    private final Action ON_COMPLETE = this::onCompleted;

    Consumer<T> onSuccess() {
        return ON_SUCCESS;
    }

    Consumer<? super Throwable> onError() {
        return ON_ERROR;
    }

    Action onComplete() {
        return ON_COMPLETE;
    }

    <R> Consumer<R> onSubscribe() {
        return (Consumer<R>) ON_SUBSCRIBE;
    }

    public void onSuccess(T data) {

    }

    public void onError(Throwable throwable) {
    }

    public void onCompleted() {
    }

    public void onSubscribed() {
    }
}
```

**Note** : Observer là base class của use case output port. Tùy pattern được sử dụng ở presentation mà chúng ta quyết định Observer tương ứng sẽ được nói đến ở phần sau. 

##### Repositories 

```java
public interface TransactionRepository extends Repository {

    Maybe<CompositeTransactions> getTransactions(final long blockNumber);

    Maybe<CompositeTransaction> getTransaction(final String id);

    Single<Long> getBlockHeight();
}
```

**Note** : Define các interface của các repository tương ứng trong ứng dụng. 

### 2. Data

##### Models

```java
@Entity(tableName = "Block")
public class BlockData implements Parcelable, Mapable<Block> {

    @Expose
    @PrimaryKey
    private long number;

    @Expose
    private String hash;

    @Expose
    @ColumnInfo(name = "created_at")
    @SerializedName("created_at")
    private String createdAt;

    // Getter, Setter and other implement methods
}
```

##### Repository

```java
public class TransactionRepositoryImpl extends Repository implements TransactionRepository {
    private TransactionLocalDataSource localDataSource;
    private TransactionRemoteDataSource remoteDataSource;

    public TransactionRepositoryImpl(TransactionRemoteDataSource remoteDataSource,
            TransactionLocalDataSource localDataSource, Mapper mapper) {
        super(mapper);
        this.remoteDataSource = remoteDataSource;
        this.localDataSource = localDataSource;
    }

    @Override
    public Maybe<CompositeTransactions> getTransactions(final long blockNumber) {
        return remoteDataSource.getTransactions(blockNumber, LIMITED_RESULT)
                .flatMapMaybe(
                        response -> localDataSource.save(response).andThen(Maybe.just(response)))
                .onErrorResumeNext(throwable -> {
                    if (CommonUtils.isNetworkError(throwable)) {
                        return localDataSource.getTransactions(blockNumber, LIMITED_RESULT);
                    }
                    return Maybe.error(throwable);
                })
                .map(mapper.map());
    }

    @Override
    public Maybe<CompositeTransaction> getTransaction(final String id) {
        return remoteDataSource.getTransaction(id)
                .flatMapMaybe(
                        response -> localDataSource.save(response).andThen(Maybe.just(response)))
                .onErrorResumeNext(throwable -> {
                    if (CommonUtils.isNetworkError(throwable)) {
                        return localDataSource.getTransaction(id);
                    }
                    return Maybe.error(throwable);
                })
                .map(mapper.map());
    }

    @Override
    public Single<Long> getBlockHeight() {
        return remoteDataSource.getBlockHeight()
                .flatMap(height -> localDataSource.saveLastKnownBlockHeight(height)
                        .andThen(Single.just(height)))
                .onErrorResumeNext(throwable -> localDataSource.getLastKnownBlockHeight());
    }
}
```

**Note**: Data layer là outer layer của domain layer, do đó data layer sẽ biết về domain layer nhưng ngược lại thì không được phép. Data layer là các concrete của domain, nói cách khác, nó hiện thực hóa những gì đã được định nghĩa ở domain. Các repository ở data layer sẽ hiện thực hóa những repository được khai báo ở domain, cung cấp cách giao tiếp với data và web server, sẵn sàng cho mọi thay đổi mà không ảnh hưởng đến business của app.

### 3. Presentation

##### Model

```java
public class BlockModelView implements Parcelable, Mapable<Block, BlockModelView> {

    private long number;

    private String hash;

    private String createdAt;
       
       
    // Getter Setter and other implementation methods
}
```

**Note**: Mỗi layer đều có một model riêng. Nếu ở domain chính là entities - core business và độc lập hoàn toàn với các phần khác thì ở data layer, model chính là cách thức ta define để giao tiếp với database/webserver. Ở presentation là cách hiển thị lên view, những gì cần để hiển thị lên UI. 

##### Observer

```java
public class LiveDataObserver<T, R> extends Observer<T> {

    @NonNull
    private MutableLiveData<Resource<R>> liveData;

    private Function<T, R> mapFunction;

    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    private LiveDataObserver() {
    }

    public static <T, R> LiveDataObserver<T, R> from(@NonNull MutableLiveData<Resource<R>> liveData,
            @NonNull Function<T, R> mapFunction) {
        LiveDataObserver<T, R> observer = new LiveDataObserver<>();
        observer.liveData = liveData;
        observer.mapFunction = mapFunction;
        return observer;
    }

    @Override
    public void onSuccess(T data) {
        super.onSuccess(data);
        switchOnMain(() -> liveData.setValue(Resource.success(mapFunction.apply(data))));
    }

    @Override
    public void onError(Throwable throwable) {
        super.onError(throwable);
        switchOnMain(() -> liveData.setValue(Resource.error(throwable, null)));
    }

    @Override
    public void onSubscribed() {
        super.onSubscribed();
        switchOnMain(() -> liveData.setValue(Resource.loading(null)));
    }

    @Override
    public void onCompleted() {
        super.onCompleted();
        switchOnMain(() -> liveData.setValue(Resource.success(null)));
    }

    private void switchOnMain(Runnable action) {
        mainHandler.post(action);
    }
}
```

**Note**: Wrapper của `Observer` ở tầng domain, sử dụng với `LiveData` và notify data change trực tiếp trên `LiveData` object tương úng.

##### ViewModel 

```java
public class TransactionListViewModel extends ViewModel {

    private MutableLiveData<Resource<List<CompositeTransactionModelView>>> liveNextTransactions =
            new MutableLiveData<>();
    private MutableLiveData<Resource<List<CompositeTransactionModelView>>> liveLatestTransactions =
            new MutableLiveData<>();
    private MutableLiveData<Resource<List<CompositeTransactionModelView>>> liveRefreshTransactions =
            new MutableLiveData<>();
    private CompositeTransactionModelViewMapper mapper;
    
    @Override
    LiveData<Resource<List<CompositeTransactionModelView>>> nextTransactions() {
        return liveNextTransactions;
    }

    @Override
    LiveData<Resource<List<CompositeTransactionModelView>>> latestTransactions() {
        return liveLatestTransactions;
    }

    @Override
    LiveData<Resource<List<CompositeTransactionModelView>>> refreshedTransactions() {
        return liveRefreshTransactions;
    }

    @Override
    void getNextTransactions() {
        LiveDataObserver<CompositeTransactions, List<CompositeTransactionModelView>> output =
                LiveDataObserver.from(liveNextTransactions, mapper::transform);
        getTransactionsUseCase.next().execute(UseCase.EmptyInput.instance(), output);
    }

    @Override
    void refreshTransactions() {
        LiveDataObserver<CompositeTransactions, List<CompositeTransactionModelView>> output =
                LiveDataObserver.from(liveRefreshTransactions, mapper::transform);
        getTransactionsUseCase.refresh().execute(UseCase.EmptyInput.instance(), output);
    }

    @Override
    void fetchLatestTransactions() {
        LiveDataObserver<CompositeTransactions, List<CompositeTransactionModelView>> output =
                LiveDataObserver.from(liveLatestTransactions, mapper::transform);
        getTransactionsUseCase.fetchLatest().execute(UseCase.EmptyInput.instance(), output);
    }

    @Override
    public void onSchedule() {
        fetchLatestTransactions();
    }
}
```

##### View

```java
@Override
    protected void observe() {
        viewModel.nextTransactions().observe(this, observerNextTransactions());
    }

private Observer<Resource<List<CompositeTransactionModelView>>> observerNextTransactions() {
        return resource -> {
            progressBar.setVisibility(View.GONE);
            if (resource == null || resource.isEmpty()) return;
            if (resource.isSuccessful()) {
                List<CompositeTransactionModelView> transactions = resource.data();
                if (transactions.isEmpty()) {
                    viewModel.getNextTransactions();
                    return;
                }
                adapter.addTransactions(transactions);
            } else if (resource.isError()) {
                dialogManager.showError(resource.throwable());
            } else if (resource.isLoading()) {
                progressBar.setVisibility(View.VISIBLE);
            }
        };
    }
```

# Conclusion
**Clean Architecture** có rất nhiều điểm mạnh và cách thức tiếp cận, triển khai nó khác biệt so với truyền thống. Tuy nhiên, structure nào cũng có điểm mạnh, điểm yếu riêng, vận dụng nó cho phù hợp sẽ mang lại cho bạn một dự án tốt. Good luck !!

# Sample Code
- Kotlin: https://github.com/jollyjoker992/CleanArchitecture-Kotlin
- Java: https://github.com/jollyjoker992/CleanArchitecture-Java