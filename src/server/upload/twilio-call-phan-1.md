Sau khi đã đi hết 2 phần của Twilio SMS, bây giờ mình sẽ giới thiệu cho các bạn về Twilio Call, một chức năng tự động gọi đến số điện thoại được chỉ định.
# 1. Mua số điện thoại tổng đài
Cũng như SMS để bắt đầu với twilio bạn cần phải [login](https://www.twilio.com/login) vào hệ thống. Nếu chưa có tài khoản bạn có thể đăng kí tại [đây](https://www.twilio.com/try-twilio)
Tiếp theo bạn sẽ phải cần mua một số điện thoại tổng đài và cần phải chọn service voice cho số điện thoại đó, để làm được điều đó bạn vào [đây](https://www.twilio.com/console/phone-numbers/search).  Giao diện sẽ như sau:

![](https://images.viblo.asia/bf501421-8a18-449f-aceb-c0c6dbccd7b6.png)

Sau khi bấm *Search* bạn sẽ thấy tất cả các số điện thoại phù hợp với dịch vụ voice của bạn, nên nhớ tất cả số điện thoại này đều phải trả phí, và phí thì phụ thuộc vào số điện thoại xấu hay đẹp nựa nhé :D

![](https://images.viblo.asia/f25fc3b0-d71f-43b8-a136-6437e25ccc6a.png)

Sau khi đã mua được số điện thoại chúng ta sẽ bắt đầu lập trình ứng dụng theo từng ngôn ngữ, ở đây mình vẫn theo ngôn ngữ Ruby nhé
Về phần này cài đặt thì mình sẽ không cần nói qua nhiều, để sử dụng được twilio bạn cần chạy dòng lệnh sau `gem install twilio-ruby`

# 2. Triển khai ứng dụng
Để các bạn có thể hình dung được luồng đi thì có thể tham khảo sơ đồ dưới đây

![](https://images.viblo.asia/bdcebfdc-494b-49a0-aa68-91abbb8904a5.png)

1. Khách sẽ truy cập trang web và nhập 1 số điện thoại cần gọi
2. Sau khi nhận được yêu cầu sẽ gửi 1 HTTP request đến Twilio để Twilio thực hiện cuộc gọi đến số điện thoại đó
3. Twilio nhận sđt và bắt đầu gọi đến số điện thoại của người dùng
4. Người dùng nhận cuộc gọi

Giờ để làm ứng dụng mình sẽ sử dụng Framework Rails nhé.  Tiếp theo chúng ta cần thiệu lập các biến môi trường

```
# Find your Account SID and Auth Token at twilio.com/console
export TWILIO_ACCOUNT_SID=AC2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
export TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
export API_HOST=https://example.herokuapp.com
export TWILIO_NUMBER=+15551230987
```

Ở trong controller *app/controllers/twiliocontroller.rb* mình sẽ có đoạn code để thực hiện call như sau

```
def call
    contact = Contact.new
    contact.user_phone  = params[:userPhone]
    contact.sales_phone = params[:salesPhone]

    # Validate contact
    if contact.valid?
      @client = Twilio::REST::Client.new @twilio_sid, @twilio_token
      # Connect an outbound call to the number submitted
      @call = @client.calls.create(
        to:   contact.user_phone,
        from: @twilio_number,
        url: "#{@api_host}/connect/#{contact.encoded_sales_phone}" # Fetch instructions from this URL when the call connects
      )

      # Let's respond to the ajax call with some positive reinforcement
      @msg = { message: 'Phone call incoming!', status: 'ok' }
    else

      # Oops there was an error, lets return the validation errors
      @msg = { message: contact.errors.full_messages, status: 'ok' }
    end

    respond_to do |format|
      format.json { render json: @msg }
    end
  end
```

Tiếp theo chúng ta cần 1 form để input số điện thoại, 
```
 <form id="contactform" role="form" action="#" method="POST">
            <div class="form-group">
              <h3>Call Sales</h3>
              <p class="help-block">
                Are you interested in impressing your friends and confounding your enemies? Enter your phone number below, and our team will contact you right away.
              </p>
            </div>
            <label>Your number</label>
             <div class="form-group">
                 <input class="form-control" type="text" name="userPhone" id="userPhone"
                        placeholder="(651) 555-7889">
             </div>
             <label>Sales team number</label>
             <div class="form-group">
                 <input class="form-control" type="text" name="salesPhone" id="salesPhone"
                        placeholder="(651) 555-7889">
             </div>
            <button type="submit" class="btn btn-default">Contact Sales</button>
          </form>
```
Sau khi đã có Controller và View, thì phần tiếp theo mình sẽ hướng dẫn bạn đoạn AJAX để xử lí method call nhé

# 3. Tài liệu tham khảo
https://www.twilio.com/docs/voice/tutorials/click-to-call-ruby-rails