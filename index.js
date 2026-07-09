const zl      = require("zip-lib"),
	  fs      = require("node:fs"),
	  pack    = "multitv",
	  folders = [`assets`, `install`];

if(fs.existsSync(`${pack}.zip`)) {
	console.log(`Delete file ${pack}.zip`);
	fs.unlinkSync(`${pack}.zip`);
}

const zip = new zl.Zip();

for(var value of folders){
	zip.addFolder(`${value}`, `${pack}/${value}`);
}

zip.archive(`${pack}.zip`);
console.log(`Archive ${pack}.zip`);
