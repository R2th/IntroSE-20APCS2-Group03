Trong vài viết [Xây dựng Backend cho Decentralized Application (ĐApp)](https://viblo.asia/p/xay-dung-backend-cho-decentralized-application-dapp-m68Z0Qj6lkG) chúng ta cũng đã đề cập tới việc event trong Ethereum là thiếu ổn định. Vì thế ta cần xây dựng một cơ chế có thể lắng nghe, lưu trữ và xử lý event một cách hiệu quả hơn.

[Eventeum](https://github.com/ConsenSys/eventeum/) chính là một giải pháp.

## Eventeum là gì

Eventeum là một _Ethereum event listener_, đóng vai trò cầu nối giữa smart contract event và backend.

Mỗi khi có event xảy ra, thì một message bao gồm toàn bộ detail của event đó sẽ được lưu trữ tại `message bus` (Kafka hoặc RabbitMQ), sau đó sẽ được xử lý bởi các service phía backend.

Eventeum có [mã nguồn mở](https://github.com/ConsenSys/eventeum/), được phát triển bởi [kauri.io](https://kauri.io/) team.

![](https://images.viblo.asia/b2a91cd3-5e1d-4e01-93d6-9315eafdbf08.png)

## Why Eventeum

Nếu so sánh với việc trực tiếp lắng nghe và trực tiếp xử lý event luôn tại backend thì Eventeum có rất nhiều điểm vượt trội, có thể kể đến như:

- **Dynamically Configurable**: Eventeum có cung cấp REST API để có thể subscribed/unsubscribed các event bất kì một cách vô cùng đơn giản.
- **Highly Available**: Eventeum luôn đảm bảo tất cả những instance sẽ subscribed những event collection giống nhau với mỗi smart contract.
- **Resillent**: Dù node mà ta kết nối đến có thể chết nhưng event subscription vẫn sẽ được tiếp tục một khi node sống trở lại.
- **Fork Tollerance**: Eventeum có thể được config để chờ một khoảng thời gian sau một lượng block nhất định mới chuyển sang trạng thái là `confirmed`. Nếu xảy ra sự kiện `fork` trong giai đoạn đó, một message sẽ được broadcast cho toàn bộ network, giúp ta có thể xử lý các logic dành riêng cho sự kiện fork này.

## Deploying Eventeum

Eventeum support các phương pháp broadcast message sau:

- Kafka
- HTTP Post
- RabbitMQ
- Pulsar

với RabbitMQ ta có thể config thêm các trường sau:

- `rabbitmq.blockNotification` (true or false)
- `rabbitmq.routingKey.contractEvents`
- `rabbitmq.routingKey.blockEvents`
- `rabbitmq.routingKey.transactionEvents`

### Prerequisites

- Java8
- Maven
- Mongo
- Kafka
- Zookeeper
- Ethereum Node
- Docker

Trông có vẻ khá rắc rối khi nhiều thứ phải cài cắm, tuy nhiên ta có thể đơn giản hoá việc cài đặt này bằng cách sử dụng Docker như sau:

- clone repo của Eventeum về:

```bash
git clone https://github.com/ConsenSys/eventeum.git
```

- di chuyển tới root directory

```bash
cd eventeum
```

- compile và test package

```bash
mvn clean package
```

- chạy docker

```bash
cd server
docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up
```

Ok như vậy là ta đã có Eventeum chạy trong máy của chúng ta. Eventeum sẽ mặc định chạy ở cổng `8060`.

## Deploy smart contract

Trong bài này ta sẽ sử dụng [Remix IDE](https://remix.ethereum.org/) để viết và deploy contract một cách nhanh chóng.

Blockchain sử dụng là ganache, được chạy bởi `ganache-cli` tại cổng 8545. Nếu chưa có ganache-cli ta có thể install bằng `npm` như sau:

```bash
npm install -g ganache-cli
```

và tiến hành chạy chain lên:

```bash
ganache-cli
```

Khi này ta đã có một blockchain chạy tại địa chỉ `http://127.0.0.1:8545`.

```js
Gas Price
==================
20000000000

Gas Limit
==================
6721975

Call Gas Limit
==================
9007199254740991

Listening on 127.0.0.1:8545
```

Tiếp theo, ta sẽ chuẩn bị một contract đơn giản như sau:

```js
pragma solidity ^0.5.0;

contract Counter {

    uint256 counter;

    function get() external view returns (uint256) {
        return counter;
    }

    function set(uint256 newValue) external {
        counter = newValue;
        emit CounterUpdated(newValue);
    }

    event CounterUpdated(uint256 newCounter);
}
```

Trên Remix, tiến hành compile contract, hãy đảm bảo rằng không có lỗi nào xảy ra:

![](https://images.viblo.asia/820d199e-4425-4711-b326-a1559ab9b552.png)

Trước khi deploy, hãy nhớ chọn network là `Web3 Provider` và chọn địa chỉ `http://127.0.0.1:8545` là địa chỉ blockchain chúng ta mới chạy bên trên.

và tiến hành Deploy:

![](https://images.viblo.asia/ab24a6ca-3d84-4805-8ee9-820d70ec4f7d.png)

Vậy là giờ ta đã có contract đã được deploy lên blockchain.

## Register Event

Tiếp theo chúng ta sẽ đăng ký event với Eventeum, để mỗi khi event xảy ra ra sẽ bắt được event đó, ở đây là event `CounterUpdated` ta đã định nghĩa trong contract.

- URL: `/api/rest/v1/event-filter`
- Method: `POST`

để đơn giản, ở đây ta gọi bằng curl, hãy thay đoạn `CONTRACT_ADDRESS` bằng địa chỉ contract mà ta đã deploy tại Remix ở trên:

```bash
curl -X POST \
http://localhost:8060/api/rest/v1/event-filter \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: application/json' \
-H 'Postman-Token: 616712a3-bf11-bbf5-b4ac-b82835779d51' \
-d '{
"id": "CounterUpdatedEvent",
"contractAddress": "CONTRACT_ADDRESS",
"eventSpecification": {
  "eventName": "CounterUpdated",
  "nonIndexedParameterDefinitions": [{"position": 0, "type": "UINT256"}]
  }
}'
```

nếu thành công ta sẽ thấy message như thế này trong docker log mesages:

```js
registerContractEventFilter - Registered filters: {"CounterUpdatedEvent":{"filter":{"id":"CounterUpdatedEvent","contractAddress":"0x1F5DAf1B8aE9fE2C28Bb8206dF13962906A98db0","node":"default","eventSpecification":{"eventName":"CounterUpdated","indexedParameterDefinitions":[],"nonIndexedParameterDefinitions":[{"position":0,"type":"UINT256"}]}},"subscription":BufferAsyncEmitter{9223372036854775807},"startBlock":0}}
```

Ta sẽ kiểm tra xem sau khi đã đăng kí với Eventeum rồi thì khi tương tác với contract, event có được bắn ra không bằng cách lên Remix và thực hiện transaction như sau:

![](https://images.viblo.asia/e129c6f2-9876-40fa-8487-1b08d294ab5e.png)

Trên docker logs của eventeum, ta nhận được log như sau:

```js
broadcastContractEvent - Sending contract event message: {"id":"0x00d319cdc9cc80de18642f7f2bb1e3701433f2417225d61791266e055fe07541-0x3f2b9dfc3e9dc86aea43dd11ec6482dfdc05cc454c9de81b19e3b5344515e69a-0","type":"CONTRACT_EVENT","details":{"name":"CounterUpdated","filterId":"CounterUpdatedEvent","nodeName":"default","indexedParameters":[],"nonIndexedParameters":[{"type":"uint256","value":123}],"transactionHash":"0x00d319cdc9cc80de18642f7f2bb1e3701433f2417225d61791266e055fe07541","logIndex":0,"blockNumber":12,"blockHash":"0x3f2b9dfc3e9dc86aea43dd11ec6482dfdc05cc454c9de81b19e3b5344515e69a","address":"0x492934308E98b590A626666B703A6dDf2120e85e","status":"UNCONFIRMED","eventSpecificationSignature":"0x4785d80d2593e2cb7a3331d31eb5106408bdde2aab0db9e9b616b036a1b6039d","networkName":"default","id":"0x00d319cdc9cc80de18642f7f2bb1e3701433f2417225d61791266e055fe07541-0x3f2b9dfc3e9dc86aea43dd11ec6482dfdc05cc454c9de81b19e3b5344515e69a-0"},"retries":0}
```

có nghĩa là việc lắng nghe event của chúng ta đa được cài đặt thành công!

Eventeum có rất nhiều API khác nữa, ta có thể tham khảo thêm [tại đây](https://github.com/ConsenSys/eventeum/).

## Subscribing Eventeum events trong ứng dụng NodeJs

Ta sẽ xây dựng một nodejs ứng dụng nho nhỏ để có thể hình dung ra việc tích hợp Eventeum vào trong app thực tế thế nào.

```bash
mkdir watcher
cd watcher
npm init
npm install
npm i kafka-node  (Kafka-nodejs client)
touch index.js
```

nội dung của `index.js` rất đơn giản, lắng nghe được gì thì log ra cái đó. Ở đây ta sử dụng topic `contract-events`, đây là một builtin của Eventeum, nó sẽ check tất cả những topic đã được define bên trong Eventeum.

```js
var kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
var kafka = require('kafka-node'),
  Consumer = kafka.Consumer,
  consumer = new Consumer(
    client,
    [{ topic: 'contract-events', partition: 0 }],
    {
      autoCommit: false,
    }
  );
consumer.on('message', function (message) {
  console.log(message);
});
```

Tiến hành chạy thêm một transaction nữa trên Remix:

![](https://images.viblo.asia/6d9d8671-4f52-4e02-b880-306b11cff50b.png)

ta sẽ thấy được log của nodejs sẽ như sau:

```js
{ topic: 'contract-events',
  value:
   '{"id":"0xdf064648f5923f3f015f53d464f2d95fce2540b0ab6a1e851e3603ff781b894b-0x204c9b64582e5154fa63f3e32c9b3960ea30a88c6d1f97abe7985a16b2762805-0","type":"CONTRACT_EVENT","details":{"name":"CounterUpdated","filterId":"CounterUpdatedEvent","nodeName":"default","indexedParameters":[],"nonIndexedParameters":[{"type":"uint256","value":123}],"transactionHash":"0xdf064648f5923f3f015f53d464f2d95fce2540b0ab6a1e851e3603ff781b894b","logIndex":0,"blockNumber":11,"blockHash":"0x204c9b64582e5154fa63f3e32c9b3960ea30a88c6d1f97abe7985a16b2762805","address":"0x492934308E98b590A626666B703A6dDf2120e85e","status":"UNCONFIRMED","eventSpecificationSignature":"0x4785d80d2593e2cb7a3331d31eb5106408bdde2aab0db9e9b616b036a1b6039d","networkName":"default","id":"0xdf064648f5923f3f015f53d464f2d95fce2540b0ab6a1e851e3603ff781b894b-0x204c9b64582e5154fa63f3e32c9b3960ea30a88c6d1f97abe7985a16b2762805-0"},"retries":0}',
  offset: 0,
  partition: 0,
  highWaterOffset: 2,
  key:
   '0xdf064648f5923f3f015f53d464f2d95fce2540b0ab6a1e851e3603ff781b894b-0x204c9b64582e5154fa63f3e32c9b3960ea30a88c6d1f97abe7985a16b2762805-0' }
{ topic: 'contract-events',
  value:
   '{"id":"0x00d319cdc9cc80de18642f7f2bb1e3701433f2417225d61791266e055fe07541-0x3f2b9dfc3e9dc86aea43dd11ec6482dfdc05cc454c9de81b19e3b5344515e69a-0","type":"CONTRACT_EVENT","details":{"name":"CounterUpdated","filterId":"CounterUpdatedEvent","nodeName":"default","indexedParameters":[],"nonIndexedParameters":[{"type":"uint256","value":234567}],"transactionHash":"0x00d319cdc9cc80de18642f7f2bb1e3701433f2417225d61791266e055fe07541","logIndex":0,"blockNumber":12,"blockHash":"0x3f2b9dfc3e9dc86aea43dd11ec6482dfdc05cc454c9de81b19e3b5344515e69a","address":"0x492934308E98b590A626666B703A6dDf2120e85e","status":"UNCONFIRMED","eventSpecificationSignature":"0x4785d80d2593e2cb7a3331d31eb5106408bdde2aab0db9e9b616b036a1b6039d","networkName":"default","id":"0x00d319cdc9cc80de18642f7f2bb1e3701433f2417225d61791266e055fe07541-0x3f2b9dfc3e9dc86aea43dd11ec6482dfdc05cc454c9de81b19e3b5344515e69a-0"},"retries":0}',
  offset: 1,
  partition: 0,
  highWaterOffset: 2,
  key:
   '0x00d319cdc9cc80de18642f7f2bb1e3701433f2417225d61791266e055fe07541-0x3f2b9dfc3e9dc86aea43dd11ec6482dfdc05cc454c9de81b19e3b5344515e69a-0' }
```

như vậy ta đã tích hợp thành công Eventume vào một ứng dụng nodejs.

## Kết luận

Với những hệ thống nhỏ, việc log event không quá nhiều thì ta hoàn toàn có thể sử dụng phương án lắng nghe trực tiếp từ network và xử lý ngay khi lắng nghe được.

Tuy nhiên khi hệ thống của chúng ta lớn lên, đòi hỏi lượng event nhiều và cấu trúc phức tạp, thì Eventum sẽ là một lựa chọn hiệu quả.

## Tham khảo

- https://medium.com/quiknode/ethereum-events-monitoring-using-eventeum-f81695d92e05
- https://github.com/ConsenSys/eventeum/
- https://kauri.io/listening-to-ethereum-events-with-eventeum/90dc8d911f1c43008c7d0dfa20bde298/a
- https://kauri.io/listening-for-ethereum-transactions-with-eventeum/3e31587c96a74d24b5cdd17952d983e9/a