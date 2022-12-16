Bài viết trước mình đã trình bày [tổng quan về Clean Architecure](https://viblo.asia/p/android-clean-architecture-p1-tong-quan-ve-clean-architecture-oOVlYkABK8W) rồi. Ý tưởng của Clean Architecture  là có thể đáp ứng các tiêu chí:

- Independent of Frameworks
- Testable
- Independent of UI
- Independent of Database
- Independent of any external agency

và không nhất thiết chúng ta phải sử dụng cả 4 vòng tròn layer. Chúng ta chỉ cần xem nó như là 1 sơ đồ đề follow, tuy nhiên có một điều tất yếu cần chú ý là Dependency Rule (quy tắc phụ thuộc).

> Các layer bên trong không nên biết bất kỳ điều gì về các layer bên ngoài. Về cơ bản, quy tắc này nói rằng dù định dạng dữ liệu của layer ngoài cùng như thế nào thì sẽ không ảnh hưởng đến layer bên trong, hay việc thay đổi business rule ở layer bên trong cũng không ảnh hưởng đến việc hiển thị ở layer bên ngoài.
> 

![](https://images.viblo.asia/77cac2d9-56ee-4ed2-a55c-3a24a2ad83e3.png)

Follow idea của Clean Architecture, chúng ta cần tách biệt các layers, ví dụ như domain, storage, presentation. Tuy nhiên, Clean Architecture không có hạn chế về việc define các layers 1 cách chính xác. Chúng ta có thể sử dụng số lượng layers sao cho phù hợp với nhu cầu.

Mình có tham khảo một số nguồn, thì thấy phần mọi người hay chia thành 3 layers: 
[**domain, data, presentation**](https://proandroiddev.com/kotlin-clean-architecture-1ad42fcd97fa).
 Do ví dụ demo cũng đơn giản nên mình cũng sẽ chia project thành 3 layers: 
 
 ![](https://images.viblo.asia/eb7bfeb7-ac11-426a-8aa4-2bef28e31f79.png)
 
Do hình mình copy trên mạng, nhưng demo mình đang sử dụng MVVM nên mọi người cứ hiểu Presenters ở đây là ViewModels nếu sử dụng MVVM nhé.
 
 - View không chứa bất kì business logic nào mà chỉ tương tác với ViewModel 
 - `ViewModel` không chứa bất kì business logic nào và chỉ tương tác với **Domain layers** thông qua **Use cases** (hoặc thi thoảng mình thấy người ta gọi là **Interactors**).
 - **Domain layer** chứa business logic, các Entities chính là các models (thông thường là POJOs hoặc cũng có thể là các object cùng với một vài logic or validation logic), data class, interfaces. Use cases class là nơi thể hiện business logic, mỗi use case nên được giới hạn bởi 1 feature (follow **Single Responsibility Principle**).  Use cases đóng vai trò như là 1 middle-man giữa Presentation layer và Data layer nhưng lại không biết gì về 2 layers kia nhờ vào **virtue of Inversion of Control** (Google translate ra là: tính đảo ngược của kiểm soát. Nghe dị dị nên mình để nguyên bản tiếng Anh).
 - **Data layer** sẽ implement Domain layer abstractions. Mục đích là để cô lập Data layer khỏi Presentation layer để chúng ta có thể dễ dàng thay đổi nó khi cần. Ví dụ project đang sử dụng Room database ở Data layer, chúng ta có thay đổi một database khác 1 cách dễ dàng. Nói chung các hoạt động storing, fetching data or request network chúng ta sẽ thực hiện ở đây.
 - **Presentation layer** chứa các thứ liên quan đến UI và Android như là view architecture(MVP, MVVM...), fragment, activity,...

Tách biệt các layers bằng cách sử dụng `Gradle module` giúp code dễ đọc, maintain, extend và testing.

### I. Multi-Project Gradle setup
[**Project example**](https://github.com/canhtv-0838/CleanArchitectureExample/tree/develop) bao gồm 3 Gradle modules:

- [**presentation**](https://github.com/canhtv-0838/CleanArchitectureExample/blob/master/presentation/build.gradle) — Android application module
```
dependencies {
    implementation project(path: ':domain')
    implementation project(path: ':data')
    ...
}
```
- [**data**](https://github.com/canhtv-0838/CleanArchitectureExample/blob/master/data/build.gradle)— Android library module
```
dependencies {
    implementation project(path: ':domain')
    ...
}
```
- [**domain**](https://github.com/canhtv-0838/CleanArchitectureExample/blob/master/domain/build.gradle) — Java library module

### II. Example step by step
Code mình không add vào đây để tránh rối mắt. Mọi người follow ở [Github](https://github.com/canhtv-0838/CleanArchitectureExample/tree/develop) nhé.

**Bài toán**: Ứng dụng note text. Sử dụng:
- MVVM
- Room database
- DI - Koin (Chi tiết ở [https://insert-koin.io/](https://insert-koin.io/) hoặc mọi người có thể tham khảo viblo của mình:  [ví dụ về cách sử dụng Koin](https://viblo.asia/p/android-dependency-injection-with-koin-4P856Jka5Y3#_3-vi-du-minh-hoa-2))

**Project structure:**

![](https://images.viblo.asia/76d221fe-59fd-476a-bd74-b93376b72b4f.png)

#### 1. Domain layer
![](https://images.viblo.asia/e60a7511-a1d7-4bf7-a99d-d74d90b0f864.png)

Packages: `model` -> `repository` -> `usecase`:

- [`Note.kt`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/domain/src/main/java/com/canh/domain/model/Note.kt): Đơn giản là 1 object bình thường có validation logic thôi.
- [`NoteRepository`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/domain/src/main/java/com/canh/domain/repository/NoteRepository.kt) & [`NoteModelMapper`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/domain/src/main/java/com/canh/domain/repository/NoteModelMapper.kt): là Domain layer abstractions, cung cấp các phương thức access data. Ở Data layer sẽ thực hiện implement interface này.
- [`AddNoteUseCase`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/domain/src/main/java/com/canh/domain/usecase/AddNoteUseCase.kt) & [`GetNotesUseCase`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/domain/src/main/java/com/canh/domain/usecase/GetNotesUseCase.kt): Đây là các use case của hệ thống, "middle-man giữa Presentation layer và Data layer".

#### 2. Data layer

![](https://images.viblo.asia/9809688f-fa5f-4231-a5dc-5d7220d4617a.png)

Packages/class: model -> local.db -> impl
- [`NoteEntity`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/data/src/main/java/com/canh/data/model/NoteEntity.kt): Entity được sử dụng ở data layer. Giống như Note ở domain layer thôi.
- [`AppDatabase`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/data/src/main/java/com/canh/data/local/db/AppDatabase.kt) & [`NoteDao`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/data/src/main/java/com/canh/data/local/db/dao/NoteDao.kt): Database của app
- [`NoteModelMapperImpl`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/data/src/main/java/com/canh/data/NoteModelMapperImpl.kt) & [`NoteRepositoryImpl`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/data/src/main/java/com/canh/data/NoteRepositoryImpl.kt): Implementation của Domain layer abstractions

#### 3. Presentation
![](https://images.viblo.asia/c00d3fb5-9fe9-4036-bee2-14d7efe60c48.png)

Ở layer này chắc ai cũng thấy rất quen thuộc rồi, ở đây chúng ta có thể sử dụng các mô hình MVP, MVVM như bình thường.
Như đã trình bày ở trên, ở layer này sẽ sử dụng usecase ở domain layer như 1 middle man của Presentation layer và Data layer.
package: 
- di: chính là DI - Koin mà mình nói ở phía trên.
- Mọi người chỉ cần lưu ý 1 điểm là ở [`AddNoteViewModel`](https://github.com/canhtv-0838/CleanArchitectureExample/blob/develop/presentation/src/main/java/com/canh/cleanarchitectureexample/addnote/AddNoteViewModel.kt) là mình đang sử dụng các usecase thay vì repository như ở các mô hình MVP, MVVM thông thường, vd: [`StatisticsViewModel`](https://github.com/android/architecture-samples/blob/todo-mvvm-live-kotlin/todoapp/app/src/main/java/com/example/android/architecture/blueprints/todoapp/statistics/StatisticsViewModel.kt)  hoặc [`StatisticsPresenter`](https://github.com/android/architecture-samples/blob/todo-mvp-kotlin/todoapp/app/src/main/java/com/example/android/architecture/blueprints/todoapp/statistics/StatisticsPresenter.kt) của architecture-sample của Google.

Và cuối cùng là thành quả.
![](https://images.viblo.asia/ac672327-857c-4bfc-8dad-5e75fff85d8a.gif)

Bài chia sẻ này là theo ý hiểu của cá nhân mình nên không thể tránh được việc thiếu sót và những điểm chưa đúng. Rất mong nhận được nhận xét và giúp đỡ từ mọi người. 
Nguồn tham khảo:  https://proandroiddev.com/kotlin-clean-architecture-1ad42fcd97fa

Các bạn dành chút thời gian để đọc thêm phần bình luận nhé. Rất quan trọng đó 😅