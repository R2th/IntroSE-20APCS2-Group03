Chúng ta sẽ cùng nhau xây dựng một ứng dụng mà không cần thiết đến việc xây dựng server và backend bằng cách dùng [AWS Amplify](https://aws-amplify.github.io/?utm_source=blog&utm_campaign=serverless_mobile_apps_with_react_native_&_AWS) và React-Native mà trong đó có các chức năng như Authenticate, phân tích, quản lý tâng dữ liệu và push notification.

![](https://images.viblo.asia/b9570f7f-af3c-4ecc-839f-6f946c20d22f.png)

Bằng cách sử dụng AWS Mobile CLI nằm trong bộ AWS Amplify JavaScript SDK , chúng ta sẽ nhanh chóng có thể sử dụng có dịch vụ và thêm những chức năng cho ứng dụng React-Native . 

AWS Amplify JavaScript SDK được xây dựng để đưa ra những API xuyên suốt những dịch vụ và quản lý của AWS. React-Native, React & Angular là những framework hỗ trợ mạnh nhất cho JavaScript, rất phù hợp với SDK này.

![](https://images.viblo.asia/6dcaeef0-2513-42bb-9a99-85236a5fef1e.png)

Ứng dụng chúng ta xây dựng sẽ hoàn toàn khởi tạo bằng AWS Mobile CLI nhưng vẫn có thể truy cập bằng [AWS Mobile Hub](https://console.aws.amazon.com/mobilehub/home) console mà chúng ta sẽ tìm hiểu sau đây.

## Bắt đầu
### Tạo ứng dụng React Native

Đầu tiên chúng ta tạo một project React Native mới bằng cách sử dụng `React Native CLI` hoặc `Create React Native App CLI`:
```
react-native init ServerlessProject
```

Tiếp đó, chúng ta thay đổi thư mục:

```
cd ServerlessProject
```

### Cài đặt AWS Mobile CLI

AWS Mobile CLI cho phép chúng ta nhanh chóng và dễ dàng xây dựng một AWS Mobile Hub project từ command line với câu lệnh sau đây :
```
npm i -g awsmobile-cli
awsmobile configure
```
Bạn có thể tham khảo cách configure ở [video sau đây](https://www.youtube.com/watch?v=MpugaNKtw3k).

Một khi CLI được cài đặt và configure, chúng ta cần tiến tới và xây dựng AWS Mobiel Project. Trong thư mục root của project React Native mới, chúng ta sẽ tạo project của AWS Mobile:
```
awsmobile init
```

Nó cũng sẽ cài đặt một vài local dependency vào project của chúng ta. Bạn sẽ thấy `aws-amplify` và `aws-amplify-react-native` nằm trong **package.json**.

Cuối cùng, chúng ta cần link `aws-amplify`:

```
react-native link amazon-cognito-identity-js
```

Bây giờ chúng ta đã có một project Mobile Hub ở trong AWS dashboard. Bạn có thể xem và thay đổi cài đặt bất cứ lúc nào bằng cách chạy `awsmobile console` trong thư mục React Native.

### Cài đặt ứng dụng React Native và project AWS Mobile Hub

Bây giờ Mobile Hub đã được tạo và các dependency đã được cài đặt, chúng ta có thể configure project React Native để nhận diện những cài đặt này.

Trong index.js, hãy thêm những dòng code sau:
```
import { AppRegistry } from 'react-native';
import App from './App';

import Amplify from 'aws-amplify' // NEW
import config from './aws-exports' // NEW
Amplify.configure(config) // NEW

AppRegistry.registerComponent('ServerlessProject', () => App);
```

## Người dùng đăng ký và đăng nhập

Điều đầu tiên mà chúng ta cần làm đó là thêm chức năng đăng ký và đăng nhập. Để làm được nó thì chúng ta  cần  enable nó ở trong project Mobile Hub.

```
awsmobile user-signin enable
awsmobile push
```

Bây giờ chức năng đăng ký và đăng nhập đã được enable thông qua Amazon Cognito và chúng ta có thể sử dụng chúng ngay lập tức.
Nếu như nhìn vào trong tài liệu có 2 cách để thực hiện điều này:

1. Chúng ta sử dụng component của React để làm tiền cài đặt chức năng và UI.
2. Chúng ta có thể viết những chức năng này từ đầu bằng cách sử dụng lớp Auth, chứa những chức năng như là `Auth.signUp()` và `Auth.signIn()`.

### React Native component
Đầu tiên hãy tìm hiểu về cách sử dụng `withAuthenticator` từ `aws-amplify-react-native`.

Trong App.js, bên dưới phần import, hãy import như sau : 
```
import { withAuthenticator } from 'aws-amplify-react-native'
```

Tiếp theo, thay vì export mặc định chúng ta sẽ thay đổi như sau : 

```
class App extends Component {
  // all of this code stays the same
}
export default withAuthenticator(App)
```

Sau đó chạy ứng dụng: 
```
react-native run-ios
// or
react-native run-android
```

![](https://images.viblo.asia/f943cad5-793c-4567-b7d5-2e1269555380.png)

Bây giờ chúng ta đã hoàn thành việc xây dựng chức năng đăng ký và đăng nhập ở trong ứng  dụng. 

Để đạt được chức năng tương tự, bạn có thể sử dụng `<Authenticator />` component để bao những component chính mà bạn muốn authenticate:
```
<Authenticator>
  <App />
</Authenticator>
```

Trong các component được gói bên trong, bạn sẽ có thể truy cập được vào một thuộc tính được gọi là `authState` mà bạn có thể sử dụng làm điều kiện để render. `authState` sẽ có giá trị `signIn`, `signUp` hoặc `signedIn` để xác định xem các giai đoạn authenticate.

### Auth Class

Chúng ta có thể sử dụng lớp Auth để authenticate:

```
import { Auth } from 'aws-amplify'
// in your component
Auth.signIn('myusername', 'mYC0MP13xP@55w0r8')
```

Auth có hơn [30 hàm](https://aws.github.io/aws-amplify/api/classes/authclass.html) bao gồm `signUp`, `confirmSignUp`,`signIn`, `confirmSignIn` và `changePassword`. 

Khi bạn đăng nhập bằng cách sử dụng `Auth.signIn`, session sẽ được tạo và bạn có thể truy cập bất cứ khi nào bằng cách sử dụng `Auth.currentauthenticateduser`.

```javascript
import { Auth } from 'aws-amplify'

class App extends React.Component {
  state = {
    username: '',
    password: '',
    phone_number: '',
    email: '',
    authCode: '',
    user: {}
  }
  async signUp() {
    const { username, password, email, phone_number } = this.state
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number }
    })
    console.log('sign up successful!')
  }
  async confirmSignUp() {
    const { username, authCode } = this.state
    await Auth.configSignignUp(username, authCode)
    console.log('confirm sign up successful!')
  }
  async signIn() {
    const { username, password  } = this.state
    const user = await Auth.signIn(username, password)
    this.setState({ user })
    console.log('sign in successful!')
  }
  async confirmSignIn() {
    const { user, authCode } = this.state
    await Auth.configSignignIn(user, authCode)
    console.log('user now successfully signed in to the app!!')
  }
  render() {
    // render method
  }
}
```

Một khi bạn đã đăng nhập , bạn có thể xem các cài đặt bằng AWS Mobile Hub hoặc vào trang ` https://console.aws.amazon.com/cognito` để xem.

Bạn có thể sử dụng console để xem:  

```
awsmobile console
```

Sau đó ấn vào `Resources` nằm trong góc trên bên phải:

![](https://images.viblo.asia/264e0650-0354-444a-bc43-ef1eeb28e07e.png)

![](https://images.viblo.asia/a27fdde7-44db-44c9-8b63-9fe883861361.png)


Chúng ta sẽ kết thúc phần 1 ở đây, mong các bạn sẽ thực hành thành công phần này và hãy đón xem tiếp phần sau:

REF : https://medium.com/react-native-training/building-serverless-mobile-applications-with-react-native-aws-740ecf719fce