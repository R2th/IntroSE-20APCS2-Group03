Hãy xem xét giao diện sau: người dùng có thể xem và chỉnh sửa tên. Điều này, cùng với các thông tin khác, được lưu trong cơ sở dữ liệu.

Để lấy thông tin user từ database, chúng ta có thể viết câu lệnh query trong  class data access object (UerDao):

```java
@Query(“SELECT * FROM Users WHERE id = :userId”)
User getUserById(String userId);
```

Với cách tiếp cận trên có 2 nhược điểm:

* Đây là một cuộc gọi chặn, đồng bộ
* Chúng ta cần tự gọi phương thức này mỗi khi dữ liệu người dùng của chúng ta bị sửa đổi.

Room cung cấp tùy chọn observe dữ liệu trong database và thực hiện các truy vấn không đồng bộ với sự trợ giúp của RxJava Maybe, Single và Flowable. Chú ý: không support Observable.

Nếu bạn lo lắng về thread, Room đảm bảo rằng các truy vấn có thể observe tránh khỏi main thread. Tùy thuộc vào thiết lập Scheduler trong phương thức observOn.

Đối với các truy vấn trả lại Maybe hoặc Single, đảm bảo bạn đang gọi subscribeOn với Scheduler khác AndroidSchedulers.mainThread ().

Để bắt đầu sử dụng Room với RxJava 2, chỉ cần thêm các phụ thuộc sau vào tệp build.gradle:

```java
// RxJava support for Room
implementation “android.arch.persistence.room:rxjava2:1.0.0-alpha5”
// Testing support
androidTestImplementation “android.arch.core:core-testing:1.0.0-alpha5”
```

**Maybe**

```java
@Query(“SELECT * FROM Users WHERE id = :userId”)
Maybe<User> getUserById(String userId);
```

* Khi không có user nào trong cơ sở dữ liệu và truy vấn trả về không có row nào, Maybe sẽ complete.
* Khi có một user trong database, Maybe sẽ trigger onSuccess và nó sẽ complete.
* Nếu user được cập nhật sau khi Maybe đã complete, không có gì xảy ra.

**Single**

```java
@Query(“SELECT * FROM Users WHERE id = :userId”)
Single<User> getUserById(String userId);
```

* Khi không có user nào trong cơ sở dữ liệu và truy vấn trả về không có row nào, Single sẽ trigger onError(EmptyResultSetException.class).
* Khi có một user trong database, Single sẽ trigger onSuccess.
* Nếu user được cập nhật sau khi Single.onComplete được gọi, không có gì xảy ra, cho đến khi stream hoàn thành.

**Flowable**

```
@Query(“SELECT * FROM Users WHERE id = :userId”)
Flowable<User> getUserById(String userId);
```

* Khi không có user nào trong cơ sở dữ liệu và truy vấn trả về không có row nào, Flowable  sẽ sẽ không phát ra gì, kể cả onNext hay onError.
* Khi có một user trong database, Flowable  sẽ trigger onNext.
* Mỗi khi user được cập nhật, object Flowable sẽ phát ra một cách tự động, cho phép bạn cập nhật UI dựa trên dữ liệu mới nhất.

**Testing**

Testing truy vấn trả về Maybe/Single/Flowable không khác nhiều so với Testing synchronous  của nó. Trong UserDaoTest, chúng ta đảm bảo rằng đã sử dụng in-memory database, từ khi thông tin được lưu trữ ở đây sẽ tự động bị xóa khi quá trình này bị kill.

```java
@RunWith(AndroidJUnit4.class)
public class UserDaoTest {
…
private UsersDatabase mDatabase;
@Before
public void initDb() throws Exception {
    mDatabase = Room.inMemoryDatabaseBuilder(
                     InstrumentationRegistry.getContext(),
                     UsersDatabase.class)
            // allowing main thread queries, just for testing
            .allowMainThreadQueries()
            .build();
}

@After
public void closeDb() throws Exception {
    mDatabase.close();
}
```

Thêm InstantTaskExecutorRule  trong class test, để chắc rằng Room đã execute tất cả database operation:

```java
public InstantTaskExecutorRule instantTaskExecutorRule = 
                                      new InstantTaskExecutorRule();
```

Hãy thực hiện một test case để ghi nhận emission của getUserById và test rằng thực sự khi user đã được insert, dữ liệu chính xác được phát ra bởi Flowable.

```java
@Test
public void insertAndGetUserById() {
    // Given that we have a user in the data source
    mDatabase.userDao().insertUser(USER);
    // When subscribing to the emissions of user
    mDatabase.userDao()
             .getUserById(USER.getId())
             .test()
             // assertValue asserts that there was only one emission
             .assertValue(new Predicate<User>() {
                @Override
                public boolean test(User user) throws Exception {
                    // The emitted user is the expected one
                    return user.getId().equals(USER.getId()) &&
                      user.getUserName().equals(USER.getUserName());
                }
            });
}
```

Nguồn: https://medium.com/google-developers/room-rxjava-acb0cd4f3757

Tham khảo source với kotlin: https://github.com/MuiNV54/MovieGuideKotlin/tree/movie_android_component