import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendVerifyMail(username: string, token: string, email: string) {
    const url = `http://localhost:5173/${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get<string>('MAIL_FROM'),
      subject: 'Verify Your Email Address',
      template: './verify-email.template.hbs',
      context: {
        username,
        url,
      },
    });
  }
}
