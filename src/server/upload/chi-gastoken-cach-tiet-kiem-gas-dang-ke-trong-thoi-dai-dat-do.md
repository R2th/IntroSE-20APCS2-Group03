![](https://images.viblo.asia/b2560738-f801-4a8e-befb-5021f70d8a3b.jpg)


Đến thời điểm mình viết bài này thì hiện fee gas cho một giao dịch đang vô cùng đắt đỏ do giá của ETH đã lên đến 1180$. Trong hoàn cảnh đó thì mình có tìm thấy một sản phẩm có  tên là **[Chi Gastoken](https://etherscan.io/token/0x0000000000004946c0e9f43f4dee607b0ef1fa1c)**  của một bên cũng có là có số má thời gian gân đây - [1inch.exchange](https://1inch.exchange/). **Chi** token là một lại token được sinh ra để làm giảm fee của giao dịch, vậy tại sao nó làm được điều này thì sau đây chúng ta cũng tìm hiểu nhá.


# Gastoken(GST2) là gì ?

Như chúng ta đã biết thì tất cả các transaction trên Ethereum đều cần gas, transaction càng thực hiện nhiều thay đổi càng sẽ tốn nhiều gas. Ở đây chúng ta sẽ nói đến **[Gastoken](https://gastoken.io/)**, đây là một loại token giúp cho các transactions với cùng những tác vụ như trước nhưng lại tốn ít gas hơn. **Gastoken** thì tận dụng các khoản hoàn lại do giải phóng các vùng lưu trữ trên Ethereum, có thể xem tại  **[Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)**. Điều này khuyến khích các smart contracts xóa dung lượng lưu trữ không cần thiết, Ethereum cung cấp một khoản hoàn lại cho mỗi phần tử 0. Vì vậy trong quá trình burn token của mình, smart contract của Gastoken sẽ xóa bộ nhớ mà nó đã sử dụng lúc mint token. Việc hoàn lại gas được nhiều nhất là khi tạo và hủy các sub smart contracts, chứ không phải  bằng cách ghi và xóa trực tiếp lưu trữ. 

# Chi gastoken là gì ?

Ý tưởng của **Chi** token thì dự trên sự triển khai của Gastoken GST2 trước đây. Nó là một ERC-20 hiện đang được sử dụng trên 1inch exchange để thanh toán chi phí giao dịch. Ý tưởng tương tự khái niệm của token Gastoken nhưng có một số cải tiến hơn. Giá của Chi sẽ được quy định tương ứng với giá của gas, khi gas price thấp thì giá Chi cũng  thấp và ngược lại. Điều này khá linh hoạt vì ta có thể mua và lưu trữ nó những lúc gas rẻ và dùng nó để thay thế gas khi gas price lên cao có phải rất hay đúng không. Nhưng hiện Chi thì mới chỉ hỗ trợ sử dụng trên 1inch và Curve, trong khi Gastoken thì có thể sử dụng trên toàn mạng Ethereum.


# Chi tốt hơn GST2 bao nhiêu ?
Token Chi thì tối ưu lượng gas hơn GST2 1% khi mint token và tối hưu hơn 2% khi burn token. 

![](https://images.viblo.asia/c1a3affc-a79b-4ebc-b0db-30b6aa8ffea0.jpeg)

```js
    y = 15000 * x / (20065 + 5065 * x) // GST1
    y = 24000 * x / (35974 + 6689 * x) // GST2
    y = 24000 * x / (35678 + 6053 * x) // CHI
```

# Làm thế nào để Chi có thể sử dụng được?
Để deploy contract lên mạng Ethereum thì sẽ tốn một lượng gas đáng kể và nó có thể tiêu tốn của bạn khoảng từ 5$ đến 10$ trên một triệu gas. Mà một contract thông thường có kích thước vài triệu gas. Nhưng nếu dùng Chi để burn thì cùng một transaction đó nhưng fee gas sẽ được giảm một nửa.

Đội ngũ phát triển thì đã xây dựng một tool giúp giảm fee khi deploy có tên là **[Deployer.eth](https://etherscan.io/address/deployer.eth#code)** tool này được dựng trọng cuộc thi  [ETHGlobal](https://medium.com/@ethglobalco) HackMoney Online Hackathon. Chi token thì cũng có thể được tích hợp vào bất kỳ contract nào với chỉ  vài dòng code bằng việc sử dụng theo như modifier dưới đây:

```js
    modifier discountCHI {
        uint256 gasStart = gasleft();
        _;
        uint256 gasSpent = 21000 + gasStart — gasleft() + 16 *
                           msg.data.length;
        chi.freeFromUpTo(msg.sender, (gasSpent + 14154) / 41947);
    }
```

Trong trường hợp này thì Chi token sẽ được burn từ địa chỉ gọi đến contract - msg.sender ( Như vậy thì Chi token sẽ cần phải được approve từ phía địa chỉ gọi - `msg.sendr`)

Còn trong trường hợp burn Chi token từ chính contract được gọi thì sẽ cần thay đổi `msg.sender` trong hàm `chi.freeFromUpTo` thành `address(this)`. Và đừng quên là nạp Chi token cho contract nha

# Làm sao có thể mint Chi token ?

Bạn có thể mint trực tiếp Chi token tại **[Etherscan](https://etherscan.io/token/0x0000000000004946c0e9F43F4Dee607b0eF1fA1c#writeContract)**. Cách khác đó là lên trên trang 1inch Exchange và sử dụng  tính năng Chi Minter.

![](https://images.viblo.asia/bad6adbe-e0df-45d6-a7aa-4f3815c081bf.png)

Tối đa mỗi lượt mint chỉ có thể được 140 token Chi. Điều này được giải thích bằng block limit, theo như đội phát triển thì họ làm điều này để chỉ cho phép mức giảm fee xuống đến bằng nửa block, vì nếu fee gas giảm dưới mức này các minner sẽ reject transaction do lợi nhuận quá thấp. Để tránh trường hợp đó xảy ra nên họ để một hạn mức giới hạn như vậy.

Ví dụ: Nếu bạn swap 1 ETH sử dụng Chi Minter bạn sẽ nhận được 140 Chi token và thanh toán 20Gwei gas. Nhưng họ sẽ không sử dụng hết toàn bộ 1 ETH, vì việc mint 140 Chi token không tốn nhiều fee đến như vậy. Lượng fee thực sự được sử dụng như sau :

```js
    5,125,271 gas x 20 GWEI = 5125271*20*1e9/1e18 = 0.10250542 ETH 
```

Vâng chỉ khoảng sấp xỉ 0.1 ETH sẽ được sử dụng thay vì 1 ETH. Một thứ nữa đó là khi mint token Chi và để gas price quá thấp thì ví của bạn sẽ bị khóa. Vì vậy bạn nên sử dụng một ví riêng dành cho việc mint Token Chi 

# Cách để có thể deploy smart contract với lượng gas ít hơn

Điều đầu tiên bạn cần approve token **[Chi](https://etherscan.io/address/0x0000000000004946c0e9F43F4Dee607b0eF1fA1c#writeContract)** cho **[deployer.eth](https://etherscan.io/address/deployer.eth)**. Để làm điều đó bạn cần vào phần `Write Contract` của Chi, tìm đến hàm `approve` và thực hiện approve cho địa chỉ của **deployer.eth** với một lượng amount bạn mong muốn

![](https://images.viblo.asia/e30eb5e7-16d3-4d48-844f-87e4c91af7e8.png)

Tiếp đến bạn vào **[remix.ide](https://remix.ethereum.org/)** compiler contract của mình lên rồi thực hiện Deploy và coppy data deploy đó. À coppy xong rồi thì đừng ấn `confirm` nhá không nó deploy luôn bên remix đấy.

![](https://images.viblo.asia/f0a4c600-3e02-48b2-ab00-7479faf5c83c.png)

![](https://images.viblo.asia/f9337018-5332-410d-83d7-af9d4bf673cf.png)

Rồi sau khi đã coppy xong thì sang Etherescan của **[deployer.eth](https://etherscan.io/address/deployer.eth#writeContract)** và paste data deploy vừa coppy được vào hàm `chiDeploy`.  Click `Write` và confirm transaction để thực hiện deploy

![](https://images.viblo.asia/0b05c678-aa9f-46bf-8576-d535e6d5c1ed.png)

Ồ chỉ có 51.18% gas được sử dụng và 6 token Chi đã bị burn

![](https://images.viblo.asia/20a1f0c2-0386-4b04-9928-7689e3e98231.png)

Vậy là đã deploy thành công 

# Kết luận
Mong là qua đây các bạn có thể hiểu phần nào về con token Chi này. Nó thì được tạo ra không như các ERC-20 khác nhằm mục đích đầu tư mà nó là một loại token chức năng có giá trị được tương ứng chặt chẽ bởi gas price của mạng. Sẽ không có mối tương quan nào giữa số lượng token Chi được mint và giá của nó, vì Chi được tạo ra sẵn cho bất kỳ ai vào bất kỳ lúc nào. Mục đích chính của token này được thiết kế để bị hủy và hoàn lại tiền chứ không phải để đầu tư. Nên dù hiện trên thị trường cũng đang cho phép giao dịch token này thì mọi người cùng nên cẩn thận với quyết định đầu tư của mình nha.


### Nguồn :

- https://1inch-exchange.medium.com/1inch-introduces-chi-gastoken-d0bd5bb0f92b

- https://1inch-exchange.medium.com/everything-you-wanted-to-know-about-chi-gastoken-a1ba0ea55bf3