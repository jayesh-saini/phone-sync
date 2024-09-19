const { PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

exports.saveSMS = async (sender_number, sender_name, message, receiver_number, receiver_name) => {
    const sms = await prisma.sms.create({
        data: {
            sender_number,
            sender_name,
            message,
            receiver_number,
            receiver_name,
        },
    })
    return sms
}

exports.getContacts = async () => {
    const contacts = await prisma.sms.findMany({
        select: {
            receiver_number: true,
            receiver_name: true,
            sender_name: true,
            sender_number: true
        },
        distinct: ['sender_number', 'receiver_number'],
        orderBy: {
            creation_ts: 'desc'
        }
    })
    return contacts
}

exports.getConversation = async (phoneNumber) => {
    const conversation = await prisma.sms.findMany({
        where: {
            OR: [
                { sender_number: phoneNumber },
                { receiver_number: phoneNumber }
            ]
        }
    })
    return conversation
}
