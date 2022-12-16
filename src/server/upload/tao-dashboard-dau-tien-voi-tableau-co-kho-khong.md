Xin chào mọi người sau 3 bài trước mình có hướng dẫn về vẽ các chart cơ bản trong phần mềm Tableau thì ở bài viết ngày hôm nay mình sẽ hướng dẫn tạo Dashboard đầu tiên với Tableau. Thực chất việc tạo Dashboard cũng bao gồm các bước như lần trước chúng ta vẽ từng chart một trên từng trang sheet sau đó kết hợp lại để tạo được Dashboard theo yêu cầu. 

Let's started! ĐỪng quên **upvoted** cho mình nhé. Cảm ơn mọi người :D 

# Dashboard
## Dashboard là gì? 
Dashboard thực chất là một trang tổng hợp của nhiều worksheets (mình đã hướng dẫn ở các bài trước đây trong [series này](https://viblo.asia/s/tableau-cho-nguoi-moi-DVK2jD8vKLj)) và thông tin liên quan. Mục đích có thể so sánh và quan sát nhiều loại dữ liệu cùng một lúc, các biểu đồ khác nhau có thể cùng show cùng một lúc để chúng ta có thể dễ dàng quan sát cũng như so sánh với nhau. Để tạo được Dashboard chúng ta phải tạo các worksheets sau đó hiển thị nó ra ở dashboard vì vậy mỗi lần bạn thay đổi worksheet thì dashboard cũng được thay đổi. 
# Data 
Ở bài viết này mình vẫn tiếp tục dùng dữ liệu giống với 3 bài về Tableau mình đã viết trước đây. Dữ liệu down [tại đây ](https://drive.google.com/file/d/15ZegnGsPeWaTy7p3GMsogfJXUBVZ9etQ/view?usp=sharing)nhé mọi người. 

# Tạo Dashboard
Trong bài viết này mình sẽ thử tạo dashboard đơn giản về **Sale summary**, thật ra khá giống với một số biểu đồ mình đã từng vẽ trước đây bây giờ mình chỉ dựa vào đó rồi kết hợp lại thành một dashboard hoàn chỉnh hơn thôi. Tuy nhiên có thể có nhiều bạn chưa đọc các bài trước của mình ở [series này](https://viblo.asia/s/tableau-cho-nguoi-moi-DVK2jD8vKLj), nên ở bài viết này mình cũng sẽ hướng dẫn chi tiết để mọi người có thể dễ dàng thực hành được luôn nhé :D. Cùng bắt đầu thôi nào :D. 

## Tạo worksheet Summary 
Ở đây mình sẽ tạo bảng số liệu summary về số lượng customers và doanh số cũng như lợi nhuận thu được. Việc đầu tiên phải làm là tạo **calculated_field** về tỉ lệ lợi nhuận bằng cách lấy doanh số (Sales) trừ cho lợi nhuận (Profit). Sau đó tính số lượng customers.

Ratio profit Calculated_field

Công thức để tính **Ratio profit** cực kỳ đơn giản như dưới đây: 
```
Ratio profit = SUM(Profit)/SUM(Sales)
```

Hình 1: Cách tạo Ratio profit Calculated_field 

Number of customers:  

Hình 2: Tính số lượng customers

Tạo bảng: 
![](https://images.viblo.asia/4b61a60d-fdc0-4542-9b95-1c656996eb15.png)
Hình3: summary table 

Chúng ta sẽ tạo bảng số liệu giống như hình 1. Và mình sẽ hướng dẫn bằng cách tạo file gif như hình bên dưới để mọi người có thể thực hành theo nhé. Ở đây mình sử dụng 3 trường dữ liệu là **Customer_name** để tính số lượng customers, **Sales** , **Profit**, và Ratio profit được tạo như ở trên.  Trong **Summary worksheet** mình sử dụng filter với các trường dữ liệu như: *Order Date, Country/Region, Category, Measure Names*. Với **Order Date** sử dụng filter theo năm,  **Country/Region, Category** filter all.

Mọi người xem video mình quay [tại đây](https://drive.google.com/file/d/1T-C-Z5YKoVrjtDunzYcNKFWoJjaKkzBX/view?usp=sharing) nhé :D. Do Viblo giới hạn dung lượng nên mình phải up lên driver 

## Tạo Trending worksheet

Ở đây mình sẽ sử dụng biểu đồ line để thể hiện được xu hướng của doanh số theo từng quý từ năm 2017 đến năm 2020. Để vẽ được biểu đồ này mình sử dụng hai trường dữ liệu là Order Date và Sales để xem xét trending doanh thu từng quý như thế nào theo thời gian.

![](https://images.viblo.asia/db236a3b-c99e-4776-868c-fb8caab60bfd.png)
Hình 4: trending worksheet 

Ở hình 4 mình đã vẽ biểu đồ thể hiện xu hướng của doanh số theo từng năm, nhìn vào biểu đồ thì chúng ta có thể nhận thấy được xu hướng tăng lên từ năm 2017 đến 2020. Ở hình gif bên dưới mình quay video lại từng bước làm sau đó chuyển qua file gif cho mọi người dễ theo dõi và thực hành theo. Để vẽ được biểu đồ này mình sử dụng 2 trường dữ liệu **Order Date** (order date này mình hiển thị theo từng quý của mỗi năm và **Sales**. 

Mọi người xem video mình quay [tại đây](https://drive.google.com/file/d/1zqVbGU6-28owFX7Zd9NDd2YJpXed2Iae/view?usp=sharing) nhé :D. Do Viblo giới hạn dung lượng nên mình phải up lên driver 


## Tạo Sales Per Sub-category worksheet

Để Dashboard được chi tiết hơn, chúng ta sẽ biểu diễn rõ ràng hơn ở doanh thu, lợi nhuận và tỉ lệ lợi nhuận trên từng ngành hàng Furniture, Office Supplies và Technology. 
![](https://images.viblo.asia/91090d16-c0f9-4a66-bcf4-a3adf52b83b8.png)
Hình 5: Sales Per Sub-category worksheet

Ở đây mình sử dụng các trường dữ liệu: **Category**,  **Sub-Category**, **Sales**, **Profit** và  **Ratio Profit** đã tạo Caculated_field ở trên.  Với **profit** và **Profit Ratio** thì màu đỏ thể hiện cho những giá trị lợi nhuận và tỉ lệ lợi nhuận bị âm, ví dụ như ở Furniture thì có Bookcases và Furnishings lợi nhuận âm nên tỷ lệ lợi nhuận cũng âm nốt. Bên cạnh đó ở Filters mình có sử dụng Filters theo **Countries** và **Category**. Như ở 2 mục trước thì với *Sales Per Sub-category worksheet* mình cũng có quay video và chuyển sang dạng file gif kèm theo bên dưới nhé mọi người ^^. 
Mọi người xem video mình quay [tại đây](https://drive.google.com/file/d/1zqVbGU6-28owFX7Zd9NDd2YJpXed2Iae/view?usp=sharing) nhé :D. Do Viblo giới hạn dung lượng nên mình phải up lên driver 

## Tạo Sale Summary Dashboard 
Sau khi đã hoàn thành 3 worksheets: * Summary,  Trending, Sales Per Sub-category*, chúng ta sẽ kết hợp 3 cái này lại để tạo thành Dashboard hoàn chỉnh như hình 6 dưới đây. 

![](https://images.viblo.asia/3471dff4-64ed-4a39-9a2a-10415343a2f4.png)
Hình6: Sales Summary Dashboard 

Để tạo được dashboard thì đầu tiên phải chỉnh kích thước của nó mà bạn muốn hiển thị ra mình chọn (1000x800). Sau khi tạo xong thì bạn thêm những worksheets muốn show lên :D. Ở đây mình chọn cả 3 cái luôn và sắp xếp như thế nào cho hợp lý và đẹp mắt nhất. Những worksheets bạn show ra thì nhớ chọn **Fit -> Entire view** để đẹp mắt hơn nhé (hình 7). Mình thấy biểu đồ **Trend** thì chỉ cần hiển thị đường line là mọi người cũng đủ hiểu rồi vì mục đích là để xem xu hướng thôi nên sẽ bỏ đi hết những con số trông sẽ đẹp hơn =)).  Sau khi đã sắp xếp các worksheets một cách hợp lý, chúng ta sẽ show ra những cái filters như **Year of Order Date, Country/Region và Category** để dễ dàng theo dõi và lựa chọn thời điểm cũng như địa điểm mình muốn xem. 

![](https://images.viblo.asia/4002b51b-4e41-4edd-9738-223405efd664.png)
Hình7: tinh chỉnh Entire view 

Mọi người xem video mình quay [tại đây](https://drive.google.com/file/d/10--ETLNSAjNBmB4e2TW63WXrygjo85q4/view?usp=sharing) nhé :D. Do Viblo giới hạn dung lượng nên mình phải up lên driver 

# Kết Luận 
Cảm ơn mọi người đã đọc bài viết của mình, mình cũng đang trong quá trình tự học và tìm hiểu nên cũng rất mong nhận được sự góp ý của mọi người. Nếu có gì thắc mắc có thể bình luận ở dưới bài mình sẽ giải đáp ạ. Và đừng quên **Upvoted** cho mình nhé. 

# Reference 
https://www.tutorialspoint.com/tableau/tableau_dashboard.htm

https://help.tableau.com/current/pro/desktop/en-us/dashboards.htm

https://drive.google.com/drive/folders/1lW0in1FUck7h526g75gwoC2bavCcEcjk