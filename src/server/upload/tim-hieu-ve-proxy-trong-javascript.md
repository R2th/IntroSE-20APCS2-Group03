# Giới thiệu:

Hôm nay, mình tìm hiểu lại kiến thức căn bản của es6 :v: .Chắc mọi người đều sử dụng các tính năng của es6 như let hay const, đây là những tính năng mới mà es6 hỗ trợ rất tốt và được nhiều anh em tin tưởng sử dụng. Nhưng trong số các tính năng es6 support mới ra, mọi người chắc sẽ để ý tới proxy. Nó rất hay, nhưng ít người để ý. vậy mình hôm nay cùng tìm hiểu nào/

![](https://images.viblo.asia/496d5edb-d497-4ebb-9c0c-51aeda28effd.png)
Proxy 



Cú pháp:
```js
let proxy = new Proxy(target, handler)
```
Trong đó: 

- Target: đối tượng để wrap, nó có thể wrap mọi thứ, kể cả các function
    - handler: nó là proxy configuration,  1đối tượng hay được gọi là trap. Nó giống như middleware để chặn và xử lý tương ứng. Ví dụ: `get` là 1 trap đọc các thuộc tính của target, set dùng để ghi các thuộc tính vào target,vv

# Một số trap của proxy:
## 1> Set:
Ví dụ ta có 1 `object` là `student` chứa tên của học sinh và tuổi của học sinh.

```js
    let student = {
        name: "John",
        age: 12
      };
```
Giờ ta muốn khi set  thuộc tính cho nó, chỉ được thêm/sửa thuộc tính age, education. Các thuộc tính khác kể cả thuộc tính name(đã có) không cho sửa.

Ta sẽ tạo 1 proxy với trap là set để wrap lại student --> tương tác với proxy này.
```js

let proxy = new Proxy(student, {
        set(target, prop, val) {
          if(prop === "education" || prop === "age") {
            target[prop] = val;
            return true
          }

          console.warn("only add education")
          return false            
        },
      })
```

Giờ ta thêm mới các key cho proxy
```js
      proxy["age"] = 22
      proxy["name"] = "march" // warning only add education
      proxy["game"] ="mario" // warning only add education
      proxy["education"] = "EDA"
      console.log(proxy) // {name: "John", age: 22, education: "EDA"}

```

## 2> Get:

Cũng ví dụ về student đó, khi lấy thuộc tính của `student` ta không cho lấy thuộc tính `name`(coi như nó` private`)
```js
let student = {
        name: "John",
        age: 12
      };

      console.log(student)

      var proxy = new Proxy(student, {
        get(target, prop) {
          if(prop === "name") {
            throw Error("private of student")
          }

          return target[prop]
        },
      })
```      
Khi ta lấy các thuộc tính của student
```js
      // get
      console.log(proxy.age) // 12
      console.log(proxy.name) // Error: private of student
```      


## 3> deleteProperty:
Vẫn là ví dụ về student, giờ ta muốn 1 trap có thể ngăn chặn việc xóa thuộc tính đã có từ student. Ta sẽ dùng trap `deleteProperty`

```js
let student = {
        name: "John",
        age: 12
      };

      console.log(student)

let proxy = new Proxy(student, {
       
        deleteProperty (target, key) {
          if(key === 'name') {
            throw Error("no access devare")
          }

          delete target[key]
        },
      })
 ```     
 
 Giờ ta sẽ thử xóa 1 vài thuộc tính:
 ```js
       // delete
      delete proxy.education // ok
      delete proxy.name // no
      console.log(proxy) //Proxy {name: "a", age: 12}
```      


## 4> Apply:
Giờ ta sẽ tìm hiểu 1 thuộc tính hay dùng với function.
Ví dụ ta có 1 function tính tổng n các phần tử


```js
function multi(...arg) {
        console.log(arg)
        return arg.reduce((a,b) => a + b)
      }
      
console.log(1,2,3,4,5) // 15      
````      

Giờ ta muốn có 1 function tính tích từ  function tính tổing này.
```js
var proxy = new Proxy(
        multi, {
          apply(target, thisArg, arg) {
            console.log(thisArg)
            const resultTarget = target(...arg)
            return resultTarget* resultTarget
        }
      });

      //apply
      var result = proxy(1,2,3,4,5)
      console.log(result) //225
      
```      

## 5> has:
Khi ta muốn quản lý với fall through của key đó trong đối tượng/mảng
Ví dụ ta có object computer:
```js
  const computer = {
        screen: "samsung",
        keyboard: "ca"
      }
      console.log('keyboard' in computer) //true
```

Giờ ta muốn khi kiểm tra nó sẽ trả về false với `keyboard`

```js
let proxy = new Proxy(computer, {
        has(target, key) {
          if(key === "keyboard") {
            return false;
          }
          return true;
        }
      })

      console.log('keyboard' in proxy)
```

# Kết luận:
Proxy rất đa dạng và có thể giải quyết nhiều bài toán khác nhau với các trap được nó support(ở ví dụ của mình chỉ tìm hiểu ở mức độ căn bản). Tuy chúng ta ít sử dụng đến nó, nhưng thực tế các thư viện đang sử dụng nó và đã hoạt động rất tốt.


https://javascript.info/proxy

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

https://ponyfoo.com/articles/es6-proxy-traps-in-depth

https://medium.com/jsland/c%C3%A1ch-s%E1%BB%AD-d%E1%BB%A5ng-proxy-trong-js-v%C3%A0-d%C3%B9ng-n%C3%B3-%C4%91%E1%BB%83-t%E1%BA%A1o-custom-storage-fad53c647155