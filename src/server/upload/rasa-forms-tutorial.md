Chào các bạn, nối tiếp bài viết về Rasa Chatbot: [Retrieval action dùng để xử lý các cuộc hội thoại dạng FAQ](https://viblo.asia/p/gioi-thieu-ve-rasa-retrieval-actions-XL6lA2Er5ek) lần trước, hôm nay mình sẽ giới thiệu về một công cụ hết sức hữu ích khác dùng để thu thập các thông tin cần thiết từ user để con bot của chúng mình có thể thực hiện một tác vụ cụ thể. Đó là Rasa Forms.

Lúc tìm hiểu về form để làm chatbot mình cũng có đọc một vài tutorial bằng cả tiếng Anh và tiếng Việt nhưng để có thể bắt đầu hình dung và sử dụng được mình phải đọc chỗ này một ít, chỗ kia một ít và tìm kiếm thêm khá nhiểu trong quá trình làm. Do vậy mình viết (các) bài này hy vọng có thể cover đầy đủ và giải thích những phần mà mình nghĩ là cần thiết để bạn có thể bắt tay vào làm một chiếc form với những tính năng cơ bản và có thể xoay sở điều chỉnh thêm khi công việc yêu cầu.

## 1. Khi nào thì cần dùng Rasa Forms?

Để chatbot có thể thật sự trở nên hữu ích với con người thì chỉ chitchat và trả lời FAQ hẳn là chưa đủ. Nó cần có thể thực hiện được các tác vụ phức tạp hơn, ví dụ như đặt bàn gọi món ở nhà hàng, đặt lệnh chứng khoán, cung cấp thông tin sản phẩm và nhận đơn đặt hàng, vv. Để làm được điều đó, chatbot cần phải thu thập các thông tin có lên quan đến nhu cầu của người dùng. 

Giả sử, khi đăng ký tham dự một buổi workshop chẳng hạn, người dùng sẽ cần cung cấp các thông tin bắt buộc như họ tên (1), số điện thoại (2) người đăng ký, số người tham dự (3), khung thời gian (4). Khi đó sẽ nảy sinh các vấn đề như sau:

- Thông tin người dùng cung cấp bị thiếu: 

> User: Cho tôi đăng ký 2 vé tham gia workshop vào lúc 13h (thiếu số (1) và (2))
> > Bot: ??? :fearful:

- Nếu bot đưa ra thêm câu hỏi để có đủ thông tin, thì cuộc hội thoại càng dài, sẽ kéo theo nhiều trường hợp phải cover hơn, tương ứng với lượng data training cũng phải tăng lên và story cũng sẽ phức tạp hơn rất nhiều.

> User: Cho tôi đăng ký 2 vé tham gia workshop vào lúc 13h (thiếu số (1) và (2))
>>  Bot: Cho em xin tên và số điện thoại của anh chị 
>>> User: Tôi không dùng tên thật mà dùng nickname có được không?
>>>> Bot: @_@ :scream:

Để tránh những trường hợp như trên, cách tốt nhất là thu hẹp các trường hợp lại và chỉ cho phép nhập các thông tin được yêu cầu. Nếu thông tin người dùng cung cấp không đúng, con bot sẽ hỏi lại cho đến khi thu thập đủ thông tin. Đây chính là lúc Rasa Forms trở nên hữu dụng. 

**Rasa Forms còn có cách gọi khác là Slot Filling, mỗi thông tin cần thu thập sẽ được lưu vào một slot. Nguyên lý hoạt động của nó là khi form được active, nó sẽ tìm cách fill tất cả các required slots còn trống bằng cách đặt câu hỏi cho người dùng cho đến khi tất cả các slot đều được filled hết.**

## 2. Cách xây dựng một Form trong Rasa như thế nào?

Trong bài viết này để cho đơn giản mình sẽ lấy ví dụ về các bước xây dựng một con bot giúp đăng ký tham dự workshop sử dụng Rasa Forms.

Đầu tiên, chúng mình sẽ cần xác định các thông tin cần thiết tương ứng với các slot sau (như đã nói ở ví dụ trong phần mở đầu):
> Họ tên (user_name), 
>> Số điện thoại (phone_number), 
>>>Số người tham dự (attendee_no), 
>>>>Khung thời gian (session_no) (giả sử có 3 khung là 9h, 13h, 16h),
>>>>>thêm một slot nữa là Câu hỏi thêm nếu có (add_question)

Bước tiếp theo, để cho đơn giản mình sẽ lược bớt các phần râu ria như chào hỏi cảm ơn các thứ, form sẽ được kích hoạt khi người dùng thể hiện ý muốn tham gia workshop (intent: workshop_register). Trường hợp người dùng không muốn tham gia nữa (intent: cancel_form) thì form sẽ đóng và con bot sẽ không tiếp tục thu thập thông tin nữa.

**Rasa form có thể coi như một dạng custom action đặc biệt và được handle giống như một action**, ở đây mình đặt tên nó là workshop_form

### 2.1. **Configuration**

Để có thể sử dụng được Rasa Forms, chúng mình cần config các file sau:

* ***config.yml***
    ```yaml
    policies:
    ...
      - name: FormPolicy
    ```

*  ***domain.yml***
    ```yaml
      intents:
      - workshop_register
      - cancel_form

      entities:
      - attendee_no
      - session_no

      slots:
      user_name:
        type: unfeaturized
      phone_number:
        type: unfeaturized
      attendee_no:
        type: unfeaturized
      session_no:
        type: unfeaturized
      add_question:
        type: unfeaturized
    ```

    Ở phần này có một số lưu ý như sau:
    - Có 5 slot tương đương với 5 trường thông tin cần điền
    - Có 2 thông tin mà chúng mình kỳ vọng có thể extract được từ tin nhắn của người dùng: số người tham dự và khung giờ => 2 entities
    - Unfeaturized slot là gì? Unfeaturized slot có gì khác biệt?

        Thông thường khi tạo một slot để lưu trữ thông tin chúng mình sẽ set nó thuộc các kiểu như float, text, categorical, boolean – đây là các featurized slot. Các featurized slot có thể gây ảnh hưởng đến mô hình dự đoán của Rasa, hay nói cách khác mô hình đó sẽ cân nhắc việc slot đó đã được điền vào hay chưa và xem đó là một yếu tố để đưa ra hành động tiếp theo. Ngược lại, unfeaturized slot sẽ không gây ảnh hưởng đến luồng hội thoại. Do vậy trừ khi có lý do gì thì chúng mình nên để type của các slot trong form là unfeaturized.

* ***data/nlu.md***
    ```
    ## intent:workshop_register
    - tôi muốn đăng ký workshop
    - cho anh đăng ký workshop lúc [9h](session_no) với
    ...
    ## intent:cancel_form
    - hủy
    - tôi không muốn tham gia nữa
    ...
    ```    

* ***data/stories.md***
    ```
    ## workshop registration
    * workshop_register
        - workshop_form
        - form{"name": "idea_form"}
        - form{"name": null}

    ```
    Để cho đơn giản mình chỉ để stories nhẹ nhàng thế này thôi. Khi làm thực tế tùy vào yêu cầu cụ thể mà bạn có thể tạo các story path khác nhau cho các trường hợp người dùng không hợp tác. 
    Các ví dụ thường gặp:
    - Người dùng hợp tác điền form từ đầu đến cuối => happy :blush:
    - Đang điền form thì người dùng nói một câu không liên quan => cần hỏi lại xem họ có muốn tiếp tục không? (case này chúng mình cần thu thập data để con bot nhận biết được những câu hỏi kiểu out of scope)
    - Người dùng muốn thoát giữa chừng => là một tính năng mình thấy cần thiết để tránh việc rơi vào vòng lặp vô tận hoặc gây khó chịu cho người dùng
    
* ***endpoints.yml***
    ```yaml
    action_endpoint:
      url: "http://localhost:5055/webhook"
    ```

### 2.2. File actions

Vì Form là một dạng custom action, chúng mình sẽ thực hiện Form Action trong file action.py này. Mình sẽ giải thích từng thành phần một nhé:

* Định nghĩa class WorkshopForm + hàm name trả về tên của action (phải trùng với tên được khai báo trong file domain)
    ```python
    class WorkshopForm(FormAction):
        """Example of a custom form action"""

        def name(self):
            """Unique identifier of the form"""
            return "workshop_form"
    ```

* Hàm required_slot trả về một list các slot tương ứng với các thông tin cần điền (trong ví dụ này là 5 slot đã liệt kê ở trên). 
    ```python
        @staticmethod
        def required_slots(tracker: Tracker) -> List[Text]:
            """A list of required slots that the form has to fill"""

            return ["user_name”, “phone_number”, “attendee_no”, “session_no”, “add_question”]
    ```

    Tương ứng với mỗi required slot là một câu response của con bot, dùng để đưa ra yêu cầu hoặc hướng dẫn người dùng cung cấp thông tin cho slot đó. Bạn chỉ việc khai báo theo đúng cú pháp utter_ ask_ + tên slot trong phần responses ở file domain và Rasa sẽ tự động map chúng nó với nhau. 
    Ví dụ: 

    ```python
    (file: domain.yml)
    responses:
    utter_ask_user_name:
    - text: Anh chị vui lòng cho em xin họ tên ạ.
    utter_ask_phone_number:
    - text: Mời anh chị nhập số điện thoại.
    ....
    ```

    Trong phần required_slot này bạn cũng có thể customize một chút. Ví dụ nếu người dùng không phải là người dùng mới và đã có thông tin trong hệ thống của bạn, thì con bot có thể sẽ chỉ cần hỏi 3 trường là attendee_no, session_no và add_question thôi, còn 2 trường còn lại sẽ được lấy ra từ database. Hoặc ví dụ nếu đăng ký session 16h thì sẽ không được đăng ký cho nhiều người nên sẽ không cần trường attendee_no chẳng hạn.
    ```python
        if <người dùng là user cũ>:
            return [“attendee_no”, “session_no”, “add_question”]
        else:
            return ["user_name”, “phone_number”, “attendee_no”, “session_no”, “add_question”]
    ```
    Từ khi form bắt đầu được kích hoạt cho đến khi tất cả các slot đều đã được điền vào, Rasa sẽ liên tục kiểm tra các required slot theo thứ tự khai báo, nếu slot nào chưa được điền thì con bot sẽ đưa ra câu response tương ứng để yêu cầu người dùng nhập thông tin cho slot đó. Nên nếu bạn muốn hỏi thông tin nào trước thì hãy khai báo slot đó trước nhé.

    Ví dụ:
 
     *User: cho tôi đăng ký workshop lúc 13h*

    
    Trong message của người dùng phía trên ta thấy đã có thông tin về session_no rồi. Nếu bạn đặt entities cho phần này trong file NLU thì theo mặc định của Rasa form, nó sẽ tự động được match với required_slot **cùng tên.** Do vậy khi vào form action thì con bot sẽ bỏ qua session_no và lần lượt hỏi tên, sđt, số người và additional question bằng các câu utter phía bên trên. Tuy nhiên nếu trong quá trình thu thập thông tin, bằng một thao tác xử lý nào đó mà session_no bị set về None thì con bot của chúng mình sẽ đưa ra yêu cầu cho người dùng nhập lại trường đó.

* Và giống như khi điền form trong google form, sau khi tất cả các slot đã được điền thì sẽ đến phần submit
    ```python
    def submit(
            self,
            dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any],
        ) -> List[Dict]:
            """Define what the form has to do after all required slots are filled"""
            dispatcher.utter_message("Thanks, great job!")
            return []
    ```
    Đây là phần bạn quyết định hành động của con bot sau khi người dùng đã điền xong form (ví dụ đưa thông tin lên database, xử lý và cung cấp thông tin người dùng yêu cầu, vv.). Bên cạnh đó bạn cũng có thể đinh nghĩa một response utter_submit trong file domain.yml đưa ra thông báo con bot đã tiếp nhận thông tin và xử lý yêu cầu.

Kết luận : Trong bài này mình đã giới thiệu về các thành phần cơ bản trong Rasa form: tính cần thiết, cách thiết lập form, khai báo trong file domain và cách định nghĩa class trong file action. Trong bài tiếp theo mình sẽ giới thiệu thêm về các phần advanced hơn một chút nhưng cũng không kém cần thiết như slot_mapping và slot_validate. Rất mong nhận được sự góp ý từ các bạn ^^

<to be continued>