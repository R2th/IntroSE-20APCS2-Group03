Những bài viết hướng dẫn trên mạng thường sẽ hướng dẫn cách tạo một ERC-20, deploy và transfer chúng . Thế nhưng câu hỏi đặt ra bây giờ là làm sao có thể thao tác như transfer , getBalance một ERC-20 đã tồn tại trước đó ? ví dụ như Link một ERC-20 của ChainLink .
Bài viết này được lấy cảm hứng từ [quest](https://viblo.asia/q/lam-sao-de-lay-balanceof-transfer-va-transferfrom-va-cac-thuoc-tinh-cua-token-erc20-da-co-san-yDZO71EPZwj) tác giả @quyphan

![](https://images.viblo.asia/fbb16501-a85d-4cc9-ad8e-4245682f8c6b.png)

# Tìm hiểu qua một chút về ERC20
ERC20 là một tiêu chuẩn kỹ thuật sử dụng cho smart contract trên Ethereum khi phát hành Token. Nó định nghĩa một danh sách chung các quy tắc ( ERC20 Interface ) mà một Token Ethereum phải thực hiện, tạo cho các nhà phát triển khả năng lập trình các Token mới để hoạt động được trong hệ sinh thái của Ethereum . Để dễ hiểu ví dụ ví metamask có thể xem balance , tên token , transfer được các loại token thì rõ ràng các loại token phải có các chuẩn rồi đúng ko . Hiện tại có một bên cung cấp sẵn mà chỉ cần import là có thể dùng được luôn ví dụ như [OpenZeppelin
](https://docs.openzeppelin.com/contracts/2.x/erc20)
## Giới thiệu qua về ERC20 Interface
Chúng ta sẽ giới thiệu qua ERC20 interface contract theo chức năng để hiểu những gì mà nó có thể làm. Tóm tắt thì ERC20 interface contract chứa tổng cộng 6 functions và 2 logging events.
```js
interface ERC20 {
  // standard variables
  string public constant name = "Token Name";
  string public constant symbol = "SYM";
  uint8 public constant decimals = 18;
  // core ERC20 functions
  function allowance(address _owner, address _spender) constant returns (uint remaining);
  function approve(address _spender, uint _value) returns (bool success);
  function balanceOf(address _owner) constant returns (uint balance);
  function totalSupply() constant returns (uint totalSupply);
  function transfer(address _to, uint _value) returns (bool success);
  function transferFrom(address _from, address _to, uint _value) returns (bool success);
  // logging events
  event Approval(address indexed _owner, address indexed _spender, uint _value);
  event Transfer(address indexed _from, address indexed _to, uint _value);
}
```

### **Approve**
Approve là một hàm hữu ích khác từ quan điểm lập trình. Với hàm này, bạn có thể giới hạn số lượng token mà một smart contract có thể rút từ balance của bạn. Không có nó, bạn có thể gặp rủi ro về lỗi contract và bị trộm mất tất cả tiền. 
### **Allowance**
Allowance có thể được sử dụng cùng với approve. Khi bạn đã cấp một quyền hợp đồng để quản lý token của mình, bạn có thể sử dụng quyền này để kiểm tra số lượng tiền vẫn còn có thể rút. Ví dụ: nếu đăng ký của bạn đã sử dụng hết 12 trong 20 token được duyệt, việc gọi hàm allowance sẽ giúp hoàn lại 8 token.
### **BalanceOf**
BalanceOf hàm này nhận một đầu vào là address và trả về balance của address đấy. Balance trả là đại diện cho số token mà address đó nắm giữ. Hơn nữa bạn có thể tra cứu balance của bất cứ address nào.
### **TotalSupply**
**totalSupply** trả về tổng số lượng token được phát hành .
### **Transfer**
Transfer cùng với chức năng TransferFrom được định nghĩa bên dưới đây là trái tim và linh hồn của token ERC20 .Hai chức năng này chịu trách nhiệm cho mọi giao dịch ERC20 . Chức năng Transfer là để gửi token ERC20 từ một ví duy nhất do người dùng sở hữu đến một địa chỉ ví khác. Vì chính chủ sở hữu ví gọi chức năng này nên chỉ đầu vào là địa chỉ người nhận và số lượng token. Và trả về gửi có success hay không .
### **TransferFrom**
TransferFrom là mở rộng của hàm transfer cho phép lập trình được nhiều hơn .Giống với transfer nó được sử dụng để chuyển các token nhưng các token đó không nhất thiết phải do bạn ký. Nói cách khác bạn có hể ủy quyền cho ai đó hoặc contract khác để chuyển tiền thay cho mình .
# Kịch bản demo
Để tiện demo mình sẽ sử dụng Remix và deploy lên Testnet Ropsten để test contract của mình . Với kịch bản là gọi các hàm để contract thao tác với ERC-20 (ở đây mình chọn Link) với các lệnh như balanceOf , transfer, ...
```js
pragma solidity ^0.6.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract MyContract {
    address targetToken = 0x20fE562d797A42Dcb3399062AE9546cd06f63280;
    ERC20 token;
    
    constructor() public {
        token = ERC20(targetToken);
    }
    
    function getName() public view returns (string memory){
        return token.name();
    }

    function getTotalSupply() public view returns (uint256){
        return token.totalSupply();
    }
    
    function getBalanceOf(address _owner) public view returns (uint256){
        return token.balanceOf(_owner);
    }
    
     function getBalance() public view returns (uint256){
        return token.balanceOf(address(this));
    }
    
    function setTransfer(address _to, uint256 _value) public {
        token.transfer(_to,_value);
    }
}
```
## Giải thích 
- Đầu tiên là cần phải import chuẩn ERC20 của OpenZeppenlin mục đích là lấy được interface của ERC20 . Lưu ý nhỏ là phiên bản solidity mình dùng cũng phải giống bản trong code ERC20 của OpenZeppenlin ở đây là **^0.6.0**
```js
pragma solidity ^0.6.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';
```
- Define địa chỉ của contract của ERC20 mà mình muốn thao tác. Ở trong code thì đó là địa chỉ của chainlink trên Testnet 
```js
address targetToken = 0x20fE562d797A42Dcb3399062AE9546cd06f63280;
ERC20 token;
```
- Ở hàm contructor chúng ta sẽ gọi đến contract của ERC20 thông qua địa chỉ . Sau đó có thể thao tác vs ERC thông qua biến token. Nếu như chúng ta có nhu cầu thao tác vs nhiều token khác nhau thì có thể define nhiều loại và chỉ cần map chúng vs địa chỉ trong contructor là đc .
```js
constructor() public {
    token = ERC20(targetToken);
}
```
- Test thử một vài hàm cơ bản về token như tên token, và tông sống lượng token được tạo 
```js
function getName() public view returns (string memory){
    return token.name();
}

function getTotalSupply() public view returns (uint256){
    return token.totalSupply();
}
```
- Để tiện thao tác và quản lý thì chúng ta cần có thêm 2 hàm đó là **getBalanceOf** và **getBalance** thực ra hai cái này là một chỉ khác một chút là getBalanceOf mình phải điền thêm địa chỉ để check balance của bất cứ địa chỉ nào còn getBalance là lấy balance của contract luôn mà không cần điền thêm địa chỉ .
```js
function getBalanceOf(address _owner) public view returns (uint256){
    return token.balanceOf(_owner);
}

 function getBalance() public view returns (uint256){
    return token.balanceOf(address(this));
}
```
- Cuối cùng là hàm transfer với mục đích là gửi token từ contract đến địa chỉ khác . Lưu ý là cần có các design hợp lý vì nếu để ng dùng gọi hàm này thì ng dùng vẫn phải ký vì đây là hàm write ko phải read mà. tuy nhiên nếu thiết kế về việc có một account admin để gọi hàm này khi ng dùng request thì ux sẽ hợp lý hơn .
```js
function setTransfer(address _to, uint256 _value) public {
    token.transfer(_to,_value);
}
```
# Tiềm năng
Với sự phát triển của các hệ thống Oracle như Chainlink việc lấy được giá của các token khác nhau ở trong contract là điều đơn giản vì thế mở ra được tiềm năng về việc viết contract thao tác với nhiều loại token khác nhau sẽ tuyệt vời hơn rất nhiều so với những contract chỉ thao tác đc với một mình ETH .