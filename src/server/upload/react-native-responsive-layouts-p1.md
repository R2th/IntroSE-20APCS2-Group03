![](https://images.viblo.asia/5cbe4a1a-5516-4783-9436-53dec3ef961a.jpeg)

Responsive layout trong lập trinh font-end hiểu đơn giản là việc thiết kế giao diện phù hợp với nhiều kích thước thiết bị khác nhau và nhiều trạng thái khác nhau. Trong lập trình di động, việc thực hiện responsive layout cho nhiều thiết bị di động với nhiều thiết bị có kích thước và tỉ lệ màn hình khác nhau là việc tương đối khó khăn với những người mới bắt đầu làm quen với responsive layout.

Trong phần 1 mình sẽ chia sẻ cách xử lý responsive layout đơn giản nhất trong trường hợp người dùng xoay thiết bị di động theo chiều ngang.

# 1. Đặt vấn đề
Đây là giao diện ứng dụng khi thiết bị ở trạng thái màn hình dọc:
![](https://images.viblo.asia/6f5d53d6-9a50-4bf2-b2ed-5845e8953559.png)

Tiếp theo là giao diện khi thiết bị ở trạng thái màn hình ngang trước khi xử lý responsive:

![](https://images.viblo.asia/59dfdcb1-40aa-47ec-ad92-59662ed089fe.png)

Cuối cùng là giao diện thiết bị ở trạng thái màn hình ngang sau khi đã xử lý responsive:

![](https://images.viblo.asia/68602c5a-afa6-4fd6-8256-f7caa62da28d.png)

Giả sử bạn là sử dụng ứng dụng, bạn sẽ muốn sử dụng giao diện ngang theo cách nào. Mình đã tham khảo và thấy rằng, đã số mọi người sẽ thích sử dụng giao diện sau khi đã xử lý responsive. Và điều này cũng được mình chứng bằng việc apple đã xử lý phần danh bạ, tin nhắn… trên các thiết bị iphone của mình theo cách này.

![](https://images.viblo.asia/182b4478-fdf0-4712-be86-b4b0719936c6.PNG)

# 2. Ý tưởng
Để thực hiện việc thay đổi giao diện khi người dùng xoay màn hình thiết bị, chúng ta cần xử lý bắt được sự kiện liên quan đến thao tác này. Sau khi đã kiểm soát được các sự kiện thay đổi màn hình trên thiết bị, ta sẽ tiến hành điều chỉnh giao diện sao cho phù hợp với từng trạng thái.
# 3. Coding
Để bắt lắng nghe các sự kiện thay đổi trên màn hình, mình sẽ sử dụng sự kiện removeEventListener của Dimensions trong react-native

```
static removeEventListener(type, handler)
```
Việc này có thể cần sử dụng ở rất nhiều màn hình nên mình sẽ viết một custom hook để sử dụng cho việc này:
```
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
export const useOrientation = () => {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));
  useEffect(() => {
    const onChange = (res: any) => {
      setScreenInfo(res.screen);
    };
    Dimensions.addEventListener('change', onChange);
    return () => Dimensions.removeEventListener('change', onChange);
  }, []);
  return {
    ...screenInfo,
    isPortrait: screenInfo.height > screenInfo.width,
  };
};
```
Ở đây mình sẽ không giải thích custom hook quá sâu về khái niệm nhưng các bạn có thể hiểu custom hook trong trường hợp này sẽ trả về một object gồm các thông tin liên quan đến màn hình như sau:
![](https://images.viblo.asia/e8ac57a6-b19e-41b9-8db7-709083bd83cf.png)

isPortrait : true khi màn hình ở trạng thái dọc, và false khi màn hình ở trạng thái ngang.

Dựng giao diện:
```
<SafeAreaView
      style={[
        styles.container,
        {flexDirection: orientation.isPortrait ? 'column' : 'row'},
      ]}>
      <View
        style={[
          styles.buttonContainer,
          {
            flexDirection: orientation.isPortrait ? 'row' : 'column',
            justifyContent: orientation.isPortrait ? 'space-around' : 'center',
          },
        ]}>
        <TouchableOpacity style={styles.button}>
          <Text>Button1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Button2</Text>
        </TouchableOpacity>
      </View>
      {!orientation.isPortrait ? (
        <View style={{backgroundColor: '#FFFFFF', height: '100%', width: 2}} />
      ) : null}
      <FlatList<Data>
        data={[
          {key: 'C'},
          {key: 'C++'},
          {key: 'Java'},
          {key: 'C#'},
          {key: 'Javascript'},
          {key: 'Ruby'},
          {key: 'Python'},
          {key: 'Golang'},
        ]}
        ItemSeparatorComponent={renderDivider}
        renderItem={renderItem}
      />
    </SafeAreaView>
```
Code style cho giao diện:
```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    height: 60,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  divider: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
});
```
Chúng ta sẽ có 2 view chính cần sử lý đó là container(view tổng quát của màn hình) và buttonContainer( view hiển thị các button). Khi màn hình ở trạng thái dọc thì view sẽ ở trạng thái hiện thị theo “column” ngược lại khi màn hình ở trạng thái ngang thì view sẽ hiển thị theo ‘row’. Mục đích để khi màn hỉnh ở trạng thái ngang, các button sẽ được di chuyển qua trái và phần còn lại bên phải là danh sách các item.

Với buttonContainer view, khi màn hình ở trạng thái dọc sẽ hiện thị các button theo chiều ngang và ngược lại.

Và đây là kết quả responsive khi thay đổi trạng thái màn hình:
![](https://images.viblo.asia/68602c5a-afa6-4fd6-8256-f7caa62da28d.png)

# 4. Kết luận
Như vậy trong phần 1 mình đã chia sẽ cách xử lý responsive layout khi người dùng thay đổi trạng thái màn hình.

Các bạn có thể tham khảo mã nguồn tại: https://github.com/ducgiangtrankma/ResponsiveLayouts.git

Trong phần tiếp theo mình sẽ chia sẽ cách để tạo một bộ size style theo kích thước màn hình khác nhau để phục vụ cho việc xử lý responsive layout. Hẹn gặp lại các bạn trong phần 2.