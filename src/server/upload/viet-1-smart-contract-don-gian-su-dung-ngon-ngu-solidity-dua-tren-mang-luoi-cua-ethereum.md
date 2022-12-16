Chắc hẳn khi tìm tới bài viết này các bạn đã có ít nhiều sự hiểu biết về công nghệ Blockchain đúng không nào? Ở đây mình xin nói sơ qua, Blockchain là nền tảng kĩ thuật để tạo nên tiền kĩ thuật số nhưng tiền kĩ thuật không phải là tất cả những gì blockchain có thể làm. Blockchain không chỉ có tiền kĩ thuật số ?. Ethereum là một nền tảng Blockchain phổ biến nhất hiện nay dành cho Developer.

Hợp đồng thông minh (smart contract), về cơ bản thì ý tưởng của nó khá giống với hợp đồng trong đời sống hằng ngày, chỉ có điều nó được viết bằng ngôn ngữ lập trình (cụ thể là Solidity).
# 1. Trình soạn thảo code
Để bắt đầu 1 cách hiệu quả và đơn giản, mình sử dụng trình soạn thảo online là [Remix](https://remix.ethereum.org/), thay vì có thể dùng Visual Studio Code thì sẽ tốn thời gian cài đặt. Remix là một IDE online hiệu quả để viết Smart Contract (kiểu mì ăn liền mà không cần cài đặt gì).

Để code Smart Contract, chúng ta sẽ dùng ngôn ngữ lập trình có tên là Solidity. Về cơ bản, cá nhân mình thấy Solidity hơi giống giống Javascript bổ sung thêm một số cú pháp hướng đối tượng khác. Ta sẽ đi qua 2 chương trình đơn giản để hiểu hơn về Smart Contract.

Khi vừa vào trang [Remix](https://remix.ethereum.org/), ta có ngay một Smart Contract dành cho bầu cử. Để đơn giản nhất ta sẽ viết chương trình Hello World trước.
![Remix](https://images.viblo.asia/23ef2448-e518-4ea1-8b07-23620a3ef7a0.png)

# 2. Smart Contract dạng Hello World
Ta tạo 1 file có tên HelloWorld.sol song song cùng file 3_Ballot.sol. Nội dung như sau:
```
pragma solidity >=0.4.22 <0.7.0;

contract HelloWorld {
 
    string private message;
    
    function contructor(string memory mes) public {
        message = mes;
    }
    
    function setMessage(string memory mes) public {
        message = mes;
    }
    
    function getMessage() view public returns(string memory) {
        return message;
    }
}

```
Giải thích code 1 chút, dòng đầu tiên `pragma solidity >=0.4.22 <0.7.0;` là ta định nghĩa phiên bản Solidity muốn sử dụng (giữa bản thấp nhất và cao nhất có thể). Tiếp theo ta khai báo tên Contract `HelloWorld`. Sau đó ta định nghĩa 1 biến message `string private message`, ta khai báo hàm khởi tạo với từ khóa `contructor`, Hàm khởi tạo này có một tham số để thiết lập giá trị ban đâu cho biến message: 
```
function contructor(string memory mes) public {
     message = mes;
}
```
Ta chú ý, có từ khóa `memory` để định nghĩa nơi lưu trữ biến của Smart Cotract trên mạng lưới Ethereum.

Tiếp theo ta định nghĩa 2 hàm `setMessage` và `getMessage`, từ khóa `view` để định nghĩa hàm chỉ được phép đọc, ngoài ra còn từ khóa `returns` (có 's') để định nghĩa kiểu trả về của hàm.

Để biên dịch, ta chọn vào tab chứa icon của Solidity, nhấn **Compile HelloWorld.sol**, nếu biên dịch đúng sẽ xuất hiện tích xanh. Hoặc có thể tích vào ô **Auto Compile** để không phải compile lại mỗi khi sửa đổi code.

![](https://images.viblo.asia/921a4c5e-a899-4008-a6c1-91c8e51aa264.png)

Để deploy, sau khi compile thành công, ta chọn tab icon Deploy. Tại phần environment, ta chọn môi trường máy ảo là `Javascript VM`, khi đó phần account bên dưới sẽ có những tài khoản chứa 100 Ether. Ether ở đây chính là đơn vị tiền kĩ thuật số của mạng lưới Ethereum.

![](https://images.viblo.asia/38faede3-e0ce-4a26-ae3d-0c3eeddb5c92.png)

Trên thực tế, nếu muốn triển khai trên mạng lưới chính, bạn phải mua một lượng ether. Hiểu đơn giản thì nó là phí để máy ảo chạy đoạn code bạn muốn deploy.
Phần gas limit để chỉ lượng tối đa tiền ảo mà bạn bỏ ra để máy ảo có thể chạy (đơn vị là wei, 1 ether = 10^18 wei)

Nhấn vào Deploy, nếu không có lỗi xảy ra, ta sẽ thấy lượng ether giảm đi 1 ít. Sau đó để kiểm thử, ta nhập đoạn string bất kỳ vào contructor, rồi thực hiện hàm `setMessage` và `getMessage` ta sẽ được đoạn string mong muốn. Như vậy là xong.

![](https://images.viblo.asia/62a7fd45-71ce-47b3-b618-0f7905e25d5f.png)
# 3. Smart Contract dạng Crud
Ở đây, ta sẽ tạo 1 Contract dạng create, read, update và delete user. Ta có code sau:
```
pragma solidity >=0.4.22 <0.7.0;

contract Crud {
    struct User {
        uint id;
        string name;
    }
    User[] public users;
    uint public nextId;
    
    function create(string memory name) public {
        users.push(User(nextId, name));
        ++nextId;
    }
    
    function read(uint id) view public returns(uint, string memory) {
        uint index = find(id);
        return (users[index].id, users[index].name);
    }
    
    function update(uint id, string memory name) public {
        uint index = find(id);
        users[index].name = name;
    }
    
    function deleteUser(uint id) public {
        uint index = find(id);
        delete users[index];
    }
    
    function find(uint id) view internal returns(uint) {
        for(uint i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                return i;
            }
        }
        revert('User does not exits');
    }
}
```
Tiếp tục giải thích code, ta tạo 1 Contract có tên `Crud`. Khai báo 1 biến cấu trúc User có 2 thuộc tính `id`, `name`. Ta khai báo 1 mảng users chứa các phần tử là biến cấu trúc User. Tiếp theo, tạo 1 biến integer là `nextId` để thêm 1 User vào mảng (ta dùng từ khóa `uint` để định nghĩa kiểu integer).

Tại hàm `create`, biến `name` truyền vào là tên người thêm vào, ta tạo 1 biến cấu trúc `User(nextId, name)` (`nextId` khởi tạo mặc định ban đầu là 0), dùng phương thức push để thêm phần tử vào mảng.

Tại hàm `read`, biến truyền vào là `id` người dùng, dữ liệu trả về gồm `id` và `name`, ta định nghĩa biến `index` chính là chỉ số phần tử trong mảng có `id` trùng với `id` truyền vào hàm, rồi thực hiện update.

Tương tự tại hàm delete, ta cũng tìm chỉ số của phần tử rồi thực hiện xóa phần tử.

Tại hàm find, ta lặp qua từng phần tử để kiểm tra rồi trả về chỉ số phần tử cần tìm trong mảng. Từ khóa `internal` để định nghĩa hàm chỉ được gọi bên trong hợp đồng cũng như các hợp đồng dẫn xuất từ nó, `revert` dùng để đưa ra cảnh báo khi không tìm thấy phần tử trong mảng.

Ta thực hiện Compile và Deploy tương tự như Contract HelloWorld. Ta có kết quả như sau:

![](https://images.viblo.asia/191346aa-0ffe-4c18-90c6-058309e79c3e.png)

Như vậy, chúng ta đã thử viết 1 Smart Contract đơn giản và Compile cũng như Deploy thành công rồi. Ở phần sau, mình sẽ hướng dẫn các bạn cài đặt trực tiếp trên máy tính cá nhân và Deploy lên mạng lưới của Ethereum. Chào tạm biệt!

Nguồn: [Solidity](https://solidity.readthedocs.io/en/v0.6.7/), [Smart Contract](http://blockchainhub.net/smart-contracts/)