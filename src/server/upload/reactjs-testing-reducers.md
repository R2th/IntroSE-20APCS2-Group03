Redux là một thư viện giúp chúng ta quản lý state một cách rõ ràng trong các dự án về React (gồm cả ReactJS và React Native). Việc test cho redux là cực kỳ cần thiết và chúng ta hoàn toàn có thể viết test một cách dễ dàng vì redux chỉ làm việc với data chứ ko liên quan đến UI. Một thành phần quan trọng của redux là `reducer` là một `pure function` mà chúng ta cũng cần quan tâm khi viết test. Trước hết chúng ta sẽ nhắc lại các bước để viết test và coding theo TDD (Test-Driven Development)

+ Viết test trước
+ Chạy test và xem lỗi ở đâu
+ Viết code để test pass
+ Refactor code và test (nếu cần thiết)

TDD là một cách tốt để tiếp cận một ứng dụng sử dụng Redux. Chúng ta nên thực sự cần biết Reducer hoạt động đúng để có thể viết code được chính xác. Reducer là một pure function sẽ trả về kết quả dựa trên tham số đầu vào. Trong test, chúng ta sẽ quan tâm đến input, current state và action. Dựa vào current state và action, chúng ta sẽ dự đoán kết quả đầu ra. Trước khi viết test, chúng ta cần cài đặt một framework hỗ trợ là `Jest`

```javascript
sudo npm install -g jest
```

Câu lệnh trên sẽ cài đặt jest ở môi trường global, nghĩa là chúng ta có thể sử dụng `jest` ở bất cứ folder nào. Hiện nay chúng ta thường sử dụng ES6, do vậy chúng ta cần một thư việc để transpile code trước khi run test là `babel-jest` 

```javascript
npm install --save-dev babel-jest
```

`Jest` có hai function quan trọng để setting test là `describe` và `it`. `describe` được sử dụng để tổ hợp một tập hợn test. `it` được sử dụng cho mỗi trường hợp test. Cả hai function đều có đầu vào là tên của tổ hợp test hoặc của test và một function hoặc một tổ hợp test. Chúng ta sẽ tạo một folder `./__test__/store/reducers` để tạo các test cho reducers. Chúng ta sẽ lấy ví dụ về một reducer, và tạo file là color.test.js trong thư mục vừa tạo

```javascript
describe("color Reducer", () => {
    it("ADD_COLOR success")
    it("RATE_COLOR success")
})
```

Chúng ta có thể tạo một pending test bằng cách chỉ truyền vào một tham số là name cho mỗi test case. Khi chạy jest command, nó sẽ bỏ qua hai test case trên

```code
$ jest

Test Suites: 1 skipped, 0 of 1 total
Tests: 2 skipped, 2 total
Snapshots: 0 total
Time: 0.863s
Ran all test suites.
```

Chú ý: Jest sẽ run bất cứ file tests nào nằm trọng thư mục __test__, và bất cứ files nào có extension là  .test.js.

Chúng ta sẽ import một function (là reducer mà chúng ta định tạo), nhận đầu vào là currentState và action và trả về kết quả như mong đợi.

Jest so sánh kết quả trả về bằng function `expect` và sử dụng nó để verify kết quả. Để test color reducer, chúng ta sẽ sử dụng .toEqual

```javascript
import C from '../../../src/constants'
import {
    color
} from '../../../src/store/reducers'
describe("color Reducer", () => {
    it("ADD_COLOR success", () => {
        const state = {}
        const action = {
            type: C.ADD_COLOR,
            id: 0,
            title: 'Test Teal',
            color: '#90C3D4',
            timestamp: new Date().toString()
        }
        const results = color(state, action)
        expect(results)
            .toEqual({
                id: 0,
                title: 'Test Teal',
                color: '#90C3D4',
                timestamp: action.timestamp,
                rating: 0
            })
    })
    it("RATE_COLOR success", () => {
        const state = {
            id: 0,
            title: 'Test Teal',
            color: '#90C3D4',
            timestamp: 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)',
            rating: undefined
        }
        const action = {
            type: C.RATE_COLOR,
            id: 0,
            rating: 3
        }
        const results = color(state, action)
        expect(results)
            .toEqual({
                id: 0,
                title: 'Test Teal',
                color: '#90C3D4',
                timestamp: 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)',
                rating: 3
            })
    })
})
```

Để test được reducer, chúng ta cần một state và một sample action. Chúng ta sẽ so sách kết quả trả về có thỏa mãn test case hay không bằng function `.toEqual`. 

Khi chúng ta chạy đoạn test trên, chắc chắn hệ thống sẽ báo đỏ, vì chúng ta chưa có reducer rõ ràng. Giờ chúng ta sẽ tạo reducer trong `/src/store/reducers.js`. 

```javascript
import C from '../constants'

export const color = (state={}, action=) => {
    return state
}
```

Chúng ta sẽ tiếp tục chạy test và tìm các lỗi được báo. 

```code
$ jest

FAIL __tests__/store/reducers/color.test.js

● color Reducer › ADD_COLOR success
    expect(received).toEqual(expected)
    Expected value to equal:
{"color": "#90C3D4", "id": 0, "rating": 0, "timestamp":
"Mon Mar 13 2017 12:29:12 GMT-0700 (PDT)", "title": "Test Teal"}
Received:
{}
Difference:
- Expected
+ Received
@@ -1,7 +1,1 @@
-Object {
- "color": "#90C3D4",
- "id": 0,
- "rating": 0,
- "timestamp": "Mon Mar 13 2017 12:29:12 GMT-0700 (PDT)",
- "title": "Test Teal",
-}
+Object {}
at Object.<anonymous> (__tests__/store/reducers/color.test.js:19:9)
at process._tickCallback (internal/process/next_tick.js:103:7)
● color Reducer › RATE_COLOR success
expect(received).toEqual(expected)
Expected value to equal:
{"color": "#90C3D4", "id": 0, "rating": 3, "timestamp":
"Sat Mar 12 2016 16:12:09 GMT-0800 (PST)", "title": "Test Teal"}
Received:
{"color": "#90C3D4", "id": 0, "rating": undefined, "timestamp":
"Sat Mar 12 2016 16:12:09 GMT-0800 (PST)", "title": "Test Teal"}
Difference:
- Expected
+ Received
@@ -1,7 +1,7 @@
Object {
"color": "#90C3D4",
"id": 0,
- "rating": 3,
+ "rating": undefined,
"timestamp": "Sat Mar 12 2016 16:12:09 GMT-0800 (PST)",
"title": "Test Teal",
}
at Object.<anonymous> (__tests__/store/reducers/color.test.js:44:9)
at process._tickCallback (internal/process/next_tick.js:103:7)
color Reducer
✕ ADD_COLOR success (8ms)
✕ RATE_COLOR success (1ms)
Test Suites: 1 failed, 1 total
Tests: 2 failed, 2 total
Snapshots: 0 total
Time: 0.861s, estimated 1s
Ran all test suites.
```

Rõ ràng sẽ bị báo failed khi chạy test, giờ chúng ta sẽ cần viết code để test pass. 
```javasscript
import C from '../constants'
export const color = (state = {}, action = ) => {
    switch (action.type) {
        case C.ADD_COLOR:
            return {
                id: action.id,
                    title: action.title,
                    color: action.color,
                    timestamp: action.timestamp,
                    rating: 0
            }
            case C.RATE_COLOR:
                state.rating = action.rating
                return state
            default:
                return state
    }
}

```

Chúng ta lại tiếp tục chạy lại test và thu được kết quả như sau
```code
$ jest
PASS __tests__/store/reducers/color.test.js
color Reducer
✓ ADD_COLOR success (4ms)
✓ RATE_COLOR success
Test Suites: 1 passed, 1 total
Tests: 2 passed, 2 total
Snapshots: 0 total
Time: 0.513s, estimated 1s
Ran all test suites.
```

Như vậy test đã pass, tuy nhiên chúng ta cần để ý một chút ở reducer
```javascript
case 'RATE_COLOR':
    state.rating = action.rating
    return state
```

State ở trường hợp này sẽ bị thay đổi bởi action, điều này là không đúng khi state là một immutable object.  Để đảm bảo việc test một object là immutable thì chúng ta sẽ cần sử dụng thư việc `deep-freeze`. 

```code
npm install deep-freeze --save-dev
```

Chúng ta sẽ deep-freeze cả state lẫn action

```javascript
import C from '../../../src/constants'
import {
    color
} from '../../../src/store/reducers'
import deepFreeze from 'deep-freeze'
describe("color Reducer", () => {
    it("ADD_COLOR success", () => {
        const state = {}
        const action = {
            type: C.ADD_COLOR,
            id: 0,
            title: 'Test Teal',
            color: '#90C3D4',
            timestamp: new Date().toString()
        }
        deepFreeze(state)
        deepFreeze(action)
        expect(color(state, action))
            .toEqual({
                id: 0,
                title: 'Test Teal',
                color: '#90C3D4',
                timestamp: action.timestamp,
                rating: 0
            })
    })
    it("RATE_COLOR success", () => {
        const state = {
            id: 0,
            title: 'Test Teal',
            color: '#90C3D4',
            timestamp: 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)',
            rating: undefined
        }
        const action = {
            type: C.RATE_COLOR,
            id: 0,
            rating: 3
        }
        deepFreeze(state)
        deepFreeze(action)
        expect(color(state, action))
            .toEqual({
                id: 0,
                title: 'Test Teal',
                color: '#90C3D4',
                timestamp: 'Sat Mar 12 2016 16:12:09 GMT-0800 (PST)',
                rating: 3
            })
    })
})
```

Lúc này nếu chạy lại test chúng ta sẽ thu được lỗi như sau
```code
$ jest
FAIL __tests__/store/reducers/color.test.js
● color Reducer › RATE_COLOR success
TypeError: Cannot assign to read only property 'rating' of object '#<Object>'
at color (src/store/reducers.js:14:26)
at Object.<anonymous> (__tests__/store/reducers/color.test.js:43:36)
at process._tickCallback (internal/process/next_tick.js:103:7)
color Reducer
✓ ADD_COLOR success (3ms)
✕ RATE_COLOR success (3ms)
Test Suites: 1 failed, 1 total
Tests: 1 failed, 1 passed, 2 total
Snapshots: 0 total
Time: 0.513s, estimated 1s
Ran all test suites.
```

Giờ chúng ta phải viết lại code cho reducer để thỏa mãn test case như sau
```javascript
case 'RATE_COLOR':
    return {
        ...state,
        rating: action.rating
    }
```
 Như vậy test case sẽ được pass
 ```code
$ jest
PASS __tests__/store/reducers/color.test.js
color Reducer
✓ ADD_COLOR success (3ms)
✓ RATE_COLOR success
Test Suites: 1 passed, 1 total
Tests: 2 passed, 2 total
Snapshots: 0 total
Time: 0.782s, estimated 1s
Ran all test suites.
 ```
 
 Qua một ví dụ trên đây, chúng ta sẽ phần nào hiểu được về các bước viết test (đặc biết là reducer), một điều nên nhớ là luôn phải viết test trước khi viết code thì sẽ đảm bảo code hoạt động được chính xác nhất.
 
 #### Cảm ơn các bạn đã đọc bài viết. Happy coding!