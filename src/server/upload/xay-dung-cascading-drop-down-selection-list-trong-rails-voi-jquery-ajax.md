## 1. Giới thiệu về Cascading Drop Down Selection List
Hiện nay, trong một Website, việc yêu cầu lúc người dùng chọn giá trị cho thuộc tính này sẽ dẫn đến chỉ có thể chọn một số giá trị cho thuộc tính khác có quan hệ với nó. 

***Ví dụ:***

Khi một người dùng điền form đăng ký tài khoản của một website, yêu cầu mình chọn Quốc gia và sau đó là chọn Thành phố tương ứng với quốc gia đó.

Khi điền thông tin chọn bác sỹ khám bệnh, người dùng sẽ chọn Khoa muốn khám, sau đó sẽ chọn những Bác sỹ thuộc Khoa vừa chọn...

Tóm lại, đó là việc khi mình chọn một số Category thì sau đó sẽ chọn  Sub-Category tương ứng với nó. Đó là việc tạo *Cascading Drop Down Selection List*, hay còn được gọi là *Related Drop Down fields*, *Dependent Drop Down lists* hay *Dynamic Drop Downs*.

![](https://images.viblo.asia/26d7c0b2-8d15-4b03-b550-3bc1f364f433.png)

![](https://images.viblo.asia/e78ad60f-6c4d-472c-8e8f-aef0f00a3333.png)

Trong thẻ `select`, bạn sẽ muốn các thuộc tính `value` được lưu và `name` được hiển thị để bạn có thể:

*a) Thay đổi hoặc sửa name*

*b) Hiển thị name theo ngôn ngữ khác nhưng giữ nguyên value*

Trước kia bạn có thể cho chúng chọn giá trị `value` đầu tiên và sang một trang mới để có các `value` liên quan, hoặc tải lại cả trang.  Điều đó sẽ được thay thế bằng *ajax*. Nhưng chúng ta vẫn cần phải làm một số thứ để mọi thứ nó có thể hoạt động. hãy băt đầu với ví dụ sau: 

## 2. Xây dựng Cascading Drop Down Selection List

Để đơn giản, bây giờ mình sẽ tạo ***Cascading Drop Down Selection List*** cho ***Section field*** và ***Sub-Section field*** sẽ phụ thuộc vào Section.
 
Bảng Section sẽ chứa `section_name` và `has_many :SubSections`

Bảng SubSection sẽ chứa `sub_section_name`, `section_id` và `belongs_to :Section`

Trong *galleries_controller*, chúng ta sẽ lấy được tất cả các `sub_sections`  thông qua `section_id` truyền vào trong params và trả về kết quả dưới dạng json.

```ruby
    def for_sectionid
      @subsections = SubSection.where("section_id = ?", params[:section_id]) 
      respond_to do |format|
        format.json  { render :json => @subsections }      
      end
     end
```

Chúng ta cũng sẽ cần mảng các giá trị của *Section* cho người dùng select, bạn có thể viết nó trong *helper*:

```ruby
def sections
    Section.pluck :section_name, :id
 end
```


Trong new hay edit view của *gallery*:

```ruby
<% form_for(@gallery) do |f| %>
...
  <p>
    <%= f.label :section %><br />     
    <%= f.select :section_id, sections,
          {}, class: "section_select" %>
  </p>
  <p>
    <%= f.label :sub_section %><br />     
    <%= f.select :sub_section_id, sub_sections,
          {}, class: "sub_section_select" %>
  </p>
..
<% end %>
```

Ok, điều chúng ta cần bây giờ là lấy được giá trị của `section_id` lúc người dùng select mà không cần load lại page. Hãy tham khảo đoạn code dưới đây:


```ruby
$(document).ready(function() {
  $('.section_select').change(function(){
    var id_value_string = $(this).val();
    if (id_value_string == '') {
      // if the id is empty remove all the sub_selection options from being selectable and do not do any ajax
      $('.sub_section_select option').remove();
      var row = '<option value=' + '0' + '>' + 'None' + '</option>';
      $(row).appendTo('.sub_section_select');
    }
    else {
      // Send the request and update sub category dropdown
      $.ajax({
        dataType: 'json',
        type: 'GET',
        url: '/appointments/for_section_id/' + id_value_string,
        error: function(XMLHttpRequest, errorTextStatus, error){
          alert('Failed to submit : ' + errorTextStatus.charAt(0).toUpperCase() + errorTextStatus.slice(1).toLowerCase() +' - ' + error);
        },
        success: function(data){
          // Clear all options from sub section select
          $('.sub_section_select option').remove();
          if (data.length === 0) {
            row = '<option value=' + '0' + '>' + 'None' + '</option>';
            $(row).appendTo('.sub_section_select');
          } else {
          // Fill sub section select
            $.each(data, function(i, sub_section){
              row = '<option value=' + sub_section.id + '>' + sub_section.sub_section_name + '</option>';
              $(row).appendTo('.sub_section_select');
            });
          }
        }
      });
    };
  });
});
```

Trong đoạn code trên chúng ta sẽ ghi nhận sự thay đổi của `section_select` với `section_id` được truyền vào `params[:section_id]` theo `url: '/appointments/for_section_id/' + id_value_string`. Nó sẽ gọi đến *galleries_controller*.

Để làm được điều này, chúng ta cần khai báo routes:

```ruby
resources :galleries do
      collection do
        get "/for_section_id/:section_id", to: "galleries#for_section_id"
      end
 end
```

Nếu ajax trả về thành công, chúng ta sẽ xoá những options của `sub_section_select` trước đó và thay thế bằng các `sub_section` tương ứng với *section* vừa được select.

Chúc các bạn vận dụng thành công Cascading Drop Down Selection List vào Website của mình.

## Link tài liệu tham khảo:


https://www.falsepositives.com/index.php/2010/05/28/building-a-casscading-drop-down-selection-list-for-ruby-on-rails-with-jquery-ajax/