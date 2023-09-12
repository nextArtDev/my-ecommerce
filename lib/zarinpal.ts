import ZarinpalPayment from 'zarinpal-pay'
// const zarinpal = new ZarinpalPayment(Merchant, isTomam, isSandbox)
export const zarinpal = new ZarinpalPayment(
  process.env.ZARINPAL_KEY!,
  true,
  true
)
