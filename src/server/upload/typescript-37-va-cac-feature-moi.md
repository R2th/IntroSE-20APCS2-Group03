Typescript 3.7 sẽ có 1 số tính năng mới.

### Null Coalescing

```
// Use the first of firstResult/secondResult which is truthy:
const result = firstResult || secondResult;

// Use configValue from provided options if truthy, or 'default' if not:
this.configValue = options.configValue || 'default';
```

Trong trường hợp `firstResult` có các giá trị `false` hoặc `0`.  Kết quả của result sẽ là `firstResult`.  
Với typescript 3.7 chúng ta có thể làm như sau.

```
// Use the first of firstResult/secondResult which is *defined*:
const result = firstResult ?? secondResult;

// Use configSetting from provided options if *defined*, or 'default' if not:
this.configValue = options.configValue ?? 'default';
```

### Optional Chaining

```
// To get data.key1.key2, if any level could be null/undefined:
let result = data ? (data.key1 ? data.key1.key2 : undefined) : undefined;

// Another equivalent alternative:
let result = ((data || {}).key1 || {}).key2;
```

Trong trường hợp giá trị chúng ta tìm kiếm là nested object code sẽ trở nên khó check.  
Với typescript 3.7 ta có thể làm như sau:

```
let result = data?.key1?.key2;

// The same, through an array index or property, if possible:
array?.[0]?.['key'];

// Call a method, but only if it's defined:
obj.method?.();

// Get a property, or return 'default' if any step is not defined:
let result = data?.key1?.key2 ?? 'default';
```