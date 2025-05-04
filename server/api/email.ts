export default defineEventHandler(() => {
  const { sendMail } = useNodeMailer()

  return sendMail({ subject: 'Nuxt + nodemailer + Q internal', text: 'Hello from nuxt-nodemailer!', to: 'phil.tranquyet@gmail.com' })
})
