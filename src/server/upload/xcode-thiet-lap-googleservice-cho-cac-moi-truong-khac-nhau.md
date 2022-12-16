Chào các bạn, trong bài viết này mình sẽ chia sẻ cách mình đã tìm hiểu và áp dụng vào trong các dự án cần tích hợp Google service vào các môi trường khác nhau ví dụ như: Development, Staging, Production. Hy vọng bài viết này sẽ giúp các bạn tiết kiệm thời gian khi cần đến. Hiện tại, mỗi môi trường mình thấy sẽ cần một bundle id khác nhau, tương ứng với google services thì chúng ta cũng sẽ cần các file **GoogleService-Info.plist** khác nhau. Dưới đây mình sẽ hướng dẫn các bạn tích hợp nó vào các môi trường mong muốn.
### Tạo thư mục 
Đầu tiên thì chúng ta cần phải mở thư mục chứa project lên. Ở đây chúng ta sẽ cần phải tạo một thư mục để chứa các file **GoogleService-Info.plist**. Mình tạo thư mục và phân chia như hình dưới đây: 
![](https://images.viblo.asia/940de5f8-4d4d-4a84-9ac6-7f14e840c634.png)
Với các thư mục con Dev, Staging, Production thì chúng ta sẽ copy file  **GoogleService-Info.plist** tương ứng cho các môi trường. 
### Add thư mục vào project
Sau khi đã chuẩn bị đc các thư mục và file **GoogleService-Info.plist** tương ứng. Hãy mở project của bạn, tiếp theo, chọn chuột phải vào thư mục đang chứa folder vừa tạo -> Add files to "....."
**Lưu ý chọn : Create folder reference**
![](https://images.viblo.asia/30d898c3-d54e-41fd-8bf0-24873f8d16d3.png)
Sau khi đã add file vào project rồi thì nó sẽ có hình như sau:
![](https://images.viblo.asia/6b6a97c3-641c-4d84-94c3-ba64dbc3b3be.png)
Sau khi đã add xong thư mục chứa file thành công, chúng ta sẽ cần 1 đoạn script để có thể sử dụng đc file  **GoogleService-Info.plist** tương ứng.
### Config script
Tiếp theo, chúng ta sẽ cần tìm đến tab Build phases. Ở đây chúng ta cần tạo **New Run Script Phase**. Ở đây mình sẽ đặt tên nó là **Config Google Service**
![](https://images.viblo.asia/81aea866-98d9-4f97-aa3f-9df666c41171.png)
Ở đầy mình sẽ sử dụng đoạn script dưới đây để tiến hành copy file  **GoogleService-Info.plist** vào project tương ứng với môi trường mà chúng ta config.
```
# Xác định tên của file
GOOGLESERVICE_INFO_PLIST=GoogleService-Info.plist

# Xác định đương dẫn của file tương ứng cho các môi trường (Dev, staging, production)
GOOGLESERVICE_INFO_DEV=${PROJECT_DIR}/${TARGET_NAME}/GoogleService/Dev/${GOOGLESERVICE_INFO_PLIST}
GOOGLESERVICE_INFO_STAGING=${PROJECT_DIR}/${TARGET_NAME}/GoogleService/Staging/${GOOGLESERVICE_INFO_PLIST}
GOOGLESERVICE_INFO_PRODUCTION=${PROJECT_DIR}/${TARGET_NAME}/GoogleService/Production/${GOOGLESERVICE_INFO_PLIST}

# Kiểm tra xem có tồn tại file cho môi trương dev hay ko?
echo "Looking for ${GOOGLESERVICE_INFO_PLIST} in ${GOOGLESERVICE_INFO_DEV}"
if [ ! -f $GOOGLESERVICE_INFO_DEV ]
then
echo "No Development GoogleService-Info.plist found. Please ensure it's in the proper directory."
exit 1
fi

# Kiểm tra xem có tồn tại file cho môi trương staging hay ko?
echo "Looking for ${GOOGLESERVICE_INFO_PLIST} in ${GOOGLESERVICE_INFO_STAGING}"
if [ ! -f $GOOGLESERVICE_INFO_STAGING ]
then
echo "No STAGING GoogleService-Info.plist found. Please ensure it's in the proper directory."
exit 1
fi

# Kiểm tra xem có tồn tại file cho môi trương production hay ko?
echo "Looking for ${GOOGLESERVICE_INFO_PLIST} in ${GOOGLESERVICE_INFO_PRODUCTION}"
if [ ! -f $GOOGLESERVICE_INFO_PRODUCTION ]
then
echo "No Production GoogleService-Info.plist found. Please ensure it's in the proper directory."
exit 1
fi
# chỉ ra vị trí sẽ copy file đến.
PLIST_DESTINATION=${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app
echo "Will copy ${GOOGLESERVICE_INFO_PLIST} to final destination: ${PLIST_DESTINATION}"

# kiểm tra môi trường tương ứng để tiến hành copy file đến vị trí chính xác
if [ "${CONFIGURATION}" == "Staging" ] || [ "${CONFIGURATION}" == "StagingRelease" ]
then
echo "Using ${GOOGLESERVICE_INFO_STAGING}"
cp "${GOOGLESERVICE_INFO_STAGING}" "${PLIST_DESTINATION}"
elif [ "${CONFIGURATION}" == "Production" ] || [ "${CONFIGURATION}" == "ProductionRelease" ]
then
echo "Using ${GOOGLESERVICE_INFO_PRODUCTION}"
cp "${GOOGLESERVICE_INFO_PRODUCTION}" "${PLIST_DESTINATION}"
else
echo "Using ${GOOGLESERVICE_INFO_DEV}"
cp "${GOOGLESERVICE_INFO_DEV}" "${PLIST_DESTINATION}"
fi
```
Ở trong đoạn code trên mình đã note các bước vào script sẽ tiến hành thực thi, các bạn chỉ cần bỏ chút thời gian đọc là có thể hiểu được đoạn code hoạt động thế nào, ngoài ra có thể thay đổi nó để phù hợp với dự án của các bạn.
Hy vọng bài viết này sẽ có thể giúp ích được các bạn không chỉ trong việc config google service mà còn có thể trong các trường hợp khác.