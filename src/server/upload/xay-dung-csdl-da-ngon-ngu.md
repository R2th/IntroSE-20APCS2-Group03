*Trong kỷ nguyên toàn cầu hóa này, các công ty - bao gồm các nhà phát triển phần mềm - luôn quan tâm đến việc mở rộng sang các thị trường mới. Điều này thường có nghĩa là nội địa hóa sản phẩm của họ cho các khu vực khác nhau. Trong bài viết này, Mình sẽ giới thiệu một vài cách để xử lý vấn đề này. Cụ thể với việc quản lý nội dung bằng nhiều ngôn ngữ.*

## Bản địa hóa là gì?

Localization là một mục tiêu được hướng đến của rất nhiều công ty về thương mại, dịch vụ,... hay thậm chí nó còn được gọi với cụm từ "Giữ gìn bản sắc" ở trên những kênh truyền hình. Ví dụ cụ thể nhất mà bạn có thể thấy chính là chinatown, nhưng những thứ này không thuộc lĩnh vực của bài viết và tầm hiểu biết của mình. Nên có thể rút gọn về bản địa hóa trong dịch vụ CNTT như sau:

- Bản địa hóa là quá trình thích ứng một sản phẩm với các thị trường khác nhau. Đó là một yếu tố nổi bật để đạt được thị phần tối đa về mặt doanh số sản phẩm. Khi nội địa hóa được thực hiện chính xác, người dùng sẽ cảm thấy rằng sản phẩm được sản xuất cho ngôn ngữ, văn hóa và nhu cầu của họ.
- Ở những nơi tiếng Anh không phải là ngôn ngữ phổ biến, các cuộc khảo sát đã chứng minh rằng ngôn ngữ địa phương luôn được ưu tiên hơn nhiều cho một sản phẩm phần mềm. **[Tham khảo](https://www.mediapost.com/publications/article/155250/how-foreign-language-internet-strategies-boost-sal.html#axzz2NQz3wvBT)**

## Các cách xây dựng CSDL phục vụ Localization.

- Để thực hiện bài viết này mình cần 2 thứ đó là ý tưởng thực hiện và 1 demo về csdl để thể hiện nó một cách hiệu quả nhất
- Giả sử chúng ta được yêu cầu thiết kế một mô hình dữ liệu cho một ứng dụng thương mại điện tử đa ngôn ngữ. Chúng ta cần lưu trữ các trường như `product_name`, `description` trong bảng `product` và mô tả sản phẩm bằng nhiều ngôn ngữ khác nhau. Chúng ta cũng cần lưu trữ các trường liên quan của bảng `customer` bằng tất cả các ngôn ngữ. Một sản phẩm có thể có nhiều tác giả và ngược lại.
- Để hiểu kỹ hơn về những cách xây dựng dưới đây cuối những ý tưởng mình sẽ nên ra những ưu nhược điểm của chúng để ta có cái nhìn khái quát hơn và việc lựa chọn sử dụng trong trường hợp nào thì hợp lý nhất.

### Ý tưởng 1: Thêm một cột của từng ngôn ngữ cần hỗ trợ cho các trường cần thay đổi

Đây là cách tiếp cận đơn giản nhất về mặt phát triển. Nó có thể được thực hiện bằng cách thêm một cột ngôn ngữ cho mỗi trường.

![](https://images.viblo.asia/31f95db9-30d4-444c-9937-38d724304131.png)

#### Ưu điểm

- Nó rất dễ thực hiện
- Không có sự phức tạp trong việc viết SQL để lấy dữ liệu cơ bản bằng bất kỳ ngôn ngữ nào. Giả sử mình muốn viết một truy vấn để lấy thông tin chi tiết về sản phẩm và khách hàng cho một đơn hàng cụ thể bằng tiếng việt.

``` sql
Select p.product_name_VI, p.description_VI, p.price, c.name_VI, c.address_VI, c.contact_name 
from customer_product cp, product p, customer c
    Where cp.product_id = p.id and cp.customer_id = c.id
    And id = <order number>;
```

#### Nhược điểm

- Khả năng mở rộng kém: mỗi khi một ngôn ngữ mới được thêm vào, hàng chục cột bổ sung cần được thêm vào giữa các bảng dễ gây phình CSDL.
- Gây tốn thời gian khi hỗ trợ quá nhiều ngôn ngữ.
- Liệu bạn có tinh ý nhận ra rằng với mỗi nghôn ngữ bạn sẽ có một câu truy vấn khcas nhau ??.
- Vậy nên mình đã viết 1 store để thực hiện chung nhất cho việc sử lý này :D. Nội dung nó như sau: 

``` sql
SELECT CASE @in_language 
              WHEN ‘VI’ THEN p.product_name_VI
              DEFAULT THEN p.product_name_EN,
           p.price,
          CASE @in_language 
              WHEN ‘VI’ THEN c.name_VI
              DEFAULT THEN c.name_EN,
          c.contact_name
FROM customer_product cp, product p, customer c
        WHERE cp.product_id = p.id AND cp.customer_id = c.id
        AND id = <order number>;
```

- Liệu bạn có nhận ra trong việc xây dựng CSDL của mình có một thứ rất quan trọng nhưng lại không thể hỗ trợ nhiều quốc gia ? Đó là Mệnh giá :).
- Chúng ta không thể bán hàng ở mọi quốc gia mà chỉ khăng khăng rằng tôi muốn bạn thanh toán bằng USD :)
- Nhưng hãy bỏ qua vấn đề này vào một bài khác mình sẽ trình bay thêm về cách tạo csdl thanh toán giữa các quốc qua sau =)). 

### Ý tưởng 2: Tạo một bảng riêng cho văn bản dịch

- Phương pháp này dựa trên việc tạo một kho dữ liệu văn bản dịch cho tất cả các ngôn ngữ. Từ đó giúp cho mô hình csdl không bị thay đổi quá nhiều so với cấu trúc ban đầu.
- Ngoài việc lưu văn bản dịch trực tiếp chúng ta có thể lưu các tài liệu dịch ngoài vào :).

![](https://images.viblo.asia/a146c642-7339-4be2-bc7e-5eebb5c2f7d8.png)

#### Ưu điểm

- Khi mô hình dữ liệu của bạn đã hoàn chỉnh và đang chạy trên production thì việc này rất hợp lý và nó rất dễ tiếp cận.
- Cũng giống như `Ý tưởng 1` muốn thêm một ngôn ngữ bạn cần phải thêm các trường vào bảng nhưng lần này chỉ cần thêm 1 trường duy nhất vào bảng `**translationb**` là được.
- Khi văn bản gốc giống nhau trên các bảng, không có văn bản dịch thừa. 

Ví dụ: giả sử tên khách hàng và tên sản phẩm giống hệt nhau. Trong trường hợp này, chỉ một bản ghi sẽ được chèn vào bảng dịch và bản ghi tương tự được tham chiếu trong cả bảng `customer` và `product`.

#### Nhược điểm

- Nó vẫn đòi hỏi bạn phải thay đổi mô hình CSDL.
- 1 row sẽ xuất hiện rất nhiều trường `null`. Ví dụ nếu thiết kế như trên thì mỗi `1 row` ta sẽ có nhiều nhất `2` trường `null`. vậy nếu bạn có `1000` bản ghi cho các ngôn ngữ đc hỗ trợ thì theo tính toán đơn giản bạn sẽ có thể tồn tại `2000` trường null trong bảng đó.
- Độ phức tạp tăng lên và thời gian truy vấn (performance) cũng sẽ có tỷ lệ thuận với nhau.

Câu truy vấn để sử dụng nó như sau:
``` sql
SELECT 
        CASE @in_language 
                  WHEN ‘VI’ THEN tp.text_VI
                  WHEN ‘JP’ THEN tp.text_JP
                  WHEN ‘KR’ THEN tp.text_KR
                  DEFAULT THEN p.product_name_EN,
               p.price,
        CASE @in_language 
                  WHEN ‘VI’ THEN tp.text_VI
                  WHEN ‘JP’ THEN tp.text_JP
                  WHEN ‘KR’ THEN tp.text_KR
                  DEFAULT THEN c.name_EN,
               c.contact_name
FROM customer_product cp, product p, customer c, translation tp, translation tc
        WHERE cp.product_id = p.id AND cp.customer_id = c.id
        AND p.name_translation_id = tp.id
        AND c.name_translation_id = tc.id
        AND id = <order number>;
```

Thêm 1 lần tinh ý bạn sẽ nhận ra ngay bảng `translation` của chúng ta luôn tăng lũy tiên `n row` trong 1 lần insert trong đó n chính là số bảng cần dịch. vậy nên mình đã thiết kế lại một chút để câu truy vấn sẽ nhanh hơn và bảng `translation` cũng đỡ lớn hơn.

![](https://images.viblo.asia/e3480cd5-a6e5-4cba-a87b-2f3c16fea11f.png)

Còn câu truy vấn như nào các bạn tự tham khảo câu trên và viết nhé :).

### Ý tưởng 3: Bản dịch theo từng hàng

- Giống với cách tiếp cận Ý tưởng 2 nhưng ý tưởng này sẽ giải quyết cho ý tưởng 2 hai vấn đề lớn

    1, Tất cả các ngôn ngữ quy về 1 bảng
    
    2, Thêm 1 ngôn ngữ sẽ làm thay đổi cấu trúc của CSDL

Vậy ta chỉ cần thêm 1 bảng language bao gôm các field **`{id, name}`** là đc :)

![](https://images.viblo.asia/434775a6-6a2c-49e9-a56c-297bcbdb0070.png)

#### Ưu điểm

- Việc triển khai này cho phép những nhà phát triển viết các SQL và truy xuất dữ liệu khá dễ dàng.
- Thật dễ dàng để sử dụng ORM cho mô hình này
- Không cần thay đổi mô hình dữ liệu khi bạn thêm ngôn ngữ mới; chỉ cần chèn các bản ghi cho ngôn ngữ mới
- Không cần phải lo về dưa thừa bộ nhớ khi chưa nhiều `null` và tập hợp các trường của ngôn ngữ khác như trước nữa
- Và câu truy vấn thì thật là dễ thương. :)

``` sql
SELECT tp.text,
        p.price,
       tc.text,
        c.contact_name
FROM customer_product cp, product p, customer c, translation tp, 
     translation tc, language l
	WHERE cp.product_id = p.id AND cp.customer_id = c.id
	AND p.name_translation_id = tp.id
	AND c.name_translation_id = tc.id
             AND tp.language_id = l.id
             AND tc.language_id = l.id
             AND l.name = @in_language
	AND id = <order number>;
```

#### Nhược điểm

- Bạn biết về các cuộc tấn công `ddos` chứ ? việc thực hiện như này sẽ sảy ra tính trạng tất cả các request của người dùng đều tập trung vào một bảng duy nhất.
- Và tương tự khi bạn chỉ có 1 bảng `translation` thì việc hàng nghìn những bài viết được dịch với nhiều ngôn ngữ khác nhau được ghi cùng lúc vào thể gì cũng gây ra tắc nghẽn và treo server.
- Tuy nhiên không gì là không thể khắc phục. Hãy kết hợp với Ý tưởng 2b và chúng ta sẽ có thêm 1 cách thiết kế bá đạo sau.

![](https://images.viblo.asia/c7230315-791e-4306-b848-d8d91e4e974e.png)

Câu query ư ? bạn viết hộ mình cái mỏi tay quá :)

### Ý tưởng 4: Biến những field cần dịch thành 1 bảng riêng

Trong giải pháp này, các bảng thực thể chứa một hoặc nhiều trường được dịch được chia thành hai lớp: một cho các trường được dịch và một cho các trường không được dịch. Bằng cách này, chúng ta có thể tạo các lớp riêng biệt cho mỗi bảng.

![](https://images.viblo.asia/a29edca8-0ad4-4813-9cf3-6c16036b67af.png)

#### Ưu điểm

- Bạn không cần phải join với những bảng `translation` nếu chỉ cần những trường không dịch. Vì vậy sẽ có hiệu xuất cao hơn khi lấy những trường không dịch
- Dế dàng sử dụng cho ORM
- Truy xuất dễ hơn

Query

``` sql
SELECT pt.product_name, pt.description, p.price
FROM customer_product cp, product p, product_translation pt, language l
	WHERE cp.product_id = p.id AND 
	AND p.id = pt.product_non_trans_id
	AND pt.language_id = l.id
               AND l.name = @in_language
	AND id = <order number>;
```

Cuối cùng mình còn 2 ý tưởng nhưng rất ít khi được sử dụng nhưng các bạn có thể tham khảo thêm :).

### Ý tưởng 5: chưa nghĩ ra tên

- Ý tưởng này được lấy từ việc trong cá dự án lớn chúng ta thường tách back end và front end ra làm 2 phần lúc này BE chỉ viết API cho FE dùng. nên từ đó ta có thể biến đổi kiểu lưu trữ của dữ liệu thành 1 chuỗi có dạng json lưu trữ.

VD:
``` json
{
  EN: "Hello",
  VI: "Xin chào"
}
```

#### Ưu điểm:
- Dễ dàng lấy và sử dụng.
- Không phá vỡ cấu trúc csdl
- rất dễ dùng với ORM

#### Nhược điểm
- Không hẳn là nhược điểm nhưng việc lưu trữ nhiều text vào 1 field như này thường bạn sẽ nghĩ nó gây đầy field. Nhưng nếu bạn đã dùng ckeditor thì chắc hẳn bạn không còn nghĩ như này nữa :).

### Ý tưởng 6: Multiple database
- Nếu bạn sử dụng file config để thiết lập connect thì rất dễ để viết connect cho việc sử dụng và phân tách DB cho từng quốc gia :). 
- Cái này bạn ngâm cứu `multi tenant` nhé :).


## Kết luận
Viết dài quá rồi nên thôi không kết luận nữa. Mặc dù mình biết còn những thứ rất quan trọng hay sử dụng trong việc multiple language như DateTime. Nhưng thôi dài quá rồi :).

Bài viết được tham khảo từ  [đây](https://www.vertabelo.com/blog/technical-articles/data-modeling-for-multiple-languages-how-to-design-a-localization-ready-system)

Cảm ơn vì đã đọc bài :).