Chắc hẳn những ai mà quan tâm đến ngôn ngữ ruby thì sẽ biết rằng cuối năm 2018 vừa qua(25/12) ruby team đã phát hành ruby version 2.6 với nhiều tính năng mới như tạo ra một số method mới, tối ưu hóa code, tăng perfomance.
## MJIT là gì?
MJIT viết tắt của "Method Based Just-In-Time Compiler".
Ruby compiles mã code của bạn thành **YARV instructions**, giúp code có thể chạy trên Ruby Virtual Machine.
Còn JIT thì thêm một lớp khác trước, nó sẽ phiên dịch các mã thành mã nhị phân đã được tối ưu hóa giúp cho code của bạn chạy nhanh hơn.
## Làm thế nào để sử dụng JIT
Bạn có thể sử dụng JIT với ruby 26. bằng cách thêm --jit vào lệnh run ruby file.
> ruby --jit app.rb

Ngoài ra ruby 2.6 còn hỗ trợ một số options khác giúp chúng ta có thể khám phá chính xác cách hoạt động của JIT bằng cách sử dụng lệnh:
> ruby --help

Dưới đây là danh sách một số options khác:
* --jit-wait
* --jit-verbose
* --jit-save-temps
* --jit-max-cache
* --jit-min-calls

Chúng ta sử dụng `--jit-wait` để chắc chắn rằng Ruby phải đợi đến khi phiên dịch JIT hoàn thành rồi mới run code. 

Dưới đây là lệnh để bạn thử:

```
ruby --disable-gems --jit --jit-verbose=1 --jit-wait -e "4.times { 123 }"
```

Kết quả ouput:

```
Successful MJIT finish
```

Sao nó đơn giản vậy nhỉ? Chỉ là một câu message thông báo success thôi hả. Không phải vậy đâu.
Bởi vì mặc định JIT chỉ hoạt động khi một method được gọi ít nhất 5 lần (`jit-min-calls`)

Bây giờ chúng ta thay đổi một chút câu lệnh phía trên và xem kết quả nhé

```
ruby --disable-gems --jit --jit-verbose=1 --jit-wait -e "5.times { 123 }"
```

Và kết quả thế nào đây?

```
JIT success (32.1ms): block in <main>@-e:1 -> /tmp/_ruby_mjit_p13921u0.c
```

Chúng ta cùng làm rõ những số liệu của kết quả trả về nào

* Thời gian compile: `31.1ms`
* Nó đã compile cái gì: `block in <main>`
* File đã generated: `/tmp/_ruby_mjit_p13921u0.c` giống như source cho lần compilation này

Tóm lại một chút để hiểu JIT hoạt động như thế nào:
1.  Đếm số lần method gọi
2.  Khi một method được gọi ít nhất 5 lần
3.  Một file C là được tạo sau khi compile thành công
4.  Compilation xảy ra trên nền tảng sử dụng trình biên dịch C giống như GCC
5.  Khi mà compile thành công thì tệp thư viện liên kết là được sử dụng khi method này được gọi

## MJIT có thực sự nhanh hơn không?
Mục đích của MJIT là làm cho ruby nhanh hơn. Dưới đây là bảng thống kê tốc độ xử lí của MJIT so với trình biên dịch của ruby

![](https://images.viblo.asia/8e05dd7c-f4a8-41b4-af84-291a5b80d50f.png)

Bảng trên cho ta thấy rằng perfomance là nhanh hơn rất nhiều nhưng vẫn còn một số nó bị giảm như `while with multiplication (Bignum)` và `string match`

Trên đây là một số kiến thức mình tìm hiểu được về MJIT, bài viết còn nhiều thiếu sót nhưng mình hy vọng nó có thể bổ ích cho mn.
Cảm ơn mn đã đọc.

Tài liệu tham khảo:
1. https://www.ruby-lang.org/en/news/2018/12/25/ruby-2-6-0-released/
2. https://www.rubyguides.com/2018/11/ruby-mjit/