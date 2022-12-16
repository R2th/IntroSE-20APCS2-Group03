Xây dựng các ứng dụng trên nền tảng blockchain hẳn không còn quá lạ lẫm nữa và ngày càng có nhiều sản phẩm là thành quả của công nghệ 4.0 này, một trong những khía cạnh ứng dụng mạnh mẽ nhất của Blockchain đó là xác thực (đặc biệt là xác thực tài sản số). Để có thể xây dựng trên một xã hội thực tế sẽ cần một nguồn lực không nhỏ từ đó đặt ra bài toán : **Tại sao không thử áp dụng vào thế giới ảo trước ?**  Đặc biệt là những game liên quan đến thu thập tài sản như **Pokemon GO**, ...

Có thể kể đến một đại diện vô cùng mạnh mẽ của xu hướng **Games Based On Blockchain** này là **Cryptokitty** - sau khi ra mắt đã chiếm khoảng 10% network traffic của toàn bộ mạng lớn như **Ethereum**

Bài viết hôm nay mình sẽ giới thiệu về **ERC721** - Chìa khóa thành công đứng sau Cryptokitty và rất nhiều game khác
Bài viết mình tham khảo phần lớn từ medium nên nếu ai muốn đọc bài gốc có thể xem tại [đây](https://medium.com/crypto-currently/the-anatomy-of-erc721-e9db77abfc24) nhé 

![](https://images.viblo.asia/13a7ab3e-239f-4f94-a127-bac1faa4ab7a.png)

Có thể giải thích qua cho những ai chưa biết Cryptokitty là gì như thế này : Người chơi sẽ trở thành một nhà sưu tâm đi sưu tầm(mua, bán, trao đổi)  những chú mèo điện tử (digital kitties). Mỗi chú mèo lại có một đặc điểm nào đó riêng biệt và người chơi nào đó có thể quan tâm đến một số đặc điểm thú vị nào đó và muốn sở hữu. Đơn giản chỉ là vậy, sưu tầm những thứ mình thích và tất nhiên mình cũng đã từng có thời mất ăn mất ngủ với những con tem :

![](https://images.viblo.asia/5821be2c-b813-4844-9067-a358026a3dd1.jpg)


Các bạn có thể hiểu những tài sản điện tử có khả năng thu thập sẽ được tương tự như một token trên mạng Ethereum và mỗi token này sẽ được tuân thủ theo một tiêu chuẩn chung của cộng đồng, và tất nhiên tiêu chuẩn này được gọi là **ERC721** 

## Linh hoạt và không linh hoạt (Fungible and Non-fungible)

Hơi mang tính chất lí thuyết chút nhưng khi động đến cryptocurrency thì chúng ta cũng nên trang bị một số khái niệm cơ bản

Có thể nhiều người hay nhầm giữa tính linh hoạt (fungible) và  thanh khoản (liquidity), tuy nhiên hai khái niệm này hoàn toàn **khác nhau** 

Còn đây là định nghĩa của wiki về tính linh hoạt: 
>  **fungibility** is the property of a good or a commodity whose individual units are essentially interchangeable
>  

Mình sẽ lấy một ví dụ đơn giản tiền là một thứ linh hoạt , với một đồng 20$ bạn luôn có thể đổi ngay với một người có 2 tờ 10$ vì đơn giản nó được xác định chung với đơn vị (unit) chuyển đổi (đều quy ra cả là 20 tờ 1 $ cả)

Mặt khác đối với không linh hoạt có thể lấy ví dụ là các thẻ các cầu thủ bóng đá, giá trị của các thẻ đối với mỗi cá  nhân là có giá trị khác nhau, tất nhiên đối với một fan hâm mộ của barcelona thì một tấm thẻ Leo Messi tất nhiên là sẽ có giá trị cao hơn Ronaldo

![](https://images.viblo.asia/a7631a30-562c-4ac8-a0d2-ab6f071313b0.png)

Và tất nhiên **Erc721** chính là một **Non-fungible**

**Erc721** có thể được trao đổi tuy nhiên giá trị của nó là sự kết hợp giữa sự độc đáo và tính chất hiếm có

Dưới đây là một bản mô tả ngắn gọn về **Erc721**:

```js
contract ERC721 {
   // ERC20 compatible functions
   function name() constant returns (string name);
   function symbol() constant returns (string symbol);
   function totalSupply() constant returns (uint256 totalSupply);
   function balanceOf(address _owner) constant returns (uint balance);
   // Functions that define ownership
   function ownerOf(uint256 _tokenId) constant returns (address owner);
   function approve(address _to, uint256 _tokenId);
   function takeOwnership(uint256 _tokenId);
   function transfer(address _to, uint256 _tokenId);
   function tokenOfOwnerByIndex(address _owner, uint256 _index) constant returns (uint tokenId);
   // Token metadata
   function tokenMetadata(uint256 _tokenId) constant returns (string infoUrl);
   // Events
   event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
   event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
}
```

## Các function trong ERC721

Nhìn qua thì sẽ thấy có kha khá function giống với **ERC20**. Nó thực hiện điều này để giúp các ví hiện tại dễ dàng hiển thị thông tin đơn giản về mã thông báo. Các chức năng này cho phép hợp đồng thông minh phù hợp với tiêu chuẩn này hoạt động giống như một loại tiền điện tử thông thường như Bitcoin hoặc Ethereum bằng cách xác định các chức năng cho phép người dùng thực hiện các hành động như gửi **token** cho người khác và kiểm tra số dư tài khoản.


### **Các  hàm phổ biến :**


**name**

Chức năng này được sử dụng để hiển thị các hợp đồng và ứng dụng bên ngoài tên của mã thông báo này. Một ví dụ thực hiện chức năng có thể như sau:
```js
contract MyNFT {
  function name() constant returns (string name){
    return "My Non-Fungible Token";
  }
}
```
**totalSupply**

Hàm này trả về tổng số coin có sẵn trên blockchain. Việc cung cấp không phải là hằng số. và số lượng supply là không phải một hằng số
```js
contract MyNFT {
  // This can be an arbitrary number
  uint256 private totalSupply = 1000000000;
  function totalSupply() constant returns (uint256 supply){
    return totalSupply;
  }
}
```

**balanceOf**

Hàm này được sử dụng để tìm số lượng token mà một địa chỉ đã cho sở hữu.
```js
contract MyNFT {
  mapping(address => uint) private balances;
  function balanceOf(address _owner) constant returns (uint balance)
  {
    return balances[_owner];
  }
}
```

### Các hàm sở hữu:
Các chức năng này xác định cách hợp đồng sẽ xử lý quyền sở hữu token và cách chuyển quyền sở hữu. Đáng chú ý nhất trong số các chức năng này là **takeOwnership** và **transfer**, tương ứng như các chức năng rút và gửi, và rất cần thiết để cho phép người dùng chuyển token lẫn nhau.

**ownerOf:**

Hàm này trả về địa chỉ của chủ sở hữu token. Bởi vì mỗi token ERC721 không linh hoạt và do đó, là duy nhất, nên nó đã tham chiếu trên blockchain thông qua một ID duy nhất. Do đó có thể xác định chủ sở hữu của mã thông báo bằng ID của nó
```js
contract MyNFT {
  mapping(uint256 => address) private tokenOwners;
  mapping(uint256 => bool) private tokenExists;
  function ownerOf(uint256 _tokenId)
  constant returns (address owner) {
    require(tokenExists[_tokenId]);
    return tokenOwners[_tokenId];
  }
}
```

**approve:**

Hàm này phê duyệt hoặc cấp quyền cho một địa chị khác để chuyển mã thông báo thay mặt cho chủ sở hữu. Ví dụ: nếu Alice sở hữu 1 MyNFT, cô ấy có thể gọi hàm phê duyệt cho người bạn Bob của mình. Sau khi gọi thành công, Bob có thể sở hữu hoặc thực hiện các hoạt động trên token đó thay mặt cho Alice. Thông tin thêm về chuyển quyền sở hữu có thể được nhìn thấy trong các chức năng **TakeOwnership** và **transfer**.
```js
contract MyNFT {
  mapping(address => mapping (address => uint256)) allowed;
  function approve(address _to, uint256 _tokenId){
    require(msg.sender == ownerOf(_tokenId));
    require(msg.sender != _to);
    allowed[msg.sender][_to] = _tokenId;
    Approval(msg.sender, _to, _tokenId);
  }
}
```
**takeOwnership:**

Hàm này hoạt động giống như function withdraw, vì một địa chỉ bên ngoài có thể gọi nó để lấy token ra khỏi tài khoản người dùng khác. Do đó, TakeOwnership có thể được sử dụng khi người dùng đã được chấp thuận sở hữu một số lượng token nhất định và muốn rút các token nói trên từ số dư của người dùng khác.
```js
contract MyNFT {
  function takeOwnership(uint256 _tokenId){
    require(tokenExists[_tokenId]);
    address oldOwner = ownerOf(_tokenId);
    address newOwner = msg.sender;
    require(newOwner != oldOwner);
    require(allowed[oldOwner][newOwner] == _tokenId);
    balances[oldOwner] -= 1;
    tokenOwners[_tokenId] = newOwner;
    balances[newOwner] += 1;
    Transfer(oldOwner, newOwner, _tokenId);
  }
}
```
**transfer:**

Phương thức chuyển mã thông báo tiếp theo là sử dụng chức năng này. **transfer** cho phép chủ sở hữu token gửi nó cho người dùng khác, tương tự như các đồng tiền mã hóa khác. Tuy nhiên, việc **transfer** chỉ có thể được thực hiện nếu tài khoản nhận trước đó đã được **approved** để sở hữu mã thông báo bằng tài khoản gửi.

```js
contract MyNFT {
  mapping(address => mapping(uint256 => uint256)) private ownerTokens;
  function removeFromTokenList(address owner, uint256 _tokenId) private {
    for(uint256 i = 0;ownerTokens[owner][i] != _tokenId;i++){
      ownerTokens[owner][i] = 0;
    }
  }
  function transfer(address _to, uint256 _tokenId){
    address currentOwner = msg.sender;
    address newOwner = _to;
    require(tokenExists[_tokenId]);
    require(currentOwner == ownerOf(_tokenId));
    require(currentOwner != newOwner);
    require(newOwner != address(0));
    removeFromTokenList(_tokenId);
    balances[oldOwner] -= 1;
    tokenOwners[_tokenId] = newOwner;
    balances[newOwner] += 1;
    Transfer(oldOwner, newOwner, _tokenId);
  }
}
```

**tokenOfOwnerByIndex:**

Mỗi chủ sở hữu token không linh hoạt (non-fungible) có thể sở hữu nhiều token cùng một lúc. Tuy nhiên, vì mỗi token được tham chiếu bởi ID duy nhất của nó, tuy nhiên, có thể khó theo dõi các mã thông báo riêng lẻ mà người dùng có thể sở hữu. Để làm điều này, **contract** giữ một bản ghi ID của từng **token** mà mỗi người dùng sở hữu. Do đó, mỗi token thuộc sở hữu của người dùng có thể được truy xuất theo chỉ mục của nó trong danh sách (mảng) token do người dùng sở hữu. **tokenOfOwnerByIndex** cho phép chúng ta lấy **token** theo phương thức này

```js
contract MyNFT {
  mapping(address => mapping(uint256 => uint256)) private ownerTokens;
  function tokenOfOwnerByIndex(address _owner, uint256 _index) constant returns (uint tokenId){
    return ownerTokens[_owner][_index];
  }
}
```

### Hàm siêu dữ liệu
Giống như chúng tôi đã nói trước đây, điều làm cho các đối tượng **non-fungible** là bộ thuộc tính độc đáo của chúng. Một đô la và thẻ bóng đá là **non-fungible**, bởi vì chúng có những đặc điểm khác nhau. Nhưng, việc lưu trữ dữ liệu trên blockchain cho biết các đặc điểm xác định của từng mã thông báo là cực kỳ tốn kém và không được đề xuất. Để đối mặt với điều này, chúng ta có thể lưu trữ các tham chiếu, như liên kết băm [IPFS](https://ipfs.io/) hoặc HTTP (S), đến từng thuộc tính mã thông báo trên chuỗi để một chương trình bên ngoài chuỗi có thể thực thi logic để tìm thêm thông tin về mã thông báo. Các tài liệu tham khảo này là dữ liệu về dữ liệu hoặc siêu dữ liệu.

**tokenMetadata:**

```js
contract MyNFT {
  mapping(uint256 => string) tokenLinks;
  function tokenMetadata(uint256 _tokenId) constant returns (string infoUrl) {
    return tokenLinks[_tokenId];
  }
}
```

### Event

Các event được kích hoạt bất cứ khi nào một **contract** gọi đến nó. Các chương trình bên ngoài lắng nghe các sự kiện blockchain để chúng có thể thực thi logic sau khi sự kiện được kích hoạt bằng cách sử dụng thông tin mà sự kiện cung cấp. Tiêu chuẩn ERC721 định nghĩa hai sự kiện như sau.

**Transfer:**

Sự kiện này được kích hoạt bất cứ khi nào một token được trao đổi. Nó sẽ phát sóng khi quyền sở hữu token di chuyển từ người dùng này sang người dùng khác. Nó nêu chi tiết địa chỉ nào đã gửi mã thông báo, địa chỉ nào đã nhận mã thông báo và mã thông báo nào (theo ID) đã được chuyển.

```js
contract MyNFT {
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
}
```

**Approval:**

Sự kiện này được kích hoạt bất cứ khi nào địa chỉ chấp thuận địa chỉ khác để sở hữu mã thông báo (nghĩa là bất cứ khi nào phê duyệt được thực thi). Nó nêu chi tiết địa chỉ nào hiện đang sở hữu mã thông báo, địa chỉ nào được phép sở hữu token trong tương lai và token nào (theo ID) được chấp thuận để chuyển quyền sở hữu.

```js
contract MyNFT {
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
}
```

## Kết
Trên đây là những khái niệm tương đối cơ bản về tiêu chuẩn ERC721, cái khung để tạo nên Cryptokitties đình đám và cũng như nhiều game based on Ethereum khác

## Tham khảo

- [Medium](https://medium.com/crypto-currently/the-anatomy-of-erc721-e9db77abfc24)