Tiếp theo của bài viết một số loại [message Line hỗ trợ trong chatbot](https://viblo.asia/p/gioi-thieu-mot-so-loai-message-line-ho-tro-trong-chatbot-Az45b0mOZxY) thì hôm nay mình sẽ giới thiệu thêm 1 dạng message được hỗ trợ trong line message api. Và dạng này vừa đa dạng vừa có tính ứng dụng rất cao, hầu như đáp ứng được các yêu cầu từng phía người dùng để chatbot thân thiện, linh động và sáng tạo hơn. <br>
Nào mình cùng tìm hiểu về Template message nhé.
### Giới thiệu về template message
Template message xác định sẵn các bố cục để người dùng sử dụng tạo trải nghiệm tốt thông qua các hành động để giúp người dùng tương tác với bot của bạn dễ dàng hơn. <br>
Thay vì yêu cầu người dùng nhập tin nhắn, một hành động cụ thể có thể được thực hiện bằng một lần nhấn, tương tác trên màn hình chat. <br>
Dưới đây là các loại template có sẵn: <br>
- Buttons 
- Confirm 
- Carousel 
- Image carousel <br>

Bây giờ chúng ta cùng tìm hiểu chi tiết về từng loại template có sẵn. 
#### Buttons template
Sử dụng mẫu có button để gửi tin nhắn có hình ảnh, tiêu đề, văn bản và nhiều button hành động. Ngoài việc có các nút, bạn cũng có thể thiết lập một hành động sẽ được thực hiện khi người dùng chạm vào bất kỳ đâu trong vùng hình ảnh, tiêu đề hoặc văn bản. <br>
Hình ảnh để dễ hiểu thì hiện tại ở đây mình lấy trên document của Line

![image.png](https://images.viblo.asia/64a87c71-bfb7-44b1-a99e-dec2cd571669.png)
<br>
Về các nội dung cần chú ý trong tin nhắn buttons template:
- type: button
- thumbnailImageUrl: là link hình ảnh hiển thị trong tin nhắn button, là link https hoặc chuẩn TLS 1.2 trở lên, định dạng PNG - JPEG và có Chiều rộng tối đa là 1024px, dung lượng tối đa cho phép là 10MB.
- imageAspectRatio: Tỉ lệ co giãn hình ảnh, với hình chữ nhật: 1,51: 1 hoặc hình vuông: 1: 1 và mặc định là hình chữ nhật.
- ImageSize: 
    + cover: Hình ảnh lấp đầy toàn bộ vùng hình ảnh. Các phần của hình ảnh không phù hợp với khu vực sẽ không được hiển thị.
    + contain: Toàn bộ hình ảnh được hiển thị trong vùng hình ảnh. Nền được hiển thị trong các khu vực không sử dụng ở bên trái và bên phải theo chiều dọc hình ảnh và trong các khu vực trên và dưới hình theo chiều ngang hình ảnh.
- imageBackgroundColor: màu nền của hình ảnh, chỉ định giá trị màu RGB. Mặc định: #FFFFFF (màu trắng)
- title: tối đa 40 ký tự
- text: yêu cầu phải có với độ dài tối đa 160 ký tự và 60 ký tự nếu có chứa hình ảnh <br>

Dưới đây là 1 đoạn code demo cơ bản
```
{
  "type": "template",
  "altText": "message button demo",
  "template": {
      "type": "buttons",
      "thumbnailImageUrl": "https://example.com/image.jpg",
      "imageAspectRatio": "rectangle",
      "imageSize": "cover",
      "imageBackgroundColor": "#FFFFFF",
      "title": "Menu",
      "text": "Please select",
      "defaultAction": {
          "type": "uri",
          "label": "View detail",
          "uri": "http://example.com/page/123"
      },
      "actions": [
          {
            "type": "postback",
            "label": "Buy",
            "data": "action=buy&itemid=123"
          },
          {
            "type": "postback",
            "label": "Add to cart",
            "data": "action=add&itemid=123"
          },
          {
            "type": "uri",
            "label": "View detail",
            "uri": "http://example.com/page/123"
          }
      ]
  }
}
```
#### Confirm template
Template này có 2 button để thực hiện hành động, tương ứng như cái tên là confirm. <br>
Hình ảnh về message confirm

![image.png](https://images.viblo.asia/fc94c7a5-3273-488e-96a0-f870433fcca5.png)
<br>
Ở trong confirm template thì chỉ có 1 vài vấn đề cần chú ý như:

- type: confirm 
- text: độ dài giới hạn là 240 ký tự.
- actions: đặt, đưa, yêu cầu sử dụng vào trong chỗ action để điều hướng. <br>

Đoạn code demo cho confirm: <br>
```
{
  "type": "template",
  "altText": "confirm template demo",
  "template": {
      "type": "confirm",
      "text": "Are you sure?",
      "actions": [
          {
            "type": "message",
            "label": "Yes",
            "text": "yes"
          },
          {
            "type": "message",
            "label": "No",
            "text": "no"
          }
      ]
  }
}
```
#### Carousel template
Mẫu có nhiều cột có thể được xoay vòng giống như một băng chuyền.<br>
Các cột được hiển thị theo thứ tự khi cuộn theo chiều ngang, tương tự như hình ảnh bên dưới<br>
Việc sử dụng carousel template giúp người dùng có thể lựa chọn dễ dàng hơn cho các lựa chọn của mình thông qua chatbot, và cũng nhờ đó, không cần phải dài dòng, đơn giản hơn cho việc chatbot gửi thông tin đến người dùng. <br>

![image.png](https://images.viblo.asia/83bdb2e3-8475-493e-8e59-d57898b36079.png)
<br>
Một số vấn đề cần chú ý trong Carousel
- type: carousel
- columns: là 1 mảng các cột và được hiển thị tối đa 10 cột, mỗi cột có thể tương ứng gần giống như 1 button template và nội dung bên trong cũng theo quy định các thông tin trên buttons template.
- imageAspectRatio: là tỉ lệ co giãn hình ảnh, với hình chữ nhật: 1,51: 1 hoặc hình vuông: 1: 1 và mặc định là hình chữ nhật.
- imageSize: tương tự như buttons template <br>

Đoạn code demo. Trong đoạn code này đang demo có 1 cột, mỗi cột tương ứng là 1 một button template có 3 action: uri, 2 postback.
```
{
  "type": "template",
  "altText": "this is a carousel template",
  "template": {
      "type": "carousel",
      "columns": [
          {
            "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
            "imageBackgroundColor": "#FFFFFF",
            "title": "this is menu",
            "text": "description",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [
                {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=111"
                },
                {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=111"
                },
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/111"
                }
            ]
          },
          {
            "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
            "imageBackgroundColor": "#000000",
            "title": "this is menu",
            "text": "description",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/222"
            },
            "actions": [
                {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=222"
                },
                {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=222"
                },
                {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/222"
                }
            ]
          }
      ],
      "imageAspectRatio": "rectangle",
      "imageSize": "cover"
  }
}
```
#### Image carousel template
Mẫu có nhiều hình ảnh có thể được xoay vòng như một băng chuyền.<br>
Các hình ảnh được hiển thị theo thứ tự khi cuộn theo chiều ngang.<br>
Tương tự như carousel template tuy nhiên ở đây chỉ có hình ảnh, không phải là mảng các buttons template. <br>

![image.png](https://images.viblo.asia/6aea1417-6be1-41a8-90a5-80af6a2fbb67.png)
<br>
Một số vấn đề cần chú ý trong tin nhắn:
- type: image_carousel
- columns: là 1 mảng các object: mỗi object là 1 message bao gồm hình ảnh và action. Và giới hạn là 10 cột cho 1 tin nhắn.
    + imageUrl: tương tự định dạng hình ảnh của buttons template.
    + action: để thực hiện các mục tiêu theo yêu cầu của người dùng với chatbot. <br>

Đoạn code demo. Trong đoạn code demo này message image_carousel có 3 hình ảnh, mỗi hình ảnh tương ứng với mỗi action khác nhau.
```
{
  "type": "template",
  "altText": "this is a image carousel template",
  "template": {
      "type": "image_carousel",
      "columns": [
          {
            "imageUrl": "https://example.com/bot/images/item1.jpg",
            "action": {
              "type": "postback",
              "label": "Buy",
              "data": "action=buy&itemid=111"
            }
          },
          {
            "imageUrl": "https://example.com/bot/images/item2.jpg",
            "action": {
              "type": "message",
              "label": "Yes",
              "text": "yes"
            }
          },
          {
            "imageUrl": "https://example.com/bot/images/item3.jpg",
            "action": {
              "type": "uri",
              "label": "View detail",
              "uri": "http://example.com/page/222"
            }
          }
      ]
  }
  }
  ```
  
  Trên đây là các phần template được hỗ trợ sẵn trên template message của Line message API. Hi vọng có thể giúp mọi người tìm hiểu rõ hơn dần về các chức năng, hệ thống khá đa dạng mà line đã hỗ trợ với chatbot, tăng sự tương tác, cũng như dễ dàng hơn trong việc trao đổi thông tin giữa chatbot với người dùng. <br>
  Xin chân thành cảm ơn, mong được sự góp ý của mọi người. <br>
  
  Link tham khảo: https://developers.line.biz/en/docs/messaging-api/message-types/#template-messages