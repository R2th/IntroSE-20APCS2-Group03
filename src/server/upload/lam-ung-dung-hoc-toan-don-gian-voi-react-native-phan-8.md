Xin chào mọi người, mình đã trở lại rồi đây. Trước tiên mình xin phép PR 1 chút cho cái app nhỏ nhỏ của mình :3, đây là link download, nếu ai muốn trải nghiệm trước khi làm thì download và ủng hộ mình nhé https://play.google.com/store/apps/details?id=com.bloodycotech001 . Vì có 1 số lý do nên mình vẫn chưa kịp update app cho kịp những gì có trong bài viết, nên hy vọng các bạn có thể thông cảm cho mình. Mình sẽ lắng nghe tất cả các góp ý và đánh giá của tất cả các bạn để dần hoàn thiện series hướng dẫn này cũng như app  trên GG store

Mọi người có thể theo dõi các phần trước của mình tại đây

**Phần 1** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-63vKjzNVK2R]

**Phần 2** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-2-RQqKLQv4Z7z]

**Phần 3** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-3-Eb85oLMkK2G]

**Phần 4** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-4-djeZ1ynGZWz]

**Phần 5** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-5-E375z7NjKGW]

**Phần 6** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-6-YWOZro2NlQ0]

**Phần 7** [https://viblo.asia/p/lam-ung-dung-hoc-toan-don-gian-voi-react-native-phan-7-Qbq5Qa0X5D8]

PR nhẹ nhàng vầy thôi, giờ chúng ta cùng update app nhé

## 1) Lưu dữ liệu ở máy

Với những bạn đã quen làm việc với React như mình, chắc cũng không ít lần các bạn lưu dữ liệu vào LocalStorage, nên giờ cũng muốn thử việc lưu dữ liệu trên app vào trong máy thử để xem nó sẽ có những khác biệt gì. Với suy nghĩ đó, mình đã vạch ra thêm 1 chức năng cho app của mình - chức năng tích lũy xu mở thưởng. Cụ thể là, khi người chơi xem quảng cáo nhận thưởng, hoặc hoàn thành 1 lần chơi với chế độ bất kì, người chơi sẽ được thưởng 1 xu, và xu đó sẽ được lưu lại trong máy, lượng xu đã kiếm sẽ chỉ mất khi nào bạn xóa app thôi.

Và sau 1 lúc tìm hiểu, thì mình nhận thấy là với dữ liệu được lưu trên điện thoại, nó sẽ được lưu 1 cách bất đồng bộ với app của bạn, nghĩa là nó sẽ giống với việc bạn thao tác dữ liệu với server ấy, sẽ có độ trễ, vì lý do đó mình sẽ dùng async await để xử lý vấn đề đó. Thêm vào đó, dữ liệu trên điện thoại là 1 trong những thứ khá nhạy cảm, mặc dù cái xu này không có giá trị gì cả nhưng mình vẫn chọn ``react-native-sensitive-info`` để giúp mình trong việc lưu dữ liệu. Về việc cài đặt thì mình vẫn như mọi khi thôi

Cú pháp thần thánh: ```yarn add react-native-sensitive-info```

Và tạo ra 1 file để sử dụng nó 
```js
import SInfo from 'react-native-sensitive-info';

// Cách sử dụng y chang LocalStorage vậy, trừ việc bạn phải thêm async await vào
export const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SInfo.setItem(key, jsonValue, {});
  } catch {
    e => {
      console.log('setData', e);
    };
  }
};

export const getData = async key => {
  try {
    const jsonValue = await SInfo.getItem(key, {});
    if (!jsonValue) {
      return setData(key, '0');
    }
    const res = JSON.parse(jsonValue);
    return res;
  } catch {
    e => {
      console.log('getData', e);
    };
  }
};

export const deleteData = async key => {
  try {
    SInfo.deleteItem(key, {});
  } catch {
    e => {
      console.log('deleteData', e);
    };
  }
};
```

```js
// Trước khi khởi tạo xu, mình sẽ kiểm thử xem nó đã có chưa đã
const getCoinLocalStorage = async () => {
    const coin = await getData(MineCoinKey);
    if (coin || coin === 0) {
      this.mineCoin = parseInt(coin);
    }
  }

// Mình kiểm tra cả khi coin bị dùng hết trở về 0, bạn cũng biêt rồi đấy, trong JS thì 0 nghĩa là false mà (yaoming)

// Muốn tạo xu thì như thế này thôi
const setCoinLocalStorage = async (amount) => {
    await setData(MineCoinKey, amount);
  }
```

Thật dễ dàng phải không, nó gần như không có gì khó cả, chỉ cần bạn chú ý đến việc nó là xử lý bất đồng bộ là được, vì lấy dữ liệu ở máy, nên mình cũng chưa bao giờ thấy nó không lấy được data cả

## 2) Build app

Hướng dẫn mọi người code cũng đã lâu rồi, giờ cũng đã tới lúc chúng ta thử build cái app ra máy thật nhở? Lưu ý trước khi tiếp tục đọc hướng dẫn cách build, thì người viết bài này, có họ hàng với Đỗ Nghèo Khỉ (T.T) nên hông có tiền sắm máy Mac để build IOS nên mọi hướng dẫn sau đây đều dành cho máy Win

Trước tiên, bạn hãy vào folder nơi bạn cài đặt ENV của JAVA_HOME cho máy ấy, nếu bạn nào không nhớ thì cứ nào tìm trong setting environment system variable của máy , đâ là của mình => `C:\Program Files\Java\jdk-11.0.4\bin>)`, rồi chạy cmd 

Sau đó chạy đoạn lệnh này, nhớ sửa lại theo như lưu lý của mình nha
```
keytool -genkey -v -keystore <folder nơi bạn muốn lưu key của app>\my-release-key.keystore -alias my_key_alias -keyalg RSA -keysize 2048 -validity 10000
```
 Tiếp đó cứ việc next next, rồi đặt pass cho file key dễ nhớ thôi, đừng ông nào đặt cho lắm rồi gõ không ra nhé. Tiếp theo là lấy file my-release-key.keystore cho vào `android/app/` của app

Vào file `gradle.properties`
thêm phần sau:
```js
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my_key_alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```
``******`` là pass của bạn đặt ở bước trên ấy, ví dụ với mình thì mình sẽ đặt là Aa@123456. Rổi vào  ``android/app/build.gradle``, thêm đoạn code 
```
 signingConfigs {
        ...
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
 
…
buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            signingConfig signingConfigs.release
           ...
        }
    }
```
chỗ nào có 3 chấm tức là có code khác rồi ấy. Rồi giờ bạn chỉ cần chạy các lệnh ``cd android`` rồi ``./gradlew assembleRelease`` ( hoặc ``./gradlew assembleRelease``) để build apk (hoặc abb)

Vậy là xong rồi, chúng ta vào theo đường dẫn sau để lấy file apk thôi `<tên app>\android\app\build\outputs\apk\release`

## 3) Build app (phiên bản nhẹ hơn)

Build app như trên là 1 cách làm hoàn toàn đúng, nhưng cái vấn đề ở chỗ, build vậy thì cái app nó sẽ  nặng dữ lắm, chẳng hạn như app của mình, chỉ có vài 3 dòng code mà nặng tới 27mB (????) trong khi nhìn lại app trên store của người ta, code quá trời code, chức năng quá trời chức năng, chỉ nặng có 5mB :|, lý do để giải thích là vì chúng ta đang build 1 file để có thể chạy phù hợp cho mọi loại chip trên tất cả dòng máy nên nó phải tích hợp đủ công nghệ, chứ thật ra trên mỗi dòng máy, nó chỉ chạy đâu tầm 1/3 phần 27mB đấy thôi.

Vậy giờ chúng ta phải làm sao???? Cũng khá đơn giản thôi, vào ``android/app/build.gradle``, thay đổi các giá trị sau như bên dưới
```
def enableSeparateBuildPerCPUArchitecture = true
def enableProguardInReleaseBuilds = true
...
def universalApk = true
```

vào `android/gradle.properties`,Thêm vào: ``org.gradle.jvmargs=-Xmx4608M``

Rồi build bằng lệnh ``./gradlew assembleRelease``

Lần này chủ yếu chúng ta chỉ update những điều thầm kín của app nên sẽ không có chạy thử :3. Cảm ơn các bạn đã theo dõi hết bài viết của mình. Xin chào và hẹn gặp lại các bạn vào 1 ngày không xa

## P/S

Các bạn có thể theo dõi full series của mình tại đây: 

https://viblo.asia/s/lam-ung-dung-hoc-toan-don-gian-voi-react-native-375z0mxPZGW

Mình đã upload app lên Google store, các bạn có thể tải về xem trước, tên app mình có hơi thay đổi 1 tí, mong mọi người vẫn ủng hộ series của mình

**Link app :** https://play.google.com/store/apps/details?id=com.bloodycotech001

Xin chân thành cảm ơn các bạn!!! <3 <3 <3