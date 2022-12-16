![](https://images.viblo.asia/24836c9f-e934-4f75-a33c-488478d8fc5e.png)

Nhắc đến truy vấn data trên blockchain thì hẳn nhiều người sẽ nghĩ đến việc sử dụng Ether.js hoặc Web3.js để query logs trong quá khứ. Mình cũng vậy ban đầu mình cũng sử dụng query logs này, đối với những dữ liệu nhỏ và ít đệ quy lồng nhau thì nó khá là đơn giản và hiệu quả. Như khi vấp phải một lượng query lồng nhau và phực tạp thì mình đã mất rất nhiều thời gian và đôi khi còn lỗi. Thì mình có tìm hiểu và được suggest sử dụng The Graph và khi sử dụng thì mình thấy quả thật nó rất hữu dụng. Thì hôm nay mình sẽ giới thiệu về công dụng và cách sử dụng của nền tảng này.

# Giới thiệu

The Graph là một decentralized protocol được sử dụng cho việc indexing và query data từ blockchains, bất nguồn đầu tiên từ Ethereum. Có một số loại data thì rất khó có thể query trực tiếp vì vậy The Graph được sinh ra để trợ giúp điều này.

Ví dụ với một Dapp khá nổi tiếng như CryptoKitties sẽ có một câu hỏi khá đơn giản đó là:

> "Một tài khoản Ethereum cụ thể sở hữu bao nhiêu CryptoKitties? Thời gian một CryptoKitty cụ thể được ra đời?"

Câu hỏi trên ta có thể dễ dàng sử dụng hàm `balanceOf` và `getKitty` được định nghĩa trong contract để biết được các thông tin trên.

Nhưng sẽ có một câu hỏi khó hơn đó là:

> Chủ sở hữu của những CryptoKitties được tạo ra từ tháng 1 đến tháng 2 năm 2018 là ai?

Để trả lời câu hỏi này bạn phải get tất cả các events `Birth` và sau đó gọi hàm `OwnerOf` của mỗi Crytokity đã được tạo. Dù một câu hỏi nghe có vẻ đơn gian như vậy thôi những đối với những Dapps thông thường nó có thể mất để hàng giờ, thậm chí hàng vài ngày để có thể chạy ra kết quả. Việc lập chỉ mục đánh index dữ liệu blockchain rất khó vì kiến trúc dữ liệu, cấu trúc của errors hoặc các blocks không có tiêu đề làm phức tạp thêm quá trình này và khiến nó không chỉ tốn thời gian mà còn khó khăn cả về mặt truy xuất dữ liệu blockchain làm sao cho chính xác.

The Graph thì được sinh ra để giải quyết vấn đề này với xây dựng một service chuyên lưu trữ các data blockchain được đánh indexs. Các dữ liệu này là ("subgraphs") sau đó có thể được truy vấn bằng một GraphQL API như gọi các API thông thường. Điều này mang lại sự tiện dụng cho người lập trình Dapp và ngoài ra còn giúp cải thiện trải nghiệm người dùng vì các tác vụ truy vấn giờ đây đã được lưu trữ, đánh index, giúp tốc độ query tăng lên đáng kể so với thông thường.

# The Graph hoạt động như  thế nào
The Graph đánh chỉ mục index dựa trên một subgraph descriptions được gọi là *subgraph manifest*.  The subgraph description sẽ xác định những smart contracts nào mà một subgraph cần subscribe đến, các sự kiện trong các contracts và cách ánh xạ các dữ liệu events này với The Graph để lưu trữ nó vào database.

Khi subgraph manifest đã được viết Graph CLI sẽ được sử dụng để lưu trữ các define đó trên IPFS và tiếp đến hosted service sẽ bắt đầu đánh index cho data của subgraph.

Dưới đây là diagram chi tiết về flow data của một subgraph manifest đã được deployed, ví dụ này là một transaction trên Ethereum

![](https://images.viblo.asia/968510de-7d66-4372-a2e9-92344ba70796.png)

Flow sẽ được thực hiện theo các bước sau:

1. Một Dapp thêm data  tới Ethereum thông qua một transaction trên một smart contract
2. Smart contract sẽ emits một hoặc vài events trong quá trình xử lý transaction
3. Graph Node liên tục scans những blocks mới của Ethereum để có thể tìm thấy được các data mà subgraph cần tới
4. Graph Node tìm kiếm các events Ethereum phù hợp trong các khối này và thực hiện các mapping handlers đã được define trong subgraph manifest.  Mapping là một WASM module creates hoặc updates dữ liệu của các entities mà Graph Node lưu trữ sau khi query được từ các events của Ethereum.
5. Dapp muốn query dữ liệu mà đã được Graph Node đánh index và lưu trữ thì sẽ cần sử dụng đến node GraphQL endpoint. Lúc này đến lượt Graph Node sẽ làm nhiệm vụ translates các truy vấn GrapQL thành các truy vấn trong store data để fetch các dữ liệu ở đây, tận dụng khả năng đánh index của store.
6. Sau khi nhận được dữ liệu trả về Dapp sẽ hiển thị lên cho người dùng
7. Một vòng tuần hoàn cứ thế được lặp lại

# Hướng dẫn sử dụng the graph
Sẽ có 2 cách để chúng ta có thể sử dụng the graph để phát triển:
1. Đó tự build một graph node ở local sau đó deploy subgraph và thực hiện query trong môi trường test Ganache 
    - https://thegraph.com/docs/quick-start#local-development
2. Là sẽ deploy trực tiếp subgraph lên node của The Graph để sau đó query. Cách này thì ta cũng có thể redeploy để update subgraph
    -  https://thegraph.com/docs/define-a-subgraph 
    - https://thegraph.com/docs/graphql-api
    - https://thegraph.com/docs/quick-start#hosted-service  

Cả 2 thì đều có chúng kiến trúc đó là sẽ có 1 Graph Node và sau đó deploy Subgraph lên đó để query data. Ở phạm vi bài viết này mục tiêu chính của mình là muốn hướng dẫn mọi người là deploy một subgraph và sau đó thực hiện query. Nên mình sẽ hướng dần theo cách thứ 2 đối với cách 1 thứ mình cũng có ghim link ở phía trên mọi người có thể xem và làm theo các bước đó.

Như cách link mình đính kèm ở trên là những thứ chúng ta cần phải đọc để hiểu trước khi muốn viết và deploy một subraph cho mình. 

## Define Subgraph
Đây chính là phần định nghĩa các data sẽ được lưu trữ và đánh index. Một subgraph này sẽ gồm một số các file chính như:
- `subgraph.yaml` : là một file chứa các config subgraph manifest
- `schema.graphql`: là một GraphQL schema định nghĩa các dữ liệu gì sẽ được lưu trữ và làm sao để có thể query các dữ liệu này từ GraphQL
- `AssemblyScript Mappings`: là những code [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) sẽ chuyển những events trong blockchain mà nó nghe được thành các entities theo như schema mà ta đã định nghĩa trong file `schema.graphql` ( tên của nó thường là `mapping.ts` )

Trước khi đi vào chi tiết các nội dung chính của phần này thì ta sẽ cần install [Graph CLI](https://github.com/graphprotocol/graph-cli) để sử dụng cho các thao tác build hay deploy một subgraph.

```shell
# NPM
npm install -g @graphprotocol/graph-cli

# Yarn
yarn global add @graphprotocol/graph-cli
```

### Create a Subgraph Project
Sử dụng command `graph init` để tạo mới môt subgraph project. Phần tạo project này bạn có thể sử dụng một project mẫu của Graph như ở đây [here](https://github.com/graphprotocol/example-subgraph) để base một subgraph và deploy hoặc nếu đã có subraph và contract deployed rồi bạn cũng có thể sử dụng hướng dẫn sau để bắt đầu init một project graph [here](https://thegraph.com/docs/define-a-subgraph#from-an-existing-contract). Còn ở đây mình sẽ hướng dẫn cách 1 đó là sử dụng mẫu của graph làm base cho subgraph.

Tại thời điểm bài viết thì The Graph hiện đang hỗ trợ cho các chains như: mainnet, kovan, rinkeby, ropsten, goerli, poa-core, xdai, poa-sokol, matic, mumbai, fantom, bsc, clover.

Command để thực hiện tạo theo mẫu sẽ có dạng như sau:
```
graph init --from-example <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]
```
Ví dụ mẫu sau trên thì được base trên [Gravity contract](https://github.com/graphprotocol/example-subgraph/blob/master/contracts/Gravity.sol) bằng việc sẽ lắng nghe các sự kiện `NewGravatar` hoặc `UpdateGravatar` được emit ra. Sau khi nghe thấy những events này thì ta cần định nghĩa các handle để xử lý và lưu trữ nó lại. Từng bước chi tiết mình sẽ thực hiện ở dưới đây

### Subgraph Manifest
Đây sẽ chính là các config được định nghĩa trong file `subgraph.yaml` như ví dụ này ta sẽ chỉ định thẳng  các config để địa chỉ của contract Gravity

```js
specVersion: 0.0.1
description: Gravatar for Ethereum
repository: https://github.com/graphprotocol/example-subgraph
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: mainnet
    source:
      address: '0x2E645469f354BB4F5c8a05B3b30A929361cf77eC'
      abi: Gravity
      startBlock: 6175244
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.1
      language: wasm/assemblyscript
      entities:
        - Gravatar
      abis:
        - name: Gravity
          file: ./abis/Gravity.json
      eventHandlers:
        - event: NewGravatar(uint256,address,string,string)
          handler: handleNewGravatar
        - event: UpdatedGravatar(uint256,address,string,string)
          handler: handleUpdatedGravatar
      callHandlers:
        - function: createGravatar(string,string)
          handler: handleCreateGravatar
      blockHandlers:
        - function: handleBlock
        - function: handleBlockWithCall
          filter:
            kind: call
      file: ./src/mapping.ts
```

- **description**: Phần này là đôi lời mô ta về subgraph nó sẽ được hiển thị trong ở dưới Name Subgraph khi ta search subgraph trong phần **Graph Explorer**
- **repository**: Đây là phần hiển thị repository github đang lưu trữ code của Subgraph cái này ta cũng sẽ thấy nó khi bấm vào xem chi tiết Subgraph
- **dataSources.source**: Ta sẽ chỉ định contract ta muốn subscribe tạo đây bằng cách config địa chỉ `address` và `abi` của contract. Adderss thì là optional nên ta có thể để trống và nếu để trống address nó sẽ lắng tất các sự kiện của các hợp đồng  phù hợp với abi.
- **dataSources.source.startBlock**: Sẽ là block mà subgraph bắt đầu subscribe đánh index và lưu trữ, nó thì cũng là một trường optional nên nếu để trống thì nó sẽ tự hiểu là from từ block 0. Nhưng thường thì người ta hay để start từ khi contract được deployed. 
- **dataSources.mapping.entities**: Đây là các entities sẽ được lưu trữ vào trong store. Những entities này sẽ được định nghĩa tại file `schema.graphql` 
- **dataSources.mapping.abis**: Là name và đường dẫn đến một hoặc nhiều file ABI của những contract sẽ được tương tác đến trong phần mapping 
- **dataSources.mapping.eventHandlers**: Phần này sẽ liệt kê các events của contract sẽ được lắng nghe và sau đó handle trong phần mapping. Như ví dụ này thì sẽ handle các events thành các entitites sau đó lưu trữ và đánh index.
- **dataSources.mapping.callHandlers**: Ở đây là danh sách các functions contract sẽ được subgraph subscribe
- **dataSources.mapping.blockHandlers**: Phần này sẽ liệt kê các hàm sẽ được gọi khi một block được confirm vào chain. Nếu không có filter thì nó sẽ chạy mỗi khi có khối được confirmed. Còn nếu có filter nó sẽ kiểm tra trong block nếu có ít nhất một điều kiện filter thì nó mới thực hiện các hàm đã liệt kê còn không sẽ bỏ qua.

### Defining Entities
Phần này khá là quan trọng bạn cần phải define các entities mình cần gồm những cái nào và trong các entities thì có những fields nào để phù hợp cho Dapp của  mình. Nó cũng giống như định nghĩa schema trong database vậy phải thiết kết làm sao để nó có  thể lưu trữ và query một cách tối ưu nhất. Dưới đấy sẽ có ví định nghĩa entities sao là tốt và sao là không nên

**Good Example**
Entities dưới đây sẽ được cấu trúc theo đối tượng Gravatar và nó nên được định nghĩa như sau
```ts
type Gravatar @entity {
  id: ID!
  owner: Bytes
  displayName: String
  imageUrl: String
  accepted: Boolean
}
```

**Bad Example**
Dù nói là các dữ liệu sẽ được lắng nghe và lưu trữ theo các events của blockchain nhưng chúng ta cũng không nên định nghĩa trực tiếp các entites của mình là cá events như dưới đây
```ts
type GravatarAccepted @entity {
  id: ID!
  owner: Bytes
  displayName: String
  imageUrl: String
}

type GravatarDeclined @entity {
  id: ID!
  owner: Bytes
  displayName: String
  imageUrl: String
}
```

Các fields trong entities này cũng có thể để required hoặc optional giống như trong các database vậy. Và để set Require cho một field thì chúng ra sẽ sử dụng dấu `!`. Trong quá trình mapping field required mà không được set value nó sẽ bị cảnh báo như sau
```
Null value resolved for non-null field 'name'
```
Mỗi entities sẽ có một trường ID và trường này thì mặc định cần để required. Cùng với đó thì nó cũng đóng vài trò là primary key nên cần phải là duy nhất nữa.

Các  trường thì cần có các kiểu dữ liệu thì mọi người có thể tham khảo tại đây ([built-in-scalar-types](https://thegraph.com/docs/define-a-subgraph#built-in-scalar-types))

### Entity Relationships
Một vấn đề cần được quan tâm nữa đó chính là relationships giữa các entites trong một subgraph. Vì nó sẽ được sử dụng rất nhiều khi chúng ra query nên ta cũng cần định nghĩa thật chuẩn cái này. Relationships trong The Graph thì là relationship một chiều và đối với các relationships hai chiều nó sẽ được biểu diễn bởi cá relationships một chiều. Trong đây thì có các ví dụ chi tiết để mọi người hiểu được relationshipst của The Graph ([entity-relationships](https://thegraph.com/docs/define-a-subgraph#entity-relationships))

Còn do ví dụ của chúng ta chỉ có một Entities nên chúng sẽ không có phần relationships này.

### Writing Mappings
Phần này ta sẽ viết các function handle để xử lý các events nghe được từ blockchain, như ta đã khai báo trong file config `subgraph.yaml`. Các mapping này sẽ được viết bằng AssemblyScript và có thể được biên dịch thành WASM (WebAssembly). Nhưng trong ví dụ này các mapping được chứa trong `src/mapping.ts` nó chứa các handle cho các events `NewGravatar` và `UpdatedGravatar`.

```ts
import { NewGravatar, UpdatedGravatar } from '../generated/Gravity/Gravity'
import { Gravatar } from '../generated/schema'

export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id.toHex())
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  let id = event.params.id.toHex()
  let gravatar = Gravatar.load(id)
  if (gravatar == null) {
    gravatar = new Gravatar(id)
  }
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}
```

Handle đâu tiên sẽ nhận tham số đầu vào là một event `NewGravatar` và tạo một mới một entity  `Gravatar`  với lệnh `new Gravatar(event.params.id.toHex())`, các fields khác cũng sẽ được set bằng các params có trên trong event, sau đó `.save()` vào sotre.

Handle tiếp theo thì sẽ bắt sự kiện `UpdatedGravatar` nó sẽ sử dụng `id` để get entity từ the Graph Node store. Và kiểm tra nếu entity tồn tại thì sẽ update lại entity đó còn nếu không tồn tại nó sẽ tạo mới luôn một entity mới sau đó `.save()` vào store.

> Chú ý: Các `id` thì phải là duy nhất và là string nên đối với một số field có cũng ý nghĩa là id thì The Graph có một số recommend lưu giá trị id như sau để tránh trường hợp id được lưu không là duy nhất:
> - event.params.id.toHex()
> - event.transaction.from.toHex()
> - event.transaction.hash.toHex() + "-" + event.logIndex.toString()

### Code Generation
Để có thể thao tác với các smart contracts, các events và các entities một cách đơn giản và an toàn `Graph CLI` có thế hỗ trợ generate AssemblyScript  từ GraphQL schema và ABI mà người dùng đã config trong `subgraph.yaml`.

```shell
graph codegen [--output-dir <OUTPUT_DIR>] [<MANIFEST>]
```
Hoặc như trong ví dụ mẫu thì đã cấu hình điều này trong `package.json` nên ta chỉ cần
```shell
# Yarn
yarn codegen

# NPM
npm run codegen
```

Và nhớ  `yarn install` trước nha. Sau khi Generation xong thì nó sẽ tạo ra một folder có tên `generated` đây sẽ là các `AssemblyScript class` cung cấp khả năng truy cập dễ dàng vào các params của event. Các type thì sẽ được generate tại `<OUTPUT_DIR>/<DATA_SOURCE_NAME>/<ABI_NAME>.ts` như trong ví dụ là `generated/Gravity/Gravity.ts`. Ta sẽ import các types này vào file mapping:

```ts
import {
  // The contract class:
  Gravity,
  // The events classes:
  NewGravatar,
  UpdatedGravatar,
} from '../generated/Gravity/Gravity'
```

Ngoài ra ở đây thì một class cũng sẽ được generated  cho mỗi entity được định nghĩa trong subgraph's GraphQL schema. Class sẽ cung cấp các phương thức an toàn cho việc loading, read và write entity. Tất cả các `entity classes` sẽ được generated tại `<OUTPUT_DIR>/schema.ts` . Ta cũng sẽ import nó vào mapping như sau:

```ts
import { Gravatar } from '../generated/schema'
```


> Chú ý: Mỗi khi có gì thay đổi code bạn cần phải generation lại thì các generated mới được cập nhật mới nhất.

### Data Source Templates
Phần này là phần sử dụng cho loại contract có nhiều contract con. Ví dụ như các sàn Exchange Decentralized **Uni**, **Sushi**,... chúng có rất nhiều contract con `Pairs` nên ta không thể nào chỉ định contract cần subscribe được. Nên nó sẽ có các templates sẵn cho các contract con kiểu như khuôn cho các pair về sau vậy, cứ thế mà bắt và xử lý thôi. 

Nhưng trong ví dụ của chúng ta thì nó cũng không phải dạng này nên sẽ không có phần templates này mình chỉ giới thiệu, để các bạn nào cần có thể tham khảo chi tiết  tại đây ([data-source-templates](https://thegraph.com/docs/define-a-subgraph#data-source-templates))

### Start Blocks
Start blocks sẽ là block mà ta bắt đầu thực hiện lắng nghe và đánh chỉ mục lưu trữ từ đó. Nên tùy vào dữ liệu bạn cần mà có thể setting start block cho phù hợp. Như trong ví dụ mẫu thì đang không để start block nên có thể tự hiểu là nó bắt đầu từ block 0

### Call Handlers
Đối với các function có emit ra các events thì ta có thể dễ dàng lấy các dữ liệu từ các input của events. Nhưng một vài contract thì lại không emit ra events để tối ưu gas fee. Thì trong những trường hợp như thế ta sẽ không thể sử dụng được `event handlers`. Lúc này the graph sẽ subscribe các lệnh call đến function được chỉ định và khi thấy có tín hiệu call đến function thì nó sẽ trigger hàm handler đã được định nghĩa trong mapping và được chỉ chỉ định trong file `subgraph.yaml`. Lúc này tham số đầu vào của hàm mapping sẽ là một `ethereum.Call`.

Call handlers thì chỉ có thể được trigger một trong hai trường hợp sau: Môt đó là function đó được call từ một account bên ngoài mà không phải chính nó. Hoặc trường hợp thứ hai là function đó được định nghĩ là `external` và được call như một phần của chức năng khác trên cùng hợp đồng đó.

Dưới đây là ví dụ define một call handler. Đầu tiên ta sẽ khai báo function được chỉ định subscribe và ngay bên dưới sẽ là hàm xử lý handle được define trong file mapping  

```js
dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: mainnet
    source:
      address: '0x731a10897d267e19b34503ad902d0a29173ba4b1'
      abi: Gravity
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.2
      language: wasm/assemblyscript
      entities:
        - Gravatar
        - Transaction
      abis:
        - name: Gravity
          file: ./abis/Gravity.json
      callHandlers:
        - function: createGravatar(string,string)
          handler: handleCreateGravatar
```

Còn đây là mapping function 

```js
import { CreateGravatarCall } from '../generated/Gravity/Gravity'
import { Transaction } from '../generated/schema'

export function handleCreateGravatar(call: CreateGravatarCall): void {
  let id = call.transaction.hash.toHex()
  let transaction = new Transaction(id)
  transaction.displayName = call.inputs._displayName
  transaction.imageUrl = call.inputs._imageUrl
  transaction.save()
}
```

### Block Handlers
Ngoài việc subscribe được các events và function calls thì subgraph còn có thể subscribe mỗi khi có block mới được thêm vào chain. Nó sẽ tự thực hiện handle sau mỗi block được thêm hoặc thỏa mãn một điều kiện filter nào đó. 

Như ví dụ ở đây thì ta cũng định nghĩ một block handler với filter là có hàm call  trong data block. Mỗi block handler sẽ chỉ có thể chứ một loại filter.

```ts
dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: dev
    source:
      address: '0x731a10897d267e19b34503ad902d0a29173ba4b1'
      abi: Gravity
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.2
      language: wasm/assemblyscript
      entities:
        - Gravatar
        - Transaction
      abis:
        - name: Gravity
          file: ./abis/Gravity.json
      blockHandlers:
        - handler: handleBlock
        - handler: handleBlockWithCallToContract
          filter:
            kind: call
```

Mapping function sẽ nhận tham số đầu vào là một `ethereum.Block`. Thì cũng giống như các handle cho events thì các handle này cũng có khả năng truy cập vào các entities để lưu trữ dữ liệu như sau

```js
import { ethereum } from '@graphprotocol/graph-ts'

export function handleBlock(block: ethereum.Block): void {
  let id = block.hash.toHex()
  let entity = new Block(id)
  entity.save()
}
```

### Grafting onto Existing Subgraphs 
Ngoài ra thì graph còn có khả năng kế thừa data cái này rất hay, đó là subgrah mới có thẻ sử dụng các data từ các subgraph đã có trước đó. Mọi người có thể tham khảo chi tiết tại ([grafting-onto-existing-subgraphs](https://thegraph.com/docs/define-a-subgraph#grafting-onto-existing-subgraphs ))

## Deploy subgraph
Sau khi đã define subgraph xong ta sẽ đi thực hiện deloy. Đâu tiên là đăng nhập the graph bằng cách oauth tài khoản Gitghub với Graph là được. 

![](https://images.viblo.asia/d98fca69-8f10-4ef1-bbda-3b08ab0aea1f.png)

Sau khi đăng nhập xong thì vào `Dashboard` và chọn `add subgrah`

![](https://images.viblo.asia/2eaacdf9-8f39-4d7b-afb5-159fbbc10090.png)

Và điền các thông tin về subgraph chi tiết các fields tại ([create-the-subgraph](https://thegraph.com/docs/deploy-a-subgraph#create-the-subgraph))

![](https://images.viblo.asia/f8a6d5cb-16f1-4732-be78-33949f4e4242.png)

Tiếp đến ta sẽ thấy phần hướng dẫn deploy subgraph nhưng chúng ta được thực hiện gần hết ở phần hướng dẫn trên rồi. Nên lúc này ta chỉ còn bước cuối đó là `yarn build` và tiến hành deploy với command `yarn deploy`

**Deploying the subgraph to multiple Ethereum networks**

Trong docs của The Graph thì cũng có hướng dẫn một cách giúp deploy subgraph lên nhiều chains khác nhau mà không cần phải sửa code, do trên các chain khác nhau thì address contract sẽ khác nhau hay name của các chain là không giống nhau. Đó là sử dụng biến số dynamic với [Mustache](https://mustache.github.io/) hoặc [Handlebars](https://handlebarsjs.com/). Ví dụ như sau đó là ta sẽ tạo 2 file json config 

```json
{
  "network": "mainnet",
  "address": "0x123..."
}
```

và 

```json
{
  "network": "ropsten",
  "address": "0xabc..."
}
```

Còn đối với file `subgraph.yaml` sẽ chuyển thành `subgraph.template.yaml` cùng với đó là đổi address contract và network chain thành biến dynamic `{{address}}` và `{{network}}`

```js
# ...
dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: mainnet
    network: {{network}}
    source:
      address: '0x2E645469f354BB4F5c8a05B3b30A929361cf77eC'
      address: '{{address}}'
      abi: Gravity
    mapping:
      kind: ethereum/events
```

Trong `package.json` ta sẽ thêm các scripts với `mustache`, để sử dụng được `mustache` thì mọi nhớ là cần install trước nhá
```json
{
  ...
  "scripts": {
    ...
    "prepare:mainnet": "mustache config/mainnet.json subgraph.template.yaml > subgraph.yaml",
    "prepare:ropsten": "mustache config/ropsten.json subgraph.template.yaml > subgraph.yaml"
  },
  "devDependencies": {
    ...
    "mustache": "^3.1.0"
  }
}
```

Và command deploy lúc này sẽ đổi thành

```shell
# Mainnet:
yarn prepare:mainnet && yarn deploy

# Ropsten:
yarn prepare:ropsten && yarn deploy
```

## Query subgrah
Ok sau khi đã deploy xong subgraph lên Graph Node thì ta sẽ đợi dữ liệu được đồng bộ xong như ở đây

![](https://images.viblo.asia/8a83b8c2-2597-44c9-b4af-95595ea8c72d.png)

Điều quan trọng tiếp theo là ta sẽ cần phải có một chút kiens thức về viết payload query. Để học cách viết query sao cho chuẩn hãy xem tại ([graphql-api-queries](https://thegraph.com/docs/graphql-api#queries))

Trong phần explorer này thì sẽ là nơi để ta kiểm tra xem dữ liệu mà query của ta viết trả về có đúng không 

![](https://images.viblo.asia/9363d730-6ae9-44ed-ab47-c9ecc896b55f.png)

Nếu mà cảm thấy payload query của mình đã ổn rồi thì ta có thể tích hợp nó vào Dapp của mình như việc gọi một API thông thường

```js
 const result = await axios.post("https://api.thegraph.com/subgraphs/name/tercel/tercel-example-subgraph", {
    query: `{
      gravatars(first: 5) {
        id
        owner
        displayName
        imageUrl
      }
    }`,
  });
```

# Tổng kết 
Tổng kết lại bài viết này mình đã giới thiệu khái quát về The Graph nó dùng để làm gì, hoạt động ra sao và cách xây dựng một Subgraph để có thể tích hợp sử dụng vào Dapp. Cảm ơn các bạn đã chú ý đón đọc, rất vui và hẹn gặp lại các bạn trong các bài viết tiếp theo.

#### Nguồn: https://thegraph.com/docs