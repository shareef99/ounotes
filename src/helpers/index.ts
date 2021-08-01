import emailjs from "emailjs-com";
import details from "../details.json";

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

export function getSubjects(
    group: string,
    sem: string
): Array<string> | undefined {
    return details.find((x) => x.group === group && x.sem === sem)?.subjects;
}
