import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Container,
} from "@mui/material";
import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  usePatchProductMutation,
  useUpdateProductMutation,
} from "../api/fakestoreApi";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET ALL PRODUCTS
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsQuery();

  // GET BY CATEGORY
  const {
    data: categoryProducts = [],
  } = useGetProductsByCategoryQuery(category, {
    skip: !category,
  });

  const finalProducts = category ? categoryProducts : products;

  // --------------------------
  // SEARCH BY ID (PROPER)
  // --------------------------
  const isValidId =
    productId !== "" &&
    !isNaN(productId) &&
    Number(productId) > 0;

  const {
    data: singleProduct,
    error: singleError,
    isFetching: isSearching,
  } = useGetProductByIdQuery(productId, {
    skip: !isValidId,
  });

  // --------------------------
  // FINAL FILTER LOGIC
  // --------------------------
  const filteredProducts = useMemo(() => {
    // If searching by ID → show only that product
    if (isValidId) {
      if (singleProduct) {
        return [singleProduct];
      }
      return [];
    }

    // Otherwise filter by name
    return finalProducts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [finalProducts, searchTerm, isValidId, singleProduct]);

  const [deleteProduct] = useDeleteProductMutation();
  const [patchProduct] = usePatchProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handlePut = async (id) => {
    try {
      await updateProduct({
        id,
        title: "Updated Product",
        price: 500,
        description: "Updated using PUT",
        image: "https://i.pravatar.cc",
        category: "electronics",
      }).unwrap();

      toast.success("Product updated (PUT)");
    } catch {
      toast.error("Update failed");
    }
  };

  const handlePatch = async (id) => {
    try {
      await patchProduct({ id, price: 999 }).unwrap();
      toast.info("Product patched (PATCH)");
    } catch {
      toast.error("Patch failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // MAIN LOADING
  if (isLoading) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Loading products...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error">
          Failed to load products.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Product Dashboard</Typography>
        <Button color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <ProductForm />
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
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
            error={productId !== "" && !isValidId}
            helperText={
              productId !== "" && !isValidId
                ? "Enter a valid numeric ID"
                : ""
            }
          />

          <TextField
            label="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Paper>

      {/* SEARCH LOADING */}
      {isSearching && (
        <Typography sx={{ mb: 2 }}>
          Searching product...
        </Typography>
      )}

      {/* SEARCH ERROR */}
      {isValidId && singleError && (
        <Typography color="error" sx={{ mb: 2 }}>
          Product not found
        </Typography>
      )}

      {filteredProducts.length === 0 &&
        !isSearching &&
        !singleError && (
          <Typography>No products available.</Typography>
        )}

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px,1fr))"
        gap={3}
      >
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onPut={() => handlePut(p.id)}
            onPatch={() => handlePatch(p.id)}
            onDelete={() => handleDelete(p.id)}
          />
        ))}
      </Box>
    </Container>
  );
}
