# GIỚI THIỆU
   Khi nói về tính khả dụng **Usability UI,UX** của một ứng dụng,  chúng ta sẽ nghĩ ngay tới giao diện người dùng của ứng dụng đó. Đó có thể là một ứng dụng Bản đồ, Chat app, Chia sẻ hình ảnh. Chúng ta muốn giao diện người dùng trong ứng dụng của mình phải đơn giản, trực quan, hiệu quả khi người ta nhắc về nó. Ví dụ với một ứng dụng Bản đồ, nó sẽ cần có :
  
* **Intuitive** (trực quan): để có thể dễ dàng thấy được cách đi từ A đến B.
* **Efficient** (hiệu quả):  để có thể tìm thấy và dẫn đường nhanh chóng.
* **Correct** (chính xác) : để tìm thấy đường từ A sang B mà không gặp tắc đường hoặc những trở ngại khác.
* Có các **Chức năng hữu dụng** : để có thể khám phá ra đường đi, phóng to, thu nhỏ bản đồ và chọn đường điều hướng.
* **Đơn giản trong sử dụng** : Ví dụ như có thể phóng to, thu nhỏ chỉ bằng cách chụm 2 ngón tay lên màn hình ...

Tính khả dụng **Usability** của một ứng dụng có thể được tính thông qua tỉ lệ nghịch với thời gian mà người dùng có thể làm chủ các tính năng của ứng dụng đó. Nghĩa là, nếu thời gian mà người dùng làm chủ các tính năng của ứng dụng càng thấp thì tính khả dụng của ứng dụng đó càng cao và ngược lại. Điều này rất quan trọng trong việc ứng dụng đó có được phát triển hay không, vì đa số người dùng không thích tốn quá nhiều thời gian để tìm hiểu  phải không nào :D . 

![](https://images.viblo.asia/41b1939a-96c5-4d50-a5a6-07fe87cfe676.jpg)

Vì thế trong series này mình xin được chia sẻ 10 bí quyết để làm cho ứng dụng của mình có thêm tính khả dụng **Usability** nhé!!!


# NỘI DUNG CHÍNH
## 1. Hiển thị trạng thái của hệ thống: 
> Hệ thống cần thông báo cho người dùng về những gì đang sảy ra bằng những phản hồi thích hợp, trong một thời gian hợp lý.
 
* **UI**:   Khi người dùng bắt đầu một tác vụ tốn nhiều thời gian sử lý, hãy thông báo cho họ về quá trình xử lý này. Như là một progress bar, một hình ảnh loading, một upload/download notification với phần trăm hoàn thành nếu có thể. Làm như vậy người dùng có thể biết được họ đang chờ những gì và chờ bao lâu. 

![](https://images.viblo.asia/0052fb3c-71f9-42b6-852d-7ae920092c57.gif)

* **API:** API nên cùng cấp các phương thức để tính toán trạng thái hiện tại. Ví dụ như class [AnimatedVectorDrawable](https://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable.html) có cung cấp các method để kiểm tra liệu rằng animation đang chạy hay là không. 

```
boolean isAnimationRunning = avd.isRunning();
```
*  API có thể cung cấp một cơ chế callback để cho phép người sử dụng API biết được khi nào object thay đổi trạng thái- như là một notification để kiểm trai khi nào animation bắt đầu và kết thúc. Như  [AnimatedVectorDrawable](https://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable.html) thì có cung cấp một [AnimationCallBack](https://developer.android.com/reference/android/graphics/drawable/Animatable2.html#registerAnimationCallback%28android.graphics.drawable.Animatable2.AnimationCallback%29) để phục vụ cho mục đích này.

## 2. Ngôn ngữ của hệ thống và ngôn ngữ người dùng: 
> Ứng dụng nên hiện thị với người dùng bằng ngôn ngữ của họ (những từ và các khái niệm phổ thông với người sử dụng), không nên dùng ngôn ngữ của hệ thống để hiển thị.

Ví dụ : 
![](https://images.viblo.asia/a0b78dc3-33e4-4bc3-881c-65a9d7bfa036.png)

**API:** Khi tìm kiếm các method để giải quyết một vấn đề nào đó trong một API mới, người sử dụng sẽ không biết bắt đầu từ đâu và thường họ sẽ dựa vào những kinh nghiệm đã biết với các API tương tự trước đó, hoặc dựa trên các khác niệm chung liên có liên quan đến miền API. Ví dụ như việc sử dụng Glide hoặc Picasso để download hoặc hiển thị hình ảnh, chúng ta sẽ thử gọi các method là "load()" hoặc là "dowload()" như một thói quen để giải quyết vấn đề này. 

Chính vì vậy nên việc hiển thị những từ "phổ thông" được mọi người hay sử dụng sẽ góp phần rất lớn vào việc giúp họ làm quen nhanh hơn với ứng dụng của mình.

## 3. Kiểm soát và tự do của người dùng.
> Cung cấp cho người dùng khả năng hoàn nguyên những thao tác của họ.

**UI:** Với những thao tác "nhạy cảm", mơ hồ của người dùng như xóa, lưu trữ email, hiển thị thông báo nên cho phép người dùng hoàn tác hành động của họ để có thể tránh được những tổn thất đáng tiếc khi mất dữ liệu hay bỏ qua thông tin. Ví dụ như khi họ vô tình và ấn "thử" nút xóa chẳng hạn. :D

![](https://images.viblo.asia/6871b5b1-6e2d-4f68-8aaf-a7b5603fbb4e.png)

**API:** API nên cho phép hủy bỏ hoặc đặt lại các hoạt động và dễ dàng để đưa mọi thứ về trạng thái ban đầu. Ví dụ, với [Retrofit#cancel](https://square.github.io/retrofit/2.x/retrofit/retrofit2/Call.html#cancel--) method có thể  hủy các request trong khi nó đang được thực thi. Và sau khi hủy hành động, hãy chắc chắn ra mọi thứ vẫn được giữ nguyên. Nếu đã từng làm việc với NotificationManager API bạn sẽ thấy rằng chúng ta có thể tạo và cũng có thể huỷ thông báo.

## 4. Tính nhất quán và tiêu chuẩn:
> Người dùng không cần phải tự hỏi rằng những từ, những tình huống, những hành động khác nhau liệu có chung một ý nghĩa 

**UI:** 
* Người sử dụng tương tác với ứng dụng của bạn thường áp dụng những kinh nghiệm họ biết được khi sử dụng ứng dụng khác trước đó. Và họ mong đợi rằng các yếu tố tương tác phổ biến sẽ nhìn và thực hiện theo một cách tương tự nhau. Đi chệch những quy ước đó sẽ tạo ra những bối rối cho người sử dụng và họ cần phải bỏ thêm nhiều thời gian để làm quen với điều đó. 

* Vì vậy, hãy nhất quán với nền tảng và sử dụng các thao tác UI được nhiều người biết đến, để họ có thể nhanh chóng nhận ra và làm chủ ứng dụng.  Và hãy đồng nhất chúng trong suốt ứng dụng của riêng bạn. Sử dụng cùng một từ, cùng icon, dialog thông báo để thể hiện những điều tương tự nhau trên nhiều màn hình. Ví dụ sử dụng một icon edit khi muốn sửa bất cứ thứ gì đó như sửa tên, thông tin cá nhân ... hay dùng chung cái dialog báo thành công hay thất bại khi thực hiện điều gì đó. 

![](https://images.viblo.asia/a9ad189f-e902-4360-b889-3d0b1f58742b.png) 
             *Dialog nên nhất quát trên nền tảng.*
             
**API:** tất cả các phần của API nên được nhất quán. 

### Sử dụng cách đặt tên nhất quán ở các method
    
   Chúng ta cùng xem qua đoạn code này, nó dùng trong việc thêm người dùng vào hệ thống  : 

```
public interface MyInterface {
        void registerUser(User user )
        
        void addNewUser(User user)
}
``` 

Người sử dụng interface này sẽ tự hỏi rằng sự khác nhau giữa *register...User*  và  *add...User* trong trường hợp này là gì, cái nào mới cho phép mình thực hiện mục đích của mình. Lúc này họ sẽ phải vô đọc code, document hay phải xem các implement của 2 method này để xác định xem mình cần phải gọi cái nào -> khá là confused phải không nào  (T.T) 

Vì vậy nên hãy sử đặt **cùng một tên** cho những method thực hiện những **điều giống nhau.**

Xem xét sử dụng những cặp từ trái nghĩa như : set - get, add - remove, subscribe - unsubscribe, show - dismiss.

### Sử dụng nhất quán tham số truyền vào các phương thức.

* Khi overloading các method, hãy chắc rằng bạn phải giữ đúng thứ tự được truyền vào trong tất cả các method đó. Nếu không, người sử dụng những method này của bạn phải cần nhiều thời gian hơn điểu hiểu sự khác biệt của các overload method này đó nhé.  Ví dụ : 

```
void setNotificationUri(ContentResolver cr,
                         Uri notifyUri);
                         
void setNotificationUri(Uri notifyUri,
                         ContentResolver cr,
                         int userHandle);
```
--> khá khó chịu phải không nào.

### Một method nên chỉ có tối đa là 4 tham số truyền vào.

Càng nhiều tham số truyền vào method sẽ càng làm nó phức tạp. Với mỗi tham số, người sử dụng cần hiểu ý nghĩa của nó với method đó, và nếu có quá nhiều thứ được truyền vào sẽ càng làm mọi thứ rối tung lên.  Điều này có nghĩa là mọi tham số truyền vào đều dẫn đến sự phức tạp tăng theo cấp số nhân. Và giải pháp ở đây là hãy xem xét nhóm nó về một object class hoặc sử dụng các builder pattern.

### Giá trị trả về cũng ảnh hưởng đến độ phức tạp của một method.
Khi một method có trả về một giá trị, các developer cần biết rằng giá trị đó đại diện cho điều gì, ý nghĩa của nó và lưu trữ nó như thế nào. Còn khi giá trị trả về đó không được sử dụng, nó không ảnh hưởng đến sự phức tạp của method.

Ví dụ như khi insert một object vào trong database, Room có thể trả về 2 kiểu là *long* và *void* . Khi người sử dụng Room muốn sử dụng giá trị trả về này, họ phải hiểu ý nghĩa của giá trị *long*  được trả về là gì và làm thế nào để chứa nó. Còn khi không cần giá trị trả về thì method với kiểu dữ liệu *void* sẽ được gọi. 

```
@Insert
Long insertData(Data data);

@Insert
void insertData(Data data);
```

Như vậy, chúng nên cho phép người dùng API quyết định rằng học có cần lấy giá trị trả về khi gọi method hay là không. 

## 5. Phòng ngừa lỗi :

> Hãy tạo ra một design mà nó có thể tránh các vấn đề phát sinh ngay khi có thể.

**UI:** thỉnh thoảng, người sử dụng sẽ mất tập trung vào những gì họ đang làm, và việc của của chúng ta là phải ngăn ngừa các lỗi vô thức này bằng cách hướng dẫn người dùng đi đúng hướng và hạn chế bị tổn thất. Ví dụ, bạn có thể hỏi người dùng để xác nhận trước khi họ thực hiện một hành động xóa bỏ hoặc hướng dẫn đưa về mặc định.

Ví dụ, Google Photos giúp người dùng tránh được những lần họ vô tình xóa một album bằng cách thêm vào một dialog xác nhận. Hoặc thông báo xác nhận với một email và cho phép đưa về mặc định khi ấn vào một link trên đó.

![](https://images.viblo.asia/7b5d499c-30a4-447f-83d2-655a8d86e82c.png)

**API:** nên hướng dẫn người dùng sử dụng nó một cách chính xác. Sử dụng các giá trị mặc định để tránh lỗi nếu có thể. 

* API nên viết để dễ dàng để sử dụng đúng và khó bị lỗi bằng cách cung cấp các giá trị mặc định nếu như người dùng không truyền vào. Ví dụ, khi tạo một ROM database, một trong những tham số đảm bảo rằng dữ liệu trong database sẽ được giữ lại khi thực hiện tăng database version. Điều này sẽ thêm tính khả dụng cho người dùng kết hợp vì dữ liệu của họ được lưu lại và không mất đi khi thay đổi. Và nếu không muốn dữ lại họ có thể cung cấp [fallbackToDestructiveMigration](https://developer.android.com/reference/android/arch/persistence/room/RoomDatabase.Builder.html#fallbackToDestructiveMigration%28%29) để xóa thay vì giữ lại.



-----
# TẠM KẾT
*  Trên đây mới là 5 bí quyết để tăng tính khả dụng cho ứng dụng. Hi vọng điều này sẽ giúp ích cho các bạn trong việc xây dựng ứng dụng. Nếu có gì bổ sung, hãy góp ý dưới phần bình luận nhé!
Hẹn gặp lại các bạn ở phần tiếp theo. Thân ái !
## Tham khảo : 
* https://medium.com/androiddevelopers/developers-are-users-too-part-1-c753483a50dc
* https://medium.com/androiddevelopers/developers-are-users-too-introduction-fefdb42f05a