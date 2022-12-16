![](https://images.viblo.asia/c0997f79-d513-400a-95bb-db2dc5c93298.png)
# Tại sao cần biểu đồ trong một trang web?
Chỉ cần nêu ra một vài ưu điểm như 
- Dữ liệu trực quan giúp đỡ nhức đầu với những con số 
- Trình bày được nhiều thông tin mà chiếm ít khoảng trống trên trang web
- Một biểu đồ tốt cũng tăng cường các thiết kế tổng thể trang web của bạn
# Dùng gem chartkick để tạo các biểu đồ trong `Ruby on Rails ` có khó không? 
Cùng tìm hiểu qua cách cài đặt và sử dụng  `gem chartkick` để trả lời cho câu hỏi này nhớ
### Cài đặt :
- Bước 1 : Thêm dòng này vào Gemfile của ứng dụng: 
> ```
> `gem "chartkick"` 
> ```
- Bước 2 : Thêm 2 dòng này vào file  application.js:
> ```
> //= require Chart.bundle
> 
> //= require chartkick
> ```
> 
Vậy là đã sẵn sàng để sử dụng thư viện Chart.js để thêm những biểu đồ vào ứng dụng của chúng ta rồi
###  Sử dụng 
**Thử tạo một đường biểu đồ thể hiện số user được tạo theo ngày tạo xem thế nào.**

- thêm dòng này vào view:


> ```
> <%= line_chart User.group_by_day(:created_at).count %>
> ```
> 
- Và kết quả:

![](https://images.viblo.asia/349beba3-ac6e-4887-9017-193274bef4ca.png)

=> Với 1 dòng code 1 biểu đồ đẹp đã xuất hiện một cách thần kì trên view của bạn ! 

**Biểu đồ tròn thì sao ?**
- Để thể hiện tỉ lệ về  số lượng  các loại hương vị của Yogurt trong datbase của bạn 
- thêm dòng này vào view:
> ```
><%= pie_chart Yogurt.group(:flavor).count %>
> ```
> 
- Và kết quả:

![](https://images.viblo.asia/a8a1eace-9de1-479c-93a4-0aa17ef7bc13.png)

Sử dụng `gem "chartkick"`  có thể kết luận là vừa đơn giản vừa hiệu quả 

# Một vài biểu đồ khác với chỉ một dòng code ruby 
### **Column chart**
- Thể lượng số lượng Order được tạo theo từng tuần 

**code**
> ```
> <%= column_chart Order.group_by_day_of_week(:created_at, format: "%a").count %>
> ```
> 
**kết quả**

![](https://images.viblo.asia/d9e13a3b-9d5f-4190-a004-41407225f035.png)
### **Bar chart**

**code**
> ```
> <%= bar_chart Shirt.group(:size).sum(:price) %>
> ```
> 


**kết quả**

![](https://images.viblo.asia/f8f5aedb-51f6-4a02-9f2b-5eae8fe09aee.png)
### **Area chart**

**code**
> ```
> <%= area_chart Visit.group_by_minute(:created_at).maximum(:load_time) %>
> ```
> 
**kết quả**

![](https://images.viblo.asia/b0631347-a974-485e-8adc-499937c9c7f6.png)
### **Multiple series**

**code**
> ```
> <%= line_chart Feat.group(:goal_id).group_by_week(:created_at).count %>
> ```
> 

**kết quả**

![](https://images.viblo.asia/3f1a51ed-5f9e-413f-b173-eb40b7c3decb.png)


# Sử dụng chartkick hiệu quả hơn
### Trả về data dạng json từ `Controller` để giảm thời chờ tạo biểu đồ trong `View`
**Controller**
> ```
>  class ChartsController < ApplicationController
>   def completed_tasks
>     render json: Task.group_by_day(:completed_at).count
>   end
> end
> ```
> 
**View**
> ```
> <%= line_chart completed_tasks_charts_path %>
> ```
> 
**Riêng với dạng biểu đồ `Multiple series` ta thêm `.chart_json` vào cuối**
> ```
> render json: Task.group(:goal_id).group_by_day(:completed_at).count.chart_json
> ```
> 

# Tổng kết
Trên đây là một bài giới thiệu về `Chartkick` để vẽ biểu đồ trong Rails một gem sử dụng đơn giản và hiệu quả cho ứng dụng web mình !! 

### Nguồn tham khảo

https://www.chartkick.com/