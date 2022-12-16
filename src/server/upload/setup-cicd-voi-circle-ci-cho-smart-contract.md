![Solidity circleCI](https://images.viblo.asia/1adce6b6-1b27-4979-8415-cbca4d399236.jpg)

Trong quy trình làm phần mềm, lỗi lầm lớn nhất có thể xảy ra không phải là khi developer code ra cái gì đó bị bug ! Ta biết nó ngập bug, ta sửa lại nó một cách qua loa vậy là xong. Một dòng code smile dù nhỏ nhưng một khi đã merge vào repo có thể dẫn đến tai nạn khôn lường. Không có gì đảm bảo rằng code của bạn là clean cả.

Ở bài trước mình có đề cập đến việc viết test contract [tại đây](https://viblo.asia/p/kiem-thu-solidity-voi-truffle-jvElagBAKkw) . Vấn đề đặt ra khi phát triển project nhiều người hoặc opensource là khi có một pull request việc check thủ công không thể đảm bảo 100% về logic được . Chúng ta cần một tool có thể check xem liệu code của chúng ta có đúng trong tất cả test case hay không . Ở bài viết này mình sẽ hướng dẫn setup CircleCI cho việc viết smart contract.

Tiếp tục vs repo trong [bài viết trước](https://viblo.asia/p/kiem-thu-solidity-voi-truffle-jvElagBAKkw) chúng ta đã hoàn thành việc viết unit test cho contract . Mục tiêu là sẽ kiểm thử code mới đc pull lên có vượt qua hết các test case không .

## Cài đặt Circle CI

### Cấu hình

Vào project tạo folder `.circleci` và tạo file `config.yml` bên trong với nội dung

```js
version: 2
jobs:
  build:
    docker:
      - image: circleci/node:10-browsers
      - image: trufflesuite/ganache-cli
    steps:
      - checkout
      - run:
          name: Update npm
          command: 'sudo npm install -g npm@latest'
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run:
          name: Install npm wee
          command: npm install
      - run:
          name: Migrate Contracts
          command: ./node_modules/truffle/build/cli.bundled.js migrate --network development
      - run:
          name: Test Contracts
          command: ./node_modules/truffle/build/cli.bundled.js test --network development
      - save_cache:
          key: dependency-cache-{{ checksum "package.json" }}
          paths:
            - node_modules

```

**Chú thích :**

- version : đây là version của circle ci ở đây mình chọn ver 2
- docker: ở đây mình chọn môi trường test là js nên chọn 1 image là node ver 10 và để test contract chúng ta cần 1 mạng testnet ở đây mình chọn ganache-cli
- step : đây là phần setup thứ tự chạy các bước theo cấu trúc

```
run:
    name:
    command:
```

Ở file config đầu tiên mình sẽ chạy lệnh update npm `'sudo npm install -g npm@latest'`

- **restore_cache** & **save_cache** : Khôi phục bộ đệm đã lưu trước đó dựa trên **key** . Ở đây mục đích của mình muốn giữ lại node_modules để không phải tạo lại mỗi lần chạy `npm install`

Sau đó mình chạy `Install npm` rồi `Migrate Contracts` và chạy `Test Contract`

## Chạy CI

Chúng ta đã setup xong và giờ cùng chạy thử xem nào .

Đầu tiên chúng ta truy cập vào https://circleci.com/ đăng nhập dưới tài khoản Github . Sau đó chọn **Add project** . Ở đây bạn có thể thấy các repo trong Github của mình và cùng tiến hành setup nào :
![](https://images.viblo.asia/f2acdacc-9096-4e30-9f2d-7f7ea0407419.png)

Sau khi vào thì chỉ việc **Start building** thôi vì chúng ta đã config hết rồi
![](https://images.viblo.asia/4100024e-2626-47b3-9d45-992e93b2474c.png)

Đợi 1 vài phút để build và chúng ta đã có kết quả
![](https://images.viblo.asia/926b12c6-68c1-437a-8ace-6e4c65d53010.png)
Và giờ thì bất cứ 1 pull request nào sẽ được tự động check và nếu vượt qua hết các test sẽ có dấu `V` còn nếu bị fail sẽ có dấu `X`

## Test coverage

Nghe đâu đó có gì đó sai sai . Nếu như code mới có những trường hợp mới ko nằm trong test case đã viết trước thì sao, liệu có thực sự an toàn khi chúng ta merge code . Giải pháp của tôi đó chính là **Test coverage** .

### Cài đặt solidity-coverage

```sh
npm install solidity-coverage
```

Sau khi chạy xong sửa lại file config.yml để có thể check coverage một cách tự động luôn
Thêm đoạn code này vào sau khi chạy test

```js
- run:
    name: Test coverage
    command: ./node_modules/.bin/solidity-coverage
```

Config lại file truffle.js thêm mạng `coverage`:

```js
coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01 // <-- Use this low gas price
    }
```

và config lại solidity-coverage bằng cách thêm 1 file .solcover.js

```js
module.exports = {
  compileCommand: '../node_modules/.bin/truffle compile',
  testCommand: '../node_modules/.bin/truffle test --network coverage'
};
```

Giờ hãy cùng push code này lên nào .
![](https://images.viblo.asia/490013fe-21aa-4780-9f20-f7d5c6085e16.png)

Các tiêu chí test ở đây là theo

- `Branch` : check xem liệu test đã qua hết các trường hợp if-else chưa
- `Function` : check xem liệu test đã qua hết các function chưa
- `Line` : check xem test đã qua hết các dòng chưa

Việc này cho chúng ta thấy được rằng dù code mới nhưng coverage không đạt 100% nghĩa là vẫn còn tiềm ẩn bug :v . Vì vậy hãy viết unit test cùng với việc viết code và luôn đảm bảo rằng coverage >= 90% rồi hãy merge code nhé .

Github : https://github.com/vinhyenvodoi98/Test_Contract_With_Truffle