# Drizzle Framework là gì ?
**Drizzle** là một  Javascript framework giúp chúng ta xây dựng front-end cho một Dapp một cách dễ dàng hơn.  Nó được phát hành bởi đội ngũ của Truffle framework vào đầu năm 2018. Nó thì có sẵn trong trình quản lý package `npm` nên chúng ta có thể dễ dàng cài đặt nó. Vậy chức năng chính của nó là gì nhỉ ?

![](https://images.viblo.asia/64c8e5b2-1b03-46d4-bb1c-61909712db05.jpg)

Bạn có thể nhận thấy rằng ta phải code rất nhiều khi muốn code chức năng giao dịch với web3, ví dụ khi bạn muốn làm chức năng ký hợp đồng tự động hoặc khi bạn định cấu hình đối tượng web3. Bên cạnh đó, bạn cũng phải viết code để gọi các chức năng trong smart contract của mình và nó có thể khá lặp đi lặp lại. Và cuối cùng, bạn cần tạo giải pháp của riêng mình để có thể hiển thị response cho người dùng trong khi giao dịch đang chờ xử lý. Và nó thì không hề dễ dàng.

Đừng lo **Drizzle** sẽ giải quyết những vấn đề này. Nó sẽ giúp bạn đỡ phải code nhiều và đơn giản hóa việc tích hợp giao diện Dapp của bạn với smart contract. Với **Drizzle** , rất nhiều những tích hợp với smart contract của bạn giờ đây trở nên đơn giản hóa. Nói cách khác, bạn chỉ cần thực hiện đúng cấu hình và **Drizzle** sẽ tìm ra phần còn lại.


Bây giờ bạn đã biết thêm một chút về **Drizzle**, nhưng giờ một câu hỏi là khi nào ta thực sự cần nó và so sánh với việc chỉ sử dụng web3 với việc sử có sử dụng thêm **Drizzle** chúng ta sẽ cùng đến phần tiếp theo nha?


# Components của Drizzle
Drizzle có 3 thành phần chính : 
  + [drizzle](https://github.com/trufflesuite/drizzle) 
  + [drizzle-react](https://github.com/trufflesuite/drizzle-react)
  + [drizzle-react-components](https://github.com/trufflesuite/drizzle-react-components)
    
**Drizzle** là thư viện logic cốt lõi của Drizzle dựa trên store của `Redux`. Vì vậy bạn có thể truy cập vào các công cụ phát triển tuyệt với của `Redux`

**Drizzle-react** cho phép dễ dàng tích hợp Drizzle vào ứng dụng React của bạn. Nó cung cấp một Provider component cấp bậc cao hơn, bao bọc các thành phần khác của bạn và chuyển cho chúng xuống  state của Drizzle.

**Drizzle-react-components** cung cấp một số react components sẵn sàng sử dụng cho các ứng dụng của bạn, chẳng hạn như components display accounts, component read data smart contract và components recording data.

# Drizzle State
Vào bên trong mã nguồn của Drizzle ta có thể thấy state của Drizzle như sau:
```js
    {
      accounts,
      accountBalances: {
        address
      }
      contracts: {
        contractName: {
          initialized,
          synced,
          events,
          callerFunctionName: {
            argsHash: {
              args,
              value
            }
          }
        }
      },
      currentBlock,
      drizzleStatus: {
        initialized
      },
      transactions: {
        txHash: {
          confirmations,
          error,
          receipt,
          status
        }
      },
      transactionStack,
      web3: {
        status
      }
    }
```
Với Docs có họ giải thích như sau


#### accounts (array)
+ Là một mảng các account addresses đến từ web3.
   
#### accountBalances (object)
+ Một đối tượng có key là account addresses và value là số dư tài khoản (tính bằng Wei)

#### contracts (object)
+ Là một series các contract state objects, được lập chỉ mục là contract name như được khai báo trong ABI của nó.

#### contractName (object)
+ **initialized** (boolean):  **true** khi  contract được khởi tạo đầy đủ. **synced** (boolean): **false** nếu thay đổi state contract đã xảy ra trong một block và Drizzle đang chạy lại các cuộc gọi của nó.

+ **events** (array):  là một array các đổi tượng event, Drizzle sẽ chỉ lắng nghe các events mà chúng ta khai báo trong options.
+ **args** (array): là đối số truyền vào , **value** (mixed): là giá trị trả về từ việc call function.

#### currentBlock (object)
- Là object mới nhất mà nhận về từ kết quả của việc gọi hàm **web3.getBlock()**. 

#### drizzleStatus (object) 
- Là một object có chứa thông tin về status của Drizzle
- **initialized** (boolean):  **true** khi : 
    + **web3** được tìm thấy hoặc khởi tạo
    + Account addresses được lưu trong state
    + Tất cả các contracts được khởi tạo

#### initialized (boolean)
- Mặc định là **false**, cho đến khi nào một instance web3 được tìm thấy, các accounts và  contracts được napj vào

#### transactions (object) 
- Là một series các transaction objects, được lập chỉ mục bởi transaction hash.

#### txHash (object) 
- **confirmations** (array): sau khi initial receipt, receipts sẽ confirmation thêm. **error** (object): chứa lỗi trả về nếu có. **receipt** (object):  chứa receipt nhận transaction đầu tiên từ **success** event.
- **status** (string): **true** hoặc **false** phục thuộc vào status của transaction
    + **pending** khi transaction được broadcast thành công nhưng chưa được mined
    + **success** khi nhận được receipt của transaction 
    + **error** nếu có lỗi xảy ra sau khi broadcast
- Để biết thêm chi tiết về vòng đời của Ethereum transaction có thể đọc tại đây [ check out this great blog post.](https://medium.com/blockchannel/life-cycle-of-an-ethereum-transaction-e5c66bae0f6e)

#### transactionStack (array) 
- Trong trường hợp người dùng hủy transaction hoặc transaction không đúng định dạng và không thể broadcast được, nó sẽ không nhận được mã hash. Để theo dõi các trường hợp này, một ID tạm thời sẽ được thêm vào array này và được thay thế với mã hash transaction sau khi được broadcast. Hàm **cacheSend()** sẽ trả về **stackId** 

#### web3 (object)
- **status** (string):  có những lựa chọn là **initializing**, **initialized** và **failed**. Hữu ích để kích hoạt cảnh báo nếu **web3** không khởi tạo được

# Drizzle hoạt động như thế nào?
Trước tiên ta cần phải kết hợp smart contract mà ta đang theo dõi với một đối tượng cấu hình trong Drizzle. Và việc còn lại sẽ là của Drizzle :

   + Nó sẽ kết nối blockchain Ethereum với Web3
   + Sau đó nó sẽ duy trì trạng thái state storing nội bộ là kết quả của chức năng gọi đến state của smart contract. State này được lưu trữ trong một redux store, phía client. Drizzle sẽ giữ cho trạng thái này được cập nhật, mà ta không cần phải làm  gì cả.
   + Và nó cũng sẽ chuyển tiếp các giao dịch đến smart contract (ghi dữ liệu)

Việc đồng bộ hóa với dữ liệu của smart contract là điều rất quan trọng và **Drizzle** sẽ làm như thế này: 

  + Đầu tiên **Drizzle** subscribes vào các block headers mới. Block headers chứa siêu dữ liệu về từng block trong block chain Ethereum.
  + Bất cứ khi nào một block headers mới xuất hiện, **Drizzle** sẽ kiểm tra xem nó có chứa bất kỳ giao dịch nào liên quan đến các 
    smart contract của bạn mà đã được cấu hình lúc ban đầu hay không. Nếu có nó sẽ cập nhật state local ở client tương ứng. Nếu không thì **Drizzle** sẽ bỏ qua block headers đó.
    
Một điều cuối cùng tôi muốn nói với bạn về hoạt động bên trong của **Drizzle** đó là mặc dù dữ liệu được cập nhật bởi **Drizzle**, nhưng tùy thuộc vào nhà phát triển Dapp để kết hợp lại với UI khi dữ liệu của **Drizzle** thay đổi. Thì có thể được thực hiện đơn giản bằng cách sử dụng react và drizzle-react.

# Tích hợp Drizzle với các framework khác (React, Truffle, Redux & Saga)

**Drizzle** có thể được sử dụng với các framework khác nhau, mặc dù nó được phát triển chính cho React. Nó thì sử dụng Redux và Saga, 2 thư viện phổ biến để quản lý **state** trong React. Bạn không cần phải sử dụng các thư viện này trong ứng dụng của mình, nhưng nếu có, bạn có thể tích hợp các `reducers` và `sagas` của bạn với các thư viện của **Drizzle**.

Drizzle thì cũng sử dụng web3 và bạn vẫn có thể truy cập đối tượng web3 trong code của mình nếu bạn cần linh hoạt hơn. Đó là một điều vô cùng tuyệt vời ;) ;) 

Về lý thuyết bạn có thể sử dụng bất kỳ một framework smart contract  nào bạn muốn. **Drizzle** sẽ nhận một tệp json mô tả về smart contract của bạn. Tất cả những gì **Drizzle** yêu cầu là tệp json này tuân theo định dạng của thư viện có tên là  [truffle-contract-schema](https://github.com/trufflesuite/truffle/tree/develop/packages/truffle-contract-schema) , cùng với những thứ khác, một số trường như `abi` và `address` triển khai của smart contract. Nếu bạn thực sự muốn, bạn có thể sử dụng một framework khác với `Truffle` chỉ cần truyền lại abi và address như trên. Nhưng, trừ khi bạn có một lý do rất chính đáng để làm điều này, đơn giản là chỉ cần sử dụng `Truffle` là đã tạo ra được `contract` mình mong muốn rồi.
# Hướng dẫn tạo một Dapp với Drizzle
### 1. Chuẩn bị 
Install `truffle` và `ganache-cli`:
   + Truflle:
        ```shell
            npm install -g truffle
        ```
        kết quả : 
        ```
            ~ $ truffle version
            
                Truffle v5.0.32 (core: 5.0.32)
                Solidity v0.5.0 (solc-js)
                Node v10.16.3
                Web3.js v1.2.1
        ```
       
    + ganache-cli:
         ```shell
             npm install -g ganache-cli
         ```
         kết quả : 
         ```
             ~ $ ganache-cli --version
             
             Ganache CLI v6.5.1 (ganache-core: 2.6.1-beta.0)
         ```

### 2. Tạo Dapp
Đầu tiên chúng ta sẽ tạo một mạng test chain với `ganache-cli` và tạo `unbox` Drizzle:
```shell
    // chạy ganache để tạo 1 mạng test chain.
    $ ganache-cli

    // tạo một project với unbox drizzle, nó sẽ tự kéo một khung có sẵn của unbox về
    $ truffle unbox drizzle
```
kết quả là sẽ có một khung có sẵn như thế này : 
    ![](https://images.viblo.asia/fa653d2e-4991-4815-8bc2-9f71083e2b58.png)
    
Sau đó, chúng ta sẽ phải sửa đổi file `truffle-config.js` mặc định để trỏ đến các tham số trong mạng test chain của  `ganache-cli`.
```js
    module.exports = {
      networks: {
        development: {
          host: '127.0.0.1',
          port: 8545,
          network_id: '*' // Match any network id
        }
      }
    };
```
    
Tiếp theo là compile và migrate smart contracts:
```shell
    $ truffle compile
    $ truffle migrate
```
    
### 3. Thêm toastify và tạo middleware để bắt sự kiện
Chúng ta sẽ lắng nghe sự kiện `SimpleStorage`  của contract `StorageSet` và hiển thị thông báo mỗi khi nó thực thi
`cd` vào `app` và install toastify:
```shell
    $ cd app
    $ npm install react-toastify
```
        
Để đơn giản, chúng ta sẽ làm việc trong file `./app/src/middleware/index.js`.
```shell
    $ mkdir ./src/middleware
    $ touch ./src/middleware/index.js
```
   
   import các thư viện cần thiết vào file `index` của `middleware`
   ```js
        ## ./app/middleware/index.js
        import { generateStore, EventActions } from 'drizzle'
        import drizzleOptions from '../drizzleOptions'
        import { toast } from 'react-toastify'
   ```
   
full file index sẽ là như sau :
```js
    import { generateStore, EventActions } from 'drizzle';
    import drizzleOptions from '../drizzleOptions';
    import { toast } from 'react-toastify';

    const contractEventNotifier = (store) => (next) => (action) => {
      if (action.type === EventActions.EVENT_FIRED) {
        const contract = action.name;
        const contractEvent = action.event.event;
        const message = action.event.returnValues._message;
        const display = `${contract}(${contractEvent}): ${message}`;

        toast.success(display, { position: toast.POSITION.TOP_RIGHT });
      }
      return next(action);
    };

    const appMiddlewares = [contractEventNotifier];

    export default generateStore({
      drizzleOptions,
      appMiddlewares,
      disableReduxDevTools: false // enable ReduxDevTools!
    });
```
    
Cuối cùng là kết nối vào `App.js`. Sửa đổi `MyComponent.js`để nhập `ReactToastify.css`và cấu hình `ToastContainer`
```javascript
    ...
    import { ToastContainer } from 'react-toastify'
    import 'react-toastify/dist/ReactToastify.css'
    ...

    export default ({ accounts }) => (
      <div className="App">
        <ToastContainer />
      ...
      </div>
```

### 4. Kiểm tra nhanh
- Ta sẽ kiểm tra theo tuần tự :
    + `Metamask`chuyển mạng qua test chain của `ganache-cli`  là  `http://localhost:8545`
    + Sử dụng `accounts[0]` của mang test chain `ganache-cli` tạo ra bằng cách import `private-key` vào `Metamask` để sử dụng
- Chạy thử ứng dụng :
    ```shell
     npm run start
    ```
    
- Thay đổi SimpleStorage `stored Value`
    ![](https://images.viblo.asia/c9fc5572-4bfa-4ddd-bfe0-019c55043b63.gif)
- Thông báo sẽ hiện lên 
    ![](https://images.viblo.asia/3eb2d173-b15a-4bf7-bf69-fcfec42594b8.png)
    như vậy là chạy ngon rồi đó
    
# Kết Luận
Đọc đến đây chắc các bạn cũng khá là kiên trì và có hứng thú thực sự với tìm hiểu **Drizzle** đấy :D :D . Đoạn giới thiệu hơi nhiều chữ nhưng đó là phần lý thuyết cần thiết để ta có thể có cái nhìn tổng quan và hiểu được cách thức hoạt động của Drizzle. Ta cũng sẽ không còn phải suy nghĩ làm sao để đồng bộ được dữ liệu giữu front-end client với smart contract nữa, mà bây giờ chỉ cần tập trung vào phát triển contract và front-end sao cho ổn. Việc còn lại cứ để Drizzle lo ;) ;) 


### Nguồn : 
- https://github.com/trufflesuite/drizzle
- https://github.com/trufflesuite/drizzle-react
- https://github.com/trufflesuite/drizzle-react-components 
- https://eattheblocks.com/introduction-to-drizzle-dapp-tutorial-with-react-truffle/#what-is-drizzle