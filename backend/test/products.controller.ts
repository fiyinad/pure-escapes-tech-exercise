import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Products', () => {
  it('should get all products', () =>
    request(Server)
      .get('/api/v1/products')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(4);
      }));

  it('should add a new product', () =>
    request(Server)
      .post('/api/v1/products')
      .send({ name: 'test', customerPrice: 123, cost: 456 })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('customerPrice')
          .equal(123);
        expect(r.body).to.be.an('object').that.has.property('cost').equal(456);
      }));

  it('should get an product by id', () =>
    request(Server)
      .get('/api/v1/products/5')
      .expect('Content-Type', /json/)
      .then((r) => {
        console.log(r.body);
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('customerPrice')
          .equal(123);
        expect(r.body).to.be.an('object').that.has.property('cost').equal(456);
      }));

  it('should create order summary', () => {
    // arrange
    const body = [
      {
        product: { id: 1, name: 'Jam', customerPrice: 1299, cost: 1099 },
        quantity: 5,
      },
      {
        product: { id: 2, name: 'Bread', customerPrice: 199, cost: 1099 },
        quantity: 3,
      },
    ];
    const expectedResponse = {
      orders: [
        {
          name: 'Jam',
          quantity: 5,
          individualPrice: '$1299',
          totalPrice: '$6495',
        },
        {
          name: 'Bread',
          quantity: 3,
          individualPrice: '$199',
          totalPrice: '$597',
        },
      ],
      grandTotal: 7092,
    };

    // act, assert
    request(Server)
      .post('/api/v1/products/summary')
      .send(body)
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .to.have.nested.property('orders[0].name');
        expect(r.body)
          .to.be.an('object')
          .to.have.nested.property(
            'orders[0].quantity',
            expectedResponse.orders[0].quantity
          );
        expect(r.body)
          .to.be.an('object')
          .to.have.nested.property(
            'orders[0].individualPrice',
            expectedResponse.orders[0].individualPrice
          );
        expect(r.body)
          .to.be.an('object')
          .to.have.nested.property('orders[0].totalPrice', '$6495');
        expect(r.body)
          .to.be.an('object')
          .to.have.property('grandTotal', expectedResponse.grandTotal);
      });
  });
});
