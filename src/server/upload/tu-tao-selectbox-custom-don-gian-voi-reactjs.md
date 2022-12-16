> *Lưu ý: Bài viết chống chỉ định với dev ReactJS đã có nhiều kinh nghiệm* :D

Khi chúng ta xây dựng 1 trang web với ReactJS thì chắc hẳn không thể thiếu `selectbox`, một thành phần quan trọng và xuất hiện thường xuyên trong `form`. Nếu về mặt design không có yêu cầu gì quá đặc biệt thì vấn đề khá đơn giản, ta chỉ cần dùng thành phần `selectbox` mặc định mà HTML cung cấp là xong. 

Nhưng sẽ có vấn đề 1 chút khi designer vẽ ra `selectbox` không giống mặc định mà không giống mặc định, thêm thắt nhiều chi tiết nhỏ để nhìn cho lạ mắt. Thường thì giải pháp của dev sẽ là tìm đến các thư viện, một số thư viện phổ biến như là **atn-design** hoặc **reactstrap**... Và vấn đề thường gặp phải sẽ là:
- Không thể dùng `selectbox` mặc định của HTML, vì các thẻ `option` trong HTML không thể dùng CSS để style được.
- Khi dùng thư viện thì họ viết cấu trúc HTML, class theo cách của họ nên rất khó override, custom được style sao cho giống như design nhất, chưa kể là code CSS của mình nhìn sẽ rất xấu vì phải phụ thuộc vào cấu trúc CSS của thư viện.

Vì vậy, để giải quyết tốt 2 vấn đề trên thì cách tốt nhất là chúng ta tự tạo 1 Selectbox dưới dạng component của React. Hãy bắt đầu ngay thôi :)

### Tạo component
Đầu tiên, mình sẽ có 1 component đơn giản như sau:

```
import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
library.add(faRunning);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const data = [
  {
    sportType: faRunning,
    sportTitle: 'Running',
  },
  {
    sportType: faSkating,
    sportTitle: 'Skating',
  },
  {
    sportType: faSnowboarding,
    sportTitle: 'Snow boarding',
  },
  {
    sportType: faSwimmer,
    sportTitle: 'Swimming',
  }
];

 class SelectCustom extends Component {
   render() {
    return (
      <div className='option-custom'>
        <div className='select-input'>
          <FontAwesomeIcon className='select-icon' icon={faRunning} />
          <span className='select-title placeholder'>Default title</span>
        </div>
          <div className='select-list'>
            {data.map((item, index) => (
              <div
                key={index}
                className='select-item'
              >
                <FontAwesomeIcon className='select-icon' icon={item.sportType} />
                <span className='select-title'>{item.sportTitle}</span>
              </div>
            ))}
          </div>
      </div>
    );
  }
}

 export default SelectCustom;
```

Theo cấu trúc HTML ở trên thì ta sẽ có 2 thành phần, thẻ div có class `select-input`  để thay thể cho thẻ `select` và 1 div chứa list danh sách các option thay thế cho thẻ `option` mặc định của HTML. 

*Lưu ý: Ở trên mình có dùng font-awesome để thêm các icon cho sinh động, các bạn có thể tìm hiểu thêm cách sử dụng cho React ở [đây](https://fontawesome.com/how-to-use/on-the-web/using-with/react)*

Vì `selectbox` sẽ là 1 dạng common component, cho nên ta cần phải tách phần `data` riêng lẻ ra để khi tái sử dụng, data cần phải được truyền thông qua `props`. Giả sử ta sử dụng component ``SelectCustom`` trong component `Form` như sau:
```
import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRunning, faSkating, faSnowboarding, faSwimmer } from '@fortawesome/free-solid-svg-icons';
library.add(faRunning, faSkating, faSnowboarding, faSwimmer)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SelectCustom from './SelectCustom';

const data = [
  {
    sportType: faRunning,
    sportTitle: 'Running',
  },
  {
    sportType: faSkating,
    sportTitle: 'Skating',
  },
  {
    sportType: faSnowboarding,
    sportTitle: 'Snow boarding',
  },
  {
    sportType: faSwimmer,
    sportTitle: 'Swimming',
  }
];

 class SelectCustom extends Component {
   render() {
    return (
      <SelectCustom
        data={data}
        placeholder='Please select the sport'
      />
    );
  }
}

 export default Form;
```
...và cũng cần 1 chút CSS style lại để nhìn cho đẹp hơn :D
```
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
  font-family: 'Roboto', sans-serif;
}

.option-custom {
  position: relative;
}

.select-input {
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 0 10px;
  position: relative;
  height: 42px;
}

.select-input::before {
  position: absolute;
  content: '';
  right: 8px;
  top: 18px;
  border-top: 5px solid #252525;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}

.select-icon {
  font-size: 20px;
  margin-right: 5px;
  color: #84ce3f;
  flex-basis: 30px;
}

.select-title {
  color: #252525;
}

.select-title.placeholder {
  color: #ccc;
}

.select-list {
  border: 1px solid #ccc;
  border-top: none;
}

.select-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
}

.select-item:hover {
  background: #eee;
}
```

Cuối cùng là việc handle các trường hợp như: khi người dùng chưa chọn gì thì ta nên hiển thị dưới dạng `placeholder`, khi click vào ô selectbox thì các option sẽ show ra, khi chọn 1 trong các option thì option list sẽ tự động đóng lại và data trong ô input sẽ thay đổi tương ứng....

Cuối cùng, code của component `SelectCustom` sẽ như dưới đây:
```
import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

 class SelectCustom extends Component {
  state = {
    defaultType: '',
    defaultTitle: '',
    isOpen: false
  };

   handleSelect = (sportType, sportTitle) => {
    if (!this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      defaultType: sportType,
      defaultTitle: sportTitle,
    }));
  };

   handleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

   handleOutsideClick = () => {
    this.handleSelect();
  };

   render() {
    const { data, placeholder } = this.props;
    const { defaultType, defaultTitle } = this.state; 

    return (
      <div className='option-custom'>
        <div className='select-input' onClick={this.handleOpen}>
          <FontAwesomeIcon className='select-icon' icon={defaultType} />
          <span className={`${placeholder && defaultTitle==='' ? 'select-title placeholder' : 'select-title'}`}>{defaultTitle === '' ? placeholder : defaultTitle}</span>
        </div>

         {this.state.isOpen ?
          <div className='select-list'>
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => this.handleSelect(data[index].sportType, data[index].sportTitle)}
                className='select-item'
              >
                <FontAwesomeIcon className='select-icon' icon={item.sportType} />
                <span className='select-title'>{item.sportTitle}</span>
              </div>
            ))}
          </div>
          : ''
        }
      </div>
    );
  }
}

 export default SelectCustom;
```

Mọi người có thể check code demo ở [đây](https://stackblitz.com/edit/react-tcevhk) để hiểu rõ hơn nhé!

Trên đây là 1 bài viết ngắn chia sẻ 1 vài kiến thức nhỏ về ReactJS, mong rằng nó sẽ có ích cho mọi người :)

Xin cảm ơn và hẹn gặp lại ở những bài viết tiếp theo!