import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAddProductMutation } from "../api/fakestoreApi";
import { toast } from "react-toastify";

export default function ProductForm() {
  const [addProduct] = useAddProductMutation();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async () => {
    try {
      await addProduct({
        title,
        price,
        description: "Sample product",
        image: "https://i.pravatar.cc",
        category: "electronics",
      }).unwrap();

      toast.success("Product created");
      setTitle("");
      setPrice("");
    } catch {
      toast.error("Create failed");
    }
  };

  return (
    <Box display="flex" gap={2} mb={3}>
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
      <Button variant="contained" onClick={handleAdd}>
        ADD
      </Button>
    </Box>
  );
}
