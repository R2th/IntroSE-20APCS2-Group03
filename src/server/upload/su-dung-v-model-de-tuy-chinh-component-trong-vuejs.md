# Intro

Để hiểu được cách vận dụng v-model dùng trong component của bạn bạn phải hiểu được bên trong nó hoạt động như thế nào.

Nhìn nghe có vẻ hoàng tráng thực ra **v-model=”syncedProp”** chỉ là cách viết ngắn gọn của **:value=”syncedProp” @:input=”syncedProp = arguments[0]”** (hoặc là **:value=”syncedProp” @:input=”syncedProp = $event.target.value”** trong  component.)

Vì vậy, để component của bạn có thể tương thích được với **v-model** thì phải chấp nhận một thuộc tính **value** và sự kiện **@input** khi người dùng thay đổi giá trị.

# Cách đơn giản

OK giả sử mình có 1 component date picker có chấp nhận giá trị tháng, năm từ 1 object như sau: {month: 1, year: 2017}.

Và trong component phải có 2 thẻ input, 1 input để để đôi giá trị  **month** và 1 input tuơng tự cho  **year** và sẽ cập nhật giá trị khi object thay đổi thông qua **v-model**. Dưới đây là cách thực hiện:

```
DatePicker.vue
=========================================

<template>
  <div class="date-picker">
    Month: <input type="number" ref="monthPicker" :value="value.month" @input="updateDate()"/>
    Year: <input type="number" ref="yearPicker" :value="value.year" @input="updateDate()"/>
  </div>
</template>

<script>
export default {
  props: ['value'],

  methods: {
    updateDate() {
      this.$emit('input', {
        month: +this.$refs.monthPicker.value,
        year: +this.$refs.yearPicker.value
      })
    }
  }
};
</script>
```

OK, còn đây là cách mà component khác sử dụng **DatePicker.vue**

```
<template>
  <div class="wrapper">
    <date-picker v-model="date"></date-picker>
    <p>
      Month: {{date.month}}
      Year: {{date.year}}
    </p>
  </div>
</template>

<script>
import DatePicker from './DatePicker.vue';

export default {
  components: {
    DatePicker
  },

  data() {
    return {
      date: {
        month: 1,
        year: 2017
      }
    }
  }
})
</script>
```

Đấy thực ra nó đơn giản chỉ là lấy giá trị từ thuộc tính **value** và **$emit** nó vào sự kiện **@input** để cập nhật giá trị. Nó không có gì quá phức tạp cả.


# Cách nâng cao hơn

Cách này thì `input data` sẽ không phải là object nữa mà sẽ là date string ở dạng `m/yyyy`. Cách này sẽ sử dụng thêm thuộc tính `computed` (thuộc tính `splitDate`) để tách `input data` thành `Array` bao gồm month, year.

```
StringyDatePicker.vue
=========================================
<template>
  <div class="date-picker">
    Month: <input type="number" ref="monthPicker" :value="splitDate.month" @input="updateDate()"/>
    Year: <input type="number" ref="yearPicker" :value="splitDate.year" @input="updateDate()"/>
  </div>
</template>

<script>
export default {
  props: ['value'],

  computed: {
    splitDate() {
      const splitValueString = this.value.split('/');

       return {
        month: splitValueString[0],
        year: splitValueString[1]
      }
    }
  },

  methods: {
    updateDate() {
      const monthValue = this.$refs.monthPicker.value;
      const yearValue = this.$refs.yearPicker.value;
      this.$emit('input', `${monthValue}/${yearValue}`);
    }
  }
};
</script>
```

Khi bạn đã hiểu được mô hình hoạt động của v-model thì bạn có thể dễ dàng tùy chỉnh theo ý của mình với bất kỳ dạng `input data` nào. Chúc bạn thành công :D
.