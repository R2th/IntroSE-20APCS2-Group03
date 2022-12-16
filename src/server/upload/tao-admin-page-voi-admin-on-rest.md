Việc xây dựng trang admin có  nhiều framework khác nhau có thể hỗ trợ, việc sử dụng framawork sẽ tiết kiệm được công sức và thời gian.

Admin-on-rest là một framwork được xây dựng trên nguồn cảm hứng của ng-admin 

Admin-on-Rest cho phép xây dựng trang admin trên REST service sử dụng ES6, React và giao diện material design

# Các tính năng 

* Đáp ứng được với mọi  REST backend
* Tối ưu hoá việc render
* Hỗ trợ quan hệ (many to one, one to many) 
*  Internationalization (i18n)
* Full-featured Datagrid (sort, pagination, filters)
* Connect tới nhiều backend
* Dễ dàng custom 
* …..

# Cài đặt
Ta sẽ sử dụng `create-react-app` của facebook để tạo ra một react app và cài đặt admin-on-rest

Tôi sẽ viết chung phần back-end và front này trong cùng project 

Đầu tiên tạo ứng dụng rails 
```
rails new vk_shop
```


```

npm install -g create-react-app
create-react-app vk_shop_client
cd vk_shop_client
yarn add admin-on-rest
yarn start
```

Với cấu trúc thư mục như sau

![](https://images.viblo.asia/c3f759fc-e416-4b05-8dba-565ca416d912.png)

Chú ý là khi chạy `yarn start` thì client của bạn sẽ chạy cổng 3000 nên khi chạy server bạn phải chọn port khác, và tôi chọn 3001 

```
rails s -p 3001
```

Chú ý vì đây là gọi cors domain nên phía server phải cài đặt thêm gem 


```
gem 'rack-cors', require: 'rack/cors'
```

```
#config/application.rb
        expose: [
          'X-Total-Count',
        ]
```
Vì response header của admin-on-rest phải xử dụng ‘X-Total-Count’ để cho việc phân trang, nên dữ liệu trả về từ list page phải response header này


# <Admin> Component
<Admin> component tạo ra một ứng dụng với state, routing và controller login
Trong một `<Admin>` component cần phải có prop restClient và ít nhất một <Resorce> component bên trong

## restClient
Đây lầ một prop bắt buộc phải có của admin component, nó phải là một function trả về promise
```
const restClient = (type, resource, params) => new Promise();
```
Bạn cũng có thể sửa header, authentication từ restClient 

## theme
Bạn có thể tuỳ biến sử dụng fonts, colors space, cho theme của mình. Và sử dụng theme bằng props theme

```
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const App = () => (
    <Admin theme={getMuiTheme(darkBaseTheme)} restClient={simpleRestClient('http://path.to.my.api')}>
        // ...
    </Admin>
);
```
Ngoài ra thì còn rất nhiều các props khác của admin component: 

* title
* dashboard
* catchAll
* menu
* theme
* appLayout
* customReducers
* customSagas
* customRoutes
* authClient
* loginPage
* logoutButton
* locale
* messages
* initialState
* history

https://marmelab.com/admin-on-rest/Admin.html

# Resource component 

`<Resouce>` component sẽ map tương ứng với api CRUD 

Ví dụ resouce name là `orders`  `http://localhost:3001/orders`

```
// in src/App.js
import React from 'react';
import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';
import { OrderList } from './orders.js;

const App = () => (
    <Admin restClient={jsonServerRestClient('http://localhost:3001')}>
        <Resource name="orders" list={OrderList} />
    </Admin>
);
```
`<Resource>` cho phép định nghĩa một component cho mỗi CRUD, thông qua prop names 
* list
* create
* edit
* show
* remove

```
<Resource name="orders" list={OrderList} create={OrderCreate}  edit={OrderEdit}/>
```


## Name

admin-on-rest sử dụng name với  2 mục đích là để xác định api endpoint và để hình thành url cho resource 

Ví dụ 
```
        <Resource name="orders" list={OrderList} create={OrderCreate}  edit={OrderEdit}/>
```
Resource này sẽ lấy từ api `http://localhost:3001/orders` với các url tương ứng

/orders/ maps to OrderList
/orders/create maps to OrderCreate
/orders/:id maps to OrderEdit
/orders/:id/show maps to OrderShow
/orders/:id/delete maps to OrderRemove
Nếu bạn muốn sử dụng một endpoint nào đó mà không muốn sửa url của routes thì chỉ cần mapping resource name `orders` tới api endpoind bằng restClient

Example 

```
//App.js
import React from 'react';
import { jsonServerRestClient, Admin, Resource , Delete} from 'admin-on-rest';
import { StaffList, StaffCreate, StaffEdit } from './staffs';
import { OrderList, OrderCreate, OrderEdit } from './orders';
import authClient from './authClient';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



const App = () => (
    <Admin theme={getMuiTheme(darkBaseTheme)}  restClient={jsonServerRestClient('http://localhost:3001')} authClient={authClient}>
        <Resource name="orders" list={OrderList} create={OrderCreate}  edit={OrderEdit}/>
        <Resource name="staffs" list={StaffList} create={StaffCreate}   />
    </Admin>
);

export default App;

```

```
//orders.js
// in src/staffs.js
import React from 'react';
import {NumberInput,DateInput, NumberField, DateField, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput, EmailInput } from 'admin-on-rest';


export const OrderList = (props) => (
    <List title="All Orders" {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="fb_url" />
            <DateField source="order_time" showTime/>
            <TextField source="phone" />
            <TextField source="address" />
            <TextField source="size" />
            <TextField source="product_id" />
            <NumberField source="original_price" />
            <NumberField source="shipping_fee" />
            <NumberField source="total_price" />
            <TextField source="shipping_code" />
            <TextField source="shipping_method" />
            <TextField source="order_status" />
            <TextField source="user_order_info" />
            <TextField source="note" />
            <TextField source="staff_id" />
            <EditButton />
        </Datagrid>
    </List>
);

export const OrderCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
          <TextInput source="name" label="Name" validate={required} />
          <TextInput source="fb_url" validate={required} />
          <DateInput source="order_time" options={{

          }}/>
          <TextInput source="phone" validate={required} />
          <TextInput source="address" validate={required} />
          <TextInput source="size" />
          <TextInput source="product_id" />
          <NumberInput source="original_price" />
          <NumberInput source="shipping_fee" />
          <NumberInput source="total_price" />
          <TextInput source="shipping_code" />
          <TextInput source="shipping_method" />
          <TextInput source="order_status" />
          <TextInput source="user_order_info" />
          <LongTextInput source="note" />
          <TextInput source="staff_id" />
        </SimpleForm>
    </Create>
);

const OrderTitle = ({ record }) => {
    return <span>Order {record ? `"${record.name}"` : ''}</span>;
};

export const OrderEdit = (props) => (
  <Edit title={<OrderTitle />}  {...props}>
    <SimpleForm>
      <DisabledInput label="Id" source="id" />
      <TextInput source="name" label="Name" validate={required} />
      <TextInput source="fb_url" validate={required} />
      <DateInput source="order_time" options={{

      }}/>
      <TextInput source="phone" validate={required} />
      <TextInput source="address" validate={required} />
      <TextInput source="size" />
      <TextInput source="product_id" />
      <NumberInput source="original_price" />
      <NumberInput source="shipping_fee" />
      <NumberInput source="total_price" />
      <TextInput source="shipping_code" />
      <TextInput source="shipping_method" />
      <TextInput source="order_status" />
      <TextInput source="user_order_info" />
      <LongTextInput source="note" />
      <TextInput source="staff_id" />
    </SimpleForm>
  </Edit>
);

```

Một số chú ý về phần server-side
trong action index response header phải trả về X-Total-count
```
  def index
    response.headers["X-Total-Count"] = Order.all.size
    render json: Order.all
    # data trả về phải là mảng
  end
```
Detail: https://github.com/khanhhd/vk_shop

## Nguồn 
Bài viết xây dựng admin SPAs dựa trên nguồn https://marmelab.com/admin-on-rest/