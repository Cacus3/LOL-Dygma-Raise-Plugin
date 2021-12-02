var SerialPort = require("serialport");
var createInterface = require("readline").createInterface;

class SerialService {
	port;
	actualLines = [];
	lastResult = {date: new Date(),data:[]}

	constructor(options) {
		this.port = new SerialPort(options.portName, {
			baudRate: 115200,
		});

		const lineReader = createInterface({
			input: this.port,
		});

		lineReader.on('line', async (line) => {
			line = line.trim();
			this.actualLines.push(line);
			if (line === '.') {
				const data = this.actualLines.filter((s) => s !== '');
				data.pop();
				this.lastResult = {date: new Date(),data}
				this.actualLines = [];
			}
		});
	}

	waitFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
	async getLastResult(oldValue) {
		return new Promise(async (resolve, reject) => {
			while (oldValue === this.lastResult) {
				await this.waitFor(0.1);
			}
			resolve(this.lastResult);
		});
	}

	write(command) {
		this.port.write(command);
	}
}

module.exports = SerialService
