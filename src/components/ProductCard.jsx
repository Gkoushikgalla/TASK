import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function ProductCard({ product, onDelete, onPut, onPatch }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ID: {product.id}
          </Typography>
        <Typography color="text.secondary">
          ${product.price}
        </Typography>
        <Typography variant="body2">
          {product.category}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={onPut}>
          PUT
        </Button>
        <Button size="small" onClick={onPatch}>
          PATCH
        </Button>
        <Button size="small" color="error" onClick={onDelete}>
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}
