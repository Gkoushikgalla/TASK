import { useState } from "react";
import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  usePatchProductMutation,
  useUpdateProductMutation,
} from "../api/fakestoreApi";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");

  const { data: products = [], isLoading } = useGetProductsQuery();
  const { data: categoryProducts = [] } =
    useGetProductsByCategoryQuery(category, { skip: !category });
  const { data: singleProduct } =
    useGetProductByIdQuery(productId, { skip: !productId });

  const finalProducts = category ? categoryProducts : products;

  const [deleteProduct] = useDeleteProductMutation();
  const [patchProduct] = usePatchProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePut = async (id) => {
    await updateProduct({
      id,
      title: "Updated Product",
      price: 500,
      description: "Updated using PUT",
      image: "https://i.pravatar.cc",
      category: "electronics",
    }).unwrap();
    toast.success("Product updated (PUT)");
  };

  const handlePatch = async (id) => {
    await patchProduct({ id, price: 999 }).unwrap();
    toast.info("Product patched");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Dashboard</Typography>
        <Button color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <ProductForm />
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2}>
        <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ minWidth: 220 }}
        >
  <MenuItem value="">All</MenuItem>
  <MenuItem value="electronics">Electronics</MenuItem>
  <MenuItem value="jewelery">Jewelery</MenuItem>
  <MenuItem value="men's clothing">Men</MenuItem>
  <MenuItem value="women's clothing">Women</MenuItem>
</TextField>


          <TextField
            label="Fetch product by ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </Box>
      </Paper>

      {singleProduct && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography>
            Fetched: <strong>{singleProduct.title}</strong>
          </Typography>
        </Paper>
      )}

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px,1fr))"
        gap={3}
      >
        {finalProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onPut={() => handlePut(p.id)}
            onPatch={() => handlePatch(p.id)}
            onDelete={() => deleteProduct(p.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
