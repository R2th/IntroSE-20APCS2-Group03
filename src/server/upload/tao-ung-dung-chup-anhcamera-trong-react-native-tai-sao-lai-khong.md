# 1. Mở đầu
- Xin chào các bạn lại là mình đây. Hôm nay đến với bài chia sẻ này thì mình muốn chia sẻ với các bạn về một framework mới mà mình đang trong quá trình học nhé. Nói đến React là các bạn  nghĩ ngay đến một công nghệ mới được phát triển và được sử dụng bởi Facebook đúng ko nào.
- React ra đời là làm đổi mới ngành lập trình, các bạn cứ tưởng tượng khi mình lập trình một đoạn code, sau khi bạn ấn Save thì lập tức trên trang web, hay app bạn đang test thì sẽ render ngay lập tức thật tuyệt vời phải không nào. Nó khác xa so với những framwork khác là khi thay đổi một đoạn code nào đó chúng ta phải load lại trang mới thấy những thay đổi đó.
- Mình lập trình về ngôn ngữ Ruby, ở công ty mình được tham gia vào dự án về ReactJs. Từ đó mình được học và tham gia dự án thực thế về ReactJs, khi mình code nó thì mình thấy rất perfect, nó là một thư viện của Javascript giúp bạn xây dựng các tầng Views(MVC) một các dễ dàng.
- Trong React thì chúng ta xây dựng các trang web thành những thành phần (component) nhỏ. Từ đó chúng ta thấy code thoáng dễ sử dụng, ngoài ra việc dùng lại code được sử dụng nhiều.
- React ra đời bao gồm cho phiên bản web là (ReactJs), cho phiên bản mobile(React native).
- Mới đây thì mình mới tìm hiểu về React Native và thấy thật tuyệt vời, việc tìm hiểu, học, code về nó cũng ko có gì khó khăn, tài liệu và có cộng đồng support rất đông đảo. Việc tạo một app đơn giản chỉ trong vài phút là bạn có thể tạo và chạy thử nghiệm trên chính chiếc điện thoại có hệ điều hành Android hoặc Ios.
- Đây là  2 trang chủ học ReactJs vs React Native các bạn có thể học kiến thức cơ bản đầy đủ nhất nhé:
  + https://reactjs.org/
  + https://facebook.github.io/react-native/docs/tutorial
- OK!  không dài dòng nữa các bạn cùng mình đi tìm hiểu về React Native xem nó có những lý do nào mà trở thành một front-end JavaScript framework phổ biến nhất nhé !!!!
# 2. Tìm hiểu về React Native
- React Native được Facebook release vào năm 2015, cho phép các bạn tạo ra các ứng dụng di động  chỉ với Javascript và React.

![](https://images.viblo.asia/03b3446c-58bb-4aed-8389-180ef3e5dda4.png)

- React Native ra đời giải quyết bài toán hiệu năng của Hybrid và bài toán chi phí khi viết nhiều loại ngôn ngữ native cho từng loại nền tảng di động. 
- Với React Native chúng ta có thể build ứng dụng đó một các đa nền tảng (multi-platform), chứ không phải là một "Mobile Web App" không phải là “HTML5 app”, và cũng không phải là một “hybrid app” hay cũng không chỉ build trên iOS hay Android mà chúng ta build và chạy được cả hai hệ điều hành => rất tiện phải không nào. 
- MÌnh sẽ đưa ra một số ưu  điểm của React Native để bạn thấy tại sao nó lại đc sử dụng rộng rãi đến thế nhé:
   - Thời gian khi bạn muốn phát triển một ứng dụng rất nhanh chóng.
   - Hiệu năng chạy ổn định, không ngừng cập nhật phiên bản mới càng ngày càng hoàn thiện hơn.
   - Cộng đồng phát triển mạnh.
   - Xây dựng cho nhiều hệ điều hành khác nhau với ít native code nhất.
   - Quan trọng nhất là trải nghiệm người dùng rất tốt....
   - Team phát triển dự án nhỏ, một dự án code bằng React Native thường rút ngắn thời gian rất nhiều so với các dự án sử dụng ngôn ngữ khác.
   - Thực sự rất dễ học, nếu bạn đã biết qua với javascript thì học React sẽ nhanh, và yên tâm có cộng đồng support rất đông đảo.
 - Còn rất nhiều ưu điểm của nó nhưng mình chỉ nêu vài tiêu chí nhé, các bạn có thể lên các trang web dạy React Native để tìm kiếm thêm thông tin. Nào cùng đến với lập trình app camera sau đây nhé.
# 3. App camera
## 3.1 Chuẩn bị
  - Các bạn cần có 1 chiếc điện thoại đang dùng hệ điều hành Android, IOS.
  - Các bạn vào CH Play search ứng dụng Expo và cài đặt.
  - Sử dụng 1 công cụ để lập trình :
       + Visual Studio Code
       + Expo
       + React Native Debugger
   - Mình dùng quen Visual Studio Code  nên mình sử dụng nó để lập trình.
## 3.2 Tạo app demo
- Các bạn chạy đoạn lệnh này terminal để cài đặt expo-cli nhé:
    ```
    npm install -g expo-cli
    ```
 - Tạo project:
   ```
   expo init DemoReactCamera
   ```
    
  - Truy cập vào project và start project, chúng ta chạy 2 lệnh sau:
       ```
       cd DemoReactCamera
       npm start
       ```
   - Sau khi các bạn chạy lệnh trên thì trình duyệt các bạn đang mở sẽ mở ra một tab mới hiển thị log của ứng dụng khi bạn chạy. Ở đây các bạn có thể xem các lỗi khi chúng ta code cũng như console.log() dữ liệu mà chúng ta muốn kiểm tra.
   
  ![](https://images.viblo.asia/cbf2477a-49d8-4a30-8b69-6cfca55bd0f6.png)
  
   - Chúng ta sử dụng điện thoại vào phần mềm Expo mà mình đã hướng dẫn ở trên cài chọn Scan QR Code quét ảnh ở bên góc bên trái dưới chân màn hình show log như ở hình trên
   
  ![](https://images.viblo.asia/65966f19-11e4-45c8-b852-8360e7620c30.jpg)
   
  - Và đây là giao diện đầu tiên của App khi chúng ta chạy trên chính điện thoại của mình:
  
![](https://images.viblo.asia/528367da-46e0-488a-8222-1f03a6945c39.jpg)
  
  - Các bạn hãy cùng mình lập trình để tạo nên ứng dụng camera nhé.
   
## 3.3  Coder
- Đây là thứ tự các thư mục trong project:

![](https://images.viblo.asia/5559bb1d-9e36-48e1-a582-eac78c50ad98.png)

- Hình ảnh app mà mình chạy lên sau khi code hoàn thành:

![](https://images.viblo.asia/7acb1ad2-ab46-4464-b6a9-fb43e3d4705c.jpg)

- Mình chỉ thao tác code trên 2 thư mục App.js và src
 - Các package sau được sử dụng trong quá trình code:
    ```
     npm install expo
     npm install @expo/vector-icons
     npm install react-native-easy-grid --save
    ```
###    3.3.1 Thư mục style.js
- Thư mục này căn vị trí các thành phần trong app.
    ```
        import { StyleSheet, Dimensions } from 'react-native';

        const { width: winWidth, height: winHeight } = Dimensions.get('window');

        export default StyleSheet.create({
          alignCenter: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
          preview: {
            height: winHeight,
            width: winWidth,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          bottomToolbar: {
            width: winWidth,
            position: 'absolute',
            height: 100,
            bottom: 0,
          },
          captureBtn: {
            width: 60,
            height: 60,
            borderWidth: 2,
            borderRadius: 60,
            borderColor: "#FFFFFF",
          },
          captureBtnActive: {
            width: 80,
            height: 80,
          },
          captureBtnInternal: {
            width: 76,
            height: 76,
            borderWidth: 2,
            borderRadius: 76,
            backgroundColor: "red",
            borderColor: "transparent",
          },
          galleryContainer: {
            bottom: 100
          },
          galleryImageContainer: {
            width: 75,
            height: 75,
            marginRight: 5
          },
          galleryImage: {
            width: 75,
            height: 75
          }
        });
    ```
### 3.3.2 Thư mục toolbar.js
- Thư mục này hiển thị icon  chụp, đèn flash, chuyển camera trước.
    ```
        import React from 'react';
        import { Camera } from 'expo';
        import { Ionicons } from '@expo/vector-icons';
        import { Col, Row, Grid } from "react-native-easy-grid";
        import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

        import styles from './style';

        const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

        export default ({
          capturing = false,
          cameraType = CameraTypes.back,
          flashMode = CameraFlashModes.off,
          setFlashMode, setCameraType,
          onCaptureIn, onCaptureOut, onLongCapture, onShortCapture,
        }) => (
            <Grid style={styles.bottomToolbar}>
              <Row>
                <Col style={styles.alignCenter}>
                  <TouchableOpacity onPress={() => setFlashMode(
                    flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
                  )}>
                    <Ionicons
                      name={flashMode == CameraFlashModes.on ? "md-flash" : 'md-flash-off'}
                      color="white"
                      size={30}
                    />
                  </TouchableOpacity>
                </Col>
                <Col size={2} style={styles.alignCenter}>
                  <TouchableWithoutFeedback
                    onPressIn={onCaptureIn}
                    onPressOut={onCaptureOut}
                    onLongPress={onLongCapture}
                    onPress={onShortCapture}>
                    <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
                      {capturing && <View style={styles.captureBtnInternal} />}
                    </View>
                  </TouchableWithoutFeedback>
                </Col>
                <Col style={styles.alignCenter}>
                  <TouchableOpacity onPress={() => setCameraType(
                    cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back
                  )}>
                    <Ionicons
                      name="md-reverse-camera"
                      color="white"
                      size={30}
                    />
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          );
    ```
### 3.3.3 Thư mục gallery.js
- Thư mục này hiển thị danh sách ảnh bạn vừa chụp thu nhỏ dưới chân màn hình.
    ```
        import React from 'react';
        import { View, Image, ScrollView } from 'react-native';

        import styles from './style';

        export default ({ captures = [] }) => (
          <ScrollView
            horizontal={true}
            style={[styles.bottomToolbar, styles.galleryContainer]}
          >
            {captures.map(({ uri }) => (
              <View style={styles.galleryImageContainer} key={uri}>
                <Image source={{ uri }} style={styles.galleryImage} />
              </View>
            ))}
          </ScrollView>
        );
    ```
### 3.3.4 Thư mục camera.js
- Thư mục này nơi thực hiện chức năng chính của phần mềm camera là chụp ảnh, chuyển camera sau thành camera trước, bật đèn flash trước khi chụp.
    ```
        import React from 'react';
        import { View, Text } from 'react-native';
        import { Camera, Permissions } from 'expo';

        import styles from './style';
        import Toolbar from './toolbar';
        import Gallery from './gallery';

        export default class CameraPage extends React.Component {
          camera = null;

          state = {
            captures: [],
            capturing: null,
            hasCameraPermission: null,
            cameraType: Camera.Constants.Type.back,
            flashMode: Camera.Constants.FlashMode.off,
          };

          setFlashMode = (flashMode) => this.setState({ flashMode });
          setCameraType = (cameraType) => this.setState({ cameraType });
          handleCaptureIn = () => this.setState({ capturing: true });

          handleCaptureOut = () => {
            if (this.state.capturing)
              this.camera.stopRecording();
          };

          handleShortCapture = async () => {
            const photoData = await this.camera.takePictureAsync();
            this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
          };

          handleLongCapture = async () => {
            const videoData = await this.camera.recordAsync();
            this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
          };

          async componentDidMount() {
            const camera = await Permissions.askAsync(Permissions.CAMERA);
            const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
            const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

            this.setState({ hasCameraPermission });
          };

          render() {
            const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

            if (hasCameraPermission === null) {
              return <View />;
            } else if (hasCameraPermission === false) {
              return <Text>Access to camera has been denied.</Text>;
            }

            return (
              <React.Fragment>
                <View>
                  <Camera
                    type={cameraType}
                    flashMode={flashMode}
                    style={styles.preview}
                    ref={camera => this.camera = camera}
                  />
                </View>

                {captures.length > 0 && <Gallery captures={captures} />}

                <Toolbar
                  capturing={capturing}
                  flashMode={flashMode}
                  cameraType={cameraType}
                  setFlashMode={this.setFlashMode}
                  setCameraType={this.setCameraType}
                  onCaptureIn={this.handleCaptureIn}
                  onCaptureOut={this.handleCaptureOut}
                  onLongCapture={this.handleLongCapture}
                  onShortCapture={this.handleShortCapture}
                />
              </React.Fragment>
            );
          };
        };
     ```
### 3.3.4 Thư mục App.js
- Từ đây chúng ta gọi đến thư mục camera và render ra view của app.
    ```
        import React from 'react';

        import CameraPage from './src/camera';

        export default class App extends React.Component {
          render() {    ```
        import React from 'react';
        import { View, Image, ScrollView } from 'react-native';

        import styles from './style';

        export default ({ captures = [] }) => (
          <ScrollView
            horizontal={true}
            style={[styles.bottomToolbar, styles.galleryContainer]}
          >
            {captures.map(({ uri }) => (
              <View style={styles.galleryImageContainer} key={uri}>
                <Image source={{ uri }} style={styles.galleryImage} />
              </View>
            ))}
          </ScrollView>
          );
            return (
              <CameraPage />
            );
          };
        };
    ```
# 4. Kết luận
- Rất dễ để tạo ra một app trên điện thoại phải không nào. 
-  Các bạn có thể vào link sau và tải code của mình đã làm trên về để thử nghiệm nhé (nhớ chạy lệnh `npm install` để cài đặt package nhé).

    https://github.com/phamminhphuong/demo-react-camera
 - OK. Cám ơn các bạn đã theo dõi bài viết của mình. Nếu thấy hay hãy thả tim nhé!