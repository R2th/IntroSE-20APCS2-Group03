### QRcode và ứng dụng thanh toán điện tử trong Ruby On Rails
Ở  [bài viết trước](https://viblo.asia/p/tim-hieu-ve-chu-ki-so-va-qrcode-trong-ruby-on-rails-4P856kXRKY3) mình đã giới thiệu cho các bạn về QRCode và chữ kí số, hôm nay mình sẽ sử dụng QRcode để demo quá trình thanh toán online

#### Ý tưởng thực hiện
- Sử dụng thuật toán mã hóa và hàm băm để tạo ra một TOKEN, trong TOKEN có chứa thông tin của người dùng và thông tin của sản phẩm
- Dùng TOKEN này để tạo ra một QRCode tương ứng
- Người dùng Scan mã QRCode ở trên sẽ được dẫn đến link thanh toán, nếu TOKEN hợp lệ thì thanh toán thành công và trừ tiền trong tài khoản

#### Thực hiện
Phần khởi tạo project của rails thì mình không nhắc lại nữa mà mình di thẳng vào chi tiết qúa trình luôn
******
Ở trong project này mình sử dụng các gem sau:
```Ruby
gem "bootstrap-sass"
gem "jquery-rails"
gem "devise"
gem 'devise-bootstrap-views'
```
Những gem này dùng để tạo ra form đăng nhập, đăng kí, .... điều đó là tất nhiên rồi, phải có đăng nhập thì mới thanh toán được.

```Ruby
gem "rqrcode"
```
Gem này dùng để tạ ra mã QRCode tương ứng

Xong ```bundle install``` là chúng ta đã hoàn thành việc cài đặt các ```gem``` cần thiết cho project
******
Để tạo ra form đăng nhập và đăng kí một các tự động sử dụng ```gem devise``` các bạn có thể tham khảo [ở đây](https://viblo.asia/p/gioi-thieu-gem-devise-amoG84YnGz8P), ngoài ra để form trông đẹp hơn thì có thể sử dụng thêm ```gem 'devise-bootstrap-views'``` xem hướng dẫn sử dụng [tại đây](https://github.com/hisea/devise-bootstrap-views), để tránh dài dòng thì việc này mình không nhắc lại nữa.
******
Tiếp theo, để thanh toán được trước hết phải có tiền đã :).
Trong khuôn khổ bài viết này ví tiền mà mình tạo ra sẽ không được liên kết với ngân hàng hay gì cả, mà chỉ đơn giản là tạo ra một bảng trong database và input số tiền vào trong đó. Mình thực hiện như sau:

```
rails g model wallet user:references cash:integer card_name:string card_number:string
```

Một model sẽ được tao ra như sau:
```Ruby
class Wallet < ApplicationRecord
  belongs_to :user
end
```
Tạo ra một controller tương ứng dùng để thực hiện việc nhập số tiền:
```Ruby
class WalletsController < ApplicationController
  before_action :authenticate_user!
  def index
    @my_wallet = Wallet.find_by(user_id: params[:user_id])
  end

  def new
    @wallet = Wallet.new
  end

  def create
    @wallet = Wallet.new wallet_params
    @wallet.user_id = current_user.id
    @wallet.save
    redirect_to user_wallets_path(current_user.id)
  end

  private
  def wallet_params
    params.require(:wallet).permit :cash, :card_name, :card_number
  end
end
```
*****
Tiếp theo chúng ta tạo ra các ```item``` để làm dữ liệu thanh toán
```
rails g model item name:string amount:integer infor:string unit_price:integer image:string
```
Một model Item sẽ được tạo ra
Trong controller tương ứng, sử dụng hàm index để đổ dữ liệu ra view
```Ruby
class ItemsController < ApplicationController
  before_action :authenticate_user!

  def index
    @items = Item.all
  end
end
```

Sử dụng file ```seeds.rb``` để tạo ra dữ liệu
```Ruby
10.times do |n|
  name  = "Sản phẩm #{n+1}"
  amount = rand(1..20)
  infor = "Sản phẩm #{n+1}"
  unit_price = 1000 * n
  image = "item_#{n+1}.jpg"
  Item.create!(name:  name, amount: amount, infor: infor,
    unit_price: unit_price, image: image)
end
```
******
Tiếp theo chúng ta sẽ tạo ra bảng ```payments```, đây chính là bảng sẽ lưu lại thông tin giao dịch của user tương ứng
```
rails g model payment item:references user:references amount:integer status:string type_payment:string
```
Trường ```status``` sẽ nhận một trong 3 giá trị sau:
- ```request``` là trạng thái vừa mới tạo
- ```success``` là trạng thái đã thanh toán thành công
- ```reject``` là trang thái ngừng thanh toán
Ở đây chúng ta có thể sử dụng kiểu dữ liệu ```enum``` các bạn có thể [tham khảo tại đây](https://viblo.asia/p/enums-trong-rails-yMnKMqYaK7P)

Mối quan hệ giữa các bảng ```user```, ```payment```, ```item```, ```wallet``` sẽ như sau:
```Ruby
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :wallets
end
```
```Ruby
class Payment < ApplicationRecord
  belongs_to :item
end
```
```Ruby
class Item < ApplicationRecord
  has_many :payments
end
```
```Ruby
class Wallet < ApplicationRecord
  belongs_to :user
end
```
Vậy là xong phần tạo bảng payment(bảng quan trọng nhất trong project này), các phần xử lý trong controller của model này sẽ được nhắc đến ở dưới
*****
Tiếp theo chúng ta sẽ tạo ra các ```routes``` tương ứng cho mỗi hành động

Tại file ```routes.rb```
```Ruby
Rails.application.routes.draw do
  devise_for :users
  resources :items do
    resources :payments do
      member do
        get "payment_qrcode"
        get "confirm_payment"
        get "reject_payment"
      end
    end
  end

  resources :users do
    resources :wallets
  end

  root "items#index"
end
```
*****
Trong controller ```app/controllers/payments_controller.rb```
Viết một method ```create```, method này được gọi đến khi user nhập số lượng hàng và tiến hành thanh toán, bản ghi ```payment``` được tạo ra với ```status = 'request'```
```Ruby
  def create
    payment = Payment.new
    payment.item_id = params[:item_id]
    payment.type_payment = params[:commit]
    payment.user_id = current_user.id
    payment.amount = params[:amount]
    payment.status = "request"
    payment.save
    redirect_to item_payment_path(item_id: payment.item_id, id: payment.id)
  end
```
Khi tạo xong thì chuyển đến màn hình QRCode tương ứng
```Ruby
  def show
    payment = Payment.find(params[:id])
    timestamp = ServerTime.now
    token = Digest::MD5.hexdigest(generate_info(payment, timestamp.to_i.to_s))
    payment.update_attributes(token_created_at: timestamp)
    infor = "#{request.original_url}/payment_qrcode?token=#{token}"
    puts infor
    @qr = RQRCode::QRCode.new(infor)
      .as_png.resize(500, 500)
      .to_data_url
  end
  
  private
  def generate_info payment, timestamp
    infor = current_user.email + payment.item.name + payment.amount.to_s
      + payment.item.unit_price.to_s + timestamp
    infor
  end
  ```
Ở đây, mình sử dụng TOKEN là một chuỗi gồm thông tin của user là email, thông tin của item và cuối cùng à một chuỗi timestamp để tránh việc trùng lặp, sau đó tất cả được băm ra và tạo ra TOKEN, đồng thời update timestamp này vào trong database.

Ngoài ra giá trị ```timestamp = ServerTime.now``` được định nghĩa trong file ```config/initializers/server_time.rb```
```Ruby
ServerTime = Time.zone
```
đây chính là thời gian hiện tại của server rails

Mã QRCode sẽ được tạo ra tương ứng với mã token cùng với đường dẫn như sau
```Ruby
infor = "#{request.original_url}/payment_qrcode?token=#{token}"
```

Vậy là xong việc tạo ra QRCode cho record payment tương ứng
******
Tiếp theo là kiểm tra tính hợp lệ của QRCode 
```Ruby
  def payment_qrcode
    payment = Payment.where(id: params[:id], user_id: current_user.id)
    payment = payment.where.not(status: ["success", "reject"]).first
    return render "token_invalid" if !payment.present?
    if !token_expired(payment.token_created_at) &&
      check_valid_token(payment, params[:token])
      @target_payment = payment
      render "payment_qrcode"
    else
      render "token_invalid"
    end
  end
  
  private 
  def check_valid_token payment, token
    infor = current_user.email + payment.item.name + payment.amount.to_s
      + payment.item.unit_price.to_s + payment.token_created_at.to_i.to_s
    Digest::MD5.hexdigest(infor) == token
  end

  def token_expired token_created_at
    (ServerTime.now - token_created_at) > 5.minutes
  end
  ```
  Nếu TOKEN trong QRCode là hợp lệ thì hiển thị hóa đơn thanh toán, nếu không hợp lệ thì báo lỗi. Ở đây mình đặt thời gian hết hạn của TOKEN là 5 phút, và băm lại thông tin tương ứng của user và record của payment để kiểm tra tính hợp lệ của TOKEN.
 
 ****
 Cuối cùng là đến bước thanh toán sau khi thỏa mãn các điều kện trên, người dùng bấm vào nút thanh toán và hệ thống sẽ tự động trừ tiền trong ví
 ```Ruby
 def confirm_payment
    payment = Payment.find(params[:id])
    item = payment.item
    if token_expired(payment.token_created_at)
      @error = "Token expired"
    else
      my_wallet = current_user.wallets.first
      if !my_wallet.present?
        @error = "My wallet is blank. Please input money"
        return render "payment_complete"
      end
      new_cash = my_wallet.cash - payment.amount * payment.item.unit_price
      if new_cash < 0
        @error = "Your wallet does not have enough money"
        return render "payment_complete"
      end
      new_amount_item = item.amount - payment.amount
      ActiveRecord::Base.transaction do
        my_wallet.update_attributes(cash: new_cash)
        payment.update_attributes(status: "success")
        item.update_attributes(amount: new_amount_item)
        @success = "Payment Complete!!"
      end
    end
    render "payment_complete"
  rescue ActiveRecord::RecordInvalid
    @error = "Payment Not Complete"
    render "payment_complete"
  end
  ```
  Nếu user không muốn thanh toán thì method sau sẽ được thực hiện
  ```Ruby
  def reject_payment
    payment = Payment.find(params[:id])
    payment.update_column(:status, "reject")
    redirect_to root_path
  end
  ```
  *****
Về phần ```views``` thì các bạn có thể tùy biến theo ý thích, và đây là source code của mình các bạn có thể tham khảo [ở đây](https://github.com/iamPhong/qrCodeDemo)

#### Demo
Để cho trực quan thì mình sẽ kết nối điện thoại với host của rails ở trên máy tính, rất may là rails hỗ trợ điều này, chỉ cần máy tính và điện thoại bắt cùng 1 dải địa chỉ wifi, chúng ta chỉ cần kiểm tra địa chị của máy và chị server rails trên địa chỉ đó
![](https://images.viblo.asia/e5a34553-dcd1-4659-8aef-a5b89683167d.png)
Và đây là thành quả
![](https://images.viblo.asia/b18c662f-e5ae-46fa-accb-1a85737cb77d.png)
Thử mua một sản phẩm
![](https://images.viblo.asia/62ce3c45-9a9e-4c5d-bf11-68c6766dfdd1.png)
QRCode được tạo ra tương ứng
![](https://images.viblo.asia/596f442b-1101-4d53-9d46-52ca6f0d7256.png)

Bây giờ dùng điện thoại scan ta được
![](https://images.viblo.asia/a052d917-ac40-4fe5-b6b5-cca005025e1c.png)
Truy cập vào đường dẫn thì yêu cầu đăng nhập, đăng nhập xong nếu mã QR hợp lệ thì hiển thị hóa đơn
![](https://images.viblo.asia/e4b22a29-d082-4ddb-bd6b-3fc2d11d0394.png)
Không hợp lệ thì thông báo lỗi
![](https://images.viblo.asia/8ba40bdf-ff35-44d9-9cd8-ff1c332844d2.png)
Nhấn vào ```Confirm``` check lại điều kiện một lần nữa nếu hợp lệ thì trừ tiền, không hợp lệ thì báo lỗi
![](https://images.viblo.asia/a0850f9c-a111-4887-bb5b-2aa22f107c0f.png)

![](https://images.viblo.asia/7a7ef143-d974-4d8e-9b63-ba38c2dd4b18.png)

![](https://images.viblo.asia/04bce553-5ad9-4fd9-96a6-7178e21c4aa9.png)
****
Cuối cùng thì cũng xong :joy::joy:, bài viết này chỉ mang tính chất tìm hiểu cách thức hoạt động của việc thanh toán bằng QRCode, trên thực tế TOKEN được tạo ra để thanh toán phải do bên thứ 3 tin cậy giữa ngân hàng và ứng dụng được kết nối tạo ra, đồng thời còn vô số những chính sách bảo mật để tránh lộ lọt thông tin của khách hàng, vì vậy mà bài viết này chỉ để tham khảo, để ứng dụng vào thực tế thì còn rất nhiều điều cần cải thiện, hy vọng sẽ giúp ích được nhưng ai quan tâm đến mặt này của QRCode
****
Bài viết đến đây là hết cảm ơn các bạn đã đọc