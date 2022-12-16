#### Mở đầu
Công việc của một lập trình viên không chỉ dừng lại ở việc code mà còn thường xuyên phải viết tài liệu. Một strong số những tài liệu quan trọng đối với lập trình viên, đặc biệt là lập trình viên Backend đó là API documentation. API documentation là một tài liệu quan trọng không những giúp cho mọi người có cái nhìn tổng quan về các chức năng của hệ thống, nó còn là phương tiện giao tiếp hiệu quả, chính xác giữa người tạo ra API (lập trình viên backend) với những người sử dụng API (lập trình viên frontend).

Khi nhắc tới việc tạo API documentation không thể không nhắc tới [Swagger](https://swagger.io/) một công cụ đã quá nổi tiếng với nhiều chức năng mạnh mẽ được đông đảo cộng đồng lập trình viên sử dụng. Tuy nhiên bài viết này mình muốn giới thiệu một công cụ khác đó là API Blueprint mặc dù các chức năng còn hạn chế so với Swagger nhưng [API Blueprint](https://apiblueprint.org/) có một số những ưu điểm khi sử dụng cú pháp MarkDown đơn giản, ngắn gọn, dễ đọc, dễ viết và cũng đi kèm với một bộ công cụ hỗ trợ cũng đủ dùng rất thích hợp cho những dự án cần viết API documentation trước, tạo mock server sử dụng luôn.

#### Các cú pháp cơ bản
##### Metadata, API Name & Description
Đầu tiên chúng ta cần tạo một file với định dạng .apib để bắt đầu viết tài liệu. Sau đó trong file .apib chúng ta lựa chọn format, tên và mô tả cho API.

```md
FORMAT: 1A

# Polls

Polls is a simple API allowing consumers to view polls and vote in them.
```

Ở đây tên API của bạn được viết như một heading trong cú pháp Markdown, tên API được viết sau 1 hoặc nhiều ký tự `#` như một tiêu đề.
Số lượng ký tự `#` giúp ta chia cấp bậc của các tiêu đề.

##### Resoure Group
```md
# Group Questions

Resources related to questions in the API.
```
Ta sử dụng từ khoá `Group` để tạo 1 group cho các resource có liên quan, ví dụ là các API liên quan tới Question

##### Resource

Trong Question reasource group, ta có 1 resource gọi là `Question Collection`. Resource này cho phép ta xem danh sách các question, URI của resource sẽ được định nghĩa trong 2 dấu ngoặc vuông.

```md
## Question Collection [/questions]
```

##### Actions 
API Blueprint cho phép ta đinh nghĩa các action cụ thể được thực hiện trên resource. Một action sẽ được định nghĩa như 1 sub-heading bên trong resource với tên của action tuân theo các HTTP method.

```md
### List All Questions [GET]
```

1 action nên chứa ít nhất 1 response từ server, nó phải chứa 1 status code và có thể chứa 1 body. 1 response được định nghĩa như 1 danh sách các phần tử bên trong 1 action. Ta có thể sử dụng các ký tự như  `+`, `-`, `*` trước mỗi phần tử trong danh sách.
Ví dụ 1 action trả về 1 response với status code là 200 cùng với body được định nghĩa như sau:

```md
+ Response 200 (application/json)

        [
            {
                "question": "Favourite programming language?",
                "published_at": "2014-11-11T08:40:51.620Z",
                "url": "/questions/1",
                "choices": [
                    {
                        "choice": "Swift",
                        "url": "/questions/1/choices/1",
                        "votes": 2048
                    }, {
                        "choice": "Python",
                        "url": "/questions/1/choices/2",
                        "votes": 1024
                    }, {
                        "choice": "Objective-C",
                        "url": "/questions/1/choices/3",
                        "votes": 512
                    }, {
                        "choice": "Ruby",
                        "url": "/questions/1/choices/4",
                        "votes": 256
                    }
                ]
            }
        ]
```


Question Collection có thêm 1 action thứ 2 cho phép chúng ta tạo question mới. Action này bào gồm 1 phần mô tả giúp chúng ta biết được cấu trúc cần phải gửi tới server. Action được định nghĩa như sau:
```md
### Create a New Question [POST]

You may create your own question using this action. It takes a JSON object
containing a question and a collection of answers in the form of choices.

+ question (string) - The question
+ choices (array[string]) - A collection of choices.

+ Request (application/json)

            {
                "question": "Favourite programming language?",
                "choices": [
                    "Swift",
                    "Python",
                    "Objective-C",
                    "Ruby"
                ]
            }
            
+ Response 201 (application/json)

    + Headers

            Location: /questions/1

    + Body

                {
                    "question": "Favourite programming language?",
                    "published_at": "2014-11-11T08:40:51.620Z",
                    "url": "/questions/1",
                    "choices": [
                        {
                            "choice": "Swift",
                            "url": "/questions/1/choices/1",
                            "votes": 0
                        }, {
                            "choice": "Python",
                            "url": "/questions/1/choices/2",
                            "votes": 0
                        }, {
                            "choice": "Objective-C",
                            "url": "/questions/1/choices/3",
                            "votes": 0
                        }, {
                            "choice": "Ruby",
                            "url": "/questions/1/choices/4",
                            "votes": 0
                        }
                    ]
                }
```

Kế đến ta định nghĩa 1 resouce `Question` bên trong `Group Question`, resource này sẽ đại diện cho 1 question cụ thể.

```md
## Question [/questions/{question_id}]
```

##### URI template
Trong resource `Question` trên ta sử dụng `{question_id}` để đại diện cho ID của 1 question.
Các bạn có thể tham khảo về [URI templates](https://github.com/apiaryio/api-blueprint/blob/master/Glossary%20of%20Terms.md#uri-template) để hiểu hơn về cách định nghĩa 1 URI cho 1 resource.

##### URI Parameters
Chúng ta nên viết mô tả các parameter để làm rõ nội dụng của parameter. Ví dụ như sau:
```md
+ Parameters
    + question_id (number) - ID of the Question in the form of an integer
```

TIếp theo chúng ta định nghĩa các action cho resource `Question`:
```md
### View a Questions Detail [GET]

+ Response 200 (application/json)

            {
                "question": "Favourite programming language?",
                "published_at": "2014-11-11T08:40:51.620Z",
                "url": "/questions/1",
                "choices": [
                    {
                        "choice": "Swift",
                        "url": "/questions/1/choices/1",
                        "votes": 2048
                    }, {
                        "choice": "Python",
                        "url": "/questions/1/choices/2",
                        "votes": 1024
                    }, {
                        "choice": "Objective-C",
                        "url": "/questions/1/choices/3",
                        "votes": 512
                    }, {
                        "choice": "Ruby",
                        "url": "/questions/1/choices/4",
                        "votes": 256
                    }
                ]
            }
```
và action `DELETE` không chứa body như sau: 
```md
### Delete [DELETE]

+ Response 204
```

#### Render Document
Từ file .apid đã được định nghĩa ta có thể sử dụng để render sang HTML giúp thuận tiện hơn trong việc đọc tài liệu.
Có rất nhiều [tools](https://apiblueprint.org/tools.html#renderers) để render, ở đây mình sử dụng [Aglio](https://github.com/danielgtaylor/aglio) để render

```javascrip
npm install -g aglio
aglio --theme-variables slate -i {api_file_name}.apib -o {output_name}.html 
```

Và đây là kết quả thu được:
![](https://images.viblo.asia/cddfd1c3-8e49-4c29-a56c-624e73c0e20f.png)


#### Mock Server
Việc tạo 1 mock server với API Blueprint cũng hết sức đơn giản. Ta có thể sử dụng các tools hỗ trợ cho việc tạo [Mock Server](https://apiblueprint.org/tools.html#mock%20servers) như [Drakov](https://github.com/Aconex/drakov).

```javascript
npm install -g drakov
drakov -f {input_name}.apib -p {port}
```
 VD ta chạy mock server trên port 3000:
 ![](https://images.viblo.asia/c5aacf63-0a34-4a33-b163-cc46682233c3.png)

Kiểm tra kết quả với curl:
```bash
curl -v POST -H "accept-language: en" -H "content-type: application/json" -d '{"question": "Favourite programming language?", "choices": ["Swift","Python","Objective-C","Ruby"]}' http://localhost:3000/questions
```

Và đây là kết quả trả về:
![](https://images.viblo.asia/f093aee8-7ccd-402a-a38f-411d4bc6ef79.png)

Như vậy ta đã có 1 Mock Server rất nhanh chóng, sẵn sàng cho đội Frontend sử dụng mà chưa cần phải thực hiện implement code phía Backend.

#### Tổng kết
Bài viết mang tính chất giới thiệu về API Blueprint. Để hiểu rõ hơn cũng như sử dụng API Blueprint hiệu quả hơn trong dự án, các bạn có thể tham khảo thêm tại trang chủ của [API Blueprint](https://apiblueprint.org/). Hy vọng bài viết có ích đối với các bạn.

#### Tài liệu tham khảo
[https://apiblueprint.org/](https://apiblueprint.org/)