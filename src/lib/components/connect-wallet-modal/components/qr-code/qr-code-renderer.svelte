<script lang="ts">
	import { run } from 'svelte/legacy';

	import { encode } from 'uqr';

	interface Props {
		ecl: 'L' | 'M' | 'Q' | 'H';
		size: number;
		uri: string;
		clearSize: number;
	}

	let { ecl = 'M', size: sizeProp = 200, uri, clearSize = 0 }: Props = $props();

	const logoSize = clearSize;
	const size = sizeProp - 10 * 2;

	let dots = $state('');
	run(() => {
		const dotsArray: string[] = [];
		const matrix = encode(uri, { ecc: ecl, border: 0 }).data;
		const cellSize = size / matrix.length;
		const qrList = [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 0, y: 1 }
		];

		for (const { x, y } of qrList) {
			const x1 = (matrix.length - 7) * cellSize * x;
			const y1 = (matrix.length - 7) * cellSize * y;
			for (let i = 0; i < 3; i++) {
				dotsArray.push(`
          <rect
            fill="${i % 2 !== 0 ? 'hsl(var(--twsv-background))' : 'hsl(var(--twsv-foreground))'}"
            rx="${(i - 2) * -5 + (i === 0 ? 2 : 3)}"
            ry="${(i - 2) * -5 + (i === 0 ? 2 : 3)}"
            width="${cellSize * (7 - i * 2)}"
            height="${cellSize * (7 - i * 2)}"
            x="${x1 + cellSize * i}"
            y="${y1 + cellSize * i}"
          />
        `);
			}
		}

		const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
		const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
		const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;

		matrix.forEach((row, i: number) => {
			row.forEach((_: boolean, j: number) => {
				if (matrix[i]?.[j]) {
					// Do not render dots under position squares
					if (
						!(
							(i < 7 && j < 7) ||
							(i > matrix.length - 8 && j < 7) ||
							(i < 7 && j > matrix.length - 8)
						)
					) {
						//if (image && i > matrix.length - 9 && j > matrix.length - 9) return;
						if (
							!(
								i > matrixMiddleStart &&
								i < matrixMiddleEnd &&
								j > matrixMiddleStart &&
								j < matrixMiddleEnd
							)
						) {
							dotsArray.push(`
                <circle
                  cx="${i * cellSize + cellSize / 2}"
                  cy="${j * cellSize + cellSize / 2}"
                  fill="hsl(var(--twsv-foreground))"
                  r="${cellSize / 3}"
                />
              `);
						}
					}
				}
			});
		});

		dots = dotsArray.join('');
	});
</script>

<svg
	height={size}
	width={size}
	viewBox={`0 0 ${size} ${size}`}
	style="width: {size}px; height: {size}px;"
	role="presentation"
>
	<rect fill="transparent" height={size} width={size} />
	{@html dots}
</svg>
