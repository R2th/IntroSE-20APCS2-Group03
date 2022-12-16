**Giới thiệu**

Chào mọi người, gần đây mình đang học về kotlin. Ở bài viết này mình muốn trình bày về **Kotlin** khi bạn làm việc với **Android Architecture Components**.

Với cá nhân mình thì **Android Architecture Components** không xa lạ nhưng **Kotlin** thì mình chưa làm nhiều dự án sử dụng ngôn ngữ này

Nhưng mình tin **Kotlin** và **Android Architecture Components** sẽ thực sự giúp ích cho mình và bạn. Giúp chúng ta làm việc hiệu quả hơn nếu bạn có chúng trong những skill của mình :)).

Bài viết này mình muốn hướng đến đối tượng những người mới học và làm việc với Kotlin như mình. 

Trước hết mình muốn trình bày về 2 điểm thuộc về AAC là Lifecycle và Lifedata

# 1. Lifecycle

Hệ thống Android có thể **destroy và recreate** các thành phần của ứng dụng (ví dụ: Activity, Fragment) do các ràng buộc về bộ nhớ (ví dụ: RAM thấp) hoặc thay đổi config(ví dụ: chuyển từ **Portrait -> Landscape**).
Bạn có thể biết rằng các thành phần Android có vòng đời phức tạp.


Mỗi thành phần có vòng đời khác nhau của riêng mình (Activity, Fragment) và điều này làm cho mọi thứ trở nên phức tạp hơn.

Những vòng đời phức tạp này làm cho việc phát triển ứng dụng gặp khó khăn vì bạn có thể bắt đầu một hoạt động trên một Activity(Ví dụ như yêu cầu Network),trong khi tiến trình Activity có thể bị destroyed và một Activity khác sẽ được tạo lại.


Bạn sẽ cần hiển thị kết quả của hoạt động trong Activity mới.

AAC giới thiệu các thành phần (Activity, Fragment) là **Lifecycle aware**(Nghĩa là Fragment và Activity của bạn có khả năng nhận thức được trạng thái trong lifecycle hạn chế việc quản lý thủ công như trước đây)


# 2. LiveData
Điều này cung cấp một cơ chế không đồng bộ để cung cấp các thay đổi dữ liệu bằng cách sử dụng mẫu Observer. 

Điểm khác biệt lớn nhất là LiveData tôn trọng Vòng đời của thành phần Android được đi cùng với nó và chỉ thực hiện thay đổi dữ liệu khi thành phần ở trạng thái "hoạt động" (ví dụ: khi Activity bị ngừng / hủy sẽ không cố gắng thực hiện thay đổi).

Điều này tránh memory leak, bị treo do các Activity bị dừng và các vấn đề khác. Hãy xem đoạn code dưới đây:

```
private val category = MutableLiveData<String>()

/* Gọi khi lanch app */
fun initNetworkRequest() {
    /* expensive operation, e.g. network request */
    category.value = "Hoa quả"
}
fun getCategoryname(): LiveData<String> {
    return category
}
// --------------------------------------------------------
/* Gọi khi khởi tạo activity */
getCategoryname().observe(this, Observer { category -> Log.d(TAG, category) })
```

Với cách tiếp cận này, ngay cả khi Activity bị destroyed bởi hệ thống và một Activity khác được tạo ra trước khi request kết thúc, thì việc hiển thị kết quả vẫn được thực hiện đúng.

# => **Kotlin**
## Với đoạn code 
## `private val category = MutableLiveData<String>()`
chúng ta thấy được việc định nghĩa biến trong kotlin

1. Việc khởi tạo biến mới trong Kotlin không có từ khóa new giống như trong java đơn giản là gọi qua tên class muốn khởi tạo.
2. Val là biến final. Giá trị không thể reassigned lại.
3. Var là variable có thể reassigned.
4. Kotlin là strongly typed(Bạn có thể hiểu nôm na là hạn chế việc viết lại những điều mà bạn có thể suy diễn được). Như trong java chúng ta hay viết
`MutableLiveData category = new MutableLiveData<String>(); `
thì với kotlin bạn đơn giản chỉ cần 
`val category = MutableLiveData<String>()`
5. Access modifier private của kotlin giống với trong java chỉ hiển thị với class chứa nó. Đa phần các modifier thì giống với java, Nếu không chỉ định thì là public.

## Với đoạn code 
## fun getCategoryname(): LiveData<String> {}
chúng ta thấy được việc định nghĩa hàm trong kotlin
    
1. Từ khóa fun để định nghĩa phương thức
2. Type return của method được đặt ở cuối ở đây là LiveData<String>
3. Không có kiểu void trong kotlin. Nếu không có kiểu trả về chỉ cần viết giống trong ví dụ
`fun initNetworkRequest()`
       
## Với đoạn code 
## category.value = "Hoa quả"
chúng ta thấy được việc gán giá trị biến trong kotlin

1. Kotlin có ưu điểm khi có thể chuyển value thành thuộc tính của biến. Khi sử dụng 2 hàm **getValue/setValue ** 
chúng ta có thể gọi qua cách trực tiếp như trên

## Với đoạn code 
## `getCategoryname().observe(this, Observer { category -> Log.d(TAG, category) })`
chúng ta thấy được việc gán giá trị biến trong kotlin

1. Thoạt mới nhìn mình cũng rất ngao ngán với những đoạn code như thế này :)). nhưng đó là 1 trong những điểm mạnh của kotlin qua lambda có thể tự tìm được phương thức cần ghi đè từ anonymous class Observer. 
Các bạn hãy viết chi tiết code java để có cái nhìn rõ hơn nhé

Như vậy là mình đã trình bày xong phần 1 bài viết về Khám phá kotlin từ Android Architecture Components. Ở phần 2 mình sẽ trình bày chi tiết hơn về Kotlin qua việc sử dụng AAC với việc implement Room và Viewmodel.

Nguồn: https://medium.com/rocknnull/exploring-kotlin-using-android-architecture-components-and-vice-versa-aa16e600041a. Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.