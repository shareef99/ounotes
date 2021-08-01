import emailjs from "emailjs-com";

export function sendEmail(emailParams: {
    name: string;
    email: string;
    group: string;
    sem: string;
    type: string;
    subject: string;
}): Promise<string> {
    return emailjs
        .send(
            "service_odb70fx",
            "template_5lur389",
            emailParams,
            "user_c4UeKRVawuTnuQmfFS8ct"
        )
        .then(
            (response) => {
                console.log("SUCCESS!", response.status, response.text);
                return "Request sended!";
            },
            (err) => {
                return `FAILED...", ${err}`;
            }
        );
}
