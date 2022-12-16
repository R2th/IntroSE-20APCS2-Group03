# **Cấu hình I18next cho Storybook trong dự án Gatsbyjs**
## Cài đặt
```
npm i -D storybook-react-i18next
yarn add -D storybook-react-i18next
```

**Bạn phải cài đặt thêm i18next và react-i18next nếu dự án của bạn chưa có**

```
npm i -S i18next react-i18next
yarn add i18next react-i18next
```

## Cách sử dụng
**1. Trong file main.js của storybook bạn cần thêm addon này vào mảng addon của bạn:**
```
{
  addons: [
    // other addons...
    'storybook-react-i18next',
  ]
}
```

**2. Tạo file i18next.js cho storybook**

Nội dung file sẽ như sau: 
```
import i18n from 'i18next'

const ns = ['common']
const supportedLngs = ['en', 'vn']

i18n.use(initReactI18next).init({
      //debug: true,
      lng: 'vn',
      fallbackLng: 'vn',
      interpolation: {
        escapeValue: false,
      },
      defaultNS: 'common',
      ns,
      supportedLngs,
})

// link đến thư mục chứa file ngôn ngữ của dự án
i18n.addResources('en', 'common', require(`../src/locales/en.json`))
i18n.addResources('vn', 'common', require(`../src/locales/vn.json`))

export { i18n }
```

**3. Trong file preview.js của bạn.**
```
import {i18n} from './i18next.js';

export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    vn: 'Vietnamese',
  },
};
```


**Tada!!! Config complete**
Chú ý nhé: Sau khi bạn chạy storybook thì bạn có thể chuyển đổi giữa các ngôn ngữ trong thanh công cụ của storybook.
![](https://images.viblo.asia/c1567e19-7a10-4ad5-bfd1-a087be16bc1c.png)
Cảm ơn các bạn đã đọc nhé !!!