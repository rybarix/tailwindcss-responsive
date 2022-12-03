# Tailwindcss Responsive Plugin

## Installing

`npm install -D tailwindcss-responsive`

Add configuration to your _tailwind.config.js_ file.

```js
// ...
theme: {
  rspacing: {
    DEFAULT: { // mobile
      smaller: '0.8rem',
    },
    // here use whatever screen modifiers you are using, default are listed here https://tailwindcss.com/docs/screens
    sm: {
      // you can also own names for these modifiers
      // default are named by numbers 1, 2, ...
      smaller: '1rem',
    },
    md: {
      smaller: '1.2rem',
    },
    lg: {
      smaller: '2.2rem',
    }
  },
  // same works for rtext
  rtext: {
    //...
    DEFAULT: {
      //...
    }
  }
}
```


## Problem & Solution

Making responsive spacings and fontsizes requires lots of brekpoint modifiers.
Making change across multiple components become painful pretty quickly as number of code incrases.
Use single class name to specify spacing across all screens.

### Example usage

```html
<!-- Example of responsive spacing -->
<!-- We are using custom screens option -->
<div class="p-1 tablet:p-2 desktop:p-5"></div>
```

To keep things consistent there can be only spacing class which changes
size according to configuration.

Configure once, use responsive spacing with single class name.

```js
// tailwind.config.js
const tailwindResponsivePlugin = require('tailwindcss-responsive')

module.exports = {
  //...
  theme: {
    screens: {
      tablet: '1024px',
      desktop: '1400px',
    },
    rtext: {
      DEFAULT: {
        'base': '1rem',
        'lg': '2rem',
      },
      tablet: {
        'base': '1.5rem',
        'lg': '5rem',
      },
      desktop: {
        'base': '2rem',
        'lg': '8rem',
      },
    },
    rspacing: {
      DEFAULT: {
        1: '0.459375rem',
        2: '0.91875rem',
        3: '1.8375rem',
        // ...
      },
      tablet: {
        1: '0.65625rem',
        2: '1.3125rem',
        3: '2.625rem',
        // ...
      },
      desktop: {
        1: '0.9375rem',
        2: '1.875rem',
        3: '3.75rem',
        // ...
      },
    },
    plugins: [
      tailwindResponsivePlugin(),
    ],
  }
}
```

```html
<div class="rp-1 text-base"></div>
<!-- This is equivalent to -->
<div class="p-[0.459375rem] tablet:p-[0.65625rem] desktop:p-[0.9375rem] text-[1rem] laptop:text-[1.5rem] dekstop:text-[2rem]"></div>
```
