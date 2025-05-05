
    const Product = require('../models/Product.model');

    // Lấy tất cả sản phẩm
    exports.getAllProducts = async () => {
        try {
            return await Product.find();
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách sản phẩm: ' + error.message);
        }
    };

    // Tạo mới sản phẩm
    exports.createProduct = async (data) => {
        try {
            return await Product.create(data);
        } catch (error) {
            throw new Error('Lỗi khi tạo sản phẩm: ' + error.message);
        }
    };

    // Xoá sản phẩm theo ID
    exports.deleteProductById = async (id) => {
        try {
            const result = await Product.findByIdAndDelete(id);
            if (!result) throw new Error('Không tìm thấy sản phẩm để xoá');
            return result;
        } catch (error) {
            throw new Error('Lỗi khi xoá sản phẩm: ' + error.message);
        }
    };

    // Cập nhật sản phẩm theo ID
    exports.updateProduct = async (id, data) => {
        try {
            const result = await Product.findByIdAndUpdate(id, data, {
                new: true, // Trả về bản ghi đã cập nhật
                runValidators: true // Đảm bảo validation trong schema
            });
            if (!result) throw new Error('Không tìm thấy sản phẩm để cập nhật');
            return result;
        } catch (error) {
            throw new Error('Lỗi khi cập nhật sản phẩm: ' + error.message);
        }
    };
