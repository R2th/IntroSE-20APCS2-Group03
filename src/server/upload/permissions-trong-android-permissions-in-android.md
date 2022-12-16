## Permissions là gì?
Permissions là quyền hoặc khả năng được Android cấp cho một ứng dụng để cho phép truy cập vào các API (Application Programming Interface) của hệ thống bị hạn chế chẳng hạn như Máy ảnh, Bluetooth, GPS, v.v.

## Tại sao cần các Permission?
Android cung cấp một ID duy nhất cho mỗi ứng dụng được cài đặt trên thiết bị Android nó cho phép hệ thống giải quyết xung đột giữa các process khác nhau khi chúng đang chạy. Mỗi ứng dụng chạy trong một process được phân bổ của riêng nó và điều đó làm cho Android trở thành một hệ thống đa quy trình **(multi-process system**), trong đó nhiều hơn một ứng dụng có thể chạy cùng một lúc và cố gắng truy cập cùng một tài nguyên hệ thống. Để tránh xung đột khi truy cập hệ thống tài nguyên, các permission được sử dụng để khóa tài nguyên và truy cập nó trong thời gian chạy (**run time**) của một ứng dụng. 
Khi từ chối một số quyền, hệ thống sẽ từ chối quyền truy cập vào tài nguyên liên quan đến perssion đó. 

Perssions có thể được cấp cho một ứng dụng bởi hệ thống Android (Android system) hoặc bởi một ứng dụng khác được signed với cùng một chứng chỉ (certificate).

## Thực thi các permission (Enforcing permissions)
Trong khi ứng dụng đang chạy (run-time), các permission có thể được thực thi ở một số nơi ví dụ:

* khi được gọi từ hệ thống (calling into the system).
* khi bắt đầu một activity (starting an activity).
* khi gửi và nhận các broadcast (sending and receiving broadcasts).
* khi được truy cập và thao tác bởi một content provider (accessing and manipulating a content provider).
* khi được binding hoặc khởi chạy một service (binding to or starting a service).


## Các mức độ bảo vệ của permisson (Levels of Permission Protection)


Có bốn cấp độ khác nhau về mức độ bảo vệ của permission :
 1. Normal (Bình thường)
 2. Dangerous (Nguy hiểm)
 3. Signature (Chữ ký)
 4. Signature or System (Chũ ký hoặc hệ thống)
> *Chú ý: Signature or System đã bị Deprecated trong API level 23.*<br>
(Tham khảo: https://developer.android.com/guide/topics/manifest/permission-element)*

### 1 - Normal Permissions or Level-Zero Permissions (Permission bình thường hoặc permission level 0)

Ở cấp độ này, các permisson được cấp (granted ) tự động mà không cần người dùng sự chấp thuận. Hậu quả của việc cấp quyền cho cấp độ này là nhỏ nên nó không gây ra bất kỳ thiệt hại thực sự cho người dùng hoặc thiết bị.

Các quyền được coi là Normal, từ API level 23:
> * ACCESS_LOCATION_EXTRA_COMMANDS
> * ACCESS_NETWORK_STATE
> * ACCESS_NOTIFICATION_POLICY
> * ACCESS_WIFI_STATE
> * BLUETOOTH
> * BLUETOOTH_ADMIN
> * BROADCAST_STICKY
> * CHANGE_NETWORK_STATE
> * CHANGE_WIFI_MULTICAST_STATE
> * CHANGE_WIFI_STATE
> * DISABLE_KEYGUARD
> * EXPAND_STATUS_BAR
> * GET_PACKAGE_SIZE
> * INSTALL SHORTCUT
> * INTERNET
> * KILL BACKGROUND_PROCESSES
> * MODIFY_AUDIO_SETTINGS
> * NFC
> * READ_SYNC_SETTINGS
> * READ_SYNC_STATS
> * RECEIVE BOOT_COMPLETED
> * REORDER_TASKS
> * REQUEST IGNORE_BATTERY_OPTIMIZATIONS
> * REQUEST_INSTALL_PACKAGES
> * SET ALARM
> * SET TIME_ZONE
> * SET WALLPAPER
> * SET WALLPAPER_HINTS
> * TRANSMIT_IR
> * UNINSTALL SHORTCUT
> * USE_FINGERPRINT
> * VIBRATE
> * WAKE_LOCK
> * WRITE SYNC_SETTINGS

### 2 - Dangerous Permissions or Level-one Permissions (Permission nguy hiểm hoặc permission level 1)

Các quyền ở cấp độ này có thể gây hại hoặc thiệt hại thực sự với dữ liệu cá nhân, tiền và thiết bị của người dùng.<br> Do đó, Android yêu cầu rằng ứng dụng phải yêu cầu các quyền này tại thời điểm runtime trước khi thực hiện bất kỳ hoạt động nào có liên quan.<br> 
Nếu người dùng cảm thấy rằng permisson này là cần thiết cho hoạt động của ứng dụng, thì họ sẽ chấp nhận nó hoặc có từ chối nếu họ thấy không cần thiết. Khi bị từ chối, ứng dụng không thể thực hiện hoạt động liên quan đến permisson này.

Các quyền được coi là nguy hiểm, từ API level 23:
> * READ CALENDAR
> * WRITE CALENDAR
> * CAMERA
> * READ_CONTACTS
> * WRITE CONTACTS
> * GET ACCOUNTS
> * ACCESS_FINE_LOCATION
> * ACCESS_COARSE_LOCATION
> * RECORD_AUDIO
> * READ PHONE_STATE
> * CALL_PHONE
> * READ CALL LOG
> * WRITE_CALL_LOG
> * ADD_VOICEMAIL
> * USE SIP
> * PROCESS_OUTGOING_CALLS
> * BODY_SENSORS
> * SEND_SMS
> * RECEIVE_SMS
> * READ_SMS
> * RECEIVE_WAP_PUSH
> * RECEIVE_MMS
> * READ_EXTERNAL_STORAGE
> * WRITE_EXTERNAL_STORAGE

### 3 - Signature Permission or Level-two Permissions (Permission chữ ký hoặc permission level 2) 
Permisson chữ ký (Signature) chỉ được cấp tự động cho ứng dụng nếu ứng dụng yêu cầu được ký (signed) với cùng một chứng chỉ (certificate ) như ứng dụng đã khai báo permission.

Sau đây là các ví dụ về quyền được coi là Signature permission:
> * BIND_ACCESSIBILITY_SERVICE
> * ACCESS_INPUT_FLINGER
> * CRYPT_KEEPER
> * BIND TEXT_SERVICE
> * BIND_VPN_SERVICE
> * INSTALL_AS_USER
> * BIND WALLPAPER
> * MANAGE_MEDIA_PROJECTION
> * DELETE PACKAGES
> * ACCESS_NETWORK_CONDITIONS
> * REBOOT
> * BIND DREAM_SERVICE
> * ALLOW_ANY_CODEC_FOR_PLAYBACK
> * BIND_CONDITION_PROVIDER_SERVICE
> * BIND JOB_SERVICE
> * CONFIRM FULL BACKUP
> * ACCESS_ALL_PRINT_JOBS
> * ACCESS_BLUETOOTH_SHARE
> * C2D_MESSAGE
> * SEND DOWNLOAD_COMPLETED_INTENTS
> * BIND PRINT_SPOOLER_SERVICE
> * MODIFY_AUDIO_ROUTING
> * CAPTURE_SECURE_VIDEO_OUTPUT
> * ACCESS_KEYGUARD_SECURE_STORAGE
> * FILTER EVENTS
> * BIND REMOTE_DISPLAY
> * CAPTURE_TV_INPUT
> * SET ORIENTATION
> * MODIFY_NETWORK ACCOUNTING
> * REMOVE_DRM_CERTIFICATES
> * TV INPUT_HARDWARE
> * SET POINTER_SPEED
> * MOVE PACKAGE
> * CONFIGURE_WIFI DISPLAY
> * REQUEST_SUPERUSER
> * CALL_PRIVILEGED
> * BIND DEVICE_ADMIN
> * ACCESS_CONTENT_PROVIDERS_EXTERNALLY
> * PACKAGE_USAGE_STATS
> * PERFORM_CDMA_PROVISIONING
> * RETRIEVE_WINDOW_TOKEN
> * DELETE_CACHE_FILES
> * MEDIA_CONTENT_CONTROL
> * COPY PROTECTED DATA
> * START_PRINT_SERVICE_CONFIG_ACTIVITY
                                      
### 4 - Signature and System Permissions or Level-three Permissions (Permission đối với Chữ ký và Hệ thống hay permission level 3)
Đây là các permission dành cho **Tình huống Đặc biệt** (Special Situation Permissions). Trong trường hợp này, yêu cầu ứng dụng phải được ký (singed) bằng cùng một chứng chỉ (certificate) như là Android System-Image ([*tìm hiểu thêm về Android Firmware*](https://code.tutsplus.com/vi/articles/an-introduction-to-android-firmware--cms-26791)). Đây là lý do tại sao chúng được gọi là "Special Situation Permissions".<br>

Các loại quyền này được sử dụng để tích hợp các bản dựng hệ thống và do đó nhà phát triển chỉ nên sử dụng cấp quyền Signature (permission level 2) thay vì sử dụng các permisson level 3 trong các ứng dụng của mình.


 **Hết Phần 1.**<br>

> Các bạn có thể đọc thêm phần 2, chi tiết về permission trong Android tại đây.