Chào mọi người hôm nay mình sẽ share một bài viết thực chất cũng không liên quan gì lắm đến kỹ thuật mà nó đơn giản cũng chỉ là một phần mềm hỗ trợ dân kinh tế hoặc các bạn không biết code trong lĩnh vực phân tích dữ liệu phục vụ cho các dự án Bussiness. Phần mềm có tên là Tableau, mình tình cờ join vào Tableau Group và may mắn được tham gia khóa học của anh Sơn, a Sang dạy miễn phí cho mọi người về Tableau.  Mục đích mình viết bài này là vừa để takenote lại kiến thức hàng tuần mình được học vừa share cho những bạn không biết code python hay R muốn phân tích dữ liệu cùng tham khảo. 

Nếu bạn nào muốn dùng code để visualize dữ liệu thì có thể tham khảo các bài viết của mình đã từng chia sử[ tại đây](https://viblo.asia/u/Honganh). 

# 1. Tại sao lại là Tableau không phải là phần mềm khác?? 
Câu trả lời đơn giản là bởi vì mình đang được join khóa học về tableau =)))) . Tableau giúp chúng ta có thể xem và hiểu biết các dữ liệu mình đang có để đưa ra quyết định nhanh chóng kịp thời.

Bên cạnh đó Tableau có rất nhiều các ưu điểm:

![](https://images.viblo.asia/49716b16-55ff-47af-bf7c-67558f527e72.png)
Hình 1: Ưu điểm của Tableau

Dựa vào hình ảnh ở trên chúng ta cũng biết được những ưu điểm của Tableau: 

* Hình vẽ trực quan đẹp
* Thao tác dễ dàng, visualize bằng thao tác kéo thả, cũng dễ dàng tạo Darshboard
* Có thể xử lý một lượng lớn data
* Có thể kết hợp sử dụng cả code python và R
* Có nhiều phiên bản tableau có thể giúp người dùng dễ tiếp cận
- mobile
- desktop
- public 
* Dễ dàng publish và share
* Connect được với nhiều database như : MysSQL, Oracle, SparkSQL, ... với Tableau creator có thể kết nối hơn 80 loại vv

Nhược điểm của Tableau: 


* Không cung cấp tính năng tự động tạo schedule reports 
* Bảo mật dữ liệu
* Giá thành dùng bản Enterprise không rẻ. Đối với doanh nghiệp muốn sử dụng thì phải mua bản Enterprise để bảo đảm vấn đề bảo mật ...

# 2. Install 
Mọi người truy cập vào [link này ](https://www.tableau.com/products/desktop/download)để download và cài đặt Tableau. Nếu bạn là sinh viên bạn sẽ được sử dụng Tableau Desktop miễn phí 1 năm hay sao ý mình không rõ, mình không có nên mình dùng bản publish vì free tuy nhiên nếu bạn phân tích cho dữ liệu quan trọng thì nên dùng bản Desktop nhé (not free). 

# 3. Một số thuật ngữ
## Measures 
Measures chứa các con số, giá trị định tính mà bạn có thể đo được, là giá trị có thể tổng hợp. Ví dụ: Doanh thu, lãi suất, số lượng khách hàng,....
## Dimensions
Dimensions là các trường dữ liệu xác định độ chi tiết của dữ liệu mà Measures được tổng hợp(Aggregate). Ví dụ như: ngày tháng, dữ liệu địa lý, mã cửa hàng,... 
## Aggregate 
Bao gồm : Min, Max, Sum, Avg, Count, Countd (Count distinse) 
## Parameters
Là biến được tạo trong Tableau có thể thay đổi giá trị tuy nhiên  chỉ có duy nhất một giá trị duy nhất tại một thời điểm (constant value)  dùng để tính toán (calculation), làm bộ lọc (filter), giá trị tham chiếu(reference)
## Tạo calculated_field, group
Mình nhớ ở trong buổi thứ 2 của khóa học mọi người không biết tạo calculated_field, group như thế nào vì vậy mình sẽ hướng dẫn luôn ở đây nhé:

### Tạo group 
Ở đây mình sẽ lấy ví dụ về việc group lại các mặt hàng khác nhau(sub-category) có lãi suất âm(profit)  
![](https://images.viblo.asia/711c5e77-e49e-4233-ba4c-0dc4ada807e9.PNG)
Hình: bar chart profit , sub-category 
 Dựa vào hình trên chúng ta có thể nhìn thấy 3 mặt hàng: Tables, supplies, bookcases có lãi suất âm vì vậy mình sẽ ví dụ luôn về cách tạo group 3 mặt hàng này lại với nhau luôn.
 Click chuột phải vào sub-category --> create --> group --> nhấn **ctrl + 3 trường có tên như trên** ---> ok là xong . 
 ![](https://images.viblo.asia/fd2c888a-80a7-4e78-b35a-5e026aa67660.png)
Hình: Tạo group(2)

![](https://images.viblo.asia/5060c836-daca-4884-927a-a1b7f784ab49.PNG)
Hình: tạo group(3)

Done!

### Tạo calculated_field đơn giản

Tương tự như tạo group thì tạo calculated_field  cũng thực hiện tương tự:
 Click chuột phải vào profit --> create --> calculated_field --> phép tính mà bạn muốn thực hiện --> ok là xong
 ![](https://images.viblo.asia/88d1ce14-8a5f-4792-a4ab-4fdd6dd6b2e2.png)
Hình: tạo calculated_field (1)
![](https://images.viblo.asia/e7f87651-6001-41b3-a783-056b0c6a821f.PNG)
Hình: tạo calculated_field (2)
# 4. Thao tác trên Tableau
Khi bạn làm việc với tableau sẽ lặp đi lặp lại các bước như hình vẽ dưới đây: 

![](https://images.viblo.asia/fdde003f-672f-436e-9850-58eabe982886.PNG)
Hình 2: vòng tròn phân tích dữ liệu (nguồn: [tại đây](https://public.tableau.com/profile/bsdinsight?fbclid=IwAR0BKfC4CQTn1ckaj1dZmE1UObNVxzz1wBjNyOV4g-1Rh4LHMKaBLJ_XMpM#!/vizhome/TrainingOnlineTableauDay1-Course2-Finish_15981740467020/CbnTableauDay1)) 

![](https://images.viblo.asia/6ccecaf0-c22f-43be-a3ba-6d0e038107bf.PNG)
Hình 3: Giao diện của tableau public
## Import dữ liệu từ file excel vào 
Các bạn click vào dòng **Microsoft Excel** sau đó chọn file mà mình muốn import vào => click open: 
![](https://images.viblo.asia/28b028e8-5e88-45e2-9217-aca2d075861f.gif)

Khi bạn đã thêm dữ liệu vào rồi thì nó sẽ hiển thị Data source như dưới đây:
![](https://images.viblo.asia/21505b85-c997-4c83-828c-3a15e124a664.PNG)
Hình 4: sau khi thêm dữ liệu vào 

Bước tiếp theo là phá thôi =))) bạn mở sheet lên để vẽ đồ thị theo ý thích của mình bằng cách click vào**go to worksheet**.

![](https://images.viblo.asia/fa8acce5-610d-4aa8-b84e-ae334dbdb154.PNG)
Hình 5: giao diện worksheet 

## Tính năng
Trước khi thực hiện các thao tác **kéo, thả** chúng ta sẽ cùng xem một số tính năng hỗ trợ tận răng của Tableau =))). 

### Thẻ  Show me

Phải nói rằng đây là phần làm mình cảm thấy ấn tượng nhất bởi vì từ trước đến giờ khi vẽ biểu đồ visualize mình toàn phải tìm hiểu xem rằng dữ liệu của mình các trường đó như nào sau đó vẽ biểu đồ mình sẽ vẽ biểu đồ gì ở đây: barchat, linechart,....  Thực sự cũng mất thêm kha khá thời gian. Nhưng khi mình được nghe giới thiệu về Tableau trong khóa học mình ấn tượng nhất là cái **showme**. **Show me** xem xét các trường dữ liệu mà chúng ta chọn sau đó đưa ra gợi ý về các chart phù hợp có thể vẽ với dữ liệu đó và việc của chúng ta chỉ cần thích cái nào thì click vào cái đó cực kỳ easy luôn ( vì thế mình mới bảo là có một số tính năng hỗ trợ tận răng luôn).

Ví dụ: Ở đây mình thử lựa 2 trường **Customer_ID, Sales** như hình bên dưới. 

![](https://images.viblo.asia/e7fc79b0-82a4-482d-8b8b-c6d36e03118e.PNG)
Hình 6: ví dụ về tính năng showme 

Ở bên góc phải của hình 6 bạn có thấy xuất hiện chữ **show me** và ở bên dưới đó là các biểu đồ mà Tableau hỗ trợ, những chart mà chúng ta có thể click vào là những chart được gợi ý khi chọn lựa dữ liệu, ở đây khi đang cần biểu đồ nào cho báo cáo thì quẹo lựa rồi export ra thoai =)).

### Thẻ filter
Để lọc dữ liệu trong biểu đồ 
![](https://images.viblo.asia/603adac4-e96f-4800-85d6-d89f410bdaf1.PNG)
Hình 7: Thẻ filter

### Thẻ Marks
Sử dụng màu sắc (colors) , kích thước (size), hiển thị thông tin và văn bản (label), mức độ chi tiết của dữ liệu (detail), hiển thị thông tin khi rê chuột vào đối tượng (Tooltip). Khi bạn muốn dùng màu sắc để hiện thị mức độ doanh thu như thế nào thì nhớ nhấn tổ hợp phím **ctrl+sales** rồi kéo xuống vùng color nhé :D . 
![](https://images.viblo.asia/91b71bd3-c971-47a3-9b0a-c258267e0936.gif)
Hình 8: thẻ marks
### Thẻ Data source
Để quay trở lại nguồn dữ liệu cần xử lý.
**Continued....**
# Kết Luận
Bài viết này để giới thiệu về Tableau cũng là bài đầu tiên trong chuỗi series bài viết về Tableau của mình. Mục đích của mình cũng đã đề cập ở ban đầu là để cho những bạn không biết tí nào về code muốn theo đuổi ngành BA một cách dễ dàng nhất. Cũng như một cách để mình có thể học thêm được kiến thức mới và review lại 2 buổi mình được học khóa học Tableau online của a Sơn dạy free.

Vì vậy rất mong nhận được sự góp ý của mọi người ạ. Hẹn gặp lại mọi người ở bài viết sau  trong chuỗi series về Tableau của mình ^^.
# Reference 
https://public.tableau.com/profile/bsdinsight?fbclid=IwAR0BKfC4CQTn1ckaj1dZmE1UObNVxzz1wBjNyOV4g-1Rh4LHMKaBLJ_XMpM#!/vizhome/TrainingOnlineTableauDay1-Course2-Finish_15981740467020/CbnTableauDay1 

https://www.tableau.com/products/desktop/download

https://help.tableau.com/current/pro/desktop/en-us/sortgroup_groups_creating.htm