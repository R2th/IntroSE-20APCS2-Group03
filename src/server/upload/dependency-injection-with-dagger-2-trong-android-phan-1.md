Chào các bạn, đã lâu rồi mình không có dịp viết bài về phát triển ứng dụng. Hôm nay mình sẽ gửi đến các bạn 1 seri bài viết về Dagger 2, một thư viện Dependency Injection hết sức mạnh mẽ và hữu ích dành cho phát triển Android.

Do thông tin mình muốn truyền tải khá là nhiều, nên mình sẽ chia ra làm phần, để cho các bạn mới dễ đọc và nắm bắt hơn.

Phần 1: Giới thiệu các khái niệm về Dependency Injection, sơ qua về thư viện Dagger 2.

Phần 2: Tất nhiên là ví dụ thực tế rồi.

Bắt đầu nhé.

## Dependency  Injection (DI) là gì
## 

Dependency Injection được xây dựng dựa trên khái niệm Inversion of Control. Nghĩa là các phụ thuộc của 1 class chỉ nên được cung cấp từ bên ngoài. Hiểu đơn giản là không 1 class nào được khởi tạo đối tượng của class khác (class phụ thuộc) bên trong nó, mà nên lấy class phụ thuộc đó từ 1 configuration class. Ví dụ cho dễ hiểu nhé. Ta có 1 class Pet như sau:
```
public class Pet {
 
    public Pet() {
        
    }
 
}
```

Và 1 class Person, có thuộc tính là 1 đối tượng Pet (nói cách khác, Person phụ thuộc vào Pet)

```
public class Person {
 
    Pet pet;
 
}
```
Giờ đây ta sẽ có 2 cách viết hàm khởi tạo cho Person. Cách thứ nhất:

```
public Person() {
    this.pet = new Pet();
}
```
Cách này không tuân theo nguyên tắc của Inversion of Control, bởi vì class Person đã tự khởi tạo ra phụ thuộc của nó (tức class Pet).

Cách viết hàm khởi tạo cho Person để tuân theo quy tắc Inversion of Control:

```
public Person(Pet pet) {
    this.pet = pet;
}
```

Ở cách thứ 2 này ta đã nhúng (Inject) đối tượng Pet từ 1 nguồn khác (nguồn nào thì hiện tại ta chưa cần biết :D). Và lúc này Person không cần biết Pet được khởi tạo thế nào, Person chỉ việc sử dụng Pet khi cần thiết.

## Tác dụng của Dependency Injection
## 
ác dụng lớn nhất của việc sử dụng Depedency Injection là việc có thể tăng tính tái sử dụng của các class và giúp ta có thể test chúng 1 cách hoàn toàn độc lập (không phụ thuộc vào nhau).

Như ở trên, Person không cần biết Pet được khởi tạo thế nào, Person chỉ cần quan tâm đến các logic nghiệp vụ mà nó đảm nhiệm. Còn việc khởi tạo ra đối tượng Pet ra sao, đó là việc của Dagger. Hãy thử tưởng tượng Pet có khoảng 10 cách khởi tạo, hoặc khi đoạn code khởi tạo của Pet bị thay đổi => class Person cũng phải thay đổi theo class Pet (Person phụ thuộc vào Pet) => Giá trị mà Dependency Injection đem lại là rất quan trọng.

## Làm sao để áp dụng Dependency Injection?
## 
Để trả lời câu hỏi này, ta hãy tìm hiểu 1 chút về lịch sử 🙂

Ngày xưa, có 1 framework có chức năng phân tích sự phụ thuộc của 1 class (xem class đó phụ thuộc vào các class nào). Sau khi phân tích, framework này khởi tạo các class phụ thuộc và nhúng chúng vào class gốc thông qua Java Reflection. Như vậy các class này có thể được test (kiểm thử) 1 cách độc lập. Framework mà chúng ta nói tới chính là Dagger 1.

Nhưng quá trình vận hành của Dagger 1 có 2 nhược điểm: 1 là Reflection là việc rất chậm chạp, và thứ 2: Dagger 1 tạo ra các đối tượng mà class gốc phụ thuộc (dependency) tại thời điểm Runtime, điều này có thể dẫn đến các lỗi không mong muốn.

## Sự ra đời của Dagger 2

Dagger 2 được ra đời để khắc phục các nhược điểm của Dagger 1. Thay vì việc khởi tạo các đối tượng tại thời điểm Runtime, Dagger 2 tạo ra 1 sơ đồ phụ thuộc (dependency graph) thông qua các Annotation. Nôm na là các class cung cấp sự phụ thuộc được sinh ra bằng các đoạn code (được generate bởi Dagger 2) trong quá trình Compile time. Điều này làm giảm khả năng gây ra các lỗi không mong muốn. Và may mắn là các đoạn code mà Dagger 2 generate ra để tạo ra các phụ thuộc cũng rất dễ đọc và dễ hiểu 🙂

## Quy trình sử dụng Dagger 2
## 

Lan man quá, ở phần này mình sẽ trình bày qua quy trình sử dụng Dagger 2.

Lớp cần sử dụng (dependency consumer) yêu cầu lớp cung cấp (dependency provider) thông qua đối tượng kết nối (connector)

* Lớp cung cấp (dependency provider) là 1 class được gắn annotation @Module, có trách nhiệm khởi tạo ra các đối tượng để Inject (gắn) vào các lớp cần sử dụng (dependency consumer). Trong Dependency provider định nghĩa các hàm được gắn annotation @Provides. Các hàm này trả về các đối tượng mà dependency consumer cần sử dụng. Ví dụ như:
```
@Provides
public Pet providePet(){
    return new Pet();
}

```
Hàm này sẽ cung cấp đối tượng Pet cho dependency consumer (trong trường hợp này là class Person) sử dụng.

* Lớp cần sử dụng (dependency consumer): sử dụng annotation @Inject để được nhúng các đối tượng phụ thuộc. Ví dụ:
* Đối tượng kết nối (connector): là 1 interface được gắn annotation @Component có chức năng kết nối giữa @Module (lớp cung cấp) và các lớp cần sử dụng (dependency consumer). Thực thể của interface này sẽ được Dagger tạo ra và ta không cần (và cũng không thể) khởi tạo trực tiếp.
## Kết luận
## 
Như vậy bài này mình đã giới thiệu cái nhìn sơ bộ về dependency injection và quy trình sử dụng thư viện Dagger 2 để phục vụ công tác dependency injection này. Mình hiểu là đối với những người mới thì mấy thứ này khá phức tạp và mình đã diễn giải theo cách dễ hiểu nhất có thể. Bài sau mình sẽ đi vào ví dụ thực tế để cho các bạn dễ hiểu và hình dung hơn. Cảm ơn đã theo dõi.