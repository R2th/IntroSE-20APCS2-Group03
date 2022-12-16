## Lời giới thiệu
Xin chào các bạn. Unit test từ lâu đã là một phần không thể thiếu để kiểm tra phần mềm chúng ta viết ra có tốt như mong đợi hay không. Các function liên quan tới side-effect ví dụ như các request API lại càng nên được viết test vì tầm quan trọng của xử lí logic chặt chẽ. Với các ứng dụng React native, chúng ta thường dùng middleware Redux saga để xử lí phần side-effect này. Có rất nhiều phương pháp để viết unit test với saga. Hôm nay mình sẽ giới thiệu các phương pháp khá đơn giản, chỉ sử dụng những phương thức và thư viện rất cơ bản từ chính `redux-saga` và `Jest`.

## Một chút về redux-saga và generator function
Nếu bạn quên mất redux-saga thì có thể xem lại [tại đây](https://redux-saga.js.org/) nhé

Khi dùng redux-saga, chúng ta sẽ khai báo các saga ở dạng generator function ( `function*` ). Đó là loại function có thể thực thi, tạm dừng trả về kết quả và thực thi tiếp nhờ vào từ khoá "yield". Generator function trả về một đối tượng `iterator`  có phương thức `next()` để lấy kết quả trả về tại điểm mà iterator đang tạm dừng ở đó.
```
{ 
  value: Any,
  done: true|false
}
```
Nhờ đó generator function có khả năng tạm ngưng trước khi kết thúc và có thể tiếp tục chạy tại một thời điểm khác. Ví dụ như bạn cần lấy giá trị nào trong store trước khi gọi API, hoặc đọc file nào đó trong thư mục của app xong rồi mới đi gọi API chả hạn, lúc này generator function giúp chúng ta có thể bắt những tác vụ bất đồng bộ chạy một cách đồng bộ. Vì thế khi kiểm thử chúng ta cũng có thể gọi để kiểm tra các kết quả theo thứ tự mà chúng ta mong muốn.

## Jest
Jest là một thư viện của Javascript, và được xem như là thư viện test mặc định cho các React app. Mặc dù Jest còn được dùng để test cho cả UI của các component nhưng trong bài viết này mình sẽ chỉ nói về test chức năng thôi.
Ngoài việc cung cấp cơ chế để gọi một function đã được định nghĩa, Jest còn hỗ trợ chúng ta fake các function được tham chiếu từ module hay 1 file nào đó. Nếu trong function cần test của bạn gọi tới vài function bất đồng bộ khác, việc hỗ trợ fake những function bất đồng bộ này sẽ giúp bạn tạm thời pass qua chúng tập trung hơn cho function mà bạn đang cần test này.
Tài liệu viết về Jest thì cũng nhiều vô kể, các bạn có thể tìm đọc thêm cùng với thư viện Jest tại [đây](https://jestjs.io/)

Lan man thế thôi, bây giờ chúng ta hãy cùng đi vào phần chính nhé.
## Test một generator function đơn giản
Chúng ta hãy lấy ví dụ đơn giản nhất cho generator function như sau:

```
function* myGenerator(i) {
  yield i; // line 1
  yield i + 10; // line 2
}
```
Function này có 2 từ khoá `yield`. Khi khai báo một iterator object gọi tới hàm đó bằng cú pháp: 
```
const testGenerator = myGenerator(5)
```
 thì lúc này hàm vẫn chưa bắt đầu thực thi. Chúng ta phải gọi phương thức next() của iterator đó thì nó mới thực sự chạy đến khi gặp yield thì sẽ dừng lại tại statement đó
Như vậy Lần đầu tiên hàm sẽ dừng lại ở line 1 và trả về kết quả chính là `i`, lần gọi next() tiếp sẽ trả về kết quả là` i + 10` và vẫn dừng lại tại vị trí line 2. Chúng ta phải gọi tiếp `next()` một lần nữa thì lúc này iteratior object sẽ trả về kết quả `done` đồng thời lúc này generator sẽ kết thúc. 

Vậy thì chúng ta kiểm tra cũng rất đơn giản như sau:
```
it('myGenerator test',  () => {
const testGenerator = myGenerator(5)
expect(testGenerator.next().value).toEqual(5)
expect(testGenerator.next().value).toEqual(15)
expect(testGenerator.next().done).toBeTruthy()
})
```

## Test một watcher của một Saga
Một trong cú pháp quen thuộc của chúng ta sau khi định nghĩa một saga là chúng ta sẽ cần một watcher quan sát một action thì mới thực thi saga đó. Giả sử chúng ta có một saga gọi API lấy danh sách các thiết bị. Đầu tiên là các action cho request này như sau:

```
export const onGetListDeviceAction = (categoryId) => {
  return {
    type: 'GET_LIST_DEVICE',
    categoryId
  };
};

export const getListDeviceSuccessAction = (devices) => {
  return {
    type: 'GET_LIST_DEVICE_SUCCESS',
    devices
  };
};

export const getListDeviceErrorAction = () => {
  return {
    type: 'GET_LIST_DEVICE_ERROR'
  };
};

```

Bây giờ chúng ta có một watcher quan sát action type là `GET_LIST_DEVICE`  và một saga thực thi việc gọi API, nếu thành công thì sẽ put action `getListDeviceSuccessAction()` còn nếu xảy ra lỗi thì sẽ put action `getListDeviceErrorAction()` . Ở đây chúng ta đang giả sử như hàm Api.requestDevices() là một promise cái đã nhé

```
import { put, takeEvery } from 'redux-saga/effects';

import { getListDeviceSuccessAction, getListDeviceErrorAction } from './actions';
import Api from './api';

function* getListDevice({ categoryId }) {
  try {
    const devices = yield Api.requestDevices(categoryId);
    yield put(getListDeviceSuccessAction(devices));
  } catch (error) {
     yield put(getListDeviceErrorAction());
  }
}

export default function* deviceListSaga() {
  yield takeLatest('GET_LIST_DEVICE', getListDevice);
}
```

Bây giờ chúng ta sẽ xem thử watcher `deviceListSaga` có quan sát action `GET_LIST_DEVICE` và gọi tới function `getListDevice` hay không.

```
import { takeLatest } from 'redux-saga/effects';
import deviceListSaga, { getListDevice } from './saga';

describe('test deviceListSaga watcher', () => {
  const genObject = deviceListSaga();
  it('should wait for latest GET_LIST_DEVICE action and call getListDevice', () => {
    const generator = genObject.next();
    expect(generator.value).toEqual(
      takeLatest('GET_LIST_DEVICE', getListDevice),
    );
  });

  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});
```

Vì watcher của chúng ta cũng chỉ là một generator function, khi khởi tạo
```
const genObject = deviceListSaga();
```
thì vẫn chưa có gì xảy ra. Khi mà chúng ta  gọi next lần thứ nhất, nó mới thực thi và sẽ trả về value chính là effect `takeLatest` và chưa kết thúc.Lần gọi next() thứ hai mới thực sự kết thúc hàm này. 

## Test toàn bộ một Saga

Bây giờ, chúng ta cần chạy saga `getListDevice` (cũng vẫn chỉ là một generator function). Khi chạy một generator function, gặp từ khoá yield thì iterator lại dừng lại, vậy nên lúc này ta sẽ dùng phương thức [runSaga](https://redux-saga.js.org/docs/api/#runsagaoptions-saga-args) của chính redux-saga để chạy toàn bộ luồng của `getListDevice`. Tuy nhiên khi chạy tới `yield requestDevices(categoryId)`, vì đây là một promise nên iterator sẽ chưa biết sẽ nhận được kết quả gì. Để đảm bảo toàn bộ luồng được chạy hết thì ta phải làm cho `requestDevices()` được pass qua.
Trong ví dụ trên, promise `requestDevices(categoryId)` hoặc là thành công hoặc là xảy ra lỗi. Chúng ta sẽ test thử với trường hợp thành công trước, bằng cách mock Promise `requestDevices(categoryId)` trả về một resolve() nhé:
```
import * as api from './api';

requestDevices = jest
      .spyOn(api, 'requestDevices')
      .mockImplementation(() => {
        return Promise.resolve(devices);
      });
  });
```

Và bây giờ thì cùng kiểm tra toàn bộ saga. Cú pháp của `runSaga( options, saga, …args )` bao gồm:
- `options` : là một object hỗ trợ chúng ta define các option như dispatch, getState, channel ...
- `saga`: là saga mà chúng ta muốn test
- `args`: tham số cho saga mà chúng ta cần test đó

```
import { runSaga } from 'redux-saga';
import { getListDevice } from './saga';
import { requestDevices } from './api';
import { devices } from './__mocks__/devices';
import { getListDeviceSuccessAction } from './actions';

const args = {
  categoryId: 1
};

describe('getListDevice success', () => {
  let requestDevices;
  beforeEach(() => {
    requestDevices = jest
      .spyOn(api, 'requestDevices')
      .mockImplementation(() => {
        return Promise.resolve(devices);
      });
  });

  it('should call API and dispatch success action', async (done) => {
    const dispatched = [];
    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      getListDevice,
      args,
    ).toPromise();
    expect(requestDevices).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([getListDeviceSuccessAction(devices)]);
    done();
  }, 500);

  afterEach(() => {
    requestDevices.mockClear();
  });
});

```
Chúng ta sẽ chờ runSaga chạy xong hẳn trong một async function rồi mới đi kiểm tra kết quả mong muốn. Trong ví dụ này, ta đã config option:
```
  { dispatch: (action) => dispatched.push(action) }
```
Vì effect `put(action)` chính là `dispatch(action)` của redux, nên khi chạy saga, nếu effect `put` aciton nào được gọi thì chúng ta sẽ lưu action đó vào mảng rồi kết thúc tiến trình thì kiểm tra xem action mong muốn có được gọi hay không. 
và sau khi runSaga kết thúc, ta kiểm tra action được gọi bằng cách 
```
 expect(dispatched).toEqual([getListDeviceSuccessAction(devices)])
```

Còn nếu như muốn mock Promise `requestDevices(categoryId)` trả về lỗi thì chúng ta cũng chỉ cần đơn giản như sau
```
 requestDevices = jest
      .spyOn(api, 'requestDevices')
      .mockImplementation(() => {
        return Promise.reject();
      });


 // rồi kiểm tra...
    expect(dispatched).toEqual([getListDeviceErrorAction()]);
```

Trong số các saga của bạn có thể sẽ tham chiếu tới `store` để lấy ra giá trị gì đó rồi mới thực hiện tiếp. Vậy thì lúc này chúng ta sẽ gọi `runSaga` với option có thêm `getState` để đảm bảo toàn bộ luồng sẽ chạy như mong muốn 

```
function* getListDevice({
  categoryId,
}) {
  try {
  const deviceState = yield select(deviceState);
  const { isLoading } = deviceState
  // do something
  } catch (error) {
  }
}

await runSaga({
    dispatch: (action) => dispatched.push(action),
    getState: () => ({
        deviceState: { isLoading: true }
        }),
    },
    getListDevice,
    args,
    ).toPromise();
  
```
## Có thể bạn chưa biết - khi sử dụng với typescript

### Lỗi khi chưa ép kiểu cho saga
Để cho ngắn gọn hơn thì những đoạn code trên mình đã chưa viết theo Typescript. Nếu dự án các bạn sử dụng Typescript thì các bạn hãy tự sửa đổi và khai báo type cho các cú pháp trong saga nhé. 
Còn nếu các bạn  gọi runSaga với cú pháp trên và nhận được lỗi type ở chỗ saga của bạn như sau
 `Argument of type '({ <arg> }: <Action>) => Generator<Promise<any> | PutEffect<> | PutEffect<>, void, [...]>' is not assignable to parameter of type 'Saga<any[]>'.` 
Thì lúc này hãy ép kiểu saga của bạn thành `Saga<any[]>` là được
 ```
await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      getListDevice as Saga<any[]>, // <- ép kiểu saga của bạn ở đây
      args,
    ).toPromise();
```

### Làm sao để test saga có chứa một saga khác?
Mình chắc hẳn là trong những xử lí saga của các bạn, sẽ cần gọi tới một saga (hay generator function) khác, chả hạn như sau 
```
export function* editDevice({
  deviceId) {
  try {
    const deviceToSave = yield removeImage(deviceId); // removeImage là một saga nào đó của bạn
   // continue to do something 
  } catch (err) {
    // handle error
  }
}
```

Với generator function `removeImage` được khai báo ở một chỗ nào đó trong project của bạn:

```
export function* removeImage(deviceId: number) {
// do something
  return deviceObject;
}
```

Lúc này  `removeImage()` là một generator function tự các bạn viết chứ không phải là Promise như ví dụ ban đầu. Dù trong saga này có gọi tới bao nhiêu saga khác nữa đi chả hạn thì tóm lại cũng chỉ là các bạn cần pass được qua các câu lệnh gọi tới chúng để tiếp tục chạy luồng Saga chính của chúng ta thôi. Vậy thì thay vì mock một Promise, chúng ta cũng chỉ cần mock các saga đó trả về kết quả như mong đợi thôi đúng không? Giờ mình sẽ khai mock `removeImage`  để saga `editDevice` được chạy trơn tru nhé: 

```
function* mockRemoveImage( // Khai báo 1 generator function
  deviceId: number,
): Generator<any, any, unknown> {
  return {id: 99, name: 'Test Device'};
}
```
Rồi tiếp tục đơn giản dùng jest để mock Saga ấy thôi
```
  beforeEach(() => {
    jest
      .spyOn(yourFileIncludeRemoveImageFunction, 'removeImage')
      .mockImplementation(() => {
        return mockRemoveImage(99); // return về generator function đã khai báo ở trên
      });
  });
```

## Kết luận
Bài viết này dựa trên kinh nghiệm cá nhân đã vận dụng cho dự án react-native của team mình. Hi vọng bài viết này có thể giúp ích gì đó cho các bạn trong mảng unit test với redux-saga cho react app. Trong bài viết nếu có sai sót thì mong các bạn chỉ ra cho mình với nhé.
Cám ơn các bạn đã đọc.

Nguồn tham khảo:

https://medium.com/@13gaurab/unit-testing-sagas-with-jest-29a8bcfca028

https://redux-saga.js.org/docs/advanced/Testing.html