Xin chào các bạn. Dạo gần đây, nhà nhà người người đều đổ xô đi học React. Mình cũng tò mò tại sao react hot đến vậy nên vô docs và bắt đầu thử sức luôn.
Tìm hiểu được 1 thời gian thì các anh GL có tổ chức training và làm 1 project để demo. Không có gì đáng nói nếu như mình không gặp một số bugs củ chuối. Báo lỗi lại lung tung nên mình không biết đâu mà lần @@
Có bugs mình tìm hiểu mất gần buổi sáng. Bực quá, chỉ vì truyền props bị sai kiểu. Lúc đó nhờ có ông anh ngồi ngay đằng sau để xin chỉ giáo mà mình biết được react có 1 package là **prop-types** để validate đống props và vả vào mặt mình 1 cái báo lỗi để mình chỉnh sửa lại props cho đúng. Nói thế thôi chứ mình thích package này lắm, đỡ phải ăn hành bởi đống bugs ngớ ngẩn do truyền sai props. Nếu các bạn chuyển từ C#, C hay Java sang Js thì đúng là khó chịu lắm với kiểu khai báo biến mà không có kiểu dữ liệu. Chính từ đó mà khi dùng biến đó ở chỗ khác thì mình không còn nhận ra nó thuộc kiểu nào nữa. Trong React thì còn bị lãng quên nhiều hơn khi truyền qua props của hàng đống components. Cùng mình tìm hiểu nhé.
# Cách thêm typechecking cho components
Thực sự dễ luôn các ông ạ, giả sử các ông có data như này nhé (hình dưới)

![](https://images.viblo.asia/9d988956-165b-4559-a57c-f4c48cfe7613.png)

ô tô kê, giờ có 2 file như này ListPets.js và Pet.js
```ListPet.js
import React, { Component } from 'react';
import Pet from './Pet';

class MyPets extends Component {

    state = {
        pets: [
            {id:1, name: 'fluffy', color: 'white', age: 6, type: 'dog' },
            {id:2, name: 'molly', color: 'brown', age: 9, type: 'cat' },
            {id:3, name: 'buster', color: 'black', age: 3, type: 'dog' },
            {id:4, name: 'grant', color: 'black', age: 6, type: 'cat' },
            {id:5, name: 'pepsi', color: 'grey', age: 4, type: 'dog' },
            {id:6, name: 'winston', color: 'brown', age: 8, type: 'dog' },
            {id:7, name: 'sprite', color: 'white', age: 10, type: 'cat' },
            {id:8, name: 'oscar', color: 'grey', age: 2, type: 'dog' },
            {id:9, name: 'bumper', color: 'black', age: 12, type: 'dog' },
            {id:10, name: 'happy', color: 'white', age: 11, type: 'dog' },
            {id:11, name: 'speedy', color: 'black', age: 9, type: 'cat' }
        ],
        title: 'my pets'
    }


    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <ul>
                    {this.state.pets.map(pet => (<Pet key={pet.id} pet={pet} />))}
                </ul>
            </div>
        );
    };
}

export default MyPets
```

```Pet.js
import React from 'react';

//functional stateless component
const Pet = (props) => {
    return (
        <li>{`${props.pet.name} is ${props.pet.color} and is ${props.pet.age} years old.`}</li>
    );
}

export default Pet
```

Kịch bản đơn giản là ListPet sẽ truyền props qua Pet để hiển thị tương ứng với dữ liệu.

Giờ nếu tôi chỉnh sửa dòng **29** của file ListPets thành
```Line_29_ListPet.js
{this.state.pets.map(pet => (<Pet key={pet.id} pet={pet.name} />))}
```
âu sít, ta sẽ gặp 1 bugs kiểu như này:

ListPets: tôi truyền đủ props rồi nhé, ông hiển thị đi nhá
Pet: tui cần 1 object, cơ, ông truyền cái gì thế tui không hiểu

![](https://images.viblo.asia/ef976955-b402-4567-a32f-8e149be3481a.png)

Rồi luôn. Lúc mình gặp lỗi này mình sẽ nghĩ: ơ mình truyền đúng mà. 
Vâng đúng cái beep. Underfind 1 núi :v 
Cơ mà đáng nói là bật console lên thì lại méo thấy lỗi, huhu giờ sao. Báo lỗi mới biết sửa chứ nhỉ.
Lúc này chúng ta cần 1 dòng báo lỗi là mọi chuyện ez ngay. Cảm cúm có tiffy thì validate props có **prop-types**
```Pet.js
import React from 'react';
import PropTypes from 'prop-types';

//functional stateless component
const Pet = (props) => {
    return (
        <li>{`${props.pet.name} is ${props.pet.color} and is ${props.pet.age} years old.`}</li>
    );
}

// setup typechecking 
Pet.propTypes = {
    pet: PropTypes.object
};

export default Pet
```

Với 1 đoạn setup trên thì khi gọi component Pet, nó sẽ vả ngay cho chúng ta 1 dòng báo lỗi khi truyền sai props như sau:
![](https://images.viblo.asia/6f14338a-5612-40e3-86b6-a795f14f0bbd.png)

Okay, và thế là ta đã có thể nhận ra sự bất cẩn khi truyền sai props.
Giờ ta sửa lại cho đúng props mà component Pet mong muốn là ta sẽ có danh sách Pets yêu quý của ta hiện lên
![](https://images.viblo.asia/61d3eff5-ccae-401b-aad2-54714f525f45.png)

# Tổng kết

1. Javascript là ngôn ngữ không cung cấp định kiểu dữ liệu
2. Prop-types là 1 cách đơn giản để giảm thiểu lỗi truyền sai dữ liệu.
3. Với Prop-types, ta sẽ biết ngay Component con cần loại dữ liệu nào để hiển thị đúng.
4. Đừng quên import thư viện trước khi dùng nhé :v 

Các bạn có thể đọc thêm ở docs nhá https://reactjs.org/docs/typechecking-with-proptypes.html

**# Tham khảo**
https://medium.com/dailyjs/how-to-add-typechecking-to-your-react-components-223c5560ba58