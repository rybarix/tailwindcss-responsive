const plugin = require('tailwindcss/plugin')

/**
 * Returns object's key according to value match.
 * @param {string} value 
 * @param {[key: string]: string} plainObject 
 * @returns 
 */
const reverseSearch = (value, plainObject) => {
  const tuple = Object.entries(plainObject).find(([key, val]) => val === value)
  if (tuple !== undefined) {
    const [key, _] = tuple
    return key
  }

  return undefined
}

function tailwindcssResponsivePlugin() {
  return plugin(function ({ theme, matchUtilities }) {

    const PADDING_MAPING = {
      'rp': ['padding'],
      'rpl': ['padding-left'],
      'rpr': ['padding-right'],
      'rpt': ['padding-top'],
      'rpb': ['padding-bottom'],
      'rpx': ['padding-left', 'padding-right'],
      'rpy': ['padding-top', 'padding-bottom'],
    }
  
    const MARGIN_MAPING = {
      'rm': ['margin'],
      'rml': ['margin-left'],
      'rmr': ['margin-right'],
      'rmt': ['margin-top'],
      'rmb': ['margin-bottom'],
      'rmx': ['margin-left', 'margin-right'],
      'rmy': ['margin-top', 'margin-bottom'],
    }
  
    const FONT_SIZE = {
      'rtext': ['font-size'],
    }
  
  
    const createResponsiveCssProp = (propMap, confPropName, valuesSource) => {
      const themeScreens = theme('screens')
      const screenTuples = Object.entries(themeScreens).sort(([, aval], [, bval]) => {
        const faval = parseFloat(aval)
        const fbval = parseFloat(bval)

        if (faval > fbval) {
          return 1
        } else if (faval < fbval) {
          return -1
        }
        return 0
      })
  
      // Get corresponding value accordig to screen definition
      const mediaQueryValue = (screen, val) => theme(`${confPropName}.${screen}`)[reverseSearch(val, valuesSource)]
  
      for (const [tailwindClassName, cssProps] of Object.entries(propMap)) {
  
        // Handle default screen, no media query is present here
        const defaultScreenTailwindHandle = {
          [tailwindClassName]: (value) => {
            // flat object - no nesting
            let fo = {}
  
            cssProps.forEach(cssProp => {
              fo[cssProp] = mediaQueryValue('DEFAULT', value)
            })
  
            return fo
          }
        }
  
        // Handle other screens, add media query
        const screensExceptDefault = screenTuples.filter(([screenName,]) => screenName !== 'DEFAULT')
  
        const otherScreensTailwindHandle = {
          [tailwindClassName]: (value) => {
  
            // flat object - no nesting
            let fo = {}
  
            // go over all screens
            screensExceptDefault.forEach(([screen, ]) => {
              // put all props in one object
              let css = {}
              cssProps.forEach(prop => {
                css[prop] = mediaQueryValue(screen, value)
              })

              fo[`@media (min-width: ${themeScreens[screen]})`] = {
                ...css
              }
            })
  
            return fo
          }
        }
  
  
        matchUtilities(
          defaultScreenTailwindHandle,
          { values: valuesSource }
        )
  
        matchUtilities(
          otherScreensTailwindHandle,
          { values: valuesSource }
        )
      }
    }
    
    if (theme('rspacing')) {
      createResponsiveCssProp(PADDING_MAPING, 'rspacing', theme('rspacing.DEFAULT'))
      createResponsiveCssProp(MARGIN_MAPING, 'rspacing', theme('rspacing.DEFAULT'))
    }

    if (theme('rtext')) {
      createResponsiveCssProp(FONT_SIZE, 'rtext', theme('rtext.DEFAULT'))
    }
  })
}

module.exports = tailwindcssResponsivePlugin
