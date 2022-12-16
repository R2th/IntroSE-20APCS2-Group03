Ở [phần 3](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-3-verify-and-publish-token-aWj53WAY56m), chúng ta đã verify, định danh thành công token của mình. Phần này, như đã nói, chúng ta sẽ tạo ra 1 contract game Oẳn tù tì để có thể lấy nó đưa vào Android App mà chơi nhé.
### 1. Tạo contract game
Đầu tiên, chúng ta tạo ra 1 class contract game (của mình là RSPGame.sol, mọi người có thể tùy ý đặt tên theo ý thích). Sau đó import IERC20 và lib tính toán như những bài trước.
![](https://images.viblo.asia/ec796a3a-8719-403e-8945-57cec8fb8370.PNG)

Import xong thì khởi tạo class, constructor,... 
![](https://images.viblo.asia/6b5e2cb3-20bb-4936-adb6-fa7e00cbbbea.PNG)

* **IERC20 public neolabToken:** khai báo để sử dụng đồng token của chúng ta đã deploy ở những [phần trước](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-3-verify-and-publish-token-aWj53WAY56m). **Lưu ý,** địa chỉ đưa vào `IERC20(xxx)` bắt buộc phải có đầy đủ chữ hoa và chữ thường, nếu không (hoa hết hoặc thường hết) sẽ dính lỗi checksum. 

Lấy địa chỉ ở vùng màu xanh sẽ chính xác, nếu lấy vùng màu đỏ sẽ bị warning checksum đấy!

![](https://images.viblo.asia/da434b6d-d11b-4fc7-88d2-3444457bcff5.PNG)

![](https://images.viblo.asia/88a9b06e-a9ce-4dc6-93cc-492959d5f5b4.PNG)

* **struct Player:** cái này giống như một đối tượng Player, constructor của nó bao gồm **amountBet**  - số token muốn đặt cược, **choose** - người chơi chọn Búa, Kéo hay Bao, **result** - kết quả của lượt chơi, **computerPlay** - lượt chơi của contract (Búa, Kéo hay Bao). 
* **event Payment** event dùng để thanh toán tiền cược cho người chơi nếu thắng hoặc hòa
* `constructor() public {
        owner = msg.sender;
    }` Người deploy là chủ của contract, sau này rút tiền có trong contract về ví owner (nếu lỗ thì khỏi thanh toán hihi)
    
Hàm rút tiền của chủ ở đây nè
```
function endSale() public {
        require(msg.sender == owner, 'Not admin');
        owner.transfer(address(this).balance * 10 / 100);
    }
```

Tiếp tục sẽ cần 1 hàm để lấy kết quả, hàm này sẽ trả về lượt chơi của contract (computerPlay) và kết quả thắng/thua/hòa của người chơi.

```
 function getResult(address _owner) public view returns(uint8, uint8){
        return (playerInfor[_owner].result,
        playerInfor[_owner].computerPlay);
    }
```

**Save the best for last,** hàm cuối cùng chắc chắn sẽ là hàm quan trọng nhất.

![](https://images.viblo.asia/9dacaee7-e679-4184-96e5-4a9e615df1b2.PNG)

Hàm trên là hàm đặt cược, mình sẽ nói qua 1 chút về hàm này:
* **require(neolabToken.allowance(msg.sender, address(this)) >= amountBet, "You must call approve() first");**  : Hàm này có tác dụng kiểm tra xem User (người chơi) đã cho phép Contract Game này được quyền sử dụng bao nhiêu đồng NeolabToken của User, và số đó có lớn hơn số họ muốn chơi không, nếu có thì sẽ tiến hành tiếp, nếu không sẽ báo lỗi và không cho tham gia.
* **require(neolabToken.transferFrom(msg.sender, address(this), amountBet), "Transfer token failed");** : Hàm này sẽ kiểm tra xem quá trình thu NeolabToken mà người chơi đặt cược có thành công hay không.
*      ```if (result == WIN) {
            require(neolabToken.transfer(msg.sender, _amountBet * 2), "Transfer token winner failed");
            emit Payment(msg.sender, _amountBet * 2);
        } else if (result == DRAW) {
            require(neolabToken.transfer(msg.sender, _amountBet), "Transfer token draw failed");
            emit Payment(msg.sender, _amountBet);
        }``` 

    Hàm này thì kiểm tra xem kết quả ra làm sao, nếu thắng thì trả về cho User 2 lần tiền cược (vì khi nãy mình đã thu rồi), nếu hòa thì trả lại y như cũ. (Nếu bạn nào thích thì có thể tự tính phí chơi, rồi trừ vào số tiền trả về thôi.)
* Mấy hàm khác chỉ là thuật toán để chơi game thôi.

**Như vậy là xong việc tạo contract ha, việc tiếp theo là deploy nó lên etherscan và dùng thử thôi**
### 2. Deploy
Các bước deploy thì tương tự như [phần 3](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-3-verify-and-publish-token-aWj53WAY56m) nhé! Các bạn lưu ý là sau khi code phải lưu lại rồi mới deploy được nha, hoặc bạn nào đã có lưu tự động rồi thì không cần để ý đoạn này.
Sau khi deploy thành công thì tiếp tục [verify and publish](https://viblo.asia/p/tao-blockchain-application-tren-android-phan-3-verify-and-publish-token-aWj53WAY56m).
### 3. Chơi thử ha!
À khoan, từ từ nha, còn nhớ 2 đoạn **required** ở code trên chớ :point_up_2:, nó quan trọng đấy.
Đầu tiên, chúng ta phải vào contract NLT (NeolabToken) để gọi hàm approve(), cho phép contract game này dùng NLT của mình đã ha.

![](https://images.viblo.asia/b9c619ed-08c4-44e8-95e9-07e07181cd6d.PNG)

Nhớ phải Connect tới Web3 bằng wallet đang chưa NLT của các bạn nhé, chứ wallet khác không có token là không chơi được đâu à.
**spender (address)** : Chỗ này thì điền address game của mình nhé ( của mình là 0x9C627536BfB1859b76E1b5648141f7b8C52abed2 )
**value (uint256)**: Chỗ này là giá trị muốn approve, điền càng nhiều càng tốt, vì khi bạn điền ít quá thì chơi game được vài lần là phải gọi lại đó. (Trong hình mình approve 300 NLT, nên lấy 300 x 10^18)

Rồi bấm **write** thôi, chờ thành công là được.
Chuyển sang mục Read Contract của NLT, kéo xuống hàm allowance() để kiểm tra xem thành công chưa nhé. (**owner (address)**: cái này là địa chỉ ví của mình, còn **spender (address)** là địa chỉ ví game ha).

![](https://images.viblo.asia/3a3958ce-33c1-4cf3-a2b7-a48cc0a20140.PNG)

Như này là thành công rồi đó ^^.

Về lại contract game của chúng ta, chuyển vào tab Write Contract, để chơi thử nè.
 ![](https://images.viblo.asia/d25b5ed8-de55-42d9-a807-d5663540b40a.PNG)

* select (uint8) : Cái này là bạn chọn option nào thì điền vào thôi, ở code mình đang quy định `ROCK = 0;  PAPER = 1;  SCISSORS = 2;` 
* amountBet (uint256): Cược bao nhiêu thì điền vào, nhớ nhân nó với 10^18 đấy, quên thì xem lại các bài trước.
* seed (string): Cái này bạn điền đại string nào đó, khi nào làm dưới app mình sẽ giải thích thêm cho.
Và bấm write thôi, chờ nó thực hiện thành công nha...

![](https://images.viblo.asia/5b1f6b30-46b8-4575-8b70-9da42ffedbf1.PNG)

Qua tab Read Contract để kiểm tra kết quả nha, điền cái địa chỉ ví mình đang chơi vào.

```
uint8 constant WIN = 3;
    uint8 constant DRAW = 2;
    uint8 constant LOSS = 1;
```

Kết quả trả về 1 như hình là mình thua rồi đó (xem ý nghĩa hàm getResult ở trên :point_up_2:).

Tada, như thế là chúng ta đã tạo xong 1 contract game rồi, phần tiếp theo mình sẽ hướng dẫn các bạn tạo app và sử dụng nó trên app android nha ^^
Chờ mình nào :hugs::hugs::hugs: