## Mở đầu
Khi làm việc với React Component thì việc sử dụng State là không thể thiếu. Chúng ta thường xuyên phải sử dụng **setState** để cập nhật  State mỗi khi dữ liệu bị thay đổi. Đôi khi chúng ta gặp trường hợp muốn cập nhật state mà state này lưu nhiều cặp key-value hoặc các object lồng nhau. Không phải lúc nào ta cũng cập nhật toàn bộ mà chỉ thay đổi dữ liệu 1 vài key trong đó.

Ví dụ:
```
this.state = {
  user: {
    name: Cao Thanh Sang,
    age: 23,
    job: Developer,
    address: Hanoi
  }
}
```

Bây giờ,  có 1 address mới ta cần cập nhật lại state. Vậy thì cập nhật bằng cách nào? Mình tin rằng các bạn đã từng thử như này giống mình:

```
this.setState({
  user.address: 'Da Nang'
})
```

hoặc

```
this.setState({
  user: { address: 'Da Nang' }
})
```

Cả 2 cách đều không hoạt động. Vậy thì xử lý bằng cách nào đây? Bạn hãy tham khảo 1 vài cách dưới đây nhé.

### 1. Tạo một bản sao và thay đổi trên nó
Với ví dụ trên ta sẽ tạo 1 bản sao của **user** và thay đổi trên bản sao đó.
```
this.setState(prevState => {
  let user = Object.assign({}, prevState.user);    // tạo một bản sao của user
  user.address = 'Da Nang';                        // cập nhật address, gán giá trị mới                 
  return { user };                                 // trả về object user mới
})
```

Thay vì sử dụng **Object.assign** Bạn có thể tạo ra 1 bản sao bằng cách này :
```
let user = { ...prevState.user };
```

### 2. Sử dụng spread operator
```
this.setState(prevState => ({
  user: {                  // đối tượng chúng ta cần update
    ...prevState.user,   // giữ lại tất cả các cặp key-value khác
    address: 'Da Nang'   // cập nhật giá trị của key cần update
  }
}))
```

Vô cùng dễ hiểu phải không nào? Nhưng 2 cách này chỉ giải quyết được những trường hợp đơn giản giống ví dụ trên. Còn trường hợp state là **những object lồng nhau** hoặc **mảng các object** thì sao? Cùng xem cách xử lý chúng nó nhé

### 3.Cập nhật những object lồng nhau
Ví dụ mình order 2 loại đồ uống như sau:

```
this.state = {
  drinks: {
    milk_tea: {
      sugar: '50%',
      ice: '50%',
      bubble: true
    },
    coffee: {
      fresh_milk: false,
      sugar: false,
      condensed_milk: true,
    }
  }
}
```

Đang order thì bạn gái nhắn tin "Trà sữa của em không trân châu nhé a! Em bị đau răng hì" thì ta phải update lại:

```
this.setState(prevState => ({
  drinks: {
    ...prevState.drinks,              // giữ lại tất cả các cặp key-value khác của đối tượng drinks
    milk_tea: {                       // truy cập vào đối tượng cụ thể của drinks
      ...prevState.drinks.milk_tea,   // giữ lại tất cả các cặp key-value khác của đối tượng milk_tea
      bubble: false                   // cập nhật giá trị của key cần thay đổi
    }
  }
}))
```

### 4. Cập nhật mảng các object
Giả sử ta có danh sách các câu lạc bộ đá bóng và phải quản lý điểm của chúng:
```
this.state = {
  clubs: [
    {
      id: 1,
      name: 'Barcelona',
      point: 69
    }, 
    {
      id: 2,
      name: 'Real Madrid',
      point: 56
    },
    {
      id: 3,
      name: 'Atlético Madrid',
      point: 66
    },
  ]
}
```

Để cập nhât cho bất kỳ một đối tượng nào, ta phải sử dụng hàm map trên mảng và kiểm tra giá trị của key có khả năng phân biệt các object ( có thể là vị trí trong mảng). Ở ví dụ này ta sử dụng **id** làm điều kiện để lấy ra object cần update. Nếu là false thì các object khác được giữ nguyên.

```
let id = 3;
this.setState(prevState => ({
  clubs: prevState.clubs.map(
    club => club.id === id ? { ...club, point: 72 } : club
  )
}))
```

**Chú ý**: Nếu Object không có giá trị duy nhất, thì hãy sử dụng chỉ mục mảng.

## Kết luận

Trên đây mình đã trình bày những cách để cập nhật state 1 cách nhanh chóng trong quá trình làm việc với ReacJs. Hy vọng rằng có thể giúp ích cho các bạn. Cảm ơn các bạn đã đọc bài viết và nếu có sai sót hay câu hỏi thì hãy bình luận phía dưới nhé :*

Nguồn tham khảo:

https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react