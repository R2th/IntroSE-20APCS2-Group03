## 1.Mở đầu.
Vào tháng 5 năm 2018 Google đã đưa ra ***Android Jetpack***. Android Jectpack là một tập hợp các ***libraries***, ***tools*** và ***architechtural guidance*** để giúp bạn tạo ra các ứng dụng Android tuyệt vời một cách nhanh chóng và dễ dàng. Nó cung cấp mã code cơ bản, là nền tảng cho bạn thiết kế ứng dụng trở nên độc đáo. 

![](https://images.viblo.asia/f2686db8-ad5d-474e-a0a1-e9fbc695a6d2.png)

Như trên hình bạn có thể thấy ***Android Jetpack*** bao gồm ***Foundation***, ***Architechture***, ***Behavior*** và ***UI***. Thuộc ***Architecture Components*** thì có ***Navigation***, ***Paging***, ***WorkManager*** mới được giới thiệu vào tháng 5/2018. Còn ***Data Binding*** thì đã có khá lâu (từ 2015). 

4 Components còn lại là ***Room***, ***LiveData***, ***Lifecycle***, ***ViewModel*** thì được Google đưa ra tháng 11 năm 2017 của phiên bản ***Architecture Components*** 1.0 đầu tiên cho Android. ***Android Architecture Components*** là một bộ sưu tập các thư viện giúp các lập trình viên thiết kế các ứng dụng Android một cách *mạnh mẽ, có thể dễ dàng test và maintain*. Ban đầu là xây dựng một số lớp dùng để *quản lý vòng đời thành phần UI và xử lý data một cách bền vững, hiệu quả*. ***Architecture Components*** ra đời năm ngoái nhưng vẫn còn khá mới mẽ với hầu hết các lập trình viên. Và nó là giải pháp thiết kế ứng dụng cho tương lai, là một Android Developer bạn cần phải nắm bắt chúng. Ở bài viết này, do lượng kiến thức quá dài và có thể gây nhàm chán cho người đọc nên mình xin trình bày chung nhất về tư tưởng của *Architechture Components*  phiên bản 1.0 gồm 4 components là ***Room***, ***LiveData***, ***Lifecycle*** và ***ViewModel***. Những bài viết sau mình sẽ trình bày thêm các components còn lại cũng như chi tiết từng component. Nào, ta bắt đầu thôi!

## 2.Why "Architecture" Components?
Câu hỏi đặt ra là *Architechture Components* được đưa ra để làm gì. Thì sau đây là các giá trị mà nó mang lại.

***1.Persist Data:*** sử dụng data một cách bền vững, hiệu quả.

***2.Manage Lifecycle:*** Quản lý vòng đời các thành phần cũng như ứng dụng.

***3.Modular:*** Chia ứng dụng, thành phần thành các module nhỏ để dễ dàng quản lý.

***4.Defense Against Common Errors:*** Phòng chống, hạn chế các lỗi thường gặp, như memory leaks chẳng hạn.

***5.Less Boilerplate:*** tránh cho việc bạn viết code một cách nhàm chán.

![](https://images.viblo.asia/e6ffa7b0-964c-41de-a044-d3f3c92418ce.png)

Khi ứng dụng của bạn cần một Databse kết nối mạnh mẽ, tối ưu, hiệu quả với UI

![](https://images.viblo.asia/2c61d572-11ab-484c-b831-965b0d93de37.png)

Thì các Components mới như ***Room***, ***ViewModel***, ***LiveData***, ***Lifecycle*** sẽ xử lý việc đó thật dễ dàng. Và 4 thành phần này được thiết kế để làm việc với nhau như một khối thống nhất. Chúng ta hay cùng lần lượt xem nhé.

## 3.Room.
***Room*** là một thư viện ánh xạ đối tượng SQL mạnh mẽ. Bạn nên xử lý database sử dụng ***Room***, nó được xem như là một SQLite mới. Để cài đặt các bảng sử dụng ***Room*** chúng ta phải định nghĩa một *Plain Old Java Object* (POJO - là gì thì các bạn có thể tự đọc lại nhé) :
```java
    public class Trail {
        public String id;
        public String name;
        public double kilometers;
        public in difficult;
    }
```
sau đó đánh dấu nó với một @Entity anotation cùng với đánh dấu ID bằng @PrimaryKey annotation:
```java
    @Entity
    public class Trail {
        public @PrimaryKey String id;
        public String name;
        public double kilometers;
        public in difficult;
    }
```

Với mỗi *POJO* bạn cần định nghĩa một *DAO* (Data Access Object):
```java
    @Dao
    public interface TrailDao {
        //Create, read, update, delete examples.
        @Insert(onConflict == IGONE)
        void insertTrail(Trail trail);
    
        @Query("SELECT * FROM Trail")
        public List<Trail> findAllTrails();
    
        @Update(onConflict = REPLACE)
        void updateTrail(Trail trail);
    
        @Query("DELETE FROM Trail")
        void deleteAll();
    }
```
Các phương thức được chú thích để thể thiện lện trong SQLite mà bạn cần để tương tác với dữ liệu *POJO* của bạn.
Bây giờ chúng ta hãy xem lại insert method: 
```java
        //Create.
        @Insert(onConflict == INGORE)
        void insertTrail(Trail trail);
```
và query method:
```java
        //Query
        @Query("SELECT * FROM Trail")
        public List<Trail> findAllTrails();
```
Thì ta thấy ***Room*** đã tự động convert đối tượng *POJO* của bạn vào các bảng database tương ứng. Ngoài ra ***Room*** cũng xác minh SQLite tại thời điểm biên dịch. Vì vậy nếu bạn viết sai một cái gì đó, hoặc tham chiếu mà không có trong database thì nó sẽ báo lỗi.
Bây giờ ứng dụng của bạn đã có một *Room Database*.
 Bạn có thể sử dụng một Component mới gọi là ***LiveData*** để theo dõi sự thay đổi trong Database:
 ![](https://images.viblo.asia/b58af2d8-9496-49ca-ac76-e14ce1f5175b.png)
 
 Vậy ***LiveData*** là gì?
##  4.LiveData.
 ***LiveData*** là một observable data holder, tức là đối tượng nắm giữ data và thông báo cho bạn khi có sự thay đổi data và lúc đó bạn có thể update UI. ***LiveData*** là một abstract class, bạn có thể kế thừa nó. Trong trường hợp đơn giản bạn có thể sử dụng ***MutableLiveData*** là một lớp con của nó:
```java
    MutableLiveData<String> dayOfWeek = new MutableLiveData<>();
    dayOfWeek.observer(this, data -> {
        mTextView.setText(dayOfWeek.getValue() + "Thursday is good day for hike");
    });
``` 

![](https://images.viblo.asia/ea373e5e-96af-47fb-9b2a-1097d973243c.png)

 Nếu bạn update giá trị của ***MutableLiveData*** bằng lời gọi set value, sau đó nó sẽ được kích hoạt và update trong UI:
 ```java
     //Elsewhere in the code!
    dayOfWeek.setValue("Friday");
``` 
 
 ![](https://images.viblo.asia/e43de9e3-4623-4708-9f89-1d21480ff9ca.png)
 
 ***Room*** được built để support ***LiveData***. Để sử dụng chúng với nhau, bạn chỉ cần thay đổi *DAO* để trả về các đối tượng đượng chứa trong lớp ***LiveData***. Room sẽ tạo một ***LiveData*** dùng để lắng nghe, quan sát sự thay đổi dữ liệu của *Database*: 
 ```java
    @Dao
    public interface TrailDao {
        //Create, read, update, delete examples.
        @Insert(onConflict == IGNORE)
        void insertTrail(Trail trail);
    
        @Query("SELECT * FROM Trail")
        public LiveData<List<Trail>> findAllTrails();
    
        @Update(onConflict = REPLACE)
        void updateTrail(Trail trail);
    
        @Query("DELETE FROM Trail")
        void deleteAll();
    }
```
Sau đó bạn có thể viết code như thế này để cập nhật UI :
```java
    trailsLiveData.observe(this, trails -> {
        //update UI, in this case a RecyclerView
        mTrailsRecyclerAdapter.replaceItems(trails);
        mTrailsRecyclerAdapter.notifyDataSetChanged();
    });
```
Kết quả cuối cùng mà ***Room Database*** update, nó sẽ thay đổi dữ liệu trong đối tượng ***LiveData***, điều này sẽ tự động kích hoạt cập nhật giao diện UI. Điều này đã đưa chúng ta đến một tính năng tuyệt vời nữa của ***LiveData***. ***LiveData*** là một ***lifecycle-aware*** component. Bây giờ bạn đã phải suy nghĩ vậy chính xác ***lifecycle-aware*** là gì?
## 5.Lifecycle.
Thông qua sự kì diệu của Lifecycle Observation, LiveData biết khi nào Activity của bạn đang là onScreen hay là offScreen hoặc Destroy và nó sẽ biết trạng thái nào nào cần cập nhật UI hoặc không cập nhật. Có 2 Interface thuộc lifecycle-aware là ***Lifecycle Owners*** and ***Lifecycle Observers***.

***Lifecycle Owners*** là những đối tượng có lifecycle (vòng đời) như *Activity* hoặc *Fragment*.

***Lifecycle Observers*** quan sát hay lắng nghe ***Lifecycle Owners*** và nhận được thông báo về sự thay đổi của lifecycle (vòng đời).

![](https://images.viblo.asia/86441122-df24-4a71-b3af-7f854614515b.png)

Chúng ta hãy thử nhìn đoạn code dưới, code cho ***LiveData***, nó cũng là một ***Lifecycle Observers***.
```java
    abstract public class LiveData<T> implements LifecycleObserver {
        @OnLifecycleEvent(Lifecycle.Event.ON_START)
        void startup() {...}
        
        @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
        void cleanup() {...}
    }
```
Các phương thức với anotation @OnLifecycleEvent sẽ đánh dấu cho cho lúc khởi tạo hay kết thúc tương ứng với starts và stops trong ***Lifecycle Owner.*** Lúc này các UI Components sẽ quan sát, lắng nghe ***LiveData***, còn ***LiveData*** quan sát, lắng nghe ***Lifecycle Owners***.

![](https://images.viblo.asia/7ba95758-942c-49ad-8946-9e82a1adc774.png)

Bây giờ bạn vẫn còn một vấn đề nữa để giải quyết. Ứng dụng của bạn sử dụng, nó sẽ trải qua những lần thay đổi cấu hình. Như *destroy* rồi lại *rebuild* lại Activity. Chúng ta lại không muốn ràng buộc việc khởi tạo ***LiveData*** vào vòng đời Activity bởi vì sẽ tạo ra nhiều code được thực thi không cần thiết. Một ví dụ là khi bạn truy vấn database, việc này sẽ diễn ra mỗi lần khi bạn xoay màn hình chẳng hạn.

![](https://images.viblo.asia/54466c12-74b3-438b-996b-3c19f700a69b.png)

Vậy bạn nên làm gì, bạn có thể đặt ***LiveData*** hoặc bất kì dữ liệu nào liên kết với UI vào trong một ***ViewModel***. 
## 6.ViewModel.
***ViewModel*** là một đối tượng cung cấp dữ liệu cho giao diện người dùng UI và nó tồn tại khi cấu hình ứng dụng thay đổi. Để tạo một đối tượng ***ViewModel***, bạn extends lớp *AndroidViewModel*, sau đó bạn đưa dữ liệu cần thiết cho giao diện activity vào trong ***ViewModel***.
```java
    public class TrailListViewModel extends AndroidViewModel {
        private AppDatabase mDatabase;
        private LiveData<List<Trail>> trails;
        
        public TrailListViewModel(Application application) {
            supper(application);
            //AppDatabase is a Room database Singleton
            mDatabase = AppDatabse.getDb(getApplication());
            trails = mDatabase.trailModel().findAllTrails();
        }
        //Getters and Setters
    }
```
Khi bạn đã lưu dữ liệu cần thiết cho UI vào trong ***ViewModel***. Ứng dụng của bạn sẽ không truy vấn lại database nếu Activity khởi tạo lại trong khi cấu hình thay đổi. Sau đó khi bạn tạo Activity hoặc Fragment của bạn, bạn có thể lấy được một tham chiếu đến ***ViewModel*** và sử dụng nó.
```java
    //In onCreate
    trailListViewModel = ViewModelProvides.of(this)
    .get(TrailListViewModel.class);
    
    //Code to set up the RecyclerView omitted
    trailListViewModel.getTrails().observe(this, trails -> {
        mTrailsRecyclerAdapter.replaceItems(trails);
        mTrailsRecyclerAdapter.notifyDataSetChanged();
    });
```
Lần đầu tiên bạn lấy ra ***ViewModel***, nó được tạo cho Activity của bạn. Những lần tiếp theo bạn request ***ViewModel***, Activity của bạn sẽ nhận được ***ViewModel*** ban đầu.

![](https://images.viblo.asia/39ce4895-ed72-4365-aec0-272c5d1f3866.png)

## 7.Tổng kết.
Để tóm tắt tất cả những kiến thức trên, chúng ta đã nói về:

***Room***, là một thư viện ánh xạ đối tượng dùng cho SQLite.

***LiveData***, đối tượng thông báo cho bạn sự thay đổi của data và bạn có thể update UI. Và rất quan trọng à nó làm việc tốt khi kết hợp với Room.

***Lifecycle Observers and Owners*** : cho phép thành phần không UI lắng nghe sự kiện vòng đời của thành phần có UI.

***ViewModel***: Cung cấp data, là cái vẫn tồn tại khi cấu hình ứng dụng thay đổi.

![](https://images.viblo.asia/343357d9-9075-4205-b592-c3f9c0f6ec14.png)

Tất cả chúng là một tập hợp của ***Architecture Components*** dùng cho việc xây dựng ứng dụng một cách mạnh mẽ,  và module hóa, dễ dàng test. Bạn có thể sử dụng chúng một cách hợp lý với nhau hoặc bạn có thể lựa chọn từng loại mà bạn cần. Nhưng đây chỉ là bề nổi của một ứng dụng, thực tế thì một ứng dụng đầy đủ phải có sơ đồ như dưới đây.

![](https://images.viblo.asia/7ab7f309-d499-44be-aea8-ea2e54946f12.png)

Như vậy, trên đây mình đã trình bày một cách tổng quan về ***Android Architecture Components*** version 1.0. Có lẽ ở những bài viết tiếp theo có thể mình sẽ nói về các components mới và đi chi tiết, cụ thể từng Component và sẽ mong được sự theo dõi của các bạn. Cám ơn các bạn rất nhiều!

Các thành phần tiếp theo mình đã giới thiệu ở
[phần 2](https://viblo.asia/p/la-mot-android-developer-thi-ban-nhat-dinh-phai-biet-ve-architechture-components-2-Qpmle9vmlrd) các bạn có thể theo dõi!
## 8.Tài liệu tham khảo.
Để soạn được bài viết này mình đã tham khảo ở các website của Google:

1.https://developer.android.com
2.https://www.youtube.com/channel/UCVHFbqXqoYvEWM1Ddxl0QDg