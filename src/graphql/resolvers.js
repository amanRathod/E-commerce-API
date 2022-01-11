const mongoose = require('mongoose');
const User = require('../model/user/consumer');
const Order = require('../model/order/order');
const Product = require('../model/product/product');
const _ = require('lodash');

const resolvers = {
  Query: {
    users: async(parent, args, context, info) => {
      const users = await User.find({});
      return users;
    },
    user: async(parent, args, context, info) => {
      const user = await User.findById(args.id);
      return user;
    },
    products: async(parent, args, context, info) => {
      const products = await Product.find({});
      return products;
    },
  },
  Mutation: {
    // createUser: async(parent, args, context, info) => {
    //   const user = await new User({
    //     name: args.name,
    //     email: args.email,
    //     password: args.password,
    //   }).save();
    //   return user;
    // },
    // updateUser: async(parent, args, context, info) => {
    //   const user = await User.findByIdAndUpdate(args.id, {
    //     name: args.name,
    //     email: args.email,
    //     password: args.password,
    //   });
    //   return user;
    // },
    // deleteUser: async(parent, args, context, info) => {
    //   const user = await User.findByIdAndDelete(args.id);
    //   return user;
    // },
    createProduct: async(parent, args, context, info) => {
      const { name, price, type, stock, owner} = args.input;
      const product = await new Product({
        name,
        price,
        type,
        stock,
        owner,
      }).save();
      return product;
    },

    deleteProduct: async(parent, args, context, info) => {
      const product = await Product.deleteOne({_id: args.id});
      return product;
    },
  },
};

module.exports = { resolvers };
