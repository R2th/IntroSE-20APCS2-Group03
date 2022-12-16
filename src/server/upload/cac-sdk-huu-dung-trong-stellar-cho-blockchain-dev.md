Stellar là một trong những nền tảng blockchain thuộc loại sớm nhất (phát hành trước **Ethereum**) và ngay từ đầu chỉ tập trung trực tiếp vào payments chứ không mở rộng thêm các hướng về healthcare, estate... như các blockchain khác. Bên cạnh đó Stellar cũng đang được **Samsung** hợp tác, có thể chúng ta sẽ sớm thấy **lumens** được tích hợp luôn trên các mẫu điện thoại của samsung.

![](https://images.viblo.asia/c299e222-cba1-40b1-88ae-2061d1063917.png)

# Mở đầu

Đầu tiên, bài viết này hướng đến những SDK mới của Stellar nên sẽ phù hợp với những blockchain Dev đã từng biết qua Stellar một xíu, còn những bạn mới bắt đầu tìm hiểu blockchain hoặc bắt đầu thì có thể đọc qua bài viết này để có cái nhìn sơ lược về Stellar : [Stellar là gì? Stellar hoạt động như thế nào?](https://viblo.asia/p/stellar-la-gi-stellar-hoat-dong-nhu-the-nao-Az45bzG65xY)

Tuy nhiên trong bài này nếu các bạn chạy theo step-by-step sẽ thấy không chuyển được lumens do có một lỗi là chưa đăng ký account trên mạng stellar (Mặc dù trong bài chúng ta sử dụng TESTNET). Đây chính là cách mạng Stellar hạn chế các địa chỉ rác trên mạng của họ. Để có thể trở thành địa chỉ có thể sử dụng được thì chúng ta phải faucet cho địa chỉ đó một chút **lumens** và cũng được coi như một cách đăng ký với mạng

Dưới đây sẽ là function faucet, các bạn sẽ được 1000 lumens để test:
```js
const {
  TransactionBuilder,
  Server,
  Keypair,
  BASE_FEE,
  Networks,
  Operation,
  Asset
} = require('stellar-sdk');

const server = new Server('https://horizon-testnet.stellar.org');
const baseFee = BASE_FEE;
const networkPassphrase = Networks.TESTNET;
const faucet = async _publicKey => {
  try {
    await server.friendbot(_publicKey).call();
  } catch (e) {
    console.log(e);
  }
};
```

Trong bài này mình sẽ sử dụng bản **"stellar-sdk": "5.0.3"**
# Thực hành
Trong bài này mình sẽ hướng dẫn các bạn dùng 2 Protocol được đưa đến trong Protocol 13 mà mình thấy khá hữu dụng :
- **Fee Bumps** : Đây là protocol rất hữu ích cho phép người dùng có thể trả phí Transaction cho các tài khoản khác mà không cần can thiệp vào địa chỉ được trả phí.
-  **Claimable Balances** : Protocol này về cơ bản sẽ chia một payment thông thường thành 2 phần bao gồm **Khởi tạo balance** và **Claim balance**. Khởi tạo balance có thể chỉ định trực tiếp người có thể claim balance đó. 

## Xem balance của tài khoản

Đầu tiên để dễ dàng check các protocol thì chúng ta sẽ cần một hàm để kiểm tra balance, trong vũ trụ stellar chúng ta sẽ thấy payment sẽ transfer 2 loại giá trị (**Asset**) được gọi là **native** (lumen) và phần còn lại (Các loại Asset do người dùng tự định nghĩa - với các dev ETH sẽ thấy chúng na ná như ERC20). Trong bài viết này chúng ta sẽ làm việc với Asset native của **Stellar** :

```js
const getNativeBalance = async _publicKey => {
  let account = await server.loadAccount(_publicKey);
  let res = account.balances.find(e => e.asset_type === 'native');
  return res.balance;
};
```

## Fee Bumps

Bài viết này mình sẽ hướng dẫn các bạn sử dụng SDK của Stellar để sử dụng Protocol này còn nếu bạn muốn tìm hiểu rõ hơn về nguyên lý có thể tham khảo qua bài viết : https://medium.com/stellar-community/fee-bump-transactions-explained-9a6a365c0fb6

Mình sẽ viêt code để chia 1 Trx truyền thống thành 2 phần : Khởi tạo Trx và Trả phí Trx:

```js
const createFeeBumpTx = async (_privateKey, _to, _amount) => {
  const keypair = Keypair.fromSecret(_privateKey);
  var innerTx;
  const res = await server.loadAccount(keypair.publicKey()).then(account => {
    innerTx = new TransactionBuilder(account, {
      fee: baseFee,
      networkPassphrase,
      v1: true
    })
      // .addOperation(
      //   Operation.bumpSequence({
      //     bumpTo: '0'
      //   })
      // )
      // .setTimeout(0)
      .addOperation(
        Operation.payment({
          destination: _to,
          // Because Stellar allows transaction in many currencies, you must
          // specify the asset type. The special "native" asset represents Lumens.
          asset: Asset.native(),
          amount: _amount.toString()
        })
      )
      // Wait a maximum of three minutes for the transaction
      .setTimeout(180)
      .build();
    innerTx.sign(keypair);
    return innerTx;
  });
  return res;
};

const submitFeeBumpTrx = async (_privateKey, _trxObj) => {
  console.log(_trxObj);
  const feeSource = Keypair.fromSecret(_privateKey);
  const feeBumpTxn = new TransactionBuilder.buildFeeBumpTransaction(
    feeSource,
    baseFee,
    _trxObj,
    networkPassphrase
  );

  feeBumpTxn.sign(feeSource);
  return server.submitTransaction(feeBumpTxn);
};

```

Đầu tiên với function **createFeeBumpTx** sẽ nhận 3 tham số đầu vào bao gồm:

- **_privateKey** : Privatekey dùng để kí Trx được khởi tạo
- **_to**: Publickey của account sẽ nhận lượng **_amount** lumen
- **_amount** : Lượng lumen được chuyển trong giao dịch

Kết quả trả về sẽ là object của 1 Trx được khởi tạo từ SDK **TransactionBuilder**, các thông tin về địa chỉ gửi và nhận đã được điền đầy đủ. Sau khi hoàn chỉnh chúng ta sẽ sử dụng đến hàm **submitFeeBumpTrx** để submit Trx vừa khởi tạo lên mạng.

```js
const submitFeeBumpTrx = async (_privateKey, _trxObj) => {
  console.log(_trxObj);
  const feeSource = Keypair.fromSecret(_privateKey);
  const feeBumpTxn = new TransactionBuilder.buildFeeBumpTransaction(
    feeSource,
    baseFee,
    _trxObj,
    networkPassphrase
  );

  feeBumpTxn.sign(feeSource);
  return server.submitTransaction(feeBumpTxn);
};
```

Trong hàm này sẽ nhận 2 đối số đầu vào là :
- _privatekey: Dùng để kí Trx
- _trxObj: Đây chính là object được khởi tạo thông qua SDK **TransactionBuilder** phía trên được gửi qua để trả phí

Cuối cùng chạy kết hợp 2 hàm lại để hoàn chỉnh 1 luồng Fee Bump:

```js
createFeeBumpTx(
  'SAIO6VONEI2GY2LD32LECMHTKJYANHTOPBXDSPQ7BEXBMQ3PTI2NJMKN',
  'GATNAV6NZ77OUJ3K26ZBR2POHNVCVEV3VUPV5ATBLBNITWQDQ5BZWQJR',
  100
).then(e => {
  submitFeeBumpTrx('SDEOACSWLLCHBOACI3K6EDAB33XM3JQ4NVG6NVGGTJISCTLVP2WRKVHX', e).then(res =>
    console.log(res)
  );
});
```

Các bạn mở terminal và chạy để xem kết quả nhé :)

## Claimable Balances

Như định nghĩa thì Protocol này cũng sẽ chia một Trx thông thường thành 2 phần gồm **Khởi tạo balance** và **Claim**

```js
async function createClaimable(_privatekey, _publicKey, _amount) {
  const kp = Keypair.fromSecret(_privatekey);
  const kp_public = kp.publicKey();
  await server
    .loadAccount(kp_public)
    .then(account => {
      const transaction = new TransactionBuilder(account, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET
      })
        .addOperation(
          Operation.createClaimableBalance({
            asset: Asset.native(),
            amount: _amount.toString(),
            claimants: [new Claimant(_publicKey)]
          })
        )
        .setTimeout(0)
        .build();

      transaction.sign(kp);

      // return transaction.toXDR()
      return server.submitTransaction(transaction);
    })
    .catch(e => console.error(e));
}

async function claim(_privatekey) {
  const kp = Keypair.fromSecret(_privatekey);
  const kp_public = kp.publicKey();
  try {
    await server.loadAccount(kp_public).then(async account => {
      // await account.claimableBalances() :(

      const { records } = await server.claimableBalances().claimant(account.id).call();

      if (!records.length) return;

      records.map(record => {
        let transaction = new TransactionBuilder(account, {
          fee: BASE_FEE,
          networkPassphrase: Networks.TESTNET
        })
          .addOperation(
            Operation.claimClaimableBalance({
              balanceId: record.id
            })
          )
          .setTimeout(0)
          .build();

        transaction.sign(kp);

        // return transaction.toXDR()
        return server.submitTransaction(transaction);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

```

Đầu tiên hàm **createClaimable** sẽ nhận các đối số đầu vào :
- _privatekey: Dùng để kí Trx
- _publickey: Publickey của địa chỉ sẽ có thể claim balance được khởi tạo
- __amount: Lượng lumen được khởi tạo có thể cho claim

Với hàm này sẽ sử dụng **SDK** Operation khởi tạo balance với đối số **claimants** là publickey của địa chỉ có thể claim Balance này.

Trong hàm **claim** chỉ chưa privatekey của người nhận để có thể tạo Trx Claim. Trong hàm này sẽ có các phần chính là :
- const { records } = await server.claimableBalances().claimant(account.id).call() : Hàm này dùng để query các khoán balance mà tài khoản này được gán (có thể **claim** về được)
- claimClaimableBalance: phần này dùng để claim balance theo balanceId mà đã được query từ phía trên, trong ví dụ này mình sẽ query một loạt toàn bộ các khoản có thể claim được.


Cuối cùng là sẽ phải **submitTransaction** lên mạng Stellar

Và các bạn có thể chạy thử :
```js
createClaimable(
   'SAIO6VONEI2GY2LD32LECMHTKJYANHTOPBXDSPQ7BEXBMQ3PTI2NJMKN',
   'GATNAV6NZ77OUJ3K26ZBR2POHNVCVEV3VUPV5ATBLBNITWQDQ5BZWQJR',
   10
 ).then(e => {
    claim('SDEOACSWLLCHBOACI3K6EDAB33XM3JQ4NVG6NVGGTJISCTLVP2WRKVHX').then(e =>       console.log(e));
 });
```

Lại cùng tự mở terminal lên chạy và cảm nhận nhé !

Phần code mình đã chuẩn bị ở đây các bạn có thể tham khảo qua nhé: 
https://github.com/tranchien2002/lumens
# Tham khảo
- https://developers.stellar.org/docs/glossary/claimable-balance/
- https://developers.stellar.org/docs/glossary/fee-bumps/