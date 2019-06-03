import Mailgun from 'mailgun-js'
import config from './config'

import { formatEmail } from './email'

const mailgun = new Mailgun({
  apiKey: config.mailgun.key,
  domain: config.mailgun.domain
})

interface IEmailConfig {
  from: string
  to: string
  subject: string
  html: string
}

const sendEmail = (
  config: IEmailConfig
): Promise<Mailgun.messages.SendResponse> =>
  new Promise((resolve, reject) => {
    mailgun.messages().send(config, (error, body) => {
      if (error) {
        reject(error)
      }
      resolve(body)
    })
  })

export const sendVerifyEmail = (
  email: string,
  id: string
): Promise<Mailgun.messages.SendResponse> => {
  const subject = `Verify your email address`
  const template = formatEmail({
    body: {
      style: `font-size: 18px; font-family: sans-serif; font-weight:400; color:#222222; text-align:center;`
    },
    title: `WalletConnect Pay - ${subject}`,
    description: {
      text: `Just one more step.. Verify your email`,
      style: `font-size: 20px; margin: 20px auto 40px;`
    },
    logo: {
      width: 35,
      src: `https://${config.host}/walletconnect-pay-logo.png`,
      alt: 'WalletConnect Pay'
    },
    button: {
      text: 'Submit',
      href: `https://${config.host}/email-verification?id=${id}&email=${email}`,
      style: `
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
        position: relative;
        background-color: rgb(45, 42, 42);
        color: rgb(255, 255, 255);
        box-shadow: rgba(50, 50, 93, 0.11) 0px 4px 6px 0px, rgba(0, 0, 0, 0.08) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 0px 1px 0px inset;
        margin-top: 0px;
        font-size: 18px;
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        cursor: pointer;
        will-change: transform;
        transition: all 0.15s ease-in-out 0s;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        border-radius: 6px;
        padding: 0.5em 0.75em;
      `
    }
  })
  const emailConfig = {
    from: `WalletConnect Pay <noreply@${config.host}>`,
    to: email,
    subject,
    html: template
  }
  return sendEmail(emailConfig)
}
