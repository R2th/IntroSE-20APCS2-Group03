Hello hello, xin chào tất cả anh em Viblo. Anh em nào đã vào đây thì comment chào nhau một cái cho sum vầy nhé. :wave: :wave: :wave: 

Trong [phần trước](https://viblo.asia/p/storybook-la-gi-tai-sao-dung-storybook-vlZL9NB7VQK), mình đã giới thiệu tới các bạn về Storybook và các lợi ích mà nó mang lại. Chức năng chủ chốt đó là giúp chúng ta generate ra trang documentation cho từng component, cùng với đó là hỗ trợ thực hiện UI testing. Trong bài này, nội dung của chúng ta sẽ xoay quanh vấn đề cài đặt Storybook.

## Storybook Builder là gì?

Trước tiên, mình giới thiệu về Builder và vai trò của nó với Storybook.

![](https://storybook.js.org/3d36dc87b96f0568ab42ab06527f016a/storybook-builder-workflow.png)

Builder là một thành phần core của Storybook. Nó được phát triển để tích hợp với các thư viện bao gồm Webpack và Vite - **Đóng vai trò xây dựng môi trường phát triển riêng cho Storybook (dev server)**, thực hiện **HMR** (Hot Module Replacement) để tự cập nhật các thay đổi của component một cách realtime trên browser mà không phải reload trang trình duyệt, compile components, styles, stories... thành các các file file static (HTML, JS, CSS) khi deploy storybook.

Tùy thuộc vào kiểu dự án bạn sử dụng mà bạn sẽ cần lựa chọn thự viện builder để Storybook cài đặt cho phù hợp. Chúng ta sẽ có mấy options sau:
- Webpack4
- Webpack5
- Vite

**Mặc định, Storybook sẽ dùng Webpack 4**.

## Cài đặt Storybook

Quay trở lại việc cài đặt Storybook, quá trình này được tự động hóa bằng một câu lệnh duy nhất:

```bash
npx storybook init
```

- Tự động detect dự án thuộc loại nào: React / Vue2 / Vue3 / Angular và cài đặt cho thích hợp
- Cài đặt các dependencies cần cho Storybook
- Tạo các script cần thiết để chạy và build storybook
- Tạo cấu hình mặc định cho Storybook
- Khởi tạo một số file component + file story mẫu cho bạn tham khảo

Tuy nhiên, trong một số trường hợp nó cũng không detect được. Lúc đó thì bạn sẽ phải làm sao? :thinking: Mình lấy ví dụ với Nuxt 3 chẳng hạn. Do Nuxt 3 mới release (ngày 16/11/2022) nên một số lib trong hệ sinh thái frontend chưa migrate kịp, trong đó có Storybook. :worried: 

![](https://images.viblo.asia/f80dd1a0-fcb4-4650-beb1-7cdc927e9a6a.gif)

Trong trường hợp gặp thông báo lỗi *We detected a project type that we don't support* như này, chúng ta sẽ cần chỉ rõ loại project bằng cách dùng 2 flag thường dùng đó là:
- `--type` hoặc `-t`: Chỉ rõ project type là gì: vue, vue3, react, angular.
- `--builder` hoặc `-b`: Chỉ rõ thư viện builder mà dự án dùng

Bản chất thì Storybook chỉ cần tạo một app React, Vue hoặc Angular ở frontend để render được component. Bởi vậy không quan trọng bạn dùng Nuxtjs, Nextjs.. hay framework nào cả. Nếu bạn mới bắt đầu, bạn chỉ cần lưu ý cho mình 2 điểm đó là type và builder của dự án, như vậy là có thể cài đặt storybook bình thường.

**Mình lấy ví dụ:**

| Project Type | Builder |
| -------- | -------- |
| Vue 2, Nuxt 2    | Webpack     |
| Vue 3, Nuxt 3    | Vite     |
| React, Next    | Webpack     |

Quay lại ví dụ 1 về việc **Cài đặt Storybook với Nuxt3*** để không bị lỗi `We detected a project type that we don't support`, chúng ta chạy câu lệnh:

```bash
npx storybook init --type vue3 --builder vite
```

> Do Vue 3 / Nuxt 3 sử dụng Vite nên nếu không chỉ rõ builder là vite, Storybook sẽ không compile được stories.

## Cấu hình cho Storybook

Quá trình cài đặt Storybook nhìn chung cũng đơn giản là vậy. Sau khi cài đặt Storybook, về lý thuyết thì dev team đã có thể bắt đầu code luôn. Tuy nhiên, có thể họ sẽ gặp bối rối trong việc cấu hình storybook.

Mình lấy ví dụ, phía dev team thống nhất sử dụng TailwindCSS, component đã sử dụng các class CSS từ Tailwind hợp lệ nhưng khi preview trên Storybook thì lại không có CSS.

Tương tự ở một tình huống khác, dev team lựa chọn Vuetify để làm UI library, component của Vuetify hoặc động không đúng, mất style, vậy làm sao để chúng ta tích hợp Vuetify vào Storybook được?

Khi mới tiếp cận Storybook, có hai file config bạn cần nắm được để vận dụng vào từng trường hợp khác nhau của dự án đó là `.storybook/main.js` và `.storybook/preview.js`.

### `.storybook/main.js`

Đây là file cấu hình chính của Storybook (dev server) như bật tắt addon, custom webpack/vite... Tất cả đều chung mục đích là bật tắt các chức năng cho storybook.

Config mặc định thường có nội dung theo mẫu sau:

```javascript:.storybook/main.js
module.exports = {
  addons: ['@storybook/addon-essentials'],
  babel: async (options) => ({
    // Update your babel configuration here
    ...options,
  }),
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.@(js|mdx)'],
  webpackFinal: async (config, { configType }) => {
    // Make whatever fine-grained changes you need
    // Return the altered config
    return config;
  },
  features: {
    storyStoreV7: true,
  },
};
```

Trong đó mấy cái quan trọng đó là:
- stories: regex chỉ ra các folder - nơi chứa các file stories để storybook load.
- addons: dách sách các addon được kích hoạt
- webpackFinal / viteFinal: Là các function để tùy ý customize config cho builder (webpack / vite)

Cùng với đó chúng ta có feature flag thường dùng đó là `storyStoreV7` - đây là optional này cho phép code splitting để build nhanh hơn và lazy loading component chỉ khi dùng tới chứ không load hết khi boot up.

Ngoài ra có một vài feature flags khác, bạn tham khảo tại https://storybook.js.org/docs/react/configure/overview#feature-flags. 

### `.storybook/preview.js`

Đây là file cấu hình riêng cho việc render các story. File này sẽ được load vào tab Canvas - nơi chứa phần preview các component (phần preview dùng iframe để nhúng vào nên nótách biệt hoàn toàn với storybook).

Chẳng hạn như, khi bạn sử dụng các UI Library ngoài như Vuetify, TailwindCSS, AntDesign... thường chúng sẽ có các phần global css, chúng ta sẽ import các file css đó vào đây để khi preview không bị lỗi thiếu CSS / fonts. VD với Vuetify:

```javascript:.storybook/preview.js
// load css:
import 'vuetify/dist/vuetify.min.css'

// load icons:
import '@mdi/font/css/materialdesignicons.min.css'
```

Tóm lại là tất cả những gì liên quan tới việc custom sự hiển thị của component trên Storybook bạn cho hết vào đây.

Storybook cho chúng ta 3 export ES module có tên như sau để customize nhiều hơn cho việc hiển thị:
- decorators
- parameters 
- globalTypes

> Để tránh dài, 3 thành phần này sẽ được đề cập chi tiết hơn trong các phần tiếp theo của series

## Tổng kết

Trong bài viết này, chúng mình đã cung cấp cho các bạn nắm được về storybook-builder, cách cài đặt storybook và các file cấu hình cơ bản. Nắm được các thành phần cơ bản này sẽ giúp các bạn không bị bỡ ngỡ khi bắt đầu setup Storybook cho các dự án sau này.

Nếu bạn thấy bài viết này hữu ích, hãy upvote và follow mình nhé! :wink: 

Support mình để mình có thêm các bài viết khác - bằng cách mời mình cà phê :coffee:, pizza tại https://kimyvgy.webee.asia. Hãy comment chủ đề bạn quan tâm xuống phía dưới để yêu cầu mình viết. Cảm ơn các bạn đã đón đọc.