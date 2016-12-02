# Release History

## 2.5.0
   - Ability to use loading bar with immutable (thanks @greenpart)

## 2.4.1
   - If the Loading Bar is mounted with loading count > 0, it should launch the progress simulation immediately

## 2.4.0
   - Do not apply styling if CSS class is specified

## 2.3.4
   - Export UI component

## 2.3.3
   - Reset position of the Loading Bar if it is triggered to be shown during ending animation

## 2.3.2
   - Fix infinite loop when Loading Bar is triggered to be shown during ending animation

## 2.3.1
   - Do not call resetProgress after the Loading Bar is unmounted

## 2.3.0
   - Simplify the middleware

## 2.2.3
   - Loading Bar should not reset to 0 before disappear

## 2.2.2
   - Add fade effect on SHOW and HIDE actions by using opacity transition (thanks to @hieuhlc)

## 2.2.1
   - Match actions with regular expressions to prevent false positives (thanks to @ThomasMarnet)

## 2.2.0
   - Loading Bar moves to the end before disappear

## 2.1.0
   - Configure updateTime, maxProgress and progressIncrease via props

## 2.0.2
   - Clear interval on unmount

## 2.0.1
   - Fix for server side rendering and isomorphic apps

## 2.0.0
   - Ability to set custom promise type suffixes

## 1.1.1
   - Remove shrinkwrap to make the module portable

## 1.1.0
   - Add ability to apply custom styling and relax dependencies

## 1.0.2
   - Fix middleware to work with `redux-thunk`

## 1.0.1
   - Update dependencies

## 1.0.0
   - Initial release
