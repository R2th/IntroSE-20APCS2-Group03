# 1. Giới thiệu
## 1.1. Tổng quan
Giải pháp Ethereum Consortium Network từ Microsoft Azure cho phép triển khai nhanh chóng một mạng blockchain Ethereum trên nền dịch vụ đám mây của Azure, từ đó giúp nhà phát triển phần mềm có môi trường để phát triển ứng dụng phân tán trên nền Ethereum mà không phải quan tâm nhiều đến việc quản lý mạng lưới đằng sau nó.

## 1.2. Kiến trúc của Ethereum Consortium Network
Một Ethereum Consortium Network trên Azure bao gồm một tập các node mạng ngang hàng với nhau, lưu trữ bản sao của cùng một Ethereum blockchain và đồng thuận trên cơ chế proof-of-work. Các node này được chia ra làm 2 loại là mining node và transaction node. Mining node có nhiệm vụ đồng bộ các transaction từ transaction node và lưu trữ chúng vào blockchain thông qua việc đào. Còn transaction node là một full node có nhiệm vụ gửi các transaction lên network, cũng như cung cấp các endpoint để ứng dụng phân tán có thể kết nối và tương tác với network.

![Ethereum Consortium Network Architecture](https://images.viblo.asia/d57bbb18-fe9f-4e4d-be11-3153aca174da.png)

Các mining node liên kết với nhau trong 1 private subnet để tạo thành 1 mạng thành viên (member network), và các mạng thành viên liên kết với nhau để tạo thành một consortium. Trong mỗi mạng thành viên, node đầu tiên của mạng sẽ kiêm luôn chức năng bootstrap node để các node khác thông qua bootstrap node có thể tìm thấy nhau. Các mạng thành viên chia sẻ chung một nhóm các transaction node, và các transaction node này được public ra bên ngoài để ứng dụng có thể kết nối và tương tác với mạng lưới. Tất cả các node đều được cài Geth phiên bản mới nhất và sử dụng chung một account làm coinbase.

# 2. Cách tạo Ethereum Consortium Network trên Azure
1. Đăng nhập vào Azure Portal.
2. Click nút “Create a resource”.
3. Click menu Blockchain và chọn Ethereum Proof-of-work Consortium

![](https://images.viblo.asia/d31df84d-d1bf-4df3-a9b3-47169273514f.PNG)

4. Ở phần **1. Basics** ta setup các thông tin cơ bản như sau:

|Thông số|Ý nghĩa|Giá trị|
|---|---|---|
|Create a new network or join existing network?|Tạo mạng blockchain mới hay bổ sung vào mạng có sẵn|Create New|
|Deploy a network that will be part of a consortium?|Tạo mạng riêng (standalone) hay mạng cho phép join thêm các mạng khác (consortium) |Standalone|
|Resource Prefix|Tiền tố cho các resource thuộc resource group (từ 2 - 4 kí tự)|Tuỳ ý|
|VM user name|Tên tài khoản admin cho tất cả các máy ảo thuộc mạng blockchain (từ 5 - 16 kí tự)|Tuỳ ý|
|Authentication type|Phương pháp xác thực trên node máy ảo|Password|
|Password|Mật khẩu tài khoản admin (ít nhất 12 kí tự)|Tuỳ ý|
|Subscription|Gói cước Azure|Gói cước hiện tại của tài khoản Azure|
|Resource Group|Resource group của mạng blockchain|Create New, đặt tên tuỳ ý|
|Location|Khu vực địa lý của resource group|Southeast Asia|

![](https://images.viblo.asia/308e5d31-acf4-49eb-9ab3-d1aff26fc594.PNG)

5. Ở phần **2. Deployment regions** ta setup khu vực địa lý của mạng blockchain như sau:

|Thông số|Ý nghĩa|Giá trị|
|---|---|---|
|Number of region(s)|Số khu vực mà mạng blockchain được triển khai|1|
|First region|Khu vực được triển khai đầu tiên|Southeast Asia|

![](https://images.viblo.asia/de7fec36-564e-4946-a47d-1d886b0127d6.PNG)

6. Ở phần **3. Network size and performance** ta setup số lượng và cấu hình các node trong mạng blockchain. Trong bài viết này ta sẽ tạo 1 mạng với chi phí rẻ nhất, gồm 2 mining node và 1 transaction node. Cả 3 node này đều sẽ dùng máy ảo (VM) loại F1 (tối ưu cho tính toán, gồm 1 VCPU, 2GB RAM và 16 GB SSD) với hiệu năng ổ cứng là Standard.

|Thông số|Ý nghĩa|Giá trị|
|---|---|---|
|Number of mining nodes|Số lượng mining node|2|
|Mining node storage performance|Hiệu năng lưu trữ của mining node|Standard|
|Mining node virtual machine size|Loại VM cho mining node|Standard F1|
|Number of load balanced transaction nodes|Số lượng transaction node|1|
|Transaction node storage performance|Hiệu năng lưu trữ của transaction node|Standard|
|Transaction node virtual machine size|Loại VM cho transaction node|Standard F1|

![](https://images.viblo.asia/13565892-3543-4429-9e7b-0615ffa919a5.PNG)

7. Ở phần **4. Ethereum settings** ta setup thông số của mạng Ethereum như sau:

|Thông số|Ý nghĩa|Giá trị|
|---|---|---|
|Consortium Member ID|ID của mạng thành viên. Mỗi mạng thành viên trong consortium sẽ có một ID riêng (là số nguyên tứ 0 đến 255) để cấu hình IP tránh xung đột.|0 (do mạng là Standalone)|
|Ethereum Network ID|Network ID của mạng Ethereum.|Tuỳ ý (khác 1)|
|Custom genesis block|Cấu hình genesis block cho mạng Ethereum|No|
|Ethereum Account Password|Mật khẩu của default account của mạng Ethereum|Tuỳ ý|
|Ethereum private key passphrase|Chuỗi kí tự dùng để generate private key cho default account|Tuỳ ý|

![](https://images.viblo.asia/1202691d-52c3-4b03-988b-a84b43d58d64.PNG)

8. Ở phần **5. Operations Management Suite** ta setup thông số của OMS. OMS (Operation Management Suite) là một dịch vụ của Azure nhằm thu thập các metric và log của network, từ đó cho phép theo dõi trạng thái sức khoẻ của network. Dịch vụ này là tuỳ chọn và ta có thể cài đặt nó hoặc không.

|Thông số|Ý nghĩa|Giá trị|
|---|---|---|
|Monitoring|Kích hoạt dịch vụ OMS|Enable|
|Connect to existing OMS|Kết nối tới OMS instance có sẵn?|Create New|
|OMS Workspace Location|Khu vực địa lý của OMS instance|Southeast Asia|

![](https://images.viblo.asia/7edff827-e896-4775-86d4-be46ae4e60d7.PNG)

9. Ở phần **6. Summary** ta kiểm tra lại các thông số triển khai và click OK.

![](https://images.viblo.asia/1028ba85-9abc-484b-8e18-25c00ead31fb.PNG)

10. Ở phần **7. Buy** ta đồng ý với các điều khoản và click Create để triển khai mạng Ethereum.

![](https://images.viblo.asia/ddcfe9b6-6a0b-4a29-ba95-71aec422322b.PNG)

## 3. Kết nối với Ethereum Consortium Network
### 3.1. Lấy thông số kết nối
1. Sau khi mạng Ethereum được triển khai xong, truy cập vào Resource Group của mạng.

![](https://images.viblo.asia/a78b9635-0804-4464-8783-4e7fe541fe73.PNG)

2. Click vào menu Deployment, chọn item đầu tiên (microsoft-azure-blockchain.azure-blockchain-ether-_yyyymmddhhmmss_)

![](https://images.viblo.asia/fd2040d2-2cad-40c9-be00-f3855fa92a16.PNG)

3. Click vào menu Output, ta sẽ thấy được các thông số kết nối tới mạng Ethereum, trong đó có 3 thông số quan trọng sau:

|Thông số|Ý nghĩa|
|---|---|
|ADMIN-SITE|URL trang admin của mạng Ethereum|
|ETHEREUM-RPC-ENDPOINT|URL RPC của mạng Ethereum|
|SSH-TO-FIRST-TX-NODE-REGION1|Lệnh SSH dùng để kết nối tới transaction node đầu tiên|

![](https://images.viblo.asia/646bfc01-7b8a-496e-a5a5-8c338f2b39a0.PNG)

### 3.2. Truy cập trang admin
Trang admin là một ứng dụng web được viết trên nền NodeJS, sử dụng module Express và Web3. Ứng dụng này được host trên transaction node đầu tiên và tương tác với mạng Ethereum thông qua giao thức IPC trên node.

Để truy cập vào trang admin, ta nhập URL copy từ thông số ADMIN-SITE lên trình duyệt. Trang này gồm có 2 chức năng:

1. Hiển thị trạng thái hiện tại của mạng Ethereum, bao gồm
    * Địa chỉ và số dư hiện tại của coinbase account.
    * Trạng thái các node trong mạng: tên node, số peer và số block mới nhất được đồng bộ.
2. Chuyển tiền từ coinbase account sang account khác trong mạng.

![](https://images.viblo.asia/339088e0-a6b8-4457-9319-654928099d54.PNG)

### 3.3. Kết nối với RPC endpoint bằng Geth

Để kết nối với RPC endpoint, ta cài Geth ở máy local và chạy lệnh:

```
geth attach RPC_Endpoint_URL
```

Trong đó RPC_Endpoint_URL ta thay bằng URL copy từ thông số ETHEREUM-RPC-ENDPOINT ở trên.

![](https://images.viblo.asia/00fb9bd3-5d8b-4d1d-9f81-06d4f43d7796.PNG)

Mặc định các API được enable bởi RPC server bao gồm eth, net, rpc và web3. Với các API này thì ta có thể xem trạng thái của mạng cũng như số dư của các tài khoản nhưng không thể tạo và quản lý tài khoản, cũng như deploy smart contract.
Do đó ta sẽ phải điều chỉnh tham số chạy Geth trên transaction node để enable thêm các API khác. Việc này sẽ được đề cập ở phần sau.

### 3.4. Kết nối SSH với transaction node

Để có thể quản lý và điều khiển transaction node, ta cần kết nối với nó thông qua giao thức SSH bằng cách chạy lệnh kết nối ở thông số SSH-TO-FIRST-TX-NODE-REGION1 trên terminal. Khi chương trình yêu cầu nhập password, ta nhập password đã cấu hình cho tài khoản admin ở phần 1. Basics khi tạo mạng Ethereum.

![](https://images.viblo.asia/50e852e0-20e4-495d-ba5c-67737fd3c7e5.PNG)

Sau khi kết nối thành công, chạy lệnh `ls`, ta sẽ thấy có nhiều file và thư mục ở trong thư mục của tài khoản admin. Chức năng của một số file/thư mục trong đó là như sau:

![](https://images.viblo.asia/ecddbff9-2be7-47fe-8457-f86e4bcee303.PNG)

|File/Thư mục|Chức năng|
|---|---|
|`configure-geth-azureuser.sh`|Cài đặt và thiết lập geth & admin site|
|`etheradmin`|Thư mục chứa ứng dụng admin site|
|`etheradmin.log`|Log file của ứng dụng admin site|
|`ethstat`|Thư mục chứa ứng dụng gửi log tới OMS|
|`genesis.json`|Cấu hình genesis block của Geth|
|`geth.cfg`|File cấu hình chạy geth|
|`geth.log`|Log file của geth|
|`start-private-blockchain.sh`|Script khởi chạy geth và admin site|

Để ngưng kết nối SSH, ta chạy lệnh `exit`.

# 4. Cấu hình transaction node
### 4.1. Cài đặt swap file cho VM
Do VM của transaction node có dung lượng RAM hạn chế nên geth khi chạy dễ gặp lỗi _Out of memory_ và crash, vì vậy ta nên cài thêm bộ nhớ ảo (swapfile)  để khắc phục. Cách cài như sau:

1. Kết nối với transaction node bằng SSH.
2. Chạy lệnh `df -h` và xem dung lượng còn trống của phân vùng `/dev/sdb1` (mount point là `/mnt`). Ví dụ như hình dưới đây là còn trống 15 GB.

![](https://images.viblo.asia/7709d56e-6663-49d8-a5e1-aec80bf89df2.PNG)

3. Mở file `/etc/waagent.conf` bằng `nano` hoặc `vim` (nhớ chạy với `sudo`) và sửa các thông số như dưới đây:
```
ResourceDisk.Format=y
ResourceDisk.EnableSwap=y
ResourceDisk.SwapSizeMB=8192
```

![](https://images.viblo.asia/0b248f0e-3368-4a18-a5b0-748d1e922475.PNG)

**Lưu ý:** Thông số SwapSizeMB là kích thước của swapfile theo đơn vị MB.

4. Khởi động lại WALinuxAgent service bằng cách chạy câu lệnh `service walinuxagent restart` (yêu cầu password).  
5. Khởi động lại VM bằng cách chạy câu lệnh `sudo shutdown -r now`.
6. Kết nối lại với VM bằng SSH, sau đó chạy câu lệnh `cat /proc/swaps` để xác nhận swapfile đã được tạo.

![](https://images.viblo.asia/19c5dc73-6111-433a-904e-a42212b6d1ec.PNG)

### 4.2. Enable API cho RPC server
Như đã đề cập ở phần trước để có thể thực hiện các thao tác như tạo và quản lý account, ta cần enable thêm các nhóm API khác của Ethereum. Để thực hiện điều này, ta sẽ bổ sung tham số `--rpcapi` vào câu lệnh chạy `geth` trên transaction node để enable các API mà ta cần. Cách thực hiện như sau:

1. Kết nối với transaction node bằng SSH.
2. Mở file `start-private-blockchain.sh` bằng `nano` hoặc `vim`. Cuộn xuống gần cuối file để thấy dòng lệnh chạy `geth` (khu vực với header comment là _Start geth node_).

![](https://images.viblo.asia/844a68e0-1ab3-423e-97c9-23354cac07b6.PNG)

3. Bổ sung đoạn sau vào sau đoạn `--rpccorsdomain="*"`:

```
--rpcapi="admin,db,debug,eth,miner,net,personal,shh,txpool,web3"
```

![](https://images.viblo.asia/2b4f9175-15a9-49d2-aa0f-b34e785ba825.PNG)

4. Lưu lại file và khởi động lại transaction node bằng lệnh `sudo shutdown -r now`.

5. Kết nối với transaction node bằng Geth để xác nhận các API đã được enable.

![](https://images.viblo.asia/13be20cd-56b9-46a9-9151-6b169a2c768f.PNG)

**Cảnh báo**: Với giá trị tham số `--rpcapi` như trên thì tất các API của Ethereum đều được cho phép sử dụng. Việc này chứa đựng rủi ro về bảo mật, do đó ta nên chỉnh lại giá trị của tham số để chỉ enable các API cần thiết.

# Tài liệu tham khảo
<https://docs.microsoft.com/en-us/azure/blockchain-workbench/ethereum-deployment-guide>

<https://gallery.technet.microsoft.com/Bletchley-Ethereum-4bc7d80d>

<https://github.com/CatalystCode/ibera-ethereum-consortium-blockchain-network>

<https://blogs.msdn.microsoft.com/pkirchner/2017/07/12/getting-started-with-ethereum-tutorials-on-azure>

<https://support.microsoft.com/en-us/help/4010058/how-to-add-a-swap-file-in-linux-azure-virtual-machines>

<https://github.com/ethereum/go-ethereum/wiki>