import React, {
  FunctionComponent,
  useEffect,
  useState,
  ReactNode,
  useContext,
  useRef,
  useMemo,
} from 'react'
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { BasicComponent, ComponentDefaults } from '@/utils/typings'
import CollapseContext from '../collapse/context'

export interface CollapseItemProps extends BasicComponent {
  title: ReactNode
  name: string
  isOpen: boolean
  expandIcon: ReactNode
  disabled: boolean
  rotate: number
  extra: ReactNode
}

const defaultProps = {
  ...ComponentDefaults,
  title: null,
  name: '',
  isOpen: false,
  expandIcon: null,
  disabled: false,
  rotate: 180,
  extra: null,
} as CollapseItemProps
export const CollapseItem: FunctionComponent<
  Partial<CollapseItemProps> &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>
> = (props) => {
  const {
    children,
    title,
    isOpen,
    name,
    disabled,
    expandIcon,
    rotate,
    extra,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }

  const classPrefix = 'nut-collapse-item'
  const context = useContext(CollapseContext)
  // 获取 Dom 元素
  const wrapperRef: any = useRef(null)
  const contentRef: any = useRef(null)
  const [iconStyle, setIconStyle] = useState({
    transform: 'translateY(-50%)',
  })
  const [refRandomId] = useState(() => Math.random().toString(36).slice(-8))
  const target = `#nut-collapse__content-${refRandomId}`

  const expanded = useMemo(() => {
    if (context) {
      return context.isOpen(name)
    }
    return false
  }, [name, context.isOpen])

  const handleClick = () => {
    context.updateValue(name)
  }

  const [timer, setTimer] = useState<any>(null)
  const [currentHeight, setCurrentHeight] = useState<string>('auto')
  const inAnimation = useRef(false)
  const [wrapperHeight, setWrapperHeight] = useState(() =>
    expanded ? 'auto' : '0px'
  )

  const getRect = (selector: string) => {
    return new Promise((resolve) => {
      Taro.createSelectorQuery()
        .select(selector)
        .boundingClientRect()
        .exec((rect = []) => {
          resolve(rect[0])
        })
    })
  }

  useEffect(() => {
    setTimeout(() => {
      getRect(target).then((res: any) => {
        if (res?.height) {
          setCurrentHeight(`${res.height}px`)
        }
      })
    }, 200)
  }, [children])

  useEffect(() => {
    setTimeout(() => {
      getRect(target).then((res: any) => {
        if (res?.height) {
          setCurrentHeight(`${res.height}px`)
        }
      })
    }, 100)
  }, [])

  const toggle = () => {
    // 连续切换状态时，清除打开的后续操作
    if (timer) {
      clearTimeout(timer)
      setTimer(timer)
    }
    const start = expanded ? '0px' : currentHeight
    const end = expanded ? currentHeight : '0px'
    inAnimation.current = true
    setWrapperHeight(start)
    const newIconStyle = expanded
      ? { transform: `translateY(-50%) rotate(${rotate}deg)` }
      : { transform: 'translateY(-50%)' }
    setIconStyle(newIconStyle)
    setTimeout(() => {
      setWrapperHeight(end)
      inAnimation.current = false
      if (expanded) {
        const timer = setTimeout(() => {
          setWrapperHeight('auto')
        }, 300)
        setTimer(timer)
      }
    }, 100)
  }

  useEffect(toggle, [expanded])

  return (
    <div className={classPrefix} {...rest}>
      <div
        className={classNames(`${classPrefix}__header`, { disabled })}
        onClick={handleClick}
      >
        <div className={`${classPrefix}__title`}>{title}</div>
        <div className={`${classPrefix}__extra`}>{extra}</div>
        <div className={`${classPrefix}__icon-box`}>
          <div className={`${classPrefix}__icon`} style={iconStyle}>
            {expandIcon || context.expandIcon}
          </div>
        </div>
      </div>
      <div
        className={`${classPrefix}__content`}
        ref={wrapperRef}
        style={{
          willChange: 'height',
          height: wrapperHeight,
        }}
      >
        <div
          ref={contentRef}
          className={`${classPrefix}__content-text`}
          id={`nut-collapse__content-${refRandomId}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

CollapseItem.defaultProps = defaultProps
CollapseItem.displayName = 'NutCollapseItem'
