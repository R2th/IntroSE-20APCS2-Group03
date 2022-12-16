## Why Synpress ?
Khi kiểm thử các ứng dụng DApp - Mình phải tương tác với Metamask rất nhiều - Confirm Transacition, Approve, Login with Metamask,... --> cần một framework hỗ trợ toàn bộ các tương tác với Metamask --> Synpress

## Context 
Mình đã cài Synpress theo tutorial này: https://medium.com/coinmonks/test-e2e-login-to-dapp-with-metamask-with-synpress-5248dd1f17c1 
Tuy nhiên trong quá trình cài lại gặp 1 số lỗi --> quá trình cài không thành công --> Mình có fix lại 1 tí + translate sang tiếng Việt cho các bạn sử dụng theo cho dễ

## Start
### Step 1: Clone repo: https://github.com/cuongpo/synpress.git
* Open Terminal
* Cd đến thư mục bạn muốn lưu (example: cd desktop)
* Git clone https://github.com/cuongpo/synpress.git

### Step 2: Install dependency
* cd synpress
* npm install cypress --save-dev
* npm i @synthetixio/synpress
* npm install env-cmd

### Step 3: Config environment
Chỉnh file .env theo cấu hình chain bạn muốn test
NETWORK_NAME=
RPC_URL=
CHAIN_ID=
SYMBOL=
BLOCK_EXPLORER=
IS_TESTNET=
PRIVATE_KEY=

Ví dụ BSC testnet thì 
NETWORK_NAME=BSC Testnet
RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545
CHAIN_ID=97
SYMBOL=BNB
BLOCK_EXPLORER=https://explorer.binance.org/smart-testnet
IS_TESTNET=true
PRIVATE_KEY=486********

Private key thì lên metamask -> account detail --> export nhé

Bạn cùng có thể config thêm 2 tham số (optional) SKIP_METAMASK_INSTALL, SKIP_METAMASK_SETUP để skip qua phần install và setup metamask
SKIP_METAMASK_INSTALL = 1
SKIP_METAMASK_SETUP = 1

### Step 4: Fix bug run metamask twice
Đến bước này nếu mình chạy `npm run test` luôn thì sẽ xảy ra lỗi metamask bị chạy 2 lần dẫn đến kết nối không thành công  --> Mình sửa lại file metamask.js ở đường dẫn node_modules/@synthetixio/synpress/commands/metamask.js bằng file ./metamask.js mà mình sửa ở thư mục gốc 


### Step 5: Run
Bật terminal -  `npm run test`  :3 
Bạn có thể config ở package.json cú pháp. Example - nếu bạn muốn chạy 1 file trong thư mục test thôi thì thêm --spec path/to/test.js

### Bonus: find element by Xpath
Có một điều không vui là synpress mặc định không có find element by Xpath như selenium --> mình cần cài thêm như sau:
* npm install -D cypress-xpath 
* vào `node_modules/@synthetixio/synpress/support/index.js`
* thêm `require('cypress-xpath');`

Vậy là xong phần cài synpress 
### Phần 2: [Sử dụng Synpress test Dapp - tương tác với Metamask] Viết testcase trên Synpress