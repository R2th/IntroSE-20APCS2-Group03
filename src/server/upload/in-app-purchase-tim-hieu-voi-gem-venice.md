Venice là một gem rất hữu ích, đơn giản để xác minh hóa đơn mua hàng trong ứng dụng của Apple và truy xuất thông tin liên quan đến dữ liệu biên nhận(đại loại như hóa đơn hay biên lai).

Có hai lý do tại sao bạn nên xác minh biên nhận mua hàng trong ứng dụng trên máy chủ: 
* Thứ nhất, nó cho phép bạn lưu giữ hồ sơ mua hàng trong quá khứ của riêng bạn, rất hữu ích cho các số liệu cập nhật và phân tích lịch sử.
* Thứ hai, xác minh phía máy chủ qua SSL là cách đáng tin cậy nhất để xác định tính xác thực của hồ sơ mua.

Xem Hướng dẫn lập trình xác nhận biên lai của Apple để biết thêm thông tin.
Xem thêm [Receipt Validation Programming Guide](https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Introduction.html) của Apple để biết thêm thông tin.
> Venice được đặt tên cho Venice Italy — hoặc cụ thể hơn [The Merchant of Venice](http://en.wikipedia.org/wiki/The_Merchant_of_Venice) của Shakespeare. Nó là một phần trong một loạt các tiện ích lệnh(commands) mang tầm thế giớidành cho cho phát triển iOS. Bao gồm: [Cupertino](https://github.com/mattt/cupertino) (quản lý Apple Dev Center), [shenzhen](https://github.com/mattt/shenzhen) (Building & Distribution), [Houston](https://github.com/mattt/houston) (Push Notifications), [Dubai](https://github.com/mattt/dubai) (Passbook pass generation), và [Nashville](https://github.com/nomad/nashville) ( iTunes Store API).

## Cài đặt
`$ gem install venice`

hoặc cài đặt trong gem file rồi chạy bundle install.

## Sử dụng
### Cơ bản
```
require 'venice'

data = '(Base64-Encoded Receipt Data)'
if receipt = Venice::Receipt.verify(data)
  p receipt.to_h

  # You can refer an original JSON response via a Receipt instance.
  case receipt.original_json_response['status'].to_i
    when 0     then foo
    when 21006 then bar
  end
end
```

### Dành cho tự động tạo theo định kỳ(subcription)
```
require 'venice'

data = '(Base64-Encoded Receipt Data)'

# You must pass shared secret when verification on Auto-Renewable
opts = { shared_secret: 'your key' }

if receipt = Venice::Receipt.verify(data, opts)
  # Renewed receipts are added into `latest_receipt_info` array.
  p receipt.latest_receipt_info.map(&:expires_at)
  # => [2016-05-19 20:35:59 +0000, 2016-06-18 20:35:59 +0000, 2016-07-18 20:35:59 +0000]
end
```

## Thao tác với command lines
Venice cũng đi kèm với iap binary, cung cấp một cách thuận tiện để xác minh biên nhận từ command line.
```
$ iap verify /path/to/receipt

+--------------------------------+------------------------------------+
|                               Receipt                               |
+--------------------------------+------------------------------------+
| adam_id                        | 664753504                          |
| application_version            | 123                                |
| bundle_id                      | com.example.product                |
| download_id                    | 30000000000005                     |
| expires_at                     |                                    |
| latest_receipt                 |                                    |
| original_application_version   | 123                                |
| original_purchase_date         | Fri, 07 Mar 2014 20:59:24 GMT      |
| receipt_type                   | Production                         |
| receipt_created_at             | Mon, 23 Jun 2014 17:59:38 GMT      |
| requested_at                   | Mon, 23 Jun 2014 17:59:38 GMT      |
+--------------------------------+------------------------------------+
| in_app                         | 1                                  |
|  - app_item_id                 |                                    |
|  - cancellation_at             |                                    |
|  - expires_at                  |                                    |
|  - original_purchase_date      |                                    |
|  - original_transaction_id     | 1000000000000001                   |
|  - product_id                  | com.example.product                |
|  - purchase_date               |                                    |
|  - quantity                    | 1                                  |
|  - transaction_id              | 1000000000000001                   |
|  - web_order_line_item_id      | 1000000000000001                   |
|  - version_external_identifier |                                    |
|  - is_trial_period             | true                               |
|  - is_in_intro_offer_period    | true                               |
+--------------------------------+------------------------------------+
```