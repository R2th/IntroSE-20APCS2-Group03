`ListView` trong **Flutter** là một danh sách tuyến tính gồm các item có thể cuộn được (`scrollable`) - tương tự với `ListView` hoặc `RecyclerView` bên **Android**. Chúng ta có thể sử dụng nó để tạo danh sách các đối tượng có thể cuộn được hoặc danh sách các đối tượng lặp lại.

# Khám phá các loại ListView
Chúng ta sẽ bắt đâu bằng việc xem xét các loại `ListView`, sau đó xem xét các tính năng khác và sửa đổi chúng một chút.

Ta có các loại `ListView` dưới đây:

1. **ListView**
2. **ListView.builder**
3. **ListView.separated**
4. **ListView.custom**

Hãy cùng đi khám phá từng loại `List View` nhé!

## ListView

Đây là phương thức khởi tạo mặc định của class `ListView`. `ListView` chỉ đơn giản là lấy một danh sách các con (`children`) và làm cho nó có thể cuộn được (`scrollable`)

![](https://miro.medium.com/max/700/1*HCj38H38dE2u_GKBE6gNjQ.gif)
   
Code của chúng ta sẽ nhìn như thế này:

```php
ListView(
  children: <Widget>[
    ItemOne(),
    ItemTwo(),
    ItemThree(),
  ],
),
```

Cách này thường chỉ được sử dụng với một số lượng nhỏ `children`. Nếu ta sử dụng với 1 danh sách đủ dài, sẽ rất mất thời gian để triển khai chúng vào code.

## ListView.builder()

Hàm khởi tạo `builder()` xây dựng 1 danh sách lặp lại các `item`. Constructor lúc này sẽ nhận 2 tham số chính: `itemCount` đại diện cho số lượng item, và `itemBuilder` đại diện cho từng mục hiển thị trong danh sách.

![](https://miro.medium.com/max/700/1*9eJ11a04kjjUnmjNFEq5zw.gif)

Code của chúng ta sẽ nhìn như thế này:

```php
ListView.builder(
  itemCount: itemCount,
  itemBuilder: (context, position) {
    return listItem();
  },
),
```

Danh sách các item được khởi tạo một cách `lazily`, nghĩa là chỉ một số item cụ thể được tạo, và khi người dùng thực hiện thao tác cuộn xuống dưới, các item trước đó sẽ bị hủy - khá tương đồng với cách hoạt động của `RecyclerView` trong **Android**.

**Trick:** Vì các item được load một cách lazily và chỉ có 1 số item cần thiết được load, ta sẽ không thực sự cần tới `itemCount`là tham số bắt buộc và List có thể có chiều dài vô hạn.

```php
ListView.builder(
  itemBuilder: (context, position) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Text(position.toString(), style: TextStyle(fontSize: 22.0),),
      ),
    );
  },
),
```

![](https://miro.medium.com/max/700/1*oisoTExGF0xjYrcSX1iIxA.gif)

## ListView.separated()

Với hàm khởi tạo `separated()`, chúng ta tạo ra 1 list các item và có thể định nghĩa hiển thị ngăn cách giữa các item

![](https://miro.medium.com/max/700/1*iDYxUys18QoFGzAx_ebr4A.gif)

Về bản chất, chúng ta đang xây dựng 2 list đan xen với nhau - 1 là danh sách chính bao gồm các item - 2 là danh sách các `separated`.

Lưu ý rằng độ dài vô hạn không thể được sử dụng trong trường hợp này - bắt buộc chúng ta phải sử dụng `itemCount` trong hàm khởi tạo:

```php
ListView.separated(
      itemBuilder: (context, position) {
        return ListItem();
      },
      separatorBuilder: (context, position) {
        return SeparatorItem();
      },
      itemCount: itemCount,
),
```

Kiểu list này cho phép ta xác định các `separated`, có các loại `item` khác nhau tương ứng với các `separated` khác nhau, thêm hoặc xóa `separated` khi cần...

Việc triển khai này cũng có thể được sử dụng để chèn các loại item khác (ví dụ: quảng cáo) một cách dễ dàng.

![](https://miro.medium.com/max/700/1*e6LEilKRr0p62g7VNat3Bw.png)

**Lưu ý:** Độ dài của list `separated` sẽ nhỏ hơn 1 đơn vị so với độ dài của list các item chính vì `separated` không tồn tại sau item cuối cùng của list.

## ListView.custom()

Hàm khởi tạo `custom()` đúng như tên gọi của nó - cho phép chúng ta tạo `ListView` với chức năng tùy chỉnh về cách tạo các item của list. Các tham số chính cần thiết là: 

1. **SliverChildListDelegate**
2. **SliverChildBuilderDelegate**

`SliverChildListDelegate` chấp nhận trực tiếp một danh sách các item, trong khi `SliverChildBuilderDelegate` chấp nhận một `IndexedWidgetBuilder` (hàm xây dựng widget tương ứng với item thông qua `index` của item)

*`ListView.builder` về cơ bản là một `ListView.custom` với `SliverChildBuilderDelegate`.*

*Phương thức khởi tạo mặc định của `ListView` hoạt động giống như `ListView.custom` với `SliverChildListDelegate`*

Chúng ta đã xong với phần tìm hiểu các kiểu `ListView`, giờ hãy đi sâu hơn về `ScrollPhysics`

# Khám phá ScrollPhysics

Để kiểm soát hành vi cuộn (scrolling) đang diễn ra, ta đặt tham số `physics` trong hàm khởi tạo của `ListView`. Có các kiểu `physics` khác nhau như sau:

## NeverScrollableScrollPhysics

`NeverScrollableScrollPhysics` khiến cho list không thể cuộn. Ta có thể sử dụng nó để ngăn người dùng thực hiện thao tác cuộn `ListView` nhằm thực hiện 1 số tác vụ nào đó.

## BouncingScrollPhysics

`BouncingScrollPhysics` làm danh sách có hoạt ảnh nẩy lên khi kéo xuống cuối cùng hoặc đầu tiên của `ListView` - tương tự hiệu ứng được sử dụng trên hệ điều hành iOS.

![](https://miro.medium.com/max/700/1*8jjtR8LTpfqQ6fd6sGX9jA.gif)

## ClampingScrollPhysics

`ClampingScrollPhysics` là hoạt ảnh mặc định trên hệ điều hành Android. List sẽ dừng ở 2 đầu và hiển thị hiệu ứng đổ bóng

![](https://miro.medium.com/max/700/1*6MzFiV-QUtu-VBCWO2uTKA.gif)

## FixedExtentScrollPhysics

Điều này hơi khác so với những thứ chúng ta nêu trên ở chỗ nó chỉ hoạt động với `FixedExtendScrollControllers` và danh sách sử dụng chúng. `FixedExtendScrollControllers` chỉ cuộn đến các items thay vì bất kỳ phần bù nào ở giữa

![](https://miro.medium.com/max/700/1*4XETw8zoeNGGODA77c09Iw.gif)

Dưới đây là code để triển khai:

```php
FixedExtentScrollController fixedExtentScrollController =
    new FixedExtentScrollController();
ListWheelScrollView(
  controller: fixedExtentScrollController,
  physics: FixedExtentScrollPhysics(),
  children: monthsOfTheYear.map((month) {
    return Card(
        child: Row(
      children: <Widget>[
        Expanded(
            child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            month,
            style: TextStyle(fontSize: 18.0),
          ),
        )),
      ],
    ));
  }).toList(),
  itemExtent: 60.0,
),
```

# Kết

Hi vọng với bài viết này, các bạn có thể tự tạo `ListView` trong ứng dụng của mình một cách hợp lý nhất. Mong mọi người sẽ tiếp tục đón đọc những bài viết về Flutter của mình trong thời gian sắp tới.