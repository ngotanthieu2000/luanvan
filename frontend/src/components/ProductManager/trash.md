<Modal
                    open={modalProduct}
                    sx={{ overflowY: "auto" ,height:'100%'}}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 1000,
                        bgcolor: "background.paper",
                        border: "1px solid #000",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Create New Product
                      </Typography>
                      <Box
                        id="modal-modal-description"
                        component="form"
                        noValidate
                        onSubmit={handleSubmitCreateProduct}
                        sx={{ mt: 3 }}
                      >
                        <Grid
                          container
                          spacing={2}
                          sx={{ display: "flex", justifyItems: "center" }}
                        >
                          {/* product name */}
                          <Grid item xs={12} sm={12}>
                            <TextField
                              autoComplete="name"
                              name="name"
                              required
                              fullWidth
                              id="name"
                              label="Product Name"
                              autoFocus
                            />
                          </Grid>
                          {/* SKU */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="sku"
                              label="SKU"
                              name="sku"
                              autoComplete="sku"
                            />
                          </Grid>
                          {/* price */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              name="price"
                              label="Price"
                              id="price"
                              autoComplete="price"
                            />
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
                                {categories && categories.length > 0 ? (
                                  categories.map((element, index) => {
                                    return (
                                      <MenuItem value={index}>{element.name}</MenuItem>
                                    );
                                  })
                                ) : (
                                  <MenuItem value={0}>Unknow</MenuItem>
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                          {/* type product */}
                          <Grid item xs={6} sm={3}>
                            <FormControl fullWidth>
                              <InputLabel id="select_type">Type</InputLabel>
                              <Select
                                labelId="select_type"
                                id="type"
                                value={isType}
                                label="Type"
                                name="type"
                                onChange={handleChangeType}
                                // defaultValue={type ? type[0].name : ""}
                              >
                                {type && type.length > 0 ? (
                                  type.map((element, index) => {
                                    let name = element
                                      ? element.name
                                      : "Unknow";
                                    return (
                                      <MenuItem value={name}>{name}</MenuItem>
                                    );
                                  })
                                ) : (
                                  <MenuItem value={'Unknow'}>Unknow</MenuItem>
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                          {/* brand */}
                          <Grid item xs={12} sm={6}>
                            <TextField
                              autoComplete="brand"
                              name="brand"
                              fullWidth
                              id="brand"
                              label="Brand"
                              autoFocus
                            />
                          </Grid>
                          {/* textfield description */}
                          <Grid item xs={12} sm={12}>
                            <TextField
                              autoComplete="description"
                              name="description"
                              // required
                              fullWidth
                              id="description"
                              label="Description"
                              maxRows={4}
                              autoFocus
                              multiline
                            />
                          </Grid>
                          {/* textfield detail */}
                          <Grid item xs={12} sm={12}>
                            <TextField
                              autoComplete="detail"
                              name="detail"
                              // required
                              fullWidth
                              id="detail"
                              label="Detail"
                              maxRows={4}
                              autoFocus
                              multiline
                            />
                          </Grid>
                          {/* input attributes {value,key} */}
                          <Grid item xs={12} spacing={2}>
                            <Typography variant="h6">Attributes</Typography>
                            <Stack
                              direction="row"
                              justifyContent={"center"}
                              spacing={2}
                            >
                              <TextField
                                autoComplete="key"
                                name="key"
                                fullWidth
                                id="key"
                                label="Key"
                                value={key}
                                onChange={(e) => {
                                  setKey(e.target.value)
                                  // setItem({ ...item, key: e.target.value });
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
                                  setValue(e.target.value)
                                  // setItem({ ...item, value: e.target.value });
                                }}
                                multiline
                              />
                              <IconButton
                                color="primary"
                                aria-label="add an alarm"
                                onClick={(e) => {
                                  handleAddAtribute(e);
                                  setKey('')
                                  setValue('')
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            </Stack>
                          </Grid>
                           {/* show table attributes */}
                          {attributes?.length > 0 ? (
                            <Grid item xs={12} spacing={2}>
                              <TableContainer component={Paper}>
                                <Table
                                  // sx={{ minWidth: 650 }}
                                  aria-label="simple table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell align="right">Num</TableCell>
                                      <TableCell align="right">Key</TableCell>
                                      <TableCell align="right">Value</TableCell>
                                      <TableCell align="right"></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {attributes.map((row, index) => (
                                      <TableRow
                                        key={index}
                                        sx={{
                                          "&:last-child td, &:last-child th": {
                                            border: 0,
                                          },
                                        }}
                                      >
                                        <TableCell align="right">
                                          {index + 1}
                                        </TableCell>
                                        <TableCell align="right">
                                          {row.key}
                                        </TableCell>
                                        <TableCell align="right">
                                          {row.value}
                                        </TableCell>
                                        <TableCell align="right">
                                          <IconButton
                                            color="primary"
                                            aria-label="add an alarm"
                                            onClick={(e) => {
                                              let att = {
                                                key: attributes[index]?.key,
                                                value: attributes[index]?.value,
                                              };
                                              setAttributes(
                                                attributes.filter((temp) => {
                                                  return (
                                                    temp.key !==
                                                      attributes[index]?.key &&
                                                    temp.value !==
                                                      attributes[index]?.value
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
                           {/* attachment */}
                          <Grid item xs={12} sm={12}>
                            <TextField
                              autoComplete="attachments"
                              name="attachments"
                              required
                              fullWidth
                              id="attachments"
                              onChange={(e) => {
                                handleChangeImage(e);
                              }}
                              autoFocus
                              type="file"
                              inputProps={{
                                multiple: true,
                              }}
                            />
                          </Grid>
                           {/* stack show preview image select */}
                          <Grid item xs={12} sm={12}>
                            <Stack direction="row" spacing={3}>
                              {image
                                ? [...image].map((element) => {
                                    return (
                                      <Card sx={{ maxWidth: 345 }}>
                                        <CardActionArea
                                          sx={{
                                            maxWidth: 150,
                                            display: "flex",
                                            width: "100px",
                                            height: "100px",
                                            position: "relative",
                                            overflow: "hidden",
                                          }}
                                        >
                                          <img
                                            width="auto"
                                            height="100%"
                                            style={{
                                              display: "inline",
                                              margin: "0 auto",
                                              height: "100%",
                                              width: "auto",
                                            }}
                                            src={
                                              element
                                                ? URL.createObjectURL(element)
                                                : `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`
                                            }
                                          />
                                        </CardActionArea>
                                        <CardActions>
                                          <Button size="small" color="error"
                                          onClick={(e) => {
                                            setImage(
                                              [...image].filter((temp) => {
                                                return (
                                                  temp !== element
                                                );
                                              })
                                            );
                                            var fileBuffer = new DataTransfer();
                                            // append the file list to an array iteratively
                                            [...image].map((temp) => {
                                              if(temp !== element) return fileBuffer.items.add(temp)
                                            })
                                            console.log('fileBuffer::',fileBuffer.files)
                                            document.getElementById('attachments').files = fileBuffer.files;
                                          }}
                                          >
                                            Delete
                                          </Button>
                                        </CardActions>
                                      </Card>
                                    );
                                  })
                                : undefined}
                            </Stack>
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          //   fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={() => {
                            handleGetType();
                          }}
                        >
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </Modal>