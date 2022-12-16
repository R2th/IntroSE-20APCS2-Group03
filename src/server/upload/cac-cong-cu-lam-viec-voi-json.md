## Introduction
Website những ngày đầu chỉ là những trang web tĩnh - static web (HTML/XHTML + CSS, có thể bao gồm cả Javascript), tĩnh có nghĩa là mỗi khi bạn request đến một đường link/site nào đấy thì nội dung trả về là không thay đổi.

Với công nghệ hồi đó thì rất khó để thay đổi content của trang web trong thời gian thực như thế này nếu không có sự phát minh của những kĩ thuật tiên tiến khác.

![](https://images.viblo.asia/9233c9b6-77a5-4b82-a114-b183e8db1064.gif)

Đó là lý do mà kỹ thuật AJAX (**A**synchronous **J**avaScript **A**nd **X**ML) ra đời. Về cơ bản thì AJAX cho phép thay đổi nội dung của trang web mà không cần phải reload toàn bộ trang. Ví dụ như khi anh **Sơn Tùng MTP** vừa đăng một bức hình lên FB, chưa có like nào cả, thì khi bạn bấm vào nút like, AJAX sẽ gọi lên server để lấy số like hiện tại và trả về để hiển thị. Do đó khi bạn like thì số like sẽ tự nhảy lên thành N likes chứ không phải là 1.

![image.png](https://images.viblo.asia/5174572a-4943-4b6f-bc7b-742259d4aa4b.png)

Trong khoảng thời gian tiếp theo làm việc với AJAX, một số cá nhân phát hiện ra sự bất tiện khi trao đổi dữ diệu giữa client và server bằng XML, nên một dạng data interchange format hiệu quả hơn có tên là JSON đã được sử dụng. Rồi dần dà khi dynamic website và AJAX chiếm lĩnh thị trường internet thì mô hình client-server trở nên vô cùng phổ biến khiến cho JSON theo đó cũng thở thành một tiêu chuẩn cho việc giao tiếp giữa client và server. 

![image.png](https://images.viblo.asia/03929eee-94b0-4e11-8ea9-d842a3d1a85b.png)

Ở thời điểm hiện tại, third party APIs như Google, Facebook....hay các dạng NoSQL database đều sử dụng JSON. Nói chung là dữ liệu được tổ chức và lữu trữ bằng JSON vô cùng lớn, khả năng trong tương lại gần việc bạn phải làm việc với JSON data gần như là điều chắc chắn. Vì vậy trong bài viết này mình giới thiệu đến các bạn một số kỹ thuật giúp bạn làm việc với JSON nhanh và hiệu quả.

## JSON

Khi làm việc với JSON mình thường làm các tác vụ chủ yếu như sau:
- Format/Repair
- Resharping (transform)
- Edit (Manipulate)
- Compare
- Convert to object (programming language)
- 
### 1. Format JSON

Với những file JSON có dữ liệu vừa và nhỏ thì bạn có thể sử dụng một trong các công cụ sau để format/repair JSON:
- [https://jsoneditoronline.org/](https://jsoneditoronline.org/)
- [https://jsonformatter.org/](https://jsonformatter.org/)

Hay thậm chí dùng Postman cũng được luôn =)) 😂😂

![image.png](https://images.viblo.asia/1fa03ff1-b16d-491e-b61a-9f21f6d68c9f.png)

Tuy nhiên nếu file JSON chứa một lượng lớn dữ diệu lên tới hàng triệu dòng (> 10MB) thì các tools ở trên thường gây ra tình trạng không phản hồi 🥲. Với trường hợp này thì mình hay dùng plugin **Pretty JSON** trong Sublime Text.
Nếu bạn chưa biết thì cài đặt như sau:

- Nhấn tổ hợp phím `Ctrl + Shift + P` và gõ  `Install Package`
- Click chọn `Select Package Control: Install Package` từ danh sách kết quả trả về.
- Click chọn `Pretty JSON`

![image.png](https://images.viblo.asia/ce0367cf-a3e3-4db5-b49d-debaec3a173d.png)

### 2. Reshape JSON
Giả sử chúng ta có hai tập tin JSON như sau:

**raw-data.json**

```json
[
    {
      "id": 1,
      "hashtags": {
          "indices": [
            41,
            50
          ],
          "text": "A"
        }
    },
    {
      "id": 2,
      "hashtags": {
          "indices": [
            51
          ],
          "text": "B"
        }
    },
    ...
]
```

**data.json**
```json
[
    {
      "id": 1,
      "hashtags": "A"
    },
    {
      "id": 1,
      "hashtags": "B"
    },
    ...
]
```

Yêu cầu đặt ra là phải kiểm tra tất cả các cặp`id` và `text` trong tập tin **raw-data.json** có giống trong tập tin **data.json** thì bạn sẽ làm thế nào cho hiệu quả? Bạn có thể làm thủ công, lấy từng `id` ra search rồi so sánh `text`, hay viết code chẳng hạn...nhưng về cơ bản là mình nghĩ là không quá nhanh. Bằng cách sử dụng [https://jsoneditoronline.org/](https://jsoneditoronline.org/), công việc của bạn cần làm sẽ đơn giản hơn khá nhiều.

**Reshaping**

![image.png](https://images.viblo.asia/4d56663d-4af9-4ee4-8424-4f7f0ae1c78b.png)

**Compare**

![image.png](https://images.viblo.asia/27b3ce26-5feb-4bc5-961b-57d6fd4fa34a.png)

Cũng có một cách khác đó là sử dụng JSON query của plugin **Pretty JSON** mà mình đề cập ở phần trước:

![image.png](https://images.viblo.asia/3d7d5d13-0be2-429e-8b3f-af80434b9b1b.png)

Trên Ubuntu thì nhớ `sudo apt install jq` trước khi sử dụng bạn nhé 😇.

![image.png](https://images.viblo.asia/b35a7702-d9fb-45bb-958a-76ca0c635115.png)

Nếu trong trường hợp gặp file JSON siêu to khổng lồ thì đừng dại gì mà sử dụng GUI, vì nếu không giật lag thì bạn cũng dễ gặp mấy cái lỗi như này =))

![image.png](https://images.viblo.asia/21c7ae62-2d7b-4e27-aea0-4ca1eacfb23c.png)

Cái thực sự mạnh thì không dễ dùng 🥰🥰. Xét về khoản performance thì command-line vẫn thể hiện sức mạnh áp đảo.

![image.png](https://images.viblo.asia/6913c4d2-2ba5-41a7-9eeb-e46ed4ad697f.png)

### 3. Manipulate JSON
- Đó là [jq](https://stedolan.github.io/jq/), một command-line utility chuyên để xử lý JSON rất mạnh. Tuy nhiên mình sẽ không đi vào chi tiết trong bài viết này.

### 4. JSON to POJO
- https://app.quicktype.io/
- [Java - Intellij's RoboPOJOGenerator plugin](https://plugins.jetbrains.com/plugin/8634-robopojogenerator)


## References
- https://twobithistory.org/2017/09/21/the-rise-and-rise-of-json.html
- https://dev.to/vishnuchilamakuru/6-json-tools-to-improve-your-productivity-1nif
- https://stackoverflow.com/questions/34896840/sublime-text-json-formatter-shortcut
- https://www.youtube.com/watch?v=_wFJj94kSTU