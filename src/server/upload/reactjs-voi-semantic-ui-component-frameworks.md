Trong quá trình xây dựng project việc lựa chọn một Front-end framework đảm nhận việc xử lý phần UI là không thể nếu ta muốn có một giao diện đẹp và tiết kiệm thời gian. Trong lập trình front-end thuần túy ta thấy rất nhiều sự lựa chọn là Bootstrap, Foundation, Material UI .., trong Reactjs sự lựa chọn nhiều ta nhận thấy là Bootstrap, Material-UI, Ant ... Nhưng nếu muốn tìm hiểu thêm hay có một sự thay đổi khác biệt hơn có thể apply thử Semantic UI framework.

## Install
```
# Sử dụng npm 
npm install semantic-ui

# sử dụng Bower
bower install semantic-ui

```
## Một số Component hay dùng
### Sử dụng button
```
import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonExampleButton = () => <Button>Demo button</Button>

export default ButtonExampleButton
```
Đối với semantic-ui ngoài việc truyền các props như color, type có thể truyền vào các animation:
```
   <Button animated>
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
```
[Link codepend](https://codepen.io/anon/pen/WPbVqZ?editors=0010)

- Button dạng Labeled
 + Rất thích hợp với style social.

```
   <Button
      content='Like'
      icon='heart'
      label={{ as: 'a', basic: true, content: '2,048' }}
      labelPosition='right'
    />
    <Button
      content='Like'
      icon='heart'
      label={{ as: 'a', basic: true, pointing: 'right', content: '2,048' }}
      labelPosition='left'
    />
    <Button icon='fork' label={{ as: 'a', basic: true, content: '2,048' }} labelPosition='left' />
```
[Link Codepend](https://codepen.io/anon/pen/MLYNvE)

Đối với loại button thằng semantic-ui có rất nhiều kiểu style cho mình lựa chọn.

### Input
**Input component của semantic UI cũng cho ta nhiều lựa chọn stlyle**
- Kiểu Fluid search
```
import React from 'react'
import { Input } from 'semantic-ui-react'

const InputExampleFluid = () => <Input fluid icon='search' placeholder='Search...' />

export default InputExampleFluid
```
hoặc mình có thể lựa chọn size phù hợp với tùy chỉnh props:
```
import React from 'react'
import { Input } from 'semantic-ui-react'

const InputExampleSize = () => (
  <div>
    <Input size='mini' icon='search' placeholder='Search...' />
    <br />
    <br />
    <Input size='small' icon='search' placeholder='Search...' />
    <br />
    <br />
    <Input size='large' icon='search' placeholder='Search...' />
    <br />
    <br />
    <Input size='big' icon='search' placeholder='Search...' />
    <br />
    <br />
    <Input size='huge' icon='search' placeholder='Search...' />
    <br />
    <br />
    <Input size='massive' icon='search' placeholder='Search...' />
  </div>
)

export default InputExampleSize
```

[Link codepen.io](https://codepen.io/anon/pen/exNJOW?editors=1010)

### Form
- Form cũng được chia làm nhiều loại cho thấy được sự đa dạng từ Default, Form.Button, Form.Checkbox, Form.Dropdown ... Form.TextArea.
```
# Form 

     <Form>
        <Form.Group widths='equal'>
        <Form.Field control={Input} label='First name' placeholder='First name' />
        <Form.Field control={Input} label='Last name' placeholder='Last name' />
        <Form.Field control={Select} label='Gender' options={options} placeholder='Gender' />
        </Form.Group>
        <Form.Group inline>
          <label>Quantity</label>
          <Form.Field
            control={Radio}
            label='One'
            value='1'
            checked={value === '1'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='Two'
            value='2'
            checked={value === '2'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label='Three'
            value='3'
            checked={value === '3'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field control={TextArea} label='About' placeholder='Tell us more about you...' />
        <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
```

### Image
- Với nhiều sự lựa chọn kích thước khác nhau
```
#Small
<Image src='/images/wireframe/image.png' size='small' wrapped />

#Medium + link
<Image
    src='/images/wireframe/image-text.png'
    as='a'
    size='medium'
    href='http://google.com'
    target='_blank'
  />

# Full
<Image src='/images/wireframe/image.png' fluid />

```
### Link tham khảo
Semantic UI React cũng là một sự lựa chọn không tồi vì hỗ trợ rất đầy đủ các component mà mình cần thiết để xây dựng project tiết kiệm thời gian bên cạnh các sự lựa chọn quen thuộc như Bootstrap hay  Foundation, Material UI.
https://github.com/semantic-org/semantic-ui/