# Lời nói đầu
Sau gần 2 tuần bươn chải cùng với smart contract và solidity mình cũng đã rút ra được một vài thứ khá hay ho muốn chia sẻ với mọi người cũng như muốn note lại cho chính bản thân mình
Đối với những ai chưa từng động tới smart contract, để bài viết của mình có thể đưa đến các bạn những kiến thức rõ ràng hơn thì các bạn có thể tự vọc qua một `kickstarter` khá thú vị https://cryptozombies.io/
Còn với những ai muốn tự mình khai phá thì hãy bắt tay phá đảo https://ethernaut.zeppelin.solutions/.
Còn nếu không thì cùng thảo luận với mình về những "tính năng" khá thú vị của smartcontract nhé (Bài viết này mình sẽ dùng solidity để triển khái các ví dụ)
Và đây là những thứ cần chuẩn bị để có thể triển khai những ví dụ dưới đây:
    
* Trước hết bạn cần có một ví và địa chỉ. Trong bài mình sẽ sử dụng một extension có thể cài đặt ngay trên trình duyệt là MetaMask. Sau khi cài đặt và đăng ký bạn sẽ có một ví và có địa chỉ của nó (Trong bài viết này mình sẽ sử dụng nhánh test của ethereum là **Ropsten** và nhớ đăng nhập vào ví trong khi thử những ví dụ nhé)

![](https://images.viblo.asia/697998d1-4bdd-4dd0-b8ef-443b1477116d.png) 

![](https://images.viblo.asia/212f435e-579e-410b-9fa1-a72fb6a32531.png)

* Tiếp theo đó trình là một IDE dành cho việc viết code cho những hợp đồng thông minh. Tại đây mình sẽ sử dụng một cloud IDE có tên là  remix : https://remix.ethereum.org/ (và để  đồng bộ với ví mình cũng chọn Environment là **Ropsten**:

    ![](https://images.viblo.asia/887babf3-361e-4454-969e-bf84f7433e90.png)
# Những điều thú vị trong smartcontract
## 1. Private có thực sự là private ?
Với những lập trình viên sử dụng những ngôn ngữ hướng đối tượng hẳn đã quá quen thuộc với tính bao đóng và những keyword như public hay private thì dường như gặp nhiều như cơm bữa. Vả hẳn nhiên keyword private được đặt theo đúng chức năng của nó, khi không muốn ai có thể chỉnh sửa thậm chí là xem trực tiếp một biến trong một Class thì sẽ gọi đến keyword này. Và tất nhiên trong solidity cũng có keyword ``private``

Đây là những gì mà docs của solidity định nghĩa :
> **Private functions and state variables** are only visible for the contract they are defined in and not in derived contracts


Với đoạn định nghĩa này thì có vẻ private trong solidity khá giống với các ngôn ngữ hướng đối tượng khác. Wait, thế còn cái slogan "Mọi thứ trong blockchain đều là công khai, minh bạch" ? . Nếu ném private vào thì còn gọi gì là công khai nữa ?
Nếu chú ý bạn có thể  thấy ngay dưới đọan định nghĩa ``private`` trong docs của solidity sẽ có một đoạn note:
>Everything that is inside a contract is visible to all external observers. Making something private only prevents other contracts from accessing and modifying the information, but it will still be visible to the whole world outside of the blockchain.

Có vẻ như cũng hợp lý đấy chứ nhỉ, vẫn là công khai tuy nhiên vẫn giữ vững tinh thần private giữa các contract trong mạng. Cùng làm thử một ví dụ nhỏ để clear hơn nhé

Trước hết mình sẽ deploy một smartcontract khá đơn giản lên testnet (sử dụng IDE là remix):

``` js
pragma solidity ^0.4.23;
contract A {
    address private wallet;
    uint public luckyNumber;
    constructor(address _wallet, uint _luckyNumber) public {
        wallet = _wallet;
        luckyNumber = _luckyNumber;
    }
    
}

contract B {
    A a = new A(0x0046fc5338ceef7982df06a8dd9b1969a621fae318, 8);
    function getWalletOfA() public returns(address) {
        return a.wallet;
    }
    
    function getNumberOfA() public returns(uint) {
        return a.luckyNumber;
    }
}
```

có 2 contract A và B:

* A chứa 2 state variable là **wallet** (private) và **luckNumber** (public)
* B chứa một contract A với địa chỉ 0x0046fc5338ceef7982df06a8dd9b1969a621fae318 và hai hàm để lấy **wallet** và **luckyNumber**

Và tất nhiên bạn không thể  deploy vì compile sẽ báo lỗi có dạng như:  **Member wallet not found or not visble....**

Như vậy chúng ta đã rõ về  :  **Making something private only prevents other contracts from accessing and modifying the information** Tiếp theo ta sẽ đi và làm rõ: **but it will still be visible to the whole world outside of the blockchain**

Comment đoạn code của contract B vừa rồi và deploy A lên testnet Ropsten:
![](https://images.viblo.asia/3304a7e8-68b2-4b08-b919-4ed77d799ece.png)

Như vậy chúng ta đã có một constract A với địa chỉ **0x2f7265005a7c067c4b683964b6b400030a272e2f** trên testnet Ropsten. Contract này có 2 state variables là **wallet** và **luckyNumber**. Biến **luckyNumber** do là public nên có thể truy xuất trực tiếp giá trị trên remix tuy nhiên **wallet** thì không đơn giản như vậy, trong bài viết này mình sẽ dùng thư viện web3js để truy xuất vào blockchain để lấy dữ liệu về contract vừa deploy ( docs cho web3js : https://web3js.readthedocs.io/en/1.0/)
Hàm mà chúng ta cần chú ý ở đây sẽ là :
```
web3.eth.getStorageAt(address, position [, defaultBlock] [, callback])
```

Hãy mở developer tools rồi gọi hàm : 
```
web3.eth.getStorageAt("0x2f7265005a7c067c4b683964b6b400030a272e2f", 0, (e,r) => alert(r))
```
hoặc có thể sử dụng ngay console trong remix
và kết quả :
![](https://images.viblo.asia/d6d22c6f-fda6-46dd-8d40-0982fd8cd966.png)

Khá giống với giá trị biến **wallet** đấy chứ nhỉ. Bây giờ mình sẽ giải thích về những thứ mình vừa làm :
hàm web3.eth.getStorageAt được truyền vào 3 đối số lần lượt là **địa chỉ của contract muốn lấy dữ liệu**, **vị trí slot muốn lấy được lưu trong storage**, **callback function** (Bạn truyền địa chỉ contract và slot tương ứng của contract của mình)
Như vậy có vẻ như dù private nhưng **still be visible to the whole world outside of the blockchain**
## 2. tx.origin và msg.sender
Hai biến toàn cục này đôi khi thường vẫn gây phân vân cho solidity developer vì trong một số trường hợp nó trả về cùng một giá trị, như thế nhiều người sẽ mặc định rằng 2 biến này luôn cho về cùng một giá trị và hậu quả là dẫn đến một số lỗi khá quan trọng.
Còn đây là định nghĩa của docs:
> **tx.origin** (address): sender of the transaction (full call chain)
> 
> **msg.sender** (address): sender of the message (current call)
> 
Theo docs này khá khác nhau, tx.origin sẽ trả về địa chỉ của địa chỉ tạo ra transaction còn msg.sender sẽ trả về địa chỉ gọi đến message đó

Chúng ta tiếp tục làm một thí nghiệm nhỏ, đôi khi thực nghiệm sẽ giải thích tốt hơn câu từ (sử dụng IDE là remix) :
``` js
pragma solidity ^0.4.23;
contract A {
    
    function returnSender() public view returns (address) {
        return msg.sender;
    }
    
    function returnOrigin() public view returns (address) {
        return tx.origin;
    }
    
}
```
Chúng ta tiếp tục deploy contract A (Tuy nhiên lần này chúng ta để tránh phải chờ đựi verify chúng ta sẽ sử dụng javascript vituarl machine):
![](https://images.viblo.asia/b70fcb22-a69b-4b21-9e86-d02e3e55a20c.png)

Contract này có 2 function **returnOrigin** và **returnSender** tương ứng sẽ trả về  địa chỉ **tx.origin** và **msg.sender**. Nào thử test thử  

![](https://images.viblo.asia/c34924b7-1424-428e-a7b2-1fc15ab1949c.png)

2 địa chỉ này chẳng khác gì nhau, và nếu bạn để ý thì nó còn chính là địa chỉ của Account 

Tiếp tục deploy một contract B 
```js
contract B {
    A a = A (0x5e72914535f202659083db3a02c984188fa26e9f); //địa chỉ contract A vừa được deploy tương ứng
    function returnSender() public view returns (address) {
        return a.returnSender();
    }
    
    function returnOrigin() public view returns (address) {
        return a.returnOrigin();
    }
}
```

![](https://images.viblo.asia/d6c4a184-2bca-43b5-b128-1a634ee52516.png)

Trong contract này có một state variable là instance của contract A vừa deploy và 2 hàm trả về  **tx.origin** và **msg.sender** của instance đó.
Và cùng xem kết quả nào:

![](https://images.viblo.asia/756ca1ae-b394-46dc-81a2-9c7031e02748.png)

Cùng mục đích là trả về **tx.origin** và **msg.sender** của contract A nhưng có vẻ đã xuất hiện sự bất đồng quan điểm

Hàm **returnSender** của của contract B trả về địa chỉ không còn giống nữa, và nếu chú ý thì đây chính là địa chỉ của contract B. Đến đây có vẻ các bạn cũng đã rõ về sự khác nhau của 2 cái này :

* tx.origin luôn trả về địa của đối tượng tạo transaction 
* msg.origin sẽ xác định vào context khi gọi hàm, như ta thấy với ví dụ thứ nhất account gọi trực tiếp đến hàm **returnSender** (Account -> A.returnSender) do đó sẽ trả về  đúng địa của account. Với ví dụ thứ 2 Account gọi hàm **returnSender** của B rồi hàm đó mới gọi đến **returnSender** của A (Account -> B.returnSender -> A.returnSender) do đó A.returnSender nằm trong context của B do đó msg.sender khi đó sẽ trả về địa chỉ của contract B.
## 3. Nhận tiền ngay cả khi không có payable

Về vấn đề này thì chúng ta cần có một chút kiến thức về keyword **payable** và **fallback** :

Payable:
* Payable là một modifier có thể thêm vào các hàm trong solidity
* Payable cho phép function có thể nhận ether

Fallback: 

* Mỗi contract có một hàm không tên, không có đối số truyền vào cũng như trả về
* Fallback được gọi khi không tìm thấy function tương ứng với function được gọi
* Hàm này cũng được gọi khi contract nhận ether thông qua những function thô (như transfer, send)

Tiếp tục là một ví dụ nhỏ 
```js
pragma solidity ^0.4.23;
contract A {
    
    constructor() public {
        
    }

}
```
Chúng ta thử deploy contract này và gửi ether thông qua constructor 

![](https://images.viblo.asia/decd475d-35df-4dbe-a561-4e14bf54e4df.png)

và kết quả :

![](https://images.viblo.asia/b86d0b97-1529-4127-bd91-3dfc8c53df9c.png)

Giờ thử với ví dụ này xem sao
```js
pragma solidity ^0.4.23;
contract A {
    
    constructor() public {
        
    }
    
    function() public { //fallback function
        
    }

}

contract B {
    constructor() public payable {
        
    }
    
    function sendEther(address _address) public {
        _address.transfer(1 ether);
    }
    
}
```
Ta thử deploy (khi deploy B thì nhớ truyền cho B 1 ether để sau chúng ta cùng test xem có thể gửi được cho A không)
![](https://images.viblo.asia/b36d2605-1892-41d5-8a3d-75629a6a3c9f.png)

Cùng thử gửi ether cho contract A thông qua hàm sendEther của B bằng cách truyền đối số là địa chỉ của A, và cùng xem kết quả có vẻ vẫn không khả quan lắm:
![](https://images.viblo.asia/19b2f6a2-ce9d-41f2-96b4-9a187b9a7a12.png)

Lần này hãy thử deploy lại A nhưng giờ cho modifier **payable** cho fallback function, và kết quả:

![](https://images.viblo.asia/da217fc3-5ed9-4192-8dba-b697f884d3a3.png)

Có vẻ như nó bắt phải có payable thì mới mở cổng cho nhận ether

Vậy liệu có cách nào để bắt buộc contract nhận ether cho dù không có payble không ?
Câu trả lời là có và thậm trí có đén 2 cách:

* Miner gán địa chỉ của address muốn gửi tiền vào địa chỉ nhận phần thưởng sau khi mỗi block mới được tạo ra
* Sử dụng hàm **selfdestruct**

Trong bài viết này mình sẽ nói về cách thứ 2 (vì có vẻ đơn gian hơn) : sử dụng **selfdestruct**
Trước hết hãy xem định nghĩa của docs về hàm này
> selfdestruct(address recipient):
destroy the current contract, sending its funds to the given Address

Có thể hiểu hàm này sẽ tự động phá hủy contract gọi nó và gửi số ether của contract vào địa chỉ đối số truyền vào

Bây giờ hãy lấy lại code cũ và thay vì transfer thì sử dụng function selfdestruct (hãy thử cả khi bỏ payable ở fallback function của A).Kết quả cuối này bạn hãy tự mình giải đáp và cho mình kết quả dưới phần comment nhé

#  Lời kết
Đây là một trong những thứ khá thú vị mà người mới bắt đầu với một ngôn ngữ khá trẻ như solidity có thể bị mắc phải.Mong rằng bài viết của mình phần nào giúp đỡ được việc gỡ rối cho những người mới bắt đầu 

# Nguồn
https://web3js.readthedocs.io/en/1.0/

https://solidity.readthedocs.io/en/develop/index.html

https://ethernaut.zeppelin.solutions/

https://cryptozombies.io/