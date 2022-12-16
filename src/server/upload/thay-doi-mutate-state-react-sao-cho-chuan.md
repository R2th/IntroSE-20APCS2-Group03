# Thay đổi mutate state React sao cho chuẩn


> **Mutate state** không chỉ tồn tại trong React, nó là vấn đề muôn thuở của Javascript thời còn sơ khai đến bây giờ, ngay cả Angular, Vue cũng có. Mutate ở đây có nghĩa là biến đổi (trái ngược với nó là immutate mang nghĩa bất biến). Ở Javascript thì ta gọi chung là mutate object, đây là một tính năng của Javascript và nó cũng là con dao 2 lưỡi, gây nên các bugs tiềm ẩn phổ biến nhất khi bạn code Javascript. Cùng mình tìm hiểu nhé.


## 1. Mutate Object trong Javascript

```
const person1 = {name: 'Du Thanh Duoc'}
const person2 = person1
person2.name = 'Nguyen Quang Hai'
console.log(person1) // {name: "Nguyen Quang Hai"}
```

* Đoạn code đơn giản phía trên là minh chứng rõ ràng nhất cho việc thay đổi thuộc tính bên trong Object. Ở đây có thể bạn sẽ đặt ra 2 câu hỏi

            *      Đã khai báo const thì sao lại có thể thay đổi thuộc tính name được?       

* Khi bạn khai báo const với object person1 thì khả năng chống thay đổi biến của const chỉ có hiệu nghiệm với person1 chứ không hề có hiệu nghiệm với các thuộc tính bên trong nó. Tức là bạn không thể làm như thế này

```
const person1 = {name: 'Du Thanh Duoc'}
person1 = {name: 'Nguyen Quang Hai'} // Error
```

* Tôi đã gán biến person2 bằng biến person1 và xử lý trên person2, vậy tại sao person1 lại bị thay đổi?

![](https://images.viblo.asia/6c4523c9-6013-4671-bea3-f621526e855b.JPG)

Như các bạn thấy thì khi ta gán person1 = person2 thì địa chỉ của 2 biến này cùng vùng nhớ với nhau và chia sẽ thuộc tính name.

Vậy nên khi bạn thay đổi name thì cả 2 person1 và person2 đều thay đổi.

## 2. Mutate State trong React


* Các bạn có thể coi đoạn code bên dưới nhé. Chúng ta có App Component có state là info, truyền info xuống Header component. Ở Header Component ta lại setState cho information = info.

* Lúc này ở Header Compent chúng ta muốn thay đổi thuộc tính ability.dance trong information bằng cách nhấn vào button Đổi thông tin theo cách thông thường.

Tiếp theo hãy nhấn button Đổi tên và xem kết quả nhé
```
import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import update from "immutability-helper";
import "./styles.css";

export default function App() {
  const [info, setInfo] = useState({
    name: "Harry",
    ability: {
      dance: "Hip hop",
      sing: "Opera"
    }
  });
  const changeName = () => setInfo({ ...info, name: "William" });
  return (
    <div className="App">
      <Header info={info} />
      <p>
        Các thế mạnh của <span className="strong">{info.name}</span> là
      </p>
      <ul>
        {Object.keys(info.ability).map(item => (
          <li key={item}>
            <b>{item}:</b> {info.ability[item]}
          </li>
        ))}
      </ul>
      <button onClick={changeName}>Đổi tên</button>
    </div>
  );
}

function Header({ info }) {
  const [information, setInformation] = useState(null);

  useEffect(() => {
    setInformation(info);
  }, [info]);

  const changeNormal = () => {
    information.ability.dance = "Suffle dance";
    setInformation({ ...information });
  };

  const changeAssign = () => {
    const _information = Object.assign({}, information);
    _information.ability.dance = "Suffle dance";
    setInformation(_information);
  };

  const changeOperator = () => {
    const _information = { ...information };
    _information.ability.dance = "Suffle dance";
    setInformation(_information);
  };

  const changeCloneDeep = () => {
    let _information = cloneDeep(information);
    _information.ability.dance = "Suffle dance";
    setInformation(_information);
  };

  const changeImmutability = () => {
    let _information = update(information, {
      ability: { dance: { $set: "Suffle dance" } }
    });
    setInformation({ ..._information });
  };

  return (
    <header>
      <h1> Header </h1>
      <p>
        Chào <span className="strong">{information?.name}</span>
      </p>
      <p>
        Khả năng nhảy của bạn là: <i>{information?.ability?.dance}</i>
      </p>
      <button onClick={changeNormal}>Đổi thông tin theo cách thường</button>
      <button onClick={changeAssign}>Đổi thông tin theo Object Assign</button>
      <button onClick={changeOperator}>
        Đổi thông tin theo Spread Operator
      </button>
      <button onClick={changeCloneDeep}>Đổi thông tin theo cloneDeep</button>
      <button onClick={changeImmutability}>
        Đổi thông tin theo Immutability Helper
      </button>
      <hr />
    </header>
  );
}
```


[Click vào đây nếu web bạn không hiển thị codesandbox](https://codesandbox.io/s/mutate-state-k0fsp?file=/src/App.js):nerd_face:


Wow, thuộc tính ability.dance của info bên App component cũng bị đổi mặc dầu ta không hề setState thay đổi ability.dance ở info.

Thực ra thì quá trình nó sẽ như thế này.

1. Khi ta truyền prop info vào Header, và gán state infomation = info thì lúc này biến information và info đều tham chiếu đến các vùng nhớ như nhau (như mình đã giải thích ở mục mutate object).
2. Khi ta nhấn nút Đổi thông tin theo cách thông thường thì ta thay đổi giá trị thuộc tính dance ( lúc này là của chung 2 thằng information và info) và setState lại information, nhưng lúc này UI bên App Component chưa cập nhật vì chúng ta chưa thực hiện setState info.
3. Khi nhất nút đổi tên thì lúc này ta mới thực hiện thay đổi state info và ability.dance đã được thay đổi trước đó vô tình cập nhật lên UI.

> Đây chỉ là một ví dụ đơn giản nhưng mình giám chắc 100% bạn sẽ gặp khi làm việc với React. Điều này đôi lúc gây nên những bug không biết đâu mà ra, debug cũng thấy bà nội luôn. Để hạn chế điều này ta có một số giải pháp sau

## 2.1 Shallow clone với Object.assign hoặc Spread Operator

Refresh browser lại và thử tiếp nào  😀

**Object.assign**

```
const changeAssign = () => {
  const _information = Object.assign({}, information)
  _information.ability.dance = 'Suffle dance'
  setInformation(_information)
}
```

Click vào button Đổi thông tin theo Object Assign, sau đó click lại vào Đổi tên coi thử nhé.

Kết quả vẫn còn lỗi, state info bên App Component vẫn bị thay đổi


**Spread Operator ES6**

Click vào button Đổi thông tin theo Spread Operator, sau đó click lại vào Đổi tên coi thử nhé.

```
const changeOperator = () => {
  const _information = { ...information }
  _information.ability.dance = 'Suffle dance'
  setInformation(_information)
}
```
Và kết quả vẫn còn lỗi! Tại saoooo 👿
Vì shallow clone là một dạng copy Object nông. Các bạn có thể coi hình minh họa bên dưới

![](https://images.viblo.asia/85c3bd12-2d51-48e2-8203-903babc69381.JPG)

## 2.2 cloneDeep Lodash

Nhớ import cloneDeep từ lodash nhé


```
const changeCloneDeep = () => {
  let _information = cloneDeep(information)
  _information.ability.dance = 'Suffle dance'
  setInformation(_information)
}
```

Thử lại tương tự các cách trên xem thử kết quả như thế nào nhé.

Với cách này thì mọi thứ chạy rất ok, đúng yêu cầu chúng ta nhưng có 1 vấn đề. Đó chính là hiệu suất. Các thuật toán cloneDeep thường dùng các vòng lặp và đệ quy để clone lại toàn bộ object, object càng lớn thì số vòng lặp càng nhiều, dẫn đến hiệu suất chương trình kém đi.

![](https://images.viblo.asia/0561f4e1-06a1-432f-a087-335a922a9e11.JPG)

Nếu bạn đang suy nghĩ là dùng JSON.parse() và JSON.stringify() để clone thì đây cũng được coi là clone deep nhưng hiệu suất sẽ tốt hơn cloneDeep lodash. Nhưng hay cẩn thận với cách này vì cách này chứa nhiều rủi ro như mất giá trị NAN, function(), undefined.

Vậy có cách nào không? Vẫn còn nhé

## 2.3 Immutability Helper
Immutability Helper là một thư viện cho phép bạn thay đổi data của một bản sao object mà không làm thay đổi object gốc. Thư viện này cũng được chính React khuyên dùng để xử lý state
```
const changeImmutability = () => {
  let _information = update(information, {
    ability: { dance: { $set: 'Suffle dance' } }
  })
  setInformation({ ..._information })
}
```


Thử lại tương tự các cách trên nhé.

Và kết quả chính xác như mong đợi của chúng ta. Và mình giám chắc một điều là hiệu xuất tốt hơn cloneDeep rất nhiều. Vì sao ư? các bạn có thể xem hình dưới đây mô tả cách thức hoạt động của hàm update . Chúng ta có vùng nhớ các thuộc tính là y hệt nhau, trừ thuộc tính cần thay đổi thì vùng nhớ bị thay đổi.

![](https://images.viblo.asia/1d03d4dc-2de9-479a-8110-146b98baf3ea.JPG)


## 3. Tóm lại

* Hạn chế mutate object
* Nếu Object đơn giản, không nhiều cấp thì có thể dùng Object.assign và Spread Operator để tránh mutate object
* Nếu Object phức tạp thì hãy dùng Immutability Helper
* Hãy cẩn thận hiệu suất app khi dùng clone deep

Xong rồi đó. Happy Codding 😛😛😛😛