# 1. Giới thiệu bài toán:
- Chào mọi người, là một Web Developer thì chúng ta đã quá quen việc làm việc với form, trong đa số trường hợp thì các field thường được trình bày 1 cách liên tục như ví dụ dưới đây:
![](https://images.viblo.asia/6090b0a3-7588-47bc-8af0-f75fd546e47d.png)
- Tuy nhiên trong 1 số trường hợp (ví dụ form quá nhiều field hoặc do yêu cầu về business login) form được chia thành nhiều step như ví dụ dưới đây:

   ![](https://images.viblo.asia/a265eb7b-3081-4a63-ac43-017acd4dc311.png)
   ![](https://images.viblo.asia/d6b2484e-3f2b-467e-973c-1446b475ad6f.png)
   ![](https://images.viblo.asia/437a5e8d-60a5-4e8f-8101-34f18378b285.png)

Hôm nay mình xin phép giới thiệu với mn cách mình thực hiện sử dụng `jQuery` và `Ajax`.

# 2. Giải quyết bài toán.
## a. Init project và scaffold:
- Lấn lượt chạy các command sau để khởi tạo project và generate scaffold
    ```ruby
    rails new rails_multi_steps_form
    rails generate scaffold shipping receiver_name:string receiver_phone:string shipping_address:string shipping_day:datetime
    ```
- Thêm các gem `jquery-rails` và `bootstrap-sass` vào `Gemfile`.
    ```ruby
    gem "jquery-rails"
    gem "bootstrap-sass"
    ```
- Chạy comamnd `bundle install` và thêm các config cần thiết để có thể sử dụng gem `jquery-rails` và `bootstrap-sass`
    ```ruby
    bundle install
    ```
- Sử dụng gem `jquery-rails` và gem `bootstrap-sass` và sửa lại các file được `scaffold` generate sẵn để có màn hình tạo shipping như mong muốn.
- Các file liên quan:
    ```ruby
    # app/views/shippings/new.html.erb

    <div class="container">
      <h1>Create Shipping</h1>

      <%= render "form", shipping: @shipping %>
    </div>
    ```

    ```ruby
    # app/views/shippings/form.html.erb

    <%= form_for shipping, html: { class: "form-horizontal" } do |form| %>
      <%= render "shared/error_messages", object: shipping if shipping.errors.any? %>

      <div class="form-group">
        <%= form.label :receiver_name, class: "control-label col-sm-2" %>
        <div class="col-sm-10">
          <%= form.text_field :receiver_name, class: "form-control" %>
        </div>
      </div>

      <div class="form-group">
        <%= form.label :receiver_phone, class: "control-label col-sm-2" %>
        <div class="col-sm-10">
          <%= form.text_field :receiver_phone, class: "form-control" %>
        </div>
      </div>

      <div class="form-group">
        <%= form.label :shipping_address , class: "control-label col-sm-2" %>
        <div class="col-sm-10">
          <%= form.text_field :shipping_address, class: "form-control" %>
        </div>
      </div>

      <div class="form-group">
        <%= form.label :shipping_day, class: "control-label col-sm-2" %>
        <div class="col-sm-10">
          <%= form.datetime_field :shipping_day, class: "form-control" %>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <%= form.submit class: "btn btn-primary" %>
        </div>
      </div>
    <% end %>
    ```
    
    ```ruby
    # app/vires/shared/_error_messages.html.erb

    <div class="panel panel-danger">
      <div class="panel-heading">
        Please try again
      </div>

      <div class="panel-body">
        <ul>
          <% object.errors.full_messages.each do |message| %>
            <li><%= message %></li>
          <% end %>
        </ul>
      </div>
    </div>
    ```
- Kết quả thu được
![](https://images.viblo.asia/6090b0a3-7588-47bc-8af0-f75fd546e47d.png)

## b. Chia form thành multi step form:
- Tạo các file ứng với các step của form
- Chỉ hiển thị step đầu tiên, ẩn các bước tiếp theo (sử dụng `style="display: none;"`)
- Step confirmation chỉ được hiển thị sau khi đã thực hiện điền các field vào các step.

    ```ruby
    # app/views/shippings/_form.html.erb
    
    <%= form_for shipping, html: { class: "form-horizontal" } do |form| %>
      <div class="js-form-step">
        <%= render "shippings/form_steps/receiver_step", form: form, shipping: shipping %>
      </div>

      <div class="js-form-step" style="display: none">
        <%= render "shippings/form_steps/shipping_step", form: form, shipping: shipping %>
      </div>
    <% end %>
    ```


    ```ruby
    # app/views/shippings/form_steps/_receiver_step.html.erb
    
    <h3>Receiver Step Step</h3>

    <%= render "shared/error_messages", object: shipping if shipping.errors.any? %>

    <div class="form-group">
      <%= form.label :receiver_name, class: "control-label col-sm-2" %>
      <div class="col-sm-10">
        <%= form.text_field :receiver_name, class: "form-control" %>
      </div>
    </div>

    <div class="form-group">
      <%= form.label :receiver_phone, class: "control-label col-sm-2" %>
      <div class="col-sm-10">
        <%= form.text_field :receiver_phone, class: "form-control" %>
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="col-xs-6 text-left">
          <div class="previous">
            <button class="btn btn-primary" disabled>
              Previous Step
            </button>
          </div>
        </div>

        <div class="col-xs-6 text-right">   
          <div class="next">
            <button class="btn btn-primary">
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
    ```
    
    ```ruby
    # app/views/shippings/form_steps/_shipping_step.html.erb
    
    <h3>Shipping Step</h3>

    <%= render "shared/error_messages", object: shipping if shipping.errors.any? %>

    <div class="form-group">
      <%= form.label :shipping_address , class: "control-label col-sm-2" %>
      <div class="col-sm-10">
        <%= form.text_field :shipping_address, class: "form-control" %>
      </div>
    </div>

    <div class="form-group">
      <%= form.label :shipping_day, class: "control-label col-sm-2" %>
      <div class="col-sm-10">
        <%= form.datetime_field :shipping_day, class: "form-control" %>
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="col-xs-6 text-left">
          <div class="previous">
            <button class="btn btn-primary">
              Previous Step
            </button>
          </div>
        </div>

        <div class="col-xs-6 text-right">   
          <div class="next">
            <button class="btn btn-primary">
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
    ```
    
    ```ruby
    # app/views/shippings/form_steps/_confirmation_step.html.erb

    <h3>Confirmation Step</h3>

    <%= render "shared/error_messages", object: shipping if shipping.errors.any? %>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <table class="table">
          <tbody>
            <tr>
              <th>Receiver Name</th>
              <td><%= "" %></td>
            </tr>
            <tr>
              <th>Receiver Phone</th>
              <td><%= "" %></td>
            </tr>
            <tr>
              <th>Shipping Address</th>
              <td><%= "" %></td>
            </tr>
            <tr>
              <th>Shipping Day</th>
              <td><%= "" %></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <div class="col-xs-6 text-left">
          <div class="previous">
            <button class="btn btn-primary">
              Previous Step
            </button>
          </div>
        </div>

        <div class="col-xs-6 text-right">   
          <div class="next">
            <%= form.submit "Done", class: "btn btn-primary" %>
          </div>
        </div>
      </div>
    </div>
    ```
    
- Kết quả thu được:
![](https://images.viblo.asia/f6b54c27-8efb-4b96-928f-6e6f9699144f.png)

##  c. Implement click event cho pre button và next button:
- Thêm class `.js-button-pre` và `.js-button-next` và `data-step-index` cho pre button và next button
- Step index lần lượt là 0 ứng với receiver step, 1 ứng với shipping step và 2 ứng với confirmation step
- Ví dụ ở shipping step:
    ```html
    <button class="btn btn-primary js-button-pre" data-step-index="1">
      Previous Step
    </button>

    <button class="btn btn-primary js-button-next" data-step-index="1">
      Next Step
    </button>
    ```
- Implement click event cho các `.js-button-pre` và `.js-next-button` như sau
    ```javascript
    # app/assets/javascripts/application.js

    $( document ).on('turbolinks:load', function() {
      $(document).on('click', '.js-button-next', function() {
        var stepIndex = $(this).data('stepIndex');
        $('.js-form-step').slideUp();
        $('.js-form-step').eq(stepIndex + 1).slideDown();
      });

      $(document).on('click', '.js-button-pre', function() {
        var stepIndex = $(this).data('stepIndex');
        $('.js-form-step').slideUp();
        $('.js-form-step').eq(stepIndex - 1).slideDown();
      });
    });
    ```
- Kết quả thu được:

![](https://images.viblo.asia/cf4a0e93-08d4-400e-ab9b-722bf456568d.gif)

## c. Validate ở từng step
- Ở bước này, ta sẽ thực hiện gửi giá từng field được nhập ở từng step lên server và thực hiện validate những giá trị này có valid hay không.
- Ta thêm action `validate_step` cho `ShippingsController` để thực hiện việc này.
    ```ruby
    # config/routes.rb

    resources :shippings do
      collection do
        post :validate_step
      end
    end
    ```
    
    ```ruby
    # app/controllers/shippings_controller.rb
    
    def validate_step
      shipping = Shipping.new shipping_params
      shipping.valid?

      error_attrs = shipping_params.keys.map(&:to_sym).select do |attr|
        shipping.errors[attr].any?
      end
      error_messages = error_attrs.map do |attr|
        Shipping.human_attribute_name(attr) + " " + shipping.errors[attr].first
      end

      respond_to do |format|
        format.js do
          render json: {
            valid: error_messages.empty?,
            error_messages: render_to_string(
              partial: "shared/error_messages",
              locals: { error_messages: error_messages }
            )
          }
        end
      end
    end
    ```
- Update partial `shared/_error_messages.html.erb`
    ```html
    <div class="panel panel-danger">
      <div class="panel-heading">
        Please try again
      </div>

      <div class="panel-body">
        <ul>
          <% error_messages.each do |message| %>
            <li><%= message %></li>
          <% end %>
        </ul>
      </div>
    </div>
    ```
- Update click event của `.js-button-next`, sử dụng `Ajax` để gọi action `validate_step`
    ```javascript
    $(document).on('click', '.js-button-next', function() {
        var form = $(this).closest('.js-form-step');
        var stepIndex = $(this).data('stepIndex');
        var data = {};

        form.find('input').each(function(index) {
          var name = $(this).attr('name');
          var val = $(this).val();

          data[name] = val;
        });

        $.ajax({
          headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          url: '/shippings/validate_step',
          method: 'POST',
          dataType: 'JSON',
          data: data,
          success: function(response) {
            if (response.valid) {
              $('.js-form-step').slideUp();
              $('.js-form-step').eq(stepIndex + 1).slideDown();

              form.find('.js-error-messages').html("");
            } else {
              form.find('.js-error-messages').html(response.error_messages);
            }
          }
        });
      });
    ```
- Kết quả thu được
![](https://images.viblo.asia/f482f2c9-03bf-44d1-8430-e7e3e7077b7b.gif)

## d. Render confirmation step:
- Update response action `validate_step` trả về thêm response html của `confirmation_step`
    ```ruby
    # app/controllers/shippings_controller.rb

    def validate_step
      shipping = Shipping.new shipping_params
      shipping.valid?

      error_attrs = shipping_params_keys.select do |attr|
        shipping.errors[attr].any?
      end
      error_messages = error_attrs.map do |attr|
       Shipping.human_attribute_name(attr) + " " + shipping.errors[attr].first
      end

      respond_to do |format|
        format.js do
          render json: {
            valid: error_messages.empty?,
            error_messages: render_to_string(
              partial: "shared/error_messages",
              locals: { error_messages: error_messages }
            ),
            confirmation: render_to_string(
              partial: "shippings/form_steps/confirmation_step",
              locals: { shipping: shipping }
            ) 
          }
        end
      end
    end
    ```
- Update click event của `.js-button-next`, render `confirmation_step` nếu step hợp lệ và đang ở step cuối.
    ```javascript
    $(document).on('click', '.js-button-next', function() {
      var form = $(this).closest('.js-form-step');
      var stepIndex = $(this).data('stepIndex');
      var data = $('form').serialize();

      $.ajax({
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/shippings/validate_step',
        method: 'POST',
        dataType: 'JSON',
        data: data,
        success: function(response) {
          if (response.valid) {
            $('.js-form-step').slideUp();
            $('.js-form-step').eq(stepIndex + 1).slideDown();
            $('input[name="step_index"]').val(stepIndex + 1);
            form.find('.js-error-messages').html("");

            if (stepIndex == 1) {
              $('.js-form-step').last().html(response.confirmation);
            }
          } else {
            form.find('.js-error-messages').html(response.error_messages);
          }
        }
      });
    });
    ```
- Kết quả thu được:

![](https://images.viblo.asia/fbb80f3c-6ab1-448f-8a91-a9d36bbba5a3.gif)

# 3. Tham khảo:
- Các bạn có thể download source code ở [đây](https://github.com/LeTanThanh/rails_multi_steps_form).
- Các bạn cũng có thể sử dụng gem [wicked](https://github.com/schneems/wicked) để handel multi step form.