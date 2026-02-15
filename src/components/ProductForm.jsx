import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAddProductMutation } from "../api/fakestoreApi";
import { toast } from "react-toastify";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [addProduct] = useAddProductMutation();

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
  
    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("Valid price required");
      return;
    }
  
    try {
      await addProduct({
        title,
        price: Number(price),
        description: "Test description",
        category: "electronics",
        image: "https://i.pravatar.cc",
      }).unwrap();
  
      toast.success("Product created");
      setTitle("");
      setPrice("");
    } catch (error) {
      toast.error("Creation failed");
    }
  };
  

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add Product
      </Button>
    </Box>
  );
}
