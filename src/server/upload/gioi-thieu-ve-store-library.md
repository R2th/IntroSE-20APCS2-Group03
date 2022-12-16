Xin chào các bạn, trong bài viết này mình xin giới thiệu về Store Library và cách sử dụng nó để tối ưu hóa việc load dữ liệu
## 1. Vấn đề
* Để ứng dụng chạy mượt mà, tối ưu thì dữ liệu phải "**fluid**" và luôn sẵn sàng
* Người dùng mong muốn ứng dụng phải có UX tuyệt vời, họ không bao giờ muốn bị ngắt quãng bởi việc load dữ liệu mới. Cho dù ứng dụng là xã hội, tin tức hay kinh doanh với doanh nghiệp, người dùng mong đợi trải nghiệm liền mạch cả trực tuyến và ngoại tuyến.
* Đặc biết trên nền tảng di động, người dùng luôn mong muốn việc load dữ liệu tối thiểu để tiết kiệm dung lượng 3G đỡ tốn tiền của họ :))

-> Store Library là giải pháp tuyệt vời để tối ưu hóa việc tải (fetching), nạp (parsing), lưu trữ (storage), truy vấn(retrieval) dữ liệu trên ứng dụng Android. Store Librayry tương tự như Reposipory Pattern mà bạn có thể tham khảo trên các ứng dụng google sample của Google, chúng sử dụng Reactive Programing để tạo thành luồng dữ liệu cố định
  Nó cũng cung cấp các lớp trừu tượng giữa tầng UI và tầng dữ liệu
  
## 2. Tổng quan
Store có nhiệm vụ quản lý một request data. Khi ta implement Store, cần cung cấp cho nó một trình tải xuống (Fether),nó thực chất là một hàm xác định cách data sẽ được tìm nạp qua network. Ta cũng có thể xác định cách Store sẽ lưu trữ dữ liệu trong bộ nhớ (memory) và trên đĩa(disk), cũng như cách parsing data. Khi store trả về dữ liệu là một Observale, luồng là một khoe! Khi Store được tạo, nó sẽ xử lý logic xung quanh luồng dữ liệu, cho phép chế độ xem của bạn sử dụng nguồn dữ liệu tốt nhất và đảm bảo rằng dữ liệu mới nhất luôn có sẵn để sử dụng offline sau này. 

Store thúc đẩy RxJava và multiple request điều chỉnh để ngăn chặn các cuộc gọi quá mức vào mạng và bộ nhớ cache trên đĩa. Bằng cách sử dụng Store, bạn loại bỏ khả năng tràn ngập mạng của bạn với cùng một yêu cầu trong khi thêm hai lớp bộ nhớ đệm (bộ nhớ và đĩa).

## 3. Tích hợp vào project
Include gradle dependency
```
implementation 'com.nytimes.android:store3:3.1.0'
```
Set the source & target compatibilities to 1.8
Bắt đầu với Store 3.0, retrolambda không còn được sử dụng nữa. Vì vậy, để cho phép hỗ trợ cho lambdas, Java sourceCompatibility và targetCompatibility cần phải được đặt thành 1.8
```
android {
    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
    ...
}
```
# 4. Ví dụ
Chúng ta cùng xem 1 ví dụ sample của Store ở dạng đầy đủ.
```
Store<ArticleAsset, Integer> articleStore = StoreBuilder.<Integer, BufferedSource, ArticleAsset>parsedWithKey()
        .fetcher(articleId -> api.getArticleAsBufferedSource(articleId))  // OkHttp responseBody.source()
        .persister(FileSystemPersister.create(FileSystemFactory.create(context.getFilesDir()), pathResolver))
        .parser(GsonParserFactory.createSourceParser(gson, ArticleAsset.Article.class))
        .open();
```
Với thiết lập trên bạn có: 
* Bộ nhớ đệm trong bộ nhớ để quay 
* Bộ nhớ đệm đĩa cho khi người dùng đang ngoại tuyến 
* Phân tích qua API trực tuyến để giới hạn mức tiêu thụ bộ nhớ 
* Rich API để yêu cầu dữ liệu cho dù bạn muốn lưu vào bộ nhớ cache, mới hoặc luồng tương lai cập nhật dữ liệu.

Và bây giờ chúng ta sẽ đi vào chi tiết hơn duoiws đây

### Tạo một Store

Bạn tạo một Store sử dụng builder. Yêu cầu chỉ là include một `Fetcher<ReturnType, KeyType>` nó trả về một `Single<ReturnType>` và có một phương thức `fetch(key)`

```java
Store<ArticleAsset, Integer> store = StoreBuilder.<>key()
        .fetcher(articleId -> api.getArticle(articleId))  // OkHttp responseBody.source()
        .open();
```

Lưu trữ sử dụng generic keys như một identifiers cho dữ liệu. một key có thể có nhiều giá trị và nó implement `toString()`, `equals()` và `hashCode()`. Khi phương thức `Fetcher` của bạn được gọi, nó sẽ được passed cụ thể một Key value. Tương tự, key sẽ được sử dụng như một primary identifier bên trong caches. (Chắc chắn rằng bạn có một phương thức `hashCode()` thích hợp).

### Key implementation - Barcodes

Để thuận tiện, chúng ta đã include key implementation được gọi là `BarCode`. `BarCode` có hai trường `String key` và `String type`

```java
BarCode barcode = new BarCode("Article", "42");
```

Khi sử dụng một `BarCode` như key của bạn. bạn có thể sử dụng phương thức của `StoreBuilder`

```java
Store<ArticleAsset, BarCode> store = StoreBuilder.<ArticleAsset>barcode()
        .fetcher(articleBarcode -> api.getAsset(articleBarcode.getKey(), articleBarcode.getType()))
        .open();
```

### Public Interface - Get, Fetch, Stream, GetRefreshing

```java
Single<Article> article = store.get(barCode);
```

Đầu tiên bạn cần phải subscribe một `store.get(barCode)`, response sẽ được lưu trữ trong bộ nhớ cache. Tất cả subsequent gọi tới `store.get(barCode)` với cùng Key sẽ lấy lại data ở version đã được cache, data được gọi sẽ được giảm thiểu trong mức cần thiết. Điều này ngăn ứng dụng của bạn tìm nạp dữ liệu mới qua mạng (hoặc từ một nguồn dữ liệu ngoài khác) trong các tình huống khi làm như vậy sẽ làm lãng phí băng thông và pin một cách không cần thiết. Trường hợp sử dụng tuyệt vời là bất cứ khi nào chế độ xem của bạn được tạo lại sau khi xoay màn hình, họ sẽ có thể yêu cầu dữ liệu được lưu trong bộ nhớ cache từ Store của bạn. 

Luồng dữ liệu sẽ trông như thế này

![Stroe](https://github.com/nytm/Store/raw/feature/rx2/Images/store-1.jpg)

Với mặc đinh, 100 items sẽ được cache trong bộ nhớ trong 24h. Bạn có thể truy cập chúng trong instance của một Guava Cache để override

### Busting through the cache

Hoặc bạn có thể gọi `store.fetch(barCode)` để nhận về mộ `Observable`, nó bỏ qua bộ nhớ (và tùy chọn disk cache).

Làm mới dữ liệu được gọi sẽ giống như `store.fetch()`

![store.fetch()](https://github.com/nytm/Store/raw/feature/rx2/Images/store-2.jpg)

### Thêm một Parser

Vì rất hiếm khi dữ liệu đến từ mạng theo định dạng mà bạn mong muốn, Strore có thể ủy quyền cho trình parser bằng cách sử dụng `StoreBuilder.<BarCode, BufferedSource, Article>parsedWithKey()`

```java
Store<Article, Integer> store = StoreBuilder.<Integer, BufferedSource, Article>parsedWithKey()
        .fetcher(articleId -> api.getArticle(articleId)) 
        .parser(source -> {
            try (InputStreamReader reader = new InputStreamReader(source.inputStream())) {
                return gson.fromJson(reader, Article.class);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        })
        .open();
```

Dữ liệu được cập nhật của bạn sẽ trông như dưới đây
`store.get()` ->

![store.get()](https://github.com/nytm/Store/raw/feature/rx2/Images/store-3.jpg)

### Middleware - GsonSourceParser

Có các thư viện phần mềm trung gian khác để parsers giúp bạn khi bạn lấy dữ liệu như `Reader`, `BufferedSource`, hoặc `String` và trình parser là Gson:

- GsonReaderParser
- GsonSourceParser
- GsonStringParser

Chúng có thể cho phép truy cập thông qua một class Factory (`GsonParserFactory`)

Ví dụ của chúng ta bây giờ được viết lại như sau

```java
Store<Article, Integer> store = StoreBuilder.<Integer, BufferedSource, Article>parsedWithKey()
        .fetcher(articleId -> api.getArticle(articleId)) 
        .parser(GsonParserFactory.createSourceParser(gson, Article.class))
        .open();
```

Trong một vài trường hợp, bạn cần phải parse ở top level JSONArray, trong trường hợp bạn có thể cung cấp `TypeToken`.

```java
Store<List<Article>, Integer> store = StoreBuilder.<Integer, BufferedSource, List<Article>>parsedWithKey()
        .fetcher(articleId -> api.getArticles()) 
        .parser(GsonParserFactory.createSourceParser(gson, new TypeToken<List<Article>>() {}))
        .open();  
```

Tượng tự chúng ta có thư viện trung gian khác như Moshi & Jackson!

### Disk caching
Store có thể kích hoạt bộ nhớ disk bằng cách chuyển một Persister vào một builder. Bất cứ khi nào một request network được thực hiện, việc đầu tiên Store sẽ ghi vào disk cache sau đó đọc từ đó ra. Luồng dữ liệu của nó sẽ trông như thế này: store.get() ->

![image](https://github.com/nytm/Store/raw/feature/rx2/Images/store-5.jpg)

Lý tưởng nhất dữ liệu sẽ được lấy từ mạng qua cache bằng cách sử dụng BufferedSource hay Reader:
```java
Store<Article, Integer> store = StoreBuilder.<Integer, BufferedSource, Article>parsedWithKey()
        .fetcher(articleId -> api.getArticles())
        .persister(new Persister<BufferedSource>() {
            @Override
            public Maybe<BufferedSource> read(Integer key) {
                if (dataIsCached) {
                    return Observable.fromCallable(() -> userImplementedCache.get(key));
                } else {
                    return Observable.empty();
                }    
            }
    
            @Override
            public Single<Boolean> write(BarCode barCode, BufferedSource source) {
                userImplementedCache.save(key, source);
                return Single.just(true);
            }
        })
        .parser(GsonParserFactory.createSourceParser(gson, Article.class))
        .open();
```
Store không quan tâm đến cách thức ta lưu trữ hay truy xuất data từ disk. Vì vậy ta có thể lưu trữ dữ liệu bằng bất kì loại cơ sở dữ liệu nào (Realm, SQLite, CouchDB, Firebase, v.v.). Yêu cầu duy nhất là dữ liệu phải cùng loại khi được lưu trữ và truy xuất khi được nhận từ `Fetcher` .  
Lưu ý rằng, khi sử dụng Parser với một dish cache, Parser sẽ được gọi đến sau khi đã fetch từ disk chứ không phải giữa từ network và disk. Điều này cho phép cơ sở dữ liệu của bạn hoạt động trực tiếp trong luồng lấy dữ liệu từ mạng .

Nếu bạn không sử dụng SqlBrite, một Observable có thể được tạo ra chỉ đơn giản với `Observable.fromCallable (() -> getDBValue ())`

### Middleware - SourcePersister & FileSystem

Store đã tìm ra cách nhanh nhất để lấy dữ liệu từ network vào diskcache. Store đã bao gồm một thư viện riêng với một hệ reactive FileSystem (hệ thống file reactive) Okio `BufferedSource`. Store đã bao gồm một FileSystemPersister sẽ cung cấp cho bạn bộ nhớ diskcache và hoạt động tốt với GsonSourceParser. Khi sử dụng FileSystemPersister, bạn phải truyền vào PathResolver, nó sẽ cho hệ thống file biết cách đặt tên đường dẫn đến các mục trong bộ đệm.
Cùng xem xét ví dụ 

```java
Store<Article, Integer> store = StoreBuilder.<Integer, BufferedSource, Article>parsedWithKey()
        .fetcher(articleId -> api.getArticles(articleId)) 
        .persister(FileSystemPersister.create(FileSystemFactory.create(context.getFilesDir()), pathResolver))
        .parser(GsonParserFactory.createSourceParser(gson, String.class))
        .open();
```

- Như đã đề cập, Store Builder ở trên là cách Store làm việc với các request network với các method trên ta có: 
- Bộ nhớ cache với Guava Cache 
- Disk cache với FileSystem (bạn có thể sử dụng lại việc triển khai hệ thống tệp giống nhau cho tất cả các Store) 
- Phân tích từ BufferedSource (đến một bài viết trong trường hợp của chúng tôi) với Gson 
- Quản lý các request mạng trong chế độ máy bay
- Có thể nhận dữ liệu được lưu trong bộ nhớ cache hoặc vượt qua bộ nhớ cache của bạn (get () so với fetch ()) 
- Có thể thông báo và đăng ký lại khi xóa bộ nhớ cache (hữu ích cho những lúc bạn cần thực hiện POST và cập nhật một màn hình khác, chẳng hạn như với getRefreshing ())

### RecordProvider
Nếu bạn muốn Store biết về tính ổn định của dữ liệu ổ đĩa, bạn có thể yêu cầu Persister triển khai RecordProvider. Sau khi làm như vậy, ta có thể định cấu hình Store hoạt động theo một trong hai cách:

```java
store = StoreBuilder.<BufferedSource>barcode()
                .fetcher(fetcher)
                .persister(persister)
                .refreshOnStale()
                .open();
```

`refreshOnStale()`  sẽ lấp đầy bộ đệm đĩa bất cứ khi nào một bản ghi cũ. User vẫn sẽ nhận được bản ghi cũ trả lại cho họ. Cách khác : 

```java 
store = StoreBuilder.<BufferedSource>barcode()
                .fetcher(fetcher)
                .persister(persister)
                .networkBeforeStale()
                .open();
```

`networkBeforeStale()` : Store sẽ lấy dữ liệu từ mạng khi dữ liệu đĩa cũ. Nếu nguồn dữ liệu từ mạng không họat động, dữ liệu trong đĩa sẽ được lấy ra.
### Subclassing a Store
Chúng ta có thể tạo subclass implement Store,(RealStore<T>) 

```java
public class SampleStore extends RealStore<String, BarCode> {
    public SampleStore(Fetcher<String, BarCode> fetcher, Persister<String, BarCode> persister) {
        super(fetcher, persister);
    }
}
```

Subclass sẽ rất hữu ích khi ta sử dụng với Dagger :
   
```java 
public class SampleStore extends RealStore<String, BarCode> {
   @Inject
   public SampleStore(Fetcher<String, BarCode> fetcher, Persister<String, BarCode> persister) {
        super(fetcher, persister);
    }
}
```


- Nguồn dịch bài: [Android Library for Async Data Loading and Caching](https://github.com/NYTimes/Store/)