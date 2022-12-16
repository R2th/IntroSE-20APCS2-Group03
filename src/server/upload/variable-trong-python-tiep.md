Như bài trước thì mình đã đi tìm hiểu qua cơ bản về biến trong python (Number, String, List, Tuple). Nếu bạn nào chưa xem thì xem [tại đây](https://viblo.asia/p/variable-trong-python-63vKjbXMK2R). Còn phần này mình sẽ đi tiếp về variable trong python (về Set, Dictionary), phần cuối về biến. Let's go.

**Các kiểu dữ liệu còn lại**

**Set**

Set trong Python là tập hợp các phần tử duy nhất (Không có phần tử trùng lặp), không có thứ tự. Các phần tử trong set phân cách nhau bằng dấu phẩy và nằm trong dấu ngoặc nhọn {}. Các phần tử trong Set không có thứ tự. Có thể thêm xóa phần tử của Set.

Cách tạo Set bằng cách đặt các phần tử vào trong dấu {}, phân tách bằng dấu ',' hoặc sử dụng hàm có sẵn set(). Cac phần tử trong set có thể thuộc nhiều kiểu dữ liệu khác nhau như: Number, String ... không chứa phần tử thuộc các kiểu có thể thay đổi như list, dictionary.

![](https://images.viblo.asia/a59fe804-eb40-4578-9387-334e0635f5d8.png)

Vì Set không có thứ tự, nên không thể truy cập đến một phần tử thông qua vị trí của chúng. Thay vào đó chúng ta có thể lấy hết các phần tử có trong Set bằng cách `for` tất cả các phần tử có trong Set:

```
myset = {1, 1.1, "Nghiem Tuan", "Y", (1, 2, 3, 4)}
for item in myset:
   print(item)
```

Đây là kết quả:

![](https://images.viblo.asia/712600da-ae1e-43ac-9c79-ed7411d3110c.png)

Chúng ta không thể thay đổi các phần tử có trong Set vì không có thứ tự. Nhưng chúng ta có thể thêm một phần tử vào trong set bằng cách sử dụng hàm `add()`- thêm 1 phần tử, và thêm nhiều phần tử bằng cách sử dụng hàm `update()`:

![](https://images.viblo.asia/978fe073-eb16-415d-8993-30eadb8f012f.png)

Kiểm tra phần tử có trong Set không bằng cách sử dụng `in` hoặc `not in`

![](https://images.viblo.asia/716509a3-d155-443c-aff6-a8a024fd4dc3.png)

Có thể loại bỏ phần tử trong set, một lần nữa chúng ta không thể thay đổi các phần tử có trong Set vì không có thứ tự. Nhưng chúng ta có thể sử dụng các hàm sau đây để xóa phần tử khỏi Set(): remove, discard, pop - xóa phần tử cuối cùng, clear - xóa các phần tử tròn Set để lại Set rỗng, del xóa luôn Set khi gọi biến này sẽ bị lỗi undefine.

![](https://images.viblo.asia/3379261f-6677-44e2-9d16-b3ab678700b3.png)

Như ở trên bạn có thể thấy:
* Hàm remove và discard để xóa 1 phần tử trong 1 Set thông qua giá trị muốn xóa.
* Hàm pop là hàm lấy ra phần tử cuối cùng của Set. Nên thận trọng khi sử dụng hàm này vì bạn sẽ không biết được phần tử cuối cùng là phần tử nào. Như ví dụ trên thì khi `pop()` nó lấy ra chuỗi "php"
* Hàm clear sẽ xóa các phần tử có trong Set đó và để lại Set rỗng - có thể sử dụng lại được biến
* Hàm del sẽ xóa Set luôn, không sử dụng biến này dc - undefine 

Ngoài ra còn có nhiều toán tử có thể sử dụng khác với Set như: `|/union, &/intersection, -/diserence, ^/symmetric_difference`

Cách hàm hỗ trợ khác: `all(), any(), enumerate(), len(), max(), min(), sorted(), sum()`

**Dictionary**

Dic là một tập hợp các giá trị theo cặp key-Value, có thể thay đổi được. Có thể khai báo bằng dấu ngoặc nhọn {}, key - value có thể là bất kỳ kiểu dữ liệu nào. Ngoài ra cũng có thể khai báo bằng cách sử dụng hàm `dict()` có sẵn:

```
mydict = {'name': "Tuan", 'familyname': "Nghiem Tuan", 'age': 23}
type(mydict)
print(mydict)
```

![](https://images.viblo.asia/a0bc3ba9-7cf8-4a32-ad9c-01d8cf14f92b.png)

Để truy cập vào từng phần tử trong dict ta sẽ sử dụng key bằng cách đaựt trong ngoặc vuông `[ ]` hoặc sử dụng get().

![](https://images.viblo.asia/234b0f7f-d5a4-48ab-abac-65b9d81a988f.png)

Để thay đổi, hoặc thêm phần tử cho dict thì ta cần sử dụng đến key truy xuất đến phần tử đó (giống mảng =)) )

![](https://images.viblo.asia/c7844b20-b493-4d6a-95af-f959f24bd8ae.png)

Để xóa phần tử cụ thể ta có trong dict ta sử dụng `pop()/del `- xóa phần tử được chỉ định, clear() - xóa toàn bộ phần tử

```
mydict = {'name': 'Tuan', 'familyname': 'Nghiem Tuan', 'age': 23, 'address': 'HN'}
mydict.pop('age')
del mydict['age']
mydict.clear()
```

Ngoài ra còn có nhiều phương thức khác `copy(), items(), keys(), setdefault(),` ...

**Tổng kết 4 kiểu dữ liệu List, Tuple, Set. Dict**

Qua 2 bài về biến trong python các bạn có thể nắm được những thứ cơ bản nhất về các kiểu dữ liệu có trong Python, và để kết thúc phần này chúng ta có bảng tóm tắt sau:


| Tên | Đặc trưng | Dấu | Khởi tạo |
| -------- | -------- | -------- | -------- |
| List     | Có thể chứa bất kì kiểu dữ liệu nào, như array trong các ngôn ngữ khác     | `[]`     | list() |
| Tuple     | Giá trị không thay đổi được     | ()     | tuple() |
| Set     | Phần tử là duy nhất không lặp lại, không tồn tại key nên không thể truy xuất đến từng phần tử | {}     | set() |
| Dict     | Phần tử dạng key: value     | {}     | dict() |

-----

Vậy là mình đã đi qua về giới thiệu Python, variable trong python. Trong phần sau mình sẽ tìm hiểu về OOP trong python. Cảm ơn các bạn đã quan tâm :)