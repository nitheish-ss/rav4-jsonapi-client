import { jest } from '@jest/globals';
jest.mock('react-admin');
import { jsonapiClient } from './src/ra-jsonapi-provider.ts';

test('dataprovider.getList', () => {
  const getlist = jsonapiClient()
    .getList('categories', {
      pagination: {
        page: 1,
        perPage: 25
      },
      sort: {
        field: 'category_name',
        order: 'ASC'
      },
      filter: {}
    })
    .then((value) =>
      expect(value).toStrictEqual({
        data: [
          {
            id: '1',
            ja_type: 'Category',
            category_id: 1,
            category_name: 'Beverages',
            description: 'Soft drinks, coffees, teas, beers, and ales',
            picture: ''
          },
          {
            id: '2',
            ja_type: 'Category',
            category_id: 2,
            category_name: 'Condiments',
            description:
              'Sweet and savory sauces, relishes, spreads, and seasonings',
            picture: ''
          },
          {
            id: '3',
            ja_type: 'Category',
            category_id: 3,
            category_name: 'Confections',
            description: 'Desserts, candies, and sweet breads',
            picture: ''
          },
          {
            id: '4',
            ja_type: 'Category',
            category_id: 4,
            category_name: 'Dairy Products',
            description: 'Cheeses',
            picture: ''
          },
          {
            id: '5',
            ja_type: 'Category',
            category_id: 5,
            category_name: 'Grains/Cereals',
            description: 'Breads, crackers, pasta, and cereal',
            picture: ''
          },
          {
            id: '6',
            ja_type: 'Category',
            category_id: 6,
            category_name: 'Meat/Poultry',
            description: 'Prepared meats',
            picture: ''
          },
          {
            id: '7',
            ja_type: 'Category',
            category_id: 7,
            category_name: 'Produce',
            description: 'Dried fruit and bean curd',
            picture: ''
          },
          {
            id: '8',
            ja_type: 'Category',
            category_id: 8,
            category_name: 'Seafood',
            description: 'Seaweed and fish',
            picture: ''
          }
        ],
        total: 8
      })
    );
});

test('dataprovider.getOne', () => {
  const getOne = jsonapiClient()
    .getOne('customers', {
      id: 'ALFKI'
    })
    .then((value) =>
      expect(value).toStrictEqual({
        data: {
          id: 'ALFKI',
          address: 'Obere Str. 57',
          city: 'Berlin',
          company_name: 'Alfreds Futterkiste',
          contact_name: 'Maria Anders',
          contact_title: 'Sales Representative',
          country: 'Germany',
          customer_id: 'ALFKI',
          fax: '030-0076545',
          phone: '030-0074321',
          postal_code: '12209',
          region: null,
          CustomerCustomerDemoList: {
            data: [],
            links: {
              self: 'http://localhost:5656/api/customers/ALFKI/CustomerCustomerDemoList'
            }
          },
          OrderList: {
            data: [
              {
                id: '10643',
                type: 'Order'
              }
            ],
            links: {
              self: 'http://localhost:5656/api/customers/ALFKI/OrderList'
            },
            meta: {
              count: 1,
              limit: 1,
              total: 1
            }
          },
          type: 'Customer',
          relationships: {
            CustomerCustomerDemoList: {
              data: [],
              links: {
                self: 'http://localhost:5656/api/customers/ALFKI/CustomerCustomerDemoList'
              }
            },
            OrderList: {
              data: [
                {
                  id: '10643',
                  type: 'Order'
                }
              ],
              links: {
                self: 'http://localhost:5656/api/customers/ALFKI/OrderList'
              },
              meta: {
                count: 1,
                limit: 1,
                total: 1
              }
            }
          },
          attributes: {
            address: 'Obere Str. 57',
            city: 'Berlin',
            company_name: 'Alfreds Futterkiste',
            contact_name: 'Maria Anders',
            contact_title: 'Sales Representative',
            country: 'Germany',
            customer_id: 'ALFKI',
            fax: '030-0076545',
            phone: '030-0074321',
            postal_code: '12209',
            region: null
          }
        }
      })
    );
});

test('dataprovider.getMany', () => {
  const getMany = jsonapiClient()
    .getMany('employees', {
      ids: ['1']
    })
    .then((value) =>
      expect(value).toStrictEqual({
        data: [
          {
            id: '1',
            address: '507 - 20th Ave. E.\\nApt. 2A',
            birth_date: '1948-12-08',
            city: 'Seattle',
            country: 'USA',
            employee_id: 1,
            extension: '5467',
            first_name: 'Nancy',
            hire_date: '1992-05-01',
            home_phone: '(206) 555-9857',
            last_name: 'Davolio',
            notes:
              'Education includes a BA in psychology from Colorado State University in 1970.  She also completed The Art of the Cold Call.  Nancy is a member of Toastmasters International.',
            photo: '',
            photo_path: 'http://accweb/emmployees/davolio.bmp',
            postal_code: '98122',
            region: 'WA',
            reports_to: 2,
            title: 'Sales Representative',
            title_of_courtesy: 'Ms.'
          }
        ],
        total: 1
      })
    );
});

test('dataprovider.getManyReference', () => {
  const getMany = jsonapiClient()
    .getManyReference('employee_territories', {
      target: 'territory_id',
      id: '30346',
      pagination: {
        page: 1,
        perPage: 25
      },
      sort: {
        field: 'id',
        order: 'DESC'
      },
      filter: {}
    })
    .then((value) =>
      expect(value).toStrictEqual({
        data: [
          {
            id: '3_30346',
            links: {
              self: 'http://localhost:5656/api/employee_territories/3_30346/'
            },
            type: 'EmployeeTerritory',
            relationships: {
              employee: {
                data: {
                  id: '3',
                  type: 'Employee'
                },
                links: {
                  self: 'http://localhost:5656/api/employee_territories/3_30346/employee'
                }
              },
              territory: {
                data: {
                  id: '30346',
                  type: 'Territory'
                },
                links: {
                  self: 'http://localhost:5656/api/employee_territories/3_30346/territory'
                }
              }
            }
          }
        ],
        total: 100
      })
    );
});

test('dataprovider.update', () => {
  const update = jsonapiClient()
    .update('orders', {
      id: '10692',
      data: {
        id: '10692',
        validUntil: '2022-11-02T06:51:27.336Z',
        customer_id: 'ALFKI',
        employee_id: '4',
        freight: '4',
        order_date: '1997-10-03',
        order_id: '10692',
        required_date: '1997-10-31',
        ship_address: 'Obere Str. 57',
        ship_city: 'Berlin',
        ship_country: 'Germany',
        ship_name: "Alfred's Futterkiste",
        ship_postal_code: '12209',
        ship_region: null,
        ship_via: '2',
        shipped_date: '1997-10-13',
        OrderDetailList: {
          data: [
            {
              id: '10692_63',
              type: 'OrderDetail'
            }
          ],
          links: {
            self: 'http://localhost:5656/api/orders/10692/OrderDetailList'
          },
          meta: {
            count: 1,
            limit: 1,
            total: 1
          }
        },
        customer: {
          data: {
            id: 'ALFKI',
            type: 'Customer'
          },
          links: {
            self: 'http://localhost:5656/api/orders/10692/customer'
          }
        },
        employee: {
          data: {
            id: '4',
            type: 'Employee'
          },
          links: {
            self: 'http://localhost:5656/api/orders/10692/employee'
          }
        },
        shipper: {
          data: {
            id: '2',
            type: 'Shipper'
          },
          links: {
            self: 'http://localhost:5656/api/orders/10692/shipper'
          }
        },
        type: 'Order',
        relationships: {
          OrderDetailList: {
            data: [
              {
                id: '10692_63',
                type: 'OrderDetail'
              }
            ],
            links: {
              self: 'http://localhost:5656/api/orders/10692/OrderDetailList'
            },
            meta: {
              count: 1,
              limit: 1,
              total: 1
            }
          },
          customer: {
            data: {
              id: 'ALFKI',
              type: 'Customer'
            },
            links: {
              self: 'http://localhost:5656/api/orders/10692/customer'
            }
          },
          employee: {
            data: {
              id: '4',
              type: 'Employee'
            },
            links: {
              self: 'http://localhost:5656/api/orders/10692/employee'
            }
          },
          shipper: {
            data: {
              id: '2',
              type: 'Shipper'
            },
            links: {
              self: 'http://localhost:5656/api/orders/10692/shipper'
            }
          }
        },
        attributes: {
          customer_id: 'ALFKI',
          employee_id: 4,
          freight: 61.02,
          order_date: '1997-10-03',
          order_id: 10692,
          required_date: '1997-10-31',
          ship_address: 'Obere Str. 57',
          ship_city: 'Berlin',
          ship_country: 'Germany',
          ship_name: "Alfred's Futterkiste",
          ship_postal_code: '12209',
          ship_region: null,
          ship_via: 2,
          shipped_date: '1997-10-13'
        }
      },
      previousData: {
        id: '10692',
        validUntil: '2022-11-02T06:51:27.336Z',
        customer_id: 'ALFKI',
        employee_id: '4',
        freight: 61.02,
        order_date: '1997-10-03',
        order_id: '10692',
        required_date: '1997-10-31',
        ship_address: 'Obere Str. 57',
        ship_city: 'Berlin',
        ship_country: 'Germany',
        ship_name: "Alfred's Futterkiste",
        ship_postal_code: '12209',
        ship_region: null,
        ship_via: '2',
        shipped_date: '1997-10-13',
        OrderDetailList: {
          data: [
            {
              id: '10692_63',
              type: 'OrderDetail'
            }
          ],
          links: {
            self: 'http://localhost:5656/api/orders/10692/OrderDetailList'
          },
          meta: {
            count: 1,
            limit: 1,
            total: 1
          }
        },
        customer: {
          data: {
            id: 'ALFKI',
            type: 'Customer'
          },
          links: {
            self: 'http://localhost:5656/api/orders/10692/customer'
          }
        },
        employee: {
          data: {
            id: '4',
            type: 'Employee'
          },
          links: {
            self: 'http://localhost:5656/api/orders/10692/employee'
          }
        },
        shipper: {
          data: {
            id: '2',
            type: 'Shipper'
          },
          links: {
            self: 'http://localhost:5656/api/orders/10692/shipper'
          }
        },
        type: 'Order',
        relationships: {
          OrderDetailList: {
            data: [
              {
                id: '10692_63',
                type: 'OrderDetail'
              }
            ],
            links: {
              self: 'http://localhost:5656/api/orders/10692/OrderDetailList'
            },
            meta: {
              count: 1,
              limit: 1,
              total: 1
            }
          },
          customer: {
            data: {
              id: 'ALFKI',
              type: 'Customer'
            },
            links: {
              self: 'http://localhost:5656/api/orders/10692/customer'
            }
          },
          employee: {
            data: {
              id: '4',
              type: 'Employee'
            },
            links: {
              self: 'http://localhost:5656/api/orders/10692/employee'
            }
          },
          shipper: {
            data: {
              id: '2',
              type: 'Shipper'
            },
            links: {
              self: 'http://localhost:5656/api/orders/10692/shipper'
            }
          }
        },
        attributes: {
          customer_id: 'ALFKI',
          employee_id: 4,
          freight: 61.02,
          order_date: '1997-10-03',
          order_id: 10692,
          required_date: '1997-10-31',
          ship_address: 'Obere Str. 57',
          ship_city: 'Berlin',
          ship_country: 'Germany',
          ship_name: "Alfred's Futterkiste",
          ship_postal_code: '12209',
          ship_region: null,
          ship_via: 2,
          shipped_date: '1997-10-13'
        }
      }
    })
    .then((value) =>
      expect(value).toStrictEqual({
        data: {
          id: '10692',
          customer_id: 'ALFKI',
          employee_id: 4,
          freight: 4,
          order_date: '1997-10-03',
          order_id: 10692,
          required_date: '1997-10-31',
          ship_address: 'Obere Str. 57',
          ship_city: 'Berlin',
          ship_country: 'Germany',
          ship_name: "Alfred's Futterkiste",
          ship_postal_code: '12209',
          ship_region: null,
          ship_via: 2,
          shipped_date: '1997-10-13'
        }
      })
    );
});

test('dataprovider.create', () => {
    const create = jsonapiClient()
      .create('order_details', {
        data: {
          order_id: "10702",
          unit_price: "1",
          quantity: "1",
          discount: "1",
          product_id: "1"
        }
      })
      .then((value)=>{
        expect(value).toStrictEqual({
            data: {
              id: "10702_1",
              discount: 1,
              order_id: 10702,
              product_id: 1,
              quantity: 1,
              unit_price: 1
            }
          })
      });
  });


  test('dataprovider.delete', () => {
    const delete_ = jsonapiClient()
      .delete('order_details', {
        id: "10248_72",
        previousData: {
          id: "10248_72",
          validUntil: "2022-11-02T09:53:47.863Z",
          discount: 0,
          order_id: "10248",
          product_id: "72",
          quantity: 5,
          unit_price: 34.8,
          order: {
            data: {
              id: "10248",
              type: "Order"
            },
            links: {
              self: "http://localhost:5656/api/order_details/10248_72/order"
            }
          },
          product: {
            data: {
              id: "72",
              type: "Product"
            },
            links: {
              self: "http://localhost:5656/api/order_details/10248_72/product"
            }
          },
          type: "OrderDetail",
          relationships: {
            order: {
              data: {
                id: "10248",
                type: "Order"
              },
              links: {
                self: "http://localhost:5656/api/order_details/10248_72/order"
              }
            },
            product: {
              data: {
                id: "72",
                type: "Product"
              },
              links: {
                self: "http://localhost:5656/api/order_details/10248_72/product"
              }
            }
          },
          attributes: {
            discount: 0,
            order_id: 10248,
            product_id: 72,
            quantity: 5,
            unit_price: 34.8
          }
        }
      })
      .then((value)=>{});
  });

  test('dataprovider.getResources', () => {
    const delete_ = jsonapiClient()
      .getResources()
      .then((value)=>{});
  });



