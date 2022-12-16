**Trong 1 bài viết ở lần trước, mình đã giới thiệu đến mọi người cách tạo một selectbox đơn giản bằng ReactJS, các bạn quan tâm thì có thể xem qua bài viết ở [đây](https://viblo.asia/p/tu-tao-selectbox-custom-don-gian-voi-reactjs-gDVK29Lw5Lj) nhé.**

Tiếp tục với ví dụ trên, hôm nay mình sẽ làm tiếp 1 ví dụ khác nữa cũng liên quan đến selectbox, nhưng lần này sẽ là 1 multi select, tức là có thể chọn nhiều option, giống như mô tả dưới đây:

![](https://images.viblo.asia/69d572e6-7d3b-435f-a4ab-5e06a9b90216.gif)

**Một multi select sẽ có những đặc điểm sau đây. Ví dụ:**

- Data sẽ do người dùng truyền vào thông qua props
- Mỗi item trong list data khi đã được chọn và fill vào trong input thì item đó cũng đồng thời sẽ bị remove khỏi list data.
- Mỗi item khi đã được fill vào input box cũng sẽ có tuỳ chọn cho người dùng remove đi, đồng thời khi remove thì item đó cũng sẽ hiển thị trở lại trong list data

Với những tính năng trên, chúng ta hãy bắt đầu vào việc xây dựng component ngay thôi nào!

### Tạo component

Đầu tiên, mình sẽ có 1 component như dưới đây:

```javascript
import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

 class MultiSelect extends Component {
  state = {
    isOpen: false,
    isSelected: false,
    listSelected: [],
  };

  handleSelect = (sportType, title) => {
    const {listSelected} = this.state;

    if (!this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      isSelected: true,
      listSelected: listSelected.concat(title),
    }));
  };

  handleRemoveItem(index) {
    const { listSelected } = this.state;
    listSelected.splice(index, 1);
    this.setState({
      listSelected: listSelected
    });
  }

  handleOpen = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

   handleOutsideClick = () => {
    this.handleSelect();
  };

  filterData = () => {
    const { data } = this.props;
    const { listSelected } = this.state;

    return data.filter(item => !listSelected.find(title => item.sportTitle === title))
  }

   render() {
    const { placeholder } = this.props;
    const { defaultTitle, listSelected, isSelected, isOpen } = this.state;
    const filteredData = this.filterData();

    return (
      <div className='option-custom'>
        <div className='select-input select-input--multiple' >
          <div className='selected-list'>
            {listSelected.map((item, index) => (
              <div className='selected-item'>
                <span 
                  key={index} 
                >
                  {item === null ? placeholder : item}
                </span>
                <span onClick={() => this.handleRemoveItem(index)}>
                  <FontAwesomeIcon className='remove-icon' icon={faTimes} />
                </span>
              </div>
            ))}
            <div className="select-click" onClick={this.handleOpen} />
          </div>
        </div>

         {isOpen ?
          <div className='select-list'>
            {filteredData.map((item, index) => (
              <div
                key={index}
                onClick={() => this.handleSelect(filteredData[index].sportType, filteredData[index].sportTitle)}
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

 export default MultiSelect;
```

Theo cấu trúc HTML ở trên nhìn chung cũng sẽ tương đối giống như Selectbox ở bài trước, thì ta sẽ có 2 thành phần, thẻ div có class select-input để thay thể cho thẻ select và 1 div chứa list danh sách các option thay thế cho thẻ option mặc định của HTML.

Bên trong thẻ select cũng sẽ được tách ra làm 2 phần, 1 phần để fill data được chọn, phần còn lại để xử lý sự kiện khi click vào thì mới show data ra.

CSS cũng cần viết thêm chút ít cho phần multi select này, một số code đã viết cho phần Selectbox lần trước ta sẽ tận dụng lại, toàn bộ code CSS như dưới đây:

```css
.option-custom {
  position: relative;
  margin-bottom: 20px;
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

.select-input--multiple {
  height: auto;
  min-height: 42px;
  flex-wrap: wrap;
}

.select-click {
  flex: 1;
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

.selected-list {
  display: flex;
  flex-wrap: wrap;
  min-height: 42px;
  width: 100%;
}

.selected-item {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 5px;
}

.selected-item span {
  margin-right: 5px;
}
```

Mọi người có thể check code [demo](https://stackblitz.com/edit/react-tcevhk) ở đây để hiểu rõ hơn nhé!

Trên đây là 1 bài viết ngắn chia sẻ 1 vài kiến thức nhỏ về ReactJS, mong rằng nó sẽ có ích cho mọi người 😃

Xin cảm ơn và hẹn gặp lại ở những bài viết tiếp theo!