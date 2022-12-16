# Giới thiệu
Chào mọi người, một tháng lại trôi đi như một cơn gió và mình lại trở lại :D.

Đối với lập trình web thì thẻ `Select` là một trong những thẻ vô cùng quen thuộc. Tuy nhiên thẻ `Select` thuần túy của `Html` đôi khi không đáp ứng được cho ứng dụng của bạn, vì vậy bạn cần custom lại thẻ select để nó đẹp hơn, phù hợp hơn với ứng dụng đó. Tuy nhiên, trong các ứng dụng lớn, có thời gian thực thi ngắn thì việc custom bằng tay như vậy lại tốn kha khá thời gian của các lập trình viên. Chính vì vậy, các thư viện hỗ trợ việc custom thẻ select đã ra đời, như `Select.js` `Select2.js`,... hỗ trợ tối đa cho các lập trình viên.

Trong `VueJs 2.0` cũng vậy, bạn có thể sử dụng các thư viện kể trên. Tuy nhiên có một package  dành riêng cho `VueJs` để sử dụng các SelectBox một cách dễ dàng, tiện lợi, đa dạng hơn, đó là `vue-multiselect`. Trong bày viết này chúng ta cùng tìm hiểu nó nhé.
# Các tính năng
Những tính năng, ưu điểm của `vue-multiselect`:

* Không phụ thuộc vào `jQuery`.
* Có cả Single select và Multiple select.
* Có Tagging, Dropdowns và Filtering.
* Hỗ trợ chức năng tìm kiếm với các gợi ý.
* Có các components cơ bản, và hỗ trợ việc custom lại các components đó.
* Hỗ trợ `v-model`.
* Hỗ trợ `Vuex`.
* Có hỗ trợ cơ chế bất đồng bộ.
* ...
# Cài đặt
### Npm
Bạn cần copy và paste lệnh sau vào terminal để cài đặt `vue-multiselect`:
```
npm install vue-multiselect
```
### CDN
```
<script src="https://unpkg.com/vue-multiselect@2.1.0"></script>
<link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">
```
# Sử dụng
Sau khi cài đặt `vue-multiselect`, bạn chỉ cần import nó vào `component` mà bạn muốn sử dụng.
### Single select / dropdown
```
<template>
    <div id="app">
        <div class="col-lg-5">
            <multiselect
                v-model="selected"
                :options="options"
                :searchable="false"
                :close-on-select="false"
                :allow-empty="false"
                placeholder="Select one"
                label="name"
                track-by="name">
            </multiselect>
        </div>
        <br/><br/>
        <div class="col-lg-12">
            Data Selected: {{ selected }}
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'app',
    data () {
        return {
            selected: null,
            options: [
                { name: 'Vue.js', language: 'JavaScript' },
                { name: 'Rails', language: 'Ruby' },
                { name: 'Sinatra', language: 'Ruby' },
                { name: 'Laravel', language: 'PHP', $isDisabled: true }
            ]
        }
    },
    components: {
        Multiselect
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
```
Đây là đoạn code sử dụng `Single select / dropdown` trong một `component`. Trong đó, mình đã sử dụng các thuộc tính là: 

*    `options`: Đây sẽ là dữ liệu chính của `multiselect` (là một mảng thường hoặc mảng object). Trường hợp là mảng object, bạn có thể disable không cho người dùng chọn một giá trị nào đó trong mảng bằng việc sử dụng key `$isDisabled: true` như ở trên.
*    `searchable`: bật/tắt chức năng tìm kiếm, mặc định là true (bật).
*    `close-on-select`: bật/tắt chức năng đóng dropdown sau khi đã chọn một phần tử trong menu dropdown, mặc định là true (bật).
*    `allow-empty`: có cho phép input rỗng hay không, nếu có thì bạn có thể chọn và xóa phần tử đã chọn, ngược lại thì bạn không thể xóa phần tử đã chọn. Giá trị mặc định của thuộc tính này là true.
*    `label`: nếu `options` là một mảng object thì bạn cần chỉ định trường sẽ hiển thị trên menu dropdown, nếu `options` chỉ là một mảng bình thường thì thuộc tính này không cần thiết.
*    `track-by`: nếu `options` là một mảng object, ngoài việc chỉ định thuộc tính `label` ở trên bạn cần chỉ định thuộc tính `track-by` này với trường có giá trị duy nhất của phần tử (trong mảng) để nhằm xác định phần tử đó. Ở ví dụ này, trường `name` có giá trị duy nhất nên được dùng cho thuộc tính này.

Một lưu ý nhỏ là bạn cần nhúng file `vue-multiselect.min.css` vào ứng dụng hoặc thông qua thuộc tính src của thẻ `<style>` trong `component`. 

**Demo:**
{@embed: https://jsfiddle.net/pxysjtun/}
### Single select with search
Như mình đã nói ở trên thì mặc định `multiselect` sẽ bật chức năng tim kiếm (`:searchable="true"`).
```
<template>
    <div id="app">
        <div class="col-lg-5">
            <multiselect
                v-model="selected"
                :options="options"
                placeholder="Search and select one"
                label="name"
                track-by="name">
            </multiselect>
        </div>
        <br/><br/>
        <div class="col-lg-12">
            Data Selected: {{ selected }}
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'app',
    data () {
        return {
            selected: null,
            options: [
                { name: 'Vue.js', language: 'JavaScript' },
                { name: 'Rails', language: 'Ruby' },
                { name: 'Sinatra', language: 'Ruby' },
                { name: 'Laravel', language: 'PHP', $isDisabled: true }
            ]
        }
    },
    components: {
        Multiselect
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
```

**Demo:**
{@embed: https://jsfiddle.net/8126j7du/}
### Multiple select with search
Để có thể chọn multiple nhiều phần tử với `multiselect`, bạn chỉ cần thêm thuộc tính `:multiple="true"`.
```
<template>
    <div id="app">
        <div class="col-lg-5">
            <multiselect
                v-model="selected"
                :options="options"
                :multiple="true"
                placeholder="Search and select multiple"
                label="name"
                track-by="name">
            </multiselect>
        </div>
        <br/><br/>
        <div class="col-lg-12">
            Data Selected: {{ selected }}
        </div>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'app',
    data () {
        return {
            selected: null,
            options: [
                { name: 'Vue.js', language: 'JavaScript' },
                { name: 'Rails', language: 'Ruby' },
                { name: 'Sinatra', language: 'Ruby' },
                { name: 'Laravel', language: 'PHP', $isDisabled: true }
            ]
        }
    },
    components: {
        Multiselect
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
```

**Demo:**
{@embed: https://jsfiddle.net/5xkwfj0a/}
### Tagging
Bạn có thể sử dụng chức năng `tag-input` tương tự như là `bootstrap-taginput` bằng việc sử dụng thuộc tính `:taggable="true"` và sự kiện `@tag`.
```
<template>
    <div id="app">
        <div class="col-lg-5">
            <multiselect
                v-model="taggingSelected"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                label="name"
                track-by="code"
                :options="taggingOptions"
                :multiple="true"
                :taggable="true"
                @tag="addTag">
            </multiselect>
        </div>
        <br/><br/>
        <div class="col-lg-12">
            Tag Selected: {{ taggingSelected }}
        </div>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'app',
    data () {
        return {
            taggingSelected: [],
            taggingOptions: [
                { name: "Rock", code: "ro" },
                { name: "Pop", code: "po" },
                { name: "R&B", code: "rb" },
                { name: "Dance", code: "da" }
            ]
        }
    },
    components: {
        Multiselect
    },
    methods: {
        addTag (newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }

            this.taggingOptions.push(tag)
            this.taggingSelected.push(tag)
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
```

**Demo:**
{@embed: https://jsfiddle.net/hx2r9o7f/}
### Asynchronous dropdown
Bạn còn có thể sử dụng cơ chế bất đồng bộ cho `multiselect`:
```
<template>
    <div id="app">
        <div class="col-lg-5">
            <multiselect
                v-model="selectedCountries"
                :options="countries"
                :multiple="multiple"
                :searchable="searchable"
                @search-change="asyncFind"
                placeholder="Type to search countries"
                label="name"
                track-by="code">
            </multiselect>
        </div>
        <br/><br/>
        <div class="col-lg-12">
            Data Selected: {{ selectedCountries }}
        </div>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'app',
    data () {
        return {
            selectedCountries: [],
            countries: []
        }
    },
    components: {
        Multiselect
    },
    methods: {
        asyncFind (newTag) {
            this.countries = []; // get data from server
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
```
### Custom option template
Ngoài ra bạn còn có thể custom lại template của `multiselect`:
```
<template>
    <div id="app">
        <div class="col-lg-5">
            <multiselect
                v-model="selected"
                placeholder="Select one"
                label="title" track-by="title"
                :options="options"
                :option-height="104"
                :custom-label="customLabel"
                :show-labels="false">
                <template slot="singleLabel" slot-scope="props">
                    <img class="option__image"
                        :src="props.option.img" alt="No Man’s Sky">
                    <span class="option__desc">
                        <span class="option__title">
                            {{ props.option.title }}
                        </span>
                    </span>
                </template>
                <template slot="option" slot-scope="props">
                    <img class="option__image" :src="props.option.img"
                        alt="No Man’s Sky">
                    <div class="option__desc">
                        <span class="option__title">
                            {{ props.option.title }}
                        </span>
                        <span class="option__small">
                            {{ props.option.desc }}
                        </span>
                    </div>
                </template>
            </multiselect>
        </div>
        <br/><br/>
        <div class="col-lg-12">
            Data Selected: {{ selected }}
        </div>
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
    name: 'app',
    data () {
        return {
            selected: null,
            options: [
                {
                    title: 'Space Pirate',
                    desc: 'More space battles!',
                    img: 'https://pbs.twimg.com/media/C6b5SETWcAEQJkV.jpg'
                },
                {
                    title: 'Merchant',
                    desc: 'PROFIT!',
                    img: 'https://i.pinimg.com/originals/3c/7a/fc/3c7afc1b68c0f8cc367dd9d0f1f383de.jpg'
                },
                {
                    title: 'Explorer',
                    desc: 'Discovering new species!',
                    img: 'https://3.bp.blogspot.com/-2wmDrFmRJm4/WU4XZg6H-6I/AAAAAAAAEjI/df216RIbW7YsmeFuN1t-Uwd7eF22_9VqgCLcBGAs/s1600/tut-shinkaifoto.jpg'
                },
                {
                    title: 'Miner',
                    desc: 'We need to go deeper!',
                    img: 'http://orig15.deviantart.net/3c10/f/2013/307/3/8/outdoor_hallway_by_mclelun-d6suhm2.jpg'
                }
            ]
        }
    },
    components: {
        Multiselect
    },
    methods: {
        customLabel ({ title, desc }) {
            return `${title} – ${desc}`
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style type="text/css">
    img {
        width: 100px;
    }

    .option__desc {
        width: 75%;
        float: right;
        display: flex;
        flex-direction: column;
        margin: 10px 0 0 10px;
    }
</style>
```
**Demo:**
{@embed: https://jsfiddle.net/qwxuempz/}

# Kết luận
Qua bài viết mình đã giới thiệu cho các bạn `vue-mutiselect`, đây một package đơn giản nhưng cực kì hữu dụng để xử lý các SelectBox một cách dễ dàng, đa dạng trong `VueJs`. Hi vọng bài viết này sẽ có ích cho các bạn, nhất là những bạn mới tìm hiểu về `VueJs` như mình :D
# Tham khảo
https://github.com/shentao/vue-multiselect

https://vue-multiselect.js.org/