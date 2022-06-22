const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }



    async sendActivationMail(to, link) {
        console.log(":ss")
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Активация аккаунта на ' + process.env.API_URL,
                text: '',
                html:
                    `
                        <div>
                            <h1>Для активации перейдите по ссылке</h1>
                            <a href="${link}">${link}</a>
                        </div>
                    `
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    async sendByuMail(to, service,time,date) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Покупка послуги' + service,
            text: '',
            html:
                `
                    <div>
                        <h1>Ви замовили поcлугу ${service} на сайті Relax+ </h1>
                        <p>Послугу буде проведено ${date} в ${time} годині</p>
                        <p>У з в'язку з війною ми змушені відключити оплату карткою. З Вами зв'яжется наш менеджер. Чекайте.</p>
                        <p>Крнтактний номер менеджера +38023512478</p>
                        <p>Дякуємо за покупку</p>
                    </div>
                `
        })
    }
}

module.exports = new MailService();
