import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAddProductMutation } from "../api/fakestoreApi";
import { toast } from "react-toastify";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [addProduct] = useAddProductMutation();

  const handleSubmit = async () => {
    try {
      await addProduct({
        title,
        price,
        description: "New product",
        image: "https://i.pravatar.cc",
        category: "electronics",
      }).unwrap();

      toast.success("Product created");
      setTitle("");
      setPrice("");
    } catch {
      toast.error("Failed to create product");
    }
  };

  return (
    <Box display="flex" gap={2}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Box>
  );
}
