# 1. React-i18next là gì?
React-i18next là một framework **internationalization** (quốc tế hóa) mạnh mẽ cho Reactjs/Reactnative  dựa trên i18next. Các mô-đun cung cấp nhiều thành phần, ví dụ: để xác nhận rằng các bản dịch cần thiết được tải hoặc nội dung của bạn được hiển thị khi ngôn ngữ thay đổi. Reac-i18next còn phù hợp cho tối ưu **serverside rendering**. Nó cung cấp thêm nhiều các extension ví dụ như làm việc với next.js. Vì Reac-i18next phụ thuộc vào i18next, bạn cũng có thể sử dụng nó trên bất kỳ các framework UI và máy chủ nào khác (node.js, .net, ...).
 # 2. Cài đặt
*  Tạo một project react-app:
```
    npm install -g create-react-app
    npx create-react-app my-app
    cd my-app
    npm start
```
* Chúng ta sẽ sử dụng Reac-i18next để **localization**(bản địa hóa) ứng dụng, cài đặt Reac-i18next  vào project của bạn bằng câu lệnh sau:

```
    npm install --save i18next
    npm install --save react-i18next
```
# 3. Thêm internationalization(quốc tế hóa).
* File src/index.js :

```javascript
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    );
```
*  Để  i18next cấu hình sẵn trong tất cả các component, phải bọc component App bằng component I18nextProvider. Chúng ta cần một phiên bản i18next phải được khởi tạo trước:

```javascript
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import {I18nextProvider} from 'react-i18next';
    import i18next from 'i18next';

    i18next.init({
        interpolation: { escapeValue: false },  // React already does escaping
    });

    ReactDOM.render(
        <I18nextProvider i18n={i18next}>
            <App/>
        </I18nextProvider>,
        document.getElementById('root')
    );
```
* Trong bước tiếp theo, chúng ta phải bọc các component bằng hàm translate(), tự động thêm hàm t () vào các thuộc tính của component. Ta có thể truyền một namespace  mặc định vào hàm translate(), trong ví dụ  chúng ta sẽ đặt nó là `common`. Nếu bạn bỏ qua tham số namespace, bạn phải chỉ định namespace mỗi khi sử dụng để dịch hoặc bạn phải xác định một namespace mặc định trong các tùy chọn i18next.init(). Thêm đoạn mã sau vào file App.js:
```javascript
    import { translate, Trans } from 'react-i18next';

    // ... definition of App class ...

    export default translate('common')(App);   // instead of "export default App;"
```
Bây giờ chúng ta phải tìm tất cả các chuỗi ngôn ngữ cụ thể trong ứng dụng . Có hai chuỗi như vậy trong App.js:
```javascript
    <h1 className="App-title">Welcome to React</h1>
    ...
    To get started, edit <code>src/App.js</code> and save to reload.
```
*  Thay thế các chuỗi như dưới đây:

     Nếu một chuỗi chỉ chứa văn bản thuần túy, hàm this.props.t () có thể được sử dụng để tìm nạp bản dịch. Nếu có nhiều chuỗi cần dịch, hãy xác định hằng số const {t} = this.props để loại bỏ tiền tố this.props khi sử dụng t (). Các tham số tùy chỉnh có thể được sử dụng trong thông báo được dịch và được truyền dưới dạng tham số thứ hai.
     
     Vì React tự động thoát các thẻ HTML được trả về bởi hàm t (), một thông báo được định dạng phải được dịch bằng Trans component. Nội dung của phần tử <Trans> sẽ được phân tích cú pháp và các nút văn bản được thay thế bằng thông báo được dịch bởi i18next. Phần tử <code> trong ví dụ của chúng ta có thể được sử dụng mà không thay đổi trong bản dịch.
```javascript
        ...
        <h1 className="App-title">
            { this.props.t('welcome.title', { framework: "react-i18next" }) }
        </h1>
        ...
        <Trans i18nKey='welcome.intro'>
            To get started, edit <code>src/App.js</code> and save to reload.
        </Trans>
        ...
```
    
  Nếu refresh cửa sổ trình duyệt, tiêu đề sẽ thay đổi từ "Welcome to React" thành "welcome.intro", vì chúng ta chưa xác định bản dịch cho ID này.  Trans component sẽ hiển thị nội dung không thay đổi nếu không tìm thấy bản dịch.
  # 4.Translate cho ứng dụng.
*    Các bản dịch của các văn bản tùy chỉnh lộn xộn của chúng ta sẽ được lưu trữ cho mỗi ngôn ngữ trong một thư mục riêng. Đối với mỗi namespace, chúng ta tạo một tệp .json riêng. Hãy tạo các tệp JSON cho bản dịch tiếng Anh và tiếng Đức:


   src/translations/en/common.json   
```javascript
       {
            "welcome": {
                "title": "Welcome to {{framework}}",
                "intro": "To get started, edit <1><0></0></1> and save to reload."
            }
        }
```
src/translations/en/common.json    
```javascript
      {
            "welcome": {
                "title": "Willkommen bei {{framework}}",
                "intro": "Zum Loslegen editiere <1><0></0></1>. Beim Speichern wird die App im Browser automatisch neu geladen."
            }
        }
```
*   Bây giờ chúng ta có thể tải các tệp JSON này và thêm chúng vào các tùy chọn được truyền vào i18next.init().
* Cập nhật src/index.js với đoạn mã sau:
```javascript
    import common_de from "./translations/de/common.json";
    import common_en from "./translations/en/common.json";

    i18next.init({
        interpolation: { escapeValue: false },  // React already does escaping
        lng: 'en',                              // language to use
        resources: {
            en: {
                common: common_en               // 'common' is our custom namespace
            },
            de: {
                common: common_de
            },
        },
    });
```
*   Với khởi tạo này, các bản dịch có thể được truy cập bằng các từ khóa như common:welcome.title. Nếu bạn chuyển namespace mặc định cho hàm translate() hoặc chỉ định defaultNStrong cho các tùy chọn init, tiền tố common: có thể bị bỏ qua.
# 5. Thay đổi ngôn ngữ
*    Để tự động chọn ngôn ngữ bạn có thể sử dụng một trong các plugin phát hiện ngôn ngữ được liệt kê trên trang này . Đối với ứng dụng demo của chúng ta, chúng ta chỉ cần thêm hai nút button và kích hoạt thay đổi ngôn ngữ theo cách thủ công. Thêm các dòng sau vào hàm render() trong App.js:
```javascript
   render()
    {
        const { t, i18n } = this.props;
        return (
            <div>
                ...
                <button onClick={() => i18n.changeLanguage('de')}>de</button>
                <button onClick={() => i18n.changeLanguage('en')}>en</button>
            </div>
        );
    }
```
 # 6. Kết luận
Hi vọng bài viết này sẽ giúp các bạn hiểu thêm về i18n trong Reactjs. Cảm ơn các bạn đã theo dõi. Trong bài viết có tham khảo tại 
    
   https://react.i18next.com
    
   https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-react-app-with-react-i18next