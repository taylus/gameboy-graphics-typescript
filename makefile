index.js: src/index.ts outdir
	tsc --project .

outdir:
	if not exist out mkdir out
    
clean:
	if exist out rmdir /s /q out
