import { useState } from "react";
import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  usePatchProductMutation,
} from "../api/fakestoreApi";

import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");

  const { data: allProducts = [], isLoading } = useGetProductsQuery();
  const { data: categoryProducts = [] } =
    useGetProductsByCategoryQuery(category, {
      skip: !category,
    });

  const { data: singleProduct } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const products = category ? categoryProducts : allProducts;

  const [deleteProduct] = useDeleteProductMutation();
  const [patchProduct] = usePatchProductMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePatch = async (id) => {
    await patchProduct({ id, price: 999 }).unwrap();
    toast.info("Price patched");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box p={3}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Product Dashboard</Typography>
        <Button color="error" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Create Product */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <ProductForm />
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="men's clothing">Men</MenuItem>
            <MenuItem value="women's clothing">Women</MenuItem>
          </TextField>

          <TextField
            label="Fetch Product by ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </Box>
      </Paper>

      {/* Single Product */}
      {singleProduct && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography>
            <strong>Fetched:</strong> {singleProduct.title}
          </Typography>
        </Paper>
      )}

      {/* Products Grid (NO MUI Grid warnings) */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={3}
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onDelete={() => deleteProduct(p.id)}
            onPatch={() => handlePatch(p.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
