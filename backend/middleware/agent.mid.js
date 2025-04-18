function agentMiddleware(req, res, next) {
    if (req.userRole !== 'agent') {
        return res.status(403).json({ error: "Access denied. agents only." });
    }
    next();
}

module.exports = agentMiddleware;
