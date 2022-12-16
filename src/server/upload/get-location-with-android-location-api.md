Android đã cung cấp Android Location API để hỗ trợ cung cấp vị trí của thiết bị, trong bài viết này, chúng ta sẽ cùng tìm hiểu cách lấy vị trí dựa trên GPS Device
## 1. Request Permission 
Đầu tiên chúng ta phải cấp quyền truy cập vị trí của thiết bị, trong file Androidmanifest.xml ta cần thêm dòng sau để ứng dụng có quyền truy cập vị trí 
```
 <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```
Chúng ta cũng cần kiểm tra người dùng có thật sự kích hoạt quyền không trước khi lấy vị trí của thiết bị trong file MainActivity.kt
```
override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == PERMISSION_REQUEST) {
           for (i in permissions.indices) {
                    if (grantResults[i] == PackageManager.PERMISSION_DENIED) {
                           val requestAgain = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && shouldShowRequestPermissionRationale(permissions[i])
                           if (requestAgain) {
                                   Toast.makeText(this, "Permission denied", Toast.LENGTH_SHORT).show()
                                  } else {
                                            Toast.makeText(this, "Go to settings and enable the permission", Toast.LENGTH_SHORT).show()
                                  }
                           }
                     }
   }
```
## 2. Get Location Device
Sau khi đã kiểm tra quyền truy cập, chúng ta sẽ dùng lớp LocationManager android cung cấp để xác định vị trí của thiết bị bằng vệ tinh
```
  locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
```

Tiếp theo chúng ta sẽ lấy vĩ độ và kinh độ để hiển thị vị trí thông qua LocationManager.GPS_PROVIDER và 2 thuộc tính chính của location là latitude và longitude
```
val localGpsLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER)
                if (localGpsLocation != null) {
                    locationGPS = localGpsLocation

                     // Log test hiển thị vĩ độ của vị trí thiết bị
                    Log.d(LATITUDE_FIRST, locationGPS!!.latitude.toString())

                     // Log test hiển thị kinh độ vị trí thiết bị
                    Log.d(LONGITUDE_FIRST, locationGPS!!.longitude.toString())
                }
```

Ta sẽ implement interface LocationListener để lắng nghe sự kiện thay đổi vị trí, override lại phương thức onLocationChanged
và dùng phương thức requestLocationUpdates để update vị trí của thiết bị theo thời gian hoặc khoảng cách di chuyển
```
override fun onLocationChanged(location: Location?) {
 locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, MIN_TIME_BW_UPDATES,
            MIN_DISTANCE_CHANGE_FOR_UPDATES, this)         
            }
```
MIN_TIME_BW_UPDATES (The minimum time between updates in milliseconds) là thời gian tối thiểu để update lại vị trí theo đơn vị mili giây

MIN_DISTANCE_CHANGE_FOR_UPDATES (The minimum distance to change Updates in meters)  là thời khoảng cách tối thiểu để update lại vị trí theo đơn vị met

Tiếp theo chúng ta cũng có thể lấy thời điểm lấy tọa độ vị trí của thiết bị bằng thuộc tính time của location và định dạng lại cách hiển thị
```
  val formatter = SimpleDateFormat(DATE_TIME_FORMAT, Locale.getDefault())
                val calendar = Calendar.getInstance()
                calendar.timeInMillis = locationGPS!!.time

                 // Log test hiển thị thời điểm lấy vị trí người dùng
                Log.d(TIME, formatter.format(calendar.time))
```

Tiếp theo chúng ta cũng có thể lấy được tên địa điểm theo tọa độ vị trí của thiết bị thông qua lớp Geocoder và Address
```
val geocode = Geocoder(context, Locale.getDefault())
                val listAddress: MutableList<Address> =
                    geocode.getFromLocation(locationGPS!!.latitude, locationGPS!!.longitude, MAX_RESULTS)
                address = listAddress[0]
                val currentAddress = address.getAddressLine(0)

                 // Log test hiển thị tên vị trí người dùng
                Log.d(ADDRESS, currentAddress.toString())
```
## 3. Tổng kết
Như vậy, chúng ta đã lần lượt tìm hiểu và thực hiện xong các bước để lấy được location của thiết bị và có thể hiện thị được các dữ liệu như tọa độ vĩ độ, kinh độ, thời gian, tên địa điểm, thông qua Android Location API.

Cảm ơn mọi người đã đọc bài viết, xin chào.

-----

Link Github: https://github.com/buivanhieu7112/DemoLocationGPS