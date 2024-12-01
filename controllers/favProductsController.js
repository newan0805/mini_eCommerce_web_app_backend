const Favorite = require("../models/Favorite");
const authMiddleware = require("../middleware/authMiddleware");

exports.getFavorites = [authMiddleware, async (req, res) => {
    try {
        const vendorId = req.user.id;

        const favorite = await Favorite.findOne({ vendor: vendorId }).populate(
            "products"
        );

        if (!favorite || favorite.products.length === 0) {
            return res.status(200).json({ error: "No favorites found for this vendor" });
        }

        const products = favorite.products.map((product) => ({
            ...product.toObject(),
            isFavorite: true,
        }));

        res.status(200).json({
            success: true,
            favorites: products,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

exports.toggleFavorite = [authMiddleware, async (req, res) => {
    try {
        const vendorId = req.user.id;
        const { id: productId } = req.params;

        // console.log(vendorId, productId);

        let favorite = await Favorite.findOne({ vendor: vendorId });

        if (!favorite) {
            favorite = new Favorite({
                vendor: vendorId,
                products: [productId],
            });
        } else {
            const isFavorite = favorite.products.includes(productId);

            if (isFavorite) {
                favorite.products = favorite.products.filter(
                    (id) => id.toString() !== productId
                );
            } else {
                favorite.products.push(productId);
            }
        }

        await favorite.save();

        res.status(200).json({
            success: true,
            message: favorite.products.includes(productId)
                ? "Product added to favorites"
                : "Product removed from favorites",
            favorites: favorite.products,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];
