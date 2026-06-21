const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src', 'pages', 'BookAppointment.jsx');
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/₹\{/g, '${');
fs.writeFileSync(p, c);
console.log('Fixed file');
