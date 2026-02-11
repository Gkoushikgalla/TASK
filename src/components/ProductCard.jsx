import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function ProductCard({
  product,
  onDelete,
  onPatch,
  onPut,
}) {
  return (
    <Card>
      <CardContent>
        <Typography fontWeight={600}>
          {product.title}
        </Typography>
        <Typography>${product.price}</Typography>

        <Stack direction="row" spacing={1} mt={2}>
          <Button size="small" onClick={onPut}>
            Update (PUT)
          </Button>
          <Button size="small" onClick={onPatch}>
            Patch
          </Button>
          <Button size="small" color="error" onClick={onDelete}>
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
