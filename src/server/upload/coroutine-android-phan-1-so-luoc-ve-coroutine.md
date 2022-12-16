# 1, Lời mở đầu
* Xin chào mọi người, mình rất vui được chia sẻ cho mọi người 1 loại kiến thức mới mà mình đã từ tìm hiểu được.
* Lần này đó là gì ? Đó chính là **coroutine**.
* Phải nói thật với mọi người rằng từ lúc bắt đầu có coroutine mình cũng không nghĩ rằng mình sẽ thích nó đến vậy. Nó rất mạnh mẽ, tối ưu và hỗ trợ rất nhiều cho các lập trình viên Kotlin và Android.
* Để hiểu rõ sức mạnh của nó hãy đi cùng mình tìm hiểu những thứ căn bản nhất nhé.
# 2, Tại sao chúng ta lại cần coroutine ?
* Mình sẽ đưa ra 1 ví dụ cho mọi người để mọi người dễ hiểu.
* **Ví dụ**: bạn muốn lấy dữ liệu từ server bằng **fetchUser()** sau đó update kết quả lên trên UI bằng **show(user)** trên main thread:

![](https://images.viblo.asia/cfec3343-4565-45df-a777-2b42ebdafb8e.png)

* Bạn sẽ gặp NetworkOnMainThreadException bởi vì Android không cho phép các lời gọi network trên main thread:

![](https://images.viblo.asia/ed4facba-d92c-46b5-9f43-929ca18db884.png)

* **Phương án 1**: tạo ra 1 Thread để thực hiện công việc nhưng lại gặp CalledFromWrongThreadException bởi vì bạn update UI trên 1 thread khác:

![](https://images.viblo.asia/a649f6ab-a7f8-4a39-9101-a1415369c357.png)

* **Phương án 2**: gọi network request trên 1 thread khác sau đó show kết quả trên main thread thông qua callback:

![](https://images.viblo.asia/11eb59ee-a92c-4145-a4ac-7004a2540159.png)

* Phương án này nhìn khá ổn đó chứ nhưng vẫn có vấn đề là khi bạn gọi 1 network request thì sẽ sinh ra subscription và nếu bạn quên không clear nó đúng cách đúng thòi điểm thì có thể gây ra error:

![](https://images.viblo.asia/f5d964b6-e544-48ce-a05a-310deaf5ab0d.png)

* **Phương án 3**: từ phương án 2 ta chỉ cần dọn dẹp subsciption đúng lúc và đúng cách là được đúng chứ :grinning:

![](https://images.viblo.asia/4cc903d6-88f6-487a-ad9d-671516f5608d.png)

![](https://images.viblo.asia/e09ba28e-7110-4a95-8a33-d68261f2334c.png)

* Nếu có nhiều lời gọi thì sẽ sinh ra rất nhiều subsciption. Nó thực quá dài dòng, lan man, khó maintain và mở rộng.

# 3, Đôi chút về lịch sử
* Mình có tính tìm hiểu rất kĩ. Khi bắt đầu 1 vấn đề mình luôn muốn biết từ gốc.
* Bạn đã tự hỏi tại sao đã có RxJava-RxAndroid-RxKotlin mà Google không tận dụng nó không? Mình sẽ giải thích cho bạn.
* Như bạn đã biết mỗi năm Google đều lấy servey từ các developer trên toàn thế giới.
* Vấn đề về **Threading and concurrency** luôn là 1 vấn đề khá khó. Năm 2018, vấn đề này được nêu bật hơn trong các survey mà Google thu thập được.
* Thread truyền thống quá cồng kềnh vầ không tối ưu cho hệ thống của bạn (Mình sẽ giải thích ở bài viết tiếp theo).
* LiveData là 1 công cụ mạnh mẽ và nhiều developer đã muốn Google mở rộng nó.
* Tất nhiên, Google đã nghiên cứu để tìm ra giải pháp tốt nhất cho vấn đề này. Cuối cùng họ đã focus vào 3 đối tượng chính là: Coroutine, LiveData và ReactiveX.

![](https://images.viblo.asia/3523ea5c-576d-4947-a471-8b26e2361301.png)

*  Ba đối tượng này đều có điểm mạnh và điểm yếu khác nhau:
    *  **LiveData**: nếu đọc qua SOLID chắc mọi người cũng biết chứ S - single respository principle, Google muốn LiveData làm có 1 trách nhiệm duy nhất nên không phát triển nó.
    *  **RxJava**: Đây là 1 công cụ tuyệt vời. Nó mạnh mẽ và thích hợp sử dụng trong hầu hết các trường hợp. Vì sử dụng callback, nó lại khác dài dòng  khi áp dụng lồng nhau nhiều lời gọi bất đồng bộ. Nhiều người coi nó như thứ công cụ để giải quyết mọi vấn đề nhưng rất hay quên thực hiện tất cả các bước như clear resource... Nói nhỏ nữa nó là của Java mà :laughing:.
    *  **Coroutine**: thuật ngữ này có lâu rồi đó và là 1 công cụ rất mạnh mẽ. Trong Android nó còn quá mới và chưa được phát triển. Công cụ mới cũng đòi hỏi lập trình viên phải tìm tòi thêm (phần lớn mọi người đã quen với ReactiveX).
*  Google tập trung vào 3 đặc điểm để chọn ra đối tượng phù hợp:
    *  **Đơn giản**: dễ dàng tìm hiểu và áp dụng. Kotlin chiếm đa số nên áp dụng cái gì gần là tốt nhất.
    *  **Tổng quát**: có thể giải quyết được tất cả vấn đề của Android.
    *  **Mạnh mẽ**: tối ưu và tương thích với Android.
*  Cuối cùng, Google đã chọn coroutine và phát triển nó thành 1 công cụ mạnh mẽ và tuyệt vời.

# 4, Kết luận
*  Google chọn coroutine để giải quyết Threading và concurrency theo 1 cách Kotlin hoá.
*  Đây là công cụ rất mạnh mẽ và làm cho code bạn trở nên ngắn gọn, đẹp và maintain hơn rất nhiều.
*  Hiện tại coroutine đã hỗ trợ cho Android rất nhiều rồi.
*  Mong bài viết lần này sẽ giúp mọi người có 1 cái nhìn tổng quan hơn về coroutine.