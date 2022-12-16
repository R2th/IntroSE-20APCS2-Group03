# Mở đầu
Nếu bạn là lính mới ruby và muốn bắt đầu tìm hiểu về nested attributes, thì hãy tham khảo bài viết này nhé.
Nested attributes có ưu điểm gì mà đáng để chúng ta quan tâm như vậy.Thật ra nó là một tính năng cho phép chúng ta lưu hoặc update bản ghi này thông qua bản ghi khác (associated records). Nghe có vẻ lạ nhỉ, có thể tạo bản ghi này thông qua bản ghi khác, vậy hãy thử tìm hiểu nó hoạt động như thế nào nhé.
# Cách sử dụng
Mặc định trong rails thì nested atrributes updating được disable, do đó để sử dụng nó, bạn chỉ cần gọi lại nó với cú pháp: accepts_nested_attributes_for.
# Nested attributes với quan hệ has_many.
Mình sẽ lấy một ví dụ để các bạn có thể tiện theo dõi và dễ hiểu hơn nhé.
Mình sẽ có 1 bản companies và 1 bảng targets với quan hệ là company has_many :targets.
Bây giờ mình sẽ tạo targets khi tạo company. Mình sẽ bắt đầu sửu dụng nested attributes ở trường hợp này.
Như ở trên, chúng ta cần khai báo accepts_nested_attributes_for :targets trong model company.
```
 accepts_nested_attributes_for :targets
```

Đừng quên build targets ở controllers của company nhé.
```
@company = Company.new
@company.targets.build
```

Đã hoàn tất việc khai báo, công việc của chúng ta bây giờ là xử lý ngoài view như thế nào.
Đơn giản, chúng ta chỉ cần:

```
  <%= form_with model: @company, url: companies_path, method: :post,
    class: "agreement-edit__form mb-2", local: false do |company| %>%>
    <%= company.fields_for :targets do |target| %>
        <div class="agreement-form__target">
          <div class="form-group">
            <%= target.text_field :title, class: "agreement-edit__target-status agreement-edit__hidden-no-change" %>
            <%= target.text_field :content, placeholder: "株式、不動産に関する情報を提供するWEBサイトの開発・運営業務",
              class: "input input--text agreement-edit__content" %>
          </div>
        </div>
      <% end %>
  <% end %>        
```

 Có vẻ khá đơn giản phải không nào, và việc cuối cùng sau khi submit form lên đó là việc tạo dữ liệu theo mong muốn.
 Bạn chỉ cần permit params theo format sau:
   `params.require(:company).permit(:name, targets_attributes: [:id, :content, :status])`.
 Các bạn hãy cùng thử và kiểm tra kết quả nhé.
# Nested attributes với quan hệ has_one
   Giờ cũng ví dụ trên nhưng đổi lại sẽ là quan hệ has_one nhé.
   Đối với quan hệ has_one, mọi thử cũng khá tương tự như quan hệ has_many. Bạn chỉ cần để ý khi build target,đó là:
      `@company.build_agreement`.
   Bài viết này mình xin chia sẻ cho các bạn mới tìm hiểu về ruby và có ý định hoặc nhu cầu sử dụng về nested attributes.
   Chúc các bạn thành công!