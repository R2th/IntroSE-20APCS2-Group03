Richmenu là một tính năng menu được hiển thị ở cuối màn hình trò chuyện của LINE Official Account. <br>
Bạn có thể thiết lập các liên kết trong từng khu vực trong richmenu, từ các liên kết đó bạn có thể hướng người dùng đến các trang bên ngoài và các tính năng khác với các tính năng có trên Line channel của bạn.<br>
Bài viết dưới đây sẽ hướng dẫn các bạn tạo một richmenu cơ bản, thực hiện được các nhiệm vụ cơ bản, để khi gặp nội dung tương tự thì có thể sử dụng, và không bị bỡ ngỡ. Bài viết là những tài liệu cần thiết mà bản thân đã trải qua trong quá trình làm việc. 
## 1. Yêu cầu cơ bản.
- Viết trên ngôn ngữ Nodejs
- Cá nhân đã có tài khoản Line và đã tạo channel (message API) trên Line.
## 2. Giới thiệu richmenu và cấu trúc cơ bản
- Hình ảnh của richmenu: file hình ở định dạng JPEG hoặc PNG.
- Tappable area: đây là khu vực menu chính, được phân chia thành các vùng (areas) mỗi một areas có chức năng, tác vụ khác nhau. Line hỗ trợ tối đa được 20 areas trên một richmenu.
- Chat bar: là thanh công cụ dùng để đóng mở richmenu, nội dung text có thể thay đổi theo nhu cầu của người dùng. 
- Bên dưới là hình ảnh mô phỏng richmenu được lấy từ tài liệu của Line. 
![](https://images.viblo.asia/9501a915-e46f-45e9-bb17-9eacadf902af.png)
## 3. Các cách tạo richmenu
Có 2 cách tạo richmenu:
### 1. Tạo trực tiếp trên trang quản lí LINE Official Account
- Đối với cách này bạn cần vào trang quản lí : https://manager.line.biz
- Vào menu Chat screen chọn mục richmenu
- Bạn sẽ ra được giao diện như bên dưới
- Từ đây, chỉ cần chon create, nhập vào các nội dung cần thiết theo yêu cầu là có thể thiết lập một richmenu đơn giản, dễ dàng nhanh chóng. 
### 2. Tạo richmenu với Message API
Các bước cơ bản sử dụng API cần phải có khi tạo richmenu:
- Chuẩn bị hình ảnh cho richmenu
- Tạo một richmenu và chỉ định các chức năng cho từng khu vực (areas). tương ứng API <-> Create rich menu
- Tải lên và đính kèm hình ảnh cho richmenu: tương ứng API <-> Upload rich menu image
- Set richmenu mặc định: tương ứng API <->Set default rich menu
## 4. Giới thiệu các API thường hay được sử dụng cho việc thiết lập richmenu.
### 1. Create rich menu
- API này dùng để khởi tạo richmenu bao gồm: kích thước richmenu, vị trí thao tác chức năng các areas, nội dung chatbar.
- Mỗi một LINE Official Account sẽ được tạo tối đa 1000 richmenu.
- Dưới đây là đoạn code demo tạo rich menu với template như hình :
![](https://images.viblo.asia/c1463577-28c9-401f-a2d8-c285d7564b65.png)
    ```
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: '<channel access token>'
    });

    const richmenu = {
      size: {
        width: 800,
        height: 270
      },
      selected: true,
      name: "richmenu",
      chatBarText: "richmenudemo", 
      areas: [
            {
              bounds: {
                x: 0, 
                y: 0,
                width: 400,
                height: 270
              },
              action: {
                type: "message",
                label: "Document1",
                text: "Document1"
              }
            },
            {
              bounds: {
                x: 400,
                y: 0,
                width: 400,
                height: 270
              },
              action: {
                type: "uri,
                label: "Document2",
                uri:"https://richmenudemo/"
              }
            }
       ]
    };

    client.createRichMenu(richmenu)
      .then((richMenuId) =>
      console.log(richMenuId))
    ```
 - Kết quả trả về ở dạng JSON bên trong chứa richmenu Id vừa tạo được. 
     ```
     {
      "richMenuId": "{richMenuId}"
    }
     ```
### 2. Upload rich menu image
- Khi tạo richmenu thì mới chỉ có thông tin, các thành phần cấu thành richmenu, nhưng thiếu hình ảnh cho richmenu.
- API này sẽ set, upload hình ảnh, làm cho richmenu hoàn chỉnh và có thể sử dụng được. 
- Có thể upload, set hình ảnh cho một richmenu đã tạo sẵn trước từ lâu. 
- Về hình ảnh phải đảm bảo các yêu cầu sau đây :
    + Định dạng hình ảnh phải ở dạng: JPEG or PNG
    + Chiều rộng hình ảnh (pixels): từ 800 đến 2500
    + Chiều cao hình ảnh (pixels): 250 trở lên
    + Dung lượng tối đa của file: 1 MB 
- Bên dưới là code demo upload hình ảnh lên richmenu:
    ```
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: '<channel access token>'
    });

    client.setRichMenuImage('<richMenuId>', fs.createReadStream('./example.png'))
    ```
- Tuy nhiên nếu trong môi trường code, không sử dụng dạng file hình, thì chúng ta có thể thao tác set hình ảnh bằng cách sử dụng base64 của hình khi chuyển về dạng Uint8Array ta có code demo bên dưới.
    ```
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: '<channel access token>'
    });

    client.setRichMenuImage('<richMenuId>', richmenuImageBuffer, "image/png")
    ```
- Kết quả trả về ở dạng JSON rỗng. 
### 3. Set default rich menu
- Ở API trên thì ta đã có được 1 richmenu hoàn chỉnh, tuy nhiên cần phải chỉnh định để richmenu hiển thị trên màn hình chat screen.
- Richmenu mặc định sẽ được hiển thị mặc định cho tất cả các tài khoản đã liên kết bạn bè với tài khoản LINE Official Account.
- API này sẽ giúp chúng ta xác định sử dụng richmenu nào cho trên màn hình chat của mình.
- Bên dưới là đoạn code demo.
    ```
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: '<channel access token>'
    });

    client.setDefaultRichMenu('<richMenuId>')
    ```
- Kết quả trả về là dạng JSON rỗng. 
### 4. Delete rich menu
- Khi richmenu không còn phù hợp, cần thiết, thì ta có thể xóa hoàn toàn một richmenu đã được tạo ra khỏi LINE Official Account.
- Hoặc khi đã đạt giới 1000 richmenu, thì bạn có thể xóa những richmenu không sử dụng để tạo thêm richmenu mới. 
- Bên dưới là code demo. 
    ```
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: '<channel access token>'
    });

    client.deleteRichMenu('<richMenuId>')
    ```
- Kết quả trả về ở dạng JSON rỗng. 
### 5. Get rich menu list
- API này sẽ giúp bạn lấy ra hết thông tin các richmenu đang hiện có trên LINE Official Account.
- Bên dưới là đoạn code demo:
    ```
    const line = require('@line/bot-sdk');

    const client = new line.Client({
      channelAccessToken: '<channel access token>'
    });

    client.getRichMenuList()
        .then((richmenus) => {
        richmenus.forEach((richmenu) => console.log(richmenu));
        })
    ```
 - Kết quả trả về ở dạng JSON chứa mảng thông tin các richmenu đã có. 
     ```
     {
      "richmenus": [
        {
          "richMenuId": "{richMenuId}",
          "size": {
            "width": 800
            "height": 270
          },
          "selected": true
          "areas": [
            {
                bounds: {
                    x: 0, 
                    y: 0,
                    width: 400,
                    height: 270
                  },
                  action: {
                    type: "message",
                    label: "Document1",
                    text: "Document1"
                  }
                },
                {
                bounds: {
                    x: 400,
                    y: 0,
                    width: 400,
                    height: 270
                  },
                  action: {
                    type: "uri,
                    label: "Document2",
                    uri:"https://richmenudemo/"
                  }
                }
             }
          ]
        }
      ]
    }
     ```
     
     Trên đây mình chỉ demo 5 Message API cơ bản nhất để thiết lập 1 richmenu cơ bản. <br>
     Các bạn có thể xem thêm thông tin, tìm hiểu thêm các API khác trên trang tài liệu của line: https://developers.line.biz/en/reference/messaging-api
     
     Tài liệu tham khảo : https://developers.line.biz/en/reference/messaging-api/#rich-menu