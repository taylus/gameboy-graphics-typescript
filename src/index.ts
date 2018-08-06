namespace Graphics {

    const tileSize = 8; //size of tiles in pixels
    const vramTileWidth = 16; //width of vram tileset in tiles
    const palette: string[] = [
        "#000000",  //black
        "#676767",  //dark gray
        "#b6b6b6",  //light gray
        "#ffffff"   //white
    ];

    const tilemap: number[][] = [
        [300, 300, 300, 300, 300, 300, 298, 299, 338, 338, 338, 338, 298, 299, 300, 300, 300, 300, 300, 300],
        [300, 300, 300, 300, 300, 300, 314, 315, 338, 338, 338, 338, 314, 315, 300, 300, 300, 300, 300, 300],
        [298, 299, 298, 299, 298, 299, 298, 299, 338, 338, 338, 338, 298, 299, 298, 299, 298, 299, 298, 299],
        [314, 315, 314, 315, 314, 315, 314, 315, 338, 338, 338, 338, 314, 315, 314, 315, 314, 315, 314, 315],
        [291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291],
        [313, 291, 291, 291, 313, 291, 291, 291, 313, 291, 291, 291, 313, 291, 291, 291, 313, 291, 291, 291],
        [263, 263, 264, 265, 291, 291, 291, 291, 291, 291, 291, 291, 261, 262, 263, 263, 263, 263, 264, 265],
        [279, 279, 280, 281, 291, 291, 313, 291, 291, 291, 313, 291, 277, 278, 279, 279, 279, 279, 280, 281],
        [266, 266, 296, 297, 291, 291, 291, 291, 313, 313, 313, 313, 293, 294, 266, 290, 266, 266, 296, 297],
        [279, 279, 279, 349, 313, 291, 291, 291, 313, 313, 313, 313, 348, 279, 279, 279, 279, 279, 279, 349],
        [266, 266, 290, 287, 291, 291, 291, 291, 313, 313, 326, 327, 271, 290, 267, 268, 266, 266, 290, 287],
        [282, 282, 282, 335, 291, 291, 313, 291, 313, 313, 342, 343, 334, 282, 283, 284, 282, 282, 282, 335],
        [291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291],
        [313, 291, 291, 291, 313, 291, 291, 291, 313, 291, 291, 291, 313, 291, 291, 291, 313, 291, 291, 291],
        [291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291, 291],
        [291, 291, 313, 291, 291, 291, 313, 291, 291, 291, 313, 291, 291, 291, 313, 291, 291, 291, 313, 291],
        [313, 313, 313, 313, 291, 291, 291, 291, 261, 262, 339, 339, 339, 339, 339, 339, 339, 339, 264, 265],
        [313, 313, 313, 313, 313, 291, 291, 291, 277, 312, 274, 274, 274, 274, 274, 274, 274, 274, 312, 281]
    ];

    document.addEventListener("DOMContentLoaded", function () {
        let canvas = initCanvas(160, 144, "screen");
        document.body.appendChild(canvas);

        let context = canvas.getContext("2d");
        fill(context, palette[2]);
        //scale(canvas, 2);

        let vramCanvas = initCanvas(128, 192);
        //vramCanvas.style.verticalAlign = "top";
        //document.body.appendChild(vramCanvas);

        //var vramContext = vramCanvas.getContext("2d");
        loadImage("pkmn_bank1.png").then(function (tileset) {
            //vramContext.drawImage(tileset, 0, 0);
            //drawGrid(context);
            drawMap(context, tileset, tilemap);
        });
    });

    function initCanvas(width: number, height: number, id?: string): HTMLCanvasElement {
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        if (id) canvas.id = id;
        return canvas;
    }

    function fill(context: CanvasRenderingContext2D, color: string) {
        context.fillStyle = color;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    function scale(canvas: HTMLCanvasElement, scale: number) {
        canvas.style.width = canvas.width * scale + "px";
        canvas.style.height = canvas.height * scale + "px";
    }

    function loadImage(src: string): Promise<HTMLImageElement> {
        let img = new Image();
        var p = new Promise<HTMLImageElement>(function (resolve) {
            img.onload = function () {
                resolve(img);
            }
        });
        img.src = src;
        return p;
    }

    function drawGrid(context: CanvasRenderingContext2D) {
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.setLineDash([1, 1]);
        for (let x = 0; x < context.canvas.width; x += tileSize) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, context.canvas.height);
            context.stroke();
        }
        for (let y = 0; y < context.canvas.height; y += tileSize) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(context.canvas.width, y);
            context.stroke();
        }
    }

    //draws onto context at (destTileX, destTileY) the tile from tileset at (srcTileX, srcTileY);
    function drawTile(context: CanvasRenderingContext2D, destTileX: number, destTileY: number, tileset: HTMLImageElement, srcTileX: number, srcTileY: number) {
        let sX = srcTileX * tileSize;
        let sY = srcTileY * tileSize;
        let dX = destTileX * tileSize;
        let dY = destTileY * tileSize;
        context.drawImage(tileset, sX, sY, tileSize, tileSize, dX, dY, tileSize, tileSize);
    }

    //draws onto context at (destTileX, destTileY) the tile from tileset with index tileIndex
    function drawTileIndex(context: CanvasRenderingContext2D, destTileX: number, destTileY: number, tileset: HTMLImageElement, tileIndex: number) {
        drawTile(context, destTileX, destTileY, tileset, tileIndex % vramTileWidth, Math.floor(tileIndex / vramTileWidth))
    }

    //draws onto context the given tilemap (2d array of tile index numbers) using the given tileset
    function drawMap(context: CanvasRenderingContext2D, tileset: HTMLImageElement, tilemap: number[][]) {
        for(let y = 0; y < tilemap.length; y++) {
            for(let x = 0; x < tilemap[y].length; x++) {
                setTimeout(function () {
                    drawTileIndex(context, x, y, tileset, tilemap[y][x]);
                }, y * vramTileWidth * 10 + x * 10);
            }
        }
    }
}