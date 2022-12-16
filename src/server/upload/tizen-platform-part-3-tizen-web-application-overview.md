Như mọi người đã biết, Tizen có 2 loại ứng dụng chính đó là tizen native và tizen web (ngoài ra còn có thêm tizen .NET), trong 2 loại chính thì tizen native được viết bằng ngôn ngữ C khá phức tạp nên tạm thời mình chưa có thời gian nghiên cứu, phạm vi của bài viết ngày hôm nay xin được giới thiệu với mọi người cấu trúc cơ bản của một ứng dụng tizen web như thế nào.

### Introduction
Ứng dụng tizen web được xây dựng dựa trên hầu hết những tiêu chuẩn của việc xây dựng và biểu diễn một trang web, bao gồm HTML, CSS và JavaScript.

![](https://images.viblo.asia/f002a838-8ffc-45ef-b1c8-7e057804d340.png)

Sử dụng phương pháp tiếp cận này có một lợi thế rất lớn, nó là một cách tuyệt vời để bắt đầu một ứng dụng tizen, một số lợi ích có thể kể đến như:
* Dễ học, đối với những developer có background là web thì không phải nói, đến những developer vốn chuyên android sử dụng java và kotlin như mình cũng có thể dễ dàng tiếp cận, bởi vì cơ bản css, html hay js đều rất dễ học (tất nhiên để nắm rõ bản chất thì lại không hề dễ dàng).
* Có thể xây dựng ứng dụng cross-platform trên cả di động, thiết bị đeo tay, smart tv …
* Dễ dàng maintain.

Tuy nhiên, bên cạnh đó, điều này cũng đem đến một số giới hạn so với một ứng dụng native, đó là hiệu suất của ứng dụng không cao, phải nói là thấp, và một điều quan trọng nữa là khi xây dựng một ứng dụng web, việc truy cập tới một số chức năng của thiết bị sẽ bị hạn chế, điều ảnh gây ảnh hưởng không nhỏ cho những ứng dụng cần thiết phải làm việc với camera, cảm biến …

### Creating Tizen Web Project

Mở Tizen Studio, File → new → tizen project 

![](https://images.viblo.asia/f457f9fd-5aed-4cb3-86ef-d5a840f03659.png)

Ở màn hình này, có 2 lựa chọn là tạo mới một ứng dụng (Template) hoặc là sử dụng một mẫu ví dụ (Sample)

![](https://images.viblo.asia/8e399d15-ea36-4124-841c-f256dd217abf.png)


Ở màn hình tiếp theo, chúng ta có thể lựa chọn platform để phát triển ứng dụng của mình, có 3 platform chính đó là thiết bị di động, thiết bị đeo tay và tv, ngoài ra còn có môi trường phát triển trên các thiết bị IoT và các thiết bị gia dụng khác.

![](https://images.viblo.asia/ef1aaf6c-5d3b-4ab9-a7f9-b06e098f9d8b.png)

Yeah ở đây là màn hình chọn loại ứng dụng, có thể chọn native hoặc web, series này mình tập trung chủ yếu vào ứng dụng web nhé.

![](https://images.viblo.asia/018d5f7c-7d26-455e-8513-2a80a321b574.png)

Đây là cấu trúc ở bản của một ứng dụng tizen web, bao gồm các resource của CSS, Java Script, HTML và một file cấu hình (config.xml)
#### File config.xml

> là một tệp cấu hình định nghĩa triển khai chuẩn web cho một ứng dụng tizen web, nó sẽ quy định mọi thứ được yêu cầu khi cài đặt và khởi chạy ứng dụng

![](https://images.viblo.asia/082053ec-34c7-41cb-8cd4-5175e5995467.png)

trong tab Overview, chúng ta có một số trường như indentifier, tên của ứng dụng (name), phiên bản hiện tại (version), file .html khởi chạy đầu tiên (content) .. và rất nhiều các thông tin khác.

Ngoài tab overview ra, file config còn có 8 hoặc 9 tab khác (như tizen web thì không có tab widget)

* Overview: Định nghĩa và edit những thông tin chung, như là tên ứng dụng hay icon.
* Widget: Định nghĩa thông tin license và những thành phần UI được dùng.
* Feature: Xác định những phần mềm hay chức năng của phần cứng cần thiết.
* Privileges: Chỉ định những API hay nhóm API nào có thể truy cập và sử dụng.
* Policy: Yêu cầu quyền truy cập mạng khi cần phải sử dụng những nguồn tài nguyên mạng.
* Localization: Cung cấp việc hỗ trợ localization cho tên, mô tả và license của file config.xml.
* Preferences: Xác định một bộ tên- giá trị, có thể thêm vào hoặc lấy đi.
* Tizen: chỉnh sửa những thuộc tính của Tizen schema
* Source: Xem và chỉnh sửa code của file config.xml (na ná manifest của android studio ha)

#### Index.html 
> File chứa mã dành cho việc xây dựng giao diện của ứng dụng, sử dụng html

![](https://images.viblo.asia/d8046ea7-7234-408b-85c0-6ab20a032c91.png)

#### css/*.css 
> Thư mục bao gồm source code để xây dựng layout và style cho giao diện, tưởng tượng html giống như bộ xương còn css giống như là lớp da bên ngoài vậy, bao nhiêu đẹp đẽ là nằm ở phần này đây,

![](https://images.viblo.asia/3ab26fbc-765a-4062-adc9-73fc117b4edf.png)
 

#### js/main.js
> đây là phần chính chứa code dành cho việc xử lý những chức năng của ứng dụng, sử dụng ngôn ngữ Java Scipt

![](https://images.viblo.asia/3b3c1b52-d1ed-43e5-88b5-1613935b1287.png)

### Conclusion 

Tóm tắt lại các thành phần của một ứng dụng tizen web sẽ quan hệ với nhau như hình bên dưới

![](https://images.viblo.asia/806a9d76-b865-44c5-8bd8-2a030e360188.png)

Hy vọng sau bài viết này, các bạn sẽ hiểu rõ hơn về các thành phần cấu tạo nên một ứng dụng tizen web, cũng không có gì phức tạp đúng không ? hẹn gặp lại các bạn ở những bài viết sau.

have fun !