const Order = require('../../../../model/order/order');

exports.getOneOrder = async(req, res, next) => {
  try {

    const orderId = req.params.orderId;
    const order = await Order.findById({ _id: orderId});
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });

  } catch (err) {
    next(err);
  }
};

exports.getAllOrder = async(req, res, next) => {
  try {

    const orders = await Order.find();
    return res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (err) {
    next(err);
  }
};
