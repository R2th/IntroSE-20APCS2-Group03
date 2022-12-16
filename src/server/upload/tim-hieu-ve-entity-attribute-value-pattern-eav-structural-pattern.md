> Entity-Attribute-Value Pattern viết tắt là EAV Pattern, là 1 mô hình dữ liệu, làm việc với các thực thể (entity) có số lượng các thuộc tính (attribute) có thể mở rộng

EAV Pattern Là một kỹ thuật thiết kế CSDL để đáp ứng được việc xây dựng, phát triển và mở rộng sản phẩm khi hệ thống yêu cầu có sự tùy biến cao.

EVA là một cấu trúc thiết kế cơ sở dữ liệu trong Magento. Nay mình trình bày cấu trúc đơn giản của nó đó là Product Attribute (Level 2 trong Hệ thống quản lí sản phẩm của Magento)

### 1. Cấu trúc
![](https://images.viblo.asia/b129b578-88ec-4c80-8782-31a1e5dddc39.png)

Các phần phần tham gia vào EAV:
- **Entity (entities)**: Bảng chứa thông tin cơ bản của đối tượng
- **Attribute (attributes)**: Bảng chứa các thuộc tính ta có thể thêm vào
- **Value (attribute_values)**: Bảng chứa tổng hợp giá trị của cả Entity và Attribute với 2 khóa ngoại được tham chiếu đến

Mối quan hệ giữa các bảng:
- **Value - Attribute**: 1-n (một Attribute có nhiều Value)
- **Value - Entity**: n-n (một Entity có nhiều Value, một Value thuộc nhiều Entity)
- **Entity - Attribute**: n-n (một sản phẩm có nhiều Attribute, một Attribute thuộc nhiều sản phẩm)

Ví dụ về mối quan hệ giữa Entity-Attribute-Value:
| value_id | entity_id | value | attribute_id |
| - | - | - | - |
| 1 | 1 | "S" | 1 |
| 2 | 1 | "Trắng" | 2 |
| 3 | 1 | 30 | 3 |
| 4 | 1 | 100 | 4 |
| 5 | 2 | "S" | 1 |
| 6 | 2 | "Đen" | 2 |
| 7 | 2 | 20 | 3 |
| 8 | 2 | 200 | 4 |

### 2. Ví dụ
Bạn đang xây dựng một trang web bán sản phẩm (quần áo chả hạn), việc thiết kế database cũng đơn giản thôi. Có 2 bảng cơ bản sau:
- **products**: Để lưu trữ thông tin về sản phẩm
- **categories**: Để lưu trữ thông tin loại sản phẩm(để phân loại)

![](https://images.viblo.asia/7d44ca26-a365-49b4-8e8a-c62918ea850e.png)

Đây là cách thiết kế đơn giản nhất để chúng ta dễ dàng tiếp cận với kiến thức nhưng nó cũng là cách thiết kế yếu kém và khó mở rộng khi hệ thống phức tạp (Hệ thống quản lý sản phẩm Level 1). 

Ví dụ khi công ty mở rộng, bán nhiều sản phẩm hơn (điện thoại, máy tính, đồ dùng gia dụng...). Với việc nhiều sản phẩm chủng loại khác nhau do đó có nhiều trường hơn cần được thêm vào như *color*, *size*, *weight*, *chip*, *ram*,... Và đó là lúc mà cấu trúc bảng như trên bộc lộ điểm yếu do khó mở rộng. Chúng ta thêm vài chục trường dữ liệu vào một bảng nhưng khi lấy dữ liệu chúng ta chỉ sử dụng một vài trường trong số đó, điều đó gây việc tốn tài nguyên không cần thiết. Do đó đây là lúc chúng ta cần sử dụng EAV Pattern (Hệ thống quản lý sản phẩm Level 2).

Khi chúng ta sử dụng EAV, cấu trúc bảng được chia ra như sau:
![](https://images.viblo.asia/e6e644c5-f4fa-45aa-8c38-b13332c8d11c.png)

Tất cả những thuộc tính mong muốn thêm thì giờ chúng ta có thể thêm từ trang quản trị mà không cần sửa lại cấu trúc database.

1. Thêm vào bảng **attributes** một record cho thuộc tính `color`:
```
id=1, name="color"
```
2. Thêm các giá trị của thuộc tính (value) và id sản phẩm tương ứng với giá trị đó (product_id) vào bảng **attribute_value**:
```
id = 1, attribute_id = 1, value = "Đỏ", product_id = 1
id = 2, attribute_id = 1, value = "Xanh Lam", product_id = 2
id = 3, attribute_id = 1, value = "Vàng", product_id = 7
id = 4, attribute_id = 1, value = "Trắng", product_id = 5
```
Như vậy, với cách thiết kế trên chúng ta thấy hệ thống của chúng ta đã động hơn nhiều rồi. Vấn đề thiết kế CSDL cho một hệ thống lớn là rất quan trọng, chúng ta có thể tham khảo cách thiết kê của các mã nguồn mở như Magento để từ đó có thể học hỏi thêm về tư duy thiết kế hệ thống, đặc biệt là thiết kế hệ thống thương mại điện tử.

---
Tham khảo:
- [https://zent.asia/posts/ky-thuat-thiet-ke-co-so-du-lieu-theo-kieu-entity-attribute-value](https://zent.asia/posts/ky-thuat-thiet-ke-co-so-du-lieu-theo-kieu-entity-attribute-value)
- [https://techblog.vn/boc-me-cach-magento-to-chuc-thiet-ke-san-pham](https://techblog.vn/boc-me-cach-magento-to-chuc-thiet-ke-san-pham)