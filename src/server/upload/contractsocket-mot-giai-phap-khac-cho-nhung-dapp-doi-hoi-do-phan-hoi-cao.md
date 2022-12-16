# Mở đầu 
Trong bài trước của mình : [JSON RPC - Khi không còn phải phụ thuộc vào web3](https://viblo.asia/p/json-rpc-khi-khong-con-phai-phu-thuoc-vao-web3-07LKXy4pZV4) thì mình đã đề cập đến việc mình dùng rpc để cải thiện tốc độ hơn cho ứng dụng của mình, thì bài viết mới này của mình cũng sẽ đề cập đến một phương pháp nữa đó là dùng contractSocket để listen event

**Lưu ý:** Theo ý kiến cá nhân thì ứng dụng socket này chỉ nên áp dụng với những blockchain có TPS lớn vì mục đích phần lớn là xây dựng những ứng dụng đòi tính phản hồi cao (game) . Còn với những blockchain cần thời gian lớn để verify cho 1 trx thì vẫn dùng được thôi nhưng về cơ bản mình thấy khi đấy việc chọn loại blockchain đó để xây ứng dụng đòi hỏi phản hồi cao là đã sai ngay từ đầu.

![](https://images.viblo.asia/c167a37d-b983-4edf-950b-07d9287246c6.png)


# Chuẩn bị
Về cơ bản thì phần này chúng ta sẽ cần một chút kinh nghiệm về solidity và một chút reactjs

Trong trường hợp bạn chưa có kinh nghiệm về phần này có thể tham khảo qua series :
[Public blockchain for newbie](https://viblo.asia/s/public-blockchain-for-newbie-nB5pX8Rw5PG)

Custom mạng tomochain testnet với các thông số :
* Chain id: 89
* RPC endpoint: https://rpc.testnet.tomochain.com
* Websocket endpoint: wss://ws.testnet.tomochain.com
* Metrics endpoint: https://metrics.testnet.tomochain.com

Lí do tại sao mình dùng tomochain testnet thì là vì cơ bản tốc độ 1 trx khá nhanh cũng như nền tảng này cũng đã được dùng để xây dựng những ứng dụng đòi hỏi độ phản hồi nhanh (game).

Và đừng quên vào đây để xin ít tomo để test nhé : https://faucet.testnet.tomochain.com/

# Thực hành
Phần này sẽ có 2 phần cơ bản là xây dựng contract, deploy và viết ứng dụng web hiển thị. 

## Viết smart contract

Thay vì việc dài dòng viết trên truffle thì mình sẽ sử dụng remix để có thể vừa dev cũng như deploy contract luôn (deploy trên remix cũng sẽ rẻ hơn vì không mất một lượng phí cho contract migration) : 
http://remix.ethereum.org/

Viết một smart contract đơn giản :
```js
pragma solidity 0.5.0;

contract Socket {
   
    address public owner;
    uint256 public count;
    
    event Increase(address indexed sender, uint256 count);
    
    constructor() public {
        owner = msg.sender;
    }
    
    function increase() external {
        count = count + 1;
        emit Increase(msg.sender, count);
    }
}
```

Nhớ chọn compiler là 0.5.0 nhé, không thì sẽ log lỗi liên tục đấy.

Về cơ bản thì contract này sẽ gồm biến **count** sẽ được thay đổi khi thực thi trx **increase**, bên cạnh đó trx này cũng sẽ emit ra một event **Increase(address indexed sender, uint256 count);** .
Event này được đánh index là địa chỉ của người tạo trx và giá trị **count** ngay sau khi thay đổi.

Rồi, tiếp theo sẽ là việc deploy contract, lưu ý là nên faucet khoảng ~50 tomo vì việc deploy sẽ khá tốn.

Với những bạn chưa từng deploy contract với tomo thì sẽ cần phải lưu ý là phải tăng **Gas price** lên khá lớn, nếu không thì không thể deploy được contract:

![](https://images.viblo.asia/ad8eedf5-6621-40da-b062-ba48f2c7dbca.png)


Về cơ bản thì lượng transaction fee sẽ lên khoảng vài chục ETH (hiển thị là ETH nhưng thực chất là TOMO), còn Gas Limit thì các bạn có thể để cho remix estimate.

So, đã deploy xong contract, chuyển sang phần Frontend thôi nhỉ , và nhớ là đừng tắt tab remix vội nhé vì sau này sẽ cần đó.

## Dựng frontend

Việc xây dựng frontend thì mình sẽ chủ yếu tập trung vào việc get event từ contract thông qua socket chứ không tập trung vào giao diện html hay css.

Đầu tiên là tạo project với create-react-app:

```js
npx create-react-app socket
```

![](https://images.viblo.asia/6485a9c2-b81c-4377-b19e-f3eeab3a4f84.png)

Okay, vây là init oke, thêm module web3 vào package.json là đủ dependencies:

```bash
    "web3": "^1.2.6"
```

Tiếp theo là thêm 1 hàm getWeb3.js để lấy provider từ web3:

```js
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

Sau đó là thêm file abi của contract chúng ta vừa deploy. Ngay ở tab remix chúng ta vừa deploy chuyển sang compiler thì sẽ thấy một phần để lấy ABI, click thẳng vào đó là ABI sẽ được copy vào clipboard:
![](https://images.viblo.asia/ddc82476-207d-44b7-8d9b-2c55c041d96f.png)

Và nhớ **yarn install** để cài thêm gói web3 mà chúng ta vừa thêm vào. Kết quả cấu trúc file sẽ như sau :

![](https://images.viblo.asia/ffdeb2d4-8291-400e-a7de-de001e44e3ea.png)

Đã đầy đủ, bắt đầu chúng ta sẽ viết hàm lấy web3 từ metamask để lấy địa chỉ của ví hiện tại, trong này sẽ sử dụng 2 hooks cơ bản là useState và useEffect :
```js
import React, { useState, useEffect } from 'react';
import abi from './abi.json';
import logo from './logo.svg';
import getWeb3 from './getWeb3';
import './App.css';
import Web3 from 'web3';
```

Đầu tiên là sẽ dùng useState để khởi tạo 3 biến:

```js
const [web3, setWeb3] = useState(null);
const [address, setAddress] = useState(null);
const [contractSocket, setContractSocket] = useState(null);
```

Đầu tiên khi load vào trang là chúng ta sẽ lấy ngay web3 và địa chỉ ví bằng hook:

```js
useEffect(() => {
    let initWeb3 = async () => {
      let web3;
      try {
        if (window.web3) {
          web3 = await getWeb3();
          setWeb3(web3);
        }
      } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };
    let initAddress = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      }
    };
    initWeb3();
    initAddress();
  }, [web3, address]);
```

Tiếp đó sẽ viết một function để lắng nghe event từ contract mà chúng ta đã deploy:

```js
async function listenEvent() {
    if (web3 && contractSocket) {
      let currentBlock = await web3.eth.getBlockNumber();
      contractSocket.events
        .Increase({
          filter: { sender: address },
          fromBlock: currentBlock
        })
        .on('data', (events) => {
          if (events) {
            let count = events.returnValues['count'];
            alert(count);
          }
        });
    }
  }
```

Vậy là oke, phần tiếp theo sẽ là phần quan trọng nhất của cả bài viết, cách dựng socket cũng như duy trì nó. Như các bạn đã biết, thì các socket sẽ tự động ngắt để tiết kiệm tài nguyên, tuy nhiên trong trường hợp này chúng ta lại muốn nó lắng nghe liên tục vì event có thể bắn ra bất cứ lúc nào. Do đó mình viết thêm 2 hàm:
 
 * **restartReadWeb3**: Khởi tạo lại provider, web3Socket và contractSocket
 * **setUpProvider** : Hàm này như một hàm check các trạng thái của socket, trong trường hợp bị lỗi hay bị ngắt sẽ tự dộng gọi là **restartReadWeb3**

Như vậy chúng ta sẽ thành một vòng tròn để có thể kéo dài socket đến khi dừng ứng dụng.

Đầu tiên là **restartReadWeb3**, hàm này sẽ khởi tạo lại provider thông qua endpoint socket được cung cấp bởi tomochain ở phần mở đầu đã giới thiệu, sau khi khởi tạo provider sẽ gọi **setUpProvider** để chaining chúng lại ngăn cho việc bị dừng bất chợt. Và cuối cùng là gọi lại hàm listenEvent để subcribe event:

```js
async function restartReadWeb3() {
    let provider = new Web3.providers.WebsocketProvider('wss://ws.testnet.tomochain.com');
    let web3Socket = new Web3(provider);
    setUpProvider(provider);
    let contractSocket = new web3Socket.eth.Contract(
      abi,
      '0xBB7Bb804D6d992789086925737F48A5CB5fbEA12',
      {
        transactionConfirmationBlocks: 1
      }
    );
    setContractSocket(contractSocket);
    listenEvent();
  }
```

Tiếp theo là hàm **setUpProvider**, hàm này về cơ bản không có quá nhiều thứ phức tạp

```js
 async function setUpProvider(provider) {
    provider.on('connect', () => console.log('WS Connected'));
    provider.on('error', (e) => {
      console.log('WS error', e);
      restartReadWeb3();
    });
    provider.on('end', (e) => {
      console.log('WS closed');
      console.log('Attempting to reconnect...');
      restartReadWeb3();
    });
  }
```

Gần xong, cái cuối cùng sẽ là phần khởi tạo contract ban đầu cũng như là bước đầu init socket:
```js
useEffect(() => {
    if (web3) {
      let provider = new Web3.providers.WebsocketProvider('wss://ws.testnet.tomochain.com');
      let web3Socket = new Web3(provider);
      let contractSocket = new web3Socket.eth.Contract(
        abi,
        '0xBB7Bb804D6d992789086925737F48A5CB5fbEA12',
        {
          transactionConfirmationBlocks: 1
        }
      );
      setUpProvider(provider);
      setContractSocket(contractSocket);
      listenEvent();
    }
    // eslint-disable-next-line
  }, [web3, address]);
```

Ở đây sẽ khởi tạo contract từ địa chỉ mà chúng ta đã deploy trên remix và abi của chính nó.

Về cơ bản thì phần code thô đã xong, giờ chỉ cần test, để cho nhanh gọn thì chúng ta tạo luôn transaction trên remix:

![](https://images.viblo.asia/7b29566e-234d-4991-bf4a-d70a86991a87.png)

Tạo trx **increase()** sẽ emit ra event, như các bạn thấy phần logs sẽ show ra count và sender.

![](https://images.viblo.asia/c2bbcdb7-6422-4230-ae43-30158d8c4191.png)

Okei vậy cơ bản thì chúng ta cần tập trung chủ yếu vào việc khởi tạo cũng như reconnect lại web3socket là mọi thứ sẽ an toàn.

Phần web3socket sẽ reconnect lại liên tục trong quá trình chúng ta vẫn sử dụng ứng dụng :
![](https://images.viblo.asia/84eb118a-be03-4839-b1f2-de62108edb35.png)


# Kết luận

Về cơ bản thì bài viết này của mình như một bản note về việc sử dụng contractSocket - một kiến thức mà mình mới tiếp cận sau khi xây dựng một ứng dụng game realtime đầu tiên trên tomochain : https://www.dapp.com/dapp/cryptomind . Và tất nhiên là các bạn cũng lưu ý là endpoint socket trên phần testnet chưa thực sự ổn định nên có thể socket có thể lỗi một cách bất ngờ