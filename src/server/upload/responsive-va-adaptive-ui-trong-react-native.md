### Một số mẹo chung
* Luôn set min width và max width. Điều này giúp cover tốt được các màn hình cỡ XS hoặc XL.
* Sử dụng **Dimension API** được cung cấp bởi **React Native** để set width và height dựa vào số pixel màn hình của từng thiết bị. Cái này khác so với cách sử dụng tỉ lệ '%' theo View cha hoặc theo chính kích thước màn hình đó.
* Sử dụng **KeyboardAvoidingView** để tính toán input khi mở phím ảo trên bất kỳ nền tảng nào.


## Dimensions API

### Sử dụng Media query

**Dimensions API** hoạt động tương tự như **Media query** trong CSS. Về cơ bản thì nó cung cấp width và height chính xác của màn hình, sau đó tính toán để nó luôn co giãn được theo từng kích thước màn hình. Tương tự như responsive trong CSS.

Tham khảo đoạn code sau:
```
let containerStyles = styles.container;
let buttonStyles = styles.button;
let navStyles = styles.nav;

// Just like "@media screen and (max-width: 350px)"
if (Dimensions.get('window').width < 350) {
    containerStyles = styles.containerSmall;
    buttonStyles = styles.buttonSmall;
    navStyles = styles.navSmall;
}
```

### Sử dụng trực tiếp (inline css)

Do **Dimensions.get('window').width** là một giá trị kiểu *Number* nên có thể viết thẳng như sau:

```
imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },
```

### Sử dụng khi thay đổi hướng

Kích thước được tính toán ngay lần đầu tiên khi app được render. Vì vậy khi thay đổi hướng của thiết bị (ngang -> dọc) nó sẽ không được tính toán lại.

Trong trường hợp này có thể sử dụng *useEffect*.

* Bên trong hook *useEffect* tạo một hàm để set style sử dụng **Dimensions API**.
* Thêm *event listener* để lắng nghe khi có sự thay đổi về hướng của thiết bị.

```
...
// Sets the width initially!
const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
        // Sets the widht again if the widht changes,
        // i.e, from potrait to landscape or vice versa
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

return (
    ...
    <View style={{ width: buttonWidth }}>
    <Button
      title="whatever"
    />
  </View>
...
)

...
```

Xem chi tiết tại: [https://reactnative.dev/docs/dimensions](https://reactnative.dev/docs/dimensions)

## ScreenOrientation API

API này được cung cấp bởi Expo. Mục đích là cung cấp về hướng của màn hình sau đó cho phép bạn thao tác hoặc làm bất cứ thứ gì về nó.

Bạn sẽ nhận được các method để lấy hoặc khóa định hướng hoặc thêm các sự kiện để lắng nghe sự thay đổi khi hướng thiết bị thay đổi

Xem thêm tại: [https://docs.expo.io/versions/latest/sdk/screen-orientation/](https://docs.expo.io/versions/latest/sdk/screen-orientation/)

## Style theo từng hệ điều hành cụ thể

*React Native* cung cấp 2 cách để phân tách code theo từng hệ điều hành cụ thể:
* Sử dụng Platform module.
* Sử dụng file extension cụ thể.

### Platform module

Cho phép bạn check các nền tảng đang chạy (IOS, android, web, ...).

Sẽ hữu ích khi bạn muốn style riêng cho từng nền tảng, nên sử dụng tùy chọn này khi cần sự thay đổi nhỏ trên mỗi nền tảng thôi nhé.

```
import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <Text>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "#CCA7B1",
    alignItems: "center",
    justifyContent: "center",
  },
  headerIos: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: "#CCA7B1",
  },
});

export default Header;
```

Xem thêm tại: [https://reactnative.dev/docs/platform-specific-code#platform-module](https://reactnative.dev/docs/platform-specific-code#platform-module)

### Sử dụng các file riêng biệt

Nếu có nhiều code cần sử dụng riêng cho các nền tảng quá thì sử dụng cách này. Ví dụ:

```
MainButton.android.js
MainButton.ios.js
```

Sau đó import và sử dụng khi hệ điều hành tự detect được để sử dụng.

```
import MainButton from "./components/MainButton"
```

Xem thêm tại: [https://reactnative.dev/docs/platform-specific-code#platform-specific-extensions](https://reactnative.dev/docs/platform-specific-code#platform-specific-extensions)

## SafeAreaView

Không được khuyến nghị nhưng được sử dụng để các nội dung không bị chồng chéo lên nhau.