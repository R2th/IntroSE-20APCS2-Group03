Trong một Sawtooth Network, mỗi một host system ( có thể là máy tính vật lý, máy ảo, bộ Docker Containers, hoặc một Kubernetes Pod ) là một Sawtooth node mà trên nó có chạy một **validator**, một tùy chọn **REST API** , một **consensus engine**, một bộ các **transaction processors**.<br><br>
Sẽ có một node đầu tiên tạo ra genesis block, genesis block có vai trò xác định các cài đặt on-chain ban đầu cho network.<br><br>
Một Sawtooth Network có những yêu cầu sau:<br>
   - Mỗi node phải chạy cùng một **consensus engine**. Các bước trong bài viết này sẽ cho bạn thấy cách cấu hình **PBFT và PoET consensus**.<br><br>
   - Mỗi node phải chạy cùng một bộ **transaction processors** với tất cả các nodes khác trong network.<br><br>
   - Mỗi node phải có một address. Việc này được Docker và Kubernetes cung cấp các cài đặt được cấu hình sẵn. Còn đối với môi trường ubuntu bạn phải cấu hình các cài đặt network trước khi starting **validator**.<br><br>
   -  Loại authorization phải giống nhau trên tất cả các nodes: hoặc **trust** hoặc **challenge**.<br><br>
   -  Node đầu tiên trên network phải tạo genensis block, genesis block sẽ chứa các cấu hình cài đặt on-chain, các nodes sau này khi join vào network sẽ dùng cấu hình có sẵn này.
## Sử dụng Docker cho Sawtooth Network
Quy trình này mô tả việc sử dụng Docker để tạo một network gồm 5 node chạy một môi trường phát triển ứng dụng. Mỗi node là một bộ Docker Containers chạy một **validator** và các thành phần liên quan khác.
- Download Sawtooth Docker Compose file.
- Starting Sawtooth Network với *docker-compose*.
- Kiểm tra trạng thái tiến trình.
- Cấu hình các loại transaction được phép.
- Kết nối đến Sawtoot Shell Container và *confirm network functionality*.
- Stopping Sawtooth và Reset môi trường docker.

### 1. Về môi trường Docker Sawtooth Network.
Một môi trường thử nghiệm gồm 5 node Sawtooth.<br><br>
Với mỗi node như sau: ![](https://sawtooth.hyperledger.org/docs/core/releases/latest/_images/appdev-environment-multi-node.svg)<br><br>
Mỗi node trong mạng Sawtooth network này đều chạy một **validator**, một **REST API**, một **consensus engine**, và các **transaction processors** sau:
- **Settings** (```settings-tp```) : Xử lý các cài đặt cấu hình on-chain của Sawtooth. **Settings transactions processor** bắt buộc phải có trên tất cả các Sawtooth Network.
- **IntegerKey** (```intkey-tp-python```) : Thể hiện các chức năng cơ bản của Sawtooth. ```intkey``` client bao gồm các lệnh shell commands để thực hiện các integer-based transactions.
- **XO** (```sawtooth-xo-tp-python```) : Ứng dụng chơi tic-tac-toe đơn giản trên blockchain. ```xo``` client cung cấp các shell commands để định nghĩa người chơi và cách việc chơi game. 
- (PoET only) **PoET Validator Registry** (```poet-validator-rigistry```): Cấu hình PoET consensus và xử lý một network nhiều node.

> NOTE: Các nodes trong Sawtooth Network phải chạy cùng một bộ transaction processor.


Môi trường Dock Sawtooth Network sử dụng **transaction processing** song song và bạn có thể chọn 1 trong 2 consensus sau:
- **PBFT consensus**: cung cấp một thuật toán đồng thuận votting-based có khả năng chịu lỗi Byzantine.
- **PoET consensus**: cung cấp thuật toán đồng thuận leader-election, có cách gọi khác là PoET CFT.
<br>
### 2. Yêu cầu trước khi thực hành
Môi trường phát triển ứng dụng này yêu cầu Docker Engine và Docker Compose.
### 3. Thực hành
##### Bước 1. Download Docker Compose File
Download Docker Compse file cho multiple-node network:
- Nếu bạn sử dụng PBFT, download [sawtooth-default-pbft.yaml](https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/sawtooth-default-pbft.yaml)
- Nếu bạn sử dụng PoET, download [sawtooth-default-poet.yaml](https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/sawtooth-default-poet.yaml)
##### Bước 2. Start Network <br>

> NOTE: Docker Compose File cho phép Sawtooth xử lý các bước cài đặt môi trường chẳng hạn như sinh keys và tạo genesis block.

1. Mở một của sổ terminal.
2. Di chuyển đến thư mục mà bạn vừa tải docker compose file về.
3. Start network:
    - Cho PBFT: 
    ```bash
    user@host$ docker-compose -f sawtooth-default-pbft.yaml up
    ```
    - Cho PoET:
    ```
    user@host$ docker-compose -f sawtooth-default-poet.yaml up
    ```
4. Các Compose files ở trên sẽ tạo 5 nodes có tên là ```validator-0```, ```validator-1```, ```validator-2```, ```validator-3```, ```validator-4```. Lưu ý, mỗi một node validator sẽ có các component sau, chẳng hạn:<br>
    ```validator-0``` sẽ có:
    - ```sawtooth-validator-default-0```
    - ```sawtooth-rest-api-default-0```
    - ```sawtooth-pbft-engine-default-0``` hoặc ```sawtooth-poet-engine-0```
    - ```sawtooth-settings-tp-default-0```
    - ```sawtooth-intkey-tp-python-default-0```
    - ```sawtooth-xo-tp-python-default-0```
    - (PoET only) ```sawtooth-poet-validator-registry-tp-0```<br>
5. Lưu ý rằng ta chỉ có một shell container cho môi trường Docker này:<br>
    ```sawtooth-shell-default```<br>
##### Bước 3. Kiểm tra tiến trình REST API.
1. Kết nối đến REST API container trên một node nào đó, chẳng hạn như ```sawtooth-poet-sawtooht-rest-api-default-0```:
    ```bash
    user@host$ docker exec -it sawtooth-rest-api-default-0 bash
    root@b1adcfe0#
    ```
2. Sử  dụng câu lênh sau đây để chắc chắn rằng component này đang chạy:
    ```bash
    root@b1adcfe0# ps --pid 1 fw
    PID TTY      STAT   TIME COMMAND
      1 ?        Ssl    0:00 /usr/bin/python3 /usr/bin/sawtooth-rest-api
      --connect tcp://validator-0:4004 --bind rest-api-0:8008
    ```
 ##### Bước 4. Confirm các chức năng Network
 1. Kết nối đến shell container
    ```bash
    user@host$ docker exec -it sawtooth-shell-default bash
    root@0e0fdc1ab
    ```
2. Để kiểm tra xem liệu  việc trao đổi dữ liệu giữa các peer có tồn tại trên network hay không, thực hiện một câu truy vấn đến REST API trêm node đầu tiên. Lệnh này cần phải chỉ định tên container và port của REST API của node đầu tiên:
    ```
    root@0e0fdc1ab# curl http://sawtooth-rest-api-default-0:8008/peers
    ```
    Nếu kết quả trả về là 503 Error thì có nghĩa là các nodes vẫn chưa được kết nối đến network. Lặp lại truy vấn cho đến khi kết quả trả về có dạng như sau:
    ```
    {
    "data": [
    "tcp://validator-4:8800",
    "tcp://validator-3:8800",
    ...
    "tcp://validator-2:8800",
    "tcp://validator-1:8800"
   ],
   "link": "http://sawtooth-rest-api-default-0:8008/peers"
    ```
3. (Tùy chọn) Bạn có thể chạy các câu lệnh sau để xem các nodes khác trong network.<br><br>
    a. Chạy câu lệnh ```sawtooth peer list``` để xem các peers của một node cụ thể. Ví dụ, câu lệnh sau đây chỉ định REST API trên node đầu tiên , nó sẽ trả về các peers của node đầu tiên.
    ```bash 
    root@0e0fdc1ab# sawtooth peer list --url http://sawtooth-rest-api-default-0:8008
    tcp://validator-1:8800,tcp://validator-1:8800,tcp://validator-2:8800,tcp://validator-3:8800
    ``` 
    
   b. Chạy câu lệnh ```sawnet peer list``` để hiển thị toàn bộ peers của network .<br>
   ```bash
   root@0e0fdc1ab# sawnet peers list http://sawtooth-rest-api-default-0:8008
   {
   "tcp://validator-0:8800": [
   "tcp://validator-1:8800",
   "tcp://validator-1:8800",
   "tcp://validator-2:8800",
   "tcp://validator-3:8800"
   ]
   }
   ```
4. Submit một transaction đến REST API của node đầu tiên. Ví dụ sau đây set một key tên ```myKey``` bằng 999:
   ```bash
   root@0e0fdc1ab# intkey set --url http://sawtooth-rest-api-default-0:8008 MyKey 999
   ```
    đầu ra của transaction phải giống sau đây:
    ```bash
    {
   "link": "http://sawtooth-rest-api-default-0:8008/batch_statuses?id=dacefc7c9fe2c8510803f8340...
    }
    ```
5. Xem lại giá trị ```myKey``` trên một node khác. Lệnh sau truy xuất giá trị ```myKey``` trên node thứ hai:<br>
    Bạn có thể chạy luôn câu lệnh này trên shell container của node thứ nhất, nhưng thay ```--url``` thành URL của node thứ hai:
    ```bash
     root@0e0fdc1ab# intkey show --url http://sawtooth-rest-api-default-1:8008 MyKey   
    ```
    Kết quả trả về tên của key và giá trị hiện tại của nó:
    ```bash
    MyKey: 999
    ```

##### Bước 5. Cấu hình các transaction được phép <br>
Mặc định, một **validator** chấp nhận tất cả transaction đến từ bất cứ **transaction processor** nào. Tuy nhiên, Sawtooth cho phép bạn có thể giới hạn loại của transaction được phép submit.<br><br>
Ở bước này, bạn sẽ cấu hình Sawtooth network chỉ chấp nhận các transaction đến từ **transaction processors** đang chạy trong môi trường docker mà chúng ta đang chạy. Cấu hình để hạn chế loại transaction là một cài đăt on-chain, nên chúng ta chỉ cần cấu hình trên một node, nó sẽ được applied đến tất cả các nodes còn lại.<br><br>
Bạn sẽ sử dụng lệnh ```saw set``` để tạo và submit một batch các transactions mà trong đó có chứa các thay đổi cấu hình.

> NOTE: Việc này phải duocdj thực hiện trên validator container thứ nhất, vì theo như Docker compose file, 
key của validator thứ nhất được dùng để tạo và ký genesis block, có nghĩa là chỉ có key nào được sử dụng 
để tạo genesis block mới có thể thay đổi các thay đổi on-chain.

1. Kết nối đến validator container thứ nhất (```sawtooth-validator-default-0```). 
   ```bash
   user@host$ docker exec -it sawtooth-validator-default-0 bash
   root@c0c0ab33#
   ```
2. Chạy câu lệnh sau trong validator container thứ nhất để chỉ định những transaction families được phép submit:
   - Cho PBFT:
      ```
      root@c0c0ab33# sawset proposal create --url http://sawtooth-rest-api-default-0:8008 --key /etc/sawtooth/keys/validator.priv \
      sawtooth.validator.transaction_families='[{"family": "intkey", "version": "1.0"}, {"family":"sawtooth_settings", "version":"1.0"}, {"family":"xo", "version":"1.0"}]'
      ```
   - Cho PoET:
      ```
      root@c0c0ab33# sawset proposal create --url http://sawtooth-rest-api-default-0:8008 --key /etc/sawtooth/keys/validator.priv \
      sawtooth.validator.transaction_families='[{"family": "intkey", "version": "1.0"}, {"family":"sawtooth_settings", "version":"1.0"}, {"family":"xo", "version":"1.0"}]'
      ```
      Câu lệnh trên đặt một biến ```sawtooth.validator.transaction_families``` là một mảng các JSON chỉ định family name và version cho mỗi transaction processor  
3. Sau khi chạy câu lệnh trên, một message ```TP_PROCESS_REQUEST``` được trả về:
    ```
    .
    .
    .
   sawtooth-settings-tp-default-0  | INFO  | settings_tp::handler | Setting "sawtooth.validator.transaction_families" changed to "[{\"family\": \"intkey\", \"version\": \"1.0\"}, {\"family\":\"sawtooth_settings\", \"version\":\"1.0\"}, {\"family\":\"xo\", \"version\":\"1.0\"}, {\"family\":\"sawtooth_validator_registry\", \"version\":\"1.0\"}]"
   sawtooth-settings-tp-default-0  | INFO  | sawtooth_sdk::proces | TP_PROCESS_REQUEST sending TpProcessResponse: OK```
4. Chạy lệnh sau để kiểm tra các sự thay đổi cài đặt trên shell container của bất kỳ validator container nào. Bạn có thể chỉ định bất kỳ REST API nào có trên network.
   ```
   root@0e0fdc1ab# sawtooth settings list --url http://sawtooth-rest-api-default-0:8008
   ```
    Kết quả trả về tương tự như sau:
    ```
    sawtooth.consensus.algorithm.name: {name}
   sawtooth.consensus.algorithm.version: {version}
   ...
   sawtooth.publisher.max_batches_per_block=1200
   sawtooth.settings.vote.authorized_keys: 0242fcde86373d0aa376...
   sawtooth.validator.transaction_families: [{"family": "intkey...
    ```
##### Bước 6. Stop network.
Sử dụng bước này để stop hoặc reset môi trường. <br><br>
1. Exit tất cả các containers.
2. ```Ctrl C```tại của sổ mà bạn chạy câu lệnh ```docker-compose up```.
3. Xóa tất cả các container và data:
   - Cho PBFT:
     ```
     user@host$ docker-compose -f sawtooth-default-pbft.yaml down
     ```
    - Cho  PoET:
       ```
       user@host$ docker-compose -f sawtooth-default-poet.yaml down
       ```
### Link Tham Khảo
https://sawtooth.hyperledger.org/docs/core/releases/latest/app_developers_guide/docker_test_network.html