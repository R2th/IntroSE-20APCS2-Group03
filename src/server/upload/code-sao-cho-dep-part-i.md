*Series này chứa những kinh nghiệm nhỏ cũng như thói quen khi viết code của mình.<br/>
Viết ra để lưu lại là chính, nhưng tất nhiên mình rất hy vọng có thể giúp ích cho một ai đó :> <br/>
Mình sẽ sử dụng JavaScript cho các ví dụ, nhưng mình nghĩ các bạn có thể áp dụng cho các ngôn ngữ khác cũng ok<br />
Start thôi!*

Bài đầu tiên của series nên mình có một số chia sẻ trước về quan điểm của bản thân về thứ tự ưu tiên trong việc viết code.<br/>
Ba vấn đề chính mình thường để ý đến là *performance*, *maintainable* và *coding speed*.<br/>
Thứ tự ưu tiên của bản thân mình là *maintainable* > *performance* > *coding speed*. 
Tất nhiên đây là sắp xếp về thứ tự ưu tiên trong trường hợp bình thường, và hoàn toàn không có nghĩa là chọn 1 trong 3 điều trên.<br />
Thứ tự vậy có nghĩa mình sẽ ưu tiên sao cho code clean và dễ hiểu, có thể hoàn thành code chậm hơn 5, 10 phút, có thể performance chậm hơn một chút, khai báo nhiều biến hơn một chút,... tất nhiên chỉ là một chút thôi, và thường cái một chút đó chúng ta cũng không nhận ra được, vì performance trong hầu hết trường hợp với mình là câu chuyện của phần cứng máy tính, chúng ta chỉ cần không vi phạm một số nguyên tắc lớn về performance là ổn.<br/>
Và thứ tự trên cũng có thể thay đổi theo từng giai đoạn trong vòng đời phát triển sản phẩm, ví dụ như khi bị dí deadline, coding speed lúc đó sẽ được ưu tiên hơn cả, tất nhiên chúng ta vẫn phải đảm bảo performance và maintainable chấp nhận được.<br/>
Chia sẻ trước như vậy để các bạn hiểu rằng hầu hết những kinh nghiệm và thói quen của mình trong series này là về maintainable, và mình nghĩ đó là điều quan trọng nhất khi bạn code Front-end.<br/>
Bắt đầu thôi, ở bài đầu tiên này, mình sẽ chia sẻ 4 thói quen khi viết code của mình 😎

***1. Đừng dùng else***<br/>
Mình nhận ra rằng gần như tất cả các trường hợp chúng ra đều không cần thiết sử dụng đến câu lệnh else, và trong code mình hầu như không bao giờ sử dụng else. <br/>
Lúc mình dùng else, nghĩa là lúc đó mình đang lười suy nghĩ để viết code sao cho đẹp 😅<br/>
Ví dụ ở đây mình có 1 hàm để format lại dữ liệu, với 2 tham số đầu vào là giá trị và format:
```js
const formatData = (value, format) => {
  if (format === "number") {
    return Number(value)
  } else if (format === "datetime") {
    return new Date(value)
  } else if (format === "boolean") {
    return !!value
  } else {
    return null
  }
}

formatData("111", "number") // 111
```
Các bạn có thấy đau mắt khủng khiếp khi nhìn chỗ code này như mình không? Để mình fix lại nó nhé.
```js
const formatData = (value, format) => {
  if (format === "number") return Number(value)
  if (format === "datetime") return new Date(value)
  if (format === "boolean") return !!value
  return null
}

formatData("111", "number") // 111
```
Much better!!!<br/>
Nói thật là mình thích viết code như này hơn cả dùng switch case, tất nhiên trong trường hợp không có quá nhiều case.

***2. Validate dữ liệu thế nào cho hợp lý?*** <br/>
Tưởng tượng bạn có 1 form data ở phía front-end và cấn validate trước khi gửi về server, chúng ta sẽ xử lý thế nào?<br/>
Mình có thói quen sử dụng try-catch trong những tình huống thế này, nó giúp code của bạn rất dễ hiểu.<br/>
Một ví dụ đơn giản với 1 form có 2 trường là name và age:
```js
const send = (data) => {
  try {
    if (!data) throw new Error("Invalid data")
    if (!data.name || !data.name.trim()) throw new Error("Name is empty")
    if (!data.age || data.age < 18) throw new Error("Age is invalid")
    
    // some logic to send data to server
  } catch(err) {
    // do something with err.message
    // alert error for example
  }
}
```
Các bạn thấy ổn không? Một số bạn sẽ muốn chúng ta bắt được tất cả các lỗi của các field trong data, vậy mình sẽ thêm 1 chút logic như sau:
```js
const send = (data) => {
  try {
    const errors = []
    if (!data) throw new Error("Invalid data")
    if (!data.name || !data.name.trim()) {
      errors.push("Name is empty")
    }
    if (!data.age || data.age < 18) {
      errors.push("Age is invalid")
    }

    if (!!errors.length) throw new Error(errors.join(", "))
    
    // some logic to send data to server
  } catch(err) {
    // do something with err.message
    // alert error for example
  }
}
```
Ok hơn rồi ha.<br />
Trên thực tế mình ít khi tự validate form đối với những form có nhiều field phức tạp. Lúc đó mình khuyên các bạn nên sử dụng 1 thư viện để giúp bạn validate form cũng như xử lý một số điều kiện khác phức tạp hơn.<br/>
Với bạn nào code React, mình recommend *formik* và *yup* nhé, cặp đôi hoàn hảo đó :>

***3. Hãy giữ cho function đơn giản***<br/>
Nguyên tắc này các bạn có thể tìm được ở bất kỳ một cuốn sách hoặc một bài viết nào về clean code, nó là một nguyên tắc quan trọng.<br />
Hãy cố gắng giữ cho 1 hàm chỉ làm một nhiệm vụ duy nhất, và nhiệm vụ đó sẽ được thể hiện rõ ràng ở tên hàm, không hơn không kém.<br />
Ví dụ như chỗ code ở phần 2 kia, trên thực tế mình sẽ tạo 1 hàm làm nhiệm vụ validate dữ liệu, còn hàm *send* đơn giản như cái tên của nó, nó chỉ gửi dữ liệu lên server mà thôi.
```js
const validateData = (data) => {
  try {
    const errors = []
    if (!data) throw new Error("Invalid data")
    if (!data.name || !data.name.trim()) {
      errors.push("Name is empty")
    }
    if (!data.age || data.age < 18) {
      errors.push("Age is invalid")
    }

    if (!!errors.length) throw new Error(errors.join(", "))
    return true
  } catch(err) {
    // do something with err.message
    // alert error for example
    return false
  }
}

const send = (data) => {
  const passed = validateData(data)
  if (!passed) return

  // some logic to send data to server
}
```
Các bạn có thể thấy mình cho hàm *validate* trả về 1 giá trị boolean để thể hiện data trong form có hợp lệ không. Hàm *send* sẽ lấy giá trị này để kiểm tra xem có nên gửi dữ liệu về server hay không.<br />
Nhớ nhé, mỗi hàm một việc đơn giản, và được thể hiện qua cái tên của nó. Điều này nói thì dễ, nhưng thực hiện đôi khi rất khó 😅😅

***4. Đừng cố viết code ngắn***<br/>
Mình không rõ tại sao có nhiều bạn cố viết code thật ngắn, tốn ít dòng nhất có thể. <br/>
Ở công ty mình, mấy anh em code React thường đùa nhau rằng component nào dài hơn 300 dòng thì là rác 😂😂😂<br/>
Thực sự mình nghĩ rác hay không là do cách các dòng code được viết và cái luồng chạy của nó, không có liên quan đến số dòng code trong 1 file hay 1 component.<br/>
Mình hoàn toàn ok với 1 component 500-700 dòng mà trong đó code dễ hiểu và logic flow rõ ràng. <br/>
Nhưng cũng phải nói rằng, việc gói gém quá nhiều logic trong 1 file sẽ làm bạn rất khó để giữ nó dễ hiểu, và vừa không dễ hiểu vừa dài thì cũng có thể gọi là rác 🤣🤣<br/>
Ngoài ra, mình thường có thói quen cách dòng, mỗi một block code thường là 1 vấn đề nhỏ mà hàm cần xử lý, như ví dụ ở phần 3, sau khi gọi hàm validateData, mình có cách 1 dòng rồi mới viết tiếp logic send.<br />
Điều này nghe có vẻ nhỏ nhưng nếu nó là một thói quen, code của bạn trong sẽ khá đẹp và gọn gàng.<br/>
*Đừng quên code clean trước hết phải dễ nhìn dễ đọc*.

Trên đây là 4 thói quen mình hay sử dụng khi viết code, hy vọng có thể giúp ích ít nhiều cho các bạn, đặc biệt là những bạn mới đi làm hoặc đang thực tập, vì thực sự mình cũng chưa đi làm quá lâu đâu :><br/>
Nếu bạn cảm thấy bài viết này có ích, hãy để lại 1 comment, mình rất cảm ơn.<br />
Hẹn gặp lại các bạn ở kỳ sau.