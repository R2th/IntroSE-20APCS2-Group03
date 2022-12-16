Khi làm việc với việc tính toán số, nhất là với tài chính hoặc tiền, độ chính xác là vô cùng quan trọng. Thậm chỉ dù là sai số quá ít cũng gây ra độ lệnh lớn khi số tiền đó càng lớn. Thông thường bạn hay dùng `float` hoặc `double` để làm data type. Nhưng bạn có đề ý về việc sai lệnh khi sử dụng data type này không? 

```ruby
0.1 + 0.2 = 0.30000000000000004
1.2 + 1.9 = 3.0999999999999996
1.2 - 1.0 = 0.19999999999999996
3.19 + 8.2 == 11.389999999999999
5.89 + 2.07 == 7.959999999999999
3.26 + 5.12 == 8.379999999999999
...
```

 Vấn đề này được gọi là Floating-point error.  Ngôn ngữ lập trình nào cũng đều gặp floating-point error này. 
 Bạn có thể xem các ví dụ dưới này:
 
 https://github.com/ellenaua/floating-point-error-examples/tree/master/examples
 
Vậy bạn nên nhớ rằng: **Đừng sử dụng floating point number với tiền.**
 
 Vậy nên giải quyết như thế nào?
 
##  Solution
### 1. Dùng kiểu dữ liệu  DECIMAL trong database
Để đảm bảo độ chính xác trong database, trong MySQL, bạn nên sử dụng kiểu dữ liệu `DECIMAL`. 
DECIMAL có 2 phần: `precision` và `scale`. 
Để đảm báo độ lệnh ít nhất trong việc tính toán, bạn nên để scale: 4

```ruby
class CreatePayment < ActiveRecord::Migration[5.2]
  def change
    create_table :payments do |t|
      t.decimal :amount, precision: 19, scale: 4
      t.timestamps
    end
  end
end
```

Nếu bạn check trong database sẽ có kiểu dữ liệu `DECIMAL(19, 4)`

Rails sẽ tạo column :amount với kiểu DECIMAL. Vậy lúc lưu vào, lấy ra, hoặc tính toán trong MySQL nó cũng dùng kiểu DECIMAL.  

```ruby
Payment.create! amount: 10.5
amount = Payment.first.amount # Result: 0.105e2
amount.to_f # Result: 10.5
```

### 2. Dùng BigDecimal() lúc tính toán
 Phần trên, data đã là kiểu DECIMAL trong database rồi, lúc tính toán trong database thì không phải là vấn đề nữa. Nhưng sau khi lấy ra và phải tính toán hoặc tính toán số ở ngoài, bạn phải convert số đó thành DECIMAL đã rồi mới tính toán. Trong Ruby có hàm `BigDecimal() `bạn có thể dùng được. 
 
 Bạn xem ví dụ sau đây: 
 
```ruby
1.2 + 1.9
=> 3.0999999999999996

total = BigDecimal("1.2") + BigDecimal("1.9")
=> 0.31e1

total.to_f 
=> 3.1

1.2 - 1.0 
=> 0.19999999999999996

amount = BigDecimal("1.2") - BigDecimal("1.0")
=> 0.2e0

amount.to_f
=> 0.2

...

```

Ngôn ngữ lập trình nào cũng có hàm hoặc lib để bạn có thể dùng để tính toán decimal. Như trong javascript, bạn có thể dùng:  [numeral.js](http://numeraljs.com/)  hoặc [big.js](https://github.com/MikeMcl/big.js/) hoặc [bigdecimal.js](https://github.com/MikeMcl/bignumber.js/) , ...

**Ví dụ numeral.js**

Bạn có thể dùng các hàm của nó để tình toán:
```js
.add()
.subtract()
.multiply()
.divide()
```

**Ví dụ**

```js
1.2 + 1.9
=> 3.0999999999999996

numeral(1.2).add(1.9).value()
=> 3.1

1.2 - 1.0
=> 0.19999999999999996

numeral(1.2).subtract(1.0).value()
=> 0.2
```
lib khác cũng tương tự, bạn có thể vào xem chi tiết trong github của nó. 

## Kết luận:
Vấn đề về Floating-point number này là rất nguy hiểm và hay gặp với các ngôn ngữ lập trình. Nếu bạn không đề ý sẽ gây ra lỗi sai lệnh lớn. Bài này sẽ giúp bạn chú ý hơn trong khi làm dự án tính toán số, nhất là với tài chính, tiền, ... 

References:

https://spin.atomicobject.com/2014/08/14/currency-rounding-errors/

https://millarian.com/rails/precision-and-scale-for-ruby-on-rails-migrations/

http://numeraljs.com/

https://github.com/MikeMcl/big.js/

https://github.com/MikeMcl/bignumber.js/