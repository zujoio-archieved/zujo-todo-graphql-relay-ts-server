import nodemailer from 'nodemailer';
import { join } from 'path';
import smtpTransport from 'nodemailer-smtp-transport';
import hbs from 'nodemailer-express-handlebars';
import { config } from 'dotenv';
config();

const hbsPath = join(__dirname, '../../../hbs');
const {MAIL_HOST, MAIL_PORT, EMAIL, PASS} = process.env;

export const sendMail = (to: string, name: string, subject: string, template: string) => {
    
    let options = {
        viewEngine: {
            extname: '.hbs',
            layoutsDir: `${hbsPath}/views/`,
            // defaultLayout : 'signupTemplate',
            partialsDir : `${hbsPath}/partials/`
        },
        viewPath: `${hbsPath}/views/`,
        extName: '.hbs'
    };

    let transporter = nodemailer.createTransport(smtpTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        auth: {
            user: EMAIL,
            pass: PASS
        },
        secureConnection: 'false',
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    }));

    transporter.use('compile', hbs(options));
    
    const mailOptions = {
        from: EMAIL,
        to,
        subject,
        template,
        context: {
            name,
       }
      };

    transporter.sendMail(mailOptions, (err: any, response) => {
        transporter.close();
        if(err) throw new Error(err);
        return response;
    });
}