Link github : https://github.com/yenntt-1728/FilterNewsExample/tree/dagger_example
## 1. Dagger 2 là gì ? 
Dagger 2 - là một dependency injection framework. Nó được sử dụng để genaration code thông qua các base anotation, code được genartion ra rất dễ đọc và debug  
## 2. Tại sao sử dụng Dagger 2
Dagger 2 là một open source giúp chúng ta tự động tạo các mã code, tạo ra 1 sơ đồ phụ thuộc (dependency graph) dựa vào các Annotation khi compile time.   

Trong khi một số framework khác, ví dụ như Spring thì DI được hiện thực dựa vào reflection khiến nó chậm hơn khi runtime.  
Vì code sẽ tự gen cho chúng ta các phụ thuộc cho nên code sẽ ngắn gọn hơn, đơn giản hơn rất nhiều.
Các dependencies được tự động khởi tạo mà chúng ta không cần phải tự viết từng dòng code và đặt vào các contructor

Trước dagger 2 còn có dagger 1, bạn vẫn hoàn toàn có thể sử dụng, tuy nhiên không nên nhé :v Lý do thì như sau
- Thứ nhất: Reflection là việc rất chậm chạp
- Thứ hai: Dagger 1 tạo ra các đối tượng mà class gốc phụ thuộc (dependency) tại thời điểm Runtime, điều này có thể dẫn đến các lỗi không mong muốn.

## 3. Workflow 

Để thực hiện đúng Dagger 2, bạn phải làm theo các bước sau :
1.	Xác định các đối tượng phụ thuộc và các phụ thuộc của nó.
2.	Tạo một class với annotation `@Module`, sử dụng annotation `@Provider` cho mọi phương thức mà trả về một sự phụ thuộc.
3.	Yêu cầu phụ thuộc vào các đối tượng phụ thuộc bằng cách sử dụng annotation `@Inject`.
4.	Tạo một interface bằng cách sử dụng annotation `@Component` và thêm các class với annotation `@Module` được tạo ra trong bước 2.
5.	Tạo một object của interface `@Component` để khởi tạo đối tượng phụ thuộc với các phụ thuộc của nó.

## 4. Annotation chính  
Dagger 2 đưa ra một số annotation đặc biệt :

- `@Module` : cho các lớp mà có phương thức cung cấp sự phụ thuộc.  
- `@Providers` : cho các phương thức bên trong các lớp @Module.  
- `@Inject` : để yêu cầu một sự phụ thuộc ( một hàm khởi tạo, một trường, hoặc một phương thức).
- `@Component` : là cầu nối interface giữa các modules và injection.  

Trên là những annotation quan trọng nhất bạn cần phải biết để bắt đầu với Dependency Injection sử dụng Dagger 2.  

**Note** : Tuy nhiên trong trong Dagger 2, phần quan trọng nhất là Component. Về cơ bản, nó là một đối tượng (sẽ được tạo tự động) để xử lý tất cả nội dung dependency injection của bạn.
Để định nghĩa một Component. Bạn có thể viết theo như dưới đây

```
@Component
interface FirstComponent
```

Khởi tạo và sử dụng 

```javascript
val component : FirstComponent = DaggerFirstComponent.create()
```
## 5. Các annotation khác 
Ngoài Component ra chắc hẳn các bạn cũng đã từng nghe qua đến Subcomponent rồi phải không, tại sao đã có Component rồi lại thêm SubComponent để làm gì  

=>> giải thích   

Như các bạn đã biết tuỳ chỉnh phạm vi @Scope là một trong những tính năng mạnh mẽ nhất của Dagger 2.  Trong các application phức tạp, chỉ sử dụng phạm vi @Singleton là không đủ để giải quyết vấn đề.  

Sau đây là 2 ví dụ về 2 lại annotation này 
```javascript
@UserScope
@Component(
    modules = UserModule.class,
    dependencies = AppComponent.class
)
public interface UserComponent {
    UserProfileActivity inject(UserProfileActivity activity);
}
```

```javascript
@UserScope
@Subcomponent(
    modules = UserModule.class
)
public interface UserComponent {
    UserProfileActivity inject(UserProfileActivity activity);
}

//===== AppComponent.java =====

@Singleton
@Component(modules = {...})
public interface AppComponent {
    // Factory method to create subcomponent
    UserComponent plus(UserModule module);
}
```

`@Subcomponent` có quyền truy cập vào tất cả các phụ thuộc (depedencies) từ Component cha mẹ. Trong khi `@Component` chỉ được truy cập vào những depedencies được công khai (public) trong interface của Component cơ sở.  
`@Subcomponent` generate code với số lượng method it hơn rất so với việc sử dụng `@Component`

## 6. Example  
Cấu hình repository  

Đây là class chịu trách nhiệm xử lý tất cả các hoạt động liên quan đến dữ liệu, cả online và offline đều được xử lý ở đây. Để hiểu hơn tại sao lại có class này, bạn nên tham khảo mẫu Repository Pattern. Thông thường mẫu này kết hợp với Rx để trả callback khi có dữ liệu nhận được từ Api hoặc Local.  

Cấu hình ViewModel  

ViewModel thì chịu trách nhiệm việc cập nhật giao diện người dùng đối với các dữ liệu này.  
Như ta thấy ở đây, ViewModel cần sử dụng đến MovieDao và MovieService để có thể lấy được dữ liệu từ Api và lưu trữ vào local database. Chính vì vậy nhiệm vụ của chúng ta là inject 2 phụ thuộc kia vào đây để sử dụng thông qua Dagger.

```javascript
class NewsListViewModel @Inject constructor(newLocal : NewsDAO, newApi : NewsAPI) {
    private val dateNewsRepository : DataNewsRepository = DataNewsRepository(newLocal, newApi)
}
```

DbModule sẽ cung cấp những phụ thuộc cho việc tương tác với database local thông qua Room library  

### Xử lý ViewModel  

Về cơ bản thì ta sẽ thêm 2 Module trên vào ViewModel, vậy nên cần phải tạo lớp VIewModelFactory để giúp bạn tự động tạo ViewModel trên Activity hoặc Fragment của bạn.  
ViewModelFactory có một danh sách các provider để có thể taọ bất kì ViewModel nào bị ràng buộc. Fragment hay Activity chỉ cần inject vào factory và lấy ra ViewModel của chúng.

ViewModelKey

ViewModelKey giúp cho việc ánh xạ các ViewModel của bạn cho phép ViewModelFactory có thể provider hoặc inject chúng.
```javascript
@Target(AnnotationTarget.FUNCTION, 
        AnnotationTarget.PROPERTY_GETTER, 
        AnnotationTarget.PROPERTY_SETTER)
@MapKey
annotation class ViewModelKey(val value: KClass<out ViewModel>)
```

Xử lí AppComponent
```javascript
@Component(
        modules = [
            @Component(
        modules = [
            ApiModule::class,
            DbModule::class,
            ViewModelModule::class,
            ActivityModule::class,
            AndroidSupportInjectionModule::class]
)
@Singleton
interface AppComponent {

    @Component.Builder
    interface Builder {
        @BindsInstance
        fun application(application: Application): Builder

        fun build(): AppComponent
    }

    /*  
     * This is our custom Application class
     * */
    fun inject(appController: AppController)
}
]
)
@Singleton
interface AppComponent {

    @Component.Builder
    interface Builder {
        @BindsInstance
        fun application(application: Application): Builder

        fun build(): AppComponent
    }

    /*  
     * This is our custom Application class
     * */
    fun inject(appController: AppController)
}
```