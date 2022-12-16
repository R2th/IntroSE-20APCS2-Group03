Chào các bạn một năm mới an khang thịnh vượng, dồi dào sức khỏe. Lại là mình đây :) Đây là link app mà các bạn đang theo dõi :3 https://play.google.com/store/apps/details?id=com.bloodycotech001, vì 1 số lý do nên mình vẫn chưa update app kịp những gì có trong bài viết. Nếu các bạn có thời gian, có thể cho mình xin 1 đánh giá ( bao nhiêu sao cũng được) và 1 comment chân thành từ các bạn về app hoặc góp ý để app phát triển hơn. Mình sẽ lắng nghe tất cả các góp ý và đánh giá của tất cả các bạn để dần hoàn thiện series hướng dẫn này cũng như app ``happy math``

Mọi người có thể theo dõi các phần trước của mình tại đây

**Phần 1** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-63vKjzNVK2R]

**Phần 2** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-2-RQqKLQv4Z7z]

**Phần 3** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-3-Eb85oLMkK2G]

**Phần 4** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-4-djeZ1ynGZWz]

**Phần 5** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-5-E375z7NjKGW]

PR nhẹ vầy thôi, giờ vào việc lun nào

**1) Chỉnh sửa babel.config.js**

Giờ review lại code một tí nhé
```
//Battle.js
import {observer} from 'mobx-react';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import {colors} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {StackRoute} from '../constants/route';

import WorkingSection from '../component/WorkingSection';
import AnswerButton from '../component/AnswerButton';
import PointSection from '../component/PointSection';
import BattleStore from '../stores/battleStore';
```

Khi nhìn vào cái dấu ``../`` này, hoặc ví dụ, khi chúng ta phải import 1 component cháu chắt vào 1 component cháu chắt của 1 folder khác, và chúng ta phải import nó như thế này ``../../../../ComponenNaoDo`` thì mọi người có thấy ức chế như mình không nhỉ ?

Chúng ta đang làm 1 app nhỏ, nên việc import chay thế này cũng không ảnh hưởng quá nhiều đến code của bạn, nhưng khi cái app nhỏ của chúng ta lớn dần, chúng ta phải thay đổi nhiều thứ, di chuyển module này qua chỗ này, di chuyển module kia ra ngoài module khác, ...v...v... vân vân và mây mây, thì cái việc import nhỏ xíu như vậy đôi khi lại chính là nguyên do làm ta mất cả nửa ngày trời để chỉnh lại từng cái import (nghe thốn nhỉ). Nếu bạn chưa mường tượng được cái việc thốn đó, thì để mình lấy ví dụ nhé, bạn có file Battle.js ở trên, nó nằm trong folder screen, và nó cần import route ở trong folder constants, và bạn cần import như thế này ``import {StackRoute} from '../constants/route';``, vào 1 ngày đẹp trời, mình cần move cái Battle.js ra ngoài screen, và mình cần update lại cái import StackRoute là ``import {StackRoute} from './constants/route';`` và tất cả những cái import khác đều phải vậy, điều đó cực kì bất tiện khi mình cần di chuyển nhiều folder hay file khác. Tuy nhiên bằng cách config lại file babel.config.js thì có thể giải quyết vấn đề đó, các bạn có thể tham khảo: 
```
module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        'module-resolver',
        {
          root: ['src'],
          extensions: ['.js'],
        },
      ],
    ],
  };
};
```
Cài đặt thêm các ``metro-react-native-babel-preset`` và ``module-resolver``, giờ phần import của Battle.js nó sẽ đẹp như vậy
```
//Battle.js
import {observer} from 'mobx-react';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import {colors} from 'constants/theme';
import {useNavigation} from '@react-navigation/native';
import {StackRoute} from 'constants/route';

import WorkingSection from 'component/WorkingSection';
import AnswerButton from 'component/AnswerButton';
import PointSection from 'component/PointSection';
import BattleStore from 'stores/battleStore';
```
Giờ bạn cầm file này đi chỗ nào cũng không cần sửa lại phần import của nó cả

**2) Chức năng đa ngôn ngữ trong React Native**

Vì mong muốn app của mình có thể phổ biến rộng rãi trên toàn thế giới (yaoming) nên mình sẽ thêm chức năng đa ngôn ngữ cho nó. Đối với 1 số bạn có thể phần này còn hơi lạ lẫm, nhưng không sao, xài nó dễ lắm. Việc sử dụng i18n vào react app giống như ta inject 1 store vào app, nhưng store đó chỉ chứa dữ liệu về ngôn ngữ thôi. Nó sẽ giúp chúng ta đổi ngôn ngữ từ tiếng mẹ đẻ sang tiếng Kinh cho toàn App chỉ trong 1 nút bấm (lol)
Trước tiên phải cài đặt các library cần thiết đã: ``npm install --save i18next react-i18next react-native-localize`` vì đây là react-native nên bạn nên cài đủ 3 thằng này.
Sau đó tạo 1 folder là i18n, tạo ra 1 file index.js và copy code sau 
```
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        hello: 'Hello',
      },
    },
    vi: {
      translation: {
        hello: 'Xin chào',
      },
    },
  },
});
export default i18n;
```
Rồi qua file App.js, import nó vào như sau: 
```
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import i18n from './src/i18n/index';

import DefaultStack from './src/navigation/defaultStack';
const initI18n = i18n;

export default function App() {
  return (
    <NavigationContainer>
      <DefaultStack />
    </NavigationContainer>
  );
}
```
Có thể các bạn sẽ thắc mắc ``initI18n`` mình có dùng gì đâu, mà sao lại khai báo chỗ này nhỉ, có nhầm gì không? À thật ra là không đâu, chúng ta khai báo như vậy thì nó mới khởi tạo i18n cho chúng ta xài vào App, nên đừng quên nhé.

Khi dùng i18n cũng rất đơn giản thôi.
```
// import thư viện vào
import { useTranslation } from 'react-i18next';
// lấy function t của nó ra dùng, lưu ý là cái này chỉ xài trong function component thôi nhé.
const { t } = useTranslation();

// và sử dụng nó ở nơi bạn muốn
t('hello') // hello này ngôn ngữ English sẽ là hello, tiếng việt sẽ là Xin chào.
```

Các bạn có thể define nhiều đoạn text khác, như là:
```
  en: {
      translation: {
        welcome: {
            title1: 'Learn',
            title2: 'Math',
            practice: 'practice',
            battle: 'battle',
          },
      },
    },
```
Có thể viết thẳng trong file index.js hoặc chia ra 1 file en.js riêng và export ra 1 object như sau:
```
const English = {
  welcome: {
    title1: 'Learn',
    title2: 'Math',
    practice: 'practice',
    battle: 'battle',
  }
};

export default English;
```
Rồi cho nó vào bằng spread operator
```
  en: {
      translation: {
        ...English
      },
    },
```
Các bạn làm tương tự với file Vietnamese là ok. Nếu muốn thay đổi ngôn ngữ, thì bạn cần dùng function của i18next, docs của e nó đây https://www.i18next.com/overview/api#changelanguage, Nếu vẫn không hiểu thì coi code mẫu cùa mình cho đơn giản cũng dc:
```
// Ví dụ này mình đã rút gọn rồi nhé, copy y nguyên mà không sửa là không chạy đâu
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

const SetLanguageScreen = observer(() => {
  const { t } = useTranslation();
  const Navigate = useNavigation();

  return (
      <>
          <TouchableHighlight
            style={styles.imageContainer}
            onPress={() => i18n.changeLanguage('en', () => {})}>
            {t('changeLanguageEnglish')}
          </TouchableHighlight>
           <TouchableHighlight
            style={styles.imageContainer}
            onPress={() => i18n.changeLanguage('vi', () => {})}>
            {t('changeLanguageVietnamese')}
          </TouchableHighlight>
     </>
    );
});

export default SetLanguageScreen;
```

Vầy là chúng ta đã apply xong phần đa ngôn ngữ rồi.

**3) Update giao diện**

 Giờ tới phần giao diện cho nó, mình sẽ làm 1 cái nút nhỏ nhỏ ở màn hình welcome, khi bấm vào nó sẽ chuyển đến màn hình chọn ngôn ngữ cho app, mình sẽ tạo 2 option là tiếng Việt hoặc English thôi
 
 ![](https://images.viblo.asia/6c6c54c9-b4af-4a8c-85e0-22874bba1e45.jpg)


 Mình để tên app thành Learn Math và Học Toán, vì nếu happy Math mà dịch sang tiếng việt nghe nó phê cần lắm (Toán vui vẻ hay vui vẻ Toán ?). Cái nút mình để hơi xấu, sẽ update lại sau này với 1 phần setting hoành tráng hơn  
 
 Tiện đây thì chúng ta xài thử luôn nha.
 
 Bấm vào màn hình chọn ngôn ngữ
 ![](https://images.viblo.asia/44f43796-4051-43c2-bf06-35107b644534.jpg)
Đang là tiếng Việt, chúng ta chuyển qua English nhé
![](https://images.viblo.asia/6e22a579-e74d-462e-9a46-79aa9d1dd007.jpg)
Rồi bấm nút Play để back lại trang home
![](https://images.viblo.asia/33a8bce2-1322-45a5-9e4a-fdda6a7d3b68.jpg)
Vào Practice để chơi và chọn thời gian, và với từng loại ngôn ngữ, chúng ta cố thể thấy rất rõ có 2 sự khác biệt lớn:

Việt Nam:
 ![](https://images.viblo.asia/5f616246-06eb-4912-a72a-ece703361d84.jpg)

English:
 ![](https://images.viblo.asia/cbe2ba98-cc93-4e48-a31a-30fe11cfdcfd.jpg)
 
Lần update này mình tạm dừng đến đây thôi, cảm ơn các bạn đã theo dõi bài viết của mình, xin chào và hẹn gặp lại các bạn trong các bài viết sau /(^.^)/

**P/S**

Các bạn có thể theo dõi full series của mình tại đây: 
https://viblo.asia/s/lam-ung-dung-hoc-toan-don-gian-voi-react-native-375z0mxPZGW
Mình đã upload app lên Google store, các bạn có thể tải về xem trước, tên app mình có hơi thay đổi 1 tí, mong mọi người vẫn ủng hộ series của mình

**Link app :** https://play.google.com/store/apps/details?id=com.bloodycotech001

Xin chân thành cảm ơn các bạn!!! <3 <3 <3