Chào mọi người.
Chúng ta sẽ tiếp tục đi xây base React Native nhé và hôm nay chúng ta sẽ đi tới bài sử dụng Mobx.

# Mobx là gì
MobX rất đơn giản, có thể mở rộng (scalable) và là một giải pháp để quản lý trạng thái (state management).
 - Mobx đơn giản, dễ sử dụng, không cần công cụ đặc biệt nào, Mobx sẽ phát hiện tất cả các thay đổi của bạn và truyền tải chúng đến nơi chúng đang được sử dụng.
 - Mobx đã chuẩn bị sẵn tất cả để bạn tốt ít thời gian nhất có thể khi xây dựng application, và luôn đảm bảo rằng các tính toán tùy thuộc vào trạng thái của bạn, như các thành phần React, chỉ chạy khi thực sự cần thiết.
 - Mobx độc lập và ko phụ thuộc vào setup UI nên nó có thể sử dụng ở bất cứ nơi đâu trong Application, điều này làm cho code của bạn được tách rời, di động và trên hết là có thể kiểm tra dễ dàng.

## Cách hoạt động của Mobx
![](https://images.viblo.asia/5b2f6545-bf7a-4fb0-8cac-c229b159235a.png)

 - Các event từ UI sẽ gọi đến những `actions` trong store của Mobx.
 - Các `actions` này sẽ thay đổi trực tiếp các `observable` state trong store.
 - Ngay lập tứ các `Computed` của store sẽ được cập nhật giá trị mới nhất
 - Cuối cùng, các side-effect sẽ trigger để render component với state mới.


### Lợi thế của Mobx là gì
- Mobx hỗ trợ đầy đủ các khái niệm của OOP như class-base, decorator, inheritance, qua đó chúng ta có thể chia ứng dụng thành rất nhiều store nhỏ. Mỗi store sẽ tự quản lý state và action của riêng mình.
- Chắc hẳn khi làm về react ai cũng sẽ nghe tới khái niệm về Redux đúng ko ạ, thực tế thì với các Application nhỏ mà áp dụng Redux thì chả khác nào đi lấy giao mổ bò để giết gà, vậy nên với những application nhỏ và cần deliver sớm thì Mobx là một sự lựa chọn đúng đắn bởi sự gọn nhẹ và linh hoạt.
- Khi các bạn kết hợp typescript với Mobx thì OOP trong javscript không khác gì những ngôn ngữ native khác :D

# Setup Mobx

Việc setup thì khá là đơn giản như bao thư viện khác, bạn có thể sử dụng `yarn` hoặc `npm`

```
yarn add mobx
```

```
npm install --save mobx
```

## mobx-react
Ngoài ra khi sử dụng React Native thì chúng ta sẽ cần add thêm một package nữa đó là `mobx-react`

> Package with React component wrapper for combining React with MobX. Exports the observer decorator and other utilities. For documentation, see the MobX project. This package supports both React and React Native.


```
yarn add mobx-react --save
```

```
npm install --save mobx-react
```

Nhiều bạn sẽ thắc mắc vì sao lại cần cài đặt thêm mobx-react, bởi vì đây sẽ là package sẽ support chúng ta sử dụng mobx kết hợp cùng với hook của React, và sử dụng nó như thế nào thì ở phần dưới mình sẽ giới thiệu nhé.

## Babel and typescript
Nếu như bạn dự định sử dụng mobx với babel và typescript để code và bạn có dự định sử dụng class thì bạn cần phải config một vài chỗ như sau:

- Với `tsconfig.json` thì các bạn add thêm key `"useDefineForClassFields": true`
- với Babel các bạn sẽ update như sau:
 ```
  module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV) === 'test';
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [
        'module-resolver',
        {
          root: ['src'],
          extensions: ['.ts', '.tsx', '.js'],
        },
      ],
    ],
  };
};
```
  
Và các bạn nhớ add thêm thư viện của Babel nếu ko sẽ báo lỗi và ko thể chạy được nha.
```
yarn add @babel/plugin-proposal-decorators --dev
```

# How to use
Setup thì xong xuôi rồi á, bây giờ chúng ta sẽ đến với cách sử dụng.

Trước hết chúng ta sẽ cùng xem lại bức tranh về cơ chế của Mobx nha mn.

![](https://images.viblo.asia/3ecb90e8-e4f6-4fbb-a433-83af09827da0.png)

 Như vậy bây giờ chúng ta sẽ cần làm những gì:  - Tạo mới 1 store và sử dụng Mobx  - Config lại View để có thể reRender lại khi Store thay đổi  ## Store  Như ở trang chủ của Mobx đã hướng dẫn thì để tạo store chúng ta sẽ tạo 1 class và `makeObservable` trong `constructor`

```Javascript import { makeObservable } from 'mobx';

class UserStore {
  _hasLogin: boolean = false;

  constructor() {
    makeObservable(this);
  }

  setHasLogin = (hasLogin: boolean) => {
    this._hasLogin = hasLogin;
  };

  get IsUserLogined(): boolean {
    return this._hasLogin;
  }
}

const userStore = new UserStore();
export default userStore;
```

Ở `constructor` chúng ta có thể config một cách detail hơn như sau:  ```Javascript  constructor() {
    makeObservable(this, {
      _lockNavigation: observable,
      setLockNavigation: action,
      IsLockNavigation: computed,
    });
  }
 ```  Có một vài điều cần chú ý như sau:
 - để các field có thể cập nhật đầy đủ khi được change thì sẽ phải mark field đó là `observable`  - các function dùng để cập nhật các field `observable` thì nên đc mark là `action`
 - các public Property dùng để access vào field `observable` thì nên đc mark là `computed`

## Config View  Sau khi có được store thì việc tiếp theo chúng ta cần làm là config `View` sao cho có thể nhận ra được sự thay đổi của `Store` mà raise reRender. Nói có vẻ là ghê gớm nhưng thực tế rất đơn giản, các bạn hãy nhìn đoạn code sau nhé.

```Javascript import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { UserStore } from 'stores';
import AuthNavigationStack from 'navigations/Authentication';
import HomeNavigationStack from 'navigations/Home';
import { observer } from 'mobx-react';
import { PERMISSIONS, request } from 'react-native-permissions';

const App = () => {
  const selectStack = () => {
    if (!UserStore.IsUserLogined) {
      return <AuthNavigationStack />;
    } else {
      return <HomeNavigationStack />;
    }
  };

  useEffect(() => {
    request(PERMISSIONS.IOS.CAMERA).then((result) => {
      console.log(result);
      // …
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />
      <NavigationContainer>{selectStack()}</NavigationContainer>
    </>
  );
};

export default observer(App); ```  Như đoạn code trên thì mình sẽ chuyển trạng thái của App dựa vào trạng thái của `UserStore.IsUserLogined` và mình chỉ cần sửa một chút ở đoạn code `export` View ra thôi. Thay vì export default như bình thường thì mình sẽ bọc View trong `observer`. Đây là function của `mobx-react`.  Đoạn này `mobx-react` sẽ đảm nhiệm việc của nó là tracking xem object `observer` có gì thay đổi ko, nếu có sẽ raise sự kiện props change cho View và tiến hành ReRender lại.