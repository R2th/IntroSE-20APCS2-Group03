# Introduction
Hồi còn học trong ghế nhà trường bộ môn lập trình tốn nhiều não nhất của mình là code assembly. Nôm na thì bất cứ ngôn ngữ bậc cao nào như C , Go, Java,... được sinh ra để người dễ hiểu và dễ code , tuy nhiên chúng đều sẽ được compiled down xuống assembly một ngôn ngữ bậc thấp để máy hiểu rồi chương trình sẽ được executed .

![](https://images.viblo.asia/f1c6cfa9-1ed7-484a-b006-a917c5c2aef2.png)


Cũng thiết kế giống java, Ethereum xây dựng virtual machine ( EVM : Ethereum virtual machine ) cũng có bộ lệnh của riêng nó mọi người có thể xem tại [đây](https://github.com/ethereum/go-ethereum/blob/15d09038a6b1d533bc78662f2f0b77ccf03aaab0/core/vm/opcodes.go#L223-L388) . Và nó được abstracted bởi Solidity , đây là ngôn ngữ bậc cao để viết smart contract . Tuy nhiên Solidity vẫn hỗ trợ code bằng assembly . Ví dụ : 

```js
contract Assembler {
    function do_something_cpu() public {
       
        assembly {
            // start writing evm assembler language
        }
    
    }
}
```

EVM là stack machine , trong đó stack là dạng data structure mà chỉ có thể add ( = PUSH ) và remove ( = POP ) các giá trị ở top .Tóm lại là LIFO , last in first out .

## Opcodes basics !

```js
a + b      // Standard Notation (Infix)
a b add    // Reverse Polish Notation
```

## Tại sao phải sử dụng Assembly trong Solidity ?
Công nhận luôn là tại sao phải viết ngôn ngữ khó hiểu bên trong ngôn ngữ dễ hiểu cơ chứ ? 
### Fine-grained control
Assembly cho phép bạn thực thi một số logic có thể không thực hiện được chỉ với Solidity. Ví dụ: trỏ đến một specific memory slot.

Điều khiển chi tiết đặc biệt hữu ích khi chúng ta tự code một library, vì chúng sẽ được sử dụng lại. Hãy xem các thư viện Solidity bên dưới. Bạn sẽ ngạc nhiên khi thấy họ tin tưởng vào việc sử dụng Assembly.

- [String Utils](https://github.com/Arachnid/solidity-stringutils/blob/master/src/strings.sol) by Nick Johnson (Ethereum Foundation)
- [Bytes Utils](https://github.com/GNSPS/solidity-bytes-utils/blob/master/contracts/BytesLib.sol) by Gonçalo Sá (Consensys)

### Giảm phí gas
Một trong những lợi ích chính của sử dụng asemblu trong Solidity là tích kiệm gas. Cùng thử so sanh **gas cost** giữa Solidity và Assembly bằng cách tạo một hàm cộng 2 giá trị x và y và trả lại kết quả.
```js
function addAssembly(uint x, uint y) public pure returns (uint) {
     assembly {
         let result := add(x, y)
         mstore(0x0, result)
         return(0x0, 32)
     }
 }
 
 function addSolidity(uint x, uint y) public pure returns (uint) {
     return x + y;
 }
```
![](https://images.viblo.asia/d70b244c-7a4a-42ee-8bd8-e75d9ae36128.jpeg)

Như đã thấy thì chúng ta tiết kiệm đc khá nhiều gas khi sử dụng inlin assembly . Với ví dụ trên thì thì số lượng gas không tiết nhiều lắm nhưng đây cũng là một ý tưởng để tiết kiệm gas trong các contract phức tạp .
### Một số tính năng khác
Có một vài thứ có thể làm được với assembly mà không thể làm được với Solidity 

Functional Assembly - https://www.youtube.com/watch?v=nkGN6GwkMzU

Instructional Assembly - https://www.youtube.com/watch?v=axZJ2NFMH5Q
....
## 2 dạng Assambly trong Solidity 
Có 2 cách để triển khai Assembly bên trong Solidity code
- Inline Assembly : có thể dùng bên trong code Solidity code luôn.
- Standalone Assembly : có thể dùng mà ko cần viết trong code Solidity.
# Basic Assembly syntax
Như ví dụ bên trên về việc tiết kiệm gas chúng ta thấy rằng code assembly sẽ chạy trong assembly block `assembly {...}` 
```
assembly {
    // some assembly code here
}
```
Thực ra code bên trong assembly block được viết dưới dạng ngôn ngữ **Yul** theo document của Solidity documentation. Theo Doc của solidity thì các đoạn inline assembly blocks không chia sẻ các namespace với nhau. Nghĩa là chúng ta không thể gọi biến được định nghĩa trong một assembly block trong một assembly block khác được .
```js
assembly { 
    let x := 2
}
        
assembly {
    let y := x          // Error
}
// DeclarationError: identifier not found
// let y := x
// ^
```
## Basic Example
Đây là một ví dụ đơn giản về việc sử dụng assembly code để cộng 2 số là đầu vào của hàm và trả về tổng của chúng . Và để hiểu sâu hơn về cách chúng hoạt động bên trong EVM .
```
function addition(uint x, uint y) public pure returns (uint) {
     
    assembly {
        
        // Tạo biến`result`
        //     -> tính tổng `x + y` với `add` opcode
        //     -> gán kết quả vào `result`
        let result := add(x, y)   // x + y
        
        // Sử dụng `mstore` opcode, để:
        //     -> Lưu `result` vào memory
        //     -> tại memory address 0x0
        mstore(0x0, result)       // store result in memory
         
        // return 32 bytes từ memory address 0x0
        
        return(0x0, 32)          
        
    }
}
 ```
 ### Khai báo và gán biến
 Để khai báo một biến ta sử dụng `let` keyword . Sau đó chúng ta có thể gán bằng cú pháp `:=`. Nếu không gán thì giá trị của biến sẽ là 0.Và biểu thức gán cũng có thể phức tạp khóa lên 
 ```js
 assembly {
    let x           // initialisation, x = 0
    x := 5          // x is now 5
    let y := add(x, 3)
    let z := add(keccak256(0x0, 0x20), div(slength, 32))
    
}
 ```
 Ngoài ra `let` hoạt động trong EVM như sau :
 - Tạo một stack slot mới
 - Vị trí mới này được dành riêng cho biến
 - Vị trí này sẽ tự động removed khi hết assembly block

### Comment
Giống ngôn ngữ Solidity làm thì bạn có thể sử dụng `//` và `/* */` bên trong assembly block để comment
```js
assembly {
     // single line comment
     
     /*
     Multi
     line
     comment
     */
}
```
### Literals
Tương tự như Solidity tuy nhiên string thì chỉ đến 32byte tương đương 32 ký tự thôi
```
assembly {
    let a := 0x123             // Hexadecimal
    let b := 42                // Decimal
    let c := "hello world"     // String
    
    let d := "very long string more than 32 bytes" // Error
    
} 
// TypeError: String literal too long (35 < 32)
// let d := "really long string more than 32 bytes"
//           ^------------------------------------^
```
### Blocks and Scope
Các biến sẽ tuân theo chuẩn block scoping . Phạm vi của 1 block xác định bằng cách thêm code vào giữa `{....}` . Trong ví dụ dưới đây `y` và `z` chỉ hiển thị trong phạm vi `Scope 1` và `Scope 2`.
```
assembly { 
    
    let x := 3          // x is visible everywhere
      
    // Scope 1           
    { 
        let y := x     // ok
    }  // y is "deallocated" here
    
    // Scope 2    
    {
        let z := y     // Error
    } // x is "deallocated" here
        
}
// DeclarationError: identifier not found
// let z := y
// ^
```
### Vòng lặp
#### For loop
Hàm này chắc ko còn quá xa lạ hay thử ví dụ bằng vòng lặp nhân 2 với đầu vào n là số vòng lặp và i là biến đếm
```
function for_loop_solidity(uint n, uint value) public pure returns(uint) {
         
    for ( uint i = 0; i < n; i++ ) {
        value = 2 * value;
    }
    return value;
}
```

sau khi chuyển qua Assembly nó sẽ thế này
```
function for_loop_assembly(uint n, uint value) public pure returns (uint) {
         
     assembly {
             
       for { let i := 0 } lt(i, n) { i := add(i, 1) } { 
           value := mul(2, value) 
       }
           
       mstore(0x0, value)
       return(0x0, 32)
           
   }
}
```
Trong đó : 
- `let i := 0` là khởi tạo i = 0
- `lt(i, n)` là điều kiện so sánh i vs n và `lt` là nhỏ hơn `gt` là lớn hơn 
- `add(i, 1)` phép cộng i + 1

#### While Loop
Không có while loop trong Assambly tuy nhiên có thể viết lại hàm for để nó hoạt động giống như hàm While
```
assembly {
    let x := 0
    let i := 0
    for { } lt(i, 0x100) { } {     // while(i < 0x100)
        x := add(x, mload(i))
        i := add(i, 0x20)
    }
}
```
### Conditional
#### If
Solidity assembly thì có `if` nhưng lại không có `else` 
```
assembly {
    if slt(x, 0) { x := sub(0, x) }  // Ok
            
    if eq(value, 0) revert(0, 0)    // Error, curly braces needed
}
```
If có vẻ không còn xa lạ gì nhưng hãy nhớ là code sau if phải nằm trong `{ }` 
#### Switch
Switch nhận giá trị của một biểu thức và so sánh nó với một số hằng số ở phần case. Nhánh tương ứng với hằng số phù hợp được chạy. Bạn cũng có thể có một trường hợp mặc định nếu không có trường hợp nào phù hợp.
```
assembly {
    let x := 0
    switch calldataload(4)
    case 0 {
        x := calldataload(0x24)
    }
    default {
        x := calldataload(0x44)
    }
    sstore(0, div(x, 2))
}
```
Tuy nhiên `Switch` cũng có một số hạn chế ví dụ như 
- Phần swtich thì ko yêu cầu ngoặc nhọn nhưn phần case lại có
- Nếu đã bao phủ đc hết các khả năng thì ko đc dùng `default`

```
assembly {
             
    let x := 34
             
    switch lt(x, 30)
    case true {
        // do something
    }
    case false {
        // do something els
    }
    default {
        // this is not allowed
    }
             
}
```
### Functions 
Chúng ta hoàn toàn có thể viết hàm bên trong assebly block. Ví dụ dưới đây cho phép cấp phát `length` bytes memory và trả lại memory pointer `pos`

```
assembly {
    
    function allocate(length) -> pos {
        pos := mload(0x40)
        mstore(0x40, add(pos, length))
    }
    let free_memory_pointer := allocate(64)
}
```
Giống như Rust thì return giá trị sẽ sử dụng kí hiệu `->`. Tuy nhiên lại không có `return` mà trả lại bằng cách gán giá trị đúng biến được định nghĩa sau `->` trong ví dụ trên là `pos`

## Tổng kết 
Những kiến thức cơ bản về code assembly trong solidity mình đã giới thiệu trong bài này . Tuy nhiên còn có phần nâng cao nữa đó là liên quan đến việc sử dụng các **opcode** mà đây là phần quan trọng lắm đấy vì nó gần vs EVM nhất. VÌ bài cũng đã khá dài rồi nên mình sẽ viết về nó trong phần 2 .
## Reference 
- https://medium.com/@jeancvllr/solidity-tutorial-all-about-assembly-5acdfefde05c
- https://docs.soliditylang.org/en/v0.5.5/assembly.html