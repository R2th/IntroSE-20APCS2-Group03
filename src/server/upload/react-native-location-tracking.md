Nếu bạn đang làm việc với React native, và bạn đang cần xử lý với map, react native cung cấp cho chúng ta bộ API , đó là Google Maps API for React Native.
Đầu tiên,  bạn cần phải khởi tạo 1 project react native:

`react-native init locationTracking`

Tiếp theo đó, bạn cần phải install thư viện map cho react native

```
npm install react-native-maps --save
```

Sau khi install xong, bạn có thể sử dụng được các support của google map.

Trong constructor, chúng ta sẽ khởi tạo 1 giá trị cho Map:

```
constructor(props) {
  super(props);
  this.state = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    routeCoordinates: [],
    distanceTravelled: 0,
    prevLatLng: {},
    coordinate: new AnimatedRegion({
     latitude: LATITUDE,
     longitude: LONGITUDE
    })
  };
}
```
Thuộc tính AnimatedRegion sẽ giúp chúng ta di chuyển marker đến vị trí đã set.
Vậy, mỗi khi chúng ta di chuyển , map sẽ tự động cập nhật lại ví trí bằng cách sau:

```
componentDidMount() {
  this.watchID = navigator.geolocation.watchPosition(
    position => {
      const { coordinate, routeCoordinates, distanceTravelled } =   this.state;
      const { latitude, longitude } = position.coords;
      
      const newCoordinate = {
        latitude,
        longitude
      };
      if (Platform.OS === "android") {
        if (this.marker) {
          this.marker._component.animateMarkerToCoordinate(
            newCoordinate,
            500
          );
         }
       } else {
         coordinate.timing(newCoordinate).start();
       }
       this.setState({
         latitude,
         longitude,
         routeCoordinates: routeCoordinates.concat([newCoordinate]),
         distanceTravelled:
         distanceTravelled + this.calcDistance(newCoordinate),
         prevLatLng: newCoordinate
       });
     },
     error => console.log(error),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}
```

watchPosition  sẽ tự động update lại vị trí khi chúng ta di chuyển location.
 Trong ES6 chúng ta có thể get latitude & longitude từ position.coords.
 chúng ta sẽ tạo ra biến newCoordinate sẽ update location lên store để lưu lại vị trí từ position.coords

```
if (Platform.OS === "android") {
  if (this.marker) {
  this.marker._component.animateMarkerToCoordinate(
    newCoordinate,
    500
   );
  }
} else {
  coordinate.timing(newCoordinate).start();
}
```
Sau đo, sẽ update lại vị trí bằng cách sử dung setState:

```
this.setState({
  latitude,
  longitude,
  routeCoordinates: routeCoordinates.concat([newCoordinate]),
  distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
  prevLatLng: newCoordinate
});
```
Chúng ta có thể sử dụng  distanceTravelled để tính khoảng cách giữa 2 ddiemr latlong bằng cách sau:
```
calcDistance = newLatLng => {
  const { prevLatLng } = this.state;
  return haversine(prevLatLng, newLatLng) || 0;
};
```

Trong view gọi:
```
export default class App extends Component<Props> {
  render() {
    return (
      <MapView
        style={{flex: 1}}
        region={{
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      />
    );
  }
}
```
Và kết quả:
![](https://images.viblo.asia/6670b574-f60f-496b-8d9e-866819781981.gif)

Hi vọng bài viết này sẽ giúp các bạn nắm rõ hơn cách sử dụng google map trong react native.
Source: 
https://github.com/vikrantnegi/react-native-location-tracking

Bài viết được tham khảo từ: 
https://medium.com/quick-code/react-native-location-tracking-14ab2c9e2db8