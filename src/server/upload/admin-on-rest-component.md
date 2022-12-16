# List view
List view hiển thị một list các record được fetch từ REST API về, List component sẽ chịu trách nhiệm truyền data tới view thông qua `<Datagrid>`, `<Datagrid>` compoent này lại tiếp tục render các thuộc tính của record thông qua `<Field>` compoent 

`<List>` component reder list layout (title, button, filters, pagination)

List là connected component còn `<Datagrid>` là dumb component

Các props được sử dụng trong `<List>` component 

* title
* actions
* filters 
* perPage
* sort
* filter 
* pagination

```
    <List title="All Orders" {...props}>
        <Datagrid>
            <TextField source="name" label="Customer Name"/>
            <TextField source="phone" />
            <DateField source="order_time" showTime/>
            <TextField source="address" />
            <ReferenceField label="Products" source="product_id" reference="products">
              <TextField source="name" />
            </ReferenceField>
            <NumberField source="total_price" />
            <TextField source="order_status" />
            <ShowButton />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>

```

## filter element 
Fitter component bắt buộc phải có input component bên trong

Ví dụ search số điện thoại theo từ bảng order

Server side

```
  def index
    orders = params[:phone].present? ? Order.where("phone like ?", "%#{params[:phone]}%") : Order.all
    response.headers["X-Total-Count"] = orders.size
    render json: orders
  end
```

```
const OrdersFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search Phone Number" source="phone" alwaysOn />
    </Filter>
);
```
```
export const OrderList = (props) => (
    <List title="All Orders" {...props} filters={<OrdersFilter />}>
…..
```

Filter với phone number: 

![](https://images.viblo.asia/ce70039a-48f4-44fa-82f9-fd94c17d17d7.png)

## Datagrid component 

Là một bảng để render các record , nó thường được sử  dụng bên trong List component và ReferenceManyField component 

Các prop sử dụng cho data grid component 

* styles
* rowStyle
* options
* headerOptions
* bodyOptions
* rowOptions

## SingleFieldList component
Nó cũng giống như Datagrid component , nhưng được sử dụng trong trường hợp nếu bạn không muốn show ra nhiều property của các record, và đặc biệt là nó hữu ích trong trường hợp sử dụng với ReferenceManyField  component 

Gỉa sử bạn muốn hiển thị tất cả các order của một product
```
<ReferenceManyField reference="orders" target="product_id">
    <SingleFieldList>
        <ChipField source="name" />
    </SingleFieldList>
</ReferenceManyField>
```
# Field component 
Component này sẽ hiển thị các property mà REST resource trả về, nó được sử dụng trong List view, Edit, Create view

TextField là 1 trong những component được sử dụng nhiều nhất

```
            <TextField source="name" label="Customer Name"/>
            <TextField source="phone" />
```
Tất cả các field component đều có các attributes sau: source, lable, addLable, sortable, elStyle, style, 
 
Có một số field component mà mà bạn nên chú ý đó là: 
## ReferenceField
Component này sẽ lấy các single reference record và hiển thị 1 field cho mỗi record 

Giải sử một order thuộc về 1 product chẳng hạn khi ta hiển thị mỗi order sẽ tương ứng với 1 product_id và ta muốn hiển thị tên product thay vì id
```
            <ReferenceField label="Products" source="product_id" reference="products">
                <TextField source="name" />
            </ReferenceField>
```
Sẽ gọi đến phương thức show của product controller nên phía server phải có phương thức show này
```
  def show
    render json: @product
  end
```
Mỗi lần lặp một order sẽ tương ứng với với 1 request tới action show của product controller (N+1 query ) điều này có vẻ không được tốt lắm cho performance.

Nhưng vì có phân trang nên có thể chấp nhận được khi lấy ra 10 record trên mỗi trang thì tổng mỗi số queries là 11, có thể chấp nhận được

Log server side:
```
(0.4ms)  SELECT COUNT(*) FROM "orders" WHERE (phone like '%30%')
Order Load (2.3ms)  SELECT "orders".* FROM "orders" WHERE (phone like '%30%')
Completed 200 OK in 9ms (Views: 4.7ms | ActiveRecord: 2.8ms)

Started GET "/products/1" for ::1 at 2018-06-26 00:04:37 +0700
Started GET "/products/2" for ::1 at 2018-06-26 00:04:37 +0700
Processing by ProductsController#show as JSON
Processing by ProductsController#show as JSON
  Parameters: {"id"=>"1", "product"=>{}}
  Parameters: {"id"=>"2", "product"=>{}}
  Product Load (0.2ms)  SELECT  "products".* FROM "products" WHERE "products"."id" = ? LIMIT ?  [["id", 1], ["LIMIT", 1]]
  Product Load (0.7ms)  SELECT  "products".* FROM "products" WHERE "products"."id" = ? LIMIT ?  [["id", 2], ["LIMIT", 1]]
Completed 200 OK in 6ms (Views: 2.1ms | ActiveRecord: 0.2ms)
```
Trong trường hợp trên ta search với phone `30` nó tìm ra được 2 bản ghi orders, nhưng do có sử dụng reference tới product nên mỗi bản ghi lại tiếp tục request tới server 1 lần nữa để lấy thông tin của product.

Một component khác cũng khá giống với referencefield đó là ReferenceManyField:
## ReferenceManyField component 
Component sẽ lấy một list các bản ghi có quan hệ 1-n bằng cách tìm list các record thông qua id (nó sử dụng GET_MANY_REFERENCE REST method). 

Giả sử quan hệ giữa product và order là 1-n thì ở trang product show có thể sử dụng ReferenceManyField để hiển thị danh sách các order 

``` 
export const ProductShow = (props) => (
  <Show {...props} >
    <SimpleShowLayout>
        <TextField source="name" />
        <ReferenceManyField label="Orders" reference="orders" target="product_id">
           <Datagrid>
               <TextField source="name" />
               <TextField source="phone" />
               <TextField source="fb_url" />
           </Datagrid>
        </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
```

![](https://images.viblo.asia/6d142827-6b9a-4af1-aad1-79d0f9efd7a2.png)

source : https://github.com/khanhhd/vk_shop/

# Nguồn tham khảo
https://marmelab.com/admin-on-rest/