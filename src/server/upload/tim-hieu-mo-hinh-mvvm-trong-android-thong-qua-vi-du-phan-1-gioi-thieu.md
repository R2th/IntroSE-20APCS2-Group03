Các bạn có thể xem [phần 2 tại đây](https://viblo.asia/p/tim-hieu-mo-hinh-mvvm-trong-android-thong-qua-vi-du-phan-2-model-924lJdGNKPM) nha

Trong Android chúng ta thường biết đến hai mô hình phổ biến là MVP (Model - View - Presenter)
và MVVM (Model - View - ViewModel), chúng tạo ra một cấu trúc tốt trong project của chúng ta, giúp
project dễ dàng test cũng như khả năng mở rộng về sau.

Ở bài này, chúng ta sẽ cùng tìm hiểu về MVVM kết hợp Data binding trong Android. Tại sao lại là
Data binding? Bởi vì nó sẽ giúp xây dựng mộ hình MVVM dễ dàng hơn và tốt hơn

Chúng ta sẽ cùng nhau xây dựng 1 ứng dụng game Tic-Tac-Toe và áp dụng MVVM vào project. Hãy làm theo, kiểm tra mã
code và cố gắng thay đổi theo các hướng khác nếu có thể, không có việc học nào tốt bằng việc tự bạn làm và tự sửa chữa theo ý
cá nhân của mình. Bắt đầu nào !!

## Giới thiệu
Nếu bạn chưa từng biết về MVVM hoặc Data binding thì những phần giới thiệu dưới đây sẽ giúp bạn
hiểu về nó và cách nó hoạt động. MVVM là viết tắt của Model - View - ViewModel, ở đó view (tức giao diện người dùng)
sẽ được cập nhật bởi ViewModel và việc xử lý Logic hoặc trình bày dữ liệu sẽ do Model đảm nhận.

* #### Mô hình MVVM

    ![](https://images.viblo.asia/9c166226-96de-4a4f-a8e3-d55f319beb1c.png)

  Mô hình này khá giống với MVC (Model - View - Controller), sự khác biệt duy nhất là nẳm ở cách xây dựng nên
  C (Controller) của MVC và VM (ViewModel) của MVVM.

  * Model: 
  Trong MVVM thì model sẽ thể hiện cho dữ liệu + trạng thái + các logic của đối tượng. Nó không có ràng buộc với **View** hoặc
  **Controller** vì vậy có thể được xử dụng lại dễ dàng
  
  * View :
  Liên kết các biến quan sát và hành động bởi **View Model**. Quan hệ giữa **View Model** và **View** là 1-n, nghĩa là nhiều **View** có thể
  liên kết với 1 **ViewModel**
  
  * ViewModel:
  Chứa các model và chuẩn bị các dữ liệu quan sát cho View. Nó cung cấp các móc để truyền dữ liệu từ View sang Model. Một điều cần
  phải ghi nhớ là ***ViewModel sẽ không ràng buộc vào View***

* #### Data binding
  Được giới thiệu ở Google I/O 2015, giúp việc khai báo các layout and xử lý logic cho các layout này trở nên ít hơn và dễ dàng hơn. Giảm tải các đoạn mã bind view mà lập trình viên phải viết trong các màn hình của ứng dụng

  Làm sao để tích hợp Data Binding vào project:

  - Ở **build.gradle** level app chúng ta hãy thêm vào: 

        ...
        android {
          ...
          dataBinding {
            enabled = true
          }
        }
      
  - Và ở file layout của bạn hãy bắt đầu với **layout** tag là root view, tiếp theo là **data** tag để mô tả những gì sẽ được bind:
       ```
        <layout>

            <data name="Your view model name" type="Class of your view model" />

            ...
            Yout layout
        </layout>
        

Thông qua bài này, mình đã giới thiệu với các bạn cái khái niệm trong mô hình **MVVM** trong Android. Ở phần tiếp theo, chúng ta sẽ
cùng tìm hiểu chi tiết về từng thành phần trong **MVVM** và cách xây dựng nên chúng.

Hẹn gặp lại các bạn ở những phần sau nhé !! ^^