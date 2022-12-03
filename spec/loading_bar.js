/* eslint import/no-extraneous-dependencies: 0 */
import React from 'react'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Enzyme, { shallow, mount } from 'enzyme'
import expect, { spyOn } from 'expect'
import expectJSX from 'expect-jsx'
import lolex from 'lolex'
import { JSDOM } from 'jsdom'

import {
  LoadingBar,
  UPDATE_TIME,
  MAX_PROGRESS,
  PROGRESS_INCREASE,
  ANIMATION_DURATION,
} from '../src/loading_bar'

Enzyme.configure({ adapter: new Adapter() })
expect.extend(expectJSX)

// Setup jsdom to let enzyme's mount work
const dom = new JSDOM('<!doctype html><html><body></body></html>')
global.window = dom.window
global.document = dom.window.document

describe('LoadingBar', () => {
  describe('render', () => {
    it('renders without problems', () => {
      const wrapper = shallow(<LoadingBar />)

      expect(wrapper.getElement().type).toEqual('div')
    })

    it('renders an empty div when loading is not passed', () => {
      const wrapper = shallow(<LoadingBar />)

      wrapper.equals(<div />)
    })

    it('renders not hidden 3px height red element', () => {
      const wrapper = mount(<LoadingBar loading={1} />)
      wrapper.setState({ percent: 10 })

      const resultStyle = wrapper.find('div').at(1).props().style
      expect(resultStyle.opacity).toEqual('1')
      expect(resultStyle.backgroundColor).toEqual('red')
      expect(resultStyle.height).toEqual('3px')
      expect(resultStyle.position).toEqual('absolute')
    })

    it('renders an element with passed color and height', () => {
      const style = { backgroundColor: 'blue', height: '5px' }
      const wrapper = mount(<LoadingBar loading={1} style={style} />)

      const resultStyle = wrapper.find('div').at(1).props().style
      expect(resultStyle.backgroundColor).toEqual('blue')
      expect(resultStyle.height).toEqual('5px')
    })

    it('does not apply styling if CSS class is specified', () => {
      const wrapper = mount(<LoadingBar loading={1} className="custom" />)

      const resultStyle = wrapper.find('div').at(1).props().style
      expect(resultStyle.backgroundColor).toEqual(undefined)
      expect(resultStyle.height).toEqual(undefined)
      expect(resultStyle.position).toEqual(undefined)
    })

    it('renders multiple instances in the same dom', () => {
      const wrapper = mount(
        <section>
          <LoadingBar loading={1} />
          <LoadingBar loading={1} scope="someScope" className="custom" />
        </section> // eslint-disable-line comma-dangle
      )

      const sectionWrapper = wrapper.find('section').at(0)

      const loadingBarDefault = sectionWrapper.childAt(0).find('div').at(1)
      expect(loadingBarDefault.props().className).toEqual('')
      expect(loadingBarDefault.props().style.opacity).toEqual('0')
      expect(loadingBarDefault.props().style.backgroundColor).toEqual('red')
      expect(loadingBarDefault.props().style.height).toEqual('3px')

      const loadingBarCustom = sectionWrapper.childAt(1).find('div').at(1)
      expect(loadingBarCustom.props().className).toEqual('custom')
      expect(loadingBarCustom.props().style.backgroundColor).toEqual(undefined)
      expect(loadingBarCustom.props().style.height).toEqual(undefined)
      expect(loadingBarCustom.props().style.position).toEqual(undefined)
    })
  })

  describe('update props', () => {
    let spyStart
    let clock

    beforeEach(() => {
      spyStart = spyOn(LoadingBar.prototype, 'start').andCallThrough()
      clock = lolex.install()
    })
    afterEach(() => {
      spyStart.restore()
      clock.uninstall()
    })

    it('does not start on component mount', () => {
      shallow(<LoadingBar />)
      expect(spyStart).toNotHaveBeenCalled()
      expect(spyStart.calls.length).toEqual(0)
    })

    it('starts on loading count increase', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      expect(spyStart).toHaveBeenCalled()
      expect(spyStart.calls.length).toEqual(1)
    })

    it('does not start if loading count is not increased', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 0 })
      expect(spyStart).toNotHaveBeenCalled()
      expect(spyStart.calls.length).toEqual(0)
    })

    it('starts on component mount if loading count is > 0', () => {
      mount(<LoadingBar loading={1} />)
      expect(spyStart).toHaveBeenCalled()
      expect(spyStart.calls.length).toEqual(1)
    })

    it('starts only once if loading count is increased to 2', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      wrapper.setProps({ loading: 2 })
      expect(spyStart).toHaveBeenCalled()
      expect(spyStart.calls.length).toEqual(1)
    })

    describe('when showFastActions not set', () => {
      it('does not show loading bar on quickly finished actions', () => {
        const wrapper = shallow(<LoadingBar />)
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME - 1) // less than first simulation
        wrapper.setProps({ loading: 0 })
        clock.tick(1)
        expect(wrapper.state().percent).toBe(0)
      })
    })

    describe('when showFastActions is set', () => {
      it('shows loading bar on quickly finished actions', () => {
        const wrapper = shallow(<LoadingBar showFastActions />)
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME - 1) // less than first simulation
        wrapper.setProps({ loading: 0 })
        clock.tick(1)
        expect(wrapper.state().percent).toBe(100)
      })
    })
  })

  describe('unmount', () => {
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
      expect(wrapper.instance().progressIntervalId).toNotEqual(null)
      wrapper.unmount()
      clock.tick(UPDATE_TIME)
      expect(consoleSpy).toNotHaveBeenCalled()
    })

    it('does not throw errors in the console after loading', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      wrapper.setProps({ loading: 0 })
      expect(wrapper.instance().terminatingAnimationTimeoutId).toExist()
      wrapper.unmount()
      clock.tick(ANIMATION_DURATION)
      expect(consoleSpy).toNotHaveBeenCalled()
    })
  })

  describe('progress', () => {
    let wrapper
    let clock
    let spySimulateProgress

    beforeEach(() => {
      wrapper = shallow(<LoadingBar />)
      spySimulateProgress = spyOn(
        wrapper.instance(),
        'simulateProgress',
      ).andCallThrough()
      clock = lolex.install()
    })
    afterEach(() => {
      spySimulateProgress.restore()
      clock.uninstall()
    })

    it('schedules simulateProgress on UPDATE_TIME', () => {
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(spySimulateProgress).toHaveBeenCalled()
      expect(spySimulateProgress.calls.length).toEqual(1)
    })

    it('does not schedule simulateProgress before UPDATE_TIME', () => {
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME - 1)
      expect(spySimulateProgress).toNotHaveBeenCalled()
      expect(spySimulateProgress.calls.length).toEqual(0)
    })

    it('schedules simulateProgress twice after UPDATE_TIME * 2', () => {
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      clock.tick(UPDATE_TIME)
      expect(spySimulateProgress).toHaveBeenCalled()
      expect(spySimulateProgress.calls.length).toEqual(2)
    })

    it('does not set second interval if loading bar is already shown', () => {
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      const intervalId = wrapper.instance().progressIntervalId
      expect(wrapper.state().percent).toNotBe(100)
      wrapper.setProps({ loading: 2 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.instance().progressIntervalId).toEqual(intervalId)
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
      expect(wrapper.instance().progressIntervalId).toExist()
      wrapper.setProps({ loading: 0 })
      expect(wrapper.instance().progressIntervalId).toNotExist()
      expect(wrapper.instance().terminatingAnimationTimeoutId).toExist()
      expect(wrapper.state().percent).toBe(100)
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().percent).toBe(0)
      expect(wrapper.instance().terminatingAnimationTimeoutId).toNotExist()
    })

    it('clears interval if loading becomes 0 after one more tick', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.instance().progressIntervalId).toExist()
      wrapper.setProps({ loading: 0 })
      clock.tick(UPDATE_TIME)
      clock.tick(UPDATE_TIME)
      expect(wrapper.instance().progressIntervalId).toNotExist()
    })

    it('resets progress if loading becomes 0 and another progress '
       + 'started right away (loading > 0)', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().percent).toBeGreaterThan(0).toBeLessThan(100)

      wrapper.setProps({ loading: 0 })
      expect(wrapper.state().percent).toBe(100)

      wrapper.setProps({ loading: 1 })
      expect(wrapper.instance().terminatingAnimationTimeoutId).toNotExist()
      expect(wrapper.state().percent).toBe(0)
    })

    it('resets progress if loading becomes 0 and terminating animation '
       + 'finished', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().percent).toBeGreaterThan(0).toBeLessThan(100)
      wrapper.setProps({ loading: 0 })
      expect(wrapper.state().percent).toBe(100)
      clock.tick(UPDATE_TIME)
      clock.tick(ANIMATION_DURATION)
      expect(wrapper.state().percent).toBe(0)
      expect(wrapper.instance().terminatingAnimationTimeoutId).toNotExist()
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
      let wrapper
      let spySimulateProgress

      beforeEach(() => {
        wrapper = shallow(<LoadingBar />)
        spySimulateProgress = spyOn(
          wrapper.instance(),
          'simulateProgress',
        ).andCallThrough()
      })
      afterEach(() => {
        spySimulateProgress.restore()
      })

      it('does not hang and resets the position', () => {
        // Show Loading Bar
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME)
        expect(wrapper.instance().progressIntervalId).toExist()

        // Hide Loading Bar, let the percent become 100 and
        // schedule the reset after animation
        wrapper.setProps({ loading: 0 })
        expect(wrapper.instance().terminatingAnimationTimeoutId).toExist()

        // Wait one tick while animation is going
        clock.tick(UPDATE_TIME)

        // Show Loading Bar again
        wrapper.setProps({ loading: 1 })
        expect(wrapper.instance().progressIntervalId).toExist()

        clock.tick(UPDATE_TIME)

        // It should be shown
        expect(wrapper.state().percent).toBeGreaterThan(0).toBeLessThan(100)

        // Hide Loading Bar and emulate a long period of time
        wrapper.setProps({ loading: 0 })
        clock.tick(UPDATE_TIME * 1000)

        expect(spySimulateProgress.calls.length).toEqual(2)
      })
    })

    describe('if showLoading is called right after hideLoading', () => {
      let wrapper
      let spySimulateProgress

      beforeEach(() => {
        wrapper = shallow(<LoadingBar />)
        spySimulateProgress = spyOn(
          wrapper.instance(),
          'simulateProgress',
        ).andCallThrough()
      })
      afterEach(() => {
        spySimulateProgress.restore()
      })

      it('does not hide and resets the position', () => {
        // Show Loading Bar
        wrapper.setProps({ loading: 1 })
        clock.tick(UPDATE_TIME)
        expect(wrapper.instance().progressIntervalId).toExist()

        // Hiding loading bar should set percentage to 100
        wrapper.setProps({ loading: 0 })
        expect(wrapper.state().percent).toEqual(100)

        clock.tick(UPDATE_TIME)

        // Show Loading Bar again
        wrapper.setProps({ loading: 1 })

        // It should be shown
        expect(wrapper.state().percent).toNotEqual(100)

        // Wait one tick to get the animation going
        clock.tick(UPDATE_TIME)

        // The progress simulation is still going
        expect(wrapper.instance().progressIntervalId).toExist()
      })
    })
  })

  describe('updateTime prop', () => {
    const updateTime = 100
    let wrapper
    let clock
    let spySimulateProgress

    beforeEach(() => {
      wrapper = shallow(<LoadingBar updateTime={updateTime} />)
      spySimulateProgress = spyOn(
        wrapper.instance(),
        'simulateProgress',
      )
      clock = lolex.install()
    })
    afterEach(() => {
      spySimulateProgress.restore()
      clock.uninstall()
    })

    it('can be changed', () => {
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

  describe('direction prop', () => {
    let clock

    beforeEach(() => {
      clock = lolex.install()
    })
    afterEach(() => {
      clock.uninstall()
    })

    it('simulates progress from left to right by default', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)

      const resultStyle = wrapper.find('div').at(1).props().style
      expect(resultStyle.width).toEqual('20%')
      const parentStyle = wrapper.find('div').at(0).props().style
      expect(parentStyle.direction).toEqual('ltr')
    })

    it('can simulate progress from right to left', () => {
      const wrapper = shallow(<LoadingBar direction="rtl" />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)

      const resultStyle = wrapper.find('div').at(1).props().style
      expect(resultStyle.width).toEqual('20%')
      const parentStyle = wrapper.find('div').at(0).props().style
      expect(parentStyle.direction).toEqual('rtl')
    })
  })
})
