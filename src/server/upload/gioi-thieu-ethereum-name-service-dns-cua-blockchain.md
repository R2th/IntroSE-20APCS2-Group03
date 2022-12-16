![](https://images.viblo.asia/b8314a53-c9cd-4e5e-9af9-a92b9c78c140.png)

Etherum nói riêng cũng như các nền tảng blockchain, tiền mã hóa khác nói riêng vẫn chưa thực sự phổ biến với người dùng phổ thông. Lý do một phần là do công nghệ blockchain hay crypto currency đang còn rất mới, một phần nữa là nó chưa thực sự thân thiện với người dùng (địa chỉ ví dài, khó nhớ, backup private key,...). Ethereum Name Service (ENS) ra đời nhằm giải quyết phần nào vấn đề kể trên, mapping những địa chỉ ví dài loằng nhoằng thành một cái tên ngắn gọn dễ nhớ hơn. 

## 1. Giới thiệu

Ethereum Name Service hiểu đơn giản là một dịch vụ tên miền phân tán trên nền tảng Ethereum.  Chức năng của ENS tương tự như DNS (mapping các địa chỉ IP thành các tên miền dễ nhớ hơn). Giống như DNS, ENS triển khai trên một hệ thống tên miền phân cấp gồm các tên miền (domains) và tên miền con (subdomains), chủ sở hữu của 1 tên miền có toàn quyền kiểm soát tên miền con (subdomains). Ví dụ như tên miền `.eth`, tên miền con sẽ là `foo.eth`, `bar.eth` ....

Logic của ENS được thể hiện trong smart contract ENS và được deploy lên mạng Ethereum (hoặc các mạng thử nghiệm). Nếu ở ứng dụng đầu cuối dùng thư viện [ethereum-ens](https://www.npmjs.com/package/ethereum-ens) , nó sẽ tự động detect mạng và sử dụng ENS trên mạng đó.

## 2. Kiến trúc

ENS có 2 phần chính:
- [Registry](https://docs.ens.domains/contract-api-reference/ens)
- [Resolvers](https://docs.ens.domains/contract-api-reference/publicresolver)

**ENS registry** là một smart contract chứa danh sách các domains, subdomains. Mỗi domains hay subdomains đều lưu trữ 3 thông tin sau:
- Địa chỉ owner của domain hay subdomains
- Địa chỉ resolver của domain hay subdomains
- Thời hạn của domains

Owner của một domains có quyền:
- Chỉ định resolvers and thời hạn của domains
- Chuyển quyền sở hữu domains cho địa chỉ khác
- Thay đổi owner của subdomains

Các bạn có thể xem source code của ENS Registry contract tại [đây](https://github.com/ensdomains/ens/blob/master/contracts/ENSRegistry.sol)

**Resolvers** đơn giản là nơi thực hiện việc chuyển đổi `domains` => `address` và trả lại `address` ứng với domains cho người dùng. 

![](https://images.viblo.asia/0bbed905-c47e-4230-a001-3dad80c90bba.png)

![](https://images.viblo.asia/0f63d3cc-e0cf-4801-8d30-aaec7b6612dc.png)

Quy trình gồm 2 bước như hình trên: 
- B1: Ứng dụng hỏi địa chỉ của resolvers của domains `foo.eth` bằng các gọi hàm `resolvers`. Registry sẽ trả về địa chỉ của resolvers tương ứng
- B2: Ứng dụng gọi đến resolvers để lấy địa chỉ ứng với domains `foo.eth`


## 3. Tích hợp ENS vào Dapp

### ENS Libraries

Hỗ trợ ENS hỗ trợ nhiều thư viện với các ngôn ngữ khác nhau. Phổ biến nhất vẫn là Javascript.

- [ethereum-ens](https://www.npmjs.com/package/ethereum-ens), maintained bởi ENS developers
- [ethjs-ens](https://www.npmjs.com/package/ethjs-ens)
- [ethers.js](https://github.com/ethers-io/ethers.js)
- [web3.js](https://web3js.readthedocs.io/en/1.0/web3-eth-ens.html)

Chỉ có thư viện [ethereum-ens](https://www.npmjs.com/package/@ensdomains/ens) được hỗ trợ chính thức bởi đội ngũ developer của ENS có đầy đủ các tính năng. Các thư viện khác ít nhiều bị hạn chế ở một số điểm.

[web3.js](https://web3js.readthedocs.io/en/1.0/web3-eth-ens.html) không hộ trợ việc tạo domain, chuyển đổi chủ domain (transferring ownership) hay là thay đổi resolvers (updating resolvers).

[ethjs-ens](https://www.npmjs.com/package/ethjs-ens) chỉ hỗ trợ việc forward và phân giải tên ENS domain.

Tương tự như [ethjs-ens](https://www.npmjs.com/package/ethjs-ens) là  [ethers.js](https://github.com/ethers-io/ethers.js).

### Tạo một ENS domain

Tạo domain trên mainnet Ethereum sẽ mất ETH nên chúng ta tạo mới domain trên testnet. Ở đây tôi chọn mạng Rinkeby. Quá trình tạo 1 domain gồm 3 bước.

![](https://images.viblo.asia/359a5f5b-8094-4ea1-bf09-44e68ca765b2.png)

Sau khi tạo thành công, hiển thị lên các thông tin cơ bản của domain.

![](https://images.viblo.asia/4062dffc-04cc-4fba-bd6d-bdcc7265fee5.png)




### Working with ENS

Trước khi bạn có thể bắt đầu tương tác với ENS, chúng ta  sẽ cần có được một tham chiếu đến ENS registry.

```js
// ethereum-ens
let ENS = require('ethereum-ens');

let accounts = ethereum.enable();
let ens = new ENS(ethereum);
```

```js
// web3-js
let Web3 = require("web3")

let accounts = ethereum.enable();
let web3 = new Web3(ethereum);
let ens = web3.eth.ens;
```

Kết quả trả về khi dùng web3-js như sau:

```js
web3.eth.ens.registry;
{
    ens: ENS,
    contract: Contract,
    owner: Function(name),
    resolve: Function(name)
}
```

### Phân giải ENS domain thành địa chỉ

```js
// ethereum-ens
let address = await ens.resolver('sunblockchain.eth').addr();
```

```js
// web3-js
let address = ens.getAddress('sunblockchain.eth');
```

Ví dụ với web3-js:

```js
web3.eth.ens.getAddress('sunblockchain.eth').then(function (address) {
    console.log(address);
})
> 0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359
```

### Phân giải địa chỉ thành ENS domain

```js
// ethereum-ens
const address = '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359';
var name = await ens.reverse(address).name()
// Check to be sure the reverse record is correct.
if(address != await ens.resolver(name).addr()) {
  name = null;
}
```

### Quản lý domain name

#### Thay đổi owner của domain

```js
// ethereum-ens
await ens.setOwner('alice.eth', '0xE5d05238D35D22A2DC50ff98EFebaddc937FD8dB', {from: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'});
```

#### Tạo subdomains

```js
// ethereum-ens
await ens.setSubnodeOwner('conglt.sunblockchain.eth', '0xE5d05238D35D22A2DC50ff98EFebaddc937FD8dB', {from: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'});
```

## 4. Demo

Ở phần này, chúng ta sẽ viết một Dapp đơn giản có chức năng:
- Gửi ETH cho tài khoản khác qua address thông thường
- Gửi ETH cho tài khoản khác thông qua ENS domain name


### Khởi tạo thư mục và cài đặt các package cần thiết

```bash
npx create-react-app demo-ens
cd demno-ens
```

```bash
yarn add ethereum-ens web3 antd --save-dev
```

### GetWeb3

```bash
cd src
mkdir ultils
cd ultils
touch getWeb3.js
```


```js
// getWeb3.js

import Web3 from 'web3';

const getWeb3 = async () => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed

      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
};

export default getWeb3;
```

### Viết Component

```js
// App.js

import React, { useEffect } from 'react';
import './App.css';
import getWeb3 from './ultils/getWeb3';
import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import ENS from 'ethereum-ens';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function App() {
  useEffect(() => {
    const connectWeb3 = () => {
      window.addEventListener('load', async () => {
        getWeb3();
      });
    };
    connectWeb3();
  });

  const onFinish = async (values) => {
    let web3 = window.web3;

    let myAccount = web3.currentProvider.selectedAddress;

    if (values.ens) {
      try {
        let ens = new ENS(web3);
        let address = await ens.resolver(values.address).addr();
        console.log(address);

        await web3.eth.sendTransaction({
          from: myAccount,
          to: address,
          value: values.value * 1000000000000000000,
        });

        console.log('Success');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await web3.eth.sendTransaction({
          from: myAccount,
          to: values.address,
          value: values.value * 1000000000000000000,
        });

        console.log('Success');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='App'>
      <div className='App-header'>
        <Form
          {...layout}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Address'
            name='address'
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='ETH'
            name='value'
            rules={[{ required: true, message: 'Please input your value!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout} name='ens' valuePropName='checked'>
            <Checkbox>Use ENS Domain</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default App;
```
- Có 2 ô input cho người dùng nhập `address` và số `ether` cần gửi
- Check box `Use ENS Domain` giúp người dùng tùy chọn có gửi qua **ENS Domain** hay không ?
- Nếu gửi qua  **ENS Domain** thì thư viện `ethereum-ens` sẽ phân giải domain và trả về địa chỉ trên mạng, sau đó gửi ether qua web3 như bình thường.


![](https://images.viblo.asia/477e5a8d-1ed9-4d3f-90e8-aa17dc5f3ecd.png)

Chúng ta thử gửi 0.00001 ether đến tên miền `conglt.eth`

![](https://images.viblo.asia/157d0380-5531-459a-ac12-fb3784036465.png)

Gửi thành công :+1:

![](https://images.viblo.asia/5c6d2030-ea5a-451c-86b0-5b54a639058b.png)

**Lưu ý**:
- Các bạn có thể tham khảo toàn bộ mã nguồn trên [Github](https://github.com/conglt10/demo-ens)
- Bản demo được deploy trên [Surge](http://demo-ens.surge.sh/)




## Tài liệu tham khảo

https://docs.ens.domains/