# vue-sliding-panel
![](https://badge.fury.io/js/vue-sliding-panel.svg)
![](https://img.shields.io/npm/l/vue-sliding-panel)

![logo](https://user-images.githubusercontent.com/17082836/63780877-cb199300-c923-11e9-9404-04b19c66c959.png)

vue-sliding-panel provides sliding panel component like [AndroidSlidingUpPanel](https://github.com/umano/AndroidSlidingUpPanel)

##  Installation

```bash
npm install vue-sliding-panel
# or
yarn add vue-sliding-panel
```


## Usage

Write below code in your application entry point.

```javascript
import Vue from 'vue'
import SlidingPanel from 'vue-sliding-panel'
import 'vue-sliding-panel/vue-sliding-panel.css'
Vue.use(SlidingPanel)
```

Then you can use `sliding-panel`

```vue
<template>
  <div>
    <sliding-panel :state.sync="panelState">
      {{ panelState }}
    </sliding-panel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      panelState: 'collapsed',
      gravity: 'bottom'
    }
  }
}
</script>
<style>
.sliding-panel {
  background: white;
  left: 0;
  right: 0;
}
</style>
```

See [documents](https://vue-sliding-panel.siy.space) for more infomation.

## License

> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this work except in compliance with the License.
> You may obtain a copy of the License in the LICENSE file, or at:
>
>  [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)
>
> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
> See the License for the specific language governing permissions and
> limitations under the License.

