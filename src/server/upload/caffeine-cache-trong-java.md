Caffeine là thư viện cache hiệu năng cao cho Java 8. Caffeine tương tự như Map, sự khác biệt cơ bản nhất là Map thì nó giữ toàn bộ các key-value cho đến khi được xóa một cách chủ động. Trong khi đó cache của Caffeine thì có cơ chế để tự động "trục xuất" các key-value một cách tự động.

Caffeine cung cấp cấu trúc linh hoạt để tạo nên bộ cache với sự kết hợp của các tính năng sau:
- Tự động nạp các mục vào cache, có tùy chọn không đồng bộ.
- Thu hồi kích thước size-based khi vượt quá giá trị max dựa trên tần suất và số lần truy cập gần đây.
- Thời gian hết hạn của các mục, được tính từ thời điểm ghi/đọc gần nhất.
- Làm mới (refress) bất đồng bộ khi xuất hiện yêu cầu ban đầu cho một entry.
- Thống kê truy cập.
## 1. Dependency
Để xửa dụng, ta cần thêm dependency vào file pom.xml (với Maven project)
```
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
    <version>2.5.5</version>
</dependency>
```
## 2. Nạp cache
Caffeine cung cấp 3 kiểu nạp: thủ công, tải đồng bộ, và tải bất đồng bộ.
Trước tiên chúng ta tạo một lớp đơn giản cho kiểu dữ liệu mà ta sẽ nạp vào cache.
```
class DataObject {
    private final String data;
 
    private static int objectCounter = 0;
    // standard constructors/getters
     
    public static DataObject get(String data) {
        objectCounter++;
        return new DataObject(data);
    }
}
```
### 2.1 Nạp manual
Chúng ta sẽ nạp giá trị vào cache một cách thủ công để rồi sau đó truy xuất dữ liệu từ cache.

Khởi tạo cache.
```
Cache<String, DataObject> cache = Caffeine.newBuilder()
  .expireAfterWrite(10, TimeUnit.MINUTES)
  .maximumSize(10000)
  .build();
```
Giờ thì ta nạp cache.
```
cache.put(key, dataObject);
dataObject = cache.getIfPresent(key);
 
assertNotNull(dataObject);
```
Chúng ta sử dụng method `getIfPresent()` để lấy dữ liệu từ cache. Method này sẽ trả về NULL nếu giá trị cần lấy tương ứng với trá trị `key` không tồn tại trong cache.
```
String key = "A";
DataObject dataObject = cache.getIfPresent(key);
 
assertNull(dataObject);
```
Interface `Cache` cho phép kiểm soát việc truy xuất, cập nhật và làm mất hiệu lực các entry.

Các thay đổi cũng có thể được thực hiện đối với bộ nhớ cache sử dụng bất kỳ phương pháp ConcurrentMap nào được hiển thị bởi `Cache.asMap()`.
### 2.2 Tải đồng bộ
```
LoadingCache<Key, Graph> cache = Caffeine.newBuilder()
    .maximumSize(10_000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .build(key -> createExpensiveGraph(key));
// Lookup and compute an entry if absent, or null if not computable
Graph graph = cache.get(key);
// Lookup and compute entries that are absent
Map<Key, Graph> graphs = cache.getAll(keys);
```
`LoadingCache` là một `Cache` được xây dựng với một `CacheLoader` đính kèm.
Ta có thể thực hiện tìm kiếm số lượng lớn bằng cách sử dụng method `getAll()`. Mặc định `getAll()` sẽ phát hành một lời gọi riêng đến `CacheLoader.load()` cho mỗi key không tồn tại trong cache. Khi mà việc truy xuất số lượng lớn hiệu quả hơn nhiều truy xuất đơn lẻ là lúc chúng ta có thể ghi đè ` CacheLoader.loadAll()` để khai thác điều này.

Lưu ý rằng, chúng ta có thể viết một thể hiện của ` CacheLoader.loadAll()` để tải các giá trị cho các key không được yêu cầu cụ thể. Ví dụ, nếu tính giá trị cho bất kỳ một key của một nhóm nào đó ta sẽ có giá trị của toàn bộ các key của nhóm đó thì, `loadAll()` có thể tải phần còn lại của nhóm một cách đồng thời.
### 2.3 Tải không đồng bộ
```
AsyncLoadingCache<Key, Graph> cache = Caffeine.newBuilder()
    .maximumSize(10000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    // Either: Build with a synchronous computation that is wrapped as asynchronous 
    .buildAsync(key -> createExpensiveGraph(key));
    // Or: Build with a asynchronous computation that returns a future
    .buildAsync((key, executor) -> createExpensiveGraphAsync(key, executor));

// Lookup and asynchronously compute an entry if absent
CompletableFuture<Graph> graph = cache.get(key);
// Lookup and asynchronously compute entries that are absent
CompletableFuture<Map<Key, Graph>> graphs = cache.getAll(keys);
```
Một `CacheLoader` được cung cấp khi tính toán được thể hiện tốt nhất theo cách đồng bộ. Ngoài ra, một `AsyncCacheLoader` sẽ được cung cấp khi tính toán được thể hiện không đồng bộ và trả về một `CompletableFuture`.

Một `AsyncLoadingCache` là một biến thể của `LoadingCache`, tính các mục trên một `Executor` và trả về một `CompletableFuture`. Điều này cho phép sử dụng cache với mô hình lập trình phổ biến reactive.
## 3. Thu hồi
Caffein cung cấp ba phương pháp thu hồi: size-based, time-based, và reference-based.
### 3.1 Thu hồi Size-base
```
// Evict based on the number of entries in the cache //
LoadingCache<Key, Graph> graphs = Caffeine.newBuilder()
    .maximumSize(10000)
    .build(key -> createExpensiveGraph(key));

// Evict based on the number of vertices in the cache
LoadingCache<Key, Graph> graphs = Caffeine.newBuilder()
    .maximumWeight(10000)
    .weigher((Key key, Graph graph) -> graph.vertices().size())
    .build(key -> createExpensiveGraph(key));
```
Nếu bạn muốn xây dựng một cache mà kích thước của nó không được phát triển quá một mốc cụ thể, hãy dùng `.maximumSize(long)`. Khi đó cache của bạn sẽ loại bỏ những entry nào mà lâu không được sử dụng, hay không thường xuyên dùng đến.

Ngoài ra, nếu các entry khác nhau có "weights" khác nhau, ví dụ: các value có "weights" khác nhau, bạn muốn thiết lập giá trị max cho nó thì dùng `Caffeine.weigher(Weigher)`. Bạn muốn thiết lập giá trị max cho toàn bộ cache thì dùng `Caffeine.maximumWeight(long
### 3.2 Thu hồi Time-based
```
// Evict based on a fixed expiration policy
LoadingCache<Key, Graph> graphs = Caffeine.newBuilder()
    .expireAfterAccess(5, TimeUnit.MINUTES)
    .build(key -> createExpensiveGraph(key));
LoadingCache<Key, Graph> graphs = Caffeine.newBuilder()
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .build(key -> createExpensiveGraph(key));

// Evict based on a varying expiration policy
LoadingCache<Key, Graph> graphs = Caffeine.newBuilder()
    .expireAfter(new Expiry<Key, Graph>() {
      public long expireAfterCreate(Key key, Graph graph, long currentTime) {
        // Use wall clock time, rather than nanotime, if from an external resource
        long seconds = graph.creationDate().plusHours(5)
            .minus(System.currentTimeMillis(), MILLIS)
            .toEpochSecond();
        return TimeUnit.SECONDS.toNanos(seconds);
      }
      public long expireAfterUpdate(Key key, Graph graph, 
          long currentTime, long currentDuration) {
        return currentDuration;
      }
      public long expireAfterRead(Key key, Graph graph,
          long currentTime, long currentDuration) {
        return currentDuration;
      }
    })
    .build(key -> createExpensiveGraph(key));
```
Caffeine cung cấp ba phương pháp thu hồi time-base:
- ` expireAfterAccess(long, TimeUnit)`: Thu hồi khi dữ liệu cache có thời gian không được truy cập (đọc, ghi) vượt quá giá trị thiết lập.
- `xpireAfterWrite(long, TimeUnit)`: Thu hồi sau một khoảng thời gian entry được tạo ra (không quan tâm entry này có còn được truy cập hay không).
- `expireAfter(Expiry)`: Cho phép kết hợp nhiều cách thu hồi. Expiry có thể là `expireAfterCreate()`, `expireAfterUpdate()`, hay `expireAfterRead()`.
### 3.3 Thu hồi Reference-based
```
// Evict when neither the key nor value are strongly reachable
LoadingCache<Key, Graph> graphs = Caffeine.newBuilder()
    .weakKeys()
    .weakValues()
    .build(key -> createExpensiveGraph(key));

// Evict when the garbage collector needs to free memory
LoadingCache<Key, Graph> graphs = Caffeine.newBuilder()
    .softValues()
    .build(key -> createExpensiveGraph(key));
```
Caffeine cho phép ta thiết lập cache để cho trình rọn rác Garbage collection làm việc, bằng cách sử dụng tham chiếu "yếu" cho các khóa-key, sử dụng tham chiếu "yếu", và tham chiếu "mềm" cho các giá trị-value.

`Caffeine.weakKeys()` lưu trữ các key bằng tham chiếu "yếu". Điều này cho phép các entry được "thu dọn" nếu không có tham chiếu "mạnh" nào khác.

`Caffeine.weakValues()` lưu trữ giá trị bằng tham chiếu "yếu". Điều này cho phép các entry được "thu dọn" nếu không có tham chiếu "mạnh" nào khác.

`Caffeine.softValues()` lưu trữ giá trị bằng tham chiếu "mềm".

Các phương trên đều sử dụng "==" để so sánh giá trị-value, hay khóa-key thay vì sử dụng `equals`.
## 4. Làm mới - Refress cache
```
LoadingCache<Key, Graph> graphs = Caffeine.newBuilder()
    .maximumSize(10000)
    .refreshAfterWrite(1, TimeUnit.MINUTES)
    .build(key -> createExpensiveGraph(key));
```
Refress không hoàn toàn giống loại bỏ. Được chỉ định ở method `LoadingCache.refresh(K)`, khi một khóa-key được làm mới sẽ tải giá trị-value mới cho key một cách bất đồng bộ.

Ngược lại với `expireAfterWrite`, `refreshAfterWrite` sẽ làm cho một khóa đủ điều kiện làm mới sau một khoảng thời gian chỉ định. Nhưng làm mới chỉ thực sự bắt đầu khi một entry được truy vấn. Ta có thể thiết lập refreshAfterWrite và expireAfterWrite trên cùng một cache. Bởi vậy bộ đếm thời gian hết hạn không được đặt lại một cách mù quáng bất cứ khi nào một entry đủ điều kiện làm mới. Nếu một entry không được truy vấn khi đủ điều kiện làm mới, nó sẽ được phép hết hạn.

Hoạt động làm mới được thực hiện không đồng bộ bằng cách sử dụng một Executor. Trình xử lý mặc định là `ForkJoinPool.commonPool()` và có thể được ghi đè qua `Caffeine.executor(Executor)`.
## 5. Thống kê - Statistics
```
Cache<Key, Graph> graphs = Caffeine.newBuilder()
    .maximumSize(10000)
    .recordStats()
    .build();
```
Bằng việc gọi `Caffeine.recordStats()`, chúng ta "bật" hệ thống thống kê. Method `Cache.stats()` trả về `CacheStats` cung cấp các số liệu thống kê như:
- `hitRate()`: trả về số lần truy cập
- `evictionCount()`: cho biết số cache loại bỏ
- `averageLoadPenalty()`: cho biết thời gian trung bình nạp giá trị mới

Những thống kê này rất quan trọng trong việc điều chỉnh bộ nhớ cache. Chúng ta nên theo dõi những thống kê này trong những ứng dụng quan trọng.

**Tài liệu tham khảo**
- [baeldung - Introduction to Caffeine](www.baeldung.com/java-caching-caffeine)
- [awesomeJava - Caffeine caching](https://github.com/ben-manes/caffeine/wiki)