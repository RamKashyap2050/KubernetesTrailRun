const axios = require("axios");
const { Item } = require("../models");

const getUserDetails = async (userId) => {
  try {
    console.log(`Fetching details for user ID: ${userId}`);
    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    console.log(`User details fetched: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching user details for user ID ${userId}:`,
      error.message
    );
    throw new Error("Failed to fetch user details");
  }
};

exports.createItem = async (req, res) => {
  try {
    const { item_name, price, user_id } = req.body;
    const item = await Item.create({ user_id, item_name, price });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();

    const itemsWithUserDetails = await Promise.all(
      items.map(async (item) => {
        const user = await getUserDetails(item.user_id);
        return {
          id: item.id,
          item_name: item.item_name,
          price: item.price,
          user: {
            id: user.id,
            email: user.email,
            user_name: user.username,
          },
        };
      })
    );

    res.json(itemsWithUserDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
