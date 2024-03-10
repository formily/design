import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { message } from 'antd'

export const saveSchema = (designer: Engine) => {
  let queryParams = Object.fromEntries(new URLSearchParams(location.search))
  let { bid } = queryParams
  if (!bid) {
    message.warning('url 异常，缺少 id 参数')
    return
  }
  let formilySchema = JSON.stringify(
    transformToSchema(designer.getCurrentTree())
  )
  console.log('formily-schema', formilySchema)
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree()))
  )
  message.success('Save Success')
}

export const loadInitialSchema = (designer: Engine) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema')))
    )
  } catch {}
}
