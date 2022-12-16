![image.png](https://images.viblo.asia/67aab803-aa04-4aa8-9722-3797452d1ed9.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

**Callback :** Về JavaScript thì **callback** là một hàm được truyền dưới dạng tham số cho một hàm khác. Hàm thực thi ngay khi kết quả của hàm gọi sẵn sàng. Nói cách đơn giản, nó xử lý các yêu cầu không đồng bộ của JavaScript.

**Ví dụ** tốt nhất để chứng minh điều này là sử dụng một hàm **setTimeout ()** nhận một hàm **callback** và trì hoãn việc thực thi **code**. Ngay sau khi hết thời gian đặt cho hàm, hàm **callback** sẽ thực thi.

```js
var callback = () => {
  console.log("Hello! GeeksforGeeks");
};

setTimeout(callback, 2000);
```

**Đầu ra:**

`Hello! GeeksforGeeks`

**Promise:** Nó rất giống với các lệnh **callback** đang hoạt động. Tuy nhiên, lợi thế của việc sử dụng **Promises** là cải thiện khả năng đọc **code** vì nó giúp chúng ta thoát khỏi **callback hell.**  
**Promise có bốn state:**

*   **Pending:** Promise vẫn chưa hoàn thành. Không thành công cũng chưa thất bại.
*   **Fulfilled:** Promise kết thúc thành công.
*   **Reject:** Promise kết thúc bằng một lỗi.
*   **Settled:** Promise có lỗi hoặc đã thành công.

**Chuyển một lệnh callback hiện có thành Promise:**

```js
var callback = function (err, success) {
  if (err) {
    console.log("Geek is very sad!");
  } else {
    console.log("Geek is optimistic, " + "thus becomes successful");
  }
};

var caller = function (status, callback) {
  if (status === "Happy") callback(null, true);
  else {
    callback(new Error(), false);
  }
};

caller("Happy", callback);
caller("Sad", callback);
```

**Đầu ra:**

```
Geek is optimistic, thus becomes successful
Geek is very sad!
```

**Các bước thực hiện chuyển đổi code ở trên thành Promise:**

*   Tạo một hàm có tên **error** và chèn khối **code xử lý khi gặp lỗi** ở trên của hàm callback vào đó.
*   Tạo một function có tên là **success** và chèn khối **code xử lý khi thành công** ở trên vào đó.
*   Sau đó, sửa đổi code **caller** bằng cách trả về đối tượng **promise**.
*   Sử dụng các hàm **success** và **error** theo bất kỳ cách nào sau đây.
*   Xem đoạn code dưới đây để hiểu rõ hơn.

```js
var error = function () {
  console.log("Geek is very sad!");
};

var success = function () {
  console.log("Geek is optimistic, " + "thus becomes successful");
};

var caller = function (status) {
  return new Promise(function (resolve, reject) {
    if (status === "Happy") {
      resolve();
    } else {
      reject();
    }
  });
};

caller("Happy").then(success).catch(error);
caller("Sad").then(success).catch(error);
```

**Đầu ra:**

```js
Geek is optimistic, thus becomes successful
Geek is very sad!
```

Áp dụng chúng vào Nodejs nào.

Cài đặt Nodejs và thiết lập một ứng dụng Node đơn giản bằng cách làm theo các bước được hiển thị [ở đây](https://www.geeksforgeeks.org/design-first-application-using-express/) .

**Ví dụ:** Ở đây, kịch bản là chúng ta có một **array** sinh viên có **id** và **tên** là các **value**. Chúng ta cần lấy **tên của sinh viên** có **id** đã cho. Chúng ta được cung cấp một lệnh **callback** hiện có cần được chuyển đổi thành một **promise**.

```js
const express = require("express");
const app = express();

var students = [
  {
    id: 101,
    name: "Geek A",
  },
  {
    id: 102,
    name: "Geek B",
  },
  {
    id: 103,
    name: "Geek C",
  },
  {
    id: 104,
    name: "Geek D",
  },
];

const callback = (err, student) => {
  if (err) {
    return `Student with given id ${err} not found`;
  } else {
    return "Here is the student: " + student.name;
  }
};

const findName = (studentId, callbackFunction) => {
  let student = students.find(function (studentValue) {
    return studentValue.id == studentId;
  });

  if (typeof student === "undefined") {
    return callbackFunction(studentId, false);
  } else {
    return callbackFunction(null, student);
  }
};

const getName = (req, res) => {
  res.send(findName(req.params.studentId, callback));
};

app.get("/getName/:studentId", getName);

app.listen(8000, "localhost", function () {
  console.log("Server Listening");
});
```

**Đầu ra:**  
![image.png](https://images.viblo.asia/81a45a1d-420f-4f5e-ba3b-da0722594a9c.png)

Bây giờ, chúng ta có thể chuyển đổi hàm **callback** thành các **promise**. Tại đây, chúng ta có thể thực hiện lại các bước trước đó, tức là logic **Error** trong hàm **failure** và logic **Thành công** trong hàm **success**. Xem đoạn code dưới đây để rõ hơn.

```js
const express = require("express");
const app = express();

var students = [
  {
    id: 101,
    name: "Geek A",
  },
  {
    id: 102,
    name: "Geek B",
  },
  {
    id: 103,
    name: "Geek C",
  },
  {
    id: 104,
    name: "Geek D",
  },
];

const success = (student) => {
  return "Here is the student: " + student.name;
};

const failure = (fail) => {
  return `Student with the given id ${fail} was not found`;
};

const findName = (studentId) => {
  return new Promise(function (resolve, reject) {
    let student = students.find(function (studentValue) {
      return studentValue.id == studentId;
    });
    if (student) {
      resolve(student);
    } else {
      reject(id);
    }
  });
};

const getName = async (req, res) => {
  let answer = await findName(req.params.studentId)
    .then(success)
    .catch(failure);

  res.send(answer);
};

app.get("/getName/:studentId", getName);

app.listen(8000, "localhost", function () {
  console.log("Server Listening");
});
```

**Đầu ra:**  
![image.png](https://images.viblo.asia/db0d0915-1aa8-4431-82dc-7875d163e76d.png)

Như mọi khi, mình hy vọng bạn thích bài viết này và biết thêm được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉

# Ref
* https://tuan200tokyo.blogspot.com/2022/10/blog17-lam-nao-e-chuyen-oi-mot-callback.html