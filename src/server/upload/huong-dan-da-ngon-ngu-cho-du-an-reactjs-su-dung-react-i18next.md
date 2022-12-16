### I. Lời mở đầu
![](https://images.viblo.asia/f9ea6edd-0d17-40f2-8baa-b253857e0c4d.png)
Ngày nay, Website không còn là công cụ xa lạ của các doanh nghiệp, các tổ chức hay thậm chí là các cá nhân bởi hầu hết với sự phát triển của internet mỗi đối tượng đều sở hữu cho mình một website. Với xu hướng toàn cầu hóa, thì một website sẽ được truy cập từ nhiều quốc gia khác nhau. Chính vì vậy việc đa ngôn ngữ cho website là điều cực kỳ cần thiết.
Các bạn có thể biết React.js ngày càng trở thành 1 thư viện, framework cần thiết, và được các Frontend Developer rất ưu chuộng. React có lẽ là framework được nhắc đến nhiều nhất trong thế giới front end vì nó có một cộng đồng vô dùng lớn. Và đương nhiên rồi, có rất nhiều website nổi tiếng đang sử dụng nó, đơn cử như Facebook.

### II. Nội dung chính
**1. Cài đặt:**
- Cài đặt React app:
```bash
npx create-react-app react-i18n-app
cd react-i18n-app
```
- Cài đặt package react-i18n
```package.yarn
yarn add react-i18next i18next i18next-http-backend
```
```package.npm
npm install react-i18next i18next i18next-http-backend --save
``` 
- Hoặc sử dụng qua CDN:
```unpkg.com
https://unpkg.com/react-i18next/react-i18next.js
https://unpkg.com/react-i18next/react-i18next.min.js
```
**2. Áp dụng:**

Đầu tiên bạn hãy tạo folder locales, chứa phần dịch văn bản theo các ngôn ngữ. Ví dụ mình đa ngôn ngữ cho tiếng việt và tiếng anh thì mình tạo 2 folder là `en` và `vi`. 
- File `locales/en/translation.json`
```translation.json
{
    "content": {
        "functional": "Functional",
        "class": "Class",
        "text": "This is text"
    }
}
```
- File `locales/vi/translation.json`
```translation.json
{
    "content": {
        "functional": "Hàm",
        "class": "Lớp",
        "text": "Đây là văn bản"
    }
}

```

Sau đó hãy tạo folder translation chứa file `translation/i18n.js`. Bạn import những phần ngôn ngữ dịch cho trang và init `i18next`:
```i18n.js
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation';
import translationVI from '../locales/vi/translation';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    }
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'vi',
        debug: true,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18n;

```

Cuối cùng bạn dùng `I18nextProvider` để có thể sử dụng prop i18n qua context API:

```index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import i18n from './translation/i18n';
import { I18nextProvider } from 'react-i18next';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

Vậy là quá trình setup package đã xong. Package `react-i18next` có hỗ trợ chúng ta khá nhiều cách sử dụng instance phía bên trong component:

- Sử dụng hook: `useTranslation`
```js
import React from 'react'
import { useTranslation } from 'react-i18next';

const Functional = () => {
    const { t } = useTranslation()

    return (
        <div className="col-md-6">
            <div className="card p-2">
                <div className="card-body">
                    <h5 class="card-title">{t('content.functional')}</h5>
                </div>
            </div>
        </div>
    )
}

export default Functional
```

- Sử dụng HOC: `withTranslation`
```js
import React from 'react'
import { withTranslation } from 'react-i18next';

class ClassComponent extends React.Component {
    render() {
        const { t } = this.props

        return (
            <div className="col-md-6">
                <div className="card p-2">
                    <div className="card-body">
                        <h5 class="card-title">{t('content.class')}</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(ClassComponent)

```

- Sử dụng Trans Component
```js
import React from 'react'
import { Trans } from 'react-i18next';

const Functional = () => {
    return (
        <div className="col-md-6">
            <div className="card p-2">
                <div className="card-body">
                    <Trans i18nKey='content.text' />
                </div>
            </div>
        </div>
    )
}

export default Functional

```

- Sử dụng Translation (render prop)
```js
import React from 'react'
import { Translation } from 'react-i18next';

const Functional = () => {
    return (
        <div className="col-md-6">
            <div className="card p-2">
                <div className="card-body">
                    <Translation>
                        {
                            (t, { i18n }) => <p>{t('content.text')}</p>
                        }
                    </Translation>
                </div>
            </div>
        </div>
    )
}

export default Functional

```

**3. Demo:**

Github: https://github.com/vanquynguyen/react-i18n-app

### III. Tạm kết
Chắc hẳn sau bài viết này các bạn đã có thể sử dụng package để phát triển đa ngôn ngữ cho dự án của mình rồi đúng không nào. Rất mong nhận được ý kiến đóng góp từ mọi người.
![](https://images.viblo.asia/b67bf6ec-fa7f-475b-8173-6e09f9e5d848.gif)