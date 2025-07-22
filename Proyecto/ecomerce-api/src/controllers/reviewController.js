import Review from "../models/review";

async function getReviews(req, res) {
  try {
    const reviews = await Review.find().populate('user').populate('product').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function getReviewById(req, res) {
  try {
    const id = req.params.id;
    const review = await Review.findById(id).populate('user').populate('product');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function createReview(req, res) {
  try {
    const { user, product, rating, comment } = req.body;

    if (!user || !product || !rating) {
      return res.status(400).json({ error: 'User, product and rating are required' });
    }

    const newReview = await Review.create({ user, product, rating, comment });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function updateReview(req, res) {
    try {
        const id = req.params.id;
        const { rating, comment } = req.body;
    
        if (!rating) {
        return res.status(400).json({ error: 'Rating is required' });
        }
    
        const updatedReview = await Review.findByIdAndUpdate(id,
        { rating, comment },
        { new: true }
        );
    
        if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).send({ error });
    }
}

async function deleteReview(req, res) {
    try {
        const id = req.params.id;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error });
    }
}

export {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
}
