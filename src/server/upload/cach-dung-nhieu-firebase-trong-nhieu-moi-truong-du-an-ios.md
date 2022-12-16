Chắc các bạn đã làm việc rất nhiều về các sản phầm của Firebase như Firebase Realtime Database, Analytics, Crashlytics, Cloud Storage …Việc tích hợp Firebase vào project đơn giản chỉ cần kéo file GoogleService-Info.plist vào trong project (Easy phải không nào). Nhưng trong dự án của các bạn được chia thành các môi trường khác nhau như môi trường của dev, môi trường product thì dữ liệu từ app gửi lên lên firebase thì không thể dùng chung  giữa các môi trường như vậy được. Hôm nay mình sẽ hướng dẫn các bạn cách setting firebase trên các môi trường khác nhau.
### I, Các bước để xây dưng môi trường:
### 1.	Trước tiên,  phải xây dựng môi trường của dự án
Mặc định thì khi tạo project , xcode luôn để 2 môi trường mặc định là debug và Release.
![](https://images.viblo.asia/1d019be2-8725-4e63-b5cf-76b01d54d892.png)
### 2.	Trong Firebase console , create ứng dụng cho từng môi trường khác nhau:
![](https://images.viblo.asia/a7786cc8-4202-455c-8c70-afb2a023a110.png)
### 3. Trong bảng điều khiển Firebase, tải GoogleService-Info.plist cho từng app.
![](https://images.viblo.asia/f87bcf04-4127-4765-89b2-1f1cb02ed224.png)
### 4. Trong Project dự án các bạn tạo các thư mục như trong hình:
![](https://images.viblo.asia/7967b459-ddb7-45e2-bd18-5a33f3410aa0.png)
### 5. Trong Xcode project navigator, chọn Build Phases -> nhấn (+) chọn New Run Script Phase
![](https://images.viblo.asia/0c64fed8-625a-4bfa-92b6-47740f42678f.png)
Sau đó đổi tên thành “Setup Firebase Environment GoogleService-Info.plist” hoặc tên bất kỳ.
### 6. Implement đoạn shell scrip này vào sau vào:
```
# Name of the resource we're selectively copying
GOOGLESERVICE_INFO_PLIST=GoogleService-Info.plist

# Get references to dev and prod versions of the GoogleService-Info.plist
# NOTE: These should only live on the file system and should NOT be part of the target (since we'll be adding them to the target manually)
GOOGLESERVICE_INFO_DEV=${PROJECT_DIR}/${TARGET_NAME}/Firebase/Dev/${GOOGLESERVICE_INFO_PLIST}
GOOGLESERVICE_INFO_PROD=${PROJECT_DIR}/${TARGET_NAME}/Firebase/Prod/${GOOGLESERVICE_INFO_PLIST}

# Make sure the dev version of GoogleService-Info.plist exists
echo "Looking for ${GOOGLESERVICE_INFO_PLIST} in ${GOOGLESERVICE_INFO_DEV}"
if [ ! -f $GOOGLESERVICE_INFO_DEV ]
then
echo "No Development GoogleService-Info.plist found. Please ensure it's in the proper directory."
exit 1
fi

# Make sure the prod version of GoogleService-Info.plist exists
echo "Looking for ${GOOGLESERVICE_INFO_PLIST} in ${GOOGLESERVICE_INFO_PROD}"
if [ ! -f $GOOGLESERVICE_INFO_PROD ]
then
echo "No Production GoogleService-Info.plist found. Please ensure it's in the proper directory."
exit 1
fi

# Get a reference to the destination location for the GoogleService-Info.plist
PLIST_DESTINATION=${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app
echo "Will copy ${GOOGLESERVICE_INFO_PLIST} to final destination: ${PLIST_DESTINATION}"

# Copy over the prod GoogleService-Info.plist for Release builds
if [ "${CONFIGURATION}" == "Release" ]
then
echo "Using ${GOOGLESERVICE_INFO_PROD}"
cp ${GOOGLESERVICE_INFO_PROD} ${PLIST_DESTINATION}
else
echo "Using ${GOOGLESERVICE_INFO_DEV}"
cp ${GOOGLESERVICE_INFO_DEV} ${PLIST_DESTINATION}
fi
```
![](https://images.viblo.asia/1cde03ea-e2aa-4373-92eb-bd0ef2c15db0.png)
Các bạn có điều chỉnh đoạn shell script trên tuỳ theo môi trường của dự án của bạn 
### 7. OK để test xem các ban đã setting môi trường đúng cho thì các bạn làm như sau:
![](https://images.viblo.asia/64182448-5049-4f27-9426-455fcdd86c1a.png)
Giả sử, mình  setting môi trường Debug:
![](https://images.viblo.asia/f609be30-a928-4638-8d59-53cc9f2abbc4.png)
Để kiểm trả xem app đã kết nối với server Firebase chưa thì ở bước add Firebase to your IOS app : 
![](https://images.viblo.asia/3c8fe8be-6c33-4168-9c20-962d4bcfbed8.png)
Các bạn run app và đợi xem app đã kết nối tới firebase chưa
![](https://images.viblo.asia/9ed003b3-882f-4a46-86f0-6e5955545a33.png)
Nếu kết quả như hình dưới thì thành công:
![](https://images.viblo.asia/631baa32-3098-4324-a522-e93a2451ad54.png)
Tương tự các bạn thực hiện thay đổi môi trường và thực hiện lại các bước trên để test nhé
Bài viết của mình đến đây là hết ^_^

 # II. Tài liệu Tham khảo:
https://medium.com/rocket-fuel/using-multiple-firebase-environments-in-ios-12b204cfa6c0
# III. Source code
https://github.com/tylermilner/FirebaseEnvironmentsDemo