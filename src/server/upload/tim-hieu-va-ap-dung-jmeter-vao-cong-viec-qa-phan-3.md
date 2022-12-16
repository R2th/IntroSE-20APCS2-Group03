# Tối ưu hóa 1 Testplan
Như đã giới thiệu ở [phần 2](https://viblo.asia/p/tim-hieu-va-ap-dung-jmeter-vao-cong-viec-qa-phan-2-maGK7DXDZj2) , chúng ta đã biết cách tạo 1 testplan với ví dụ ngữ cảnh trong JMeter thật đơn giản. Ở phần này chúng ta thử quay lại nhìn xem ở các bước trong phần 2 sẽ nhận thấy có khá nhiều bước lặp lại nhiều lần với các thông tin giống nhau, cụ thể trong ngữ cảnh mà chúng ta đưa ra chính là Server Name or IP và Protocol. Và trong thực tế mà QA gặp phải sẽ có vô số các bước lặp đi lặp lại khi kiểm thử một sản phẩm, và khi đó nếu làm theo các bước cơ bản trên, mỗi lần hệ thống test thay đổi server name dùng cho kiểm thử, lúc đó ta phải đi tìm và sửa ở vô số chỗ. Nếu thế, vô cùng mất thời gian và nhiều lúc việc chỉnh sửa như thế còn bị bỏ sót ở vài request. May mắn, JMeter đã tính trước điều này.

Theo đó, đối với HTTP Request, JMeter có hỗ trợ một cấu hình có tên là HTTP Request Defaults. Điều này cho phép chúng ta định nghĩa sẵn những giá trị mặc định được dùng cho tất cả HTTP Requests bằng cách mở **Thread Group → Add → Config Element → HTTP Request Defaults**.

![](https://images.viblo.asia/54a64c11-5626-4613-aa36-746d41842990.png)

Ở màn hình **HTTP Request Defaults** --> trường **Server Name or IP**, nhập *viblo.asia* và ở trường **Protocol** là *https*. 

![](https://images.viblo.asia/e5bafb3c-14bc-4ef8-a2b1-cd42839e6f70.png)

Tiếp đó quay lại các sample đã tạo ra và xóa các giá trị ở trường **Server name or IP** và **Protocol**. Chẳng hạn như ở sample Homepage:

![](https://images.viblo.asia/25dda108-2738-42a7-9438-3082ebc2b2f8.png)

Tiếp tục lặp lại việc xóa này ở các sample còn lại và nhớ lưu lại những gì đã thay đổi, sau đó run tesplan lại sau khi xóa. Kết quả vẫn run trôi chảy như cũ: 

![](https://images.viblo.asia/465bdc71-4d2a-485f-b280-03911b59b332.png)

Ngoài ra, nếu bạn muốn "chuyên nghiệp" hơn nữa bằng cách không khai báo tên domain trực tiếp như đã làm mà thay vào đó sẽ tạo 1 Config khác là **User Define Variables** để chứa 1 variable = **SITE** với giá trị = viblo.asia như bên dưới: 

![](https://images.viblo.asia/b5a780b5-afcb-4cb4-85b5-6b928cb436de.png)

Tiếp đến, bạn chỉ việc call SITE đã tạo trên vào config **HTTP Request Defaults** theo syntax **$SITE** như dưới:

![](https://images.viblo.asia/fb23eb2e-b9a1-43dd-938b-86b58982220b.png)

## User Define Variable

Ở trên, chúng ta đã tìm hiểu qua về cách tạo 1 config **User Define Variable** và cách sử dụng nó. Trong quá trình tiếp cận JMeter, mình thấy **User Define Variable** cực kỳ quan trọng vì thế quyết định đi sâu hơn về nó ở phần nhỏ này. Vì sao?

Dễ hiểu nhất là trong testplan mà tester lập ra, chắc chắn sẽ có những phần mà mình cần dùng chung cho toàn bộ dự án kiểm thử, như Server Name or IP, Port Number hay Protocol của HTTP Request. Chẳng hạn như testplan có thể chứa đến mấy nghìn HTTP Request với cùng thông tin như trên, và vào một ngày nào đó đội dự án chuyển môi trường với Tên server, tên Cổng mới .... Và ta phải rà soát và cập nhật lại toàn bộ mấy nghìn HTTP Request như thế. Giải pháp đặt ra là chúng ta cần một nơi mà có thể định nghĩa các thông tin dùng chung của 1 Testplan như thế. Và cách tốt nhất để làm nó là sử dụng User Define Variable. 

Ngoài cách mở **User Defined Variables** (**UDV**) bằng cách chọn **Add > Config Element > User Defined Variables** như trên, bạn còn có thể nhìn thấy nó dưới Testplan

![](https://images.viblo.asia/be130c44-5e19-42b8-a631-ef0844d2d713.png)

Giờ chúng ta sẽ cùng tìm hiểu bên trong element này gồm những gì và cách sử dụng nó:

* **Name**: Là tên của biến mà bạn sẽ dùng ở những chỗ khác. Syntax để call biến này trong JMeter có định dạng *${VARIABLE_NAME}*. 
* **Value**: Là giá trị tương ứng với biến mà mình đã khai báo ở cột **Name**. Nghĩa là toàn bộ biến *${VARIABLE_NAME}* sau này sẽ được thay thế bằng chính giá trị ở cột **Value** này.
* **Description**: Cột này chỉ có khi bạn tạo UDV độc lập bằng cách chọn **Add > Config Element > User Defined Variables**. Như tên gọi của nó, cột này có tác dụng mô tả tóm tắt về biến mà  ta đã khai báo.

Tiếp đến là một số lưu ý về UDV mà ta cần biết trong quá trình sử dụng nó:

* Tất cả các element nằm trong UDV của một testplan dù nằm ở vị trí nào đều được xử lý đầu tiên. Để tiện cho việc tìm kiếm và sử dụng, các UDV nên được để ở đầu Thread Group (bằng cách kéo thả nó lên vị trí đầu tiên trong testplan) hoặc có thể đặt ngay trong Test Plan. 
* Các UDV không nên được dùng cho các tính năng tạo ra các kết quả khác nhau mỗi lần chúng được gọi. Chỉ có kết quả của việc call chức năng đầu tiên sẽ được lưu lại trong biến đó. 
* Các UDV được xử lý theo thứ tự xuất hiện trong Testplan, từ trên xuống dưới. Theo đó, nếu các biến bị trùng lặp nhau thì giá trị cuối cùng sẽ được dùng và đè lên giá trị trước đó.

..............................................................

**Tài liệu tham khảo:** Chuỗi bài viết được tham khảo bằng cách dịch lại từ Guru99 và JMeterVN và có chỉnh sửa theo những gì mình vừa tìm hiểu và thực hành:

https://www.guru99.com/jmeter-element-reference.html
https://www.guru99.com/hands-on-with-jmeter-gui.html
https://jmetervn.com/2016/12/09/user-defined-variables/