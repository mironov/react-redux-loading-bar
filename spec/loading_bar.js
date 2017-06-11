/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react'
import { shallow, mount } from 'enzyme'
import expect, { spyOn } from 'expect'
import expectJSX from 'expect-jsx'
import lolex from 'lolex'
import { JSDOM } from 'jsdom'

import {
  LoadingBar,
  UPDATE_TIME,
  MAX_PROGRESS,
  PROGRESS_INCREASE,
  ANIMATION_TIME,
} from '../src/loading_bar'

expect.extend(expectJSX)

// Setup jsdom to let enzyme's mount work
const dom = new JSDOM('<!doctype html><html><body></body></html>')
global.window = dom.window
global.document = dom.window.document

describe('LoadingBar', () => {
  describe('#render', () => {
    it('renders without problems', () => {
      const wrapper = shallow(<LoadingBar />)

      expect(wrapper.node.type).toEqual('div')
    })

    it('renders an empty div before mount', () => {
      const wrapper = shallow(<LoadingBar />)

      expect(wrapper.children().node).toEqual(undefined)
    })

    it('renders by default hidden 3px height red element', () => {
      const wrapper = mount(<LoadingBar />)

      const resultStyle = wrapper.childAt(0).props().style
      expect(resultStyle.opacity).toEqual('0')
      expect(resultStyle.backgroundColor).toEqual('red')
      expect(resultStyle.height).toEqual('3px')
    })

    it('renders an element with passed color and height', () => {
      const style = { backgroundColor: 'blue', height: '5px' }
      const wrapper = mount(<LoadingBar style={style} />)

      const resultStyle = wrapper.childAt(0).props().style
      expect(resultStyle.backgroundColor).toEqual('blue')
      expect(resultStyle.height).toEqual('5px')
    })

    it('renders not hidden 3px height red element', () => {
      const wrapper = mount(<LoadingBar loading={1} />)
      wrapper.setState({ percent: 10 })

      const resultStyle = wrapper.childAt(0).props().style
      expect(resultStyle.opacity).toEqual('1')
      expect(resultStyle.backgroundColor).toEqual('red')
      expect(resultStyle.height).toEqual('3px')
      expect(resultStyle.position).toEqual('absolute')
    })

    it('does not apply styling if CSS class is specified', () => {
      const wrapper = mount(<LoadingBar className="custom" />)

      const resultStyle = wrapper.childAt(0).props().style
      expect(resultStyle.backgroundColor).toEqual(undefined)
      expect(resultStyle.height).toEqual(undefined)
      expect(resultStyle.position).toEqual(undefined)
    })
  })

  describe('#componentWillReceiveProps', () => {
    let spyLaunch
    let clock

    beforeEach(() => {
      spyLaunch = spyOn(LoadingBar.prototype, 'launch').andCallThrough()
      clock = lolex.install()
    })
    afterEach(() => {
      spyLaunch.restore()
      clock.uninstall()
    })

    it('does not launch on component mount', () => {
      shallow(<LoadingBar />)
      expect(spyLaunch).toNotHaveBeenCalled()
      expect(spyLaunch.calls.length).toEqual(0)
    })

    it('launches on loading count increase', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      expect(spyLaunch).toHaveBeenCalled()
      expect(spyLaunch.calls.length).toEqual(1)
    })

    it('does not launch if loading count is not increased', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 0 })
      expect(spyLaunch).toNotHaveBeenCalled()
      expect(spyLaunch.calls.length).toEqual(0)
    })

    it('launches on component mount if loading count is > 0', () => {
      mount(<LoadingBar loading={1} />)
      expect(spyLaunch).toHaveBeenCalled()
      expect(spyLaunch.calls.length).toEqual(1)
    })

    it('launches only once if loading count is increased to 2', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      wrapper.setProps({ loading: 2 })
      expect(spyLaunch).toHaveBeenCalled()
      expect(spyLaunch.calls.length).toEqual(1)
    })

    describe('when showFastActions not set', () => {
      it('does not show loading bar on quickly finished actions', () => {
        const wrapper = shallow(<LoadingBar />)
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME - 1) // less than first simulation
        wrapper.setProps({ loading: 0 })
        expect(wrapper.state().percent).toBe(0)
      })
    })

    describe('when showFastActions is set', () => {
      it('shows loading bar on quickly finished actions', () => {
        const wrapper = shallow(<LoadingBar showFastActions />)
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME - 1) // less than first simulation
        wrapper.setProps({ loading: 0 })
        expect(wrapper.state().percent).toBe(100)
      })
    })
  })

  describe('#componentWillUnmount', () => {
    let clock
    let consoleSpy

    beforeEach(() => {
      consoleSpy = spyOn(console, 'error')
      clock = lolex.install()
    })
    afterEach(() => {
      clock.uninstall()
      consoleSpy.restore()
    })

    it('does not throw errors in the console', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      expect(wrapper.state().progressInterval).toNotEqual(null)
      wrapper.unmount()
      clock.tick(UPDATE_TIME)
      expect(consoleSpy).toNotHaveBeenCalled()
    })

    it('does not throw errors in the console after loading', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      wrapper.setProps({ loading: 0 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().terminatingAnimationTimeout).toNotEqual(null)
      wrapper.unmount()
      clock.tick(ANIMATION_TIME)
      expect(consoleSpy).toNotHaveBeenCalled()
    })
  })

  describe('#launch', () => {
    let clock
    let spySimulateProgress

    beforeEach(() => {
      spySimulateProgress = spyOn(
        LoadingBar.prototype,
        'simulateProgress',
      ).andCallThrough()
      clock = lolex.install()
    })
    afterEach(() => {
      spySimulateProgress.restore()
      clock.uninstall()
    })

    it('schedules simulateProgress on UPDATE_TIME', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(spySimulateProgress).toHaveBeenCalled()
      expect(spySimulateProgress.calls.length).toEqual(1)
    })

    it('does not schedule simulateProgress before UPDATE_TIME', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME - 1)
      expect(spySimulateProgress).toNotHaveBeenCalled()
      expect(spySimulateProgress.calls.length).toEqual(0)
    })

    it('schedules simulateProgress twice after UPDATE_TIME * 2', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME * 2)
      expect(spySimulateProgress).toHaveBeenCalled()
      expect(spySimulateProgress.calls.length).toEqual(2)
    })

    it('does not set second interval if loading bar is shown', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      const intervalId = wrapper.state().progressInterval
      wrapper.setProps({ loading: 0 })
      expect(wrapper.state().percent).toBe(100)
      wrapper.setProps({ loading: 1 })
      expect(wrapper.state().progressInterval).toEqual(intervalId)
    })
  })

  describe('#simulateProgress', () => {
    let clock

    beforeEach(() => {
      clock = lolex.install()
    })
    afterEach(() => {
      clock.uninstall()
    })

    it('sets percent to 100 if loading becomes 0', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().progressInterval).toExist()
      wrapper.setProps({ loading: 0 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().progressInterval).toNotExist()
      expect(wrapper.state().terminatingAnimationTimeout).toExist()
      expect(wrapper.state().percent).toBe(100)
    })

    it('clears interval if loading becomes 0 after one more tick', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().progressInterval).toExist()
      wrapper.setProps({ loading: 0 })
      clock.tick(UPDATE_TIME * 2)
      expect(wrapper.state().progressInterval).toNotExist()
    })

    it('resets progress if loading becomes 0 and after animations', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().percent).toBeGreaterThan(0).toBeLessThan(100)
      wrapper.setProps({ loading: 0 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().percent).toBe(100)
      clock.tick(UPDATE_TIME + ANIMATION_TIME)
      expect(wrapper.state().percent).toBe(0)
      expect(wrapper.state().terminatingAnimationTimeout).toNotExist()
    })

    describe('if percent is less than MAX_PROGRESS', () => {
      it('increases percent', () => {
        const wrapper = shallow(<LoadingBar />)
        expect(wrapper.state().percent).toBe(0)
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME)
        expect(wrapper.state().percent).toBe(PROGRESS_INCREASE)
      })
    })

    describe('if percent is MAX_PROGRESS', () => {
      it('does not increase percent further', () => {
        const wrapper = shallow(<LoadingBar />)
        expect(wrapper.state().percent).toBe(0)
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME * 100)
        expect(wrapper.state().percent).toBeLessThan(MAX_PROGRESS)
        clock.tick(UPDATE_TIME)
        expect(wrapper.state().percent).toBeLessThan(MAX_PROGRESS)
      })
    })

    describe('if showLoading is called during terminating animation', () => {
      let spySimulateProgress

      beforeEach(() => {
        spySimulateProgress = spyOn(
          LoadingBar.prototype,
          'simulateProgress',
        ).andCallThrough()
      })
      afterEach(() => {
        spySimulateProgress.restore()
      })

      it('does not hang and resets the position', () => {
        const wrapper = shallow(<LoadingBar />)

        // Show Loading Bar
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME)
        expect(wrapper.state().progressInterval).toExist()

        // Hide Loading Bar, let the percent become 100 and
        // schedule the reset after animation
        wrapper.setProps({ loading: 0 })
        clock.tick(UPDATE_TIME)
        expect(wrapper.state().terminatingAnimationTimeout).toExist()

        // Wait one tick while animation is going
        clock.tick(UPDATE_TIME)

        // Show Loading Bar again
        wrapper.setProps({ loading: 1 })
        expect(wrapper.state().progressInterval).toExist()

        // It should be shown
        expect(wrapper.state().percent).toNotEqual(100)

        // Hide Loading Bar and emulate a long period of time
        wrapper.setProps({ loading: 0 })
        clock.tick(UPDATE_TIME * 1000)

        expect(spySimulateProgress.calls.length).toEqual(2)
      })
    })

    describe('if showLoading is called right after hideLoading', () => {
      let spySimulateProgress

      beforeEach(() => {
        spySimulateProgress = spyOn(
          LoadingBar.prototype,
          'simulateProgress',
        ).andCallThrough()
      })
      afterEach(() => {
        spySimulateProgress.restore()
      })

      it('does not hides and resets the position', () => {
        const wrapper = shallow(<LoadingBar />)

        // Show Loading Bar
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME)
        expect(wrapper.state().progressInterval).toExist()

        // Hiding loading bar should set percentage to 100
        wrapper.setProps({ loading: 0 })
        expect(wrapper.state().percent).toEqual(100)

        // Show Loading Bar again
        wrapper.setProps({ loading: 1 })

        // It should be shown
        expect(wrapper.state().percent).toNotEqual(100)

        // Wait one tick to get the animation going
        clock.tick(UPDATE_TIME)

        // The progress simulation is still going
        expect(wrapper.state().progressInterval).toExist()
      })
    })
  })

  describe('updateTime prop', () => {
    let clock
    let spySimulateProgress

    beforeEach(() => {
      spySimulateProgress = spyOn(
        LoadingBar.prototype,
        'simulateProgress',
      )
      clock = lolex.install()
    })
    afterEach(() => {
      spySimulateProgress.restore()
      clock.uninstall()
    })

    it('can be changed', () => {
      const updateTime = 100
      const wrapper = shallow(<LoadingBar updateTime={updateTime} />)
      wrapper.setProps({ loading: 1 })
      clock.tick(updateTime)
      expect(spySimulateProgress).toHaveBeenCalled()
      expect(spySimulateProgress.calls.length).toEqual(1)
    })
  })

  describe('maxProgress prop', () => {
    let clock

    beforeEach(() => {
      clock = lolex.install()
    })
    afterEach(() => {
      clock.uninstall()
    })

    it('can be changed', () => {
      const maxProgress = 95
      const wrapper = shallow(<LoadingBar maxProgress={maxProgress} />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME * 100)
      expect(wrapper.state().percent).toBeLessThan(maxProgress)
    })
  })

  describe('progressIncrease prop', () => {
    let clock

    beforeEach(() => {
      clock = lolex.install()
    })
    afterEach(() => {
      clock.uninstall()
    })

    it('can be changed', () => {
      const progressIncrease = 5
      const wrapper = shallow(
        <LoadingBar progressIncrease={progressIncrease} />,
      )
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().percent).toEqual(progressIncrease)
    })
  })
})
