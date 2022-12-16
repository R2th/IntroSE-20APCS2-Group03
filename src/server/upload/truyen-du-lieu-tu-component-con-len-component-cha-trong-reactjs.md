### 1. Giới thiệu 
Như các bạn đã biết  1 trong 2 đặc điểm chính của ReactJS chính là cơ chế one-way data binding – luồng dữ liệu 1 chiều. Dữ liệu được truyền từ component cha đến con thông qua props. Luồng dữ liệu đơn giản giúp chúng ta dễ dàng kiểm soát cũng như sửa lỗi. Vậy làm như thế nào để khi component con thay đổi thì component cha cũng thay đổi ?
Giải pháp chính là  chúng  ta sẽ chuyển 1 callback function từ component cha đến component con. Mục đích của callback funtion  này là thay đổi một phần của state của component cha. 


### 2. Bài toán

![](https://images.viblo.asia/d74e71a5-50c8-477f-a661-077b417111c4.png)
Mình có 1 ví dụ minh hoa như sau : mình có danh sách thông tin user như hình bên, làm như thế nào để khi click delete thì danh sách user được cập nhật lại ?

### 3. Thực hiện
 Ở component List User mình sẽ viết 1 funtion updateSate như sau  :

```Reactjs
updateState(newlist)
    {
        this.setState({member: newlist});
    }
```

    
 **Giải thích :** 
 <br>
 <br>
 
 Ở funtion updateState mình chuyền vào 1 newlist và thực hiện setState member của compoent List User bằng newlist.Một khi hàm setState() được gọi nó sẽ thay đổi state của component cha ,  khiến cho React render lại component List User.
và 1 funtion để hiển thị ra mỗi item con là thông tin của 1 user.
trong funtion này mình sẽ truyền hàm updateState xuống component con.
<br>
<br>

```Reactjs
itemMember()
    {
        if (this.state.member instanceof Array) {
            return this.state.member.map((member, i) => {
                return <ItemMember obj={member} key={i} newlist ={this.updateState}/>;
            })
        }
    }

```
 
    
 Tiếp theo ở component con ItemMember mỗi khi gọi click button delete ta sẽ handle 1 sự kiện onclick.
 
```
    onClick()
    {
                axios.delete('/members' + this.props.id)
                .then(
                    (response) => {
                        axios.get('/members')
                            .then(response => {
                                this.setState({ list: response.data });
                                this.props.newlist(this.state.list)
                            }
                        )
                    }
                );
    }
```

Trong  funtion onClick ta gọi đến api để xóa item đó đi. Sau khi xóa thành công  thì get lại danh sách member và seState  list bằng data trả v tiếp theo ta gọi this.props.newlist chính là function new list từ component cha truyền xuống và tham số được truyên vào là state list .Chúng ta đang gọi hàm newlist và thiết lập state thành giá trị của nó hiện tại là list. Như vậy component cha sẽ nhạn được 1  state mới.
Danh sách user cập nhật không còn user bị xóa nữa.

Các bạn có thể thử và comment kết quả nhé :D