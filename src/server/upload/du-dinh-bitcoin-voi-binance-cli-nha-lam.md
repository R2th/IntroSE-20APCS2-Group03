*Tháng Năm chào Hà Nội bằng một trận mưa đêm. Sáng nay, gió về, mát lạnh. Hà Nội như được gột rửa những bụi bặm và mệt mỏi, chỉ còn lại sự khoan khoái dễ chịu, có cả chút se lạnh giống mùa thu nữa 💦  💦* 

*Sau những ngày mưa, hé cánh cửa đón làn gió mới, bật một bài nhạc dịu êm nhè nhẹ, mong rằng chúng mình luôn vui vẻ và yêu đời như Hà Nội những ngày này nhé!*

![](https://i.imgur.com/0yXXYZH.gif)

# ■ Intro.
Đợt vừa rồi mình đăng ký tham gia *[Coding Camp - Phá Băng Web 3.0 Cùng Solana](https://web3vn.solana.com/)*, dù mới đi được nửa chặng đường thôi cơ mà thấy bao nhiêu là điều hay ho muốn tìm hiểu >.<

Bài viết này thì chưa phải về `Sol` 😸  😸  &nbsp; Chẳng là gần đây, song song với những "cơn sóng lớn" của thị trường, xu hướng *`Run-to-earn`, `Play-to-earn`, `Shop-to-earn`...* vẫn đang được mọi người khá quan tâm. Hay là anh chị em mình cũng "bon chen":

```
Learn-to-earn - Code in every universe (Developer Strange in the Multiverse of Madness)
```

điii ^^

Trong bài viết này, hãy cùng nhau tìm hiểu về cách tự tạo một `Command-line interface (CLI)` bằng `JavaScript`  trên môi trường `NodeJS` để `trade coin/token(s)` trên sàn `Binance` nhé!

![](https://images.viblo.asia/f15d2682-e52b-444a-a6bd-f53df0936892.png)


# ■ Target

Đầu tiên, ngó qua chút về các lệnh và chức năng của `Binance CLI` mà chúng ta sắp làm:

![](https://images.viblo.asia/75cf914f-6a75-45eb-a5ac-872667ad16cd.gif)

<br>

#### Mô tả:

`Binance CLI` là một `CLI` hỗ trợ các dịch vụ trên sàn [`Binance`](https://www.binance.com/) thông qua các dòng lệnh:

```js
$ binance balance                     // Kiểm tra tài khoản

$ binance price                       // Xem giá các đồng coin/tokens
$ binance price --ass BTC --cur USDT  // Xem giá 1 đồng coin/token cụ thể (BTC/USDT)

$ binance order                       // Đặt lệnh mua/bán coin/token
$ ...
```


#### 🚨  &nbsp; Disclaimer:

***Bài viết này hướng tới các anh chị em đã và đang tìm hiểu về `NodeJS`, `NPM` , `JavaScript`; quan tâm cách tự xây dựng một `Command-line interface (CLI)`**.*

*Do đó, nghiệp vụ `trading` trên `Binance` chỉ là `ví-dụ-về-mặt-chức-năng`, không có mục đích l ừ a  đ ả o, bán "tool" cho các anh chị em `non-tech`. Em (mình) xin phép **`từ-chối-trách-nhiệm`** nếu `CLI` này được sử dụng và có bất kì rủi ro nào về mặt tài chính ạ.*

*Được rồi, cùng bắt đầu thôiii ^^*

# ■ Steps
Để hoàn thành `Binance CLI`, chúng ta sẽ đi theo các bước:

🔗 &nbsp;&nbsp;**Init**: *Khởi tạo dự án*

🔗 &nbsp;&nbsp;**Config**: *Khai báo các lệnh*

🔗 &nbsp;&nbsp;**Features**: *Đi vào từng chức năng:*

- **Get balance**: *Xử lý một lệnh cơ bản*
- **Check price**: *Xử lý một lệnh kèm --flag*
- **Place order**: *Xử lý một lệnh lấy giá trị đầu vào người dùng tương tác*

🔗 &nbsp;&nbsp;**Restructure - Expand**: *Tái cấu trúc; style, format lại cho xinhh =='*

<br/>

*Giờ thì đi vào bước đầu tiên! (go)(go)*

## ■ Init

Sau khi cài đặt môi trường [`NodeJS`](https://nodejs.org/en/) *(mình đang dùng `v18.1.0`)*, chúng ta tiến hành khởi tạo dự án:

```js:Terminal
$ mkdir binance  // tạo thư mục 🧊 binance-cli

$ cd binance     // di chuyển vào 🧊 binance-cli

$ npm init -y    // Tạo 📄 package.json - quản lý packages và thông tin dự án
```

Tạo `📋 index.js` - chứa các  `script` xử lý `logic` mà lát nữa chúng ta sẽ viết vào, cấu trúc thư mục hiện tại như sau:

```cmd
🧊 binance
          |____ 📄 package.json
          |____ 📋 index.js
```

Tạm thời `log` thử dòng `text` trong này nha:

```js:📋index.js
console.log('Make It Awesome!');
```

Tiếp theo, thêm `02 properties` vào `📄 package.json`:

```js:📄package.json
{
    "type": "module",
    "bin": {
        "binance": "index.js"
    },
    ...
}
```
 Trong đó:
- **`"type": "module"`**: Hỗ trợ việc sử dụng `JavaScript modules`
- **`"bin"`**: nhận vào một `object` có:
    - **`property`**: tên dùng để gõ lệnh qua `Command line`, trường hợp này là `"binance"`
    - **`value`**: địa chỉ trỏ tới `script` mà mình muốn liên kết với lệnh, trường hợp này là `"index.js"`

*(Bạn có thể đọc thông tin chi tiết tại [NPMJS Document](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin) nếu muốn tìm hiểu thêm nhé)*

Với mong muốn dùng `Binance CLI`ở bất cứ chỗ nào khi mở `Terminal`, chúng ta tiến hành cài đặt:
```js:Terminal
$ npm i -g . // lệnh này chạy trong thư mục 🧊  binance nha
```

Khi cài đặt một `package`, `npm` sẽ thêm `bin[property]`*(trong trường hợp này là `"binance"`)* vào `$PATH variable` trên máy tính, từ đó mà mình có thể dùng lệnh `"binance"` trên `Terminal`.

Kiểm tra thử xem ra cơm cháo gì chưa nào:
```js:Terminal
$ binance
// Expect: "Make It Awesome!"
// Result: Command not found
```

*Hmm...*

**(?) Cài đặt thành công rồi? Sao vẫn *"Command not found"* nhỉ?**

![](https://i.imgur.com/Ea2un0C.gif)

Cùng nhìn lại bức tranh tổng thể một chút nhé:
> Khi chúng ta gõ một dòng lệnh trên `Terminal` - có thể là `Bash shell` hoặc `Zsh shell` - `script` tương ứng của dòng lệnh đó sẽ được một-trình-thông-dịch *(`interpreter`)* thực thi.
 
Vậy vấn đề phát sinh là: **Làm sao`Terminal` biết trình thông dịch nào cần dùng để đọc `script` đó !?!**

Đến đây thì **[`Shebang line`](https://stackoverflow.com/questions/33509816/what-exactly-does-usr-bin-env-node-do-at-the-beginning-of-node-files/33510581#33510581)** sinh ra cho `Terminal` "bớt khổ tâm" nè 😹😹))

Ngắn gọn thì `Shebang line` - *một bộ ký tự được sử dụng để chỉ đạo hệ thống sử dụng trình thông dịch* - có dạng:
```
#!interpreter_path [optional-arg]
```
Trong đó:
- `interpreter_path`: đường dẫn đến trình thông dịch
- `[optional-arg]`: các thiết lập nếu cần thiết, tùy thuộc vào `interpreter`

Có một số các `shebang` mặc định thông dụng thường dùng cho các ngôn ngữ, môi trường khác nhau. Trong trường hợp này, chúng ta cần `NodeJS`:

```js:📋index.js
#!/usr/bin/env node               // Đặt lên trên cùng của file script
console.log('Make It Awesome!');
```

Giờ thì cài lại rồi kiểm tra nào:
```js:Terminal
$ binance
// Result: "Make It Awesome!"
```

*Bingooo!!! 🙌🙌🙌*

<BR/>

Để hoàn thành bước `Init`, chúng ta cài đặt thêm một số `packages` cần thiết:
```:Terminal
$ npm i commander ccxt inquirer prompt-confirm chalk figlet
```
 tương ứng với các mục đích dưới đây:
 
| NPM Package | Description |
| -------- | -------- |
| **`commander`**     | *Xây dựng command-line interfaces (CLI)*     |
| **`ccxt`**     | *Hỗ trợ  methods exchange coin/token trên các markets (`Binance, Huobi, AscendEX, etc)* |
| **`inquirer`, `prompt-confirm`**     | *Lấy thông tin đầu vào của người dùng khi tương tác trên CLI*     |
| **`chalk`, `figlet`**     | *Cho phép style, format text thu hút hơn* |

<br/>

*Tiếp theo, chúng ta tiến hành `config` các `command` cho `CLI` nhé!*

## ■ Config

Cú pháp khai báo một `CLI command`:

```js
import { Command } from 'commander';
const program = new Command();

program
    .command('NAME')                         // Tên
    .description('DESCRIPTION')              // Mô tả chức năng
    .option('--opt <OPTION>', 'DESCRIPTION') // Các --option, có thể nhiều hơn 01 option
    .action(callbackHandler)                 // Thêm hàm thực thi
    .parse(process.argv);                    // Parse các arguments được truyền vào script
```

Áp dụng vào `Binance CLI` của chúng ta:

```js:index.js
// BINANCE BALANCE
program
    .command('balance')
    .description('Check your own balances')
    .action(getMyBalance)      // console.log('getMyBalance')

// BINANCE PRICE
program
    .command('price')
    .description('Check the coin/token price(s)')
    .option(
        '--ass <ASSET: COIN/TOKEN>',
        'Set a specific coin/token'
    )
    .option(
        '--cur <CURRENCY>',
        'Set a specific base currency'
    )
    .action(getPriceInMarket)  // console.log('getPriceInMarket')

// BINANCE ORDER
program
    .command('order')
    .description('Place a buy/sell order')
    .action(placeAnOrder)     // console.log('placeAnOrder')

program.parse(process.argv);
```

Kiểm tra lại qua dòng lệnh:
```js:Terminal
$ binance balance // Result: getMyBalance
$ binance price   // Result: getPriceInMarket
$ binance order   // Result: placeAnOrder
```

*rồi qua xử lý nghiệp vụ trên `Binance` nha!* *(go)* *(go)*

![](https://i.imgur.com/Sine3vb.gif)

## ■ Features

Để sử dụng `Binance APIs` cho việc kiểm tra ngân sách cá nhân và đặt lệnh cho `coin/token(s)` trên sàn, chúng ta cần có `API KEY` và `Secret KEY`.

Bạn có thể lấy tại [API Management](https://www.binance.com/vi/my/settings/api-management) sau khi đăng nhập vào [Binance](https://www.binance.com/vi).

Song, trong quá trình phát triển, việc sử dụng `API KEY` và `Secret KEY` tương ứng với tài khoản thật -  thì quả là một bộ môn nguy hiểm, rất là rủi ro đúng không nào 🙀🙀  =))) 

Chú `CZ nhà Binance` hiểu điều đó nên cũng tạo điều kiện lắm =))) bạn có thể lấy cặp `API KEY` và `Secret KEY` này ứng với một tài khoản "ảo" trên [Spot Test Network](https://testnet.binance.vision/) bằng cách:
 
 ```
 Log In with GitHub > Generate HMAC_SHA256 Keys
 ```

*Btw, thông tin ngân sách tài khoản trong chiếc gif demo phía trên bài viết, mình cũng dùng tài khoản ảo nha =)))*

`Keys` đã có, tới đây thì có thể gọi các `API endpoints` tương ứng qua [`Binance API`](#)hoặc sử dụng `cctx package` rồi.

Trong bài viết này, chúng ta dùng `cctx`:
```js
import ccxt from 'ccxt';

const binanceExchange = new ccxt.binance({
  apiKey: YOUR_API_KEY,     // Thay cặp keys
  secret: YOUR_SECRET_KEY,  // của bạn vào đây nhé!
});

// Không cần setSandboxMode nếu bạn dùng cặp keys cho tài-khoản-thật trên Binance
binanceExchange.setSandboxMode(true); 
```

Với các `callbackHanler` cho từng chức năng tương ứng, chúng ta viết dạng:

```js
const callbackHanler = async () => {
  try {
    const response = await binanceExchange.callFeatureMethod(); // (1)

    const result = transformFormat(response);                   // (2)
    console.log(result);

  } catch (err) {
    console.error(chalk.red.bold(`ERROR: ${err.message}`));
  };
};
```

Trong đó:
- **(1) Hàm `binanceExchange.callFeatureMethod()`**:
  - Tuỳ vào từng nghiệp vụ mà chúng ta sẽ gọi qua các method tương ứng, bạn có thể xem qua các methods tại [CCTX document](https://docs.ccxt.com/en/latest/manual.html).
  - Trường hợp không muốn dùng thư viện `cctx`, đoạn này bạn gọi thẳng qua `endpoint` của `Binance API` cũng được luôn nhé, `Binance Document` được viết rất chi tiết [tại đây](https://binance-docs.github.io/apidocs/spot/en/#api-library).
- **(2) Hàm `transformFormat()`**:
  - **Đầu vào**: *`response`, kết quả `API` trả về*
  - **Đầu ra**: *`result`, kết quả mong muốn `log` ra `Terminal`*
  - **Logic**: *biến đổi `response` thành `result` như ý, mình sẽ comment ngắn gọn mục đích bên cạnh, chi tiết về các xử lý `JavaScript`, bạn tham khảo trong `source code` ở cuối bài nhé!*

<br/>

![](https://i.imgur.com/EyKhEI3.gif)

*Điểm qua 03 mục tiếp theo để đi vào từng chức năng chi tiết:*

### Get balance | Basic command

Lấy thông tin tài khoản nào:

```js
const getMyBalance = async () => {
  try {
    const { info: { balances } } = await binanceExchange.fetchBalance();
    // Chỉ lấy những đồng có số lượng > 0
    const displayCryptos = transformBalance(balances);
    console.table(displayCryptos);

  } catch (err) { ... };
};
```

### Check price | Command with --flag
Chúng ta có 2 lệnh xem giá:
```js
$ binance price                       // Xem giá các đồng coin/tokens
$ binance price --ass BTC --cur USDT  // Xem giá 1 đồng coin/token cụ thể (BTC/USDT)
```

Hàm `getPriceInMarket`:
```js
const getPriceInMarket = (options) => {
    console.log(options);
}
```
lấy giá trị các flag `--ass`, `--cur` thông qua param đầu vào:
```js
const { ass, cur } = options;  
```

Vì vậy, `logic` chỗ này là: 

```js
const getPriceInMarket = ({
  ass,
  cur = 'USDT',
}) => {
  if (!ass) {
    fetchTickersAPI();               // Xem giá các đồng coin/tokens
    return;
  };
  
  const symbol = `${ass}/${cur}`;
  fetchASpecificTickerAPI(symbol);  // Xem giá 1 đồng coin/token cụ thể (BTC/USDT)
};
```

Tương tự như `getMyBalance()`, 02 hàm `fetchTickersAPI()`, `fetchASpecificTickerAPI(symbol)` lần lượt gọi qua `binanceExchange.fetchTickers()`, `binanceExchange.fetchTicker(symbol)` và hiển thị kết quả tương ứng ra `Terminal` nha ^^

![](https://i.imgur.com/H9DnGwO.gif)

### Place order | Interactive Command

Để đặt lệnh mua/bán, luồng `logic` là sau `command line`:
```
$ binance order
```
chúng ta sẽ bắt đầu hỏi người dùng thông tin `order`: *loại tiền crypto muốn đặt; lệnh mua hay lệnh bán; số lượng bao nhiêu,...*. Sau đó xác nhận lại thông tin và tiến hành đặt lệnh thông qua các giá trị đầu vào. 

Đầu tiên, khai báo một mảng các câu hỏi cần thiết:
```js
const questions = [
    {
        name: 'asset',
        type: 'input',
        message: 'Which coin/token do you wanna place?(required)',
        validate: (asset) => !!asset,
        filter: (type) => type.toUpperCase(),
    },
        {
            name: 'currency',
            type: 'input',
            message: 'Which currency is based? (Default: USDT)',
            default: 'USDT',
        },
        {
             name: 'side',
             type: 'list',
             message: 'Which is order type?',
             choices: ['Buy', 'Sell'],
             default: 'Buy',
             filter: (type) => type.toLowerCase(),
        },
        {
              name: 'quantity',
              type: 'number',
              message: 'How quantity? (required float)',
              filter: (quantity) => (parseFloat(quantity) || ''),
              validate: (quantity) => (quantity > 0),
        },
];
```

`Inquirer` là `package` hỗ trợ hầu hết các kiểu tương tác đầu vào kèm các hỗ trợ *validate, transform,...* đa dạng, bạn có thể đọc thêm cách dùng [tại đây](https://www.npmjs.com/package/inquirer) nhé. 

Cùng viết hàm xử lý:
```js
import inquirer from 'inquirer';
import Confirm from 'prompt-confirm';

const placeAnOrder = () => {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const confirm = new Confirm('Are you sure to place this market order?');
            confirm.ask((isConfirm) => {
                    if (isConfirm) placeAnMarketOrderAPI(answers);
            });
        })
        .catch((err) => { ... });
};
```

Có đầu vào hợp lệ rồi thì còn chần chờ gì nữa, đặt lệnh thôi:
```js
const placeAnMarketOrderAPI = async (answers) => {
    const { asset, currency, side, quantity } = answers;
    try {
        const orderResponse = await binanceExchange.createOrder(
            `${asset}/${currency}`,
            'market',
             side,
             quantity,
        );
        // ...
        console.info('SUCCESSFULLY! GOOD LUCK, "HODLER" :"> CHECK YOUR BALANCES AGAIN ^^');
  } catch (err) { ... };
};
```

*Yayyy, tới đây thì đã cơ bản xong rồi nè, cơ mà có vài điều có thể cải thiện thêm chút, mình sẽ liệt kê ở mục dưới kèm các gợi ý mở rộng chức năng nhé!*

![](https://i.imgur.com/ivPeI2s.gif)
# ■ Restructure - Expansion

#### Restructure:
- Chỉnh sửa `folder structure`, `file-splitting` theo cách của bạn sao cho trông gọn gàng sạch sẽ hơn chút *(có thể chia theo các `module` chức năng chẳng hạn ^^)*
- Thêm `styles`, `format` lại các `text` đầu ra cho xinh, bạn có thể thử với `chalk` nhé; `font` thì dùng `figlet` =='
- *`Source code` của `Binance CLI` trong bài viết này, bạn tham khảo tại [Github](https://github.com/haolt/binance-cli).*

<BR/>

#### Expansion:
*Ngoài 03 chức năng chính trong bài viết, các bạn có thể tạo mới hoặc phát triển thêm:*

- Kiểm tra thông tin số dư trong *ví Spot, Funding, Earn,...*
- Xem các lệnh đang chờ khớp
- Vẽ biếu đồ nến của 1 đồng nào đó
- Đặt lệnh đa dạng hơn: *Market, Stop-Loss, Stop-Limit,...*
- ...

*rồi chia sẻ thành phẩm phía dưới comments nha ^^*

# ■ Sumup

Như vậy là chúng ta đã cùng nhau hoàn thành chiếc `Binance CLI` nhà làm rồi!!!

![](https://i.imgur.com/vgWz9KW.gif)

Có thể nói, song song với `GUI`, `CLI` cũng có rất nhiều cái hay và có thể phục vụ được đa dạng nhu cầu. Từ những tác vụ cho những công việc có thể kể tới như:
- *Tạo `boilerplate` mặc định cho dự án mới*
- *Auto render ra `test files` kèm case mặc định cho các `React components`*
- ...

cho đến những nhu cầu cá nhân: *xem thời tiết, theo dõi lịch đấu bóng,..*
Hoặc đơn giản chỉ là mong muốn biết thêm những `behind the scenes` từ khi một dòng lệnh được gõ cho tới lúc nó thực thi xong. **Rõ ràng việc quan sát kỹ lưỡng và tìm hiểu một chút về cách hoạt động của các công cụ được sử dụng luôn là điều tốt đúng không nào ^^**

Hy vọng rằng bài viết này có thể giúp ích được các bạn. Cảm ơn các bạn đã đọc bài chia sẻ này. Lại hay `30/04` vừa rồi là sinh nhật của mình :cake::cake:, **`"mừng tuổi mới" 1 upvote`** để mình có thêm động lực cho những bài viết sắp tới nhé 🥰  🥰

![](https://images.viblo.asia/bcac0ae4-37b9-4f82-a75a-8dc9bbdd51ba.gif)

*Chúc các bạn ngày làm việc hiệu quả! Tiện ghé qua [nhà mình](https://haodev.wordpress.com/) chơi một chút rồi về!*

# ■ Credits

- **Resources: [Zephyrnet](https://zephyrnet.com/build-a-javascript-command-line-interface-cli-with-node-js/?amp=1), [Cheatcode](https://cheatcode.co/tutorials/how-to-build-a-command-line-interface-cli-using-node-js), [Traversy Media](https://www.youtube.com/watch?v=-6OAHsde15E&t=2516s), [Chuyện của Hà Nội](https://www.facebook.com/ChuyencuaHaNoi).**
- **Thumbnail: [Design via Canva](https://www.canva.com).**
- **Policies:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com/2022/05/12/du-dinh-bitcoin-voi-binance-cli-nha-lam/).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com/2022/05/12/du-dinh-bitcoin-voi-binance-cli-nha-lam/).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com).**
    - **Support: [Buy me a pizza](https://www.buymeacoffee.com/haolt).**
- **Copyright:** **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright of your contents, please [contact me](https://haodev.wordpress.com).**

<br/>


***Happy coding!***