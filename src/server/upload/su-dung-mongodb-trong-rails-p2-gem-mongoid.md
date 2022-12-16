1. Giới thiệu
2. Cài đặt mongoid
3. Truy vấn
4. Kết

# 1. Giới thiệu ?
- Mongoid là một Object-Document-Mapper (ODM) cho MongoDB được viết bằng Ruby. Nó được hình thành vào tháng 8 năm 2009 trong một buổi tiệc rượu whisky tại Oasis khét tiếng ở Florida, Hoa Kỳ bởi Durran Jordan .
- Mongoid cung cấp API cho Ruby developers, những người đã sử dụng Active Record hoặc Data Mapper.
 # 2. Cài đặt mongoid
- Bạn chỉ cần thêm gem mongoid vào Gemfile của bạn
```
gem "mongoid", "~> 4.0.0"
```
hoặc bạn có thể cài đặt thủ công
```
$ gem install mongoid
```
- Khả năng tương thích với phiên bản ruby:


| Ruby Version | 2.4.x | 2.6.x | 3.0.x |
| -------- | -------- | -------- | -------- |
| MRI 1.8.x     | No     | No     | No |
| MRI 2.0.x    | Yes     | Yes     | Yes |
| MRI 2.1.x     | Yes    | Yes     | Yes |
| MRI 2.2.x     | Yes     | Yes     | Yes |
| JRuby 1.7.x   |Yes|Yes|Yes |
 # 3. Truy vấn
 - Một trong những tính năng tuyệt vời nhất của MongoDB là khả năng thực hiện các truy vấn động và khá quen thuộc giống với active record query interface.
 - Một số truy vấn hay sử dụng:

| Operation | Mongoid | Moped |
| -------- | -------- | -------- |
| Criteria#count (Đếm số bản ghi trong document)| Band.where(name: "Photek").count     | collections[:bands].find(name: "Photek").count     |
| Criteria#distinct (Lấy danh sách các giá trị riêng biệt cho một trường duy nhất) | Band.where(:fans.gt => 100000).distinct(:name) | collections[:bands].find(fans: { "$gt" => 100000 }).distinct(:name) |
| Criteria#exists? (Kiểm tra document có tồn tại trong cơ sở dữ liệu không)| Band.exists? | collections[:bands].find.count |
| Criteria#find (Tìm kiếm một hoặc nhiều document theo id)| Band.find( "4baa56f1230048567300485c", "4baa56f1230048567300485d") |collections[:bands].find( { _id: { "$in" => [      "4baa56f1230048567300485c", "4baa56f1230048567300485d" ] } }) |
|Criteria#create (Tạo dữ liệu) | Band.where(name: "Photek").create | collections[:bands].insert(name: "Photek") | 
| Criteria#update (cập nhật dữ liệu)| Band.where(name: "Photek").update(label: "Mute") | collections[:bands].find( { name: "Photek" }).update({ "$set" => { label: "Mute" }}) |
|Criteria#destroy (Xóa dữ liệu) | Band.where(label: "Mute").destroy | collections[:bands].find(label: "Mute").remove_all|
 - Ngoài ra còn rất nhiều truy vấn hay ho mình hay dùng : Criteria#pluck, Criteria#any_of, Criteria#inc, Criteria#bit, Criteria#pop, Criteria#pull, Criteria#rename, Criteria#set.
 # 4. Kết luận
 Đây là những kiến thức mình tìm hiểu được về truy vấn khi sử dụng gem mongoid, ngoài ra các bạn có thể tham khảo thêm link dưới đây:
*  https://mongoid.github.io/old/en/mongoid/docs/querying.html