import React from 'react'
import { brandName } from '../../constants/index.js'

const FooterLogo = () => {
  return (
    <div className="flex items-center gap-8">
      <div className="space-y-2">
        <span className="font-semibold text-xs">{brandName}</span>
        <p className="text-xs">© 2025 - All rights reserved.</p>
      </div>
    </div>
  )
}

export default FooterLogo