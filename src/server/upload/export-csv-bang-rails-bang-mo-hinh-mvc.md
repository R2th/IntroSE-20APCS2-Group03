## Overview
Trong bài viết lần này tôi sẽ giới thiệu phương pháp Export CSV trên Rails và sẽ thực hiện nó một cách đơn giản trên mô hình MVC. 
## Tham khảo
[Export CSV sẽ dễ dàng hơn trên Rails 4](https://qiita.com/retosu/items/5bda7bd5a55c20fc89c0)

[Khi Export CSV nên đặt xử lý Export ở trong View liệu có dễ hiểu hơn? ](https://qiita.com/ichi_s/items/eddf29d62ac09f6f9133)

## Implement
Tạo một button Export CSV ở màn hình List User để Export danh sách người dùng.
## Model
Vì  trong phần này chỉ liên quan đến phần Export CSV nên không cần thiết phải thay đổi gì trong Model.
## View
Tôi sẽ viết xử lý Export CSV tại đây. 
```
require 'csv'

CSV.generate do |csv|
  csv_column_names = %w(Firstname Lastname Email)
  csv << csv_column_names
  @users.each do |user|
    csv_column_values = [
      user.firstname,
      user.lastname,
      user.email
    ]
    csv << csv_column_values
  end
end
```
### Thiết đặt Button
Tôi sẽ sử dụng Bootstrap để thiết kế button Export như bên dưới :
```
<%= link_to "CSV出力", users_path(format: :csv), class: "btn btn-primary" %>
```
## Controller
```
class UsersController < ApplicationController
  def index
    @users = User.all

    # format ごとに処理が必要であれば行う
    # respond_to do |format|
    #   format.html { /* html用処理 */ }
    #   format.csv { /* csv用処理 */ }
    # end
  end
end
```
## Thiết đặt tên File
Nếu cần thiết đặt tên File thì tôi sẽ xử lý ở trên Controller.
```
respond_to do |format|
  format.csv do
    send_data render_to_string, filename: "hoge.csv", type: :csv
  end
end
```
## Tổng kết
Như vậy trong bài viết này tôi đã giới thiệu một cách đơn giản Export CSV trên Rails. Hi vọng sẽ có ích cho các bạn.