Sau các trào lưu ICO, IEO thì hiện tại đang nổi lên một trào lưu IDO list các token trên Uniswap - vươn lên từ Hackathon ETHGlobal để trở thành kì lân. Trong bài viết lần này mình sẽ giới thiệu về các SDK cho các blockchain developer để tương tác với Uniswap

![](https://images.viblo.asia/fa18928f-e52b-4a6e-9cb1-f5a2e4b5812b.jpg)

# Giới thiệu

Uniswap SDK hiện tại có thể hỗ trợ cho typescript và javascript, để nắm được bài viết này thì các bạn nên đã từng sử dụng qua uniswap và có một chút kiến thức về javascript

Để cài đặt SDK của uniswap các bạn sẽ cài đặt trực tiếp package **@uniswap/sdk** với câu lệnh:

```js
yarn add @uniswap/sdk
//or
npm install @uniswap/sdk
```

Ngoài ra hiện tại chúng ta cũng cần thêm một số dependencies của @uniswap/sdk:
```js
"@ethersproject/contracts": "^5.0.9",
"@ethersproject/providers": "^5.0.19",
"@ethersproject/solidity": "^5.0.8",
```

# Các SDK chính
Tiếp theo sẽ là các SDK chính thường được sử dụng cùng với ví dụ minh hoạ. Do **uniswap** có thẻ test được trên phần lớn các testnet nên các bạn có thể thoải mái lựa chọn testnet phù hợp cho mình tuy nhiên do mình sử dụng SDK nên cũng không liên quan đến việc tạo **transaction** nên trong bài này sẽ hướng dẫn trực tiếp trên **Mainnet**.

## Fetching Data

Mặc dù như nói ban đầu SDK của uni hoàn toàn độc lập với contract trên ethereum tuy nhiên một số dữ liệu cũng cần phải có các dữ liệu từ bên ngoài để có thể lấy chính xác những thứ bạn muốn, cái này đòi hỏi phải am hiểu một chút về ethereum

### Tokens


Do có hàng trăm loại token khác nhau có thể cùng tên được deploy lên cả mainnet lẫn testnet, do đó để có thể lấy đúng token mình cần thì phải có các bộ số đầu vào sau:

- **chainId** : để sdk có thể biết được token tồn tại ở chain nào (mainnet, rinkeby hay ropsten)
- **address**: Địa chỉ của token, cái này thì gần như là thứ để xác định tuyệt đối token
- **decimals** : Đây là thông số để biểu thị độ chia nhỏ của token đó

Chúng ta hãy cùng tham khảo một ví dụ về việc lẫy dữ liệu của DAI token, Dai trên **mainnet** có địa chỉ là **0x6B175474E89094C44Da98b954EedeAC495271d0F** và **decimals** là 18

```js
import { ChainId, Token } from '@uniswap/sdk'

const chainId = ChainId.MAINNET
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // must be checksummed
const decimals = 18

const DAI = new Token(chainId, tokenAddress, decimals)
```

Đến đây có thể các bạn sẽ thắc mắc về có thể không cần đến **decimals** để tìm được token vì vốn dĩ **chainId** và **address** là đã đủ, do đó chúng ta có hàm Fetch:
```js
import { ChainId, Token, Fetcher } from '@uniswap/sdk'

const chainId = ChainId.MAINNET
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // must be checksummed

const DAI: Token = await Fetcher.fetchTokenData(chainId, tokenAddress)
```

Bên cạnh đó ngoài các dữ liệu trên thì đầu vào có thể nhận thêm các dữ liệu chi tiết hơn như name hay symbol:
```js
import { ChainId, Token } from '@uniswap/sdk'

const DAI = new Token(
  ChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
)
```

### Pairs

Đối với những người đã đọc qua các smart contract của uniswap hẳn sẽ không còn lạ lẫm gì với Pairs, đây là instance của contract được sinh ra khi người dùng cung cấp thanh khoản cho 1 cặp Pool 2 loại token khác nhau trên Uniswap.

Các bạn có thể đọc thêm tại đây nếu chưa nghe đến: https://uniswap.org/docs/v2/smart-contracts/pair

Các **pairs** này sẽ được xác định bởi các cặp token tương ứng đã được list, với những cặp chưa tồn tại giá trị trả về sẽ là địa chỉ **0x0000000000000000000000000000**

Dưới đây là cách để lấy được Pair của cặp WETH và DAI (địa chỉ của WETH đã cố 1 hàm riêng để có thể get chỉ với param **chainId**):

```js
import { ChainId, Token, WETH, Fetcher } from '@uniswap/sdk'
const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)


const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])
```

## Pricing
Có 2 hàm price mà chúng ta cần phải chú ý là **mid price** và **execution price**

### Mid price

Có thể hiểu nôm na đây chính là dữ liệu phản ánh giá trị dự trữ trong 1 hoặc nhiều các pair. Có thể coi nó thể hiện lượng token này cần trao đổi để được 1 token kia. 
Ví dụ một cặp DAI-WETH thì mid price sẽ chính là lượng token DAI để có thể có 1 WETH

- Chuyền đổi trực tiếp từ WETH sang DAI:

```js
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)


const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

const route = new Route([pair], WETH[DAI.chainId])

console.log(route.midPrice.toSignificant(6)) // 201.306
console.log(route.midPrice.invert().toSignificant(6)) // 0.00496756
```

Ở đây chúng ta sẽ thấy có một đối tượng mới là **Route**, đối tượng này nhận dữ liệu đầu vào gồm địa chỉ của pair muốn lấy giá và input đầu vào (địa chỉ của WETH)

Giá trị midPrice được sinh ra và làm tròn bởi 6 chữ số có nghĩa này chính là giá trị DAI tương ứng khi đổi từ 1 WETH tại thời điểm hàm này được gọi.

- Chuyển đổi gián tiếp thông qua một một token khác :

Trong trường hợp này giả sử không tồn tại 1 cặp WETH/DAI nào cả tuy nhiên lại xuất hiện 2 cặp DAI/USDC và WETH/USDC, chúng ta có thể lấy được giá trị midPrice thông qua token trung gian USDC này.

```js
import { ChainId, Token, WETH, Fetcher, Route } from '@uniswap/sdk'

const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6)
const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[ChainId.MAINNET])
const DAIUSDCPair = await Fetcher.fetchPairData(DAI, USDC)

const route = new Route([USDCWETHPair, DAIUSDCPair], WETH[ChainId.MAINNET])

console.log(route.midPrice.toSignificant(6)) // 202.081
console.log(route.midPrice.invert().toSignificant(6)) // 0.00494851
```

### Execution Price

MidPrice thể hiện tỉ lệ giữa cặp 2 token trong Pool, còn với trading, chúng ta sẽ xử dụng Execution Price,tỉ lệ giữa token gửi và nhận

Dưới đây là việc trading giữa 1 WETH và DAI:

```js
import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } from '@uniswap/sdk'

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

const route = new Route([pair], WETH[DAI.chainId])

const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], '1000000000000000000'), TradeType.EXACT_INPUT)

console.log(trade.executionPrice.toSignificant(6))
console.log(trade.nextMidPrice.toSignificant(6))
```

## Trading

Uniswap SDK cung cấp các dữ liệu để tính ra tỉ lệ trading chứ không thể khởi tạo transaction thay cho bạn, để có thể tạo transaction chúng ta cần phải có ví để tương tác với contract. 

Dưới đây là ví dụ về việc khởi tạo một transaction trading:

```js
import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } from '@uniswap/sdk'

const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

const route = new Route([pair], WETH[DAI.chainId])

const amountIn = '1000000000000000000' // 1 WETH

const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], amountIn), TradeType.EXACT_INPUT)
```

**Chú ý**: Trong các cặp trade sẽ không có cặp nào là cặp ETH vì ETH trong uni đã được convert sang dạng ERC20 tương ứng của nó để có thể dễ dàng tính toán.

Chúng ta vẫn có thể swap ETH thông qua input WETH vì uniswap có hàm để chuyển đổi trực tiếp ETH sang WETH để có thể dễ dàng swap. Dưới đây chúng ta sẽ ví dụ một function trong contract là hàm **swapExactETHForTokens**, hàm này chúng ta dùng để swap chính xác lượng **ETH** đầu vào để có thể lấy về nhiều nhất lượng Token đầu ra.

Hàm này có dạng interface sau :
```js
function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
  external
  payable
  returns (uint[] memory amounts);
```

Cuối cùng cũng không kém phần quan trọng chính là **slippage**, giá trị này thể hiện mức chịu đựng trượt giá mà người swap có thể chấp nhận. Uniswap SDK đã hỗ trợ tính toán lượng token nhỏ nhất có thể nhận với những dữ liệu đầu vào:

```js
import { Percent } from '@uniswap/sdk'
const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%

const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
const path = [WETH[DAI.chainId].address, DAI.address]
const to = '' // should be a checksummed recipient address
const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
const value = trade.inputAmount.raw // // needs to be converted to e.g. hex
```

# Nguồn

Bài viết được tài trợ trực tiếp từ docs của uniswap: 
https://uniswap.org/docs/v2/javascript-SDK/quick-start