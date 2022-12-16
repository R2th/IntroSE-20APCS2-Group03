Đã rất nhiều lần, chúng ta chỉ sử dụng Dagger 2 để inject dependencies. Những nó còn có thể cung cấp nhiều hơn thế. Hãy xem ví dụ dưới ddaya:

```
class Dependency @Inject constructor()

@Component
interface MainComponent {
    fun inject(target: Target)
}
```

Chúng ta nghĩ chúng ta chỉ `Dependency` đối tượng injected. Nhưng nó cũng có thể cung cấp `Provider<Dependency>` và `Lazy<Dependency>`.

```
class Target {
    @Inject
    lateinit var dependency: Dependency
    @Inject
    lateinit var dependencyProvider: Provider<Dependency>
    @Inject
    lateinit var dependencyLazyProvider: Lazy<Dependency>

    init {
        DaggerMainComponent.builder().build().inject(this)
    }
}
```

Cả Provider và Lazy đều có thể sử dụng để tạo ra đối tượng `Dependency`.

Câu hỏi là, chúng là cùng một bản sao được tạo ra, hoặc các bản sao khác nhau được tạo ra mỗi lần?

## Sự tạo ra của Provider/Lazy và phụ thuộc của nó

Giả sử chúng ta khởi tạo 2 target objects code, nơi mỗi loại đều có bộ riêng của nó `Dependency`, `Provider` and `Lazy`

```
val target1 = Target()
val target2 = Target()
```

![](https://images.viblo.asia/4d4a959e-4d8f-4d78-ae0a-0d87bbc78b78.png)

Từ sơ đồ trên, ta có thể thấy được mỗi `target` sẽ được tạo ra cho nó `Dependency` và `Lazy`. Tuy nhiên `Provider` là cùng một chia sẻ trên `Target`.

Tuy nhiên, nếu chúng ta sử dụng `Provider` và `Lazy` để tạo ra thêm 2 `Dependency` nữa, như sơ đồ bên dưới mô tả một copy mới hoặc một copy đã được tạo ra từ trước.

![](https://images.viblo.asia/e72e3a5d-5fc2-4e03-a2ad-4c51bea82185.png)

Từ sơ đồ trên, ta có thể thấy rằng `Provider` luôn tạo ra một `Dependency` mói mỗi lần nó `generate`. Tuy nhiên với `Lazy`, mỗi đối tượng sẽ tạo ra một `Dependency` giống nó. Điều đó có nghĩa là nó sẽ chỉ tạo ra một tức thì và sử dụng lại thể hiện trước đó.

Với `Provider`, hàm `get()` sẽ được viết như

```
@Override
public Dependency get() {
  return provideInstance();
}

public static Dependency provideInstance() {
  return new Dependency();
}
```

Với `Lazy`, hàm `get()` sẽ được viết như

```
@Override
public T get() {
  Object result = instance;
  if (result == UNINITIALIZED) {
    synchronized (this) {
      result = instance;
      if (result == UNINITIALIZED) {
        result = provider.get();
        instance = reentrantCheck(instance, result);
        /* Null out the reference to the provider. 
         * We are never going to need it again, so we
         * can make it eligible for GC. */
        provider = null;
      }
    }
  }
  return (T) result;
}
```

## Singleton

Sẽ thế nào nếu scope của `Dependency` thành `Singleton` như bên dưới

```
@Singleton
class Dependency @Inject constructor()

@Singleton
@Component
interface MainComponent {
    fun inject(target: Target)
}
```

Nó sẽ được sử dụng như dưới đây

```
class Target {
    @Inject
    lateinit var dependency: Dependency
    @Inject
    lateinit var dependencyProvider: Provider<Dependency>
    @Inject
    lateinit var dependencyLazyProvider: Lazy<Dependency>

    init {
        DaggerMainComponent.builder().build().inject(this)
    }
}
```

Với `Lazy` và `Provider`, cả hai sẽ tạo ra cùng một thành phần `Lazy`. Và tất cả chúng sẽ tạo ra `Dependency` giống nhau, như được hiển thị bên dưới.

![](https://images.viblo.asia/bd625fbc-722a-4cce-b925-d4fb9d49a6a0.png)

## Khi nào thì nên sử dụng Provider/Lazy

Trong trường hợp bạn cần tạo ra một dependencies tốn kém tài nguyên, có thể sẽ không được sử dụng, `Provider` hoặc `Lazy` sẽ có ích nếu các phụ thuộc không phải là biến phạm vi phạm vi. Chúng có thể delay hơn nữa việc tạo ra các dependencies cho đến khi cần thiết.
Đối với `Provider` và `Lazy`, khác nhau là, một cái sẽ luôn tạo cùng một bản sao, trong khi cái kia sẽ luôn tạo một bản sao mới mỗi lần.

Bài viết được tham khảo từ:
https://medium.com/@elye.project/what-else-dagger-2-injection-provides-abed8d3d52bd