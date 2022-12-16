Web Scraping chắc hẳn với một số anh em develop cũng không còn lạ lẫm gì. Bài viết hôm nay, tôi viết hường dẫn xây dựng một ứng dụng Web Scraping với Nuxtjs bằng cách sử dụng thư viện **Puppeteer** của Google. 

Nó được xây dựng với mục đích mô tả cách thiết lập và cáu hình Puppeteer để nó hoạt động với Nuxtjs và sử dụng nó như thế nào để Scrape dữ liệu từ một website và hiển thị nó trên website của bạn.

Vì Puppeteer là một thư viện Node dạng Server-side nên rất khó để thiết lập nó hoạt động với thư viện là một Client-side như Vue.js và không có nhiều tài liệu hướng dẫn về nó. Vậy nên bài viết này chúng ta có thể giải quyết vấn đề này trong dự án bằng Nuxt.js và Puppeteer.

# Kiến thức cơ bản
## Web Scraping 
Web Scraping nghe có vẻ lạ lẫm nhưng thực tế nó lại là một thuật ngữ rất đơn giản và dễ hiểu. Nó là một công nghệ mô tả lại quá trình trích xuất dữ liệu từ các website và lưu chúng lại dưới định dạng bất kì để phục vụ cho nhiều mục đích khác nhau.

Web Scraping sẽ tự động hoá quy trình trích xuất thông tin từ các trang web và lưu trữ thông tin này dưới dạng text, json, v.v. để xử lý thêm.

Một vài lợi ích của việc sử dụng Web Scraping: 
1. Web Scraping có thể sử dụng để trích xuất chi tiết sản phẩm của các trang web thương mại điện tử như giá cả, tên sản phẩm, hình ảnh, v.v.
2. Việc tìm kiếm trên web rất hữu ích trong nghiên cứu vì nó có thể giúp thu thập dữ liệu có cấu trúc từ nhiều trang web.
3. Việc thu thập dữ liệu từ các nguồn khác nhau để phân tích có thể được tự động hóa với Web Scraping một cách dễ dàng.
4. Nó có thể được sử dụng để thu thập dữ liệu cho việc testing hoặc đào tạo cho tập dữ liệu machine learning.

## Puppeteer
Puppeteer là một thư viện Node được sử dụng để cào dữ liệu từ các trang web, tự động hoá việc điền các biểu mẫu, v.v.

Nó là một thư viện Node chính thực được phát hành bới Google để kiểm soát các phiên bản trên Google Chrome, có thể được cấu hình ở chế độ chạy nền.

Puppeteer được sử dụng trong một số trường hợp:

1. Trang web cào dữ liệu.
2. Theo dõi hiệu suất load trang.
3. Tự động hoá việc điền biểu mẫu.
4. Tạo ảnh chụp màn hình, PDF.
5. Rất hữu ích cho việc Automated Testing.
6. Thực hiện tự động hoá nhiều thao tác trên trình duyệt.

# Xây dựng một ứng JobScrapper 

## Tạo project Nuxtjs

Trước khi bắt đầu phát triển ứng dụng Web Scraping, chúng ta cần cài đặt và thiết lập Nuxtjs. Có thể tham khảo tại https://nuxtjs.org/docs/2.x/get-started/installation.

Install Nuxtjs
```
yarn create nuxt-app job-scrapper
```

Sau khii cài đặt, chúng ta bắt đầu tạo các components, stores khác nhau và các trang chúng ta sẽ cần scrape trong dự án này.

Tiếp theo chúng ta cần tạo components Jobs để hiển thị danh sách các công việc được tạo, một job store để quản lý các job state, một trang điều hướng như sau: 

![](https://images.viblo.asia/cf2db1c7-4902-4e5a-ab56-c6198b2b6df3.png)

Cài đặt tất cả các dependencies cần thiết để cào trang với nuxtjs và puppeteer

```
npm i puppeteer net tls
```

## Configuring Puppeteer
Đây là phần khó khăn, chúng ta có thể gặp một vài vấn đề khác nhau khi cấu hình Puppeteer hoạt động với nuxtjs vì nuxtjs là song song giữa Client và Server Side framework.

Rất khó để biết được vị trí đặt Puppeteer hoặc như thế nào để gọi nó từ server-side vì Puppeteer là một thự viện server node và chỉ hoạt động trên server-side của nuxt.js. Chúng ta sẽ cùng thiết lập để nó hoạt động được trên dự án của mình nhé.

Trước tiên, tạo một `script.js` trong thư mục gốc với đoạn code sau:

```JS
const saveFile = require('fs').writeFileSync 
const pkgJsonPath = require.main.paths[0] + '/puppeteer' + '/package.json' 
const json = require(pkgJsonPath) 
// eslint-disable-next-line no-prototype-builtins 
if (!json.hasOwnProperty('browser')) { json.browser = {} } 
delete json.browser.ws 
saveFile(pkgJsonPath, JSON.stringify(json, null, 2))
```

Nhìn vào đây chúng ta có thể hiểu được nó làm gì. Nó sẽ thực hiện kiểm tra trong `package.json` đã tồn tại đối tượng browser không và thực hiện xoá thuộc tính `ws` của `browser`.
Nó sẽ cần thực hiện mỗi khí chạy `npm install`.

Vậy nên chúng ta cần add script này vào package.json và nó sẽ được thực thi như một `postinstall` script.
```JS
"scripts": { 
     "dev": "nuxt", 
     "build": "nuxt build", 
     "start": "nuxt start", 
     "export": "nuxt export", 
     "serve": "nuxt serve", 
     "lint:js": "eslint --ext .js,.vue --ignore-path .gitignore .",
     "lint": "yarn lint:js", "test": "jest", 
     "postinstall": "node script" 
}, 
```

chúng ta cần thêm đoạn code sau vào package.json:

```JS
"browser": { 
   "fs": false, 
   "path": false, 
   "os": false, 
   "tls": false 
} 
```

Chúng ta cần thiết lập `fs`, `path`, `os` và `tls` thành false vì cần thiết trên server-side.

Tiếp theo, mở `nuxt.config.js` và thêm vào đoạn code sau: 
```JS
build: {     
 extend(config, { isServer, isClient }) {       
   config.externals = config.externals || {}       
   if (!isServer) {         
    config.node = {           
    fs: 'empty',         
   }         
   if (Array.isArray(config.externals)) {
    config.externals.push({             
      puppeteer: require('puppeteer'),           
    })         } 
   else {           
    config.externals.puppeteer = require('puppeteer')         
   }       
 }       
 config.output.globalObject = 'this'       
 return config     
 },   
},
```

Cấu hình này chỉ bắt buộc puppeteer và thêm nó mảng khi Nuxt.js đặt tại Client-side và thiết lập `fs` rỗng.

## Web Scrapping
Tạo một file `JobScrapper.js` với đoạn code sau:

``` JS
const puppeteer = require('puppeteer') 
const jobUrl = // SITE URL HERE let page let browser 
let cardArr = [] 
class Jobs { 
   // We will add 3 methods here 
   // Initializes and create puppeteer instance 
   static async init(){} 
   // Visits the page, retrieves the job 
   static async resolver() {} 
   // Converts the job to array 
   static async getJobs() {} 
} 
export default Jobs
```

### Tạo Init method

```JS
static async init() { 
  browser = await puppeteer.launch({ 
    // headless: false, 
    args: [ 
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-dev-shm-usage', 
      '--disable-accelerated-2d-canvas', 
      '--no-first-run', '--no-zygote', 
      '--single-process', // <- this one doesn't works in Window         
      '--disable-gpu', 
    ], 
}) 
 page = await browser.newPage() 
 await Promise.race([ 
   await page.goto(jobUrl, { waitUntil: 'networkidle2' }).catch(() => {}), 
  await page.waitForSelector('.search-card').catch(() => {}), 
 ]) 
}
```

Function `init` khởi tạo puppeteer  với một số cấu hình, tạo một trang mới với `browser.newPage()` và ghé URL với `await page.goto`, và chờ cho trang load thành công với `await page.waitForSelector`.

### Tạo một Resolver method

```JS
// Visits the page, retrieves the job
static async resolver() {
    await this.init()
    const jobURLs = await page.evaluate(() => {
        const cards = document.querySelectorAll('.search-card')
        cardArr = Array.from(cards)
        const cardLinks = []
        cardArr.map((card) => {
            const cardTitle = card.querySelector('.card-title-link')
            const cardDesc = card.querySelector('.card-description')
            const cardCompany = card.querySelector('a[data-cy="search-result-company-name"]')
            const cardDate = card.querySelector('.posted-date')
           const { text } = cardTitle
           const { host } = cardTitle
           const { protocol } = cardTitle
           const pathName = cardTitle.pathname
           const query = cardTitle.search
           const titleURL = protocol + '//' + host + pathName + query
           const company = cardCompany.textContent
           cardLinks.push({
                 titleText: text,
                 titleURLHost: host,
                 titleURLPathname: pathName,
                 titleURLSearchQuery: query,
                 titleURL: titleURL,
                 titleDesc: cardDesc.innerHTML,
                 titleCompany: company,
                 titleDate: cardDate.textContent,
           })
       })
      return cardLinks
   })
   return jobURLs
}
```

Đầu tiên, nó chọn tất cả Jobs đã được liệt kê và chuyển đổi nó thành mảng và lặp lại từng công việc trong khi lấy dữ liệu cần thiết.

### Tạo getJobs method

```JS
static async getJobs() { 
    const jobs = await this.resolve() 
    await browser.close() 
    const data = {} 
    data.jobs = jobs 
    data.total_jobs = jobs.length 
    return data 
}
```
Phương thức này chỉ trả veer mảng Jobs từ phương thức `resolver` và đóng trình duyệt.

### Tạo Vuex action
Tiếp theo, chúng ta sẽ thiết lập Vuex store để truy xuất dữ liệu jobs mỗi khi chúng ta gửi hành động `getJobs` và lưu trữ chúng ở state.

Mở `store/job.js` và thêm đoạn code sau:
```JS
import JobScrapper from '~/JobScrapper' 
// Action 
async getJobs({ commit }) { 
    const data = await JobScrapper.getJobs(); 
    if (data.total_jobs) { 
        commit('STORE_JOBS', data) 
        return data.jobs 
    } 
} 
// Mutation 
STORE_JOBS(state, payload) { 
    state.jobs = payload.jobs 
    state.total_jobs = payload.total_jobs 
}, 
// Getter 
export const getters = { 
    getJobs: (state) => () => { 
        return state.jobs 
    }, 
} 
// State 
export const state = () => ({ 
   jobs: [], 
   total_jobs: 0, 
})
```

### Hiển thị Jobs
Mở `pages/job.vue` và thêm vào: 
```JS
<template> 
    <div class="row mt-5"> 
        <div class="card-group"> 
            <div class="row"> 
                <div class="col-md-8"> 
                    <Job v-for="(job, i) in jobs" :key="i" :job="job" /> 
              </div> 
           </div> 
      </div> 
   </div> 
</template> 
<script> 
export default { 
    async asyncData({ store }) { 
        const getJobs = store.getters['job/getJobs'] 
        let jobs = getJobs() 
        if (!jobs.length) { 
            jobs = await store.dispatch('job/getJobs') 
        } 
     return { jobs } 
    } 
} 
</script>
```
Đâu là một cách bạn có thể gửi các actions trong mỗi trang bạn muốn, nhưng nó sẽ phải nằm trong `asyncData()` hook vì nó được gọi từ Server-side.

Một cách khác hoặc cách tốt nhất là gửi action bên trong `nuxtServerInit` vì nó sẽ được thực thi mỗi khi tải trang mới.

Tạo `index.js` bên trong thư mục store với đoạn code sau:

```JS
async nuxtServerInit({ dispatch }) { 
    try { 
        await dispatch('job/getJobs') 
    } catch (error) {} 
},
```
Tạo tác này sẽ quét jobs và lưu trữ chúng vào state, chúng ta có thể sử dụng `...mapState` hoặc `...mapGetters` để truy xuất dữ liệu và hiển thị nó trên components của mình.

Dự án này, chúng ta sẽ sử dụng `nuxtServerInit` và `...mapState` trong bất kì components vào chúng ta muốn hiển thị dữ liệu job.

### Jobs Component

```JS
<template> 
    <section> 
         ........ 
         <div class="row mb-1 mt-5" v-if="jobs.length !== 0"> 
             <div v-for="job in jobs" :key="job.id" class="col-md-6 col-sm-12 mb-4" > 
                // My JOB component to display a specific job 
                <Job :job="job" /> 
             </div> 
         </div> 
        <div v-else class="row mb-1 mt-5">No Jobs at this time</div>
        .......... 
  </section> 
</template> 
<script> 
import { mapState } from 'vuex' 
export default { 
   computed: { 
       ...mapState({ jobs: (state) => { 
            return [...state.job.jobs].slice(0, 10) 
       }, '
    }), 
 }, 
} 
</script> 
<style></style>
```

Cuối cùng chúng ta có thể chạy ứng dụng Web Scrapper để xem thành quả hoạt động ra sao nhé.
```
$ yarn build
$ yarn start
```
# Kết luận
Hy vọng sau bài viết này chúng ta có thể làm được những điều xa hơn nữa để hiểu sâu hơn về cách xử lý Web Scrapping bằng Puppeteer trong Nuxtjs. Chúng ta nên xây dựng một JobScrapper hoàn chỉnh với những áp dụng thực tế và hữu ích như: cào dữ liệu ngân hàng để phân tích và cập nhật thông tin tài chính, hay lấy dữ liệu tiền tệ trên các website hiện nay. v.v.

Phương thức Web Scraping với Nuxtjs sử dụng Puppeteer có rất nhiều cách giải quyết và có thể hơi khó với một số người mới bắt đầu. Có thể sẽ có nhiều hướng giải quyết khác nhau hy vọng sẽ có nhiều đóng góp cho những ý tưởng tốt hơn.

Chúc các bạn thành công!