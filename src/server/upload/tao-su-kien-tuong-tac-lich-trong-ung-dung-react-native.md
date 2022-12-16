![alt](https://ducgiangtran.files.wordpress.com/2021/05/img_1812.png?w=712)

Trong hệ điều hành android và ios chúng ta dễ thấy có một tiện ích được cài đặt sẵn là “Lich“. Với ứng dụng này các bạn có thể tạo các sự kiện và lời nhắc sự kiện tương ứng.
Làm thế nào để tương tác với native calender trong react native. Chúng ta sẽ cùng tìm hiểu thư viện : https://github.com/wmcmahan/react-native-calendar-events
# 1. Cài đặt ứng dụng ứng dụng
Khởi chạy lệnh sau để khởi tạo một ứng dụng react native. Ở đây mình sử dụng phiên bản mới nhất là 0.64.0

```
react-native init DemoCalenderEvent
```

Cài đặt thư viện react-native-calender-events

Chạy lệnh:

```
 yarn add react-native-calendar-events
```

Với phiên bản này sẽ được tự động liên kết với phiên bản android.

Cài đặt với phiên bản ios:

Thêm đoạn mã sau vào file Info.plist

```
<key>NSCalendarsUsageDescription</key>
<string>This app requires access to the calendar</string>
```

Chạy lệnh:

```
cd ios
pod install
```

Như vậy ứng dụng của ta đã được chuẩn bị sẵn sàng.

# 2. Tương tác thư viện với ứng dụng

Để tương tác với các ứng dụng native việc kiểm tra và xin quyền truy cập là cần thiết và bắt buộc. Trong phần này mình sẽ hướng dẫn các bạn xử lý trực tiếp một các đơn giản nhất.

## 2.1 Với IOS

Sử dụng:

```
RNCalendarEvents.checkPermissions();
```

Sử dụng đoạn mã sau để xin quyền truy cập:

```
 RNCalendarEvents.requestPermissions().then(
                    result => {
                      Alert.alert('Auth requested', result);
                    },
                    result => {
                      console.error(result);
                    },
                  );
```

Kết quả sẽ có:

![alt](https://ducgiangtran.files.wordpress.com/2021/05/screen-shot-2021-05-01-at-17.46.56.png)

Bấm OK để đồng ý cho ứng dụng truy cập lịch.

Kiếm tra lại quyền truy cập bằng cách:

```
RNCalendarEvents.checkPermissions().then(
                    result => {
                      Alert.alert('Auth check', result);
                    },
                    result => {
                      console.error(result);
                    },
                  );
```

Khi bạn đồng ý cấp quyền truy cập, kết quả sẽ như sau:

![alt](https://ducgiangtran.files.wordpress.com/2021/05/screen-shot-2021-05-01-at-17.51.08.png)

Như vậy bạn đã có thể tạo sự kiên và liên kết tới chính ứng dụng lịch có sẵn của mình.

## 2.2 Với android

Trong android sẽ có thêm một lựa chọn chỉ cho phép đọc lịch đã có hiện tại.

Sử dụng :

```
 RNCalendarEvents.requestPermissions(true).then(
                      result => {
                        Alert.alert('Read-only Auth requested', result);
                      },
                      result => {
                        console.error(result);
                      },
                    );
```

Ngoài ra các quyền khác đều hoạt động tương tự IOS.

# 3. Kiểm tra các ứng dụng lịch đã có trong thiết bị của bạn.

Sử dụng:

```
   RNCalendarEvents.findCalendars().then(
                    result => {
                      Alert.alert(
                        'Calendars',
                        result
                          .reduce((acc, cal) => {
                            acc.push(cal.title);
                            return acc;
                          }, [])
                          .join('\n'),
                      );
                    },
                    result => {
                      console.error(result);
                    },
                  );
```

Kết quả ta có:

![alt](https://ducgiangtran.files.wordpress.com/2021/05/img_1813.png)

# 4. Tạo sự kiện

Sử dụng:

```
 RNCalendarEvents.saveEvent('Sinh nhat', {
                    startDate: '2021-05-26T14:00:00.000Z',
                    endDate: '2021-05-26T15:00:00.000Z',
                  }).then(result => {
                    Alert.alert(
                      'Lưu thành công',
                      'Mở ứng dụng lịch để xem bất ngờ nhé 😄',
                    );
                  });
```

Các bạn có thể mớ ứng ụng lịch với ios và calender với android để xem điều bất ngờ nhé.

Sự kiện sinh nhật của bạn đã được lên lịch và tạo sự kiện trong hệ thống của bạn.

# 5. Tổng kết

Như vậy trong phần này mình đã chia sẻ cho các bạn cách tương tác cơ bản với sự kiện lịch trong hệ thống. Ở phần sau mình sẽ hướng dẫn các bạn thêm các lựa chọn như xác định cụ thể lịch mong muốn, tạo, thanh đổi thông báo sự kiện ….

Rất mong nhận được sự phản hồi từ các bạn. Love all !

Tham khảo: https://github.com/wmcmahan/react-native-calendar-events

Source code: https://github.com/ducgiangtrankma/RN_Calender_Event.git