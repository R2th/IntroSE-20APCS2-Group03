## **Clean Architechture.**
### Mục lục:
1. Một câu chuyện trong quá khứ của mình.
2. Giới thiệu tổng quát về Clean Architechture.
3. Android implements Clean Architechture như thế nào?
4. Áp dụng Clean Architechture vào 1 một ứng dụng Android cụ thể.
5. Ưu nhược điểm, so sánh nó với MVVM, MVP.


**Hôm nay mình xin viết tiếp phần còn lại. Bạn nào chưa đọc phần 1 có thể xem lại ở [đây](https://viblo.asia/p/android-clean-architechture-tu-a-z-phan-1-6J3Zg4WRlmB).**



### 3. Android implements Clean Architechture như thế nào?

_ Android sẽ hiện thực Clean Architechture theo hình vẽ dưới đây: ![](https://images.viblo.asia/fc32dab6-f258-41e3-98f4-e054131816d8.png)

***Nhìn hình vẽ ta có thể thấy được:**

_ Ứng dụng sẽ chia làm 3 layer (nghĩa là 3 vòng tròn): Presentation, Data, Domain.

_ Chiều phụ thuộc: Presentation sẽ phụ thuộc vào Domain, Data sẽ phụ thuộc vào Domain. Vậy Domain sẽ là tầng nằm sát tâm vòng tròn nhất, Presentation và Data sẽ là 2 vòng tròn cùng bán kính và nằm bao bên ngoài Domain. Lúc này ta có bảng phụ thuộc như sau:
![](https://images.viblo.asia/c9070ed0-32b9-4dd0-b27b-13d24ec2e11d.png)

Như vậy ta có thể thấy rằng chỉ khi code ở tầng Domain thay đổi thì ứng dụng của chúng ta mới bị ảnh hưởng. Còn code ở 2 tầng kia dù có thay đổi đến cở nào thì ứng dụng của ta vẫn không bị ảnh hưởng. Và thật may nếu ta nhớ lại lý thuyết tổng quát của Clean Architechture thì tầng Domain là tầng ít hoặc hầu như không bao giờ thay đổi. Vậy cây thư mục ở những tầng này có gì, ta cùng xem hình dưới:
![](https://images.viblo.asia/701b7c75-0f2f-4fac-8b3c-ea6864557307.png)

Đây là cách tổ chức 1 ứng dụng Android theo Clean Architecture. Với cách tổ chức này nó hoàn toàn đáp ứng được 1 Architechture cần có: Extend, Maintain, Unit-test. Mình sẽ cố gắng trình bày thật chi tiết về hình vẽ trên và những áp dụng trong thực tế mình gặp phải các vấn đề được Clean Architechture giải quyết (lưu ý những vấn đề mình trình bày phía dưới mình mặc định người đọc bài viết này đã có kiến thức và hiểu biết về 1 số Design Parttern như Repository pattern, Dependency Injection, Singleton pattern, vì Clean Architechture sử dụng những Design Pattern này làm cho ứng dụng thật sự “**Clean**”):

* Tầng **Presentation**: Đây là tầng mà User sẽ nhìn thấy và tương tác với ứng dụng. Nhiệm vụ của tầng này là execute các Usecases ở tầng **Domain** trong ViewModel hoặc Presenter để lấy data và dùng các Android Framework để vẽ ra các view hiển thị cho người dùng thấy. (Lưu ý khi execute các Usecases trong ViewModel hoặc Presenter ta chỉ chờ callback trả data về chứ k hiện thực chi tiết cách lấy data đó như thế nào,việc này được thực hiện ở tầng **Data**.)

* Tầng **Domain**: Tầng này được hiểu là phần nhân, phần lõi của ứng dụng. Tầng này chứa 100% code Java hoặc Kotlin thuần, không bao giờ có sự xuất hiện của Android Framework ở tầng này. Đây là tầng quan trọng nhất của 1 ứng dụng Android vì toàn bộ business logic sẽ nằm ở đây thông qua các Usecases. Nếu không có tầng **Presentation** thì ứng dụng của ta có chạy được không? Câu trả lời là có, bạn có thể cầm nguyên cái module **Domain** này chạy trên một IDEA khác không phải là Android Studio mà có thể là IntelliJ, NetBeans… vì đơn giản tầng này chỉ có Java hoặc Kotlin thuần. Nhiệm vụ của tầng này sẽ thực thi những Usecases và lấy data ở tầng **Data** và trả về cho tầng **Presentation**.

* Tầng **Data**: Đây là nơi tập trung tất cả data của ứng dụng (có thể là data lấy về từ API, data của db local, data của các SharePreference…). Nhiệm vụ của tầng này là hiện thực chi tiết cách lấy data và trả về tầng **Domain**.

***Một vài câu hỏi được đặt ra và áp dụng trong thực tế :**

**_ Tại sao mỗi tầng đều có Model riêng?** => Bởi vì Model ở mỗi tầng làm nhiệm vụ khác nhau, model ở tầng Data chỉ phụ trách việc parse data khi call api hoặc query DB. Model ở tầng Domain chỉ có những field mà view cần. Model của tầng Presentation nếu k có gì đặc biệt thì nó là chính là model của tầng Domain. Trong thực tế khi đi làm ta rất hay gặp trường hợp là dev 1 UI xong nhưng chưa có api để gắn data. Như vậy sau khi có api việc cần làm tiếp là sửa đổi ở tầng Data, viết thêm model parse ở tầng data và viết thêm lớp mapper để chuyển model của D
 về model của Domain như vậy là xong. Lại có bạn hỏi tiếp tại sao không dùng model parse của tầng data để hiển thị lên view vì nó cũng có những trường để hiển thị lên view? => làm như vậy bạn đã vi phạm quy luật phụ thuộc số 2 (sử dụng những đối tượng đồng cấp). Lúc này Presentation đã phụ thuộc vào Data. 


**_ Muốn dev thêm feature mới thì sao? (Extend)** => Ta bắt đầu từ tầng Domain, tạo ra 1 model ứng với feature –> tạo 1 usecase ứng với feature –> define 1 hàm để get data cho feature trong Repository -> vào tầng Data implement phương thức vừa định nghĩa ở Repository ở tầng Domain -> chuyển qua tầng Presentation ineject usecase vào Viewmodel hoặc Presenter để execute lấy data và update view.

**_ Muốn thay đổi (Maintain) thì sao?** => Ví dụ một ngày sếp của bạn không thích dùng Room Database nữa mà yêu cầu team chuyển sang Realm Database, không thích dùng Retrofit để call API nữa mà chuyển sang Volley để call API…. Trong những trường hợp này cái bạn cần sửa là ở tầng Data, vào DI để sửa cách khởi tạo của những đối tượng này và rồi lại inject vào Repository Impl.

**_ Viết Unit-Test thì sao?** => ta chỉ cần Unit-Test ở 2 nơi như sau:

1. Các file Java hoặc Kotlin implement Repository ở tầng Domain: Nơi đây sẽ là unit-test giúp mình check việc lấy data từ các nguồn khác nhau của app có đúng không (ví dụ call api result trả về có như ta mong muốn không, request data DB local trả ra kết quả có như ta muốn không)
2. Các usecase ở tầng Domain: Mục địch unit-test ở các usecase là để check logic của từng usecase. Khi viết unit-test cho usecase ta thường cần Mock giá trị trả về của các Repository.


=> Qua một vài ví dụ mình liệt kê thì có thể thấy code hầu như chỉ chỉnh sửa nhiều nhất ở tầng **Data** nhưng nhờ Clean Architechture thì khi Data thay đổi 2 tầng kia của chúng ta vẫn bình yên ^^.

### 4. Áp dụng Clean Architechture vào 1 một ứng dụng Android cụ thể.

_ Đây là 1 project mình viết demo về Clean Architechture, ứng dụng đơn giản chỉ show các list User và khi nhấn vào từng User sẽ show detail reputation của họ, ứng dụng mình viết bám rất sát với hình vẽ ở trên (đã bao gồm các unit-test demo):
https://github.com/tranphuc1995/CleanArchitechtureDemo

### 5. Ưu nhược điểm, so sánh nó với MVVM, MVP. 

***Ưu điểm:**

_ Nhớ lại lý thuyết thì bây giờ chắc chúng ta đã hình dung được câu nói “phân tầng ứng dụng”. Clean Architechture mục đích cuối cùng là chia ứng dụng thành nhiều tầng, mỗi tầng sẽ chứa các code cùng mục đích với nhau, nhưng vẫn luôn đảm bảo làm sao khi thay đổi code ở mỗi tầng thì toàn ứng dụng vẫn không ảnh hưởng nhiều.

_ Qua các ví dụ minh hoạ mình đã trình bày ở những phần trên thì Clean Architechture rõ ràng là một kiến trúc giúp ta có thể “Maintain”, “Extend”, “Unit-Test”.

***Nhược điểm:**

_ Với cá nhân mình thì Clean Architechture là một kiến trúc không có nhược điểm. Phải chăng nếu có thì nó chỉ không thích hợp với những project nhỏ vì triển khai quá nhiều class. Điều thứ hai mình thấy Clean Architechture thật sự khó để nắm bắt và hiểu được nó với những người mới bắt đầu, vì mình cũng có trình bày ở trên để hiểu được Clean Architechture thì buộc bạn phải hiểu Dependency Injection (nói nôm na là hiểu cái Dagger -  mà đa số mình thấy framework này cũng cực kỳ là khó để nhai ^^). Khi download bất kì một source code mẫu nào về Clean Architechture thì hầu như bạn đều thấy có DI trong đó. Và mình là cái thằng đã tìm hiểu Clean Architechture khi chưa biết gì về DI, nên lời khuyên cho các bạn là hãy nắm thật vững DI trước rồi hãy tìm hiểu tới Clean Architechture.

***So sánh với MVVM, MVP.**

_ Sẽ có một vài bạn hỏi mình so sánh Clean Architechture với MVVM, MVP thì mình xin trả là không so sánh được, vì sao ư? Vì đơn giản lắm MVVM và MVP không phải là Architechture mà chỉ là 1 Design Pattern. Nếu để ý lại hình vẽ phía trên bạn sẽ thấy nó chỉ là 1 Design Pattern trên tầng UI của Clean Architechture. Còn về việc vì sao MVVM và MVP không phải là Architechture thì bạn có thể tham khảo thêm ở [đây](https://medium.com/@anderson.badari/are-mv-something-really-architectural-patterns-abc36c1ed821).

**Phần trình bày về Clean Architechture của mình xin dừng lại ở đây. Hẹn mọi người ở những bài viết sau. Cám ơn mọi người đã dành thời gian đọc bài viết của mình ^^**