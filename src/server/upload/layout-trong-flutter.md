Trong Flutter có rất nhiều widget để trình bày lên màn hình nhưng để chúng hiển thị ở vị trí và kích thước mà chúng ta mong muốn thế nào thì  viết này mình sẽ làm một cheat sheet về layout trong fluter các bạn tham khảo nhé:
# Layout trong Flutter
## Row and Column
### MainAxisAlignment
Đối với Row/Column  sử dụng `MainAxisAlignment` để căn chỉnh nội dung dựa vào trục trục  chính  là `main axis` 
```
mainAxisAlignment: MainAxisAlignment.start,
```
- Row:

![](https://images.viblo.asia/92b7eaee-ffdc-43f5-be48-2132f40678cb.png)
-  Column:

![](https://images.viblo.asia/a28fde43-7010-4f1d-89a4-a3292587f4a0.png)

```
class RowCheatSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
        ],
      ),
    );
  }
}
```

Ngược lại với `start` là `end` ta sẽ được như sau:
- Row:
![](https://images.viblo.asia/9acb77e3-5a04-4486-9dd6-aafb037745e8.png)

- Column:
![](https://images.viblo.asia/94506d2a-6700-4d38-a56c-ea1bf6887a4e.png)

```
class ColumnCheatSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
        ],
      ),
    );
  }
}
```
Để tạo khoảng cách giữa các widget trong column ta sử dụng các thuộc tính như `spaceBetween`,  `spaceEvenly`,  `spaceAround`

SpaceBetween: Đối với thuộc tính này sẽ tạo khoảng cách đều giữa các widget con nhưng widget con đầu tiên và cuối cùng sẽ nằm sát với border bên ngoài:
- Row:

![](https://images.viblo.asia/767af74e-ab45-4933-a54f-2a937721cf6c.png)

 Column:
 
![](https://images.viblo.asia/56c731d6-5072-4c37-a536-80b70dd402a8.png)

SpaceEvenly: Với thuộc tính này sẽ tạo kkhoảng cách đều nhau giữa các widgets con cho dù kích thước của widget bên ngoài có lớn bao nhiêu đi chăng nữa.
- Row:
![](https://images.viblo.asia/2cc403f6-42e2-4cee-bc2b-52f12c5b1ac7.png)

- Column:
![](https://images.viblo.asia/55eddb4d-a987-4b1e-b6a1-62d35a896e20.png)

SpaceAround: Thuộc này sẽ tạo 1 padding bao quanh từng widget con, tuỳ vào số lượng widget và kích thước của widget bên ngoài nó sẽ tự động tính toán khoảng trống bao quanh bên ngoài cho từng widget.
- Row:
![](https://images.viblo.asia/3f29ed35-0e75-4856-bd0a-9e471f449319.png)

- Column:
![](https://images.viblo.asia/35380411-6b36-4ce4-884d-d5b5117e8a66.png)

### CrossAxisAlignment
Được sử dụng để chỉ định cách mà các widget con sẽ được bố trí trên trục  cross, trên column là trục dọc còn row là trục nằm ngang
```
crossAxisAlignment: CrossAxisAlignment.start,
```
- Row:
![](https://images.viblo.asia/e9a095e5-0e0d-4d90-ae52-0d06d9794978.png)

- Column:
![](https://images.viblo.asia/6f27c0a3-8b8a-4a04-a807-47a43e237ae5.png)

```
crossAxisAlignment: CrossAxisAlignment.end,
```
- Row:
![](https://images.viblo.asia/335738f4-2760-42a7-b342-c51807597ea6.png)

- Column:
![](https://images.viblo.asia/cd2b803d-332a-4193-8850-5958cd37b460.png)

```
crossAxisAlignment: CrossAxisAlignment.center,
```
Center: Sẽ đưa toàn bộ widgets con bên trong ra giữa
- Row:
![](https://images.viblo.asia/e19fba07-0077-464e-8370-cbd9e3840554.png)

- Column:
![](https://images.viblo.asia/3df077ad-e39f-4b39-af73-d021e15302ec.png)
```
class ColumnCheatSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
          Image(
            image: AssetImage('images/a.png'),
            width: 100.0,
          ),
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
        ],
      ),
    );
  }
}
```

### MainAxisSize
Kích thước của widget bên ngoài
```
mainAxisSize: MainAxisSize.min,
```
- Row:
![](https://images.viblo.asia/4e2c2be6-5873-4493-a8e8-f445ab8af381.png)

- Column:
![](https://images.viblo.asia/8c6d75fe-9098-40c3-9bd9-b39044c52fc4.png)

```
mainAxisSize: MainAxisSize.max,
```
- Row:
![](https://images.viblo.asia/a59ae1b6-a37e-48d2-8aeb-6d39278d146a.png)

- Column:
![](https://images.viblo.asia/bf232288-b4ca-4f51-98d0-3691a862297d.png)

```
class RowCheatSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
          Image(
            image: AssetImage('images/a.png'),
            width: 50.0,
          ),
        ],
      ),
    );
  }
}
```
## Expanded
Expanded là widget tự động lấp đầy khoảng trống  nội dung của Row/Column, trường hợp có nhiều widgets con thì nó sẽ tự động căn chỉnh đều nhau hoặc chúng ta cũng có thể sử dụng thuộc tính `flex` để thiết lập tỉ lệ mà nội dung của widget con sẽ chiếm.
![](https://images.viblo.asia/e910b14f-b18f-4b47-a0b9-bae05fc81567.png)

```
class RowExpandCheatSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          Expanded(
            flex: 1,
            child: Container(
              color: Colors.amber,
              height: 100,
            ),
          ),
          Expanded(
            flex: 2,
            child: Container(
              color: Colors.green,
              height: 100,
            ),
          ),
          Expanded(
            flex: 1,
            child: Container(
              color: Colors.amber,
              height: 100,
            ),
          ),
        ],
      ),
    );
  }
}
```

## Container
Container là một widget để chứa duy nhất 1 widget trong nó, widget này nếu không chứa widget con nào sẽ tự động có kích thước bằng kích thước của widget cha còn nếu có chứa widget con bên trong thì widget này sẽ tự dộng trim kích thước theo nội dung của widget con. Cái này giống với `div` bên html.
- Không chứa bất kì widget con nào:

![](https://images.viblo.asia/5abe88c3-3515-4b08-a80e-ae54b026cb42.png)

```
class ContainerCheatSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.amber,
    );
  }
}
```

- Chứa widget con:

![](https://images.viblo.asia/137a4eaf-e31c-4b06-9a98-8a0d4b145be8.png)

```
class ContainerCheatSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.amber,
      child: Text("I'm container"),
    );
  }
}
```

## SizedBox
SizedBox khá giống với Container tuy nhiên nó sẽ không thể thiết lập được các thuộc tính như `padding`, `margin`, `color`

![](https://images.viblo.asia/eb310f2f-a993-41d1-a44f-28ac12238008.png)

```
class SizedBoxCheatSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: SizedBox(
        width: 100,
        height: 100,
        child: ElevatedButton(
          child: Text("Button"),
          onPressed: () {},
        ),
      ),
    );
  }
}
```
## SafeArea
Trường hợp chúng ta muốn nội dung widget không bị che đi bởi status bar của Android hay Notch iPhone thì đây là widget rất hữu ích

![](https://images.viblo.asia/dcae672d-72ba-4136-8021-af34dce4474c.png)

![](https://images.viblo.asia/ad05e0f2-bdcb-4985-9c94-d3ebf167050f.png)

# Tham khảo
- https://flutter.dev/docs/codelabs/layout-basics