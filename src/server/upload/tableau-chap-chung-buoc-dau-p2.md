Xin chào mọi người, hôm nay mình sẽ tiếp tục viết tiếp về chủ đề tableau này như ở bài trước [Tableau chập chững bước đầu (p1)](https://viblo.asia/p/tableau-chap-chung-buoc-dau-gDVK2nAjKLj) Mình đã trình bày về ưu nhược điểm cũng như một số công dụng trong tableau thì ở bài viết này mình sẽ viết về việc thực hành các biểu đồ nhiều hơn. Tuy nhiên ở 2 buổi học gần đây mình có việc bận nên không thể join được nên mình vừa thực hành lại vừa tìm hiểu rồi viết bài này nè =)).

# Hierachy, Filter, Sort, Group, Parameters
## Sort
Khi bạn có sẵn dữ liệu bạn có thể dễ dàng sắp xếp theo yêu cầu hoặc ý muốn của bản thân theo thứ tự giảm dần, tăng dần hay phụ thuộc vào một trường dữ liệu khác, ... . Có rất nhiều cách để sort dữ liệu trong phần mềm tableau này. 
Như ví dụ ở dưới đây mình sắp xếp theo chiều tăng hoặc giảm dần của **profit** theo từng tháng: 

![](https://images.viblo.asia/599cf0fd-779a-4e14-92cb-1079a62a058d.png)
Hình 1: sort ngay trên thang công cụ 

![](https://images.viblo.asia/3f4f45e9-335f-4078-8c1b-ad20322b6ba7.png)
Hình 2: sort ở ngay trên chart

Ở đây các bạn có thể chọn sort theo thứ tự tăng hay giảm dần đều okie nhé :D. 

![](https://images.viblo.asia/c0b40289-4a4e-4374-983d-dcfe611f2a81.png)
Hình 3:Sort theo field 

Ở Hình 3 mình lựa chọn sort theo thứ tự tăng dần và sort theo profit của các mặt hàng thì kết quả sẽ được như dưới đây.
![](https://images.viblo.asia/aa62df5d-7826-4f70-adc2-1a552cecf34d.png)
Hình 4: kết quả 

**Profit** của 3 mặt hàng trên đã được sort theo thứ tự tăng dần ở hình 4 rồi nhé


## Filter 
Lọc là một phương pháp để kiểm soát dữ liệu nào mà người thực hiện trực quan hóa muốn phân tích, ví dụ Khi bạn muốn xem doanh số của 3 tháng  cuối năm của một mặt hàng, khi bạn muốn lọc bỏ đi những hàng mà dữ liệu bị thiếu, hoặc bạn muốn filter dữ liệu của mình thuộc khoảng từ bao nhiêu đến bao nhiêu,... . Với những công việc lọc này mà sử dụng code hay excel cũng đều khá là vất tuy nhiên Tableau cho phé bạn thêm hoặc chỉnh sửa bằng những thao tác cực kỳ đơn giản. Cùng theo dõi ví dụ dưới đây của mình nhé :D

![](https://images.viblo.asia/558f6bb6-7fad-4945-ba8b-b48c1267586a.png)
Hình 5: Hướng dẫn filter

![](https://images.viblo.asia/f880d121-14d6-4f64-b602-d6a2761f93a4.png)
Hình 6: hướng dẫn filter (2)

![](https://images.viblo.asia/2a72d95e-55ad-4600-974e-87371a9596c0.png)
Hình 7: hướng dẫn  filter (3)

Ở Hình 5, 6, 7 mình thực hiện filters doanh thu của các mặt hàng vào tháng cuối cùng của năm. Mọi người kéo **order date** vào filter sau đó chọn theo month rồi click vào tháng 12 :D.  Tuy nhiên mọi người có thể tùy ý lọc các trường khác bạn mong muốn nha :D

## Group
Cách tạo group mình đã hướng dẫn khá là chi tiết ở bài viết [Tableau chập chững bước đầu (p1)](https://viblo.asia/p/tableau-chap-chung-buoc-dau-gDVK2nAjKLj) nên mình sẽ không trình bày ở bài viết này nữa :D 
## Parameters 
Parameters là các giá trị global placehoder như number, date, string có thể thay thế bằng giá trị hằng số trong tính toán, lọc, line tham chiếu.
Cùng xem ví dụ tạo Parameters đơn giản nhé. 

![](https://images.viblo.asia/8ff018c3-d8fc-403e-9f44-2b8caa3be5fd.png)
Hình 8: Hướng dẫn tạo paramters 
![](https://images.viblo.asia/4bf73aa8-cbab-4a2f-b307-9c78ae980cb3.png)
Hình 9: Hướng dẫn tạo paramters (2)

![](https://images.viblo.asia/f6610218-ebd2-46ed-8af0-be4ecf755362.PNG)
Hình 10: Hướng dẫn tạo parameters (3)

Ở ví dụ hình 8,9, 10 mình lấy ví dụ mình muốn tạo riêng một parameters **category** là Office Supplies sau đó visualize ra doanh thu của mặt hàng này theo từng năm. 
## Hierachy
Hierachy (hệ thống phân cấp) cung cấp cho người thực hiện trực quan hóa cách để phân đoạn, sắp xếp thông tin thành từng cấp. Tableau thực hiện điều này bằng cách gán một giá trị cho từng loại dữ liệu. Hơn nữa điều này còn cho phép bạn có nhiều quyền kiểm soát hơn với những gì chúng ta nhìn thấy và tăng tính chính xác hơn của trữ quan hóa dữ liệu. 

![](https://images.viblo.asia/109f66fc-a19d-4222-89ec-4122600049e8.png)
Hình 11: Hướng dẫn Hierachy 

![](https://images.viblo.asia/2dbc942e-06ab-46cb-b1d8-19162274135c.png)
Hình 12: Hướng dẫn Hierachy 2

Ở 2 hình trên mình hướng dẫn tạo Hierachy,bạn có thể chọn một trường bất kỳ mà bạn mong muốn nhé.

Khi mà bạn không muốn dùng nữa thì xóa thoai. 

![](https://images.viblo.asia/cdd23615-6c31-4f41-bf1f-2123e8a70791.png)
Hình 13: xóa hierachy


Ở bài viết trước và phần đầu bài viết này mình show lý thuyết khá là nhiều vậy thì tiếp theo mình sẽ bắt tay vào visualize thôi nào :D .
# Bar Chart , Line Chart , Pie Chart 
## Bar chart (Biểu đồ dạng thanh)
Biểu đồ bar chart là loại biểu đồ thông dụng và phổ biến nhất, được dùng để so sánh giá trị của nhiều mục khác nhau bằng sự chênh lệch độ dài của các thanh bar. Hoặc được dùng để theo dõi sự khác nhau hay sự phát triển của một danh mục theo thời gian. 

Ở đây mình sẽ ví dụ về doanh số theo category và theo mỗi năm bằng biểu đồ bar. 
![](https://images.viblo.asia/b112b771-73d8-4741-b359-3ffdcbd19278.PNG)
hình: Doanh số theo category

Dưới đây là gif hướng dẫn chi tiết 

![](https://images.viblo.asia/b8f15a85-0678-4bfe-b4fc-609276b828f8.gif)
Hinh: Hình gif hướng dẫn

Ví  dụ 2: Mình vẽ biểu đồ doanh số theo **sub-category** và sort theo thứ tự giảm dần của doanh số. 
![](https://images.viblo.asia/926a9d1f-da11-4505-a9fc-ac69b13e937e.PNG)
Hình:   Doanh số theo sub-category
![](https://images.viblo.asia/35502368-df4d-400b-ad2a-cb1572d6000b.gif)
Hình: gif hướng dẫn
## Line chart (Biểu đồ đường) 
Biểu đồ đường cũng cực kỳ phổ biến trong trực quan hóa dữ liệu. Biểu đồ đường được dùng để trực quan hóa dữ liệu theo thời gian, khi số liệu của chúng ta nhiều hoặc liên tục.

Ví dụ 1: Lợi nhuận theo thời gian(theo tháng). Ở đây mình lựa chọn các trường (profit và order date(chọn theo tháng). 
![](https://images.viblo.asia/f73ceec9-b859-4e18-aa83-049b4b45c7f1.PNG)
Hình: lãi theo tháng
![](https://images.viblo.asia/40cf33ba-e9e6-488b-ab11-19f528bd42c0.gif)
Hình: Gif hướng dẫn chi tiết vẽ Line lãi theo tháng

 Ở hình trên bạn có thể nhìn thấy mình pick điểm có lợi nhuận cao nhất là 17885$ và điểm có lợi nhuận thấp nhất -3281$ ( âm luôn ý =)) ). và những vùng có màu càng xanh đậm thì lãi càng cao và ngược lại. 
 
 Ví dụ 2: Xu hướng doanh số theo tháng của các category. Các trường mình chọn ở đây bao gồm (sales, order date, category). 
 ![](https://images.viblo.asia/1edcfe6d-7a3b-475f-8b35-ef8a7018157f.PNG)
Hình: Doanh số theo tháng của các category 

![](https://images.viblo.asia/993adef7-a92b-445a-b994-507f752aae86.gif)

Hình: gif hướng dẫn doanh số theo tháng của category

##  Pie chart (biểu đồ tròn/ biểu đồ bánh)
Trông như miếng bánh pizza được chia nhỏ ra vậy =)). Biểu đồ này biểu thị dữ liệu dưới dạng từng phần của hình tròn với các kích thước, màu sắc khác nhau. Các phần được gán nhãn và số liệu tương ứng với mỗi phần cũng có thể hiển thị trong biểu đồ như mình mong muốn.

![](https://images.viblo.asia/d3900b14-e022-4bf0-807b-ff177d3440fa.PNG)
Hình : Doanh số của các Category năm 2020

![](https://images.viblo.asia/90f8aafe-d7a2-4666-a752-e2415e37866c.PNG)
Hình: tỷ trọng khách hàng theo từng vùng 
![](https://images.viblo.asia/22b1ac09-e11e-408f-a2ac-d078d72b2d15.gif)
Hình:  gif hướng dẫn tỷ trọng khách hàng theo từng vùng 

3 loại biểu đồ trên có lẽ khá quen thuộc khi chúng ta học môn Địa Lý nhỉ toàn ngồi nhận xét biểu đồ thoai. Hoặc đối với một số bạn thi Ielts cũng khá quen thuộc. ANW, just for fun. Mục đích của chúng ta là show biểu đồ để chúng ta show cho bản thân hoặc sếp của mình hiểu rõ hơn về dữ liệu minh đang có :D. 

# Bar&Bar, Bar&Line, Line&Line

## Bar&Bar 
Bar bar chart kết hợp để so sánh 2 trường dễ nhìn hơn. Ví dụ như mình so sánh giá doanh số và giá thực tế mà doanh nghiệp phải chi ra ( có nghĩa là cost chưa tính lãi) 
Trường Cost mình tạo từ ( Sales - Profit) . có hướng dẫn chi tiết ở hình gif nhé. 

![](https://images.viblo.asia/900e65be-4493-436e-92c2-8a136c8b1cb4.PNG)
Hình: bar&bar - cost và sales 
![](https://images.viblo.asia/0c59d603-132b-4ed1-892c-97a8129dbf84.gif)
Hình: gif hướng dẫn chi tiết bar&bar
## Bar&Line
Cũng với 2 trường Sales và Cost ở đây mình vẽ đường line với trường Sales để so sánh. 

![](https://images.viblo.asia/cdfb308c-e765-4ade-9333-c23dc6ae420f.PNG)
Hình: bar&line - cost và sales 

![](https://images.viblo.asia/40e1406a-6091-484e-93c0-0a7ac789e7fa.gif)
Hình: gif hướng dẫn chi tiết bar&line
## Line&Line
ở đây mình sử dụng 2 trường sales và profit.

![](https://images.viblo.asia/952fcb8b-b29b-43c4-b140-cc7727c9de01.PNG)
Hình: line&line sales và profit

![](https://images.viblo.asia/dba0d469-0645-43c2-879e-e4a944eeca6d.gif)
Hình: gif hướng dẫn chi tiết line&line

# Kết luận 
Ở Bài viết này mình đã nêu thêm một số khái niệm trong tableau cũng như giới thiệu cho mọi người một số biểu đồ đơn giản. Mình sẽ tiếp tục chia sẻ ở phần tiếp theo của bài viết này. Cảm ơn mọi người đã đọc nhớ Upvoted cho mình nha. 

# Reference 
https://public.tableau.com/profile/bsdinsight?fbclid=IwAR2ZGgxQBRhoNWIzuQW0_t5w3T98BqvvYWlJ4kaGVCtOIWVt-3V-imHbsuI#!/vizhome/TrainingOnlineTableauDay1-Course2/CbnTableauDay1


https://www.tutorialspoint.com/tableau/index.htm

https://help.tableau.com/current/pro/desktop/en-gb/qs_hierarchies.htm