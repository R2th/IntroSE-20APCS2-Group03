Sau khi viết bài về ứng dụng phi tập trung và chuẩn bị hướng dẫn các bạn làm những ví dụ thực tế. Mình muốn viết một số chủ đề quan trong một cách chi tiết để mọi người dễ hiểu hơn. Và hôm nay sẽ là cách tạo một token trên nền tảng Ethereum. Tại sao lại là token mà không phải là coin? Mọi người cùng mình tìm hiểu nhé
### **1. Token và Coin**

Khi nhắc đến một thứ gì đó để lưu hành trong hệ thống Blockchain người ta thường nghĩ đến ngay Bitcoin hoặc các Altcoin (Alternative Cryptocurrency Coins). Vậy còn token là gì và nó làm được gì trên Blockchain?

Altcoin được nhắc đến như những đồng tiền điện tử được biến thể từ Bitcoin. Có những altcoin được phân nhánh(fork)  từ Bitcoin như là Namecoin, Peercoin, Litecoin, Dogecoin,... Những coin này được phát triển từ các giao thức  gốc của Bitcoin để đáp ứng được những nhu cầu mà người phát triển muốn khác với Bitcoin. Nhiều người cho rằng đó là cuộc cải cách đối với Bitcoin. Nhưng mọi người thấy đó, chưa bao giờ ở trên Coin Market Cap có cái tên nào khác ở vị trí số một ngoài Bitcoin. Một số cách Altcoin khác thì được viết lại các giao thức riêng và được sử dụng trong hệ thống Blockchain riêng như  Ethereum, Ripple, Omni, Bitshares, NEO, ...

=> Vậy kết luận lại, Coin và Altcoin đều có hệ thống Blockchain độc lập riêng của riêng mình và được sử dụng trong các giao thức gốc của hệ thống Blockchain của chúng.

Token là một đại diện của một tài sản hoặc tiện ích cụ thể, thường nằm trên một blockchain đã có sẵn. Mã token thì có vẻ đa năng hơn khi nó có thể đại diện cho giá trị hàng hóa, thể hiện sự duy nhất của một Object, tích điểm của thành viên, có thể được sử dụng như các loại tiền điện tử để lưu thông. 

Tạo token là một quy trình dễ dàng hơn nhiều vì bạn không phải sửa đổi mã từ một giao thức cụ thể hoặc tạo blockchain từ đầu. Tất cả những gì bạn phải làm là tuân theo một mẫu tiêu chuẩn trên blockchain - chẳng hạn như trên nền tảng Ethereum hoặc Waves - cho phép bạn tạo mã thông báo của riêng mình. Chức năng tạo mã thông báo của riêng bạn được thực hiện thông qua việc sử dụng hợp đồng thông minh; mã máy tính có thể lập trình tự thực thi và không cần bất kỳ bên thứ ba nào hoạt động.

=> Vậy việc tạo một ứng dụng phi tập trung với các token sử dụng hệ thống Blockchain có sẵn chắc chắc sẽ dễ dàng tiếp cận hơn việc tạo một hệ thống Blokchain riêng và coin cho riêng nó.  :moneybag::moneybag: :moneybag:

### **2. Các chuẩn để tạo một token trên Ethereum**

Như đã nói ở trên, bạn có thể tạo token của riêng bạn nhưng phải theo những chuẩn có sẵn. Tại sao lại cần chuẩn nhỉ?  Cùng đi xem qua một số khái niệm nào:

Ethereum Request for Comment (ERC) là hình thức phát hành nghiên cứu và yêu cầu được bình luận trong cộng đồng mã nguồn Ethereum. ERC là một dạng của EIP, hoặc Ethereum Improvement Proposal – Đề xuất cải thiện Ethereum. Cũng giống như Bitcoin Improvement Proposals (BIPs), chỉ một số ít các đề xuất thực sự được triển khai. Các con số  đi sau đó có thể hiểu là số đăng ký phiên bản để phân biệt với các chuẩn ERC khác. Các chuẩn ERC phổ biên như là ERC20, ERC777, ERC223, ERC721, ERC827, ERC948, ERC884.

Trong đó, ERC20 là chuẩn token Ethereum được sử dụng phổ biến nhất hiện nay. Có thể nói hầu như bất kỳ dự án ICO nào cũng sử dụng token chuẩn ERC20 này. Một token sử dụng chuẩn ERC20 sẽ có 

6 function sau:

```javascript
totalSupply() public view returns (uint256 totalSupply) 
balanceOf(address _owner) public view returns (uint256 balance)
transfer(address _to, uint256 _value) public returns (bool success)
transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
approve(address _spender, uint256 _value) public returns (bool success)
allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

và 2 event:

```javascript
Transfer(address indexed _from, address indexed _to, uint256 _value). 
Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

Trước khi sử dụng chuẩn này, nếu bạn gửi một token đến sai địa chỉ sẽ khiến token đó bị mất vĩnh viễn. Có thể coi những chuẩn này như những bản vá hoặc cải tiến cho token. Và quan trọng hơn, việc bản sử dụng một chuẩn ERC nào đó giúp cho hệ thống có thể hiểu và tương tác tốt hơn với token của bạn. 

Một ví điện tử sẽ biết các tương tác với token của bạn nếu biết bạn đang dùng một chuẩn ERC20 nào đó. Còn nếu bạn không sử dụng chuẩn nào cả, token của bạn là một điều mới mẻ chưa ví điện tử nào biết đến thì thật khó để các nhà phát triển có thể làm một cái gì đó để lưu trữ nó giúp bạn hoặc trao đổi giữa token của bạn với các token khác. 

### **3.Thực hành thôi**

Việc sử dụng chuẩn Token có kiến code của bạn bị tù đi, không còn được sáng tạo không? Nô, như đã biết thì solidity là ngôn ngữ hướng đối tượng. Nên bạn chỉ cần implement class ERC20 token này để phát triển token của bạn thôi. Tiếp tục sử dụng Remix IDE nhé. 

code của ERC20 bạn có thể lấy ở [đây](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md)

Mình sẽ sử dụng solidity version 0.4.25 quen thuộc với mình

Có một số vấn đề khi bạn compile với các phiên bản solidity , một số phiên bản sẽ yêu cầu bạn sử dụng `pure` hoặc `view` thay cho `constant` 
nên mình sửa lại một chút thành

```javascript
pragma solidity^0.4.25;

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
interface ERC20 {

  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  
}
```

Các bạn tạo file `ERC20.sol` rồi thêm phần code kia vào nhé.  Mô tả chức năng của function có thể xem tại [đây](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md) 

Tiếp theo là file `SafeMath.sol`. Đúng như cái tên của nó, file này giúp cho việc kiểm tra điều kiện các tham số trước khi làm phép tính với chúng.  


```javascript
pragma solidity^0.4.25;

library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}
```

Và cuối cùng, hãy import các file trên và implement các contract vào file `VibloToken.sol`

```javascript
pragma solidity^0.4.25;

import 'browser/SafeMath.sol';
import 'browser/ERC20.sol';

contract VibloToken is ERC20 {
    
    using SafeMath for uint;
     
    string internal _name;
    string internal _symbol;
    uint8 internal _decimals;
    uint256 internal _totalSupply;

    mapping (address => uint256) internal balances;
    mapping (address => mapping (address => uint256)) internal allowed;

    constructor(string name, string symbol, uint8 decimals, uint256 totalSupply) public {
        _symbol = symbol;
        _name = name;
        _decimals = decimals;
        _totalSupply = totalSupply;
        balances[msg.sender] = totalSupply;
    }

    function name()
        public
        view
        returns (string) {
        return _name;
    }

    function symbol()
        public
        view
        returns (string) {
        return _symbol;
    }

    function decimals()
        public
        view
        returns (uint8) {
        return _decimals;
    }

    function totalSupply()
        public
        view
        returns (uint256) {
        return _totalSupply;
    }

   function transfer(address _to, uint256 _value) public returns (bool) {
     require(_to != address(0));
     require(_value <= balances[msg.sender]);
     balances[msg.sender] = SafeMath.sub(balances[msg.sender], _value);
     balances[_to] = SafeMath.add(balances[_to], _value);
     Transfer(msg.sender, _to, _value);
     return true;
   }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
   }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
     require(_value <= balances[_from]);
     require(_value <= allowed[_from][msg.sender]);

    balances[_from] = SafeMath.sub(balances[_from], _value);
     balances[_to] = SafeMath.add(balances[_to], _value);
     allowed[_from][msg.sender] = SafeMath.sub(allowed[_from][msg.sender], _value);
    Transfer(_from, _to, _value);
     return true;
   }

   function approve(address _spender, uint256 _value) public returns (bool) {
     allowed[msg.sender][_spender] = _value;
     Approval(msg.sender, _spender, _value);
     return true;
   }

  function allowance(address _owner, address _spender) public view returns (uint256) {
     return allowed[_owner][_spender];
   }

   function increaseApproval(address _spender, uint _addedValue) public returns (bool) {
     allowed[msg.sender][_spender] = SafeMath.add(allowed[msg.sender][_spender], _addedValue);
     Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
     return true;
   }

  function decreaseApproval(address _spender, uint _subtractedValue) public returns (bool) {
     uint oldValue = allowed[msg.sender][_spender];
     if (_subtractedValue > oldValue) {
       allowed[msg.sender][_spender] = 0;
     } else {
       allowed[msg.sender][_spender] = SafeMath.sub(oldValue, _subtractedValue);
    }
     Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
     return true;
   }

}
```

Sau khi mọi thứ ok(Tức là sẽ không có lỗi ở dòng code nào) thì hãy tiến hành compile nhé. 

![](https://images.viblo.asia/174eaf73-3746-42a9-a199-eef810beb5e2.PNG)

Có một số cái warning ở bên kia. Nhưng không sao, không có lỗi khi compile :D :D 
Chuyển qua tab Run và thử deploy code nhé. 

![](https://images.viblo.asia/5887d876-dd2c-4363-9ebb-50b95f961a2f.png)

Do Smart Contract cuối cùng mình sử dụng là VibloToken nên mình sẽ chọn nó để deploy. Các bạn chú ý phần constructor mình đang để các thông số khởi tạo token của mình có thể nhập vào. Và các thông số đó là:

* Tên của token
* Mã của token
* Số chữ số thập phân sau dấu phẩy của token
* Tổng số token muốn phát hành


Ví dụ chúng ta sẽ tạo token như sau:


* Tên: Viblo
* Mã: VBL
* Số chữ số thập phân sau dấu phẩy: 0
* Tổng số token phát hành: 1000

![](https://images.viblo.asia/bf3047bd-03bc-41c7-93f4-4eb30be76106.png)

Nhớ đăng nhập vào metamask để sử dụng remix như hướng dẫn của mình trong bài trước nhé. Các bạn có thể xem lại tại [đây](https://viblo.asia/p/smart-contract-va-remix-ide-djeZ1RQglWz)

Điền mọi thứ như hình của mình và bấn vào transact, xác nhận giao dịch mà metamask thông báo và đợi một chút. 
![](https://images.viblo.asia/c81b3413-d694-4a3e-8162-bea03ea42e63.PNG)

Ngon rồi! :money_mouth_face:
Việc deploy thành công và mình đã test các function ok. 

Bạn đã có thể xem token của mình tại https://ropsten.etherscan.io/ có sánh vai với các cường quốc năm châu chưa nhé. Gõ tên hoặc kí hiệu Token để tìm kiếm. Sẽ mất chút thời gian để tìm thấy nó vì các token được deploy lên mạng testnet khá nhiều và liên tục.  

![](https://images.viblo.asia/c6f83754-a384-4a7d-bc0f-82e7f9ad1941.png)

Hoặc các bạn có thể vào phần Token trên Metamask để add token. Click vào giao dịch mới nhất trong lịch sử transaction của Metamask bạn sẽ thấy có địa chỉ  Smart Contract mà token deploy lên đó. Sử dụng địa chỉ đó để thêm vào Add Token trong metamask ta có thể kiểm tra số Token đã được deploy chưa. 

![](https://images.viblo.asia/3b878b09-4b03-4e2c-8d2a-c27f0b220771.png)

Trong phần tiếp theo mình sẽ hướng dẫn các bạn mua bán các token này tự động nhé. 

Cảm ơn mọi người đã đọc bài viết của mình. <3 Chúc các bạn một ngày tốt lành