# GIỚI THIỆU
 Ở phần trước chúng ta đã nói về 5 cách tăng tính khả dụng **Usability UI, UX ** của một App user và API user. Các bạn có thể xem lại phần trước [tại đây](https://viblo.asia/p/android-uiux-developer-cung-la-nhung-user-part-1-bWrZnwRnlxw).      
 Còn ở bài viết này chúng ta sẽ tiếp tục tìm hiểu những cách còn lại trong series này nhé. Let's go!
 
#  NỘI DUNG CHÍNH
## 6. Nhận ra ngay thì tốt hơn là ... "nhớ lại":
Nhan đề mình dịch ra tiếng Việt thì nó hơi "chuối" :joy: , cụ thể thì là thế này:

*  **Với UI:** Nhận ra ngay một điều gì đó quen thuộc và có thể hiểu được ngay tại lúc đó với hoàn cảnh đi với nó thì dễ dàng  và ít tốn thời gian nhiều so với việc phải ngồi phải lục lại trí nhớ hoặc "bấm thử " để xem "cái này dùng để làm gì?". Một giao diện người dùng đơn giản, sử dụng các biểu tượng quen thuộc và được công nhận thì sẽ dễ dàng để user sử dụng hơn. Thông tin và chức năng nên được hiểu thì trực quan và dễ dàng truy cập.
* Ví dụ thế này: 
  ![](https://images.viblo.asia/55dd2653-11ae-4203-9cc4-7b844070c2ae.png)
    
   *Icon hình cái bút chì thường là ký tự dùng cho việc chỉnh sửa điều gì đó, chúng ta có thể dễ dàng nhận ra điều này ngay cả khi chưa dùng app này bao giờ. Nó độc lập với ứng dụng*
  
*    **Với API:**   Làm cho tên function,class,variable ... rõ ràng và dễ hiểu .
        *    Một tên biến (variable) nên nói lên nó đại diện cho cái gì, không phải là cách sử dụng nó. vd: isLoading, animationDuration...
        * Tên class nên được bắt đầu bằng danh từ và diễn tả được đối tượng mà nói đại diện. Vd: Human, Document, ...
        * Một tên function/method nên là động từ và nên diễn tả được nó thực hiện điều gì. VD: query(), clear(), handleEvent()...
       
## 7. Tính linh hoạt và hiệu quả sử dụng:

*  **Với UI:** Ứng dụng của bạn có lẽ được sử dụng bởi cả người sử dụng có kinh nghiệm và người sử dụng chưa có kinh nghiệm phải không nào? Vì vậy nên hã tạo ra UI mà nó phù hợp với cả 2 đối tượng sử dụng này và cho phép họ làm quen nhanh với những tác vụ chính. Người ta nói rằng 80% người dùng chỉ sự dụng 20% chức năng của một ứng dụng. Chính vì vậy chúng ta cần tạo ra cân bằng giữa sự đơn giản và sức mạnh của ứng dụng. Tìm xem 20% đó là gì trong ứng dụng của bạn và làm cho  chúng dễ dàng dễ nhìn thấy và sử dụng dụng đơn giản nhất. Và áp dụng nguyên tắc [Tiết lộ lũy tiến (Progressive disclosure)](https://www.interaction-design.org/literature/topics/progressive-disclosure) và cho phép user truy cập vào các tính năng "nâng cao" trong màn hình phụ. Điều này sẽ giảm confused cho người sử dụng nhiều lắm đó :wink:

 
![](https://images.viblo.asia/4016824c-ef92-445e-8fa7-7882b47ae1fd.png)

*VD như với phần cài đặt wifi, 2 chức năng UI chính ở đây là chọn tên wifi và nhập password là đủ với đa số người dùng còn các thông tin như "Proxy, IP settings" thì được đặt trong Advanced options.*

*    **Với API:** 
        *    **Xây dựng một API linh hoạt**: Muốn Người sử dụng api có thể hoàn thành task của mình với API thì nó cần phải có sự hiệu quả và linh hoạt. Ví dụ như khi truy vấn một database, ROOM cần cung cấp các giá trị trả về khác nhau để cho phép chúng thực hiện các truy vấn đồng bộ mà có thể thích hợp cho cả những ai sử dụng RxJava2 hoặc với LiveData.

```
@Query(“SELECT * FROM Users”)

// synchronous
List<User> getUsers();

// asynchronously
Single<List<User>> getUsers();
Maybe<List<User>> getUsers();

// asynchronously via observable queries
Flowable<List<User>> getUsers();
LiveData<List<User>> getUsers();
```
     
*  **Đặt những method liên quan trong những class liên quan**: Các phương thức được đặt trong một class mà chúng không liên quan đến nhau sẽ khiến cho User rất khó tìm hiểu và hình dung được chức năng của chúng nếu không đọc code. Thậm chí, "Util" class or "Helper" class là nơi có xu hướng nhóm các method không liên quan đến nhau cũng có thể bị khó tìm. Khi sử dụng Kotlin, giải pháp cho điều này là chúng ta có thể sử dụng những [Extend-Function](https://kotlinlang.org/docs/reference/extensions.html).

## 8. Hãy thiết kế một cách có thẩm mỹ nhưng cần tối giản:

*  **Với UI:**  Giao diện người dùng (UI) nên giữ sự đơn giản, chỉ nên chứa những thông tin mà user cần thiết tại thời điểm đó. Những thông tin không liên quan hoặc ít cần thiết thì nên xóa bỏ hoặc là move chúng vào một màn hình khác vì sự hiện diện chúng có thể làm cho User mất tập trung giảm chú ý đến những thông tin thực sự quan trọng. Ví dụ:

![](https://images.viblo.asia/53fdf6e9-42f8-46ad-bb91-f9e546c89d95.png)

*Ở màn hình đầu tiên ứng dụng Pocket Casts chỉ hiện thị những thông tin thật sự cần thiết của bài nghe là Tên, Ngày publish, Icon play, thời lượng còn những chi tiết khác như Chi tiết, Dung lượng, Tác giả, Thêm vào xem sau, Mark,... đều được move qua màn hình số 2 là Chi tiết bài nghe*

*    **Với API:**  
        *    **Không phơi bày ra những logic sâu và thông tin không cần thiết :** Việc hiển thị ra những chi tiết logic dài dòng không cần thiết có thể gây bối rối cho người sử dụng và dẫn đến kém khả dụng. Ví dụ như khi viết Documents những Nhà phát triển lớn sẽ rất ít khi chỉ rõ logic của function mà chỉ viết ra chức năng để người sử dụng có thể thấy ngay và sử dụng.
        *    **Không buộc User làm tất cả những gì mà API có thể làm**: Bắt đầu từ version 22.1.0, Android Library đã update bộ đối tượng  *RecyclerView*  cho phép các element của nó notify toàn bộ để cập nhật lại các item view, điều này làm tiêu tốn khá nhiều tài nguyên ảnh hưởng đến performance. Và với bản update ver 25.1.0, họ đã cải thiện được điều này bằng cách đưa vào DiffUntil để khắc phục là chỉ notify những item đã bị thay đổi để giảm tiêu tốn bộ nhớ và tăng performance .

## 9. Giúp người sử dụng phát hiện, chuẩn đoán, và khắc phục lỗi phát sinh:
*  **Với UI:**  Hãy cung cấp cho User sử dụng ứng dụng của bạn những massage báo lỗi để giúp họ nhận ra, chuẩn đoán để tự khắc phục những lỗi đó. Một error message tốt chứa một chỉ thị rõ ràng là những gì đã hoạt động không đúng. Hãy mô tả vấn đề chính xác bằng ngôn ngữ tự nhiên và quen thuộc với người dùng, đôi khi chứa một lời khuyên hợp lý để giúp người dùng trực tiếp sửa lỗi đó. Và tránh hiển thị những cái mà chỉ có "máy" mới hiểu như error code hoặc tên Exception nhé, hiển thị như vậy họ chẳng biết đâu mà lần đâu :joy::sweat_smile: . Tham khảo hình dưới đây để hình dùng nhé 

 ![](https://images.viblo.asia/87d9aef4-74f6-4f60-bc13-6a5a796bd026.png)
 
 *Hiển thị chi tiết ở input field ngay khi mất focus, không chờ cho đến khi User ấn Submit toàn bộ form, hoặc tệ hơn chờ thông báo lỗi từ phía back-end. Nếu bạn đang tạo thông báo lỗi như ví dụ sẽ giúp ngăn chặn được việc spam server, người dùng có thể thấy lỗi sớm nhất có thể và tiến hành sửa đổi để tránh mất thời gian nhập toàn bộ form*
 
*  **Fail fast:**
    *  **Với API:**   lỗi càng được báo sớm thì càng tránh được thiệt hại. Tuy nhiên, thời gian tốt nhất để hiểu thị lỗi là lúc compile. VD: Room sẽ báo cáo bất kỳ vấn đề nào sảy ra với các truy vấn không chính xác ngay khi compile. 
*  Nếu bạn không thể report lỗi trong thời gian compile, thì hãy cố report nó trong thời gian chạy càng sớm càng tốt.
* **Hãy ném ra Exception càng cụ thể càng tốt** : 
    * API: Những developer thì chắc họ đã biết đến IllegalStateException hoặc IllegalArgumentException là gì rồi, thậm chí họ còn không biết nguyên nhân của exception có thể là nằm trong API của bạn. Hãy giúp người sử dụng api bằng cách ném ra các Exception hiện có, ưu tiên các Exception cụ thể hơn là các Exception chung với một thông báo rõ ràng.

* **Thông báo lỗi phải chỉ ra chính xác vấn đề:**
    * API: Các hướng dẫn tương tự để viết thông báo lỗi cho UI cũng áp dụng cho API. Hãy cung cấp các thông báo chi tiết sẽ giúp người sử dụng API biết rõ hơn họ cần phải sửa những gì trong code của họ.
    * Ví dụ như khi sử dụng Room, nếu lệnh query chạy trên Main thread, người sử dụng sẽ nhận được thông báo: `java.lang.IllegalStateException: Cannot access database on the main thread since it may potentially lock the UI for a long period of time` . Với message như vậy, rõ ràng là chúng ta biết nguyên nhân là gì và cần phải tìm hướng khắc phục như thế nào rồi phải không.

## 10. Hướng dẫn và tài liệu:
* **Với UI:** Khi bạn lập trình ra một ứng dụng, điều tuyệt vời nhất là họ có thể làm chủ ứng dụng của bạn mà không cần bất cứ tài liệu hướng dẫn nào. Tuy nhiên, điều này khá là khó với những ứng dụng phức tạp. Lúc này thì "Hướng dẫn sử dụng" là bắt buộc, hãy đảm bảo rằng việc hướng dẫn sử dụng ở đây là dễ dàng để tìm kiếm, dễ dàng tìm thấy và nó có thể trả lời hoàn toàn những khúc mắc của người dùng.

![](https://images.viblo.asia/d4eb7c8c-a90c-487a-a575-0fa5cf1b103e.png)

*Chỉ cần bật side-bar chúng ta có thể dễ dàng nhìn thấy option "Help" và "Send feedback" ở phía dưới*

* **Với API:** 
    * **API nên có thể tự biểu thị chính nó:** Hãy đặt một cái tên có ý nghĩa và dễ hiểu cho các method, tên class và các member . Nhưng dù API có tốt đến đâu thì nó cũng không thể hoạt động tốt nếu không có một "Hướng dẫn sử dụng" tốt. Điều này giải thích tại sao tất cả các public element, class, field, parameter nên có document. 
    * **Các đoạn code mẫu của API nên rõ ràng và cụ thể:** điều này có một vài vai trò đó là chúng giúp các api user hiểu rõ mục đích của API, cách sử dụng, và hoàn cảnh áp dụng.  Những đoạn code mẫu này hướng dẫn cho các api user của bạn truy cập và sử dụng các function cơ bản, là nền tảng khi áp dụng API thể hiện cách nó tương tác, hoạt động với các component khác của dự án. Điều này rất quan trọng vì khi API trở nên phổ biến, chỉ một sự sai sót nhỏ trong example có thể khiến rất nhiều các developer làm theo và mắc sai lầm --> cái giá phải trả lúc này là rất đắt.  

# KẾT THÚC.
*  Như vậy là chúng ta đã học được khá nhiều thứ về việc làm thế nào để tăng tính khả dụng của ứng dụng. Việc lắng nghe người dùng là điều rất quan trọng. Chúng ta cần biết họ cần gì, họ nghĩ như thế nào và họ cảm thấy ra sao khi sử dụng ứng dụng của mình. Họ muốn các UI trực quan, hiệu quả, chính xác, giúp họ thực hiện tốt các công việc cụ thể theo những cách thích hợp. Tất cả những điều này vượt ra ngoài UI và cũng được áp dụng cho API bởi vị các developer cũng là những người dùng. Vì vậy, chúng ta cần giúp họ (và chúng ta) xây dựng các API, UI có thể sử dụng được.
## Reference: 
* https://medium.com/androiddevelopers/developers-are-users-too-part-2-96e03fe17535
* https://medium.com/androiddevelopers/developers-are-users-too-introduction-fefdb42f05a

**P/S**: Chúng ta đang sống trong thời đại tương tác. Nếu thấy bất cứ điều gì sai sót - hãy để lại ý kiến dưới phần bình luận để writer khắc phục nhé. 
Have a good day :innocent: