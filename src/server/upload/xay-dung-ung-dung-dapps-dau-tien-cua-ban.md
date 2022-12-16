![](https://images.viblo.asia/02b263ee-0792-4736-87ff-4a5dbf551250.png)

Tutorial này sẽ giúp bạn xây dựng dapp đầu tiên của bạn – một hệ thống theo dõi chủ nuôi trong một tiệm thú cưng! Được dịch từ [tutorial của Truffle](https://www.trufflesuite.com/tutorials/pet-shop).

Tutorial này yêu cầu:

- Nắm được cơ bản về Ethereum Smart Contract (Hợp đồng thông minh). Bạn có thể tìm hiểu sơ qua [hai chủ đề](https://www.trufflesuite.com/tutorials/ethereum-overview) tại bài viết này hoặc trên google.
- Chút cơ bản về HTML và JavaScript.

Đấy chỉ vậy thôi, bạn có thể biết qua code Solidity và dapp hay mù tịt cũng không sao, chúng ta sẽ đi tìm hiểu một dự án dapp có những bước gì, tutorial này sẽ đồng hành với bạn từ A-Z 🥰.

Trong tutorial này chúng ta sẽ tìm hiểu:

1. Thiết lập môi trường phát triển.
2. Tạo một dự án Truffle sử dụng Truffle Box.
3. Lập trình hợp đồng thông minh - smart contract.
4. Complie và Migrate smart contract.
5. Kiểm thử smart contract.
6. Tạo giao diện người dùng để tương tác với smart contract.
7. Tương tác với dapp qua trình duyệt.

# Đề bài

Chủ cửa hàng thú cưng, Pete Scandlon muốn sử dụng Ethereum để quản lý việc cho nhận nuôi thú cưng. Tình hình là cửa hàng có 16 con, dữ liệu đầy đủ. Trong giai đoạn POC (thử nghiệm), **Pete muốn có một dapp liên kết địa chỉ Ethereum với thú cưng được nhận nuôi**.

Website được cấu trúc và thiết kế ngon lành rồi, việc của chúng ta là **viết smart contract và front-end logic để dùng thôi**.

# Thiết lập môi trường phát triển

[Node.js v8+ LTS and npm](https://nodejs.org/en/)

[Git](https://git-scm.com/)

Bạn có thể tìm hiểu ở các tut khác để cài đặt chúng nhé.

Sau khi cài xong xuôi, ta gõ dòng lệnh này trên terminal để cài Truffle.

```powershell
npm install -g truffle
```

Để kiểm tra Truffle được cài không gặp vấn đề gì, bạn có thể gõ `truffle version` trên terminal. Nếu thấy báo lỗi, bạn xem lại npm module đã được thêm vào path của bạn chưa.

Và ta cũng sẽ dùng [Ganache](https://www.trufflesuite.com/ganache), một blockchain cá nhân dùng để triển khai smart contract, phát triển ứng dụng và chạy kiểm thử trên Ethereum.

Để tải Ganache, truy cập [http://truffleframework.com/ganache](http://truffleframework.com/ganache) và chọn `Download`.

**Chú ý:** Nếu bạn đang phát triển ở môi trường không có giao diện đồ hoạ, bạn có thể dùng `Truffle Develop`, blockchain cá nhân có sẵn trong Truffle, thay thế cho `Ganache`. Bạn sẽ phải thay đổi một số cài đặt—như là port mà blockchain chạy trên đó—để phù hợp với tutorial này.

# Tạo dự án Truffle sử dụng Truffle Box

1. Tạo một directory trong thư mục bạn chọn và rồi vào trong.

```powershell
mkdir pet-shop-tutorial
cd pet-shop-tutorial
```

2. Tạo một [Truffle Box](https://www.trufflesuite.com/boxes) đặc biệt chỉ dành cho tutorial này có tên là `pet-shop`, nó tự tạo cấu trúc project và code giao diện người dùng cho bạn, bởi vì trong tutorial này ta không cần quan tâm tới nhiều tới chúng, tập trung vào chuyên môn. Lệnh như sau:

```powershell
truffle unbox pet-shop
```

**Chú ý:** Truffle có thể khởi tạo bằng nhiều cách khác nhau. Một lệnh khởi tạo hay dùng là `truffle init`, nó tạo cho bạn một dự án Truffle trống, không có code contract có sẵn trong đó. Để biết thêm chi tiết, vui lòng tìm hiểu thêm tại [Tạo một dự án](https://www.trufflesuite.com/docs/truffle/getting-started/creating-a-project).

## Cấu trúc thư mục

Cấu trúc Truffle mặc định bao gồm:

- **`contracts/`**: Chứa file nguồn [Solidity](https://solidity.readthedocs.io/) của smart contract. Một hợp đồng khá quan trọng ở đây có tên là **`Migrations.sol`**, ta sẽ bàn sau.
- **`migrations/`**: Truffle dùng một hệ thống migration để xử lý việc triển khai smart contract. Migration là một hợp đồng thông minh đặc biệt để theo dõi các sự thay đổi.
- **`test/`**: chứa các bản kiểm thử bằng JavaScript hoặc Solidity.
- **`truffle-config.js`**: File cấu hình Truffle.

Truffle Box `pet-shop` còn các file và folder khác, nhưng cứ kệ nó đấy đã, tập trung vào chuyên môn 😉.

# Viết hợp đồng thông minh

Đây đây phần chuyên môn đây 😘, chúng ta sẽ viết hợp đồng thông minh làm nhiệm vụ back-end logic và lưu trữ.

1. Tạo một file mới có tên `Adoption.sol` trong `contracts/`
2. Nội dung file như sau:

```jsx
pragma solidity ^0.5.0;
	contract Adoption {
}
```

➡️ Phân tích:

- Phiên bản tối thiểu cần thiết của Solidity để ở dòng đầu tiên của hợp đồng: `pragma solidity ^0.5.0;`. `pragma` nghĩa là “*cái này là để cho compiler*”, còn ký hiệu mũ (^) nghĩa là “*phiên bản này hoặc cao hơn*”
- Cuối mỗi lệnh có dấu chấm phẩy, **bắt buộc** nhó 🙃.

## Thiết lập các biến

Solidity là ngôn ngữ kiểu biến tĩnh, tức là kiểu dữ liệu như chuỗi, số nguyên hay mảng phải khai báo rõ ràng, không loạn xì ngậu như JavaScript được 😑. **Solidity có một kiểu đặc biệt là `address`**. `Address`là địa chỉ Etherum, lưu dưới dạng giá trị 20 byte. Mỗi tài khoản và hợp đồng thông minh trên Ethereum blockchain đều có một địa chỉ có thể gửi và nhận Ether bằng cái địa chỉ này.

1. Khai báo biến vào dòng kế tiếp dòng `contract Adoption {`

```jsx
address[16] public adopters;
```

Phân tích:

- Ta định nghĩa một biến `adopters`. Đây là một mảng chứa các giá trị cùng kiểu dữ liệu và có độ dài cố định, hoặc cũng có thể thay đổi. Trong trường hợp này, kiểu dữ liệu là `address` và độ dài là `16`.
- Còn cái từ `public`. Biến **public** (công khai) là biến tự động được cung cấp phương thức get, nhưng trong trường hợp của mảng, từ khoá này là bắt buộc và chỉ trả lại một giá trị trong mảng dựa vào chỉ số truyền vào. Tí nữa ta sẽ viết hàm trả lại cả mảng để dùng cho UI.

## Hàm đầu tiên: Nhận nuôi một thú cưng

Hãy để người dùng có thể yêu cầu nhận nuôi.

1. Thêm hàm sau vào contract sau khi ta đã khai báo biến ở trên.

```jsx
// Adopting a pet
function adopt(uint petId) public returns (uint) {
	require(petId >= 0 && petId <= 15);
	adopters[petId] = msg.sender;
	return petId;
}
```

Phân tích:

- Hàm được khai báo bằng từ khoá `function`, theo sau là tên hàm. Trong Solidity, tham số truyền vào và kết quả trả về phải được khai kiểu dữ liệu rõ ràng. Ở ví dụ trên, hàm có tên `adopt`, tham số truyền vào và kết quả trả về là `uint`(một số nguyên không âm).
- Chúng ta kiểm tra để đảm bảo `petId` không bị tràn khỏi mảng `adopters`. Mảng trong Solidity bắt đầu từ 0, nên giá trị ID phải nằm trong đoạn 0 đến 15. Ta dùng `require()` để đảm bảo ID nằm trong đoạn trên.
- Nếu điều kiện trên thỏa mãn thì ta sẽ cho **địa chỉ chủ nhân của thú cưng có ID này bằng địa chỉ của người gọi tới hàm này** (`msg.sender`).
- Cuối cùng, ta trả về `petId` để xác nhận.

## Hàm thứ hai: Liệt kê các chủ nhân

Như đã nói ở trên, hàm get mảng chỉ trả về một giá trị từ chỉ số truyền vào. UI của chúng ta cần phải update tình trạng có chủ/vô chủ của tất cả các con thú, nhưng gọi 16 API liền thì nghe hơi tù 😢. Vậy nên, bước tiếp theo ta sẽ viết một hàm trả về cả mảng.

1. Thêm hàm `getAdopters()` vào hợp đồng, ngay sau hàm `adopt()` ta vừa thêm ở trên

```jsx
// Retrieving the adopters
function getAdopters() public view returns (address[16] memory) {
	return adopters;
}
```

Phân tích:

- Vì `adopters` đã được khai báo, ta chỉ cần trả nó về. Nhớ là phải ghi rõ kiểu dữ liệu trả về (trong trường hợp này là kiểu dữ liệu cho `adopters`) là `address[16] memory`. `memory` chỉ ra vị trí lưu dữ liệu của biến.
- Từ khóa `view` trong hàm chỉ ra rằng hàm này không chỉnh sửa state của hợp đồng. Bạn có thể tìm thêm tại [đây](https://solidity.readthedocs.io/en/latest/contracts.html#view-functions).

# Compile và Migrate hợp đồng

Giờ thì ta đã viết xong hợp đồng thông minh, save chúng, bước tiếp theo là Compile (biên dịch) và Migrate (di chuyển) nó. Mình không dịch hai từ này ra vì nghe nó hơi kỳ kỳ 😉.

## Compile

Solidity là ngôn ngữ biên dịch, tức là ta cần phải biên dịch Solidity ra thành bytecode cho Máy Ảo Ethereum (EVM) thực thi. Kiểu như dịch từ Solidity do người viết cho thằng EVM nó hiểu ấy.

1. Trong terminal, đảm bảo rằng bạn đang ở root chứa dapp, gõ lệnh:

```powershell
truffle compile
```

**Chú ý:** Nếu bạn đang dùng Win mà có vấn đề khi chạy lệnh này, thử đọc qua ở đây [xem](https://www.trufflesuite.com/docs/truffle/reference/configuration#resolving-naming-conflicts-on-windows).

Kết quả sẽ có dạng như sau:

```powershell
Compiling your contracts...
===========================
> Compiling ./contracts/Adoption.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /Users/cruzmolina/Code/truffle-projects/metacoin/build/contracts
> Compiled successfully using:
- solc: 0.5.0+commit.1d4f565a.Emscripten.clang
```

## Migrate

Giờ thì chúng ta đã biên dịch hợp đồng xong, đến lúc di chuyển chúng lên blockchain!

Quá trình Migrate (di chuyển) là một đoạn kịch bản triển khai làm thay đổi trạng thái hợp đồng của ứng dụng, chuyển nó từ trạng thái này sang trạng thái tiếp theo. Lần migrate đầu tiên, bạn có lẽ chỉ deploy code mới tinh, nhưng lâu về sau có thể là migrate dữ liệu hoặc thay thế một hợp đồng mới hoàn toàn.

Chú ý: Đọc thêm về migration tại [Truffle documentation](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations).

Bạn sẽ thấy một file JavaScript đã có ở thư mục `migrations/`: `1_initial_migration.js`. Nó sẽ deploy hợp đồng `Migrations.sol` để quan sát các sự di chuyển của các hợp đồng sau, đảm bảo rằng ta không migrate trùng lặp hợp đồng trong tương lai.

Giờ thì ta sẽ tạo kịch bản di chuyển.

1. Tạo một file tên `2_deploy_contracts.js` ****trong **`migrations/`**.
2. Thêm code sau vào trong file `2_deploy_contracts.js`.

```jsx
var Adoption = artifacts.require("Adoption");
module.exports = function(deployer){
  deployer.deploy(Adoption);
};
```

3. Sau đó ta sẽ di chuyển contract lên blockchain, nhưng trong tutorial này, chúng ta sẽ sử dụng [Ganahe](https://www.trufflesuite.com/ganache), một blockchain cá nhân phát triển Ethereum mà ta có thể sử dụng để deploy hợp đồng, phát triển ứng dụng và chạy test. Nếu bạn chưa cài, hãy [tải Ganache](https://www.trufflesuite.com/ganache) và khởi động ứng dụng. Nó sẽ tạo ra một blockchain chạy local trên cổng 7545.

**Note:** Đọc thêm về Ganache ở [Truffle Documentation](https://www.trufflesuite.com/docs/ganache/using).

![](https://images.viblo.asia/7c674da9-341e-4e41-823d-dc838bb9925e.png)

Ganache lần đầu mở

Mở ứng dụng và để đó thôi, tạm thời ta chưa đả động tới.

1. Quay trở lại terminal, di chuyển hợp đồng lên blockchain.

```powershell
truffle migrate
```

Sau một lúc chạy, kết quả sẽ na ná như sau:

```powershell
1_initial_migration.js
======================
      Deploying 'Migrations'
     ----------------------
			> transaction hash:    0x3b558e9cdf1231d8ffb3445cb2f9fb01de9d0363e0b97a17f9517da318c2e5af
			> Blocks: 0            Seconds: 0> contract address:    0x5ccb4dc04600cffA8a67197d5b644ae71856aEE4
			> account:             0x8d9606F90B6CA5D856A9f0867a82a645e2DfFf37
			> balance:             99.99430184
			> gas used:            284908
			> gas price:           20 gwei
			> value sent:          0 ETH
			> total cost:          0.00569816 ETH
			
			
			> Saving migration to chain.
			> Saving artifacts
     -------------------------------------
			> Total cost:          0.00569816 ETH
2_deploy_contracts.js
=====================
      Deploying 'Adoption'
			.............................
			.............................
```

Như trên, bạn có thể thấy các migration (sự di chuyển) được thực hiện theo thứ tự, kèm theo là vài thông tin liên quan đến nó. (Thông tin migration của bạn thì sẽ có chút khác).

1. Trong Ganache, để ý rằng state của blockchain đã thay đổi. Blockchain giờ đang hiện block hiện tại, lúc trước là `0`, giờ là `4`. Thêm vào đó, tài khoản đầu tiên lúc đầu có 100 ether, giờ đã bị tụt đi vì phí giao dịch sau khi chuyển contract lên blockchain. Giờ thì bạn hiểu tại sao ta phải dùng blockchain cá nhân rồi đó, bởi nếu lên blockchain thật thì mọi sai lầm đều phải trả giá bằng ether 😢. Chúng ta sẽ nói về phí giao dịch sau.

![](https://images.viblo.asia/64f6c19b-8c21-4671-bbc0-d7089fece6d3.png)

Ganache sau khi migrate

Chúc mừng bạn đã code xong smart contract đầu tiên và deploy nó trên một blockchain cục bộ. Giờ thì đến lúc vọc nó để xem nó chạy đúng như ta nghĩ không.

# Kiểm thử smart contract bằng JavaScript

Truffle khá là linh hoạt với vụ chạy kiểm thử hợp đồng, test ta có thể viết cả bằng JS lẫn Solidity. Trong tut này, ta sẽ viết test bằng JS nhờ thư viện Chai và Mocha. Giải thích ngắn gọn vụ test này thôi nhé, bạn có thể nhìn code nghiền ngẫm thêm.

1. Tạo một file mới `testAdoption.test.js` trong `**test/**`.
2. Thêm nội dung sau vào file `testAdoption.test.js`:

```jsx
const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
 let adoption;
 let expectedPetId;

 before(async () => {
     adoption = await Adoption.deployed();
 });

 describe("adopting a pet and retrieving account addresses", async () => {
   before("adopt a pet using accounts[0]", async () => {
     await adoption.adopt(8, { from: accounts[0] });
     expectedAdopter = accounts[0];
   });
 });
});
```

Ta bắt đầu viết hợp đồng bằng cách import:

- **`Adoption`**: Hợp đồng ta muốn test. Ta bắt đầu kiểm thử bằng cách import hợp đồng **`Adoption`** nhờ **`artifacts.require`**.

**Note**: Khi viết test này, hàm callback nhận vào tham số **`accounts`**. Nhờ vậy mà ta sẽ có danh sách các tài khoản có trên mạng lưới khi dùng bản kiểm thử này.

Sau đó, ta sử dụng **`before`** để cung cấp thiết lập ban đầu gồm:

- Nhận nuôi một thú cưng có id 8 và cho tài khoản đầu tiên trong các tài khoản trên mạng lưới.
- Hàm này sau đó sẽ kiểm tra xem `petId:8` có đúng là được nhận nuôi bởi `accounts[0]` không.

## Kiểm thử hàm adopt

Để kiểm thử hàm `adopt`, nhớ là nó nếu thành công sẽ trả về `adopter` ****đã cho trước. Ta phải đảm bảo rằng adopter của petId đã cho được trả về và so sánh với `expectedAdopter` trong hàm `adopt`.

1. Thêm hàm sau trong file `testAdoption.test.js`, bên dưới đoạn code `before`.

```jsx
describe("adopting a pet and retrieving account addresses", async () => {
 before("adopt a pet using accounts[0]", async () => {
   await adoption.adopt(8, { from: accounts[0] });
   expectedAdopter = accounts[0];
 });

 it("can fetch the address of an owner by pet id", async () => {
   const adopter = await adoption.adopters(8);
   assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be the first account.");
 });
});
```

Phân tích nè:

- Ta gọi method hợp đồng có tên `adopters` để xem địa chỉ người chủ của thú cưng có petId 8.
- Trfffle import `Chai` cho người dùng nên ta có thể sử dụng hàm `assert`. Ta truyền giá trị thực tế `adopter`, giá trị mong muốn `expectedAdopter` và một tin nhắn báo lỗi (sẽ được in ra console nếu test không qua) vào hàm `assert.equal()`.

## Kiểm thử hàm liệt kê danh sách người chủ

Vì mảng chỉ trả về một giá trị với chỉ số truyền vào, ta phải tạo hàm lấy cả dãy.

1. Thêm hàm vào dưới hàm vừa thêm ban nãy trong file `testAdoption.test.js`.

```jsx
it("can fetch the collection of all pet owners' addresses", async () => {
 const adopters = await adoption.getAdopters();
 assert.equal(adopters[8], expectedAdopter, "The owner of the adopted pet should be in the collection.");
});
```

Vì `adopters` là một mảng địa chỉ người nhận nuôi có chỉ số là petId tương ứng, ta so sánh địa chỉ có chỉ số 8 với địa chỉ ta hi vọng là đúng.

## Chạy kiểm thử

1. Quay lại terminal, chạy kiểm thử:

```powershell
truffle test
```

2. Nếu test qua hết, bạn sẽ thấy màn hình console na ná thế này:

```powershell
Using network 'development'.

   Compiling your contracts...
   ===========================
   > Compiling ./test/TestAdoption.sol
   > Artifacts written to /var/folders/z3/v0sd04ys11q2sh8tq38mz30c0000gn/T/test-11934-19747-g49sra.0ncrr
   > Compiled successfully using:
      - solc: 0.5.0+commit.1d4f565a.Emscripten.clang

     TestAdoption
       ✓ testUserCanAdoptPet (91ms)
       ✓ testGetAdopterAddressByPetId (70ms)
       ✓ testGetAdopterAddressByPetIdInArray (89ms)

     3 passing (670ms)
```

# Tạo giao diện người dùng để tương tác với hợp đồng thông minh

Nãy giờ ta đã tạo xong smart contract, deploy nó vào blockchain cá nhân, test và xác nhận ta có thể tương tác với nó thông qua console, bây giờ thì tạo UI để Pete (thằng chủ) có cái mà dùng cho cái tiệm thú cưng của ổng.

Truffle Box `pet-shop` đã có sẵn code cho front-end, nằm trong `**src/**`.

Front-end không dùng build system như webpack, grunt,... để cho dễ tiếp cận. Cấu trúc app cũng có sẵn, giờ thì chúng ta sẽ chơi trò điền vào ô trống những hàm chỉ Ethereum mới có. Nhờ vậy, bạn có thể dùng kiến thức này để áp dụng vào front-end của riêng mình.

## Thư viện web3

1. Mở `/src/js/app.js` trong IDE.
2. Ngắm nghía file. Để ý là có một object `App` toàn cục dùng để quản lý ứng dụng của ta, tải dự liệu thú cưng trong `init()` và rồi gọi hàm `initWeb()`. [Thư viện web3 JavaScript](https://github.com/ethereum/web3.js/) tương tác với blockchain Ethereum. Nó có thể đọc các tài khoản user, gửi giao dịch, tương tác với hợp đồng thông minh và nhiều nữa.
3. Xóa comment trong `initWeb3` và thay nó bằng:

```jsx
// Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);
```

Phân tích:

- Đầu tiên, ta kiểm tra user dùng trình duyệt dapp xịn hay đã cài [MetaMask](https://github.com/MetaMask) , một extension "tiêm" `ethereum` provider vào object `window`. Nếu có, ta dùng nó để tạo web3 object, nhưng ta cũng cần yêu cầu truy cập công khai tới tài khoản bằng `ethereum.enable()`.
- Nếu object `ethereum` không tồn tại thì ta kiểm tra instance `web`. Nếu nó tồn tại thì chứng tỏ ta đang dùng trình duyệt dapp cũ (như [Mist](https://github.com/ethereum/mist) hay phiên bản cũ của MetaMask). Nếu đúng là vậy, ta lấy và dùng provider của nó để tạo object `web3` của chúng ta.
- Nếu không thấy instance `web3`, ta tạo web3 dựa trên local provider của ta. (Fallback liên tục như thế này lúc phát triển thì không sao, nhưng nó không an toàn và thích hợp khi lên production.)

### Tạo instance cho hợp đồng

Giờ thì ta có thể tương tác với Ethereum qua web3, ta cần phải tạo instance cho hợp đồng để web3 biết hợp đồng ở đâu và dùng thế nào. Truffle có một thư viện xử lý vụ này có tên `@truffle/contract`. Nó giữ cho thông tin của hợp đồng đồng bộ với migration, nên bạn không cần phải thay đổi địa chỉ đã deploy của hợp đồng bằng cách thủ công.

1. Vẫn ở trong `/src/js/app.js`, xóa comment trong `initContract`và thay nó bằng dòng sau:

```jsx
$.getJSON('Adoption.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with @truffle/contract
  var AdoptionArtifact = data;
  App.contracts.Adoption = TruffleContract(AdoptionArtifact);

  // Set the provider for our contract
  App.contracts.Adoption.setProvider(App.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
  return App.markAdopted();
});
```

Phân tích:

- Đầu tiên ta lấy file artifact cho hợp đồng. Artifact là những thông tin về hợp đồng như địa chỉ và ABI của nó. ABI (giao diện nhị phân ứng dụng) là một object JavaScript xác định cách để tương tác với hợp đồng, gồm các biến, hàm và tham số của chúng.
- Có artifact ở hàm callback rồi, ta truyền chúng vào `TruffleContract()`. Nó sẽ tạo ra một instance của hợp đồng để ta tương tác.
- Với hợp đồng đã được tạo instance, ta đặt provider web3 của nó bằng giá trị `App.web3Provider` ta vừa lưu vừa nãy khi thiết lập web3.
- Rồi ta gọi hàm `markAdopted()` của app trong trường hợp có thú cưng đã được nhận nuôi từ trước. Ta gói nó ở hàm riêng vì ta còn phải cần cập nhật giao diện mỗi lần ta thay đổi dữ liệu data.

### Lấy danh sách thú cưng đã được nhận nuôi và cập nhật giao diện

1. Vẫn trong `/src/js/app.js`, xóa comment trong `markAdopted` và thay bằng dòng sau:

```jsx
var adoptionInstance;

App.contracts.Adoption.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.getAdopters.call();
}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
```

Phân tích:

- Ta truy cập hợp đồng `Adoption`, rồi gọi tiếp `getAdopters()`.
- Ta khai báo biến `adoptionInstance` bên ngoài để có thể dùng nó sau khi lần đầu gán giá trị.
- Sau khi gọi `getAdopters()`, ta cho duyệt cả mảng, kiểm tra xem thú cưng nào có địa chỉ chủ nhân chưa. Vì mảng chứa kiểu dữ liệu address, Ethereum sẽ gán chúng giá trị mặc định là 16 địa chỉ rỗng. Thế nên ta mới kiểm tra một chuỗi địa chỉ trống chứ không phải null hay giá trị false.
- Khi thấy petId tồn tại địa chỉ chủ nhân tương ứng, ta sẽ vô hiệu hóa nút nhận nuôi nó và chuyển thành nút có chữ "Success", để người dùng có thể gửi feedback.
- Lỗi sẽ được in lên màn hình console.

### Xử lý hàm adopt() nhận nuôi thú cưng

1. Vẫn ở `/src/js/app.js`, xóa comment trong `handleAdopt` và thay bằng dòng sau:

```jsx
var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    // Execute adopt as a transaction by sending account
    return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    return App.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
```

Phân tích:

- Ta dùng web3 để lấy tài khoản của người dùng. Trong callback sau khi kiểm tra lỗi, ta sẽ chọn tài khoản đầu tiên.
- Từ đó, ta làm như vừa nãy, lưu instance của hợp đồng vào biến `adoptionInstance`. Tuy nhiên lần này, ta sẽ phải gửi một giao dịch thay vì một call. Giao dịch yêu cầu một địa chỉ "from" và một phí liên quan. Phí này trả bằng ether, được gọi là gas. Phí gas là phí trả cho tính toàn hoặc lưu trữ dữ liệu trong một hợp đồng. Ta gửi giao dịch bằng cách chạy hàm `adopt()` kèm ID của pet và một object chứa địa chỉ tài khoản mà ta vừa lưu ban nãy ở biến `account`.
- Kết quả của việc gửi một giao dịch là một object giao dịch. Nếu không có lỗi, ta tiếp túc gọi hàm  `markAdopted()` để đồng bộ giao diện với dữ liệu mới.

## Tương tác với dapp trên trình duyệt

Giờ thì sẵn sàng sử dụng dapp của chúng ta!

### Cài và cấu hình MetaMask

Cách dễ nhất để tương tác với dapp là thông qua [MetaMask](https://metamask.io/), một tiện ích mở rộng trên cả trình duyệt Chrome, FireFox và Microsoft Edge.

1. Cài MetaMask phù hợp với trình duyệt của bạn qua link trên.
2. Khi cài xong, một tab mở ra ở trình duyệt hiển thị như sau:

![](https://images.viblo.asia/6c458898-0f19-4b59-91b8-a66e1bb12aa8.png)


Chào mừng đến với MetaMask

3. Sau khi click **Get started**, bạn sẽ thấy màn hình MetaMask đầu tiên. Chọn **Import Wallet**.

![](https://www.trufflesuite.com/img/tutorials/pet-shop/metamask-initial.png)


4. Tiếp theo bạn có thể thấy màn hình yêu cầu đánh giá ẩn danh. Đồng ý hoặc từ chối.

![](https://www.trufflesuite.com/img/tutorials/pet-shop/metamask-analytics.png)

5. Trong box **Wallet Seed**, nhập mnemonic hiển thị trong Ganache.

Không dùng mnemonic này ở mainnet. Bạn gửi ETH cho tài khoản nào tạo từ mnemonic này ngang với vứt tiền xuống vực.

Nhập password (tùy bạn) và chọn OK.

![](https://www.trufflesuite.com/img/tutorials/pet-shop/metamask-seed.png)

6. Nếu mọi bước đều ổn, MetaMask sẽ hiển thị màn hình như sau. Chọn **All Done**.

![](https://www.trufflesuite.com/img/tutorials/pet-shop/metamask-congratulations.png)

7. Ta cần kết nối MetaMask tới blockchain tạo bởi Ganache. Chọn menu hiện "Main Network" và chọn **Custom RPC**.

![](https://www.trufflesuite.com/img/tutorials/pet-shop/metamask-networkmenu.png)

8. Trong box mới, nhập "New Network", http://127.0.0.1:7545, 1337 như sau và chọn **Save**.

![](https://images.viblo.asia/fd385d2d-1b66-4ed5-9892-6db40fbcac3d.png)


Tạo xong network mới sẽ tự được chọn.

9. Click nút X bên góc phải trên cùng để đóng cửa sổ và quay lại cửa sổ Account.

Mỗi tài khoản tạo bởi Ganache được cho 100 ether. Bạn sẽ thấy tài khoản đầu hơi bị hụt hơn trước vì khi deploy và test contract ta đã tốn một khoảng gas nho nhỏ.

Cấu hình giờ đã xong.

### Cài đặt và cấu hình lite-server

Giờ ta có thể khởi động một web server cục bộ và sử dụng dapp. Ta dùng thư viện `lite-server` để phục vụ file tĩnh. Nó đi kèm với Truffle Box `pet-shop`, nhưng tạm để đó và ngó qua cách nó hoạt động đã.

1. Mở `bs-config.json` ở thư mục gốc của dự án lên xem nội dung:

```jsx
{
  "server": {
    "baseDir": ["./src", "./build/contracts"]
  }
}
```

Nó cho `lite-server` biết file nào cho vào base directory của chúng ta. Ta đã thêm thư mục `./src` của file website và `./build/contracts` của các hợp đồng.

Ta cũng thêm lệnh `dev` vào `scripts` trong file `package.json` trong thư mục gốc. `scripts` cho phép chúng ta gán lệnh console vào một lệnh npm. Trong trường hợp này ta chỉ gán một lệnh đơn giản, nhưng ta còn có thể cấu hình chi tiết hơn. `scripts` của bạn sẽ như sau:

```jsx
"scripts": {
  "dev": "lite-server",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

Nó cho npm biết nên thực thi cài đặt `lite-server` khi ta chạy lệnh `npm run dev` từ console.

## Sử dụng dapp

1. Khởi động web server cục bộ:

```jsx
npm run dev
```

dev server sẽ chạy và tự động mở một cửa sổ trình duyệt mới chứa dapp của bạn.

![](https://www.trufflesuite.com/img/tutorials/pet-shop/dapp.png)

Cửa hàng thú cưng của Pete

2. Một cửa sổ pop-up MetaMask sẽ xuất hiện yêu cầu bạn xác nhận cho Cửa hàng thú cưng của Pete kết nối với ví MetaMask của bạn. Nếu không xác nhận, bạn sẽ không thể tương tác với dapp. Chọn **Connect**.

 

![](https://www.trufflesuite.com/img/tutorials/pet-shop/metamask-transactionconfirm.png)

MetaMask yêu cầu xác nhận

3. Để sử dụng dapp, chọn nút **Adopt** ở thú cưng bạn thích.

4. Bạn sẽ tự động được thông báo xác nhận giao dịch bằng MetaMask. Chọn **Submit** để xác nhận giao dịch.

![](https://www.trufflesuite.com/img/tutorials/pet-shop/metamask-transactionconfirm.png)

Ví dụ một giao dịch nhận nuôi thú cưng

5. Bạn sẽ thấy nút bên cạnh con thú cưng đã được nhận nuôi chuyển sang thành **Success** và bị vô hiệu hoá, đúng như những gì ta đã tính toán, vì con thú giờ đã có chủ.

![h](https://www.trufflesuite.com/img/tutorials/pet-shop/dapp-success.png)

Nhận nuôi thành công

**Chú ý**: Nếu button không tự động chuyển thành "Success", bạn thử tải lại app nhé.

Và trong MetaMAsk, bạn sẽ thấy giao dịch được liệt kê:

![](https://www.trufflesuite.com/img/tutorials/pet-shop/metamask-transactionsuccess.png)

Giao dịch MetaMask

Bạn cũng sẽ thấy giao dịch tương tự được liệt kê trong Ganache ở phần "Transactions".

Okay vậy là xong! Bạn đã có một bước tiến lớn trên con đường trở thành một dev dapp chính thức. Đừng quá bối rối nếu có những phần trong tutorial bạn còn lơ mơ nhé, đây là một tutorial khái quát quá trình phát triển một dapp, bạn sẽ biết mình cần bổ sung cho mình những kiến thức gì.

Và nếu bạn còn muốn làm dapp có thể công khai khoe với bạn bè, có người dùng, cùng chờ đón những tutorial mình dịch sắp tới nhé :kissing_heart:.
## Nguồn
[www.trufflesuite.com/tutorials/pet-shop](https://www.trufflesuite.com/tutorials/pet-shop)