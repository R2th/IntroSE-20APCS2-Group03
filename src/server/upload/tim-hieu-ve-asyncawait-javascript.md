# Tổng quan
Khi **promise** ra đời, việc xử lý bất đồng bộ đã trở nên đơn giản hơn. Code của chúng ta đã gọn gàng và clean hơn, nhưng khi **async/await** ra đời, code js xử lý bất đồng bộ không khác gì code logic các ngôn ngữ như C#, java. :kissing_heart:
Nếu bạn nào chưa biết về promise có thể tham khảo: https://viblo.asia/p/promise-trong-js-RQqKLow457z

Ok, bắt đầu nào. :point_right:
# Nội dung
## 1. Async/await basic
Khoan hãy bàn luận vội về async/await là gi. Các bạn hãy xem 2 đoạn code dưới đây:
``` js
asyncFunction()
  .then((data) => {
    // code xử lý khi thực hiện lời hứa
  })
  .catch((err) => {
    // code xử lý khi thất hứa
  })
  .finally(() => {
    // code xử lý sau cùng không quan tâm đến thực hiện được lời hứa thay thất hứa.
  });

```

``` js
try {
    let data = await asyncFunc();

    // code xử lý sau khi gọi thành công hàm asyncFunc và lấy được dữ liệu

} catch (error) {
    // code xử lý khi đoạn code trong khối try {} có lỗi (lôi cú pháp, lỗi logic code và đặc biệt là bị reject từ một promise)

} finally {
    // code xử lý sau cùng
}
```

Nhìn vào 2 đoạn code, ai trong chúng ta đều thấy đoạn code thứ 2 nhìn gọn gàng và clean. Còn về bản chất thì 2 đoạn code đều thực hiện cùng một công việc: chờ kết quả từ asyncFunc và xử lý tiếp. Nếu có lỗi thì nhảy vào **catch** và đều nhảy vào **finally** sau khi xử lý xong (kể cả lỗi)
Và đoạn code thứ 2 chính là cách sử dụng **async/await** để thực thi một đoạn code chạy bất đồng bộ. Đến đây các ae đã thấy hứng thú chưa ? Code không khác gì các ngôn ngữ khổng lồ như c# và java. :nerd_face:

Quay lại ban đầu, **async/await** là gì ? **Async/await** ra đời từ ES7, async/await hiểu đơn giản là biến cách code xử lý các tác vụ bất đồng bộ như xử lý đồng bộ. Chỗ nào, đoạn code nào xử lý bất đồng bộ mà các câu lệnh sau cần chờ hoặc cần kết quả trả về từ tác vụ xử lý bất đồng bộ trên thì đơn giản chỉ cần đặt **await** vào đoạn code bất đồng bộ đó và việc xử lý thì để js lo. 

> Tuy nhiên có một điều cần lưu ý: **await** chỉ được sử dụng bên trong các hàm có sử dụng **async**. Nếu bạn cố sử dụng await trong các hàm không phải async, lỗi sẽ vả vào mặt bạn.
``` js
// OK
async function demoAsyncFunc(){
    try {
        let data = await asyncFunc();
    
        // code xử lý sau khi gọi thành công hàm asyncFunc và lấy được dữ liệu
    
    } catch (error) {
        // code xử lý khi đoạn code trong khối try {} có lỗi (lôi cú pháp, lỗi logic code và đặc biệt là bị reject từ một promise)
    
    } finally {
        // code xử lý sau cùng
    }
}

// Error
function demoAsyncFunc(){
    try {
        let data = await asyncFunc();
    
        // code xử lý sau khi gọi thành công hàm asyncFunc và lấy được dữ liệu
    
    } catch (error) {
        // code xử lý khi đoạn code trong khối try {} có lỗi (lôi cú pháp, lỗi logic code và đặc biệt là bị reject từ một promise)
    
    } finally {
        // code xử lý sau cùng
    }
}
```

**async** sẽ được đặt vào trước từ khóa **function** để khai báo hàm này là một hàm async (bất đồng bộ). Và thân hàm chúng ta có thể thoải mái sử dụng **await** để chờ các tác vụ bất đồng bộ. Hiểu đơn giản thì **async function** giống với việc chúng ta tạo ra một function trả về một **promise**. Đơn giản phải không nào.

## 2. Throw error và catch error trong async/await
Để bắt lỗi khi thực thi một hàm async, ta chỉ đơn giản là bao đoạn code đó trong try/catch. Nếu có lỗi, lỗi sẽ được ném vào catch
``` js
try {
    let data = await asyncFunc();

    // code xử lý sau khi gọi thành công hàm asyncFunc và lấy được dữ liệu

} catch (error) {
    // code xử lý khi đoạn code trong khối try {} có lỗi (lôi cú pháp, lỗi logic code và đặc biệt là bị reject từ một promise)

} finally {
    // code xử lý sau cùng
}
```

Ơ, vậy trong trường hợp mà muốn ném ra một lỗi từ async function thì sao ? Đơn giản là dùng `throw error;`
``` js
async function asyncFunc(){
    throw 'lỗi';
}
async function demoAsyncFunc(){
    try {
        let data = await asyncFunc();
    
        // code xử lý sau khi gọi thành công hàm asyncFunc và lấy được dữ liệu
    
    } catch (error) {
        // code xử lý khi đoạn code trong khối try {} có lỗi (lôi cú pháp, lỗi logic code và đặc biệt là bị reject từ một promise)
        console.log(error); // kết quả sẽ là: lỗi
    }
}
```

# Tổng kết
Async/await không phải quá khó để tiếp cận khi bạn đã biết về promise. 
Tham khảo: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function