**Binance smart chain** trong thời gian hiện tại đang nổi lên như một thế lực vô cùng mạnh mẽ cùng với BTC, ETH,, Polkadot,...

Trong bài viết lần này mình sẽ giới thiệu cho các bạn biết **Binance smart chain** (BSC) là gì và cách xây dựng ứng dụng trên nó.

![](https://images.viblo.asia/1a07c604-8489-49aa-b815-bcf742ea3ec8.jpeg)

# Giới thiệu chung

Trước khi giới thiệu về BSC thì mình sẽ đảo qua một chút về Binance chain . Vậy Binance chain là gì trước khi nó trở nên **smart** ?

Đầu tiên chúng ta sẽ nói qua về Binance Chain:

Binance chain được đề xuất và xây dựng với mục tiêu chính là tạo ra một sản phi tập trung cho Binance (Binnace DEX) : https://www.binance.org/en

Mục tiêu ban đầu là hỗ trợ giao dịch do đó cần phải đánh đổi việc có thể xây dựng các DApp cho mục tiêu chính là trao đổi giữa các loại token. User có thể tự issue các token trên Binance Chain, truy xuất thông tin transaction thông qua các SDK của BC nhưng chưa thể xây các Dapp trên nó.

Và để xử lý vấn đề không thể xây dựng Dapp, Binance smart chain đã ra đời.

# Binance smart chain

Điều khác biệt đầu tiên mà binance smart chain đem lại chính là nó có máy ảo EVM, do đó có thể chạy được các **Smart contract** tương tự trên, bên cạnh đó **BSC** cũng đã thay đổi một chút về consensus, nâng lượng validator lên . **BSC** là một chain chạy song song với Binance chain và không sinh thêm native token,  token native vẫn sẽ là **BNB** được mine từ Binace Chain sang.

Dưới đây sẽ là các thông số so sánh giữa 2 chain này :
![](https://images.viblo.asia/f70e8269-91bf-4028-93cf-9564f9ce87ce.png)


Các dự án trên **Binance smart chain**, do là kẻ đến sau nhưng với với tiềm lực mạnh về cả cộng đồng lẫn tài chính, **BSC** như con hổ đói đến bàn tiệc muộn, chi mạnh tài chính để đòi lại thị phần defi, và cũng đã có một vài kết quả nổi bật như các token đã được peg sang :

https://bscscan.com/tokens

![](https://images.viblo.asia/a146f915-dfcc-4563-a654-240d834c4527.png)


Và cũng đã có những Dapp tương tự như bên Ethereum xuất hiện trên Binance: 
![](https://images.viblo.asia/e8fe8729-e7d2-4d52-a253-883a2f958640.png)

# Xây dựng ứng dụng trên BSC

Đây sẽ là phần vô cùng đơn giản đối với nhưng ai đã từng dev smart contract trên Ethereum hẳn sẽ vô cùng quen thuộc với các bước dưới đây

## Dựng contract
Đầu tiên chúng ta sẽ sử dụng **MathWallet** để faucet một chút binance hỗ trợ việc test:

![](https://images.viblo.asia/3f2e0bb8-bb22-49e4-b69e-2f4a21d840aa.png)

Chuyển network sang **Binance Smart Chain - testnet** và sau đó lấy một chút bnb test ở trang web sau :

https://testnet.binance.org/faucet-smart

Okei vậy là đã sẵn sàng, chúng ta sẽ sử dụng trực tiếp trên remix để deploy thử một contract :

https://remix.ethereum.org/

Hãy thử deploy contract **Owner.sol** sau :

```js
pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Owner
 * @dev Set & change owner
 */
contract Owner {

    address private owner;
    
    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    
    // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    /**
     * @dev Set contract deployer as owner
     */
    constructor() public {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }
}
```

Connect ví MathWallet với remix :
![](https://images.viblo.asia/198fec5a-2e6e-450c-8c46-d9c6d29ace2f.png)

Sau đó deploy trực tiếp bằng remix và chúng ta đã có 1 instance mà có thể tương tác trực tiếp được luôn:

![](https://images.viblo.asia/cd8f6fd2-1ef4-4b2f-922c-43102ebae4b3.png)

## Tương tác với contract
Tương tác với DApp thông qua MathWallet, tại bài này mình sẽ giới thiệu một cách để tương tác với các Dapp trên BSC, ngoài ra các bạn cũng có thể tìm hiểu các cách sử dụng với TrustWallet hay Metamask bằng cách config web3

Để có thể tương tác với với contract, chúng ta sẽ dùng một package sau :
```bash
npm i @binance-chain/bsc-use-wallet
```

và đơn giản chỉ cần sử dụng hook useWallet đã được package đó cung cấp để tương tác với ví :

```js
// App.js

import React from 'react'
import { render } from 'react-dom'
import bsc from '@binance-chain/bsc-use-wallet'
import { UseWalletProvider } from 'use-wallet'

function App() {
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()

  return (
    <>
      <h1>Wallet</h1>
      {wallet.status === 'connected' ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>Balance: {wallet.balance}</div>
          <button onClick={() => wallet.reset()}>disconnect</button>
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={() => wallet.connect()}>MetaMask</button>
        </div>
      )}
    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default () => (
  (
    <UseWalletProvider connectors={{ bsc }}>
      <App />
    </UseWalletProvider>
  ),
  document.getElementById('root')
)
```

Cuối cùng, cảm ơn các bạn đã theo dõi bài viết của mình

# Nguồn:

- Binance academy: https://academy.binance.com/en

# Liên hệ
- Mail: chie.tm2002@gmail.com
- Telegram: @chientmCrypto