Thỉnh thoảng, trong các dự án, đôi khi mình phải làm việc với các remote modal, và để tạo được nó thì phải tốn khá nhiều effort cho việc viết javascript, và giả sử trong ứng dụng của bạn nhiều màn hình phải sử dụng remote modal, thì việc phải viết nhiều file javascript như vậy thật sự là bất tiện. Vì vậy, ở bài viết này mình sẽ giới thiệu cho các bạn cách khởi tạo việc render một remote modal tương tự như việc render về một view ở trong Rails.
### Step 0: Prepare your bundle
Rails 4.2+
Để có thể config được responder mà Rails trả về qua hai method là respond_with và respond_to, chúng ta cần cài đặt gem "responders".
Rails 5.1+
Từ phiên bản Rails 5.1 trở đi thì Rails Javascript đã được viết lại bằng một gem mới có tên là rails-ujs và nó sử dụng vanilla Javascript, vì vậy JQuery không còn là một phần trong Rails nữa, vì vậy chúng ta cần phải cài đặt thêm JQuery vào Rails.
### Step 1: Modify your layout files
Đương nhiên, để có thể sử dụng một remote modal trong toàn ứng dụng, thì chúng ta cần phải khởi tạo layout cho nó.
```
<%# app/views/layouts/modal.html.erb %>

<div class="modal" id="mainModal" tabindex="-1" role="dialog" aria-labelledby="mainModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="mainModalLabel">
          <%= yield :title if content_for? :title %>&nbsp;
        </h4>
      </div>

      <%= yield %>
    </div>
  </div>
</div>
```
Và tất nhiên chúng ta cần nhúng nó vào một nơi để có thể render nó ra. Mình sẽ add nó vào application layout để có thể render nó bất cứ lúc nào mình cần.
```

# app/views/layouts/application.html.erb %>

<div id="modal-holder"></div>
```
### Step 2: Create modal.js.coffee
Bây giờ, chúng ta cần có một file javascript phía front-end để có thể handle và xử lý các sự kiện xảy ra trên modal cũng như xử lí dữ liệu mà server side gửi về.

Đầu tiên mình cần một links có attribute là data-modal để có thể render về một modal window. Thêm nữa chúng ta cần phải xử lí việc submit một form trên modal, ứng dụng Rails của chúng ta cần phải handle chính xác để có thể xử lý đúng trang cần trả về hoặc nếu xảy ra lỗi thì phải re-display lại modal đi kèm thông báo lỗi.
Để thực hiện được như vậy, chúng ta dựa vào header Location trong response trả về để xử lí trong file script. Nếu tồn tại url trong header Location thì cũng ta sẽ load url đó, nếu không thì chúng ta sẽ hiển thị lại form trên modal.
```
# app/assets/javascripts/modals.js.coffee

$ ->
  modal_holder_selector = '#modal-holder'
  modal_selector = '.modal'

  $(document).on 'click', 'a[data-modal]', ->
    location = $(this).attr('href')
    #Load modal dialog from server
    $.get location, (data)->
      $(modal_holder_selector).html(data).
      find(modal_selector).modal()
    false

  $(document).on 'ajax:success',
    'form[data-modal]', (event, data, status, xhr)->
      url = xhr.getResponseHeader('Location')
      if url
        # Redirect to url
        window.location = url
      else
        # Remove old modal backdrop
        $('.modal-backdrop').remove()

        # Replace old modal with new one
        $(modal_holder_selector).html(data).
        find(modal_selector).modal()

      false
```
### Step 3: Create Modal Responder
Sau khi đã chuẩn bị ở phía front-end, chúng ta cần implement các xử lí logic ở phía back-end để có thể trả dữ liệu về front-end sao cho phía front-end có thể handle và xử lí theo như những gì chúng ta đã viết ở file script.
Bây giờ mình sẽ khởi tạo 1 class có tên là ModalResponder được kế thừa từ class ActionController::Responder để có thể config kết quả render khi sử dụng hàm respond_with.
```
class ModalResponder < ActionController::Responder
  cattr_accessor :modal_layout
  self.modal_layout = 'modal'

  def render(*args)
    options = args.extract_options!
    if request.xhr?
      options.merge! layout: modal_layout
    end
    controller.render *args, options
  end

  def default_render(*args)
    render(*args)
  end

  def redirect_to(options)
    if request.xhr?
      head :ok, location: controller.url_for(options)
    else
      controller.redirect_to(options)
    end
  end
end
```
Có thể  thấy ở class trên, chúng ta đã override hai hàm render và redirect_to để có thể xử lí theo ý muốn của mình khi có request được gửi lên thông qua XHR. Nếu request được gửi lên thông qua AJAX, thì chúng ta muốn hàm render sẽ sử dụng modal layout mà chúng ta đã custom. Và chúng ta muốn hàm redirect_to chỉ returrn về headers, mà cụ thể ở đây là header location để phía front-end có thể xử lí theo như logic mà chúng ta đã viết ở file script.
### Step 4. Modify Application Controller
Sau khi chúng ta đã tạo class ModalResponder, chúng ta sẽ khởi tạo một hàm có tên là respond_modal_with trong ApplicationController. Nó sử dụng hàm respond_with với ModalResponder để có thể custom respond mà phía server trả về khi chúng ta áp dụng vào một Controller cụ thể nào đó.
```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def respond_modal_with(*args, &blk)
    options = args.extract_options!
    options[:responder] = ModalResponder
    respond_with *args, options, &blk
  end
end
```
### Step 5. Use it!
Moi thứ chuẩn bị đã xong, bây giờ chúng ta thử sử dụng nó xem sao.
Đầu tiên, mình sẽ tạo 1 link để hiển thị modal
```
<%= link_to 'Create category', new_category_path, 
            data: { modal: true } %>
```
Ở controller, chúng ta sẽ sử dụng hàm respond_modal_with thay vì respond_with
```
class CategoriesController < ApplicationController
  respond_to :html, :json

  def new
    @category = Category.new
    respond_modal_with @category
  end

  def create
    @category = Category.create(category_params)
    respond_modal_with @category, location: root_path
  end

  private

  def category_params
    params.require(:category).permit(:name, :order)
  end
end
```
Cuối cùng, chúng ta cần add hai attribute vào form trên modal.
```
<%= simple_form_for(@category, remote: request.xhr?, html: { data: { modal: true } }) %>
```
remote để nói với thằng jquery_ujs submit form thông qua AJAX, còn thằng data-modal để nói với thằng script hiểu rằng thằng này là một modal form, handle và xử lí nó như trong file script mà chúng ta đã viết ở trên.
Các bạn có thể tham khảo demo ở đây: [remote](http://remote-modals-demo.herokuapp.com)