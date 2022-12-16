Tiếp theo phần 1 về Làm chủ Shadow trong ứng dụng Android

(https://viblo.asia/p/lam-chu-shadow-trong-ung-dung-android-phan-1-yMnKMybjK7P)

Ở phần 2 này mình sẽ trình bày các topic tiếp theo giúp mọi người hiểu hơn về Light và Shadow:
* Ánh sáng
* Đã nhấn và nghỉ
* Outline

# 4. Ánh sáng
Để hiểu được về ánh sáng thì thay vì đặt câu hỏi ánh sáng là gì chúng ta nên đặt câu hỏi ánh sáng ở đâu. 
Đúng như vậy vì thực ra chúng ta ai cũng biết ánh sáng là gì nhưng khi design 1 ứng dụng android ánh sáng tác động như thế nào đến **Views** chúng ta cần quan tâm chúng đến từ đâu, từ vị trí nào so với màn hình hiển thị.

![](https://images.viblo.asia/808a7634-7394-4fd5-ada0-3a1a6224b49d.png)
> 2 loại ánh sáng trong android framework 

Có 2 loại ánh sáng đến từ 2 hướng khác nhau như trên hình các bạn thấy:
1. Ánh sáng chính(Key light): Ở góc phía trước màn đến vật thể với vật thể ở đây là các **Views** hiển thị trên màn hình. 
2. Ánh sáng xung quanh(Ambient light): Ở giữa màn hình chiếu đến vật thể
Shadow của component hiển thị trên màn là sự kết hợp của 2 loại ánh sáng này. Ảnh bên dưới cho chúng ta thấy ánh sáng tác động như thế nào đến shadow của **Views**  cho từng trường hợp

![](https://images.viblo.asia/1b65277b-5cde-4b09-b9d9-e3d65b6c565c.png)


# 5. Đã nhấn và nghỉ
Chắc hẳn các bạn đều biết về Floating Button. Khi dùng nó chúng ta nhận thấy khi nhấn và nhả button ra có sự thay đổi trạng thái như thể một animation đã được implement cho button vậy. Nếu bạn đặt một Floating Action Button trong layout của bạn, nó sẽ có elevation 6 dp theo mặc định. Nhưng bạn sẽ nhận thấy rằng elevation fab sẽ được nâng lên 12 dp khi bạn nhấn nút. 
 
 Nhìn một cách sâu hơn về góc độ kĩ thuật. Ở đây khi chúng ta nhấn button thì **ViewPropertyAnimator** sẽ tiến hành thực hiện xử lý thay đổi khi tăng **translationZ** từ 0dp đến 6dp.
 Và khi chúng ta thả ra ra, **ViewPropertyAnimator** sẽ thực hiện xử lý chuyển **translationZ** từ 6 dp thành 0 dp. Những xử lý này giúp chúng ta cảm nhận được thay đổi về đối tượng.
 
 ![](https://images.viblo.asia/910d1a86-5c7c-44d8-87e9-0660fbb1b8c1.png)


 Các ban có thể tìm hiểu thêm về **ViewPropertyAnimator** qua (https://developer.android.com/reference/android/view/ViewPropertyAnimator) trong phạm vi giới hạn của bài viết mình sẽ không trình bày sâu về **ViewPropertyAnimator**
 
 # 6. Outline
Outline là một lớp API thuộc gói android.graphic. Định nghĩa một cách dễ hiểu thì Outline là phần khung đơn giản để chứa đối tượng và shadow của nó, 
outline cũng có tác dụng điều khiển thực hiện chuyển đổi shadow giúp người dùng có thể cảm nhận được. Mỗi view thì có một outline mặc định đi cùng và nó không cố định hình dạng cụ thể. Ở đây ví dụ chúng ta có View hình tròn thì outline cũng hình tròn, View hình vuông thì outline cũng là hình vuông. Tóm lại mỗi view có một outline đi cùng. Nếu bạn muốn thay đổi việc hoạt động mặc định của shadow trên đối tượng bạn cần tạo một **ViewOutlineProvider** ( https://developer.android.com/reference/android/view/ViewOutlineProvider) sau đó apply vào view cần custom.



-----


  Như vậy là  mình đã trình bày xong bài viết về Shadow trong ứng dụng Android. Hi vọng qua bài viết các bạn có một cái nhìn rõ hơn về Shadow cũng như material design, sử dụng material design một cách hiệu quả hơn khi thiết kế ứng dụng.
Bài viết mang những quan điểm cá nhân trong quá trình làm việc, tiếp thu học hỏi từ bài viết gốc https://android.jlelse.eu/mastering-shadows-in-android-e883ad2c9d5b. Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.