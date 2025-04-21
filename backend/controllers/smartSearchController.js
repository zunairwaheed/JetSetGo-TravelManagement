import Tour from '../models/Tour.js';
import { getSmartFilters } from '../utils/aiParser.js';

export const smartSearch = async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid search query' });
  }

  try {
    const filters = await getSmartFilters(query);


    if (!filters || typeof filters !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid filters generated' });
    }

    const mongoQuery = {};


    if (filters.price?.max) {
      mongoQuery.price = { $lte: filters.price.max };
    }

    if (filters.continent) {
      mongoQuery.country = { $regex: filters.continent, $options: 'i' };
    }

    if (filters.theme) {
      mongoQuery.desc = { $regex: filters.theme, $options: 'i' };
    }

    if (filters.dateRange?.from && filters.dateRange?.to) {
      mongoQuery.date = {
        $gte: new Date(filters.dateRange.from),
        $lte: new Date(filters.dateRange.to)
      };
    }

    const results = await Tour.find(mongoQuery);

    res.status(200).json({ success: true, data: results });
  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message ? `Smart search failed: ${err.message}` : 'Smart search failed',
    });
  }
};

