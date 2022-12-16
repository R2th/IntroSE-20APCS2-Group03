## 1. Mở đầu
<hr>

Ở phần trước của bài viết, chúng ta đã cùng nhau tìm hiểu xem mixin là gì, nó giúp chúng ta giải quyết điều gì cũng như cách sử dụng nó trong project của chúng ta. Trong bài viết ngày hôm nay, mình sẽ chia sẽ tiếp tục chia sẻ đến các bạn những điều khác mà bạn cần biết về mixin để bạn có thể sử dụng nó trong project của mình hiệu quả hơn. Nào chúng ta cùng bắt đầu.

## 2. Merging mixin
<hr>

Nếu bạn còn nhớ ở phần trước của bài viết, mình đã để cập đến việc chúng ta có thể sử dụng nhiều hơn một mixin trong cùng một component:

```js
import mixin1 from './mixin1.js';
import mixin2 from './mixin2.js';

export default {
    mixins: [mixin1, mixin2],
}
```

Việc này khá tiện trong trường hợp ta muốn gom nhóm các function thành một feature và bỏ vào trong một cái mixin hoặc đơn giản hơn là để làm gọn lại nội dung component của bạn. Đồng thời ở bài viết trước mình cũng đã nhắc đến những nội dung mà bạn có thể viết trong mixin như các life cycle hay các thành phần khác như dât, methods, ...:

```mixin.js
export default {
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    activated() {},
    deactivated() {},
    beforeUnmount() {},
    unmounted() {},
    errorCaptured() {},
    renderTracked() {},
    renderTriggered() {},

    props: {},
    data() {
        return {}
    },
    computed: {},
    filters: {},
    watch: {},
    methods: {},
}
```

Tuy nhiên bạn đã tự hỏi mình rằng nếu trường hợp ở cả 2 mixin bạn đều sử dụng chung một life cycle hook và có logic riêng với nhau hay nội dung chúng ta return trong phần data bị trùng nhau hoặc có methods bị trùng nhau thì điều gì sẽ xảy ra không? Câu trả lời là VueJS sẽ tự động thực hiện một trong hai option đó là merge đối với các phần code bị trùng đó. Ta xét ví dụ như sau:

- Ta sẽ có hai `mixin1` và `mixin2` lần lượt với nội dung như sau

```mixin1.js
export default {
    data() {
        return {
            title: 'Mixin 1 title',
            isMixin1: true,
            duplicateMixin: 'Mixin 1',
        }
    },

    mounted() {
        console.log('Mixin 1 mounted');
    },

    methods: {
        duplicate() {
            console.log('Mixin 1')
        },
        mixinDuplicate() {
            console.log('Mixin 1 function');
        },
        unique() {
            console.log('Unique');
        }
    }
}
```

```mixin2.js
export default {
    data() {
        return {
            title: 'Mixin 2 title',
            isMixin2: true,
            duplicateMixin: 'Mixin 2',
        }
    },

    mounted() {
        console.log('Mixin 2 mounted');
    },

    methods: {
        duplicate() {
            console.log('Mixin 2')
        },
        mixinDuplicate() {
            console.log('Mixin 2 function');
        },
    }
}
```

- Sau đấy ta có một `component A` sử dụng đến hai `mixin1` và `mixin2` như sau:
```js
// Component A
<template>
    // Some UI
</template>

<script>
    import 'mixin1' from './mixin1.js';
    import 'mixin2' from './mixin2.js';
    
    export default {
        name: 'ComponentA',
        mixins: [mixin1, mixin2],
        
        data() {
            return {
                title: 'Self title',
                isSelf: true,
            }
        },
        
        mounted() {
            console.log('Self mounted');
        },
        
        methods: {
            duplicate() {
                console.log('Self')
            }
        }
    }
<script>
```

Ở đây ta có thể thấy hai mixin của chúng ta và component A đều có các phần là `data()`, `mounted()` và phần `methods`. Đầu tiên chúng ta sẽ xét hàm các hàm `mounted()`.

```mixin1.js
data() {
mounted() {
    console.log('Mixin 1 mounted');
},
```
```mixin2.js
mounted() {
    console.log('Mixin 2 mounted');
},
```
```js
// ComponentA.vue
mixins: [mixin1, mixin2],
 
mounted() {
    console.log('Self mounted');
},
```

Như chúng ta đã biết thì `mounted()`  mà một lifecycle hook của component vì thế những điều mình sắp nói tiếp theo sẽ áp dụng cho toàn bộ các lifecycle hook khác của component. Riêng với phần này, ở bên tron phần xử lý của VueJS sẽ tiến hành gồm các hook này thành một mảng rồi sau đó sẽ chạy lần lượt từng hàm một với độ ưu tiên là hook của component sẽ được chạy cuối cùng. Như vậy ở ví dụ nói trên, thứ tư sử dụng mixin của chúng ta đang là `mixins: [mixin1, mixin2]`. Chính vì thế ouput của chúng ta thu được khi chạy code lên sẽ là:
```bash
Mixin 1 mounted
Mixin 2 mounted
Self mounted
```
Tương ứng với việc chạy hàm `mounted()` của mixin1 trước, sau đó đến mixin2 và cuối cùng mới là hàm `mounted()` của chính component đó (mixin1 > mixin2> componentA). Rất dễ hiểu phải không nào.

*Lưu ý việc merge theo phương pháp nói trên sẽ áp dụng cho toàn bộ các lifecycle hook khác nếu có và bị trùng, trường hượp nếu không bị trùng thì VueJS tất nhiên sẽ chạy như bình thường mà thôi.*

Tiếp đến là phần còn lại bao gồm tất tần tất từ `data(), methods, computeds, ...` trong một component mà bị trùng cũng sẽ được merge vào theo thứ tự như sau,  với ví dụ về `data()`  nói trên:

```mixin1.js
data() {
    return {
        title: 'Mixin 1 title',
        isMixin1: true,
        duplicateMixin: 'Mixin 1',
    }
},
```
```mixin2.js
data() {
    return {
        title: 'Mixin 2 title',
        isMixin2: true,
        duplicateMixin: 'Mixin 2',
    }
},
```
```js
// ComponentA.vue
mixins: [mixin1, mixin2],
 
data() {
    return {
        title: 'Self title',
        isSelf: true,
    }
},
```

Với phần này thì nội dung `data()` cuối cùng của các bạn khi chạy lên sẽ có dạng:

```js
{
    title: "Self title",
    isSelf: true,
    isMixin2: true,
    duplicateMixin: "Mixin 2",
    isMixin1: true,
}
```

Tại đây, nội dung trong phần `data()` của componentA, mixin1, mixin2 sẽ được gộp (merge) vào với nhau. Khác với phần lifecycle hook là các hook trùng nhau được gộp thành một mảng và chạy lần lượt thì ở đây sẽ diễn ra sự ghi đè đối với các nội dung trùng nhau. Cụ thể:
- Phần `title` xuất hiện trong cả componentA, mixin1 và mixin2 nhưng sau khi được gộp thì chỉ còn một biến title duy nhất và đó là nội dung của componentA. Từ đó ta thấy nội dung ở đây đã được ghi đè và được ưu tiên nhất là nội dung nằm bên trong component.
- Tiếp đó ta có biến `duplicateMixin` đều xuất hiện trong mixin1 và mixin2  và giống như mình vừa nói ở trên khi phần này được gộp vào sẽ diễn ra sự ghi đè và nội dung được ưu tiên ở đây sẽ là mixin nằm ở cuối của mảng mixin mà bạn sử dụng  `mixins: [mixin1, mixin2]` đó chisnhg là mixin2.
- Cuối cùng ta có các biến như `isSelf`, `isMixin1`, `isMixin2` là ba biến không trùng tên nhau nên nó sẽ được giữ nguyên vào gộp vào `data()`. 

Như vậy với các trường hợp không phải lifecycle hook thì thứ tự ưu tiên sẽ lần lượt component sau đó đến các mixin từ cuối mảng các mixin mà bạn sử dụng (hay có thể nói là ưu tiên từ phải qua trái trong mảng mixin). Áp dụng những kiến thức mình vừa trình bày ở trên thì ở phần methods sau khi merge sẽ có nội dung như sau:

```js
methods: {
    duplicate() {
        console.log('Self')
    },
    mixinDuplicate() {
        console.log('Mixin 2 function');
    },
     unique() {
        console.log('Unique');
    }
}
```

Với lần lượt là:
- `dulicate()` xuất hiện ở cả componentA và mixin1, mixin2 nên hàm `duplicate()` ở trong componentA sẽ ghi đè của 2 mixin.
- `mixinDuplicate()` xuất hiện ở cả hai mixin1 và mixin2 nên nội dung hàm này sẽ được ghi đè bởi nội dung của mixin2 (nằm phía bên phải của mảng).
- `unique()` xuất hiện duy nhất ở mixin1 nên nội dung đó sẽ được merge vào object methods như bình thường.

Toàn bộ phần mình vừa trình bày ở trên là cách mặc định mà VueJS tiến hành merge các object hoặc function bị trùng nhau trong một component sử dụng mixin. Ngoài ra VueJS cũng cấp cho chúng ta khả năng viết lại cách mà bạn muốn ưu tiên nội dung nào hơn trong việc merge nói trên nhưng trên thực tế mình chưa sử dụng bao giờ và cũng chưa gặp trường hợp nào phải viết lại logic merge cả nên mình sẽ không trình bày ở đây. Nếu bạn quan tâm thì có thể đọc thêm tại [đây](https://v3.vuejs.org/guide/mixins.html#custom-option-merge-strategies).

## 3. Hạn chế
<hr>

Mặc dù mixin đem lại cho chúng ta khá nhiều các tính năng hay ho hỗ trợ chúng ta trong project của mình tuy nhiên bạn cũng nên biết về các hạn chế của nó để có thể đưa ra các phương án phù hợp cũng như để tránh các bug có thể gặp phải.

### a. Trùng lặp giá trị

Như ở trên mình đã nói, nếu bạn dùng nhiều mixin và trong các mixin đó có methods trùng tên, data state trùng tên, ... với nhau hoặc trùng tên với nội dung bên trong component thì nó sẽ diễn ra việc  merging giữa các nội dung bị trùng đó và khi merge sẽ có những giá trị bị ghi đè tùy theo độ ưu tiên. Điều này sẽ dẫn đến khi bạn phát triển một tính năng mới hay thêm một mixin mới vào cho component của bạn thì bạn sẽ phải đi check lại toàn bộ các mixin khác đang sử dụng hoặc thậm chỉ cả nội dung bên trong component xem liệu mixin mới/ tính năng mới mà bạn sắp thêm vào có bị trùng tên ở đâu không. Và việc này sẽ tốn thêm của bạn ít hay nhiều thời gian phụ thuộc vào số lượng mixin bạn dùng cũng như độ phức tạp bên trong mixin và cả component nữa. Trường hợp bạn bỏ qua việc kiểm tra này có thể dẫn đến lỗi và có thể đẩy bạn vào tình  trạng không biết tại sao lại lỗi khi logic nhìn đã đúng hết rồi. Đơn giản nhất ta xét ví dụ sau:

```mixin1.js
export default {
    data() {
        return {
            data: [1, 2, 3],
        }
    },
}
```

```js
// Component A

<script>
    import 'mixin1' from './mixin1.js';
    
    export default {
        name: 'ComponentA',
        mixins: [mixin1],

        methods: {
            logData() {
                this.data.each(item => {
                    console.log(item);
                });
            }
        }
    }
<script>
```

Bây giờ giả sử bạn thêm mixin 2 với nội dung như sau:

```mixin2.js
export default {
    data() {
        return {
            data: true,
        }
    },
    methods: {
        toggleData() {
            this.data = !this.data;
        }
    }
}
```

Sau đó bạn thêm vào component A:

```js
// Component A

<script>
    import 'mixin1' from './mixin1.js';
    import 'mixin2' from './mixin2.js';
    
    export default {
        name: 'ComponentA',
        mixins: [mixin1, mixin2],

        methods: {
            logData() {
                this.data.each(item => {
                    console.log(item);
                });
            }
        }
    }
<script>
```

Nếu bạn làm như nói trên mà không check lại toàn bộ nội dung những gì đã viết trong mixin1 hoặc componentA thì việc thêm mixin mới nói trên của bạn với tên biến `data` bị trùng nhau sẽ dấn đến `data` trong mixin2 sẽ ghi đè `data` trong mixin1. Hậu quả của việc này làm cho method `logData()` của bạn sẽ bị lỗi dạng *Uncaught TypeError: a.each is not a function* và bạn sẽ lại phải đi tìm kiếm xem vấn đề ở đâu. Ở đây ví dụ mình đưa ra rất đơn giản nên bạn có thể nhanh chóng khắc phục được nó nhưng trong trên thực tế khi component và mixin của bạn phức tạp hơn thì việc đi tìm kiếm nói trên là khá mất công sức. Chính vì thế để hạn chế những công việc không cần thiết nói trên thì bạn có thể áp dụng một số quy tắc như sau:
- Đối với state, method, computed, ... nằm trong một mixin mà thuộc dạng private nghĩa là nó chỉ nên được gọi và sử dụng bên trong mixin đó thôi mà không nên gọi bên ngoài thì bạn nên đặt tên như sau:

```featureA.js
export default {
    data() {
        return {
            $_featureA_data: 1,
        }
    },
    methods: {
        $_featureA_doSomething() {

        }
    }
}
```
Ở đây đối với các thành phần thuộc dạng private, ta sẽ thêm phần tiền tố `$_[featureName/ mixinName]_` vào trước tên của dữ liệu trong data, tên methods, ... của mixin đó để hạn chế việc component khác hoặc mixin khác đặt trùng tên vì với một tiền tố cụ thể như trên mà bạn vẫn đặt trùng tên được thì nó cũng khá  là khó. Cách làm này thực tế được mình áp dụng từ chính style guide của VueJS, cụ thể bạn có thể xem ở [đây](https://v3.vuejs.org/style-guide/#private-property-names-essential).
- Đối với các state, method, computed, ... khác mà bạn muốn public ra cho bên component khác sử dụng hoặc thậm chí mixin khác sử dụng thì bạn cũng nên làm cách tương tự đó là thêm tiền tố `[featureName]_` đối với các function của bạn. Còn với state thì bạn đơn giản chỉ cần bọc toàn bộ nội dung state trong mixin đó trong một cái key tương ứng với tên feature của bạn như sau:

```featureA.js
export default {
    data() {
        return {
            featureA: {
                data: 1,
            }
        }
    }
}
```
Bằng cách nói trên thì bạn cũng hạn chế được phần nào sự ghi đè không mong muốn. Tất nhiên nó cũng đồng nghĩ với việc code bạn sẽ dài hơn do phải truy cập từ `this.data` sang `this.featureA.data`. Tuy nhiên đây là phần trade-off phải có.

### b. Không biết giá trị xuất hiện tự đâu

Giả sử trong component của bạn có nội dung như sau:
```js
// ComponentA
<template>
    <p>{{ title }}</p>
    <button @click="doSomething">Click</button>
</template>

<script>
    import 'mixin1' from './mixin1.js';
    import 'mixin2' from './mixin2.js';
    import 'mixin3' from './mixin3.js';
    
    export default {
        name: 'ComponentA',
        mixins: [mixin1, mixin2, mixin3],

        methods: {
            logData() {
                console.log(this.someData);
            }
        }
    }
<script>
```

Với trường hợp như trên nếu các giá trị như trên thì nếu giá trị `title` không được viết ngay trong componentA thì bạn khó có thể ngay lập tức biết được cái giá trị đó đến từ mixin nào ngoài việc đi ngó thử từng mixin. Điều tương tự cũng xảy ra với method `doSomething()` và cả giá trị `someData` nữa. Tuy nhiên nếu bạn áp dụng cách giải quyết mà mình đề cập ở mục trường thì cũng có thể giảm thiểu vấn đề này nhưng nó sẽ đánh đổi bằng việc code của bạn sẽ trở nên dài hơn hay chính xác là bạn sẽ phải code nhiều hơn.

### c. Khó khăn hơn trong việc tái sử dụng

Mình quên nhắc đến ở trên là khi các mixin được sử dụng trong một component thì toàn bộ nội dung bên trong các mixin đó cũng như nội dung bên trong component có thể truy cập chéo lẫn nhau. Ví dụ mixin1 có thể sử dụng toàn bộ nhưng gì có trong mixin2, mixin3 và cả trong component và ngược lại component, mixin2, mixin 3 cũng thế. Khi sử dụng ta chỉ cần: `mixins: [mixin1, mixin2]`.  Tuy nhiên khi sử dụng dữ liệu chéo giữa các phần như vậy có thể làm việc đọc code của bạn trở nên khó khăn hơn vì lại rơi vào trường hợp không biết giá trị này từ đâu mà ra cả. Nói tóm lại việc sử dụng mixin ở đây có rất nhiều các hạn chế mặc dù ta có thể dùng một số phương pháp như mình nói ở trên để giải quyết tạm thời nhưng bù vào đó thì code chúng ta phải code là nhiều hơn rất nhiều. Chính vì các hạn chế chung nói trên mà VueJS đã ra mắt tính năng gọi là **Composition API** nhằm giải quyết các vấn đề mà ta gặp phải ở trên, tuy nhiên phần này có lẽ mình sẽ chia sẻ với các bạn ở bài viết khác.

## 4. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc, cảm ớn các bạn đã đọc bài viết và nếu bạn có thắc mắc gì có thể comment ngay phía bên dưới  để chúng ta cùng trao đổi. Cuối cùng bạn đừng quên upvote và chia sẻ bài viết để ủng hộ mình nhé.