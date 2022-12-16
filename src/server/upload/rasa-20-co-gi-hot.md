Kể từ khi ra mắt đến nay, Rasa luôn nằm trong top những chatbot framework phổ biến nhất bởi tính hiệu quả và dễ tùy biến của nó. Nối tiếp sự thành công của những phiên bản trước, tháng 10 vừa rồi đội ngũ phát triển đã cho ra mắt phiên bản mới: Rasa Open Source 2.0 với một số thay đổi lớn nhằm giúp nó trở nên thân thiện hơn với người mới dùng cũng như mở rộng khả năng cấu hình cho người dùng có kinh nghiệm.

Trong bài viết này mình sẽ cài đặt và so sánh thử xem Rasa 2 có điểm gì mới so với bản 1.x

# Rasa 2.0 có gì mới ?

## **Tổ chức file**

Đầu tiên mình sẽ tạo một conda virtual environment và cài Rasa 2.0 trên đó: 
```
conda create -n rasa2x python=3.6
conda activate rasa2x
pip install rasa==2.0.0
```
Khởi tạo Rasa:
`rasa init`

Dưới đây là hình ảnh so sánh thư mục ban đầu của Rasa 1 (trái) và Rasa 2 (phải). Có thể thấy qua Rasa 2.0, file action.py không còn nằm ngoài thư mục gốc mà được chuyển vào trong 1 folder action riêng.

![](https://images.viblo.asia/180f4032-3687-421c-8665-e20720a1a057.png)
|![](https://images.viblo.asia/0337fab6-ae2e-4497-b9f1-d11be73ce7cc.png)

## **Thay đổi định dạng training data từ markdown (.md) sang YAML (.yml)**

| Rasa 1 (nlu.md) | Rasa 2 (nlu.yml)|
| -------- | -------- |
| ![](https://images.viblo.asia/7adc8110-7880-475c-b86d-6cf6bcde855d.png)     | ![](https://images.viblo.asia/f7666660-0326-4a2f-9339-3bc4b04bfe9f.png)     | 
| **Rasa 1 (stories.md)** | **Rasa 2 (stories.yml)**|
| ![](https://images.viblo.asia/94f6b715-7dc6-487d-9191-faefef940bd2.png) | ![](https://images.viblo.asia/e6b3b834-c687-43e7-bcf2-32420589ff65.png) |

Ngoài ấn tượng trực quan là version mới trông có vẻ thân thiện với người dùng hơn, thì sự thay đổi định dạng dữ liệu training này còn mang đến các lợi ích:
- Khả năng hỗ trợ custom metadata trong dữ liệu training. Key metadata bao gồm các cặp dữ liệu dạng key - value bất kỳ nhằm cung cấp thêm thông tin cho một intent hoặc một example, dữ liệu này có thể được truy cập bởi các component trong pipeline. Như trong ví dụ dưới đây thì metadata về sentiment có thể được sử dụng trong một [custom component](https://blog.rasa.com/enhancing-rasa-nlu-with-custom-components/) nhằm phân tích sắc thái cảm xúc (sentiment analysis) trong pipeline.
 
    ![](https://images.viblo.asia/996891e2-ad67-4630-a1dd-b3a9984bbe6f.png)
    ![](https://images.viblo.asia/4469cbf5-45c8-4d19-befe-a1ba3183d551.png)

- Khả năng hỗ trợ các định dạng media cho response selector. Ở phiên bản trước thì response selector (retrieval actions, model lựa chọn một câu response trong list các response cho các intent sẵn có, dùng cho các câu hỏi chitchat, FAQs) là một tính năng thử nghiệm với một số hạn chế như là câu response chỉ có thể ở dạng text. Trong phiên bản mới thì đây đã trở thành tính năng chính thức và được support đầy đủ, bạn có thể đưa ra các response bằng button, hình ảnh, vv. cũng như test lại với Rasa X.
- Khả năng chia một file dài thành các module nhỏ hơn

## **Slots**
Rasa 1.x có cung cấp một slot type là `unfeaturized` để define những slot không có ảnh hưởng đến luồng hội thoại. Trong Rasa 2, slot type này bị loại bỏ và chúng ta có thể làm điều tương tự bằng cách define slot type là `text` và set flag `influence_conversation` = `false`.

![](https://images.viblo.asia/277c73d2-ae22-4e2a-bd0d-89c7543c6739.png)


## **Đưa vào giới thiệu RulePolicy (rules.yml)**
Trong Rasa, phản hồi của chatbot sẽ được quyết định bởi một tập hợp các dialogue management policy, thường bao gồm khoảng 5-6 policy có mức độ ưu tiên khác nhau. Các policy này về bản chất được chia làm 2 loại :  
- Rule-based: nếu thỏa mãn một điều kiện nào đó được định sẵn => chatbot sẽ thực hiện một action. Ví dụ: MappingPolicy, FallbackPolicy, FormPolicy, Two Stage Fallback Policy, vv.
- Machine learning-based: dựa vào bối cảnh cuộc hội thoại và hành vi của người dùng  => dự đoán hành động tiếp theo. Ví dụ: TED policy, Memoization policy, vv.

Trong Rasa 2.0, hai loại policy trên đã được tách bạch, các rule-based policy nói trên được đưa về làm một và gọi chung là RulePolicy, chịu trách nhiệm cho form, intent-action mapping và fallback logic. Chúng ta dùng đến một format mới là Rule snippets để định nghĩa các rules cho chatbot trong file `rules.yml` như sau:

![](https://images.viblo.asia/c5018450-8282-4a73-a442-dea58e7f669b.png)

Với những trường hợp còn lại cần dùng machine learning như khi đinh nghĩa một chuỗi hội thoại, hoặc khi cần con bot "học" để đưa ra dự đoán về những cuộc hội thoại chưa gặp trong training thì vẫn được định nghĩa trong file `stories.yml`

## **Forms**
Bên cạnh việc tích hợp vào trong RulePolicy, Forms đã trở thành một feature cơ bản của thư viện Rasa Open Source thay vì Rasa SDK (custom actions) như trước. Nhờ vậy chúng ta có thể khai báo cũng như định nghĩa các quy tắc của slot mapping ngay trong file domain. Thay đổi này khá hợp logic và cũng dễ dàng hơn cho người dùng, nhất là những người mới tiếp xúc với Rasa. Đọc đoạn code dưới đây ta có thể dễ dàng hiểu ngay form này cần những slot nào và lấy từ đâu, cần thỏa mãn những điều kiện gì. Người dùng cũng không cần phải biết code python vẫn có thể tạo một form với những tính năng cơ bản.

![](https://images.viblo.asia/45349018-0718-4ff3-9d57-53c15ce944b0.png)

Các required slot của form có thể được trích xuất từ các thành phần như: entity (from_entity), nội dung message của user (from_text), hoặc được fill bằng các giá trị nhất định khi thỏa mãn các điều kiện về intent (from_intent), intent kích hoạt form (from_trigger_intent).

Ngoài ra, ở một mức nâng cao hơn, chúng ta vẫn có thể dùng custom action khi cần validate giá trị của các slot hoặc khi các phương thức slot mapping mặc định không phù hợp với nhu cầu.

Chi tiết có thể xem thêm tại: https://rasa.com/docs/rasa/forms

## **Gợi ý configuration**

Sau khi đã chuẩn bị xong dữ liệu training và define các rules, stories, actions, chúng ta có thể bắt tay vào "đào tạo" con chatbot:

`rasa train`

Một điểm sáng nữa của Rasa 2 là nó sẽ tự động recommend một pipelne và các policies trong file config.yml nếu bạn chưa thiết lập. Điều này rất thích hợp với những người dùng mới, chưa biết rõ về các component cũng như policy. Còn những người dùng có kinh nghiệm hơn thì họ có thể tùy biến lại cho phù hợp hơn với nhu cầu sử dụng.

![](https://images.viblo.asia/6a2c744e-f118-497b-b77f-5e15c19c2952.png)

## **Tính năng thử nghiệm: MultiProjectImporter**
Với tính năng này, Rasa cho phép chúng ta train một model mới bằng cách kết hợp nhiều project nhỏ. Ví dụ bạn có thể phát triển riêng một chatbot để chitchat với người dùng, một chatbot khác để chào hỏi, vv. rồi kết hợp chúng với nhau khi training.

![](https://images.viblo.asia/687dfe12-5612-4523-aa25-5c6736b0701c.png)


Trong quá trình training, Rasa sẽ import tất cả các file cần thiết từ các project con, kết hợp với nhau để train một con bot duy nhất. Quá trình này được thực hiện tự động khi training và người dùng sẽ không cần tạo thêm file gì cả. Lưu ý là Rasa sẽ sử dụng các policy và pipeline được config trong thư mục root của project lớn, các config của từng project con sẽ bị bỏ qua.

Chi tiết có thể xem thêm tại: https://rasa.com/docs/rasa/training-data-importers#multiprojectimporter-experimental

# **Kết luận:**
Về cơ bản thì qua một số tiếp cận ban đầu, mình thấy phiên bản 2.0 của Rasa có lớp lang rõ ràng hơn, dễ dùng hơn cho người mới chưa có kinh nghiệm. Thậm chí những người không biết code nhiều vẫn có thể đọc hiểu theo bản năng và tạo một con chatbot đơn giản. 

Nhưng không chỉ có thể, phiên bản mới cũng bao gồm nhiều tính năng, thành phần mà advanced user có thể vọc vạch và tùy biến, nâng cao cho phù hợp với nhu cầu sử dụng (metadata, retrieval action, và một số tính năng thử nghiệm như project importer, vv.)

Về hiệu quả thì trong phạm vi bài viết này mình vẫn chưa có dịp thử nghiệm và so sánh, nếu có dịp thì mình sẽ review nội dung này trong những bài tiếp theo :D

Ngoài ra, nếu đang sử dụng phiên bản 1.x và muốn chuyển sang bản 2.0 để thử nghiệm thì bạn có thể làm theo hướng dẫn tại: https://blog.rasa.com/migrating-your-rasa-1-x-assistant-to-rasa-2-0/ . Ngoài một số phần phải convert bằng tay thì Rasa có cung cấp các  công cụ phục vụ chuyển đổi. Chúc bạn có một trải nghiệm vui!



*Tài liệu tham khảo:*
- https://rasa.com/docs/rasa/
- https://blog.rasa.com/whats-ahead-in-rasa-open-source-2-0/