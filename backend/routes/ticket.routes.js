const express = require("express");
const { createTicket, updateTicket, deleteTicket, getTickets, ticketDetails, myTickets } = require("../controllers/ticket.controller.js");
const userMiddleware = require("../middleware/user.mid.js");
const agentMiddleware = require("../middleware/agent.mid.js");

const router = express.Router();

router.post("/create", userMiddleware, createTicket); // user can create ticket
router.put("/update/:ticketId", userMiddleware, agentMiddleware, updateTicket); // only agent can update
router.delete("/delete/:ticketId", userMiddleware, agentMiddleware, deleteTicket); // only agent can delete
router.get("/tickets", userMiddleware,agentMiddleware, getTickets); // only agent can access all tickets
router.get("/:ticketId", userMiddleware, ticketDetails); //get single ticket by Id
router.get("/my/tickets", userMiddleware, myTickets); // user's own tickets

module.exports = router;
