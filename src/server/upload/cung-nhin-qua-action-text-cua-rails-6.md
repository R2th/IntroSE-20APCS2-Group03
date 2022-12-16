# Mở đầu

Rails 6 đã bước vào giai đoạn beta với phiên bản [v6.0.0.rc1](https://github.com/rails/rails/releases/tag/v6.0.0.rc1). RC là viết tắt của **R**elease **C**andidate, đây là phiên bản mà có xác suất trở thành final release rất cao. Ta có thể áp dụng nó vào dự án ngay kể từ bây giờ mà không cần lo sợ có những breaking change.

Nếu bạn sử dụng Docker, mình khuyên nên sử dụng ruby 2.6.3, vì trước đây mình đã dùng thử ruby:2.7.0-preview1-alpine3.10 thì khá nhiều lỗi khi up server, mà chả biết phải fix sao :sad:

Ở Rails 6, có khá nhiều tính năng mới hay ho:

* Action Text
* Parallel Testing
* Action Model custom error message format.
* vân vân mây mây...

Ở bài này, mình sẽ chỉ tập trung đề cập tới Action Text. Đây là một package giúp ta xây dựng WYSIWYG editor một cách nhanh chóng, hơn nữa, việc upload cũng được integrate với Active Storage.

**Chú ý:** Bài khá dài và embed nhiều code :v

# Cách dùng

## Cài đặt và sử dụng

Vì là Rails nên cách sử dụng rất đơn giản, nhưng ta sẽ chả biết nó chạy cái gì đằng sau cả =))

Cài đặt Action Text bằng CLI command sau:

```bash
rails action_text:install
```

Nhớ hãy chạy thêm cả command install Active Storage nữa.

```bash
rails active_storage:install
```

Để áp dụng cho field `content` của model `Post`, ta sẽ dùng tới macro `has_rich_text`

```ruby
class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :content
      t.string :category

      t.timestamps
    end
  end
end

```

`content` ở đây mình dùng string, nhưng khuyến khích dùng text hơn.

```ruby
class Post < ApplicationRecord
	has_rich_text :content
end
```

Trên form, ta chỉ việc dùng `rich_text_area`

```erb
<%= form_with(model: @post) do |form| %>
  <div class="field">
    <%= form.label :content %>
    <%= form.rich_text_area :content %>
  </div>
<% end %>
```

Khi permit params, ta cũng làm như bao field khác

```ruby

class PostsController < ApplicationController
  def post_params
    params.require(:post).permit(:category, :content)
  end
end
```

Cuối cùng ta hiển thị dữ liệu như sau:

```erb
<%= @post.content %>
```

Câu lệnh trên thực chất đang ngầm gọi tới `@post.content.to_s`

Đây là sản phẩm của ta:

Form tạo post với WYSIWYG editor - Sử dụng Trix editor, do Basecamp phát triển, cây nhà lá vườn luôn.

Có thể kéo thả file vào, file đó sẽ được upload bằng Active Storage.

![](https://images.viblo.asia/77b9bd23-5ba3-426b-b6fc-cac02edb0b42.png)

Hiển thị dữ liệu ở màn hình detail

![](https://images.viblo.asia/6b1b8da0-ca7f-468b-9705-444a8cb2d736.png)

Các bạn thấy sao? Cá nhân mình thấy xấu như cờ hó vậy =)) Tuy nhiên ta có thể styling cho nó.

## Styling

Rails đang có sẵn một vài style cơ bản cho nó trong file `app/assets/stylesheets/actiontext.scss`, ta có thể sửa nó để cho đẹp hơn.

Với đống tool của editor thì có thể dùng selector `.trix-button-row`

Với template attachment (như cái `monaco.ttf` ở trên), ta cũng có thể custom lại, Rails cung cấp sẵn template mặc định ở file `app/views/active_storage/blobs/_blob.html.erb`

# Tìm hiểu sự ma giáo

Rồi ta đã lướt qua cách sử dụng nó, nhưng mà có quá nhiều magic.

Liệu bạn có tự đặt ra những câu hỏi thế này hay không?

* Không biết cách lưu trữ dữ liệu của nó như thế nào?
* Làm sao mà cái file trong kia integrate được với Active Storage? 
* Vì sao lại có thể custom lại những attachment bằng template? 

* vân vân mây mây...

Ta sẽ bắt tay vào tìm hiểu nó. 

Hãy bắt đầu với `has_rich_text`

## Macro `has_rich_text`

```ruby
# https://github.com/rails/rails/blob/6a5c8b91998c56e50b5cc934d968947cd319f735/actiontext/lib/action_text/attribute.rb#L26
def has_rich_text(name)
  class_eval <<-CODE, __FILE__, __LINE__ + 1
    def #{name}
      rich_text_#{name} || build_rich_text_#{name}
    end
  
    def #{name}=(body)
      self.#{name}.body = body
    end
  CODE

  has_one :"rich_text_#{name}", -> { where(name: name) },
    class_name: "ActionText::RichText", as: :record, inverse_of: :record, autosave: true, dependent: :destroy
  # ... codes
end
```

Dễ dàng thấy rằng đây là 1 macro giúp định nghĩa getter, setter, và cả association `has_one :rich_text_...` với `ActionText::RichText`. 

Vậy thì khi ta gọi `@post.content`, thực chất là ta đang gọi tới `@post.rich_text_content`.

Và nó cũng chỉ ra 1 điều nữa là Rails dùng 1 bảng riêng để lưu lại đống rich text của ta.

Hãy dành chút thời gian nhìn vào thư mục `db/migrate`, ta sẽ thấy file sau:

```ruby
# db/migrate/20190718085159_create_action_text_tables.action_text.rb
# This migration comes from action_text (originally 20180528164100)
class CreateActionTextTables < ActiveRecord::Migration[6.0]
  def change
    create_table :action_text_rich_texts do |t|
      t.string     :name, null: false
      t.text       :body, size: :long
      t.references :record, null: false, polymorphic: true, index: false

      t.timestamps

      t.index [ :record_type, :record_id, :name ], name: "index_action_text_rich_texts_uniqueness", unique: true
    end
  end
end

```

Quả thật là vậy, `body` chính là nơi lưu trữ đống text của ta, còn `name`, `record_id`, và `record_type` là những attribute cho polymorphic association, khá quen thuộc nếu bạn đã dùng Active storage

Ta sẽ đi đến bước tiếp theo `rich_text_area`

## Rails xử lý, lưu trữ rich text như thế nào?

```ruby
# https://github.com/rails/rails/blob/cc1a5d5620c4cd952b27f6c1bbd16d8780a34d0e/actiontext/app/helpers/action_text/tag_helper.rb#L20
def rich_text_area_tag(name, value = nil, options = {})
  options = options.symbolize_keys

  options[:input] ||= "trix_input_#{ActionText::TagHelper.id += 1}"
  options[:class] ||= "trix-content"

  options[:data] ||= {}
  options[:data][:direct_upload_url] = main_app.rails_direct_uploads_url
  options[:data][:blob_url_template] = main_app.rails_service_blob_url(":signed_id", ":filename")

  editor_tag = content_tag("trix-editor", "", options)
  input_tag = hidden_field_tag(name, value, id: options[:input])

  input_tag + editor_tag
end
```

Có thể thấy đơn giản nó chỉ init cái trix editor cho ta thôi.

Việc kéo thả file, upload hoàn toàn được handle bởi trix editor, ta không custom được template sau khi file upload thành công. 

Tuy nhiên Action Text có thêm 1 callback sau khi file được upload thành công:

```javascript
// https://github.com/rails/rails/blob/cc1a5d5620c4cd952b27f6c1bbd16d8780a34d0e/actiontext/app/javascript/actiontext/attachment_upload.js#L26
this.attachment.setAttributes({
  sgid: attributes.attachable_sgid,
  url: this.createBlobUrl(attributes.signed_id, attributes.filename)
})
```

đây là 1 step rất quan trọng, nhưng ta sẽ chưa cần chú ý tới nó vội. Attachment của ta sau khi upload thành công sẽ trông như sau:

```html
<figure contenteditable="false" data-trix-attachment="{&quot;contentType&quot;:&quot;application/zip&quot;,&quot;filename&quot;:&quot;monaco.ttf-master.zip&quot;,&quot;filesize&quot;:88996,&quot;sgid&quot;:&quot;BAh7CEkiCGdpZAY6BkVUSSIvZ2lkOi8vYXBwL0FjdGl2ZVN0b3JhZ2U6OkJsb2IvOD9leHBpcmVzX2luBjsAVEkiDHB1cnBvc2UGOwBUSSIPYXR0YWNoYWJsZQY7AFRJIg9leHBpcmVzX2F0BjsAVDA=--79d2aa5a0af367233a5420a4f0ae02657d3910ab&quot;,&quot;url&quot;:&quot;http://localhost:60100/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e79bebbfa0f10319d319411c129291d12e752d22/monaco.ttf-master.zip&quot;}" data-trix-content-type="application/zip" data-trix-id="1108" class="attachment attachment--file attachment--zip">
  <figcaption class="attachment__caption">
    <span class="attachment__name">monaco.ttf-master.zip</span> 
    <span class="attachment__size">86.91 KB</span>
  </figcaption>
</figure>
```

Tiếp đến là submit dữ liệu, vậy Rails sẽ gửi gì lên?

Đơn giản là Rails sẽ gửi tất cả những gì bên trong `<trix-editor></trix-editor>`

Inspect thử params, ta sẽ thấy:

```ruby
post_params[:content]
# => "<div><a href=\"http://localhost:60100/posts/new\">http://localhost:60100/posts/new</a></div><div><strong>Hello world<br></strong><figure data-trix-attachment=\"{&quot;content&quot;:&quot;<figure class=\\&quot;attachment attachment--file attachment--zip\\&quot;>\\n\\n  <figcaption class=\\&quot;attachment__caption\\&quot;>\\n      <span class=\\&quot;attachment__name\\&quot;>monaco.ttf-master.zip</span>\\n      <span class=\\&quot;attachment__size\\&quot;>86.9 KB</span>\\n  </figcaption>\\n</figure>\\n&quot;,&quot;contentType&quot;:&quot;application/zip&quot;,&quot;filename&quot;:&quot;monaco.ttf-master.zip&quot;,&quot;filesize&quot;:88996,&quot;sgid&quot;:&quot;BAh7CEkiCGdpZAY6BkVUSSIvZ2lkOi8vYXBwL0FjdGl2ZVN0b3JhZ2U6OkJsb2IvNz9leHBpcmVzX2luBjsAVEkiDHB1cnBvc2UGOwBUSSIPYXR0YWNoYWJsZQY7AFRJIg9leHBpcmVzX2F0BjsAVDA=--97b885c24fd3d87464525f34a7b6ea117e4c72e6&quot;,&quot;url&quot;:&quot;http://localhost:60100/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--940badfc5aee704ef3f98085f87f909baf870660/monaco.ttf-master.zip&quot;}\" data-trix-content-type=\"application/zip\" class=\"attachment attachment--content attachment--zip\"><figure class=\"attachment attachment--file attachment--zip\">\r\n\r\n  <figcaption class=\"attachment__caption\">\r\n      <span class=\"attachment__name\">monaco.ttf-master.zip</span>\r\n      <span class=\"attachment__size\">86.9 KB</span>\r\n  </figcaption>\r\n</figure>\r\n<figcaption class=\"attachment__caption\"></figcaption></figure></div>"
```

Làm đẹp nó chút

```html
<div>
  <a href="http://localhost:60100/posts/new">http://localhost:60100/posts/new</a></div>
<div>
  <strong>Hello world<br></strong>
  <figure data-trix-attachment="..." data-trix-content-type="application/zip" class="attachment attachment--content attachment--zip">
    <figure class="attachment attachment--file attachment--zip">
      <figcaption class="attachment__caption">
        <span class="attachment__name">monaco.ttf-master.zip</span>
        <span class="attachment__size">86.9 KB</span>
      </figcaption>
    </figure>
    <figcaption class="attachment__caption"></figcaption>
  </figure>
</div>
```

Có thể thấy nó khá giống với content của `<trix-editor></trix-editor>` đúng không nào?

Ta sẽ save đống params này lại, và xem DB ta chứa gì?

```sql
app_development=# SELECT body FROM action_text_rich_texts WHERE id = 3;
```

```html
<div>
  <a href="http://localhost:60100/posts/new">http://localhost:60100/posts/new</a></div>
<div>
  <strong>Hello world<br></strong>
  <action-text-attachment sgid="BAh7CEkiCGdpZAY6BkVUSSIvZ2lkOi8vYXBwL0FjdGl2ZVN0b3JhZ2U6OkJsb2IvNz9leHBpcmVzX2luBjsAVEkiDHB1cnBvc2UGOwBUSSIPYXR0YWNoYWJsZQY7AFRJIg9leHBpcmVzX2F0BjsAVDA=--97b885c24fd3d87464525f34a7b6ea117e4c72e6" content-type="application/zip" url="http://localhost:60100/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--940badfc5aee704ef3f98085f87f909baf870660/monaco.ttf-master.zip" filename="monaco.ttf-master.zip" filesize="88996"></action-text-attachment>
</div>
```

Các thẻ khác thì vẫn vậy, tuy nhiên attachments của ta lại có một chút khác biệt. Ở đây đống `figure` đã được minify lại thành `action-text-attachment ` để cho gọn hơn.

Hãy cùng điều tra xem tại sao lại như vậy? Trước tiên ta vào xem `ActionText::RichText` của ta chứa gì ma giáo

```ruby
# https://github.com/rails/rails/blob/027085a5972a798cfea60f829a9edabbd67a2818/actiontext/app/models/action_text/rich_text.rb#L11
class ActionText::RichText < ActiveRecord::Base
  serialize :body, ActionText::Content
end
```

Vậy là `body` của ta đang được serialize bởi `ActionText::Content`, mò đến đó tiếp thôi.

```ruby
# https://github.com/rails/rails/blob/df8ee09ce71338cdf9816225df1bdebc707f3560/actiontext/lib/action_text/content.rb#L15
class ActionText::Content
  class << self
    def fragment_by_canonicalizing_content(content)
      fragment = ActionText::Attachment.fragment_by_canonicalizing_attachments(content)
      fragment = ActionText::AttachmentGallery.fragment_by_canonicalizing_attachment_galleries(fragment)
      fragment
    end
  end

  def initialize(content = nil, options = {})
    options.with_defaults! canonicalize: true

    if options[:canonicalize]
      @fragment = self.class.fragment_by_canonicalizing_content(content)
    else
      @fragment = ActionText::Fragment.wrap(content)
    end
  end
end
```

Ta sẽ quan tâm tới hàm `initialize` trước, khi serialize, mặc định là ta đang không dùng tham số, vậy là options sử dụng sẽ là `canonicalize: true`, xem tiếp `fragment_by_canonicalizing_content` nào. Có vẻ lại phải mò `fragment_by_canonicalizing_attachments` tiếp @@

```ruby
# https://github.com/rails/rails/blob/df8ee09ce7/actiontext/lib/action_text/attachment.rb#L11
class ActionText::Attachment
  TAG_NAME = "action-text-attachment"
  SELECTOR = TAG_NAME
  
  class << self
    def fragment_by_canonicalizing_attachments(content)
      fragment_by_minifying_attachments(
        fragment_by_converting_trix_attachments(content)
      )
    end
  end
end
```

`fragment_by_minifying_attachments`, bạn có thấy từ minify không? Có vẻ ta đang đi đúng hướng. Hãy tiếp tục, nhưng hãy bắt đầu bằng `fragment_by_converting_trix_attachments`

```ruby
# https://github.com/rails/rails/blob/df8ee09ce71338cdf9816225df1bdebc707f3560/actiontext/lib/action_text/attachments/trix_conversion.rb#L9
module ActionText::Attachments::TrixConversion
  class_methods do
    def fragment_by_converting_trix_attachments(content)
      Fragment.wrap(content).replace(TrixAttachment::SELECTOR) do |node|
        from_trix_attachment(TrixAttachment.new(node))
      end
    end
  end
end
```

Nôm na là đoạn này sẽ replace toàn bộ `ActionText::TrixAttachment::SELECTOR = "[data-trix-attachment]` bằng thẻ `ActionText::Attachment::SELECTOR = "action-text-attachment"`.

```ruby
module ActionText::Attachments::Minification
  class_methods do
    def fragment_by_minifying_attachments(content)
      Fragment.wrap(content).replace(ActionText::Attachment::SELECTOR) do |node|
        node.tap { |n| n.inner_html = "" }
      end
    end
  end
end
```

Hàm `fragment_by_minifying_attachments` của chúng ta sẽ remove toàn bộ inner content của thẻ `action-text-attachment`.

Sau một hồi lòng vòng, cuối cùng ta đã biết được tại sao đống `figure` rối rắm kia trở thành `action-text-attachment` gọn gàng hơn rất nhiều.

## Hiển thị dữ liệu

Hãy vào màn hình detail, và thử inspect element, ta sẽ thấy attachment của ta lại trở về dạng đầy đủ:

```ruby
<%= @post.content =>
```

Đây là những gì ta thu được.

```html
<div class="trix-content">
  <div>
    <a href="http://localhost:60100/posts/new">http://localhost:60100/posts/new</a>
  </div>
  <div>
    <strong>Hello world<br></strong>
    <action-text-attachment sgid="BAh7CEkiCGdpZAY6BkVUSSIvZ2lkOi8vYXBwL0FjdGl2ZVN0b3JhZ2U6OkJsb2IvNz9leHBpcmVzX2luBjsAVEkiDHB1cnBvc2UGOwBUSSIPYXR0YWNoYWJsZQY7AFRJIg9leHBpcmVzX2F0BjsAVDA=--97b885c24fd3d87464525f34a7b6ea117e4c72e6" content-type="application/zip" url="http://localhost:60100/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--940badfc5aee704ef3f98085f87f909baf870660/monaco.ttf-master.zip" filename="monaco.ttf-master.zip" filesize="88996">
      <figure class="attachment attachment--file attachment--zip">
        <figcaption class="attachment__caption">
          <span class="attachment__name">monaco.ttf-master.zip</span>
          <span class="attachment__size">86.9 KB</span>
        </figcaption>
      </figure>
    </action-text-attachment>
  </div>
</div>
```

Bạn còn nhớ mình ghi ở trên, khi ta viết `@post.content`, thực chất ta đang gọi `@post.content.to_s` chứ?

Thử đào sâu vào chút:

```ruby
# https://github.com/rails/rails/blob/df8ee09ce7/actiontext/lib/action_text/content.rb#L90
def to_rendered_html_with_layout
  renderer.render(partial: "action_text/content/layout", locals: { content: self })
end

def to_s
  to_rendered_html_with_layout
end
```

```erb
<%# https://github.com/rails/rails/blob/df8ee09ce7/actiontext/app/views/action_text/content/_layout.html.erb %>
<div class="trix-content">
  <%= render_action_text_content(content) %>
</div>
```

```ruby
# https://github.com/rails/rails/blob/0ec2a907545e47f816993b9fd8cabb552454b1a2/actiontext/app/helpers/action_text/content_helper.rb#L12
def render_action_text_content(content)
  sanitize_action_text_content(render_action_text_attachments(content))
end

def sanitize_action_text_content(content)
  sanitizer.sanitize(content.to_html, tags: allowed_tags, attributes: allowed_attributes, scrubber: scrubber).html_safe
end

def render_action_text_attachments(content)
  content.render_attachments do |attachment|
    unless attachment.in?(content.gallery_attachments)
      attachment.node.tap do |node|
        node.inner_html = render(attachment, in_gallery: false).chomp
      end
    end
  end.render_attachment_galleries do |attachment_gallery|
    render(layout: attachment_gallery, object: attachment_gallery) do
      attachment_gallery.attachments.map do |attachment|
        attachment.node.inner_html = render(attachment, in_gallery: true).chomp
        attachment.to_html
      end.join("").html_safe
    end.chomp
  end
end
```

Đại khái là Rails sẽ sanitize đống rich text của ta để tránh XSS attack, và render template đối với những attachment.

## Integrate với Active Storage

Hãy quay trở lại với model `ActionText::RichText`

```ruby
# https://github.com/rails/rails/blob/df8ee09ce7/actiontext/app/models/action_text/rich_text.rb#L14
class ActionText::RichText < ActiveRecord::Base
  has_many_attached :embeds
  
  before_save do
    self.embeds = body.attachments.map(&:attachable) if body.present?
  end
end
```

Ta dễ dàng hiểu 1 cách tổng quan là Rails sẽ tiến hành extract toàn bộ attachment trong body, gán vào embeds. Sau đó sẽ save đống association này lại.

Thử xem Rails sẽ extract attachments ra làm sao.

```ruby
# https://github.com/rails/rails/blob/027085a5972a798cfea60f829a9edabbd67a2818/actiontext/lib/action_text/content.rb#L53
def attachables
  @attachables ||= attachment_nodes.map do |node|
    ActionText::Attachable.from_node(node)
  end
end

# https://github.com/rails/rails/blob/027085a5972a798cfea60f829a9edabbd67a2818/actiontext/lib/action_text/content.rb#L113
def attachment_nodes
  @attachment_nodes ||= fragment.find_all(ActionText::Attachment::SELECTOR)
end
```

Rails sẽ tìm kiếm tất cả thẻ `action-text-attachment`, extract những thông tin cần thiết để init được `ActiveStorage::Blob` object.

Ta cần nghía qua hàm `Attachable.from_node` nữa

```ruby
# https://github.com/rails/rails/blob/027085a5972a798cfea60f829a9edabbd67a2818/actiontext/lib/action_text/attachable.rb#L10
def from_node(node)
  if attachable = attachable_from_sgid(node["sgid"])
    attachable
  elsif attachable = ActionText::Attachables::ContentAttachment.from_node(node)
    attachable
  elsif attachable = ActionText::Attachables::RemoteImage.from_node(node)
    attachable
  else
    ActionText::Attachables::MissingAttachable
  end
end
```

Trong trường hợp này, Rails sẽ luôn extract theo strategy là `sgid`, các bạn không cần quan tâm tới 3 nhánh dưới làm gì cho mất công.

Còn nhớ phần trên mình đã đề cập tới `sgid` chứ?

```js
https://github.com/rails/rails/blob/cc1a5d5620c4cd952b27f6c1bbd16d8780a34d0e/actiontext/app/javascript/actiontext/attachment_upload.js#L26
this.attachment.setAttributes({
  sgid: attributes.attachable_sgid,
  url: this.createBlobUrl(attributes.signed_id, attributes.filename)
})
```

Callback này được gọi sau khi file được upload thành công. Vậy `sgid` là cái gì?

`sigd` được encrypt từ `id` của attachment sau khi upload. Khi gửi lên, server sẽ decrypt nó để lấy lại `id`, gán attachment vào record.

Tại sao lại cần encrypt? Các bạn cứ tưởng tượng, nếu dùng thẳng id, do ta upload ảnh trước khi tạo record, nên khi gửi params từ client lên, chắc chắn sẽ phải đưa attachment id vào để server lưu đúng association. Client nó gửi đúng thì không sao, nhưng nếu nó gửi id attachment của người khác thì sao? Attachment đó sẽ chuyển chủ ngay lập tức :v Còn nếu encrypt thì user đố mà mò được mã hash của attachment người khác.

`attachable_from_sgid(node["sgid"])` sẽ trả về `ActiveStorage::Blob` object

```ruby
# https://github.com/rails/rails/blob/f1b8bb4e1f16e4029ddf05515db0c01942521116/actiontext/lib/action_text/attachable.rb#L22
def from_attachable_sgid(sgid, options = {})
  method = sgid.is_a?(Array) ? :locate_many_signed : :locate_signed
  record = GlobalID::Locator.public_send(method, sgid, options.merge(for: LOCATOR_NAME))
  record || raise(ActiveRecord::RecordNotFound)
end
```

Nếu không tin, bạn hãy thử `rails c` và gọi hàm:

```ruby
GlobalID::Locator.locate_signed(sgid, { for: "attachable" })
```

# Kết luận

`Action Text` được thiết kế khá hay, code gọn, tất cả method đều rất ngắn, dễ hiểu.

Do là built-in nên ta cũng chả cần cài cắm gì thêm mệt người. Nếu đã upgrade lên Rails 6, bạn hãy thử trải nghiệm nó xem.

Còn đối với phiên bản thấp hơn, ta cũng có thể áp dụng flow của Action Text để build một package hỗ trợ richtext.