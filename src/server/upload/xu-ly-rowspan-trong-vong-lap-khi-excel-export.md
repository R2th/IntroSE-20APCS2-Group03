# 1. Vấn đề
Chắc hẳn trong đời lập trình viên ai cũng sẽ phải có 1 vài lần xử lý task liên quan đến xuất excel và gặp trường hợp cần merge rows hoặc columns ( rowspan or colspan ). Vậy hôm nay mình sẽ chia sẻ cách mình đã xử lý  excel export với trường hợp rowspan sử dụng framework Laravel
# 2. Giải pháp
## 2.1 Lavel Excel
Để có thể excel export với laravel thì chắc hẳn rồi chúng ta phải dùng đến Lavel Excel. Nhưng do đây không phải là *"nhân vật chính"* trong bài viết này nên mình xin phép bỏ qua phần chi tiết và đính kèm link docs cho những bạn cần [tìm kiểu thêm](https://docs.laravel-excel.com/2.1/getting-started/).
## 2.2 Bài toán đặt ra
Mình đang cần xuất 1 bản excel các đơn hàng và merge cột `order_id` đối với những dòng có trùng `order_id`

Đây là mảng orders của mình:

```
Array (
[0] => Array
    (
        [order_id] => 1374282003
        [status] => 1
        [mark] => Casio
        [model] => W-81
        [price] => 10.00
    )

[1] => Array
    (
        [order_id] => 1374282003
        [status] => 1
        [mark] => Casio
        [model] => W-81
        [price] => 10.00
    )

[2] => Array
    (
        [order_id] => 1374282573
        [status] => 1
        [mark] => Casio
        [model] => W-81
        [price] => 10.00
    )

[3] => Array
    (
        [order_id] => 1374282573
        [status] => 1
        [mark] => Casio
        [model] => W-81
        [price] => 10.00
    )

[4] => Array
    (
        [order_id] => 1374282573
        [status] => 1
        [mark] => Casio
        [model] => W-81
        [price] => 10.00
    )
```

Đây là mong muốn phần excel được in ra dưới dạng như này mình sẽ - *"trình bày dưới dạng html"*
```
<table>
<tr>
<td>Order</td>
<td>Product</td>
<td>Price</td>
<td>Status</td>
</tr>
<tr>
  <td rowspan="2">1374282003</td>
  <td>Casio</td>
  <td>10</td>
  <td>1</td>
</tr>
<tr>
  <td>Casio</td>
  <td>10</td>
  <td>1</td>
</tr>
<tr>
<td rowspan="3">1374282573</td>
  <td>Casio</td>
  <td>10</td>
  <td>1</td>
</tr>
<tr>
  <td>Casio</td>
  <td>10</td>
  <td>1</td>
</tr>
<tr>
  <td>Casio</td>
  <td>10</td>
  <td>1</td>
</tr>
</table>
```

## 2.3 Code như thế nào?
Oke! chúng ta có lẽ đến phần này là hiểu vấn đề bài toán cần làm gì rồi. Giờ bắt tay vào code thôi, Let's do it!

Đầu tiên ta cần khai báo 1 mảng rỗng mới, mục đích chính việc này là ta sẽ gom nhóm các phần tử trùng order_id vào mảng mới này đồng thời đếm được số phần tử trùng order_id luôn. Số đếm được ta sẽ đặt là biến `$rowspan`  và chỉ gán vào phần tử đầu tiên của mảng mới là thôi.
Oke mình giải thích ở trên có thể sẽ khiến nhiều bạn chưa hình dùng ra được nên mình sẽ để code ở dưới để các bạn có thể hiểu rõ ý mình hơn.
```
$orders = [
            0 => [
                'order_id'=> '1374282003',
                'status'=> 1,
                'mark'=> 'Casio',
                'model'=> 'W-81',
                'price'=> 10.00,
            ],
            1=> [
                'order_id'=> '1374282003',
                'status'=> 1,
                'mark'=> 'Casio',
                'model'=> 'W-81',
                'price'=> 10.00,
            ],
            2=> [
                'order_id'=> '1374282573',
                'status'=> 1,
                'mark'=> 'Casio',
                'model'=> 'W-81',
                'price'=> '10.00',
            ],
            3=> [
                'order_id'=> '1374282573',
                'status'=> 1,
                'mark'=> 'Casio',
                'model'=> 'W-81',
                'price'=> 10.00,
            ],
            4=> [
                'order_id'=> '1374282573',
                'status'=> 1,
                'mark'=> 'Casio',
                'model'=> 'W-81',
                'price'=> 10.00,
            ],
        ];

        $periods = [];
        
        // handle rowspan
        foreach($orders as $key => $period) {
            $data = $period->toArray();
            $data['rowspan'] = empty($data['order_id']) ? 1 : 0;
            $periods[$data['order_id']][] = $data;
            
           if (!empty($data['order_id'])) {
                $periods[$data['order_id']][0]['rowspan'] = count($periods[$data['order_id']]);
            }
        }
```

Bạn thấy đó code phía bên trên không hề có thuật toán phức tạp nào cả, cũng không cao siêu gì. Mọi thứ đều rất cơ bản
Và đây là kết quả của đoạn code trên:
![](https://images.viblo.asia/816f8a05-2ac1-4d6f-82d0-7531d0cc2732.png)

Giờ đoạn mảng mới đã đúng mong muốn rồi thì chỉ cần đổ ra blade view thôi. Đoạn này thì đơn giản hơn rồi, chỉ cần check biến `rowspan` > 1 thì sẽ thêm thuộc tính rowspan còn ngược lại mình đổ data ra như bình thường.
```
<tbody>
@foreach($periods as $period)
        @foreach($period as $row)
            <tr style="text-align: center; vertical-align: middle">
            
                @if ($row['rowspan'] > 0)
                <td @if($row['rowspan'] > 1) rowspan="{{ $row['rowspan'] }}" @endif>{{ $row['order_id'] }}</td>
                @endif
                
                <td>{{ $row['mark'] . $row['model'] }}</td>
                <td>{{ $row['price'] }}</td>
                <td>{{ $row['status'] }}</td>
            </tr>
        @endforeach
    @endforeach
</tbody>
```
# 3. Kết luận
Bài viết dựa trên những hiểu biết cá nhân nên không tránh khỏi những thiếu sót, mọi người có thắc mắc hay phản hồi gì thì hãy comment xuống bên dưới để mình có thể giải đáp cũng như bổ sung để bài viết được hoàn thiện hơn. Cảm ơn các bạn đã theo dõi bài viết.