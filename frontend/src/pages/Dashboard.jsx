import React, { useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import useItemStore from "../store/ItemStore";

function Dashboard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { formData, items, setFormData, fetchItems, createItem } =
    useItemStore();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem(user.id, formData);
    setFormData({ item_name: "", price: "" }); // Reset the form
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            ItemList
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h5" style={{ marginBottom: 20 }}>
            Add Item
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Item Name"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              fullWidth
              required
              style={{ marginBottom: 20 }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
              style={{ marginBottom: 20 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Paper>
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h5" style={{ marginBottom: 20 }}>
            Products
          </Typography>
          <List>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.item_name}
                    secondary={`Price: $${item.price} - Added by: ${item.user.user_name}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    </div>
  );
}

export default Dashboard;
