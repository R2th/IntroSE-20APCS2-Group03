Cũng được một thời gian từ khi viết phần một - [Tổng quan về xây dựng Chrome Extension](https://viblo.asia/p/xay-dung-mot-chrome-extension-bang-reactjs-phan-1-tong-quan-924lJAxNZPM), hôm nay mình sẽ nói về chi tiết quá trình mình tạo một Extension cách đây không lâu. 
# Đặt vấn đề
[Unipos](https://unipos.me/) là một web để ace trong Framgia có thể sử dụng số point được cho mỗi tuần để gửi tặng cho nhau cùng những lời cảm ơn, tuy nhiên hệ thống chỉ hiển thị số point của bản thân mà không hiển thị người khác đã gửi đi bao nhiêu hay được nhận bao nhiêu mà chỉ có danh sách lời cảm ơn đã nhận, gửi, clap... 

![](https://images.viblo.asia/37ff21e8-9b82-46cb-8b7d-788dc207311d.png)

Vì vậy đôi khi tò mò muốn biết người này đã gửi bao nhiêu point rồi, hay nhận được nhiều hơn mình không... =)) Đấy cũng là lí do đầu tiên để extension này được tạo ra. 

Thực ra về chức năng tương tự mình nghĩ có rất nhiều người đã làm rồi, tuy nhiên coi như nhu cầu cá nhân muốn tự viết và  dùng React khi thực hiện nên đây là lí do thứ 2.

Và đây là ảnh demo về nó =)) 
![](https://images.viblo.asia/15365dde-f2ae-4ad9-ad03-66edd6ae53bf.png)
Thực ra cũng chỉ có đúng 1 phần view nhỏ nhét vào trong trang profile, cũng chả có nội dung gì ở popup =)) nên có thể tưởng tượng ra phần nào code sẽ chỉ có 1 component chính cho view đó, còn lại là xử lý background và call api.

Tuy nhiên trong code mình vẫn thể hiện rằng nó có cả view content và popup để nếu có ai gặp vấn đề về việc config trong laravel-mix cho cả view của popup và view của content thì hãy tách riêng file cho 2 phần đó ra là được.
# Các bước thực hiện
Yêu cầu ban đầu: Có tài khoản unipos cái đã. Tiếp theo, ở đây mình sử dụng postman để test API và npm (hoặc yarn) để cài các package.
## API
Những thông tin mà mình cần xem bao gồm tổng điểm gửi, tổng điểm nhận, số bài viết đã clap. Đương nhiên trước đó phải đăng nhập thành công đã nhé =))

Sau khi lấy được rồi thì tìm point rồi cộng lại thôi =)) 
#### Điểm gửi
Tổng điểm ở tab các bài đã gửi:

- ENDPOINT: `https://unipos.me/q/jsonrpc`

- Method: `POST`

- Headers: 
```json
{
  "content-type": "application/json",
  "x-unipos-token": "8bdca0d3-xxxx-xxxx-xxxx-2cd6cb8a62a0" // Lấy khi đã đăng nhập
}
```

- Body: 
```json
{  
   "jsonrpc":"2.0",
   "method":"Unipos.GetCards2",
   "params":{  
      "offset_card_id":"",
      "count":5000, // Số lượng bài gửi, tạm thời mình sẽ để khoảng 5000 bài để load cho hết
      "to_member_id":"2e964f0f-4c12-4b37-84b8-67f186de1ea1"
   },
   "id":"Unipos.GetCards2"
}
```
![](https://images.viblo.asia/14c73d4b-2a83-4e73-992e-1c1874dbeff6.png)
#### Điểm nhận
Tổng điểm ở tab các bài đã gửi.

- ENDPOINT: `https://unipos.me/q/jsonrpc`

- Method: `POST`

- Headers: 
```json
{
  "content-type": "application/json",
  "x-unipos-token": "8bdca0d3-xxxx-xxxx-xxxx-2cd6cb8a62a0" // Lấy khi đã đăng nhập
}
```

- Body: 
```json
{  
   "jsonrpc":"2.0",
   "method":"Unipos.GetCards2",
   "params":{  
      "offset_card_id":"",
      "count":5000, // Tương tự ở trên
      "from_member_id":"2e964f0f-4c12-4b37-84b8-67f186de1ea1" // Chỉ khác ở đây là from
   },
   "id":"Unipos.GetCards2"
}
```
#### Số bài viết clap
Tổng số bài viết ở tab clapped. Lí do mình chỉ đếm số bài viết clap vì muốn đếm số lượt clap cần hover vào từng bài để gửi request nên chưa nghĩ ra cách làm =))
- ENDPOINT: `https://unipos.me/q/jsonrpc`

- Method: `POST`

- Headers: 
```json
{
  "content-type": "application/json",
  "x-unipos-token": "8bdca0d3-xxxx-xxxx-xxxx-2cd6cb8a62a0" // Lấy khi đã đăng nhập
}
```

- Body: 
```json
{  
   "jsonrpc":"2.0",
   "method":"Unipos.GetCards2",
   "params":{  
      "offset_card_id":"",
      "count": 5000, // Vẫn tương tự cách chày cối đó
      "praised_member_id":"2e964f0f-4c12-4b37-84b8-67f186de1ea1" // Còn ở đây là praised
   },
   "id":"Unipos.GetCards2"
}
```

## Init project
Ô kê, API chả có gì vì nhìn phát là hiểu ngay vì nó khá giống nhau mà cũng dễ đọc nữa. Tiếp theo ta sẽ bắt tay vào thực hiện code.

Đầu tiên, nói lại về lí do ban đầu đó là sử dụng ReactJs, vì vậy ở đây mình dùng package [`create-react-app`](https://github.com/facebook/create-react-app) để tạo thư mục project ReactJs cơ bản.
```bash
// Cài đặt create-react-app global bằng npm
npm install create-react-app -g

// Tạo thư mục project
npm init react-app unipos-react
// hoặc
yarn create react-app unipos-react
```
Cấu trúc thư mục mặc định sau khi khởi tạo:
![](https://images.viblo.asia/deb5656d-ec33-401a-a86a-d9b21111df7e.png)
## Tạo và cấu hình file manifest.json
Việc mình nghĩ đến ngay sau khi tạo thư mục project đấy là đi tạo cái file manifest.json này ngay trong thư mục project và cấu hình cho nó. Vì đây là file mà browser đọc những cấu hình cụ thể về extension của mình bao gồm tên, phiên bản, ...
```json
{
    "manifest_version": 2,
    "short_name": "Unipos_ReactJs",
    "name": "Unipos Using ReactJs",
    "version": "1.1",
    "permissions": ["tabs"],
    "background": {
        "scripts": ["public/js/background.js"]
    },
    "content_scripts": [
        {
        "matches": ["https://unipos.me/*"],
        "css": [],
        "js": ["public/js/content/app.js"],
        "run_at": "document_idle"
        }
    ],
    "browser_action": {
        "default_popup": "public/popup.html",
        "default_title": "React Ext"
    },
    "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
}
```

Một số phần quan trọng như background, contentscript, browser action ở trong file này cũng giúp chúng ta hiểu 1 phần cách cấu trúc thư mục của project luôn. 
Tuy nhiên như trên kia mình đặt ở trong `public` là bởi vì mình có sử dụng laravel-mix để biên dịch code và hot-reload khi dev.

## Cấu trúc thư mục
Và đại loại mình đã cấu trúc thành như này:
![](https://images.viblo.asia/c38e20fa-e116-44ec-8071-43a5b5559446.png)
Có 2 thư mục chính mà mình muốn nói đến ở đây:
- Thư mục `src` bao gồm:
    - Thư mục `components` chứa views
    - Thư mục `services` chứa các hàm gọi api
    - Thư mục `utils` chứa các hàm dùng chung
    - File background.js chứa các xử lý nền khi trình duyệt bật hay lắng nghe message 
    - File content.js thực hiện việc render view và phát message
- Thư mục `public` trong đó có chứa thư mục `js` là nơi code được biên dịch ra, đây là nơi các config của manifest trỏ tới. Còn làm cách nào để cho code biên dịch ra đó thì có thể xem phần dưới.

## Cấu hình file package.json
Những package cần chú ý ở đây bao gồm bộ react, axios để thực hiện gửi request, laravel-mix mà mình có nói ở trên và preset-react.
```json
{
  "name": "unipost-ext-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.5.2",
    "react-dom": "^16.5.2",
    "react-scripts": "1.1.5",
    "axios": "^0.18.0",
    "babel-loader": "^7.1.4",
    "bootstrap": "^4.1.1",
    "cross-env": "^5.1.6",
    "css-loader": "^0.28.11",
    "html-loader": "^0.5.5",
    "popper.js": "^1.14.3",
    "style-loader": "^0.21.0"
  },
  "devDependencies": {
    "laravel-mix": "^2.1.14",
    "node-sass": "^4.9.3",
    "babel-preset-react": "^6.24.1",
    "babel-preset-latest": "^6.24.1"
  },
  "scripts": {
    "dev": "node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "hot": "node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
    "production": "node node_modules/cross-env/dist/bin/cross-env.js NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
  }
}

```
## Cấu hình Laravel Mix
Tất cả cấu hình của laravel-mix sẽ nằm ở file `webpack.mix.js`


```js
const mix = require('laravel-mix');

mix.react('src/index.js', 'public/js/popup/app.js')
    .react('src/content.js', 'public/js/content/app.js')
    .js('src/background.js', 'public/js/background.js')
    .copy('popup.html', 'public/popup.html')
    .setPublicPath('public');

mix.webpackConfig({
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            Services: path.resolve(__dirname, './src/services'),
            Components: path.resolve(__dirname, './src/components'),
            Utils: path.resolve(__dirname, './src/utils')
        }
    }
});
```

## Code
#### Bắt đầu vào trang
Đầu tiên  `content.js` sẽ thực hiện công việc kiểm tra nếu đã vào trang thì sẽ phát một message để thông báo, và sau khi vào trang profile của user sẽ chạy hàm `run(id)` để render view xem point của user có `id` đó.
```js
import React from 'react';
import ReactDOM from 'react-dom';
import UserDetail from 'Components/user-detail/';
import registerServiceWorker from './registerServiceWorker';
import commons from 'Utils/commons';

function run(id) {
    ReactDOM.render(<UserDetail id={id} />, document.getElementById('user_detail_wrapper'));
    registerServiceWorker();
}

let user_detail_wrapper = document.createElement('div');
user_detail_wrapper.setAttribute('id', 'user_detail_wrapper');
document.getElementById('content').appendChild(user_detail_wrapper);

chrome.runtime.onMessage.addListener((params) => {
    if (params.message === 'onPageLoad') {
        if (window.location.href.indexOf(commons.BASE_URL) != -1) {
            let urlParams = window.location.href.replace(commons.BASE_URL, '');
            if (urlParams != 'member_not_found' && urlParams != null && urlParams != undefined) {
                const loadedStates = ['complete', 'loaded', 'interactive'];
                if (loadedStates.includes(document.readyState) && document.body) {
                    run(params.id);
                } else {
                    window.addEventListener('DOMContentLoaded', run, false);
                }
            }
        }
    }
});

chrome.runtime.sendMessage({ message: 'onPageLoad' });

```

#### Chạy nền
Khi Reload hay chuyển sang profile của user khác, cũng cần phát một message kèm theo id của user mới để render lại view xem point, khi đó `background.js` sẽ làm công việc này:
```js
import commons from 'Utils/commons';

let url = '';
let userId = '';

chrome.tabs.onUpdated.addListener(function () {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        if (url !== tabs[0].url) {
            url = tabs[0].url;
            let matches = url.match(commons.BASE_URL_MATCH_QUERY);
            if (matches && matches[1] && matches[1] !== userId) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: 'onPageLoad', id: matches[1]});
            }
        }
    });
})

chrome.runtime.onMessage.addListener(function (params) {
    if (params.message === 'onPageLoad') {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            url = tabs[0].url;
            let matches = url.match(commons.BASE_URL_MATCH_QUERY);
            if (matches !== null && matches[1]) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: 'onPageLoad', id: matches[1] });
            }
        })
    }
});
```
#### Công việc còn lại là call api và truyền kết quả vào view
Khi `content.js` thực hiện được hàm `run` thì component `UserDetail` được render. Cụ thể, mình thực hiện việc call api trước trong file `user-detail-container.js` sau đó ở trong render của file này mới trả về view kèm kết qủa trước đó.

Vì lí do code khá dài và chủ yếu là call đến đống api ban đầu còn lại view khá đơn giản nên cụ thể các bạn có thể xem ở đây nhé =)) : https://github.com/tuanlabophp/unipos_react/tree/develop/src/components/user-detail

## Build và đưa vào trình duyệt Chrome
Hãy chắc chắn rằng bạn đã bật Dev mode của trình duyệt lên rồi, sau đó chạy `npm run dev` hoặc `yarn run dev` và lựa chọn `Load unpacked`.

Trỏ thẳng đến thư mục code có file `manifest.json` của bạn và tận hưởng (1 đống errors) thôi =))

![](https://images.viblo.asia/2a5f6145-8264-463e-b429-12603767b5a9.png)
# Kết
Khá dài và lằng nhằng tuy nhiên mong là nếu mọi người đang gặp vấn đề gì khi làm thì có thể tìm thấy gì đó ở bài viết này. 
Code đầy đủ ở đây nhé: https://github.com/tuanlabophp/unipos_react/tree/develop

Cám ơn các bạn đã theo dõi! 


Cám ơn @tiennguyenhoang339 và @ththth đã hỗ trợ =))