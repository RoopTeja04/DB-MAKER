const defaultSchema = `Table users {
  id int [pk]
  name varchar
  email varchar [unique]
  created_at timestamp
}

Table profiles {
  id int [pk]
  user_id int
  bio varchar
  avatar_url varchar
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

Table tags {
  id int [pk]
  name varchar
}

Table product_tags {
  product_id int
  tag_id int
}

// 1:1  — one user has one profile
Ref: profiles.user_id - users.id

// N:1  — many orders belong to one user
Ref: orders.user_id > users.id

// 1:N  — one order has many items
Ref: order_items.order_id < orders.id

// N:1  — many items reference one product
Ref: order_items.product_id > products.id

// N:N  — products have many tags, tags belong to many products
Ref: product_tags.product_id <> tags.id
`;

export default defaultSchema;
