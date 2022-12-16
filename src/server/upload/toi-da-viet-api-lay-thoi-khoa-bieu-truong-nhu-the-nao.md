Helu các bạn! Mình học theo tín chỉ cho nên lịch học không phải tuần nào cùng giống 
nhau nên hôm nào cũng phải vào trang trường xem lịch **(hơi mất chút thời gian và giao
diện không trực quan)**. Một cách nữa là viết lại thời khóa biểu  **(Mất nhiều thời gian mà có thể sai sót)**.
Các cách này không phù hợp với một thằng lười như mình và mình muốn dùng nhiều lần... Dựng API lấy thời khóa biểu
sau đó có thể viết chatbot nhắc lịch hay web/mobile xem lịch tùy ý nữa... Hừm .. **Bắt đầu thôi**.

**Bước 0: Ý tưởng thực hiện**

- Input: tài khoản, mật khẩu sử dụng trên trang trường.
- Lấy file thời khóa biểu.
- Phân tích file thời khóa biểu => dữ liệu (JSON).


**Bước 1: Phân tích request**

![Đăng nhập vào trang trường](https://traiit.github.io//assets/1.PNG)

**Password encrypted trước khi gửi lên!!**

![Bắt request login](https://traiit.github.io//assets/2.PNG)

_Password truyền lên đã mã hóa md5, có một số data khác_

Chọn **request login > Copy as cURL (bash)**. Mở [Postman](https://www.postman.com) Chọn **Import >
Paste raw text > Ấn nút import** Ta được:

![](/assets/3.PNG)

Gửi **POST** thử xem sao !

![](https://traiit.github.io/assets/4.PNG)

Vậy là lấy được cookie rồi ^^
Đến với phần lấy file, mình sẽ phân tích request lấy file như request trên và đây là kết quả:

![Headers](https://traiit.github.io//assets/6.PNG)

Phần Headers

![Response](https://traiit.github.io/assets/5.PNG) 

Phần response - file excel là đây chứ đâu ^^

**Bước 2: Tiến hành code** 

Mình sử dụng _express_ của **NodeJS**

**Cấu trúc project**

![](https://traiit.github.io/assets/7.PNG)

**File login**

_Nhiệm vụ là lấy cookie_
```javascript

let optionsGetCookies = (username,password,form) =>{
    form['__EVENTTARGET'] = '';
    form['txtUserName'] = username;
    form['txtPassword'] = password;
    form['btnSubmit'] = 'Đăng nhập';
    return {
        method : 'POST',
        uri : urlLogin,
        simple: false,
        timeout: 20000,
        followRedirect: true,
        resolveWithFullResponse: true,
        form:form,
        headers: {
            'Connection' : 'keep-alive',
            'Cache-Control' : 'max-age=0',
            'Origin' : urlOrigin,
            'Upgrade-Insecure-Requests':'1',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.18 Safari/537.36 Edg/75.0.139.4',
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Referer' : urlLogin,
            'Accept-Encoding' : 'gzip, deflate',
            'Accept-Language' : 'en-US,en;q=0.9',
        }
    }    
}
module.exports = (username,password) =>{
    return new Promise((resolve,reject)=>{
        getElements(urlLogin,null).then((result)=>{
            let elements = result.elements;
            requestPromise(optionsGetCookies(username,password,elements)).then((_result)=>{
               return resolve({task:'getCookies',success:true, cookies:_result.headers['set-cookie']});
            }).catch((_error)=>{
                return reject({task:'getCookies',success: false, error:_error});
            })
        }).catch((error)=>{
            return reject({task:'getElements',success: false, error:error});
        })
    });
} 
```

**File get elements**
 
Mục đích là lấy các element trong body.
Sử dụng **cheerio**
```javascript
let optionsGetElement = (uri,cookies) =>{
    return {
        method : 'GET',
        uri : uri,
        followRedirect: true,
        headers: {
            'Connection' : 'keep-alive',
            'Cache-Control' : 'max-age=0',
            'Origin' : urlOrigin,
            'Upgrade-Insecure-Requests':'1',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.18 Safari/537.36 Edg/75.0.139.4',
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Referer' : urlLogin,
            'Accept-Encoding' : 'gzip, deflate',
            'Accept-Language' : 'en-US,en;q=0.9',
            'cookie' : formatCookieListToString(cookies),
        }
    }    
}
module.exports = (uri,cookies) =>{
    return new Promise((resolve,reject)=>{
        requestPromise(optionsGetElement(uri,cookies)).then((response)=>{
            let $ = cheerio.load(response);
            let hiddenInputList = $('input[type="hidden"]');

            
            let elements = {};
            if (cookies != null){
                let options = $('option[selected="selected"]');
                elements['PageHeader1$drpNgonNgu'] = options[0].attribs.value;
                elements['drpSemester'] = options[1].attribs.value;
                elements['drpTerm'] = options[2].attribs.value;
                elements['drpType'] = options[3].attribs.value;
                elements['btnView'] = 'Xuất file Excel';
            }
            
            for (let i=0;i<hiddenInputList.length;i++){
                if (hiddenInputList[i].attribs.value == undefined){
                    elements[hiddenInputList[i].attribs.name] = '';
                }else{
                    elements[hiddenInputList[i].attribs.name] = hiddenInputList[i].attribs.value;
                }
            }
            return resolve({task:'getElements',success:true,elements:elements})
        }).catch((error)=>{
            return reject({task:'getElements',success:false,error:error})
        })
    }); 
}
```

**Lấy file excel thời khóa biểu**

```javascript
let optionsGetFile = (cookies,form) =>{
    return {
        resolveWithFullResponse: true,
        method : 'POST',
        encoding: null,
        uri : urlStudentTimeTable,
        headers: {
            'Connection' : 'keep-alive',
            'Cache-Control' : 'max-age=0',
            'Origin' : urlOrigin,
            'Upgrade-Insecure-Requests' : '1',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Referer' : urlStudentTimeTable,
            'Accept-Encoding' : 'gzip, deflate',
            'Accept-Language' : 'en-US,en;q=0.9,vi;q=0.8',
            'cookie' : formatCookieListToString(cookies),
        },
        form:form
    }
}

module.exports = async(username,password) =>{
    return new Promise(async(resolve,reject)=>{
        await getCookies(username,password).then(async(result)=>{
            let cookies = result.cookies;
            await getElements(urlStudentTimeTable,cookies).then(async(_result)=>{
                await requestPromise(optionsGetFile(cookies,_result.elements)).then(async(__result)=>{
                    let file =  await fs.createWriteStream(path.resolve(`${__dirname}/files`,`${username}.xls`));
                    await file.write(__result.body);
                    await file.end();
                    return resolve({task:'getFile',success:true,filename:`${username}.xls`});
                }).catch((__error)=>{
                    console.log(__error);
                })
            }).catch((_error)=>{
                console.log(_error);
            })
        }).catch((error)=>{
            console.log(error);
        })
        return reject('error');
    });   
}
```

**Trích xuất dữ liệu từ file**

**_Phân tích [file](https://traiit.github.io/files/ThoiKhoaBieuSinhVien.xls) và tiến hành code_**.

Sử dụng **xlsx**.

```javascript
module.exports = (file) =>{
    return new Promise((resolve,reject)=>{
        try{
            let schedule = [];
            let getAddressCell = (str) =>{
                let r = /\d+/;
                let row = parseInt(str.match(r)[0]);
                let col = str.replace(row,"");
                return {row:row,col:col}
            }
            let formatDateYMD= (str)=>{
                str = str.split("/");
                let day = str[0];
                let month = str[1];
                let year = str[2];
                return new Date(`${year}/${month}/${day}`)
            }
            let formatDay = (day) =>{
                return day -1;
            }
            let findDatewithDay = (start_date,end_date,day) =>{
                let dateList =[];
                for (let i = start_date; i < end_date; i+=60*60*24*1000){
                    let date_check = new Date(i);
                    if(formatDay(day) == date_check.getDay()){
                        dateList.push(date_check.getTime()); 
                    }
                }
                return dateList;
            }
            let findIndexDate = (date) =>{
                let index = -1;
                for (let i = 0; i < schedule.length;i++){
                    if (schedule[i].date==date){
                        return i;
                    }
                }
                return index;
            }
            let addToSchedule = (start_date,end_date,day,lesson,subject_name,address) =>{
                let dateList = [];
                // console.log(start_date,end_date,day,lesson,subject_name,address);
                dateList = findDatewithDay(start_date,end_date,day);
                for (let i = 0; i < dateList.length; i++){
                    var found = findIndexDate(dateList[i]);
                    if (found == -1 ){
                        let lessons = new Array();
                        lessons.push({lesson:lesson,subject_name:subject_name,address:address});
                        schedule.push({date:dateList[i],lessons:lessons});
                    }else{
                        schedule[found].lessons.push({lesson:lesson,subject_name:subject_name,address:address});
                    }
                }
            }
            let lessonArray = (lesson) =>{
                let lesson_array_new = [];
                let lesson_array = ['1,2,3','4,5,6','7,8,9','10,11,12','13,14,15,16'];
                for (let i = 0 ; i < lesson_array.length ; i++){
                    if (lesson.indexOf(lesson_array[i]) != -1){
                        lesson_array_new.push(lesson_array[i]);
                    }
                }
                return lesson_array_new;
            }
            let getInfoDetail = (start_date,end_date,subject_name,str) =>{
                str = str.split("\n");
                for (let i=0;i < str.length; i++){
                    if (str[i] != '' && str[i] != null && str[i] != undefined){
                        //console.log("===>",str_start_date,str_end_date,str[i]);
                        let str_info = str[i].split("tại");
                        let address = str_info[1];
                        let day_and_lesson = str_info[0].split("tiết");
                        let lesson = day_and_lesson[1].replace(" ","").replace(" ","");
                        let day = day_and_lesson[0].replace(" ","").replace("Thứ","");
                        let lesson_array = lessonArray(lesson);
                        for (let i = 0; i < lesson_array.length;i++){
                            // console.log(start_date,end_date,day,lesson_array[i],subject_name,address);
                            addToSchedule(start_date,end_date,day,lesson_array[i],subject_name,address);
                        }
                    } 
                }
            }     
            var workbook = XLSX.readFile(path.resolve(`${__dirname}/files`,file));
            var worksheet = workbook.Sheets[workbook.SheetNames[0]];

            let  name = worksheet["C6"]["v"];
            let  student_id = worksheet["F6"]["v"];
            let  class_name = worksheet["C7"]["v"];
            let  major = worksheet["F8"]["v"];
            for (z in worksheet) {
                if(z[0] === '!') continue;
                    //console.log(getAddressCell(z),z,worksheet[z]["v"]);
                if (worksheet[z]["v"].toString().indexOf("Từ")>=0 && worksheet[z]["v"].toString().indexOf("đến")>=0){
                    let address_cell = getAddressCell(z);
                    let subject_name = worksheet[`F${address_cell.row}`]["v"].split("-")[0];
                    let sessionList = worksheet[z]["v"].toString().split("Từ");
                    for (let i =0;i<sessionList.length;i++){
                        let str = sessionList[i].replace("\n","").split(":");
                        let str_datetime = str[0].replace(" ","").split("đến");
                        let str_start_date = str_datetime[0];
                        let str_end_date = str_datetime[1];
                        if (str_start_date != undefined && str_end_date != undefined){
                            getInfoDetail(formatDateYMD(str_start_date).getTime(),formatDateYMD(str_end_date).getTime(),subject_name,str[1]);
                        }
                    }          
                } 
            }
            fs.unlink(path.resolve(`${__dirname}/files`,file), function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log({task:'readFile',success:true,message:`File ${file} deleted!`});
            }); 
            return resolve({task:'readFile',success:true,student_id :student_id,name:name,class_name:class_name,major:major,schedule:schedule});
        }catch(e){
            fs.unlink(path.resolve(`${__dirname}/files`,file), function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log({task:'readFile',success:true,message:`File ${file} deleted!`});
            }); 
            return reject({task:'readFile',success:false,error:e});
        }
    });
}
```

**Kết quả**

```json
{"task":"readFile","success":true,"student_id":"xxxxx","name":"xxxxx","class_name":"xxx","major":"Công nghệ thông tin","schedule":[{"date":1578355200000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"}]},{"date":1578960000000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"},{"lesson":"7,8,9","subject_name":"Kiến trúc máy tính","address":" 301_TA2 TA2"}]},{"date":1580688000000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"},{"lesson":"7,8,9","subject_name":"Nguyên lý hệ điều hành","address":" 301_TA2 TA2"}]},{"date":1581292800000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"},{"lesson":"7,8,9","subject_name":"Nguyên lý hệ điều hành","address":" 301_TA2 TA2"}]},{"date":1581897600000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"},{"lesson":"7,8,9","subject_name":"Nguyên lý hệ điều hành","address":" 301_TA2 TA2"}]},{"date":1582502400000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"},{"lesson":"7,8,9","subject_name":"Nguyên lý hệ điều hành","address":" 301_TA2 TA2"}]},{"date":1583107200000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"},{"lesson":"7,8,9","subject_name":"Nguyên lý hệ điều hành","address":" 301_TA2 TA2"}]},{"date":1583712000000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"},{"lesson":"7,8,9","subject_name":"Nguyên lý hệ điều hành","address":" 301_TA2 TA2"}]},{"date":1584316800000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"},{"lesson":"7,8,9","subject_name":"Nguyên lý hệ điều hành","address":" 301_TA2 TA2"}]},{"date":1584057600000,"lessons":[{"lesson":"10,11,12","subject_name":"Hệ thống thông tin di động","address":" 301_TA2 TA2"}]}]}
```

**Sản phẩm**

_API được sử dụng trong app viết bởi anh trong CLB của mình._
 [Ứng dụng xem lịch học](https://play.google.com/store/apps/details?id=kma.hatuan314.schedule)
 ![Ảnh](https://traiit.github.io/assets/8.png)
 
 [**Link bài viết**](https://traiit.github.io/javascript/nodejs/2020/03/07/Toi-da-viet-API-lay-thoi-khoa-bieu-truong-nhu-the-nao.html) _https://traiit.github.io/javascript/nodejs/2020/03/07/Toi-da-viet-API-lay-thoi-khoa-bieu-truong-nhu-the-nao.html_
 
**traiIT, _Xin cảm ơn các bạn <3_**