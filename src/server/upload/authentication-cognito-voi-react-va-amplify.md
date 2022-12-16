Trong hầu như các ứng dụng thì ``authentication`` là tính năng quan trọng để xác thực người dùng có thể truy cập vào hệ thống, hôm nay mình sẽ giới thiệu đến mọi người về framework ``Amplify`` làm việc với các services của ``AWS``  với kiến trúc ``serverless`` nhé, trong bài viết này mình sẽ hướng dẫn dùng ``React`` và ``amplify`` để authentication vào ứng dụng của bạn với services ``Cognito`` của AWS. 
#### Amplify là gì
Theo docs của ``amplify``:
> The Amplify open-source client libraries provide use-case centric, opinionated, declarative, and easy-to-use interfaces across different categories of cloud powered operations enabling mobile and web developers to easily interact with their backends. These libraries are powered by the AWS cloud and offer a pluggable model which can be extended to use other providers. The libraries can be used with both new backends created using the Amplify CLI and existing backend resources.


Theo mình hiểu một cách đơn giản là nó là thư viện giúp giao tiếp giữa client và các services của AWS, thậm chí nó còn có thể render ra UI đặc thù hỗ trợ với cho hệ sinh thái của AWS.
#### Cài đặt Cognito, Amplify
Amazon Cognito là dịch vụ của Amazon Web Services cung cấp xác thực, ủy quyền và quản lý người dùng cho các ứng dụng web và di động của bạn. Người dùng có thể đăng nhập trực tiếp bằng tên người dùng và mật khẩu hoặc thông qua bên thứ ba như Facebook, Amazon, Google hoặc Apple.

Hai thành phần chính của Amazon Cognito là User pools and Identity pools:
* User pools là các thư mục người dùng cung cấp tùy chọn đăng ký và đăng nhập cho người dùng ứng dụng web và thiết bị di động của bạn.
* Identity pools cung cấp thông tin xác thực AWS để cấp cho người dùng của bạn quyền truy cập vào các dịch vụ AWS khác.

Trong bài viết này chúng ta chỉ quan tâm đến ``User pools``, Để bắt đầu chúng ta cần một tài khoản AWS, nếu chưa có thì mn có thể đăng kí [tại đây](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=header_signup&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start) nhé. Sau khi có có tài khoản AWS, chúng ta tìm đến dịch vụ ``Cognito`` để tạo 1 ``User pool`` nhé. Như mình đã giới thiệu, bào viết này mình sẽ xác thực ứng dụng với email và password nhé, nên lúc tạo user pool các bạn có thể cài đăt cho phù hợp với ứng dụng của bạn.

Bắt đầu tạo ứng dụng React
```
npx create-react-app app-name
```
Cài đặt Amplify CLI. Chúng ta cũng có thể amplìy ngay trên console của AWS nhưng mình khuyên dùng CLI vì nó khá mạnh mẽ và gen code khá xịn xò. 
```
npm install -g @aws-amplify/cli
```
Tiếp theo, chúng ta sẽ cấu hình CLI với 1 người dùng từ accoutn AWS.
```
amplify configure
```
> Để xem các bước để config cho CLI, các bạn có thể xem [tại đây](https://www.youtube.com/watch?v=fWbM5DLh25U)
> 
Cài đặt thư viện aws-amplify
```
npm install aws-amplify
```
Tạo một amplify project
```
amplify init
```
Tại đây sẽ có một số config mà amplify đưa ra để bạn có thể chọn, hãy chọn config phù hợp với ứng dụng của bạn nhé. Sau bước này, một app amplify trên AWS được tạo (các bạn có thể xem trên console AWS)

Sau khi cài đặt một số thư viện và đảm bảo răng bạn đã tạo 1 user pool trên AWS (bước này các ban có thể tạo user pool băng CLI nhưng mình ko khuyên dùng vì tạo trên console sẽ có nhiều cài đặt tuỳ chọn phù hợp với yêu cầu của bạn hơn)

Tiếp theo, link user pool (auth) đã tạo với amplify project
```
amplify import auth
```
Sau khi chạy cmd trên, 1 file ``aws-exports.js`` được tạo, file này sẽ chứa các key, id app user pool của bạn để amplify có thể truy cập vào, file này các bạn ko nên chỉnh sửa, nó sẽ được update bằng CLI.
Đến đây bước cài đặt đã khá ổn, chúng ta đã có thể dùng amplify với cognito AWS.
#### Sign up, Sign in & Sign out
##### Sign up
Tạo mới 1 user trong AWS Cognito user pool đã tạo trước đó bằng cách đăng kí các thông tin email, password và Cognito có hỗ trợ ``custom attributes`` có thể lưu trữ nhiều trường dùng ``Auth.signup``
```
import { Auth } from 'aws-amplify';

async function signUp() {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}
```
Promise ``Auth.singup`` sẽ trả về dữ liệu có kiểu ``ISignUpResult`` với ``CognitoUser``. ``CognitoUser`` chứa ``userSub`` là mã định danh duy nhất của user được xác thực. ``userSub`` không giống với ``username`` nhé.
```
{
    user: CognitoUser;
    userConfirmed: boolean;
    userSub: string;
}
```

###### Confirm sign up
Nếu bạn bật chế độ xác thực nhiều lớp trong lúc tạo tạo ``user pool`` ban sẽ nhận được code xác thực thông qua các hình thức như mail, SMS, ...,  thì bạn sẽ phải verify code của user đăng kí bằng cách
```
import { Auth } from 'aws-amplify';

async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}
```
Cognito hỗ trợ luôn send email với custom email đơn giản, hoặc có thể custom email xịn xò hơn bằng ``Lambda`` mà mình sẽ nói ở những bài viết sau.
###### Custom Attributes
Để tạo một ``custom attribute`` theo quá trình sign up, chúng ta thêm field vào method ``signup`` cùng với key ``custom`` phía trước để cognito nhận dạng
```
Auth.signUp({
    username,
    password,
    attributes: {
        email,
        'custom:favorite_flavor': 'Cookie Dough'  // custom attribute, not standard
    }
})
```
Lưu ý, để lưu trữ được custom attributes, chúng ta sẽ phải edit cài đặt của user pool, thêm các định danh custom attributes trên console của AWS Cognito và để có thể read, write các atrributes phải enable permission cho chúng. 

##### Sign-in
Để login với Cognito bằng email và password, chúng ta chuyển email, password từ client băng method ``signin`` của class ``Auth``.
```
import { Auth } from 'aws-amplify';

async function signIn() {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error);
    }
}
```

##### Sign-out
```
import { Auth } from 'aws-amplify';

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
```
Trên đây là một số hướng dẫn cơ bản về authentication của mình biết được khi sử dụng AWS Cognito và Amplify. Ở bài viết sau mình sẽ giới thiệu qua về trigger lambda, custom workflow... mà mình cho rằng khá hay và nên biết.
Ngoài ra Amplify còn làm việc với nhiều services khác của AWS nữa và mình sẽ tìm hiểu và giới thiệu dần tới mọi người. Cảm ơn mn đã theo dõi. (bow)