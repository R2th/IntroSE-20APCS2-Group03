> Nhắc tới Firebase thì không thể không nhắc tới Realtime Database. Đây cũng là dịch vụ trung tâm trong hệ thống các dịch vụ khác của Firebase. Với ưu điểm cực kì lớn là tính realtime được cấu hình và thực hiện sẵn, các lập trình viên chỉ còn mỗi công việc vận dụng các hàm có sẵn để dựng ứng dụng mà thôi. Ở bài viết này mình  sẽ giới thiệu sơ lược về Firebase Realtime Database trên Web và tạo 1 ví dụ đọc, ghi dữ liệu cơ bản dùng ReactJS. Ngoài Firebase Realtime database chúng ta cũng có thể xử lý các bài toàn realtime bằng Firebase Cloud Firestore, nếu có dịp mình sẽ giới thiệu sau.
## 1. Giới thiệu mô hình của Firebase Realtime Database.
Có lẽ chúng ta đã ít nhiều quen thuộc với SQL Database. SQL Database được tổ chức dưới dạng các bảng, mỗi bảng bao gồm các hàng và các cột. Các cột đại diện cho các thuộc tính của các đối tượng, trong khi các hàng đại diện cho các đối tượng.<br>
![](https://images.viblo.asia/41521817-2c6c-4119-98d5-feee83154563.png)

Firebase Realtime Database không được tổ chức như vậy. Nó được tổ chức theo dạng cây (trees), giống như dạng cây thư mục (folder tree) mà  ta đã quá quen thuộc trong Windows Explorer. Tuy nhiên, một nhánh (branch) không được chứa đồng thời nhiều dữ liệu khác nhau. Trong Windows Explorer 1 thư mục mẹ có thể chứa nhiều thư mục con và các tập tin nằm ngang hàng với các thư mục con kia, trong thư mục con lại có các thư mục cháu và các tập tin cùng hàng với thư mục cháu. Trong Firebase Realtime Database, mỗi nhánh giống như một container, chỉ chứa hoặc là dữ liệu ứng với nhánh đó (tức là value tương ứng với key), hoặc một tập hợp các nhánh con cũng được tổ chức theo một cách tương tự.
![](https://images.viblo.asia/09e239dc-e0a7-4001-8646-bfb1a9530a92.png)
## 2. Các thao tác đọc và ghi dữ liệu trong Firebase Realtime Database.
### 2.1 Cấu hình firebase.
Việc cấu hình firebase rất đơn giản, ta cần chuẩn bị các instances như sau:
```
import firebase from "firebase";
const config = {
  apiKey: "XXXXXXXkZO0xs4tik5CUdmAkb5KvSfnXU",
  authDomain: "XXXXX.firebaseapp.com",
  databaseURL: "https://XXXX.firebaseio.com",
  projectId: "tXXX",
  storageBucket: "XXXXX.appspot.com",
  messagingSenderId: "749186653813",
  appId: "1:XXXXX:web:d54a829d6d89b656abe23c",
  measurementId: "GXXXJ"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// Tham chiếu tới cơ sở dữ liệu
export const realtimeDB = firebase.database();
```
Ta sẽ dùng biến **realtimeDB** này trở về sau.<br>
Mặc định là  Firebase Realtime Database sẽ “thả” ta ở vị trí gốc,  tức là “thang1-265415” như trong hình minh họa phía trên. Nếu ta muốn truy cập vào bên trong thì dùng  String hoặc dùng hàm child(String child).<br>
Nếu ta muốn truy cập vào “developers” ngay dưới “thang1-265415” thì ta chỉ việc gán cho path là “developer” mà thôi, nghĩa là:
```
let path = "developers"
let ref = realtimeDB.ref(path)
```
Hoặc nếu dùng hàm `child(String child)` thì ta có hàm bên dưới:
```
let ref = realtimeDB.ref().child("developers").child("developerID");
```
### 2.2 Thao tác ghi cơ bản.
Đối với các thao tác ghi cơ bản, ta có thể sử dụng `set()` để lưu dữ liệu vào một tham chiếu được chỉ định, thay thế bất kỳ dữ liệu hiện có nào tại đường dẫn đó. Ví dụ: ta có thể thêm một develop với `set()`như sau:
```
function writeDeveloperData(developerId, name, role) {
    realtimeDB.ref('developers/' + developerId).set({
    name: name,
    role: email,
  });
}
```
Nếu chúng ta tạo 1 mảng developers rồi set:
```
 realtimeDB.ref('s').set(users)
```
=> developerId sẽ được đánh số tương ứng với chỉ số của mảng developers.
> Sử dụng set() ghi đè dữ liệu tại vị trí được chỉ định, bao gồm bất kỳ nút con nào.
### 2.3 Thao tác đọc cơ bản.
#### 2.3.1 Lắng nghe sự thay đổi dữ liệu :
Để đọc dữ liệu tại một đường dẫn và lắng nghe các thay đổi, ta sử dụng các phương thức `on()` hoặc `once()` của `firebase.database.Reference` để quan sát và xử lý đối với sự thay đối đó.
Ví dụ:  lấy và lắng nghe sự thay đổi của danh sách developers :
```
const subscriber = realtimeDB.ref("developers")
subcriber.on("value", snapshot =>{
    const listDeveloper = snapshot.val();
    // Code xử lý đối với listDeveloper
})
```
Ta để ý đối số `"value"` để đọc `snapshot` của nội dung tại một đường dẫn nhất định, vì chúng tồn tại tại thời điểm diễn ra thay đổi dữ liệu(sự kiện). <br>
Người nghe nhận được một snapshot có chứa dữ liệu tại vị trí được chỉ định trong cơ sở dữ liệu tại thời điểm diễn ra sự kiện. Bạn có thể truy xuất dữ liệu trong `snapshot` bằng phương thức `val()` .<br>
Để dừng lắng nghe sự thay đổi ta sử dụng:
```
subscriber.off('value')
```
#### 2.3.2 Đọc dữ liệu 1 lần với get()
Nếu bạn chỉ cần dữ liệu một lần, bạn có thể sử dụng `get()` để lấy` snapshot` dữ liệu từ cơ sở dữ liệu:
```
realtimeDB.child("developers").child(developerId).get().then(function(snapshot) {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  }
  else {
    console.log("No data available");
  }
}).catch(function(error) {
  console.error(error);
});
```
#### 2.3.3 Đọc dữ liệu 1 lần với once()
Trong một số trường hợp, bạn muốn data 1lần , thay vì kiểm tra giá trị cập nhật trên máy chủ. Trong những trường hợp đó, bạn có thể sử dụng once() để lấy dữ liệu.

```
const subscriber = realtimeDB.ref("developers")
subcriber.once("value").then( snapshot =>{
    const listDeveloper = snapshot.val();
    // Code xử lý đối với listDeveloper
})
```
## 3. Ví dụ về đọc, ghi dữ liệu cơ bản Firebase realtime & reactJS
> Ví dụ bao gồm các chức năng CRUD, lắng nghe sự thay đổi ở Firebase realtime database để re-render component

1. Tạo tham chiếu đến realtimeDB
```
 constructor(props) {
    super(props);
    this.state = {
      developers: []
    };
    this.refDB = realtimeDB.ref();
  }
```
2. Đọc,lắng nghe sự thay đổi data ở realtime DB để update state ở component.

```
componentDidMount() {
    this.getUserData();
}
getUserData = () => {
    this.refDB.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

```
3. Ghi dữ liệu từ state vào realtime DB
```
componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }
writeUserData = () => {
    this.refDB.set(this.state);
    console.log("DATA SAVED");
  };
  
removeData = (developer) => {
    const { developers } = this.state;
    const newState = developers.filter((data) => {
      return data.uid !== developer.uid;
    });
    this.setState({ developers: newState });
  };
```
4. Kết quả đạt được

![](https://images.viblo.asia/84086435-6a96-4637-a246-af56f9b4e713.gif)

5.Source

https://codesandbox.io/s/react-firebase-real-time-database-dxt-zh2tg

### Lời kết

Bài viết này hi vọng sẽ giúp ích cho những bạn mới tìm hiểu về firebase realtime & web :grinning::grinning::grinning: <br>

Xin chào và hẹn gặp lại !

Tài liệu tham khảo: 
https://firebase.google.com/docs/database