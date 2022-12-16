# Cải thiện kỹ năng debug js bằng console
1. Giới thiệu
2. console.log
3. console.count
4. console.warn
5. console.table
6. console.group
7. Kết 
## 1. Giới thiệu
- Thông thường chúng ta debug js bằng cách sử dụng console.log nhưng nó không phải là cách tôi ưu nhất, có nhiều cách khác với console mình sẽ giới thiệu trong bài này.
- Phương thức console cho phép chúng ta debug trên trình duyệt tại tab console phía client và hết trình duyệt đều hỗ trợ.
## 2. console.log
ví dụ: Dùng console.log hiển thị dữ liệu đầu ra đơn giản

```
function helloWorld(text) {
  console.log(text)
}

helloWorld('Hello world')
//kết quả: Hello world
```
kết quả khi thử trên trình duyệt:
![](https://images.viblo.asia/22a257e3-4b4b-43fa-b10c-e28edd07dade.png)

## 3. console.count
- Sử dụng hàm count() để đếm số lần hàm được gọi, hàm count() cũng có phép đối số truyền vào 
Ví dụ 1: Khi sử dụng hàm mặc định
```
function helloST(text) {
  console.count()
  console.log(text)
}

helloST("Cat")
helloST("Dog")
helloST("Bird") 
// kết quả:
default: 1
Cat
default: 2
Dog
default: 3
Bird
```
kết quả khi thử trên trình duyệt:
![](https://images.viblo.asia/87595fd5-7c0a-4cb2-aca1-d682bd26dd9a.png)

Ví dụ 2: Khi có đối sô truyền vào

```
function helloST(text) {
  console.count(text)
}

helloST("Cat")
helloST("Dog")
helloST("Bird") 
helloST("Cat") 
// kết quả:
Cat: 1
Dog: 1
Bird: 1
Cat: 2
```
kết quả khi thử trên trình duyệt:
![](https://images.viblo.asia/427fdbcb-ee36-45a1-8dab-cd36d2263ac9.png)

## 4. console.warn
- Sử dụng hàm này sẽ đưa ra một cảnh báo trên bảng điều khiển, nó thường được sử dụng cho việc phát triển API
- Cảnh báo giúp người dùng biết được vấn đề gì đó không chính xác hoặc API bị từ chối,...
- Một ví dụ đơn giản dưới đây sẽ giúp thấy rõ warn hiển thị như thế nào:

```
function helloWorld(text) {
  if(!text) {
    console.warn("text not found")
  }
}

helloWorld()
```
kết quả khi thử trên trình duyệt:
![](https://images.viblo.asia/b4275aca-12f6-45fc-bc6b-8d1fa98f68fa.png)

## 5. console.table
Hiển thị dữ liệu dưới dạng bảng thay vì trên một dòng như console.log

Hàm này nhận một đối số bắt buộc dữ liệu phải là một array hoặc một object và một tham số tùy chọn bổ sung columns

Mỗi phần tử trong array sẽ là một hàng trong bảng. Cột đầu tiên trong bảng là index, nếu data là một array thì các giá trị của nó sẽ là các chỉ số array. Nếu data là một object thì giá trị của nó sẽ là tên thuộc tính.

Lưu ý console table giới hạn 1000 hàng.

ví dụ 1:
```
console.table(["ANH", "NHA", "QUE"]);
```
kết quả:
| (index) | Values |
| -------- | -------- | 
| 0    | "ANH"     | 
| 1    | "NHA"     | 
| 2    | "QUE"     |

ví dụ 2:
```
function Body(hand, nose) {
  this.hand = hand;
  this.nose = nose;
}

var me = new Body("short", "long");

console.table(me);
```
kết quả:
| (index) | Values |
| -------- | -------- | 
| hand    | "short"     | 
| nose    | "long"     |

## 6. console.group
- Group cho biết sẽ bắt đầu một nhóm thông báo giúp đầu ra hiển thị dễ nhìn hơn
- Dùng groupCollapsed để thu nhỏ nhóm hiển thị
- Dùng groupEnd để thoát hỏi nhóm thông báo

VÍ dụ:
```
console.log("Hiên thị thông báo cấp 1");
console.group();
console.log("Cấp 2");
console.group();
console.log("cấp 3");
console.warn("Thông báo trong cấp 3");
console.groupEnd();
console.log("Quay lại cấp 2");
console.groupEnd();
console.log("Thoát khỏi group");
```
![](https://images.viblo.asia/917c5205-c8f2-40f3-b0b1-ec76ce1b1a64.png)
## 7. Kết
Đây là những kiến thức mình tìm hiểu được về console javascript, các bạn có thể tự tìm hiểu thêm các thủ thuật khác.