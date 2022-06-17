exports.selectproducts = `select * from products`
exports.insertproduct = `insert or replace into products values (?,?,?,?,?,?)`
exports.deleteproduct = `delete from products where id = ?`