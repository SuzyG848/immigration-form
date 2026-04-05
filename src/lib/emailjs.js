import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_wxs1f5n'
const TEMPLATE_ID = 'template_uibeo1d'
const PUBLIC_KEY = 'I6t3xxW1XlhF29Icb'
const CONSULTANT_EMAIL = 'suzyguo@hotmail.com'

export async function sendNotification(clientEmail) {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        client_email: clientEmail,
        submit_time: new Date().toLocaleString('zh-CN', { timeZone: 'America/Toronto' }),
        to_email: CONSULTANT_EMAIL,
      },
      PUBLIC_KEY
    )
    return true
  } catch (e) {
    console.error('邮件发送失败', e)
    return false
  }
}
