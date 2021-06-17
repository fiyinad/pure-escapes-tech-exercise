import L from '../../common/logger';

let id = 1;
interface Product {
  id: number;
  name: string;
  customerPrice: number;
  cost: number;
}

interface ProductQuantity {
  product: Product;
  quantity: number;
}

interface Order {
  name: string;
  quantity: number;
  individualPrice: string;
  totalPrice: string;
}

interface OrderSummary {
  orders?: Order[];
  grandTotal?: number;
}

const products: Product[] = [
  { id: id++, name: 'Soup', customerPrice: 199, cost: 186 },
  { id: id++, name: 'Bread', customerPrice: 87, cost: 21 },
  { id: id++, name: 'Cheese', customerPrice: 275, cost: 234 },
  { id: id++, name: 'Milk', customerPrice: 67, cost: 61 },
];

export class ProductsService {
  all(): Promise<Product[]> {
    L.info(products, 'fetch all products');
    return Promise.resolve(products);
  }

  byId(id: number): Promise<Product> {
    L.info(`fetch product with id ${id}`);
    return this.all().then((r) => r[id - 1]);
  }

  create(name: string, customerPrice: number, cost: number): Promise<Product> {
    L.info(`create product with name ${name}`);
    const product: Product = {
      id: id++,
      name,
      customerPrice,
      cost,
    };
    products.push(product);
    return Promise.resolve(product);
  }

  createSummary(productsRange: ProductQuantity[]): Promise<OrderSummary> {
    L.info(`get summary with productRange ${JSON.stringify(productsRange)}`);
    let grandTotal = 0;
    const orderSummary: OrderSummary = {
      orders: [],
      grandTotal: 0,
    };
    const orders: Order[] = [];
    for (const prdQuantity of productsRange) {
      const totalPrice =
        prdQuantity.product.customerPrice * prdQuantity.quantity;
      const order: Order = {
        name: prdQuantity.product.name,
        quantity: prdQuantity.quantity,
        individualPrice: `$${prdQuantity.product.customerPrice}`,
        totalPrice: `$${totalPrice}`,
      };
      grandTotal = grandTotal + totalPrice;
      orders.push(order);
    }

    orderSummary.orders = orders;
    orderSummary.grandTotal = grandTotal;
    return Promise.resolve(orderSummary);
  }
}

export default new ProductsService();
