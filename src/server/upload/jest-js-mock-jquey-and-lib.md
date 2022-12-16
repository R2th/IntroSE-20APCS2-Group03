Bài viết này mình sẽ tổng hợp một số cách mock của jest khi viết unit test trong code js với thư viện [jest](https://jestjs.io/).

## Mock jest with jquery

### Mock $.ajax

Gỉa sử bạn có đoạn code như sau cần phải mock

```js
getData(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(resultObj) {
         console.log(resultObj);
      },
      error: function(resultObj) {
        console.log(resultObj);
      },
      timeout: this.requestTimeout * 1000
    });
  }
```

cái bạn cần làm là phải mock được hàm $.ajax:

đoạn code test sẽ như sau:

```js
 test('ajax success', () => {
    mockRequired();
    $.ajax = jest.fn(params => {
      if (params.url === 'success-url') return params.success({});
      return false;
    });
    jest.useFakeTimers();
    getData('success-url');
    jest.runAllTimers();
  });
```

bạn chú ý đến đoạn:

```js
    $.ajax = jest.fn(params => {
      if (params.url === 'success-url') return params.success({});
      return false;
    });
```

đó chính là phần mock của chúng ta, để test error bạn chỉ cần đổi lại url và sửa chỗ params.success thành params.error là được.

đối với jquey nhiều người dùng là $.get ($.post) thì mock cũng tương tự như sau:

```js
  $.get = jest.fn(() => {
    return { pid: '123123' };
  });
```

nếu ajax của bạn dùng Promise để call thì bạn có thể mock như sau:


```js
 // success
 $.post = jest.fn(() => {
      return $.Deferred().resolve(testData);
  });
    
  //error
   $.post = jest.fn(() => {
      return $.Deferred().reject(testData);
   });
```

#### Mock hàm của jquey hay thư viện đựa trên jquery

ví dụ có những đoạn code như sau:

```js
$.session.get('id');
$.session.set('id')
$("#id").modal();
$("#id").modal('toggle');
```

thì chúng ta có thể mock nó như sau:
```js
const callback = jest.fn();

window.$ = jest.fn().mockImplementation(() => {
  return {
    modal: jest.fn(),
  };
});
```

hay:

window.$.session = {
  get: jest.fn(() => {
    return '100';
  }),
  set: jest.fn(() => {
    return '200';
  }),
};


### Mock module

Giả sử bạn có đoạn code như sau cần phải test: 

```js
// createUser.js
import fetch from 'node-fetch';

export const createUser = async () => {
  const response = await fetch('http://website.com/users', {method: 'POST'});
  const userId = await response.text();
  return userId;
};
```

thì bạn có thể viết test và mock như sau:

```js
jest.mock('node-fetch');

import fetch, {Response} from 'node-fetch';
import {createUser} from './createUser';

test('createUser calls fetch with the right args and returns the user id', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('4')));

  const userId = await createUser();

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://website.com/users', {
    method: 'POST',
  });
  expect(userId).toBe('4');
});
```

### Mock funtion

giả sử trong một file helper của bạn có 1 function như sau:

```js

// mainjs
async vibloTest(url) {
   ...
    const response = await getData(url);
   ....
 }

// helper.js
export const getData = async url  => {
  try {
    return await $.get(url);
  } catch (_) {
    return null;
  }
};
```

và bạn cần mock function này, nhìn vào function thì bạn có thể mock nó qua hàm $.get cũng được, nhưng trường hợp có nhiều hơn $.get trong một phần test thì bạn sẽ khó kiểm soát giá trị trả về của từng thành phần


```js
import * as helper from '../parts/helper';

...
test('getData success', async () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.clearAllTimers();
    });
    // start mock data to test
    const data = ['1'];
    const getData = jest.spyOn(helper, 'getData').mockReturnValueOnce(data);
    // end mock data

    const res = await vibloTest('URL_HERE');
    ....
    expect(getData).toBeCalledTimes(1);
  });
```

Trên đây là nhưng chia sẽ từ kinh nghiệm thực tế viết test của mình đối với js sử dụng jest. nếu có câu hỏi nào bạn vui lòng để lại comment dưới bài viết, mình rất sẵn lòng giải đáp thắc mắc của các bạn.



### Tham khảo
-  https://jestjs.io/docs/en/manual-mocks
-  https://stackoverflow.com/