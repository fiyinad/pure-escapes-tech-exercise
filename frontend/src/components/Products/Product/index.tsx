import React from 'react';
import { Button, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { Product as ProductModel } from '../../../store/modules/products/model';

export interface IProductProps {
    product: ProductModel;
    onAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ProductModel) => void;
    onRemove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ProductModel) => void;
  }

const Product: React.FC<IProductProps> = props => {
    return (
        <>
            <ListItem>
                <ListItemText>
                    <Typography variant="body1" color='textPrimary'>
                        {props.product?.name}
                    </Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                    <Button 
                        variant="outlined" 
                        aria-label="add" 
                        size="small" 
                        color="primary" 
                        onClick={(e) => props.onAdd(e, props.product)}>
                        Add
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    );
};

export default Product;