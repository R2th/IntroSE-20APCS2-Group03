## 1. Mở đầu

<hr>

Gần đây do yêu cầu công việc nên mình có cơ hội được thử sức với `VueJS`. Theo mình thấy thì nếu bạn đã từng làm việc với `ReactJS` rồi thì khi chuyển qua code `VueJS` thì mọi thứ khá là giống nhau ở nhiều điểm nên bạn hoàn toàn có thể học và code được cả hai mà không quá vất vả giống như việc học lại một cái gì đó mới hoàn toàn. Trong quá trình tìm hiểu thì mình có tự ghi chú lại một số phần note về kiến thức cơ bản với `VueJS` và hôm nay mình xin chia sẻ lại với mọi người.

## 2. VueJS

<hr>

### 2.1. Cấu trúc file
- Một file VueJS thông thường sẽ có đuôi là `.vue` và có định dạng như sau:
```html
<template>
    // Phần code cho UI của bạn
</template>

<script>
    import SomeThing from 'some-where';

    export default {
        // Phần code cho script của bạn
    }
</script>

<style>
    // Phần code style cho giao diện của bạn
</style>
```

### 2.2. Data
- Trong phần script của VueJS sẽ chứa một object được sử dụng làm data để render trong template:
```html
<template>
    <div class="app">
        <p>Hour: {{ hour }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hour: new Date().getHours()
            }
        }
    }
</script>
```
- Như ở trên chúng ta có thể in được giữ liệu có chứa trong **data** từ phần script sang phần template. Đây cũng chính là cách để VueJS hiển thị dữ liệu nhận được lên màn hình.
- **data** trong VueJS có thể là bất cứ kiểu dữ liệu nào bạn mong muốn như `string`, `number`, `object`, `array`, ... đồng thời cách truy cập thuộc tính của `object` hay các phần tử trong mảng ở template sẽ tương tự như trong javascript thông thường:
```html
<template>
    <div id="app">
        <p>The second dog is {{ dogs[1] }}</p>
        <p>All the dogs are {{ dogs }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dogs: ['Rex', 'Rover', 'Henrietta', 'Alan']
            }
        }
    }
</script>
```

### 2.3. Directives
- VueJS sử dụng các thuộc tính đặc biệt được gọi là **directives** để "điều khiển" giao diện dựa trên phần dữ liệu trong script.
<br>

#### a. v-if và v-show
- Đây là hai **directive** cơ bản của VueJS có chức năng giống như lệnh `if` trong javascript thông thường. Nó dùng để ẩn hiện phần UI dựa trên điều kiện nào đó:
```html
<template>
    <div v-if="true">one</div>
    <div v-if="false">two</div>
</template>

Kết quả:
    <div>one</div>
```
- Tuy nhiên **v-if** và **v-show** có điểm khác nhau cơ bản là với **v-if** thì nội dung sẽ hoàn toàn không được sinh ra thành HTML còn ngược lại với **v-show** thì nội dung sẽ được sinh ra và gắn và DOM nhưng được ẩn đi bằng thuộc tính CSS:
```html
<template>
    <div v-show="true">one</div>
    <div v-show="false">two</div>
</template>

Kết quả:
    <div>one</div>
    <div style="display: none">one</div>
```
*Lưu ý: khi sử dụng v-show với điều kiện là dữ liệu từ object data mà object đó không tồn tại có thể dẫn đến lỗi vì VueJS vẫn cố render ra nó vào DOM*
- Tất nhiên ngoài **v-if** ta cũng có các lệnh **v-else** hay **v-else-if**:
```html
<template>
    <div v-if="state === 'loading'">Loading…</div>
    <div v-else-if="state === 'error'">An error occurred</div>
    <div v-else>…our content!</div>
</template>

<script>
    export default {
        data() {
            return {
                state: 'loading'
            }
        }
    }
</script>
```
<br>

#### b. v-for
- Để thực hiện việc looping qua mảng trong VueJS ta sẽ sử dụng **v-for**:
```html
<template>
    <div id="app">
        <ul>
            <li v-for="dog in dogs">{{ dog }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dogs: ['Rex', 'Rover', 'Henrietta', 'Alan']
            }
        }
    }
</script>

Kết quả:
    <div id="app">
        <ul>
            <li>Rex</li>
            <li>Rover</li>
            <li>Henrietta</li>
            <li>Alan</li>
        </ul>
    </div>
```
- Không chỉ sử dụng cho mảng mà **v-for** còn có thể được dùng để loop qua thuộc tính và giá trị của một object:
```html
<template>
    <div id="app">
        <ul>
            <li v-for="(rent, city) in averageRent">
                The average rent in {{ city }} is ${{ rent }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                averageRent: {
                    london: 1650,
                    paris: 1730,
                    NYC: 3680
                }
            }
        }
    }
</script>
```
*Lưu ý: trong trường hợp trên với v-for sẽ lấy lần lượt là (value, key) hay chính xác là (giá trị, tên thuộc tính) = (rent, city). Nếu muốn lấy chỉ sổ mảng ta cũng dùng thứ tự tương tự là (value, index)*
- Trong trường hợp muốn loop theo dạng số  **for (i = 0; i< 10; i++)** ta có thể sử dụng **v-for** như sau:
```html
<template>
    <div id="app">
        <ul>
            <li v-for="n in 10">{{ n }}</li>
        </ul>
    </div>
</template>

Kết quả:
    <li>0</li>
    <li>1</li>
    ...
    <li>8</li>
    <li>9</li>
```
<br>

#### c. v-bind
- **v-bind** được sử dụng để gán dữ liệu trong **data** vào các thuộc tính của thẻ HTML trong `template` theo cú pháp **v-bind:[atrribute]="[value]":**
```html
<template>
    <div id="app">
        <button v-bind:type="buttonType">Test button</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                buttonType: 'submit'
            }
        }
    }
</script>

Kết quả:
    <button type="submit">Test button</button>
```
- Ngoài cách viết như trên ta cũng có thể (nên) sử dụng cú pháp ngắn gọn như là bỏ bớt chữ **v-bind** và thay bằng kí tự **":"** như sau **:[attribute]="[value]"**:
```html
<template>
    <div id="app">
        <button :type="buttonType">Test button</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                buttonType: 'submit'
            }
        }
    }
</script>

Kết quả:
   <button type="submit">Test button</button>
```
<br>

#### d. v-html
- Thông thường với tất cả các giữ liệu ta render ra UI bằng cặp ngoặc nhọn sẽ tự động được escape để tránh dạng tấn công XSS:
```html
<template>
    <div id="app">
        <p>{{ someString }}</p>
    </div>
</template>
```
- Tuy nhiên trong một số  trường hợp bạn muốn in ra nội dung HTML thì sẽ sử dụng **v-html** như sau:
```html
<template>
    <div id="app">
        <p v-html="someString"></p>
    </div>
</template>
```

### 2.4. Reactivity
- Đối với tất cả các phần trong UI mà chúng ta ta hiển thị có liên quan đến **data** sẽ được tự động render lại phần nội đó nếu **data** tương ứng với phần UI đó thay đổi.

### 2.5. Two-way data binding
- Trong tất cả các ví dụ nói trên của phần `directives`, UI của chúng ta chỉ được render lại nếu như **data** thay đổi còn điều ngược lại thì không. Ví dụ:
```html
<template>
    <div id="app">
        <input type="text" :value="inputText">
        <p>inputText: {{ inputText }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                inputText: 'initial value'
            }
        }
    }
</script>
```
- Với ví dụ trên khi ta gõ thay đổi nội dung trong thẻ `<input>` thì phần hiển thị `inputText` ở dưới không thay đổi hay nói các khác là **data** sẽ không hề thay đổi. Tuy nhiên nếu thay vì sử dụng **v-bind** ta sẽ sử dụng **v-model** như sau để đạt được `two-way data binding`:
```html
<template>
    <div id="app">
        <input type="text" v-model="inputText">
        <p>inputText: {{ inputText }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                inputText: 'initial value'
            }
        }
    }
</script>
```
- Sử dụng **v-model** với `check-box`:
```html
<template>
    <div id="app">
        <label><input type="radio" v-model="value" value="one"> One</label>
        <label><input type="radio" v-model="value" value="two"> Two</label>
        <label><input type="radio" v-model="value" value="three"> Three</label>
        <p>The value is {{ value }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 'one'
            }
        }
    }
</script>
```
<br>

### 2.6. Methods
- Trong mỗi file `.vue` ta có thể định nghĩa các hàm thực hiện một chức năng bất kì để có thể sử dụng lại nó khi cần. Các hàm này có thể được gọi cả trong phần script lẫn phần template:
```html
<template>
    <div id="app">
        <p>Current status: {{ statusFromId(status) }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: 2
            }
        },
        methods: {
            statusFromId(id) {
                const status = ({
                    0: 'Asleep',
                    1: 'Eating',
                    2: 'Learning Vue'
                })[id];

                return status || 'Unknown status: ' + id;
            }
        }
    }
</script>
```
- Method còn có thể được sử dụng đi kèm với các **directives**, đoạn code sau đâu sử dụng 1 methods có chức năng lọc ra các số dương và kết quả của hàm này sẽ được sử dụng trong **v-for**:
```html
<template>
    <div id="app">
        <li v-for="number in filterPositive(numbers)">{{ number }}</li>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                numbers: [-5, 0, 2, -1, 1, 0.5]
            }
        },
        methods: {
            filterPositive(numbers) {
                return numbers.filter(number => number >= 0);
            }
        }
    }
</script>
```
<br>

### 2.7. this
- Giống như trong lập trình hướng đối tượng, từ khóa **this** được dùng để chỉ đến chính component của chính nó. Ta có thể dùng từ khóa **this** để truy cập đến **data** và cả **methods** của component đó ở trong chính nó như sau:
```html
<template>
    <div id="app">
        <p>The sum of the positive numbers is {{ getPositiveNumbersSum() }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                numbers: [-5, 0, 2, -1, 1, 0.5]
            }
        },
        methods: {
            getPositiveNumbers() {
                return this.numbers.filter(number => number >= 0);
            },
            getPositiveNumbersSum() {
                return this.getPositiveNumbers().reduce((sum, val) => sum + val);
            }
        }
    }
</script>
```
- Trong đoạn code ở trên, ta sử dụng từ khóa **this** để truy cập vào **number** trong **data** trong hàm `getPositiveNumbers()`. Tiếp đó ta tiếp tục sử dụng hàm `getPositiveNumbers()` thông qua từ khóa **this** ở hàm `getPositiveNumbersSum()`. Nói chung cách sử dụng giống hệt như trong lập trình hướng đối tượng thông thường.
<br>

### 2.8. Computed Properties
- **Computed Properties** có thể hiểu là nó khai báo giống như 1 **methods** nhưng lại được truy cập giống như cách chúng ta truy cập **data** của component:
```html
<template>
    <div id="app">
        <p>Sum of numbers: {{ numberTotal }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                numbers: [5, 8, 3]
            }
        },
        computed: {
            numberTotal() {
                return this.numbers.reduce((sum, val) => sum + val);
            }
        }
    }
</script>
```
- Trong ví dụ trên ta khai báo một **computed property** là `numberTotal()`. Cách khai báo ở đây giống như khai báo một methods tuy nhiên khi sử dụng nó trong template thì ta sẽ gọi giống như gọi dữ liệu trong **data**. Tuy nhiên ta cũng có thể làm điểu tưowng tự nếu khai báo `numberTotal()` là một methods như các thông thường. Nhưng với **computed property** ta sẽ nhận được thêm một ưu điểm đó là cached như sau:
    - Đối với **computed property** thì nội dung trong hàm đó sẽ chỉ chạy duy nhất một lần và kết quả đó được cached lại. Nếu bất cứ chỗ nào khác trong component của bạn gọi đến nó thì sẽ chỉ trả lại kết quả là giá trị đã được cached.
    - Nếu dữ liệu mà nó phụ thuộc vào bị thay đổi thì cũng tương tự nó chỉ chạy nội dung hàm 1 lần và cached lại kết quả cho các lần gọi sau.
    - Với methods thì với mỗi chỗ mà chúng ta gọi thì nội dung trong nó sẽ được chạy lại hoàn toàn mà không được cached.
- Với **computed property** ta nên sử dụng cho các phép lọc hoặc tính toán dữ liệu phức tạp vì cho phép cached lại đồng thời nếu bạn đang dùng **v-for** kết hợp với **v-if** thì cũng có thể thay toàn bộ nó bằng **computed property**.
- Thêm một điểm nữa cần chú ý đó là **computed property** không nhận tham số truyền vào.<br/>
- Sử dụng **data**, **method** và **computed properties**:
    - Sử dụng **data** với giữ liệu gốc (pure data).
    - Sử dụng **method** nếu muốn truyền tham số đầu vào hoặc gán các sự kiện trong template.
    - Sử dụng **computed properties** tạo ra dữ liệu mới từ giữ liệu gốc
- **Computed properties** thông thường là pure-function (chỉ trả về giữ liệu chứ không được thay đổi chúng hay gây ra side-effect). Xét ví dụ sau:
```html
<template>
    <div id="app">
        <p>{{ firstName }}</p>
        <p>{{ lastName }}</p>
        <p>{{ fullName }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                firstName: 'Foo',
                lastName: 'Bar',
            }
        },
        computed: {
            fullName() {
                return `${this.firstName} ${this.lastName}`;
            }}
        }
    }
</script>
```
- Với ví dụ trên khi ta thay đổi giải trị của **computed property** là `fullName` là một pure-function cho nên nó sẽ không làm thay đổi giá trị của `firstName` và `lastName`.
- Trong trường hợp muốn thêm chức năng cho phép thay đổi giá trị trong **data** thì sẽ phải chuyển nó về dạng object với `getter` và `setter` như sau (lưu ý không được gây ra side-effect trong **computed property**):
```html
<template>
    <div id="app">
        <p>{{ firstName }}</p>
        <p>{{ lastName }}</p>
        <p>{{ fullName }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                firstName: 'Foo',
                lastName: 'Bar',
            }
        },
        computed: {
            fullName: {
                get() {
                    return this.firstName + ' ' + this.lastName;
                },
                set(newValue) {
                    const names = newValue.split(' ');
                    this.firstName = names[0];
                    this.lastName = names[names.length - 1];
                }
            }
        }
    }
</script>
```
- Lúc này nếu ta gán giá trị mới cho `fullName` thì `firstName` và `lastName` cũng được cập nhật.
<br>

### 2.9. Watchers
- **watchers** cho phép chúng ta theo dõi sự thay đổi thuộc tính trong **data** hoặc trong **computed property**.
```html
<script>
    export default {
        data() {
            return {
                count: 0,
            }
        },
        watch: {
            count(newValue, oldValue) {
                console.log('Count change');
            }
        }
    }
</script>
```
- Với ví dụ trên mỗi khi `count` thay đổi thì **watcher** của `count` sẽ được gọi và làm gì đó. **wathcher** sẽ nhận vào 2 tham số là giá trị mới và giá trị cũ tương ứng.
- Trong trường hợp chúng ta muốn watch một property của 1 object trong **data** thì ta có thể làm như sau:
```html
<script>
    export default {
        data() {
            return {
                formData: {
                    username: ''
                }
            }
        },
        watch: {
            'formData.username'(newValue, oldValue) {
                console.log(newValue);
                console.log(oldValue);
            }
        }
    }
</script>
```
- Khi chúng ta thực hiện **watch 1 object** như trong ví dụ trên, nếu ta chỉ thực hiện như sau:
```html
<script>
    export default {
        data() {
            return {
                formData: {
                    username: ''
                }
            }
        },
        watch: {
            formData(newValue, oldValue) {
                //
            }
        }
    }
</script>
```
- Trong trường hợp `username` của `formData` bị thay đổi thì **watcher** sẽ không hoạt động. Để hoạt động được thì ta sẽ cần phải sửa lại code như sau:
```html
<script>
    export default {
        data() {
            return {
                formData: {
                    username: ''
                }
            }
        },
        watch: {
            formData: {
                handler(newValue, oldValue) {
                    console.log(newValue, oldValue);
                },
                deep: true
            }
        }
    }
</script>
```
- **Watchers** và **Computed properties** hoạt động khá giống nhau tuy nhiên ta cần phân chia rõ cách sử dụng như sau:
    - **Computed properties**: để tạo ra duex liệu mới từ giữ liệu có sẵn, không gây ra side-effect.
    - **Watchers**: Có thể gây ra side-effect như gọi API, thao tác với DOM, sử dụng browser API như localStorage hay audio playback.

### 2.10. Filters
- **Filters** đóng vai trò giống một bộ fommater cho string hoặc số. Đoạn code dưới đây mô ta việc dùng **filters** để biến chữ cái đầu tiên của string thành chữ hoa.
```html
<template>
    <div id="app">
        <p :data-alt="name | capitalize">{{ name | capitalize }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'foo',
            }
        },
        filters: {
            capitalize(value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }}
        }
    }
</script>
Kết quả:
    <p data-alt="Foo">Foo</p>
```
- Ở ví dụ trên ta thấy có thể sử dụn **Filters** bằng cách thêm nó vào sau kí tự `"|"` như trên. **Filters** có thể dùng với cả **v-bind**.
- **Filters** mặc định sẽ nhận tham số đầu vào là giá trị ngay trước nó. Trong trường hợp muốn truyền thêm tham số khác ta có thể thêm nó vào như sau:
```html
<template>
    <div id="app">
        <p :data-alt="name | capitalize('!')">{{ name | capitalize('!') }}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'foo',
            }
        },
        filters: {
            capitalize(value, char) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1) + char;
            }}
        }
    }
</script>

Kết quả:
    <p data-alt="Foo!">Foo!</p>
```
- Với trường hợp muốn dùng nhiều **Filters** trên cùng một giá trị, ta có thể viết như sau:
```html
<template>
    <div id="app">
        <p>{{ someStr | filterA | filterB | filterC }}</p>
    </div>
</template>
```
- Cách viết trên `someStr` sẽ được truyền lần lượt qua `filterA`. Kết quả thu được tiếp tục đi qua `filterB` rồi lại lặp lại cho đến hết.
- Có 3 điều cần chú ý khi sử dụng **filters** đó là:
    - Không thể sử dụng từ khóa **this** trong **filters**.
    - **Filters** chỉ hoạt động được với **v-bind**.
    - Thông thường các **Filters** sẽ được khai báo chung trong 1 file là **filters.js** và import vào các component khi cần.
- **Filters** khác với **Methods** ở chỗ  nó thường chỉ được dùng để format lại nội dung như text, number, dates và sẽ được tái sử dụng trong toàn ứng dụng trong khi **Methods** thông thường sẽ có scope là local với component đó.

## 3. Kết bài 
<hr>

Phần một của bài viết tìm hiểu về `VueJS` cơ bản của mình đến đây là kết thúc, các ơn các bạn đã đọc bài và hẹn gặp lại các bạn ở part 2. Đừng quên để lại 1 upvote ủng hộ cho mình nhé.