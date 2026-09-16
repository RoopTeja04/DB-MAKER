const defaultSchema = `Table users {
  id int [pk]
  name varchar
  email varchar [unique]
  created_at timestamp
}

Table orders {
  id int [pk]
  user_id int
  total decimal
  status varchar
  created_at timestamp
}

Table order_items {
  id int [pk]
  order_id int
  product_id int
  quantity int
  price decimal
}

Table products {
  id int [pk]
  name varchar
  price decimal
  stock int
}

Ref: orders.user_id > users.id
Ref: order_items.order_id > orders.id
Ref: order_items.product_id > products.id
`;

export default defaultSchema;
