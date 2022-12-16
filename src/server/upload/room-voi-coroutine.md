Coroutine- 1 chức năng mạnh mẽ của Kotlin, đang dần được khai thác mạnh mẽ trong Android. Có 1 vài bài về kết hợp coroutine và retrofit, hôm nay chúng ta sẽ tìm hiểu cách sử dụng coroutine với Room.

Bắt đầu từ Room 2.1 sẽ hỗ trợ coroutines Kotlin. Các phương thức DAO có thể được đánh dấu là suspending  để đảm bảo rằng chúng không được thực thi trên main thread. Theo mặc định, Room sẽ sử dụng Components I/O Executor giống như 1 Dispatcher để chạy các câu lệnh SQL, nhưng bạn cũng có thể cung cấp Executor của riêng mình khi xây dựng RoomDatabase.

Coroutines hỗ trợ cho Room hiện đang được phát triển mạnh mẽ, với nhiều tính năng được lên kế hoạch để hỗ trợ trong các phiên bản trong tương lai.

### **Add suspense vào database**

Trước hết, cần update Room lên 2.1 trong build.gradle:

```kotlin
implementation "androidx.room:room-coroutines:${versions.room}"
```

Và bạn cũng cần có Kotlin 1.3.0 và Coroutine 1.0.0 hoặc mới hơn :D

Giờ chúng ta sẽ update các method DAO để có thể sử dụng các function suspension :

```kotlin
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

Method @Transaction cũng có thể suspending  và chúng còn có thể được gọi từ 1 function suspending DAO khác:

```kotlin
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

Room sẽ thực thi một suspending functions theo 1 cách khác nhau tùy thuộc vào cách bạn gọi chúng với 1 transaction  hay không.

1. In a transaction

Room không thực hiện bất kỳ xử lý nào của CoroutineContext mà trên đó câu lệnh database được kích hoạt. Nó có trách nhiệm là một caller của function để đảm bảo rằng đây không phải là một UI thread. Từ khi function suspend chỉ có thể được gọi từ các function suspend khác hoặc từ các coroutines, hãy đảm bảo rằng Dispatcher mà bạn sử dụng không phải là Dispatcher.Main, thay vào đó là Dispatchers.IO hoặc 1 custom của bạn.

2. Not in a transaction

Room đảm bảo rằng câu lệnh database được kích hoạt trên Components I/O Dispatcher. Dispatcher  này tạo dựa trên cùng một Executor I / O được sử dụng để chạy LiveData trong background thread.

### **Testing DAO suspension functions**

Test function suspend DAO không khác với test bất kỳ chức năng suspend nào khác. Ví dụ: để kiểm tra xem sau khi insert Ủe, chúng ta có thể truy xuất nó hay không, chúng ta wrap test trong một khối runBlocking:

```kotlin
@Test fun insertAndGetUser() = runBlocking {
    // Given a User that has been inserted into the DB
    userDao.insertUser(user)

    // When getting the Users via the DAO
    val usersFromDb = userDao.getUsers()

    // Then the retrieved Users matches the original user object
    assertEquals(listOf(user), userFromDb)
}
```

Nguồn: https://medium.com/androiddevelopers/room-coroutines-422b786dc4c5