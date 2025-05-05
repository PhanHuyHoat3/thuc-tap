    const ProductService = require('../services/product.Services');

    // Lấy tất cả sản phẩm
    exports.getAllProducts = async (req, res) => {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    // Tạo sản phẩm mới
    exports.createProduct = async (req, res) => {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json({ success: true, data: newProduct });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };

    // Xoá sản phẩm theo ID
    exports.deleteProductById = async (req, res) => {
        try {
            const deletedProduct = await ProductService.deleteProductById(req.params.id);
            res.status(200).json({ success: true, data: deletedProduct });
        } catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    };

    // Cập nhật sản phẩm theo ID
    exports.updateProduct = async (req, res) => {
        try {
            const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
            res.status(200).json({ success: true, data: updatedProduct });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    };
