Room version 2.1 (hiện đang ở giai đoạn alpha) bổ sung hỗ trợ cho  Kotlin Coroutines . Các phương thức DAO hiện có thể được đánh dấu là tạm dừng để đảm bảo rằng chúng không được thực thi trên main thread. Mặc định, Room sẽ sử dụng **Architect Component I/O Executor** làm bộ điều phối để chạy các câu lệnh SQL, nhưng bạn cũng có thể cung cấp *Executor* của riêng mình khi xây dựng `Room Database`. Nào bây giờ chúng ta cùng tiếp tục đi đến các việc như làm thế nào để sử dụng nó, nó hoạt động thế nào, và làm thế nào để cùng test function mới này.
> Coroutines hỗ trợ cho Room hiện giờ đang được phát triển một cách mạnh mẽ, với nhiều tính năng được lên kế hoạch để hỗ trợ trong các phiên bản tương lai của thư viện.
 
## Thêm một vài suspense vào trong Database
Để sử dụng Coroutines và Room trong ứng dụng của bạn, hãy cập nhật Room lên version 2.1 và thêm dependency mới vào file `build.gradle` của bạn:
```
implementation "androidx.room:room-coroutines:${versions.room}"
```
Bạn cũng sẽ cần  Kotlin version 1.3.0 and Coroutines version 1.0.0 hoặc mới hơn.
Bây giờ bạn có thể cập nhật các method trong DAO của bạn để sử dụng chức năng `suspension` ví dụ như dưới đây:
``` Kotlin
@Dao
interface UsersDao {

    @Query("SELECT * FROM users")
    suspend fun getUsers(): List<User>

    @Query("UPDATE users SET age = age + 1 WHERE userId = :userId")
    suspend fun incrementUserAge(userId: String)

    @Insert
    suspend fun insertUser(user: User)

    @Update
    suspend fun updateUser(user: User)

    @Delete
    suspend fun deleteUser(user: User)

}
```
Các phương thức `@Transaction` cũng có thể dùng `suspend` và chúng có thể gọi các hàm suspend khác của DAO:
```Kotlin
@Dao
abstract class UsersDao {
    
    @Transaction
    open suspend fun setLoggedInUser(loggedInUser: User) {
        deleteUser(loggedInUser)
        insertUser(loggedInUser)
    }

    @Query("DELETE FROM users")
    abstract fun deleteUser(user: User)

    @Insert
    abstract suspend fun insertUser(user: User)
}
```
Room xử lý các chức năng `suspend` khác nhau, dựa trên việc chúng có được gọi trong một `transaction` hay không:
### 1. Trong một Transaction
Room không thực hiện bất kỳ xử lý nào của `CoroutineContext` mà trên đó câu lệnh cơ sở dữ liệu được gọi là `trigged`. Nó có trách nhiệm của người gọi hàm để đảm bảo rằng đây không phải là một `UI thread`. Vì các chức năng `suspend` chỉ có thể được gọi từ các chức năng `suspend`  khác hoặc từ các `coroutines`, hãy đảm bảo rằng `Dispatcher` mà bạn sử dụng không phải là [Dispatcher.Main](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-main.html) thay vào đó là [Dispatchers.IO](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html) hoặc tùy chỉnh của riêng bạn.
### 2. Không nằm trong Transaction
Room đảm bảo rằng câu lệnh cơ sở dữ liệu được kích hoạt trên `Architecture Components I/O Dispatcher`.`Dispatcher` này được tạo dựa trên cùng một `I/O Executor` được sử dụng để chạy `LiveData` hoạt động trên một `background thread`.
## Unit Test chức năng suspend trên DAO
`Unit test` chức năng `suspend` trên DAO không khác với việc `Unit test` bất  chức năng  `suspend`  nào khác. Ví dụ: để kiểm tra xem sau khi `insert` người dùng, chúng ta có thể truy xuất nó hay không, chúng ta wrap việc thử nghiệm này vào trong một khối `runBlocking`:
```Kotlin
@Test fun insertAndGetUser() = runBlocking {
    // Given a User that has been inserted into the DB
    userDao.insertUser(user)

    // When getting the Users via the DAO
    val usersFromDb = userDao.getUsers()

    // Then the retrieved Users matches the original user object
    assertEquals(listOf(user), userFromDb)
}
```
Đối với `synchronous insert`, hệ thống sẽ tạo ra các dòng lệnh bắt đầu một `transaction`,sau đó  `executes insert`, đánh dấu `transaction` là thành công và kết thúc nó. Phương thức đồng bộ sẽ chỉ thực hiện thao tác insert trên bất kỳ thread nào mà gọi từ nó.
```Kotlin
@Override
public void insertUserSync(final User user) {
  __db.beginTransaction();
  try {
    __insertionAdapterOfUser.insert(user);
    __db.setTransactionSuccessful();
  } finally {
    __db.endTransaction();
  }
}
```
Now let’s see how adding the suspend modifier changes things: the generated code will make sure that your data gets inserted but also that this happens off of the UI thread.

The generated code passes a continuation and the data to be inserted. The same logic from the synchronous insert method is used but within a Callable#call method.

Bây giờ, hãy cùng xem cách bổ sung  `suspend modifier` thay đổi mọi thứ: hệ thống sẽ tạo ra các đoạn mã đảm bảo rằng dữ liệu của bạn được chèn nhưng điều này cũng xảy ra ngoài `UI thread`.

Mã được hệ thống tạo ra vượt qua phần tiếp theo và dữ liệu sẽ được chèn. Logic tương tự từ phương thức  `synchronous insert` được sử dụng nhưng trong phương thức gọi `Callable#call`
``` Kotlin
@Override
public Object insertUserSuspend(final User user,
    final Continuation<? super Unit> p1) {
  return CoroutinesRoom.execute(__db, new Callable<Unit>() {
    @Override
    public Unit call() throws Exception {
      __db.beginTransaction();
      try {
        __insertionAdapterOfUser.insert(user);
        __db.setTransactionSuccessful();
        return kotlin.Unit.INSTANCE;
      } finally {
        __db.endTransaction();
      }
    }
  }, p1);
}
```
Mặc dù vậy, phần thú vị là hàm `CoroutinesRoom.execute`, vì đây là phần xử lý chuyển đổi `Context`, tùy thuộc vào việc cơ sở dữ liệu có được mở và chúng ta có `transaction` hay không.
Ví dụ : 
Trường hợp 1. Cơ sở dữ liệu được mở và chúng ta đang thực thi trong một `transaction`.
Ở đây, chúng tôi chỉ kích hoạt `call method` - Ví dụ : NHư việc `insert` thông tin người dùng vào cơ sở dữ liệu.
Trường hợp 2 : Khi chúng ta không thực thi câu lệnh trong `transaction`.
Room makes sure that the work done in the  method is performed on a background thread by using the 
Room chắc chắn sẽ hoàn thành việc đó ở trong một `Callable#call`, nó được thực hiện ở `background thread`. Và được sử dụng `Architecture Components I/O Executor`. như ví dụ dưới đây
``` Kotlin
suspend fun <R> execute(db: RoomDatabase, callable: Callable<R>): R {
   if (db.isOpen && db.inTransaction()) {
       return callable.call()
   }
   return withContext(db.queryExecutor.asCoroutineDispatcher()) {
       callable.call()
   }
}
```
Start using Room and coroutines in your app, the database work is guaranteed to be run on a non-UI Dispatcher. Mark your DAO method with the suspend modifier and call them from other suspend functions or coroutines!
Khi bắt đầu sử dụng Room và Coroutines ở trong ứng dụng của bạn. Mọi việc sử dụng cơ sở dữ liệu cần phải đảm bảo rằng chạy ở trên một `non-UI Dispatcher`. 
Việc quy định các phương thức trong DAO của bạn bằng từ khóa `suspend` và gọi chúng từ các chức năng `suspend` hoặc coroutines khác!
Cảm ơn các bạn đã theo dõi bài viết này. Có vẻ nó hơi hàn lâm. Nhưng nếu sử dụng tốt coroutines hoặc từ khóa `suspend` thì sẽ có thể đảm bảo ứng dụng của các bạn khi sử dụng database sẽ không cần quan tâm phải đặt nó nằm ngoài UI Thread.