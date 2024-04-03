import { ISchema } from '@formily/react'

export const Button: ISchema = {
  type: 'object',
  properties: {
    btnText: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    btnType: {
      enum: ['submit', 'reset', 'custom'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'submit',
      },
    },
    type: {
      enum: ['primary', 'default'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'primary',
      },
    },
  },
}
