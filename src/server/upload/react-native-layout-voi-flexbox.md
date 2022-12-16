Xin chào các bạn, bài viết này mình sẽ viết về cách sử dụng flexbox trong React native. Flexbox là các thuộc tính được sử dụng để layout các component, thống nhất cho các kích thước màn hình khác nhau. Thông thường bạn sẽ sử dụng kết hợp `flexDirection`, `alignItems` và `justifyContent` để đạt được layout phù hợp. Trong bài viết này mình sẽ giới thiệu một số thuộc tính sau:
* Flex
* Flex direction
* Justify content
* Align items

## Flex

Thuộc tính flex có giá trị là 1 số, xác định các view con chiếm bao nhiêu không gian trong view cha của nó. Ví dụ mình có 3 view con màu đỏ, vàng, xanh: màu đỏ có flex là 1, màu vàng có flex là 2, màu xanh có flex là 3 => màu đỏ chiếm 1 / 6 không gian của view cha, màu vàng 2 / 6 và màu xanh 3 / 6:

```
const App: () => React$Node = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'red'}}>
      </View>
      <View style={{flex: 2, backgroundColor: 'yellow'}}>
      </View>
      <View style={{flex: 3, backgroundColor: 'green'}}>
      </View>
    </View>
  );
};
```

Đây là kết quả:
![](https://images.viblo.asia/10f70e44-55ff-4dc8-9f5f-21e8a1ee24bb.png)

## Flex Direction

Thuộc tính flexDirection quyết định hướng hiển thị của các view con bên trong view cha của nó. Hướng này được gọi là trục chính *main axis*, còn 1 trục vuông góc với main axis gọi là *cross axis*. Các view con được sắp xếp theo trục chính. flexDirection có 4 giá trị như sau:
* *row*: các view con được căn chỉnh theo chiều ngang, từ trái sang phải
* *column* (là giá trị mặc định): các view con được căn chỉnh theo chiều dọc, từ trên xuống dưới. Bạn quay về ví dụ về thuộc tính flex, mình không set giá trị cho thuộc tính flexDirection nên nó nhận giá trị mặc định là column, hiển thị từ trên xuống dưới.
* *row-reverse*: các view con được căn chỉnh theo chiều ngang, từ phải sang trái
* *column-reverse*: các view con được căn chỉnh theo chiều dọc, từ dưới lên trên.

Ví dụ:
```
const App: () => React$Node = () => {
  return (
    // thay đổi thuộc tính flexDirection để xem sự thay đổi
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{marginTop: 70, fontSize: 30, textAlign: "center"}}>flexDirection: row-reverse</Text>
      </View>
      <View style={{flex: 5, flexDirection: "row-reverse"}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    </View>
  );
};
```

Đây là kết quả cho 4 trường hợp:
![](https://images.viblo.asia/3933e3c8-21bf-49f7-bdb8-b95349f87c71.png) ![](https://images.viblo.asia/9b23ac3b-3733-467b-8030-48271e9f0859.png)
![](https://images.viblo.asia/960b9fe6-402a-483e-8279-e9b0afe9826a.png) ![](https://images.viblo.asia/13cac09d-2fe9-4bc2-8fa7-16245e4a9e9d.png)

## Justify Content

Thuộc tính justifyContent căn chỉnh vị trí của view con theo trục chính của view cha. justifyContent có 6 giá trị như sau:
* *flex-start* (giá trị mặc định): các view con được sắp xếp từ đầu của view cha. 
* *flex-end*: các view con được sắp xếp từ cuối của view cha.
* *center*: các view con được sắp xếp từ giữa của view cha.
* *space-between*: sắp xếp sao cho các view con có khoảng cách bằng nhau, nhưng không tạo khoảng cách giữa nó với view cha.
* *space-around*: sắp xếp sao cho các view con có khoảng cách bằng nhau, và có khoảng cách giữa cạnh view ngoài cùng với view cha bằng một nửa so với khoảng cách giữa 2 view con.
* *space-evenly*: sắp xếp sao cho các view con có khoảng cách bằng nhau, và có khoảng cách giữa cạnh view ngoài cùng với view cha bằng với khoảng cách giữa 2 view con.

Ví dụ:
```
const App: () => React$Node = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {/* thay đổi thuộc tính justifyContent để xem sự thay đổi */}
        <View style={{flex: 1}}>
          <Text style={{marginTop: 30, fontSize: 30, textAlign: "center"}}>justifyContent: space-evenly</Text>
        </View>
        <View style={{flex: 5, flexDirection: "column", justifyContent: "space-evenly", backgroundColor: "#EDEBEB"}}>
          <View style={{width: 50, height: 50, backgroundColor: 'red'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'orange'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'green'}} />
        </View>
      </View>
    </SafeAreaView>
  );
};
```

Kết quả với từng giá trị của justifyContent:
![](https://images.viblo.asia/bd22261c-8ae1-47be-a97b-e5c9c9a9594d.png)
![](https://images.viblo.asia/210074be-7d01-4383-86e6-2c84d55977e2.png)
![](https://images.viblo.asia/4ddbd6b6-b002-4095-8982-e136874ee4a9.png)
![](https://images.viblo.asia/639b4493-72fd-41c3-a79a-35f550731455.png)
![](https://images.viblo.asia/86ded15e-fccb-404a-a978-4dd73836df28.png)
![](https://images.viblo.asia/fe53bb2e-fa94-4564-ab80-6399f7664cf3.png)

## Align Items

Thuộc tính alignItems gần giống với justifyContent, nhưng justifyContent được dùng cho trục chính, thì alignItems được sử dụng cho trục **cross axis** (là trục vuông góc với trục chính, được xác định bởi thuộc tính flexDirection). alignItems có 5 giá trị như sau:
* *stretch* (giá trị mặc định): các view con sẽ dãn ra bằng kích thước của cross axis, bạn phải đặt chiều rộng là auto (khi flexDirection là column, hoặc chiều cao là auto khi flexDirection là row), nếu không, giá trị height sẽ ghi đè stretch.
* *flex-start*: các view con được sắp xếp từ đầu của view cha theo trục cross axis.
* *flex-end*: các view con được sắp xếp từ cuối của view cha theo trục cross axis.
* *center*: các view con được sắp xếp từ giữa của view cha theo trục cross axis.
* *baseline*: sắp xếp tất cả các view con cùng về 1 phía.

Ví dụ:
Ở đây trục chính là trục dọc, trục cross axis là chiều ngang:
```
const App: () => React$Node = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {/* thay đổi thuộc tính alignItems (flex-start, flex-end, center) để xem sự thay đổi */}
        <View style={{flex: 1}}>
          <Text style={{marginTop: 30, fontSize: 30, textAlign: "center"}}>alignItems: center</Text>
        </View>
        <View style={{flex: 5, flexDirection: "column", alignItems: "center", backgroundColor: "#EDEBEB"}}>
          <View style={{width: 50, height: 50, backgroundColor: 'red'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'orange'}} />
          <View style={{width: 50, height: 50, backgroundColor: 'green'}} />
        </View>
      </View>
    </SafeAreaView>
  );
};
```

Kết quả theo từng case:
![](https://images.viblo.asia/0feeee58-f092-49ce-b04d-f0ac7a7c5b45.png)
![](https://images.viblo.asia/ba98b0be-273b-4779-bd9d-94ee061c49c3.png)
![](https://images.viblo.asia/dbdd57b4-84a4-4066-96cb-709400f178cb.png)

Ví dụ cho stretch:
```
const App: () => React$Node = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={{marginTop: 30, fontSize: 30, textAlign: "center"}}>alignItems: stretch</Text>
        </View>
        <View style={{flex: 5, flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch", backgroundColor: "#EDEBEB"}}>
          <View style={{height: 50, backgroundColor: 'red'}} />
          <View style={{height: 50, backgroundColor: 'orange'}} />
          <View style={{height: 50, backgroundColor: 'green'}} />
        </View>
      </View>
    </SafeAreaView>
  );
};
```

Kết quả:
![](https://images.viblo.asia/7b9460d6-a520-458b-b751-faae519e9119.png)

Ví dụ cho baseline:
```
const App: () => React$Node = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={{marginTop: 30, fontSize: 30, textAlign: "center"}}>alignItems: stretch</Text>
        </View>
        <View style={{flex: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "baseline", backgroundColor: "#EDEBEB"}}>
          <View style={{width: 50, height: 70, backgroundColor: 'red'}} />
          <View style={{width: 50, height: 90, backgroundColor: 'orange'}} />
          <View style={{width: 50, height: 110, backgroundColor: 'green'}} />
        </View>
      </View>
    </SafeAreaView>
  );
};
```

Kết quả: 
![](https://images.viblo.asia/a426efc8-ac8f-48a6-b0f7-5cbd43af6e9d.png)

## Kết luận
Bài viết này mình chỉ nói về 1 số thuộc tính cơ bản nhất của FlexBox. Cảm ơn các bạn đã đọc bài viết.
Nguồn: https://reactnative.dev/docs/flexbox