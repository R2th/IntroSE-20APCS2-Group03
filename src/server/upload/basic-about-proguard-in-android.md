## Proguard and its basic flow
### What is proguard ?
`ProGuard` là trình tối ưu hóa phổ biến nhất cho Java `bytecode`. Nó làm cho các ứng dụng *Java* và *Android* của bạn nhỏ hơn tới 90% và nhanh hơn tới 20%. *ProGuard* cũng cung cấp sự bảo vệ tối thiểu chống lại kỹ thuật đảo ngược bằng cách làm xáo trộn tên của các `classes`, `fields` và `methods`.
> ProGuard is a Java class file shrinker, optimizer, obfuscator, and preverifier.

* Bước `Shrinking` sẽ phát hiện và loại bỏ các *class, fields và method* không sử dụng. 
* Bước `Optimization` sẽ phân tích và tối ưu hóa *bytecode* của các phương thức. 
* Bước `Obfuscation` sẽ đổi tên các *class, fields và method* còn lại bằng cách sử dụng các tên ngắn vô nghĩa.
 
 :point_right: Những bước đầu tiên này làm cho code base nhỏ hơn, hiệu quả hơn và gây khó hơn đối với các `hacker` (hay `reverse-engineer`).
* Bước `Preverification` cuối cùng sẽ thêm thông tin xác thực vào các *class*, được yêu cầu cho `Java Micro Edition` và cho `Java 6` trở lên.
> Tất cả các bước này đều là optional. Chẳng hạn `Proguard` có thể chỉ sử dụng để liệt kê `dead code` trong ứng dụng ...
### Why need to use it?
Ngoài việc tối ưu hóa cho *code* của bạn và cung cấp sự bảo vệ tối thiểu chống kỹ thuật đảo ngược *source* nói trên, việc sử dụng *proguard* trên *android* là cần thiết vì đơn giản với *android* `SMALLER IS FASTER`.

1. **Download**: Người dùng không muốn tốn lưu lượng data (3G, 4G) để tải ứng dụng quá nặng
2. **Install/Compile**: Người dùng sẽ không muốn tốn quá nhiều không gian ổ cứng và thời gian cài đặt cho ứng dụng quá nặng.
3. **Startup**: Người dùng hiển nhiên không thích những ứng dụng khởi động quá lâu.

Đến đây, có thể nhiều bạn sẽ phản bác rằng sự phát triển mạnh mẽ của `hardware` những năm gần đây về cả *RAM*, *Disk space* hay *bandwidth* là quá nhiều, nhưng thực tế đó không phải giải pháp tốt nhất, giải pháp gốc rễ.

### Proguard Basic Flow

![](https://images.viblo.asia/b55e959f-46ef-4d1b-8bbb-80246e502ae0.png)

Đầu tiên *ProGuard* đọc các `input jars` đầu vào (hoặc `aar`, `war`, `ear`, `zip`, `apk` hoặc `directory`). Sau đó, nó tiến hành `shink`, `optimize`, `obfuscate` và `preverify` chúng. Bạn có thể tùy ý để *ProGuard* thực hiện nhiều lượt tối ưu hóa (bước *optimize*). *ProGuard* ghi kết quả được xử lý vào một hoặc nhiều `input jars` đầu ra (hoặc `aar`, `war`, `ear`, `zip`, `apk` hoặc `directory`). Đầu vào có thể chứa các `file resource`, có tên và nội dung có thể được cập nhật tùy ý để phản ánh tên lớp bị xáo trộn (`obfuscated class names`).

*ProGuard* yêu cầu các `library jar` (hoặc *aar*, *war*, *ear*, *zip*, *apk* hoặc *directory*) của các `jar` đầu vào (nêu ở trên) phải được chỉ định. Đây thực chất là các thư viện mà bạn sẽ cần để biên dịch *code*. *ProGuard* sử dụng chúng để xây dựng lại các phụ thuộc lớp cần thiết để xử lý đúng. Các *library jar* luôn luôn không thay đổi. Bạn vẫn nên đặt chúng trong `class path` của ứng dụng cuối cùng của bạn.

Để xác định *code* nào phải được giữ và *code* nào có thể bị loại bỏ hoặc bị xáo trộn, bạn phải chỉ định một hoặc nhiều `entry points` vào *code* của mình. Các *entry points* này thường là các *class* với các *main method, applet, midlets, Activities,* v.v.

![](https://images.viblo.asia/c33f7f70-b834-43d1-b8e0-09499671d667.png)

* Trong bước `Shrinking`, Proguard bắt đầu từ các `seeds` và xác định đệ quy những *class và class member* nào được sử dụng (`Reachable code`). Tất cả các *class và class member* còn lại sẽ bị loại bỏ.
    * `seeds.txt`: Chứa các *class và member* mà không bị làm mờ (phù hợp với keep rules của mình) 
    * `usage.txt`: output của bước *shrinking*, chứa các *code* đã bị remove.
* Trong bước `Optimization`, *Proguard* sẽ tối ưu hóa thêm *code*. Giữa các lần *optimization*, *class* và *method* không phải là `entry point` có thể được đặt `private`, `static` hoặc `final`, `unused parameter` có thể bị xóa, một số *method* có thể được nội tuyến (`inline`).
* Trong bước `Obfuscation`, *Proguard* sẽ đổi tên các *class* và *class member* không phải là `entry point`. Trong toàn bộ quá trình này, việc giữ các `entry point` đảm bảo rằng chúng vẫn có thể truy cập bằng tên gốc của chúng. 
    * `mapping.txt`: output của bước *Obfuscation*, chứa *translation* giữa *original code* và *obfuscated code*
 * Bước `Pre-verification` là bước không cần biết về *entry point*
     * `dump.txt`: Chứa tất cả thông tin những phần mà nó đã *optimize* hay *obfuscate*

![](https://images.viblo.asia/64814429-e1ad-4379-9ccf-83dce3f92bfc.png)

Ex: Trong hình thể hiện ứng dụng và một runtime library dependency của nó. Trong quá trình *proguard*, các *method* `foo()`, `faz()` và `bar()` được xem là `reachable` từ `MainActivity.class` *entry point*. Tuy nhiên, class `OkayApi.class` và *method* `baz()` của nó không được sử dụng bởi *app*, nên nó sẽ bị xóa khi `shrinking` ứng dụng.

## R8
### History and background of R8
*Developer* viết *code* bằng *Java* hay *Kotlin*, nhưng *Android expect Dalvik bytecode*. Dưới đây là quá trình của tối ưu hóa ứng dụng *release* đã từ lâu:

![](https://images.viblo.asia/9dd7621d-20af-46ec-a2cf-14ed041ae3c3.png)

*Java compiler* sẽ *compile source code* thành *Java bytecode*. *Proguard* có thể tùy chọn tối ưu hóa *bytecode*. Cuối cùng trình biên dịch`dx` sẽ chuyển *Java bytecode* sang *Dalvik bytecode*. *Dalvik bytecode* được đóng gói trong *apk* và cài đặt trên thiết bị. Thường *Proguard* sẽ giảm 20-50% kích thước *bytecode* và cải thiện hiệtiu suất khoảng 20%

Đối với *developer* thì *performance* của *build process* là cực kì quan trọng, nên khoảng năm 2015, *android team* đã giới thiệu *compiler* `Jack and Jill`. Chúng tích hợp chức năng của *Java compiler*, *Proguard* và *Dalvik compiler* trong 1 step duy nhất.

![](https://images.viblo.asia/2786b2c1-53ff-4b12-acb5-1adf8d2707ca.png)

Nhìn có vẻ hợp lý hóa quá trình *build process*, nhưng có vẻ nó không hoạt động tốt với hệ sinh thái và công cụ làm việc với *Java bytecode*. *Android team* đã từ bỏ nó vào năm 2017. Với trình biên dịch `D8`, họ lùi lại một bước, chỉ cần thay thế trình biên dịch `dx` bằng một triển khai mới:

![](https://images.viblo.asia/bc9a29dd-587a-4d4f-bb2e-de96eae128e1.png)

`D8` là `dexer` dùng *convert Java bytecode* sang *Dalvik bytecode*, thay thế cho `dx` *dexer*, cung cấp mã *bytecode* với chất lượng tốt hơn so với `dx` *dexer*.

![](https://images.viblo.asia/4e996cfe-1750-4175-aafe-1ce91f2bcf5d.png)

`R8` là phiên bản mới của `D8` nhằm tích hợp chức năng của *Proguard* và *D8*.

3 steps quan trọng của *R8*:

1. **Shrinking or tree shaking**: xóa *unused classes, fields, methods *từ ứng dụng.
2. **Code optimization**: làm *code* gọn hơn và hiệu quả hơn.
3. **Name obfuscation**: r*ename class, field, method* còn lại với các tên ngắn vô nghĩa. *Step* này cũng làm giảm 1 phần kích thước *source code*.

### Entry Point with R8
*Code shrinking* với `R8` được *enable* mặc định khi bạn *set* `minifyEnabled = true`

Quá trình *shrinking code* (còn được gọi là *tree shaking*), là quá trình loại bỏ *code* mà *R8* xác định là không bắt buộc khi chạy. Quá trình này có thể làm giảm đáng kể kích thước ứng dụng của bạn, ví dụ, ứng dụng của bạn bao gồm nhiều thư viện phụ thuộc nhưng chỉ sử dụng một phần nhỏ chức năng của chúng.

Để *shrink code* của ứng dụng, trước tiên *R8* xác định tất cả các *Entry Point* trong *code* ứng dụng dựa trên [tập hợp các configuration files](https://developer.android.com/studio/build/shrink-code#configuration-files). Các *entry point* này bao gồm tất cả các class  mà *android platform* có thể sử dụng để mở các *activity* hay *service* của bạn. Bắt đầu từ mỗi *entry point*, *R8* kiểm tra đệ quy *code* ứng dụng để xây dựng một biểu đồ `graph`, gồm tất cả các *method*, *member variable* và *class* khác mà ứng dụng có thể truy cập lúc *runtime*. Các mã không được kết nối với biểu đồ được coi như là `unreachable` và có thể bị xóa khỏi ứng dụng.

Có 2 lý do để *R8* xem các *android platform class* là *entry point*:
1. *R8* hay *proguard* đều là các `static analysis tool`, chúng không thể biết được *class* của *platform* sẽ làm gì, bởi chúng có thể được gọi lúc *runtime* bất kỳ lúc nào (nằm ngoài ứng dụng của bạn)
2. *Android* có nhiều *version* và có thể được cập nhật.

**References**
https://developer.android.com/studio/build/shrink-code

https://www.guardsquare.com/en/blog/proguard-and-r8

https://www.guardsquare.com/en/products/proguard/manual/introduction