### Tại sao cần tự động generate code theo templates?
Trong công việc lập trình hàng ngày, lập trình viên thường xuyên phải khởi tạo những đoạn code tương tự đặc biệt là khi dự án mới bắt đầu (khởi tạo các components, containers, routes, modules, .... ). Việc thực hiện lặp đi lặp lại các công việc trên không khó khăn về mặt kỹ thuật tuy nhiên lại gây ra sự tốn công sức khá nhiều. Khi dự án càng mở rộng thì công sức bỏ ra cho việc khởi tạo lại càng lớn.  Do đó việc tạo ra một công cụ giúp khởi tạo các đoạn code lặp lại dựa trên một template có sẵn là cần thiết để tiết kiệm công sức của cả đội trong quá trình phát triển dự án.

### Plop
Plop là một micro-generator framework được viết bằng javascript. Nó là một công cụ hiệu quả giúp tạo ra cấu trúc mã nguồn của dự án cũng như tự động sinh các đoạn mã nguồn dựa trên các mẫu như việc khởi tạo các routes, controllers, helpers, ... Việc tự động sinh ra những đoạn code theo cấu trúc sẵn có giúp tăng tốc độ cũng như độ chính xác, hạn chế những lỗi mắc phải cũng như tuân thủ được quy tắc thống nhất chung trên cả dự án.

Plop được thiết kế để generate các đoạn code theo một quy tắc thống nhất chung bằng việc trả lời các câu hỏi trên màn hình terminal.

![](https://images.viblo.asia/80c91d81-9efc-4287-b633-5a4b09447bab.gif)

Để cài đặt Plop ta có thể cài đặt thông qua npm:
```javascript
npm install --save-dev plop
```
hoặc 
``` javascript
npm install -g plop
```

Chúng ta sẽ cùng tìm hiểu thông qua một ví dụ sau đây thông qua  việc generate một component trong dự án React:
Đầu tiên chúng ta cần định nghĩa generator:
```javascript
module.exports = {
    // Mô tả chức năng của generator
  description: 'Add an unconnected component',
  // Tạo ra một danh sách các tùy chọn các loại components
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      // Kiểm tra component đã tồn tại hay chưa
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }
        return 'The name is required';
      },
    },
    {
       // Xác nhận thông qua câu hỏi yes/no
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: data => {
  // Template tương ứng với các tùy chọn
    let componentTemplate;
    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './component/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './component/class.js.hbs';
      }
    }
    // Thực hiện việc tạo các file dựa trên template
    const actions = [
      {
        type: 'add',
        path: '../app/components/{{properCase name}}/index.js',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../app/components/{{properCase name}}/tests/index.test.js',
        templateFile: './component/index.test.js.hbs',
        abortOnFail: true,
      },
    ];
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../app/components/{{properCase name}}/messages.js',
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../app/components/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }
    actions.push({
      type: 'prettify',
      path: '/components/',
    });
    return actions;
  },
};

```
Trong một đối tượng generator ta cần chú ý đến thuộc tính:

`prompts` : dùng để định nghĩa cách thức generator hiển thị trên màn hình terminal . Plop sử dụng thư viện [inquirer.js](https://github.com/SBoudrias/Inquirer.js) cho việc thao tác với terminal. Các loại types có thể được tham khảo tại [prompt types](https://github.com/SBoudrias/Inquirer.js/#prompt-types)

`actions`:  thực hiện các hành động cho việc generate như add file, update, ... dựa trên dữ liệu thông qua promps. Có thể tham khảo tại [Plop build-in actions](https://plopjs.com/documentation/#built-in-actions)

Một generator được đăng ký sử dụng trong plopfile.js thông qua Api plop.setGenerator:

```javascript
module.exports = plop => {
  plop.setGenerator('component', componentGenerator); // componentGenerator là generator đã được định nghĩa ở trên
 }
```
Ngoài ra ta có thể tạo ra các helpers hoặc sử dụng built-in helpers cũng như custom các actions thông qua việc sử dụng các Api mà Plop cung cấp [Plop main-methods](https://plopjs.com/documentation/#main-methods)

Một template được viết bằng template [handlebarjs](https://handlebarsjs.com/) dưới định dạng file .hbs như sau:
```javascript
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
{{#if wantMessages}}
import { FormattedMessage } from 'react-intl';
import messages from './messages';
{{/if}}

{{ properCase name }}.propTypes = {};

export default () => (
  <div>
  {{#if wantMessages}}
    <FormattedMessage {...messages.header} />
  {{/if}}
  </div>
);
```

##### Link source code: [Here](https://github.com/VuPhong95663/demo-plop)

### Tài liệu tham khảo:
[The Cost of Context Switching](https://medium.com/@nicoespeon/plop-a-micro-generator-to-ease-your-daily-life-7767f0a34db)

[Plop Documentation](https://plopjs.com/documentation/)

[Plop − a micro-generator to ease your daily life](https://medium.com/@nicoespeon/plop-a-micro-generator-to-ease-your-daily-life-7767f0a34db)