##### Trong bài viết này, chúng ta sẽ tìm hiểu:
* **Tổng quan về hook**
* **Function ``useLayoutEffect``**
* **Khi nào chúng ta dùng ``useLayoutEffect``**
* **Sự khác nhau giưã ``useEffect`` và ``useLayoutEffect``**

##### Tổng quan về hook trong React
Một hook là một function có khả năng sử dụng ``state`` và các chức năng của react khi mà chúng không được viết trong một class component bởi ES6. ``useLayoutEffect`` cũng tương tự như ``useEffect``, tất nhiên chúng sẽ có điểm khác nhau nhất định, chúng ta sẽ tìm hiểu sau. Nêú bạn chưa biêts ``useEffect`` là gì ? hoạt động như thế nào ? thì hãy đọc [bài viết](https://dev.to/nibble0101/what-is-useeffect-hook-and-how-do-you-use-it-1p9c) này nhé .
##### Function ``useLayoutEffect``

``useEffectLayout`` lấy một hàm được gọi là ``effect`` làm đối số đầu tiên, và một ``mảng`` phụ thuộc làm đối số thứ hai. Đối số đầu tiên, ``effect``, trả về một ``cleanup`` function hoặc giá trị ``undefined`` . ``useEffectLayout`` được minh hoạ như code dưới đây

```
import React, { useLayoutEffect } from "react";
const APP = props => {
  useLayoutEffect(() => {
    //Do something and either return undefined or a cleanup function
    return () => {
      //Do some cleanup here
    };
  }, [dependencies]);
};
```


##### Sự khác nhau giữa ``useEffect`` và ``useLayoutEffect``**

Sự khác nhau giữa ``useEffect`` và ``useLayoutEffect`` là thời điểm chúng được gọi. Để hiểu được khi nào chúng được gọi, chúng ta theo dõi các render của DOM. Giả sử chúng ta triển khai một hook ``useEffect`` sau:
1. User tương tác với App. VD: Click vào một button
2. ``State`` của component sẽ thay đổi
3.  DOM sẽ thay đổi
4.  UI được thay đổi trên màn hình
5.  Hàm ``cleanup`` sẽ được gọi để ``clean`` những ``effect`` đã render trước đó nếu đối số thứ 2 của ``useEffect`` thay đổi.
6.  ``useEffect`` hook sẽ được gọi

Cần lưu ý rằng nếu một thành phần được hiển thị lần đầu tiên, chức năng dọn dẹp sẽ không được gọi vì không có tác dụng để ``cleanup``.
``useEffect`` hook được gọi vào sau khi DOM đã được vẽ ra. Mặt khác, ``useLayoutEffect`` hook được gọi đồng bộ trước khi thay đổi được vẽ trên màn hình. Trình tự các bước được nêu ở trên để thực hiện ``useEffect`` có thể được sửa đổi cho ``useLayoutEffect`` như được hiển thị bên dưới
1. User tương tác với App. VD: Click vào một button
2. ``State`` của component sẽ thay đổi
3.  DOM sẽ thay đổi
4.  Hàm ``cleanup`` sẽ được gọi để ``clean`` những ``effect`` đã render trước đó nếu đối số thứ 2 của ``useEffect`` thay đổi.
5.  ``useLayoutEffect`` hook sẽ được gọi
6.  UI được thay đổi trên màn hình


##### Khi nào chúng ta dùng ``useLayoutEffect``**
Bạn có thể sử dụng hook ``useLayoutEffec`` thay vì ``useEffect`` nếu hiệu ứng của bạn sẽ làm thay đổi DOM.  ``useEffect`` được gọi sau khi màn hình được render. Do đó, việc biến đổi DOM một lần nữa ngay sau khi màn hình được vẽ, sẽ gây ra hiệu ứng nhấp nháy nếu khách hàng nhìn thấy trên trình duyệt.

Mặt khác, ``useLayoutEffect`` được gọi trước khi màn hình được vẽ nhưng sau khi DOM bị biến đổi. Có thể tránh được hành vi không mong muốn, làm biến đổi DOM ngay sau khi vẽ màn hình, được mô tả với hook ``useEffect`` ở trên.

Cảm ơn mọi người đã theo dõi bài viết

Tham khảo

- [What is useLayoutEffect hook and how to use it](https://dev.to/nibble0101/what-is-uselayouteffect-hook-and-when-do-you-use-it-3lan)