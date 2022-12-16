In this tutorial, I'm going to show you how to setup the testing environment for the vue application using `vue-cli 3.9.3` and `vuejs 2.6.10`

First, let's create a vue project named vue-counter
```
vue create vue-counter
```
Then, cleaning up the App.vue and also creating a Counter component
```html
#src/App.vue
<template>
  <div>
    <counter />
  </div>
</template>

<script>
import Counter from "./components/Counter.vue";
export default {
  components: {
    Counter
  }
};
</script>
```
Counter component
```html
#src/components/Counter.vue
<template>
  <div>
    <div>counter: {{counter}}</div>
    <button @click="counter++">increment</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    counter: 84
  })
};
</script>
```
This is a very simple counter, displaying a counter and whenever the user click on the button, it increases the counter by one.
So now, let's write unit tests for this tiny application.

First, let's add jest package into our project
```
yarn add jest --dev
```
Before jumping into testing the Counter component, we first need to ensure that our brand new installed package working as expected by creating a tiny spec file.
We will follow the examples in jestjs offical documentation: https://jestjs.io/docs/en/getting-started

First, inside the `src/components` folder, creating a `src/components/sum.js` file
```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
There's only one super simple function which adding up two number and return the result
Then, creating a file named `src/components/sum.spec.js` :
```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
Last step, getting into the `package.json` file and adding this line `"test": "jest"` into the `scripts` section, the final `scripts` section will look like this:

```json
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
    "test": "jest"
  }
```

Now, let's run `yarn test` and see the result

![](https://images.viblo.asia/fd6e76e5-5b40-47f8-bf1d-1e5368b6dcd1.png)

Yay! It works!

Now, let's level up it a little bit, what if I wanna use the ES6 syntax for module sytems, I means using `import/export`. But first, let's change the code a little bit.

```js
//src/components/sum.js
export function sum(a, b) {
  return a + b;
}

//src/components/sum.spec.js
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Now, we're using the `export/import` syntax for modularity. Running `yarn test` again to see whether it still works or not.

Error!!

```
yarn run v1.17.3
$ jest
 FAIL  src/components/sum.spec.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

    By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

    Here's what you can do:
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/en/configuration.html

    Details:

     .../src/components/sum.spec.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import { sum } from "./sum";
                                                                                                    ^

    SyntaxError: Unexpected token {

      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:471:17)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:513:25)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.939s, estimated 2s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

It complains that "it's not plain JavaScript", it didn't know how to parse those weird code.

To help jest knows, following this instruction https://jestjs.io/docs/en/getting-started#using-babel

First, adding these packages
```
yarn add --dev babel-jest @babel/core @babel/preset-env
```
Then, replacing the content of the `babel.config.js` file with this:

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

Running `yarn test` again and it should works

![](https://images.viblo.asia/0734d5cd-a930-4d47-bf6d-30aae68042ea.png)

Now, we are confident enough to create a `Counter.test.js` file to test our `Counter` component.

```js
//src/components/Counter.spec.js
describe('Counter.vue', () => {
  test('test correctly', () => {
    expect(true).toBe(true)
  })
})
```

Those tests just for ensuring that our newly created file works, run `yarn test` again

![](https://images.viblo.asia/bd04918e-38a6-4e74-8614-afed60847a17.png)

Yay! It works!

Then, adding this line to the top of `Counter.test.js` file

```js
import Counter from './Counter.vue'

describe('Counter.vue', () => {
  test('test correctly', () => {
    expect(true).toBe(true)
  })
})
```

Running `yarn test` again and watching it failed.

```
yarn run v1.17.3
$ jest
 PASS  src/components/sum.spec.js
 FAIL  src/components/Counter.spec.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

    By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

    Here's what you can do:
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/en/configuration.html

    Details:

    .../src/components/Counter.vue:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){<template>
                                                                                             ^

    SyntaxError: Unexpected token <

    > 1 | import Counter from './Counter.vue'
        | ^
      2 | 
      3 | describe('Counter.vue', () => {
      4 |   test('test correctly', () => {

      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:471:17)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:513:25)
      at Object.<anonymous> (src/components/Counter.spec.js:1:1)

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.905s, estimated 1s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

Jest confused again, it doesn't understand the `<` thing and so doesn't know what to do with it. So, how do we help it understand?

We need the `vue-jest` package. Let's install it.
```
yarn add vue-jest --dev
```
Then, we need to config jest, let's run:
```
jest --init
✔ Choose the test environment that will be used for testing › jsdom (browser-like)
✔ Do you want Jest to add coverage reports? … no
✔ Automatically clear mock calls and instances between every test? … no
```
Opening up the newly created `jest.config.js` file,  removing all and below is all we need to stay in the file so far:

```js
//jest.config.js
module.exports = {
  transform: {
    "^.+\\.vue$": "vue-jest"
  }
};
```
Running `yarn test` again, we will receive the new errors message:

```
yarn run v1.17.3
$ jest
 FAIL  src/components/Counter.spec.js
  ● Test suite failed to run

    /home/nguyen.thanh.tu/Desktop/work/day0208/vue-ut/src/components/Counter.spec.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import Counter from './Counter.vue'
                                                                                                    ^^^^^^^

    SyntaxError: Unexpected identifier

      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:471:17)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:513:25)

 FAIL  src/components/sum.spec.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

    By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

    Here's what you can do:
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/en/configuration.html

    Details:

    /home/nguyen.thanh.tu/Desktop/work/day0208/vue-ut/src/components/sum.spec.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import { sum } from './sum'
                                                                                                    ^

    SyntaxError: Unexpected token {

      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:471:17)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:513:25)

Test Suites: 2 failed, 2 total
Tests:       0 total
Snapshots:   0 total
Time:        0.923s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

This time, it complained that it didn't understand the `import/export` syntax, quite strang since we just taught it earlier how to deal with those syntax. Anyway, let's just help it. We now will explicitly tell Jest to transform all file `.js` using `babel-jest`:

```js
//jest.config.js
module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  }
};
```

Running `yarn test` again, we will receive a new error message:

```
yarn run v1.17.3
$ jest
 PASS  src/components/sum.spec.js
 FAIL  src/components/Counter.spec.js
  ● Test suite failed to run

    Cannot find module 'babel-core'
    Require stack:
    - @/node_modules/vue-jest/lib/compilers/babel-compiler.js
    - @/node_modules/vue-jest/lib/process.js
    - @/node_modules/vue-jest/vue-jest.js
    - @/node_modules/@jest/transform/build/ScriptTransformer.js
    - @/node_modules/@jest/transform/build/index.js
    - @/node_modules/jest-runtime/build/index.js
    - @/node_modules/jest-runner/build/testWorker.js
    - @/node_modules/jest-worker/build/workers/processChild.js

      at Object.<anonymous> (node_modules/vue-jest/lib/compilers/babel-compiler.js:1:15)

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.203s
Ran all test suites.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

It complains that it `Cannot find module 'babel-core'`, this is an issue with the `vue-jest` package, there's an Pull Request addressing this issue: https://github.com/vuejs/vue-jest/pull/173

In order to get around this, adding a bridge package
```
yarn add babel-core@bridge --dev
```

That command will add this line ` "babel-core": "^7.0.0-bridge.0"` into your package.json.

Now, running `yarn test` again. Problem solved!

![](https://images.viblo.asia/38b63da1-a725-44f8-99ca-43248a6832dd.png)

Now, we want to calculate the coverage percentage of the application, let's add these option into `jest.config.js`

```js
//jest.config.js
module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**/*.config.*",
    "!src/main.js"
  ]
};
```
Now, running `yarn test` again and this is what we will receive:

![](https://images.viblo.asia/4493dba8-23b1-4a36-8884-1db0a82e76c6.png)

Now, everything is all set. Let's write the real component test:

First, adding this package:
```
yarn add @vue/test-utils --dev
```

Then, updating the `Counter.spec.js`:

```js
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter.vue', () => {
  test('increments the counter value when button is clicked', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('counter: 84')
    wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('counter: 85')
  })
})
```

Running `yarn test` again and here is what we will receive:

![](https://images.viblo.asia/89c7c865-c57a-4b8d-8ba3-610b98e0add1.png)

Done!

Just in case there's any issues might occur, here is the final package.json file of mine:

```json
{
  "name": "vue-ut",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test": "jest"
  },
  "dependencies": {
    "core-js": "^2.6.5",
    "vue": "^2.6.10"
  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@vue/cli-plugin-babel": "^3.9.0",
    "@vue/cli-plugin-eslint": "^3.9.0",
    "@vue/cli-service": "^3.9.0",
    "@vue/test-utils": "^1.0.0-beta.29",
    "babel-core": "^7.0.0-bridge.0",
    "babel-eslint": "^10.0.1",
    "babel-jest": "^24.8.0",
    "eslint": "^5.16.0",
    "eslint-plugin-vue": "^5.0.0",
    "jest": "^24.8.0",
    "vue-jest": "^3.0.4",
    "vue-template-compiler": "^2.6.10"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {},
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}
```


-----


References:

[1] Writing a Vue unit test with Jest: https://www.youtube.com/watch?v=vQ4A7EfAHOg&t=305s

[2] Jest documentation: https://jestjs.io/docs/en/getting-started

[3] vue-test-utils: https://github.com/vuejs/vue-test-utils

[4] vue-jest: https://github.com/vuejs/vue-jest