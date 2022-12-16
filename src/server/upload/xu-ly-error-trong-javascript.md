Khi lập trình, chúng ta thường sợ error. Nhưng bằng cách làm việc với nó, ta học được tại sao không nên làm cái này (và cái kia), cũng như làm thế nào để code ngon hơn.

Bài viết này chia thành 3 phần, đầu tiên là tổng quan về error. Sau đó chúng ta sẽ tập trung vào backend (Node.js + Express.js) và cuối cùng là cách xử lý error trong React.js.

### I. JavaScript Errors và generic handling
```throw new Error('something went wrong') ``` - sẽ tạo một thể hiện của Error trong JavaScript và ngừng thực thi đoạn code, cho đến khi bạn làm gì đó với Error. Khi mới lập trình JavaScript, thường thì bạn sẽ không làm như vậy, mà chỉ bắt gặp nó khi xài thư viện (hoặc khi thực thi code), chẳng hạn `ReferenceError: fs is not defined`.


#### Error Object
Object Error có 2 thuộc tính để ta có thể sử dụng. Một là message, tức là đối số bạn truyền vào Error constructor, ví dụ ```new Error('This is the message')```. Bạn có thể truy cập message thông qua thuộc tính ```messsage```:

```JavaScript
const myError = new Error(‘please improve your code’)
console.log(myError.message) // please improve your code
```

Thuộc tính thứ hai cực kỳ quan trọng chính là stack trace của Error. Bạn có thể truy xuất nó thông qua thuộc tính `stack`. Stack sẽ cho bạn lịch sử những file chịu trách nhiệm gây ra lỗi đó. Stack cũng chứa message và theo sau chính là những điểm xảy ra lỗi và file tương ứng.

```JavaScript
Error: please improve your code
 at Object.<anonymous> (/Users/gisderdube/Documents/_projects/hacking.nosync/error-handling/src/general.js:1:79)
 at Module._compile (internal/modules/cjs/loader.js:689:30)
 at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
 at Module.load (internal/modules/cjs/loader.js:599:32)
 at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
 at Function.Module._load (internal/modules/cjs/loader.js:530:3)
 at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
 at startup (internal/bootstrap/node.js:266:19)
 at bootstrapNodeJSCore (internal/bootstrap/node.js:596:3)
 ```
 
 
 #### Throwing và Handling Errors
 Vì thể hiện của Error không có bất kỳ hiệu ứng, chẳng hạn new Error('...') không làm bất cứ thứ gì. Khi Error `throw` n, nó sẽ trở nên thú vị hơn. Đoạn mã sẽ ngừng thực thi cho đến khi bạn xử lý nó ở đâu đó. Hãy nhơ là dù bạn `throw` lỗi thủ công hay là do thư viện hoặc runtime. Hãy xem cách chúng ta có thể làm việc với Error trong những kịch bản khác nhau như thế nào.
 
 `try ... catch`
 Đây là cách đơn giản nhất, nhưng thường bị bỏ quên khi xử lý lỗi - may là ngày nay nó được sử dụng thường xuyên hơn nhờ async / await. Nó cũng được dùng để bắt lỗi đồng bộ. Ví dụ:
 
 ```JavaScript
 const a = 5

try {
    console.log(b) // b is not defined, so throws an error
} catch (err) {
    console.error(err) // will log the error with the error stack
}

console.log(a) // still gets executed
```

Nếu chúng ta không đặt `console.log(b)` trong `try ... catch`, đoạn code sẽ ngừng thực thi.


**... finally**
Đôi lúc ta cần phải thực thi code dù bất cứ điều kiện nào xảy ra, lúc này bạn có thể dùng block thứ 3 là `finally`, chỉ cần thêm một dòng sau `try ... catch`.

```JavaScript
const a = 5

try {
    console.log(b) // b is not defined, so throws an error
} catch (err) {
    console.error(err) // will log the error with the error stack
} finally {
    console.log(a) // will always get executed
}
```




#### Xử lý bất đồng bộ — Callbacks

Bất đồng bộ là chủ đề mà bạn luôn phải lưu ý khi làm việc với JavaScript. Khi bạn có một hàm bất đồng bộ, và một Error xảy ra trong hàm đó, đoạn mã sẽ tiếp tục thực thi, bởi vậy không có lỗi nào được bắn ra ngay. Khi xử lý hàm bất đồng bộ với callback, bạn thường nhận 2 đối số trong callback, thường sẽ như này:

```JavaScript
myAsyncFunc(someInput, (err, result) => {
    if(err) return console.error(err) // we will see later what to do with the error object.
    console.log(result)
})
```

Nếu có Error, tham số `err` sẽ tương đương với lỗi đó. Nếu không thì tham số này sẽ là `undefined` hoặc `null`. 




#### Bất đồng bộ - Promises
Một cách tốt hơn để xử lý bất đồng bộ là dùng promises. Bên cạnh việc code dễ độc hơn, chúng ta cũng cải thiện việc xử lý lỗi. Không cần phải quan tâm quá nhiefu đến việc bắt chính xác Error, miễn là có block `catch` là được. Khi *chain* promise, mỗi một block `catch` sẽ bắt tất cả lỗi từ khi thực thi promise hoặc từ block `catch` cuối cùng. Lưu ý rằng promise mà không có `catch` sẽ không thể `terminate` code, nhưng bạn sẽ nhận một message khó đọc hơn như sau:

```JavaScript
(node:7741) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: something went wrong
(node:7741) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

Bởi vậy hãy luôn thêm một block `catch` cho promise. Như sau:

```JavaScript
Promise.resolve(1)
    .then(res => {
        console.log(res) // 1

        throw new Error('something went wrong')

        return Promise.resolve(2)
    })
    .then(res => {
        console.log(res) // will not get executed
    })
    .catch(err => {
        console.error(err) // we will see what to do with it later
        return Promise.resolve(3)
    })
    .then(res => {
        console.log(res) // 3
    })
    .catch(err => {
        // in case in the previous block occurs another error
        console.error(err)
    })
```


#### try … catch — again
Với việc xuất hiện async / await trong JavaScript, ta trở lại với cách bắt lỗi cổ điển, với `try ... catch ... finally`, khá nhẹ nhàng:

```JavaScript
;(async function() {
    try {
        await someFuncThatThrowsAnError()
    } catch (err) {
        console.error(err) // we will make sense of that later
    }

    console.log('Easy!') // will get executed
})()
```


### II. Xử lý lỗi trong Server
Giờ chúng ta đã có những công cụ để làm việc với Error, hãy xem trong thực tế thì ta sẽ thực hiện như thế nào. Xử lý lỗi ở backend là một phần trong ứng dụng của bạn. Có nhiều cách tiếp cận với vấn đề này, tôi sẽ chỉ cho bạn cách tiếp cận với việc custom Error constructor và Error codes, mà ta có thể dể dàng truyền đến frontend hoặc API.

Ta sẽ dùng Express.js framework làm routing. Thử nghĩ cấu trúc mà ta muốn bắt lỗi một cách hiệu quả nhất. Ta muốn:

1. Xử lý lỗi chung, chẳng hạn: `Something went wrong, please try again or contact us.`. Cách làm này không phải quá hay, nhưng ít nhất là nó thông báo cho user có gì đó không đúng, thay vì màn hình loading vô hạn.
2. Xử lý lỗi cụ thể để đưa cho user thông tin chi tiết về lỗi và cách xử lý, chẳng hạn có một số thông tin đang thiếu, nội dung nhập vào đã có trong cơ sở dữ liệu, ...


#### Building custom Error constructor
Chúng ta sẽ sử Error constructor và mở rộng nó. Kế thừa là phương án khá mạo hiểm trong JavaScript, nhưng lần này thì nó rất hữu ích. Tại sao chúng ta cần nó? Bởi vì ta vẫn muốn stack trace để debug hiệu quả hơn. Chúng ta chỉ cần thêm `code`, sau này sẽ truy xuất thông qua `err.code`, cũng như status để truyền đến frontend.

```JavaScript
class CustomError extends Error {
    constructor(code = 'GENERIC', status = 500, ...params) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }

        this.code = code
        this.status = status
    }
}

module.exports = CustomError
```


#### Xử lý routing
Như đã nói, chúng ta muốn một `single point of truth` để xử lý lỗi, nghĩa là mọi route đều có cách xử lý lỗi như nhau. Mặc định thì express không hỗ trợ vì route đã được đóng gói.

Để giải quyết vấn đề này, ta có thể cài đặt một route handler và định nghĩa logic như function thông thường. Bằng cách đó, khi function routing throw error, nó sẽ được trả lại route handler, rồi truyền đến frontend. Mỗi khi có lỗi xảy ra ở backend, chúng ta muốn truyền response đến frontend, giả sử là JSON API theo format sau:

```JavaScript
{
    error: 'SOME_ERROR_CODE',
    description: 'Something bad happened. Please try again or     contact support.'
}
```

Route handler trông như này:

```JavaScript
const express = require('express')
const router = express.Router()
const CustomError = require('../CustomError')

router.use(async (req, res) => {
    try {
        const route = require(`.${req.path}`)[req.method]

        try {
            const result = route(req) // We pass the request to the route function
            res.send(result) // We just send to the client what we get returned from the route function
        } catch (err) {
            /*
            This will be entered, if an error occurs inside the route function.
            */
            if (err instanceof CustomError) {
                /* 
                In case the error has already been handled, we just transform the error 
                to our return object.
                */

                return res.status(err.status).send({
                    error: err.code,
                    description: err.message,
                })
            } else {
                console.error(err) // For debugging reasons

                // It would be an unhandled error, here we can just return our generic error object.
                return res.status(500).send({
                    error: 'GENERIC',
                    description: 'Something went wrong. Please try again or contact support.',
                })
            }
        }
    } catch (err) {
        /* 
        This will be entered, if the require fails, meaning there is either 
        no file with the name of the request path or no exported function 
        with the given request method.
        */
        res.status(404).send({
            error: 'NOT_FOUND',
            description: 'The resource you tried to access does not exist.',
        })
    }
})

module.exports = router
```

Hãy thử xem file routing sẽ trông như nào:

```JavaScript
const CustomError = require('../CustomError')

const GET = req => {
    // example for success
    return { name: 'Rio de Janeiro' }
}

const POST = req => {
    // example for unhandled error
    throw new Error('Some unexpected error, may also be thrown by a library or the runtime.')
}

const DELETE = req => {
    // example for handled error
    throw new CustomError('CITY_NOT_FOUND', 404, 'The city you are trying to delete could not be found.')
}

const PATCH = req => {
    // example for catching errors and using a CustomError
    try {
        // something bad happens here
        throw new Error('Some internal error')
    } catch (err) {
        console.error(err) // decide what you want to do here

        throw new CustomError(
            'CITY_NOT_EDITABLE',
            400,
            'The city you are trying to edit is not editable.'
        )
    }
}

module.exports = {
    GET,
    POST,
    DELETE,
    PATCH,
}
```

Ở đây tôi không xử lý gì với request, tôi chỉ thêm một số kịch bản lỗi. Về cơ bản là bạn sẽ có một lỗi chưa xử lý, frontend sẽ nhận được:

```JavaScript
{
    error: 'GENERIC',
    description: 'Something went wrong. Please try again or contact support.'
}
```

hoặc bạn sẽ throw một `CustomError`:

```JavaScript
throw new CustomError('MY_CODE', 400, 'Error description')
```

sẽ trở thành

```JavaScript
{
    error: 'MY_CODE',
    description: 'Error description'
}
```

### III. Hiển thị lỗi đến người dùng
Bước cuối cùng là quản lý lỗi ở phía frontend. Bạn muốn xử lý lỗi ở cả frontend cũng như backend. Đầu tiên hãy xem cách chúng ta hiển thị lỗi. Như đã nối thì tôi sẽ dùng React để minh họa.

#### Lưu Errors trong React state
Errors và message có thể thay đổi, bởi vậy bạn cần đặt chúng trong component state. Mặc định thì error sẽ được reset để lần đầu tiên user view sẽ không thấy lỗi.

Tiếp theo, ta cần phân biệt ra những kiểu Error khác nhau. Có 3 loại:

1. Global Error, ví dụ generic error ở backend hoặc user không đăng nhập ...
2. Lỗi cụ thể từ backend, chẳng hạn password không đúng ...
3. Lỗi cụ thể từ frontend, chẳng hạn lỗi validation chưa nhập input

#### Global Errors
Thường thì tôi lưu những lỗi này ở component cha và render static UI.

![](https://images.viblo.asia/b3f77477-7538-4de6-bf9a-c7f7d30a587a.jpeg)


```JavaScript
import React, { Component } from 'react'

import GlobalError from './GlobalError'

class Application extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
        }

        this._resetError = this._resetError.bind(this)
        this._setError = this._setError.bind(this)
    }

    render() {
        return (
            <div className="container">
                <GlobalError error={this.state.error} resetError={this._resetError} />
                <h1>Handling Errors</h1>
            </div>
        )
    }

    _resetError() {
        this.setState({ error: '' })
    }

    _setError(newError) {
        this.setState({ error: newError })
    }
}

export default Application
```

Như bạn thấy, ta có error ở state. Chúng ta cũng có method để reset và thay đổi giá trị của error. Ta truyền giá trị và reset xuống component `GlobalError`, nó sẽ hiển thị và reset error khi người dùng click dấu x:

```JavaScript
import React, { Component } from 'react'

class GlobalError extends Component {
    render() {
        if (!this.props.error) return null

        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: 10,
                    backgroundColor: '#ffcccc',
                    boxShadow: '0 3px 25px -10px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {this.props.error}
                &nbsp;
                <i
                    className="material-icons"
                    style={{ cursor: 'pointer' }}
                    onClick={this.props.resetError}
                >
                    close
                </i>
            </div>
        )
    }
}

export default GlobalError
```

Ở dòng 5, ta không render vì không có error. Giờ bạn có thể sử dụng global error state bất cứ vị trí nào, chẳng hạn khi một request từ backend trả về với lỗi `error: 'GENERIC'`:

```JavaScript
import React, { Component } from 'react'
import axios from 'axios'

class GenericErrorReq extends Component {
    constructor(props) {
        super(props)

        this._callBackend = this._callBackend.bind(this)
    }

    render() {
        return (
            <div>
                <button onClick={this._callBackend}>Click me to call the backend</button>
            </div>
        )
    }

    _callBackend() {
        axios
            .post('/api/city')
            .then(result => {
                // do something with it, if the request is successful
            })
            .catch(err => {
                if (err.response.data.error === 'GENERIC') {
                    this.props.setError(err.response.data.description)
                }
            })
    }
}

export default GenericErrorReq
```

#### Xử lý lỗi cụ thể

![](https://images.viblo.asia/abe0ab6a-98f2-48ec-9ae5-c7b90279a65e.jpeg)


Tương tự global error, chúng ta có local error state trong component.

```JavaScript
import React, { Component } from 'react'
import axios from 'axios'

import InlineError from './InlineError'

class SpecificErrorRequest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
        }

        this._callBackend = this._callBackend.bind(this)
    }

    render() {
        return (
            <div>
                <button onClick={this._callBackend}>Delete your city</button>
                <InlineError error={this.state.error} />
            </div>
        )
    }

    _callBackend() {
        this.setState({
            error: '',
        })

        axios
            .delete('/api/city')
            .then(result => {
                // do something with it, if the request is successful
            })
            .catch(err => {
                if (err.response.data.error === 'GENERIC') {
                    this.props.setError(err.response.data.description)
                } else {
                    this.setState({
                        error: err.response.data.description,
                    })
                }
            })
    }
}

export default SpecificErrorRequest
```

#### Error internationalisation với error code
Có thể bạn thắc mắc những error code như `GENERIC` dùng để làm gì. Khi ứng dụng lớn dần, có thể bạn sẽ phải hỗ trợ đa ngôn ngữ, lúc đó trả về message dựa theo ngôn ngữ của user sẽ đơn giản hơn khi match với error code.


Hy vọng rằng bạn đã có thể một cách nhìn mới về việc xử lý lỗi. `console.error(err)` đã trở thành quá khứ. Nó khá tiện khi debug nhưng lại mất thời gian khi build cho production, tốt nhất là nên dùng một thư viện logging.

Tham khảo: https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6