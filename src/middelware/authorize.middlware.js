function isAdmin(req, res, next){
    if(req.user.role !== "admin"){
        return res.status(403).json({ error:"sir ap kahan?? admin can performmmmm :(( 😭"})
    }
    next();
}

module.exports = isAdmin;