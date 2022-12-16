# Giới thiệu

## Bài toán đặt ra

Ở đây tôi có một sheets tổng có tên là **Master** và từ sheet này tôi muốn điều khiển các sheets khác để có thể thêm người dùng vào các sheets mà có đường link ở sheet **Master** ở chế đệ **Editor** hoặc chế độ **Viewer**.

## Setup bài toán ở trên
### 1. Tạo một Google Sheets trên Google Driver 

Ở đây tôi đặt tên cho sheets này là **Google Sheet Demo** bạn có thể đặt tên gì tuỳ thích.

### 2. Tạo một folder

Ở đây tôi tạo folder để dễ quản lý các sheets ở trong này tôi tạo mẫu 2 sheets có tên là **Sheet1** và **Sheet2**.
### 3. Cập nhật dữ liệu 

Với **Master** sheets ở đây tôi sẽ bỏ tên và id của sheets ở trong **Master** sheets (mục đích là để nó biết được đường dẫn chính xác của sheets nó muốn thực hiện một thứ gì đó).

### 4. Tạo sheets 

 Tạo sheets có tên **Add Email** ở trong **Google Sheet Demo** ở đây nó sẽ gồm có 2 cột là **Editor** và **Viewer** mục đích để khi ta thêm email của người nào vào cột nào thì nó sẽ cập nhật chế độ quản lý của người đó ở 2 trên kia.
 
![](https://images.viblo.asia/e4d976eb-57ac-4959-ba58-6f6856fe9b46.png)

![](https://images.viblo.asia/cafc9743-2632-48a2-8004-35f5d88a0c61.png)


## Demo

Để truy cập vào Google Script App ta thực hiện các bước sau:

### 1. Từ Google Sheet Demo ta chọn vào phần **Tools nằm trong ở navbar**.
### 2. Sau đó click vào dòng thứ **3 Script editor**.
### 3. Hiển thị hình ảnh giao diện để ta có thể viết script điều khiển sheets (dưới đây là hình ảnh).

![](https://images.viblo.asia/5857b9fa-2950-42d3-afdc-c6d954485d74.png)

![](https://images.viblo.asia/29035837-df13-4c11-a00f-32a8fd93227e.png)

### Thực hiện code

```js
Code.gs
function myFunction() {
  const fileId = SpreadsheetApp.getActiveSpreadsheet().getId(); // Dùng để lấy đc ID của google sheets
  const addEmailSheets = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Add Email"); // Lấy được ra sheets có tên Add Email
  const data = addEmailSheets.getDataRange().getValues(); // Lấy tất cả dữ liệu trong sheets đó với 1 dòng tương ứng một mảng
  const editorUser = [];
  const viewerUser = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) { // Ở dây vì email editor tôi thêm ở cột A là nó tương ứng với vị trí thứ 0 trong mảng
      editorUser.push(data[i][0]);
    }
    if (data[i][1]) { // Tương tự như ở trên ở dây vì email viewer tôi thêm ở cột B là nó tương ứng với vị trí thứ 1 trong mảng
      viewerUser.push(data[i][1]);
    }
  }
  
  const masterSheet = SpreadsheetApp.openById(fileId).getSheetByName("Master"); // Lấy gì trị sheets Master
  const projects = masterSheet.getDataRange().getValues(); // Get tất dữ liệu trong sheets Master cũng như trên tương ứng mỗi dòng là một phần tử mảng
  const reducer = (acc, email) => ({ ...acc, [email]: email }); // Hàm này tôi viết để dùng chung khi thêm email nào đó vào sheets
  
  for (let i = 1; i < projects.length; i++) {
    const sheet = SpreadsheetApp.openById(projects[i][1]); // Mở Sheet 1 từ file ID của nó trên sheets Master
    const getUserEditors = sheet.getEditors().length // Kiểm tra xem trong Sheet 1 có tồn tại email nào chưa, nếu có lấy email đó ra.
      ? sheet.getEditors().map((user) => user.getEmail())
      : sheet.getEditors();

    if (editorUser.length) { 
      const obj = editorUser.reduce(reducer, {}); // Ở đây tôi sử dụng hashmap để lưu email theo dạng key, value
      getUserEditors.forEach((item) => {// Kiểm tra xem trong Sheet 1 nếu có email trong đó mà giống với email thêm vào thì xoá email trong đó đi
        if (item == obj[item]) {
          delete obj[item];
        }
      });
      
      const editorUsersClean = Object.keys(obj); // Chuyển tất cả email đã làm sạch từ ở trên về một mảng
      if (editorUsersClean.length) {
        sheet.addEditors(editorUsersClean); // Dùng để thêm tất cả email từ biến editorUsersClean vào sheet
      }
    }

    if (viewerUser.length) { // Tương tự như editor ở trên
      const findUserEditors = viewerUser.filter((user) =>
        getUserEditors.includes(user)
      );
      if (findUserEditors.length) {
        for (let i = 0; i < findUserEditors.length; i++) {
          sheet.removeEditor(findUserEditors[i]);
        }
      }
      
      const getUserViewer = sheet.getViewers().length
        ? sheet.getViewers().map((user) => user.getEmail())
        : sheet.getViewers();
        
      const obj = viewerUser.reduce(reducer, {});
      getUserViewer.forEach((item) => {
        if (item == obj[item]) {
          delete obj[item];
        }
      });
      
      const viewerUsersClean = Object.keys(obj);
      if (viewerUsersClean.length) {
        sheet.addViewers(viewerUsersClean);
      }
    }
  }
}
```

Kết quả sau khi chạy hàm trên sẽ thêm đc email đó vào tất cả sheets ở trong **Master**

![](https://images.viblo.asia/d35082c7-3322-49d6-be8b-2a18b7835e00.png)

## Cronjob của Google Script

Thay vì mỗi lần thêm email vào chúng ta phải đi vô **"run"** hàm một cách thủ công thì ta nên để cho Google Script sẽ chạy tự động bao lâu ở đây tôi sẽ cho nó chạy 1 tiếng 1 lần cùng xem nhé.

### 1. Di chuột vào thanh sidebar bên trái chọn Trigger
![](https://images.viblo.asia/944a3c43-5936-4c74-9464-c72182c71ed9.png)



### 2. Click vào button Add Trigger(màu xanh) phía mép bên phải
![](https://images.viblo.asia/1bc2e814-8529-41fc-bc75-b86856833f43.png)


### 3. Thêm các tuỳ chọn như hình
![](https://images.viblo.asia/ff230ccc-1f53-4e29-97af-c394bd78e2f5.png)


### 4. Hoàn thành và thấy được hàm trigger
![](https://images.viblo.asia/d5c59a3c-8dae-4a89-944c-5ac6c2367a53.png)

[Link của demo các bạn có thể truy cập](https://docs.google.com/spreadsheets/d/1Efb_76WN6Oxpj2XR8hCsJZ0IcC1hQ_vEtElTiopyOrM/edit?usp=sharing)

## Kết luận
Hi vọng từ ví dụ trên các các bạn có thể biết thêm những thứ hay ho của Google nói chung và Google Sheets nói riêng.

Lưu ý: Nếu người dùng đang ở trạng thái **Viewer** thì bạn có thể chuyển qua **Editor** mà không cần xoá email đó khỏi sheets nhưng nếu từ **Editor** mà chuyển qua **Viewer** thì mình hiện tại phải xoá email đi rồi cập nhật trạng thái **Viewer** cho sheets(theo document của **Google**). Nếu bạn có cách nào hay hơn hoặc tốt hơn có thể comment phái dưới.

Cảm ơn các bạn đã đọc hết bài viết.