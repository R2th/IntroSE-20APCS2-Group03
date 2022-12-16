### Bài này chỉ nhằm mục đích triển khai kỹ hơn về việc sử dụng sagas và query dữ liệu thực trong Firebase Cloud Store.
Trước đây mình có một bài sơ lượt chung về viết tầng Firebase API để querry dữ liệu. Hôm nay mình xin show rõ hơn về thực thi đầy đủ trong một dự án. 
Lý do là sau thời gian khi vào dự án code thực thì mới ra vài issues mà một số bạn hay gặp phải là..'chém thì thế mà triển khai khó lắm em,anh gì ơi'

Đâu tiên mình xin define đủ hơn tí tẹo về tầng authen của firebase lại hoặc các bạn có thể xem tại bài 1 nhé
```
import { eventChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';

function* applyActionCode(code) {
  const auth = this.app.auth();
  return yield call([auth, auth.applyActionCode], code);
}

function channel() {
  if (this.authChannel) return this.authChannel;

  const auth = this.app.auth();
  const Channel = eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged(user => emit({ user }), error => emit({ error }));

    return unsubscribe;
  });

  this.authChannel = Channel;
  return Channel;
}

function* confirmPasswordReset(code, newPassword) {
  const auth = this.app.auth();
  return yield call([auth, auth.confirmPasswordReset], code, newPassword);
}

function* createUserWithEmailAndPassword(email, password) {
  const auth = this.app.auth();
  return yield call([auth, auth.createUserWithEmailAndPassword], email, password);
}

function* deleteProfile() {
  const auth = this.app.auth();
  return yield call([auth.currentUser, auth.currentUser.delete]);
}

function* linkWithPopup(authProvider) {
  const auth = this.app.auth();
  return yield call([auth.currentUser, auth.currentUser.linkWithPopup], authProvider);
}

function* linkWithRedirect(authProvider) {
  const auth = this.app.auth();
  return yield call([auth.currentUser, auth.currentUser.linkWithRedirect], authProvider);
}

function* sendEmailVerification(actionCodeSettings) {
  const auth = this.app.auth();
  return yield call([auth.currentUser, auth.currentUser.sendEmailVerification], actionCodeSettings);
}

function* sendPasswordResetEmail(email, actionCodeSettings) {
  const auth = this.app.auth();
  return yield call([auth, auth.sendPasswordResetEmail], email, actionCodeSettings);
}

function* signInAndRetrieveDataWithCredential(credential) {
  const auth = this.app.auth();
  return yield call([auth, auth.signInAndRetrieveDataWithCredential], credential);
}

function* signInAnonymously() {
  const auth = this.app.auth();
  return yield call([auth, auth.signInAnonymously]);
}

function* signInWithCredential(credential) {
  const auth = this.app.auth();
  return yield call([auth, auth.signInWithCredential], credential);
}

function* signInWithCustomToken(token) {
  const auth = this.app.auth();
  return yield call([auth, auth.signInWithCustomToken], token);
}

function* signInWithEmailAndPassword(email, password) {
  const auth = this.app.auth();
  return yield call([auth, auth.signInWithEmailAndPassword], email, password);
}

function* signInWithPhoneNumber(phoneNumber, applicationVerifier) {
  const auth = this.app.auth();
  return yield call([auth, auth.signInWithPhoneNumber], phoneNumber, applicationVerifier);
}

function* signInWithPopup(authProvider) {
  const auth = this.app.auth();
  const { credential } = yield call([auth, auth.signInWithPopup], authProvider);

  return credential;
}

function* signInWithRedirect(authProvider) {
  const auth = this.app.auth();
  yield call([auth, auth.signInWithRedirect], authProvider);
}

function* signOut() {
  const auth = this.app.auth();
  yield call([auth, auth.signOut]);
}

function* unlink(provider) {
  const auth = this.app.auth();
  return yield call([auth.currentUser, auth.currentUser.unlink], provider);
}

function* updateEmail(email) {
  const auth = this.app.auth();
  return yield call([auth.currentUser, auth.currentUser.updateEmail], email);
}

function* updatePassword(password) {
  const auth = this.app.auth();
  return yield call([auth.currentUser, auth.currentUser.updatePassword], password);
}

function* updateProfile(profile) {
  const auth = this.app.auth();
  return yield call([auth.currentUser, auth.currentUser.updateProfile], profile);
}

export default {
  applyActionCode,
  channel,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  deleteProfile,
  linkWithPopup,
  linkWithRedirect,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInAndRetrieveDataWithCredential,
  signInAnonymously,
  signInWithCredential,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  unlink,
  updateEmail,
  updatePassword,
  updateProfile
};

```
Ở đây mình cũng trộm vía từ một số thư viện define hết cho nó hoành tráng. Gần như không thiếu function nào cả.
Mấu chốt quan trọng là khi làm với saga thì các function chúng ta là generator function nhé.
Và nhớ là nếu firebase muốn đăng nhập được với method nào thì các bạn nhớ vào console để setup về phương thức đăng nhập nhé.
![](https://images.viblo.asia/ee52402e-6b3d-424d-b6ed-6b30ccfdff8c.png)
Thực ra nếu các bạn có team sever thì nên sử dụng Authorized domains với việc cung cấp 1 sever API để request authen thì sẽ tốt hơn nhiều cho các vấn đề về sau nhé. (nhìn cũng ngon nghẻ hơn)
Tiếp theo thực chất Auth trong firebase vẫn dừng lại login thôi, bản chất chúng ta thường muốn define 1 table 'User' gì đấy để lưu trữ thông tin người dùng. Vì vậy bạn phải tạo một doccument để lưu trữ user info và link với auth id của chính user đó để sau khi login vào bạn có thể lấy được thông tin người dùng và show ra, kiểu như tên tuổi, giới tính .v.v.v
![](https://images.viblo.asia/e2ad45a8-0d11-445b-a8ca-459452b00467.png)
Okay như vậy chúng ta sẽ tiến hành viết vài câu query và function tại tầng 'auth services' để làm vài thứ linh tinh nhé.
Ví dụ 
Chúng ta muốn lấy userinfo sau khi đăng nhập thành công
```
  *getCurrentUserSettings() {
    const userStorage = yield LoginStorage.authenticated();
    const data = yield call(
      this.reduxSagaFirebase.firestore.getCollection,
      this.reduxSagaFirebase.app
        .firestore()
        .collection('userSettings')
        .where('userId', '==', userStorage.userId)
        .limit(1)
    );
    const convertData = convertSnapshotDataArray(data);
    return convertData[0];
  }
```
Vì data trả về luôn luôn là list nên chúng ta đành chấp nhận việc dữ liệu query add thêm limit 1 vào. Dữ liệu trả về sẽ dạng snapshot nhé, và có rất nhiều function đi theo nếu bạn muốn sử dụng nâng cao hơn thì hãy xài các function đấy còn không thì chỉ lấy data trả về mà mình mong muốn thôi.
Hàm convertSnapshotDataArray là mình xài để lấy mỗi dữ liệu ra
```
export const convertSnapshotDataArray = snapshotData => {
  let convertData;
  snapshotData.forEach(obj => {
    convertData = {
      ...convertData,
      [obj.id]: obj.data()
    };
  });
  return _.map(convertData, (val, uid) => {
    return { ...val, uid };
  });
};
```
Hãy để ý function getUserInfoByAuthId bạn có thể thấy chúng ta chả thấy có sự can thiệp vì vào việc check authen xem người dùng đã login vào hay chưa đúng ko.
Tuy nhiên: để làm điều đấy chung ta cần setup một tí về role đọc ghi ( cao hơn là cả các action delete, update) cho từng colection
```
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() {
      return request.auth.uid != null;
    }
    match /users/{id} {
    	allow read: if isSignedIn();
      allow write: if isSignedIn();
    }
  }
}
```
Đây là ví dụ về setting chúng ta chỉ cho phép đọc và ghi vào collection 'users' khi kiểm tra request gửi lên auth đã có uid tồn tại ( đã login rồi)
Và việc call function getCurrentUserSettings trong saga thì đơn giản thôi, mình sẽ lắng nghe một action rồi gọi function với params truyền vào thôi
```
function* getUserSettings() {
  try {
    const result = yield authServices.getCurrentUserSettings();
    yield put({
      type: GET_USER_SETTINGS_SUCCESS,
      payload: { userSettings: result }
    });
  } catch (e) {
    yield put({ type: GET_USER_SETTINGS_FAIL, error: e });
  }
}

--------
export default function* authSaga() {
  yield all([takeLatest(GET_USER_SETTINGS, getUserSettings)]);
  .....
}
```
Thanks