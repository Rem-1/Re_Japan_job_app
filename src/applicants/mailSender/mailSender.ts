import * as nodemailer from 'nodemailer'
import { CreatePositionDto } from 'src/positions/dto/create-position.dto';
import { Position } from 'src/positions/entities/position.entity';

async function sendMail(email: string, position: Position | CreatePositionDto, msg: string) {
    let testAccount: nodemailer.TestAccount = await nodemailer.createTestAccount();

    let transporter: nodemailer.Transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    const { company, level, category, japaneseRequired, description } = position

    let info = await transporter.sendMail({
        from: 'Nodemailer',
        to: email,
        subject: msg,
        html: 
        `       <h3>Position</h3>
                <ul>
                    <li>Company: ${company}</li>
                    <li>Level: ${level}</li>
                    <li>Category: ${category}</li>
                    <li>Japanese Required: ${japaneseRequired}</li>
                    <li>Description: ${description}</li>
                </ul>`
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default sendMail
