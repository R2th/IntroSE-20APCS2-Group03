**Trong công nghệ phần mềm, việc kiểm thử là vô cùng quan trọng, nó đảm bảo thành công của sản phẩm phần mềm cũng như là một chuẩn để đánh giá chất lượng của phẩn mềm. Bên cạnh đó với sự phát triển mạnh mẽ của công nghệ Blockchain và đặc biệt là các smartcontract của ETH thì việc kiểm thử trở nên vô cùng quan trọng vì những smartcontract này chỉ deploy một lần duy nhất, không thể bảo trì như những sản phẩm phần mềm khác. Do đó đòi hỏi những nhà kiểm thử phải vô cùng chú ý, cẩn thận. Bài viết này mình sẽ giới thiệu một trong những phương pháp kiểm thử cơ bản nhất : Kiểm thử đơn vị (unit testing)**



![](https://images.viblo.asia/c405da0b-403a-4082-bebd-bdb65f521cd0.png)
    
# Cài đặt môi trường
Đây là những thứ để có một buổi training unit test thành công
```
-Truffle v4.1.14
-Nodejs v8.10.0
-Ethereumjs-testrpc
-Web3.js 1.0
```
Tất nhiên là chúng ta cũng sẽ phải có thử để test nữa. Lần này mình sẽ sử dụng contract Voting của serries ["Hướng dẫn viết và deploy Dapp với Solidity nhanh gọn cho người mới bắt đầu" ](https://viblo.asia/p/huong-dan-viet-va-deploy-dapp-voi-solidity-nhanh-gon-cho-nguoi-moi-bat-dau-phan-1-bJzKmgaXl9N) của [Hiệu Nguyễn](https://viblo.asia/u/Raku54).
Các bạn cài đặt contract và sẽ có một project tương đối hoàn chỉnh

![](https://images.viblo.asia/3ead3cbc-242a-4268-91ff-a96918ccd364.png)

Trong bài viết này mình sẽ sử dụng async/await để viết unit test, do đó để chắc chắn thì các bạn cần sửa đổi thêm một chút ở file truffle.js để có thể dùng ES6
```js
// Allows us to use ES6 in our migrations and tests.
require('babel-register')
require('babel-polyfill')
module.exports = {
  networks: {
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
}

```
# Khai báo contract và khởi tạo bộ test
Đây sẽ là contract mà chúng ta sẽ bổ ra để viết unit test cho nó
```js
pragma solidity ^0.4.18;
// Chúng ta phải chỉ ra version của compiler cho code của contract

contract Voting {
  /* trường mapping phía dưới tương đương với một associative array, lưu dữu liệu
  theo cấu trúc (key => value). Theo đó key của mapping được lưu trữ dưới dạng bytes32 
  dùng để lưu tên của ứng cử viên, còn value được lưu trữ dưới dạng unsigned integer dùng 
  để lưu số phiêu của ứng cử viên: votesReceived[key] = value
  */
  
    mapping (bytes32 => uint8) public votesReceived;
    
    /* Solidity chưa cho phép chuyền vào mảng của strings trong constructor. Do đó
    chúng ta sử dụng mảng bytes32 để lưu trữ danh sách ứng cử viên
    */
    
    bytes32[] public candidateList;
    
    /* Đây là constructor được gọi duy nhất một lần khi deploy contract lên blockchain.
    Khi deploy contract, chúng ta chuyền vào danh sách ứng cử viên. Lưu ý từ phiên bản
    solidity ^0.4.22 mọi constructor sẽ được khai báo bằng cú pháp "constructor(arg)"
    */
    function Voting(bytes32[] candidateNames) public {
        candidateList = candidateNames;
    }

    // Đây là hàm trả về tổng lượng vote cho ứng cử viên tương ứng tính tới thời điểm hiện tại.
    function totalVotesFor(bytes32 candidate) view public returns (uint8) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    // Hàm bỏ phiếu sẽ tăng 1 vào tổng số phiếu của ứng cử viên tương ứng với tham số
    // truyền vào.
    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }
    
    // Hàm kiểm tra tính hiệu lực của ứng cử viên bằng cách search từ danh sách ứng cử viên
    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
```

(Nguồn : [Huong dan viet và deploy dapp](https://viblo.asia/p/huong-dan-viet-va-deploy-dapp-voi-solidity-nhanh-gon-cho-nguoi-moi-bat-dau-phan-1-bJzKmgaXl9N))



> Ta sẽ tạo thêm một file test voting.js cho project trong folder **test/** :
> 

![](https://images.viblo.asia/5c75306b-b393-41a2-ac23-cacf29c439ea.png)

Đầu tiên sẽ khởi tạo để lấy những thông số trừu tượng (ABI) của contract Voting
```js
const Voting = artifacts.require('./Voting.sol');
```
Tiếp theo là tạo ra một function contract() - nó cũng tương tự như describe trong Mocha hay R-spec, ngoại trừ trong truffle sẽ đảm bảo rằng contract được gọi đã được deploy trước khi chạy vào bộ test:
```js
const Voting = artifacts.require('./Voting.sol');
contract('Voting', function(account){})
```
Đối số account truyền vào có thể sẽ làm các bạn hơi bối rối, tuy nhiên mình sẽ giải thích xem nó là gì ở những bước tiếp theo 
Ở bước tiếp theo chúng ta sẽ tạo một thực thể cho contract Voting để testing
```js
const Voting = artifacts.require('./Voting.sol');

contract('voting', function(account){
    let voting;
    before('Set up contract for each test', async () => {
        voting = await Voting.new(['Dog', 'Cat', 'Duck']);
        console.log(account[0]); 
    })
})
```

Với những bạn đã quen sử dụng Mocha hoặc những framework unit test khác hẳn sẽ cũng tự biết về keyword **before**. Mình thường sử dụng 2 keyword chính như **before** và **beforeEach**. Theo định nghĩa thì **before** sẽ chạy trước nhất trong một **describe()** và **beforeEach** sẽ chạy trước mỗi **it()**. Đối với những bạn chưa từng làm quen với uint test thì sẽ có thể hơi confuse vì 2 khái niệm về context này, các bạn có thể đọc thêm ở https://mochajs.org/. Ngoài ra các bạn cũng có thể tìm hiểu thêm về **after** hay **afterEach**

Giờ chúng ta cứ thử test thử trước nhé (Mặc dù chưa có test case nào):

1. Mở terminal và run **testrpc**, kết quả sẽ như hình dưới, chúng ta được testrpc cung cấp cho 10 account để test nếu cần

![](https://images.viblo.asia/e088fa06-b8fb-497a-aa4b-e5e77ce007a6.png)

2. Chạy bộ test với lệnh **truffle test test/voting.js**

![](https://images.viblo.asia/4d7aa2b9-205e-476c-8f38-058b224a8e65.png)

Tiếp theo mình sẽ thêm vào bộ test được mình viết để test cho các function của contract Voting
```js
const Voting = artifacts.require('./Voting.sol');

contract('voting', function(account){
    let voting;
    before('Set up contract for each test', async () => {
        voting = await Voting.new(['Dog', 'Cat', 'Duck']); 
    })


    /* Kiểm thử hàm voteForCandidate
       assert.equal() sẽ throw ra exception nếu giá trị muốn kiểm thử không
       tương đương với giá trị mong muốn của testcase
    */
    it('can vote for candidates', async () => {
        await voting.voteForCandidate('Dog');
        await voting.voteForCandidate('Dog');
        await voting.voteForCandidate('Cat');
        await voting.voteForCandidate('Duck');
        await voting.voteForCandidate('Duck');
        assert.equal(await voting.votesReceived.call('Dog'), 2);
        console.log(account[0]);
    })

    /* Kiểm thử cho hàm validCandidate()
       assert.isTrue() hoặc assert.isFalse() sẽ throw lỗi nếu giá trị kiểm thử 
       tương ứng trả về False hoặc True
    */
    it('validate candidates', async () => {
        assert.isTrue(await voting.validCandidate("Dog"));
        assert.isFalse(await voting.validCandidate("Chicken"));
    })

    /* Kiểm thử cho hàm totalVotesFor
    */
    it('get total vote for candidates', async () => {
        assert.equal(await voting.totalVotesFor('Cat'), 1);
        assert.equal(await voting.totalVotesFor('Duck'), 2)
    })
})
```

Việc tiếp theo của bạn chỉ cần run bộ test mới thêm vào 
>  truffle test test/voting.js
>  
![](https://images.viblo.asia/5734819f-97d0-4b4d-a56f-94cf96db4b54.png)

Contract của chúng ta đã pass được qua 3 testcase vừa được thêm. Tuy nhiên lại có một giá trị khá lạ được bắn ra nhin khá giống address. Nhiều bạn có thể đã đoán ra đó là do mình gọi hàm **console.log(account[0])** . Mục đích mình gọi hàm này ở đây để giải thích cho đối số account truyền vào phía trên, nếu để ý các bạn có thể thấy nó chính là account đầu tiên trong 10 account mà testrpc đã cung cấp. Với contract còn khá đơn giản như contract Voting thì có thể sẽ không cần dùng đến những account bên ngoài, tuy nhiên với một dapp lớn hơn chút xíu thì việc cần đến những account như vậy để test là điều không tránh khỏi 

Hãy thử chỉnh sửa một vài testcase để xem nó sẽ báo lỗi như thế nào nhé.Như các bạn thấy, sau khi sửa đổi cố làm cho bộ test sai thì nó sẽ log đỏ ở context bị sai
```
     assert.equal(await voting.votesReceived.call('Dog'), 20);
```
![](https://images.viblo.asia/e171dc51-76cc-42ad-b872-11e0537b28ab.png)

 


Bên cạnh đấy trong bài viết này mình dụng **before** trong **function contract()**, như mình đã nói ở trên thì **before** sẽ chạy trước nhất trong context của một **describe** và **function contract()** cũng là một describe đặc biệt do đó thực thể **voting** sẽ được khởi tạo và sẽ luôn tồn tại qua các context của **it()**. Bên cạnh đó, tùy những trường hợp cụ thể bạn cũng có thể sử dụng **beforeEach()** nếu muốn function đó được gọi lại ở mỗi context của **it()**

Các bạn có thể xem code hoàn chỉnh tại  [đây](https://github.com/tranchien2002/truffleTest)
# Tài liệu tham khảo
https://medium.com/@gus_tavo_guim/testing-your-smart-contracts-with-javascript-40d4edc2abed
https://viblo.asia/p/huong-dan-viet-va-deploy-dapp-voi-solidity-nhanh-gon-cho-nguoi-moi-bat-dau-phan-1-bJzKmgaXl9N
# Kết
Với những thử chỉ được deploy một lần và không thể sửa đổi như smartcontract, việc kiểm thử chính xác được đòi hỏi một cách nghiêm ngặt, bài viết này mình đã giới thiếu một trong những phương pháp kiểm thử cơ bản là unit test. Mong rằng bài viết của mình hữu ích đối với những ai đang bắt đầu tìm hiểu về smartcontract hay những tester muốn tìm hiểu về kiểm thử cho công nghệ đang hot này.