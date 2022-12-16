Sau một thời gian vừa học và làm việc với React Native, sau đây là một vài vấn đề mình gặp phải cũng như nhìn thấy trong quá trình làm việc. Tuy chỉ là những thứ rất nhỏ nhưng cũng hi vọng sẽ giúp bạn trong quá trình tìm hiểu React Native.

## 1. Map, Filter, Reduce

Đây không hẳn là vấn đề xuất phát từ React Native, nếu những mới bắt đầu với javascript sẽ thấy có chút bối rối khi chọn một phương thức để duyệt qua một array.



| | Map | Filter | Reduce | 
| -------- | -------- | -------- | -------- | 
| Khả năng | rà từng thằng một trong arr rồi clone nó rồi chỉnh sửa cái clone rồi cuối cùng xuất ra một arr mới với số lượng thành viên bằng arr cũ nhưng chứa toàn clone (với chỉnh sửa)  |rà từng thằng một trong arr rồi bốc ra những thằng đạt yêu cầu | cầm một con số khởi điểm đi rà từng thằng một trong arr, cho con số khởi điểm nhập vào thằng đó rồi chiếm luôn vị trí, lần lượt cho đến hết arr |
| Tham số đầu vào | 1 arr và 1 callback function | 1 arr và 1 callback function | 1 arr và 1 callback function và 1 con số khởi điểm |
| return của callback function | 1 thành viên | 1 boolean với ý nghĩa quyết định (nếu là true thì tức là lời thông báo “thằng này đậu” và ngược lại false là trượt |  1 con số|
| return của toàn bộ method | 1 arr bằng chiều dài của arr cũ | 1 arr gồm các thành viên cũ mà đạt yêu cầu, người đạt yêu cầu không thể nhiều hơn tổng số người bị khám nên arr mới luôn ngắn hơn arr cũ	 |  1 con số|
| số phận arr gốc| luật rừng nói phải giữ toàn thây arr gốc| luật rừng nói phải giữ toàn thây arr gốc| luật rừng nói phải giữ toàn thây arr gốc |

Đại loại là thế này

### Map

dùng map khi muốn tạo một array mới với chiều dài bằng chính xác array cũ, với các thành viên là từ array cũ mà “chế” ra. Không thay đổi array cũ.

Ví dụ:

```
let arr1 = [1,2,4];
let arr2 = arr1.map(x=>x*2);
console.log(arr2);  \\ [2, 4, 8]
console.log(arr1); [1, 2, 4]
```

x=>x*2 chính là callback function chúng ta dùng để "chế" ra array mới từ array cũ.

### Filter

Bạn cần đến filter khi muốn clone một vài phần tử trong array mà không có chỉnh sửa gì chứ không phải clone cả array.

Ví dụ:

```
let arr1 = [1,2,4];
let arr2 = arr1.filter(x=>x>3);
console.log(arr2);   \\[4]
console.log(arr1);  \\ [1, 2, 4]
```

x=>x>3 là callback function chúng ta dùng để chọn ra các phần tử để clone.

### Reduce

chúng ta có thể tưởng tượng reduce này là một con rắn săn mồi, nó sẽ lê la đến array của bạn và đớp từng thành viên một, sau mỗi lần đớp nó sẽ dài ra một đoạn bằng đúng độ dài của thành viên đó, và cuối cùng con rắn đi ra với độ dài siêu khủng, đó là giá trị return. 

con số khởi điểm ở đây chính là chiều dài ban đầu của rắn. Nếu bạn không nhập chiều dài ban đầu của rắn thì mặc định rắn có chiều dài là thành viên đầu tiên, và rắn sẽ bắt đầu đớp từ thành viên thứ hai trở đi (bỏ qua thành viên 1)

Ví dụ

```
let arr1 = [3,1,7];
let conRanDiRa = arr1.reduce((chieuDaiRanHienTai,x)=>x*10+chieuDaiRanHienTai,0);
console.log(conRanDiRa);  \\110
```

Ban đầu rắn có chiều dài bằng 0 mét. Sau khi đớp xong thằng thứ nhất của array (3) nó tăng trưởng thêm 30 mét và có chieuDaiRanHienTai là 30m. đớp thêm thằng thứ hai (1) nó tăng thêm 10met và cuối cùng là 70m. Cuối cùng rắn ta chui ra với chiều dài 30 + 10 +70 = 110m.

## 2. Dynamic opacity with TouchableOpacity

Giả dụ bạn có một nút nhấn là một hình ảnh, khi click vào sẽ show lên detail của ảnh chẳng hạn. Tuy nhiên, bạn lại muốn rằng khi click vào ảnh nào rồi thì trạng thái của ảnh đó hiển thị trong list sẽ phải mờ hơn với các ảnh chưa được click, Nôm na là opacity của nút nhấn đó sẽ phụ thuộc vào state mà bạn set chẳng hạn

Ví dụ ta có thế này
```
<TouchableOpacity 
  style={{opacity: this.state.clicked ? 0.6 : 1}} 
  onPress={() => this.onPress()}
>
  <Image
    source={.....}
    .....
  />
</TouchableOpacity>  
```

Xem như TouchableOpacity là view bọc ngoài của nút nhấn. Thông thường ta sẽ thay đổi opacity của nó tùy thuộc vào trạng thái state là clicked.

Nhìn trông có vẻ hợp lý, nhưng không, khi bạn chạy thử thì chẳng có điều gì xảy ra cả, nút nhấn chẳng bị mờ đi như ta dự đoán.
Mình không chắc đây có phải là bug của thằng TouchableOpacity này không, nhưng nó sẽ không update opacity khi component tự re-render, nó chỉ thay đổi khi ta click vào.

Cách giải quyết cho cấn đề này đơn giản chỉ là hãy tạo một View bên trong TouchableOpacity để bọc các thành phần con của nó lại và set thuộc tính opacity cho View đó.

Giả dụ thế này

```
<TouchableOpacity  
  onPress={() => this.onPress()}
>
  <View 
    style={{opacity: this.state.clicked ? 0.6 : 1}}
  >
      <Image
        source={.....}
        .....
      />
    </View>  
</TouchableOpacity>  
```


## 3. textAlign: center in View component

Tuy lỗi này không ảnh hưởng đến hoạt động của app nhưng sẽ rất khó chịu khi bạn đang debug app và một đống lỗi đỏ lừ cảnh báo thuộc tính textAlign không support cho View.. blah blah chình ình trong màn hình console và chiếm hết chỗ của những thứ khác.

Thông thường, khi làm việc với html, css bạn có thể hay set text-align: center cho div để căn giữa các thành phần bên trong, kiểu kiểu như vậy. Nhưng đối với React Native thì khác, thêm thuộc tính textAlign vào View hay một vài bao đóng khác như TouchableOpacity chẳng hạn sẽ chẳng có tác dụng chỉ cả, chỉ làm bạn ngứa mắt lúc debug mà thôi.

**Hãy nhớ: Đừng ném textAlign vào View**

## 4. 2 object with the same reference

Đây là một tình huống rất hay gặp phải khi làm việc với javascript nói chung và React Native nói riêng. Bạn gán một biến bằng với một object khác, nhưng khi thay đổi biến này thì cả object cũ cũng thay đổi theo

Ví dụ:

```
let a = {'data': 2}
let b = a;

b['data'] = 4;

console.log(b) // {data: 4}
console.log(a) // {data: 4}
```

Bạn sẽ gặp trường hợp này và bối rối không hiểu tại sao mình có động gì đến object 'a' đâu mà nó lại thay đổi theo.

Nguyên nhân là khi bạn gán như thế, cả 'a' và 'b' đang cùng trỏ đến một địa chỉ trên bộ nhớ nên nhìn tên có vẻ khác nhau đấy nhưng nó đang cùng chỉ đến 1 thằng và tất nhiên khi bạn thay đổi một trong hai thì cũng chỉ là thay đổi trên cùng một địa chỉ mà thôi.

Để giải quyết vấn đề này, đối với những object có độ sâu thăm thẳm, bạn không thể mất thời gian ngồi đào sâu vào mà clone từng tí một. Thay vào đó bạn có thể sử dụng hàm **cloneDeep** được cung cấp bởi [**Lodash**](https://lodash.com/docs/4.17.11#cloneDeep) để clone cả object sang một object mới với địa chỉ mới hoàn toàn. Sau đó bạn có thể làm gì tùy thích với object mới mà không sợ ảnh hưởng tới object cũ nữa.