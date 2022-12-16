Kích cỡ và vị trí của một element thường bị ảnh hưởng bởi containing block của nó. Thông thường, containing block của một element là phần content area của block-level element gần nhất trong cây tổ tiên của element đó, tuy nhiên luôn có những trường hợp ngoại lệ. Trong bài viết này, chúng ta sẽ cùng nhau đi tìm hiểu các nhân tố quyết định containing block của một element.

Khi trình duyệt dựng nên layout, nó tạo nên một box cho từng element. Mỗi box được chia thành 4 area:
1. Content area
2. Padding area
3. Border area
4. Margin area

![](https://images.viblo.asia/ac6edd82-d9f4-4b8e-897b-e4d7dc0a0dc2.png)

Rất nhiều người nhầm lẫn rằng containing block của một element luôn là content area của element cha, tuy nhiên điều này là không đúng trong nhiều trường hợp. Hãy cùng tìm hiểu cách xác định containing area của một element.

# 1. Ảnh hưởng của containing block

Trước khi tìm hiểu cách xác định containing block của một element, hãy cùng tìm hiểu các ảnh hưởng của containing block trước.

Kích cỡ và vị trí của một element thường bị ảnh hưởng bởi containing block. Các giá trị theo dạng phần trăm (%) mà áp dụng vào `width, height, padding, margin`, và thuộc tính offset của một absolute element được tính toán từ containing block của element.

# 2. Xác định containing block

Quá trình xác định containing block của một element được dựa vào thuộc tính position của element:

1. Nếu position của element có các giá trị là `static, relative, sticky` thì containing block sẽ là cạnh content area của block-level element gần nhất trong cây tổ tiên của element đang xét hoặc là một element tạo ra [formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context). 
2. Nếu position của element là `absolute` thì containing block sẽ là cạnh padding area của element gần nhất trong cây tổ tiên mà có giá trị thuộc tính position khác `static` (`fixed, relative, absolute, sticky`).
3. Nếu position của element là `fixed` thì containing block sẽ là view port của page area (toàn bộ phần hiển thị cho trang web)
4. Nếu position là absolute hoặc fixed thì containing block sẽ là cạnh padding area của tổ tiên gần nhất có tính chất sau:
    *     Giá trị thuộc tính `transform` hoặc `perspective` khác `none`
    *     Giá trị của `will-change` là `transform` hoặc `perspective`
    *     Giá trị của `filter` khác `none` hoặc giá trị của `will-change` là `filter` (chỉ có tác dụng trên firefox)
    *     Giá trị của thuộc tính `contain` là `paint`

# 3. Tính toán các giá trị phần trăm dựa trên containing block

Như đã đề cập ở trên, khi các giá trị của một vài thuộc tính được để dưới dạng phần trăm thì giá trị thực sự sẽ được dựa vào containing block của element đó. Các thuộc tính chịu tác động đó là các thuộc tính `box model` và `offset`:

1. Các thuộc tính `height, top, bottom` được tính toán dựa trên `height` của containing block.
2. Các thuộc tính `width, left, right, padding` và `margin` được tính toán dựa trên `width` của containing block.

# 4. Nguồn bài viết

https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block