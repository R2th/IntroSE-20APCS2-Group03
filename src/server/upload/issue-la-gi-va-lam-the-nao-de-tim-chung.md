Trong quá trình kiểm thử, Tester cần thực hiện kiểm tra trên sản phẩm và báo cáo các sự cố và trục trặc mà họ sẽ gặp phải. Trong bài viết này, chúng ta sẽ tìm hiểu về các định nghĩa trên và liệt kê ra issues cần chú ý. Và bây giờ chúng ta hãy cùng nhau bắt đầu nhé!
# 1. Issue là gì?
* Issue là một hành vi không mong muốn hoặc trục trặc trong chức năng hoặc thiết kế của sản phẩm, cũng có thể là một lỗ hổng trong thiết kế hoặc bố cục của trang và nó cũng có thể là một lỗi trong nội dung của nó.
* Issue có thể tạo ra một thông báo lỗi khi chúng được sao chép. Issue có thể ngăn người dùng sử dụng chức năng hoặc tính năng của sản phẩm. Chúng ngăn người dùng tiếp tục sử dụng sản phẩm theo cách nó được dự định hoặc ngăn người dùng truy cập vào các phần của sản phẩm.
* Nhiệm vụ của Tester là xác định các vấn đề trên sản phẩm bằng cách thực hiện kiểm tra và cũng để báo cáo chúng về các chu kỳ kiểm tra.

 ![](https://images.viblo.asia/498080f0-4f7a-48a2-9172-9e962dba9706.png)
# 2. Kiểm thử là gì?
  * Kiểm thử được sử dụng để xác định trạng thái của sản phẩm, xem cách thức hoạt động của sản phẩm ở trạng thái hiện tại và báo cáo bất kỳ issues nào trên sản phẩm.

   * Trong các chu trình kiểm tra chức năng thủ công, Tester sẽ được yêu cầu sử dụng sản phẩm theo cách mà một người dùng trung bình sẽ làm. Tester sẽ bao gồm các phần của sản phẩm được đề cập trong phạm vi và kiểm tra các chức năng và tính năng khác nhau trên sản phẩm.

  * Tester cũng có thể tuân theo một hướng dẫn bổ sung kèm theo chu trình hoặc hoàn thành trường hợp kiểm tra bao gồm các hành động cụ thể và kết quả mong đợi của họ.

   ![](https://images.viblo.asia/12249417-ec17-47e2-a0da-77da7d693e3c.png)
  
#  3. Làm thế nào để kiểm tra?
  Trước khi bắt đầu kiểm tra, đảm bảo luôn luôn đọc phạm vi trong tổng quan dự án.
  Bạn luôn có thể khám phá các phương pháp mới và học hỏi từ những người thử nghiệm khác trong các chu kỳ thử nghiệm.
  
**Khám phá sản phẩm và sử dụng nó như một người dùng thông thường**

Tester sẽ được yêu cầu kiểm tra sản phẩm và báo cáo các sự cố có khả năng ảnh hưởng đến người dùng cũng sẽ sử dụng sản phẩm đó. 

Mỗi sản phẩm có một đối tượng người dùng sẽ sử dụng nó. Hãy thử tưởng tượng chính bạn là người dùng sẽ sử dụng sản phẩm này và các tính năng của nó.

Ví dụ : 

Ứng dụng trò chơi di động - Hãy vui vẻ trong khi hoàn thành các cấp độ và đọc hướng dẫn. Xác minh bạn có thể sử dụng các tính năng khác nhau mà trò chơi cung cấp.
![](https://images.viblo.asia/eceea74c-7029-444d-b293-13b90df69ade.png)

**Kinh nghiệm**

Sau khi tham gia vài chu kỳ kiểm thử, bạn sẽ thấy rằng nhiều trang web và ứng dụng có thể có các bộ phận và chức năng tương tự nhau. 

Bạn có thể quan sát các issues được báo cáo bởi những Tester khác và xem phần nào có thể đưa issues  tương tự vào sản phẩm tiếp theo mà bạn sẽ kiểm thử.

Ví dụ: 

Kiểm tra các liên kết trên trang web - Thật dễ dàng để thử và mở càng nhiều liên kết trên trang web càng tốt, ngay cả trước khi bạn quen thuộc với sản phẩm. Bạn có thể xem nếu một liên kết chuyển hướng đến một trang lỗi hoặc một trang sai và báo cáo nó. Bạn có thể cố gắng tìm kiếm một sơ đồ trang web, bao gồm hầu hết các liên kết đến các phần của trang web. 
![](https://images.viblo.asia/08c4a50d-531f-4972-8471-5339fae216ec.jpg)
# 4. Các loại issue
##   Functional
* **404 page not found**

     Lỗi này thường có nghĩa là bạn đã được chuyển hướng đến một trang không còn tồn tại trên trang web nữa. Vì trang web đang được thay đổi và cập nhật, điều này có thể xảy ra theo thời gian.
     ![](https://images.viblo.asia/4e91b84a-c4ac-4b8e-b3f8-ad1efa5e27d1.png)
* **Liên kết không chuyển hướng đến đúng trang**

   Một số liên kết trên trang web có thể chuyển hướng người dùng đến trang sai hoặc không hoạt động đúng. 
Nếu bạn gặp các liên kết khác nhau chuyển hướng đến cùng một trang, hãy kiểm tra xem trang bạn được chuyển hướng không bao gồm nội dung bạn đang tìm kiếm (ví dụ: trang trợ giúp có thể bao gồm Câu hỏi thường gặp và cũng có thể bao gồm thông tin liên hệ).
* **Một liên kết hoặc một email không được tô sáng và không thể nhấp vào**
  
  URL, Email và các liên kết khác thường được tô sáng và có thể nhấp.
  ![](https://images.viblo.asia/552da394-2cfa-40a1-97e0-642c1b512889.png)
* **Nút mất thời gian để phản ứng**

   Rất tốt để kiểm tra các nút phản ứng và hoạt động như mong đợi. Trong một số trường hợp, các nút sẽ mất thời gian để phản ứng hoặc sẽ dẫn đến một hành vi không mong muốn.
* **Sử dụng một tính năng tạo ra lỗi không mong muốn hoặc sai**

  Khi tìm kiếm các mục khác nhau hoặc điều hướng trong ứng dụng, có thể xảy ra các chức năng sẽ không hoạt động đúng và tạo ra lỗi hiển thị cho người dùng. 
   
   Bạn có thể báo cáo issue nếu lỗi không rõ ràng và không mô tả lý do tại sao chức năng không hoạt động.
![](https://images.viblo.asia/9da46a19-407a-4c99-81e9-d5065aa17e60.jpg)
* **Điều hướng qua lại**

   Trong một số trường hợp, trang web hoặc ứng dụng có thể không thể điều hướng trang trước hoặc trang tiếp theo đúng cách. 
   
   Bạn nên chú ý đến thanh địa chỉ URL trong khi điều hướng các trang, vì nó sẽ không đưa bạn trở lại trang trước nếu thanh URL không thay đổi.

* **Sai bộ lọc sắp xếp kết quả**

  Issue với các bộ lọc trên trang web: Hiển thị các mục không liên quan sau khi áp dụng một bộ lọc cụ thể. Sắp xếp các mục không sắp xếp chính xác (một mục không liên quan sẽ hiển thị giữa các mục được sắp xếp). Các mục không hiển thị sau khi nhấp vào bộ lọc rõ ràng.
![](https://images.viblo.asia/cee9fdbc-af63-44d9-bb1a-e214fa73293f.png)
* **Không thể xóa hoặc chỉnh sửa các mục trong giỏ hàng**

  Ví dụ: Nhấp vào nút xóa để làm mới trang, nhưng các mục vẫn ở trong giỏ hàng. 
  
  Ví dụ: Nhấp vào nút chỉnh sửa cho phép thay đổi số lượng mặt hàng của sản phẩm trong giỏ hàng. Sau khi áp dụng thay đổi, số tiền vẫn giữ nguyên.
  ![](https://images.viblo.asia/0746cb47-e766-4482-bb30-c0aa3a210eae.png)
* **Nút Like không hoạt động hoặc không hoạt động như mong đợi**
 
  Nhấp vào nút like hoạt động lần đầu tiên, nhưng ngừng hoạt động nếu cố gắng thích nhiều mục hơn. Hoặc nhấp vào nút thích không thêm các mục vào danh sách mong muốn.
  ![](https://images.viblo.asia/b0656e1a-8ad3-445d-abff-3c8fd07b3c20.png)
* **Một chức năng dự kiến vắng mặt trong sản phẩm**

    Thiếu một chức năng quan trọng hoặc một tính năng ngăn việc sử dụng các bộ phận của sản phẩm. 
Hoặc một mục được viết trên ứng dụng trong phạm vi, nhưng không thể tìm thấy khi thực hiện kiểm tra.
![](https://images.viblo.asia/ca52bd15-59f4-4baa-afe1-d1ed56740454.jpg)
## GUI
* **Thiếu hình ảnh**
 
     Thường rất dễ phát hiện nếu có một hình ảnh bị thiếu trên một trang - thường sẽ có một biểu tượng của một hình ảnh bị thiếu hoặc một văn bản xung quanh nó. Đôi khi trang sẽ có một khoảng trống giữa nội dung mà hình ảnh nên có.
     ![](https://images.viblo.asia/92b6b768-d57c-4fe6-9a3c-91ceec70e120.png)
* **Hình ảnh mờ**
    
    Bất kỳ yếu tố đồ họa hoặc hình ảnh nào trên trang web trông  không phù hợp với kích thước chính xác (một hình ảnh trong một nhóm nhỏ hơn nhiều so với các hình ảnh khác), hoặc hình ảnh mờ và nền (trong một số trường hợp hình ảnh mờ có thể được làm việc theo thiết kế).
    ![](https://images.viblo.asia/52a81e8d-de88-4187-9f78-d16e6e051fdc.png)
* **Các mục và thuộc tính không đúng**
  
  Xem các mục và hình ảnh trên trang được căn chỉnh như mong đợi. Sử dụng mức thu phóng phổ biến và kích thước độ phân giải màn hình để xác định các sự cố hợp lệ trên trang web (thu phóng 100%, độ phân giải trên 1024x768).
  ![](https://images.viblo.asia/c225419d-fa0d-474c-801a-20eab9b99af1.png)
* **Số lượng kết quả sai khi lọc**
     
     Các bộ lọc khác nhau thường hiển thị số lượng mục bạn sẽ thấy sau khi áp dụng chúng. Trong một số trường hợp, số tiền hiển thị trên bộ lọc và số tiền bạn sẽ thấy trong kết quả có thể khác nhau.
* **Nội dung bất ngờ có thể lặp lại**
    
    Đôi khi cùng một nút hoặc liên kết sẽ xuất hiện nhiều lần do nhầm lẫn hoặc bất ngờ.
    ![](https://images.viblo.asia/75179d34-aaf1-4d2c-9787-eb5b554b19db.png)
* **Nội dung**
    
    - Viết hoa sai.
    
    - Lặp lại các chữ cái không cần thiết.
    
    - Dịch sai một từ.
    
    - Bất kỳ sai lầm khác trong ngữ pháp hoặc văn bản.
    ![](https://images.viblo.asia/d780c315-e83d-474a-b39d-b3a6bd2a6429.png)
## Performance
* **Tải chậm hoặc kết nối kém**
    
    Một vài trang có thể bao gồm các tập lệnh sẽ khiến quá trình tải chậm hơn dự kiến ​​(hơn 10 giây). Trang web hoặc ứng dụng cũng có thể không tải nếu có sự cố trên máy chủ.
    ![](https://images.viblo.asia/73ae475b-0a08-4c18-9d3d-487a4a3f1304.png)
* **Giao diện hoặc chức năng chậm chạp**
    
    Một số chức năng hoặc tập lệnh trên trang web có thể gây ra giao diện chậm trong khi thử nghiệm. Tạm thời đóng băng trang web, ứng dụng hoặc một phần của nó. Thiếu các tính năng không thể tải.
    ![](https://images.viblo.asia/f7925d11-4f74-4e3d-a3ae-49a726a042ad.png)
## Crash
* **Application crash**
    
    Issue thường gặp khi kiểm tra ứng dụng hơn là kiểm tra trang web.
    
    Một hoặc nhiều điều sau đây có thể xảy ra khi gặp sự cố: ứng dụng sẽ đột ngột dừng hoặc khởi động lại, thiết bị sẽ bị đóng băng hoặc thông báo lỗi sẽ hiển thị ứng dụng đã bị hỏng.
    ![](https://images.viblo.asia/848fb000-d10d-4123-8e73-13cfd9a59943.png)
* **Trình duyệt đóng băng và tập lệnh dừng**
    
    Trong những trường hợp hiếm hoi trong khi điều hướng trang web và sử dụng các tính năng của trang, trang có thể dừng và không phản hồi. Ngay sau đó, bạn sẽ thấy một cửa sổ bật lên đề cập đến các kịch bản đã dừng lại.
    ![](https://images.viblo.asia/e3f3ba94-3745-4654-a2e8-7e6f092ed636.png)
    
    
    ***Bài viết tham khảo từ** : https://www.utest.com/articles/how-to-find-a-bug*