const express = require('express');
const { Account } = require('../db');
const { authMiddleware } = require('../middleware');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    });
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const { to, amount } = req.body;
    const account = await Account.findOne({
        userId: req.userId
    })
    const toAccount = await Account.find({
        userId: to
    })
    if (!toAccount) {
        return res.status(400).json({
            message: "Account doesn't exists"
        })
    }
    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    res.status(200).json({
        message: "Transfer successful"
    })
})
module.exports = router;