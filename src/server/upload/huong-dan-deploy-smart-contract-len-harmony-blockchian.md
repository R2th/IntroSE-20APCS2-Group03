![](https://images.viblo.asia/877b5e99-35d4-48aa-8b28-13d1214364bb.jpg)

Harmony được giới thiệu là một nển tảng blockchain nhanh và bảo mật cho các ứng dụng phân tán. Mainnet của họ có 1000 nodes được chia thành 4 shards và với khả năng đóng blocks trong 8s. Nền tảng blockchain này giống Ethereum đến lạ kỳ, có chăng cái khác hiện tại của nó là đang sử dụng một cơ chế đồng thuận khác đó là **Effective Proof-of-Stake** (EPoS),  theo như nhà phát triển thì đây là một loại cải tiến của PoS. Trong rất nhiều sự tương đồng với Ethereum thì một trong số đó là đều có smart contract, cũng sử dụng solidity để viết contract và deploy cũng có thể dùng những công cụ phát triển của Ethereum. Để chứng minh cho điều này mình xin viết bài này hướng dẫn các bạn deploy một smart contract lên mạng Harmony

# Yêu cầu cài đặt
Cũng có thể sử dụng Truffle để code và deploy smart contract nên ở đâu chúng ta cần install **Truffle**

```shell
    npm install -g truffle@5.0.38
```

# Khởi tạo project

```shell
    mkdir harmonyERC20
    cd harmonyERC20
    truffle init
```

# Installing Harmony Core
Để deploy ta cần install Harmony [@harmony-js/core](https://www.npmjs.com/package/@harmony-js/core)

```shell
    npm install --save @harmony-js/core@next
    npm install --save tslib
```

# Install thư viện bổ xung
Nếu contract phát triển trên chuẩn ERC-20 hoặc ERC-721 thì bạn cần install thêm các thư viện của  [open zeppelin libraries.](https://openzeppelin.com/contracts/)

```shell
    npm install openzeppelin-solidity -s
    npm install --save dotenv
```

# Tạo một file package.json
Cần tạo một file **package.json** như sau để tải các thư viện:

```json
    {
      "name": "harmony-erc20",
      "version": "1.0.0",
      "description": "Harmony sample ERC20 deploy",
      "main": "truffle.js",
      "dependencies": {
        "@harmony-js/core": "^0.1.22",
        "dotenv": "^8.2.0",
        "tslib": "^1.10.0",
        "openzeppelin-solidity": "^2.2.0"
      }
    }
```

Sau đó chạy command:  `npm install`

# Configure truffle để sử dụng được Harmony 
Để build được contract trên Harmony ta cần sử đổi file **truffle-config.js**, để setup network thành Harmony network.

```js
    require('dotenv').config()
    const { TruffleProvider } = require('@harmony-js/core')
    //Local
    const local_mnemonic = process.env.LOCAL_MNEMONIC
    const local_private_key = process.env.LOCAL_PRIVATE_KEY
    const local_url = process.env.LOCAL_0_URL;
    //Testnet
    const testnet_mnemonic = process.env.TESTNET_MNEMONIC
    const testnet_private_key = process.env.TESTNET_PRIVATE_KEY
    const testnet_url = process.env.TESTNET_0_URL
    //Mainnet
    const mainnet_mnemonic = process.env.MAINNET_MNEMONIC
    const mainnet_private_key = process.env.MAINNET_PRIVATE_KEY
    const mainnet_url = process.env.MAINNET_0_URL;

    //GAS - Currently using same GAS accross all environments
    gasLimit = process.env.GAS_LIMIT
    gasPrice = process.env.GAS_PRICE

    module.exports = {


      networks: {
        local: {
          network_id: '2', // Any network (default: none)
          provider: () => {
            const truffleProvider = new TruffleProvider(
              local_url,
              { memonic: local_mnemonic },
              { shardID: 0, chainId: 2 },
              { gasLimit: gasLimit, gasPrice: gasPrice},
            );
            const newAcc = truffleProvider.addByPrivateKey(local_private_key);
            truffleProvider.setSigner(newAcc);
            return truffleProvider;
          },
        },
        testnet: {
          network_id: '2', // Any network (default: none)
          provider: () => {
            const truffleProvider = new TruffleProvider(
              testnet_url,
              { memonic: testnet_mnemonic },
              { shardID: 0, chainId: 2 },
              { gasLimit: gasLimit, gasPrice: gasPrice},
            );
            const newAcc = truffleProvider.addByPrivateKey(testnet_private_key);
            truffleProvider.setSigner(newAcc);
            return truffleProvider;
          },
        },
        mainnet0: {
          network_id: '1', // Any network (default: none)
          provider: () => {
            const truffleProvider = new TruffleProvider(
              mainnet_url,
              { memonic: mainnet_mnemonic },
              { shardID: 0, chainId: 1 },
              { gasLimit: gasLimit, gasPrice: gasPrice },
            );
            const newAcc = truffleProvider.addByPrivateKey(mainnet_private_key);
            truffleProvider.setSigner(newAcc);
            return truffleProvider;
          },
        },
      },

      // Set default mocha options here, use special reporters etc.
      mocha: {
        // timeout: 100000
      },

      // Configure your compilers
      compilers: {
        solc: {
          version: "0.5.8",
        }
      }
    }
```

Trong này sẽ có một số chỗ sử dụng đến các biến môi trường nên ta  cũng cần setup file **.env** như sau:
```js
    //LOCAL
    //Local uses account one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7 on Shard 0
    LOCAL_PRIVATE_KEY='45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e'
    LOCAL_MNEMONIC='urge clog right example dish drill card maximum mix bachelor section select' 
    LOCAL_0_URL='http://localhost:9500'

    //TESTNET
    //Account: one18t4yj4fuutj83uwqckkvxp9gfa0568uc48ggj7
    TESTNET_PRIVATE_KEY='01F903CE0C960FF3A9E68E80FF5FFC344358D80CE1C221C3F9711AF07F83A3BD'
    TESTNET_MNEMONIC='urge clog right example dish drill card maximum mix bachelor section select' 

    TESTNET_0_URL='https://api.s0.b.hmny.io'
    TESTNET_1_URL='https://api.s1.b.hmny.io'

    //MAINNET
    //Please replace MAINNET_PRIVATE_KEY and MAINNET_MNEMONIC with your own!
    //Account: one18t4yj4fuutj83uwqckkvxp9gfa0568uc48ggj7
    MAINNET_PRIVATE_KEY='01F903CE0C960FF3A9E68E80FF5FFC344358D80CE1C221C3F9711AF07F83A3BD'
    MAINNET_MNEMONIC='urge clog right example dish drill card maximum mix bachelor section select' 
    MAINNET_0_URL='https://api.s0.t.hmny.io'

    GAS_LIMIT=3321900
    GAS_PRICE=1000000000
```

# Viết smart contract

Chúng ta sẽ viết 2 file triển khai trên Harmony HRC20 như dưới đây:

- **HarmonyMintable.sol**

    ```js
        pragma solidity >=0.4.21 <0.6.0;

        import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
        import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
        import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

        contract HarmonyERC20 is ERC20, ERC20Detailed, ERC20Mintable {
              constructor(string memory _name, string memory _symbols, uint8 _decimals, uint256 _amount) 
                ERC20Detailed(_name, _symbols, _decimals)
                public {

                _mint(msg.sender, _amount);
            }
        }
    ```

- **HarmonyERC20.sol** 

    ```js
        pragma solidity >=0.4.21 <0.6.0;

        import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
        import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

        contract HarmonyERC20 is ERC20, ERC20Detailed {
              constructor(string memory _name, string memory _symbols, uint8 _decimals, uint256 _amount) 
                ERC20Detailed(_name, _symbols, _decimals)
                public {

                _mint(msg.sender, _amount);
            }
        }
    ```
    
# Add file migration 
cuối cùng là file migration để deploy contract:

- **2_deploy_HarmonyERC20.js**

    ```js
        var HarmonyERC20 = artifacts.require("HarmonyERC20");

        module.exports = function(deployer, network, accounts) {

        const name = "HarmonyERC20"
        const symbol = "H20"
        const decimals = 18
        const amount = 1000000
        const tokens = web3.utils.toWei(amount.toString(), 'ether')

        deployer.then(function() {
          return deployer.deploy(HarmonyERC20, name, symbol, decimals, tokens).then(function() {
            });
          });
        };
    ```
    
Cấu trúc thư mục sẽ như sau:

![](https://images.viblo.asia/f8a4d4b7-b862-4e7f-8ea6-7b93fc8840fe.png)


# Compile và deploy contracts

Sử dụng các câu lệnh sau để compile và deploy:

```shell
    truffle compile
    truffle migrate  --network testnet --reset
    truffle networks
```

Kết quả sẽ như sau

```shell
    ngova@DESKTOP-P1AJG2V MINGW64 ~/Downloads/harmonyERC20
    $ truffle migrate  --network testnet --reset

    Compiling your contracts...
    ===========================
    > Compiling .\contracts\HarmonyERC20.sol
    > Compiling .\contracts\HarmonyMintable.sol
    > Compiling .\contracts\Migrations.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol
    > Compiling openzeppelin-solidity\contracts\GSN\Context.sol
    > Compiling openzeppelin-solidity\contracts\access\Roles.sol
    > Compiling openzeppelin-solidity\contracts\access\roles\MinterRole.sol
    > Compiling openzeppelin-solidity\contracts\math\SafeMath.sol
    > Compiling openzeppelin-solidity\contracts\token\ERC20\ERC20.sol
    > Compiling openzeppelin-solidity\contracts\token\ERC20\IERC20.sol
    > Artifacts written to C:\Users\ngova\Downloads\harmonyERC20\build\contracts
    > Compiled successfully using:
       - solc: 0.5.8+commit.23d335f2.Emscripten.clang



    Migrations dry-run (simulation)
    ===============================
    > Network name:    'testnet-fork'
    > Network id:      2
    > Block gas limit: 3321900 (0x32b02c)


    1_initial_migration.js
    ======================

       Replacing 'Migrations'
       ----------------------
       > block number:        922490
       > block timestamp:     1597312204
       > account:             0x3aea49553Ce2E478f1c0c5ACC304a84F5F4d1f98
       > balance:             3553833.469779825581597178
       > gas used:            147243 (0x23f2b)
       > gas price:           2 gwei
       > value sent:          0 ETH
       > total cost:          0.000294486 ETH

       -------------------------------------
       > Total cost:         0.000294486 ETH


    2_deploy_HarmonyERC20.js
    ========================

       Replacing 'HarmonyERC20'
       ------------------------
       > block number:        922492
       > block timestamp:     1597312282
       > account:             0x3aea49553Ce2E478f1c0c5ACC304a84F5F4d1f98
       > balance:             3553833.466765935581597178
       > gas used:            1479604 (0x1693b4)
       > gas price:           2 gwei
       > value sent:          0 ETH
       > total cost:          0.002959208 ETH

       -------------------------------------
       > Total cost:         0.002959208 ETH


    Summary
    =======
    > Total deployments:   2
    > Final cost:          0.003253694 ETH





    Starting migrations...
    ======================
    > Network name:    'testnet'
    > Network id:      2
    > Block gas limit: 3321900 (0x32b02c)


    1_initial_migration.js
    ======================

       Replacing 'Migrations'
       ----------------------
       > transaction hash:    0x257590b6584a5c3d75cd468fb233f2d52d0197781ead49ab73db2478777d8383
       > Blocks: 1            Seconds: 5
       > contract address:    0xD64Bf0346fDbb6Cb2f95Ec8c2c16129A34f92DB6
       > block number:        0
       > block timestamp:     1561734000
       > account:             0x3aea49553Ce2E478f1c0c5ACC304a84F5F4d1f98
       > balance:             3553833.469888176581597178
       > gas used:            186135 (0x2d717)
       > gas price:           1 gwei
       > value sent:          0 ETH
       > total cost:          0.000186135 ETH


       > Saving migration to chain.
       > Saving artifacts
       -------------------------------------
       > Total cost:         0.000186135 ETH


    2_deploy_HarmonyERC20.js
    ========================

       Replacing 'HarmonyERC20'
       ------------------------
       > transaction hash:    0x64891c54b2143ed696d3fa1cbafd8a8092af9d6d86e451c43dc2297332c33449
       > Blocks: 1            Seconds: 5
       > contract address:    0xc98d647082b2E6A2580355E5D89F080878a07993
       > block number:        0
       > block timestamp:     1561734000
       > account:             0x3aea49553Ce2E478f1c0c5ACC304a84F5F4d1f98
       > balance:             3553833.467895087581597178
       > gas used:            1951088 (0x1dc570)
       > gas price:           1 gwei
       > value sent:          0 ETH
       > total cost:          0.001951088 ETH


       > Saving migration to chain.
       > Saving artifacts
       -------------------------------------
       > Total cost:         0.001951088 ETH


    Summary
    =======
    > Total deployments:   2
    > Final cost:          0.002137223 ETH

```

```shell
    ngova@DESKTOP-P1AJG2V MINGW64 ~/Downloads/harmonyERC20
    $ truffle networks

    Network: local (id: 2)
      No contracts deployed.

    Network: mainnet0 (id: 1)
      No contracts deployed.

    Network: testnet (id: 2)
      HarmonyERC20: 0xc98d647082b2E6A2580355E5D89F080878a07993
      Migrations: 0xD64Bf0346fDbb6Cb2f95Ec8c2c16129A34f92DB6
```

# Kiểm tra totalSupply
Chúng ta sẽ thử trên 2 môi trường là: môi trường test và môi trường gọi từ client

- **Môi trường test**

    Ta cần tạo một file test **Harmony.js** trong thư mục `test`

    ```js
        const HarmonyERC20 = artifacts.require('HarmonyERC20');

        module.exports = function () {
          async function test() {
            let instance = await HarmonyERC20.deployed();
            let total = await instance.totalSupply();
            console.log('total supply: ' + total);
          }
          test();
        };
    ```

    ![](https://images.viblo.asia/cc07afa9-8744-4b48-9f7a-1aeaf9607385.png)

    Sau đó chạy command:

    ```shell
        truffle exec test/Harmony.js --network testnet
    ```

    Kết quả 
    ```bash
        $ truffle exec test/Harmony.js --network testnet
        Using network 'testnet'.

        total supply: 1000000000000000000000000
    ```

    Mọi người hãy để ý lên file **2_deploy_HarmonyERC20.js** thì ta đang config giống như wei của Ethereum là dể `decimal = 18` và `amount=1000000` nên total trả về sẽ là : `1000000000000000000000000` ( 10^(6+18) )

    ```js
            ...

            const name = "HarmonyERC20"
            const symbol = "H20"
            const decimals = 18
            const amount = 1000000
            const tokens = web3.utils.toWei(amount.toString(), 'ether')

            ...
    ```
    
<br/>
<br/>

- **Môi trường client**
    
    Cũng giống như môi trường client ta sẽ giả lập 1 file js gọi hàm totalSupply thông qua `instance` của contract. Ta sẽ tạo 1 file có tên **Harmony_sdk.js** trong thư mục test:

    ```js
        const { Harmony } = require('@harmony-js/core');
        const { ChainID, ChainType } = require('@harmony-js/utils');
        const hmy = new Harmony('https://api.s0.b.hmny.io', {
          chainType: ChainType.Harmony,
          chainId: ChainID.HmyTestnet,
        });

        const contractJson = require('../build/contracts/HarmonyERC20.json');
        const contractAddr = contractJson.networks[2].address;

        const contract = hmy.contracts.createContract(contractJson.abi, contractAddr);
        contract.methods
          .totalSupply()
          .call()
          .then((total) => {
            console.log('total supply ' + total);
            process.exit(0);
          })
          .catch((e) => {
            console.log(e);
          });
    ```

    ![](https://images.viblo.asia/68a0243b-795f-4f40-806d-ab157e1a1915.png)
    
    Sau đó chạy command: `node test/Harmony_sdk.js`
    
    Kết quả
    
    ```bash
        $ node test/Harmony_sdk.js
        total supply: 1000000000000000000000000
    ```
    
    Mọi người chú ý giúp mình chỗ này mình đang sử dụng mạng Testnet với Id là `2`. Nên nếu trong trường hợp sử dụng cho Mainnet hoặc Testnet khác thì mọi người có thể thay đổi ở đây để có thể get được đúng địa chỉ nha
    ```js
        const contractAddr = contractJson.networks[2].address;
    ```
    
    
    
# Block exporers
Cũng giống như Ethereum thì Harmony cũng có trang để để [block exporers](https://docs.harmony.one/home/developers/block-explorers): Mainnet và Testnet

![](https://images.viblo.asia/dea2b646-751d-457d-8a14-5abe376696ab.png)

- Như ở đây ta deploy nó lên môi  trường testnet nên sẽ vào Testnet để kiểm tra

![](https://images.viblo.asia/fd246f5c-1fcb-4086-8874-2a03da8866e8.png)

- Contract đã có trên mạng

![](https://images.viblo.asia/a03c39d1-02e3-451d-b13d-e3adeba2186b.png)

- Nhưng chưa có transaction nào 

![](https://images.viblo.asia/a03574da-16ec-4bd1-8697-df650d8a5f14.png)





    
    
#  Kết luận
Như vậy là chúng ta đã deploy thành công một smart contract lên mạng Harmony blockchain. Chắc hẳn mọi người bây giờ đang có chút ngờ ngợ, ớ không biết có deploy lên đúng mạng không nhỉ mà cứ như là lên Ethereum thế. Không bạn deploy lên đúng mạng rồi đấy chẳng qua là nó giống Ethereum quá thôi mà. Cảm ơn các bạn đã đón đọc rất vui và hẹn gặp lại cách bạn trong các bài viết tiêp theo.

<br/>

##### Nguồn: https://docs.harmony.one/home/developers/smart-contracts