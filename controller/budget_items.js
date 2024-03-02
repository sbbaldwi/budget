const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllBudgetItems = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('budget_items');
        const items = await collection.find({}).toArray();
        res.status(200).json(items);
    } catch (err) {
        console.error('Error in getAllBudgetItems:', err.message);
        res.status(500).json({ message: 'Error retrieving budget items', error: err.message });
    }
};

const getSingleBudgetItem = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('budget_items');
        const item = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!item) {
            return res.status(404).json({ message: 'Budget item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving budget item', error: err.message });
    }
};

const createBudgetItem = async (req, res) => {
    try {
        const { category, description, amount } = req.body;
        const validCategories = ['grocery', 'gas', 'rent', 'activities', 'utilities', 'debt', 'miscellaneous'];

        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category provided' });
        }

        const newBudgetItem = { category, description, amount };
        const db = getDb();
        const collection = db.collection('budget_items');
        const result = await collection.insertOne(newBudgetItem);

        res.status(201).json({ id: result.insertedId, message: 'Budget item created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating budget item', error: err.message });
    }
};

const updateBudgetItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const updateData = req.body;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No update data provided' });
        }

        const db = getDb();
        const collection = db.collection('budget_items');
        const result = await collection.updateOne(
            { _id: new ObjectId(itemId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Budget item not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error updating budget item', error: err.message });
    }
};


const deleteBudgetItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const db = getDb();
        const collection = db.collection('budget_items');

        const result = await collection.deleteOne({ _id: new ObjectId(itemId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Budget item not found' });
        }

        res.status(200).json({ message: 'Budget item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting budget item', error: err.message });
    }
};

module.exports = {
    getAllBudgetItems,
    getSingleBudgetItem,
    createBudgetItem,
    updateBudgetItem,
    deleteBudgetItem
};