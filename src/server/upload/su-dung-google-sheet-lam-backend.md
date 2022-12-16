**`Google Sheets` là một ứng dụng trang tính rất phổ biến mà bất kỳ ai có tài khoản Google đều có thể sử dụng hoàn toàn miễn phí. Nó rất trực quan và ngay cả những người không có kinh nghiệm trước về sử dụng trang tính sẽ thấy nó khá dễ sử dụng.**
<br><br>
![](https://images.viblo.asia/ec162d65-4839-480d-a69a-c43b1f59dc09.png)

Bạn mới bắt đầu học lập trình web và muốn tự xây dựng website nhưng chưa có skill về back-end như `Node.Js`, `Ruby` hay `Python` thì đây là bài viết dành cho bạn. Hoặc nếu bạn muốn làm một trang web đơn giản kiểu blog cá nhân hay porfolio, hoặc nếu bạn muốn xây dựng nhanh 1 prototype/mockup cho 1 tính năng mới thì đây cũng là bài viết dành cho bạn.<br><br>
Trong bài này mình sẽ giới thiệu về sử dụng `Google Sheets` làm Database cho website của bạn.<br><br>
**Những thứ bạn cần biết:** HTML, CSS, JavaScript, jQuery, Ajax basics.
<br><br>
**Cách làm như sau:**<br><br>
Cách làm khá đơn giản, bạn chỉ cần fetch dữ liệu từ sheets về, có khá nhiều lựa chọn cho việc này, bạn có thể dùng [Google Sheets API](https://developers.google.com/sheets/api).<br><br>
**Bước 1:** Tạo trang sheets của bạn [example](https://docs.google.com/spreadsheets/d/1M4a_1NT7sws0rUA5aZnE4ERZmO39ustwr0NQKL6vlzE/edit#gid=0). Sau đó publish nó lên trước thì mới lấy JSON response được. Bấm `File` - `Publish`
![](https://images.viblo.asia/40d02a45-0f04-4c8f-9134-d0479ace6dc6.png) <br><br>
Sau đó copy Id bắt đầu sau /d/ đến hết.<br><br>![](https://images.viblo.asia/81eeb675-2018-45d8-9362-dd525ae7170a.png)
<br><br>
**Bước 2:** Bây giờ bạn hãy xem thử URL này<br>
```
https://spreadsheets.google.com/feeds/cells/SHEET_CODE/SHEET_NUMBER/public/full?alt=json
```
Mở Google Sheet ra rồi copy `sheet code` và `sheet number`, ví dụ:
```
https://docs.google.com/spreadsheets/d/1M4a_1NT7sws0rUA5aZnE4ERZmO39ustwr0NQKL6vlzE
```
Thì `sheet code` là **1M4a_1NT7sws0rUA5aZnE4ERZmO39ustwr0NQKL6vlzE** và `sheet number` là **1**
<br>
Thay vào bên trên, bây giờ hãy thử URL này<br>
```
https://spreadsheets.google.com/feeds/cells/1M4a_1NT7sws0rUA5aZnE4ERZmO39ustwr0NQKL6vlzE/1/public/full?alt=json
```
![](https://images.viblo.asia/e64c4105-947b-415a-8614-aef325b775af.png)
Bạn có thể lấy `JSON` từ Sheets mà không cần sử dụng tool từ bên thứ 3.<br>
<br>
**Bước 2.1:** Bạn có thể sử dụng tool để lấy `JSON response` cho nó đẹp (kiểu sẽ filter đi những thứ không cần thiết) ví dụ như [Tabletop.js](https://github.com/jsoma/tabletop)<br><br>

**Tích hợp Google Sheets vào trang web của bạn**<br>
Đầu tiên hãy dụng một trang web tĩnh trước. Sau đó thêm cái này, chúng ta sẽ sử dụng `TableTop`:
```
<script src='https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js'></script>
```
Sau đó viêt hàm **init** có như sau:
```javascript
function init() {
  Tabletop.init( { key: sheetUrl, callback: showInfo, simpleSheet: true } )
}
```
Viết hàm **showInfo**:
```javascript
function showInfo(data, tabletop) {
  for(var i = 0; i < data.length; i++){
  // Đây là cấu trúc tĩnh của bạn, bạn chỉ cần đưa data từ lấy từ sheet vào
  // Ví dụ muốn lấy cột name dòng i thì là data[i].name
    $('.postlist').append('
      <div class="col-md-4">
        <h4 style="text-align:center;">'+data[i].name+'</h4>
            <img class="img-thumbnail rounded mx-auto d-block" style="height:200px;" alt="'+data[i].name+'" src="'+data[i].imagesrc+'"</img>
            <p style="text-align: justify; text-justify: inter-word;">' + data[i].summary + '</p>
            <p><b>Status:</b> '+ data[i].status + '</p>
            <p><b>Built Date: </b> '+ data[i].builtdate + '</p>
            <p><b>Destroyed Date: </b> '+ data[i].destroyeddate + '</p>
            <p><b>Destroyed by: </b> '+ data[i].destroyedby + '</p>
            <p><a class="btn btn-outline-info" target="_blank" href="'+data[i].details_link+'">View details</a></p>
       </div>
    ')
  }
}
window.addEventListener('DOMContentLoaded', init)
```
Vậy là xong rồi bây giờ bạn chỉ cần chạy trang web để xem kết quả.
![](https://images.viblo.asia/2778a295-0a26-4456-8332-0ad2df3092cd.jpg)
<br><br>
**Ngoài ra bạn có thể dùng dùng một số tool khác để tương tác với sheets của bạn, mình tìm được tool khá hay là** [BlockSpring](https://www.blockspring.com/)
Bạn có thể query dữ liệu, thêm mới dữ liệu vào sheets bằng code.<br><br>
**Select dữ liệu**
```javascript
// First line of function
blockspring.runParsed("query-google-spreadsheet", {
    // Here is where you need to decide what data you are grabbing with the Google query syntax
    // I am finding elements that match the variable num, which is from a previous part of the code
    // Google syntax makes you request columns with letters as opposed to your column titles.
    "query": "SELECT A, C WHERE B ="+num,
    // This is the full URL of your sheet. Just copy and paste from your browser.
    "url": "YOURURLHERE" 
    //Cache is false so that your browser does not run an old function when you cnange your code
    }, { cache: false, expiry: 7200}, function(res) {
        // All results are part of the res.params.data object.
        // in my case, I requested two columns from my spreadsheet, one named skill and one named key.
        //There is one matching row in this case, with two elements
      	var skill=res.params.data[0]['skill'];
      	var key=res.params.data[0]['key'];
});
```
<br><br>
**Thêm mới**
```javascript
//Blockspring APIs take in data as if it was from a spreadsheet. Needs nested arrays
//Like this: [[row1val1, row1val2],[row2val1, row2val2]...]
//Example from Blockspring site
var orig = "[[\"name\",\"random number\"],[\"Jason\",\"150\"],[\"Don\",\"250\"],[\"Paul\",\"50\"]]"

//Add values to sheet
blockspring.runParsed("append-to-google-spreadsheet", {
	//middle parameter from Google Spreadhseet URL 
	//https://docs.google.com/spreadsheets/d/FILE_ID/edit?usp=sharing
	"file_id": 'YOURIDHERE', 
	// The first sheet within the particular doc will always be 0
	"worksheet_id": 0,
	//The array of arrays, as stated above 
	"values": allData},
	//Provided on the page at https://open.blockspring.com/pkpp1233/append-to-google-spreadsheet
    //https://www.blockspring.com/docs/api_keys
	{ "api_key": "YOURAPIKEYHERE" }, 
	function(res){
	    //console.log to check for errors
		console.log(res);
});
```
<br><br>
Ok, mình đã giới thiệu xong về cách sử dụng `Google Sheets` làm backend, bây giờ bất cứ khi nào các bạn cần xây dựng 1 website nhanh, đơn giản thì mong bài này sẽ giúp ích cho các bạn. :100:<br>
<br>
Tham khảo: https://dev.to/sarthakganguly/google-sheets-as-your-web-backend-4a65