Ở phần trước chúng ta đã tìm hiểu thế nào là Dependency Injection, lịch sử, lý do cần sử dụng dagger 2.
Các bạn có thể xem phần 1 tại: https://viblo.asia/p/dagger-2-trong-android-phan-1-maGK77m9Kj2
 
Trong bài này chúng ta sẽ đi sâu hơn về các thành phần của dagger nhé

## I - Hiểu về Annotation processors

### 1. Annotations

Hẳn bạn nhìn thấy các kí hiệu như @Override, @Nullable, @StringResource, @BindView, @PrimaryKey, ... Bạn có từng nghĩ chúng là gì không ?? Chúng là Annotation đó. Tiếng việt là "chú thích", nhưng mình sẽ không dịch ra mà sẽ để nguyên cho dễ hiểu nhé.

Annotation là metadata class, có thể được liên kết với class, method, fields và thậm chí các Annotation khác.

Annotation được sử dụng để cung cấp các thông tin bổ sung, nên đây cũng là một cách để thay thế cho XML và Java marker interface

Ví dụ như 

Extend lại method của lớp cha, @Override nói cho ta biết rằng đây là **phương** thức ghi đè (Override) lại của lớp cha. Annotation này đang liên kết với method

```
    @Override
    protected int getLayoutId() {
        return 0;
    }
```

Khai báo trong Room của Android: @Entity nói cho ta biết rằng đây là **class**, sẽ làm Entity. Annotation này đang liên kết với class
```
@Entity
 class Item {
 }
```

### 2. Annotation processors

Annotation processors (bộ xử lý chú thích): đơn giản thôi, nó sẽ dựa trên các Annotation mà ta viết để tạo ra code cho chúng ta trong quá trình compile. 

### 3. Sử dụng

Dagger 2 làm việc trên Annotation processors. Sẽ gen code liên quan cho chúng ta trong quá trình compile. 

Như đã nói ở phần 1 thì dagger 1 dựa vào java reflection để gen code, và trong runtime. Việc này sẽ làm kiểm soát lỗi trở nên phức tạp, mất thời gian, đồng thời giảm hiệu suất hoạt động của ứng dụng.

Việc gen ở compile time sẽ giúp việc kiểm soát lỗi trở nên dễ dàng, nhanh chóng và tiện hơn. Đồng thời cũng giúp làm việc hiệu quả hơn.

Done, cơ bản là vậy. Nào giờ chúng ta sang phần chính của bài nhé :D

## II - Các thành phần 

### 1. @Inject

Annotation cơ bản thể hiện nơi mà dependency được yêu cầu

Có 3 loại:
- Contructor Injection: dùng ở hàm khởi tạo của class
- Field Injection: dùng với field trong class
- Method injection: dùng với function/method

Ví dụ

```
public class Starks{

  //Feild injection
  @Inject
  Allies allies;
  
  //Constructor injection
  @Inject
  public Starks(){
    //do something..
  }
  
  //Method injection
  @Inject
  private void prepareForWar(){
    //do something..
  }
}
```

### 2. @Module 

Cho các lớp mà có phương thức cung cấp dependency. Hiểu đơn giản đây là nơi chúng ta sẽ có các hàm khởi tạo (new ())   các dependency :3rd_place_medal: 

Ví dụ: đây sẽ nơi ta khởi tạo các dependency cho việc gọi API.

Bạn có thấy @Provides, @Singleton không ?? Chúng ta sẽ tiếp tục khám phá ở phần sau nhé !!

```
@Module
class ApiModule {

    @Provides
    @Singleton
    fun providesRetrofit(
        moshiConverterFactory: MoshiConverterFactory,
        okHttpClient: OkHttpClient
    ): Retrofit =
        Retrofit.Builder().baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(moshiConverterFactory)
            .build()

    @Provides
    fun provideMoshiConverterFactory() = MoshiConverterFactory.create()


    @Provides
    @Singleton
    fun providesUserApi(retrofit: Retrofit): IUserApi =
        retrofit.create(IUserApi::class.java)
}
```

### 3. @Provides
 
Sử dụng ở các phương thức trong class sử dụng @Module, mục đích là nơi ta sẽ khởi tạo các dependency. Như ở ví dụ trên ta sẽ khởi tạo đối tượng Retrofit này, đối tượng MoshiConverter, đối tượng IUserApi. 

### 4. @Component

Là cầu nối để liên kết giữa @Module và @Injection ở trên. 

Nhưng có những trường hợp bạn không cần sử dụng @Module để khởi tạo các đối tượng đó :))

### 5. @Scope

@Scope sẽ giúp ta tạo ra các đối tượng tồn tại trong phạm vi mà ta muốn, từ đó sẽ tránh leak memory

Ý nghĩa: giả sử bạn có đối tượng giúp truy cập đến thông tin của người dùng như tên, tuổi, địa chỉ, ... và các thông tin này chỉ cần khi bạn vào màn UserInfo chẳng hạn. Bạn lấy thông tin người dùng từ db, từ api.

==> Khi bạn thoát màn hình này rồi thì dĩ nhiên bạn sẽ không cần lấy thông tin người dùng nữa

==> Các đối tượng giúp lấy thông tin người dùng từ db, từ api cũng cần phải được hủy đi, không sẽ gây ra leak memory

Dagger 2 cung cấp sẵn cho chúng ta scope @Singleton. Nhưng ta hoàn toàn có thể tự thêm các scope khác cho phù hợp.

### 6. @Qualifier

Tạo ra các đối tượng khác nhau của cùng một class. Ví dụ như ta tạo hai đối tượng Retrofit, một có okHttpClient, một không có 

- Có okhttp client 

```
@Provides
@Named("WithOkHttp")
@Singleton
fun providesRetrofit(
    moshiConverterFactory: MoshiConverterFactory,
    okHttpClient: OkHttpClient
): Retrofit =
    Retrofit.Builder().baseUrl(BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(moshiConverterFactory)
        .build()
```

- Không có okhttp client 

```
@Provides
@Named("WithoutOkHttp")
@Singleton
fun providesRetrofit(
    moshiConverterFactory: MoshiConverterFactory
): Retrofit =
    Retrofit.Builder().baseUrl(BASE_URL)
        .addConverterFactory(moshiConverterFactory)
        .build()
```


Vẫn còn một số Annotation khác như @Subcomponent, @Bind. Chúng ta sẽ tìm hiểu ở phần sau kèm demo cho phần 2 này nhé.

Các bạn có thể đọc thêm cái bài viết về kiến thức Android cả chém gió tại blog của mình nhé

Blog Code cùng Trung: http://codecungtrung.com/

Một blog khác của mình về sách. Các bạn có thể tìm được nhiều đầu sách hay, với các chủ đề phong phú.

Xem ngay tại **Trạm đọc sách**: https://tramdocsach.com/