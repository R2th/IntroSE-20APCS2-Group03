# LỜI NÓI ĐẦU
Chào mọi người, đã lâu rồi không gặp và hôm nay tiếp tục với chuỗi bài chia sẻ kiến thức - kinh nghiệm mà mình gặp phải trong quá trình làm việc cá nhân. Với những ai chưa biết thì các bài viết của mình sẽ xoay quanh chủ đề liên quan đến các lĩnh vực **Backend, Blockchain** cũng như **DevOps**, hi vọng thông qua việc chia sẻ kiến thức đến cộng đồng mình cũng sẽ nhận về các ý kiến đóng góp để cải thiện kỹ năng và nâng cao trình độ trong lĩnh vực chuyên môn cùng với lượng kiến thức khổng lồ của chúng ta hiện nay.

Trong quá trình làm việc với JS đặc biệt là các ReactJS, NodeJS developer chắc hẳn đã quá quen thuộc và thường xuyên sử dụng các thư viện npm *(Node Package Manager)* cho các project của mình. Vậy liệu có bao giờ, các bạn tự hỏi cách mà một thư viện npm được viết và publish lên cho cộng đồng sẽ diễn ra như thế nào? Vì vậy, bài viết hôm nay mình xin giới thiệu đến mọi người cách mà mình đã viết và publish một thư viện với tên gọi **eth-blockchain-helper** lên npm registry nhằm phục vụ cộng đồng Web3 developer. Nội dung bài viết hôm nay bao gồm 2 phần:

* **Phần 1: WHAT? (Create your package)**:  Mục đích thư viện npm mình viết ra để làm cái việc gì?
* **Phần 2: HOW?  (Publish your package)**: Cách để mình publish thư viện lên cho cộng đồng sử dụng như thế lào?

![image.png](https://images.viblo.asia/5c0d338c-ab05-4b66-b8a4-e924a984d090.png)

Và đây chính là nhân vật chính của chúng ta ngày hôm nay **[eth-blockchain-helper](https://www.npmjs.com/package/eth-blockchain-helper)**. Hãy bắt đầu ngay bằng việc install và khám phá thư viện nào:

``` 
npm i eth-blockchain-helper 
```

``` 
// es6
import BlockchainService from 'eth-blockchain-helper';
// es5
const BlockchainService = require('eth-blockchain-helper').default; 
```


# NỘI DUNG

## What? -  Create your package
**[eth-blockchain-helper](https://www.npmjs.com/package/eth-blockchain-helper)** là thư viện mình viết bằng **Typescript** nhằm phục vụ cho các Web3 developer thực hiện việc tương tác một cách nâng cao với Smart Contract thuộc nền tảng Ethereum (Ethereum, Binanace Smart Chain, Polygon,...) cũng như là các công cụ Web3 hỗ trợ đi kèm sẽ được tiếp tục hoàn thiện và update trong các version tiếp theo. Các tính năng chính mà thư viện mang lại bao gồm:

* **Create raw transaction**: Tạo raw transaction.
* **Sign raw transaction**: Ký lên raw transaction.
* **Send raw transaction**: Gửi transaction đã ký lên mạng.
* **Get receipt transaction**: Lấy thông tin receipt transaction đã gửi.
* **Get event log**: Lấy thông tin event phát ra từ transaction. 

Mình sẽ tiến hành các bước sau đây để viết và hoàn thiện một npm package.

### Step 1: Init
Trước hết, chúng ta cần phải tiến hành setup như các project thông thường khác thông qua lệnh **npm init** đồng thời cấu hình thêm các file config liên quan (mình sử dụng Typescript nên cần thêm **tsconfig.json** để hỗ trợ phiên dịch)

### Step 2: Develope
Tiếp theo, các bạn sẽ phải viết các file logic của thư viện như các dự án thông thường khác. Ở đây mình viết tất cả logic của thư viện trong file **index.ts** và export default thành một module dưới dạng class.

Sau khi viết xong các bạn sẽ phải test lại xem các logic của mình đã viết đúng yêu cầu và mong đợi ban đầu hay chưa?

Mình sẽ bỏ qua và xem như các bạn có file logic thư viện cho riêng mình có thể work hoàn hảo và bước sang bước tiếp theo.

### Step 3: Build
Sau khi kiểm tra và đảm bảo file logic đã được thực thi hoàn chỉnh chúng ta sẽ tiến hành build thành folder **dist/commonjs** và sẵn sàng để publish lên registry npm cho cộng đồng sử dụng.

Lưu ý; Nếu thư viện của bạn được viết bằng JS bạn đã có thể sử dụng trực tiếp thì chỉ cần define entry point cho file logic (index.js) và bỏ qua quá trình build từ Typescript sang Javascript (như mình).

## How? - Publish your package
Quá trình nãy sẽ hướng dẫn các bạn quy trình để publish thư viện npm của riêng mình lên registry để cộng đồng có thể install thông qua npm và bắt đầu tương tác sử dụng. 

### Step 1: Đăng ký tài khoản npm registry
Để có thể publish một npm package trước hết bạn cần có một tài khoản npm registry. Tiến hành đăng ký tại trang chủ (https://www.npmjs.com/)

### Step 2: Mô tả file package.json
Quá trình này giúp mô tả về toàn bộ thư viện npm package của bạn, các thông tin cần lưu ý bao gồm 

```
{
  "name": "eth-blockchain-helper", //name of package - unique
  "version": "1.0.0", //version of package
  "description": "package helper for ethereum blockchain and EVM based network", //description about package
  "main": "dist/commonjs/index.js", //entry file of package
  "types": "dist/commonjs/index.d.ts", //type of module
  "files": [
    "dist"
  ], //files to publish
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node index",
    "build": "tsc"
  },
  "author": "KNHH", //name of author
  "license": "ISC", 
  "repository": { //open source repo of package
    "type": "git",
    "url": "https://github.com/khiem20tc/eth-blockchain-helper.git"
  },
  "homepage": "https://github.com/khiem20tc/eth-blockchain-helper#readme", //readme file of package
  "dependencies": { //depenncies be used in package
    "ethereumjs-tx": "^2.1.2",
    "web3": "^1.8.0"
  },
  "keywords": [ //keywords for package
    "ethereum",
    "eth",
    "blockchain",
    "smartcontract",
    "signature",
    "transaction",
    "tx",
    "web3",
    "dapp",
    "solidity",
    "helper",
    "npm"
  ]
}
```
### Step 3: Login npm
Tiếp theo, chúng ta tiến hành gõ lệnh **npm login** để đăng nhập và nhập mã OTP để xác thực

### Step 4: Publish npm
Sau đó, công việc đơn giản khi chúng ta chỉ cần gõ lệnh **npm publish** là có thể đưa package của bạn lên trang chủ npm và từ bây giờ thì bất cứ ai cũng có thể install thư viện về và sử dụng.

### Step 5: Install npm package
Cuối cùng, để kiểm tra và đảm bảo package npm của mình đã được publish và hoạt động ổn định. Các bạn có thể tiến hành install lại package từ npm registry để sử dụng thông qua câu lệnh **npm install package_name@version** và tiến hành import thư viện để tương tác.

### Step 6: Upgrade npm package
Sau này, nếu có nhu cầu cải tiến và upgrade version cho thư viện các bạn chỉ cần tiến hành lại các bước bao gồm việc chỉnh sửa logic, điều chỉnh version trong file mô tả và tiến hành publish như các bước đã được giới thiệu bên trên.
![image.png](https://images.viblo.asia/00a1f76d-b0ab-4924-942a-7932bcf36644.png)
# LỜI KẾT

Bài viết đã giới thiệu đến các bạn các kiến thức và hướng dẫn cần thiết để giúp mọi người có thể dễ dàng viết và publish một thư viện npm đơn giản cho cộng đồng sử dụng. Các bước tóm tắt lại ngắn gọn bao gồm:
* Step 1: npm init
* Step 2: writing your package
* Step 3: npm login
* Step 4: npm publish

Lời cuối cùng, hi vọng mọi người bỏ ra chút thời gian trải nghiệm thư viện **eth-blockchain-helper** của mình thông qua câu lệnh bên dưới và để lại các ý kiến đóng góp cải tiến. 

``` npm i eth-blockchain-helper@1.0.4 ```

Đồng thời nếu thấy hữu ích xin hãy để lại 1 **STAR** ủng hộ thông qua repo **https://github.com/khiem20tc/eth-blockchain-helper** để mình sớm claim được **Starstruck Achievements** (sở hữu repo 16 star) của Github :):)

![StarstruckAchievements.png](https://images.viblo.asia/d9c70578-ec2e-46f8-92ea-51284fe20dd7.png)

Hi vọng bài viết có thể mang lại các kiến thức hữu ích cho cộng đồng và có thể nhận được các ý kiến đóng góp cũng như hẹn gặp lại mọi người vào các loạt bài khác trong tương lai :))) Many thanks all <3