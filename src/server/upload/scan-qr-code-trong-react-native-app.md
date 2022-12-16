Hệ thống mã QR trở nên phổ biến do khả năng đọc nhanh và dung lượng lưu trữ lớn hơn so với mã vạch UPC tiêu chuẩn. Các ứng dụng sử dụng rộng rãi mã QR để theo dõi sản phẩm, nhận dạng mặt hàng, theo dõi thời gian, quản lý tài liệu và tiếp thị chung.

# 1. QR code
Mã QR (Quick Response code) là một loại mã vạch ma trận được phát minh vào năm 1994 bởi công ty ô tô Denso Wave của Nhật Bản. Mã QR bao gồm các hình vuông màu đen được sắp xếp trong một lưới vuông trên nền trắng, có thể được đọc bởi một thiết bị hình ảnh như máy ảnh và được xử lý bằng cách sử dụng sửa lỗi Reed – Solomon cho đến khi hình ảnh có thể được giải thích một cách thích hợp. Dữ liệu yêu cầu sau đó được trích xuất từ các mẫu có trong cả thành phần ngang và dọc của hình ảnh.

# 2. React Native 
React Native là một khuôn khổ để xây dựng các ứng dụng gốc bằng React. Nó cung cấp giao diện người dùng bóng bẩy, mượt mà và đáp ứng, đồng thời giảm đáng kể thời gian tải. Việc xây dựng các ứng dụng trong React Native cũng nhanh hơn và rẻ hơn nhiều so với việc xây dựng các ứng dụng gốc mà không cần phải thỏa hiệp về chất lượng và chức năng.

Ý tưởng đằng sau bài viết này là phát triển một ứng dụng quét mã QR bằng React native.

# 3. Bắt đầu
Quét mã QR là việc mà hầu như người dùng smartphone nào cũng đã từng thực hiện ít nhất một lần. Chúng tôi quét mã QR trong các siêu thị, trên các sản phẩm nói chung và giao hàng trên Amazon! Đó là một cách rất tiện dụng để nhận ra sản phẩm thay vì nhập số ID dài 16 chữ số, v.v. Tương tự, đọc số ID từ Hộ chiếu, v.v. có thể rất hữu ích nếu bạn là chủ khách sạn quốc tế và yêu cầu khách mang hộ chiếu làm ID. Hoặc có thể bạn muốn đọc số đăng ký xe bằng điện thoại của mình.

Tất cả điều này hiện có thể được thực hiện trong các ứng dụng React-Native, với thư viện [react-native-qrcode-scanner](https://www.npmjs.com/package/react-native-qrcode-scanner) mã nguồn mở mới nhất có sẵn trong React-Native. Vì vậy, đây là một số plugin và chức năng quét mà bạn có thể triển khai với React-native.

1. [react-native-qrcode-scanner](https://www.npmjs.com/package/react-native-qrcode-scanner)
2. react-native-scan-view
3. [react-native-camera](https://github.com/react-native-community/react-native-camera)

### Bước 1:  Tạo project react native

Nếu bạn lần đầu làm quen, hãy đọc bắt đầu từ [đây](https://reactnative.dev/docs/environment-setup). 

Sau khi đã setup hết môi trường cần thiết, mở terminal ra và: 
```
create-react-native-app qrcode-scanner-app
cd qrcode-scanner-app 
react-native run-android
```

### Bước 2: Thêm dependencies
Cài đặt các dependencies cho QRCode scanning.

```
yarn add react-native-camera@git+https://git@github.com/react-native-community/react-native-camera.git
yarn add react-native-qrcode-scanner
```

Bây giờ, để sử dụng react-native-qrcode-scanner, hãy import mô-đun react-native-qrcode-scanner và sử dụng thẻ <QRCodeScanner />.

> Ở đây, chúng tôi đang làm việc trên phiên bản react-native 0.60.5. Do đó, chúng tôi không cần liên kết bất kỳ gói nào bên ngoài vì trong các phiên bản mới nhất trên 0.60 react-native cung cấp chức năng liên kết tự động.

### Bước 3: Thêm permissions
To set the camera permission you would need to add the following code to the AndroidManifest.xml
```
<uses-permission android:name="android.permission.CAMERA" />
```

### Bước 4: Triển khai QR Code scanner
Bây giờ bạn đã sẵn sàng sử dụng chức năng QR Code scanner được cung cấp bởi react-native-qrcode-scanner và nhận kết quả. Trước khi điều này, chúng ta hãy tạo một cái nhìn đẹp để truy cập chức năng QRCode bằng cách nhấp vào một nút và nhận dữ liệu phản hồi.

Tôi đã tạo một thành phần được gọi là quét để quét mã QR bằng cách sử dụng react-native-qrcode-scanner.

```
scan.js
```

```
import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle'
class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }
onSuccess = (e) => {
        const check = e.data.substring(0, 4);
        console.log('scanned data' + check);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        })
        if (check === 'http') {
            Linking.openURL(e.data).catch(err => console.error('An error occured', err));
        } else {
            this.setState({
                result: e,
                scan: false,
                ScanResult: true
            })
        }
    }
activeQR = () => {
        this.setState({ scan: true })
    }
    scanAgain = () => {
        this.setState({ scan: true, ScanResult: false })
    }
render() {
        const { scan, ScanResult, result } = this.state
        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=> BackHandler.exitApp()}>
                            <Image source={require('./assets/back.png')} style={{height: 36, width: 36}}></Image>
                        </TouchableOpacity>
                        <Text style={styles.textTitle}>Scan QR Code</Text>
                    </View>
                    {!scan && !ScanResult &&
                        <View style={styles.cardView} >
                            <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>
                            <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
                            <Image source={require('./assets/qr-code.png')} style={{margin: 20}}></Image>
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonScan}>
                                <View style={styles.buttonWrapper}>
                                <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>
                                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Scan QR Code</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    {ScanResult &&
                        <Fragment>
                            <Text style={styles.textTitle1}>Result</Text>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Type : {result.type}</Text>
                                <Text>Result : {result.data}</Text>
                                <Text numberOfLines={1}>RawData: {result.rawData}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonScan}>
                                    <View style={styles.buttonWrapper}>
                                        <Image source={require('./assets/camera.png')} style={{height: 36, width: 36}}></Image>
                                        <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click to scan again</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Fragment>
                    }
                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            showMarker={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={
                                <Text style={styles.centerText}>
                                   Please move your camera {"\n"} over the QR Code
                                </Text>
                            }
                            bottomContent={
                                <View>
                                    <ImageBackground source={require('./assets/bottom-panel.png')} style={styles.bottomContent}>
                                        <TouchableOpacity style={styles.buttonScan2} 
                                            onPress={() => this.scanner.reactivate()} 
                                            onLongPress={() => this.setState({ scan: false })}>
                                            <Image source={require('./assets/camera2.png')}></Image>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            }
                        />
                    }
                </Fragment>
            </View>
        );
    }
}
export default Scan;
```

```
scanStyle.js
```

```
import React, { Component } from 'react'
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#2196f3'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '10%',
        paddingLeft: 15,
        paddingTop: 10,
        width: deviceWidth,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white'
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight - 350,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: '10%',
        backgroundColor: 'white'
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white'
    },
    buttonWrapper: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonScan: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#258ce3',
        paddingTop: 5,
        paddingRight: 25,
        paddingBottom: 5,
        paddingLeft: 25,
        marginTop: 20
    },
    buttonScan2: {
        marginLeft: deviceWidth / 2 - 50,
        width: 100,
        height: 100,
    },
    descText: {
        padding: 16,
        textAlign: 'center',
        fontSize: 16
    },
    highlight: {
        fontWeight: '700',
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        padding: 32,
        color: 'white',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    bottomContent: {
       width: deviceWidth,
       height: 120,
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: 'white',
        marginTop: 32,
        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 'bold',
    }
}
export default styles;
```

Cuối cùng là lắng nghe trong `App.js`
```
import React from 'react';
import Scan from './src/scan';
const App = () => {
  return (
    <Scan />
  );
};
export default App;
```

###  5: Chạy project

```
react-native run-android
```
Kết quả: (Do không thể up được :(, toàn bị báo ảnh nặng thui (huhu)) 


https://miro.medium.com/max/720/1*nipQ0P5S4nFKyM2AhDpxmQ.gif

Ngoài ra, có một vào method cung cấp bạn có thể dùng: 

### reactivate()
Gọi phương thức này để bật lại tính năng quét theo chương trình.


`<QRCodeScanner ref={(node) => { this.scanner = node }}> `and calling `this.scanner.reactivate()`

# 4. Props
### onRead (required)
Sẽ gọi phương thức được chỉ định này khi mã QR hoặc mã vạch được phát hiện trong chế độ xem của máy ảnh đi qua trong sự kiện được phát ra khi đọc mã.

### fadeIn (default: true)
Khi được đặt thành true, điều này đảm bảo rằng chế độ xem camera sẽ mờ dần sau khi tải lên ban đầu thay vì được hiển thị ngay lập tức. Đặt giá trị này thành false để ngăn hoạt ảnh mờ dần trong chế độ xem camera.

### reactivate (default: false)
Khi được đặt thành false, khi mã QR được quét, QRCodeScanner sẽ không quét mã khác cho đến khi nó được hiển thị lại. Khi được đặt thành true, điều này sẽ kích hoạt lại khả năng quét của thành phần.

### reactivateTimeout (number default: 0)
Sử dụng điều này để định cấu hình khoảng thời gian sẽ mất trước khi QRCodeScanner kích hoạt lại.

### topContent
Sử dụng điều này để hiển thị bất kỳ nội dung bổ sung nào ở đầu chế độ xem camera.

### bottomContent
Nội dung này để hiển thị bất kỳ nội dung bổ sung nào ở cuối chế độ xem camera.

### cameraType (default: 'back')
propType:  một trong (['front', 'back']) 

Sử dụng tùy chọn này để kiểm soát máy ảnh nào sẽ sử dụng để quét mã QR, mặc định là máy ảnh phía sau.


Ngoài ra, còn rất nhiều props khác như: topViewStyle, bottomViewStyle, cameraProps ... 
chúng ta có thể dễ dàng tìm đọc trong doc hay code lib. 


Mong rằng, bài viết này có thêm chia sẻ cho mọi người về QR code scanning trong React Native. Bài viết được dịch từ: https://medium.com/nerd-for-tech/qr-code-scanner-app-in-react-native-3a4e574d052d