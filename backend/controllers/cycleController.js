const Cycle = require('../models/Cycle')

exports.getCycles = async (req, res) => {
  try {
    const { brand, category, search, page = 1, limit = 20 } = req.query
    const query = {}
    if (brand && brand !== 'all') query.brand = new RegExp(brand, 'i')
    if (category && category !== 'all') query.category = new RegExp(category, 'i')
    if (search) query.$or = [
      { name: new RegExp(search, 'i') },
      { brand: new RegExp(search, 'i') },
      { fullName: new RegExp(search, 'i') }
    ]
    const total = await Cycle.countDocuments(query)
    const cycles = await Cycle.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('id name brand fullName category type pricing.mrp_inr pricing.mrp_usd image skillLevel terrain tags')
    res.json({ success: true, count: cycles.length, total, cycles })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.getCycleById = async (req, res) => {
  try {
    const cycle = await Cycle.findOne({ id: req.params.id })
    if (!cycle) return res.status(404).json({ success: false, message: 'Cycle not found' })
    res.json({ success: true, cycle })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.searchCycles = async (req, res) => {
  try {
    const { q } = req.query
    if (!q) return res.json({ success: true, cycles: [] })
    const cycles = await Cycle.find({
      $or: [
        { name: new RegExp(q, 'i') },
        { brand: new RegExp(q, 'i') },
        { fullName: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') }
      ]
    }).limit(10).select('id name brand fullName category pricing.mrp_inr image')
    res.json({ success: true, cycles })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.compareCycles = async (req, res) => {
  try {
    const { ids } = req.query
    const idArray = ids.split(',')
    const cycles = await Cycle.find({ id: { $in: idArray } })
    res.json({ success: true, cycles })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.addCycle = async (req, res) => {
  try {
    const cycle = await Cycle.create(req.body)
    res.status(201).json({ success: true, cycle })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.updateCycle = async (req, res) => {
  try {
    const cycle = await Cycle.findOneAndUpdate(
      { id: req.params.id }, req.body, { new: true }
    )
    if (!cycle) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, cycle })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.deleteCycle = async (req, res) => {
  try {
    await Cycle.findOneAndDelete({ id: req.params.id })
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.bulkImport = async (req, res) => {
  try {
    const { cycles } = req.body
    await Cycle.insertMany(cycles, { ordered: false })
    res.json({ success: true, message: `${cycles.length} cycles imported` })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
