'use client'
import React, { useEffect, useState } from 'react'
import OtpInput from './otpInput'

function OtpPage() {
  const [otp, setOtp] = useState('')
  const [otpNumber, setOtpNumber] = useState(0)
  const onChange = (value: string) => setOtp(value)
  useEffect(() => {
    if (otp.length === 6) {
      setOtpNumber(Number(otp))
    }
  }, [otp])
  const isTrue = otpNumber === 545454
  console.log(otpNumber)
  console.log(typeof otpNumber)
  console.log(isTrue)
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <OtpInput value={otp} valueLength={6} onChange={onChange} />
    </div>
  )
}

export default OtpPage
