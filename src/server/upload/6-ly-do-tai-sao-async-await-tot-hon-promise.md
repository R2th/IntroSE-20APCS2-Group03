# Async/Await
Đối với những người chưa bao giờ nghe về chủ đề này trước đây, mình sẽ nói qua 1 chút về vấn đề này:
* Async / await là một cách mới để viết mã không đồng bộ. Các lựa chọn thay thế trước đây cho mã không đồng bộ là callback và Promise.
* Async / await thực sự chỉ là cú pháp được xây dựng dựa trên Promise. Nó không thể được sử dụng cùng với callbacks..
* Async / await làm cho mã không đồng bộ trông và hoạt động giống như mã đồng bộ hơn một chút.

# Syntax
Giả sử một hàm getJSON trả về một Promise và Promise đó sẽ giải quyết với một số đối tượng JSON. Ta chỉ muốn gọi nó và log ra JSON đó, sau đó trả về "done".

Đây là cách bạn sẽ thực hiện nó bằng Promise

```
const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })

makeRequest()
```

Còn đây là khi thực hiện bằng async/await
```
const makeRequest = async () => {
  console.log(await getJSON())
  return "done"
}

makeRequest()
```

Có một vài sự khác biệt ở đây

1. Xuất hiện từ khóa async trước nó. Từ khóa await chỉ có thể được sử dụng bên trong các function được xác định bằng async. Bất kỳ hàm async nào cũng trả về một Promise hoàn toàn và giá trị của Promise sẽ là bất cứ gì bạn trả về từ hàm (trong trường hợp này là string "done").
2. await getJSON () có nghĩa là lệnh gọi console.log sẽ đợi cho đến khi Promise getJSON () giải quyết và in ra giá trị của nó.

# Tại sao async/await tốt hơn Promise, callback
## 1.Code sẽ gọn gàng và súc tích hơn
Hãy nhìn xem mình đã viết bao nhiêu code! Ngay cả trong ví dụ giả định ở trên, nó rõ ràng mình đã tiết kiệm được một lượng code kha khá. Mình đã không phải viết .then, tạo một hàm ẩn danh để xử lý phản hồi hoặc cung cấp dữ liệu cho một biến mà mình không cần sử dụng. Mình cũng tránh được việc viết code lồng nhau. Những lợi thế nhỏ này nếu tận dụng tốt sẽ cải thiện rất lớn đến chất lượng code, performance của sản phẩm
## 2. Xử lý lỗi
Async / await giúp có thể xử lý cả lỗi đồng bộ và lỗi không đồng bộ. Trong ví dụ bên dưới với các Promise, việc sử dụng try / catch sẽ không xử lý nếu JSON.parse thất bại vì nó xảy ra bên trong một Promise. Ta cần gọi .catch theo Promise và sao chép code xử lý lỗi, việc này sẽ rất dài dòng và bất tiện
```
const makeRequest = () => {
  try {
    getJSON()
      .then(result => {
        // this parse may fail
        const data = JSON.parse(result)
        console.log(data)
      })
      // uncomment this block to handle asynchronous errors
      // .catch((err) => {
      //   console.log(err)
      // })
  } catch (err) {
    console.log(err)
  }
}
```
## 3. Viết các hàm điều kiện
Hãy tưởng tượng đoạn code bên dưới sẽ lấy dữ liệu từ 1 nguồn nào đó sau đó đưa ra quyết định xem liệu nó có nên trả về dữ liệu nhận được hay sẽ lấy thêm dữ liệu nào khác nữa dựa trên vài các giá trị nhận được từ dữ liệu trả về
```
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
```
Nhìn thôi đã chả muốn đọc rồi :)) Nó rất dài dòng và khó đọc vì cấu trúc các hàm lồng trong nhau (6 cấp). Khó cho cả người đọc lẫn người viết.
Ví dụ này trở nên dễ đọc hơn khi được viết lại bằng async / await.
```
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
```
## 4. Sử dụng các biến trung gian
Có lẽ bạn đã gặp tình huống mà bạn gọi một promise1 và sau đó sử dụng những gì nó trả về để gọi promise2, sau đó sử dụng kết quả của cả hai Promise để gọi một promise3. Code của bạn rất có thể trông như thế này
```
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return promise2(value1)
        .then(value2 => {
          // do something          
          return promise3(value1, value2)
        })
    })
}
```
Nếu promise3 không đòi hỏi value1 thì có thể dễ dàng viết lại Promise lồng nhau một chút. Nếu bạn là kiểu người khó tính không thể chấp nhận điều này, bạn có thể bọc cả hai giá trị 1 & 2 trong Promise.all và tránh làm code lồng nhiều hơn, như thế này
```
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return Promise.all([value1, promise2(value1)])
    })
    .then(([value1, value2]) => {
      // do something          
      return promise3(value1, value2)
    })
}
```
Hướng tiếp cận này hy sinh ngữ nghĩa vì mục đích dễ đọc. Không có lý do gì để value1 & value2 thuộc về một mảng với nhau, ngoại trừ để tránh các Promise lồng nhau.

Logic tương tự này trở nên đơn giản và trực quan một cách lố bịch với async / await. Nó làm cho bạn tự hỏi về tất cả những điều bạn có thể đã làm trong thời gian mà bạn đã đấu tranh để thực hiện những Promise trông bớt gớm ghiếc.

```
const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}
```
## 5. Error stacks
Hãy tưởng tượng một đoạn code gọi nhiều Promise trong một chuỗi và ở đâu đó chuỗi bị lỗi.
```
const makeRequest = () => {
  return callAPromise()
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => {
      throw new Error("oops");
    })
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)
  })
```
Lỗi được trả về từ chuỗi Promise không cho biết lỗi xảy ra ở đâu. Thậm chí tệ hơn, nó còn gây hiểu lầm; tên hàm duy nhất mà nó chứa là callAPromise hoàn toàn không có lỗi này.
Tuy nhiên, chuỗi lỗi từ async / await points chỉ ra hàm chứa lỗi
```
const makeRequest = async () => {
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  throw new Error("oops");
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at makeRequest (index.js:7:9)
  })
```
Đây không phải là một điểm cộng lớn khi bạn đang phát triển trên môi trường cục bộ của mình và mở tệp trong trình chỉnh sửa, nhưng nó khá hữu ích khi bạn đang cố gắng tìm hiểu các bản ghi lỗi đến từ máy chủ của bạn. Trong các trường hợp như vậy, biết lỗi xảy ra trong makeRequest tốt hơn là biết rằng lỗi xuất phát từ 1 đoạn then nào đó.
## 6. Debugging
Cuối cùng nhưng không kém phần quan trọng, một lợi thế cực lớn khi sử dụng async / await là nó dễ gỡ lỗi hơn nhiều. Promise khi gỡ lỗi luôn là một vấn đề gây đau đầu vì 2 lý do
1. Bạn không thể đặt breakpoint trong 1 arrow function mà trả về biểu thức
```
const makeRequest = () => {
    return callAPromise()
        .then(() => callAPromise())
        .then(() => callAPromise())
        .then(() => callAPromise())
        .then(() => callAPromise())
}
```

2. Nếu bạn đặt breakpoint bên trong block .then và sử dụng các phím tắt gỡ lỗi như step, trình gỡ lỗi sẽ không di chuyển đến .then bởi vì nó chỉ có các bước Step thông qua mã đồng bộ.
# Tổng kết
Async / await là một trong những tính năng mang tính cách mạng nhất đã được thêm vào JavaScript trong vài năm qua. Nó làm cho bạn nhận ra những gì một mớ hỗn độn Promise làm thật đáng cười, và cung cấp một sự thay thế trực quan.