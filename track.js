export class Track {
    constructor(fileInputId, loadButtonId, context, xScale, yScale) {
        this.fileInput = document.getElementById(fileInputId);
        this.loadButton = document.getElementById(loadButtonId);
        this.context = context;
        this.xScale = xScale;
        this.yScale = yScale;
        this.track = [];

        this.loadButton.addEventListener('click', () => this.loadFile());
    }

    loadFile() {
        const file = this.fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                this.track = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                console.log(text);
                console.log(this.track);
                this.makeTrack();
            };
            reader.readAsText(file);
        } else {
            console.error('No file selected');
        }
    }

    makeTrack() {
        for (let y = 0; y < this.track.length; y++) {
            for (let x = 0; x < this.track[y].length; x++) {
                if (this.track[y][x] === '=') {
                    this.context.fillStyle = 'grey';
                    this.context.fillRect(x * this.xScale, y * this.yScale, this.xScale, this.yScale);
                }
                else if (this.track[y][x] === '#') {
                    this.context.fillStyle = 'green';
                    this.context.fillRect(x * this.xScale, y * this.yScale, this.xScale, this.yScale);
                }
                else {
                    this.context.fillStyle = 'black';
                    this.context.fillRect(x * this.xScale, y * this.yScale, this.xScale, this.yScale);
                }
            }
        }
    }
}