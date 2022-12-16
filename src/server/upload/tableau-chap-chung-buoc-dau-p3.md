Xin chào mọi người hôm này mình sẽ tiếp tục bài viết thứ 3 về **Tableau** trong series [Tableau cho người mới bắt đầu ](https://viblo.asia/s/tableau-cho-nguoi-moi-DVK2jD8vKLj), những bài viết trong series này được viết bởi mình - một đứa thích phân tích dữ liệu và tình cờ biết đến khóa học của anh Sơn và anh Đại trong  [ Tableau Group](https://www.facebook.com/groups/tableau.bsdgroup) mình khá là may mắn khi biết được đến khóa học này. Bình thường mình hay sử dụng python cũng như các package khác để visualize dữ liệu, tuy nhiên đối với các bạn kinh tế hay các bạn không có kiến thức lập trình thì Tableau là một lựa chọn tuyệt vời. Những ai chưa đọc 2 phần đầu của mình có thể tham khảo. 

[Tableau chập chững bước đầu (p1)](https://viblo.asia/p/tableau-chap-chung-buoc-dau-gDVK2nAjKLj)

[Tableau chập chững bước đầu (p2)](https://viblo.asia/p/tableau-chap-chung-buoc-dau-p2-Qbq5QQwJ5D8)


Nếu cảm thấy hay và hữu ích thì nhớ upvoted cho mình nhé. Chúng ta cùng bắt đầu thôi nào! Let's go :D

# Biểu đồ pareto 
## Biểu đồ pareto là gì? 
Pareto là một loại biểu đồ có bao gồm các cột và các đường thẳng trong đó các giá trị độc lập được biểu diễn bằng những hình cột có thứ tự thấp dần, còn các giá trị tổng tích lũy được biểu diễn bằng đường thẳng. Mục đích của biểu đồ này là tìm ra trong một nhóm các nguyên nhân đâu là nguyên nhân quan trọng nhất. Mọi người có thể tham khảo chi tiết tại [wiki này ](https://vi.wikipedia.org/wiki/Bi%E1%BB%83u_%C4%91%E1%BB%93_Pareto). Từ đây bạn có sự hiểu biết rõ ràng hơn về vấn đề mà doanh nghiệp đang gặp phải để tập trung ưu tiên giải quyết cũng góp phần tối ưu hóa về mặt chi phí cũng như thời gian. 

Biểu đồ này được Pareto – nhà kinh tế người Ý đưa ra đầu tiên, sau đó đã được Joseph Juran – một nhà chất lượng người Mỹ - áp dụng vào những năm 1950. Nguyên tắc Pareto dựa trên quy tắc “80 – 20”, có nghĩa là 80% ảnh hưởng của vấn đề do 20% các nguyên nhân chủ yếu. Mình lấy đoạn này từ [đây](https://bsdinsight.com/community/tableau/bieu-do-pareto/). Mình có đọc một số sách về nguyên lý 80-20 theo mình tìm hiểu được thì phân tích pareto này cũng sử dụng nguyên lý 80/20( nguyên lý pareto)  với ý tưởng là 80 % doanh số từ 20% khách hàng, hoặc là thực thi 20% công việc sẽ có 80% lợi ích của việc thực hiện toàn bộ công việc được sinh ra .... 

Nếu như biểu đồ pareto của bạn đang vẽ thể hiện gần như với quy nguyên lý 80/20 thì mô hình của bạn theo lý thuyết là đang ổn rồi đấy =)).  Trong Tableau bạn có thể áp dụng để vẽ biểu đồ Pareto một cách đơn giản hơn khi bạn đã có dữ liệu và từ biểu đồ pareto có thể xác định được nhóm khách hàng đem lại doanh thu/ lợi nhuận lớn nhất trong tập khách hàng, hoặc dòng sản phẩm mang lại biên lợi nhuận cao nhất để có chiến lược kinh doanh, marketing phù hợp mấy cái này mình chỉ biết lý thuyết thôi =))). Không lan man nữa chúng ta cùng vẽ biểu đồ thôi =)). 

Việc đầu tiên bạn muốn phân tích thì bạn phải biết cần phân tích cái gì :D  Ở đây mình vẽ pareto giữa 2 trường **customer Name** và **Sales**.
![](https://images.viblo.asia/1dd2f193-05f3-4b00-92ed-f83046d5b675.gif)
Hình :Hướng dẫn vẽ pareto

# Donut chart 
Ở bài trước mình đã hướng dẫ về pie chart, thực ra donut chart là một kiểu biến thể của pie chart chúng ta có thể dễ dàng tạo ra biểu đồ donut khi đã hoàn thành xong pie chart. Lí do tại sao lại biến thể ra donut chart cá nhân mình thấy chắc do là nó đẹp hơn và thú vị hơn, bên cạnh đó bạn có thể thêm được nhiều thông tin hơn vào khoảng trống bên trong biểu đồ donut giúp người xem nắm bắt thông tin dễ dàng hơn. Cùng theo dõi cách tạo biểu đồ donut bên dưới nhé :D 

![](https://images.viblo.asia/98635749-45ab-4fbe-9b0b-eb0ed8fe4ad6.gif)
Hình:Hướng dẫn vẽ donut chart
# Biểu đồ line&pie, Bar&pie
Đôi lúc mọi người muốn thể hiện nhiều thứ cùng một lúc nhưng không biết phải làm như thế nào thì cách kết hợp các biểu đồ lại với nhau cũng là một cách rất hay nó còn tăng thêm sự tò mò cho người xem hay tăng thêm sự hứng thú cho chính bản thân bạn khi cảm thấy bar chart, line chart, pie chart qúa nhàm chán =)). Mọi người có thể theo dõi cách combine các loại biểu đồ này lại với nhau như thế nào dựa vào [bài viết trước ](https://viblo.asia/p/tableau-chap-chung-buoc-dau-p2-Qbq5QQwJ5D8) và phần dưới đây của mình nhé :D. 

## Line & Pie
Đây là sự kết hợp giữa biểu đồ Line và biểu đồ Pie mục đích để chúng ta có thể vừa thấy được xu hướng của dữ liệu và tỉ lệ đóng góp của các yếu tố khác. Ở đây mình sẽ thực hiện vẽ biểu đồ Line & Pie thể hiện doanh thu dựa vào các mặt hàng từ năm 2017 đến năm 2020 ( Line chart sẽ cho ta thấy xu hướng doanh số từng năm như nào), đồng thời bên cạnh đó thể hiện tỉ lệ đóng góp vào doanh thu của 3 loại hàng: Furnitures, Office Supplies và Technology là bao nhiêu ( được thể hiện qua biểu đồ Pie). Cùng theo dõi ở bên dưới nhé. 

![](https://images.viblo.asia/91cc9eca-587b-4444-a57b-1123d3f72040.gif)
Hình: Hướng dẫn vẽ line & pie gif 
## Bar & Pie 
Biểu đồ Bar & Pie hay còn gọi là biểu đồ Lollipop, mọi người có thể tham khảo chi tiết tại [đây](https://www.tableau.com/about/blog/2017/1/viz-whiz-when-use-lollipop-chart-and-how-build-one-64267). Tương tự như biểu đồ Line & Pie thì biểu đồ Bar & Pie cũng là sự kết hợp giữa biểu đồ cột và biểu đồ tròn để cho chúng ta biết doanh thu hay một chỉ số nào đó theo từng tháng hay từng chi nhánh, ... và bên cạnh đó là tỉ lệ đóng góp của các yếu tố khác. Ví dụ trong dữ liệu mình đang có mình sẽ sử dụng để vẽ biểu đồ thể hiện doanh thu theo từng tháng sau đó dựa vào đó có thể xem xét rằng tháng nào kinh doanh hiệu quả hay mặt hàng nào trong từng tháng hay từng quý mang lại doanh thu nhiều nhất. 

![](https://images.viblo.asia/1b9e0693-b977-4c75-90bc-d3160c4d5e88.gif)
Hình:Hướng dẫn vẽ Bar&pie 
# Dumbbell chart

Dumbbell chart được xem như là DNA chart hoặc biểu đồ kết nối giữa các điểm là một dựa chọn để minh họa sự thay đổi giữa hai điểm dữ liệu. Giả sử khi chúng ta muốn thể hiện sự khác biệt về cost thực tế và doanh thu để thể hiện được lợi nhuận của chúng ta đang lãi hay lỗ, thì biểu đồ này cũng là một lựa chọn để biểu diễn sự thay đổi giữa 2 điểm dữ liệu này. Mình sẽ hướng dẫn cho các bạn chi tiết bên dưới nha.  
![](https://images.viblo.asia/937692d3-d713-4ceb-81cb-50392907a7cb.gif)
Hình: Hướng dẫn vẽ dumbbell chart
Ở hình trên bạn có thể thấy rằng những mặt hàng mà cos ở phía trước sale thì lãi suất đang bị âm( bị lỗ) và ngược lại.
# Grantt chart 

Grantt chart thường được sử dụng để biểu diễn một lịch trình của dự án hoặc để hiển thị thời gian của các sự kiện, hoạt động theo thời gian. 
![](https://images.viblo.asia/e1875b0b-c88d-4b3f-ab16-01965d932d80.gif)

Hình :Hướng dẫn vẽ Grantt chart 

Ở Hình trên  những cái nào độ dài càng lớn  thì thời gian giao hàng càng lâu, một số mặt hàng bán chạy nên cân nhắc để giao hàng nhanh hơn nếu có thể như vậy sẽ tăng doanh thu hơn....

# Kết luận 
Hi vọng bài viết này sẽ hữu ích với các bạn, mong nhận được sự góp ý từ mọi người và hẹn gặp lại ở phần tiếp theo. Cảm ơn mọi người đã đọc hết bài viết của mình ạ! 
# Reference 

https://public.tableau.com/profile/bsdinsight?fbclid=IwAR2ZGgxQBRhoNWIzuQW0_t5w3T98BqvvYWlJ4kaGVCtOIWVt-3V-imHbsuI#!/vizhome/TrainingOnlineTableauDay4Khoa2/Story1

https://vi.wikipedia.org/wiki/Bi%E1%BB%83u_%C4%91%E1%BB%93_Pareto

https://help.tableau.com/

https://www.tableau.com/about/blog/2017/1/viz-whiz-when-use-lollipop-chart-and-how-build-one-64267