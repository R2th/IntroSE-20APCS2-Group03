## Introduction
![](https://images.viblo.asia/7a4f5c24-5291-42ee-ae94-dfe6c3396b1c.png)

**Truth table** là một trong những cách để định nghĩa và kiểm tra luồng hoạt động của code. **Truth table** sử dụng các functions của hệ thống như một `black box`, với giá trị input và output chuẩn xác tuyệt đối. **Ruby Hash** cũng có thể được sử dụng để làm **Truth table**, nhận giá trị input đầu vào, và output chính xác đầu ra, có ý nghĩa như một bảng chân lý.
## Implement
Giả sử như chúng ta có bài toán: viết một hàm in ra số ngày trong tháng với tham số truyền vào là năm và tháng.

Chúng ta đều biết rõ tháng nào có 30 và 31 ngày, trừ tháng 2. Tháng 2 thường có 28 ngày, ngoại trừ năm nhuận sẽ là 29. Có 1 số điều kiện để xác định năm nhuận:
* số năm chia hết cho 4 => là năm nhuận
* Nếu số năm chia hết cho 100, năm đó không phải là năm nhuận và ngược lại
* số năm chia hết cho 400 => là năm nhuận

Tổng hợp lại ta được:

* số năm chia hết cho 4 nhưng không chia hết cho 100 => là năm nhuận
* số năm chia hết cho 4, 100 và 400 => là năm nhuận

Ta được bảng sau:

| Month | Year | Days |
| -------- | -------- | -------- |
| jan, mar, may, jul, aug, oct, dec     | Any     | 31     |
| apr, jun, sep, nov     | Any     | 30     |
| feb     | year % 4 != 0     | 28     |
| feb     | (year % 4 == 0) && (year % 100 != 0)    | 29     |
| feb     | (year % 4 == 0) && (year % 100 == 0) && (year % 400 != 0)     | 28     |
| feb     | (year % 4 == 0) && (year % 100 == 0) && (year % 400 == 0)     | 29     |

Giờ chúng ta có thể sử dụng lồng các đk `ìf else` hoặc `case` để implement bảng ở trên. Tuy nhiên chúng ta cũng có thể sử dụng `Hash` để làm việc này, biến chúng trở thành một **Truth Table**:

```ruby
def month_days(year, month)
    h = {
        %w(jan mar may jul aug oct dec) => 31,
        %w(apr jun sep nov) => 30,
        %w(feb) => ((year % 4 == 0) && (year % 400 == 0)) ||
                    ((year % 4 == 0) && (year % 100 != 0)) ?
                    29 : 28
    }
    # find the Hash key the includes the required month, return its value 
    h.select {|k, v| k.include? month}.values
end
```

Ta sử dụng mảng dưới vai trò là Hash keys, và sử dụng toán tử 3 ngôi (ternary operator) là value của `february` key, giá trị output sẽ là value của Hash key tương ứng với giá trị đầu vào:

```
$> puts month_days 1900, 'feb'
=> 28
$> puts month_days 2000, 'feb'
=> 29
$> puts month_days 1900, 'sep'
=> 30
```

## Summary
Bài viết nhằm chia sẻ về việc ứng dụng ruby `Hash` dưới vai trò như một **Truth table**, bài viết còn nhiều thiếu sót, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn: https://dev.to/redfred7/truth-tables-as-ruby-hashes-18e0