Bài báo này liên quan đến việc tạo materializing views trong database.

![](https://images.viblo.asia/efa69089-57b2-4da1-9d87-f667d7011da2.png)

ảnh bên trên cho thấy mục đích của materializing views
Trước khi bắt đầu với materializing views, chúng ta tìm hiểu một chút về chúng

## What is a database view?

Một database view là một tập hợp các câu truy vấn, Các câu truy vấn này sẽ thực hiện bất cư khi nào view được gọi hoặc xuất hiện. Không giống như regular tables, View không chiếm bất cứ không gian lưu trữ vật lý nào trong hard disk của bạn nhứng schema của chúng và mọi thứ khác được lưu trữ trong system memory. Nó giúp cho việc tóm lược lại các bảng bên dưới và dễ dàng hơn cho lúc làm việc. Nó có thể được gọi như pseudo tables.

Một đoạn Quoted từ PostgerSQL documentation

```
Making liberal use of views is a key aspect of good SQL database design. Views allow you to encapsulate the details of the structure of your tables, which might change as your application evolves, behind consistent interfaces.

```

```
CREATE VIEW company_manager AS
SELECT id, name, email
FROM  companies
WHERE role='manager';
```
Và bây giờ access to managers

```
SELECT * FROM company_managers;
```

Sử dụng view nhiều hơn làm cho thiết kế database của bạn rõ ràng hơn. Nhưng ở đây chúng ta nói về Materializing views. Điều này sẽ dần đến một hiệu suất trực tiếp hơn.

## So what is a Materialized view?

Materializing view lần đầu tiên được giới thiệu bởi oracle. Nhưng bây giờ nó đã có trong hầu hết các hệ quản trị cơ sở dữ liệu như PostgreSQL, MicrosoftSQL server, IBM DB2, Sybase. Mysql không hỗi trợ native nhưng có các extension để hỗi trợ materializing view.

Materialized view còn được gọi là Matview. Nó là một hình thức của database view nó còn có kết quả trả về của các câu query. Điều này làm tăng tốc độ trả về kết quả bởi vì bây giờ chúng không phải query lại bất cứ câu truy vấn nào nữa như là việc nó đã hoàn toàn ở đây và được tính toán. Và dĩ nhiên có những trường hợp chúng ta không có được kết quả đó vì chúng ta cần nhiều thông tin về thời gian thực hơn. Nhưng trong khi tạo một bản report bạn có thể tạo một matview và sau đó refresh matview để nhận được các updated của reports.

Những thứ được note về matview là:

* Chỉ có thể đọc (pseudo-table)  vì vậy bạn không thể update nó
* Bạn cần refresh table để lấy dữ liệu mới nhất
* Trong khi refresh nó sẽ block các connection khác truy cập vào dữ liệu đang tồn tại của matview vì vậy bạn cần refresh bằng cách run concurrently

## So why use Materialized views in Rails?

* Chụp lại những điểm chung giữa việc dùng joins & filters
* Đẩy nhanh quá trình xử lý dữ liệu tử ruby sang database
* Cho phép filtering nhanh và trược tiếp các associations phức tạp hoặc calculation fields

## How do you use it in Rails?

Trong active record rất dễ dàng sử dụng nó trong đoạn code của chúng ta. Nhưng chúng ta cần một chút SQL. Trước tiên chúng ta tạo một migration để tạo một materialized views.

```
bundle exec rails g migration create_all_time_sales_mat_view
```
Trong file migration chúng ta thêm đoạn sql sau.

```
class CreateAllTimesSalesMatView < ActiveRecord::Migration
  def up
    execute <<-SQL
      CREATE MATERIALIZED VIEW all_time_sales_mat_view AS
        SELECT sum(amount) as total_sale,
        DATE_TRUNC('day', invoice_adte) as date_of_sale
      FROM sales
      GROUP BY DATE_TRUNC('day', invoice_adte)
    SQL
  end

  def down
    execute("DROP MATERIALIZED VIEW IF EXISTS all_time_sales_view")
  end
end
```
View đã được đọc một lần. Chúng ta có thể tao model cho nó 
app/models/all_time_sales_mat_view.rb
```
class AllTimeSalesMatView < ActiveRecord::Base
  self.table_name = 'all_time_sales_mat_view'

  def readonly?
    true
  end

  def self.refresh
    ActiveRecord::Base.connection.execute('REFRESH MATERIALIZED VIEW CONCURRENTLY all_time_sales_mat_view')
  end
end
```
Và bây giờ chúng ta select và query model bình thường.

```
AllTimeSalesMatView.select(:date_of_sale)
AllTimeSalesMatView.sum(:total_sale)
```

Chúng ta không thể thực hiện các hành động như create, update hoặc save. Nó chỉ đọc thôi
Tạo một bảng với tổng các record lên tới hàng triệu bản. Và đây là sự khác biệt của câu truy vấn 

```
Regular
       user     system      total        real
     (976.4ms)  0.020000   0.000000   0.020000 (  0.990258)
MatiView
     (2.3ms)    0.000000   0.010000   0.010000 (  0.012010)
```

Nhanh hơn gấp 10 lần

## Summarize

**Good Points**

* lấy dữ liệu nhanh hơn
* Bắt được điểm chung của joins và filters
* Đẩy nhanh quá trình xử lý từ ruby sang BD
* Cho phép filtering nhanh và trực tiếp các complex associations or calculation .fields

**Pain Points**

* Chúng ta cần phải viết sql để xử dụng chúng
* Chúng ta sử dụng nhiều ram và bộ nhớ hơn
* MatView chỉ có trên Postgres 9.3 trở về sau 
* Postgres 9.4 mới có refresh concurrently
* Không có được live data

## Tham khảo

https://redpanthers.co/materialized-views-caching-database-query/?utm_source=rubyweekly&utm_medium=email