## 1. Tổng quan về theo dõi lỗi

Theo dõi lỗi (*Defect tracking*) là một trong những khía cạnh quan trọng của vòng đời lỗi (*Defect life cycle*). Việc theo dõi này rất quan trọng vì team test sẽ log một số bug khi chỉ test một phần của hệ thống phần mềm tuy nhiên các lỗi đó chỉ thật sự gây ảnh hưởng đến hệ thống khi tiến hành test hệ thống phần mềm ở mức độ phức tạp. Trong trường hợp như vậy, việc quản lý các lỗi,  phân tích chúng để sửa chữa và close bug có thể là một việc khó khăn.


Trong quy trình theo dõi lỗi, khi tester log bug, ngoài việc mô tả cách tái hiện bug, tester cũng phải cung cấp một số thông tin phân loại để hỗ trợ phân loại lỗi được chính xác hơn. Điều này sẽ giúp cho quá trình theo dõi lỗi hiệu quả hơn.
- Hai tham số (parameters) chính tạo thành cơ sở của việc theo dõi và giải quyết lỗi hiệu quả là:
    + Mức độ ưu tiên của lỗi trong testing - Defect priority in testing.
    + Mức độ nghiêm trọng của lỗi trong testing - Defect severity in testing.
    
Hai khái niệm này thường bị nhầm lẫn với nhau, cả team test và team dev cũng thường bị nhầm lẫn khi sử dụng hai khái niệm này.
## 2. Mức độ nghiêm trọng và Mức độ ưu tiên của lỗi là gì?
- Theo định nghĩa tiếng Anh “***Mức độ ưu tiên***” - “***Priority***” được sử dụng để so sánh hai vật hoặc hai điều kiện, khi mà một vật/điều kiện phải quan tâm nhiều hơn những vật/điều kiện khác và phải được giải quyết trước khi chuyển sang (những) vật/điều kiện tiếp theo. Do đó trong bối cảnh bug/defect, ưu tiên của một bug sẽ cho thấy mức độ khẩn cấp mà nó cần phải được sửa chữa.
- “***Mức độ nghiêm trọng***” - “***Severity***” trong định nghĩa tiếng Anh được sử dụng để mô tả sự nghiêm trọng của một sự cố không mong muốn. Do đó khi nói đến bug/defect, mức độ nghiêm trọng của một bug sẽ cho biết tác động của nó lên hệ thống.

**2.1. Ai sẽ là người định nghĩa mức độ ưu tiên và mức độ nghiêm trọng cho bug/defect?**

QA/ Tester sẽ là người phân loại bug/defect theo mức độ nghiêm trọng dựa trên độ phức tạp của các bug.
Bất kỳ các bên liên quan bao gồm người quản lý dự án, nhà phân tích kinh doanh, chủ sở hữu sản phẩm đều được quyền xác định mức độ ưu tiên của các bug.
![](https://images.viblo.asia/c3fbd64c-9dc0-43a0-b9a5-868cc68f70ed.png)

*Hình 1. Vai trò của người quyết định và mức độ nghiêm trọng của các bug/defect.*

**2.2. Làm thế nào để xác định các mức độ đó?**

Như đã nói, thông số “*Mức độ nghiêm trọng*” được đánh giá bởi tester trong khi thông số “*Mức độ ưu tiên*” chủ yếu được đánh giá bởi Product Manager hoặc nhóm phân loại cơ bản. Trong trường hợp này, mức độ nghiêm trọng của một bug chắc chắn là một trong những yếu tố ảnh hưởng đến việc đánh giá mức độ ưu tiên lỗi. Do đó, điều quan trọng là tester phải xác định mức độ nghiêm trọng phù hợp với từng bug để tránh gây sự nhầm lẫn với team dev.
## 3.Sự khác nhau giữa mức độ nghiêm trọng (Severity) và mức độ ưu tiên (Priority)


| **Độ ưu tiên** | **Độ nghiêm trọng** | 
| -------- | -------- | 
| Được định nghĩa là thứ tự lỗi mà dev nên giải quyết     | Được định nghĩa là mức độ tác động mà lỗi ảnh hưởng đến chức năng của phần mềm/ hệ thống      | 
| Mức độ ưu tiên có ba loại: High, Medium, Low | Mức độ nghiêm trọng có 4 loại: Critical, Major, Minor/Moderate, Low| 
| Độ ưu tiên gắn liền với schedule     | Độ nghiêm trọng gắn liền với chức năng hoặc chất lượng     | 
| Độ ưu tiên cho biết khi nào lỗi sẽ được sửa chữa     | Độ nghiêm trọng cho biết mức độ nghiêm trọng của lỗi đối với chức năng, hệ thống     |
| Sẽ được quyết định trong cuộc họp/ trao đổi với khách hàng/manager     | QA/tester sẽ quyết định mức độ nghiêm trọng của lỗi     | 
| Được quyết định bởi mức độ ảnh hưởng đến việc kinh doanh của khách hàng     | Được quyết định bởi chức năng của hệ thống, phần mềm     | 
| Giá trị của độ ưu tiên mang tính chủ quan và nó có thể thay đổi tùy thuộc vào tình hình của dự án     | Giá trị của độ nghiêm trọng mang tính khách quan và hầu như không thay đổi trong suốt dự án     | 
| **Mức độ ưu tiên cao - Mức độ nghiêm trọng thấp** cho thấy, lỗi phải được khắc phục ngay lập tức nhưng lỗi không ảnh hưởng đến ứng dụng     | **Mức độ nghiêm trọng cao - Mức độ ưu tiên thấp** cho thấy lỗi phải được sửa nhưng không cần ưu tiên sửa ngay lập tức    | 
| Status được dựa trên yêu cầu của khách hàng    |  Status được dựa trên tính kỹ thuật của sản phẩm     | 
| Trong khi khách hàng test kiểm nghiệm ứng dụng/hệ thống team dev sẽ sửa lỗi dựa trên mức độ ưu tiên|  Trong thời gian kiểm tra tích hợp hệ thống, team dev sẽ fix các lỗi dựa trên mức độ nghiêm trọng sau đó và mức độ ưu tiên| 
## 4. Các loại “Mức độ ưu tiên”
**4.1. High**

Các chức năng chính hay toàn bộ chức năng của phần mềm không hoạt động được gây ảnh hưởng đến việc kinh doanh của khách hàng hoặc hệ thống. Các bug/defect ở trường hợp này cần được sửa trong vòng 24h sau khi phát hiện lỗi.

**4.2. Medium**

End-user có thể sử dụng các chức năng chính trên hệ thống/ phần mềm nhưng một số chức năng đôi khi không sử dụng được. Tuy nhiên đó là các chức năng phụ, ít được sử dụng. Các bug này sẽ được fix sau khi đã fix các bug có độ ưu tiên "High".

**4.3. Low**

Những bug hầu như không ảnh hưởng đến việc kinh doanh của khách hàng và trải nghiệm của người dùng đối với phần mềm/ứng dụng. Các bug này sẽ được fix sau khi đã xử lý, sửa chữa các lỗi có độ ưu tiên "High" và "Medium". 
## 5. Các loại “Mức độ nghiêm trọng” 
**5.1. Critical**

Lỗi này ngăn chặn hoặc cản trở việc thử nghiệm chức năng/sản phẩm hoặc người dùng không thể sử dụng được ứng dụng/ hệ thống sẽ được xếp vào mức độ nghiêm trọng 1.

*Ví dụ:* 
- Kiểm tra tính năng đăng nhập của một trang web. Khi người dùng đã điền thông tin đăng nhập và nhấp vào nút “Đăng nhập” -> Trang web bị treo, không có bất kỳ phản hồi nào với người dùng và người dùng không thể có bất kỳ thao tác nào với trang web. 
- Kiểm tra tính năng đăng nhập thông qua gmail. Sau khi đã nhập đúng tên và mật khẩu, thay vì đăng nhập, hệ thống sẽ bị treo hoặc có một thông báo lỗi cho người dùng. Đây là một nghiêm trọng vì lỗi này khiến toàn bộ ứng dụng không sử dụng được

**5.2. Major**
- Bất kỳ tính năng chính nào khi được implement nhưng không đáp ứng được yêu cầu sử dụng và tính năng hoạt động khác với dự kiến. Lỗi này sẽ được xếp vào mức độ nghiêm trọng 2.
- Hoặc một lỗi xảy ra khi chức năng hoạt động nhưng kết quả hoàn toàn không đúng với yêu cầu. 

*Ví dụ:* 
- Khi gửi mail, người dùng không được phép thêm nhiều người nhận trong phần CC/BCC, lỗi này được phân loại là lỗi Major vì đây là chức năng chính của ứng dụng nhưng nó lại không hoạt động bình thường.
- Các lỗi liên quan đến việc không đảm bảo được sự duy trì dữ liệu không chính xác (incorrect data [persistence](http://how.vndemy.com/background/881-thuat-ngu-persistence-su-ton-tai-lau-ben-cua-doi-tuong-du-lieu/)) , các vấn đề hác về dữ liệu hoặc các hành vi ứng dụng sai đều được xếp vào loại mức độ nghiêm trọng 2.

**5.3. Minor/Moderate**

Bất kỳ tính năng nào được implement nhưng không đáp ứng yêu cầu sử dụng và hoạt động khác với mong đợi nhưng có tác động không đáng kể hoặc không gây ảnh hưởng lớn đến ứng dụng/phần mềm, sẽ được phân loại theo mức độ nghiêm trọng 3.
Những lỗi ở mức độ này thường gây ảnh hưởng cho hệ thống phần mềm ở mức thấp nhất và ít ảnh hưởng đến trải nghiệm của người dùng.

*Ví dụ:*
 Khi tiến hành mua hàng online, thay vì người dùng chỉ cần click 1 lần để thêm sản phẩm thì khách hàng phải click 2 lần để thêm sản phẩm vào giỏ hàng.

**5.4. Low**

Các lỗi về layout, font-size, font casing hoặc lỗi chính tả sẽ được phân loại mức độ nghiêm trọng 4. Lỗi này thường sẽ không có tác động đến các chức năng của hệ thống/phần mềm. Tuy nhiên để hoàn chỉnh ứng dụng và tạo cho người dùng có sự trải nghiệm tốt nhất về sản phẩm của mình thì các lỗi này nên được sửa sau khi đã khắc phục, xử lý các vấn đề, lỗi nghiêm trọng.
### 6. Các mức độ khác nhau giữa “Severity” và “Priority” 
Mức độ ưu tiên và mức độ nghiêm trọng có một số phân loại hỗ trợ cho việc xác định cách xử lý lỗi. Cách phân loại ở mỗi công ty, dự án có thể lá khác nhau nhưng cơ bản sẽ có các loại sau:
- Mức độ ưu tiên cao, mức độ nghiêm trọng cao - “High priority, high severity”.
- Mức độ ưu tiên cao, mức độ nghiêm trọng thấp - “High priority, low severity”.
- Mức độ nghiêm trọng cao, mức độ ưu tiên thấp - “High severity, low priority”.
- Mức độ ưu tiên thấp, mức độ nghiêm trọng thấp - “Low priority, low severity”.
![](https://images.viblo.asia/5fe1f4d9-8b42-49a5-b8f0-9bf7bd13d10e.png)

*Hình 2. Phân loại các mức độ ưu tiên và mức độ nghiêm trọng.*

**6.1. Mức độ ưu tiên cao, mức độ nghiêm trọng cao - “High priority, high severity”.**

Lỗi xảy ra trên chức năng cơ bản của hệ thống, không cho phép người dùng tiếp tục sử dụng. Hoặc có sự cố trong workflow của hệ thống.

*Ví dụ:*

- Ứng dụng bị lỗi khi khởi động ứng dụng.
- Không tải được trang web của website.
- Website bị treo khi người dùng nhấp vào nút “Thanh toán” hoặc không thể thêm sản phẩm vào giỏ hàng.

**6.2. Mức độ ưu tiên cao, mức độ nghiêm trọng thấp - “High priority, low severity”.**

Tên công ty, logo của website/ ứng dụng, tên khách hàng hoặc bất cứ thông tin quan trọng nào bị sai. Về mặt chức năng, nó không ảnh hưởng đến chức năng của website/ứng dụng nên được xếp vào mức độ nghiêm trọng thấp. Nhưng nó sẽ gây ảnh hưởng xấu đến danh tiếng của website công ty vì thế nó được xếp loại mức ưu tiên cao và cần chỉnh sửa ngay. 

*Ví dụ:*
- Tên ứng dụng là Facy nhưng khi hiển thị trên app là Faci.
- Tên trang web là VIBLO nhưng khi public cho end-user lại hiển thị là VILO.

**6.3. Mức độ nghiêm trọng cao, mức độ ưu tiên thấp - “High severity, low priority”.**

Ứng dụng bị crash khi người dùng có những hành động khác với hành động thông thường hoặc những hành động không hợp lệ.

*Ví dụ:*
- Người dùng tab nhiều lần, liên tục vào nút like sản phẩm.
- Crash app bất cứ khi nào người dùng nhập 4 chữ số vào ô tuổi trong khi số chữ số tối đa có thể nhập là 3.

**6.4. Mức độ ưu tiên thấp, mức độ nghiêm trọng thấp - “Low priority, low severity”.**

Các lỗi xảy ra ảnh hưởng đến số ít khách hàng sử dụng ứng dụng, website.

*Ví dụ:* 
- Trang “Chính sách bảo mật” mất nhiều thời gian để tải. Vì ít người vào trang này nên vấn đề trang tải chậm không ảnh hưởng nhiều đến khách hàng.  
- Có sai khác về font-family hoặc font-size hoặc màu sắc trên ứng dụng.
## 7. Kết luận
Việc xác định mức độ nghiêm trọng và mức độ ưu tiên có thể khác nhau tùy thuộc vào từng dự án và tổ chức. Khi log bug, trách nhiệm của tester là gán và cập nhập mức độ ưu tiên và mức độ nghiêm trọng phù hợp cho từng lỗi. Tuy nhiên việc xác định mức độ quan trọng và mức độ ưu tiên sẽ được quyết định bởi khách hàng và các bên liên quan.

----------------------------------------------------------------------------------------------------------------------
*Link tham khảo:*

- https://www.softwaretestinghelp.com/how-to-set-defect-priority-and-severity-with-defect-triage-process/ 
- https://www.softwaretestingmaterial.com/what-is-the-difference-between-severity-and-priority-in-software-testing/#What_is_Severity
- https://www.guru99.com/defect-severity-in-software-testing.html
- http://tryqa.com/what-is-the-difference-between-severity-and-priority/