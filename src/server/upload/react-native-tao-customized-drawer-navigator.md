Khi tôi mới phát triển React Native, tôi thấy phần khó nhất của phát triển là Navigation. Sau đó, thách thức tiếp theo là tùy Customized từng navigation bởi vì UI là khía cạnh quan trọng của việc phát triển mobile. Vì vậy, hãy xem cách tôi có thể tùy chỉnh drawer của drawer navigation sử dụng [react-navigation.](https://reactnavigation.org/)

![](https://images.viblo.asia/095bed5f-72d6-4e11-8ae8-2dcd9da3b50b.jpeg)

Để tạo ra một customized drawer navigator, trước tiên bạn cần install 3 thư viện: **react-navigator, native-base, and react-native-vector-icons/Ionicons.**

![](https://images.viblo.asia/e33155c4-f296-4749-9013-465cfdb6edd9.png)

Sau đó, import các thành phần sau vào file **App.js**

![](https://images.viblo.asia/6bb565fa-81ab-4af9-b6e1-41ec8428494b.png)

Bây giờ, hãy tạo drawer navigation trong file App.js. Tôi sẽ đặt tên cho drawer navigation của mình là **"MyNavigator"**.   Navigator này sẽ có 2 màn hình là : **‘HomeComponent’** screen và **‘ProfileComponent’** screen . Các màn hình chỉ định cho từng item trong navigator là tên của các component tôi muốn hiển thị khi người dùng nhấn vào item đó.

![](https://images.viblo.asia/4053a574-fd3b-4d04-af12-a48be5a96ac6.png)

Ban đầu, các screen component bạn đặt cho drawer navigation nên hoặc có thể trông giống như thế này: 

![](https://images.viblo.asia/76303ca0-efb0-42e8-a6bb-2c3476a49ba1.png)

Và tất nhiên, đừng quên import các component mà bạn gán trong navigator bên trong **App.js**:

![](https://images.viblo.asia/622b2033-1d10-4acc-b178-411ff0a66aa3.png)

Bây giờ, khi mà bạn test ứng dụng của bạn, bạn sẽ có thể vuốt sang trái và điều hướng navigator đi ra. Nhưng  nếu bạn muốn 1 icon bánh menu hiển thị trên screen  của mình  để người dùng có thể nhấn và drawer navigatior có thể  đẩy ra ngoài?

Tất cả bạn có thể làm là thêm "Header" vào mỗi component bạn đã đặt tên trong drawer navigator và thêm icon bên trong nó giống như thế này: 

![](https://images.viblo.asia/ed8853ee-3346-4b66-ab1b-994bdcefd388.png)

Bạn có bao giờ tự hỏi **'this.props.navigation'** đó là gì?. Well, bất cứ khi nào bạn muốn chỉ định  một component cho screen trong navigator. Component đó sẽ tự động  được truyền qua **"navigation" prop**.  Để tìm hiểu thêm về điều này, [bạn có thể đọc qua document này](https://reactnavigation.org/docs/en/navigation-prop.html).

Bây giờ, bạn sẽ thấy một icon menu nhỏ ở góc trên cùng bên trái màn hình của bạn. Khi nhấp vào, navigator sẽ trượt vào màn hình. Nhưng nếu bạn muốn một logo được thêm vào trên đầu drawer navigator của bạn thì sao?

Chúng ta chỉ cần tạo một component mới (tôi sẽ đặt tên cho nó là **'customNavigator'**, trong **App.js** của tôi).

![](https://images.viblo.asia/5d5ceec5-4588-456d-b4c3-a319b7cebf93.png)

Tiếp theo, chúng ta phải thêm một vài configurations cho drawer navigator của chúng ta. Đầu tiên là **initialRouteName**, đây là màn hình default bạn muốn hiển thị. Thứ hai là **contentComponent** nơi chúng ta sẽ gán **customNavigator** và ba cái cuối cùng là drawerOpenRoute, drawerCloseRoute, và drawerToggleRoute, cả ba đều bắt buộc khi bạn tùy chỉnh drawer navigator của mình.

Vì vậy, bây giờ, **MyNavigator** sẽ trông như thế này:

![](https://images.viblo.asia/eb9c3143-bccc-432c-91ef-514c20cd5598.png)

Tất cả những gì chúng ta cần làm là thêm các navigator items thông qua **DrawerItems**, chúng ta sẽ chuyển các props lên.

![](https://images.viblo.asia/4a3a0a01-b923-4da4-bdfc-d1f6f82e2102.png)

Bây giờ hãy để thêm icon bên cạnh mỗi drawer item. Đối với mỗi component bạn đã gán cho một màn hình, hãy thêm phần sau để gán title cho item đó và icon cho nó. Để xem tất cả các tùy chọn cho các biểu tượng **Ionicons**, [hãy vào đây](https://ionicons.com/).

![](https://images.viblo.asia/7eff4e22-dd93-4eae-b1c5-b21cd269e005.png)

Cuối cùng, hãy render **'MyNavigator'** component của tôi trong **App** component. Bằng cách này, bất kỳ màn hình nào tôi đặt để hiển thị làm màn hình mặc định sẽ là điều đầu tiên tôi sẽ thấy khi mở ứng dụng của chúng tôi.

![](https://images.viblo.asia/8f6ac218-15ca-4caa-a8ea-8b1e4ad475e5.png)

Và đó là tất cả! Drawer navigator custom của bạn sẽ làm việc bây giờ!

**Tài liệu tham khảo**

https://medium.com/@g.a.salamat/react-native-creating-a-customized-drawer-navigator-7fe818ceff03