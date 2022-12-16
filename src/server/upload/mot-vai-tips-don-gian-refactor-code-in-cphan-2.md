Như ở phần 1 (Một vài Tips đơn giản Refactor Code in C# (Phần 1)) tôi đã giới thiệu về các vấn đề hay gặp phải trong coding. Ở phần 2 này tôi sẽ chia sẻ một số phương pháp để refactor code.

1/ Extract method 

```
void printOwing() {
  printBanner();

  // Print details.
  System.out.println("name: " + name);
  System.out.println("amount: " + getOutstanding());
}
```
Dễ dàng nhìn thấy method printOwing() vừa xử lý in banner vừa xử lý output ra màn hình. 

Khi gặp một  1 method quá dài hoặc có quá nhiều xử lý  ở bên trong. Hãy chia tách code thành nhiều method nhỏ xử lý các phần riêng biệt và replace code cũ  bằng cách gọi các method mới này.
Việc này không những giúp code sáng sủa dễ đọc hơn mà còn giúp dễ dàng maitain cũng như testing sau này.

```
void printOwing() {
  printBanner();
  printDetails(getOutstanding());
}

void printDetails(double outstanding) {
  System.out.println("name: " + name);
  System.out.println("amount: " + outstanding);
}
```

2/ Inline method  
```
class PizzaDelivery {
// ...
int getRating() {
return moreThanFiveLateDeliveries() ? 2 : 1;
}
boolean moreThanFiveLateDeliveries() {
return numberOfLateDeliveries > 5;
}
}
```

Đoạn code bên trên đang sử dụng method moreThanFiveLateDeliveries() mà bên trong chỉ có 1 xử lý đơn giản và trả về  bool.
Đối với các biểu thức đơn giản bạn có thể sử dụng kỹ thuật Inline method. Để có thể giảm thiểu được  số lượng method không cần thiết và số line code.

```
class PizzaDelivery {
  // ...
  int getRating() {
    return numberOfLateDeliveries > 5 ? 2 : 1;
  }
}
```

3/ Extract Variable

Hãy đọc đoạn code bên dưới 

```
if ((platform.toUpperCase().indexOf("MAC") > -1) &&
       (browser.toUpperCase().indexOf("IE") > -1) &&
        wasInitialized() && resize > 0 )
  {
    // do something
  }
```

Trong điều kiện If đang xử lý quá nhiều logic và khó nhận biết được đang làm gì. 
Hãy gán kết quả của các biểu thức  với  biến có tên ý nghĩa để code có thể dễ dàng hiểu được hơn như bên dưới.


```
final boolean isMacOs = platform.toUpperCase().indexOf("MAC") > -1;
  final boolean isIE = browser.toUpperCase().indexOf("IE") > -1;
  final boolean wasResized = resize > 0;

  if (isMacOs && isIE && wasInitialized() && wasResized) {
    // do something
  }
```

4/Inline Temp

Hãy đọc đoạn code bên dưới 

```
boolean hasDiscount(Order order) {
  double basePrice = order.basePrice();
  return basePrice > 1000;
}
```

Thường thì các bạn sẽ tạo 1 biến tạm để gắn cho  1 kết quả xử lý.  rồi dùng biến tạm xử lý với một biểu thức đơn giản tiếp theo.
Hãy remove biến tạm và trả về ngay kết quả inline như bên bên dưới

```
boolean hasDiscount(Order order) {
  return order.basePrice() > 1000;
}
```

5/ Replace Temp with Query

Bạn thường gán kết quả của một biểu thức cho một biến. rồi sử dụng nó tiếp theo như đoạn code sau.

```
double calculateTotal() {
  double basePrice = quantity * itemPrice;
  if (basePrice > 1000) {
    return basePrice * 0.95;
  }
  else {
    return basePrice * 0.98;
  }
}
```

Hãy  move đoạn xử lý expresstion double basePrice = quantity * itemPrice;  thành 1 method  rồi replace các biến đó bằng method extract như đoạn code sau.

```
double calculateTotal() {
  if (basePrice() > 1000) {
    return basePrice() * 0.95;
  }
  else {
    return basePrice() * 0.98;
  }
}
double basePrice() {
  return quantity * itemPrice;
}
```

Việc extract thành 1 method với tên có ý nghĩa giúp bạn dễ dàng hiểu được code . Và có thể tái sử dụng method cho những lần sau.

6/ Split Temporary Variable

```
double temp = 2 * (height + width);
System.out.println(temp);
temp = height * width;
System.out.println(temp);
```

Đoạn code bên trên đang sử dụng lại biến temp để assign cho một kết quả khác. Điều này đôi lúc khiến chũng ta bị nhầm lẫn và khó nhận biết biến này xử lý cái gì.
Mỗi thành phần của code thì chỉ nên xử lý 1 khối cụ thể. 
Hay tách thành 2 biến local khác nhau. Mỗi biến dành riêng cho 1 xử lý 

``` double perimeter = 2 * (height + width);
System.out.println(perimeter); double area = height * width;
System.out.println(area);
```

7/Remove Assignments to Parameters
```
int discount(int inputVal, int quantity) {
  if (inputVal > 50) {
    inputVal -= 2;
  }
  // ...
}
```

Đoạn code trên đang sử dụng parameter inputVal để assign cho kết quả của một sử lý
Đối với các biến refference  đôi lúc gắn lại một kết quả khác sẽ làm thay đổi biến nơi mà được truyền vào param.
Hãy  tạo 1 biến local khác để assign cho kết quả được xử lý.
```
int discount(int inputVal, int quantity) {
var inputResult;
  if (inputVal > 50) {
    inputResult -= 2;
  }
  // ...
}
```

8/Substitute Algorithm

Hay theo dõi đoạn code này 

```
String foundPerson(String[] people){
  for (int i = 0; i < people.length; i++) {
    if (people[i].equals("Don")){
      return "Don";
    }
    if (people[i].equals("John")){
      return "John";
    }
    if (people[i].equals("Kent")){
      return "Kent";
    }
  }
  return "";
}
```

Hãy tưởng tượng nếu việc tìm kiếm không chỉ dừng lại với anh "Don", "John", "Kent" mà có thể là tìm kiếm anh ABC sau này.
Thì thuật toán  xử lý này đang không tối ưu. Nó sẽ phình to lên với các đoạn if condition. 
Một thuật toán khác có thể giải quyết vấn đề này 

```
String foundPerson(String[] people){
  List candidates =
    Arrays.asList(new String[] {"Don", "John", "Kent"});
  for (int i=0; i < people.length; i++) {
    if (candidates.contains(people[i])) {
      return people[i];
    }
  }
  return "";
}
```

Nhìn đoạn code trên ta có thể thấy nếu muốn thêm dữ liệu tìm kiếm, chỉ cần add thêm 1 item vào array candidates.
Việc lựa chọn cho mình 1 thuật toán, solution tối ưu luôn giúp đoạn code của bạn pro, sáng sủa, dễ mở rộng cũng như maintain dễ dàng.


(To be continued)