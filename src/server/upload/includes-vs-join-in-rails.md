# Includes vs Join in Rails
  Hiện nay với hầu hết tất cả các dự án website lớn nhỏ đều có , tồn tại rất nhiều ràng buộc là rất nhiều mối quan hệ cơ sở dữ liệu. Với việc có rất nhiều mối quan hệ dẫn đến việc cải thiện hiệu suất performance gần như là bắt buộc đối với các developer .Để giải quyết vấn đề này Ruby on Rails cung cấp cho chúng ta hai phương pháp Active Record đó là : includes và joins.
## Sự khác nhau giữa includes và joins 
 Điều cần chú ý là khi sử dụng includes và joins thì cả hai đều có trường hợp sử dụng tối ưu Trong đó Includes sử dụng eager loading và Joins sử dụng lazy loading . Cả hai cách thức này đều rất mạnh mẽ nhưng rất dễ bị nhầm lẫn trong việc sử lý performance .
 ### Includes
 Đầu tiên chúng ta có thể tham khảo trong Ruby on Rails documentation về method **include** :
     
     *With includes, Active Record ensures that all of the specified associations are loaded using the minimum possible number of queries.*
     
   Nói cách khác, khi sử dụng **includes** truy vấn một bảng cho dữ liệu với một bảng được liên kết, cả hai bảng được nạp vào bộ nhớ, từ đó giảm số lượng truy vấn cơ sở dữ liệu cần thiết để truy xuất bất kỳ dữ liệu liên quan nào. Trong ví dụ bên dưới, chúng ta sẽ lấy ra tất cả các công ty có persons đang trong trạng thái active .
   
   ```
   @companies = Company.includes(:persons).where(:persons => { active: true } )
   
   @companies.each do |company|
     company.person.name
    end
   # sql
   2.2.0 :015 > Company.includes(:persons).where(persons: {active: true})
    SQL (6.7ms)  SELECT "companys"."id" AS t0_r0, "companys"."name" AS t0_r1, "companys"."created_at" AS t0_r2, "companys"."updated_at" AS t0_r3, "persons"."id" AS t1_r0, "persons"."name" AS t1_r1, "persons"."company_id" AS t1_r2, "persons"."created_at" AS t1_r3,        
    "persons"."updated_at" AS t1_r4 FROM "companys" LEFT OUTER JOIN "persons" ON "persons"."company_id" = "companys"."id" WHERE "persons"."active" = ?  [["active", true]]
   ```

- Khi sử dụng includes kết hợp với điều kiện của bảng references :
 Sẽ chỉ tạo ra một query với  *LEFT OUTER JOIN*
 Join trước rồi sau đó sẽ truy vấn theo điều kiện của bảng references

### Joins  
Khi lặp qua từng companies chúng ta sẽ thường phải truy vấn person name với một truy vấn sql riêng biệt cho mỗi lần lặp . Tuy nhiên khi sử dụng **include** nó đã nạp bảng person vào bộ nhớ vì vậy khối lệnh lặp này chỉ sử dụng một truy vấn đơn giản . Tuy nhiên có một vấn đề xảy ra khi chúng ta muốn truy vấn toàn bộ các company có person trong trạng thái active nhưng không muốn hiện thị bất kì thông tin nào của person . Việc lưu nạp bảng person vào bộ nhớ là điều không cần thiết khi đó là lúc chúng ta sử dụng **join** method .

```
@companies = Company.joins(:persons).where(:persons => { active: true } )  
@companies.each do |company| 
  company.name 
end
# sql
Company.joins(:persons).where(:persons => {active: true})
Company Load (0.6ms)  SELECT  `companys`.* FROM `companys` INNER JOIN `persons` ON `persons`.`company_id` = `companys`.`id` AND `persons`.`deleted_at` IS NULL WHERE `companys`.`deleted_at` IS NULL AND `person`.`active` = true
```
- Khi sử dụng joins:
  Sinh ra câu query sử dụng *INNER JOIN*
  Join có thể sinh ra những bản ghi giống nhau và bị lặp lại
##

Sử dụng lại ví dụ cũ bằng cách thay thế phương thức include thành join .  Phương thức join sử tải các truy vấn cơ sở dữ liệu bằng cách sử dụng các bảng liên kết , nhưng chỉ tải bảng Company vào bộ nhớ vì dữ liệu của bảng Person liên kết là không cần thiết. Vì thế nên khi chúng ta muốn sử dụng các dữ liệu của bảng Person thì cần thêm các câu truy vấn .

## Cải thiện hiệu năng
  Việc sử dụng hợp lý includes sẽ giúp làm giảm đi rất nhiều câu truy vấn cải thiện performance . Để hiểu rõ hơn vấn đề này chúng ta sẽ làm một ví dụ nhỏ . Đoạn mã sau đây sẽ dùng để truy vấn vào database 
  
  ```
  def index
     @shippings = Shipping.active.all
     
     respond_to do |format|
          format.html # index.html.erb
          format.json { render json: @shippings }
     end
 end
  ```
  ![](https://images.viblo.asia/f65e50d3-790c-4a59-af9f-c2b58e51fcbe.png)
  Đoạn mã trên truy vấn vào database và để lấy ra được giá trị của Shipping và các bảng quan hệ liên quan cần rất nhiều các câu query  . Với nhiều câu truy vấn như vậy sẽ trở thành gánh nặng về tài nguyên và đoạn mã trên có thời gian Active Record là **265.2ms** . Vì thế đối với việc cải thiện hiệu suất , tăng performance  trong ứng dụng của mình . Chúng ta có thể sử dụng method **includes** . Dưới đây là đoạn mã đã được sửa lại và sử dụng **includes** . 
  ```
  def index
     @shippings = Shipping.active.includes(:zones, :tiers).all
     
     respond_to do |format|
          format.html # index.html.erb
          format.json { render json: @shippings }
     end
 end
  ```
  Với việc sử dụng **includes** . Các câu query của bạn sẽ trông như thế này :
  ![](https://images.viblo.asia/2310d98a-9b70-41d4-83a4-1f98d7f7e53b.png)
  Nhìn vào đó ta có thể thấy được số lượng các câu query giảm đi rất nhiều. do đó làm giảm thời gian Active Record của ứng dụng xuống chỉ còn **2.8ms **
  # Kết luận
  
  Hy vọng bài viết này có thể giúp bạn có thể nhận ra được những ưu nhược điểm của hai method là includes và joins để tạo ra những ứng có khả năng mở rộng và hiệu năng cao . Thank for reading