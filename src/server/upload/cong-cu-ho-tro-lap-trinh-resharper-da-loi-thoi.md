# ReSharper là gì? 

ReSharper là một trong những bộ công cụ hỗ trợ lập trình khá mạnh trong tất cả các bộ công cụ do JetBrains phát hành cho developer. Cụ thể hơn nó là một Add-on cho Visual Studio, cũng như lời JetBrains đã nói, nó sẽ giúp Visual Studio trở nên tốt hơn rất nhiều.

# Tại sao lại sử dụng ReSharper?

Hồi mới ra trường thì việc ghi nhớ tất cả các cú pháp và code sao cho vừa nhanh vừa tối giản code thật là khó khăn. 
Thế thì bỗng một hôm thấy anh bạn ngồi cạnh xài cái tools gì mà thấy lỗi là nó đỏ lè lên, ấn vài thao tác là hết lỗi nhìn xịn xò phếch. Thế là mình hỏi cho ra và đc giới thiệu đó là resharper, bản có license luôn. Hồi đó xài resharper rất bực vụ khó kiếm license xài xong trial là phải nhịn hoặc chơi chiêu gỡ hết đi xài lại trial. 

Resharper giúp các Dev đã có thể an nhàn hơn với việc sửa lỗi cú pháp, định dạng code và cả các tính năng nhắc lệnh, tự động tạo hàm, rename… Thời đó mình khoái nhất trò mang code của người khác về đọc và nhờ resharper phát hiện ra rất nhiều chỗ chưa check null, hoặc là làm tối giản số dòng code đi kha khá, xong đi "khè lô" lại. Nhưng bao nhiêu đó là chưa đủ khi mà Resharper có thể mang đến cho bạn với “50+ refactorings and 350+ context actions“, đem đến bộ tính năng với “2000 on-the-fly code inspections” cho VS.

![](https://images.viblo.asia/086f6843-30f5-4a27-88f8-6c61811f634c.png)

![](https://images.viblo.asia/60d3067f-800c-4851-83a4-b29e910ebfeb.png)

# Điểm mạnh của ReSharper:
* Phân tích chất lượng code online.
* Tự động thay đổi code base.
* Loại bỏ các dòng code lỗi và code smells.
* Chuyển đổi mã nguồn, tìm kiếm và điều hướng tức thì.
* Hỗ trợ chỉnh sửa nhiều dòng code, sắp xếp mã nguồn và tài liệu.
* Giải quyết vấn đề hiệu suất và hao phí bộ nhớ.
* Tìm kiếm với tên file, folder, tên method, class mạnh mẽ.
* Nhắc lệnh, tìm reference, de-combine code.

# Điểm yếu của ReSharper:
* Nó rất nặng. Đây là điểm yếu chết người của resharper mà các dev khá là ức chế sau khi hứng khởi vì sự hữu dụng nó mang lại.
Nhiều khi các dev không hiểu vì sao máy mình hay visual studio mình lại khởi động chậm vậy. Nhìn status mới biết là nó đang loading thằng resharper này. Đây cũng là lí do mà những developer ngày càng xa lánh và dần bỏ resharper cũng một phần những IDE hiện nay cũng hộ trợ quá tốt.

* Đừng tin tất cả những gì Resharper nói, nhiều dòng code sẽ chỉ có Resharper mới hiểu nếu bạn cho phép ứng dụng này sửa code của bạn nó sẽ đẹp hơn, ngắn hơn những cực kỳ khó hiểu. Đúng vậy bạn cứ nghĩ resharper là công cụ phát hiện ra những dòng lệnh có thể refactor được và suggest cho bạn và việc có dùng hay không là ý kiến chủ quan của bạn. Vì thế hãy cân nhắc trước khi apply code từ resharper nhé.
* Rất dễ bị conflict các phím tắt với VS 2015. VS 2013 thì đỡ hơn nhiều. Cái này mình đã từng mắc phải, dùng resharper một thời gian bỗng nhiên sử dụng một máy khác không sử dụng resharper thì mình bị quen với phím tắt của resharper mà quên mất phím tắt mặc định của IDE gốc.
* Chú ý khi sử dụng tính tự động import hay add reference vì đôi khi Resharper sẽ add reference DLL chứ không phải project trong cùng solution.
* Một số công cụ thay thế ReSharper: CodeRush, JustCode, Visual Assistant X ...
![](https://images.viblo.asia/12501436-ab81-44ae-9d99-013ae10c6964.png)

![](https://images.viblo.asia/36a1da17-c2c7-4d5f-b4c7-739df9f03b7b.png)

# Tổng kết:
Thực ra mà nói ReSharper là một tools hỗ trợ cho anh em Dev tụi mình rất tốt nhưng mình phải biết cách sử dụng nó, đừng có lợi dụng quá sẽ tạo nên thói quen không tốt dẫn đến phụ thuộc để rồi không có nó mình sẽ không code được những cú pháp đấy. Đối với anh em Dev tay to rồi thì sử dụng ReSharper để tiết kiệm thời gian, còn với những anh em mới vào nghề thì mình nên tìm hiểu kĩ sau khi sử dụng ReSharper đã thay đổi code của chúng ta như thế nào, phải hiểu chứ đừng để phụ thuộc.

Bài viết tham khảo từ nguồn: 

https://www.jetbrains.com/resharper/

https://phamtuantech.com/cong-cu-ho-tro-lap-trinh-tot-nhat/?fbclid=IwAR14xoXRDuZUkWeZBSz42Sm2y4ThgjZubr3ZCOXaz-iMFlexRBwUvQBYniM