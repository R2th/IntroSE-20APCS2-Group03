Như anh em đã biết thì Object lưu trữ các thuộc tính bên trong nó và các thuộc tính này được thể hiện bằng cặp (key - value), nhưng có anh em nào có suy nghỉ bên trong nó có gì khác nữa hay không ?, thì với bài viết này mình sẽ trả lời cho anh em thắc mắc đó.
# Object.defineProperties và Object.getOwnPropertyDescriptors.
Trước khi vào chi tiết thì anh em cùng mình tìm hiểu qua hai phương thức thao tác với các thuộc tính trong object, nếu muốn biết thêm nhiều hơn về các method khác thì link [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) bạn ei......
## Object.defineProperties.
* **Object.defineProperties(obj, descriptors)** có chức năng cho phép chúng ta định nghĩa nhiều thuộc tính cùng một lúc.

    * **Syntax:**
   ```js 
   Object.defineProperties(obj, {
      prop: descriptor,
      //...
    }); 
    ```
    * **Example:**
    ```js
    const person = {};
    Object.defineProperties(person, {
      info: { value: { name: 'person', phone: '0123456789' } },
      id: { value: 'id_1' },
      catchphrases: { value: 'Cho xin cai dia chi !' }
    });
    
    // Object person khi được set thì sẽ trông như này.
    /*
    {
        info: {name: 'person', phone: '0123456789'}
        catchphrases: "Cho xin cai dia chi !"
        id: "id_1"
    }
    */
    ```
        
## Object.getOwnPropertyDescriptors.

* **Object.getOwnPropertyDescriptors(obj)** phương thức trả về tất cả các mô tả thuộc tính riêng của một Object.

    * **Syntax:**
   ```js 
   Object.getOwnPropertyDescriptors(obj); 
    ```
    * **Example:**
    ```js
    let descriptor = Object.getOwnPropertyDescriptor(person, 'catchphrases')
    
    console.log(descriptor)
    /*
    {
        configurable: false
        enumerable: false
        value: "Cho xin cai dia chi !"
        writable: false
    }
    */
    ```
    
   :point_right: Và những flag  **configurable**, **enumerable**, **writable** này sẽ nhận giá trị là false nếu thuộc tính được tạo với defineProperty nhưng không cập nhật giá trị của các flag trên. zậy **configurable**, **enumerable**, **writable** là cái quằn quại gì... giá trị của nó là true hay false thì có ý nghĩa gì, thì cùng mình đi tiếp phần dưới nhé...
#  Property flags
Thuộc tính object, bên cạnh các value còn có một số thuộc tính đặc biệt (gọi là flags)
Một thuộc tính sẽ có đầy đủ 3 flag ( **configurable**, **enumerable**, **writable** ), 3 flag này của thuộc tính thường được gọi là property descriptor
## Writable
* **writable** nếu là true thì value có thể thay đổi, ngược lại nếu là false thì value chỉ được đọc.
    
    ```js
    'use strict';
    
    let car = {
        color: "black"
    };

    Object.defineProperty(car, "color", {
        writable: false
    });

    let descriptor = Object.getOwnPropertyDescriptor(car, 'color')

    console.log(descriptor)
    
    /*
    giá trị của writable bây giờ đã set bằng false cũng đồng nghĩa 
    với việc giờ thuộc tính color bây giờ 'sửa bằng mắt ấy !'
    {
      value: 'black',
      writable: false,
      enumerable: true,
      configurable: true
    }
    */
    
    car.color = 'red' 
    // TypeError: Cannot assign to read only property 'color' of object
    // đấy mình nói ở trên rồi mà... 
    
    Object.defineProperty(car, "color", {
        writable: true
    });

    console.log(descriptor)
    /*
    {
      value: 'black',
      writable: true,
      enumerable: true,
      configurable: true
    }
    */
    
    car.color = 'red';

    console.log(car)
    // { color: 'red' }
    ```
   
:point_right: **Lưu ý:**  khi set cho writable là false thì khi assign thuộc tính của object đó với giá trị mới chỉ xuất hiện lỗi trong chế độ strict-mode, nếu không thì việc thực hiện đó không báo lỗi và việc assign giá trị đó đương nhiên cũng không thành công.

## Enumerable
* **enumerable** nếu là true thì sẽ liệt kê thuộc tính đó trong vòng lặp, còn ngược lại thì sẽ không liệt kê.
    
    ```js
    'use strict';
    
    let car = {
        color: "black",
        name: "audi",
        toString: () => this.name + ' is ' + this.color,
    };

    for (let key in car) {
        console.log(key)
    }
    
    // color name toString
    
    let descriptor = Object.getOwnPropertyDescriptor(car, 'toString')
    console.log(descriptor)
    
    /*
    {
      value: [Function: toString],
      writable: true,
      enumerable: true,
      configurable: true
    }
    */
    
    Object.defineProperty(car, "toString", {
        enumerable: false
    });
    
    /*
    {
      value: [Function: toString],
      writable: true,
      enumerable: false,
      configurable: true
    }
    */

    for (let prop in car) {
        console.log(prop)
    }
    
    // color name
    ```
    
## Configurable
* **configurable** nếu true thì thuộc tính có thể bị xóa, có thể thay đổi writable, enumerable và nếu ngược lại thì không.

    Với trường hợp configurable được set bằng true anh em cũng có thể nhìn thấy qua các ví dụ về enumerable và writable ở trên việc thay đổi các flag là khả thi... nhưng với trường hợp configurable là false thì defineProperty sẽ không thực hiện được các điều sau đây:
     * không thể thay đổi lại value của configurable.
     * không thể thay đổi value của enumerable.
     * không thể thay đổi value của writable từ false sang true ( nhưng ngược lại thì được ).

    **Example:**
    ```js
    let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
    console.log(descriptor)
    /*
    {
      value: 3.141592653589793,
      writable: false,
      enumerable: false,
      configurable: false
    }
    */

    // Với PI của Math ta không thể thay đổi value của nó cũng như thay đổi các flag.
    ```
    
    ```js
    'use strict';
    
    let car = {
        color: "black",
        name: "audi",
    };
    
    Object.defineProperty(car, "name", {
        configurable: false
    });

    let descriptor = Object.getOwnPropertyDescriptor(car, 'name')
    console.log(descriptor)
    /*
    {
      value: 'audi',
      writable: true,
      enumerable: true,
      configurable: false
    }
    */
    
    /*
    Như có giới thiệu ở trên thì khi configurable được set 
    bằng false thì các flag không thể thay đổi 
    nhưng với writable thì ta có thể set từ true thành false 
    còn ngược lại thì không. 
    */
    
    Object.defineProperty(car, "name", {
        writable: false
    });

    descriptor = Object.getOwnPropertyDescriptor(car, 'name')
    console.log(descriptor)
    
    /*
    {
      value: 'audi',
      writable: false,
      enumerable: true,
      configurable: false
    }
    */
    ```
        
# Kết Luận.
Trên là khái quát về Property flags and descriptors tui tìm hiểu được nếu anh em muốn đọc thêm và hiểu nhiều hơn về những thứ liên quan đến object thì link bên dưới đây nha moi người.

https://javascript.info/property-descriptors

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object