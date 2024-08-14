import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/sendVerification';


export interface Apires {
    userName: string;
    userEmail: string;
    verifyCode: string;
    success: boolean;
    message: string
}
export async function sendVerificationEmial(
    userName: string,
    userEmail: string,
    verifyCode: string
) {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: userEmail,
            subject: 'Please verify your code',
            react: VerificationEmail({ username: userName, otp: verifyCode })
        });
// console.log(userName,userEmail,verifyCode)
        return {
            success: true,
            message: 'Verification email send successsfully'
        }

    } catch (emailEroro) {
        console.log("Eror sending verification email", emailEroro)
        return {
            success: false,
            message: 'Failed to send verification email'
        }

    }
}