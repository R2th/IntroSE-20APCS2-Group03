Dạo này trường cho nhiều deadline quá, nên mình cũng chưa biết khi nào có thể viết tiếp bài thứ 2 nữa, mong mn thông cảm!

----
Rảnh quá méo biết làm gì :) 

**Hê nhô mn, mình giới thiệu chút, mình là Nguyễn Quốc Huy, tại thời điểm viết bài này, mình đang là SV năm 2 tại trường ĐH Công nghệ thông tin :) TP.HCM.**
**Chắc hẳn mn ở đây, ai cũng từng điểm danh khi tham gia các hoạt động. Nhưng sẽ có 1 vài vấn đề nảy sinh, có thể điểm danh hộ, hoặc ở nhà vẫn có thể điểm danh :) Không công bằng nhỉ :) Từ đó mình nảy ra ý tưởng, muốn làm một cái gì đó để tạo ra tính công bằng đối với những người tham gia và ngược lại. :)**
*Trước khi bắt đầu, mình nói một chút :) Mình không phải dân fe nên giao diện nó có thể không đẹp hay hiện đại nhưng mình sẽ cố gắng làm nó dễ nhìn và tiện sử dụng :)*
# Giới thịu ứng dụng :)
Theo mình thấy, đối với các hoạt động cần điểm danh, có 2 tính chất:
Thứ nhất, người quản trị viên đã nắm được thông tin đối tượng cần điểm danh (họ tên, số điện thoại, gmail,...), thứ hai là các hoạt động lớn thì thường trước khi tổ chức, thì sẽ có một mã qr hoặc bar code được gửi đến người tham dự để checkin khi tham gia hoạt động. 
Vì vậy, mã QR code (bar code) theo mình nghĩ chỉ cần bao gồm 2 thông tin là mã hoạt động cần điểm danh và mã người dùng cần điểm danh.
Đối với điểm danh trực tuyến có một số vấn đề phát sinh:
- Người không tham gia, vẫn có thể quét mã thông qua bạn bè,..
- Điểm danh hộ (thay), 1 người tham gia có thể điểm danh hộ cho 1 hoặc nhiều người khác không tham gia.
- ...
Từ những lý do đó, mình đã ấp ủ dự định tạo ra một ứng dụng điểm danh trực tuyến cho nhiều người sử dụng nhưng đem lại tính công bằng cho mn :) 
# Cách hoạt động
Có khá nhiều cách để tạo mã điểm danh cho người dùng, có thể là người dùng đăng ký tham gia hoạt động, hệ thống tạo mã dựa trên thông tin người dùng và gửi 1 mã đến gmail của người dùng, hoặc đối với sinh viên như mình khi tham gia các hoạt động của khoa hay của trường thì có thể cung cấp MSSV để điểm danh vì khoa và trường đã có thông tin cá nhân của mình.
Ở đây, mình sẽ làm theo cách tổng quát, người dùng đăng ký tham dự hoạt đông -> Hệ thống gửi mã checkin -> Khi tham dự hoạt động, CTV hoặc QTV sẽ quét mã để điểm danh cho người dùng

-----
Các bước tạo ứng dụng các bạn tự làm nha!
Một số package mình sử dụng
- Đăng nhập, Đăng ký: mongoose passport passport-local bcryptjs express-session express-sessions connect-flash flash
- Đọc mã: Các bạn tham khảo https://github.com/schmich/instascan
- Tạo mã: Để tạo mã, mn có thể tham khảo http://davidshimjs.github.io/qrcodejs/ 
Mình nghĩ là mn nên sử dụng qrcode thay vì sử dụng bar-code cho việc điểm danh, vì đối với qrcode, text có bự cỡ nào thì nó cũng chỉ tạo ra trong vùng axa còn bar-code thì text càng bự thì hình càng dài, dẫn đến dễ bị vỡ cấu trúc của fe.

-----
Để hiểu rõ hơn về cấu trúc file cũng như cách code thì mn nên download source code mình về và tham khảo :) Được thì cho mình vài sao nha :)
## Trang quản trị viên
Mình sẽ sử dụng template có sẵn để tiết kiệm thời gian :)
![](https://images.viblo.asia/97c5bf50-a027-428f-9c3e-cd08cd7dbfc0.png)

Đây là giao diện trang quản trị viên.
Bố cục trang quản trị viên gồm 2 phần: Tạo hoạt động và điểm danh.
Mình sẽ nói sơ qua  về phần tạo hoạt động.
Với mỗi hoạt động, sau khi tạo, bạn cần upload danh sách người tham gia lên hệ thống để có thể điểm danh, trang web sẽ tiến hành đọc file, và cập nhật số lượng người tham gia.
```
//router/admin.js
router.post('/ajax-upload-list-checkin/:c', controllers.isLogined_next, controllers.checkActBefUploadFile, multer({storage: storageFileXLSX}).single('fileact'), controllers.AJAX_postUploadListCheckin);
```
```
//controller/admin.js
module.exports.checkActBefUploadFile=async function(req,res,next){
  let c=req.params.c;
  let i=await services.getActByCode(c,req.user._id);
  if(!i){let m='Không tìm thấy hoạt động cần tải file lên.';return res.send({e:m,s:false});}
  return next();
}
module.exports.AJAX_postUploadListCheckin = async function(req, res) {
  var c=req.params.c;
  console.log(req.body.fileact+'-file');
  var i=await services.getActByCode(c,req.user._id);
  if(!i) return res.send({e:'Không tìm thấy hoạt động cần tải file lên!',s:false});
  await readXlsxFile(`./public/files/xlsx/${c}.xlsx`,{sheet:'DIEMDANH'}).then(async function(rows,error){
    if(error){
      console.log('Lỗi đọc file: '+error);
      return res.send({
        e:'Dường như có lỗi nào đó đã xảy ra trong quá trình đọc file mà bạn tải lên! Hãy chắc chắn rằng file bản tải lên là đúng trước khi thử lại!',
        s:false
      });
    }
    await services.updateNumTPIAct(c,rows.length-1,req.user._id);
    await services.uploadedFileCheckinActById(i._id);
  });
  return res.send({n:i.name,s:true});
}
```
**Về phần đọc mã QR code:**
```
<!-- view/admin/dashboard.ejs -->
<script>
function AJAX_checkInActByCode(c,i){
    $.ajax({
        type:'POST',
        url:`/admin/ajax-checkin-activity/${c}?id=${i}`,
        success: function(res){
            if(res){
                if(res.s){
                    $.notify(res.i,"success");
                }else{
                    $.notify(res.e,"error");
                }
                $('#progressCheckin').html(`<b clas="text-primary">Vui lòng cung cấp mã QR để điểm danh...</b>`);
            }else{
                $.notify("Không tìm thấy dữ liệu trả về! Vui lòng thử lại!","error");
            }
        },
        error:function(xhr,status,err){
            alert('Hệ thống tạm thời bị lỗi! Vui lòng thử lại sau!\n'+err);window.location.href="/admin";
        }
    });
}
 let scanner = new Instascan.Scanner({ video: document.getElementById('qrViewer') });
  // Hàm bật camera để quét
  function startCam(){
    $('#qrViewer').fadeIn();
    scanner.addListener('scan', function (content) {
      var info = getInfFrCode(content);
      $('#progressCheckin').html(`<i class="text-secondary">Hoạt động: ${info.a}-Người dùng: ${info.u}</i><br><b class="text-primary"><i class="fas fa-spin fa-circle-notch"></i> Đang kiểm tra thông tin...</b>`);
      AJAX_checkInActByCode(info.a,info.u);
    });
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        $('#progressCheckin').html('<b class="text-primary">Đang sử dụng máy ảnh của bạn.</b>');
        $('#turnOnCamBtn').fadeOut();$('#turnOffCamBtn').fadeIn();
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
        $('#progressCheckin').html('<b class="text-danger">Không tìm thấy chức năng máy ảnh trên thiết bị của bạn!</b>');
      }
    }).catch(function (e) {
      alert('Đã có 1 lỗi xảy ra trong quá trình chạy chức năng quét mã QR!\nVui lòng thử lại sau!\n('+e+')');
    });
  }
  // Hàm tắt camera
  function stopCam(){
      $('#turnOnCamBtn').fadeIn();
      $('#turnOffCamBtn').fadeOut();
      scanner.stop();
      $('#qrViewer').fadeOut();
      $('#progressCheckin').html('<b class="text-primary">Máy ảnh đã được tắt</b>');
  }
</script>
```
```
    // router/admin.js
    router.post('/ajax-checkin-activity/:c', controllers.isLogined_next, controllers.AJAX_checkinAct);
```
```
// controllers/admin.js
module.exports.AJAX_checkinAct=async function(req,res){
  let c=req.params.c;
  let id=req.query.id;
  let sc=await services.getNameActByCode(c,req.user._id);
  if(!sc)return res.send({e:'Không tìm thấy hoạt động nào trong danh sách hoạt động của bạn cho mã:'+c+'-'+sc,s:false});
  let cs=await services.isCheckedIn(c,id,req.user._id);
  if(cs) return res.send({e:'Bạn đã điểm danh hoạt động này',s:false});
  //Đọc file kiểm tra thông tin user
  var name = '';
  await readXlsxFile(`./public/files/xlsx/${c}.xlsx`,{sheet:'DIEMDANH'}).then(async function(rows,error){
    if(error){console.log('Lỗi đọc file: '+error);return res.send({e:'Lỗi hệ thống',s:false});}
    for(var stt=1;stt<rows.length;stt++)if(rows[stt][0]==id){name=rows[stt][1];break;}
    if(name!=''){
      let na=await services.addUserCheckinAct(c,id,name,req.user._id);
      if(na)return res.send({i:`Điểm danh thành công cho ${name}`,s:true});
      return res.send({e:`Điểm danh thất bại cho ${name}! Đã xảy ra lỗi trong quá trình lưu thông tin!`,s:false});
    }
    return res.send({e:`Không tìm thấy thông tin người tham gia hoạt động ${sc} với id: ${id}`,s:false});
  });
}
```
Với đoạn code trên, khi bạn bật cam, bạn chỉ cần đưa mã QR vào trước cam, khi cam nhận diện được nội dung, mình sẽ thực hiện 1 AJAX request về server để kiểm tra thông tin( Cụ thể, sẽ kiểm tra xem hoạt động tồn tại hay không, đọc file để biết id người dùng có tồn tại hay không) nếu không tồn tại! Báo không tìm thấy thông tin người dùng hoặc hoạt động, nếu tồn tại, thực hiện điểm danh.
## Trang người dùng
![](https://images.viblo.asia/220fb94a-57fc-40ae-870f-0f50f00a627c.png)

Phía trên là giao diện người dung, khá đơn giản, cách sử dụng, tại thời điểm checkin, nhập mã đã được nhận thông qua gmail hoặc các phương thức xác nhận tham gia hoạt động khác vào ô Code, như đã nói ở phần giới thiệu, mã code này gồm 2 thành phần 16 chữ số đầu là thông tin hoạt động, các số còn lại là id người dùng, được tạo trong file danh sách tham dự.
Sau khi nhập mã , nhấn nút kiểm tra, hệ thống sẽ thực hiện 1 request tương tự như lúc admin quét mã, nó sẽ kiểm tra thông tin hoạt động, thông tin người dùng trong danh sách. Nếu tồn tại, nó sẽ trả về thông tin người dùng.
Nói hơi khó hiểu nên mình sẽ minh họa bằng hình bên dưới:
Mình có file danh sách người tham gia như bên dưới, mình sẽ up nó lên hệ thống:
![](https://images.viblo.asia/4f950306-de42-4038-8574-b6e810707fa0.png)

Mình sẽ lấy ở đây một cái mã checkin là: *1404-2020-4419-4074_11113 : Cho người dùng Vũ Thị C* nha

*Có một lưu ý nho nhỏ: Cái mã checkin, có thể có hoặc không có dấu gạch ngang nhưng không thể thiếu dấu gạch dưới(Có nghĩa là với mã trên, bạn nhập 140420204419407411113 vẫn có thể điểm danh được)*
Sau khi up lên, số lượng người tham gia sẽ được cập nhật
![](https://images.viblo.asia/5715cb58-20d2-401c-ae27-51bcd34ade42.png)

Bây giờ bạn tải lại trang và nhấn nút Quét mã QR để thực hiện điểm danh:
![](https://images.viblo.asia/ff0a4baa-916f-4423-acfa-38273e6d0c33.png)

Tiến hành điểm danh, ở giao diện người dùng:
![](https://images.viblo.asia/da1b92d9-7fc4-4768-a5f7-f44375d6ea1f.png)

Phía trên là 3 trạng thái có thể xảy ra, Thông tin đúng, Mã code hoạt động sai hoặc mã id người dùng sai.
Tiến hành điểm danh
![](https://images.viblo.asia/06731ba0-5f1f-45d9-a277-6be6611553dd.png)

Nếu bạn đưa vào thêm một lần nữa, hệ thống sẽ báo là bạn đã điểm danh trước đó![](https://images.viblo.asia/5a43e5cb-2f5f-4e75-bcfb-f10f4a09adef.png)

----
Ở phần 2 mình sẽ xử lý vấn đề mỗi thiết bị, chỉ có thể điểm danh cho 1 người/1 hoạt động

----
Bạn có thể test ở đây nha: https://toladev-checkin.herokuapp.com (Trang quản trị viên là: https://toladev-checkin.herokuapp.com/admin)
Bạn lưu ý là https nha, vì nếu http thì một số trình duyệt sẽ không cho xài cam của thiết bị đâu.

----
Github: https://github.com/nqh-webdev/toladev-checkin