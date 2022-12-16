![](https://images.viblo.asia/1e353a78-f667-4aba-8c72-39a8f03fde75.png)


# Giới thiệu
Ngay như phần tiêu đề đã nói thì **3Box** là một hệ thống lưu trữ dữ liệu người dùng an toàn và phi tập trung. Nhưng dữ liệu người dùng ở đây không phải là dữ liệu người dùng thông thường mà là dữ liệu người dùng trên mạng blockchain Ethereum. Nó giúp các nhà phát triển chỉ cần tập trung xây dựng các tính năng khác của ứng dụng mà không cần phải quan tâm đến phần xử lý dữ liệu người dùng nữa. Có thể hình dung trước kia khi xây dựng một dApp ta muốn quản lý dữ liệu người dùng thì cần phải lưu trữ dữ liệu vào một database để khi cần tương tác có thể lấy ra hay sửa đổi. Nhưng như vậy ta sẽ cần duy trì một server Back-End để quản lý DB, đó có thể là MongoDB(nodejs) hay Firebase. Giờ đây 3Box sẽ làm điều đó và ta có thể xây dựng một dApp hoàn toàn với chỉ Front-End mà thôi.

# Những ưu điểm của 3Box
&nbsp;
##### Giảm thiểu bớt đi sự tập trung của dữ liệu.
**3Box** cho phép các developers web front-end có thể lư trữ dữ liệu người dùng trên mạng lưu trữ mở thay vì lư trữ tập trung trên một server, localStorage của browser người dùng hay trên blockchain. Với việc sử dụng 3Box các deverloper có thể xây dụng ứng dụng một các nhanh chóng, an toàn, nhẹ và mạnh mẽ hơn
> Hiện nay các nhà deverloper 3Box thường là các developer sử dụng Web3 để xây dựng các ứng dụng Front-End trên Ethereum. Mục tiêu của  họ là xây dựng được những dApp phi tập trung nhất có thể để giản thiểu việc dữ liệu bị tập trung. 

&nbsp;

##### Phát triển nhanh hơn với các API và công cụ có sẵn
3Box thì cung cấp cho các developers một bộ công cụ dễ dàng sử dụng để nhanh chóng xây dựng các ứng dụng và có khả năng mở rộng cao. API của 3Box hỗ trợ các tính năng như identity, auth, profiles, storage và messaging. Có thể tích hợp dễ dàng vào ứng dụng bằng các JavaScript SDKs dưới đây:
    
  + [ Identity API ](https://docs.3box.io/api/identity) cho phép các developers thực hiện định danh người dùng và thực hiện các account functionalities
   + [ Auth API ](https://docs.3box.io/api/auth) authentication  là điều cần thiết để có thể cập nhật dữ liệu, giải mã dữ liệu private và tương với các store lưu trữ dữ liệu của người dùng.
   + [Profiles API](https://docs.3box.io/api/profiles) giúp các developers có thể thực hiện các tác vụ khác nhau trên general profile của người dùng như **get** hoặc **set**. General profile là nơi được sử dụng để lưu trữ các thông tin có thể dễ dàng chia sẻ trên các ựng dụng như tên, hình ảnh,...
   + [Storage (Spaces) API ](https://docs.3box.io/api/storage) được sử dụng để lưu trữ các thông tin của ứng dụng như content, document, settings và cũng có thể là thông tin quan trọng.
  + [ Messaging (Threads) API ](https://docs.3box.io/api/messaging) hỗ trợ tạo ra các hệ thống nhắn tin, trò chuyện trự tuyến
    
&nbsp;

##### Lưu trữ dữ liệu phi tập trung đáng tin cậy trên IPFS và OrbitDB 
3Box là hệ thống lưu trữ dữ liệu phi tập trung sử dụng **IPFS** cho lưu trữ, **OrbitDB** cho cấu trúc cơ sở dữ liệu và **3ID** cho identity phi tập trung. Để đảm bảo cho 3Box có thể hoạt động ổn định trên các công nghệ mới này thì 3Box có cung cấp thêm cơ sở hạ tầng cloud để bổ trợ nhằm đảm bảo hiệu suất cũng như độ tin cậy của mạng phi tập trung. Bao gồm các nút mạng lưu trữ, các services data pinning và các lớp bộ đệm.

&nbsp;

##### Cải thiện bảo mật và quyền riêng tư của dữ liệu người dùng
Kiến trúc phi tập trung của 3Box giúp loại bỏ các yếu tố mất an toàn của một hệ thống tập trung. Thông tin người dùng được bảo vệ tốt hơn, nó cũng mang lại nhiều quyền riêng tư cho người dùng và kiểm soát cách thức thông tin của họ được chia sẻ hay sử dụng bởi các ứng dụng khác. Khi dữ liệu được lưu trữ private trên 3Box thì các ứng dụng và người dùng khác không thể đọc được trừ khi chủ sở hữu cấp quyền.

&nbsp;

##### Hỗ trợ tính di động và khả năng tương tác với dữ liệu
Một trong những lợi ích lớn nhất của 3Box là dữ liệu đã được người dùng lưu trữ trên 3Box thì họ có thể dễ dàng mang sang các ứng dụng, mạng hay dịch vụ khác mà không cần phải tạo mới dữ liệu từ đầu. Có thể coi đây là tính di động và ngoài ra dữ liệu này thuộc về người dùng một cách đúng nghĩa vì nó không hề chịu sự chi phối nào như khi ta lưu trữ dữ liệu tập trung. Ngay cả 3Box cũng không thể chi phối dữ liệu này vì người dùng luôn có thể đưa dữ liệu của mình sang một nền tảng khác cùng tiêu chuẩn.

&nbsp;

##### Người dùng không cần cài đặt phần mềm
JavaScript SDKs của 3Box thì có thể chạy trực triếp trên browser hoặc là trên wallet của người dùng. Vì vậy người dùng không cần phải cài đặt thêm bất kỳ phần mềm bổ xung nào để sử dụng 3Box. 


# Hướng dẫn cài đặt và các sử dụng 3Box trên nền tàng Web

&nbsp;

**Đầu tiên cần tải package 3Box**
```shell
    npm install 3box
```
**Sau đó để import vào ứng dụng có các cách sau**
```js
    import Box from "3box";
```
hoặc 
```js
    const Box = require('3box')
```

**Import vào các ứng dụng html:**
```html
    <script type="text/javascript" src="../dist/3box.js"></script>
```
hay sử dụng một trong có link online sau:
```html
    <!-- The most recent version  -->
    <script src="https://unpkg.com/3box/dist/3box.js"></script>
    <!-- The most recent minified version  -->
    <script src="https://unpkg.com/3box/dist/3box.min.js"></script>
    <!-- Load specific versions by specifying the version as follows -->
    <script src="https://unpkg.com/3box@<version>/dist/3box.js"></script>
```

**Tối ưu cho các ứng dụng chỉ đọc dữ liệu**

Đối với những ứng dụng chỉ cần sử dụng 3Box để fetch dữ liệu public về để hiển thị và không thao tác với dữ liệu thì có thể sử dụng các API chỉ có chức năng đọc. Những API này sẽ không cần phải Authentication

```js
      const {
          profileGraphQL,
          getProfile,
          getProfiles,
          getVerifiedAccounts,
      } = require("3box/lib/api");
```

&nbsp;

Sau khi đã cài đặt ta có thể sử dụng và tương tác với 3Box dưới đây sẽ là các ví dụ:

### Get các Public Profiles

API này cho phép ta có thể fetch tất cả các thông tin Public của người dùng
```js
    const profile = await Box.getProfile(<ethereum-address or DID>)
    console.log(profile)
```

Example:

```js
    const profile = await Box.getProfile("0x12334...");
    //hoặc có thể get địa chỉ từ web3
    const profile = await Box.getProfile((await window.web3.eth.accounts)[0]);
    console.log(profile);
```
nếu người dùng chưa từng đăng ký tài khoản trên 3Box thì nó sẽ không thể tìm thấy được thông tin và trả về trạng thái 404

![](https://images.viblo.asia/8f45c690-aa7a-4d3b-9c19-a106c702b5fc.png)

Người dùng có thể vào đây để đăng tạo tài khoản: [tại đây](https://3box.io/hub)

![](https://images.viblo.asia/56fc4107-e9ce-41d1-9fa5-fa07422305ba.png)

Sẽ có nhiều lựa chọn wallet như ở đây mình dùng MetaMask

![](https://images.viblo.asia/65010f27-eed3-46ad-81c7-fa67d66cecca.png)

![](https://images.viblo.asia/adce8947-4899-43c3-bad0-360784c48969.png)

![](https://images.viblo.asia/8c3588de-baee-4d77-8d13-01d8fe4436fe.png)

![](https://images.viblo.asia/727e3d4a-edb4-4fc5-91f2-b643f1ed379f.png)

![](https://images.viblo.asia/fdd0ad2b-f98f-44c0-a8d7-8b5a471c1299.png)

Sau khi đã đăng ký xong người dùng sẽ được chuyển đến trang `edit profile`. Ở đây người dùng có thể cập nhật thông tin của mình, ảnh bìa, ảnh avatar... Nó cũng tạo luôn cho mình một khung chat với tất cả mọi người.

![](https://images.viblo.asia/958aeb83-0199-4ce8-8452-0e97ce686da1.png)

Nếu chúng ta cập nhật thông tin  cá nhân của mình xong thì có thể về ứng dụng của mình để get profile về.

![](https://images.viblo.asia/9686f8bd-6187-456f-b914-8f79993f86d1.png)


```js
    const profile = await Box.getProfile("0x12334...");
    //hoặc có thể get địa chỉ từ web3
    const profile = await Box.getProfile((await window.web3.eth.accounts)[0]);
    console.log(profile);
```

kết quả:

![](https://images.viblo.asia/2ca0c87b-a1fb-44be-8b99-0f5d28422daf.png)

Có thể vào phần `Data` để quản lý những dữ liệu đã cập nhật

![](https://images.viblo.asia/02aa60ea-d213-4114-ab2b-b07b1fa4ab69.png)

Xóa dữ liệu và view nguồn

![](https://images.viblo.asia/2a5ca687-a767-4807-9c5d-c5e53b3d541c.png)

Và đúng như nhà phát triển nói thì dữ liệu được lưu trữ hoàn toàn trên IPFS

![](https://images.viblo.asia/7cac05ce-44f0-4472-ba01-ef94a4bf01c5.png)

&nbsp;

### Authentication

Những thông tin get ở trên sẽ là những thông tin Public còn nếu muốn get những thông tin private thì cần phải Authentication mới thực hiện các thao tác như để decrypt dữ liệu private, cập nhật dữ liệu, xóa dữ liệu hay gửi tin nhắn được.


```js
    const box = await Box.openBox(<address>, <ethereumProvider>)
```

> **address** : ta có thể điền trực tiếp addresss `'0x12345...abcde'` hoặc get từ web3 `await window.web3.eth.accounts`
> 
> **ethereumProvider** : có cũng có thể get từ web3 `window.web3.currentProvider`

Example:

```js
     const box = await Box.openBox(
        (await window.web3.eth.accounts)[0],
        await window.web3.currentProvider
      );

     console.log(box);
```

Kết quả :

![](https://images.viblo.asia/35ce9907-4643-4fe5-9e67-d52e60e64503.png)

Popup MetaMask sẽ hiện ra để người dùng ký

![](https://images.viblo.asia/0b5f36ac-d927-43cd-805e-24c286ffd715.png)

Sẽ mất một khoảng thời gian để Authentication được thành công và trả về kết quả như trên

Khi người dùng lần đầu Authentication có thể tất cả dữ liệu sẽ chưa được đồng bộ với network. Vì vậy nên sử dụng thuộc tính `box.syncDone` để đồng bộ dữ liệu. Điều này cho phép bạn biết khi nào dữ liệu đã được đồng bộ.

```js
    await box.syncDone
```

&nbsp;
    
### SET Profile Data

Sau khi đã  Authentication lúc này ta có thể `set` hoặc `get` cả dữ liệu public lẫn dữ liệu priavte

**Public Data**
- Set một trường 
```js
    await box.public.set('name', 'nghĩa')
```

- Set nhiều trường 
```js
    await box.public.setMultiple(['emoji', 'description'], ['🐿️', 'có gì'])
```

**Private Data**
- Set một trường

```js
    await box.private.set('email', 'ngovannghia@gmail.com')
```

- Set nhiều trường

```js
    await box.private.setMultiple(['location', 'alias'], ['home', 'Tồ'])
```

Example:

```js
    async function getProfile() {
      let profileOld = await Box.getProfile((await window.web3.eth.accounts)[0]);
      console.log("Profile Old", profileOld);
    }
    
    async function updateProfile() {
      const box = await Box.openBox(
       (await window.web3.eth.accounts)[0],
        await window.web3.currentProvider);
      await box.syncDone;

      let result = await box.public.set("name", "nghĩa");
      console.log(result);

      let profileNew = await Box.getProfile((await window.web3.eth.accounts)[0]);
      console.log("Profile New", profileNew);
    }
    
    ...
    
         <button onClick={updateProfile}>Update</button>
    
    ...
    
```

Kết quả:

![](https://images.viblo.asia/e67155ec-ccc0-4de8-93fc-e678cc20ed83.png)

Phần private cũng sẽ lầm tương tự như public

&nbsp;

### Get Profile Data

**Public Data**
- Get một trường 

```js
    await box.public.get('name')
```

- Get tất cả
```js
    const profile = await box.public.all()
```

**Private Data**
- Get một trường
```js
    const email = await box.private.get('email')
```

- Get tất cả 
```js
    const secretProfile = await box.private.all()
```

&nbsp;


### Remove Profile Data

**Public Data**
```js
    await box.public.remove('name')
```

**Private Data**
```js
    await box.private.remove('email')
```

Example:

```js
    async function getProfile() {
      let profileOld = await Box.getProfile((await window.web3.eth.accounts)[0]);
      console.log("Profile Old", profileOld);
    }

    async function removeProfile() {
      const box = await Box.openBox(
        (await window.web3.eth.accounts)[0],
        await window.web3.currentProvider
      );
      await box.syncDone;

      let result = await box.public.remove("name");
      console.log(result);

      let profileNew = await Box.getProfile((await window.web3.eth.accounts)[0]);
      console.log("Profile New", profileNew);
    }
    
    ...
    
        <button onClick={removeProfile}>Remove</button>
        
    ...
    
```

Kết quả:

![](https://images.viblo.asia/1d1f42af-bdd3-46ba-b365-1d6073d75543.png)

Ngoài những SDK cho nền tảng Web trên thì 3Box còn hỗ trợ các SDK khác như: **[Add Storage](https://docs.3box.io/build/web-apps/storage)** và **[Add Messaging](https://docs.3box.io/build/web-apps/messaging)**

&nbsp;

#### Các SDK Sử dụng cho Wallets
Mọi người có thể tham khảo tại đây: **[Wallets](https://docs.3box.io/build/wallets)**

&nbsp;
# Các plugins của 3Box giúp phát triển ứng dụng nhanh hơn

Ngoài những API có sẵn ở trên thì 3Box cũng hỗ trợ bằng cách tạo sẵn ra các plugins để developers có thể import vào ứng dụng của mình. Giúp phát triển sản phẩm nhanh nhất có thể

&nbsp;

### 3Box Profile Edit Plugin  📝
`3box-profile-edit-react` là một component React được dựng sẵn cung cấp cho các deverlopers một giao diện UI và logic để chỉnh sửa profile của người dùng. Component này thì gần như đầy đủ thành phần của một chức năng chỉnh sửa profile.

&nbsp;

**Linh demo: [tại đây](https://3box.github.io/3box-profile-edit-react/examples/dist/)**

Do đây là phần có thay đổi dữ liệu nên 3Box sẽ yêu cầu người dùng phải Authentication trước 

![](https://images.viblo.asia/5eb9265b-2870-4adf-a18e-883ea606010d.png)

Sau khi Authentication xong thì một giao diện với đầy đủ những trường thông tin mà ta cần sẽ hiện ra. Khi ta chỉnh sửa và lưu lại thì tất cả thông tin sẽ được lưu trữ lại trên 3Box mà ta không cần phải tạo một DB để lưu trữ nữa. Khi cần vẫn có thể dễ dàng đem ra sửa dụng

![](https://images.viblo.asia/a4b177d7-eea8-4564-9f68-1452960bd213.png)

Install componet 
```js
    npm i -S 3box-profile-edit-react
```

Phần Authentication

```js
     const box = await Box.openBox(userAddress, ethereumProvider)
     const space = await box.openSpace(spaceName)
```

Import vào ứng dụng

```js
    import EditProfile from '3box-profile-edit-react';

    const MyComponent = ({ customFields, box, space, myAddress, myProfile, redirectFn }) => (
        <EditProfile
            // required
            box={box}
            space={space}
            currentUserAddr={myAddress}

            // optional
            customFields={customFields}
            currentUser3BoxProfile={myProfile}
            redirectFn={redirectFn}
        />
);
```

`customFields` chính là các trường mà developers muốn tùy chỉnh truyền vào:

```js
        {
            inputType: 'text',
            key: 'name',
            field: 'Name'
          }, 

          { 
            inputType: 'textarea',
            key: 'description',
            field: 'Description'
          },

          { 
            inputType: 'dropdown',
            key: 'gender',
            field: 'Gender',
            options: [{ 
              value: '0',
              display: 'Male' 
            }, {
              value: '1',
              display: 'Female'
            }, {
              value: '2',
              display: 'Other'
            }]
          }
```

Để xem chi tiết các thuốc tính của component có thể truy cập: **[Tại Đây](https://docs.3box.io/build/plugins/profile-edit)**

&nbsp;

### 3Box Profile Hover Plugin  💥

`profile-hover` là một component được dựng sẵn để làm công việc hiển thị profile khi người dùng `hover` vào một tài khoản bất kỳ

Link demo: **[demo](https://3box.io/team)**

![](https://images.viblo.asia/5d6e763b-5fb5-46c4-99a1-2ecf19850151.gif)

Install component 

```shell
    npm i -S profile-hover
```

Import trong ứng dụng và chỉ cần truyền vào address của user muốn hiển thị

```js
    import ProfileHover from 'profile-hover';

    const MyComponent = () => (<ProfileHover address={'0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1'} />);
```

Install và import trong ứng dụng html:

```html
      <script type="text/javascript" src="https://unpkg.com/profile-hover@latest/dist/widget.js"></script>
```

```html
      <threebox-address data-address='0xa8ee0babe72cd9a80ae45dd74cd3eae7a82fd5d1'></threebox-address>
```

Để biết thêm về  các thuộc tùy trình có thể truy cập: **[Tại Đây](https://docs.3box.io/build/plugins/profile-hover)**

&nbsp;

### 3Box Comments Plugin 💬
`3box-comments-react` là component xây dựng sẵn chắc năng comment, giúp các developers giảm bớt đi công vệc phát triển tính năng này.

Link demo : **[demo](https://3box.github.io/3box-comments-react/examples/dist/)**

![](https://images.viblo.asia/7e0bf4f4-372f-4672-a749-49272d9b599c.png)

Install component

```shell
    npm i -S 3box-comments-react
```

Do chức năng này cũng có thay đổi dữ liệu nên cần phải Authentication

```js
    const box = await Box.openBox(adminEthAddr, ethereum);
    const space = await box.openSpace(spaceName, spaceOpts);
```

Ví dụ import vào ứng dụng

```js
    import ThreeBoxComments from '3box-comments-react';

    const MyComponent = ({ handleLogin, box, ethereum, myAddress, currentUser3BoxProfile, adminEthAddr }) => (
        <ThreeBoxComments 
            
            spaceName="mySpaceName"
            threadName="myThreadName"
            adminEthAddr={adminEthAddr}

            box={box}
            currentUserAddr={myAddress}

            loginFunction={handleLogin}

            ethereum={ethereum}

            // optional
            members={false}
            showCommentCount={10}
            threadOpts={{}}
            useHovers={false}
            currentUser3BoxProfile={currentUser3BoxProfile}
            userProfileURL={address => `https://mywebsite.com/user/${address}`}
        />
    );
```

Đê biết thêm về các thuộc tính tùy chỉnh có thể truy cập: **[Tại đây](https://docs.3box.io/build/plugins/comments)**


### 3Box Chatbox Plugin 👻

`3box-chatbox-react` là  component xây dựng sẵn tạo ra một ChatBox trong ứng dụng dApp cho phép người dùng có thể chát với những tài khoản trên 3Box khác

Link demo: **[demo](https://3box.github.io/3box-chatbox-react/examples/dist/)**

![](https://images.viblo.asia/985a1574-a728-4999-846f-883c217448e7.png)

Install Chatbox component

```shell
    npm i -S 3box-chatbox-react
```

Import vào ứng dụng
```js
    import ChatBox from '3box-chatbox-react';

    const MyComponent = ({ handleLogin, box, ethereum, myAddress, currentUser3BoxProfile, adminEthAddr }) => (
        <ChatBox 
            // required
            spaceName="mySpaceName"
            threadName="myThreadName"

            box={box}
            currentUserAddr={myAddress}

            loginFunction={handleLogin}

            ethereum={ethereum}

            mute={false}
            popupChat
            showEmoji
            colorTheme="#181F21"
            currentUser3BoxProfile={currentUser3BoxProfile}
            userProfileURL={address => `https://mywebsite.com/user/${address}`}
            spaceOpts={}
            threadOpts={}
            agentProfile={
                chatName: "3Box",
                imageUrl: "https://imgur.com/RXJO8FD"
            }
        />
    );
```

Đê biết thêm về các thuộc tính tùy chỉnh có thể truy cập: **[Tại đây](https://docs.3box.io/build/plugins/chatbox)**

# Kết luận
Vừa rồi thì mình đã giởi thiệu và hướng dẫn sử dụng một số SDK cũng như các plugins mà 3Box hỗ trợ. Mình nghĩ đây sẽ là lựa chọn khá hay cho các bạn muốn pháp triển dApp một các nhanh chóng. Cảm ơn các bạn đã đón đọc và hẹn gặp lại trong các bài viết tiếp theo.

#### Nguồn: https://docs.3box.io/