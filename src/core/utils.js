export function getUniqueValues(items, key) {
    const set = new Set();
  
    items.forEach((item) => {
      const value = item[key];
  
      if (Array.isArray(value)) {
        value.forEach((v) => set.add(v));
      } else {
        set.add(value);
      }
    });
  
    return Array.from(set);
  }


  export function formatPrice(amount) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  