Sau khi viết bài về cách [setup môi trường](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-1-E375z4AjZGW) để làm việc, thì ở bài này mình sẽ hướng dẫn các bạn tạo ra token của riêng mình để có thể dùng nó làm đồng tiền lưu thông chính trong app của chúng ta.
### 1. Lựa chọn chuẩn của token trên Ethereum.
Ở [phần 1](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-1-E375z4AjZGW) mình đã có nhắc qua về [ERC20](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-1-E375z4AjZGW), nay mình sẽ nói lí do mình chọn nó và nó có những điều kiện, chuẩn gì cần đáp ứng.

ERC-20 là một Token tiêu chuẩn trên nền tảng Blockchain Ethereum được sử dụng phổ biến nhất hiện nay, có đến trên 90% các dự án ICO hiện nay đều sử dụng token chuẩn ERC20. Tính tới 26/07/2018, có tổng tộng 103,621 Token tương thích với ERC-20 được tìm thấy trên mạng lưới Ethereum.

Vậy chuẩn ERC-20 thì sẽ có những gì? Nó sẽ có các function sau
```
totalSupply() public view returns (uint256 totalSupply) 
balanceOf(address _owner) public view returns (uint256 balance)
transfer(address _to, uint256 _value) public returns (bool success)
transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
approve(address _spender, uint256 _value) public returns (bool success)
allowance(address _owner, address _spender) public view returns (uint256 remaining) 
```

Mình sẽ giải thích chút qua các hàm này:
* totalSupply(): Hàm này có tác dụng trả về tổng số token của bạn đang tồn tại trên thị trường, trên mạng lưới Ethereum. Vậy thì ai là người quy định số token này, chính là bạn đấy. Các bạn sẽ là người quyết định xem sẽ có bao nhiêu token lưu thông trong code. Trong quá trình thực hành mình sẽ note cho các bạn thấy.
* balanceOf(address **owner**): Giống như tên hàm của nó, ở hàm này khi các bạn truyền vào **địa chỉ** cần kiểm tra thì nó sẽ trả về cho bạn số token đang có trong địa chỉ (ví) đó.
* transfer(address **to**, uint256 **value**): Với Hàm này thì nó sẽ có chức năng chuyển 1 số lượng token từ ví của người gọi đến ví của người khác (địa chỉ đích).
* transferFrom(address **from**, address **to**, uint256 **value**): Hàm này thường dùng cho việc thanh toán, nghĩa là nó sẽ thay mặt mình chuyển thằng token về cho 1 ví khác. Ví dụ chỗ này cho dễ hiểu, giả sử người yêu của bạn order sữa tắm và địa chỉ người nhận là ở công ty bạn làm việc. Lúc này khi shipper đến giao, thì bạn sẽ thay mặt người yêu của bạn, chuyển tiền từ **ví của bạn** đến **ví của shipper** một giá trị **value**.
* approve(address **spender**, uint256 **value**): Hàm này cấp phép cho **transferFrom** có thể chuyển bao nhiêu token đi. Theo ví dụ trên thì bạn cấp cho người yêu mình 500k và cô ấy chỉ có thể order trong mức 500k trở lại.
* allowance(address **owner**, address **spender**): Hàm này đơn giản là kiểm tra xem số token mà **spender** vẫn được phép rút từ **owner**. Ví dụ người yêu bạn đã order hết 350k thì hàm này đơn giản là sẽ trả về value = 150k.

Ngoài ra ERC-20 còn có 2 event quan trọng:
```
Transfer(address indexed _from, address indexed _to, uint256 _value). 
Approval(address indexed _owner, address indexed _spender, uint256 _value)
```
Transfer event thì dùng cho function **transfer** và **transferFrom** còn Approval Event thì dùng cho **approve**.

Ok nhó! Bắt đầu thực hành thôi nào.
### 2. Tạo token của RIÊNG BẠN
Ở đây chúng ta sẽ sử dụng ngôn ngữ Solidity(khá giống hướng đối tượng) nhé
```
npm install -g solc
```
Chỉ cần 1 dòng như trên là cài xong ngôn ngữ Solidity rồi, code thôi.

Đầu tiên là tạo một interface theo chuẩn ERC-20 (tạo trong folder **contracts**).
![](https://images.viblo.asia/698e290d-1482-4fe9-a36c-fe178eae0ce8.PNG)
Ở đây mình dùng vers 0.4.25 vì theo mình thấy thì nó ổn định nhất, các bạn có thể up ver tùy thích. Lưu ý là nó phải mapping với file truffle-config nha!

Tiếp theo là tạo một lib **SafeMath.sol** để đảm bảo rằng việc tính toán của bạn diễn ra chính xác nhất. 
![](https://images.viblo.asia/876ecf4e-3e96-4469-97ec-1837c31222dd.PNG)
Trong đó: 
* **uint256:** là một kiểu dữ liệu kiểu int, có size là 256 bit. Tương tự, chúng ta vẫn có **uint8, uint16, uint24, uint32, uint64, uint128**. Sau này mình sẽ có một bài viết khác để nói về các kiểu dữ liệu này, lí do vì sao chọn. Còn ở giới hạn trong **SafeMath.sol** thì tất nhiên chúng ta sẽ chọn size lớn nhất để đảm báo việc tính toán các con số lớn rồi.
* **require:** Lệnh này thì tương tự như một lệnh **if**. Ví dụ **require(c >= a)** thì sẽ tương tự **if(c>=a)**, nếu đảm bảo điều kiện đúng thì mới có thể thực hiện lệnh tiếp theo ở dưới.

Tiếp theo chúng ta sẽ implement IERC20 đã viết ở trên.
```
pragma solidity ^0.4.25;

import "./IERC20.sol";
import "./SafeMath.sol";

contract ERC20 is IERC20 {
    using SafeMath for uint256;

    mapping(address => uint256) internal _balances;
    //Mapping xem như là một đối tương, dựa vào địa chỉ ví (address) => trả về giá trị của ví đó (kiểu uint256)
    mapping(address => mapping(address => uint256)) private _allowed;
    //trả về giá trị còn được cho phép sử dụng (hàm allowance())

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender,uint256 value);
    //hai event của ERC20

    uint256 internal _totalSupply;
    //tổng cung

    constructor(uint _supply) public {
        _totalSupply = _supply;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    modifier validAddress(address _to){
        require(_to != address(0x0), 'Transfer to address OxO!');
        //kiểm tra địa chỉ ví khác địa chỉ 0x0
        _;
    }

    modifier validValue(address _from, uint256 _value){
        require (_value <= _balances[_from], 'No enough value!');
        _;
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return _balances[_owner];
        // trả về số token đang có trong ví của owner
    }

    function transfer(address _to, uint256 _value) validAddress(_to) public returns (bool) {
        _transfer(msg.sender, _to, _value);
        // chuyển token từ ví Sender đến ví To
        return true;
    }

    function approve(address _spender, uint256 _value) validAddress(msg.sender) validAddress(_spender) public returns (bool) {
        _approve(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowed[owner][spender];
    }

    function transferFrom(address _from, address _to, uint256 _value) validAddress(_to) validValue(_from, _value) public returns (bool) {
        _transfer(_from, _to, _value);
        _approve(_from, msg.sender, _allowed[_from][msg.sender].sub(_value));
        return true;
    }

    function increaseAllowance(address _spender, uint256 _addValue) validAddress(_spender) public returns (bool) {
         _approve(msg.sender, _spender, _allowed[msg.sender][_spender].add(_addValue));
        return true;
    }

    function decreaseAllowance(address _spender, uint256 _addValue) validAddress(_spender) public returns (bool) {
        _approve(msg.sender, _spender, _allowed[msg.sender][_spender].sub(_addValue));
        return true;
    }

    function _transfer(address from, address to, uint256 value) internal {
        _balances[from] = _balances[from].sub(value);
        //lấy token từ ví gửi
        _balances[to] = _balances[to].add(value);
        //gửi token đến ví nhận
        emit Transfer(from, to, value);
        //emit dùng để gọi event
    }

    function _approve(address owner, address spender, uint256 value) internal {
        require(spender != address(0));
        require(owner != address(0));

        _allowed[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: burn from the zero address");

        _balances[account] = _balances[account].sub(amount);
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
        // gửi số token vào địa chỉ 0x0 để làm tăng độ hiếm của token trên thị trường => độ hiếm tăng thì giá trị tự nhiên sẽ tăng (cái này áp dụng cho ICO)
    }
}
```

Mình đã comment khá kỹ các function khó hiểu trong đoạn code trên. Nếu có gì thắc mắc mà không giải thích được thì comment xuống dưới để mình giải thích cho nhé :D

Vào phần quan trọng nhất thôi, bắt đầu tạo token của riêng ta nào!

![](https://images.viblo.asia/940a35bf-cafe-4508-ab86-ef41dbc67176.PNG)

Giải thích chút nhé:
* **Name:** Tức là tên của token mà bạn muốn đặt đó
* **symbol:** Kí hiệu của token đó
* **address owner:** Nghĩa là chủ nhân của token sau khi deploy, Ở phía dưới có dòng **owner = msg.sender** trong **constructor()**, nghĩa là ai deploy thì người đó là chủ của cái ví luôn đó ^^. Do chúng ta đã cấu hình [private key](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-1-E375z4AjZGW) trong file truffle-config, nên ví đó sẽ là chủ nhân ha.
* **decimals:** Nghĩa là độ chia nhỏ nhất cho token (tối đa 18 số 0 – tương đương 1 tỉ tỉ đơn vị). Do trên Ethereum không có số thập phân, nên ta dùng decimal để biểu diễn.
* **rate = 4000** Tức là cứ 4000 NeolabToken sẽ đổi được 1 ETH.
* **event TokenBought** Cái này dành cho những người có ETH và muốn mua NeolabToken

> _balances[msg.sender] = 10e6 * (10 ** uint256(decimals));
    _balances[address(this)] = _totalSupply - balanceOf(msg.sender);
   
Dòng đầu là chia token cho người deploy 10^6 token.
Dòng thứ hai là gán cho địa chỉ của chính đồng NeolabToken số lượng còn lại (để người khác muốn có thì phải mua).
* **function buyToken() public payable** Đây là function dùng để mua token. Lưu ý từ khóa **payable** cho phép function có thể nhận Ether, nếu không có key này thì sẽ không hoạt động đâu nha.

### Tada, vậy là code xong rồi nè. Đơn giản mà! Giờ thì deploy và cảm nhận thôi.
Trong folder **migrations**, chúng ta tạo file **2_deploy_contract.js**, sau đó add đoạn code
```
const NeolabToken = artifacts.require("NeolabToken");

module.exports = function(deployer) {
  deployer.deploy(NeolabToken);
};
```

Nhớ lưu file lại, rồi chạy `truffle migrate --network ropsten` như cũ thôi :D.

![](https://images.viblo.asia/8b83ea52-3b49-465c-b337-2cefcec9af78.PNG)

**Xong!**. Vậy là đã có NeolabToken rồi đó, copy txhash rồi dán lên etherscan thôi. Lưu ý, phải lưu **contract address** ra một nơi nào đó để phần tiếp theo dùng nha.
![](https://images.viblo.asia/a9390f99-70f5-42ca-ac51-8935f0bd3ade.PNG)

Okay, [phần tiếp theo](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-3-verify-and-publish-token-aWj53WAY56m) mình sẽ hướng dẫn các bạn [verify token](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-3-verify-and-publish-token-aWj53WAY56m)vừa deploy để nó có thể hiện tên, tuổi khi chúng ta vào xem nhé :kissing:
Hẹn gặp lại!