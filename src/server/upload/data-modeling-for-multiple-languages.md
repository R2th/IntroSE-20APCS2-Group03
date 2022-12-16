Trong thời đại toàn cầu hóa này, các công ty - bao gồm cả các nhà phát triển phần mềm - luôn quan tâm đến việc mở rộng sang các thị trường mới, nâng cao doanh thu. Điều này thường có nghĩa là nội địa hóa sản phẩm của họ cho các khu vực khác nhau. Trong bài viết này, mình sẽ giải thích một vài cách tiếp cận để thiết kế mô hình cơ sở dữ liệu của phục vụ cho việc tạo ra một website sử dụng nhiều ngôn ngữ (đa ngôn ngữ),  giúp trang web của bạn mang tầm vóc "quốc tế" hơn :D
## Cách tiếp cận thứ nhất - Thêm các cột ngôn ngữ riêng biệt cho từng trường dự định
Đây là cách tiếp cận đơn giản nhất về mặt phát triển. Nó có thể được thực hiện bằng cách thêm một cột ngôn ngữ cho mỗi trường.
![](https://images.viblo.asia/8ecddf22-06c2-4afc-932a-33f8a15dd9e2.jpg)

### Ưu điểm:
* Dễ hiểu, dễ thực hiện.
* Không phức tạp trong việc viết SQL để lấy dữ liệu bằng bất kỳ ngôn ngữ nào. Giả sử mình muốn viết một truy vấn để lấy thông tin chi tiết về sản phẩm và khách hàng cho một đơn hàng cụ thể bằng tiếng Pháp. Đoạn code query dữ liệu sẽ như thế này:
```
Select p.product_name_FR, p.description_FR, p.price, 
       c.name_FR, c.address_FR, c.contact_name 
from order_line o, product p, customer c
    Where o.product_id = p.id and o.customer_id = c.id
    And id = <order number>;

```
### Nhược điểm:
* Không có khả năng mở rộng (khả năng scale up thấp): mỗi khi một ngôn ngữ mới được thêm vào, hàng chục cột bổ sung cần được thêm vào giữa các bảng, khá là rắc rối.
* Có thể gây tốn thời gian, đặc biệt nếu lĩnh vực cần phải có nhiều ngôn ngữ.
* Việc các câu query dữ liệu được các developer backend viết dựa vào các ngôn ngữ sẵn có và được fixed cứng nên mỗi lần có thêm ngôn ngữ mới thì developer backend lại phải vào sửa lại code query data
Câu lệnh query data sẽ có kiểu như sau:
```
SELECT CASE @in_language 
              WHEN ‘FR’ THEN p.product_name_FR
              WHEN ‘DE’ THEN p.product_name_DE
              DEFAULT THEN p.product_name_EN,
           p.price,
          CASE @in_language 
              WHEN ‘FR’ THEN c.name_FR
              WHEN ‘DE’ THEN c.name_DE
              DEFAULT THEN c.name_EN,
          c.contact_name
FROM order_line o, product p, customer c
    WHERE o.product_id = p.id AND o.customer_id = c.id
    AND id = <order number>;
```
Khi thêm một cột mới cho một ngôn ngữ mới, giả sử thêm tiếng Việt Nam, developer backend lại phải sửa code lại như sau:
```
SELECT CASE @in_language 
              WHEN ‘FR’ THEN p.product_name_FR
              WHEN ‘DE’ THEN p.product_name_DE
              WHEN ‘VI’ THEN p.product_name_VI
              DEFAULT THEN p.product_name_EN,
           p.price,
          CASE @in_language 
              WHEN ‘FR’ THEN c.name_FR
              WHEN ‘DE’ THEN c.name_DE
              WHEN ‘VI’ THEN c.name_VI
              DEFAULT THEN c.name_EN,
          c.contact_name
FROM order_line o, product p, customer c
    WHERE o.product_id = p.id AND o.customer_id = c.id
    AND id = <order number>;
```
## Cách tiếp cận thứ hai - Tạo một bảng riêng biệt cho văn bản cần được dịch
![](https://images.viblo.asia/67cad8d7-a481-4707-a2bc-40e4fba6fd54.jpg)
Trong cách tiếp cận này, một bảng riêng biệt được sử dụng để lưu trữ văn bản dịch; trong ví dụ dưới đây, mình gọi nó là bảng translation. Bảng này chứa mỗi cột cho mỗi ngôn ngữ. Giải pháp này là một trong những cách rõ ràng nhất về cấu trúc cơ sở dữ liệu. Tất cả những nội dung cần dịch trong một bảng, nó phù hợp với những web động mà có số lượng ngôn ngữ lớn hoặc có số lượng ngôn ngữ cố định và trong tương lại sẽ thêm ngôn ngữ mới.
### Ưu điểm:
* Đây là một cách tiếp cận tốt nếu thực hiện trên một mô hình dữ liệu hiện có.
* Một cột bổ sung duy nhất trong bảng translation thay đổi chỉ khi một ngôn ngữ mới được thêm vào.
* Khi văn bản gốc giống nhau trên các bảng, không sinh ra các record dịch thừa. Ví dụ: giả sử tên khách hàng và tên sản phẩm giống hệt nhau. Trong trường hợp này, chỉ một bản ghi sẽ được chèn vào bảng dịch và cùng một bản ghi được truy xuất đến trong cả bảng khách hàng và sản phẩm.
### Nhược điểm:
* Có thể sinh ra các NULL không cần thiết trong bảng. Tưởng tượng xem nhé:  bạn có tầm 1.000 trường chỉ hỗ trợ bản dịch cho mỗi tiếng Pháp mà thôi, bạn sẽ tạo ra 1.000 bản ghi mà các fields của ngôn ngữ khác tiếng Pháp bị NULL
* Khó sửa chữa: bạn cần phải truy vấn tất cả các bảng để thhao tác thêm sửa xóa
* Tất cả ngôn ngữ nằm ở một bảng: nếu bảng bị lỗi thì dẫn đến tất cả dữ liệu đều bị lỗi
* Truy vấn phức tạp: bạn cần phải join rất vất vả để lấy được ngôn ngữ, và tất nhiên điều này cũng ảnh hưởng đến performance chung của hệ thống, một điều hết sức tối kị

```
SELECT CASE @in_language 
              WHEN ‘FR’ THEN tp.text_FR
              WHEN ‘DE’ THEN tp.text_DE
              DEFAULT THEN p.product_name_EN,
           p.price,
          CASE @in_language 
              WHEN ‘FR’ THEN tc.text_FR
              WHEN ‘DE’ THEN tc.text_DE
              DEFAULT THEN c.name_EN,
          c.contact_name
FROM order_line o, product p, customer c, translation tp, translation tc
    WHERE o.product_id = p.id AND o.customer_id = c.id
    AND p.name_translation_id = tp.id
    AND c.name_translation_id = tc.id
    AND id = <order number>;
```

### Một biến thể của cách tiếp cận theo bảng dịch:
Để có hiệu suất tốt hơn khi truy xuất vào văn bản dịch, chúng ta có thể chia bảng translation thành nhiều bảng nhỏ. Chúng ra có thể nhóm các bản ghi, ví dụ một bảng cho customer, một bảng khác cho product, như thế này nhé:
![](https://images.viblo.asia/5c9ddf67-e1d7-4163-a8f7-c9192be23c56.jpg)
## Cách tiếp cận thứ ba - Bảng translation có hàng riêng biệt cho mỗi ngôn ngữ (mỗi hàng một ngôn ngữ)
Cách tiếp cận này khá giống với cách tiếp cận thứ hai, nhưng nó lưu trữ các giá trị cho văn bản dịch theo hàng thay vì cột. 
![](https://images.viblo.asia/d63990ce-e810-4f7e-8c0a-7a3afb8a456c.jpg)
### Ưu điểm:
* Rõ ràng: có quan hệ với nhau
* Dễ dàng thêm ngôn ngữ mới: không cần bạn phải thêm column vào bảng
* Các column dữ nguyên tên: không cần phải thêm hầu tố "_lang" vào sau column
* Truy vấn dễ: đơn giản, bạn chỉ cần join là xong.
### Nhược điểm: 
* Số lượng bảng tăng lên: Tất nhiên rồi, nếu bạn tạo các bảng đa ngôn ngữ cho tất cả các bảng thì số lượng bảng sẽ tăng lên

Như vậy là qua bài viết này, mình đã giới thiệu tổng quan về các cách tiếp cận xây dựng CSDL phục vụ đa ngôn ngữ. Chúc các bạn thành công!
À , nguồn tham khảo ở [đây nhé](https://www.vertabelo.com/blog/technical-articles/data-modeling-for-multiple-languages-how-to-design-a-localization-ready-system)