Ở phần trước chúng ta đã nắm được cách để cài đặt AWS và sử dụng tính năng xác thực người dùng có sẵn của AWS, trong phần này chúng ta sẽ tìm hiểu thêm một vài cơ chế khá thú vị của AWS.

## Analytic
Các sự kiện Analytic có thể được theo dõi bằng cách sử dụng lớp `Analytics`

```javascript
Analytics.record('sale price section viewed')
```

Chúng ta có thể gọi sự kiện này với nhiều thuộc tính chi tiết hơn nữa:
```javascript
Analytics.record('sale price item viewed', { itemName: 'USA Socks' , timestamp: 'June 13 2018 4:03pm ET' })
```

Để xem dữ liệu analytic, chúng ta có thể vào trong AWS Mobile Hub project trong console, thực hiện bằng cách ấn vào **Resources** ở góc trên bên phải và chọn vào **Pinpoint** và ấn vào dịch vụ của bạn.

```javascript
awsmobile console
// Ấn vào Resources, sau đó Pinpoint
```

![](https://images.viblo.asia/c6189897-96f3-4fe6-a8f7-be24e9db1c49.png)

## Storage

Amplify có một lớp Storage cho phép tương tác với React Native làm cho việc lưu trữ và truy cập các file hình ảnh, video dễ dàng hơn, và liền mạch hơn với Amazon S3.

Chúng ta có thể mở chức năng lưu trữ trong AWS Mobile Hub từ command line :

```javascript
awsmobile user-files enable
awsmobile push
```

Bây giờ chúng ta có thể dùng lớp Storage từ trong app:

```javascript
import { Storage } from 'aws-amplify'
```
Chúng ta lưu dữ liệu vào trong storage như sau:

```javascript
Storage.put('test.txt', 'Hello')
    .then (result => console.log(result))
    .catch(err => console.log(err));
```

Và đọc nó từ storage:
```javascript
Storage.get('test.txt')
    .then(result => console.log(result))
    .catch(err => console.log(err));
```
Chúng ta có thể lưu các file media dễ dàng vào storage (giả sử như các bạn đã cài đặt [react-native-fetch-blob](https://github.com/joltup/rn-fetch-blob)).
```javascript
import RNFetchBlob from 'react-native-fetch-blob';

readFile(filePath) {
  return RNFetchBlob.fs.readFile(filePath, 'base64').then(data => new Buffer(data, 'base64'));
}

readFile(imagePath).then(buffer => {
  Storage.put('MYKEY', buffer, {
    contentType: 'image/jpeg'
  })
}).catch(e => {
  console.log(e);
});
```

Để xem S3 bucket, chúng ta chạy lệnh `awsmobile console` sau đó ấn vào **Resources** và bên dưới **Amazon S3 Buckets** ấn vào **userfiles**.
## Lambda Functions

Khi mà bạn nghe thấy cụm từ "Serverless", bạn sẽ nghĩ ngay đến hàm Lambda. Chúng ta có thể cài một trong số đó trực tiếp và kết nối nó với một trong những resource của AWS Amplify, hoặc dùng AWS Moible CLI để cài đặt nó cho chúng ta. Hãy bắt đầu dùng  CLI để tạo hàm Lambda.

Để thêm Lambda đã được configure, chạy command sau:

```javascript
awsmobile cloud-api enable
```

`awsmobile cloud-api enable` sẽ tự động tạo một API trong API Gateway cùng với Lambda function và kết nối chúng lại.

Bây giờ chúng ta nhìn vào trong project, trong phần **awsmobilejs/backend/cloud-api** để xem một configuration mới. Sẽ có một folder mới được tạo ra tên là **sampleLambda** nắm dữ hàm Lambda mới đã được triển khai cho chúng ta.

Hàm Lambda được tạo ra cho chúng ta sửu dụng AWS Serverless Express package để kết nối express server với các endpoint đã được tuỳ chỉnh. Những endpoint này có thể cập nhật trong code local và đẩy lên server bằng cách dùng `awsmobile push`. 

Hãy cập nhật hàm `app.get` trong thư mục `items` nằm trong **awsmobilejs/backend/cloud-api/sampleLambda**:

```javascript
/// rest of file omitted
app.get('/items', function(req, res) {
  res.json({
    body: "HELLO WORLD"
  });
});
```
Sau đó hãy push API này lên project AWS Mobile Hub:

```awsmobile push```

Bây giờ mở AWS Mobile Hub console để lấy tên API:

```awsmobile console```

Bấm vào Cloud Logic và sao chếp tên API (của tôi là `sampleCloudApi`).

Bây giờ chúng ta sẽ kiểm tra trong hàm Lambda. Trong **App.js**, tạo ra thêm một hàm `componentDidMount` mới.

```javascript
async componentDidMount() {
  const data = await API.get('sampleCloudApi', '/items')
  console.log('data: ', data)
}
```

## Quản lý API và tầng Data

![](https://images.viblo.asia/e3e06930-280f-4e09-8d77-0d584b6b7528.png)

AWS Amplify đưa ra một client tên là GraphQL có thể hoạt động với bất kì GraphQL API nào. Trong trường hợp của chúng ta, hãy nhìn vào [AWS AppSync](https://github.com/dabit3/awesome-aws-appsync)  đã được quản lý bằng dịch vụ GraphQL.

Với `AWS AppSync`, bạn có thể có một GraphQL API tương tác với bất kỳ nguồn dữ liệu nào mà bạn muốn. Có nhiều nguồn data được xây dựng ngầm như là Amazon DynamoDB, AWS Lambda Function hoặc Amazon Elasticsearch, với một hàm Lambd, bạn có thể truy câppj bất cứ dịch vụ hoặc database nào mà muốn một cách liền mạch chỉ với một tầng API đó là GraphQL nằm trong hình dạn của AppSync API của bạn.

Chúng ta sẽ đi vào một ví dụ đó là làm một Todo app.

Để bắt đầu, hãy bấm vào https://console.aws.amazon.com/appsync sau đó ấn vào **CREATE API**.

Từ đây hãy đặt tên cho API này và chọn **Custom Schema**, sau đó ấn vào **Create**.

Bây giờ, API đã được tạo ra và chúng ta sẽ thêm một số thông tin như là URL và Key vào.

Ấn vào **Schema** trong menu bên trái như sau :

```javascript
type Todo {
  id: ID!
  name: String!
  completed: Boolean!
}
type Query {
  fetchTodos(id: ID!): Todo
}
```

ấn vào **Save** và ấn vào **Create Resources**.
![](https://images.viblo.asia/addaf95a-9890-4184-b6ea-f25ee9c99832.png)

**Create Resources** sẽ tự động cấu hình một DynamoDB database, thêm vào GraphQL Schema cho nhiều tiến trình bao gồm query, mutation, subscription và resolver mà kết  nối tiến trình GraphQL vào data source.

Tiếp theo, bấm vào Queries trong menu bên trái để test thử mutation và query để đảm bảo mọi thứ hoạt động.

```
mutation add {
  createTodo(input: {
    name: "Get groceries"
    completed: false
  }) { id }
}
query list {
  listTodos {
    items {
      id
      name
      completed
    }
  }
}

```

![](https://images.viblo.asia/6f370c7f-ecfe-46e4-8a8e-ddf8ae9a6b1d.png)

Bây giờ kiểm thử API này từ phía client.
Đầu tiên, chúng ta cần cập nhật configure để định danh AppSync API.

Tạo một file tên là `appsync-config.js` trong root:

```javascript
export default {
  'aws_appsync_graphqlEndpoint': 'https://*******.appsync-api.us-east-1.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-*************',
}
```

Tiếp theo đó là đến lượt Amplify client. Hãy cập nhật nó để nhận diện ra configure của AppSync.

```javascript
import { AppRegistry } from 'react-native';
import App from './App';
import Amplify from 'aws-amplify'
import config from './aws-exports'
import AppSyncConfig from './appsync-config' // NEW
Amplify.configure({ ...config, ...AppSyncConfig }) // UPDATED
AppRegistry.registerComponent('ServerlessProject', () => App);
```

Bây giờ chúng ta có thể dễ dàng tạo và thực thi tiến trình với API như sau :
Trong App.js, hãy thêm query sau:

```javascript
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { withAuthenticator } from 'aws-amplify-react-native'
import { API, graphqlOperation } from 'aws-amplify'

const query = `
  query list {
    listTodos {
      items {
        id
        name
        completed
      }
    }
  }
`

class App extends Component {
  state = { todos: [] }
  async componentDidMount() {
    const todos = await API.graphql(graphqlOperation(query))
    this.setState({ todos: todos.data.listTodos.items })
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Todos
          </Text>
          {
            this.state.todos.map((todo, index) => (
              <Text key={index}>{todo.name}</Text>
            ))
          }
        </View>
    );
  }
}

export default withAuthenticator(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
```

## Push Notification

Việc cài đặt Push Notification kiếm nhiều thời gian hơn bất cứ loại dịch vụ nào khác vì nó cần phải có những dịch vụ từ Apple và Google. Việc cài đặt cụ thể các bạn có thể xem ở đây: [iOS](https://medium.com/react-native-training/react-native-push-notifications-with-amazon-pinpoint-ios-b2efa89ced32),[Android](https://aws-amplify.github.io/docs/js/push-notifications) .

Trong project của chúng ta chỉ cần như sau : 
```javascript
import { PushNotification } from 'aws-amplify-react-native';

// get the registration token
PushNotification.onRegister((token) => {
  console.log('in app registration', token);
});

PushNotification.onNotification((notification) => {
  // Note that the notification object structure is different from Android and IOS
  console.log('in app notification', notification);

  // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
  notification.finish(PushNotificationIOS.FetchResult.NoData);
});
```

Cảm ơn các bạn đã đón đọc, chúc các bạn thành công.

REF: https://medium.com/react-native-training/building-serverless-mobile-applications-with-react-native-aws-740ecf719fce