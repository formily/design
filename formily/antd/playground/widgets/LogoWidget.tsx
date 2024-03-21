import React from 'react'
import { useTheme } from '@designable/react'

const logo = {
  dark: '//img.alicdn.com/imgextra/i2/O1CN01NTUDi81fHLQvZCPnc_!!6000000003981-55-tps-1141-150.svg',
  light:
    '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
}

export const LogoWidget: React.FC = () => {
  const url = 'http://cdn.zuo11.com/imgs/avatar.jpg'
  // logo[useTheme()]
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
      <div>
        <img
          src={url}
          style={{ margin: '12px 8px', height: 18, width: 'auto' }}
        />
        Formily 低代码设计器
      </div>
    </div>
  )
}
