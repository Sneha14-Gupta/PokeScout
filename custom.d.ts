declare module 'colorthief' {
    class ColorThief {
      getColor(image: HTMLImageElement): number[];
      getPalette(image: HTMLImageElement, colorCount?: number): number[][];
    }
    export = ColorThief;
  }
  