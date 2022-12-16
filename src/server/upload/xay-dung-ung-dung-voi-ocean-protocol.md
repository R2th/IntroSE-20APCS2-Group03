Trong bài viết lần này đòi hỏi bạn đã có một chút kiến thức về nền tảng Ocean Protocl. Trong trường hợp chưa biết đến nền tảng này thì các bạn có thể đọc qua bài viết trước đó của mình : [Giới thiệu Ocean Protocol - hệ sinh thái cho nền kinh tế dữ liệu](https://viblo.asia/p/gioi-thieu-ocean-protocol-he-sinh-thai-cho-nen-kinh-te-du-lieu-yMnKMMYNK7P)

Trong bài này thì mình sẽ không hướng dẫn các bạn làm một sản phẩm mà sẽ cùng phân tích source code của một sản phẩm demo được cung cấp bởi Ocean Protocol Foundation. Ở [github của Ocean](https://github.com/oceanprotocol) ngoài những Open source của họ về các module Aquarius, Barge hay Squidjs thì các bạn sẽ thấy có 2 repo là [react-tutorial](https://github.com/oceanprotocol/react-tutorial) và  [commons](https://github.com/oceanprotocol/commons) . Đây là 2 source mà mình nghĩ phù hợp nhất để bắt đầu vọc vạch về Ocean Protocol. Trong bài viết lần này mình sẽ cùng các bạn phân tích với source **react-tutorial**

![](https://images.viblo.asia/e5d43da0-713a-4438-aeaf-afaf36e3a1fc.png)

# Tại sao lại là react-tutorial ?

Lí do đầu tiên để mình chọn react-tutorial thay vì commons là nó đơn giản hơn rất nhiều so với commons, để vọc vạch commons thì bạn sẽ cần thêm kiến thức về Typescript cũng như luồng chạy của nó cũng sẽ phức tạp hơn nhiều, còn về source **react-tutorial** thì đơn giản bạn sẽ chỉ cần nắm 3 action cơ bản **register asset**, **search asset**, **consume asset** .

# Thực hành
Để hiều thì tốt nhất là bắt đầu vọc vạch thôi nhỉ

### Thiết lập mạng metamask

Như có giới thiệu bài trước thì chúng ta có thể chạy một giả lập local thông qua opensource Barge, tuy nhiên trong bài này mình sẽ hướng dẫn các bạn thao tác trực tiếp với testnet Nile (Có testnet thì tội gì phải giả lập local).

Do là một chain riêng thì để tương tác với nó thông qua metamask thì các bạn cần phải config lại rpc cho nó :

Đầu tiên hãy custom lại rpc trong Metamask:

![](https://images.viblo.asia/780be226-ab9a-4c83-927e-937ba1dac145.png)

Các ô input phía trên sẽ điền theo format :
* **Network Name**: Nile
* **RPC URL (required)**:	https://nile.dev-ocean.com
* **ChainID**: 8995
* **Symbol**: NILE ETH (Tên của coin trong mạng)

Về cơ bản sau khi xong xuôi là chúng ta sẽ có một địa chỉ như thế này :
![](https://images.viblo.asia/02bc3342-5b8d-4541-8714-8dc0f384fb5b.png)

Ngoại trừ việc là bạn sẽ chỉ có 2 token này đều là 0, như đã nói trong bài trước thì chúng ta sẽ chú ý đến 2 token tồn tại trong Ocean Protocol là đồng ETH (ETH trong Ocean chứ không phải ETH của vitalik =)) ) và OCEAN token, 2 đồng này sẽ có tác dụng khác nhau :

* ETH : trả phí cho các giao dịch như **publish asset**, **consume asset**
* Ocean: Trả phí cho các asset khi **consume**

Vậy làm cách nào để lấy ??? Đơn giản là vào đây và faucet về thôi :

https://commons.nile.dev-ocean.com/faucet

### Clone source code

Về cơ bản setup các điều kiện cần đã xong, giờ thì chỉ việc lấy code về mà chạy thôi

Các bạn clone project này về : https://github.com/oceanprotocol/react-tutorial

![](https://images.viblo.asia/be6eabe7-97b4-4681-b46c-2307bef62f50.png)

mở ra thì vỏn vẹn có 2 file đơn giản index.js và asset.js

Để chạy thì cũng đơn giản :
```bash
npm i && npm run start
```

![](https://images.viblo.asia/704df839-c9e0-4ad9-bc56-87e346d7c057.png)

Có 3 button tương ứng với đúng 3 action chủ đạo của OceanProtocol

Các bạn có thể test trực tiếp bằng cách click, kết quả sẽ hiển thị ở phần console nên nhớ F12 lên để thấy luồng hoạt động nhé.

Thôi giờ sẽ là đến lúc vọc code

### Init Ocean client

```js
async componentDidMount() {
    const ocean = await new Ocean.getInstance({
      web3Provider: web3,
      nodeUri: 'https://nile.dev-ocean.com',
      aquariusUri: 'https://aquarius.marketplace.dev-ocean.com',
      brizoUri: 'https://brizo.marketplace.dev-ocean.com',
      brizoAddress: '0x4aaab179035dc57b35e2ce066919048686f82972',
      secretStoreUri: 'https://secret-store.nile.dev-ocean.com',
      // local Spree connection
      // nodeUri: 'http://localhost:8545',
      // aquariusUri: 'http://aquarius:5000',
      // brizoUri: 'http://localhost:8030',
      // brizoAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
      // secretStoreUri: 'http://localhost:12001',
      verbose: true
    })
    this.setState({ ocean })
    console.log('Finished loading contracts.')
  }
```

Đầu tiên thì khi component được mount sẽ init Ocean client (thông qua package Squid) , một Ocean client cần phải có đầy đủ các giá trị :

* web3Provider: Đây chính là provider nile mà chúng ta đã config cho metamask trước đó
* nodeUri: Một fullnode
* auquariusUri: địa chỉ node aquarius nơi lưu trữ metadata của các asset phục vụ việc search
* brizoUri: Địa chỉ node brizo để get asset
* brizoAddress: Địa chỉ brizo sử dụng (thực sự thì địa chỉ này trong docs của Ocean họ cũng chưa nói rõ ràng nên mình sẽ bổ sung khi tìm hiểu được)
* secretStoreUrl: Địa chỉ của node secretStore, node này cũng đã được bàn luận tại bài trước của mình về Ocean protocol

Để ý hơn thì các bạn sẽ thấy là phần comment lại là để dành cho việc config Ocean khi sử dụng Barge để giả lập local, do đó nếu bạn muốn sử dụng main chain của Ocean là Pacific thì cũng chỉ cần đủ địa chỉ các node là có thể tương tác được

### Register asset

```js
async registerAsset() {
    try {
      const accounts = await this.state.ocean.accounts.list()
      const ddo = await this.state.ocean.assets.create(asset, accounts[0])
      console.log('Asset successfully submitted.')
      console.log(ddo)
      // keep track of this registered asset for consumption later on
      this.setState({ ddo })
      alert(
        'Asset successfully submitted. Look into your console to see the response DDO object.'
      )
    } catch (error) {
      console.error(error.message)
    }
}
```

Về cơ bản thì phần này chỉ gọi đúng đến function **assets.create** tuy nhiên nếu để ý thì bạn sẽ phải confirm rất nhiều cũng như kí xác thực với metamask. 

Với function **ocean.accounts.list()** thì chúng ta sẽ có được list account cũng như balance ETH và OCEAN của các địa chỉ trong provider. 

Phần asset được public sẽ là một object - như trong sample này thì đó chính là file **asset.js**

Lược bỏ đi phần chi tiết thì mấu chốt của object asset sẽ có dạng :

```js
const AssetModel = {
  // OEP-08 Attributes
  // https://github.com/oceanprotocol/OEPs/tree/master/8
  main: {
    type: 'dataset',
    name: '',
    dateCreated: '',
    author: '',
    license: '',
    price: '0',
    files: []
  },
  additionalInformation: {
    description: '',
    copyrightHolder: '',
    categories: []
  }
};
```

Object này sẽ có 2 thành phần chính là **main** và **additionalInformation**, trong đó có những thuộc tính cần chú ý là :

* name: Tên của asset, cái này sẽ hữu ích khi search asset nếu chúng ta để tên hợp lý
* price: Đây sẽ là giá trị Ocean token phải trả khi ai đó muốn consume asset của bạn, VD: Đặt giá asset với giá trị 8 OCEAN thì price sẽ nhận giá trị là "8000000000000000000" (10 ^ 18)
 * files: Đây là url để có thể consume asset, như trong ví dụ này thì asset đã được đưa lên amazone web3 và đưa ra đường link để get (Chúng ta cũng có thể dùng các cloud khác để upload file hoặc thông qua ipfs)
* categories: Đây cũng là một phần giúp ích cho việc query, do các DB thường là MongoDB hoặc Elasticsearch do đó có thể advance search bằng cách thêm params , khi đó để có thể tìm kiểm asset dễ hơn thì các bạ cũng cần lưu ý đặt tên category sao cho hợp lý.

### Search asset

```js
async searchAssets() {
    try {
      const search = await this.state.ocean.assets.search(
        '10 Monkey Species Small'
      )
      this.setState({ results: search.results })
      console.log(search)
      alert(
        'Asset successfully retrieved. Look into your console to see the search response.'
      )
    } catch (error) {
      console.error(error.message)
    }
}
```

Để search asset thì cơ bản có thể dùng cách query này, nó sẽ query để search các asset có tên gần với giá trị mình muốn search - để ý khi click button **Search Assets** thì các bạn sẽ thấy nó sẽ trả về rất nhiều asset có tên tương đương với giá trị chúng ta tìm kiếm , trong trường hợp các bạn muốn kết hợp với category hay custom results trả về thì nên xem qua phần advance query trong code của squid:
https://github.com/oceanprotocol/squid-js/blob/master/src/ocean/OceanAssets.ts#L438

### ConsumeAsset

```js
async consumeAsset() {
    try {
      // get all accounts
      const accounts = await this.state.ocean.accounts.list()
      // get our registered asset
      const consumeAsset = this.state.ddo
      // get service we want to execute
      const service = consumeAsset.findServiceByType('access')
      // order service agreement
      const agreement = await this.state.ocean.assets.order(
        consumeAsset.id,
        service.index,
        accounts[0]
      )
      // consume it
      await this.state.ocean.assets.consume(
        agreement,
        consumeAsset.id,
        service.index,
        accounts[0],
        '',
        0
      )
    } catch (error) {
      console.error(error.message)
    }
  }
```

Đọc qua code thì các bạn sẽ thấy function này nó sẽ demo cho chúng ta việc consume 1 asset mà chính chúng ta vừa publish, những asset này sẽ được nhìn dưới dạng là các DDO:

![](https://images.viblo.asia/020d6c52-d5a5-4bf1-a838-73e91d0bb09a.png)

Với DDO thì chúng ta chỉ có thể xem được các giá trị metadata như name, category chứ không thể xem các giá trị files vì đây là thứ để có thể consume asset. Qua đó function **ocean.assets.consume** sẽ thâm nhập vào giá trị **files** để lấy về cho chúng ta Asset tương ứng. 

Về cơ bản thì chúng ta đã nắm được các action chủ đạo của Ocean Protocol, tuy nhiên việc khó ở đây là chúng ta làm sao để kết hợp 3 action đó trở thành một ứng dụng.

# Bài tập về nhà

Có thể các bạn thấy khá cơ bản tuy nhiên khi tìm hiểu rõ ràng qua 3 actions này thì việc vọc vào commons sẽ dễ dàng hơn nhiều

Bài tập về nhà của chúng ta ở đây sẽ là: 

Publish một Asset với **Name** bất kì và thử vào đây để tìm kiếm https://commons.nile.dev-ocean.com/ 

Các bạn sẽ thấy chính là asset mình publish vì cùng là Nile testnet và cùng dùng chung các Node như chúng ta đã setup cho Ocean client.

Thêm vào đó các bạn cũng có thể test thêm bằng cách Publish một asset có **price** và dùng một tài khoản khác để **consume** và xem kết quả lượng OCEAN của mình có bị giảm không và sau đó lại consume lại và lưu ý về thời gian consume cũng như lượng Ocean mất -> Bạn sẽ thấy Ocean khá tối ưu việc này.


# Kết bài
Trên đây là bài giới thiệu về app demo đơn giản nhất với Ocean Protocol, sau đó các bạn có thể vào vọc vạch thêm commons để thấy việc họ kết hợp với Ipfs cũng như upload asset lên Ocean

Nhóm mình cũng đã thử xây dựng một sản phẩm demo cung cấp nền tảng đặt các đơn hàng gắn nhãn dữ liệu cho các bộ dữ liệu thô, các bạn có thể tham khảo thông qua: https://dalama-sun.firebaseapp.com/ . 

Hi vọng bài viết của mình có thể giúp ích cho các bạn.