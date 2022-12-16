# MVC, MVP, MVVM hay Viper - Lựa chọn dành cho ứng dụng iOS
![](https://images.viblo.asia/2f5904de-0bfb-49c6-86d0-6ac7d63fe625.jpg)

>  **Giống như mỗi ngôi nhà đều cần có nền móng vững chắc, mỗi dự án xây dựng phần mềm phải được dựa trên một mô hình cụ thể. Đối với ứng dụng iOS ,có bốn kiểu mô hình thường bị lôi ra đánh giá và chỉ trích nhưng vẫn được sử dụng rất rộng rãi đó là : MVC, MVP, MVVM và VIPER .Trong bài viết này chúng ta sẽ tìm hiểu về sự khác nhau giữa các mô hình này để có thể đưa ra lựa chọn phù hợp cho ứng dụng iOS của mình. **
     
Bốn mô hình MVC, MVP, MVVM và VIPER được ra đời và phát triển theo đúng thứ tự vừa được nêu ,chúng được sử dụng rộng rãi trong rất nhiều nền tảng (trừ VIPER chỉ sử dụng chủ yếu trong iOS). Những điểm khiếm khuyết của cái trước một phần chính là nguyên nhân xuất hiện của cái sau. Chúng ta hay dùng tìm hiểu rõ hơn từng mô hình trong thời kì của nó.

### 1. Mô hình MVC 

![](http://www.builderwebsitedesigns.com/wp-content/uploads/2017/06/1-12.png)


Được ra đời vào đầu năm 1970 bởi một công ty ở Norway ,mô hình MVC(Model-View-Controller) là một trong nhưng mô hình đầu tiên hướng tới lập trình hướng đối tượng (Object - Oriented Programming).

Phần View chịu trách nhiệm toàn bộ các việc liên quan đến hiện thị cho người dùng ,trong khi Model quản lí cơ sở dữ liệu, logic trong code, cùng các kiểu dữ liệu khác của ứng dụng ,Controller sẽ điều khiển và sử dụng các dữ liệu trong Model đồng thời thực thi các hành động của ứng dụng ví dụ như yêu cầu View hiện thị ra màn hình khi người dùng tương tác với View.

Hiện thời, hai công ty lớn đối đầu nhau là Apple và Google đều có cho mình hệ thống mô hình MVC riêng. Vấn đề nảy sinh khi trong kệ thống của Apple ,View và Controller có mối quan hệ chặt chẽ với nhau đến mức mà phần Model gần như bị tách biệt. Điều này dẫn đến một hệ quả là việc testing riêng View và Controller rất khó khăn và gần như là không thể thực hiện được. Đây là tiền đề cho sự ra đời của mô hình tiếp theo.

### 2. Mô hình MVP

![](https://images.viblo.asia/b445b616-a857-4473-83e7-7fdb7c17bb15.png)


Giống như MVC, trong MVP(Model-View-Presenter), Model và View đóng vai trò là nơi lữu trữ dự liệu và hiện thị. Trong MVC người dùng sẽ tương tác với Controller với MVP View sẽ đảm nhận vai trò này và Presenter sẽ đóng vai trò là cầu nối gắn kết View và Model với nhau. Cách xây dựng này giúp cho việt testing trở nên dễ dàng hơn bởi việc tương tác với View sẽ thông qua một giao diện trung gian.

Vấn đề về trước mắt được giải quyết với việc Model, View với sự tương tác của người dùng và Presenter đều có thể đem đi test. Tuy nhiên một vấn đề mới nảy sinh đó là phần Presenter này quá cồng kềnh, nó phải bảo gồm hầu hết các logics của ứng dụng, và mô hình tiếp theo có cơ hội xuất hiện.

### 3. Mô hình MVVM

![](https://images.viblo.asia/d04e3c81-1099-4c39-90d6-4fbedf58ab92.png)

Mô hình MVVM(Model-View-ModelView) được ra đời vào năm 2005 bởi John Gosman-một kĩ sư phần mềm của Micrrosoft. Mô hình này gồm ba phần chính riêng rẽ với nhau: 
* Phần Model chứa các thông tin quan trọng, các đường dẫn, object, dữ liệu truyền dẫn của object, entity, proxy,.. của phần mềm.
* Phần View giống như MVC và MVP chính là tất cả những gì người dùng thấy của phần mềm ,View lưu trữ tất cả các dữ liệu về hiện thị, ví dụ như trong iOS View chứa các table, cell, hiện thị của các view, Contrants, icons, image,..View chỉ có thể gửi các sự thay đổi trong hiện thị lên ViewModel bao gồm tất cả các tương tác với Model.
* ViewModel đóng vai trò như một cầu nối giữa View và Model. Mục đích chính của nó là xử lí các logic của View gửi đến và tương tác vơi Model bằng cách gọi đến các methods trong các class của Model. Sau đó ViewModel xử lí dữ liệu từ Model để View có thể dễ dàng sử dụng.

khả năng phân công khối lượng công việc của MVVM tốt hơn các mô hình trước, tuy nhiên vẫn khá cồng kềnh. Việc testing vẫn được ưu tiên như một công đoạn quan trọng để đảm bảo phần mề của bạn hoạt độgn đúng theo ý muốn. Mô hình tiếp theo là một mô hình mới và rất khác với các mô hình đã kể trên.

### 4. Mô hình VIPER

![](https://images.viblo.asia/d51ae0bf-7612-46a8-9c74-fcea9c155a4c.png)

Trong quá trình tìm kiếm giải pháp cho một mô hình hoàn hảo, "Clean Architechture"-"Kiến trúc sạch" đã xuất hiện trước các nhà phát triển iOS. "Clean Architecture" phân chia cấu trúc logic của ứng dụng thành nhiều phân tầng ,sự phân chia này đã giải quyết vấn đề "liên kết chặt chẽ với nhau" và cho phép việc testing từng phần dễ dàng hơn.

VIPER được bắt nguồn từ "Clean Architecture". VIPER(View-Interactor-Presenter-Entity-Rounting) được chia ra làm năm phần khác nhau và mỗi phần đảm nhiệm một vai trò:
* View có trách nhiệm ghi nhận lại các tương tác của người dùng. 
* Presenter nhận các thông tin về sự thay đổi từ Entity nhưng không trả về. 
* Interactor là phần hệ thống làm việc cùng với Entity. Khi được  thông báo về nhưng thay đổi ở View từ Presenter, Interactor liên hệ để nhận thông tin từ Entity và trả lại cho Presenter và Presenter sẽ thông báo cho View để thay đổi hiện thị cho người dùng.
* Entity bao gồm những thứ bên ngoài các object trong tầm kiểm soát của Ineractor ví dụ như các title, content,..Entity không trực tiếp tương tác vơi presenter mà thông qua Interactor.
* Routing (hay Wireframe) là phần chịu trách nhiệm cho các hành động thay đổi qua lai giữa các screen, view, window của ứng dụng

Bởi vì được phân chia rõ ràng nên việc testing với mô hình VIPER rất dễ dàng, điều mà các mô hình trước đó gặp không ít khó khăn đẻe giải quyết.

### Tổng kết

Có thể nói rằng cả bốn mô hình MVC, MVP, MVVM, VIPER đều nhưng mô hình có tính ứng dụng cao trong phát triển phần mềm iOS ,mặc dù không thể chối cãi mỗi mô hình có những vấn đề của nó:
* MVC,MVP,MVVM - Cả ba đều có một vấn đề là "Liên kết chặt chẽ" ,điều này gây khó khăn trong bước testing hay nâng cấp phát triển.
* VIPER mặc dù với nhiều lợi thế về mặt phát triển và thử nghiệm  nhưng vẫn có một số mặt phức tạp và khó để xây dựng.
Có thể không phải là giải pháp hoàn hảo nhưng một trong bốn mô hình trên có thể sẽ là nền tảng bạn muốn để xây dựng ứng dụng của mình trong tương lai.

### References
https://www.linkedin.com/pulse/understanding-difference-between-mvc-mvp-mvvm-design-rishabh-software

https://themindstudios.com/blog/mvp-vs-mvc-vs-mvvm-vs-viper/

https://stackoverflow.com/questions/667781/what-is-the-difference-between-mvc-and-mvvm