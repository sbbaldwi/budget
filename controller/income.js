const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllIncome = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('income');
        const items = await collection.find({}).toArray();
        res.status(200).json(items);
    } catch (err) {
        console.error('Error in getAllIncome:', err.message);
        res.status(500).json({ message: 'Error retrieving income', error: err.message });
    }
};

const getSingleIncome = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('income');
        const item = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!item) {
            return res.status(404).json({ message: 'Income item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving income', error: err.message });
    }
};

const createIncome = async (req, res) => {
    try {
        const { description, amount } = req.body;

        const newIncome = { description, amount };
        const db = getDb();
        const collection = db.collection('income');
        const result = await collection.insertOne(newIncome);

        res.status(201).json({ id: result.insertedId, message: 'Income created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating income', error: err.message });
    }
};

const updateIncome = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updateData = req.body;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }

        const db = getDb();
        const collection = db.collection('income');
        const result = await collection.updateOne(
            { _id: new ObjectId(itemId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating income', error: err.message });
    }
};

const deleteIncome = async (req, res) => {
    try {
        const itemId = req.params.id;
        const db = getDb();
        const collection = db.collection('income');

        const result = await collection.deleteOne({ _id: new ObjectId(itemId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting income', error: err.message });
    }
};

module.exports = {
    getAllIncome,
    getSingleIncome,
    createIncome,
    updateIncome,
    deleteIncome
};