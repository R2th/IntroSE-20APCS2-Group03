## Giới thiệu:
Khi chúng ta xây dựng 1 trang web, đặc biệt là làm outsource thì việc xử lý đa ngôn ngữ là 1 công việc thiết yếu mà gần như dự án nào cũng phải có, đặc biệt là các website mang tính phổ biến cao

Với sự đông đảo của cộng đồng React, việc xử lý đa ngôn ngữ bây giờ khá là dễ dàng với khá nhiều các thư viện khác nhau như: `react-i18next`, `react-redux-multilingual `...

Vì đa số các dự án ReactJS đều sử dụng chung với Redux nên trong bài này mình muốn giới thiệu đến các bạn dependency r`eact-redux-multilingual` vì tính đơn giản trong cài đặt sử dụng cũng như tính gọn nhẹ của nó (chỉ **6KB**) so với `react-i18next`.

## Cài đặt môi trường:
Chúng ta nhanh chóng tạo mới app với create-react-app của facebook với câu lệnh create-react-app react-with-multilingual nhớ chạy lệnh npm start để start app nhé.

Đầu tiên tạo file **translations.js** là nơi chứa các đoạn text bạn muốn chuyển đổi ngôn ngữ: 
```
export default {
  en: {
    locale: 'en-US',
    messages: {
      welcome: 'Welcome to {value}',
      name: 'My name is {name}'
    }
  },
  vn: {
    locale: 'vn',
    messages: {
      welcome: 'Chào mừng đến với {value}',
      name: 'Tên tôi là {name}'
    }
  }
}
```

Ở đây en là vùng để lưu các văn bản cần chuyển đổi sang tiếng Anh, vn là sang tiếng Việt.

Tiếp đó là cài đặt các dependencies cần thiết trong dự án: 
```
npm i redux react-redux react-redux-multilingual
```

Trong file index.js, ta import các gói cần thiết từ các dependencies để cấu hình store, reducer và language prodiver. Nó sẽ trông như thế này: 
```
import React from 'react';
import ReactDOM from 'react-dom';
import translations from './translations'
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import * as serviceWorker from './serviceWorker';

let reducers = combineReducers(Object.assign({}, { Intl }))
let store = createStore(reducers, { Intl: { locale: 'en'}})

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider translations={translations}>
      <App />
    </IntlProvider>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();


```

Bộ **IntlProvider** sẽ cung cấp cho App component 1 funcion **translate()** với 2 tham số đầu vào là 1 string tương ứng với key trong object **messages** mà ta đã tạo trong file **translations.js** và 1 object với key là tên biến bạn truyền vào văn bản cần chuyển đổi ngôn ngữ và value là đoạn text cần thay vào biến đó.

File App.js sẽ có dạng như sau: 
```
import React from 'react';
import { withTranslate } from 'react-redux-multilingual'

function App(props) {
  const { translate } = props
  return (
    <div className="App">
      <p>{translate('welcome', { value: 'Reactjs' })}</p>
      <p>{translate('name', { name: 'Thai' })}</p>
    </div>
  );
}

export default withTranslate(App);

```
    
Đây là kết quả khi mình để locale='en':
![](https://images.viblo.asia/79f53a5f-f28f-4f14-8df5-f83cb1122ed6.png)

Và khi change locale='vn'
![](https://images.viblo.asia/a73c28a2-8462-44f0-9e37-0f201cc2ed08.png)

## Tổng kết và tài liệu tham khảo:
Do việc sử dụng react-i18next khá là phổ biến nên các bạn cũng nên tham khảo cách sử dụng nó nữa nhé

Hẹn gặp lại các bạn vào bài sau.

Tài liệu tham khảo:
https://www.npmjs.com/package/react-redux-multilingual