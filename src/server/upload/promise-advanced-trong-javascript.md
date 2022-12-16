Hôm nay chúng ta sẽ lại nói về `Promise`. Trong javascript chúng ta đã làm việc với nó rất nhiều, chẳng hạn như khi thao tác với API hoặc khi muốn tạo một xử lý bất đồng bộ. `Promise` là một khái niệm không dễ hiểu mà cũng không khó hiểu. Nhưng tuy thuộc vào mức độ hiểu biết về nó sẽ cho chúng ta có nhiều lựa chọn hơn trong xử lý tình huống trong javascript. Hôm nay hãy cùng mình tìm hiểu về một cách để quản lý nhiều `Promise` hoặc xử lý bất đồng bộ. Trong bài viết này chúng ta sẽ kết hợp dùng `class` và `Promise`.
# 1. `class` và `Promise` trong javascript
## 1.1 Class
Khái niệm `class` được giới thiệu trong chuẩn ES6 của javascript dựa trên nền tảng kế thừa nguyên mẫu `prototypal inheritance` có sẵn trong javascript. Cơ bản thì `prototypal inheritance` đề cập đến khả năng truy cập các thuộc tính (properties) của một object A từ một object B khác (chúng ta sẽ xem xét vấn đề này trong một bài viết khác).

Thực tế  `class` là một function đặc biệt và khi gọi function ấy với từ khóa `new` chúng ta sẽ nhận được một thể hiện của một object mà `class` đó đã định nghĩa. Và khi khởi tạo với từ khóa `new` thì method `constructor` trong class đó sẽ được gọi (tại đây chúng ta có thể nhận tham số đầu vào và dùng trong class).

Trong bài viết hôm nay chúng ta sẽ sử dụng `class` để lưu các biến dùng để quản lý nhiều `Promise`.

## 1.2 Promise
Khái niệm `Promise` đã quá quen thuộc với chúng ta rồi. `Promise` đại diện cho một xử lý bất đồng bộ (xử lý cần chờ 1 khoảng thời gian lớn/nhỏ để hoàn thành).

Khi khởi tạo `Promise` nó sẽ cần đầu vào là một callback function. Function này sẽ nhận hai tham số đầu vào lần lượt là `resolve` và `reject`. Hai tham số này sẽ cho phép chúng ta quyết định `Promise` mà chúng ta khởi tạo sẽ thành công trả về dữ liệu (`resolve`) hay là sẽ thất bại và trả về mã lỗi (`reject`).

Một Promise khi được khởi chạy sẽ có thể có một trong 3 trạng thái là `pending`, `fulfilled`, `rejected`. `pending` là trạng thái chờ xử lý kết thúc, là trạng thái ban đầu của một `Promise`. `fulfilled` là trạng thái xử lý thành công, nó thể hiện rằng xử lý `Promise` đã thành công (dùng `resolve` để chuyển `Promise` về trạng thái này). Cuối cùng là `rejected` là trạng thái xử lý thất bại, nó thể hiện rằng xử lý `Promise` đã thất bại (dùng `reject` để chuyển `Promise` về trạng thái này).

Một `Promise` khi đã chạy sẽ chỉ có thể thành công hoặc thất bại (trừ trạng thái `pending` ban đầu). Sau xử lý thành công hay thất bại nó sẽ trả về dữ liệu tương ứng khi thành công và mã lỗi khi thất bại. Chúng ta có thể dùng `.then` để thao tác với dữ liệu thành công tương ứng và `.catch` để thao tác với dữ liệu mã lỗi trả về.

Một cách nữa giúp chúng ta có thể dễ dàng trả về một `Promise` thành công hoặc thất bại với dữ liệu thành công hoặc mã lỗi tương ứng. `Promise.prototype.resolve` và `Promise.prototype.reject` sẽ lần lượt trả về cho chúng ta một thể hiện `Promise` thành công hoặc một thể hiện `Promise` thất bại. Nó giúp chúng ta linh hoạt hơn trong cách xử lý tình huống, không phụ thuộc quá nhiều vào xử lý.

Tiếp đến hãy cùng thử kết hợp hai khái niệm bên trên để xử lý cho bài toán quản lý nhiều `Promise`.
# 2. Kết hợp `class` và `Promise`
Đầu tiên mục tiêu của chúng ta sẽ là quản lý nhiều xử lý bất đồng bộ cho phép handle lỗi cho nhiều xử lý này. Khi một xử lý xảy ra lỗi chúng ta sẽ tạm dừng những xử lý lỗi sau đó đồng thời chạy một xử lý trung gian khác (để gỡ lỗi) và cho đến khi xử lý này có kết quả thì sẽ bắt đầu chạy lại những xử lý lỗi đã tạm dừng trước đó và kết thúc một chuỗi xử lý.

Tình huống mà chúng ta có thể áp dụng thực tế chính là xử lý refresh session authen khi hết hạn. Tiếp đến hãy đến với đoạn code chúng ta sẽ thao tác:
```javascript
// Chúng ta sẽ khai báo một điều kiện để handle lỗi
// Dưới đây là mã lỗi mong muốn khi xử lý bị lỗi của chúng ra trả về
const DESIRED_ERROR_CODE = 1000

// Chúng ta sẽ fake 1 xử lý bất đồng bộ
// Trả về một thể hiện Promise và điều khiển 
// thành công hoặc thất bại bằng tham số "needReject"
// Khi lỗi chúng ta sẽ trả mã lỗi mà chúng ta mong muốn ở trên
function doSomething(config, needReject) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('run "doSomething async"')
      if (!needReject) resolve(1)
      if (needReject) reject({ code: DESIRED_ERROR_CODE, message: 'Some thing went wrong' })
    }, 2000)
  })
}

// Tiếp đến tạo một class "AnyService"
// dùng để quản lý và handle lỗi.
// "isProcessing" dùng để làm tín hiệu là có 1 xử lý lỗi
// trước đó và các xử lý lỗi phía sau sẽ cần tạm dừng và chạy lại sau
// "queue" dùng để chứa những xử lý lỗi đang được tạm dừng
// và sẽ chạy lại khi xử lý trung gian gỡ lỗi trả về kết quả
class AnyService {
  constructor() {
    this.isProcessing = false
    this.queue = []
  }
  
  // Chúng ta sẽ cần một method để chạy lại những xử lý lỗi
  // được tạm dừng trước đó
  // Nếu là "isError" === true thì các xử lý lỗi trong "queue"
  // sẽ đều phải trả về lỗi (trường hợp xử lý trung gian gỡ lỗi chạy nhưng không thành công)
  // Ngược lại sẽ trả về dữ liệu mong muốn và sẽ là đầu vào cho
  // những xử lý đã tạm dừng trước đó
  executeQueue(isError, data) {
    if (isError) this.queue.forEach(([_, reject]) => {
      reject()
    })
    
    if (!isError) this.queue.forEach(([resolve]) => {
      resolve(data)
    })
  }
  
  // Đây sẽ là phần xử lý handle chính
  // Đầu tiên chúng ta sẽ bắt lỗi theo mã lỗi mong muốn `DESIRED_ERROR_CODE`
  // Tiếp đến sẽ có 2 trường hợp có thể xảy ra
  // 1. Có một xử lý lỗi được handle trước đó (isProcessing === true)
  //   => Trường hợp này thì những xử lý lỗi tương tự sau đó
  //   chúng ta sẽ đưa vào "queue"
  //   và sẽ xử lý khi method "executeQueue" được gọi (khi gỡ lỗi kết thúc)
  // 2. Chưa có xử lý lỗi nào được handle trước đó
  //   => Trường hợp này chúng ta sẽ gọi một xử lý trung gian gỡ lỗi
  //   để lấy thêm thông tin để khi gọi lại xử lý bị lỗi đầu tiên
  //   và những xử lý lỗi đã tạm dừng trước đó một lần nữa
  //   thì sẽ không bị lỗi
  //   => Đồng thời ở tại đây chúng ta sẽ gọi "executeQueue" tương ứng
  //   với kết quả trả về từ xử lý trung gian (thành công hoặc thất bại)
  handleError(error, config) {
    if (error.code === DESIRED_ERROR_CODE) {
      if (this.isProcessing) {
        console.log('currently processing => Need push to queue => Run after', config)
        return new Promise((resolve, reject) => {
          this.queue.push([resolve, reject])
        })
          .then((data) => {
          	console.log('execute: ', { ...config, ...data })
            return this.executeSomething({ ...config, ...data })
          })
          .catch(error => Promise.reject(error))
      }

      this.isProcessing = true
      console.log('processing...', { a: 4 })
	  return this.executeSomething({ a: 4 })
        .then((data) => {
        	console.log('this.queue', this.queue)
            this.executeSomething({ ...config,  c: 5 })
        	this.executeQueue(false, { c: 5 })
        	this.isProcessing = false
        	Promise.resolve(data)
      	})
        .catch((error) => {
        	this.executeQueue(true)
        	this.isProcessing = false
          Promise.reject(error)
        })
    }
    
    return Promise.reject(error)
  }
  
  // Đây sẽ là method dùng để gọi khi đã khởi tạo class
  async executeSomething(config, needReject) {
    try {
      const data = await doSomething(config, needReject)
      return Promise.resolve(config, data)
    } catch (error) {
      return this.handleError(error, config)
    }
  }
}

// Tại đây chúng ta sẽ khởi tạo một thể hiển của "AnyService"
// và call 3 xử lý lỗi ngay sau đó
const service = new AnyService()
service.executeSomething({ a: 1 }, true)
service.executeSomething({ a: 2 }, true)
service.executeSomething({ a: 3 }, true)

// Kết quả nhận được sẽ như dưới
// run "doSomething async" with:  {a: 1}
// processing... {a: 4}
// run "doSomething async" with:  {a: 2}
// currently processing => Need push to queue => Run after {a: 2}
// run "doSomething async" with:  {a: 3}
// currently processing => Need push to queue => Run after {a: 3}
// run "doSomething async" with:  {a: 4}
// this.queue (2) [Array(2), Array(2)]
// execute:  {a: 2, c: 5}
// execute:  {a: 3, c: 5}
// run "doSomething async" with:  {a: 1, c: 5}
// run "doSomething async" with:  {a: 2, c: 5}
// run "doSomething async" with:  {a: 3, c: 5}
```
Với đoạn code trên thì chúng ta đã tạm có thể xử lý theo như đúng yêu cầu đề ra ban đầu. Sẽ còn những vấn đề phát sinh xung quanh nhưng sẽ không đáng kể lắm.

Trong đoạn code trên chúng ta sẽ cần chú ý một điểm cốt lõi để việc quản lý những `Promise` một cách mượt nhất. Đó chính là phần xử lý tạm dừng những xử lý lỗi khi mà trước đó đã có xử lý bị lỗi và gọi lại những xử lý lỗi đã tạm dừng. Ở đây chúng ta sẽ dùng phương pháp là ngoại trừ xử lý lỗi đầu tiên thì những xử lý lỗi ngay sau đó sẽ được tạo tương ứng với một thể hiện `Promise`. Những thể hiện `Promise` này sẽ làm công việc là lưu hai xử lý callback `resolve` và `reject` vào trong `queue` và sẽ luôn ở trạng thái `pending` trong suốt quá trình xử lý trung gian gỡ lỗi được gọi đến khi có kết quả (vì chúng ta không gọi `resolve` hay `reject` ngay sau đó mà sẽ chỉ chạy khi method `executeQueue` được gọi).

Rất thú vị đúng không nào, bằng một cách nào đó chúng ta đã tạm dừng được những xử lý và còn có thể thao tác với những xử lý đó ngay sau khi xử lý trung gian gỡ lỗi có kết quả.
# 3. Kết luận
Vậy là mình đã trình bày xong việc kết hợp `class` và `Promise` dùng để quản lý và thao tác với những xử lý bất đồng bộ hay `Promise`. Việc kết hợp này dựa khá nhiều vào khái niệm `Promise` cũng như trạng thái của `Promise`, một phần là là những biến của chúng ta được đồng bộ trong một thể hiện `class`. Có lẽ lần sau hãy thử kết hợp `Closures` và `Promise` xem sao.

Bài viết của mình đến đây là hết rồi. Mong rằng nó sẽ đem lại lợi ích cho các bạn và có những hướng xử lý thú vị với `Promise`. Hẹn gặp lại các bạn trong bài viết tiếp theo. Xin chào!