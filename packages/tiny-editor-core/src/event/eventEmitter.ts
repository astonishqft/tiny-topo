import type  { EventArgs } from '../types'

export interface EventType {
  readonly callback: Function
  readonly once: boolean
}

type EventsType = Record<string, EventType[]>

type CallbackType = (...args: any) => void

class EventEmitter {
  private events: EventsType = {}

  /**
   * 事件监听
   * @date 2023/11/1 - 16:01:36
   * @author 戚付涛
   *
   * @param {string} eventName
   * @param {CallbackType} callback
   * @param {?boolean} [once]
   * @returns {this}
   */
  on(eventName: string, callback: CallbackType, once?: boolean) {
    eventName?.split(',').forEach((eventKey: string) => {
      eventKey = eventKey.trim()
      if (!this.events[eventKey]) {
        this.events[eventKey] = [];
      } else {
        this.events[eventKey].push({
          callback,
          once: !!once
        })
      }
    })

    return this
  }

  /**
   * 监听一个事件一次
   * @date 2023/11/1 - 19:24:27
   * @author 戚付涛
   *
   * @param {string} eventName
   * @param {CallbackType} callback
   */
  once(eventName: string, callback: CallbackType) {
    return this.on(eventName, callback, true)
  }

  /**
   * 触发一个事件
   * @date 2023/11/1 - 19:17:15
   * @author 戚付涛
   *
   * @param {string} eventName
   * @param {EventArgs} eventArgs
   */
  emit(eventName: string, eventArgs: EventArgs) {
    eventName?.split(',').forEach((eventKey: string) => {
      eventKey = eventKey.trim()
      const events = this.events[eventKey] || []
      let { length } = events

      for (let i = 0; i < length; i++) {
        const { callback, once } = events[i]
        if (once) {
          events.splice(i, 1)
          if (length === 0) {
            delete this.events[eventKey]
          }
          length--
          i--
        }

        callback.apply(this, [eventArgs])
      }
    })
  }

  /**
   * 取消事件监听
   * @date 2023/11/1 - 19:33:54
   * @author 戚付涛
   *
   * @param {string} eventName
   * @param {?CallbackType} [callback]
   */
  off(eventName: string, callback?: CallbackType) {
    // 如果不传callback，就清除所有事件
    if (!eventName) {
      this.events = {}
    }
    eventName?.split(',').forEach((eventKey: string) => {
      if(!callback) {
        delete this.events[eventKey]
      }
      const events = this.events[eventKey] || []
      let { length } = events
      for (let i = 0; i < length; i++) {
        if (events[i].callback === callback) {
          events.splice(i, 1)
          length --
          i --
        }
      }

      if (events.length === 0) {
        delete this.events[eventKey]
      }
    })

    return this
  }
}

export default EventEmitter
