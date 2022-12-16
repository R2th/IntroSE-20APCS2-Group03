Nếu bạn biết cách sử dụng `Dagger 2` nhưng đôi khi quên cú pháp hoặc một số cách dùng cơ bản của nó. Thì hy vọng bài viết này sẽ là một nơi hỗ trợ bạn.

Và nếu bạn đang muốn học `Dagger 2` từ đầu, thì dưới đây sẽ phù hợp hơn, nhưng trong bài viết này tôi sẽ làm cho nó rất đơn giản. Để mọi người cùng hiểu `Dagger` là gì.

## Những thành phần cơ bản
Nào chúng ta cùng bắt đầu với các thành phần cơ bản.

### `@Component`
Trong Dagger 2, phần quan trọng nhất là `Component`. Về cơ bản, nó là một đối tượng (sẽ được tạo tự động) để xử lý tất cả nội dung `dependency injection` của bạn.

Để định nghĩa một `Component`. Bạn có thể viết theo như dưới đây
```Kotlin
@Component
interface FirstComponent
```
Bạn có thể  tạo nó, ở bất cứ nơi nào trong code  của bạn, sau đó bạn có thể gọi (bằng tiền tố với `Dagger`)
```Kotlin
DaggerFirstComponent.create()
```
### `@Inject`
Các thành phần không làm gì cho đến khi bạn sử dụng nó để giúp `injection` của bạn. Bạn cần nói cho nó biết đối tượng mục tiêu mà nó cần `injection` vào.
```Kotlin
@Component
interface FirstComponent{
    fun inject(object: Target)
}
```
![](https://images.viblo.asia/2f1e6a63-5558-4af4-848b-28a8d8fdb227.png)

Với điều này, nó có thể `inject` bất kỳ lớp nào có chú thích(annotation) `@Inject` trong hàm tạo của nó. ví dụ.
```Kotlin
class DependentClass @Inject constructor()
```
### `@Scope`
Ngoài ra, đối với mỗi `component`, bạn có thể chú thích  `scope`, ví dụ: 
chú thích `@Singleton` bên dưới : 
```Kotlin
@Singleton
@Component
interface FirstComponent{
    fun inject(object: Target)
}
```
Điều này cho phép mọi đối tượng phụ thuộc (`dependent object injected`) được chèn bởi thành phần này, có `@Scope` phù hợp sẽ chỉ được tạo một lần trong phạm vi (scope) đó. ví dụ.
```Kotlin
@Singleton
class DependentClass @Inject constructor()
```
Để khai báo `custom scope`, người ta cần xác định một tên chú thích mới.
```Kotlin
@Scope
@kotlin.annotation.Retention(AnnotationRetention.RUNTIME)
annotation class CustomScope
```
### `@Module` (và`@Provides`)
Tuy nhiên, nếu người ta muốn đóng gói tất cả các Lớp phụ thuộc liên quan (Dependents Classes) lại với nhau. Thì chúng ta có thể định nghĩa nó trong một module.
Và `Component` có thể liên kết với `module` dưới dạng một `injection` của nó.
![](https://images.viblo.asia/e8ccac21-be9f-4fb2-99d5-86d8a3aaca62.png)
```Kotlin
@Module
class FirstModule {
    @Provides
    fun getDependentDependentObject() = DependentDependentClass()

    @Singleton
    @Provides
    fun getDependentObject(
        dependentDependentObject: DependentDependentClass)
        = DependentClass(dependentDependentObject)
}

@Singleton
@Component(modules = [FirstModule::class])
interface FirstComponent {
    fun inject(object: Target)
}
```
Giả sử nếu bạn muốn `inject` một `DependentObject` bằng cách thủ công, Bạn có thể đặt nó làm tham số của hàm tạo (contructor) giống như class `FirstModule` như sau. 
```Kotlin
@Module
class FirstModule(
    val dependentDependentObject: DependentDependentClass) {

    @Singleton
    @Provides
    fun getDependentObject() 
        = DependentClass(dependentDependentObject)
}
```
Nếu như thế này thì bạn không thể sử dụng được các hàm như bên dưới nữa 
```Kotlin
DaggerFirstComponent.create() // Không thể dùng được nữa.
```
Thay vào đó bạn cần phải làm theo như bên dưới.
```Kotlin
DaggerFirstComponent.builder().setFirstModule(
    FirstModule(dependentDependentObject)).build()
```
Nếu bạn muốn thứ gì đó tốt hơn nữa khi tạo `Component` mà không cần truy cập `Module`, hãy xem theo Link bên dưới 
[Component.Builder](https://proandroiddev.com/dagger-2-component-builder-1f2b91237856)
### Một số thành phần khác
#### `@Subcomponent`
`@Subcomponent`  có thể được xem như là một phần tử con của `@Component`. Để có hướng dẫn đơn giản nhưng đầy đủ về nó, bạn có thể tham khảo ở đây
[Subcomponent](https://medium.com/@elye.project/dagger-2-for-dummies-in-kotlin-subcomponent-5a969b6aec7a)

Ở đây tôi cung cấp cách liên kết `@Subcomponent` với `@Component`
```Kotlin
@Singleton
@Component(modules = [FirstModule::class])
interface FirstComponent {
    fun getSubcomponent(): FirstSubcomponent
}

@SubScope
@Subcomponent(modules = [FirstSubmodule::class])
interface FirstSubcomponent {
    fun inject(object: Target)
}
```
Với điều này, việc tạo `FirstComponent` vẫn có thể đơn giản
```
val firstComponent = DaggerFirstComponent.create()
```
Nhưng để truy cập vào `subcomponent`
```
val firstSubcomponent = firstComponent.getSubComponent()
```
`Subcomponent`  có quyền truy cập vào biến của `Component` cha cũng như các `Module`
![](https://images.viblo.asia/4ff02056-641b-4a54-a167-8fc343b833d7.png)
Có điều mà các bạn cần lưu ý : 
> `Component` và `Subcomponent` của cùng một `Scope` thì không thể được liên kết, trừ khi cả hai đều không cùng `Scope`
 
 #### `@Component` dependencies
Bên cạnh việc có `@SubComponent`. Thì `Component` có thể phụ thuộc vào `Component` khác. Điều này có thể thực hiện như bên dưới đây : 
```Kotlin
@Singleton
@Component(modules = [FirstModule::class])
interface FirstComponent {
    fun inject(object: FirstTarget)
}


@AnotherScope
@Component(dependencies = [FirstComponent::class], 
    modules = [SecondModule::class])
interface SecondComponent {
    fun inject(object: SecondTarget)
}
```
Với các dòng code bên trên. Để tạo `FirstComponent` Nó chỉ đơn giản gọi.
```Kotlin
val firstComponent = DaggerFirstComponent.create()
```
Nhưng để tạo ra `SecondComponent` chúng ta phải đảm bảo rằng `FirstComponent` phải được `inject` vào nó
```Kotlin
DaggerSecondComponent.builder()
    .firstComponent(firstComponent).build()
```
![](https://images.viblo.asia/92ba060e-dcff-4767-a5c9-36ad5adb30dd.png)
Tham khảo sơ đồ bên trên, thì khả năng truy cập vào các phụ thuộc (`dependencies`) từ `SubComponent` thì giống với `FirstComponent`
`Subcomponent` khả năng truy cập đầy đủ của parent `Component` (bao gồm các `Module`), Trong khi các phụ thuộc thành phần (`component dependencies`) chỉ có khả năng truy cập vào `immediate dependent` chứ không phải `module`.
Giống như  lưu ý của `Subcomponent`
> Các @Component có cùng scope sẽ không thể liên với nhau. Trừ khi cả hai không nằm trong phạm vi.
 
## Tổng kết 
Hy vọng bạn đã hiểu đầy đủ tất cả những điều trên. Cảm ơn các bạn đã đọc bài viết này.