Mình luôn thích sự riêng tư, nhưng public blockchain nó không có được sự riêng tư mà mình muốn. Giả như 1 thằng bạn biết địa chỉ Ethereum của mình, nó có thể dễ dàng biết mình hiện có bao nhiêu đồng coin, số lượng bao nhiêu, mình giao dịch như thế nào. Nay vào uniswap add liquidity, mai gửi USDT về Binnace để cashout nó đều có thể biết. Để cắt đuôi thằng bạn khó chịu, mình sẽ dùng Tornado Cash để cắt đứt liên kết nguồn tiền. Catch me if you can ~!

## 1. Giới thiệu

**Tornado Cash** là một giao thức phi tập trung giúp xóa dấu vết giao dịch trên nền tảng Ethereum.

**Lưu ý**: Hiện tại thì Tornado cũng đã có các phiên bản trên **Binnace Smart Chain** và **Polygon**

**Tornado Cash** cải thiện quyền riêng tư của giao dịch bằng cách phá vỡ liên kết trên blockchain giữa địa chỉ nguồn và địa chỉ đích. Logic của **Tornado Cash** được triển khai trên smart contract giúp nhận ETH vào và có thể được rút ra bằng một địa chỉ khác. Không có cách nào để liên kết việc rút tiền với khoản tiền gửi, đảm bảo sự riêng tư hoàn toàn.

## 2. Dùng thử [tornado](https://app.tornado.cash/)

Trong ví dụ này mình sẽ sử dụng trên mạng Goerli Testnet :D

B1: Trước tiên các bạn cần kết nối ví với trang web, có các lựa chọn gửi tiền vào Tornado với các mức cố định từ 0.1 -> 100 ETH

![](https://images.viblo.asia/6263a9e0-c844-4536-9315-8e6d3a19f68f.png)

B2:  Sau khi ấn deposit, app Tornado sẽ tạo cho bạn một mã bí mật **note**, bạn phải lưu mã này lại và **tuyệt đối không được để lộ** cho người khác, vì họ có thể dùng mã này để rút lượng tiền bạn gửi vào Tornado. Ở đây mình đã rút tiền xong rồi và thêm nữa là mạng testnet :D nên cũng không cần che lại làm gì cả

![](https://images.viblo.asia/5c665502-fb08-403b-90b8-83164fdc70a2.png)

B3: Ký giao dịch và xác nhận gửi tiền vào Tornado

![](https://images.viblo.asia/6ac72e24-6292-4ae2-9edc-15050e0189c3.png)

B4: Vậy là đã xong bước gửi tiền, sau đó bạn cứ chờ đợi 1 thời gian rồi hãy rút. Gỉa sử như bạn vào gửi 100 ETH vào contract của Tornado và ngay lập tức rút ra bằng 1 tài khoản khác thì khi tra cứu giao dịch trên [etherscan.io](https://etherscan.io), những kẻ theo dõi sẽ có cơ sở để đoán đấy chính là tài khoản khác của bạn :fearful:

B5: Rút tiền, bạn nhập địa chỉ nhận và mã bí mật **note** đã lưu từ trước. Tornado sẽ xác nhận và gửi lại tiền cho bạn

![](https://images.viblo.asia/32d118e8-dd88-4e62-a96e-cbeae3012f43.png)

B6: Bạn xem lại số dư tài khoản của mình, trong ví dụ này mình gửi vào 0.1 ETH và nhận về 0.0837 ETH. Tất nhiên là Tornado họ sẽ ăn 1 ít hoa hồng khi giúp bạn "rửa" được lượng ETH của mình.

![](https://images.viblo.asia/e612946b-f3cd-423a-b0fe-5b3f75ca1023.png)



## 3. Cơ chế hoạt động

Về cơ bản, quá trình "rửa tiền" qua **Tornado Cash** chia làm 3 giai đoạn
1. Desposit (Gửi tiền): Hệ thống tạo 2 khóa ngẫu nhiên (gọi là **secret** và **nullifier**) từ đó sinh ra **note** cho người dùng lưu lại, sau đó gửi ETH hoặc ERC20 token cùng với giá trị băm của **secret** + **nullifier** (gọi là commitment) đến smart contract của Tornada. Smart contract sẽ thêm **commitment** vào cây **Merke**.
2. Wait (Chờ): Sau khi gửi tiền, người dùng nên đợi một khoảng thời gian trước khi rút tiền để Tornada "xóa dấu vết" nguồn tiền. 
3. Withdraw (Rút tiền): Người dùng gửi bằng chứng (Merkle proof) và  **nullifier** (vẫn giữ bí mật **secret**), contract sẽ xác nhận bằng chứng qua cây **Merkle** và hợp đồng chuyển Ether hoặc ERC20 cho địa chỉ mới của người dùng.

Cơ chế tính toán và xác thực qua **Merkle Tree**, các bạn có thể tham khảo lại bài viết cũ của mình [Merkle Airdrop: Giải pháp Airdrop cho các đợt phát hành token](https://viblo.asia/p/merkle-airdrop-giai-phap-airdrop-cho-cac-dot-phat-hanh-token-vyDZO3EOZwj)

![](https://images.viblo.asia/44c68177-5bbc-4abf-8dbd-ed27cd9dac80.png)

Mã nguồn của smart contract cũng như thuật toán sinh key đều được public trên [Github](https://github.com/tornadocash/tornado-core/tree/master/contracts)

### Quá trình Desposit

Phần giải thích mình sẽ cmt trong code, các bạn có thể tham khảo nha. Các contract, code ở phần dưới minh họa cho quá trình nạp-rút ETH, với các ERC-20 token thì cũng sẽ gần tương tự.

#### 1. Function deposit smart contract

```js
// Tornado.sol

// Tham số truyền vào là commitment (được băm ra từ secret và nullifier)
// Hàm này là hàm payable nên user sẽ gửi ETH vào đây
function deposit(bytes32 _commitment) external payable nonReentrant {
   // Kiểm tra xem commitment đã được submit trước kia hay chưa
    require(!commitments[_commitment], "The commitment has been submitted");
    
    // Thêm commitment vào cây Merkle
    uint32 insertedIndex = _insert(_commitment);
    
    // gán giá trị mapping ghi nhận là commitment đã được submit
    commitments[_commitment] = true;
    
    // Hàm này kiểm tra số ETH gửi vào có đúng như quy định hay không
    /* function _processDeposit() internal {
                require(msg.value == denomination, "Please send `mixDenomination` ETH along with transaction");
      }*/
    _processDeposit();

    emit Deposit(_commitment, insertedIndex, block.timestamp);
}
```

#### 2. Sinh key ở client

**note** trả về cho người dùng sẽ có dạng như thế này: **tornado-eth-0.1-5-0x47ab6a26841774719736602788b0d9d88d62aa743ddc0f2972dd51ca9fe22eda7a962e6e0238597343146fe523cfb664eccb80e13f0b61911981e499f15f**

Từ đây ta có thể đọc được 1 số thông cơ bản là bạn gửi 0.1ETH ở mạng có chainId = 5 vào contract của tornado.

```js
/**
 * Tạo deposit object từ secret và nullifier
 */
function createDeposit({ nullifier, secret }) {
  const deposit = { nullifier, secret }
  deposit.preimage = Buffer.concat([deposit.nullifier.leInt2Buff(31), deposit.secret.leInt2Buff(31)])
  // commitment được băm ra từ secret và nullifier
  deposit.commitment = pedersenHash(deposit.preimage)
  deposit.commitmentHex = toHex(deposit.commitment)
  deposit.nullifierHash = pedersenHash(deposit.nullifier.leInt2Buff(31))
  deposit.nullifierHex = toHex(deposit.nullifierHash)
  return deposit
}

/**
 * Make a deposit
 * @param currency: Symbol của token mà người dùng gửi vào (eth, dai, usdt, ...)
 * @param amount: Số lượng tiền người dùng gửi vào Tornado 
 */
async function deposit({ currency, amount }) {
  // secret và nullifier được random ngẫu nhiên
  const deposit = createDeposit({ nullifier: rbigint(31), secret: rbigint(31) })
  
  const note = toHex(deposit.preimage, 62)
  const noteString = `tornado-${currency}-${amount}-${netId}-${note}`
  console.log(`Your note: ${noteString}`)
  if (currency === 'eth') {
    await printETHBalance({ address: tornado._address, name: 'Tornado' })
    await printETHBalance({ address: senderAccount, name: 'Sender account' })
    const value = isLocalRPC ? ETH_AMOUNT : fromDecimals({ amount, decimals: 18 })
    console.log('Submitting deposit transaction')
    
    // Gọi hàm deposit của contract, gửi kèm theo lượng ETH
    await tornado.methods.deposit(toHex(deposit.commitment)).send({ value, from: senderAccount, gas: 2e6 })
    await printETHBalance({ address: tornado._address, name: 'Tornado' })
    await printETHBalance({ address: senderAccount, name: 'Sender account' })
  } 

  return noteString
}

```

### Withdraw


#### Contract

```js
// Tornado.sol
 
/**
    @param _proof: Bằng chứng
    @param _root: Merkle root của tất cả các commitment
    @param _nullifierHash: mã hash của nullifier
    @param _recipient: Địa chỉ người nhận
    @param _relayer:
    @param _fee: phí giao dịch mà Tornado thu
    @param _refund: với ETH refund = 0 
   */
  function withdraw(bytes calldata _proof, bytes32 _root, bytes32 _nullifierHash, address payable _recipient, address payable _relayer, uint256 _fee, uint256 _refund) external payable nonReentrant {
    // Phí phải bé hơn số tiền rút
    require(_fee <= denomination, "Fee exceeds transfer value");

    // Kiểm tra nullifierHashes trong note submit đã rút tiền bao giờ chưa (tránh double spend)
    require(!nullifierHashes[_nullifierHash], "The note has been already spent");

    require(isKnownRoot(_root), "Cannot find your merkle root"); // Make sure to use a recent one

    // xác nhận bằng chứng
    require(verifier.verifyProof(_proof, [uint256(_root), uint256(_nullifierHash), uint256(_recipient), uint256(_relayer), _fee, _refund]), "Invalid withdraw proof");
    
    // Xác nhận đã rút 
    nullifierHashes[_nullifierHash] = true;

    // gửi tiền về cho người nhận, đã trừ phí giao dịch
    _processWithdraw(_recipient, _relayer, _fee, _refund);
    emit Withdrawal(_recipient, _nullifierHash, _relayer, _fee);
  }
```


## Tài liệu tham khảo

https://github.com/tornadocash/tornado-core

https://tornado.cash/