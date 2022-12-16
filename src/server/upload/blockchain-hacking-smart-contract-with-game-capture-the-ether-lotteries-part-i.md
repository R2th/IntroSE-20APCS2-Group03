### **Capture the ether là gì?**

Capture the ether là nơi bạn tìm cách hack các Ethereum smart contract để học về bảo mật thông qua chơi game. Game bao gồm các series thử thách được chia theo chủ đề với độ khó khác nhau. Độ khó càng cao thì càng kiếm được nhiều điểm. Truy cập https://capturetheether.com/ để tham gia chơi.
Để hoàn thành các thử thách, bạn sẽ cần cài đặt và có một số kiến thức cơ bản về các thứ sau:
* Cài đặt Metamask.
* Tạo một account trên Ropsten Testnet, sau đó vào https://faucet.metamask.io/ để lấy vài ether.
* Bật Remix IDE https://remix.ethereum.org

Phần Warm up được thiết kế để bạn có thể chuẩn bị và học cách sử dụng các công cụ cần thiết, vậy nên trong bài viết này chúng ta sẽ đi tới luôn phần tiếp theo Lotteries và cùng tìm hiểu xem các smart contract về Lotteries có đảm bảo tính ngẫu nhiên và công bằng như ta vẫn nghĩ
### 1. Guess the number
```js
pragma solidity ^0.4.21;

contract GuessTheNumberChallenge {
    uint8 answer = 42;

    function GuessTheNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```
**Approach**

Bài toán yêu cầu phải đoán 1 số ngẫu nhiên. Thật may mắn khi source code đã gợi ý ngay cho ta đáp án n == answer == 42, vì vậy chúng ta chỉ đơn giản gọi hàm guess( 42) trong contract

**Solution**

![](https://images.viblo.asia/0f4442a7-beb5-4b05-898e-1ce824941f86.png)

Copy source code vào Remix IDE và deploy contract tại địa chỉ mà game đã cấp. Gọi hàm guess với giá trị là 42. ( Lưu ý điều kiên value = 1ether). Kiểm tra lại bằng hàm isComplete(), nếu giá trị trả về là true tức là bạn đã hoàn thành rồi. (Lưu ý capture the ether chỉ tính bạn hoàn thành thử thách khi hàm isComplete() trả về true ).  Check solution rồi lấy ngay 200 point thôi :smile: 

### 2. Guess the secret number

```js
pragma solidity ^0.4.21;

contract GuessTheSecretNumberChallenge {
    bytes32 answerHash = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;

    function GuessTheSecretNumberChallenge() public payable {
        require(msg.value == 1 ether);
    }
    
    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (keccak256(n) == answerHash) {
            msg.sender.transfer(2 ether);
        }
    }
}
```

**Approach**

Bài này đáp án cũng đã có ngay trong source code, tuy nhiên có một vấn đề lớn là đáp án ở dạng bytes32 (sử dụng hàm hash keccak256) trong khi hàm guess lại yêu cầu đầu vào là uint8. Thường sẽ rất khó để tìm ra đáp án trước khi hash keccak256, tuy nhiên thật may cho chúng ta uint8 có giá trị chỉ trong khoảng 0 - 226 . Chính vì vậy ta vẫn có thể tìm ra đáp án nhờ sử dụng brute force.


**Solution**

![](https://images.viblo.asia/01c37118-51ba-4839-bab3-90228035edda.png)

Chúng ta viết thêm 1 contract khác và dùng vòng for từ 0-256 cho đến khi nào tìm được số có hash bằng với đáp án đề bài cho.
Và chúng ta nhận được kết quả là 170. Tiến hành điền 170 vào hàm guess như phần trên và đừng quên để value là 1 ether. Kiểm tra lại bằng hàm isComplete() sau đó Check Solution => Ez 300 điểm tiếp theo


```js
pragma solidity ^0.4.21;

contract Solution {
    bytes32 answer = 0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365;
    
    function getResult() public view returns(uint8){
        for ( uint8 i = 0; i < 256; i++){
            if( keccak256(i) == answer) return i;
        }
    }
}
```




### 3. Guess the random number
```js
pragma solidity ^0.4.21;

contract GuessTheRandomNumberChallenge {
    uint8 answer;

    function GuessTheRandomNumberChallenge() public payable {
        require(msg.value == 1 ether);
        answer = uint8(keccak256(block.blockhash(block.number - 1), now));
    }

    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

    function guess(uint8 n) public payable {
        require(msg.value == 1 ether);

        if (n == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```

**Approach**

Có 2 cách để giải quyết bài toán này:

1. Tính answer bằng cách sử dụng hàm hash keccak256 dựa trên blockhash của khối block được tạo ra trước đó ( block.number - 1) và timestamp của block hiện tại khi được deploy.

2. Ta biết rằng blockchain là minh bạch, và mọi thông tin trên đó ta đều có thể nhìn thấy được, kể cả những biến khai báo là private. Và trong bài này, điều đó không là ngoại lệ. web3js cung cấp cho ta một hàm web3.eth.getStorageAt để lấy thông tin trên blockchain.

**Solution**

1. Sử dụng metamask. Trong phần activity log có thông tin của transaction khi contract được deploy. Click dòng chứa thông tin transaction confirm ta được chuyển tới tran etherscan.io chứa các thông tin của transaction deploy contract .

![](https://images.viblo.asia/d7ab6b9b-488d-4176-a2ed-075f6756f912.png)

Từ ParentHash và Timestamp ta viết 1 contract tính toán ra answer = 64 .
```js
pragma solidity ^0.4.21;

contract Solution {
    function returnHash() public view returns(uint8){
        return uint8(keccak256(abi.encode(0xc8c92b5221de51ec2bb622f2d9d8a26d728b012c4f9da26bb1c64e5604ba7537,1562903364)));
    }
}
````
![](https://images.viblo.asia/16bede72-467e-4aa3-a2d3-3954bfa2c2b6.png)

2. Sử dụng console của trình duyệt ngay trên trang capture the ether.

![](https://images.viblo.asia/d49254e2-7321-4e6c-a155-a3ea76abef73.png)


Bật console và sử dụng câu lệnh `web3.eth.getStorageAt` để lấy thông tin của blockchain  `0x1120f5ec248e2de6341B33C5919cE7A5937D7237` là địa chỉ của contract, 0 là chỉ số index của biến lưu trữ trong storage. Ta có hex 0x40 = 64. (Lưu ý: Tùy block của mỗi người sẽ nhận được số khác nhau )
    
 Tương tự 2 bài trước ta nhập kết quả và kiểm tra bằng hàm isComplete() .
    
### Conclusion
* Luôn luôn nhận thức rằng tất cả dữ liệu và giao dịch trên public blockchain là công khai với mọi người
* Tránh sử dụng blockhash làm nguồn cho hàm random
* Luôn luôn để ý thiết kế smart contract của bạn để tránh những lỗi bảo mật có thể khai thác


Trong phần tiếp theo, chúng ta sẽ tìm hiểu cách tấn công 1 smart contract thông qua 1 smart contract khác. Hẹn gặp lại mọi người trong phần II của Capture the ether - Lotteries :+1: