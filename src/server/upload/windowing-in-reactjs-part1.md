Trong bài viết này, chúng ta sẽ cùng nhau xem qua khái niệm và cách triển khai Windowing trong ReactJS.

# 1. Windowing?
Một cách ngắn gọn nhất: chỉ render UI elements trong vùng nhìn thấy của người dùng. 

Giả sử, ta một có list chứa 10000 phần tử. Việc render tất cả mười ngàn phần tử này sẽ block UI và khiến cho web app của chúng ta bị đơ cứng trong vài giây. 10000 phần tử này, khả năng cao là vượt khỏi chiều cao/rộng của màn hình, và phải sử dụng thanh scroll để có thể nhìn thấy.

Ý tưởng, là chúng ta sẽ chỉ render những phần tử nằm trong vùng nhìn thấy. Người dùng scroll tới đâu, chúng ta render tới đó. 

![](https://images.viblo.asia/06723d37-393c-4b4f-b741-70d231ded3bc.png)

# 2. Implementation
Ý tưởng là như thế, vậy hiện thực ý tưởng đó sẽ như nào? Cụ thể chúng ta sẽ code ra sao để áp dụng được lý thuyết này ?

Để chế biến ra cái "windowing" này cần 4 nguyên liệu chính:
1. A Small DOM element
2. Items
3. A Big DOM element for scrolling
4. Absolutely positioned visible rows
    
![](https://images.viblo.asia/a90aad54-29ff-4637-b37f-1228f0395177.gif)

## 2.1. A Small DOM element
Ta sẽ dùng một cái DOM element nhỏ (có width & height nhỏ), nó sẽ đóng vai trò là cái cửa sổ (window). Người dùng sẽ nhìn qua cái cửa sổ này để nhìn thấy dữ liệu.

Ghi chú: thằng này có *overflow: auto*
## 2.2. Items
Items, nó là nhân vật chính của bữa tiệc. Nếu như ta chỉ đơn thuần là render ra hết cái đống Items này, thì nó chính là cách thông thường mà chúng ta vẫn sử dụng.

## 2.3. A Big DOM element for scrolling
Thằng này là một cái DOM element bao bọc cho đóng Items kia, thường là thẻ div, nó sẽ phản ánh **tổng chiều cao** của đóng Items sau khi render ra giao diện.

Thằng này sẽ là element con của thằng **A Small DOM element**, vì nó có height lớn hơn height của cha nó, nên ở element cha sẽ xuất hiện scrollbar.

Ghi chú : thằng này có *position: relative*.

## 2.4. Absolutely positioned visible rows
Đây là thằng đại diện của những items sẽ được chọn lựa ra để hiển thị. 

Việc chọn lựa sẽ được tính toán dựa theo chiều cao của từng item, chiều cao cái cửa sổ **2.1** (window) và scrollTop của thằng **2.3**.

Thằng này là element con của thằng **2.3** *A Big DOM element for scrolling*

Ghi chú : thằng này sẽ có *position: absolute*, với thuộc tính *top* của nó cũng sẽ được tính toán.

# 3. Fixed Size List
    
Đây là dạng đơn giản nhất của windowing mà chúng ta sẽ thực hiện. Nó là một danh sách các phần tử, mà mỗi phần tử sẽ có kích thước cố định (**fixed size**). 
    
Component sau khi hoàn thành và sử dụng sẽ trông như này:
    

```js
<FixedSizeList 
  width={300} 
  height={150} 
  itemCount={1000} 
  itemSize={35}
>
  {Row}
</FixedSizeList>
```
Đọc component này như sau: chúng ta sẽ có một cái **Small DOM element** đóng vai  trò là cửa sổ (window), cửa sổ này cao 150px và rộng 300px. Ta sẽ có một danh sách các phần tử, 1000 phần tử, mỗi phần tử sẽ cao 35px, suy ra tổng cao là 1000 x 35px = 35000px. Con số 35000px này chính là chiều cao của cái **Big DOM element for scrolling**.
    
## 3.1. Pass Data into List
Chúng ta sẽ pass data cho list như sau:

```js
<FixedSizeList 
  width={300} 
  height={150} 
  itemCount={1000} 
  itemSize={35}
  itemData={this.props.itemsArray} //This is how we pass data into the list
>
  {ItemRenderer}
</FixedSizeList>
```

Trong ItemRenderer component, ta sẽ lấy ra data item tương ứng dựa vào **Index**

```js
class ItemRenderer extends PureComponent {
  render() {
    // Access the items array using the "data" prop:
    const item = this.props.data[this.props.index];
 
    return (
      <div style={this.props.style}>
        {item.name}
      </div>
    );
  }
}
```

## 3.2. Decide which item to render
Phần sau sẽ rõ...

# ... to be continue