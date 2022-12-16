# Mở đầu

Khi mới bắt đầu code, có thể chúng ta rất ngại handle những exception mà ngay cả 1 hàm đơn giản nhất cũng có thể tung ra. Tuy nhiên, thực tế khi xây dựng hệ thống, ta phải đặc biệt chú ý đến những exception, không thì ứng dụng của ta có thể thăng bất cứ lúc nào :v

Vậy thì làm sao để handle chúng 1 cách thật *clean*. Có khá nhiều hướng tiếp cận, tuy nhiên ta hãy cùng thử trải nghiệm theo hướng *Railway Oriented* xem nó có gì hay.

Bài giới thiệu gốc được viết sử dụng ngôn ngữ F#, nhưng ta hoàn toàn có thể áp dụng vào các ngôn ngữ khác như Javascript, Ruby, ...

*Railway Oriented Programming* phù hợp với style lập trình hàm (Functional Programming - FP)

Tên gọi là *Railway* cũng bởi trông nó khá giống với đường ray tàu hỏa.

# Vấn đề

Hãy bắt đầu với 1 usecase rất cơ bản

> Người dùng muốn cập nhật profile của họ.

Sau khi người dùng submit thông tin ở web, ta hay cùng phân tích những xử lý ở phía server

![](https://images.viblo.asia/e37fd6b1-91fc-4340-8938-154196463a70.jpg)

Tình huống đẹp nhất xảy ra là từ bước 1-5, ứng dụng ta sẽ chạy trơn tru, không có bất cứ 1 lỗi nào. 

Nhưng mà ...

>  Đời không như mơ, tình không như thơ.

Từ bước 1-4 đều có thể có lỗi xảy ra, và tất nhiên người dùng sẽ không hề muốn nhìn thấy cảnh này

![](https://images.viblo.asia/e05c2f5c-ee9e-4f78-958d-bd54ff7b291c.jpg)

Vậy thì những gì ta cần làm là xử lý những lỗi này, không thì người dùng một đi không trở lại luôn.

![](https://images.viblo.asia/d7ea1ee4-2326-408a-be91-e361803f7f0b.jpeg)

Và ta sẽ viết code cho nó:

```javascript
function updateUser(user) {
  const request = receiveRequest()
  if (!isValidRequest(request)) {
    return "Request is forbidden"
  }
  if (!isValidUser(request)) {
    return "User information is invalid"
  }
  try {
    saveToDatabase(request)
  } catch(error) {
    return "DB error"
  }
  try {
    sendEmail(request)
  } catch(error) {
    return "Mailer error"
  }
  return "OK"
}
```

Code trên được viết theo style Imperative, vì thế nên ta có thể return bất cứ lúc nào ta muốn. Điều đó làm hàm của ta có thể return theo rất nhiều cách (nhiều kiểu response khác nhau).

![](https://images.viblo.asia/13ab6aca-df34-41a5-89fe-85e6b8de4523.png)

Ta sẽ design lại flow theo style FP.

![](https://images.viblo.asia/e20339fb-142c-46a8-8d29-965f6ebcf63f.png)

Hàm của ta giờ đây:

* Chỉ có 2 kiểu trả về: `Success` hoặc `Failure`.

  * Success:
    ```js
    // @flow 
    type Success = { data: object }
    ```

  * Failure:

    ```js
    // @flow 
    type Failure = { error: string }
    ```

* Use case được xây dựng từ 1 series các hàm con tương ứng với mỗi step.


Ta sẽ áp dụng *Railway Oriented Programming* để giải quyết vấn đề này.

# Railway Oriented Programming

#### Monad

Trong lập trình hàm, có một cách để handle lỗi là dùng *monad*.

Monad thường đi kèm với Applicative và Functor nữa, bọn này khá là xoắn não nên mình sẽ không đề cập ở đây. 

Ta sẽ chỉ quan tâm tới:  *Either* monad. 

```js
// @flow
type Either<A, B> = A | B
type FunctionReturnMonad<A, B> = () => Either<A, B>
```

Hiểu một cách nôm na sẽ là: hàm của ta sẽ luôn trả về A hoặc B, nhưng không bao giờ trả về cả 2.

#### Switch

Hãy bắt đầu với 1 function có thể gây ra lỗi:

```js
function validateNameNotBlank(user) {
  if (user.name === '') {
    return { error: 'Name is blank' }
  }
  return { data: user }
}
```

![](https://images.viblo.asia/4214182b-82ca-4ff1-9f86-7161b063632d.jpg)

Đây chính là 1 switch, nó rẽ nhánh luồng xử lý của ta thành `Success` và `Failure`.

#### Kết nối nhiều switch

![](https://images.viblo.asia/b6cf8618-c07c-4502-86a3-90b1b6ab3530.png)

Đây là *đường ray* hoàn chỉnh mà ta cần xây dựng từ những switch riêng lẻ trên.

Có thể nhận thấy một vài điểm quan trọng ở railway này:

* Khi một step bị lỗi, nó sẽ không return function ngay lập tức, mà sẽ tiếp tục chạy vào các function tiếp theo cho tới khi kết thúc flow. 

  Tuy nhiên kết quả cuối cùng nhận được chỉ là lỗi đầu tiên phát sinh.

* Những hàm của từng step đều phải xử lý cả trường hợp có dữ liệu và trường hợp hàm trước trả về lỗi

Bây giờ vấn đề là làm thế nào để nối những switch lại với nhau?

Câu trả lời là `compose`. Tuy nhiên ta không thể compose theo cách thông thường được.

Ví dụ như:

Nếu đầu vào và đầu ra của ta cùng interface

```js
const mul2 = num => num * 2
const add1 = num => num + 1
mul2(add1(1)) // 4
```

Trở lại hàm `validateBlank` ở trên, nếu ta có nhiều hàm `validate` khác tương tự

![](https://images.viblo.asia/02d95ea0-c572-481b-bb2b-d2801667e9a0.png)

Ta có thể thấy đầu vào chỉ có 1, mà lại có những 2 đầu ra. 

Để có thể compose, ta sẽ phải biến chúng thành những function có thể handle cả trường hợp `Success` lẫn `Failure`.

Có thể sử dụng HOC

```js
const transformToTwoTrackInput = func => ({ data, error }) => {
  return data ? func(data) : { error }
}

const twoTrackValidateNameNotBlank = transformToTwoTrackInput(validateNameNotBlank)
const twoTrackValidateName50 = transformToTwoTrackInput(validateName50)
const twoTrackValidateEmailNotBlank = transformToTwoTrackInput(validateEmailNotBlank)

const user = { email: '', name: '' }
twoTrackValidateEmailNotBlank(twoTrackValidateName50(twoTrackValidateNameNotBlank({ data: user }))) // { error: 'name is blank' }
```

Như vậy là ta đã kết nối được những mảnh ghép trên với nhau.

![](https://images.viblo.asia/59045ab0-2465-4163-8c25-1b7529749196.png)

#### Một vài kiểu function thường gặp

##### Single track function

Nếu một function không gây ra lỗi (chỉ có 1 đầu vào và 1 đầu ra) thì nó sẽ không thể nào compose được vào railway của chúng ta.

Khi đó ta phải wrap nó bởi 2-track function, giống với HOC ở trên.

![](https://images.viblo.asia/754c4226-95b0-4b98-81dc-e64ed7842ee9.jpg)

```js
const trimEmail(user) {
  return {
    ...user,
    email: user.email.trim()
  }
}

const transformSingleTrackToTwoTrackInput = func => ({ data, error }) => {
  return data ? func(data) : { error }
}

const user = { email: '  sample@email.com' }
transformSingleTrackToTwoTrackInput(trimEmail)({ data: user })
```

##### Dead-end function

Dead-end function là những hàm void, không có giá trị trả về

![](https://images.viblo.asia/55f5aa49-c5c8-498f-a175-edd967b3d5c2.jpg)

Màu tím chính là nơi ta sẽ đặt *dead-end function* vào

```js
const transformDeadEndFunction = func => ({ data, error }) => {
  if (data) {
    func()
    return { data }
  } else {
    return { error }
  }
}
```

##### Function throw Exception

Ta có thể đặt try-catch để trả về Failure

```js
const transformExceptionFunction = func => ({ data, error }) => {
  if (data) {
    try {
      func()
    } catch(error) {
      return { error: error.message || error }
    }
    return { data }
  } else {
    return { error }
  }
}
```

*Note*: Convert tất cả Exception thành `Failure`

#### Kết quả

Ta không thể trả về dữ liệu kiểu two-track cho client được, vì vậy ta sẽ có thêm 1 bước cuối để trả về thông tin cho client.

![](https://images.viblo.asia/08650333-ae3a-4fa8-b960-09c7b11fbd79.jpg)

```js
function returnMessage({ data, error }) {
  return data ? JSON.stringify(data) : error.toString()
}
```

#  ROP trong một số ngôn ngữ khác

#### Ruby (framework Rails)

Nếu các bạn sử dụng Rails, hãy thử trải nghiệm qua gem `trailblazer`. Logic của ứng dụng giờ sẽ tập trung chủ yếu trong các `Operation` thay vì controller như xưa nữa, mà những operation này được viết theo style ROP.

![](https://images.viblo.asia/f425b9c2-0d14-460b-8540-f289e8859972.gif)

```ruby
class Song::Create < Trailblazer::Operation
  step    Model(Song, :new) # init model
  step    :assign_current_user!
  step    Contract::Build(constant: SongForm) # create form object
  step    Contract::Validate() # validate form object
  failure :log_error!
  step    Contract::Persist() # save song to db

  def log_error!(options)
    logger.debug "Errors occurred while creating song."
  end

  def assign_current_user!(options)
    options["model"].created_by = options["current_user"]
  end
end
```

Flow của Operation không hoàn toàn giống với ROP như ta đã thấy ở trên, một khi bạn đã vào nhánh Failure, nó sẽ trigger toàn bộ những step handle error phía sau.

Không liên quan lắm nhưng trong `trailblazer` ecosystem có khá nhiều gem thú vị như: `reform` (form object pattern), và `cells` (view components).

#### Javascript

Nếu ta để ý, `Promise` của Javascript cũng khá giống với ROP.

```js
const user = { username: 'sample', email: 'sample' }

const validatePresenceOfUsername = data => {
  if (!!data.username) {
    return user
  }
  throw 'Username is blank'
}

const validateFormatOfEmail = data => {
  if (data.email && data.email.match(/@/g)) {
    return user
  }
  throw 'Email is in invalid format'
}

const logError = error => console.error(error)

Promise.resolve(user)
  .then(validatePresenceOfUsername)
  .then(validateFormatOfEmail)
  .catch(logError) // => 'Email is in invalid format
```

# Tham khảo

https://fsharpforfunandprofit.com/rop/

https://fsharpforfunandprofit.com/posts/function-composition/

https://dorp.io/posts/railway-oriented-programming/

https://github.com/trailblazer/trailblazer

http://trailblazer.to/gems/operation/2.0/api.html