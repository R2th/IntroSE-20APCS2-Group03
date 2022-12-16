![](https://images.viblo.asia/97c3f65e-2478-4012-8c15-a67b2d3788b8.png)

Là một trong mạng được xây dựng từ Substrate Framework, và cũng là một đối thủ đáng gờm để trở thành một Parachain cho Polkadot trong tương lai. Polkadot Relaychain về cơ bản không hỗ trợ các Smart Contrac, và đó cũng chính là cơ hội cho Plasm để lấp đầy khoảng trống đó.

Và thêm một điểm mà các lập trình viên vô cùng thích đó chính là PLASM hoàn toàn opensource: https://github.com/PlasmNetwork

# Giới thiệu

Thay vì việc viết các smart contract bằng Web thì Plasm đem đến sự quen thuộc cho những Ethereum developer, họ có thể thoải mái viết contract Solidity và deploy lên Plasm vì Plasm hỗ trợ EVM, hiện tại họ có thể hỗ trợ các smart contract chạy trên mạng testnet Dusty (tương lai sẽ là Shiden nếu thành công auction trên Kusama).

![](https://images.viblo.asia/304163a3-25a1-4460-8972-d6d3420e2d4c.gif)


# Thực hành

Trong phần này mình sẽ hướng dẫn các bước để có thể xây dựng một Dapp hoàn chỉnh trên mạng Dusty

## Config metamask

Đầu tiên để tương tác với các Dapp cũng như tương tác với Remix để kí các transaction.

Ta sẽ config lại network với các thông số sau:

* Network Name: Dusty
* New RPC URL: https://rpc.dusty.plasmnet.io:8545
* Chain ID: 80
* Current Symbol: PLD

![](https://images.viblo.asia/0becd4e8-9e11-4324-993f-a53bb125c7ad.png)

Tạm thời thì Dusty chưa hộ trợ BlockExplorer do đó việc debug khi transaction gặp lỗi là khá khó khăn, tuy nhiên hãy chờ đợi những bản hoàn chỉnh hơn trên Shiden - hi vọng lúc đó các công cụ cho developers đã được đầu tư nhiều hơn.

## Faucet

Để có thể Deploy hay tạo được transaction thì trước tiên chúng ta phải có native token trên Plasm, như trên config thì native token ở đây có symbol là **PLD**

Để có thể faucet một chút PLD thuận tiện cho việc test, các bạn có thể faucet trực tiếp tại đây :

https://plasm-faucet-frontend.vercel.app/

Tuy nhiên chúng ta đang sử dụng metamask nên địa chỉ account sẽ có dạng của ETH address, do đó chúng ta cần một số bước để có thể lấy đúng được địa chỉ để có thể nhận faucet.

Đầu tiên là convert từ địa chỉ ETH sang dạng prefix 5 thông qua : https://hoonsubin.github.io/evm-substrate-address-converter/index.html

![](https://images.viblo.asia/2c392169-765a-47ef-9ae6-6da2ce423ff3.png)

Sau khi lấy được địa chỉ convert sang dạng prefix 5 thì sẽ chuyển sang đây để có thể lấy được đúng địa chỉ trên Plasm tương ứng với địa chi bên Metamask: https://polkadot.subscan.io/tools/ss58_transform

![](https://images.viblo.asia/09efe193-e591-4bec-8a61-573518c201da.png)

Địa chỉ có Prefix 5 kia chính là thứ mà chúng ta cần tìm kiếm, copy và lấy faucet từ đây thôi nào: 
https://plasm-faucet-frontend.vercel.app/

![](https://images.viblo.asia/435a577e-8291-4fb1-a2d0-50fabc51ca9f.png)

Và sau đó chúng ta đã có lượng PLD cho việc test

**Note:** Do decimal của PLD là 15 khác với mặc định của Metamask là cho các native token có decimal là 18 do đó với 1 PLD hiển thị trong metamask chúng ta sẽ ngầm hiểu là tương ứng với 1000 PLD trong mạng Dusty.

Và đã đủ tiền để trả phí transaction, tiếp theo chúng ta sẽ xây một vài Dapp 

## Dapp

### Smart Contract

Chúng ta sẽ sử dụng Remix để code cũng như deploy contract lên Dusty : https://remix.ethereum.org/

Trong bài viết mình sẽ demo một Dapp nhỏ đã được demo trong ETH workshop India : Airbnb smart contract

```js
pragma solidity ^0.5.7;

contract Airbnb {

  // Property to be rented out on Airbnb
  struct Property {
    string name;
    string description;
    bool isActive; // is property active
    uint256 price; // per day price in wei (1 ether = 10^18 wei)
    address owner; // Owner of the property
    // Is the property booked on a particular day,
    // For the sake of simplicity, we assign 0 to Jan 1, 1 to Jan 2 and so on
    // so isBooked[31] will denote whether the property is booked for Feb 1
    bool[] isBooked;
  }

  uint256 public propertyId;

  // mapping of propertyId to Property object
  mapping(uint256 => Property) public properties;

  // Details of a particular booking
  struct Booking {
    uint256 propertyId;
    uint256 checkInDate;
    uint256 checkoutDate;
    address user;
  }

  uint256 public bookingId;

  // mapping of bookingId to Booking object
  mapping(uint256 => Booking) public bookings;

  // This event is emitted when a new property is put up for sale
  event NewProperty (
    uint256 indexed propertyId
  );

  // This event is emitted when a NewBooking is made
  event NewBooking (
    uint256 indexed propertyId,
    uint256 indexed bookingId
  );

  /**
   * @dev Put up an Airbnb property in the market
   * @param name Name of the property
   * @param description Short description of your property
   * @param price Price per day in wei (1 ether = 10^18 wei)
   */
  function rentOutproperty(string memory name, string memory description, uint256 price) public {
    Property memory property = Property(name, description, true /* isActive */, price, msg.sender /* owner */, new bool[](365));

    // Persist `property` object to the "permanent" storage
    properties[propertyId] = property;

    // emit an event to notify the clients
    emit NewProperty(propertyId++);
  }

  /**
   * @dev Make an Airbnb booking
   * @param _propertyId id of the property to rent out
   * @param checkInDate Check-in date
   * @param checkoutDate Check-out date
   */
  function rentProperty(uint256 _propertyId, uint256 checkInDate, uint256 checkoutDate) public payable {
    // Retrieve `property` object from the storage
    Property storage property = properties[_propertyId];

    // Assert that property is active
    require(
      property.isActive == true,
      "property with this ID is not active"
    );

    // Assert that property is available for the dates
    for (uint256 i = checkInDate; i < checkoutDate; i++) {
      if (property.isBooked[i] == true) {
        // if property is booked on a day, revert the transaction
        revert("property is not available for the selected dates");
      }
    }

    // Check the customer has sent an amount equal to (pricePerDay * numberOfDays)
    require(
      msg.value == property.price * (checkoutDate - checkInDate),
      "Sent insufficient funds"
    );

    // send funds to the owner of the property
    _sendFunds(property.owner, msg.value);

    // conditions for a booking are satisfied, so make the booking
    _createBooking(_propertyId, checkInDate, checkoutDate);
  }

  function _createBooking(uint256 _propertyId, uint256 checkInDate, uint256 checkoutDate) internal {
    // Create a new booking object
    bookings[bookingId] = Booking(_propertyId, checkInDate, checkoutDate, msg.sender);

    // Retrieve `property` object from the storage
    Property storage property = properties[_propertyId];

    // Mark the property booked on the requested dates
    for (uint256 i = checkInDate; i < checkoutDate; i++) {
      property.isBooked[i] = true;
    }

    // Emit an event to notify clients
    emit NewBooking(_propertyId, bookingId++);
  }

  function _sendFunds (address beneficiary, uint256 value) internal {
    // address(uint160()) is a weird solidity quirk
    // Read more here: https://solidity.readthedocs.io/en/v0.5.10/050-breaking-changes.html?highlight=address%20payable#explicitness-requirements
    address(uint160(beneficiary)).transfer(value);
  }

  /**
   * @dev Take down the property from the market
   * @param _propertyId Property ID
   */
  function markPropertyAsInactive(uint256 _propertyId) public {
    require(
      properties[_propertyId].owner == msg.sender,
      "THIS IS NOT YOUR PROPERTY"
    );
    properties[_propertyId].isActive = false;
  }
}
```

Việc còn lại của chúng ta đó chính là compile và connect mạng Dusty qua metamask và deploy, contract sau khi deploy thành công sẽ xuất hiện :
![](https://images.viblo.asia/b80341de-feae-4503-9b69-c7089fadc58f.png)

### UI

Sau khi deploy xong chúng ta sẽ có một contract chạy trên Dusty, việc tiếp theo đó chính là xây dựng UI để tương tác với contract đó, mình cũng đã chuẩn bị sẵn 1 folder để các bạn có thể test trực tiếp trên đó, các bạn có thể clone về và áp địa chỉ contract vào là có thể test và vọc luôn:

Trong repo này đòi hỏi chúng ta nên tìm hiểu trước một chút về **Nuxt** và **Web3js**

https://github.com/tranchien2002/dustyPLM-demo

Đầu tiên là thay đổi địa chỉ contract ở file:

https://github.com/tranchien2002/dustyPLM-demo/blob/7e65fd050def7992dd008dce81aed215a5ceec49/dapp-ui/plugins/utils.js#L7

tạm thời sau khi thay bằng địa chỉ contract mới deploy phía trên là chúng ta có thể chạy thử để test luôn

```js
yarn install
cd dapp-ui
yarn dev
```

![](https://images.viblo.asia/c87332b5-da8e-4411-b526-953ca15ec766.png)


Chạy thử vào tạo một transaction, và đây là kết quả sau khi transaction thành công

![](https://images.viblo.asia/fc3ca9a4-e003-4159-9579-33c81e806d15.png)

# Kết luận

Và cuối cùng thì chúng ta cũng đã chạy được một Dapp hoàn chỉnh trên Dusty - testnet của Plasm. Đối với những Ethereum dev thì sẽ khá tưởng đồng với việc xây dựng trên ETH hay các blockchain hỗ trợ EVM khác nói chung. Hi vọng bài viết của mình có thể giúp đỡ được cho các bạn đang bắt đầu tìm hiểu về các parachain của Polkadot