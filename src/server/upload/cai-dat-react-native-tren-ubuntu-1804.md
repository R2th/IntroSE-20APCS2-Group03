Để cài đặt được react native trên ubuntu phiên bản **18.04** bạn làm theo các bước sau:
![](https://images.viblo.asia/a7d7d6a3-c6c0-4166-bcb6-96e862548811.png)
## 1. cài đặt `node` và `npm`.

- Nhiều người gặp tình trạng khi cài xong xuôi rồi thì không chạy được project do không tương thích với version của `nodejs`, để tiện cho quá trình làm việc của mọi người mình recommened cho mọi người cài thêm `nvm` để quản lý được version nodejs trong máy cá nhân của mình. Mọi người cài đặt theo trình tự sau nhé (paste thẳng vào terminal và đợi thôi):
* Cài NVM
    ```
    apt-get update
    apt-get install build-essential libssl-dev

    // install nvm
    curl-o-https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

    // reload bash
    source ~/.bashrc

    // kiểm tra lại version
    nvm --version
    ```
* Cài Node
    ```
    // install latest node
    nvm install node

    // set default node version for nvm
    nvm alias default node

    // check version of node and npm
    node -v
    npm -v
    ```
## 2. Cài watchman
Bạn cứ làm phát theo thằng này :grin: 
```
git clone https://github.com/facebook/watchman.git
cd watchman/
git checkout v4.9.0
sudo apt-get install -y autoconf automake build-essential python-dev libssl-dev libtool
./autogen.sh
./configure
make
sudo make install
```
## 3. cài đặt `android studio`
* Cài đặt Java (cái này là bắt buộc nhé).
    ```
    sudo apt install openjdk-8-jre openjdk-8-jdk
    ```
* Cài android studio (Mình recommened bạn cài android studio vì nó rất tiện trong quản lý máy ảo vào một số vấn đề liên quan đến fix thư viện thiếu của máy ảo, trước mình mới tìm hiểu thì bị lỗi rất nhiều sau thì thấy thằng android studio này có trình tự fix mấy cái lỗi đó nên thấy nó rất hợp lý và cài thôi).

    `sudo snap install android-studio`

    => Bạn cần config lại path theo phần dưới đây vào file `.bash_profile`
    hoặc `.zshrc`:
    ```
    export ANDROID_HOME=$HOME/Android/Sdk
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    # Config khi bật máy ảo bằng terminal dùng alias nhanh hơn là việc gõ đường dẫn :v
    function emulator { ( cd "$(dirname "$(whence -p emulator)")" && ./emulator "$@"; ) }
    alias emu="$ANDROID_HOME/tools/emulator"
    ```

    Reload `.bash_profile`
    hoặc `.zshrc`:
    ```
    source ~/.bash_profile
    ```
    => Cách tạo và bật máy ảo:
    ```
    // Create avd device
    avdmanager create avd -n doo1 -k "system-images;android-27;google_apis_playstore;x86" --device 'Nexus 5X
    // run emulator
    emu -avd doo1
    ```
    ![](https://images.viblo.asia/c5caef7d-99af-488e-ade3-685fb47b5f2a.png)
        
## 4. Cài đặt `react-native`
- Dạo loanh quanh thế là đủ rồi, vào vấn đề chính này. bạn cài đặt react-native-cli đúng như trên Docs luôn. `Đọc kỹ hướng dẫn trước khi dùng` nhé!

    ```
    npm install -g react-native-cli
    ```
- Tạo và build một app nào:
    ```
    react-native init AwesomeApp
    // Move to created project dir.
    cd AwesomeApp
    // Start react-native packager
    npm start
    // open up another terminal and run android
    react-native run-android
    ```

    ![](https://images.viblo.asia/d07bc7f1-dc29-487d-92bc-20d6fbb14c8b.png)

## **Các Bước để run app**
1. Bật emulator

    `emu @Pixel_API_23` => tương ứng với cái alias ở trên kia nhé!
    nếu bạn thích luyện công chút thì tự gõ cũng được.

2. Chạy yarn start

    Mở terminal trỏ đến thư mục của app rồi chạy lệnh sau:
    `yarn start`
    chống mắt lên nó load => `done` không nhé! :vulcan_salute: 

3. Build app

    Giữ nguyên tab terminal tab trên nhé, mở tab mới cũng trỏ đên thư mục đó và chạy lệnh sau để build app
    `react-native run-android`
 
## **Một số lỗi thường gặp**
1. Trong trường hợp máy bạn bị lỗi khi khởi chạy `react-native run-android` , bạn tạo thêm file `local.properties` trong thư mục `/android` của source code. và khai báo trong file vừa được tạo nội dung sau `sdk.dir = /home/<USER>/Android/Sdk/` rồi chạy lại nhé! 
2. Trong trường hợp bạn chạy lại bị lỗi timestamp ....
    >     ERROR  A non-recoverable condition has triggered.  Watchman needs your help!
    >     The triggering condition was at timestamp=1443812455: inotify-add-watch(/home/oren/projects/react-native/ReactNative-PropertyFinder/node_modules/react-native/node_modules/module-deps/node_modules/detective/node_modules/escodegen/node_modules/.bin) -> The user limit on the total number of inotify watches was reached; increase the fs.inotify.max_user_watches sysctl
    >     All requests will continue to fail with this message until you resolve
    >     the underlying problem.  You will find more information on fixing this at
    >     https://facebook.github.io/watchman/docs/troubleshooting.html#poison-inotify-add-watch

    **Cách fix**
    ```
    echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
    echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
    echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
    watchman shutdown-server
    ```
3. Lỗi không yarn start
    ```
    watchman watch-del-all && \
    rm -rf node_modules && \
    rm -rf /tmp/metro-bundler-cache-* && \
    rm -rf /tmp/haste-map-react-native-packager-* && \
    yarn 
    ```
    

Source: https://medium.com/@dooboolab/running-react-native-app-in-ubuntu-18-04-7d1db4ac7518