# Mở đầu
Mình đã có 1 thời gian code VueJS và hôm nay mình sẽ giới thiệu đến mọi người một số thư viện mà mình thường xuyên sử dụng trong VueJS. Đây là những thư viện khá phổ biến và được sử dụng hầu hết trên các framework hay các ngôn ngữ khác. Vậy trong VueJS nó được được dùng thế nào chúng ta sẽ cùng tìm hiểu nhé.. ;) 

# Vue Bootstrap Datetime Picker
![](https://images.viblo.asia/30943bea-c96d-4efc-a13e-f6dd8767d9c3.png)

Đây chắc hẳn là thư viện quá quen thuộc với mọi người phải không. Tác giả đã viết thư viện này dựa trên thư viện gốc http://eonasdan.github.io/bootstrap-datetimepicker/ và thư viện này có 2 phiên bản tương ứng với 2 phiên bản bootstrap là bootstrap 3 và bootstrap 4. 
Để cài đặt thư viện này ta có thể cài đặt qua npm hoặc yan như sau:
```bash 
# npm
npm install vue-bootstrap-datetimepicker --save
 
# Yarn 
yarn add vue-bootstrap-datetimepicker
```

Vì mình đang sử dụng bootstrap 3 nên mình sẽ cài phiên bản 4.x. Cách sử dụng thư viện này trong project VueJS thì có 2 cách. 1 là sử dụng nó như component. Chỗ nào cần thì import vào sử dụng. Còn cách thứ 2 là khai báo nó là plugins và sử dụng một cách global ở mọi nơi.
Để sử dụng như component ta khai báo như sau:
```javascript
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <date-picker v-model="date" :config="options"></date-picker>
      </div>
    </div>
  </div>
</template>
 
<script>
  // Import required dependencies 
  import 'bootstrap/dist/css/bootstrap.css';
  
  // Import this component
  import datePicker from 'vue-bootstrap-datetimepicker';
   
  export default {    
    data () {
      return {
        date: new Date(),
        options: {
          format: 'DD/MM/YYYY',
          useCurrent: false,
        }       
      }
    },
    components: {
      datePicker
    }
  }
</script> 
```
Hoặc khai báo sử dụng nó như plugins:
```javascript
  import datePicker from 'vue-bootstrap-datetimepicker';
  import 'bootstrap/dist/css/bootstrap.css';
  Vue.use(datePicker);
```
Tất cả những options lúc init date picker giống hoàn toàn so với thư viện gốc. Các bạn có thể tham khảo ở đây: 
http://eonasdan.github.io/bootstrap-datetimepicker/Options/

# Select2 in VueJS 
Một thư viện tiếp theo mà mình muốn giới thiệu đó là Select2 https://github.com/godbasin/vue-select2. Thông thường select2 ta sử dụng là dùng Jquery thì nay tác giả đã viết lại nó thành component để ta thuận tiện sử dụng với V-model.
Cài đặt như sau:
```bash
npm install v-select2-component --save
```

Khai báo Global component
```javascript
import Select2 from 'v-select2-component';

Vue.component('select2', Select2);
```
Ở template ta sử dụng như sau:
```javascript
<template>
  <div>
    <select2 v-model="myValue" :options="myOptions" :settings="{ settingOption: value, settingOption: value }" @change="myChangeEvent($event)" @select="mySelectEvent($event)" />
    <h4>Value: {{ myValue }}</h4>
  </div>
</template>

<script>
export default {
    data() {
        return {
            myValue: '',
            myOptions: ['op1', 'op2', 'op3'] // or [{id: key, text: value}, {id: key, text: value}]
        }
    },
    method: {
        myChangeEvent(val){
            console.log(val);
        },
        mySelectEvent({id, text}){
            console.log({id, text})
        }
    }
}
</script>
```
Có 2 props mà ta cần để ý đó là `:options` - chứa mảng các option của select mà ta cần hiển thị. `:settings` chứa các configurable settings của Select 2 https://select2.org/configuration/options-api. Để minh họa cụ thể hơn mình sẽ demo code mình hay sử dụng là config select2 để load dữ liệu từ server về và phân trang... 

```javascript
<template>
   <select2 v-model="role_id" :settings="select2Settings"/>
</template>

<script>
    export default {
        created () {
                this.select2Settings = this.getSelect2Settings({
                    url: '/api/select-roles',
                    field_name: 'title',
                    placeholder: 'Hãy chọn role ...',
                    term_name: 'title'
                });
        }
        data () {
            return {
                role_id: null,
                select2Settings: null
            }
        },
        methods: {
            getSelect2Settings(options = {}) {
                return {
                    ajax: {
                        headers: {
                            Authorization: 'Bearer ' + window.token
                        },
                        cache: true,
                        delay: 200,
                        url: options.url,
                        data: function (params) {
                            return Object.assign({
                                [options.term_name || options.field_name] : params.term,
                                page: params.page
                            }, options.params || {});
                        },
                        processResults: function processResults(data, params) {
                            params.page = params.page || 1;

                            return {
                                results: data.data,
                                pagination: {
                                    more: params.page * data.per_page < data.total
                                }
                            };
                        },
                    },
                    allowClear: true,
                    multiple: options.multiple || false,
                    placeholder: options.placeholder,
                    templateResult: function (repo) {
                        if (repo.loading) return repo.text;

                        return  repo[options.field_name];
                    },
                    templateSelection: function (repo) {
                        if (repo.selected) return repo.text;

                        if (repo.id) {
                            var textShow = repo[options.field_name];
                        } else {
                            var textShow = repo.text;
                        }

                        return  textShow;
                    },
                    escapeMarkup: function escapeMarkup(markup) {
                        return markup;
                    },
                };
            }
        }
    }
</script>
```

Ở ví dụ trên vì select2 settings là một object to và thay đổi nhiều thông tin nên mình đã viết thành hàm để có thể tiện sử dụng khi init nhiều select2 khác nhau. Hàm này ta có thể cho nó vào 1 Global Mixins để gọi bất cứ lúc nào cần init select2. Như vậy dữ liệu sẽ được load từ server về và có phân trang đầy đủ... ;) 

![](https://images.viblo.asia/e1edfcdf-6427-41a4-a6e6-c92e57611d6b.png)
# TinyMCE in VueJS
Một thư viện nữa mình cũng hay sử dụng trong một số dự án là TinyMCE. Đây là một editor khá hiện đại và phổ biến. Nó được viết sẵn thành package để tích hợp với VueJS luôn. Tài liệu tích hợp trên trang chủ https://www.tiny.cloud/docs/integrations/vue/

Cài đặt và sử dụng:
```bash
npm install @tinymce/tinymce-vue
```
Khai báo global component như thường:
```javascript
import Editor from '@tinymce/tinymce-vue';
Vue.component('editor', Editor);
```
Như vậy là đã có thể dùng được luôn:
```javascript
<editor api-key="API_KEY" :init="{plugins: 'wordcount'}"></editor>
```
Tuy nhiên nếu dùng như thế thì khi mình khai báo các plugin của editor thì chúng sẽ được load về từ Tiny Cloud. Nên sẽ khá mất thời gian. Để load về và sử dụng ngay trong project thì ta có thể khai báo như sau:

```javascript
import Editor from '@tinymce/tinymce-vue';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/table';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';

Vue.component('editor', Editor);
```

Và như vậy cần plugin gì ta có thể khai báo ở đây luôn. 
![](https://images.viblo.asia/a9ca88ba-73b1-48ac-bbfb-86a74bd82061.png)

# Vue Sweet Alert 2
Để thay cho cái alert nhàm chán của javascript mình hay sử dụng thư viện open source này https://sweetalert2.github.io/ và để sử dụng nó trong vue thì package https://www.npmjs.com/package/vue-sweetalert2 chính là cái mà mình cần. 
Cài đặt:
```bash 
npm install -S vue-sweetalert2
```

Khai báo plugins:
```javascript
import VueSweetalert2 from 'vue-sweetalert2';
 
Vue.use(VueSweetalert2);
```
Sử dụng đơn giản như sau:
```javascript
this.$swal('Hello', 'Hello brave new world!', 'success');
```
![](https://images.viblo.asia/a6b76382-acb7-44d1-86c2-e13658f951dc.png)
hoặc 1 popup confirm delete như sau:
```javascript
this.$swal({
    text: 'Bạn có chắc chắn muốn xóa?',
    type: 'warning',
    confirmButtonText: 'Xóa',
    showCancelButton: true,
    cancelButtonText: 'Hủy'
});
```
![](https://images.viblo.asia/780a24d4-8be3-4279-bfa9-04a6891fac18.png)


Như vậy mình vừa giới thiệu một số thư viện quen thuộc mà mình hay sử dụng trong hầu hết các dự án. Cảm ơn các bạn đã theo dõi bài viết. Hẹn gặp lại :D