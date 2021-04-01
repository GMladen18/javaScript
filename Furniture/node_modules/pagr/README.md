# pagr

> A tiny (760 bytes) pagination range creator.

## Install

```
$ yarn add pagr
```

## Usage

```js
import pagr from 'pagr';

pagr(4, 12, 5);

/** =>
[
  { page: 1, current: true, type: 'page' },
  { type: 'separator' },
  { page: 4, current: true, type: 'page' },
  { page: 5, current: false, type: 'page' },
  { page: 6, current: false, type: 'page' },
  { type: 'separator' },
  { page: 12, current: false, type: 'page' },
]
*/
```

## API

### `pagr(current, bound, max): Array<Page | Separator>`

#### `current`

- Type: `Number`
- Required: ✅

The current index position of the paginator

#### `bound`

- Type: `Number`
- Required: ✅

The total page count of the paginator

#### `max`

- Type: `Number`
- Required: ✅

The maximum count of displayed pages, not including separators.

#### `Page`

##### Properties

- `page`: a `Number` denoting the page number
- `current`: a `boolean` denoting whether the page is the current page
- `type`: a constant of **page**

#### `Separator`

##### Properties

- `type`: a constant of **separator**
