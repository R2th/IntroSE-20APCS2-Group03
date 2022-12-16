![](https://images.viblo.asia/5d46f222-78d1-4852-bcb1-b50bbb95b1b9.png)

src https://medium.com/androiddevelopers/room-coroutines-422b786dc4c5

## Giới thiệu

Kotlin 1.3 có stable coroutines thì google chuẩn bị support cho Room và Coroutines, điều này thật tuyệt vời :D

Bài này mình sẽ hướng dẫn các bạn cách tích hợp thực tế trong dự án như nào và chúng ta sẽ cùng thực hiện trên project MovieDB huyền thoại tại link https://github.com/dangquanuet/The-Movie-DB-Kotlin

## Tiến hành

Source code pull request migrate room and coroutines

https://github.com/dangquanuet/The-Movie-DB-Kotlin/pull/70/files

### Thêm dependencies


Đảm bảo rằng các bạn đang sử dụng kotlin 1.3 trở lên

Thêm các dependencies như sau

```kotlin
dependencies {
    // room
    implementation("androidx.room:room-runtime:2.1.0-alpha06")
    kapt("androidx.room:room-compiler:2.1.0-alpha06")
    // Kotlin Extensions and Coroutines support for Room
    implementation("androidx.room:room-ktx:2.1.0-alpha06")
    
        // coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.1.1")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.1.1")

}
```

### Cập nhật DAO
Thay vì trả về Single, Maybe, Completable thì bây giờ tất cả các fun sẽ là `suspend fun` và return trực tiếp kiểu. 

> **Lưu ý** với những query có thể **không có dữ liệu trả về** thì cần để `return type` là `nullable` ví dụ như `getMovie(id: String): Movie?`

```kotlin
@Dao
interface MovieDao {
    @Query("SELECT * FROM movie")
    suspend fun getMovieList(): List<Movie>?

    @Query("SELECT * FROM movie WHERE movie.id = :id")
    suspend fun getMovie(id: String): Movie?

    @Insert(onConflict = IGNORE)
    suspend fun insert(movie: Movie)

    @Insert(onConflict = IGNORE)
    suspend fun insert(list: List<Movie>)

    @Insert(onConflict = REPLACE)
    suspend fun update(movie: Movie)

    @Delete
    suspend fun deleteMovie(movie: Movie)

    @Query("DELETE FROM movie WHERE id = :id")
    suspend fun deleteMovie(id: String)

    @Query("DELETE FROM movie")
    suspend fun deleteAll()
    
}
```

## Cập nhật query ở ViewModel

> **Lưu ý**: việc `query database` cần thực hiện ở `background` nên hãy chắc hắn rằng bạn thực hiện nó trong `ioContext` hoặc `background context` tương đương

```kotlin
   override fun loadData(page: Int) {
        ioScope.launch {
            try {
                val movieList = movieDao.getFavorite(getNumberItemPerPage(), page)
                withContext(uiContext) {
                    onLoadSuccess(page, movieList)
                }
            } catch (e: Exception) {
                onLoadFailUI(e)
            }
        }
    }
    
    fun checkFavorite(id: String) {
        ioScope.launch {
            try {
                val favoriteMovie = movieDao.getMovie(id)
                withContext(uiContext) {
                    if (favoriteMovie?.isFavorite == true) {
                        val newMoview = movie.value
                        newMoview?.isFavorite = true
                        movie.value = newMoview
                    }
                }
            } catch (e: Exception) {
                onLoadFailUI(e)
            }
        }
    }
```

Như vậy là chúng ta đã migrate room và coroutines. 

Giờ đây các bạn có thể update project để hoàn toàn `migrate coroutines` và `goodbye rxjava`. 

Các bạn có thể tham khảo source code pull request tại đây

https://github.com/dangquanuet/The-Movie-DB-Kotlin/pull/71/files

Hẹn gặp lại các bạn ở các bài sau và hãy  ![](https://images.viblo.asia/aa4b3f5e-1540-433c-9ea5-d806a6fa4480.png) nếu bài viết có ích nhé :D

## Tham khảo
https://medium.com/androiddevelopers/room-coroutines-422b786dc4c5