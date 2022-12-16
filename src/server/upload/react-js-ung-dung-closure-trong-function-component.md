## Closure trong javascript

```
function counter(defaultValue) {
        var value = defaultValue;

        return {
            increase: function (number) {
                value += number;
            },
            decrease: function (number) {
                value -= number;
            },
            get: function () {
                return value;
            },
        };
    }

    let countManager = counter(10);

    countManager.increase(5);

    countManager.decrease(2);

    console.log(countManager.get()); //13
```

Đoạn code trên là 1 ví dụ cơ bản về cách sử dụng closure chắc hẳn chỉ cần đã tiếp xúc với javascript, ít hay nhiều thì chúng ta cũng có đôi lần sử dụng và hiểu cách chạy của nó. 

Một vài lập trình viên không tiếp xúc với javascript họ có thể suy nghĩ: "Làm sao sử dụng được value trong 3 hàm increase, decrease, get khi mà hàm counter đã chạy xong và biến value đã được giải phóng khỏi bộ nhớ ?".

Thế nhưng javascript lại làm được điều đó nhờ vào closure.

Việc sử dụng closure có thể hiểu đơn giản như sau:
> Closure cho phép 1 funtion có thể truy cập, sử dụng các biến trong scope cha của nó. Ngay cả sau khi kết thúc quá trình thực thi của hàm bên ngoài, các hàm bên trong vẫn có quyền truy cập vào các biến trong hàm bên ngoài.

Vì đây là bài viết nói về React js nên mình chỉ nói qua về closure  nhé ^^
## Closure được ứng dụng trong funtion component của React như thế nào ?
Đây là ví dụ về 1 bộ đếm thời gian sẽ tự động tăng sau 1 giây:

```
import React, { useEffect, useState } from 'react';
const ClosuresInReact = () => {
    const [count, setCount] = useState('1');
    const incrementCount = () => {
        setCount((prevCount) => +prevCount + 1);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            incrementCount();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [incrementCount]);
    return <div>{`Timer started: ${count}`}</div>;
};
export default ClosuresInReact;
```

Ở đây mỗi lần component rerender sẽ tạo ra 1 thể hiện hàm incrementCount, bên trong hàm này nó sẽ thực hiện thay đổi state count, khi nó làm dependency cho useEffect thì sẽ luôn trigger rerender component này sau 1 giây và tạo ra 1 vòng lặp vô hạn.

Nghe có vẻ mọi thứ hoạt động tốt nhưng ở IDE của mình lại bắn ra cảnh báo
![](https://images.viblo.asia/10a8f90d-62e9-4c14-af58-808ec1a4ff24.jpg)

Nó nói rằng funtion này sẽ luôn được tạo mới khi rerender component và cái effect này sẽ chạy vô hạn, nó khuyên mình nên cho xử lý từ funtion này vào trong useEffect hoặc đưa funtion ClosuresInReact vào trong hook useCallback.

Mình sẽ sử dụng useCallback như gợi ý:
```
import React, { useCallback, useEffect, useState } from 'react';
const ClosuresInReact = () => {
    const [count, setCount] = useState('1');
    const incrementCount = useCallback(() => {
        setCount((prevCount) => +prevCount + 1);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            incrementCount();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [incrementCount]);

    return <div>{`Timer started: ${count}`}</div>;
};
export default ClosuresInReact;
```

Kế quả bộ đếm chạy 1, 2 rồi đứng hình :scream: , chắc IDE nó troll mình :)

Vấn đề ở đây:

- Hàm incrementCount  được bọc trong useCallback mặc dù count đã tăng lên 2 sau lần tạo hàm incrementCount đầu tiên nhưng với useCallback không dependency nó sẽ không tính toán lại hàm incrementCount và sẽ trả về giá trị của lần chụp đầu tiên với prevCount là 1 là giá trị tham chiếu count của closure đã cũ =>  tức là dù tham chiếu count bên ngoài đã thay đổi đối với góc nhìn Closure nhưng bên trong trong funtion incrementCount không hề cập nhật, tính toán lại nên xảy ra lỗi này.

Cách khắc phục ở đây:

- Thêm dependency cho useCallback là count của scope bên ngoài tức là function ClosuresInReact khi đó mỗi khi count thay đổi React sẽ tính toán cập nhật lại function incrementCount

Nguồn tham khảo: [You have to know closures to be a (good) React developer - Nitsan Cohen - Medium](https://nitsancohen770.medium.com/you-have-to-know-closures-to-be-a-good-react-developer-104fc2f6cd70)

Trên đây là những hiểu biết của mình về ứng dụng closure trong việc quản lý state của React .Hãy đưa ra ý kiến dưới comment để mình bổ sung và hoàn thiện hơn nhé <3

![](https://images.viblo.asia/f666ce6f-3159-42f8-90d2-783468d93198.jpg)