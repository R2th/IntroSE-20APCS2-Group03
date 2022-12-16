Giống bất kỳ ngôn ngữ nào, Javascript cũng sẽ gặp các tình huống lỗi như: undefined, null, JSON.parse() fail...

Điều này nghĩa là chúng ta phải xử lý những lỗi ngoại lệ này một cách nuột nà nếu chúng ta muốn có một trải nghiệm người dùng tốt cho ứng dụng của mình.

Giải pháp cho vấn đề này là dùng `try...catch` blocks, việc này cũng giúp ứng dụng của chúng ta ko bị crash khi xảy ra lỗi.

### Try...Catch
Để sử dụng `try...catch` block, chúng ta sử dụng cú pháp sau:

```
try{
  // các đoạn xử lý mà có thể phát sinh ngoại lệ
  // phải có ít nhất 1 dòng code trong khối này
}
catch (error){
  // xử lý lỗi ngoại lệ ở đây
  // khối này có thể không cần nếu khối finally đươck khai báo
}
finally {
  // phần này có thể có hoặc không
  // khối này sẽ được chạy sau khi xử lý xong khối try hoặc catch
}
```

Một ví dụ để dễ hình dung hơn:

```
try {
  undefined.prop
} catch (error) {
  console.log(error);
}
```

Trong ví dụ trên chúng ta khi lấy thuộc tính từ `undefined`, nên sẽ sinh ra một lỗi ngoại lệ. Trong `catch` block, chúng ta bắt sự kiện error và log nó ra, kết quả như sau:
> TypeError: Cannot read property ‘prop’ of undefined

Khi ứng dụng chạy dòng lệnh undefined.prop, chúng ta có được error message log ra thay vì crashing ứng dụng.

Như trong phần comments trên, `try` block phải có ít nhất một xử lý nào đó, sau đó là `catch` block hoặc `finally` block được khai báo. Điều này có nghĩa là chúng ta có thể có các trường hợp sau: 

```
try {
  ...
} 
catch {
  ...
}
try {
  ...
} 
finally{
  ...
}
try {
  ...
} 
catch {
  ...
}
finally {
  ...
}
```

Khối `catch` chứa các đoạn code mà chỉ ra app sẽ xử lý cái gì khi mà phát sinh lỗi ngoại lệ trong `try` block. Nếu `try` block phát sinh lỗi thì `catch` block sẽ được chạy, nếu `try` block không phát sinh lỗi thì `catch` block sẽ được bỏ qua.

Khối `finally` sẽ được chạy sau khi tất cả code trong phần `try` block hoặc `catch` block chạy xong. Nó luôn chạy dù có phát sinh lỗi ngoại lệ hay không.

Khối `try` có thể được lồng bên trong nhau. Nếu khối `try..catch` bên trong không xử lý *catch* lỗi thì khối `try...catch` bên ngoài phải làm điều đó. Một ví dụ để dễ hình dung:

```
try {
  try {
    undefined.prop
  } finally {
    console.log('Inner finally block runs');
  }
} catch (error) {
  console.log('Outer catch block caught:', error);
}
```

Khi chạy đoạn code trên, chúng ta sẽ thấy log ra:
> Inner finally block runs

> Outer catch block caught: TypeError: Cannot read property ‘prop’ of undefined’


Có thể thấy là khi khối `try...catch` bên trong không *catch* lỗi nên khối `try...catch` bên ngoài có khai báo *catch* nên đã xử lý lỗi, và khối `finally` bên trong chạy trước khối `catch` bên ngoài.
`Try...catch...finally` chạy tuần tự từ trên xuống dưới theo thứ tự.

Các khối `catch` ở trên tất cả đều theo kiểu *unconditional* (vô điều kiện), tức là chúng có thể *bắt* tất cả các ngoại lệ xảy ra. Object `error` giữ dữ liệu về lỗi ngoại lệ. Nó chỉ giữ dữ liệu bên trong khối `catch`(nó theo kiểu variable scope), nếu muốn sử dụng `error object` bên ngoài khối `catch` thì phải gán nó cho 1 biến bên ngoài. Sau khi `catch` block chạy xong, `error object` sẽ được giải phóng khỏi bộ nhớ.

Khối `finally` chứa các đoạn code mà được chạy sau khi code trong `try` block hoặc `catch` block chạy, và nó được thực thi bất kể có lỗi ngoại lệ hay không có. Do đó khối `finally` làm cho trải nghiệm người dùng ít bị ảnh hưởng nhất khi mà ứng dụng của chúng ta xảy ra lỗi (hoặc có thể do các yếu tố khách quan như mất kết nối mạng...). Ví dụ, chúng ta có thể đặt các code clean up ví dụ như close file khi đọc file dù có hay không xảy ra lỗi khi đọc. Khi chạy tới dòng mà phát sinh lỗi ngoại lệ thì toàn bộ code sau dòng đó trong `try` block sẽ không được thực thi nữa, nên nếu chúng ta xử lý *close file* ở cuối của `try` block thì có thể nó sẽ không được thực thi (nếu xảy ra lỗi).
Chúng ta có thể chỉ đặt code sẽ chạy mà không cần quan tâm liệu có phát sinh lỗi hay không như cleanup code, release memory... trong `finally` block, khi đó chúng ta sẽ không phải dupplicate code khi mà phải xử lý những việc đó trong try và catch block. Ví dụ minh họa:

```
openFile();
try {
  // tie up a resource
  writeFile(data);
}
finally {
  closeFile(); 
  // always close the resource
}
```

Chúng ta có thể lồng nhiều block `try...catch` với nhau:

```
try {
  try {
    throw new Error('error');
  }
  finally {
    console.log('first finally runs');
  }
  try {
    throw new Error('error2');
  }
  finally {
    console.log('second finally runs');
  }
}
catch (ex) {
  console.error('exception caught', ex.message);
}
```

Trong ví dụ trên chúng ta sẽ không thấy log ra:
> second finally runs

bởi vì khối `try...catch` đầu tiên không *catch* lỗi ngoại lệ nên khi xảy ra lỗi thì lỗi đó được truyền ra và được *catch* bởi khối `try...catch` cha bên ngoài. Nếu chúng ta muốn khối `try...catch` thứ 2 được thực thi thì chúng ta phải thêm `catch` block vào khối `try...catch` thứ nhất, như sau:

```
try {
  try {
    throw new Error('error');
  }
  catch {
    console.log('first catch block runs');
  }  
  finally {
    console.log('first finally runs');
  }
  try {
    throw new Error('error2');
  }
  finally {
    console.log('second finally runs');
  }
}
catch (ex) {
  console.error('exception caught', ex.message);
}
```

Chúng ta còn có thể *rethrow* các lỗi ngoại lệ mà được bắt ở `catch` block. Ví dụ:

```
try {
  try {
    throw new Error('error');
  } catch (error) {
    console.error('error', error.message);
    throw error;
  } finally {
    console.log('finally block is run');
  }
} catch (error) {
  console.error('outer catch block caught', error.message);
}
```

Như ví dụ trên, chúng ta có 3 output là 
> error error, finally block is run outer catch block caught error

bởi vì khối `catch` của block `try...catch` bên trong đã *throw* lỗi ngoại lệ một lần nữa sau khi log nó ra, do đó khối `catch` bên ngoài vẫn được thực thi do nhận được lỗi *rethrow* từ block `catch` bên trong.

Vì code chạy tuần tự, chúng ta có thể sử dụng biểu thức *return* ở cuối `try` block. Ví dụ, nếu chúng ta muốn parse một chuỗi JSON thành một object, chúng ta muốn return một object rỗng nếu xảy ra lỗi nào đó.

```
const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  }
  catch {
    return {};
  }
}
```

và chúng ta chạy thử hàm trên:
```
console.log(parseJSON(undefined));
console.log(parseJSON('{"a": 1}'))
```

chúng ta sẽ được object rỗng ở dòng thứ nhất và `{a: 1}` ở dòng thứ 2.

### Try...Catch trong xử lý bất đồng bộ
Chúng ta thường sử dụng async - await cho việc xử lý bất đồng bộ trong Javascript, và chúng ta còn có thể sử dụng `try...catch` block để *catch* rejected promises và xử lý rejected promises một cách uyển chuyển. Ví dụ:
```
(async () => {
  try {
    await new Promise((resolve, reject) => {
      reject('something wrong!')
    })
  } catch (error) {
    console.log(error);
  }
})();
```

Trong đoạn code trên, vì chúng ta *reject* promise trong `try` block, nên `catch` block bắt được lỗi trong reject promise và log ra:

> something wrong!

Hàm trên trông có vẻ giống với `try...catch` block bình thường, nhưng thực sự thì điều đó không đúng, vì đây là một *async* funcion.

Một *async* function chỉ trả về các promises, nên chúng ta không thể *return* bất cứ thứ gì thay vì *promises* trong `try...catch` block. Khối `catch` trong async function chỉ là một cách viết tắt cho `catch` function, hàm mà được chuỗi cùng với *then* function.
Đoạn code trên tương đương với cách viết sau trong thế giới *promises*:
```
(() => {
  new Promise((resolve, reject) => {
      reject('error')
    })
    .catch(error => console.log(error))
})()
```

Tương tự thì `finally` block của `try...catch` trong *async* cũng tương đương với cách viết *finally* function trong *promise*. Ta có 2 đoạn code sau là tương đương:

```
(async () => {
  try {
    await new Promise((resolve, reject) => {
      reject('error')
    })
  } catch (error) {
    console.log(error);
  } finally {
    console.log('finally is run');
  }
})();
```

```
(() => {
  new Promise((resolve, reject) => {
      reject('error')
    })
    .catch(error => console.log(error))
    .finally(() => console.log('finally is run'))
})()
```

Quy tắc `try...catch` lồng nhau ở trên cũng áp dụng được cho *async* function, nên chúng ta có thể viết code như sau:

```
(async () => {
  try {
    await new Promise((resolve, reject) => {
      reject('outer error')
    })
    try {
      await new Promise((resolve, reject) => {
        reject('inner error')
      })
    } catch (error) {
      console.log(error);
    } finally {
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log('finally is run');
  }
})();
```

Điều này giúp chúng ta dễ dàng lồng các *promises* và xử lý các lỗi tùy theo scope của chúng. Cách này giúp code sạch sẽ và dễ đọc hơn so với việc *chain* các *then*, *catch* và *finally* function của *promise*.

### Tổng kết

Để xử lý lỗi ngoại lệ trong JavaScript, chúng ta sử dụng `try...catch...finally` block để bắt lỗi. Cách này có thể áp dụng cho cả code đồng bộ và bất đồng bộ. 
Chúng ta để các đoạn code có thể phát sinh lỗi trong `try` block, và viết các code xử lý lỗi ngoại lệ trong `catch` block. Trong `finally` block, chúng ta viết các đoạn code thực thi mà không quan tâm tới có xảy ra lỗi hay không. Các *async* function có thể sử dụng `try...catch` block nhưng chúng chỉ trả về các promises giống như các *async* funciton khác, nhưng `try...catch` block trong các function bình thường thì có thể trả về bất cứ thứ gì.

nguồn: [https://medium.com/javascript-in-plain-english/handling-exceptions-in-javascript-f14d855be11c](https://medium.com/javascript-in-plain-english/handling-exceptions-in-javascript-f14d855be11c)