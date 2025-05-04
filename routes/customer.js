const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      Customer.find().skip(skip).limit(limit),
      Customer.countDocuments()
    ]);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: results
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/summary', async (req, res) => {
  const { groupBy } = req.query;

  try {
    if (groupBy) {
      const summary = await Customer.aggregate([
        {
          $group: {
            _id: `$${groupBy}`,
            count: { $sum: 1 }
          }
        }
      ]);

      return res.json({ field: groupBy, summary });
    }

    const fieldsToSummarize = ['gender', 'Name of Location', 'Brand Device', 'Digital Interest']; // field name 

    const summaries = {};
    for (const field of fieldsToSummarize) {
      const data = await Customer.aggregate([
        {
          $group: {
            _id: `$${field}`,
            count: { $sum: 1 }
          }
        }
      ]);
      summaries[field] = data;
    }

    res.json(summaries);
  } catch (err) {
    console.error('Summary error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
