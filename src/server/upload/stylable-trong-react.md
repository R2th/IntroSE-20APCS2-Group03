# Stylable trong react là gì ? 
Stylable là 1 thư viện thứ 3 nạp từ bên ngoài vào , hướng component như styled-components. Stylable là một bộ tiền xử lý CSS cho phép bạn viết các thành phần có thể tái sử dụng lại, có hiệu suất cao

# Cài đặt Styable 
- **Sử dụng npm**
```
npm install stylable @stylable/webpack-plugin --save-dev
```

- **Sử dụng yarn **
```
yarn add stylable @stylable/webpack-plugin --dev
```

- Build configuration
**Add Stylable to your Webpack configuration as follows:**

```
onst StylableWebpackPlugin = require('@stylable/webpack-plugin');
...
{
    module: {
        rules: [
        {
            test: /\.(png|jpg|gif)$/,
            use: [
            {
                loader: "url-loader",
                options: {
                    limit: 8192
                }
            }
            ]
        }
        ]
    }
    plugins: [
        new StylableWebpackPlugin()
    ]
}
```

# Style a component
```
/* button.jsx */
import * as React from 'react';
import style from './button.st.css';

class Button {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <button { ...style('root', {}, this.props) } >
                <span className={style.icon} />
                <span className={style.label} >Submit</span>
            </button>
        );
    }
}
```

```
/* button.st.css */

/* 
note that all of these classes are placed manually on the DOM using the Stylable integration in the component logic, in this case, button.tsx
*/
.root { 
    background: #b0e0e6;
}

.icon {
    /* set image height and display: block */ 
    background-image: url('./assets/btnIcon.svg');
}

.label {
    font-size: 20px;
    color: rgba(81, 12, 68, 1.0)
}
```

Các bạn quan sát ví dụ sau mình sẽ giải thích như sau
```
<button { ...style('root', {}, this.props) } >
                <span className={style.icon} />
                <span className={style.label} >Submit</span>
</button>
```

Sau khi chạy ứng dụng được run lên thì button sẽ có mã màu là **background: #b0e0e6;**,    **style.icon**  thì nó sẽ load background btnIcon vào chỗ icon , **style.label** thì sẽ có  **font-size: 20px,  color: rgba(81, 12, 68, 1.0)**

# Extends trong Components
```
/* panel.jsx */
import * as React from 'react';
import { Button } from '../button';
import style from './panel.st.css';

export const Panel = () => (
    <div { ...style('root', {}, this.props) } >
        <Button className={style.cancelBtn} />
    </div>
);
```

```
/* panel.st.css */
:import {
    -st-from: './button.st.css';
    -st-default: Button;
}
.root {}

/* cancelBtn is of type Button */
.cancelBtn { 
    -st-extends: Button;
    background: cornflowerblue;
}
```
- Mình sẽ giả thích  **-st-extends: Button**  có nghĩa mình đã có style css ờ file Button đã dùng chung , h mình kế thừa lại những thuộc tính chung của file Button 
- Ví dụ file  **Button.css**

```
.cancelBtn { 
    font-size: 20px;
    color: 16px;
    padding: 5px 10px
}
```

- File **panel.st.css** 

```
.cancelBtn { 
    -st-extends: Button;
    background: cornflowerblue;
}
```

Thì sau khi run code lên nó sẽ cho mình ra output như sau: 
```
.cancelBtn { 
    font-size: 20px;
    color: 16px;
    padding: 5px 10px;
     background: cornflowerblue;
}
```

# Tổng kết 
Qua những gì mình trình bày mình hi vọng các bạn biết thêm để vận dụng vào dự án thực tế  để viết CSS  một cách hiệu quả và có thể sử dụng   **Stylable**  thay cho **Styled components** .

# Tài liệu tham khảo 
- Link :  https://stylable.io/docs/guides/components-basics