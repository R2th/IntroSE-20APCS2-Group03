# Extension cơ bản
Bạn có thể tham khảo bài viết này của mình:
- [Hướng dẫn viết một Extension trên Chrome](https://viblo.asia/p/huong-dan-viet-mot-extension-tren-chrome-924lJqaWZPM)

Với việc extension được viết bằng JS, thì bạn hoàn toàn có thể sử dụng các thư viện hay framework JS để phát triển một extension cho mình. Trong bài viết này mình sẽ tạo một extension với ReactJS.

# Khởi Tạo React App

Mình sẽ sử dụng  `create-react-app` CLI command:
```
npx create-react-app my-extension
```

![](https://images.viblo.asia/199d16d0-6640-4b2f-abba-4e1dc5fb0f7f.png)


# Manifest.json

Bước đầu thì mình sẽ sửa lại file manifest.json ở thư mục public, mình cũng sẽ sử dụng Manifest v3 luôn thử:

```json
{
  "manifest_version": 3,
  "name": "Pull Requests Tracker",
  "description": "Pull Requests Tracker",
  "version": "1.0",
  "action": {
    "default_popup": "index.html",
    "default_title": "Open tracker"
  }
}
```

`default_popup` để chỉ file file html mà mình dùng cho poup của extension. Sau khi sửa lại file manifest.json mình sẽ chạy `yarn run build` để chạy thử. Thư mục `/build` lúc này là folder chứa extension của chúng ta.

Để thêm extension vào trình duyệt, thì mình tạo thêm một file `.env` để không bị lỗi [CSP (tham khảo)](https://developer.chrome.com/docs/apps/contentSecurityPolicy/)

```
INLINE_RUNTIME_CHUNK=false
```

Giờ thì mình có thể thêm vào trình duyệt

![](https://images.viblo.asia/a6dd9a0a-9aa8-4ade-ac4d-b0fda78a8126.png)

# Popup

Ở bước này thì mình chỉ code React thôi. Extension mình định tạo thì có chức năng hiển thị lại các pull mình đang có, giống như bookmark vậy, nhưng thêm tự động khi mình mở pull.

![](https://images.viblo.asia/08cccf8e-b692-4aec-903e-9f2068373125.png)


Mình sẽ giải thích luồng hoạt động như sau:
- Khi mình mở một pull request bất kỳ và có url dạng `https://github.com/owner/repo/pull/xxx`
- Kiểm tra tên người tạo pull
- Lấy thông tin pull
- Kiểm tra và lưu vào store
- Sau khi pull được merge thì xoá khỏi store vào ngày hôm sau

# Craco

Craco (Create react app configuration override) một packge giúp bạn chỉnh sửa config của create-react-app một cách dễ dàng.
Mình sẽ cài đặt package này để config build cho các file script của extension.

```
yarn add @craco/craco
```

Tạo file `craco.config.js`

```js
module.exports = {
  webpack: {
    configure: (webpackConfig, {env, paths}) => {
      return {
        ...webpackConfig,
        entry: {
          main: [env === 'development' &&
                    require.resolve('react-dev-utils/webpackHotDevClient'),paths.appIndexJs].filter(Boolean),
          background: './src/chrome/background.js',
          contentScript: './src/chrome/contentScript.js',
        },
        output: {
          ...webpackConfig.output,
          filename: '[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        }
      }
    }
  }
}
```

Giờ thì phải tạo thêm hai file `src/chrome/background.js` và `src/chrome/contentScript.js`

# Content Script
File content script này mình sẽ để chạy mỗi khi vào github. Để sử dụng thì cần cập nhật thêm vào file Manifest.json

```json
"content_scripts": [
    {
      "matches": ["https://github.com/*"],
      "js": ["contentScript.js"]
    }
  ],
```

Ở file này mình sẽ check khi người dùng mở một pull request bất kỳ, và lấy dữ liệu mình cần rồi dùng `chrome.runtime.sendMessage` để gửi đến background script của extension. Thông tin mình cần thì nó dạng:

```js
{
    title: 'Add unstable prefix in React.js instead of entry points',
    status: 'Open',
    pathname: '/facebook/react/pull/21722',
    updated_at: 22,
    nameActive: 'acdlite'
}
```

# Background Script

Đây là phần script mà nó sẽ chạy ngầm liên tục khi mình cài extension vào trình duyệt. Vì vậy nên mới có thể sử dụng để nhận thông tin bất kỳ lúc nào mà không cần mở popup. Mình sẽ cập nhật thêm vào Manifest.json
```json
"permissions": [
    "storage"
  ],
  ...
  "background": {
    "service_worker": "background.js"
  }
```

Mình có thêm `"permissions: ['storage']"` vì ở đây mình sẽ cần `chrome.storage` để lưu thông tin pull.

# Demo

Đến bước này thì mình hoàn thành cơ bản được rồi

![](https://images.viblo.asia/b7a3d191-dcd8-4c59-af90-d4621e28b61d.gif)

Trong bài viết thì mình không muốn coppy phần code vào, bạn có thể tham khảo

Source code: https://github.com/muoihai-com/pull-requests-tracker

![](https://images.viblo.asia/21255719-39d7-4787-bb59-7606744a0c9e.png)

[Blog](https://hungkieu.dev/posts/tao-mot-google-chrome-extension-voi-react)