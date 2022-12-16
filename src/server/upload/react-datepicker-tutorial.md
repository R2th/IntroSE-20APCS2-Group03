### Introduction
 
Trong bài viết này chúng ta sẽ học cách sử dụng React datepicker trong ứng dụng React. Tìm hiểu từ cơ bản đến 1 trường hợp củ thề là `hotel booking component` sử dụng React-Datepicker.

`React-datepicker` là một thư viện phổ biến nhất cho các dự án React, thư viện này hiện có khoảng trên 700.000 lượt donwload.
### Prequisities
Trong hướng dẫn này bạn sẽ cần biết Javascript & React cơ bản. Bước đầu tiên của bước cấu hình là cài đặt create-react-app `globally`.
```
npm i -g create-react-app
```
Sau đó `create-react-app` đã được cài đặt, chúng ta sẽ cần tạo mới ứng dụng với thư viện. Bạn có thể sử dụng cmd sau:
```
npx create-react-app datepicker-app
```

Sau đó, sau khi tạo ứng dụng thành công, hãy vào thư mục dự án, cài đặt gói yêu cầu và bắt đầu dự án.
```
// go to the project folder
cd datepicker-app

// install the required package
npm i --save react-datepicker
npm i --save moment

// start the project
npm start
```
### Basic Implementation: Default

Trước khi bắt đầu chúng ta cần đặt CSS file trong ứng dụng. Chèn mã sau vào ứng dụng của bạn. Về cơ bản bạn có thể đặt bất kỳ đâu trong ứng dụng. Trong ứng dụng này chúng ta sẽ đặt trong file app.js 
```
// import required react-datepicker styling file
import "react-datepicker/dist/react-datepicker.css";
```
Sau đó chúng ta import DatePicker component từ `react-datepicker`. Các sự kiện mà chúng ta sẽ cần là `selected` & `onchange`
`selected`  lấy giá trị ngày tháng để biểu thị giá trị component. Trong khi `onchange` hoạt động là 1 hàm xử lý thay đổi `selected` giá trị.
`onChange` function lấy giá trị và chúng ta cần lầm là thay đổi giá trị của `selected` date được chọn. Cập nhật file App.js như sau:
```
// import React and DatePicker
import React, { useState } from "react";
import DatePicker from "react-datepicker";

// import required css from library
import "react-datepicker/dist/react-datepicker.css";

// main implementation. using selected and onChange as main props to get and change the selected date value
const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker 
      selected={startDate} 
      onChange={date => setStartDate(date)} 
    />
  );
};

export default App;
```
### Basic Implementation: Time Picker
Chúng ta có thể sử dụng component `time-picker` bởi `showTimeSelect` props. Times sẽ hiển thị khoảng 30 phút theo mặc 
định. Chúng ta có thể chúng ta có thể dịnh dạng ngày sẽ hiển thị như thế nào theo dateFormat props. Trong trường hợp này chúng ta muốn hiển thị 
trong component. Hảy sử dụng `dateFormat="Pp"`. Chúng ta sẽ thay đổi App.js 

 ```
 // import React and DatePicker
 import React, { useState } from "react";
 import DatePicker from "react-datepicker";
 
 // import required css from library
 import "react-datepicker/dist/react-datepicker.css";
 
 // time-picker component. using showTimeSelect as a main props and works with basic functionality on react-datepicker that explained above
 const App = () => {
   const [startDate, setStartDate] = useState(new Date());
   return (
     <DatePicker
       selected={date}
       onChange={handleDateChange}
       showTimeSelect
       dateFormat="Pp"
     />
   );
 };
 
 export default App;
 ```
### Month & Year Picker
Ngoài date & time, khả năng chọn  a month & year is một điều quan trọng cần có ở đây. component này cũng có tính năng chọn month & year. 
Chỉ cần đảm bảo rằng chúng ta sử dụng đúng định dạng `dateFormat`  ddeerr tối ưu các tính năng thay đổi App.js như sau:
```
// import React and DatePicker
import React, { useState } from "react";
import DatePicker from "react-datepicker";

// import required css from library
import "react-datepicker/dist/react-datepicker.css";

// time-picker component. using showTimeSelect as a main props and works with basic functionality on react-datepicker that explained above
const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      // month picker implementation. using showMonthYearPicker as a main props
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        showMonthYearPicker
        dateFormat="MM/yyyy"
      />

      // month picker implementation. using showYearPicker as a main props
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        showYearPicker
        dateFormat="yyyy"
      />
    </>
  );
};
```
 ### Advanced Example: Booking Hotel Date-Picker
Chúng ta sẽ tạo một bộ chọn ngày đặt booking hotel date-picker component using react-datepicker. Mục tiêu là xây dựng 2
`react-datepicker` components làm cho cả 2 được kết nối làm ngày nhận trả phòng, sau đó hiển thị các ngày đã chọn.
Đầu tiên tất cả những gì chúng ta cần làm là tạo component for check-in and check-out. Chúng ta sẽ sử dụng `minDate` props để đặt giới hạn ngày tối thiểu cho người dùng.
 Đặt mã này bên trong tệp `App.js` của bạn tại phần trả lại:
 ```
 // import React
 import React, { useState } from "react";
 ...
 
 ...
 return (
   <div className="input-container">
     <div>
       <label>Check-in</label>
       <DatePicker
         selected={checkInDate}
         minDate={new Date()}
         onChange={handleCheckInDate}
       />
     </div>
     <div>
       <label>Check-out</label>
       <DatePicker
         selected={checkOutDate}
         minDate={checkInDate}
         onChange={handleCheckOutDate}
       />
     </div>
   </div>
 )
 ...
 
 ```
 
 Cách đoạn mã trên xác định `minDate`. Đối với check-in component nó chỉ đơn giản là sử dụng dữ liệu hiện tại làm `minDate`, Người dùng không thể chọn được ngày trước ngày hôm nay. Và đối với thành phần thanh toán, chúng ta có thể xử dụng.
 `checkInDate` value, có nghĩa là người dùng không thể chọn 1 ngày trươc ngày nhận phòng.

 Bước tiếp theo sẽ là xác định cách chúng ta sẽ lưu giá trị vào trạng thái của mình và cách hoạt động của mỗi hàm thay đổi.
 Đối với điều này, ý tưởng chính là chỉ cần tạo một trạng thái cho mỗi `checkInDate` and `checkOutDate` iá trị và lưu ngày ở đóập.
 Sự khác biệt duy nhất là `minDate` của check-out component sẽ phụ thuộc vào  `checkInDate` value, chúng ta cần phải thiết lại `checkOutDate` bất cứ khi nào `checkIndate` thay đổi. Vậy bạn cần update App.js
 ```
 // import React
 import React, { useState } from "react";
 ...
 
 const App = () => {
   // define check-in and check-out state
   const [checkInDate, setCheckInDate] = useState(null);
   const [checkOutDate, setCheckOutDate] = useState(null);
 
   // define handler change function on check-in date
   const handleCheckInDate = (date) => {
     setCheckInDate(date);
     setCheckOutDate(null);
   };
 
   // define handler change function on check-out date
   const handleCheckOutDate = (date) => {
     setCheckOutDate(date);
   };
 ...
 ```
 Phần cuối cùng là chúng ta cần hiển thị tóm tắt của đặt phòng. Nó sẽ chỉ được hiển thị khi cả ngày check-in and check-out date có giá trị. Đối vơi trường hợp này chúng ta sử moment.js để định dạng date. Cập nhật file App.js
 
 ```
 // import React
 import React, { useState } from "react";
 ...
 
 return(
   ...
   // summary secton 
   {checkInDate && checkOutDate && (
     <div className="summary">
       <p>
         You book a hotel from {moment(checkInDate).format("LL")} to{" "}
         {moment(checkOutDate).format("LL")}.
       </p>
     </div>
   )}
   ...
 )

 ...
 
 ```
 
 Code hoàn chỉnh file App.js
 ```
 import React, { useState } from "react";
 import DatePicker from "react-datepicker";
 import moment from "moment";
 import "./App.css";
 import "react-datepicker/dist/react-datepicker.css";
 
 function App() {
   const [checkInDate, setCheckInDate] = useState(null);
   const [checkOutDate, setCheckOutDate] = useState(null);
 
   const handleCheckInDate = (date) => {
     setCheckInDate(date);
     setCheckOutDate(null);
   };
 
   const handleCheckOutDate = (date) => {
     setCheckOutDate(date);
   };
 
   return (
     <div className="App">
       <div className="input-container">
         <div>
           <label>Check-in</label>
           <DatePicker
             selected={checkInDate}
             minDate={new Date()}
             onChange={handleCheckInDate}
           />
         </div>
         <div>
           <label>Check-out</label>
           <DatePicker
             selected={checkOutDate}
             minDate={checkInDate}
             onChange={handleCheckOutDate}
           />
         </div>
       </div>
       {checkInDate && checkOutDate && (
         <div className="summary">
           <p>
             You book a hotel from {moment(checkInDate).format("LL")} to{" "}
             {moment(checkOutDate).format("LL")}.
           </p>
         </div>
       )}
     </div>
   );
 }
 
 export default App;
 ```
 
 File styles App.css
 ```
 .App {
   text-align: center;
   height: 100vh;
   flex: 1;
   justify-content: center;
   align-items: center;
   padding: 40px;
 }
 
 .input-container {
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
 }
 
 .input-container .react-datepicker-wrapper {
   margin: 12px 0;
   width: 100%;
 }
 
 .input-container .react-datepicker-wrapper input {
   padding: 4px 12px;
 }
 
 .summary {
   font-size: 18px;
 }
 ```
 ### Conclusion
 Bây giờ chúng ta biết cách sử dụng react-datepicker trong ứng dụng của mình. Sau khi làm theo hướng dẫn của bài viết này chúng ta có thể tái sử dựng cho các dự án tiếp theo.
 
 ### References
 
https://momentjs.com/docs/

https://www.npmjs.com/package/react-datepicker

https://codesource.io/complete-react-datepicker-tutorial-with-examples/