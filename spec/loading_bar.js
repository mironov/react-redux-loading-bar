import React from 'react'
import { shallow } from 'enzyme'
import expect, { spyOn, restoreSpies } from 'expect'
import expectJSX from 'expect-jsx'
import lolex from 'lolex'
import {
  LoadingBar,
  UPDATE_TIME,
  MAX_PROGRESS,
  PROGRESS_INCREASE,
} from '../src/loading_bar'

expect.extend(expectJSX)

describe('LoadingBar', () => {
  describe('#render', () => {
    it('renders without problems', () => {
      const wrapper = shallow(<LoadingBar />)

      expect(wrapper.node.type).toEqual('div')
    })

    it('renders by default hidden 3px height red element', () => {
      const wrapper = shallow(<LoadingBar />)

      const resultStyle = wrapper.children().node.props.style
      expect(resultStyle.display).toEqual('none')
      expect(resultStyle.backgroundColor).toEqual('red')
      expect(resultStyle.height).toEqual('3px')
    })

    it('renders an element with passed color and height', () => {
      const style = { backgroundColor: 'blue', height: '5px' }
      const wrapper = shallow(<LoadingBar style={style} />)

      const resultStyle = wrapper.children().node.props.style
      expect(resultStyle.backgroundColor).toEqual('blue')
      expect(resultStyle.height).toEqual('5px')
    })

    it('renders not hidden 3px height red element', () => {
      const wrapper = shallow(<LoadingBar loading={1} />)
      wrapper.setState({ percent: 10 })

      const resultStyle = wrapper.children().node.props.style
      expect(resultStyle.display).toEqual('block')
      expect(resultStyle.backgroundColor).toEqual('red')
      expect(resultStyle.height).toEqual('3px')
    })
  })

  describe('#componentWillMount and #componentWillReceiveProps', () => {
    let spyLaunch

    beforeEach(() => {
      spyLaunch = spyOn(LoadingBar.prototype, 'launch')
    })
    afterEach(() => {
      restoreSpies()
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
  })

  describe('#launch', () => {
    let clock
    let spySimulateProgress

    beforeEach(() => {
      spySimulateProgress = spyOn(
        LoadingBar.prototype,
        'simulateProgress'
      )
      clock = lolex.install()
    })
    afterEach(() => {
      restoreSpies()
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
  })

  describe('#simulateProgress', () => {
    let clock

    beforeEach(() => {
      clock = lolex.install()
    })
    afterEach(() => {
      clock.uninstall()
    })

    it('clears interval if loading becomes 0', () => {
      const wrapper = shallow(<LoadingBar />)
      wrapper.setProps({ loading: 1 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().interval).toExist()
      wrapper.setProps({ loading: 0 })
      clock.tick(UPDATE_TIME)
      expect(wrapper.state().interval).toNotExist()
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
        clock.tick(UPDATE_TIME * (MAX_PROGRESS / PROGRESS_INCREASE))
        expect(wrapper.state().percent).toBe(MAX_PROGRESS)
        clock.tick(UPDATE_TIME)
        expect(wrapper.state().percent).toBe(MAX_PROGRESS)
      })
    })
  })
})
