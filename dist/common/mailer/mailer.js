"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = require("path");
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const hbsPath = path_1.join(__dirname, '../../../hbs');
const { MAIL_HOST, MAIL_PORT, EMAIL, PASS } = process.env;
exports.sendMail = (to, name, subject, template) => {
    let options = {
        viewEngine: {
            extname: '.hbs',
            layoutsDir: `${hbsPath}/views/`,
            // defaultLayout : 'signupTemplate',
            partialsDir: `${hbsPath}/partials/`
        },
        viewPath: `${hbsPath}/views/`,
        extName: '.hbs'
    };
    let transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
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
    transporter.use('compile', nodemailer_express_handlebars_1.default(options));
    const mailOptions = {
        from: EMAIL,
        to,
        subject,
        template,
        context: {
            name,
        }
    };
    transporter.sendMail(mailOptions, (err, response) => {
        transporter.close();
        if (err)
            throw new Error(err);
        return response;
    });
};
//# sourceMappingURL=mailer.js.map