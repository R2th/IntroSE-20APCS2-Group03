## Giới thiệu
Bài viết giới thiệu cách tạo một giao dịch Bitcoin với [helloblock.io API](https://helloblock.io). Quá trình gồm 2 bước, đầu tiên là tạo giao dịch với [bitcoin-ruby](https://github.com/lian/bitcoin-ruby) gem, sau đó thực hiện giao dịch trong mạng thanh toán Bitcoin.

## Tạo địa chỉ testnet3 bitcoin
Tất nhiên chúng ta sẽ không dùng Bitcoin thật. Vì thế, cần thiết lập 1 mạng thanh toán ảo, ở đây dùng testnet3. Trước tiên, dùng gem [Bitcoin-ruby](https://github.com/lian/bitcoin-ruby) để tạo địa chỉ ví bitcoin.

```
require 'bitcoin'
Bitcoin.network = :testnet3
private_key, public_key = Bitcoin::generate_key
address = Bitcoin::pubkey_to_address(public_key)
```

Giả sử tạo ra các địa chỉ sau:

```
address = 'mmp6qqAJN5Wkd58vBqtgMLgK3zeozx1GSX'

priv_key = '11deaf5ce854908762a80f1dc5fcee8c4126a9288b999725e730eb5ccd6ef9e0'
publ_key = "0400ce81e03a167efc8277c3f39b9aef2c36d22cef0c82c996e862caa6b3a404f4034dddaf37c2686aabfb5e12780b06ef93a53a290029ed99c986f7d9c526acf2"
```

Đã có địa chỉ, giờ muốn tạo giao dịch gửi tiền tất nhiên là phải có tiền, lấy bitcoin miễn phí tại đây [Testnet3 Fauet](http://tpfaucet.appspot.com/).

## Tạo giao dịch
Để tạo một giao dịch mới, cần phải xác định được coin sẽ được chuyển từ đâu đến đâu. Trong khối `bitcoin-ruby builder` dưới đây, chúng ta có một thao tác đơn giản gồm một input và một output. Input bao gồm các giao dịch trước đó (lấy bitcoin). Input cũng phải có khoá để mở. Không có khoá bạn không thể chuyển các bitcoins.

Output đơn giản bao gồm số coin và kịch bản được sử dụng để mở khóa. Thông thường, kịch bản đơn giản là một kiểm tra xem khóa tương ứng với địa chỉ hay không. Nhưng có thể tạo kịch bản phức tạp hơn như là tạo ra đa chữ kí. Coin sẽ không trực tiếp được gửi từ input đến output mà phải thông qua trung gian là ví của bạn, điều này giúp giảm thiểu nguy cơ mất tiền oan.

```
require 'bitcoin'
include Bitcoin::Builder

new_tx = build_tx do |t|
  t.input do |i|
    # i.prev_out prev_tx
    i.prev_out prev_transaction
    i.prev_out_index prev_out_index
    i.signature_key key
  end
  t.output do |o|
    o.value 20000000 # 0.2 BTC, denominated in satoshi
    o.script {|s| s.type :address; s.recipient addr }
  end
end
```

## Cách tìm các giao dịch chưa định hướng
Để thực hiện giao dịch trên testnet, ta sử dụng `helloblock.io` và gem của nó. Trước tiên, tôi mô tả cách để sử dụng api, trước khi đi vào vấn đề chính là thực hiện giao dịch.

```
require 'helloblock'
HelloBlock.network = :testnet # or :mainnet
HelloBlock::Address.find('mmp6qqAJN5Wkd58vBqtgMLgK3zeozx1GSX')
# to get the balance
HelloBlock::Address.find('mmp6qqAJN5Wkd58vBqtgMLgK3zeozx1GSX')["data"]["address"]["balance"]
# or
HelloBlock::Address.find('mmp6qqAJN5Wkd58vBqtgMLgK3zeozx1GSX')["data"]["address"]["confirmedBalance"]
```
Để tạo ra một giao dịch, bạn cần phải tìm các kết quả đầu ra chưa được định hướng vào địa chỉ của bạn. 
Với `helloblock` bạn tìm thấy những điều này với:

`HelloBlock::Address.find('mmp6qqAJN5Wkd58vBqtgMLgK3zeozx1GSX').unspents`
Dữ liệu quan trọng trích xuất từ `unspents` chính là id giao dịch:

`transaction_hashes = HelloBlock::Address.find('mmp6qqAJN5Wkd58vBqtgMLgK3zeozx1GSX').unspents["data"]["unspents"].map{|x| x["txHash"]}`

## Giao dịch
Bây giờ đã có coin đầu vào chúng ta có thể tiêu, có thể tạo ra giao dịch thực sự. Giả sử có đủ bitcoins có sẵn từ giao dịch đầu tiên.

```
require 'bitcoin'
require 'helloblock'
require 'open-uri'

Bitcoin.network = :testnet3

# Let's first define a methdo to build up the transaction
def build_transaction(prev_tx, prev_out_index, key, value, addr)
  include Bitcoin::Builder
  new_tx = build_tx do |t|
    t.input do |i|
      # i.prev_out prev_tx
      i.prev_out prev_tx
      i.prev_out_index prev_out_index
      i.signature_key key
    end
    t.output do |o|
      o.value value # 0.49 BTC, leave 0.01 BTC as fee
      o.script {|s| s.type :address; s.recipient addr }
    end
    t.output do |o|
      o.to "ebbe", :op_return
      o.value 0
    end
  end
end

# Function to convert the binary representation to hex
def bin_to_hex(s)
  s.unpack('H*').first
end

priv_key = '11deaf5ce854908762a80f1dc5fcee8c4126a9288b999725e730eb5ccd6ef9e0'
publ_key = "0400ce81e03a167efc8277c3f39b9aef2c36d22cef0c82c996e862caa6b3a404f4034dddaf37c2686aabfb5e12780b06ef93a53a290029ed99c986f7d9c526acf2"
address = 'mmp6qqAJN5Wkd58vBqtgMLgK3zeozx1GSX'
key = Bitcoin::Key.new(priv_key, publ_key)
unspents = HelloBlock::Address.find(address).unspents["data"]["unspents"]

# And we take the first input, assuming it has enough bitcoins transfered to us
tx_hash = unspents.first["txHash"]
tx_value = unspents.first["value"]
tx_index = unspents.first["index"]

query = open("http://test.webbtc.com/tx/#{tx_hash}.json")
prev_tx = Bitcoin::P::Tx.from_json(query)

# We simply make a transaction, where all funds are transfered back to our address
tx = build_transaction(prev_tx, tx_index, key, tx_value, address)

puts tx.to_json
tx_bin = tx.to_payload

# tx_hex = bin_to_hex(tx.to_payload)
# res = HelloBlock::Transaction.propagate(tx_hex)
# res = Bitcoin::Protocol::Tx.new(tx_hex)
# puts res
# curl -d 'tx_hex=' https://chain.so/api/v2/send_tx/DOGE

require 'rest_client'
response = RestClient.post "https://chain.so/api/v2/send_tx/BTCTEST", :tx_hex => tx_hex
if response.code == 200 then
  content = JSON.parse response.to_str
  puts content
else
  puts "Error"
  puts response: response
end

response = RestClient.get "https://chain.so/api/v2/get_tx/BTCTEST/#{tx.hash}"
if response.code == 200 then
  content = JSON.parse response.to_str
  puts content
else
  puts "Error"
  puts response: response
end


# require 'net/http'
# params = {'tx_hex' => tx_hex}
# url = URI.parse('https://chain.so/api/v2/send_tx/BTCTEST')
# resp, data = Net::HTTP.post_form(url, params)
# puts resp.inspect
# puts data.inspect
```
Nếu bị lỗi `NoMethodError: undefined method `bytesize’ for nil:NilClass``, 
rất có thể bạn quên thêm config` Bitcoin.network =: testnet3`. Tôi đã mất khá nhiều 
thời gian để tìm ra lỗi này.

Bonus: Làm thế nào để lấy được rate hiện tại
```
uri = URI("http://openexchangerates.org/api/latest.json?app_id=#{BitcoinPayable.config.open_exchange_key}")
response = JSON.parse(Net::HTTP.get(uri))
response["rates"]
```

Nguồn: [DenDeer](http://www.dendeer.com/post/bitcoin/)