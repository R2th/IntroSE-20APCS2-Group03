# 1. Lời mở đầu
Đa ngôn ngữ luôn là yêu tiên hàng đầu trong ứng dụng của bạn nếu bạn muốn app của bạn được sử dụng rộng rãi đa quốc gia. Thường các developers sẽ sử dụng thư viện nổi tiếng về multiple languages `i18n` cho các app của mình. Trong dự án React Native cũng có bộ thư viện `react-native-i18n` giúp thực hiện chức năng đa ngôn ngữ trong app. Trong khuôn khổ bài viết này mình sẽ hướng dẫn các bạn dựa vào thư viên trên để thực hiện chức năng đa ngôn ngữ trong dự án RN bằng một app đơn giản.

# 2. Giới thiệu app ví dụ
App mà mình dự tính sẽ thực hiện vô cùng đơn giản nhưng sẽ giúp các bạn hiểu được cách cài đặt và sự dụng thư viện ở trên.
App sẽ có 1 màn hình với 3 tabs khác nhau: Trang chủ, Liên hệ và Cài đặt. Gồm các text khác nhau trong mỗi screens và ta sẽ thực hiện chuyển đổi ngôn ngữ các thẻ <Text></Text>  từ tiếng Việt qua tiếng Anh và ngược lại

![](https://images.viblo.asia/c73c4733-1149-430f-9d31-0d502ca338c3.PNG)    ![](https://images.viblo.asia/65aece46-aa19-4c28-906a-dfe2a4cf815a.PNG)
# 3. Chuẩn bị
### 3.1. Cài đặt "đồ chơi" cho app (các libs cần thiết)
Sau khi init dự án xong với lệnh react-native init "tên app". Ở đây app của mình có tên **I18nExample**.
Tiếp đến cài các thư viện sau bằng lệnh `npm` hoặc `yarn`
ở đây mình cài bằng lệnh yarn: `yarn add react-native-i18n react-navigation redux react-redux --save`

*các bạn có thể cài riêng từng thư viện :D mình cài bằng 1 lệnh cho nhanh ấy mà*
* `react-native-i18n` : dùng để thực hiện nhiệm vụ đa ngôn ngữ
* `react-navigation` : thực hiện chuyển đổi giữa các màn hình với nhau và xây dựng màn hình với các tabs bên trong
* `redux react-redux` : dùng để cập nhật trạng thái ngôn ngữ ngay tức thì mà không cần khởi động lại app

---
**Bước tiếp theo bạn cần chạy lệnh `react-native link react-native-i18n` để link vào native modules.**

### 3.2. Tạo cây thư mục mẫu
Sau khi khởi tạo xong dự án trong thư mục gốc tạo thêm thư mục `src` bên trong thư mục `src` tạo 4 thư mục con `screens`, `stacks`, `redux` và `components`

*các bạn có thể tùy chỉnh cây thư mục của mình sao cho dễ sử dụng nhất*

đây là cây thư mục của mình sử dụng cho app.
![](https://images.viblo.asia/ec573906-18aa-4787-b8e6-552953236e0b.PNG)

# 4. Thực hiện
> Trước khi vào thực hiện mình xin chú ý với các bạn, trong khuôn khổ bài viết mình chỉ tập trung vào thực hiện chức năng đa ngôn ngữ trong app dựa vào thư viện `react-native-i18n` nên chỉ dành cho những bạn nào đã có kinh nghiệm với `react-navigation` và `react-redux`, `redux` :D những thư viện mà mình sẽ không tập trung vào giải thích cho các bạn. Bạn nào chưa biết những libs này thì có thể học và hiểu được trước khi đọc bài viết này ^^
---
<br>
**Bắt đầu thôi nào**

> Ý tưởng để thực hiện chức năng trên như sau: 
> * Tạo ra 1 component `AppText` để hiển thị tất cả các text trong app mà ta muốn chuyển đổi qua lại giữa các ngôn ngữ
> * Thay vì dùng thẻ <Text></Text> để hiển thị các text thì ta sẽ sử dụng `AppText` thay thế trong toàn bộ app và khi `AppText` thay đổi ngôn ngữ thì toàn bộ text trong app sẽ được chuyển qua ngôn ngữ mới mà không cần khởi động lại app
> * Sử dụng `redux` để cập nhật state language mới cho `AppText` 
<br>
Mình sẽ lần lượt giải thích các file mà mình sử dụng có trong cây thư mục trên.
1. Đầu tiên tạo ra các files `home`, `contact` và `setting` tương ứng với các tabs trong thư mục `src/screens`. 3 màn hình này tương tự nhau chỉ thay dòng text ở giữa

sau đây là code mẫu ở màn hình `home.screen.js`
```
import React, { PureComponent } from 'react';
import {
    View, Text
} from 'react-native';

class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>This is home screen</Text>
            </View>
        );
    }
}

export default HomeScreen;
```

Các screens `contact.screen.js` và `setting.screen.js` sẽ tương tự như home screen chỉ thay tên và các text bên trong màn hình :D

<br>

2. dựa vào `react-navigation` để tạo ra các tabs cho app <br>
file `app.tabs.js`
```
import React from "react";
import {
   createBottomTabNavigator,
   createAppContainer
} from "react-navigation";

import HomeScreen from '../screens/home.screen';
import ContactScreen from '../screens/contact.screen';
import SettingScreen from "../screens/setting.screen";

const Tabbar = createBottomTabNavigator(
   {
      Home: {
         screen: HomeScreen
      },
      Contact: {
         screen: ContactScreen
      },
      Setting: {
         screen: SettingScreen
      }
   }
);
const AppTabbar = createAppContainer(Tabbar);
export default AppTabbar;
```

3. Tiếp theo xây dựng cấu trúc `redux` cho app. <br>
đầu tiên tạo file chứa các action-types.js
`src/redux/constants/action-types.js`
```
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
```

Tiếp theo tạo các actions <br>
`src/redux/actions/index.js`
```
import * as types from './../constants/action-types';

export const changeLanguage = language => {
    return {
        type: types.CHANGE_LANGUAGE,
        language
    }
}
```
Cuối cùng là reducer
<br>
`src/redux/reducers/language.reducer.js`
```
import * as types from './../constants/action-types';

var initialState = {
    language: 'vi'
};

var languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_LANGUAGE: {
            return { language: action.language };
        }
        default:
            return state;
    }
};

export default languageReducer;
```

và export `reducers` qua file `src/redux/reducers/index`
```
import { combineReducers } from "redux";
import languageReducer from './language.reducer';

const appReducers = combineReducers({
    languageReducer
});

export default appReducers;
```
Tiếp theo ta chỉnh sửa lại file `App.js` để hiển thị tabs và config `redux` mới tạo để sử dụng cho app.
```
...
import AppTabbar from './src/stacks/app.tabs';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducers from './src/redux/reducers';

export const store = createStore(
  appReducers
)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppTabbar />
        </View>
      </Provider>
    );
  }
}
```
> **Vậy là hoàn thành phần giao diện cơ bản cho app**
> 

<br>**Bước tiếp theo sẽ app dụng thư viện i18n vào trong app**
Trong thư mục `in18`ta tạo 1 thư mục `locales` chứ 2 file `vi.js` và `en.js` tương ứng cho 2 ngôn ngữ mà ta muốn chuyển đổi và file i18n.js <br>
Nội dung file như sau: <br>
`en.js`
```
export default {
    'greeting': 'Hi!',
    'home': 'Home',
    'contact': 'Contact',
    'setting': 'Setting',
    'this-is-home-page': 'This is home page',
    'this-is-contact-page': 'This is contact page',
    'this-is-setting-page': 'This is setting page',
    'set-language': 'Switch language'
};
```

`vi.js`
```
export default {
    'greeting': 'Xin chào!',
    'home': 'Trang chủ',
    'contact': 'Liên hệ',
    'setting': 'Cài đặt',
    'this-is-home-page': 'Đây là trang chủ',
    'this-is-contact-page': 'Đây là trang liên hệ',
    'this-is-setting-page': 'Đây là trang cài đặt',
    'set-language': 'Chọn ngôn ngữ'
};
```
Tiếp theo là file config ngôn ngữ `i18n.js` 
```
import I18n from 'react-native-i18n';

import en from './locales/en';
import vi from './locales/vi';

I18n.translations = {
    en,
    vi
};

export default I18n;
```
Các bạn có thể thêm nhiều ngôn ngữ mà mình mong muốn bằng cách tạo nhiều file locales và import vào file config của `i18n.js`

> Tới đây đã xong phần config `i18n`. Bước tiếp theo ta sẽ tạo ra component `AppText`
---

Trong thư mục `src/components` ta tạo 1 file `app-text.js`
code:
```
...

import { connect } from 'react-redux';
import I18n from '../i18n/i18n';

...

class AppText extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			i18n: I18n
		};
	}

	componentWillMount() {
		const { language } = this.props;
		if (language) this.setMainLocaleLanguage(language);
	}

	componentWillReceiveProps = nextProps => {
		const { language } = nextProps;
		if (language) this.setMainLocaleLanguage(language);
	}

	setMainLocaleLanguage = language => {
		let i18n = this.state.i18n;
		i18n.locale = language;
		this.setState({ i18n });
	}

	render() {
		const { i18nKey, style } = this.props;
		const { i18n } = this.state;
		return (
			<Text style={style}>
				{i18nKey ? i18n.t(i18nKey) : this.props.children}
			</Text>
		);
	}
}

const mapStateToProps = state => {
	return {
		language: state.languageReducer.language
	};
};

export default connect(mapStateToProps, null)(AppText);
```
Mình sẽ giải thích mình áp dụng `i18n` mới config để set ngôn ngữ cho text và sẽ thay đổi ngôn ngữ thông qua giá trị `language` được thay đổi thông qua connect tới store của redux.
<br><br>Đầu tiền trong `AppText` component sẽ có 1 state có tên `i18n` và gán giá trị ban đầu là `I18n` import từ file config tạo ra ở trên.
<br>
Sau đó ta thực hiện việc connect tới store của redux để lấy được giá trị language ban đầu (lúc này là `vi`)

```
const mapStateToProps = state => {
	return {
		language: state.languageReducer.language
	};
};

export default connect(mapStateToProps, null)(AppText);
```

Lúc này ta đã có 1 `prop` có tên là `language` và có giá trị là `vi`. Trong function componentWillMount ta sẽ set locales ban đầu cho state `i18n` thông qua function mang tên `setMainLocaleLanguage()`
```
componentWillMount() {
    const { language } = this.props;
    if (language) this.setMainLocaleLanguage(language);
}

setMainLocaleLanguage = language => {
    let i18n = this.state.i18n;
    i18n.locale = language;
    this.setState({ i18n });
}
```
> Theo ý tưởng ban đầu ta dùng thẻ <AppText></AppText> thay cho các thẻ <Text></Text> mặc định của React Native. Do đó để hiển thị được text thì trong function `render()` của component `AppText` ta phải return 1 thẻ <Text></Text>. <br>
> Ví dụ sử dụng: <br>
> `<AppText style={{color: 'red'}} i18nKey={'this-is-home-page'}>This is home screen</AppText>`
<br>

Ở ví dụ trên ta truyền vào 2 props: `i18nKey` và `style`. Function `render()` sẽ như sau: 
```
render() {
    const { i18nKey, style } = this.props;
    const { i18n } = this.state;
    return (
        <Text style={style}>
            {i18nKey ? i18n.t(i18nKey) : this.props.children}
        </Text>
    );
}
```
Ta sẽ lấy `i18nKey` và `style` từ props và `i18n` từ state của component. <br>
Sau đó return về 1 thẻ <Text><Text> với style gán bằng prop `style`. Giá trị text sẽ check prop `i18nKey` để hiển thị. Nếu `i18nKey` có giá trị thì sẽ lấy giá trị text trong file locales với key là `i18nKey` thông qua lệnh `i18n.t(i18nKey)` ngược lại sẽ hiển thị `this.props.children` mặc định của component (ở ví dụ trên là dòng text `This is home screen`).<br>
<br>Xét ví dụ trên ta có `i18nKey` có giá trị là `this-is-home-page` dựa vào file locale `vi.js` ta có được text hiển thị là `Đây là trang chủ` và file `en.js` sẽ là `This is home page` <br>
<br>
Cuối cùng để thay đổi ngôn ngữ ta chỉ cần thay đổi locales của state `i18n`. Và để biết được ngôn ngữ đã được thay đổi từ người dùng ta sẽ lấy được giá trị mới của `language` thông quan function `componentWillReceiveProps()` (function này sẽ nhận 1 giá trị mới của props mỗi khi nó nhận thấy giá trị đó ở store đã được thay đổi)
```
componentWillReceiveProps = nextProps => {
    const { language } = nextProps;
    if (language) this.setMainLocaleLanguage(language);
}
```
Sau khi set state `i18n` với locales mới thì component sẽ lập tức render lại giá trị text mới với ngôn ngữ đã được thay đổi.<br>
<br>
 
-----

### Done! Cùng test xem nó đã hoạt động chưa nào :D
ta sẽ chỉnh sửa lại file `home.screen.js` như sau để test
```
import {
    View, Text, TouchableOpacity
} from 'react-native';
import AppText from '../components/app-text';
import { connect } from 'react-redux';
import * as actions from './../redux/actions/index';

class HomeScreen extends PureComponent {
    
    setLanguage = language => {
        this.setState({ language });
        this.props.setLanguage(language);
    }

    render() {
        const { language } = this.props;
        const isVNLang = language === 'vi' ? true : false;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AppText i18nKey={'this-is-home-page'}>This is home screen</AppText>
                <View style={{ flexDirection: 'row' }}>
                    <AppText i18nKey={'set-language'}>Chọn ngôn ngữ</AppText>
                    <TouchableOpacity onPress={() => this.setLanguage('vi')}
                        style={{ marginLeft: 20 }}>
                        <Text style={{ color: isVNLang ? 'blue' : 'grey' }}>Việt Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setLanguage('en')}
                        style={{ marginLeft: 5 }}>
                        <Text style={{ color: !isVNLang ? 'blue' : 'grey' }}>England</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
	return {
		language: state.languageReducer.language
	};
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: language => {
            dispatch(actions.changeLanguage(language));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
```
 Đầu tiên mình thực hiện connect tới store để lấy được `language` lúc khởi tạo và ta có 1 function `setLanguage()`dùng để gọi lên store thay đổi giá trị language tại reducer.<br>
    Thay tất cả các text muốn switch ngôn ngữ qua <AppText></AppText> với `i18nKey` tương ứng và đảm bảo key đó có tồn tại trong các files locales.<br>
<br>
Tại content page mình có 2 buttons:
```
.....
<TouchableOpacity onPress={() => this.setLanguage('vi')}
    style={{ marginLeft: 20 }}>
    <Text style={{ color: isVNLang ? 'blue' : 'grey' }}>Việt Nam</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => this.setLanguage('en')}
    style={{ marginLeft: 5 }}>
    <Text style={{ color: !isVNLang ? 'blue' : 'grey' }}>England</Text>
</TouchableOpacity>
 ....
```
2 button này sẽ gọi tới function `setLanguage()` và truyền vào giá trị language tương ứng, ở đây là `vi` và `en`.
```
setLanguage = language => {
    this.setState({ language });
    this.props.setLanguage(language);
}
```
`this.props.setLanguage(language);` lệnh này sẽ gọi lên store để thay đổi giá trị language tại reducer. Component `AppText` sẽ nhận được giá trị mới và render lại. ***Điều này giúp app ngay lập tức thay đổi ngôn ngữ mà không cần khởi động lại app.***
### Và thế là ta đã hoàn thành xong ví dụ.
Hy vọng qua ví dụ sẽ giúp được các bạn có thể hiểu được cách áp dụng thư viện `react-native-i18n` vào trong dự án RN của mình.  Các bạn có thể tham khảo code của mình tại đây: https://github.com/thanhnq1209/I18nExample

**Tham khảo `react-native-i18n` tại đây: https://github.com/AlexanderZaytsev/react-native-i18n**    
    
<br> 
**Cảm ơn các bạn đã đọc. Hãy đóng góp ý kiến của bạn phía dưới comment để bài viết của mình được tốt hơn nhé ^^**
    
-*thanh.ozill11*-