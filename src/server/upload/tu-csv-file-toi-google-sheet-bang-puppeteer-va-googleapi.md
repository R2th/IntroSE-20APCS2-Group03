# Giới thiệu
Trong bài này, mình sẽ chia sẻ cách import 1 file csv được download từ trang web vào google sheet sử dụng google cloud function, cụ thể là dùng puppeteer, google api, axios.  
Có 2 bước chính để làm việc này như mình chia sẻ dưới đây. Mình sẽ bỏ qua những hướng dẫn cơ bản như cài thư viện, xây dựng cloud function nhé.  
## Lấy dữ liệu csv 
Đầu tiên, phải lấy dữ liệu csv từ trang web. Tại đây, mình sẽ lấy ví dụ bằng trang web redmine, chứa cả phần log in user, sử dụng puppeteer.Nói qua về puppeteer thì đây là 1 thư viện khá phổ biến trong việc test 1 trang web bằng cách giả lập thao tác người dùng trên 1 trang web trên các phần tử. Ngoài ra, puppeteer cũng còn làm được khá nhiều thứ hay ho khác mà mình sẽ giới thiệu sau :v.  
Mở 1 trang web bằng puppeteer:  
```
import { launch } from "puppeteer";
const browser = await launch({
    headless: true, // false
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(REQUEST_URL, { waitUntil: "networkidle2" });
  const navigationPromise = page.waitForNavigation();
```
Ở đây, giá trị `headless: true` tức là function sẽ không mở ra 1 giao diện web cụ thể. Bạn có thể set giá trị `headless: false `trong quá trình code để dễ thao tác.` const navigationPromise = page.waitForNavigation();` dùng mỗi khi muốn chờ trong lúc trong web được load lên, mình sẽ dùng nhiều nên gán tạm vào 1 biến cho dễ xài. Chú ý rằng nếu bạn thao tác quá nhanh khi các element chưa kịp load lên, function sẽ báo lỗi.  
Tiếp theo, step by step, F12 lên, tìm element, thực hiện các bước như 1 người dùng thực thụ đến khi trang download file csv xuống:  
Mình sẽ lấy ví dụ về login, các bước khác các bạn làm tương tự. 
![image.png](https://images.viblo.asia/43e72dd2-8288-4ae0-af63-3e3db94d1133.png)  
Ở đây, ra thấy box login có element là input, type = text. Để fill giá trị vào ô này, thì ta có đoạn code dưới:  
```
  await page.type('input[type="text"]', USER_NAME);
  await page.type('input[type="password"]', PASSWORD);
  await page.click("#login-submit");
  await navigationPromise;
```
Sử dụng page.$x để filter element, page.$ để click vào 1 element id, page.keyboard để thao tác với bàn phím.  
```
const handler = await page.$x(
    '//a[@class="dropdown-toggle in_link icon icon-dd-menu"]'
  );
  await handler[0].click();
  await navigationPromise;
  const handler2 = await page.$x('//a[@class="csv icon no_line"]');
  await handler2[0].click();
  await navigationPromise;
  const handler3 = await page.$("input#c__all_inline");
  await handler3!.click();
  const handler6 = await page.$("select#encoding");
  await handler6!.click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  const handler5 = await page.$x('//input[@type="submit"][@value="Export"]');
  await handler5[0]!.click();
```
Sau khi click được vào text csv như hình, sẽ có 1 file csv được tải xuống dạng **issues.csv**. 
![Screenshot from 2021-08-19 21-13-23.jpg](https://images.viblo.asia/8b3ade6a-246b-4964-9aee-1c12515c8626.jpg)  Nhưng ta muốn lấy dữ liệu csv thay vì tải xuống như trang web làm. Ta sẽ làm như sau:  
Lấy cookie của trang web sau khi đăng nhập:  
```
const client = await page.target().createCDPSession();
const data = await client.send("Network.getAllCookies");
```
lắng nghe sự kiện trang web download file, lấy url download, gửi lên 1 request khác bằng axios với cookie ở trên để lấy dữ liệu.  
```
let resData;
page.on("request", async (request) => {
    if (request.url().includes(".csv")) {
      const res = await axios.request({
        url: request.url(),
        withCredentials: true,
        headers: {
          Cookie: `_session_id=${data.cookies[0].value}`,
        },
      });
      // await page.close();
      resData = res.data;
    }
  });
```
Xong, bây giờ ta đã có biến resData lưu giữ full data csv. Tiến hành add nó vào google sheeet thôi.  
## Thêm dữ liệu vào google sheet
Trước tiên, config googlesheet api:
```
import { google, sheets_v4 } from "googleapis";
const auth = await google.auth.getClient({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/devstorage.read_only",
      ],
    });
    const sheetsAPI = google.sheets({ version: "v4", auth });
```
Tạo 1 sheet trống mới để chứa data:  
```
export function addEmptySheet(sheetsAPI: sheets_v4.Sheets, sheetName: string) {
  return new Promise((resolve, reject) => {
    const emptySheetParams = {
      spreadsheetId: SHEET_ID,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
                index: 1,
                gridProperties: {
                  rowCount: 2000,
                  columnCount: 26,
                  frozenRowCount: 1,
                },
              },
            },
          },
        ],
      },
    };
    sheetsAPI.spreadsheets.batchUpdate(
      emptySheetParams,
      (err: any, response: any) => {
        if (err) {
          reject(new Error("Created empty sheet error: " + err));
        } else {
          const sheetId = response.data.replies[0].addSheet.properties.sheetId;
          logger.log("Created empty sheet: " + sheetId);
          resolve(sheetId);
        }
      }
    );
  });
}
```
Thêm data trước đó vào sheet vừa tạo. SHEET_ID là id của google sheet lấy từ url:
```
function populateAndStyle(
  sheetsAPI: sheets_v4.Sheets,
  theData: any,
  sheetId: string
) {
  return new Promise((resolve, reject) => {
    const dataAndStyle = {
      spreadsheetId: SHEET_ID,
      resource: {
        requests: [
          {
            pasteData: {
              coordinate: {
                sheetId: sheetId,
                rowIndex: 0,
                columnIndex: 0,
              },
              data: theData,
              delimiter: ",",
            },
          },
          {
            repeatCell: {
              range: {
                sheetId: sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
              },
              cell: {
                userEnteredFormat: {
                  textFormat: {
                    fontSize: 11,
                    bold: true,
                  },
                },
              },
              fields: "userEnteredFormat(textFormat)",
            },
          },
        ],
      },
    };

    sheetsAPI.spreadsheets.batchUpdate(dataAndStyle, (err: any) => {
      if (err) {
        reject(new Error("populateAndStyle error: " + err));
      } else {
        logger.log(
          sheetId +
            " sheet populated with " +
            theData.length +
            " rows and column style set."
        );
        resolve(null);
      }
    });
  });
}
```
hàm main:
```
    const sheetId = (await addEmptySheet(sheetsAPI, fileName)) as string;
    const theData = await downloadCSV();
    await populateAndStyle(sheetsAPI, theData, sheetId);
```
Thế là xong, chạy function để test thôi. ^^.  
# Tổng kết
Trên đây, mình có hướng dẫn các bạn cách thêm csv vào google sheet sử dụng google api. Bài viết còn sơ xài, mong được sự góp ý của các bạn. Happy coding <3.  
Bài viết có tham khảo tại: https://codelabs.developers.google.com/codelabs/cloud-function2sheet#0