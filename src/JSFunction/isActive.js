export function isActive(product) {
    const curDate = new Date();
    const activeDate = new Date(product.product_active_at);
    const inactiveDate = new Date(product.product_inactive_at);
    return curDate >= activeDate && curDate <= inactiveDate;
  }

export function getActivePrice(product) {
    const curDate = new Date();
    const activeDate = new Date(product.product_active_at);
    const inactiveDate = new Date(product.product_inactive_at);
    if (curDate >= activeDate && curDate <= inactiveDate) {
      return product.product_price * 0.5;
    }
    return product.product_price;
}