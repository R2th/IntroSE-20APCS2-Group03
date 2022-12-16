Tại sao mình quyết định viết một plugin i18n cho dự án mới?

## TL;DR
-  Lightweight
-  Chỉ có các feature thật sự cần thiết.

## Lightweight
Mọi sự so sánh đều là khập khiễng, mình sẽ không nói đến khía cạnh package nào nhẹ hơn. Mà muốn tập trung vào nhu cầu sử dụng của mỗi dự án. Bài toán của bọn mình gặp phải là làm sao phải tối ưu được bundle size nhẹ nhất có thể. Vì thế bọn mình quyết định sẽ chỉ giữ lại những feature chính phù hợp với nhu cầu. Các feature không cần thiết sẽ bị bỏ đi  

### Vue I18n Next
![](https://images.viblo.asia/71437c9b-dff7-4e97-996a-9cd3134fb8cb.png)
Source: https://bundlephobia.com/result?p=vue-i18n@9.1.6

### Vue I18n Lite
![](https://images.viblo.asia/15c07498-1bc4-4687-ac42-8f836d813e2f.png)

Source: https://bundlephobia.com/result?p=vue-i18n-lite@1.0.1

## Cài đặt
### Dùng package
```bash
yarn add vue-i18n-lite
```

### Dùng CDN

```html
<script src="https://unpkg.com/vue-i18n-lite"></script>
```

## Sử dụng
### Sử dụng như một plugin của Vue
```ts
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n-lite';
import App from './App.vue';

const i18n = createI18n({
    locale: 'en',
    messages: {
        'en': {
            home: 'Home'
        }
    }
})

const app = createApp(App);
app.use(i18n);

```

### Sử dụng Composition API
```ts
import { useI18n } from 'vue-i18n-lite';

export default {
    setup() {
        const i18n = useI18n()
        i18n.createI18n({
            locale: 'en',
            messages: {
                'en': {
                    home: 'Home'
                }
            }
        })

        const { current, changeLocale } = i18n

        return {
            current,
            changeLocale
        }
    }
}
```

## API
```ts

import { App } from 'vue';
import { DeepReadonly } from '@vue/reactivity';
import { Ref } from 'vue';
import { UnwrapNestedRefs } from '@vue/reactivity';

// @public
export function createI18n(options?: I18nOptions): I18n;

// @public
export type I18n = {
    current: DeepReadonly<UnwrapNestedRefs<Ref<string>>>;
    options: DeepReadonly<UnwrapNestedRefs<I18nOptions>>;
    setLocaleMessage(locale: I18nLocale, messages: I18nLocaleMessages): void;
    getLocaleMessage(locale: I18nLocale): I18nLocaleMessages;
    changeLocale(locale: I18nLocale): void;
    install(app: App): void;
    t(key: string, values?: I18nValues): string;
    t(key: string, locale?: I18nLocale): string;
};

// @public
export type I18nLocale = string;

// @public
export type I18nLocaleMessage = string;

// @public
export type I18nLocaleMessageObject = {
    [k: string]: I18nLocaleMessageObject | I18nLocaleMessage;
};

// @public
export type I18nLocaleMessages = {
    [k: string]: I18nLocaleMessageObject | I18nLocaleMessage;
};

// @public
export type I18nLocales = {
    [k: string]: I18nLocaleMessages;
};

// @public
export type I18nOptions = {
    locale?: string;
    messages?: I18nLocales;
};

// @public
export type I18nValue = number | string;

// @public
export type I18nValueObject = {
    [k: string]: I18nValue;
};

// @public
export type I18nValues = I18nValue[] | I18nValueObject;

// @public
export function useI18n(): I18n;

```

## Kết luận
- Tùy thuộc vào dự án của bạn cần những features gì và yêu cầu cụ thể để quyết định.
- Việc tạo ra một package mới và phải maintain sẽ có những rủi ro nhất định vì có thể sẽ có lỗi tiềm ẩn. Thay vì sử dụng một package đã ổn định và có cộng đồng lớn.

Cám ơn anh em đã đọc bài viết của mình. Lần đầu tham gia viết bài mong nhận được ý kiến đóng góp của mọi người.