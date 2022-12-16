Trong bài viết này mình sẽ hướng dẫn các bạn cách cache dữ liệu ở local, giúp cho việc giảm số lượng request đến server và tăng hiệu năng của chương trình. Các bạn hoàn toàn không cần sử dụng cache mà có thể trực tiếp request tới server.

# Vai trò của bộ nhớ cache
Trước tiên, chúng ta cần hiểu tại vai trò của bộ nhớ cached (bộ nhớ đệm) ? Bộ nhớ cached rất hữu ích trong các tình huống sau:

* Giảm các kết nối api tới server: Bởi vì sử dụng cache chúng ta sẽ lưu trữ dữ liệu ở dưới local, nên ngay khi có thể chúng ta sẽ load từ local ra chứ k phải call api server. Điều này sẽ giúp giảm các kết nối và làm tăng performance của server.
* Lấy dữ liệu rất nhanh: Vì lấy dữ liệu từ local nên thời gian lấy dữ liệu sẽ được nhanh hơn.

# Phân loại bộ nhớ cache
Có hai loại bộ nhớ cache như sau:

* **Memory cache** : Nó lưu trữ dữ liệu trong bộ nhớ của ứng dụng. Nếu ứng dụng bị kill, dữ liệu sẽ bị mất. Chỉ hữu ích trong cùng một phiên sử dụng ứng dụng. Memory cache là bộ đệm nhanh nhất để lấy dữ liệu vì nó được lưu trữ trong RAM.
* **Disk Cache**: Nó lưu dữ liệu vào ổ đĩa (như Sharepreference, database, file) . Nếu ứng dụng bị kill, dữ liệu được giữ lại. Hữu ích ngay cả sau khi ứng dụng khởi động lại. Chậm hơn memory cache, vì đây là thao tác I / O.
# Bộ nhớ cache hoạt động như thế nào?
![](https://s3.ap-south-1.amazonaws.com/mindorks-server-uploads/caching-flow.png)

Lần đầu tiên, người dùng mở ứng dụng, sẽ không có dữ liệu trong Memory cache và Disk cache. Vì vậy, ứng dụng sẽ phải call api để lấy dữ liệu. Nó sẽ lấy dữ liệu từ mạng và lưu nó vào disk cahe, giữ nó trong memory cache và trả lại dữ liệu.

Nếu người dùng vào cùng một màn hình trong cùng một phiên làm việc, dữ liệu sẽ được tìm nạp rất nhanh từ memory cache. Tốc độ lấy nhanh như việc bạn truy xuất đến một giá trị của một biến đã được lưu trữ trong RAM. (Đơn giản giống như việc cầm bánh và ăn thôi)

Nếu người dùng kill app và khởi động lại, dữ liệu trong memory cache sẽ bị xóa đi, trong trường hợp này nó sẽ lấy dữ liệu từ trong disk cache, lưu trữ lại trong memory cache và trả về dữ liệu. (Cũng giống như cầm bánh và ăn nhưng phần này phức tạp hơn một xí là bạn sẽ phải lấy nó từ trong túi ra rồi mới ăn)

# Triển khai
Vậy là các bạn đã hiểu cơ bản về luồng hoạt động của caching dữ liệu rồi đúng không nào. Bây giờ chúng ta sẽ bắt đầu triển khai nó trên android cùng với RxJava và RxAndroid nhé.
Ở đây mình mặc định các bạn đã biết về RxJava và RxAndroid. Bạn nào chưa rõ về thư viện cực kì mạnh mẽ này có thể tham khảo các loạt bài viết trên viblo về chủ đề này nhé. 

https://viblo.asia/p/cung-hoc-rxjava-phan-1-gioi-thieu-aRBeXWqgGWE
https://viblo.asia/p/cung-hoc-rxjava-phan-2-threading-concept-MgNeWWwXeYx
https://viblo.asia/p/cung-hoc-rxjava-phan-3-core-operators-mrDkMrpzvzL

## Bước 1. Tạo interface DataSource
Tạo một interface ```DataSource``` có 1 function để tuơng tác và lấy dữ liệu
```
interface DataSource {
    fun getData(): Observable<String>
}
```
## Bước 2. Xử lý data với remote.
Tạo một class ```NetworkDataSource``` để xử lý data khi call api. Ở đây mình sẽ giả lập việc gọi kết nối server. Các bạn có thể sử dụng các thư viện hoặc HttpUrlConnection để call RESTFul api nhé

```
class NetworkDataSource : DataSource {
    override fun getData(): Observable<String> {
        // try to make network call
        return Observable.just("This is data get from network")
            .debounce(5, TimeUnit.SECONDS)
    }
}
```

## Bước 3. Xử lý data ở DiskCache
Tạo một class là ```DiskDataSource``` để xử lý việc save và get data từ trong disk cache. Ở đây để đơn gỉan mình sử dụng SharedPreference. Trong các trường hợp khác các bạn có thể sử dụng Database để lưu trữ dữ liệu trong Disk cache
```
const val PREF_DATA = "PREF_DATA"

class DiskDataSource(private val preferences: SharedPreferences) : DataSource {

    override fun getData(): Observable<String> {
        return Observable.create { emitter ->
            // You can use database instead of SharePreference
            val data = preferences.getString(PREF_DATA, null)
            if (data != null) {
                emitter.onNext(data)
            }
            emitter.onComplete()
        }
    }

    /**
     * Save data when get response from network
     */
    fun saveData(data: String?) {
        if (data != null) {
            preferences.edit().putString(PREF_DATA, data).commit()
        }
    }
}
```

## Bước 3. Xử lý data ở Memory cache
Tạo một class là ```MemoryDataSource``` để xử lý save data và get data từ memory cached
Ở đây rất đơn giản mình lưu trữ vào 1 biến là ```data```
```

class MemoryDataSource : DataSource {
    private var data: String? = null

    override fun getData(): Observable<String> {
        return Observable.create { emitter ->
            data.let {
                emitter.onNext(data!!)
            }
            emitter.onComplete()
        }
    }

    fun saveData(data: String) {
        this.data = data
    }
}
```
## Bước 4. Xử lý việc caching data.
Tạo một class là ```DataRepository``` để thực hiện việc caching. Class này sẽ có nhiệm vụ điều phối việc get data từ trong 
* Memory cache
* Disk cache 
* Network 

```
public class DataRepository implements DataSource {
    private MemoryDataSource memoryDataSource;
    private DiskDataSource diskDataSource;
    private NetworkDataSource networkDataSource;

    public DataRepository(MemoryDataSource memoryDataSource,
                          DiskDataSource diskDataSource,
                          NetworkDataSource networkDataSource) {
        this.networkDataSource = networkDataSource;
        this.diskDataSource = diskDataSource;
        this.memoryDataSource = memoryDataSource;
    }

    @Override
    public Observable<String> getData() {
        Observable<String> memory = getDataFromMemory();
        Observable<String> disk = getDataFromDiskCached();
        Observable<String> network = getDataFromNetwork();
        return Observable.concat(memory, disk, network)
                .firstElement()
                .toObservable();
    }

    /**
     * Get data from network and save to memory and disk cached
     *
     * @return
     */
    private Observable<String> getDataFromNetwork() {
        return networkDataSource.getData()
                .doOnNext(new Consumer<String>() {
                    @Override
                    public void accept(String data) {
                        diskDataSource.saveData(data);
                        memoryDataSource.saveData(data);
                    }
                });
    }

    /**
     * Get data from disk cached and save to memory
     *
     * @return
     */
    private Observable<String> getDataFromDiskCached() {
        return diskDataSource.getData()
                .doOnNext(new Consumer<String>() {
                    @Override
                    public void accept(String data) {
                        memoryDataSource.saveData(data);
                    }
                });
    }

    /**
     * Just get data from memory
     *
     * @return
     */
    private Observable<String> getDataFromMemory() {
        return memoryDataSource.getData();
    }
}

```

Chúng ta cùng quan tâm tới fun quan trọng trong việc getData nhé
```
    @Override
    public Observable<String> getData() {
        Observable<String> memory = getDataFromMemory();
        Observable<String> disk = getDataFromDiskCached();
        Observable<String> network = getDataFromNetwork();
        return Observable.concat(memory, disk, network)
                .firstElement()
                .toObservable();
    }

```

### Toán tử concat.
Toán tử concat trong Rx cho phép chúng ta gộp các element được phát ra bởi 2 hoặc nhiều Observable (ở đây là 3) thành 1 dòng duy nhất mà không thay đổi thứ tự của chúng. 
![](https://images.viblo.asia/c785c40a-c84e-4307-9def-8389bcf7e486.jpg)

Như các bạn thấy trong hình trên, 2 Observable (1) và (2), thì Observable thứ (2) luôn được phát ra sau Observable (1).

Trong bài toán này chúng ta dùng toán tử  ```concat``` để  duy trì thứ tự các ```Observable```, bắt đầu với việc load data từ memory, đến disk cache và cuối cùng là network. Và thứ tự này sẽ không bao giờ bị thay đổi. 

### Toán tử firstElement
Toán tử first cho phép chỉ phát ra 1 element duy nhất, và chặn toàn bộ các element được phát ra phía sau. 
Như trong bài toán của chúng ta nếu element được phát ra bởi Observable ```memory``` thì ```disk``` và ```network``` sẽ bị chặn và không call nữa, và tương tự cho các observable phía sau ```disk``` và ```network``` theo thứ tự được viết vào trong hàm concat.
![](https://images.viblo.asia/553850fa-3455-48c0-a3ef-14147d3483f8.jpg)

# Phân tích ưu và nhược điểm
### Ưu điểm
* Tốc độ load data sẽ nhanh hơn 
* Giảm thiếu việc request nhiều lần tới server

### Nhược điểm
* Data không được mới nhất (Không được up to date so với server)

# Demo
![](https://images.viblo.asia/4866df4a-c624-4455-8ad4-0b05689875bc.gif)

Trên đây mình đã hướng dẫn các bạn caching data ở local sử dụng RxJava và RxAndroid. 

Bài viết có tham khảo từ 

https://blog.mindorks.com/implement-caching-in-android-using-rxjava-operators

http://reactivex.io/documentation/operators/

Link project demo 
https://github.com/DoanVanToan/CachingDataRx

Rất cám ơn các bạn đã đón đọc, chúc các bạn học tốt !