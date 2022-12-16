Một trong những chức năng cơ bản nhất và quan trọng nhất để phát triển chatbot đó chính là message để tương tác hoặc thực hiện sự liên kết giữa chatbot với người dùng. <br>
Trong line cũng vậy, về phương diện message thì line message api hỗ trợ khá đầy đủ và đa dạng các loại message để sự tương tác qua lại đạt được kết quả tốt cho người dùng. <br>
Trong bài viết này mình sẽ giới thiệu một số loại message mà line hỗ trợ. <br>
### Yêu cầu cơ bản: <br>
Đã thao tác cài đặt chatbot hoàn thành. <br>
Sử dụng channel Message Api <br>
Ngôn ngữ sử dụng: Nodejs <br>
### Các loại message
#### Text message
Chức năng này dùng để phản hồi tin nhắn của người dùng gửi vào chatbot. <br>
Là chức năng cơ bản nhất, cần thiết nhất ở những con bot có tương tác với người dùng. <br>
Tuy nhiên cần chú ý:
- Giới hạn ký tự cho phép: 500
- Biểu tượng cảm xúc tôí đa: 20 <br>

Đoạn code cơ bản sử dụng text message (tham khảo từ line)
```
// Text message basic
{
    "type": "text",
    "text": "Hello, world"
}

// Text message with emoji
{
    "type": "text",
    "text": "$ LINE emoji $",
    "emojis": [
      {
        "index": 0,
        "productId": "5ac1bfd5040ab15980c9b435",
        "emojiId": "001"
      },
      {
        "index": 13,
        "productId": "5ac1bfd5040ab15980c9b435",
        "emojiId": "002"
      }
    ]
}
```
#### Sticker message
Phần send sticker message cũng đơn giản, tương tự như send text message, nên mình chỉ để đoạn code minh họa. 
```
{
  "type": "sticker",
  "packageId": "446",
  "stickerId": "1988"
}
```
Trong đó packageId là ID của bộ sticker và stickerId là ID của 1 trong những sticker có trong bộ đó. <br>
Có thể tham khảo các sticker hiện có của Line ở link: https://developers.line.biz/en/docs/messaging-api/sticker-list/
#### Image message
Trước tiên ta cùng xem qua đoạn code demo. 
```
{
    "type": "image",
    "originalContentUrl": "https://example.com/original.jpg",
    "previewImageUrl": "https://example.com/preview.jpg"
}
```
Trong đó: <br>
- originalContentUrl là link hiển thị hình ảnh đầy đủ kích thước của hình ảnh được gửi, phải là link https TLS 1.2 trở lên, định dạng file là PNG, JPEG và max size là 10MB
- previewImageUrl là link hình ảnh sẽ hiển thị trong màn hình chat của chatbot, phải là link https TLS 1.2 trở lên, định dạng file là PNG, JPEG và max size là 1MB
#### Video message
Đoạn code send video message
```
{
    "type": "video",
    "originalContentUrl": "https://example.com/original.mp4",
    "previewImageUrl": "https://example.com/preview.jpg",
    "trackingId": "track-id"
}
```
Trong đó:
- originalContentUrl: là link của video cần gửi, phải là link https TLS 1.2 trở lên, định dạng file là mp4 và max size là 200 MB
- previewImageUrl: là link hình ảnh xem trước của video, phải là link https TLS 1.2 trở lên, định dạng file là PNG, JPEG và max size là 1MB
- trackingId dùng để xác định sự kiện sao khi user xem xong video.<br>

Chú ý:
- Đối với video rất rộng hoặc cao thì trong một số môi trường sẽ bị cắt.
- Tỷ lệ khung hình của video trong originalContentUrl và hình ảnh xem trước trong previewImageUrl phải giống nhau.
#### Audio message
```
{
    "type": "audio",
    "originalContentUrl": "https://example.com/original.m4a",
    "duration": 60000
}
```
Trong đó:
- originalContentUrl là link của file audio, phải là link https TLS 1.2 trở lên, định dạng file là m4a và max size là 200 MB
- duration: là độ dài của file audio với đơn vị tính là milliseconds <br>

Chú ý: Ở API này chỉ hỗ trợ định dạng file m4a, nếu bạn sử dụng file dạng mp4 thì phải chuyển đổi về dạng m4a trước khi dùng cho gửi tin nhắn audio.
#### Location message
```
{
    "type": "location",
    "title": "my location",
    "address": "1-6-1 Yotsuya, Shinjuku-ku, Tokyo, 160-0004, Japan", 
    "latitude": 35.687574,
    "longitude": 139.72922
}
```
Trong đó:
- title: ký tự tối đa là 100
- address: là địa chỉ gửi để hiển thị trên map, tối đa là 100 ký tự
- latitude: vĩ độ
- longitude: kinh độ
#### Imagemap message
Là chức năng gửi hình ảnh, nhưng bên trong hình có thể chứa 1 hoặc nhiều vùng dữ liệu, có các action điều hướng khác nhau (gần giống với richmenu của line), cũng có thể cho phát video trên hình ảnh. <br>
Tương tự như richmenu, ở đây ta phải xác định từng khu vực ứng với các action điều hướng khác nhau. <br>
Giả sử gửi 1 hình ảnh muốn gửi được chia thành 3 vùng và có width:1040 và height: 346. <br>
Ta được đoạn code cơ bản bên dưới <br>
```
{
  "type": "imagemap",
  "baseUrl": "https://example.com/bot/images/rm001",
  "altText": "This is an imagemap",
  "baseSize": {
      "width": 1040,
      "height": 346
  },
  actions: [
            {
              type: "uri",
              linkUri: "https://example.com/demo1",
              area: {
                x: 0,
                y: 0,
                width: 346,
                height: 346
              }
            },
            {
              type: "uri",
              linkUri: "https://example.com/demo2",
              area: {
                  x: 346,
                  y: 0,
                  width: 347,
                  height: 346
              }
            },
            {
              type: "message",
              text: "Hello",
              area: {
                  x: 693,
                  y: 0,
                  width: 347,
                  height: 346
              }
            }
          ]
}
```
Những nội dung phân chia bên trong đoạn code ở bài viết này đã mô tả rõ ràng, tương tự như richmenu nên mình không viết lại. <br>
Link tham khảo: https://viblo.asia/p/gioi-thieu-mot-so-message-api-co-ban-su-dung-thiet-lap-richmenu-tren-man-hinh-chat-cua-line-official-account-oOVlYPRyZ8W <br><br>
Vấn đề cần chú ý cho yêu cầu của image sử dụng trong gửi image map: 
- Định dạng file: JPEG hoặc PNG
- Chiều rộng hình ảnh: 240px, 300px, 460px, 700px, 1040px
- Max file size: 10 MB
- Và ở link hình https://example.com/bot/images/rm001 phải đảm bảo tất cả các link hình bên dưới hoạt động.
    + 240px => https://example.com/bot/images/rm001/240
    + 300px	=> https://example.com/bot/images/rm001/300
    + 460px	=> https://example.com/bot/images/rm001/460
    + 700px	=> https://example.com/bot/images/rm001/700
    + 1040px =>	https://example.com/bot/images/rm001/1040 <br>
    
Nếu link hình ở dạng https://example.com/bot/images/rm001/240.png, thì hình ảnh đó sẽ không hoạt động - tương ứng là không gửi được. <br><br>
Trên đây là một số dạng message mà thông qua chatbot, bot có thể tương tác trực tiếp với người dùng. <br>

Bài viết của mình xin phép tạm dừng tại đây, do phần template message rất nhiều và đa dạng, nên xin phép bài sau để viết đầy đủ và rõ ràng. <br>
Cám ơn mọi người. <br>

Link tham khảo: https://developers.line.biz/en/reference/messaging-api/