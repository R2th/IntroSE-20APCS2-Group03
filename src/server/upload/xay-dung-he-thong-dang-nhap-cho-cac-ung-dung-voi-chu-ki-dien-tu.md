# Mở đầu
![](https://images.viblo.asia/ddb4fe4e-515f-4ef4-9e4e-2f79e79710fc.jpg)

Hẳn mọi người đều đã quen thuộc với các cách đăng nhập các ứng dụng thông qua một bên thứ 3 là Google hoặc Facebook, có thể nói đây là một trong những tính năng đã trở thành hiển nhiên khi xây dựng Login cho một ứng dụng. Ngày hôm nay mình sẽ giới thiệu với các bạn một cách nữa thông qua chữ kí điện tử (Một trong những nguyên tử để tạo nên những đồng coin nổi tiếng như **Bitcoin** hay **Ethereum**)

Bài viết này mình sẽ cùng các bạn xây dựng một ứng dụng nho nhỏ đăng nhập thông qua chứ kí điện tử, nguyên liệu lần này sẽ gồm có:
1. Frontend : Mình sẽ chọn framework **Reactjs** (Do mình cũng mới biết react nên mình sẽ dùng những function rất đơn giản phù hợp cả với những người chưa từng động đến react)
2. Server: Mình chọn **Ruby on Rails** (Ứng dụng xây dựng khá đơn giản nên những ai chưa biết đều có thể nắm rõ được flow)
3. Chữ kí điện tử: Để đơn giản, mình sẽ sử dụng một extension khá nổi tiếng với cộng đồng ethereum là metamask, nếu ai chưa có metamask có thể dễ dàng cài đặt tại [đây](https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047)

# Chữ kí số là gì?
![](https://images.viblo.asia/dee97beb-fd8c-413f-a81e-e6b4c02bcace.png)
Bức ảnh trên đã mô tả khá rõ cách làm việc của chữ kí điện tử, các bạn có thể hiểu đơn giản là bạn có 2 chiếc khóa: một public mà ai cũng biết là bạn là chủ của nó, cái thử 2 là private mà chỉ bạn biết và giữ. Bạn sẽ dùng chiếc khóa private để tạo ra một chữ kí số cho một thông tin muốn gửi đi và chuyển nó cho người nhận, khi người nhận nhận được thông tin đó, họ có  thể xác định được bạn có phải là người gửi đi thông tin đó không nhờ sử dụng  chữ kí số mà bạn đã gửi cho họ, với  bộ đôi là thông tin nhận được và chữ kí số, chúng  có thể dễ dàng xác định ngược lại cái public key của bạn (Đây  cũng là nguyên  lý xác định địa chỉ gửi và nhận trong mạng lưới Bitcoin)
Với flow như vậy có vẻ khá giống với  flow để đăng nhập vào các ứng dụng

# Luồng hoạt động
![](https://images.viblo.asia/e828f2ea-39a4-452c-87e9-5efcdca10c1c.png)

Mình sẽ hướng dẫn các bạn lần lượt theo trình tự như trong hình (Được tham khảo tại [đây](https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial))

**1 + 2. Xây dựng đối tượng user và dữ liệu kí (nonce):**

User sẽ được lưu tại backend, kết quả cuối của cả luồng hoạt động này là tạo ra một [session](https://stackoverflow.com/questions/3804209/what-are-sessions-how-do-they-work) cho user và do đó mình sẽ sử dụng phương thức jwt (Nếu ai chưa rõ về jwt có thể đọc qua tại  [đây](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec))
Mình đã chuẩn bị sẵn một template rails đã được cấu hình jwt các bạn có thể cài đặt thông qua câu lệnh
```
git clone https://github.com/tranchien2002/rails-api-template.git 
```
Project này được viết bằng framewok rails nên nếu bạn chưa có  rails có thể cài đặt [thông qua](https://www.tutorialspoint.com/ruby-on-rails/rails-installation.htm)
Trước hết hãy thay đổi file create_user trong db/migrate thành dạng:
![](https://images.viblo.asia/327d226e-fa8f-4df0-9b6d-64e5cef09706.png)

File này sẽ tạo ra một bảng trong cơ sở dữ liệu để lưu thông tin user, thông tin bao gồm:

* name: tên người dùng
* address: Địa chỉ ví metamask của bạn
* nonce: Dữ liệu để kí bằng private key (giá trị mặc định ngay khi tạo là một giá trị random)

**3. Lấy dữ liệu để kí (Get nonce)**
Để tạo một project frontend bằng reactjs mình sẽ khởi tạo thông qua câu lệnh
```
create-react-app login-signature
```
Thêm những dependencies cần thiết vào package.json:
```json
{
  "name": "login-signature",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "jwt-decode": "^2.2.0",
    "axios": "^0.18.0",
    "react": "^16.6.0",
    "react-dom": "^16.6.0",
    "react-scripts": "2.1.1",
    "web3": "^1.0.0-beta.35"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}

```
Sau đó khởi tạo thêm 2 component Login và User, kết quả sẽ tạo ra một thư mục có dạng
![](https://images.viblo.asia/ce68060e-1d0d-4b4a-beef-a5d2a94ff63f.png)
2 component này có tác dụng y như tên gọi của nó, một component Login cho màn hình đăng nhập và User cho màn hình hiện info của user. 

Tại màn hình Login mình sẽ demo đơn giản chỉ với một button Login
```js
import React, { Component } from 'react';
import Web3 from 'web3';
import axios from 'axios'
// import { resolveSrv } from 'dns';
let web3 = null
class Login extends Component {
  state = {
    loading: false // Loading button state
  };

  handleAuthenticate = async (publicAddress, signature) => {
    let res = await axios.post("http://localhost:3001/api/v1/auth/login", {
      address: publicAddress,
      signature: signature
    })
    return res.data.auth_token
  }
  handleSignMessage = async (publicAddress, nonce) => {
    let signature = await web3.eth.personal.sign(web3.utils.fromUtf8("Log in with " + nonce), publicAddress)
    return signature;
  }
  handleClick = async () => {
    const { onLoggedIn } = this.props;
    if (!window.web3) {
      window.alert('Please install MetaMask first.');
      return;
    }
    if (!web3) {
      // We don't know window.web3 version, so we use our own instance of web3
      // with provider given by window.web3
      web3 = new Web3(window.web3.currentProvider);
    }
    let accounts = await web3.eth.getAccounts()
    if (!accounts[0]) {
      window.alert('Please activate MetaMask first.');
      return;
    }
    const address = accounts[0].toLowerCase();
    this.setState({ loading: true });
    let res = await axios.get("http://localhost:3001/api/v1/get_nonce/" + address)
    let nonce = res.data.nonce 
    let signature = await this.handleSignMessage(address, nonce)    
    let token = await this.handleAuthenticate(address, signature)
    await onLoggedIn(token);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          Login with MetaMask
        </button>
      </div>
    );
  }
}

export default Login;
```
Ngoại trừ module quen thuộc của React mình sẽ sử dụng thêm 2 module ngoài đó là [web3](https://web3js.readthedocs.io/en/1.0/) và [axios](https://github.com/axios/axios/blob/14057dc0bd9811a9fda773588f66de9f4aa0f617/README.md)

* web3 dùng để tương tác với ethereum (tuy nhiên trong này  mình mục đích là chỉ để sử dụng extension metamask vừa cài ở trên để  kí một chữ kí điện tử)

* axios dùng để gọi các rest api từ server rails mình đã cài đặt (server rails mình sẽ chạy ở cổng 3001 để tránh trùng với cổng của server react)

Đoạn code trên các bạn có thể thấy mục đích của mình là lấy cái **nonce** từ server và kí một message từ chiếc ví metamask thông qua một api từ server:
```js
 let res = await axios.get("http://localhost:3001/api/v1/get_nonce/" + address)
 let nonce = res.data.nonce 
```
Từ **nonce** được lấy từ server ta sẽ có một message để kí có dạng : **"Log in with " + nonce** . Sử dụng metamask để kí message ta sẽ có một signature
```js
handleSignMessage = async (publicAddress, nonce) => {
    let signature = await web3.eth.personal.sign(web3.utils.fromUtf8("Log in with " + nonce), publicAddress)
    return signature;
  }
```
![](https://images.viblo.asia/1b5e199c-10d6-4be0-af3e-888adb4db251.png)

Sau khi có chữ kí chúng ta chỉ việc gửi chữ kí này cùng với public key lên server để server kiểm tra, nếu đúng chúng ta sẽ được trả về một json web token cho một session
```js
handleAuthenticate = async (publicAddress, signature) => {
    let res = await axios.post("http://localhost:3001/api/v1/auth/login", {
      address: publicAddress,
      signature: signature
    })
    return res.data.auth_token
}
```
**5 + 6. Signature Verification & Change Nonce**

Phía server chúng ta sẽ có dạng cây thư mục như sau :

![](https://images.viblo.asia/d316654a-2bbc-4120-acca-5b92d2970303.png)

Ở bước 1 + 2 chúng ta đã xây dựng một bảng user để lưu trữ thông tin user (Nếu bạn sử dụng **gem mysql** như mình thì hãy nhớ sửa lại file **database.yml** là **username** và **password mysql** của máy nhé)

Các bạn cần chú ý đến 2 folder chính là :
* controllers/api/v1:  Có 2 controller cho user và authentication
* auth: 
    * **authenticate_user**:  Đây là file quan trọng của phần này, mục đích của nó là để xác định **public key** từ signature mà client gửi lên
    * **authorize_api_request** : Đây là file cơ bản cho json web token dùng để authorize mỗi request gửi lên server nếu yêu cầu cần định danh

Authentication controller:
![](https://images.viblo.asia/9510b686-19ef-4357-b5c6-00788eb12bf0.png)

Có route chính là :

* **get_nonce**:  Lấy giá trị nonce tương ứng với **public key**, nếu chưa có thì sẽ tạo một đối tượng user mới
* **authenticate** : trả về **authenticate token** và random lại **nonce** nếu xác thực thành công

**authenticate_user** :

![](https://images.viblo.asia/d2d3a0d5-a580-444c-8671-e3d89b4cb991.png)

Trong này mình sẽ dùng hàm recover lại **public key** nên sẽ cần thêm **gem eth** (Các bạn thêm vào gemfile và bundle lại)
Các bạn sẽ thấy một msg có nội dung giống với nội dung được  kí bởi client là **msg = "Login in with #{nonce}"**  sau khi đó sẽ dụng signature được gửi từ client để verify lại nó:
```js
address_owner = Eth::Utils.public_key_to_address(Eth::Key.personal_recover(msg, signature))
```
nếu so sánh address được recover giống với address của user gửi lên thì sẽ được coi là đăng nhập thành công và sẽ có một token encode user_id được trả về

**authorize_api_request**

Sau khi nhận được token, client phải gửi token vào headers của request nếu muốn làm các hành động cần authorize như thay đổi thông tin cá nhân
![](https://images.viblo.asia/7213239b-eb46-433f-a97a-b5186a09bbdd.png)

Trong bài này mình sẽ làm ví dụ ở hành động **update tên** của user, đây là hành động cần **authorize**. Mình sẽ tạo một function để xác định current_user ở file application_controller và đặt **before_request** sẽ xác định current_user:
```ruby
class ApplicationController < ActionController::API
  include Response
  include ExceptionHandler
  attr_reader :current_user
  before_action :authorize_request

  def authorize_request
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
  
  def current_user?(user)
    user == @current_user
  end
end
```
Tuy nhiên sẽ có những hành động không cần phải  authorize, khi đấy chúng ta chỉ cần đặt thêm một callback **skip_before_action**, các bạn có thể thấy rõ ở ngay controller authentication:
```ruby
skip_before_action :authorize_request, only: %i(authenticate get_nonce)
```
ta sẽ sửa lại **users_controller**:
```ruby
class Api::V1::UsersController < ApplicationController
  before_action :load_user, only: %i(show update destroy)
  before_action :correct_user?, only: %i(update destroy)
  skip_before_action :authorize_request, only: %i(show)

  def show
    render json: {
       user: @user.as_json(only: [:id, :address, :name])
    }
  end

  def update
    if @user.update_attributes user_params
      render json: {
          status: true
      }
    else
      render json: {
          status: false,
          message: @user.errors.full_messages
      }
    end
  end

  def destroy
    if @user.destroy
      render json: {
          status: true
      }
    else
      render json: {
          status: false,
          message: @user.errors.full_messages
      }
    end
  end
  private
  def user_params
    params.require(:user).permit :name
  end

  def load_user
    @user = User.find_by id: params[:id]
    unless @user
      render json: {
          status: false,
          message: Settings.not_found
      }
    end
  end

  def correct_user?
    unless current_user?(@user)
      render json: {
          status: false,
          message: Settings.perpermission_denied
      }
    end
  end
end

```

Oke vậy là đã hoàn chỉnh một luồng đăng nhập:
![](https://images.viblo.asia/8e791724-8b07-49b3-9816-b85c88b4a45e.gif)

# Tổng kết
Bài viết lần này mình sử dụng hơi nhiều kiến thức khác nhau từ client ,server lẫn một chút về mã hóa tuy nhiên mọi thứ đề ở mức cơ bản nên có thể dễ dàng làm theo để có cái nhìn tổng quan nhất.
Với những ứng dụng blockchain liên quan đến crypto thì việc sử một ví như metamask là rất phổ biến, do đó việc đăng nhập cho người dùng sẽ rất thuận lợi.
Hy vọng bài viết của mình có thể giúp đỡ cho các bạn
Các bạn có thể tham khảo code hoản chỉnh tại đây : 
[github](https://github.com/tranchien2002/login-with-digitalSiganture)
# Tham khảo
https://web3js.readthedocs.io/en/1.0/

https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial

https://alligator.io/react/axios-react/