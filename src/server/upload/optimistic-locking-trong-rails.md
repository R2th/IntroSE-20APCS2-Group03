*Optimistic Locking là một tính năng đã có từ lâu trong Rails, nhưng hiếm khi được áp dụng để tận dụng lợi thế của nó. Cùng xem tính năng này là gì và có thể áp dụng vào trường hợp nào.*

## Tổng quan
Bạn và một người bạn của bạn cùng lên kế hoạch cho một chuyến du lịch và lưu lại ở một ứng dụng web. Bạn đang chuẩn bị thay đổi một số địa điểm trong lịch trình, nhưng ngay trước khi bạn gửi đi, người bạn thân của bạn cũng có một vài thay đổi trong hành trình.
Optimistic Locking sẽ ngăn chặn những thay đổi của bạn, để bạn không vô tình ghi đè lên những gì người bạn thân của bạn vừa thay đổi.
Optimistic Locking thực sự đơn giản trong Rails, chúng ta chỉ cần thêm cột lock_version vào bảng mà chúng ta muốn kích hoạt khóa.
```
class AddLockingColumns < ActiveRecord::Migration
   def self.up
      add_column :destinations, :lock_version, :integer
   end

   def self.down
      remove_column :destinations, :lock_version
   end
end
```
Sau khi thêm cột lock_version, việc thực hiện cập nhập một model cùng một lúc sẽ gây ra lỗi 
```
ActiveRecord::StaleObjectErro
```

## Cho vào form edit
Suy xét thêm 1 tí. Bạn nhập những thay đổi vào form, rồi chạy vào bếp tiếp tục với nồi cá trong bếp. Trong lúc đó, người bạn thân của bạn thay đổi những điểm đến trong chuyến du lịch sắp tới và gửi đi. Sau đó vài giờ bạn quay lại và submit form của bạn, và thay đổi của bạn thành công ngon lành.
Điều này sảy ra vì lock_version được set từ database khi bạn khởi tạo model object. Action đúng mà chúng ta cần là bạn sẽ bị khóa khi edit form.
Cách tốt nhất để thực hiện điều này là thêm một hidden input cho trường lock_version. Sau đó, khi thực hiện submit form, nếu lock version đã được tăng lên kể từ khi người dùng truy cập vào nó, bản cập nhập sẽ không thành công và báo lỗi.
```
<%= form_for @destination do |form| %>
   <%= form.hidden_field :lock_version %>
   <%# ... other inputs %>
<% end %>
```
Ngoài ra, có thể tạo helper để tiện sử dụng hơn
```
module ActionView
   module Helpers
      module OptimisticLockingFormFor

         def self.included(base)
            base.alias_method_chain :form_for, :optimistic_locking
         end

         def form_for_with_optimistic_locking(record_or_name_or_array, *args, &amp;block)
            form_for_without_optimistic_locking(record_or_name_or_array, *args) do |form_with_locking|
               lock_form = form_with_locking.object &&
                  form_with_locking.object.respond_to?(:locking_enabled?) &&
                  form_with_locking.object.locking_enabled? &&
                  !form_with_locking.object.new_record?
               if lock_form
                  concat(content_tag(:div,
                     form_with_locking.hidden_field(form_with_locking.object.class.locking_column),
                     :style => 'margin:0;padding:0;display:inline').html_safe)
               end
               yield form_with_locking
            end
         end

      end
   end
end
```
Bây giờ thì bạn có thể điền form, rồi đi đâu tùy thích mà không cần lo lắng về việc bạn có ghi đè sự thay đổi của người bạn thân không.