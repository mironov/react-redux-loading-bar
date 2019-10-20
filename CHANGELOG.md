# Release History

## 4.5.0
  - Cancel termination animation if Loading Bar should be restarted

## 4.4.0
  - Update react-redux peer dependency requirement (contributed by @hugomn)

## 4.3.0
   - Add support for RTL Layout. Ref: #88

## 4.2.0
   - Support latest react-redux v6

## 4.1.0
   - Make the animation smoother (at least in Chrome)

## 4.0.8
   - Old browser compatibility (contributed by @dengbupapapa)

## 4.0.7
   - Revert changes introduced in v4.0.6 because they break modern browsers like Chrome

## 4.0.6
   - Animation needs to be compatible with ie9 and other browsers (contributed by @dengbupapapa)

## 4.0.5
   - Replace .includes with a broadly supported .indexOf alternative

## 4.0.4
   - Relax Redux dependency

## 4.0.3
   - Update to latest react-lifecycles-compat

## 4.0.2
   - Rebuild Loading Bar

## 4.0.1
   - Update react-lifecycles-compat dependency

## 4.0.0
   - Rewrite the code to be compatible with future React versions

## 3.1.2
   - Check for the scope property within the meta property of the action

## 3.1.1
   - Add scope support to type definitions (contributed by @Kovensky)

## 3.1.0
   - Fix not disappearing loading bar on immediately changed props (contributed by @MikeDevice)

## 3.0.3
   - No need to have the `immutableLoadingBarReducer`

## 3.0.2
   - Import immutable in immutable reducer

## 3.0.1
   - Add immutable reducer to make Loading Bar v3 work with immutable stores

## 3.0.0
   - Allow having multiple loading bars on one page (contributed by @seb0zz and @neogermi)

## 2.9.3
   - Bump dependencies to support React 16

## 2.9.2
   - Make terminating animation faster. Ref: #41

## 2.9.1
   - Render an empty div first and replace it with the actual Loading Bar after mount. This fixes the problem with SSR and strict style CSP. Ref: #39

## 2.9.0
   - Make the animation smoother

## 2.8.2
   - Add showFastActions prop to TS definition (thanks @vitosamson)

## 2.8.1
   - React.propTypes -> PropTypes

## 2.8.0
   - Do not display Loading Bar for quickly finished actions. You can pass the `showFastActions` prop to show the Loading Bar even when the action finishes in under `updateTime`.

## 2.7.4
   - Do not set second interval if loading bar is shown

## 2.7.3
   - Fix race condition when `showLoading` is called right after `hideLoading`

## 2.7.2
   - Do not try to stop simulation if it hasn't begun

## 2.7.1
   - Launch progress simulation only once when loading is increased couple of times

## 2.7.0
   - Revamped animation: added slowdown to the end of the progress; instant actions will briefly display loading bar for the period of UPDATE_TIME * 2

## 2.6.6
   - Fix issue where setState() is called on the server-side at unexpected lifecycles

## 2.6.5
   - Export `resetLoading` action

## 2.6.4
   - Do not let percent become greater than maxProgress if progressIncrease > (100 - maxProgress)

## 2.6.3
   - TypeScript definitions are not required to make LoadingBar work and thus removed from peer dependencies (thanks @larrydahooster)

## 2.6.2
   - Add TypeScript definitions (thanks @janslow)

## 2.6.1
   - Bump `react-redux` dependency version (thanks @larrydahooster)

## 2.6.0
   - New action `resetLoading` to reset the loading counter and hide Loading Bar.

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
