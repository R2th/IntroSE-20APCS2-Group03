Thông thường trên các box chat của các hội nhóm ở trên Chatwork, người ta thường đưa ra các thông báo tới toàn bộ thành viên bằng việc gửi tin nhắn toall. Tuy nhiên thông báo toall cũng chỉ là một tin nhắn, và nó có thể trôi đi xa tít tắp nếu cái box đó người ta chém gió nhiều (điển hình là box Group và box CLB của mình). Vấn nạn xảy ra là những người bận sấp mặt ít có thể lên box thì rất dễ bị miss thông báo vì lượng tin nhắn spam phải lội qua quá nhiều, đôi khi trải qua 1 ngày là cái box CLB mình có thể lên tới 500 cái tin nhắn 🤦‍


-----


Có một solution được thực hiện bên box Group của mình như sau: 
Mọi người lập 1 box khác gọi là box "Breaking News" và box này chỉ chuyên đăng thông báo, còn box kia là để chém gió. OK phương pháp này nghe chừng có vẻ ổn và hiện vẫn đang thực thi rất ổn ở Group mình.

Tuy nhiên khi mình áp dụng phương thức này ở box CLB thì có một vấn đề xảy ra đó là việc giới hạn box của Chatwork. Ngày xưa có vẻ dễ dãi hơn khi cho phép người dùng có tối đa 14 box, ta chỉ cần đơn giản là out 1 box nào đó là có thể join 1 box mới 👏. 

Nhưng giờ thì mơ đi, với giới hạn chỉ được phép join box 14 lần, rất nhiều tài khoản hiện nay đã bị limit box và muốn thực hiện giải pháp trên bắt buộc phải up lên premium để có thể join vào box mới. 
Và tất nhiên là với tầm vóc nhỏ bé của một CLB, không mang lại lợi nhuận cho công ty, thì cũng chẳng thể đòi hỏi việc công ty cần phải cấp premium cho tất cả thành viên.


-----


Do đó mình mới thực hiện một solution khác cho CLB của mình, đó là mỗi khi gửi 1 tin nhắn thông báo toall tới box, mình sẽ tự động gửi tin nhắn đó tới riêng từng thành viên. Như vậy nơi chém gió vẫn ở trên box chung, còn nơi tìm lại tin nhắn thông báo cho những thành viên bận rộn không có thời gian hóng chính là box chat riêng với mình. Có vẻ khá là hiệu quả đấy. Để thực hiện việc này mình chỉ cần hai điều kiện sau:
- Chatwork của mình phải kết bạn với tất cả các thành viên.
- Mình phải code tính năng tự động cho nó.


-----


OK luyên thuyên đủ rồi, chúng ta bắt đầu vào thực hiện nhé.
# Input
- Một tài khoản chatwork nằm ở trong chatbox CLB, và kết bạn với tất cả thành viên.
- Các công cụ để làm việc với một project ReactJS (mình quen xài React, các bác có dùng code front-end nào khác thì triển khai tương tự).
- Một tài khoản Firebase (cái này mục đích là để xài cái hosting và domain free của Firebase, code xong mình deploy lên đấy để dùng, các bác có thể xài domain và hosting riêng và triển khai tương tự)

# Output
- Một trang web với giao diện có thể nhập tin nhắn vào và ấn nút một cái sẽ gửi tin nhắn tới box và toàn bộ thành viên.

# Thực hiện
## Setup
- Lấy Chatwork API Token: https://www.chatwork.com/service/packages/chatwork/subpackages/api/token.php
> Chú ý nếu tài khoản của bạn là tài khoản thuộc công ty thì sẽ cần phải request với công ty, còn nếu không request được thì tốt nhất là tạo luôn 1 account mới mà dùng.
- Tạo project ReactJS, mình đặt tên là `demo-chat-tool`: 
```
$ create-react-app demo-chat-tool
```

- Thêm thư viện `axios` để làm việc với http-request

```
$ yarn add axios
```

Sau đó mở project lên bằng editor yêu thích của bạn lên và bắt đầu code thôi.

## Code
Đầu tiên là một chút UI, ở đây gồm 2 phần tử:
- 1 textarea để nhập tin nhắn
- 1 button để bấm gửi message

`App.js`
```
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    message: "",
  }
  
  sendMessage = () => {
      // TODO: Handle send message here
  }

  onTextAreaChange = (event) => {
    this.setState({ message: event.target.value })
  }

  render() {
    return (
      <div className="container">
        <textarea
          className="text-area"
          onChange={this.onTextAreaChange}
          placeholder="Nhập tin nhắn vào đây..."
          value={this.state.message}
        />
        <button className="button" onClick={this.sendMessage}>Send Message</button>
      </div>
    );
  }
}

export default App;
```
`App.css`
```
.container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
}

.text-area {
  flex: 1;
}

.button {
  height: 50px;
}
```
Tiếp theo là triển khai API services:
- Tài liệu: http://developer.chatwork.com/vi/index.html
- Ở đây mình chỉ triển khai 3 API bao gồm:
    - Lấy list contact của bản thân
    - Lấy danh sách member trong một room
    - Gửi tin nhắn.

`services/apis/index.js`
```
export default {
  getContacts: () => ({
    method: 'get',
    url: '/contacts'
  }),
  getMembers: (roomId) => ({
    method: 'get',
    url: `/rooms/${roomId}/members`
  }),
  addMessages: (roomId, message) => ({
    method: 'post',
    url: `/rooms/${roomId}/messages`,
    data: `body=${message}`
  }),
}
```

`services/index.js`
```
import axios from 'axios';
import API from './apis';

const BASE_URL = 'https://api.chatwork.com/v2';
const CHATWORK_TOKEN = 'YOUR_CHATWORK_TOKEN';

const baseAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-ChatWorkToken': CHATWORK_TOKEN,
  },
  validateStatus: status => status >= 200 && status < 500
});

const request = async (api) => {
  const response = await baseAxios.request(api);
  const { data, status } = response
  if (status && status === 200) {
    return data;
  }
  throw new Error(JSON.stringify(data.errors) || 'Response Format Error');
}

export default {
  getContacts: () => request(API.getContacts()),
  getMembers: (roomId) => request(API.getMembers(roomId)),
  addMessages: (roomId, message) => request(API.addMessages(roomId, message))
}
```
Cuối cùng là gắn API vào với UI:

- Define một vài constants cần thiết:

`App.js`
```
// ...
import Service from './services';

const GROUP_CHATROOM_ID = 0; // TODO: Nhập chatroom ID của nhóm chat của bạn.
const IGNORE_ACCOUNT_IDS = []; // TODO: Nhập các account mà bạn muốn bỏ qua không gửi tin nhắn, có thể là ID của chính bạn chẳng hạn

class App extends Component {
// ...
```
- Viết hàm gọi API và xử lý logic:

`App.js`
```
// ...
class App extends Component {
  // ...
}

const fetchMemberRoomIds = async () => {
  // Lấy contacts
  const contacts = await Service.getContacts();
  const contactIds = contacts
    .map(contact => ({ accountId: contact.account_id, roomId: contact.room_id }))

  // Lấy members
  const members = await Service.getMembers(GROUP_CHATROOM_ID)
  const memberIds = members
    .map(member => member.account_id)
    .filter((memberId) => !IGNORE_ACCOUNT_IDS.includes(memberId) )

  // Lọc kết quả và map về mảng roomId
  return contactIds
    .filter(contactId => memberIds.includes(contactId.accountId))
    .map(contactId => contactId.roomId)
}

export default App;
```
- Viết hàm gửi message:

`App.js`
```
class App extends Component {
  // ...
  
  sendMessage = async () => {
    if (this.state.message === "") {
      alert('Nhập tin nhắn vào đã!');
      return
    }
    const roomIds = await fetchMemberRoomIds();
    roomIds.push(GROUP_CHATROOM_ID)
    await Promise.all(roomIds.map(id => Service.addMessages(id, this.state.message)))
  }
  
  // ...
}
```

## Deploy
### Tạo firebase project
- Truy cập https://console.firebase.google.com và tự tạo cho mình một project trên đó:
![](https://images.viblo.asia/704e5990-06b1-465f-890e-3d4418c73dc4.png)
- Vào project, mở phần Hosting ra coi, bấm Get started và làm theo hướng dẫn:
![](https://images.viblo.asia/8fff7d18-cb3a-474b-a39c-b497ab35ddf4.png)

- Đại thể thì ta sẽ cần phải cài firebase-tools để xài
```
$ yarn global add firebase-tools
```
- Sau khi có tool, việc tiếp theo là login vào firebase bằng lệnh:
```
$ firebase login
```
- Login xong thì giờ tạo một cái thư mục và vào đó init một cái firebase project:
```
$ firebase init
```
- Ở mục đầu tiên cần đi qua ta chọn Hosting
![](https://images.viblo.asia/0d41b061-f165-46f3-a79d-babb1edb7f9c.png)

- Tiếp theo:
![](https://images.viblo.asia/6cc566fe-1c61-4f4b-805d-97d61181fd84.png)

- Tiếp theo:
![](https://images.viblo.asia/36b3fe2b-9a0b-4fcb-ba55-20417f8f29e6.png)

- Tiếp theo:
![](https://images.viblo.asia/77960147-e6b3-47cf-a3e1-cc62e219cd2f.png)

- Cuối cùng thấy cái đống này là ta đã init xong cái firebase:
![](https://images.viblo.asia/3c029b65-1dec-4677-ad8c-1cddd41c97f6.png)

### Build web app
- Quay về thư mục ReactJS project và chạy
```
$ yarn build
```
- Sau đó copy cái đống build ra trong thư mục build và dán đè vào thư mục public trong firebase project vừa tạo.

### Chốt hạ
- Quay về thư mục firebase project và chạy:
```
$ firebase deploy --project <ProjectID của bạn>
```
- Đợi xong xuôi và tận hưởng thành quả thôi.

# Kết
Mọi thứ trong bài viết này từ code đến setup, config đều ở mức cơ bản và tinh giản nhất, bạn nên tự mở rộng, cấu trúc project và có các config phù hợp và chuyên nghiệp hơn cho project của mình. Hy vọng bài viết đem lại những điều bổ ích cho bạn đọc.