Đoạn code `['1', '7', '11'].map(parseInt)` không thực hiện như mong muốn bởi `.map` gửi 3 arguments vào trong hàm `parseInt` trên mỗi record. Giá trị thứ 2 của argument truyền vào `parseInt` được tính như một radix  parameter (ví dụ parseInt('123', 10)). Vì vậy nên mỗi record string trong mảng được parse với các radix khác nhau. 7 radix = 1 `parseInt(7, 1)`  = NaN, 11 radix = 2 `parseInt(11, 2)` = 3, 1 thì vẫn sẽ parse đúng bởi mặc định parseInt radix đã bằng 0. 0 cũng là một falsy

Một cách xử lý vấn đề này là sử dụng đoạn code `['1','7','11'].map(v => parseInt(v)`, hoặc với lodash `_.map(['1','7','11'], _.parseInt)`

Bài viêt hơi ngắn nhưng bạn cũng có thể biết thêm một cái mới từ javascript, chờ một bài TIL sau của mình nhé ^^