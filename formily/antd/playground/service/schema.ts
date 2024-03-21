import { Engine } from '@designable/core'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { message } from 'antd'
import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

const BASE_URL = isProduction
  ? 'https://api.formily.top'
  : 'http://127.0.0.1:5000'
export const saveSchema = async (designer: Engine, isPublish: boolean) => {
  let queryParams = Object.fromEntries(new URLSearchParams(location.search))
  let { bid } = queryParams
  if (!bid) {
    message.warning('url 异常，缺少 id 参数')
    return
  }
  let formilySchemaConfig = JSON.stringify(
    transformToSchema(designer.getCurrentTree())
  )
  console.log('formily-schema', bid, formilySchemaConfig)

  try {
    const res = await axios.post(`${BASE_URL}/configList/update`, {
      bid,
      config: formilySchemaConfig,
    })
    console.log('res', res)
  } catch (e) {
    console.log(e)
  } finally {
    // loading = false
  }

  // if (isPublish) {
  //   // 发布版本
  // } else {
  //   // 保存到当前版本

  // }
  // localStorage.setItem(
  //   'formily-schema',
  //   JSON.stringify(transformToSchema(designer.getCurrentTree()))
  // )
  message.success('Save Success')
}

// 初始化低代码内容
export const loadInitialSchema = async (designer: Engine) => {
  const params = Object.fromEntries(new URLSearchParams(window.location.search))
  const { bid } = params
  if (!bid) {
    return
  }
  try {
    const res = await axios.get(`${BASE_URL}/configList/detail/${bid}`)
    console.log('res /configList/detail/', res)
    if (res.data.code === 0) {
      let schemaConfig = res?.data?.data?.config
      designer.setCurrentTree(transformToTreeNode(JSON.parse(schemaConfig)))
      // localStorage.getItem('formily-schema')
    } else {
      message.warning(res?.data?.msg || '获取配置异常')
    }
  } catch (e) {
    console.log(e)
  } finally {
    // loading = false
  }
}
