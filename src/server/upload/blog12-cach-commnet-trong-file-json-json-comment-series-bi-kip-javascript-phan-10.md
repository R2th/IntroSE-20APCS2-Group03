![image.png](https://images.viblo.asia/7fffe8dc-6e46-4bf2-8c72-3fa814dcd2c2.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Nếu bạn gặp sự cố khi thêm comment vào tệp JSON của mình, lý do đó là: JSON không hỗ trợ comment.

[Douglas Crockford](https://en.wikipedia.org/wiki/Douglas_Crockford), một trong những người đẻ ra cái kiểu dữ liệu JSON này, đã viết: "I removed comments from JSON because I saw people were using them to hold parsing directives, a practice which would have destroyed interoperability. I know that the lack of comments makes some people sad, but it shouldn't."

Tuy nhiên, có một cách giải quyết khác khi mấy ổng này đã quyết không để tính năng comment vào file JSON. Và đó là nội dung của bài viết này: cách thêm comment vào tệp JSON của bạn.

Thêm dữ liệu dưới dạng comment
------------------------------

Một cách để giải quyết vấn đề comment là thêm dữ liệu vào tệp JSON của bạn có chức năng như **comment**.

Hãy xem qua một ví dụ, bắt đầu với thông tin này trong tệp JSON sau:

```json
{
  "sport": "basketball",
  "coach": "Joe Smith",
  "wins": 15,
  "losses": 5
}
```

Bây giờ, hãy thêm một cặp **key-value** khác để đóng vai trò như **comment**, mà bạn có thể thấy ở dòng đầu tiên trong đoạn code dưới đây:

```json
{
  "_comment1": "this is my comment",
  "sport": "basketball",
  "coach": "Joe Smith",
  "wins": 15,
  "losses": 5
}
```

Đây là một ví dụ khác. Lần này, bạn sử dụng hai dấu gạch dưới ở đầu và cuối của key:

`"__comment2__": "this is another comment",`

Dấu gạch dưới giúp phân biệt comment với phần còn lại của dữ liệu trong tệp của bạn.

### Cảnh báo

Có một chi tiết quan trọng cần ghi nhớ.

Các comment mà bạn đã thêm vào tệp JSON của mình được bao gồm đối tượng JSON. Nói cách khác, các comment được coi là dữ liệu.

Đây là code trong tệp của bạn `data.json`,:

```json
{
  "_comment1": "this is my comment",
  "sport": "basketball",
  "coach": "Joe Smith",
  "wins": 15,
  "losses": 5
}
```

Bây giờ bạn sẽ đọc dữ liệu đó từ tệp: `read_comments.py`

```python
import json
  with open("data.json", mode="r") as j_object:
     data = json.load(j_object)
  print(data) 
```

Kết quả bao gồm comment của bạn:

`![Đang tải lên icon@2x.png…]()`

Bạn thậm chí có thể trích xuất **value** của **comment** từ đối tượng JSON:

```python
import json
with open("data.json", mode="r") as j_object:
    data = json.load(j_object)
    print(data["_comment1"])
```

Hãy nhớ rằng **comment** chỉ là **comment** dưới con mắt của Dev 🤣 nó không đúng với máy tính.

Commenting Options
------------------

[JSMin](https://www.crockford.com/jsmin.html) là một lựa chọn khác để **Comment**.

Đó là một công cụ loại bỏ khoảng trắng thừa và **comment** khỏi các tệp JavaScript. Nhưng nó cũng hoạt động trên các tệp **JSON**. **JSMin** xóa comment khỏi tệp **JSON** trước khi chúng được phân tích cú pháp.

Vì vậy, có các tùy chọn khi nói đến **comment** trong tệp **JSON**. Mặc dù chúng không phải là giải pháp hoàn hảo, nhưng ít nhất vẫn có cách để đưa vào tài liệu bạn cần khi cần.

Trước khi kết thúc thì
----------------------

Như mọi khi, mình hy vọng bạn thích bài viết này và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog12-cach-commnet-trong-file-json.html