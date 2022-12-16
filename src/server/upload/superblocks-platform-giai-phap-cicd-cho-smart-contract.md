![](https://images.viblo.asia/7ad0bde3-b700-4bfe-ab86-027327dd0ee6.png)


<br>

Hiện nay công cụ để phát triển smart contract ethereum phổ biến được nhiều developers sử dụng đó chính là truffle. Thì hôm nay mình xin giới thiệu đến mọi người một nền tảng nữa chuyên được sử cho việc CI/CD (auto test/auto deploy) đó chính là nền tảng **[superblocks](https://superblocks.com/)**

Thì **Superblocks** là một nền tảng chuyên cung cấp giải pháp auto testing và auto deploy cho các dự án sử dụng smartcontract Ethereum. Nó tạo ra một quy tình an toàn và tự động hỗ trợ cả môi trường development đến môi trường production. Nền tảng này bao gồm 3 tính năng chính:

- **Continuous Integration [beta]**: Một hành động khuyến khích các developer nên thường xuyên commit code của mình vào branch master. Thay vì việc xây dựng độc lập và cuối cùng mới ghép chúng vào cuối của chu trình phát triển. Trong Superblocks thì bạn có thể test code của smart contract trên bất kỳ commit nào trong dự án.
- **Release Management [in development]**: Giúp deploy smartcontrat một cách an toàn trong môi trường private, testnet hoặc mainnet với việc sử dụng các wallet tích hợp được vào trình  duyệt  ví dụ như các wallet extension. Việc thao tác trong Superblocks sẽ giúp hạn chế việc để lộ các private keys trong quá trình sử dụng.
- **Monitoring [planned]**: Là phần hiển thị các thông tin phân tích, biểu đồ, thiết lập cảnh báo và log lại các sự kiện giúp dễ dàng tracking tình trạng tất cả các smartcontract trong nhiều dự án cùng một lúc.

# Ethereum Studio (IDE web cho smart contracts)

Đây là một IDE khá hay mà mọi người có thể tham khảo nó ngoải Remix. Nó hỗ trợ tạo project, deploy trên máy ảo của nó và mô phỏng môi tường browser. Cách sử dụng cũng rất đơn giản đầu tiên sau khi truy cập trang nó sẽ yêu cầu chúng ta connect với metamask sau đó là hỏi muốn create project theo mẫu như thế nào

![](https://images.viblo.asia/2a5068f5-8151-4370-8085-743c10f533b1.png)


Ở đây mình sẽ chọn và demo với template `HelloWorld`

![](https://images.viblo.asia/aaf93995-eb39-4afe-ab69-efda37eb7d79.png)

Project thì đã được config để kết nối với một UI chúng ta sẽ chỉ cần test nữa thôi. Trong phần deploy chúng ra có thể chọn config để thêm tham số khi khởi tạo

![](https://images.viblo.asia/7288298c-5d20-4048-9cfd-e94213523b3e.png)

![](https://images.viblo.asia/2a695c43-6adb-4353-85a0-95ce8934113c.png)


Sau đó chọn deploy và đợi cho công việc deploy thành công là mình có thể test được

![](https://images.viblo.asia/34afd91a-7095-420c-9344-9c523c9556f1.png)

Lúc này trong phân Interact ta cũng có thể test giống như bên remix nhưng ở đây mình sẽ có thể xem luôn kết quả trên giao diện

![](https://images.viblo.asia/9f5dfdba-23bf-4ecc-8286-8d0ade7e6fe7.png)

![](https://images.viblo.asia/3efe3fc6-824d-4b64-a054-3c1c62155acb.png)

Cấu trúc thư mục của project sau khi đã Compile sẽ như sau và các hướng dẫn chi tiết đã có trong file README

![](https://images.viblo.asia/14e2d3a0-e16b-449c-8f5e-5a9f4c4a22ec.png)

Nút Share bên góc trái có thể giúp mọi người chia sẻ code và nhúng vào đâu đó

![](https://images.viblo.asia/5e13cb1b-4717-4066-96e6-c1242e6f7c66.png)


&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  [![Edit Project](https://studio.ethereum.org/static/img/open-studio.svg)](https://studio.ethereum.org/5ecb6b5e26b4730012353d01)


Và cũng có thể tải project về dạng zip nha

![](https://images.viblo.asia/e9143bf2-63cf-4321-b3eb-7037c7edecde.png)


# Getting started

Trên là một chút giới thiệu qua về **Ethereum Studio** phần tiếp theo này chúng ta sẽ đi vào cách sử dụng của Superblocks

### Sign Up to Superblocks

Đầu tiền cần Sign up tải khoản tại: https://superblocks.com/d/login

![](https://images.viblo.asia/3d02c882-ed4c-4896-bce5-33f2258c4050.png)

Tiếp đến sẽ là bước xác thực cấp quyền

![](https://images.viblo.asia/06bd1da2-d514-42fc-a6db-24154a93ddaa.png)

Ngay khi đăng ký và xác thực thành công nó sẽ gợi ý bạn tạo Organization

![](https://images.viblo.asia/5f6b7ef1-51f4-4293-8f37-4cc54cf6f6cf.png)

![](https://images.viblo.asia/58f62ea3-8cc9-4875-80b1-e8653f25d24a.png)

Bây giờ chúng ta sẽ tạo project

![](https://images.viblo.asia/65d0a00c-4e30-40f4-a75e-2327b65f0a15.png)

![](https://images.viblo.asia/f066c583-a37d-4363-a4fb-e21f203a2772.png)

Set up  cho việc build project, do đã connect với github nên chúng ta sẽ chỉ cần chọn Repo mong muốn

![](https://images.viblo.asia/b7908d53-a0c3-4245-a443-9b81dbf7514a.png)

Tiếp đến là chọn mẫu cho file YAML ở đây mình chọn kiểu của truffle

![](https://images.viblo.asia/a659b6a8-0e23-4272-9f12-e2ff646a63cf.png)

Create xong project

![](https://images.viblo.asia/deebded9-22ca-4ba2-ab4b-9570429d7053.png)

Run build

![](https://images.viblo.asia/01e785b8-a36c-4aa1-aaf2-bf800f851ed5.png)

### Setting cho organization

Superblocks thì được cấu trúc xung quanh khái niệm organization. Mỗi organization sẽ bao gồm một hoặc nhiều project (repo với smart contract) và cũng cho phép nhiều người tham gia một organization. Điều này giúp người dùng có thể bao quát được nhiều project và quản lý luôn những người được tham ra vào origanization. Trong phần setting bạn có thể thực hiện những tác vụ sau:

- **General Settings**: Thiết lập các thông tin chung của organization

![](https://images.viblo.asia/d476c60b-3e6f-410c-8818-2e93bf99ca23.png)

- **Projects**: Tạo một project mới hoặc bộ lọc cho các project hiện có.

![](https://images.viblo.asia/b6c7ea80-16b1-4ae9-9335-ec796080cad0.png)

- **Workspaces**: Tạo một workspace mới hoặc bộ lọc cho workspace đã tồn tại

![](https://images.viblo.asia/531083c9-acc2-408c-9311-3edffff160fd.png)

- **Members**: Có thể  Invite hoặc remove người khỏi organization, Manage role truy cập

![](https://images.viblo.asia/b6f399bd-3460-4ba5-803d-9b94e833ca44.png)

### Role-based access control

Trong phần member này có thể invite với 2 role đó là member và owner:
- **Member**: Có khả năng tạo project mới, xem những ai tham gia vào organization, xem và quản lý các bản builds.
- **Owner**: Sẽ có quyền gồm tất cả các quyền của member và bao gồm thêm đầy đủ các quyền administrative access. Administrators thì có thể sửa đổi quyền truy cập của những người khác, invite hoặc remove member, delete các project và delete toàn bộ organization

# Pipelines, Jobs và Stages

***Pipelines*** thì được xác định bởi một nhóm các ***Jobs***, sẽ được thực hiện theo một cách tuần tự, không tuần tự hoặc có thể xác định theo một chương trình (***Stages***). Một Pipeline trong Superblocks thì được mô tả bằng một configuration có name là `superblocks.yaml`. Khi một repository được kết nối với project, Superblocks sẽ đảm nhận việc thiết lập và chạy các pipeline mới. Pipelines sẽ phản hồi lại với các event được kích hoạt do các tương tác được thực hiện trong repository đã được connected.

Màn hình Pipelines sẽ hiển thị tất các các actions thực hiện bằng Superblocks. Mỗi pipeline entry thì được mô tả như sau:

- **Status**: Status hiện tại của pipeline cac giá trị hiển thỉ của các status này sẽ là : `created`, `pending`, `running`, `success`, `failed`, `canceled`, `skipped` và `manual`
- **Pipeline**: Sẽ được định danh duy nhất
- **Branch**: Thuộc branch nào
- **Commit**: References với commit cuối cùng (HEAD) của branch đó
- **Time and date**: Tổng thời gian trôi qua từ khi pipeline được bắt đầu

![](https://images.viblo.asia/86da3673-9999-4b24-b893-10e1a03e800a.png)

**Job** đại diện cho một đơn vị nhỏ nhất trong một **Pipeline**. Nó thì là một đơn vị thực thi ví dụ: automated, testing, compiling và distribution. Vì `jobs` là một phần của pipeline nên nó sẽ được định nghĩa trong file cấu hình. Tương tự như pipeline thì jobs cũng sẽ được hiện thỉ như sau:

- **Status**: status hiện tại của job thể hiện qua các giá trị: `created`, `pending`, `running`, `success`, `failed`, `canceled`, `skipped`, và `manual`
- **Job**: Được định danh duy nhất
- **Commit**: References với commit cuối cùng(HEAD)
- **Pipeline**: Xác định xem nó thuộc về pipeline nào
- **Stage**: Là giai đoạn mà job liên quan
- **Name**: Đề cập đến job name mà được mô tả trong file config
- **Time and date**: Tổng thời gian thực hiện kể từ khi job được bắt đầu

![](https://images.viblo.asia/7fdf55b0-ca54-4677-a50a-fa4a1e2710fe.png)

**Stages** giống như phần nhóm một hoặc nhiều `jobs` vào thành một giai đoạn nào đó và đặt tên cho nó.  Stages thì có thể được sử dụng để đánh nhãn, tổ chức và sắp xếp các jobs thành một chuỗi các công việc phụ thuộc vào nhau. Một stage thì có thể chứa nhiều `jobs` và chúng được chạy song song.

# Giới thiệu về Configuration
Thì phần này chính là phần ta định nghĩa file `superblocks.yaml`. Nếu bạn nào đã từng dùng docker thì phần này khá giống với việc định nghĩa Dockerfile

Một configuration file sẽ có dạng như thế này

```yaml
    version: 1
    jobs:
      hello:
        image: alpine
        script:
          - echo Hello world!
```

#### Multiple jobs
Có thể định nghĩ Multiple jobs bằng cách định nghĩa từng job một
```yaml
    version: 1
    jobs:
      compile:
        image: node
        script:
          - npm install truffle
          - npm install
          - npx truffle compile
      test:
        image: node
        script:
          - npm install truffle
          - npm install
          - npx truffle test
```

#### Stages

Thì để định nghĩa các công  việc được hoàn thành đúng tuần tự thì chúng ta sẽ sử dụng đến Stages. Như ở đây mình sẽ định nghĩa các jobs trước sau đó mình sẽ định nghĩa stages xem job nào được chạy trước job nào được chạy sau

```yaml
    version: 1
    jobs:
      compile:
        image: node
        script:
          - npm install truffle
          - npm install
          - npx truffle compile
      test:
        image: node
        script:
          - npm install truffle
          - npm install
          - npx truffle test
    stages:
      - custom_sequence:
          jobs:
            - compile
            - test
```

Ngoài ra thì cũng có thể định nghĩa job luôn trong chính stage

```yaml
    [...]
    stages:
      - compile:
          jobs:
            - compile
      - test:
          jobs:
            - test
```


Ví dụ một cấu hình file `superblocks.yaml`

**Truffle**

```yaml
    version: 1
    jobs:
      compile:
        image: node
        script:
          - npm install truffle
          - npm install
          - npx truffle compile
      test:
        image: node
        script:
          - npm install truffle
          - npm install
          - npx truffle test
    stages:
      - pipeline:
          jobs:
            - compile
            - test
```

**Embark**
```yaml
    version: 1
    jobs:
      build:
        image: node
        script:
          - yarn add --dev ganache-cli embark
          - yarn install
          - npx embark build
      test:
        image: node
        script:
          - yarn add --dev ganache-cli embark
          - yarn install
          - npx embark test
    stages:
      - pipeline:
          jobs:
            - build
            - test
```


**Buidler**

```yaml
    version: 1
    jobs:
      compile:
        image: node
        script:
          - npm install @nomiclabs/buidler @nomiclabs/buidler-truffle5 @nomiclabs/buidler-web3 web3
          - npm install
          - npx buidler compile
      test:
        image: node
        script:
          - npm install @nomiclabs/buidler @nomiclabs/buidler-truffle5 @nomiclabs/buidler-web3 web3
          - npm install
          - npx buidler test
    stages:
      - pipeline:
          jobs:
            - compile
            - test
```

Để có thể hiểu rõ hơn về các config này các bạn có thể truy cập tại đây để đọc chi tiết hơn: [here](https://superblocks.com/docs/configuration/configuration-reference/#section=configuration)

# Kết luận
Bài viết với nội dung giới thiệu về nền tảng Superblocks nên mình sẽ không đi lan man nữa. Trong bài viết tiếp theo mình sẽ hướng dẫn cách deploy một project sử dụng thằng superblock này. Cảm ơn và hẹn gặp lại các bạn trong các bài viết tiếp theo.

###### Nguồn: https://superblocks.com/docs