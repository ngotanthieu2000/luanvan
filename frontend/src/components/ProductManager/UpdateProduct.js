import React, { useLayoutEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { getBrandsByCategories } from "../../api/api_instance";
import { updateProduct } from "../../api/auth";
import ProcessLoadingModal from "./ProcessLoadingModal";
export default function UpdateProduct({ product, listCategories,changeView }) {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isType, setIsType] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [type, setType] = useState();
  const [isCategories, setIsCategories] = useState(0);
  const [brand, setBrand] = useState([]);
  async function fetchDataBrand(cate){
    const { element } = await getBrandsByCategories({categories:JSON.stringify(cate)});
      console.log("brand_fetch", element);
      setBrand(element);
  }
  useLayoutEffect(() => {
    setIsType(product.type)
    let index;
    for(let i = 0;i<listCategories.length;i++){
      if(listCategories[i].name === product.categories){
        index = i;
        break;
      }else{
        continue;
      }
    }
    setIsCategories(index)
    setType(listCategories[index].types)
    fetchDataBrand(listCategories[index].name)
    setAttributes(product.attributes)
  }, [product,listCategories])

  const handleAddAtribute = async (event) => {
    event.preventDefault();
    let item = { key, value };
    if (item?.key && item?.value) {
      setAttributes((current) => [...current, item]);
    }
  };
  const handleChangeType = (event) => {
    setIsType(event.target.value);
  };
  const handleChangeCategories = (event) => {
    let temp = listCategories[event.target.value].types;
    setIsCategories(event.target.value);
    setType(temp);
  };
  const [openProcessLoading,setOpenProcessLoading] = useState(false);

  //submit
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    setOpenProcessLoading(true)
    const data = new FormData(event.currentTarget);
    data.append("attributes", JSON.stringify(attributes));
    data.append("_id", product._id);
    data.append("categories", listCategories[isCategories]?.name);
    console.log({
      _id: data.get("_id"),
      name: data.get("name"),
      sku: data.get("sku"),
      type: data.get("type"),
      categories: data.get("categories"),
      price: data.get("price"),
      brand: data.get("brand"),
      description: data.get("description"),
      attributes: data.get("attributes"),
    });
    var res = await updateProduct(data);
    console.log("res updateproduct:",res)
    if(res.status==="Success"){
      setOpenProcessLoading(false)
      changeView('ListProduct');
    }

  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleUpdateProduct}
      sx={{ mt: 3 }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyItems: "center",
        }}
      >
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            label="Product Name"
            defaultValue={product?.name}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="sku"
            label="SKU"
            name="sku"
            defaultValue={product?.sku}
            autoComplete="sku"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="price"
            label="Price"
            id="price"
            autoComplete="price"
            defaultValue={product?.price}
          />
        </Grid>
        {/* <Grid item xs={12} sm={3}>
          <TextField
            required
            fullWidth
            name="sale"
            label="Sale"
            id="sale"
            autoComplete="sale"
            defaultValue={product?.sale}
          />
        </Grid> */}
        <Grid item xs={6} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="select_type">Type</InputLabel>
            <Select
              labelId="select_type"
              id="type"
              value={isType}
              label="Type"
              name="type"
              onChange={handleChangeType}
              defaultValue={product?.type}
            >
              {type && type.length > 0 ? (
                type.map((element, index) => {
                  let name = element ? element.name : "Unknow";
                  return <MenuItem value={name}>{name}</MenuItem>;
                })
              ) : (
                <MenuItem value={0}>Unknow</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        {/* categories product */}
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="select_categories">Categories</InputLabel>
            <Select
              labelId="Categories"
              id="Categories"
              value={isCategories}
              label="Categories"
              // name="Categories"
              onChange={handleChangeCategories}
            >
              {listCategories && listCategories.length > 0 ? (
                listCategories.map((element, index) => {
                  return <MenuItem value={index}>{element.name}</MenuItem>;
                })
              ) : (
                <MenuItem value={0}>Unknow</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Autocomplete
              id="auto_brand"
              name="auto_brand"
              freeSolo
              defaultValue={product?.brand}
              options={brand.map((option) => option.name)}
              renderInput={(params) => <TextField name="brand" id="brand" {...params} label="Brand" />}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete="description"
            name="description"
            required
            fullWidth
            id="description"
            label="Description"
            focused={true}
            defaultValue={product?.description}
            autoFocus
            multiline
          />
        </Grid>
        <Grid item xs={12} spacing={2}>
          <Typography variant="h6">Attributes</Typography>
          <Stack direction="row" justifyContent={"center"} spacing={2}>
            <TextField
              autoComplete="key"
              name="key"
              fullWidth
              id="key"
              label="Key"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
              }}
              autoFocus
            />
            <TextField
              autoComplete="value"
              name="value"
              id="value"
              fullWidth
              value={value}
              label="Value"
              autoFocus
              onChange={(e) => {
                setValue(e.target.value);
              }}
              multiline
            />
            <IconButton
              color="primary"
              aria-label="add an alarm"
              onClick={(e) => {
                handleAddAtribute(e);
                setKey("");
                setValue("");
              }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Grid>
        {product.attributes?.length > 0 ? (
          <Grid item xs={12} spacing={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Num</TableCell>
                    <TableCell align="right">Key</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attributes?.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell align="right">{index + 1}</TableCell>
                      <TableCell align="right">{row.key}</TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          aria-label="add an alarm"
                          onClick={(e) => {
                            let att = {
                              key: row[index]?.key,
                              value: row[index]?.value,
                            };
                            setAttributes(
                              attributes.filter((temp) => {
                                return (
                                  temp.key !== attributes[index]?.key &&
                                  temp.value !== attributes[index]?.value
                                );
                              })
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          undefined
        )}
        {/* <Grid item xs={12} sm={12}>
          <TextField
            autoComplete="attachments"
            name="attachments"
            required
            fullWidth
            id="attachments"
            autoFocus
            type="file"
            inputProps={{
              multiple: true,
            }}
          />
        </Grid> */}
      </Grid>
      <Button
        type="submit"
        //   fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // onClick={() => {
        //   handleGetType();
        // }}
      >
        Update
      </Button>
      <ProcessLoadingModal parentOpen={openProcessLoading} />
    </Box>
  );
}
