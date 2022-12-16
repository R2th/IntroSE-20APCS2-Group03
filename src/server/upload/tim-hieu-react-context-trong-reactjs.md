## 1.Introduction
Data trong ứng dụng React thường truyền đến component thông qua prop.Khi sử dụng prop thì data được truyền từ component cha đến component con.

Tuy nhiên, chúng ta có thể truyền data trong toàn bộ app mà không phải truyền prop qua từng tầng component khi sử dụng **React Context. **

## Đặt vấn đề 

Nếu không có React Context, chúng ta sẽ sử dụng kỹ thuật là `“prop drilling”` trong đó chúng ta sẽ phải truyền data xuống các component mặc dù một số component không cần dữ liệu đó.

Ví dụ :

Giả sử có data là một số có giá trị là 10 và chúng ta cần sử dụng data đó trong `component Red` và `Green`.

![](https://images.viblo.asia/dcf5b647-ff2f-4868-9f9b-b9ad2560226a.png)


Sử dụng `“prop drilling”` sẽ cần gửi data từ `component Red` đến `Blue` sau đó mới gửi data đến `Green` được.

Vậy ở đây gửi data đến `component Blue` chỉ để truyền nó xuống cho `Green`.

Việc sử dụng “`prop drilling”` thì việc truyền dữ liệu đến các component con lồng nhau sâu sẽ rất cồng kềnh.


Do đó, React Context xuất hiện để khắc phục những nhược điểm của `“prop drilling”.`


**React Context** sẽ cho phép chúng ta có thể tạo data và truyền nó với một provider đến tất cả component trong ứng dụng React mà không cần dùng `“prop drilling”`.

## Cách sử dụng React Context

Chúng ta sẽ học cách sử dụng React Context với một ví dụ rất đơn giản.

Ví dụ này chúng ta sẽ tạo dữ liệu Food chứa name và location trong context, truyền nó đến 2 components khác nhau và cập nhật giá trị dữ liệu từ 1 component khác.

**Khởi tạo project react js**

Run : `npx create-react-app learn-useContext`

Cấu trúc folder như sau:

![](https://images.viblo.asia/488717d0-6740-4d44-ab44-48eeae177b39.png)

### 1.Tạo Food Context
Trong `FoodContext.jsx` chúng ta sẽ khởi tạo một Context object sử dụng `createContext` API.

```js
import React, { createContext, useState } from 'react'
// Initiate Context
const FoodContext = createContext();
// Provide Context
export const FoodProvider = ({ children }) => {
  const [name, setName] = useState('Trà Xanh');
  const [location, setLocation] = useState('Thái Nguyên');
  return (
    <FoodContext.Provider value={{ name, location, setName, setLocation }}>
      {children}
    </FoodContext.Provider>
  )
}

export default FoodContext;
```

Ở đây, tạo hàm provider để cung cấp context vừa khởi tạo. Hàm này sẽ là cha của tất cả component khác trong ứng dụng này.

Và những dữ liệu trong `value` như `name,location,setName…` sẽ có thể được truy cập từ tất cả child components.

Cuối cùng là ` export FoodContext` để tất cả child components của FoodProvider có thể sử dụng.

### 2. Wrap the App component với Context.
Context là global variable.

Để context data có sẵn trong toàn bộ ứng dụng thì trong `index.js` chúng ta import FoodProvider và wrap `<App /> . `

Cụ thể như sau:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FoodProvider } from './FoodContext';

ReactDOM.render(
  <FoodProvider>
    <App />
  </FoodProvider>,
  document.getElementById('root')
);
```

### 3. Sử dụng name và location trong components.

Trong `NameComponent.jsx` import FoodContext dùng hook `useContext`.

```js
import React,{ useContext } from 'react';
import FoodContext from '../FoodContext';

const NameComponent = () =>{
  //Retrieve context data
  const food = useContext(FoodContext);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 className="is-size-4">
        <strong>Name</strong>: {food.name}
      </h2>
    </div>
  )
}
```

Tương tự với `LocationComponent.jsx`

```js
import React, { useContext } from 'react';
import FoodContext from '../FoodContext';

const LocationComponent = () => {
  // Retrieve context data
  const food = useContext(FoodContext);

  return (
    <div style={{ marginTop: "30px", marginLeft: "50px"}}>
      <h2 className="is-size-4">
        <strong>Location</strong>: {food.location}
      </h2>
    </div>
  )
}
```
### 4. Cách update data trong context
Tương tự, trong `FoodForm.jsx `ta cũng import FoodContext và sử dụng hook `useContext` để lấy context data.

```js
import React,{ useContext } from 'react';
import FoodContext from './FoodContext';

const FoodForm = () => {
  // Retrieve context data
  const food = useContext(FoodContext);

  return (
    <div className = "food-form" >
      <div className="input-item">
        <label className="label" style={{ marginRight: "28px" }}>Update Name: </label>
        <input
          className="input"
          onChange={e => food.setName(e.target.value)}
        />
      </div>

      <div className="input-item">
        <label className="label" >Update Location: </label>
        <input
          className="input"
          onChange={e => food.setLocation(e.target.value)}
        />
      </div>
    </div>
  )
}
export default FoodForm;
```

### 5. Thêm style

Trong` index.css `

```css
.App {
  font-family: sans-serif;
  margin-top: 83px;
  padding-left: 30px;
  padding-right: 30px;
}
.input-item {
  margin-top: 2%;
}
.input {
  width: 50%;
  padding: 5px;
  font-size: 18px;
}
.label{
  font-weight: 900;
  font-size: 20px;
}
.container {
  display: flex;
  justify-content: center;
}
.display-info {
  display: flex;
  justify-content: center;
}
.food-form {
  background: #f2f2f2;
  border-radius: 10px;
  padding: 10px 20px 20px;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 600px;
}
```

Vậy là đã xong 

Giờ run :` npm start` . Và kết quả như sau :


![](https://images.viblo.asia/9e13dc65-b8b0-4e91-84e2-38eaed7e72d2.gif)

## Lời kết

Hy vọng sau khi đọc bài viết, mọi người có thể hiểu được cơ bản về React Context và cách sử dụng nó trong ứng dụng.

Cảm ơn mọi người đã đọc  ^^

**Tài liệu tham khảo**

https://scotch.io/courses/10-react-challenges-beginner/use-context-to-pass-data
https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87