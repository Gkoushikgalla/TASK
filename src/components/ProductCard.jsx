import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CardActions,
} from "@mui/material";

export default function ProductCard({ product, onDelete, onPatch }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {product.title}
        </Typography>

        <Typography color="text.secondary" mt={1}>
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ mt: "auto" }}>
        <Stack direction="row" spacing={1}>
          <Button size="small" color="error" onClick={onDelete}>
            Delete
          </Button>
          <Button size="small" variant="outlined" onClick={onPatch}>
            Patch
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
