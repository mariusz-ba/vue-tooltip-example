# Vue Tooltip Example
Simple vue tooltip directive

## Usage
Import directive in any of your vue components:
```js
import { tooltip } from 'src/utils/vue/directives';

const component = {
  name: 'my-component',
  directives: {
    tooltip
  }
}
```
Import base css styles for tooltip directive. Or you can create your own.
```scss
@import 'src/utils/vue/directives/tooltip/tooltip.scss';
```
Use directive in vue template
```html
<div v-tooltip="{ content: 'Hello World', align: 'center' }">My div</div>
```
Now when you hover your div you should see tooltip 💬

## Development
Here are some guides how to run this project locally.

### Installing
In order to install all required dependencies please navigate to project root directory and run following command:
```bash
npm install
```

### Running
If you want to run project for development use:
```bash
npm start
```

### Building
To build either production or development bundle run following commands:
```bash
# build development bundle
npm run build-dev
# build minified, production bundle
npm run build-prod
```