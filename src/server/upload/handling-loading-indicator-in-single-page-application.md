# 1. Introduction
Since the birth of Ajax technology in 2005, the web development industry has been changing rapidly, moving a lot of works from server-side to the client-side. Now, the web application is behaving much like desktop application due to the impressive reactivity. Such web application is known as Single Page Application in which Javascript plays a major role.

Javascript allow the web page to reload only a part of the webside instead of full page load. However, because all the loading work happens silently in the background, it might confuse the users since they don't know what's actually going on as they interact with our website. That's the reason why handling loading indicator becomes a crucial task that every web developer has to tackle at some point in the development process. 

# 2. Technique

In this post, I'm gonna share with you one way to handle loading indicator that I found very effective, but most importantly, it's very simple and easy to implement.

The core idea of this technique is using a `requestsCounter` variable to store the number of pending requests. Whenever a request is sent, we increase the `requestsCounter` by one, and decrease it when the request is done. The implementation might look like this in Vuex - Vuejs.

```js
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const RESET = 'RESET'

export const state = {
  requestsCounter: 0
}

export const mutations = {
  [INCREMENT] (state) {
    state.requestsCounter += 1
  },
  [DECREMENT] (state) {
    if (state.requestsCounter === 0) return
    state.requestsCounter -= 1
  },
  [RESET] (state) {
    state.requestsCounter = 0
  }
}

export const actions = {
  startLoading ({ commit }) {
    commit(INCREMENT)
  },
  finishLoading ({ commit }) {
    commit(DECREMENT)
  },
  forceFinishLoading ({ commit }) {
    commit(RESET)
  }
}

export const getters = {
  isLoading: state => !!state.requestsCounter
}
```
To be able to interact with the store, we need to provide some interface to it. To achieve that, we're gonna create a mixin and mix it in every components using `Vue.mixin()`

```js
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('loading', {
      $isLoading: 'isLoading'
    })
  },
  methods: {
    ...mapActions('loading', {
      $startLoading: 'startLoading',
      $finishLoading: 'finishLoading',
      $forceFinishLoading: 'forceFinishLoading'
    })
  }
}

```

In components, the usage of this technique might look like this:
```js
export default {
    created () {
        this.loadData()
    },
    methods: {
        loadData () {
            const service = new Service()
            this.$startLoading()
            service.getData()
                .then(response => {
                    // do something
                })
                .catch(errors => {
                    // handle errors
                })
                .finally({
                    this.$finishLoading()
                })
        }
    }
}
```

In the App component, it would be like this:

```js
<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
    <loading v-show="$isLoading" />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue

export default {
    components: {
        Loading
    }
}
</script>
```
# 3. Conclusion
The beauty of this technique is the simplicity and effectiveness, especially when we have to deal with multiple concurrent requests. Thank you for reading, let's me know if you have any better ideas about handling loading indicator.