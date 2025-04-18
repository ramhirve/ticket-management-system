const Ticket = require("../models/tickets.model.js")
const createTicket = async (req, res) => {
    const { title, description, status } = req.body;
    console.log(title, description, status)
    try {
        if (!title || !description || !status) {
            return res.status(400).json({ errors: "All fields are required" })
        }
        const ticketData = {
            title,
            description,
            status,
            createdBy: req.userId
        }
        const ticket = await Ticket.create(ticketData)
        res.json({
            message: "ticket created successfully",
            ticket
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ errors: "Erron in creating ticket" })
    }
}

const updateTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { title, description, status } = req.body;
    try {
        const ticket = await Ticket.updateOne({
            _id: ticketId,
        }, {
            title,
            description,
            status
        })
        res.status(200).json({ message: "Ticket updated successfully" })
    } catch (error) {
        res.status(500).json({ errors: "Error in updating ticket" })
        console.log("Error in updating ticket", error)
    }
}

const deleteTicket = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const ticket = await Ticket.findOneAndDelete({
            _id: ticketId,
        });
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" })
        }
        res.status(201).json({ message: "Ticket deleted successfully" })
    } catch (error) {
        res.status(500).json({ errors: "Error in deleting ticket" })
        console.log("Error in deleting ticket", error)
    }
}

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({})
        res.status(201).json({ tickets })
    } catch (error) {
        res.status(500).json({ errors: "Error in getting tickets" })
        console.log("error to get tickets", error)
    }
}

const ticketDetails = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const ticket = await Ticket.findById({ _id: ticketId });
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" })
        }
        res.status(200).json({ ticket })
    } catch (error) {
        res.status(500).json({ errors: "Error in getting ticket details" })
        console.log("Error in getting ticket details", error)
    }
}


const myTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ createdBy: req.userId });
        res.status(200).json({ tickets });
    } catch (error) {
        res.status(500).json({ errors: "Error in fetching your tickets" });
    }
};


module.exports = {
    createTicket,
    updateTicket,
    deleteTicket,
    getTickets,
    ticketDetails,
    myTickets
}