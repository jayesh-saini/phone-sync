const { saveSMS, getConversation, getContacts } = require('../models/db')

exports.sendSMS = async (req, res) => {
    const {sender_number, sender_name, message, receiver_number, receiver_name } = req.body

    const sms = await saveSMS(sender_number, sender_name, message, receiver_number, receiver_name);

    console.log({sms});

    res.json({
        success: true,
        message: 'SMS saved successfully',
    })
}

exports.getContacts = async (req, res) => {
    const contactData = await getContacts()

    const contacts = contactData.map((contact) => {
        return {
            name: contact.receiver_name || contact.sender_name,
            phoneNumber: contact.receiver_number || contact.sender_number
        }
    })

    const uniqueContacts = contacts.filter((item, index, self) =>
        index === self.findIndex((contact) => contact.phoneNumber === item.phoneNumber)
    );

    res.json({
        success: true,
        message: 'Contacts fetched successfully',
        contacts: uniqueContacts
    })
}

exports.getConversation = async (req, res) => {
    const { phoneNumber } = req.params

    const conversation = await getConversation(phoneNumber)

    res.json({
        success: true,
        message: 'Conversation fetched successfully',
        conversation: conversation
    })
}