import { Resend } from 'resend';

export let resend = new Resend(process.env.RESEND_API_KEY);