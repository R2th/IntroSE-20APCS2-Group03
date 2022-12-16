# I. 3Box là gì?
![](https://images.viblo.asia/076398ee-f0e7-4bd1-9f5a-3c17aa7d730c.png)

3Box là một hệ thống lưu trữ dữ liệu người dùng an toàn và phi tập trung. Đó là cách dễ nhất để các developer xây dựng các app mà không cần lo back-end để quản lý dữ liệu người dùng.
# II. Tại sao nên sử dụng 3Box?
![](https://images.viblo.asia/f558eb3a-7a77-4a0d-b653-39e505ffb843.png)

Đầu tiên chúng ta sẽ tìm hiểu tại sao 3Box là cách tốt nhất để developer lưu trữ và quản lý dữ liệu người dùng qua những lý do sau đây:

:hammer_and_wrench: **Xây dựng một ứng dụng đầy đủ tính năng với ít cơ sở hạ tầng phía back-end hơn**:

Thứ nhất, 3Box cho phép các front-end developer lưu trữ dữ liệu người dùng trên mạng lưu trữ mở thay vì máy chủ cơ sở dữ liệu tập trung, browser localStorage  hay là blockchain. 

Điều này cho phép các 3Box developer có thể phát triển các ứng dụng vừa mang lại trải nghiệm tốt cho người dùng như web2 nhưng lại đảm bảo dữ liệu người dùng phân tán giống web3. 

:rocket: **Phát triển nhanh hơn và dễ dàng hơn với các công cụ và API có sẵn**:

Bên cạnh đó, 3Box cung cấp cho các developer một bộ công cụ để có thể nhanh chóng xây dựng một ứng dụng hoàn chỉnh với khả năng mở rộng khi số lượng user tăng lên. Các API của 3Box hỗ trợ các chức năng bao gồm  identity, auth, profiles, storage, and messaging. Có thể tìm hiểu thêm về API và SDK của 3Box tại [đây](https://docs.3box.io/products).

:cloud: **Dữ liệu phi tập trung được lưu trữ trên IPFS và OrbitDB:**
 
3Box là một hệ thống lưu trữ dữ liệu phân tán sử dụng [IPFS](https://ipfs.io/) cho lưu trữ phi tập trung, [OrbitDB](https://github.com/orbitdb/orbit-db) cho cấu trúc database cùng với 3ID cho nhận dạng phi tập trung. 

Để đảm bảo 3Box có khả năng duy trì việc sử dụng  trên các công nghệ mới này, nhà phát triển của 3Box cũng cung cấp cơ sở hạ tầng đám mây bổ sung để cải thiện độ tin cậy và hiệu suất của mạng phi tập trung. Điều này bao gồm các hosted nodes, các dịch vụ data pinning và các lớp bộ nhớ đệm.

:closed_lock_with_key:  **Nâng cao bảo mật và quyền riêng tư của dữ liệu người dùng**:

Kiến trúc phi tập trung của 3Box cho phép các developers loại bỏ phần lớn công việc liên quan đến bảo mật và bảo vệ dữ liệu người dùng trên máy chủ của họ.

3Box có thể làm được như vật bởi  vì dữ liệu  được lưu giữ trực tiếp với người dùng, nó cũng mang lại cho người dùng nhiều quyền riêng tư hơn và kiểm soát cách các thông tin cá nhân của họ được chia sẻ và sử dụng bởi các ứng dụng trực tuyến. 

Khi dữ liệu được lưu trữ riêng tư trên 3Box, các ứng dụng và người dùng khác không thể đọc được trừ khi người dùng cấp cho họ quyền rõ ràng. Người dùng có toàn quyền quyết định việc chia sẻ dữ liệu cá nhân của họ. Điều khó có thể xảy ra ở một ứng dụng tập trung.

:arrows_counterclockwise: **Hỗ trợ tính di động và khả năng tương tác dữ liệu**:

Một trong những lợi ích lớn nhất đối với 3Box là khi dữ liệu được lưu giữ gắn liền với người dùng, giúp người dùng dễ dàng mang dữ liệu của họ qua các ứng dụng, mạng và dịch vụ khác nhau mà không cần phải tạo lại dữ liệu mới mỗi lần chuyển sang ứng dụng mới. 

Ngoài ra, dữ liệu người dùng trên 3Box thuộc về người dùng chứ không phải chịu bất kỳ hình thức khóa nhà cung cấp nào, kể cả chính 3Box, vì người dùng luôn có thể đưa dữ liệu của họ đến nhà cung cấp khác áp dụng cùng tiêu chuẩn.

:sparkles:  **Người dùng không cần cài đặt thêm phần mềm mới**

Đơn giản bởi vì các tính năng của 3Box được cung cấp thông qua Javascript SDK thế nên người dùng sẽ không phải cài đặt thêm bất cứ phần mềm nào để có thể trải nghiệm các tính năng của 3Box.

# III. Kiến trúc của 3Box
![](https://images.viblo.asia/d18a1408-f61b-41ae-9410-34c31e4b4c3c.png)

Tiếp theo chúng ta cùng đi tìm hiểu và có một cái nhìn tổng quan về kiến trúc của 3Box. Có 4 lớp hệ thống quản lý dữ liệu người dùng 3Box, bao gồm:
* Wallets
* 3ID Data Identity Protocol
* OrbitDB Databases
* IPFS Storage

Bây giờ chúng ta sẽ khám phá chi tiết từng layer trên.

##  Wallet: Quản lý Key và Authentication
![](https://images.viblo.asia/7a1aeab6-8836-4b3c-b6c5-510a4e390875.png)

Trong 3Box, wallet đóng vai trò lưu trữ private key của người dùng cũng như sử dụng key đó để xác thực quyền truy cập và thao tác với dữ liệu thông qua **3ID** (chúng ta sẽ nói về 3ID ở phần bên dưới). 

### Data Authentication:

Có 2 cách để wallet có thể xác thực cơ sở dữ liệu thông qua 3Box. 

1. **EthereumProvider**:  Về cơ bản, ví Ethereum có thể hỗ trợ xác thực cơ sở dữ liệu 3ID thông qua phương thức `Personal_sign` trong API EthereumProvider. 
 
Khi các ứng dụng gọi hàm `openBox ()` hoặc `openSpace ()` trong API 3Box để có quyền truy cập vào cơ sở dữ liệu của người dùng, yêu cầu được chuyển qua giao diện Ethereum JSON-RPC đến ví nơi sẽ hiển thị yêu cầu `personal_sign` cho người dùng. 

![](https://images.viblo.asia/a5986e40-bcb0-41d1-9c0f-1e0025b25a78.png)


Nếu yêu cầu này được chấp thuận, thông báo được ký bằng private key Ethereum và kết quả được trả lại cho ứng dụng qua Ethereum JSON-RPC. Sự kết hợp giữa `private key` và `message`  được sử dụng để tạo `3ID` và các khóa cơ sở dữ liệu bổ sung, sau đó được lưu trữ trong localStorage và được ứng dụng sử dụng để thực hiện các hoạt động cơ sở dữ liệu.

2. **3IDProvider:**:  Cách khác mà ví Ethereum có thể hỗ trợ xác thực cơ sở dữ liệu 3ID là phương thức `authenticate` trong API 3IDProvider tiêu chuẩn.
 
Khi các ứng dụng gọi `openBox ()` hoặc `openSpace ()` trong API 3Box để có quyền truy cập vào cơ sở dữ liệu của người dùng, yêu cầu này được chuyển qua  3ID JSON-RPC đến ví nơi gọi hàm `authenticate` và hiển thị yêu cầu cho người dùng. 

Nếu yêu cầu này được chấp thuận, thông báo được ký bằng private key Ethereum của người dùng và  kết quả được giữ bên trong ví và được sử dụng để tạo ra  `3ID` và các khóa cơ sở dữ liệu bổ sung được sử dụng để thực hiện các thao tác với cơ sở dữ liệu. 

Ngoài ra, `3IDProvider` cho phép ví thực hiện liên kết nhiều tài khoản cặp khóa blockchain với cùng một 3ID , bên cạnh việc cải thiện UX với quyền chữ ký tự động (người dùng có thể cho phép ví tự động phê duyệt yêu cầu cơ sở dữ liệu). 

> Dưới đây là danh sách một số thư viện JavaScript EthereumProvider phổ biến nhất cho các ứng dụng: Web3.js, Ethers.js và Web3Connect.js. 
> 
> Và đây là danh sách một số nhà cung cấp ví Ethereum phổ biến nhất cho người dùng: MetaMask, Portis, Fortmatic, Authereum, Universal Login và WalletConnect (hỗ trợ Gnosis Safe, Argent, Rainbow và các ví di động khác).
> 

## 3ID: Nhận dạng dữ liệu, Kiểm soát truy cập, Mã hóa

3ID là giao thức nhận dạng phi tập trung (DID), cung cấp nhận dạng dữ liệu, kiểm soát truy cập và mã hóa cho dữ liệu người dùng được lưu trữ trên web phi tập trung trong cơ sở dữ liệu phi tập trung hoặc  IPFS.

### Nhận dạng dữ liệu (Data Identity)

Cốt lõi của mỗi tài khoản 3Box là 3ID, số nhận dạng phi tập trung (DID), hoạt động như một định danh dữ liệu duy nhất và cho phép người dùng quản lý dữ liệu và thông tin của họ trên các cơ sở dữ liệu, tài khoản và mạng phi tập trung khác nhau.
> did:3:bafydfhqlwaedhflasdhfqkawhfalwhsfqjawdfhw

Tất cả dữ liệu liên quan đến người dùng và tất cả các tin nhắn và thông tin liên lạc được gửi từ người dùng, được kiểm soát bởi 3ID của họ.

**Tạo hoặc xác thực bằng 3ID**

Như đã đề cập ở trên, 3ID được tạo một cách xác định bằng cách kết hợp private key của người dùng và thông báo đồng ý 3ID.

> "This app requests to view and update your 3Box profile."
> 
Khi người dùng phê duyệt thông báo này bằng cách ký vào đó, họ sẽ tạo 3ID của họ. Ứng dụng có thể yêu cầu chức năng này bằng cách gọi phương thức `openBox ()` có sẵn trong API 3Box. Nếu người dùng chưa có 3ID, một người dùng sẽ được tạo và khởi tạo cho họ. Một liên liên kết cũng sẽ được thêm vào kho lưu trữ gốc của 3ID để những người khác có thể xác minh liên kết này. Nếu người dùng đã có 3ID, đơn giản là nó sẽ được khởi tạo.

Các`public key` bổ sung sau đó có thể được thêm vào 3ID, cho phép người dùng xác thực 3ID và cơ sở dữ liệu bổ sung bằng các `private keys` khác nhau và liên kết dữ liệu của họ trên nhiều tài khoản. Wallets có thể liên kết nhiều cặp khóa và tài khoản với cùng 3ID bằng phương thức `addAuthMethod ()` trong API 3IDProvider .

**Tạo khóa cơ sở dữ liệu (Creating Database Keys)**

Khi người dùng phê duyệt thông báo đồng ý trong ví của họ để tạo 3ID, các khóa ủy quyền cơ sở dữ liệu bổ sung được lấy từ 3ID của người dùng, bao gồm: `signing key` (sK) để ký tất cả các cập nhật cơ sở dữ liệu; và `encryption key` (eK) để mã hóa và giải mã dữ liệu cho cơ sở dữ liệu đó. 

Với tích hợp  `EthereumProvider Wallet`, các khóa cơ sở dữ liệu này được giữ trong localStorage trong suốt thời gian của phiên ứng dụng của người dùng. Điều này có nghĩa là người dùng chỉ cần phê duyệt thông báo đồng ý một lần, nhưng sau đó có thể thực hiện các hoạt động không giới hạn trên cơ sở dữ liệu được phê duyệt bằng các khóa này. 

Với tích hợp `3IDProvider wallet`, các khóa cơ sở dữ liệu này được giữ bên trong ví trong một khoảng thời gian do ví quyết định. Ví có thể chọn hiển thị  xác nhận cho mọi yêu cầu được tạo bởi các ứng dụng hoặc tự động ký tất cả các yêu cầu thay mặt cho người dùng.

### Kiểm soát truy cập dữ liệu (Data Access Control)

3ID cho phép một người dùng duy nhất phối hợp và kiểm soát nhiều cơ sở dữ liệu phi tập trung, mỗi cơ sở dữ liệu được kiểm soát truy cập riêng. Mặc dù các hệ thống dựa trên máy chủ truyền thống có các khái niệm kiểm soát truy cập và mã hóa riêng biệt, 3ID sử dụng mô hình Cryptographic Access Control (CAC) sử dụng chữ ký (sK) và mã hóa (eK) để tạo ra một hệ thống kiểm soát truy cập dữ liệu không có máy chủ. 

3Box sử dụng CAC của 3ID vì dữ liệu trên 3Box được lưu trữ trên mạng IPFS mở và không được giữ phía server, do đó kiểm soát truy cập phải được thực hiện theo cách không có server.

**Lấy dữ liệu công khai (Fetching Public Data)**:

Dữ liệu được lưu trữ công khai trong cơ sở dữ liệu trên mạng 3Box được lưu giữ trong văn bản thô (plaintext). Dữ liệu được ký bởi `sK` nhưng không được mã hóa bởi` eK`, do đó, dữ liệu này có sẵn cho người khác sử dụng mà không cần bất kỳ sự chấp thuận kiểm soát truy cập nào từ người dùng. 

Người tham gia có thể tìm tất cả dữ liệu công khai từ root store, profile, space hoặc cơ sở dữ liệu của người dùng bằng cách sử dụng bất kỳ phương thức  lấy dữ liệu nào từ 3Box REST API .

**Thực hiện thao tác trên dữ liệu (Performing Operations on Data)**:

Với 3ID, tất cả các hoạt động trên dữ liệu xảy ra phía client side sau khi người dùng đã xác thực một cơ sở dữ liệu cụ thể. 

Tất cả các thao tác với cơ sở dữ liệu như `writes, updates, and messages` phải được ký bởi `sK` của 3ID; ngoài ra, dữ liệu private phải được mã hóa / giải mã đối xứng bởi `eK` của 3ID. 

Như đã đề cập trước đây, tùy thuộc vào tích hợp 3ID của ví, các khóa này có thể tồn tại trong localStorage trong trình duyệt của người dùng hoặc bên trong ví. 

Điều này có nghĩa là các ứng dụng và dịch vụ muốn tương tác với 3Box của người dùng theo những cách khác ngoài việc đọc dữ liệu công khai, chẳng hạn như ghi dữ liệu, mã hóa / giải mã dữ liệu hoặc xóa dữ liệu, sẽ cần yêu cầu xác thực từ ví của người dùng thông qua tin nhắn đồng ý để tạo khóa ký `sK` và khóa mã hóa `eK` cần có để thực hiện các hành động này.

**Truy cập profile database**:

Kiểm soát truy cập là riêng biệt cho từng cơ sở dữ liệu do người dùng kiểm soát, vì vậy các ứng dụng cần yêu cầu cấp phép riêng cho các cơ sở dữ liệu cụ thể, bao gồm `profile` của người dùng và từng `space` của họ. 

Các ứng dụng muốn truy cập profile databse 3Box của người dùng để thực hiện cập nhật, giải mã hoặc xóa dữ liệu phải yêu cầu xác thực thông báo đồng ý 3ID cơ bản bằng cách gọi `openBox ()` trong API 3Box.

> "This app requests to view and update your 3Box profile."

Đây là  thông báo sẽ tạo hoặc khởi tạo 3ID của người dùng và tạo các khóa ký và mã hóa, có nghĩa là chỉ cần xác thực người dùng với ứng dụng của bạn, bạn có thể đọc và / hoặc cập nhật cơ sở dữ liệu hồ sơ.

**Truy cập Space/Thread Database**

Các ứng dụng muốn truy cập `Space database` ( hoặc `Thread Database` có trong đó) để thực hiện cập nhật, giải mã hoặc xóa dữ liệu phải yêu cầu xác thực `Space 3ID consent message` bằng cách gọi openSpace () trong API 3Box. 

![](https://images.viblo.asia/1ae57517-2500-44b8-b78a-b4c065a05a96.png)


Điều này khác với thông báo đồng ý cho hồ sơ ("This app requests to view and update your 3Box profile.")  và khi được phê duyệt sẽ tạo ra 3ID hoàn toàn khác nhau và sau đó là một khóa ký (sK) và khóa mã hóa (eK) khác nhau. Đây là cách 3ID có thể truy cập kiểm soát từng cơ sở dữ liệu một cách riêng biệt và cho phép tiết lộ thông tin có chọn lọc.

### Mã hóa dữ liệu

Khi các ứng dụng muốn lưu trữ dữ liệu private bên trong cơ sở dữ liệu, sẽ có một loạt các hành động xảy ra đằng sau từ `eK` của cơ sở dữ liệu đến cặp `key-value` được mã hóa đối xứng.

Mỗi cơ sở dữ liệu có 3ID riêng biệt và do đó, quyền truy cập riêng được kiểm soát với một eK khác nhau. Đây là cách dữ liệu được mã hóa:

1. Khi người dùng ký thông báo đồng ý quyền truy cập database, `sK`, `eK` và `salt` (chuỗi data được sinh random) được lấy từ 3ID 
2. Khóa (PLAIN_KEY) và giá trị được xâu chuỗi lại với nhau và được thêm để có độ dài là bội số của 24
3. Đầu ra của bước 2 được mã hóa bằng `eK` bằng cách sử dụng `weetnacl secretbox` để lấy giá trị bản mã 
4. Tính toán khóa bằng cách lấy hàm băm (PLAIN_KEY | salt) 
5. Lưu trữ cặp `key-value`, với khóa từ bước 4 và giá trị bản mã từ bước 3
## OrbitDB: Peer to Peer Databases
![](https://images.viblo.asia/37053c66-e30f-4fca-9c18-0d5384c89d4e.png)


Dữ liệu 3Box được lưu trữ trong các trường hợp cơ sở dữ liệu OrbitDB khác nhau. 

[OrbitDB](https://github.com/orbitdb/orbit-db) là một cơ sở dữ liệu ngang hàng, phân tán, ngang hàng. 3Box sử dụng  Javascript implementation của OrbitDB, hoạt động cả trong Browserst và Node.js. 

OrbitDB sử dụng [IPFS](https://ipfs.io/) làm nơi lưu trữ dữ liệu và IPFS Pubub để tự động đồng bộ hóa cơ sở dữ liệu với các peers. Cuối cùng, đây là cơ sở dữ liệu nhất quán sử dụng [CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) để hợp nhất cơ sở dữ liệu xung đột, làm cho OrbitDB trở thành một lựa chọn tuyệt vời cho các ứng dụng phi tập trung (dApps), ứng dụng blockchain và ứng dụng web ngoại tuyến.

### Database Types

OrbitDB cung cấp nhiều loại cơ sở dữ liệu cho các mô hình dữ liệu và trường hợp sử dụng khác nhau. Tại thời điểm này, 3Box sử dụng các loại sau: 
* [Keyvalue](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbkeyvaluenameaddress): cơ sở dữ liệu key-value.
* [Feed](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbfeednameaddress): một bản log có thể thay đổi. Các mục có thể được thêm và loại bỏ. Đặc biệt hữu ích cho trường hợp sử dụng "shopping cart" hoặc các bài đăng trên blog hoặc "tweet" 

>  Trong  3Box , cách lưu trữ `key-value` được sử dụng cho `space` trong khi `feed` được sử dụng cho `thread`.
>  

## IPFS: Peer to Peer File Storage
![](https://images.viblo.asia/57975281-b8ec-4a32-bb1d-ab7fba836c14.png)


Vì 3Box là một hệ thống để quản lý dữ liệu người dùng trên web phi tập trung thế nên IPFS - một mạng lưu trữ tệp ngang hàng cơ bản được sử dụng trong 3Box.

### Về IPFS
IPFS ([The InterPlanetary File System](https://ipfs.io)) là một hệ thống định danh nội dung, peer-to-peer. IPFS cung cấp dữ liệu cho phép tạo ra các ứng dụng phân tán hoàn toàn  nhằm mục đích làm cho web nhanh hơn, an toàn hơn và mở hơn. 

IPFS là một hệ thống file phân tán tìm cách kết nối tất cả các thiết bị điện toán với cùng một file system . Điều này tương tự như mục đích ban đầu của Web, tuy nhiên IPFS thực sự giống với một bittorrent swarm hơn.

### Định tuyến dữ liệu
Các đối tượng dữ liệu trong IPFS là các content-addressed (được biểu thị bằng nhiều hàm băm của nội dung, còn được gọi là định danh nội dung (CID)) thay vì location address (http) như dữ liệu trong kiến trúc web http truyền thống. 

Nếu nội dung của một đối tượng thay đổi, đối tượng sẽ nhận được một địa chỉ mới. Người tham gia chỉ cần yêu cầu mạng tìm kiếm nội dung và mạng sẽ thực hiện định tuyến thích hợp để tìm và trả lại nội dung, bất kể node nào đang lưu giữ thông tin. Điều này làm giảm sự phụ thuộc vào các máy chủ tập trung để lưu trữ thông tin,  thay vào đó cho phép phân phối dữ liệu hoàn toàn mở và công khai.

### Duy trì dữ liệu (Data Persistence)
IPFS đã phát triển một giao thức cơ bản để duy trì dữ liệu, được gọi là Filecoin, nhằm mục đích đảm bảo rằng dữ liệu được thêm vào mạng IPFS vẫn có sẵn cho người dùng miễn là nhận được một số thanh toán. 

Tuy nhiên, Filecoin vẫn chưa phù hợp để sử dụng thương mại. Vì lý do này, 3Box vận hành một mạng lưới các `pin node` IPFS / OrbitDB để đảm bảo rằng dữ liệu 3Box vẫn khả dụng.

# Kết luận
Hi vọng qua bài viết này các bạn có thể hiểu thêm về kiến trúc cũng như cách thức hoạt động của 3Box. Để trải nghiệm rõ hơn về các tính năng của 3Box, vui lòng tham khảo thêm tại [đây](https://3box.io/hub).
# Nguồn tham khảo
https://docs.3box.io/