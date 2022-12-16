# Làm gì bây giờ nhỉ ?
H chúng ta sẽ cùng thử sử dụng một vài chức năng cơ bản của libp2p để gửi tin nhắn ping qua lại giữa hai peer bằng js .
## Requirement
* Nodejs > 12.16.x
## Setup folder
```sh
# create a directory for the project and `cd` into it
> mkdir hello-libp2p
> mkdir hello-libp2p/src
> cd hello-libp2p

# make it a git repository
> git init .

# make it an npm project. fill in the prompts with info for your project
# when asked for your project's entry point, enter "src/index.js"
> npm init
```
## Configure libp2p
Tiếp theo là cài đặt libp2p
```
npm install libp2p
// OR
yarn add libp2p
```
### Basic setup
H thì bạn đã hoàn thành việc Install libp2p rồi h hãy cấu hình một chút . Chúng ta cần 2 module của libp2p đó là **Transport** và **Crypto** .Tuy nhiên, theo docs của họ khuyên thì cũng nên setup cả **Stream Multiplexer** . Bắt đầu setup từng phần nào .

### Transports

Libp2p sử dụng **Transports** để thiết lập các kết nối giữa các peer thông qua mạng . Bạn có thể định cấu hình bao nhiêu Transport cũng đc , nhưng trong demo này bạn chỉ cần 1 thôi . Có rất nhiều giao thức đc hỗ trợ nhưng hãy chọn tcp nhé .

```
npm install libp2p-tcp
// OR
yarn add libp2p-tcp
```

Sau khi install xong hãy viết vài dòng code để libp2p có thể sử dụng TCP nào
```js
const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')

const node = await Libp2p.create({
  modules: {
    transport: [TCP]
  }
})
```
Trong đó `Libp2p.create` khởi tạo và `modules transport` để chọn giao thức và bạn hoàn toàn có thể chọn nhiều giao thức hơn vì transport nhận vào là một *array* mà .

### Connection Encryption

Mọi kết nối phải được mã hóa để đảm bảo tính bảo mật cho người dùng . Có rất nhiều module **Crypto** được phát triển cho libp2p và trong demo này thì hãy sử dụng `libp2p-secio`

```
npm install libp2p-secio
// OR
yarn add libp2p-secio
```

Thêm phần secio vào :
```js
const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const SECIO = require('libp2p-secio')

const node = await Libp2p.create({
  modules: {
    transport: [TCP],
    connEncryption: [SECIO]
  }
})
```
### Multiplexing

Mặc dù Multiplexing không phải là bắt buộc nhưng theo docs của họ thì học khuyến khích vì nó giúp cải thiện hiệu quả của các kết nối trên các giao thức mà libp2p chạy .
```
npm install libp2p-mplex
// OR
yarn add libp2p-mplex
```
Thêm phần mplex vào :
```js
const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const SECIO = require('libp2p-secio')
const MPLEX = require('libp2p-mplex')

const node = await Libp2p.create({
  modules: {
    transport: [TCP],
    connEncryption: [SECIO],
    streamMuxer: [MPLEX]
  }
})
```

### Chạy thử nào

Chúng ta đã config **Transport**, **Crypto** và **Stream Multiplexer** module rồi h hãy chạy libp2p node nào . Sử dụng **libp2p.start()** và **libp2p.stop()** để start và stop node.

Một libp2p node cần phải listen một address trên giao thức mà chúng ta đã cài đặt .Theo đó chúng ta sẽ install thêm **multiaddr** để tạo một **multiaddress tcp** và thêm nó vào node

```
npm install multiaddr
// OR
yarn add multiaddr
```

Thêm multiaddr vào
```js
const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const SECIO = require('libp2p-secio')
const MPLEX = require('libp2p-mplex')

const multiaddr = require('multiaddr')

const main = async () => {
  const node = await Libp2p.create({
    modules: {
      transport: [TCP],
      connEncryption: [SECIO],
      streamMuxer: [MPLEX]
    }
  })

  // add a listen address (localhost) to accept TCP connections on a random port
  const listenAddress = multiaddr(`/ip4/127.0.0.1/tcp/0`)
  node.peerInfo.multiaddrs.add(listenAddress)

  // start libp2p
  await node.start()
  console.log('libp2p has started')

  // print out listening addresses
  const addresses = node.peerInfo.multiaddrs.toArray()
  console.log('listening on addresses:')
  addresses.forEach(addr => {
    console.log(`${addr.toString()}/p2p/${node.peerInfo.id.toB58String()}`)
  })

  // stop libp2p
  await node.stop()
  console.log('libp2p has stopped')
}

main()
```

Sau đó chạy thử bằng lênh `node src/index` và đây là kết quả :
```js
libp2p has started
listening on addresses:
/ip4/127.0.0.1/tcp/34907/p2p/Qmdb3sQ6Z9GWgRpesoBtELBNuvHTD9FbjwNWSJYWJE3E1j
libp2p has stopped
```
### Ping pong !
Mọi thứ đã đc setup ngon lành từ giao thức đến bảo mật ,... hãy thử kết nối chúng với nhau nào .

Chúng ta có thể sử dụng `libp2p.ping()` để gửi "ping" từ peer này đến một peer khác. Peer nhận được "ping" sẽ gửi lại "pong" và như vậy chúng ta biết đc các peer có thể connect đc với nhau .Đồng thời có thể kiểm tra độ trễ giữa các peer

Chúng ta cần truyền peer multiaddress thông qua command line vì thế chúng ta cần thêm `process`

```
npm install process
// OR
yarn add process
```
Sau đó chúng ta thử truyền multiaddress từ commad line và thử ping xem thế nào . Và đây sẽ là code full
```js
const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const SECIO = require('libp2p-secio')
const MPLEX = require('libp2p-mplex')

const multiaddr = require('multiaddr')
const process = require('process')

const main = async () => {
  const node = await Libp2p.create({
    modules: {
      transport: [TCP],
      connEncryption: [SECIO],
      streamMuxer: [MPLEX]
    }
  })

  // add a listen address (localhost) to accept TCP connections on a random port
  const listenAddress = multiaddr(`/ip4/127.0.0.1/tcp/0`)
  node.peerInfo.multiaddrs.add(listenAddress)

  // start libp2p
  await node.start()
  console.log('libp2p has started')

  // print out listening addresses
  const addresses = node.peerInfo.multiaddrs.toArray()
  console.log('listening on addresses:')
  addresses.forEach(addr => {
    console.log(`${addr.toString()}/p2p/${node.peerInfo.id.toB58String()}`)
  })

  // ping peer if received multiaddr
  if (process.argv.length >= 3) {
    const ma = multiaddr(process.argv[2])
    console.log(`pinging remote peer at ${process.argv[2]}`)
    const latency = await node.ping(ma)
    console.log(`pinged ${process.argv[2]} in ${latency}ms`)
  } else {
    console.log('no remote peer address given, skipping ping')
  }

  const stop = async () => {
    // stop libp2p
    await node.stop()
    console.log('libp2p has stopped')
    process.exit(0)
  }

  process.on('SIGTERM', stop)
  process.on('SIGINT', stop)
}

main()
```

Hãy bắt đầu chạy trước 1 node libp2p `node src/index.js` . Kết quả :
```js
libp2p has started
listening on addresses:
/ip4/127.0.0.1/tcp/43607/p2p/QmWApjKJ5Na62cvMgiydTonAFGKPgKDe9peKvuMVSk2qxv
no remote peer address given, skipping ping
```
Mở một terminal khác lấy địa chỉ multiaddress truyền vào . Ví dụ theo đúng address bên trên chạy  :
```js
node src/index.js /ip4/127.0.0.1/tcp/43607/p2p/QmWApjKJ5Na62cvMgiydTonAFGKPgKDe9peKvuMVSk2qxv
```
Kết quả :
```js
pinging remote peer at /ip4/127.0.0.1/tcp/43607/p2p/QmWApjKJ5Na62cvMgiydTonAFGKPgKDe9peKvuMVSk2qxv
pinged /ip4/127.0.0.1/tcp/43607/p2p/QmWApjKJ5Na62cvMgiydTonAFGKPgKDe9peKvuMVSk2qxv in 53ms
```
Như vậy là 2 peer này đã có thể communicating với nhau thông qua multiplexed trên một kênh bảo mật .

## Connect vs các peer khác
Khi node libp2p của chúng đã chạy đc thì đã đến lúc thử kết nối nó với public network. Chúng ta có thể làm điều này thông qua peer discovery. Hãy thử tính năng này bằng cách tạo một file mới nhé .
### Peer Discovery
Ý tưởng chung ở đây đó là sẽ có một danh sách cố định một vài peer thường sẽ được sử dụng để cho các node mới tham gia mạng kết nối , nhưng tất nhiên sẽ phải kết hợp thêm một vài cơ chế khám phá khác để đảm bảo bạn có thể tìm các ra các peer khác quan trọng đối với app của mình . Có một số cách sau đây để tìm thấy các peer available trên mạng:

* Nếu bạn đã có được địa chỉ của một vài peer khác thì cách đơn giản nhất là dùng `libp2p-bootstrap` 
* Nếu app của bạn chạy trên browser thì có thể sử dụng `libp2p-webrtc-star` nó sẽ khám phá các peer khác dựa vào peer sharing service
* Một cách tiếp cận khác đó là sử dụng `libp2p-kad-dht`cơ bản thì nó sẽ crawl dữ liệu về network và tìm các peer mới một cách random dựa trên dữ liệu trên các peer mà nó đã kết nối đc .
* ...

Để đơn giản thì mình sẽ sử dụng `libp2p-bootstrap` và thay đổi giao thức thành websocket ( vì các node kia sử dụng giao thức này ) . Install libp2p-bootstrap :
```
npm install libp2p-bootstrap libp2p-websockets
// OR
yarn add libp2p-bootstrap libp2p-websockets
```
code sẽ như thế này :
```js
const Libp2p = require('libp2p')
const WebSockets = require('libp2p-websockets')
const SECIO = require('libp2p-secio')
const MPLEX = require('libp2p-mplex')

const Bootstrap = require('libp2p-bootstrap')

const main = async () => {
  // Known peers addresses
  const bootstrapMultiaddrs = [
    '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
    '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3'
  ]

  const node = await Libp2p.create({
    modules: {
      transport: [WebSockets],
      connEncryption: [SECIO],
      streamMuxer: [MPLEX],
      peerDiscovery: [Bootstrap]
    },
    config: {
      peerDiscovery: {
        autoDial: true, // Auto connect to discovered peers (limited by ConnectionManager minPeers)
        // The `tag` property will be searched when creating the instance of your Peer Discovery service.
        // The associated object, will be passed to the service when it is instantiated.
        [Bootstrap.tag]: {
          enabled: true,
          list: bootstrapMultiaddrs // provide array of multiaddrs
        }
      }
    }
  })

  node.on('peer:discovery', (peer) => {
    console.log('Discovered %s', peer.id.toB58String()) // Log discovered peer
  })

  node.on('peer:connect', (peer) => {
      console.log('Connected to %s', peer.id.toB58String()) // Log connected peer
    })

  // start libp2p
  await node.start()
}

main()
```
`peer:discovery` và `peer:on` là hai Event mà libp2p cung cấp các bạn có thể xem thêm tại đây https://github.com/libp2p/js-libp2p/blob/master/doc/API.md#events

Kết quả :
```js
Discovered QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd
Discovered QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3
Connected to QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3
Connected to QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd
```
# Reference
* https://github.com/libp2p/js-libp2p/blob/master/doc/GETTING_STARTED.md
* https://docs.libp2p.io/tutorials/getting-started/javascript/