const compact = (date) => `${date.getFullYear()}`
+ `${String(date.getMonth() + 1).padStart(2, '0')}`
+ `${String(date.getDay()).padStart(2, '0')}`;

module.exports = { compact };
