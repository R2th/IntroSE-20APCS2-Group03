# Giới thiệu

Các lập trình viên  cho các ứng dụng phi tập trung (Dapp) hẳn sẽ hiểu rõ việc khó khăn như thế nào cho người dùng khi lần đầu tiên tương tác với ứng dụng này. Phần lớn các ứng dụng phi tập trung thường cần đến một phần quan trọng chính là địa chỉ ví - do đó khá khó khăn có để có thể triển khai các ứng dụng phi tập trung đến tất cả các users do thói quen ngại phải cài đặt thêm 1 bên thứ 3 để lưu trữ ví, do đó Torus đã đề xuất một phương pháp để tăng UX cho người dùng bằng cách cho người dùng đăng nhập thông qua các bên thứ 3 như **Google, Facebook, Github, ...**
![](https://images.viblo.asia/bdd51f78-a456-411e-88e8-6f0920f236d9.png)

# Torus là gì ?
Như trong phần giới thiệu mình cũng đã giới thiệu qua về Torus, theo như những nhà phát triển của Torus, mục tiêu của họ là giúp người dùng dễ tiếp cận với những ứng dụng phi tập trung hay có thể nói rằng nhờ Torus thì **web 3.0** và **web 2.0** sẽ tương đối tiệm cận với nhau.

Dưới đây là sơ đồ cách thức mà Torus hoạt động : 

![](https://images.viblo.asia/f2c89886-56b9-43c5-aab7-8a04b87a9677.png)

Như đã nói ở phần **Giới thiệu**, để tương tác với hệ sinh thái phi tập trung (Dapps), user cần phải có một địa chỉ ví để định danh. Nhìn vào hình trên các bạn có thể thấy rằng chiếc khóa định danh của user được kết hợp từ nhiều phần để trở thành một chiếc khóa định danh thỏa mãn => Đó là cách thức Torus hoạt động để tránh việc khóa định danh có thể bị hack dễ dàng, mỗi phần của chiếc khóa được lưu trữ ở các node khác nhau trong mạng của Torus và được Authenticate thông qua các bên thứ 3 như **Google, Facebook, Giithub, hoặc vân tay của người dùng, ...**

Về cơ bản Torus được coi là **một giải pháp quản lý và phân phối khóa.**

# Kiến trúc
![](https://images.viblo.asia/0a119d5b-92c7-4469-a9ab-9896f3ad70b5.png)

Về cơ bản thì Torus gồm 4 phần chính:

* Các **Nodes** có nhiệm vụ tạo các khóa phân tán (Distributed Key Generation)
* Smart contracts có nhiệm vụ quản lý các **Nodes**
* Mạng **private Byzantine Fault Tolerant** giữa các **Nodes**
* **JS Clients** để tương tác với các **Nodes**

## Luồng hoạt động

![](https://images.viblo.asia/f5d49510-b188-4da0-a2c7-3775d039213c.png)

## Distributed Key Generation

![](https://images.viblo.asia/efebc571-e12c-4c70-b0c2-467ed1ae51d3.gif)

Đối với mỗi User mới sau khi đăng nhập thông qua một bên thứ 3 thì tài khoản đó (Google, Facebook or Github,...) sẽ được map tương ứng với một điạ chỉ khóa, do việc tạo khóa đòi hỏi nhiều vòng lặp, do đó Torus đã tạo sẵn các bộ đệm của các khóa và khi người dùng yêu cầu khóa mới thì họ sẽ được gán 

Torus tạo ra các khóa phân tán này thông qua một loại mã hóa có tên là Asynchronous Verifiable Secret Sharing, các bạn có thể đọc thêm chi tiết về papers của thuật toán mã hóa này tại [đây](https://eprint.iacr.org/2002/134.pdf)


## Authentication and Assignments

Các khóa được gán cho sự kết hợp của trình xác minh (ví dụ: Google, Github) và **verifier_id** - một định danh duy nhất tương ứng và được cung cấp bởi trình xác minh. Việc gán này có thể được kích hoạt bởi bất kỳ nút nào và được quyết định thông qua lớp đồng thuận của các nút.

# Cài đặt Torus vào các ứng dụng phi tập trung

## Torus với React

Trong phần này mình sẽ hướng dẫn các bạn một cách cơ bản nhất đó chính là implement Torus vào một project React. Mình sẽ thực hiện lần lượt các bước sau đây

### Tạo project React

Đầu tiên tạo một ứng dụng base thông qua **create-react-app** (Các bạn có thể config webpack hay những thứ khác tuy nhiên trong hướng dẫn này để tránh các lỗi vặt mình sẽ sử dụng gói cài đặt này )

```js
npx create-react-app torus-demo && cd torus-demo
```

### Thêm các dependencies
Chúng ta sẽ cần 2 modules chính đó chính là **web3** và **torus**, và đây sẽ là file **package.json** :

```js
{
  "name": "torus-demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.11.0",
    "react-dom": "^16.11.0",
    "react-scripts": "3.2.0",
    "web3": "1.0.0-beta.36",
    "@toruslabs/torus-embed": "^0.1.2"
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
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
### Init torus

Trong folder **src/** chúng ta sẽ tạo một file **./getWeb3Torus.js** có nội dung như sau:
```js
import Web3 from 'web3';
import Torus from '@toruslabs/torus-embed';
const getWeb3Torus = async () => {
  const torus = new Torus({
    buttonPosition: 'top-left'
  });
  await torus.init({
    buildEnv: 'production',
    enableLogging: true,
    network: {
      host: 'ropsten',
      chainId: 3,
      networkName: 'Ropsten Test Network'
    },
    showTorusButton: true
  });
  await torus.login();
  const web3 = new Web3(torus.provider);
  return web3;
};
export default getWeb3Torus;
```

Trong bài viết lần này mình sử dụng testnet **Ropsten** do đó phía trên là phần mình config để Torus tương tác với Ropsten, các bạn có thể custom cho các chain tương ứng và có thể tìm hiểu thêm ở [đây](https://docs.tor.us/developers/api-reference) 

### Đăng nhập với Torus

Cuối cùng thì chúng ta chỉ cần custom lại một function kích hoạt hàm **init torus** phía trên và một button để bind hàm đó vào, do đó mình sẽ sửa lại một chút ở file **./App.js**:

```js
import React, { Component } from 'react';
import login from './torus-login.svg';
import logo from './logo.svg';
import getWeb3Torus from './getWeb3Torus';
import './App.css';

class App extends Component {
  login = async () => {
    const web3 = await getWeb3Torus();
    const accounts = await web3.eth.getAccounts();
    alert(accounts);
  };
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>Torus demo</p>
          <div>
            <div className='container-custom'>
              <img alt='' src={login} onClick={this.login} className='gif-load' />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
```

Torus đã chuẩn bị sẵn các file svg cho các Button login, các bạn có thể lấy tại [đây](https://docs.tor.us/developers/sign-in-branding-guideline)

Nhớ install hết các dependencies thông qua câu lệnh 
```js
yarn
```

Và kết quả sau khi chạy 
```js
yarn run start
```

![](https://images.viblo.asia/f9e7f3a7-a905-4708-9c8f-35a677bc20e7.png)


Cuối cùng thì nếu còn thắc mắc gì các bạn có thể tham khảo trực tiếp project mình đã push lên Git:
https://github.com/tranchien2002/torus-demo
# Tham khảo
* Torus documentations: https://docs.tor.us/
* Papers mã hóa Asynchronous Verifiable Secret Sharing and Proactive
Cryptosystems: https://eprint.iacr.org/2002/134.pdf