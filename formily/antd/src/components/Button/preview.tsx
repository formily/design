import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { Button as AntdButton } from 'antd'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

export interface IDesignableTextProps {
  value?: string
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
  style?: React.CSSProperties
  className?: string
}

export const Button: DnFC<IDesignableTextProps> = (props) => {
  console.log('props', props)
  const tagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode
  // return React.createElement(
  //   tagName,
  //   {
  //     ...props,
  //     className: cls(props.className, 'dn-text'),
  //     'data-content-editable': 'x-component-props.content',
  //   },
  //   props.content
  // )
  return (
    <AntdButton type="primary" {...props}>
      {props.btnText || '请修改按钮文案'}
    </AntdButton>
  )
}

Button.Behavior = createBehavior({
  name: 'Button',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Button',
  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.Button),
  },
  designerLocales: AllLocales.Button,
})

Button.Resource = createResource({
  icon: 'BtnSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'Button',
        'x-component-props': {
          btnText: '',
        },
      },
    },
  ],
})
