import { Client } from "node-rest-client";

const client = new Client();



export const sendEmail =(subject,content,ticketId,requester,receipientEmails) => {
    const args = {
        data: {
            subject: subject,
            content: content,
            ticketId: ticketId,
            requester: requester,
            receipientEmails: [receipientEmails]


        },
        headers: { "Content-Type": "application/json" }
    };
// console.log("args data ",args.data)
//     client.post("http://127.0.0.1:8001/crm/api/notification", args, (data, response) => {
       
    console.log("request sent successfully");
    });
}
