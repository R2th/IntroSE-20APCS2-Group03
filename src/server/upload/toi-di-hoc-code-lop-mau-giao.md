Chào mừng các bạn quay trở lại với blog [duthaho.com](https://duthaho.com).

Sau thời gian dài vắng mặt thì hôm nay mình sẽ kể cho các bạn về câu chuyện đi học code của mềnh. Cùng bắt đầu với lớp mẫu giáo nhé! 
Chắc ai khi bắt đầu cắp sách đến trường, việc đầu tiên phải học là làm sao để cho _vở sạch chữ đẹp_, vại mục đích bài viết hôm nay cũng bắt đầu với việc code như thế nào cho sạch, đẹp. Chúng ta sẽ cùng đi qua những code xấu như _cua bò sáng trăng_ và cách áp dụng good practices và design pattern vào để cho nó đẹp lên nhé!

Đây là code của mình khi bắt đầu tập tễnh đi học code
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/l9uvtx03i5_image.png)

Logic của hàm `Caculate` là cửa hàng của mình muốn tính tiền cho khách hàng sau khi đã trừ đi tiền giảm giá cho từng loại khách hàng.

Code trên dùng ngôn ngữ C#, mà lớp mẫu giáo toàn if với else chắc ai cũng hiểu rồi? Đúng là tài không đợi tuổi, mới vào nghề mà code đẹp, ngay hàng thẳng lối, chả có gì phải nói hết.

Nhưng thế dell nào tôi lại bị cô giáo _Thảo_ chửi *beep beep beep* xối xả, xin trình bày lại bằng ngôn ngữ IT cho nó mang tầm 4.0 một tí: **code của mày không dễ đọc 1 xíu nào (unreadable), khó sửa đổi (unmaintainable) và khó mà mở rộng được (unextendable), có quá nhiều bad practices và anti patterns**

Vại thì mình đã gặp những lỗi gì với đoạn code trên:
- Naming: nhìn sơ thì chúng ta có thể đoán hàm trên dùng để tính toán, có 3 tham số đầu vào là số lượng, loại, số năm và 1 output. Nhưng cụ thể là tính toán cái gì, số lượng của cái gì, có bao nhiêu loại và cách tính như thế nào thì chịu. Một khi muốn thay đổi công thức tính toán, sẽ phải đau đầu và **tốn thời gian** để đi tìm hiểu logic và sai sót là điều không thể tránh khỏi.
- Magic numbers: ví dụ ở đây thì param _type_ là loại tài khoản khách hàng, nhìn vào thì rõ ràng có 4 loại nhưng không biết các số 1, 2, 3, 4 có ý nghĩa gì, giờ mà sếp muốn tăng tiền giảm giá cho khách hàng VIP thì phải chạy đi hỏi xem VIP ở đây là số mấy. Rồi còn chưa kể các số 0.1, 0.5, 0.7 cái nồi gì đó nữa, đọc mà đau cả đầu.
- Not obvious bug: có thể gọi là lỗi không lường trước, giả sử bây giờ cửa hàng của mình có thêm 1 loại khách hàng mới (_type_ = 5), mà lại quên không update hàm `Calculate`, thế là họ mua hàng free luôn, f**k thèn nào code cái hàm trên.
- DRY: don't repeat yourself, đừng lặp lại code của bạn, ở ví dụ trên thì đoạn `amount - (0.1m * amount)` lặp lại tới 4 lần, mỗi lần muốn sửa 1 chỗ lại phải find/replace/copy/paste những chỗ tương tự và rất dễ sai sót.
- Multiple responsibilities: 1 class mà phải đảm nhiệm quá nhiều nhiệm vụ, đi ngược lại với nguyên lý Single Responsibility trong SOLID. Trong đoạn code trên, hàm `Calculate` care cả 3 nhiệm vụ: tính toán phần trăm theo số năm tham gia, tính toán số tiền theo loại khách hàng và lựa chọn thuật toán tính toán.

### Học, học nữa, học mãi
Giờ thì cùng cắp sách vở lên đi học nào

1. Naming:

Đổi lại tên hàm, biến, nhìn vào cái tên là biết nó là giề rồi, khỏi cần nói nhiều
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/2jbmc25fvs_image.png)

2. Magic numbers:

Dùng enum cho account status
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/amcjalk51p_image.png)
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/t9utwhfmvy_image.png)

3. Readable

Chúng ta nên chia nhỏ các tính toán logic ra nhiều line, ví dụ 1 line `priceAfterDiscount = (price - (0.1m * price)) - (discountForLoyaltyInPercentage * (price - (0.1m * price)));` thành
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/1um7u98m72_image.png)
Giờ code trông sáng sủa hơn chưa nào
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/r0hp0oqfw6_image.png)

4. Not obvious bug

Như mình đã nói ở trên, khi thêm vào một loại khách hàng mới thì hàm `Calculate` có vấn đề, vì trước đó mình không handle các trường hợp không mong muốn. Mình giải quyết vấn đề này bằng cách thêm `default` trong `switch case`. Khi có 1 loại khách hàng mới thêm vào thì sẽ throw exception (vì mình thích thế :D)
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/j92swug9bk_image.png)

5. Using constants

Chúng ta vẫn còn những con số vô cùng khó hiểu, mình sẽ đưa chúng vào Constants
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/pemeyw9jq3_image.png)

6. DRY

Move những đoạn code duplicate vào 1 chỗ để dùng chung, mình dùng Extensions trong C#
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/lvjc76yvos_image.png)
Nào cùng xem kết quả thôi
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/wsk557jls0_image.png)

7. Remove unnecessary code

Cuối cùng nhìn sơ qua 1 lượt thì vẫn còn 3 line code giống nhau, code càng ít thì chắc càng ít bug hơn rồi, rút gọn 1 tí nữa xem nào
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/8y6mbj6tra_image.png)

Vậy là chúng ta đã cùng nhau trải qua lớp học mẫu giáo đầy thử thách rồi, hy vọng với bài viết này, các bạn sẽ có cái nhìn đúng đắn hơn trong việc code đẹp, code sạch, để không phải nghe những tiếng *beep* bên tai nữa :v.

Hẹn gặp lại các bạn trong các lớp tiếp theo, đừng quên like và subscrible nhé!