![](https://images.viblo.asia/dff45105-b068-4a49-9df0-b04ebcff4c89.png)
#### Repo Github : https://github.com/nghiangovan/extension-get-members-group-fb

# Nguyên Nhân Ra Đời

Extension lần này của mình có chức năng chính sẽ là lấy tất cả link trang cá nhân của các thành viên trong một group facebook mà bạn đã ở trong đó, rồi sau đó export nó ra một file Excel. Sản phần này xuất phát từ một lần tình cờ khi các chị bên bộ phận HR của công ty có nhờ mình lấy profile của tất cả các thành viên trong một group nọ. 

Sau một lúc thử inspect page group của thằng facebook thì mình thấy có khả năng get được thông tin từ các DOM html sau khi page đã được render ra. Nhưng lúc đó mình vẫn làm khá thủ công bằng cách vào màn hình console và chạy một đoạn lệnh js, rồi coppy kết quả vào một file text gửi cho các chị ý.

Cũng có ý định làm một con extension rồi nhưng lúc đó cũng hơi bận nên chưa làm được. Tận dụng khoảng thời gian về nghỉ Tết hơi rảnh nên mình ngồi tìm hiểu về extension và thực hiện hóa ý tưởng.

# Điểm Mấu Chốt Có Thể Khai Thác

![](https://images.viblo.asia/c7604b0f-ccb4-4a00-9baf-68eb090e3f95.png)




Như trong hình thì thông tin của bất kỳ một thành viên nào cũng sẽ được đổ vào một thẻ `<a>` có class là `_60rg _8o _8r lfloat _ohe`, nhìn sơ sơ cũng có avatar và link trang cá nhân rồi. Nên điểm mấu chốt ở đây là ta sẽ cần lấy được tất cả các element này và bóc tách ra rồi export chúng ra file Excel.

# Triển khai
Mình sẽ sử dụng một template Vue làm extension có sẵn ([Kocal/vue-web-extension](https://github.com/Kocal/vue-web-extension)) bằng cách chạy câu lệnh :
 ```shell
     vue init kocal/vue-web-extension [NAME OF YOUR EXTENSION]
 ```
     
Tùy chọn create sẽ tùy vào extension của bạn, còn ở đây mình gần như không dùng gì.

```shell
    ? Project name new-tab-page
    ? Project description A Vue.js web extension
    ? Author nghianv-0795 <ngo.van.nghia@sun-asterisk.com>
    ? License MIT
    ? Use Mozilla's web-extension polyfill? No
    ? Provide an options page? No
    ? Install vue-router? No
    ? Install vuex? No
    ? Install axios? No
    ? Install ESLint? No
    ? Install Prettier? No
    ? Automatically install dependencies? npm
```
    
Kết quả sẽ như thế này 

![](https://images.viblo.asia/22665f59-542a-43df-a2c9-b33c6fd89cf2.png)

Mình sẽ giải thích qua cho các bạn nào chưa nắm được cấu trúc của một Extension thì sẽ nhìn như sau:

![](https://images.viblo.asia/08263ee4-4d7e-4476-a534-9e075bb0b2b9.png)

+ **manifest.js** : bao gồm tất cả các metadata của extension như icon, paths, descriptions, permissions, version, v.v.
+ **background.js** : đây là phần xử lý sự kiện của extension. Nó có thể chứa các listeners lắng nghe các sự kiện của trình duyệt mà bạn muốn thực hiện bên trong extension, có thể hiểu nôm na thằng này giống như cái tên của nó vậy nó sẽ chạy nền bên dưới page.
+ **popup.html**: sẽ là phần UI hiện lên của extension khi ta mở extension
+ **popup.js**: là phần js chạy bên trong chính popup, có thể coi extension chính là một page thì popup.html chính là giao diện còn popup.js chính là phần xử lý bên trong
+ **contentscript.js** :  sẽ là js thực thi trên chính page mà bạn truy cập

Như ở đây mình sẽ chỉ sử dụng 2 phần chính đó là popup và content. Vì đơn giản là mình sẽ get các element thông qua DOM html tại page mình đang mở nên mình sẽ sử dụng content.js và chắc chắn phải sử dụng popup rồi. Do 2 thằng này là hai thằng tách biết nên như trong hình mình cần gọi chúng thông qua các hàm gọi mà google đã quy định cho extension.

### 1. manifest.js
- Do có sửa đổi một chút cấu trúc của extension nên mình đã sửa lại các path như dưới đây

    ```json
        {
          "name": "Extension Get Members Group FB",
          "description": "A Vue.js web extension",
          "version": null,
          "manifest_version": 2,
          "icons": {
            "48": "icons/icon_48.png",
            "128": "icons/icon_128.png"
          },
          "browser_action": {
            "default_title": "Extension Get Members Group FB",
            "default_popup": "popup/popup.html"
          },
          "content_scripts": [
            {
              "matches": ["https://www.facebook.com/*"],
              "js": ["content/jquery.3.4.1.min.js", "content/content.js"],
              "css": ["content.css"],
              "run_at": "document_start"
            }
          ],
          "background": {
            "scripts": ["background/background.js"]
          },
          "permissions": ["tabs", "activeTab"]
        }
    ```

### 2. Popup
- Đầu tiên khi popup vừa `mounted()` chúng ta sẽ kiểm tra xem người dùng có đang truy cập ở trong một group nào hay không, vì phải như vậy ta mới lấy được tên group mà người dùng muốn lấy thông tin được.  Nên nếu người dùng chưa truy cập vào group nào thì ta sẽ để hiển thị là `You need to access the group that you have joined in order for the tool to work!` . Còn nếu đã truy cập rồi ra sẽ hiện nút `Get Profiles` bằng cách sử dụng biến `urlTrue` để ẩn hoặc hiện

    ```js
        window.addEventListener("DOMContentLoaded", function() {
              chrome.tabs.query(
                {
                  active: true,
                  currentWindow: true
                },
                function(tabs) {
                  var url = tabs[0].url;
                  var checkUrlFb = /https:\/\/www.facebook.com\/groups\/*/;
                  if (checkUrlFb.test(url)) {
                    self.urlTrue = true;
                  }
                }
              );
         });
    ```
    
    
- Do phần popup và content của page current không hề liên quan đến nhau nên chúng ta cần đến những hàm gọi, giống như kiểu gọi API vậy 

    + Phần call
        ```js
            methods: {
                setDOMInfo(res) {
                  console.log("setDOMInfo", res);
                },
                getLinks() {
                  var self = this;
                  this.trigger = true;
                  this.processing = true;
                  chrome.tabs.query(
                    {
                      active: true,
                      currentWindow: true
                    },
                    function(tabs) {
                      chrome.tabs.sendMessage(
                        tabs[0].id,
                        { trigger: true },
                        self.setDOMInfo
                      );
                    }
                  );
                }
              }
        ```
    + Phần listener
        ```js
            chrome.runtime.onMessage.addListener(function(
                message,
                sender,
                sendResponse
              ) {
                if (message.msg === "getStatusTrigger") {
                  sendResponse({
                    data: self.trigger
                  });
                }

                if (message.msg === "arrayProfile") {
                  var ws = XLSX.utils.json_to_sheet(message.data);
                  var wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, "link");
                  XLSX.writeFile(wb, "linksProfile.xlsx");
                  self.processing = false;
                  sendResponse({
                    received: true
                  });
                }
        ```

- Mình có sử dụng thêm thư viện export excel cho thằng này đó là [**xlsx**](https://www.npmjs.com/package/xlsx). Và đây là file hoàn chỉnh của App.vue trong popup

    ```js
    // App.vue
    
        <template>
          <div class="extension">
            <div class="header">
              <h2>Get Members Groups Facebook</h2>
            </div>
            <div class="container">
              <div v-if="urlTrue">
                <button class="learn-more" @click="getLinks" v-if="!processing">
                  <span class="circle" aria-hidden="true">
                    <span class="icon arrow"></span>
                  </span>
                  <span class="button-text">Get Profiles</span>
                </button>
                <div class="load-9" v-if="processing">
                  <p>Processing</p>
                  <div class="spinner">
                    <div class="bubble-1"></div>
                    <div class="bubble-2"></div>
                  </div>
                </div>
              </div>
              <div v-if="!urlTrue">
                <h2>
                  You need to access the group that you have joined in order for the
                  tool to work!
                </h2>
              </div>
            </div>
          </div>
        </template>

        <script>
        const browser = require("webextension-polyfill");
        import XLSX from "xlsx";
        export default {
          data() {
            return {
              keyword: "",
              urlTrue: false,
              trigger: false,
              processing: false
            };
          },
          mounted() {
            var self = this;
            window.addEventListener("DOMContentLoaded", function() {
              chrome.tabs.query(
                {
                  active: true,
                  currentWindow: true
                },
                function(tabs) {
                  var url = tabs[0].url;
                  var checkUrlFb = /https:\/\/www.facebook.com\/groups\/*/;
                  if (checkUrlFb.test(url)) {
                    self.urlTrue = true;
                  }
                }
              );

              chrome.runtime.onMessage.addListener(function(
                message,
                sender,
                sendResponse
              ) {
                if (message.msg === "getStatusTrigger") {
                  sendResponse({
                    data: self.trigger
                  });
                }

                if (message.msg === "arrayProfile") {
                  var ws = XLSX.utils.json_to_sheet(message.data);
                  var wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, "link");
                  XLSX.writeFile(wb, "linksProfile.xlsx");
                  self.processing = false;
                  sendResponse({
                    received: true
                  });
                }
              });
            });
          },
          methods: {
            setDOMInfo(res) {
              console.log("setDOMInfo", res);
            },
            getLinks() {
              var self = this;
              this.trigger = true;
              this.processing = true;
              chrome.tabs.query(
                {
                  active: true,
                  currentWindow: true
                },
                function(tabs) {
                  chrome.tabs.sendMessage(
                    tabs[0].id,
                    { trigger: true },
                    self.setDOMInfo
                  );
                }
              );
            }
          }
        };
        </script>
        <style lang="scss" scoped>
        @import "./popup.scss";
        ....
    ```
    
- Khi chưa truy cập vào group facebook
    ![](https://images.viblo.asia/912ef183-1af2-4d79-8e18-14036de83adc.png)
    
- Khi đã truy cập group facebook
   ![](https://images.viblo.asia/771ef5ee-7937-4347-a26d-dfea4e6f27af.png)





    

### 3. Content
- Mình sẽ định nghĩa trong **manifest.js** là script của `content` sẽ chỉ chạy khi url của page có định dạng của facebook và import các js của file content cũng như thư viện jquery để sử dụng. Thực ra có thể sử dụng js thuần cũng được, mình đã thử khi chưa làm extension này, nhưng để tiện mình cứ add thêm vào cho dễ thao tác với DOM. Mình có add thêm phần css để khi get profile sẽ chạy hiệu ứng loading 

    ```js
        ...

         "matches": ["https://www.facebook.com/*"],
          "js": ["content/jquery.3.4.1.min.js", "content/content.js"],
          "css": ["content/content.css"],
          
        ...
    ```
    
- Như trên thì chỉ cần ta truy cập vào facebook là phần js trong `content.js` sẽ được kích hoạt. Ở đây mình sẽ khởi tạo 1 trình lắng nghe `chrome.runtime.onMessage.addListener`, để chỉ cần khi nào popup kích hoạt sự kiện là sẽ thực hiện get thông tin trong group. Không cần biết người dùng đang truy cập vào `/about`, `/events` hay `/photos`... Mình sẽ redirect sang `/members` vì chỉ có ở đây mới có thông tin của các thành viên.

    ```js
    // content.js
    
       chrome.runtime.onMessage.addListener(async function(msg, sender, response) {
          if (msg.trigger) {
            var origin = window.origin;
            var href = window.location.href;
            var arrHref = href.split('/');
            var linkGroupMembers = origin + `/groups/${arrHref[4]}/members/`;
            window.location.replace(linkGroupMembers);
          }
          response(msg);
        });
    ```
    
    
- Rồi sau khi đã redirect đến `/members` rồi ta cần crawl thông tin về. Nhưng có một cái không vui là nó chỉ cho xem một số người nhất định và muốn xem hết thì mình phải scroll xuống. Mình đã có thử xem có cái request nào có thể khai thác được không thì cũng có tìm được một cái. Nhưng mò vào đống json của nó thì data lại ở cái dạng html như này

![](https://images.viblo.asia/3571c6af-4a22-49c8-a3a8-684699237650.png)

![](https://images.viblo.asia/91e1e804-521c-4c3b-8b35-4916556ba30a.png)

- Và mình đã thử đưa vào codepen thì hóa ra là chính là các div chứa thông tin members

![](https://images.viblo.asia/0192bf01-26e4-4b18-b213-d832dd0c8d98.png)

- Thôi bây giờ không chơi kiểu lấy data từ json được thì mình chơi bài khác. Mình sẽ giả lập sự kiện người dùng scroll màn hình để đến khi nào hiện ra tất cả thì mình sẽ crawl theo DOM html để lấy về. Dưới đây sẽ là code hòan chỉnh của `content.js`
    ```js
    //content.js
    
        import './content.css';

        chrome.runtime.onMessage.addListener(async function(msg, sender, response) {
          if (msg.trigger) {
            var origin = window.origin;
            var href = window.location.href;
            var arrHref = href.split('/');
            var linkGroupMembers = origin + `/groups/${arrHref[4]}/members/`;
            window.location.replace(linkGroupMembers);
          }
          response(msg);
        });

        $(document).ready(async function() {
          var origin = window.origin;
          var href = window.location.href;
          var arrHref = href.split('/');
          var linkGroupMembers = origin + `/groups/${arrHref[4]}/members/`;
          if (window.location.href === linkGroupMembers) {
            chrome.runtime.sendMessage(
              {
                msg: 'getStatusTrigger'
              },
              function(response) {
                if (response.data) {
                  // add phần hiệu ứng loading
                  $('body').append(`<div class="load-9" id="loading-09">
                  <div class="spinner">
                    <div class="bubble-1"></div>
                    <div class="bubble-2"></div>
                  </div>
                </div>`);
                
                  // giả lập sự kiện sroll down đến khi hiện ra tất cả thành viên
                  var totalHeight = 0;
                  var distance = 1000;
                  var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                      if ($('span.uiMorePagerLoader.pam.uiBoxLightblue').length === 0) {
                      
                        // nếu thấy đã hiện tất cả thành viên sẽ thự hiện get thông tin thông qua DOM
                        clearInterval(timer);
                        var listItem = $('a._60rg._8o._8r.lfloat._ohe');
                        var arrayProfile = [];
                        for (var i = 0; i < listItem.length; i++) {
                          var arrHref = listItem[i].href.split('?');
                          
                          // Do link ở href rất dài mà mình chỉ cần lấy id hoặc uername 
                          //nếu có nên mình sẽ cắt chuổi đoạn này sao cho ổn nhất
                          var link = arrHref[0].includes('profile.php')
                                ? arrHref[0] + '?' + arrHref[1].split('&')[0]
                                : arrHref[0];
                          arrayProfile.push({
                            Name: listItem[i].title,
                            Link: link
                          });
                        }
                        
                        // gửi mảng thông tin sang bên popup cho bên đó export excel
                        chrome.runtime.sendMessage(
                          {
                            msg: 'arrayProfile',
                            data: arrayProfile
                          },
                          function(res) {
                            $('#loading-09').remove();
                          }
                        );
                      }
                    }
                  }, 10);
                }
              }
            );
          }
        });
    ```
    
- Phần code này mình sẽ check xem có đúng url đã vào `/members` chưa, nếu đã truy cập mình sẽ thực hiện call kiểm trả bên phía popup là xem nãy thằng popup đã thực hiện trigger chưa. Vì có trường hợp người dùng có truy cập vào `/members` nhưng họ chưa muốn get thông tin chẳng hạn. Nên mình sẽ có 1 biến bên popup là **`trigger`**. Mình sẽ set biến bằng `true` khi mà người dùng click button `Get Profiles` và điều này sẽ chắc chắn rằng chỉ có khi nào người dùng thực sự muốn kích hoạt thì hàm bên content mới chạy. 


- Để người dùng biết extension đang xử lý thì mình có add thêm một <div> loading. Ngoài ra mình có add 1 file css cho loading này nha

    ```html
        import './content.css';
    
        .....
    
         $('body').append(`<div class="load-9" id="loading-09">
              <div class="spinner">
                <div class="bubble-1"></div>
                <div class="bubble-2"></div>
              </div>
            </div>`);
    ```
    
- Cùng xem kết quả nhá


![](https://cdn.kapwing.com/final_5e3798ddcdd6280015da43a2_374735.gif)    
    
![](https://images.viblo.asia/242fe689-0421-46c8-aa98-d8205c7cd4e8.png)



    
    
- Vậy là đã get thành công rồi. À còn một chút config ở file `webpack.config.js` để khi nó build sẽ không báo lỗi chúng ta cần để ý một chút. Đó là đôi khi chúng ta thêm file hay sửa đổi cấu trúc thì cần config sao cho khớp với file `manifest.json`, để build ra không bị trường hợp không tìm thấy path.

    ```js
        ...
    
        const config = {
          mode: process.env.NODE_ENV,
          context: __dirname + '/src',
          entry: {
            'background/background': './background/background.js',
            'content/content': './content/content.js',
            'content/jquery.3.4.1.min': './content/jquery.3.4.1.min.js',
            'popup/popup': './popup/popup.js'
          },
          output: {
            path: __dirname + '/dist',
            filename: '[name].js'
          },
          resolve: {
            extensions: ['.js', '.vue']
          },
    
         ...
    ```
    
- Cấu trúc thư mục hoàn chỉnh của chúng ta sẽ như sau

    ![](https://images.viblo.asia/fb41ad20-6f3c-4b12-97ce-23269fb55a70.png)

    
### 4. Test 
Mọi người hãy để ý trong file `package.json` sẽ có phần **scripts**
    
```json
  "scripts": {
    "prettier": "prettier \"src/**/*.{js,vue}\"",
    "prettier:write": "npm run prettier -- --write",
    "build": "cross-env NODE_ENV=production webpack --hide-modules",
    "build:dev": "cross-env NODE_ENV=development webpack --hide-modules",
    "build-zip": "node scripts/build-zip.js",
    "watch": "npm run build -- --watch",
    "watch:dev": "cross-env HMR=true npm run build:dev -- --watch"
  },
```

Để vừa phát triển vừa xem được sự thay đổi chúng ta sử dụng `npm run watch:dev` nó sẽ cập nhật trực tiếp lên browser, còn muốn build thì dùng `npm run build`. Và sau đó ta chỉ cần add thư mục dist vào phần extensions là được.
    
![](https://images.viblo.asia/d64482d5-0545-49bd-8c01-c93a3387b104.png)

![](https://images.viblo.asia/ef229fc0-23e6-486f-80ac-f6f9b6b20e86.png)

![](https://images.viblo.asia/f5b5a9fc-16ca-4363-ab50-d0b9a834e8f9.png)

![](https://images.viblo.asia/786c7221-16ca-489f-ab80-d6eb931667ea.png)

Chỉ cần như vậy và run bằng `watch:dev` là ta có thể vừa dev vừa test rất nhanh mà hiệu quả.
    
### Tính năng chưa phát triển

Mình thấy đôi khi group khá nhiều thành viên mà mình chỉ cần lấy khoảng 100, 1000 hay 2000 người đầu tiên thôi chẳng hạn. Chắc nếu có thời gian mình sẽ phát triển thêm tính năng get theo limited nữa. Và nếu như được bạn nào đấy contribute thì không còn gì tuyệt vời hơn :D :D 
    
# Kết Luận 
    
Như vậy chúng ta đã hoàn thành extension. Việc bây giờ là chia sẻ cho mọi người, mình thì cũng muốn tiện lợi cho mợi người nên cũng tìm cách đẩy nó lên cửa hàng tiện ích của google và để mọi người đơn giản click cài đặt tiện ích. Nhưng khổ nỗi sau khi ấn xuất bản thì nhìn vào thông báo này, ngại đăng ký payments quá với lại extension còn chưa đâu vào đầu mới ở mức beginner, đăng lên người ta cười cho nên thôi đành để ở git vậy đợi cái ngon hơn thì đăng cho bõ.
    
 ![](https://images.viblo.asia/8b7c810b-b25a-44b3-a8f4-571955c4686f.png)


Chắc đến đấy mọi người cũng có thể hình dung đơn giản và cách thức hoạt động của một extension rồi. Và mong rằng sản phẩm của mình sẽ giúp ích được cho ai đó. Xin chào và hẹn gặp lại trong các bài viết tiếp theo!

    
# Hướng dẫn sử dụng cho những người không phải dân IT
    
Nếu bạn không phải là dân IT và muốn sử dụng extension này mình sẽ hướng dẫn như sau:

1. Tải repo của mình về 

![](https://images.viblo.asia/bc99c325-93e5-4f68-862c-a1978f3037ad.png)

    
2. Giải nén nó ra và mở phần manager extensions rồi add nó vào

![](https://images.viblo.asia/e9567a48-7e95-441f-abfd-2b36ca4a08a8.png)

![](https://images.viblo.asia/d64482d5-0545-49bd-8c01-c93a3387b104.png)

3. link đến thư mục mình vừa giải nén và chọn thự mục `dist`

![](https://images.viblo.asia/17604739-9821-4339-a7c7-38589e484254.png)

4. Kết quả nếu add thành công ta sẽ có một icon trên góc phải màn hình 

![](https://images.viblo.asia/f5b5a9fc-16ca-4363-ab50-d0b9a834e8f9.png)

![](https://images.viblo.asia/786c7221-16ca-489f-ab80-d6eb931667ea.png)

5. Vậy là ta đã có thể sử dụng được rồi. Và bạn cần truy cập vào nhóm nào bạn muốn lấy nha, không extension sẽ không thể get được đâu
    
#### Repo Github : 
https://github.com/nghiangovan/extension-get-members-group-fb