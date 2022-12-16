# Giới Thiệu 

Room không phải là một hệ thống cơ sở dữ liệu mới .
Room là một abstract layer  cho phép truy cập cơ sở dữ liệu mạnh mẽ hơn trong khi khai thác toàn bộ sức mạnh của SQLite.,
nó được xây dựng để giúp cho việc xây dựng các ứng dụng android trở nên dẽ dàng và nhanh chóng hơn 

Room bao gồm ba thành phần chính đó là : Database, DAO (Data Access Object), và Entity
* Database: Được sử dụng để tạo một database bằng việc kế thừa từ class RoomDatabase
* Entity: Tướng ứng với một hàng trong bảng cơ sở dữ liệu.
* DAO: đây là thành phần chính của Room, nó chịu trách nhiệm định nghĩa các hàm thao tác với cơ sở dữ liệu

...

Trên là những định nghĩa cơ bản khái quats về Room database để hiểu thêm các bạn có thể tham khảo một số bài viết dưới đây dưới :

https://viblo.asia/p/android-gioi-thieu-room-persistence-library-maGK7zne5j2
https://developer.android.com/topic/libraries/architecture/room

Trong bài viết này mình sẽ giới thiệu cách kết hợp  Room và  Rxjava 
Sức mạnh của room được thể hiện : code ít hơn, các truy vấn SQL được kiểm tra thời gian biên dịch và trên hết, sức mạnh của các truy vấn không đồng bộ và có thể quan sát được.

Các truy vấn không đồng bộ trả về LiveData hoặc RxJava ( Maybe, Single , Flowable)  .LiveData  và Observables cho phép chúng ta nhận cập nhật tự động bất cứ khi nào dữ liệu thay đổi để đảm bảo UI luân là giá trị mới nhất trong db.

Nếu bạn đã làm việc với RxJava 2 trong ứng dụng của mình, thì việc sử dụng Room cùng với  Maybe, Single and Flowable  sẽ rất dễ dàng.

Lí thuyết có vẻ dài dòng và khá khó hiểu chúng ta bắt tay vào code để hiểu rõ hơn nhé . mình sẽ đi vào từng query chúng ta hay sử dụng là : Insert,Update/Delete,Query

# Insert
**Khi kết hợp Room và Rxjava cho phép các kiểu trả về tương ứng sau khi ta thực hiện thao tác Insert**
```
@Insert
Completable insert(User user);
// or
@Insert
Maybe<Long> insert(User user);
// or
@Insert
Single<Long> insert(User[] user);
// or
@Insert
Maybe<List<Long>> insert(User[] user);
// or
@Insert
Single<List<Long>> insert(User[] user);
```

*Completable* :  onComplete được gọi khi quá trình Insert được thực hiện xong


*Single<Long> or Maybe<Long>*  :  Sẽ trả về row id của item được insert tại phương onSuccess khi item đó  Insert thánh công
    
*Single<List<Long>> or Maybe<List<Long>>*  :  Sẽ trả về danh sách row id của các item được insert tại phương onSuccess khi list item đó  Insert thánh công

Đối với các trường hợp error khi Insert  thì  Completable, Single vả Maybe sẽ trả về exception tại phương thức onError


# Update/Delete
Vậy với  các thao tác Update/Delete  thì chúng ta sẽ làm như thế nào để kết hợp Room và Rxjva ??

Cũng giống như Insert ta có 2 lự chọn để sử dụng đó là :Completable và Single

```
@Update
Completable update(User user);
// or
@Update
Single<Integer> update(User user);
// or
@Update
Single<Integer> updateAll(User[] user);
// or
@Delete
Single<Integer> deleteAll(User[] user);
// or
@Delete
Single<Integer> deleteAll(User[] user);
```

* Completable : Phương thức onComplete sẽ được gọi khi query update/delete  được thực hiện thành công
* Single<Integer> or Maybe<Integer> : Khi query của chúng ta thành công số hàng đã được update/delete sẽ trả về tại phương thức onSuccess.

# Query

Để lấy user từ database, chúng ta có thể viết query sau trong data aceess (UserDao):

```
@Query(“SELECT * FROM Users WHERE id = :userId”)
User getUserById(String userId);
```

Cách viết này trong có vẻ ok ?? Nhưng có 2 vấn đề ở query này :
1.  Đây không phải là query bất đồng bộ .
2.  Mỗi khi có data thay dổi chúng ta đều phải get lại data. 

Vậy làm sao để giải quyết được vấn đề này ???

Room cung cấp tùy chọn quan sát dữ liệu trong database và thực hiện các query không đồng bộ với sự trợ giúp của RxJava (Maybe, Single , Flowable )

Nếu chúng ta lo lắng về việc control  threads, Room sẽ giúp chúng ta thoải mái và đảm bảo rằng các truy vấn có thể quan sát được thực hiện ngoài  main thread . 
Chúng ta có thể quyết định được query được thực hiện trên threads nào dựa vào Scheduler trong phương thức observeOn




# **To be continued**
# 
Ở phần này của bài viêt mình đã tổng hợp một số lí thuyết cơ bản và quan trọng của Room data và cach kết hợp với Rxjava.
Trong phần tiếp theo mình sẽ đi sâu vào từng đoạn code để thể hiện rõ hơn về những điều mình đã viết 

các bạn có thể tham khảo trước src code tại đây : 

https://github.com/googlesamples/android-architecture-components/tree/master/BasicRxJavaSample

**thank for reading**

# reference
* https://developer.android.com/topic/libraries/architecture/room
* https://github.com/googlesamples/android-architecture-components/tree/master/BasicRxJavaSample
* https://medium.com/androiddevelopers/room-rxjava-acb0cd4f3757