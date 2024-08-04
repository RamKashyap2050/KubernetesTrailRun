import React, { useState } from "react";
import { useUser } from "../../UserContext";
import { Button, Typography, Toolbar, AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  avatarContainer: {
    position: "relative",
    width: "150px",
    height: "150px",
    margin: "0 auto 20px",
    cursor: "pointer",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  hoverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  uploadLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    display: "none",
  },
  changeButton: {
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

const Profile = () => {
  const { user, logout } = useUser();
  const [profilePicture, setProfilePicture] = useState(
    user.profilePicture || "default-profile.png"
  );
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar style={{ marginBottom: "1rem" }}>
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

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Profile Page of {user.user_name}</h2>
          <div
            style={styles.avatarContainer}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "https://www.clker.com/cliparts/f/a/0/c/1434020125875430376profile.png"
              }
              alt={user.user_name}
              style={styles.avatar}
            />
            {hover && (
              <div style={styles.hoverOverlay}>
                <label
                  htmlFor="profile-picture-upload"
                  style={styles.uploadLabel}
                >
                  <input
                    accept="image/*"
                    id="profile-picture-upload"
                    type="file"
                    onChange={handleProfilePictureChange}
                    style={styles.input}
                  />
                  <button style={styles.changeButton}>Change</button>
                </label>
              </div>
            )}
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={logout}>
              Logout
            </button>
            <button
              style={styles.button}
              onClick={() => navigate("/manage-items")}
            >
              Manage Items
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
