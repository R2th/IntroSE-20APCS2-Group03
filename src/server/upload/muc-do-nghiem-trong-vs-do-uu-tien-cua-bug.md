Trong kiểm thử phần mềm, hai khái niệm Độ ưu tiên (Priority) và Mức độ nghiêm trọng (Severity) cũng không quá xa lạ, đặc biệt là trong quản lý bug. Hai khái niệm trên đã trở nên quá quen thuộc và phổ biến đến nỗi chúng ta hầu như không phân biệt được ý nghĩa cũng như sự khác nhau giữa hai khái niệm đó. Mặc dù hai yếu tố này không phải là yếu tố sống còn trong quản lý bug nhưng việc hiểu đúng sẽ giúp chúng ta tiết kiệm thời gian cũng như làm công việc hiệu quả hơn.

## 1. Mức độ nghiêm trọng
![](https://images.viblo.asia/75e4e316-cf32-4803-9295-218085ea8b3e.png)
- Mức độ nghiêm trọng được định nghĩa là mức độ ảnh hưởng của bug đối với sự phát triển hoặc hoạt động của thành phần của ứng dụng  đang được kiểm thử.
- Mức độ ảnh hưởng của bug với chức năng hệ thống càng cao thì mức độ nghiêm trọng của nó càng cao.Tester thường là người xác định mức độ nghiêm trọng của bug.
## 2. Độ ưu tiên
![](https://images.viblo.asia/721bfc6a-45be-4849-9373-8cac4d02365c.jpg)
- Độ ưu tiên quyết định thứ tự các bug được giải quyết. Độ ưu tiên càng cao thì bug cần phải được sửa càng sớm càng tốt.
- Lỗi khiến toàn hệ thống không hoạt động thì sẽ có độ ưu tiên cao hơn những bug xảy ra tại các chức năng nhỏ.
## 3. Phân loại: Mức độ ưu tiên và Độ nghiêm trọng của lỗi
Trong kiểm thử, mức độ nghiêm trọng của bug được chia làm 4 mức độ:
* Critical: Lỗi làm chết hệ thống, không thể thực hiện bất kỳ thao tác gì với hệ thống.
* Major: Lỗi làm sập hệ thống, tuy nhiên, một số phần của hệ thống vẫn hoạt động.
* Medium: Một số hành vi không mong muốn của hệ thống, nhưng hệ thống vẫn hoạt động được.
* Low: Một số lỗi về chính tả, … không nghiêm trọng.

Mức độ ưu tiên của lỗi bao gồm 3 mức độ:
* Low: Lỗi là tác nhân gây khó chịu nhưng việc sửa chữa có thể được thực hiện sau khi lỗi nghiêm trọng hơn đã được khắc phục.
* Medium: Trong quá trình bình thường của các hoạt động phát triển phần mềm,lỗi nên được giải quyết. Nó có thể đợi cho đến khi release một phiên bản mới.
* High: Lỗi phải được giải quyết càng sớm càng tốt vì nó ảnh hưởng nghiêm trọng đến hệ thống và không thể được sử dụng cho đến khi được khắc phục.

Tips xác định mức độ nghiêm trọng và mức độ ưu tiên:
* Tần suất xuất hiện: Trong một số trường hợp ,nếu một bug nhỏ thường xảy ra, nó có thể nghiêm trọng hơn.
* Cô lập bug: Cô lập bug có thể giúp tìm ra mức độ nghiêm trọng của ảnh hưởng từ bug.

![](https://images.viblo.asia/52c8618c-94fa-4601-8c94-8a94dcbaa193.gif)

Mức độ nghiêm trọng vs Độ ưu tiên:

| Độ ưu tiên | Mức độ nghiêm trọng|
| -------- | -------- |
| - Quyết định thứ tự bug được fix	    | - Mức độ ảnh hưởng của bug với hệ thống |
| - 4 loại: Critical, High, Medium, Low     | - 4 loại: Critical, Major, Medium, Low  |
| - Liên quan đến lịch trình, kế hoạch	   | - Liên quan đến chức năng    |
| - Cho biết lỗi nào phải được fix sớm | 	- Cho thấy mức độ nghiêm trọng của lỗi lên chức năng của snar phẩm     |
| - Được quyết đinh bởi quản lý/ khách hàng  |	- QA sẽ quyết định     |
| - Quyết đinh bởi giá trị kinh tế	    |- Quyết định bởi chức năng      |
| - Giá trị chủ quan có thể thay đổi trong một khoảng thời gian phụ thuộc vào tình hình dự án	 | - Giá trị khách quan, ít thay đổi    |
| - Độ ưu tiên cao và độ nghiêm trọng thấp, lỗi nên được fix ngay lập tức   | - Độ nghiêm trọng cao và độ ưu tiên thấp , lỗi nên được fix nhưng không phải ngay lập tức   |
|- Dựa trên yêu cầu của khách hàng	 | - Dựa trên khía cạnh kỹ thuật của sản phẩm       |
|- Trong phase UAT, team phát triển sẽ fix bug dựa trên mức đọ ưu tiên	| - Trong phase SIT, team phát triển sẽ fix bug dựa trên mức độ nghiêm trọng , sau đó mới đến mức độ ưu tiên   |
## 4. Ví dụ về độ ưu tiên và mức độ nghiêm trọng:

![](https://images.viblo.asia/5309b155-e4db-4362-a107-51365bdd615a.png)

- **Ưu tiên cao và nghiêm trọng cao**: Một lỗi xảy ra trên các chức năng cơ bản của ứng dụng và sẽ không cho phép người dùng tiếp tục sử dụng hệ thống. Ví dụ: Khi khởi động một app mà app bị crash liên tục không thể khởi động được app đó, do vậy đây là ưu tiên cao và mức độ nghiêm trọng lỗi cao.

- **Ưu tiên cao và nghiêm trọng thấp**: Trên trang chủ của trang web của công ty lỗi chính tả trong tên của công ty chắc chắn là một vấn đề ưu tiên cao. Về chức năng nó không được phá vỡ bất cứ điều gì vì vậy mức độ nghiêm trọng là thấp nhưng làm ảnh hưởng xấu đến uy tín trang web của công ty. 

- **Mức độ nghiêm trọng cao và ưu tiên thấp**: Một lỗi xảy ra trên các chức năng của các ứng dụng (mà không có cách giải quyết khác) và sẽ không cho phép người dùng sử dụng các hệ thống nhưng trên nhấp chuột của liên kết mà hiếm khi được sử dụng bởi người dùng cuối.

- **Ưu tiên thấp và Mức độ nghiêm trọng thấp**: Bất kỳ vấn đề thẩm mỹ hoặc chính tả mà là trong một đoạn văn hay trong báo cáo (Không phải trên trang bìa, tiêu đề, tiêu đề)Ví dụ: Lỗi chính tả trong thông báo lỗi xác nhận như "You have registered success" thay vì phải viết success thì ta phải viết successfully.

## 5. Kết luận
- Khi log một bug, trách nhiệm của tester là xác định đúng mức độ nghiêm trọng của bug. Mức độ nghiêm trọng không chính xác, dẫn đến mức độ ưu tiên không chính xác sẽ ảnh hưởng rất lớn đến toàn bộ quy trình kiểm thử và cả chất lượng sản phẩm. Trong bài phỏng vấn vị trí tester, có rất nhiều câu hỏi liên quan đến mức độ nghiêm trọng và mức độ ưu tiên. Vì vậy, việc hiểu đúng về mức độ nghiêm trọng, độ ưu tiên của sản phẩm cho thấy chúng ta thực sự hiểu rõ và quan tâm đến chất lượng sản phẩm cũng như thể hiện sự chuyên nghiệp của một kỹ sư kiểm thử.


## References
https://www.guru99.com/defect-severity-in-software-testing.html