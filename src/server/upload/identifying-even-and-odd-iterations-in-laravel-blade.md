# **1.Giới thiệu**

![](https://images.viblo.asia/c93200f7-5310-447f-9619-25a0cfc6f603.png)

 **Blade** là một templating engine đơn giản nhưng rất mạnh mẽ được tạo ra và đi cùng với Laravel. Không giống các templating engine khác, Blade không cấm bạn sử dụng PHP thuần trong view.
 
 Tất cả các views của **Blade** được compile thành mã PHP thuần và được cache lại cho tới khi bị chỉnh sửa, nghĩa là Blade về cơ bản không làm tăng thêm chi phí ban đầu nào trong ứng dụng. 
 
 **Blade** còn cung cấp cho chúng ta 1 tính năng khi làm việc với các cấu trúc vòng lặp đó là biến **$loop**. Biến này cung cấp cho chúng ta 1 số thông tin hữu ích như current loop index hay đây có phải phần tử first hay las trong vòng lặp

 Hôm nay tôi sẽ giới thiệu 1 chức năng khá hay và thú vị của **$loop** là **using even and odd flags**.
# **2.Bắt đầu**
Khi bạn apply 1 file HTML, CSS vào blade file đôi lúc bạn gặp các trường hợp  như cần kiểm tra tính chẵn lẽ của vòng lặp dữ liệu trả về để filter mã màu **background** hay 1 cái gì đó phù hợp với **designing UI** đã đề ra.

Trong view **Blade** của Laravel, một cách để đạt được điều này là chúng ta sẽ tùy biến code như sau:

```
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->iteration % 2 == 0)
            This is an even iteration
        @else 
            This is an odd iteration
        @endif
    @endforeach
@endforeach
```

Cú pháp như bạn có thể thấy, nó trông khá dày đặc và không chuyên nghiệp cho lắm. Nhưng, Laravel có một cái gì đó gọn gàng và tốt hơn để làm điều đó.

### Using even and odd flags

```
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->even)
            This is an even iteration
        @elseif ($loop->odd)
            This is an odd iteration
        @endif
    @endforeach
@endforeach
```
Ngoài ra biến $loop còn có rất nhiều thuộc tính hữu dụng khác:


![](https://images.viblo.asia/65ebe693-5380-4bef-8d11-a8499a22bb0e.png)

# **3.Kết luận**
Việc sử dụng **Blade** templete là một việc hết sức đơn giản và thuận tiện chính vì vậy nó đã làm tăng thêm rất nhiều sức mạnh cho larravel

Hy vọng bài viết giúp ích cho những ai cần, bạn cũng có thể tìm hiểu thêm các thuộc tính tiện lợi khác như vậy [tại đây](https://laravel.com/docs/5.8/blade#loops).