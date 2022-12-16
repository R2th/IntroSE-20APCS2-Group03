Gần đây, Charlotte không thể đến phòng tập thể dục, vì cô ấy đang đang phải ở nhàn do Covid-19. Cô ấy đang cố gắng chống đẩy nhiều lần và luôn ghi chép cẩn thận về số lần chống đẩy mà mình thực hiện mỗi ngày. Tổng số lần chống đẩy của mỗi ngày đã được thêm vào một mảng Ruby:
 
```
daily_push_up_totals = [10, 15, 25, 27, 30, 50, 55, 55, 60, 62, 62, 65, 65, 66]
```
 
 Charlotte muốn biết hai điều: tổng số lần chống đẩy mà cô ấy thực hiện mỗi tuần và số lần chống đẩy tăng lên giữa hai ngày liên tiếp nhiều nhất.

Để tính tổng số lần chống đẩy mà Charlotte đã thực hiện mỗi tuần, cách tiếp cận đầu tiên sẽ là sử dụng each_slice. Phương thức Array này chia mảng thành các phần  và truyền từng phần cho block. Số lượng giá trị trong mỗi phần được chuyển vào dưới dạng tham số. Ví dụ:

```
daily_push_up_totals.each_slice(7) { |week_totals| print weekly_totals }
```

Kết quả sẽ là:

```
daily_push_up_totals.each_slice(7) { |week_totals| puts "Weekly total: #{week_totals.sum} }
```

Chúng ta đã chia mảng thành các phần có bảy phần tử, vì vậy tất cả những gì chúng ta cần làm để có được tổng số lần chống đẩy hàng tuần là cộng từng phần bằng cách sử dụng `sum`:

```
daily_push_up_totals.each_slice(7) { |week_totals| puts "Weekly total: #{week_totals.sum} }
```

Kết quả là:

```
    Weekly total: 212
    Weekly total: 445
```

Vậy làm thế nào chúng ta có thể tìm ra số lần chống đẩy tăng lên giữa hai ngày liên tiếp nhiều nhất của Charlotte? Hãy thử sử dụng each_cons. Phương thức Array này cung cấp cho block có sẵn n phần tử liên tiếp, bắt đầu từ phần tử đầu tiên và lần lượt lần lượt. Một ví dụ sẽ làm rõ hơn:

```
daily_push_up_totals.each_cons(2){ |values| print values }
```

Sẽ trả về:

```
 [10, 15][15, 25][25, 27][27, 30]...
```

Do đó, việc tính toán số lần chống đẩy tăng lên giữa hai ngày liên tiếp nhiều nhất là một trường hợp tìm kiếm sự khác biệt giữa từng cặp tổng hàng ngày này và tìm ra giá trị lớn nhất:

```
daily_push_up_totals.each_cons(2).map{ |day1, day2| day2 - day1 }.max
```

Chúng ta đã hoàn tất - Charlotte từ bây giờ sẽ có thể theo dõi tiến trình tập thể dục của mình bất kể việc dãn cách diễn ra bao lâu.

Nguần dich [ở đây](https://www.scotlandis.com/blog/exercising-during-lockdown-a-look-at-rubys-array-each_cons-and-each_slice-methods/)