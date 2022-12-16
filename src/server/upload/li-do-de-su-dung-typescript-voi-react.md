**5 lí do để sử dụng Typescript với React**

![](https://images.viblo.asia/325b76df-135e-487d-80f9-f2670bff06bc.jpeg)

Typescript là 1 siêu thư viện javascript chủ yếu cung cấp các optional static type, classes, và interfaces.

Trong vài năm qua, Typesript đã trở nên phổ biến và rộng rãi trong lập trình frontend. Một vài thành công của javascript phải kể đến như cải thiện khả năng bảo trì, tính nhất quán của code và hỗ trỡ các trình duyệt trong tương lai. Mặc dù nhiều Framework và thư viện dùng Typescript mặc định, thì React vẫn giữ vị trí trung lập, cung cấp cho các developer tùy chọn để phát triển với Typescript hoặc Javascript

Trong bài viết này, tôi sẽ giới thiệu với các bạn 5 lí do để bạn cân nhắc sử dụng Typescript cho ứng dụng React. Bên cạnh đó tôi cũng sẽ nêu ra các khó khăn thường gặp để bạn chuẩn bị tốt hơn.

# I. Rất dễ dàng để đọc và hiểu components 

Với Typescript, rất dễ dàng để định nghĩa các Prop types, giúp mã code dễ đọc và sử dụng hơn nhiều. Và điều này sẽ đi kèm bởi hỗ trợ IntelliSense cùng với kiểu tra các static type.

Note: IntelliSense là trình gợi ý code

Những điều này, kết hợp với nhau làm việc phát triển trở nên tuyệt vời hơn và giảm khả năng xuất hiện lỗi. Bên cạnh đó, việc thêm comment vào Prop types cũng giúp chúng ta dễ đọc hơn khi check các định nghĩa component.

```
import React from 'react';

export interface Props {
    /** name of the super hero */
    name: string;
    /** age of the super hero */
    age: number;
}

export const Avatar: React.FunctionComponent<Props> = ({ name, age }) => {
    return (
        <div>
            <h1> Name : {name} </h1>
            <p> Age : {age} </p>
        </div>
    );
};
```

# II. Support JSX tốt hơn 

Một lợi ích bổ sung khác của Typescript và React đó là cung cấp IntelliSense tốt hơn, code JSX hoàn thiện tốt hơn. Hãy xem ảnh 

![](https://miro.medium.com/max/936/1*q3Wamxbet5uqQQD-OsBf0Q.gif)


# III. Typescript hỗ trợ mặc định cho các thư viện phổ biến 

Nếu bạn đã sử dụng Typescript vài năm trước, bạn có thể cảm thấy khó khăn trong việc tìm kiếm thư viện hỗ trợ. Nhưng với việc Typescript trở nên phổ biến nhanh chóng cho tới hôm nay, hầu hết các thư viện thường được sử dụng đều hỗ trợ với việc định nghĩa Type. Bên cạnh đó, hệ sinh thái thư viện React đã hỗ trợ định nghĩa Type, nên bạn không cần lo lắng về điều đó nữa.



| Library Name| Type Script Support |
| -------- | -------- | 
| Redux| YES |
| Enzyme| YES |
| React Bootstrap| YES |
| MATERIAL-UI| YES |
| Redux saga| YES |
| Redux Thunk| YES |
| React Testing Library| YES |
| Styled Components| YES |
| Reach Router| YES |
| React Router| YES |

# IV. Áp dụng dần cho các dự án hiện có 

Với Typescript, bạn không thể nói là bạn thích dùng hay không. Thay vào đó hãy thích nghi dần, phụ thuộc vào điều kiện hiện tại của dự án. Giả sử bạn quyết định sử dụng Typescript cho dự án hiện tại, thì bạn cần xem xét cách bạn có thể sử dụng Javascript và Typescript cạnh nhau để tăng dần mức độ bao phủ của Typescript lên dự án.

Bên cạnh đó, bạn có thể cấu hình trình compile TypeScript để chuyển đổi dần dần. Để biết thêm, tham khảo các option list config [tại đây](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

# V. Lợi ích kèm với tính tăng check Static type và IntelliSense

**Static Type checking**

![](https://miro.medium.com/proxy/1*gX5S0flgG_CNtYOLNV6LTg.gif)

Kiểm tra static type giúp chúng ta phát hiện lỗi sớm hơn. Ví dụ trên xác định rằng chính xác là function getDetail yêu cầu 1 chuỗi làm đối số chứ không phải 1 số

**Better IntelliSense**

![](https://miro.medium.com/proxy/1*Nfq64EUcOwm6sSCipBPBYw.gif)

Khi chúng tôi thực hiện kiểm tra kiểu static Type và IntelliSense cùng với nhau, mang lại sự chính xác 100%

**Better Refactoring**

Với Typescript, việc tái cấu trúc dễ dàng hơn nhiều vì chúng ta biết chính xác các Type và nơi chúng thay đổi. Và phát hiện sớm ra rằng có điều gì đó không ổn để không xảy ra sai sót.

**Ít lỗi undefined errors hơn**

Nguy cơ xuất hiện các lỗi undefined errors trong runtime ít hơn vì trình biên dịch của Typescript đã phát hiện ra chúng theo thời gian 

**Khả năng đọc và bảo trì tốt hơn**

Với định nghĩa Type, codebase sẽ dễ đọc hiểu hơn rất nhiều. Bạn có thể dễ dàng tuân theo các nguyên tắc lập trình hướng đối tượng và sử dụng các cấu trúc như interface và cấu trúc code của bạn 

# VI. Tổng kết 

Cảm ơn bạn đã đọc bài viết này. Kết luận, chúng ta có thể cân nhắc thêm cho việc sử dụng Typescript vào dự án React của mình. Bạn cũng có thể cân nhắc chuyển dự án React hiện có của mình sang Typescript

Cheers !!! Happy Coding !!!