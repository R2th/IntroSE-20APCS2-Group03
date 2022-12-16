Đối với những blockchain developer đặc biệt là những người anh em theo môn phái Ethereum chắc hẳn một năm vừa qua đã phải vắt chân lên cổ học tập những kiến thức mới nhỉ . Nào là học về stacking,  farming, swap,... và các nền tảng khác của Defi khác, chưa dừng lại ở đó mới quay đi quay lại là một lô một lốc các update mới của web3, metamask,... mà không học là lại tối cổ ngay :'( . Solidity cũng thế lại ra phiên bản 0.8.0 mới tinh và bài viết của mình sẽ tổng hợp những thay đổi để anh em nắm đc và upgrade các contract của mình lên phiên bản mới nhất .

![](https://images.viblo.asia/f1c6cfa9-1ed7-484a-b006-a917c5c2aef2.png)

Thay đổi chính trong bản 0.8.x này tập trung vào các phép toán . Ví dụ nếu như trước đây chúng ta cần đến hàm SafeMath để thực hiện phép cộng **x+y** để check xem có overflow không thì bh việc check đc được xử lý default rồi vì thế chúng ta ko cần SafeMath nữa .

# Checked Arithmetic ( check các biểu thức toán học )
Chi tiết hơn cho ví dụ trên thì tính năng **Checked Arithmetic** đưuọc chia ra làm 3 tính năng con
- Revert về lỗi xác nhận và các điều kiện tương tự thay vì sử dụng mã opcode không hợp lệ
- Actual checked arithmetic
- **unchecked** blocks

## Trả lại rõ các lỗi thay vì chỉ trả về các invalid opcode (opcode không rõ ràng) 
Trước đây, các lỗi internal như chia cho 0, truy cập mảng vượt quá giới hạn, v.v., sẽ dẫn đến việc hiện ra invalid opcode. Ý tưởng chính của sửa đổi này là để phân biệt các lỗi critical với các lỗi non-critical như invalid input , ko đủ balance khi transfer token, v.v. Các lỗi không nghiêm trọng này sử dụng revert opcode .

Vấn đề với invalid opcode là trái với revert opcode nó tiêu thụ gas vì thế quá trình này rất tốn kém .

Nhà phát triển muốn coi việc tràn số là Critical errors, nhưng không muốn làm cho nó tiêu thụ hết gas. Cụ thể hơn thì vẫn sẽ dùng revert opcode nhưng sẽ cung cấp error data để có thể phân biệt 

Cụ thể thì :

**Non-critical errors** sẽ revert với dữ liệu lỗi trống hoặc với dữ liệu lỗi tương ứng với ABI-encoding của một lệnh gọi hàm đến hàm **Error(string)**.

**Critical errors** revert với dữ liệu lỗi tương ứng với ABI-encoding của lệnh gọi hàm đến hàm **Panic (uint256)**.

Do đó, nhà phát triển cũng sử dụng thuật ngữ "**Panic**" cho những lỗi nghiêm trọng như vậy.

Một số mã lỗi : 

1. 0x01 : Khi gọi hàm **assert** với argument đánh giá là false
2. 0x11 : Nếu như một phép toán số học tạo ra kết quả underflow hoặc overflow của unchecked block .
3. 0x12 : Khi chia cho 0 ( e.g. 5 / 0 hay 23 % 0 )
4. 0x21 : khi convert gúa trị quá lớn hoặc âm thành **enum** type 
5. 0x31 : Khi chúng ta gọi **.pop()** từ một array rỗng
6. 0x32 : khi truy cập giá trị của mảng mà index nằm ngoài giới hạn của mảng hoặc âm ( tức là ```x[i] vs i > x.lenth hoặc i <0 ```
7. 0x41 : Nếu bạn phân bổ quá nhiều bộ nhớ hoặc tạo một mảng quá lớn.
8. 0x51 : Nếu bạn gọi một biến không được khởi tạo 

## Actual Checked Arithmetic
Theo mặc định, tất cả các phép toán số học sẽ thực hiện kiểm tra overflow và kiểm tra underflow (Solidity đã có kiểm tra chia cho 0). Trong trường hợp underflow hoặc overflow, lỗi **Panic (0x11)** sẽ được đưa ra sau đó sẽ revert.

Ví dụ, đoạn mã sau sẽ gây ra lỗi như vậy:
```js
contract C {
    function f() public pure {
        uint x = 0;
        x--;
    }
}
```
Việc kiểm tra dựa trên type của biến ,nếu type của bạn là uint8 và nếu kết quả lớn hơn 255, nó sẽ kích hoạt Panic.

Đội phát triển đã thêm việc check vào những phép toán sau
- cộng ( + ) , trừ ( - ), nhân( * ), chia( / )
- tăng và giảm ( ++ / -- )
- âm ( - )
- lỹ thừa ( ** )

```js
function f() pure {
    int8 x = -128;
    -x;
}
```
đoạn code trên sẽ kích hoạt Panic vì int8 là giá trị trong khoảng -128 đến 127 vậy khi -x sẽ vượt quá khoảng giá trị của int8

```js
function f() pure {
    int8 x = -128;
    x/(-1);
}
```
tương tự phép chia cho -1 cũng dẫn đến lỗi như trên

Bất cứ ai khi viết hàm SafeMath đều sẽ nhận ra rằng nó rất tốn kém vì EVM không cung cấp việc báo tràn số . Về cơ bản, bạn phải thực hiện quy trình check exception của riêng mình .
# **unchecked** Blocks
Từ khi việc kiểm tra số học dùng nhiều gas, như đã đề cập trong phần trước và vì đôi khi bạn thực sự muốn wrapping,đội ngũ phát triển đã cung cấp một cách để disable việc check số học.

Bất kỳ block nào nằm bên trong **unchecked {...}** đều ko check số học . Bạn có thể sử dụng block đặc biệt này như một câu lệnh thông thường bên trong một block khác :
```js
contract C {
    function f() public pure returns (uint) {
        uint x = 0;
        unchecked { x--; }
        return x;
    }
}
```
Ngoài ra cũng có mội số giới hạn khi sử dụng **unchecked** block
1. Không thể sử dụng **_ ;**  trong nó 
2. Bạn chỉ có thể sử dụng nó bên trong một khối nhưng không thể thay thế cho một khối. Ví dụ: cả hai đoạn mã sau đây đều không hợp lệ:

```js
function f() unchecked { uint x = 7; }
```
```js
function f() pure {
    uint x;
    for (uint i = 0; i < 100; i ++) unchecked { x += i; }
```
# Tổng kết ( breaking changes )
- Code Generator : Tất cả tính toán đều được kiểm tra số học một cách mặc định. có thể vô hiệu hóa nó bằng **unchecked {...}**
- Code Generator : Sử dụng revert với Panic(uint256) và errors codes thay vì invalid code
- General : Remove global funtions log0, log1, log2, log3 and log4.
- Parser : a ** b ** c được phân tích cú pháp thành a ** (b ** c).
- Type System : không cho phép chuyển đổi **type(uint160).max** thành **address** type
- Type System : Phủ định chỉ có thể được sử dụng trên số nguyên có dấu, không được sử dụng trên số nguyên không dấu.
# Reference 
- Solidity changelog : https://github.com/ethereum/solidity/releases/tag/v0.8.0
- Preview Release : https://blog.soliditylang.org/2020/10/28/solidity-0.8.x-preview/
- Release Announcement : https://blog.soliditylang.org/2020/12/16/solidity-v0.8.0-release-announcement/