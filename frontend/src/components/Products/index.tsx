import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import List from '@material-ui/core/List';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button, Divider, ListItem, ListItemSecondaryAction, ListItemText, Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getAllAction, getAllFailureAction, getAllRequestAction, getAllSuccessAction } from '../../store/modules/products/actions';
import { productsLoadingSelector, productsSelector } from '../../store/modules/products/selectors';
import Product from './Product';
import { Product as ProductModel } from '../../store/modules/products/model';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 360,
        maxWidth: 480,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const Products = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(productsLoadingSelector);
    const [products, setProducts] = useState(useSelector(productsSelector))
    const [openCart, setOpenCart] = useState(false);
    const [cartItems, setCartItems] = useState([] as Array<ProductModel>);
    const modalBody = (
        <div className={classes.paper}>
            <Typography variant="h3" gutterBottom>
                Shopping Cart
            </Typography>
            <Divider />
            <List>
                {cartItems.map((el, idx) => (<ListItem key={idx}>
                    <ListItemText>
                        <Typography variant="body1" color='textPrimary'>
                            {el?.name}
                        </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <Button
                            variant="outlined"
                            aria-label="remove"
                            size="small"
                            color="primary"
                            className={classes.margin}
                            onClick={(e) => removeFromCart(e, el)}>
                            Remove
                        </Button>
                    </ListItemSecondaryAction>
                </ListItem>))}
            </List>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            return await axios.get('http://localhost:3000/api/v1/products');
        };
        dispatch(getAllRequestAction());
        fetchData().then(response => {
            dispatch(getAllAction(response?.data));
            dispatch(getAllSuccessAction());
            setProducts(response?.data as Array<ProductModel>);
        }).catch(() => dispatch(getAllFailureAction()));
    }, [dispatch]);

    const addToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ProductModel) => {
        e.stopPropagation();
        cartItems.push(item);
    };

    const removeFromCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ProductModel) => {
        e.stopPropagation();
        const tmpCartItems = [...cartItems];
        const index = tmpCartItems.indexOf(item);
        if (index > -1) {
            tmpCartItems.splice(index, 1);
        }
        setCartItems(tmpCartItems);
    }

    const toggleCart = () => {
        setOpenCart(prevProp => !prevProp);
    }

    const handleClose = () => {
        setOpenCart(false);
    };

    return (
        <div className={classes.root}>
            {isLoading && <Skeleton> <List /></Skeleton>}
            {
                isLoading === false &&
                products?.length > 0 && (
                    <>
                        <List>
                            {products.map((el, idx) => <Product key={idx} onAdd={addToCart} onRemove={removeFromCart} product={el} />)}
                        </List>
                        <Button onClick={toggleCart}>{openCart ? 'Hide' : 'Show'} Cart</Button>
                    </>
                )

            }
            {<Modal
                open={openCart}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {modalBody}
            </Modal>}
        </div>
    );
};

export default Products;